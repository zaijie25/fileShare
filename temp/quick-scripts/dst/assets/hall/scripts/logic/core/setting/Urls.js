
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/setting/Urls.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a709ccp0atPDKqmdYUq80Oo', 'Urls');
// hall/scripts/logic/core/setting/Urls.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerRoutes_1 = require("./ServerRoutes");
var Setting_1 = require("./Setting");
var HallStorageKey_1 = require("../../hallcommon/const/HallStorageKey");
var AppCfg_1 = require("../../hall/AppCfg");
var SkinConfig_1 = require("../../hallcommon/app/SkinConfig");
var Urls = /** @class */ (function () {
    function Urls() {
        this.dataUrls = [
            // "http://ava_node2.ncjimmy.com/c",
            // "https://6umbmlpg7koqog.azurefd.net/c",
            // //"http://ava_node2.ncjimmy.com/c",
            //   "https://dev-api.legame668.com/c"
            // "http://go-cdn-we04.sygsdq.com/c",
            "https://m2se2wh81.vyfdm.com/c"
            // "http://shops88.natapp1.cc/c"
        ];
        //"C:/CocosDashboard_1.0.6/resources/.editors/Creator/2.3.3/CocosCreator.exe"
        // //只有网页版用到 原生不会使用
        // private configBaseDataUrl = "https://d03hw-588.bjlfstwl.com/config/";
        // private configBaseDataBackUrl = "https://d03hw-588.hxdbds.com/config/";
        //private configBaseDataBackUrl1 = "https://data.588love.com/config/";
        //jccommon url
        //public globalUrl: string = "https://go.rruru.com/login/";
        //图标配置路径
        //public webIconUrl: string;
        //下载地址
        this.downLoadUrl = "";
        //邀请地址
        this.inviteUrl = "";
        //大厅热更请求地址
        this.hallHotUpdateUrl = "";
        //大厅热更地址数组
        this.hallHotUpdateUrlArray = [];
        //App热更地址数组
        this.appHotUpdateUrlArray = [];
        //App版本号
        this.appVersion = "";
        //App热更参数
        this.appParam = "";
        //大厅热更请求地址
        this.appHotUpdateUrl = "";
        //public hallBaseUrl:string;
        this.onlineService = "";
        /**
         * 音乐电台 资源下载url地址
         */
        this.diantaiUrl = 'https://res.yanzizg.com/588/hall/diantai/';
    }
    //需要socket
    // //大厅完成socketurl
    // public hallSocketUrl:string;
    //大厅完成httpURL
    // public hallHttpUrl: string;
    Urls.prototype.parse = function (serverCfg) {
        //this.setDownloadUrl(Global.Toolkit.DealWithUrl(serverCfg.download_url))
        if (serverCfg.invite_url) {
            this.inviteUrl = Global.Toolkit.DealWithUrl(serverCfg.invite_url);
        }
        if (serverCfg.diantaiUrl)
            this.setDianTaiUrl(Global.Toolkit.DealWithUrl(serverCfg.diantaiUrl));
        if (serverCfg.routes || serverCfg.entrance) {
            this.setRoutes(serverCfg);
        }
    };
    Urls.prototype.setDownloadUrl = function (downLoadUrl) {
        if (downLoadUrl) {
            this.downLoadUrl = downLoadUrl;
        }
    };
    Urls.prototype.setDianTaiUrl = function (diantaiUrl) {
        if (diantaiUrl) {
            this.diantaiUrl = diantaiUrl;
        }
    };
    Urls.prototype.setRoutes = function (serverCfg) {
        //过滤线路中vip等级比自己高的
        var tempRoutes = [];
        var routes = serverCfg.routes;
        var VIPLevel = Global.Setting.storage.get(HallStorageKey_1.default.VIPLevel);
        var selfVipLevel = VIPLevel ? VIPLevel : 0;
        if (routes && routes.length > 0) {
            for (var i = 0; i < routes.length; i++) {
                var route = routes[i];
                if (route) {
                    var routeVip = route.vip;
                    var vip = routeVip ? routeVip : 0;
                    if (selfVipLevel >= vip) {
                        tempRoutes[tempRoutes.length] = route;
                        Logger.error("push route " + JSON.stringify(route));
                    }
                    else {
                        Logger.error("--------selfVipLevel < vip ");
                    }
                }
                else {
                    Logger.error("--------route------length = 0 ");
                }
            }
            var sortFunc = function (a, b) {
                var a_vip = a.vip ? a.vip : 0;
                var b_vip = b.vip ? b.vip : 0;
                return b_vip - a_vip;
            };
            tempRoutes.sort(sortFunc);
        }
        else {
            Logger.error("--------entrance------length = 0 ");
        }
        var lroutes = Global.Setting.storage.getObject(HallStorageKey_1.default.LoginRoutes);
        if (lroutes && lroutes.length > 0) {
            //预解析
            var loginServerRoutes = new ServerRoutes_1.default();
            loginServerRoutes.parse(lroutes);
            if (loginServerRoutes.getRouteLen() > 0) {
                Logger.error("loginServerRoutes set lroutes");
                //合并routes，防止lroutes挂了进不去游戏
                if (tempRoutes && tempRoutes.length > 0) {
                    // Logger.error("lroutes concat routes")
                    tempRoutes = lroutes.concat(tempRoutes);
                }
            }
            else {
                Logger.error("loginServerRoutes len = 0");
            }
            // Logger.error("get storage lroutes " + JSON.stringify(lroutes))
            // Logger.error("get storage tempRoutes " + JSON.stringify(tempRoutes))
        }
        // Logger.error("tempRoutes = " + JSON.stringify(tempRoutes))
        //如果过滤后线路为空，就继续用原来的
        if (tempRoutes.length == 0) {
            tempRoutes = routes;
        }
        if (tempRoutes) {
            this._globalRoutes = new ServerRoutes_1.default();
            this._globalRoutes.parse(tempRoutes);
            //防止登录之后收到serverroutes 导致url丢失
            if (this._hallRoutes == null) {
                this._hallRoutes = new ServerRoutes_1.default();
                this._hallRoutes.parseWs(tempRoutes);
            }
        }
    };
    Object.defineProperty(Urls.prototype, "globalRoutes", {
        get: function () {
            var g_routes = this._globalRoutes;
            if (!g_routes) {
                //通过data获取
                var content = Global.Setting.storage.get(HallStorageKey_1.default.AppConfigContent);
                if (content == null || content == "") {
                    Logger.error("get globalRoutes error ----- ");
                    return;
                }
                var localCfg = this.safeDecode(content);
                if (localCfg == null) {
                    Logger.error("get globalRoutes safeDecode localCfg error----- ");
                    return;
                }
                this.setRoutes(localCfg);
                g_routes = this._globalRoutes;
            }
            return g_routes;
        },
        set: function (routes) {
            if (routes) {
                this._globalRoutes = routes;
            }
        },
        enumerable: false,
        configurable: true
    });
    //登录线路排序
    Urls.prototype.sortLoginRoutes = function () {
        if (this.globalRoutes) {
            this.globalRoutes.sortRoutes();
        }
    };
    //大厅线路进行排序
    Urls.prototype.sortHallRoutes = function (index) {
        if (this._hallRoutes) {
            if (index != null || index != undefined) {
                Logger.error("sortHallRoutes index = " + index);
                this._hallRoutes.sortRoutesByIndex(index);
            }
            else {
                this._hallRoutes.sortRoutes();
            }
        }
    };
    //游戏线路进行排序
    Urls.prototype.sortGameRoutes = function () {
        if (this._gameRoutes) {
            this._gameRoutes.sortRoutes();
        }
        else if (this._hallRoutes) {
            this._hallRoutes.sortRoutes();
        }
    };
    Urls.prototype.safeDecode = function (cfg) {
        var serverCfg = null;
        try {
            var decodeMsg = Global.AESUtil.decodeMsg(cfg);
            serverCfg = JSON.parse(decodeMsg);
            //routes 为空 验证不通过
            if (serverCfg.routes == null || !serverCfg.routes.length || serverCfg.routes.length == 0) {
                serverCfg = null;
                Logger.error("data routes is null ");
            }
        }
        catch (e) {
            Logger.error("load app error", cfg);
            serverCfg = null;
        }
        return serverCfg;
    };
    Object.defineProperty(Urls.prototype, "hallRoutes", {
        get: function () {
            var h_routes = this._hallRoutes;
            if (!h_routes) {
                Logger.error("hallRoutes error");
            }
            return h_routes;
        },
        set: function (routes) {
            if (routes) {
                this._hallRoutes = routes;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Urls.prototype, "gameRoutes", {
        get: function () {
            var g_routes = this._gameRoutes;
            if (!g_routes) {
                Logger.error("g_routes error");
                return this.hallRoutes;
            }
            return g_routes;
        },
        set: function (routes) {
            if (routes) {
                this._gameRoutes = routes;
            }
        },
        enumerable: false,
        configurable: true
    });
    Urls.prototype.initLoginInfo = function (hallUrl, uid, token) {
        //this.hallBaseUrl = hallUrl;
        //hallHttpUrl暂时还不能删  需要等cqby更新才能删
        this.hallUrl = hallUrl;
        // let urlParam = Global.Toolkit.getUrlCommonParam()
        // let paramPrefix = Global.Toolkit.getUrlParamCommonPrefex()
        // this.hallHttpUrl = hallUrl + "%s?_func=%s&"+urlParam
        // this.hallUrlSuffix = "/mini/"+ paramPrefix +"%s?_func=%s&"+urlParam
    };
    Object.defineProperty(Urls.prototype, "hallHttpUrl", {
        get: function () {
            var urlParam = Global.UrlUtil.getUrlCommonParam();
            var hallHttpUrl = this.hallUrl + "%s?_func=%s&" + urlParam;
            return hallHttpUrl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Urls.prototype, "hallUrlSuffix", {
        get: function () {
            var urlParam = Global.UrlUtil.getUrlCommonParam();
            var paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex();
            var hallUrlSuffix = "/mini/" + paramPrefix + "%s?_func=%s&" + urlParam;
            return hallUrlSuffix;
        },
        enumerable: false,
        configurable: true
    });
    //public getGlobalUrl() {
    //    return this.globalUrl;
    //}
    Urls.prototype.getinviteUrl = function () {
        return this.inviteUrl;
    };
    Urls.prototype.getForceUpdateUrl = function () {
        return this.forceUpateUrl;
    };
    Urls.prototype.setInviteUrl = function (url) {
        if (url == null || url == "")
            return;
        if (url.indexOf("http") < 0) {
            Logger.error("链接格式不对", url);
            return;
        }
        url = url.replace("？", "?");
        this.inviteUrl = Global.Toolkit.DealWithUrl(url);
    };
    Urls.prototype.getBackUrl = function () {
        return this.downLoadUrl + "#backup";
    };
    // public getCfgDataUrl(serverType: ServerType) {
    //     return this.getUrlWithServerType(serverType, this.configBaseDataUrl)
    // }
    // public getCfgDataBackupUrl(cfgUrl: string) {
    //     let arrs = cfgUrl.split("/");
    //     if (arrs == null || arrs.length < 1)
    //         return cfgUrl;
    //     return this.configBaseDataBackUrl + arrs[arrs.length - 1];
    // }
    // public getCfgDataBackupUrl1(cfgUrl: string) {
    //     let arrs = cfgUrl.split("/");
    //     if (arrs == null || arrs.length < 1)
    //         return cfgUrl;
    //     //return this.configBaseDataBackUrl1 + arrs[arrs.length - 1];
    // }
    // private getUrlWithServerType(serverType: ServerType, url: string) {
    //     let dataName = "";
    //     switch (serverType) {
    //         case ServerType.DEVELOP:
    //             dataName = "develop.data";
    //             break;
    //         case ServerType.INTEST:
    //             dataName = "1004_intest.data";
    //             break;
    //         case ServerType.RELEASE:
    //             dataName = "6315.data";
    //             break;
    //         case ServerType.K8S:
    //             dataName = "xianggang_test.data";
    //             break;
    //         case ServerType.THS:
    //             dataName = "100101.data";
    //             break;
    //         case ServerType.THSINTEST:
    //             dataName = "8006.data";
    //             break;
    //     }
    //     return url + dataName;
    // }
    Urls.prototype.getDataNameWithServerType = function (serverType) {
        var dataName = "";
        switch (serverType) {
            case Setting_1.ServerType.DEVELOP:
                dataName = "develop";
                break;
            case Setting_1.ServerType.INTEST:
                switch (AppCfg_1.default.SKIN_TYPE) {
                    case SkinConfig_1.SkinType.purple:
                        dataName = "1005_intest";
                        break;
                    case SkinConfig_1.SkinType.dark:
                        dataName = "688_intest";
                        break;
                    case SkinConfig_1.SkinType.red:
                        dataName = "1003_intest";
                        break;
                    case SkinConfig_1.SkinType.blue:
                        // dataName = "1004_intest";
                        dataName = "1004_intest";
                        break;
                    case SkinConfig_1.SkinType.fantasy:
                        dataName = "1005_intest";
                        break;
                    case SkinConfig_1.SkinType.green:
                        dataName = "1006_intest";
                        break;
                    case SkinConfig_1.SkinType.legend:
                        dataName = "1007_intest";
                        break;
                    case SkinConfig_1.SkinType.darkgold:
                        dataName = "1010_intest";
                        break;
                    case SkinConfig_1.SkinType.blue2:
                        dataName = "1008_intest";
                        break;
                    case SkinConfig_1.SkinType.newBlue:
                        dataName = "3002_intest";
                        break;
                    default:
                        dataName = "1001_intest";
                        break;
                }
                break;
            case Setting_1.ServerType.RELEASE:
                dataName = "6315";
                break;
            case Setting_1.ServerType.K8S:
                dataName = "xianggang_test";
                break;
            case Setting_1.ServerType.THS:
                dataName = "100101";
                break;
            case Setting_1.ServerType.THSINTEST:
                dataName = "8006";
                break;
        }
        return dataName;
    };
    return Urls;
}());
exports.default = Urls;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHNldHRpbmdcXFVybHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMEM7QUFDMUMscUNBQXVDO0FBQ3ZDLHdFQUFtRTtBQUNuRSw0Q0FBdUM7QUFDdkMsOERBQTJEO0FBRTNEO0lBQUE7UUFFVyxhQUFRLEdBQUc7WUFDZCxvQ0FBb0M7WUFDcEMsMENBQTBDO1lBQzFDLHNDQUFzQztZQUNyQyxzQ0FBc0M7WUFDdkMscUNBQXFDO1lBQ3JDLCtCQUErQjtZQUMvQixnQ0FBZ0M7U0FFbkMsQ0FBQTtRQUVELDZFQUE2RTtRQUM3RSxtQkFBbUI7UUFDbkIsd0VBQXdFO1FBQ3hFLDBFQUEwRTtRQUMxRSxzRUFBc0U7UUFFdEUsY0FBYztRQUNkLDJEQUEyRDtRQUMzRCxRQUFRO1FBQ1IsNEJBQTRCO1FBQzVCLE1BQU07UUFDQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUNoQyxNQUFNO1FBQ0MsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUM5QixVQUFVO1FBQ0gscUJBQWdCLEdBQVcsRUFBRSxDQUFDO1FBQ3JDLFVBQVU7UUFDSCwwQkFBcUIsR0FBRyxFQUFFLENBQUE7UUFDakMsV0FBVztRQUNKLHlCQUFvQixHQUFHLEVBQUUsQ0FBQTtRQUNoQyxRQUFRO1FBQ0QsZUFBVSxHQUFHLEVBQUUsQ0FBQTtRQUN0QixTQUFTO1FBQ0YsYUFBUSxHQUFHLEVBQUUsQ0FBQTtRQUNwQixVQUFVO1FBQ0gsb0JBQWUsR0FBVyxFQUFFLENBQUM7UUFNcEMsNEJBQTRCO1FBSXJCLGtCQUFhLEdBQUcsRUFBRSxDQUFBO1FBZ0J6Qjs7V0FFRztRQUNJLGVBQVUsR0FBVywyQ0FBMkMsQ0FBQztJQXFYNUUsQ0FBQztJQWxYRyxVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLCtCQUErQjtJQUMvQixhQUFhO0lBQ2IsOEJBQThCO0lBRXZCLG9CQUFLLEdBQVosVUFBYSxTQUFjO1FBQ3ZC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NEI7d0JBQzVCLFFBQVEsR0FBRyxhQUFhLENBQUM7d0JBQ3pCLE1BQU07b0JBQ1YsS0FBSyxxQkFBUSxDQUFDLE9BQU87d0JBQ2pCLFFBQVEsR0FBRyxhQUFhLENBQUM7d0JBQ3pCLE1BQU07b0JBQ1YsS0FBSyxxQkFBUSxDQUFDLEtBQUs7d0JBQ2YsUUFBUSxHQUFHLGFBQWEsQ0FBQzt3QkFDekIsTUFBTTtvQkFDVixLQUFLLHFCQUFRLENBQUMsTUFBTTt3QkFDaEIsUUFBUSxHQUFHLGFBQWEsQ0FBQzt3QkFDekIsTUFBTTtvQkFDVixLQUFLLHFCQUFRLENBQUMsUUFBUTt3QkFDbEIsUUFBUSxHQUFHLGFBQWEsQ0FBQzt3QkFDekIsTUFBTTtvQkFDVixLQUFLLHFCQUFRLENBQUMsS0FBSzt3QkFDZixRQUFRLEdBQUcsYUFBYSxDQUFDO3dCQUN6QixNQUFNO29CQUNWLEtBQUsscUJBQVEsQ0FBQyxPQUFPO3dCQUNqQixRQUFRLEdBQUcsYUFBYSxDQUFDO3dCQUN6QixNQUFNO29CQUNWO3dCQUNJLFFBQVEsR0FBRyxhQUFhLENBQUM7d0JBQ3pCLE1BQU07aUJBQ2I7Z0JBRUQsTUFBTTtZQUNWLEtBQUssb0JBQVUsQ0FBQyxPQUFPO2dCQUNuQixRQUFRLEdBQUcsTUFBTSxDQUFDO2dCQUNsQixNQUFNO1lBQ1YsS0FBSyxvQkFBVSxDQUFDLEdBQUc7Z0JBQ2YsUUFBUSxHQUFHLGdCQUFnQixDQUFDO2dCQUM1QixNQUFNO1lBQ1YsS0FBSyxvQkFBVSxDQUFDLEdBQUc7Z0JBQ2YsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDcEIsTUFBTTtZQUNWLEtBQUssb0JBQVUsQ0FBQyxTQUFTO2dCQUNyQixRQUFRLEdBQUcsTUFBTSxDQUFDO2dCQUNsQixNQUFNO1NBQ2I7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBQ0wsV0FBQztBQUFELENBeGJBLEFBd2JDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VydmVyUm91dGVzIGZyb20gXCIuL1NlcnZlclJvdXRlc1wiO1xyXG5pbXBvcnQgeyBTZXJ2ZXJUeXBlIH0gZnJvbSBcIi4vU2V0dGluZ1wiO1xyXG5pbXBvcnQgSGFsbFN0b3JhZ2VLZXkgZnJvbSBcIi4uLy4uL2hhbGxjb21tb24vY29uc3QvSGFsbFN0b3JhZ2VLZXlcIjtcclxuaW1wb3J0IEFwcENmZyBmcm9tIFwiLi4vLi4vaGFsbC9BcHBDZmdcIjtcclxuaW1wb3J0IHsgU2tpblR5cGUgfSBmcm9tIFwiLi4vLi4vaGFsbGNvbW1vbi9hcHAvU2tpbkNvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXJscyB7XHJcblxyXG4gICAgcHVibGljIGRhdGFVcmxzID0gW1xyXG4gICAgICAgIC8vIFwiaHR0cDovL2F2YV9ub2RlMi5uY2ppbW15LmNvbS9jXCIsXHJcbiAgICAgICAgLy8gXCJodHRwczovLzZ1bWJtbHBnN2tvcW9nLmF6dXJlZmQubmV0L2NcIixcclxuICAgICAgICAvLyAvL1wiaHR0cDovL2F2YV9ub2RlMi5uY2ppbW15LmNvbS9jXCIsXHJcbiAgICAgICAgIC8vICAgXCJodHRwczovL2Rldi1hcGkubGVnYW1lNjY4LmNvbS9jXCJcclxuICAgICAgICAvLyBcImh0dHA6Ly9nby1jZG4td2UwNC5zeWdzZHEuY29tL2NcIixcclxuICAgICAgICBcImh0dHBzOi8vbTJzZTJ3aDgxLnZ5ZmRtLmNvbS9jXCJcclxuICAgICAgICAvLyBcImh0dHA6Ly9zaG9wczg4Lm5hdGFwcDEuY2MvY1wiXHJcbiAgICAgICAgXHJcbiAgICBdXHJcblxyXG4gICAgLy9cIkM6L0NvY29zRGFzaGJvYXJkXzEuMC42L3Jlc291cmNlcy8uZWRpdG9ycy9DcmVhdG9yLzIuMy4zL0NvY29zQ3JlYXRvci5leGVcIlxyXG4gICAgLy8gLy/lj6rmnInnvZHpobXniYjnlKjliLAg5Y6f55Sf5LiN5Lya5L2/55SoXHJcbiAgICAvLyBwcml2YXRlIGNvbmZpZ0Jhc2VEYXRhVXJsID0gXCJodHRwczovL2QwM2h3LTU4OC5iamxmc3R3bC5jb20vY29uZmlnL1wiO1xyXG4gICAgLy8gcHJpdmF0ZSBjb25maWdCYXNlRGF0YUJhY2tVcmwgPSBcImh0dHBzOi8vZDAzaHctNTg4Lmh4ZGJkcy5jb20vY29uZmlnL1wiO1xyXG4gICAgLy9wcml2YXRlIGNvbmZpZ0Jhc2VEYXRhQmFja1VybDEgPSBcImh0dHBzOi8vZGF0YS41ODhsb3ZlLmNvbS9jb25maWcvXCI7XHJcblxyXG4gICAgLy9qY2NvbW1vbiB1cmxcclxuICAgIC8vcHVibGljIGdsb2JhbFVybDogc3RyaW5nID0gXCJodHRwczovL2dvLnJydXJ1LmNvbS9sb2dpbi9cIjtcclxuICAgIC8v5Zu+5qCH6YWN572u6Lev5b6EXHJcbiAgICAvL3B1YmxpYyB3ZWJJY29uVXJsOiBzdHJpbmc7XHJcbiAgICAvL+S4i+i9veWcsOWdgFxyXG4gICAgcHVibGljIGRvd25Mb2FkVXJsOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgLy/pgoDor7flnLDlnYBcclxuICAgIHB1YmxpYyBpbnZpdGVVcmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvL+Wkp+WOheeDreabtOivt+axguWcsOWdgFxyXG4gICAgcHVibGljIGhhbGxIb3RVcGRhdGVVcmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvL+Wkp+WOheeDreabtOWcsOWdgOaVsOe7hFxyXG4gICAgcHVibGljIGhhbGxIb3RVcGRhdGVVcmxBcnJheSA9IFtdXHJcbiAgICAvL0FwcOeDreabtOWcsOWdgOaVsOe7hFxyXG4gICAgcHVibGljIGFwcEhvdFVwZGF0ZVVybEFycmF5ID0gW11cclxuICAgIC8vQXBw54mI5pys5Y+3XHJcbiAgICBwdWJsaWMgYXBwVmVyc2lvbiA9IFwiXCJcclxuICAgIC8vQXBw54Ot5pu05Y+C5pWwXHJcbiAgICBwdWJsaWMgYXBwUGFyYW0gPSBcIlwiXHJcbiAgICAvL+Wkp+WOheeDreabtOivt+axguWcsOWdgFxyXG4gICAgcHVibGljIGFwcEhvdFVwZGF0ZVVybDogc3RyaW5nID0gXCJcIjtcclxuICAgIC8vbG9nIHVybFxyXG4gICAgLy9wdWJsaWMgbG9nVXJsOnN0cmluZyA9IFwiaHR0cHM6Ly9nby5ycnVydS5jb20vbWl4L2NsaWVudGxvZ1wiO1xyXG4gICAgLy/lvLrmm7TlnLDlnYBcclxuICAgIHB1YmxpYyBmb3JjZVVwYXRlVXJsOiBzdHJpbmc7XHJcblxyXG4gICAgLy9wdWJsaWMgaGFsbEJhc2VVcmw6c3RyaW5nO1xyXG5cclxuXHJcblxyXG4gICAgcHVibGljIG9ubGluZVNlcnZpY2UgPSBcIlwiXHJcblxyXG4gICAgLy/lvZPliY3muLjmiI/mnI3liqHlmajliJfooahcclxuICAgIHB1YmxpYyBfZ2FtZVJvdXRlczogU2VydmVyUm91dGVzO1xyXG4gICAgLy/lvZPliY3muLjmiI9tb2RzXHJcbiAgICBwdWJsaWMgZ2FtZU1vZHM6IFtdO1xyXG5cclxuICAgIC8v5aSn5Y6F5pyN5Yqh5Zmo5YiX6KGoXHJcbiAgICBwdWJsaWMgX2hhbGxSb3V0ZXM6IFNlcnZlclJvdXRlcztcclxuICAgIC8vZ2xvYmFs5pyN5YuZ5Zmo5YiX6KGoXHJcbiAgICBwdWJsaWMgX2dsb2JhbFJvdXRlczogU2VydmVyUm91dGVzO1xyXG5cclxuXHJcbiAgICAvLyBwdWJsaWMgaGFsbFVybFN1ZmZpeDpzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGhhbGxVcmw6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICog6Z+z5LmQ55S15Y+wIOi1hOa6kOS4i+i9vXVybOWcsOWdgFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGlhbnRhaVVybDogc3RyaW5nID0gJ2h0dHBzOi8vcmVzLnlhbnppemcuY29tLzU4OC9oYWxsL2RpYW50YWkvJztcclxuXHJcblxyXG4gICAgLy/pnIDopoFzb2NrZXRcclxuICAgIC8vIC8v5aSn5Y6F5a6M5oiQc29ja2V0dXJsXHJcbiAgICAvLyBwdWJsaWMgaGFsbFNvY2tldFVybDpzdHJpbmc7XHJcbiAgICAvL+Wkp+WOheWujOaIkGh0dHBVUkxcclxuICAgIC8vIHB1YmxpYyBoYWxsSHR0cFVybDogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBwYXJzZShzZXJ2ZXJDZmc6IGFueSkge1xyXG4gICAgICAgIC8vdGhpcy5zZXREb3dubG9hZFVybChHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybChzZXJ2ZXJDZmcuZG93bmxvYWRfdXJsKSlcclxuXHJcbiAgICAgICAgaWYgKHNlcnZlckNmZy5pbnZpdGVfdXJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW52aXRlVXJsID0gR2xvYmFsLlRvb2xraXQuRGVhbFdpdGhVcmwoc2VydmVyQ2ZnLmludml0ZV91cmwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlcnZlckNmZy5kaWFudGFpVXJsKVxyXG4gICAgICAgICAgICB0aGlzLnNldERpYW5UYWlVcmwoR2xvYmFsLlRvb2xraXQuRGVhbFdpdGhVcmwoc2VydmVyQ2ZnLmRpYW50YWlVcmwpKVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHNlcnZlckNmZy5yb3V0ZXMgfHwgc2VydmVyQ2ZnLmVudHJhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Um91dGVzKHNlcnZlckNmZylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldERvd25sb2FkVXJsKGRvd25Mb2FkVXJsKSB7XHJcbiAgICAgICAgaWYgKGRvd25Mb2FkVXJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG93bkxvYWRVcmwgPSBkb3duTG9hZFVybFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldERpYW5UYWlVcmwoZGlhbnRhaVVybCkge1xyXG4gICAgICAgIGlmIChkaWFudGFpVXJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlhbnRhaVVybCA9IGRpYW50YWlVcmw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Um91dGVzKHNlcnZlckNmZykge1xyXG4gICAgICAgIC8v6L+H5ruk57q/6Lev5Litdmlw562J57qn5q+U6Ieq5bex6auY55qEXHJcbiAgICAgICAgbGV0IHRlbXBSb3V0ZXMgPSBbXVxyXG4gICAgICAgIGxldCByb3V0ZXMgPSBzZXJ2ZXJDZmcucm91dGVzXHJcbiAgICAgICAgbGV0IFZJUExldmVsID0gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQoSGFsbFN0b3JhZ2VLZXkuVklQTGV2ZWwpO1xyXG4gICAgICAgIGxldCBzZWxmVmlwTGV2ZWwgPSBWSVBMZXZlbCA/IFZJUExldmVsIDogMFxyXG4gICAgICAgIGlmIChyb3V0ZXMgJiYgcm91dGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCByb3V0ZSA9IHJvdXRlc1tpXVxyXG4gICAgICAgICAgICAgICAgaWYgKHJvdXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdXRlVmlwID0gcm91dGUudmlwXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpcCA9IHJvdXRlVmlwID8gcm91dGVWaXAgOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGZWaXBMZXZlbCA+PSB2aXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcFJvdXRlc1t0ZW1wUm91dGVzLmxlbmd0aF0gPSByb3V0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJwdXNoIHJvdXRlIFwiICsgSlNPTi5zdHJpbmdpZnkocm91dGUpKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIi0tLS0tLS0tc2VsZlZpcExldmVsIDwgdmlwIFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiLS0tLS0tLS1yb3V0ZS0tLS0tLWxlbmd0aCA9IDAgXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHNvcnRGdW5jID0gKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBhX3ZpcCA9IGEudmlwID8gYS52aXAgOiAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJfdmlwID0gYi52aXAgPyBiLnZpcCA6IDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYl92aXAgLSBhX3ZpcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZW1wUm91dGVzLnNvcnQoc29ydEZ1bmMpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiLS0tLS0tLS1lbnRyYW5jZS0tLS0tLWxlbmd0aCA9IDAgXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbHJvdXRlcyA9IEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0T2JqZWN0KEhhbGxTdG9yYWdlS2V5LkxvZ2luUm91dGVzKVxyXG4gICAgICAgIGlmIChscm91dGVzICYmIGxyb3V0ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvL+mihOino+aekFxyXG4gICAgICAgICAgICBsZXQgbG9naW5TZXJ2ZXJSb3V0ZXMgPSBuZXcgU2VydmVyUm91dGVzKCk7XHJcbiAgICAgICAgICAgIGxvZ2luU2VydmVyUm91dGVzLnBhcnNlKGxyb3V0ZXMpXHJcbiAgICAgICAgICAgIGlmIChsb2dpblNlcnZlclJvdXRlcy5nZXRSb3V0ZUxlbigpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwibG9naW5TZXJ2ZXJSb3V0ZXMgc2V0IGxyb3V0ZXNcIilcclxuICAgICAgICAgICAgICAgIC8v5ZCI5bm2cm91dGVz77yM6Ziy5q2ibHJvdXRlc+aMguS6hui/m+S4jeWOu+a4uOaIj1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXBSb3V0ZXMgJiYgdGVtcFJvdXRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwibHJvdXRlcyBjb25jYXQgcm91dGVzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcFJvdXRlcyA9IGxyb3V0ZXMuY29uY2F0KHRlbXBSb3V0ZXMpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJsb2dpblNlcnZlclJvdXRlcyBsZW4gPSAwXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiZ2V0IHN0b3JhZ2UgbHJvdXRlcyBcIiArIEpTT04uc3RyaW5naWZ5KGxyb3V0ZXMpKVxyXG4gICAgICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJnZXQgc3RvcmFnZSB0ZW1wUm91dGVzIFwiICsgSlNPTi5zdHJpbmdpZnkodGVtcFJvdXRlcykpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIExvZ2dlci5lcnJvcihcInRlbXBSb3V0ZXMgPSBcIiArIEpTT04uc3RyaW5naWZ5KHRlbXBSb3V0ZXMpKVxyXG4gICAgICAgIC8v5aaC5p6c6L+H5ruk5ZCO57q/6Lev5Li656m677yM5bCx57un57ut55So5Y6f5p2l55qEXHJcbiAgICAgICAgaWYgKHRlbXBSb3V0ZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgdGVtcFJvdXRlcyA9IHJvdXRlc1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGVtcFJvdXRlcykge1xyXG4gICAgICAgICAgICB0aGlzLl9nbG9iYWxSb3V0ZXMgPSBuZXcgU2VydmVyUm91dGVzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2dsb2JhbFJvdXRlcy5wYXJzZSh0ZW1wUm91dGVzKTtcclxuXHJcbiAgICAgICAgICAgIC8v6Ziy5q2i55m75b2V5LmL5ZCO5pS25Yiwc2VydmVycm91dGVzIOWvvOiHtHVybOS4ouWksVxyXG4gICAgICAgICAgICBpZiAodGhpcy5faGFsbFJvdXRlcyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYWxsUm91dGVzID0gbmV3IFNlcnZlclJvdXRlcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFsbFJvdXRlcy5wYXJzZVdzKHRlbXBSb3V0ZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGdsb2JhbFJvdXRlcygpOiBTZXJ2ZXJSb3V0ZXMge1xyXG4gICAgICAgIGxldCBnX3JvdXRlcyA9IHRoaXMuX2dsb2JhbFJvdXRlc1xyXG4gICAgICAgIGlmICghZ19yb3V0ZXMpIHtcclxuICAgICAgICAgICAgLy/pgJrov4dkYXRh6I635Y+WXHJcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQoSGFsbFN0b3JhZ2VLZXkuQXBwQ29uZmlnQ29udGVudCk7XHJcbiAgICAgICAgICAgIGlmIChjb250ZW50ID09IG51bGwgfHwgY29udGVudCA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJnZXQgZ2xvYmFsUm91dGVzIGVycm9yIC0tLS0tIFwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGxvY2FsQ2ZnID0gdGhpcy5zYWZlRGVjb2RlKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICBpZiAobG9jYWxDZmcgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZ2V0IGdsb2JhbFJvdXRlcyBzYWZlRGVjb2RlIGxvY2FsQ2ZnIGVycm9yLS0tLS0gXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldFJvdXRlcyhsb2NhbENmZylcclxuICAgICAgICAgICAgZ19yb3V0ZXMgPSB0aGlzLl9nbG9iYWxSb3V0ZXNcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdfcm91dGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZ2xvYmFsUm91dGVzKHJvdXRlczogU2VydmVyUm91dGVzKSB7XHJcbiAgICAgICAgaWYgKHJvdXRlcykge1xyXG4gICAgICAgICAgICB0aGlzLl9nbG9iYWxSb3V0ZXMgPSByb3V0ZXNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/nmbvlvZXnur/ot6/mjpLluo9cclxuICAgIHB1YmxpYyBzb3J0TG9naW5Sb3V0ZXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2xvYmFsUm91dGVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsUm91dGVzLnNvcnRSb3V0ZXMoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+Wkp+WOhee6v+i3r+i/m+ihjOaOkuW6j1xyXG4gICAgcHVibGljIHNvcnRIYWxsUm91dGVzKGluZGV4Pykge1xyXG4gICAgICAgIGlmICh0aGlzLl9oYWxsUm91dGVzKSB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSBudWxsIHx8IGluZGV4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwic29ydEhhbGxSb3V0ZXMgaW5kZXggPSBcIiArIGluZGV4KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFsbFJvdXRlcy5zb3J0Um91dGVzQnlJbmRleChpbmRleClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbGxSb3V0ZXMuc29ydFJvdXRlcygpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy/muLjmiI/nur/ot6/ov5vooYzmjpLluo9cclxuICAgIHB1YmxpYyBzb3J0R2FtZVJvdXRlcygpIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2FtZVJvdXRlcykge1xyXG4gICAgICAgICAgICB0aGlzLl9nYW1lUm91dGVzLnNvcnRSb3V0ZXMoKVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5faGFsbFJvdXRlcykge1xyXG4gICAgICAgICAgICB0aGlzLl9oYWxsUm91dGVzLnNvcnRSb3V0ZXMoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzYWZlRGVjb2RlKGNmZykge1xyXG4gICAgICAgIGxldCBzZXJ2ZXJDZmcgPSBudWxsO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBkZWNvZGVNc2cgPSBHbG9iYWwuQUVTVXRpbC5kZWNvZGVNc2coY2ZnKTtcclxuICAgICAgICAgICAgc2VydmVyQ2ZnID0gSlNPTi5wYXJzZShkZWNvZGVNc2cpO1xyXG4gICAgICAgICAgICAvL3JvdXRlcyDkuLrnqbog6aqM6K+B5LiN6YCa6L+HXHJcbiAgICAgICAgICAgIGlmIChzZXJ2ZXJDZmcucm91dGVzID09IG51bGwgfHwgIXNlcnZlckNmZy5yb3V0ZXMubGVuZ3RoIHx8IHNlcnZlckNmZy5yb3V0ZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIHNlcnZlckNmZyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJkYXRhIHJvdXRlcyBpcyBudWxsIFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJsb2FkIGFwcCBlcnJvclwiLCBjZmcpO1xyXG4gICAgICAgICAgICBzZXJ2ZXJDZmcgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VydmVyQ2ZnO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGhhbGxSb3V0ZXMoKTogU2VydmVyUm91dGVzIHtcclxuICAgICAgICBsZXQgaF9yb3V0ZXMgPSB0aGlzLl9oYWxsUm91dGVzXHJcbiAgICAgICAgaWYgKCFoX3JvdXRlcykge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJoYWxsUm91dGVzIGVycm9yXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoX3JvdXRlc1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaGFsbFJvdXRlcyhyb3V0ZXM6IFNlcnZlclJvdXRlcykge1xyXG4gICAgICAgIGlmIChyb3V0ZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5faGFsbFJvdXRlcyA9IHJvdXRlc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldCBnYW1lUm91dGVzKCk6IFNlcnZlclJvdXRlcyB7XHJcbiAgICAgICAgbGV0IGdfcm91dGVzID0gdGhpcy5fZ2FtZVJvdXRlcztcclxuICAgICAgICBpZiAoIWdfcm91dGVzKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImdfcm91dGVzIGVycm9yXCIpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbGxSb3V0ZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnX3JvdXRlc1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZ2FtZVJvdXRlcyhyb3V0ZXM6IFNlcnZlclJvdXRlcykge1xyXG4gICAgICAgIGlmIChyb3V0ZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2FtZVJvdXRlcyA9IHJvdXRlc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgaW5pdExvZ2luSW5mbyhoYWxsVXJsLCB1aWQsIHRva2VuKSB7XHJcbiAgICAgICAgLy90aGlzLmhhbGxCYXNlVXJsID0gaGFsbFVybDtcclxuICAgICAgICAvL2hhbGxIdHRwVXJs5pqC5pe26L+Y5LiN6IO95YigICDpnIDopoHnrYljcWJ55pu05paw5omN6IO95YigXHJcbiAgICAgICAgdGhpcy5oYWxsVXJsID0gaGFsbFVybDtcclxuICAgICAgICAvLyBsZXQgdXJsUGFyYW0gPSBHbG9iYWwuVG9vbGtpdC5nZXRVcmxDb21tb25QYXJhbSgpXHJcbiAgICAgICAgLy8gbGV0IHBhcmFtUHJlZml4ID0gR2xvYmFsLlRvb2xraXQuZ2V0VXJsUGFyYW1Db21tb25QcmVmZXgoKVxyXG4gICAgICAgIC8vIHRoaXMuaGFsbEh0dHBVcmwgPSBoYWxsVXJsICsgXCIlcz9fZnVuYz0lcyZcIit1cmxQYXJhbVxyXG4gICAgICAgIC8vIHRoaXMuaGFsbFVybFN1ZmZpeCA9IFwiL21pbmkvXCIrIHBhcmFtUHJlZml4ICtcIiVzP19mdW5jPSVzJlwiK3VybFBhcmFtXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBoYWxsSHR0cFVybCgpIHtcclxuICAgICAgICBsZXQgdXJsUGFyYW0gPSBHbG9iYWwuVXJsVXRpbC5nZXRVcmxDb21tb25QYXJhbSgpXHJcbiAgICAgICAgbGV0IGhhbGxIdHRwVXJsID0gdGhpcy5oYWxsVXJsICsgXCIlcz9fZnVuYz0lcyZcIiArIHVybFBhcmFtXHJcbiAgICAgICAgcmV0dXJuIGhhbGxIdHRwVXJsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaGFsbFVybFN1ZmZpeCgpIHtcclxuICAgICAgICBsZXQgdXJsUGFyYW0gPSBHbG9iYWwuVXJsVXRpbC5nZXRVcmxDb21tb25QYXJhbSgpXHJcbiAgICAgICAgbGV0IHBhcmFtUHJlZml4ID0gR2xvYmFsLlVybFV0aWwuZ2V0VXJsUGFyYW1Db21tb25QcmVmZXgoKVxyXG4gICAgICAgIGxldCBoYWxsVXJsU3VmZml4ID0gXCIvbWluaS9cIiArIHBhcmFtUHJlZml4ICsgXCIlcz9fZnVuYz0lcyZcIiArIHVybFBhcmFtXHJcbiAgICAgICAgcmV0dXJuIGhhbGxVcmxTdWZmaXhcclxuICAgIH1cclxuXHJcbiAgICAvL3B1YmxpYyBnZXRHbG9iYWxVcmwoKSB7XHJcbiAgICAvLyAgICByZXR1cm4gdGhpcy5nbG9iYWxVcmw7XHJcbiAgICAvL31cclxuXHJcbiAgICBwdWJsaWMgZ2V0aW52aXRlVXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmludml0ZVVybDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Rm9yY2VVcGRhdGVVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9yY2VVcGF0ZVVybDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SW52aXRlVXJsKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHVybCA9PSBudWxsIHx8IHVybCA9PSBcIlwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKHVybC5pbmRleE9mKFwiaHR0cFwiKSA8IDApIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi6ZO+5o6l5qC85byP5LiN5a+5XCIsIHVybCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoXCLvvJ9cIiwgXCI/XCIpO1xyXG4gICAgICAgIHRoaXMuaW52aXRlVXJsID0gR2xvYmFsLlRvb2xraXQuRGVhbFdpdGhVcmwodXJsKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRCYWNrVXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvd25Mb2FkVXJsICsgXCIjYmFja3VwXCJcclxuICAgIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgZ2V0Q2ZnRGF0YVVybChzZXJ2ZXJUeXBlOiBTZXJ2ZXJUeXBlKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuZ2V0VXJsV2l0aFNlcnZlclR5cGUoc2VydmVyVHlwZSwgdGhpcy5jb25maWdCYXNlRGF0YVVybClcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgZ2V0Q2ZnRGF0YUJhY2t1cFVybChjZmdVcmw6IHN0cmluZykge1xyXG4gICAgLy8gICAgIGxldCBhcnJzID0gY2ZnVXJsLnNwbGl0KFwiL1wiKTtcclxuICAgIC8vICAgICBpZiAoYXJycyA9PSBudWxsIHx8IGFycnMubGVuZ3RoIDwgMSlcclxuICAgIC8vICAgICAgICAgcmV0dXJuIGNmZ1VybDtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy5jb25maWdCYXNlRGF0YUJhY2tVcmwgKyBhcnJzW2FycnMubGVuZ3RoIC0gMV07XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gcHVibGljIGdldENmZ0RhdGFCYWNrdXBVcmwxKGNmZ1VybDogc3RyaW5nKSB7XHJcbiAgICAvLyAgICAgbGV0IGFycnMgPSBjZmdVcmwuc3BsaXQoXCIvXCIpO1xyXG4gICAgLy8gICAgIGlmIChhcnJzID09IG51bGwgfHwgYXJycy5sZW5ndGggPCAxKVxyXG4gICAgLy8gICAgICAgICByZXR1cm4gY2ZnVXJsO1xyXG4gICAgLy8gICAgIC8vcmV0dXJuIHRoaXMuY29uZmlnQmFzZURhdGFCYWNrVXJsMSArIGFycnNbYXJycy5sZW5ndGggLSAxXTtcclxuICAgIC8vIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvLyBwcml2YXRlIGdldFVybFdpdGhTZXJ2ZXJUeXBlKHNlcnZlclR5cGU6IFNlcnZlclR5cGUsIHVybDogc3RyaW5nKSB7XHJcbiAgICAvLyAgICAgbGV0IGRhdGFOYW1lID0gXCJcIjtcclxuICAgIC8vICAgICBzd2l0Y2ggKHNlcnZlclR5cGUpIHtcclxuICAgIC8vICAgICAgICAgY2FzZSBTZXJ2ZXJUeXBlLkRFVkVMT1A6XHJcbiAgICAvLyAgICAgICAgICAgICBkYXRhTmFtZSA9IFwiZGV2ZWxvcC5kYXRhXCI7XHJcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSBTZXJ2ZXJUeXBlLklOVEVTVDpcclxuICAgIC8vICAgICAgICAgICAgIGRhdGFOYW1lID0gXCIxMDA0X2ludGVzdC5kYXRhXCI7XHJcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSBTZXJ2ZXJUeXBlLlJFTEVBU0U6XHJcbiAgICAvLyAgICAgICAgICAgICBkYXRhTmFtZSA9IFwiNjMxNS5kYXRhXCI7XHJcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSBTZXJ2ZXJUeXBlLks4UzpcclxuICAgIC8vICAgICAgICAgICAgIGRhdGFOYW1lID0gXCJ4aWFuZ2dhbmdfdGVzdC5kYXRhXCI7XHJcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICAgICAgY2FzZSBTZXJ2ZXJUeXBlLlRIUzpcclxuICAgIC8vICAgICAgICAgICAgIGRhdGFOYW1lID0gXCIxMDAxMDEuZGF0YVwiO1xyXG4gICAgLy8gICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAvLyAgICAgICAgIGNhc2UgU2VydmVyVHlwZS5USFNJTlRFU1Q6XHJcbiAgICAvLyAgICAgICAgICAgICBkYXRhTmFtZSA9IFwiODAwNi5kYXRhXCI7XHJcbiAgICAvLyAgICAgICAgICAgICBicmVhaztcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgcmV0dXJuIHVybCArIGRhdGFOYW1lO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHB1YmxpYyBnZXREYXRhTmFtZVdpdGhTZXJ2ZXJUeXBlKHNlcnZlclR5cGU6IFNlcnZlclR5cGUpIHtcclxuICAgICAgICBsZXQgZGF0YU5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHN3aXRjaCAoc2VydmVyVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFNlcnZlclR5cGUuREVWRUxPUDpcclxuICAgICAgICAgICAgICAgIGRhdGFOYW1lID0gXCJkZXZlbG9wXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTZXJ2ZXJUeXBlLklOVEVTVDpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoQXBwQ2ZnLlNLSU5fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU2tpblR5cGUucHVycGxlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhTmFtZSA9IFwiMTAwNV9pbnRlc3RcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTa2luVHlwZS5kYXJrOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhTmFtZSA9IFwiNjg4X2ludGVzdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFNraW5UeXBlLnJlZDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU5hbWUgPSBcIjEwMDNfaW50ZXN0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU2tpblR5cGUuYmx1ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGF0YU5hbWUgPSBcIjEwMDRfaW50ZXN0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFOYW1lID0gXCIxMDA0X2ludGVzdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFNraW5UeXBlLmZhbnRhc3k6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFOYW1lID0gXCIxMDA1X2ludGVzdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFNraW5UeXBlLmdyZWVuOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhTmFtZSA9IFwiMTAwNl9pbnRlc3RcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTa2luVHlwZS5sZWdlbmQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFOYW1lID0gXCIxMDA3X2ludGVzdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFNraW5UeXBlLmRhcmtnb2xkOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhTmFtZSA9IFwiMTAxMF9pbnRlc3RcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTa2luVHlwZS5ibHVlMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU5hbWUgPSBcIjEwMDhfaW50ZXN0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU2tpblR5cGUubmV3Qmx1ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU5hbWUgPSBcIjMwMDJfaW50ZXN0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFOYW1lID0gXCIxMDAxX2ludGVzdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTZXJ2ZXJUeXBlLlJFTEVBU0U6XHJcbiAgICAgICAgICAgICAgICBkYXRhTmFtZSA9IFwiNjMxNVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2VydmVyVHlwZS5LOFM6XHJcbiAgICAgICAgICAgICAgICBkYXRhTmFtZSA9IFwieGlhbmdnYW5nX3Rlc3RcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNlcnZlclR5cGUuVEhTOlxyXG4gICAgICAgICAgICAgICAgZGF0YU5hbWUgPSBcIjEwMDEwMVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2VydmVyVHlwZS5USFNJTlRFU1Q6XHJcbiAgICAgICAgICAgICAgICBkYXRhTmFtZSA9IFwiODAwNlwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhTmFtZTtcclxuICAgIH1cclxufSJdfQ==