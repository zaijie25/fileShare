
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/GameBasePool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXEdhbWVCYXNlUG9vbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBR0k7OztPQUdHO0lBQ0gsc0JBQXNCLElBQWE7UUFBYixTQUFJLEdBQUosSUFBSSxDQUFTO1FBTnpCLFNBQUksR0FBUSxFQUFFLENBQUM7UUFPckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTyxnQ0FBUyxHQUFqQjtRQUFBLGlCQWNDO1FBYkcsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxXQUFXLEdBQUc7WUFDZCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBQztnQkFDcEMsSUFBSSxJQUFJLEdBQUcsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUM3QixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QixLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLEtBQUssSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFDO29CQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDdkMsTUFBTTtpQkFDVDthQUNKO1FBQ0wsQ0FBQyxDQUFBO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFHRCxzQkFBYyxrQ0FBUTtRQUR0QixRQUFRO2FBQ1I7WUFDSSxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7OztPQUFBO0lBR0Qsc0JBQWMsb0NBQVU7UUFEeEIsV0FBVzthQUNYO1lBQ0ksT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDOzs7T0FBQTtJQUlNLDhCQUFPLEdBQWQ7UUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFDO1lBQ2QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVNLGlDQUFVLEdBQWpCLFVBQWtCLEtBQWE7UUFDM0IsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBQztZQUN2QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUlNLGtDQUFXLEdBQWxCLFVBQW1CLElBQU87UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRU0saUNBQVUsR0FBakIsVUFBa0IsR0FBUTtRQUExQixpQkFJQztRQUhHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ1gsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxnQ0FBUyxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxzQkFBVyw4QkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUNMLG1CQUFDO0FBQUQsQ0EzRUEsQUEyRUMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEdhbWVCYXNlUG9vbDxUPntcclxuICAgIHByb3RlY3RlZCBwb29sOiBUW10gPSBbXTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDpgJrnlKjnvJPlrZjmsaDln7rnsbtcclxuICAgICAqIEBwYXJhbSByb290IOe8k+WtmOeUqOeItuiKgueCuVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcm9vdDogY2MuTm9kZSl7XHJcbiAgICAgICAgdGhpcy5wcmVDcmVhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHByZUNyZWF0ZSgpe1xyXG4gICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgbGV0IGxvYWRCeUZyYW1lID0gKCk9PntcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZXZlcnlDb3VudDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5jcmVhdGVJdGVtKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY3ljbGVJdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA+PSB0aGlzLnByZUNvdW50KXtcclxuICAgICAgICAgICAgICAgICAgICBHYW1lLkNvbXBvbmVudC51bnNjaGVkdWxlKGxvYWRCeUZyYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZShsb2FkQnlGcmFtZSwgMC4yKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8g6aKE5Yqg6L295oC75pWwXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IHByZUNvdW50KCl7XHJcbiAgICAgICAgcmV0dXJuIDMwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOavj+WbuuWumuW4p+WKoOi9veaVsOmHj1xyXG4gICAgcHJvdGVjdGVkIGdldCBldmVyeUNvdW50KCl7XHJcbiAgICAgICAgcmV0dXJuIDMwO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBjcmVhdGVJdGVtKCk6IFQ7XHJcblxyXG4gICAgcHVibGljIGdldEl0ZW0oKTogVHtcclxuICAgICAgICBpZiAodGhpcy5zaXplID4gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvb2wucG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUl0ZW0oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SXRlbUFycihjb3VudDogbnVtYmVyKTogVFtde1xyXG4gICAgICAgIGxldCBhcnIgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTwgY291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5nZXRJdGVtKCk7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCByZXNldEl0ZW0oaXRlbTogVCk6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIHJlY3ljbGVJdGVtKGl0ZW06IFQpe1xyXG4gICAgICAgIHRoaXMucmVzZXRJdGVtKGl0ZW0pO1xyXG4gICAgICAgIHRoaXMucG9vbC5wdXNoKGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWN5Y2xlQWxsKGFycjogVFtdKXtcclxuICAgICAgICBhcnIuZm9yRWFjaChlbGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlY3ljbGVJdGVtKGVsZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0UG9vbCgpe1xyXG4gICAgICAgIHRoaXMucG9vbCA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2l6ZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvb2wubGVuZ3RoO1xyXG4gICAgfVxyXG59Il19