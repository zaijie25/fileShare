"use strict";
cc._RF.push(module, '37be1zMxrNHp5yT36H8ca3a', 'ErmjRubMjAnim');
// ermj/Ermj/scripts/component/ErmjRubMjAnim.ts

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
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjMjStyleHelper_1 = require("../tool/ErmjMjStyleHelper");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ErmjRubMjAnim = /** @class */ (function (_super) {
    __extends(ErmjRubMjAnim, _super);
    function ErmjRubMjAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mjFrontSp = null;
        return _this;
    }
    ErmjRubMjAnim.prototype.onLoad = function () {
        this.effectSk1 = cc.find("content/effect1", this.node).getComponent(sp.Skeleton);
        this.effectSk1.node.active = false;
        this.effectSk2 = cc.find("content/effect2", this.node).getComponent(sp.Skeleton);
        this.effectSk2.node.active = false;
    };
    ErmjRubMjAnim.prototype.doRubAnim = function (value) {
        Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.mjFrontSp, ErmjPathHelper_1.default.gameTexturePath + "mahjong/atlas_mahjong", ErmjMjStyleHelper_1.default.mjHandMap[value], null, true);
        this.effectSk1.node.active = true;
        this.effectSk2.node.active = true;
        this.effectSk1.setAnimation(0, "idle", false);
        this.effectSk2.setAnimation(0, "idle_shouzi", false);
    };
    ErmjRubMjAnim.prototype.onDisable = function () {
        this.effectSk1.clearTracks();
        this.effectSk2.clearTracks();
        this.effectSk1.node.active = false;
        this.effectSk2.node.active = false;
    };
    __decorate([
        property(cc.Sprite)
    ], ErmjRubMjAnim.prototype, "mjFrontSp", void 0);
    ErmjRubMjAnim = __decorate([
        ccclass
    ], ErmjRubMjAnim);
    return ErmjRubMjAnim;
}(cc.Component));
exports.default = ErmjRubMjAnim;

cc._RF.pop();