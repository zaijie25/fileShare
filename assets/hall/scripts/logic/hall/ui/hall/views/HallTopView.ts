import ViewBase from "../../../../core/ui/ViewBase";
import HallModel, { HallRedSpotType } from "../../../../hallcommon/model/HallModel";
import HallBtnHelper from "./HallBtnHelper";
import RechargeGiftModel from "../../../../hallcommon/model/RechargeGiftModel";
import PlayerInfoModel from "../../../../hallcommon/model/PlayerInfoModel";

export default class HallTopView extends ViewBase {
    private model: HallModel;
    private rechargeModel: RechargeGiftModel


    // 大厅顶部所有按钮集合
    //---------------------------------------------------------- 
    shareNode: cc.Node;// 分享送金
    fanliNode: cc.Node; //每日流水返利
    shouChongFanLiNode: cc.Node; // 首充返利
    timeLimitedNode: cc.Node // 限时首充返利
    giftNode: cc.Node //每日礼金
    zhuanpanNode: cc.Node // 幸运转盘
    spreadGiftNode: cc.Node // 推广送金
    hongbao: cc.Node // 每日充值红包
    dailyHongBaoNode: cc.Node //连续充值红包
    buzhuNode: cc.Node; //转运金
    actNode: cc.Node //活动送金


    private spreadRedSpot: cc.Node;
    private spreadCenterNode:cc.Node

    private moreBtn: cc.Node = null; //更多

    timerNode: cc.Node
    timerLabel: cc.Label
    receiveNode: cc.Node
    giftNodeRedSpot: cc.Node;//每日礼金红点
    private moneyLabel: cc.Label;
    private countLabel: cc.Label;
    private timer = null


    isMoreOpen = false;

    layout2: cc.Node
    private layout_show: cc.Node = null; //固定5个位置
    private layout_hide: cc.Node = null; //折叠位置，数量自适应

    private activityConfigs = {};
    protected initView() {
        this.model = <HallModel>Global.ModelManager.getModel("HallModel");
        this.rechargeModel = <RechargeGiftModel>Global.ModelManager.getModel("RechargeGiftModel");

        //点击事件注册
        this.shareNode = this.addCommonClick("layout2/shareNode", this.onShareClick, this)
        this.giftNode = this.addCommonClick("layout2/giftNode", this.onGiftClick, this)
        this.fanliNode = this.addCommonClick("layout2/fanliNode", this.onFanliClick, this)
        this.shouChongFanLiNode = this.addCommonClick("layout2/shouChongFanLiNode", this.onShouChongFanLiClick, this);
        this.timeLimitedNode = this.addCommonClick("layout2/limitedTimeNode", this.onShoulimitedTimeNodeClick, this);
        this.zhuanpanNode = this.addCommonClick("layout2/zhuanPanNode", this.onzhuanPanNodeClick, this);
        this.spreadGiftNode = this.addCommonClick("layout2/spreadGiftNode", this.onSpreadGiftNodeClick, this);
        this.hongbao = this.addCommonClick("layout2/hongbao", this.onHongbaoClick, this)
        this.dailyHongBaoNode = this.addCommonClick("layout2/meirihongbao", this.onDailyHongBaoClick, this)
        this.giftNodeRedSpot = this.getChild("layout2/giftNode/hongdian")

        this.spreadRedSpot = this.getChild("layout2/spreadNode/hongdian");
        this.spreadRedSpot.active = false;
        this.spreadCenterNode = this.addCommonClick("layout2/spreadNode", this.onSpreadClick, this);
        this.spreadCenterNode.active = false;

        this.moreBtn = this.getChild("moreBtn");
        this.shareNode = this.addCommonClick("moreBtn", this.onMoreBtnClick, this)

        this.layout_hide = this.getChild("layout_hide");
        this.layout_show = this.getChild("layout_show");
        this.layout2 = this.getChild("layout2");

        this.layout_hide.active = false;
        this.layout_show.active = false;
        this.layout2.active = true;

        this.moreBtn.getChildByName("img_close").active = true;
        this.moreBtn.getChildByName("img_open").active = false;

        if (this.giftNodeRedSpot) {
            this.giftNodeRedSpot.active = false
        }
        if (this.timeLimitedNode) {
            this.timeLimitedNode.active = false
            this.timerNode = cc.find("timerNode", this.timeLimitedNode)
            this.timerNode.active = false
            this.receiveNode = cc.find("receiveNode", this.timeLimitedNode)
            this.receiveNode.active = false
            this.timerLabel = cc.find("timerLabel", this.timerNode).getComponent(cc.Label)
        }
        this.moneyLabel = this.getComponent("layout2/zhuanyunNode/moneyLabel", cc.Label);
        this.countLabel = this.getComponent("layout2/zhuanyunNode/countLabel", cc.Label);
        this.buzhuNode = this.addCommonClick("layout2/zhuanyunNode", this.onBuZhuClick, this);
        this.actNode = this.addCommonClick("layout2/activityCenter", this.openActivityCenter, this);

        this.shareNode.active = false;
        this.fanliNode.active = false;
        this.shouChongFanLiNode.active = false;
        if (this.zhuanpanNode) {
            this.zhuanpanNode.active = false
        }

        if (this.spreadGiftNode) {
            this.spreadGiftNode.active = false
        }

        if (this.hongbao) {
            this.hongbao.active = false
        }

        if (this.dailyHongBaoNode) {
            this.dailyHongBaoNode.active = false
        }
        if (this.giftNode) {
            this.giftNode.active = false
        }
        this.activityConfigs = {
            5: this.zhuanpanNode, //幸运转盘
            6: this.shareNode,  //分享送金
            7: this.fanliNode,  // 流水返利
            8: this.shouChongFanLiNode, //首冲返利
            10: this.spreadGiftNode, //推广彩金
            16: this.hongbao,   // 每日充值红包
            18: this.giftNode, //每日礼金
            20: this.dailyHongBaoNode, //连续充值红包
            21: this.timeLimitedNode,    //限时首充返利
            22: this.buzhuNode, //转运金
            23: this.actNode //活动送金
        }
        this.registEvent()
    }

