"use strict";
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