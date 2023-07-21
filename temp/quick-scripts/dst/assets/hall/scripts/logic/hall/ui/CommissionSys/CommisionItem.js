
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/CommissionSys/CommisionItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2f05c+Js99OkJIpCFBg667/', 'CommisionItem');
// hall/scripts/logic/hall/ui/CommissionSys/CommisionItem.ts

"use strict";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
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
var CommisionModel_1 = require("../../../hallcommon/model/CommisionModel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CommisionItem = /** @class */ (function (_super) {
    __extends(CommisionItem, _super);
    function CommisionItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnArrary = [];
        _this.awardLable = null;
        _this.progress = null;
        _this.commisionName = null;
        _this.commisionDescribe = null;
        _this.progressLabel = null;
        _this.getAwardBtn = null;
        _this.data = null;
        _this.model = null;
        _this.global_task_type = -1;
        return _this;
    }
    CommisionItem.prototype.onLoad = function () {
        Global.UIHelper.addCommonClick(this.node, "getAward", this.onGetAwardBtnClicked, this);
        this.model = Global.ModelManager.getModel("CommisionModel");
        this.model.on(CommisionModel_1.default.GetCommisionAward, this, this.onGetAward);
    };
    CommisionItem.prototype.onGetAward = function (data) {
        if (!data || !data.task_reward)
            return;
        if (data.global_task_type == this.global_task_type && this.data.task_id == data.task_id) {
            Global.UI.show("WndRebateGet", data.task_reward);
            // Global.UI.show("WndCongratulationGet",data.task_reward);
            this.data.task_status = 2;
            this.UpdateUI(this.data, this.global_task_type);
        }
    };
    CommisionItem.prototype.onDestroy = function () {
        this.model.off(CommisionModel_1.default.GetCommisionAward, this, this.onGetAward);
    };
    CommisionItem.prototype.onGetAwardBtnClicked = function (target) {
        if (!this.data) {
            return;
        }
        this.model.reqGetCommisionAward(this.global_task_type, this.data.task_id);
    };
    /**
     * name
     */
    CommisionItem.prototype.UpdateUI = function (data, type) {
        if (!data || !cc.isValid(this.node))
            return;
        this.data = data;
        this.global_task_type = type;
        if (this.btnArrary) {
            this.btnArrary[0].active = data.task_status == 0;
            this.btnArrary[1].active = data.task_status == 1;
            this.btnArrary[2].active = data.task_status == 2;
        }
        if (this.getAwardBtn) {
            var btn = this.getAwardBtn.getComponent(cc.Button);
            if (btn) {
                btn.interactable = data.task_status == 1;
            }
        }
        if (this.awardLable) {
            this.awardLable.string = Global.Toolkit.formatPointStr(data.task_reward);
        }
        if (this.progress) {
            this.progress.progress = data.task_num != 0 ? (data.task_self_num / data.task_num) : 0;
        }
        if (this.progressLabel) {
            this.progressLabel.string = cc.js.formatStr("%s/%s", data.task_self_num, data.task_num);
        }
        if (this.commisionName) {
            this.commisionName.string = data.name;
        }
        if (this.commisionDescribe) {
            this.commisionDescribe.string = data.task_desc;
        }
    };
    __decorate([
        property([cc.Node])
    ], CommisionItem.prototype, "btnArrary", void 0);
    __decorate([
        property(cc.Label)
    ], CommisionItem.prototype, "awardLable", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], CommisionItem.prototype, "progress", void 0);
    __decorate([
        property(cc.Label)
    ], CommisionItem.prototype, "commisionName", void 0);
    __decorate([
        property(cc.Label)
    ], CommisionItem.prototype, "commisionDescribe", void 0);
    __decorate([
        property(cc.Label)
    ], CommisionItem.prototype, "progressLabel", void 0);
    __decorate([
        property(cc.Node)
    ], CommisionItem.prototype, "getAwardBtn", void 0);
    CommisionItem = __decorate([
        ccclass
    ], CommisionItem);
    return CommisionItem;
}(cc.Component));
exports.default = CommisionItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxDb21taXNzaW9uU3lzXFxDb21taXNpb25JdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsa0ZBQWtGO0FBQ2xGLHlGQUF5RjtBQUN6RixtQkFBbUI7QUFDbkIsNEZBQTRGO0FBQzVGLG1HQUFtRztBQUNuRyw4QkFBOEI7QUFDOUIsNEZBQTRGO0FBQzVGLG1HQUFtRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR25HLDJFQUFzRTtBQUdoRSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQThHQztRQTNHRyxlQUFTLEdBQWMsRUFBRSxDQUFDO1FBRzFCLGdCQUFVLEdBQWEsSUFBSSxDQUFBO1FBRzNCLGNBQVEsR0FBbUIsSUFBSSxDQUFBO1FBRy9CLG1CQUFhLEdBQWEsSUFBSSxDQUFBO1FBRzlCLHVCQUFpQixHQUFhLElBQUksQ0FBQTtRQUdsQyxtQkFBYSxHQUFhLElBQUksQ0FBQTtRQUc5QixpQkFBVyxHQUFZLElBQUksQ0FBQTtRQUUzQixVQUFJLEdBQVEsSUFBSSxDQUFBO1FBQ1IsV0FBSyxHQUFtQixJQUFJLENBQUE7UUFFNUIsc0JBQWdCLEdBQUcsQ0FBRSxDQUFDLENBQUE7O0lBb0ZsQyxDQUFDO0lBaEZHLDhCQUFNLEdBQU47UUFFRyxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUMsSUFBSSxDQUFDLENBQUE7UUFDbkYsSUFBSSxDQUFDLEtBQUssR0FBbUIsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsS0FBSyxDQUFDLEVB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Q3JCO1lBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxhQUFhLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQ3hGO1FBRUQsSUFBRyxJQUFJLENBQUMsYUFBYSxFQUNyQjtZQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7U0FDeEM7UUFFRCxJQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFDekI7WUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUE7U0FDakQ7SUFFTCxDQUFDO0lBMUdEO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO29EQUNNO0lBRzFCO1FBREMsUUFBUSxDQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUM7cURBQ087SUFHM0I7UUFEQyxRQUFRLENBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQzttREFDSztJQUcvQjtRQURDLFFBQVEsQ0FBRSxFQUFFLENBQUMsS0FBSyxDQUFDO3dEQUNVO0lBRzlCO1FBREMsUUFBUSxDQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUM7NERBQ2M7SUFHbEM7UUFEQyxRQUFRLENBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQzt3REFDVTtJQUc5QjtRQURDLFFBQVEsQ0FBRSxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNRO0lBckJWLGFBQWE7UUFEakMsT0FBTztPQUNhLGFBQWEsQ0E4R2pDO0lBQUQsb0JBQUM7Q0E5R0QsQUE4R0MsQ0E5RzBDLEVBQUUsQ0FBQyxTQUFTLEdBOEd0RDtrQkE5R29CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXHJcbi8vIExlYXJuIEF0dHJpYnV0ZTpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCBSZWNoYXJnZUdpZnRNb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9SZWNoYXJnZUdpZnRNb2RlbFwiO1xyXG5pbXBvcnQgQ29tbWlzaW9uTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvQ29tbWlzaW9uTW9kZWxcIjtcclxuaW1wb3J0IHsgU2tpblR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9hcHAvU2tpbkNvbmZpZ1wiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21taXNpb25JdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxyXG4gICAgYnRuQXJyYXJ5OiBjYy5Ob2RlW10gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkgKGNjLkxhYmVsKVxyXG4gICAgYXdhcmRMYWJsZTogY2MuTGFiZWwgPSBudWxsXHJcblxyXG4gICAgQHByb3BlcnR5IChjYy5Qcm9ncmVzc0JhcilcclxuICAgIHByb2dyZXNzOiBjYy5Qcm9ncmVzc0JhciA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkgKGNjLkxhYmVsKVxyXG4gICAgY29tbWlzaW9uTmFtZTogY2MuTGFiZWwgPSBudWxsXHJcblxyXG4gICAgQHByb3BlcnR5IChjYy5MYWJlbClcclxuICAgIGNvbW1pc2lvbkRlc2NyaWJlOiBjYy5MYWJlbCA9IG51bGxcclxuXHJcbiAgICBAcHJvcGVydHkgKGNjLkxhYmVsKVxyXG4gICAgcHJvZ3Jlc3NMYWJlbDogY2MuTGFiZWwgPSBudWxsXHJcblxyXG4gICAgQHByb3BlcnR5IChjYy5Ob2RlKVxyXG4gICAgZ2V0QXdhcmRCdG46IGNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgZGF0YSA6YW55ID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBtb2RlbDogQ29tbWlzaW9uTW9kZWwgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSBnbG9iYWxfdGFza190eXBlID0gLSAxXHJcblxyXG5cclxuXHJcbiAgICBvbkxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSxcImdldEF3YXJkXCIsdGhpcy5vbkdldEF3YXJkQnRuQ2xpY2tlZCx0aGlzKVxyXG4gICAgICAgdGhpcy5tb2RlbCA9IDxDb21taXNpb25Nb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiQ29tbWlzaW9uTW9kZWxcIik7XHJcbiAgICAgICB0aGlzLm1vZGVsLm9uKENvbW1pc2lvbk1vZGVsLkdldENvbW1pc2lvbkF3YXJkLCB0aGlzLHRoaXMub25HZXRBd2FyZCk7XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBvbkdldEF3YXJkKGRhdGEpIHtcclxuICAgICAgICBpZiAoIWRhdGEgfHwgIWRhdGEudGFza19yZXdhcmQpIHJldHVyblxyXG4gICAgICAgIGlmIChkYXRhLmdsb2JhbF90YXNrX3R5cGUgPT0gdGhpcy5nbG9iYWxfdGFza190eXBlICYmIHRoaXMuZGF0YS50YXNrX2lkID09IGRhdGEudGFza19pZCkge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFJlYmF0ZUdldFwiLCBkYXRhLnRhc2tfcmV3YXJkKTtcclxuICAgICAgICAgICAgLy8gR2xvYmFsLlVJLnNob3coXCJXbmRDb25ncmF0dWxhdGlvbkdldFwiLGRhdGEudGFza19yZXdhcmQpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEudGFza19zdGF0dXMgPSAyXHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlVUkodGhpcy5kYXRhLHRoaXMuZ2xvYmFsX3Rhc2tfdHlwZSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5vZmYoQ29tbWlzaW9uTW9kZWwuR2V0Q29tbWlzaW9uQXdhcmQsIHRoaXMsdGhpcy5vbkdldEF3YXJkKTtcclxuXHJcbiAgICB9XHJcbiAgICBvbkdldEF3YXJkQnRuQ2xpY2tlZCh0YXJnZXQpIHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9kZWwucmVxR2V0Q29tbWlzaW9uQXdhcmQodGhpcy5nbG9iYWxfdGFza190eXBlLHRoaXMuZGF0YS50YXNrX2lkKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbmFtZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgVXBkYXRlVUkoZGF0YSwgdHlwZSkge1xyXG4gICAgICAgIGlmKCFkYXRhIHx8ICFjYy5pc1ZhbGlkKHRoaXMubm9kZSkpIHJldHVyblxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFcclxuICAgICAgICB0aGlzLmdsb2JhbF90YXNrX3R5cGUgPSB0eXBlXHJcbiAgICAgICAgaWYodGhpcy5idG5BcnJhcnkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJ0bkFycmFyeVswXS5hY3RpdmUgPSBkYXRhLnRhc2tfc3RhdHVzID09IDBcclxuICAgICAgICAgICAgdGhpcy5idG5BcnJhcnlbMV0uYWN0aXZlID0gZGF0YS50YXNrX3N0YXR1cyA9PSAxXHJcbiAgICAgICAgICAgIHRoaXMuYnRuQXJyYXJ5WzJdLmFjdGl2ZSA9IGRhdGEudGFza19zdGF0dXMgPT0gMlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmdldEF3YXJkQnRuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGJ0biA9IHRoaXMuZ2V0QXdhcmRCdG4uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbilcclxuICAgICAgICAgICAgaWYoYnRuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBidG4uaW50ZXJhY3RhYmxlID0gZGF0YS50YXNrX3N0YXR1cyA9PSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5hd2FyZExhYmxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hd2FyZExhYmxlLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKGRhdGEudGFza19yZXdhcmQpXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYodGhpcy5wcm9ncmVzcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3MucHJvZ3Jlc3MgPSBkYXRhLnRhc2tfbnVtICE9IDAgPyAoZGF0YS50YXNrX3NlbGZfbnVtL2RhdGEudGFza19udW0pIDogMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5wcm9ncmVzc0xhYmVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0xhYmVsLnN0cmluZyA9IGNjLmpzLmZvcm1hdFN0cihcIiVzLyVzXCIsZGF0YS50YXNrX3NlbGZfbnVtLGRhdGEudGFza19udW0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmNvbW1pc2lvbk5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNvbW1pc2lvbk5hbWUuc3RyaW5nID0gZGF0YS5uYW1lXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmNvbW1pc2lvbkRlc2NyaWJlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jb21taXNpb25EZXNjcmliZS5zdHJpbmcgPSBkYXRhLnRhc2tfZGVzY1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuIl19