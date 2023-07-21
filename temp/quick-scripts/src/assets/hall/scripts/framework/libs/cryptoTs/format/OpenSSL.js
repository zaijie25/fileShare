"use strict";
cc._RF.push(module, '11f09CdWepNz7y60SFiZhJz', 'OpenSSL');
// hall/scripts/framework/libs/cryptoTs/format/OpenSSL.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSSL = void 0;
var CipherParams_1 = require("../lib/CipherParams");
var WordArray_1 = require("../lib/WordArray");
var Base64_1 = require("../enc/Base64");
var OpenSSL = /** @class */ (function () {
    function OpenSSL() {
    }
    /**
     * Converts a cipher params object to an OpenSSL-compatible string.
     *
     * @param cipherParams The cipher params object.
     *
     * @return The OpenSSL-compatible string.
     *
     * @example
     *
     *     let openSSLString = OpenSSLFormatter.stringify(cipherParams);
     */
    OpenSSL.stringify = function (cipherParams) {
        if (!cipherParams.ciphertext) {
            throw new Error('missing ciphertext in params');
        }
        // Shortcuts
        var ciphertext = cipherParams.ciphertext;
        var salt = cipherParams.salt;
        // Format
        var wordArray;
        if (salt) {
            if (typeof salt === 'string') {
                throw new Error('salt is expected to be a WordArray');
            }
            wordArray = (new WordArray_1.WordArray([0x53616c74, 0x65645f5f])).concat(salt).concat(ciphertext);
        }
        else {
            wordArray = ciphertext;
        }
        return wordArray.toString(Base64_1.Base64);
    };
    /**
     * Converts an OpenSSL-compatible string to a cipher params object.
     *
     * @param openSSLStr The OpenSSL-compatible string.
     *
     * @return The cipher params object.
     *
     * @example
     *
     *     let cipherParams = OpenSSLFormatter.parse(openSSLString);
     */
    OpenSSL.parse = function (openSSLStr) {
        // Parse base64
        var ciphertext = Base64_1.Base64.parse(openSSLStr);
        // Test for salt
        var salt;
        if (ciphertext.words[0] === 0x53616c74 && ciphertext.words[1] === 0x65645f5f) {
            // Extract salt
            salt = new WordArray_1.WordArray(ciphertext.words.slice(2, 4));
            // Remove salt from ciphertext
            ciphertext.words.splice(0, 4);
            ciphertext.sigBytes -= 16;
        }
        return new CipherParams_1.CipherParams({ ciphertext: ciphertext, salt: salt });
    };
    return OpenSSL;
}());
exports.OpenSSL = OpenSSL;
// type guard for OpenSSL formatter (to ensure it has the required static methods)
var _ = OpenSSL;

cc._RF.pop();