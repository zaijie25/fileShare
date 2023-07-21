"use strict";
cc._RF.push(module, '3b07epQl6ZAlZ2u7gVzDq9t', 'GameBasePool');
// hall/scripts/logic/core/tool/GameBasePool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameBasePool = /** @class */ (function () {
    /**
     * 通用缓存池基类
     * @param root 缓存用父节点
     */
    function GameBasePool(root) {
        this.root = root;
        this.pool = [];
        this.preCreate();
    }
    GameBasePool.prototype.preCreate = function () {
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
    Object.defineProperty(GameBasePool.prototype, "preCount", {
        // 预加载总数
        get: function () {
            return 30;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameBasePool.prototype, "everyCount", {
        // 每固定帧加载数量
        get: function () {
            return 30;
        },
        enumerable: false,
        configurable: true
    });
    GameBasePool.prototype.getItem = function () {
        if (this.size > 0) {
            return this.pool.pop();
        }
        return this.createItem();
    };
    GameBasePool.prototype.getItemArr = function (count) {
        var arr = [];
        for (var i = 0; i < count; i++) {
            var item = this.getItem();
            arr.push(item);
        }
        return arr;
    };
    GameBasePool.prototype.recycleItem = function (item) {
        this.resetItem(item);
        this.pool.push(item);
    };
    GameBasePool.prototype.recycleAll = function (arr) {
        var _this = this;
        arr.forEach(function (ele) {
            _this.recycleItem(ele);
        });
    };
    GameBasePool.prototype.resetPool = function () {
        this.pool = [];
    };
    Object.defineProperty(GameBasePool.prototype, "size", {
        get: function () {
            return this.pool.length;
        },
        enumerable: false,
        configurable: true
    });
    return GameBasePool;
}());
exports.default = GameBasePool;

cc._RF.pop();