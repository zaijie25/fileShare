
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/subView/DdzSelfPlayView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9dd414xYh5ItroUDcog/2Rd', 'DdzSelfPlayView');
// ddz/ddz/scripts/subView/DdzSelfPlayView.ts

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
exports.DdzSelfPlayView = void 0;
var DdzBaseView_1 = require("./DdzBaseView");
var DdzPathHelper_1 = require("../data/DdzPathHelper");
var DdzRuleConst_1 = require("../data/DdzRuleConst");
var DdzDriver_1 = require("../DdzDriver");
var DdzGameConst_1 = require("../data/DdzGameConst");
/**
 * 出牌的view
 */
var DdzSelfPlayView = /** @class */ (function (_super) {
    __extends(DdzSelfPlayView, _super);
    function DdzSelfPlayView(node) {
        var _this = _super.call(this) || this;
        _this.offsetX = -87.5;
        _this.targetPokerList = [];
        _this.validPokers = [];
        _this.pokerValueList = [];
        _this.pokerHandList = [];
        _this.handSpaceX = 45;
        _this.PokerPool = DdzDriver_1.default.instance.PokerPool;
        _this.setNode(node);
        return _this;
    }
    Object.defineProperty(DdzSelfPlayView.prototype, "validPokersCount", {
        get: function () { return this.validPokers.length; },
        enumerable: false,
        configurable: true
    });
    DdzSelfPlayView.prototype.initView = function () {
        var _this = this;
        _super.prototype.initView.call(this);
        this.touchLayer = this.getChild('touchLayer');
        this.touchLayer.width = cc.Canvas.instance.node.width;
        DdzGameConst_1.default.addCommonClick(this.touchLayer, "", function () {
            Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.CancelSelect, true);
            _this.resetPokers();
            DdzDriver_1.default.instance.PlayRuleHelper.resetRecommendGen();
        }, this);
        this.handPokerNode = this.getChild('handPoker');
        this.initPokerHand();
        this.initChooseFunction();
    };
    DdzSelfPlayView.prototype.initPokerHand = function () {
        var count = 20;
        var pokerArr = this.PokerPool.getItemArr(count);
        var posArr = this.getIndexPosArr(count);
        for (var i = 0; i < count; i++) {
            var pos = posArr[i];
            var poker = pokerArr[i];
            poker.node.setParent(this.handPokerNode);
            poker.setPokerPosition(pos);
            poker.active = false;
            this.pokerHandList.push(poker);
        }
    };
    DdzSelfPlayView.prototype.initChooseFunction = function () {
        var _a;
        if (this.pokerHandList.length <= 0)
            return;
        _a = this.pokerHandList[0].getPokerSize(), this.maxWidth = _a[0], this.maxHeight = _a[1];
        this.handPokerNode.height = this.maxHeight + this.Define.ChooseOffsetY;
        this.setValidPokers();
    };
    DdzSelfPlayView.prototype.readyForChoose = function (isReady) {
        if (isReady) {
            // handPokerLayout大小要固定
            this.handPokerNode.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
            this.handPokerNode.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
            this.handPokerNode.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
            this.handPokerNode.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd, this);
        }
        else {
            this.handPokerNode.targetOff(this);
        }
    };
    DdzSelfPlayView.prototype.getIndexPosArr = function (count, isWorld) {
        if (isWorld === void 0) { isWorld = false; }
        var tmp = [];
        for (var i = 0; i < count; i++) {
            var pos = cc.v2((i - Math.ceil(count / 2 - 1)) * this.handSpaceX, 0);
            if (isWorld)
                pos = this.handPokerNode.convertToWorldSpaceAR(pos);
            tmp.push(pos);
        }
        return tmp;
    };
    DdzSelfPlayView.prototype.layoutHandPokers = function () {
        this.setValidPokers();
        var count = this.validPokers.length;
        var posArr = this.getIndexPosArr(count);
        for (var i = 0; i < this.validPokers.length; i++) {
            var poker = this.validPokers[i];
            poker.setPokerPosition(posArr[i]);
            poker.setPokerDealPosX();
            poker.nowIndex = i;
        }
    };
    DdzSelfPlayView.prototype.setGroupPokersValue = function (arr) {
        if (arr === void 0) { arr = []; }
        this.pokerValueList = this.PokerHelper.sortPokerArr(arr);
    };
    DdzSelfPlayView.prototype.showDealPokerIndex = function (index, count) {
        var posArr = this.getIndexPosArr(count);
        this.pokerHandList[index].active = true;
        this.pokerHandList[index].isFront = true;
        this.pokerHandList[index].setPokerPosition(posArr[index]);
        this.pokerHandList[index].setPokerDealPos();
        if (this.pokerValueList[index])
            this.pokerHandList[index].pokerValue = this.pokerValueList[index];
    };
    DdzSelfPlayView.prototype.showLandlordPoker = function (arr) {
        var _this = this;
        if (arr === void 0) { arr = []; }
        this.pokerValueList = this.PokerHelper.sortPokerArr(this.pokerValueList.concat(arr));
        var cfg = DdzRuleConst_1.default.ModeConfig[this.Context.mode];
        var handCount = cfg.baseCount + cfg.leftCount;
        // if (this.pokerHandList.length != 20) {
        //     Logger.error('地主手牌数量异常');
        //     return;
        // }
        this.resetPokers();
        var posArr = this.getIndexPosArr(handCount);
        for (var i = 0; i < this.pokerHandList.length; i++) {
            if (i < handCount) {
                var poker = this.pokerHandList[i];
                var value = this.pokerValueList[i];
                poker.active = true;
                poker.isFront = true;
                poker.pokerValue = value;
                poker.setPokerPosition(posArr[i]);
                poker.setPokerDealPos();
                if (arr.indexOf(value) > -1) {
                    var pos = poker.node.position;
                    poker.doPokerMove(pos, cc.v3(pos.x, pos.y + this.Define.ChooseOffsetY), 0.1);
                }
            }
        }
        this.setValidPokers();
        Game.Component.scheduleOnce(function () {
            for (var i = 0; i < _this.pokerHandList.length; i++) {
                var poker = _this.pokerHandList[i];
                poker.resetSelect();
            }
            _this.Context.clearSelectPokerCache();
        }, this.Define.FlyDzIcon);
    };
    // 每局牌变动（包括地主牌） 需要设置下validPokers
    DdzSelfPlayView.prototype.setValidPokers = function () {
        this.validPokers = [];
        this.validPokers = this.pokerHandList.filter(function (poker) {
            return poker.checkPokerValid();
        });
        this.validPokers.forEach(function (poker, index) {
            poker.setPokerDealPosX(); // debug setPokerDealPos已选中牌会导致 y设置默认坐标错误，故只需设置setPokerDealPosX
            poker.nowIndex = index;
        });
        this.showDzOwnerSign();
    };
    DdzSelfPlayView.prototype.touchStart = function (event) {
        this.toucheEnable = true;
        var touchPos = event.getLocation();
        this.startIndex = this.getChoosePokerIndex(touchPos);
        // console.error("touchStart", this.startIndex);
        if (this.startIndex > -1) {
            this.targetPokerList = [];
            this.targetPokerList.push(this.validPokers[this.startIndex]);
        }
        else {
            this.toucheEnable = false;
            this.resetPokers();
        }
    };
    DdzSelfPlayView.prototype.touchMove = function (event) {
        if (!this.toucheEnable)
            return;
        var touchPos = event.getLocation();
        this.endIndex = this.getChoosePokerIndex(touchPos);
        // console.error("touchMove", touchPos.toString(), this.endIndex);
        if (this.endIndex == -1) {
            return;
        }
        if ((this.startIndex >= 0 && this.endIndex >= 0)) {
            var _a = [Math.min(this.startIndex, this.endIndex), Math.max(this.startIndex, this.endIndex)], min = _a[0], max = _a[1];
            this.targetPokerList = [];
            for (var i = 0; i < this.validPokers.length; i++) {
                var poker = this.validPokers[i];
                if (i <= max && i >= min) {
                    this.targetPokerList.push(poker);
                    poker.setDragSign(true);
                }
                else {
                    poker.setDragSign(false);
                }
            }
        }
    };
    DdzSelfPlayView.prototype.touchEnd = function (event) {
        var _this = this;
        // console.error("touchEnd", this.targetPokerList.length);
        var touchPos = event.getLocation();
        this.endIndex = this.getChoosePokerIndex(touchPos);
        if (this.endIndex == -1) { // 滑动区域外留出额外的有效区域
            var curX = touchPos.x;
            var startX = event.getStartLocation().x;
            var delta = (curX - startX) > 0 ? 1 : -1;
            this.endIndex = this.getChoosePokerIndex(cc.v2(touchPos.x - delta * this.Define.PokerSlideValidOffsetX, touchPos.y));
        }
        if (this.targetPokerList.length > 0) {
            Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.SelectPoker, true);
        }
        else {
            Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.CancelSelect, true);
        }
        var curArr = [];
        this.targetPokerList.forEach(function (poker) {
            curArr.push(poker.pokerValue);
            poker.setDragSign(false);
            if (_this.endIndex > -1) { // 结束落点不在牌上，本次滑动不处理
                poker.onSelect(true);
                if (poker.isSelect) {
                    _this.Context.addSelectPoker(poker.pokerValue, poker.nowIndex);
                }
                else {
                    _this.Context.removeSelectPoker(poker.pokerValue, poker.nowIndex);
                }
            }
        });
        // 检测选牌中包含顺子就指定
        var wantMap = this.PlayRuleHelper.searchStraight(curArr);
        if (wantMap && !Global.Toolkit.isEmptyObject(wantMap)) {
            this.resetPokers();
            for (var key in wantMap) {
                if (wantMap[key]) {
                    var poker = this.targetPokerList[Number(key)];
                    if (poker && poker.checkPokerValid()) {
                        if (!poker.isSelect) {
                            poker.onSelect(true);
                        }
                        this.Context.addSelectPoker(poker.pokerValue, poker.nowIndex);
                    }
                }
            }
        }
        this.onReset();
    };
    DdzSelfPlayView.prototype.onReset = function () {
        this.toucheEnable = false;
        this.startIndex = -1;
        this.endIndex = -1;
        this.targetPokerList = [];
    };
    DdzSelfPlayView.prototype.getChoosePokerIndex = function (pos) {
        for (var i = 0; i < this.validPokersCount; i++) {
            var pokerPos = this.validPokers[i].getWorldPosition();
            var posX = pokerPos.x;
            if (!this.validPokers[i].checkIsTouch(pos)) // 可以优化
                continue;
            if (i == this.validPokersCount - 1) {
                if (pos.x > (posX - this.maxWidth / 2) && pos.x < (posX + this.maxWidth / 2)) {
                    return i;
                }
            }
            if (pos.x > (posX - this.maxWidth / 2) && pos.x < (posX + this.maxWidth / 2 + this.offsetX)) {
                return i;
            }
        }
        return -1;
    };
    DdzSelfPlayView.prototype.resetPokers = function () {
        this.validPokers.forEach(function (poker) {
            poker.setDragSign(false);
            if (poker.isSelect) {
                poker.onSelect();
            }
        });
        this.Context.clearSelectPokerCache();
    };
    DdzSelfPlayView.prototype.hideAllPokers = function () {
        this.pokerHandList.forEach(function (poker) {
            poker.active = false;
            if (poker.isSelect) {
                poker.onSelect();
            }
            poker.reset();
        });
    };
    DdzSelfPlayView.prototype.onPlayPokers = function (selectMap) {
        if (selectMap === void 0) { selectMap = {}; }
        for (var key in selectMap) {
            if (selectMap[key]) {
                var poker = this.validPokers[Number(key)];
                if (poker && poker.checkPokerValid())
                    poker.active = false;
            }
        }
        this.layoutHandPokers();
    };
    DdzSelfPlayView.prototype.onPromptPokers = function (pokerMap) {
        if (pokerMap === void 0) { pokerMap = {}; }
        this.resetPokers();
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.SelectPoker, true);
        for (var key in pokerMap) {
            if (pokerMap[key]) {
                var poker = this.validPokers[Number(key)];
                if (poker && poker.checkPokerValid()) {
                    if (!poker.isSelect) {
                        poker.onSelect(true);
                    }
                    this.Context.addSelectPoker(poker.pokerValue, poker.nowIndex);
                }
            }
        }
    };
    DdzSelfPlayView.prototype.showDzOwnerSign = function () {
        var dzLocalSeat = this.Context.get(this.Define.FieldDzLocSeat);
        if (dzLocalSeat == 0 && this.validPokersCount > 0) {
            this.validPokers[this.validPokers.length - 1].setDzOwner(true);
        }
    };
    DdzSelfPlayView.prototype.getPokerArrMap = function (arr) {
        if (arr === void 0) { arr = []; }
        var tmp = {};
        this.validPokers.forEach(function (poker, index) {
            if (arr.indexOf(poker.pokerValue) > -1)
                tmp[index] = poker.pokerValue;
        });
        return tmp;
    };
    /**
     * 用于手动出牌和自动出牌临界状态时刷新手牌
     */
    DdzSelfPlayView.prototype.refreshHandPokersOnErr = function () {
        var _this = this;
        this.Context.clearSelectPokerCache();
        this.hideAllPokers();
        var leftPokers = this.Context.getSelfHandPokers();
        var count = leftPokers.length;
        this.setGroupPokersValue(leftPokers);
        leftPokers.forEach(function (value, index) {
            _this.showDealPokerIndex(index, count);
        });
        this.layoutHandPokers();
    };
    DdzSelfPlayView.prototype.clearByRound = function () {
        this.resetPokers();
        this.hideAllPokers();
        this.PlayRuleHelper.clearRecommend();
    };
    DdzSelfPlayView.prototype.clearByGame = function () {
        this.readyForChoose(false);
        this.clearByRound();
    };
    return DdzSelfPlayView;
}(DdzBaseView_1.default));
exports.DdzSelfPlayView = DdzSelfPlayView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHN1YlZpZXdcXERkelNlbGZQbGF5Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXdDO0FBR3hDLHVEQUFzRDtBQUN0RCxxREFBNkQ7QUFDN0QsMENBQXFDO0FBQ3JDLHFEQUFnRDtBQUVoRDs7R0FFRztBQUNIO0lBQXFDLG1DQUFXO0lBaUI1Qyx5QkFBWSxJQUFhO1FBQXpCLFlBQ0ksaUJBQU8sU0FHVjtRQW5CTyxhQUFPLEdBQVcsQ0FBQyxJQUFJLENBQUM7UUFNeEIscUJBQWUsR0FBbUIsRUFBRSxDQUFDO1FBQ3JDLGlCQUFXLEdBQW1CLEVBQUUsQ0FBQztRQUVqQyxvQkFBYyxHQUFhLEVBQUUsQ0FBQztRQUU5QixtQkFBYSxHQUFtQixFQUFFLENBQUM7UUFFbkMsZ0JBQVUsR0FBRyxFQUFFLENBQUM7UUFJcEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDOUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQVRELHNCQUFZLDZDQUFnQjthQUE1QixjQUFpQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFXeEQsa0NBQVEsR0FBbEI7UUFBQSxpQkFZQztRQVhHLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RELHNCQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFO1lBQzdDLE1BQU0s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VSxDQUFDLENBQUM7UUFDckMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBRSxLQUFLO1lBQzVCLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sc0NBQVksR0FBbkI7UUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVNLHFDQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0F6V0EsQUF5V0MsQ0F6V29DLHFCQUFXLEdBeVcvQztBQXpXWSwwQ0FBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpCYXNlVmlldyBmcm9tIFwiLi9EZHpCYXNlVmlld1wiO1xyXG5pbXBvcnQgRGR6UG9rZXJWaWV3IGZyb20gXCIuL0RkelBva2VyVmlld1wiO1xyXG5pbXBvcnQgRGR6UG9rZXJQb29sIGZyb20gXCIuLi90b29sL0RkelBva2VyUG9vbFwiO1xyXG5pbXBvcnQgeyBEZHpBdWRpb0NvbnN0IH0gZnJvbSBcIi4uL2RhdGEvRGR6UGF0aEhlbHBlclwiO1xyXG5pbXBvcnQgRGR6UnVsZUNvbnN0LCB7IERkek1vZGUgfSBmcm9tIFwiLi4vZGF0YS9EZHpSdWxlQ29uc3RcIjtcclxuaW1wb3J0IERkekRyaXZlciBmcm9tIFwiLi4vRGR6RHJpdmVyXCI7XHJcbmltcG9ydCBEZHpHYW1lQ29uc3QgZnJvbSBcIi4uL2RhdGEvRGR6R2FtZUNvbnN0XCI7XHJcblxyXG4vKipcclxuICog5Ye654mM55qEdmlld1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERkelNlbGZQbGF5VmlldyBleHRlbmRzIERkekJhc2VWaWV3IHtcclxuICAgIHByaXZhdGUgdG91Y2hMYXllcjogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgb2Zmc2V0WDogbnVtYmVyID0gLTg3LjU7XHJcbiAgICBwcml2YXRlIG1heFdpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1heEhlaWdodDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB0b3VjaGVFbmFibGU6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHN0YXJ0SW5kZXg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgZW5kSW5kZXg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdGFyZ2V0UG9rZXJMaXN0OiBEZHpQb2tlclZpZXdbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSB2YWxpZFBva2VyczogRGR6UG9rZXJWaWV3W10gPSBbXTtcclxuICAgIHByaXZhdGUgaGFuZFBva2VyTm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgcG9rZXJWYWx1ZUxpc3Q6IG51bWJlcltdID0gW107XHJcbiAgICBwcml2YXRlIGdldCB2YWxpZFBva2Vyc0NvdW50KCkgeyByZXR1cm4gdGhpcy52YWxpZFBva2Vycy5sZW5ndGg7IH1cclxuICAgIHByaXZhdGUgcG9rZXJIYW5kTGlzdDogRGR6UG9rZXJWaWV3W10gPSBbXTtcclxuICAgIHByaXZhdGUgUG9rZXJQb29sOiBEZHpQb2tlclBvb2w7XHJcbiAgICBwcml2YXRlIGhhbmRTcGFjZVggPSA0NTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlBva2VyUG9vbCA9IERkekRyaXZlci5pbnN0YW5jZS5Qb2tlclBvb2w7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICBzdXBlci5pbml0VmlldygpO1xyXG4gICAgICAgIHRoaXMudG91Y2hMYXllciA9IHRoaXMuZ2V0Q2hpbGQoJ3RvdWNoTGF5ZXInKTtcclxuICAgICAgICB0aGlzLnRvdWNoTGF5ZXIud2lkdGggPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS53aWR0aDtcclxuICAgICAgICBEZHpHYW1lQ29uc3QuYWRkQ29tbW9uQ2xpY2sodGhpcy50b3VjaExheWVyLCBcIlwiLCAoKT0+e1xyXG4gICAgICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVTb3VuZChEZHpBdWRpb0NvbnN0LmF1ZGlvQ29tbW9uUGF0aCArIERkekF1ZGlvQ29uc3QuQ2FuY2VsU2VsZWN0LCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNldFBva2VycygpO1xyXG4gICAgICAgICAgICBEZHpEcml2ZXIuaW5zdGFuY2UuUGxheVJ1bGVIZWxwZXIucmVzZXRSZWNvbW1lbmRHZW4oKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRQb2tlck5vZGUgPSB0aGlzLmdldENoaWxkKCdoYW5kUG9rZXInKTtcclxuICAgICAgICB0aGlzLmluaXRQb2tlckhhbmQoKTtcclxuICAgICAgICB0aGlzLmluaXRDaG9vc2VGdW5jdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFBva2VySGFuZCgpIHtcclxuICAgICAgICBsZXQgY291bnQgPSAyMDtcclxuICAgICAgICBsZXQgcG9rZXJBcnIgPSB0aGlzLlBva2VyUG9vbC5nZXRJdGVtQXJyKGNvdW50KTtcclxuICAgICAgICBsZXQgcG9zQXJyID0gdGhpcy5nZXRJbmRleFBvc0Fycihjb3VudCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwb3MgPSBwb3NBcnJbaV07XHJcbiAgICAgICAgICAgIGxldCBwb2tlciA9IHBva2VyQXJyW2ldO1xyXG4gICAgICAgICAgICBwb2tlci5ub2RlLnNldFBhcmVudCh0aGlzLmhhbmRQb2tlck5vZGUpO1xyXG4gICAgICAgICAgICBwb2tlci5zZXRQb2tlclBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgICAgIHBva2VyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnBva2VySGFuZExpc3QucHVzaChwb2tlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0Q2hvb3NlRnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucG9rZXJIYW5kTGlzdC5sZW5ndGggPD0gMClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIFt0aGlzLm1heFdpZHRoLCB0aGlzLm1heEhlaWdodF0gPSB0aGlzLnBva2VySGFuZExpc3RbMF0uZ2V0UG9rZXJTaXplKCk7XHJcbiAgICAgICAgdGhpcy5oYW5kUG9rZXJOb2RlLmhlaWdodCA9IHRoaXMubWF4SGVpZ2h0ICsgdGhpcy5EZWZpbmUuQ2hvb3NlT2Zmc2V0WTtcclxuICAgICAgICB0aGlzLnNldFZhbGlkUG9rZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlYWR5Rm9yQ2hvb3NlKGlzUmVhZHk6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoaXNSZWFkeSkge1xyXG4gICAgICAgICAgICAvLyBoYW5kUG9rZXJMYXlvdXTlpKflsI/opoHlm7rlrppcclxuICAgICAgICAgICAgdGhpcy5oYW5kUG9rZXJOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLnRvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRQb2tlck5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgdGhpcy50b3VjaE1vdmUsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRQb2tlck5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnRvdWNoRW5kLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kUG9rZXJOb2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy50b3VjaEVuZCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRQb2tlck5vZGUudGFyZ2V0T2ZmKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SW5kZXhQb3NBcnIoY291bnQ6IG51bWJlciwgaXNXb3JsZCA9IGZhbHNlKSB7XHJcbiAgICAgICAgbGV0IHRtcCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gY2MudjIoKGkgLSBNYXRoLmNlaWwoY291bnQgLyAyIC0gMSkpICogdGhpcy5oYW5kU3BhY2VYLCAwKTtcclxuICAgICAgICAgICAgaWYgKGlzV29ybGQpXHJcbiAgICAgICAgICAgICAgICBwb3MgPSB0aGlzLmhhbmRQb2tlck5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKHBvcyk7XHJcbiAgICAgICAgICAgIHRtcC5wdXNoKHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0bXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxheW91dEhhbmRQb2tlcnMoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRWYWxpZFBva2VycygpO1xyXG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMudmFsaWRQb2tlcnMubGVuZ3RoO1xyXG4gICAgICAgIGxldCBwb3NBcnIgPSB0aGlzLmdldEluZGV4UG9zQXJyKGNvdW50KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmFsaWRQb2tlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHBva2VyID0gdGhpcy52YWxpZFBva2Vyc1tpXTtcclxuICAgICAgICAgICAgcG9rZXIuc2V0UG9rZXJQb3NpdGlvbihwb3NBcnJbaV0pO1xyXG4gICAgICAgICAgICBwb2tlci5zZXRQb2tlckRlYWxQb3NYKCk7XHJcbiAgICAgICAgICAgIHBva2VyLm5vd0luZGV4ID0gaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEdyb3VwUG9rZXJzVmFsdWUoYXJyID0gW10pIHtcclxuICAgICAgICB0aGlzLnBva2VyVmFsdWVMaXN0ID0gdGhpcy5Qb2tlckhlbHBlci5zb3J0UG9rZXJBcnIoYXJyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0RlYWxQb2tlckluZGV4KGluZGV4OiBudW1iZXIsIGNvdW50OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgcG9zQXJyID0gdGhpcy5nZXRJbmRleFBvc0Fycihjb3VudCk7XHJcbiAgICAgICAgdGhpcy5wb2tlckhhbmRMaXN0W2luZGV4XS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucG9rZXJIYW5kTGlzdFtpbmRleF0uaXNGcm9udCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wb2tlckhhbmRMaXN0W2luZGV4XS5zZXRQb2tlclBvc2l0aW9uKHBvc0FycltpbmRleF0pO1xyXG4gICAgICAgIHRoaXMucG9rZXJIYW5kTGlzdFtpbmRleF0uc2V0UG9rZXJEZWFsUG9zKCk7XHJcbiAgICAgICAgaWYgKHRoaXMucG9rZXJWYWx1ZUxpc3RbaW5kZXhdKVxyXG4gICAgICAgICAgICB0aGlzLnBva2VySGFuZExpc3RbaW5kZXhdLnBva2VyVmFsdWUgPSB0aGlzLnBva2VyVmFsdWVMaXN0W2luZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0xhbmRsb3JkUG9rZXIoYXJyID0gW10pIHtcclxuICAgICAgICB0aGlzLnBva2VyVmFsdWVMaXN0ID0gdGhpcy5Qb2tlckhlbHBlci5zb3J0UG9rZXJBcnIodGhpcy5wb2tlclZhbHVlTGlzdC5jb25jYXQoYXJyKSk7XHJcbiAgICAgICAgbGV0IGNmZyA9IERkelJ1bGVDb25zdC5Nb2RlQ29uZmlnW3RoaXMuQ29udGV4dC5tb2RlXTtcclxuICAgICAgICBsZXQgaGFuZENvdW50ID0gY2ZnLmJhc2VDb3VudCArIGNmZy5sZWZ0Q291bnQ7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMucG9rZXJIYW5kTGlzdC5sZW5ndGggIT0gMjApIHtcclxuICAgICAgICAvLyAgICAgTG9nZ2VyLmVycm9yKCflnLDkuLvmiYvniYzmlbDph4/lvILluLgnKTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLnJlc2V0UG9rZXJzKCk7XHJcbiAgICAgICAgbGV0IHBvc0FyciA9IHRoaXMuZ2V0SW5kZXhQb3NBcnIoaGFuZENvdW50KTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucG9rZXJIYW5kTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA8IGhhbmRDb3VudCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9rZXIgPSB0aGlzLnBva2VySGFuZExpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnBva2VyVmFsdWVMaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgcG9rZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHBva2VyLmlzRnJvbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcG9rZXIucG9rZXJWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgcG9rZXIuc2V0UG9rZXJQb3NpdGlvbihwb3NBcnJbaV0pO1xyXG4gICAgICAgICAgICAgICAgcG9rZXIuc2V0UG9rZXJEZWFsUG9zKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyLmluZGV4T2YodmFsdWUpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9zID0gcG9rZXIubm9kZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBwb2tlci5kb1Bva2VyTW92ZShwb3MsIGNjLnYzKHBvcy54LCBwb3MueSArIHRoaXMuRGVmaW5lLkNob29zZU9mZnNldFkpLCAwLjEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0VmFsaWRQb2tlcnMoKTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucG9rZXJIYW5kTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBva2VyID0gdGhpcy5wb2tlckhhbmRMaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgcG9rZXIucmVzZXRTZWxlY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkNvbnRleHQuY2xlYXJTZWxlY3RQb2tlckNhY2hlKCk7XHJcbiAgICAgICAgfSwgdGhpcy5EZWZpbmUuRmx5RHpJY29uKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmr4/lsYDniYzlj5jliqjvvIjljIXmi6zlnLDkuLvniYzvvIkg6ZyA6KaB6K6+572u5LiLdmFsaWRQb2tlcnNcclxuICAgIHB1YmxpYyBzZXRWYWxpZFBva2VycygpIHtcclxuICAgICAgICB0aGlzLnZhbGlkUG9rZXJzID0gW107XHJcbiAgICAgICAgdGhpcy52YWxpZFBva2VycyA9IHRoaXMucG9rZXJIYW5kTGlzdC5maWx0ZXIoKHBva2VyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBwb2tlci5jaGVja1Bva2VyVmFsaWQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnZhbGlkUG9rZXJzLmZvckVhY2goKHBva2VyLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBwb2tlci5zZXRQb2tlckRlYWxQb3NYKCk7ICAgLy8gZGVidWcgc2V0UG9rZXJEZWFsUG9z5bey6YCJ5Lit54mM5Lya5a+86Ie0IHnorr7nva7pu5jorqTlnZDmoIfplJnor6/vvIzmlYXlj6rpnIDorr7nva5zZXRQb2tlckRlYWxQb3NYXHJcbiAgICAgICAgICAgIHBva2VyLm5vd0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zaG93RHpPd25lclNpZ24oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRvdWNoU3RhcnQoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLnRvdWNoZUVuYWJsZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IHRvdWNoUG9zID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICB0aGlzLnN0YXJ0SW5kZXggPSB0aGlzLmdldENob29zZVBva2VySW5kZXgodG91Y2hQb3MpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJ0b3VjaFN0YXJ0XCIsIHRoaXMuc3RhcnRJbmRleCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0UG9rZXJMaXN0ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0UG9rZXJMaXN0LnB1c2godGhpcy52YWxpZFBva2Vyc1t0aGlzLnN0YXJ0SW5kZXhdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudG91Y2hlRW5hYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRQb2tlcnMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0b3VjaE1vdmUoZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMudG91Y2hlRW5hYmxlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IHRvdWNoUG9zID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICB0aGlzLmVuZEluZGV4ID0gdGhpcy5nZXRDaG9vc2VQb2tlckluZGV4KHRvdWNoUG9zKTtcclxuICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwidG91Y2hNb3ZlXCIsIHRvdWNoUG9zLnRvU3RyaW5nKCksIHRoaXMuZW5kSW5kZXgpO1xyXG4gICAgICAgIGlmICh0aGlzLmVuZEluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCh0aGlzLnN0YXJ0SW5kZXggPj0gMCAmJiB0aGlzLmVuZEluZGV4ID49IDApKSB7XHJcbiAgICAgICAgICAgIGxldCBbbWluLCBtYXhdID0gW01hdGgubWluKHRoaXMuc3RhcnRJbmRleCwgdGhpcy5lbmRJbmRleCksIE1hdGgubWF4KHRoaXMuc3RhcnRJbmRleCwgdGhpcy5lbmRJbmRleCldO1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldFBva2VyTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmFsaWRQb2tlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBva2VyID0gdGhpcy52YWxpZFBva2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChpIDw9IG1heCAmJiBpID49IG1pbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0UG9rZXJMaXN0LnB1c2gocG9rZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBva2VyLnNldERyYWdTaWduKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9rZXIuc2V0RHJhZ1NpZ24oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG91Y2hFbmQoZXZlbnQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwidG91Y2hFbmRcIiwgdGhpcy50YXJnZXRQb2tlckxpc3QubGVuZ3RoKTtcclxuICAgICAgICBsZXQgdG91Y2hQb3MgPSBldmVudC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuZW5kSW5kZXggPSB0aGlzLmdldENob29zZVBva2VySW5kZXgodG91Y2hQb3MpO1xyXG4gICAgICAgIGlmICh0aGlzLmVuZEluZGV4ID09IC0xKSB7ICAgLy8g5ruR5Yqo5Yy65Z+f5aSW55WZ5Ye66aKd5aSW55qE5pyJ5pWI5Yy65Z+fXHJcbiAgICAgICAgICAgIGxldCBjdXJYID0gdG91Y2hQb3MueDtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0WCA9IGV2ZW50LmdldFN0YXJ0TG9jYXRpb24oKS54O1xyXG4gICAgICAgICAgICBsZXQgZGVsdGEgPSAoY3VyWCAtIHN0YXJ0WCkgPiAwID8gMSA6IC0xO1xyXG4gICAgICAgICAgICB0aGlzLmVuZEluZGV4ID0gdGhpcy5nZXRDaG9vc2VQb2tlckluZGV4KGNjLnYyKHRvdWNoUG9zLnggLSBkZWx0YSAqIHRoaXMuRGVmaW5lLlBva2VyU2xpZGVWYWxpZE9mZnNldFgsIHRvdWNoUG9zLnkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0UG9rZXJMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlU291bmQoRGR6QXVkaW9Db25zdC5hdWRpb0NvbW1vblBhdGggKyBEZHpBdWRpb0NvbnN0LlNlbGVjdFBva2VyLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5BdWRpby5wbGF5R2FtZUJ1bmRsZVNvdW5kKERkekF1ZGlvQ29uc3QuYXVkaW9Db21tb25QYXRoICsgRGR6QXVkaW9Db25zdC5DYW5jZWxTZWxlY3QsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGN1ckFyciA9IFtdO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0UG9rZXJMaXN0LmZvckVhY2gocG9rZXIgPT4ge1xyXG4gICAgICAgICAgICBjdXJBcnIucHVzaChwb2tlci5wb2tlclZhbHVlKTtcclxuICAgICAgICAgICAgcG9rZXIuc2V0RHJhZ1NpZ24oZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5lbmRJbmRleCA+IC0xKSB7ICAgICAvLyDnu5PmnZ/okL3ngrnkuI3lnKjniYzkuIrvvIzmnKzmrKHmu5HliqjkuI3lpITnkIZcclxuICAgICAgICAgICAgICAgIHBva2VyLm9uU2VsZWN0KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBva2VyLmlzU2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db250ZXh0LmFkZFNlbGVjdFBva2VyKHBva2VyLnBva2VyVmFsdWUsIHBva2VyLm5vd0luZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ29udGV4dC5yZW1vdmVTZWxlY3RQb2tlcihwb2tlci5wb2tlclZhbHVlLCBwb2tlci5ub3dJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIOajgOa1i+mAieeJjOS4reWMheWQq+mhuuWtkOWwseaMh+WumlxyXG4gICAgICAgIGxldCB3YW50TWFwID0gdGhpcy5QbGF5UnVsZUhlbHBlci5zZWFyY2hTdHJhaWdodChjdXJBcnIpO1xyXG4gICAgICAgIGlmICh3YW50TWFwICYmICFHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KHdhbnRNYXApKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRQb2tlcnMoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHdhbnRNYXApIHtcclxuICAgICAgICAgICAgICAgIGlmICh3YW50TWFwW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcG9rZXIgPSB0aGlzLnRhcmdldFBva2VyTGlzdFtOdW1iZXIoa2V5KV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBva2VyICYmIHBva2VyLmNoZWNrUG9rZXJWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcG9rZXIuaXNTZWxlY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBva2VyLm9uU2VsZWN0KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ29udGV4dC5hZGRTZWxlY3RQb2tlcihwb2tlci5wb2tlclZhbHVlLCBwb2tlci5ub3dJbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uUmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uUmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy50b3VjaGVFbmFibGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnN0YXJ0SW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLmVuZEluZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy50YXJnZXRQb2tlckxpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldENob29zZVBva2VySW5kZXgocG9zOiBjYy5WZWMyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbGlkUG9rZXJzQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcG9rZXJQb3MgPSB0aGlzLnZhbGlkUG9rZXJzW2ldLmdldFdvcmxkUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgbGV0IHBvc1ggPSBwb2tlclBvcy54O1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRQb2tlcnNbaV0uY2hlY2tJc1RvdWNoKHBvcykpICAgICAvLyDlj6/ku6XkvJjljJZcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAoaSA9PSB0aGlzLnZhbGlkUG9rZXJzQ291bnQgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9zLnggPiAocG9zWCAtIHRoaXMubWF4V2lkdGggLyAyKSAmJiBwb3MueCA8IChwb3NYICsgdGhpcy5tYXhXaWR0aCAvIDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBvcy54ID4gKHBvc1ggLSB0aGlzLm1heFdpZHRoIC8gMikgJiYgcG9zLnggPCAocG9zWCArIHRoaXMubWF4V2lkdGggLyAyICsgdGhpcy5vZmZzZXRYKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldFBva2VycygpIHtcclxuICAgICAgICB0aGlzLnZhbGlkUG9rZXJzLmZvckVhY2gocG9rZXIgPT4ge1xyXG4gICAgICAgICAgICBwb2tlci5zZXREcmFnU2lnbihmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChwb2tlci5pc1NlbGVjdCkge1xyXG4gICAgICAgICAgICAgICAgcG9rZXIub25TZWxlY3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuQ29udGV4dC5jbGVhclNlbGVjdFBva2VyQ2FjaGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZUFsbFBva2VycygpIHtcclxuICAgICAgICB0aGlzLnBva2VySGFuZExpc3QuZm9yRWFjaChwb2tlciA9PiB7XHJcbiAgICAgICAgICAgIHBva2VyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAocG9rZXIuaXNTZWxlY3QpIHtcclxuICAgICAgICAgICAgICAgIHBva2VyLm9uU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcG9rZXIucmVzZXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblBsYXlQb2tlcnMoc2VsZWN0TWFwID0ge30pIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gc2VsZWN0TWFwKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RNYXBba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBva2VyID0gdGhpcy52YWxpZFBva2Vyc1tOdW1iZXIoa2V5KV07XHJcbiAgICAgICAgICAgICAgICBpZiAocG9rZXIgJiYgcG9rZXIuY2hlY2tQb2tlclZhbGlkKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcG9rZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXlvdXRIYW5kUG9rZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uUHJvbXB0UG9rZXJzKHBva2VyTWFwID0ge30pIHtcclxuICAgICAgICB0aGlzLnJlc2V0UG9rZXJzKCk7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlU291bmQoRGR6QXVkaW9Db25zdC5hdWRpb0NvbW1vblBhdGggKyBEZHpBdWRpb0NvbnN0LlNlbGVjdFBva2VyLCB0cnVlKTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gcG9rZXJNYXApIHtcclxuICAgICAgICAgICAgaWYgKHBva2VyTWFwW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIGxldCBwb2tlciA9IHRoaXMudmFsaWRQb2tlcnNbTnVtYmVyKGtleSldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBva2VyICYmIHBva2VyLmNoZWNrUG9rZXJWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwb2tlci5pc1NlbGVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2tlci5vblNlbGVjdCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db250ZXh0LmFkZFNlbGVjdFBva2VyKHBva2VyLnBva2VyVmFsdWUsIHBva2VyLm5vd0luZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0R6T3duZXJTaWduKCkge1xyXG4gICAgICAgIGxldCBkekxvY2FsU2VhdCA9IHRoaXMuQ29udGV4dC5nZXQodGhpcy5EZWZpbmUuRmllbGREekxvY1NlYXQpO1xyXG4gICAgICAgIGlmIChkekxvY2FsU2VhdCA9PSAwICYmIHRoaXMudmFsaWRQb2tlcnNDb3VudCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy52YWxpZFBva2Vyc1t0aGlzLnZhbGlkUG9rZXJzLmxlbmd0aCAtIDFdLnNldER6T3duZXIodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQb2tlckFyck1hcChhcnIgPSBbXSkge1xyXG4gICAgICAgIGxldCB0bXAgPSB7fTtcclxuICAgICAgICB0aGlzLnZhbGlkUG9rZXJzLmZvckVhY2goKHBva2VyLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYXJyLmluZGV4T2YocG9rZXIucG9rZXJWYWx1ZSkgPiAtMSlcclxuICAgICAgICAgICAgICAgIHRtcFtpbmRleF0gPSBwb2tlci5wb2tlclZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0bXA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlKjkuo7miYvliqjlh7rniYzlkozoh6rliqjlh7rniYzkuLTnlYznirbmgIHml7bliLfmlrDmiYvniYxcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlZnJlc2hIYW5kUG9rZXJzT25FcnIoKSB7XHJcbiAgICAgICAgdGhpcy5Db250ZXh0LmNsZWFyU2VsZWN0UG9rZXJDYWNoZSgpO1xyXG4gICAgICAgIHRoaXMuaGlkZUFsbFBva2VycygpO1xyXG4gICAgICAgIGxldCBsZWZ0UG9rZXJzID0gdGhpcy5Db250ZXh0LmdldFNlbGZIYW5kUG9rZXJzKCk7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gbGVmdFBva2Vycy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5zZXRHcm91cFBva2Vyc1ZhbHVlKGxlZnRQb2tlcnMpO1xyXG4gICAgICAgIGxlZnRQb2tlcnMuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0RlYWxQb2tlckluZGV4KGluZGV4LCBjb3VudCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmxheW91dEhhbmRQb2tlcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJCeVJvdW5kKCkge1xyXG4gICAgICAgIHRoaXMucmVzZXRQb2tlcnMoKTtcclxuICAgICAgICB0aGlzLmhpZGVBbGxQb2tlcnMoKTtcclxuICAgICAgICB0aGlzLlBsYXlSdWxlSGVscGVyLmNsZWFyUmVjb21tZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQnlHYW1lKCkge1xyXG4gICAgICAgIHRoaXMucmVhZHlGb3JDaG9vc2UoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJCeVJvdW5kKCk7XHJcbiAgICB9XHJcbn0iXX0=