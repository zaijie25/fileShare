"use strict";
cc._RF.push(module, 'd1d69oDlUVKNbXtlekivE3V', 'EventComp');
// hall/scripts/logic/core/component/EventComp.ts

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
var EventComp = /** @class */ (function (_super) {
    __extends(EventComp, _super);
    function EventComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventComp.prototype.start = function () {
    };
    EventComp.prototype.clickLink = function (event, param) {
        if (param != null && param != "")
            cc.sys.openURL(Global.Toolkit.DealWithUrl(param));
    };
    EventComp.prototype.onDisable = function () {
        if (this.disableCallback)
            this.disableCallback.call(this.target);
    };
    EventComp.prototype.onDestroy = function () {
        if (this.destroyCallback)
            this.destroyCallback.call(this.target);
    };
    EventComp = __decorate([
        ccclass
    ], EventComp);
    return EventComp;
}(cc.Component));
exports.default = EventComp;

cc._RF.pop();