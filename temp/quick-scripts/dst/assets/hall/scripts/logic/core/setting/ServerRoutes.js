
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/setting/ServerRoutes.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8692dh3w0NLxLTVEe0yIyXf', 'ServerRoutes');
// hall/scripts/logic/core/setting/ServerRoutes.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerUrl = exports.ServerRouteInfo = void 0;
var ServerRoutes = /** @class */ (function () {
    function ServerRoutes() {
        this.serverInfoList = [];
        this.curIndex = 0;
    }
    ServerRoutes.prototype.parse = function (routes) {
        if (routes == null)
            return;
        for (var i = 0; i < routes.length; i++) {
            if (!this.checkRouteValid(routes[i]))
                continue;
            var routeInfo = routes[i];
            //检测route是否合法
            if (Global.UrlUtil.checkIsMutiLinesSameHost(routeInfo.host)) {
                var lineAddresses = Global.UrlUtil.getMutiLinesSameHost(routeInfo.host);
                // Logger.error("checkIsMutiLinesSameHost lineAddresses " + JSON.stringify(lineAddresses))
                if (lineAddresses && lineAddresses.length > 0) {
                    var lineAddressesLen = lineAddresses.length;
                    for (var i_1 = 0; i_1 < lineAddressesLen; i_1++) {
                        var lineAddress = lineAddresses[i_1];
                        var newLineRouteInfo = Global.JSUtil.copyObj(routeInfo);
                        newLineRouteInfo.host = lineAddress;
                        var serverInfo = new ServerRouteInfo();
                        serverInfo.parse(newLineRouteInfo);
                        if (serverInfo.checkSelfIsSupport()) {
                            this.serverInfoList.push(serverInfo);
                        }
                    }
                }
                Logger.error("checkIsMutiLinesSameHost this.serverInfoList " + JSON.stringify(this.serverInfoList));
            }
            else {
                var serverInfo = new ServerRouteInfo();
                serverInfo.parse(routes[i]);
                if (serverInfo.checkSelfIsSupport()) {
                    this.serverInfoList.push(serverInfo);
                }
            }
        }
    };
    ServerRoutes.prototype.cleanRoutes = function () {
        this.serverInfoList = [];
    };
    //新增wsport  当配置wsport后 大厅可以直接使用登录的域名+wsport作为游戏服务器地址
    ServerRoutes.prototype.parseWs = function (routes) {
        if (routes == null)
            return;
        for (var i = 0; i < routes.length; i++) {
            if (!this.checkWsRouteValid(routes[i]))
                continue;
            //检测route是否合法
            var serverInfo = new ServerRouteInfo();
            serverInfo.parseWs(routes[i]);
            //检测当前route是否支持
            if (serverInfo.checkSelfIsSupport()) {
                this.serverInfoList.push(serverInfo);
            }
        }
    };
    ServerRoutes.prototype.checkRouteValid = function (routeInfo) {
        return routeInfo.host != null;
    };
    ServerRoutes.prototype.checkWsRouteValid = function (routeInfo) {
        return routeInfo.host != null && routeInfo.wsport != null && routeInfo.wsport != "" && routeInfo.wsport != 0;
    };
    //返回随机route
    ServerRoutes.prototype.getRandRoute = function () {
        // if(this.serverInfoList.length == 0)
        //     return null;
        // let len = this.serverInfoList.length;
        // let randIndex = Global.Toolkit.getRoundInteger(len, 0)
        // let routeInfo = this.serverInfoList[randIndex];
        // this.curIndex = randIndex;
        // return routeInfo;
        return this.getCurRoute();
    };
    ServerRoutes.prototype.getRouteArr = function () {
        var arr = [];
        for (var i = 0; i < this.serverInfoList.length; i++)
            arr.push(this.serverInfoList[i].host);
        return arr;
    };
    ServerRoutes.prototype.getRouteLen = function () {
        if (this.serverInfoList) {
            return this.serverInfoList.length;
        }
        return 0;
    };
    ServerRoutes.prototype.changeToAnotherRoute = function () {
        if (this.serverInfoList.length < 1)
            return;
        this.curIndex = (this.curIndex + 1) % this.serverInfoList.length;
        // Logger.error("changeToAnotherRoute curIndex = " + this.curIndex)
        // Logger.error("changeToAnotherRoute curIndex route = " + JSON.stringify(this.serverInfoList[this.curIndex]))
    };
    //切换到下一个route
    ServerRoutes.prototype.getAnotherRoute = function () {
        if (this.serverInfoList.length == 0)
            return null;
        if (this.serverInfoList.length == 1)
            return this.serverInfoList[0];
        this.curIndex = (this.curIndex + 1) % this.serverInfoList.length;
        return this.serverInfoList[this.curIndex];
    };
    //返回当前route
    ServerRoutes.prototype.getCurRoute = function () {
        var curRoute = null;
        if (this.serverInfoList[this.curIndex] != null) {
            curRoute = this.serverInfoList[this.curIndex];
        }
        else {
            Logger.error("cur route is null !!!");
            for (var i = 0; i < this.serverInfoList.length; i++) {
                if (this.serverInfoList[i] != null) {
                    this.curIndex = i;
                    curRoute = this.serverInfoList[i];
                    break;
                }
            }
        }
        //加了盾，有可能当前还没初始化成功,手动切换一次线路
        if (curRoute) {
            if (curRoute.checkSelfIsOK()) {
                Logger.warn("getCurRoute curRoute checkSelfIsOK !!!");
                return curRoute;
            }
            else {
                curRoute = this.getCanUseRoute();
                if (curRoute) {
                    Logger.warn("getCurRoute curRoute getCanUseRoute !!!");
                    return curRoute;
                }
                else {
                    Logger.error("getCurRoute getCanUseRoute is null !!!");
                }
            }
        }
        else {
            Logger.error("getCurRoute curRoute is null !!!");
        }
        return null;
    };
    //对线路排序,成功的优先排在最先
    ServerRoutes.prototype.sortRoutes = function () {
        if (this.curIndex == 0) {
            // Logger.error("don't have to sort routes")
            return;
        }
        if (this.serverInfoList) {
            var curServerRoute_1 = this.serverInfoList[this.curIndex];
            var newRoutes = [curServerRoute_1].concat(this.serverInfoList.filter(function (item) { return item != curServerRoute_1; }));
            this.serverInfoList = newRoutes;
            this.curIndex = 0;
        }
    };
    ServerRoutes.prototype.sortRoutesByIndex = function (index) {
        if (index == null || index == undefined) {
            return;
        }
        if (this.curIndex == index) {
            return;
        }
        if (this.serverInfoList) {
            var curServerRoute_2 = this.serverInfoList[index];
            if (curServerRoute_2) {
                var newRoutes = [curServerRoute_2].concat(this.serverInfoList.filter(function (item) { return item != curServerRoute_2; }));
                this.serverInfoList = newRoutes;
                this.curIndex = 0;
            }
        }
    };
    ServerRoutes.prototype.getRouteByIndex = function (index) {
        if (index == null || index == undefined) {
            return;
        }
        if (this.serverInfoList) {
            var curServerRoute = this.serverInfoList[index];
            return curServerRoute;
        }
    };
    //拿到当前可用的线路
    ServerRoutes.prototype.getCanUseRoute = function () {
        var canUseRoute = null;
        if (this.serverInfoList) {
            for (var i = 0; i < this.serverInfoList.length; i++) {
                var route = this.serverInfoList[i];
                if (route != null) {
                    var lo_type = route.lo_type;
                    if (lo_type) {
                        if (lo_type > 1) {
                            if (route.checkSelfIsOK()) {
                                this.curIndex = i;
                                canUseRoute = route;
                                break;
                            }
                        }
                        else {
                            this.curIndex = i;
                            canUseRoute = route;
                            break;
                        }
                    }
                    else {
                        this.curIndex = i;
                        canUseRoute = route;
                        break;
                    }
                }
            }
            if (canUseRoute) {
                return canUseRoute;
            }
        }
    };
    return ServerRoutes;
}());
exports.default = ServerRoutes;
var ServerRouteInfo = /** @class */ (function () {
    function ServerRouteInfo() {
        // //服务器ip地址
        // public ip:string;
        //服务器端口
        this.port = 0;
        //ws服务器端口
        this.us_port = 0;
        //盾需要的本地端口
        this.lo_port = 0;
        //盾类型:0:不启用盾 1.自签名证书 2.云盾 3.智安盾
        this.lo_type = 0;
        //线路类型 0 常规请求线路 1下载资源线路
        this.url_type = 0;
    }
    // public group:string;
    // public dip:string;
    ServerRouteInfo.prototype.parse = function (serverInfo) {
        // Logger.error("ServerRouteInfo parse host = " + serverInfo.host)
        // Logger.error("ServerRouteInfo parse lo_port = " + serverInfo.lo_port)
        this.realHost = serverInfo.host;
        this.port = serverInfo.port;
        this.us_port = serverInfo.us_port;
        this.lo_type = serverInfo.lo_type;
        var lo_port = serverInfo.lo_port;
        this.lo_port = lo_port;
        this.attr = serverInfo.attr;
        if (this.lo_type && this.lo_type > 1) {
            Logger.error("ServerRouteInfo parse initDunSDK lo_type = " + this.lo_type);
            Global.AppDun.initDunSDK(this.lo_type);
            if (lo_port && lo_port > 0) {
                this.lo_port = lo_port;
            }
            else if (this.us_port && this.us_port > 0) {
                this.lo_port = this.us_port;
            }
            else if (this.port && this.port > 0) {
                this.lo_port = this.port;
            }
        }
        var sad = serverInfo.sad;
        if (sad) {
            var tempArray = sad.split(".");
            if (tempArray && tempArray.length < 2) {
                //加密
                var host = Global.AESUtil.aesDecrptHost(sad);
                if (host) {
                    this.host = host;
                }
            }
            else {
                this.host = sad.trim();
            }
        }
        else {
            this.host = this.realHost;
        }
        if (serverInfo.param) {
            this.param = serverInfo.param;
        }
        if (serverInfo.url_type) {
            this.url_type = serverInfo.url_type;
        }
    };
    ServerRouteInfo.prototype.getServerUrl = function () {
        var serverUrl = new ServerUrl();
        serverUrl.addressHost = this.host ? this.host : this.realHost;
        serverUrl.realHost = this.realHost ? this.realHost : this.host;
        serverUrl.address = serverUrl.realHost;
        serverUrl.attr = this.attr;
        serverUrl.lo_type = this.lo_type;
        serverUrl.param = this.param;
        serverUrl.url_type = this.url_type;
        //旧版本不支持自签名证书
        if (this.lo_type == 1) { //自签名证书
            Global.UrlUtil.setRouteUrlCer(serverUrl);
        }
        else {
            Logger.log("no self signed");
        }
        return serverUrl;
    };
    ServerRouteInfo.prototype.parseWs = function (serverInfo) {
        this.realHost = serverInfo.host;
        this.port = serverInfo.wsport;
        this.us_port = serverInfo.us_port;
        this.lo_type = serverInfo.lo_type;
        var lo_port = serverInfo.lo_port;
        this.lo_port = lo_port;
        this.attr = serverInfo.attr;
        if (this.lo_type && this.lo_type > 1) {
            Logger.error("ServerRouteInfo parse initDunSDK lo_type = " + this.lo_type);
            Global.AppDun.initDunSDK(this.lo_type);
            if (lo_port && lo_port > 0) {
                this.lo_port = lo_port;
            }
            else if (this.us_port && this.us_port > 0) {
                this.lo_port = this.us_port;
            }
            else if (this.port && this.port > 0) {
                this.lo_port = this.port;
            }
        }
        var sad = serverInfo.sad;
        if (sad) {
            var tempArray = sad.split(".");
            if (tempArray && tempArray.length < 2) {
                //加密
                var host = Global.AESUtil.aesDecrptHost(sad);
                if (host) {
                    this.host = host;
                }
            }
            else {
                this.host = sad.trim();
            }
        }
        else {
            this.host = this.realHost;
        }
        if (serverInfo.param) {
            this.param = serverInfo.param;
        }
        if (serverInfo.url_type) {
            this.url_type = serverInfo.url_type;
        }
    };
    ServerRouteInfo.prototype.getPbSocketUrl = function (mod) {
        var serverUrl = this.getSocketUrl();
        var infos = mod.split(".");
        var suffix = "";
        for (var i = 0; i < infos.length; i++) {
            suffix = suffix + infos[i] + "/";
        }
        serverUrl.suffix = serverUrl.suffix + suffix;
        return serverUrl;
    };
    ServerRouteInfo.prototype.getHttpUrlWithMod = function (mod) {
        var serverUrl = this.getHttpUrl();
        var infos = mod.split(".");
        var suffix = "";
        for (var i = 0; i < infos.length; i++) {
            suffix = suffix + infos[i] + "/";
        }
        serverUrl.suffix = serverUrl.suffix + suffix;
        return serverUrl;
    };
    ServerRouteInfo.prototype.getSocketUrl = function () {
        var url = "";
        var serverUrl = this.getServerUrl();
        if (this.lo_type > 1 && this.checkIsDunOK(this.realHost, this.lo_port, this.lo_type, this.attr)) {
            Global.DNS.dealDunRoute(serverUrl, this.lo_port, this.lo_type);
            serverUrl.protocol = "ws";
        }
        else if (this.us_port != null && this.us_port != 0) {
            serverUrl.protocol = "ws";
            Global.DNS.dealSelfRoute(serverUrl);
            Global.UrlUtil.dealServerUrl(serverUrl, this.us_port);
        }
        else if (this.port != null && this.port != 0) {
            serverUrl.protocol = "wss";
            Global.DNS.dealSelfRoute(serverUrl);
            Global.UrlUtil.dealServerUrl(serverUrl, this.port);
        }
        else {
            Logger.error("Game Routes 配置错误");
        }
        var paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex();
        serverUrl.suffix = "/dict/" + paramPrefix;
        return serverUrl;
    };
    ServerRouteInfo.prototype.getHttpUrl = function () {
        var serverUrl = this.getUrl();
        if (this.url_type == 1) {
            if (this.param) {
                var paramPrefix = this.param;
                serverUrl.suffix = paramPrefix;
            }
        }
        else {
            var paramPrefix = Global.UrlUtil.getUrlParamCommonPrefex();
            serverUrl.suffix = "/mini/" + paramPrefix;
        }
        return serverUrl;
    };
    ServerRouteInfo.prototype.getUrl = function () {
        var serverUrl = this.getServerUrl();
        if (this.lo_type > 1 && this.checkIsDunOK(this.realHost, this.lo_port, this.lo_type, this.attr)) {
            Global.DNS.dealDunRoute(serverUrl, this.lo_port, this.lo_type);
            // if (this.port != null && this.port != 0){
            //     serverUrl.protocol = "https"
            //     let hosts = [this.realHost]
            //     Global.NativeEvent.setWhiteHosts(JSON.stringify(hosts))
            // }else {
            //     serverUrl.protocol = "http"
            // }
            serverUrl.protocol = "http";
        }
        else if (this.port != null && this.port != 0) {
            serverUrl.protocol = "https";
            Global.DNS.dealSelfRoute(serverUrl);
            Global.UrlUtil.dealServerUrl(serverUrl, this.port);
        }
        else if (this.us_port != null && this.us_port != 0) {
            serverUrl.protocol = "http";
            Global.DNS.dealSelfRoute(serverUrl);
            Global.UrlUtil.dealServerUrl(serverUrl, this.us_port);
        }
        else {
            serverUrl.protocol = "https";
            Global.DNS.dealSelfRoute(serverUrl);
            Global.UrlUtil.dealServerUrl(serverUrl, this.port);
        }
        return serverUrl;
    };
    ServerRouteInfo.prototype.checkIsDunOK = function (host, lo_port, lo_type, attr) {
        // Logger.error("----checkIsDunOk ----lo_port " + lo_port)
        // Logger.error("----checkIsDunOk ----lo_type " + lo_type)
        // Logger.error("----checkIsDunOk ----host " + host)
        var isSupport = Global.AppDun.checkAppIsSupportDunByType(lo_type);
        if (isSupport) {
            var isDunInit = Global.AppDun.getDunIsInitByType(lo_type);
            var ipPortInfo = Global.AppDun.getServerIPAndPort(host, lo_port, lo_type, attr);
            if (lo_port != null && lo_port != 0 && lo_type && isDunInit && ipPortInfo && ipPortInfo.port) {
                return true;
            }
            else {
                Logger.error("lo_port lo_type  isDunInit ipPortInfo ipPortInfo.port  is null");
            }
        }
        else {
            Logger.error("checkAppIsSupportDunByType lo_type isSupport false", lo_type);
        }
        return false;
    };
    //盾是否初始化成功
    ServerRouteInfo.prototype.checkSelfIsOK = function () {
        if (this.lo_port && this.lo_type && this.host && (this.lo_type > 1)) {
            var isOk = this.checkIsDunOK(this.host, this.lo_port, this.lo_type, this.attr);
            Logger.error("checkSelfIsOk " + isOk + " host = " + this.host + " lo_port = " + this.lo_port + " lo_type = " + this.lo_type);
            return isOk;
        }
        return true;
    };
    ServerRouteInfo.prototype.checkSelfIsSupport = function () {
        var isSupport = false;
        if (this.lo_type) {
            if (this.lo_type == 1) {
                isSupport = this.checkSelfIsSupportCer();
            }
            else {
                isSupport = Global.AppDun.checkAppIsSupportDunByType(this.lo_type);
            }
            Logger.error("checkRouteIsSupport isSupport " + isSupport);
            return isSupport;
        }
        return true;
    };
    ServerRouteInfo.prototype.checkSelfIsSupportCer = function () {
        if (!this.lo_type || !this.host) {
            return false;
        }
        if (this.lo_type != 1) {
            return false;
        }
        var isSupportCer = false;
        var cerDirFiles = Global.Setting.SystemInfo.cerDirFiles;
        if (cerDirFiles && cerDirFiles.length > 0) {
            for (var i = 0; i < cerDirFiles.length; i++) {
                var fileFullName = cerDirFiles[i];
                if (fileFullName && (fileFullName.indexOf(".cer") > -1) || fileFullName.indexOf(".crt") > -1) {
                    var tempArray = fileFullName.split("/");
                    var lastFileName = tempArray[tempArray.length - 1];
                    var fileName = lastFileName.replace(".cer", "");
                    var addressHost = this.host.toLowerCase();
                    if (fileName) {
                        if (addressHost.indexOf(fileName.toLowerCase()) > -1) {
                            isSupportCer = true;
                            Logger.log("checkSelfIsSupportCer addressHost " + addressHost + "  contain cer host " + fileName);
                            break;
                        }
                        else {
                            // Logger.log("checkSelfIsSupportCer addressHost " + addressHost + " not contain cer host " + fileName)
                        }
                    }
                }
            }
        }
        else {
            Logger.log("checkSelfIsSupportCer cerDirFiles has no file");
        }
        return isSupportCer;
    };
    return ServerRouteInfo;
}());
exports.ServerRouteInfo = ServerRouteInfo;
var ServerUrl = /** @class */ (function () {
    function ServerUrl() {
        this._protocol = "";
        this._address = "";
        this._address_host = "";
        this._real_host = "";
        this._port = 0;
        this._suffix = "";
        this._isEncrptUrl = false;
        this._isEncrptParam = false;
        this._isHostNameVerfy = false;
        this._cerName = "";
        this._cerPath = "";
        this._lo_type = 0; //线路类型
        this._isInnerRequest = true; //是否内部游戏请求链接
        this._attr = null; //线路的额外参数
        this._parm = ""; //主页线路额外路径参数
        this._url_type = 0; //线路类型 0 常规请求线路 1下载资源线路
    }
    ServerUrl.prototype.copyValue = function (serverUrl) {
        this._protocol = serverUrl._protocol;
        this._address = serverUrl._address;
        this._address_host = serverUrl._address_host;
        this._real_host = serverUrl._real_host;
        this._port = serverUrl._port;
        this._suffix = serverUrl._suffix;
    };
    ServerUrl.prototype.parse = function (url) {
        if (!url) {
            Logger.error("ServerUrl parse url = null ");
            return;
        }
        if (url.startsWith("https")) {
            this._protocol = "https";
        }
        else if (url.startsWith("http")) {
            this._protocol = "http";
        }
        else if (url.startsWith("wss")) {
            this._protocol = "wss";
        }
        else if (url.startsWith("ws")) {
            this._protocol = "ws";
        }
        var arrs = url.split("//");
        var tmpUrl = url;
        if (arrs.length > 1)
            tmpUrl = arrs[1];
        arrs = tmpUrl.split("/");
        var host = arrs[0];
        if (host.indexOf(":") > -1) {
            this._address = host.split(":")[0];
            var port = host.split(":")[1];
            if (port && Number(port)) {
                this._port = Number(port);
            }
        }
        else {
            this._address = host;
        }
        this._address_host = this._address;
        this._real_host = this._address;
        Global.DNS.dealSelfRoute(this);
        Global.UrlUtil.setRouteUrlCer(this);
        if (arrs.length > 1) {
            for (var i = 1; i < arrs.length; i++) {
                this._suffix = this._suffix + "/" + arrs[i];
            }
        }
    };
    ServerUrl.prototype.getUrl = function () {
        var url = "";
        var protocol = this._protocol;
        var address = this._address;
        var addressHost = this._address_host;
        var realHost = this._real_host;
        var port = this._port ? ":" + this._port : "";
        var suffix = this._suffix;
        if (protocol == "ws" || protocol == "wss") {
            if (this._address && this._address_host) {
                if (this._address != this._address_host) {
                    //ws wss不支持自签名证书
                    if (this.cerPath) {
                        if (address == realHost) {
                            if (addressHost != realHost) {
                                url = protocol + "://" + address + "..." + addressHost + port + suffix;
                            }
                            else {
                                url = protocol + "://" + address + port + suffix;
                            }
                        }
                        else {
                            url = protocol + "://" + address + "..." + realHost + port + suffix;
                        }
                    }
                    else {
                        url = protocol + "://" + address + "..." + addressHost + port + suffix;
                    }
                }
                else {
                    url = protocol + "://" + address + port + suffix;
                }
            }
            else {
                url = protocol + "://" + address + port + suffix;
            }
        }
        else {
            url = protocol + "://" + address + port + suffix;
        }
        if (this.url_type != 1) {
            //https wss新增 p=s参数
            if (url.startsWith("https") || url.startsWith("wss")) {
                if (url.endsWith("?")) {
                    url = url + "p=s";
                }
                else {
                    url = url + "&p=s";
                }
            }
        }
        else {
            if (this.checkAddress(address)) {
                url = address + port + suffix;
            }
        }
        return url;
    };
    ServerUrl.prototype.printSelf = function () {
        var printStr = "protocol = " + this._protocol + " address = " + this._address + " port = " + this._port + " addressHost = " + this._address_host + " realHost = " + this._real_host + " attr = " + (this._attr ? JSON.stringify(this._attr) : "null");
        return printStr;
    };
    ServerUrl.prototype.checkAddress = function (address) {
        return address && address.startsWith("http");
    };
    Object.defineProperty(ServerUrl.prototype, "protocol", {
        get: function () {
            return this._protocol;
        },
        set: function (value) {
            this._protocol = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerUrl.prototype, "address", {
        get: function () {
            return this._address;
        },
        set: function (value) {
            this._address = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerUrl.prototype, "addressHost", {
        get: function () {
            return this._address_host;
        },
        set: function (value) {
            this._address_host = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerUrl.prototype, "realHost", {
        get: function () {
            return this._real_host;
        },
        set: function (value) {
            this._real_host = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerUrl.prototype, "port", {
        get: function () {
            return this._port;
        },
        set: function (value) {
            this._port = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerUrl.prototype, "suffix", {
        get: function () {
            return this._suffix;
        },
        set: function (value) {
            this._suffix = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerUrl.prototype, "lo_type", {
        get: function () {
            return this._lo_type;
        },
        set: function (value) {
            this._lo_type = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerUrl.prototype, "isEncrptUrl", {
        get: function () {
            return this._isEncrptUrl;
        },
        set: function (value) {
            this._isEncrptUrl = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerUrl.prototype, "isEncrptParam", {
        get: function () {
            if (this._protocol == "https" || this._protocol == "wss") {
                this._isEncrptParam = false;
            }
            else {
                this._isEncrptParam = true;
            }
            return this._isEncrptParam;
        },
        set: function (value) {
            this._isEncrptParam = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerUrl.prototype, "isHostNameVerfy", {
        get: function () {
            return this._isHostNameVerfy;
        },
        set: function (value) {
            this._isHostNameVerfy = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerUrl.prototype, "cerName", {
        get: function () {
            return this._cerName;
        },
        set: function (value) {
            this._cerName = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerUrl.prototype, "cerPath", {
        get: function () {
            return this._cerPath;
        },
        set: function (value) {
            this._cerPath = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerUrl.prototype, "isInnerRequest", {
        get: function () {
            return this._isInnerRequest;
        },
        set: function (value) {
            this._isInnerRequest = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerUrl.prototype, "attr", {
        get: function () {
            return this._attr;
        },
        set: function (value) {
            this._attr = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerUrl.prototype, "param", {
        get: function () {
            return this._parm;
        },
        set: function (value) {
            this._parm = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ServerUrl.prototype, "url_type", {
        get: function () {
            return this._url_type;
        },
        set: function (value) {
            this._url_type = value;
        },
        enumerable: false,
        configurable: true
    });
    return ServerUrl;
}());
exports.ServerUrl = ServerUrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHNldHRpbmdcXFNlcnZlclJvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtJQUFBO1FBQ1csbUJBQWMsR0FBRyxFQUFFLENBQUE7UUFDbkIsYUFBUSxHQUFHLENBQUMsQ0FBQztJQXVPeEIsQ0FBQztJQXRPVSw0QkFBSyxHQUFaLFVBQWEsTUFBTTtRQUNmLElBQUksTUFBTSxJQUFJLElBQUk7WUFDZCxPQUFPO1FBQ1gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxTQUFTO1lBQ2IsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3pCLGFBQWE7WUFDYixJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6RCxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDdkUsMEZBQTBGO2dCQUMxRixJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDM0MsSUFBSSxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFBO29CQUMzQyxLQUFLLElBQUksR0FBQyxHQUFHLENBQUMsRUFBRSxHQUFDLEdBQUcsZ0JBQWdCLEVBQUUsR0FBQyxFQUFFLEVBQUU7d0JBQ3ZDLElBQUksV0FBVyxHQUFHLGFBQWEsQ0FBQyxHQUFDLENBQUMsQ0FBQTt3QkFDbEMsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8s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Q0FBQyxLQUFLLENBQUE7UUFDckIsQ0FBQzthQUNELFVBQWlCLEtBQUs7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQzs7O09BSEE7SUFJRCxzQkFBVywrQkFBUTthQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDO2FBQ0QsVUFBb0IsS0FBSztZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQTtRQUMxQixDQUFDOzs7T0FIQTtJQUtMLGdCQUFDO0FBQUQsQ0FqUkEsQUFpUkMsSUFBQTtBQWpSWSw4QkFBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2ZXJSb3V0ZXMge1xyXG4gICAgcHVibGljIHNlcnZlckluZm9MaXN0ID0gW11cclxuICAgIHB1YmxpYyBjdXJJbmRleCA9IDA7XHJcbiAgICBwdWJsaWMgcGFyc2Uocm91dGVzKSB7XHJcbiAgICAgICAgaWYgKHJvdXRlcyA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrUm91dGVWYWxpZChyb3V0ZXNbaV0pKVxyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIGxldCByb3V0ZUluZm8gPSByb3V0ZXNbaV1cclxuICAgICAgICAgICAgLy/mo4DmtYtyb3V0ZeaYr+WQpuWQiOazlVxyXG4gICAgICAgICAgICBpZiAoR2xvYmFsLlVybFV0aWwuY2hlY2tJc011dGlMaW5lc1NhbWVIb3N0KHJvdXRlSW5mby5ob3N0KSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpbmVBZGRyZXNzZXMgPSBHbG9iYWwuVXJsVXRpbC5nZXRNdXRpTGluZXNTYW1lSG9zdChyb3V0ZUluZm8uaG9zdClcclxuICAgICAgICAgICAgICAgIC8vIExvZ2dlci5lcnJvcihcImNoZWNrSXNNdXRpTGluZXNTYW1lSG9zdCBsaW5lQWRkcmVzc2VzIFwiICsgSlNPTi5zdHJpbmdpZnkobGluZUFkZHJlc3NlcykpXHJcbiAgICAgICAgICAgICAgICBpZiAobGluZUFkZHJlc3NlcyAmJiBsaW5lQWRkcmVzc2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGluZUFkZHJlc3Nlc0xlbiA9IGxpbmVBZGRyZXNzZXMubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lQWRkcmVzc2VzTGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmVBZGRyZXNzID0gbGluZUFkZHJlc3Nlc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3TGluZVJvdXRlSW5mbyA9IEdsb2JhbC5KU1V0aWwuY29weU9iaihyb3V0ZUluZm8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0xpbmVSb3V0ZUluZm8uaG9zdCA9IGxpbmVBZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZXJ2ZXJJbmZvID0gbmV3IFNlcnZlclJvdXRlSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJJbmZvLnBhcnNlKG5ld0xpbmVSb3V0ZUluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmVySW5mby5jaGVja1NlbGZJc1N1cHBvcnQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXJJbmZvTGlzdC5wdXNoKHNlcnZlckluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiY2hlY2tJc011dGlMaW5lc1NhbWVIb3N0IHRoaXMuc2VydmVySW5mb0xpc3QgXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnNlcnZlckluZm9MaXN0KSlcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2VydmVySW5mbyA9IG5ldyBTZXJ2ZXJSb3V0ZUluZm8oKTtcclxuICAgICAgICAgICAgICAgIHNlcnZlckluZm8ucGFyc2Uocm91dGVzW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZXJ2ZXJJbmZvLmNoZWNrU2VsZklzU3VwcG9ydCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXJJbmZvTGlzdC5wdXNoKHNlcnZlckluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFuUm91dGVzKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNlcnZlckluZm9MaXN0ID0gW11cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8v5paw5aKed3Nwb3J0ICDlvZPphY3nva53c3BvcnTlkI4g5aSn5Y6F5Y+v5Lul55u05o6l5L2/55So55m75b2V55qE5Z+f5ZCNK3dzcG9ydOS9nOS4uua4uOaIj+acjeWKoeWZqOWcsOWdgFxyXG4gICAgcHVibGljIHBhcnNlV3Mocm91dGVzKSB7XHJcbiAgICAgICAgaWYgKHJvdXRlcyA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrV3NSb3V0ZVZhbGlkKHJvdXRlc1tpXSkpXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgLy/mo4DmtYtyb3V0ZeaYr+WQpuWQiOazlVxyXG4gICAgICAgICAgICBsZXQgc2VydmVySW5mbyA9IG5ldyBTZXJ2ZXJSb3V0ZUluZm8oKTtcclxuICAgICAgICAgICAgc2VydmVySW5mby5wYXJzZVdzKHJvdXRlc1tpXSk7XHJcbiAgICAgICAgICAgIC8v5qOA5rWL5b2T5YmNcm91dGXmmK/lkKbmlK/mjIFcclxuICAgICAgICAgICAgaWYgKHNlcnZlckluZm8uY2hlY2tTZWxmSXNTdXBwb3J0KCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VydmVySW5mb0xpc3QucHVzaChzZXJ2ZXJJbmZvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1JvdXRlVmFsaWQocm91dGVJbmZvKSB7XHJcbiAgICAgICAgcmV0dXJuIHJvdXRlSW5mby5ob3N0ICE9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1dzUm91dGVWYWxpZChyb3V0ZUluZm8pIHtcclxuICAgICAgICByZXR1cm4gcm91dGVJbmZvLmhvc3QgIT0gbnVsbCAmJiByb3V0ZUluZm8ud3Nwb3J0ICE9IG51bGwgJiYgcm91dGVJbmZvLndzcG9ydCAhPSBcIlwiICYmIHJvdXRlSW5mby53c3BvcnQgIT0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvL+i/lOWbnumaj+acunJvdXRlXHJcbiAgICBwdWJsaWMgZ2V0UmFuZFJvdXRlKCkge1xyXG4gICAgICAgIC8vIGlmKHRoaXMuc2VydmVySW5mb0xpc3QubGVuZ3RoID09IDApXHJcbiAgICAgICAgLy8gICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIC8vIGxldCBsZW4gPSB0aGlzLnNlcnZlckluZm9MaXN0Lmxlbmd0aDtcclxuICAgICAgICAvLyBsZXQgcmFuZEluZGV4ID0gR2xvYmFsLlRvb2xraXQuZ2V0Um91bmRJbnRlZ2VyKGxlbiwgMClcclxuICAgICAgICAvLyBsZXQgcm91dGVJbmZvID0gdGhpcy5zZXJ2ZXJJbmZvTGlzdFtyYW5kSW5kZXhdO1xyXG4gICAgICAgIC8vIHRoaXMuY3VySW5kZXggPSByYW5kSW5kZXg7XHJcbiAgICAgICAgLy8gcmV0dXJuIHJvdXRlSW5mbztcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDdXJSb3V0ZSgpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFJvdXRlQXJyKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICBsZXQgYXJyID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlcnZlckluZm9MaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBhcnIucHVzaCh0aGlzLnNlcnZlckluZm9MaXN0W2ldLmhvc3QpO1xyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFJvdXRlTGVuKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlcnZlckluZm9MaXN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZlckluZm9MaXN0Lmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZVRvQW5vdGhlclJvdXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlcnZlckluZm9MaXN0Lmxlbmd0aCA8IDEpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmN1ckluZGV4ID0gKHRoaXMuY3VySW5kZXggKyAxKSAlIHRoaXMuc2VydmVySW5mb0xpc3QubGVuZ3RoO1xyXG4gICAgICAgIC8vIExvZ2dlci5lcnJvcihcImNoYW5nZVRvQW5vdGhlclJvdXRlIGN1ckluZGV4ID0gXCIgKyB0aGlzLmN1ckluZGV4KVxyXG4gICAgICAgIC8vIExvZ2dlci5lcnJvcihcImNoYW5nZVRvQW5vdGhlclJvdXRlIGN1ckluZGV4IHJvdXRlID0gXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnNlcnZlckluZm9MaXN0W3RoaXMuY3VySW5kZXhdKSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/liIfmjaLliLDkuIvkuIDkuKpyb3V0ZVxyXG4gICAgcHVibGljIGdldEFub3RoZXJSb3V0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5zZXJ2ZXJJbmZvTGlzdC5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VydmVySW5mb0xpc3QubGVuZ3RoID09IDEpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlcnZlckluZm9MaXN0WzBdO1xyXG4gICAgICAgIHRoaXMuY3VySW5kZXggPSAodGhpcy5jdXJJbmRleCArIDEpICUgdGhpcy5zZXJ2ZXJJbmZvTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVySW5mb0xpc3RbdGhpcy5jdXJJbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgLy/ov5Tlm57lvZPliY1yb3V0ZVxyXG4gICAgcHVibGljIGdldEN1clJvdXRlKCk6IFNlcnZlclJvdXRlSW5mbyB7XHJcbiAgICAgICAgbGV0IGN1clJvdXRlID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5zZXJ2ZXJJbmZvTGlzdFt0aGlzLmN1ckluZGV4XSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGN1clJvdXRlID0gdGhpcy5zZXJ2ZXJJbmZvTGlzdFt0aGlzLmN1ckluZGV4XTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJjdXIgcm91dGUgaXMgbnVsbCAhISFcIik7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZXJ2ZXJJbmZvTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VydmVySW5mb0xpc3RbaV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VySW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1clJvdXRlID0gdGhpcy5zZXJ2ZXJJbmZvTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/liqDkuobnm77vvIzmnInlj6/og73lvZPliY3ov5jmsqHliJ3lp4vljJbmiJDlip8s5omL5Yqo5YiH5o2i5LiA5qyh57q/6LevXHJcbiAgICAgICAgaWYgKGN1clJvdXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChjdXJSb3V0ZS5jaGVja1NlbGZJc09LKCkpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci53YXJuKFwiZ2V0Q3VyUm91dGUgY3VyUm91dGUgY2hlY2tTZWxmSXNPSyAhISFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VyUm91dGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJSb3V0ZSA9IHRoaXMuZ2V0Q2FuVXNlUm91dGUoKVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1clJvdXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLndhcm4oXCJnZXRDdXJSb3V0ZSBjdXJSb3V0ZSBnZXRDYW5Vc2VSb3V0ZSAhISFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1clJvdXRlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImdldEN1clJvdXRlIGdldENhblVzZVJvdXRlIGlzIG51bGwgISEhXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImdldEN1clJvdXRlIGN1clJvdXRlIGlzIG51bGwgISEhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+Wvuee6v+i3r+aOkuW6jyzmiJDlip/nmoTkvJjlhYjmjpLlnKjmnIDlhYhcclxuICAgIHB1YmxpYyBzb3J0Um91dGVzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmN1ckluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiZG9uJ3QgaGF2ZSB0byBzb3J0IHJvdXRlc1wiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNlcnZlckluZm9MaXN0KSB7XHJcbiAgICAgICAgICAgIGxldCBjdXJTZXJ2ZXJSb3V0ZSA9IHRoaXMuc2VydmVySW5mb0xpc3RbdGhpcy5jdXJJbmRleF1cclxuICAgICAgICAgICAgbGV0IG5ld1JvdXRlcyA9IFtjdXJTZXJ2ZXJSb3V0ZV0uY29uY2F0KHRoaXMuc2VydmVySW5mb0xpc3QuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9IGN1clNlcnZlclJvdXRlKSlcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJJbmZvTGlzdCA9IG5ld1JvdXRlc1xyXG4gICAgICAgICAgICB0aGlzLmN1ckluZGV4ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzb3J0Um91dGVzQnlJbmRleChpbmRleCkge1xyXG4gICAgICAgIGlmIChpbmRleCA9PSBudWxsIHx8IGluZGV4ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmN1ckluZGV4ID09IGluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2VydmVySW5mb0xpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGN1clNlcnZlclJvdXRlID0gdGhpcy5zZXJ2ZXJJbmZvTGlzdFtpbmRleF1cclxuICAgICAgICAgICAgaWYgKGN1clNlcnZlclJvdXRlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3Um91dGVzID0gW2N1clNlcnZlclJvdXRlXS5jb25jYXQodGhpcy5zZXJ2ZXJJbmZvTGlzdC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT0gY3VyU2VydmVyUm91dGUpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXJJbmZvTGlzdCA9IG5ld1JvdXRlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Um91dGVCeUluZGV4KGluZGV4KSB7XHJcbiAgICAgICAgaWYgKGluZGV4ID09IG51bGwgfHwgaW5kZXggPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2VydmVySW5mb0xpc3QpIHtcclxuICAgICAgICAgICAgbGV0IGN1clNlcnZlclJvdXRlID0gdGhpcy5zZXJ2ZXJJbmZvTGlzdFtpbmRleF1cclxuICAgICAgICAgICAgcmV0dXJuIGN1clNlcnZlclJvdXRlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5ou/5Yiw5b2T5YmN5Y+v55So55qE57q/6LevXHJcbiAgICBwdWJsaWMgZ2V0Q2FuVXNlUm91dGUoKSB7XHJcbiAgICAgICAgbGV0IGNhblVzZVJvdXRlID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5zZXJ2ZXJJbmZvTGlzdCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VydmVySW5mb0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCByb3V0ZSA9IHRoaXMuc2VydmVySW5mb0xpc3RbaV1cclxuICAgICAgICAgICAgICAgIGlmIChyb3V0ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvX3R5cGUgPSByb3V0ZS5sb190eXBlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvX3R5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvX3R5cGUgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm91dGUuY2hlY2tTZWxmSXNPSygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuVXNlUm91dGUgPSByb3V0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VySW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuVXNlUm91dGUgPSByb3V0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhblVzZVJvdXRlID0gcm91dGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2FuVXNlUm91dGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYW5Vc2VSb3V0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2VydmVyUm91dGVJbmZvIHtcclxuICAgIC8v5pyN5Yqh5Zmo5Zyw5Z2A5oiW5YGH5Z+f5ZCNXHJcbiAgICBwdWJsaWMgaG9zdDogc3RyaW5nO1xyXG4gICAgLy8gLy/mnI3liqHlmahpcOWcsOWdgFxyXG4gICAgLy8gcHVibGljIGlwOnN0cmluZztcclxuICAgIC8v5pyN5Yqh5Zmo56uv5Y+jXHJcbiAgICBwdWJsaWMgcG9ydDogbnVtYmVyID0gMDtcclxuICAgIC8vd3PmnI3liqHlmajnq6/lj6NcclxuICAgIHB1YmxpYyB1c19wb3J0OiBudW1iZXIgPSAwO1xyXG4gICAgLy/nm77pnIDopoHnmoTmnKzlnLDnq6/lj6NcclxuICAgIHB1YmxpYyBsb19wb3J0OiBudW1iZXIgPSAwO1xyXG4gICAgLy/nm77nsbvlnos6MDrkuI3lkK/nlKjnm74gMS7oh6rnrb7lkI3or4HkuaYgMi7kupHnm74gMy7mmbrlronnm75cclxuICAgIHB1YmxpYyBsb190eXBlOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8vaHR0cOivt+axguWcsOWdgCDnvJPlrZggIOS4jemcgOimgeavj+asoemDveaLvOaOpVxyXG4gICAgcHJpdmF0ZSB1cmw6IHN0cmluZztcclxuICAgIC8v55yf5a6e5Z+f5ZCN5oiWaXBcclxuICAgIHB1YmxpYyByZWFsSG9zdDogc3RyaW5nO1xyXG4gICAgLy/pmL/ph4zkupHmuLjmiI/nm77pnIDopoHlj4LmlbBcclxuICAgIHB1YmxpYyBhdHRyOiBhbnk7XHJcbiAgICAvL3dlYuS4u+mhtee6v+i3r+i3r+W+hFxyXG4gICAgcHVibGljIHBhcmFtOiBzdHJpbmc7XHJcbiAgICAvL+e6v+i3r+exu+WeiyAwIOW4uOinhOivt+axgue6v+i3ryAx5LiL6L296LWE5rqQ57q/6LevXHJcbiAgICBwdWJsaWMgdXJsX3R5cGUgPSAwO1xyXG4gICAgLy8gcHVibGljIGdyb3VwOnN0cmluZztcclxuICAgIC8vIHB1YmxpYyBkaXA6c3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBwYXJzZShzZXJ2ZXJJbmZvKSB7XHJcbiAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiU2VydmVyUm91dGVJbmZvIHBhcnNlIGhvc3QgPSBcIiArIHNlcnZlckluZm8uaG9zdClcclxuICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJTZXJ2ZXJSb3V0ZUluZm8gcGFyc2UgbG9fcG9ydCA9IFwiICsgc2VydmVySW5mby5sb19wb3J0KVxyXG4gICAgICAgIHRoaXMucmVhbEhvc3QgPSBzZXJ2ZXJJbmZvLmhvc3Q7XHJcbiAgICAgICAgdGhpcy5wb3J0ID0gc2VydmVySW5mby5wb3J0O1xyXG4gICAgICAgIHRoaXMudXNfcG9ydCA9IHNlcnZlckluZm8udXNfcG9ydDtcclxuICAgICAgICB0aGlzLmxvX3R5cGUgPSBzZXJ2ZXJJbmZvLmxvX3R5cGVcclxuICAgICAgICBsZXQgbG9fcG9ydCA9IHNlcnZlckluZm8ubG9fcG9ydFxyXG4gICAgICAgIHRoaXMubG9fcG9ydCA9IGxvX3BvcnQ7XHJcbiAgICAgICAgdGhpcy5hdHRyID0gc2VydmVySW5mby5hdHRyXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmxvX3R5cGUgJiYgdGhpcy5sb190eXBlID4gMSkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJTZXJ2ZXJSb3V0ZUluZm8gcGFyc2UgaW5pdER1blNESyBsb190eXBlID0gXCIgKyB0aGlzLmxvX3R5cGUpXHJcbiAgICAgICAgICAgIEdsb2JhbC5BcHBEdW4uaW5pdER1blNESyh0aGlzLmxvX3R5cGUpXHJcbiAgICAgICAgICAgIGlmIChsb19wb3J0ICYmIGxvX3BvcnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvX3BvcnQgPSBsb19wb3J0XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy51c19wb3J0ICYmIHRoaXMudXNfcG9ydCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9fcG9ydCA9IHRoaXMudXNfcG9ydFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucG9ydCAmJiB0aGlzLnBvcnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvX3BvcnQgPSB0aGlzLnBvcnRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2FkID0gc2VydmVySW5mby5zYWRcclxuICAgICAgICBpZiAoc2FkKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wQXJyYXkgPSBzYWQuc3BsaXQoXCIuXCIpXHJcbiAgICAgICAgICAgIGlmICh0ZW1wQXJyYXkgJiYgdGVtcEFycmF5Lmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIC8v5Yqg5a+GXHJcbiAgICAgICAgICAgICAgICBsZXQgaG9zdCA9IEdsb2JhbC5BRVNVdGlsLmFlc0RlY3JwdEhvc3Qoc2FkKVxyXG4gICAgICAgICAgICAgICAgaWYgKGhvc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhvc3QgPSBob3N0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3N0ID0gc2FkLnRyaW0oKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9zdCA9IHRoaXMucmVhbEhvc3RcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZXJ2ZXJJbmZvLnBhcmFtKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW0gPSBzZXJ2ZXJJbmZvLnBhcmFtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VydmVySW5mby51cmxfdHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLnVybF90eXBlID0gc2VydmVySW5mby51cmxfdHlwZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTZXJ2ZXJVcmwoKSB7XHJcbiAgICAgICAgbGV0IHNlcnZlclVybCA9IG5ldyBTZXJ2ZXJVcmwoKVxyXG4gICAgICAgIHNlcnZlclVybC5hZGRyZXNzSG9zdCA9IHRoaXMuaG9zdCA/IHRoaXMuaG9zdCA6IHRoaXMucmVhbEhvc3RcclxuICAgICAgICBzZXJ2ZXJVcmwucmVhbEhvc3QgPSB0aGlzLnJlYWxIb3N0ID8gdGhpcy5yZWFsSG9zdCA6IHRoaXMuaG9zdFxyXG4gICAgICAgIHNlcnZlclVybC5hZGRyZXNzID0gc2VydmVyVXJsLnJlYWxIb3N0XHJcbiAgICAgICAgc2VydmVyVXJsLmF0dHIgPSB0aGlzLmF0dHJcclxuICAgICAgICBzZXJ2ZXJVcmwubG9fdHlwZSA9IHRoaXMubG9fdHlwZVxyXG4gICAgICAgIHNlcnZlclVybC5wYXJhbSA9IHRoaXMucGFyYW07XHJcbiAgICAgICAgc2VydmVyVXJsLnVybF90eXBlID0gdGhpcy51cmxfdHlwZTtcclxuICAgICAgICAvL+aXp+eJiOacrOS4jeaUr+aMgeiHquetvuWQjeivgeS5plxyXG4gICAgICAgIGlmICh0aGlzLmxvX3R5cGUgPT0gMSkgeyAvL+iHquetvuWQjeivgeS5plxyXG4gICAgICAgICAgICBHbG9iYWwuVXJsVXRpbC5zZXRSb3V0ZVVybENlcihzZXJ2ZXJVcmwpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIm5vIHNlbGYgc2lnbmVkXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJ2ZXJVcmxcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGFyc2VXcyhzZXJ2ZXJJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5yZWFsSG9zdCA9IHNlcnZlckluZm8uaG9zdDtcclxuICAgICAgICB0aGlzLnBvcnQgPSBzZXJ2ZXJJbmZvLndzcG9ydDtcclxuICAgICAgICB0aGlzLnVzX3BvcnQgPSBzZXJ2ZXJJbmZvLnVzX3BvcnQ7XHJcbiAgICAgICAgdGhpcy5sb190eXBlID0gc2VydmVySW5mby5sb190eXBlO1xyXG4gICAgICAgIGxldCBsb19wb3J0ID0gc2VydmVySW5mby5sb19wb3J0XHJcbiAgICAgICAgdGhpcy5sb19wb3J0ID0gbG9fcG9ydDtcclxuICAgICAgICB0aGlzLmF0dHIgPSBzZXJ2ZXJJbmZvLmF0dHJcclxuICAgICAgICBpZiAodGhpcy5sb190eXBlICYmIHRoaXMubG9fdHlwZSA+IDEpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiU2VydmVyUm91dGVJbmZvIHBhcnNlIGluaXREdW5TREsgbG9fdHlwZSA9IFwiICsgdGhpcy5sb190eXBlKVxyXG4gICAgICAgICAgICBHbG9iYWwuQXBwRHVuLmluaXREdW5TREsodGhpcy5sb190eXBlKVxyXG4gICAgICAgICAgICBpZiAobG9fcG9ydCAmJiBsb19wb3J0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb19wb3J0ID0gbG9fcG9ydFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudXNfcG9ydCAmJiB0aGlzLnVzX3BvcnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvX3BvcnQgPSB0aGlzLnVzX3BvcnRcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBvcnQgJiYgdGhpcy5wb3J0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb19wb3J0ID0gdGhpcy5wb3J0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNhZCA9IHNlcnZlckluZm8uc2FkXHJcbiAgICAgICAgaWYgKHNhZCkge1xyXG4gICAgICAgICAgICBsZXQgdGVtcEFycmF5ID0gc2FkLnNwbGl0KFwiLlwiKVxyXG4gICAgICAgICAgICBpZiAodGVtcEFycmF5ICYmIHRlbXBBcnJheS5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WKoOWvhlxyXG4gICAgICAgICAgICAgICAgbGV0IGhvc3QgPSBHbG9iYWwuQUVTVXRpbC5hZXNEZWNycHRIb3N0KHNhZClcclxuICAgICAgICAgICAgICAgIGlmIChob3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3N0ID0gaG9zdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9zdCA9IHNhZC50cmltKClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhvc3QgPSB0aGlzLnJlYWxIb3N0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZXJ2ZXJJbmZvLnBhcmFtKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW0gPSBzZXJ2ZXJJbmZvLnBhcmFtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VydmVySW5mby51cmxfdHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLnVybF90eXBlID0gc2VydmVySW5mby51cmxfdHlwZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBiU29ja2V0VXJsKG1vZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNlcnZlclVybCA9IHRoaXMuZ2V0U29ja2V0VXJsKCk7XHJcbiAgICAgICAgbGV0IGluZm9zID0gbW9kLnNwbGl0KFwiLlwiKVxyXG4gICAgICAgIGxldCBzdWZmaXggPSBcIlwiXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmZvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzdWZmaXggPSBzdWZmaXggKyBpbmZvc1tpXSArIFwiL1wiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlcnZlclVybC5zdWZmaXggPSBzZXJ2ZXJVcmwuc3VmZml4ICsgc3VmZml4XHJcbiAgICAgICAgcmV0dXJuIHNlcnZlclVybFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRIdHRwVXJsV2l0aE1vZChtb2QpIHtcclxuICAgICAgICBsZXQgc2VydmVyVXJsID0gdGhpcy5nZXRIdHRwVXJsKCk7XHJcbiAgICAgICAgbGV0IGluZm9zID0gbW9kLnNwbGl0KFwiLlwiKVxyXG4gICAgICAgIGxldCBzdWZmaXggPSBcIlwiXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmZvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBzdWZmaXggPSBzdWZmaXggKyBpbmZvc1tpXSArIFwiL1wiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlcnZlclVybC5zdWZmaXggPSBzZXJ2ZXJVcmwuc3VmZml4ICsgc3VmZml4XHJcbiAgICAgICAgcmV0dXJuIHNlcnZlclVybFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTb2NrZXRVcmwoKSB7XHJcbiAgICAgICAgbGV0IHVybCA9IFwiXCI7XHJcbiAgICAgICAgbGV0IHNlcnZlclVybCA9IHRoaXMuZ2V0U2VydmVyVXJsKClcclxuICAgICAgICBpZiAodGhpcy5sb190eXBlID4gMSAmJiB0aGlzLmNoZWNrSXNEdW5PSyh0aGlzLnJlYWxIb3N0LCB0aGlzLmxvX3BvcnQsIHRoaXMubG9fdHlwZSwgdGhpcy5hdHRyKSkge1xyXG4gICAgICAgICAgICBHbG9iYWwuRE5TLmRlYWxEdW5Sb3V0ZShzZXJ2ZXJVcmwsIHRoaXMubG9fcG9ydCwgdGhpcy5sb190eXBlKVxyXG4gICAgICAgICAgICBzZXJ2ZXJVcmwucHJvdG9jb2wgPSBcIndzXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy51c19wb3J0ICE9IG51bGwgJiYgdGhpcy51c19wb3J0ICE9IDApIHtcclxuICAgICAgICAgICAgc2VydmVyVXJsLnByb3RvY29sID0gXCJ3c1wiXHJcbiAgICAgICAgICAgIEdsb2JhbC5ETlMuZGVhbFNlbGZSb3V0ZShzZXJ2ZXJVcmwpXHJcbiAgICAgICAgICAgIEdsb2JhbC5VcmxVdGlsLmRlYWxTZXJ2ZXJVcmwoc2VydmVyVXJsLCB0aGlzLnVzX3BvcnQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMucG9ydCAhPSBudWxsICYmIHRoaXMucG9ydCAhPSAwKSB7XHJcbiAgICAgICAgICAgIHNlcnZlclVybC5wcm90b2NvbCA9IFwid3NzXCJcclxuICAgICAgICAgICAgR2xvYmFsLkROUy5kZWFsU2VsZlJvdXRlKHNlcnZlclVybClcclxuICAgICAgICAgICAgR2xvYmFsLlVybFV0aWwuZGVhbFNlcnZlclVybChzZXJ2ZXJVcmwsIHRoaXMucG9ydClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJHYW1lIFJvdXRlcyDphY3nva7plJnor69cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwYXJhbVByZWZpeCA9IEdsb2JhbC5VcmxVdGlsLmdldFVybFBhcmFtQ29tbW9uUHJlZmV4KClcclxuICAgICAgICBzZXJ2ZXJVcmwuc3VmZml4ID0gXCIvZGljdC9cIiArIHBhcmFtUHJlZml4XHJcbiAgICAgICAgcmV0dXJuIHNlcnZlclVybDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SHR0cFVybCgpIHtcclxuICAgICAgICBsZXQgc2VydmVyVXJsID0gdGhpcy5nZXRVcmwoKVxyXG4gICAgICAgIGlmICh0aGlzLnVybF90eXBlID09IDEpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyYW0pIHtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJhbVByZWZpeCA9IHRoaXMucGFyYW1cclxuICAgICAgICAgICAgICAgIHNlcnZlclVybC5zdWZmaXggPSBwYXJhbVByZWZpeDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1QcmVmaXggPSBHbG9iYWwuVXJsVXRpbC5nZXRVcmxQYXJhbUNvbW1vblByZWZleCgpXHJcbiAgICAgICAgICAgIHNlcnZlclVybC5zdWZmaXggPSBcIi9taW5pL1wiICsgcGFyYW1QcmVmaXhcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2ZXJVcmxcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VXJsKCkge1xyXG4gICAgICAgIGxldCBzZXJ2ZXJVcmwgPSB0aGlzLmdldFNlcnZlclVybCgpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmxvX3R5cGUgPiAxICYmIHRoaXMuY2hlY2tJc0R1bk9LKHRoaXMucmVhbEhvc3QsIHRoaXMubG9fcG9ydCwgdGhpcy5sb190eXBlLCB0aGlzLmF0dHIpKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5ETlMuZGVhbER1blJvdXRlKHNlcnZlclVybCwgdGhpcy5sb19wb3J0LCB0aGlzLmxvX3R5cGUpXHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLnBvcnQgIT0gbnVsbCAmJiB0aGlzLnBvcnQgIT0gMCl7XHJcbiAgICAgICAgICAgIC8vICAgICBzZXJ2ZXJVcmwucHJvdG9jb2wgPSBcImh0dHBzXCJcclxuICAgICAgICAgICAgLy8gICAgIGxldCBob3N0cyA9IFt0aGlzLnJlYWxIb3N0XVxyXG4gICAgICAgICAgICAvLyAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LnNldFdoaXRlSG9zdHMoSlNPTi5zdHJpbmdpZnkoaG9zdHMpKVxyXG4gICAgICAgICAgICAvLyB9ZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICBzZXJ2ZXJVcmwucHJvdG9jb2wgPSBcImh0dHBcIlxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIHNlcnZlclVybC5wcm90b2NvbCA9IFwiaHR0cFwiXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBvcnQgIT0gbnVsbCAmJiB0aGlzLnBvcnQgIT0gMCkge1xyXG4gICAgICAgICAgICBzZXJ2ZXJVcmwucHJvdG9jb2wgPSBcImh0dHBzXCJcclxuICAgICAgICAgICAgR2xvYmFsLkROUy5kZWFsU2VsZlJvdXRlKHNlcnZlclVybClcclxuICAgICAgICAgICAgR2xvYmFsLlVybFV0aWwuZGVhbFNlcnZlclVybChzZXJ2ZXJVcmwsIHRoaXMucG9ydClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy51c19wb3J0ICE9IG51bGwgJiYgdGhpcy51c19wb3J0ICE9IDApIHtcclxuICAgICAgICAgICAgc2VydmVyVXJsLnByb3RvY29sID0gXCJodHRwXCJcclxuICAgICAgICAgICAgR2xvYmFsLkROUy5kZWFsU2VsZlJvdXRlKHNlcnZlclVybClcclxuICAgICAgICAgICAgR2xvYmFsLlVybFV0aWwuZGVhbFNlcnZlclVybChzZXJ2ZXJVcmwsIHRoaXMudXNfcG9ydClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNlcnZlclVybC5wcm90b2NvbCA9IFwiaHR0cHNcIlxyXG4gICAgICAgICAgICBHbG9iYWwuRE5TLmRlYWxTZWxmUm91dGUoc2VydmVyVXJsKVxyXG4gICAgICAgICAgICBHbG9iYWwuVXJsVXRpbC5kZWFsU2VydmVyVXJsKHNlcnZlclVybCwgdGhpcy5wb3J0KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VydmVyVXJsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tJc0R1bk9LKGhvc3Q6IHN0cmluZywgbG9fcG9ydDogbnVtYmVyLCBsb190eXBlOiBudW1iZXIsIGF0dHI6IGFueSkge1xyXG4gICAgICAgIC8vIExvZ2dlci5lcnJvcihcIi0tLS1jaGVja0lzRHVuT2sgLS0tLWxvX3BvcnQgXCIgKyBsb19wb3J0KVxyXG4gICAgICAgIC8vIExvZ2dlci5lcnJvcihcIi0tLS1jaGVja0lzRHVuT2sgLS0tLWxvX3R5cGUgXCIgKyBsb190eXBlKVxyXG4gICAgICAgIC8vIExvZ2dlci5lcnJvcihcIi0tLS1jaGVja0lzRHVuT2sgLS0tLWhvc3QgXCIgKyBob3N0KVxyXG4gICAgICAgIGxldCBpc1N1cHBvcnQgPSBHbG9iYWwuQXBwRHVuLmNoZWNrQXBwSXNTdXBwb3J0RHVuQnlUeXBlKGxvX3R5cGUpXHJcbiAgICAgICAgaWYgKGlzU3VwcG9ydCkge1xyXG4gICAgICAgICAgICBsZXQgaXNEdW5Jbml0ID0gR2xvYmFsLkFwcER1bi5nZXREdW5Jc0luaXRCeVR5cGUobG9fdHlwZSlcclxuICAgICAgICAgICAgbGV0IGlwUG9ydEluZm8gPSBHbG9iYWwuQXBwRHVuLmdldFNlcnZlcklQQW5kUG9ydChob3N0LCBsb19wb3J0LCBsb190eXBlLCBhdHRyKVxyXG4gICAgICAgICAgICBpZiAobG9fcG9ydCAhPSBudWxsICYmIGxvX3BvcnQgIT0gMCAmJiBsb190eXBlICYmIGlzRHVuSW5pdCAmJiBpcFBvcnRJbmZvICYmIGlwUG9ydEluZm8ucG9ydCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJsb19wb3J0IGxvX3R5cGUgIGlzRHVuSW5pdCBpcFBvcnRJbmZvIGlwUG9ydEluZm8ucG9ydCAgaXMgbnVsbFwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiY2hlY2tBcHBJc1N1cHBvcnREdW5CeVR5cGUgbG9fdHlwZSBpc1N1cHBvcnQgZmFsc2VcIiwgbG9fdHlwZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8v55u+5piv5ZCm5Yid5aeL5YyW5oiQ5YqfXHJcbiAgICBwdWJsaWMgY2hlY2tTZWxmSXNPSygpIHtcclxuICAgICAgICBpZiAodGhpcy5sb19wb3J0ICYmIHRoaXMubG9fdHlwZSAmJiB0aGlzLmhvc3QgJiYgKHRoaXMubG9fdHlwZSA+IDEpKSB7XHJcbiAgICAgICAgICAgIGxldCBpc09rID0gdGhpcy5jaGVja0lzRHVuT0sodGhpcy5ob3N0LCB0aGlzLmxvX3BvcnQsIHRoaXMubG9fdHlwZSwgdGhpcy5hdHRyKVxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJjaGVja1NlbGZJc09rIFwiICsgaXNPayArIFwiIGhvc3QgPSBcIiArIHRoaXMuaG9zdCArIFwiIGxvX3BvcnQgPSBcIiArIHRoaXMubG9fcG9ydCArIFwiIGxvX3R5cGUgPSBcIiArIHRoaXMubG9fdHlwZSlcclxuICAgICAgICAgICAgcmV0dXJuIGlzT2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja1NlbGZJc1N1cHBvcnQoKSB7XHJcbiAgICAgICAgbGV0IGlzU3VwcG9ydCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmxvX3R5cGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG9fdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpc1N1cHBvcnQgPSB0aGlzLmNoZWNrU2VsZklzU3VwcG9ydENlcigpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpc1N1cHBvcnQgPSBHbG9iYWwuQXBwRHVuLmNoZWNrQXBwSXNTdXBwb3J0RHVuQnlUeXBlKHRoaXMubG9fdHlwZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJjaGVja1JvdXRlSXNTdXBwb3J0IGlzU3VwcG9ydCBcIiArIGlzU3VwcG9ydClcclxuICAgICAgICAgICAgcmV0dXJuIGlzU3VwcG9ydDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrU2VsZklzU3VwcG9ydENlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMubG9fdHlwZSB8fCAhdGhpcy5ob3N0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubG9fdHlwZSAhPSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlzU3VwcG9ydENlciA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjZXJEaXJGaWxlcyA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uY2VyRGlyRmlsZXNcclxuICAgICAgICBpZiAoY2VyRGlyRmlsZXMgJiYgY2VyRGlyRmlsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNlckRpckZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlsZUZ1bGxOYW1lID0gY2VyRGlyRmlsZXNbaV1cclxuICAgICAgICAgICAgICAgIGlmIChmaWxlRnVsbE5hbWUgJiYgKGZpbGVGdWxsTmFtZS5pbmRleE9mKFwiLmNlclwiKSA+IC0xKSB8fCBmaWxlRnVsbE5hbWUuaW5kZXhPZihcIi5jcnRcIikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wQXJyYXkgPSBmaWxlRnVsbE5hbWUuc3BsaXQoXCIvXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhc3RGaWxlTmFtZSA9IHRlbXBBcnJheVt0ZW1wQXJyYXkubGVuZ3RoIC0gMV1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZU5hbWUgPSBsYXN0RmlsZU5hbWUucmVwbGFjZShcIi5jZXJcIiwgXCJcIilcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYWRkcmVzc0hvc3QgPSB0aGlzLmhvc3QudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWRkcmVzc0hvc3QuaW5kZXhPZihmaWxlTmFtZS50b0xvd2VyQ2FzZSgpKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1N1cHBvcnRDZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImNoZWNrU2VsZklzU3VwcG9ydENlciBhZGRyZXNzSG9zdCBcIiArIGFkZHJlc3NIb3N0ICsgXCIgIGNvbnRhaW4gY2VyIGhvc3QgXCIgKyBmaWxlTmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTG9nZ2VyLmxvZyhcImNoZWNrU2VsZklzU3VwcG9ydENlciBhZGRyZXNzSG9zdCBcIiArIGFkZHJlc3NIb3N0ICsgXCIgbm90IGNvbnRhaW4gY2VyIGhvc3QgXCIgKyBmaWxlTmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwiY2hlY2tTZWxmSXNTdXBwb3J0Q2VyIGNlckRpckZpbGVzIGhhcyBubyBmaWxlXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc1N1cHBvcnRDZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2VydmVyVXJsIHtcclxuICAgIHByaXZhdGUgX3Byb3RvY29sOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBfYWRkcmVzczogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX2FkZHJlc3NfaG9zdDogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX3JlYWxfaG9zdDogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX3BvcnQ6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9zdWZmaXg6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIF9pc0VuY3JwdFVybDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfaXNFbmNycHRQYXJhbTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgX2lzSG9zdE5hbWVWZXJmeTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfY2VyTmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX2NlclBhdGg6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIF9sb190eXBlOiBudW1iZXIgPSAwIC8v57q/6Lev57G75Z6LXHJcbiAgICBwcml2YXRlIF9pc0lubmVyUmVxdWVzdCA9IHRydWU7Ly/mmK/lkKblhoXpg6jmuLjmiI/or7fmsYLpk77mjqVcclxuICAgIHByaXZhdGUgX2F0dHI6IGFueSA9IG51bGw7IC8v57q/6Lev55qE6aKd5aSW5Y+C5pWwXHJcbiAgICBwcml2YXRlIF9wYXJtOiBzdHJpbmcgPSBcIlwiOy8v5Li76aG157q/6Lev6aKd5aSW6Lev5b6E5Y+C5pWwXHJcbiAgICBwcml2YXRlIF91cmxfdHlwZTogbnVtYmVyID0gMDsvL+e6v+i3r+exu+WeiyAwIOW4uOinhOivt+axgue6v+i3ryAx5LiL6L296LWE5rqQ57q/6LevXHJcblxyXG4gICAgcHVibGljIGNvcHlWYWx1ZShzZXJ2ZXJVcmw6IFNlcnZlclVybCkge1xyXG4gICAgICAgIHRoaXMuX3Byb3RvY29sID0gc2VydmVyVXJsLl9wcm90b2NvbFxyXG4gICAgICAgIHRoaXMuX2FkZHJlc3MgPSBzZXJ2ZXJVcmwuX2FkZHJlc3NcclxuICAgICAgICB0aGlzLl9hZGRyZXNzX2hvc3QgPSBzZXJ2ZXJVcmwuX2FkZHJlc3NfaG9zdFxyXG4gICAgICAgIHRoaXMuX3JlYWxfaG9zdCA9IHNlcnZlclVybC5fcmVhbF9ob3N0XHJcbiAgICAgICAgdGhpcy5fcG9ydCA9IHNlcnZlclVybC5fcG9ydFxyXG4gICAgICAgIHRoaXMuX3N1ZmZpeCA9IHNlcnZlclVybC5fc3VmZml4XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBhcnNlKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF1cmwpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiU2VydmVyVXJsIHBhcnNlIHVybCA9IG51bGwgXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVybC5zdGFydHNXaXRoKFwiaHR0cHNcIikpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJvdG9jb2wgPSBcImh0dHBzXCJcclxuICAgICAgICB9IGVsc2UgaWYgKHVybC5zdGFydHNXaXRoKFwiaHR0cFwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wcm90b2NvbCA9IFwiaHR0cFwiXHJcbiAgICAgICAgfSBlbHNlIGlmICh1cmwuc3RhcnRzV2l0aChcIndzc1wiKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wcm90b2NvbCA9IFwid3NzXCJcclxuICAgICAgICB9IGVsc2UgaWYgKHVybC5zdGFydHNXaXRoKFwid3NcIikpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJvdG9jb2wgPSBcIndzXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFycnMgPSB1cmwuc3BsaXQoXCIvL1wiKTtcclxuICAgICAgICBsZXQgdG1wVXJsID0gdXJsO1xyXG4gICAgICAgIGlmIChhcnJzLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgIHRtcFVybCA9IGFycnNbMV07XHJcbiAgICAgICAgYXJycyA9IHRtcFVybC5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgbGV0IGhvc3QgPSBhcnJzWzBdO1xyXG4gICAgICAgIGlmIChob3N0LmluZGV4T2YoXCI6XCIpID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fYWRkcmVzcyA9IGhvc3Quc3BsaXQoXCI6XCIpWzBdO1xyXG4gICAgICAgICAgICBsZXQgcG9ydCA9IGhvc3Quc3BsaXQoXCI6XCIpWzFdO1xyXG4gICAgICAgICAgICBpZiAocG9ydCAmJiBOdW1iZXIocG9ydCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BvcnQgPSBOdW1iZXIocG9ydClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FkZHJlc3MgPSBob3N0XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9hZGRyZXNzX2hvc3QgPSB0aGlzLl9hZGRyZXNzXHJcbiAgICAgICAgdGhpcy5fcmVhbF9ob3N0ID0gdGhpcy5fYWRkcmVzc1xyXG5cclxuICAgICAgICBHbG9iYWwuRE5TLmRlYWxTZWxmUm91dGUodGhpcylcclxuICAgICAgICBHbG9iYWwuVXJsVXRpbC5zZXRSb3V0ZVVybENlcih0aGlzKVxyXG4gICAgICAgIGlmIChhcnJzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcnJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWZmaXggPSB0aGlzLl9zdWZmaXggKyBcIi9cIiArIGFycnNbaV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVcmwoKSB7XHJcbiAgICAgICAgbGV0IHVybCA9IFwiXCI7XHJcbiAgICAgICAgbGV0IHByb3RvY29sID0gdGhpcy5fcHJvdG9jb2xcclxuICAgICAgICBsZXQgYWRkcmVzcyA9IHRoaXMuX2FkZHJlc3NcclxuICAgICAgICBsZXQgYWRkcmVzc0hvc3QgPSB0aGlzLl9hZGRyZXNzX2hvc3RcclxuICAgICAgICBsZXQgcmVhbEhvc3QgPSB0aGlzLl9yZWFsX2hvc3RcclxuICAgICAgICBsZXQgcG9ydCA9IHRoaXMuX3BvcnQgPyBcIjpcIiArIHRoaXMuX3BvcnQgOiBcIlwiO1xyXG4gICAgICAgIGxldCBzdWZmaXggPSB0aGlzLl9zdWZmaXhcclxuXHJcbiAgICAgICAgaWYgKHByb3RvY29sID09IFwid3NcIiB8fCBwcm90b2NvbCA9PSBcIndzc1wiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hZGRyZXNzICYmIHRoaXMuX2FkZHJlc3NfaG9zdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FkZHJlc3MgIT0gdGhpcy5fYWRkcmVzc19ob3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy93cyB3c3PkuI3mlK/mjIHoh6rnrb7lkI3or4HkuaZcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jZXJQYXRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZGRyZXNzID09IHJlYWxIb3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWRkcmVzc0hvc3QgIT0gcmVhbEhvc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBwcm90b2NvbCArIFwiOi8vXCIgKyBhZGRyZXNzICsgXCIuLi5cIiArIGFkZHJlc3NIb3N0ICsgcG9ydCArIHN1ZmZpeFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBwcm90b2NvbCArIFwiOi8vXCIgKyBhZGRyZXNzICsgcG9ydCArIHN1ZmZpeFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCA9IHByb3RvY29sICsgXCI6Ly9cIiArIGFkZHJlc3MgKyBcIi4uLlwiICsgcmVhbEhvc3QgKyBwb3J0ICsgc3VmZml4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBwcm90b2NvbCArIFwiOi8vXCIgKyBhZGRyZXNzICsgXCIuLi5cIiArIGFkZHJlc3NIb3N0ICsgcG9ydCArIHN1ZmZpeFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybCA9IHByb3RvY29sICsgXCI6Ly9cIiArIGFkZHJlc3MgKyBwb3J0ICsgc3VmZml4XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBwcm90b2NvbCArIFwiOi8vXCIgKyBhZGRyZXNzICsgcG9ydCArIHN1ZmZpeFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHVybCA9IHByb3RvY29sICsgXCI6Ly9cIiArIGFkZHJlc3MgKyBwb3J0ICsgc3VmZml4XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnVybF90eXBlICE9IDEpIHtcclxuICAgICAgICAgICAgLy9odHRwcyB3c3PmlrDlop4gcD1z5Y+C5pWwXHJcbiAgICAgICAgICAgIGlmICh1cmwuc3RhcnRzV2l0aChcImh0dHBzXCIpIHx8IHVybC5zdGFydHNXaXRoKFwid3NzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodXJsLmVuZHNXaXRoKFwiP1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybCA9IHVybCArIFwicD1zXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gdXJsICsgXCImcD1zXCJcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrQWRkcmVzcyhhZGRyZXNzKSkge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gYWRkcmVzcyArIHBvcnQgKyBzdWZmaXhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwcmludFNlbGYoKSB7XHJcbiAgICAgICAgbGV0IHByaW50U3RyID0gXCJwcm90b2NvbCA9IFwiICsgdGhpcy5fcHJvdG9jb2wgKyBcIiBhZGRyZXNzID0gXCIgKyB0aGlzLl9hZGRyZXNzICsgXCIgcG9ydCA9IFwiICsgdGhpcy5fcG9ydCArIFwiIGFkZHJlc3NIb3N0ID0gXCIgKyB0aGlzLl9hZGRyZXNzX2hvc3QgKyBcIiByZWFsSG9zdCA9IFwiICsgdGhpcy5fcmVhbF9ob3N0ICsgXCIgYXR0ciA9IFwiICsgKHRoaXMuX2F0dHIgPyBKU09OLnN0cmluZ2lmeSh0aGlzLl9hdHRyKSA6IFwibnVsbFwiKVxyXG5cclxuICAgICAgICByZXR1cm4gcHJpbnRTdHJcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrQWRkcmVzcyhhZGRyZXNzKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBhZGRyZXNzICYmIGFkZHJlc3Muc3RhcnRzV2l0aChcImh0dHBcIilcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHByb3RvY29sKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvdG9jb2wgPSB2YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcHJvdG9jb2woKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3RvY29sXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGFkZHJlc3ModmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9hZGRyZXNzID0gdmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGFkZHJlc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZHJlc3NcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGFkZHJlc3NIb3N0KHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fYWRkcmVzc19ob3N0ID0gdmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGFkZHJlc3NIb3N0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRyZXNzX2hvc3RcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHJlYWxIb3N0KHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fcmVhbF9ob3N0ID0gdmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJlYWxIb3N0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWFsX2hvc3RcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHBvcnQodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9wb3J0ID0gdmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBvcnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcnRcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHN1ZmZpeCh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3N1ZmZpeCA9IHZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzdWZmaXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1ZmZpeFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgbG9fdHlwZSh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2xvX3R5cGUgPSB2YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbG9fdHlwZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9fdHlwZVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0IGlzRW5jcnB0VXJsKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5faXNFbmNycHRVcmwgPSB2YWx1ZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNFbmNycHRVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRW5jcnB0VXJsXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpc0VuY3JwdFBhcmFtKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5faXNFbmNycHRQYXJhbSA9IHZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc0VuY3JwdFBhcmFtKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9wcm90b2NvbCA9PSBcImh0dHBzXCIgfHwgdGhpcy5fcHJvdG9jb2wgPT0gXCJ3c3NcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9pc0VuY3JwdFBhcmFtID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5faXNFbmNycHRQYXJhbSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0VuY3JwdFBhcmFtXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzZXQgaXNIb3N0TmFtZVZlcmZ5KHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5faXNIb3N0TmFtZVZlcmZ5ID0gdmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzSG9zdE5hbWVWZXJmeSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNIb3N0TmFtZVZlcmZ5XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjZXJOYW1lKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fY2VyTmFtZSA9IHZhbHVlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjZXJOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jZXJOYW1lXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBjZXJQYXRoKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fY2VyUGF0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2VyUGF0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2VyUGF0aFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0IGlzSW5uZXJSZXF1ZXN0KHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5faXNJbm5lclJlcXVlc3QgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzSW5uZXJSZXF1ZXN0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc0lubmVyUmVxdWVzdFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgYXR0cigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXR0cjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGF0dHIodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9hdHRyID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJhbSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGFybVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBwYXJhbSh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3Bhcm0gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgdXJsX3R5cGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VybF90eXBlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCB1cmxfdHlwZSh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3VybF90eXBlID0gdmFsdWVcclxuICAgIH1cclxuXHJcbn0iXX0=