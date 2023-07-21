
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/subview/BbwzSelectChipsView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcc3Vidmlld1xcQmJ3elNlbGVjdENoaXBzVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMEM7QUFDMUMsNkNBQXdDO0FBQ3hDLDJEQUFzRDtBQUN0RCx5REFBb0Q7QUFDcEQseURBQW9EO0FBRXBEO0lBQWlELHVDQUFZO0lBUXpELDZCQUFZLElBQWE7UUFBekIsWUFDSSxpQkFBTyxTQUVWO1FBVk8sb0JBQWMsR0FBaUIsRUFBRSxDQUFDO1FBQ2xDLG9CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLGdCQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFlBQU0sR0FBRyxFQUFFLENBQUM7UUFNaEIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLHNDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBZ0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEQsS0FBSSxJQUFJLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQyxHQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQztZQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2xELElBQUksSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFD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QUMsQ0FBQztJQUN4RCxDQUFDO0lBRU0saUNBQVksR0FBbkIsVUFBb0IsTUFBZTtRQUMvQixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsQ0FBQyxNQUFNLENBQUM7U0FDdkM7SUFDTCxDQUFDO0lBRUQsc0JBQVcsNkJBQUs7YUFJaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzthQU5ELFVBQWlCLEdBQVc7WUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFNRCxzQkFBVyxnQ0FBUTthQU1uQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDO2FBUkQsVUFBb0IsSUFBYTtZQUM3QixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSTtnQkFDcEIsT0FBTztZQUNYLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBTU0sZ0NBQVcsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0EvREEsQUErREMsQ0EvRHdCLHNCQUFZLEdBK0RwQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYnd6QmFzZVZpZXcgZnJvbSBcIi4vQmJ3ekJhc2VWaWV3XCI7XHJcbmltcG9ydCBCYnd6RGF0YSBmcm9tIFwiLi4vZGF0YS9CYnd6RGF0YVwiO1xyXG5pbXBvcnQgQmJ3ekNvbnN0RGVmaW5lIGZyb20gXCIuLi9kYXRhL0Jid3pDb25zdERlZmluZVwiO1xyXG5pbXBvcnQgQmJ3elNraW5EZWZpbmUgZnJvbSBcIi4uL2RhdGEvQmJ3elNraW5EZWZpbmVcIjtcclxuaW1wb3J0IEJid3pQYXRoSGVscGVyIGZyb20gXCIuLi90b29sL0Jid3pQYXRoSGVscGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYnd6U2VsZWN0Q2hpcHNWaWV3IGV4dGVuZHMgQmJ3ekJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSBzZWxlY3RDaGlwc0FycjogU2VsZWN0SXRlbVtdID0gW107XHJcbiAgICBwcml2YXRlIGN1clNlbGVjdEluZGV4ID0gMDtcclxuICAgIHByaXZhdGUgaXNCZXRTdGFnZSA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBwb3NBcnIgPSBbXTtcclxuICAgIHByaXZhdGUgc2VsZWN0U2s6IHNwLlNrZWxldG9uO1xyXG4gICAgcHJpdmF0ZSBjb250aW51ZUJ0bjogY2MuQnV0dG9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0U2sgPSA8c3AuU2tlbGV0b24+dGhpcy5nZXRDb21wb25lbnQoXCJjb250ZW50L3NlbGVjdFNrXCIsIHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLnNlbGVjdFNrLm5vZGUuc2V0U2NhbGUoQmJ3elNraW5EZWZpbmUuc2VsZWN0U2NhbGUpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaTwgNTsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmdldENoaWxkKFwiY29udGVudC9jaGlwTm9kZV9cIiArIGkpO1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IG5ldyBTZWxlY3RJdGVtKG5vZGUsIGksIHRoaXMub25DaGlwQnRuU2VsZWN0LCB0aGlzKTtcclxuICAgICAgICAgICAgaXRlbS5zZXRJdGVtU2VsZWN0KGZhbHNlKTtcclxuICAgICAgICAgICAgaXRlbS5zaG93R3JheU1hc2sodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2hpcHNBcnIucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5wb3NBcnIucHVzaChpdGVtLmdldFdvcmxkUG9zKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbnRpbnVlQnRuID0gQmJ3ekNvbnN0RGVmaW5lLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJjb250ZW50L2NvbnRpbnVlQnRuXCIsIHRoaXMub25CZXRDb250aW51ZSwgdGhpcykuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlQWxsQmV0Q2hpcEJ0bigpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ29udGludWVCdG4oZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DaGlwQnRuU2VsZWN0KGluZGV4OiBudW1iZXIpe1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdENoaXBzQXJyW3RoaXMuY3VyU2VsZWN0SW5kZXhdKXtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RDaGlwc0Fyclt0aGlzLmN1clNlbGVjdEluZGV4XS5zZXRJdGVtU2VsZWN0KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJTZWxlY3RJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGxldCBpdGVtID0gdGhpcy5zZWxlY3RDaGlwc0FycltpbmRleF07XHJcbiAgICAgICAgaXRlbS5zZXRJdGVtU2VsZWN0KHRydWUpO1xyXG4gICAgICAgIHRoaXMuc2V0U2VsZWN0U2sodHJ1ZSwgaW5kZXgpO1xyXG5cclxuICAgICAgICBCYnd6RGF0YS5pbnN0YW5jZS5jdXJyZW50U2VsZWN0SW5kZXggPSBpdGVtLmluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CZXRDb250aW51ZSgpe1xyXG4gICAgICAgIEJid3pDb25zdERlZmluZS5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICBCYnd6RGF0YS5pbnN0YW5jZS5yZXFDb250aW51ZUJldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0Q2hpcExpc3REYXRhKCl7XHJcbiAgICAgICAgbGV0IGNoaXBzRGF0YSA9IEJid3pEYXRhLmluc3RhbmNlLmNoaXBMaXN0O1xyXG4gICAgICAgIGZvciAobGV0IGk9IDA7IGkgPCBjaGlwc0RhdGEubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2VsZWN0Q2hpcHNBcnJbaV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtKXtcclxuICAgICAgICAgICAgICAgIGl0ZW0udXBkYXRlSWNvblN0eWxlKCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm5DaGlwID0gY2hpcHNEYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2Uuc2VsZWN0Q2hpcFdvbHJkUG9zW2NoaXBzRGF0YVtpXV0gPSB0aGlzLnBvc0FycltpXTsgICAgIC8vIOiusOW9lemAiemhueS9jee9rlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiuvue9ruetueeggemAieS4reeJueaViFxyXG4gICAgcHJpdmF0ZSBzZXRTZWxlY3RTayhpc1Nob3c6IGJvb2xlYW4sIGluZGV4PzogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLnNlbGVjdFNrLm5vZGUuYWN0aXZlID0gaXNTaG93O1xyXG4gICAgICAgIGlmIChpc1Nob3cpe1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuc2VsZWN0Q2hpcHNBcnJbaW5kZXhdO1xyXG4gICAgICAgICAgICBsZXQgd1BvcyA9IGl0ZW0uZ2V0V29ybGRQb3MoKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RTay5ub2RlLnNldFBvc2l0aW9uKHRoaXMuc2VsZWN0U2subm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIod1BvcykuYWRkKEJid3pTa2luRGVmaW5lLnNlbGVjdENoaXBPZmZzZXQpKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RTay5jbGVhclRyYWNrcygpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFNrLnNldEFuaW1hdGlvbigwLCBCYnd6U2tpbkRlZmluZS5za0JpZ0NoaXBJZGxlQXJyW2luZGV4XSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aSx5pWI5omA5pyJ562556CBXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkaXNhYmxlQWxsQmV0Q2hpcEJ0bigpe1xyXG4gICAgICAgIHRoaXMuaXNCZXRTdGFnZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q2hpcHNBcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5zaG93R3JheU1hc2sodHJ1ZSk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0SXRlbVNlbGVjdChmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RTayhmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/mlYjmiYDmnInnrbnnoIFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuYWJsZUJldENoaXBCdG4oKXtcclxuICAgICAgICB0aGlzLmlzQmV0U3RhZ2UgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q2hpcHNBcnIuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5zaG93R3JheU1hc2soZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0QnRuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNlbGVjdEJ0bihsb29raW5nOiBib29sZWFuID0gZmFsc2Upe1xyXG4gICAgICAgIGlmICghdGhpcy5pc0JldFN0YWdlKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0Q2hpcHNBcnJbdGhpcy5jdXJTZWxlY3RJbmRleF0pe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdENoaXBzQXJyW3RoaXMuY3VyU2VsZWN0SW5kZXhdLnNldEl0ZW1TZWxlY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdFNrKGZhbHNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpc0ZpbmQgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpPSB0aGlzLnNlbGVjdENoaXBzQXJyLmxlbmd0aC0xOyBpID49MDsgaS0tKXtcclxuICAgICAgICAgICAgbGV0IGJ0biA9IHRoaXMuc2VsZWN0Q2hpcHNBcnJbaV07XHJcbiAgICAgICAgICAgIGlmIChidG4uaXNFbmFibGUpe1xyXG4gICAgICAgICAgICAgICAgYnRuLnNob3dHcmF5TWFzayhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9va2luZyAmJiAhaXNGaW5kKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1clNlbGVjdEluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBpc0ZpbmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyU2VsZWN0SW5kZXggPT0gaSl7XHJcbiAgICAgICAgICAgICAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2UuY3VycmVudFNlbGVjdEluZGV4ID0gYnRuLmluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5zZXRJdGVtU2VsZWN0KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0U2sodHJ1ZSwgYnRuLmluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgYnRuLnNldEl0ZW1TZWxlY3QoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnRuLnNob3dHcmF5TWFzayh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruetueeggeaMiemSruaYr+WQpuacieaViFxyXG4gICAgICogQHBhcmFtIHBvaW50IOS9meminVxyXG4gICAgICogQHBhcmFtIGxlZnRMaW1pdCDliankvZnkuIvms6jkuIrpmZDpop1cclxuICAgICAqIEBwYXJhbSBtaW5MaW1pdCDkuIvms6jkuIvpmZDpop1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoZWNrQnRuU2VsZWN0QWN0aXZlKHBvaW50OiBudW1iZXIsIGxlZnRMaW1pdDogbnVtYmVyLCBtaW5MaW1pdDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgaXNXb3JraW5nID0gcG9pbnQgPj0gbWluTGltaXQ7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDaGlwc0Fyci5mb3JFYWNoKChlbGUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpc1dvcmtpbmcpe1xyXG4gICAgICAgICAgICAgICAgLy8gZWxlLmlzRW5hYmxlID0gZWxlLm5DaGlwIDw9IHBvaW50ICYmIGVsZS5uQ2hpcCA8PSBsZWZ0TGltaXQ7XHJcbiAgICAgICAgICAgICAgICBlbGUuaXNFbmFibGUgPSBlbGUubkNoaXAgPD0gcG9pbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGVsZS5pc0VuYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gbGV0IGlzRmluZCA9IHRoaXMuY2hpcEJ0bkxpc3RbdGhpcy5jdXJTZWxlY3RJbmRleF0ubkNoaXAgPiBwb2ludCB8fCB0aGlzLmNoaXBCdG5MaXN0W3RoaXMuY3VyU2VsZWN0SW5kZXhdLm5DaGlwID4gbGVmdExpbWl0OyAgIC8vIOW9k+WJjeaJgOmAieetueeggeWkp+S6juS9memineaIluiAheS4iumZkOS9meminVxyXG4gICAgICAgIGxldCBpc0ZpbmQgPSB0aGlzLnNlbGVjdENoaXBzQXJyW3RoaXMuY3VyU2VsZWN0SW5kZXhdLm5DaGlwID4gcG9pbnQ7XHJcbiAgICAgICAgLy8g5L2Z6aKd5LiN6Laz5Lya6K6w5b2V5pyA5ZCO5LiA5qyh5omA6YCJXHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RCdG4oaXNGaW5kKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlQ29udGludWVCdG4oaXNFbmFibGU6IGJvb2xlYW4pe1xyXG4gICAgICAgIC8vIGxldCBpc0VuYWJsZTogYm9vbGVhbiA9IEJid3pEYXRhLmluc3RhbmNlLmNhbkNvbnRpbnVlQmV0KCk7XHJcbiAgICAgICAgdGhpcy5jb250aW51ZUJ0bi5pbnRlcmFjdGFibGUgPSBpc0VuYWJsZTtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuc2V0Tm9kZUdyYXkodGhpcy5jb250aW51ZUJ0bi5ub2RlLCAhaXNFbmFibGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5Um91bmQoKXtcclxuICAgICAgICB0aGlzLmRpc2FibGVBbGxCZXRDaGlwQnRuKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb250aW51ZUJ0bihmYWxzZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNlbGVjdEl0ZW0gZXh0ZW5kcyBCYnd6QmFzZVZpZXd7XHJcbiAgICBwcml2YXRlIGljb25TcDogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBfbkNoaXAgPSAwO1xyXG4gICAgcHJpdmF0ZSBfZW5hYmxlID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgaXRlbUJ0bjogY2MuQnV0dG9uO1xyXG4gICAgcHJpdmF0ZSBpc0dyYXk6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHNlbGVjdFNjYWxlID0gQmJ3elNraW5EZWZpbmUuc2VsZWN0U2NhbGU7XHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlLCBwdWJsaWMgaW5kZXg6IG51bWJlciwgcHJpdmF0ZSBjYWxsYmFjazogRnVuY3Rpb24sIHByaXZhdGUgdGFyZ2V0OiBhbnkpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMuaWNvblNwID0gPGNjLlNwcml0ZT50aGlzLmdldENvbXBvbmVudChcInNwcml0ZV9kaVwiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIEJid3pDb25zdERlZmluZS5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiXCIsIHRoaXMub25DaGlwU2VsZWN0LCB0aGlzLCBudWxsKTtcclxuICAgICAgICB0aGlzLml0ZW1CdG4gPSBHbG9iYWwuVUlIZWxwZXIuc2FmZUdldENvbXBvbmVudCh0aGlzLm5vZGUsIFwiXCIsIGNjLkJ1dHRvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUljb25TdHlsZSgpe1xyXG4gICAgICAgIGxldCBzdHJBcnIgPSBCYnd6RGF0YS5pbnN0YW5jZS5nZXRTZWxlY3RDaGlwc0ljb25TdHIoKTtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRCdW5kbGVBdXRvQXRsYXMoQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQsdGhpcy5pY29uU3AsIEJid3pQYXRoSGVscGVyLmdhbWVUZXh0dXJlUGF0aCArIFwiYXRsYXMvZHluYW1pYy9hdGxhc19keW5hbWljXCIsIHN0ckFyclt0aGlzLmluZGV4XSwgbnVsbCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoaXBTZWxlY3QoKXtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ1bmRsZVNvdW5kKEJid3pDb25zdERlZmluZS5HQU1FX0lELEJid3pDb25zdERlZmluZS5TT1VORF9DSElQX0NIQU5HRSwgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGUgJiYgdGhpcy5jYWxsYmFjayl7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2suY2FsbCh0aGlzLnRhcmdldCwgdGhpcy5pbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJdGVtU2VsZWN0KGlzU2VsZWN0OiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSBpc1NlbGVjdCAmJiB0aGlzLnNlbGVjdFNjYWxlIHx8IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dHcmF5TWFzayhpc1Nob3c6IGJvb2xlYW4pe1xyXG4gICAgICAgIGlmICh0aGlzLmlzR3JheSAhPSBpc1Nob3cpe1xyXG4gICAgICAgICAgICB0aGlzLmlzR3JheSA9IGlzU2hvdztcclxuICAgICAgICAgICAgR2xvYmFsLlVJSGVscGVyLnNldE5vZGVHcmF5KHRoaXMubm9kZSwgaXNTaG93KTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtQnRuLmludGVyYWN0YWJsZSA9ICFpc1Nob3c7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgbkNoaXAobnVtOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuX25DaGlwID0gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbkNoaXAoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbkNoaXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpc0VuYWJsZShmbGFnOiBib29sZWFuKXtcclxuICAgICAgICBpZiAodGhpcy5fZW5hYmxlID09IGZsYWcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl9lbmFibGUgPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNFbmFibGUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRXb3JsZFBvcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMuaWNvblNwLm5vZGUucG9zaXRpb24pO1xyXG4gICAgfVxyXG59Il19