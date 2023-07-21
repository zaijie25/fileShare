
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/tool/ErmjBasePool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcdG9vbFxcRXJtakJhc2VQb29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFFSSxzQkFBc0IsSUFBYTtRQUFiLFNBQUksR0FBSixJQUFJLENBQVM7UUFEekIsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLGdDQUFTLEdBQWpCO1FBQUEsaUJBY0M7UUFiRyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLFdBQVcsR0FBRztZQUNkLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUNwQyxJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzdCLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLEtBQUssRUFBRSxDQUFDO2dCQUNSLElBQUksS0FBSyxJQUFJLEtBQUksQ0FBQyxRQUFRLEVBQUM7b0JBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN2QyxNQUFNO2lCQUNUO2FBQ0o7UUFDTCxDQUFDLENBQUE7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUdELHNCQUFjLGtDQUFRO1FBRHRCLG1CQUFtQjthQUNuQjtZQUNJLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQzs7O09BQUE7SUFHRCxzQkFBYyxvQ0FBVTtRQUR4QixzQkFBc0I7YUFDdEI7WUFDSSxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7OztPQUFBO0lBRVMsaUNBQVUsR0FBcEI7UUFDSSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sOEJBQU8sR0FBZDtRQUNJLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUM7WUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDMUI7UUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU0saUNBQVUsR0FBakIsVUFBa0IsS0FBYTtRQUMzQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ3ZCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRVMsZ0NBQVMsR0FBbkIsVUFBb0IsSUFBTztJQUUzQixDQUFDO0lBRU0sa0NBQVcsR0FBbEIsVUFBbUIsSUFBTztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTSxpQ0FBVSxHQUFqQixVQUFrQixHQUFRO1FBQTFCLGlCQUlDO1FBSEcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDWCxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLGdDQUFTLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHNCQUFXLDhCQUFJO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBQ0wsbUJBQUM7QUFBRCxDQTFFQSxBQTBFQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtakJhc2VQb29sPFQ+e1xyXG4gICAgcHJvdGVjdGVkIHBvb2w6IFRbXSA9IFtdO1xyXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJvb3Q6IGNjLk5vZGUpe1xyXG4gICAgICAgIHRoaXMucHJlQ3JlYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwcmVDcmVhdGUoKXtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGxldCBsb2FkQnlGcmFtZSA9ICgpPT57XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmV2ZXJ5Q291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuY3JlYXRlSXRlbSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWN5Y2xlSXRlbShpdGVtKTtcclxuICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPj0gdGhpcy5wcmVDb3VudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5Db21wb25lbnQudW5zY2hlZHVsZShsb2FkQnlGcmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGUobG9hZEJ5RnJhbWUsIDAuMik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIOmihOWKoOi9veaAu+aVsCDpnIDopoHkv67mlLnnmoTor53nu6fmib/ph43lhplcclxuICAgIHByb3RlY3RlZCBnZXQgcHJlQ291bnQoKXtcclxuICAgICAgICByZXR1cm4gMzA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5q+P5Zu65a6a5bin5Yqg6L295pWw6YePIOmcgOimgeS/ruaUueeahOivnee7p+aJv+mHjeWGmVxyXG4gICAgcHJvdGVjdGVkIGdldCBldmVyeUNvdW50KCl7XHJcbiAgICAgICAgcmV0dXJuIDMwO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjcmVhdGVJdGVtKCl7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEl0ZW0oKTogVHtcclxuICAgICAgICBpZiAodGhpcy5zaXplID4gMCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvb2wucG9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUl0ZW0oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SXRlbUFycihjb3VudDogbnVtYmVyKTogVFtde1xyXG4gICAgICAgIGxldCBhcnIgPSBbXTtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTwgY291bnQ7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5nZXRJdGVtKCk7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCByZXNldEl0ZW0oaXRlbTogVCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlY3ljbGVJdGVtKGl0ZW06IFQpe1xyXG4gICAgICAgIHRoaXMucmVzZXRJdGVtKGl0ZW0pO1xyXG4gICAgICAgIHRoaXMucG9vbC5wdXNoKGl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWN5Y2xlQWxsKGFycjogVFtdKXtcclxuICAgICAgICBhcnIuZm9yRWFjaChlbGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlY3ljbGVJdGVtKGVsZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0UG9vbCgpe1xyXG4gICAgICAgIHRoaXMucG9vbCA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc2l6ZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBvb2wubGVuZ3RoO1xyXG4gICAgfVxyXG59Il19