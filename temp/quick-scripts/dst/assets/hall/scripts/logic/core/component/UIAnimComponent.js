
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/UIAnimComponent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcVUlBbmltQ29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsa0ZBQWtGO0FBQ2xGLHlGQUF5RjtBQUN6RixtQkFBbUI7QUFDbkIsNEZBQTRGO0FBQzVGLG1HQUFtRztBQUNuRyw4QkFBOEI7QUFDOUIsNEZBQTRGO0FBQzVGLG1HQUFtRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTdGLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBSzFDO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBNElDO1FBMUlHLE1BQU07UUFDRSxlQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLE9BQU87UUFDQyxjQUFRLEdBQUcsR0FBRyxDQUFDO1FBSXZCLFFBQUUsR0FBVyxJQUFJLENBQUM7UUFHbEIsUUFBRSxHQUFVLElBQUksQ0FBQztRQUVWLFlBQU0sR0FBWSxJQUFJLENBQUM7O0lBOEhsQyxDQUFDO0lBNUhHLGdCQUFnQjtJQUNULHlDQUFlLEdBQXRCLFVBQXVCLGNBQWU7UUFFbEMsSUFBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUMxQztZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQTtZQUN4RCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLENBQUM7UUFDakcsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDNUUsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzFFLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLElBQUcsSUFBSSxDQUFDLEVBQUUsRUFBQztZQUNQLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQSxzQ0FBc0M7WUFDdEUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLGtDQUFrQztTQUNyQztRQUNELElBQUcsSUFBSSxDQUFDLEVBQUU7WUFDTixJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRU0sMENBQWdCLEdBQXZCLFVBQXdCLGNBQWU7UUFFbkMsSUFBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUMxQztZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQTtZQUN6RCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUNuRSxpRkFBaUY7UUFDakYsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQzVELDhCQUE4QjtRQUM5QixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDM0UsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0MsSUFBRyxJQUFJLENBQUMsRUFBRSxFQUFDO1lBQ1AsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsSUFBRyxJQUFJLENBQUMsRUFBRTtZQUNOLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFTSw4Q0FBb0IsR0FBM0IsVUFBNEIsT0FBZSxFQUFFLFFBQWdCLEVBQUUsY0FBd0IsRUFBQyxPQUFlO1FBRW5HLElBQUcsT0FBTyxFQUNWO1lBQ0ksSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUNwQyxPQUFPLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDNUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ25GO1FBRUQsSUFBRyxRQUFRLEVBQ1g7WUFDSSxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUM5QixRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzlFO1FBRUQsSUFBRyxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQzlDO1lBQ0ksS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQzdDO2dCQUNJLElBQUksVUFBVSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsVUFBVSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUM3QztTQUNKO1FBRUQsSUFBRyxPQUFPLEVBQ1Y7WUFDSSxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUM1QixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbkY7SUFFTCxDQUFDO0lBR08sOENBQW9CLEdBQTVCO1FBRUksSUFBRyxJQUFJLENBQUMsTUFBTTtZQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUN4QyxDQUFDO0lBRU8sMENBQWdCLEdBQXhCLFVBQXlCLElBQUksRUFBRSxjQUFjO1FBQTdDLGlCQW9CQztRQWxCRyxJQUFHLElBQUksQ0FBQyxNQUFNLEVBQ2Q7WUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDakMsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFDN0I7Z0JBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDN0IsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFDOUI7b0JBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7d0JBQzFCLElBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUM7NEJBQ3JCLE9BQU87d0JBQ1gsS0FBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDbEMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNUO2FBQ0o7U0FDSjtRQUNELElBQUcsY0FBYztZQUNiLGNBQWMsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTywyQ0FBaUIsR0FBekIsVUFBMEIsSUFBSSxFQUFFLGNBQWM7UUFFMUMsSUFBRyxJQUFJLENBQUMsTUFBTSxFQUNkO1lBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQ2pDLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQzlCO2dCQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7YUFDakM7U0FDSjtRQUNELElBQUcsY0FBYztZQUNiLGNBQWMsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFqSUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsrQ0FDQTtJQUdsQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOytDQUNEO0lBWkEsZUFBZTtRQURuQyxPQUFPO09BQ2EsZUFBZSxDQTRJbkM7SUFBRCxzQkFBQztDQTVJRCxBQTRJQyxDQTVJNEMsRUFBRSxDQUFDLFNBQVMsR0E0SXhEO2tCQTVJb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5cclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQW5pbUNvbXBvbmVudCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgLy/liqjnlLvml7bplb9cclxuICAgIHByaXZhdGUgQU5JTV9USU1FID0gMC4zO1xyXG4gICAgLy/og4zmma/pgI/mmI7luqZcclxuICAgIHByaXZhdGUgQkdfQUxQSEEgPSAxNzg7XHJcblxyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgYmc6Y2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICB1aTpjYy5Ob2RlPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyB0YXJnZXQ6SUFuaW1XbmQgPSBudWxsO1xyXG5cclxuICAgIC8v5pSv5oyB5Zue6LCD5pa55byPIOS5n+aUr+aMgeaOpeWPo+aWueW8j1xyXG4gICAgcHVibGljIGRvUG9wdXBPcGVuQW5pbShmaW5pc2hDYWxsYmFjaz8pXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5ub2RlID09IG51bGwgfHwgIXRoaXMubm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZG9Qb3B1cE9wZW5BbmltLCB0aGlzLm5vZGUgPT0gbnVsbCAhISEhIVwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudWkuc2NhbGUgPSAwLjY7XHJcbiAgICAgICAgdGhpcy51aS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIGxldCBhbHBoYUFjdGlvbiA9IGNjLmZhZGVUbyh0aGlzLkFOSU1fVElNRSwgdGhpcy5CR19BTFBIQSkuZWFzaW5nKGNjLmVhc2VRdWFkcmF0aWNBY3Rpb25Jbk91dCgpKTtcclxuICAgICAgICBsZXQgc2NhbGVBY3Rpb24gPSBjYy5zY2FsZVRvKHRoaXMuQU5JTV9USU1FLCAxLCAxKS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoKSk7XHJcbiAgICAgICAgbGV0IGZ1bmNBY3Rpb24gPSBjYy5jYWxsRnVuYyh0aGlzLm9uT3BlbkFuaW1GaW5pc2gsIHRoaXMsIGZpbmlzaENhbGxiYWNrKTtcclxuICAgICAgICBsZXQgc2VxID0gY2Muc2VxdWVuY2Uoc2NhbGVBY3Rpb24sIGZ1bmNBY3Rpb24pO1xyXG4gICAgICAgIGlmKHRoaXMuYmcpe1xyXG4gICAgICAgICAgICB0aGlzLmJnLm9wYWNpdHkgPSB0aGlzLkJHX0FMUEhBOy8vMjAxOS02LTUgeGlhb0Mg6YCP5piO5bqm5Li6MOW8gOWni+WPmOWMlu+8jOacieS4gOWumuWHoOeOh+mUgeS9j+inpuWxj+S6i+S7tlxyXG4gICAgICAgICAgICB0aGlzLmJnLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuYmcucnVuQWN0aW9uKGFscGhhQWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy51aSlcclxuICAgICAgICAgICAgdGhpcy51aS5ydW5BY3Rpb24oc2VxKTtcclxuICAgICAgICB0aGlzLnNldFRhcmdldEFuaW1SdW5uaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRvUG9wdXBDbG9zZUFuaW0oZmluaXNoQ2FsbGJhY2s/KVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMubm9kZSA9PSBudWxsIHx8ICF0aGlzLm5vZGUuaXNWYWxpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImRvUG9wdXBDbG9zZUFuaW0sIHRoaXMubm9kZSA9PSBudWxsICEhISEhXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFscGhhQWN0aW9uID0gY2MuZmFkZVRvKDAuMSwgMCkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluKCkpO1xyXG4gICAgICAgIC8vbGV0IHNjYWxlQWN0aW9uID0gY2Muc2NhbGVUbyh0aGlzLkFOSU1fVElNRSwgMC44LCAwLjgpLmVhc2luZyhjYy5lYXNlQmFja0luKCkpO1xyXG4gICAgICAgIGxldCBzY2FsZUFjdGlvbiA9IGNjLmZhZGVUbygwLjEsIDEpLmVhc2luZyhjYy5lYXNlQmFja0luKCkpO1xyXG4gICAgICAgIC8vIGxldCBoaWRlQWN0aW9uID0gY2MuaGlkZSgpO1xyXG4gICAgICAgIGxldCBmdW5jQWN0aW9uID0gY2MuY2FsbEZ1bmModGhpcy5vbkNsb3NlQW5pbUZpbmlzaCwgdGhpcywgZmluaXNoQ2FsbGJhY2spO1xyXG4gICAgICAgIGxldCBzZXEgPSBjYy5zZXF1ZW5jZShzY2FsZUFjdGlvbiwgZnVuY0FjdGlvbik7XHJcbiAgICAgICAgaWYodGhpcy5iZyl7XHJcbiAgICAgICAgICAgIHRoaXMuYmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5iZy5ydW5BY3Rpb24oYWxwaGFBY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnVpKVxyXG4gICAgICAgICAgICB0aGlzLnVpLnJ1bkFjdGlvbihzZXEpO1xyXG4gICAgICAgIHRoaXMuc2V0VGFyZ2V0QW5pbVJ1bm5pbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZG9GdWxsU2NyZWVuT3BlbkFuaW0odG9wTm9kZTpjYy5Ob2RlLCBsZWZ0Tm9kZTpjYy5Ob2RlLCBjZW50ZXJOb2RlTGlzdDpjYy5Ob2RlW10sYm90Tm9kZTpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRvcE5vZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgb3JpZ2luVG9wUG9zID0gdG9wTm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdG9wTm9kZS55ICs9IHRvcE5vZGUuaGVpZ2h0O1xyXG4gICAgICAgICAgICB0b3BOb2RlLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4yLCBvcmlnaW5Ub3BQb3MpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIGlmKGxlZnROb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IG9yaWdpbkxlZnRQb3MgPSBsZWZ0Tm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgbGVmdE5vZGUueSArPSBsZWZ0Tm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGxlZnROb2RlLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4zLCBvcmlnaW5MZWZ0UG9zKS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoKSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoY2VudGVyTm9kZUxpc3QgJiYgY2VudGVyTm9kZUxpc3QubGVuZ3RoID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjZW50ZXJOb2RlTGlzdC5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNlbnRlck5vZGUgPSBjZW50ZXJOb2RlTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGNlbnRlck5vZGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJOb2RlLnJ1bkFjdGlvbihjYy5mYWRlVG8oMC4zLCAyNTUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYm90Tm9kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBvcmlnaW5Ub3BQb3MgPSBib3ROb2RlLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBib3ROb2RlLnkgLT0gYm90Tm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIGJvdE5vZGUucnVuQWN0aW9uKGNjLm1vdmVUbygwLjIsIG9yaWdpblRvcFBvcykuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzZXRUYXJnZXRBbmltUnVubmluZygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy50YXJnZXQpXHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmlzUnVuaW5nQW5pbSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk9wZW5BbmltRmluaXNoKG5vZGUsIGZpbmlzaENhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMudGFyZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQuaXNSdW5pbmdBbmltID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudGFyZ2V0Lm9wZW5BbmltRmluaXNoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5vcGVuQW5pbUZpbmlzaCgpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy50YXJnZXQuYWZ0ZXJBbmltRmluaXNoKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFjYy5pc1ZhbGlkKHRoaXMubm9kZSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LmFmdGVyQW5pbUZpbmlzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGZpbmlzaENhbGxiYWNrKVxyXG4gICAgICAgICAgICBmaW5pc2hDYWxsYmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbG9zZUFuaW1GaW5pc2gobm9kZSwgZmluaXNoQ2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy50YXJnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5pc1J1bmluZ0FuaW0gPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYodGhpcy50YXJnZXQuY2xvc2VBbmltRmluaXNoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldC5jbG9zZUFuaW1GaW5pc2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmaW5pc2hDYWxsYmFjaylcclxuICAgICAgICAgICAgZmluaXNoQ2FsbGJhY2soKTtcclxuICAgIH1cclxuXHJcbn1cclxuIl19