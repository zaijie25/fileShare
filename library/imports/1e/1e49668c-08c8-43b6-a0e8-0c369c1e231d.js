"use strict";
cc._RF.push(module, '1e496aMCMhDtqDoDDacHiMd', 'WndChooseHead');
// hall/scripts/logic/hall/ui/playerInfo/WndChooseHead.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var HeadLayerView_1 = require("./HeadLayerView");
var HeadFrameLayerView_1 = require("./HeadFrameLayerView");
var WndChooseHead = /** @class */ (function (_super) {
    __extends(WndChooseHead, _super);
    function WndChooseHead() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //头像
        _this.spriteHead = null;
        //头像框
        _this.spriteHeadFrame = null;
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
    /**
     * 初始化脚本
     */
    WndChooseHead.prototype.onInit = function () {
        this.name = "WndChooseHead";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/ChooseHeadUI";
        this.model = Global.ModelManager.getModel("PlayerInfoModel");
    };
    WndChooseHead.prototype.onDispose = function () {
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPersonInfo);
    };
    /**
     * 初始化UI
     */
    WndChooseHead.prototype.initView = function () {
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPersonInfo);
        this.addCommonClick("bg/close", this.closeBtnFunc, this);
        this.spriteHead = this.getComponent("headImg/headFrame", cc.Sprite);
        this.spriteHeadFrame = this.getComponent("headbox", cc.Sprite);
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
    WndChooseHead.prototype.UpdateUI = function () {
        for (var i = 0; i < 2; i++) {
            var bShow = (i == this.curViewIndex);
            var yeqianNode = this.yeqianArr[i * 2 + 1];
            yeqianNode.active = bShow;
        }
    };
    /**
     * 页签按钮点击
     * @param target
     */
    WndChooseHead.prototype.subViewBtnFunc = function (target) {
        var arr = target.node.name.split("_");
        var param = arr[arr.length - 1];
        var viewIndex = parseInt(param);
        this.changeView(viewIndex);
    };
    WndChooseHead.prototype.changeView = function (viewIndex) {
        if (this.curViewIndex != viewIndex) {
            this.curViewIndex = viewIndex;
            this.headLayerView.subViewState = this.curViewIndex == 0;
            this.headFrameLayerView.subViewState = this.curViewIndex == 1;
            this.UpdateUI();
        }
    };
    /**
     * 界面打开回调
     */
    WndChooseHead.prototype.onOpen = function () {
        this.model.reqGetUserInfo(null, null);
        this.refreshPersonInfo();
        this.changeView(0);
    };
    WndChooseHead.prototype.refreshPersonInfo = function () {
        if (Global.SceneManager.inGame()) {
            return;
        }
        var data = Global.PlayerData;
        this.spriteHead.spriteFrame = Global.Toolkit.getLocalHeadSf(data.headimg);
        //头像框设置
        Global.Toolkit.loadLocalHeadFrame(this.spriteHeadFrame, data.headkuang);
    };
    /**
     * 界面关闭回调
     */
    WndChooseHead.prototype.onClose = function () {
        this.curViewIndex = -1;
    };
    /**
     * 关闭按钮点击
     */
    WndChooseHead.prototype.closeBtnFunc = function () {
        this.close();
    };
    return WndChooseHead;
}(WndBase_1.default));
exports.default = WndChooseHead;

cc._RF.pop();