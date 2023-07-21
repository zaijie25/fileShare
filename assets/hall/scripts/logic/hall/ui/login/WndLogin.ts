import WndBase from "../../../core/ui/WndBase";
import LoginModel from "../../../hallcommon/model/LoginModel";
import HallStorageKey from "../../../hallcommon/const/HallStorageKey";
import AppHelper from "../../../core/tool/AppHelper";
import { HallRedSpotType } from "../../../hallcommon/model/HallModel";
import { CustomerEntranceType } from "../../../hallcommon/model/ServicerModel";
import { BTNINDEX } from "../../../hallcommon/app/CustomApp";
import SystemInfo from "../../../core/setting/SystemInfo";

export default class WndLogin extends WndBase {
    private model: LoginModel;
    private showWx = true;
    private versionLabel:cc.Label;

    private kefuNode:cc.Node;
    private kefuSpot:cc.Node;
    private guangWangNode:cc.Node;

    private bg:cc.Sprite;
    //private logo:cc.Sprite;
    private effectNode:cc.Node;
    private lgEffect:cc.Node;

    private vistorLoginx = 0
    private phoneLoginx = 0

    private clickTagMap = {}

    private guestBtn :cc.Node

    private phoneBtn : cc.Node

    private registBtn :cc.Node

    protected onInit() {
        this.name = "WndLogin";
        this.layer = "MainLayer";
        this.resPath = "hall/prefabs/ui/LoginUI";
        //animType
        this.model = <LoginModel>Global.ModelManager.getModel("LoginModel");  
    }

    protected initView() {
        this.guestBtn = this.addCommonClick("btnContainer/guestBtn", this.onGuestBtnClick, this, cc.Button.Transition.SCALE, 2);
        this.addCommonClick("btnContainer/wxBtn", this.onWxBtnClick, this, cc.Button.Transition.SCALE, 2);
        this.phoneBtn = this.addCommonClick("btnContainer/phoneBtn", this.onPhoneBtnClick, this, cc.Button.Transition.SCALE, 2);
        // this.addCommonClick("btnContainer/registerBtn", this.onRegisterBtnClick, this, cc.Button.Transition.SCALE, 2);
        this.addCommonClick("btnContainer/gnx_kefu", this.onKefuClick, this, cc.Button.Transition.SCALE, 2);
        this.addCommonClick("btnContainer/gnx_guanwang", this.onGuanwangClick, this, cc.Button.Transition.SCALE, 2);
        this.registBtn = this.addCommonClick("btnContainer/RegistBtn", this.onRegistBtnClick, this, cc.Button.Transition.SCALE, 2);

        this.kefuNode = this.getChild("btnContainer/gnx_kefu");
        this.kefuSpot = this.getChild("btnContainer/gnx_kefu/hongdian");
        this.kefuSpot.active = false;
        
        this.guangWangNode = this.getChild("btnContainer/gnx_guanwang");
        let widgets = this.node.getComponentsInChildren(cc.Widget);
        this.versionLabel = this.getComponent("versionLabel", cc.Label);
        this.versionLabel.string = Global.Toolkit.genAppInfo();
       // this.versionLabel.string = Global.HotUpdateManager.hallNewVersion;
        if(widgets && widgets.length > 0)
        {
            for(let i = 0; i < widgets.length; i++)
            {
                widgets[i].target = cc.Canvas.instance.node;
            }
        }
        this.showWx = Global.Toolkit.checkIsPlatformShowWX()
        if(!this.showWx)
            this.getChild("btnContainer/wxBtn").active = false;

        // if (Global.Setting.weixinLoginDisable){
        //     this.getChild("btnContainer/wxBtn").active = false;
        // }

        //this.effectNode = this.getChild("effect");
        this.bg = this.getComponent("bg", cc.Sprite);
        //this.logo = this.getComponent("logo", cc.Sprite);
        this.lgEffect = this.getChild("lgEffect");
        let config = Global.customApp.getAppConfig()
        if(!config)
        {
            this.lgEffect.active = Global.customApp.showLoginEff;
        }
        else
        {
            this.lgEffect.active = config.showLoginEff;
        }
        
        this.guestBtn =   this.getChild("btnContainer/guestBtn")
        if(this.guestBtn)
        {
            this.vistorLoginx = this.guestBtn.x
        }

        this.phoneBtn =  this.getChild("btnContainer/phoneBtn")
        if(this.phoneBtn)
        {
            this.phoneLoginx = this.phoneBtn.x
        }
        this.clickTagMap["wxTag"] = true
        this.clickTagMap["vistorTag"] = true
        this.clickTagMap["phoneTag"] = true
    }
   
