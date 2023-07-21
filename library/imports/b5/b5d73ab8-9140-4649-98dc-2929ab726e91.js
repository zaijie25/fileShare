"use strict";
cc._RF.push(module, 'b5d73q4kUBGSZjcKSmrcm6R', 'IntoGameAnimComp');
// hall/scripts/logic/core/component/IntoGameAnimComp.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**进入子游戏时场景过渡动画组件 */
var IntoGameAnimComp = /** @class */ (function (_super) {
    __extends(IntoGameAnimComp, _super);
    function IntoGameAnimComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bottomNodeYArr = [];
        _this.topNodeYArr = [];
        _this.leftNodeXArr = [];
        _this.rightNodeXArr = [];
        _this.middleNodeXArr = [];
        _this.bottomObjArr = [];
        _this.topObjArr = [];
        _this.leftObjArr = [];
        _this.rightObjArr = [];
        _this.middleObjArr = [];
        _this.bottomOffset = cc.v2(0, -200);
        _this.topOffset = cc.v2(0, 300);
        _this.leftOffset = cc.v2(-300, 0);
        _this.rightOffset = cc.v2(300, 0);
        _this.middleOffset = cc.v2(1560, 0);
        //是否已执行过动画（进入场景后此动画只执行一次，后续任何情况都不再执行，除非重新进入场景）
        _this.bInit = false;
        return _this;
    }
    ;
    IntoGameAnimComp.prototype.init = function (needAlways) {
        if (this.bInit && !needAlways) {
            return;
        }
        this.bInit = true;
        if (!this.bottomNodeArr) {
            this.bottomNodeArr = [];
        }
        for (var i = 0; i < this.bottomNodeArr.length; i++) {
            var node = this.bottomNodeArr[i];
            this.bottomNodeYArr[i] = node.y;
            node.y -= 200;
        }
        if (!this.topNodeArr) {
            this.topNodeArr = [];
        }
        for (var i = 0; i < this.topNodeArr.length; i++) {
            var node = this.topNodeArr[i];
            this.topNodeYArr[i] = node.y;
            node.y += 300;
        }
        if (!this.leftNodeArr) {
            this.leftNodeArr = [];
        }
        for (var i = 0; i < this.leftNodeArr.length; i++) {
            var node = this.leftNodeArr[i];
            this.leftNodeXArr[i] = node.x;
            node.x -= 300;
        }
        if (!this.rightNodeArr) {
            this.rightNodeArr = [];
        }
        for (var i = 0; i < this.rightNodeArr.length; i++) {
            var node = this.rightNodeArr[i];
            this.rightNodeXArr[i] = node.x;
            node.x += 300;
        }
        if (!this.middleNodeArr) {
            this.middleNodeArr = [];
        }
        for (var i = 0; i < this.middleNodeArr.length; i++) {
            var node = this.middleNodeArr[i];
            this.middleNodeXArr[i] = node.x;
            node.x += 1560;
        }
        this.node.opacity = 1; //不能设为0，否则透明度为0的情况下触发点击事件会无法冒泡
    };
    IntoGameAnimComp.prototype.forceInit = function () {
        this.bInit = false;
        this.init();
    };
    //开始动画
    IntoGameAnimComp.prototype.startAnimation = function () {
        this.danchu();
    };
    //淡出
    IntoGameAnimComp.prototype.danchu = function () {
        var _this = this;
        if (this.loadingNode) {
            var ac1 = cc.fadeOut(0.5);
            var cf1 = cc.callFunc(function () {
                _this.loadingNode.active = false;
                // this.loadingNode.destroy();
                // this.loadingNode = null;
                _this.danru();
            }, this);
            this.loadingNode.runAction(cc.sequence(ac1, cf1));
        }
        else {
            this.danru();
        }
    };
    //淡入
    IntoGameAnimComp.prototype.danru = function () {
        var _this = this;
        var ac2 = cc.fadeIn(0.5);
        var cf2 = cc.callFunc(function () {
            _this.nodesAnimation();
        }, this);
        this.node.runAction(cc.sequence(ac2, cf2));
    };
    /**
     *
     * @param timeScale 总时间 //不精准 移动延时暂不记
     * @param delay     开始延时
     * @param finishCal
     * @param target
     */
    IntoGameAnimComp.prototype.startAnimtionByMask = function (timeScale, delay, finishCal, target) {
        var _this = this;
        if (timeScale === void 0) { timeScale = 1; }
        if (delay === void 0) { delay = 0; }
        var danchuTime = 0.25 * timeScale;
        var danruTime = 0.25 * timeScale;
        var assembleTime = 0.5 * timeScale;
        if ((this.leftNodeArr.length + this.bottomNodeArr.length + this.rightNodeArr.length + this.topNodeArr.length + this.middleNodeArr.length) == 0) {
            assembleTime = 0;
        }
        if (this.loadingNode && this.maskNode) {
            Global.Component.scheduleOnce(function () {
                _this.danchuByMask(danchuTime);
            }, delay);
            Global.Component.scheduleOnce(function () {
                _this.loadingNode.active = false;
                _this.danruByMask(danruTime);
            }, delay + danchuTime);
            Global.Component.scheduleOnce(function () {
                _this.nodesAnimation(assembleTime);
            }, delay + danchuTime + danruTime);
            Global.Component.scheduleOnce(function () {
                _this.maskNode.active = false; // 遮罩防止动画过程中操作 debug action队列中调用时机不对
                if (finishCal && target) {
                    finishCal.call(target);
                }
            }, delay + danchuTime + danruTime + assembleTime);
        }
        else {
            this.loadingNode.active = false;
            this.maskNode.active = false;
            this.node.active = true;
        }
    };
    IntoGameAnimComp.prototype.danchuByMask = function (time) {
        this.maskNode.active = true;
        this.maskNode.opacity = 1;
        var ac1 = cc.fadeTo(time, 200);
        this.maskNode.runAction(ac1);
    };
    IntoGameAnimComp.prototype.danruByMask = function (time) {
        this.node.opacity = 255;
        var ac2 = cc.fadeTo(time, 1);
        this.maskNode.runAction(ac2);
    };
    //游戏内节点动画
    IntoGameAnimComp.prototype.nodesAnimation = function (time) {
        if (time === void 0) { time = 0.5; }
        if (time < 0.2) {
            time = 0.2; // 防错
        }
        var delayTime = 0;
        for (var i = 0; i < this.bottomNodeArr.length; i++) {
            var node = this.bottomNodeArr[i];
            var x = node.x;
            var y = this.bottomNodeYArr[i];
            var tween = new cc.Tween(node); //Game.Tween.get(node);
            tween.delay(delayTime).to(time, { position: new cc.Vec2(x, y) }, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
        delayTime = 0;
        for (var i = 0; i < this.topNodeArr.length; i++) {
            var node = this.topNodeArr[i];
            var x = node.x;
            var y = this.topNodeYArr[i];
            var tween = new cc.Tween(node);
            tween.delay(delayTime).to(time - 0.2, { position: new cc.Vec2(x, y) }, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
        delayTime = 0;
        for (var i = 0; i < this.leftNodeArr.length; i++) {
            var node = this.leftNodeArr[i];
            var x = this.leftNodeXArr[i];
            var y = node.y;
            var tween = new cc.Tween(node);
            tween.delay(delayTime).to(time - 0.1, { position: new cc.Vec2(x, y) }, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
        delayTime = 0;
        for (var i = 0; i < this.rightNodeArr.length; i++) {
            var node = this.rightNodeArr[i];
            var x = this.rightNodeXArr[i];
            var y = node.y;
            var tween = new cc.Tween(node);
            tween.delay(delayTime).to(time - 0.1, { position: new cc.Vec2(x, y) }, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
        delayTime = 0;
        for (var i = 0; i < this.middleNodeArr.length; i++) {
            var node = this.middleNodeArr[i];
            var x = this.middleNodeXArr[i];
            var y = node.y;
            var tween = new cc.Tween(node);
            tween.delay(delayTime).to(time - 0.1, { position: new cc.Vec2(x, y) }, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
    };
    /**
     * 新的动画配置 灵活设置单个偏移
     * {node: cc.node, offset: cc.vec2}
     * {node: this.menu, offset: cc.v2(0, 200)} 从上往下移动 offset y=+200
     * offset可以不传，走默认偏移
     */
    IntoGameAnimComp.prototype.felxInit = function () {
        if (this.bInit) {
            return;
        }
        this.bInit = true;
        if (!this.bottomObjArr) {
            this.bottomObjArr = [];
        }
        for (var i = 0; i < this.bottomObjArr.length; i++) {
            var node = this.bottomObjArr[i].node;
            var offset = this.bottomObjArr[i].offset || this.bottomOffset;
            node.y += offset.y;
        }
        if (!this.topObjArr) {
            this.topObjArr = [];
        }
        for (var i = 0; i < this.topObjArr.length; i++) {
            var node = this.topObjArr[i].node;
            var offset = this.topObjArr[i].offset || this.topOffset;
            node.y += offset.y;
        }
        if (!this.leftObjArr) {
            this.leftObjArr = [];
        }
        for (var i = 0; i < this.leftObjArr.length; i++) {
            var node = this.leftObjArr[i].node;
            var offset = this.leftObjArr[i].offset || this.leftOffset;
            node.x += offset.x;
        }
        if (!this.rightObjArr) {
            this.rightObjArr = [];
        }
        for (var i = 0; i < this.rightObjArr.length; i++) {
            var node = this.rightObjArr[i].node;
            var offset = this.rightObjArr[i].offset || this.rightOffset;
            node.x += offset.x;
        }
        if (!this.middleObjArr) {
            this.middleObjArr = [];
        }
        for (var i = 0; i < this.middleObjArr.length; i++) {
            var node = this.middleObjArr[i].node;
            var offset = this.middleObjArr[i].offset || this.middleOffset;
            node.x += offset.x;
        }
        this.node.opacity = 1; //不能设为0，否则透明度为0的情况下触发点击事件会无法冒泡
    };
    /**
     *
     * @param timeScale 总时间 //不精准 移动延时暂不记
     * @param delay     开始延时
     * @param finishCal
     * @param target
     */
    IntoGameAnimComp.prototype.startFlexAnimtionByMask = function (timeScale, delay, finishCal, target) {
        var _this = this;
        if (timeScale === void 0) { timeScale = 2; }
        if (delay === void 0) { delay = 0; }
        var danchuTime = 0.25 * timeScale;
        var danruTime = 0.25 * timeScale;
        var assembleTime = 0.5 * timeScale;
        if (this.getMoveCount() == 0) {
            assembleTime = 0;
        }
        if (this.loadingNode && this.maskNode) {
            Global.Component.scheduleOnce(function () {
                _this.flexDanchuByMask(danchuTime);
            }, delay);
            Global.Component.scheduleOnce(function () {
                _this.loadingNode.active = false;
                _this.flexDanruByMask(danruTime);
            }, delay + danchuTime);
            Global.Component.scheduleOnce(function () {
                _this.flexNodesAnimation(assembleTime);
            }, delay + danchuTime + danruTime);
            Global.Component.scheduleOnce(function () {
                _this.maskNode.active = false; // 遮罩防止动画过程中操作 debug action队列中调用时机不对
                if (finishCal && target) {
                    finishCal.call(target);
                }
            }, delay + danchuTime + danruTime + assembleTime);
        }
        else {
            this.loadingNode.active = false;
            this.maskNode.active = false;
            this.node.active = true;
        }
    };
    IntoGameAnimComp.prototype.flexDanchuByMask = function (time) {
        this.maskNode.active = true;
        this.maskNode.opacity = 1;
        var ac1 = cc.fadeTo(time, 200);
        this.maskNode.runAction(ac1);
    };
    IntoGameAnimComp.prototype.flexDanruByMask = function (time) {
        this.node.opacity = 255;
        var ac2 = cc.fadeTo(time, 1);
        this.maskNode.runAction(ac2);
    };
    IntoGameAnimComp.prototype.flexNodesAnimation = function (time) {
        if (time === void 0) { time = 0.5; }
        if (time < 0.2) {
            time = 0.2; // 防错
        }
        var delayTime = 0;
        for (var i = 0; i < this.bottomObjArr.length; i++) {
            var node = this.bottomObjArr[i].node;
            var offset = this.bottomObjArr[i].offset || this.bottomOffset;
            var tween = new cc.Tween(node);
            tween.delay(delayTime).by(time, { position: offset.mul(-1) }, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
        delayTime = 0;
        for (var i = 0; i < this.topObjArr.length; i++) {
            var node = this.topObjArr[i].node;
            var offset = this.topObjArr[i].offset || this.topOffset;
            var tween = new cc.Tween(node);
            tween.delay(delayTime).by(time - 0.2, { position: offset.mul(-1) }, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
        delayTime = 0;
        for (var i = 0; i < this.leftObjArr.length; i++) {
            var node = this.leftObjArr[i].node;
            var offset = this.leftObjArr[i].offset || this.leftOffset;
            var tween = new cc.Tween(node);
            tween.delay(delayTime).by(time - 0.1, { position: offset.mul(-1) }, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
        delayTime = 0;
        for (var i = 0; i < this.rightObjArr.length; i++) {
            var node = this.rightObjArr[i].node;
            var offset = this.rightObjArr[i].offset || this.rightOffset;
            var tween = new cc.Tween(node);
            tween.delay(delayTime).by(time - 0.1, { position: offset.mul(-1) }, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
        delayTime = 0;
        for (var i = 0; i < this.middleObjArr.length; i++) {
            var node = this.middleObjArr[i].node;
            var offset = this.middleObjArr[i].offset || this.middleOffset;
            var tween = new cc.Tween(node);
            tween.delay(delayTime).by(time - 0.1, { position: offset.mul(-1) }, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
    };
    IntoGameAnimComp.prototype.getMaxMoveDelay = function () {
        return (Math.max(this.bottomObjArr.length, this.topObjArr.length, this.leftObjArr.length, this.rightObjArr.length, this.middleObjArr.length, 1) - 1) * 0.1;
    };
    IntoGameAnimComp.prototype.getMoveCount = function () {
        return this.bottomObjArr.length + this.topObjArr.length + this.leftObjArr.length + this.rightObjArr.length + this.middleObjArr.length;
    };
    IntoGameAnimComp = __decorate([
        ccclass
    ], IntoGameAnimComp);
    return IntoGameAnimComp;
}(cc.Component));
exports.default = IntoGameAnimComp;

cc._RF.pop();