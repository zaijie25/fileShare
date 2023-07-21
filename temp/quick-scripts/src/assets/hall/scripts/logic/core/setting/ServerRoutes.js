"use strict";
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