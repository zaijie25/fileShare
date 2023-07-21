
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/manager/BbwzChipsManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd53983ZOTFIWZU8Mt+oIhjE', 'BbwzChipsManager');
// bbwz/Bbwz/scripts/manager/BbwzChipsManager.ts

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
var BbwzBasePool_1 = require("../tool/BbwzBasePool");
var BbwzChipItem_1 = require("../subview/BbwzChipItem");
var BbwzPathHelper_1 = require("../tool/BbwzPathHelper");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzData_1 = require("../data/BbwzData");
var BbwzChipsManager = /** @class */ (function () {
    function BbwzChipsManager(rootNode) {
        this.rootNode = rootNode;
        this.allChipsArr = [];
        this.betAreaNodeArr = []; // 筹码显示区域的节点 依托size生成包围盒 可拓展成组合图形
        /**
         * 庄家手上的筹码集合
         */
        this.bankChipList = [];
        /**
         * 返还给玩家的筹码集合
         */
        this.waitForBackChipList = [];
        //下注的来源
        this.allBetMap = {};
        if (!rootNode)
            TypeError("BbwzChipsManager.rootNode nil or undefined");
        var poolRoot = cc.find("poolNode", rootNode);
        if (!poolRoot)
            TypeError("BbwzChipsManager.poolRoot nil");
        this.poolHelper = new ChipViewPool(poolRoot);
        this.showNode = cc.find("showNode", rootNode);
        for (var i = 0; i < BbwzConstDefine_1.default.BET_AREA_NAME.length; i++) {
            var key = BbwzConstDefine_1.default.BET_AREA_NAME[i];
            this.betAreaNodeArr.push(cc.find("showArea_" + key, rootNode));
        }
        for (var key in BbwzData_1.default.instance.playerChipsFlyPos) {
            this.allBetMap[key] = [];
        }
    }
    BbwzChipsManager.prototype.clear = function () {
        this.showNode.stopAllActions();
        this.poolHelper.recycleAll(this.allChipsArr);
        this.allChipsArr = [];
        for (var key in this.allBetMap) {
            this.allBetMap[key] = [];
        }
        this.waitForBackChipList = [];
        this.bankChipList = [];
    };
    /**
     * 更新显示(断线重连或第一次进游戏 重置已下注筹码)
     */
    BbwzChipsManager.prototype.updateUI = function () {
        for (var key in BbwzData_1.default.instance.gameTableBetInfo) {
            var tableData = BbwzData_1.default.instance.gameTableBetInfo[key];
            var betAreaIndex = BbwzConstDefine_1.default.BET_AREA_NAME.indexOf(key);
            //恢复自己下注筹码
            this.addChipWithNum(BbwzConstDefine_1.BbwzRole.Self, betAreaIndex, tableData.selfBetNum);
            //恢复其他下注筹码
            var createChipNum = tableData.totalBetNum - tableData.selfBetNum;
            this.addChipWithNum(-1, betAreaIndex, createChipNum);
        }
    };
    /**
     * 下注区筹码添加(桌面恢复用)
     * @param playerIndex
     * @param betAreaIndex
     * @param money
     */
    BbwzChipsManager.prototype.addChipWithNum = function (playerIndex, betAreaIndex, money) {
        while (money > 0) {
            var item = this.poolHelper.getItem();
            this.allChipsArr.push(item);
            item.active = true;
            item.node.setParent(this.showNode);
            item.tryRight(money);
            item.playerIndex = playerIndex;
            money -= item.chipNumber;
            this.addBetChipInArea(item, betAreaIndex);
        }
    };
    /**
     * 一个玩家下注筹码的动画
     * @param playerIndex   下注玩家的Index
     * @param betAreaIndex  下注的区域Index
     * @param chipIndex     下注筹码的Index
     * @param chipNum       下注筹码的数值
     */
    BbwzChipsManager.prototype.flyChipAnim = function (playerIndex, betAreaIndex, chipNum) {
        //获取筹码并设置筹码
        var item = this.poolHelper.getItem();
        this.allChipsArr.push(item);
        item.active = true;
        item.node.setParent(this.showNode);
        item.setData(playerIndex, chipNum);
        item.betAreaIndex = betAreaIndex;
        item.randomRotate();
        //飞筹码
        var putAreaNode = this.betAreaNodeArr[betAreaIndex];
        if (!putAreaNode)
            return;
        var temPos = this.getChipRandomWorldPos(putAreaNode, item.node);
        var endPos = this.showNode.convertToNodeSpaceAR(temPos);
        var firePos = this.showNode.convertToNodeSpaceAR(BbwzData_1.default.instance.playerChipsFlyPos[playerIndex]);
        if (playerIndex == BbwzConstDefine_1.BbwzRole.Self && BbwzData_1.default.instance.selectChipWolrdPos[chipNum]) {
            //自己的筹码从筹码按钮处飞出
            firePos = this.showNode.convertToNodeSpaceAR(BbwzData_1.default.instance.selectChipWolrdPos[chipNum]);
        }
        item.betFlyAnim(firePos, endPos);
    };
    /**
     * 添加一个筹码到下注区域
     * @param item
     * @param betAreaIndex
     */
    BbwzChipsManager.prototype.addBetChipInArea = function (item, betAreaIndex) {
        item.randomRotate();
        if (this.betAreaNodeArr[betAreaIndex]) {
            var putAreaNode = this.betAreaNodeArr[betAreaIndex];
            var temPos = this.getChipRandomWorldPos(putAreaNode, item.node);
            var endPos = this.showNode.convertToNodeSpaceAR(temPos);
            item.node.setPosition(endPos);
            item.betAreaIndex = betAreaIndex;
        }
    };
    /**
     * 获取下注区随机坐标
     * @param areaNode
     * @param chipNode
     */
    BbwzChipsManager.prototype.getChipRandomWorldPos = function (areaNode, chipNode) {
        var limit = Math.max(chipNode.width, chipNode.height);
        var point = Global.Toolkit.getRectRandomInPoint(areaNode.position, areaNode.width - limit, areaNode.height - limit);
        return areaNode.parent.convertToWorldSpaceAR(point);
    };
    /**
     * 结算飞筹码
     */
    BbwzChipsManager.prototype.rewardFlyChips = function () {
        this.forBackChips();
    };
    /**
     * 播放返还筹码动画
     */
    BbwzChipsManager.prototype.forBackChips = function () {
        var _this = this;
        this.showNode.stopAllActions();
        var animTime = 0.4;
        var delayTime = cc.delayTime(animTime);
        var animTime2 = 0.4;
        var delayTime2 = cc.delayTime(animTime2);
        var delayTime3 = cc.delayTime(1.0);
        Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_CHIP_FLY, true); // debug 全场都不下注时 也会播这个声音 暂不处理
        //1.输掉的筹码返给荷官
        var fun1 = cc.callFunc(function () {
            _this.bankTogetherChips(animTime);
        });
        //2.荷官处飞筹码到赢的下注区域
        var fun2 = cc.callFunc(function () {
            _this.disperseChips(animTime2);
        });
        //3.所有筹码飞回给玩家(包括赢+和 的区域内的筹码)
        var fun3 = cc.callFunc(function () {
            _this.goBackPlayer();
        });
        var fun4 = cc.callFunc(function () {
            _this.clear();
        });
        var seq = cc.sequence(fun1, delayTime, fun2, delayTime2, fun3, delayTime3, fun4);
        this.showNode.runAction(seq);
    };
    /**
     * 聚合筹码到庄家
     * @param animTime
     */
    BbwzChipsManager.prototype.bankTogetherChips = function (animTime) {
        var _this = this;
        var betAreaWinIndexs = BbwzData_1.default.instance.betAreaWinIndexs;
        //清空庄家筹码引用
        this.bankChipList = [];
        //清空返还区筹码        
        this.waitForBackChipList = [];
        var bChip = false;
        this.allChipsArr.forEach(function (chipCom) {
            if (betAreaWinIndexs.indexOf(chipCom.betAreaIndex) >= 0) {
                //赢或和 区域内的筹码 放到待返还区
                _this.waitForBackChipList.push(chipCom);
            }
            else {
                //输的筹码飞给庄家
                chipCom.playItemMoveToBank(animTime, _this.showNode.convertToNodeSpaceAR(BbwzData_1.default.instance.playerChipsFlyPos[BbwzConstDefine_1.BbwzRole.Dealer]));
                //将输掉的筹码暂时放到庄家手上待庄家统一发放
                _this.bankChipList.push(chipCom);
                bChip = true;
            }
        });
        this.bankChipList.forEach(function (chipCom) {
            chipCom.node.setSiblingIndex(-1);
        });
        if (bChip) {
            //  Global.Audio.playBundleSound(BbwzConstDefine.GAME_ID,BbwzConstDefine.SOUND_CHIP_MOVE_1, true);
        }
    };
    /**
     * 将庄家的筹码放到待返还区,并计算分配方式（核心）
     * @param animTime
     */
    BbwzChipsManager.prototype.disperseChips = function (animTime) {
        var betAreaWinIndexs = BbwzData_1.default.instance.betAreaWinIndexs;
        var winPlayerData = BbwzData_1.default.instance.playerWinData;
        //将庄家缓存的筹码加入等待分配列表
        this.waitForBackChipList = this.waitForBackChipList.concat(this.bankChipList);
        //玩家剩余可拿筹码值
        var playerLeftMoneys = {};
        //计算数据并优先拿回自己的筹码已确保真实 
        for (var key in winPlayerData) {
            var playerIndex = parseInt(key);
            var data = winPlayerData[key];
            //计算玩家该拿回去的筹码值
            var moneyNum = 0;
            for (var key_1 in data.bet_win) {
                var betNum = data.bet_win[key_1];
                moneyNum += betNum;
            }
            //根据玩家筹码值拿回自己下注过的筹码已确保真实
            for (var index = 0; index < this.waitForBackChipList.length && moneyNum > 0; index++) {
                var item = this.waitForBackChipList[index];
                if (item == null)
                    continue;
                if (item.playerIndex == playerIndex) {
                    moneyNum -= item.chipNumber;
                    this.waitForBackChipList[index] = null;
                    this.allBetMap[playerIndex].push(item);
                }
            }
            //保存玩家剩余筹码值
            playerLeftMoneys[playerIndex] = moneyNum;
        }
        //如果不够开始从待返回区拿
        for (var key in winPlayerData) {
            var playerIndex = parseInt(key);
            var moneyNum = playerLeftMoneys[playerIndex] || 0;
            //限定可那筹码个数（避免数量太多会卡）
            var canGetCount = 20;
            //从筹码堆里拿取筹码,并将筹码数值设置为合适值来减少筹码数量
            while (moneyNum > 0 && canGetCount > 0 && this.waitForBackChipList.length > 0) {
                var item = this.waitForBackChipList.pop();
                if (item == null)
                    continue;
                if (moneyNum <= BbwzData_1.default.instance.chipList[BbwzData_1.default.instance.chipList.length - 1]) {
                    item.tryRight(moneyNum);
                }
                else {
                    item.tryBigest(moneyNum);
                }
                item.playerIndex = playerIndex;
                moneyNum -= item.chipNumber;
                this.allBetMap[playerIndex].push(item);
                --canGetCount;
            }
            //保存剩余
            playerLeftMoneys[playerIndex] = moneyNum;
        }
        //如果还是不够开始从庄家里补充筹码
        for (var key in winPlayerData) {
            var playerIndex = parseInt(key);
            var canGetCount = 20;
            var moneyNum = playerLeftMoneys[playerIndex] || 0;
            while (moneyNum > 0 && canGetCount > 0) {
                var item = this.poolHelper.getItem();
                this.allChipsArr.push(item);
                item.active = true;
                item.node.setParent(this.showNode);
                item.tryBigest(moneyNum);
                moneyNum -= item.chipNumber;
                item.playerIndex = playerIndex;
                this.allBetMap[playerIndex].push(item);
                //加入庄家返还列表
                this.bankChipList.push(item);
                item.node.setPosition(this.showNode.convertToNodeSpaceAR(BbwzData_1.default.instance.playerChipsFlyPos[BbwzConstDefine_1.BbwzRole.Dealer]));
                --canGetCount;
            }
        }
        //筹码没用完的全部返回给在线玩家
        while (this.waitForBackChipList.length > 0) {
            var item = this.waitForBackChipList.pop();
            if (item == null)
                continue;
            item.playerIndex = 1;
            this.allBetMap[1].push(item);
        }
        this.waitForBackChipList = [];
        var curAreaIndex = 0;
        var bChip = false;
        //将庄家筹码平均的飞到各个返还区
        for (var index = 0; index < this.bankChipList.length; index++) {
            var item = this.bankChipList[index];
            if (betAreaWinIndexs.length == 0) {
                //没有赢得区域，庄家通杀
                item.active = false;
                continue;
            }
            item.node.setSiblingIndex(-1);
            var areaIndex = betAreaWinIndexs[curAreaIndex];
            curAreaIndex++;
            if (curAreaIndex >= betAreaWinIndexs.length) {
                curAreaIndex = 0;
            }
            var putAreaNode = this.betAreaNodeArr[areaIndex];
            if (putAreaNode) {
                var temPos = this.getChipRandomWorldPos(putAreaNode, item.node);
                var endPos = this.showNode.convertToNodeSpaceAR(temPos);
                item.playItemMoveToArea(animTime, endPos);
                bChip = true;
            }
        }
        this.bankChipList = [];
        if (bChip) {
            //Global.Audio.playBundleSound(BbwzConstDefine.GAME_ID,BbwzConstDefine.SOUND_CHIP_MOVE_2, true);
        }
    };
    /**
     * 筹码飞回玩家头像
     */
    BbwzChipsManager.prototype.goBackPlayer = function () {
        var bChip = false;
        //将庄家筹码飞到该返还的玩家
        for (var key in this.allBetMap) {
            var forBackList = this.allBetMap[key];
            var endPos = this.showNode.convertToNodeSpaceAR(BbwzData_1.default.instance.playerChipsFlyPos[key]);
            var _loop_1 = function (index) {
                var item = forBackList[index];
                item.playOneChipAwardAnim(endPos, index, function () {
                    item.active = false;
                });
                bChip = true;
            };
            for (var index = 0; index < forBackList.length; index++) {
                _loop_1(index);
            }
            forBackList.length = 0;
        }
    };
    return BbwzChipsManager;
}());
exports.default = BbwzChipsManager;
var ChipViewPool = /** @class */ (function (_super) {
    __extends(ChipViewPool, _super);
    function ChipViewPool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ChipViewPool.prototype, "preCount", {
        get: function () {
            return 60;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChipViewPool.prototype, "everyCount", {
        get: function () {
            return 30;
        },
        enumerable: false,
        configurable: true
    });
    ChipViewPool.prototype.createItem = function () {
        var prefab = Global.ResourceManager.getBundleRes(BbwzConstDefine_1.default.GAME_ID, BbwzPathHelper_1.default.gamePrefabsPath + "panel/subView/coinView", cc.Prefab);
        var node = cc.instantiate(prefab);
        node.active = true;
        var item = new BbwzChipItem_1.default(node);
        return item;
    };
    ChipViewPool.prototype.resetItem = function (item) {
        item.reset();
        item.node.setParent(this.root);
        item.active = false;
    };
    return ChipViewPool;
}(BbwzBasePool_1.default));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcbWFuYWdlclxcQmJ3ekNoaXBzTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBZ0Q7QUFDaEQsd0RBQW1EO0FBQ25ELHlEQUFvRDtBQUNwRCwyREFBb0U7QUFDcEUsNkNBQXdDO0FBRXhDO0lBTUksMEJBQW9CLFFBQWlCO1FBQWpCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFKN0IsZ0JBQVcsR0FBbUIsRUFBRSxDQUFDO1FBRWpDLG1CQUFjLEdBQWMsRUFBRSxDQUFDLENBQUssaUNBQWlDO1FBbUs3RTs7V0FFRztRQUNLLGlCQUFZLEdBQW1CLEVBQUUsQ0FBQztRQUMxQzs7V0FFRztRQUNLLHdCQUFtQixHQUFtQixFQUFFLENBQUM7UUFDakQsT0FBTztRQUNDLGNBQVMsR0FBRyxFQUFFLENBQUM7UUF6S25CLElBQUksQ0FBQyxRQUFRO1lBQ1QsU0FBUyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7UUFDNUQsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVE7WUFDVCxTQUFTLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLHlCQUFlLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBQztZQUMxRCxJQUFJLEdBQUcsR0FBRyx5QkFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMs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QUFBRCxDQXJXQSxBQXFXQyxJQUFBOztBQUVEO0lBQTJCLGdDQUEwQjtJQUFyRDs7SUFzQkEsQ0FBQztJQXJCRyxzQkFBYyxrQ0FBUTthQUF0QjtZQUNJLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQzs7O09BQUE7SUFFRCxzQkFBYyxvQ0FBVTthQUF4QjtZQUNJLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQzs7O09BQUE7SUFFUyxpQ0FBVSxHQUFwQjtRQUNJLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLHlCQUFlLENBQUMsT0FBTyxFQUFDLHdCQUFjLENBQUMsZUFBZSxHQUFHLHdCQUF3QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvSSxJQUFJLElBQUksR0FBWSxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksSUFBSSxHQUFHLElBQUksc0JBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRVMsZ0NBQVMsR0FBbkIsVUFBb0IsSUFBa0I7UUFDbEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFDTCxtQkFBQztBQUFELENBdEJBLEFBc0JDLENBdEIwQixzQkFBWSxHQXNCdEMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmJ3ekJhc2VQb29sIGZyb20gXCIuLi90b29sL0Jid3pCYXNlUG9vbFwiO1xyXG5pbXBvcnQgQmJ3ekNoaXBJdGVtIGZyb20gXCIuLi9zdWJ2aWV3L0Jid3pDaGlwSXRlbVwiO1xyXG5pbXBvcnQgQmJ3elBhdGhIZWxwZXIgZnJvbSBcIi4uL3Rvb2wvQmJ3elBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IEJid3pDb25zdERlZmluZSwgeyBCYnd6Um9sZSB9IGZyb20gXCIuLi9kYXRhL0Jid3pDb25zdERlZmluZVwiO1xyXG5pbXBvcnQgQmJ3ekRhdGEgZnJvbSBcIi4uL2RhdGEvQmJ3ekRhdGFcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJid3pDaGlwc01hbmFnZXJ7XHJcbiAgICBwcml2YXRlIHBvb2xIZWxwZXI6IENoaXBWaWV3UG9vbDtcclxuICAgIHByaXZhdGUgYWxsQ2hpcHNBcnI6IEJid3pDaGlwSXRlbVtdID0gW107XHJcbiAgICBwcml2YXRlIHNob3dOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBiZXRBcmVhTm9kZUFycjogY2MuTm9kZVtdID0gW107ICAgICAvLyDnrbnnoIHmmL7npLrljLrln5/nmoToioLngrkg5L6d5omYc2l6ZeeUn+aIkOWMheWbtOebkiDlj6/mi5PlsZXmiJDnu4TlkIjlm77lvaJcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvb3ROb2RlOiBjYy5Ob2RlKXtcclxuICAgICAgICBpZiAoIXJvb3ROb2RlKVxyXG4gICAgICAgICAgICBUeXBlRXJyb3IoXCJCYnd6Q2hpcHNNYW5hZ2VyLnJvb3ROb2RlIG5pbCBvciB1bmRlZmluZWRcIik7XHJcbiAgICAgICAgbGV0IHBvb2xSb290ID0gY2MuZmluZChcInBvb2xOb2RlXCIsIHJvb3ROb2RlKTtcclxuICAgICAgICBpZiAoIXBvb2xSb290KVxyXG4gICAgICAgICAgICBUeXBlRXJyb3IoXCJCYnd6Q2hpcHNNYW5hZ2VyLnBvb2xSb290IG5pbFwiKTtcclxuICAgICAgICB0aGlzLnBvb2xIZWxwZXIgPSBuZXcgQ2hpcFZpZXdQb29sKHBvb2xSb290KTtcclxuICAgICAgICB0aGlzLnNob3dOb2RlID0gY2MuZmluZChcInNob3dOb2RlXCIsIHJvb3ROb2RlKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEJid3pDb25zdERlZmluZS5CRVRfQVJFQV9OQU1FLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGtleSA9IEJid3pDb25zdERlZmluZS5CRVRfQVJFQV9OQU1FW2ldO1xyXG4gICAgICAgICAgICB0aGlzLmJldEFyZWFOb2RlQXJyLnB1c2goY2MuZmluZChgc2hvd0FyZWFfJHtrZXl9YCwgcm9vdE5vZGUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIEJid3pEYXRhLmluc3RhbmNlLnBsYXllckNoaXBzRmx5UG9zKXtcclxuICAgICAgICAgICAgdGhpcy5hbGxCZXRNYXBba2V5XSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKXtcclxuICAgICAgICB0aGlzLnNob3dOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5wb29sSGVscGVyLnJlY3ljbGVBbGwodGhpcy5hbGxDaGlwc0Fycik7XHJcbiAgICAgICAgdGhpcy5hbGxDaGlwc0FyciA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLmFsbEJldE1hcCl7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsQmV0TWFwW2tleV0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53YWl0Rm9yQmFja0NoaXBMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5iYW5rQ2hpcExpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOaYvuekuijmlq3nur/ph43ov57miJbnrKzkuIDmrKHov5vmuLjmiI8g6YeN572u5bey5LiL5rOo562556CBKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlVUkoKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gQmJ3ekRhdGEuaW5zdGFuY2UuZ2FtZVRhYmxlQmV0SW5mbykge1xyXG4gICAgICAgICAgICBsZXQgdGFibGVEYXRhID0gQmJ3ekRhdGEuaW5zdGFuY2UuZ2FtZVRhYmxlQmV0SW5mb1trZXldO1xyXG4gICAgICAgICAgICBsZXQgYmV0QXJlYUluZGV4ID0gQmJ3ekNvbnN0RGVmaW5lLkJFVF9BUkVBX05BTUUuaW5kZXhPZihrZXkpO1xyXG4gICAgICAgICAgICAvL+aBouWkjeiHquW3seS4i+azqOetueeggVxyXG4gICAgICAgICAgICB0aGlzLmFkZENoaXBXaXRoTnVtKEJid3pSb2xlLlNlbGYsIGJldEFyZWFJbmRleCwgdGFibGVEYXRhLnNlbGZCZXROdW0pO1xyXG4gICAgICAgICAgICAvL+aBouWkjeWFtuS7luS4i+azqOetueeggVxyXG4gICAgICAgICAgICBsZXQgY3JlYXRlQ2hpcE51bSA9IHRhYmxlRGF0YS50b3RhbEJldE51bSAtIHRhYmxlRGF0YS5zZWxmQmV0TnVtO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaXBXaXRoTnVtKC0xLCBiZXRBcmVhSW5kZXgsIGNyZWF0ZUNoaXBOdW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4i+azqOWMuuetueeggea3u+WKoCjmoYzpnaLmgaLlpI3nlKgpXHJcbiAgICAgKiBAcGFyYW0gcGxheWVySW5kZXggXHJcbiAgICAgKiBAcGFyYW0gYmV0QXJlYUluZGV4IFxyXG4gICAgICogQHBhcmFtIG1vbmV5IFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZENoaXBXaXRoTnVtKHBsYXllckluZGV4OiBudW1iZXIsIGJldEFyZWFJbmRleDogbnVtYmVyLCBtb25leTogbnVtYmVyKSB7XHJcbiAgICAgICAgd2hpbGUgKG1vbmV5ID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMucG9vbEhlbHBlci5nZXRJdGVtKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsQ2hpcHNBcnIucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpdGVtLm5vZGUuc2V0UGFyZW50KHRoaXMuc2hvd05vZGUpO1xyXG4gICAgICAgICAgICBpdGVtLnRyeVJpZ2h0KG1vbmV5KTtcclxuICAgICAgICAgICAgaXRlbS5wbGF5ZXJJbmRleCA9IHBsYXllckluZGV4O1xyXG4gICAgICAgICAgICBtb25leSAtPSBpdGVtLmNoaXBOdW1iZXI7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQmV0Q2hpcEluQXJlYShpdGVtLCBiZXRBcmVhSW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4gOS4queOqeWutuS4i+azqOetueeggeeahOWKqOeUu1xyXG4gICAgICogQHBhcmFtIHBsYXllckluZGV4ICAg5LiL5rOo546p5a6255qESW5kZXhcclxuICAgICAqIEBwYXJhbSBiZXRBcmVhSW5kZXggIOS4i+azqOeahOWMuuWfn0luZGV4XHJcbiAgICAgKiBAcGFyYW0gY2hpcEluZGV4ICAgICDkuIvms6jnrbnnoIHnmoRJbmRleFxyXG4gICAgICogQHBhcmFtIGNoaXBOdW0gICAgICAg5LiL5rOo562556CB55qE5pWw5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmbHlDaGlwQW5pbShwbGF5ZXJJbmRleDogbnVtYmVyLCBiZXRBcmVhSW5kZXg6IG51bWJlciwgY2hpcE51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgLy/ojrflj5bnrbnnoIHlubborr7nva7nrbnnoIFcclxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMucG9vbEhlbHBlci5nZXRJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5hbGxDaGlwc0Fyci5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBpdGVtLm5vZGUuc2V0UGFyZW50KHRoaXMuc2hvd05vZGUpO1xyXG4gICAgICAgIGl0ZW0uc2V0RGF0YShwbGF5ZXJJbmRleCwgY2hpcE51bSk7XHJcbiAgICAgICAgaXRlbS5iZXRBcmVhSW5kZXggPSBiZXRBcmVhSW5kZXg7XHJcbiAgICAgICAgaXRlbS5yYW5kb21Sb3RhdGUoKTtcclxuXHJcbiAgICAgICAgLy/po57nrbnnoIFcclxuICAgICAgICBsZXQgcHV0QXJlYU5vZGU6IGNjLk5vZGUgPSB0aGlzLmJldEFyZWFOb2RlQXJyW2JldEFyZWFJbmRleF07XHJcbiAgICAgICAgaWYgKCFwdXRBcmVhTm9kZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCB0ZW1Qb3MgPSB0aGlzLmdldENoaXBSYW5kb21Xb3JsZFBvcyhwdXRBcmVhTm9kZSwgaXRlbS5ub2RlKTtcclxuICAgICAgICBsZXQgZW5kUG9zID0gdGhpcy5zaG93Tm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0ZW1Qb3MpO1xyXG4gICAgICAgIGxldCBmaXJlUG9zID0gdGhpcy5zaG93Tm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihCYnd6RGF0YS5pbnN0YW5jZS5wbGF5ZXJDaGlwc0ZseVBvc1twbGF5ZXJJbmRleF0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHBsYXllckluZGV4ID09IEJid3pSb2xlLlNlbGYgJiYgQmJ3ekRhdGEuaW5zdGFuY2Uuc2VsZWN0Q2hpcFdvbHJkUG9zW2NoaXBOdW1dKXtcclxuICAgICAgICAgICAgLy/oh6rlt7HnmoTnrbnnoIHku47nrbnnoIHmjInpkq7lpITpo57lh7pcclxuICAgICAgICAgICAgZmlyZVBvcyA9IHRoaXMuc2hvd05vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoQmJ3ekRhdGEuaW5zdGFuY2Uuc2VsZWN0Q2hpcFdvbHJkUG9zW2NoaXBOdW1dKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5iZXRGbHlBbmltKGZpcmVQb3MsIGVuZFBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDkuIDkuKrnrbnnoIHliLDkuIvms6jljLrln59cclxuICAgICAqIEBwYXJhbSBpdGVtIFxyXG4gICAgICogQHBhcmFtIGJldEFyZWFJbmRleCBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRCZXRDaGlwSW5BcmVhKGl0ZW06IEJid3pDaGlwSXRlbSwgYmV0QXJlYUluZGV4PzogbnVtYmVyKSB7XHJcbiAgICAgICAgaXRlbS5yYW5kb21Sb3RhdGUoKTtcclxuICAgICAgICBpZiAodGhpcy5iZXRBcmVhTm9kZUFycltiZXRBcmVhSW5kZXhdKSB7XHJcbiAgICAgICAgICAgIGxldCBwdXRBcmVhTm9kZSA9IHRoaXMuYmV0QXJlYU5vZGVBcnJbYmV0QXJlYUluZGV4XTtcclxuICAgICAgICAgICAgbGV0IHRlbVBvcyA9IHRoaXMuZ2V0Q2hpcFJhbmRvbVdvcmxkUG9zKHB1dEFyZWFOb2RlLCBpdGVtLm5vZGUpO1xyXG4gICAgICAgICAgICBsZXQgZW5kUG9zID0gdGhpcy5zaG93Tm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0ZW1Qb3MpO1xyXG4gICAgICAgICAgICBpdGVtLm5vZGUuc2V0UG9zaXRpb24oZW5kUG9zKTtcclxuICAgICAgICAgICAgaXRlbS5iZXRBcmVhSW5kZXggPSBiZXRBcmVhSW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5LiL5rOo5Yy66ZqP5py65Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gYXJlYU5vZGUgXHJcbiAgICAgKiBAcGFyYW0gY2hpcE5vZGUgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q2hpcFJhbmRvbVdvcmxkUG9zKGFyZWFOb2RlOiBjYy5Ob2RlLCBjaGlwTm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCBsaW1pdCA9IE1hdGgubWF4KGNoaXBOb2RlLndpZHRoLCBjaGlwTm9kZS5oZWlnaHQpO1xyXG4gICAgICAgIGxldCBwb2ludCA9IEdsb2JhbC5Ub29sa2l0LmdldFJlY3RSYW5kb21JblBvaW50KGFyZWFOb2RlLnBvc2l0aW9uLCBhcmVhTm9kZS53aWR0aCAtIGxpbWl0LCBhcmVhTm9kZS5oZWlnaHQgLSBsaW1pdCk7XHJcbiAgICAgICAgcmV0dXJuIGFyZWFOb2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uT566X6aOe562556CBXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZXdhcmRGbHlDaGlwcygpIHtcclxuICAgICAgICB0aGlzLmZvckJhY2tDaGlwcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+6L+U6L+Y562556CB5Yqo55S7XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZm9yQmFja0NoaXBzKCkge1xyXG4gICAgICAgIHRoaXMuc2hvd05vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuXHJcbiAgICAgICAgbGV0IGFuaW1UaW1lID0gMC40O1xyXG4gICAgICAgIGxldCBkZWxheVRpbWUgPSBjYy5kZWxheVRpbWUoYW5pbVRpbWUpO1xyXG5cclxuICAgICAgICBsZXQgYW5pbVRpbWUyID0gMC40O1xyXG4gICAgICAgIGxldCBkZWxheVRpbWUyID0gY2MuZGVsYXlUaW1lKGFuaW1UaW1lMik7XHJcblxyXG4gICAgICAgIGxldCBkZWxheVRpbWUzID0gY2MuZGVsYXlUaW1lKDEuMCk7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdW5kbGVTb3VuZChCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCxCYnd6Q29uc3REZWZpbmUuU09VTkRfQ0hJUF9GTFksIHRydWUpOyAgICAgICAvLyBkZWJ1ZyDlhajlnLrpg73kuI3kuIvms6jml7Yg5Lmf5Lya5pKt6L+Z5Liq5aOw6Z+zIOaaguS4jeWkhOeQhlxyXG4gICAgICAgIC8vMS7ovpPmjonnmoTnrbnnoIHov5Tnu5nojbflrphcclxuICAgICAgICBsZXQgZnVuMSA9IGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuYmFua1RvZ2V0aGVyQ2hpcHMoYW5pbVRpbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vMi7ojbflrpjlpITpo57nrbnnoIHliLDotaLnmoTkuIvms6jljLrln59cclxuICAgICAgICBsZXQgZnVuMiA9IGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGVyc2VDaGlwcyhhbmltVGltZTIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vMy7miYDmnInnrbnnoIHpo57lm57nu5nnjqnlrrYo5YyF5ous6LWiK+WSjCDnmoTljLrln5/lhoXnmoTnrbnnoIEpXHJcbiAgICAgICAgbGV0IGZ1bjMgPSBjYy5jYWxsRnVuYygoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmdvQmFja1BsYXllcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBmdW40ID0gY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzZXEgPSBjYy5zZXF1ZW5jZShmdW4xLCBkZWxheVRpbWUsIGZ1bjIsIGRlbGF5VGltZTIsIGZ1bjMsIGRlbGF5VGltZTMsIGZ1bjQpO1xyXG4gICAgICAgIHRoaXMuc2hvd05vZGUucnVuQWN0aW9uKHNlcSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDluoTlrrbmiYvkuIrnmoTnrbnnoIHpm4blkIhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBiYW5rQ2hpcExpc3Q6IEJid3pDaGlwSXRlbVtdID0gW107XHJcbiAgICAvKipcclxuICAgICAqIOi/lOi/mOe7meeOqeWutueahOetueeggembhuWQiFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHdhaXRGb3JCYWNrQ2hpcExpc3Q6IEJid3pDaGlwSXRlbVtdID0gW107XHJcbiAgICAvL+S4i+azqOeahOadpea6kFxyXG4gICAgcHJpdmF0ZSBhbGxCZXRNYXAgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiBmuWQiOetueeggeWIsOW6hOWutlxyXG4gICAgICogQHBhcmFtIGFuaW1UaW1lIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGJhbmtUb2dldGhlckNoaXBzKGFuaW1UaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgYmV0QXJlYVdpbkluZGV4cyA9IEJid3pEYXRhLmluc3RhbmNlLmJldEFyZWFXaW5JbmRleHM7XHJcblxyXG4gICAgICAgIC8v5riF56m65bqE5a62562556CB5byV55SoXHJcbiAgICAgICAgdGhpcy5iYW5rQ2hpcExpc3QgPSBbXTtcclxuICAgICAgICAvL+a4heepuui/lOi/mOWMuuetueeggSAgICAgICAgXHJcbiAgICAgICAgdGhpcy53YWl0Rm9yQmFja0NoaXBMaXN0ID0gW107XHJcblxyXG4gICAgICAgIGxldCBiQ2hpcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmFsbENoaXBzQXJyLmZvckVhY2goY2hpcENvbSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChiZXRBcmVhV2luSW5kZXhzLmluZGV4T2YoY2hpcENvbS5iZXRBcmVhSW5kZXgpID49IDApIHtcclxuICAgICAgICAgICAgICAgIC8v6LWi5oiW5ZKMIOWMuuWfn+WGheeahOetueeggSDmlL7liLDlvoXov5Tov5jljLpcclxuICAgICAgICAgICAgICAgIHRoaXMud2FpdEZvckJhY2tDaGlwTGlzdC5wdXNoKGNoaXBDb20pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy/ovpPnmoTnrbnnoIHpo57nu5nluoTlrrZcclxuICAgICAgICAgICAgICAgIGNoaXBDb20ucGxheUl0ZW1Nb3ZlVG9CYW5rKGFuaW1UaW1lLCB0aGlzLnNob3dOb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKEJid3pEYXRhLmluc3RhbmNlLnBsYXllckNoaXBzRmx5UG9zW0Jid3pSb2xlLkRlYWxlcl0pKTtcclxuICAgICAgICAgICAgICAgIC8v5bCG6L6T5o6J55qE562556CB5pqC5pe25pS+5Yiw5bqE5a625omL5LiK5b6F5bqE5a6257uf5LiA5Y+R5pS+XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhbmtDaGlwTGlzdC5wdXNoKGNoaXBDb20pO1xyXG5cclxuICAgICAgICAgICAgICAgIGJDaGlwID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYmFua0NoaXBMaXN0LmZvckVhY2goY2hpcENvbSA9PiB7XHJcbiAgICAgICAgICAgIGNoaXBDb20ubm9kZS5zZXRTaWJsaW5nSW5kZXgoLTEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChiQ2hpcCkge1xyXG4gICAgICAgICAgICAvLyAgR2xvYmFsLkF1ZGlvLnBsYXlCdW5kbGVTb3VuZChCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCxCYnd6Q29uc3REZWZpbmUuU09VTkRfQ0hJUF9NT1ZFXzEsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwhuW6hOWutueahOetueeggeaUvuWIsOW+hei/lOi/mOWMuizlubborqHnrpfliIbphY3mlrnlvI/vvIjmoLjlv4PvvIlcclxuICAgICAqIEBwYXJhbSBhbmltVGltZSBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkaXNwZXJzZUNoaXBzKGFuaW1UaW1lOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgYmV0QXJlYVdpbkluZGV4cyA9IEJid3pEYXRhLmluc3RhbmNlLmJldEFyZWFXaW5JbmRleHM7XHJcbiAgICAgICAgbGV0IHdpblBsYXllckRhdGEgPSBCYnd6RGF0YS5pbnN0YW5jZS5wbGF5ZXJXaW5EYXRhO1xyXG4gICAgICAgIC8v5bCG5bqE5a6257yT5a2Y55qE562556CB5Yqg5YWl562J5b6F5YiG6YWN5YiX6KGoXHJcbiAgICAgICAgdGhpcy53YWl0Rm9yQmFja0NoaXBMaXN0ID0gdGhpcy53YWl0Rm9yQmFja0NoaXBMaXN0LmNvbmNhdCh0aGlzLmJhbmtDaGlwTGlzdCk7XHJcbiAgICAgICAgLy/njqnlrrbliankvZnlj6/mi7/nrbnnoIHlgLxcclxuICAgICAgICBsZXQgcGxheWVyTGVmdE1vbmV5cyA9IHt9O1xyXG4gICAgICAgIC8v6K6h566X5pWw5o2u5bm25LyY5YWI5ou/5Zue6Ieq5bex55qE562556CB5bey56Gu5L+d55yf5a6eIFxyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHdpblBsYXllckRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IHBsYXllckluZGV4ID0gcGFyc2VJbnQoa2V5KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gd2luUGxheWVyRGF0YVtrZXldO1xyXG4gICAgICAgICAgICAvL+iuoeeul+eOqeWutuivpeaLv+WbnuWOu+eahOetueeggeWAvFxyXG4gICAgICAgICAgICBsZXQgbW9uZXlOdW06IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEuYmV0X3dpbikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmV0TnVtID0gZGF0YS5iZXRfd2luW2tleV07XHJcbiAgICAgICAgICAgICAgICBtb25leU51bSArPSBiZXROdW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/moLnmja7njqnlrrbnrbnnoIHlgLzmi7/lm57oh6rlt7HkuIvms6jov4fnmoTnrbnnoIHlt7Lnoa7kv53nnJ/lrp5cclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMud2FpdEZvckJhY2tDaGlwTGlzdC5sZW5ndGggJiYgbW9uZXlOdW0gPiAwOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy53YWl0Rm9yQmFja0NoaXBMaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtID09IG51bGwpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ucGxheWVySW5kZXggPT0gcGxheWVySW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb25leU51bSAtPSBpdGVtLmNoaXBOdW1iZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0Rm9yQmFja0NoaXBMaXN0W2luZGV4XSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxCZXRNYXBbcGxheWVySW5kZXhdLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/kv53lrZjnjqnlrrbliankvZnnrbnnoIHlgLxcclxuICAgICAgICAgICAgcGxheWVyTGVmdE1vbmV5c1twbGF5ZXJJbmRleF0gPSBtb25leU51bTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5aaC5p6c5LiN5aSf5byA5aeL5LuO5b6F6L+U5Zue5Yy65ou/XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gd2luUGxheWVyRGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgcGxheWVySW5kZXggPSBwYXJzZUludChrZXkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1vbmV5TnVtOiBudW1iZXIgPSBwbGF5ZXJMZWZ0TW9uZXlzW3BsYXllckluZGV4XSB8fCAwO1xyXG4gICAgICAgICAgICAvL+mZkOWumuWPr+mCo+etueeggeS4quaVsO+8iOmBv+WFjeaVsOmHj+WkquWkmuS8muWNoe+8iVxyXG4gICAgICAgICAgICBsZXQgY2FuR2V0Q291bnQgPSAyMDtcclxuICAgICAgICAgICAgLy/ku47nrbnnoIHloIbph4zmi7/lj5bnrbnnoIEs5bm25bCG562556CB5pWw5YC86K6+572u5Li65ZCI6YCC5YC85p2l5YeP5bCR562556CB5pWw6YePXHJcbiAgICAgICAgICAgIHdoaWxlIChtb25leU51bSA+IDAgJiYgY2FuR2V0Q291bnQgPiAwICYmIHRoaXMud2FpdEZvckJhY2tDaGlwTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMud2FpdEZvckJhY2tDaGlwTGlzdC5wb3AoKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtID09IG51bGwpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbmV5TnVtIDw9IEJid3pEYXRhLmluc3RhbmNlLmNoaXBMaXN0W0Jid3pEYXRhLmluc3RhbmNlLmNoaXBMaXN0Lmxlbmd0aCAtIDFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS50cnlSaWdodChtb25leU51bSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udHJ5QmlnZXN0KG1vbmV5TnVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGl0ZW0ucGxheWVySW5kZXggPSBwbGF5ZXJJbmRleDtcclxuICAgICAgICAgICAgICAgIG1vbmV5TnVtIC09IGl0ZW0uY2hpcE51bWJlcjtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbEJldE1hcFtwbGF5ZXJJbmRleF0ucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIC0tY2FuR2V0Q291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/kv53lrZjliankvZlcclxuICAgICAgICAgICAgcGxheWVyTGVmdE1vbmV5c1twbGF5ZXJJbmRleF0gPSBtb25leU51bTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5aaC5p6c6L+Y5piv5LiN5aSf5byA5aeL5LuO5bqE5a626YeM6KGl5YWF562556CBXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gd2luUGxheWVyRGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgcGxheWVySW5kZXggPSBwYXJzZUludChrZXkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNhbkdldENvdW50ID0gMjA7XHJcbiAgICAgICAgICAgIGxldCBtb25leU51bTogbnVtYmVyID0gcGxheWVyTGVmdE1vbmV5c1twbGF5ZXJJbmRleF0gfHwgMDtcclxuXHJcbiAgICAgICAgICAgIHdoaWxlIChtb25leU51bSA+IDAgJiYgY2FuR2V0Q291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMucG9vbEhlbHBlci5nZXRJdGVtKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbENoaXBzQXJyLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm5vZGUuc2V0UGFyZW50KHRoaXMuc2hvd05vZGUpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS50cnlCaWdlc3QobW9uZXlOdW0pO1xyXG4gICAgICAgICAgICAgICAgbW9uZXlOdW0gLT0gaXRlbS5jaGlwTnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5wbGF5ZXJJbmRleCA9IHBsYXllckluZGV4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxCZXRNYXBbcGxheWVySW5kZXhdLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAvL+WKoOWFpeW6hOWutui/lOi/mOWIl+ihqFxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYW5rQ2hpcExpc3QucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubm9kZS5zZXRQb3NpdGlvbih0aGlzLnNob3dOb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKEJid3pEYXRhLmluc3RhbmNlLnBsYXllckNoaXBzRmx5UG9zW0Jid3pSb2xlLkRlYWxlcl0pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAtLWNhbkdldENvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v562556CB5rKh55So5a6M55qE5YWo6YOo6L+U5Zue57uZ5Zyo57q/546p5a62XHJcbiAgICAgICAgd2hpbGUgKHRoaXMud2FpdEZvckJhY2tDaGlwTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy53YWl0Rm9yQmFja0NoaXBMaXN0LnBvcCgpO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSA9PSBudWxsKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaXRlbS5wbGF5ZXJJbmRleCA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsQmV0TWFwWzFdLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud2FpdEZvckJhY2tDaGlwTGlzdCA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgY3VyQXJlYUluZGV4ID0gMDtcclxuICAgICAgICBsZXQgYkNoaXA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvL+WwhuW6hOWutuetueeggeW5s+Wdh+eahOmjnuWIsOWQhOS4qui/lOi/mOWMulxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLmJhbmtDaGlwTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuYmFua0NoaXBMaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKGJldEFyZWFXaW5JbmRleHMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgIC8v5rKh5pyJ6LWi5b6X5Yy65Z+f77yM5bqE5a626YCa5p2AXHJcbiAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXRlbS5ub2RlLnNldFNpYmxpbmdJbmRleCgtMSk7XHJcbiAgICAgICAgICAgIGxldCBhcmVhSW5kZXggPSBiZXRBcmVhV2luSW5kZXhzW2N1ckFyZWFJbmRleF07XHJcbiAgICAgICAgICAgIGN1ckFyZWFJbmRleCsrO1xyXG4gICAgICAgICAgICBpZiAoY3VyQXJlYUluZGV4ID49IGJldEFyZWFXaW5JbmRleHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJBcmVhSW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBwdXRBcmVhTm9kZTogY2MuTm9kZSA9IHRoaXMuYmV0QXJlYU5vZGVBcnJbYXJlYUluZGV4XTtcclxuICAgICAgICAgICAgaWYgKHB1dEFyZWFOb2RlKXtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1Qb3MgPSB0aGlzLmdldENoaXBSYW5kb21Xb3JsZFBvcyhwdXRBcmVhTm9kZSwgaXRlbS5ub2RlKTtcclxuICAgICAgICAgICAgICAgIGxldCBlbmRQb3MgPSB0aGlzLnNob3dOb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRlbVBvcyk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnBsYXlJdGVtTW92ZVRvQXJlYShhbmltVGltZSwgZW5kUG9zKTtcclxuICAgICAgICAgICAgICAgIGJDaGlwID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJhbmtDaGlwTGlzdCA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoYkNoaXApIHtcclxuICAgICAgICAgICAgLy9HbG9iYWwuQXVkaW8ucGxheUJ1bmRsZVNvdW5kKEJid3pDb25zdERlZmluZS5HQU1FX0lELEJid3pDb25zdERlZmluZS5TT1VORF9DSElQX01PVkVfMiwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog562556CB6aOe5Zue546p5a625aS05YOPXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ29CYWNrUGxheWVyKCkge1xyXG4gICAgICAgIGxldCBiQ2hpcDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIC8v5bCG5bqE5a62562556CB6aOe5Yiw6K+l6L+U6L+Y55qE546p5a62XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuYWxsQmV0TWFwKXtcclxuICAgICAgICAgICAgY29uc3QgZm9yQmFja0xpc3Q6IEJid3pDaGlwSXRlbVtdID0gdGhpcy5hbGxCZXRNYXBba2V5XTtcclxuICAgICAgICAgICAgbGV0IGVuZFBvcyA9IHRoaXMuc2hvd05vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoQmJ3ekRhdGEuaW5zdGFuY2UucGxheWVyQ2hpcHNGbHlQb3Nba2V5XSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBmb3JCYWNrTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBmb3JCYWNrTGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpdGVtLnBsYXlPbmVDaGlwQXdhcmRBbmltKGVuZFBvcywgaW5kZXgsICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYkNoaXAgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvckJhY2tMaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDaGlwVmlld1Bvb2wgZXh0ZW5kcyBCYnd6QmFzZVBvb2w8QmJ3ekNoaXBJdGVtPntcclxuICAgIHByb3RlY3RlZCBnZXQgcHJlQ291bnQoKXtcclxuICAgICAgICByZXR1cm4gNjA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldCBldmVyeUNvdW50KCl7XHJcbiAgICAgICAgcmV0dXJuIDMwO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjcmVhdGVJdGVtKCl7XHJcbiAgICAgICAgbGV0IHByZWZhYiA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0QnVuZGxlUmVzKEJid3pDb25zdERlZmluZS5HQU1FX0lELEJid3pQYXRoSGVscGVyLmdhbWVQcmVmYWJzUGF0aCArIFwicGFuZWwvc3ViVmlldy9jb2luVmlld1wiLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFiKTtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBuZXcgQmJ3ekNoaXBJdGVtKG5vZGUpO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCByZXNldEl0ZW0oaXRlbTogQmJ3ekNoaXBJdGVtKXtcclxuICAgICAgICBpdGVtLnJlc2V0KCk7XHJcbiAgICAgICAgaXRlbS5ub2RlLnNldFBhcmVudCh0aGlzLnJvb3QpO1xyXG4gICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=