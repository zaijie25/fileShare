"use strict";
cc._RF.push(module, '09174qysUJJioR/74j3tl8J', 'BbwzCircularQueue');
// bbwz/Bbwz/scripts/tool/BbwzCircularQueue.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 循环队列 用于频繁作shift()的数据
var BbwzCircularQueue = /** @class */ (function () {
    // size队列长度, 在不确定多长时可以设置大点
    function BbwzCircularQueue(maxSize) {
        this.maxSize = maxSize;
        this.queue = [];
        this.tail = -1;
        this.head = -1; // [0, maxSize]
        this.queue = [];
    }
    // 队尾插入一个元素 队尾不是指数组尾部
    BbwzCircularQueue.prototype.enQueue = function (value) {
        if (this.isFull())
            return false;
        if (this.isEmpty())
            this.head = 0;
        this.tail = (this.tail + 1) % this.maxSize;
        this.queue[this.tail] = value;
        return true;
    };
    // 从队头删除一个元素 通常先q.front()获取头元素 然后q.deQueue()删除
    BbwzCircularQueue.prototype.deQueue = function () {
        if (!this.isEmpty()) {
            if (this.head === this.tail) {
                this.head = -1;
                this.tail = -1;
            }
            else {
                this.head = (this.head + 1) % this.maxSize;
            }
            return true;
        }
        return false;
    };
    // 从队首获取元素
    BbwzCircularQueue.prototype.front = function () {
        if (!this.isEmpty())
            return this.queue[this.head];
    };
    // 获取队尾元素
    BbwzCircularQueue.prototype.rear = function () {
        if (!this.isEmpty())
            return this.queue[this.tail];
    };
    BbwzCircularQueue.prototype.isFull = function () {
        var flag = (this.tail + 1) % this.maxSize === this.head;
        if (flag)
            Logger.error("BbwzCircularQueue isFull, check it", this.maxSize); // maxSize设置小了, 会导致数据丢失
        return flag;
    };
    BbwzCircularQueue.prototype.isEmpty = function () {
        return this.head === -1;
    };
    Object.defineProperty(BbwzCircularQueue.prototype, "length", {
        get: function () {
            if (this.tail == -1 && this.head == -1)
                return 0;
            return this.tail - this.head + 1;
        },
        enumerable: false,
        configurable: true
    });
    BbwzCircularQueue.prototype.clear = function () {
        this.head = -1;
        this.tail = -1;
    };
    return BbwzCircularQueue;
}());
exports.default = BbwzCircularQueue;

cc._RF.pop();