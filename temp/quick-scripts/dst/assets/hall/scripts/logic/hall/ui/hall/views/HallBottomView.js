
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/views/HallBottomView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1cff64n0zZO8JD5KbKG45Dt', 'HallBottomView');
// hall/scripts/logic/hall/ui/hall/views/HallBottomView.ts

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
var HallBtnHelper_1 = require("./HallBtnHelper");
var HallModel_1 = require("../../../../hallcommon/model/HallModel");
var PlayerInfoModel_1 = require("../../../../hallcommon/model/PlayerInfoModel");
var NetEvent_1 = require("../../../../core/net/hall/NetEvent");
var ServicerModel_1 = require("../../../../hallcommon/model/ServicerModel");
var PlayerWallet_1 = require("../../../../core/component/PlayerWallet");
var PlayerHeadView_1 = require("./PlayerHeadView");
/** 大厅底部控件(包括红点控制) */
var HallBottomView = /** @class */ (function (_super) {
    __extends(HallBottomView, _super);
    function HallBottomView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layoutNode = null;
        return _this;
    }
    HallBottomView.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("HallModel");
        //头像组件
        this.playerHead = this.addView("PlayerHeadView", this.getChild("PlayerHeadView"), PlayerHeadView_1.default);
        //钱包组件
        this.playerWalllet = this.addView("PlayerWallet", this.getChild("PlayerHeadView/PlayerWallet"), PlayerWallet_1.default);
        // wallet.subViewState = true
        this.playerWalllet.refreshAction();
        this.layoutNode = this.getChild("layoutNode");
        this.mailRedSpot = this.getChild("layoutNode/mailNode/hongdian");
        this.kefuSpot = this.getChild("layoutNode/kefuNode/hongdian");
        this.rechargeNode = this.getChild("rechargeNode");
        this.mailRedSpot.active = false;
        this.kefuSpot.active = false;
        this.kefuNode = this.addCommonClick("layoutNode/kefuNode", this.onServiceClick, this);
        this.comissionNode = this.addCommonClick("layoutNode/caishenNode", this.onCommisionClick, this);
        this.bottomLayout = this.getChild("layoutNode").getComponent(cc.Layout);
        this.botOrignalWidth = this.bottomLayout.node.width;
        this.commisionRedRpot = this.getChild("layoutNode/caishenNode/hongdian");
        this.addCommonClick("layoutNode/yinhang", this.onBankClick, this);
        if (this.commisionRedRpot) {
            this.commisionRedRpot.active = false;
        }
        //点击事件注册
        this.addCommonClick("layoutNode/rankNode", this.onRankClick, this);
        this.addCommonClick("layoutNode/mailNode", this.onMailClick, this);
        this.addCommonClick("rechargeNode", this.onRechargeClick, this);
        //this.addCommonClick("lobby_03/PlayerHeadView/head", this.onHeadClick, this, null);
        // this.actNode = this.addCommonClick("layoutNode/activityCenter", this.openActivityCenter, this)
        this.moneyLabel = this.getComponent("layoutNode/zhuanyunNode/moneyLabel", cc.Label);
        this.countLabel = this.getComponent("layoutNode/zhuanyunNode/countLabel", cc.Label);
        this.buzhuNode = this.addCommonClick("layoutNode/zhuanyunNode", this.onBuZhuClick, this);
        //调整底部按钮适配
        // --------- start
        var canvas_width = cc.view.getFrameSize().width;
        var canvas_height = cc.view.getFrameSize().height;
        var scale1 = canvas_width / canvas_height;
        var scale2 = 1280 / 720;
        this.layoutNode.width = this.layoutNode.width * scale1 / scale2;
        for (var i = 0; i < this.layoutNode.childrenCount; i++) {
            this.layoutNode.children[i].x = (this.layoutNode.width / (this.layoutNode.childrenCount)) * i + (this.layoutNode.children[i].width / 2);
        }
        // --------- end
        // this.actNode.active = false
        this.registEvent();
    };
    HallBottomView.prototype.CheckKefu = function () {
        var data = null;
        var model = Global.ModelManager.getModel("ServicerModel");
        if (model) {
            data = model.getServiceInfo(ServicerModel_1.CustomerEntranceType.HallService);
        }
        if (!data || !data.status) {
            this.kefuNode.active = false;
        }
    };
    HallBottomView.prototype.registEvent = function () {
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE, this, this.checkCommisionRedSpot);
    };
    HallBottomView.prototype.onBuZhuClick = function () {
        var _this = this;
        var param = {};
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetSubsidyPoint, param, function (retObj) {
            PlayerInfoModel_1.default.instance.vipSubsidyCount = retObj.times;
            _this.countLabel.string = PlayerInfoModel_1.default.instance.vipSubsidyCount + "";
            Global.UI.show("WndRebateGet", retObj.point);
        }, function (error) {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        }, false, 10);
    };
    HallBottomView.prototype.openActivityCenter = function () {
        HallBtnHelper_1.default.WndActivityOpen();
    };
    HallBottomView.prototype.onHeadClick = function () {
        HallBtnHelper_1.default.WndPersonalInfoOpen();
    };
    HallBottomView.prototype.onCommisionClick = function () {
        this.model.closeRedSpot(HallModel_1.HallRedSpotType.Commision);
        HallBtnHelper_1.default.WndCommision();
    };
    HallBottomView.prototype.onSubViewShow = function () {
        this.model.on("UpdateResSpot", this, this.updateResSpot);
        this.playerWalllet.subViewState = true;
        this.playerHead.subViewState = true;
        //this.CheckKefu()
        this.checkCommisionRedSpot();
        var CommisionModel = Global.ModelManager.getModel("CommisionModel");
        var RedFlag = CommisionModel.redSwitch;
        if (RedFlag) {
            this.commisionRedRpot.active = true;
        }
    };
    HallBottomView.prototype.onSubViewHide = function () {
        Global.Event.off(GlobalEvent.SHOW_SPREAD_NODE, this, this.showSpreadNode);
        this.model.off("UpdateResSpot", this, this.updateResSpot);
    };
    HallBottomView.prototype.onDispose = function () {
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.checkCommisionRedSpot);
    };
    /***************************************************** 点击事件区域 **************************************/
    HallBottomView.prototype.updateResSpot = function (redSpotType) {
        switch (redSpotType) {
            case HallModel_1.HallRedSpotType.Mail:
                {
                    this.mailRedSpot.active = this.model.mailRedSpotSwitch;
                    break;
                }
            case HallModel_1.HallRedSpotType.Gonggao:
                {
                    this.mailRedSpot.active = this.model.mailRedSpotSwitch;
                    break;
                }
            case HallModel_1.HallRedSpotType.Kefu:
                {
                    this.kefuSpot.active = this.model.kefuSpotSwitch;
                    break;
                }
            case HallModel_1.HallRedSpotType.Spread:
                {
                    this.spreadRedSpot.active = this.model.SpreadRedSpot;
                    break;
                }
            case HallModel_1.HallRedSpotType.Commision:
                {
                    this.commisionRedRpot.active = this.model.CommisionRedSpotActive;
                    break;
                }
        }
    };
    HallBottomView.prototype.checkCommisionRedSpot = function () {
        var _this = this;
        this.buzhuNode.active = PlayerInfoModel_1.default.instance.vipSubsidyStatus !== 0;
        if (PlayerInfoModel_1.default.instance.vipSubsidy != null) {
            // let subsidy = PlayerInfoModel.instance.vipSubsidy[Global.PlayerData.vip]
            var subsidy = PlayerInfoModel_1.default.instance.vipSubsidy[Global.PlayerData.vip];
            if (subsidy) {
                this.moneyLabel.string = Global.Toolkit.formatPointStr(subsidy.point, true).toString();
            }
            else {
                this.moneyLabel.string = "0";
            }
        }
        this.countLabel.string = PlayerInfoModel_1.default.instance.vipSubsidyCount + "";
        //刷新剩余次数
        var param = {};
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.SubsidyPoint, param, function (retObj) {
            PlayerInfoModel_1.default.instance.vipSubsidyCount = retObj.times;
            _this.countLabel.string = PlayerInfoModel_1.default.instance.vipSubsidyCount + "";
        }, function (error) {
            // Global.UI.fastTip(error._errstr);
            // console.log(error);
        }, false, 10);
    };
    HallBottomView.prototype.onRankClick = function () {
        this.model.closeRedSpot(HallModel_1.HallRedSpotType.Rank);
        HallBtnHelper_1.default.WndRankOpen();
    };
    HallBottomView.prototype.onBankClick = function () {
        HallBtnHelper_1.default.WndBankOpen();
        Global.Audio.playAudioSource("hall/sound/bank");
    };
    HallBottomView.prototype.onMailClick = function () {
        this.model.closeRedSpot(HallModel_1.HallRedSpotType.Mail);
        HallBtnHelper_1.default.WndMailOpen();
    };
    HallBottomView.prototype.onServiceClick = function () {
        this.model.closeRedSpot(HallModel_1.HallRedSpotType.Kefu);
        Global.Audio.playAudioSource("hall/sound/Customer_service");
        HallBtnHelper_1.default.WndServiceOpen();
    };
    HallBottomView.prototype.onRechargeClick = function () {
        Global.Component.scheduleOnce(function () {
            HallBtnHelper_1.default.WndRechargeOpen();
            Global.Audio.playAudioSource("hall/sound/recharge");
        }, 0);
    };
    return HallBottomView;
}(ViewBase_1.default));
exports.default = HallBottomView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFx2aWV3c1xcSGFsbEJvdHRvbVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQW9EO0FBQ3BELGlEQUE0QztBQUM1QyxvRUFBb0Y7QUFFcEYsZ0ZBQTJFO0FBQzNFLCtEQUFnRTtBQUNoRSw0RUFBa0Y7QUFDbEYsd0VBQW1FO0FBQ25FLG1EQUE4QztBQUM5QyxxQkFBcUI7QUFDckI7SUFBNEMsa0NBQVE7SUFBcEQ7UUFBQSxxRUF5UEM7UUE1T1csZ0JBQVUsR0FBVyxJQUFJLENBQUM7O0lBNE90QyxDQUFDO0lBOU5hLGlDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBYyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVqRSxNQUFNO1FBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBbUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsd0JBQWMsQ0FBQyxDQUFDO1FBRWpILE1BQU07UUFDUCxJQUFJLENBQUMsYUFBYSxHQUFpQixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLDZCQUE2QixDQUFDLEVBQUUsc0JBQVksQ0FBQyxDQUFDO1FBQzNILDZCQUE2QjtRQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsOEJB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IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBIYWxsQnRuSGVscGVyIGZyb20gXCIuL0hhbGxCdG5IZWxwZXJcIjtcclxuaW1wb3J0IEhhbGxNb2RlbCwgeyBIYWxsUmVkU3BvdFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9IYWxsTW9kZWxcIjtcclxuaW1wb3J0IEFwcEhlbHBlciBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS90b29sL0FwcEhlbHBlclwiO1xyXG5pbXBvcnQgUGxheWVySW5mb01vZGVsIGZyb20gXCIuLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1BsYXllckluZm9Nb2RlbFwiO1xyXG5pbXBvcnQgeyBOZXRBcHBmYWNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvbmV0L2hhbGwvTmV0RXZlbnRcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXJFbnRyYW5jZVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9TZXJ2aWNlck1vZGVsXCI7XHJcbmltcG9ydCBQbGF5ZXJXYWxsZXQgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvY29tcG9uZW50L1BsYXllcldhbGxldFwiO1xyXG5pbXBvcnQgUGxheWVySGVhZFZpZXcgZnJvbSBcIi4vUGxheWVySGVhZFZpZXdcIjtcclxuLyoqIOWkp+WOheW6lemDqOaOp+S7tijljIXmi6znuqLngrnmjqfliLYpICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhbGxCb3R0b21WaWV3IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgcHJpdmF0ZSBtb2RlbDogSGFsbE1vZGVsO1xyXG5cclxuICAgIC8vIHByaXZhdGUgdGl4aWFuUmVkU3BvdDogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgbWFpbFJlZFNwb3Q6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGtlZnVTcG90OiBjYy5Ob2RlO1xyXG4gXHJcbiAgICAvLyBwcml2YXRlIGFjdE5vZGU6Y2MuTm9kZVxyXG5cclxuICAgIHByaXZhdGUgcGxheWVyV2FsbGxldDogUGxheWVyV2FsbGV0O1xyXG5cclxuICAgIHByaXZhdGUgcGxheWVySGVhZDogUGxheWVySGVhZFZpZXdcclxuXHJcbiAgICBwcml2YXRlIGxheW91dE5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSByZWNoYXJnZU5vZGU6Y2MuTm9kZTtcclxuICAgIHByaXZhdGUgY29taXNzaW9uTm9kZTpjYy5Ob2RlXHJcbiAgICBwcml2YXRlIGNvbW1pc2lvblJlZFJwb3Q6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGtlZnVOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBib3R0b21MYXlvdXQ6IGNjLkxheW91dDtcclxuICAgIHByaXZhdGUgYm90T3JpZ25hbFdpZHRoOmFueTtcclxuICAgIGJ1emh1Tm9kZTogY2MuTm9kZTsgLy/ovazov5Dph5FcclxuICAgIHByaXZhdGUgbW9uZXlMYWJlbDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIGNvdW50TGFiZWw6IGNjLkxhYmVsO1xyXG4gICAgXHJcbiAgICBcclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxIYWxsTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkhhbGxNb2RlbFwiKTtcclxuXHJcbiAgICAgICAgIC8v5aS05YOP57uE5Lu2XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJIZWFkID0gPFBsYXllckhlYWRWaWV3PnRoaXMuYWRkVmlldyhcIlBsYXllckhlYWRWaWV3XCIsIHRoaXMuZ2V0Q2hpbGQoXCJQbGF5ZXJIZWFkVmlld1wiKSwgUGxheWVySGVhZFZpZXcpO1xyXG5cclxuICAgICAgICAgLy/pkrHljIXnu4Tku7ZcclxuICAgICAgICB0aGlzLnBsYXllcldhbGxsZXQgPSA8UGxheWVyV2FsbGV0PnRoaXMuYWRkVmlldyhcIlBsYXllcldhbGxldFwiLCB0aGlzLmdldENoaWxkKFwiUGxheWVySGVhZFZpZXcvUGxheWVyV2FsbGV0XCIpLCBQbGF5ZXJXYWxsZXQpO1xyXG4gICAgICAgICAvLyB3YWxsZXQuc3ViVmlld1N0YXRlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMucGxheWVyV2FsbGxldC5yZWZyZXNoQWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5sYXlvdXROb2RlID0gdGhpcy5nZXRDaGlsZChcImxheW91dE5vZGVcIik7XHJcbiAgICAgIFxyXG4gICAgICAgIHRoaXMubWFpbFJlZFNwb3QgPSB0aGlzLmdldENoaWxkKFwibGF5b3V0Tm9kZS9tYWlsTm9kZS9ob25nZGlhblwiKTtcclxuICAgICAgICB0aGlzLmtlZnVTcG90ID0gdGhpcy5nZXRDaGlsZChcImxheW91dE5vZGUva2VmdU5vZGUvaG9uZ2RpYW5cIik7XHJcbiAgICAgICAgdGhpcy5yZWNoYXJnZU5vZGUgPSB0aGlzLmdldENoaWxkKFwicmVjaGFyZ2VOb2RlXCIpO1xyXG4gICAgICAgIHRoaXMubWFpbFJlZFNwb3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLmtlZnVTcG90LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMua2VmdU5vZGUgPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwibGF5b3V0Tm9kZS9rZWZ1Tm9kZVwiLCB0aGlzLm9uU2VydmljZUNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNvbWlzc2lvbk5vZGUgPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwibGF5b3V0Tm9kZS9jYWlzaGVuTm9kZVwiLCB0aGlzLm9uQ29tbWlzaW9uQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYm90dG9tTGF5b3V0ID0gdGhpcy5nZXRDaGlsZChcImxheW91dE5vZGVcIikuZ2V0Q29tcG9uZW50KGNjLkxheW91dClcclxuICAgICAgICB0aGlzLmJvdE9yaWduYWxXaWR0aCA9IHRoaXMuYm90dG9tTGF5b3V0Lm5vZGUud2lkdGhcclxuICAgICAgICB0aGlzLmNvbW1pc2lvblJlZFJwb3QgPSB0aGlzLmdldENoaWxkKFwibGF5b3V0Tm9kZS9jYWlzaGVuTm9kZS9ob25nZGlhblwiKVxyXG5cclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwibGF5b3V0Tm9kZS95aW5oYW5nXCIsIHRoaXMub25CYW5rQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIGlmKHRoaXMuY29tbWlzaW9uUmVkUnBvdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWlzaW9uUmVkUnBvdC5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eCueWHu+S6i+S7tuazqOWGjFxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJsYXlvdXROb2RlL3JhbmtOb2RlXCIsIHRoaXMub25SYW5rQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJsYXlvdXROb2RlL21haWxOb2RlXCIsIHRoaXMub25NYWlsQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcInJlY2hhcmdlTm9kZVwiLCB0aGlzLm9uUmVjaGFyZ2VDbGljaywgdGhpcyk7XHJcbiAgICAgICAgLy90aGlzLmFkZENvbW1vbkNsaWNrKFwibG9iYnlfMDMvUGxheWVySGVhZFZpZXcvaGVhZFwiLCB0aGlzLm9uSGVhZENsaWNrLCB0aGlzLCBudWxsKTtcclxuICAgICAgICAvLyB0aGlzLmFjdE5vZGUgPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwibGF5b3V0Tm9kZS9hY3Rpdml0eUNlbnRlclwiLCB0aGlzLm9wZW5BY3Rpdml0eUNlbnRlciwgdGhpcylcclxuXHJcblxyXG4gICAgICAgIHRoaXMubW9uZXlMYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwibGF5b3V0Tm9kZS96aHVhbnl1bk5vZGUvbW9uZXlMYWJlbFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5jb3VudExhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJsYXlvdXROb2RlL3podWFueXVuTm9kZS9jb3VudExhYmVsXCIsIGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmJ1emh1Tm9kZSA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJsYXlvdXROb2RlL3podWFueXVuTm9kZVwiLCB0aGlzLm9uQnVaaHVDbGljaywgdGhpcyk7XHJcblxyXG5cclxuICAgICAgICAvL+iwg+aVtOW6lemDqOaMiemSrumAgumFjVxyXG4gICAgICAgIC8vIC0tLS0tLS0tLSBzdGFydFxyXG4gICAgICAgIGxldCBjYW52YXNfd2lkdGggPSBjYy52aWV3LmdldEZyYW1lU2l6ZSgpLndpZHRoO1xyXG4gICAgICAgIGxldCBjYW52YXNfaGVpZ2h0ID0gY2Mudmlldy5nZXRGcmFtZVNpemUoKS5oZWlnaHQ7IFxyXG4gICAgICAgIGxldCBzY2FsZTEgPSBjYW52YXNfd2lkdGgvY2FudmFzX2hlaWdodDtcclxuICAgICAgICBsZXQgc2NhbGUyID0gMTI4MC83MjA7XHJcbiAgICAgICAgdGhpcy5sYXlvdXROb2RlLndpZHRoID0gdGhpcy5sYXlvdXROb2RlLndpZHRoICogc2NhbGUxL3NjYWxlMjtcclxuICAgICAgICBmb3IobGV0IGkgPSAwIDtpIDwgdGhpcy5sYXlvdXROb2RlLmNoaWxkcmVuQ291bnQgOyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dE5vZGUuY2hpbGRyZW5baV0ueCA9ICh0aGlzLmxheW91dE5vZGUud2lkdGgvKHRoaXMubGF5b3V0Tm9kZS5jaGlsZHJlbkNvdW50KSkqaSArICh0aGlzLmxheW91dE5vZGUuY2hpbGRyZW5baV0ud2lkdGgvMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIC0tLS0tLS0tLSBlbmRcclxuICAgICAgICAvLyB0aGlzLmFjdE5vZGUuYWN0aXZlID0gZmFsc2VcclxuXHJcbiAgICAgICAgdGhpcy5yZWdpc3RFdmVudCgpXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiBcclxuXHJcbiAgICBDaGVja0tlZnUoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBkYXRhID0gbnVsbFxyXG4gICAgICAgIGxldCBtb2RlbCA9IEdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJTZXJ2aWNlck1vZGVsXCIpXHJcbiAgICAgICAgaWYobW9kZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkYXRhID0gbW9kZWwuZ2V0U2VydmljZUluZm8oQ3VzdG9tZXJFbnRyYW5jZVR5cGUuSGFsbFNlcnZpY2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFkYXRhIHx8ICFkYXRhLnN0YXR1cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMua2VmdU5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWdpc3RFdmVudCgpIHtcclxuICAgICBcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFLCB0aGlzLCB0aGlzLmNoZWNrQ29tbWlzaW9uUmVkU3BvdCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgb25CdVpodUNsaWNrKCkge1xyXG4gICAgICAgIGxldCBwYXJhbTogYW55ID0ge31cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkdldFN1YnNpZHlQb2ludCwgcGFyYW0sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcFN1YnNpZHlDb3VudCA9IHJldE9iai50aW1lc1xyXG4gICAgICAgICAgICB0aGlzLmNvdW50TGFiZWwuc3RyaW5nID0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcFN1YnNpZHlDb3VudCArIFwiXCI7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kUmViYXRlR2V0XCIsIHJldE9iai5wb2ludCk7XHJcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKGVycm9yLl9lcnJzdHIpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSwgZmFsc2UsIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIG9wZW5BY3Rpdml0eUNlbnRlcigpIHtcclxuICAgICAgICBIYWxsQnRuSGVscGVyLlduZEFjdGl2aXR5T3BlbigpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgb25IZWFkQ2xpY2soKSB7XHJcbiAgICAgICAgSGFsbEJ0bkhlbHBlci5XbmRQZXJzb25hbEluZm9PcGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNvbW1pc2lvbkNsaWNrKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwuY2xvc2VSZWRTcG90KEhhbGxSZWRTcG90VHlwZS5Db21taXNpb24pO1xyXG4gICAgICAgIEhhbGxCdG5IZWxwZXIuV25kQ29tbWlzaW9uKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uU3ViVmlld1Nob3coKSB7XHJcbiAgICAgIFxyXG4gICAgICAgIHRoaXMubW9kZWwub24oXCJVcGRhdGVSZXNTcG90XCIsIHRoaXMsIHRoaXMudXBkYXRlUmVzU3BvdCk7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJXYWxsbGV0LnN1YlZpZXdTdGF0ZSA9IHRydWVcclxuICAgICAgICB0aGlzLnBsYXllckhlYWQuc3ViVmlld1N0YXRlID0gdHJ1ZVxyXG4gICAgICAgXHJcbiAgICAgICAgLy90aGlzLkNoZWNrS2VmdSgpXHJcbiAgICAgICAgdGhpcy5jaGVja0NvbW1pc2lvblJlZFNwb3QoKVxyXG4gICAgICAgIHZhciBDb21taXNpb25Nb2RlbCA9IEdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJDb21taXNpb25Nb2RlbFwiKTtcclxuICAgICAgICBsZXQgUmVkRmxhZyA9IENvbW1pc2lvbk1vZGVsLnJlZFN3aXRjaFxyXG4gICAgICAgIGlmIChSZWRGbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWlzaW9uUmVkUnBvdC5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBvblN1YlZpZXdIaWRlKCkge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuU0hPV19TUFJFQURfTk9ERSwgdGhpcywgdGhpcy5zaG93U3ByZWFkTm9kZSk7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5vZmYoXCJVcGRhdGVSZXNTcG90XCIsIHRoaXMsIHRoaXMudXBkYXRlUmVzU3BvdCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNwb3NlKCkge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFLCB0aGlzLCB0aGlzLmNoZWNrQ29tbWlzaW9uUmVkU3BvdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIOeCueWHu+S6i+S7tuWMuuWfnyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIHByaXZhdGUgdXBkYXRlUmVzU3BvdChyZWRTcG90VHlwZSkge1xyXG4gICAgICAgIHN3aXRjaCAocmVkU3BvdFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBIYWxsUmVkU3BvdFR5cGUuTWFpbDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1haWxSZWRTcG90LmFjdGl2ZSA9IHRoaXMubW9kZWwubWFpbFJlZFNwb3RTd2l0Y2g7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgSGFsbFJlZFNwb3RUeXBlLkdvbmdnYW86XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWlsUmVkU3BvdC5hY3RpdmUgPSB0aGlzLm1vZGVsLm1haWxSZWRTcG90U3dpdGNoO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEhhbGxSZWRTcG90VHlwZS5LZWZ1OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2VmdVNwb3QuYWN0aXZlID0gdGhpcy5tb2RlbC5rZWZ1U3BvdFN3aXRjaDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBIYWxsUmVkU3BvdFR5cGUuU3ByZWFkOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByZWFkUmVkU3BvdC5hY3RpdmUgPSB0aGlzLm1vZGVsLlNwcmVhZFJlZFNwb3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgSGFsbFJlZFNwb3RUeXBlLkNvbW1pc2lvbjpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1pc2lvblJlZFJwb3QuYWN0aXZlID0gdGhpcy5tb2RlbC5Db21taXNpb25SZWRTcG90QWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgY2hlY2tDb21taXNpb25SZWRTcG90KCkge1xyXG5cclxuICAgICAgICB0aGlzLmJ1emh1Tm9kZS5hY3RpdmUgPSBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UudmlwU3Vic2lkeVN0YXR1cyAhPT0gMFxyXG5cclxuICAgICAgICBpZiAoUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcFN1YnNpZHkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyBsZXQgc3Vic2lkeSA9IFBsYXllckluZm9Nb2RlbC5pbnN0YW5jZS52aXBTdWJzaWR5W0dsb2JhbC5QbGF5ZXJEYXRhLnZpcF1cclxuICAgICAgICAgICAgbGV0IHN1YnNpZHkgPSBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UudmlwU3Vic2lkeVtHbG9iYWwuUGxheWVyRGF0YS52aXBdXHJcbiAgICAgICAgICAgIGlmIChzdWJzaWR5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vbmV5TGFiZWwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoc3Vic2lkeS5wb2ludCwgdHJ1ZSkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9uZXlMYWJlbC5zdHJpbmcgPSBcIjBcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY291bnRMYWJlbC5zdHJpbmcgPSBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UudmlwU3Vic2lkeUNvdW50ICsgXCJcIjtcclxuICAgICAgICAvL+WIt+aWsOWJqeS9measoeaVsFxyXG4gICAgICAgIGxldCBwYXJhbTogYW55ID0ge31cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLlN1YnNpZHlQb2ludCwgcGFyYW0sIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcFN1YnNpZHlDb3VudCA9IHJldE9iai50aW1lc1xyXG4gICAgICAgICAgICB0aGlzLmNvdW50TGFiZWwuc3RyaW5nID0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcFN1YnNpZHlDb3VudCArIFwiXCI7XHJcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIEdsb2JhbC5VSS5mYXN0VGlwKGVycm9yLl9lcnJzdHIpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSwgZmFsc2UsIDEwKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvblJhbmtDbGljaygpIHtcclxuICAgICAgICB0aGlzLm1vZGVsLmNsb3NlUmVkU3BvdChIYWxsUmVkU3BvdFR5cGUuUmFuayk7XHJcbiAgICAgICAgSGFsbEJ0bkhlbHBlci5XbmRSYW5rT3BlbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CYW5rQ2xpY2soKSB7XHJcbiAgICAgICAgSGFsbEJ0bkhlbHBlci5XbmRCYW5rT3BlbigpO1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QXVkaW9Tb3VyY2UoXCJoYWxsL3NvdW5kL2JhbmtcIilcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTWFpbENsaWNrKCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwuY2xvc2VSZWRTcG90KEhhbGxSZWRTcG90VHlwZS5NYWlsKTtcclxuICAgICAgICBIYWxsQnRuSGVscGVyLlduZE1haWxPcGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNlcnZpY2VDbGljaygpIHtcclxuICAgICAgICB0aGlzLm1vZGVsLmNsb3NlUmVkU3BvdChIYWxsUmVkU3BvdFR5cGUuS2VmdSk7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlBdWRpb1NvdXJjZShcImhhbGwvc291bmQvQ3VzdG9tZXJfc2VydmljZVwiKVxyXG4gICAgICAgIEhhbGxCdG5IZWxwZXIuV25kU2VydmljZU9wZW4oKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25SZWNoYXJnZUNsaWNrKCkge1xyXG4gICAgICAgIEdsb2JhbC5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIEhhbGxCdG5IZWxwZXIuV25kUmVjaGFyZ2VPcGVuKCk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QXVkaW9Tb3VyY2UoXCJoYWxsL3NvdW5kL3JlY2hhcmdlXCIpXHJcbiAgICAgICAgIH0sMCk7XHJcbiAgICB9XHJcbn0iXX0=