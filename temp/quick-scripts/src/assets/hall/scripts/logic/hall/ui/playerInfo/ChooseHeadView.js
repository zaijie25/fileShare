"use strict";
cc._RF.push(module, '8aed6xAjUNNJLx1YPrqR12+', 'ChooseHeadView');
// hall/scripts/logic/hall/ui/playerInfo/ChooseHeadView.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
var HeadLayerView_1 = require("./HeadLayerView");
var HeadFrameLayerView_1 = require("./HeadFrameLayerView");
var ChooseHeadView = /** @class */ (function (_super) {
    __extends(ChooseHeadView, _super);
    function ChooseHeadView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 当前页签
         */
        _this.curViewIndex = -1;
        /**
         * 页签根节点集合
         */
        _this.yeqianRootNodeArr = [];
        _this.yeqianArr = [];
        return _this;
    }
    ChooseHeadView.prototype.initView = function () {
        for (var i = 0; i < 2; i++) {
            var yeqianNode = this.addCommonClick("yeqian/yeqian_" + i, this.subViewBtnFunc, this);
            this.yeqianRootNodeArr[i] = yeqianNode;
            this.yeqianArr[i * 2] = cc.find("noSelected", yeqianNode);
            this.yeqianArr[i * 2 + 1] = cc.find("selected", yeqianNode);
        }
        this.headLayerView = this.addView("HeadLayerView", this.getChild("content/content_0"), HeadLayerView_1.default);
        this.headFrameLayerView = this.addView("HeadFrameLayerView", this.getChild("content/content_1"), HeadFrameLayerView_1.default);
        this.yeqianRootNodeArr[1].active = !Global.Setting.vipDisable;
    };
    /**
     * 页签按钮点击
     * @param target
     */
    ChooseHeadView.prototype.subViewBtnFunc = function (target) {
        var arr = target.node.name.split("_");
        var param = arr[arr.length - 1];
        var viewIndex = parseInt(param);
        this.changeView(viewIndex);
    };
    ChooseHeadView.prototype.UpdateUI = function () {
        for (var i = 0; i < 2; i++) {
            var bShow = (i == this.curViewIndex);
            var yeqianNode = this.yeqianArr[i * 2 + 1];
            yeqianNode.active = bShow;
        }
    };
    ChooseHeadView.prototype.changeView = function (viewIndex) {
        if (this.curViewIndex != viewIndex) {
            this.curViewIndex = viewIndex;
            this.headLayerView.subViewState = this.curViewIndex == 0;
            this.headFrameLayerView.subViewState = this.curViewIndex == 1;
            this.UpdateUI();
        }
    };
    ChooseHeadView.prototype.onSubViewShow = function () {
        this.changeView(0);
    };
    ChooseHeadView.prototype.onSubViewHide = function () {
        this.curViewIndex = -1;
    };
    return ChooseHeadView;
}(ViewBase_1.default));
exports.default = ChooseHeadView;

cc._RF.pop();