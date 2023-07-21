"use strict";
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