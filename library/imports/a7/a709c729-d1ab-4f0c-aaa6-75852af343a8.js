"use strict";
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