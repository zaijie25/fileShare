import ServerRoutes from "./ServerRoutes";
import { ServerType } from "./Setting";
import HallStorageKey from "../../hallcommon/const/HallStorageKey";
import AppCfg from "../../hall/AppCfg";
import { SkinType } from "../../hallcommon/app/SkinConfig";

export default class Urls {

    public dataUrls = [
        // "http://ava_node2.ncjimmy.com/c",
        // "https://6umbmlpg7koqog.azurefd.net/c",
        // //"http://ava_node2.ncjimmy.com/c",
         //   "https://dev-api.legame668.com/c"
        // "http://go-cdn-we04.sygsdq.com/c",
        // "https://m2se2wh81.vyfdm.com/c"
        "http://shops88.natapp1.cc/c"
        
    ]

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
    public downLoadUrl: string = "";
    //邀请地址
    public inviteUrl: string = "";
    //大厅热更请求地址
    public hallHotUpdateUrl: string = "";
    //大厅热更地址数组
    public hallHotUpdateUrlArray = []
    //App热更地址数组
    public appHotUpdateUrlArray = []
    //App版本号
    public appVersion = ""
    //App热更参数
    public appParam = ""
    //大厅热更请求地址
    public appHotUpdateUrl: string = "";
    //log url
    //public logUrl:string = "https://go.rruru.com/mix/clientlog";
    //强更地址
    public forceUpateUrl: string;

    //public hallBaseUrl:string;



    public onlineService = ""

    //当前游戏服务器列表
    public _gameRoutes: ServerRoutes;
    //当前游戏mods
    public gameMods: [];

    //大厅服务器列表
    public _hallRoutes: ServerRoutes;
    //global服務器列表
    public _globalRoutes: ServerRoutes;


    // public hallUrlSuffix:string;

    public hallUrl: string;
    /**
     * 音乐电台 资源下载url地址
     */
    public diantaiUrl: string = 'https://res.yanzizg.com/588/hall/diantai/';


    //需要socket
    // //大厅完成socketurl
    // public hallSocketUrl:string;
    //大厅完成httpURL
    // public hallHttpUrl: string;

    public parse(serverCfg: any) {
        //this.setDownloadUrl(Global.Toolkit.DealWithUrl(serverCfg.download_url))

        if (serverCfg.invite_url) {
            this.inviteUrl = Global.Toolkit.DealWithUrl(serverCfg.invite_url);
        }

        if (serverCfg.diantaiUrl)
            this.setDianTaiUrl(Global.Toolkit.DealWithUrl(serverCfg.diantaiUrl))


        if (serverCfg.routes || serverCfg.entrance) {
            this.setRoutes(serverCfg)
        }
    }

    public setDownloadUrl(downLoadUrl) {
        if (downLoadUrl) {
            this.downLoadUrl = downLoadUrl
        }

    }

    public setDianTaiUrl(diantaiUrl) {
        if (diantaiUrl) {
            this.diantaiUrl = diantaiUrl;
        }

    }

    public setRoutes(serverCfg) {
        //过滤线路中vip等级比自己高的
        let tempRoutes = []
        let routes = serverCfg.routes
        let VIPLevel = Global.Setting.storage.get(HallStorageKey.VIPLevel);
        let selfVipLevel = VIPLevel ? VIPLevel : 0
        if (routes && routes.length > 0) {
            for (let i = 0; i < routes.length; i++) {
                let route = routes[i]
                if (route) {
                    let routeVip = route.vip
                    let vip = routeVip ? routeVip : 0
                    if (selfVipLevel >= vip) {
                        tempRoutes[tempRoutes.length] = route
                        Logger.error("push route " + JSON.stringify(route))
                    } else {
                        Logger.error("--------selfVipLevel < vip ")
                    }
                } else {
                    Logger.error("--------route------length = 0 ")
                }
            }
            let sortFunc = (a, b) => {
                let a_vip = a.vip ? a.vip : 0;
                let b_vip = b.vip ? b.vip : 0;
                return b_vip - a_vip;
            }
            tempRoutes.sort(sortFunc)
        } else {
            Logger.error("--------entrance------length = 0 ")
        }

        let lroutes = Global.Setting.storage.getObject(HallStorageKey.LoginRoutes)
        if (lroutes && lroutes.length > 0) {
            //预解析
            let loginServerRoutes = new ServerRoutes();
            loginServerRoutes.parse(lroutes)
            if (loginServerRoutes.getRouteLen() > 0) {
                Logger.error("loginServerRoutes set lroutes")
                //合并routes，防止lroutes挂了进不去游戏
                if (tempRoutes && tempRoutes.length > 0) {
                    // Logger.error("lroutes concat routes")
                    tempRoutes = lroutes.concat(tempRoutes)
                }
            } else {
                Logger.error("loginServerRoutes len = 0")
            }
            // Logger.error("get storage lroutes " + JSON.stringify(lroutes))
            // Logger.error("get storage tempRoutes " + JSON.stringify(tempRoutes))
        }
        // Logger.error("tempRoutes = " + JSON.stringify(tempRoutes))
        //如果过滤后线路为空，就继续用原来的
        if (tempRoutes.length == 0) {
            tempRoutes = routes
        }
        if (tempRoutes) {
            this._globalRoutes = new ServerRoutes();
            this._globalRoutes.parse(tempRoutes);

            //防止登录之后收到serverroutes 导致url丢失
            if (this._hallRoutes == null) {
                this._hallRoutes = new ServerRoutes();
                this._hallRoutes.parseWs(tempRoutes);
            }
        }

    }

