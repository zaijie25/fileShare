
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/mode/BlockCipherModeAlgorithm.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1308eqZDOpGbqjVT1hCqh94', 'BlockCipherModeAlgorithm');
// hall/scripts/framework/libs/cryptoTs/mode/BlockCipherModeAlgorithm.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCipherModeAlgorithm = void 0;
var BlockCipherModeAlgorithm = /** @class */ (function () {
    function BlockCipherModeAlgorithm(cipher, iv) {
        this.init(cipher, iv);
    }
    /**
     * Initializes a newly created mode.
     *
     * @param cipher A block cipher instance.
     * @param iv The IV words.
     *
     * @example
     *
     *     var mode = CBC.Encryptor.create(cipher, iv.words);
     */
    BlockCipherModeAlgorithm.prototype.init = function (cipher, iv) {
        this._cipher = cipher;
        this._iv = iv;
    };
    return BlockCipherModeAlgorithm;
}());
exports.BlockCipherModeAlgorithm = BlockCipherModeAlgorithm;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcbW9kZVxcQmxvY2tDaXBoZXJNb2RlQWxnb3JpdGhtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBO0lBT0ksa0NBQW1CLE1BQW1CLEVBQUUsRUFBaUI7UUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNJLHVDQUFJLEdBQVgsVUFBWSxNQUFtQixFQUFFLEVBQWtCO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFHTCwrQkFBQztBQUFELENBM0JBLEFBMkJDLElBQUE7QUEzQnFCLDREQUF3QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJsb2NrQ2lwaGVyIH0gZnJvbSAnLi4vbGliL0Jsb2NrQ2lwaGVyJztcclxuaW1wb3J0IHsgQmxvY2tDaXBoZXJNb2RlIH0gZnJvbSAnLi9CbG9ja0NpcGhlck1vZGUnO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJsb2NrQ2lwaGVyTW9kZUFsZ29yaXRobSB7XHJcbiAgICBwdWJsaWMgX2NpcGhlciE6IEJsb2NrQ2lwaGVyO1xyXG5cclxuICAgIHB1YmxpYyBfaXY6IEFycmF5PG51bWJlcj4gfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgcHVibGljIF9fY3JlYXRvcjogKChjaXBoZXI6IEJsb2NrQ2lwaGVyLCBpdjogbnVtYmVyW10pID0+IEJsb2NrQ2lwaGVyTW9kZSkgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNpcGhlcjogQmxvY2tDaXBoZXIsIGl2OiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICAgICAgdGhpcy5pbml0KGNpcGhlciwgaXYpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIG1vZGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNpcGhlciBBIGJsb2NrIGNpcGhlciBpbnN0YW5jZS5cclxuICAgICAqIEBwYXJhbSBpdiBUaGUgSVYgd29yZHMuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgdmFyIG1vZGUgPSBDQkMuRW5jcnlwdG9yLmNyZWF0ZShjaXBoZXIsIGl2LndvcmRzKTtcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXQoY2lwaGVyOiBCbG9ja0NpcGhlciwgaXY/OiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICAgICAgdGhpcy5fY2lwaGVyID0gY2lwaGVyO1xyXG4gICAgICAgIHRoaXMuX2l2ID0gaXY7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IHByb2Nlc3NCbG9jayh3b3JkczogQXJyYXk8bnVtYmVyPiwgb2Zmc2V0OiBudW1iZXIpOiB2b2lkO1xyXG59Il19