"use strict";
cc._RF.push(module, 'cf746QsP1dPAJkADJw4me/S', 'UIAnimComponent');
// hall/scripts/logic/core/component/UIAnimComponent.ts

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
var UIAnimComponent = /** @class */ (function (_super) {
    __extends(UIAnimComponent, _super);
    function UIAnimComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //动画时长
        _this.ANIM_TIME = 0.3;
        //背景透明度
        _this.BG_ALPHA = 178;
        _this.bg = null;
        _this.ui = null;
        _this.target = null;
        return _this;
    }
    //支持回调方式 也支持接口方式
    UIAnimComponent.prototype.doPopupOpenAnim = function (finishCallback) {
        if (this.node == null || !this.node.isValid) {
            Logger.error("doPopupOpenAnim, this.node == null !!!!!");
            return;
        }
        this.ui.scale = 0.6;
        this.ui.opacity = 255;
        var alphaAction = cc.fadeTo(this.ANIM_TIME, this.BG_ALPHA).easing(cc.easeQuadraticActionInOut());
        var scaleAction = cc.scaleTo(this.ANIM_TIME, 1, 1).easing(cc.easeBackOut());
        var funcAction = cc.callFunc(this.onOpenAnimFinish, this, finishCallback);
        var seq = cc.sequence(scaleAction, funcAction);
        if (this.bg) {
            this.bg.opacity = this.BG_ALPHA; //2019-6-5 xiaoC 透明度为0开始变化，有一定几率锁住触屏事件
            this.bg.active = true;
            // this.bg.runAction(alphaAction);
        }
        if (this.ui)
            this.ui.runAction(seq);
        this.setTargetAnimRunning();
    };
    UIAnimComponent.prototype.doPopupCloseAnim = function (finishCallback) {
        if (this.node == null || !this.node.isValid) {
            Logger.error("doPopupCloseAnim, this.node == null !!!!!");
            return;
        }
        var alphaAction = cc.fadeTo(0.1, 0).easing(cc.easeCubicActionIn());
        //let scaleAction = cc.scaleTo(this.ANIM_TIME, 0.8, 0.8).easing(cc.easeBackIn());
        var scaleAction = cc.fadeTo(0.1, 1).easing(cc.easeBackIn());
        // let hideAction = cc.hide();
        var funcAction = cc.callFunc(this.onCloseAnimFinish, this, finishCallback);
        var seq = cc.sequence(scaleAction, funcAction);
        if (this.bg) {
            this.bg.active = true;
            this.bg.runAction(alphaAction);
        }
        if (this.ui)
            this.ui.runAction(seq);
        this.setTargetAnimRunning();
    };
    UIAnimComponent.prototype.doFullScreenOpenAnim = function (topNode, leftNode, centerNodeList, botNode) {
        if (topNode) {
            var originTopPos = topNode.position;
            topNode.y += topNode.height;
            topNode.runAction(cc.moveTo(0.2, originTopPos).easing(cc.easeCubicActionOut()));
        }
        if (leftNode) {
            var originLeftPos = leftNode.position;
            leftNode.y += leftNode.height;
            leftNode.runAction(cc.moveTo(0.3, originLeftPos).easing(cc.easeBackOut()));
        }
        if (centerNodeList && centerNodeList.length > 0) {
            for (var i = 0; i < centerNodeList.length; i++) {
                var centerNode = centerNodeList[i];
                centerNode.opacity = 1;
                centerNode.runAction(cc.fadeTo(0.3, 255));
            }
        }
        if (botNode) {
            var originTopPos = botNode.position;
            botNode.y -= botNode.height;
            botNode.runAction(cc.moveTo(0.2, originTopPos).easing(cc.easeCubicActionOut()));
        }
    };
    UIAnimComponent.prototype.setTargetAnimRunning = function () {
        if (this.target)
            this.target.isRuningAnim = true;
    };
    UIAnimComponent.prototype.onOpenAnimFinish = function (node, finishCallback) {
        var _this = this;
        if (this.target) {
            this.target.isRuningAnim = false;
            if (this.target.openAnimFinish) {
                this.target.openAnimFinish();
                if (this.target.afterAnimFinish) {
                    Global.Component.scheduleOnce(function () {
                        if (!cc.isValid(_this.node))
                            return;
                        _this.target.afterAnimFinish();
                    }, 0);
                }
            }
        }
        if (finishCallback)
            finishCallback();
    };
    UIAnimComponent.prototype.onCloseAnimFinish = function (node, finishCallback) {
        if (this.target) {
            this.target.isRuningAnim = false;
            if (this.target.closeAnimFinish) {
                this.target.closeAnimFinish();
            }
        }
        if (finishCallback)
            finishCallback();
    };
    __decorate([
        property(cc.Node)
    ], UIAnimComponent.prototype, "bg", void 0);
    __decorate([
        property(cc.Node)
    ], UIAnimComponent.prototype, "ui", void 0);
    UIAnimComponent = __decorate([
        ccclass
    ], UIAnimComponent);
    return UIAnimComponent;
}(cc.Component));
exports.default = UIAnimComponent;

cc._RF.pop();