"use strict";
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