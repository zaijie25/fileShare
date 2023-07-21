"use strict";
cc._RF.push(module, '5ccf71/UrlPs6/wFY2S9eaR', 'ErmjPlayerHandView');
// ermj/Ermj/scripts/subView/mahjong/ErmjPlayerHandView.ts

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
exports.ErmjPlayerBrightHandView = exports.ErmjPlayerDarkHandView = void 0;
var ErmjBaseView_1 = require("../ErmjBaseView");
var ErmjMahjongHandView_1 = require("./ErmjMahjongHandView");
var ErmjGameEvent_1 = require("../../data/ErmjGameEvent");
var ErmjMjStyleHelper_1 = require("../../tool/ErmjMjStyleHelper");
var ErmjDriver_1 = require("../../ErmjDriver");
var ErmjPlayerDarkHandView = /** @class */ (function (_super) {
    __extends(ErmjPlayerDarkHandView, _super);
    function ErmjPlayerDarkHandView(node, nSeat) {
        var _this = _super.call(this) || this;
        _this.nSeat = nSeat;
        /** 所有的麻将子数组 不包括摸牌区域那张 */
        _this.mjHandList = [];
        /** 显示在用的麻将子数组 不包括摸牌区域那张 */
        _this.validMjList = [];
        _this.validCount = 0;
        _this.inRoundDeal = false;
        _this.setNode(node);
        return _this;
    }
    ErmjPlayerDarkHandView.prototype.initView = function () {
        this.handLayout = this.getComponent("handLayout", cc.Layout);
        var copyMjNode = this.getChild("mahjongHandView");
        copyMjNode.active = false;
        this.lastDealMjItem = new ErmjMahjongHandView_1.default(copyMjNode);
        this.lastDealMjItem.active = false;
        for (var i = 0; i < this.Define.HandMjMaxCount + 1; i++) { // 多一张发牌时用
            var node = cc.instantiate(copyMjNode);
            node.setParent(this.handLayout.node);
            node.active = true;
            var view = new ErmjMahjongHandView_1.default(node);
            view.active = false;
            view.isOut = false;
            this.mjHandList.push(view);
        }
    };
    ErmjPlayerDarkHandView.prototype.setHandMjShow = function (flag) {
        this.handLayout.node.active = flag;
    };
    ErmjPlayerDarkHandView.prototype.setHandMjOutScreen = function () {
        this.handLayout.node.setPosition(cc.v3(0, -1000)); // debug 自己的虚拟手牌不能作隐藏 直接移出屏幕 
    };
    /**
     * 发牌
     * @param count 一次摸几张
     * @param valueArr 牌值数组 元素空代表暗牌
     */
    ErmjPlayerDarkHandView.prototype.dealHandMj = function (count, valueArr) {
        if (count === void 0) { count = 1; }
        if (valueArr === void 0) { valueArr = []; }
        this.inRoundDeal = false;
        for (var i = 0; i < count; i++) {
            this.validCount++;
            var mjItem = this.mjHandList[this.validCount - 1];
            if (mjItem) {
                mjItem.active = true;
                mjItem.isOut = false;
                mjItem.isFront = false;
            }
        }
        this.updateValidPokers();
    };
    /**
     * 摸牌 轮次摸牌 目前只支持摸一张
     */
    ErmjPlayerDarkHandView.prototype.drawHandMj = function () {
        var index = this.validCount - 1;
        Logger.error("drawHandMj", this.nSeat, this.validCount);
        if (this.validMjList[index]) {
            this.inRoundDeal = true;
            this.lastDealMjItem.active = true;
            this.lastDealMjItem.isFront = false;
            this.lastDealMjItem.isOut = false;
            var worldPos = this.validMjList[index].getWorldPos();
            var localPos = this.lastDealMjItem.node.parent.convertToNodeSpaceAR(worldPos);
            this.lastDealMjItem.node.setPosition(localPos.add(this.Define.LastOneDealOffset[this.nSeat]));
            this.validCount += 1;
        }
    };
    /**
     * 玩家补花 补进来的都是暗牌表现
     * @param outArr 花牌
     * @param isRoundDeal 是否轮次摸牌、开杠摸牌
     */
    ErmjPlayerDarkHandView.prototype.changeFlower = function (outArr, callback) {
        var _this = this;
        var count = 0;
        var outCount = outArr.length;
        if (this.inRoundDeal && this.lastDealMjItem) { // 摸牌阶段摸到花牌
            this.lastDealMjItem.doChangeFlower(0, 0.2, 0.2);
            count += 1;
        }
        if (count < outCount) {
            for (var i = this.validCount - outCount; i < this.validCount; i++) {
                var item = this.validMjList[i];
                if (item)
                    item.doChangeFlower(0, 0.2, 0.2);
            }
        }
        Game.Component.scheduleOnce(function () {
            // 花牌区域add显示
            if (callback)
                callback();
            Game.Event.event(ErmjGameEvent_1.default.doPatchwork, outCount); // 通知从牌山末尾补countz张麻将
        }, 0.2);
        if (!this.inRoundDeal) {
            Game.Component.scheduleOnce(function () {
                _this.sortCardDirectly();
            }, 0.71);
        }
    };
    /** 暗牌n + 1 */
    ErmjPlayerDarkHandView.prototype.readyForOut = function () {
        if (this.inRoundDeal)
            return;
        var lastOneMj = this.validMjList.pop();
        lastOneMj.active = false;
        lastOneMj.isOut = true;
        this.inRoundDeal = true;
        this.lastDealMjItem.mahjongValue = lastOneMj.mahjongValue;
        this.lastDealMjItem.active = true;
        this.lastDealMjItem.isOut = false;
        var worldPos = this.validMjList[this.validMjList.length - 1].getWorldPos();
        var localPos = this.lastDealMjItem.node.parent.convertToNodeSpaceAR(worldPos);
        this.lastDealMjItem.node.setPosition(localPos.add(this.Define.LastOneDealOffset[this.nSeat]));
    };
    ErmjPlayerDarkHandView.prototype.outCard = function (value, callback) {
        var _this = this;
        var outItem = this.getOutItem();
        if (outItem && !outItem.isOut) {
            this.handLayout.enabled = false;
            outItem.active = false;
            outItem.isOut = true;
            if (callback) {
                callback();
            }
            Game.Component.scheduleOnce(function () {
                _this.handLayout.enabled = true;
                _this.updateValidPokers();
                _this.sortCardDirectly(false);
                _this.inRoundDeal = false;
                _this.validCount -= 1;
            }, 0.5);
        }
        else {
            console.error("outCard outIndex == -1", this.validCount, outItem); // 找不到要出的指定牌
        }
    };
    /** 碰 */
    ErmjPlayerDarkHandView.prototype.pongCard = function (valueArr) {
        var arr = this.getRightMjItem(2);
        arr.forEach(function (mjItem) {
            mjItem.active = false;
            mjItem.isOut = true;
        });
        this.validCount -= 2;
        this.sortCardDirectly(false);
    };
    /** 吃 */
    ErmjPlayerDarkHandView.prototype.chowCard = function (valueArr, chowCard) {
        var arr = this.getRightMjItem(2);
        arr.forEach(function (mjItem) {
            mjItem.active = false;
            mjItem.isOut = true;
        });
        this.validCount -= 2;
        this.sortCardDirectly(false);
    };
    /** 杠 */
    ErmjPlayerDarkHandView.prototype.kongCard = function (type, valueArr) {
        if (type == 4) { // 直杠 去掉3张手牌
            var arr = this.getRightMjItem(3);
            arr.forEach(function (mjItem) {
                mjItem.active = false;
                mjItem.isOut = true;
            });
            this.validCount -= 3;
        }
        else if (type == 5) { // 碰杠 1张
            var mjItem = this.getOutItem();
            mjItem.active = false;
            mjItem.isOut = true;
            this.validCount -= 1;
        }
        else if (type == 6) { // 暗杠 4张
            var random = Global.Toolkit.getRoundInteger(0, 10); // 0~9 取随机 摸上手直接杠概率大点
            if (random <= 5 && this.inRoundDeal) {
                var arr = this.getRightMjItem(3); // 手上3张 摸的1张
                arr.forEach(function (mjItem) {
                    mjItem.active = false;
                    mjItem.isOut = true;
                });
                this.lastDealMjItem.active = false;
                this.lastDealMjItem.isOut = true;
            }
            else {
                var arr = this.getRightMjItem(4); // 手上4张
                arr.forEach(function (mjItem) {
                    mjItem.active = false;
                    mjItem.isOut = true;
                });
            }
            this.validCount -= 4;
        }
        this.sortCardDirectly(false);
    };
    /** 随机找一个所出的牌 摸牌了的话随机会计入摸的那张 */
    ErmjPlayerDarkHandView.prototype.getOutItem = function () {
        var total = this.validCount;
        var random = Global.Toolkit.getRoundInteger(total);
        if (this.inRoundDeal && random == this.validCount - 1) // 摸牌后this.validCount会多出一张
            return this.lastDealMjItem;
        else
            return this.validMjList[random];
    };
    /** 获取最右几个麻将子 */
    ErmjPlayerDarkHandView.prototype.getRightMjItem = function (count) {
        return this.validMjList.slice(this.validMjList.length - count, this.validMjList.length); // debug 此处不可用validCount, 这个数量是加上发牌那张的
    };
    ErmjPlayerDarkHandView.prototype.winHideLastDraw = function () {
        if (this.inRoundDeal && this.lastDealMjItem.active) {
            this.lastDealMjItem.active = false;
            this.lastDealMjItem.isOut = true;
            this.inRoundDeal = false;
        }
    };
    /**
     * 直接合并手牌排序并刷新位置
     * @param isAnim 是否播放整理动画
     */
    ErmjPlayerDarkHandView.prototype.sortCardDirectly = function (isAnim) {
        if (isAnim === void 0) { isAnim = false; }
        if (this.inRoundDeal && !this.lastDealMjItem.isOut) { // 摸了牌 并且没有打出去或杠出去 合并它
            for (var i = 0; i < this.mjHandList.length; i++) {
                var mjItem = this.mjHandList[i];
                if (!mjItem.active && mjItem.isOut) {
                    mjItem.active = true;
                    mjItem.isOut = false;
                    mjItem.mahjongValue = this.lastDealMjItem.mahjongValue;
                    break;
                }
            }
            this.lastDealMjItem.active = false;
            this.lastDealMjItem.isOut = true;
        }
        this.updateValidPokers();
        this.sortMjHandList();
    };
    /** 麻将子数量发生变动时设置 */
    ErmjPlayerDarkHandView.prototype.updateValidPokers = function () {
        this.validMjList = [];
        this.validMjList = this.mjHandList.filter(function (item) {
            return item.active && !item.isOut;
        });
    };
    /** 排序手牌数组 不刷新位置 此时显示可能是乱序的 */
    ErmjPlayerDarkHandView.prototype.sortMjHandList = function () {
        this.mjHandList.sort(function (item1, item2) {
            if (!item1.mahjongValue || !item2.mahjongValue)
                return 0;
            return item1.mahjongValue - item2.mahjongValue;
        });
    };
    ErmjPlayerDarkHandView.prototype.reset = function () {
        this.inRoundDeal = false;
        this.validCount = 0;
        this.mjHandList.forEach(function (item) {
            item.active = false;
            if (item.isSelect)
                item.onSelect();
            item.reset();
        });
        this.lastDealMjItem.active = false;
        this.lastDealMjItem.reset();
        this.handLayout.enabled = true;
    };
    return ErmjPlayerDarkHandView;
}(ErmjBaseView_1.default));
exports.ErmjPlayerDarkHandView = ErmjPlayerDarkHandView;
var ErmjPlayerBrightHandView = /** @class */ (function (_super) {
    __extends(ErmjPlayerBrightHandView, _super);
    function ErmjPlayerBrightHandView(node, nSeat) {
        var _this = _super.call(this) || this;
        _this.nSeat = nSeat;
        _this.handBrightMjList = [];
        _this.validValueArr = [];
        _this.inRoundDeal = false;
        _this.outMjMgr = ErmjDriver_1.default.instance.outMjManager;
        _this.setNode(node);
        return _this;
    }
    ErmjPlayerBrightHandView.prototype.initView = function () {
        this.handListNode = this.getChild("handList");
    };
    /** 展示手牌 胡的时候最后一张为胡牌 听牌展示对家时全为手牌 */
    ErmjPlayerBrightHandView.prototype.showDown = function (cards, isWin, isSort) {
        if (isWin === void 0) { isWin = false; }
        if (isSort === void 0) { isSort = false; }
        var validCount = 0;
        var nRelative = this.nSeat - this.Context.selfLocalSeat;
        var start = cc.Vec3.ZERO;
        var lastOffset = nRelative == 0 ? cc.v3(10, 0) : cc.v3(-10, 0);
        if (isSort) {
            cards.sort(function (v1, v2) {
                return v1 - v2;
            });
        }
        for (var i = 0; i < cards.length; i++) {
            var mjItem = this.handBrightMjList[i];
            if (!mjItem)
                mjItem = this.getOneBrightMj();
            var nPersp = this.Define.winBrightMjPerspArr[validCount] || 0;
            mjItem.active = true;
            mjItem.mahjongValue = cards[i];
            mjItem.isFront = true;
            mjItem.setPerspStyle(nPersp, nRelative);
            var config = ErmjMjStyleHelper_1.default.getPerspectiveCfg(nPersp);
            mjItem.node.setSiblingIndex(14 - validCount);
            if (isWin && cards.length - 1 == i) {
                mjItem.node.setPosition(start.add(lastOffset));
                mjItem.active = false; // 胡牌把牌放到胡牌区域, 这里隐藏掉
            }
            else {
                mjItem.node.setPosition(start);
                var offsetX = config.dir > 0 ? config.cfg.devSpaceX : config.cfg.negDevSpaceX;
                var spaceX = nRelative == 0 ? offsetX : -offsetX;
                start = cc.v3(start.x + spaceX, 0);
            }
            validCount++;
            this.validValueArr.push(cards[i]);
        }
    };
    ErmjPlayerBrightHandView.prototype.updateBrightMjList = function (isSeparated) {
        var dev = this.validValueArr.length - this.handBrightMjList.length;
        if (dev > 0) {
            for (var i = 0; i < dev; i++) {
                this.getOneBrightMj();
            }
        }
        var validCount = 0;
        var nRelative = this.nSeat - this.Context.selfLocalSeat;
        var start = cc.Vec3.ZERO;
        var lastOffset = nRelative == 0 ? cc.v3(10, 0) : cc.v3(-10, 0);
        for (var i = 0; i < this.handBrightMjList.length; i++) {
            var mjItem = this.handBrightMjList[i];
            var value = this.validValueArr[i];
            if (value) {
                var nPersp = this.Define.winBrightMjPerspArr[validCount] || 0;
                mjItem.active = true;
                mjItem.mahjongValue = value;
                mjItem.isFront = true;
                mjItem.setPerspStyle(nPersp, nRelative);
                var config = ErmjMjStyleHelper_1.default.getPerspectiveCfg(nPersp);
                mjItem.node.setSiblingIndex(14 - validCount);
                if (isSeparated && this.validValueArr.length - 1 == i) {
                    mjItem.node.setPosition(start.add(lastOffset));
                }
                else {
                    mjItem.node.setPosition(start);
                    var offsetX = config.dir > 0 ? config.cfg.devSpaceX : config.cfg.negDevSpaceX;
                    var spaceX = nRelative == 0 ? offsetX : -offsetX;
                    start = cc.v3(start.x + spaceX, 0);
                }
            }
            else {
                mjItem.active = false;
            }
            validCount++;
        }
    };
    ErmjPlayerBrightHandView.prototype.drawHandMj = function (value) {
        this.inRoundDeal = true;
        this.validValueArr.push(value);
        this.updateBrightMjList(true);
    };
    ErmjPlayerBrightHandView.prototype.readyForOut = function (value) {
        if (this.inRoundDeal)
            return;
        this.sortValidValueList();
        var index = this.validValueArr.indexOf(value);
        if (index > -1) {
            this.validValueArr.splice(index, 1);
            this.validValueArr.push(value);
        }
        this.updateBrightMjList(true);
    };
    ErmjPlayerBrightHandView.prototype.changeFlower = function (outArr, inArr, callback) {
        if (outArr.length != 1)
            return console.error("error 只会进摸牌补花阶段", outArr.length); // 理论上发牌不会进这, 所以无须理牌
        var outValue = outArr[0];
        var inValue = inArr[0];
        var mjItem = this.findMjItemByValue(outValue);
        if (mjItem) {
            mjItem.active = false;
            if (callback)
                callback();
            var index = this.validValueArr.indexOf(outValue);
            if (index > -1)
                this.validValueArr.splice(index, 1);
            this.validValueArr.push(inValue);
            Game.Component.scheduleOnce(function () {
                mjItem.active = true;
                mjItem.mahjongValue = inValue;
            }, 0.4);
        }
    };
    ErmjPlayerBrightHandView.prototype.outCard = function (value, callback) {
        var _this = this;
        this.inRoundDeal = false;
        var mjItem = this.findMjItemByValue(value);
        if (mjItem) {
            if (callback)
                callback();
            mjItem.active = false;
            var index = -1;
            for (var i = this.validValueArr.length - 1; i >= 0; i--) {
                if (this.validValueArr[i] == value) {
                    index = i;
                    break; // 倒序查找, 优先出右边那张
                }
            }
            if (index > -1)
                this.validValueArr.splice(index, 1);
            Game.Component.scheduleOnce(function () {
                _this.sortValidValueList();
                _this.updateBrightMjList(false);
            }, 0.5);
        }
    };
    ErmjPlayerBrightHandView.prototype.pongCard = function (valueArr) {
        var count = 2;
        for (var i = 0; i < valueArr.length; i++) {
            var mjItem = this.findMjItemByValue(valueArr[i]);
            mjItem.active = false;
            var index = this.validValueArr.indexOf(valueArr[i]);
            if (index > -1)
                this.validValueArr.splice(index, 1);
            count--;
            if (count == 0)
                break;
        }
        this.updateBrightMjList(false);
    };
    ErmjPlayerBrightHandView.prototype.chowCard = function (valueArr, chowCard) {
        var count = 2;
        for (var i = 0; i < valueArr.length; i++) {
            var value = valueArr[i];
            if (value == chowCard)
                continue;
            var mjItem = this.findMjItemByValue(value);
            mjItem.active = false;
            var index = this.validValueArr.indexOf(value);
            if (index > -1)
                this.validValueArr.splice(index, 1);
            count--;
            if (count == 0)
                break;
        }
        this.updateBrightMjList(false);
    };
    ErmjPlayerBrightHandView.prototype.kongCard = function (type, valueArr) {
        if (type == 4) { // 直杠 去掉3张手牌
            var count = 3;
            for (var i = 0; i < valueArr.length; i++) {
                var value = valueArr[i];
                var mjItem = this.findMjItemByValue(value);
                mjItem.active = false;
                var index = this.validValueArr.indexOf(value);
                if (index > -1)
                    this.validValueArr.splice(index, 1);
                count--;
                if (count == 0)
                    break;
            }
        }
        else if (type == 5) { // 碰杠 1张
            var value = valueArr[0];
            var mjItem = this.findMjItemByValue(value);
            mjItem.active = false;
            var index = this.validValueArr.indexOf(value);
            if (index > -1)
                this.validValueArr.splice(index, 1);
        }
        else if (type == 6) { // 暗杠 4张
            var count = 4;
            for (var i = 0; i < valueArr.length; i++) {
                var value = valueArr[i];
                var mjItem = this.findMjItemByValue(value);
                mjItem.active = false;
                var index = this.validValueArr.indexOf(value);
                if (index > -1)
                    this.validValueArr.splice(index, 1);
                count--;
                if (count == 0)
                    break;
            }
        }
        this.updateBrightMjList(false);
    };
    ErmjPlayerBrightHandView.prototype.winHideLastDraw = function (value) {
        var lastMj = this.handBrightMjList[this.validValueArr.length - 1];
        if (this.inRoundDeal && lastMj && lastMj.mahjongValue == value) {
            lastMj.active = false;
            this.inRoundDeal = false;
        }
    };
    ErmjPlayerBrightHandView.prototype.getOneBrightMj = function () {
        var mjItem = this.outMjMgr.getOneBrightMj();
        mjItem.node.setParent(this.handListNode);
        this.handBrightMjList.push(mjItem);
        return mjItem;
    };
    ErmjPlayerBrightHandView.prototype.findMjItemByValue = function (value) {
        for (var i = this.handBrightMjList.length - 1; i >= 0; i--) { // 倒序查找 优先新摸的牌
            var item = this.handBrightMjList[i];
            if (item.active && item.mahjongValue == value)
                return item;
        }
    };
    ErmjPlayerBrightHandView.prototype.sortValidValueList = function () {
        this.validValueArr.sort(function (v1, v2) {
            return v1 - v2;
        });
    };
    ErmjPlayerBrightHandView.prototype.reset = function () {
        this.inRoundDeal = false;
        this.handBrightMjList = []; // 回收麻将子交给ErmjOutMjViewManager
        this.validValueArr = [];
    };
    return ErmjPlayerBrightHandView;
}(ErmjBaseView_1.default));
exports.ErmjPlayerBrightHandView = ErmjPlayerBrightHandView;

cc._RF.pop();