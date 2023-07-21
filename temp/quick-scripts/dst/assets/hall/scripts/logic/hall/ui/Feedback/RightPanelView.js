
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Feedback/RightPanelView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c3869UiwGBEBZ7vpopWH549', 'RightPanelView');
// hall/scripts/logic/hall/ui/Feedback/RightPanelView.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
var ServiceView_1 = require("./ServiceView");
var FeedbackConstants_1 = require("./FeedbackConstants");
var RightPanelView = /** @class */ (function (_super) {
    __extends(RightPanelView, _super);
    function RightPanelView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rightPage = [];
        return _this;
    }
    //view8: ViewBase;
    RightPanelView.prototype.initView = function () {
        //let node1 = this.getChild("feedback");
        var node2 = this.getChild("onlineService");
        var node3 = this.getChild("wxService");
        var node4 = this.getChild("qqService");
        this.node5 = this.getChild("FQA");
        //let node6 = this.getChild("feedbackWrite");
        var node7 = this.getChild("atService");
        //let node8 = this.getChild("feedback2");
        //this.view1 = this.addView("feedback",node1,FeedbackView);
        this.view2 = this.addView("onlineService", node2, ServiceView_1.default);
        this.view3 = this.addView("wxService", node3, ServiceView_1.default);
        this.view4 = this.addView("qqService", node4, ServiceView_1.default);
        //this.view6 = this.addView("feedbackShowAndWrite",node6,FeedbackShowAndWriteView);
        this.view7 = this.addView("atService", node7, ServiceView_1.default);
        //this.view8 = this.addView("feedback2",node8,Feedback2);
        this.noMsgTips = this.getChild("noMsgTips");
        //this.rightPage.push(this.view1);
        this.rightPage.push(this.view2);
        this.rightPage.push(this.view3);
        this.rightPage.push(this.view4);
        this.rightPage.push(this.node5);
        //this.rightPage.push(this.view6);
        this.rightPage.push(this.view7);
        //this.rightPage.push(this.view8);
        this.rightPage.push(this.noMsgTips);
    };
    RightPanelView.prototype.changeView = function (viewType) {
        this.rightPage.forEach(function (element) {
            if (element) {
                element.subViewState = false;
                element.active = false;
            }
        });
        switch (viewType) {
            // case RightViewType.feedback:
            //         this.view1.subViewState=true;
            //     break;
            case FeedbackConstants_1.RightViewType.onlineService:
                this.view2.subViewState = true;
                break;
            case FeedbackConstants_1.RightViewType.wxService:
                this.view3.subViewState = true;
                break;
            case FeedbackConstants_1.RightViewType.qqService:
                this.view4.subViewState = true;
                break;
            case FeedbackConstants_1.RightViewType.FQA:
                this.node5.active = true;
                break;
            // case RightViewType.feedbackShowAndWrite:
            //         this.view6.subViewState=true;
            //     break;
            case FeedbackConstants_1.RightViewType.atService:
                this.view7.subViewState = true;
                break;
            case FeedbackConstants_1.RightViewType.noMsgTips:
                this.noMsgTips.active = true;
                break;
            // case RightViewType.feedback2:
            //         this.view8.subViewState=true;
            //     break;
        }
    };
    RightPanelView.prototype.showNotips = function (isShow) {
        this.noMsgTips.active = isShow;
    };
    RightPanelView.prototype.onSubViewHide = function () {
        this.rightPage.forEach(function (element) {
            element.active = false;
        });
    };
    return RightPanelView;
}(ViewBase_1.default));
exports.default = RightPanelView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxGZWVkYmFja1xcUmlnaHRQYW5lbFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWlEO0FBRWpELDZDQUF3QztBQUV4Qyx5REFBb0Q7QUFNcEQ7SUFBNEMsa0NBQVE7SUFBcEQ7UUFBQSxxRUE4RkM7UUFwRkcsZUFBUyxHQUFVLEVBQUUsQ0FBQzs7SUFvRjFCLENBQUM7SUFuRkcsa0JBQWtCO0lBQ1IsaUNBQVEsR0FBbEI7UUFDSSx3Q0FBd0M7UUFDeEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMzQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLDZDQUE2QztRQUM3QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZDLHlDQUF5QztRQUN6QywyREFBMkQ7UUFDM0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBQyxLQUFLLEVBQUMscUJBQVcsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLHFCQUFXLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxxQkFBVyxDQUFDLENBQUM7UUFDekQsbUZBQW1GO1FBQ25GLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLHFCQUFXLENBQUMsQ0FBQztRQUN6RCx5REFBeUQ7UUFDekQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTVDLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFJTSxtQ0FBVSxHQUFqQixVQUFrQixRQUFnQjtRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87WUFDMUIsSUFBRyxPQUFPLEVBQ1Y7Z0JBQ0ksT0FBTyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO2FBQ3pCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFPLFFBQVEsRUFBQztZQUNaLCtCQUErQjtZQUMvQix3Q0FBd0M7WUFDeEMsYUFBYTtZQUNiLEtBQUssaUNBQWEsQ0FBQyxhQUFhO2dCQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUM7Z0JBQ2pDLE1BQU07WUFDVixLQUFLLGlDQUFhLENBQUMsU0FBUztnQkFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUMsSUFBSSxDQUFDO2dCQUNqQyxNQUFNO1lBQ1YsS0FBSyxpQ0FBYSxDQUFDLFNBQVM7Z0JBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFDLElBQUksQ0FBQztnQkFDakMsTUFBTTtZQUNWLEtBQUssaUNBQWEsQ0FBQyxHQUFHO2dCQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztnQkFDM0IsTUFBTTtZQUNWLDJDQUEyQztZQUMzQyx3Q0FBd0M7WUFDeEMsYUFBYTtZQUNiLEtBQUssaUNBQWEsQ0FBQyxTQUFTO2dCQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUM7Z0JBQ2pDLE1BQU07WUFDVixLQUFLLGlDQUFhLENBQUMsU0FBUztnQkFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDO2dCQUMvQixNQUFNO1lBQ1YsZ0NBQWdDO1lBQ2hDLHdDQUF3QztZQUN4QyxhQUFhO1NBRWhCO0lBQ0wsQ0FBQztJQUVNLG1DQUFVLEdBQWpCLFVBQWtCLE1BQWU7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ25DLENBQUM7SUFFRCxzQ0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQzFCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVMLHFCQUFDO0FBQUQsQ0E5RkEsQUE4RkMsQ0E5RjJDLGtCQUFRLEdBOEZuRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgRmVlZGJhY2tWaWV3IGZyb20gXCIuL0ZlZWRiYWNrVmlld1wiO1xyXG5pbXBvcnQgU2VydmljZVZpZXcgZnJvbSBcIi4vU2VydmljZVZpZXdcIjtcclxuaW1wb3J0IEZlZWRiYWNrU2hvd0FuZFdyaXRlVmlldyBmcm9tIFwiLi9GZWVkYmFja1Nob3dBbmRXcml0ZVZpZXdcIjtcclxuaW1wb3J0IHsgUmlnaHRWaWV3VHlwZSB9IGZyb20gXCIuL0ZlZWRiYWNrQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBGZWVkYmFjazIgZnJvbSBcIi4vRmVlZGJhY2syXCI7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSaWdodFBhbmVsVmlldyBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICAvL3ZpZXcxOiBWaWV3QmFzZTtcclxuICAgIHZpZXcyOiBWaWV3QmFzZTtcclxuICAgIHZpZXczOiBWaWV3QmFzZTtcclxuICAgIHZpZXc0OiBWaWV3QmFzZTtcclxuICAgIG5vZGU1OiBjYy5Ob2RlO1xyXG4gICAgbm9Nc2dUaXBzOiBjYy5Ob2RlO1xyXG4gICAgLy92aWV3NjogVmlld0Jhc2U7XHJcbiAgICB2aWV3NzogVmlld0Jhc2U7XHJcbiAgICByaWdodFBhZ2U6IGFueVtdID0gW107XHJcbiAgICAvL3ZpZXc4OiBWaWV3QmFzZTtcclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIC8vbGV0IG5vZGUxID0gdGhpcy5nZXRDaGlsZChcImZlZWRiYWNrXCIpO1xyXG4gICAgICAgIGxldCBub2RlMiA9IHRoaXMuZ2V0Q2hpbGQoXCJvbmxpbmVTZXJ2aWNlXCIpO1xyXG4gICAgICAgIGxldCBub2RlMyA9IHRoaXMuZ2V0Q2hpbGQoXCJ3eFNlcnZpY2VcIik7XHJcbiAgICAgICAgbGV0IG5vZGU0ID0gdGhpcy5nZXRDaGlsZChcInFxU2VydmljZVwiKTtcclxuICAgICAgICB0aGlzLm5vZGU1ID0gdGhpcy5nZXRDaGlsZChcIkZRQVwiKTtcclxuICAgICAgICAvL2xldCBub2RlNiA9IHRoaXMuZ2V0Q2hpbGQoXCJmZWVkYmFja1dyaXRlXCIpO1xyXG4gICAgICAgIGxldCBub2RlNyA9IHRoaXMuZ2V0Q2hpbGQoXCJhdFNlcnZpY2VcIik7XHJcbiAgICAgICAgLy9sZXQgbm9kZTggPSB0aGlzLmdldENoaWxkKFwiZmVlZGJhY2syXCIpO1xyXG4gICAgICAgIC8vdGhpcy52aWV3MSA9IHRoaXMuYWRkVmlldyhcImZlZWRiYWNrXCIsbm9kZTEsRmVlZGJhY2tWaWV3KTtcclxuICAgICAgICB0aGlzLnZpZXcyID0gdGhpcy5hZGRWaWV3KFwib25saW5lU2VydmljZVwiLG5vZGUyLFNlcnZpY2VWaWV3KTtcclxuICAgICAgICB0aGlzLnZpZXczID0gdGhpcy5hZGRWaWV3KFwid3hTZXJ2aWNlXCIsbm9kZTMsU2VydmljZVZpZXcpO1xyXG4gICAgICAgIHRoaXMudmlldzQgPSB0aGlzLmFkZFZpZXcoXCJxcVNlcnZpY2VcIixub2RlNCxTZXJ2aWNlVmlldyk7XHJcbiAgICAgICAgLy90aGlzLnZpZXc2ID0gdGhpcy5hZGRWaWV3KFwiZmVlZGJhY2tTaG93QW5kV3JpdGVcIixub2RlNixGZWVkYmFja1Nob3dBbmRXcml0ZVZpZXcpO1xyXG4gICAgICAgIHRoaXMudmlldzcgPSB0aGlzLmFkZFZpZXcoXCJhdFNlcnZpY2VcIixub2RlNyxTZXJ2aWNlVmlldyk7XHJcbiAgICAgICAgLy90aGlzLnZpZXc4ID0gdGhpcy5hZGRWaWV3KFwiZmVlZGJhY2syXCIsbm9kZTgsRmVlZGJhY2syKTtcclxuICAgICAgICB0aGlzLm5vTXNnVGlwcyA9IHRoaXMuZ2V0Q2hpbGQoXCJub01zZ1RpcHNcIik7XHJcblxyXG4gICAgICAgIC8vdGhpcy5yaWdodFBhZ2UucHVzaCh0aGlzLnZpZXcxKTtcclxuICAgICAgICB0aGlzLnJpZ2h0UGFnZS5wdXNoKHRoaXMudmlldzIpO1xyXG4gICAgICAgIHRoaXMucmlnaHRQYWdlLnB1c2godGhpcy52aWV3Myk7ICAgICBcclxuICAgICAgICB0aGlzLnJpZ2h0UGFnZS5wdXNoKHRoaXMudmlldzQpO1xyXG4gICAgICAgIHRoaXMucmlnaHRQYWdlLnB1c2godGhpcy5ub2RlNSk7XHJcbiAgICAgICAgLy90aGlzLnJpZ2h0UGFnZS5wdXNoKHRoaXMudmlldzYpO1xyXG4gICAgICAgIHRoaXMucmlnaHRQYWdlLnB1c2godGhpcy52aWV3Nyk7XHJcbiAgICAgICAgLy90aGlzLnJpZ2h0UGFnZS5wdXNoKHRoaXMudmlldzgpO1xyXG4gICAgICAgIHRoaXMucmlnaHRQYWdlLnB1c2godGhpcy5ub01zZ1RpcHMpO1xyXG4gICAgfVxyXG5cclxuICAgXHJcblxyXG4gICAgcHVibGljIGNoYW5nZVZpZXcodmlld1R5cGU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5yaWdodFBhZ2UuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgaWYoZWxlbWVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdWJWaWV3U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgXHJcbiAgICAgICAgc3dpdGNoKHZpZXdUeXBlKXtcclxuICAgICAgICAgICAgLy8gY2FzZSBSaWdodFZpZXdUeXBlLmZlZWRiYWNrOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMudmlldzEuc3ViVmlld1N0YXRlPXRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSaWdodFZpZXdUeXBlLm9ubGluZVNlcnZpY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Mi5zdWJWaWV3U3RhdGU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJpZ2h0Vmlld1R5cGUud3hTZXJ2aWNlOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlldzMuc3ViVmlld1N0YXRlPXRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSaWdodFZpZXdUeXBlLnFxU2VydmljZTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXc0LnN1YlZpZXdTdGF0ZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUmlnaHRWaWV3VHlwZS5GUUE6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlNS5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBjYXNlIFJpZ2h0Vmlld1R5cGUuZmVlZGJhY2tTaG93QW5kV3JpdGU6XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy52aWV3Ni5zdWJWaWV3U3RhdGU9dHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFJpZ2h0Vmlld1R5cGUuYXRTZXJ2aWNlOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlldzcuc3ViVmlld1N0YXRlPXRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBSaWdodFZpZXdUeXBlLm5vTXNnVGlwczpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vTXNnVGlwcy5hY3RpdmU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBjYXNlIFJpZ2h0Vmlld1R5cGUuZmVlZGJhY2syOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMudmlldzguc3ViVmlld1N0YXRlPXRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd05vdGlwcyhpc1Nob3c6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMubm9Nc2dUaXBzLmFjdGl2ZSA9IGlzU2hvdztcclxuICAgIH1cclxuXHJcbiAgICBvblN1YlZpZXdIaWRlKCl7XHJcbiAgICAgICAgdGhpcy5yaWdodFBhZ2UuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG4iXX0=