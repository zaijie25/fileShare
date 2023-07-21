
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Feedback/FeedbackListItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ab3ac+iPPBN0K2Yh7S9GM4d', 'FeedbackListItem');
// hall/scripts/logic/hall/ui/Feedback/FeedbackListItem.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var FeedbackConstants_1 = require("./FeedbackConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FeedbackListItem = /** @class */ (function (_super) {
    __extends(FeedbackListItem, _super);
    function FeedbackListItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label1 = null;
        _this.label2 = null;
        return _this;
        /* public SetBackgroundChecked(state:boolean){
            this.CheckSprite.node.active = state
            this.UnCheckSprite.node.active = !state
          
        }
        
        public SetUnReadActiveState(state:boolean){
            this.Unread.node.active = state
        } */
    }
    FeedbackListItem.prototype.close = function () {
        this.node.active = false;
    };
    // update (dt) {}
    FeedbackListItem.prototype.getGameData = function () {
        return this.gameData;
    };
    FeedbackListItem.prototype.onInit = function (data, responePage) {
        this.gameData = data;
        this.dealpage = responePage;
        this.initView();
    };
    FeedbackListItem.prototype.initView = function () {
        this.id = this.gameData.id;
        this.status = this.gameData.status;
        this.label1.string = "问题" + this.gameData.problem_id;
        var problem = this.gameData.problem;
        var prob = problem.split("\n");
        if (prob.length > 0) {
            this.label2.string = Global.Toolkit.substrEndWithElli(prob[0], 24);
        }
        else {
            this.label2.string = Global.Toolkit.substrEndWithElli(problem, 24);
        }
        this.answer = this.gameData.answer;
        /* this.BackgroundTxt.string =  this.gameData;
        this.CheckTxt.string = this.gameData;
        this.toggle.isChecked =false
        this.toggle.uncheck() */
    };
    FeedbackListItem.prototype.deleteItemByID = function () {
        // let id =
        Global.Audio.playBtnSound();
        var para = {
            type: 1,
            problem: "",
            id: this.id //1的时候
        };
        Global.ModelManager.getModel("FeedbackModel").dealFeedback(para, this.dealpage);
    };
    FeedbackListItem.prototype.openReplayDetail = function () {
        // this.id
        Global.Audio.playBtnSound();
        var rightPanelView = Global.UI.getWindow("WndFeedback").getView("RightPanelView");
        var replay = rightPanelView.getView("feedbackShowAndWrite");
        replay.setShowOrEdit(1);
        replay.setData(this.gameData.problem, this.answer);
        rightPanelView.changeView(FeedbackConstants_1.RightViewType.feedbackShowAndWrite);
    };
    __decorate([
        property(cc.Label)
    ], FeedbackListItem.prototype, "label1", void 0);
    __decorate([
        property(cc.Label)
    ], FeedbackListItem.prototype, "label2", void 0);
    FeedbackListItem = __decorate([
        ccclass
    ], FeedbackListItem);
    return FeedbackListItem;
}(cc.Component));
exports.default = FeedbackListItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxGZWVkYmFja1xcRmVlZGJhY2tMaXN0SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSx5REFBb0Q7QUFJOUMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBOEMsb0NBQVk7SUFBMUQ7UUFBQSxxRUFrRkM7UUEvRUcsWUFBTSxHQUFhLElBQUksQ0FBQztRQUd4QixZQUFNLEdBQWEsSUFBSSxDQUFDOztRQW1FeEI7Ozs7Ozs7O1lBUUk7SUFDUixDQUFDO0lBM0RHLGdDQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUNELGlCQUFpQjtJQUNWLHNDQUFXLEdBQWxCO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFDTSxpQ0FBTSxHQUFiLFVBQWMsSUFBUyxFQUFDLFdBQW1CO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0QsbUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFDbkQsSUFBSSxPQUFPLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDM0MsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFHLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUM7U0FDckU7YUFBSTtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUNuQzs7O2dDQUd3QjtJQUM1QixDQUFDO0lBRUQseUNBQWMsR0FBZDtRQUNJLFdBQVc7UUFDWCxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzVCLElBQUksSUFBSSxHQUFDO1lBQ0wsSUFBSSxFQUFFLENBQUM7WUFDWixPQUFPLEVBQUUsRUFBRTtZQUNSLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFFLE1BQU07U0FDcEIsQ0FBQztRQUNGLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCwyQ0FBZ0IsR0FBaEI7UUFDSSxVQUFVO1FBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM1QixJQUFJLGNBQWMsR0FBbUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbEcsSUFBSSxNQUFNLEdBQXNELGNBQWMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUMvRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELGNBQWMsQ0FBQyxVQUFVLENBQUMsaUNBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFyRUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztvREFDSztJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29EQUNLO0lBTlAsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0FrRnBDO0lBQUQsdUJBQUM7Q0FsRkQsQUFrRkMsQ0FsRjZDLEVBQUUsQ0FBQyxTQUFTLEdBa0Z6RDtrQkFsRm9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSaWdodFBhbmVsVmlldyBmcm9tIFwiLi9SaWdodFBhbmVsVmlld1wiO1xyXG5pbXBvcnQgRmVlZGJhY2tTaG93QW5kV3JpdGVWaWV3IGZyb20gXCIuL0ZlZWRiYWNrU2hvd0FuZFdyaXRlVmlld1wiO1xyXG5pbXBvcnQgeyBSaWdodFZpZXdUeXBlIH0gZnJvbSBcIi4vRmVlZGJhY2tDb25zdGFudHNcIjtcclxuXHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGZWVkYmFja0xpc3RJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJlbDE6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBsYWJlbDI6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICAvKiBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgVW5yZWFkOiBjYy5TcHJpdGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIENoZWNrU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIFVuQ2hlY2tTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICAqL1xyXG4gICAgZ2FtZURhdGE6IGFueTsgXHJcbiAgICBwcml2YXRlIGlkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHN0YXR1czogbnVtYmVyOyAvLzDkuLrmnKror7sx5bey6K+7MuW3suWbnuWkjVxyXG4gICAgLy8gcHJpdmF0ZSBwcm9ibGVtOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGFuc3dlcjogc3RyaW5nO1xyXG4gICAgZGVhbHBhZ2U6IG51bWJlcjtcclxuXHJcblxyXG4gICAgY2xvc2UoKXtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG4gICAgcHVibGljIGdldEdhbWVEYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVEYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG9uSW5pdChkYXRhOiBhbnkscmVzcG9uZVBhZ2U6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZ2FtZURhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuZGVhbHBhZ2UgPSByZXNwb25lUGFnZTtcclxuICAgICAgICB0aGlzLmluaXRWaWV3KCk7XHJcbiAgICB9XHJcbiAgICBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLmlkID0gdGhpcy5nYW1lRGF0YS5pZDtcclxuICAgICAgICB0aGlzLnN0YXR1cyA9IHRoaXMuZ2FtZURhdGEuc3RhdHVzO1xyXG4gICAgICAgIHRoaXMubGFiZWwxLnN0cmluZyA9IFwi6Zeu6aKYXCIrdGhpcy5nYW1lRGF0YS5wcm9ibGVtX2lkO1xyXG4gICAgICAgIGxldCBwcm9ibGVtOnN0cmluZyA9IHRoaXMuZ2FtZURhdGEucHJvYmxlbTtcclxuICAgICAgICBsZXQgcHJvYiA9IHByb2JsZW0uc3BsaXQoXCJcXG5cIik7XHJcbiAgICAgICAgaWYocHJvYi5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWwyLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LnN1YnN0ckVuZFdpdGhFbGxpKHByb2JbMF0sMjQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsMi5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5zdWJzdHJFbmRXaXRoRWxsaShwcm9ibGVtLDI0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hbnN3ZXIgPSB0aGlzLmdhbWVEYXRhLmFuc3dlcjtcclxuICAgICAgICAvKiB0aGlzLkJhY2tncm91bmRUeHQuc3RyaW5nID0gIHRoaXMuZ2FtZURhdGE7XHJcbiAgICAgICAgdGhpcy5DaGVja1R4dC5zdHJpbmcgPSB0aGlzLmdhbWVEYXRhO1xyXG4gICAgICAgIHRoaXMudG9nZ2xlLmlzQ2hlY2tlZCA9ZmFsc2VcclxuICAgICAgICB0aGlzLnRvZ2dsZS51bmNoZWNrKCkgKi9cclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVJdGVtQnlJRCgpe1xyXG4gICAgICAgIC8vIGxldCBpZCA9XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgICAgIHZhciBwYXJhPXtcclxuICAgICAgICAgICAgdHlwZTogMSAsLy8wIOaPkOS6pCAx5Yig6ZmkXHJcblx0IFx0ICAgIHByb2JsZW06IFwiXCIgLC8v6Zeu6aKYIDDnmoTml7blgJlcclxuICAgICBcdCAgICBpZDogdGhpcy5pZCAgLy8x55qE5pe25YCZXHJcbiAgICAgICAgfTtcclxuICAgICAgICBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiRmVlZGJhY2tNb2RlbFwiKS5kZWFsRmVlZGJhY2socGFyYSx0aGlzLmRlYWxwYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuUmVwbGF5RGV0YWlsKCl7XHJcbiAgICAgICAgLy8gdGhpcy5pZFxyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICBsZXQgcmlnaHRQYW5lbFZpZXcgPSA8UmlnaHRQYW5lbFZpZXc+R2xvYmFsLlVJLmdldFdpbmRvdyhcIlduZEZlZWRiYWNrXCIpLmdldFZpZXcoXCJSaWdodFBhbmVsVmlld1wiKTtcclxuICAgICAgICBsZXQgcmVwbGF5OkZlZWRiYWNrU2hvd0FuZFdyaXRlVmlldyA9IDxGZWVkYmFja1Nob3dBbmRXcml0ZVZpZXc+cmlnaHRQYW5lbFZpZXcuZ2V0VmlldyhcImZlZWRiYWNrU2hvd0FuZFdyaXRlXCIpO1xyXG4gICAgICAgIHJlcGxheS5zZXRTaG93T3JFZGl0KDEpO1xyXG4gICAgICAgIHJlcGxheS5zZXREYXRhKHRoaXMuZ2FtZURhdGEucHJvYmxlbSx0aGlzLmFuc3dlcik7XHJcbiAgICAgICAgcmlnaHRQYW5lbFZpZXcuY2hhbmdlVmlldyhSaWdodFZpZXdUeXBlLmZlZWRiYWNrU2hvd0FuZFdyaXRlKTtcclxuICAgIH1cclxuICAgIC8qIHB1YmxpYyBTZXRCYWNrZ3JvdW5kQ2hlY2tlZChzdGF0ZTpib29sZWFuKXtcclxuICAgICAgICB0aGlzLkNoZWNrU3ByaXRlLm5vZGUuYWN0aXZlID0gc3RhdGVcclxuICAgICAgICB0aGlzLlVuQ2hlY2tTcHJpdGUubm9kZS5hY3RpdmUgPSAhc3RhdGVcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBTZXRVblJlYWRBY3RpdmVTdGF0ZShzdGF0ZTpib29sZWFuKXtcclxuICAgICAgICB0aGlzLlVucmVhZC5ub2RlLmFjdGl2ZSA9IHN0YXRlXHJcbiAgICB9ICovXHJcbn1cclxuIl19