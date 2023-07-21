
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Feedback/Feedback2.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e07f3NJ3ORHoYQ+Ys66EphJ', 'Feedback2');
// hall/scripts/logic/hall/ui/Feedback/Feedback2.ts

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
var Feedback2 = /** @class */ (function (_super) {
    __extends(Feedback2, _super);
    function Feedback2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isOpen = false;
        _this.tips = ["1. 充值问题", "2. 提现问题", "3. 活动优惠", "4. 代理问题", "5. 游戏相关", "6. 其他问题"];
        _this.server = null;
        _this.order = -1;
        return _this;
    }
    Feedback2.prototype.initView = function () {
        var _this = this;
        this.quickQuestionArea = this.getChild("quickQuestion");
        this.quickQuestionItem = this.getChild("quickQuestion/item");
        this.tips.forEach(function (e) {
            var item = cc.instantiate(_this.quickQuestionItem);
            item.active = true;
            item.getChildByName("label").getComponent(cc.Label).string = e;
            _this.quickQuestionArea.addChild(item);
            item.on(cc.Node.EventType.TOUCH_END, _this.itemClick, _this);
        });
    };
    // public setShowOrEdit(isShowOrEdit: number){
    //     this.isShowOrEdit = isShowOrEdit;
    // }
    Feedback2.prototype.onOpen = function () {
        // if(this.isShowOrEdit == 1){
        //     this.quickQuestionArea.active = false;
        // }else if(this.isShowOrEdit == 0){
        //     this.quickQuestionArea.active = false;
        // }
        // this.addCommonClick("bottom/commitBtn", this.commitOrBack, this);
    };
    Feedback2.prototype.itemClick = function (event) {
        this.quickQuestion();
    };
    Feedback2.prototype.quickQuestion = function () {
        this.server.acceptService(this.order);
        // let rightPanelView = <RightPanelView>Global.UI.getWindow("WndFeedback").getView("RightPanelView");
        // let write:FeedbackShowAndWriteView = <FeedbackShowAndWriteView>rightPanelView.getView("feedbackShowAndWrite");
        // write.setShowOrEdit(0);
        // rightPanelView.changeView(RightViewType.feedbackShowAndWrite);
    };
    Feedback2.prototype.onClose = function () {
    };
    return Feedback2;
}(ViewBase_1.default));
exports.default = Feedback2;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxGZWVkYmFja1xcRmVlZGJhY2syLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQU9qRDtJQUF1Qyw2QkFBUTtJQUEvQztRQUFBLHFFQXFEQztRQWhERyxZQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3hCLFVBQUksR0FBYSxDQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEUsWUFBTSxHQUFpQixJQUFJLENBQUM7UUFDNUIsV0FBSyxHQUFZLENBQUMsQ0FBQyxDQUFDOztJQTZDL0IsQ0FBQztJQTVDYSw0QkFBUSxHQUFsQjtRQUFBLGlCQVVDO1FBVEcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7WUFDZixJQUFJLElBQUksR0FBWSxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQy9ELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsS0FBSSxDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCw4Q0FBOEM7SUFDOUMsd0NBQXdDO0lBQ3hDLElBQUk7SUFDTSwwQkFBTSxHQUFoQjtRQUNJLDhCQUE4QjtRQUM5Qiw2Q0FBNkM7UUFDN0Msb0NBQW9DO1FBQ3BDLDZDQUE2QztRQUM3QyxJQUFJO1FBQ0osb0VBQW9FO0lBQ3hFLENBQUM7SUFFRCw2QkFBUyxHQUFULFVBQVUsS0FBSztRQUNYLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsaUNBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxxR0FBcUc7UUFDckcsaUhBQWlIO1FBQ2pILDBCQUEwQjtRQUMxQixpRUFBaUU7SUFDckUsQ0FBQztJQUlELDJCQUFPLEdBQVA7SUFFQSxDQUFDO0lBSUwsZ0JBQUM7QUFBRCxDQXJEQSxBQXFEQyxDQXJEc0Msa0JBQVEsR0FxRDlDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBSaWdodFBhbmVsVmlldyBmcm9tIFwiLi9SaWdodFBhbmVsVmlld1wiO1xyXG5pbXBvcnQgRmVlZGJhY2tNb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9GZWVkYmFja01vZGVsXCI7XHJcbmltcG9ydCB7IEZlZWRiYWNrQ29uc3RhbnRzLCBSaWdodFZpZXdUeXBlIH0gZnJvbSBcIi4vRmVlZGJhY2tDb25zdGFudHNcIjtcclxuaW1wb3J0IEFic1NlcnZpY2VyIGZyb20gXCIuL0Fic1NlcnZpY2VyXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmVlZGJhY2syIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIC8vIHByaXZhdGUgaXNTaG93T3JFZGl0OiBudW1iZXIgPSAwOyAvLzDkuLrnq4vljbPlj43ppojlj6/nvJbovpHpl67popjvvIwx5Li65bGV56S66K+m5oOFXHJcbiAgICBxdWlja1F1ZXN0aW9uSXRlbTogY2MuTm9kZTtcclxuICAgIHF1aWNrUXVlc3Rpb25BcmVhOiBjYy5Ob2RlOyBcclxuICAgIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgdGlwczogc3RyaW5nW10gPSBbXCIxLiDlhYXlgLzpl67pophcIixcIjIuIOaPkOeOsOmXrumimFwiLFwiMy4g5rS75Yqo5LyY5oOgXCIsXCI0LiDku6PnkIbpl67pophcIixcIjUuIOa4uOaIj+ebuOWFs1wiLFwiNi4g5YW25LuW6Zeu6aKYXCJdO1xyXG4gICAgcHVibGljIHNlcnZlciA6IEFic1NlcnZpY2VyID0gbnVsbDtcclxuICAgIHB1YmxpYyBvcmRlciA6IG51bWJlciA9IC0xO1xyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5xdWlja1F1ZXN0aW9uQXJlYSA9IHRoaXMuZ2V0Q2hpbGQoXCJxdWlja1F1ZXN0aW9uXCIpOyBcclxuICAgICAgICB0aGlzLnF1aWNrUXVlc3Rpb25JdGVtID0gdGhpcy5nZXRDaGlsZChcInF1aWNrUXVlc3Rpb24vaXRlbVwiKTtcclxuICAgICAgICB0aGlzLnRpcHMuZm9yRWFjaChlID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW06IGNjLk5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnF1aWNrUXVlc3Rpb25JdGVtKTtcclxuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBlO1xyXG4gICAgICAgICAgICB0aGlzLnF1aWNrUXVlc3Rpb25BcmVhLmFkZENoaWxkKGl0ZW0pO1xyXG4gICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5pdGVtQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgc2V0U2hvd09yRWRpdChpc1Nob3dPckVkaXQ6IG51bWJlcil7XHJcbiAgICAvLyAgICAgdGhpcy5pc1Nob3dPckVkaXQgPSBpc1Nob3dPckVkaXQ7XHJcbiAgICAvLyB9XHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCl7XHJcbiAgICAgICAgLy8gaWYodGhpcy5pc1Nob3dPckVkaXQgPT0gMSl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucXVpY2tRdWVzdGlvbkFyZWEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfWVsc2UgaWYodGhpcy5pc1Nob3dPckVkaXQgPT0gMCl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucXVpY2tRdWVzdGlvbkFyZWEuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJib3R0b20vY29tbWl0QnRuXCIsIHRoaXMuY29tbWl0T3JCYWNrLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBpdGVtQ2xpY2soZXZlbnQpe1xyXG4gICAgICAgIHRoaXMucXVpY2tRdWVzdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHF1aWNrUXVlc3Rpb24oKXtcclxuICAgICAgICB0aGlzLnNlcnZlci5hY2NlcHRTZXJ2aWNlKHRoaXMub3JkZXIpO1xyXG4gICAgICAgIC8vIGxldCByaWdodFBhbmVsVmlldyA9IDxSaWdodFBhbmVsVmlldz5HbG9iYWwuVUkuZ2V0V2luZG93KFwiV25kRmVlZGJhY2tcIikuZ2V0VmlldyhcIlJpZ2h0UGFuZWxWaWV3XCIpO1xyXG4gICAgICAgIC8vIGxldCB3cml0ZTpGZWVkYmFja1Nob3dBbmRXcml0ZVZpZXcgPSA8RmVlZGJhY2tTaG93QW5kV3JpdGVWaWV3PnJpZ2h0UGFuZWxWaWV3LmdldFZpZXcoXCJmZWVkYmFja1Nob3dBbmRXcml0ZVwiKTtcclxuICAgICAgICAvLyB3cml0ZS5zZXRTaG93T3JFZGl0KDApO1xyXG4gICAgICAgIC8vIHJpZ2h0UGFuZWxWaWV3LmNoYW5nZVZpZXcoUmlnaHRWaWV3VHlwZS5mZWVkYmFja1Nob3dBbmRXcml0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgb25DbG9zZSgpe1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG4iXX0=