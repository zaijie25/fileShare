"use strict";
cc._RF.push(module, '4b7e2r+tIJB5KVHGavj7yZD', 'BbwzPlayerBaseView');
// bbwz/Bbwz/scripts/subview/player/BbwzPlayerBaseView.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var BbwzBaseView_1 = require("../BbwzBaseView");
var BbwzDriver_1 = require("../../BbwzDriver");
var BbwzPathHelper_1 = require("../../tool/BbwzPathHelper");
var BbwzConstDefine_1 = require("../../data/BbwzConstDefine");
var BbwzPlayerBaseView = /** @class */ (function (_super) {
    __extends(BbwzPlayerBaseView, _super);
    function BbwzPlayerBaseView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isSomeone = false;
        return _this;
    }
    Object.defineProperty(BbwzPlayerBaseView.prototype, "isSomeOne", {
        get: function () {
            return this._isSomeone;
        },
        enumerable: false,
        configurable: true
    });
    BbwzPlayerBaseView.prototype.initView = function () {
        this.headImgSp = this.getComponent("mask/sprite_head", cc.Sprite);
        this.headBoxSp = this.getComponent("head_kuang", cc.Sprite);
        this.vipLevel = this.getComponent("vipLbl", cc.Label);
        this.nameLbl = this.getComponent("label_name", cc.Label);
        this.piaoziNode = this.getChild("piaoziNode");
        this.piaoziNode.active = false;
        this.piaoziRawPos = this.piaoziNode.position;
        this.resultLbl = this.getComponent("piaoziNode/label_result", cc.Label);
        this.winEffectNode = this.getChild("spineNode/spineWin");
        this.winEffectNode.active = false;
        this.loseEffectNode = this.getChild("spineNode/spineLose");
        this.loseEffectNode.active = false;
    };
    BbwzPlayerBaseView.prototype.onSit = function (data) {
        this.active = true;
        this._isSomeone = true;
        this.loadHead(data.headimg, data.a_box);
        this.setNameLbl(data.nickname);
    };
    BbwzPlayerBaseView.prototype.onLeave = function () {
        this.active = false;
        this._isSomeone = false;
        this.clearByRound();
    };
    BbwzPlayerBaseView.prototype.loadHead = function (headimg, a_box) {
        this.headImgSp.spriteFrame = Global.Toolkit.getLocalHeadSf(headimg);
        BbwzDriver_1.default.instance.loadVipHeadKuang(this.headBoxSp, a_box);
        this.vipLevel.string = a_box;
    };
    BbwzPlayerBaseView.prototype.setNameLbl = function (name) {
        this.nameLbl.string = Global.Toolkit.substrEndWithElli(name, 12, true);
    };
    BbwzPlayerBaseView.prototype.setReward = function (point) {
        this.piaoziNode.active = true;
        this.resultLbl.string = Global.Toolkit.formatPointStr(point, true, true);
        var fontName = point >= 0 ? BbwzConstDefine_1.default.rewardFontStr.Win : BbwzConstDefine_1.default.rewardFontStr.Lose;
        if (point > 0) {
            this.winEffectNode.active = true;
            this.loseEffectNode.active = false;
        }
        else if (point < 0) {
            this.winEffectNode.active = false;
            this.loseEffectNode.active = true;
        }
        this.resultLbl.font = Global.ResourceManager.getBundleRes(BbwzConstDefine_1.default.GAME_ID, BbwzPathHelper_1.default.gameTexturePath + "atlas/dynamic/font/" + fontName, cc.Font);
        this.piaoziNode.setPosition(this.piaoziRawPos);
        this.piaoziNode.runAction(cc.moveBy(0.5, cc.v2(0, 30)).easing(cc.easeBackOut()));
    };
    BbwzPlayerBaseView.prototype.clearByRound = function () {
        this.winEffectNode.active = false;
        this.loseEffectNode.active = false;
        this.piaoziNode.active = false;
        this.piaoziNode.stopAllActions();
    };
    return BbwzPlayerBaseView;
}(BbwzBaseView_1.default));
exports.default = BbwzPlayerBaseView;

cc._RF.pop();