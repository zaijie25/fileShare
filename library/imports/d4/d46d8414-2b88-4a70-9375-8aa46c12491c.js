"use strict";
cc._RF.push(module, 'd46d8QUK4hKcJN1iqRsEkkc', 'Cipher');
// hall/scripts/framework/libs/cryptoTs/lib/Cipher.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cipher = void 0;
var BufferedBlockAlgorithm_1 = require("./BufferedBlockAlgorithm");
var SerializableCipher_1 = require("./SerializableCipher");
var PasswordBasedCipher_1 = require("./PasswordBasedCipher");
var Cipher = /** @class */ (function (_super) {
    __extends(Cipher, _super);
    /**
     * Initializes a newly created cipher.
     *
     * @param xformMode Either the encryption or decryption transormation mode constant.
     * @param key The key.
     * @param cfg (Optional) The configuration options to use for this operation.
     *
     * @example
     *
     *     let cipher = AES.create(AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
     */
    function Cipher(xformMode, key, cfg) {
        var _this = 
        // Apply config defaults
        _super.call(this, Object.assign({
            blockSize: 1
        }, cfg)) || this;
        // Store transform mode and key
        _this._xformMode = xformMode;
        _this._key = key;
        // Set initial values
        _this.reset();
        return _this;
    }
    /**
     * Creates this cipher in encryption mode.
     *
     * @param key The key.
     * @param cfg (Optional) The configuration options to use for this operation.
     *
     * @return A cipher instance.
     *
     * @example
     *
     *     let cipher = AES.createEncryptor(keyWordArray, { iv: ivWordArray });
     */
    Cipher.createEncryptor = function (key, cfg) {
        // workaround for typescript not being able to create a abstract creator function directly
        var thisClass = this;
        return new thisClass(this._ENC_XFORM_MODE, key, cfg);
    };
    /**
     * Creates this cipher in decryption mode.
     *
     * @param key The key.
     * @param cfg (Optional) The configuration options to use for this operation.
     *
     * @return A cipher instance.
     *
     * @example
     *
     *     let cipher = AES.createDecryptor(keyWordArray, { iv: ivWordArray });
     */
    Cipher.createDecryptor = function (key, cfg) {
        // workaround for typescript not being able to create a abstract creator function directly
        var thisClass = this;
        return new thisClass(this._DEC_XFORM_MODE, key, cfg);
    };
    /**
     * Creates shortcut functions to a cipher's object interface.
     *
     * @param cipher The cipher to create a helper for.
     *
     * @return An object with encrypt and decrypt shortcut functions.
     *
     * @example
     *
     *     let AES = Cipher._createHelper(AESAlgorithm);
     */
    Cipher._createHelper = function (cipher) {
        function encrypt(message, key, cfg) {
            if (typeof key === 'string') {
                return PasswordBasedCipher_1.PasswordBasedCipher.encrypt(cipher, message, key, cfg);
            }
            else {
                return SerializableCipher_1.SerializableCipher.encrypt(cipher, message, key, cfg);
            }
        }
        function decrypt(ciphertext, key, cfg) {
            if (typeof key === 'string') {
                return PasswordBasedCipher_1.PasswordBasedCipher.decrypt(cipher, ciphertext, key, cfg);
            }
            else {
                return SerializableCipher_1.SerializableCipher.decrypt(cipher, ciphertext, key, cfg);
            }
        }
        return {
            encrypt: encrypt,
            decrypt: decrypt
        };
    };
    /**
     * Adds data to be encrypted or decrypted.
     *
     * @param dataUpdate The data to encrypt or decrypt.
     *
     * @return The data after processing.
     *
     * @example
     *
     *     let encrypted = cipher.process('data');
     *     let encrypted = cipher.process(wordArray);
     */
    Cipher.prototype.process = function (dataUpdate) {
        // Append
        this._append(dataUpdate);
        // Process available blocks
        return this._process();
    };
    /**
     * Finalizes the encryption or decryption process.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param dataUpdate The final data to encrypt or decrypt.
     *
     * @return The data after final processing.
     *
     * @example
     *
     *     var encrypted = cipher.finalize();
     *     var encrypted = cipher.finalize('data');
     *     var encrypted = cipher.finalize(wordArray);
     */
    Cipher.prototype.finalize = function (dataUpdate) {
        // Final data update
        if (dataUpdate) {
            this._append(dataUpdate);
        }
        // Perform concrete-cipher logic
        var finalProcessedData = this._doFinalize();
        return finalProcessedData;
    };
    /**
     * A constant representing encryption mode.
     */
    Cipher._ENC_XFORM_MODE = 1;
    /**
     * A constant representing decryption mode.
     */
    Cipher._DEC_XFORM_MODE = 2;
    /**
     * This cipher's key size. Default: 4 (128 bits / 32 Bits)
     */
    Cipher.keySize = 4;
    /**
     * This cipher's IV size. Default: 4 (128 bits / 32 Bits)
     */
    Cipher.ivSize = 4;
    return Cipher;
}(BufferedBlockAlgorithm_1.BufferedBlockAlgorithm));
exports.Cipher = Cipher;

cc._RF.pop();