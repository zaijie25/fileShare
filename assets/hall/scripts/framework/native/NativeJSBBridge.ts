import HallStorageKey from "../../logic/hallcommon/const/HallStorageKey";

export default class NativeJSBBridge {
    jsbBridge:any;
    clickGames:string[];
    REPORT_CLICK_GAME_KEY = "clickGame";
    constructor(){
        this.clickGames = [];
    }

    public init(){
        if(CC_PREVIEW)
            return;
        if(cc.sys.isBrowser)
            return;
        if (Global.Toolkit.checkVersionSupport(20009)){
            if(cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS){
                if (native && native.JSBBridge){
                    this.jsbBridge = native.JSBBridge.getInstance();
                }
            }
        }
    }

    addClickGames(gameid:string){
        if (gameid && gameid != null){
            this.clickGames[this.clickGames.length] = gameid
        }
        let uid = Global.Setting.storage.get(HallStorageKey.Uid) || 'guest'
        this.setBuglyUserID(uid)
        this.addBuglyUserValue(this.REPORT_CLICK_GAME_KEY,JSON.stringify(this.clickGames))
    }
    /**
     * 打印本地日志
     * @param level 1 2 3 4 
     * @param tag 
     * @param msg 标题
     * @returns null
     */
    log(level:number,tag:string,msg:string){
        if (this.jsbBridge && this.jsbBridge.log){
            this.jsbBridge.log(level,tag,msg)
        }
    }

    /**
     * 设置上报UserID
     * @param userID
     * @returns null 
     */
    setBuglyUserID(userID:string){
        if (this.jsbBridge && this.jsbBridge.setBuglyUserID){
            this.jsbBridge.setBuglyUserID(userID)
        }
    }

    /**
     * 设置上报Tag
     * @param userID 
     * @returns null
     */
    setBuglyTag(tag:number){
        if (this.jsbBridge && this.jsbBridge.setBuglyTag){
            this.jsbBridge.setBuglyTag(tag)
        }
    }

    /**
     * 设置上报玩家自定义信息
     * @param key  
     * @param value  
     * @returns null
     */
    addBuglyUserValue(key:string,value:string){
        if (this.jsbBridge && this.jsbBridge.addBuglyUserValue){
            this.jsbBridge.addBuglyUserValue(key,value)
        }
    }

    /**
     * 移除上报玩家自定义信息
     * @param key  
     * @returns null
     */
    removeBuglyUserValue(key:string){
        if (this.jsbBridge && this.jsbBridge.removeBuglyUserValue){
            this.jsbBridge.removeBuglyUserValue(key)
        }
    }

    /**
     * 设置bugly 上报错误信息
     * @param msg  
     * @param stack  
     * @returns null
     */
    reportException(msg:string,stack:string){
        if (this.jsbBridge && this.jsbBridge.reportException){
            this.jsbBridge.reportException(msg,stack)
        }
    }

    /**
     * 设置bugly AppID
     * @param appID  
     * @returns null
     */
    setBuglyAppID(appID:string){
        if (this.jsbBridge && this.jsbBridge.setBuglyAppID){
            this.jsbBridge.setBuglyAppID(appID)
        }
    }

    /**
     * 设置bugly 渠道id
     * @param channel  
     * @returns null
     */
    setBuglyAppChannel(channel:string){
        if (this.jsbBridge && this.jsbBridge.setBuglyAppChannel){
            this.jsbBridge.setBuglyAppChannel(channel)
        }
    }

    /**
     * 设置bugly 上报原生版本号
     * @param channel  
     * @returns null
     */
    setBuglyAppVersion(version:string){
        if (this.jsbBridge && this.jsbBridge.setBuglyAppVersion){
            this.jsbBridge.setBuglyAppVersion(version)
        }
    }

    /**
     * 解密数据
     * @param encryptData  
     * @returns string 解密数据
     */
    decryptData(encryptData: string){
        if (this.jsbBridge && this.jsbBridge.decryptData){
            let retData = this.jsbBridge.decryptData(encryptData)
            if (retData){
                retData = Global.Toolkit.strReplaceCtrChar(retData);
            }
            // Logger.error("decryptData = " + retData)
            return retData;
        }
    }

    /**
     * 获取加密数据
     * @param sign_key
     * @param deviceId   
     * @returns string 加密数据
     */
    getLoginSign(sign_key: string, deviceId: string){
        if (this.jsbBridge && this.jsbBridge.getLoginSign){
            let retData = this.jsbBridge.getLoginSign(sign_key,deviceId)
            // Logger.error("getLoginSign = " + retData)
            return retData;
        }
    }


    /**
     * 获取总内存
     * @param null 
     * @returns int 总内存
     */
    getTotalMem(){
        if (this.jsbBridge && this.jsbBridge.getTotalMem){
            let retData = this.jsbBridge.getTotalMem()
            Logger.error("getTotalMem = " + retData)
            return retData;
        }
    }
    
    /**
     * 获取剩余可用内存
     * @param null 
     * @returns int 可用内存
     */
    getFreeMem(){
        if (this.jsbBridge && this.jsbBridge.getFreeMem){
            let retData = this.jsbBridge.getFreeMem()
            Logger.error("getFreeMem = " + retData)
            return retData;
        }
    }

    /**
     * 获取已用内存(IOS 可以获取 Android 获取不了)
     * @param null 
     * @returns int 已用内存
     */
    getUsedMem(){
        if (this.jsbBridge && this.jsbBridge.getUsedMem){
            let retData = this.jsbBridge.getUsedMem()
            Logger.error("getUsedMem = " + retData)
            return retData;
        }
    }

    // /**
    //  * 开启获取网络延迟
    //  * @param null 
    //  * @returns 
    //  */
    // startGetNetDelay(hostName:string){
    //     Logger.error("startGetNetDelay = hostName " + hostName)
    //     if (this.jsbBridge && this.jsbBridge.startGetNetDelay){
    //         this.jsbBridge.startGetNetDelay(hostName)
    //     }
    // }

    // /**
    //  * 停止获取网络延迟
    //  * @param null 
    //  * @returns 
    //  */
    // stopGetNetDelay(){
    //     if (this.jsbBridge && this.jsbBridge.stopGetNetDelay){
    //         this.jsbBridge.stopGetNetDelay()
    //     }
    // }

    // /**
    //  * 获取网络延迟
    //  * @param null 
    //  * @returns 
    //  */
    // getNetDelay(){
    //     if (this.jsbBridge && this.jsbBridge.getNetDelay){
    //         let retData = this.jsbBridge.getNetDelay()
    //         Logger.error("getNetDelay = " + retData)
    //         return retData;
    //     }
    // }
}