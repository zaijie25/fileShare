"use strict";
cc._RF.push(module, '22c8ccQnJlGGKrzZmoRCI/O', 'OpenSSLKdf');
// hall/scripts/framework/libs/cryptoTs/kdf/OpenSSLKdf.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSSLKdf = void 0;
var WordArray_1 = require("../lib/WordArray");
var CipherParams_1 = require("../lib/CipherParams");
var EvpKDF_1 = require("../algo/EvpKDF");
var OpenSSLKdf = /** @class */ (function () {
    function OpenSSLKdf() {
    }
    /**
     * Derives a key and IV from a password.
     *
     * @param password The password to derive from.
     * @param keySize The size in words of the key to generate.
     * @param ivSize The size in words of the IV to generate.
     * @param salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
     *
     * @return A cipher params object with the key, IV, and salt.
     *
     * @example
     *
     *     let derivedParams = OpenSSL.execute('Password', 256/32, 128/32);
     *     let derivedParams = OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
     */
    OpenSSLKdf.execute = function (password, keySize, ivSize, salt) {
        // Generate random salt
        if (!salt) {
            salt = WordArray_1.WordArray.random(64 / 8);
        }
        // Derive key and IV
        var key = (new EvpKDF_1.EvpKDF({ keySize: keySize + ivSize })).compute(password, salt);
        // Separate key and IV
        var iv = new WordArray_1.WordArray(key.words.slice(keySize), ivSize * 4);
        key.sigBytes = keySize * 4;
        // Return params
        return new CipherParams_1.CipherParams({ key: key, iv: iv, salt: salt });
    };
    return OpenSSLKdf;
}());
exports.OpenSSLKdf = OpenSSLKdf;
var _ = OpenSSLKdf;

cc._RF.pop();