#include "napi/native_api.h"
#include "hilog/log.h"
#include <bits/alltypes.h>



#undef LOG_TAG
#define LOG_TAG "ss-handler"
#define CPPHTTPLIB_OPENSSL_SUPPORT
#include <httplib/httplib.h>

#include "web/arkweb_scheme_handler.h"
#include <string>
#include <iostream>
#include "threads.h"

static bool _logDebug = false;
// 声明全局的响应头配置参数
static std::multimap<std::string, std::multimap<std::string, std::string>> global_response_set_headers;

// 目标函数，接受可变参数
template<typename... Args>
void LibEcPrint(const char *fmt, Args... args) {
    if (_logDebug) {
        OH_LOG_Print(LogType::LOG_APP, LogLevel::LOG_INFO, 1, "libec", fmt, args...);
    }
}
struct Url {
    std::string protocol;
    std::string host;
    std::string port;
    std::string path;
    std::string query;
    std::string fragment;

    void print() {
        const char *c_str = protocol.data();

        LibEcPrint("protocol : %{public}s", protocol.c_str());
        LibEcPrint("host : %{public}s", host.c_str());
        LibEcPrint("port : %{public}s", port.c_str());
        LibEcPrint("path : %{public}s", path.c_str());
        LibEcPrint("query : %{public}s", query.c_str());
        LibEcPrint("fragment : %{public}s", fragment.c_str());
    }

    std::string getHost() {
        std::string portStr = "";
        if (!((port == "80") || (port == "443"))) {
            portStr = (":" + port);
        }
        std::string last_str = protocol + "://" + host + portStr;
        return last_str;
    }

    std::string getPath() {
        std::string qs = query.empty() ? "" : ("?" + query);
        LibEcPrint("getPath %{public}s", (path + qs).c_str());
        return path + qs;
    }
};
bool parse_url(const char *str, Url &result) {
    std::string url(str);
    // 更新正则表达式以正确处理带有查询字符串的URL
    const std::regex pattern(R"((http|https)://([^:/?#]+)(:([0-9]+))?([^?#]*)(\?([^#]*))?(#(.*))?)");
    std::smatch matches;
    if (std::regex_match(url, matches, pattern)) {
        result.protocol = matches[1].str();
        result.host = matches[2].str();
        result.port = matches[4].str().empty() ? (result.protocol == "http" ? "80" : "443") : matches[4].str();
        result.path = matches[5].str().empty() ? "/" : matches[5].str();
        result.query = matches[7].str();
        result.fragment = matches[9].str();
        return true;
    } else {
        return false;
    }
}

struct RawRequest;

void clean_from_multimap(ArkWeb_HttpBodyStream *httpBodyStream);
void ReadCallback(const ArkWeb_HttpBodyStream *httpBodyStream, uint8_t *buffer, int bytesRead);
void InitCallback(const ArkWeb_HttpBodyStream *httpBodyStream, ArkWeb_NetError result) ;
void add_to_multimap(ArkWeb_HttpBodyStream *HttpBodyStream, RawRequest rawRequest);

// 声明一个全局的请求Map
std::multimap<const ArkWeb_HttpBodyStream *, RawRequest> global_multimap;
std::mutex multimap_mutex;

// 声明一个全局拦截器
ArkWeb_SchemeHandler *g_schemeHandler;
struct RawRequest {
    
    httplib::Client *cli;
    ArkWeb_HttpBodyStream *arkWeb_HttpBodyStream;
    const ArkWeb_ResourceRequest *resourceRequest;
    const ArkWeb_ResourceHandler *resourceHandler;
    std::string url;
    std::string method;
    httplib::Headers headers;
    

    uint8_t* buffer;
    uint64_t bufferSize;
    cnd_t http_body_cnd;
    mtx_t http_body_mtx;



    void sendRequest() {
        ArkWeb_HttpBodyStream *httpBodyStream;
        OH_ArkWebResourceRequest_GetHttpBodyStream(this->resourceRequest, &httpBodyStream);
        this->arkWeb_HttpBodyStream = httpBodyStream;
        if (httpBodyStream) {
            add_to_multimap(httpBodyStream, *this);
            OH_ArkWebHttpBodyStream_SetReadCallback(httpBodyStream, ReadCallback);
            OH_ArkWebHttpBodyStream_Init(httpBodyStream, InitCallback);
        } else {
            // 如果没有数据体，直接发送
            uint8_t buf[0];
            _send(buf, 0);
        }
    }
    
