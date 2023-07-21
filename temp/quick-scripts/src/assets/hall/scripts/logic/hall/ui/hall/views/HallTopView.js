"use strict";
cc._RF.push(module, 'ec4d0cgEZFKs4y3l9ni8cgr', 'HallTopView');
// hall/scripts/logic/hall/ui/hall/views/HallTopView.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../../../core/ui/ViewBase");
var HallModel_1 = require("../../../../hallcommon/model/HallModel");
var HallBtnHelper_1 = require("./HallBtnHelper");
var PlayerInfoModel_1 = require("../../../../hallcommon/model/PlayerInfoModel");
var HallTopView = /** @class */ (function (_super) {
    __extends(HallTopView, _super);
    function HallTopView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moreBtn = null; //更多
        _this.timer = null;
        _this.isMoreOpen = false;
        _this.layout_show = null; //固定5个位置
        _this.layout_hide = null; //折叠位置，数量自适应
        _this.activityConfigs = {};
        _this.halltopBtnArr = [];
        return _this;
    }
    HallTopView.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("HallModel");
        this.rechargeModel = Global.ModelManager.getModel("RechargeGiftModel");
        //点击事件注册
        this.shareNode = this.addCommonClick("layout2/shareNode", this.onShareClick, this);
        this.giftNode = this.addCommonClick("layout2/giftNode", this.onGiftClick, this);
        this.fanliNode = this.addCommonClick("layout2/fanliNode", this.onFanliClick, this);
        this.shouChongFanLiNode = this.addCommonClick("layout2/shouChongFanLiNode", this.onShouChongFanLiClick, this);
        this.timeLimitedNode = this.addCommonClick("layout2/limitedTimeNode", this.onShoulimitedTimeNodeClick, this);
        this.zhuanpanNode = this.addCommonClick("layout2/zhuanPanNode", this.onzhuanPanNodeClick, this);
        this.spreadGiftNode = this.addCommonClick("layout2/spreadGiftNode", this.onSpreadGiftNodeClick, this);
        this.hongbao = this.addCommonClick("layout2/hongbao", this.onHongbaoClick, this);
        this.dailyHongBaoNode = this.addCommonClick("layout2/meirihongbao", this.onDailyHongBaoClick, this);
        this.giftNodeRedSpot = this.getChild("layout2/giftNode/hongdian");
        this.spreadRedSpot = this.getChild("layout2/spreadNode/hongdian");
        this.spreadRedSpot.active = false;
        this.spreadCenterNode = this.addCommonClick("layout2/spreadNode", this.onSpreadClick, this);
        this.spreadCenterNode.active = false;
        this.moreBtn = this.getChild("moreBtn");
        this.shareNode = this.addCommonClick("moreBtn", this.onMoreBtnClick, this);
        this.layout_hide = this.getChild("layout_hide");
        this.layout_show = this.getChild("layout_show");
        this.layout2 = this.getChild("layout2");
        this.layout_hide.active = false;
        this.layout_show.active = false;
        this.layout2.active = true;
        this.moreBtn.getChildByName("img_close").active = true;
        this.moreBtn.getChildByName("img_open").active = false;
        if (this.giftNodeRedSpot) {
            this.giftNodeRedSpot.active = false;
        }
        if (this.timeLimitedNode) {
            this.timeLimitedNode.active = false;
            this.timerNode = cc.find("timerNode", this.timeLimitedNode);
            this.timerNode.active = false;
            this.receiveNode = cc.find("receiveNode", this.timeLimitedNode);
            this.receiveNode.active = false;
            this.timerLabel = cc.find("timerLabel", this.timerNode).getComponent(cc.Label);
        }
        this.moneyLabel = this.getComponent("layout2/zhuanyunNode/moneyLabel", cc.Label);
        this.countLabel = this.getComponent("layout2/zhuanyunNode/countLabel", cc.Label);
        this.buzhuNode = this.addCommonClick("layout2/zhuanyunNode", this.onBuZhuClick, this);
        this.actNode = this.addCommonClick("layout2/activityCenter", this.openActivityCenter, this);
        this.shareNode.active = false;
        this.fanliNode.active = false;
        this.shouChongFanLiNode.active = false;
        if (this.zhuanpanNode) {
            this.zhuanpanNode.active = false;
        }
        if (this.spreadGiftNode) {
            this.spreadGiftNode.active = false;
        }
        if (this.hongbao) {
            this.hongbao.active = false;
        }
        if (this.dailyHongBaoNode) {
            this.dailyHongBaoNode.active = false;
        }
        if (this.giftNode) {
            this.giftNode.active = false;
        }
        this.activityConfigs = {
            5: this.zhuanpanNode,
            6: this.shareNode,
            7: this.fanliNode,
            8: this.shouChongFanLiNode,
            10: this.spreadGiftNode,
            16: this.hongbao,
            18: this.giftNode,
            20: this.dailyHongBaoNode,
            21: this.timeLimitedNode,
            22: this.buzhuNode,
            23: this.actNode //活动送金
        };
        this.registEvent();
    };
    HallTopView.prototype.openActivityCenter = function () {
        HallBtnHelper_1.default.WndActivityOpen();
    };
    HallTopView.prototype.onMoreBtnClick = function () {
        var _this = this;
        this.isMoreOpen = !this.isMoreOpen;
        if (this.isMoreOpen) {
            this.moreBtn.getChildByName("img_close").active = false;
            this.moreBtn.getChildByName("img_open").active = true;
            this.layout_hide.scale = 0.2;
            this.layout_hide.active = true;
            cc.tween(this.layout_hide).to(0.2, { scale: 1.1 }).to(0.1, { scale: 1 }).call(function () {
                _this.layout_hide.scale = 1;
            }).start();
        }
        else {
            this.moreBtn.getChildByName("img_close").active = true;
            this.moreBtn.getChildByName("img_open").active = false;
            cc.tween(this.layout_hide).to(0.1, { scale: 0.2 }).call(function () {
                _this.layout_hide.scale = 1;
                _this.layout_hide.active = false;
            }).start();
        }
    };
    HallTopView.prototype.onBuZhuClick = function () {
        var _this = this;
        var param = {};
        Global.HallServer.send(NetAppface.mod, NetAppface.GetSubsidyPoint, param, function (retObj) {
            PlayerInfoModel_1.default.instance.vipSubsidyCount = retObj.times;
            _this.countLabel.string = PlayerInfoModel_1.default.instance.vipSubsidyCount + "";
            Global.UI.show("WndRebateGet", retObj.point);
        }, function (error) {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        }, false, 10);
    };
    HallTopView.prototype.onSpreadClick = function () {
        this.model.closeRedSpot(HallModel_1.HallRedSpotType.Spread);
        HallBtnHelper_1.default.WndSpreadCenterOpen();
        Global.Audio.playAudioSource("hall/sound/share_audio");
    };
    HallTopView.prototype.registEvent = function () {
        Global.Event.on(GlobalEvent.TimeLimitedRechargeStatusChange, this, this.setTimer);
        cc.game.on(cc.game.EVENT_SHOW, this.setTimer, this);
        this.model.on("UpdateResSpot", this, this.updateResSpot);
        //   Global.Event.on(GlobalEvent.PERSONALINFOUPDATE, this, this.checkCommisionRedSpot);
    };
    HallTopView.prototype.onDailyRechargePackClick = function () {
        Global.UI.show("WndHallRedEnvelope");
    };
    HallTopView.prototype.onDailyHongBaoClick = function () {
        HallBtnHelper_1.default.WndDailyHongBaoOpen();
    };
    HallTopView.prototype.onHongbaoClick = function () {
        HallBtnHelper_1.default.WndHongBaoOpen();
    };
    HallTopView.prototype.onzhuanPanNodeClick = function () {
        HallBtnHelper_1.default.WndLuckyDrawOpen();
    };
    HallTopView.prototype.onSpreadGiftNodeClick = function () {
        HallBtnHelper_1.default.WndSpreadGiftOpen();
    };
    HallTopView.prototype.initActivity = function () {
        var activityList = Global.ActivityToggle.activityList;
        var activitySize = activityList.length;
        for (var i = activitySize - 1; i >= 0; i--) {
            var type = activityList[i].atype;
            if (type && activityList[i].button_status == 1) {
                var btn = this.activityConfigs[type];
                if (cc.isValid(btn)) {
                    btn.setSiblingIndex(activityList[i].sort);
                    btn.active = true;
                }
            }
        }
        this.actNode.setSiblingIndex(0);
        if (this.hongbao) {
            var recharge_red = this.model.recharge_red;
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
    };
    HallTopView.prototype.RefreshBtnFunc = function () {
        if (this.halltopBtnArr.length == 0) {
            var arr = [];
            for (var i = 0; i < this.layout2.childrenCount; i++) {
                if (this.layout2.children[i].active == true) {
                    this.halltopBtnArr.push(this.layout2.children[i]);
                }
            }
        }
        this.layout2.active = false;
        for (var i = 0; i < this.halltopBtnArr.length && i < 5; i++) {
            // this.layout_show.addChild(arr[i]);
            this.halltopBtnArr[i].parent = this.layout_show;
            this.halltopBtnArr[i].y = 0;
        }
        this.layout_show.active = true;
        if (this.halltopBtnArr.length > 5) {
            this.moreBtn.active = true;
            for (var i = 5; i < this.halltopBtnArr.length; i++) {
                // this.layout_hide.addChild(arr[i]);
                this.halltopBtnArr[i].parent = this.layout_hide;
                this.halltopBtnArr[i].y = -88;
            }
            this.layout_show.getComponent(cc.Widget).right = 95;
        }
        else {
            cc.log("11111111111111111111111111111111111111111");
            this.moreBtn.active = false;
            this.layout_show.getComponent(cc.Widget).right = 10;
        }
    };
    HallTopView.prototype.checkDailyGiftRedSpot = function () {
        var DailyGiftRedFlag = this.model.DailyGiftRedSpotActive;
        if (this.giftNodeRedSpot) {
            this.giftNodeRedSpot.active = DailyGiftRedFlag;
        }
    };
    HallTopView.prototype.updateResSpot = function (redSpotType) {
        switch (redSpotType) {
            case HallModel_1.HallRedSpotType.DailyGift:
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
    };
    HallTopView.prototype.onSubViewShow = function () {
        Global.Event.on(GlobalEvent.SHOW_SPREAD_NODE, this, this.showSpreadNode);
        this.initActivity();
        this.checkDailyGiftRedSpot();
        this.updatePlatformState();
        this.setTimer();
        this.SetCommiType();
        //  this.checkCommisionRedSpot()
    };
    HallTopView.prototype.showSpreadNode = function (data) {
        this.spreadCenterNode.active = true;
    };
    HallTopView.prototype.SetCommiType = function () {
        var SpreadModel = Global.ModelManager.getModel("SpreadModel");
        var RedFlag = SpreadModel.RedFLag;
        if (RedFlag) {
            this.spreadRedSpot.active = true;
        }
        var cmmi_type = SpreadModel.commiType;
        this.spreadCenterNode.active = cmmi_type != 0;
    };
    HallTopView.prototype.updatePlatformState = function () {
        var isWXEnable = Global.Toolkit.checkIsPlatformShowWX();
        if (this.shareNode && !isWXEnable) {
            this.shareNode.active = false;
        }
    };
    HallTopView.prototype.clearTimeOut = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = null;
    };
    HallTopView.prototype.setTimer = function (flag) {
        var _this = this;
        if (flag === void 0) { flag = true; }
        if (!this.rechargeModel)
            return;
        if (!flag && this.receiveNode && this.timerNode) { // flag = false 表示推送过来参与活动了
            this.clearTimeOut();
            this.timeLimitedNode.active = true;
            this.receiveNode.active = true;
            this.timerNode.active = false;
            this.rechargeModel.TimelimitedStatus = 2;
            return;
        }
        if (this.rechargeModel.TimelimitedStatus == 1 && this.receiveNode && this.timerNode) { //TimelimitedStatus =1 未参与 >1 参与
            this.receiveNode.active = false;
            if (this.rechargeModel.CountDown != -1) {
                this.clearTimeOut();
                var currentTime = new Date().getTime();
                var time_1 = this.rechargeModel.CountDown * 1000 - currentTime;
                time_1 = Math.ceil(time_1 / 1000);
                this.timerNode.active = time_1 > 0;
                this.timer = setInterval(function () {
                    var str = Global.Toolkit.secondFormatHMS(time_1);
                    var arr = str.split(":");
                    str = arr.join('s');
                    _this.timerLabel.string = str;
                    time_1 -= 1;
                    if (time_1 <= 0 && _this.rechargeModel.TimelimitedStatus < 2) {
                        _this.clearTimeOut();
                        _this.timeLimitedNode.active = false;
                    }
                }, 1000);
            }
        }
        else if (this.rechargeModel.TimelimitedStatus > 1 && this.receiveNode && this.timerNode) {
            this.timeLimitedNode.active = true;
            if (this.receiveNode && this.timerNode) {
                this.receiveNode.active = true;
                this.timerNode.active = false;
            }
        }
        else {
            this.timeLimitedNode.active = false;
        }
    };
    HallTopView.prototype.onSubViewHide = function () {
    };
    HallTopView.prototype.onDispose = function () {
        this.clearTimeOut();
        cc.game.off(cc.game.EVENT_SHOW, this.setTimer, this);
        this.model.off("UpdateResSpot", this, this.updateResSpot);
        Global.Event.off(GlobalEvent.TimeLimitedRechargeStatusChange, this, this.setTimer);
        this.model.off("UpdateResSpot", this, this.updateResSpot);
        //  Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.checkCommisionRedSpot);
    };
    HallTopView.prototype.onSpreedCenterClick = function () {
        this.model.closeRedSpot(HallModel_1.HallRedSpotType.Spread);
        HallBtnHelper_1.default.WndSpreadCenterOpen();
        Global.Audio.playAudioSource("hall/sound/share_audio");
    };
    HallTopView.prototype.onShareClick = function () {
        Global.UI.show("WndShare");
        Global.Audio.playAudioSource("hall/sound/sharemoney");
    };
    HallTopView.prototype.onFanliClick = function () {
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndDailyCashBackUI");
        // Global.UI.show("WndCashBackDayUI")
        Global.UI.show("WndDailyCashBackUI");
    };
    HallTopView.prototype.onGiftClick = function () {
        // Global.UI.show("WndDailyGiftMoneyUI")
        Global.UI.fastTip('功能暂未开放，敬请期待！');
    };
    HallTopView.prototype.onShouChongFanLiClick = function () {
        Global.UI.show("WndDailyRechargeGift");
    };
    HallTopView.prototype.onShoulimitedTimeNodeClick = function () {
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndTimeLimitedRechargeGift");
        Global.UI.show("WndTimeLimitedRechargeGift");
    };
    //打开连续充值红包
    HallTopView.prototype.onDailyRedEnvelopeClick = function () {
        Global.UI.show("WndDailyRedEnvelope");
    };
    return HallTopView;
}(ViewBase_1.default));
exports.default = HallTopView;
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

cc._RF.pop();