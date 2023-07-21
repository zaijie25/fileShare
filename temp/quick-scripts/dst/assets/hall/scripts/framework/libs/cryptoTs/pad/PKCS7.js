
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/pad/PKCS7.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '31893fRag5P47nJUvu/hG5a', 'PKCS7');
// hall/scripts/framework/libs/cryptoTs/pad/PKCS7.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PKCS7 = void 0;
var WordArray_1 = require("../lib/WordArray");
var PKCS7 = /** @class */ (function () {
    function PKCS7() {
    }
    /**
     * Pads data using the algorithm defined in PKCS #5/7.
     *
     * @param data The data to pad.
     * @param blockSize The multiple that the data should be padded to.
     *
     * @example
     *
     *     PKCS7.pad(wordArray, 4);
     */
    PKCS7.pad = function (data, blockSize) {
        // Shortcut
        var blockSizeBytes = blockSize * 4;
        // Count padding bytes
        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
        // Create padding word
        var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;
        // Create padding
        var paddingWords = [];
        for (var i = 0; i < nPaddingBytes; i += 4) {
            paddingWords.push(paddingWord);
        }
        var padding = new WordArray_1.WordArray(paddingWords, nPaddingBytes);
        // Add padding
        data.concat(padding);
    };
    /**
     * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
     *
     * @param data The data to unpad.
     *
     * @example
     *
     *     PKCS7.unpad(wordArray);
     */
    PKCS7.unpad = function (data) {
        // Get number of padding bytes from last byte
        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
        // Remove padding
        data.sigBytes -= nPaddingBytes;
    };
    return PKCS7;
}());
exports.PKCS7 = PKCS7;
// type guard for the formatter (to ensure it has the required static methods)
var _ = PKCS7;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xccGFkXFxQS0NTNy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBNkM7QUFHN0M7SUFBQTtJQWdEQSxDQUFDO0lBL0NHOzs7Ozs7Ozs7T0FTRztJQUNXLFNBQUcsR0FBakIsVUFBa0IsSUFBZSxFQUFFLFNBQWlCO1FBQ2hELFdBQVc7UUFDWCxJQUFNLGNBQWMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRXJDLHNCQUFzQjtRQUN0QixJQUFNLGFBQWEsR0FBRyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFjLENBQUM7UUFFdEUsc0JBQXNCO1FBQ3RCLElBQU0sV0FBVyxHQUFHLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQztRQUV6RyxpQkFBaUI7UUFDakIsSUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN2QyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsSUFBTSxPQUFPLEdBQUcsSUFBSSxxQkFBUyxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUUzRCxjQUFjO1FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDVyxXQUFLLEdBQW5CLFVBQW9CLElBQWU7UUFDL0IsNkNBQTZDO1FBQzdDLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUVuRSxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLFFBQVEsSUFBSSxhQUFhLENBQUM7SUFDbkMsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQWhEQSxBQWdEQyxJQUFBO0FBaERZLHNCQUFLO0FBa0RsQiw4RUFBOEU7QUFDOUUsSUFBTSxDQUFDLEdBQVksS0FBSyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV29yZEFycmF5IH0gZnJvbSAnLi4vbGliL1dvcmRBcnJheSc7XHJcbmltcG9ydCB7IFBhZGRpbmcgfSBmcm9tICcuL1BhZGRpbmcnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBLQ1M3IHtcclxuICAgIC8qKlxyXG4gICAgICogUGFkcyBkYXRhIHVzaW5nIHRoZSBhbGdvcml0aG0gZGVmaW5lZCBpbiBQS0NTICM1LzcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gcGFkLlxyXG4gICAgICogQHBhcmFtIGJsb2NrU2l6ZSBUaGUgbXVsdGlwbGUgdGhhdCB0aGUgZGF0YSBzaG91bGQgYmUgcGFkZGVkIHRvLlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKlxyXG4gICAgICogICAgIFBLQ1M3LnBhZCh3b3JkQXJyYXksIDQpO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHBhZChkYXRhOiBXb3JkQXJyYXksIGJsb2NrU2l6ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgLy8gU2hvcnRjdXRcclxuICAgICAgICBjb25zdCBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XHJcblxyXG4gICAgICAgIC8vIENvdW50IHBhZGRpbmcgYnl0ZXNcclxuICAgICAgICBjb25zdCBuUGFkZGluZ0J5dGVzID0gYmxvY2tTaXplQnl0ZXMgLSBkYXRhLnNpZ0J5dGVzICUgYmxvY2tTaXplQnl0ZXM7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBwYWRkaW5nIHdvcmRcclxuICAgICAgICBjb25zdCBwYWRkaW5nV29yZCA9IChuUGFkZGluZ0J5dGVzIDw8IDI0KSB8IChuUGFkZGluZ0J5dGVzIDw8IDE2KSB8IChuUGFkZGluZ0J5dGVzIDw8IDgpIHwgblBhZGRpbmdCeXRlcztcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIHBhZGRpbmdcclxuICAgICAgICBjb25zdCBwYWRkaW5nV29yZHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5QYWRkaW5nQnl0ZXM7IGkgKz0gNCkge1xyXG4gICAgICAgICAgICBwYWRkaW5nV29yZHMucHVzaChwYWRkaW5nV29yZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBhZGRpbmcgPSBuZXcgV29yZEFycmF5KHBhZGRpbmdXb3JkcywgblBhZGRpbmdCeXRlcyk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBwYWRkaW5nXHJcbiAgICAgICAgZGF0YS5jb25jYXQocGFkZGluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbnBhZHMgZGF0YSB0aGF0IGhhZCBiZWVuIHBhZGRlZCB1c2luZyB0aGUgYWxnb3JpdGhtIGRlZmluZWQgaW4gUEtDUyAjNS83LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIHVucGFkLlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKlxyXG4gICAgICogICAgIFBLQ1M3LnVucGFkKHdvcmRBcnJheSk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdW5wYWQoZGF0YTogV29yZEFycmF5KTogdm9pZCB7XHJcbiAgICAgICAgLy8gR2V0IG51bWJlciBvZiBwYWRkaW5nIGJ5dGVzIGZyb20gbGFzdCBieXRlXHJcbiAgICAgICAgY29uc3QgblBhZGRpbmdCeXRlcyA9IGRhdGEud29yZHNbKGRhdGEuc2lnQnl0ZXMgLSAxKSA+Pj4gMl0gJiAweGZmO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgcGFkZGluZ1xyXG4gICAgICAgIGRhdGEuc2lnQnl0ZXMgLT0gblBhZGRpbmdCeXRlcztcclxuICAgIH1cclxufVxyXG5cclxuLy8gdHlwZSBndWFyZCBmb3IgdGhlIGZvcm1hdHRlciAodG8gZW5zdXJlIGl0IGhhcyB0aGUgcmVxdWlyZWQgc3RhdGljIG1ldGhvZHMpXHJcbmNvbnN0IF86IFBhZGRpbmcgPSBQS0NTNzsiXX0=