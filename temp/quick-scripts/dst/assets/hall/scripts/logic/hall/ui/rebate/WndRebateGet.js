
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/rebate/WndRebateGet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7145ccFYVBNeIm7wnBP+Sxi', 'WndRebateGet');
// hall/scripts/logic/hall/ui/rebate/WndRebateGet.ts

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
var HallPopMsgHelper_1 = require("../../tool/HallPopMsgHelper");
var WndRebateGet = /** @class */ (function (_super) {
    __extends(WndRebateGet, _super);
    function WndRebateGet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bindAwardType = -1; //默认方式
        return _this;
    }
    WndRebateGet.prototype.onInit = function () {
        this.name = "WndRebateGet";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Rebate/RebateGetUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndRebateGet.prototype.initView = function () {
        var _this = this;
        this.bindAwardType = -1;
        this.sureBtn = this.getChild("sureBtn");
        this.addCommonClick("sureBtn", this.onSureBtnClick, this);
        this.sureBtn.active = false;
        this.sound = this.getComponent("sound", cc.AudioSource);
        this.rabateLbl = this.getComponent("labelBg/rebateLbl", cc.Label);
        this.effectSk = this.getComponent("effect", sp.Skeleton);
        this.effectSk && this.effectSk.setCompleteListener(function () {
            _this.effectSk.setAnimation(0, "idle2", true);
        });
    };
    WndRebateGet.prototype.onSureBtnClick = function () {
        // Global.Audio.stopAllEffect();
        if (this.sound && this.sound.isPlaying)
            this.sound.stop();
        this.closeWnd();
    };
    WndRebateGet.prototype.onOpen = function (arr) {
        var _this = this;
        var point = arr[0];
        this.bindAwardType = -1;
        if (arr[1]) {
            this.bindAwardType = arr[1];
        }
        var model = Global.ModelManager.getModel("BindingGiftModel");
        this.rabateLbl.string = Global.Toolkit.formatPointStr(point, true) || model.BindAwardNum.toString();
        this.rabateLbl.node.active = false;
        this.effectSk && this.effectSk.setAnimation(0, "idle", false);
        var soundEnable = Global.Setting.settingData.soundEnable;
        if (this.sound && !this.sound.isPlaying && soundEnable)
            this.sound.play();
        this.sureBtn.scale = 1;
        this.timeOut = setTimeout(function () {
            _this.rabateLbl.node.active = true;
            _this.sureBtn.active = true;
            _this.sureBtn.runAction(cc.sequence(cc.scaleTo(0.1, 1.2), cc.scaleTo(0.1, 1)));
            _this.addCommonClick("Mask", _this.onSureBtnClick, _this);
        }, 1000);
        if (arr[2]) {
            this.closeCallback = arr[2];
        }
    };
    WndRebateGet.prototype.closeWnd = function () {
        if (this.closeCallback) {
            this.closeCallback();
        }
        this.close();
    };
    WndRebateGet.prototype.onClose = function () {
        this.closeCallback = null;
        clearTimeout(this.timeOut);
        if (this.bindAwardType > 0) {
            if (this.bindAwardType == HallPopMsgHelper_1.BindAwardUIType.MegePoint) {
                HallPopMsgHelper_1.default.Instance.releaseLock(HallPopMsgHelper_1.PopWndName.MegePoint);
                Global.HallServer.send(NetAppface.mod, NetAppface.GetUserPoint, {});
                return;
            }
            if (this.bindAwardType != HallPopMsgHelper_1.BindAwardUIType.share && this.bindAwardType != HallPopMsgHelper_1.BindAwardUIType.bindPoint) {
                Global.UI.fastTip("绑定手机成功");
            }
            if (this.bindAwardType != HallPopMsgHelper_1.BindAwardUIType.bindPoint) {
                Global.HallServer.send(NetAppface.mod, NetAppface.GetUserPoint, {});
            }
            if (this.bindAwardType == HallPopMsgHelper_1.BindAwardUIType.onlyPhonePoint || this.bindAwardType == HallPopMsgHelper_1.BindAwardUIType.phonePoint) {
                HallPopMsgHelper_1.default.Instance.releaseLock(HallPopMsgHelper_1.PopWndName.PhoneGiftGet);
            }
            else {
                HallPopMsgHelper_1.default.Instance.releaseLock(HallPopMsgHelper_1.PopWndName.BindGiftGet);
            }
        }
    };
    WndRebateGet.prototype.onDispose = function () {
        if (this.sound)
            this.sound = null;
    };
    return WndRebateGet;
}(WndBase_1.default));
exports.default = WndRebateGet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWJhdGVcXFduZFJlYmF0ZUdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBZ0U7QUFDaEUsZ0VBQTRGO0FBRzVGO0lBQTBDLGdDQUFPO0lBQWpEO1FBQUEscUVBcUdDO1FBN0ZXLG1CQUFhLEdBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNOztJQTZGN0MsQ0FBQztJQTNGYSw2QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxvQ0FBb0MsQ0FBQztRQUNwRCxJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFXLENBQUMsSUFBSSxDQUFBO0lBQ3ZDLENBQUM7SUFFUywrQkFBUSxHQUFsQjtRQUFBLGlCQWNDO1FBYkcsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUV4QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFNUIsSUFBSSxDQUFDLEtBQUssR0FBbUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXZFLElBQUksQ0FBQyxTQUFTLEdBQWEsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFFBQVEsR0FB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O0lBQ0QsZ0NBQVMsR0FBVDtRQUVJLElBQUcsSUFBSSxDQUFDLEtBQUs7WUFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtJQUN6QixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXJHQSxBQXFHQyxDQXJHeUMsaUJBQU8sR0FxR2hEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UsIHsgRGVzdG9yeVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBIYWxsUG9wTXNnSGVscGVyLCB7IFBvcFduZE5hbWUsIEJpbmRBd2FyZFVJVHlwZSB9IGZyb20gXCIuLi8uLi90b29sL0hhbGxQb3BNc2dIZWxwZXJcIjtcclxuaW1wb3J0IEJpbmRpbmdHaWZ0TW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvQmluZGluZ0dpZnRNb2RlbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kUmViYXRlR2V0IGV4dGVuZHMgV25kQmFzZXtcclxuICAgIHByaXZhdGUgcmFiYXRlTGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgdGltZU91dDogIE5vZGVKUy5UaW1lb3V0O1xyXG4gICAgcHJpdmF0ZSBlZmZlY3RTazogc3AuU2tlbGV0b247XHJcbiAgICBwcml2YXRlIHN1cmVCdG46IGNjLk5vZGU7XHJcblxyXG4gICAgcHJpdmF0ZSBzb3VuZDpjYy5BdWRpb1NvdXJjZTtcclxuXHJcbiAgICBwcml2YXRlIGJpbmRBd2FyZFR5cGU6bnVtYmVyID0gLTE7IC8v6buY6K6k5pa55byPXHJcbiAgICBwcml2YXRlIGNsb3NlQ2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZFJlYmF0ZUdldFwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvUmViYXRlL1JlYmF0ZUdldFVJXCI7XHJcbiAgICAgICAgdGhpcy5kZXN0b3J5VHlwZSA9IERlc3RvcnlUeXBlLk5vbmVcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICB0aGlzLmJpbmRBd2FyZFR5cGUgPSAtMTtcclxuXHJcbiAgICAgICAgdGhpcy5zdXJlQnRuID0gdGhpcy5nZXRDaGlsZChcInN1cmVCdG5cIik7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcInN1cmVCdG5cIiwgdGhpcy5vblN1cmVCdG5DbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5zdXJlQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnNvdW5kID0gPGNjLkF1ZGlvU291cmNlPnRoaXMuZ2V0Q29tcG9uZW50KFwic291bmRcIixjYy5BdWRpb1NvdXJjZSk7XHJcblxyXG4gICAgICAgIHRoaXMucmFiYXRlTGJsID0gPGNjLkxhYmVsPnRoaXMuZ2V0Q29tcG9uZW50KFwibGFiZWxCZy9yZWJhdGVMYmxcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0U2sgPSA8c3AuU2tlbGV0b24+dGhpcy5nZXRDb21wb25lbnQoXCJlZmZlY3RcIiwgc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0U2sgJiYgdGhpcy5lZmZlY3RTay5zZXRDb21wbGV0ZUxpc3RlbmVyKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0U2suc2V0QW5pbWF0aW9uKDAsIFwiaWRsZTJcIiwgdHJ1ZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU3VyZUJ0bkNsaWNrKCl7XHJcbiAgICAgICAgLy8gR2xvYmFsLkF1ZGlvLnN0b3BBbGxFZmZlY3QoKTtcclxuICAgICAgICBpZih0aGlzLnNvdW5kICYmIHRoaXMuc291bmQuaXNQbGF5aW5nKVxyXG4gICAgICAgICAgICB0aGlzLnNvdW5kLnN0b3AoKTtcclxuICAgICAgICB0aGlzLmNsb3NlV25kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbihhcnIpe1xyXG4gICAgICAgIGxldCBwb2ludCA9IGFyclswXTtcclxuICAgICAgICB0aGlzLmJpbmRBd2FyZFR5cGUgPSAtMTtcclxuICAgICAgICBpZihhcnJbMV0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRBd2FyZFR5cGUgPSBhcnJbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBtb2RlbCA9IDxCaW5kaW5nR2lmdE1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJCaW5kaW5nR2lmdE1vZGVsXCIpO1xyXG4gICAgICAgIHRoaXMucmFiYXRlTGJsLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKHBvaW50LCB0cnVlKSB8fCBtb2RlbC5CaW5kQXdhcmROdW0udG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLnJhYmF0ZUxibC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0U2sgJiYgdGhpcy5lZmZlY3RTay5zZXRBbmltYXRpb24oMCwgXCJpZGxlXCIsIGZhbHNlKTtcclxuICAgICAgICBsZXQgc291bmRFbmFibGUgPSBHbG9iYWwuU2V0dGluZy5zZXR0aW5nRGF0YS5zb3VuZEVuYWJsZTtcclxuICAgICAgICBpZih0aGlzLnNvdW5kICYmICF0aGlzLnNvdW5kLmlzUGxheWluZyAmJiBzb3VuZEVuYWJsZSlcclxuICAgICAgICAgICAgdGhpcy5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgdGhpcy5zdXJlQnRuLnNjYWxlID0gMTtcclxuICAgICAgICB0aGlzLnRpbWVPdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yYWJhdGVMYmwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN1cmVCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5zdXJlQnRuLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuMSwgMS4yKSwgY2Muc2NhbGVUbygwLjEsIDEpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJNYXNrXCIsdGhpcy5vblN1cmVCdG5DbGljayx0aGlzKVxyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIGlmKGFyclsyXSl7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VDYWxsYmFjayA9IGFyclsyXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbG9zZVduZCgpe1xyXG4gICAgICAgIGlmKHRoaXMuY2xvc2VDYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKXtcclxuICAgICAgICB0aGlzLmNsb3NlQ2FsbGJhY2sgPSBudWxsXHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZU91dCk7XHJcbiAgICAgICAgaWYodGhpcy5iaW5kQXdhcmRUeXBlID4gMCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYmluZEF3YXJkVHlwZSA9PSBCaW5kQXdhcmRVSVR5cGUuTWVnZVBvaW50IClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgSGFsbFBvcE1zZ0hlbHBlci5JbnN0YW5jZS5yZWxlYXNlTG9jayhQb3BXbmROYW1lLk1lZ2VQb2ludCk7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkdldFVzZXJQb2ludCwge30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5iaW5kQXdhcmRUeXBlICE9IEJpbmRBd2FyZFVJVHlwZS5zaGFyZSAmJiB0aGlzLmJpbmRBd2FyZFR5cGUgIT0gQmluZEF3YXJkVUlUeXBlLmJpbmRQb2ludCl7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIue7keWumuaJi+acuuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgICAgICBpZih0aGlzLmJpbmRBd2FyZFR5cGUgIT0gQmluZEF3YXJkVUlUeXBlLmJpbmRQb2ludCl7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkdldFVzZXJQb2ludCwge30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuYmluZEF3YXJkVHlwZSA9PSBCaW5kQXdhcmRVSVR5cGUub25seVBob25lUG9pbnQgfHwgdGhpcy5iaW5kQXdhcmRUeXBlID09IEJpbmRBd2FyZFVJVHlwZS5waG9uZVBvaW50KXtcclxuICAgICAgICAgICAgICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UucmVsZWFzZUxvY2soUG9wV25kTmFtZS5QaG9uZUdpZnRHZXQpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UucmVsZWFzZUxvY2soUG9wV25kTmFtZS5CaW5kR2lmdEdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkRpc3Bvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuc291bmQpXHJcbiAgICAgICAgICAgIHRoaXMuc291bmQgPSBudWxsXHJcbiAgICB9XHJcbn0iXX0=