    void _send(uint8_t *bodyBuffer,  uint64_t buffSize) {
        // 解析当前 url 地址
        Url url_parser;
        parse_url(url.c_str(), url_parser);
        httplib::Client cli(url_parser.getHost().c_str());
        // 关闭 ssl 校验
        // TODO:默认关闭 SSL 忽略，httplib 本身需要 openSSL 3.0 的版本，但我使用的是 1.1.0 版本，可能在 ssl解析层面存在问题，
        // TODO:为什么使用 openSSL 1.1.0 而不是3.0? 原因是：基于鸿蒙 ndk 编译只有 1.1.0 成功，3.0 的编译需要后续学习才能继续推进；
        cli.enable_server_certificate_verification(false);
        this->cli = &cli;
        // 设置请求头 headers
        headers.erase("Origin");
//         headers.insert(std::make_pair("Origin", "file://"));
        cli.set_default_headers(headers);
        // 将 method 类型转换小写进行匹配
        std::string methodStr(method);
        std::transform(methodStr.begin(), methodStr.end(), methodStr.begin(), ::tolower);

        LibEcPrint("Request url %{public}s", url.c_str());
        LibEcPrint("Request methods %{public}s", methodStr.c_str());
        
        // 获取请求类型
        httplib::Result resp;
        if (methodStr == "post") {
            if (bodyBuffer && buffSize > 0) {
                auto contentType = headers.find("content-type");
                // 设置请求体数据
                // 将 uint8_t 数据转换为 std::string
                char *char_ptr = reinterpret_cast<char *>(bodyBuffer);
//                 std::string data_str(char_ptr);
                LibEcPrint("if (resp) 前 Request Body %{public}s", char_ptr);
                resp = cli.Post(url_parser.getPath().c_str(), char_ptr, buffSize, contentType->second);
            } else {
                resp = cli.Post(url_parser.getPath());
            }
        } else if (methodStr == "get") {
            resp = cli.Get(url_parser.getPath());
        } else if (methodStr == "options") {
            resp = cli.Options(url_parser.getPath());
        } else {
            // TODO:该接口类型不支持发送
            this->responseClientError("不支持的接口发送类型", methodStr);
            return;
        }

        if (resp) {
            LibEcPrint("开始响应", "");
            LibEcPrint("body %{public}s", resp->body.c_str());
            this->responseHandler(resp, methodStr);
        } else {
            LibEcPrint("没有数据响应", "");
            this->responseClientError("请检查服务器是否正常，或者 https 证书是否正常", methodStr);
        }
    }
    
    void responseClientError(char *error, std::string method) {
        // 构造一个 httplib::Headers 对象（如果需要自定义请求头）
        auto errResp = std::make_unique<httplib::Response>();
        errResp->status = 400;
        errResp->set_content(error, "text/plain; charset=utf-8");
        errResp->set_header("Access-Control-Allow-Origin", "*");
        httplib::Result errResult;
        // 设置错误类型
        httplib::Error err = httplib::Error::Unknown;
        // 使用上述构造函数来创建 httplib::Result 对象
        httplib::Headers request_headers;
        httplib::Result error_result(std::move(errResp), err, std::move(request_headers));
        this->responseHandler(error_result, method);
        // 清除内存
        this->cleanRequest();
    }
    
