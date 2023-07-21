"use strict";
cc._RF.push(module, 'dc91ezu9jNFBamzZ3aW7DFN', 'BbwzBetManager');
// bbwz/Bbwz/scripts/manager/BbwzBetManager.ts

"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueItem = void 0;
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzCircularQueue_1 = require("../tool/BbwzCircularQueue");
var BbwzBetManager = /** @class */ (function () {
    function BbwzBetManager() {
    }
    /**
     * 其他玩家下注时的飞筹码计算
     */
    BbwzBetManager.getSendCount = function (queueLength) {
        var len = Global.Toolkit.getRoundInteger(4, 1);
        if (queueLength <= len)
            return queueLength;
        var count = Global.Toolkit.getRoundInteger(queueLength / 2 + 1);
        return count;
    };
    /**
     * 清理下注队列
     * @param seat 指定座位, 传空全部清理
     */
    BbwzBetManager.clearBetQueue = function (seat) {
        if (seat && this.playerQueue[seat]) {
            var queue = this.playerQueue[seat];
            queue.clear();
        }
        else {
            for (var key in this.playerQueue) {
                var queue = this.playerQueue[key];
                queue.clear();
            }
        }
    };
    /**
     * 添加一条下注行为到队列
     * @param seat 座位
     * @param areaName 下注区域名
     * @param betNum 下注金额
     */
    BbwzBetManager.addBetQueue = function (seat, areaName, betNum) {
        var circleQueue = this.playerQueue[seat];
        if (circleQueue) {
            var queuItem = new QueueItem(areaName, betNum);
            circleQueue.enQueue(queuItem);
        }
    };
    /**
     * 获取一个座位下注队列
     * @param seat 座位
     */
    BbwzBetManager.getOneRoleBetQueue = function (seat) {
        var circleQueue = this.playerQueue[seat];
        if (circleQueue)
            return circleQueue;
    };
    /**
     * 某个座位下注行为队列出列一条
     * 下注数据shift更新频繁, 采用循环队列 减少开销
     * @param seat 座位
     */
    BbwzBetManager.shiftOneRoleBetQueue = function (seat) {
        var circleQueue = this.playerQueue[seat];
        if (circleQueue) {
            var queueItem = circleQueue.front();
            circleQueue.deQueue();
            return queueItem;
        }
    };
    /**
     * 获取某个座位下注队列长度
     * @param seat 座位
     */
    BbwzBetManager.getOneRoleBetQueueLength = function (seat) {
        var circleQueue = this.playerQueue[seat];
        if (circleQueue)
            return circleQueue.length;
        return 0;
    };
    BbwzBetManager.getAllPlayerQueue = function () {
        return this.playerQueue;
    };
    // 采用循环队列, 单局每个座位下注不会超过100次, size取100完全足够了 况且不会只进列不出列的
    BbwzBetManager.playerQueue = (_a = {},
        _a[BbwzConstDefine_1.BbwzRole.Self] = new BbwzCircularQueue_1.default(100),
        _a[BbwzConstDefine_1.BbwzRole.Online] = new BbwzCircularQueue_1.default(100),
        _a[BbwzConstDefine_1.BbwzRole.Wiser] = new BbwzCircularQueue_1.default(100),
        _a[BbwzConstDefine_1.BbwzRole.Richer1] = new BbwzCircularQueue_1.default(100),
        _a[BbwzConstDefine_1.BbwzRole.Richer2] = new BbwzCircularQueue_1.default(100),
        _a[BbwzConstDefine_1.BbwzRole.Richer3] = new BbwzCircularQueue_1.default(100),
        _a[BbwzConstDefine_1.BbwzRole.Richer4] = new BbwzCircularQueue_1.default(100),
        _a[BbwzConstDefine_1.BbwzRole.Richer5] = new BbwzCircularQueue_1.default(100),
        _a);
    return BbwzBetManager;
}());
exports.default = BbwzBetManager;
var QueueItem = /** @class */ (function () {
    function QueueItem(tableType, betNum) {
        this.tableType = tableType;
        this.betNum = betNum;
        // Logger.error(tableType, betNum);
    }
    return QueueItem;
}());
exports.QueueItem = QueueItem;

cc._RF.pop();