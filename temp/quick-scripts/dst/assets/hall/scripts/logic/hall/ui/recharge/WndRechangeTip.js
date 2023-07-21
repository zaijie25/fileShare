
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/WndRechangeTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '325bd/Mq/xNGJw/rZG+herD', 'WndRechangeTip');
// hall/scripts/logic/hall/ui/recharge/WndRechangeTip.ts

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
var WndRechangeTip = /** @class */ (function (_super) {
    __extends(WndRechangeTip, _super);
    function WndRechangeTip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndRechangeTip.prototype.onInit = function () {
        this.name = "WndRechangeTip";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/Recharge/RechangeTipUI";
        this.destoryType = WndBase_1.DestoryType.None;
        this.RechagreTipModel = Global.ModelManager.getModel("RechagreTipModel");
    };
    WndRechangeTip.prototype.initView = function () {
        this.tip1 = this.getComponent("allNode/tip1", cc.Label);
        this.tip2 = this.getComponent("allNode/tip2", cc.Label);
        this.tip3 = this.getComponent("allNode/tip3", cc.Label);
        this.tip4 = this.getComponent("allNode/tip4", cc.Label);
        this.isTip = this.getChild("isTip/btn");
        this.isTip.active = false;
        this.addCommonClick("vip", this.onVipBtnFunc, this);
        this.addCommonClick("isTip", this.TipBtn, this);
        this.addCommonClick('close', this.close, this);
    };
    WndRechangeTip.prototype.onOpen = function (num) {
        this.tip1.string = num.toString() + "%";
        this.tip2.string = "10000" + "元";
        var str = 100 * num;
        this.tip3.string = str.toString() + "元";
        str = 10000 + 100 * num;
        this.tip4.string = str.toString() + "元";
    };
    WndRechangeTip.prototype.onVipBtnFunc = function () {
        this.close();
        var WndRecharge = Global.UI.getWindow("WndRecharge");
        WndRecharge.rechargeView.ShowVip();
        // Global.UI.close("WndRecharge");
        // Global.ModelManager.getModel("ServicerModel").showServices(ServiceEntranceType.OnlineService);
    };
    WndRechangeTip.prototype.onClose = function () {
        if (this.isTip.active == true) {
            this.RechagreTipModel.setRechagreTipModel();
        }
    };
    WndRechangeTip.prototype.TipBtn = function () {
        this.isTip.active = !this.isTip.active;
    };
    return WndRechangeTip;
}(WndBase_1.default));
exports.default = WndRechangeTip;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcV25kUmVjaGFuZ2VUaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0RBQWdFO0FBSWhFO0lBQTRDLGtDQUFPO0lBQW5EOztJQXNEQSxDQUFDO0lBOUNhLCtCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLHdDQUF3QyxDQUFDO1FBQ3hELElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQVcsQ0FBQyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLGdCQUFnQixHQUFxQixNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQzlGLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ25ELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDL0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNsRCxDQUFDO0lBRVMsK0JBQU0sR0FBaEIsVUFBaUIsR0FBRztRQUVoQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sR0FBRyxHQUFHLENBQUE7UUFDaEMsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFBO1FBQ3ZDLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFFLEdBQUcsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFBO0lBQzNDLENBQUM7SUFFRCxxQ0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxXQUFXLEdBQWdCLE1BQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ2pFLFdBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkMsa0NBQWtDO1FBQ2xDLGlHQUFpRztJQUNyRyxDQUFDO0lBQ0QsZ0NBQU8sR0FBUDtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQy9DO0lBQ0wsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzNDLENBQUM7SUFDTCxxQkFBQztBQUFELENBdERBLEFBc0RDLENBdEQyQyxpQkFBTyxHQXNEbEQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IFduZEJhc2UsIHsgRGVzdG9yeVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBSZWNoYWdyZVRpcE1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1JlY2hhZ3JlVGlwTW9kZWxcIjtcclxuaW1wb3J0IFduZFJlY2hhcmdlIGZyb20gXCIuL1duZFJlY2hhcmdlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRSZWNoYW5nZVRpcCBleHRlbmRzIFduZEJhc2Uge1xyXG4gICAgcHJpdmF0ZSB0aXAxOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgdGlwMjogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIHRpcDM6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSB0aXA0OiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgaXNUaXA6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIFJlY2hhZ3JlVGlwTW9kZWw6IFJlY2hhZ3JlVGlwTW9kZWw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZFJlY2hhbmdlVGlwXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IFwiUG9wTGF5ZXJcIjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9SZWNoYXJnZS9SZWNoYW5nZVRpcFVJXCI7XHJcbiAgICAgICAgdGhpcy5kZXN0b3J5VHlwZSA9IERlc3RvcnlUeXBlLk5vbmU7XHJcbiAgICAgICAgdGhpcy5SZWNoYWdyZVRpcE1vZGVsID0gPFJlY2hhZ3JlVGlwTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlJlY2hhZ3JlVGlwTW9kZWxcIilcclxuICAgIH1cclxuXHJcbiAgICBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLnRpcDEgPSB0aGlzLmdldENvbXBvbmVudChcImFsbE5vZGUvdGlwMVwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy50aXAyID0gdGhpcy5nZXRDb21wb25lbnQoXCJhbGxOb2RlL3RpcDJcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMudGlwMyA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiYWxsTm9kZS90aXAzXCIsIGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLnRpcDQgPSB0aGlzLmdldENvbXBvbmVudChcImFsbE5vZGUvdGlwNFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5pc1RpcCA9IHRoaXMuZ2V0Q2hpbGQoXCJpc1RpcC9idG5cIilcclxuICAgICAgICB0aGlzLmlzVGlwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJ2aXBcIiwgdGhpcy5vblZpcEJ0bkZ1bmMsIHRoaXMpXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImlzVGlwXCIsIHRoaXMuVGlwQnRuLCB0aGlzKVxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soJ2Nsb3NlJywgdGhpcy5jbG9zZSwgdGhpcylcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKG51bSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRpcDEuc3RyaW5nID0gbnVtLnRvU3RyaW5nKCkgKyBcIiVcIjtcclxuICAgICAgICB0aGlzLnRpcDIuc3RyaW5nID0gXCIxMDAwMFwiICsgXCLlhYNcIlxyXG4gICAgICAgIGxldCBzdHIgPSAxMDAgKiBudW07XHJcbiAgICAgICAgdGhpcy50aXAzLnN0cmluZyA9IHN0ci50b1N0cmluZygpICsgXCLlhYNcIlxyXG4gICAgICAgIHN0ciA9IDEwMDAwICsgMTAwICpudW07XHJcbiAgICAgICAgdGhpcy50aXA0LnN0cmluZyA9IHN0ci50b1N0cmluZygpICsgXCLlhYNcIlxyXG4gICAgfVxyXG5cclxuICAgIG9uVmlwQnRuRnVuYygpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgbGV0IFduZFJlY2hhcmdlID0gPFduZFJlY2hhcmdlPkdsb2JhbC5VSS5nZXRXaW5kb3coXCJXbmRSZWNoYXJnZVwiKVxyXG4gICAgICAgIFduZFJlY2hhcmdlLnJlY2hhcmdlVmlldy5TaG93VmlwKCk7XHJcbiAgICAgICAgLy8gR2xvYmFsLlVJLmNsb3NlKFwiV25kUmVjaGFyZ2VcIik7XHJcbiAgICAgICAgLy8gR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlNlcnZpY2VyTW9kZWxcIikuc2hvd1NlcnZpY2VzKFNlcnZpY2VFbnRyYW5jZVR5cGUuT25saW5lU2VydmljZSk7XHJcbiAgICB9XHJcbiAgICBvbkNsb3NlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVGlwLmFjdGl2ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuUmVjaGFncmVUaXBNb2RlbC5zZXRSZWNoYWdyZVRpcE1vZGVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFRpcEJ0bigpIHtcclxuICAgICAgICB0aGlzLmlzVGlwLmFjdGl2ZSA9ICF0aGlzLmlzVGlwLmFjdGl2ZTtcclxuICAgIH1cclxufSJdfQ==