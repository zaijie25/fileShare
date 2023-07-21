"use strict";
cc._RF.push(module, 'd2f4e5Go9hHy7SU+Ep1x23d', 'BlackBgComp');
// hall/scripts/logic/core/component/BlackBgComp.ts

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
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BlackBgComp = /** @class */ (function (_super) {
    __extends(BlackBgComp, _super);
    function BlackBgComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlackBgComp.prototype.onLoad = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            if (_this.window && _this.window.active && cc.isValid(_this.window.node) && _this.window.close) {
                if (_this.clickEnable) {
                    // this.window.close();
                    _this.clickEnable = false;
                }
            }
        }, this);
    };
    BlackBgComp.prototype.onEnable = function () {
        this.clickEnable = true;
    };
    BlackBgComp.prototype.onDestroy = function () {
        this.node.targetOff(this);
    };
    BlackBgComp = __decorate([
        ccclass
    ], BlackBgComp);
    return BlackBgComp;
}(cc.Component));
exports.default = BlackBgComp;

cc._RF.pop();