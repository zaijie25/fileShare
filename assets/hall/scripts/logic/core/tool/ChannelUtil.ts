/**
 * 渠道相关的工具类
 * @author Peter
 * 
*/

import { ReportTool } from "./ReportTool";
import Setting from "../setting/Setting";
import HallStorageKey from "../../hallcommon/const/HallStorageKey";



export class ChannelUtil {
   
    public getUuid()
    {
        if (cc.sys.os == cc.sys.OS_IOS) {
            Global.NativeEvent.getInfoPlistParam("udid", (info) => {
                Global.Setting.SystemInfo.udid = info.funcParam;
            })
        }
    }

    public getEntryType()
    {
        if (cc.sys.os == cc.sys.OS_IOS) {
            Global.NativeEvent.getInfoPlistParam("entry", (info) => {
                Global.Setting.SystemInfo.entry = info.funcParam;
            })
        }
    }

    /**
     * 签名类型
     */
    public getSignType()
    {
        if (cc.sys.os == cc.sys.OS_IOS) {
            Global.NativeEvent.getInfoPlistParam("sign_type", (info) => {
                Global.Setting.SystemInfo.sign_type = info.funcParam;
            })
        }
    }
 //--------------------open install 相关---------------------------------
 public initOpeninstall() {
    if (this.isCliptextVaild()) {
        Global.Setting.ChannelInfo.clipboardContent = Global.Setting.SystemInfo.clipboardText;
    } 
    Global.NativeEvent.getOpenInstallData(this.initOpenInstallData.bind(this))
    if (cc.sys.os == cc.sys.OS_IOS) {
        Global.NativeEvent.getInfoPlistParam("ChannelInfo", (info) => {
           // console.log("这是当前openinstall的信息111111111111",JSON.stringify(info));
            Global.Setting.SystemInfo.ChannelInfo = info.funcParam;
            this.decodeChannelInfo();
        })
    }
    // this.getDownloadAppInfo();
}


//解析openinstall 和 剪貼板
private initOpenInstallData(content: any) {
    // Logger.log("initOpenInstallData content type -----", typeof (content) + " \r\n content=================" + content);
    console.log("这是当前openinstall的信息",JSON.stringify(content));
    let tempContent = Global.Setting.ChannelInfo.openInstallContent;
    if (tempContent != null && tempContent != "") {
        return;
    } else {
        Global.Setting.ChannelInfo.openInstallContent = content;
    }
    // Logger.log("initOpenInstallData start setting ");
    //检验openInstall
    //支持content是string 或者是table
    if (content != null && content != "") {
        let tab = null;
        if (typeof (content) == "string") {
            try {
                tab = JSON.parse(content);
                Logger.log("open install string : ", content);
            }
            catch (e) {
                Logger.error("load openInstall error", content);
                this.checkCliptextAndAppInfo();
                return;
            }
        }
        else {
            tab = content;
            try {
                let openInstall = JSON.stringify(tab);
                Logger.log("open install tab : ", openInstall);
            }
            catch (e) {
                Logger.log("open install tab parse error");
            }
        }


        let hasOpeninstallData = false;
        if (tab.cid && !isNaN(Number(tab.cid))) {
            hasOpeninstallData = true;
            Global.Setting.ChannelInfo.openInstallChannel = Number(tab.cid);
        }

        if (tab.ch && !isNaN(Number(tab.ch))) {
            hasOpeninstallData = true;
            Global.Setting.ChannelInfo.openInstallChannel = Number(tab.ch);
        }

        // Logger.log("initOpenInstallData  tab.ic::"+tab.ic);
        if (tab.ic && !isNaN(Number(tab.ic))) {
            hasOpeninstallData = true;
            Global.Setting.ChannelInfo.inviteId = Number(tab.ic);
        }
        Logger.log("initOpenInstallData  hasOpeninstallData::"+hasOpeninstallData);
        if (hasOpeninstallData) {
            Global.Setting.ChannelInfo.sourceType = 1;
        }
        else   //当openinstall 返回空表时  检查剪贴板
            this.checkCliptextAndAppInfo();
        
    }
    else {
        this.checkCliptextAndAppInfo();
    }
}

