
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/enc/Base64.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4eba5ilQZ9IMpAnaEOCwRUI', 'Base64');
// hall/scripts/framework/libs/cryptoTs/enc/Base64.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64 = void 0;
var WordArray_1 = require("../lib/WordArray");
var Base64 = /** @class */ (function () {
    function Base64() {
    }
    /**
     * Converts a word array to a Base64 string.
     *
     * @param wordArray The word array.
     *
     * @return The Base64 string.
     *
     * @example
     *
     *     let base64String = Base64.stringify(wordArray);
     */
    Base64.stringify = function (wordArray) {
        // Clamp excess bits
        wordArray.clamp();
        // Convert
        var base64Chars = [];
        for (var i = 0; i < wordArray.sigBytes; i += 3) {
            var byte1 = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            var byte2 = (wordArray.words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
            var byte3 = (wordArray.words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;
            var triplet = (byte1 << 16) | (byte2 << 8) | byte3;
            for (var j = 0; (j < 4) && (i + j * 0.75 < wordArray.sigBytes); j++) {
                base64Chars.push(this._map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
            }
        }
        // Add padding
        var paddingChar = this._map.charAt(64);
        if (paddingChar) {
            while (base64Chars.length % 4) {
                base64Chars.push(paddingChar);
            }
        }
        return base64Chars.join('');
    };
    /**
     * Converts a Base64 string to a word array.
     *
     * @param base64Str The Base64 string.
     *
     * @return The word array.
     *
     * @example
     *
     *     let wordArray = Base64.parse(base64String);
     */
    Base64.parse = function (base64Str) {
        // Shortcuts
        var base64StrLength = base64Str.length;
        if (this._reverseMap === undefined) {
            this._reverseMap = [];
            for (var j = 0; j < this._map.length; j++) {
                this._reverseMap[this._map.charCodeAt(j)] = j;
            }
        }
        // Ignore padding
        var paddingChar = this._map.charAt(64);
        if (paddingChar) {
            var paddingIndex = base64Str.indexOf(paddingChar);
            if (paddingIndex !== -1) {
                base64StrLength = paddingIndex;
            }
        }
        // Convert
        return this.parseLoop(base64Str, base64StrLength, this._reverseMap);
    };
    Base64.parseLoop = function (base64Str, base64StrLength, reverseMap) {
        var words = [];
        var nBytes = 0;
        for (var i = 0; i < base64StrLength; i++) {
            if (i % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
                words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
                nBytes++;
            }
        }
        return new WordArray_1.WordArray(words, nBytes);
    };
    Base64._map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    Base64._reverseMap = undefined;
    return Base64;
}());
exports.Base64 = Base64;
// type guard for the formatter (to ensure it has the required static methods)
var _ = Base64;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcZW5jXFxCYXNlNjQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsOENBQTZDO0FBRTdDO0lBQUE7SUE4RkEsQ0FBQztJQXpGRzs7Ozs7Ozs7OztPQVVHO0lBQ1csZ0JBQVMsR0FBdkIsVUFBd0IsU0FBb0I7UUFDeEMsb0JBQW9CO1FBQ3BCLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVsQixVQUFVO1FBQ1YsSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUMsSUFBTSxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFTLElBQUksQ0FBQztZQUNuRixJQUFNLEtBQUssR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNuRixJQUFNLEtBQUssR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUks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LENBQUM7Z0JBQ3hFLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xFLE1BQU0sRUFBRSxDQUFDO2FBQ1o7U0FDSjtRQUVELE9BQU8sSUFBSSxxQkFBUyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBNUZhLFdBQUksR0FBRyxtRUFBbUUsQ0FBQztJQUUzRSxrQkFBVyxHQUE4QixTQUFTLENBQUM7SUEyRnJFLGFBQUM7Q0E5RkQsQUE4RkMsSUFBQTtBQTlGWSx3QkFBTTtBQWdHbkIsOEVBQThFO0FBQzlFLElBQU0sQ0FBQyxHQUFhLE1BQU0sQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVuY29kaW5nIH0gZnJvbSAnLi9FbmNvZGluZyc7XHJcbmltcG9ydCB7IFdvcmRBcnJheSB9IGZyb20gJy4uL2xpYi9Xb3JkQXJyYXknO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2U2NCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIF9tYXAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgX3JldmVyc2VNYXA6IEFycmF5PG51bWJlcj4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBCYXNlNjQgc3RyaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBUaGUgQmFzZTY0IHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBsZXQgYmFzZTY0U3RyaW5nID0gQmFzZTY0LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0cmluZ2lmeSh3b3JkQXJyYXk6IFdvcmRBcnJheSk6IHN0cmluZyB7XHJcbiAgICAgICAgLy8gQ2xhbXAgZXhjZXNzIGJpdHNcclxuICAgICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydFxyXG4gICAgICAgIGNvbnN0IGJhc2U2NENoYXJzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3b3JkQXJyYXkuc2lnQnl0ZXM7IGkgKz0gMykge1xyXG4gICAgICAgICAgICBjb25zdCBieXRlMSA9ICh3b3JkQXJyYXkud29yZHNbaSA+Pj4gMl0gICAgICAgPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgICAgICAgJiAweGZmO1xyXG4gICAgICAgICAgICBjb25zdCBieXRlMiA9ICh3b3JkQXJyYXkud29yZHNbKGkgKyAxKSA+Pj4gMl0gPj4+ICgyNCAtICgoaSArIDEpICUgNCkgKiA4KSkgJiAweGZmO1xyXG4gICAgICAgICAgICBjb25zdCBieXRlMyA9ICh3b3JkQXJyYXkud29yZHNbKGkgKyAyKSA+Pj4gMl0gPj4+ICgyNCAtICgoaSArIDIpICUgNCkgKiA4KSkgJiAweGZmO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdHJpcGxldCA9IChieXRlMSA8PCAxNikgfCAoYnl0ZTIgPDwgOCkgfCBieXRlMztcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyAoaiA8IDQpICYmIChpICsgaiAqIDAuNzUgPCB3b3JkQXJyYXkuc2lnQnl0ZXMpOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGJhc2U2NENoYXJzLnB1c2godGhpcy5fbWFwLmNoYXJBdCgodHJpcGxldCA+Pj4gKDYgKiAoMyAtIGopKSkgJiAweDNmKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCBwYWRkaW5nXHJcbiAgICAgICAgY29uc3QgcGFkZGluZ0NoYXIgPSB0aGlzLl9tYXAuY2hhckF0KDY0KTtcclxuICAgICAgICBpZiAocGFkZGluZ0NoYXIpIHtcclxuICAgICAgICAgICAgd2hpbGUgKGJhc2U2NENoYXJzLmxlbmd0aCAlIDQpIHtcclxuICAgICAgICAgICAgICAgIGJhc2U2NENoYXJzLnB1c2gocGFkZGluZ0NoYXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYmFzZTY0Q2hhcnMuam9pbignJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIEJhc2U2NCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBiYXNlNjRTdHIgVGhlIEJhc2U2NCBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBUaGUgd29yZCBhcnJheS5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBsZXQgd29yZEFycmF5ID0gQmFzZTY0LnBhcnNlKGJhc2U2NFN0cmluZyk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcGFyc2UoYmFzZTY0U3RyOiBzdHJpbmcpOiBXb3JkQXJyYXkge1xyXG4gICAgICAgIC8vIFNob3J0Y3V0c1xyXG4gICAgICAgIGxldCBiYXNlNjRTdHJMZW5ndGggPSBiYXNlNjRTdHIubGVuZ3RoO1xyXG5cclxuICAgICAgICBpZih0aGlzLl9yZXZlcnNlTWFwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JldmVyc2VNYXAgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLl9tYXAubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXZlcnNlTWFwW3RoaXMuX21hcC5jaGFyQ29kZUF0KGopXSA9IGo7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZ25vcmUgcGFkZGluZ1xyXG4gICAgICAgIGNvbnN0IHBhZGRpbmdDaGFyID0gdGhpcy5fbWFwLmNoYXJBdCg2NCk7XHJcbiAgICAgICAgaWYocGFkZGluZ0NoYXIpIHtcclxuICAgICAgICAgICAgY29uc3QgcGFkZGluZ0luZGV4ID0gYmFzZTY0U3RyLmluZGV4T2YocGFkZGluZ0NoYXIpO1xyXG4gICAgICAgICAgICBpZihwYWRkaW5nSW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBiYXNlNjRTdHJMZW5ndGggPSBwYWRkaW5nSW5kZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENvbnZlcnRcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUxvb3AoYmFzZTY0U3RyLCBiYXNlNjRTdHJMZW5ndGgsIHRoaXMuX3JldmVyc2VNYXApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcGFyc2VMb29wKGJhc2U2NFN0cjogc3RyaW5nLCBiYXNlNjRTdHJMZW5ndGg6IG51bWJlciwgcmV2ZXJzZU1hcDogQXJyYXk8bnVtYmVyPik6IFdvcmRBcnJheSB7XHJcbiAgICAgICAgY29uc3Qgd29yZHM6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgICAgICBsZXQgbkJ5dGVzID0gMDtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYmFzZTY0U3RyTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYoaSAlIDQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJpdHMxID0gcmV2ZXJzZU1hcFtiYXNlNjRTdHIuY2hhckNvZGVBdChpIC0gMSldIDw8ICgoaSAlIDQpICogMik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiaXRzMiA9IHJldmVyc2VNYXBbYmFzZTY0U3RyLmNoYXJDb2RlQXQoaSldID4+PiAoNiAtIChpICUgNCkgKiAyKTtcclxuICAgICAgICAgICAgICAgIHdvcmRzW25CeXRlcyA+Pj4gMl0gfD0gKGJpdHMxIHwgYml0czIpIDw8ICgyNCAtIChuQnl0ZXMgJSA0KSAqIDgpO1xyXG4gICAgICAgICAgICAgICAgbkJ5dGVzKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5KHdvcmRzLCBuQnl0ZXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyB0eXBlIGd1YXJkIGZvciB0aGUgZm9ybWF0dGVyICh0byBlbnN1cmUgaXQgaGFzIHRoZSByZXF1aXJlZCBzdGF0aWMgbWV0aG9kcylcclxuY29uc3QgXzogRW5jb2RpbmcgPSBCYXNlNjQ7Il19