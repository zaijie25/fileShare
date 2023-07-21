"use strict";
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