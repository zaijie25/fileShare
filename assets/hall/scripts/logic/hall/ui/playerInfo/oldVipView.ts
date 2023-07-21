import PlayerData from "../../../hallcommon/data/PlayerData";
import PlayerInfoModel from "../../../hallcommon/model/PlayerInfoModel";
import HallBtnHelper from "../hall/views/HallBtnHelper";

const { ccclass, property } = cc._decorator;

/**
 * vip特权下的单个pageview视图
 */
@ccclass
export default class VipView extends cc.Component {

    /**
     * 全局对象
     */
    static instance: VipView = null;

    /**
     * 当前page的vip
     */
    vip = 0;
    /**
     * 左右2个vip图标
     */
    spriteVipArr: cc.Sprite[] = [];
    /**
     * 到下一级vip的提示文本
     */
    richTextNextVip: cc.RichText = null;
    /**
     * 到下一级vip的进度
     */
    processBar: cc.ProgressBar = null;
    /**
     * vip4前每天加速的tips文本
     */
    labelJiasu: cc.Label = null;

    /**
     * 当前page下的vip文本
     */
    richTextVip: cc.RichText = null;
    /**
     * 2个特权下的icon图标
     */
    spriteIconArr: cc.Sprite[] = [];
    /**
     * 2个特权下的说明文本
     */
    richTextArr: cc.RichText[] = [];

    /**
     * 当前页的vip等级图标
     */
    spriteVipIcon: cc.Sprite = null;
    /**
     * 当前页的vip等级下的特权文本
     */
    labelTequanArr: cc.Label[] = [];
    /**
     * 激活按钮 和 已领取按钮，未领取按钮
     */
    btnNodeArr: cc.Node[] = [];

    /**
     * 是否已经初始化
     */
    hasInit = false;
    /**
     *是否可领取0未领取，1领取了
     */
    status = 2;


    public initView() {
        VipView.instance = this;
        this.spriteVipArr[0] = cc.find("top/vip0", this.node).getComponent(cc.Sprite);
        this.spriteVipArr[1] = cc.find("top/vip1", this.node).getComponent(cc.Sprite);

        this.richTextNextVip = cc.find("top/richText_vip", this.node).getComponent(cc.RichText);
        this.processBar = cc.find("top/process_di/progressBar", this.node).getComponent(cc.ProgressBar);

        this.labelJiasu = cc.find("top/label_jiasu", this.node).getComponent(cc.Label);

        this.richTextVip = cc.find("bottom/title/richText_vip", this.node).getComponent(cc.RichText);

        for (var i = 0; i < 2; i++) {
            this.spriteIconArr[i] = cc.find("bottom/item_" + i + "/icon", this.node).getComponent(cc.Sprite);
            this.richTextArr[i] = cc.find("bottom/item_" + i + "/richText_name", this.node).getComponent(cc.RichText);
        }

        let item3 = cc.find("bottom/item_2", this.node)
        if (item3) {
            this.richTextArr[2] = cc.find("richText_name", item3).getComponent(cc.RichText);
            this.btnNodeArr[0] = Global.UIHelper.addCommonClick(this.node, "bottom/item_2/button_uplingqu", this.jihuoBtnFunc, this);
            this.btnNodeArr[0].active = false;
            this.btnNodeArr[1] = cc.find("button_yilingqu", item3)
            this.btnNodeArr[1].active = false;
            this.btnNodeArr[2] = Global.UIHelper.addCommonClick(this.node, "bottom/item_2/button_lingqu", this.ReqGetReward, this);
            this.btnNodeArr[2].active = false;
        }

        this.spriteVipIcon = cc.find("bottom/info_node/icon_vip", this.node).getComponent(cc.Sprite);
        for (var i = 0; i < 4; i++) {
            this.labelTequanArr[i] = cc.find("bottom/info_node/labelLayout/label_" + (i + 1), this.node).getComponent(cc.Label);
            this.labelTequanArr[i].node.active = false;
        }
        Global.UIHelper.addCommonClick(this.node, "bottom/info_node/button_jihuo", this.jihuoBtnFunc, this);
        // this.btnNodeArr[1] = Global.UIHelper.addCommonClick(this.node, "bottom/info_node/button_yijihuo", this.jihuoBtnFunc, this);
        this.UpdateUI();
    }
    /**
     * 领取VIP等级奖励
     */
    public ReqGetReward() {
        let param = {
            "level": this.vip,
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.ReciveVipReward, param, (data) => {
            Global.UI.show("WndRebateGet", data.point);
            this.status = data.status;
            this.btnNodeArr[1].active = true;
            this.btnNodeArr[2].active = false;
            this.btnNodeArr[0].active = false;
            Global.Event.event(GlobalEvent.CHANGEVIP);
        }, (error) => {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        });
    }

    onDestroy() {
        VipView.instance = null;
    }

    /**
     * 初始化
     */
    init() {
    }

