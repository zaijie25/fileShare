
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/CashBack/WndDailyCashBackUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e28c61SyGtLFoNmyjAiFDY0', 'WndDailyCashBackUI');
// hall/scripts/logic/hall/ui/CashBack/WndDailyCashBackUI.ts

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
var PoolBase_1 = require("../../../core/tool/PoolBase");
var CashBackEvent_1 = require("./CashBackEvent");
var YXButton_1 = require("../../../core/component/YXButton");
var SkinConfig_1 = require("../../../hallcommon/app/SkinConfig");
var AppCfg_1 = require("../../AppCfg");
var WndDailyCashBackUI = /** @class */ (function (_super) {
    __extends(WndDailyCashBackUI, _super);
    function WndDailyCashBackUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.awardId = ""; //领取奖励id
        return _this;
    }
    WndDailyCashBackUI.prototype.onInit = function () {
        this.isNeedDelay = true;
        this.name = "WndDailyCashBackUI";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/CashBack/DailyCashBackUI";
    };
    WndDailyCashBackUI.prototype.initView = function () {
        this.copyItem = this.getChild("scrollview/view/content/item");
        this.copyItem.active = false;
        this.contentNode = this.getChild("scrollview/view/content");
        this.myDailyCash = this.getComponent("myDailyCash", cc.Label);
        this.dayNum = this.getComponent("dayNum", cc.Label);
        this.awardNumLabel = this.getComponent("awardNum/awardNumLabel", cc.Label);
        this.initItemPool();
        this.addCommonClick("getAwardBtn", this.getAward, this);
        this.addCommonClick('close', this.close, this);
        this.awardBtn = this.getChild("getAwardBtn");
        this.setAwardBtnState(false);
        this.CashBackModel = Global.ModelManager.getModel("CashBackModel");
        this.CashBackModel.on(CashBackEvent_1.CashBackEvent.GetActivityCfg, this, this.DescriptionDay);
        this.CashBackModel.on(CashBackEvent_1.CashBackEvent.GetDayFlowBackAll, this, this.GetAwardResq);
    };
    WndDailyCashBackUI.prototype.setAwardBtnState = function (canget) {
        var btn = this.awardBtn.getComponent(YXButton_1.default);
        var btnEffect = this.getChild("getAwardBtn/effect");
        btnEffect.active = canget;
        if (btn) {
            Global.UIHelper.setNodeGray(btn.node, !canget, 150, true);
            btn.interactable = canget;
        }
    };
    WndDailyCashBackUI.prototype.getAward = function () {
        if (this.awardId == "") {
            Global.UI.fastTip("暂无奖励可以领取");
            return;
        }
        this.CashBackModel.GetDayFlowBack(this.awardId);
    };
    WndDailyCashBackUI.prototype.GetAwardResq = function (data) {
        if (!data || !data.get_point)
            return;
        Global.UI.show("WndRebateGet", data.get_point, 6);
        this.awardNumLabel.string = cc.js.formatStr("%s", Global.Toolkit.formatPointStr(0, true));
        this.setAwardBtnState(false);
    };
    WndDailyCashBackUI.prototype.DescriptionDay = function (data) {
        this.OnDataPrepared();
        this.contentNode.removeAllChildren();
        if (data == null) {
            return;
        }
        for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].atype === 7) {
                this.refreshCfg(data.data[i].cfg);
                break;
            }
        }
    };
    WndDailyCashBackUI.prototype.refreshCfg = function (data) {
        if (!data)
            return;
        var arr = data.cfg || [];
        var dayCount = data.read_day || 0;
        var awardNum = data.day_un_read_point || 0;
        var dayFlow = data.day_flow || 0;
        this.awardId = data.read_id || "";
        this.nodeList = [];
        for (var j = 0; j < arr.length; j++) {
            var node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            node.getComponent("CashBackDescription").Init(arr[j]);
        }
        this.myDailyCash.string = Global.Toolkit.formatPointStr(dayFlow);
        this.awardNumLabel.string = cc.js.formatStr("%s", Global.Toolkit.formatPointStr(awardNum, false));
        if (AppCfg_1.default.SKIN_TYPE == SkinConfig_1.SkinType.green) {
            this.dayNum.string = dayCount + "天";
        }
        else {
            this.dayNum.string = dayCount;
        }
        this.setAwardBtnState(this.awardId != "");
    };
    WndDailyCashBackUI.prototype.initItemPool = function () {
        this.itemPool = new ItemPool(this.copyItem);
    };
    WndDailyCashBackUI.prototype.onOpen = function (args) {
        this.CashBackModel.GetActivityCfg();
    };
    WndDailyCashBackUI.prototype.onDispose = function () {
        this.CashBackModel.off(CashBackEvent_1.CashBackEvent.GetActivityCfg, this, this.DescriptionDay);
        this.CashBackModel.off(CashBackEvent_1.CashBackEvent.GetDayFlowBackAll, this, this.GetAwardResq);
    };
    return WndDailyCashBackUI;
}(WndBase_1.default));
exports.default = WndDailyCashBackUI;
var ItemPool = /** @class */ (function (_super) {
    __extends(ItemPool, _super);
    function ItemPool(copyNode) {
        var _this = _super.call(this) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    ItemPool.prototype.createItem = function () {
        return cc.instantiate(this.copyNode);
    };
    ItemPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    return ItemPool;
}(PoolBase_1.default));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxDYXNoQmFja1xcV25kRGFpbHlDYXNoQmFja1VJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUErQztBQUMvQyx3REFBbUQ7QUFDbkQsaURBQWdEO0FBQ2hELDZEQUF3RDtBQUV4RCxpRUFBOEQ7QUFDOUQsdUNBQWtDO0FBRWxDO0lBQWdELHNDQUFPO0lBQXZEO1FBQUEscUVBa0hDO1FBeEdHLGFBQU8sR0FBWSxFQUFFLENBQUMsQ0FBTSxRQUFROztJQXdHeEMsQ0FBQztJQXJHYSxtQ0FBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsb0JBQW9CLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLDBDQUEwQyxDQUFDO0lBQzlELENBQUM7SUFFUyxxQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO1FBQzdELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsQ0FBQTtRQUMzRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZ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Uzs7SUFFckMsQ0FBQztJQUVTLDZCQUFVLEdBQXBCO1FBQ0ksT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRVMsNEJBQVMsR0FBbkIsVUFBb0IsSUFBYTtRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FiQSxBQWFDLENBYnNCLGtCQUFRLEdBYTlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5pbXBvcnQgUG9vbEJhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdG9vbC9Qb29sQmFzZVwiO1xyXG5pbXBvcnQgeyBDYXNoQmFja0V2ZW50IH0gZnJvbSBcIi4vQ2FzaEJhY2tFdmVudFwiO1xyXG5pbXBvcnQgWVhCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvcmUvY29tcG9uZW50L1lYQnV0dG9uXCI7XHJcbmltcG9ydCBDYXNoQmFja01vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0Nhc2hCYWNrTW9kZWxcIjtcclxuaW1wb3J0IHsgU2tpblR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9hcHAvU2tpbkNvbmZpZ1wiO1xyXG5pbXBvcnQgQXBwQ2ZnIGZyb20gXCIuLi8uLi9BcHBDZmdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZERhaWx5Q2FzaEJhY2tVSSBleHRlbmRzIFduZEJhc2V7XHJcbiAgICBDYXNoQmFja01vZGVsOiBDYXNoQmFja01vZGVsO1xyXG4gICAgY29udGVudE5vZGU6IGFueTtcclxuICAgIGNvcHlJdGVtOiBhbnk7XHJcbiAgICBpdGVtUG9vbDogSXRlbVBvb2w7XHJcbiAgICBub2RlTGlzdDogYW55W107XHJcbiAgICBteURhaWx5Q2FzaCA6IGNjLkxhYmVsOyAgICAgLy/miJHnmoTmtYHmsLRcclxuICAgIGRheU51bSA6IGNjLkxhYmVsOyAgICAgICAgICAvL+S/neeVmeWHoOWkqVxyXG4gICAgYXdhcmROdW1MYWJlbCA6IGNjLkxhYmVsOyAgIC8v57Sv56ev5aWW5YqxXHJcblxyXG4gICAgYXdhcmRJZCA6IHN0cmluZyA9IFwiXCI7ICAgICAgLy/pooblj5blpZblirFpZFxyXG4gICAgYXdhcmRCdG4gOiBjYy5Ob2RlOyAgICAgICAgIC8v6aKG5Y+W5oyJ6ZKuXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmlzTmVlZERlbGF5ID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiV25kRGFpbHlDYXNoQmFja1VJXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IEdsb2JhbC5VSS5Qb3BMYXllcjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9DYXNoQmFjay9EYWlseUNhc2hCYWNrVUlcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5jb3B5SXRlbSA9IHRoaXMuZ2V0Q2hpbGQoXCJzY3JvbGx2aWV3L3ZpZXcvY29udGVudC9pdGVtXCIpXHJcbiAgICAgICAgdGhpcy5jb3B5SXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbnRlbnROb2RlID0gdGhpcy5nZXRDaGlsZChcInNjcm9sbHZpZXcvdmlldy9jb250ZW50XCIpXHJcbiAgICAgICAgdGhpcy5teURhaWx5Q2FzaCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwibXlEYWlseUNhc2hcIixjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5kYXlOdW0gPSB0aGlzLmdldENvbXBvbmVudChcImRheU51bVwiLGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmF3YXJkTnVtTGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcImF3YXJkTnVtL2F3YXJkTnVtTGFiZWxcIixjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5pbml0SXRlbVBvb2woKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiZ2V0QXdhcmRCdG5cIiwgdGhpcy5nZXRBd2FyZCwgdGhpcylcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKCdjbG9zZScsIHRoaXMuY2xvc2UsIHRoaXMpXHJcbiAgICAgICAgdGhpcy5hd2FyZEJ0biA9IHRoaXMuZ2V0Q2hpbGQoXCJnZXRBd2FyZEJ0blwiKVxyXG4gICAgICAgIHRoaXMuc2V0QXdhcmRCdG5TdGF0ZShmYWxzZSlcclxuICAgICAgICB0aGlzLkNhc2hCYWNrTW9kZWwgPSA8Q2FzaEJhY2tNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiQ2FzaEJhY2tNb2RlbFwiKTtcclxuICAgICAgICB0aGlzLkNhc2hCYWNrTW9kZWwub24oQ2FzaEJhY2tFdmVudC5HZXRBY3Rpdml0eUNmZywgdGhpcywgdGhpcy5EZXNjcmlwdGlvbkRheSk7XHJcbiAgICAgICAgdGhpcy5DYXNoQmFja01vZGVsLm9uKENhc2hCYWNrRXZlbnQuR2V0RGF5Rmxvd0JhY2tBbGwsIHRoaXMsIHRoaXMuR2V0QXdhcmRSZXNxKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBd2FyZEJ0blN0YXRlKGNhbmdldDpib29sZWFuKXtcclxuICAgICAgICBsZXQgYnRuID0gdGhpcy5hd2FyZEJ0bi5nZXRDb21wb25lbnQoWVhCdXR0b24pXHJcbiAgICAgICAgbGV0IGJ0bkVmZmVjdCA9IHRoaXMuZ2V0Q2hpbGQoXCJnZXRBd2FyZEJ0bi9lZmZlY3RcIilcclxuICAgICAgICBidG5FZmZlY3QuYWN0aXZlID0gY2FuZ2V0XHJcbiAgICAgICAgaWYgKGJ0bikge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUlIZWxwZXIuc2V0Tm9kZUdyYXkoYnRuLm5vZGUsICFjYW5nZXQsIDE1MCwgdHJ1ZSlcclxuICAgICAgICAgICAgYnRuLmludGVyYWN0YWJsZSA9IGNhbmdldFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRBd2FyZCgpe1xyXG4gICAgICAgIGlmKHRoaXMuYXdhcmRJZCA9PSBcIlwiKXtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLmmoLml6DlpZblirHlj6/ku6Xpooblj5ZcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhc2hCYWNrTW9kZWwuR2V0RGF5Rmxvd0JhY2sodGhpcy5hd2FyZElkKVxyXG4gICAgfVxyXG5cclxuICAgIEdldEF3YXJkUmVzcShkYXRhKXtcclxuICAgICAgICBpZiAoIWRhdGEgfHwgIWRhdGEuZ2V0X3BvaW50KSByZXR1cm5cclxuICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFJlYmF0ZUdldFwiLCBkYXRhLmdldF9wb2ludCwgNik7XHJcbiAgICAgICAgdGhpcy5hd2FyZE51bUxhYmVsLnN0cmluZyA9IGNjLmpzLmZvcm1hdFN0cihcIiVzXCIsIEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKDAsIHRydWUpKTtcclxuICAgICAgICB0aGlzLnNldEF3YXJkQnRuU3RhdGUoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIERlc2NyaXB0aW9uRGF5KGRhdGEpIHtcclxuICAgICAgICB0aGlzLk9uRGF0YVByZXBhcmVkKCk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50Tm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmRhdGFbaV0uYXR5cGUgPT09IDcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENmZyhkYXRhLmRhdGFbaV0uY2ZnKVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZnJlc2hDZmcoZGF0YSl7XHJcbiAgICAgICAgaWYoIWRhdGEpIHJldHVyblxyXG4gICAgICAgIGxldCBhcnI6IEFycmF5PGFueT4gPSBkYXRhLmNmZyB8fCBbXTtcclxuICAgICAgICBsZXQgZGF5Q291bnQgPSBkYXRhLnJlYWRfZGF5IHx8IDA7XHJcbiAgICAgICAgbGV0IGF3YXJkTnVtID0gZGF0YS5kYXlfdW5fcmVhZF9wb2ludCB8fCAwO1xyXG4gICAgICAgIGxldCBkYXlGbG93ID0gZGF0YS5kYXlfZmxvdyB8fCAwO1xyXG4gICAgICAgIHRoaXMuYXdhcmRJZCA9IGRhdGEucmVhZF9pZCB8fCBcIlwiO1xyXG4gICAgICAgIHRoaXMubm9kZUxpc3QgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuaXRlbVBvb2wuZ2V0SXRlbSgpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVMaXN0LnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLmNvbnRlbnROb2RlKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJDYXNoQmFja0Rlc2NyaXB0aW9uXCIpLkluaXQoYXJyW2pdKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm15RGFpbHlDYXNoLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKGRheUZsb3cpO1xyXG4gICAgICAgIHRoaXMuYXdhcmROdW1MYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCIlc1wiLCBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihhd2FyZE51bSwgZmFsc2UpKTtcclxuICAgICAgICBpZihBcHBDZmcuU0tJTl9UWVBFID09IFNraW5UeXBlLmdyZWVuKXtcclxuICAgICAgICAgICAgdGhpcy5kYXlOdW0uc3RyaW5nID0gZGF5Q291bnQgK1wi5aSpXCI7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZGF5TnVtLnN0cmluZyA9IGRheUNvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNldEF3YXJkQnRuU3RhdGUodGhpcy5hd2FyZElkICE9IFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdEl0ZW1Qb29sKCkge1xyXG4gICAgICAgIHRoaXMuaXRlbVBvb2wgPSBuZXcgSXRlbVBvb2wodGhpcy5jb3B5SXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbihhcmdzPzogYW55W10pIHtcclxuICAgICAgICB0aGlzLkNhc2hCYWNrTW9kZWwuR2V0QWN0aXZpdHlDZmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5DYXNoQmFja01vZGVsLm9mZihDYXNoQmFja0V2ZW50LkdldEFjdGl2aXR5Q2ZnLCB0aGlzLCB0aGlzLkRlc2NyaXB0aW9uRGF5KTtcclxuICAgICAgICB0aGlzLkNhc2hCYWNrTW9kZWwub2ZmKENhc2hCYWNrRXZlbnQuR2V0RGF5Rmxvd0JhY2tBbGwsIHRoaXMsIHRoaXMuR2V0QXdhcmRSZXNxKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSXRlbVBvb2wgZXh0ZW5kcyBQb29sQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvcHlOb2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlSXRlbSgpIHtcclxuICAgICAgICByZXR1cm4gY2MuaW5zdGFudGlhdGUodGhpcy5jb3B5Tm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlc2V0SXRlbShub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBub2RlLnNldFBhcmVudChudWxsKTtcclxuICAgIH1cclxufSJdfQ==