"use strict";
cc._RF.push(module, 'f0385q3TeRCoofF/yaApeLO', 'Latin1');
// hall/scripts/framework/libs/cryptoTs/enc/Latin1.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Latin1 = void 0;
var WordArray_1 = require("../lib/WordArray");
var Latin1 = /** @class */ (function () {
    function Latin1() {
    }
    /**
     * Converts a word array to a Latin1 string.
     *
     * @param wordArray The word array.
     *
     * @return The Latin1 string.
     *
     * @example
     *
     *     let latin1String = Latin1.stringify(wordArray);
     */
    Latin1.stringify = function (wordArray) {
        // Convert
        var latin1Chars = [];
        for (var i = 0; i < wordArray.sigBytes; i++) {
            var bite = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            latin1Chars.push(String.fromCharCode(bite));
        }
        return latin1Chars.join('');
    };
    /**
     * Converts a Latin1 string to a word array.
     *
     * @param latin1Str The Latin1 string.
     *
     * @return The word array.
     *
     * @example
     *
     *     let wordArray = Latin1.parse(latin1String);
     */
    Latin1.parse = function (latin1Str) {
        // Shortcut
        var latin1StrLength = latin1Str.length;
        // Convert
        var words = [];
        for (var i = 0; i < latin1StrLength; i++) {
            words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
        }
        return new WordArray_1.WordArray(words, latin1StrLength);
    };
    return Latin1;
}());
exports.Latin1 = Latin1;
// type guard for the formatter (to ensure it has the required static methods)
var _ = Latin1;

cc._RF.pop();