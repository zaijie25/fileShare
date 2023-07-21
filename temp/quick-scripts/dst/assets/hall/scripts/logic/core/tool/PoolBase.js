
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/PoolBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0ff61xhvmNFRaz9Hv1gwNbi', 'PoolBase');
// hall/scripts/logic/core/tool/PoolBase.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PoolBase = /** @class */ (function () {
    function PoolBase() {
        this.itemPool = [];
    }
    PoolBase.prototype.createItem = function () {
    };
    PoolBase.prototype.resetItem = function (item) {
    };
    PoolBase.prototype.getItem = function () {
        if (this.itemPool.length > 0) {
            return this.itemPool.pop();
        }
        return this.createItem();
    };
    PoolBase.prototype.recycleItem = function (item) {
        this.resetItem(item);
        this.itemPool.push(item);
    };
    PoolBase.prototype.recycleAll = function (arr) {
        var _this = this;
        arr.forEach(function (ele) {
            _this.recycleItem(ele);
        });
    };
    PoolBase.prototype.resetPool = function () {
        this.itemPool = [];
    };
    return PoolBase;
}());
exports.default = PoolBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXFBvb2xCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtRQUNZLGFBQVEsR0FBZ0IsRUFBRSxDQUFDO0lBK0J2QyxDQUFDO0lBN0JhLDZCQUFVLEdBQXBCO0lBRUEsQ0FBQztJQUVTLDRCQUFTLEdBQW5CLFVBQW9CLElBQVM7SUFFN0IsQ0FBQztJQUVNLDBCQUFPLEdBQWQ7UUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztZQUN6QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDOUI7UUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU0sOEJBQVcsR0FBbEIsVUFBbUIsSUFBUztRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTSw2QkFBVSxHQUFqQixVQUFrQixHQUFlO1FBQWpDLGlCQUlDO1FBSEcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDWCxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDRCQUFTLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQWhDQSxBQWdDQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9vbEJhc2V7XHJcbiAgICBwcml2YXRlIGl0ZW1Qb29sOiBBcnJheTxhbnk+ID0gIFtdO1xyXG5cclxuICAgIHByb3RlY3RlZCBjcmVhdGVJdGVtKCl7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlc2V0SXRlbShpdGVtOiBhbnkpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SXRlbSgpe1xyXG4gICAgICAgIGlmICh0aGlzLml0ZW1Qb29sLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtUG9vbC5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlSXRlbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWN5Y2xlSXRlbShpdGVtOiBhbnkpe1xyXG4gICAgICAgIHRoaXMucmVzZXRJdGVtKGl0ZW0pO1xyXG4gICAgICAgIHRoaXMuaXRlbVBvb2wucHVzaChpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjeWNsZUFsbChhcnI6IEFycmF5PGFueT4pe1xyXG4gICAgICAgIGFyci5mb3JFYWNoKGVsZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjeWNsZUl0ZW0oZWxlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRQb29sKCl7XHJcbiAgICAgICAgdGhpcy5pdGVtUG9vbCA9IFtdO1xyXG4gICAgfVxyXG59Il19