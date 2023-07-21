"use strict";
cc._RF.push(module, 'd2911kDGIdDiJVn3YCIW3RP', 'ErmjDiceAnim');
// ermj/Ermj/scripts/component/ErmjDiceAnim.ts

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
var ErmjDiceAnim = /** @class */ (function (_super) {
    __extends(ErmjDiceAnim, _super);
    function ErmjDiceAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dice1Sp = null;
        _this.dice2Sp = null;
        _this.diceSfArr = [];
        return _this;
    }
    ErmjDiceAnim.prototype.onLoad = function () {
        this.effectSk = cc.find("effect", this.node).getComponent(sp.Skeleton);
        this.dice1Sp.node.active = false;
        this.dice2Sp.node.active = false;
    };
    ErmjDiceAnim.prototype.showDice = function (dice, isAnim) {
        this.setDiceStyle(dice);
        if (isAnim) {
            this.dice1Sp.node.active = false;
            this.dice2Sp.node.active = false;
            this.effectSk.setAnimation(0, "idle", false);
        }
        else {
            this.dice1Sp.node.active = true;
            this.dice2Sp.node.active = true;
        }
    };
    ErmjDiceAnim.prototype.setDiceStyle = function (dice) {
        var _this = this;
        var dice1 = dice[0], dice2 = dice[1];
        this.dice1Sp.spriteFrame = this.diceSfArr[dice1 - 1];
        this.dice2Sp.spriteFrame = this.diceSfArr[dice2 - 1];
        this.scheduleOnce(function () {
            _this.dice1Sp.node.active = true;
            _this.dice2Sp.node.active = true;
        }, 1);
    };
    ErmjDiceAnim.prototype.onDisable = function () {
        this.unscheduleAllCallbacks();
        this.effectSk.clearTracks();
    };
    __decorate([
        property(cc.Sprite)
    ], ErmjDiceAnim.prototype, "dice1Sp", void 0);
    __decorate([
        property(cc.Sprite)
    ], ErmjDiceAnim.prototype, "dice2Sp", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ErmjDiceAnim.prototype, "diceSfArr", void 0);
    ErmjDiceAnim = __decorate([
        ccclass
    ], ErmjDiceAnim);
    return ErmjDiceAnim;
}(cc.Component));
exports.default = ErmjDiceAnim;

cc._RF.pop();