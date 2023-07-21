
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/lib/BufferedBlockAlgorithm.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcbGliXFxCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUF3QztBQUN4QyxvQ0FBbUM7QUFHbkM7SUFXSSxnQ0FBWSxHQUFrQztRQVZ2QyxtQkFBYyxHQUFHLENBQUMsQ0FBQztRQVd0QixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDckIsU0FBUyxFQUFFLENBQUM7U0FDZixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRVIsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILHNDQUFLLEdBQUw7UUFDSSxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsd0NBQU8sR0FBUCxVQUFRLElBQXdCO1FBQzVCLDZEQUE2RDtRQUM3RCxJQUFHLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUN6QixJQUFJLEdBQUcsV0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQjtRQUVELFNBQVM7UUFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCx5Q0FBUSxHQUFSLFVBQVMsT0FBaUI7UUFDdEIsSUFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztTQUNsRDtRQUVELFlBQVk7UUFDWixJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFFOUMscUJBQXFCO1FBQ3JCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQztRQUN4RCxJQUFJLE9BQU8sRUFBRTtZQUNULHFDQUFxQztZQUNyQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0gsMENBQTBDO1lBQzFDLDJEQUEyRDtZQUMzRCxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3hFO1FBRUQsb0JBQW9CO1FBQ3BCLElBQU0sV0FBVyxHQUFHLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUV0RCxvQkFBb0I7UUFDcEIsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbkUsaUJBQWlCO1FBQ2pCLElBQUksY0FBYyxDQUFDO1FBQ25CLElBQUksV0FBVyxFQUFFO1lBQ2IsS0FBSyxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLFdBQVcsRUFBRSxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUU7Z0JBQ3JFLG1DQUFtQztnQkFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQzthQUNsRDtZQUVELHlCQUF5QjtZQUN6QixjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUM7U0FDdEM7UUFFRCx5QkFBeUI7UUFDekIsT0FBTyxJQUFJLHFCQUFTLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILHNDQUFLLEdBQUw7UUFDSSxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFakMsS0FBSSxJQUFNLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDcEIsSUFBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMxQixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzVCO1NBQ0o7UUFFRCxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFakMsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNMLDZCQUFDO0FBQUQsQ0FySUEsQUFxSUMsSUFBQTtBQXJJcUIsd0RBQXNCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV29yZEFycmF5IH0gZnJvbSAnLi9Xb3JkQXJyYXknO1xyXG5pbXBvcnQgeyBVdGY4IH0gZnJvbSAnLi4vZW5jL1V0ZjgnO1xyXG5pbXBvcnQgeyBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtQ29uZmlnIH0gZnJvbSAnLi9CdWZmZXJlZEJsb2NrQWxnb3JpdGhtQ29uZmlnJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtIHtcclxuICAgIHB1YmxpYyBfbWluQnVmZmVyU2l6ZSA9IDA7XHJcblxyXG4gICAgcHVibGljIF9kYXRhOiBXb3JkQXJyYXk7XHJcblxyXG4gICAgcHVibGljIF9uRGF0YUJ5dGVzOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGNmZzogQnVmZmVyZWRCbG9ja0FsZ29yaXRobUNvbmZpZztcclxuXHJcbiAgICBhYnN0cmFjdCBfZG9Qcm9jZXNzQmxvY2sod29yZEFycmF5OiBBcnJheTxudW1iZXI+LCBvZmZzZXQ6IG51bWJlcik6IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2ZnPzogQnVmZmVyZWRCbG9ja0FsZ29yaXRobUNvbmZpZykge1xyXG4gICAgICAgIHRoaXMuY2ZnID0gT2JqZWN0LmFzc2lnbih7XHJcbiAgICAgICAgICAgIGJsb2NrU2l6ZTogMVxyXG4gICAgICAgIH0sIGNmZyk7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWwgdmFsdWVzXHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IG5ldyBXb3JkQXJyYXkoKTtcclxuICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0cyB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGRhdGEgYnVmZmVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKlxyXG4gICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQoKTtcclxuICAgICAqL1xyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcclxuICAgICAgICB0aGlzLl9kYXRhID0gbmV3IFdvcmRBcnJheSgpO1xyXG4gICAgICAgIHRoaXMuX25EYXRhQnl0ZXMgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBuZXcgZGF0YSB0byB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGJ1ZmZlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBhcHBlbmQuIFN0cmluZ3MgYXJlIGNvbnZlcnRlZCB0byBhIFdvcmRBcnJheSB1c2luZyBVVEYtOC5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9hcHBlbmQoJ2RhdGEnKTtcclxuICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9hcHBlbmQod29yZEFycmF5KTtcclxuICAgICAqL1xyXG4gICAgX2FwcGVuZChkYXRhOiBzdHJpbmcgfCBXb3JkQXJyYXkpIHtcclxuICAgICAgICAvLyBDb252ZXJ0IHN0cmluZyB0byBXb3JkQXJyYXksIGVsc2UgYXNzdW1lIFdvcmRBcnJheSBhbHJlYWR5XHJcbiAgICAgICAgaWYodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSBVdGY4LnBhcnNlKGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXBwZW5kXHJcbiAgICAgICAgdGhpcy5fZGF0YS5jb25jYXQoZGF0YSk7XHJcbiAgICAgICAgdGhpcy5fbkRhdGFCeXRlcyArPSBkYXRhLnNpZ0J5dGVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvY2Vzc2VzIGF2YWlsYWJsZSBkYXRhIGJsb2Nrcy5cclxuICAgICAqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBpbnZva2VzIF9kb1Byb2Nlc3NCbG9jayhvZmZzZXQpLCB3aGljaCBtdXN0IGJlIGltcGxlbWVudGVkIGJ5IGEgY29uY3JldGUgc3VidHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZG9GbHVzaCBXaGV0aGVyIGFsbCBibG9ja3MgYW5kIHBhcnRpYWwgYmxvY2tzIHNob3VsZCBiZSBwcm9jZXNzZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBUaGUgcHJvY2Vzc2VkIGRhdGEuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgbGV0IHByb2Nlc3NlZERhdGEgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9wcm9jZXNzKCk7XHJcbiAgICAgKiAgICAgbGV0IHByb2Nlc3NlZERhdGEgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9wcm9jZXNzKCEhJ2ZsdXNoJyk7XHJcbiAgICAgKi9cclxuICAgIF9wcm9jZXNzKGRvRmx1c2g/OiBib29sZWFuKTogV29yZEFycmF5IHtcclxuICAgICAgICBpZighdGhpcy5jZmcuYmxvY2tTaXplKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyBibG9ja1NpemUgaW4gY29uZmlnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaG9ydGN1dHNcclxuICAgICAgICBjb25zdCBibG9ja1NpemVCeXRlcyA9IHRoaXMuY2ZnLmJsb2NrU2l6ZSAqIDQ7XHJcblxyXG4gICAgICAgIC8vIENvdW50IGJsb2NrcyByZWFkeVxyXG4gICAgICAgIGxldCBuQmxvY2tzUmVhZHkgPSB0aGlzLl9kYXRhLnNpZ0J5dGVzIC8gYmxvY2tTaXplQnl0ZXM7XHJcbiAgICAgICAgaWYgKGRvRmx1c2gpIHtcclxuICAgICAgICAgICAgLy8gUm91bmQgdXAgdG8gaW5jbHVkZSBwYXJ0aWFsIGJsb2Nrc1xyXG4gICAgICAgICAgICBuQmxvY2tzUmVhZHkgPSBNYXRoLmNlaWwobkJsb2Nrc1JlYWR5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBSb3VuZCBkb3duIHRvIGluY2x1ZGUgb25seSBmdWxsIGJsb2NrcyxcclxuICAgICAgICAgICAgLy8gbGVzcyB0aGUgbnVtYmVyIG9mIGJsb2NrcyB0aGF0IG11c3QgcmVtYWluIGluIHRoZSBidWZmZXJcclxuICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5tYXgoKG5CbG9ja3NSZWFkeSB8IDApIC0gdGhpcy5fbWluQnVmZmVyU2l6ZSwgMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDb3VudCB3b3JkcyByZWFkeVxyXG4gICAgICAgIGNvbnN0IG5Xb3Jkc1JlYWR5ID0gbkJsb2Nrc1JlYWR5ICogdGhpcy5jZmcuYmxvY2tTaXplO1xyXG5cclxuICAgICAgICAvLyBDb3VudCBieXRlcyByZWFkeVxyXG4gICAgICAgIGNvbnN0IG5CeXRlc1JlYWR5ID0gTWF0aC5taW4obldvcmRzUmVhZHkgKiA0LCB0aGlzLl9kYXRhLnNpZ0J5dGVzKTtcclxuXHJcbiAgICAgICAgLy8gUHJvY2VzcyBibG9ja3NcclxuICAgICAgICBsZXQgcHJvY2Vzc2VkV29yZHM7XHJcbiAgICAgICAgaWYgKG5Xb3Jkc1JlYWR5KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG9mZnNldCA9IDA7IG9mZnNldCA8IG5Xb3Jkc1JlYWR5OyBvZmZzZXQgKz0gdGhpcy5jZmcuYmxvY2tTaXplKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWFsZ29yaXRobSBsb2dpY1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZG9Qcm9jZXNzQmxvY2sodGhpcy5fZGF0YS53b3Jkcywgb2Zmc2V0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHByb2Nlc3NlZCB3b3Jkc1xyXG4gICAgICAgICAgICBwcm9jZXNzZWRXb3JkcyA9IHRoaXMuX2RhdGEud29yZHMuc3BsaWNlKDAsIG5Xb3Jkc1JlYWR5KTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YS5zaWdCeXRlcyAtPSBuQnl0ZXNSZWFkeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiBwcm9jZXNzZWQgd29yZHNcclxuICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheShwcm9jZXNzZWRXb3JkcywgbkJ5dGVzUmVhZHkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBUaGUgY2xvbmUuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgbGV0IGNsb25lID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5jbG9uZSgpO1xyXG4gICAgICovXHJcbiAgICBjbG9uZSgpOiBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtIHtcclxuICAgICAgICBjb25zdCBjbG9uZSA9IHRoaXMuY29uc3RydWN0b3IoKTtcclxuXHJcbiAgICAgICAgZm9yKGNvbnN0IGF0dHIgaW4gdGhpcykge1xyXG4gICAgICAgICAgICBpZih0aGlzLmhhc093blByb3BlcnR5KGF0dHIpKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9uZVthdHRyXSA9IHRoaXNbYXR0cl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsb25lLl9kYXRhID0gdGhpcy5fZGF0YS5jbG9uZSgpO1xyXG5cclxuICAgICAgICByZXR1cm4gY2xvbmU7XHJcbiAgICB9XHJcbn0iXX0=