    onRegistBtnClick() {
        Global.UI.show("WndRegist");
    }


    protected onOpen() {
        Global.HallServer.stop();
        this.setBottomBtnActive()
        this.CheckKefu()
        Global.Event.on(GlobalEvent.ShowRedSpot,this,this.showRedSpot);
        Global.Event.on(GlobalEvent.CloseRedSpot,this,this.closeRedSpot);
        if (Global.Setting.enableAutoLogin && this.model.firstLogin) {
            this.model.firstLogin = false;
            this.doAutoLogin();
        }
        let node = cc.find("Canvas/loading")
        if(node)
            node.active = false;
    }

    CheckKefu()
    {
        let data = null
        let model = Global.ModelManager.getModel("ServicerModel")
        if(model)
        {
            data = model.getServiceInfo(CustomerEntranceType.LoginService)
        }
        if(!data || !data.status)
        {
            this.kefuNode.active = false
        }
        else
        {
            this.kefuNode.active = true
        }
    }
    private showRedSpot( data ){
        let redSpotType = data[1]
        switch(redSpotType){
            case HallRedSpotType.LoginKefu:
            {
                this.kefuSpot.active = true;
                break;
            }
        }
    }
    public closeRedSpot( redSpotType ){
        switch(redSpotType){
            case HallRedSpotType.LoginKefu:
            {
                this.kefuSpot.active = false;
                break;
            }
        }
    }
    private onKefuClick()
    {
        Global.ModelManager.getModel("ServicerModel").enterCustomerService(CustomerEntranceType.LoginService);
    }

    private onGuanwangClick()
    {
        let url = Global.Setting.Urls.downLoadUrl
        cc.sys.openURL(url);
    }

    private setBottomBtnActive(){

        if(this.guestBtn)
        {
            this.SetBtnPos(this.guestBtn,BTNINDEX.VistorLoginBtn)
            
        }
        let wxBtn = this.getChild("btnContainer/wxBtn")
        if(wxBtn)
        {
            this.SetBtnPos(wxBtn,BTNINDEX.WeChatLoginBtn)
        }
        if(this.phoneBtn)
        {
            this.SetBtnPos(this.phoneBtn,BTNINDEX.PhoneLoginBtn)
        }

        if(this.registBtn)
        {
            this.SetBtnPos(this.registBtn,BTNINDEX.RegistBtn)
        }
        
        let offical:cc.Node = this.getChild("btnContainer/gnx_guanwang")

        if(offical)
        {
            this.SetBtnPos(offical,BTNINDEX.OfficalBtn)
        }
        let service:cc.Node = this.getChild("btnContainer/gnx_kefu")

        if(service)
        {
            this.SetBtnPos(service,BTNINDEX.ServiceBtn)
        }
        
        let wxFlag = this.showWx && AppHelper.checkWxkey(false) && !Global.Setting.weixinLoginDisable  
        // if(cc.sys.platform == cc.sys.IPHONE )
        // {
        //     wxFlag = wxFlag && Global.Setting.isAppStoreEnableWXSDK
        // }

        wxBtn.active = wxFlag
        this.guestBtn.active = !Global.Setting.vistorLoginLimited
        this.registBtn.active = !Global.Setting.registLimited
        let config = Global.customApp.getAppConfig()
        if(config && config.layout != null && config.layout != undefined)
        {

            let layOut = config.layout
            if(layOut == 1) // 1表示按钮横向排榜 0 竖向
            {
                if (!wxFlag) {

                    let rightFlag =  this.guestBtn.x > this.phoneBtn.x //微信不显示时判断哪个按钮在右边，右边按钮往左移动，左边按钮往右边移动
                    if (rightFlag)
                    {
                        this.guestBtn.x -= 120
                        this.phoneBtn.x += 120
                        return
                    }
                    this.guestBtn.x += 120
                    this.phoneBtn.x -= 120
                }
            }
            else
            {
                if (!wxFlag) {
                    let upFlag =  this.guestBtn.y > this.phoneBtn.y//微信不显示时判断哪个按钮在上面，上面按钮往下移动，下面按钮往上移动
                    if (upFlag)
                    {
                        this.guestBtn.y -= 40
                        this.phoneBtn.y += 40
                        return
                    }
                    this.guestBtn.y += 40
                    this.phoneBtn.y -= 40
                } 
            }
            return
        }
        if (!wxFlag) {
            this.guestBtn.x = this.vistorLoginx
            this.phoneBtn.x = this.phoneLoginx
            let rightFlag = this.guestBtn.x > this.phoneBtn.x
            if (rightFlag) {
                this.guestBtn.x -= 120
                this.phoneBtn.x += 120
                return
            }
            this.guestBtn.x += 120
            this.phoneBtn.x -= 120
        }


    }

