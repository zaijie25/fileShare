import YXButton from "../../../core/component/YXButton";
import HallStorageKey from "../../../hallcommon/const/HallStorageKey";
import PlayerInfoModel from "../../../hallcommon/model/PlayerInfoModel";
import { ItemType } from "./WndVip3";

const { ccclass, property } = cc._decorator;

@ccclass
export default class VipGiftViewItem extends cc.Component {

    @property([cc.SpriteFrame])
    iconSpriteList: Array<cc.SpriteFrame> = [];
    @property([cc.SpriteFrame])
    giftNameSpriteList: Array<cc.SpriteFrame> = [];

    @property(cc.Sprite)
    iconSprite: cc.Sprite = null

    @property(cc.Sprite)
    nameSprite: cc.Sprite = null

    @property(cc.ProgressBar)
    progress: cc.ProgressBar = null

    @property(cc.Label)
    progressLabel: cc.Label = null

    @property(cc.Label)
    awardTipLabel: cc.Label = null

    @property(cc.Label)
    awardLabel: cc.Label = null


    @property(cc.Label)
    currentAwardTipLabel: cc.Label = null

    @property(cc.Label)
    currentAwardLabel: cc.Label = null

    @property(cc.Label)
    nextAwardTipLabel: cc.Label = null

    @property(cc.Label)
    nextAwardLabel: cc.Label = null

    @property(cc.Sprite)
    awardBtn: cc.Sprite = null;

    @property([cc.SpriteFrame])
    awardBtnSpriteList: Array<cc.SpriteFrame> = [];

    @property([cc.SpriteFrame])
    awardBtn_bg: Array<cc.SpriteFrame> = [];
    @property([cc.SpriteFrame])
    awardBtn_lb: Array<cc.SpriteFrame> = [];

    @property(cc.Sprite)
    awardBtn_lbimg: cc.Sprite = null;

    private type = -1

    private data = null


    private btnState = - 1 // 0可点击可领取 1 可点击不可领取 2 不可点击

    private timer: any

    private isLimited = false

    onLoad() {
        Global.UIHelper.addCommonClick(this.node, "awardBtn", this.reqGetAward, this)
    }



