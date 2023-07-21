"use strict";
cc._RF.push(module, 'c2f59denS1EDrDVnvSzLpIo', 'BbwzSelfPlayerView');
// bbwz/Bbwz/scripts/subview/player/BbwzSelfPlayerView.ts

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
var BbwzPlayerBaseView_1 = require("./BbwzPlayerBaseView");
var BbwzConstDefine_1 = require("../../data/BbwzConstDefine");
var BbwzData_1 = require("../../data/BbwzData");
var BbwzSelfPlayerView = /** @class */ (function (_super) {
    __extends(BbwzSelfPlayerView, _super);
    function BbwzSelfPlayerView(node, chair) {
        var _this = _super.call(this) || this;
        _this.chair = chair;
        _this.setNode(node);
        return _this;
    }
    BbwzSelfPlayerView.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.goldLbl = this.getComponent("label_gold", cc.Label);
        BbwzConstDefine_1.default.addCommonClick(this.node, "btn_cz", this.onRechargeClick, this);
        BbwzData_1.default.instance.playerChipsFlyPos[this.chair] = this.getCenterWorldPos();
    };
    BbwzSelfPlayerView.prototype.setGoldLbl = function (point) {
        this.goldLbl.string = Global.Toolkit.formatPointStr(point, true);
    };
    BbwzSelfPlayerView.prototype.onSit = function (data) {
        _super.prototype.onSit.call(this, data);
        this.setGoldLbl(data.point);
    };
    BbwzSelfPlayerView.prototype.onRechargeClick = function () {
        BbwzConstDefine_1.default.playBtnSound();
        Global.UI.show("WndRecharge");
    };
    BbwzSelfPlayerView.prototype.getCenterWorldPos = function () {
        return this.headImgSp.node.parent.convertToWorldSpaceAR(this.headImgSp.node.position);
    };
    //返回头像之间点的世界坐标
    BbwzSelfPlayerView.prototype.getChipStartPos = function () {
        return this.node.parent.convertToWorldSpaceAR(this.node.position);
    };
    return BbwzSelfPlayerView;
}(BbwzPlayerBaseView_1.default));
exports.default = BbwzSelfPlayerView;

cc._RF.pop();