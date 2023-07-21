"use strict";
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