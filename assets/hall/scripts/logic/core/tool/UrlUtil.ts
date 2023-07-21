/**
 * 对Url操作的工具类
 * @author Peter
 * 
*/

import HallStorageKey from "../../hallcommon/const/HallStorageKey";
import { ServerUrl } from "../setting/ServerRoutes";


export class UrlUtil {
    private mutiLinesSplit = [",",";","|"]

    public getHostFromUrl(url: string) {
        if (url == null || url == "")
            return url;
        let arrs = url.split("//");
        let tmpUrl = url;
        if (arrs.length > 1)
            tmpUrl = arrs[1];
        arrs = tmpUrl.split("/");
        let host = arrs[0];
        if (host.indexOf(":") > -1)
            host = host.split(":")[0];
        return host;
    }

    public getPortFromUrl(url: string) {
        if (url == null || url == "")
            return null;
        let arrs = url.split("//");
        let tmpUrl = url;
        if (arrs.length > 1)
            tmpUrl = arrs[1];
        arrs = tmpUrl.split("/");
        let hostUrl = arrs[0];
        let port = null
        if (hostUrl.indexOf(":") > -1)
            port = hostUrl.split(":")[1];
        if (port && Number(port)) {
            return Number(port)
        }
        return null;
    }

    domainURI(str_url) {
        if (!str_url) {
            return ""
        }
        let domain = str_url.split('/')
        let domainUrl = ''
        if (domain[2]) {
            domainUrl = domain[0] + "//" + domain[2]
        }
        return domainUrl
    }

    public getHttpReffer(url: string) {
        let urlSubStr = this.domainURI(url)
        let newUrl = url.replace(urlSubStr, "");
        let sign = this.getPlatformSign(newUrl)
        // Logger.error("getHttpReffer new url = " + newUrl + " sign = " + sign)
        return sign;
    }

    public getPlatformSign(content: string, key?: string) {
        if (!key) {
            key = Global.Setting.signKey
        }
        let sign = null;
        if (cc.sys.isNative) {
            let retObj = Global.NativeEvent.getLoginSign(key, content)
            if (retObj && retObj.result == 0) {
                sign = retObj.funcParam
            } else {
                sign = this.getSign(key, content);
            }
        } else {
            sign = this.getSign(key, content);
        }
        return sign;
    }

    public getSign(key: string, content: string) {
        let msg: string = Global.AESUtil.md5(content);
        msg = msg.substring(0, msg.length / 2)
        let checkKey = Global.AESUtil.md5(key)
        checkKey = checkKey.substring(checkKey.length / 2)
        let data = Global.AESUtil.md5(msg + checkKey);
        data = data.substring(5, 15)
        return data;
    }


    public dealServerUrl(serverUrl: ServerUrl, port: number) {
        let address = serverUrl.address
        let protocol = serverUrl.protocol
        if (address.indexOf("...") > 0) {
            //强制转ws https 强转http
            if (protocol.startsWith("wss")) {
                protocol = "ws://"
            }
            let hostArray = address.split("...")
            let ipPortUrl = hostArray[0]
            if (ipPortUrl.indexOf(":") > 0) {
                if (protocol.startsWith("https")) {
                    protocol = "http://"
                } else {
                    Logger.error("head not startsWith https ")
                }
            } else {
                Logger.error("ipPortUrl not :")
            }
            serverUrl.protocol = protocol
        }
        if (port != null && port != 0 && port != 80 && port != 443)
            serverUrl.port = port
    }


    /**
     * 返回wss证书文件路径
     */
    public getCacertPath() {

        if (jsb && jsb.fileUtils.isFileExist("cacert.pem")) {
            let fileFullPath = jsb.fileUtils.fullPathForFilename("cacert.pem")
            Logger.error("use native path", fileFullPath);
            return fileFullPath;
        }
        //return jsb.fileUtils.getWritablePath() + '/gameUpdate/hall/' + cc.url.raw("resources/hall/cacert1.pem");
        return cc.url.raw("resources/hall/cacert1.pem");
    }


