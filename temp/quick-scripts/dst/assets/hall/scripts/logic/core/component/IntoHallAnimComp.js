
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/IntoHallAnimComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcSW50b0hhbGxBbmltQ29tcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsb0JBQW9CO0FBQ3BCLGtGQUFrRjtBQUNsRix5RkFBeUY7QUFDekYsbUJBQW1CO0FBQ25CLDRGQUE0RjtBQUM1RixtR0FBbUc7QUFDbkcsOEJBQThCO0FBQzlCLDRGQUE0RjtBQUM1RixtR0FBbUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU3RixJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUUxQyxvQkFBb0I7QUFFcEI7SUFBOEMsb0NBQVk7SUFBMUQ7UUFBQSxxRUErSEM7UUF2SEcsb0JBQWMsR0FBWSxFQUFFLENBQUM7UUFHN0IsaUJBQVcsR0FBWSxFQUFFLENBQUM7UUFHMUIsa0JBQVksR0FBWSxFQUFFLENBQUM7UUFHM0IsbUJBQWEsR0FBWSxFQUFFLENBQUM7O0lBOEdoQyxDQUFDO0lBNUdVLCtCQUFJLEdBQVg7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPO1lBQ2hELE9BQU87UUFDWCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFFM0IsSUFBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7U0FDM0I7UUFDRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDOUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFD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QVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUMsR0FBRyxFQUFFLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDMUYsU0FBUyxJQUFJLEdBQUcsQ0FBQztTQUNwQjtRQUVELFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDNUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzVCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFDLEdBQUcsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDN0YsU0FBUyxJQUFJLEdBQUcsQ0FBQztTQUNwQjtRQUVELFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDN0MsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzdCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFDLEdBQUcsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDN0YsU0FBUyxJQUFJLElBQUksQ0FBQztTQUNyQjtJQUNMLENBQUM7SUE5SGdCLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBK0hwQztJQUFELHVCQUFDO0NBL0hELEFBK0hDLENBL0g2QyxFQUFFLENBQUMsU0FBUyxHQStIekQ7a0JBL0hvQixnQkFBZ0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcclxuLy8gTGVhcm4gQXR0cmlidXRlOlxyXG4vLyAgLSBbQ2hpbmVzZV0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG4vKirov5vlhaXlrZDmuLjmiI/ml7blnLrmma/ov4fmuKHliqjnlLvnu4Tku7YgKi9cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50b0hhbGxBbmltQ29tcCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBcclxuICAgIGNhbGxCYWNrRnVuYzphbnk7XHJcbiAgICBjYWxsQmFja1RhcmdldDphbnk7XHJcblxyXG4gICAgYWxwaGFOb2RlOiBjYy5Ob2RlO1xyXG5cclxuICAgIGJvdHRvbU5vZGVBcnI6Y2MuTm9kZVtdO1xyXG4gICAgYm90dG9tTm9kZVlBcnI6bnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICB0b3BOb2RlQXJyOmNjLk5vZGVbXTtcclxuICAgIHRvcE5vZGVZQXJyOm51bWJlcltdID0gW107XHJcbiAgICBcclxuICAgIGxlZnROb2RlQXJyOmNjLk5vZGVbXTtcclxuICAgIGxlZnROb2RlWEFycjpudW1iZXJbXSA9IFtdO1xyXG4gICAgXHJcbiAgICByaWdodE5vZGVBcnI6Y2MuTm9kZVtdO1xyXG4gICAgcmlnaHROb2RlWEFycjpudW1iZXJbXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBpbml0KCl7XHJcbiAgICAgICAgaWYodGhpcy5hbHBoYU5vZGUgPT0gbnVsbCB8fCAhdGhpcy5hbHBoYU5vZGUuaXNWYWxpZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuYWxwaGFOb2RlLm9wYWNpdHkgPSAxO1xyXG5cclxuICAgICAgICBpZighdGhpcy5ib3R0b21Ob2RlQXJyKXtcclxuICAgICAgICAgICAgdGhpcy5ib3R0b21Ob2RlQXJyID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmJvdHRvbU5vZGVBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuYm90dG9tTm9kZUFycltpXTtcclxuICAgICAgICAgICAgdGhpcy5ib3R0b21Ob2RlWUFycltpXSA9IG5vZGUueTtcclxuICAgICAgICAgICAgbm9kZS55IC09IDEwMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLnRvcE5vZGVBcnIpe1xyXG4gICAgICAgICAgICB0aGlzLnRvcE5vZGVBcnIgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudG9wTm9kZUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy50b3BOb2RlQXJyW2ldO1xyXG4gICAgICAgICAgICB0aGlzLnRvcE5vZGVZQXJyW2ldID0gbm9kZS55O1xyXG4gICAgICAgICAgICBub2RlLnkgKz0gMjAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZighdGhpcy5sZWZ0Tm9kZUFycil7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdE5vZGVBcnIgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubGVmdE5vZGVBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMubGVmdE5vZGVBcnJbaV07XHJcbiAgICAgICAgICAgIHRoaXMubGVmdE5vZGVYQXJyW2ldID0gbm9kZS54O1xyXG4gICAgICAgICAgICBub2RlLnggLT0gMjAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZighdGhpcy5yaWdodE5vZGVBcnIpe1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0Tm9kZUFyciA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5yaWdodE5vZGVBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMucmlnaHROb2RlQXJyW2ldO1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0Tm9kZVhBcnJbaV0gPSBub2RlLng7XHJcbiAgICAgICAgICAgIG5vZGUueCArPSA0MDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5byA5aeL5Yqo55S7XHJcbiAgICBwdWJsaWMgc3RhcnRBbmltYXRpb24oKXtcclxuICAgICAgICB0aGlzLm5vZGVzQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5kYW5ydSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5reh5YWlXHJcbiAgICBwcm90ZWN0ZWQgZGFucnUoKXtcclxuICAgICAgICBpZih0aGlzLmFscGhhTm9kZSl7XHJcbiAgICAgICAgICAgIGxldCBhYzEgPSBjYy5kZWxheVRpbWUoMC41KTtcclxuICAgICAgICAgICAgbGV0IGFjMiA9IGNjLmZhZGVJbigwLjUpO1xyXG4gICAgICAgICAgICBsZXQgYWYgPSBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jYWxsQmFja0Z1bmMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbEJhY2tGdW5jLmNhbGwodGhpcy5jYWxsQmFja1RhcmdldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFscGhhTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYWMxLCBhYzIsIGFmKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5ri45oiP5YaF6IqC54K55Yqo55S7XHJcbiAgICBwcm90ZWN0ZWQgbm9kZXNBbmltYXRpb24odGltZTogbnVtYmVyID0gMC44KXtcclxuICAgICAgICBpZiAodGltZSA8IDAuMil7XHJcbiAgICAgICAgICAgIHRpbWUgPSAwLjI7ICAgICAvLyDpmLLplJlcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGQgPSAwO1xyXG4gICAgICAgIHZhciBkZWxheVRpbWU6bnVtYmVyID0gZDtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ib3R0b21Ob2RlQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmJvdHRvbU5vZGVBcnJbaV07XHJcbiAgICAgICAgICAgIGxldCB4ID0gbm9kZS54O1xyXG4gICAgICAgICAgICBsZXQgeSA9IHRoaXMuYm90dG9tTm9kZVlBcnJbaV07XHJcbiAgICAgICAgICAgIGxldCB0d2VlbiA9IG5ldyBjYy5Ud2Vlbihub2RlKTsvL0dhbWUuVHdlZW4uZ2V0KG5vZGUpO1xyXG4gICAgICAgICAgICB0d2Vlbi5kZWxheShkZWxheVRpbWUpLnRvKHRpbWUtMC4yLCB7cG9zaXRpb246IG5ldyBjYy5WZWMyKHgsIHkpfSwgY2MuZWFzZUJhY2tPdXQoKSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgZGVsYXlUaW1lICs9IDAuMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlbGF5VGltZSA9IGQ7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudG9wTm9kZUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy50b3BOb2RlQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgeCA9IG5vZGUueDtcclxuICAgICAgICAgICAgbGV0IHkgPSB0aGlzLnRvcE5vZGVZQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgdHdlZW4gPSBuZXcgY2MuVHdlZW4obm9kZSk7XHJcbiAgICAgICAgICAgIHR3ZWVuLmRlbGF5KGRlbGF5VGltZSkudG8odGltZS0wLjQsIHtwb3NpdGlvbjogbmV3IGNjLlZlYzIoeCwgeSl9LCBjYy5lYXNlT3V0KDgpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICBkZWxheVRpbWUgKz0gMC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBkZWxheVRpbWUgPSBkO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxlZnROb2RlQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmxlZnROb2RlQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgeCA9IHRoaXMubGVmdE5vZGVYQXJyW2ldXHJcbiAgICAgICAgICAgIGxldCB5ID0gbm9kZS55O1xyXG4gICAgICAgICAgICBsZXQgdHdlZW4gPSBuZXcgY2MuVHdlZW4obm9kZSk7XHJcbiAgICAgICAgICAgIHR3ZWVuLmRlbGF5KGRlbGF5VGltZSkudG8odGltZS0wLjUsIHtwb3NpdGlvbjogbmV3IGNjLlZlYzIoeCwgeSl9LCBjYy5lYXNlQmFja091dCgpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICBkZWxheVRpbWUgKz0gMC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBkZWxheVRpbWUgPSBkO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJpZ2h0Tm9kZUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5yaWdodE5vZGVBcnJbaV07XHJcbiAgICAgICAgICAgIGxldCB4ID0gdGhpcy5yaWdodE5vZGVYQXJyW2ldXHJcbiAgICAgICAgICAgIGxldCB5ID0gbm9kZS55O1xyXG4gICAgICAgICAgICBsZXQgdHdlZW4gPSBuZXcgY2MuVHdlZW4obm9kZSk7XHJcbiAgICAgICAgICAgIHR3ZWVuLmRlbGF5KGRlbGF5VGltZSkudG8odGltZS0wLjMsIHtwb3NpdGlvbjogbmV3IGNjLlZlYzIoeCwgeSl9LCBjYy5lYXNlQmFja091dCgpKS5zdGFydCgpO1xyXG4gICAgICAgICAgICBkZWxheVRpbWUgKz0gMC4wMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19