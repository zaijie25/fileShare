"use strict";
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