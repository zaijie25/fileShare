
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/BindingGift/WndBindingGift.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bd48ezZGKJH8opArceG4Ezu', 'WndBindingGift');
// hall/scripts/logic/hall/ui/BindingGift/WndBindingGift.ts

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
var HallPopMsgHelper_1 = require("../../tool/HallPopMsgHelper");
var WndBindingGift = /** @class */ (function (_super) {
    __extends(WndBindingGift, _super);
    function WndBindingGift() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndBindingGift.prototype.onInit = function () {
        this.name = "WndBindingGift";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/BindingGift/BindingGift";
        this.model = Global.ModelManager.getModel("BindingGiftModel");
        this.destoryType = WndBase_1.DestoryType.Now;
    };
    WndBindingGift.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.bindBtn = cc.find("BindBtn", this.node);
        this.bindGiftLabel = this.getComponent("awardLabel", cc.Label);
        this.addCommonClick("close", this.close, this);
        this.bindBtn = this.addCommonClick("BindBtn", this.OpenBindingPhone, this);
        if (this.bindBtn) {
            this.bindBtn.active = true;
        }
    };
    WndBindingGift.prototype.playSpineAward = function () {
        var _this = this;
        if (this.SpineNode == null) {
            this.SpineNode = cc.find("spineNode", this.node).getComponent(sp.Skeleton);
            this.SpineNode.setCompleteListener(function () {
                _this.SpineNode.clearTrack(0);
                _this.SpineNode.setAnimation(0, "idle2", true);
            });
        }
        this.SpineNode.clearTrack(0);
        this.SpineNode.setAnimation(0, "idle", false);
    };
    WndBindingGift.prototype.OpenBindingPhone = function () {
        Logger.error("点击绑定手机:0000");
        HallPopMsgHelper_1.default.Instance.addMsgList(HallPopMsgHelper_1.PopWndName.BindPhone, function () {
            Logger.error("点击绑定手机");
            Global.Event.event(GlobalEvent_1.default.POP_BIND_PHONE);
        });
        this.close();
    };
    WndBindingGift.prototype.onOpen = function (args) {
        if (this.model.BindAwardNum === 3)
            Global.Audio.playAudioSource("hall/sound/binding");
        this.model.SetStatus(false);
        this.bindGiftLabel.string = this.model.BindAwardNum.toString() || "";
        if (Global.Setting.SkinConfig.isPurple)
            this.playSpineAward();
    };
    WndBindingGift.prototype.onClose = function () {
        HallPopMsgHelper_1.default.Instance.releaseLock(HallPopMsgHelper_1.PopWndName.BindGift);
        clearTimeout(this.timerId);
    };
    return WndBindingGift;
}(WndBase_1.default));
exports.default = WndBindingGift;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxCaW5kaW5nR2lmdFxcV25kQmluZGluZ0dpZnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWdFO0FBQ2hFLHlEQUFvRDtBQUVwRCxnRUFBMkU7QUFFM0U7SUFBNEMsa0NBQU87SUFBbkQ7O0lBb0VBLENBQUM7SUE1RGEsK0JBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyx5Q0FBeUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsS0FBSyxHQUFxQixNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQVcsQ0FBQyxHQUFHLENBQUM7SUFDdkMsQ0FBQztJQUVTLGlDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2xELElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzlELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDMUUsSUFBRyxJQUFJLENBQUMsT0FBTyxFQUNmO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1NBQzdCO0lBQ0wsQ0FBQztJQUdPLHVDQUFjLEdBQXRCO1FBQUEsaUJBV0M7UUFWRyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDMUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQztnQkFFL0IsS0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzVCLEtBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDakQsQ0FBQyxDQUFDLENBQUE7U0FDTDtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDakQsQ0FBQztJQUVELHlDQUFnQixHQUFoQjtRQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUIsMEJBQWdCLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyw2QkFBVSxDQUFDLFNBQVMsRUFBRTtZQUN2RCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLHFCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVTLCtCQUFNLEdBQWhCLFVBQWlCLElBQUk7UUFDakIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksS0FBSyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLG9CQUFvQixDQUFDLENBQUE7UUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFBO1FBRXBFLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUTtZQUNsQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUdTLGdDQUFPLEdBQWpCO1FBQ0ksMEJBQWdCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyw2QkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQUVMLHFCQUFDO0FBQUQsQ0FwRUEsQUFvRUMsQ0FwRTJDLGlCQUFPLEdBb0VsRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlLCB7IERlc3RvcnlUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5pbXBvcnQgR2xvYmFsRXZlbnQgZnJvbSBcIi4uLy4uLy4uL2NvcmUvR2xvYmFsRXZlbnRcIjtcclxuaW1wb3J0IEJpbmRpbmdHaWZ0TW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvQmluZGluZ0dpZnRNb2RlbFwiO1xyXG5pbXBvcnQgSGFsbFBvcE1zZ0hlbHBlciwgeyBQb3BXbmROYW1lIH0gZnJvbSBcIi4uLy4uL3Rvb2wvSGFsbFBvcE1zZ0hlbHBlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kQmluZGluZ0dpZnQgZXh0ZW5kcyBXbmRCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIG1vZGVsOiBCaW5kaW5nR2lmdE1vZGVsXHJcbiAgICBwcml2YXRlIFNwaW5lTm9kZTogc3AuU2tlbGV0b25cclxuICAgIHByaXZhdGUgYmluZEJ0bjogY2MuTm9kZVxyXG4gICAgcHJpdmF0ZSB0aW1lcklkOiBOb2RlSlMuVGltZW91dFxyXG4gICAgcHJpdmF0ZSBiaW5kR2lmdExhYmVsOiBjYy5MYWJlbFxyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRCaW5kaW5nR2lmdFwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvQmluZGluZ0dpZnQvQmluZGluZ0dpZnRcIjtcclxuICAgICAgICB0aGlzLm1vZGVsID0gPEJpbmRpbmdHaWZ0TW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkJpbmRpbmdHaWZ0TW9kZWxcIik7XHJcbiAgICAgICAgdGhpcy5kZXN0b3J5VHlwZSA9IERlc3RvcnlUeXBlLk5vdztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodDtcclxuICAgICAgICB0aGlzLmJpbmRCdG4gPSBjYy5maW5kKFwiQmluZEJ0blwiLCB0aGlzLm5vZGUpXHJcbiAgICAgICAgdGhpcy5iaW5kR2lmdExhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJhd2FyZExhYmVsXCIsIGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjbG9zZVwiLCB0aGlzLmNsb3NlLCB0aGlzKVxyXG4gICAgICAgIHRoaXMuYmluZEJ0biA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJCaW5kQnRuXCIsIHRoaXMuT3BlbkJpbmRpbmdQaG9uZSwgdGhpcylcclxuICAgICAgICBpZih0aGlzLmJpbmRCdG4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRCdG4uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBwbGF5U3BpbmVBd2FyZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5TcGluZU5vZGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLlNwaW5lTm9kZSA9IGNjLmZpbmQoXCJzcGluZU5vZGVcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pXHJcbiAgICAgICAgICAgIHRoaXMuU3BpbmVOb2RlLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuU3BpbmVOb2RlLmNsZWFyVHJhY2soMClcclxuICAgICAgICAgICAgICAgIHRoaXMuU3BpbmVOb2RlLnNldEFuaW1hdGlvbigwLCBcImlkbGUyXCIsIHRydWUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU3BpbmVOb2RlLmNsZWFyVHJhY2soMClcclxuICAgICAgICB0aGlzLlNwaW5lTm9kZS5zZXRBbmltYXRpb24oMCwgXCJpZGxlXCIsIGZhbHNlKVxyXG4gICAgfVxyXG5cclxuICAgIE9wZW5CaW5kaW5nUGhvbmUoKSB7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwi54K55Ye757uR5a6a5omL5py6OjAwMDBcIik7XHJcbiAgICAgICAgSGFsbFBvcE1zZ0hlbHBlci5JbnN0YW5jZS5hZGRNc2dMaXN0KFBvcFduZE5hbWUuQmluZFBob25lLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIueCueWHu+e7keWumuaJi+aculwiKTtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlBPUF9CSU5EX1BIT05FKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbihhcmdzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWwuQmluZEF3YXJkTnVtID09PSAzKVxyXG4gICAgICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUF1ZGlvU291cmNlKFwiaGFsbC9zb3VuZC9iaW5kaW5nXCIpXHJcbiAgICAgICAgdGhpcy5tb2RlbC5TZXRTdGF0dXMoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuYmluZEdpZnRMYWJlbC5zdHJpbmcgPSB0aGlzLm1vZGVsLkJpbmRBd2FyZE51bS50b1N0cmluZygpIHx8IFwiXCJcclxuICAgICAgICBcclxuICAgICAgICBpZiAoR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5pc1B1cnBsZSlcclxuICAgICAgICAgICAgdGhpcy5wbGF5U3BpbmVBd2FyZCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpIHtcclxuICAgICAgICBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLnJlbGVhc2VMb2NrKFBvcFduZE5hbWUuQmluZEdpZnQpO1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVySWQpXHJcbiAgICB9XHJcblxyXG59Il19