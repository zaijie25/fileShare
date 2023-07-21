"use strict";
cc._RF.push(module, '61f4dRaZc5NxIixnFhYu9Cu', 'BufferedBlockAlgorithm');
// hall/scripts/framework/libs/cryptoTs/lib/BufferedBlockAlgorithm.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferedBlockAlgorithm = void 0;
var WordArray_1 = require("./WordArray");
var Utf8_1 = require("../enc/Utf8");
var BufferedBlockAlgorithm = /** @class */ (function () {
    function BufferedBlockAlgorithm(cfg) {
        this._minBufferSize = 0;
        this.cfg = Object.assign({
            blockSize: 1
        }, cfg);
        // Initial values
        this._data = new WordArray_1.WordArray();
        this._nDataBytes = 0;
    }
    /**
     * Resets this block algorithm's data buffer to its initial state.
     *
     * @example
     *
     *     bufferedBlockAlgorithm.reset();
     */
    BufferedBlockAlgorithm.prototype.reset = function () {
        // Initial values
        this._data = new WordArray_1.WordArray();
        this._nDataBytes = 0;
    };
    /**
     * Adds new data to this block algorithm's buffer.
     *
     * @param data The data to append. Strings are converted to a WordArray using UTF-8.
     *
     * @example
     *
     *     bufferedBlockAlgorithm._append('data');
     *     bufferedBlockAlgorithm._append(wordArray);
     */
    BufferedBlockAlgorithm.prototype._append = function (data) {
        // Convert string to WordArray, else assume WordArray already
        if (typeof data === 'string') {
            data = Utf8_1.Utf8.parse(data);
        }
        // Append
        this._data.concat(data);
        this._nDataBytes += data.sigBytes;
    };
    /**
     * Processes available data blocks.
     *
     * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
     *
     * @param doFlush Whether all blocks and partial blocks should be processed.
     *
     * @return The processed data.
     *
     * @example
     *
     *     let processedData = bufferedBlockAlgorithm._process();
     *     let processedData = bufferedBlockAlgorithm._process(!!'flush');
     */
    BufferedBlockAlgorithm.prototype._process = function (doFlush) {
        if (!this.cfg.blockSize) {
            throw new Error('missing blockSize in config');
        }
        // Shortcuts
        var blockSizeBytes = this.cfg.blockSize * 4;
        // Count blocks ready
        var nBlocksReady = this._data.sigBytes / blockSizeBytes;
        if (doFlush) {
            // Round up to include partial blocks
            nBlocksReady = Math.ceil(nBlocksReady);
        }
        else {
            // Round down to include only full blocks,
            // less the number of blocks that must remain in the buffer
            nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
        }
        // Count words ready
        var nWordsReady = nBlocksReady * this.cfg.blockSize;
        // Count bytes ready
        var nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
        // Process blocks
        var processedWords;
        if (nWordsReady) {
            for (var offset = 0; offset < nWordsReady; offset += this.cfg.blockSize) {
                // Perform concrete-algorithm logic
                this._doProcessBlock(this._data.words, offset);
            }
            // Remove processed words
            processedWords = this._data.words.splice(0, nWordsReady);
            this._data.sigBytes -= nBytesReady;
        }
        // Return processed words
        return new WordArray_1.WordArray(processedWords, nBytesReady);
    };
    /**
     * Creates a copy of this object.
     *
     * @return The clone.
     *
     * @example
     *
     *     let clone = bufferedBlockAlgorithm.clone();
     */
    BufferedBlockAlgorithm.prototype.clone = function () {
        var clone = this.constructor();
        for (var attr in this) {
            if (this.hasOwnProperty(attr)) {
                clone[attr] = this[attr];
            }
        }
        clone._data = this._data.clone();
        return clone;
    };
    return BufferedBlockAlgorithm;
}());
exports.BufferedBlockAlgorithm = BufferedBlockAlgorithm;

cc._RF.pop();