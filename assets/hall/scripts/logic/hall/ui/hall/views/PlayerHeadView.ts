import GlobalEvent from "../../../../core/GlobalEvent";
import ViewBase from "../../../../core/ui/ViewBase";
import PlayerInfoModel from "../../../../hallcommon/model/PlayerInfoModel";
import HallBtnHelper from "./HallBtnHelper";

export default class PlayerHeadView extends ViewBase {

    private nameLabel: cc.Label;
    private idLabel: cc.Label;
    private headSprite: cc.Sprite;
    private vipEffect:cc.Node
    private playerModel

    private timer:any
    /**
     * 头像框
     */
    headKuang: cc.Sprite = null;
    /**
     * vip标识
     */
    spriteVip: cc.Sprite = null;
    /**
     * vip红点
     */
    public spriteVipHongdian: cc.Node;
    private hongdian: cc.Node;
    protected initView() {
        this.playerModel = Global.ModelManager.getModel("PlayerInfoModel")
        this.nameLabel = this.getComponent("nameLabel", cc.Label);
        this.idLabel = this.getComponent("playerID", cc.Label);
        this.headSprite = this.getComponent("headImg", cc.Sprite);
        this.headKuang = this.getComponent("headFrame", cc.Sprite);
        this.spriteVip = this.getComponent("vip_icon", cc.Sprite);
        this.hongdian = this.node.getChildByName("hongdian")
        this.spriteVipHongdian = this.getChild("vip_icon/hongdian")
        this.vipEffect =  this.getChild("vip_icon/vipEffect")
        if( this.vipEffect)
        {
            this.vipEffect.active = false
        }
        this.addCommonClick("vip_icon", this.onVipBtnFunc, this);
        if (this.spriteVip) {
            this.spriteVip.node.active = !Global.Setting.vipDisable;
        }
        
        this.addCommonClick("head", this.onHeadClick, this, null);
       

    }
    
    private onHeadClick()
    {
        Global.UI.show("WndPlayerInfo");
    }


    onSubViewShow() {
        this.updateUserInfo();
        this.onShowVipReward();
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE, this, this.updateUserInfo);
        Global.Event.on(GlobalEvent.VIPREWARD, this, this.onShowVipReward);
       
    }
    onSubViewHide()
    {
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.updateUserInfo);
        Global.Event.off(GlobalEvent.VIPREWARD, this, this.onShowVipReward);
    }

    onDispose() {
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.updateUserInfo);
        Global.Event.off(GlobalEvent.VIPREWARD, this, this.onShowVipReward);
    }

    private updateUserHead() {
        let playerData = Global.PlayerData;
        let headImg = this.headSprite;
        if (headImg.node) {
            let w = headImg.node.width,
                h = headImg.node.height;
            headImg.spriteFrame = Global.Toolkit.getLocalHeadSf(playerData.headimg);
            headImg.node.width = w;
            headImg.node.height = h;
        }
        if (this.headKuang && this.headKuang.node && this.headKuang.node.isValid) {
            Global.Toolkit.loadLocalHeadFrameByVip(this.headKuang, playerData.headkuang,false,true);
        }

        if (this.spriteVip && this.spriteVip.node && this.spriteVip.node.isValid) {
           // this.spriteVip.string = Global.PlayerData.vip.toString()
            Global.Toolkit.loadVipIcon(this.spriteVip, playerData.vip);
        }
        if (this.hongdian) {
            if (playerData.phone != "") {
                this.hongdian.active = false;
            }
            else {
                this.hongdian.active = true;
            }
        }
    }

    private updateUserName() {
        let playerData = Global.PlayerData;
        if (this.nameLabel.node) {
            this.nameLabel.string = Global.Toolkit.removeEmoji(playerData.nickname);
        }
    }

    public updateUserInfo() {
        let playerData = Global.PlayerData;
        if (this.idLabel.node) {
            this.idLabel.string = "" + playerData.uid.toString();
        }
        this.updateUserHead();
        this.updateUserName();
    }

    /**
     * VIP图标点击
     */
    onVipBtnFunc() {
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndVip3")
        Global.UI.show("WndVip3");
    }

    clearTimeOut()
    {
        if(this.timer)
        {
            clearInterval(this.timer)
        }
        if(this.vipEffect && cc.isValid(this.vipEffect))
        {
            this.vipEffect.active = false
        }
        this.timer = null
    }


    public onShowVipReward() {
        if(!PlayerInfoModel.instance.vip_reward)
        {
            if(this.spriteVipHongdian)
            {
                this.spriteVipHongdian.active = false
            }
            if(this.vipEffect)
            {
                this.vipEffect.active = false
            }
            return
        }
        if (this.spriteVipHongdian) {
            let rewardFlag = PlayerInfoModel.instance.is_vip_reward > 0
            let weekFlag = PlayerInfoModel.instance.is_week_reward >0
            let monthFlag = PlayerInfoModel.instance.is_month_reward>0
            if(this.vipEffect)
            {
                this.setTimer()
            }
            if ( rewardFlag || weekFlag || monthFlag) {
                this.spriteVipHongdian.active = true;
            }
            else {
                this.spriteVipHongdian.active = false;
            }
        }


    }

    setTimer() {
        this.clearTimeOut()
        this.timer = setInterval(() => {
            let rewardFlag = PlayerInfoModel.instance.is_vip_reward > 0
            let weekFlag = PlayerInfoModel.instance.is_week_reward > 0
            let monthFlag = PlayerInfoModel.instance.is_month_reward > 0
          //  if (rewardFlag || monthFlag || weekFlag || !Global.PlayerData.vip){
            if (rewardFlag || monthFlag || weekFlag){
                if (this.vipEffect && cc.isValid(this.vipEffect)) {
                    this.vipEffect.active = true
                    setTimeout(() => {
                        if (this.vipEffect && cc.isValid(this.vipEffect)) { this.vipEffect.active = false }
                    }, 5000);
                }
            }
            else {
                if (this.vipEffect && cc.isValid(this.vipEffect)) {
                    this.vipEffect.active = false
                    this.clearTimeOut()
                }
            }

        }, 10000);
    }
}
