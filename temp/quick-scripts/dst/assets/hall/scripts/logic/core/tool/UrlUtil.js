
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/UrlUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '659c8JofOlDxKdtOZ/J66uw', 'UrlUtil');
// hall/scripts/logic/core/tool/UrlUtil.ts

"use strict";
/**
 * 对Url操作的工具类
 * @author Peter
 *
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlUtil = void 0;
var HallStorageKey_1 = require("../../hallcommon/const/HallStorageKey");
var UrlUtil = /** @class */ (function () {
    function UrlUtil() {
        this.mutiLinesSplit = [",", ";", "|"];
        this.decimalDict = "fgHijUvWXAbcdEyzKLMnOpqRst";
    }
    UrlUtil.prototype.getHostFromUrl = function (url) {
        if (url == null || url == "")
            return url;
        var arrs = url.split("//");
        var tmpUrl = url;
        if (arrs.length > 1)
            tmpUrl = arrs[1];
        arrs = tmpUrl.split("/");
        var host = arrs[0];
        if (host.indexOf(":") > -1)
            host = host.split(":")[0];
        return host;
    };
    UrlUtil.prototype.getPortFromUrl = function (url) {
        if (url == null || url == "")
            return null;
        var arrs = url.split("//");
        var tmpUrl = url;
        if (arrs.length > 1)
            tmpUrl = arrs[1];
        arrs = tmpUrl.split("/");
        var hostUrl = arrs[0];
        var port = null;
        if (hostUrl.indexOf(":") > -1)
            port = hostUrl.split(":")[1];
        if (port && Number(port)) {
            return Number(port);
        }
        return null;
    };
    UrlUtil.prototype.domainURI = function (str_url) {
        if (!str_url) {
            return "";
        }
        var domain = str_url.split('/');
        var domainUrl = '';
        if (domain[2]) {
            domainUrl = domain[0] + "//" + domain[2];
        }
        return domainUrl;
    };
    UrlUtil.prototype.getHttpReffer = function (url) {
        var urlSubStr = this.domainURI(url);
        var newUrl = url.replace(urlSubStr, "");
        var sign = this.getPlatformSign(newUrl);
        // Logger.error("getHttpReffer new url = " + newUrl + " sign = " + sign)
        return sign;
    };
    UrlUtil.prototype.getPlatformSign = function (content, key) {
        if (!key) {
            key = Global.Setting.signKey;
        }
        var sign = null;
        if (cc.sys.isNative) {
            var retObj = Global.NativeEvent.getLoginSign(key, content);
            if (retObj && retObj.result == 0) {
                sign = retObj.funcParam;
            }
            else {
                sign = this.getSign(key, content);
            }
        }
        else {
            sign = this.getSign(key, content);
        }
        return sign;
    };
    UrlUtil.prototype.getSign = function (key, content) {
        var msg = Global.AESUtil.md5(content);
        msg = msg.substring(0, msg.length / 2);
        var checkKey = Global.AESUtil.md5(key);
        checkKey = checkKey.substring(checkKey.length / 2);
        var data = Global.AESUtil.md5(msg + checkKey);
        data = data.substring(5, 15);
        return data;
    };
    UrlUtil.prototype.dealServerUrl = function (serverUrl, port) {
        var address = serverUrl.address;
        var protocol = serverUrl.protocol;
        if (address.indexOf("...") > 0) {
            //强制转ws https 强转http
            if (protocol.startsWith("wss")) {
                protocol = "ws://";
            }
            var hostArray = address.split("...");
            var ipPortUrl = hostArray[0];
            if (ipPortUrl.indexOf(":") > 0) {
                if (protocol.startsWith("https")) {
                    protocol = "http://";
                }
                else {
                    Logger.error("head not startsWith https ");
                }
            }
            else {
                Logger.error("ipPortUrl not :");
            }
            serverUrl.protocol = protocol;
        }
        if (port != null && port != 0 && port != 80 && port != 443)
            serverUrl.port = port;
    };
    /**
     * 返回wss证书文件路径
     */
    UrlUtil.prototype.getCacertPath = function () {
        if (jsb && jsb.fileUtils.isFileExist("cacert.pem")) {
            var fileFullPath = jsb.fileUtils.fullPathForFilename("cacert.pem");
            Logger.error("use native path", fileFullPath);
            return fileFullPath;
        }
        //return jsb.fileUtils.getWritablePath() + '/gameUpdate/hall/' + cc.url.raw("resources/hall/cacert1.pem");
        return cc.url.raw("resources/hall/cacert1.pem");
    };
    UrlUtil.prototype.DealWithUrl = function (url) {
        if (typeof (url) != "string" || !url) {
            Logger.error("链接格式不对");
            return null;
        }
        return url.replace("\t", "").trim();
    };
    //获取Url 前缀flag
    UrlUtil.prototype.getUrlParamCommonPrefex = function () {
        var appId = this.EncodeAppid(Global.Setting.appId);
        // Logger.error("appId = " + appId)
        return "_" + appId + "/";
    };
    // 10进制转任意进制
    UrlUtil.prototype.EncodeAppid = function (appid) {
        var new_num_str = "";
        var remainder = 0;
        var remainder_string = "";
        var nn = 26;
        var num = Number(appid);
        do {
            remainder = num % nn;
            if (nn > remainder && remainder >= 0) {
                remainder_string = this.decimalDict.substring(remainder, remainder + 1);
            }
            else {
                remainder_string = remainder.toString();
            }
            new_num_str = remainder_string + new_num_str;
            num = Math.floor(num / nn);
        } while (num != 0);
        return new_num_str;
    };
    //获取url 参数
    UrlUtil.prototype.getUrlCommonParam = function () {
        // let encodeUrl = Global.Toolkit.getRequestEncodeData()
        var timeStr = this.getTimeEndFixParam();
        var param = "uid=" + Global.PlayerData.uid + "&token=" + Global.PlayerData.token + "&appver=" + Global.Setting.SystemInfo.appVersion + "&os=" + Global.Toolkit.getOsType() + "&m=" + timeStr;
        return param;
    };
    //获取登录前和登录中通用参数
    UrlUtil.prototype.getLoginCommonParam = function () {
        var uid = Number(Global.Setting.storage.get(HallStorageKey_1.default.Uid)) || 0;
        var timeStr = this.getTimeEndFixParam();
        var param = "uid=" + uid + "&appver=" + Global.Setting.SystemInfo.appVersion + "&os=" + Global.Toolkit.getOsType() + "&n=" + (new Date()).valueOf() + "&m=" + timeStr;
        return param;
    };
    //获取时间字符串
    UrlUtil.prototype.getTimeEndFixParam = function () {
        var date = new Date();
        var timeStr = date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + date.getMilliseconds();
        return timeStr;
    };
    //处理http sign
    UrlUtil.prototype.dealHttpSign = function (serverUrl) {
        var url = serverUrl.getUrl();
        var httpSignInfo = { "sign_url": "", "headSign": "", "endSign": "" };
        var sign_url = this.refreshSuffixOperTime(url);
        var s_value = this.getQueryString(sign_url, "s");
        var headSign = "";
        var endSign = "";
        var linkSymbol = sign_url.indexOf('?') > 0 && "&s=" || "?s=";
        if (!s_value) {
            headSign = this.getHttpReffer(sign_url);
            endSign = this.getHttpReffer(sign_url + linkSymbol + headSign);
            // Logger.error("dealHttpSign url with 4444")
            sign_url = sign_url + linkSymbol + endSign;
        }
        else {
            var replaceUrl = sign_url.replace("&s=" + s_value, "");
            headSign = this.getHttpReffer(replaceUrl);
            endSign = this.getHttpReffer(replaceUrl + linkSymbol + headSign);
            // Logger.error("dealHttpSign url with 5555")
            sign_url = replaceUrl + linkSymbol + endSign;
        }
        // Logger.error("dealHttpSign before sign_url = " + sign_url)
        if (serverUrl.isEncrptUrl) {
            var sign_url_host = this.getHostFromUrl(sign_url);
            // let sign_url_port = this.getPortFromUrl(sign_url)
            var sign_url_array = sign_url.split(sign_url_host);
            if (sign_url_array && sign_url_array.length > 0) {
                var sign_url_first = sign_url_array[0];
                var sign_url_second = sign_url_array[1];
                var encryptStr = Global.AESUtil.aesEncryptWithCommonKey(sign_url_second);
                // let decryptStr = this.aesDecrypt(encryptStr)
                // Logger.error("decryptStr = " + decryptStr.trim())
                sign_url = sign_url_first + sign_url_host + "/" + encryptStr;
            }
        }
        // Logger.error("dealHttpSign after sign_url = " + sign_url)
        httpSignInfo.sign_url = sign_url;
        httpSignInfo.headSign = headSign;
        httpSignInfo.endSign = endSign;
        return httpSignInfo;
    };
    //对socket url 处理
    UrlUtil.prototype.dealWebSocketUrl = function (serverUrl) {
        if (typeof (serverUrl) == 'string') {
            //捕鱼会发string url过来
            Logger.log("dealWebSocketUrl url = string");
            return serverUrl;
        }
        var address = serverUrl.getUrl();
        if (address.indexOf("...") > 0) {
            Logger.log("dealWebSocketUrl url contains ... ");
            var httpSignInfo_1 = this.dealHttpSign(serverUrl);
            var sign_url_1 = httpSignInfo_1.sign_url;
            return sign_url_1;
        }
        //20016版本开始 ios支持wss 支持httpDNS
        if (address.startsWith("wss")) {
            //wss协议的自动返回
            Logger.log("dealWebSocketUrl address start wss  version < 20016");
            var httpSignInfo_2 = this.dealHttpSign(serverUrl);
            var sign_url_2 = httpSignInfo_2.sign_url;
            return sign_url_2;
        }
        Logger.log("dealWebSocketUrl getHttpRequestDNSInfo before " + serverUrl.printSelf());
        Global.DNS.getHttpRequestDNSInfo(serverUrl, 0);
        Logger.log("dealWebSocketUrl getHttpRequestDNSInfo after " + serverUrl.printSelf());
        var httpSignInfo = this.dealHttpSign(serverUrl);
        var sign_url = httpSignInfo.sign_url;
        if (!sign_url) {
            Logger.log("dealWebSocketUrl sign_url error " + serverUrl.getUrl());
            return;
        }
        var url = sign_url;
        Logger.log("dealWebSocketUrl url ", url);
        return url;
    };
    UrlUtil.prototype.getQueryString = function (suffix, name) {
        var reg = new RegExp('(\\?|&)' + name + '=([^&?]*)', 'i');
        var r = suffix.match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    };
    UrlUtil.prototype.replaceUrlParmVal = function (url, paramName, replaceValue) {
        var urlRet = url;
        if (url) {
            var re = eval('/(' + paramName + '=)([^&]*)/gi');
            var nUrl = url.replace(re, paramName + '=' + replaceValue);
            urlRet = nUrl;
        }
        return urlRet;
    };
    UrlUtil.prototype.refreshSuffixOperTime = function (suffix) {
        if (suffix) {
            var n_value = this.getQueryString(suffix, "n");
            // Logger.error("refreshSuffixOperTime n_value = " + n_value)
            if (n_value) {
                suffix = this.replaceUrlParmVal(suffix, "n", (new Date()).valueOf());
            }
            var m_value = this.getQueryString(suffix, "m");
            // Logger.error("refreshSuffixOperTime m_value = " + m_value)
            if (m_value) {
                suffix = this.replaceUrlParmVal(suffix, "m", this.getTimeEndFixParam());
            }
            // Logger.error("refreshSuffixOperTime suffix = " + suffix)
        }
        return suffix;
    };
    UrlUtil.prototype.refreshSuffixRetryTime = function (suffix, times) {
        if (!suffix)
            return suffix;
        var c_value = this.getQueryString(suffix, "c");
        if (!c_value)
            suffix = suffix + "&c=" + times;
        else
            suffix = this.replaceUrlParmVal(suffix, "c", times);
        return suffix;
    };
    //判断是否是IP
    UrlUtil.prototype.checkIsIp = function (ipAddress) {
        if (ipAddress) {
            var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
            if (re.test(ipAddress)) {
                return true;
            }
        }
        return false;
    };
    //获取自签名证书路径
    UrlUtil.prototype.getSelfSignCerPath = function (cerName) {
        if (cc.sys.isNative) {
            if (jsb && jsb.fileUtils.isFileExist(cerName)) {
                var fileFullPath = jsb.fileUtils.fullPathForFilename(cerName);
                Logger.log("getSelfSignCerPath cerName fileFullPath ", cerName, fileFullPath);
                return fileFullPath;
            }
            else {
                Logger.log("cerName not exist " + cerName);
            }
        }
        else {
            return cc.url.raw("resources/hall/cert/" + cerName + ".crt");
        }
    };
    //设置线路的是否需要证书
    UrlUtil.prototype.setRouteUrlCer = function (serverUrl) {
        var cerDirFiles = Global.Setting.SystemInfo.cerDirFiles;
        if (cerDirFiles && cerDirFiles.length > 0) {
            var isHasCerFile = false;
            for (var i = 0; i < cerDirFiles.length; i++) {
                var fileFullName = cerDirFiles[i];
                if (fileFullName && (fileFullName.indexOf(".cer") > -1) || fileFullName.indexOf(".crt") > -1) {
                    var tempArray = fileFullName.split("/");
                    var lastFileName = tempArray[tempArray.length - 1];
                    var fileName = lastFileName.replace(".cer", "");
                    var addressHost = serverUrl.addressHost.toLowerCase();
                    if (fileName) {
                        if (addressHost.indexOf(fileName.toLowerCase()) > -1) {
                            Logger.log("cer file name = " + fileName);
                            Logger.log("cer fileFullName  = " + fileFullName);
                            serverUrl.cerName = fileFullName;
                            serverUrl.cerPath = fileFullName;
                            isHasCerFile = true;
                            break;
                        }
                        else {
                            // Logger.log("addressHost " + addressHost + " not contain cer host " + fileName)
                        }
                    }
                }
            }
            //没有该域名的cer文件
            Logger.log("isHasCerFile = " + isHasCerFile);
        }
        else {
            Logger.log("cerDirFiles has no file");
        }
    };
    //检查是否是多条地址同一个host
    UrlUtil.prototype.checkIsMutiLinesSameHost = function (host) {
        var ret = false;
        if (!host) {
            return;
        }
        // Logger.error("checkIsMutiLinesSameHost enter" )
        for (var i = 0; i < this.mutiLinesSplit.length; i++) {
            var splitStr = this.mutiLinesSplit[i];
            if (host.indexOf(splitStr) > 0) {
                ret = true;
                break;
            }
        }
        // Logger.error("checkIsMutiLinesSameHost ret " + ret )
        return ret;
    };
    //获取同host多条线路集合
    UrlUtil.prototype.getMutiLinesSameHost = function (host) {
        var lines = null;
        if (!host) {
            return;
        }
        for (var i = 0; i < this.mutiLinesSplit.length; i++) {
            var splitStr = this.mutiLinesSplit[i];
            if (host.indexOf(splitStr) > 0) {
                lines = host.split(splitStr);
                break;
            }
        }
        // Logger.error("getMutiLinesSameHost lines " + JSON.stringify(lines) )
        return lines;
    };
    UrlUtil.prototype.transferUrlArrayToRoutes = function (urlarray) {
        if (!urlarray || urlarray.length == 0) {
            return urlarray;
        }
        var routes = [];
        for (var index = 0; index < urlarray.length; index++) {
            var url = urlarray[index];
            var item = {
                "host": url,
                "url_type": 1,
                "us_port": 0,
                "lo_type": 0
            };
            routes.push(item);
        }
        return routes;
    };
    //处理url全部下发方式多线路同host问题
    UrlUtil.prototype.dealFullUrlWithMutiLinesSameHost = function (urls) {
        // Logger.error("dealFullUrlWithMutiLinesSameHost enter " + JSON.stringify(urls))
        var mutiLineMap = cc.js.createMap();
        if (urls && urls.length > 0) {
            for (var i = 0; i < urls.length; i++) {
                var url = urls[i];
                var protocol = '';
                var address = '';
                var port = 0;
                var suffix = '';
                if (url.startsWith("https")) {
                    protocol = "https";
                }
                else if (url.startsWith("http")) {
                    protocol = "http";
                }
                else if (url.startsWith("wss")) {
                    protocol = "wss";
                }
                else if (url.startsWith("ws")) {
                    protocol = "ws";
                }
                var arrs = url.split("//");
                var tmpUrl = url;
                if (arrs.length > 1)
                    tmpUrl = arrs[1];
                arrs = tmpUrl.split("/");
                var host = arrs[0];
                if (host.indexOf(":") > -1) {
                    address = host.split(":")[0];
                    var port_1 = host.split(":")[1];
                    if (port_1 && Number(port_1)) {
                        port_1 = Number(port_1);
                    }
                }
                else {
                    address = host;
                }
                if (arrs.length > 1) {
                    for (var i_1 = 1; i_1 < arrs.length; i_1++) {
                        suffix = suffix + "/" + arrs[i_1];
                    }
                }
                // Logger.error("dealFullUrlWithMutiLinesSameHost address " + address)
                if (address && address.indexOf("...") > 0) {
                    var address_array = address.split("...");
                    if (address_array && address_array.length > 0) {
                        var address_real = address_array[0];
                        var address_host = address_array[1];
                        if (this.checkIsMutiLinesSameHost(address_real)) {
                            // Logger.error("checkIsMutiLinesSameHost address_real " + address_real)
                            var mutiLines = this.getMutiLinesSameHost(address_real);
                            if (mutiLines && mutiLines.length > 0) {
                                var curLines = [];
                                // Logger.error("checkIsMutiLinesSameHost mutiLines " + JSON.stringify(mutiLines))
                                for (var i_2 = 0; i_2 < mutiLines.length; i_2++) {
                                    var lineHost = mutiLines[i_2];
                                    var linePort = port ? ":" + port : "";
                                    var lineUrl = protocol + "://" + lineHost + "..." + address_host + linePort + suffix;
                                    curLines.push(lineUrl);
                                }
                                mutiLineMap[url] = curLines;
                            }
                        }
                    }
                }
            }
            // Logger.error("mutiLineMap " ,JSON.stringify(mutiLineMap))
            for (var key in mutiLineMap) {
                var value = mutiLineMap[key];
                var key_index = -1;
                for (var i = 0; i < urls.length; i++) {
                    var url_value = urls[i];
                    if (url_value == key) {
                        key_index = i;
                    }
                }
                // Logger.error("key_index " + key_index)
                if (key_index > -1) {
                    urls.splice(key_index, 1);
                    urls = value.concat(urls);
                }
                Logger.error("dealFullUrlWithMutiLinesSameHost urls = " + JSON.stringify(urls));
            }
        }
        return urls;
    };
    UrlUtil.prototype.formatServerUrl = function (head, host, port) {
        var url = '';
        // Logger.error("formatServerUrl head = " + head)
        // Logger.error("formatServerUrl host = " + host)
        // Logger.error("formatServerUrl port = " + port)
        //host带域名
        if (host.indexOf("...") > 0) {
            //强制转ws https 强转http
            if (head.startsWith("wss")) {
                head = "ws://";
            }
            var hostArray = host.split("...");
            var ipPortUrl = hostArray[0];
            if (ipPortUrl.indexOf(":") > 0) {
                if (head.startsWith("https")) {
                    head = "http://";
                }
                else {
                    Logger.error("head not startsWith https ");
                }
            }
            else {
                Logger.error("ipPortUrl not :");
            }
        }
        url = head + host;
        if (port != null && port != 0 && port != 80 && port != 443)
            url = url + ":" + port;
        // Logger.error("formatServerUrl url = " + url)
        return url;
    };
    /**
     *
     * @param url 链接
     * @param param 需要替换的字段
     * @param name 目标字段
     */
    UrlUtil.prototype.replaceUrlParam = function (url, paramList) {
        if (!url) {
            return url;
        }
        url = Global.Toolkit.strReplaceCtrChar(url);
        var urlParamArr = url.split('?');
        if (urlParamArr.length < 2) {
            Logger.error("没有额外参数");
            return url;
        }
        var tmpParam = urlParamArr[1];
        for (var i = 0; i < paramList.length; i++) {
            var param = paramList[i];
            var lastIndex = urlParamArr[1].lastIndexOf(param["param"]);
            if (lastIndex != -1) {
                urlParamArr[1] = urlParamArr[1].substr(0, lastIndex) + param["value"] + urlParamArr[1].substr(lastIndex + param["param"].length);
            }
        }
        return urlParamArr.join('?');
    };
    return UrlUtil;
}());
exports.UrlUtil = UrlUtil;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXFVybFV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0VBSUU7OztBQUVGLHdFQUFtRTtBQUluRTtJQUFBO1FBQ1ksbUJBQWMsR0FBRyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUE7UUErSXRDLGdCQUFXLEdBQUcsNEJBQTRCLENBQUE7SUEyYzlDLENBQUM7SUF4bEJVLGdDQUFjLEdBQXJCLFVBQXNCLEdBQVc7UUFDN0IsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO1lBQ3hCLE9BQU8sR0FBRyxDQUFDO1FBQ2YsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDZixNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxnQ0FBYyxHQUFyQixVQUFzQixHQUFXO1FBQzdCLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtZQUN4QixPQUFPLElBQUksQ0FBQztRQUNoQixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFD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LENBQUMsQ0FBQTtZQUMxRCxJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFDbkI7Z0JBQ0ksV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbkk7U0FDSjtRQUdELE9BQVEsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUwsY0FBQztBQUFELENBM2xCQSxBQTJsQkMsSUFBQTtBQTNsQlksMEJBQU8iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5a+5VXJs5pON5L2c55qE5bel5YW357G7XHJcbiAqIEBhdXRob3IgUGV0ZXJcclxuICogXHJcbiovXHJcblxyXG5pbXBvcnQgSGFsbFN0b3JhZ2VLZXkgZnJvbSBcIi4uLy4uL2hhbGxjb21tb24vY29uc3QvSGFsbFN0b3JhZ2VLZXlcIjtcclxuaW1wb3J0IHsgU2VydmVyVXJsIH0gZnJvbSBcIi4uL3NldHRpbmcvU2VydmVyUm91dGVzXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVybFV0aWwge1xyXG4gICAgcHJpdmF0ZSBtdXRpTGluZXNTcGxpdCA9IFtcIixcIixcIjtcIixcInxcIl1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SG9zdEZyb21VcmwodXJsOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodXJsID09IG51bGwgfHwgdXJsID09IFwiXCIpXHJcbiAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgbGV0IGFycnMgPSB1cmwuc3BsaXQoXCIvL1wiKTtcclxuICAgICAgICBsZXQgdG1wVXJsID0gdXJsO1xyXG4gICAgICAgIGlmIChhcnJzLmxlbmd0aCA+IDEpXHJcbiAgICAgICAgICAgIHRtcFVybCA9IGFycnNbMV07XHJcbiAgICAgICAgYXJycyA9IHRtcFVybC5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgbGV0IGhvc3QgPSBhcnJzWzBdO1xyXG4gICAgICAgIGlmIChob3N0LmluZGV4T2YoXCI6XCIpID4gLTEpXHJcbiAgICAgICAgICAgIGhvc3QgPSBob3N0LnNwbGl0KFwiOlwiKVswXTtcclxuICAgICAgICByZXR1cm4gaG9zdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UG9ydEZyb21VcmwodXJsOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodXJsID09IG51bGwgfHwgdXJsID09IFwiXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIGxldCBhcnJzID0gdXJsLnNwbGl0KFwiLy9cIik7XHJcbiAgICAgICAgbGV0IHRtcFVybCA9IHVybDtcclxuICAgICAgICBpZiAoYXJycy5sZW5ndGggPiAxKVxyXG4gICAgICAgICAgICB0bXBVcmwgPSBhcnJzWzFdO1xyXG4gICAgICAgIGFycnMgPSB0bXBVcmwuc3BsaXQoXCIvXCIpO1xyXG4gICAgICAgIGxldCBob3N0VXJsID0gYXJyc1swXTtcclxuICAgICAgICBsZXQgcG9ydCA9IG51bGxcclxuICAgICAgICBpZiAoaG9zdFVybC5pbmRleE9mKFwiOlwiKSA+IC0xKVxyXG4gICAgICAgICAgICBwb3J0ID0gaG9zdFVybC5zcGxpdChcIjpcIilbMV07XHJcbiAgICAgICAgaWYgKHBvcnQgJiYgTnVtYmVyKHBvcnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIocG9ydClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgZG9tYWluVVJJKHN0cl91cmwpIHtcclxuICAgICAgICBpZiAoIXN0cl91cmwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRvbWFpbiA9IHN0cl91cmwuc3BsaXQoJy8nKVxyXG4gICAgICAgIGxldCBkb21haW5VcmwgPSAnJ1xyXG4gICAgICAgIGlmIChkb21haW5bMl0pIHtcclxuICAgICAgICAgICAgZG9tYWluVXJsID0gZG9tYWluWzBdICsgXCIvL1wiICsgZG9tYWluWzJdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkb21haW5VcmxcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SHR0cFJlZmZlcih1cmw6IHN0cmluZykge1xyXG4gICAgICAgIGxldCB1cmxTdWJTdHIgPSB0aGlzLmRvbWFpblVSSSh1cmwpXHJcbiAgICAgICAgbGV0IG5ld1VybCA9IHVybC5yZXBsYWNlKHVybFN1YlN0ciwgXCJcIik7XHJcbiAgICAgICAgbGV0IHNpZ24gPSB0aGlzLmdldFBsYXRmb3JtU2lnbihuZXdVcmwpXHJcbiAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiZ2V0SHR0cFJlZmZlciBuZXcgdXJsID0gXCIgKyBuZXdVcmwgKyBcIiBzaWduID0gXCIgKyBzaWduKVxyXG4gICAgICAgIHJldHVybiBzaWduO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQbGF0Zm9ybVNpZ24oY29udGVudDogc3RyaW5nLCBrZXk/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWtleSkge1xyXG4gICAgICAgICAgICBrZXkgPSBHbG9iYWwuU2V0dGluZy5zaWduS2V5XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzaWduID0gbnVsbDtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XHJcbiAgICAgICAgICAgIGxldCByZXRPYmogPSBHbG9iYWwuTmF0aXZlRXZlbnQuZ2V0TG9naW5TaWduKGtleSwgY29udGVudClcclxuICAgICAgICAgICAgaWYgKHJldE9iaiAmJiByZXRPYmoucmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgICAgIHNpZ24gPSByZXRPYmouZnVuY1BhcmFtXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaWduID0gdGhpcy5nZXRTaWduKGtleSwgY29udGVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzaWduID0gdGhpcy5nZXRTaWduKGtleSwgY29udGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzaWduO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTaWduKGtleTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgbXNnOiBzdHJpbmcgPSBHbG9iYWwuQUVTVXRpbC5tZDUoY29udGVudCk7XHJcbiAgICAgICAgbXNnID0gbXNnLnN1YnN0cmluZygwLCBtc2cubGVuZ3RoIC8gMilcclxuICAgICAgICBsZXQgY2hlY2tLZXkgPSBHbG9iYWwuQUVTVXRpbC5tZDUoa2V5KVxyXG4gICAgICAgIGNoZWNrS2V5ID0gY2hlY2tLZXkuc3Vic3RyaW5nKGNoZWNrS2V5Lmxlbmd0aCAvIDIpXHJcbiAgICAgICAgbGV0IGRhdGEgPSBHbG9iYWwuQUVTVXRpbC5tZDUobXNnICsgY2hlY2tLZXkpO1xyXG4gICAgICAgIGRhdGEgPSBkYXRhLnN1YnN0cmluZyg1LCAxNSlcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGRlYWxTZXJ2ZXJVcmwoc2VydmVyVXJsOiBTZXJ2ZXJVcmwsIHBvcnQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBhZGRyZXNzID0gc2VydmVyVXJsLmFkZHJlc3NcclxuICAgICAgICBsZXQgcHJvdG9jb2wgPSBzZXJ2ZXJVcmwucHJvdG9jb2xcclxuICAgICAgICBpZiAoYWRkcmVzcy5pbmRleE9mKFwiLi4uXCIpID4gMCkge1xyXG4gICAgICAgICAgICAvL+W8uuWItui9rHdzIGh0dHBzIOW8uui9rGh0dHBcclxuICAgICAgICAgICAgaWYgKHByb3RvY29sLnN0YXJ0c1dpdGgoXCJ3c3NcIikpIHtcclxuICAgICAgICAgICAgICAgIHByb3RvY29sID0gXCJ3czovL1wiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGhvc3RBcnJheSA9IGFkZHJlc3Muc3BsaXQoXCIuLi5cIilcclxuICAgICAgICAgICAgbGV0IGlwUG9ydFVybCA9IGhvc3RBcnJheVswXVxyXG4gICAgICAgICAgICBpZiAoaXBQb3J0VXJsLmluZGV4T2YoXCI6XCIpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb3RvY29sLnN0YXJ0c1dpdGgoXCJodHRwc1wiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3RvY29sID0gXCJodHRwOi8vXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiaGVhZCBub3Qgc3RhcnRzV2l0aCBodHRwcyBcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImlwUG9ydFVybCBub3QgOlwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlcnZlclVybC5wcm90b2NvbCA9IHByb3RvY29sXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwb3J0ICE9IG51bGwgJiYgcG9ydCAhPSAwICYmIHBvcnQgIT0gODAgJiYgcG9ydCAhPSA0NDMpXHJcbiAgICAgICAgICAgIHNlcnZlclVybC5wb3J0ID0gcG9ydFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnndzc+ivgeS5puaWh+S7tui3r+W+hFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Q2FjZXJ0UGF0aCgpIHtcclxuXHJcbiAgICAgICAgaWYgKGpzYiAmJiBqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KFwiY2FjZXJ0LnBlbVwiKSkge1xyXG4gICAgICAgICAgICBsZXQgZmlsZUZ1bGxQYXRoID0ganNiLmZpbGVVdGlscy5mdWxsUGF0aEZvckZpbGVuYW1lKFwiY2FjZXJ0LnBlbVwiKVxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJ1c2UgbmF0aXZlIHBhdGhcIiwgZmlsZUZ1bGxQYXRoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZpbGVGdWxsUGF0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9yZXR1cm4ganNiLmZpbGVVdGlscy5nZXRXcml0YWJsZVBhdGgoKSArICcvZ2FtZVVwZGF0ZS9oYWxsLycgKyBjYy51cmwucmF3KFwicmVzb3VyY2VzL2hhbGwvY2FjZXJ0MS5wZW1cIik7XHJcbiAgICAgICAgcmV0dXJuIGNjLnVybC5yYXcoXCJyZXNvdXJjZXMvaGFsbC9jYWNlcnQxLnBlbVwiKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIERlYWxXaXRoVXJsKHVybDogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgKHVybCkgIT0gXCJzdHJpbmdcIiB8fCAhdXJsKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIumTvuaOpeagvOW8j+S4jeWvuVwiKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXJsLnJlcGxhY2UoXCJcXHRcIiwgXCJcIikudHJpbSgpXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+iOt+WPllVybCDliY3nvIBmbGFnXHJcbiAgICBwdWJsaWMgZ2V0VXJsUGFyYW1Db21tb25QcmVmZXgoKSB7XHJcbiAgICAgICAgbGV0IGFwcElkID0gdGhpcy5FbmNvZGVBcHBpZChHbG9iYWwuU2V0dGluZy5hcHBJZCk7XHJcbiAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiYXBwSWQgPSBcIiArIGFwcElkKVxyXG4gICAgICAgIHJldHVybiBcIl9cIiArIGFwcElkICsgXCIvXCJcclxuICAgIH1cclxuXHJcblxyXG4gICAgZGVjaW1hbERpY3QgPSBcImZnSGlqVXZXWEFiY2RFeXpLTE1uT3BxUnN0XCJcclxuXHJcbiAgICAvLyAxMOi/m+WItui9rOS7u+aEj+i/m+WItlxyXG4gICAgcHVibGljIEVuY29kZUFwcGlkKGFwcGlkOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbmV3X251bV9zdHIgPSBcIlwiXHJcbiAgICAgICAgbGV0IHJlbWFpbmRlciA9IDBcclxuICAgICAgICBsZXQgcmVtYWluZGVyX3N0cmluZyA9IFwiXCJcclxuICAgICAgICBsZXQgbm4gPSAyNlxyXG4gICAgICAgIGxldCBudW0gPSBOdW1iZXIoYXBwaWQpXHJcblxyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgcmVtYWluZGVyID0gbnVtICUgbm5cclxuICAgICAgICAgICAgaWYgKG5uID4gcmVtYWluZGVyICYmIHJlbWFpbmRlciA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZW1haW5kZXJfc3RyaW5nID0gdGhpcy5kZWNpbWFsRGljdC5zdWJzdHJpbmcocmVtYWluZGVyLCByZW1haW5kZXIgKyAxKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVtYWluZGVyX3N0cmluZyA9IHJlbWFpbmRlci50b1N0cmluZygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3X251bV9zdHIgPSByZW1haW5kZXJfc3RyaW5nICsgbmV3X251bV9zdHJcclxuICAgICAgICAgICAgbnVtID0gTWF0aC5mbG9vcihudW0gLyBubilcclxuICAgICAgICB9IHdoaWxlIChudW0gIT0gMClcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld19udW1fc3RyXHJcbiAgICB9XHJcblxyXG5cclxuICAgICAvL+iOt+WPlnVybCDlj4LmlbBcclxuICAgICBwdWJsaWMgZ2V0VXJsQ29tbW9uUGFyYW0oKSB7XHJcbiAgICAgICAgLy8gbGV0IGVuY29kZVVybCA9IEdsb2JhbC5Ub29sa2l0LmdldFJlcXVlc3RFbmNvZGVEYXRhKClcclxuICAgICAgICBsZXQgdGltZVN0ciA9IHRoaXMuZ2V0VGltZUVuZEZpeFBhcmFtKCk7XHJcbiAgICAgICAgbGV0IHBhcmFtID0gXCJ1aWQ9XCIgKyBHbG9iYWwuUGxheWVyRGF0YS51aWQgKyBcIiZ0b2tlbj1cIiArIEdsb2JhbC5QbGF5ZXJEYXRhLnRva2VuICsgXCImYXBwdmVyPVwiICsgR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5hcHBWZXJzaW9uICsgXCImb3M9XCIgKyBHbG9iYWwuVG9vbGtpdC5nZXRPc1R5cGUoKSArIFwiJm09XCIgKyB0aW1lU3RyO1xyXG4gICAgICAgIHJldHVybiBwYXJhbTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgICAvL+iOt+WPlueZu+W9leWJjeWSjOeZu+W9leS4remAmueUqOWPguaVsFxyXG4gICAgIHB1YmxpYyBnZXRMb2dpbkNvbW1vblBhcmFtKCl7XHJcbiAgICAgICAgbGV0IHVpZCA9IE51bWJlcihHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldChIYWxsU3RvcmFnZUtleS5VaWQpKSB8fCAwO1xyXG4gICAgICAgIGxldCB0aW1lU3RyID0gdGhpcy5nZXRUaW1lRW5kRml4UGFyYW0oKTtcclxuICAgICAgICBsZXQgcGFyYW0gPSBcInVpZD1cIiArIHVpZCAgKyBcIiZhcHB2ZXI9XCIgKyBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcFZlcnNpb24gKyBcIiZvcz1cIiArIEdsb2JhbC5Ub29sa2l0LmdldE9zVHlwZSgpICsgXCImbj1cIiArIChuZXcgRGF0ZSgpKS52YWx1ZU9mKCkgKyBcIiZtPVwiICsgdGltZVN0ciA7XHJcbiAgICAgICAgcmV0dXJuIHBhcmFtO1xyXG4gICAgfVxyXG5cclxuICAvL+iOt+WPluaXtumXtOWtl+espuS4slxyXG4gIHB1YmxpYyBnZXRUaW1lRW5kRml4UGFyYW0oKSB7XHJcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcclxuICAgIGxldCB0aW1lU3RyID0gZGF0ZS5nZXRIb3VycygpLnRvU3RyaW5nKCkgKyBkYXRlLmdldE1pbnV0ZXMoKS50b1N0cmluZygpICsgZGF0ZS5nZXRTZWNvbmRzKCkudG9TdHJpbmcoKSArIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKClcclxuICAgIHJldHVybiB0aW1lU3RyXHJcbn1cclxuXHJcbiAgICAvL+WkhOeQhmh0dHAgc2lnblxyXG4gICAgcHVibGljIGRlYWxIdHRwU2lnbihzZXJ2ZXJVcmw6IFNlcnZlclVybCkge1xyXG4gICAgICAgIGxldCB1cmwgPSBzZXJ2ZXJVcmwuZ2V0VXJsKClcclxuICAgICAgICBsZXQgaHR0cFNpZ25JbmZvID0geyBcInNpZ25fdXJsXCI6IFwiXCIsIFwiaGVhZFNpZ25cIjogXCJcIiwgXCJlbmRTaWduXCI6IFwiXCIgfVxyXG4gICAgICAgIGxldCBzaWduX3VybCA9IHRoaXMucmVmcmVzaFN1ZmZpeE9wZXJUaW1lKHVybClcclxuICAgICAgICBsZXQgc192YWx1ZSA9IHRoaXMuZ2V0UXVlcnlTdHJpbmcoc2lnbl91cmwsIFwic1wiKVxyXG4gICAgICAgIGxldCBoZWFkU2lnbiA9IFwiXCJcclxuICAgICAgICBsZXQgZW5kU2lnbiA9IFwiXCJcclxuICAgICAgICBsZXQgbGlua1N5bWJvbCA9IHNpZ25fdXJsLmluZGV4T2YoJz8nKSA+IDAgJiYgXCImcz1cIiB8fCBcIj9zPVwiO1xyXG4gICAgICAgIGlmICghc192YWx1ZSkge1xyXG4gICAgICAgICAgICBoZWFkU2lnbiA9IHRoaXMuZ2V0SHR0cFJlZmZlcihzaWduX3VybClcclxuICAgICAgICAgICAgZW5kU2lnbiA9IHRoaXMuZ2V0SHR0cFJlZmZlcihzaWduX3VybCArIGxpbmtTeW1ib2wgKyBoZWFkU2lnbilcclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiZGVhbEh0dHBTaWduIHVybCB3aXRoIDQ0NDRcIilcclxuICAgICAgICAgICAgc2lnbl91cmwgPSBzaWduX3VybCArIGxpbmtTeW1ib2wgKyBlbmRTaWduXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHJlcGxhY2VVcmwgPSBzaWduX3VybC5yZXBsYWNlKFwiJnM9XCIgKyBzX3ZhbHVlLCBcIlwiKVxyXG4gICAgICAgICAgICBoZWFkU2lnbiA9IHRoaXMuZ2V0SHR0cFJlZmZlcihyZXBsYWNlVXJsKVxyXG4gICAgICAgICAgICBlbmRTaWduID0gdGhpcy5nZXRIdHRwUmVmZmVyKHJlcGxhY2VVcmwgKyBsaW5rU3ltYm9sICsgaGVhZFNpZ24pXHJcbiAgICAgICAgICAgIC8vIExvZ2dlci5lcnJvcihcImRlYWxIdHRwU2lnbiB1cmwgd2l0aCA1NTU1XCIpXHJcbiAgICAgICAgICAgIHNpZ25fdXJsID0gcmVwbGFjZVVybCArIGxpbmtTeW1ib2wgKyBlbmRTaWduXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIExvZ2dlci5lcnJvcihcImRlYWxIdHRwU2lnbiBiZWZvcmUgc2lnbl91cmwgPSBcIiArIHNpZ25fdXJsKVxyXG4gICAgICAgIGlmIChzZXJ2ZXJVcmwuaXNFbmNycHRVcmwpIHtcclxuICAgICAgICAgICAgbGV0IHNpZ25fdXJsX2hvc3QgPSB0aGlzLmdldEhvc3RGcm9tVXJsKHNpZ25fdXJsKVxyXG4gICAgICAgICAgICAvLyBsZXQgc2lnbl91cmxfcG9ydCA9IHRoaXMuZ2V0UG9ydEZyb21Vcmwoc2lnbl91cmwpXHJcbiAgICAgICAgICAgIGxldCBzaWduX3VybF9hcnJheSA9IHNpZ25fdXJsLnNwbGl0KHNpZ25fdXJsX2hvc3QpXHJcbiAgICAgICAgICAgIGlmIChzaWduX3VybF9hcnJheSAmJiBzaWduX3VybF9hcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2lnbl91cmxfZmlyc3QgPSBzaWduX3VybF9hcnJheVswXVxyXG4gICAgICAgICAgICAgICAgbGV0IHNpZ25fdXJsX3NlY29uZCA9IHNpZ25fdXJsX2FycmF5WzFdXHJcbiAgICAgICAgICAgICAgICBsZXQgZW5jcnlwdFN0ciA9IEdsb2JhbC5BRVNVdGlsLmFlc0VuY3J5cHRXaXRoQ29tbW9uS2V5KHNpZ25fdXJsX3NlY29uZClcclxuICAgICAgICAgICAgICAgIC8vIGxldCBkZWNyeXB0U3RyID0gdGhpcy5hZXNEZWNyeXB0KGVuY3J5cHRTdHIpXHJcbiAgICAgICAgICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJkZWNyeXB0U3RyID0gXCIgKyBkZWNyeXB0U3RyLnRyaW0oKSlcclxuICAgICAgICAgICAgICAgIHNpZ25fdXJsID0gc2lnbl91cmxfZmlyc3QgKyBzaWduX3VybF9ob3N0ICsgXCIvXCIgKyBlbmNyeXB0U3RyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiZGVhbEh0dHBTaWduIGFmdGVyIHNpZ25fdXJsID0gXCIgKyBzaWduX3VybClcclxuXHJcbiAgICAgICAgaHR0cFNpZ25JbmZvLnNpZ25fdXJsID0gc2lnbl91cmxcclxuICAgICAgICBodHRwU2lnbkluZm8uaGVhZFNpZ24gPSBoZWFkU2lnblxyXG4gICAgICAgIGh0dHBTaWduSW5mby5lbmRTaWduID0gZW5kU2lnblxyXG4gICAgICAgIHJldHVybiBodHRwU2lnbkluZm9cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8v5a+5c29ja2V0IHVybCDlpITnkIZcclxuICAgIHB1YmxpYyBkZWFsV2ViU29ja2V0VXJsKHNlcnZlclVybDogU2VydmVyVXJsKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAoc2VydmVyVXJsKSA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAvL+aNlemxvOS8muWPkXN0cmluZyB1cmzov4fmnaVcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImRlYWxXZWJTb2NrZXRVcmwgdXJsID0gc3RyaW5nXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBzZXJ2ZXJVcmxcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFkZHJlc3MgPSBzZXJ2ZXJVcmwuZ2V0VXJsKClcclxuXHJcbiAgICAgICAgaWYgKGFkZHJlc3MuaW5kZXhPZihcIi4uLlwiKSA+IDApIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImRlYWxXZWJTb2NrZXRVcmwgdXJsIGNvbnRhaW5zIC4uLiBcIilcclxuICAgICAgICAgICAgbGV0IGh0dHBTaWduSW5mbyA9IHRoaXMuZGVhbEh0dHBTaWduKHNlcnZlclVybClcclxuICAgICAgICAgICAgbGV0IHNpZ25fdXJsID0gaHR0cFNpZ25JbmZvLnNpZ25fdXJsXHJcbiAgICAgICAgICAgIHJldHVybiBzaWduX3VybFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8yMDAxNueJiOacrOW8gOWniyBpb3PmlK/mjIF3c3Mg5pSv5oyBaHR0cEROU1xyXG4gICAgICAgIGlmICggYWRkcmVzcy5zdGFydHNXaXRoKFwid3NzXCIpKSB7XHJcbiAgICAgICAgICAgIC8vd3Nz5Y2P6K6u55qE6Ieq5Yqo6L+U5ZueXHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCJkZWFsV2ViU29ja2V0VXJsIGFkZHJlc3Mgc3RhcnQgd3NzICB2ZXJzaW9uIDwgMjAwMTZcIilcclxuICAgICAgICAgICAgbGV0IGh0dHBTaWduSW5mbyA9IHRoaXMuZGVhbEh0dHBTaWduKHNlcnZlclVybClcclxuICAgICAgICAgICAgbGV0IHNpZ25fdXJsID0gaHR0cFNpZ25JbmZvLnNpZ25fdXJsXHJcbiAgICAgICAgICAgIHJldHVybiBzaWduX3VybFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcImRlYWxXZWJTb2NrZXRVcmwgZ2V0SHR0cFJlcXVlc3RETlNJbmZvIGJlZm9yZSBcIiArIHNlcnZlclVybC5wcmludFNlbGYoKSlcclxuICAgICAgICBHbG9iYWwuRE5TLmdldEh0dHBSZXF1ZXN0RE5TSW5mbyhzZXJ2ZXJVcmwsIDApO1xyXG4gICAgICAgIExvZ2dlci5sb2coXCJkZWFsV2ViU29ja2V0VXJsIGdldEh0dHBSZXF1ZXN0RE5TSW5mbyBhZnRlciBcIiArIHNlcnZlclVybC5wcmludFNlbGYoKSlcclxuICAgICAgICBsZXQgaHR0cFNpZ25JbmZvID0gdGhpcy5kZWFsSHR0cFNpZ24oc2VydmVyVXJsKVxyXG4gICAgICAgIGxldCBzaWduX3VybCA9IGh0dHBTaWduSW5mby5zaWduX3VybFxyXG4gICAgICAgIGlmICghc2lnbl91cmwpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImRlYWxXZWJTb2NrZXRVcmwgc2lnbl91cmwgZXJyb3IgXCIgKyBzZXJ2ZXJVcmwuZ2V0VXJsKCkpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdXJsID0gc2lnbl91cmxcclxuICAgICAgICBMb2dnZXIubG9nKFwiZGVhbFdlYlNvY2tldFVybCB1cmwgXCIsIHVybClcclxuXHJcbiAgICAgICAgcmV0dXJuIHVybFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRRdWVyeVN0cmluZyhzdWZmaXgsIG5hbWUpIHtcclxuICAgICAgICBsZXQgcmVnID0gbmV3IFJlZ0V4cCgnKFxcXFw/fCYpJyArIG5hbWUgKyAnPShbXiY/XSopJywgJ2knKTtcclxuICAgICAgICBsZXQgciA9IHN1ZmZpeC5tYXRjaChyZWcpO1xyXG4gICAgICAgIGlmIChyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZXNjYXBlKHJbMl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVwbGFjZVVybFBhcm1WYWwodXJsLCBwYXJhbU5hbWUsIHJlcGxhY2VWYWx1ZSkge1xyXG4gICAgICAgIGxldCB1cmxSZXQgPSB1cmxcclxuICAgICAgICBpZiAodXJsKSB7XHJcbiAgICAgICAgICAgIGxldCByZSA9IGV2YWwoJy8oJyArIHBhcmFtTmFtZSArICc9KShbXiZdKikvZ2knKTtcclxuICAgICAgICAgICAgbGV0IG5VcmwgPSB1cmwucmVwbGFjZShyZSwgcGFyYW1OYW1lICsgJz0nICsgcmVwbGFjZVZhbHVlKTtcclxuICAgICAgICAgICAgdXJsUmV0ID0gblVybFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXJsUmV0XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWZyZXNoU3VmZml4T3BlclRpbWUoc3VmZml4KSB7XHJcbiAgICAgICAgaWYgKHN1ZmZpeCkge1xyXG4gICAgICAgICAgICBsZXQgbl92YWx1ZSA9IHRoaXMuZ2V0UXVlcnlTdHJpbmcoc3VmZml4LCBcIm5cIilcclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwicmVmcmVzaFN1ZmZpeE9wZXJUaW1lIG5fdmFsdWUgPSBcIiArIG5fdmFsdWUpXHJcbiAgICAgICAgICAgIGlmIChuX3ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzdWZmaXggPSB0aGlzLnJlcGxhY2VVcmxQYXJtVmFsKHN1ZmZpeCwgXCJuXCIsIChuZXcgRGF0ZSgpKS52YWx1ZU9mKCkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG1fdmFsdWUgPSB0aGlzLmdldFF1ZXJ5U3RyaW5nKHN1ZmZpeCwgXCJtXCIpXHJcbiAgICAgICAgICAgIC8vIExvZ2dlci5lcnJvcihcInJlZnJlc2hTdWZmaXhPcGVyVGltZSBtX3ZhbHVlID0gXCIgKyBtX3ZhbHVlKVxyXG4gICAgICAgICAgICBpZiAobV92YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgc3VmZml4ID0gdGhpcy5yZXBsYWNlVXJsUGFybVZhbChzdWZmaXgsIFwibVwiLCB0aGlzLmdldFRpbWVFbmRGaXhQYXJhbSgpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIExvZ2dlci5lcnJvcihcInJlZnJlc2hTdWZmaXhPcGVyVGltZSBzdWZmaXggPSBcIiArIHN1ZmZpeClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1ZmZpeFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVmcmVzaFN1ZmZpeFJldHJ5VGltZShzdWZmaXg6IHN0cmluZywgdGltZXM6IG51bWJlcikge1xyXG5cclxuICAgICAgICBpZiAoIXN1ZmZpeClcclxuICAgICAgICAgICAgcmV0dXJuIHN1ZmZpeDtcclxuICAgICAgICBsZXQgY192YWx1ZSA9IHRoaXMuZ2V0UXVlcnlTdHJpbmcoc3VmZml4LCBcImNcIik7XHJcbiAgICAgICAgaWYgKCFjX3ZhbHVlKVxyXG4gICAgICAgICAgICBzdWZmaXggPSBzdWZmaXggKyBcIiZjPVwiICsgdGltZXM7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBzdWZmaXggPSB0aGlzLnJlcGxhY2VVcmxQYXJtVmFsKHN1ZmZpeCwgXCJjXCIsIHRpbWVzKTtcclxuICAgICAgICByZXR1cm4gc3VmZml4O1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy/liKTmlq3mmK/lkKbmmK9JUFxyXG4gICAgcHVibGljIGNoZWNrSXNJcChpcEFkZHJlc3MpIHtcclxuICAgICAgICBpZiAoaXBBZGRyZXNzKSB7XHJcbiAgICAgICAgICAgIGxldCByZSA9IC9eKFxcZHsxLDJ9fDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNV0pXFwuKFxcZHsxLDJ9fDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNV0pXFwuKFxcZHsxLDJ9fDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNV0pXFwuKFxcZHsxLDJ9fDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNV0pJC9cclxuICAgICAgICAgICAgaWYgKHJlLnRlc3QoaXBBZGRyZXNzKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy/ojrflj5boh6rnrb7lkI3or4Hkuabot6/lvoRcclxuICAgIHB1YmxpYyBnZXRTZWxmU2lnbkNlclBhdGgoY2VyTmFtZSkge1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgaWYgKGpzYiAmJiBqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KGNlck5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlsZUZ1bGxQYXRoID0ganNiLmZpbGVVdGlscy5mdWxsUGF0aEZvckZpbGVuYW1lKGNlck5hbWUpXHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwiZ2V0U2VsZlNpZ25DZXJQYXRoIGNlck5hbWUgZmlsZUZ1bGxQYXRoIFwiLCBjZXJOYW1lLCBmaWxlRnVsbFBhdGgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbGVGdWxsUGF0aDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJjZXJOYW1lIG5vdCBleGlzdCBcIiArIGNlck5hbWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gY2MudXJsLnJhdyhcInJlc291cmNlcy9oYWxsL2NlcnQvXCIgKyBjZXJOYW1lICsgXCIuY3J0XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/orr7nva7nur/ot6/nmoTmmK/lkKbpnIDopoHor4HkuaZcclxuICAgIHB1YmxpYyBzZXRSb3V0ZVVybENlcihzZXJ2ZXJVcmw6IFNlcnZlclVybCkge1xyXG4gICAgICAgIGxldCBjZXJEaXJGaWxlcyA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uY2VyRGlyRmlsZXNcclxuICAgICAgICBpZiAoY2VyRGlyRmlsZXMgJiYgY2VyRGlyRmlsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgaXNIYXNDZXJGaWxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2VyRGlyRmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBmaWxlRnVsbE5hbWUgPSBjZXJEaXJGaWxlc1tpXVxyXG4gICAgICAgICAgICAgICAgaWYgKGZpbGVGdWxsTmFtZSAmJiAoZmlsZUZ1bGxOYW1lLmluZGV4T2YoXCIuY2VyXCIpID4gLTEpIHx8IGZpbGVGdWxsTmFtZS5pbmRleE9mKFwiLmNydFwiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBBcnJheSA9IGZpbGVGdWxsTmFtZS5zcGxpdChcIi9cIilcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGFzdEZpbGVOYW1lID0gdGVtcEFycmF5W3RlbXBBcnJheS5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWxlTmFtZSA9IGxhc3RGaWxlTmFtZS5yZXBsYWNlKFwiLmNlclwiLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhZGRyZXNzSG9zdCA9IHNlcnZlclVybC5hZGRyZXNzSG9zdC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZGRyZXNzSG9zdC5pbmRleE9mKGZpbGVOYW1lLnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJjZXIgZmlsZSBuYW1lID0gXCIgKyBmaWxlTmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJjZXIgZmlsZUZ1bGxOYW1lICA9IFwiICsgZmlsZUZ1bGxOYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyVXJsLmNlck5hbWUgPSBmaWxlRnVsbE5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlclVybC5jZXJQYXRoID0gZmlsZUZ1bGxOYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0hhc0NlckZpbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMb2dnZXIubG9nKFwiYWRkcmVzc0hvc3QgXCIgKyBhZGRyZXNzSG9zdCArIFwiIG5vdCBjb250YWluIGNlciBob3N0IFwiICsgZmlsZU5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5rKh5pyJ6K+l5Z+f5ZCN55qEY2Vy5paH5Lu2XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCJpc0hhc0NlckZpbGUgPSBcIiArIGlzSGFzQ2VyRmlsZSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcImNlckRpckZpbGVzIGhhcyBubyBmaWxlXCIpXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLy/mo4Dmn6XmmK/lkKbmmK/lpJrmnaHlnLDlnYDlkIzkuIDkuKpob3N0XHJcbiAgICBwdWJsaWMgY2hlY2tJc011dGlMaW5lc1NhbWVIb3N0KGhvc3Q6c3RyaW5nKXtcclxuICAgICAgICBsZXQgcmV0ID0gZmFsc2VcclxuICAgICAgICBpZiAoIWhvc3Qpe1xyXG4gICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIExvZ2dlci5lcnJvcihcImNoZWNrSXNNdXRpTGluZXNTYW1lSG9zdCBlbnRlclwiIClcclxuICAgICAgICBmb3IgKGxldCBpID0gMCA7aTx0aGlzLm11dGlMaW5lc1NwbGl0Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBsZXQgc3BsaXRTdHIgPSB0aGlzLm11dGlMaW5lc1NwbGl0W2ldXHJcbiAgICAgICAgICAgIGlmIChob3N0LmluZGV4T2Yoc3BsaXRTdHIpID4gMCl7XHJcbiAgICAgICAgICAgICAgICByZXQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJjaGVja0lzTXV0aUxpbmVzU2FtZUhvc3QgcmV0IFwiICsgcmV0IClcclxuICAgICAgICByZXR1cm4gcmV0XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6I635Y+W5ZCMaG9zdOWkmuadoee6v+i3r+mbhuWQiFxyXG4gICAgcHVibGljIGdldE11dGlMaW5lc1NhbWVIb3N0KGhvc3Q6c3RyaW5nKXtcclxuICAgICAgICBsZXQgbGluZXMgPSBudWxsO1xyXG4gICAgICAgIGlmICghaG9zdCl7XHJcbiAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7aTwgdGhpcy5tdXRpTGluZXNTcGxpdC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgbGV0IHNwbGl0U3RyID0gdGhpcy5tdXRpTGluZXNTcGxpdFtpXVxyXG4gICAgICAgICAgICBpZiAoaG9zdC5pbmRleE9mKHNwbGl0U3RyKSA+IDAgKXtcclxuICAgICAgICAgICAgICAgIGxpbmVzID0gaG9zdC5zcGxpdChzcGxpdFN0cilcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIExvZ2dlci5lcnJvcihcImdldE11dGlMaW5lc1NhbWVIb3N0IGxpbmVzIFwiICsgSlNPTi5zdHJpbmdpZnkobGluZXMpIClcclxuICAgICAgICByZXR1cm4gbGluZXNcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRyYW5zZmVyVXJsQXJyYXlUb1JvdXRlcyh1cmxhcnJheSlcclxuICAgIHtcclxuICAgICAgICBpZighdXJsYXJyYXkgfHwgdXJsYXJyYXkubGVuZ3RoID09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdXJsYXJyYXlcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJvdXRlcyA9IFtdXHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB1cmxhcnJheS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgbGV0IHVybCA9IHVybGFycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gOmFueSA9IHtcclxuICAgICAgICAgICAgICAgIFwiaG9zdFwiOnVybCxcclxuICAgICAgICAgICAgICAgIFwidXJsX3R5cGVcIjoxLFxyXG4gICAgICAgICAgICAgICAgXCJ1c19wb3J0XCI6MCxcclxuICAgICAgICAgICAgICAgIFwibG9fdHlwZVwiOjBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3V0ZXMucHVzaChpdGVtKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcm91dGVzXHJcbiAgICB9XHJcblxyXG4gICAgLy/lpITnkIZ1cmzlhajpg6jkuIvlj5HmlrnlvI/lpJrnur/ot6/lkIxob3N06Zeu6aKYXHJcbiAgICBwdWJsaWMgZGVhbEZ1bGxVcmxXaXRoTXV0aUxpbmVzU2FtZUhvc3QodXJscyl7XHJcbiAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiZGVhbEZ1bGxVcmxXaXRoTXV0aUxpbmVzU2FtZUhvc3QgZW50ZXIgXCIgKyBKU09OLnN0cmluZ2lmeSh1cmxzKSlcclxuICAgICAgICBsZXQgbXV0aUxpbmVNYXAgPSBjYy5qcy5jcmVhdGVNYXAoKVxyXG4gICAgICAgIGlmICh1cmxzICYmIHVybHMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwIDtpIDwgdXJscy5sZW5ndGg7aSArKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXJsID0gdXJsc1tpXVxyXG4gICAgICAgICAgICAgICAgbGV0IHByb3RvY29sID0gJydcclxuICAgICAgICAgICAgICAgIGxldCBhZGRyZXNzID0gJydcclxuICAgICAgICAgICAgICAgIGxldCBwb3J0ID0gMFxyXG4gICAgICAgICAgICAgICAgbGV0IHN1ZmZpeCA9ICcnXHJcbiAgICAgICAgICAgICAgICBpZiAodXJsLnN0YXJ0c1dpdGgoXCJodHRwc1wiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2wgPSBcImh0dHBzXCJcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmICh1cmwuc3RhcnRzV2l0aChcImh0dHBcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3RvY29sID0gXCJodHRwXCJcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmICh1cmwuc3RhcnRzV2l0aChcIndzc1wiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2wgPSBcIndzc1wiXHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZiAodXJsLnN0YXJ0c1dpdGgoXCJ3c1wiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2wgPSBcIndzXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBhcnJzID0gdXJsLnNwbGl0KFwiLy9cIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wVXJsID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFycnMubGVuZ3RoID4gMSlcclxuICAgICAgICAgICAgICAgICAgICB0bXBVcmwgPSBhcnJzWzFdO1xyXG4gICAgICAgICAgICAgICAgYXJycyA9IHRtcFVybC5zcGxpdChcIi9cIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgaG9zdCA9IGFycnNbMF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaG9zdC5pbmRleE9mKFwiOlwiKSA+IC0xKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3MgPSBob3N0LnNwbGl0KFwiOlwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9ydCA9IGhvc3Quc3BsaXQoXCI6XCIpWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3J0ICYmIE51bWJlcihwb3J0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3J0ID0gTnVtYmVyKHBvcnQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3MgPSBob3N0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJycy5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTtpPGFycnMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1ZmZpeCA9IHN1ZmZpeCArIFwiL1wiICsgYXJyc1tpXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIExvZ2dlci5lcnJvcihcImRlYWxGdWxsVXJsV2l0aE11dGlMaW5lc1NhbWVIb3N0IGFkZHJlc3MgXCIgKyBhZGRyZXNzKVxyXG4gICAgICAgICAgICAgICAgaWYgKGFkZHJlc3MgJiYgYWRkcmVzcy5pbmRleE9mKFwiLi4uXCIpID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFkZHJlc3NfYXJyYXkgPSBhZGRyZXNzLnNwbGl0KFwiLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhZGRyZXNzX2FycmF5ICYmIGFkZHJlc3NfYXJyYXkubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhZGRyZXNzX3JlYWwgPSBhZGRyZXNzX2FycmF5WzBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhZGRyZXNzX2hvc3QgPSBhZGRyZXNzX2FycmF5WzFdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrSXNNdXRpTGluZXNTYW1lSG9zdChhZGRyZXNzX3JlYWwpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExvZ2dlci5lcnJvcihcImNoZWNrSXNNdXRpTGluZXNTYW1lSG9zdCBhZGRyZXNzX3JlYWwgXCIgKyBhZGRyZXNzX3JlYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbXV0aUxpbmVzID0gdGhpcy5nZXRNdXRpTGluZXNTYW1lSG9zdChhZGRyZXNzX3JlYWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobXV0aUxpbmVzICYmIG11dGlMaW5lcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3VyTGluZXMgPSBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExvZ2dlci5lcnJvcihcImNoZWNrSXNNdXRpTGluZXNTYW1lSG9zdCBtdXRpTGluZXMgXCIgKyBKU09OLnN0cmluZ2lmeShtdXRpTGluZXMpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwO2kgPG11dGlMaW5lcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxpbmVIb3N0ID0gbXV0aUxpbmVzW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5lUG9ydCA9IHBvcnQgPyBcIjpcIiArIHBvcnQgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5lVXJsID0gcHJvdG9jb2wgKyBcIjovL1wiICsgbGluZUhvc3QgKyBcIi4uLlwiICsgYWRkcmVzc19ob3N0ICsgbGluZVBvcnQgKyBzdWZmaXhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyTGluZXMucHVzaChsaW5lVXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdXRpTGluZU1hcFt1cmxdID0gY3VyTGluZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJtdXRpTGluZU1hcCBcIiAsSlNPTi5zdHJpbmdpZnkobXV0aUxpbmVNYXApKVxyXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gbXV0aUxpbmVNYXApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gbXV0aUxpbmVNYXBba2V5XVxyXG4gICAgICAgICAgICAgICAgbGV0IGtleV9pbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9MDtpPHVybHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVybF92YWx1ZSA9IHVybHNbaV1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodXJsX3ZhbHVlID09IGtleSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleV9pbmRleCA9IGlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJrZXlfaW5kZXggXCIgKyBrZXlfaW5kZXgpXHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5X2luZGV4ID4gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybHMuc3BsaWNlKGtleV9pbmRleCwxKVxyXG4gICAgICAgICAgICAgICAgICAgIHVybHMgPSB2YWx1ZS5jb25jYXQodXJscylcclxuICAgICAgICAgICAgICAgIH0gICBcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImRlYWxGdWxsVXJsV2l0aE11dGlMaW5lc1NhbWVIb3N0IHVybHMgPSBcIiArIEpTT04uc3RyaW5naWZ5KHVybHMpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXJsc1xyXG4gICAgfVxyXG4gICAgcHVibGljIGZvcm1hdFNlcnZlclVybChoZWFkOiBzdHJpbmcsIGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHVybCA9ICcnXHJcbiAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiZm9ybWF0U2VydmVyVXJsIGhlYWQgPSBcIiArIGhlYWQpXHJcbiAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiZm9ybWF0U2VydmVyVXJsIGhvc3QgPSBcIiArIGhvc3QpXHJcbiAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiZm9ybWF0U2VydmVyVXJsIHBvcnQgPSBcIiArIHBvcnQpXHJcblxyXG4gICAgICAgIC8vaG9zdOW4puWfn+WQjVxyXG4gICAgICAgIGlmIChob3N0LmluZGV4T2YoXCIuLi5cIikgPiAwKSB7XHJcbiAgICAgICAgICAgIC8v5by65Yi26L2sd3MgaHR0cHMg5by66L2saHR0cFxyXG4gICAgICAgICAgICBpZiAoaGVhZC5zdGFydHNXaXRoKFwid3NzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBoZWFkID0gXCJ3czovL1wiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGhvc3RBcnJheSA9IGhvc3Quc3BsaXQoXCIuLi5cIilcclxuICAgICAgICAgICAgbGV0IGlwUG9ydFVybCA9IGhvc3RBcnJheVswXVxyXG4gICAgICAgICAgICBpZiAoaXBQb3J0VXJsLmluZGV4T2YoXCI6XCIpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhlYWQuc3RhcnRzV2l0aChcImh0dHBzXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZCA9IFwiaHR0cDovL1wiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImhlYWQgbm90IHN0YXJ0c1dpdGggaHR0cHMgXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJpcFBvcnRVcmwgbm90IDpcIilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgdXJsID0gaGVhZCArIGhvc3Q7XHJcbiAgICAgICAgaWYgKHBvcnQgIT0gbnVsbCAmJiBwb3J0ICE9IDAgJiYgcG9ydCAhPSA4MCAmJiBwb3J0ICE9IDQ0MylcclxuICAgICAgICAgICAgdXJsID0gdXJsICsgXCI6XCIgKyBwb3J0O1xyXG4gICAgICAgIC8vIExvZ2dlci5lcnJvcihcImZvcm1hdFNlcnZlclVybCB1cmwgPSBcIiArIHVybClcclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdXJsIOmTvuaOpVxyXG4gICAgICogQHBhcmFtIHBhcmFtIOmcgOimgeabv+aNoueahOWtl+autVxyXG4gICAgICogQHBhcmFtIG5hbWUg55uu5qCH5a2X5q61XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXBsYWNlVXJsUGFyYW0odXJsLHBhcmFtTGlzdClcclxuICAgIHtcclxuICAgICAgICBpZiAoIXVybClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVybCA9IEdsb2JhbC5Ub29sa2l0LnN0clJlcGxhY2VDdHJDaGFyKHVybClcclxuICAgICAgICBsZXQgdXJsUGFyYW1BcnIgPSB1cmwuc3BsaXQoJz8nKVxyXG4gICAgICAgIGlmICh1cmxQYXJhbUFyci5sZW5ndGggPDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmsqHmnInpop3lpJblj4LmlbBcIilcclxuICAgICAgICAgICAgcmV0dXJuIHVybFxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdG1wUGFyYW0gOnN0cmluZyA9IHVybFBhcmFtQXJyWzFdXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpPHBhcmFtTGlzdC5sZW5ndGg7aSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtID0gcGFyYW1MaXN0W2ldXHJcbiAgICAgICAgICAgIGxldCBsYXN0SW5kZXggPSB1cmxQYXJhbUFyclsxXS5sYXN0SW5kZXhPZihwYXJhbVtcInBhcmFtXCJdKVxyXG4gICAgICAgICAgICBpZiAobGFzdEluZGV4ICE9IC0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB1cmxQYXJhbUFyclsxXSA9IHVybFBhcmFtQXJyWzFdLnN1YnN0cigwLCBsYXN0SW5kZXgpICsgcGFyYW1bXCJ2YWx1ZVwiXSsgdXJsUGFyYW1BcnJbMV0uc3Vic3RyKGxhc3RJbmRleCArIHBhcmFtW1wicGFyYW1cIl0ubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcmV0dXJuICB1cmxQYXJhbUFyci5qb2luKCc/JylcclxuICAgIH1cclxuXHJcbn0iXX0=