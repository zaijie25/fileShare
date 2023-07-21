
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/waiting/WndNetWaiting.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFx3YWl0aW5nXFxXbmROZXRXYWl0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFnRTtBQUdoRSxVQUFVO0FBQ1Y7SUFBMkMsaUNBQU87SUFBbEQ7UUFBQSxxRUErR0M7UUE1R1csYUFBTyxHQUFHLENBQUMsQ0FBQztRQUVaLG1CQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLG9CQUFjLEdBQUcsR0FBRyxDQUFDOztJQXlHakMsQ0FBQztJQXJHYSw4QkFBTSxHQUFoQjtRQUVJLElBQUksQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRywyQkFBMkIsQ0FBQztRQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQVcsQ0FBQyxPQUFPLENBQUM7SUFDM0MsQ0FBQztJQUVTLGdDQUFRLEdBQWxCO1FBRUksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDekQsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDcEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsSUFBRyxFQUFFLENBQUMsT0FBTyxDQUFD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QUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzlDLElBQUcsV0FBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDM0Isa0JBQWtCO1FBQ2xCLCtCQUErQjtRQUMvQixJQUFJO1FBQ0osb0JBQW9CO1FBQ3BCLElBQUk7UUFDSiwyQ0FBMkM7UUFFM0MsSUFBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQ3BDO1lBQ0ksTUFBTTtZQUNOLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQS9HQSxBQStHQyxDQS9HMEMsaUJBQU8sR0ErR2pEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UsIHsgRGVzdG9yeVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBXYWl0aW5nTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvV2FpdGluZ01vZGVsXCI7XHJcblxyXG4vL+e9kee7nOivt+axguW8ueWHuueVjOmdolxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmROZXRXYWl0aW5nIGV4dGVuZHMgV25kQmFzZVxyXG57XHJcbiAgICBwcml2YXRlIHRpcHNMYWJlbDpjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgY291bnRlciA9IDA7XHJcbiAgICBwcml2YXRlIG1vZGVsOldhaXRpbmdNb2RlbDtcclxuICAgIHByaXZhdGUgbWF4RnJhbWVDb3VudCA9IDA7XHJcbiAgICBwcml2YXRlIFVwZGF0ZUludGVydmFsID0gMC4yO1xyXG5cclxuICAgIHByaXZhdGUgYmxvY2tNYXNrOmNjLkJsb2NrSW5wdXRFdmVudHNcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZE5ldFdhaXRpbmdcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlRpcHNMYXllcjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9OZXRXYWl0VUlcIjtcclxuICAgICAgICB0aGlzLm1vZGVsID0gR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIldhaXRpbmdNb2RlbFwiKTtcclxuICAgICAgICB0aGlzLmRlc3RvcnlUeXBlID0gRGVzdG9yeVR5cGUuUGVyc2lzdDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBiZ05vZGUgPSB0aGlzLmdldENoaWxkKFwibWFza1wiKTtcclxuICAgICAgICB0aGlzLmJsb2NrTWFzayA9IGJnTm9kZS5nZXRDb21wb25lbnQoY2MuQmxvY2tJbnB1dEV2ZW50cylcclxuICAgICAgICBiZ05vZGUud2lkdGggPSAxNjAwO1xyXG4gICAgICAgIGJnTm9kZS5oZWlnaHQgPSAxNjAwO1xyXG4gICAgICAgIHRoaXMudGlwc0xhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJ0aXBzXCIsIGNjLkxhYmVsKTtcclxuICAgICAgICBpZihjYy5pc1ZhbGlkKHRoaXMudGlwc0xhYmVsKSl7XHJcbiAgICAgICAgICAgIHRoaXMudGlwc0xhYmVsLnN0cmluZyA9IFwi6L+e5o6l5LitXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5vbih0aGlzLm1vZGVsLkVWRU5UX1VQREFURV9XQUlUSU5HX1RJTUUsIHRoaXMsIHRoaXMudXBkYXRlVGltZSlcclxuICAgICAgICBsZXQgbWF4V2FpdFRpbWUgPSAwO1xyXG4gICAgICAgIGlmKHRoaXMuYXJncy5sZW5ndGggPT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuayoeacieiuvue9rui2heaXtuaXtumXtFwiKTtcclxuICAgICAgICAgICAgbWF4V2FpdFRpbWUgPSAxNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBtYXhXYWl0VGltZSA9IHRoaXMuYXJnc1swXTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5hcmdzLmxlbmd0aCA+IDEgJiYgdGhpcy5hcmdzWzFdICAmJiB0aGlzLmFyZ3NbMV0gIT0gXCJcIiAmJiBpc05hTihOdW1iZXIodGhpcy5hcmdzWzFdKSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihjYy5pc1ZhbGlkKHRoaXMudGlwc0xhYmVsKSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHNMYWJlbC5zdHJpbmcgPSB0aGlzLmFyZ3NbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoY2MuaXNWYWxpZCh0aGlzLnRpcHNMYWJlbCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aXBzTGFiZWwuc3RyaW5nID0gXCLov57mjqXkuK1cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmFyZ3MubGVuZ3RoID49IDQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJsb2NrTWFzay5lbmFibGVkID0gdGhpcy5hcmdzWzNdXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgIFxyXG4gICAgICAgIHRoaXMudXBkYXRlVGltZShtYXhXYWl0VGltZSlcclxuICAgICAgICBpZihjYy5pc1ZhbGlkKHRoaXMudGlwc0xhYmVsKSl7XHJcbiAgICAgICAgICAgIHRoaXMudGlwc0xhYmVsLnNjaGVkdWxlKHRoaXMub25TY2hlZHVsZS5iaW5kKHRoaXMpLCB0aGlzLlVwZGF0ZUludGVydmFsLCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUilcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5mYWRlSW4oMC41KSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVUaW1lKG1heFdhaXRUaW1lKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY291bnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXhGcmFtZUNvdW50ID0gbWF4V2FpdFRpbWUgLyB0aGlzLlVwZGF0ZUludGVydmFsO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vZGVsLm9mZih0aGlzLm1vZGVsLkVWRU5UX1VQREFURV9XQUlUSU5HX1RJTUUsIHRoaXMsIHRoaXMudXBkYXRlVGltZSlcclxuICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMudGlwc0xhYmVsLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMudGlwc0xhYmVsID0gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TY2hlZHVsZSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHdhaXRpbmdMaXN0ID0gdGhpcy5tb2RlbC5nZXRXYWl0aW5nTGlzdCgpO1xyXG4gICAgICAgIGlmKHdhaXRpbmdMaXN0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY291bnRlcisrO1xyXG4gICAgICAgIGxldCBtb2QgPSB0aGlzLmNvdW50ZXIgJSA0O1xyXG4gICAgICAgIC8vIGxldCBzdWJTdHIgPSBcIlwiXHJcbiAgICAgICAgLy8gZm9yKGxldCBpID0gMDsgaSA8IG1vZDsgaSsrKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgc3ViU3RyICs9IFwiLlwiXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHRoaXMudGlwc0xhYmVsLnN0cmluZyA9IFwi546p5ZG95Yqg6L295LitXCIgK3N1YlN0cjtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jb3VudGVyID4gdGhpcy5tYXhGcmFtZUNvdW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/lvLrliLblhbPpl61cclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLndhaXRUaW1lT3V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19