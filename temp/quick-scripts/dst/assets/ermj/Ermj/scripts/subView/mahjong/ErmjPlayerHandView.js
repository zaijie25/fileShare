
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/mahjong/ErmjPlayerHandView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcbWFoam9uZ1xcRXJtalBsYXllckhhbmRWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFFM0MsNkRBQXdEO0FBQ3hELDBEQUFxRDtBQUVyRCxrRUFBNkQ7QUFDN0QsK0NBQTBDO0FBRTFDO0lBQTRDLDBDQUFZO0lBV3BELGdDQUFZLElBQWEsRUFBWSxLQUFhO1FBQWxELFlBQ0ksaUJBQU8sU0FFVjtRQUhvQyxXQUFLLEdBQUwsS0FBSyxDQUFRO1FBUmxELHlCQUF5QjtRQUNqQixnQkFBVSxHQUEwQixFQUFFLENBQUM7UUFDL0MsMkJBQTJCO1FBQ25CLGlCQUFXLEdBQTBCLEVBQUUsQ0FBQztRQUN6QyxnQkFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixpQkFBVyxHQUFZLEtBQUssQ0FBQztRQUtoQyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRVMseUNBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDbEQsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLDZCQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQVEsVUFB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K0JBQUM7QUFBRCxDQXRRQSxBQXNRQyxDQXRRNkMsc0JBQVksR0FzUXpEO0FBdFFZLDREQUF3QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcm1qQmFzZVZpZXcgZnJvbSBcIi4uL0VybWpCYXNlVmlld1wiO1xyXG5pbXBvcnQgRXJtak91dE1qVmlld01hbmFnZXIgZnJvbSBcIi4uLy4uL21hbmFnZXIvRXJtak91dE1qVmlld01hbmFnZXJcIjtcclxuaW1wb3J0IEVybWpNYWhqb25nSGFuZFZpZXcgZnJvbSBcIi4vRXJtak1haGpvbmdIYW5kVmlld1wiO1xyXG5pbXBvcnQgRXJtakdhbWVFdmVudCBmcm9tIFwiLi4vLi4vZGF0YS9Fcm1qR2FtZUV2ZW50XCI7XHJcbmltcG9ydCBFcm1qTWFoam9uZ091dFZpZXcgZnJvbSBcIi4vRXJtak1haGpvbmdPdXRWaWV3XCI7XHJcbmltcG9ydCBFcm1qTWpTdHlsZUhlbHBlciBmcm9tIFwiLi4vLi4vdG9vbC9Fcm1qTWpTdHlsZUhlbHBlclwiO1xyXG5pbXBvcnQgRXJtakRyaXZlciBmcm9tIFwiLi4vLi4vRXJtakRyaXZlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEVybWpQbGF5ZXJEYXJrSGFuZFZpZXcgZXh0ZW5kcyBFcm1qQmFzZVZpZXd7XHJcbiAgICBwcml2YXRlIGxhc3REZWFsTWpJdGVtOiBFcm1qTWFoam9uZ0hhbmRWaWV3O1xyXG4gICAgcHJpdmF0ZSBoYW5kTGF5b3V0OiBjYy5MYXlvdXQ7XHJcbiAgICAvKiog5omA5pyJ55qE6bq75bCG5a2Q5pWw57uEIOS4jeWMheaLrOaRuOeJjOWMuuWfn+mCo+W8oCAqL1xyXG4gICAgcHJpdmF0ZSBtakhhbmRMaXN0OiBFcm1qTWFoam9uZ0hhbmRWaWV3W10gPSBbXTtcclxuICAgIC8qKiDmmL7npLrlnKjnlKjnmoTpurvlsIblrZDmlbDnu4Qg5LiN5YyF5ous5pG454mM5Yy65Z+f6YKj5bygICovXHJcbiAgICBwcml2YXRlIHZhbGlkTWpMaXN0OiBFcm1qTWFoam9uZ0hhbmRWaWV3W10gPSBbXTtcclxuICAgIHB1YmxpYyB2YWxpZENvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGluUm91bmREZWFsOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlLCBwcm90ZWN0ZWQgblNlYXQ6IG51bWJlcil7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5oYW5kTGF5b3V0ID0gdGhpcy5nZXRDb21wb25lbnQoXCJoYW5kTGF5b3V0XCIsIGNjLkxheW91dCk7XHJcbiAgICAgICAgbGV0IGNvcHlNak5vZGUgPSB0aGlzLmdldENoaWxkKFwibWFoam9uZ0hhbmRWaWV3XCIpO1xyXG4gICAgICAgIGNvcHlNak5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sYXN0RGVhbE1qSXRlbSA9IG5ldyBFcm1qTWFoam9uZ0hhbmRWaWV3KGNvcHlNak5vZGUpO1xyXG4gICAgICAgIHRoaXMubGFzdERlYWxNakl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkRlZmluZS5IYW5kTWpNYXhDb3VudCArIDE7IGkrKyl7ICAgICAgIC8vIOWkmuS4gOW8oOWPkeeJjOaXtueUqFxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGNvcHlNak5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLmhhbmRMYXlvdXQubm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgRXJtak1haGpvbmdIYW5kVmlldyhub2RlKTtcclxuICAgICAgICAgICAgdmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdmlldy5pc091dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1qSGFuZExpc3QucHVzaCh2aWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEhhbmRNalNob3coZmxhZzogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5oYW5kTGF5b3V0Lm5vZGUuYWN0aXZlID0gZmxhZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SGFuZE1qT3V0U2NyZWVuKCl7XHJcbiAgICAgICAgdGhpcy5oYW5kTGF5b3V0Lm5vZGUuc2V0UG9zaXRpb24oY2MudjMoMCwgLTEwMDApKTsgICAgICAvLyBkZWJ1ZyDoh6rlt7HnmoTomZrmi5/miYvniYzkuI3og73kvZzpmpDol48g55u05o6l56e75Ye65bGP5bmVIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+R54mMXHJcbiAgICAgKiBAcGFyYW0gY291bnQg5LiA5qyh5pG45Yeg5bygXHJcbiAgICAgKiBAcGFyYW0gdmFsdWVBcnIg54mM5YC85pWw57uEIOWFg+e0oOepuuS7o+ihqOaal+eJjFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVhbEhhbmRNaihjb3VudDogbnVtYmVyID0gMSwgdmFsdWVBcnI6IG51bWJlcltdID0gW10pe1xyXG4gICAgICAgIHRoaXMuaW5Sb3VuZERlYWwgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaTwgY291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRDb3VudCArKztcclxuICAgICAgICAgICAgbGV0IG1qSXRlbSA9IHRoaXMubWpIYW5kTGlzdFt0aGlzLnZhbGlkQ291bnQgLSAxXTtcclxuICAgICAgICAgICAgaWYgKG1qSXRlbSl7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5pc091dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLmlzRnJvbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVZhbGlkUG9rZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkbjniYwg6L2u5qyh5pG454mMIOebruWJjeWPquaUr+aMgeaRuOS4gOW8oFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZHJhd0hhbmRNaigpe1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMudmFsaWRDb3VudCAtIDE7XHJcbiAgICAgICAgTG9nZ2VyLmVycm9yKFwiZHJhd0hhbmRNalwiLCB0aGlzLm5TZWF0LCB0aGlzLnZhbGlkQ291bnQpO1xyXG4gICAgICAgIGlmKHRoaXMudmFsaWRNakxpc3RbaW5kZXhdKXtcclxuICAgICAgICAgICAgdGhpcy5pblJvdW5kRGVhbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdERlYWxNakl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0RGVhbE1qSXRlbS5pc0Zyb250ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdERlYWxNakl0ZW0uaXNPdXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHdvcmxkUG9zID0gdGhpcy52YWxpZE1qTGlzdFtpbmRleF0uZ2V0V29ybGRQb3MoKTtcclxuICAgICAgICAgICAgbGV0IGxvY2FsUG9zID0gdGhpcy5sYXN0RGVhbE1qSXRlbS5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdERlYWxNakl0ZW0ubm9kZS5zZXRQb3NpdGlvbihsb2NhbFBvcy5hZGQodGhpcy5EZWZpbmUuTGFzdE9uZURlYWxPZmZzZXRbdGhpcy5uU2VhdF0pKTtcclxuICAgICAgICAgICAgdGhpcy52YWxpZENvdW50ICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog546p5a626KGl6IqxIOihpei/m+adpeeahOmDveaYr+aal+eJjOihqOeOsFxyXG4gICAgICogQHBhcmFtIG91dEFyciDoirHniYxcclxuICAgICAqIEBwYXJhbSBpc1JvdW5kRGVhbCDmmK/lkKbova7mrKHmkbjniYzjgIHlvIDmnaDmkbjniYxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoYW5nZUZsb3dlcihvdXRBcnI6IG51bWJlcltdLCBjYWxsYmFjazogRnVuY3Rpb24pe1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgbGV0IG91dENvdW50ID0gb3V0QXJyLmxlbmd0aDtcclxuICAgICAgICBpZiAodGhpcy5pblJvdW5kRGVhbCAmJiB0aGlzLmxhc3REZWFsTWpJdGVtKXsgICAgICAgICAgIC8vIOaRuOeJjOmYtuauteaRuOWIsOiKseeJjFxyXG4gICAgICAgICAgICB0aGlzLmxhc3REZWFsTWpJdGVtLmRvQ2hhbmdlRmxvd2VyKDAsIDAuMiwgMC4yKTtcclxuICAgICAgICAgICAgY291bnQgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvdW50IDwgb3V0Q291bnQpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSB0aGlzLnZhbGlkQ291bnQgLSBvdXRDb3VudDsgaSA8IHRoaXMudmFsaWRDb3VudDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy52YWxpZE1qTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGlmKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5kb0NoYW5nZUZsb3dlcigwLCAwLjIsIDAuMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIC8vIOiKseeJjOWMuuWfn2FkZOaYvuekulxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEVybWpHYW1lRXZlbnQuZG9QYXRjaHdvcmssIG91dENvdW50KTsgICAgIC8vIOmAmuefpeS7jueJjOWxseacq+WwvuihpWNvdW50euW8oOm6u+WwhlxyXG4gICAgICAgIH0sIDAuMik7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLmluUm91bmREZWFsKXtcclxuICAgICAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpPT57ICAgLy8g6KGl6Iqx5ZCO5pW055CG5omL54mMXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRDYXJkRGlyZWN0bHkoKTtcclxuICAgICAgICAgICAgfSwgMC43MSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmmpfniYxuICsgMSAqL1xyXG4gICAgcHVibGljIHJlYWR5Rm9yT3V0KCl7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5Sb3VuZERlYWwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgbGFzdE9uZU1qID0gdGhpcy52YWxpZE1qTGlzdC5wb3AoKTtcclxuICAgICAgICBsYXN0T25lTWouYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbGFzdE9uZU1qLmlzT3V0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5pblJvdW5kRGVhbCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sYXN0RGVhbE1qSXRlbS5tYWhqb25nVmFsdWUgPSBsYXN0T25lTWoubWFoam9uZ1ZhbHVlO1xyXG4gICAgICAgIHRoaXMubGFzdERlYWxNakl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxhc3REZWFsTWpJdGVtLmlzT3V0ID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHdvcmxkUG9zID0gdGhpcy52YWxpZE1qTGlzdFt0aGlzLnZhbGlkTWpMaXN0Lmxlbmd0aCAtIDFdLmdldFdvcmxkUG9zKCk7XHJcbiAgICAgICAgbGV0IGxvY2FsUG9zID0gdGhpcy5sYXN0RGVhbE1qSXRlbS5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZFBvcyk7XHJcbiAgICAgICAgdGhpcy5sYXN0RGVhbE1qSXRlbS5ub2RlLnNldFBvc2l0aW9uKGxvY2FsUG9zLmFkZCh0aGlzLkRlZmluZS5MYXN0T25lRGVhbE9mZnNldFt0aGlzLm5TZWF0XSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdXRDYXJkKHZhbHVlOiBudW1iZXIsIGNhbGxiYWNrOiBGdW5jdGlvbil7XHJcbiAgICAgICAgbGV0IG91dEl0ZW0gPSB0aGlzLmdldE91dEl0ZW0oKTtcclxuICAgICAgICBpZiAob3V0SXRlbSAmJiAhb3V0SXRlbS5pc091dCl7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZExheW91dC5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG91dEl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG91dEl0ZW0uaXNPdXQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZihjYWxsYmFjayl7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKT0+eyAgICAgICAvLyDnrYkwLjVz5YaN5ZCI5bm25omL54mMXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRMYXlvdXQuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbGlkUG9rZXJzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRDYXJkRGlyZWN0bHkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pblJvdW5kRGVhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZENvdW50IC09IDE7XHJcbiAgICAgICAgICAgIH0sIDAuNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJvdXRDYXJkIG91dEluZGV4ID09IC0xXCIsIHRoaXMudmFsaWRDb3VudCwgb3V0SXRlbSk7ICAgICAgICAvLyDmib7kuI3liLDopoHlh7rnmoTmjIflrprniYxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOeisCAqL1xyXG4gICAgcHVibGljIHBvbmdDYXJkKHZhbHVlQXJyOiBudW1iZXJbXSl7XHJcbiAgICAgICAgbGV0IGFyciA9IHRoaXMuZ2V0UmlnaHRNakl0ZW0oMik7XHJcbiAgICAgICAgYXJyLmZvckVhY2gobWpJdGVtPT57XHJcbiAgICAgICAgICAgIG1qSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbWpJdGVtLmlzT3V0ID0gdHJ1ZTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLnZhbGlkQ291bnQgLT0gMjtcclxuICAgICAgICB0aGlzLnNvcnRDYXJkRGlyZWN0bHkoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlkIMgKi9cclxuICAgIHB1YmxpYyBjaG93Q2FyZCh2YWx1ZUFycjogbnVtYmVyW10sIGNob3dDYXJkOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBhcnIgPSB0aGlzLmdldFJpZ2h0TWpJdGVtKDIpO1xyXG4gICAgICAgIGFyci5mb3JFYWNoKG1qSXRlbT0+e1xyXG4gICAgICAgICAgICBtakl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG1qSXRlbS5pc091dCA9IHRydWU7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZENvdW50IC09IDI7XHJcbiAgICAgICAgdGhpcy5zb3J0Q2FyZERpcmVjdGx5KGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5p2gICovXHJcbiAgICBwdWJsaWMga29uZ0NhcmQodHlwZTogbnVtYmVyLCB2YWx1ZUFycjogbnVtYmVyW10pe1xyXG4gICAgICAgIGlmKHR5cGUgPT0gNCl7ICAgICAgICAgIC8vIOebtOadoCDljrvmjokz5byg5omL54mMXHJcbiAgICAgICAgICAgIGxldCBhcnIgPSB0aGlzLmdldFJpZ2h0TWpJdGVtKDMpO1xyXG4gICAgICAgICAgICBhcnIuZm9yRWFjaChtakl0ZW09PntcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5pc091dCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRDb3VudCAtPSAzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHR5cGUgPT0gNSl7ICAgICAvLyDnorDmnaAgMeW8oFxyXG4gICAgICAgICAgICBsZXQgbWpJdGVtID0gdGhpcy5nZXRPdXRJdGVtKCk7XHJcbiAgICAgICAgICAgIG1qSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbWpJdGVtLmlzT3V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy52YWxpZENvdW50IC09IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHlwZSA9PSA2KXsgICAgIC8vIOaal+adoCA05bygXHJcbiAgICAgICAgICAgIGxldCByYW5kb20gPSBHbG9iYWwuVG9vbGtpdC5nZXRSb3VuZEludGVnZXIoMCwgMTApOyAgICAgLy8gMH45IOWPlumaj+acuiDmkbjkuIrmiYvnm7TmjqXmnaDmpoLnjoflpKfngrlcclxuICAgICAgICAgICAgaWYgKHJhbmRvbSA8PSA1ICYmIHRoaXMuaW5Sb3VuZERlYWwpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IHRoaXMuZ2V0UmlnaHRNakl0ZW0oMyk7ICAgICAvLyDmiYvkuIoz5bygIOaRuOeahDHlvKBcclxuICAgICAgICAgICAgICAgIGFyci5mb3JFYWNoKG1qSXRlbT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIG1qSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBtakl0ZW0uaXNPdXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMubGFzdERlYWxNakl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3REZWFsTWpJdGVtLmlzT3V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IHRoaXMuZ2V0UmlnaHRNakl0ZW0oNCk7ICAgICAvLyDmiYvkuIo05bygXHJcbiAgICAgICAgICAgICAgICBhcnIuZm9yRWFjaChtakl0ZW09PntcclxuICAgICAgICAgICAgICAgICAgICBtakl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbWpJdGVtLmlzT3V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy52YWxpZENvdW50IC09IDQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc29ydENhcmREaXJlY3RseShmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmaj+acuuaJvuS4gOS4quaJgOWHuueahOeJjCDmkbjniYzkuobnmoTor53pmo/mnLrkvJrorqHlhaXmkbjnmoTpgqPlvKAgKi8gXHJcbiAgICBwdWJsaWMgZ2V0T3V0SXRlbSgpe1xyXG4gICAgICAgIGxldCB0b3RhbCA9IHRoaXMudmFsaWRDb3VudDtcclxuICAgICAgICBsZXQgcmFuZG9tID0gR2xvYmFsLlRvb2xraXQuZ2V0Um91bmRJbnRlZ2VyKHRvdGFsKTtcclxuICAgICAgICBpZiAodGhpcy5pblJvdW5kRGVhbCAmJiByYW5kb20gPT0gdGhpcy52YWxpZENvdW50IC0gMSkgICAgICAvLyDmkbjniYzlkI50aGlzLnZhbGlkQ291bnTkvJrlpJrlh7rkuIDlvKBcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdERlYWxNakl0ZW07XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZE1qTGlzdFtyYW5kb21dO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKiog6I635Y+W5pyA5Y+z5Yeg5Liq6bq75bCG5a2QICovXHJcbiAgICBwdWJsaWMgZ2V0UmlnaHRNakl0ZW0oY291bnQ6IG51bWJlcil7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRNakxpc3Quc2xpY2UodGhpcy52YWxpZE1qTGlzdC5sZW5ndGggLSBjb3VudCwgdGhpcy52YWxpZE1qTGlzdC5sZW5ndGgpOyAgICAgICAgLy8gZGVidWcg5q2k5aSE5LiN5Y+v55SodmFsaWRDb3VudCwg6L+Z5Liq5pWw6YeP5piv5Yqg5LiK5Y+R54mM6YKj5byg55qEXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdpbkhpZGVMYXN0RHJhdygpe1xyXG4gICAgICAgIGlmICh0aGlzLmluUm91bmREZWFsICYmIHRoaXMubGFzdERlYWxNakl0ZW0uYWN0aXZlKXtcclxuICAgICAgICAgICAgdGhpcy5sYXN0RGVhbE1qSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0RGVhbE1qSXRlbS5pc091dCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaW5Sb3VuZERlYWwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog55u05o6l5ZCI5bm25omL54mM5o6S5bqP5bm25Yi35paw5L2N572uXHJcbiAgICAgKiBAcGFyYW0gaXNBbmltIOaYr+WQpuaSreaUvuaVtOeQhuWKqOeUu1xyXG4gICAgICovIFxyXG4gICAgcHVibGljIHNvcnRDYXJkRGlyZWN0bHkoaXNBbmltOiBib29sZWFuID0gZmFsc2Upe1xyXG4gICAgICAgIGlmICh0aGlzLmluUm91bmREZWFsICYmICF0aGlzLmxhc3REZWFsTWpJdGVtLmlzT3V0KXsgICAgICAgIC8vIOaRuOS6hueJjCDlubbkuJTmsqHmnInmiZPlh7rljrvmiJbmnaDlh7rljrsg5ZCI5bm25a6DXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm1qSGFuZExpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IG1qSXRlbSA9IHRoaXMubWpIYW5kTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGlmICghbWpJdGVtLmFjdGl2ZSAmJiBtakl0ZW0uaXNPdXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1qSXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1qSXRlbS5pc091dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIG1qSXRlbS5tYWhqb25nVmFsdWUgPSB0aGlzLmxhc3REZWFsTWpJdGVtLm1haGpvbmdWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxhc3REZWFsTWpJdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3REZWFsTWpJdGVtLmlzT3V0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVWYWxpZFBva2VycygpO1xyXG4gICAgICAgIHRoaXMuc29ydE1qSGFuZExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6bq75bCG5a2Q5pWw6YeP5Y+R55Sf5Y+Y5Yqo5pe26K6+572uICovXHJcbiAgICBwdWJsaWMgdXBkYXRlVmFsaWRQb2tlcnMoKXtcclxuICAgICAgICB0aGlzLnZhbGlkTWpMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy52YWxpZE1qTGlzdCA9IHRoaXMubWpIYW5kTGlzdC5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uYWN0aXZlICYmICFpdGVtLmlzT3V0O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmjpLluo/miYvniYzmlbDnu4Qg5LiN5Yi35paw5L2N572uIOatpOaXtuaYvuekuuWPr+iDveaYr+S5seW6j+eahCAqL1xyXG4gICAgcHJpdmF0ZSBzb3J0TWpIYW5kTGlzdCgpe1xyXG4gICAgICAgIHRoaXMubWpIYW5kTGlzdC5zb3J0KChpdGVtMSwgaXRlbTIpPT57XHJcbiAgICAgICAgICAgIGlmICghaXRlbTEubWFoam9uZ1ZhbHVlIHx8ICFpdGVtMi5tYWhqb25nVmFsdWUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0xLm1haGpvbmdWYWx1ZSAtIGl0ZW0yLm1haGpvbmdWYWx1ZTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpe1xyXG4gICAgICAgIHRoaXMuaW5Sb3VuZERlYWwgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnZhbGlkQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMubWpIYW5kTGlzdC5mb3JFYWNoKGl0ZW09PntcclxuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uaXNTZWxlY3QpXHJcbiAgICAgICAgICAgICAgICBpdGVtLm9uU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIGl0ZW0ucmVzZXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMubGFzdERlYWxNakl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sYXN0RGVhbE1qSXRlbS5yZXNldCgpO1xyXG4gICAgICAgIHRoaXMuaGFuZExheW91dC5lbmFibGVkID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVybWpQbGF5ZXJCcmlnaHRIYW5kVmlldyBleHRlbmRzIEVybWpCYXNlVmlld3tcclxuICAgIHByb3RlY3RlZCBvdXRNak1ncjogRXJtak91dE1qVmlld01hbmFnZXI7XHJcbiAgICBwcml2YXRlIGhhbmRMaXN0Tm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgaGFuZEJyaWdodE1qTGlzdDogRXJtak1haGpvbmdPdXRWaWV3W10gPSBbXTtcclxuICAgIHByaXZhdGUgdmFsaWRWYWx1ZUFycjogbnVtYmVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgaW5Sb3VuZERlYWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlLCBwcm90ZWN0ZWQgblNlYXQ6IG51bWJlcil7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm91dE1qTWdyID0gRXJtakRyaXZlci5pbnN0YW5jZS5vdXRNak1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMuaGFuZExpc3ROb2RlID0gdGhpcy5nZXRDaGlsZChcImhhbmRMaXN0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlsZXnpLrmiYvniYwg6IOh55qE5pe25YCZ5pyA5ZCO5LiA5byg5Li66IOh54mMIOWQrOeJjOWxleekuuWvueWutuaXtuWFqOS4uuaJi+eJjCAqL1xyXG4gICAgcHVibGljIHNob3dEb3duKGNhcmRzOiBudW1iZXJbXSwgaXNXaW46IGJvb2xlYW4gPSBmYWxzZSwgaXNTb3J0OiBib29sZWFuID0gZmFsc2Upe1xyXG4gICAgICAgIGxldCB2YWxpZENvdW50ID0gMDtcclxuICAgICAgICBsZXQgblJlbGF0aXZlID0gdGhpcy5uU2VhdCAtIHRoaXMuQ29udGV4dC5zZWxmTG9jYWxTZWF0O1xyXG4gICAgICAgIGxldCBzdGFydCA9IGNjLlZlYzMuWkVSTztcclxuICAgICAgICBsZXQgbGFzdE9mZnNldCA9IG5SZWxhdGl2ZSA9PSAwID8gY2MudjMoMTAsIDApIDogY2MudjMoLTEwLCAwKTtcclxuICAgICAgICBpZiAoaXNTb3J0KXtcclxuICAgICAgICAgICAgY2FyZHMuc29ydCgodjEsIHYyKT0+e1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHYxIC0gdjI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjYXJkcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBtakl0ZW0gPSB0aGlzLmhhbmRCcmlnaHRNakxpc3RbaV07XHJcbiAgICAgICAgICAgIGlmICghbWpJdGVtKVxyXG4gICAgICAgICAgICAgICAgbWpJdGVtID0gdGhpcy5nZXRPbmVCcmlnaHRNaigpO1xyXG4gICAgICAgICAgICBsZXQgblBlcnNwID0gdGhpcy5EZWZpbmUud2luQnJpZ2h0TWpQZXJzcEFyclt2YWxpZENvdW50XSB8fCAwO1xyXG4gICAgICAgICAgICBtakl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbWpJdGVtLm1haGpvbmdWYWx1ZSA9IGNhcmRzW2ldO1xyXG4gICAgICAgICAgICBtakl0ZW0uaXNGcm9udCA9IHRydWU7XHJcbiAgICAgICAgICAgIG1qSXRlbS5zZXRQZXJzcFN0eWxlKG5QZXJzcCwgblJlbGF0aXZlKTtcclxuICAgICAgICAgICAgbGV0IGNvbmZpZyA9IEVybWpNalN0eWxlSGVscGVyLmdldFBlcnNwZWN0aXZlQ2ZnKG5QZXJzcCk7XHJcbiAgICAgICAgICAgIG1qSXRlbS5ub2RlLnNldFNpYmxpbmdJbmRleCgxNCAtIHZhbGlkQ291bnQpO1xyXG4gICAgICAgICAgICBpZiAoaXNXaW4gJiYgY2FyZHMubGVuZ3RoIC0gMSA9PSBpKXtcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5ub2RlLnNldFBvc2l0aW9uKHN0YXJ0LmFkZChsYXN0T2Zmc2V0KSk7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0uYWN0aXZlID0gZmFsc2U7ICAgICAgICAgIC8vIOiDoeeJjOaKiueJjOaUvuWIsOiDoeeJjOWMuuWfnywg6L+Z6YeM6ZqQ6JeP5o6JXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5ub2RlLnNldFBvc2l0aW9uKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIGxldCBvZmZzZXRYID0gY29uZmlnLmRpciA+IDAgPyBjb25maWcuY2ZnLmRldlNwYWNlWCA6IGNvbmZpZy5jZmcubmVnRGV2U3BhY2VYO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwYWNlWCA9IG5SZWxhdGl2ZSA9PSAwID8gb2Zmc2V0WCA6IC1vZmZzZXRYO1xyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSBjYy52MyhzdGFydC54ICsgc3BhY2VYLCAwKTtcclxuICAgICAgICAgICAgfSAgICAgXHJcbiAgICAgICAgICAgIHZhbGlkQ291bnQgKys7XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRWYWx1ZUFyci5wdXNoKGNhcmRzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZUJyaWdodE1qTGlzdChpc1NlcGFyYXRlZDogYm9vbGVhbil7XHJcbiAgICAgICAgbGV0IGRldiA9IHRoaXMudmFsaWRWYWx1ZUFyci5sZW5ndGggLSB0aGlzLmhhbmRCcmlnaHRNakxpc3QubGVuZ3RoO1xyXG4gICAgICAgIGlmIChkZXYgPiAwKXtcclxuICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkZXY7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldE9uZUJyaWdodE1qKCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB2YWxpZENvdW50ID0gMDtcclxuICAgICAgICBsZXQgblJlbGF0aXZlID0gdGhpcy5uU2VhdCAtIHRoaXMuQ29udGV4dC5zZWxmTG9jYWxTZWF0O1xyXG4gICAgICAgIGxldCBzdGFydCA9IGNjLlZlYzMuWkVSTztcclxuICAgICAgICBsZXQgbGFzdE9mZnNldCA9IG5SZWxhdGl2ZSA9PSAwID8gY2MudjMoMTAsIDApIDogY2MudjMoLTEwLCAwKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5oYW5kQnJpZ2h0TWpMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG1qSXRlbSA9IHRoaXMuaGFuZEJyaWdodE1qTGlzdFtpXTtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy52YWxpZFZhbHVlQXJyW2ldO1xyXG4gICAgICAgICAgICBpZih2YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgblBlcnNwID0gdGhpcy5EZWZpbmUud2luQnJpZ2h0TWpQZXJzcEFyclt2YWxpZENvdW50XSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0ubWFoam9uZ1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0uaXNGcm9udCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0uc2V0UGVyc3BTdHlsZShuUGVyc3AsIG5SZWxhdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0gRXJtak1qU3R5bGVIZWxwZXIuZ2V0UGVyc3BlY3RpdmVDZmcoblBlcnNwKTtcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5ub2RlLnNldFNpYmxpbmdJbmRleCgxNCAtIHZhbGlkQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzU2VwYXJhdGVkICYmIHRoaXMudmFsaWRWYWx1ZUFyci5sZW5ndGggLSAxID09IGkpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1qSXRlbS5ub2RlLnNldFBvc2l0aW9uKHN0YXJ0LmFkZChsYXN0T2Zmc2V0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG1qSXRlbS5ub2RlLnNldFBvc2l0aW9uKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0WCA9IGNvbmZpZy5kaXIgPiAwID8gY29uZmlnLmNmZy5kZXZTcGFjZVggOiBjb25maWcuY2ZnLm5lZ0RldlNwYWNlWDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BhY2VYID0gblJlbGF0aXZlID09IDAgPyBvZmZzZXRYIDogLW9mZnNldFg7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBjYy52MyhzdGFydC54ICsgc3BhY2VYLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhbGlkQ291bnQgKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZHJhd0hhbmRNaih2YWx1ZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLmluUm91bmREZWFsID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnZhbGlkVmFsdWVBcnIucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCcmlnaHRNakxpc3QodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlYWR5Rm9yT3V0KHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuaW5Sb3VuZERlYWwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnNvcnRWYWxpZFZhbHVlTGlzdCgpO1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMudmFsaWRWYWx1ZUFyci5pbmRleE9mKHZhbHVlKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSl7XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWRWYWx1ZUFyci5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkVmFsdWVBcnIucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlQnJpZ2h0TWpMaXN0KHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGFuZ2VGbG93ZXIob3V0QXJyOiBudW1iZXJbXSwgaW5BcnI6IG51bWJlcltdLCBjYWxsYmFjazogRnVuY3Rpb24pe1xyXG4gICAgICAgIGlmKG91dEFyci5sZW5ndGggIT0gMSlcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCJlcnJvciDlj6rkvJrov5vmkbjniYzooaXoirHpmLbmrrVcIiwgb3V0QXJyLmxlbmd0aCk7ICAgICAgLy8g55CG6K665LiK5Y+R54mM5LiN5Lya6L+b6L+ZLCDmiYDku6Xml6DpobvnkIbniYxcclxuICAgICAgICBsZXQgW291dFZhbHVlXSA9IG91dEFycjtcclxuICAgICAgICBsZXQgW2luVmFsdWVdID0gaW5BcnI7XHJcbiAgICAgICAgbGV0IG1qSXRlbSA9IHRoaXMuZmluZE1qSXRlbUJ5VmFsdWUob3V0VmFsdWUpO1xyXG4gICAgICAgIGlmIChtakl0ZW0pe1xyXG4gICAgICAgICAgICBtakl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMudmFsaWRWYWx1ZUFyci5pbmRleE9mKG91dFZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkVmFsdWVBcnIuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgdGhpcy52YWxpZFZhbHVlQXJyLnB1c2goaW5WYWx1ZSk7XHJcbiAgICAgICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0ubWFoam9uZ1ZhbHVlID0gaW5WYWx1ZTtcclxuICAgICAgICAgICAgfSwgMC40KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG91dENhcmQodmFsdWU6IG51bWJlciwgY2FsbGJhY2s6IEZ1bmN0aW9uKXtcclxuICAgICAgICB0aGlzLmluUm91bmREZWFsID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG1qSXRlbSA9IHRoaXMuZmluZE1qSXRlbUJ5VmFsdWUodmFsdWUpO1xyXG4gICAgICAgIGlmIChtakl0ZW0pe1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICBtakl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IC0xO1xyXG4gICAgICAgICAgICBmb3IobGV0IGk9IHRoaXMudmFsaWRWYWx1ZUFyci5sZW5ndGggLTE7IGkgPj0gMDsgaS0tKXtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkVmFsdWVBcnJbaV0gPT0gdmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhazsgICAgICAgICAgLy8g5YCS5bqP5p+l5om+LCDkvJjlhYjlh7rlj7PovrnpgqPlvKBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSlcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRWYWx1ZUFyci5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ydFZhbGlkVmFsdWVMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUJyaWdodE1qTGlzdChmYWxzZSk7XHJcbiAgICAgICAgICAgIH0sIDAuNSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb25nQ2FyZCh2YWx1ZUFycjogbnVtYmVyW10pe1xyXG4gICAgICAgIGxldCBjb3VudCA9IDI7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB2YWx1ZUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBtakl0ZW0gPSB0aGlzLmZpbmRNakl0ZW1CeVZhbHVlKHZhbHVlQXJyW2ldKTtcclxuICAgICAgICAgICAgbWpJdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnZhbGlkVmFsdWVBcnIuaW5kZXhPZih2YWx1ZUFycltpXSk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKVxyXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZFZhbHVlQXJyLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIGNvdW50IC0tO1xyXG4gICAgICAgICAgICBpZiAoY291bnQgPT0gMClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZUJyaWdodE1qTGlzdChmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNob3dDYXJkKHZhbHVlQXJyOiBudW1iZXJbXSwgY2hvd0NhcmQ6IG51bWJlcil7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMjtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaSA8IHZhbHVlQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdmFsdWVBcnJbaV07XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBjaG93Q2FyZClcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBsZXQgbWpJdGVtID0gdGhpcy5maW5kTWpJdGVtQnlWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIG1qSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy52YWxpZFZhbHVlQXJyLmluZGV4T2YodmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSlcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRWYWx1ZUFyci5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICBjb3VudCAtLTtcclxuICAgICAgICAgICAgaWYgKGNvdW50ID09IDApXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVCcmlnaHRNakxpc3QoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBrb25nQ2FyZCh0eXBlOiBudW1iZXIsIHZhbHVlQXJyOiBudW1iZXJbXSl7XHJcbiAgICAgICAgaWYodHlwZSA9PSA0KXsgICAgICAgICAgLy8g55u05p2gIOWOu+aOiTPlvKDmiYvniYxcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMztcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB2YWx1ZUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB2YWx1ZUFycltpXTtcclxuICAgICAgICAgICAgICAgIGxldCBtakl0ZW0gPSB0aGlzLmZpbmRNakl0ZW1CeVZhbHVlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMudmFsaWRWYWx1ZUFyci5pbmRleE9mKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRWYWx1ZUFyci5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgY291bnQgLS07XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHR5cGUgPT0gNSl7ICAgICAvLyDnorDmnaAgMeW8oFxyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSB2YWx1ZUFyclswXTtcclxuICAgICAgICAgICAgbGV0IG1qSXRlbSA9IHRoaXMuZmluZE1qSXRlbUJ5VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICBtakl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMudmFsaWRWYWx1ZUFyci5pbmRleE9mKHZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkVmFsdWVBcnIuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0eXBlID09IDYpeyAgICAgLy8g5pqX5p2gIDTlvKBcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gNDtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7IGkgPCB2YWx1ZUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSB2YWx1ZUFycltpXTtcclxuICAgICAgICAgICAgICAgIGxldCBtakl0ZW0gPSB0aGlzLmZpbmRNakl0ZW1CeVZhbHVlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMudmFsaWRWYWx1ZUFyci5pbmRleE9mKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRWYWx1ZUFyci5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgY291bnQgLS07XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZUJyaWdodE1qTGlzdChmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdpbkhpZGVMYXN0RHJhdyh2YWx1ZTogbnVtYmVyKXtcclxuICAgICAgICBsZXQgbGFzdE1qID0gdGhpcy5oYW5kQnJpZ2h0TWpMaXN0W3RoaXMudmFsaWRWYWx1ZUFyci5sZW5ndGggLSAxXTtcclxuICAgICAgICBpZiAodGhpcy5pblJvdW5kRGVhbCAmJiBsYXN0TWogJiYgbGFzdE1qLm1haGpvbmdWYWx1ZSA9PSB2YWx1ZSl7XHJcbiAgICAgICAgICAgIGxhc3RNai5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pblJvdW5kRGVhbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE9uZUJyaWdodE1qKCl7XHJcbiAgICAgICAgbGV0IG1qSXRlbSA9IHRoaXMub3V0TWpNZ3IuZ2V0T25lQnJpZ2h0TWooKTtcclxuICAgICAgICBtakl0ZW0ubm9kZS5zZXRQYXJlbnQodGhpcy5oYW5kTGlzdE5vZGUpO1xyXG4gICAgICAgIHRoaXMuaGFuZEJyaWdodE1qTGlzdC5wdXNoKG1qSXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIG1qSXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGZpbmRNakl0ZW1CeVZhbHVlKHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMuaGFuZEJyaWdodE1qTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSl7ICAgICAvLyDlgJLluo/mn6Xmib4g5LyY5YWI5paw5pG455qE54mMXHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5oYW5kQnJpZ2h0TWpMaXN0W2ldO1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5hY3RpdmUgJiYgaXRlbS5tYWhqb25nVmFsdWUgPT0gdmFsdWUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzb3J0VmFsaWRWYWx1ZUxpc3QoKXtcclxuICAgICAgICB0aGlzLnZhbGlkVmFsdWVBcnIuc29ydCgodjEsIHYyKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4gdjEgLSB2MjtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpe1xyXG4gICAgICAgIHRoaXMuaW5Sb3VuZERlYWwgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmhhbmRCcmlnaHRNakxpc3QgPSBbXTsgICAgIC8vIOWbnuaUtum6u+WwhuWtkOS6pOe7mUVybWpPdXRNalZpZXdNYW5hZ2VyXHJcbiAgICAgICAgdGhpcy52YWxpZFZhbHVlQXJyID0gW107XHJcbiAgICB9XHJcbn0iXX0=