    reqGetAward() {
        if (this.isLimited) {
            Global.UI.fastTip("操作过于频繁，清稍后！")
            return
        }
        this.isLimited = true
        setTimeout(() => {
            this.isLimited = false
        }, 1000);
        let canGetIndex = this.getItemIndex(this.data)
        let level = this.data.list[canGetIndex].level
        let param: any = {}
        param.type = this.type
        param.level = level
        if (!Global.PlayerData.vip) {
            Global.UI.fastTip("您的VIP等级为0!")
            return
        }

        if (this.type === 0 && Global.PlayerData.vip < level) {
            Global.UI.fastTip("您的VIP等级不符合!")
            return
        }
        let weekData = this.type === 1 ? this.data.week : this.data.month
        let bPay = weekData.pay
        let bFlow = weekData.code - weekData.need_code >= 0 && weekData.need_code !== 0
        if (!bPay && this.type !== 0) {
            Global.UI.fastTip("请您充值后再来领取!")
            return
        }
        if (!bFlow && this.type !== 0) {
            Global.UI.fastTip("您的打码量不足!")
            return
        }

        Global.HallServer.send(NetAppface.mod, NetAppface.NewReciveVipReward, param, (data) => {
            if (data.point) {
                let key = Global.Toolkit.md5(Global.PlayerData.uid)
                Global.Setting.storage.set(key, level)
                Global.UI.show("WndRebateGet", data.point)
                let info: any = {}
                info.index = canGetIndex
                info.type = this.type
                Global.Event.event(GlobalEvent.UPDATEVIPDATA, info);

            }

        }, (error) => {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        }, false);
    }
    /**
     * 
     * @param data 
     * @param type 0 升级奖励 1 周奖励 2 月奖励
     * @param pageIndex 页签索引
     * @returns 
     */
    refreshUI(data, type, pageIndex) {
        //   let btn = this.awardBtn.node.getComponent(YXButton)
        this.type = type
        this.data = data
        if (!data || !data.list) return

        this.iconSprite.spriteFrame = this.iconSpriteList[type]
        this.nameSprite.spriteFrame = this.giftNameSpriteList[type]
        let vip = Global.PlayerData.vip
        switch (type) {
            case ItemType.LEVEL:
                if (data.list.length >= pageIndex && vip > 0) { //
                    let canGetIndex = this.getItemIndex(data)
                    let level = data.list[canGetIndex].level
                    let status = data.list[canGetIndex].status
                    let point = data.list[canGetIndex].point
                    this.progress.progress = 1
                    this.progressLabel.string = "1/1"
                    if (status === 0 && vip >= level) {

                        this.awardLabel.string = point / Global.Setting.glodRatio + ""
                        this.awardTipLabel.string = `VIP${level}彩金奖励`
                        //   this.awardBtn.spriteFrame = this.awardBtnSpriteList[0] // 可领取
                        this.awardBtn.spriteFrame = this.awardBtn_bg[0];
                        this.awardBtn_lbimg.spriteFrame = this.awardBtn_lb[0];
                        this.btnState = 0
                        // btn.interactable = true
                    }
                    else {
                        //  btn.interactable = false
                        this.btnState = 2

                        if (data.list.length > level) {
                            this.progress.progress = 0
                            this.progressLabel.string = "0/1"
                            this.awardTipLabel.string = `VIP${level}彩金奖励`
                            //this.awardBtn.spriteFrame = this.awardBtnSpriteList[4] // 未达成\
                            this.awardBtn.spriteFrame = this.awardBtn_bg[1];
                            this.awardBtn_lbimg.spriteFrame = this.awardBtn_lb[4];
                            this.awardLabel.string = data.list[canGetIndex].point / Global.Setting.glodRatio + ""//Global.Toolkit.GetMoneyFormat(data.list[canGetIndex].point) + "y"

                        }
                        else {
                            this.progress.progress = 1
                            this.progressLabel.string = "1/1"
                            this.awardTipLabel.string = `VIP${level}彩金奖励`
                            this.awardBtn.spriteFrame = this.awardBtnSpriteList[1] // 已领取
                            this.awardBtn.spriteFrame = this.awardBtn_bg[1];
                            this.awardBtn_lbimg.spriteFrame = this.awardBtn_lb[1];
                            this.awardLabel.string = data.list[level - 1].point / Global.Setting.glodRatio + ""//Global.Toolkit.GetMoneyFormat(data.list[level - 1].point) + "y"
                        }
                    }
                }
                else {
                    //  btn.interactable = false
                    this.btnState = 2
                    this.progress.progress = 0
                    this.progressLabel.string = "0/1"
                    this.awardLabel.string = data.list[0].point / Global.Setting.glodRatio + ""//Global.Toolkit.GetMoneyFormat(data.list[0].point) + "y"
                    this.awardTipLabel.string = `VIP1彩金奖励`
                    // this.awardBtn.spriteFrame = this.awardBtnSpriteList[4] // 未达成
                    this.awardBtn.spriteFrame = this.awardBtn_bg[1];
                    this.awardBtn_lbimg.spriteFrame = this.awardBtn_lb[4];
                }
                break;
            case ItemType.MONTH:
            case ItemType.WEEK:
                let weekData = type === 1 ? data.week : data.month
                let bPay = weekData.pay
                let bGet = weekData.last_get
                let bFlow = weekData.code - weekData.need_code >= 0 && weekData.need_code !== 0
                if (!weekData.need_code) {
                    this.progress.progress = 0
                    this.progressLabel.string = "0/0"
                }
                else {
                    this.progress.progress = weekData.code / weekData.need_code
                    this.progressLabel.string = `${Math.floor(weekData.code / Global.Setting.glodRatio)}/${weekData.need_code / Global.Setting.glodRatio}`
                }

                if (!bGet && weekData.last_vip !== 0) {

                    this.awardTipLabel.node.active = true
                    this.awardTipLabel.string = type === 1 ? `上周VIP${weekData.last_vip}礼金` : `上月VIP${weekData.last_vip}礼金`
                    this.awardLabel.node.active = true
                    this.awardLabel.node.parent.active = true;
                    this.awardLabel.string = weekData.last_point / Global.Setting.glodRatio + ""//Global.Toolkit.GetMoneyFormat(weekData.last_point) + "y"
                    //    btn.interactable = true
                    if (!bFlow || !bPay) {

                        this.btnState = 1
                        //  this.awardBtn.spriteFrame = this.awardBtnSpriteList[5]
                        this.awardBtn.spriteFrame = this.awardBtn_bg[0];
                        this.awardBtn_lbimg.spriteFrame = this.awardBtn_lb[5];
                    }
                    else {
                        this.btnState = 0
                        // this.awardBtn.spriteFrame = this.awardBtnSpriteList[0]
                        this.awardBtn.spriteFrame = this.awardBtn_bg[0];
                        this.awardBtn_lbimg.spriteFrame = this.awardBtn_lb[0];
                    }
                    this.currentAwardLabel.node.active = false
                    this.currentAwardLabel.node.parent.active = false

                    this.currentAwardTipLabel.node.active = false
                    this.nextAwardLabel.node.active = false
                    this.nextAwardTipLabel.node.active = false
                    this.nextAwardTipLabel.node.parent.active = false

                }
                else {
                    this.btnState = 2
                    //     btn.interactable = false
                    this.awardTipLabel.node.active = false
                    this.awardLabel.node.active = false
                    this.awardLabel.node.parent.active = false;
                    let currentAward = weekData.now_vip_point / Global.Setting.glodRatio + ""//Global.Toolkit.GetMoneyFormat(weekData.now_vip_point)+ "y"
                    let nextAward = weekData.next_vip_point / Global.Setting.glodRatio + ""//(Global.Toolkit.GetMoneyFormat(weekData.next_vip_point) + "y")
                    this.currentAwardLabel.string = currentAward
                    this.currentAwardLabel.node.active = true
                    this.currentAwardLabel.node.parent.active = true
                    this.currentAwardTipLabel.string = type === 1 ? `本周VIP${vip}礼金` : `本月VIP${vip}礼金`
                    this.currentAwardTipLabel.node.active = true
                    if (type === 1) {
                       // this.awardBtn.spriteFrame = this.awardBtnSpriteList[2]
                        this.awardBtn.spriteFrame = this.awardBtn_bg[1];
                        this.awardBtn_lbimg.spriteFrame = this.awardBtn_lb[2];
                    }
                    else {
                       // this.awardBtn.spriteFrame = this.awardBtnSpriteList[3]
                        this.awardBtn.spriteFrame = this.awardBtn_bg[1];
                        this.awardBtn_lbimg.spriteFrame = this.awardBtn_lb[3];
                    }
                    this.nextAwardLabel.node.active = true
                    this.nextAwardLabel.string = nextAward
                    if (vip >= PlayerInfoModel.instance.vip_cfg.length) {
                        this.awardTipLabel.node.active = true
                        this.awardLabel.node.active = true
                        this.awardLabel.node.parent.active = true;
                        this.awardTipLabel.string = type === 1 ? `本周VIP${vip}礼金` : `本月VIP${vip}礼金`
                        this.awardLabel.string = `${currentAward}`
                        this.currentAwardLabel.node.active = false
                        this.currentAwardLabel.node.parent.active = false
                        this.currentAwardTipLabel.node.active = false
                        this.nextAwardLabel.node.active = false
                        this.nextAwardTipLabel.node.active = false
                        this.nextAwardTipLabel.node.parent.active = false
                        return
                    }
                    this.nextAwardTipLabel.node.active = true
                    this.nextAwardTipLabel.node.parent.active = true
                    this.nextAwardTipLabel.string = `升级VIP${vip + 1}礼金`

                }
            default:
                break;
        }

    }

    /**
     * 
     * @param data 获取没领取的最低index
     * @returns 
     */
    getItemIndex(data) {
        let index = 0
        if (!data || !data.list) {
            return index
        }

        for (let i = 0; i < data.list.length; i++) {
            let item = data.list[i];
            if (item && !item.status) {
                return i
            }

        }
        return PlayerInfoModel.instance.vip_cfg.length - 1

    }


}