    public DealWithUrl(url: string) {

        if (typeof (url) != "string" || !url) {
            Logger.error("链接格式不对")
            return null
        }
        return url.replace("\t", "").trim()

    }


    //获取Url 前缀flag
    public getUrlParamCommonPrefex() {
        let appId = this.EncodeAppid(Global.Setting.appId);
        // Logger.error("appId = " + appId)
        return "_" + appId + "/"
    }


    decimalDict = "fgHijUvWXAbcdEyzKLMnOpqRst"

    // 10进制转任意进制
    public EncodeAppid(appid: number) {
        let new_num_str = ""
        let remainder = 0
        let remainder_string = ""
        let nn = 26
        let num = Number(appid)

        do {
            remainder = num % nn
            if (nn > remainder && remainder >= 0) {
                remainder_string = this.decimalDict.substring(remainder, remainder + 1)
            } else {
                remainder_string = remainder.toString()
            }
            new_num_str = remainder_string + new_num_str
            num = Math.floor(num / nn)
        } while (num != 0)

        return new_num_str
    }


     //获取url 参数
     public getUrlCommonParam() {
        // let encodeUrl = Global.Toolkit.getRequestEncodeData()
        let timeStr = this.getTimeEndFixParam();
        let param = "uid=" + Global.PlayerData.uid + "&token=" + Global.PlayerData.token + "&appver=" + Global.Setting.SystemInfo.appVersion + "&os=" + Global.Toolkit.getOsType() + "&m=" + timeStr;
        return param;
    }

    
     //获取登录前和登录中通用参数
     public getLoginCommonParam(){
        let uid = Number(Global.Setting.storage.get(HallStorageKey.Uid)) || 0;
        let timeStr = this.getTimeEndFixParam();
        let param = "uid=" + uid  + "&appver=" + Global.Setting.SystemInfo.appVersion + "&os=" + Global.Toolkit.getOsType() + "&n=" + (new Date()).valueOf() + "&m=" + timeStr ;
        return param;
    }

  //获取时间字符串
  public getTimeEndFixParam() {
    let date = new Date()
    let timeStr = date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + date.getMilliseconds()
    return timeStr
}

    //处理http sign
    public dealHttpSign(serverUrl: ServerUrl) {
        let url = serverUrl.getUrl()
        let httpSignInfo = { "sign_url": "", "headSign": "", "endSign": "" }
        let sign_url = this.refreshSuffixOperTime(url)
        let s_value = this.getQueryString(sign_url, "s")
        let headSign = ""
        let endSign = ""
        let linkSymbol = sign_url.indexOf('?') > 0 && "&s=" || "?s=";
        if (!s_value) {
            headSign = this.getHttpReffer(sign_url)
            endSign = this.getHttpReffer(sign_url + linkSymbol + headSign)
            // Logger.error("dealHttpSign url with 4444")
            sign_url = sign_url + linkSymbol + endSign
        } else {
            let replaceUrl = sign_url.replace("&s=" + s_value, "")
            headSign = this.getHttpReffer(replaceUrl)
            endSign = this.getHttpReffer(replaceUrl + linkSymbol + headSign)
            // Logger.error("dealHttpSign url with 5555")
            sign_url = replaceUrl + linkSymbol + endSign
        }
        // Logger.error("dealHttpSign before sign_url = " + sign_url)
        if (serverUrl.isEncrptUrl) {
            let sign_url_host = this.getHostFromUrl(sign_url)
            // let sign_url_port = this.getPortFromUrl(sign_url)
            let sign_url_array = sign_url.split(sign_url_host)
            if (sign_url_array && sign_url_array.length > 0) {
                let sign_url_first = sign_url_array[0]
                let sign_url_second = sign_url_array[1]
                let encryptStr = Global.AESUtil.aesEncryptWithCommonKey(sign_url_second)
                // let decryptStr = this.aesDecrypt(encryptStr)
                // Logger.error("decryptStr = " + decryptStr.trim())
                sign_url = sign_url_first + sign_url_host + "/" + encryptStr
            }
        }
        // Logger.error("dealHttpSign after sign_url = " + sign_url)

        httpSignInfo.sign_url = sign_url
        httpSignInfo.headSign = headSign
        httpSignInfo.endSign = endSign
        return httpSignInfo
    }



