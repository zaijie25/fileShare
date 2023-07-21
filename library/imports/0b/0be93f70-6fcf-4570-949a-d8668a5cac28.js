"use strict";
cc._RF.push(module, '0be939wb89FcJSa2GaKXKwo', 'HeadFrameLayerView');
// hall/scripts/logic/hall/ui/playerInfo/HeadFrameLayerView.ts

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
 * 装扮页签下的头像框页签视图
 */
var HeadFrameLayerView = /** @class */ (function (_super) {
    __extends(HeadFrameLayerView, _super);
    function HeadFrameLayerView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
        * 头像框范围
        */
        _this.headFrameCount = 15;
        /**
         * 当前选中的头像框索引
         */
        _this.chooseHeadFrameIndex = -1;
        /**
         * 滚动容器
         */
        _this.scrollView = null;
        /**
         * 预设节点
         */
        _this.itemNode = null;
        /**
         * 初始坐标和间隔
         */
        _this.xyGapArr = [0, 0, 164, 160];
        /**
         * 头像框节点集合
         */
        _this.itemNodeArr = [];
        /**
         * 当前生效的头像框标识（勾）
         */
        // chooseBg: cc.Node = null;
        _this.chooseGou = null;
        /**
         * 当前显示的头像框内的头像
         */
        _this.spriteHeadVip = null;
        /**
         * 当前显示的头像框
         */
        _this.spriteHeadFrameVip = null;
        /**
         * 当前显示的头像框vip图标
         */
        _this.spriteVip = null;
        /**
         * 当前显示的头像框vip文本
         */
        _this.labelVip = null;
        /**
         * 当前显示的头像框信息索引
         */
        _this.showHeadFrameIndex = -1;
        return _this;
    }
    HeadFrameLayerView.prototype.initView = function () {
        var _this = this;
        this.model = Global.ModelManager.getModel("PlayerInfoModel");
        this.scrollView = cc.find("scrollview", this.node).getComponent(cc.ScrollView);
        this.itemNode = cc.find("itemlayer/item", this.scrollView.content);
        // this.chooseBg = cc.find("chooselayer/chooseBG", this.scrollView.content)
        this.chooseGou = cc.find("chooselayer/chooseGou", this.scrollView.content);
        var startX = this.itemNode.x;
        var startY = this.itemNode.y;
        this.xyGapArr[0] = startX;
        this.xyGapArr[1] = startY;
        this.xyGapArr[2] = Global.Setting.SkinConfig.zhuangbanKuangWH[0];
        this.xyGapArr[3] = Global.Setting.SkinConfig.zhuangbanKuangWH[1];
        var h = 0;
        var index = 0;
        // this.headFrameCount = PlayerInfoModel.instance.vip_cfg.length;
        Global.Component.schedule(function () {
            var end = index + 2;
            var begin = index;
            for (var i = begin; i < end; i++) {
                if (i >= _this.headFrameCount) {
                    if (index >= _this.headFrameCount) {
                        h = -h + (_this.itemNode.height / 2);
                        var size = _this.scrollView.node.getContentSize();
                        if (h < size.height) {
                            h = size.height;
                        }
                        _this.scrollView.content.setContentSize(0, h + 20);
                        return;
                    }
                    return;
                }
                var item = cc.instantiate(_this.itemNode);
                item.setParent(_this.itemNode.parent);
                item.active = true;
                _this.itemNodeArr.push(item);
                item.name = "head_" + i;
                item.x = startX + _this.xyGapArr[2] * (i % 3);
                h = startY - _this.xyGapArr[3] * Math.floor(i / 3);
                item.y = h;
                Global.UIHelper.addCommonClick(item, "", _this.HeadBtnFunc, _this, cc.Button.Transition.NONE);
                _this.UpdateHead(item, i);
                index++;
            }
        }, 0, this.headFrameCount / 2);
        this.itemNode.active = false;
        this.spriteHeadVip = cc.find("right/item/head", this.node).getComponent(cc.Sprite);
        this.spriteHeadFrameVip = cc.find("right/item/txk", this.node).getComponent(cc.Sprite);
        this.spriteVip = cc.find("right/icon_vip", this.node).getComponent(cc.Sprite);
        this.labelVip = cc.find("right/label_vip", this.node).getComponent(cc.Label);
        Global.Event.on(GlobalEvent.CHANGEVIP, this, this.updateUserInfo);
    };
    /**
     * 更新界面
     */
    HeadFrameLayerView.prototype.UpdateUI = function () {
        if (this.chooseHeadFrameIndex >= 0) {
            var node = this.itemNodeArr[this.chooseHeadFrameIndex];
            this.UpdateHead(node, this.chooseHeadFrameIndex, true);
        }
        var i = parseInt(Global.PlayerData.headkuang) - 1;
        if (i >= 0) {
            // this.chooseBg.active = true;
            this.chooseGou.active = true;
            var x = this.xyGapArr[0] + this.xyGapArr[2] * (i % 3);
            var y = this.xyGapArr[1] - this.xyGapArr[3] * Math.floor(i / 3);
            this.chooseGou.x = x;
            this.chooseGou.y = y - 30;
            // this.chooseBg.x = x;
            // this.chooseBg.y = y -30;
        }
        else {
            // this.chooseBg.active = false;
            this.chooseGou.active = false;
        }
    };
    /**
     * 更新头像框
     * @param itemNode 头像节点
     * @param index 索引
     */
    HeadFrameLayerView.prototype.UpdateHead = function (itemNode, index, bChoose) {
        if (bChoose === void 0) { bChoose = false; }
        var headImg = "" + (index + 1);
        var sprite = cc.find("txk", itemNode).getComponent(cc.Sprite);
        var unlock = cc.find("unlock", itemNode);
        unlock.active = false;
        var unlocklab = cc.find("unlock_lab", unlock).getComponent(cc.Label);
        unlocklab.string = "vip" + headImg;
        if (Global.PlayerData.vip < index + 1) {
            unlock.active = true;
        }
        Global.Toolkit.loadLocalHeadFrame(sprite, headImg, false, true);
    };
    /**
     * 更新vip内容
     */
    HeadFrameLayerView.prototype.UpdateVip = function () {
        var showVip = this.showHeadFrameIndex + 1;
        if (showVip < 1) {
            showVip = 1;
        }
        if (this.model.vipExpArr.length <= showVip) {
            showVip = this.model.vipExpArr.length;
        }
        var headImg = "" + showVip;
        Global.Toolkit.loadLocalHeadFrame(this.spriteHeadFrameVip, headImg);
        Global.Toolkit.loadLocalVip(this.spriteVip, showVip);
        this.labelVip.string = "激活" + "VIP" + showVip + "即可获得";
    };
    /**
     * 头像框点击
     * @param target
     */
    HeadFrameLayerView.prototype.HeadBtnFunc = function (target) {
        var _this = this;
        var arr = target.name.split("_");
        var index = parseInt(arr[arr.length - 1]);
        this.showHeadFrameIndex = index;
        this.UpdateVip();
        var needVip = index + 1;
        if (Global.PlayerData.vip < needVip) {
            Global.UI.fastTip("头像框未拥有");
            return;
        }
        this.CancelChooseLastHead();
        this.chooseHeadFrameIndex = index;
        this.UpdateUI();
        var chooseHead = "" + (this.chooseHeadFrameIndex + 1);
        if (chooseHead != Global.PlayerData.headkuang) {
            //请求修改头像框
            var param = {};
            param.head = parseInt(chooseHead);
            this.model.reqSetSelfCfg(param, function () {
                Global.PlayerData.headkuang = chooseHead;
                _this.UpdateUI();
                // Global.UI.fastTip("修改头像框成功！");
            });
        }
    };
    /**
     * 取消选择之前的头像框
     */
    HeadFrameLayerView.prototype.CancelChooseLastHead = function () {
        if (this.chooseHeadFrameIndex >= 0) {
            var lastNode = this.itemNodeArr[this.chooseHeadFrameIndex];
            this.UpdateHead(lastNode, this.chooseHeadFrameIndex);
        }
    };
    HeadFrameLayerView.prototype.onDispose = function () {
        Global.Event.off(GlobalEvent.CHANGEVIP, this, this.updateUserInfo);
    };
    HeadFrameLayerView.prototype.onSubViewShow = function () {
        this.CancelChooseLastHead();
        this.spriteHeadVip.spriteFrame = Global.Toolkit.getLocalHeadSf(Global.PlayerData.headimg);
        this.chooseHeadFrameIndex = parseInt(Global.PlayerData.headkuang) - 1;
        this.showHeadFrameIndex = this.chooseHeadFrameIndex;
        this.UpdateUI();
        this.UpdateVip();
    };
    HeadFrameLayerView.prototype.updateUserInfo = function () {
        for (var i = 0; i < Global.PlayerData.vip; i++) {
            var node = this.itemNodeArr[i];
            if (node) {
                var unlock = cc.find("unlock", node);
                unlock.active = false;
            }
        }
    };
    return HeadFrameLayerView;
}(ViewBase_1.default));
exports.default = HeadFrameLayerView;

cc._RF.pop();