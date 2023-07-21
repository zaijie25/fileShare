
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/views/HallTopView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFx2aWV3c1xcSGFsbFRvcFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQW9EO0FBQ3BELG9FQUFvRjtBQUNwRixpREFBNEM7QUFFNUMsZ0ZBQTJFO0FBRTNFO0lBQXlDLCtCQUFRO0lBQWpEO1FBQUEscUVBb2NDO1FBN2FXLGFBQU8sR0FBWSxJQUFJLENBQUMsQ0FBQyxJQUFJO1FBUTdCLFdBQUssR0FBRyxJQUFJLENBQUE7UUFHcEIsZ0JBQVUsR0FBRyxLQUFLLENBQUM7UUFHWCxpQkFBVyxHQUFZLElBQUksQ0FBQyxDQUFDLFFBQVE7UUFDckMsaUJBQVcsR0FBWSxJQUFJLENBQUMsQ0FBQyxZQUFZO1FBRXpDLHFCQUFlLEdBQUcsRUFBRSxDQUFDO1FBcUtyQixtQkFBYSxHQUFHLEVBQUUsQ0FBQzs7SUF1UC9CLENBQUM7SUEzWmEsOEJBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFjLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxhQUFhLEdBQXNCLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFMUYsUUFBUTtRQUNSLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2xGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQy9FLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFF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LyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgSGFsbE1vZGVsLCB7IEhhbGxSZWRTcG90VHlwZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0hhbGxNb2RlbFwiO1xyXG5pbXBvcnQgSGFsbEJ0bkhlbHBlciBmcm9tIFwiLi9IYWxsQnRuSGVscGVyXCI7XHJcbmltcG9ydCBSZWNoYXJnZUdpZnRNb2RlbCBmcm9tIFwiLi4vLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9SZWNoYXJnZUdpZnRNb2RlbFwiO1xyXG5pbXBvcnQgUGxheWVySW5mb01vZGVsIGZyb20gXCIuLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1BsYXllckluZm9Nb2RlbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFsbFRvcFZpZXcgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICBwcml2YXRlIG1vZGVsOiBIYWxsTW9kZWw7XHJcbiAgICBwcml2YXRlIHJlY2hhcmdlTW9kZWw6IFJlY2hhcmdlR2lmdE1vZGVsXHJcblxyXG5cclxuICAgIC8vIOWkp+WOhemhtumDqOaJgOacieaMiemSrumbhuWQiFxyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFxyXG4gICAgc2hhcmVOb2RlOiBjYy5Ob2RlOy8vIOWIhuS6q+mAgemHkVxyXG4gICAgZmFubGlOb2RlOiBjYy5Ob2RlOyAvL+avj+aXpea1geawtOi/lOWIqVxyXG4gICAgc2hvdUNob25nRmFuTGlOb2RlOiBjYy5Ob2RlOyAvLyDpppblhYXov5TliKlcclxuICAgIHRpbWVMaW1pdGVkTm9kZTogY2MuTm9kZSAvLyDpmZDml7bpppblhYXov5TliKlcclxuICAgIGdpZnROb2RlOiBjYy5Ob2RlIC8v5q+P5pel56S86YeRXHJcbiAgICB6aHVhbnBhbk5vZGU6IGNjLk5vZGUgLy8g5bm46L+Q6L2s55uYXHJcbiAgICBzcHJlYWRHaWZ0Tm9kZTogY2MuTm9kZSAvLyDmjqjlub/pgIHph5FcclxuICAgIGhvbmdiYW86IGNjLk5vZGUgLy8g5q+P5pel5YWF5YC857qi5YyFXHJcbiAgICBkYWlseUhvbmdCYW9Ob2RlOiBjYy5Ob2RlIC8v6L+e57ut5YWF5YC857qi5YyFXHJcbiAgICBidXpodU5vZGU6IGNjLk5vZGU7IC8v6L2s6L+Q6YeRXHJcbiAgICBhY3ROb2RlOiBjYy5Ob2RlIC8v5rS75Yqo6YCB6YeRXHJcblxyXG5cclxuICAgIHByaXZhdGUgc3ByZWFkUmVkU3BvdDogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgc3ByZWFkQ2VudGVyTm9kZTpjYy5Ob2RlXHJcblxyXG4gICAgcHJpdmF0ZSBtb3JlQnRuOiBjYy5Ob2RlID0gbnVsbDsgLy/mm7TlpJpcclxuXHJcbiAgICB0aW1lck5vZGU6IGNjLk5vZGVcclxuICAgIHRpbWVyTGFiZWw6IGNjLkxhYmVsXHJcbiAgICByZWNlaXZlTm9kZTogY2MuTm9kZVxyXG4gICAgZ2lmdE5vZGVSZWRTcG90OiBjYy5Ob2RlOy8v5q+P5pel56S86YeR57qi54K5XHJcbiAgICBwcml2YXRlIG1vbmV5TGFiZWw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBjb3VudExhYmVsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgdGltZXIgPSBudWxsXHJcblxyXG5cclxuICAgIGlzTW9yZU9wZW4gPSBmYWxzZTtcclxuXHJcbiAgICBsYXlvdXQyOiBjYy5Ob2RlXHJcbiAgICBwcml2YXRlIGxheW91dF9zaG93OiBjYy5Ob2RlID0gbnVsbDsgLy/lm7rlrpo15Liq5L2N572uXHJcbiAgICBwcml2YXRlIGxheW91dF9oaWRlOiBjYy5Ob2RlID0gbnVsbDsgLy/mipjlj6DkvY3nva7vvIzmlbDph4/oh6rpgILlupRcclxuXHJcbiAgICBwcml2YXRlIGFjdGl2aXR5Q29uZmlncyA9IHt9O1xyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSA8SGFsbE1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJIYWxsTW9kZWxcIik7XHJcbiAgICAgICAgdGhpcy5yZWNoYXJnZU1vZGVsID0gPFJlY2hhcmdlR2lmdE1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJSZWNoYXJnZUdpZnRNb2RlbFwiKTtcclxuXHJcbiAgICAgICAgLy/ngrnlh7vkuovku7bms6jlhoxcclxuICAgICAgICB0aGlzLnNoYXJlTm9kZSA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJsYXlvdXQyL3NoYXJlTm9kZVwiLCB0aGlzLm9uU2hhcmVDbGljaywgdGhpcylcclxuICAgICAgICB0aGlzLmdpZnROb2RlID0gdGhpcy5hZGRDb21tb25DbGljayhcImxheW91dDIvZ2lmdE5vZGVcIiwgdGhpcy5vbkdpZnRDbGljaywgdGhpcylcclxuICAgICAgICB0aGlzLmZhbmxpTm9kZSA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJsYXlvdXQyL2ZhbmxpTm9kZVwiLCB0aGlzLm9uRmFubGlDbGljaywgdGhpcylcclxuICAgICAgICB0aGlzLnNob3VDaG9uZ0ZhbkxpTm9kZSA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJsYXlvdXQyL3Nob3VDaG9uZ0ZhbkxpTm9kZVwiLCB0aGlzLm9uU2hvdUNob25nRmFuTGlDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy50aW1lTGltaXRlZE5vZGUgPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwibGF5b3V0Mi9saW1pdGVkVGltZU5vZGVcIiwgdGhpcy5vblNob3VsaW1pdGVkVGltZU5vZGVDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy56aHVhbnBhbk5vZGUgPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwibGF5b3V0Mi96aHVhblBhbk5vZGVcIiwgdGhpcy5vbnpodWFuUGFuTm9kZUNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnNwcmVhZEdpZnROb2RlID0gdGhpcy5hZGRDb21tb25DbGljayhcImxheW91dDIvc3ByZWFkR2lmdE5vZGVcIiwgdGhpcy5vblNwcmVhZEdpZnROb2RlQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaG9uZ2JhbyA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJsYXlvdXQyL2hvbmdiYW9cIiwgdGhpcy5vbkhvbmdiYW9DbGljaywgdGhpcylcclxuICAgICAgICB0aGlzLmRhaWx5SG9uZ0Jhb05vZGUgPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwibGF5b3V0Mi9tZWlyaWhvbmdiYW9cIiwgdGhpcy5vbkRhaWx5SG9uZ0Jhb0NsaWNrLCB0aGlzKVxyXG4gICAgICAgIHRoaXMuZ2lmdE5vZGVSZWRTcG90ID0gdGhpcy5nZXRDaGlsZChcImxheW91dDIvZ2lmdE5vZGUvaG9uZ2RpYW5cIilcclxuXHJcbiAgICAgICAgdGhpcy5zcHJlYWRSZWRTcG90ID0gdGhpcy5nZXRDaGlsZChcImxheW91dDIvc3ByZWFkTm9kZS9ob25nZGlhblwiKTtcclxuICAgICAgICB0aGlzLnNwcmVhZFJlZFNwb3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcHJlYWRDZW50ZXJOb2RlID0gdGhpcy5hZGRDb21tb25DbGljayhcImxheW91dDIvc3ByZWFkTm9kZVwiLCB0aGlzLm9uU3ByZWFkQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc3ByZWFkQ2VudGVyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5tb3JlQnRuID0gdGhpcy5nZXRDaGlsZChcIm1vcmVCdG5cIik7XHJcbiAgICAgICAgdGhpcy5zaGFyZU5vZGUgPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwibW9yZUJ0blwiLCB0aGlzLm9uTW9yZUJ0bkNsaWNrLCB0aGlzKVxyXG5cclxuICAgICAgICB0aGlzLmxheW91dF9oaWRlID0gdGhpcy5nZXRDaGlsZChcImxheW91dF9oaWRlXCIpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0X3Nob3cgPSB0aGlzLmdldENoaWxkKFwibGF5b3V0X3Nob3dcIik7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQyID0gdGhpcy5nZXRDaGlsZChcImxheW91dDJcIik7XHJcblxyXG4gICAgICAgIHRoaXMubGF5b3V0X2hpZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sYXlvdXRfc2hvdy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxheW91dDIuYWN0aXZlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5tb3JlQnRuLmdldENoaWxkQnlOYW1lKFwiaW1nX2Nsb3NlXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tb3JlQnRuLmdldENoaWxkQnlOYW1lKFwiaW1nX29wZW5cIikuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmdpZnROb2RlUmVkU3BvdCkge1xyXG4gICAgICAgICAgICB0aGlzLmdpZnROb2RlUmVkU3BvdC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy50aW1lTGltaXRlZE5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lTGltaXRlZE5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy50aW1lck5vZGUgPSBjYy5maW5kKFwidGltZXJOb2RlXCIsIHRoaXMudGltZUxpbWl0ZWROb2RlKVxyXG4gICAgICAgICAgICB0aGlzLnRpbWVyTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVOb2RlID0gY2MuZmluZChcInJlY2VpdmVOb2RlXCIsIHRoaXMudGltZUxpbWl0ZWROb2RlKVxyXG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMudGltZXJMYWJlbCA9IGNjLmZpbmQoXCJ0aW1lckxhYmVsXCIsIHRoaXMudGltZXJOb2RlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9uZXlMYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwibGF5b3V0Mi96aHVhbnl1bk5vZGUvbW9uZXlMYWJlbFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5jb3VudExhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJsYXlvdXQyL3podWFueXVuTm9kZS9jb3VudExhYmVsXCIsIGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmJ1emh1Tm9kZSA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJsYXlvdXQyL3podWFueXVuTm9kZVwiLCB0aGlzLm9uQnVaaHVDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hY3ROb2RlID0gdGhpcy5hZGRDb21tb25DbGljayhcImxheW91dDIvYWN0aXZpdHlDZW50ZXJcIiwgdGhpcy5vcGVuQWN0aXZpdHlDZW50ZXIsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnNoYXJlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZhbmxpTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3VDaG9uZ0ZhbkxpTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy56aHVhbnBhbk5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy56aHVhbnBhbk5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNwcmVhZEdpZnROb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByZWFkR2lmdE5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmhvbmdiYW8pIHtcclxuICAgICAgICAgICAgdGhpcy5ob25nYmFvLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5kYWlseUhvbmdCYW9Ob2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGFpbHlIb25nQmFvTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5naWZ0Tm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmdpZnROb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWN0aXZpdHlDb25maWdzID0ge1xyXG4gICAgICAgICAgICA1OiB0aGlzLnpodWFucGFuTm9kZSwgLy/lubjov5Dovaznm5hcclxuICAgICAgICAgICAgNjogdGhpcy5zaGFyZU5vZGUsICAvL+WIhuS6q+mAgemHkVxyXG4gICAgICAgICAgICA3OiB0aGlzLmZhbmxpTm9kZSwgIC8vIOa1geawtOi/lOWIqVxyXG4gICAgICAgICAgICA4OiB0aGlzLnNob3VDaG9uZ0ZhbkxpTm9kZSwgLy/pppblhrLov5TliKlcclxuICAgICAgICAgICAgMTA6IHRoaXMuc3ByZWFkR2lmdE5vZGUsIC8v5o6o5bm/5b2p6YeRXHJcbiAgICAgICAgICAgIDE2OiB0aGlzLmhvbmdiYW8sICAgLy8g5q+P5pel5YWF5YC857qi5YyFXHJcbiAgICAgICAgICAgIDE4OiB0aGlzLmdpZnROb2RlLCAvL+avj+aXpeekvOmHkVxyXG4gICAgICAgICAgICAyMDogdGhpcy5kYWlseUhvbmdCYW9Ob2RlLCAvL+i/nue7reWFheWAvOe6ouWMhVxyXG4gICAgICAgICAgICAyMTogdGhpcy50aW1lTGltaXRlZE5vZGUsICAgIC8v6ZmQ5pe26aaW5YWF6L+U5YipXHJcbiAgICAgICAgICAgIDIyOiB0aGlzLmJ1emh1Tm9kZSwgLy/ovazov5Dph5FcclxuICAgICAgICAgICAgMjM6IHRoaXMuYWN0Tm9kZSAvL+a0u+WKqOmAgemHkVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlZ2lzdEV2ZW50KClcclxuICAgIH1cclxuXHJcbiAgICBvcGVuQWN0aXZpdHlDZW50ZXIoKSB7XHJcbiAgICAgICAgSGFsbEJ0bkhlbHBlci5XbmRBY3Rpdml0eU9wZW4oKVxyXG4gICAgfVxyXG5cclxuICBcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvbk1vcmVCdG5DbGljaygpIHtcclxuICAgICAgICB0aGlzLmlzTW9yZU9wZW4gPSAhdGhpcy5pc01vcmVPcGVuO1xyXG4gICAgICAgIGlmICh0aGlzLmlzTW9yZU9wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5tb3JlQnRuLmdldENoaWxkQnlOYW1lKFwiaW1nX2Nsb3NlXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1vcmVCdG4uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfb3BlblwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dF9oaWRlLnNjYWxlID0gMC4yO1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dF9oaWRlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubGF5b3V0X2hpZGUpLnRvKDAuMiwgeyBzY2FsZTogMS4xIH0pLnRvKDAuMSwgeyBzY2FsZTogMSB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5b3V0X2hpZGUuc2NhbGUgPSAxO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1vcmVCdG4uZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfY2xvc2VcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5tb3JlQnRuLmdldENoaWxkQnlOYW1lKFwiaW1nX29wZW5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMubGF5b3V0X2hpZGUpLnRvKDAuMSwgeyBzY2FsZTogMC4yIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXlvdXRfaGlkZS5zY2FsZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheW91dF9oaWRlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQnVaaHVDbGljaygpIHtcclxuICAgICAgICBsZXQgcGFyYW06IGFueSA9IHt9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRTdWJzaWR5UG9pbnQsIHBhcmFtLCAocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS52aXBTdWJzaWR5Q291bnQgPSByZXRPYmoudGltZXNcclxuICAgICAgICAgICAgdGhpcy5jb3VudExhYmVsLnN0cmluZyA9IFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS52aXBTdWJzaWR5Q291bnQgKyBcIlwiO1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFJlYmF0ZUdldFwiLCByZXRPYmoucG9pbnQpO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChlcnJvci5fZXJyc3RyKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgIH0sIGZhbHNlLCAxMCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uU3ByZWFkQ2xpY2soKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW9kZWwuY2xvc2VSZWRTcG90KEhhbGxSZWRTcG90VHlwZS5TcHJlYWQpO1xyXG4gICAgICAgIEhhbGxCdG5IZWxwZXIuV25kU3ByZWFkQ2VudGVyT3BlbigpO1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QXVkaW9Tb3VyY2UoXCJoYWxsL3NvdW5kL3NoYXJlX2F1ZGlvXCIpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgcmVnaXN0RXZlbnQoKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LlRpbWVMaW1pdGVkUmVjaGFyZ2VTdGF0dXNDaGFuZ2UsIHRoaXMsIHRoaXMuc2V0VGltZXIpO1xyXG4gICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9TSE9XLCB0aGlzLnNldFRpbWVyLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm1vZGVsLm9uKFwiVXBkYXRlUmVzU3BvdFwiLCB0aGlzLCB0aGlzLnVwZGF0ZVJlc1Nwb3QpO1xyXG4gICAgIC8vICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LlBFUlNPTkFMSU5GT1VQREFURSwgdGhpcywgdGhpcy5jaGVja0NvbW1pc2lvblJlZFNwb3QpO1xyXG4gICAgfVxyXG4gICAgb25EYWlseVJlY2hhcmdlUGFja0NsaWNrKCkge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kSGFsbFJlZEVudmVsb3BlXCIpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uRGFpbHlIb25nQmFvQ2xpY2soKSB7XHJcbiAgICAgICAgSGFsbEJ0bkhlbHBlci5XbmREYWlseUhvbmdCYW9PcGVuKClcclxuICAgIH1cclxuXHJcbiAgICBvbkhvbmdiYW9DbGljaygpIHtcclxuICAgICAgICBIYWxsQnRuSGVscGVyLlduZEhvbmdCYW9PcGVuKClcclxuICAgIH1cclxuXHJcbiAgICBvbnpodWFuUGFuTm9kZUNsaWNrKCkge1xyXG4gICAgICAgIEhhbGxCdG5IZWxwZXIuV25kTHVja3lEcmF3T3BlbigpXHJcbiAgICB9XHJcblxyXG4gICAgb25TcHJlYWRHaWZ0Tm9kZUNsaWNrKCkge1xyXG4gICAgICAgIEhhbGxCdG5IZWxwZXIuV25kU3ByZWFkR2lmdE9wZW4oKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFsbHRvcEJ0bkFyciA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgaW5pdEFjdGl2aXR5KCkge1xyXG4gICAgICAgIGxldCBhY3Rpdml0eUxpc3QgPSBHbG9iYWwuQWN0aXZpdHlUb2dnbGUuYWN0aXZpdHlMaXN0O1xyXG4gICAgICAgIGxldCBhY3Rpdml0eVNpemUgPSBhY3Rpdml0eUxpc3QubGVuZ3RoO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBhY3Rpdml0eVNpemUgLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IGFjdGl2aXR5TGlzdFtpXS5hdHlwZTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgJiYgYWN0aXZpdHlMaXN0W2ldLmJ1dHRvbl9zdGF0dXMgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ0bjogY2MuTm9kZSA9IHRoaXMuYWN0aXZpdHlDb25maWdzW3R5cGVdXHJcbiAgICAgICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChidG4pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLnNldFNpYmxpbmdJbmRleChhY3Rpdml0eUxpc3RbaV0uc29ydClcclxuICAgICAgICAgICAgICAgICAgICBidG4uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHRoaXMuYWN0Tm9kZS5zZXRTaWJsaW5nSW5kZXgoMCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmhvbmdiYW8pIHtcclxuICAgICAgICAgICAgbGV0IHJlY2hhcmdlX3JlZCA9IHRoaXMubW9kZWwucmVjaGFyZ2VfcmVkXHJcbiAgICAgICAgICAgIGlmIChyZWNoYXJnZV9yZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG9uZ2Jhby5hY3RpdmUgPSByZWNoYXJnZV9yZWQuaXNfc2hvdztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/kuLTml7blvLrliLblhbPpl63mtLvliqjlhaXlj6MgIGJ5IGNyaXNcclxuICAgICAgICAvLyB0aGlzLnNwcmVhZEdpZnROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMuZ2lmdE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIGlmKHRoaXMuY29taXNzaW9uTm9kZSl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuY29taXNzaW9uTm9kZS5zZXRTaWJsaW5nSW5kZXgoMClcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIHRoaXMuUmVmcmVzaEJ0bkZ1bmMoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgUmVmcmVzaEJ0bkZ1bmMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFsbHRvcEJ0bkFyci5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXlvdXQyLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGF5b3V0Mi5jaGlsZHJlbltpXS5hY3RpdmUgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFsbHRvcEJ0bkFyci5wdXNoKHRoaXMubGF5b3V0Mi5jaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXlvdXQyLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaGFsbHRvcEJ0bkFyci5sZW5ndGggJiYgaSA8IDU7IGkrKykge1xyXG4gICAgICAgICAgICAvLyB0aGlzLmxheW91dF9zaG93LmFkZENoaWxkKGFycltpXSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGFsbHRvcEJ0bkFycltpXS5wYXJlbnQgPSB0aGlzLmxheW91dF9zaG93O1xyXG4gICAgICAgICAgICB0aGlzLmhhbGx0b3BCdG5BcnJbaV0ueSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGF5b3V0X3Nob3cuYWN0aXZlID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmhhbGx0b3BCdG5BcnIubGVuZ3RoID4gNSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vcmVCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDU7IGkgPCB0aGlzLmhhbGx0b3BCdG5BcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubGF5b3V0X2hpZGUuYWRkQ2hpbGQoYXJyW2ldKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFsbHRvcEJ0bkFycltpXS5wYXJlbnQgPSB0aGlzLmxheW91dF9oaWRlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYWxsdG9wQnRuQXJyW2ldLnkgPSAtODg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRfc2hvdy5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS5yaWdodCA9IDk1O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBjYy5sb2coXCIxMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMVwiKVxyXG5cclxuICAgICAgICAgICAgdGhpcy5tb3JlQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dF9zaG93LmdldENvbXBvbmVudChjYy5XaWRnZXQpLnJpZ2h0ID0gMTA7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgY2hlY2tEYWlseUdpZnRSZWRTcG90KCkge1xyXG4gICAgICAgIGxldCBEYWlseUdpZnRSZWRGbGFnID0gdGhpcy5tb2RlbC5EYWlseUdpZnRSZWRTcG90QWN0aXZlO1xyXG4gICAgICAgIGlmICh0aGlzLmdpZnROb2RlUmVkU3BvdCkge1xyXG4gICAgICAgICAgICB0aGlzLmdpZnROb2RlUmVkU3BvdC5hY3RpdmUgPSBEYWlseUdpZnRSZWRGbGFnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVJlc1Nwb3QocmVkU3BvdFR5cGUpIHtcclxuICAgICAgICBzd2l0Y2ggKHJlZFNwb3RUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgSGFsbFJlZFNwb3RUeXBlLkRhaWx5R2lmdDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdpZnROb2RlUmVkU3BvdC5hY3RpdmUgPSB0aGlzLm1vZGVsLkRhaWx5R2lmdFJlZFNwb3RBY3RpdmU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNhc2UgSGFsbFJlZFNwb3RUeXBlLkNvbW1pc2lvbjpcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLmNvbW1pc2lvblJlZFJwb3QuYWN0aXZlID0gdGhpcy5tb2RlbC5Db21taXNpb25SZWRTcG90QWN0aXZlO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIG9uU3ViVmlld1Nob3coKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LlNIT1dfU1BSRUFEX05PREUsIHRoaXMsIHRoaXMuc2hvd1NwcmVhZE5vZGUpO1xyXG4gICAgICAgIHRoaXMuaW5pdEFjdGl2aXR5KCk7XHJcbiAgICAgICAgdGhpcy5jaGVja0RhaWx5R2lmdFJlZFNwb3QoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXRmb3JtU3RhdGUoKVxyXG4gICAgICAgIHRoaXMuc2V0VGltZXIoKVxyXG4gICAgICAgIHRoaXMuU2V0Q29tbWlUeXBlKCk7XHJcbiAgICAgIC8vICB0aGlzLmNoZWNrQ29tbWlzaW9uUmVkU3BvdCgpXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1NwcmVhZE5vZGUoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuc3ByZWFkQ2VudGVyTm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICB9XHJcblxyXG5cclxuICAgIFNldENvbW1pVHlwZSgpIHtcclxuICAgICAgICB2YXIgU3ByZWFkTW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiU3ByZWFkTW9kZWxcIik7XHJcbiAgICAgICAgbGV0IFJlZEZsYWcgPSBTcHJlYWRNb2RlbC5SZWRGTGFnXHJcbiAgICAgICAgaWYgKFJlZEZsYWcpIHtcclxuICAgICAgICAgICAgdGhpcy5zcHJlYWRSZWRTcG90LmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNtbWlfdHlwZSA9IFNwcmVhZE1vZGVsLmNvbW1pVHlwZVxyXG4gICAgICAgIHRoaXMuc3ByZWFkQ2VudGVyTm9kZS5hY3RpdmUgPSBjbW1pX3R5cGUgIT0gMFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlUGxhdGZvcm1TdGF0ZSgpIHtcclxuICAgICAgICBsZXQgaXNXWEVuYWJsZSA9IEdsb2JhbC5Ub29sa2l0LmNoZWNrSXNQbGF0Zm9ybVNob3dXWCgpXHJcbiAgICAgICAgaWYgKHRoaXMuc2hhcmVOb2RlICYmICFpc1dYRW5hYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcmVOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyVGltZU91dCgpIHtcclxuICAgICAgICBpZiAodGhpcy50aW1lcikge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZXIgPSBudWxsXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRUaW1lcihmbGFnID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5yZWNoYXJnZU1vZGVsKSByZXR1cm5cclxuICAgICAgICBpZiAoIWZsYWcgJiYgdGhpcy5yZWNlaXZlTm9kZSAmJiB0aGlzLnRpbWVyTm9kZSkgeyAvLyBmbGFnID0gZmFsc2Ug6KGo56S65o6o6YCB6L+H5p2l5Y+C5LiO5rS75Yqo5LqGXHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lT3V0KClcclxuICAgICAgICAgICAgdGhpcy50aW1lTGltaXRlZE5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVOb2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy50aW1lck5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5yZWNoYXJnZU1vZGVsLlRpbWVsaW1pdGVkU3RhdHVzID0gMlxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucmVjaGFyZ2VNb2RlbC5UaW1lbGltaXRlZFN0YXR1cyA9PSAxICYmIHRoaXMucmVjZWl2ZU5vZGUgJiYgdGhpcy50aW1lck5vZGUpIHsgLy9UaW1lbGltaXRlZFN0YXR1cyA9MSDmnKrlj4LkuI4gPjEg5Y+C5LiOXHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlY2hhcmdlTW9kZWwuQ291bnREb3duICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZU91dCgpXHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxyXG4gICAgICAgICAgICAgICAgbGV0IHRpbWUgPSB0aGlzLnJlY2hhcmdlTW9kZWwuQ291bnREb3duICogMTAwMCAtIGN1cnJlbnRUaW1lXHJcbiAgICAgICAgICAgICAgICB0aW1lID0gTWF0aC5jZWlsKHRpbWUgLyAxMDAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lck5vZGUuYWN0aXZlID0gdGltZSA+IDBcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHIgPSBHbG9iYWwuVG9vbGtpdC5zZWNvbmRGb3JtYXRITVModGltZSlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYXJyID0gc3RyLnNwbGl0KFwiOlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHN0ciA9IGFyci5qb2luKCdzJylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVyTGFiZWwuc3RyaW5nID0gc3RyXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZSAtPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWUgPD0gMCAmJiB0aGlzLnJlY2hhcmdlTW9kZWwuVGltZWxpbWl0ZWRTdGF0dXMgPCAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lT3V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lTGltaXRlZE5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLnJlY2hhcmdlTW9kZWwuVGltZWxpbWl0ZWRTdGF0dXMgPiAxICYmIHRoaXMucmVjZWl2ZU5vZGUgJiYgdGhpcy50aW1lck5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lTGltaXRlZE5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5yZWNlaXZlTm9kZSAmJiB0aGlzLnRpbWVyTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNlaXZlTm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVyTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lTGltaXRlZE5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgb25TdWJWaWV3SGlkZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lT3V0KClcclxuICAgICAgICBjYy5nYW1lLm9mZihjYy5nYW1lLkVWRU5UX1NIT1csIHRoaXMuc2V0VGltZXIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubW9kZWwub2ZmKFwiVXBkYXRlUmVzU3BvdFwiLCB0aGlzLCB0aGlzLnVwZGF0ZVJlc1Nwb3QpO1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuVGltZUxpbWl0ZWRSZWNoYXJnZVN0YXR1c0NoYW5nZSwgdGhpcywgdGhpcy5zZXRUaW1lcik7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5vZmYoXCJVcGRhdGVSZXNTcG90XCIsIHRoaXMsIHRoaXMudXBkYXRlUmVzU3BvdCk7XHJcbiAgICAgIC8vICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50LlBFUlNPTkFMSU5GT1VQREFURSwgdGhpcywgdGhpcy5jaGVja0NvbW1pc2lvblJlZFNwb3QpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIG9uU3ByZWVkQ2VudGVyQ2xpY2soKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5jbG9zZVJlZFNwb3QoSGFsbFJlZFNwb3RUeXBlLlNwcmVhZCk7XHJcbiAgICAgICAgSGFsbEJ0bkhlbHBlci5XbmRTcHJlYWRDZW50ZXJPcGVuKCk7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlBdWRpb1NvdXJjZShcImhhbGwvc291bmQvc2hhcmVfYXVkaW9cIilcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIG9uU2hhcmVDbGljaygpIHtcclxuICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFNoYXJlXCIpXHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlBdWRpb1NvdXJjZShcImhhbGwvc291bmQvc2hhcmVtb25leVwiKVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvbkZhbmxpQ2xpY2soKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNIT1dfTkVUX1dBSVRJTkcsIFwiV25kRGFpbHlDYXNoQmFja1VJXCIpXHJcbiAgICAgICAgLy8gR2xvYmFsLlVJLnNob3coXCJXbmRDYXNoQmFja0RheVVJXCIpXHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmREYWlseUNhc2hCYWNrVUlcIilcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25HaWZ0Q2xpY2soKSB7XHJcbiAgICAgICAgLy8gR2xvYmFsLlVJLnNob3coXCJXbmREYWlseUdpZnRNb25leVVJXCIpXHJcbiAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoJ+WKn+iDveaaguacquW8gOaUvu+8jOaVrOivt+acn+W+he+8gScpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblNob3VDaG9uZ0ZhbkxpQ2xpY2soKSB7XHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmREYWlseVJlY2hhcmdlR2lmdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU2hvdWxpbWl0ZWRUaW1lTm9kZUNsaWNrKCkge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TSE9XX05FVF9XQUlUSU5HLCBcIlduZFRpbWVMaW1pdGVkUmVjaGFyZ2VHaWZ0XCIpXHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRUaW1lTGltaXRlZFJlY2hhcmdlR2lmdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aJk+W8gOi/nue7reWFheWAvOe6ouWMhVxyXG4gICAgb25EYWlseVJlZEVudmVsb3BlQ2xpY2soKSB7XHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmREYWlseVJlZEVudmVsb3BlXCIpXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG52YXIgdXJsID0gXCJodHRwOi8vbG9jYWxob3N0OjgwODAvcGljLzEwMDAxLnBuZ1wiOy8v5Zu+54mH6Lev5b6EXHJcbnZhciBjb250YWluZXIgPSB0aGlzLnVzZXJfcGhvdG8uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7Ly/lm77niYflkYjnjrDkvY3nva5cclxudGhpcy5sb2FkSW1nKGNvbnRhaW5lcix1cmwpO1xyXG5cclxuLy/liqjmgIHliqDovb3lm77niYfnmoTmlrnms5VcclxubG9hZEltZzogZnVuY3Rpb24oY29udGFpbmVyLHVybCl7XHJcbiAgICBjYy5sb2FkZXIubG9hZCh1cmwsIGZ1bmN0aW9uIChlcnIsIHRleHR1cmUpIHtcclxuICAgICAgICB2YXIgc3ByaXRlICA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICBjb250YWluZXIuc3ByaXRlRnJhbWUgPSBzcHJpdGU7XHJcbiAgICB9KTtcclxufSAsXHJcbiovIl19