    openActivityCenter() {
        HallBtnHelper.WndActivityOpen()
    }

  


    private onMoreBtnClick() {
        this.isMoreOpen = !this.isMoreOpen;
        if (this.isMoreOpen) {
            this.moreBtn.getChildByName("img_close").active = false;
            this.moreBtn.getChildByName("img_open").active = true;
            this.layout_hide.scale = 0.2;
            this.layout_hide.active = true;
            cc.tween(this.layout_hide).to(0.2, { scale: 1.1 }).to(0.1, { scale: 1 }).call(() => {
                this.layout_hide.scale = 1;
            }).start();

        } else {
            this.moreBtn.getChildByName("img_close").active = true;
            this.moreBtn.getChildByName("img_open").active = false;
            cc.tween(this.layout_hide).to(0.1, { scale: 0.2 }).call(() => {
                this.layout_hide.scale = 1;
                this.layout_hide.active = false;
            }).start();
        }
    }

    private onBuZhuClick() {
        let param: any = {}
        Global.HallServer.send(NetAppface.mod, NetAppface.GetSubsidyPoint, param, (retObj) => {
            PlayerInfoModel.instance.vipSubsidyCount = retObj.times
            this.countLabel.string = PlayerInfoModel.instance.vipSubsidyCount + "";
            Global.UI.show("WndRebateGet", retObj.point);
        }, (error) => {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        }, false, 10);
    }


    onSpreadClick()
    {
        this.model.closeRedSpot(HallRedSpotType.Spread);
        HallBtnHelper.WndSpreadCenterOpen();
        Global.Audio.playAudioSource("hall/sound/share_audio")
    }


    private registEvent() {
        Global.Event.on(GlobalEvent.TimeLimitedRechargeStatusChange, this, this.setTimer);
        cc.game.on(cc.game.EVENT_SHOW, this.setTimer, this);
        this.model.on("UpdateResSpot", this, this.updateResSpot);
     //   Global.Event.on(GlobalEvent.PERSONALINFOUPDATE, this, this.checkCommisionRedSpot);
    }
    onDailyRechargePackClick() {
        Global.UI.show("WndHallRedEnvelope")
    }


