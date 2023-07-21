
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/mode/CBCDecryptor.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6f5eacu8SJP36Ou6zLBcAEG', 'CBCDecryptor');
// hall/scripts/framework/libs/cryptoTs/mode/CBCDecryptor.ts

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
exports.CBCDecryptor = void 0;
var BlockCipherModeAlgorithm_1 = require("./BlockCipherModeAlgorithm");
var CBCDecryptor = /** @class */ (function (_super) {
    __extends(CBCDecryptor, _super);
    function CBCDecryptor() {
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
    CBCDecryptor.prototype.processBlock = function (words, offset) {
        // Check if we have a blockSize
        if (this._cipher.cfg.blockSize === undefined) {
            throw new Error('missing blockSize in cipher config');
        }
        // Remember this block to use with next block
        var thisBlock = words.slice(offset, offset + this._cipher.cfg.blockSize);
        // Decrypt and XOR
        this._cipher.decryptBlock(words, offset);
        this.xorBlock(words, offset, this._cipher.cfg.blockSize);
        // This block becomes the previous block
        this._prevBlock = thisBlock;
    };
    CBCDecryptor.prototype.xorBlock = function (words, offset, blockSize) {
        // Choose mixing block
        var block;
        if (this._iv) {
            block = this._iv;
            // Remove IV for subsequent blocks
            this._iv = undefined;
        }
        else {
            block = this._prevBlock;
        }
        // block should never be undefined but we want to make typescript happy
        if (block !== undefined) {
            // XOR blocks
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= block[i];
            }
        }
    };
    return CBCDecryptor;
}(BlockCipherModeAlgorithm_1.BlockCipherModeAlgorithm));
exports.CBCDecryptor = CBCDecryptor;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcbW9kZVxcQ0JDRGVjcnlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1RUFBc0U7QUFFdEU7SUFBa0MsZ0NBQXdCO0lBQTFEOztJQWtEQSxDQUFDO0lBL0NHOzs7Ozs7Ozs7T0FTRztJQUNJLG1DQUFZLEdBQW5CLFVBQW9CLEtBQW9CLEVBQUUsTUFBYztRQUNwRCwrQkFBK0I7UUFDL0IsSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztTQUN6RDtRQUVELDZDQUE2QztRQUM3QyxJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFM0Usa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFekQsd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFFTSwrQkFBUSxHQUFmLFVBQWdCLEtBQW9CLEVBQUUsTUFBYyxFQUFFLFNBQWlCO1FBQ25FLHNCQUFzQjtRQUN0QixJQUFJLEtBQUssQ0FBQztRQUNWLElBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNULEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBRWpCLGtDQUFrQztZQUNsQyxJQUFJLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztTQUN4QjthQUFNO1lBQ0gsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDM0I7UUFFRCx1RUFBdUU7UUFDdkUsSUFBRyxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3BCLGFBQWE7WUFDYixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMvQixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztTQUNKO0lBQ0wsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FsREEsQUFrREMsQ0FsRGlDLG1EQUF3QixHQWtEekQ7QUFsRFksb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCbG9ja0NpcGhlck1vZGVBbGdvcml0aG0gfSBmcm9tICcuL0Jsb2NrQ2lwaGVyTW9kZUFsZ29yaXRobSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ0JDRGVjcnlwdG9yIGV4dGVuZHMgQmxvY2tDaXBoZXJNb2RlQWxnb3JpdGhtIHtcclxuICAgIHB1YmxpYyBfcHJldkJsb2NrOiBBcnJheTxudW1iZXI+IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2VzIHRoZSBkYXRhIGJsb2NrIGF0IG9mZnNldC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gd29yZHMgVGhlIGRhdGEgd29yZHMgdG8gb3BlcmF0ZSBvbi5cclxuICAgICAqIEBwYXJhbSBvZmZzZXQgVGhlIG9mZnNldCB3aGVyZSB0aGUgYmxvY2sgc3RhcnRzLlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKlxyXG4gICAgICogICAgIG1vZGUucHJvY2Vzc0Jsb2NrKGRhdGEud29yZHMsIG9mZnNldCk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwcm9jZXNzQmxvY2sod29yZHM6IEFycmF5PG51bWJlcj4sIG9mZnNldDogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UgaGF2ZSBhIGJsb2NrU2l6ZVxyXG4gICAgICAgIGlmKHRoaXMuX2NpcGhlci5jZmcuYmxvY2tTaXplID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIGJsb2NrU2l6ZSBpbiBjaXBoZXIgY29uZmlnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZW1lbWJlciB0aGlzIGJsb2NrIHRvIHVzZSB3aXRoIG5leHQgYmxvY2tcclxuICAgICAgICBjb25zdCB0aGlzQmxvY2sgPSB3b3Jkcy5zbGljZShvZmZzZXQsIG9mZnNldCArIHRoaXMuX2NpcGhlci5jZmcuYmxvY2tTaXplKTtcclxuXHJcbiAgICAgICAgLy8gRGVjcnlwdCBhbmQgWE9SXHJcbiAgICAgICAgdGhpcy5fY2lwaGVyLmRlY3J5cHRCbG9jayh3b3Jkcywgb2Zmc2V0KTtcclxuICAgICAgICB0aGlzLnhvckJsb2NrKHdvcmRzLCBvZmZzZXQsIHRoaXMuX2NpcGhlci5jZmcuYmxvY2tTaXplKTtcclxuXHJcbiAgICAgICAgLy8gVGhpcyBibG9jayBiZWNvbWVzIHRoZSBwcmV2aW91cyBibG9ja1xyXG4gICAgICAgIHRoaXMuX3ByZXZCbG9jayA9IHRoaXNCbG9jaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgeG9yQmxvY2sod29yZHM6IEFycmF5PG51bWJlcj4sIG9mZnNldDogbnVtYmVyLCBibG9ja1NpemU6IG51bWJlcikge1xyXG4gICAgICAgIC8vIENob29zZSBtaXhpbmcgYmxvY2tcclxuICAgICAgICBsZXQgYmxvY2s7XHJcbiAgICAgICAgaWYodGhpcy5faXYpIHtcclxuICAgICAgICAgICAgYmxvY2sgPSB0aGlzLl9pdjtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBJViBmb3Igc3Vic2VxdWVudCBibG9ja3NcclxuICAgICAgICAgICAgdGhpcy5faXYgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYmxvY2sgPSB0aGlzLl9wcmV2QmxvY2s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBibG9jayBzaG91bGQgbmV2ZXIgYmUgdW5kZWZpbmVkIGJ1dCB3ZSB3YW50IHRvIG1ha2UgdHlwZXNjcmlwdCBoYXBweVxyXG4gICAgICAgIGlmKGJsb2NrICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gWE9SIGJsb2Nrc1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYmxvY2tTaXplOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHdvcmRzW29mZnNldCArIGldIF49IGJsb2NrW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19