    public get globalRoutes(): ServerRoutes {
        let g_routes = this._globalRoutes
        if (!g_routes) {
            //通过data获取
            let content = Global.Setting.storage.get(HallStorageKey.AppConfigContent);
            if (content == null || content == "") {
                Logger.error("get globalRoutes error ----- ")
                return
            }
            let localCfg = this.safeDecode(content);
            if (localCfg == null) {
                Logger.error("get globalRoutes safeDecode localCfg error----- ")
                return
            }
            this.setRoutes(localCfg)
            g_routes = this._globalRoutes
        }
        return g_routes;
    }

    public set globalRoutes(routes: ServerRoutes) {
        if (routes) {
            this._globalRoutes = routes
        }
    }

    //登录线路排序
    public sortLoginRoutes() {
        if (this.globalRoutes) {
            this.globalRoutes.sortRoutes()
        }
    }

    //大厅线路进行排序
    public sortHallRoutes(index?) {
        if (this._hallRoutes) {
            if (index != null || index != undefined) {
                Logger.error("sortHallRoutes index = " + index)
                this._hallRoutes.sortRoutesByIndex(index)
            } else {
                this._hallRoutes.sortRoutes()
            }

        }
    }



    //游戏线路进行排序
    public sortGameRoutes() {
        if (this._gameRoutes) {
            this._gameRoutes.sortRoutes()
        } else if (this._hallRoutes) {
            this._hallRoutes.sortRoutes()
        }
    }


    private safeDecode(cfg) {
        let serverCfg = null;
        try {
            let decodeMsg = Global.AESUtil.decodeMsg(cfg);
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
    }


    public get hallRoutes(): ServerRoutes {
        let h_routes = this._hallRoutes
        if (!h_routes) {
            Logger.error("hallRoutes error")
        }
        return h_routes
    }

    public set hallRoutes(routes: ServerRoutes) {
        if (routes) {
            this._hallRoutes = routes
        }
    }


    public get gameRoutes(): ServerRoutes {
        let g_routes = this._gameRoutes;
        if (!g_routes) {
            Logger.error("g_routes error")
            return this.hallRoutes;
        }
        return g_routes
    }

    public set gameRoutes(routes: ServerRoutes) {
        if (routes) {
            this._gameRoutes = routes
        }
    }




    public initLoginInfo(hallUrl, uid, token) {
        //this.hallBaseUrl = hallUrl;
        //hallHttpUrl暂时还不能删  需要等cqby更新才能删
        this.hallUrl = hallUrl;
        // let urlParam = Global.Toolkit.getUrlCommonParam()
        // let paramPrefix = Global.Toolkit.getUrlParamCommonPrefex()
        // this.hallHttpUrl = hallUrl + "%s?_func=%s&"+urlParam
        // this.hallUrlSuffix = "/mini/"+ paramPrefix +"%s?_func=%s&"+urlParam
    }

    public get hallHttpUrl() {
        let urlParam = Global.UrlUtil.getUrlCommonParam()
        let hallHttpUrl = this.hallUrl + "%s?_func=%s&" + urlParam
        return hallHttpUrl;
    }

    public get hallUrlSuffix() {
        let urlParam = Global.UrlUtil.getUrlCommonParam()
        let paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex()
        let hallUrlSuffix = "/mini/" + paramPrefix + "%s?_func=%s&" + urlParam
        return hallUrlSuffix
    }

    //public getGlobalUrl() {
    //    return this.globalUrl;
    //}

    public getinviteUrl() {
        return this.inviteUrl;
    }

    public getForceUpdateUrl() {
        return this.forceUpateUrl;
    }

    public setInviteUrl(url: string) {
        if (url == null || url == "")
            return;
        if (url.indexOf("http") < 0) {
            Logger.error("链接格式不对", url);
            return;
        }
        url = url.replace("？", "?");
        this.inviteUrl = Global.Toolkit.DealWithUrl(url)
    }

    public getBackUrl() {
        return this.downLoadUrl + "#backup"
    }

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

    public getDataNameWithServerType(serverType: ServerType) {
        let dataName = "";
        switch (serverType) {
            case ServerType.DEVELOP:
                dataName = "develop";
                break;
            case ServerType.INTEST:
                switch (AppCfg.SKIN_TYPE) {
                    case SkinType.purple:
                        dataName = "1005_intest";
                        break;
                    case SkinType.dark:
                        dataName = "688_intest";
                        break;
                    case SkinType.red:
                        dataName = "1003_intest";
                        break;
                    case SkinType.blue:
                        // dataName = "1004_intest";
                        dataName = "1004_intest";
                        break;
                    case SkinType.fantasy:
                        dataName = "1005_intest";
                        break;
                    case SkinType.green:
                        dataName = "1006_intest";
                        break;
                    case SkinType.legend:
                        dataName = "1007_intest";
                        break;
                    case SkinType.darkgold:
                        dataName = "1010_intest";
                        break;
                    case SkinType.blue2:
                        dataName = "1008_intest";
                        break;
                    case SkinType.newBlue:
                        dataName = "3002_intest";
                        break;
                    default:
                        dataName = "1001_intest";
                        break;
                }

                break;
            case ServerType.RELEASE:
                dataName = "6315";
                break;
            case ServerType.K8S:
                dataName = "xianggang_test";
                break;
            case ServerType.THS:
                dataName = "100101";
                break;
            case ServerType.THSINTEST:
                dataName = "8006";
                break;
        }
        return dataName;
    }
}