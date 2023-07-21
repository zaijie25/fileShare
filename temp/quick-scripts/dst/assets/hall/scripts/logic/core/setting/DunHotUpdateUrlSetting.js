
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/setting/DunHotUpdateUrlSetting.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '032f11txuxNhrpyzHnE1lAr', 'DunHotUpdateUrlSetting');
// hall/scripts/logic/core/setting/DunHotUpdateUrlSetting.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerRoutes_1 = require("./ServerRoutes");
var DunHotUpdateUrlSetting = /** @class */ (function () {
    function DunHotUpdateUrlSetting() {
        this._dunType = 0;
        this._hotUpdateServerRoutes = new ServerRoutes_1.default();
        this._payServerRoutes = new ServerRoutes_1.default();
    }
    Object.defineProperty(DunHotUpdateUrlSetting.prototype, "hotUpdateUrl", {
        get: function () {
            var curRoute = this._hotUpdateServerRoutes.getCurRoute();
            var serverRoutes = this.hotUpdateServerRoutes;
            var url = null;
            if (curRoute) {
                if (curRoute.checkSelfIsOK()) {
                    var serverUrl = curRoute.getUrl();
                    url = serverUrl;
                    this.curDunType = curRoute.lo_type;
                }
                else {
                    var routesLen = serverRoutes.getRouteLen();
                    if (routesLen > 1) {
                        var nextRoute = serverRoutes.getAnotherRoute();
                        if (nextRoute && nextRoute.checkSelfIsOK()) {
                            Logger.error("extraData.url changeToAnotherRoute");
                            var serverUrl = nextRoute.getUrl();
                            url = serverUrl;
                            this.curDunType = nextRoute.lo_type;
                        }
                        else {
                            Logger.error("extraData.url nextRoute is null or not ok !!!");
                            var canUseRoute = serverRoutes.getCanUseRoute();
                            if (canUseRoute) {
                                var serverUrl = canUseRoute.getUrl();
                                url = serverUrl;
                                this.curDunType = canUseRoute.lo_type;
                            }
                            else {
                                Logger.error("extraData.url canUseRoute = null");
                            }
                        }
                    }
                    else if (routesLen == 1) {
                        // Logger.error("extraData.url routesLen = 1");
                        var serverUrl = curRoute.getUrl();
                        this.curDunType = curRoute.lo_type;
                        url = serverUrl;
                    }
                    else {
                        Logger.error("extraData.url routesLen = 0 ");
                    }
                }
            }
            else {
                Logger.error("extraData.url curRoute is null !!!");
            }
            if (url && url.getUrl()) {
                return url.getUrl();
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DunHotUpdateUrlSetting.prototype, "payeUrl", {
        get: function () {
            var curRoute = this._payServerRoutes.getCurRoute();
            var serverRoutes = this._payServerRoutes;
            var url = null;
            if (curRoute) {
                if (curRoute.checkSelfIsOK()) {
                    var serverUrl = curRoute.getUrl();
                    url = serverUrl;
                }
                else {
                    var routesLen = serverRoutes.getRouteLen();
                    if (routesLen > 1) {
                        var nextRoute = serverRoutes.getAnotherRoute();
                        if (nextRoute && nextRoute.checkSelfIsOK()) {
                            Logger.error("extraData.url changeToAnotherRoute");
                            var serverUrl = nextRoute.getUrl();
                            url = serverUrl;
                        }
                        else {
                            Logger.error("extraData.url nextRoute is null or not ok !!!");
                            var canUseRoute = serverRoutes.getCanUseRoute();
                            if (canUseRoute) {
                                var serverUrl = canUseRoute.getUrl();
                                url = serverUrl;
                            }
                            else {
                                Logger.error("extraData.url canUseRoute = null");
                            }
                        }
                    }
                    else if (routesLen == 1) {
                        // Logger.error("extraData.url routesLen = 1");
                        var serverUrl = curRoute.getUrl();
                        url = serverUrl;
                    }
                    else {
                        Logger.error("extraData.url routesLen = 0 ");
                    }
                }
            }
            else {
                Logger.error("extraData.url curRoute is null !!!");
            }
            if (url && url.getUrl()) {
                return url.getUrl();
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    DunHotUpdateUrlSetting.prototype.switchRoute = function () {
        if (this._hotUpdateServerRoutes) {
            this._hotUpdateServerRoutes.changeToAnotherRoute();
        }
    };
    Object.defineProperty(DunHotUpdateUrlSetting.prototype, "hotUpdateRouteCfg", {
        get: function () {
            return this._hotUpdateRouteCfg;
        },
        set: function (cfg) {
            this._hotUpdateRouteCfg = cfg;
            if (!this._hotUpdateServerRoutes) {
                this._hotUpdateServerRoutes = new ServerRoutes_1.default();
            }
            this._hotUpdateServerRoutes.cleanRoutes();
            this._hotUpdateServerRoutes.parse(cfg);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DunHotUpdateUrlSetting.prototype, "payRouteCfg", {
        get: function () {
            return this._payRouteCfg;
        },
        set: function (cfg) {
            this._payRouteCfg = cfg;
            if (!this._payServerRoutes) {
                this._payServerRoutes = new ServerRoutes_1.default();
            }
            this._payServerRoutes.cleanRoutes();
            this._payServerRoutes.parse(cfg);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DunHotUpdateUrlSetting.prototype, "curDunType", {
        get: function () {
            return this._dunType;
        },
        set: function (val) {
            if (!val) {
                val = 0;
            }
            this._dunType = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DunHotUpdateUrlSetting.prototype, "hotUpdateServerRoutes", {
        get: function () {
            return this._hotUpdateServerRoutes;
        },
        set: function (route) {
            this._hotUpdateServerRoutes = route;
        },
        enumerable: false,
        configurable: true
    });
    return DunHotUpdateUrlSetting;
}());
exports.default = DunHotUpdateUrlSetting;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHNldHRpbmdcXER1bkhvdFVwZGF0ZVVybFNldHRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMEU7QUFFMUU7SUFVSTtRQUZRLGFBQVEsR0FBRyxDQUFDLENBQUE7UUFHaEIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksc0JBQVksRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLHNCQUFZLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsc0JBQVcsZ0RBQVk7YUFBdkI7WUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDeEQsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFBO1lBQzdDLElBQUksR0FBRyxHQUFjLElBQUksQ0FBQTtZQUN6QixJQUFJLFFBQVEsRUFBQztnQkFDVCxJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBQztvQkFDekIsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFBO29CQUNqQyxHQUFHLEdBQUcsU0FBUyxDQUFBO29CQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQTtpQkFDckM7cUJBQUs7b0JBQ0YsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFBO29CQUMxQyxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUM7d0JBQ2QsSUFBSSxTQUFTLEdBQW9CLFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQTt3QkFDL0QsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLGFBQWEsRUFBRSxFQUFDOzRCQUN2QyxNQUFNLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7NEJBQ25ELElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FB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O1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFBO1lBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDcEMsQ0FBQzs7O09BdkNBO0lBRUQsc0JBQVcsOENBQVU7YUFBckI7WUFFRyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7UUFDdkIsQ0FBQzthQUVELFVBQXNCLEdBQUc7WUFFckIsSUFBRyxDQUFDLEdBQUcsRUFDUDtnQkFDSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO2FBQ1Y7WUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQTtRQUN2QixDQUFDOzs7T0FUQTtJQXVDRCxzQkFBVyx5REFBcUI7YUFBaEM7WUFDSSxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQTtRQUN0QyxDQUFDO2FBRUQsVUFBaUMsS0FBa0I7WUFDL0MsSUFBSSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQztRQUN4QyxDQUFDOzs7T0FKQTtJQU1MLDZCQUFDO0FBQUQsQ0FqTEEsQUFpTEMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTZXJ2ZXJSb3V0ZXMsIHsgU2VydmVyUm91dGVJbmZvLCBTZXJ2ZXJVcmwgfSBmcm9tIFwiLi9TZXJ2ZXJSb3V0ZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIER1bkhvdFVwZGF0ZVVybFNldHRpbmcge1xyXG4gICAgcHJpdmF0ZSBfaG90VXBkYXRlU2VydmVyUm91dGVzOlNlcnZlclJvdXRlc1xyXG5cclxuICAgIHByaXZhdGUgX3BheVNlcnZlclJvdXRlczpTZXJ2ZXJSb3V0ZXNcclxuXHJcbiAgICBwcml2YXRlIF9ob3RVcGRhdGVSb3V0ZUNmZzphbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBfcGF5Um91dGVDZmc6YW55O1xyXG4gICAgcHJpdmF0ZSBfZHVuVHlwZSA9IDBcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX2hvdFVwZGF0ZVNlcnZlclJvdXRlcyA9IG5ldyBTZXJ2ZXJSb3V0ZXMoKTtcclxuICAgICAgICB0aGlzLl9wYXlTZXJ2ZXJSb3V0ZXMgPSBuZXcgU2VydmVyUm91dGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBob3RVcGRhdGVVcmwoKXtcclxuICAgICAgICBsZXQgY3VyUm91dGUgPSB0aGlzLl9ob3RVcGRhdGVTZXJ2ZXJSb3V0ZXMuZ2V0Q3VyUm91dGUoKVxyXG4gICAgICAgIGxldCBzZXJ2ZXJSb3V0ZXMgPSB0aGlzLmhvdFVwZGF0ZVNlcnZlclJvdXRlc1xyXG4gICAgICAgIGxldCB1cmwgOlNlcnZlclVybCA9IG51bGxcclxuICAgICAgICBpZiAoY3VyUm91dGUpe1xyXG4gICAgICAgICAgICBpZiAoY3VyUm91dGUuY2hlY2tTZWxmSXNPSygpKXtcclxuICAgICAgICAgICAgICAgIGxldCBzZXJ2ZXJVcmwgPSBjdXJSb3V0ZS5nZXRVcmwoKVxyXG4gICAgICAgICAgICAgICAgdXJsID0gc2VydmVyVXJsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1ckR1blR5cGUgPSBjdXJSb3V0ZS5sb190eXBlXHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCByb3V0ZXNMZW4gPSBzZXJ2ZXJSb3V0ZXMuZ2V0Um91dGVMZW4oKVxyXG4gICAgICAgICAgICAgICAgaWYgKHJvdXRlc0xlbiA+IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0Um91dGUgOlNlcnZlclJvdXRlSW5mbyA9IHNlcnZlclJvdXRlcy5nZXRBbm90aGVyUm91dGUoKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0Um91dGUgJiYgbmV4dFJvdXRlLmNoZWNrU2VsZklzT0soKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImV4dHJhRGF0YS51cmwgY2hhbmdlVG9Bbm90aGVyUm91dGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZXJ2ZXJVcmwgPSBuZXh0Um91dGUuZ2V0VXJsKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gc2VydmVyVXJsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyRHVuVHlwZSA9IG5leHRSb3V0ZS5sb190eXBlXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJleHRyYURhdGEudXJsIG5leHRSb3V0ZSBpcyBudWxsIG9yIG5vdCBvayAhISFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYW5Vc2VSb3V0ZTpTZXJ2ZXJSb3V0ZUluZm8gPSBzZXJ2ZXJSb3V0ZXMuZ2V0Q2FuVXNlUm91dGUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuVXNlUm91dGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlcnZlclVybCA6U2VydmVyVXJsID0gY2FuVXNlUm91dGUuZ2V0VXJsKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IHNlcnZlclVybFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJEdW5UeXBlID0gY2FuVXNlUm91dGUubG9fdHlwZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJleHRyYURhdGEudXJsIGNhblVzZVJvdXRlID0gbnVsbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihyb3V0ZXNMZW4gPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIExvZ2dlci5lcnJvcihcImV4dHJhRGF0YS51cmwgcm91dGVzTGVuID0gMVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VydmVyVXJsID0gY3VyUm91dGUuZ2V0VXJsKClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1ckR1blR5cGUgPSBjdXJSb3V0ZS5sb190eXBlXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gc2VydmVyVXJsXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZXh0cmFEYXRhLnVybCByb3V0ZXNMZW4gPSAwIFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZXh0cmFEYXRhLnVybCBjdXJSb3V0ZSBpcyBudWxsICEhIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVybCAmJiB1cmwuZ2V0VXJsKCkpe1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdXJsLmdldFVybCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfSBcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBheWVVcmwoKXtcclxuICAgICAgICBsZXQgY3VyUm91dGUgPSB0aGlzLl9wYXlTZXJ2ZXJSb3V0ZXMuZ2V0Q3VyUm91dGUoKVxyXG4gICAgICAgIGxldCBzZXJ2ZXJSb3V0ZXMgPSB0aGlzLl9wYXlTZXJ2ZXJSb3V0ZXNcclxuICAgICAgICBsZXQgdXJsIDpTZXJ2ZXJVcmwgPSBudWxsXHJcbiAgICAgICAgaWYgKGN1clJvdXRlKXtcclxuICAgICAgICAgICAgaWYgKGN1clJvdXRlLmNoZWNrU2VsZklzT0soKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VydmVyVXJsID0gY3VyUm91dGUuZ2V0VXJsKClcclxuICAgICAgICAgICAgICAgIHVybCA9IHNlcnZlclVybFxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcm91dGVzTGVuID0gc2VydmVyUm91dGVzLmdldFJvdXRlTGVuKClcclxuICAgICAgICAgICAgICAgIGlmIChyb3V0ZXNMZW4gPiAxKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dFJvdXRlIDpTZXJ2ZXJSb3V0ZUluZm8gPSBzZXJ2ZXJSb3V0ZXMuZ2V0QW5vdGhlclJvdXRlKClcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFJvdXRlICYmIG5leHRSb3V0ZS5jaGVja1NlbGZJc09LKCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJleHRyYURhdGEudXJsIGNoYW5nZVRvQW5vdGhlclJvdXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VydmVyVXJsID0gbmV4dFJvdXRlLmdldFVybCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IHNlcnZlclVybFxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZXh0cmFEYXRhLnVybCBuZXh0Um91dGUgaXMgbnVsbCBvciBub3Qgb2sgISEhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FuVXNlUm91dGU6U2VydmVyUm91dGVJbmZvID0gc2VydmVyUm91dGVzLmdldENhblVzZVJvdXRlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhblVzZVJvdXRlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZXJ2ZXJVcmwgOlNlcnZlclVybCA9IGNhblVzZVJvdXRlLmdldFVybCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBzZXJ2ZXJVcmxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZXh0cmFEYXRhLnVybCBjYW5Vc2VSb3V0ZSA9IG51bGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYocm91dGVzTGVuID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJleHRyYURhdGEudXJsIHJvdXRlc0xlbiA9IDFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlcnZlclVybCA9IGN1clJvdXRlLmdldFVybCgpXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gc2VydmVyVXJsXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZXh0cmFEYXRhLnVybCByb3V0ZXNMZW4gPSAwIFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZXh0cmFEYXRhLnVybCBjdXJSb3V0ZSBpcyBudWxsICEhIVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVybCAmJiB1cmwuZ2V0VXJsKCkpe1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gdXJsLmdldFVybCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfSBcclxuXHJcbiAgICBwdWJsaWMgc3dpdGNoUm91dGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX2hvdFVwZGF0ZVNlcnZlclJvdXRlcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hvdFVwZGF0ZVNlcnZlclJvdXRlcy5jaGFuZ2VUb0Fub3RoZXJSb3V0ZSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGhvdFVwZGF0ZVJvdXRlQ2ZnKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hvdFVwZGF0ZVJvdXRlQ2ZnO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBwYXlSb3V0ZUNmZygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXlSb3V0ZUNmZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGN1ckR1blR5cGUoKVxyXG4gICAge1xyXG4gICAgICAgcmV0dXJuIHRoaXMuX2R1blR5cGVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGN1ckR1blR5cGUodmFsKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF2YWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWwgPSAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2R1blR5cGUgPSB2YWxcclxuICAgIH1cclxuXHJcbiAgIFxyXG5cclxuICAgIHB1YmxpYyBzZXQgaG90VXBkYXRlUm91dGVDZmcoY2ZnOmFueSl7XHJcbiAgICAgICAgdGhpcy5faG90VXBkYXRlUm91dGVDZmcgPSBjZmc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIXRoaXMuX2hvdFVwZGF0ZVNlcnZlclJvdXRlcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hvdFVwZGF0ZVNlcnZlclJvdXRlcyA9IG5ldyBTZXJ2ZXJSb3V0ZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faG90VXBkYXRlU2VydmVyUm91dGVzLmNsZWFuUm91dGVzKClcclxuICAgICAgICB0aGlzLl9ob3RVcGRhdGVTZXJ2ZXJSb3V0ZXMucGFyc2UoY2ZnKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0IHBheVJvdXRlQ2ZnKGNmZzphbnkpe1xyXG4gICAgICAgIHRoaXMuX3BheVJvdXRlQ2ZnID0gY2ZnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCF0aGlzLl9wYXlTZXJ2ZXJSb3V0ZXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9wYXlTZXJ2ZXJSb3V0ZXMgPSBuZXcgU2VydmVyUm91dGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BheVNlcnZlclJvdXRlcy5jbGVhblJvdXRlcygpXHJcbiAgICAgICAgdGhpcy5fcGF5U2VydmVyUm91dGVzLnBhcnNlKGNmZylcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGhvdFVwZGF0ZVNlcnZlclJvdXRlcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ob3RVcGRhdGVTZXJ2ZXJSb3V0ZXNcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGhvdFVwZGF0ZVNlcnZlclJvdXRlcyhyb3V0ZTpTZXJ2ZXJSb3V0ZXMpe1xyXG4gICAgICAgIHRoaXMuX2hvdFVwZGF0ZVNlcnZlclJvdXRlcyA9IHJvdXRlO1xyXG4gICAgfVxyXG4gICAgXHJcbn0iXX0=