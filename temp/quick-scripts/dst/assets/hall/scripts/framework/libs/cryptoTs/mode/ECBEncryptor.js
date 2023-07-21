
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/mode/ECBEncryptor.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4aedf1qsXVBtbKXplI5JcIl', 'ECBEncryptor');
// hall/scripts/framework/libs/cryptoTs/mode/ECBEncryptor.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECBEncryptor = void 0;
var BlockCipherModeAlgorithm_1 = require("./BlockCipherModeAlgorithm");
var ECBEncryptor = /** @class */ (function (_super) {
    __extends(ECBEncryptor, _super);
    function ECBEncryptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Processes the data block at offset.
     *
     * @param words The data words to operate on.
     * @param offset The offset where the block starts.
     *
     * @example
     *
     *     mode.processBlock(data.words, offset);
     */
    ECBEncryptor.prototype.processBlock = function (words, offset) {
        this._cipher.encryptBlock(words, offset);
    };
    return ECBEncryptor;
}(BlockCipherModeAlgorithm_1.BlockCipherModeAlgorithm));
exports.ECBEncryptor = ECBEncryptor;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcbW9kZVxcRUNCRW5jcnlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1RUFBc0U7QUFFdEU7SUFBa0MsZ0NBQXdCO0lBQTFEOztJQWNBLENBQUM7SUFiRzs7Ozs7Ozs7O09BU0c7SUFDSSxtQ0FBWSxHQUFuQixVQUFvQixLQUFvQixFQUFFLE1BQWM7UUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFDTCxtQkFBQztBQUFELENBZEEsQUFjQyxDQWRpQyxtREFBd0IsR0FjekQ7QUFkWSxvQ0FBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJsb2NrQ2lwaGVyTW9kZUFsZ29yaXRobSB9IGZyb20gJy4vQmxvY2tDaXBoZXJNb2RlQWxnb3JpdGhtJztcclxuXHJcbmV4cG9ydCBjbGFzcyBFQ0JFbmNyeXB0b3IgZXh0ZW5kcyBCbG9ja0NpcGhlck1vZGVBbGdvcml0aG0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBQcm9jZXNzZXMgdGhlIGRhdGEgYmxvY2sgYXQgb2Zmc2V0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB3b3JkcyBUaGUgZGF0YSB3b3JkcyB0byBvcGVyYXRlIG9uLlxyXG4gICAgICogQHBhcmFtIG9mZnNldCBUaGUgb2Zmc2V0IHdoZXJlIHRoZSBibG9jayBzdGFydHMuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgbW9kZS5wcm9jZXNzQmxvY2soZGF0YS53b3Jkcywgb2Zmc2V0KTtcclxuICAgICAqL1xyXG4gICAgcHVibGljIHByb2Nlc3NCbG9jayh3b3JkczogQXJyYXk8bnVtYmVyPiwgb2Zmc2V0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9jaXBoZXIuZW5jcnlwdEJsb2NrKHdvcmRzLCBvZmZzZXQpO1xyXG4gICAgfVxyXG59Il19