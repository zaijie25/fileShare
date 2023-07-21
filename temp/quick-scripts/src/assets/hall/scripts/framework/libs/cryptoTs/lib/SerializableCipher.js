"use strict";
cc._RF.push(module, '304daQV5rJFZK4j7/CAxJ2m', 'SerializableCipher');
// hall/scripts/framework/libs/cryptoTs/lib/SerializableCipher.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializableCipher = void 0;
var WordArray_1 = require("./WordArray");
var OpenSSL_1 = require("../format/OpenSSL");
var CipherParams_1 = require("./CipherParams");
var SerializableCipher = /** @class */ (function () {
    function SerializableCipher() {
    }
    /**
     * Encrypts a message.
     *
     * @param cipher The cipher algorithm to use.
     * @param message The message to encrypt.
     * @param key The key.
     * @param cfg (Optional) The configuration options to use for this operation.
     *
     * @return A cipher params object.
     *
     * @example
     *
     *     let ciphertextParams = SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
     *     let ciphertextParams = SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
     *     let ciphertextParams = SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, {
     *       iv: iv,
     *       format: CryptoJS.format.OpenSSL
     *     });
     */
    SerializableCipher.encrypt = function (cipher, message, key, cfg) {
        // Apply config defaults
        var config = Object.assign({}, this.cfg, cfg);
        // Encrypt
        var encryptor = cipher.createEncryptor(key, config);
        var ciphertext = encryptor.finalize(message);
        // Create and return serializable cipher params
        return new CipherParams_1.CipherParams({
            ciphertext: ciphertext,
            key: key,
            iv: encryptor.cfg.iv,
            algorithm: cipher,
            mode: encryptor.cfg.mode,
            padding: encryptor.cfg.padding,
            blockSize: encryptor.cfg.blockSize,
            formatter: config.format
        });
    };
    /**
     * Decrypts serialized ciphertext.
     *
     * @param cipher The cipher algorithm to use.
     * @param ciphertext The ciphertext to decrypt.
     * @param key The key.
     * @param cfg (Optional) The configuration options to use for this operation.
     *
     * @return The plaintext.
     *
     * @example
     *
     *     let plaintext = SerializableCipher.decrypt(
     *         AESAlgorithm,
     *         formattedCiphertext,
     *         key, {
     *             iv: iv,
     *             format: CryptoJS.format.OpenSSL
     *         }
     *     );
     *
     *     let plaintext = SerializableCipher.decrypt(
     *         AESAlgorithm,
     *         ciphertextParams,
     *         key, {
     *             iv: iv,
     *             format: CryptoJS.format.OpenSSL
     *         }
     *     );
     */
    SerializableCipher.decrypt = function (cipher, ciphertext, key, optionalCfg) {
        // Apply config defaults
        var cfg = Object.assign({}, this.cfg, optionalCfg);
        if (!cfg.format) {
            throw new Error('could not determine format');
        }
        // Convert string to CipherParams
        ciphertext = this._parse(ciphertext, cfg.format);
        if (!ciphertext.ciphertext) {
            throw new Error('could not determine ciphertext');
        }
        // Decrypt
        var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
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
    SerializableCipher._parse = function (ciphertext, format) {
        if (typeof ciphertext === 'string') {
            return format.parse(ciphertext);
        }
        else {
            return ciphertext;
        }
    };
    SerializableCipher.cfg = {
        blockSize: 4,
        iv: new WordArray_1.WordArray([]),
        format: OpenSSL_1.OpenSSL
    };
    return SerializableCipher;
}());
exports.SerializableCipher = SerializableCipher;

cc._RF.pop();