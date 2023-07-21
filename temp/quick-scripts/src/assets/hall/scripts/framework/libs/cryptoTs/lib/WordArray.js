"use strict";
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