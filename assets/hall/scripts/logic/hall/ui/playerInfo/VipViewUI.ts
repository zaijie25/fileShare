import PlayerInfoModel from "../../../hallcommon/model/PlayerInfoModel";
import HallBtnHelper from "../hall/views/HallBtnHelper";
import VipGiftView from "./VipGiftView";
import VipPrivilegeView from "./VipPrivilegeView";

const { ccclass, property } = cc._decorator;

/**
 * vip特权下的单个pageview视图
 */
@ccclass
export default class VipViewUI extends cc.Component {

    data: any

    giftBtn: cc.Node
    moreBtn: cc.Node

    index = 0
    /**
     * 当前page的vip
     */
    vip = 0;
    /**
     * 左右2个vip图标
     */
    spriteVipArr: cc.Sprite[] = [];


    playerModel: PlayerInfoModel
    /**
     * 到下一级vip的提示文本
     */
    richTextNextVip: cc.RichText = null;
    /**
     * 到下一级vip的进度
     */
    processBar: cc.ProgressBar = null;


    private giftViewUI: VipGiftView

    private curvipTitle:cc.RichText = null;

  //  privilege: VipPrivilegeView

    level: cc.Label


    giftNode: cc.Node

  //  privilegeNode: cc.Node

    currentSelect = 0

    onLoad() {
        Global.Event.on("SHOWPREVILEGE", this, this.showPrevilege)
    }

    public initView() {
        this.playerModel = Global.ModelManager.getModel("PlayerInfoModel")
        this.spriteVipArr[0] = cc.find("top/vip0", this.node).getComponent(cc.Sprite);
        this.spriteVipArr[1] = cc.find("top/vip1", this.node).getComponent(cc.Sprite);

       // this.level = cc.find("top/level", this.node).getComponent(cc.Label);

        this.richTextNextVip = cc.find("top/richText_vip", this.node).getComponent(cc.RichText);
        this.processBar = cc.find("top/process_di/progressBar", this.node).getComponent(cc.ProgressBar);


        this.curvipTitle = cc.find("bottom/title/richText_vip", this.node).getComponent(cc.RichText);

        // this.giftBtn = cc.find("top/title/gift", this.node)
        // if(this.giftBtn)
        // {
        //     this.giftBtn.on("click", this.changePanel, this);
        // }
        // this.moreBtn = cc.find("top/title/more", this.node)
        // if(this.moreBtn)
        // {
        //     this.moreBtn.on("click", this.changePanel, this);
        // }
        Global.UIHelper.addCommonClick(this.node, "top/RechargeBtn", this.RechargeBtnFunc, this);




        // this.giftNode = cc.find("bottom/gift",this.node)
        // if(this.giftNode)
        // {
        //     this.giftViewUI = this.giftNode.getComponent(VipGiftView)
        //     if(this.giftViewUI)
        //     {
        //         this.giftViewUI.initView()
        //     }
        // }


        // this.privilegeNode = cc.find("bottom/more", this.node)
        // if (this.privilegeNode) {
        //     this.privilege = this.privilegeNode.getComponent(VipPrivilegeView)
        //     if (this.privilege) {
        //         this.privilege.initView()
        //     }
        // }
        // this.privilegeNode.active = false

        // this.btnNodeArr[1] = Global.UIHelper.addCommonClick(this.node, "bottom/info_node/button_yijihuo", this.jihuoBtnFunc, this);
        // this.UpdateUI();
    }



    // changePanel(target) {
    //     if (target === 0) {
    //         this.privilegeNode.active = false
    //         this.giftNode.active = true
    //         this.giftViewUI.refreshUI(this.data, this.vip)
    //         //this.setToggleChecked(this.giftBtn, true)
    //         //this.setToggleChecked(this.moreBtn, false)
    //         this.currentSelect = 0