    //对socket url 处理
    public dealWebSocketUrl(serverUrl: ServerUrl) {
        if (typeof (serverUrl) == 'string') {
            //捕鱼会发string url过来
            Logger.log("dealWebSocketUrl url = string")
            return serverUrl
        }
        let address = serverUrl.getUrl()

        if (address.indexOf("...") > 0) {
            Logger.log("dealWebSocketUrl url contains ... ")
            let httpSignInfo = this.dealHttpSign(serverUrl)
            let sign_url = httpSignInfo.sign_url
            return sign_url
        }

        //20016版本开始 ios支持wss 支持httpDNS
        if ( address.startsWith("wss")) {
            //wss协议的自动返回
            Logger.log("dealWebSocketUrl address start wss  version < 20016")
            let httpSignInfo = this.dealHttpSign(serverUrl)
            let sign_url = httpSignInfo.sign_url
            return sign_url
        }

        Logger.log("dealWebSocketUrl getHttpRequestDNSInfo before " + serverUrl.printSelf())
        Global.DNS.getHttpRequestDNSInfo(serverUrl, 0);
        Logger.log("dealWebSocketUrl getHttpRequestDNSInfo after " + serverUrl.printSelf())
        let httpSignInfo = this.dealHttpSign(serverUrl)
        let sign_url = httpSignInfo.sign_url
        if (!sign_url) {
            Logger.log("dealWebSocketUrl sign_url error " + serverUrl.getUrl())
            return
        }
        let url = sign_url
        Logger.log("dealWebSocketUrl url ", url)

        return url
    }

