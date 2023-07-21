
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/subview/BbwzBetAreaRootView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcc3Vidmlld1xcQmJ3ekJldEFyZWFSb290Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMEM7QUFDMUMsMkRBQW9FO0FBQ3BFLGdFQUEyRDtBQUMzRCw0REFBdUQ7QUFDdkQsNkNBQXdDO0FBQ3hDLHFEQUFnRDtBQUNoRCx5REFBb0Q7QUFFcEQsNERBQTREO0FBQzVEO0lBQWlELHVDQUFZO0lBUXpELDZCQUFZLElBQWE7UUFBekIsWUFDSSxpQkFBTyxTQUVWO1FBVk8sYUFBTyxHQUE2QixJQUFJLEdBQUcsQ0FBQztRQUc1QyxrQkFBWSxHQUFjLEVBQUUsQ0FBQztRQUU3QixrQkFBWSxHQUEyQixJQUFJLEdBQUcsQ0FBQztRQUluRCxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRVMsc0NBQVEsR0FBbEI7UUFDSSxLQUFJLElBQUksQ0FBQyxHQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcseUJBQWUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ3hELElBQUksR0FBRyxHQUFHLHlCQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBVyxHQUFLLENBQUMsQ0FBQztZQUMzQyxJQUFJLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFNUIsSUFBSSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFTLEdBQUssQ0FBQyxFQUFFLEdBQUcs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QUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRU0seUJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQTdHQSxBQTZHQyxDQTdHdUIsc0JBQVksR0E2R25DIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJid3pCYXNlVmlldyBmcm9tIFwiLi9CYnd6QmFzZVZpZXdcIjtcclxuaW1wb3J0IEJid3pDb25zdERlZmluZSwgeyBCYnd6Um9sZSB9IGZyb20gXCIuLi9kYXRhL0Jid3pDb25zdERlZmluZVwiO1xyXG5pbXBvcnQgQmJ3elNjcm9sbExhYmVsIGZyb20gXCIuLi9jb21wb25lbnQvQmJ3elNjcm9sbExhYmVsXCI7XHJcbmltcG9ydCBCYnd6QmV0TWFuYWdlciBmcm9tIFwiLi4vbWFuYWdlci9CYnd6QmV0TWFuYWdlclwiO1xyXG5pbXBvcnQgQmJ3ekRhdGEgZnJvbSBcIi4uL2RhdGEvQmJ3ekRhdGFcIjtcclxuaW1wb3J0IEJid3pCYXNlUG9vbCBmcm9tIFwiLi4vdG9vbC9CYnd6QmFzZVBvb2xcIjtcclxuaW1wb3J0IEJid3pQYXRoSGVscGVyIGZyb20gXCIuLi90b29sL0Jid3pQYXRoSGVscGVyXCI7XHJcblxyXG4vLyBiZXRBcmVhX21peCBiZXRBcmVhX2RyYWdvbiBiZXRBcmVhX3RpZ2VyIOWMuuWfn+WRveWQjeS4juS4i+azqOWMuuWfn+agh+ivhuWtl+espuS4suWvueW6lFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYnd6QmV0QXJlYVJvb3RWaWV3IGV4dGVuZHMgQmJ3ekJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSBhcmVhTWFwOiBNYXA8c3RyaW5nLCBCZXRBcmVhVmlldz4gPSBuZXcgTWFwO1xyXG4gICAgcHJpdmF0ZSBjb3B5U3Rhck5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHN0YXJQb29sOiBTdGFyUG9vbDtcclxuICAgIHByaXZhdGUgc3Rhck5vZGVMaXN0OiBjYy5Ob2RlW10gPSBbXTtcclxuICAgIHByaXZhdGUgc2hvd1N0YXJOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSB0cmVuZFZpZXdNYXA6IE1hcDxzdHJpbmcsIFRyZW5kVmlldz4gPSBuZXcgTWFwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIGZvcihsZXQgaT0gMDsgaSA8IEJid3pDb25zdERlZmluZS5CRVRfQVJFQV9OQU1FLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGtleSA9IEJid3pDb25zdERlZmluZS5CRVRfQVJFQV9OQU1FW2ldO1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2V0Q2hpbGQoYGJldEFyZWFfJHtrZXl9YCk7XHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEJldEFyZWFWaWV3KG5vZGUpO1xyXG4gICAgICAgICAgICB2aWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYXJlYU1hcC5zZXQoa2V5LCB2aWV3KTtcclxuXHJcbiAgICAgICAgICAgIGxldCB0cmVuZFZpZXcgPSBuZXcgVHJlbmRWaWV3KHRoaXMuZ2V0Q2hpbGQoYHRyZW5kXyR7a2V5fWApLCBrZXkpO1xyXG4gICAgICAgICAgICB0cmVuZFZpZXcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy50cmVuZFZpZXdNYXAuc2V0KGtleSwgdHJlbmRWaWV3KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29weVN0YXJOb2RlID0gdGhpcy5nZXRDaGlsZChcInN0YXJcIik7XHJcbiAgICAgICAgdGhpcy5jb3B5U3Rhck5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGFyUG9vbCA9IG5ldyBTdGFyUG9vbCh0aGlzLmdldENoaWxkKFwic3RhclBvb2xcIiksIHRoaXMuY29weVN0YXJOb2RlKTtcclxuICAgICAgICB0aGlzLnNob3dTdGFyTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJzaG93Tm9kZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaZuuWkmuaYn+S4i+azqFxyXG4gICAgICogQHBhcmFtIGJBbmltIOaYr+WQpuaSreaUvuWKqOeUu1xyXG4gICAgICogQHBhcmFtIGFyZWFOYW1lIOWMuuWfn+agh+ivhuWQjVxyXG4gICAgICogQHBhcmFtIHN0YXJ0V29ybGRQb3Mg6LW354K55LiW55WM5Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzaG93U3RhckJldEVmZmVjdChiQW5pbTogYm9vbGVhbiwgYXJlYU5hbWU6IHN0cmluZywgc3RhcnRXb3JsZFBvczogY2MuVmVjMil7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFyZWFNYXAuaGFzKGFyZWFOYW1lKSlcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoXCLmnKrlrprkuYlhcmVhXCIsIGFyZWFOYW1lKTtcclxuXHJcbiAgICAgICAgbGV0IGFyZWEgPSB0aGlzLmFyZWFNYXAuZ2V0KGFyZWFOYW1lKTtcclxuICAgICAgICBpZiAoYXJlYS5pc1dpc2VyQmV0KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgYXJlYS5pc1dpc2VyQmV0ID0gdHJ1ZTtcclxuICAgICAgICBsZXQgc3Rhck5vZGUgPSB0aGlzLnN0YXJQb29sLmdldEl0ZW0oKTtcclxuICAgICAgICB0aGlzLnN0YXJOb2RlTGlzdC5wdXNoKHN0YXJOb2RlKTtcclxuICAgICAgICBzdGFyTm9kZS5zZXRQYXJlbnQodGhpcy5zaG93U3Rhck5vZGUpO1xyXG4gICAgICAgIHN0YXJOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGRlc1BvaW50ID0gdGhpcy5zaG93U3Rhck5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoYXJlYS5nZXRTdGFyU2V0UG9zKCkpO1xyXG4gICAgICAgIGlmICghYkFuaW0pe1xyXG4gICAgICAgICAgICBzdGFyTm9kZS5zZXRQb3NpdGlvbihkZXNQb2ludCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGxldCBzdGFydFBvcyA9IHRoaXMuc2hvd1N0YXJOb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHN0YXJ0V29ybGRQb3MpO1xyXG4gICAgICAgICAgICBzdGFyTm9kZS5zZXRQb3NpdGlvbihzdGFydFBvcyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdGltZSA9IGRlc1BvaW50LnN1YihzdGFydFBvcykubWFnKCkgLyA4MDA7XHJcbiAgICAgICAgICAgIGxldCBkcmUgPSBkZXNQb2ludC54IC0gc3RhcnRQb3MueDtcclxuICAgICAgICAgICAgLy8g5pyA5aSn6auY5bqmXHJcbiAgICAgICAgICAgIGxldCBzdWJQb3MgPSBkZXNQb2ludC5zdWIoc3RhcnRQb3MpO1xyXG4gICAgICAgICAgICBsZXQgbWF4SGVpZ2h0ID0gTWF0aC5hYnMoZGVzUG9pbnQueSAtIHN0YXJ0UG9zLnkpO1xyXG4gICAgICAgICAgICBsZXQgcmFuZEhlaWdodCA9IG1heEhlaWdodCAqIDEuMjsgIC8vTWF0aC5yYW5kb20oKSAqIG1heEhlaWdodCAqZHJlO1xyXG4gICAgICAgICAgICBsZXQgcmF0aW9IZWlnaHQgPSAwLjU7XHJcbiAgICAgICAgICAgIGlmIChzdWJQb3MueCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdWJQb3MueSA+IDAgJiYgZHJlID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmRIZWlnaHQgPSByYW5kSGVpZ2h0ICsgc3ViUG9zLnkgKiByYXRpb0hlaWdodDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUG9zLnkgPCAwICYmIGRyZSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByYW5kSGVpZ2h0ID0gcmFuZEhlaWdodCArIHN1YlBvcy55ICogcmF0aW9IZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3ViUG9zLnkgPCAwICYmIGRyZSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByYW5kSGVpZ2h0ID0gcmFuZEhlaWdodCArIHN1YlBvcy55ICogcmF0aW9IZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlBvcy55ID4gMCAmJiBkcmUgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZEhlaWdodCA9IHJhbmRIZWlnaHQgKyBzdWJQb3MueSAqIHJhdGlvSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBuUmF0aW8gPSAwLjU7XHJcbiAgICAgICAgICAgIGxldCBxMVBvcyA9IGNjLnYyKHN1YlBvcy54ICogblJhdGlvICsgc3RhcnRQb3MueCwgcmFuZEhlaWdodCArIHN0YXJ0UG9zLnkpO1xyXG4gICAgICAgICAgICBsZXQgYmV6aWVyID0gW3N0YXJ0UG9zLCBxMVBvcywgZGVzUG9pbnRdO1xyXG4gICAgICAgICAgICBzdGFyTm9kZS5ydW5BY3Rpb24oY2MuYmV6aWVyVG8odGltZSwgYmV6aWVyKS5lYXNpbmcoY2MuZWFzZVNpbmVPdXQoKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlVG90YWxCZXRMYWJlbChkYXRhOiBhbnkpe1xyXG4gICAgICAgIHRoaXMuYXJlYU1hcC5mb3JFYWNoKChhcmVhLCBrZXkpPT57XHJcbiAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGFba2V5XSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG90YWxCZXQgPSBkYXRhW2tleV0udG90YWxCZXROdW0gfHwgMDtcclxuICAgICAgICAgICAgICAgIGFyZWEuc2V0VG90YWxCZXQoTnVtYmVyKEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKHRvdGFsQmV0KSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmib7kuI3liLDlr7nlupTljLrln5/mgLvkuIvms6jmlbDmja5cIiwga2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlU2VsZkJldExhYmVsKGRhdGE6IGFueSl7XHJcbiAgICAgICAgdGhpcy5hcmVhTWFwLmZvckVhY2goKGFyZWEsIGtleSk9PntcclxuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YVtrZXldKXtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxmQmV0ID0gZGF0YVtrZXldLnNlbGZCZXROdW0gfHwgMDtcclxuICAgICAgICAgICAgICAgIGFyZWEuc2V0U2VsZkJldChOdW1iZXIoR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoc2VsZkJldCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5om+5LiN5Yiw5a+55bqU5Yy65Z+f6Ieq5bex5LiL5rOo5pWw5o2uXCIsIGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S66LWi5Yy65Z+f54m55pWIXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBkYXRhLmF3YXJkLmhpdCA9IHtcImZ1X2J1bGxcIiA6IHtoaXQ6IDAsIG11bHRpOiAxfSwgZnVfempoOiB7aGl0OiAwLCBtdWx0aTogMn0sIGx1X2J1bGw6IHtoaXQ6IDAsIG11bHRpOiAxfSwgLi4ufVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd0FyZWFXaW5FZmZlY3QoaGl0OiBhbnkpe1xyXG4gICAgICAgIGlmICghaGl0KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGhpdCkge1xyXG4gICAgICAgICAgICBpZiAoaGl0W2tleV0uaGl0ID09IDEgJiYgdGhpcy5hcmVhTWFwLmhhcyhrZXkpKXtcclxuICAgICAgICAgICAgICAgIGxldCBhcmVhID0gdGhpcy5hcmVhTWFwLmdldChrZXkpO1xyXG4gICAgICAgICAgICAgICAgYXJlYS5zaG93SGl0RWZmZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dBcmVhVHJlbmQoYXJlYU5hbWU6IHN0cmluZywgbGlzdDogYW55W10sIGlzQWRkTmV3OiBib29sZWFuKXtcclxuICAgICAgICBpZiAoYXJlYU5hbWUpe1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmVuZFZpZXdNYXAuaGFzKGFyZWFOYW1lKSl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHJlbmRWaWV3ID0gdGhpcy50cmVuZFZpZXdNYXAuZ2V0KGFyZWFOYW1lKTtcclxuICAgICAgICAgICAgICAgIHRyZW5kVmlldy5hZGRJdGVtRGF0YShsaXN0LCBpc0FkZE5ldyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy50cmVuZFZpZXdNYXAuZm9yRWFjaCh0cmVuZFZpZXc9PntcclxuICAgICAgICAgICAgICAgIHRyZW5kVmlldy5hZGRJdGVtRGF0YShsaXN0LCBpc0FkZE5ldyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5Um91bmQoKXtcclxuICAgICAgICB0aGlzLnN0YXJQb29sLnJlY3ljbGVBbGwodGhpcy5zdGFyTm9kZUxpc3QpO1xyXG4gICAgICAgIHRoaXMuc3Rhck5vZGVMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5hcmVhTWFwLmZvckVhY2goYXJlYT0+e1xyXG4gICAgICAgICAgICBhcmVhLnJlc2V0KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJCeUdhbWUoKXtcclxuICAgICAgICB0aGlzLnRyZW5kVmlld01hcC5mb3JFYWNoKHRyZW5kVmlldz0+e1xyXG4gICAgICAgICAgICB0cmVuZFZpZXcuY2xlYXIoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBCZXRBcmVhVmlldyBleHRlbmRzIEJid3pCYXNlVmlld3tcclxuICAgIHByaXZhdGUgZnJhbWVOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSB0b3RhbEJldFNjcm9sbExibDogQmJ3elNjcm9sbExhYmVsO1xyXG4gICAgcHJpdmF0ZSBzZWxmQmV0U2Nyb2xsTGJsOiBCYnd6U2Nyb2xsTGFiZWw7XHJcbiAgICBwcml2YXRlIHN0YXJQb3NOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBfaXNXaXNlckJldCA6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5mcmFtZU5vZGUgPSB0aGlzLmdldENoaWxkKFwic3ByaXRlX2d1YW5nXCIpO1xyXG4gICAgICAgIHRoaXMuZnJhbWVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudG90YWxCZXRTY3JvbGxMYmwgPSBHbG9iYWwuVUlIZWxwZXIuc2FmZUdldENvbXBvbmVudCh0aGlzLm5vZGUsIFwibGFiZWxfdG90YWxcIiwgQmJ3elNjcm9sbExhYmVsKTtcclxuICAgICAgICB0aGlzLnRvdGFsQmV0U2Nyb2xsTGJsLmdvVG9OdW0oMCwgMCk7XHJcbiAgICAgICAgdGhpcy5zZWxmQmV0U2Nyb2xsTGJsID0gR2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQodGhpcy5ub2RlLCBcImxhYmVsX3NlbGZcIiwgQmJ3elNjcm9sbExhYmVsKTtcclxuICAgICAgICB0aGlzLnNlbGZCZXRTY3JvbGxMYmwuZ29Ub051bSgwLCAwKTtcclxuICAgICAgICB0aGlzLnN0YXJQb3NOb2RlID0gdGhpcy5nZXRDaGlsZChcInN0YXJQb3NcIik7XHJcblxyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRQb2x5Z29uQnV0dG9uKHRoaXMuZ2V0Q29tcG9uZW50KFwiXCIsIGNjLlBvbHlnb25Db2xsaWRlcikpOyAgICAgICAgIC8vIOS4jeinhOWImeW9oueKtuinpuaRuOebkeWQrFxyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25BcmVhQ2xpY2ssIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOS4i+azqOWMuuWfn+eCueWHu1xyXG4gICAgcHJpdmF0ZSBvbkFyZWFDbGljayhldmVudFRhcmdldCkge1xyXG4gICAgICAgIGlmICghQmJ3ekRhdGEuaW5zdGFuY2UuaXNCZXRFbmFibGUoKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBuYW1lOiBzdHJpbmcgPSBldmVudFRhcmdldC5jdXJyZW50VGFyZ2V0Lm5hbWU7XHJcbiAgICAgICAgbGV0IGJldEFyZWFOYW1lID0gbmFtZS5yZXBsYWNlKFwiYmV0QXJlYV9cIiwgXCJcIik7XHJcbiAgICAgICAgbGV0IGNoaXBOdW06IG51bWJlciA9IEJid3pEYXRhLmluc3RhbmNlLmNoaXBMaXN0W0Jid3pEYXRhLmluc3RhbmNlLmN1cnJlbnRTZWxlY3RJbmRleF07XHJcbiAgICAgICAgbGV0IGJCZXQ6IGJvb2xlYW4gPSBCYnd6RGF0YS5pbnN0YW5jZS5yZXFCZXQoY2hpcE51bSwgYmV0QXJlYU5hbWUpO1xyXG4gICAgICAgIGlmIChiQmV0KVxyXG4gICAgICAgICAgICBCYnd6QmV0TWFuYWdlci5hZGRCZXRRdWV1ZShCYnd6Um9sZS5TZWxmLCBiZXRBcmVhTmFtZSwgY2hpcE51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNlbGZCZXQobnVtOiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuc2VsZkJldFNjcm9sbExibC5nb1RvTnVtKG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFRvdGFsQmV0KG51bTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLnRvdGFsQmV0U2Nyb2xsTGJsLmdvVG9OdW0obnVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDlh7vkuK3ljLrln5/pl6rng4HmlYjmnpxcclxuICAgIHB1YmxpYyBzaG93SGl0RWZmZWN0KCl7XHJcbiAgICAgICAgdGhpcy5mcmFtZU5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLmZyYW1lTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuZnJhbWVOb2RlLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgICAgbGV0IGFjdGlvbkFyciA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhYzEgPSBjYy5mYWRlT3V0KDAuNSk7XHJcbiAgICAgICAgICAgIGFjdGlvbkFyci5wdXNoKGFjMSk7XHJcbiAgICAgICAgICAgIGxldCBhYzIgPSBjYy5mYWRlSW4oMC41KTtcclxuICAgICAgICAgICAgYWN0aW9uQXJyLnB1c2goYWMyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYWN0aW9uQXJyLnB1c2goY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5mcmFtZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSwgdGhpcykpO1xyXG4gICAgICAgIHRoaXMuZnJhbWVOb2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhY3Rpb25BcnIpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmmbrlpJrmmJ/po57lnKjljLrln5/nmoTkuJbnlYzlnZDmoIdcclxuICAgIHB1YmxpYyBnZXRTdGFyU2V0UG9zKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhclBvc05vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLnN0YXJQb3NOb2RlLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzV2lzZXJCZXQoKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1dpc2VyQmV0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaXNXaXNlckJldChmbGFnIDogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2lzV2lzZXJCZXQgPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpe1xyXG4gICAgICAgIHRoaXMuaXNXaXNlckJldCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJhbWVOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnJhbWVOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy50b3RhbEJldFNjcm9sbExibC5nb1RvTnVtKDAsIDApO1xyXG4gICAgICAgIHRoaXMuc2VsZkJldFNjcm9sbExibC5nb1RvTnVtKDAsIDApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTdGFyUG9vbCBleHRlbmRzIEJid3pCYXNlUG9vbDxjYy5Ob2RlPntcclxuICAgIGNvbnN0cnVjdG9yKHJvb3Q6IGNjLk5vZGUsIHByaXZhdGUgY29weU5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIHN1cGVyKHJvb3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXQgcHJlQ291bnQoKXtcclxuICAgICAgICByZXR1cm4gMztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlSXRlbSgpe1xyXG4gICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5jb3B5Tm9kZSk7XHJcbiAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCByZXNldEl0ZW0obm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgbm9kZS5zZXRQYXJlbnQodGhpcy5yb290KTtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVHJlbmRWaWV3IGV4dGVuZHMgQmJ3ekJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSBsYXlvdXQ6IGNjLkxheW91dDtcclxuICAgIHByaXZhdGUgY29weVNwOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIGl0ZW1TcExpc3Q6IGNjLlNwcml0ZVtdID0gW107XHJcbiAgICBwcml2YXRlIHJhd1BvczogY2MuVmVjMjtcclxuICAgIHByaXZhdGUgZnVsbFBvczogY2MuVmVjMjtcclxuICAgIHByaXZhdGUgZnVsbENvdW50ID0gMTE7ICAgICAgICAgLy8g5aSa5LiA5Liq55So5Lul5a6e546w5paw5aKe5Yqo55S7XHJcbiAgICBwcml2YXRlIGN1clNob3dDb3VudCA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSwgcHJpdmF0ZSBrZXk6IHN0cmluZyl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQgPSB0aGlzLmdldENvbXBvbmVudChcImxheW91dFwiLCBjYy5MYXlvdXQpO1xyXG4gICAgICAgIHRoaXMuY29weVNwID0gdGhpcy5nZXRDb21wb25lbnQoXCJsYXlvdXQvaXRlbVwiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuY29weVNwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pdGVtU3BMaXN0LnB1c2godGhpcy5jb3B5U3ApO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5mdWxsQ291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmIChpID09IDApXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvcHlTcC5ub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQodGhpcy5sYXlvdXQubm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbVNwTGlzdC5wdXNoKG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJhd1BvcyA9IHRoaXMubGF5b3V0Lm5vZGUucG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5mdWxsUG9zID0gdGhpcy5yYXdQb3Muc3ViKGNjLnYyKHRoaXMuY29weVNwLm5vZGUud2lkdGggKyB0aGlzLmxheW91dC5zcGFjaW5nWCwgMCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRJdGVtRGF0YShhcnI6IGFueVtdLCBpc05ld09uZTogYm9vbGVhbil7XHJcbiAgICAgICAgaWYgKCFhcnIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA8PSAwKVxyXG4gICAgICAgICAgICB0aGlzLmNsZWFyQWxsKCk7XHJcbiAgICAgICAgaWYgKCFpc05ld09uZSl7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQWxsKGFycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gYXJyW2Fyci5sZW5ndGggLSAxXVtcImhpdFwiXTtcclxuICAgICAgICAgICAgaWYoIWRhdGEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0l0ZW0odGhpcy5jdXJTaG93Q291bnQsIGRhdGFbdGhpcy5rZXldLmhpdCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1clNob3dDb3VudCA9PSB0aGlzLmZ1bGxDb3VudCAtIDEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJTaG93Q291bnQgPSB0aGlzLmZ1bGxDb3VudCAtIDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEV4dHJhTmV3SXRlbUFuaW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJTaG93Q291bnQgKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVBbGwoYXJyOiBhbnlbXSl7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGUuc2V0UG9zaXRpb24odGhpcy5yYXdQb3MpO1xyXG4gICAgICAgIGxldCB0b3RhbCA9IGFyci5sZW5ndGg7XHJcbiAgICAgICAgbGV0IG1heFNob3dDb3VudCA9IHRoaXMuZnVsbENvdW50IC0gMTtcclxuICAgICAgICBsZXQgc2hvd0FyciA9IGFyci5zbGljZSh0b3RhbCA+IG1heFNob3dDb3VudCA/IHRvdGFsIC0gbWF4U2hvd0NvdW50IDogMCwgdG90YWwpO1xyXG4gICAgICAgIHRoaXMuaXRlbVNwTGlzdC5mb3JFYWNoKChpdGVtU3AsIGluZGV4KT0+e1xyXG4gICAgICAgICAgICBpZiAoc2hvd0FycltpbmRleF0pe1xyXG4gICAgICAgICAgICAgICAgbGV0IGhpdERhdGEgPSBzaG93QXJyW2luZGV4XVtcImhpdFwiXTtcclxuICAgICAgICAgICAgICAgIGlmIChoaXREYXRhICYmIGhpdERhdGFbdGhpcy5rZXldKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dJdGVtKGluZGV4LCBoaXREYXRhW3RoaXMua2V5XS5oaXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBpdGVtU3Aubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5jdXJTaG93Q291bnQgPSBzaG93QXJyLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dJdGVtKGluZGV4OiBudW1iZXIsIGhpdCl7XHJcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1TcExpc3RbaW5kZXhdKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IHN0ciA9IGhpdCA9PSAwID8gXCJiYnd6X2N1b1wiIDogXCJiYnd6X2R1aVwiO1xyXG4gICAgICAgIHRoaXMuaXRlbVNwTGlzdFtpbmRleF0ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZUF1dG9BdGxhcyhCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCx0aGlzLml0ZW1TcExpc3RbaW5kZXhdLCBCYnd6UGF0aEhlbHBlci5nYW1lVGV4dHVyZVBhdGggKyBcImF0bGFzL2R5bmFtaWMvYXRsYXNfZHluYW1pY1wiLCBzdHIsIG51bGwsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRkRXh0cmFOZXdJdGVtQW5pbSgpe1xyXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGUuc2V0UG9zaXRpb24odGhpcy5yYXdQb3MpO1xyXG4gICAgICAgIGxldCBtb3ZlQWN0ID0gY2MubW92ZVRvKDAuNSwgdGhpcy5mdWxsUG9zKS5lYXNpbmcoY2MuZWFzZUJhY2tPdXQoKSk7XHJcbiAgICAgICAgbGV0IGNhbGxGdW5jID0gY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW1TcExpc3Quc2hpZnQoKTtcclxuICAgICAgICAgICAgaXRlbS5ub2RlLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpO1xyXG4gICAgICAgICAgICBpdGVtLm5vZGUuc2V0UGFyZW50KHRoaXMubGF5b3V0Lm5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1TcExpc3QucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgaXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dC5ub2RlLnNldFBvc2l0aW9uKHRoaXMucmF3UG9zKTsgICAgICAvLyDmu5rliqjliqjnlLvlkI4sIOWwhuWOn+WFiOesrOS4gOS4quiKgueCueenu+iHs+acgOWQjlxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmxheW91dC5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShbbW92ZUFjdCwgY2FsbEZ1bmNdKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhckFsbCgpe1xyXG4gICAgICAgIHRoaXMuaXRlbVNwTGlzdC5mb3JFYWNoKHNwPT57XHJcbiAgICAgICAgICAgIHNwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmN1clNob3dDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMubGF5b3V0Lm5vZGUuc2V0UG9zaXRpb24odGhpcy5yYXdQb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpe1xyXG4gICAgICAgIHRoaXMuY2xlYXJBbGwoKTtcclxuICAgIH1cclxufSJdfQ==