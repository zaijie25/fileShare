"use strict";
cc._RF.push(module, '1cfe8HY2NRDLpEWhXXiTgKq', 'ErmjBasePool');
// ermj/Ermj/scripts/tool/ErmjBasePool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErmjBasePool = /** @class */ (function () {
    function ErmjBasePool(root) {
        this.root = root;
        this.pool = [];
        this.preCreate();
    }
    ErmjBasePool.prototype.preCreate = function () {
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
    Object.defineProperty(ErmjBasePool.prototype, "preCount", {
        // 预加载总数 需要修改的话继承重写
        get: function () {
            return 30;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErmjBasePool.prototype, "everyCount", {
        // 每固定帧加载数量 需要修改的话继承重写
        get: function () {
            return 30;
        },
        enumerable: false,
        configurable: true
    });
    ErmjBasePool.prototype.createItem = function () {
        return null;
    };
    ErmjBasePool.prototype.getItem = function () {
        if (this.size > 0) {
            return this.pool.pop();
        }
        return this.createItem();
    };
    ErmjBasePool.prototype.getItemArr = function (count) {
        var arr = [];
        for (var i = 0; i < count; i++) {
            var item = this.getItem();
            arr.push(item);
        }
        return arr;
    };
    ErmjBasePool.prototype.resetItem = function (item) {
    };
    ErmjBasePool.prototype.recycleItem = function (item) {
        this.resetItem(item);
        this.pool.push(item);
    };
    ErmjBasePool.prototype.recycleAll = function (arr) {
        var _this = this;
        arr.forEach(function (ele) {
            _this.recycleItem(ele);
        });
    };
    ErmjBasePool.prototype.resetPool = function () {
        this.pool = [];
    };
    Object.defineProperty(ErmjBasePool.prototype, "size", {
        get: function () {
            return this.pool.length;
        },
        enumerable: false,
        configurable: true
    });
    return ErmjBasePool;
}());
exports.default = ErmjBasePool;

cc._RF.pop();