    public getQueryString(suffix, name) {
        let reg = new RegExp('(\\?|&)' + name + '=([^&?]*)', 'i');
        let r = suffix.match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    public replaceUrlParmVal(url, paramName, replaceValue) {
        let urlRet = url
        if (url) {
            let re = eval('/(' + paramName + '=)([^&]*)/gi');
            let nUrl = url.replace(re, paramName + '=' + replaceValue);
            urlRet = nUrl
        }
        return urlRet

    }

    public refreshSuffixOperTime(suffix) {
        if (suffix) {
            let n_value = this.getQueryString(suffix, "n")
            // Logger.error("refreshSuffixOperTime n_value = " + n_value)
            if (n_value) {
                suffix = this.replaceUrlParmVal(suffix, "n", (new Date()).valueOf())
            }
            let m_value = this.getQueryString(suffix, "m")
            // Logger.error("refreshSuffixOperTime m_value = " + m_value)
            if (m_value) {
                suffix = this.replaceUrlParmVal(suffix, "m", this.getTimeEndFixParam())
            }
            // Logger.error("refreshSuffixOperTime suffix = " + suffix)
        }
        return suffix

    }

    public refreshSuffixRetryTime(suffix: string, times: number) {

        if (!suffix)
            return suffix;
        let c_value = this.getQueryString(suffix, "c");
        if (!c_value)
            suffix = suffix + "&c=" + times;
        else
            suffix = this.replaceUrlParmVal(suffix, "c", times);
        return suffix;
    }



    //判断是否是IP
    public checkIsIp(ipAddress) {
        if (ipAddress) {
            let re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
            if (re.test(ipAddress)) {
                return true;
            }
        }
        return false;
    }
    //获取自签名证书路径
    public getSelfSignCerPath(cerName) {
        if (cc.sys.isNative) {
            if (jsb && jsb.fileUtils.isFileExist(cerName)) {
                let fileFullPath = jsb.fileUtils.fullPathForFilename(cerName)
                Logger.log("getSelfSignCerPath cerName fileFullPath ", cerName, fileFullPath);
                return fileFullPath;
            } else {
                Logger.log("cerName not exist " + cerName)
            }
        } else {
            return cc.url.raw("resources/hall/cert/" + cerName + ".crt");
        }
    }


    //设置线路的是否需要证书
    public setRouteUrlCer(serverUrl: ServerUrl) {
        let cerDirFiles = Global.Setting.SystemInfo.cerDirFiles
        if (cerDirFiles && cerDirFiles.length > 0) {
            let isHasCerFile = false;
            for (let i = 0; i < cerDirFiles.length; i++) {
                let fileFullName = cerDirFiles[i]
                if (fileFullName && (fileFullName.indexOf(".cer") > -1) || fileFullName.indexOf(".crt") > -1) {
                    let tempArray = fileFullName.split("/")
                    let lastFileName = tempArray[tempArray.length - 1]
                    let fileName = lastFileName.replace(".cer", "")
                    let addressHost = serverUrl.addressHost.toLowerCase()
                    if (fileName) {
                        if (addressHost.indexOf(fileName.toLowerCase()) > -1) {
                            Logger.log("cer file name = " + fileName)
                            Logger.log("cer fileFullName  = " + fileFullName)
                            serverUrl.cerName = fileFullName
                            serverUrl.cerPath = fileFullName
                            isHasCerFile = true;
                            break;
                        } else {
                            // Logger.log("addressHost " + addressHost + " not contain cer host " + fileName)
                        }
                    }

                }
            }
            //没有该域名的cer文件
            Logger.log("isHasCerFile = " + isHasCerFile)
            
        } else {
            Logger.log("cerDirFiles has no file")
           
        }
    }



    //检查是否是多条地址同一个host
    public checkIsMutiLinesSameHost(host:string){
        let ret = false
        if (!host){
            return 
        }
        // Logger.error("checkIsMutiLinesSameHost enter" )
        for (let i = 0 ;i<this.mutiLinesSplit.length;i++){
            let splitStr = this.mutiLinesSplit[i]
            if (host.indexOf(splitStr) > 0){
                ret = true
                break;
            }
        }
        // Logger.error("checkIsMutiLinesSameHost ret " + ret )
        return ret
    }
    
    //获取同host多条线路集合
    public getMutiLinesSameHost(host:string){
        let lines = null;
        if (!host){
            return 
        }
        for (let i = 0;i< this.mutiLinesSplit.length;i++){
            let splitStr = this.mutiLinesSplit[i]
            if (host.indexOf(splitStr) > 0 ){
                lines = host.split(splitStr)
                break;
            }
        }
        // Logger.error("getMutiLinesSameHost lines " + JSON.stringify(lines) )
        return lines

    }

    public transferUrlArrayToRoutes(urlarray)
    {
        if(!urlarray || urlarray.length == 0)
        {
            return urlarray
        }
        let routes = []

        for (let index = 0; index < urlarray.length; index++) {
            let url = urlarray[index];
            let item :any = {
                "host":url,
                "url_type":1,
                "us_port":0,
                "lo_type":0
            }
            routes.push(item)
        }
        return routes
    }

    //处理url全部下发方式多线路同host问题
    public dealFullUrlWithMutiLinesSameHost(urls){
        // Logger.error("dealFullUrlWithMutiLinesSameHost enter " + JSON.stringify(urls))
        let mutiLineMap = cc.js.createMap()
        if (urls && urls.length > 0){
            for (let i = 0 ;i < urls.length;i ++){
                let url = urls[i]
                let protocol = ''
                let address = ''
                let port = 0
                let suffix = ''
                if (url.startsWith("https")){
                    protocol = "https"
                }else if (url.startsWith("http")){
                    protocol = "http"
                }else if (url.startsWith("wss")){
                    protocol = "wss"
                }else if (url.startsWith("ws")){
                    protocol = "ws"
                }
                let arrs = url.split("//");
                let tmpUrl = url;
                if (arrs.length > 1)
                    tmpUrl = arrs[1];
                arrs = tmpUrl.split("/");
                let host = arrs[0];
                if (host.indexOf(":") > -1)
                {
                    address = host.split(":")[0];
                    let port = host.split(":")[1];
                    if (port && Number(port)) {
                        port = Number(port)
                    }
                }else {
                    address = host
                }
                if (arrs.length > 1){
                    for (let i = 1;i<arrs.length;i++){
                        suffix = suffix + "/" + arrs[i]
                    }
                }
                // Logger.error("dealFullUrlWithMutiLinesSameHost address " + address)
                if (address && address.indexOf("...") > 0){
                    let address_array = address.split("...");
                    if (address_array && address_array.length > 0){
                        let address_real = address_array[0]
                        let address_host = address_array[1]
                        if (this.checkIsMutiLinesSameHost(address_real)){
                            // Logger.error("checkIsMutiLinesSameHost address_real " + address_real)
                            let mutiLines = this.getMutiLinesSameHost(address_real)
                            if (mutiLines && mutiLines.length > 0){
                                let curLines = []
                                // Logger.error("checkIsMutiLinesSameHost mutiLines " + JSON.stringify(mutiLines))
                                for (let i = 0;i <mutiLines.length;i++){
                                    let lineHost = mutiLines[i]
                                    let linePort = port ? ":" + port : ""
                                    let lineUrl = protocol + "://" + lineHost + "..." + address_host + linePort + suffix
                                    curLines.push(lineUrl)
                                }
                                mutiLineMap[url] = curLines
                            }
                        }
                    }
                }
            }
            // Logger.error("mutiLineMap " ,JSON.stringify(mutiLineMap))
            for (let key in mutiLineMap){
                let value = mutiLineMap[key]
                let key_index = -1;
                for (let i =0;i<urls.length;i++){
                    let url_value = urls[i]
                    if (url_value == key){
                        key_index = i
                    }
                }
                // Logger.error("key_index " + key_index)
                if (key_index > -1){
                    urls.splice(key_index,1)
                    urls = value.concat(urls)
                }   
                Logger.error("dealFullUrlWithMutiLinesSameHost urls = " + JSON.stringify(urls))
            }
            
        }
        return urls
    }
    public formatServerUrl(head: string, host: string, port: number) {
        let url = ''
        // Logger.error("formatServerUrl head = " + head)
        // Logger.error("formatServerUrl host = " + host)
        // Logger.error("formatServerUrl port = " + port)

        //host带域名
        if (host.indexOf("...") > 0) {
            //强制转ws https 强转http
            if (head.startsWith("wss")) {
                head = "ws://"
            }
            let hostArray = host.split("...")
            let ipPortUrl = hostArray[0]
            if (ipPortUrl.indexOf(":") > 0) {
                if (head.startsWith("https")) {
                    head = "http://"
                } else {
                    Logger.error("head not startsWith https ")
                }
            } else {
                Logger.error("ipPortUrl not :")
            }

        }
        url = head + host;
        if (port != null && port != 0 && port != 80 && port != 443)
            url = url + ":" + port;
        // Logger.error("formatServerUrl url = " + url)
        return url;
    }

    /**
     * 
     * @param url 链接
     * @param param 需要替换的字段
     * @param name 目标字段
     */
    public replaceUrlParam(url,paramList)
    {
        if (!url)
        {
            return url;
        }
        url = Global.Toolkit.strReplaceCtrChar(url)
        let urlParamArr = url.split('?')
        if (urlParamArr.length <2)
        {
            Logger.error("没有额外参数")
            return url
        }
        let tmpParam :string = urlParamArr[1]
        for(let i = 0;i<paramList.length;i++)
        {
            let param = paramList[i]
            let lastIndex = urlParamArr[1].lastIndexOf(param["param"])
            if (lastIndex != -1)
            {
                urlParamArr[1] = urlParamArr[1].substr(0, lastIndex) + param["value"]+ urlParamArr[1].substr(lastIndex + param["param"].length);
            }
        }
        

        return  urlParamArr.join('?')
    }

}