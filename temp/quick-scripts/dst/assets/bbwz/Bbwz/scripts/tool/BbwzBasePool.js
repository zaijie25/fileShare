
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/tool/BbwzBasePool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcdG9vbFxcQmJ3ekJhc2VQb29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFHSTs7O09BR0c7SUFDSCxzQkFBc0IsSUFBYTtRQUFiLFNBQUksR0FBSixJQUFJLENBQVM7UUFOekIsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQU9yQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLGdDQUFTLEdBQWpCO1FBQUEsaUJBY0M7UUFiRyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLFdBQVcsR0FBRztZQUNkLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUNwQyxJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzdCLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLEtBQUssRUFBRSxDQUFDO2dCQUNSLElBQUksS0FBSyxJQUFJLEtBQUksQ0FBQyxRQUFRLEVBQUM7b0JBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN2QyxNQUFNO2lCQUNUO2FBQ0o7UUFDTCxDQUFDLENBQUE7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUdELHNCQUFjLGtDQUFRO1FBRHRCLFFBQVE7YUFDUjtZQUNJLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQzs7O09BQUE7SUFHRCxzQkFBYyxvQ0FBVTtRQUR4QixXQUFXO2FBQ1g7WUFDSSxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7OztPQUFBO0lBSU0sOEJBQU8sR0FBZDtRQUNJLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUM7WUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDMUI7UUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU0saUNBQVUsR0FBakIsVUFBa0IsS0FBYTtRQUMzQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ3ZCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBSU0sa0NBQVcsR0FBbEIsVUFBbUIsSUFBTztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTSxpQ0FBVSxHQUFqQixVQUFrQixHQUFRO1FBQTFCLGlCQUlDO1FBSEcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDWCxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLGdDQUFTLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHNCQUFXLDhCQUFJO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBQ0wsbUJBQUM7QUFBRCxDQTNFQSxBQTJFQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmJ3ekJhc2VQb29sPFQ+e1xyXG4gICAgcHJvdGVjdGVkIHBvb2w6IFRbXSA9IFtdO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOmAmueUqOe8k+WtmOaxoOWfuuexu1xyXG4gICAgICogQHBhcmFtIHJvb3Qg57yT5a2Y55So54i26IqC54K5XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByb290OiBjYy5Ob2RlKXtcclxuICAgICAgICB0aGlzLnByZUNyZWF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcHJlQ3JlYXRlKCl7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICBsZXQgbG9hZEJ5RnJhbWUgPSAoKT0+e1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ldmVyeUNvdW50OyBpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmNyZWF0ZUl0ZW0oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjeWNsZUl0ZW0oaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID49IHRoaXMucHJlQ291bnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIEdhbWUuQ29tcG9uZW50LnVuc2NoZWR1bGUobG9hZEJ5RnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlKGxvYWRCeUZyYW1lLCAwLjIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyDpooTliqDovb3mgLvmlbBcclxuICAgIHByb3RlY3RlZCBnZXQgcHJlQ291bnQoKXtcclxuICAgICAgICByZXR1cm4gMzA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5q+P5Zu65a6a5bin5Yqg6L295pWw6YePXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGV2ZXJ5Q291bnQoKXtcclxuICAgICAgICByZXR1cm4gMzA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZUl0ZW0oKTogVDtcclxuXHJcbiAgICBwdWJsaWMgZ2V0SXRlbSgpOiBUe1xyXG4gICAgICAgIGlmICh0aGlzLnNpemUgPiAwKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9vbC5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlSXRlbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJdGVtQXJyKGNvdW50OiBudW1iZXIpOiBUW117XHJcbiAgICAgICAgbGV0IGFyciA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPCBjb3VudDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmdldEl0ZW0oKTtcclxuICAgICAgICAgICAgYXJyLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHJlc2V0SXRlbShpdGVtOiBUKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgcmVjeWNsZUl0ZW0oaXRlbTogVCl7XHJcbiAgICAgICAgdGhpcy5yZXNldEl0ZW0oaXRlbSk7XHJcbiAgICAgICAgdGhpcy5wb29sLnB1c2goaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlY3ljbGVBbGwoYXJyOiBUW10pe1xyXG4gICAgICAgIGFyci5mb3JFYWNoKGVsZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjeWNsZUl0ZW0oZWxlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRQb29sKCl7XHJcbiAgICAgICAgdGhpcy5wb29sID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzaXplKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9vbC5sZW5ndGg7XHJcbiAgICB9XHJcbn0iXX0=