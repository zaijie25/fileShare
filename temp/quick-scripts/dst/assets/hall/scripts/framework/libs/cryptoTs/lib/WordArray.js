
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/lib/WordArray.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '706cdinkTJEj4Bp36iwQagP', 'WordArray');
// hall/scripts/framework/libs/cryptoTs/lib/WordArray.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordArray = void 0;
var Hex_1 = require("../enc/Hex");
var WordArray = /** @class */ (function () {
    /**
     * Initializes a newly created word array.
     *
     * @param words (Optional) An array of 32-bit words.
     * @param sigBytes (Optional) The number of significant bytes in the words.
     *
     * @example
     *
     *     let wordArray = new WordArray();
     *     let wordArray = new WordArray([0x00010203, 0x04050607]);
     *     let wordArray = new WordArray([0x00010203, 0x04050607], 6);
     */
    function WordArray(words, sigBytes) {
        this.words = words || [];
        if (sigBytes !== undefined) {
            this.sigBytes = sigBytes;
        }
        else {
            this.sigBytes = this.words.length * 4;
        }
    }
    /**
     * Creates a word array filled with random bytes.
     *
     * @param nBytes The number of random bytes to generate.
     *
     * @return The random word array.
     *
     * @example
     *
     *     let wordArray = WordArray.random(16);
     */
    WordArray.random = function (nBytes) {
        var words = [];
        var r = (function (m_w) {
            var m_z = 0x3ade68b1;
            var mask = 0xffffffff;
            return function () {
                m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
                m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
                var result = ((m_z << 0x10) + m_w) & mask;
                result /= 0x100000000;
                result += 0.5;
                return result * (Math.random() > .5 ? 1 : -1);
            };
        });
        for (var i = 0, rcache = void 0; i < nBytes; i += 4) {
            var _r = r((rcache || Math.random()) * 0x100000000);
            rcache = _r() * 0x3ade67b7;
            words.push((_r() * 0x100000000) | 0);
        }
        return new WordArray(words, nBytes);
    };
    /**
     * Converts this word array to a string.
     *
     * @param encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
     *
     * @return The stringified word array.
     *
     * @example
     *
     *     let string = wordArray + '';
     *     let string = wordArray.toString();
     *     let string = wordArray.toString(CryptoJS.enc.Utf8);
     */
    WordArray.prototype.toString = function (encoder) {
        return (encoder || Hex_1.Hex).stringify(this);
    };
    /**
     * Concatenates a word array to this word array.
     *
     * @param wordArray The word array to append.
     *
     * @return This word array.
     *
     * @example
     *
     *     wordArray1.concat(wordArray2);
     */
    WordArray.prototype.concat = function (wordArray) {
        // Clamp excess bits
        this.clamp();
        // Concat
        if (this.sigBytes % 4) {
            // Copy one byte at a time
            for (var i = 0; i < wordArray.sigBytes; i++) {
                var thatByte = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                this.words[(this.sigBytes + i) >>> 2] |= thatByte << (24 - ((this.sigBytes + i) % 4) * 8);
            }
        }
        else {
            // Copy one word at a time
            for (var i = 0; i < wordArray.sigBytes; i += 4) {
                this.words[(this.sigBytes + i) >>> 2] = wordArray.words[i >>> 2];
            }
        }
        this.sigBytes += wordArray.sigBytes;
        // Chainable
        return this;
    };
    /**
     * Removes insignificant bits.
     *
     * @example
     *
     *     wordArray.clamp();
     */
    WordArray.prototype.clamp = function () {
        // Clamp
        this.words[this.sigBytes >>> 2] &= 0xffffffff << (32 - (this.sigBytes % 4) * 8);
        this.words.length = Math.ceil(this.sigBytes / 4);
    };
    /**
     * Creates a copy of this word array.
     *
     * @return The clone.
     *
     * @example
     *
     *     let clone = wordArray.clone();
     */
    WordArray.prototype.clone = function () {
        return new WordArray(this.words.slice(0), this.sigBytes);
    };
    return WordArray;
}());
exports.WordArray = WordArray;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcbGliXFxXb3JkQXJyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0NBQWlDO0FBRWpDO0lBNENJOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsbUJBQVksS0FBcUIsRUFBRSxRQUFpQjtRQUNoRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFFekIsSUFBRyxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQzVCO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUN6QztJQUNMLENBQUM7SUEzREQ7Ozs7Ozs7Ozs7T0FVRztJQUNXLGdCQUFNLEdBQXBCLFVBQXFCLE1BQWM7UUFDL0IsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWpCLElBQU0sQ0FBQyxHQUFHLENBQUMsVUFBUyxHQUFXO1lBQzNCLElBQUksR0FBRyxHQUFHLFVBQVUsQ0FBQztZQUVyQixJQUFNLElBQUksR0FBRyxVQUFVLENBQUM7WUFFeEIsT0FBTztnQkFDSCxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZELEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDdkQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzFDLE1B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RyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gseUJBQUssR0FBTDtRQUNJLE9BQU8sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFDTCxnQkFBQztBQUFELENBOUlBLEFBOElDLElBQUE7QUE5SVksOEJBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbmNvZGluZyB9IGZyb20gJy4uL2VuYy9FbmNvZGluZyc7XHJcbmltcG9ydCB7IEhleCB9IGZyb20gJy4uL2VuYy9IZXgnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmRBcnJheSB7XHJcbiAgICB3b3JkczogQXJyYXk8bnVtYmVyPjtcclxuXHJcbiAgICBzaWdCeXRlczogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIHdvcmQgYXJyYXkgZmlsbGVkIHdpdGggcmFuZG9tIGJ5dGVzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBuQnl0ZXMgVGhlIG51bWJlciBvZiByYW5kb20gYnl0ZXMgdG8gZ2VuZXJhdGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBUaGUgcmFuZG9tIHdvcmQgYXJyYXkuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgbGV0IHdvcmRBcnJheSA9IFdvcmRBcnJheS5yYW5kb20oMTYpO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJhbmRvbShuQnl0ZXM6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHdvcmRzID0gW107XHJcblxyXG4gICAgICAgIGNvbnN0IHIgPSAoZnVuY3Rpb24obV93OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgbGV0IG1feiA9IDB4M2FkZTY4YjE7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtYXNrID0gMHhmZmZmZmZmZjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIG1feiA9ICgweDkwNjkgKiAobV96ICYgMHhGRkZGKSArIChtX3ogPj4gMHgxMCkpICYgbWFzaztcclxuICAgICAgICAgICAgICAgIG1fdyA9ICgweDQ2NTAgKiAobV93ICYgMHhGRkZGKSArIChtX3cgPj4gMHgxMCkpICYgbWFzaztcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSAoKG1feiA8PCAweDEwKSArIG1fdykgJiBtYXNrO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0IC89IDB4MTAwMDAwMDAwO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IDAuNTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQgKiAoTWF0aC5yYW5kb20oKSA+IC41ID8gMSA6IC0xKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMCwgcmNhY2hlOyBpIDwgbkJ5dGVzOyBpICs9IDQpIHtcclxuICAgICAgICAgICAgY29uc3QgX3IgPSByKChyY2FjaGUgfHwgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwMDAwMCk7XHJcblxyXG4gICAgICAgICAgICByY2FjaGUgPSBfcigpICogMHgzYWRlNjdiNztcclxuICAgICAgICAgICAgd29yZHMucHVzaCgoX3IoKSAqIDB4MTAwMDAwMDAwKSB8IDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkod29yZHMsIG5CeXRlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgd29yZCBhcnJheS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gd29yZHMgKE9wdGlvbmFsKSBBbiBhcnJheSBvZiAzMi1iaXQgd29yZHMuXHJcbiAgICAgKiBAcGFyYW0gc2lnQnl0ZXMgKE9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoZSB3b3Jkcy5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBsZXQgd29yZEFycmF5ID0gbmV3IFdvcmRBcnJheSgpO1xyXG4gICAgICogICAgIGxldCB3b3JkQXJyYXkgPSBuZXcgV29yZEFycmF5KFsweDAwMDEwMjAzLCAweDA0MDUwNjA3XSk7XHJcbiAgICAgKiAgICAgbGV0IHdvcmRBcnJheSA9IG5ldyBXb3JkQXJyYXkoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddLCA2KTtcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Iod29yZHM/OiBBcnJheTxudW1iZXI+LCBzaWdCeXRlcz86IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMud29yZHMgPSB3b3JkcyB8fCBbXTtcclxuXHJcbiAgICAgICAgaWYoc2lnQnl0ZXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gc2lnQnl0ZXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyA9IHRoaXMud29yZHMubGVuZ3RoICogNDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyB0aGlzIHdvcmQgYXJyYXkgdG8gYSBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGVuY29kZXIgKE9wdGlvbmFsKSBUaGUgZW5jb2Rpbmcgc3RyYXRlZ3kgdG8gdXNlLiBEZWZhdWx0OiBDcnlwdG9KUy5lbmMuSGV4XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBUaGUgc3RyaW5naWZpZWQgd29yZCBhcnJheS5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBsZXQgc3RyaW5nID0gd29yZEFycmF5ICsgJyc7XHJcbiAgICAgKiAgICAgbGV0IHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZygpO1xyXG4gICAgICogICAgIGxldCBzdHJpbmcgPSB3b3JkQXJyYXkudG9TdHJpbmcoQ3J5cHRvSlMuZW5jLlV0ZjgpO1xyXG4gICAgICovXHJcbiAgICB0b1N0cmluZyhlbmNvZGVyPzogRW5jb2RpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAoZW5jb2RlciB8fCBIZXgpLnN0cmluZ2lmeSh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbmNhdGVuYXRlcyBhIHdvcmQgYXJyYXkgdG8gdGhpcyB3b3JkIGFycmF5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkgdG8gYXBwZW5kLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gVGhpcyB3b3JkIGFycmF5LlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKlxyXG4gICAgICogICAgIHdvcmRBcnJheTEuY29uY2F0KHdvcmRBcnJheTIpO1xyXG4gICAgICovXHJcbiAgICBjb25jYXQod29yZEFycmF5OiBXb3JkQXJyYXkpOiBXb3JkQXJyYXkge1xyXG4gICAgICAgIC8vIENsYW1wIGV4Y2VzcyBiaXRzXHJcbiAgICAgICAgdGhpcy5jbGFtcCgpO1xyXG5cclxuICAgICAgICAvLyBDb25jYXRcclxuICAgICAgICBpZih0aGlzLnNpZ0J5dGVzICUgNCkge1xyXG4gICAgICAgICAgICAvLyBDb3B5IG9uZSBieXRlIGF0IGEgdGltZVxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgd29yZEFycmF5LnNpZ0J5dGVzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRoYXRCeXRlID0gKHdvcmRBcnJheS53b3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmRzWyh0aGlzLnNpZ0J5dGVzICsgaSkgPj4+IDJdIHw9IHRoYXRCeXRlIDw8ICgyNCAtICgodGhpcy5zaWdCeXRlcyArIGkpICUgNCkgKiA4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIENvcHkgb25lIHdvcmQgYXQgYSB0aW1lXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29yZEFycmF5LnNpZ0J5dGVzOyBpICs9IDQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud29yZHNbKHRoaXMuc2lnQnl0ZXMgKyBpKSA+Pj4gMl0gPSB3b3JkQXJyYXkud29yZHNbaSA+Pj4gMl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zaWdCeXRlcyArPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XHJcblxyXG4gICAgICAgIC8vIENoYWluYWJsZVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyBpbnNpZ25pZmljYW50IGJpdHMuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgd29yZEFycmF5LmNsYW1wKCk7XHJcbiAgICAgKi9cclxuICAgIGNsYW1wKCkge1xyXG4gICAgICAgIC8vIENsYW1wXHJcbiAgICAgICAgdGhpcy53b3Jkc1t0aGlzLnNpZ0J5dGVzID4+PiAyXSAmPSAweGZmZmZmZmZmIDw8ICgzMiAtICh0aGlzLnNpZ0J5dGVzICUgNCkgKiA4KTtcclxuICAgICAgICB0aGlzLndvcmRzLmxlbmd0aCA9IE1hdGguY2VpbCh0aGlzLnNpZ0J5dGVzIC8gNCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIHdvcmQgYXJyYXkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBUaGUgY2xvbmUuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgbGV0IGNsb25lID0gd29yZEFycmF5LmNsb25lKCk7XHJcbiAgICAgKi9cclxuICAgIGNsb25lKCk6IFdvcmRBcnJheSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkodGhpcy53b3Jkcy5zbGljZSgwKSwgdGhpcy5zaWdCeXRlcyk7XHJcbiAgICB9XHJcbn0iXX0=