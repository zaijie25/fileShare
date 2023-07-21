
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/manager/BbwzBetManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcbWFuYWdlclxcQmJ3ekJldE1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUFtRDtBQUNuRCwrREFBMEQ7QUFFMUQ7SUFBQTtJQTZGQSxDQUFDO0lBaEZHOztPQUVHO0lBQ1csMkJBQVksR0FBMUIsVUFBMkIsV0FBbUI7UUFDMUMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksV0FBVyxJQUFJLEdBQUc7WUFDbEIsT0FBTyxXQUFXLENBQUM7UUFDdkIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoRSxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7OztPQUdHO0lBQ1csNEJBQWEsR0FBM0IsVUFBNEIsSUFBYTtRQUNyQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFDO1lBQy9CLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2pCO2FBQ0c7WUFDQSxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUM7Z0JBQzdCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNqQjtTQUNKO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ1csMEJBQVcsR0FBekIsVUFBMEIsSUFBYyxFQUFFLFFBQWdCLEVBQUUsTUFBYztRQUN0RSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLElBQUksV0FBVyxFQUFDO1lBQ1osSUFBSSxRQUFRLEdBQUcsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQy9DLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ1csaUNBQWtCLEdBQWhDLFVBQWlDLElBQWM7UUFDM0MsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLFdBQVc7WUFDWCxPQUFPLFdBQVcsQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLG1DQUFvQixHQUFsQyxVQUFtQyxJQUFjO1FBQzdDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxXQUFXLEVBQUM7WUFDWixJQUFJLFNBQVMsR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RCLE9BQU8sU0FBUyxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNXLHVDQUF3QixHQUF0QyxVQUF1QyxJQUFjO1FBQ2pELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxXQUFXO1lBQ1gsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVhLGdDQUFpQixHQUEvQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDO0lBM0ZELHNEQUFzRDtJQUN2QywwQkFBVztRQUN0QixHQUFDLDBCQUFRLENBQUMsSUFBSSxJQUFHLElBQUksMkJBQWlCLENBQVksR0FBRyxDQUFDO1FBQ3RELEdBQUMsMEJBQVEsQ0FBQyxNQUFNLElBQUcsSUFBSSwyQkFBaUIsQ0FBWSxHQUFHLENBQUM7UUFDeEQsR0FBQywwQkFBUSxDQUFDLEtBQUssSUFBRyxJQUFJLDJCQUFpQixDQUFZLEdBQUcsQ0FBQztRQUN2RCxHQUFDLDBCQUFRLENBQUMsT0FBTyxJQUFHLElBQUksMkJBQWlCLENBQVksR0FBRyxDQUFDO1FBQ3pELEdBQUMsMEJBQVEsQ0FBQyxPQUFPLElBQUcsSUFBSSwyQkFBaUIsQ0FBWSxHQUFHLENBQUM7UUFDekQsR0FBQywwQkFBUSxDQUFDLE9BQU8sSUFBRyxJQUFJLDJCQUFpQixDQUFZLEdBQUcsQ0FBQztRQUN6RCxHQUFDLDBCQUFRLENBQUMsT0FBTyxJQUFHLElBQUksMkJBQWlCLENBQVksR0FBRyxDQUFDO1FBQ3pELEdBQUMsMEJBQVEsQ0FBQyxPQUFPLElBQUcsSUFBSSwyQkFBaUIsQ0FBWSxHQUFHLENBQUM7WUFDM0Q7SUFrRk4scUJBQUM7Q0E3RkQsQUE2RkMsSUFBQTtrQkE3Rm9CLGNBQWM7QUErRm5DO0lBQ0ksbUJBQW1CLFNBQWlCLEVBQVMsTUFBYztRQUF4QyxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUN2RCxtQ0FBbUM7SUFDdkMsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FKQSxBQUlDLElBQUE7QUFKWSw4QkFBUyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJid3pSb2xlIH0gZnJvbSBcIi4uL2RhdGEvQmJ3ekNvbnN0RGVmaW5lXCI7XHJcbmltcG9ydCBCYnd6Q2lyY3VsYXJRdWV1ZSBmcm9tIFwiLi4vdG9vbC9CYnd6Q2lyY3VsYXJRdWV1ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmJ3ekJldE1hbmFnZXJ7XHJcbiAgICAvLyDph4fnlKjlvqrnjq/pmJ/liJcsIOWNleWxgOavj+S4quW6p+S9jeS4i+azqOS4jeS8mui2hei/hzEwMOasoSwgc2l6ZeWPljEwMOWujOWFqOi2s+Wkn+S6hiDlhrXkuJTkuI3kvJrlj6rov5vliJfkuI3lh7rliJfnmoRcclxuICAgIHByaXZhdGUgc3RhdGljIHBsYXllclF1ZXVlOiB7W2tleTogbnVtYmVyXTogQmJ3ekNpcmN1bGFyUXVldWU8UXVldWVJdGVtPn0gID0geyAgICAgXHJcbiAgICAgICAgW0Jid3pSb2xlLlNlbGZdOiBuZXcgQmJ3ekNpcmN1bGFyUXVldWU8UXVldWVJdGVtPigxMDApLFxyXG4gICAgICAgIFtCYnd6Um9sZS5PbmxpbmVdOiBuZXcgQmJ3ekNpcmN1bGFyUXVldWU8UXVldWVJdGVtPigxMDApLFxyXG4gICAgICAgIFtCYnd6Um9sZS5XaXNlcl06IG5ldyBCYnd6Q2lyY3VsYXJRdWV1ZTxRdWV1ZUl0ZW0+KDEwMCksXHJcbiAgICAgICAgW0Jid3pSb2xlLlJpY2hlcjFdOiBuZXcgQmJ3ekNpcmN1bGFyUXVldWU8UXVldWVJdGVtPigxMDApLFxyXG4gICAgICAgIFtCYnd6Um9sZS5SaWNoZXIyXTogbmV3IEJid3pDaXJjdWxhclF1ZXVlPFF1ZXVlSXRlbT4oMTAwKSxcclxuICAgICAgICBbQmJ3elJvbGUuUmljaGVyM106IG5ldyBCYnd6Q2lyY3VsYXJRdWV1ZTxRdWV1ZUl0ZW0+KDEwMCksXHJcbiAgICAgICAgW0Jid3pSb2xlLlJpY2hlcjRdOiBuZXcgQmJ3ekNpcmN1bGFyUXVldWU8UXVldWVJdGVtPigxMDApLFxyXG4gICAgICAgIFtCYnd6Um9sZS5SaWNoZXI1XTogbmV3IEJid3pDaXJjdWxhclF1ZXVlPFF1ZXVlSXRlbT4oMTAwKSxcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbbku5bnjqnlrrbkuIvms6jml7bnmoTpo57nrbnnoIHorqHnrpdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRTZW5kQ291bnQocXVldWVMZW5ndGg6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBsZW4gPSBHbG9iYWwuVG9vbGtpdC5nZXRSb3VuZEludGVnZXIoNCwgMSk7XHJcbiAgICAgICAgaWYgKHF1ZXVlTGVuZ3RoIDw9IGxlbikgXHJcbiAgICAgICAgICAgIHJldHVybiBxdWV1ZUxlbmd0aDtcclxuICAgICAgICBsZXQgY291bnQgPSBHbG9iYWwuVG9vbGtpdC5nZXRSb3VuZEludGVnZXIocXVldWVMZW5ndGggLyAyICsgMSk7XHJcbiAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF55CG5LiL5rOo6Zif5YiXXHJcbiAgICAgKiBAcGFyYW0gc2VhdCDmjIflrprluqfkvY0sIOS8oOepuuWFqOmDqOa4heeQhlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsZWFyQmV0UXVldWUoc2VhdD86IG51bWJlcil7XHJcbiAgICAgICAgaWYgKHNlYXQgJiYgdGhpcy5wbGF5ZXJRdWV1ZVtzZWF0XSl7XHJcbiAgICAgICAgICAgIGxldCBxdWV1ZSA9IHRoaXMucGxheWVyUXVldWVbc2VhdF07XHJcbiAgICAgICAgICAgIHF1ZXVlLmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnBsYXllclF1ZXVlKXtcclxuICAgICAgICAgICAgICAgIGxldCBxdWV1ZSA9IHRoaXMucGxheWVyUXVldWVba2V5XTtcclxuICAgICAgICAgICAgICAgIHF1ZXVlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDkuIDmnaHkuIvms6jooYzkuLrliLDpmJ/liJdcclxuICAgICAqIEBwYXJhbSBzZWF0IOW6p+S9jVxyXG4gICAgICogQHBhcmFtIGFyZWFOYW1lIOS4i+azqOWMuuWfn+WQjVxyXG4gICAgICogQHBhcmFtIGJldE51bSDkuIvms6jph5Hpop1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBhZGRCZXRRdWV1ZShzZWF0OiBCYnd6Um9sZSwgYXJlYU5hbWU6IHN0cmluZywgYmV0TnVtOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBjaXJjbGVRdWV1ZSA9IHRoaXMucGxheWVyUXVldWVbc2VhdF07XHJcbiAgICAgICAgaWYgKGNpcmNsZVF1ZXVlKXtcclxuICAgICAgICAgICAgbGV0IHF1ZXVJdGVtID0gbmV3IFF1ZXVlSXRlbShhcmVhTmFtZSwgYmV0TnVtKTtcclxuICAgICAgICAgICAgY2lyY2xlUXVldWUuZW5RdWV1ZShxdWV1SXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5LiA5Liq5bqn5L2N5LiL5rOo6Zif5YiXXHJcbiAgICAgKiBAcGFyYW0gc2VhdCDluqfkvY1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRPbmVSb2xlQmV0UXVldWUoc2VhdDogQmJ3elJvbGUpe1xyXG4gICAgICAgIGxldCBjaXJjbGVRdWV1ZSA9IHRoaXMucGxheWVyUXVldWVbc2VhdF07XHJcbiAgICAgICAgaWYgKGNpcmNsZVF1ZXVlKVxyXG4gICAgICAgICAgICByZXR1cm4gY2lyY2xlUXVldWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmn5DkuKrluqfkvY3kuIvms6jooYzkuLrpmJ/liJflh7rliJfkuIDmnaFcclxuICAgICAqIOS4i+azqOaVsOaNrnNoaWZ05pu05paw6aKR57mBLCDph4fnlKjlvqrnjq/pmJ/liJcg5YeP5bCR5byA6ZSAXHJcbiAgICAgKiBAcGFyYW0gc2VhdCDluqfkvY1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzaGlmdE9uZVJvbGVCZXRRdWV1ZShzZWF0OiBCYnd6Um9sZSl7XHJcbiAgICAgICAgbGV0IGNpcmNsZVF1ZXVlID0gdGhpcy5wbGF5ZXJRdWV1ZVtzZWF0XTtcclxuICAgICAgICBpZiAoY2lyY2xlUXVldWUpe1xyXG4gICAgICAgICAgICBsZXQgcXVldWVJdGVtID0gY2lyY2xlUXVldWUuZnJvbnQoKTtcclxuICAgICAgICAgICAgY2lyY2xlUXVldWUuZGVRdWV1ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gcXVldWVJdGVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluafkOS4quW6p+S9jeS4i+azqOmYn+WIl+mVv+W6plxyXG4gICAgICogQHBhcmFtIHNlYXQg5bqn5L2NXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0T25lUm9sZUJldFF1ZXVlTGVuZ3RoKHNlYXQ6IEJid3pSb2xlKXtcclxuICAgICAgICBsZXQgY2lyY2xlUXVldWUgPSB0aGlzLnBsYXllclF1ZXVlW3NlYXRdO1xyXG4gICAgICAgIGlmIChjaXJjbGVRdWV1ZSlcclxuICAgICAgICAgICAgcmV0dXJuIGNpcmNsZVF1ZXVlLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEFsbFBsYXllclF1ZXVlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyUXVldWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBRdWV1ZUl0ZW17XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFibGVUeXBlOiBzdHJpbmcsIHB1YmxpYyBiZXROdW06IG51bWJlcil7XHJcbiAgICAgICAgLy8gTG9nZ2VyLmVycm9yKHRhYmxlVHlwZSwgYmV0TnVtKTtcclxuICAgIH1cclxufSJdfQ==