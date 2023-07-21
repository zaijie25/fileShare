
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/mahjong/ErmjMjPlayerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcbWFoam9uZ1xcRXJtak1qUGxheWVyVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFFM0MsNkRBQXdEO0FBQ3hELDREQUF1RDtBQUN2RCxrRUFBNkQ7QUFDN0QsMkRBQXdGO0FBQ3hGLDBEQUFxRDtBQUNyRCwrQ0FBMEM7QUFFMUMsNENBQTRDO0FBQzVDO0lBQThDLG9DQUFZO0lBNEJ0RCwwQkFBWSxJQUFhLEVBQVMsS0FBYTtRQUEvQyxZQUNJLGlCQUFPLFNBRVY7UUFIaUMsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQXJCL0MsMEJBQTBCO1FBQ2xCLGtCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ2pDLG9CQUFvQjtRQUNaLGtCQUFZLEdBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFJckMscUJBQWUsR0FBWSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNoRCxnQkFBZ0I7UUFDUixrQkFBWSxHQUEwQixFQUFFLENBQUM7UUFDakQsb0JBQW9CO1FBQ1osa0JBQVksR0FBVyxDQUFDLENBQUM7UUFLMUIsY0FBUSxHQUFZLEtBQUssQ0FBQztRQUd6QixnQkFBVSxHQUFZLEtBQUssQ0FBQztRQUloQyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRVMsbUNBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLG9CQUFVLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksMkNBQXNCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FB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QUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN0RTtZQUNBLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hEO0lBQ0wsQ0FBQztJQUVTLG9DQUFPLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0F0RkEsQUFzRkMsQ0F0RmdDLHNCQUFZLEdBc0Y1QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcm1qQmFzZVZpZXcgZnJvbSBcIi4uL0VybWpCYXNlVmlld1wiO1xyXG5pbXBvcnQgRXJtak91dE1qVmlld01hbmFnZXIgZnJvbSBcIi4uLy4uL21hbmFnZXIvRXJtak91dE1qVmlld01hbmFnZXJcIjtcclxuaW1wb3J0IEVybWpNYWhqb25nT3BlclZpZXcgZnJvbSBcIi4vRXJtak1haGpvbmdPcGVyVmlld1wiO1xyXG5pbXBvcnQgRXJtalBhdGhIZWxwZXIgZnJvbSBcIi4uLy4uL2RhdGEvRXJtalBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IEVybWpNalN0eWxlSGVscGVyIGZyb20gXCIuLi8uLi90b29sL0VybWpNalN0eWxlSGVscGVyXCI7XHJcbmltcG9ydCB7IEVybWpQbGF5ZXJEYXJrSGFuZFZpZXcsIEVybWpQbGF5ZXJCcmlnaHRIYW5kVmlldyB9IGZyb20gXCIuL0VybWpQbGF5ZXJIYW5kVmlld1wiO1xyXG5pbXBvcnQgRXJtakdhbWVDb25zdCBmcm9tIFwiLi4vLi4vZGF0YS9Fcm1qR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBFcm1qRHJpdmVyIGZyb20gXCIuLi8uLi9Fcm1qRHJpdmVyXCI7XHJcblxyXG4vKiog5oq96LGh5Li65YWo5piv5pqX54mMIOeUqOS9nOWQg+eisOadoOiDoeeJjOWHuueJjOihqOeOsOWxleekuueahOeOqeWutuWvueixoSDljIXmi6zoh6rlt7HkuZ/omZrmi5/kuobkuIDkuKogKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtak1qUGxheWVyVmlldyBleHRlbmRzIEVybWpCYXNlVmlld3tcclxuICAgIHByaXZhdGUgb3V0TWpNZ3I6IEVybWpPdXRNalZpZXdNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBvdXRTaG93U3RhcnRXb3JsZFBvczogY2MuVmVjMztcclxuICAgIC8qKiDlh7rniYzlsZXnpLog54i26IqC54K5IOS5n+aYr+aOkuWIl+i1t+eCuSDkuI3lkIznvKnmlL7liIbooYwg5pyJ5bGC57qn55qE6KaB5rGC5omA5Lul5YiG6IqC54K5IOacgOWkmuWPr+iDveacieS4ieihjCovXHJcbiAgICBwcml2YXRlIG91dFNob3dSb290MDogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgb3V0U2hvd1Jvb3QxOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBvdXRTaG93Um9vdDI6IGNjLk5vZGU7XHJcbiAgICAvKiog5omT5Ye65Y6755qE6bq75bCG5bGV56S65qCP55qE5pWw6YePIOS4jeWMheaLrOihpeiKseeahCAqL1xyXG4gICAgcHJpdmF0ZSBvdXRTaG93Q291bnQ6IG51bWJlciA9IDA7XHJcbiAgICAvKiog5LiL5LiA5qyh5omT5Ye66bq75bCG5a2Q55qE5pys5Zyw5Z2Q5qCHICovXHJcbiAgICBwcml2YXRlIG5leHRPdXRNalBvczogY2MuVmVjMyA9IGNjLlZlYzMuWkVSTztcclxuICAgIC8qKiDooaXoirHniLboioLngrkgbGF5b3V05o6S5YiXKi9cclxuICAgIHByaXZhdGUgZmxvd2VyUm9vdDogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgZmxvd2VyQ291bnQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbmV4dGZsb3dlck1qUG9zOiBjYy5WZWMzID0gY2MuVmVjMy5aRVJPO1xyXG4gICAgLyoqIOWQg+eisOadoCDmk43kvZzniYzloqnmlbDnu4QqL1xyXG4gICAgcHJpdmF0ZSBvcGVyVmlld0xpc3Q6IEVybWpNYWhqb25nT3BlclZpZXdbXSA9IFtdO1xyXG4gICAgLyoqIOaTjeS9nOeJjOWiqeaVsOe7hCDlvZPliY3ntKLlvJXmjIflkJEgKi9cclxuICAgIHByaXZhdGUgb3BlckN1ckluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgLyoqIOWQg+eisOadoOeJjOWiqeeItuiKgueCuSDkuZ/mmK/mjpLliJfotbfngrkqL1xyXG4gICAgcHJpdmF0ZSBvcGVyUm9vdDogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgd2luU2hvd1ZpZXc6IFdpbk1qSXRlbXNTaG93VmlldztcclxuXHJcbiAgICBwdWJsaWMgaXNCcmlnaHQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgZGFya0hhbmRWaWV3OiBFcm1qUGxheWVyRGFya0hhbmRWaWV3O1xyXG4gICAgcHJpdmF0ZSBicmlnaHRIYW5kVmlldzogRXJtalBsYXllckJyaWdodEhhbmRWaWV3O1xyXG4gICAgcHJpdmF0ZSBpbkJlVGluZ2VkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSwgcHVibGljIG5TZWF0OiBudW1iZXIpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMub3V0TWpNZ3IgPSBFcm1qRHJpdmVyLmluc3RhbmNlLm91dE1qTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmRhcmtIYW5kVmlldyA9IG5ldyBFcm1qUGxheWVyRGFya0hhbmRWaWV3KHRoaXMuZ2V0Q2hpbGQoXCJkYXJrVmlld1wiKSwgdGhpcy5uU2VhdCk7XHJcbiAgICAgICAgdGhpcy5kYXJrSGFuZFZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5icmlnaHRIYW5kVmlldyA9IG5ldyBFcm1qUGxheWVyQnJpZ2h0SGFuZFZpZXcodGhpcy5nZXRDaGlsZChcImJyaWdodFZpZXdcIiksIHRoaXMublNlYXQpO1xyXG4gICAgICAgIHRoaXMuYnJpZ2h0SGFuZFZpZXcuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMub3V0U2hvd1N0YXJ0V29ybGRQb3MgPSB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMuZ2V0Q2hpbGQoXCJvdXRTdGFydFBvaW50XCIpLnBvc2l0aW9uKTtcclxuICAgICAgICB0aGlzLm91dFNob3dSb290MCA9IHRoaXMuZ2V0Q2hpbGQoXCJvdXRTaG93Um9vdDBcIik7XHJcbiAgICAgICAgdGhpcy5vdXRTaG93Um9vdDEgPSB0aGlzLmdldENoaWxkKFwib3V0U2hvd1Jvb3QxXCIpO1xyXG4gICAgICAgIHRoaXMub3V0U2hvd1Jvb3QyID0gdGhpcy5nZXRDaGlsZChcIm91dFNob3dSb290MlwiKTtcclxuICAgICAgICB0aGlzLmZsb3dlclJvb3QgPSB0aGlzLmdldENoaWxkKFwiZmxvd2VyUm9vdFwiKTsgICAgIFxyXG4gICAgICAgIHRoaXMub3BlclJvb3QgPSB0aGlzLmdldENoaWxkKFwib3BlclJvb3RcIik7XHJcbiAgICAgICAgdGhpcy53aW5TaG93VmlldyA9IG5ldyBXaW5Nakl0ZW1zU2hvd1ZpZXcodGhpcy5nZXRDaGlsZChcIndpblNob3dSb290XCIpLCB0aGlzLm5TZWF0KTtcclxuICAgICAgICB0aGlzLndpblNob3dWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRIYW5kTWpTaG93KGZsYWc6IGJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuZGFya0hhbmRWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldERhcmtIYW5kTWpPdXRTY3JlZW4oKXtcclxuICAgICAgICB0aGlzLmRhcmtIYW5kVmlldy5zZXRIYW5kTWpPdXRTY3JlZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWPkeeJjFxyXG4gICAgICogQHBhcmFtIGNvdW50IOS4gOasoeaRuOWHoOW8oFxyXG4gICAgICogQHBhcmFtIHZhbHVlQXJyIOeJjOWAvOaVsOe7hCDlhYPntKDnqbrku6PooajmmpfniYxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlYWxIYW5kTWooY291bnQ6IG51bWJlciA9IDEsIHZhbHVlQXJyOiBudW1iZXJbXSA9IFtdKXtcclxuICAgICAgICB0aGlzLmRhcmtIYW5kVmlldy5kZWFsSGFuZE1qKGNvdW50LCB2YWx1ZUFycik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkbjniYwg6L2u5qyh5pG454mMIOebruWJjeWPquaUr+aMgeaRuOS4gOW8oFxyXG4gICAgICogQHBhcmFtIHZhbHVlIOeJjOWAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZHJhd0hhbmRNaih2YWx1ZT86IG51bWJlcil7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluQmVUaW5nZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhcmtIYW5kVmlldy5kcmF3SGFuZE1qKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYnJpZ2h0SGFuZFZpZXcuZHJhd0hhbmRNaih2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog546p5a626KGl6IqxIOihpei/m+adpeeahOmDveaYr+aal+eJjOihqOeOsFxyXG4gICAgICogQHBhcmFtIG91dEFyciDoirHniYxcclxuICAgICAqIEBwYXJhbSBpc1JvdW5kRGVhbCDmmK/lkKbova7mrKHmkbjniYzjgIHlvIDmnaDmkbjniYxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNoYW5nZUZsb3dlcihvdXRBcnI6IG51bWJlcltdLCBpbkFycjogbnVtYmVyW10pe1xyXG4gICAgICAgIGlmICghdGhpcy5pbkJlVGluZ2VkKXtcclxuICAgICAgICAgICAgdGhpcy5kYXJrSGFuZFZpZXcuY2hhbmdlRmxvd2VyKG91dEFyciwgKCk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxvd2VyQ2FyZEFkZChvdXRBcnIpOyAgICAgLy8g6Iqx54mM5Yy65Z+fYWRk5pi+56S6XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmJyaWdodEhhbmRWaWV3LmNoYW5nZUZsb3dlcihvdXRBcnIsIGluQXJyLCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mbG93ZXJDYXJkQWRkKG91dEFycik7ICAgICAvLyDoirHniYzljLrln59hZGTmmL7npLpcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmt7vliqDoirHniYzliLDmoYzkuIogKi9cclxuICAgIHB1YmxpYyBmbG93ZXJDYXJkQWRkKG91dEFycjogbnVtYmVyW10pe1xyXG4gICAgICAgIGxldCByZWxhdGl2ZSA9IHRoaXMublNlYXQgLSB0aGlzLkNvbnRleHQuc2VsZkxvY2FsU2VhdDsgXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG91dEFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5vdXRNak1nci5nZXRPbmVGbG93ZXJNaigpO1xyXG4gICAgICAgICAgICBpdGVtLm1haGpvbmdWYWx1ZSA9IG91dEFycltpXTtcclxuICAgICAgICAgICAgaXRlbS5pc0Zyb250ID0gdHJ1ZTtcclxuICAgICAgICAgICAgaXRlbS5ub2RlLnNldFBhcmVudCh0aGlzLmZsb3dlclJvb3QpO1xyXG4gICAgICAgICAgICBsZXQgblBlcnNwID0gdGhpcy5EZWZpbmUuZmxvd2VyTWpQZXJzcEFyclt0aGlzLmZsb3dlckNvdW50XSB8fCAwO1xyXG4gICAgICAgICAgICBpdGVtLnNldFBlcnNwU3R5bGUoblBlcnNwLCByZWxhdGl2ZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQge2NmZywgZGlyfSA9IEVybWpNalN0eWxlSGVscGVyLmdldFBlcnNwZWN0aXZlQ2ZnKG5QZXJzcCk7XHJcbiAgICAgICAgICAgIGl0ZW0ubm9kZS5zZXRTaWJsaW5nSW5kZXgoMTAgLSB0aGlzLmZsb3dlckNvdW50KTsgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5mbG93ZXJDb3VudCA9PSAwKXtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubm9kZS5zZXRQb3NpdGlvbihjYy5WZWMzLlpFUk8pO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldFggPSBkaXIgPiAwID8gY2ZnLmRldlNwYWNlWCA6IGNmZy5uZWdEZXZTcGFjZVg7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3BhY2VYID0gcmVsYXRpdmUgPT0gMCA/IG9mZnNldFggOiAtb2Zmc2V0WDtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV4dGZsb3dlck1qUG9zID0gY2MudjMoc3BhY2VYLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaXRlbS5ub2RlLnNldFBvc2l0aW9uKHRoaXMubmV4dGZsb3dlck1qUG9zKTtcclxuICAgICAgICAgICAgICAgIGxldCBvZmZzZXRYID0gZGlyID4gMCA/IGNmZy5kZXZTcGFjZVggOiBjZmcubmVnRGV2U3BhY2VYO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwYWNlWCA9IHJlbGF0aXZlID09IDAgPyBvZmZzZXRYIDogLW9mZnNldFg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRmbG93ZXJNalBvcyA9IGNjLnYzKHRoaXMubmV4dGZsb3dlck1qUG9zLnggKyBzcGFjZVgsIDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZmxvd2VyQ291bnQrKztcclxuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVhZHlGb3JPdXQobGFzdENhcmQ6IG51bWJlcil7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluQmVUaW5nZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhcmtIYW5kVmlldy5yZWFkeUZvck91dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmJyaWdodEhhbmRWaWV3LnJlYWR5Rm9yT3V0KGxhc3RDYXJkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG91dENhcmQodmFsdWU6IG51bWJlcil7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluQmVUaW5nZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhcmtIYW5kVmlldy5vdXRDYXJkKHZhbHVlLCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb091dEZseUFuaW0odmFsdWUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmJyaWdodEhhbmRWaWV3Lm91dENhcmQodmFsdWUsICgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvT3V0Rmx5QW5pbSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlh7rniYzpo57purvlsIblrZAgKi9cclxuICAgIHByaXZhdGUgZG9PdXRGbHlBbmltKHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCByZWxhdGl2ZSA9IHRoaXMublNlYXQgLSB0aGlzLkNvbnRleHQuc2VsZkxvY2FsU2VhdDsgXHJcblxyXG4gICAgICAgIGxldCBmbHlJdGVtID0gdGhpcy5vdXRNak1nci5nZXRPbmVPdXRNaigpO1xyXG4gICAgICAgIHRoaXMub3V0U2hvd0NvdW50ICs9IDE7XHJcbiAgICAgICAgbGV0IFtyb3csIGNvbF0gPSBbTWF0aC5jZWlsKHRoaXMub3V0U2hvd0NvdW50IC8gdGhpcy5EZWZpbmUuT3V0U2hvd01qTWF4Q29sKSAtMSwgKHRoaXMub3V0U2hvd0NvdW50IC0gMSkgJSB0aGlzLkRlZmluZS5PdXRTaG93TWpNYXhDb2xdO1xyXG4gICAgICAgIGlmIChyb3cgPT0gMCl7XHJcbiAgICAgICAgICAgIGZseUl0ZW0ubm9kZS5zZXRQYXJlbnQodGhpcy5vdXRTaG93Um9vdDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHJvdyA9PSAxKXtcclxuICAgICAgICAgICAgZmx5SXRlbS5ub2RlLnNldFBhcmVudCh0aGlzLm91dFNob3dSb290MSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGZseUl0ZW0ubm9kZS5zZXRQYXJlbnQodGhpcy5vdXRTaG93Um9vdDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmbHlJdGVtLm1haGpvbmdWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIGZseUl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBmbHlJdGVtLmlzRnJvbnQgPSB0cnVlO1xyXG4gICAgICAgIGxldCBzdGFydFBvcyA9IGZseUl0ZW0ubm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy5vdXRTaG93U3RhcnRXb3JsZFBvcyk7XHJcblxyXG4gICAgICAgIGxldCBjdXJQZXJzcCA9IHRoaXMuRGVmaW5lLm91dE1qUGVyc3BBcnJbY29sXTtcclxuICAgICAgICBsZXQgY3VyQ2ZnID0gRXJtak1qU3R5bGVIZWxwZXIuZ2V0UGVyc3BlY3RpdmVDZmcoY3VyUGVyc3ApO1xyXG4gICAgICAgIGlmIChjb2wgPT0gMCl7XHJcbiAgICAgICAgICAgIGxldCBlbmRQb3MgPSBjYy52MygwLCAwKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRYID0gY3VyQ2ZnLmRpciA+IDAgPyBjdXJDZmcuY2ZnLmRldlNwYWNlWCA6IGN1ckNmZy5jZmcubmVnRGV2U3BhY2VYO1xyXG4gICAgICAgICAgICBsZXQgc3BhY2VYID0gcmVsYXRpdmUgPT0gMCA/IG9mZnNldFggOiAtb2Zmc2V0WDtcclxuICAgICAgICAgICAgdGhpcy5uZXh0T3V0TWpQb3MgPSBjYy52MyhzcGFjZVgsIDApO1xyXG4gICAgICAgICAgICBmbHlJdGVtLmRvT3V0QW5pbShzdGFydFBvcywgZW5kUG9zLCBjdXJQZXJzcCwgcmVsYXRpdmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBsZXQgZW5kUG9zID0gdGhpcy5uZXh0T3V0TWpQb3M7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRYID0gY3VyQ2ZnLmRpciA+IDAgPyBjdXJDZmcuY2ZnLmRldlNwYWNlWCA6IGN1ckNmZy5jZmcubmVnRGV2U3BhY2VYO1xyXG4gICAgICAgICAgICBsZXQgc3BhY2VYID0gcmVsYXRpdmUgPT0gMCA/IG9mZnNldFggOiAtb2Zmc2V0WDtcclxuICAgICAgICAgICAgdGhpcy5uZXh0T3V0TWpQb3MgPSBjYy52MyhlbmRQb3MueCArIHNwYWNlWCwgMCk7XHJcbiAgICAgICAgICAgIGZseUl0ZW0uZG9PdXRBbmltKHN0YXJ0UG9zLCBlbmRQb3MsIGN1clBlcnNwLCByZWxhdGl2ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBmbHlJdGVtLm5vZGUuc2V0U2libGluZ0luZGV4KHRoaXMuRGVmaW5lLk91dFNob3dNak1heENvbCAtIGNvbCk7XHJcbiAgICAgICAgfSwgdGhpcy5EZWZpbmUub3V0TWpTaG93VGltZSArIHRoaXMuRGVmaW5lLm91dE1qRmx5VGltZSArIDAuMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOebtOaOpeaYvuekuuahjOS4iuaJk+WHuueahOm6u+WwhuWtkCDph43ov57nlKggKi9cclxuICAgIHB1YmxpYyBzaG93T3V0Q2FyZERpcmVjdGx5KGNhcmRzOiBudW1iZXJbXSA9IFtdKXtcclxuICAgICAgICBsZXQgcmVsYXRpdmUgPSB0aGlzLm5TZWF0IC0gdGhpcy5Db250ZXh0LnNlbGZMb2NhbFNlYXQ7IFxyXG5cclxuICAgICAgICBjYXJkcy5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgbGV0IGZseUl0ZW0gPSB0aGlzLm91dE1qTWdyLmdldE9uZU91dE1qKCk7XHJcbiAgICAgICAgICAgIHRoaXMub3V0U2hvd0NvdW50ICs9IDE7XHJcbiAgICAgICAgICAgIGxldCBbcm93LCBjb2xdID0gW01hdGguY2VpbCh0aGlzLm91dFNob3dDb3VudCAvIHRoaXMuRGVmaW5lLk91dFNob3dNak1heENvbCkgLTEsICh0aGlzLm91dFNob3dDb3VudCAtIDEpICUgdGhpcy5EZWZpbmUuT3V0U2hvd01qTWF4Q29sXTtcclxuICAgICAgICAgICAgaWYgKHJvdyA9PSAwKXtcclxuICAgICAgICAgICAgICAgIGZseUl0ZW0ubm9kZS5zZXRQYXJlbnQodGhpcy5vdXRTaG93Um9vdDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYocm93ID09IDEpe1xyXG4gICAgICAgICAgICAgICAgZmx5SXRlbS5ub2RlLnNldFBhcmVudCh0aGlzLm91dFNob3dSb290MSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGZseUl0ZW0ubm9kZS5zZXRQYXJlbnQodGhpcy5vdXRTaG93Um9vdDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZseUl0ZW0ubWFoam9uZ1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGZseUl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgZmx5SXRlbS5pc0Zyb250ID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IGN1clBlcnNwID0gdGhpcy5EZWZpbmUub3V0TWpQZXJzcEFycltjb2xdO1xyXG4gICAgICAgICAgICBmbHlJdGVtLm5vZGUuc2V0U2libGluZ0luZGV4KHRoaXMuRGVmaW5lLk91dFNob3dNak1heENvbCAtIGNvbCk7XHJcbiAgICAgICAgICAgIGxldCBjdXJDZmcgPSBFcm1qTWpTdHlsZUhlbHBlci5nZXRQZXJzcGVjdGl2ZUNmZyhjdXJQZXJzcCk7XHJcbiAgICAgICAgICAgIGlmIChjb2wgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kUG9zID0gY2MudjMoMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0WCA9IGN1ckNmZy5kaXIgPiAwID8gY3VyQ2ZnLmNmZy5kZXZTcGFjZVggOiBjdXJDZmcuY2ZnLm5lZ0RldlNwYWNlWDtcclxuICAgICAgICAgICAgICAgIGxldCBzcGFjZVggPSByZWxhdGl2ZSA9PSAwID8gb2Zmc2V0WCA6IC1vZmZzZXRYO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0T3V0TWpQb3MgPSBjYy52MyhzcGFjZVgsIDApO1xyXG4gICAgICAgICAgICAgICAgZmx5SXRlbS5ub2RlLnNldFBvc2l0aW9uKGVuZFBvcyk7XHJcbiAgICAgICAgICAgICAgICBmbHlJdGVtLnNldFBlcnNwU3R5bGUoY3VyUGVyc3AsIHJlbGF0aXZlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZFBvcyA9IHRoaXMubmV4dE91dE1qUG9zO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldFggPSBjdXJDZmcuZGlyID4gMCA/IGN1ckNmZy5jZmcuZGV2U3BhY2VYIDogY3VyQ2ZnLmNmZy5uZWdEZXZTcGFjZVg7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3BhY2VYID0gcmVsYXRpdmUgPT0gMCA/IG9mZnNldFggOiAtb2Zmc2V0WDtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV4dE91dE1qUG9zID0gY2MudjMoZW5kUG9zLnggKyBzcGFjZVgsIDApO1xyXG4gICAgICAgICAgICAgICAgZmx5SXRlbS5ub2RlLnNldFBvc2l0aW9uKGVuZFBvcyk7XHJcbiAgICAgICAgICAgICAgICBmbHlJdGVtLnNldFBlcnNwU3R5bGUoY3VyUGVyc3AsIHJlbGF0aXZlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDooqvlkIPnorDmnaDml7Yg5YeP5bCR5qGM6Z2i5LiA5Liq6bq75bCG5a2QICovXHJcbiAgICBwdWJsaWMgcmVkdWNlT25lT3V0TWooKXtcclxuICAgICAgICBsZXQgcmVsYXRpdmUgPSB0aGlzLm5TZWF0IC0gdGhpcy5Db250ZXh0LnNlbGZMb2NhbFNlYXQ7IFxyXG4gICAgICAgIGxldCBbcm93LCBjb2xdID0gW01hdGguY2VpbCh0aGlzLm91dFNob3dDb3VudCAvIHRoaXMuRGVmaW5lLk91dFNob3dNak1heENvbCkgLTEsICh0aGlzLm91dFNob3dDb3VudCAtIDEpICUgdGhpcy5EZWZpbmUuT3V0U2hvd01qTWF4Q29sXTtcclxuICAgICAgICBsZXQgY3VyUGVyc3AgPSB0aGlzLkRlZmluZS5vdXRNalBlcnNwQXJyW2NvbF07XHJcbiAgICAgICAgbGV0IGN1ckNmZyA9IEVybWpNalN0eWxlSGVscGVyLmdldFBlcnNwZWN0aXZlQ2ZnKGN1clBlcnNwKTtcclxuICAgICAgICBsZXQgb2Zmc2V0WCA9IGN1ckNmZy5kaXIgPiAwID8gY3VyQ2ZnLmNmZy5kZXZTcGFjZVggOiBjdXJDZmcuY2ZnLm5lZ0RldlNwYWNlWDtcclxuICAgICAgICBsZXQgc3BhY2VYID0gcmVsYXRpdmUgPT0gMCA/IG9mZnNldFggOiAtb2Zmc2V0WDtcclxuICAgICAgICB0aGlzLm5leHRPdXRNalBvcyA9IGNjLnYzKHRoaXMubmV4dE91dE1qUG9zLnggLSBzcGFjZVgsIDApO1xyXG4gICAgICAgIHRoaXMub3V0U2hvd0NvdW50IC09IDE7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiDnorAgKi9cclxuICAgIHB1YmxpYyBwb25nQ2FyZCh2YWx1ZUFycjogbnVtYmVyW10pe1xyXG4gICAgICAgIGlmICghdGhpcy5pbkJlVGluZ2VkKXtcclxuICAgICAgICAgICAgdGhpcy5kYXJrSGFuZFZpZXcucG9uZ0NhcmQodmFsdWVBcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmJyaWdodEhhbmRWaWV3LnBvbmdDYXJkKHZhbHVlQXJyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBvcGVyVmlldyA9IHRoaXMuZ2V0T25lT3BlclZpZXcoKTtcclxuICAgICAgICBvcGVyVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBwZXJzcEFyciA9IHRoaXMuRGVmaW5lLm9wZXJNakdyb3VwUGVyc3BBcnIuc2xpY2UoKHRoaXMub3BlckN1ckluZGV4IC0gMSkgKiAzLCB0aGlzLm9wZXJDdXJJbmRleCAqIDMpO1xyXG4gICAgICAgIG9wZXJWaWV3LnNldFBvbmdTdHlsZSh2YWx1ZUFyciwgcGVyc3BBcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlkIMgKi9cclxuICAgIHB1YmxpYyBjaG93Q2FyZCh2YWx1ZUFycjogbnVtYmVyW10sIGNob3dDYXJkOiBudW1iZXIpe1xyXG4gICAgICAgIGlmICghdGhpcy5pbkJlVGluZ2VkKXtcclxuICAgICAgICAgICAgdGhpcy5kYXJrSGFuZFZpZXcuY2hvd0NhcmQodmFsdWVBcnIsIGNob3dDYXJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5icmlnaHRIYW5kVmlldy5jaG93Q2FyZCh2YWx1ZUFyciwgY2hvd0NhcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG9wZXJWaWV3ID0gdGhpcy5nZXRPbmVPcGVyVmlldygpO1xyXG4gICAgICAgIG9wZXJWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IHBlcnNwQXJyID0gdGhpcy5EZWZpbmUub3Blck1qR3JvdXBQZXJzcEFyci5zbGljZSgodGhpcy5vcGVyQ3VySW5kZXggLSAxKSAqIDMsIHRoaXMub3BlckN1ckluZGV4ICogMyk7XHJcbiAgICAgICAgb3BlclZpZXcuc2V0Q2hvd1N0eWxlKHZhbHVlQXJyLCBjaG93Q2FyZCwgcGVyc3BBcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmnaAgKi9cclxuICAgIHB1YmxpYyBrb25nQ2FyZCh0eXBlOiBudW1iZXIsIHZhbHVlQXJyOiBudW1iZXJbXSl7XHJcbiAgICAgICAgaWYgKCF0aGlzLmluQmVUaW5nZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhcmtIYW5kVmlldy5rb25nQ2FyZCh0eXBlLCB2YWx1ZUFycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuYnJpZ2h0SGFuZFZpZXcua29uZ0NhcmQodHlwZSwgdmFsdWVBcnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGUgPT0gNSl7XHJcbiAgICAgICAgICAgIGxldCBbb3BlclZpZXcsIGluZGV4XSA9IHRoaXMuZmluZFBvbmdLb25nT3Blcih2YWx1ZUFyclswXSk7ICAgICAgLy8g56Kw5p2gIOaJvuWIsOeOsOWtmOeisCDliqDkuIDlvKBcclxuICAgICAgICAgICAgaWYgKG9wZXJWaWV3KXtcclxuICAgICAgICAgICAgICAgIGxldCBwZXJzcEFyciA9IHRoaXMuRGVmaW5lLm9wZXJNakdyb3VwUGVyc3BBcnIuc2xpY2UoKGluZGV4IC0gMSkgKiAzLCBpbmRleCAqIDMpO1xyXG4gICAgICAgICAgICAgICAgb3BlclZpZXcuc2V0S29uZ1N0eWxlKHZhbHVlQXJyLCB0cnVlLCBmYWxzZSwgcGVyc3BBcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGxldCBvcGVyVmlldyA9IHRoaXMuZ2V0T25lT3BlclZpZXcoKTtcclxuICAgICAgICAgICAgb3BlclZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHBlcnNwQXJyID0gdGhpcy5EZWZpbmUub3Blck1qR3JvdXBQZXJzcEFyci5zbGljZSgodGhpcy5vcGVyQ3VySW5kZXggLSAxKSAqIDMsIHRoaXMub3BlckN1ckluZGV4ICogMyk7XHJcbiAgICAgICAgICAgIG9wZXJWaWV3LnNldEtvbmdTdHlsZSh2YWx1ZUFyciwgdHlwZSAhPT0gNiwgdGhpcy5uU2VhdCA9PSB0aGlzLkNvbnRleHQuc2VsZkxvY2FsU2VhdCB8fCB0aGlzLmluQmVUaW5nZWQsIHBlcnNwQXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOiOt+WPluacquS9v+eUqOeahOWQg+eisOadoOm6u+WwhuWiqSAqL1xyXG4gICAgcHJpdmF0ZSBnZXRPbmVPcGVyVmlldygpe1xyXG4gICAgICAgIGlmKCF0aGlzLm9wZXJWaWV3TGlzdFt0aGlzLm9wZXJDdXJJbmRleF0pe1xyXG4gICAgICAgICAgICBsZXQgcmVsYXRpdmUgPSB0aGlzLm5TZWF0IC0gdGhpcy5Db250ZXh0LnNlbGZMb2NhbFNlYXQ7IFxyXG4gICAgICAgICAgICBsZXQgcHJlZmFiID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRCdW5kbGVSZXMoRXJtakdhbWVDb25zdC5HaWQsIEVybWpQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvbWFoam9uZy9tYWhqb25nT3BlclZpZXdcIiwgY2MuUHJlZmFiKTtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLm9wZXJSb290KTtcclxuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbih0aGlzLkRlZmluZS5PcGVyVmlld1NwYWNlW3RoaXMublNlYXRdLm11bCh0aGlzLm9wZXJDdXJJbmRleCkpO1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBFcm1qTWFoam9uZ09wZXJWaWV3KG5vZGUsIHJlbGF0aXZlKTtcclxuICAgICAgICAgICAgdmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5vcGVyVmlld0xpc3RbdGhpcy5vcGVyQ3VySW5kZXhdID0gdmlldztcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLm9wZXJWaWV3TGlzdFt0aGlzLm9wZXJDdXJJbmRleF07XHJcbiAgICAgICAgdGhpcy5vcGVyQ3VySW5kZXggKz0gMTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5om+5Yiw546w5a2Y56Kw44CB5p2gICovXHJcbiAgICBwcml2YXRlIGZpbmRQb25nS29uZ09wZXIodmFsdWU6IG51bWJlcik6IFtFcm1qTWFoam9uZ09wZXJWaWV3LCBudW1iZXJde1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5vcGVyVmlld0xpc3QubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IHRoaXMub3BlclZpZXdMaXN0W2ldO1xyXG4gICAgICAgICAgICBpZiAodmlldy52YWx1ZSA9PSB2YWx1ZSAmJiAodmlldy5jaGVja1BvbmdWYWxpZCgpIHx8IHZpZXcuY2hlY2tLb25nVmFsaWQoKSkpICAvLyDkuI3kvJrlh7rnjrDlkIzkuIDnp43niYznmoTmnaDlkoznorAg5pqX5p2g5LiN5Lya6KKr5oqi5p2gXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW3ZpZXcsIGkgKyAxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOiiq+aKouadoOiDoSAqL1xyXG4gICAgcHVibGljIHJvYmJlZEtvbmdMb3NlKHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBbdmlld10gPSB0aGlzLmZpbmRQb25nS29uZ09wZXIodmFsdWUpO1xyXG4gICAgICAgIGlmICh2aWV3KVxyXG4gICAgICAgICAgICB2aWV3LmJlS29uZ1JvYmJlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmiormmpfmnaDlj5jmiJDlj6/op4HnmoQzKzEg57uT566X5ZKM5ZCs54mM5pe2Ki9cclxuICAgIHB1YmxpYyBzaG93RGFya0tvbmdTZWVuKGRhcmtMaXN0OiBhbnlbXSA9IFtdKXtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm9wZXJWaWV3TGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChjb3VudCA9PSBkYXJrTGlzdC5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgbGV0IHZpZXcgPSB0aGlzLm9wZXJWaWV3TGlzdFtpXTtcclxuICAgICAgICAgICAgaWYgKHZpZXcuY2hlY2tEYXJrS29uZ1ZhbGlkKCkpeyAgLy8g5om+5Yiw5pqX5p2gXHJcbiAgICAgICAgICAgICAgICBsZXQgcGVyc3BBcnIgPSB0aGlzLkRlZmluZS5vcGVyTWpHcm91cFBlcnNwQXJyLnNsaWNlKGkgKiAzLCAoaSArIDEpICogMyk7XHJcbiAgICAgICAgICAgICAgICB2aWV3LnNldEtvbmdTdHlsZShkYXJrTGlzdFtjb3VudF0sIGZhbHNlLCB0cnVlLCBwZXJzcEFycik7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog6YeN6L+e5aSN55uY5ZCD56Kw5p2g54mMICovXHJcbiAgICBwdWJsaWMgc3luY0FsbE9wZXJWaWV3KGxpc3Q6IGFueVtdID0gW10pe1xyXG4gICAgICAgIGxpc3QuZm9yRWFjaChkYXRhPT57XHJcbiAgICAgICAgICAgIGxldCBvcGVyVmlldyA9IHRoaXMuZ2V0T25lT3BlclZpZXcoKTtcclxuICAgICAgICAgICAgb3BlclZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHBlcnNwQXJyID0gdGhpcy5EZWZpbmUub3Blck1qR3JvdXBQZXJzcEFyci5zbGljZSgodGhpcy5vcGVyQ3VySW5kZXggLSAxKSAqIDMsIHRoaXMub3BlckN1ckluZGV4ICogMyk7XHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gZGF0YS50eXBlO1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVBcnIgPSBkYXRhLmFsbF9jYXJkcyB8fCBbXTtcclxuICAgICAgICAgICAgbGV0IGNhcmQgPSBkYXRhLmNhcmQ7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IDIpe1xyXG4gICAgICAgICAgICAgICAgb3BlclZpZXcuc2V0Q2hvd1N0eWxlKHZhbHVlQXJyLCBjYXJkLCBwZXJzcEFycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0eXBlID09IDMpe1xyXG4gICAgICAgICAgICAgICAgb3BlclZpZXcuc2V0UG9uZ1N0eWxlKHZhbHVlQXJyLCBwZXJzcEFycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIG9wZXJWaWV3LnNldEtvbmdTdHlsZSh2YWx1ZUFyciwgdHlwZSAhPT0gNiwgdGhpcy5uU2VhdCA9PSB0aGlzLkNvbnRleHQuc2VsZkxvY2FsU2VhdCwgcGVyc3BBcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkV2luTWpTaG93KHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMud2luU2hvd1ZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLndpblNob3dWaWV3LmFkZE9uZUh1TWpJdGVtKHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6Ieq5pG45pe26ZqQ6JeP5LiK5omL6YKj5byg6IOh54mMICovXHJcbiAgICBwdWJsaWMgd2luSGlkZUxhc3REcmF3KHZhbHVlOiBudW1iZXIpe1xyXG4gICAgICAgIGlmKCF0aGlzLmluQmVUaW5nZWQpe1xyXG4gICAgICAgICAgICB0aGlzLmRhcmtIYW5kVmlldy53aW5IaWRlTGFzdERyYXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5icmlnaHRIYW5kVmlldy53aW5IaWRlTGFzdERyYXcodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QmVJblRpbmcoKXtcclxuICAgICAgICB0aGlzLmluQmVUaW5nZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93RG93bkhhbmQoZmxhZzogYm9vbGVhbiwgdmFsdWVBcnI6IG51bWJlcltdLCBpc1dpbjogYm9vbGVhbiwgaXNTb3J0OiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLmRhcmtIYW5kVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJyaWdodEhhbmRWaWV3LmFjdGl2ZSA9IGZsYWc7XHJcbiAgICAgICAgdGhpcy5icmlnaHRIYW5kVmlldy5zaG93RG93bih2YWx1ZUFyciwgaXNXaW4sIGlzU29ydCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOWbnuaUtuaJgOacieWQg+eisOadoOm6u+WwhuWiqSAqL1xyXG4gICAgcHJpdmF0ZSByZWN5Y2xlQWxsT3BlclZpZXcoKXtcclxuICAgICAgICB0aGlzLm9wZXJWaWV3TGlzdC5mb3JFYWNoKCh2aWV3KT0+e1xyXG4gICAgICAgICAgICB2aWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5vcGVyQ3VySW5kZXggPSAwOyAgICAgIC8vIOmHjee9ruiuoeaVsOS9nOS4uuWbnuaUtiwg5pWw6YeP5pyJ6ZmQ5Liq5LiN5Y+m5L2c5rGg566h55CGXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldExpZ2h0bmluZ1dvcmxkUG9zKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2luU2hvd1ZpZXcuZ2V0V2luSXRlbVdvcmxkUG9zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCl7XHJcbiAgICAgICAgdGhpcy5kYXJrSGFuZFZpZXcucmVzZXQoKTtcclxuICAgICAgICB0aGlzLmRhcmtIYW5kVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJyaWdodEhhbmRWaWV3LnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5icmlnaHRIYW5kVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5mbG93ZXJDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5yZWN5Y2xlQWxsT3BlclZpZXcoKTtcclxuICAgICAgICB0aGlzLm91dFNob3dDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy53aW5TaG93Vmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmluQmVUaW5nZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJCeVJvdW5kKCl7XHJcbiAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBXaW5Nakl0ZW1zU2hvd1ZpZXcgZXh0ZW5kcyBFcm1qQmFzZVZpZXd7XHJcbiAgICBwcml2YXRlIG91dE1qTWdyOiBFcm1qT3V0TWpWaWV3TWFuYWdlcjtcclxuICAgIHByaXZhdGUgYmdTcDogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBtalJvb3Q6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHdpbkNvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBuZXh0V2luTWpQb3M6IGNjLlZlYzMgPSBjYy5WZWMzLlpFUk87XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1heENvbCA9IDU7XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGJnV2lkdGhMaW1pdCA9IDI4O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBiZ1dpZHRoU3RlcCA9IDQwO1xyXG4gICAgcHJpdmF0ZSBtalBhcmVudExpc3Q6IGNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUsIHByaXZhdGUgblJlbGF0aXZlOiBudW1iZXIpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMub3V0TWpNZ3IgPSBFcm1qRHJpdmVyLmluc3RhbmNlLm91dE1qTWFuYWdlcjtcclxuICAgICAgICB0aGlzLmJnU3AgPSB0aGlzLmdldENvbXBvbmVudChcImJnU3BcIiwgY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLm1qUm9vdCA9IHRoaXMuZ2V0Q2hpbGQoXCJtalJvb3RcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W5LiA5Liq54i26IqC54K5LCDnlKjkuo7lsYLmrKFcclxuICAgIHByaXZhdGUgZ2V0TWpSb290KCl7XHJcbiAgICAgICAgbGV0IHJvdyA9IE1hdGguY2VpbCh0aGlzLndpbkNvdW50IC8gdGhpcy5tYXhDb2wpIC0gMTtcclxuICAgICAgICBpZiAoIXRoaXMubWpQYXJlbnRMaXN0W3Jvd10pe1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubWpSb290KTtcclxuICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5zY2FsZSA9IHRoaXMubWpSb290LnNjYWxlO1xyXG4gICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gdGhpcy5talJvb3QucG9zaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMubWpQYXJlbnRMaXN0W3Jvd10gPSBub2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5talBhcmVudExpc3Rbcm93XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkT25lSHVNakl0ZW0odmFsdWU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy53aW5Db3VudCArKztcclxuICAgICAgICBsZXQgW3JvdywgY29sXSA9IFtNYXRoLmNlaWwodGhpcy53aW5Db3VudCAvIHRoaXMubWF4Q29sKSAtIDEsICh0aGlzLndpbkNvdW50IC0gMSkgJSB0aGlzLm1heENvbF07XHJcbiAgICAgICAgbGV0IG1qSXRlbSA9IHRoaXMub3V0TWpNZ3IuZ2V0T25lV2luTWooKTtcclxuICAgICAgICBtakl0ZW0ubWFoam9uZ1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgbWpJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbWpJdGVtLmlzRnJvbnQgPSB0cnVlO1xyXG4gICAgICAgIGxldCByb290ID0gdGhpcy5nZXRNalJvb3QoKTtcclxuICAgICAgICBtakl0ZW0ubm9kZS5zZXRQYXJlbnQocm9vdCk7XHJcbiAgICAgICAgbGV0IG5QZXJzcCA9IHRoaXMuRGVmaW5lLndpbk1qUGVyc3BBcnJbY29sXSB8fCAwO1xyXG4gICAgICAgIG1qSXRlbS5zZXRQZXJzcFN0eWxlKG5QZXJzcCwgdGhpcy5uUmVsYXRpdmUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB7Y2ZnLCBkaXJ9ID0gRXJtak1qU3R5bGVIZWxwZXIuZ2V0UGVyc3BlY3RpdmVDZmcoblBlcnNwKTtcclxuICAgICAgICBtakl0ZW0ubm9kZS5zZXRTaWJsaW5nSW5kZXgoMCk7ICAgICAgIC8vIOS4iumdoueahOWxgue6p+abtOmrmCByb3flkoxjb2zpg73mmK8w5byA5aeLXHJcbiAgICAgICAgaWYgKGNvbCA9PSAwKXtcclxuICAgICAgICAgICAgbWpJdGVtLm5vZGUuc2V0UG9zaXRpb24oY2MudjMoMCwgcm93ICogdGhpcy5EZWZpbmUud2luTW9yZU9mZnNldFkpKTtcclxuICAgICAgICAgICAgbGV0IG9mZnNldFggPSBkaXIgPiAwID8gY2ZnLmRldlNwYWNlWCA6IGNmZy5uZWdEZXZTcGFjZVg7XHJcbiAgICAgICAgICAgIGxldCBzcGFjZVggPSB0aGlzLm5SZWxhdGl2ZSA9PSAwID8gb2Zmc2V0WCA6IC1vZmZzZXRYO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRXaW5NalBvcyA9IGNjLnYzKHNwYWNlWCwgcm93ICogdGhpcy5EZWZpbmUud2luTW9yZU9mZnNldFkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBtakl0ZW0ubm9kZS5zZXRQb3NpdGlvbih0aGlzLm5leHRXaW5NalBvcyk7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXRYID0gZGlyID4gMCA/IGNmZy5kZXZTcGFjZVggOiBjZmcubmVnRGV2U3BhY2VYO1xyXG4gICAgICAgICAgICBsZXQgc3BhY2VYID0gdGhpcy5uUmVsYXRpdmUgPT0gMCA/IG9mZnNldFggOiAtb2Zmc2V0WDtcclxuICAgICAgICAgICAgdGhpcy5uZXh0V2luTWpQb3MgPSBjYy52Myh0aGlzLm5leHRXaW5NalBvcy54ICsgc3BhY2VYLCByb3cgKiB0aGlzLkRlZmluZS53aW5Nb3JlT2Zmc2V0WSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlQmdXaWR0aCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVCZ1dpZHRoKCl7XHJcbiAgICAgICAgaWYodGhpcy53aW5Db3VudCA+PSB0aGlzLm1heENvbCl7XHJcbiAgICAgICAgICAgIHRoaXMuYmdTcC5ub2RlLndpZHRoID0gdGhpcy5iZ1dpZHRoTGltaXQgKyB0aGlzLm1heENvbCAqIHRoaXMuYmdXaWR0aFN0ZXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGxldCBjb2wgPSB0aGlzLndpbkNvdW50ICUgdGhpcy5tYXhDb2w7XHJcbiAgICAgICAgICAgIHRoaXMuYmdTcC5ub2RlLndpZHRoID0gdGhpcy5iZ1dpZHRoTGltaXQgKyBjb2wgKiB0aGlzLmJnV2lkdGhTdGVwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2luSXRlbVdvcmxkUG9zKCl7XHJcbiAgICAgICAgbGV0IG1qSXRlbSA9IHRoaXMub3V0TWpNZ3IuZ2V0TGFzdFdpbk1qKCk7XHJcbiAgICAgICAgaWYgKG1qSXRlbSAmJiBtakl0ZW0uYWN0aXZlKVxyXG4gICAgICAgICAgICByZXR1cm4gbWpJdGVtLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihtakl0ZW0ubm9kZS5wb3NpdGlvbik7XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCl7XHJcbiAgICAgICAgdGhpcy53aW5Db3VudCA9IDA7XHJcbiAgICB9XHJcbn0iXX0=