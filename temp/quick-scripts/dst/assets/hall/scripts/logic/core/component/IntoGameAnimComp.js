
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/IntoGameAnimComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcSW50b0dhbWVBbmltQ29tcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsb0JBQW9CO0FBQ3BCLGtGQUFrRjtBQUNsRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDRGQUE0RjtBQUM1RixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDRGQUE0RjtBQUM1RixtR0FBbUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU3RixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxvQkFBb0I7QUFFcEI7SUFBOEMsb0NBQVk7SUFBMUQ7UUFBQSxxRUE4WUM7UUF4WUcsb0JBQWMsR0FBWSxFQUFFLENBQUM7UUFHN0IsaUJBQVcsR0FBWSxFQUFFLENBQUM7UUFHMUIsa0JBQVksR0FBWSxFQUFFLENBQUM7UUFHM0IsbUJBQWEsR0FBWSxFQUFFLENBQUM7UUFHNUIsb0JBQWMsR0FBWSxFQUFFLENBQUM7UUFFdEIsa0JBQVksR0FBVSxFQUFFLENBQUM7UUFDekIsZUFBUyxHQUFVLEVBQUUsQ0FBQztRQUN0QixnQkFBVSxHQUFVLEVBQUUsQ0FBQztRQUN2QixpQkFBVyxHQUFVLEVBQUUsQ0FBQztRQUN4QixrQkFBWSxHQUFVLEVBQUUsQ0FBQztRQUN4QixrQkFBWSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsZUFBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLGdCQUFVLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QixpQkFBVyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENB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QUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztZQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUMsR0FBRyxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM3RixTQUFTLElBQUksR0FBRyxDQUFDO1NBQ3BCO1FBRUQsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztZQUM1QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDNUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUMsR0FBRyxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLElB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LEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7SUFDMUksQ0FBQztJQTdZZ0IsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0E4WXBDO0lBQUQsdUJBQUM7Q0E5WUQsQUE4WUMsQ0E5WTZDLEVBQUUsQ0FBQyxTQUFTLEdBOFl6RDtrQkE5WW9CLGdCQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKui/m+WFpeWtkOa4uOaIj+aXtuWcuuaZr+i/h+a4oeWKqOeUu+e7hOS7tiAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRvR2FtZUFuaW1Db21wIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIC8vbG9hZGluZ+eUu+mdouiKgueCuVxyXG4gICAgbG9hZGluZ05vZGU6IGNjLk5vZGU7XHJcbiAgICBwdWJsaWMgbWFza05vZGU6IGNjLk5vZGU7XHJcblxyXG4gICAgYm90dG9tTm9kZUFycjpjYy5Ob2RlW107XHJcbiAgICBib3R0b21Ob2RlWUFycjpudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIHRvcE5vZGVBcnI6Y2MuTm9kZVtdO1xyXG4gICAgdG9wTm9kZVlBcnI6bnVtYmVyW10gPSBbXTtcclxuICAgIFxyXG4gICAgbGVmdE5vZGVBcnI6Y2MuTm9kZVtdO1xyXG4gICAgbGVmdE5vZGVYQXJyOm51bWJlcltdID0gW107XHJcbiAgICBcclxuICAgIHJpZ2h0Tm9kZUFycjpjYy5Ob2RlW107XHJcbiAgICByaWdodE5vZGVYQXJyOm51bWJlcltdID0gW107XHJcblxyXG4gICAgbWlkZGxlTm9kZUFycjpjYy5Ob2RlW107XHJcbiAgICBtaWRkbGVOb2RlWEFycjpudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBib3R0b21PYmpBcnI6IGFueVtdID0gW107XHJcbiAgICBwdWJsaWMgdG9wT2JqQXJyOiBhbnlbXSA9IFtdO1xyXG4gICAgcHVibGljIGxlZnRPYmpBcnI6IGFueVtdID0gW107XHJcbiAgICBwdWJsaWMgcmlnaHRPYmpBcnI6IGFueVtdID0gW107XHJcbiAgICBwdWJsaWMgbWlkZGxlT2JqQXJyOiBhbnlbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBib3R0b21PZmZzZXQgPSBjYy52MigwLCAtMjAwKTtcclxuICAgIHByaXZhdGUgdG9wT2Zmc2V0ID0gY2MudjIoMCwgMzAwKTtcclxuICAgIHByaXZhdGUgbGVmdE9mZnNldCA9IGNjLnYyKC0zMDAsIDApO1xyXG4gICAgcHJpdmF0ZSByaWdodE9mZnNldCA9IGNjLnYyKDMwMCwgMCk7XHJcbiAgICBwcml2YXRlIG1pZGRsZU9mZnNldCA9IGNjLnYyKDE1NjAsIDApO1xyXG5cclxuICAgIC8v5piv5ZCm5bey5omn6KGM6L+H5Yqo55S777yI6L+b5YWl5Zy65pmv5ZCO5q2k5Yqo55S75Y+q5omn6KGM5LiA5qyh77yM5ZCO57ut5Lu75L2V5oOF5Ya16YO95LiN5YaN5omn6KGM77yM6Zmk6Z2e6YeN5paw6L+b5YWl5Zy65pmv77yJXHJcbiAgICBwdWJsaWMgYkluaXQ6Ym9vbGVhbiA9IGZhbHNlOztcclxuXHJcbiAgICBwdWJsaWMgaW5pdChuZWVkQWx3YXlzPyl7XHJcbiAgICAgICAgaWYodGhpcy5iSW5pdCAmJiAhbmVlZEFsd2F5cyl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5iSW5pdCA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLmJvdHRvbU5vZGVBcnIpe1xyXG4gICAgICAgICAgICB0aGlzLmJvdHRvbU5vZGVBcnIgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYm90dG9tTm9kZUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5ib3R0b21Ob2RlQXJyW2ldO1xyXG4gICAgICAgICAgICB0aGlzLmJvdHRvbU5vZGVZQXJyW2ldID0gbm9kZS55O1xyXG4gICAgICAgICAgICBub2RlLnkgLT0gMjAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoIXRoaXMudG9wTm9kZUFycil7XHJcbiAgICAgICAgICAgIHRoaXMudG9wTm9kZUFyciA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy50b3BOb2RlQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnRvcE5vZGVBcnJbaV07XHJcbiAgICAgICAgICAgIHRoaXMudG9wTm9kZVlBcnJbaV0gPSBub2RlLnk7XHJcbiAgICAgICAgICAgIG5vZGUueSArPSAzMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCF0aGlzLmxlZnROb2RlQXJyKXtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0Tm9kZUFyciA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5sZWZ0Tm9kZUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5sZWZ0Tm9kZUFycltpXTtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0Tm9kZVhBcnJbaV0gPSBub2RlLng7XHJcbiAgICAgICAgICAgIG5vZGUueCAtPSAzMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCF0aGlzLnJpZ2h0Tm9kZUFycil7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHROb2RlQXJyID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJpZ2h0Tm9kZUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5yaWdodE5vZGVBcnJbaV07XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHROb2RlWEFycltpXSA9IG5vZGUueDtcclxuICAgICAgICAgICAgbm9kZS54ICs9IDMwMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLm1pZGRsZU5vZGVBcnIpe1xyXG4gICAgICAgICAgICB0aGlzLm1pZGRsZU5vZGVBcnIgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpPHRoaXMubWlkZGxlTm9kZUFyci5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLm1pZGRsZU5vZGVBcnJbaV07XHJcbiAgICAgICAgICAgIHRoaXMubWlkZGxlTm9kZVhBcnJbaV0gPSBub2RlLng7XHJcbiAgICAgICAgICAgIG5vZGUueCArPSAxNTYwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDE7Ly/kuI3og73orr7kuLow77yM5ZCm5YiZ6YCP5piO5bqm5Li6MOeahOaDheWGteS4i+inpuWPkeeCueWHu+S6i+S7tuS8muaXoOazleWGkuazoVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmb3JjZUluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYkluaXQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+W8gOWni+WKqOeUu1xyXG4gICAgcHVibGljIHN0YXJ0QW5pbWF0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5kYW5jaHUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+a3oeWHulxyXG4gICAgcHJvdGVjdGVkIGRhbmNodSgpe1xyXG4gICAgICAgIGlmKHRoaXMubG9hZGluZ05vZGUpe1xyXG4gICAgICAgICAgICBsZXQgYWMxID0gY2MuZmFkZU91dCgwLjUpO1xyXG4gICAgICAgICAgICBsZXQgY2YxID0gY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmxvYWRpbmdOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubG9hZGluZ05vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYW5ydSgpO1xyXG4gICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYWMxLCBjZjEpKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5kYW5ydSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+a3oeWFpVxyXG4gICAgcHJvdGVjdGVkIGRhbnJ1KCl7XHJcbiAgICAgICAgbGV0IGFjMiA9IGNjLmZhZGVJbigwLjUpO1xyXG4gICAgICAgIGxldCBjZjIgPSBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVzQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhYzIsIGNmMikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdGltZVNjYWxlIOaAu+aXtumXtCAvL+S4jeeyvuWHhiDnp7vliqjlu7bml7bmmoLkuI3orrBcclxuICAgICAqIEBwYXJhbSBkZWxheSAgICAg5byA5aeL5bu25pe2XHJcbiAgICAgKiBAcGFyYW0gZmluaXNoQ2FsIFxyXG4gICAgICogQHBhcmFtIHRhcmdldCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXJ0QW5pbXRpb25CeU1hc2sodGltZVNjYWxlOiBudW1iZXIgPSAxLCBkZWxheTogbnVtYmVyID0gMCwgZmluaXNoQ2FsPzogRnVuY3Rpb24sIHRhcmdldD86IGFueSl7XHJcbiAgICAgICAgbGV0IGRhbmNodVRpbWUgPSAwLjI1KiB0aW1lU2NhbGU7XHJcbiAgICAgICAgbGV0IGRhbnJ1VGltZSA9IDAuMjUqIHRpbWVTY2FsZTtcclxuICAgICAgICBsZXQgYXNzZW1ibGVUaW1lID0gMC41KiB0aW1lU2NhbGU7XHJcbiAgICAgICAgaWYgKCh0aGlzLmxlZnROb2RlQXJyLmxlbmd0aCArIHRoaXMuYm90dG9tTm9kZUFyci5sZW5ndGggKyB0aGlzLnJpZ2h0Tm9kZUFyci5sZW5ndGggKyB0aGlzLnRvcE5vZGVBcnIubGVuZ3RoICsgdGhpcy5taWRkbGVOb2RlQXJyLmxlbmd0aCkgPT0gMCl7XHJcbiAgICAgICAgICAgIGFzc2VtYmxlVGltZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmdOb2RlICYmIHRoaXMubWFza05vZGUpe1xyXG4gICAgICAgICAgICBHbG9iYWwuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYW5jaHVCeU1hc2soZGFuY2h1VGltZSk7XHJcbiAgICAgICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgICAgICAgR2xvYmFsLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhbnJ1QnlNYXNrKGRhbnJ1VGltZSk7XHJcbiAgICAgICAgICAgIH0sIGRlbGF5ICsgZGFuY2h1VGltZSk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVzQW5pbWF0aW9uKGFzc2VtYmxlVGltZSk7XHJcbiAgICAgICAgICAgIH0sIGRlbGF5ICsgZGFuY2h1VGltZSArIGRhbnJ1VGltZSk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hc2tOb2RlLmFjdGl2ZSA9IGZhbHNlOyAgIC8vIOmBrue9qemYsuatouWKqOeUu+i/h+eoi+S4reaTjeS9nCBkZWJ1ZyBhY3Rpb27pmJ/liJfkuK3osIPnlKjml7bmnLrkuI3lr7lcclxuICAgICAgICAgICAgICAgIGlmKGZpbmlzaENhbCAmJiB0YXJnZXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbmlzaENhbC5jYWxsKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGRlbGF5ICsgZGFuY2h1VGltZSArIGRhbnJ1VGltZSArIGFzc2VtYmxlVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubWFza05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIGRhbmNodUJ5TWFzayh0aW1lOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMubWFza05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1hc2tOb2RlLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgIGxldCBhYzEgPSBjYy5mYWRlVG8odGltZSwgMjAwKTtcclxuICAgICAgICB0aGlzLm1hc2tOb2RlLnJ1bkFjdGlvbihhYzEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkYW5ydUJ5TWFzayh0aW1lKXtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcclxuICAgICAgICBsZXQgYWMyID0gY2MuZmFkZVRvKHRpbWUsIDEpO1xyXG4gICAgICAgIHRoaXMubWFza05vZGUucnVuQWN0aW9uKGFjMik7XHJcbiAgICB9XHJcblxyXG4gICAgLy/muLjmiI/lhoXoioLngrnliqjnlLtcclxuICAgIHByb3RlY3RlZCBub2Rlc0FuaW1hdGlvbih0aW1lOiBudW1iZXIgPSAwLjUpe1xyXG4gICAgICAgIGlmICh0aW1lIDwgMC4yKXtcclxuICAgICAgICAgICAgdGltZSA9IDAuMjsgICAgIC8vIOmYsumUmVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZGVsYXlUaW1lOm51bWJlciA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYm90dG9tTm9kZUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5ib3R0b21Ob2RlQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgeCA9IG5vZGUueDtcclxuICAgICAgICAgICAgbGV0IHkgPSB0aGlzLmJvdHRvbU5vZGVZQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgdHdlZW4gPSBuZXcgY2MuVHdlZW4obm9kZSk7Ly9HYW1lLlR3ZWVuLmdldChub2RlKTtcclxuICAgICAgICAgICAgdHdlZW4uZGVsYXkoZGVsYXlUaW1lKS50byh0aW1lLCB7cG9zaXRpb246IG5ldyBjYy5WZWMyKHgsIHkpfSwgY2MuZWFzZUJhY2tPdXQoKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgZGVsYXlUaW1lICs9IDAuMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlbGF5VGltZSA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudG9wTm9kZUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy50b3BOb2RlQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgeCA9IG5vZGUueDtcclxuICAgICAgICAgICAgbGV0IHkgPSB0aGlzLnRvcE5vZGVZQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgdHdlZW4gPSBuZXcgY2MuVHdlZW4obm9kZSk7XHJcbiAgICAgICAgICAgIHR3ZWVuLmRlbGF5KGRlbGF5VGltZSkudG8odGltZS0wLjIsIHtwb3NpdGlvbjogbmV3IGNjLlZlYzIoeCwgeSl9LCBjYy5lYXNlQmFja091dCgpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICBkZWxheVRpbWUgKz0gMC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBkZWxheVRpbWUgPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxlZnROb2RlQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmxlZnROb2RlQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgeCA9IHRoaXMubGVmdE5vZGVYQXJyW2ldXHJcbiAgICAgICAgICAgIGxldCB5ID0gbm9kZS55O1xyXG4gICAgICAgICAgICBsZXQgdHdlZW4gPSBuZXcgY2MuVHdlZW4obm9kZSk7XHJcbiAgICAgICAgICAgIHR3ZWVuLmRlbGF5KGRlbGF5VGltZSkudG8odGltZS0wLjEsIHtwb3NpdGlvbjogbmV3IGNjLlZlYzIoeCwgeSl9LCBjYy5lYXNlQmFja091dCgpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICBkZWxheVRpbWUgKz0gMC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBkZWxheVRpbWUgPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJpZ2h0Tm9kZUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5yaWdodE5vZGVBcnJbaV07XHJcbiAgICAgICAgICAgIGxldCB4ID0gdGhpcy5yaWdodE5vZGVYQXJyW2ldXHJcbiAgICAgICAgICAgIGxldCB5ID0gbm9kZS55O1xyXG4gICAgICAgICAgICBsZXQgdHdlZW4gPSBuZXcgY2MuVHdlZW4obm9kZSk7XHJcbiAgICAgICAgICAgIHR3ZWVuLmRlbGF5KGRlbGF5VGltZSkudG8odGltZS0wLjEsIHtwb3NpdGlvbjogbmV3IGNjLlZlYzIoeCwgeSl9LCBjYy5lYXNlQmFja091dCgpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICBkZWxheVRpbWUgKz0gMC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWxheVRpbWUgPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHRoaXMubWlkZGxlTm9kZUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5taWRkbGVOb2RlQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgeCA9IHRoaXMubWlkZGxlTm9kZVhBcnJbaV1cclxuICAgICAgICAgICAgbGV0IHk9ICBub2RlLnk7XHJcbiAgICAgICAgICAgIGxldCB0d2VlbiA9IG5ldyBjYy5Ud2Vlbihub2RlKTtcclxuICAgICAgICAgICAgdHdlZW4uZGVsYXkoZGVsYXlUaW1lKS50byh0aW1lLTAuMSwge3Bvc2l0aW9uOiBuZXcgY2MuVmVjMih4LCB5KX0sIGNjLmVhc2VCYWNrT3V0KCkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGRlbGF5VGltZSArPSAwLjE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKiogXHJcbiAgICAgKiDmlrDnmoTliqjnlLvphY3nva4g54G15rS76K6+572u5Y2V5Liq5YGP56e7XHJcbiAgICAgKiB7bm9kZTogY2Mubm9kZSwgb2Zmc2V0OiBjYy52ZWMyfVxyXG4gICAgICoge25vZGU6IHRoaXMubWVudSwgb2Zmc2V0OiBjYy52MigwLCAyMDApfSDku47kuIrlvoDkuIvnp7vliqggb2Zmc2V0IHk9KzIwMFxyXG4gICAgICogb2Zmc2V05Y+v5Lul5LiN5Lyg77yM6LWw6buY6K6k5YGP56e7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmZWx4SW5pdCgpe1xyXG4gICAgICAgIGlmKHRoaXMuYkluaXQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYkluaXQgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZighdGhpcy5ib3R0b21PYmpBcnIpe1xyXG4gICAgICAgICAgICB0aGlzLmJvdHRvbU9iakFyciA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ib3R0b21PYmpBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuYm90dG9tT2JqQXJyW2ldLm5vZGU7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLmJvdHRvbU9iakFycltpXS5vZmZzZXQgfHwgdGhpcy5ib3R0b21PZmZzZXQ7XHJcbiAgICAgICAgICAgIG5vZGUueSArPSBvZmZzZXQueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLnRvcE9iakFycil7XHJcbiAgICAgICAgICAgIHRoaXMudG9wT2JqQXJyID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnRvcE9iakFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy50b3BPYmpBcnJbaV0ubm9kZTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMudG9wT2JqQXJyW2ldLm9mZnNldCB8fCB0aGlzLnRvcE9mZnNldDtcclxuICAgICAgICAgICAgbm9kZS55ICs9IG9mZnNldC55O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZighdGhpcy5sZWZ0T2JqQXJyKXtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0T2JqQXJyID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxlZnRPYmpBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMubGVmdE9iakFycltpXS5ub2RlO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5sZWZ0T2JqQXJyW2ldLm9mZnNldCB8fCB0aGlzLmxlZnRPZmZzZXQ7XHJcbiAgICAgICAgICAgIG5vZGUueCArPSBvZmZzZXQueDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIXRoaXMucmlnaHRPYmpBcnIpe1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0T2JqQXJyID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJpZ2h0T2JqQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnJpZ2h0T2JqQXJyW2ldLm5vZGU7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLnJpZ2h0T2JqQXJyW2ldLm9mZnNldCB8fCB0aGlzLnJpZ2h0T2Zmc2V0O1xyXG4gICAgICAgICAgICBub2RlLnggKz0gb2Zmc2V0Lng7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF0aGlzLm1pZGRsZU9iakFycil7XHJcbiAgICAgICAgICAgIHRoaXMubWlkZGxlT2JqQXJyID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm1pZGRsZU9iakFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5taWRkbGVPYmpBcnJbaV0ubm9kZTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMubWlkZGxlT2JqQXJyW2ldLm9mZnNldCB8fCB0aGlzLm1pZGRsZU9mZnNldDtcclxuICAgICAgICAgICAgbm9kZS54ICs9IG9mZnNldC54O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDE7Ly/kuI3og73orr7kuLow77yM5ZCm5YiZ6YCP5piO5bqm5Li6MOeahOaDheWGteS4i+inpuWPkeeCueWHu+S6i+S7tuS8muaXoOazleWGkuazoVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gdGltZVNjYWxlIOaAu+aXtumXtCAvL+S4jeeyvuWHhiDnp7vliqjlu7bml7bmmoLkuI3orrBcclxuICAgICAqIEBwYXJhbSBkZWxheSAgICAg5byA5aeL5bu25pe2XHJcbiAgICAgKiBAcGFyYW0gZmluaXNoQ2FsIFxyXG4gICAgICogQHBhcmFtIHRhcmdldCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXJ0RmxleEFuaW10aW9uQnlNYXNrKHRpbWVTY2FsZTogbnVtYmVyID0gMiwgZGVsYXk6IG51bWJlciA9IDAsIGZpbmlzaENhbD86IEZ1bmN0aW9uLCB0YXJnZXQ/OiBhbnkpe1xyXG4gICAgICAgIGxldCBkYW5jaHVUaW1lID0gMC4yNSogdGltZVNjYWxlO1xyXG4gICAgICAgIGxldCBkYW5ydVRpbWUgPSAwLjI1KiB0aW1lU2NhbGU7XHJcbiAgICAgICAgbGV0IGFzc2VtYmxlVGltZSA9IDAuNSogdGltZVNjYWxlO1xyXG4gICAgICAgIGlmICh0aGlzLmdldE1vdmVDb3VudCgpID09IDApe1xyXG4gICAgICAgICAgICBhc3NlbWJsZVRpbWUgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5sb2FkaW5nTm9kZSAmJiB0aGlzLm1hc2tOb2RlKXtcclxuICAgICAgICAgICAgR2xvYmFsLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxleERhbmNodUJ5TWFzayhkYW5jaHVUaW1lKTtcclxuICAgICAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgICAgICBHbG9iYWwuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxleERhbnJ1QnlNYXNrKGRhbnJ1VGltZSk7XHJcbiAgICAgICAgICAgIH0sIGRlbGF5ICsgZGFuY2h1VGltZSk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsZXhOb2Rlc0FuaW1hdGlvbihhc3NlbWJsZVRpbWUpO1xyXG4gICAgICAgICAgICB9LCBkZWxheSArIGRhbmNodVRpbWUgKyBkYW5ydVRpbWUpO1xyXG4gICAgICAgICAgICBHbG9iYWwuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXNrTm9kZS5hY3RpdmUgPSBmYWxzZTsgICAvLyDpga7nvanpmLLmraLliqjnlLvov4fnqIvkuK3mk43kvZwgZGVidWcgYWN0aW9u6Zif5YiX5Lit6LCD55So5pe25py65LiN5a+5XHJcbiAgICAgICAgICAgICAgICBpZihmaW5pc2hDYWwgJiYgdGFyZ2V0KXtcclxuICAgICAgICAgICAgICAgICAgICBmaW5pc2hDYWwuY2FsbCh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBkZWxheSArIGRhbmNodVRpbWUgKyBkYW5ydVRpbWUgKyBhc3NlbWJsZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGZsZXhEYW5jaHVCeU1hc2sodGltZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLm1hc2tOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tYXNrTm9kZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICBsZXQgYWMxID0gY2MuZmFkZVRvKHRpbWUsIDIwMCk7XHJcbiAgICAgICAgdGhpcy5tYXNrTm9kZS5ydW5BY3Rpb24oYWMxKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZmxleERhbnJ1QnlNYXNrKHRpbWUpe1xyXG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIGxldCBhYzIgPSBjYy5mYWRlVG8odGltZSwgMSk7XHJcbiAgICAgICAgdGhpcy5tYXNrTm9kZS5ydW5BY3Rpb24oYWMyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZmxleE5vZGVzQW5pbWF0aW9uKHRpbWU6IG51bWJlciA9IDAuNSl7XHJcbiAgICAgICAgaWYgKHRpbWUgPCAwLjIpe1xyXG4gICAgICAgICAgICB0aW1lID0gMC4yOyAgICAgLy8g6Ziy6ZSZXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkZWxheVRpbWU6bnVtYmVyID0gMDtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ib3R0b21PYmpBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuYm90dG9tT2JqQXJyW2ldLm5vZGU7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLmJvdHRvbU9iakFycltpXS5vZmZzZXQgfHwgdGhpcy5ib3R0b21PZmZzZXQ7XHJcbiAgICAgICAgICAgIGxldCB0d2VlbiA9IG5ldyBjYy5Ud2Vlbihub2RlKTtcclxuICAgICAgICAgICAgdHdlZW4uZGVsYXkoZGVsYXlUaW1lKS5ieSh0aW1lLCB7cG9zaXRpb246IG9mZnNldC5tdWwoLTEpfSwgY2MuZWFzZUJhY2tPdXQoKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgZGVsYXlUaW1lICs9IDAuMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlbGF5VGltZSA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudG9wT2JqQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnRvcE9iakFycltpXS5ub2RlO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy50b3BPYmpBcnJbaV0ub2Zmc2V0IHx8IHRoaXMudG9wT2Zmc2V0O1xyXG4gICAgICAgICAgICBsZXQgdHdlZW4gPSBuZXcgY2MuVHdlZW4obm9kZSk7XHJcbiAgICAgICAgICAgIHR3ZWVuLmRlbGF5KGRlbGF5VGltZSkuYnkodGltZS0wLjIsIHtwb3NpdGlvbjogb2Zmc2V0Lm11bCgtMSl9LCBjYy5lYXNlQmFja091dCgpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICBkZWxheVRpbWUgKz0gMC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBkZWxheVRpbWUgPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxlZnRPYmpBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMubGVmdE9iakFycltpXS5ub2RlO1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5sZWZ0T2JqQXJyW2ldLm9mZnNldCB8fCB0aGlzLmxlZnRPZmZzZXQ7XHJcbiAgICAgICAgICAgIGxldCB0d2VlbiA9IG5ldyBjYy5Ud2Vlbihub2RlKTtcclxuICAgICAgICAgICAgdHdlZW4uZGVsYXkoZGVsYXlUaW1lKS5ieSh0aW1lLTAuMSwge3Bvc2l0aW9uOiBvZmZzZXQubXVsKC0xKX0sIGNjLmVhc2VCYWNrT3V0KCkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGRlbGF5VGltZSArPSAwLjE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGRlbGF5VGltZSA9IDA7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucmlnaHRPYmpBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMucmlnaHRPYmpBcnJbaV0ubm9kZTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMucmlnaHRPYmpBcnJbaV0ub2Zmc2V0IHx8IHRoaXMucmlnaHRPZmZzZXQ7XHJcbiAgICAgICAgICAgIGxldCB0d2VlbiA9IG5ldyBjYy5Ud2Vlbihub2RlKTtcclxuICAgICAgICAgICAgdHdlZW4uZGVsYXkoZGVsYXlUaW1lKS5ieSh0aW1lLTAuMSwge3Bvc2l0aW9uOiBvZmZzZXQubXVsKC0xKX0sIGNjLmVhc2VCYWNrT3V0KCkpLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIGRlbGF5VGltZSArPSAwLjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWxheVRpbWUgPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm1pZGRsZU9iakFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5taWRkbGVPYmpBcnJbaV0ubm9kZTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMubWlkZGxlT2JqQXJyW2ldLm9mZnNldCB8fCB0aGlzLm1pZGRsZU9mZnNldDtcclxuICAgICAgICAgICAgbGV0IHR3ZWVuID0gbmV3IGNjLlR3ZWVuKG5vZGUpO1xyXG4gICAgICAgICAgICB0d2Vlbi5kZWxheShkZWxheVRpbWUpLmJ5KHRpbWUtMC4xLCB7cG9zaXRpb246IG9mZnNldC5tdWwoLTEpfSwgY2MuZWFzZUJhY2tPdXQoKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgZGVsYXlUaW1lICs9IDAuMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE1heE1vdmVEZWxheSgpe1xyXG4gICAgICAgIHJldHVybiAoTWF0aC5tYXgodGhpcy5ib3R0b21PYmpBcnIubGVuZ3RoLCB0aGlzLnRvcE9iakFyci5sZW5ndGgsIHRoaXMubGVmdE9iakFyci5sZW5ndGgsIHRoaXMucmlnaHRPYmpBcnIubGVuZ3RoLHRoaXMubWlkZGxlT2JqQXJyLmxlbmd0aCwgMSkgLTEpICogMC4xO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRNb3ZlQ291bnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5ib3R0b21PYmpBcnIubGVuZ3RoICsgdGhpcy50b3BPYmpBcnIubGVuZ3RoICsgdGhpcy5sZWZ0T2JqQXJyLmxlbmd0aCArIHRoaXMucmlnaHRPYmpBcnIubGVuZ3RoICsgdGhpcy5taWRkbGVPYmpBcnIubGVuZ3RoO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==