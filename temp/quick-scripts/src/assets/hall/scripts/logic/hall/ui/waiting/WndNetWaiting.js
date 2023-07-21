"use strict";
cc._RF.push(module, '08450tzcBlCZLM2i+ug5l8V', 'WndNetWaiting');
// hall/scripts/logic/hall/ui/waiting/WndNetWaiting.ts

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
//网络请求弹出界面
var WndNetWaiting = /** @class */ (function (_super) {
    __extends(WndNetWaiting, _super);
    function WndNetWaiting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.counter = 0;
        _this.maxFrameCount = 0;
        _this.UpdateInterval = 0.2;
        return _this;
    }
    WndNetWaiting.prototype.onInit = function () {
        this.name = "WndNetWaiting";
        this.layer = Global.UI.TipsLayer;
        this.resPath = "hall/prefabs/ui/NetWaitUI";
        this.model = Global.ModelManager.getModel("WaitingModel");
        this.destoryType = WndBase_1.DestoryType.Persist;
    };
    WndNetWaiting.prototype.initView = function () {
        var bgNode = this.getChild("mask");
        this.blockMask = bgNode.getComponent(cc.BlockInputEvents);
        bgNode.width = 1600;
        bgNode.height = 1600;
        this.tipsLabel = this.getComponent("tips", cc.Label);
        if (cc.isValid(this.tipsLabel)) {
            this.tipsLabel.string = "连接中";
        }
    };
    WndNetWaiting.prototype.onOpen = function () {
        this.model.on(this.model.EVENT_UPDATE_WAITING_TIME, this, this.updateTime);
        var maxWaitTime = 0;
        if (this.args.length == 0) {
            Logger.error("没有设置超时时间");
            maxWaitTime = 15;
        }
        else
            maxWaitTime = this.args[0];
        if (this.args.length > 1 && this.args[1] && this.args[1] != "" && isNaN(Number(this.args[1]))) {
            if (cc.isValid(this.tipsLabel)) {
                this.tipsLabel.string = this.args[1];
            }
        }
        else {
            if (cc.isValid(this.tipsLabel)) {
                this.tipsLabel.string = "连接中";
            }
        }
        if (this.args.length >= 4) {
            this.blockMask.enabled = this.args[3];
        }
        this.updateTime(maxWaitTime);
        if (cc.isValid(this.tipsLabel)) {
            this.tipsLabel.schedule(this.onSchedule.bind(this), this.UpdateInterval, cc.macro.REPEAT_FOREVER);
        }
        this.node.runAction(cc.fadeIn(0.5));
    };
    WndNetWaiting.prototype.updateTime = function (maxWaitTime) {
        this.counter = 0;
        this.maxFrameCount = maxWaitTime / this.UpdateInterval;
    };
    WndNetWaiting.prototype.onClose = function () {
        this.model.off(this.model.EVENT_UPDATE_WAITING_TIME, this, this.updateTime);
        this.counter = 0;
        this.tipsLabel.unscheduleAllCallbacks();
    };
    WndNetWaiting.prototype.onDispose = function () {
        this.counter = 0;
        this.tipsLabel = null;
    };
    WndNetWaiting.prototype.onSchedule = function () {
        var waitingList = this.model.getWaitingList();
        if (waitingList.length == 0) {
            this.close();
        }
        this.counter++;
        var mod = this.counter % 4;
        // let subStr = ""
        // for(let i = 0; i < mod; i++)
        // {
        //     subStr += "."
        // }
        // this.tipsLabel.string = "玩命加载中" +subStr;
        if (this.counter > this.maxFrameCount) {
            //强制关闭
            this.close();
            this.model.waitTimeOut();
        }
    };
    return WndNetWaiting;
}(WndBase_1.default));
exports.default = WndNetWaiting;

cc._RF.pop();