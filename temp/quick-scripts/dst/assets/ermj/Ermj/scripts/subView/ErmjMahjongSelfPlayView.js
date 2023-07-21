
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/ErmjMahjongSelfPlayView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a74fd9oBRRCiI5sNpg/sORc', 'ErmjMahjongSelfPlayView');
// ermj/Ermj/scripts/subView/ErmjMahjongSelfPlayView.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ErmjBaseView_1 = require("./ErmjBaseView");
var ErmjMahjongHandView_1 = require("./mahjong/ErmjMahjongHandView");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjWinListTipsView_1 = require("./ErmjWinListTipsView");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjMahjongSelfPlayView = /** @class */ (function (_super) {
    __extends(ErmjMahjongSelfPlayView, _super);
    function ErmjMahjongSelfPlayView(node) {
        var _this = _super.call(this) || this;
        /** 显示在用的麻将子数组 不包括摸牌区域那张 发牌时有14张*/
        _this.mjHandList = [];
        /** 未使用的麻将子数组 最多14 */
        _this.unusedMjList = [];
        /** 摸牌区域那张麻将子 发牌阶段需要保证为null */
        _this.lastDealMjItem = null;
        /** 记录13张手牌的等间距排列的位置 摸牌那张取最后一张位置作偏移*/
        _this.rawMjPosList = [];
        _this.touchEnable = false;
        _this.isReadyTing = false;
        _this.tingData = {};
        _this.setNode(node);
        return _this;
    }
    ErmjMahjongSelfPlayView.prototype.initView = function () {
        var _this = this;
        this.touchLayer = this.getChild("touchLayer");
        this.touchLayer.width = cc.Canvas.instance.node.width;
        ErmjGameConst_1.default.addCommonClick(this.touchLayer, "", function () {
            _this.cancelReadyTing();
            _this.resetSelectMj();
        }, this, cc.Button.Transition.NONE);
        var selectLayer = this.getChild("selectLayer");
        selectLayer.on(cc.Node.EventType.TOUCH_START, this.touchStart, this); // selectLayer大小要固定 暂不扩展多选
        this.playTips = this.getChild("callPlayTips");
        this.playTips.active = false;
        this.selfSelectSign = this.getChild("selfSelectSign");
        this.selfSelectSign.active = false;
        this.tingLayer = this.getChild("tingLayer");
        this.tingLayer.active = false;
        this.winTipsView = new ErmjWinListTipsView_1.default(this.getChild("winListTipsView"));
        this.winTipsView.active = false;
        this.initMjList();
    };
    ErmjMahjongSelfPlayView.prototype.initMjList = function () {
        var handRoot = this.getChild("hand");
        var copyMjNode = this.getChild("hand/mahjongHandView");
        copyMjNode.active = true;
        var start = copyMjNode.position;
        var view = new ErmjMahjongHandView_1.default(copyMjNode);
        view.active = false;
        this.unusedMjList.push(view);
        this.rawMjPosList.push(start);
        for (var i = 0; i < this.Define.HandMjMaxCount; i++) {
            var node = cc.instantiate(copyMjNode);
            node.setParent(handRoot);
            node.active = true;
            var pos = start.add(this.Define.SelfHandMahjongSpace.mul(i + 1)); // (0, 0) + (10, 5) * i
            this.rawMjPosList.push(pos); // 记录排列的14个位置
            var view_1 = new ErmjMahjongHandView_1.default(node);
            view_1.active = false;
            this.unusedMjList.push(view_1);
        }
    };
    /**
     * 发牌
     * @param count 一次摸几张
     * @param valueArr 牌值数组 元素空代表暗牌
     */
    ErmjMahjongSelfPlayView.prototype.dealHandMj = function (count, valueArr) {
        if (count === void 0) { count = 1; }
        if (valueArr === void 0) { valueArr = []; }
        for (var i = 0; i < count; i++) {
            var mjItem = this.unusedMjList.pop();
            if (mjItem) {
                mjItem.active = true;
                var index = this.mjHandList.length;
                mjItem.sortIndex = index;
                mjItem.isOut = false;
                if (valueArr[index]) {
                    mjItem.mahjongValue = valueArr[index];
                    mjItem.isFront = true;
                }
                else {
                    mjItem.isFront = false;
                }
                this.mjHandList.push(mjItem);
                mjItem.node.setPosition(this.rawMjPosList[index]);
            }
            else {
                console.error("dealHandMj this.unusedMjList.pop() == null");
                break;
            }
        }
        this.tingLayer.active = false;
        this.touchEnable = true;
    };
    /** 准备出牌 */
    ErmjMahjongSelfPlayView.prototype.readyForOut = function (value) {
        this.touchEnable = true;
        if (this.lastDealMjItem) // 摸了牌直接准备完毕
            return;
        this.touchEnable = false;
        this.resetSelectMj();
        var mjItem;
        if (value) {
            mjItem = this.findMjItemByValue(value);
            this.mjHandList.splice(mjItem.sortIndex, 1);
            this.sortCardDirectly(false);
        }
        else {
            mjItem = this.mjHandList.pop();
        }
        this.lastDealMjItem = mjItem;
        var index = this.mjHandList.length;
        this.lastDealMjItem.sortIndex = index;
        var rawPos = this.rawMjPosList[index - 1];
        mjItem.node.setPosition(rawPos.add(this.Define.LastOneDealOffset[0]));
        this.touchEnable = true;
    };
    /**
     * 摸牌 轮次摸牌 目前只支持摸一张
     * @param value 牌值
     */
    ErmjMahjongSelfPlayView.prototype.drawHandMj = function (value) {
        var _this = this;
        var mjItem = this.unusedMjList.pop();
        if (mjItem) {
            this.touchEnable = false;
            mjItem.active = true;
            mjItem.isOut = false;
            if (value) {
                mjItem.isFront = true;
                mjItem.mahjongValue = value;
            }
            else {
                mjItem.isFront = false;
            }
            if (this.lastDealMjItem) { // 理论上是不会进来的
                console.error("error drawHandMj this.recycleLastDealMj");
                this.recycleLastDealMj();
            }
            this.lastDealMjItem = mjItem;
            var index = this.mjHandList.length;
            this.lastDealMjItem.sortIndex = index;
            var rawPos = this.rawMjPosList[index - 1] || cc.Vec3.ZERO; // debug 退出时概率报错 增加容错
            var endPos = rawPos.add(this.Define.LastOneDealOffset[0]);
            mjItem.doDraw(endPos, 0.2);
            Game.Component.scheduleOnce(function () {
                _this.touchEnable = true;
            }, 0.2);
        }
        else {
            console.error("error drawHandMj this.unusedMjList.pop() == null");
        }
    };
    /**
     * 玩家补花
     * @param outArr 花牌
     * @param inArr 换回来的牌
     * @param isRoundDeal 是否轮次摸牌、开杠摸牌
     */
    ErmjMahjongSelfPlayView.prototype.changeFlower = function (outArr, inArr) {
        var _this = this;
        this.resetSelectMj();
        this.touchEnable = false;
        var count = 0;
        var inCount = inArr.length;
        var outCount = outArr.length;
        if (this.lastDealMjItem) { // 摸牌阶段摸到花牌
            if (inCount > 0) {
                var index = outArr.indexOf(this.lastDealMjItem.mahjongValue);
                if (index > -1) {
                    this.lastDealMjItem.doChangeFlower(inArr[index], 0.2, 0.2);
                }
            }
            else {
                this.lastDealMjItem.doChangeFlower(0, 0.2, 0.2);
            }
            count += 1;
        }
        else { // 发牌时候摸到花牌, 发牌阶段this.lastDealMjItem = null
            if (inCount > 0) {
                for (var i = 0; i < this.mjHandList.length; i++) {
                    var item = this.mjHandList[i];
                    var index = outArr.indexOf(item.mahjongValue); // 花牌唯一此处无须删除
                    if (index > -1) {
                        count++;
                        item.doChangeFlower(inArr[index], 0.2, 0.2);
                    }
                    if (count == outCount) // 补花完毕
                        break;
                }
            }
            else {
                for (var i = this.mjHandList.length - outCount; i < this.mjHandList.length; i++) {
                    var item = this.mjHandList[i];
                    item.doChangeFlower(0, 0.2, 0.2); // 0.2消失 0.2等待 0.2出现
                }
            }
        }
        Game.Component.scheduleOnce(function () {
            if (!_this.lastDealMjItem) {
                _this.sortCardDirectly();
                _this.touchEnable = true; // 发牌时补完花打开触摸, 摸牌补花时开启走readyForOut
            }
        }, 0.71);
    };
    /** 听牌 */
    ErmjMahjongSelfPlayView.prototype.onTing = function () {
        // 听牌后恢复 打开遮罩层
        this.enableAllMjTouch();
        this.tingLayer.active = true;
        this.isReadyTing = false; // 取消准备听状态
        this.resetSelectMj();
    };
    ErmjMahjongSelfPlayView.prototype.enableAllMjTouch = function () {
        if (this.lastDealMjItem) {
            this.lastDealMjItem.setTouchEnable(true);
        }
        this.mjHandList.forEach(function (mjItem) {
            mjItem.setTouchEnable(true);
        });
    };
    /** 是否准备出牌听 */
    ErmjMahjongSelfPlayView.prototype.onTingChooseSwitch = function (isReadyTing, tingData) {
        this.resetSelectMj();
        this.isReadyTing = isReadyTing;
        this.tingData = tingData;
        if (this.isReadyTing && this.tingData.ting_items) {
            var tingMap_1 = this.tingData.ting_items;
            if (this.lastDealMjItem) {
                if (tingMap_1[this.lastDealMjItem.mahjongValue])
                    this.lastDealMjItem.setTouchEnable(true);
                else {
                    this.lastDealMjItem.setTouchEnable(false);
                }
            }
            this.mjHandList.forEach(function (mjItem) {
                if (tingMap_1[mjItem.mahjongValue]) {
                    mjItem.setTouchEnable(true);
                }
                else {
                    mjItem.setTouchEnable(false); // 非打出可听牌置灰
                }
            });
        }
        else {
            this.cancelReadyTing();
        }
    };
    // 麻将子触摸
    ErmjMahjongSelfPlayView.prototype.touchStart = function (event) {
        if (!this.Context.get(this.Define.FieldHandActionEnable) || !this.touchEnable)
            return;
        var touchPos = event.getLocation();
        var startMj = this.getHandMjItemByPos(touchPos);
        if (startMj) {
            Logger.warn("startMj touch sortIndex: ", startMj.sortIndex);
            if (this.selectMj) {
                if (startMj == this.selectMj) {
                    if (this.Context.get(this.Define.FieldInPlayTurn)) { // 自己出牌阶段 点上去的牌 出牌
                        this.onPlay();
                    }
                    else {
                        this.cancelReadyTing();
                        this.resetSelectMj();
                    }
                }
                else { // 切换选中牌
                    this.selectMj.onSelect(); // 下来
                    startMj.onSelect(); // 上去
                    this.selectMj = startMj;
                    this.selfSelectSign.active = true;
                    this.selfSelectSign.setPosition(this.selfSelectSign.parent.convertToNodeSpaceAR(startMj.getSelectSignWorldPos()));
                    if (this.isReadyTing && this.tingData.ting_items) {
                        this.winTipsView.active = true;
                        this.winTipsView.updateWinList(this.tingData.ting_items[this.selectMj.mahjongValue] || []);
                    }
                }
            }
            else {
                this.selectMj = startMj;
                this.selectMj.onSelect(); // 上去
                this.selfSelectSign.active = true;
                this.selfSelectSign.setPosition(this.selfSelectSign.parent.convertToNodeSpaceAR(startMj.getSelectSignWorldPos()));
                if (this.isReadyTing && this.tingData.ting_items) {
                    this.winTipsView.active = true;
                    this.winTipsView.updateWinList(this.tingData.ting_items[this.selectMj.mahjongValue] || []);
                }
            }
        }
        else {
            this.cancelReadyTing();
            this.resetSelectMj();
        }
    };
    /**
     * 获取点击位置的麻将子
     * @param worldPos 世界坐标
     */
    ErmjMahjongSelfPlayView.prototype.getHandMjItemByPos = function (worldPos) {
        if (this.lastDealMjItem && this.lastDealMjItem.checkMjValid() && this.lastDealMjItem.checkIsTouch(worldPos)) {
            return this.lastDealMjItem;
        }
        else {
            for (var i = 0; i < this.mjHandList.length; i++) {
                var item = this.mjHandList[i];
                if (item.checkMjValid() && item.checkIsTouch(worldPos)) { // 麻将子不作叠着放, 故可以直接checkIsTouch判断
                    return item;
                }
            }
        }
    };
    ErmjMahjongSelfPlayView.prototype.showPlayTips = function (flag) {
        this.playTips.active = flag;
    };
    ErmjMahjongSelfPlayView.prototype.resetSelectMj = function () {
        this.selfSelectSign.active = false;
        if (this.selectMj) {
            if (this.selectMj.isSelect)
                this.selectMj.onSelect();
            this.selectMj = null;
        }
    };
    ErmjMahjongSelfPlayView.prototype.cancelReadyTing = function () {
        if (!this.isReadyTing) {
            this.enableAllMjTouch();
        }
        if (!this.Context.get(this.Define.FieldInTing))
            this.winTipsView.active = false;
    };
    /** 出掉手中指定吃碰杠牌 */
    ErmjMahjongSelfPlayView.prototype.hideOperCard = function (valueArr) {
        this.isReadyTing = false;
        this.cancelReadyTing();
        this.resetSelectMj();
        var count = 0;
        var tempArr = __spreadArrays(valueArr);
        if (this.lastDealMjItem) { // debug 处理杠完摸到一张又可以杠的牌
            var index = tempArr.indexOf(this.lastDealMjItem.mahjongValue);
            if (index > -1) {
                count++;
                tempArr.splice(index, 1);
                this.recycleLastDealMj();
            }
        }
        for (var i = 0; i < this.mjHandList.length; i++) {
            if (count == valueArr.length)
                break;
            var mjItem = this.mjHandList[i];
            var index = tempArr.indexOf(mjItem.mahjongValue);
            if (index > -1) {
                count++;
                tempArr.splice(index, 1);
                mjItem.active = false;
                mjItem.isOut = true;
            }
        }
        this.recycleUsedOutMjItem();
        this.sortCardDirectly(false);
        this.touchEnable = false; // 吃碰杠时关闭触摸, 开启走readyForOut
    };
    ErmjMahjongSelfPlayView.prototype.onPlay = function () {
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.OutCard, true);
        this.playMj = this.selectMj;
        if (this.isReadyTing) {
            Game.Server.send(this.Define.CmdTing, { card: this.playMj.mahjongValue });
        }
        else {
            Game.Server.send(this.Define.CmdPlay, { card: this.playMj.mahjongValue });
        }
        this.playMj.active = false;
        this.showPlayTips(false);
        // this.resetSelectMj();
        // this.outCard(this.playMj.mahjongValue, true);        // 回包再动画 这里直接动画 临界状态会有问题
        this.Context.set(this.Define.FieldInPlayTurn, false);
    };
    /**
     * 出牌动画 手牌消失和整理
     * @param value 出的麻将子值
     * @param isSortAnim 是否播放整理动画
     * @param isAuto 是否系统出牌  处理临界状态
     */
    ErmjMahjongSelfPlayView.prototype.outCard = function (value, isSortAnim, isAuto) {
        if (isAuto === void 0) { isAuto = false; }
        this.isReadyTing = false;
        this.cancelReadyTing();
        this.resetSelectMj();
        var outItem;
        if (!isAuto) {
            if (this.playMj && !this.playMj.isOut && this.playMj.mahjongValue == value) { // 主动出牌理论只会进这
                outItem = this.playMj;
            }
            else {
                if (this.lastDealMjItem && !this.lastDealMjItem.isOut && this.lastDealMjItem.mahjongValue == value) {
                    outItem = this.lastDealMjItem;
                }
                else {
                    outItem = this.findMjItemByValue(value);
                }
            }
        }
        else {
            var check = false;
            if (this.playMj && !this.playMj.isOut) {
                Logger.error("outCard 临界状态");
                if (this.playMj.mahjongValue !== value) { // 系统出不是这张 就再显示出来 找其他
                    this.playMj.active = true;
                    check = false;
                }
                else {
                    outItem = this.playMj; // 刚好这张 将错就错
                    check = true;
                }
            }
            if (!check) {
                if (this.lastDealMjItem && !this.lastDealMjItem.isOut && this.lastDealMjItem.mahjongValue == value) {
                    outItem = this.lastDealMjItem;
                }
                else {
                    outItem = this.findMjItemByValue(value);
                }
            }
        }
        if (outItem && !outItem.isOut) {
            outItem.active = false;
            outItem.isOut = true;
            this.touchEnable = false;
            if (isSortAnim && this.lastDealMjItem) { // 摸了牌才走合牌动画, 如果出的是lastDealMjItem 无须理牌动画
                if (outItem !== this.lastDealMjItem) {
                    this.sortDrawCardAmin(outItem);
                }
                else {
                    this.recycleLastDealMj();
                    this.touchEnable = true;
                }
            }
            else {
                this.recycleUsedOutMjItem();
                this.sortCardDirectly(false);
                this.touchEnable = true;
            }
        }
        else {
            console.error("error outCard outIndex == -1", this.playMj, this.lastDealMjItem); // 找不到要出的指定牌
        }
        this.playMj = null;
    };
    ErmjMahjongSelfPlayView.prototype.findMjItemByValue = function (value) {
        for (var i = 0; i < this.mjHandList.length; i++) {
            var item = this.mjHandList[i];
            if (!item.isOut && item.mahjongValue == value)
                return item;
        }
    };
    /**
    * 整理摸牌区域到手牌 摸了一张牌后出牌才走这
    * @param outItem 打出的牌
    */
    ErmjMahjongSelfPlayView.prototype.sortDrawCardAmin = function (outItem) {
        if (!outItem || !this.lastDealMjItem)
            return;
        var outIndex = outItem.sortIndex;
        // 计算插入索引 默认最左边 找不到则放在最左边0位置
        var tempIndex = 0;
        if (outItem.mahjongValue == this.lastDealMjItem.mahjongValue) { // 打出牌跟摸牌区域牌一致
            tempIndex = outIndex;
        }
        else {
            // 此处都是排好序的mjHandList
            for (var i = 0; i < this.mjHandList.length; i++) { // 找到lastDealMjItem所应该塞进去的位置
                if (i >= this.Define.HandMjMaxCount)
                    break;
                var item = this.mjHandList[i];
                if (item.mahjongValue <= this.lastDealMjItem.mahjongValue) {
                    tempIndex = i + 1;
                }
                else {
                    break;
                }
            }
        }
        // 动画
        var panMoveTime = 0.2;
        Logger.error("sortDrawCardAmin", outIndex, tempIndex, this.mjHandList.length);
        if (tempIndex == outIndex) { // 刚好在出的那张位置, lastDealMjItem直接插入
            var isLast = tempIndex == this.mjHandList.length - 1;
            this.doSortLastDealMove(outIndex, !isLast, 0);
        }
        else if (tempIndex == this.mjHandList.length) { // 刚好在末尾 outIndex往后所有麻将子左移, lastDealMjItem左移到最后
            this.doSortPanMove(outIndex + 1, this.mjHandList.length - 1, false, panMoveTime);
            this.doSortLastDealMove(this.mjHandList.length - 1, false, 0);
        }
        else if (tempIndex > outIndex) { // 插入在出牌点之后 outIndex+1到tempIndex-1所有麻将子左移, lastDealMjItem再插入
            this.doSortPanMove(outIndex + 1, tempIndex - 1, false, panMoveTime);
            this.doSortLastDealMove(tempIndex - 1, true, 0.2);
        }
        else { // 插入在出牌点之前 从tempIndex到outIndex-1所有麻将子右移, lastDealMjItem再插入
            this.doSortPanMove(tempIndex, outIndex - 1, true, panMoveTime);
            this.doSortLastDealMove(tempIndex, true, 0.2);
        }
    };
    // 平移
    ErmjMahjongSelfPlayView.prototype.doSortPanMove = function (bIndex, eIndex, bRight, time) {
        if (bRight === void 0) { bRight = true; }
        if (time === void 0) { time = 0.5; }
        var nDirection = bRight && 1 || -1;
        for (var i = bIndex; i <= eIndex; i++) {
            var item = this.mjHandList[i];
            if (item && this.rawMjPosList[i + nDirection]) {
                item.doMove(this.rawMjPosList[i + nDirection], time);
                item.sortIndex += nDirection;
            }
            else {
                console.error("doSortPanMove error", i, nDirection);
            }
        }
    };
    /**
     * 摸牌区域那张合并动画
     * @param aimIndex 目的索引
     * @param bUp 是否上提动画
     * @param delay 延时
     */
    ErmjMahjongSelfPlayView.prototype.doSortLastDealMove = function (aimIndex, bUp, delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        if (!this.lastDealMjItem || !this.rawMjPosList[aimIndex]) {
            console.error("doSortLastDealMove error", aimIndex);
            return;
        }
        var beginPos = this.lastDealMjItem.node.position;
        var endPos = this.rawMjPosList[aimIndex];
        var _a = this.lastDealMjItem.getRealSize(), width = _a[0], height = _a[1];
        this.lastDealMjItem.sortIndex = aimIndex;
        if (bUp) {
            var dev = Global.Toolkit.getVec2Distance(beginPos, endPos);
            var time = Math.max(dev / 2000, 0.2);
            this.lastDealMjItem.doMove(beginPos.add(cc.v3(0, height + 5)), 0.1, delay);
            this.lastDealMjItem.doMove(endPos.add(cc.v3(0, height + 5)), time, 0.1 + delay);
            this.lastDealMjItem.doMove(endPos, 0.1, time + 0.1 + delay, function () {
                _this.recycleUsedOutMjItem(); // 先动画再回收
                _this.pushLastIntoHandList(aimIndex);
                _this.sortMjHandList();
                _this.touchEnable = true;
            });
        }
        else {
            this.lastDealMjItem.doMove(endPos, 0.2, delay, function () {
                _this.recycleUsedOutMjItem(); // 先动画再回收
                _this.pushLastIntoHandList(aimIndex);
                _this.sortMjHandList();
                _this.touchEnable = true;
            });
        }
    };
    ErmjMahjongSelfPlayView.prototype.doWin = function () {
        this.isReadyTing = false;
        this.cancelReadyTing();
        this.resetSelectMj();
    };
    /** 自摸时隐藏最后一张胡牌 */
    ErmjMahjongSelfPlayView.prototype.winHideLastDraw = function (value) {
        if (this.lastDealMjItem && this.lastDealMjItem.mahjongValue == value) {
            this.recycleLastDealMj();
        }
    };
    /**
     * 直接合并手牌排序并刷新位置
     * @param isAnim 是否播放整理动画
     */
    ErmjMahjongSelfPlayView.prototype.sortCardDirectly = function (isAnim) {
        var _this = this;
        if (isAnim === void 0) { isAnim = false; }
        this.pushLastIntoHandList();
        this.sortMjHandList();
        if (!isAnim) {
            this.mjHandList.forEach(function (item, index) {
                item.active = true;
                item.isOut = false;
                item.sortIndex = index;
                item.node.setPosition(_this.rawMjPosList[index]);
            });
        }
        else {
            // 整理动画 
        }
    };
    /**
     * 将摸牌区域牌合并到手牌
     * @param index 指定位置 -1表插入到末尾
     */
    ErmjMahjongSelfPlayView.prototype.pushLastIntoHandList = function (index) {
        if (index === void 0) { index = -1; }
        if (this.lastDealMjItem) {
            var i = (index >= 0 && index < this.mjHandList.length) ? index : this.mjHandList.length;
            this.mjHandList.splice(i, 0, this.lastDealMjItem);
            this.lastDealMjItem = null;
        }
    };
    /** 排序手牌数组 不刷新位置 sortIndex此时是乱的 */
    ErmjMahjongSelfPlayView.prototype.sortMjHandList = function () {
        this.mjHandList.sort(function (item1, item2) {
            if (!item1.mahjongValue || !item2.mahjongValue)
                return 0;
            return item1.mahjongValue - item2.mahjongValue;
        });
    };
    ErmjMahjongSelfPlayView.prototype.recycleUsedOutMjItem = function () {
        var _this = this;
        this.sortMjHandList();
        var outArr = [];
        var handArr = [];
        for (var i = 0; i < this.mjHandList.length; i++) {
            var mjItem = this.mjHandList[i];
            if (!mjItem.active || mjItem.isOut) {
                outArr.push(mjItem);
            }
            else {
                handArr.push(mjItem);
            }
        }
        this.mjHandList = handArr; // 还在手上的赋值
        outArr.forEach(function (mjItem) {
            mjItem.active = false;
            mjItem.reset();
            _this.unusedMjList.push(mjItem);
        });
    };
    /**回收所有已使用麻将子 */
    ErmjMahjongSelfPlayView.prototype.recycleAllUsedMjItems = function () {
        this.recycleLastDealMj();
        for (var i = 0; i < this.mjHandList.length; i++) {
            var item = this.mjHandList[i];
            item.active = false;
            item.reset();
            this.unusedMjList.push(item);
        }
        this.mjHandList = [];
    };
    ErmjMahjongSelfPlayView.prototype.recycleLastDealMj = function () {
        if (this.lastDealMjItem) {
            this.lastDealMjItem.active = false;
            this.lastDealMjItem.reset();
            this.unusedMjList.push(this.lastDealMjItem);
            this.lastDealMjItem = null;
        }
    };
    ErmjMahjongSelfPlayView.prototype.clearByRound = function () {
        this.playMj = null;
        this.playTips.active = false;
        this.touchEnable = false;
        this.resetSelectMj();
        this.recycleAllUsedMjItems();
        this.winTipsView.active = false;
        this.isReadyTing = false;
        this.tingData = {};
        this.tingLayer.active = false;
    };
    return ErmjMahjongSelfPlayView;
}(ErmjBaseView_1.default));
exports.default = ErmjMahjongSelfPlayView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcRXJtak1haGpvbmdTZWxmUGxheVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUEwQztBQUMxQyxxRUFBZ0U7QUFDaEUseURBQXdEO0FBQ3hELDZEQUF3RDtBQUN4RCx1REFBa0Q7QUFFbEQ7SUFBcUQsMkNBQVk7SUFzQjdELGlDQUFZLElBQWE7UUFBekIsWUFDSSxpQkFBTyxTQUVWO1FBbEJELGtDQUFrQztRQUMxQixnQkFBVSxHQUEwQixFQUFFLENBQUM7UUFDL0MscUJBQXFCO1FBQ2Isa0JBQVksR0FBMEIsRUFBRSxDQUFDO1FBQ2pELDhCQUE4QjtRQUN0QixvQkFBYyxHQUF3QixJQUFJLENBQUM7UUFDbkQscUNBQXFDO1FBQzdCLGtCQUFZLEdBQWMsRUFBRSxDQUFDO1FBQzdCLGlCQUFXLEdBQVksS0FBSyxDQUFDO1FBSTdCLGlCQUFXLEdBQVksS0FBSyxDQUFDO1FBQzdCLGNBQVEsR0FBUSxFQUFFLENBQUM7UUFJdkIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLDBDQUFRLEdBQWxCO1FBQUEsaUJBc0JDO1FBckJHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RELHVCQUFhLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFO1lBQzlDLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMs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cnQgRXJtakJhc2VWaWV3IGZyb20gXCIuL0VybWpCYXNlVmlld1wiO1xyXG5pbXBvcnQgRXJtak1haGpvbmdIYW5kVmlldyBmcm9tIFwiLi9tYWhqb25nL0VybWpNYWhqb25nSGFuZFZpZXdcIjtcclxuaW1wb3J0IHsgRXJtakF1ZGlvQ29uc3QgfSBmcm9tIFwiLi4vZGF0YS9Fcm1qUGF0aEhlbHBlclwiO1xyXG5pbXBvcnQgRXJtaldpbkxpc3RUaXBzVmlldyBmcm9tIFwiLi9Fcm1qV2luTGlzdFRpcHNWaWV3XCI7XHJcbmltcG9ydCBFcm1qR2FtZUNvbnN0IGZyb20gXCIuLi9kYXRhL0VybWpHYW1lQ29uc3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpNYWhqb25nU2VsZlBsYXlWaWV3IGV4dGVuZHMgRXJtakJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSB0b3VjaExheWVyOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBwbGF5VGlwczogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgc2VsZWN0TWo6IEVybWpNYWhqb25nSGFuZFZpZXc7ICAgICAgLy8g6YCJ5LitXHJcbiAgICBwcml2YXRlIHBsYXlNajogRXJtak1haGpvbmdIYW5kVmlldzsgICAgICAgIC8vIOWHuueJjFxyXG4gICAgcHJpdmF0ZSBzZWxmU2VsZWN0U2lnbjogY2MuTm9kZTtcclxuICAgIFxyXG4gICAgLyoqIOaYvuekuuWcqOeUqOeahOm6u+WwhuWtkOaVsOe7hCDkuI3ljIXmi6zmkbjniYzljLrln5/pgqPlvKAg5Y+R54mM5pe25pyJMTTlvKAqL1xyXG4gICAgcHJpdmF0ZSBtakhhbmRMaXN0OiBFcm1qTWFoam9uZ0hhbmRWaWV3W10gPSBbXTtcclxuICAgIC8qKiDmnKrkvb/nlKjnmoTpurvlsIblrZDmlbDnu4Qg5pyA5aSaMTQgKi9cclxuICAgIHByaXZhdGUgdW51c2VkTWpMaXN0OiBFcm1qTWFoam9uZ0hhbmRWaWV3W10gPSBbXTtcclxuICAgIC8qKiDmkbjniYzljLrln5/pgqPlvKDpurvlsIblrZAg5Y+R54mM6Zi25q616ZyA6KaB5L+d6K+B5Li6bnVsbCAqL1xyXG4gICAgcHJpdmF0ZSBsYXN0RGVhbE1qSXRlbTogRXJtak1haGpvbmdIYW5kVmlldyA9IG51bGw7XHJcbiAgICAvKiog6K6w5b2VMTPlvKDmiYvniYznmoTnrYnpl7Tot53mjpLliJfnmoTkvY3nva4g5pG454mM6YKj5byg5Y+W5pyA5ZCO5LiA5byg5L2N572u5L2c5YGP56e7Ki9cclxuICAgIHByaXZhdGUgcmF3TWpQb3NMaXN0OiBjYy5WZWMzW10gPSBbXTtcclxuICAgIHByaXZhdGUgdG91Y2hFbmFibGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgd2luVGlwc1ZpZXc6IEVybWpXaW5MaXN0VGlwc1ZpZXc7XHJcbiAgICBwcml2YXRlIHRpbmdMYXllcjogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgaXNSZWFkeVRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgdGluZ0RhdGE6IGFueSA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMudG91Y2hMYXllciA9IHRoaXMuZ2V0Q2hpbGQoXCJ0b3VjaExheWVyXCIpO1xyXG4gICAgICAgIHRoaXMudG91Y2hMYXllci53aWR0aCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLndpZHRoO1xyXG4gICAgICAgIEVybWpHYW1lQ29uc3QuYWRkQ29tbW9uQ2xpY2sodGhpcy50b3VjaExheWVyLCBcIlwiLCAoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbFJlYWR5VGluZygpO1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0U2VsZWN0TWooKTtcclxuICAgICAgICB9LCB0aGlzLCBjYy5CdXR0b24uVHJhbnNpdGlvbi5OT05FKTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGVjdExheWVyID0gdGhpcy5nZXRDaGlsZChcInNlbGVjdExheWVyXCIpO1xyXG4gICAgICAgIHNlbGVjdExheWVyLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLnRvdWNoU3RhcnQsIHRoaXMpOyAgLy8gc2VsZWN0TGF5ZXLlpKflsI/opoHlm7rlrpog5pqC5LiN5omp5bGV5aSa6YCJXHJcblxyXG4gICAgICAgIHRoaXMucGxheVRpcHMgPSB0aGlzLmdldENoaWxkKFwiY2FsbFBsYXlUaXBzXCIpO1xyXG4gICAgICAgIHRoaXMucGxheVRpcHMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZWxmU2VsZWN0U2lnbiA9IHRoaXMuZ2V0Q2hpbGQoXCJzZWxmU2VsZWN0U2lnblwiKTtcclxuICAgICAgICB0aGlzLnNlbGZTZWxlY3RTaWduLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnRpbmdMYXllciA9IHRoaXMuZ2V0Q2hpbGQoXCJ0aW5nTGF5ZXJcIik7XHJcbiAgICAgICAgdGhpcy50aW5nTGF5ZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy53aW5UaXBzVmlldyA9IG5ldyBFcm1qV2luTGlzdFRpcHNWaWV3KHRoaXMuZ2V0Q2hpbGQoXCJ3aW5MaXN0VGlwc1ZpZXdcIikpO1xyXG4gICAgICAgIHRoaXMud2luVGlwc1ZpZXcuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdE1qTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdE1qTGlzdCgpe1xyXG4gICAgICAgIGxldCBoYW5kUm9vdCA9IHRoaXMuZ2V0Q2hpbGQoXCJoYW5kXCIpO1xyXG4gICAgICAgIGxldCBjb3B5TWpOb2RlID0gdGhpcy5nZXRDaGlsZChcImhhbmQvbWFoam9uZ0hhbmRWaWV3XCIpO1xyXG4gICAgICAgIGNvcHlNak5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc3RhcnQgPSBjb3B5TWpOb2RlLnBvc2l0aW9uO1xyXG4gICAgICAgIGxldCB2aWV3ID0gbmV3IEVybWpNYWhqb25nSGFuZFZpZXcoY29weU1qTm9kZSk7XHJcbiAgICAgICAgdmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVudXNlZE1qTGlzdC5wdXNoKHZpZXcpO1xyXG4gICAgICAgIHRoaXMucmF3TWpQb3NMaXN0LnB1c2goc3RhcnQpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5EZWZpbmUuSGFuZE1qTWF4Q291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUoY29weU1qTm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuc2V0UGFyZW50KGhhbmRSb290KTtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgcG9zID0gc3RhcnQuYWRkKHRoaXMuRGVmaW5lLlNlbGZIYW5kTWFoam9uZ1NwYWNlLm11bChpICsgMSkpOyAgICAgICAvLyAoMCwgMCkgKyAoMTAsIDUpICogaVxyXG4gICAgICAgICAgICB0aGlzLnJhd01qUG9zTGlzdC5wdXNoKHBvcyk7ICAgICAgICAgICAgLy8g6K6w5b2V5o6S5YiX55qEMTTkuKrkvY3nva5cclxuICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgRXJtak1haGpvbmdIYW5kVmlldyhub2RlKTtcclxuICAgICAgICAgICAgdmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy51bnVzZWRNakxpc3QucHVzaCh2aWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5HniYxcclxuICAgICAqIEBwYXJhbSBjb3VudCDkuIDmrKHmkbjlh6DlvKBcclxuICAgICAqIEBwYXJhbSB2YWx1ZUFyciDniYzlgLzmlbDnu4Qg5YWD57Sg56m65Luj6KGo5pqX54mMXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWFsSGFuZE1qKGNvdW50OiBudW1iZXIgPSAxLCB2YWx1ZUFycjogbnVtYmVyW10gPSBbXSl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGk8IGNvdW50OyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgbWpJdGVtID0gdGhpcy51bnVzZWRNakxpc3QucG9wKCk7XHJcbiAgICAgICAgICAgIGlmIChtakl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm1qSGFuZExpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLnNvcnRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLmlzT3V0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVBcnJbaW5kZXhdKXtcclxuICAgICAgICAgICAgICAgICAgICBtakl0ZW0ubWFoam9uZ1ZhbHVlID0gdmFsdWVBcnJbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIG1qSXRlbS5pc0Zyb250ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbWpJdGVtLmlzRnJvbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubWpIYW5kTGlzdC5wdXNoKG1qSXRlbSk7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0ubm9kZS5zZXRQb3NpdGlvbih0aGlzLnJhd01qUG9zTGlzdFtpbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZGVhbEhhbmRNaiB0aGlzLnVudXNlZE1qTGlzdC5wb3AoKSA9PSBudWxsXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aW5nTGF5ZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50b3VjaEVuYWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOWHhuWkh+WHuueJjCAqL1xyXG4gICAgcHVibGljIHJlYWR5Rm9yT3V0KHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMudG91Y2hFbmFibGUgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLmxhc3REZWFsTWpJdGVtKSAgICAgICAgLy8g5pG45LqG54mM55u05o6l5YeG5aSH5a6M5q+VXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnRvdWNoRW5hYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXNldFNlbGVjdE1qKCk7XHJcbiAgICAgICAgbGV0IG1qSXRlbTogRXJtak1haGpvbmdIYW5kVmlldztcclxuICAgICAgICBpZiAodmFsdWUpe1xyXG4gICAgICAgICAgICBtakl0ZW0gPSB0aGlzLmZpbmRNakl0ZW1CeVZhbHVlKHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5takhhbmRMaXN0LnNwbGljZShtakl0ZW0uc29ydEluZGV4LCAxKTtcclxuICAgICAgICAgICAgdGhpcy5zb3J0Q2FyZERpcmVjdGx5KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbWpJdGVtID0gdGhpcy5takhhbmRMaXN0LnBvcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sYXN0RGVhbE1qSXRlbSA9IG1qSXRlbTtcclxuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLm1qSGFuZExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMubGFzdERlYWxNakl0ZW0uc29ydEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgbGV0IHJhd1BvcyA9IHRoaXMucmF3TWpQb3NMaXN0W2luZGV4IC0gMV07XHJcbiAgICAgICAgbWpJdGVtLm5vZGUuc2V0UG9zaXRpb24ocmF3UG9zLmFkZCh0aGlzLkRlZmluZS5MYXN0T25lRGVhbE9mZnNldFswXSkpOyBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnRvdWNoRW5hYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRuOeJjCDova7mrKHmkbjniYwg55uu5YmN5Y+q5pSv5oyB5pG45LiA5bygXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUg54mM5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkcmF3SGFuZE1qKHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBtakl0ZW0gPSB0aGlzLnVudXNlZE1qTGlzdC5wb3AoKTtcclxuICAgICAgICBpZiAobWpJdGVtKXtcclxuICAgICAgICAgICAgdGhpcy50b3VjaEVuYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBtakl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbWpJdGVtLmlzT3V0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0uaXNGcm9udCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0ubWFoam9uZ1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5pc0Zyb250ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMubGFzdERlYWxNakl0ZW0peyAgICAgICAgICAgIC8vIOeQhuiuuuS4iuaYr+S4jeS8mui/m+adpeeahFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yIGRyYXdIYW5kTWogdGhpcy5yZWN5Y2xlTGFzdERlYWxNalwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWN5Y2xlTGFzdERlYWxNaigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubGFzdERlYWxNakl0ZW0gPSBtakl0ZW07XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMubWpIYW5kTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdERlYWxNakl0ZW0uc29ydEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIGxldCByYXdQb3MgPSB0aGlzLnJhd01qUG9zTGlzdFtpbmRleCAtIDFdIHx8IGNjLlZlYzMuWkVSTzsgICAgICAvLyBkZWJ1ZyDpgIDlh7rml7bmpoLnjofmiqXplJkg5aKe5Yqg5a656ZSZXHJcbiAgICAgICAgICAgIGxldCBlbmRQb3MgPSByYXdQb3MuYWRkKHRoaXMuRGVmaW5lLkxhc3RPbmVEZWFsT2Zmc2V0WzBdKTtcclxuICAgICAgICAgICAgbWpJdGVtLmRvRHJhdyhlbmRQb3MsIDAuMik7XHJcbiAgICAgICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3VjaEVuYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0sIDAuMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvciBkcmF3SGFuZE1qIHRoaXMudW51c2VkTWpMaXN0LnBvcCgpID09IG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog546p5a626KGl6IqxXHJcbiAgICAgKiBAcGFyYW0gb3V0QXJyIOiKseeJjFxyXG4gICAgICogQHBhcmFtIGluQXJyIOaNouWbnuadpeeahOeJjFxyXG4gICAgICogQHBhcmFtIGlzUm91bmREZWFsIOaYr+WQpui9ruasoeaRuOeJjOOAgeW8gOadoOaRuOeJjFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hhbmdlRmxvd2VyKG91dEFycjogbnVtYmVyW10sIGluQXJyOiBudW1iZXJbXSl7XHJcbiAgICAgICAgdGhpcy5yZXNldFNlbGVjdE1qKCk7XHJcbiAgICAgICAgdGhpcy50b3VjaEVuYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgbGV0IGluQ291bnQgPSBpbkFyci5sZW5ndGg7XHJcbiAgICAgICAgbGV0IG91dENvdW50ID0gb3V0QXJyLmxlbmd0aDtcclxuICAgICAgICBpZiAodGhpcy5sYXN0RGVhbE1qSXRlbSl7ICAgICAgICAgICAvLyDmkbjniYzpmLbmrrXmkbjliLDoirHniYxcclxuICAgICAgICAgICAgaWYgKGluQ291bnQgPiAwKXtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IG91dEFyci5pbmRleE9mKHRoaXMubGFzdERlYWxNakl0ZW0ubWFoam9uZ1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3REZWFsTWpJdGVtLmRvQ2hhbmdlRmxvd2VyKGluQXJyW2luZGV4XSwgMC4yLCAwLjIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3REZWFsTWpJdGVtLmRvQ2hhbmdlRmxvd2VyKDAsIDAuMiwgMC4yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb3VudCArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNleyAgICAgICAgLy8g5Y+R54mM5pe25YCZ5pG45Yiw6Iqx54mMLCDlj5HniYzpmLbmrrV0aGlzLmxhc3REZWFsTWpJdGVtID0gbnVsbFxyXG4gICAgICAgICAgICBpZiAoaW5Db3VudCA+IDApe1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubWpIYW5kTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLm1qSGFuZExpc3RbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gb3V0QXJyLmluZGV4T2YoaXRlbS5tYWhqb25nVmFsdWUpOyAgICAgIC8vIOiKseeJjOWUr+S4gOatpOWkhOaXoOmhu+WIoOmZpFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQgKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZG9DaGFuZ2VGbG93ZXIoaW5BcnJbaW5kZXhdLCAwLjIsIDAuMik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PSBvdXRDb3VudCkgICAgIC8vIOihpeiKseWujOavlVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gdGhpcy5takhhbmRMaXN0Lmxlbmd0aCAtIG91dENvdW50OyBpIDwgdGhpcy5takhhbmRMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMubWpIYW5kTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmRvQ2hhbmdlRmxvd2VyKDAsIDAuMiwgMC4yKTsgICAgICAvLyAwLjLmtojlpLEgMC4y562J5b6FIDAuMuWHuueOsFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKT0+eyAgIC8vIOihpeiKseWQjuaVtOeQhuaJi+eJjFxyXG4gICAgICAgICAgICBpZighdGhpcy5sYXN0RGVhbE1qSXRlbSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRDYXJkRGlyZWN0bHkoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG91Y2hFbmFibGUgPSB0cnVlOyAgICAgICAgLy8g5Y+R54mM5pe26KGl5a6M6Iqx5omT5byA6Kem5pG4LCDmkbjniYzooaXoirHml7blvIDlkK/otbByZWFkeUZvck91dFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMC43MSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiDlkKzniYwgKi9cclxuICAgIHB1YmxpYyBvblRpbmcoKXtcclxuICAgICAgICAvLyDlkKzniYzlkI7mgaLlpI0g5omT5byA6YGu572p5bGCXHJcbiAgICAgICAgdGhpcy5lbmFibGVBbGxNalRvdWNoKCk7XHJcbiAgICAgICAgdGhpcy50aW5nTGF5ZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzUmVhZHlUaW5nID0gZmFsc2U7ICAgICAgIC8vIOWPlua2iOWHhuWkh+WQrOeKtuaAgVxyXG4gICAgICAgIHRoaXMucmVzZXRTZWxlY3RNaigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZW5hYmxlQWxsTWpUb3VjaCgpe1xyXG4gICAgICAgIGlmKHRoaXMubGFzdERlYWxNakl0ZW0pe1xyXG4gICAgICAgICAgICB0aGlzLmxhc3REZWFsTWpJdGVtLnNldFRvdWNoRW5hYmxlKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1qSGFuZExpc3QuZm9yRWFjaChtakl0ZW09PntcclxuICAgICAgICAgICAgbWpJdGVtLnNldFRvdWNoRW5hYmxlKHRydWUpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaYr+WQpuWHhuWkh+WHuueJjOWQrCAqL1xyXG4gICAgcHVibGljIG9uVGluZ0Nob29zZVN3aXRjaChpc1JlYWR5VGluZzogYm9vbGVhbiwgdGluZ0RhdGE6IGFueSl7XHJcbiAgICAgICAgdGhpcy5yZXNldFNlbGVjdE1qKCk7XHJcbiAgICAgICAgdGhpcy5pc1JlYWR5VGluZyA9IGlzUmVhZHlUaW5nO1xyXG4gICAgICAgIHRoaXMudGluZ0RhdGEgPSB0aW5nRGF0YTtcclxuICAgICAgICBpZiAodGhpcy5pc1JlYWR5VGluZyAmJiB0aGlzLnRpbmdEYXRhLnRpbmdfaXRlbXMpe1xyXG4gICAgICAgICAgICBsZXQgdGluZ01hcCA9IHRoaXMudGluZ0RhdGEudGluZ19pdGVtcztcclxuICAgICAgICAgICAgaWYodGhpcy5sYXN0RGVhbE1qSXRlbSl7XHJcbiAgICAgICAgICAgICAgICBpZiAodGluZ01hcFt0aGlzLmxhc3REZWFsTWpJdGVtLm1haGpvbmdWYWx1ZV0pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0RGVhbE1qSXRlbS5zZXRUb3VjaEVuYWJsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0RGVhbE1qSXRlbS5zZXRUb3VjaEVuYWJsZShmYWxzZSk7ICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5takhhbmRMaXN0LmZvckVhY2gobWpJdGVtPT57XHJcbiAgICAgICAgICAgICAgICBpZiAodGluZ01hcFttakl0ZW0ubWFoam9uZ1ZhbHVlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWpJdGVtLnNldFRvdWNoRW5hYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBtakl0ZW0uc2V0VG91Y2hFbmFibGUoZmFsc2UpOyAgICAgICAvLyDpnZ7miZPlh7rlj6/lkKzniYznva7ngbBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWxSZWFkeVRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6bq75bCG5a2Q6Kem5pG4XHJcbiAgICBwcml2YXRlIHRvdWNoU3RhcnQoZXZlbnQpe1xyXG4gICAgICAgIGlmICghdGhpcy5Db250ZXh0LmdldCh0aGlzLkRlZmluZS5GaWVsZEhhbmRBY3Rpb25FbmFibGUpIHx8ICF0aGlzLnRvdWNoRW5hYmxlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IHRvdWNoUG9zID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICBsZXQgc3RhcnRNaiA9IHRoaXMuZ2V0SGFuZE1qSXRlbUJ5UG9zKHRvdWNoUG9zKTtcclxuICAgICAgICBpZiAoc3RhcnRNail7XHJcbiAgICAgICAgICAgIExvZ2dlci53YXJuKFwic3RhcnRNaiB0b3VjaCBzb3J0SW5kZXg6IFwiLCBzdGFydE1qLnNvcnRJbmRleCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdE1qKXtcclxuICAgICAgICAgICAgICAgIGlmIChzdGFydE1qID09IHRoaXMuc2VsZWN0TWopeyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLkNvbnRleHQuZ2V0KHRoaXMuRGVmaW5lLkZpZWxkSW5QbGF5VHVybikpeyAvLyDoh6rlt7Hlh7rniYzpmLbmrrUg54K55LiK5Y6755qE54mMIOWHuueJjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbFJlYWR5VGluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0U2VsZWN0TWooKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNleyAgIC8vIOWIh+aNoumAieS4reeJjFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0TWoub25TZWxlY3QoKTsgICAgICAgLy8g5LiL5p2lXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRNai5vblNlbGVjdCgpOyAgICAgICAgICAgICAgIC8vIOS4iuWOu1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0TWogPSBzdGFydE1qO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZlNlbGVjdFNpZ24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGZTZWxlY3RTaWduLnNldFBvc2l0aW9uKHRoaXMuc2VsZlNlbGVjdFNpZ24ucGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHN0YXJ0TWouZ2V0U2VsZWN0U2lnbldvcmxkUG9zKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlzUmVhZHlUaW5nICYmIHRoaXMudGluZ0RhdGEudGluZ19pdGVtcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2luVGlwc1ZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53aW5UaXBzVmlldy51cGRhdGVXaW5MaXN0KHRoaXMudGluZ0RhdGEudGluZ19pdGVtc1t0aGlzLnNlbGVjdE1qLm1haGpvbmdWYWx1ZV0gfHwgW10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RNaiA9IHN0YXJ0TWo7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdE1qLm9uU2VsZWN0KCk7ICAgICAgICAgICAvLyDkuIrljrtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZlNlbGVjdFNpZ24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZlNlbGVjdFNpZ24uc2V0UG9zaXRpb24odGhpcy5zZWxmU2VsZWN0U2lnbi5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIoc3RhcnRNai5nZXRTZWxlY3RTaWduV29ybGRQb3MoKSkpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc1JlYWR5VGluZyAmJiB0aGlzLnRpbmdEYXRhLnRpbmdfaXRlbXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2luVGlwc1ZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLndpblRpcHNWaWV3LnVwZGF0ZVdpbkxpc3QodGhpcy50aW5nRGF0YS50aW5nX2l0ZW1zW3RoaXMuc2VsZWN0TWoubWFoam9uZ1ZhbHVlXSB8fCBbXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWxSZWFkeVRpbmcoKTtcclxuICAgICAgICAgICAgdGhpcy5yZXNldFNlbGVjdE1qKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlueCueWHu+S9jee9rueahOm6u+WwhuWtkFxyXG4gICAgICogQHBhcmFtIHdvcmxkUG9zIOS4lueVjOWdkOagh1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEhhbmRNakl0ZW1CeVBvcyh3b3JsZFBvczogY2MuVmVjMil7XHJcbiAgICAgICAgaWYgKHRoaXMubGFzdERlYWxNakl0ZW0gJiYgdGhpcy5sYXN0RGVhbE1qSXRlbS5jaGVja01qVmFsaWQoKSAmJiB0aGlzLmxhc3REZWFsTWpJdGVtLmNoZWNrSXNUb3VjaCh3b3JsZFBvcykpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0RGVhbE1qSXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubWpIYW5kTGlzdC5sZW5ndGg7IGkrKyl7ICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5takhhbmRMaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2hlY2tNalZhbGlkKCkgJiYgaXRlbS5jaGVja0lzVG91Y2god29ybGRQb3MpKXsgICAgICAgLy8g6bq75bCG5a2Q5LiN5L2c5Y+g552A5pS+LCDmlYXlj6/ku6Xnm7TmjqVjaGVja0lzVG91Y2jliKTmlq1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd1BsYXlUaXBzKGZsYWc6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMucGxheVRpcHMuYWN0aXZlID0gZmxhZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRTZWxlY3RNaigpe1xyXG4gICAgICAgIHRoaXMuc2VsZlNlbGVjdFNpZ24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0TWope1xyXG4gICAgICAgICAgICBpZih0aGlzLnNlbGVjdE1qLmlzU2VsZWN0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RNai5vblNlbGVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdE1qID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYW5jZWxSZWFkeVRpbmcoKXtcclxuICAgICAgICBpZiAoIXRoaXMuaXNSZWFkeVRpbmcpe1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZUFsbE1qVG91Y2goKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXRoaXMuQ29udGV4dC5nZXQodGhpcy5EZWZpbmUuRmllbGRJblRpbmcpKVxyXG4gICAgICAgICAgICB0aGlzLndpblRpcHNWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlh7rmjonmiYvkuK3mjIflrprlkIPnorDmnaDniYwgKi9cclxuICAgIHB1YmxpYyBoaWRlT3BlckNhcmQodmFsdWVBcnI6IG51bWJlcltdKXtcclxuICAgICAgICB0aGlzLmlzUmVhZHlUaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxSZWFkeVRpbmcoKTtcclxuICAgICAgICB0aGlzLnJlc2V0U2VsZWN0TWooKTtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGxldCB0ZW1wQXJyID0gWy4uLnZhbHVlQXJyXTtcclxuICAgICAgICBpZih0aGlzLmxhc3REZWFsTWpJdGVtKXsgICAgICAgIC8vIGRlYnVnIOWkhOeQhuadoOWujOaRuOWIsOS4gOW8oOWPiOWPr+S7peadoOeahOeJjFxyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0ZW1wQXJyLmluZGV4T2YodGhpcy5sYXN0RGVhbE1qSXRlbS5tYWhqb25nVmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSl7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArKztcclxuICAgICAgICAgICAgICAgIHRlbXBBcnIuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjeWNsZUxhc3REZWFsTWooKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5takhhbmRMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYgKGNvdW50ID09IHZhbHVlQXJyLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBsZXQgbWpJdGVtID0gdGhpcy5takhhbmRMaXN0W2ldO1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0ZW1wQXJyLmluZGV4T2YobWpJdGVtLm1haGpvbmdWYWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKXtcclxuICAgICAgICAgICAgICAgIGNvdW50ICsrO1xyXG4gICAgICAgICAgICAgICAgdGVtcEFyci5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLmlzT3V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlY3ljbGVVc2VkT3V0TWpJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5zb3J0Q2FyZERpcmVjdGx5KGZhbHNlKTtcclxuICAgICAgICB0aGlzLnRvdWNoRW5hYmxlID0gZmFsc2U7ICAgICAgICAgICAvLyDlkIPnorDmnaDml7blhbPpl63op6bmkbgsIOW8gOWQr+i1sHJlYWR5Rm9yT3V0XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblBsYXkoKXtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5jb21tb25BdWRpby5PdXRDYXJkLCB0cnVlKTtcclxuICAgICAgICB0aGlzLnBsYXlNaiA9IHRoaXMuc2VsZWN0TWo7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZWFkeVRpbmcpe1xyXG4gICAgICAgICAgICBHYW1lLlNlcnZlci5zZW5kKHRoaXMuRGVmaW5lLkNtZFRpbmcsIHtjYXJkOiB0aGlzLnBsYXlNai5tYWhqb25nVmFsdWV9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgR2FtZS5TZXJ2ZXIuc2VuZCh0aGlzLkRlZmluZS5DbWRQbGF5LCB7Y2FyZDogdGhpcy5wbGF5TWoubWFoam9uZ1ZhbHVlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGxheU1qLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd1BsYXlUaXBzKGZhbHNlKTtcclxuICAgICAgICAvLyB0aGlzLnJlc2V0U2VsZWN0TWooKTtcclxuICAgICAgICAvLyB0aGlzLm91dENhcmQodGhpcy5wbGF5TWoubWFoam9uZ1ZhbHVlLCB0cnVlKTsgICAgICAgIC8vIOWbnuWMheWGjeWKqOeUuyDov5nph4znm7TmjqXliqjnlLsg5Li055WM54q25oCB5Lya5pyJ6Zeu6aKYXHJcbiAgICAgICAgdGhpcy5Db250ZXh0LnNldCh0aGlzLkRlZmluZS5GaWVsZEluUGxheVR1cm4sIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWHuueJjOWKqOeUuyDmiYvniYzmtojlpLHlkozmlbTnkIZcclxuICAgICAqIEBwYXJhbSB2YWx1ZSDlh7rnmoTpurvlsIblrZDlgLxcclxuICAgICAqIEBwYXJhbSBpc1NvcnRBbmltIOaYr+WQpuaSreaUvuaVtOeQhuWKqOeUu1xyXG4gICAgICogQHBhcmFtIGlzQXV0byDmmK/lkKbns7vnu5/lh7rniYwgIOWkhOeQhuS4tOeVjOeKtuaAgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3V0Q2FyZCh2YWx1ZTogbnVtYmVyLCBpc1NvcnRBbmltOiBib29sZWFuLCBpc0F1dG86IGJvb2xlYW4gPSBmYWxzZSl7XHJcbiAgICAgICAgdGhpcy5pc1JlYWR5VGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2FuY2VsUmVhZHlUaW5nKCk7XHJcbiAgICAgICAgdGhpcy5yZXNldFNlbGVjdE1qKCk7XHJcblxyXG4gICAgICAgIGxldCBvdXRJdGVtOiBFcm1qTWFoam9uZ0hhbmRWaWV3O1xyXG4gICAgICAgIGlmICghaXNBdXRvKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheU1qICYmICF0aGlzLnBsYXlNai5pc091dCAmJiB0aGlzLnBsYXlNai5tYWhqb25nVmFsdWUgPT0gdmFsdWUpeyAgICAgICAgLy8g5Li75Yqo5Ye654mM55CG6K665Y+q5Lya6L+b6L+ZXHJcbiAgICAgICAgICAgICAgICBvdXRJdGVtID0gdGhpcy5wbGF5TWo7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubGFzdERlYWxNakl0ZW0gJiYgIXRoaXMubGFzdERlYWxNakl0ZW0uaXNPdXQgJiYgdGhpcy5sYXN0RGVhbE1qSXRlbS5tYWhqb25nVmFsdWUgPT0gdmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIG91dEl0ZW0gPSB0aGlzLmxhc3REZWFsTWpJdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBvdXRJdGVtID0gdGhpcy5maW5kTWpJdGVtQnlWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IGNoZWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXlNaiAmJiAhdGhpcy5wbGF5TWouaXNPdXQpe1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwib3V0Q2FyZCDkuLTnlYznirbmgIFcIilcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucGxheU1qLm1haGpvbmdWYWx1ZSAhPT0gdmFsdWUpeyAgICAgIC8vIOezu+e7n+WHuuS4jeaYr+i/meW8oCDlsLHlho3mmL7npLrlh7rmnaUg5om+5YW25LuWXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5TWouYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBvdXRJdGVtID0gdGhpcy5wbGF5TWo7ICAgICAgICAgIC8vIOWImuWlvei/meW8oCDlsIbplJnlsLHplJlcclxuICAgICAgICAgICAgICAgICAgICBjaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFjaGVjayl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmxhc3REZWFsTWpJdGVtICYmICF0aGlzLmxhc3REZWFsTWpJdGVtLmlzT3V0ICYmIHRoaXMubGFzdERlYWxNakl0ZW0ubWFoam9uZ1ZhbHVlID09IHZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICBvdXRJdGVtID0gdGhpcy5sYXN0RGVhbE1qSXRlbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0SXRlbSA9IHRoaXMuZmluZE1qSXRlbUJ5VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAob3V0SXRlbSAmJiAhb3V0SXRlbS5pc091dCl7XHJcbiAgICAgICAgICAgIG91dEl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG91dEl0ZW0uaXNPdXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnRvdWNoRW5hYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChpc1NvcnRBbmltICYmIHRoaXMubGFzdERlYWxNakl0ZW0peyAgICAgICAgIC8vIOaRuOS6hueJjOaJjei1sOWQiOeJjOWKqOeUuywg5aaC5p6c5Ye655qE5pivbGFzdERlYWxNakl0ZW0g5peg6aG755CG54mM5Yqo55S7XHJcbiAgICAgICAgICAgICAgICBpZiAob3V0SXRlbSAhPT0gdGhpcy5sYXN0RGVhbE1qSXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0RHJhd0NhcmRBbWluKG91dEl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY3ljbGVMYXN0RGVhbE1qKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3VjaEVuYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjeWNsZVVzZWRPdXRNakl0ZW0oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ydENhcmREaXJlY3RseShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoRW5hYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3Igb3V0Q2FyZCBvdXRJbmRleCA9PSAtMVwiLCB0aGlzLnBsYXlNaiwgdGhpcy5sYXN0RGVhbE1qSXRlbSk7ICAgICAgICAvLyDmib7kuI3liLDopoHlh7rnmoTmjIflrprniYxcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wbGF5TWogPSBudWxsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGZpbmRNakl0ZW1CeVZhbHVlKHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm1qSGFuZExpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMubWpIYW5kTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKCFpdGVtLmlzT3V0ICYmIGl0ZW0ubWFoam9uZ1ZhbHVlID09IHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqIOaVtOeQhuaRuOeJjOWMuuWfn+WIsOaJi+eJjCDmkbjkuobkuIDlvKDniYzlkI7lh7rniYzmiY3otbDov5lcclxuICAgICAqIEBwYXJhbSBvdXRJdGVtIOaJk+WHuueahOeJjFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNvcnREcmF3Q2FyZEFtaW4ob3V0SXRlbTogRXJtak1haGpvbmdIYW5kVmlldyl7XHJcbiAgICAgICAgaWYgKCFvdXRJdGVtIHx8ICF0aGlzLmxhc3REZWFsTWpJdGVtKSAgICBcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBvdXRJbmRleCA9IG91dEl0ZW0uc29ydEluZGV4O1xyXG4gICAgICAgIC8vIOiuoeeul+aPkuWFpee0ouW8lSDpu5jorqTmnIDlt6bovrkg5om+5LiN5Yiw5YiZ5pS+5Zyo5pyA5bem6L65MOS9jee9rlxyXG4gICAgICAgIGxldCB0ZW1wSW5kZXggPSAwOyAgICBcclxuICAgICAgICBpZiAob3V0SXRlbS5tYWhqb25nVmFsdWUgPT0gdGhpcy5sYXN0RGVhbE1qSXRlbS5tYWhqb25nVmFsdWUpeyAgLy8g5omT5Ye654mM6Lef5pG454mM5Yy65Z+f54mM5LiA6Ie0XHJcbiAgICAgICAgICAgIHRlbXBJbmRleCA9IG91dEluZGV4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAvLyDmraTlpITpg73mmK/mjpLlpb3luo/nmoRtakhhbmRMaXN0XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGk8IHRoaXMubWpIYW5kTGlzdC5sZW5ndGg7IGkrKyl7ICAgICAvLyDmib7liLBsYXN0RGVhbE1qSXRlbeaJgOW6lOivpeWhnui/m+WOu+eahOS9jee9rlxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPj0gdGhpcy5EZWZpbmUuSGFuZE1qTWF4Q291bnQpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMubWpIYW5kTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLm1haGpvbmdWYWx1ZSA8PSB0aGlzLmxhc3REZWFsTWpJdGVtLm1haGpvbmdWYWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEluZGV4ID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWKqOeUu1xyXG4gICAgICAgIGxldCBwYW5Nb3ZlVGltZSA9IDAuMjtcclxuICAgICAgICBMb2dnZXIuZXJyb3IoXCJzb3J0RHJhd0NhcmRBbWluXCIsIG91dEluZGV4LCB0ZW1wSW5kZXgsIHRoaXMubWpIYW5kTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgIGlmKHRlbXBJbmRleCA9PSBvdXRJbmRleCl7ICAgICAgICAgLy8g5Yia5aW95Zyo5Ye655qE6YKj5byg5L2N572uLCBsYXN0RGVhbE1qSXRlbeebtOaOpeaPkuWFpVxyXG4gICAgICAgICAgICBsZXQgaXNMYXN0ID0gdGVtcEluZGV4ID09IHRoaXMubWpIYW5kTGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB0aGlzLmRvU29ydExhc3REZWFsTW92ZShvdXRJbmRleCwgIWlzTGFzdCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRlbXBJbmRleCA9PSB0aGlzLm1qSGFuZExpc3QubGVuZ3RoKXsgICAvLyDliJrlpb3lnKjmnKvlsL4gb3V0SW5kZXjlvoDlkI7miYDmnInpurvlsIblrZDlt6bnp7ssIGxhc3REZWFsTWpJdGVt5bem56e75Yiw5pyA5ZCOXHJcbiAgICAgICAgICAgIHRoaXMuZG9Tb3J0UGFuTW92ZShvdXRJbmRleCArIDEsIHRoaXMubWpIYW5kTGlzdC5sZW5ndGggLSAxLCBmYWxzZSwgcGFuTW92ZVRpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLmRvU29ydExhc3REZWFsTW92ZSh0aGlzLm1qSGFuZExpc3QubGVuZ3RoIC0gMSwgZmFsc2UsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRlbXBJbmRleCA+IG91dEluZGV4KXsgICAgICAgICAgLy8g5o+S5YWl5Zyo5Ye654mM54K55LmL5ZCOIG91dEluZGV4KzHliLB0ZW1wSW5kZXgtMeaJgOaciem6u+WwhuWtkOW3puenuywgbGFzdERlYWxNakl0ZW3lho3mj5LlhaVcclxuICAgICAgICAgICAgdGhpcy5kb1NvcnRQYW5Nb3ZlKG91dEluZGV4ICsgMSwgdGVtcEluZGV4IC0gMSwgZmFsc2UsIHBhbk1vdmVUaW1lKTtcclxuICAgICAgICAgICAgdGhpcy5kb1NvcnRMYXN0RGVhbE1vdmUodGVtcEluZGV4IC0gMSwgdHJ1ZSwgMC4yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaPkuWFpeWcqOWHuueJjOeCueS5i+WJjSDku450ZW1wSW5kZXjliLBvdXRJbmRleC0x5omA5pyJ6bq75bCG5a2Q5Y+z56e7LCBsYXN0RGVhbE1qSXRlbeWGjeaPkuWFpVxyXG4gICAgICAgICAgICB0aGlzLmRvU29ydFBhbk1vdmUodGVtcEluZGV4LCBvdXRJbmRleCAtIDEsIHRydWUsIHBhbk1vdmVUaW1lKTtcclxuICAgICAgICAgICAgdGhpcy5kb1NvcnRMYXN0RGVhbE1vdmUodGVtcEluZGV4LCB0cnVlLCAwLjIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDlubPnp7tcclxuICAgIHByaXZhdGUgZG9Tb3J0UGFuTW92ZShiSW5kZXg6IG51bWJlciwgZUluZGV4OiBudW1iZXIsIGJSaWdodDogYm9vbGVhbiA9IHRydWUsIHRpbWU6IG51bWJlciA9IDAuNSl7XHJcbiAgICAgICAgbGV0IG5EaXJlY3Rpb24gPSBiUmlnaHQgJiYgMSB8fCAtMTtcclxuICAgICAgICBmb3IobGV0IGk9IGJJbmRleDsgaSA8PSBlSW5kZXg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5takhhbmRMaXN0W2ldO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSAmJiB0aGlzLnJhd01qUG9zTGlzdFtpICsgbkRpcmVjdGlvbl0pe1xyXG4gICAgICAgICAgICAgICAgaXRlbS5kb01vdmUodGhpcy5yYXdNalBvc0xpc3RbaSArIG5EaXJlY3Rpb25dLCB0aW1lKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc29ydEluZGV4ICs9IG5EaXJlY3Rpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJkb1NvcnRQYW5Nb3ZlIGVycm9yXCIsIGksIG5EaXJlY3Rpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pG454mM5Yy65Z+f6YKj5byg5ZCI5bm25Yqo55S7XHJcbiAgICAgKiBAcGFyYW0gYWltSW5kZXgg55uu55qE57Si5byVXHJcbiAgICAgKiBAcGFyYW0gYlVwIOaYr+WQpuS4iuaPkOWKqOeUu1xyXG4gICAgICogQHBhcmFtIGRlbGF5IOW7tuaXtlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRvU29ydExhc3REZWFsTW92ZShhaW1JbmRleDogbnVtYmVyLCBiVXA6IGJvb2xlYW4sIGRlbGF5ID0gMCl7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxhc3REZWFsTWpJdGVtIHx8ICF0aGlzLnJhd01qUG9zTGlzdFthaW1JbmRleF0pe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZG9Tb3J0TGFzdERlYWxNb3ZlIGVycm9yXCIsIGFpbUluZGV4KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYmVnaW5Qb3MgPSB0aGlzLmxhc3REZWFsTWpJdGVtLm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgbGV0IGVuZFBvcyA9IHRoaXMucmF3TWpQb3NMaXN0W2FpbUluZGV4XTtcclxuICAgICAgICBsZXQgW3dpZHRoLCBoZWlnaHRdID0gdGhpcy5sYXN0RGVhbE1qSXRlbS5nZXRSZWFsU2l6ZSgpO1xyXG4gICAgICAgIHRoaXMubGFzdERlYWxNakl0ZW0uc29ydEluZGV4ID0gYWltSW5kZXg7XHJcbiAgICAgICAgaWYgKGJVcCl7XHJcbiAgICAgICAgICAgIGxldCBkZXYgPSBHbG9iYWwuVG9vbGtpdC5nZXRWZWMyRGlzdGFuY2UoYmVnaW5Qb3MsIGVuZFBvcyk7XHJcbiAgICAgICAgICAgIGxldCB0aW1lID0gTWF0aC5tYXgoZGV2IC8gMjAwMCwgMC4yKTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0RGVhbE1qSXRlbS5kb01vdmUoYmVnaW5Qb3MuYWRkKGNjLnYzKDAsIGhlaWdodCArIDUpKSwgMC4xLCBkZWxheSk7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdERlYWxNakl0ZW0uZG9Nb3ZlKGVuZFBvcy5hZGQoY2MudjMoMCwgaGVpZ2h0ICsgNSkpLCB0aW1lLCAwLjEgKyBkZWxheSk7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdERlYWxNakl0ZW0uZG9Nb3ZlKGVuZFBvcywgMC4xLCB0aW1lICsgMC4xICsgZGVsYXksICgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY3ljbGVVc2VkT3V0TWpJdGVtKCk7ICAgICAgLy8g5YWI5Yqo55S75YaN5Zue5pS2XHJcbiAgICAgICAgICAgICAgICB0aGlzLnB1c2hMYXN0SW50b0hhbmRMaXN0KGFpbUluZGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ydE1qSGFuZExpc3QoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudG91Y2hFbmFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sYXN0RGVhbE1qSXRlbS5kb01vdmUoZW5kUG9zLCAwLjIsIGRlbGF5LCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWN5Y2xlVXNlZE91dE1qSXRlbSgpOyAgICAgIC8vIOWFiOWKqOeUu+WGjeWbnuaUtlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wdXNoTGFzdEludG9IYW5kTGlzdChhaW1JbmRleCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnRNakhhbmRMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdWNoRW5hYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkb1dpbigpe1xyXG4gICAgICAgIHRoaXMuaXNSZWFkeVRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNhbmNlbFJlYWR5VGluZygpO1xyXG4gICAgICAgIHRoaXMucmVzZXRTZWxlY3RNaigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDoh6rmkbjml7bpmpDol4/mnIDlkI7kuIDlvKDog6HniYwgKi9cclxuICAgIHB1YmxpYyB3aW5IaWRlTGFzdERyYXcodmFsdWU6IG51bWJlcil7XHJcbiAgICAgICAgaWYodGhpcy5sYXN0RGVhbE1qSXRlbSAmJiB0aGlzLmxhc3REZWFsTWpJdGVtLm1haGpvbmdWYWx1ZSA9PSB2YWx1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMucmVjeWNsZUxhc3REZWFsTWooKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnm7TmjqXlkIjlubbmiYvniYzmjpLluo/lubbliLfmlrDkvY3nva5cclxuICAgICAqIEBwYXJhbSBpc0FuaW0g5piv5ZCm5pKt5pS+5pW055CG5Yqo55S7XHJcbiAgICAgKi8gXHJcbiAgICBwdWJsaWMgc29ydENhcmREaXJlY3RseShpc0FuaW06IGJvb2xlYW4gPSBmYWxzZSl7XHJcbiAgICAgICAgdGhpcy5wdXNoTGFzdEludG9IYW5kTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuc29ydE1qSGFuZExpc3QoKTtcclxuXHJcbiAgICAgICAgaWYoIWlzQW5pbSl7XHJcbiAgICAgICAgICAgIHRoaXMubWpIYW5kTGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCk9PntcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uaXNPdXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc29ydEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm5vZGUuc2V0UG9zaXRpb24odGhpcy5yYXdNalBvc0xpc3RbaW5kZXhdKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgLy8g5pW055CG5Yqo55S7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwhuaRuOeJjOWMuuWfn+eJjOWQiOW5tuWIsOaJi+eJjFxyXG4gICAgICogQHBhcmFtIGluZGV4IOaMh+WumuS9jee9riAtMeihqOaPkuWFpeWIsOacq+WwvlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHB1c2hMYXN0SW50b0hhbmRMaXN0KGluZGV4OiBudW1iZXIgPSAtMSl7XHJcbiAgICAgICAgaWYgKHRoaXMubGFzdERlYWxNakl0ZW0pe1xyXG4gICAgICAgICAgICBsZXQgaSA9IChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5takhhbmRMaXN0Lmxlbmd0aCkgPyBpbmRleCA6IHRoaXMubWpIYW5kTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMubWpIYW5kTGlzdC5zcGxpY2UoaSwgMCwgdGhpcy5sYXN0RGVhbE1qSXRlbSk7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdERlYWxNakl0ZW0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog5o6S5bqP5omL54mM5pWw57uEIOS4jeWIt+aWsOS9jee9riBzb3J0SW5kZXjmraTml7bmmK/kubHnmoQgKi9cclxuICAgIHByaXZhdGUgc29ydE1qSGFuZExpc3QoKXtcclxuICAgICAgICB0aGlzLm1qSGFuZExpc3Quc29ydCgoaXRlbTEsIGl0ZW0yKT0+e1xyXG4gICAgICAgICAgICBpZiAoIWl0ZW0xLm1haGpvbmdWYWx1ZSB8fCAhaXRlbTIubWFoam9uZ1ZhbHVlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtMS5tYWhqb25nVmFsdWUgLSBpdGVtMi5tYWhqb25nVmFsdWU7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSByZWN5Y2xlVXNlZE91dE1qSXRlbSgpe1xyXG4gICAgICAgIHRoaXMuc29ydE1qSGFuZExpc3QoKTtcclxuXHJcbiAgICAgICAgbGV0IG91dEFyciA9IFtdO1xyXG4gICAgICAgIGxldCBoYW5kQXJyID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpPSAwOyBpIDwgdGhpcy5takhhbmRMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG1qSXRlbSA9IHRoaXMubWpIYW5kTGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKCFtakl0ZW0uYWN0aXZlIHx8IG1qSXRlbS5pc091dCl7XHJcbiAgICAgICAgICAgICAgICBvdXRBcnIucHVzaChtakl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBoYW5kQXJyLnB1c2gobWpJdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1qSGFuZExpc3QgPSBoYW5kQXJyOyAgICAgIC8vIOi/mOWcqOaJi+S4iueahOi1i+WAvFxyXG4gICAgICAgIG91dEFyci5mb3JFYWNoKG1qSXRlbT0+eyAgICAgICAgLy8g5bey57uP5omT5Ye655qE5Zue5pS2XHJcbiAgICAgICAgICAgIG1qSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgbWpJdGVtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudW51c2VkTWpMaXN0LnB1c2gobWpJdGVtKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgICAvKirlm57mlLbmiYDmnInlt7Lkvb/nlKjpurvlsIblrZAgKi9cclxuICAgICBwcml2YXRlIHJlY3ljbGVBbGxVc2VkTWpJdGVtcygpe1xyXG4gICAgICAgIHRoaXMucmVjeWNsZUxhc3REZWFsTWooKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0wOyBpIDwgdGhpcy5takhhbmRMaXN0Lmxlbmd0aCA7aSsrKXtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLm1qSGFuZExpc3RbaV07XHJcbiAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGl0ZW0ucmVzZXQoKTtcclxuICAgICAgICAgICAgdGhpcy51bnVzZWRNakxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5takhhbmRMaXN0ID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWN5Y2xlTGFzdERlYWxNaigpe1xyXG4gICAgICAgIGlmICh0aGlzLmxhc3REZWFsTWpJdGVtKXtcclxuICAgICAgICAgICAgdGhpcy5sYXN0RGVhbE1qSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0RGVhbE1qSXRlbS5yZXNldCgpO1xyXG4gICAgICAgICAgICB0aGlzLnVudXNlZE1qTGlzdC5wdXNoKHRoaXMubGFzdERlYWxNakl0ZW0pO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3REZWFsTWpJdGVtID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBjbGVhckJ5Um91bmQoKXtcclxuICAgICAgICB0aGlzLnBsYXlNaiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wbGF5VGlwcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRvdWNoRW5hYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXNldFNlbGVjdE1qKCk7XHJcbiAgICAgICAgdGhpcy5yZWN5Y2xlQWxsVXNlZE1qSXRlbXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy53aW5UaXBzVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUmVhZHlUaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy50aW5nRGF0YSA9IHt9O1xyXG4gICAgICAgIHRoaXMudGluZ0xheWVyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59Il19