    onDailyHongBaoClick() {
        HallBtnHelper.WndDailyHongBaoOpen()
    }

    onHongbaoClick() {
        HallBtnHelper.WndHongBaoOpen()
    }

    onzhuanPanNodeClick() {
        HallBtnHelper.WndLuckyDrawOpen()
    }

    onSpreadGiftNodeClick() {
        HallBtnHelper.WndSpreadGiftOpen()
    }

    private halltopBtnArr = [];

    private initActivity() {
        let activityList = Global.ActivityToggle.activityList;
        let activitySize = activityList.length;
        for (let i = activitySize - 1; i >= 0; i--) {
            let type = activityList[i].atype;
            if (type && activityList[i].button_status == 1) {
                let btn: cc.Node = this.activityConfigs[type]
                if (cc.isValid(btn)) {
                    btn.setSiblingIndex(activityList[i].sort)
                    btn.active = true
                }
            }

        }


        this.actNode.setSiblingIndex(0);

        if (this.hongbao) {
            let recharge_red = this.model.recharge_red
            if (recharge_red) {
                this.hongbao.active = recharge_red.is_show;
            }
        }

        //临时强制关闭活动入口  by cris
        // this.spreadGiftNode.active = false;
        // this.giftNode.active = false;

        // if(this.comissionNode){
        //     this.comissionNode.setSiblingIndex(0)
        // }

        this.RefreshBtnFunc();

    }

    RefreshBtnFunc() {
        if (this.halltopBtnArr.length == 0) {
            let arr = [];
            for (let i = 0; i < this.layout2.childrenCount; i++) {
                if (this.layout2.children[i].active == true) {
                    this.halltopBtnArr.push(this.layout2.children[i]);
                }
            }
        }
        this.layout2.active = false;

        for (let i = 0; i < this.halltopBtnArr.length && i < 5; i++) {
            // this.layout_show.addChild(arr[i]);
            this.halltopBtnArr[i].parent = this.layout_show;
            this.halltopBtnArr[i].y = 0;
        }
        this.layout_show.active = true;


        if (this.halltopBtnArr.length > 5) {
            this.moreBtn.active = true;
            for (let i = 5; i < this.halltopBtnArr.length; i++) {
                // this.layout_hide.addChild(arr[i]);
                this.halltopBtnArr[i].parent = this.layout_hide;
                this.halltopBtnArr[i].y = -88;
            }
            this.layout_show.getComponent(cc.Widget).right = 95;
        } else {

            cc.log("11111111111111111111111111111111111111111")

            this.moreBtn.active = false;
            this.layout_show.getComponent(cc.Widget).right = 10;
        }


    }




    checkDailyGiftRedSpot() {
        let DailyGiftRedFlag = this.model.DailyGiftRedSpotActive;
        if (this.giftNodeRedSpot) {
            this.giftNodeRedSpot.active = DailyGiftRedFlag;
        }
    }

    private updateResSpot(redSpotType) {
        switch (redSpotType) {
            case HallRedSpotType.DailyGift:
                {
                    this.giftNodeRedSpot.active = this.model.DailyGiftRedSpotActive;
                    break;
                }
            // case HallRedSpotType.Commision:
            //     {
            //         this.commisionRedRpot.active = this.model.CommisionRedSpotActive;
            //         break;
            //     }
        }
    }



    onSubViewShow() {
        Global.Event.on(GlobalEvent.SHOW_SPREAD_NODE, this, this.showSpreadNode);
        this.initActivity();
        this.checkDailyGiftRedSpot();
        this.updatePlatformState()
        this.setTimer()
        this.SetCommiType();
      //  this.checkCommisionRedSpot()
    }

    showSpreadNode(data) {
        this.spreadCenterNode.active = true
    }


    SetCommiType() {
        var SpreadModel = Global.ModelManager.getModel("SpreadModel");
        let RedFlag = SpreadModel.RedFLag
        if (RedFlag) {
            this.spreadRedSpot.active = true
        }
        let cmmi_type = SpreadModel.commiType
        this.spreadCenterNode.active = cmmi_type != 0
    }

