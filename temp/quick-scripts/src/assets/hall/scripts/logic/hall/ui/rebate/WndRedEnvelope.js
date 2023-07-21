"use strict";
cc._RF.push(module, '97f09mMpN5Bzq2CnFq2D89T', 'WndRedEnvelope');
// hall/scripts/logic/hall/ui/rebate/WndRedEnvelope.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var NetEvent_1 = require("../../../core/net/hall/NetEvent");
var WndRedEnvelope = /** @class */ (function (_super) {
    __extends(WndRedEnvelope, _super);
    function WndRedEnvelope() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndRedEnvelope.prototype.onInit = function () {
        this.name = "WndRedEnvelope";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Rebate/RedEnvelopeUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndRedEnvelope.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("HallModel");
        this.addCommonClick("openBtn", this.onSureBtnClick, this);
        this.rabateLbl = this.getComponent("rebateLbl", cc.Label);
        this.openSke = this.getComponent("openBtn", sp.Skeleton);
        this.goodLuck = this.getChild("goodLuck");
        this.winMoney = this.getChild("winMoney");
        this.winMoney2 = this.getChild("winMoney2");
        this.goodLuckTitle = this.getChild("goodLuckTitle");
        this.newPersonTitle = this.getChild("newPersonTitle");
        this.winMoneyTitle = this.getChild("winMoneyTitle");
    };
    WndRedEnvelope.prototype.onSureBtnClick = function () {
        var _this = this;
        this.openSke.clearTrack(0);
        this.openSke.setAnimation(0, "idle_NO", false);
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.ReceiveRewardPack, { id: this.data.id }, function (retObj) {
            _this.closeWnd();
            //重新获取剩余红包
        }, function (error) {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        }, false);
    };
    WndRedEnvelope.prototype.onOpen = function (arr) {
        if (this.openSke) {
            this.openSke.clearTrack(0);
            this.openSke.setAnimation(0, "idle_Loop", true);
        }
        this.data = arr[0];
        this.closeCallback = arr[1];
        var type = this.data.pack_type;
        if (type === 1) { //新人
            this.goodLuck.active = false;
            this.goodLuckTitle.active = false;
            this.winMoney.active = false;
            this.winMoney2.active = false;
            this.newPersonTitle.active = true;
            this.winMoneyTitle.active = false;
        }
        else if (type === 2) //好运
         {
            this.goodLuck.active = true;
            this.goodLuckTitle.active = true;
            this.winMoney.active = false;
            this.winMoney2.active = false;
            this.newPersonTitle.active = false;
            this.winMoneyTitle.active = false;
        }
        else { //赢钱
            this.goodLuck.active = false;
            this.goodLuckTitle.active = false;
            this.winMoney.active = true;
            this.winMoney2.active = true;
            this.newPersonTitle.active = false;
            this.winMoneyTitle.active = true;
        }
        this.rabateLbl.string = Global.Toolkit.formatPointStr(this.data.point || 0, true);
        // if(arr[1])
        // {
        //     this.bindAwardType = arr[1];
        // }
        // var model = <BindingGiftModel>Global.ModelManager.getModel("BindingGiftModel");
        // this.rabateLbl.node.active = false;
        // this.effectSk && this.effectSk.setAnimation(0, "idle", false);
    };
    WndRedEnvelope.prototype.closeWnd = function () {
        if (this.closeCallback) {
            this.closeCallback();
        }
        this.close();
    };
    WndRedEnvelope.prototype.onClose = function () {
    };
    WndRedEnvelope.prototype.onDispose = function () {
    };
    return WndRedEnvelope;
}(WndBase_1.default));
exports.default = WndRedEnvelope;

cc._RF.pop();