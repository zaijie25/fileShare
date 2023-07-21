"use strict";
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