
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/rebate/WndHallRedEnvelope.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWJhdGVcXFduZEhhbGxSZWRFbnZlbG9wZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxvREFBZ0U7QUFDaEUsNERBQTZEO0FBRTdELGdFQUEyRDtBQUMzRCxtRUFBNkQ7QUFDN0Q7SUFBZ0Qsc0NBQU87SUFBdkQ7O0lBNkVBLENBQUM7SUF2RUcsZ0NBQWdDO0lBQ3RCLG1DQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxvQkFBb0IsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsMENBQTBDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBVyxDQUFDLElBQUksQ0FBQTtJQUN2QyxDQUFDO0lBRVMscUNBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFjLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLE9BQU8sR0FBZ0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QywwRUFBMEU7SUFDOUUsQ0FBQztJQUVPLDJDQUFjLEdBQXRCO1FBQUEsaUJBYUM7UUFaRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQzlDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFVLENBQUMsR0FBRyxFQUFFLHFCQUFVLENBQUMsYUFBYSxFQUFFLEVBQUUsRUFBQyxVQUFDLE1BQU07WUFDdkUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDO2dCQUM3QyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1lBQ3ZDLENBQUMsQ0FBQyxDQUFBO1lBQ0YsS0FBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO1lBQzlCLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNuQixDQUFDLEVBQUMsVUFBQyxLQUFLO1lBQ0osTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLHNCQUFzQjtRQUMxQixDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRVMsbUNBQU0sR0FBaEIsVUFBaUIsR0FBRztRQUNoQixJQUFHLElBQUksQ0FBQyxPQUFPLEVBQUM7WUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pEO1FBQ0Qsb0JBQW9CO1FBQ3BCLGlDQUFpQztRQUNqQyxzREFBc0Q7UUFDdEQsSUFBSTtRQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDcEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUMsSUFBSSxDQUFDO1FBQ3ZDLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDNUIsT0FBTztTQUNWO1FBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDO1lBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1NBQy9CO2FBQUk7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUMvQjtJQUVMLENBQUM7SUFFTyxxQ0FBUSxHQUFoQjtRQUNJLElBQUcsSUFBSSxDQUFDLGFBQWEsRUFBQztZQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVTLG9DQUFPLEdBQWpCO1FBQ0ksMEJBQWdCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxnQ0FBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRXJFLENBQUM7SUFDRCxzQ0FBUyxHQUFUO0lBRUEsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0E3RUEsQUE2RUMsQ0E3RStDLGlCQUFPLEdBNkV0RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgV25kQmFzZSwgeyBEZXN0b3J5VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IHsgTmV0QXBwZmFjZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL25ldC9oYWxsL05ldEV2ZW50XCI7XHJcbmltcG9ydCBIYWxsTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvSGFsbE1vZGVsXCI7XHJcbmltcG9ydCBIYWxsUG9wTXNnSGVscGVyIGZyb20gXCIuLi8uLi90b29sL0hhbGxQb3BNc2dIZWxwZXJcIjtcclxuaW1wb3J0IHsgQWN0aXZpdHlUeXBlIH0gZnJvbSBcIi4uL0FjdGl2aXR5L0FjdGl2aXR5Q29uc3RhbnRzXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZEhhbGxSZWRFbnZlbG9wZSBleHRlbmRzIFduZEJhc2V7XHJcbiAgICBwcml2YXRlIG9wZW5Ta2U6IHNwLlNrZWxldG9uO1xyXG4gICAgcHJpdmF0ZSBub09wZW5TcDogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgZGF0YTtcclxuICAgIHByaXZhdGUgbW9kZWw6IEhhbGxNb2RlbDtcclxuICAgIHByaXZhdGUgY2xvc2VDYWxsYmFjazogRnVuY3Rpb247XHJcbiAgICAvLyBwcml2YXRlIGdvbGRTa2U6IHNwLlNrZWxldG9uO1xyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZEhhbGxSZWRFbnZlbG9wZVwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvUmViYXRlL0hhbGxSZWRFbnZlbG9wZVVJXCI7XHJcbiAgICAgICAgdGhpcy5kZXN0b3J5VHlwZSA9IERlc3RvcnlUeXBlLk5vbmVcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICB0aGlzLm1vZGVsID0gPEhhbGxNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiSGFsbE1vZGVsXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJvcGVuQnRuXCIsIHRoaXMub25TdXJlQnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMub3BlblNrZSA9IDxzcC5Ta2VsZXRvbj50aGlzLmdldENvbXBvbmVudChcIm9wZW5CdG5cIiwgc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMubm9PcGVuU3AgPSB0aGlzLmdldENoaWxkKFwibm9vcGVuXCIpO1xyXG4gICAgICAgIC8vIHRoaXMuZ29sZFNrZSA9IDxzcC5Ta2VsZXRvbj50aGlzLmdldENvbXBvbmVudChcInNrZWxldG9uXCIsIHNwLlNrZWxldG9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uU3VyZUJ0bkNsaWNrKCl7XHJcbiAgICAgICAgdGhpcy5vcGVuU2tlLmNsZWFyVHJhY2soMClcclxuICAgICAgICB0aGlzLm9wZW5Ta2Uuc2V0QW5pbWF0aW9uKDAsIFwiaWRsZV9OT1wiLCBmYWxzZSlcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkRvUmVjaGFyZ2VSZWQsIHt9LChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRSZWJhdGVHZXRcIiwgcmV0T2JqLnBvaW50LG51bGwsKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRHZXRSZWRFbnZlbG9wZVwiKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnJlY2hhcmdlX3JlZCA9IG51bGxcclxuICAgICAgICAgICAgdGhpcy5jbG9zZVduZCgpXHJcbiAgICAgICAgfSwoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoZXJyb3IuX2VycnN0cik7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICB9LGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKGFycil7XHJcbiAgICAgICAgaWYodGhpcy5vcGVuU2tlKXtcclxuICAgICAgICAgICAgdGhpcy5vcGVuU2tlLmNsZWFyVHJhY2soMClcclxuICAgICAgICAgICAgdGhpcy5vcGVuU2tlLnNldEFuaW1hdGlvbigwLFwiaWRsZV9Mb29wXCIsdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmKHRoaXMuZ29sZFNrZSl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuZ29sZFNrZS5jbGVhclRyYWNrKDApXHJcbiAgICAgICAgLy8gICAgIHRoaXMuZ29sZFNrZS5zZXRBbmltYXRpb24oMCxcImFuaW1hdGlvblwiLGZhbHNlKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5tb2RlbC5yZWNoYXJnZV9yZWQ7XHJcbiAgICAgICAgbGV0IHRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpLzEwMDA7XHJcbiAgICAgICAgaWYoIXRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5Ta2Uubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub09wZW5TcC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCB0aW1lID4gdGhpcy5kYXRhLnN0aW1lICYmIHRpbWUgPCB0aGlzLmRhdGEuZXRpbWUpe1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5Ta2Uubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vT3BlblNwLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMub3BlblNrZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vT3BlblNwLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsb3NlV25kKCl7XHJcbiAgICAgICAgaWYodGhpcy5jbG9zZUNhbGxiYWNrKXtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZUNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpe1xyXG4gICAgICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UucmVsZWFzZUxvY2soQWN0aXZpdHlUeXBlLnJlY2hhcmdlR2l2ZSk7XHJcblxyXG4gICAgfVxyXG4gICAgb25EaXNwb3NlKClcclxuICAgIHtcclxuICAgIH1cclxufSJdfQ==