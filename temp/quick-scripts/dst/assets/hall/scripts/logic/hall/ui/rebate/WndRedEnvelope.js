
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/rebate/WndRedEnvelope.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWJhdGVcXFduZFJlZEVudmVsb3BlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9EQUFnRTtBQUNoRSw0REFBNkQ7QUFFN0Q7SUFBNEMsa0NBQU87SUFBbkQ7O0lBb0dBLENBQUM7SUF4RmEsK0JBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQ0FBc0MsQ0FBQztRQUN0RCxJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFXLENBQUMsSUFBSSxDQUFBO0lBQ3ZDLENBQUM7SUFFUyxpQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQWMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsU0FBUyxHQUFhLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsT0FBTyxHQUFnQixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ3pDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENB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QU0sR0FBRSxJQUFJLENBQUM7WUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUUsSUFBSSxDQUFDO1lBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFFLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRSxJQUFJLENBQUM7U0FDbkM7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDL0UsYUFBYTtRQUNiLElBQUk7UUFDSixtQ0FBbUM7UUFDbkMsSUFBSTtRQUNKLGtGQUFrRjtRQUNsRixzQ0FBc0M7UUFDdEMsaUVBQWlFO0lBRXJFLENBQUM7SUFFTyxpQ0FBUSxHQUFoQjtRQUNJLElBQUcsSUFBSSxDQUFDLGFBQWEsRUFBQztZQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVTLGdDQUFPLEdBQWpCO0lBRUEsQ0FBQztJQUNELGtDQUFTLEdBQVQ7SUFFQSxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQXBHQSxBQW9HQyxDQXBHMkMsaUJBQU8sR0FvR2xEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBXbmRCYXNlLCB7IERlc3RvcnlUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5pbXBvcnQgeyBOZXRBcHBmYWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvbmV0L2hhbGwvTmV0RXZlbnRcIjtcclxuaW1wb3J0IEhhbGxNb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9IYWxsTW9kZWxcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kUmVkRW52ZWxvcGUgZXh0ZW5kcyBXbmRCYXNle1xyXG4gICAgcHJpdmF0ZSByYWJhdGVMYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBvcGVuU2tlOiBzcC5Ta2VsZXRvbjtcclxuICAgIHByaXZhdGUgZ29vZEx1Y2s6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHdpbk1vbmV5OiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSB3aW5Nb25leTI6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGdvb2RMdWNrVGl0bGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIG5ld1BlcnNvblRpdGxlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSB3aW5Nb25leVRpdGxlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBkYXRhO1xyXG4gICAgcHJpdmF0ZSBtb2RlbDogSGFsbE1vZGVsO1xyXG4gICAgcHJpdmF0ZSBjbG9zZUNhbGxiYWNrOiBGdW5jdGlvbjtcclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRSZWRFbnZlbG9wZVwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvUmViYXRlL1JlZEVudmVsb3BlVUlcIjtcclxuICAgICAgICB0aGlzLmRlc3RvcnlUeXBlID0gRGVzdG9yeVR5cGUuTm9uZVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSA8SGFsbE1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJIYWxsTW9kZWxcIik7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcIm9wZW5CdG5cIiwgdGhpcy5vblN1cmVCdG5DbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5yYWJhdGVMYmwgPSA8Y2MuTGFiZWw+dGhpcy5nZXRDb21wb25lbnQoXCJyZWJhdGVMYmxcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMub3BlblNrZSA9IDxzcC5Ta2VsZXRvbj50aGlzLmdldENvbXBvbmVudChcIm9wZW5CdG5cIiwgc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMuZ29vZEx1Y2sgPSB0aGlzLmdldENoaWxkKFwiZ29vZEx1Y2tcIilcclxuICAgICAgICB0aGlzLndpbk1vbmV5ID0gdGhpcy5nZXRDaGlsZChcIndpbk1vbmV5XCIpXHJcbiAgICAgICAgdGhpcy53aW5Nb25leTIgPSB0aGlzLmdldENoaWxkKFwid2luTW9uZXkyXCIpXHJcbiAgICAgICAgdGhpcy5nb29kTHVja1RpdGxlID0gdGhpcy5nZXRDaGlsZChcImdvb2RMdWNrVGl0bGVcIilcclxuICAgICAgICB0aGlzLm5ld1BlcnNvblRpdGxlID0gdGhpcy5nZXRDaGlsZChcIm5ld1BlcnNvblRpdGxlXCIpXHJcbiAgICAgICAgdGhpcy53aW5Nb25leVRpdGxlID0gdGhpcy5nZXRDaGlsZChcIndpbk1vbmV5VGl0bGVcIilcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU3VyZUJ0bkNsaWNrKCl7XHJcbiAgICAgICAgdGhpcy5vcGVuU2tlLmNsZWFyVHJhY2soMClcclxuICAgICAgICB0aGlzLm9wZW5Ta2Uuc2V0QW5pbWF0aW9uKDAsIFwiaWRsZV9OT1wiLCBmYWxzZSlcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLlJlY2VpdmVSZXdhcmRQYWNrLCB7aWQ6dGhpcy5kYXRhLmlkfSwocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VXbmQoKVxyXG4gICAgICAgICAgICAvL+mHjeaWsOiOt+WPluWJqeS9mee6ouWMhVxyXG4gICAgICAgIH0sKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKGVycm9yLl9lcnJzdHIpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfSxmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbihhcnIpe1xyXG4gICAgICAgIGlmKHRoaXMub3BlblNrZSl7XHJcbiAgICAgICAgICAgIHRoaXMub3BlblNrZS5jbGVhclRyYWNrKDApXHJcbiAgICAgICAgICAgIHRoaXMub3BlblNrZS5zZXRBbmltYXRpb24oMCxcImlkbGVfTG9vcFwiLHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRhdGEgPSBhcnJbMF07XHJcbiAgICAgICAgdGhpcy5jbG9zZUNhbGxiYWNrID0gYXJyWzFdO1xyXG4gICAgICAgIGxldCB0eXBlID0gdGhpcy5kYXRhLnBhY2tfdHlwZTtcclxuICAgICAgICBpZih0eXBlID09PSAxKXsgLy/mlrDkurpcclxuICAgICAgICAgICAgdGhpcy5nb29kTHVjay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5nb29kTHVja1RpdGxlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLndpbk1vbmV5LmFjdGl2ZSA9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMud2luTW9uZXkyLmFjdGl2ZSA9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubmV3UGVyc29uVGl0bGUuYWN0aXZlID10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpbk1vbmV5VGl0bGUuYWN0aXZlID1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0eXBlID09PSAyKSAvL+Wlvei/kFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5nb29kTHVjay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmdvb2RMdWNrVGl0bGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53aW5Nb25leS5hY3RpdmUgPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLndpbk1vbmV5Mi5hY3RpdmUgPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5ld1BlcnNvblRpdGxlLmFjdGl2ZSA9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMud2luTW9uZXlUaXRsZS5hY3RpdmUgPWZhbHNlO1xyXG4gICAgICAgIH1lbHNleyAvL+i1oumSsVxyXG4gICAgICAgICAgICB0aGlzLmdvb2RMdWNrLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmdvb2RMdWNrVGl0bGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMud2luTW9uZXkuYWN0aXZlID10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpbk1vbmV5Mi5hY3RpdmUgPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubmV3UGVyc29uVGl0bGUuYWN0aXZlID1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy53aW5Nb25leVRpdGxlLmFjdGl2ZSA9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yYWJhdGVMYmwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIodGhpcy5kYXRhLnBvaW50fHwwLCB0cnVlKVxyXG4gICAgICAgIC8vIGlmKGFyclsxXSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYmluZEF3YXJkVHlwZSA9IGFyclsxXTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gdmFyIG1vZGVsID0gPEJpbmRpbmdHaWZ0TW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkJpbmRpbmdHaWZ0TW9kZWxcIik7XHJcbiAgICAgICAgLy8gdGhpcy5yYWJhdGVMYmwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB0aGlzLmVmZmVjdFNrICYmIHRoaXMuZWZmZWN0U2suc2V0QW5pbWF0aW9uKDAsIFwiaWRsZVwiLCBmYWxzZSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xvc2VXbmQoKXtcclxuICAgICAgICBpZih0aGlzLmNsb3NlQ2FsbGJhY2spe1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCl7XHJcblxyXG4gICAgfVxyXG4gICAgb25EaXNwb3NlKClcclxuICAgIHtcclxuICAgIH1cclxufSJdfQ==