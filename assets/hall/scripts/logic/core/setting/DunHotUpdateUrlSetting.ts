import ServerRoutes, { ServerRouteInfo, ServerUrl } from "./ServerRoutes";

export default class DunHotUpdateUrlSetting {
    private _hotUpdateServerRoutes:ServerRoutes

    private _payServerRoutes:ServerRoutes

    private _hotUpdateRouteCfg:any;

    private _payRouteCfg:any;
    private _dunType = 0

    constructor(){
        this._hotUpdateServerRoutes = new ServerRoutes();
        this._payServerRoutes = new ServerRoutes();
    }

    public get hotUpdateUrl(){
        let curRoute = this._hotUpdateServerRoutes.getCurRoute()
        let serverRoutes = this.hotUpdateServerRoutes
        let url :ServerUrl = null
        if (curRoute){
            if (curRoute.checkSelfIsOK()){
                let serverUrl = curRoute.getUrl()
                url = serverUrl
                this.curDunType = curRoute.lo_type
            }else {
                let routesLen = serverRoutes.getRouteLen()
                if (routesLen > 1){
                    let nextRoute :ServerRouteInfo = serverRoutes.getAnotherRoute()
                    if (nextRoute && nextRoute.checkSelfIsOK()){
                        Logger.error("extraData.url changeToAnotherRoute");
                        let serverUrl = nextRoute.getUrl()
                        url = serverUrl
                        this.curDunType = nextRoute.lo_type
                    }else {
                        Logger.error("extraData.url nextRoute is null or not ok !!!");
                        let canUseRoute:ServerRouteInfo = serverRoutes.getCanUseRoute()
                        if (canUseRoute){
                            let serverUrl :ServerUrl = canUseRoute.getUrl()
                            url = serverUrl
                            this.curDunType = canUseRoute.lo_type
                        }else {
                            Logger.error("extraData.url canUseRoute = null");
                        }
                        
                    }
                }else if(routesLen == 1) {
                    // Logger.error("extraData.url routesLen = 1");
                    let serverUrl = curRoute.getUrl()
                    this.curDunType = curRoute.lo_type
                    url = serverUrl
                }else {
                    Logger.error("extraData.url routesLen = 0 ");
                }
            }
        }else {
            Logger.error("extraData.url curRoute is null !!!");
        }
        if (url && url.getUrl()){
           
            return url.getUrl();
        }
        return null
    } 

    public get payeUrl(){
        let curRoute = this._payServerRoutes.getCurRoute()
        let serverRoutes = this._payServerRoutes
        let url :ServerUrl = null
        if (curRoute){
            if (curRoute.checkSelfIsOK()){
                let serverUrl = curRoute.getUrl()
                url = serverUrl
            }else {
                let routesLen = serverRoutes.getRouteLen()
                if (routesLen > 1){
                    let nextRoute :ServerRouteInfo = serverRoutes.getAnotherRoute()
                    if (nextRoute && nextRoute.checkSelfIsOK()){
                        Logger.error("extraData.url changeToAnotherRoute");
                        let serverUrl = nextRoute.getUrl()
                        url = serverUrl
                    }else {
                        Logger.error("extraData.url nextRoute is null or not ok !!!");
                        let canUseRoute:ServerRouteInfo = serverRoutes.getCanUseRoute()
                        if (canUseRoute){
                            let serverUrl :ServerUrl = canUseRoute.getUrl()
                            url = serverUrl
                        }else {
                            Logger.error("extraData.url canUseRoute = null");
                        }
                        
                    }
                }else if(routesLen == 1) {
                    // Logger.error("extraData.url routesLen = 1");
                    let serverUrl = curRoute.getUrl()
                    url = serverUrl
                }else {
                    Logger.error("extraData.url routesLen = 0 ");
                }
            }
        }else {
            Logger.error("extraData.url curRoute is null !!!");
        }
        if (url && url.getUrl()){
           
            return url.getUrl();
        }
        return null
    } 

    public switchRoute()
    {
        if(this._hotUpdateServerRoutes)
        {
            this._hotUpdateServerRoutes.changeToAnotherRoute()
        }
    }


    public get hotUpdateRouteCfg(){
        return this._hotUpdateRouteCfg;
    }

    
    public get payRouteCfg(){
        return this._payRouteCfg;
    }

    public get curDunType()
    {
       return this._dunType
    }

    public set curDunType(val)
    {
        if(!val)
        {
            val = 0
        }
        this._dunType = val
    }

   

    public set hotUpdateRouteCfg(cfg:any){
        this._hotUpdateRouteCfg = cfg;
        
        if(!this._hotUpdateServerRoutes)
        {
            this._hotUpdateServerRoutes = new ServerRoutes();
        }
        this._hotUpdateServerRoutes.cleanRoutes()
        this._hotUpdateServerRoutes.parse(cfg)
    }


    public set payRouteCfg(cfg:any){
        this._payRouteCfg = cfg;
        
        if(!this._payServerRoutes)
        {
            this._payServerRoutes = new ServerRoutes();
        }
        this._payServerRoutes.cleanRoutes()
        this._payServerRoutes.parse(cfg)
    }




    public get hotUpdateServerRoutes(){
        return this._hotUpdateServerRoutes
    }

    public set hotUpdateServerRoutes(route:ServerRoutes){
        this._hotUpdateServerRoutes = route;
    }
    
}