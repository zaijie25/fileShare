"use strict";
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