    void responseHandler(httplib::Result &resp, std::string methodName) {
        // 进行数据的响应
        ArkWeb_Response *response;
        OH_ArkWeb_CreateResponse(&response);
        // 设置响应字符集
        if (resp->headers.count("content-type") > 0) {
            auto contentTypeStr = resp->headers.find("content-type")->second;
            if (contentTypeStr.find("charset=") != std::string::npos) {
                std::string token;
                auto splits = this->splitString(contentTypeStr.c_str(), "charset=");
                auto charsetstr = splits.at(1);
                std::transform(charsetstr.begin(), charsetstr.end(), charsetstr.begin(), ::toupper);
                OH_ArkWebResponse_SetCharset(response, charsetstr.c_str());
            } else {
                // 设置响应体的编码格式。
                OH_ArkWebResponse_SetCharset(response, "UTF-8");
            }
        }
        // 设置HTTP状态码为200。
        LibEcPrint("response status %{public}d", resp->status);
        OH_ArkWebResponse_SetStatus(response, resp->status);
        // 设置响应头
        for (const auto &pair : resp->headers) {
            LibEcPrint("response headers key : %{public}s  value : %{public}s", pair.first.c_str(), pair.second.c_str());
            OH_ArkWebResponse_SetHeaderByName(response, pair.first.c_str(), pair.second.c_str(), true);
        }
        OH_ArkWebResponse_SetHeaderByName(response, "Access-Control-Allow-Origin", "*", true);
        OH_ArkWebResponse_SetHeaderByName(response, "Access-Control-Allow-Headers", "*", true);
        
        // 获取自定义请求头数据并返回
        LibEcPrint("cusom response headers dealed : %{public}d  ", global_response_set_headers.count(methodName));
        LibEcPrint("cusom response headers dealed : %{public}s ", methodName.c_str());
        if (global_response_set_headers.count(methodName)  > 0) {
            LibEcPrint("cusom response headers dealed : %{public}s  ", "xxxx");
            auto map = global_response_set_headers.find(methodName);
            for (const auto &pair : map->second) {
                if (pair.first == "EC_RESPONSE_STATUS_CODE") {
                    OH_ArkWebResponse_SetStatus(response, std::stoi(pair.second));
                    continue;
                }
                LibEcPrint("custom response headers key : %{public}s  value : %{public}s", pair.first.c_str(), pair.second.c_str());
                OH_ArkWebResponse_SetHeaderByName(response, pair.first.c_str(), pair.second.c_str(), true);
            }
        }
        
        // 将为被拦截的请求创建的响应头传递给Web组件。
        OH_ArkWebResourceHandler_DidReceiveResponse(this->resourceHandler, response);
        // 该函数可以调用多次，数据可以分多份来传递给Web组件。
        // 方法 1: 使用固定大小的 uint8_t 数组
        size_t length = resp->body.size();
        uint8_t respBuffer[length];
        // 复制字符串到 uint8_t 数组
        for (size_t i = 0; i < length; ++i) {
            respBuffer[i] = static_cast<uint8_t>(resp->body[i]);
        }
        LibEcPrint("response body value : %{public}s", resp->body.c_str());
        OH_ArkWebResourceHandler_DidReceiveData(this->resourceHandler, respBuffer, length);
        int category = resp->status / 100; // 获取状态码的百位数字
        /**
         *    1xx：信息性响应
         *    2xx：成功响应
          *   3xx：重定向
          *   4xx：客户端错误
          *   5xx：服务器错误
         * */
        // 读取响应体结束，当然如果希望该请求失败的话也可以通过调用; 传递给Web组件一个错误码并结束该请求。
        OH_ArkWebResourceHandler_DidFinish(this->resourceHandler);
        // 清除内存
        this->cleanRequest();
    }
    
    void cleanRequest() {
        LibEcPrint("before clean %{public}d", global_multimap.size());
        clean_from_multimap(this->arkWeb_HttpBodyStream);
        LibEcPrint("after clean %{public}d", global_multimap.size());
    }

    std::vector<std::string> splitString(const std::string &str, const std::string &delimiter) {
        std::vector<std::string> tokens;
        std::regex re(delimiter);
        std::sregex_token_iterator it(str.begin(), str.end(), re, -1);
        std::sregex_token_iterator reg_end;
        for (; it != reg_end; ++it) {
            tokens.push_back(it->str());
        }
        return tokens;
    }
};


// 添加对应的请求
void add_to_multimap(ArkWeb_HttpBodyStream *HttpBodyStream, RawRequest rawRequest) {
    std::lock_guard<std::mutex> lock(multimap_mutex);
    global_multimap.insert({HttpBodyStream, rawRequest});
}
void clean_from_multimap(ArkWeb_HttpBodyStream *httpBodyStream) {
    std::lock_guard<std::mutex> lock(multimap_mutex);
    global_multimap.erase(httpBodyStream);
}


