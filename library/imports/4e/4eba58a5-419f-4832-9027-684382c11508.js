"use strict";
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