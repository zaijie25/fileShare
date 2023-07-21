"use strict";
cc._RF.push(module, 'bd0244ztvtJn4CWafKoCSOv', 'WndHallRedEnvelope');
// hall/scripts/logic/hall/ui/rebate/WndHallRedEnvelope.ts

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
var HallPopMsgHelper_1 = require("../../tool/HallPopMsgHelper");
var ActivityConstants_1 = require("../Activity/ActivityConstants");
var WndHallRedEnvelope = /** @class */ (function (_super) {
    __extends(WndHallRedEnvelope, _super);
    function WndHallRedEnvelope() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // private goldSke: sp.Skeleton;
    WndHallRedEnvelope.prototype.onInit = function () {
        this.name = "WndHallRedEnvelope";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Rebate/HallRedEnvelopeUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndHallRedEnvelope.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("HallModel");
        this.addCommonClick("openBtn", this.onSureBtnClick, this);
        this.openSke = this.getComponent("openBtn", sp.Skeleton);
        this.noOpenSp = this.getChild("noopen");
        // this.goldSke = <sp.Skeleton>this.getComponent("skeleton", sp.Skeleton);
    };
    WndHallRedEnvelope.prototype.onSureBtnClick = function () {
        var _this = this;
        this.openSke.clearTrack(0);
        this.openSke.setAnimation(0, "idle_NO", false);
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.DoRechargeRed, {}, function (retObj) {
            Global.UI.show("WndRebateGet", retObj.point, null, function () {
                Global.UI.show("WndGetRedEnvelope");
            });
            _this.model.recharge_red = null;
            _this.closeWnd();
        }, function (error) {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        }, false);
    };
    WndHallRedEnvelope.prototype.onOpen = function (arr) {
        if (this.openSke) {
            this.openSke.clearTrack(0);
            this.openSke.setAnimation(0, "idle_Loop", true);
        }
        // if(this.goldSke){
        //     this.goldSke.clearTrack(0)
        //     this.goldSke.setAnimation(0,"animation",false);
        // }
        this.data = this.model.recharge_red;
        var time = (new Date()).getTime() / 1000;
        if (!this.data) {
            this.openSke.node.active = false;
            this.noOpenSp.active = true;
            return;
        }
        if (time > this.data.stime && time < this.data.etime) {
            this.openSke.node.active = true;
            this.noOpenSp.active = false;
        }
        else {
            this.openSke.node.active = false;
            this.noOpenSp.active = true;
        }
    };
    WndHallRedEnvelope.prototype.closeWnd = function () {
        if (this.closeCallback) {
            this.closeCallback();
        }
        this.close();
    };
    WndHallRedEnvelope.prototype.onClose = function () {
        HallPopMsgHelper_1.default.Instance.releaseLock(ActivityConstants_1.ActivityType.rechargeGive);
    };
    WndHallRedEnvelope.prototype.onDispose = function () {
    };
    return WndHallRedEnvelope;
}(WndBase_1.default));
exports.default = WndHallRedEnvelope;

cc._RF.pop();