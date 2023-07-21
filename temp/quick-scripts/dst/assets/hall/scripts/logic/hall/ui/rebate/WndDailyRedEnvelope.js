
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/rebate/WndDailyRedEnvelope.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b110eKVDHNM/JD1IExYqmJp', 'WndDailyRedEnvelope');
// hall/scripts/logic/hall/ui/rebate/WndDailyRedEnvelope.ts

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
var ActivityConstants_1 = require("../Activity/ActivityConstants");
var HallPopMsgHelper_1 = require("../../tool/HallPopMsgHelper");
var WndDailyRedEnvelope = /** @class */ (function (_super) {
    __extends(WndDailyRedEnvelope, _super);
    function WndDailyRedEnvelope() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // private closeCallback: Function;
        /**可领取 */
        _this.selectedNode = [];
        /**已经领取 */
        _this.noSelectedNode = [];
        _this.receivedNode = [];
        _this.dayImgNode = [];
        return _this;
    }
    WndDailyRedEnvelope.prototype.onInit = function () {
        this.name = "WndDailyRedEnvelope";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Rebate/DailyRedEnvelopeUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndDailyRedEnvelope.prototype.initView = function () {
        this.selectedNode = [];
        this.noSelectedNode = [];
        this.dayImgNode = [];
        for (var i = 0; i < 5; i++) {
            var item = this.getChild("centerNode/item" + i);
            var selected = cc.find("selectedRed", item);
            var noSelected = cc.find("unselectedRed", item);
            var received = cc.find("receivedRed", item);
            selected.active = false;
            received.active = false;
            noSelected.active = true;
            this.selectedNode.push(selected);
            this.receivedNode.push(received);
            Global.UIHelper.addCommonClick(item, "selectedRed", this.onGetDailyRed, this);
            this.noSelectedNode.push(noSelected);
        }
        var dayImgsNode = this.getChild("dayImgsNode");
        for (var i = 0; i < 5; i++) {
            var dayImg = cc.find("dayImg" + i, dayImgsNode);
            dayImg.active = true;
            this.dayImgNode.push(dayImg);
        }
        this.addCommonClick("button", this.onOpenRechargeClick, this);
        this.addCommonClick("close", this.closeWnd, this);
    };
    WndDailyRedEnvelope.prototype.onOpenRechargeClick = function () {
        Global.UI.show("WndRecharge");
        this.closeWnd();
    };
    WndDailyRedEnvelope.prototype.onOpen = function (arr) {
        this.updateUI();
        // this.closeCallback = arr[0];
    };
    WndDailyRedEnvelope.prototype.updateUI = function () {
        var _this = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetActivityCfg, {}, function (data) {
            var arr = data.data;
            for (var index = 0; index < data.data.length; index++) {
                var cfg = arr[index];
                if (cfg && cfg.atype == ActivityConstants_1.ActivityType.dailyPayRedpack) {
                    var dataArr = cfg.cfg.cfg.list;
                    for (var i = 0; i < dataArr.length; i++) {
                        var nodeData = dataArr[i];
                        var selected = _this.selectedNode[i];
                        selected.data = nodeData;
                        var noSelected = _this.noSelectedNode[i];
                        var received = _this.receivedNode[i];
                        var dayImg = _this.dayImgNode[i];
                        var selectedlabel = cc.find("jibiLabel", selected).getComponent(cc.Label);
                        var noSelectedlabel = cc.find("jibiLabel", noSelected).getComponent(cc.Label);
                        var receivedlabel = cc.find("jibiLabel", received).getComponent(cc.Label);
                        // let spine = cc.find("spine", selected);
                        selectedlabel.string = noSelectedlabel.string = receivedlabel.string = Global.Toolkit.GetMoneyFormat(nodeData.reward);
                        // 0未充值 1已充值不能领取 2可以领取 3已领取 4已失效
                        if (nodeData.status == 1) {
                            dayImg.active = true;
                            selected.active = true;
                            noSelected.active = false;
                            received.active = false;
                        }
                        else if (nodeData.status == 2) {
                            dayImg.active = true;
                            selected.active = true;
                            noSelected.active = false;
                            received.active = false;
                        }
                        else if (nodeData.status == 3) {
                            selected.active = false;
                            selected.active = false;
                            received.active = true;
                            noSelected.active = false;
                        }
                        else {
                            selected.active = true;
                            selected.active = false;
                            received.active = false;
                            noSelected.active = true;
                        }
                    }
                    break;
                }
            }
        }, null, false, 0);
    };
    WndDailyRedEnvelope.prototype.onGetDailyRed = function (target) {
        var _this = this;
        if (target && target.node && target.node.data) {
            if (target.node.data.status == 1) {
                Global.UI.fastTip("明日才可以领取红包哦");
            }
            else if (target.node.data.status == 2) {
                Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.ReciveDailyRedpack, {}, function (retObj) {
                    _this.updateUI();
                    Global.UI.show("WndRebateGet", retObj.recive_point, null, function () {
                    });
                }, function (error) {
                    Global.UI.fastTip(error._errstr);
                    // console.log(error);
                }, false);
            }
        }
    };
    WndDailyRedEnvelope.prototype.closeWnd = function () {
        // if(this.closeCallback){
        //     this.closeCallback();
        // }
        this.close();
    };
    WndDailyRedEnvelope.prototype.onClose = function () {
        HallPopMsgHelper_1.default.Instance.releaseLock(ActivityConstants_1.ActivityType.dailyPayRedpack);
    };
    WndDailyRedEnvelope.prototype.onDispose = function () {
        this.selectedNode = [];
        this.noSelectedNode = [];
        this.receivedNode = [];
    };
    return WndDailyRedEnvelope;
}(WndBase_1.default));
exports.default = WndDailyRedEnvelope;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWJhdGVcXFduZERhaWx5UmVkRW52ZWxvcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0RBQWdFO0FBQ2hFLDREQUE2RDtBQUM3RCxtRUFBNkQ7QUFDN0QsZ0VBQTJEO0FBQzNEO0lBQWlELHVDQUFPO0lBQXhEO1FBQUEscUVBa0lDO1FBaklHLG1DQUFtQztRQUNuQyxTQUFTO1FBQ0Qsa0JBQVksR0FBRyxFQUFFLENBQUM7UUFDMUIsVUFBVTtRQUNGLG9CQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLGtCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLGdCQUFVLEdBQUcsRUFBRSxDQUFDOztJQTJINUIsQ0FBQztJQTFIYSxvQ0FBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcscUJBQXFCLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLDJDQUEyQyxDQUFDO1FBQzNELElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQVcsQ0FBQyxJQUFJLENBQUE7SUFDdkMsQ0FBQztJQUVTLHNDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQy9DLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENB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Q0FBQyxxQkFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBVSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsRUFBQyxVQUFDLE1BQU07b0JBQzVFLEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtvQkFDZixNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBQyxJQUFJLEVBQUM7b0JBQ3hELENBQUMsQ0FBQyxDQUFBO2dCQUNOLENBQUMsRUFBQyxVQUFDLEtBQUs7b0JBQ0osTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNqQyxzQkFBc0I7Z0JBQzFCLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQzthQUNaO1NBQ0o7SUFDTCxDQUFDO0lBQ08sc0NBQVEsR0FBaEI7UUFDSSwwQkFBMEI7UUFDMUIsNEJBQTRCO1FBQzVCLElBQUk7UUFDSixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVTLHFDQUFPLEdBQWpCO1FBQ0ksMEJBQWdCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxnQ0FBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFDRCx1Q0FBUyxHQUFUO1FBRUksSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FsSUEsQUFrSUMsQ0FsSWdELGlCQUFPLEdBa0l2RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgV25kQmFzZSwgeyBEZXN0b3J5VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IHsgTmV0QXBwZmFjZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL25ldC9oYWxsL05ldEV2ZW50XCI7XHJcbmltcG9ydCB7IEFjdGl2aXR5VHlwZSB9IGZyb20gXCIuLi9BY3Rpdml0eS9BY3Rpdml0eUNvbnN0YW50c1wiO1xyXG5pbXBvcnQgSGFsbFBvcE1zZ0hlbHBlciBmcm9tIFwiLi4vLi4vdG9vbC9IYWxsUG9wTXNnSGVscGVyXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZERhaWx5UmVkRW52ZWxvcGUgZXh0ZW5kcyBXbmRCYXNle1xyXG4gICAgLy8gcHJpdmF0ZSBjbG9zZUNhbGxiYWNrOiBGdW5jdGlvbjtcclxuICAgIC8qKuWPr+mihuWPliAqL1xyXG4gICAgcHJpdmF0ZSBzZWxlY3RlZE5vZGUgPSBbXTtcclxuICAgIC8qKuW3sue7j+mihuWPliAqL1xyXG4gICAgcHJpdmF0ZSBub1NlbGVjdGVkTm9kZSA9IFtdO1xyXG4gICAgcHJpdmF0ZSByZWNlaXZlZE5vZGUgPSBbXTtcclxuICAgIHByaXZhdGUgZGF5SW1nTm9kZSA9IFtdO1xyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZERhaWx5UmVkRW52ZWxvcGVcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlBvcExheWVyO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1JlYmF0ZS9EYWlseVJlZEVudmVsb3BlVUlcIjtcclxuICAgICAgICB0aGlzLmRlc3RvcnlUeXBlID0gRGVzdG9yeVR5cGUuTm9uZVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlID0gW107XHJcbiAgICAgICAgdGhpcy5ub1NlbGVjdGVkTm9kZSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGF5SW1nTm9kZSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5nZXRDaGlsZChcImNlbnRlck5vZGUvaXRlbVwiICsgaSlcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gY2MuZmluZChcInNlbGVjdGVkUmVkXCIsIGl0ZW0pXHJcbiAgICAgICAgICAgIGxldCBub1NlbGVjdGVkID0gY2MuZmluZChcInVuc2VsZWN0ZWRSZWRcIiwgaXRlbSlcclxuICAgICAgICAgICAgbGV0IHJlY2VpdmVkID0gY2MuZmluZChcInJlY2VpdmVkUmVkXCIsIGl0ZW0pXHJcbiAgICAgICAgICAgIHNlbGVjdGVkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZWNlaXZlZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbm9TZWxlY3RlZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTm9kZS5wdXNoKHNlbGVjdGVkKTtcclxuICAgICAgICAgICAgdGhpcy5yZWNlaXZlZE5vZGUucHVzaChyZWNlaXZlZCk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayhpdGVtLCBcInNlbGVjdGVkUmVkXCIsIHRoaXMub25HZXREYWlseVJlZCwgdGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMubm9TZWxlY3RlZE5vZGUucHVzaChub1NlbGVjdGVkKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGF5SW1nc05vZGUgPSB0aGlzLmdldENoaWxkKFwiZGF5SW1nc05vZGVcIik7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDU7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBkYXlJbWcgPSBjYy5maW5kKFwiZGF5SW1nXCIgKyBpLCBkYXlJbWdzTm9kZSk7XHJcbiAgICAgICAgICAgIGRheUltZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmRheUltZ05vZGUucHVzaChkYXlJbWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYnV0dG9uXCIsIHRoaXMub25PcGVuUmVjaGFyZ2VDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNsb3NlXCIsIHRoaXMuY2xvc2VXbmQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25PcGVuUmVjaGFyZ2VDbGljaygpe1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kUmVjaGFyZ2VcIik7XHJcbiAgICAgICAgdGhpcy5jbG9zZVduZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oYXJyKXtcclxuICAgICAgICB0aGlzLnVwZGF0ZVVJKClcclxuICAgICAgICAvLyB0aGlzLmNsb3NlQ2FsbGJhY2sgPSBhcnJbMF07XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHVwZGF0ZVVJKCl7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRBY3Rpdml0eUNmZywge30sIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSBkYXRhLmRhdGFcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRhdGEuZGF0YS5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBjZmcgPSBhcnJbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNmZyAmJiBjZmcuYXR5cGUgPT0gQWN0aXZpdHlUeXBlLmRhaWx5UGF5UmVkcGFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhQXJyID0gY2ZnLmNmZy5jZmcubGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZURhdGEgPSAgZGF0YUFycltpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZE5vZGVbaV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQuZGF0YSA9IG5vZGVEYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9TZWxlY3RlZCA9IHRoaXMubm9TZWxlY3RlZE5vZGVbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWNlaXZlZCA9IHRoaXMucmVjZWl2ZWROb2RlW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF5SW1nID0gdGhpcy5kYXlJbWdOb2RlW2ldXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZGxhYmVsID0gY2MuZmluZChcImppYmlMYWJlbFwiLCBzZWxlY3RlZCkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5vU2VsZWN0ZWRsYWJlbCA9IGNjLmZpbmQoXCJqaWJpTGFiZWxcIiwgbm9TZWxlY3RlZCkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlY2VpdmVkbGFiZWwgPSBjYy5maW5kKFwiamliaUxhYmVsXCIsIHJlY2VpdmVkKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgc3BpbmUgPSBjYy5maW5kKFwic3BpbmVcIiwgc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZGxhYmVsLnN0cmluZyA9IG5vU2VsZWN0ZWRsYWJlbC5zdHJpbmcgPSByZWNlaXZlZGxhYmVsLnN0cmluZyA9ICBHbG9iYWwuVG9vbGtpdC5HZXRNb25leUZvcm1hdChub2RlRGF0YS5yZXdhcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAw5pyq5YWF5YC8IDHlt7LlhYXlgLzkuI3og73pooblj5YgMuWPr+S7pemihuWPliAz5bey6aKG5Y+WIDTlt7LlpLHmlYhcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVEYXRhLnN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXlJbWcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub1NlbGVjdGVkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZWl2ZWQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmIChub2RlRGF0YS5zdGF0dXMgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF5SW1nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9TZWxlY3RlZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VpdmVkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZiAobm9kZURhdGEuc3RhdHVzID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlaXZlZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9TZWxlY3RlZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlaXZlZC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vU2VsZWN0ZWQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgbnVsbCwgZmFsc2UsIDApO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkdldERhaWx5UmVkKHRhcmdldCl7XHJcbiAgICAgICAgaWYodGFyZ2V0ICYmIHRhcmdldC5ub2RlICYmIHRhcmdldC5ub2RlLmRhdGEpe1xyXG4gICAgICAgICAgICBpZih0YXJnZXQubm9kZS5kYXRhLnN0YXR1cyA9PSAxKXtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5piO5pel5omN5Y+v5Lul6aKG5Y+W57qi5YyF5ZOmXCIpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0YXJnZXQubm9kZS5kYXRhLnN0YXR1cyA9PSAyKXtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuUmVjaXZlRGFpbHlSZWRwYWNrLCB7fSwocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVSSgpXHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRSZWJhdGVHZXRcIiwgcmV0T2JqLnJlY2l2ZV9wb2ludCxudWxsLCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSwoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChlcnJvci5fZXJyc3RyKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9LGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgY2xvc2VXbmQoKXtcclxuICAgICAgICAvLyBpZih0aGlzLmNsb3NlQ2FsbGJhY2spe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCl7XHJcbiAgICAgICAgSGFsbFBvcE1zZ0hlbHBlci5JbnN0YW5jZS5yZWxlYXNlTG9jayhBY3Rpdml0eVR5cGUuZGFpbHlQYXlSZWRwYWNrKTtcclxuICAgIH1cclxuICAgIG9uRGlzcG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGUgPSBbXTtcclxuICAgICAgICB0aGlzLm5vU2VsZWN0ZWROb2RlID0gW107XHJcbiAgICAgICAgdGhpcy5yZWNlaXZlZE5vZGUgPSBbXTtcclxuICAgIH1cclxufSJdfQ==