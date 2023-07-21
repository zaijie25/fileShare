
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/waiting/WndNetReconnect.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFx3YWl0aW5nXFxXbmROZXRSZWNvbm5lY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWdFO0FBQ2hFLHlEQUFvRDtBQUVwRCxVQUFVO0FBQ1Y7SUFBNkMsbUNBQU87SUFBcEQ7UUFBQSxxRUFvRUM7UUFqRVcsYUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLHNCQUFnQixHQUFHLENBQUMsQ0FBQzs7SUFnRWpDLENBQUM7SUE3RGEsZ0NBQU0sR0FBaEI7UUFFSSxJQUFJLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyw4QkFBOEIsQ0FBQztRQUM5QyxJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFXLENBQUMsSUFBSSxDQUFDO0lBQ3hDLENBQUM7SUFFUyxrQ0FBUSxHQUFsQjtRQUVJLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDcEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFHUyxnQ0FBTSxHQUFoQjtRQUVJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDakYsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ2pJLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLHFCQUFXLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFUyxpQ0FBTyxHQUFqQjtRQUVJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxxQkFBVyxDQUFDLHNCQUFzQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRVMsbUNBQVMsR0FBbkI7UUFFSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxxQkFBVyxDQUFDLHNCQUFzQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRU8sZ0RBQXNCLEdBQTlCLFVBQStCLEtBQUs7UUFFaEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztJQUNsQyxDQUFDO0lBRU8sb0NBQVUsR0FBbEI7UUFFSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFDZixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUMzQjtZQUNJLE1BQU0sSUFBSSxHQUFHLENBQUE7U0FDaEI7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUVsSSxJQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxFQUNwQjtZQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQjtJQUNMLENBQUM7SUFDTCxzQkFBQztBQUFELENBcEVBLEFBb0VDLENBcEU0QyxpQkFBTyxHQW9FbkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSwgeyBEZXN0b3J5VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IEdsb2JhbEV2ZW50IGZyb20gXCIuLi8uLi8uLi9jb3JlL0dsb2JhbEV2ZW50XCI7XHJcblxyXG4vL+e9kee7nOivt+axguW8ueWHuueVjOmdolxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmROZXRSZWNvbm5lY3QgZXh0ZW5kcyBXbmRCYXNlXHJcbntcclxuICAgIHByaXZhdGUgdGlwc0xhYmVsOmNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBjb3VudGVyID0gMDtcclxuICAgIHByaXZhdGUgY3VyUmVjb25uZWN0VGltZSA9IDA7XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiV25kTmV0UmVjb25uZWN0XCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IEdsb2JhbC5VSS5UaXBzTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvTmV0UmVjb25uZWN0XCI7XHJcbiAgICAgICAgdGhpcy5kZXN0b3J5VHlwZSA9IERlc3RvcnlUeXBlLk5vbmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgICBsZXQgYmdOb2RlID0gdGhpcy5nZXRDaGlsZChcImJsYWNrX2JnXCIpO1xyXG4gICAgICAgIGJnTm9kZS53aWR0aCA9IDE2MDA7XHJcbiAgICAgICAgYmdOb2RlLmhlaWdodCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodDtcclxuICAgICAgICB0aGlzLnRpcHNMYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwidGlwc1wiLCBjYy5MYWJlbCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY291bnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5jdXJSZWNvbm5lY3RUaW1lID0gMTtcclxuICAgICAgICB0aGlzLnRpcHNMYWJlbC5zY2hlZHVsZSh0aGlzLm9uU2NoZWR1bGUuYmluZCh0aGlzKSwgMC41LCBjYy5tYWNyby5SRVBFQVRfRk9SRVZFUilcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmZhZGVJbigwLjUpKTtcclxuICAgICAgICB0aGlzLnRpcHNMYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCLmraPlnKjph43mlrDov57mjqXvvIglZC8lZO+8ie+8jOivt+eojeWQjlwiLCB0aGlzLmN1clJlY29ubmVjdFRpbWUsIEdsb2JhbC5TZXR0aW5nLnNvY2tldFJlY29ubmVjdFRpbWVzKSArIFwiLi4uXCI7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LlVQREFURV9SRUNPTk5FQ1RfQ09VTlQsIHRoaXMsIHRoaXMub25SZWNvbm5lY3RDb3VudFVwZGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY291bnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy50aXBzTGFiZWwudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuVVBEQVRFX1JFQ09OTkVDVF9DT1VOVCwgdGhpcywgdGhpcy5vblJlY29ubmVjdENvdW50VXBkYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuVVBEQVRFX1JFQ09OTkVDVF9DT1VOVCwgdGhpcywgdGhpcy5vblJlY29ubmVjdENvdW50VXBkYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uUmVjb25uZWN0Q291bnRVcGRhdGUodGltZXMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jdXJSZWNvbm5lY3RUaW1lID0gdGltZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNjaGVkdWxlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNvdW50ZXIrKztcclxuICAgICAgICBsZXQgbW9kID0gdGhpcy5jb3VudGVyICUgNDtcclxuICAgICAgICBsZXQgc3ViU3RyID0gXCJcIlxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtb2Q7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1YlN0ciArPSBcIi5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpcHNMYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCLmraPlnKjph43mlrDov57mjqXvvIglZC8lZO+8ie+8jOivt+eojeWQjlwiLCB0aGlzLmN1clJlY29ubmVjdFRpbWUsIEdsb2JhbC5TZXR0aW5nLnNvY2tldFJlY29ubmVjdFRpbWVzKSArIHN1YlN0cjtcclxuXHJcbiAgICAgICAgaWYodGhpcy5jb3VudGVyID4gNTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19