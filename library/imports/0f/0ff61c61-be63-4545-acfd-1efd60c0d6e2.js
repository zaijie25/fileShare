"use strict";
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