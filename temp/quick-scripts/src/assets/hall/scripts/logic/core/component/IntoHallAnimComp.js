"use strict";
cc._RF.push(module, '414d0NxfJ1D3ZgCfuIMWmQZ', 'IntoHallAnimComp');
// hall/scripts/logic/core/component/IntoHallAnimComp.ts

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
var IntoHallAnimComp = /** @class */ (function (_super) {
    __extends(IntoHallAnimComp, _super);
    function IntoHallAnimComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bottomNodeYArr = [];
        _this.topNodeYArr = [];
        _this.leftNodeXArr = [];
        _this.rightNodeXArr = [];
        return _this;
    }
    IntoHallAnimComp.prototype.init = function () {
        if (this.alphaNode == null || !this.alphaNode.isValid)
            return;
        this.alphaNode.opacity = 1;
        if (!this.bottomNodeArr) {
            this.bottomNodeArr = [];
        }
        for (var i = 0; i < this.bottomNodeArr.length; i++) {
            var node = this.bottomNodeArr[i];
            this.bottomNodeYArr[i] = node.y;
            node.y -= 100;
        }
        if (!this.topNodeArr) {
            this.topNodeArr = [];
        }
        for (var i = 0; i < this.topNodeArr.length; i++) {
            var node = this.topNodeArr[i];
            this.topNodeYArr[i] = node.y;
            node.y += 200;
        }
        if (!this.leftNodeArr) {
            this.leftNodeArr = [];
        }
        for (var i = 0; i < this.leftNodeArr.length; i++) {
            var node = this.leftNodeArr[i];
            this.leftNodeXArr[i] = node.x;
            node.x -= 200;
        }
        if (!this.rightNodeArr) {
            this.rightNodeArr = [];
        }
        for (var i = 0; i < this.rightNodeArr.length; i++) {
            var node = this.rightNodeArr[i];
            this.rightNodeXArr[i] = node.x;
            node.x += 400;
        }
    };
    //开始动画
    IntoHallAnimComp.prototype.startAnimation = function () {
        this.nodesAnimation();
        this.danru();
    };
    //淡入
    IntoHallAnimComp.prototype.danru = function () {
        var _this = this;
        if (this.alphaNode) {
            var ac1 = cc.delayTime(0.5);
            var ac2 = cc.fadeIn(0.5);
            var af = cc.callFunc(function () {
                if (_this.callBackFunc) {
                    _this.callBackFunc.call(_this.callBackTarget);
                }
            });
            this.alphaNode.runAction(cc.sequence(ac1, ac2, af));
        }
    };
    //游戏内节点动画
    IntoHallAnimComp.prototype.nodesAnimation = function (time) {
        if (time === void 0) { time = 0.8; }
        if (time < 0.2) {
            time = 0.2; // 防错
        }
        var d = 0;
        var delayTime = d;
        for (var i = 0; i < this.bottomNodeArr.length; i++) {
            var node = this.bottomNodeArr[i];
            var x = node.x;
            var y = this.bottomNodeYArr[i];
            var tween = new cc.Tween(node); //Game.Tween.get(node);
            tween.delay(delayTime).to(time - 0.2, { position: new cc.Vec2(x, y) }, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
        delayTime = d;
        for (var i = 0; i < this.topNodeArr.length; i++) {
            var node = this.topNodeArr[i];
            var x = node.x;
            var y = this.topNodeYArr[i];
            var tween = new cc.Tween(node);
            tween.delay(delayTime).to(time - 0.4, { position: new cc.Vec2(x, y) }, cc.easeOut(8)).start();
            delayTime += 0.1;
        }
        delayTime = d;
        for (var i = 0; i < this.leftNodeArr.length; i++) {
            var node = this.leftNodeArr[i];
            var x = this.leftNodeXArr[i];
            var y = node.y;
            var tween = new cc.Tween(node);
            tween.delay(delayTime).to(time - 0.5, { position: new cc.Vec2(x, y) }, cc.easeBackOut()).start();
            delayTime += 0.1;
        }
        delayTime = d;
        for (var i = 0; i < this.rightNodeArr.length; i++) {
            var node = this.rightNodeArr[i];
            var x = this.rightNodeXArr[i];
            var y = node.y;
            var tween = new cc.Tween(node);
            tween.delay(delayTime).to(time - 0.3, { position: new cc.Vec2(x, y) }, cc.easeBackOut()).start();
            delayTime += 0.02;
        }
    };
    IntoHallAnimComp = __decorate([
        ccclass
    ], IntoHallAnimComp);
    return IntoHallAnimComp;
}(cc.Component));
exports.default = IntoHallAnimComp;

cc._RF.pop();