    PostInstallApp() {
        let flag = Global.Setting.storage.getBool(HallStorageKey.PostOpenInstallFlag);
        if (flag) {
            return
        }
        let param: any = {};
        param.appid = Global.Setting.appId;
        param.edition = Global.HotUpdateManager.nativeVersions["hall"];
        // param.app = Global.Setting.SystemInfo.vendorChannel;
        param.pack = Global.Setting.ChannelInfo.getRegistChannel();
        param.uid = Number(Global.Setting.storage.get(HallStorageKey.Uid)) || 0;
        param.app_source = Global.Setting.SystemInfo.appConstUrl;
        param.device = Global.Toolkit.genDeviceInfo();
        Global.HallServer.sendPostInstallApp(NetAppface.PostInstallApp, param, (msg) => {
            Global.Setting.storage.setBool(HallStorageKey.PostOpenInstallFlag, true);
        }, null, false)

    }

    private checkCliptextAndAppInfo() {
        if (!this.decodeCliptext()) {
            // this.getDownloadAppInfo();
        }
    }


    public isCliptextVaild() {
        let clipContent: string = Global.Setting.SystemInfo.clipboardText;
        if (!clipContent)
            return false;
        if(clipContent.length > 500)
        {
            return false
        }
        let subStrs = clipContent.split("|");
        if (subStrs.length < 4) {
            return false;
        }
        else if (subStrs.length > 10)
            return false;
        
        let appId = subStrs[2]
        if (appId != Global.customApp.getAppID())
        {
            return false
        }

        let md5 = subStrs[subStrs.length - 1];
        //判断最后一位是否是md5
        let md5ContentIdnex = clipContent.lastIndexOf("|");
        let md5Content = clipContent.substr(0, md5ContentIdnex);
        if (Global.AESUtil.md5(md5Content) == md5)
            return true;

        return false;
    }

    public isChannelStrVaild(chanStr) {
        if (chanStr == null || chanStr == "" || isNaN(Number(chanStr)))
            return false;
        let value = Number(chanStr)
        if (!Global.Toolkit.isInteger(value))
            return false;

        if (value < 0 || value > 10000000000)
            return false;

        return true;
    }
    //校验
    public decodeCliptext() {
        let clipContent: string = Global.Setting.SystemInfo.clipboardText;
        if (clipContent == null || clipContent == "")
            return false;

        if(!this.isCliptextVaild())
            return false;
        let subStr = clipContent.split("|");
        if (subStr.length < 4) {
            Logger.error("剪贴板解析失败", clipContent);
            return false;
        }
        let packNo = subStr[0];
        if (this.isChannelStrVaild(packNo)) {
            Global.Setting.ChannelInfo.clipboardChannel = Number(packNo);
        }

        let ic = subStr[1];
        if (this.isChannelStrVaild(ic)) {
            Global.Setting.ChannelInfo.inviteId = Number(ic);
        }

       
        
        Global.Setting.ChannelInfo.clipboardContent = clipContent;
        Global.Setting.ChannelInfo.sourceType = 2;
        return true;
    }
    
    //校验
    private decodeChannelInfo() {
        let clipContent: string = Global.Setting.SystemInfo.ChannelInfo;
        if (clipContent == null || clipContent == "")
            return false;
        let subStr = clipContent.split("|");
        if (subStr.length < 4) {
            Logger.error("infoPlist", clipContent);
            return false;
        }
        let packNo = subStr[0];
        if (this.isChannelStrVaild(packNo)) {
            Global.Setting.ChannelInfo.infoChannel = Number(packNo);
        }

        let ic = subStr[1];
        if (this.isChannelStrVaild(ic)) {
            Global.Setting.ChannelInfo.inviteId = Number(ic);
        }
        Global.Setting.ChannelInfo.clipboardContent = clipContent;
        Global.Setting.ChannelInfo.sourceType = 3;
        return true;
    }

}