    SetBtnPos(node: cc.Node, btnIndex: BTNINDEX) {
        let config = Global.customApp.getAppConfig()
        if (!config || !cc.isValid(node)) {
            return
        }
        switch (btnIndex) {
            case BTNINDEX.OfficalBtn:
                if(config.officalBtnPos)
                    node.setPosition(cc.v2(config.officalBtnPos[0], config.officalBtnPos[1]))
                break;
            case BTNINDEX.RegistBtn:
                if(config.registBtnPos)
                    node.setPosition(cc.v2(config.registBtnPos[0], config.registBtnPos[1]))
                break;
            case BTNINDEX.ServiceBtn:
                if(config.serviceBtnPos)
                    node.setPosition(cc.v2(config.serviceBtnPos[0], config.serviceBtnPos[1]))
                break;
            case BTNINDEX.VistorLoginBtn:
                if(config.vistorLoginBtnPos)
                    node.setPosition(cc.v2(config.vistorLoginBtnPos[0], config.vistorLoginBtnPos[1]))
                break;
            case BTNINDEX.WeChatLoginBtn:
                if(config.wechatLoginBtnPos)
                    node.setPosition(cc.v2(config.wechatLoginBtnPos[0], config.wechatLoginBtnPos[1]))
                break;
            case BTNINDEX.PhoneLoginBtn:
                if(config.phoneLoginBtnPos)
                    node.setPosition(cc.v2(config.phoneLoginBtnPos[0], config.phoneLoginBtnPos[1]))
                break;

            default:
                break;
        }
    }

    private doAutoLogin() {
        //隐藏底部三个按钮
        // this.setBottomBtnActive(false)
        let token = Global.Setting.storage.get(HallStorageKey.Token);
        let uid = Global.Setting.storage.get(HallStorageKey.Uid);
        if (token && token != "" && uid != "") {
            this.model.reqAutoLogin(token, Number(uid), null);
        }
    }


    private onGuestBtnClick() {
        if (!this.clickTagMap["vistorTag"]) {
            return
        }
        this.clickTagMap["vistorTag"] = false
        this.clickTagMap["vistorTimer"] = setTimeout(() => {
            this.clickTagMap["vistorTag"] = true
        }, 1000);
        this.model.reqVisitorLogin();
    }

    private onWxBtnClick() {
        if (!this.clickTagMap["wxTag"]) {
            return
        }
        this.clickTagMap["wxTag"] = false
        this.clickTagMap["wxTimer"] = setTimeout(() => {
            this.clickTagMap["wxTag"] = true
        }, 1000);
        if(!AppHelper.getAppWXLoginEnable())
            return;
        Global.NativeEvent.checkWXInstall((retInfo) => {
            if (!retInfo) {
                Logger.error("checkWXInstall callback error retInfo = null")
                return;
            }
            if (retInfo.result == 0) {
                Global.NativeEvent.startWXLogin((wxInfo) => {
                    if (!wxInfo) {
                        Logger.error("startWXLogin callback error wxInfo = null")
                        return;
                    }
                    Logger.log("------------------onWxBtnClick callback wxInfo " + JSON.stringify(wxInfo))
                    if (wxInfo.result == 0) {
                        let accesstoken = wxInfo.funcParam;
                        this.model.reqWxLogin(accesstoken, 1);
                    }
                    else {
                        Global.UI.fastTip("微信登录失败");
                    }
                })
            } else {
                Global.UI.showSingleBox("请先安装微信", null);
            }

        })

    }
    private onPhoneBtnClick() {
        Global.UI.show("WndPhoneLogin");
    }

    onDispose()
    {
        super.onDispose()
        this.resetTag()
        Global.Event.off(GlobalEvent.ShowRedSpot,this,this.showRedSpot);
        Global.Event.off(GlobalEvent.CloseRedSpot,this,this.closeRedSpot);
        
    }
    onClose()
    {
        this.resetTag()
        Global.Event.off(GlobalEvent.ShowRedSpot,this,this.showRedSpot);
        Global.Event.off(GlobalEvent.CloseRedSpot,this,this.closeRedSpot);
    }

    resetTag()
    {
        if(this.clickTagMap["wxTimer"])
        {
            clearTimeout(this.clickTagMap["wxTimer"])
        }
        if(this.clickTagMap["vistorTimer"])
        {
            clearTimeout(this.clickTagMap["vistorTimer"])
        }
        this.clickTagMap["wxTag"] = true
        this.clickTagMap["vistorTag"] = true
       

    }

    // private onRegisterBtnClick(){
    //     Global.UI.show("WndRegist");
    // }

}