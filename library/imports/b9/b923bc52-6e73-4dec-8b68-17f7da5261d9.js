"use strict";
cc._RF.push(module, 'b923bxSbnNN7ItoF/faUmHZ', 'ErmjWinListTipsView');
// ermj/Ermj/scripts/subView/ErmjWinListTipsView.ts

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
var ErmjBaseView_1 = require("./ErmjBaseView");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjMjStyleHelper_1 = require("../tool/ErmjMjStyleHelper");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var bgMinWidth = 264;
var bgMinContain = 2; // 最小宽可容纳数
var bgStepWidth = 65;
var ErmjWinListTipsView = /** @class */ (function (_super) {
    __extends(ErmjWinListTipsView, _super);
    function ErmjWinListTipsView(node) {
        var _this = _super.call(this) || this;
        _this.winMjItemList = [];
        _this.setNode(node);
        return _this;
    }
    ErmjWinListTipsView.prototype.initView = function () {
        this.bgNode = this.getChild("bgNode");
        this.winCount = this.getComponent("winCount", cc.Label);
        this.listLayout = this.getComponent("listLayout", cc.Layout);
        this.copyNode = this.getChild("winMjItem");
        this.copyNode.active = false;
    };
    ErmjWinListTipsView.prototype.updateWinList = function (winArr) {
        if (winArr === void 0) { winArr = []; }
        this.hideAllMj();
        var typeCount = winArr.length;
        var mjCount = 0;
        for (var i = 0; i < winArr.length; i++) {
            var info = winArr[i];
            var mjItem = this.winMjItemList[i];
            if (!mjItem)
                mjItem = this.getOneWinMjItem();
            mjItem.active = true;
            mjItem.setInfo(info.card, info.fan, info.num);
            mjCount += info.num;
        }
        this.winCount.string = "" + mjCount;
        var mul = typeCount >= bgMinContain ? typeCount - bgMinContain : 0;
        this.bgNode.width = bgMinWidth + mul * bgStepWidth;
    };
    ErmjWinListTipsView.prototype.getOneWinMjItem = function () {
        var node = cc.instantiate(this.copyNode);
        node.setParent(this.listLayout.node);
        var view = new WinMjItemView(node);
        this.winMjItemList.push(view);
        return view;
    };
    ErmjWinListTipsView.prototype.hideAllMj = function () {
        this.winMjItemList.forEach(function (item) {
            item.active = false;
        });
    };
    return ErmjWinListTipsView;
}(ErmjBaseView_1.default));
exports.default = ErmjWinListTipsView;
var WinMjItemView = /** @class */ (function (_super) {
    __extends(WinMjItemView, _super);
    function WinMjItemView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    WinMjItemView.prototype.initView = function () {
        this.frontSp = this.getComponent("front", cc.Sprite);
        this.countLbl = this.getComponent("countLbl", cc.Label);
        this.multLbl = this.getComponent("multLbl", cc.Label);
    };
    WinMjItemView.prototype.setInfo = function (value, nMult, nCount) {
        Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.frontSp, ErmjPathHelper_1.default.gameTexturePath + "mahjong/atlas_mahjong", ErmjMjStyleHelper_1.default.mjOutMap[value], null, true);
        this.countLbl.string = "x" + nCount;
        this.multLbl.string = nMult + "\u756A";
    };
    return WinMjItemView;
}(ErmjBaseView_1.default));

cc._RF.pop();