"use strict";
cc._RF.push(module, '83043+ytANHRZahvsojTBdl', 'BbwzPokerGroupView');
// bbwz/Bbwz/scripts/subview/poker/BbwzPokerGroupView.ts

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
var BbwzBaseView_1 = require("../BbwzBaseView");
var BbwzPokerView_1 = require("./BbwzPokerView");
var BbwzConstDefine_1 = require("../../data/BbwzConstDefine");
var BbwzPokerTypeView_1 = require("./BbwzPokerTypeView");
var BbwzPokerTool_1 = require("../../tool/BbwzPokerTool");
var BbwzPokerGroupView = /** @class */ (function (_super) {
    __extends(BbwzPokerGroupView, _super);
    function BbwzPokerGroupView(node, name) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.pokerList = [];
        _this.setNode(node);
        return _this;
    }
    BbwzPokerGroupView.prototype.initView = function () {
        for (var i = 0; i < BbwzConstDefine_1.default.GROUP_POKER_COUNT; i++) {
            var node = this.getChild("poker" + i);
            var view = new BbwzPokerView_1.default(node);
            this.pokerList.push(view);
        }
        if (BbwzConstDefine_1.default.checkZjhGroup(this.name)) {
            this.pokerTypeView = new BbwzPokerTypeView_1.BbwzZjhPokerTypeView(this.getChild("zjhPokerType"));
            this.pokerTypeView.active = false;
        }
        else {
            this.pokerTypeView = new BbwzPokerTypeView_1.BbwzBullPokerTypeView(this.getChild("bullPokerType"));
            this.pokerTypeView.active = false;
        }
        var transferNode = this.getChild("transferPoint");
        var centerIndex = Math.floor(BbwzConstDefine_1.default.GROUP_POKER_COUNT / 2); // 索引0开始
        this.transferPosOffset = transferNode.position.sub(this.pokerList[centerIndex].getRawPos());
    };
    /**
     * 显示所有手牌
     * @param isShow 是否显示
     * @param isFront 是否正面 默认背面
     */
    BbwzPokerGroupView.prototype.showGroupPokers = function (isShow, isFront) {
        if (isFront === void 0) { isFront = false; }
        this.pokerList.forEach(function (poker) {
            poker.active = isShow;
            poker.isFront = isFront;
        });
    };
    BbwzPokerGroupView.prototype.doFirstDeal = function (fromWPos, timeScale, delay, callback) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        var fromPos = this.node.convertToNodeSpaceAR(fromWPos);
        this.pokerList.forEach(function (poker, index) {
            var endPos = poker.getRawPos().add(_this.transferPosOffset);
            poker.active = true;
            poker.doPokerMove(fromPos, endPos, timeScale, delay + 0.05 * (index - 1), (index == _this.pokerList.length - 1) && callback, index % 3 == 0, null, false);
        });
    };
    BbwzPokerGroupView.prototype.doFirstDealDirectly = function () {
        var _this = this;
        this.pokerList.forEach(function (poker) {
            var endPos = poker.getRawPos().add(_this.transferPosOffset);
            poker.active = true;
            poker.node.setPosition(endPos);
        });
    };
    BbwzPokerGroupView.prototype.doDispatch = function (dealTime) {
        var delay = 0;
        this.pokerList.forEach(function (poker, index) {
            var fromPos = poker.node.position;
            poker.active = true;
            poker.doPokerMove(fromPos, poker.getRawPos(), dealTime, delay + 0.05 * (index - 1), function () {
                // poker.showPokerEasyAnim(null, flopTime);
                poker.isFront = true;
            }, index % 3 == 0, null, true);
        });
    };
    BbwzPokerGroupView.prototype.dispatchPokersDirectly = function () {
        this.pokerList.forEach(function (poker, index) {
            poker.active = true;
            poker.isFront = false;
            poker.node.setPosition(poker.getRawPos());
        });
    };
    BbwzPokerGroupView.prototype.showDownPoker = function (data, type, multi, delay, showTime) {
        var _this = this;
        if (data === void 0) { data = []; }
        if (delay === void 0) { delay = 0; }
        if (showTime === void 0) { showTime = 1; }
        var collectTime = 0.3;
        var tween = Game.Tween.get(this.node);
        tween.delay(delay)
            .call(function () {
            _this.collectInCenter(collectTime / 2);
        })
            .delay(collectTime / 2)
            .call(function () {
            _this.setGroupPokerValue(data, type, multi);
            _this.collectInCenter(collectTime / 2, true);
        })
            .delay(collectTime / 2)
            .call(function () {
            _this.playTypeSound();
            _this.pokerTypeView.active = true;
            _this.pokerTypeView.setPokerTypeStyle(_this.pokerType, _this.pokerMulti); // 时机未细调
            if (BbwzPokerTool_1.default.checkIsThreeWithTwo(_this.pokerType)) {
                _this.placeThreeWithTwo(true);
            }
        })
            .delay(showTime - collectTime)
            .start();
    };
    BbwzPokerGroupView.prototype.collectInCenter = function (timeScale, isReserve) {
        if (isReserve === void 0) { isReserve = false; }
        var to = this.pokerList[2].getRawPos();
        if (isReserve) {
            Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_SHOWDOWN, true);
        }
        this.pokerList.forEach(function (poker) {
            var from = poker.getRawPos();
            if (!isReserve) {
                poker.doPokerMove(from, to, timeScale);
            }
            else {
                poker.doPokerMove(to, from, timeScale, 0, null, false, cc.easeBackOut());
            }
        });
    };
    BbwzPokerGroupView.prototype.placeThreeWithTwo = function (isAnim) {
        for (var i = 0; i <= this.pokerList.length - 1; i++) {
            var poker = this.pokerList[i];
            var from = poker.getRawPos();
            if (i >= 1 && i <= 2) {
                if (isAnim)
                    poker.doPokerMove(from, cc.v2(from.x - 5 * i, from.y), 0.2, 0);
                else
                    poker.node.setPosition(cc.v2(from.x - 5 * i, from.y));
            }
            else if (i == 3) {
                if (isAnim)
                    poker.doPokerMove(from, cc.v2(from.x + 5, from.y), 0.2, 0);
                else
                    poker.node.setPosition(cc.v2(from.x + 5, from.y));
            }
            else {
                poker.node.setPosition(from);
            }
        }
    };
    /**
     * 设置手牌数组和牌型
     * @param dataList 手牌数组
     * @param pokerType 手牌牌型
     */
    BbwzPokerGroupView.prototype.setGroupPokerValue = function (dataList, pokerType, pokerMulti) {
        var _this = this;
        if (pokerType === void 0) { pokerType = 0; }
        if (pokerMulti === void 0) { pokerMulti = 0; }
        this.pokerType = pokerType;
        this.pokerMulti = pokerMulti;
        this.pokerDataList = dataList;
        this.pokerList.forEach(function (poker, i) {
            if (_this.pokerDataList[i]) {
                poker.pokerValue = _this.pokerDataList[i];
            }
        });
    };
    /**
     * 翻牌动作
     * @param callback 播完动作钩子
     * @param timeScale 时长
     * @param delay 延时
     */
    BbwzPokerGroupView.prototype.flopPokers = function (timeScale, delay, callback) {
        var _this = this;
        if (timeScale === void 0) { timeScale = 1; }
        if (delay === void 0) { delay = 0; }
        this.pokerList.forEach(function (poker, index) {
            poker.active = true;
            poker.showPokerEasyAnim(callback, timeScale, delay, false);
        });
        // 翻牌播放五次可能导致别的声音播不出来
        Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_ZHENGPAI, true);
        Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_ZHENGPAI, true);
        Game.Component.scheduleOnce(function () {
            _this.playTypeSound();
            _this.pokerTypeView.active = true;
            _this.pokerTypeView.setPokerTypeStyle(_this.pokerType, _this.pokerMulti); // 时机未细调
            if (BbwzPokerTool_1.default.checkIsThreeWithTwo(_this.pokerType)) {
                _this.placeThreeWithTwo(true);
            }
        }, timeScale + (this.pokerList.length - 1) * delay);
    };
    /**
     * 直接显示牌面 不翻转动画
     */
    BbwzPokerGroupView.prototype.flopPokersDirectly = function () {
        this.pokerList.forEach(function (poker, index) {
            poker.active = true;
            poker.isFront = true;
            poker.node.setPosition(poker.getRawPos());
        });
        this.pokerTypeView.active = true;
        this.pokerTypeView.setPokerTypeStyle(this.pokerType, this.pokerMulti);
        if (BbwzPokerTool_1.default.checkIsThreeWithTwo(this.pokerType)) {
            this.placeThreeWithTwo(false);
        }
    };
    /**
     * 播放牌型音效
     * @param soundArr 牌型音效列表
     */
    BbwzPokerGroupView.prototype.playTypeSound = function () {
        var soundArr = BbwzConstDefine_1.default.getGroupTypeSoundArr(this.name);
        if (soundArr) {
            var res = soundArr[this.pokerType];
            Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, res, true);
        }
    };
    BbwzPokerGroupView.prototype.reset = function () {
        this.pokerList.forEach(function (poker) {
            poker.reset();
            poker.active = false;
        });
        this.pokerTypeView.active = false;
    };
    return BbwzPokerGroupView;
}(BbwzBaseView_1.default));
exports.default = BbwzPokerGroupView;

cc._RF.pop();