"use strict";
cc._RF.push(module, 'c2348sAqwpHqZ6gbRMJfARy', 'WndGetRedEnvelope');
// hall/scripts/logic/hall/ui/rebate/WndGetRedEnvelope.ts

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
var WndGetRedEnvelope = /** @class */ (function (_super) {
    __extends(WndGetRedEnvelope, _super);
    function WndGetRedEnvelope() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // private closeCallback: Function;
    WndGetRedEnvelope.prototype.onInit = function () {
        this.name = "WndGetRedEnvelope";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Rebate/GetRedEnvelopeUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndGetRedEnvelope.prototype.initView = function () {
        this.addCommonClick("but_cz", this.onOpenRechargeClick, this);
        this.addCommonClick("close", this.closeWnd, this);
    };
    WndGetRedEnvelope.prototype.onOpenRechargeClick = function () {
        Global.UI.show("WndRecharge");
        this.closeWnd();
    };
    WndGetRedEnvelope.prototype.onOpen = function (arr) {
        // this.closeCallback = arr[0];
    };
    WndGetRedEnvelope.prototype.closeWnd = function () {
        // if(this.closeCallback){
        //     this.closeCallback();
        // }
        this.close();
    };
    WndGetRedEnvelope.prototype.onClose = function () {
    };
    WndGetRedEnvelope.prototype.onDispose = function () {
    };
    return WndGetRedEnvelope;
}(WndBase_1.default));
exports.default = WndGetRedEnvelope;

cc._RF.pop();