// HttpBodyStream的读回调。
void ReadCallback(const ArkWeb_HttpBodyStream *httpBodyStream, uint8_t *buffer, int bytesRead) {
    if (global_multimap.count(httpBodyStream) > 0) {
        auto rawfileRequest = global_multimap.find(httpBodyStream)->second;
        bool isEof = OH_ArkWebHttpBodyStream_IsEof(httpBodyStream);
        if (isEof) {
            LibEcPrint("bufferSize %{public}d", bytesRead);
            rawfileRequest._send(buffer, bytesRead);
        } else {
            // 如果没有请求发生错误
            LibEcPrint("数据长度不对", "");
        }
    } else {
        // 如果没有请求发生错误
        LibEcPrint("请求发生错误，该请求，在全局 map 中没有找到", "");
    }
}

// ArkWeb_HttpBodyStream的初始化回调。
void InitCallback(const ArkWeb_HttpBodyStream *httpBodyStream, ArkWeb_NetError result) {
    if (global_multimap.count(httpBodyStream) > 0) {
        uint64_t bufferSize = OH_ArkWebHttpBodyStream_GetSize(httpBodyStream);
        auto rawfileRequest = global_multimap.find(httpBodyStream)->second;
        // 一把读取完整数据
        LibEcPrint("bufferSize %{public}d", bufferSize);
        rawfileRequest.bufferSize = bufferSize;
        rawfileRequest.buffer = new uint8_t[bufferSize];
        memset(rawfileRequest.buffer, 0, bufferSize);
        OH_ArkWebHttpBodyStream_Read(httpBodyStream, rawfileRequest.buffer, bufferSize);
    } else {
        // 如果没有请求发生错误
        LibEcPrint("请求发生错误，该请求，在全局 map 中没有找到", "");
    }
}


void initRequest(ArkWeb_ResourceRequest *resourceRequest, httplib::Headers headers, RawRequest &result) {
    char *url;
    OH_ArkWebResourceRequest_GetUrl(resourceRequest, &url);
    char *method;
    OH_ArkWebResourceRequest_GetMethod(resourceRequest, &method);

    result.resourceRequest = resourceRequest;
    result.url = const_cast<char*>(url);
    result.method = const_cast<char*>(method);
    result.headers = headers;
}

void StartRequest(ArkWeb_ResourceRequest *resourceRequest, httplib::Headers headers, const ArkWeb_ResourceHandler *resourceHandler) { 
    RawRequest rawReq;
    initRequest(resourceRequest, headers, rawReq);
    rawReq.resourceHandler = resourceHandler;
    rawReq.sendRequest();
}














// 请求开始的回调，在该函数中我们创建一个RawfileRequest来实现对Web内核请求的拦截。
void OnURLRequestStart(const ArkWeb_SchemeHandler *schemeHandler, ArkWeb_ResourceRequest *resourceRequest,
                       const ArkWeb_ResourceHandler *resourceHandler, bool *intercept) {

    ArkWeb_RequestHeaderList *requestHeaderList;
    OH_ArkWebResourceRequest_GetRequestHeaders(resourceRequest, &requestHeaderList);
    size_t size = OH_ArkWebRequestHeaderList_GetSize(requestHeaderList);
    
    bool flag = false;
    httplib::Headers headers;
    for (int i = 0; i<size; i++) {
        char *key;
        char *value;
        OH_ArkWebRequestHeaderList_GetHeader(requestHeaderList, i, &key, &value);
        if ((*key == *"Origin") && (*value == *"null")) {
            flag = true;
        }
        // 插入临时变量
        headers.insert(std::make_pair(key, value));
        
        LibEcPrint("Header %{public}s %{public}s", key, value);
        
        OH_ArkWeb_ReleaseString(key);
        OH_ArkWeb_ReleaseString(value);
    }

    // 设置是否拦截该资源请求
    *intercept = flag;
    if (flag) {
        // 如果开始拦截，则自己发送网络请求
        StartRequest(resourceRequest, headers, resourceHandler);
    }
    OH_ArkWebRequestHeaderList_Destroy(requestHeaderList);
}

