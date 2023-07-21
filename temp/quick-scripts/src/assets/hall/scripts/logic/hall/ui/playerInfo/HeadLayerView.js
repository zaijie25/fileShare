"use strict";
cc._RF.push(module, '4793fvewLpAr4YrydRf68Gb', 'HeadLayerView');
// hall/scripts/logic/hall/ui/playerInfo/HeadLayerView.ts

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
/**
 * 选择头像界面
 */
var HeadLayerView = /** @class */ (function (_super) {
    __extends(HeadLayerView, _super);
    function HeadLayerView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 头像范围
         */
        _this.headCount = 81;
        /**
         * 当前选中的头像索引
         */
        _this.chooseHeadIndex = 0;
        /**
         * 滚动容器
         */
        _this.scrollView = null;
        /**
         * 预设节点
         */
        _this.itemNode = null;
        /**
         * 选中节点
         */
        //chooseNode:cc.Node = null;
        /**
         * 当前生效的头像标识（勾）
         */
        _this.chooseBg = null;
        _this.chooseGou = null;
        _this.chooseCheck = null;
        /**
         * 初始坐标和间隔
         */
        _this.xyGapArr = [0, 0, 138, 141];
        return _this;
    }
    HeadLayerView.prototype.initView = function () {
        var _this = this;
        this.model = Global.ModelManager.getModel("PlayerInfoModel");
        this.headCount = Global.Setting.headNameRange;
        this.scrollView = this.getComponent("scrollview", cc.ScrollView);
        this.itemNode = this.getChild("scrollview/view/content/itemlayer/item");
        this.itemNode.active = false;
        var startX = this.itemNode.x;
        var startY = this.itemNode.y;
        this.xyGapArr[0] = startX;
        this.xyGapArr[1] = startY;
        this.xyGapArr[2] = Global.Setting.SkinConfig.zhuangbanHeadWH[0];
        this.xyGapArr[3] = Global.Setting.SkinConfig.zhuangbanHeadWH[1];
        var h = 0;
        var index = 0;
        Global.Component.schedule(function () {
            if (index >= _this.headCount) {
                h = -h + (_this.itemNode.height / 2);
                var size = _this.scrollView.node.getContentSize();
                if (h < size.height) {
                    h = size.height;
                }
                _this.scrollView.content.setContentSize(0, h);
                return;
            }
            var end = index + 2;
            var begin = index;
            for (var i = begin; i < end; i++) {
                if (i >= _this.headCount) {
                    index++;
                    return;
                }
                var item = cc.instantiate(_this.itemNode);
                item.active = true;
                item.setParent(_this.itemNode.parent);
                item.name = "head_" + i;
                item.x = startX + _this.xyGapArr[2] * (i % 5);
                h = startY - _this.xyGapArr[3] * Math.floor(i / 5);
                item.y = h;
                Global.UIHelper.addCommonClick(item, "", _this.HeadBtnFunc, _this, cc.Button.Transition.NONE);
                _this.UpdateHead(item, i);
                index++;
            }
        }, 0, this.headCount / 2);
        // this.chooseBg = cc.find("chooselayer/chooseBG", this.scrollView.content);
        this.chooseGou = cc.find("chooselayer/chooseGou", this.scrollView.content);
        // this.chooseCheck = cc.find("chooselayer/chooseCheck", this.scrollView.content)
    };
    /**
    * 更新界面
    */
    HeadLayerView.prototype.UpdateUI = function () {
        var i = this.chooseHeadIndex;
        var x = this.xyGapArr[0] + this.xyGapArr[2] * (i % 5);
        var y = this.xyGapArr[1] - this.xyGapArr[3] * Math.floor(i / 5);
        i = parseInt(Global.PlayerData.headimg) - 1;
        var x = this.xyGapArr[0] + this.xyGapArr[2] * (i % 5);
        var y = this.xyGapArr[1] - this.xyGapArr[3] * Math.floor(i / 5);
        this.chooseGou.x = x + 48;
        this.chooseGou.y = y - 48;
        // this.chooseBg.x = x;
        // this.chooseBg.y = y -30;
        // this.chooseCheck.x = x + 4;
        // this.chooseCheck.y = y - 5;
    };
    /**
     * 更新头像
     * @param itemNode 头像节点
     * @param index 索引
     */
    HeadLayerView.prototype.UpdateHead = function (itemNode, index) {
        var headImg = "" + (index + 1);
        var sprite = cc.find("mask/headFrame", itemNode).getComponent(cc.Sprite);
        sprite.spriteFrame = Global.Toolkit.getLocalHeadSf(headImg);
    };
    /**
     * 头像点击
     * @param target
     */
    HeadLayerView.prototype.HeadBtnFunc = function (target) {
        var _this = this;
        var arr = target.name.split("_");
        var index = parseInt(arr[arr.length - 1]);
        this.chooseHeadIndex = index;
        this.UpdateUI();
        var chooseHead = "" + (this.chooseHeadIndex + 1);
        if (chooseHead != Global.PlayerData.headimg) {
            //请求修改头像
            var param = {};
            param.headimg = chooseHead;
            this.model.reqEditUserInfo(param, function () {
                Global.PlayerData.headimg = chooseHead; //更新玩家数据！
                _this.UpdateUI();
            });
        }
    };
    HeadLayerView.prototype.onSubViewShow = function () {
        this.chooseHeadIndex = parseInt(Global.PlayerData.headimg) - 1;
        this.UpdateUI();
    };
    HeadLayerView.prototype.onSubViewHide = function () {
    };
    return HeadLayerView;
}(ViewBase_1.default));
exports.default = HeadLayerView;

cc._RF.pop();