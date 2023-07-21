
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/TaskComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ec1c96sytdPmZM9U3Ff5p+g', 'TaskComp');
// hall/scripts/logic/core/component/TaskComp.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Directiton;
(function (Directiton) {
    Directiton[Directiton["Left"] = -1] = "Left";
    Directiton[Directiton["Right"] = 1] = "Right";
})(Directiton || (Directiton = {}));
var TaskComp = /** @class */ (function (_super) {
    __extends(TaskComp, _super);
    function TaskComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tipsOffsetWidth = 40; // tips的宽偏移量
        return _this;
    }
    TaskComp.prototype.onLoad = function () {
        this.touchBgNode = cc.find("touchBg", this.node);
        this.touchBgNode.active = false;
        this.touchBgNode.on(cc.Node.EventType.TOUCH_END, this.onTouchBgCLick, this);
        this.touchBgNode._touchListener.setSwallowTouches(false); // 允许点击穿透
        this.taskTips = cc.find("taskTips", this.node);
        this.taskTipLbl = cc.find("taskTips/taskTipLbl", this.node).getComponent(cc.Label);
        this.taskTips.active = false;
        this.showNode = cc.find("content", this.node);
        this.showNode.active = false;
        this.taskLbl = cc.find("content/taskLbl", this.node).getComponent(cc.Label);
        Global.UIHelper.addCommonClick(this.node, "content/taskBtn", this.showTipLbl, this);
        this.rawTopsPos = this.taskTips.position;
    };
    TaskComp.prototype.onTouchBgCLick = function () {
        this.closeTips();
    };
    TaskComp.prototype.closeTips = function () {
        this.taskTips.active = false;
        this.touchBgNode.active = false;
        this.unscheduleAllCallbacks();
    };
    /**
     * 初始化
     * @param dir 1向右 -1向左
     */
    TaskComp.prototype.initTask = function (dir) {
        if (dir == Directiton.Left) {
            this.taskTips.setPosition(cc.v3(-this.rawTopsPos.x, this.rawTopsPos.y));
            this.taskTips.scaleX = 1;
            this.taskTipLbl.node.scaleX = 1;
            this.taskTipLbl.node.anchorX = 1;
        }
        else if (dir == Directiton.Right) {
            this.taskTips.setPosition(cc.v3(this.rawTopsPos.x, this.rawTopsPos.y));
            this.taskTips.scaleX = -1;
            this.taskTipLbl.node.scaleX = -1;
            this.taskTipLbl.node.anchorX = 0;
        }
    };
    // 显示任务的信息
    TaskComp.prototype.showTipLbl = function () {
        var _this = this;
        this.taskTips.active = true;
        this.touchBgNode.active = true;
        this.setTipsWidth();
        this.unscheduleAllCallbacks();
        this.scheduleOnce(function () {
            _this.closeTips();
        }, 5);
        if (this.isTargetFinish) {
            var str = "请前往财神到页面领取奖励！";
            Global.UI.fastTip(str);
        }
    };
    TaskComp.prototype.onDisable = function () {
        this.unscheduleAllCallbacks();
    };
    TaskComp.prototype.updateTask = function (data) {
        this.taskTipLbl.string = "任务说明:" + data.task_desc;
        this.taskLbl.string = data.task_self_num + "/" + data.task_num;
        if (data.task_status != 2) { // 2已领取
            this.showContent(true);
        }
        else {
            this.showContent(false);
        }
        if (data.task_self_num == data.task_num && data.task_num > 0 || data.task_status == 1) { // 1已完成未领取
            this.isTargetFinish = true;
        }
        else
            this.isTargetFinish = false;
    };
    TaskComp.prototype.showContent = function (flag) {
        this.showNode.active = flag;
    };
    TaskComp.prototype.setTipsWidth = function () {
        var lblWidth = this.taskTipLbl.node.width;
        this.taskTips.width = lblWidth + this.tipsOffsetWidth;
    };
    TaskComp = __decorate([
        ccclass
    ], TaskComp);
    return TaskComp;
}(cc.Component));
exports.default = TaskComp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcVGFza0NvbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBSyxVQUdKO0FBSEQsV0FBSyxVQUFVO0lBQ1gsNENBQVMsQ0FBQTtJQUNULDZDQUFTLENBQUE7QUFDYixDQUFDLEVBSEksVUFBVSxLQUFWLFVBQVUsUUFHZDtBQUdEO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBb0dDO1FBL0ZvQixxQkFBZSxHQUFXLEVBQUUsQ0FBQyxDQUFNLFlBQVk7O0lBK0ZwRSxDQUFDO0lBMUZhLHlCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQVEsU0FBUztRQUUxRSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDN0MsQ0FBQztJQUVPLGlDQUFjLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTyw0QkFBUyxHQUFqQjtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDJCQUFRLEdBQWYsVUFBZ0IsR0FBVztRQUN2QixJQUFJLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztTQUNwQzthQUNJLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxLQUFLLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRUQsVUFBVTtJQUNGLDZCQUFVLEdBQWxCO1FBQUEsaUJBY0M7UUFiRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2QsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVOLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBQztZQUNwQixJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUM7WUFDMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRVMsNEJBQVMsR0FBbkI7UUFDSSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRU0sNkJBQVUsR0FBakIsVUFBa0IsSUFBUztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBTSxJQUFJLENBQUMsYUFBYSxTQUFJLElBQUksQ0FBQyxRQUFVLENBQUM7UUFDL0QsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsRUFBRSxFQUFTLE9BQU87WUFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQjthQUNHO1lBQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQjtRQUNELElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxFQUFDLEVBQU0sVUFBVTtZQUNsRyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM5Qjs7WUFFRyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUNwQyxDQUFDO0lBRU0sOEJBQVcsR0FBbEIsVUFBbUIsSUFBYTtRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDaEMsQ0FBQztJQUVPLCtCQUFZLEdBQXBCO1FBQ0ksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzFELENBQUM7SUFuR2dCLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FvRzVCO0lBQUQsZUFBQztDQXBHRCxBQW9HQyxDQXBHcUMsRUFBRSxDQUFDLFNBQVMsR0FvR2pEO2tCQXBHb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5lbnVtIERpcmVjdGl0b257XHJcbiAgICBMZWZ0ID0gLTEsXHJcbiAgICBSaWdodCA9IDFcclxufVxyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza0NvbXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJpdmF0ZSB0YXNrTGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgdGFza1RpcHM6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHRhc2tUaXBMYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBzaG93Tm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdGlwc09mZnNldFdpZHRoOiBudW1iZXIgPSA0MDsgICAgICAvLyB0aXBz55qE5a695YGP56e76YePXHJcbiAgICBwcml2YXRlIHJhd1RvcHNQb3M6IGNjLlZlYzM7XHJcbiAgICBwcml2YXRlIHRvdWNoQmdOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBpc1RhcmdldEZpbmlzaDogYm9vbGVhbjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMudG91Y2hCZ05vZGUgPSBjYy5maW5kKFwidG91Y2hCZ1wiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMudG91Y2hCZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50b3VjaEJnTm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEJnQ0xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudG91Y2hCZ05vZGUuX3RvdWNoTGlzdGVuZXIuc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpOyAgICAgICAgLy8g5YWB6K6454K55Ye756m/6YCPXHJcblxyXG4gICAgICAgIHRoaXMudGFza1RpcHMgPSBjYy5maW5kKFwidGFza1RpcHNcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLnRhc2tUaXBMYmwgPSBjYy5maW5kKFwidGFza1RpcHMvdGFza1RpcExibFwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy50YXNrVGlwcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNob3dOb2RlID0gY2MuZmluZChcImNvbnRlbnRcIiwgdGhpcy5ub2RlKVxyXG4gICAgICAgIHRoaXMuc2hvd05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50YXNrTGJsID0gY2MuZmluZChcImNvbnRlbnQvdGFza0xibFwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJjb250ZW50L3Rhc2tCdG5cIiwgdGhpcy5zaG93VGlwTGJsLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnJhd1RvcHNQb3MgPSB0aGlzLnRhc2tUaXBzLnBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Ub3VjaEJnQ0xpY2soKXtcclxuICAgICAgICB0aGlzLmNsb3NlVGlwcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xvc2VUaXBzKCkge1xyXG4gICAgICAgIHRoaXMudGFza1RpcHMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50b3VjaEJnTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMllxyXG4gICAgICogQHBhcmFtIGRpciAx5ZCR5Y+zIC0x5ZCR5bemXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0VGFzayhkaXI6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChkaXIgPT0gRGlyZWN0aXRvbi5MZWZ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFza1RpcHMuc2V0UG9zaXRpb24oY2MudjMoLXRoaXMucmF3VG9wc1Bvcy54LCB0aGlzLnJhd1RvcHNQb3MueSkpO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tUaXBzLnNjYWxlWCA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMudGFza1RpcExibC5ub2RlLnNjYWxlWCA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMudGFza1RpcExibC5ub2RlLmFuY2hvclggPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkaXIgPT0gRGlyZWN0aXRvbi5SaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tUaXBzLnNldFBvc2l0aW9uKGNjLnYzKHRoaXMucmF3VG9wc1Bvcy54LCB0aGlzLnJhd1RvcHNQb3MueSkpO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tUaXBzLnNjYWxlWCA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tUaXBMYmwubm9kZS5zY2FsZVggPSAtMTtcclxuICAgICAgICAgICAgdGhpcy50YXNrVGlwTGJsLm5vZGUuYW5jaG9yWCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOaYvuekuuS7u+WKoeeahOS/oeaBr1xyXG4gICAgcHJpdmF0ZSBzaG93VGlwTGJsKCkge1xyXG4gICAgICAgIHRoaXMudGFza1RpcHMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRvdWNoQmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZXRUaXBzV2lkdGgoKTtcclxuXHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlVGlwcygpO1xyXG4gICAgICAgIH0sIDUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmlzVGFyZ2V0RmluaXNoKXtcclxuICAgICAgICAgICAgbGV0IHN0ciA9IFwi6K+35YmN5b6A6LSi56We5Yiw6aG16Z2i6aKG5Y+W5aWW5Yqx77yBXCI7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKHN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKXtcclxuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlVGFzayhkYXRhOiBhbnkpe1xyXG4gICAgICAgIHRoaXMudGFza1RpcExibC5zdHJpbmcgPSBcIuS7u+WKoeivtOaYjjpcIiArIGRhdGEudGFza19kZXNjO1xyXG4gICAgICAgIHRoaXMudGFza0xibC5zdHJpbmcgPSBgJHtkYXRhLnRhc2tfc2VsZl9udW19LyR7ZGF0YS50YXNrX251bX1gO1xyXG4gICAgICAgIGlmIChkYXRhLnRhc2tfc3RhdHVzICE9IDIpIHsgICAgICAgIC8vIDLlt7Lpooblj5ZcclxuICAgICAgICAgICAgdGhpcy5zaG93Q29udGVudCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q29udGVudChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhLnRhc2tfc2VsZl9udW0gPT0gZGF0YS50YXNrX251bSAmJiBkYXRhLnRhc2tfbnVtID4gMCB8fCBkYXRhLnRhc2tfc3RhdHVzID09IDEpeyAgICAgLy8gMeW3suWujOaIkOacqumihuWPllxyXG4gICAgICAgICAgICB0aGlzLmlzVGFyZ2V0RmluaXNoID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmlzVGFyZ2V0RmluaXNoID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dDb250ZW50KGZsYWc6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuc2hvd05vZGUuYWN0aXZlID0gZmxhZztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFRpcHNXaWR0aCgpIHtcclxuICAgICAgICBsZXQgbGJsV2lkdGggPSB0aGlzLnRhc2tUaXBMYmwubm9kZS53aWR0aDtcclxuICAgICAgICB0aGlzLnRhc2tUaXBzLndpZHRoID0gbGJsV2lkdGggKyB0aGlzLnRpcHNPZmZzZXRXaWR0aDtcclxuICAgIH1cclxufSJdfQ==