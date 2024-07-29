# 工程介绍

## 运行环境

IDE : 5.0.3.100+
API : SDK 12+

## CPP

library 库中为核心代码块

- ssl 加密库：crypto、internal、openssl
- httplib c++网络库
- napi_init.cpp 鸿蒙web拦截器

## 方法

- InitWebSchemeHandler 初始化 Web 拦截器
- enableDebug 开启日志
- SetResponseHeaderWithRequestMethod 自定义请求方法响应设置

## 代码介绍

```typescript
// 引入库
import { enableDebug, InitWebSchemeHandler, SetResponseHeaderWithRequestMethod } from 'library';
import WebView from '@ohos.web.webview';

// 这里的执行顺序不能变，InitWebSchemeHandler 必须在 initializeWebEngine 之后调用
WebView.WebviewController.initializeWebEngine()
InitWebSchemeHandler()
WebView.WebviewController.setWebDebuggingAccess(true)
        
// 开启日志
enableDebug();
// 所有的 options请求状态码响应头默认设置200
SetResponseHeaderWithRequestMethod("options", "EC_RESPONSE_STATUS_CODE", "200");

```