    private updatePlatformState() {
        let isWXEnable = Global.Toolkit.checkIsPlatformShowWX()
        if (this.shareNode && !isWXEnable) {
            this.shareNode.active = false
        }
    }

    clearTimeOut() {
        if (this.timer) {
            clearInterval(this.timer)
        }
        this.timer = null
    }

    private setTimer(flag = true) {
        if (!this.rechargeModel) return
        if (!flag && this.receiveNode && this.timerNode) { // flag = false 表示推送过来参与活动了
            this.clearTimeOut()
            this.timeLimitedNode.active = true
            this.receiveNode.active = true
            this.timerNode.active = false
            this.rechargeModel.TimelimitedStatus = 2
            return
        }
        if (this.rechargeModel.TimelimitedStatus == 1 && this.receiveNode && this.timerNode) { //TimelimitedStatus =1 未参与 >1 参与

            this.receiveNode.active = false
            if (this.rechargeModel.CountDown != -1) {
                this.clearTimeOut()
                let currentTime = new Date().getTime()
                let time = this.rechargeModel.CountDown * 1000 - currentTime
                time = Math.ceil(time / 1000)
                this.timerNode.active = time > 0

                this.timer = setInterval(() => {
                    let str = Global.Toolkit.secondFormatHMS(time)
                    let arr = str.split(":")
                    str = arr.join('s')
                    this.timerLabel.string = str
                    time -= 1
                    if (time <= 0 && this.rechargeModel.TimelimitedStatus < 2) {
                        this.clearTimeOut()
                        this.timeLimitedNode.active = false
                    }
                }, 1000);

            }


        }
        else if (this.rechargeModel.TimelimitedStatus > 1 && this.receiveNode && this.timerNode) {
            this.timeLimitedNode.active = true
            if (this.receiveNode && this.timerNode) {
                this.receiveNode.active = true
                this.timerNode.active = false
            }

        }
        else {
            this.timeLimitedNode.active = false
        }

    }



    onSubViewHide() {

    }

    onDispose() {
        this.clearTimeOut()
        cc.game.off(cc.game.EVENT_SHOW, this.setTimer, this);
        this.model.off("UpdateResSpot", this, this.updateResSpot);
        Global.Event.off(GlobalEvent.TimeLimitedRechargeStatusChange, this, this.setTimer);
        this.model.off("UpdateResSpot", this, this.updateResSpot);
      //  Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.checkCommisionRedSpot);
    }


    private onSpreedCenterClick() {
        this.model.closeRedSpot(HallRedSpotType.Spread);
        HallBtnHelper.WndSpreadCenterOpen();
        Global.Audio.playAudioSource("hall/sound/share_audio")
    }




    private onShareClick() {
        Global.UI.show("WndShare")
        Global.Audio.playAudioSource("hall/sound/sharemoney")
    }



    private onFanliClick() {
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndDailyCashBackUI")
        // Global.UI.show("WndCashBackDayUI")
        Global.UI.show("WndDailyCashBackUI")
    }
    private onGiftClick() {
        // Global.UI.show("WndDailyGiftMoneyUI")
        Global.UI.fastTip('功能暂未开放，敬请期待！');
    }
    private onShouChongFanLiClick() {
        Global.UI.show("WndDailyRechargeGift");
    }

    private onShoulimitedTimeNodeClick() {
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndTimeLimitedRechargeGift")
        Global.UI.show("WndTimeLimitedRechargeGift");
    }

    //打开连续充值红包
    onDailyRedEnvelopeClick() {
        Global.UI.show("WndDailyRedEnvelope")
    }
}

/**
var url = "http://localhost:8080/pic/10001.png";//图片路径
var container = this.user_photo.getComponent(cc.Sprite);//图片呈现位置
this.loadImg(container,url);

//动态加载图片的方法
loadImg: function(container,url){
    cc.loader.load(url, function (err, texture) {
        var sprite  = new cc.SpriteFrame(texture);
        container.spriteFrame = sprite;
    });
} ,
*/