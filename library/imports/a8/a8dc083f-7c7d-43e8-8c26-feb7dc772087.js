"use strict";
cc._RF.push(module, 'a8dc0g/fH1D6Iwm/rfcdyCH', 'BbwzSelectChipsView');
// bbwz/Bbwz/scripts/subview/BbwzSelectChipsView.ts

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
var BbwzBaseView_1 = require("./BbwzBaseView");
var BbwzData_1 = require("../data/BbwzData");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzSkinDefine_1 = require("../data/BbwzSkinDefine");
var BbwzPathHelper_1 = require("../tool/BbwzPathHelper");
var BbwzSelectChipsView = /** @class */ (function (_super) {
    __extends(BbwzSelectChipsView, _super);
    function BbwzSelectChipsView(node) {
        var _this = _super.call(this) || this;
        _this.selectChipsArr = [];
        _this.curSelectIndex = 0;
        _this.isBetStage = false;
        _this.posArr = [];
        _this.setNode(node);
        return _this;
    }
    BbwzSelectChipsView.prototype.initView = function () {
        this.selectSk = this.getComponent("content/selectSk", sp.Skeleton);
        this.selectSk.node.setScale(BbwzSkinDefine_1.default.selectScale);
        for (var i = 0; i < 5; i++) {
            var node = this.getChild("content/chipNode_" + i);
            var item = new SelectItem(node, i, this.onChipBtnSelect, this);
            item.setItemSelect(false);
            item.showGrayMask(true);
            this.selectChipsArr.push(item);
            this.posArr.push(item.getWorldPos());
        }
        this.continueBtn = BbwzConstDefine_1.default.addCommonClick(this.node, "content/continueBtn", this.onBetContinue, this).getComponent(cc.Button);
        this.disableAllBetChipBtn();
        this.updateContinueBtn(false);
    };
    BbwzSelectChipsView.prototype.onChipBtnSelect = function (index) {
        if (this.selectChipsArr[this.curSelectIndex]) {
            this.selectChipsArr[this.curSelectIndex].setItemSelect(false);
        }
        this.curSelectIndex = index;
        var item = this.selectChipsArr[index];
        item.setItemSelect(true);
        this.setSelectSk(true, index);
        BbwzData_1.default.instance.currentSelectIndex = item.index;
    };
    BbwzSelectChipsView.prototype.onBetContinue = function () {
        BbwzConstDefine_1.default.playBtnSound();
        BbwzData_1.default.instance.reqContinueBet();
    };
    BbwzSelectChipsView.prototype.initChipListData = function () {
        var chipsData = BbwzData_1.default.instance.chipList;
        for (var i = 0; i < chipsData.length; i++) {
            var item = this.selectChipsArr[i];
            if (item) {
                item.updateIconStyle();
                item.nChip = chipsData[i];
                BbwzData_1.default.instance.selectChipWolrdPos[chipsData[i]] = this.posArr[i]; // 记录选项位置
            }
        }
    };
    // 设置筹码选中特效
    BbwzSelectChipsView.prototype.setSelectSk = function (isShow, index) {
        this.selectSk.node.active = isShow;
        if (isShow) {
            var item = this.selectChipsArr[index];
            var wPos = item.getWorldPos();
            this.selectSk.node.setPosition(this.selectSk.node.parent.convertToNodeSpaceAR(wPos).add(BbwzSkinDefine_1.default.selectChipOffset));
            this.selectSk.clearTracks();
            this.selectSk.setAnimation(0, BbwzSkinDefine_1.default.skBigChipIdleArr[index], true);
        }
    };
    /**
     * 失效所有筹码
     */
    BbwzSelectChipsView.prototype.disableAllBetChipBtn = function () {
        this.isBetStage = false;
        this.selectChipsArr.forEach(function (element) {
            element.showGrayMask(true);
            element.setItemSelect(false);
        });
        this.setSelectSk(false);
    };
    /**
     * 生效所有筹码
     */
    BbwzSelectChipsView.prototype.enableBetChipBtn = function () {
        this.isBetStage = true;
        this.selectChipsArr.forEach(function (element, index) {
            element.showGrayMask(false);
        });
        this.updateSelectBtn();
    };
    BbwzSelectChipsView.prototype.updateSelectBtn = function (looking) {
        if (looking === void 0) { looking = false; }
        if (!this.isBetStage) {
            return;
        }
        if (this.selectChipsArr[this.curSelectIndex]) {
            this.selectChipsArr[this.curSelectIndex].setItemSelect(false);
            this.setSelectSk(false);
        }
        var isFind = false;
        for (var i = this.selectChipsArr.length - 1; i >= 0; i--) {
            var btn = this.selectChipsArr[i];
            if (btn.isEnable) {
                btn.showGrayMask(false);
                if (looking && !isFind) {
                    this.curSelectIndex = i;
                    isFind = true;
                }
                if (this.curSelectIndex == i) {
                    BbwzData_1.default.instance.currentSelectIndex = btn.index;
                    btn.setItemSelect(true);
                    this.setSelectSk(true, btn.index);
                }
            }
            else {
                btn.setItemSelect(false);
                btn.showGrayMask(true);
            }
        }
    };
    /**
     * 设置筹码按钮是否有效
     * @param point 余额
     * @param leftLimit 剩余下注上限额
     * @param minLimit 下注下限额
     */
    BbwzSelectChipsView.prototype.checkBtnSelectActive = function (point, leftLimit, minLimit) {
        var isWorking = point >= minLimit;
        this.selectChipsArr.forEach(function (ele, index) {
            if (isWorking) {
                // ele.isEnable = ele.nChip <= point && ele.nChip <= leftLimit;
                ele.isEnable = ele.nChip <= point;
            }
            else {
                ele.isEnable = false;
            }
        });
        // let isFind = this.chipBtnList[this.curSelectIndex].nChip > point || this.chipBtnList[this.curSelectIndex].nChip > leftLimit;   // 当前所选筹码大于余额或者上限余额
        var isFind = this.selectChipsArr[this.curSelectIndex].nChip > point;
        // 余额不足会记录最后一次所选
        this.updateSelectBtn(isFind);
    };
    BbwzSelectChipsView.prototype.updateContinueBtn = function (isEnable) {
        // let isEnable: boolean = BbwzData.instance.canContinueBet();
        this.continueBtn.interactable = isEnable;
        Global.UIHelper.setNodeGray(this.continueBtn.node, !isEnable);
    };
    BbwzSelectChipsView.prototype.clearByRound = function () {
        this.disableAllBetChipBtn();
        this.updateContinueBtn(false);
    };
    return BbwzSelectChipsView;
}(BbwzBaseView_1.default));
exports.default = BbwzSelectChipsView;
var SelectItem = /** @class */ (function (_super) {
    __extends(SelectItem, _super);
    function SelectItem(node, index, callback, target) {
        var _this = _super.call(this) || this;
        _this.index = index;
        _this.callback = callback;
        _this.target = target;
        _this._nChip = 0;
        _this._enable = true;
        _this.selectScale = BbwzSkinDefine_1.default.selectScale;
        _this.setNode(node);
        return _this;
    }
    SelectItem.prototype.initView = function () {
        this.iconSp = this.getComponent("sprite_di", cc.Sprite);
        BbwzConstDefine_1.default.addCommonClick(this.node, "", this.onChipSelect, this, null);
        this.itemBtn = Global.UIHelper.safeGetComponent(this.node, "", cc.Button);
    };
    SelectItem.prototype.updateIconStyle = function () {
        var strArr = BbwzData_1.default.instance.getSelectChipsIconStr();
        Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.iconSp, BbwzPathHelper_1.default.gameTexturePath + "atlas/dynamic/atlas_dynamic", strArr[this.index], null, true);
    };
    SelectItem.prototype.onChipSelect = function () {
        Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_CHIP_CHANGE, true);
        if (this.isEnable && this.callback) {
            this.callback.call(this.target, this.index);
        }
    };
    SelectItem.prototype.setItemSelect = function (isSelect) {
        this.node.scale = isSelect && this.selectScale || 1;
    };
    SelectItem.prototype.showGrayMask = function (isShow) {
        if (this.isGray != isShow) {
            this.isGray = isShow;
            Global.UIHelper.setNodeGray(this.node, isShow);
            this.itemBtn.interactable = !isShow;
        }
    };
    Object.defineProperty(SelectItem.prototype, "nChip", {
        get: function () {
            return this._nChip;
        },
        set: function (num) {
            this._nChip = num;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectItem.prototype, "isEnable", {
        get: function () {
            return this._enable;
        },
        set: function (flag) {
            if (this._enable == flag)
                return;
            this._enable = flag;
        },
        enumerable: false,
        configurable: true
    });
    SelectItem.prototype.getWorldPos = function () {
        return this.node.convertToWorldSpaceAR(this.iconSp.node.position);
    };
    return SelectItem;
}(BbwzBaseView_1.default));

cc._RF.pop();