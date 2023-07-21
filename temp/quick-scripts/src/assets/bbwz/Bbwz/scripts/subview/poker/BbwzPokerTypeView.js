"use strict";
cc._RF.push(module, 'bfd3eF63+hCWZbDWMrgoVI9', 'BbwzPokerTypeView');
// bbwz/Bbwz/scripts/subview/poker/BbwzPokerTypeView.ts

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
exports.BbwzBullPokerTypeView = exports.BbwzZjhPokerTypeView = void 0;
var BbwzBaseView_1 = require("../BbwzBaseView");
var BbwzPokerTool_1 = require("../../tool/BbwzPokerTool");
var BbwzPathHelper_1 = require("../../tool/BbwzPathHelper");
var BbwzConstDefine_1 = require("../../data/BbwzConstDefine");
var BbwzPokerTypeView = /** @class */ (function (_super) {
    __extends(BbwzPokerTypeView, _super);
    function BbwzPokerTypeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzPokerTypeView.prototype.setPokerTypeStyle = function (nType, nMult) {
    };
    return BbwzPokerTypeView;
}(BbwzBaseView_1.default));
exports.default = BbwzPokerTypeView;
var BbwzZjhPokerTypeView = /** @class */ (function (_super) {
    __extends(BbwzZjhPokerTypeView, _super);
    function BbwzZjhPokerTypeView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    BbwzZjhPokerTypeView.prototype.initView = function () {
        this.typeSp = this.getComponent("layout/typeSp", cc.Sprite);
        this.multSp = this.getComponent("layout/multSp", cc.Sprite);
        this.highTypeSk = this.getComponent("highSk", sp.Skeleton);
    };
    BbwzZjhPokerTypeView.prototype.setPokerTypeStyle = function (nType, nMult) {
        this.typeSp.node.active = true;
        var atlasPath = BbwzPathHelper_1.default.gameTexturePath + "atlas/poker/atlas_poker";
        Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.typeSp, atlasPath, BbwzPokerTool_1.default.zjhPokerTypeSf[nType], null, true);
        Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.multSp, atlasPath, BbwzPokerTool_1.default.multiSfRes[nMult], null, true);
        var sort = BbwzPokerTool_1.default.sortZjhPokerType(nType);
        var isSpecial = sort == 2 || sort == 3;
        this.highTypeSk.node.active = isSpecial;
        if (isSpecial) {
            this.highTypeSk.clearTracks();
            this.highTypeSk.setAnimation(0, "idle", false);
        }
    };
    return BbwzZjhPokerTypeView;
}(BbwzPokerTypeView));
exports.BbwzZjhPokerTypeView = BbwzZjhPokerTypeView;
var BbwzBullPokerTypeView = /** @class */ (function (_super) {
    __extends(BbwzBullPokerTypeView, _super);
    function BbwzBullPokerTypeView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    BbwzBullPokerTypeView.prototype.initView = function () {
        this.typeSp = this.getComponent("layout/typeSp", cc.Sprite);
        this.multSp = this.getComponent("layout/multSp", cc.Sprite);
        this.highTypeSk = this.getComponent("highSk", sp.Skeleton);
    };
    BbwzBullPokerTypeView.prototype.setPokerTypeStyle = function (nType, nMult) {
        this.typeSp.node.active = true;
        var atlasPath = BbwzPathHelper_1.default.gameTexturePath + "atlas/poker/atlas_poker";
        Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.typeSp, atlasPath, BbwzPokerTool_1.default.bullPokerTypeSf[nType], null, true);
        var sort = BbwzPokerTool_1.default.sortBullPokerType(nType);
        if (sort == 3) {
            this.multSp.node.active = true;
            this.highTypeSk.node.active = true;
            this.highTypeSk.clearTracks();
            this.highTypeSk.setAnimation(0, "idle", false);
            Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.multSp, atlasPath, BbwzPokerTool_1.default.multiSfRes[nMult], null, true);
        }
        else {
            this.highTypeSk.node.active = false;
            this.multSp.node.active = true;
            Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.multSp, atlasPath, BbwzPokerTool_1.default.multiSfRes[nMult], null, true);
        }
    };
    return BbwzBullPokerTypeView;
}(BbwzPokerTypeView));
exports.BbwzBullPokerTypeView = BbwzBullPokerTypeView;

cc._RF.pop();