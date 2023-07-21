"use strict";
cc._RF.push(module, 'e99afkde1NK24JbKRqNQlDF', 'GameLoadingComp');
// hall/scripts/logic/core/component/GameLoadingComp.ts

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
var GameLoadingComp = /** @class */ (function (_super) {
    __extends(GameLoadingComp, _super);
    function GameLoadingComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.logoSkIdleCount = 1;
        _this.delay = 1;
        return _this;
    }
    GameLoadingComp.prototype.onLoad = function () {
        this.logoSk = cc.find("logoSk", this.node).getComponent(sp.Skeleton);
        this.logoSk.node.active = false;
    };
    GameLoadingComp.prototype.onEnable = function () {
        if (this.logoSkIdleCount <= 0)
            return RangeError("logoSpine 动画数量设定异常");
        this.logoSk.node.active = true;
        this.logoSk.clearTracks();
        if (this.logoSkIdleCount == 1) {
            this.logoSk.setAnimation(0, "animation", true);
        }
        else {
            this.logoSk.setAnimation(0, "animation", false);
            this.logoSk.addAnimation(0, "animation", true, this.delay);
        }
    };
    GameLoadingComp.prototype.onDisable = function () {
        this.logoSk.node.active = false;
        this.logoSk.clearTracks();
    };
    __decorate([
        property({
            type: cc.Integer,
            tooltip: "logoSpine播放动画数量, 1单一循环, 2播放第一个后循环第二个",
            min: 0
        })
    ], GameLoadingComp.prototype, "logoSkIdleCount", void 0);
    __decorate([
        property({
            type: cc.Float,
            visible: function () { return this.logoSkIdleCount >= 2; },
            tooltip: "logoSpine 切换动画延时s",
            min: 0
        })
    ], GameLoadingComp.prototype, "delay", void 0);
    GameLoadingComp = __decorate([
        ccclass
    ], GameLoadingComp);
    return GameLoadingComp;
}(cc.Component));
exports.default = GameLoadingComp;

cc._RF.pop();