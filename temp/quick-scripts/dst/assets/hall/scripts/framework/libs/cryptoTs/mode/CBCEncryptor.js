
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/mode/CBCEncryptor.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80b5dpprPpCKrmBUUXzpp4X', 'CBCEncryptor');
// hall/scripts/framework/libs/cryptoTs/mode/CBCEncryptor.ts

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
exports.CBCEncryptor = void 0;
var BlockCipherModeAlgorithm_1 = require("./BlockCipherModeAlgorithm");
var CBCEncryptor = /** @class */ (function (_super) {
    __extends(CBCEncryptor, _super);
    function CBCEncryptor() {
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
    CBCEncryptor.prototype.processBlock = function (words, offset) {
        // Check if we have a blockSize
        if (this._cipher.cfg.blockSize === undefined) {
            throw new Error('missing blockSize in cipher config');
        }
        // XOR and encrypt
        this.xorBlock(words, offset, this._cipher.cfg.blockSize);
        this._cipher.encryptBlock(words, offset);
        // Remember this block to use with next block
        this._prevBlock = words.slice(offset, offset + this._cipher.cfg.blockSize);
    };
    CBCEncryptor.prototype.xorBlock = function (words, offset, blockSize) {
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
    return CBCEncryptor;
}(BlockCipherModeAlgorithm_1.BlockCipherModeAlgorithm));
exports.CBCEncryptor = CBCEncryptor;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcbW9kZVxcQ0JDRW5jcnlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1RUFBc0U7QUFFdEU7SUFBa0MsZ0NBQXdCO0lBQTFEOztJQStDQSxDQUFDO0lBNUNHOzs7Ozs7Ozs7T0FTRztJQUNJLG1DQUFZLEdBQW5CLFVBQW9CLEtBQW9CLEVBQUUsTUFBYztRQUNwRCwrQkFBK0I7UUFDL0IsSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztTQUN6RDtRQUVELGtCQUFrQjtRQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXpDLDZDQUE2QztRQUM3QyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU0sK0JBQVEsR0FBZixVQUFnQixLQUFvQixFQUFFLE1BQWMsRUFBRSxTQUFpQjtRQUNuRSxzQkFBc0I7UUFDdEIsSUFBSSxLQUFLLENBQUM7UUFDVixJQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVCxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUVqQixrQ0FBa0M7WUFDbEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7U0FDeEI7YUFBTTtZQUNILEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQzNCO1FBRUQsdUVBQXVFO1FBQ3ZFLElBQUcsS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUNwQixhQUFhO1lBQ2IsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDL0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakM7U0FDSjtJQUNMLENBQUM7SUFDTCxtQkFBQztBQUFELENBL0NBLEFBK0NDLENBL0NpQyxtREFBd0IsR0ErQ3pEO0FBL0NZLG9DQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmxvY2tDaXBoZXJNb2RlQWxnb3JpdGhtIH0gZnJvbSAnLi9CbG9ja0NpcGhlck1vZGVBbGdvcml0aG0nO1xyXG5cclxuZXhwb3J0IGNsYXNzIENCQ0VuY3J5cHRvciBleHRlbmRzIEJsb2NrQ2lwaGVyTW9kZUFsZ29yaXRobSB7XHJcbiAgICBwdWJsaWMgX3ByZXZCbG9jazogQXJyYXk8bnVtYmVyPiB8IHVuZGVmaW5lZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb2Nlc3NlcyB0aGUgZGF0YSBibG9jayBhdCBvZmZzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHdvcmRzIFRoZSBkYXRhIHdvcmRzIHRvIG9wZXJhdGUgb24uXHJcbiAgICAgKiBAcGFyYW0gb2Zmc2V0IFRoZSBvZmZzZXQgd2hlcmUgdGhlIGJsb2NrIHN0YXJ0cy5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBtb2RlLnByb2Nlc3NCbG9jayhkYXRhLndvcmRzLCBvZmZzZXQpO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcHJvY2Vzc0Jsb2NrKHdvcmRzOiBBcnJheTxudW1iZXI+LCBvZmZzZXQ6IG51bWJlcikge1xyXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIGhhdmUgYSBibG9ja1NpemVcclxuICAgICAgICBpZih0aGlzLl9jaXBoZXIuY2ZnLmJsb2NrU2l6ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyBibG9ja1NpemUgaW4gY2lwaGVyIGNvbmZpZycpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gWE9SIGFuZCBlbmNyeXB0XHJcbiAgICAgICAgdGhpcy54b3JCbG9jayh3b3Jkcywgb2Zmc2V0LCB0aGlzLl9jaXBoZXIuY2ZnLmJsb2NrU2l6ZSk7XHJcbiAgICAgICAgdGhpcy5fY2lwaGVyLmVuY3J5cHRCbG9jayh3b3Jkcywgb2Zmc2V0KTtcclxuXHJcbiAgICAgICAgLy8gUmVtZW1iZXIgdGhpcyBibG9jayB0byB1c2Ugd2l0aCBuZXh0IGJsb2NrXHJcbiAgICAgICAgdGhpcy5fcHJldkJsb2NrID0gd29yZHMuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0aGlzLl9jaXBoZXIuY2ZnLmJsb2NrU2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHhvckJsb2NrKHdvcmRzOiBBcnJheTxudW1iZXI+LCBvZmZzZXQ6IG51bWJlciwgYmxvY2tTaXplOiBudW1iZXIpIHtcclxuICAgICAgICAvLyBDaG9vc2UgbWl4aW5nIGJsb2NrXHJcbiAgICAgICAgbGV0IGJsb2NrO1xyXG4gICAgICAgIGlmKHRoaXMuX2l2KSB7XHJcbiAgICAgICAgICAgIGJsb2NrID0gdGhpcy5faXY7XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgSVYgZm9yIHN1YnNlcXVlbnQgYmxvY2tzXHJcbiAgICAgICAgICAgIHRoaXMuX2l2ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJsb2NrID0gdGhpcy5fcHJldkJsb2NrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYmxvY2sgc2hvdWxkIG5ldmVyIGJlIHVuZGVmaW5lZCBidXQgd2Ugd2FudCB0byBtYWtlIHR5cGVzY3JpcHQgaGFwcHlcclxuICAgICAgICBpZihibG9jayAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vIFhPUiBibG9ja3NcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGJsb2NrU2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB3b3Jkc1tvZmZzZXQgKyBpXSBePSBibG9ja1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==