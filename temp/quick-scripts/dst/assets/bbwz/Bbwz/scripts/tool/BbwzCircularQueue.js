
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/tool/BbwzCircularQueue.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcdG9vbFxcQmJ3ekNpcmN1bGFyUXVldWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1QkFBdUI7QUFDdkI7SUFLSSwwQkFBMEI7SUFDMUIsMkJBQW1CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBTDFCLFVBQUssR0FBUSxFQUFFLENBQUM7UUFDaEIsU0FBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1YsU0FBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQU0sZUFBZTtRQUluQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQscUJBQXFCO0lBQ2QsbUNBQU8sR0FBZCxVQUFlLEtBQVE7UUFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsT0FBTyxLQUFLLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELDhDQUE4QztJQUN2QyxtQ0FBTyxHQUFkO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBQztZQUNoQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksRUFBQztnQkFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDZixJQUFJLENBQUMsSUFBSSxHQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2pCO2lCQUNHO2dCQUNBLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDOUM7WUFDRCxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELFVBQVU7SUFDSCxpQ0FBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxTQUFTO0lBQ0YsZ0NBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sa0NBQU0sR0FBYjtRQUNJLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDeEQsSUFBSSxJQUFJO1lBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBTyx1QkFBdUI7UUFFbkcsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLG1DQUFPLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELHNCQUFXLHFDQUFNO2FBQWpCO1lBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLENBQUMsQ0FBQztZQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUVNLGlDQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRSxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQXRFQSxBQXNFQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8g5b6q546v6Zif5YiXIOeUqOS6jumikee5geS9nHNoaWZ0KCnnmoTmlbDmja5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmJ3ekNpcmN1bGFyUXVldWU8VD57XHJcbiAgICBwcml2YXRlIHF1ZXVlOiBUW10gPSBbXTtcclxuICAgIHByaXZhdGUgdGFpbCA9IC0xOyAgICAgIFxyXG4gICAgcHJpdmF0ZSBoZWFkID0gLTE7ICAgICAgLy8gWzAsIG1heFNpemVdXHJcbiAgICBcclxuICAgIC8vIHNpemXpmJ/liJfplb/luqYsIOWcqOS4jeehruWumuWkmumVv+aXtuWPr+S7peiuvue9ruWkp+eCuVxyXG4gICAgY29uc3RydWN0b3IocHVibGljIG1heFNpemU6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOmYn+WwvuaPkuWFpeS4gOS4quWFg+e0oCDpmJ/lsL7kuI3mmK/mjIfmlbDnu4TlsL7pg6hcclxuICAgIHB1YmxpYyBlblF1ZXVlKHZhbHVlOiBUKXtcclxuICAgICAgICBpZiAodGhpcy5pc0Z1bGwoKSlcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmlzRW1wdHkoKSlcclxuICAgICAgICAgICAgdGhpcy5oZWFkID0gMDtcclxuICAgICAgICB0aGlzLnRhaWwgPSAodGhpcy50YWlsICsgMSkgJSB0aGlzLm1heFNpemU7XHJcbiAgICAgICAgdGhpcy5xdWV1ZVt0aGlzLnRhaWxdID0gdmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LuO6Zif5aS05Yig6Zmk5LiA5Liq5YWD57SgIOmAmuW4uOWFiHEuZnJvbnQoKeiOt+WPluWktOWFg+e0oCDnhLblkI5xLmRlUXVldWUoKeWIoOmZpFxyXG4gICAgcHVibGljIGRlUXVldWUoKXtcclxuICAgICAgICBpZiAoIXRoaXMuaXNFbXB0eSgpKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGVhZCA9PT0gdGhpcy50YWlsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVhZCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWlsPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWFkID0gKHRoaXMuaGVhZCArIDEpICUgdGhpcy5tYXhTaXplO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5LuO6Zif6aaW6I635Y+W5YWD57SgXHJcbiAgICBwdWJsaWMgZnJvbnQoKTogVHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNFbXB0eSgpKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZVt0aGlzLmhlYWRdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPlumYn+WwvuWFg+e0oFxyXG4gICAgcHVibGljIHJlYXIoKTogVHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNFbXB0eSgpKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZVt0aGlzLnRhaWxdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0Z1bGwoKXtcclxuICAgICAgICBsZXQgZmxhZyA9ICh0aGlzLnRhaWwgKyAxKSAlIHRoaXMubWF4U2l6ZSA9PT0gdGhpcy5oZWFkO1xyXG4gICAgICAgIGlmIChmbGFnKVxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJCYnd6Q2lyY3VsYXJRdWV1ZSBpc0Z1bGwsIGNoZWNrIGl0XCIsIHRoaXMubWF4U2l6ZSk7ICAgICAgIC8vIG1heFNpemXorr7nva7lsI/kuoYsIOS8muWvvOiHtOaVsOaNruS4ouWksVxyXG5cclxuICAgICAgICByZXR1cm4gZmxhZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNFbXB0eSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhlYWQgPT09IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbGVuZ3RoKCl7XHJcbiAgICAgICAgaWYgKHRoaXMudGFpbCA9PSAtMSAmJiAgdGhpcy5oZWFkID09IC0xKVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICByZXR1cm4gdGhpcy50YWlsIC0gdGhpcy5oZWFkICsgMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKXtcclxuICAgICAgICB0aGlzLmhlYWQgPSAtMTtcclxuICAgICAgICB0aGlzLnRhaWw9IC0xO1xyXG4gICAgfVxyXG59Il19