void setSchemetHandlerByCustom(char *scheme) {
    OH_ArkWeb_SetSchemeHandler(scheme, "ec-scheme-handler", g_schemeHandler);
    OH_ArkWebServiceWorker_SetSchemeHandler(scheme, g_schemeHandler);
}
// 设置SchemeHandler。
static napi_value InitWebSchemeHandler(napi_env env, napi_callback_info info) {
    OH_LOG_INFO(LOG_APP, "libec InitWebSchemeHandler");
//    
    OH_ArkWeb_CreateSchemeHandler(&g_schemeHandler);
    OH_ArkWebSchemeHandler_SetOnRequestStart(g_schemeHandler, OnURLRequestStart);
    
    setSchemetHandlerByCustom("http");
    setSchemetHandlerByCustom("https");
    setSchemetHandlerByCustom("options");

    return nullptr;
}

// 设置SchemeHandler。
static napi_value enableDebug(napi_env env, napi_callback_info info) {
    OH_LOG_INFO(LOG_APP, "libec enableDebug");
    _logDebug =  true;
    return nullptr;
}

// 设置指定请求方法的响应变量
static napi_value SetResponseHeaderWithRequestMethod(napi_env env, napi_callback_info info) {
    OH_LOG_INFO(LOG_APP, "libec SetResponseHeaderWithRequestMethod");
    size_t argc = 3;
    napi_value args[3] = {nullptr};
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
    
    
    size_t val_1_len = 0;
    napi_get_value_string_utf8(env, args[0], nullptr, 0, &val_1_len);   // 获取字符串长度到len
    char *val_1_buf = new char[val_1_len + 1];                                // 分配合适大小的char数组
    napi_get_value_string_utf8(env, args[0], val_1_buf, val_1_len + 1, &val_1_len); // 获取字符串


    size_t val_2_len = 0;
    napi_get_value_string_utf8(env, args[1], nullptr, 0, &val_2_len);              // 获取字符串长度到len
    char *val_2_buf = new char[val_2_len + 1];                                      // 分配合适大小的char数组
    napi_get_value_string_utf8(env, args[1], val_2_buf, val_2_len + 1, &val_2_len); // 获取字符串


    size_t val_3_len = 0;
    napi_get_value_string_utf8(env, args[2], nullptr, 0, &val_3_len);               // 获取字符串长度到len
    char *val_3_buf = new char[val_3_len + 1];                                      // 分配合适大小的char数组
    napi_get_value_string_utf8(env, args[2], val_3_buf, val_3_len + 1, &val_3_len); // 获取字符串


    LibEcPrint("set header args : %{public}s %{public}s %{public}s ", val_1_buf, val_2_buf, val_3_buf);

    std::string methodKey(val_1_buf);
    std::string headerKey(val_2_buf);
    std::string valueKey(val_3_buf);
    if (global_response_set_headers.count(methodKey) > 0) {
        auto map = global_response_set_headers.find(methodKey);
        map->second.insert({headerKey, valueKey});
        global_response_set_headers.insert({methodKey, map->second});
     } else {
        auto map = std::multimap<std::string, std::string>();
        map.insert({headerKey, valueKey});
        global_response_set_headers.insert({methodKey, map});
     }
    return nullptr;
}

EXTERN_C_START
static napi_value Init(napi_env env, napi_value exports)
{
    napi_property_descriptor desc[] = {
        { "InitWebSchemeHandler", nullptr, InitWebSchemeHandler, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "SetResponseHeaderWithRequestMethod", nullptr, SetResponseHeaderWithRequestMethod, nullptr, nullptr, nullptr, napi_default, nullptr },
        { "enableDebug", nullptr, enableDebug, nullptr, nullptr, nullptr, napi_default, nullptr }
    };
    napi_define_properties(env, exports, sizeof(desc) / sizeof(desc[0]), desc);
    return exports;
}
EXTERN_C_END

static napi_module demoModule = {
    .nm_version =1,
    .nm_flags = 0,
    .nm_filename = nullptr,
    .nm_register_func = Init,
    .nm_modname = "library",
    .nm_priv = ((void*)0),
    .reserved = { 0 },
};

extern "C" __attribute__((constructor)) void RegisterEcModule(void)
{
    napi_module_register(&demoModule);
}
