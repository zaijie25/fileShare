/**
 * 更新相关逻辑
 * 
*/

import LoadingFacade from "../loadingMVC/LoadingFacade";
import AppHelper from "./AppHelper";
import HallPopMsgHelper, { PopWndName } from "../../hall/tool/HallPopMsgHelper";


export default class AppUpdateHelper {
    //tips_type 弹窗提示   0 登录前  1登录后
    private _forceDialogSceneType = -1;
    private _hasShowForceDialog = false;
    private _checkVersionData  = null;
    private _forceDialogType = -1;// 0 强更  1 非强更


    public set forceDialogSceneType(value:number){
        this._forceDialogSceneType = value
    }

    public get forceDialogSceneType(){
        return this._forceDialogSceneType
    }

    public set hasShowForceDialog(value:boolean){
        this._hasShowForceDialog = value
    }

    public get hasShowForceDialog(){
        return this._hasShowForceDialog
    }

    public set checkVersionData(data:any){
        this._checkVersionData = data
    }

    public get checkVersionData(){
        return this._checkVersionData
    }



    public goToLogin(){
        LoadingFacade.releaseInstance()
        Global.SceneManager.goToLogin();
    }

    public showLoadingGameUpdateUI(app_force_type){
        let noForceNoCallback = () => {
            this.goToLogin();
        }
        let forceNoCallback = () => {
            this.showLoadingGameUpdateUI(app_force_type)
        }
        let forceUpdateFunc = ()=>{
            let url = Global.Setting.Urls.downLoadUrl
            cc.sys.openURL(Global.Toolkit.DealWithUrl(url));
        }
        let noCallback = noForceNoCallback
        let autoClose = true;
        let showType = 1; ////1 两个按钮  2 yes 一个按钮
        if (app_force_type == 0) {//强制更新
            showType = 2
            noCallback = forceNoCallback
            autoClose = false;
        }
        
        Global.UI.show("WndGameUpdateUI",showType, forceUpdateFunc, noCallback, autoClose, false,this.checkVersionData.app_force.desc);
    }


    public checkIsShowLoginUpdateDlg(){
        let data  = this._checkVersionData
        if (data){
            let app_force = data.app_force // 强更字段
            if (app_force){
                let app_force_version = app_force.version
                let nativeAppVerion = Global.Setting.SystemInfo.appVersion
                if (this.forceDialogSceneType == 1 && this.hasShowForceDialog == false && (Global.Toolkit.versionCompare(app_force_version, nativeAppVerion) > 0)){
                    return true;
                }
            }
        }
        
        return false;
    }

    public showLoginUpdateDlg(){
        if (this.checkIsShowLoginUpdateDlg()){
            if (this._checkVersionData){
                let app_force = this._checkVersionData.app_force
                if (app_force){
                    let app_force_force_type = app_force.force_type //0强制更新 1非强制更新
                    let app_force_url = app_force.url
                    HallPopMsgHelper.Instance.addMsgList(PopWndName.ForceUpdate, () => {
                        HallPopMsgHelper.Instance.addLock(PopWndName.ForceUpdate);
                        
                        let noForceNoCallback = () => {
                            HallPopMsgHelper.Instance.releaseLock(PopWndName.ForceUpdate);
                        }
                        let forceNoCallback = () => {
                            HallPopMsgHelper.Instance.releaseLock(PopWndName.ForceUpdate);
                            this.showLoginUpdateDlg()
                        }
                        let forceUpdateFunc = ()=>{
                            let url = Global.Setting.Urls.downLoadUrl
                            if (app_force_url){
                                url = app_force_url
                            }
                            cc.sys.openURL(Global.Toolkit.DealWithUrl(url));
                        }
                        let noCallback = noForceNoCallback
                        let autoClose = true;
                        let showType = 1; ////1 两个按钮  2 yes 一个按钮
                        if (app_force_force_type == 0) {//强制更新
                            showType = 2
                            noCallback = forceNoCallback
                            autoClose = false;
                        }
                        
                        Global.UI.show("WndGameUpdateUI",showType, forceUpdateFunc, noCallback, autoClose, false,app_force.desc);
                        this.hasShowForceDialog = true
                    }); 
                }
               
            }
            
        }else {
            Logger.error("showLoginUpdateDlg false")
        }
    }
    



