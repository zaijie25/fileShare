import WndBase from "../../../core/ui/WndBase";
import PlayerInfoModel from "../../../hallcommon/model/PlayerInfoModel";
import BindingGiftModel from "../../../hallcommon/model/BindingGiftModel";
import HallBtnHelper from "../hall/views/HallBtnHelper";

export default class WndNewPlayerInfo extends WndBase{

    /**
     * 数据对象
     */
    private model: PlayerInfoModel;
    //昵称
    private nickName:cc.Label;
    //id
    private idLabel:cc.Label;
    //金币
    private pointLabel:cc.Label;
    //手机号
    private phoneLabel:cc.Label;
    //头像
    spriteHead:cc.Sprite = null;
    //头像框
    spriteHeadFrame:cc.Sprite = null;

    private vipFrame:cc.Sprite;

    //绑定手机按钮
    private bindBtn:cc.Node;

    //已绑定手机节点
    private binded:cc.Node;

    /**
     * 初始化脚本
     */
    protected onInit() {
        this.name = "WndNewPlayerInfo";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/NewPlayerInfoUI";
        this.model = <PlayerInfoModel>Global.ModelManager.getModel("PlayerInfoModel");
    }

    onDispose(){
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPersonInfo)

    }

    /**
     * 初始化UI
     */
    protected initView() {
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPersonInfo)
        this.binded = this.getChild("personInfo/panel/bind/binded");

        this.addCommonClick("bg/close",this.closeBtnFunc,this);
        this.addCommonClick("personInfo/changeBtn",this.showChooseHeadView,this);
        this.addCommonClick("personInfo/idLabel/btn",this.copyIdFunc,this);
        this.addCommonClick("personInfo/nickName/changeBtn",this.openEditNicknameUI,this);
        this.addCommonClick("personInfo/panel/logout",this.logOutFunc,this);
        this.bindBtn = this.addCommonClick("personInfo/panel/bind/bindBtn",this.openBindUi,this);
        this.addCommonClick("personInfo/panel/setting",this.openSettingUi,this);
        this.addCommonClick("personInfo/coinBar/add",this.addPonitBtn,this);
        this.addCommonClick("personInfo/vipFrame",this.showVipView,this);


        this.nickName = this.getComponent("personInfo/nickName/nickLabel",cc.Label);
        this.idLabel = this.getComponent("personInfo/idLabel/id",cc.Label);
        this.pointLabel = this.getComponent("personInfo/coinBar/coinLabel",cc.Label);
        this.spriteHead =this.getComponent("headImg/headFrame", cc.Sprite);
        this.spriteHeadFrame = this.getComponent("headbox", cc.Sprite);
        this.phoneLabel = this.getComponent("personInfo/panel/bind/binded/phone",cc.Label);
        this.vipFrame = this.getComponent("personInfo/vipFrame",cc.Sprite);
    }

    private showVipView(){
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndVip3")
        Global.UI.show("WndVip3");
    }

    private showChooseHeadView(){
        Global.UI.show("WndChooseHead");
    }

    private copyIdFunc(){
        Global.NativeEvent.copyTextToClipboard(String(Global.PlayerData.uid), this.copyTextToClipboardCallBack.bind(this) );
    }

    private openEditNicknameUI(){
        Global.UI.show("WndEditName");
    }

    private copyTextToClipboardCallBack(retStr){
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
        }else {
            Global.UI.fastTip("复制失败");
        }
    }

    private logOutFunc(){
        Global.UI.show("WndMessageBox", "您确定退出当前账号返回登录界面？", 1, ()=>{
            Global.SceneManager.goToLogin();
        }, ()=>{
            
        });
    }

    private openBindUi(){
        Global.UI.show("WndBindPhone");
    }

    private openSettingUi(){
        Global.UI.show("WndSetting");
    }

    private addPonitBtn(){
        HallBtnHelper.WndRechargeOpen();
    }

    /**
     * 界面打开回调
     */
    protected onOpen(){
        this.model.reqGetUserInfo(null,null);
        this.refreshPersonInfo();
        var model = <BindingGiftModel>Global.ModelManager.getModel("BindingGiftModel");
        let playerData = Global.PlayerData;
        if (playerData.phone == "" && model.BindAwardNum != 0) {
            Global.UI.show("WndBindingGift"); 
        }
    }

    private refreshPersonInfo(){
        if(Global.SceneManager.inGame())
        {
            return
        }
        var data = Global.PlayerData;
        this.nickName.string = Global.Toolkit.removeEmoji(data.nickname);
        this.idLabel.string =   String(data.uid);

        let phoneStr = data.phone.split(" ")[1];
        phoneStr = phoneStr || data.phone;
        this.bindBtn.active = phoneStr == "";
        this.binded.active = phoneStr != "";
        this.phoneLabel.string = Global.Toolkit.formateStrWithAsterisk(phoneStr, 3, 4);
        this.pointLabel.string = Global.Toolkit.formatPointStr(Global.PlayerData.point, true).toString();
        this.spriteHead.spriteFrame = Global.Toolkit.getLocalHeadSf(data.headimg);
        //头像框设置
        Global.Toolkit.loadLocalHeadFrame(this.spriteHeadFrame, data.headkuang);

        //vip图标设置
        var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var sfString0 = "vip_tq" + data.vip;
        Global.ResourceManager.loadAutoAtlas(this.vipFrame, atlasString, sfString0, null, false);
    }
    /**
     * 界面关闭回调
     */
    protected onClose(){
        // this.currYeqian = -1
        // this.close();
    }

    /**
     * 关闭按钮点击
     */
    private closeBtnFunc(){
        this.close();
    }
}