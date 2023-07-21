"use strict";
cc._RF.push(module, '4578fZA98lE/auRhmK3k1Fw', 'Utf8');
// hall/scripts/framework/libs/cryptoTs/enc/Utf8.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utf8 = void 0;
var Latin1_1 = require("./Latin1");
var Utf8 = /** @class */ (function () {
    function Utf8() {
    }
    /**
     * Converts a word array to a UTF-8 string.
     *
     * @param wordArray The word array.
     *
     * @return The UTF-8 string.
     *
     * @example
     *
     *     let utf8String = Utf8.stringify(wordArray);
     */
    Utf8.stringify = function (wordArray) {
        try {
            return decodeURIComponent(escape(Latin1_1.Latin1.stringify(wordArray)));
        }
        catch (e) {
            throw new Error('Malformed UTF-8 data');
        }
    };
    /**
     * Converts a UTF-8 string to a word array.
     *
     * @param utf8Str The UTF-8 string.
     *
     * @return The word array.
     *
     * @example
     *
     *     let wordArray = Utf8.parse(utf8String);
     */
    Utf8.parse = function (utf8Str) {
        return Latin1_1.Latin1.parse(unescape(encodeURIComponent(utf8Str)));
    };
    return Utf8;
}());
exports.Utf8 = Utf8;
// type guard for the formatter (to ensure it has the required static methods)
var _ = Utf8;

cc._RF.pop();