
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/native/WebNative.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxuYXRpdmVcXFdlYk5hdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUdJO1FBRlEsZUFBVSxHQUFXLEtBQUssQ0FBQyxDQUFLLGlDQUFpQztRQUNqRSxlQUFVLEdBQXNCLElBQUksR0FBRyxFQUFpQixDQUFDO1FBRTdELElBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVTtZQUFFLE9BQU87UUFDNUIsSUFBRyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBQztZQUM3QixJQUFJLE1BQU0sR0FBUyxNQUFPLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUM7WUFDbEQsSUFBRyxDQUFDLE1BQU0sRUFBQyxFQUFLLDZCQUE2QjtnQkFDekMsT0FBTyxDQUFDLEdBQUcsR0FBRyxjQUFLLENBQUMsQ0FBQTtnQkFDcEIsT0FBTyxDQUFDLEtBQUssR0FBRyxjQUFLLENBQUMsQ0FBQTtnQkFDdEIsT0FBTyxDQUFDLElBQUksR0FBRyxjQUFLLENBQUMsQ0FBQTtnQkFDckIsT0FBTyxDQUFDLElBQUksR0FBRyxjQUFLLENBQUMsQ0FBQTtnQkFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQztvQkFDZixNQUFNLEVBQUU7d0JBQ0wsdUJBQXVCO3dCQUN0QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUE7b0JBQ3hDLENBQUM7b0JBQ0QsS0FBSyxFQUFFO29CQUNQLENBQUM7aUJBQ0osQ0FBQyxDQUFBO2FBQ0w7U0FDSjtJQUNMLENBQUM7SUFFRCx5QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxnQ0FBWSxHQUFaO1FBQ0ksQ0FBQyxVQUFTLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNkLElBQUksRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENB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dCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJOYXRpdmV7XHJcbiAgICBwcml2YXRlIHNhZmV0eU1vZGU6Ym9vbGVhbiA9IGZhbHNlOyAgICAgLy93ZWLlronlhajmqKHlvI8o5byA5ZCv55qE6K+d5q2j5byP546v5aKD5LiL5byA5Y+R6ICF56qX5Y+j5Lya6YeN5a6a5ZCR5Yiw56m655m96aG1KVxyXG4gICAgcHJpdmF0ZSBfd2luZG93TWFwOk1hcDxzdHJpbmcsV2luZG93PiA9IG5ldyBNYXA8c3RyaW5nLFdpbmRvdz4oKTtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgaWYoIXRoaXMuc2FmZXR5TW9kZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmKCFDQ19ERUJVRyAmJiBjYy5zeXMuaXNCcm93c2VyKXtcclxuICAgICAgICAgICAgbGV0IGlzVGVzdCA9ICg8YW55PndpbmRvdykucGFja0luZm8udGVzdCB8fCBmYWxzZTtcclxuICAgICAgICAgICAgaWYoIWlzVGVzdCl7ICAgIC8v5q2j5byP546v5aKD5LiL5LiN5YWB6K64RjEy6LCD6K+V5bm25YWz6ZetY29uc29sZS5sb2dcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nID0gKCk9Pnt9ICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvciA9ICgpPT57fVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuID0gKCk9Pnt9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8gPSAoKT0+e31cclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tEZXZUb29scyh7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiBmdW5jdGlvbigpIHsgICAgLy/miZPlvIDosIPor5XlkI7pobXpnaLph43lrprlkJHoh7Pnqbrnmb3pobVcclxuICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuaJk+W8gEYxMlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiYWJvdXQ6YmxhbmtcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb2ZmZWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0dXAoKXtcclxuICAgICAgICB0aGlzLmZhY2VCb29rSW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZhY2VCb29rSW5pdCgpeyAgICAgICAgIC8v5Yid5aeL5YyWZmFjZUJvb2sgc2RrXHJcbiAgICAgICAgKGZ1bmN0aW9uKGQsIHMsIGlkKXtcclxuICAgICAgICAgICAgdmFyIGpzLCBmanMgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKHMpWzBdO1xyXG4gICAgICAgICAgICBpZiAoZC5nZXRFbGVtZW50QnlJZChpZCkpIHtyZXR1cm47fVxyXG4gICAgICAgICAgICBqcyA9IGQuY3JlYXRlRWxlbWVudChzKTsganMuaWQgPSBpZDtcclxuICAgICAgICAgICAganMuc3JjID0gXCJodHRwczovL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX1VTL3Nkay5qc1wiO1xyXG4gICAgICAgICAgICBmanMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanMsIGZqcyk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRmFjZUJvb2s65Yid5aeL5YyWXCIsanMsZmpzKVxyXG4gICAgICAgIH0oZG9jdW1lbnQsICdzY3JpcHQnLCAnZmFjZWJvb2stanNzZGsnKSk7XHJcblxyXG5cclxuICAgICAgICAoPGFueT53aW5kb3cpLmZiQXN5bmNJbml0ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgKDxhbnk+d2luZG93KS5GQi5pbml0KHtcclxuICAgICAgICAgICAgICAgIGFwcElkICAgICAgOiBcIjg1ODg1MDA4Nzk3NTkwOFwiLFxyXG4gICAgICAgICAgICAgICAgeGZibWwgICAgICA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB2ZXJzaW9uICAgIDogXCJ2OC4wXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICg8YW55PndpbmRvdykuRkIuQXBwRXZlbnRzLmxvZ1BhZ2VWaWV3KCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4Dmn6VmYWNlQm9va+eZu+W9leeKtuaAgVxyXG4gICAgICogQHBhcmFtIGNhbGxCYWNrIFxyXG4gICAgICovXHJcbiAgICBjaGVja0ZhY2VCb29rTG9naW5TdGF0ZShjYWxsQmFjaz86RnVuY3Rpb24pe1xyXG4gICAgICAgICg8YW55PndpbmRvdykuRkIuZ2V0TG9naW5TdGF0dXMoKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGNhbGxCYWNrKXtcclxuICAgICAgICAgICAgICAgIGNhbGxCYWNrKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZmFjZWJvb2vnmbvlvZVcclxuICAgICAqIEBwYXJhbSBjYWxsQmFjayBcclxuICAgICAqL1xyXG4gICAgZmFjZUJvb2tMb2dpbihjYWxsQmFjaz86RnVuY3Rpb24pe1xyXG4gICAgICAgICg8YW55PndpbmRvdykuRkIubG9naW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgaWYoY2FsbEJhY2spe1xyXG4gICAgICAgICAgICAgICAgY2FsbEJhY2socmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogZmFjZWJvb2vnmbvlh7pcclxuICAgICAqIEBwYXJhbSBjYWxsQmFjayBcclxuICAgICAqL1xyXG4gICAgZmFjZUJvb2tMb2dvdXQoY2FsbEJhY2s/OkZ1bmN0aW9uKXtcclxuICAgICAgICAoPGFueT53aW5kb3cpLkZCLmxvZ291dChmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAvLyBQZXJzb24gaXMgbm93IGxvZ2dlZCBvdXRcclxuICAgICAgICAgICAgaWYoY2FsbEJhY2spe1xyXG4gICAgICAgICAgICAgICAgY2FsbEJhY2socmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB3ZWLnq6/lpI3liLbmlofmnKzlh73mlbBcclxuICAgICAqIEBwYXJhbSB0ZXh0IOmcgOimgeWkjeWItueahOaWh+acrOWGheWuuVxyXG4gICAgICogQHBhcmFtIGNhbGxCYWNrIFxyXG4gICAgICovXHJcbiAgICB3ZWJDb3B5VGV4dFRvQ2xpcGJvYXJkKHRleHQ6c3RyaW5nLGNhbGxCYWNrPzpGdW5jdGlvbil7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IC0xO1xyXG4gICAgICAgIGNvbnN0IHRleHRTdHJpbmcgPSB0ZXh0LnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIGxldCBpbnB1dDpIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb3B5X2lucHV0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgaWYoIWlucHV0KXtcclxuICAgICAgICAgICAgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XHJcbiAgICAgICAgICAgIGlucHV0LmlkID0gXCJjb3B5X2lucHV0XCI7XHJcbiAgICAgICAgICAgIGlucHV0LnJlYWRPbmx5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgaW5wdXQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLmxlZnQgPSBcIi0xMDAwMHB4XCI7XHJcbiAgICAgICAgICAgIGlucHV0LnN0eWxlLnpJbmRleCA9IFwiLTEwMDBcIjtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbnB1dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlucHV0LnZhbHVlID0gdGV4dFN0cmluZztcclxuICAgICAgICBsZXQgZW5kSW5kZXggPSB0ZXh0U3RyaW5nLmxlbmd0aFxyXG4gICAgICAgIHNlbGVjdFRleHQoaW5wdXQsMCxlbmRJbmRleCk7XHJcbiAgICAgICAgaWYoZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpKXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpO1xyXG4gICAgICAgICAgICByZXN1bHQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2VsZWN0VGV4dCh0ZXh0Qm94OkhUTUxJbnB1dEVsZW1lbnQsc3RhcnRJbmRleDpudW1iZXIsZW5kSW5kZXg6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRleHRCb3guc2V0U2VsZWN0aW9uUmFuZ2Uoc3RhcnRJbmRleCxlbmRJbmRleCk7XHJcbiAgICAgICAgICAgIHRleHRCb3guZm9jdXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGNhbGxCYWNrKXtcclxuICAgICAgICAgICAgY2FsbEJhY2soe1wicmVzdWx0XCI6cmVzdWx0fSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaW5wdXQpO1xyXG4gICAgICAgICAgICBjYWxsQmFjayA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5LiA5Liq5aSW6YOo56qX5Y+jXHJcbiAgICAgKiBAcGFyYW0ga2V5IOeql+WPo2tleVxyXG4gICAgICovXHJcbiAgICBpbml0V2luZG93KGtleTpzdHJpbmcpe1xyXG4gICAgICAgIGlmKCFrZXkpe1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJrZXkgaXMgbnVsbFwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3dpbmRvd01hcC5zZXQoa2V5LHdpbmRvdy5vcGVuKFwiXCIsXCJfYmxhbmtcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5b2T6aG1562+5Zyo5b2T5YmN6aG1562+5pe277yM5riF56m65LmL5YmN5omA5pyJ55qE5aSW6YOo56qX5Y+jXHJcbiAgICBjbGVhcldpbmRvd01hcCgpe1xyXG4gICAgICAgIHRoaXMuX3dpbmRvd01hcC5jbGVhcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaW9z5LiT55So5omT5byA5aSW6YOo6ZO+5o6l56qX5Y+jXHJcbiAgICAgKiBAcGFyYW0ga2V5IOeql+WPo2tleVxyXG4gICAgICogQHBhcmFtIHVybCDph43lrprlkJF1cmxcclxuICAgICAqL1xyXG4gICAgb3BlbldpbmRvd0J5S2V5KGtleTpzdHJpbmcsdXJsOnN0cmluZyl7XHJcbiAgICAgICAgaWYoIWtleSB8fCAhdXJsKXtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwia2V5IG9yIHVybCBpcyBudWxsXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHdpbiA9IHRoaXMuX3dpbmRvd01hcC5nZXQoa2V5KTtcclxuICAgICAgLy8gIGNvbnNvbGUubG9nKFwi5omT5byA5aSW6YOo6ZO+5o6lXCIsdGhpcy5fd2luZG93TWFwKTtcclxuICAgICAgICBpZighd2luKVxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3Ioa2V5LFwid2luZG93IGlzIG51bGxcIik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB3aW4ubG9jYXRpb24uaHJlZiA9IHVybFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogd2Vi6Ziy5q2iRjEy6LCD5byPKOWPquiDvemYu+atouato+W4uOaJk+W8gEYxMuaWueW8jyzlpoLmnpwpXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyDkvKDlhaXlvIDlj5HogIXmqKHlvI/miZPlvIAv5YWz6Zet5Zue6LCD5Ye95pWwXHJcbiAgICAgKi9cclxuICAgIGNoZWNrRGV2VG9vbHMob3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IGlzRkYgPSB+bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiRmlyZWZveFwiKTtcclxuICAgICAgICBsZXQgdG9UZXN0ID0gXCJcIjtcclxuICAgICAgICBpZiAoaXNGRikge1xyXG4gICAgICAgICAgIHRvVGVzdCA9IC8uLztcclxuICAgICAgICAgICB0b1Rlc3QudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgIG9wdGlvbnMub3BlbmVkKCk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIHRvVGVzdCA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICB0b1Rlc3QuX19kZWZpbmVHZXR0ZXJfXygnaWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgIG9wdGlvbnMub3BlbmVkKCk7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICBvcHRpb25zLm9mZmVkKCk7XHJcbiAgICAgICAgIC8vICBjb25zb2xlLmxvZyh0b1Rlc3QpO1xyXG4gICAgICAgICAgIGNvbnNvbGUuY2xlYXIgJiYgY29uc29sZS5jbGVhcigpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gV2luZG93S2V5VHlwZSB7XHJcbiAgICBHYW1lV2luID0gXCJHYW1lV2luXCIsICAgICAgICAgICAgLy/lpJbmjqXmuLjmiI9cclxuICAgIFJlY2hhcmdlV2luID0gXCJSZWNoYXJnZVdpblwiICAgICAvL+WFheWAvFxyXG59Il19