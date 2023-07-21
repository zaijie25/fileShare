"use strict";
cc._RF.push(module, '0007atd6eBKNazrJkQizznB', 'PasswordBasedCipher');
// hall/scripts/framework/libs/cryptoTs/lib/PasswordBasedCipher.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordBasedCipher = void 0;
var SerializableCipher_1 = require("./SerializableCipher");
var WordArray_1 = require("./WordArray");
var OpenSSL_1 = require("../format/OpenSSL");
var OpenSSLKdf_1 = require("../kdf/OpenSSLKdf");
var PasswordBasedCipher = /** @class */ (function () {
    function PasswordBasedCipher() {
    }
    /**
     * Encrypts a message using a password.
     *
     * @param cipher The cipher algorithm to use.
     * @param message The message to encrypt.
     * @param password The password.
     * @param cfg (Optional) The configuration options to use for this operation.
     *
     * @return A cipher params object.
     *
     * @example
     *
     *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(AES, message, 'password');
     *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(AES, message, 'password', { format: OpenSSL });
     */
    PasswordBasedCipher.encrypt = function (cipher, message, password, cfg) {
        // Apply config defaults
        var config = Object.assign({}, this.cfg, cfg);
        // Check if we have a kdf
        if (config.kdf === undefined) {
            throw new Error('missing kdf in config');
        }
        // Derive key and other params
        var derivedParams = config.kdf.execute(password, cipher.keySize, cipher.ivSize);
        // Check if we have an IV
        if (derivedParams.iv !== undefined) {
            // Add IV to config
            config.iv = derivedParams.iv;
        }
        // Encrypt
        var ciphertext = SerializableCipher_1.SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, config);
        // Mix in derived params
        return ciphertext.extend(derivedParams);
    };
    /**
     * Decrypts serialized ciphertext using a password.
     *
     * @param cipher The cipher algorithm to use.
     * @param ciphertext The ciphertext to decrypt.
     * @param password The password.
     * @param cfg (Optional) The configuration options to use for this operation.
     *
     * @return The plaintext.
     *
     * @example
     *
     *     var plaintext = PasswordBasedCipher.decrypt(AES, formattedCiphertext, 'password', { format: OpenSSL });
     *     var plaintext = PasswordBasedCipher.decrypt(AES, ciphertextParams, 'password', { format: OpenSSL });
     */
    PasswordBasedCipher.decrypt = function (cipher, ciphertext, password, cfg) {
        // Apply config defaults
        var config = Object.assign({}, this.cfg, cfg);
        // Check if we have a kdf
        if (config.format === undefined) {
            throw new Error('missing format in config');
        }
        // Convert string to CipherParams
        ciphertext = this._parse(ciphertext, config.format);
        // Check if we have a kdf
        if (config.kdf === undefined) {
            throw new Error('the key derivation function must be set');
        }
        // Derive key and other params
        var derivedParams = config.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
        // Check if we have an IV
        if (derivedParams.iv !== undefined) {
            // Add IV to config
            config.iv = derivedParams.iv;
        }
        // Decrypt
        var plaintext = SerializableCipher_1.SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, config);
        return plaintext;
    };
    /**
     * Converts serialized ciphertext to CipherParams,
     * else assumed CipherParams already and returns ciphertext unchanged.
     *
     * @param ciphertext The ciphertext.
     * @param format The formatting strategy to use to parse serialized ciphertext.
     *
     * @return The unserialized ciphertext.
     *
     * @example
     *
     *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
     */
    PasswordBasedCipher._parse = function (ciphertext, format) {
        if (typeof ciphertext === 'string') {
            return format.parse(ciphertext);
        }
        else {
            return ciphertext;
        }
    };
    PasswordBasedCipher.cfg = {
        blockSize: 4,
        iv: new WordArray_1.WordArray([]),
        format: OpenSSL_1.OpenSSL,
        kdf: OpenSSLKdf_1.OpenSSLKdf
    };
    return PasswordBasedCipher;
}());
exports.PasswordBasedCipher = PasswordBasedCipher;

cc._RF.pop();