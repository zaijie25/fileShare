"use strict";
cc._RF.push(module, '7abc0cnL7NIcJpQd2ijUKiU', 'ErmjMjPlayerView');
// ermj/Ermj/scripts/subView/mahjong/ErmjMjPlayerView.ts

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
var ErmjBaseView_1 = require("../ErmjBaseView");
var ErmjMahjongOperView_1 = require("./ErmjMahjongOperView");
var ErmjPathHelper_1 = require("../../data/ErmjPathHelper");
var ErmjMjStyleHelper_1 = require("../../tool/ErmjMjStyleHelper");
var ErmjPlayerHandView_1 = require("./ErmjPlayerHandView");
var ErmjGameConst_1 = require("../../data/ErmjGameConst");
var ErmjDriver_1 = require("../../ErmjDriver");
/** 抽象为全是暗牌 用作吃碰杠胡牌出牌表现展示的玩家对象 包括自己也虚拟了一个 */
var ErmjMjPlayerView = /** @class */ (function (_super) {
    __extends(ErmjMjPlayerView, _super);
    function ErmjMjPlayerView(node, nSeat) {
        var _this = _super.call(this) || this;
        _this.nSeat = nSeat;
        /** 打出去的麻将展示栏的数量 不包括补花的 */
        _this.outShowCount = 0;
        /** 下一次打出麻将子的本地坐标 */
        _this.nextOutMjPos = cc.Vec3.ZERO;
        _this.nextflowerMjPos = cc.Vec3.ZERO;
        /** 吃碰杠 操作牌墩数组*/
        _this.operViewList = [];
        /** 操作牌墩数组 当前索引指向 */
        _this.operCurIndex = 0;
        _this.isBright = false;
        _this.inBeTinged = false;
        _this.setNode(node);
        return _this;
    }
    ErmjMjPlayerView.prototype.initView = function () {
        this.outMjMgr = ErmjDriver_1.default.instance.outMjManager;
        this.darkHandView = new ErmjPlayerHandView_1.ErmjPlayerDarkHandView(this.getChild("darkView"), this.nSeat);
        this.darkHandView.active = false;
        this.brightHandView = new ErmjPlayerHandView_1.ErmjPlayerBrightHandView(this.getChild("brightView"), this.nSeat);
        this.brightHandView.active = false;
        this.outShowStartWorldPos = this.node.convertToWorldSpaceAR(this.getChild("outStartPoint").position);
        this.outShowRoot0 = this.getChild("outShowRoot0");
        this.outShowRoot1 = this.getChild("outShowRoot1");
        this.outShowRoot2 = this.getChild("outShowRoot2");
        this.flowerRoot = this.getChild("flowerRoot");
        this.operRoot = this.getChild("operRoot");
        this.winShowView = new WinMjItemsShowView(this.getChild("winShowRoot"), this.nSeat);
        this.winShowView.active = false;
    };
    ErmjMjPlayerView.prototype.setHandMjShow = function (flag) {
        this.darkHandView.active = true;
    };
    ErmjMjPlayerView.prototype.setDarkHandMjOutScreen = function () {
        this.darkHandView.setHandMjOutScreen();
    };
    /**
     * 发牌
     * @param count 一次摸几张
     * @param valueArr 牌值数组 元素空代表暗牌
     */
    ErmjMjPlayerView.prototype.dealHandMj = function (count, valueArr) {
        if (count === void 0) { count = 1; }
        if (valueArr === void 0) { valueArr = []; }
        this.darkHandView.dealHandMj(count, valueArr);
    };
    /**
     * 摸牌 轮次摸牌 目前只支持摸一张
     * @param value 牌值
     */
    ErmjMjPlayerView.prototype.drawHandMj = function (value) {
        if (!this.inBeTinged) {
            this.darkHandView.drawHandMj();
        }
        else {
            this.brightHandView.drawHandMj(value);
        }
    };
    /**
     * 玩家补花 补进来的都是暗牌表现
     * @param outArr 花牌
     * @param isRoundDeal 是否轮次摸牌、开杠摸牌
     */
    ErmjMjPlayerView.prototype.changeFlower = function (outArr, inArr) {
        var _this = this;
        if (!this.inBeTinged) {
            this.darkHandView.changeFlower(outArr, function () {
                _this.flowerCardAdd(outArr); // 花牌区域add显示
            });
        }
        else {
            this.brightHandView.changeFlower(outArr, inArr, function () {
                _this.flowerCardAdd(outArr); // 花牌区域add显示
            });
        }
    };
    /** 添加花牌到桌上 */
    ErmjMjPlayerView.prototype.flowerCardAdd = function (outArr) {
        var relative = this.nSeat - this.Context.selfLocalSeat;
        for (var i = 0; i < outArr.length; i++) {
            var item = this.outMjMgr.getOneFlowerMj();
            item.mahjongValue = outArr[i];
            item.isFront = true;
            item.node.setParent(this.flowerRoot);
            var nPersp = this.Define.flowerMjPerspArr[this.flowerCount] || 0;
            item.setPerspStyle(nPersp, relative);
            var _a = ErmjMjStyleHelper_1.default.getPerspectiveCfg(nPersp), cfg = _a.cfg, dir = _a.dir;
            item.node.setSiblingIndex(10 - this.flowerCount);
            if (this.flowerCount == 0) {
                item.node.setPosition(cc.Vec3.ZERO);
                var offsetX = dir > 0 ? cfg.devSpaceX : cfg.negDevSpaceX;
                var spaceX = relative == 0 ? offsetX : -offsetX;
                this.nextflowerMjPos = cc.v3(spaceX, 0);
            }
            else {
                item.node.setPosition(this.nextflowerMjPos);
                var offsetX = dir > 0 ? cfg.devSpaceX : cfg.negDevSpaceX;
                var spaceX = relative == 0 ? offsetX : -offsetX;
                this.nextflowerMjPos = cc.v3(this.nextflowerMjPos.x + spaceX, 0);
            }
            this.flowerCount++;
            item.active = true;
        }
    };
    ErmjMjPlayerView.prototype.readyForOut = function (lastCard) {
        if (!this.inBeTinged) {
            this.darkHandView.readyForOut();
        }
        else {
            this.brightHandView.readyForOut(lastCard);
        }
    };
    ErmjMjPlayerView.prototype.outCard = function (value) {
        var _this = this;
        if (!this.inBeTinged) {
            this.darkHandView.outCard(value, function () {
                _this.doOutFlyAnim(value);
            });
        }
        else {
            this.brightHandView.outCard(value, function () {
                _this.doOutFlyAnim(value);
            });
        }
    };
    /** 出牌飞麻将子 */
    ErmjMjPlayerView.prototype.doOutFlyAnim = function (value) {
        var _this = this;
        var relative = this.nSeat - this.Context.selfLocalSeat;
        var flyItem = this.outMjMgr.getOneOutMj();
        this.outShowCount += 1;
        var _a = [Math.ceil(this.outShowCount / this.Define.OutShowMjMaxCol) - 1, (this.outShowCount - 1) % this.Define.OutShowMjMaxCol], row = _a[0], col = _a[1];
        if (row == 0) {
            flyItem.node.setParent(this.outShowRoot0);
        }
        else if (row == 1) {
            flyItem.node.setParent(this.outShowRoot1);
        }
        else {
            flyItem.node.setParent(this.outShowRoot2);
        }
        flyItem.mahjongValue = value;
        flyItem.active = true;
        flyItem.isFront = true;
        var startPos = flyItem.node.parent.convertToNodeSpaceAR(this.outShowStartWorldPos);
        var curPersp = this.Define.outMjPerspArr[col];
        var curCfg = ErmjMjStyleHelper_1.default.getPerspectiveCfg(curPersp);
        if (col == 0) {
            var endPos = cc.v3(0, 0);
            var offsetX = curCfg.dir > 0 ? curCfg.cfg.devSpaceX : curCfg.cfg.negDevSpaceX;
            var spaceX = relative == 0 ? offsetX : -offsetX;
            this.nextOutMjPos = cc.v3(spaceX, 0);
            flyItem.doOutAnim(startPos, endPos, curPersp, relative);
        }
        else {
            var endPos = this.nextOutMjPos;
            var offsetX = curCfg.dir > 0 ? curCfg.cfg.devSpaceX : curCfg.cfg.negDevSpaceX;
            var spaceX = relative == 0 ? offsetX : -offsetX;
            this.nextOutMjPos = cc.v3(endPos.x + spaceX, 0);
            flyItem.doOutAnim(startPos, endPos, curPersp, relative);
        }
        Game.Component.scheduleOnce(function () {
            flyItem.node.setSiblingIndex(_this.Define.OutShowMjMaxCol - col);
        }, this.Define.outMjShowTime + this.Define.outMjFlyTime + 0.1);
    };
    /** 直接显示桌上打出的麻将子 重连用 */
    ErmjMjPlayerView.prototype.showOutCardDirectly = function (cards) {
        var _this = this;
        if (cards === void 0) { cards = []; }
        var relative = this.nSeat - this.Context.selfLocalSeat;
        cards.forEach(function (value) {
            var flyItem = _this.outMjMgr.getOneOutMj();
            _this.outShowCount += 1;
            var _a = [Math.ceil(_this.outShowCount / _this.Define.OutShowMjMaxCol) - 1, (_this.outShowCount - 1) % _this.Define.OutShowMjMaxCol], row = _a[0], col = _a[1];
            if (row == 0) {
                flyItem.node.setParent(_this.outShowRoot0);
            }
            else if (row == 1) {
                flyItem.node.setParent(_this.outShowRoot1);
            }
            else {
                flyItem.node.setParent(_this.outShowRoot2);
            }
            flyItem.mahjongValue = value;
            flyItem.active = true;
            flyItem.isFront = true;
            var curPersp = _this.Define.outMjPerspArr[col];
            flyItem.node.setSiblingIndex(_this.Define.OutShowMjMaxCol - col);
            var curCfg = ErmjMjStyleHelper_1.default.getPerspectiveCfg(curPersp);
            if (col == 0) {
                var endPos = cc.v3(0, 0);
                var offsetX = curCfg.dir > 0 ? curCfg.cfg.devSpaceX : curCfg.cfg.negDevSpaceX;
                var spaceX = relative == 0 ? offsetX : -offsetX;
                _this.nextOutMjPos = cc.v3(spaceX, 0);
                flyItem.node.setPosition(endPos);
                flyItem.setPerspStyle(curPersp, relative);
            }
            else {
                var endPos = _this.nextOutMjPos;
                var offsetX = curCfg.dir > 0 ? curCfg.cfg.devSpaceX : curCfg.cfg.negDevSpaceX;
                var spaceX = relative == 0 ? offsetX : -offsetX;
                _this.nextOutMjPos = cc.v3(endPos.x + spaceX, 0);
                flyItem.node.setPosition(endPos);
                flyItem.setPerspStyle(curPersp, relative);
            }
        });
    };
    /** 被吃碰杠时 减少桌面一个麻将子 */
    ErmjMjPlayerView.prototype.reduceOneOutMj = function () {
        var relative = this.nSeat - this.Context.selfLocalSeat;
        var _a = [Math.ceil(this.outShowCount / this.Define.OutShowMjMaxCol) - 1, (this.outShowCount - 1) % this.Define.OutShowMjMaxCol], row = _a[0], col = _a[1];
        var curPersp = this.Define.outMjPerspArr[col];
        var curCfg = ErmjMjStyleHelper_1.default.getPerspectiveCfg(curPersp);
        var offsetX = curCfg.dir > 0 ? curCfg.cfg.devSpaceX : curCfg.cfg.negDevSpaceX;
        var spaceX = relative == 0 ? offsetX : -offsetX;
        this.nextOutMjPos = cc.v3(this.nextOutMjPos.x - spaceX, 0);
        this.outShowCount -= 1;
    };
    /** 碰 */
    ErmjMjPlayerView.prototype.pongCard = function (valueArr) {
        if (!this.inBeTinged) {
            this.darkHandView.pongCard(valueArr);
        }
        else {
            this.brightHandView.pongCard(valueArr);
        }
        var operView = this.getOneOperView();
        operView.active = true;
        var perspArr = this.Define.operMjGroupPerspArr.slice((this.operCurIndex - 1) * 3, this.operCurIndex * 3);
        operView.setPongStyle(valueArr, perspArr);
    };
    /** 吃 */
    ErmjMjPlayerView.prototype.chowCard = function (valueArr, chowCard) {
        if (!this.inBeTinged) {
            this.darkHandView.chowCard(valueArr, chowCard);
        }
        else {
            this.brightHandView.chowCard(valueArr, chowCard);
        }
        var operView = this.getOneOperView();
        operView.active = true;
        var perspArr = this.Define.operMjGroupPerspArr.slice((this.operCurIndex - 1) * 3, this.operCurIndex * 3);
        operView.setChowStyle(valueArr, chowCard, perspArr);
    };
    /** 杠 */
    ErmjMjPlayerView.prototype.kongCard = function (type, valueArr) {
        if (!this.inBeTinged) {
            this.darkHandView.kongCard(type, valueArr);
        }
        else {
            this.brightHandView.kongCard(type, valueArr);
        }
        if (type == 5) {
            var _a = this.findPongKongOper(valueArr[0]), operView = _a[0], index = _a[1]; // 碰杠 找到现存碰 加一张
            if (operView) {
                var perspArr = this.Define.operMjGroupPerspArr.slice((index - 1) * 3, index * 3);
                operView.setKongStyle(valueArr, true, false, perspArr);
            }
        }
        else {
            var operView = this.getOneOperView();
            operView.active = true;
            var perspArr = this.Define.operMjGroupPerspArr.slice((this.operCurIndex - 1) * 3, this.operCurIndex * 3);
            operView.setKongStyle(valueArr, type !== 6, this.nSeat == this.Context.selfLocalSeat || this.inBeTinged, perspArr);
        }
    };
    /** 获取未使用的吃碰杠麻将墩 */
    ErmjMjPlayerView.prototype.getOneOperView = function () {
        if (!this.operViewList[this.operCurIndex]) {
            var relative = this.nSeat - this.Context.selfLocalSeat;
            var prefab = Global.ResourceManager.getBundleRes(ErmjGameConst_1.default.Gid, ErmjPathHelper_1.default.gamePrefabsPath + "panel/mahjong/mahjongOperView", cc.Prefab);
            var node = cc.instantiate(prefab);
            node.setParent(this.operRoot);
            node.setPosition(this.Define.OperViewSpace[this.nSeat].mul(this.operCurIndex));
            var view = new ErmjMahjongOperView_1.default(node, relative);
            view.active = false;
            this.operViewList[this.operCurIndex] = view;
        }
        var item = this.operViewList[this.operCurIndex];
        this.operCurIndex += 1;
        return item;
    };
    /** 找到现存碰、杠 */
    ErmjMjPlayerView.prototype.findPongKongOper = function (value) {
        for (var i = 0; i < this.operViewList.length; i++) {
            var view = this.operViewList[i];
            if (view.value == value && (view.checkPongValid() || view.checkKongValid())) // 不会出现同一种牌的杠和碰 暗杠不会被抢杠
                return [view, i + 1];
        }
    };
    /** 被抢杠胡 */
    ErmjMjPlayerView.prototype.robbedKongLose = function (value) {
        var view = this.findPongKongOper(value)[0];
        if (view)
            view.beKongRobbed();
    };
    /** 把暗杠变成可见的3+1 结算和听牌时*/
    ErmjMjPlayerView.prototype.showDarkKongSeen = function (darkList) {
        if (darkList === void 0) { darkList = []; }
        var count = 0;
        for (var i = 0; i < this.operViewList.length; i++) {
            if (count == darkList.length)
                break;
            var view = this.operViewList[i];
            if (view.checkDarkKongValid()) { // 找到暗杠
                var perspArr = this.Define.operMjGroupPerspArr.slice(i * 3, (i + 1) * 3);
                view.setKongStyle(darkList[count], false, true, perspArr);
                count++;
            }
        }
    };
    /** 重连复盘吃碰杠牌 */
    ErmjMjPlayerView.prototype.syncAllOperView = function (list) {
        var _this = this;
        if (list === void 0) { list = []; }
        list.forEach(function (data) {
            var operView = _this.getOneOperView();
            operView.active = true;
            var perspArr = _this.Define.operMjGroupPerspArr.slice((_this.operCurIndex - 1) * 3, _this.operCurIndex * 3);
            var type = data.type;
            var valueArr = data.all_cards || [];
            var card = data.card;
            if (type == 2) {
                operView.setChowStyle(valueArr, card, perspArr);
            }
            else if (type == 3) {
                operView.setPongStyle(valueArr, perspArr);
            }
            else {
                operView.setKongStyle(valueArr, type !== 6, _this.nSeat == _this.Context.selfLocalSeat, perspArr);
            }
        });
    };
    ErmjMjPlayerView.prototype.addWinMjShow = function (value) {
        this.winShowView.active = true;
        this.winShowView.addOneHuMjItem(value);
    };
    /** 自摸时隐藏上手那张胡牌 */
    ErmjMjPlayerView.prototype.winHideLastDraw = function (value) {
        if (!this.inBeTinged) {
            this.darkHandView.winHideLastDraw();
        }
        else {
            this.brightHandView.winHideLastDraw(value);
        }
    };
    ErmjMjPlayerView.prototype.setBeInTing = function () {
        this.inBeTinged = true;
    };
    ErmjMjPlayerView.prototype.showDownHand = function (flag, valueArr, isWin, isSort) {
        this.darkHandView.active = false;
        this.brightHandView.active = flag;
        this.brightHandView.showDown(valueArr, isWin, isSort);
    };
    /** 回收所有吃碰杠麻将墩 */
    ErmjMjPlayerView.prototype.recycleAllOperView = function () {
        this.operViewList.forEach(function (view) {
            view.active = false;
        });
        this.operCurIndex = 0; // 重置计数作为回收, 数量有限个不另作池管理
    };
    ErmjMjPlayerView.prototype.getLightningWorldPos = function () {
        return this.winShowView.getWinItemWorldPos();
    };
    ErmjMjPlayerView.prototype.reset = function () {
        this.darkHandView.reset();
        this.darkHandView.active = false;
        this.brightHandView.reset();
        this.brightHandView.active = false;
        this.flowerCount = 0;
        this.recycleAllOperView();
        this.outShowCount = 0;
        this.winShowView.active = false;
        this.inBeTinged = false;
    };
    ErmjMjPlayerView.prototype.clearByRound = function () {
        this.reset();
    };
    return ErmjMjPlayerView;
}(ErmjBaseView_1.default));
exports.default = ErmjMjPlayerView;
var WinMjItemsShowView = /** @class */ (function (_super) {
    __extends(WinMjItemsShowView, _super);
    function WinMjItemsShowView(node, nRelative) {
        var _this = _super.call(this) || this;
        _this.nRelative = nRelative;
        _this.winCount = 0;
        _this.nextWinMjPos = cc.Vec3.ZERO;
        _this.maxCol = 5;
        _this.bgWidthLimit = 28;
        _this.bgWidthStep = 40;
        _this.mjParentList = [];
        _this.setNode(node);
        return _this;
    }
    WinMjItemsShowView.prototype.initView = function () {
        this.outMjMgr = ErmjDriver_1.default.instance.outMjManager;
        this.bgSp = this.getComponent("bgSp", cc.Sprite);
        this.mjRoot = this.getChild("mjRoot");
    };
    // 获取一个父节点, 用于层次
    WinMjItemsShowView.prototype.getMjRoot = function () {
        var row = Math.ceil(this.winCount / this.maxCol) - 1;
        if (!this.mjParentList[row]) {
            var node = cc.instantiate(this.mjRoot);
            node.setParent(this.node);
            node.scale = this.mjRoot.scale;
            node.position = this.mjRoot.position;
            this.mjParentList[row] = node;
        }
        return this.mjParentList[row];
    };
    WinMjItemsShowView.prototype.addOneHuMjItem = function (value) {
        this.winCount++;
        var _a = [Math.ceil(this.winCount / this.maxCol) - 1, (this.winCount - 1) % this.maxCol], row = _a[0], col = _a[1];
        var mjItem = this.outMjMgr.getOneWinMj();
        mjItem.mahjongValue = value;
        mjItem.active = true;
        mjItem.isFront = true;
        var root = this.getMjRoot();
        mjItem.node.setParent(root);
        var nPersp = this.Define.winMjPerspArr[col] || 0;
        mjItem.setPerspStyle(nPersp, this.nRelative);
        var _b = ErmjMjStyleHelper_1.default.getPerspectiveCfg(nPersp), cfg = _b.cfg, dir = _b.dir;
        mjItem.node.setSiblingIndex(0); // 上面的层级更高 row和col都是0开始
        if (col == 0) {
            mjItem.node.setPosition(cc.v3(0, row * this.Define.winMoreOffsetY));
            var offsetX = dir > 0 ? cfg.devSpaceX : cfg.negDevSpaceX;
            var spaceX = this.nRelative == 0 ? offsetX : -offsetX;
            this.nextWinMjPos = cc.v3(spaceX, row * this.Define.winMoreOffsetY);
        }
        else {
            mjItem.node.setPosition(this.nextWinMjPos);
            var offsetX = dir > 0 ? cfg.devSpaceX : cfg.negDevSpaceX;
            var spaceX = this.nRelative == 0 ? offsetX : -offsetX;
            this.nextWinMjPos = cc.v3(this.nextWinMjPos.x + spaceX, row * this.Define.winMoreOffsetY);
        }
        this.updateBgWidth();
    };
    WinMjItemsShowView.prototype.updateBgWidth = function () {
        if (this.winCount >= this.maxCol) {
            this.bgSp.node.width = this.bgWidthLimit + this.maxCol * this.bgWidthStep;
        }
        else {
            var col = this.winCount % this.maxCol;
            this.bgSp.node.width = this.bgWidthLimit + col * this.bgWidthStep;
        }
    };
    WinMjItemsShowView.prototype.getWinItemWorldPos = function () {
        var mjItem = this.outMjMgr.getLastWinMj();
        if (mjItem && mjItem.active)
            return mjItem.node.parent.convertToWorldSpaceAR(mjItem.node.position);
        else {
            return this.node.convertToWorldSpaceAR(cc.Vec3.ZERO);
        }
    };
    WinMjItemsShowView.prototype.onClose = function () {
        this.winCount = 0;
    };
    return WinMjItemsShowView;
}(ErmjBaseView_1.default));

cc._RF.pop();