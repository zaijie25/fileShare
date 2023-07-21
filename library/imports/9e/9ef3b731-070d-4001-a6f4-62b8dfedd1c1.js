"use strict";
cc._RF.push(module, '9ef3bcxBw1AAab0Yrjf7dHB', 'BbwzBasePool');
// bbwz/Bbwz/scripts/tool/BbwzBasePool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BbwzBasePool = /** @class */ (function () {
    /**
     * 通用缓存池基类
     * @param root 缓存用父节点
     */
    function BbwzBasePool(root) {
        this.root = root;
        this.pool = [];
        this.preCreate();
    }
    BbwzBasePool.prototype.preCreate = function () {
        var _this = this;
        var count = 0;
        var loadByFrame = function () {
            for (var i = 0; i < _this.everyCount; i++) {
                var item = _this.createItem();
                _this.recycleItem(item);
                count++;
                if (count >= _this.preCount) {
                    Game.Component.unschedule(loadByFrame);
                    break;
                }
            }
        };
        Game.Component.schedule(loadByFrame, 0.2);
    };
    Object.defineProperty(BbwzBasePool.prototype, "preCount", {
        // 预加载总数
        get: function () {
            return 30;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BbwzBasePool.prototype, "everyCount", {
        // 每固定帧加载数量
        get: function () {
            return 30;
        },
        enumerable: false,
        configurable: true
    });
    BbwzBasePool.prototype.getItem = function () {
        if (this.size > 0) {
            return this.pool.pop();
        }
        return this.createItem();
    };
    BbwzBasePool.prototype.getItemArr = function (count) {
        var arr = [];
        for (var i = 0; i < count; i++) {
            var item = this.getItem();
            arr.push(item);
        }
        return arr;
    };
    BbwzBasePool.prototype.recycleItem = function (item) {
        this.resetItem(item);
        this.pool.push(item);
    };
    BbwzBasePool.prototype.recycleAll = function (arr) {
        var _this = this;
        arr.forEach(function (ele) {
            _this.recycleItem(ele);
        });
    };
    BbwzBasePool.prototype.resetPool = function () {
        this.pool = [];
    };
    Object.defineProperty(BbwzBasePool.prototype, "size", {
        get: function () {
            return this.pool.length;
        },
        enumerable: false,
        configurable: true
    });
    return BbwzBasePool;
}());
exports.default = BbwzBasePool;

cc._RF.pop();