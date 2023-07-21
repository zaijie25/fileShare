"use strict";
cc._RF.push(module, 'b1dfevA/cBGtJtXU9B+zJY2', 'BlockCipher');
// hall/scripts/framework/libs/cryptoTs/lib/BlockCipher.ts

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
exports.BlockCipher = void 0;
var Cipher_1 = require("./Cipher");
var CBC_1 = require("../mode/CBC");
var PKCS7_1 = require("../pad/PKCS7");
var BlockCipher = /** @class */ (function (_super) {
    __extends(BlockCipher, _super);
    function BlockCipher(xformMode, key, cfg) {
        return _super.call(this, xformMode, key, Object.assign({
            // default: 128 / 32
            blockSize: 4,
            mode: CBC_1.CBC,
            padding: PKCS7_1.PKCS7
        }, cfg)) || this;
    }
    BlockCipher.prototype.reset = function () {
        // Reset cipher
        _super.prototype.reset.call(this);
        // Check if we have a blockSize
        if (this.cfg.mode === undefined) {
            throw new Error('missing mode in config');
        }
        // Reset block mode
        var modeCreator;
        if (this._xformMode === this.constructor._ENC_XFORM_MODE) {
            modeCreator = this.cfg.mode.createEncryptor;
        }
        else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
            modeCreator = this.cfg.mode.createDecryptor;
            // Keep at least one block in the buffer for unpadding
            this._minBufferSize = 1;
        }
        if (this._mode && this._mode.__creator === modeCreator) {
            this._mode.init(this, this.cfg.iv && this.cfg.iv.words);
        }
        else {
            this._mode = modeCreator.call(this.cfg.mode, this, this.cfg.iv && this.cfg.iv.words);
            this._mode.__creator = modeCreator;
        }
    };
    BlockCipher.prototype._doProcessBlock = function (words, offset) {
        this._mode.processBlock(words, offset);
    };
    BlockCipher.prototype._doFinalize = function () {
        // Check if we have a padding strategy
        if (this.cfg.padding === undefined) {
            throw new Error('missing padding in config');
        }
        // Finalize
        var finalProcessedBlocks;
        if (this._xformMode === this.constructor._ENC_XFORM_MODE) {
            // Check if we have a blockSize
            if (this.cfg.blockSize === undefined) {
                throw new Error('missing blockSize in config');
            }
            // Pad data
            this.cfg.padding.pad(this._data, this.cfg.blockSize);
            // Process final blocks
            finalProcessedBlocks = this._process(!!'flush');
        }
        else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
            // Process final blocks
            finalProcessedBlocks = this._process(!!'flush');
            // Unpad data
            this.cfg.padding.unpad(finalProcessedBlocks);
        }
        return finalProcessedBlocks;
    };
    return BlockCipher;
}(Cipher_1.Cipher));
exports.BlockCipher = BlockCipher;

cc._RF.pop();