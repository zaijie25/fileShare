"use strict";
cc._RF.push(module, 'fc6c0SuQWlABohw1v7Kb/vf', 'BbwzBetAreaRootView');
// bbwz/Bbwz/scripts/subview/BbwzBetAreaRootView.ts

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
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzScrollLabel_1 = require("../component/BbwzScrollLabel");
var BbwzBetManager_1 = require("../manager/BbwzBetManager");
var BbwzData_1 = require("../data/BbwzData");
var BbwzBasePool_1 = require("../tool/BbwzBasePool");
var BbwzPathHelper_1 = require("../tool/BbwzPathHelper");
// betArea_mix betArea_dragon betArea_tiger 区域命名与下注区域标识字符串对应
var BbwzBetAreaRootView = /** @class */ (function (_super) {
    __extends(BbwzBetAreaRootView, _super);
    function BbwzBetAreaRootView(node) {
        var _this = _super.call(this) || this;
        _this.areaMap = new Map;
        _this.starNodeList = [];
        _this.trendViewMap = new Map;
        _this.setNode(node);
        return _this;
    }
    BbwzBetAreaRootView.prototype.initView = function () {
        for (var i = 0; i < BbwzConstDefine_1.default.BET_AREA_NAME.length; i++) {
            var key = BbwzConstDefine_1.default.BET_AREA_NAME[i];
            var node = this.getChild("betArea_" + key);
            var view = new BetAreaView(node);
            view.active = true;
            this.areaMap.set(key, view);
            var trendView = new TrendView(this.getChild("trend_" + key), key);
            trendView.active = true;
            this.trendViewMap.set(key, trendView);
        }
        this.copyStarNode = this.getChild("star");
        this.copyStarNode.active = false;
        this.starPool = new StarPool(this.getChild("starPool"), this.copyStarNode);
        this.showStarNode = this.getChild("showNode");
    };
    /**
     * 智多星下注
     * @param bAnim 是否播放动画
     * @param areaName 区域标识名
     * @param startWorldPos 起点世界坐标
     */
    BbwzBetAreaRootView.prototype.showStarBetEffect = function (bAnim, areaName, startWorldPos) {
        if (!this.areaMap.has(areaName))
            return console.error("未定义area", areaName);
        var area = this.areaMap.get(areaName);
        if (area.isWiserBet)
            return;
        area.isWiserBet = true;
        var starNode = this.starPool.getItem();
        this.starNodeList.push(starNode);
        starNode.setParent(this.showStarNode);
        starNode.active = true;
        var desPoint = this.showStarNode.convertToNodeSpaceAR(area.getStarSetPos());
        if (!bAnim) {
            starNode.setPosition(desPoint);
        }
        else {
            var startPos = this.showStarNode.convertToNodeSpaceAR(startWorldPos);
            starNode.setPosition(startPos);
            var time = desPoint.sub(startPos).mag() / 800;
            var dre = desPoint.x - startPos.x;
            // 最大高度
            var subPos = desPoint.sub(startPos);
            var maxHeight = Math.abs(desPoint.y - startPos.y);
            var randHeight = maxHeight * 1.2; //Math.random() * maxHeight *dre;
            var ratioHeight = 0.5;
            if (subPos.x > 0) {
                if (subPos.y > 0 && dre > 0) {
                    randHeight = randHeight + subPos.y * ratioHeight;
                }
                else if (subPos.y < 0 && dre < 0) {
                    randHeight = randHeight + subPos.y * ratioHeight;
                }
            }
            else {
                if (subPos.y < 0 && dre > 0) {
                    randHeight = randHeight + subPos.y * ratioHeight;
                }
                else if (subPos.y > 0 && dre < 0) {
                    randHeight = randHeight + subPos.y * ratioHeight;
                }
            }
            var nRatio = 0.5;
            var q1Pos = cc.v2(subPos.x * nRatio + startPos.x, randHeight + startPos.y);
            var bezier = [startPos, q1Pos, desPoint];
            starNode.runAction(cc.bezierTo(time, bezier).easing(cc.easeSineOut()));
        }
    };
    BbwzBetAreaRootView.prototype.updateTotalBetLabel = function (data) {
        this.areaMap.forEach(function (area, key) {
            if (data && data[key]) {
                var totalBet = data[key].totalBetNum || 0;
                area.setTotalBet(Number(Global.Toolkit.formatPointStr(totalBet)));
            }
            else {
                Logger.error("找不到对应区域总下注数据", key);
            }
        });
    };
    /**
     *
     * @param data
     */
    BbwzBetAreaRootView.prototype.updateSelfBetLabel = function (data) {
        this.areaMap.forEach(function (area, key) {
            if (data && data[key]) {
                var selfBet = data[key].selfBetNum || 0;
                area.setSelfBet(Number(Global.Toolkit.formatPointStr(selfBet)));
            }
            else {
                Logger.error("找不到对应区域自己下注数据", key);
            }
        });
    };
    /**
     * 显示赢区域特效
     * @param data data.award.hit = {"fu_bull" : {hit: 0, multi: 1}, fu_zjh: {hit: 0, multi: 2}, lu_bull: {hit: 0, multi: 1}, ...}
     */
    BbwzBetAreaRootView.prototype.showAreaWinEffect = function (hit) {
        if (!hit)
            return;
        for (var key in hit) {
            if (hit[key].hit == 1 && this.areaMap.has(key)) {
                var area = this.areaMap.get(key);
                area.showHitEffect();
            }
        }
    };
    BbwzBetAreaRootView.prototype.showAreaTrend = function (areaName, list, isAddNew) {
        if (areaName) {
            if (this.trendViewMap.has(areaName)) {
                var trendView = this.trendViewMap.get(areaName);
                trendView.addItemData(list, isAddNew);
            }
        }
        else {
            this.trendViewMap.forEach(function (trendView) {
                trendView.addItemData(list, isAddNew);
            });
        }
    };
    BbwzBetAreaRootView.prototype.clearByRound = function () {
        this.starPool.recycleAll(this.starNodeList);
        this.starNodeList = [];
        this.areaMap.forEach(function (area) {
            area.reset();
        });
    };
    BbwzBetAreaRootView.prototype.clearByGame = function () {
        this.trendViewMap.forEach(function (trendView) {
            trendView.clear();
        });
    };
    return BbwzBetAreaRootView;
}(BbwzBaseView_1.default));
exports.default = BbwzBetAreaRootView;
var BetAreaView = /** @class */ (function (_super) {
    __extends(BetAreaView, _super);
    function BetAreaView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    BetAreaView.prototype.initView = function () {
        this.frameNode = this.getChild("sprite_guang");
        this.frameNode.active = false;
        this.totalBetScrollLbl = Global.UIHelper.safeGetComponent(this.node, "label_total", BbwzScrollLabel_1.default);
        this.totalBetScrollLbl.goToNum(0, 0);
        this.selfBetScrollLbl = Global.UIHelper.safeGetComponent(this.node, "label_self", BbwzScrollLabel_1.default);
        this.selfBetScrollLbl.goToNum(0, 0);
        this.starPosNode = this.getChild("starPos");
        Global.UIHelper.addPolygonButton(this.getComponent("", cc.PolygonCollider)); // 不规则形状触摸监听
        this.node.on(cc.Node.EventType.TOUCH_END, this.onAreaClick, this);
    };
    // 下注区域点击
    BetAreaView.prototype.onAreaClick = function (eventTarget) {
        if (!BbwzData_1.default.instance.isBetEnable())
            return;
        var name = eventTarget.currentTarget.name;
        var betAreaName = name.replace("betArea_", "");
        var chipNum = BbwzData_1.default.instance.chipList[BbwzData_1.default.instance.currentSelectIndex];
        var bBet = BbwzData_1.default.instance.reqBet(chipNum, betAreaName);
        if (bBet)
            BbwzBetManager_1.default.addBetQueue(BbwzConstDefine_1.BbwzRole.Self, betAreaName, chipNum);
    };
    BetAreaView.prototype.setSelfBet = function (num) {
        this.selfBetScrollLbl.goToNum(num);
    };
    BetAreaView.prototype.setTotalBet = function (num) {
        this.totalBetScrollLbl.goToNum(num);
    };
    // 击中区域闪烁效果
    BetAreaView.prototype.showHitEffect = function () {
        var _this = this;
        this.frameNode.stopAllActions();
        this.frameNode.active = true;
        this.frameNode.opacity = 255;
        var actionArr = [];
        for (var i = 0; i < 6; i++) {
            var ac1 = cc.fadeOut(0.5);
            actionArr.push(ac1);
            var ac2 = cc.fadeIn(0.5);
            actionArr.push(ac2);
        }
        actionArr.push(cc.callFunc(function () {
            _this.frameNode.active = false;
        }, this));
        this.frameNode.runAction(cc.sequence(actionArr));
    };
    // 智多星飞在区域的世界坐标
    BetAreaView.prototype.getStarSetPos = function () {
        return this.starPosNode.parent.convertToWorldSpaceAR(this.starPosNode.position);
    };
    Object.defineProperty(BetAreaView.prototype, "isWiserBet", {
        get: function () {
            return this._isWiserBet;
        },
        set: function (flag) {
            this._isWiserBet = flag;
        },
        enumerable: false,
        configurable: true
    });
    BetAreaView.prototype.reset = function () {
        this.isWiserBet = false;
        this.frameNode.active = false;
        this.frameNode.stopAllActions();
        this.totalBetScrollLbl.goToNum(0, 0);
        this.selfBetScrollLbl.goToNum(0, 0);
    };
    return BetAreaView;
}(BbwzBaseView_1.default));
var StarPool = /** @class */ (function (_super) {
    __extends(StarPool, _super);
    function StarPool(root, copyNode) {
        var _this = _super.call(this, root) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    Object.defineProperty(StarPool.prototype, "preCount", {
        get: function () {
            return 3;
        },
        enumerable: false,
        configurable: true
    });
    StarPool.prototype.createItem = function () {
        var node = cc.instantiate(this.copyNode);
        node.active = true;
        return node;
    };
    StarPool.prototype.resetItem = function (node) {
        node.setParent(this.root);
        node.active = false;
        node.stopAllActions();
    };
    return StarPool;
}(BbwzBasePool_1.default));
var TrendView = /** @class */ (function (_super) {
    __extends(TrendView, _super);
    function TrendView(node, key) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.itemSpList = [];
        _this.fullCount = 11; // 多一个用以实现新增动画
        _this.curShowCount = 0;
        _this.setNode(node);
        return _this;
    }
    TrendView.prototype.initView = function () {
        this.layout = this.getComponent("layout", cc.Layout);
        this.copySp = this.getComponent("layout/item", cc.Sprite);
        this.copySp.node.active = false;
        this.itemSpList.push(this.copySp);
        for (var i = 0; i < this.fullCount; i++) {
            if (i == 0)
                continue;
            var node = cc.instantiate(this.copySp.node);
            node.setParent(this.layout.node);
            node.active = false;
            this.itemSpList.push(node.getComponent(cc.Sprite));
        }
        this.rawPos = this.layout.node.position;
        this.fullPos = this.rawPos.sub(cc.v2(this.copySp.node.width + this.layout.spacingX, 0));
    };
    TrendView.prototype.addItemData = function (arr, isNewOne) {
        if (!arr)
            return;
        if (arr.length <= 0)
            this.clearAll();
        if (!isNewOne) {
            this.updateAll(arr);
        }
        else {
            var data = arr[arr.length - 1]["hit"];
            if (!data)
                return;
            this.showItem(this.curShowCount, data[this.key].hit);
            if (this.curShowCount == this.fullCount - 1) {
                this.curShowCount = this.fullCount - 1;
                this.addExtraNewItemAnim();
            }
            else {
                this.curShowCount++;
            }
        }
    };
    TrendView.prototype.updateAll = function (arr) {
        var _this = this;
        this.layout.node.stopAllActions();
        this.layout.node.setPosition(this.rawPos);
        var total = arr.length;
        var maxShowCount = this.fullCount - 1;
        var showArr = arr.slice(total > maxShowCount ? total - maxShowCount : 0, total);
        this.itemSpList.forEach(function (itemSp, index) {
            if (showArr[index]) {
                var hitData = showArr[index]["hit"];
                if (hitData && hitData[_this.key]) {
                    _this.showItem(index, hitData[_this.key].hit);
                }
            }
            else {
                itemSp.node.active = false;
            }
        });
        this.curShowCount = showArr.length;
    };
    TrendView.prototype.showItem = function (index, hit) {
        if (!this.itemSpList[index])
            return;
        var str = hit == 0 ? "bbwz_cuo" : "bbwz_dui";
        this.itemSpList[index].node.active = true;
        Global.ResourceManager.loadBundleAutoAtlas(BbwzConstDefine_1.default.GAME_ID, this.itemSpList[index], BbwzPathHelper_1.default.gameTexturePath + "atlas/dynamic/atlas_dynamic", str, null, true);
    };
    TrendView.prototype.addExtraNewItemAnim = function () {
        var _this = this;
        this.layout.node.setPosition(this.rawPos);
        var moveAct = cc.moveTo(0.5, this.fullPos).easing(cc.easeBackOut());
        var callFunc = cc.callFunc(function () {
            var item = _this.itemSpList.shift();
            item.node.removeFromParent(false);
            item.node.setParent(_this.layout.node);
            _this.itemSpList.push(item);
            item.node.active = false;
            _this.layout.node.setPosition(_this.rawPos); // 滚动动画后, 将原先第一个节点移至最后
        }, this);
        this.layout.node.runAction(cc.sequence([moveAct, callFunc]));
    };
    TrendView.prototype.clearAll = function () {
        this.itemSpList.forEach(function (sp) {
            sp.node.active = false;
        });
        this.curShowCount = 0;
        this.layout.node.stopAllActions();
        this.layout.node.setPosition(this.rawPos);
    };
    TrendView.prototype.clear = function () {
        this.clearAll();
    };
    return TrendView;
}(BbwzBaseView_1.default));

cc._RF.pop();