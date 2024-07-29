!function(e, a) {
    "object" == typeof exports && "object" == typeof module ? module.exports = a() : "function" == typeof define && define.amd ? define([], a) : "object" == typeof exports ? exports.ejs = a() : e.ejs = a()
}(this, function() {
    return t = {
        1: function(e, a, t) {
            "use strict";
            function s(e) {
                e = Object.prototype.toString.call(e).match(/^\[object\s(.*)\]$/)[1];
                return "String" !== e && "Number" !== e && "Boolean" !== e && "Undefined" !== e && "Null" !== e
            }
            t.d(a, "g", function() {
                return s
            }),
            t.d(a, "h", function() {
                return n
            }),
            t.d(a, "c", function() {
                return o
            }),
            t.d(a, "a", function() {
                return r
            }),
            t.d(a, "b", function() {
                return i
            }),
            t.d(a, "e", function() {
                return l
            }),
            t.d(a, "f", function() {
                return u
            }),
            t.d(a, "d", function() {
                return p
            }),
            t.d(a, "i", function() {
                return d
            });
            var n = function() {};
            function o(e) {
                if (!s(e))
                    throw new Error("extend请传对象");
                for (var t = e, a = arguments.length, n = new Array(1 < a ? a - 1 : 0), o = 1; o < a; o++)
                    n[o - 1] = arguments[o];
                return n.forEach(function(a) {
                    a && Object.keys(a).forEach(function(e) {
                        t[e] = a[e]
                    })
                }),
                t
            }
            function r(e, a) {
                if ("string" != typeof e || "string" != typeof a)
                    throw new Error("版本号应该是一个字符串");
                function c(e) {
                    return +e.replace(/[a-zA-Z]/g, function(e) {
                        return e.charCodeAt()
                    }).replace(/[^\d]/g, "")
                }
                return function e(a, t, n, o) {
                    for (var s = a.split(n), r = t.split(n), i = 0; i < s.length; i += 1) {
                        if (!r[i])
                            return o ? 1 : -1;
                        if (s[i].match(/-/) || r[i].match(/-/))
                            return e(s[i], r[i], "-", !0);
                        if (c(s[i]) > c(r[i]))
                            return 1;
                        if (c(s[i]) < c(r[i]))
                            return -1
                    }
                    return s.length === r.length ? 0 : o ? -1 : 1
                }(e, a, ".", !0)
            }
            function i() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ""
                  , a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 6
                  , t = 0;
                return e.split("").filter(function(e) {
                    return (t += /[\u4e00-\u9fa5]/.test(e) ? 2 : 1) <= a
                }).join("")
            }
            function c() {
                var e = window.location
                  , a = e.pathname.split("/")
                  , t = 2 < a.length
                  , a = "".concat(a[Number(t)], "/");
                return "".concat(e.protocol, "//").concat(e.host, "/").concat(a).replace(/[/]{2}$/, "/")
            }
            function l() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
                if (/^(http|https|ftp|epth|h5|file|\/\/)/g.test(e))
                    return e;
                if (/(\.\/)|(\.\.\/)/.test(e)) {
                    var a, t, n, o = e;
                    if (o)
                        return o.match(/(^\.\.\/)|(^\.\/)/g) ? (n = (a = window.location).pathname,
                        t = (t = o.match(/\.\.\//g)) && t.length || 0,
                        n = (n = n.split("/")).slice(0, n.length - (t + 1)).join("/"),
                        t = o.replace(/\.+\//g, ""),
                        n = "".concat(n, "/").concat(t),
                        "".concat(a.protocol, "//").concat(a.host).concat(n)) : "".concat(c()).concat("/" === o.substring(0, 1) ? o.substring(1) : o);
                    throw new Error("changeRelativePathToAbsolute传参不为空")
                }
                return "".concat(c()).concat("/" === e.substring(0, 1) ? e.substring(1) : e)
            }
            function u() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ""
                  , a = 1 < arguments.length ? arguments[1] : void 0
                  , t = !0 === (2 < arguments.length ? arguments[2] : void 0) ? e : l(e)
                  , n = "";
                return a && Object.keys(a).forEach(function(e) {
                    -1 === n.indexOf("?") && -1 === t.indexOf("?") ? n += "?" : n += "&",
                    n += "".concat(e, "=").concat(a[e])
                }),
                t += n
            }
            function p() {
                return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "").replace(/^data.*,/, "")
            }
            function d(e) {
                var a, e = e || {}, t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), n = [], o = e.radix || t.length, s = e.len || 32, e = e.type || "default", s = Math.min(s, 36);
                if (s = Math.max(s, 4),
                o = Math.min(o, 62),
                o = Math.max(o, 2),
                s) {
                    for (a = 0; a < s; a += 1)
                        n[a] = t[0 | Math.random() * o];
                    "default" === e && (23 < s && (n[23] = "-"),
                    18 < s && (n[18] = "-"),
                    13 < s && (n[13] = "-"),
                    8 < s) && (n[8] = "-")
                }
                return n.join("")
            }
        },
        17: function(e, a, t) {
            "use strict";
            function u(e) {
                var a, t = e;
                t.os = {},
                t.supportOsArray = ["dd", "xm", "wxWorkLocal", "wxWork", "wechat", "welink", "ddGov", "alipay", "miniH5", "primordial", "ejs", "h5"];
                t.extendOS = function(e, a) {
                    -1 === t.supportOsArray.indexOf(e) && (t.supportOsArray.unshift(e),
                    a) && a(t.os)
                }
                ,
                "undefined" == typeof weex ? window && window.navigator.userAgent && function(e) {
                    var a = e.match(/(Android);?[\s/]+([\d.]+)?/)
                      , t = (a && (this.os.android = !0,
                    this.os.version = a[2],
                    this.os.isBadAndroid = !/Chrome\/\d/.test(e)),
                    e.match(/(iPhone\sOS)\s([\d_]+)/));
                    t && (this.os.ios = !0,
                    this.os.iphone = !0,
                    this.os.version = t[2].replace(/_/g, "."));
                    e.match(/Mac/i) && (this.os.ios = !0);
                    t = e.match(/(iPad).*OS\s([\d_]+)/),
                    t && (this.os.ios = !0,
                    this.os.ipad = !0,
                    this.os.version = t[2].replace(/_/g, ".")),
                    t = /Firefox/.test(e),
                    (/(iPad|PlayBook)/.test(e) || a && !/Mobile/.test(e) || t && /Tablet/.test(e)) && (this.os.isTablet = !0),
                    a = e.match(/EpointEJS/i);
                    a && (this.os.ejs = !0),
                    e.match(/EpointMiniH5/i) && (this.os.ejs = !0,
                    this.os.miniH5 = !0);
                    e.match(/primordial/i) && (this.os.ejs = !0,
                    this.os.ejsCard = !0);
                    var t = e.match(/DingTalk/i)
                      , n = (t && (this.os.dd = !0),
                    e.match(/wxworklocal/i))
                      , o = (n && (this.os.wxWorkLocal = !0),
                    e.match(/wxwork/i))
                      , s = (!n && o && (this.os.wxWork = !0),
                    e.match(/MicroMessenger/i))
                      , r = (o || n || !s || (this.os.wechat = !0),
                    e.match(/welink/i))
                      , i = e.match(/cloudlink/i)
                      , c = ((r || i) && (this.os.welink = !0),
                    e.match(/hwminiapp/i))
                      , l = (c && (this.os.xm = !0),
                    e.match(/mPaaSClient/i))
                      , n = (t || n || o || s || r || i || c || !l || (this.os.ddGov = !0),
                    e.match(/alipay/i));
                    !l && n && (this.os.alipay = !0),
                    a || t || (this.os.h5 = !0)
                }
                .call(t, window.navigator.userAgent) : (t.os.weex = !0,
                a = (e = t).os,
                weex.isRegisteredModule("ejs") && (a.ejs = !0),
                "android" === weex.config.env.osName && (a.android = !0),
                "iOS" !== weex.config.env.osName && "ios" !== weex.config.env.osName || (a.ios = !0,
                weex.config.env.deviceModel.match("iPhone") ? a.iPhone = !0 : weex.config.env.deviceModel.match("iPad") && (a.ipad = !0)),
                a.version = weex.config.env.osVersion,
                e.supportOsArray.splice(e.supportOsArray.indexOf("weex"), 1),
                e.supportOsArray.splice(e.supportOsArray.indexOf("ejs") + 1, 0, "weex"))
            }
            t.d(a, "a", function() {
                return o
            });
            var n = {
                ERROR_TYPE_APIOS: {
                    code: 1001,
                    msg: "该API无法在当前OS下运行"
                },
                ERROR_TYPE_APIMODIFY: {
                    code: 1002,
                    msg: "不允许更改JSSDK的API"
                },
                ERROR_TYPE_MODULEMODIFY: {
                    code: 1003,
                    msg: "不允许更改JSSDK的模块"
                },
                ERROR_TYPE_APINOTEXIST: {
                    code: 1004,
                    msg: "调用了不存在的api"
                },
                ERROR_TYPE_PROTONOTEXIST: {
                    code: 1005,
                    msg: "调用错误，该组件api对应的proto不存在"
                },
                ERROR_TYPE_CUSTOMEAPINOTEXIST: {
                    code: 1006,
                    msg: "非容器下无法调用自定义组件API"
                },
                ERROR_TYPE_EVENTNOTEXIST: {
                    code: 1007,
                    msg: "对应的event事件在该环境下不存在"
                },
                ERROR_TYPE_INITVERSIONERROR: {
                    code: 1008,
                    msg: "初始化版本号错误，请检查容器api的实现情况"
                },
                ERROR_TYPE_APINEEDHIGHNATIVEVERSION: {
                    code: 1009,
                    msg: "当前API需要更高版本的容器支持"
                },
                ERROR_TYPE_READYMODIFY: {
                    code: 2001,
                    msg: "ready回调不允许多次设置"
                },
                ERROR_TYPE_CONFIGMODIFY: {
                    code: 2002,
                    msg: "config不允许多次调用"
                },
                ERROR_TYPE_CONFIGERROR: {
                    code: 2003,
                    msg: "config校验错误"
                },
                ERROR_TYPE_VERSIONNOTSUPPORT: {
                    code: 2004,
                    msg: "不支持当前容器版本，请确保容器与前端库版本匹配"
                },
                ERROR_TYPE_VERSIONNEEDUPGRADE: {
                    code: 2005,
                    msg: "当前JSSDK库小于容器版本，请将前端库升级到最新版本"
                },
                ERROR_TYPE_NATIVE: {
                    code: 3e3,
                    msg: "捕获到一处原生容器错误"
                },
                ERROR_TYPE_NATIVECALL: {
                    code: 3001,
                    msg: "原生调用H5时参数不对"
                },
                ERROR_TYPE_UNKNOWN: {
                    code: 9999,
                    msg: "未知错误"
                }
            }
              , p = t(4);
            function d(e) {
                var t, a = e;
                a.showError = function() {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0
                      , a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "错误!";
                    Object(p.b)("code:".concat(e, ", msg:").concat(a)),
                    t && t({
                        code: e,
                        message: a
                    })
                }
                ,
                a.globalError = n,
                a.error = function(e) {
                    t = e,
                    a.os.dd && window.dd && dd.error(t)
                }
            }
            var w = t(1);
            function m(e) {
                var u = e
                  , p = u.globalError
                  , d = {};
                function m(e, a) {
                    var t = [];
                    return t = e.length ? e.map(function(e) {
                        var t = e(a);
                        return t instanceof Promise ? t : new Promise(function(e, a) {
                            (!1 === t ? a : e)()
                        }
                        )
                    }) : t
                }
                function a(e, a) {
                    this.api = e,
                    this.apiName = this.api.moduleName + "." + this.api.namespace,
                    this.callback = a
                }
                u.addInterceptors = function(e, a) {
                    d[e] || (d[e] = {
                        invoke: [],
                        success: [],
                        error: []
                    }),
                    e = d[e],
                    a.invoke && e.invoke.push(a.invoke),
                    a.success && e.success.push(a.success),
                    a.error && e.error.push(a.error)
                }
                ,
                u.removeInterceptors = function(e, a) {
                    d[e] && (a ? d[e][a] && (d[e][a] = []) : d[e] = {
                        invoke: [],
                        success: [],
                        error: []
                    })
                }
                ,
                a.prototype.walk = function(i) {
                    var c = this
                      , l = u.getPromise();
                    return function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var o, n, s, r = a;
                        return void 0 === r[0] && (r[0] = {}),
                        c.api.defaultParams && r[0]instanceof Object && Object.keys(c.api.defaultParams).forEach(function(e) {
                            void 0 === r[0][e] && (r[0][e] = c.api.defaultParams[e])
                        }),
                        r[0] && r[0].h5UI ? (u[c.api.moduleName][c.api.namespace] = "h5",
                        delete r[0].h5UI,
                        u[c.api.moduleName][c.api.namespace] ? u[c.api.moduleName][c.api.namespace](r[0]) : console.error("请引入H5环境的ejs库")) : (u[c.api.moduleName][c.api.namespace] = !1,
                        c.callback && (o = c.callback),
                        c.api.support && u.nativeVersion && Object(w.a)(u.nativeVersion, c.api.support) < 0 && (n = "".concat(c.api.namespace, "要求的容器EJS版本至少为:").concat(c.api.support, "，当前容器EJS版本：").concat(u.nativeVersion, "，请升级"),
                        s = {
                            code: p.ERROR_TYPE_APINEEDHIGHNATIVEVERSION.code,
                            msg: n
                        },
                        i.ui && "function" == typeof i.ui.toast && i.ui.toast(n),
                        o = function() {
                            var e, a = arguments.length, t = arguments.length <= 0 ? void 0 : arguments[0];
                            l && (e = a - 1 < 0 || arguments.length <= a - 1 ? void 0 : arguments[a - 1]),
                            t.error && t.error(s),
                            e && e(s)
                        }
                        ),
                        o = o || function() {
                            var e, a = arguments.length, t = arguments.length <= 0 ? void 0 : arguments[0], n = "".concat(c.api.namespace, "未定义具体实现方法");
                            l && (e = a - 1 < 0 || arguments.length <= a - 1 ? void 0 : arguments[a - 1]),
                            t.error && t.error(n),
                            e && e(n)
                        }
                        ,
                        l ? d[c.apiName] ? new l(function(e, a) {
                            var t = m(d[c.apiName].invoke, r);
                            l.all(t).then(function() {
                                var t, n;
                                r[0] && r[0]instanceof Object && (t = r[0].success,
                                n = r[0].error,
                                r[0].success = function(e) {
                                    var a = m(d[c.apiName].success, e);
                                    l.all(a).then(function() {
                                        t && t(e)
                                    }).catch(function(e) {
                                        n && n(e)
                                    })
                                }
                                ,
                                r[0].error = function(e) {
                                    var a = m(d[c.apiName].error, e);
                                    l.all(a).then(function() {
                                        n && n(e)
                                    }).catch(function(e) {
                                        n && n(e)
                                    })
                                }
                                ),
                                r = r.concat([e, a]),
                                o && o.apply(c, r)
                            }).catch(function(e) {
                                console.warn("".concat(c.apiName, "的调用已被拦截："), e)
                            })
                        }
                        ) : o && new l(function(e, a) {
                            r = r.concat([e, a]),
                            o.apply(c, r)
                        }
                        ) : o && o.apply(c, r))
                    }
                }
                ,
                a.prototype.dispose = function() {
                    this.apiName = null,
                    this.api = null,
                    this.callback = null
                }
                ,
                u.Proxy = a
            }
            function f(e) {
                var m = e
                  , f = m.Proxy
                  , g = m.globalError
                  , h = m.showError
                  , v = m.os
                  , y = {}
                  , t = {}
                  , b = m.supportOsArray;
                function j(e, a) {
                    var t = e.h5
                      , n = function(e) {
                        for (var a = [], t = 0, n = b.length; t < n; t += 1)
                            e[b[t]] && a.push(b[t]);
                        return a.length ? a : "h5"
                    }(a);
                    if ("h5" !== e.useOs && Array.isArray(n) && n.length)
                        for (var o = 0; o < n.length; o += 1) {
                            var s = n[o];
                            if (e[s]) {
                                t = e[s];
                                break
                            }
                        }
                    return t
                }
                function P(e, a) {
                    Object.defineProperty(a, e, {
                        configurable: !0,
                        enumerable: !0,
                        get: function() {
                            return t[e] || (t[e] = {}),
                            t[e]
                        },
                        set: function() {
                            h(g.ERROR_TYPE_MODULEMODIFY.code, g.ERROR_TYPE_MODULEMODIFY.msg)
                        }
                    })
                }
                function o(e, a, t) {
                    var n, o, s, r, i, c, l, u, p, d = t || this;
                    e && "string" == typeof e && a && a.namespace && (d[e] || P(e, d),
                    n = a,
                    a = d[e],
                    d = n.namespace,
                    n.moduleName = e,
                    o = a,
                    (/[.]/.test(a = d) ? a.replace(/[.][^.]+$/, "").split(".") : []).forEach(function(e) {
                        o[e] = o[e] || {},
                        o = o[e]
                    }),
                    a = o,
                    s = "".concat(e, ".").concat(n.namespace),
                    e = /[.]/.test(d) ? n.namespace.match(/[.][^.]+$/)[0].substr(1) : d,
                    y[s] || (r = e,
                    i = s,
                    c = t,
                    Object.defineProperty(a, r, {
                        configurable: !0,
                        enumerable: !0,
                        get: function() {
                            var e = y[i]
                              , a = j(e, v);
                            return a ? a.walk(c) : ("h5" === e.useOs ? console.error("请引入H5环境的ejs库") : (a = (e = (a = e.os) ? a.map(function(e) {
                                switch (e) {
                                default:
                                    return e;
                                case "ejs":
                                    return "EJS客户端";
                                case "dd":
                                    return "钉钉容器";
                                case "xm":
                                    return "迅盟容器";
                                case "h5":
                                    return "浏览器"
                                }
                            }) : "") ? e.join("或") : "该api未定义可执行的环境os",
                            e = "".concat(r, "要求的os环境为:").concat(a, "，请检查是否引入当前环境的ejs库"),
                            h(g.ERROR_TYPE_APIOS.code, e)),
                            w.h)
                        },
                        set: function(e) {
                            var a = y[i];
                            "h5" === e ? a.useOs = "h5" : !1 === e ? a.useOs = !1 : h(g.ERROR_TYPE_APIMODIFY.code, g.ERROR_TYPE_APIMODIFY.msg)
                        }
                    })),
                    d = (d = n.runCode) || m.callInner,
                    l = new f(n,d),
                    u = y[s] || {},
                    p = {},
                    y[s] = {},
                    b.forEach(function(e) {
                        n.os && -1 !== n.os.indexOf(e) ? (y[s][e] = l,
                        p[e] = !0) : u[e] && (y[s][e] = u[e],
                        n.os) && n.os.push(e)
                    }),
                    y[s].os = n.os,
                    Object.keys(p).forEach(function(e) {
                        u[e] && u[e].dispose()
                    }))
                }
                m.extendModule = function(e, a) {
                    if (e && "string" == typeof e && a && Array.isArray(a)) {
                        this[e] || P(e, this);
                        for (var t = 0, n = a.length; t < n; t += 1)
                            o(e, a[t], this)
                    }
                }
                ,
                m.extendApi = o
            }
            function g(e) {
                var u = e
                  , p = {};
                (u.innerUtil = p).extend = w.c,
                p.isObject = w.g,
                p.getFullPath = w.e,
                p.getFullUrlByParams = w.f,
                p.eclipseText = w.b,
                p.compatibleStringParamsToObject = function(e) {
                    var a = this
                      , t = e;
                    if (!e || !Array.isArray(e))
                        return e;
                    if (!p.isObject(t[0])) {
                        for (var n = {}, e = !!u.getPromise(), o = t.length, s = e ? o - 2 : o, r = arguments.length, i = new Array(1 < r ? r - 1 : 0), c = 1; c < r; c++)
                            i[c - 1] = arguments[c];
                        for (var l = 0; l < s; l += 1)
                            void 0 !== i[l] && (n[i[l]] = t[l]);
                        t[0] = n,
                        e ? (t[1] = t[o - 2],
                        t[2] = t[o - 1]) : (t[1] = void 0,
                        t[2] = void 0)
                    }
                    return this.api && this.api.defaultParams && t[0]instanceof Object && Object.keys(this.api.defaultParams).forEach(function(e) {
                        void 0 === t[0][e] && (t[0][e] = a.api.defaultParams[e])
                    }),
                    t
                }
                ,
                p.eclipseButtonsNumber = function(e, a) {
                    var t;
                    return e && Array.isArray(e) && a < (t = e.length) && (e.length = t - (t - a)),
                    e
                }
                ,
                p.getBase64NotUrl = w.d
            }
            var l = null
              , h = null;
            function v(a, o, s, r, i) {
                function t(n) {
                    return new Promise(function(a, t) {
                        var e = {
                            url: "".concat(o).concat(n),
                            data: s,
                            contentType: "application/x-www-form-urlencoded",
                            isAutoProxy: !0,
                            success: function(e) {
                                e.status && 1 === parseInt(e.status.code, 10) ? (i && i(e.custom),
                                t()) : a(e)
                            },
                            error: function(e) {
                                console.log(e),
                                a(e)
                            }
                        };
                        Config.version && Object(w.a)(Config.version, "8.0.0") < 0 && (e.data = function(e) {
                            var a, t = [];
                            for (a in e)
                                t.push(encodeURIComponent(a) + "=" + encodeURIComponent(e[a]));
                            return t.join("&").replace(/%20/g, "+")
                        }(e.data)),
                        r && (e.isAutoProxy = !1,
                        e.headers = {
                            Authorization: "Bearer ".concat(r)
                        }),
                        l(e)
                    }
                    )
                }
                "wxWorkLocal" === a ? s.tickettype = "govweixin" : "wxWork" === a && (s.tickettype = "weixin"),
                t("rest/thirdparty/common/getJsTicket").then(function(e) {
                    console.log("通过新版getJsTicket接口获取鉴权参数失败"),
                    console.log("改为使用旧版getJsTicket接口获取鉴权参数"),
                    "wxWorkLocal" !== a && "wxWork" !== a || (s.tickettype = "weixin"),
                    t("rest/common/getJsTicket").then(function(e) {
                        console.error(e)
                    }).catch(function(e) {
                        console.log("获取JSTicket成功")
                    })
                }).catch(function(e) {
                    console.log("获取JSTicket成功")
                })
            }
            function y(o, r, i, c, e, a) {
                return l = e,
                h = a,
                new Promise(function(a, e) {
                    function t(e) {
                        e.jsApiSignature ? a(e) : (e = {
                            nonceStr: e.nonceStr,
                            jsApiSignature: e.signature,
                            corpId: e.corpId,
                            timestamp: e.timestamp,
                            userInfoSignature: "",
                            dingtalk_agentid: e.dingtalk_agentid
                        },
                        a(e))
                    }
                    var s, n = {
                        tickettype: "dingtalk",
                        pageurl: window.location.href.replace(window.location.hash, ""),
                        agentid: c || ""
                    };
                    s = r,
                    new Promise(function(t, n) {
                        var o = "".concat(s, "rest/common/getSSOUrl");
                        l({
                            url: o,
                            contentType: "application/x-www-form-urlencoded",
                            type: "GET",
                            isAutoProxy: !1,
                            success: function(e) {
                                var a = e.custom && e.custom.ssourl || "";
                                "/" === a.substring(a.length - 1) && (a = a.substring(0, a.length - 1)),
                                e.status && 1 === parseInt(e.status.code, 10) && a && a !== o ? h.storage.setItem({
                                    h5Home_sso_url: e.custom.ssourl,
                                    success: function() {
                                        console.log("ejs存储sso地址成功"),
                                        t(e.custom.ssourl)
                                    },
                                    error: function(e) {
                                        console.error("ejs存储sso地址失败", e),
                                        n(e)
                                    }
                                }) : (console.error("ejs存储sso地址失败", e),
                                n(e))
                            },
                            error: function(e) {
                                console.error("ejs存储sso地址失败", e),
                                n(e)
                            }
                        })
                    }
                    ).then(function(e) {
                        e += "/" === e.substring(e.length - 1) ? "" : "/",
                        v(o, e, n, i, t)
                    }).catch(function() {
                        console.log("获取sso地址失败，使用传进来的url获取鉴权参数"),
                        v(o, r, n, i, t)
                    })
                }
                )
            }
            function b(e) {
                var s = e
                  , r = s.showError
                  , i = s.globalError;
                s.extendModule("event", [{
                    namespace: "config",
                    os: ["ejs"],
                    defaultParams: {
                        jsApiList: []
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n, o = a;
                        (n = s).runtime && n.runtime.getEjsVersion ? n.runtime.getEjsVersion({
                            success: function(e) {
                                s.nativeVersion = e.version
                            },
                            error: function() {
                                r(i.ERROR_TYPE_INITVERSIONERROR.code, i.ERROR_TYPE_INITVERSIONERROR.msg)
                            }
                        }) : r(i.ERROR_TYPE_VERSIONNOTSUPPORT.code, i.ERROR_TYPE_VERSIONNOTSUPPORT.msg),
                        s.callInner.apply(this, o)
                    }
                }])
            }
            function o(e) {
                var a, t, n, o, s, r, i, c, l;
                e.version = "4.2.11",
                u(e),
                (a = e).Promise = Promise,
                a.getPromise = function() {
                    return a.Promise
                }
                ,
                a.setPromise = function(e) {
                    a.Promise = e
                }
                ,
                d(e),
                m(e),
                f(e),
                o = (t = e).globalError,
                s = t.showError,
                i = r = !1,
                t.config = function(e) {
                    var a;
                    i ? s(o.ERROR_TYPE_CONFIGMODIFY.code, o.ERROR_TYPE_CONFIGMODIFY.msg) : (i = !0,
                    a = function() {
                        r = !0,
                        n && (Object(p.a)("ready!"),
                        n())
                    }
                    ,
                    this.os.h5 || this.os.miniprogram ? a() : this.event && this.event.config ? this.event.config(Object(w.c)({
                        success: function() {
                            a()
                        },
                        error: function(e) {
                            e = JSON.stringify(e);
                            s(o.ERROR_TYPE_CONFIGERROR.code, e)
                        }
                    }, e)) : s(o.ERROR_TYPE_UNKNOWN.code, "当前event.config方法不存在，请确认是否引入了对应环境下的ejs文件"))
                }
                ,
                t.ready = function(e) {
                    n = e,
                    r && (Object(p.a)("ready!"),
                    n())
                }
                ,
                t.app = function(e) {
                    this.event.app(Object(w.c)({}, e))
                }
                ,
                t.callApi = function() {
                    console.error("未引入ejs环境文件")
                }
                ,
                g(e),
                b(e),
                (c = e).extendModule("event", [{
                    namespace: "config",
                    os: ["wxWork", "wxWorkLocal"],
                    defaultParams: {
                        jsApiList: []
                    },
                    runCode: function(r) {
                        var i;
                        1 === r.isAutoConfig && r.jsApiList && 0 < r.jsApiList.length && window.self === window.top ? window.wx ? (i = "wxWork",
                        y(i = c.os.wxWorkLocal ? "wxWorkLocal" : i, r.preUrl, r.token, r.agentId, r.ajax, c).then(function(e) {
                            var a = e.nonceStr
                              , t = e.jsApiSignature
                              , n = e.corpId
                              , o = e.timestamp
                              , s = e.userInfoSignature
                              , o = Number(o);
                            wx.config({
                                beta: !0,
                                debug: !1,
                                appId: n,
                                timestamp: o,
                                nonceStr: a,
                                signature: t,
                                jsApiList: r.jsApiList || []
                            }),
                            wx.ready(function() {
                                Object(p.a)(i + " ready"),
                                r.agentId && s ? c.os.wxWorkLocal ? wx.invoke("agentConfig", {
                                    agentid: r.agentId,
                                    corpid: n,
                                    timestamp: o,
                                    nonceStr: a,
                                    signature: s
                                }, function(e) {
                                    "agentConfig:ok" != e.err_msg ? (c.ui.alert("应用身份鉴权失败"),
                                    console.log(e)) : (Object(p.a)(i + " agentConfig ready"),
                                    r.success && r.success())
                                }) : wx.agentConfig({
                                    corpid: n,
                                    agentid: r.agentId,
                                    timestamp: o,
                                    nonceStr: a,
                                    signature: s,
                                    jsApiList: r.jsApiList || [],
                                    success: function(e) {
                                        Object(p.a)(i + " agentConfig ready"),
                                        r.success && r.success()
                                    },
                                    fail: function(e) {
                                        console.warn(e),
                                        -1 < e.errMsg.indexOf("function not exist") && c.ui.alert("应用身份鉴权失败, 版本过低请升级"),
                                        r.success && r.success()
                                    }
                                }) : r.success && r.success()
                            }),
                            wx.error(function(e) {
                                console.log("wxWork error: ".concat(JSON.stringify(e))),
                                r.success && r.success()
                            })
                        })) : c.ui.toast("未引入企业微信的JSSDK，无法自动鉴权") : r.success && r.success()
                    }
                }]),
                (l = e).extendModule("event", [{
                    namespace: "config",
                    os: ["dd"],
                    runCode: function(s) {
                        1 === s.isAutoConfig && s.jsApiList && 0 < s.jsApiList.length ? (s.preUrl += "/" === s.preUrl.substring(s.preUrl.length - 1) ? "" : "/",
                        window.dd ? y("dd", s.preUrl, s.token, s.agentId, s.ajax, l).then(function(e) {
                            var a = e.nonceStr
                              , t = e.jsApiSignature
                              , n = e.corpId
                              , o = e.timestamp
                              , e = e.dingtalk_agentid;
                            dd.config({
                                agentId: e || s.agentId || "",
                                corpId: n,
                                timeStamp: o,
                                nonceStr: a,
                                signature: t,
                                type: 0,
                                jsApiList: s.jsApiList || ["runtime.info", "biz.contact.choose", "device.notification.confirm", "device.notification.alert", "device.notification.prompt", "biz.ding.post", "biz.util.openLink", "biz.contact.complexPicker", "biz.cspace.saveFile", "biz.cspace.preview", "biz.cspace.chooseSpaceDir", "biz.util.uploadAttachment"]
                            }),
                            dd.error(function(e) {
                                console.log("dd error: ".concat(JSON.stringify(e))),
                                s.success && s.success()
                            }),
                            dd.ready(function() {
                                Object(p.a)("dd ready"),
                                localStorage.setItem("corpId", n),
                                s.success && s.success()
                            })
                        }) : l.ui.toast("未引入钉钉的JSSDK，无法自动鉴权")) : s.success && s.success()
                    }
                }])
            }
        },
        24: function(e, a, t) {
            "use strict";
            function n(e) {
                var c = e
                  , l = c.innerUtil;
                c.extendModule("ui", [{
                    namespace: "toast",
                    os: ["ejs"],
                    defaultParams: {
                        message: "",
                        h5UI: !1
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = l.compatibleStringParamsToObject.call(this, a, "message");
                        n[0].message = n[0].message || String(n[0].message),
                        c.callInner.apply(this, n)
                    }
                }, {
                    namespace: "showDebugDialog",
                    os: ["ejs"],
                    defaultParams: {
                        debugInfo: "",
                        h5UI: !1
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = l.compatibleStringParamsToObject(a, "debugInfo");
                        n[0].debugInfo = String(n[0].debugInfo),
                        c.callInner.apply(this, n)
                    }
                }, {
                    namespace: "alert",
                    os: ["ejs"],
                    defaultParams: {
                        title: "",
                        message: "",
                        cancelable: 1,
                        h5UI: !1
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = l.compatibleStringParamsToObject.call(this, a, "message", "title", "buttonName");
                        n[0].buttonLabels = [String(n[0].buttonName || "确定")],
                        c.ui.confirm.apply(this, n)
                    }
                }, {
                    namespace: "confirm",
                    os: ["ejs"],
                    defaultParams: {
                        title: "",
                        message: "",
                        buttonLabels: [],
                        cancelable: 1,
                        h5UI: !1
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a;
                        n[0].title = String(n[0].title),
                        n[0].message = String(n[0].message),
                        n[0].buttonLabels = n[0].buttonLabels.length ? n[0].buttonLabels.map(function(e) {
                            return String(e)
                        }) : ["取消", "确定"],
                        c.callInner.apply(this, n)
                    }
                }, {
                    namespace: "prompt",
                    os: ["ejs"],
                    defaultParams: {
                        title: "",
                        hint: "",
                        text: "",
                        lines: 1,
                        maxLength: 1e4,
                        cancelable: 1,
                        h5UI: !1
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a;
                        n[0].buttonLabels = n[0].buttonLabels && n[0].buttonLabels.length ? n[0].buttonLabels : ["取消", "确定"],
                        c.callInner.apply(this, n)
                    }
                }, {
                    namespace: "select",
                    os: ["ejs"],
                    defaultParams: {
                        title: "",
                        items: [],
                        choiceState: [],
                        isMultiSelect: 0,
                        type: 0,
                        columns: 2,
                        cancelable: 1,
                        isShowSelectAll: 0,
                        h5UI: !1
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0]
                          , s = o.items;
                        o.dataFilter = function(e) {
                            var a = e;
                            if (a.result) {
                                var t = a.result.choiceState;
                                if (void 0 !== a.result.which)
                                    e = a.result.which || 0,
                                    e = s[e],
                                    a.result.content = decodeURIComponent(e);
                                else if (void 0 !== t) {
                                    a.result.choiceContent = [];
                                    for (var n = 0, o = t.length; n < o; n += 1)
                                        1 == +t[n] && a.result.choiceContent.push(s[n])
                                }
                            }
                            return a
                        }
                        ,
                        n[0] = o,
                        c.callInner.apply(this, n)
                    }
                }, {
                    namespace: "actionSheet",
                    os: ["ejs"],
                    defaultParams: {
                        items: [],
                        cancelable: 1,
                        h5UI: !1
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0]
                          , s = o.items;
                        o.dataFilter = function(e) {
                            var a;
                            return e.result && (a = e.result.which || 0,
                            a = s[a],
                            e.result.content = decodeURIComponent(a)),
                            e
                        }
                        ,
                        n[0] = o,
                        c.callInner.apply(this, n)
                    }
                }, {
                    namespace: "popWindow",
                    os: ["ejs"],
                    defaultParams: {
                        titleItems: [],
                        iconItems: void 0,
                        iconFilterColor: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0]
                          , s = o.titleItems;
                        if (o.iconItems)
                            for (var r = 0, i = o.iconItems.length; r < i; r += 1)
                                o.iconItems[r] = l.getFullPath(o.iconItems[r]);
                        o.dataFilter = function(e) {
                            var a;
                            return e.result && (a = e.result.which || 0,
                            a = s[a],
                            e.result.content = decodeURIComponent(a)),
                            e
                        }
                        ,
                        n[0] = o,
                        c.callInner.apply(this, n)
                    }
                }, {
                    namespace: "pickDate",
                    os: ["ejs"],
                    defaultParams: {
                        minDate: "",
                        maxDate: "",
                        title: "",
                        datetime: "",
                        h5UI: !1
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        c.callInner.apply(this, a)
                    }
                }, {
                    namespace: "pickTime",
                    os: ["ejs"],
                    defaultParams: {
                        title: "",
                        datetime: "",
                        minHour: 0,
                        maxHour: 23,
                        minMinute: 0,
                        maxMinute: 59,
                        h5UI: !1
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        c.callInner.apply(this, a)
                    }
                }, {
                    namespace: "pickDateTime",
                    os: ["ejs"],
                    defaultParams: {
                        title1: "",
                        title2: "",
                        minDate: "",
                        maxDate: "",
                        datetime: "",
                        showSecond: !1,
                        h5UI: !1
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        c.callInner.apply(this, a)
                    }
                }, {
                    namespace: "showWaiting",
                    os: ["ejs"],
                    defaultParams: {
                        message: "",
                        h5UI: !1
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = l.compatibleStringParamsToObject.call(this, a, "message");
                        n[0].message = String(n[0].message),
                        c.callInner.apply(this, n)
                    }
                }, {
                    namespace: "closeWaiting",
                    os: ["ejs"],
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        c.callInner.apply(this, a)
                    }
                }, {
                    namespace: "toastAndEvent",
                    os: ["ejs"],
                    defaultParams: {
                        message: "",
                        buttonName: "",
                        iconType: "0",
                        duration: "2000",
                        position: "",
                        h5UI: !1
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = l.compatibleStringParamsToObject.call(this, a, "message");
                        n[0].message = String(n[0].message),
                        n[0].buttonName = String(n[0].buttonName),
                        c.callInner.apply(this, n)
                    }
                }])
            }
            t.d(a, "a", function() {
                return n
            })
        },
        25: function(e, a, t) {
            "use strict";
            t.d(a, "a", function() {
                return r
            });
            var O = t(1);
            var g = t(4);
            function c(e) {
                return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                )(e)
            }
            var h = "EpointJSBridge"
              , n = [8193, 8194, 8195]
              , o = 65536;
            function v() {
                return function e(a) {
                    return -1 !== n.indexOf(a) ? e(Math.floor(Math.random() * o)) : a
                }(Math.floor(Math.random() * o))
            }
            function s() {
                return --o
            }
            function y(s, r, i) {
                r && Object.keys(r).forEach(function(e) {
                    var a, t, n, o;
                    "function" == typeof r[e] ? r[e] = (a = s,
                    t = r[e],
                    n = i,
                    o = v(),
                    n.responseCallbacks[o] = t,
                    a.funcitonCallbackId.push(o),
                    "JSBridgeParamForCallback://".concat(o)) : "object" === c(r[e]) && y(s, r[e], i)
                })
            }
            function b(e) {
                return "string" != typeof e ? JSON.stringify(e) : e
            }
            function E(r) {
                var i = r
                  , c = Object(O.i)({
                    len: 10,
                    type: "noline"
                })
                  , l = (window.JSBridge = window.JSBridge || {},
                window.JSBridge)
                  , u = i.showError
                  , p = i.globalError
                  , d = i.os;
                function m(a) {
                    var t = a.callbackIframeUUid || a.iframeUuid
                      , e = document.getElementsByTagName("iframe");
                    [].forEach.call(e, function(e) {
                        e.contentWindow.postMessage({
                            iframeUuid: t,
                            message: a
                        }, "*")
                    })
                }
                function f(e, a) {
                    var t, n, o, e = "".concat(h, "://").concat(e);
                    return a.callbackId && (t = a.callbackId,
                    n = a.handlerName,
                    o = a.data),
                    window.self !== window.top && (o.callbackFunc = function e(a, t) {
                        var n, o;
                        if (a.parent === a)
                            0 <= (t || "").length && (n = t);
                        else
                            try {
                                for (var s = a.parent, r = s.document.getElementsByTagName("iframe"), i = 0, c = 0; c < r.length; c += 1)
                                    if (r[c].contentWindow === a) {
                                        i = c;
                                        break
                                    }
                                0 < (t || "").length && (o = ".".concat(t)),
                                n = e(s, 'document.getElementsByTagName("iframe")['.concat(i, "].contentWindow").concat(o || ""))
                            } catch (e) {
                                console.error("识别当前页面为iframe下跨域使用ejsapi\n为了正常使用ejsapi，请确认：\n移动前端框架ejs版本v4.0.3-c及以上\nv7容器ejs组件版本v3.5.1.e(Android)、v3.5.1.l(iOS)及以上\nM8容器ejs组件版本v4.0.3.c及以上\n同时iframe标签请去除sandbox属性或者sandbox属性增加allow-modals值")
                            }
                        return n
                    }(window),
                    o.callbackIframeUUid = "".concat(c)),
                    o = encodeURIComponent(b(o)),
                    e += ":".concat(t, "/").concat(n, "?").concat(o)
                }
                function o(e, a, t) {
                    var o, s, n = a, a = (n.funcitonCallbackId = [],
                    y(n, a.data, i),
                    "function" == typeof t ? (a = v(),
                    l.responseCallbacks[a] = t,
                    n.callbackId = a,
                    0 < n.funcitonCallbackId.length && (l.functionCallbacks[a] = n.funcitonCallbackId)) : n.callbackId = t,
                    f(e, n));
                    d.ejs ? d.ios ? window.webkit.messageHandlers.WKWebViewJavascriptBridge.postMessage(a) : d.android && 5e3 < a.length ? (t = function(e) {
                        for (var a = [], t = 0, n = e.length; t < n / 5e3; t += 1) {
                            var o = e.slice(5e3 * t, 5e3 * (t + 1));
                            a.push(o)
                        }
                        return a
                    }(a),
                    o = n.callbackId,
                    s = [],
                    t.forEach(function(e, a) {
                        n = o,
                        e = e,
                        t = a;
                        var t, n = "4.0.3" < r.version ? "EpointJSBridge://storage:".concat(n + 99, "/setLongCache?").concat(encodeURIComponent('{"'.concat(n, "-").concat(t, '":"').concat(e, '"}'))) : "EpointJSBridge://storage:".concat(n + 99, '/setItem?{"').concat(n, "-").concat(t, '":"').concat(e, '"}');
                        window.prompt(n, ""),
                        s.push("".concat(o, "-").concat(a))
                    }),
                    e = "EpointJSBridge://veryLongString?{'storageKey':".concat(JSON.stringify(s), "}"),
                    window.prompt(e, "")) : d.android ? window.prompt(a, "") : Object(g.b)("当前ejs环境未识别系统类型，对应ua:".concat(navigator.userAgent)) : Object(g.b)("浏览器中jsbridge无效,对应scheme:".concat(a))
                }
                (i.JSBridge = l).messageHandlers || (l.messageHandlers = {}),
                l.responseCallbacks || (l.responseCallbacks = {}),
                l.responseCallbacksLongTerm || (l.responseCallbacksLongTerm = {}),
                l.functionCallbacks || (l.functionCallbacks = {}),
                l.registerHandler = function(e, a) {
                    l.messageHandlers[e] = a
                }
                ,
                l.registerLongCallback = function(e, a) {
                    l.responseCallbacksLongTerm[e] = a
                }
                ,
                l.getLongCallbackId = s,
                l.callHandler = function(e, a, t, n) {
                    o(e, {
                        handlerName: a,
                        data: t
                    }, n)
                }
                ,
                l._handleParamCallbackMessageFromNative = function(s) {
                    setTimeout(function() {
                        var e, a = window.JSBridge || l || {};
                        if (s) {
                            try {
                                e = "string" == typeof s ? (e = decodeURIComponent(s),
                                JSON.parse(e)) : s
                            } catch (e) {
                                return void u(p.ERROR_TYPE_NATIVECALL.code, p.ERROR_TYPE_NATIVECALL.msg)
                            }
                            var t, n = e.responseId, o = e.responseData;
                            n ? (t = (t = a.responseCallbacks[n]) || a.responseCallbacksLongTerm[n],
                            o && 1 === o.code ? o.result && t && t(o.result) : (console.error("原生返回的参数函数回调responseData"),
                            console.error(o))) : (n = a.messageHandlers[e.handlerName],
                            t = e.data,
                            n ? n(t) : u(0, "未在本地找到".concat(e.handlerName, "方法的回调")))
                        } else
                            u(p.ERROR_TYPE_NATIVECALL.code, p.ERROR_TYPE_NATIVECALL.msg)
                    })
                }
                ,
                l._handleMessageFromNative = function(s) {
                    setTimeout(function() {
                        var e, a = window.JSBridge || l || {};
                        if (s) {
                            try {
                                e = "string" == typeof s ? (e = decodeURIComponent(s),
                                JSON.parse(e)) : s
                            } catch (e) {
                                return void u(p.ERROR_TYPE_NATIVECALL.code, p.ERROR_TYPE_NATIVECALL.msg)
                            }
                            var t, n = e.responseId, o = e.responseData;
                            n ? ((t = (t = a.responseCallbacks[n]) || a.responseCallbacksLongTerm[n]) && t(o),
                            delete a.responseCallbacks[n],
                            a.functionCallbacks[n] && a.functionCallbacks[n].forEach(function(e) {
                                delete a.responseCallbacks[e]
                            })) : (t = a.messageHandlers[e.handlerName],
                            o = e.data,
                            t ? t(o) : u(0, "未在本地找到".concat(e.handlerName, "方法的回调")))
                        } else
                            u(p.ERROR_TYPE_NATIVECALL.code, p.ERROR_TYPE_NATIVECALL.msg)
                    })
                }
                ,
                l._handlePostMessage = function(e) {
                    var a;
                    try {
                        a = "string" == typeof e ? (a = decodeURIComponent(e),
                        JSON.parse(a)) : e
                    } catch (e) {
                        return void u(p.ERROR_TYPE_NATIVECALL.code, p.ERROR_TYPE_NATIVECALL.msg)
                    }
                    m(a)
                }
                ,
                window.addEventListener("message", function(e) {
                    var a, t, n, o, s;
                    e.data && e.data.message && ((e = e.data.message).iframeUuid === c ? (t = window.JSBridge || l || {},
                    a = t,
                    o = (t = e).responseId,
                    s = t.responseData,
                    o ? ((n = (n = a.responseCallbacks[o]) || a.responseCallbacksLongTerm[o]) && n(s),
                    delete a.responseCallbacks[o],
                    a.functionCallbacks[o] && a.functionCallbacks[o].forEach(function(e) {
                        delete a.responseCallbacks[e]
                    })) : (n = a.messageHandlers[t.handlerName],
                    s = t.data,
                    n && n(s))) : m(e))
                }),
                window && document && document.addEventListener("DOMContentLoaded", function() {
                    i.os.ejs && i.event.dispatchEventToNative && i.event.dispatchEventToNative({
                        key: "DOMContentLoaded"
                    })
                }),
                l.registerHandler("handleError", function(e) {
                    u(p.ERROR_TYPE_NATIVE.code, JSON.stringify(e))
                })
            }
            function C(e) {
                var i = e
                  , c = i.JSBridge || {}
                  , a = i.showError
                  , t = i.globalError
                  , l = i.os;
                function o(e, a, t) {
                    var n, o, s, r = a, e = (r.funcitonCallbackId = [],
                    y(r, a.data, i),
                    "function" == typeof t ? (a = v(),
                    c.responseCallbacks[a] = t,
                    r.callbackId = a,
                    0 < r.funcitonCallbackId.length && (c.functionCallbacks[a] = r.funcitonCallbackId)) : r.callbackId = t,
                    a = e,
                    t = r,
                    a = "".concat(h, "://").concat(a),
                    t.callbackId && (n = t.callbackId,
                    o = t.handlerName,
                    s = t.data),
                    s = encodeURIComponent(b(s)),
                    a += ":".concat(n, "/").concat(o, "?").concat(s));
                    l.ejs && l.weex ? weex.requireModule("ejs").postMessage(e, function() {
                        console.log("success")
                    }) : Object(g.b)("浏览器中jsbridge无效,对应scheme:".concat(e))
                }
                (i.JSBridge = c).messageHandlers || (c.messageHandlers = {}),
                c.responseCallbacks || (c.responseCallbacks = {}),
                c.responseCallbacksLongTerm || (c.responseCallbacksLongTerm = {}),
                c.functionCallbacks || (c.functionCallbacks = {}),
                c.registerHandler = function(e, a) {
                    c.messageHandlers[e] = a
                }
                ,
                c.registerLongCallback = function(e, a) {
                    c.responseCallbacksLongTerm[e] = a
                }
                ,
                c.getLongCallbackId = s,
                c.callHandler = function(e, a, t, n) {
                    o(e, {
                        handlerName: a,
                        data: t
                    }, n)
                }
                ,
                c.registerHandler("handleError", function(e) {
                    a(t.ERROR_TYPE_NATIVE.code, JSON.stringify(e))
                }),
                weex.requireModule("globalEvent").addEventListener("onJSAPIResponse", function(e) {
                    var a, t = e.responseId || "", e = e.responseData, n = !1;
                    0 < t.length && ((a = c.responseCallbacks[t]) || (a = c.responseCallbacksLongTerm[t],
                    n = !0),
                    a && a(e),
                    n || delete c.responseCallbacks[t])
                })
            }
            function i(d) {
                return function(e, a, t) {
                    function n(e) {
                        e ? 0 === Number(e.code) ? (r && r(e),
                        !u && t && t(e)) : (e = e,
                        i && (e = i(e)),
                        s && s(e.result),
                        !u && a && a(e.result)) : (r && r("原生未正常传参"),
                        t && t("原生未正常传参"))
                    }
                    var o, s = e.success, r = e.error, i = e.dataFilter, c = e.proto, l = e.handlerName, u = e.isLongCb, p = e.isEvent, e = e.data;
                    u ? (o = d.getLongCallbackId(),
                    p && (e.port = o),
                    d.registerLongCallback(o, n),
                    d.callHandler(c, l, e, o),
                    a && a()) : d.callHandler(c, l, e, n)
                }
            }
            function k(e) {
                var o = e.os
                  , s = i(e.JSBridge);
                e.callInner = function(e, a, t) {
                    var n = Object(O.c)({}, e);
                    n.success = void 0,
                    n.error = void 0,
                    n.dataFilter = void 0,
                    o.ejs && s({
                        handlerName: this.api.namespace,
                        data: n,
                        proto: this.api.moduleName,
                        success: e.success,
                        error: e.error,
                        dataFilter: e.dataFilter,
                        isLongCb: this.api.isLongCb,
                        isEvent: this.api.isEvent
                    }, a, t)
                }
            }
            function R(e) {
                var s = e
                  , r = i(s.JSBridge);
                function a(e) {
                    function a(e, a) {
                        function t() {
                            r({
                                handlerName: o.name,
                                proto: o.mudule,
                                data: o.data || {},
                                success: o.success,
                                error: o.error,
                                isLongCb: o.isLongCb,
                                isEvent: o.isEvent
                            }, e, a)
                        }
                        var n = o.appVersion;
                        n ? s.runtime.getAppVersion({
                            success: function(e) {
                                e.version && 0 <= Object(O.a)(e.version, n) ? t() : (e = "".concat(o.name, "要求的容器版本至少为:").concat(n, "，当前容器版本：").concat(e.version, "，请升级"),
                                s.showError(s.globalError.ERROR_TYPE_APINEEDHIGHNATIVEVERSION.code, e))
                            },
                            error: function(e) {
                                console.error(e)
                            }
                        }) : t()
                    }
                    var t = s.getPromise()
                      , o = e || {};
                    return t && new t(a) || a()
                }
                s.callApi = a,
                s.callNativeApi = a
            }
            function r(e) {
                var a, s, r, o, i, c, l, u, p, d, m, f, g, h, v, y, b, j, P, w, I;
                ((a = e).os.weex ? C : E)(a),
                k(e),
                R(e),
                e.extendModule("auth", [{
                    namespace: "getToken",
                    os: ["ejs"]
                }, {
                    namespace: "refreshToken",
                    os: ["ejs"]
                }, {
                    namespace: "getUserInfo",
                    os: ["ejs"]
                }, {
                    namespace: "refreshUserInfo",
                    os: ["ejs"],
                    support: "4.2.3"
                }, {
                    namespace: "getAuthCode",
                    os: ["ejs"],
                    support: "3.2.4"
                }, {
                    namespace: "logoutUserWithAlert",
                    os: ["ejs"],
                    support: "3.5.0",
                    defaultParams: {
                        title: "提示",
                        message: "请重新登录"
                    }
                }, {
                    namespace: "logout",
                    os: ["ejs"],
                    support: "4.1.9"
                }, {
                    namespace: "getUserAuthCode",
                    os: ["ejs"],
                    support: "4.0.2",
                    defaultParams: {
                        appkey: ""
                    }
                }]),
                r = (s = e).innerUtil,
                s.extendModule("runtime", [{
                    namespace: "launchApp",
                    os: ["ejs"],
                    defaultParams: {
                        packageName: "",
                        className: "",
                        actionName: "",
                        scheme: "",
                        data: ""
                    }
                }, {
                    namespace: "isApplicationExist",
                    os: ["ejs"],
                    support: "3.1.2",
                    defaultParams: {
                        packageName: "",
                        scheme: ""
                    }
                }, {
                    namespace: "getAppKey",
                    os: ["ejs"]
                }, {
                    namespace: "getAppVersion",
                    os: ["ejs"]
                }, {
                    namespace: "getEjsVersion",
                    os: ["ejs"]
                }, {
                    namespace: "clearCache",
                    os: ["ejs"]
                }, {
                    namespace: "getGeolocation",
                    os: ["ejs"],
                    defaultParams: {
                        isShowDetail: 1,
                        coordinate: 1
                    }
                }, {
                    namespace: "clipboard",
                    os: ["ejs"],
                    defaultParams: {
                        text: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = r.compatibleStringParamsToObject.call(this, a, "text")
                          , o = (n[0].text = String(n[0].text),
                        n[0].success);
                        n[0].success = function() {
                            s.ui.toast("内容已复制"),
                            o && o()
                        }
                        ,
                        s.callInner.apply(this, n)
                    }
                }, {
                    namespace: "openUrl",
                    os: ["ejs"],
                    defaultParams: {
                        url: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = r.compatibleStringParamsToObject(a, "url");
                        s.callInner.apply(this, n)
                    }
                }, {
                    namespace: "logPanel",
                    os: ["ejs"],
                    support: "3.1.4",
                    defaultParams: {
                        text: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = r.compatibleStringParamsToObject.call(this, a, "text");
                        s.callInner.apply(this, n)
                    }
                }, {
                    namespace: "openSetting",
                    os: ["ejs"],
                    support: "3.1.6"
                }, {
                    namespace: "getPlatformUrl",
                    os: ["ejs"],
                    support: "3.1.9"
                }, {
                    namespace: "getPluginVersion",
                    os: ["ejs"],
                    support: "3.2.1",
                    defaultParams: {
                        pluginName: "",
                        packageName: ""
                    }
                }, {
                    namespace: "securityType",
                    os: ["ejs"],
                    support: "3.4.0"
                }, {
                    namespace: "platform",
                    os: ["ejs"],
                    support: "3.4.0"
                }, {
                    namespace: "canIUse",
                    os: ["ejs"],
                    support: "4.0.0"
                }, {
                    namespace: "startLocationUpdate",
                    os: ["ejs"],
                    support: "4.0.3"
                }, {
                    namespace: "stopLocationUpdate",
                    os: ["ejs"],
                    support: "4.0.3"
                }]),
                i = (o = e).innerUtil,
                o.extendModule("device", [{
                    namespace: "setOrientation",
                    os: ["ejs"],
                    defaultParams: {
                        orientation: 1
                    }
                }, {
                    namespace: "setZoomControl",
                    os: ["ejs"],
                    defaultParams: {
                        isShow: 1
                    }
                }, {
                    namespace: "getDeviceId",
                    os: ["ejs"]
                }, {
                    namespace: "getMacAddress",
                    os: ["ejs"]
                }, {
                    namespace: "getScreenInfo",
                    os: ["ejs"]
                }, {
                    namespace: "getVendorInfo",
                    os: ["ejs"]
                }, {
                    namespace: "isTablet",
                    os: ["ejs"]
                }, {
                    namespace: "getNetWorkInfo",
                    os: ["ejs"]
                }, {
                    namespace: "callPhone",
                    os: ["ejs"],
                    defaultParams: {
                        phoneNum: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = i.compatibleStringParamsToObject.call(this, a, "phoneNum");
                        o.callInner.apply(this, n)
                    }
                }, {
                    namespace: "sendMsg",
                    os: ["ejs"],
                    defaultParams: {
                        phoneNum: "",
                        message: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = i.compatibleStringParamsToObject.call(this, a, "phoneNum", "message");
                        o.callInner.apply(this, n)
                    }
                }, {
                    namespace: "closeInputKeyboard",
                    os: ["ejs"]
                }, {
                    namespace: "vibrate",
                    os: ["ejs"],
                    defaultParams: {
                        duration: 200
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = i.compatibleStringParamsToObject.call(this, a, "duration");
                        o.callInner.apply(this, n)
                    }
                }, {
                    namespace: "sendTo",
                    os: ["ejs"],
                    defaultParams: {
                        title: "",
                        url: "",
                        imgBase64: "",
                        imgURL: "",
                        sdPath: ""
                    }
                }, {
                    namespace: "setZoomControl",
                    os: ["ejs"],
                    defaultParams: {
                        isShow: 1
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = i.compatibleStringParamsToObject.call(this, a, "isShow");
                        o.callInner.apply(this, n)
                    }
                }, {
                    namespace: "setBounce",
                    os: ["ejs"],
                    defaultParams: {
                        isEnable: 1
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = i.compatibleStringParamsToObject.call(this, a, "isEnable");
                        o.callInner.apply(this, n)
                    }
                }, {
                    namespace: "shake.disable",
                    os: ["ejs"],
                    runCode: function() {
                        this.api.namespace = "shakeDisable";
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        o.callInner.apply(this, a)
                    }
                }, {
                    namespace: "shake.enable",
                    os: ["ejs"],
                    runCode: function() {
                        this.api.namespace = "shakeEnable",
                        this.api.isLongCb = !0;
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        o.callInner.apply(this, a)
                    }
                }, {
                    namespace: "checkPermissions",
                    os: ["ejs"],
                    support: "3.1.5",
                    defaultParams: {
                        permissionsType: 0
                    }
                }, {
                    namespace: "requestPermissions",
                    os: ["ejs"],
                    support: "3.1.5",
                    defaultParams: {
                        permissionsType: 0
                    }
                }, {
                    namespace: "beep",
                    support: "3.4.0",
                    os: ["ejs"]
                }, {
                    namespace: "goAppSetting",
                    support: "3.4.0",
                    os: ["ejs"]
                }, {
                    namespace: "setEnableShot",
                    os: ["ejs"],
                    support: "3.4.0",
                    defaultParams: {
                        isEnableShot: 0
                    }
                }, {
                    namespace: "getDeviceInfo",
                    os: ["ejs"],
                    support: "3.4.2"
                }, {
                    namespace: "isHasVirtualPosApp",
                    os: ["ejs"],
                    support: "4.0.0"
                }]),
                l = {
                    resume: "OnPageResume",
                    pause: "OnPagePause",
                    miniH5Resume: "OnMiniPageResume",
                    netChange: "OnNetChanged",
                    search: "OnSearch",
                    destroy: "OnPageDestroy",
                    created: "OnPageCreated",
                    cardOpenbox: "onCardOpenbox",
                    cardClosebox: "onCardClosebox"
                },
                (c = e).extendModule("event", [{
                    namespace: "registerEvent",
                    os: ["ejs"],
                    defaultParams: {
                        key: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0];
                        o.key = l[o.key] || o.key,
                        n[0] = o,
                        this.api.isLongCb = !0,
                        this.api.isEvent = !0,
                        c.callInner.apply(this, n)
                    }
                }, {
                    namespace: "unRegisterEvent",
                    os: ["ejs"],
                    defaultParams: {
                        key: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0];
                        o.key = l[o.key] || o.key,
                        n[0] = o,
                        c.callInner.apply(this, n)
                    }
                }, {
                    namespace: "isRegisterEvent",
                    os: ["ejs"],
                    defaultParams: {
                        key: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0];
                        o.key = l[o.key] || o.key,
                        n[0] = o,
                        c.callInner.apply(this, n)
                    }
                }, {
                    namespace: "dispatchEventToNative",
                    os: ["ejs"]
                }, {
                    namespace: "on",
                    os: ["ejs"],
                    defaultParams: {
                        key: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a;
                        this.api.isLongCb = !0,
                        this.api.isEvent = !0,
                        c.callInner.apply(this, n)
                    }
                }, {
                    namespace: "once",
                    os: ["ejs"],
                    defaultParams: {
                        key: ""
                    }
                }, {
                    namespace: "emit",
                    os: ["ejs"],
                    defaultParams: {
                        key: ""
                    }
                }, {
                    namespace: "off",
                    os: ["ejs"],
                    defaultParams: {
                        key: ""
                    }
                }, {
                    namespace: "app",
                    os: ["ejs"],
                    defaultParams: {
                        onLaunch: "",
                        onShow: "",
                        onHide: "",
                        onClose: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a[0];
                        c.os.ejs ? (c.event.registerEvent({
                            key: "created",
                            success: function() {
                                n.onLaunch && n.onLaunch()
                            }
                        }),
                        c.event.registerEvent({
                            key: "miniH5Resume",
                            success: function() {
                                n.onShow && n.onShow()
                            }
                        }),
                        c.event.registerEvent({
                            key: "pause",
                            success: function() {
                                n.onHide && n.onHide()
                            }
                        }),
                        c.event.registerEvent({
                            key: "destroy",
                            success: function() {
                                n.onClose && n.onClose(),
                                c.event.dispatchEventToNative({
                                    key: "DOMContentUnLoaded"
                                })
                            }
                        })) : c.os.xm && (xm.on("onLoad", function() {
                            n.onLaunch && n.onLaunch()
                        }),
                        xm.on("onPageShow", function() {
                            n.onShow && n.onShow()
                        }),
                        xm.on("onPageHide", function() {
                            n.onHide && n.onHide()
                        }),
                        xm.on("onAppClose", function() {
                            n.onClose && n.onClose()
                        }))
                    }
                }]),
                p = (u = e).innerUtil,
                u.extendModule("storage", [{
                    namespace: "getItem",
                    os: ["ejs"],
                    defaultParams: {
                        key: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0];
                        p.isObject(o.key) || (o.key = [o.key]),
                        n[0] = o,
                        u.callInner.apply(this, n)
                    }
                }, {
                    namespace: "setItem",
                    os: ["ejs"]
                }, {
                    namespace: "removeItem",
                    os: ["ejs"],
                    defaultParams: {
                        key: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0];
                        p.isObject(o.key) || (o.key = [o.key]),
                        n[0] = o,
                        u.callInner.apply(this, n)
                    }
                }, {
                    namespace: "getBusinessRestUrl",
                    os: ["ejs"]
                }, {
                    namespace: "getPlatformParam",
                    os: ["ejs"],
                    defaultParams: {
                        key: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0];
                        u.os.miniH5 ? (p.isObject(o.key) || (o.key = [o.key]),
                        n[0] = o,
                        u.callInner.apply(this, n)) : u.storage.getItem(o)
                    }
                }, {
                    namespace: "getPlatformShareParam",
                    os: ["ejs"],
                    defaultParams: {
                        key: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0];
                        u.os.miniH5 ? (p.isObject(o.key) || (o.key = [o.key]),
                        n[0] = o,
                        u.callInner.apply(this, n)) : u.storage.getItem(o)
                    }
                }, {
                    namespace: "getPlatformPrivateParam",
                    os: ["ejs"],
                    defaultParams: {
                        key: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0];
                        u.os.miniH5 ? (p.isObject(o.key) || (o.key = [o.key]),
                        n[0] = o,
                        u.callInner.apply(this, n)) : u.storage.getItem(o)
                    }
                }, {
                    namespace: "getShareItem",
                    os: ["ejs"],
                    defaultParams: {
                        key: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0];
                        p.isObject(o.key) || (o.key = [o.key]),
                        n[0] = o,
                        u.callInner.apply(this, n)
                    }
                }, {
                    namespace: "setShareItem",
                    os: ["ejs"]
                }, {
                    namespace: "removeShareItem",
                    os: ["ejs"],
                    defaultParams: {
                        key: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0];
                        p.isObject(o.key) || (o.key = [o.key]),
                        n[0] = o,
                        u.callInner.apply(this, n)
                    }
                }]),
                m = (d = e).innerUtil,
                d.extendModule("page", [{
                    namespace: "open",
                    os: ["ejs"],
                    defaultParams: {
                        pageUrl: "",
                        pageStyle: 1,
                        orientation: 1,
                        alive: 0,
                        data: {},
                        useRouter: !0
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = m.compatibleStringParamsToObject.call(this, a, "pageUrl", "data")
                          , o = n[0];
                        if (o.useRouter && "auto" !== o.useRouter && !/^(http|https)/.test(o.url)) {
                            var s, r = m.getFullUrlByParams(o.pageUrl, o.data, !0);
                            if (d.os.weex)
                                return o.pageUrl = r,
                                void Vue.$router.push(o.pageUrl);
                            if (window.vm && vm.$router)
                                return o.pageUrl = r,
                                void vm.$router.push(o.pageUrl);
                            try {
                                if (uni)
                                    return s = {
                                        url: r,
                                        success: function() {
                                            o.success && o.success()
                                        },
                                        fail: function(e) {
                                            o.error && o.error(e)
                                        }
                                    },
                                    void uni.navigateTo(Object.assign({}, o, s))
                            } catch (e) {}
                        }
                        o.pageUrl = m.getFullUrlByParams(o.pageUrl, o.data),
                        o.data = void 0,
                        n[0] = o,
                        d.callInner.apply(this, n)
                    }
                }, {
                    namespace: "openLocal",
                    os: ["ejs"],
                    defaultParams: {
                        className: "",
                        isOpenExist: 0,
                        data: {}
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0]
                          , s = o.data.pageStyle;
                        s && (o.data.pageStyle = "string" == typeof s ? parseInt(s, 10) : s),
                        o.dataFilter = function(e) {
                            if (!m.isObject(e.result.resultData))
                                try {
                                    e.result.resultData = JSON.parse(e.result.resultData)
                                } catch (e) {}
                            return e
                        }
                        ,
                        n[0] = o,
                        d.callInner.apply(this, n)
                    }
                }, {
                    namespace: "close",
                    os: ["ejs"],
                    defaultParams: {
                        popPageNumber: 1,
                        resultData: "",
                        useRouter: !0
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n, o = m.compatibleStringParamsToObject.call(this, a, "resultData"), s = o[0], r = o[1], i = o[2];
                        if (s.useRouter && "auto" !== s.useRouter) {
                            if (d.os.weex)
                                return void Vue.$router.go(-s.popPageNumber);
                            if (window.vm && vm.$router)
                                return void vm.$router.go(-s.popPageNumber);
                            try {
                                if (uni)
                                    return n = {
                                        delta: s.popPageNumber,
                                        success: function() {
                                            s.success && s.success(),
                                            r && r()
                                        },
                                        fail: function(e) {
                                            s.error && s.error(e),
                                            i && i(e)
                                        }
                                    },
                                    void uni.navigateBack(Object.assign({}, s, n))
                            } catch (e) {}
                        }
                        m.isObject(o[0].resultData) && (o[0].resultData = JSON.stringify(o[0].resultData)),
                        d.callInner.apply(this, o)
                    }
                }, {
                    namespace: "reload",
                    os: ["ejs"]
                }, {
                    namespace: "showError",
                    os: ["ejs"],
                    defaultParams: {
                        type: 0
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = m.compatibleStringParamsToObject.call(this, a, "type");
                        d.callInner.apply(this, n)
                    }
                }, {
                    namespace: "replace",
                    os: ["ejs"],
                    defaultParams: {
                        url: "",
                        useRouter: !0
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n, o = m.compatibleStringParamsToObject.call(this, a, "url"), s = o[0];
                        if (s.useRouter && "auto" !== s.useRouter) {
                            if (d.os.weex)
                                return void Vue.$router.replace(s.url);
                            if (window.vm && vm.$router)
                                return void vm.$router.replace(s.url);
                            try {
                                if (uni)
                                    return n = {
                                        url: s.url,
                                        success: function() {
                                            s.success && s.success()
                                        },
                                        fail: function(e) {
                                            s.error && s.error(e)
                                        }
                                    },
                                    void uni.redirectTo(Object.assign({}, s, n))
                            } catch (e) {}
                        }
                        s.url = m.getFullPath(s.url),
                        o[0] = s,
                        d.callInner.apply(this, o)
                    }
                }]),
                g = (f = e).innerUtil,
                f.extendModule("navigator", [{
                    namespace: "setTitle",
                    os: ["ejs"],
                    defaultParams: {
                        title: "",
                        subTitle: "",
                        direction: "bottom",
                        clickable: 0
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = g.compatibleStringParamsToObject.call(this, a, "title");
                        this.api.isLongCb = !0,
                        f.callInner.apply(this, n)
                    }
                }, {
                    namespace: "setMultiTitle",
                    os: ["ejs"],
                    defaultParams: {
                        titles: ""
                    },
                    runCode: function() {
                        this.api.isLongCb = !0;
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        f.callInner.apply(this, a)
                    }
                }, {
                    namespace: "show",
                    os: ["ejs"]
                }, {
                    namespace: "hide",
                    os: ["ejs"]
                }, {
                    namespace: "showSearchBar",
                    os: ["ejs"],
                    runCode: function() {
                        this.api.isLongCb = !0;
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        f.callInner.apply(this, a)
                    }
                }, {
                    namespace: "hideSearchBar",
                    os: ["ejs"]
                }, {
                    namespace: "hideBackButton",
                    os: ["ejs"]
                }, {
                    namespace: "hookSysBack",
                    os: ["ejs"],
                    runCode: function() {
                        this.api.isLongCb = !0;
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        f.callInner.apply(this, a)
                    }
                }, {
                    namespace: "hookBackBtn",
                    os: ["ejs"],
                    runCode: function() {
                        this.api.isLongCb = !0;
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        f.callInner.apply(this, a)
                    }
                }, {
                    namespace: "setRightBtn",
                    os: ["ejs"],
                    defaultParams: {
                        text: "",
                        imageUrl: "",
                        isShow: 1,
                        which: 0,
                        maxCount: 6
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0];
                        o.imageUrl = o.imageUrl && g.getFullPath(o.imageUrl),
                        o.text = g.eclipseText(o.text, o.maxCount),
                        n[0] = o,
                        this.api.isLongCb = !0,
                        f.callInner.apply(this, n)
                    }
                }, {
                    namespace: "setRightMenu",
                    os: ["ejs"],
                    defaultParams: {
                        text: "",
                        imageUrl: "",
                        iconFilterColor: "",
                        titleItems: [],
                        iconItems: []
                    },
                    runCode: function() {
                        for (var e = this, a = arguments.length, t = new Array(a), n = 0; n < a; n++)
                            t[n] = arguments[n];
                        var o = [].slice.call(t)
                          , s = g.extend({}, o[0]);
                        s.success = function() {
                            f.ui.popWindow.apply(e, t)
                        }
                        ,
                        o[0] = s,
                        f.navigator.setRightBtn.apply(this, o)
                    }
                }, {
                    namespace: "setLeftBtn",
                    os: ["ejs"],
                    defaultParams: {
                        text: "",
                        imageUrl: "",
                        isShow: 1,
                        isShowArrow: 0,
                        direction: "bottom",
                        maxCount: 6
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0];
                        o.imageUrl = o.imageUrl && g.getFullPath(o.imageUrl),
                        o.text = g.eclipseText(o.text, o.maxCount),
                        n[0] = o,
                        this.api.isLongCb = !0,
                        f.callInner.apply(this, n)
                    }
                }, {
                    namespace: "showStatusBar",
                    os: ["ejs"]
                }, {
                    namespace: "hideStatusBar",
                    os: ["ejs"]
                }, {
                    namespace: "setSearchWord",
                    os: ["ejs"],
                    support: "3.1.9",
                    defaultParams: {
                        keyword: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = g.compatibleStringParamsToObject.call(this, a, "keyword");
                        f.callInner.apply(this, n)
                    }
                }, {
                    namespace: "getSearchWord",
                    os: ["ejs"],
                    support: "3.1.9"
                }, {
                    namespace: "setSearchBar",
                    os: ["ejs"],
                    defaultParams: {
                        isShow: 1,
                        keyword: "",
                        placeholder: "请输入搜索关键字",
                        isSearchable: 0,
                        cancelOnSearchBarAndNotRefresh: 0,
                        hideBottomLine: 0
                    },
                    support: "3.2.2",
                    runCode: function() {
                        this.api.isLongCb = !0;
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        f.callInner.apply(this, a)
                    }
                }, {
                    namespace: "hideBackBtn",
                    os: ["ejs"],
                    support: "3.4.1"
                }]),
                v = (h = e).innerUtil,
                h.extendModule("util", [{
                    namespace: "scan",
                    os: ["ejs"],
                    defaultParams: {
                        showHistory: 0,
                        needResult: 1
                    }
                }, {
                    namespace: "playVideo",
                    os: ["ejs"],
                    defaultParams: {
                        videoUrl: ""
                    }
                }, {
                    namespace: "selectImage",
                    os: ["ejs"],
                    defaultParams: {
                        photoCount: 9,
                        showCamera: 0,
                        showGif: 0,
                        previewEnabled: 1,
                        selectedPhotos: []
                    }
                }, {
                    namespace: "prevImage",
                    os: ["ejs"],
                    defaultParams: {
                        index: 0,
                        showDeleteButton: 0,
                        selectedPhotos: []
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        for (var n = v.compatibleStringParamsToObject.call(this, a, "text"), o = n[0].selectedPhotos, s = 0, r = o.length; s < r; s += 1)
                            n[0].selectedPhotos[s] = v.getFullPath(o[s]);
                        h.callInner.apply(this, n)
                    }
                }, {
                    namespace: "cameraImage",
                    os: ["ejs"],
                    defaultParams: {
                        width: 720,
                        quality: 70,
                        defaultCamera: "0"
                    }
                }, {
                    namespace: "recordVideo",
                    os: ["ejs"],
                    support: "3.1.2",
                    defaultParams: {
                        maxDuration: 120,
                        className: h.os.android ? "com.epoint.baseapp.component.media.ShootActivity" : "EPTVideoRecordViewController"
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a;
                        n[0].data = {
                            maxDuration: n[0].maxDuration
                        },
                        h.page.openLocal.apply(this, n)
                    }
                }, {
                    namespace: "getPreviewUrl",
                    os: ["ejs"]
                }, {
                    namespace: "goSearch",
                    os: ["ejs"],
                    defaultParams: {
                        searchType: "",
                        conditions: ""
                    }
                }, {
                    namespace: "createQRCode",
                    os: ["ejs"],
                    support: "3.1.8",
                    defaultParams: {
                        qrCodeStr: "",
                        size: 200
                    }
                }, {
                    namespace: "recognizeQRCode",
                    os: ["ejs"],
                    support: "3.1.8",
                    defaultParams: {
                        imgPath: "",
                        imgBase64: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0].imgBase64;
                        n[0].imgBase64 = o ? v.getBase64NotUrl(o) : "",
                        h.callInner.apply(this, a)
                    }
                }, {
                    namespace: "invokePluginApi",
                    os: ["ejs"],
                    support: "3.2.0",
                    defaultParams: {
                        path: "",
                        dataMap: "",
                        appVersion: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0].appVersion
                          , s = this;
                        o ? h.runtime.getAppVersion({
                            success: function(e) {
                                e.version && 0 <= Object(O.a)(e.version, o) ? h.callInner.apply(s, a) : (e = "".concat(n[0].dataMap.method, "要求的容器版本至少为:").concat(o, "，当前容器版本：").concat(e.version, "，请升级"),
                                h.showError(h.globalError.ERROR_TYPE_APINEEDHIGHNATIVEVERSION.code, e))
                            },
                            error: function(e) {
                                console.error(e)
                            }
                        }) : h.callInner.apply(this, a)
                    }
                }, {
                    namespace: "encrypt",
                    os: ["ejs"],
                    support: "3.2.3",
                    defaultParams: {
                        text: ""
                    }
                }, {
                    namespace: "decrypt",
                    os: ["ejs"],
                    support: "3.4.0",
                    defaultParams: {
                        text: ""
                    }
                }, {
                    namespace: "selectVideo",
                    os: ["ejs"],
                    support: "3.4.1.b",
                    defaultParams: {
                        videoCount: 1
                    }
                }]),
                (y = e).extendModule("stream", [{
                    namespace: "fetch",
                    os: ["ejs"],
                    defaultParams: {
                        url: "",
                        method: "POST",
                        type: "json",
                        body: "",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a
                          , o = n[0];
                        o.dataFilter = function(e) {
                            var a = e.result;
                            if ("json" === o.type.toLowerCase() && "string" == typeof a.data)
                                try {
                                    a.data = JSON.parse(a.data)
                                } catch (e) {}
                            return e
                        }
                        ,
                        n[0] = o,
                        y.callInner.apply(this, n)
                    }
                }, {
                    namespace: "uploadFile",
                    os: ["ejs"],
                    defaultParams: {
                        url: "",
                        path: "",
                        clientGuid: "",
                        clientInfo: "",
                        clientTag: "",
                        documentType: "",
                        attachFileName: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n, o = a, s = o[0];
                        s.documentType || (n = s.path.match(/([.][^.]+)$/),
                        s.documentType = n && n[1] || ""),
                        o[0] = s,
                        y.callInner.apply(this, o)
                    }
                }, {
                    namespace: "uploadMultipartFile",
                    os: ["ejs"],
                    defaultParams: {
                        url: "",
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                        file: {
                            name: "",
                            path: "",
                            mediaType: "",
                            fileName: ""
                        },
                        dataForm: {}
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n, o = a, s = o[0];
                        s.file.fileName || (n = s.file.path.match(/[/]([^/]+)$/),
                        s.file.fileName = n && n[1] || ""),
                        o[0] = s,
                        y.callInner.apply(this, o)
                    }
                }]),
                (b = e).extendModule("contact", [{
                    namespace: "choose",
                    os: ["ejs"],
                    defaultParams: {
                        userguids: [],
                        className: b.os.android ? "com.epoint.baseapp.component.chooseperson.PersonChooseActivity" : "WPLPersonnelSelectViewController"
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a;
                        n[0].data = {
                            userguids: n[0].userguids
                        },
                        n[0].userguids = "",
                        b.page.openLocal.apply(this, n)
                    }
                }, {
                    namespace: "select",
                    os: ["ejs"],
                    defaultParams: {
                        token: "",
                        url: "",
                        selectedusers: [],
                        unableselectusers: [],
                        issingle: "0",
                        maxchoosecount: 500,
                        isouonly: "0",
                        isgroupenable: "0",
                        selectedous: [],
                        custom: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a[0]
                          , o = a[1]
                          , s = a[2];
                        b.runtime.getEjsVersion({
                            success: function(e) {
                                var a, e = e.version;
                                0 < Object(O.a)("3.2.0", e) ? SelectPerson ? (a = n.confirm || n.success,
                                n.success = function(e) {
                                    a && a(e),
                                    o && o(e)
                                }
                                ,
                                n.confirm = n.success,
                                SelectPerson(n, b, function(e) {
                                    n.success && n.success(e),
                                    o && o(e)
                                })) : (e = "未引入全局函数SelectPerson！",
                                console.error(e),
                                n.error && n.error(e),
                                s && s(e)) : b.util.invokePluginApi({
                                    path: "workplatform.provider.openNewPage",
                                    dataMap: {
                                        method: "goSelectPerson",
                                        issingle: n.issingle,
                                        unableselectusers: n.unableselectusers,
                                        selectedusers: n.selectedusers,
                                        isgroupenable: n.isgroupenable,
                                        maxchoosecount: n.maxchoosecount,
                                        selectedous: n.selectedous,
                                        isouonly: n.isouonly,
                                        custom: n.custom
                                    },
                                    success: function(e) {
                                        n.success && n.success(e),
                                        o && o(e)
                                    },
                                    error: function(e) {
                                        n.error && n.error(e),
                                        o && o(e)
                                    }
                                })
                            },
                            error: function(e) {
                                n.error && n.error(e)
                            }
                        })
                    }
                }]),
                e.extendModule("audio", [{
                    namespace: "startRecord",
                    os: ["ejs"],
                    support: "3.1.2",
                    defaultParams: {
                        minDuration: 1,
                        maxDuration: 120,
                        folderPath: "",
                        fileName: ""
                    }
                }, {
                    namespace: "stopRecord",
                    os: ["ejs"],
                    support: "3.1.2"
                }, {
                    namespace: "cancelRecord",
                    os: ["ejs"],
                    support: "3.1.2"
                }, {
                    namespace: "startPlay",
                    os: ["ejs"],
                    support: "3.1.2",
                    defaultParams: {
                        path: ""
                    }
                }, {
                    namespace: "stopPlay",
                    os: ["ejs"],
                    support: "3.1.2",
                    defaultParams: {
                        path: ""
                    }
                }]),
                P = (j = e).innerUtil,
                j.extendModule("io", [{
                    namespace: "downloadFile",
                    os: ["ejs"],
                    support: "3.1.2",
                    defaultParams: {
                        url: "",
                        fileName: "",
                        type: "",
                        reDownloaded: 0,
                        isBackground: 1,
                        autoStart: 0
                    }
                }, {
                    namespace: "selectFile",
                    os: ["ejs"],
                    support: "3.1.2",
                    defaultParams: {
                        multi: 0,
                        count: 9
                    }
                }, {
                    namespace: "openFile",
                    os: ["ejs"],
                    support: "3.1.2",
                    defaultParams: {
                        path: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = P.compatibleStringParamsToObject.call(this, a, "path");
                        j.callInner.apply(this, n)
                    }
                }, {
                    namespace: "renameFile",
                    os: ["ejs"],
                    support: "3.1.2",
                    defaultParams: {
                        path: "",
                        newName: "",
                        newSuffix: void 0
                    }
                }, {
                    namespace: "copyFile",
                    os: ["ejs"],
                    support: "3.1.2",
                    defaultParams: {
                        path: "",
                        newPath: ""
                    }
                }, {
                    namespace: "deleteFile",
                    os: ["ejs"],
                    support: "3.1.2",
                    defaultParams: {
                        path: ""
                    }
                }, {
                    namespace: "getFileSize",
                    os: ["ejs"],
                    support: "3.1.7",
                    defaultParams: {
                        path: ""
                    }
                }, {
                    namespace: "screenShot",
                    os: ["ejs"],
                    support: "3.2.5a",
                    defaultParams: {
                        captureType: 1
                    }
                }, {
                    namespace: "report",
                    os: ["ejs"],
                    support: "4.0.0",
                    defaultParams: {
                        url: "",
                        responsetime: "",
                        request: "",
                        response: "",
                        belong: "",
                        successorfail: ""
                    }
                }]),
                I = (w = e).innerUtil,
                w.extendModule("miniH5", [{
                    namespace: "navigateTo",
                    os: ["ejs"],
                    support: "3.4.1",
                    defaultParams: {
                        appId: "",
                        path: "",
                        alive: 0,
                        extraData: {}
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = I.compatibleStringParamsToObject.call(this, a, "appId", "path", "extraData")
                          , o = n[0];
                        o.data = void 0,
                        o.dataFilter = function(e) {
                            if (!I.isObject(e.result.extraData))
                                try {
                                    e.result.extraData = JSON.parse(e.result.extraData)
                                } catch (e) {}
                            return e
                        }
                        ,
                        n[0] = o,
                        w.callInner.apply(this, n)
                    }
                }, {
                    namespace: "navigateBack",
                    os: ["ejs"],
                    support: "3.4.1",
                    defaultParams: {
                        popPageNumber: 1,
                        resultData: "",
                        useRouter: !1
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = I.compatibleStringParamsToObject.call(this, a, "extraData");
                        if (n[0].useRouter) {
                            if (w.os.weex)
                                return void Vue.$router.go(-1);
                            window.vm && vm.$router && vm.$router.go(-1)
                        } else
                            I.isObject(n[0].resultData) && (n[0].resultData = JSON.stringify(n[0].resultData));
                        w.page.close(n[0])
                    }
                }, {
                    namespace: "onNavigateBack",
                    os: ["ejs"],
                    support: "3.4.1",
                    runCode: function() {
                        this.api.isLongCb = !0;
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        w.callInner.apply(this, a)
                    }
                }, {
                    namespace: "getEpointCodeInfo",
                    os: ["ejs"]
                }, {
                    namespace: "setNavigationBarTitle",
                    os: ["ejs"],
                    support: "3.4.1",
                    defaultParams: {
                        title: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = I.compatibleStringParamsToObject.call(this, a, "title");
                        w.callInner.apply(this, n)
                    }
                }, {
                    namespace: "setNavigationBarColor",
                    os: ["ejs"],
                    support: "3.4.1",
                    defaultParams: {
                        frontColor: "",
                        backgroundColor: ""
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = I.compatibleStringParamsToObject.call(this, a, "frontColor", "backgroundColor");
                        w.callInner.apply(this, n)
                    }
                }, {
                    namespace: "close",
                    os: ["ejs"],
                    support: "3.4.1",
                    defaultParams: {
                        alive: 1
                    },
                    runCode: function() {
                        for (var e = arguments.length, a = new Array(e), t = 0; t < e; t++)
                            a[t] = arguments[t];
                        var n = a;
                        w.os.ios && w.runtime.getEjsVersion({
                            success: function(e) {
                                e = e.version;
                                0 < Object(O.a)("4.0.1.a", e) && (n[0].alive = 1 === n[0].alive ? 0 : 1)
                            },
                            error: function(e) {
                                n[0].error && n[0].error(e)
                            }
                        }),
                        w.callInner.apply(this, n)
                    }
                }, {
                    namespace: "checkForUpdate",
                    os: ["ejs"],
                    support: "4.0.2"
                }, {
                    namespace: "applyUpdate",
                    os: ["ejs"],
                    support: "4.0.2"
                }, {
                    namespace: "applyCard",
                    os: ["ejs"],
                    support: "4.0.2",
                    defaultParams: {
                        isforce: "0",
                        appkey: "",
                        version: "",
                        cardguid: "",
                        isdebug: ""
                    }
                }]),
                e.extendModule("basicCard", [{
                    namespace: "showBigCardEntrance",
                    os: ["ejs"],
                    support: "4.0.1"
                }, {
                    namespace: "setBigCardTitle",
                    os: ["ejs"],
                    support: "4.0.1"
                }, {
                    namespace: "setCardHeight",
                    os: ["ejs"],
                    support: "4.0.1"
                }])
            }
            "undefined" == typeof weex && window.self !== window.top && (o = 5e4 + Math.round(15536 * Math.random()))
        },
        30: function(e, a, t) {
            "use strict";
            t.d(a, "a", function() {
                return s
            });
            var n = t(24)
              , o = t(25);
            function s(e) {
                Object(o.a)(e),
                Object(n.a)(e)
            }
        },
        36: function(e, a, t) {
            "use strict";
            t.r(a);
            var n = t(30)
              , t = t(17)
              , o = {};
            Object(t.a)(o),
            Object(n.a)(o),
            a.default = o
        },
        4: function(e, a, t) {
            "use strict";
            function n(e) {
                console.error("[hybridJs error]: ".concat(e))
            }
            function o(e) {
                console.log("[hybridJs log]: ".concat(e))
            }
            t.d(a, "b", function() {
                return n
            }),
            t.d(a, "a", function() {
                return o
            })
        }
    },
    n = {},
    o.m = t,
    o.c = n,
    o.d = function(e, a, t) {
        o.o(e, a) || Object.defineProperty(e, a, {
            enumerable: !0,
            get: t
        })
    }
    ,
    o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    o.t = function(a, e) {
        if (1 & e && (a = o(a)),
        8 & e)
            return a;
        if (4 & e && "object" == typeof a && a && a.__esModule)
            return a;
        var t = Object.create(null);
        if (o.r(t),
        Object.defineProperty(t, "default", {
            enumerable: !0,
            value: a
        }),
        2 & e && "string" != typeof a)
            for (var n in a)
                o.d(t, n, function(e) {
                    return a[e]
                }
                .bind(null, n));
        return t
    }
    ,
    o.n = function(e) {
        var a = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return o.d(a, "a", a),
        a
    }
    ,
    o.o = function(e, a) {
        return Object.prototype.hasOwnProperty.call(e, a)
    }
    ,
    o.p = "",
    o(o.s = 36).default;
    function o(e) {
        var a;
        return (n[e] || (a = n[e] = {
            i: e,
            l: !1,
            exports: {}
        },
        t[e].call(a.exports, a, a.exports, o),
        a.l = !0,
        a)).exports
    }
    var t, n
});
