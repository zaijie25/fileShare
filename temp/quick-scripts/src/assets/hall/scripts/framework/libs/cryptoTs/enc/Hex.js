"use strict";
cc._RF.push(module, '8c4749+wapKU7r3KJ/FXnwa', 'Hex');
// hall/scripts/framework/libs/cryptoTs/enc/Hex.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hex = void 0;
var WordArray_1 = require("../lib/WordArray");
var Hex = /** @class */ (function () {
    function Hex() {
    }
    /**
     * Converts a word array to a hex string.
     *
     * @param wordArray The word array.
     *
     * @return The hex string.
     *
     * @example
     *
     *     let hexString = Hex.stringify(wordArray);
     */
    Hex.stringify = function (wordArray) {
        // Convert
        var hexChars = [];
        for (var i = 0; i < wordArray.sigBytes; i++) {
            var bite = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            hexChars.push((bite >>> 4).toString(16));
            hexChars.push((bite & 0x0f).toString(16));
        }
        return hexChars.join('');
    };
    /**
     * Converts a hex string to a word array.
     *
     * @param hexStr The hex string.
     *
     * @return The word array.
     *
     * @example
     *
     *     let wordArray = Hex.parse(hexString);
     */
    Hex.parse = function (hexStr) {
        // Shortcut
        var hexStrLength = hexStr.length;
        // Convert
        var words = [];
        for (var i = 0; i < hexStrLength; i += 2) {
            words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
        }
        return new WordArray_1.WordArray(words, hexStrLength / 2);
    };
    return Hex;
}());
exports.Hex = Hex;
// type guard for the formatter (to ensure it has the required static methods)
var _ = Hex;

cc._RF.pop();