    //     }
    //     else if (target === 1){
    //         this.privilegeNode.active = true
    //         this.giftNode.active = false
    //         this.privilege.refreshUI(this.data, this.vip,this.vip)
    //         //this.setToggleChecked(this.giftBtn, false)
    //         //this.setToggleChecked(this.moreBtn, true)
    //         this.currentSelect = 1
    //     }
    //     else if (target.node &&target.node.name === "gift")
    //     {
    //         this.currentSelect = 0
    //         this.privilegeNode.active = false
    //         this.giftNode.active = true
    //         this.giftViewUI.refreshUI(this.data, this.vip)
    //         //this.setToggleChecked(this.giftBtn, true)
    //         //this.setToggleChecked(this.moreBtn, false)
    //         Global.Event.event("UPDATEJIANTOU","0")
    //     }
    //     else if (target.node &&target.node.name === "more")
    //     {
    //         this.currentSelect = 1
    //         this.privilegeNode.active = true
    //         this.giftNode.active = false
    //         this.privilege.refreshUI(this.data, this.vip,this.vip)
    //         //this.setToggleChecked(this.giftBtn, false)
    //         //this.setToggleChecked(this.moreBtn, true)
    //         Global.Event.event("UPDATEJIANTOU",1)
    //     }

    // }



    /**
     * 更新界面
     */
    UpdateUI(data?: any, index = 0) {

        this.data = data

        var myVip = Global.PlayerData.vip;
        var leftVip = this.vip - 1;
        var rightVip = this.vip;
        var toVip = myVip + 1;
        if (myVip < rightVip) {
            leftVip = myVip;
            toVip = rightVip;
        }
   //     this.level.string = `VIP${myVip}`
        var percent = 1;
        var vipNeedExp = 0;
        var vipUgradeExp = PlayerInfoModel.instance.GetVipUpgradeExp(toVip);
        var vipNeedExp = vipUgradeExp - Global.PlayerData.vipExp;

        var percent = 1;
        var vipNeedExp = 0;
        var vipUgradeExp = PlayerInfoModel.instance.GetVipUpgradeExp(toVip);
        var vipNeedExp = vipUgradeExp - Global.PlayerData.vipExp;

        if (vipNeedExp > 0) {

            //<outline color=#473472 width=2>再充值</outline><outline color=#7b4700 width=2><color=#FFD304>9136.08</color></outline><outline color=#473472 width=2>元，即可升级VIP7</outline>
            //再充值<color=#ff5551>XXX</color>元，即可达到<color = #3ac4a1>VIP4</c>
            //  this.richTextNextVip.string = `<outline color=#473472 width=2>再充值</outline><outline color=#7b4700 width=2><color=#FFD304>元，即可达到</color></outline><outline color=#473472 width=2>VIP${toVip}</outline>`
            this.richTextNextVip.string = `<font>再充值<color=#ff6c00>${vipNeedExp}</color>元，即可达到VIP${toVip}</color></font>`

            // this.richTextNextVip.string = "<b>再充值<color=#9d5025>" +  + "</color>元，即可达到VIP" +  + "</b>";
            if (myVip < rightVip) {
                percent = Global.PlayerData.vipExp / vipUgradeExp;
            }
        } else {
            //this.richTextNextVip.string = "<b><outline color=#315200 width=2>恭喜您已成为至尊VIP" + myVip + "</outline></b>";
            this.richTextNextVip.string = "<b>恭喜您已成为至尊<color=#ff6c00>VIP" + myVip + "</color></b>";
        }
        this.processBar.progress = percent;

        //var atlasString = "hall/texture/hall/vip_auto_atlas/vip_auto_atlas";

        //var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var sfString0 = "vip_tq" + leftVip;
        Global.ResourceManager.loadAutoAtlas(this.spriteVipArr[0], atlasString, sfString0, null, false);
        var sfString1 = "vip_tq" + rightVip;
        Global.ResourceManager.loadAutoAtlas(this.spriteVipArr[1], atlasString, sfString1, null, false);

        this.curvipTitle.string = "<b>VIP"+toVip+"会员尊享</b>";
        // if(this.playerModel.vip_reward == 1)
        // {
        //     this.giftBtn.active = true
        //     this.moreBtn.active = true
        // }
        // else
        // {
        //     this.giftBtn.active = false
        //     this.moreBtn.active = true
        // }
    //    this.privilege.refreshUI(this.data, this.vip, this.vip)
       // this.privilegeNode.active = false

    }
    onDestroy() {
        Global.Event.off("SHOWPREVILEGE", this, this.showPrevilege)
    }

    showPrevilege(flag) {
     //   this.privilegeNode.active = flag
    }
    /**
     * 立即充值 点击
     */
    RechargeBtnFunc() {
        HallBtnHelper.WndRechargeOpen();
    }
}
