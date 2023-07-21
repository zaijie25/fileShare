"use strict";
cc._RF.push(module, '23556l5IldIG7aMKdXmqH18', 'WndNetReconnect');
// hall/scripts/logic/hall/ui/waiting/WndNetReconnect.ts

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
var GlobalEvent_1 = require("../../../core/GlobalEvent");
//网络请求弹出界面
var WndNetReconnect = /** @class */ (function (_super) {
    __extends(WndNetReconnect, _super);
    function WndNetReconnect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.counter = 0;
        _this.curReconnectTime = 0;
        return _this;
    }
    WndNetReconnect.prototype.onInit = function () {
        this.name = "WndNetReconnect";
        this.layer = Global.UI.TipsLayer;
        this.resPath = "hall/prefabs/ui/NetReconnect";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndNetReconnect.prototype.initView = function () {
        var bgNode = this.getChild("black_bg");
        bgNode.width = 1600;
        bgNode.height = cc.Canvas.instance.node.height;
        this.tipsLabel = this.getComponent("tips", cc.Label);
    };
    WndNetReconnect.prototype.onOpen = function () {
        this.counter = 0;
        this.curReconnectTime = 1;
        this.tipsLabel.schedule(this.onSchedule.bind(this), 0.5, cc.macro.REPEAT_FOREVER);
        this.node.runAction(cc.fadeIn(0.5));
        this.tipsLabel.string = cc.js.formatStr("正在重新连接（%d/%d），请稍后", this.curReconnectTime, Global.Setting.socketReconnectTimes) + "...";
        Global.Event.on(GlobalEvent_1.default.UPDATE_RECONNECT_COUNT, this, this.onReconnectCountUpdate);
    };
    WndNetReconnect.prototype.onClose = function () {
        this.counter = 0;
        this.tipsLabel.unscheduleAllCallbacks();
        Global.Event.off(GlobalEvent_1.default.UPDATE_RECONNECT_COUNT, this, this.onReconnectCountUpdate);
    };
    WndNetReconnect.prototype.onDispose = function () {
        this.counter = 0;
        Global.Event.off(GlobalEvent_1.default.UPDATE_RECONNECT_COUNT, this, this.onReconnectCountUpdate);
    };
    WndNetReconnect.prototype.onReconnectCountUpdate = function (times) {
        this.curReconnectTime = times;
    };
    WndNetReconnect.prototype.onSchedule = function () {
        this.counter++;
        var mod = this.counter % 4;
        var subStr = "";
        for (var i = 0; i < mod; i++) {
            subStr += ".";
        }
        this.tipsLabel.string = cc.js.formatStr("正在重新连接（%d/%d），请稍后", this.curReconnectTime, Global.Setting.socketReconnectTimes) + subStr;
        if (this.counter > 50) {
            this.close();
        }
    };
    return WndNetReconnect;
}(WndBase_1.default));
exports.default = WndNetReconnect;

cc._RF.pop();