    /**
     * 更新界面
     */
    UpdateUI(list?: any) {
        if (!this.richTextNextVip) {
            return;
        }
        let node = cc.find("bottom/info_node/button_jihuo", this.node);
        if (Global.PlayerData.vip >= this.vip) {
            node.active = false;
        }
        if (Global.PlayerData.vip > 0 && Global.PlayerData.vip < 4) {
            this.labelJiasu.node.active = true;
        } else {
            this.labelJiasu.node.active = false;
        }
        var myVip = Global.PlayerData.vip;
        var leftVip = this.vip - 1;
        var rightVip = this.vip;
        var toVip = myVip + 1;
        if (myVip < rightVip) {
            leftVip = myVip;
            toVip = rightVip;
        }

        var percent = 1;
        var vipNeedExp = 0;
        var vipUgradeExp = PlayerInfoModel.instance.GetVipUpgradeExp(toVip);
        var vipNeedExp = vipUgradeExp - Global.PlayerData.vipExp;

        if (vipNeedExp > 0) {
            this.richTextNextVip.string = `再充值<color=#ff9485>${vipNeedExp}</color>元，即可达到<color=#ffdb4a>VIP${toVip}</color>`
            // this.richTextNextVip.string = "<b>再充值<color=#9d5025>" +  + "</color>元，即可达到VIP" +  + "</b>";
            if (myVip < rightVip) {
                percent = Global.PlayerData.vipExp / vipUgradeExp;
            }
        } else {
            this.richTextNextVip.string = "<b>恭喜您已成为至尊VIP" + myVip + "</b>";
        }
        this.processBar.progress = percent;

        // if(this.hasInit)
        //     return;
        // this.hasInit = true;

        this.richTextVip.string = "VIP" + rightVip + "会员尊享";
        var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        //var atlasString = Global.Setting.SkinConfig.playerInfoAtlasPath;
        var sfString0 = "vip_tq" + leftVip;
        Global.ResourceManager.loadAutoAtlas(this.spriteVipArr[0], atlasString, sfString0, null, false);

        var sfString1 = "vip_tq" + rightVip;
        Global.ResourceManager.loadAutoAtlas(this.spriteVipArr[1], atlasString, sfString1, null, false);

        Global.Toolkit.loadLocalHeadFrame(this.spriteIconArr[0], "" + rightVip);


        if (rightVip > 9) {
            this.richTextArr[1].string = "<b>V" + rightVip + "专属表情</b>";
            var sfPaotai = "biaoqing_" + rightVip;
            Global.ResourceManager.loadAutoAtlas(this.spriteIconArr[1], atlasString, sfPaotai, null, false);
        }
        else {
            this.richTextArr[1].string = "<b>V" + rightVip + "捕鱼炮台</b>";
            var sfPaotai = "paotai_" + rightVip;
            Global.ResourceManager.loadAutoAtlas(this.spriteIconArr[1], atlasString, sfPaotai, null, false);
        }

        if (this.richTextArr[2]) {
            if (list) {
                this.richTextArr[2].string = Global.Toolkit.GetMoneyFormat(list.point) + "元";
            }
        }
        let ngame = PlayerInfoModel.instance.vip_cfg[this.vip - 1]
        if (ngame) {
            if (ngame.ngame > 0) {
                this.labelTequanArr[1].string = "进入游戏后全场通报";
                this.labelTequanArr[1].node.active = true;
            }
        }
        Global.Toolkit.loadLocalVip(this.spriteVipIcon, rightVip);
        if (this.vip == 1) {
            this.labelTequanArr[0].string = "专属在线客服，24小时服务";
            this.labelTequanArr[0].node.active = true;
            this.labelTequanArr[2].string = "专属支付通道，更加稳定快捷";
            this.labelTequanArr[2].node.active = true;
        } else if (this.vip > 1 && this.vip < 8) {
            this.labelTequanArr[0].string = "活动可领取更多奖励";
            this.labelTequanArr[0].node.active = true;
            this.labelTequanArr[2].string = "专属在线客服，24小时服务";
            this.labelTequanArr[2].node.active = true;
            this.labelTequanArr[3].string = "专属支付通道，更加稳定快捷";
            this.labelTequanArr[3].node.active = true;
        } else if (this.vip > 2 && this.vip < 8) {
            this.labelTequanArr[0].string = "活动可领取更多奖励";
            this.labelTequanArr[0].node.active = true;
            this.labelTequanArr[2].string = "专属在线客服，24小时服务";
            this.labelTequanArr[2].node.active = true;
            this.labelTequanArr[3].string = "专属支付通道，更加稳定快捷";
            this.labelTequanArr[3].node.active = true;
        } else if (this.vip > 7) {
            this.labelTequanArr[0].string = "活动可领取更多奖励";
            this.labelTequanArr[0].node.active = true;
            this.labelTequanArr[2].string = "专属在线客服，24小时服务";
            this.labelTequanArr[2].node.active = true;
            this.labelTequanArr[3].string = "专属支付通道，更加稳定快捷";
            this.labelTequanArr[3].node.active = true;
        }
        // if(PlayerInfoModel.instance.vipSubsidy != null && PlayerInfoModel.instance.vipSubsidyStatus == 1){ 
        //     let subsidy = PlayerInfoModel.instance.vipSubsidy[rightVip]
        //     this.labelTequanArr[2].string = "每日可领转运金" + subsidy.times + "次";
        // }
        let item3 = cc.find("bottom/item_2", this.node)
        if (item3) {
            if (list) {
                this.status = list.status;
            }
            if (myVip < rightVip) {
                this.btnNodeArr[0].active = true;
                this.btnNodeArr[1].active = false;
                this.btnNodeArr[2].active = false;
            } else {
                if (this.status == 0) {
                    this.btnNodeArr[2].active = true;
                    this.btnNodeArr[0].active = false;
                    this.btnNodeArr[1].active = false;
                } else if (this.status == 1) {
                    this.btnNodeArr[1].active = true;
                    this.btnNodeArr[2].active = false;
                    this.btnNodeArr[0].active = false;
                }
            }
        }
    }
    /**
     * 激活按钮 点击
     */
    jihuoBtnFunc() {
        HallBtnHelper.WndRechargeOpen();
    }
}
