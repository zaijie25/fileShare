"use strict";
cc._RF.push(module, 'acf66jJj+5Fj4nFT1StBR0D', 'WebNative');
// hall/scripts/framework/native/WebNative.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowKeyType = void 0;
var WebNative = /** @class */ (function () {
    function WebNative() {
        this.safetyMode = false; //web安全模式(开启的话正式环境下开发者窗口会重定向到空白页)
        this._windowMap = new Map();
        if (!this.safetyMode)
            return;
        if (!CC_DEBUG && cc.sys.isBrowser) {
            var isTest = window.packInfo.test || false;
            if (!isTest) { //正式环境下不允许F12调试并关闭console.log
                console.log = function () { };
                console.error = function () { };
                console.warn = function () { };
                console.info = function () { };
                this.checkDevTools({
                    opened: function () {
                        // console.log("打开F12")
                        window.location.href = "about:blank";
                    },
                    offed: function () {
                    }
                });
            }
        }
    }
    WebNative.prototype.setup = function () {
        this.faceBookInit();
    };
    WebNative.prototype.faceBookInit = function () {
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
            // console.log("FaceBook:初始化",js,fjs)
        }(document, 'script', 'facebook-jssdk'));
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: "858850087975908",
                xfbml: true,
                version: "v8.0"
            });
            window.FB.AppEvents.logPageView();
        };
    };
    /**
     * 检查faceBook登录状态
     * @param callBack
     */
    WebNative.prototype.checkFaceBookLoginState = function (callBack) {
        window.FB.getLoginStatus(function (response) {
            if (callBack) {
                callBack(response);
            }
        });
    };
    /**
     * facebook登录
     * @param callBack
     */
    WebNative.prototype.faceBookLogin = function (callBack) {
        window.FB.login(function (response) {
            if (callBack) {
                callBack(response);
            }
        });
    };
    /**
     * facebook登出
     * @param callBack
     */
    WebNative.prototype.faceBookLogout = function (callBack) {
        window.FB.logout(function (response) {
            // Person is now logged out
            if (callBack) {
                callBack(response);
            }
        });
    };
    /**
     * web端复制文本函数
     * @param text 需要复制的文本内容
     * @param callBack
     */
    WebNative.prototype.webCopyTextToClipboard = function (text, callBack) {
        var result = -1;
        var textString = text.toString();
        var input = document.getElementById("copy_input");
        if (!input) {
            input = document.createElement("input");
            input.id = "copy_input";
            input.readOnly = true;
            input.style.position = "absolute";
            input.style.left = "-10000px";
            input.style.zIndex = "-1000";
            document.body.appendChild(input);
        }
        input.value = textString;
        var endIndex = textString.length;
        selectText(input, 0, endIndex);
        if (document.execCommand("copy")) {
            document.execCommand("copy");
            result = 0;
        }
        function selectText(textBox, startIndex, endIndex) {
            textBox.setSelectionRange(startIndex, endIndex);
            textBox.focus();
        }
        if (callBack) {
            callBack({ "result": result });
            document.body.removeChild(input);
            callBack = null;
        }
    };
    /**
     * 初始化一个外部窗口
     * @param key 窗口key
     */
    WebNative.prototype.initWindow = function (key) {
        if (!key) {
            Logger.error("key is null");
            return;
        }
        this._windowMap.set(key, window.open("", "_blank"));
    };
    //当页签在当前页签时，清空之前所有的外部窗口
    WebNative.prototype.clearWindowMap = function () {
        this._windowMap.clear();
    };
    /**
     * ios专用打开外部链接窗口
     * @param key 窗口key
     * @param url 重定向url
     */
    WebNative.prototype.openWindowByKey = function (key, url) {
        if (!key || !url) {
            Logger.error("key or url is null");
            return;
        }
        var win = this._windowMap.get(key);
        //  console.log("打开外部链接",this._windowMap);
        if (!win)
            Logger.error(key, "window is null");
        else
            win.location.href = url;
    };
    /**
     * web防止F12调式(只能阻止正常打开F12方式,如果)
     * @param options 传入开发者模式打开/关闭回调函数
     */
    WebNative.prototype.checkDevTools = function (options) {
        var isFF = ~navigator.userAgent.indexOf("Firefox");
        var toTest = "";
        if (isFF) {
            toTest = /./;
            toTest.toString = function () {
                options.opened();
            };
        }
        else {
            toTest = new Image();
            toTest.__defineGetter__('id', function () {
                options.opened();
            });
        }
        setInterval(function () {
            options.offed();
            //  console.log(toTest);
            console.clear && console.clear();
        }, 1000);
    };
    return WebNative;
}());
exports.default = WebNative;
var WindowKeyType;
(function (WindowKeyType) {
    WindowKeyType["GameWin"] = "GameWin";
    WindowKeyType["RechargeWin"] = "RechargeWin"; //充值
})(WindowKeyType = exports.WindowKeyType || (exports.WindowKeyType = {}));

cc._RF.pop();