    public startForceUpdateLogic(data) {
        if (!data){
            Logger.error("data == null")
            return false;
        }
        this.checkVersionData = data;
        let app_force = data.app_force // 强更字段
        let nativeAppVerion = Global.Setting.SystemInfo.appVersion
        if (app_force && app_force.version && (app_force.version > 0) && app_force.pack_type && app_force.pack_type != "") { //新强更字段
            let app_force_version = app_force.version
            let app_force_pack_type = app_force.pack_type //包类型  全平台:all  企业签/超级签：main 马甲包:appstore TF包:testflight 华为包:huawei 
            let nativePlatform = Global.Setting.SystemInfo.nativePlatform
            let app_tips_type = app_force.tips_type // tips_type 弹窗提示   0 登录前  1登录后
            
            if (app_tips_type != null && app_tips_type != undefined && app_tips_type != "" ){
                this.forceDialogSceneType = app_tips_type
                if (this.forceDialogSceneType == 1){
                    return false;
                }else {
                    Logger.error("startForceUpdateLogic show loading update dlg ")
                }
            }
            //判断包类型
            if (app_force_pack_type != "all" && nativePlatform != app_force_pack_type) {
                return false;
            }
            
            //判断版本号
            if (Global.Toolkit.versionCompare(app_force_version, nativeAppVerion) > 0) {
                
                let force_update_url = data.force_update_url //强更的官网下载地址
                let app_force = data.app_force // 强更字段
                let app_force_url = app_force.url //强更的下载地址，包下载类型：Android 是Apk地址，IOS 是plist地址  落地页：包下载页地址
                let app_force_force_type = app_force.force_type //0强制更新 1非强制更新
                let app_force_desc = app_force.desc //更新说明
                let app_force_url_type = app_force.url_type //下载地址类型  0 包下载地址 1 落地页
                

                if (AppHelper.enableForceUpdateAppInstall) {
                    let noForceNoCallback = () => {
                        this.goToLogin();
                    }
                    let forceNoCallback = () => {
                        //继续请求checkversion
                        this.startForceUpdateLogic(data)
                    }

                    let noCallback = noForceNoCallback
                    let autoClose = true;
                    let showType = 1; ////1 两个按钮  2 yes 一个按钮
                    let isForceUpdate = false;
                    if (app_force_force_type == 0) {//强制更新
                        showType = 2
                        noCallback = forceNoCallback
                        autoClose = false;
                        isForceUpdate = true;
                    }
                    if (app_force_desc == null || app_force_desc === "") {
                        app_force_desc = "有新版本更新，请升级！"
                    }

                    if (app_force_url_type == 0) {//0 包下载地址
                        if (cc.sys.os === cc.sys.OS_IOS) {
                            let signMd5 = Global.Toolkit.md5(Global.Setting.SystemInfo.appSign);
                            if (signMd5 == Global.Setting.serverIOSCertMd5) {
                                if (app_force_url && app_force_url != "") {
                                    //ios 下载plist文件并更新
                                    let forceUpdateFunc = () => {
                                        Global.NativeEvent.hotUpdateIPA(app_force_url)
                                    }
                                    if (app_force_force_type == 0) {
                                        Global.UI.showSingleBox(app_force_desc, forceUpdateFunc, noCallback, autoClose, false);
                                    } else {
                                        Global.UI.showYesNoBox(app_force_desc, forceUpdateFunc, noCallback, autoClose)
                                    }
                                } else {
                                    if (force_update_url && force_update_url != "") {
                                        this.showForceUpdateWnd(force_update_url,isForceUpdate)
                                    } else {
                                        return false;
                                    }
                                }

                            } else {
                                if (force_update_url && force_update_url != "") {
                                    //弹框提示删除本地App后再升级
                                    let forceUpdateFunc = () => {
                                        cc.sys.openURL(Global.Toolkit.DealWithUrl(force_update_url))
                                    }
                                    app_force_desc = "有新版本更新，请卸载App后重新下载！"
                                    if (app_force_force_type == 0) {
                                        Global.UI.showSingleBox(app_force_desc, forceUpdateFunc, noCallback, autoClose, false);
                                    } else {
                                        Global.UI.showYesNoBox(app_force_desc, forceUpdateFunc, noCallback, autoClose)
                                    }
                                } else {
                                    return false
                                }
                            }

                        } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                            if (app_force_url && app_force_url != "") {
                                //Android下载Apk文件并更新
                                let yesCallback = () => {

                                }
                                Global.UI.show("WndDownLoadApkUI", app_force_desc, showType, app_force_url, yesCallback, noCallback, autoClose, false)

                            } else {
                                if (force_update_url && force_update_url != "") {
                                    this.showForceUpdateWnd(force_update_url,isForceUpdate)
                                } else {
                                    return false;
                                }
                            }
                        }

                    } else if (app_force_url_type == 1) {// 1落地页
                        if (app_force_url && app_force_url != "") {
                            let forceUpdateFunc = () => {
                                cc.sys.openURL(Global.Toolkit.DealWithUrl(app_force_url))
                            }
                            let autoClose = true;
                            let showType = 1; ////1 两个按钮  2 yes 一个按钮
                            if (app_force_force_type == 0) {//强制更新
                                showType = 2
                                noCallback = forceNoCallback
                                autoClose = false;
                            }
                            Global.UI.show("WndGameUpdateUI",showType, forceUpdateFunc, noCallback, autoClose, false,app_force_desc);
                        } else {
                            if (force_update_url && force_update_url != "") {
                                this.showForceUpdateWnd(force_update_url,isForceUpdate)
                            } else {
                                return false;
                            }
                        }
                    }
                } else {
                    if (force_update_url && force_update_url != "") {
                        this.showForceUpdateWnd(force_update_url)
                    } else {
                        return false;
                    }
                }
                return true;
            }
        } else {
            let force_update_url = data.force_update_url
            let force_version = data.force_version
            if (Global.Toolkit.versionCompare(force_version, nativeAppVerion) > 0) {
                this.showForceUpdateWnd(force_update_url)
                return true;
            }
        }

        return false;
    }

    private showForceUpdateWnd(force_update_url,isForceUpdate = false) {
        //走强更流程
        let forceUpdateFunc = () => {
            cc.sys.openURL(Global.Toolkit.DealWithUrl(force_update_url))
        }
        let noCallback = null;
        let force_update_dec = "有新版本更新，请重新下载游戏"
        if (isForceUpdate) {
            noCallback = forceUpdateFunc
            Global.UI.showSingleBox(force_update_dec, forceUpdateFunc, noCallback, false, false);
        } else {
            Global.UI.showYesNoBox(force_update_dec, forceUpdateFunc, noCallback, true)
        }
    }





}