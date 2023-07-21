"use strict";
cc._RF.push(module, '188906PKQ5NVrEKxqKroW8l', 'BlockCipherMode');
// hall/scripts/framework/libs/cryptoTs/mode/BlockCipherMode.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCipherMode = void 0;
var BlockCipherModeAlgorithm_1 = require("./BlockCipherModeAlgorithm");
var BlockCipherMode = /** @class */ (function () {
    function BlockCipherMode() {
    }
    /**
     * Creates this mode for encryption.
     *
     * @param cipher A block cipher instance.
     * @param iv The IV words.
     *
     * @example
     *
     *     var mode = CBC.createEncryptor(cipher, iv.words);
     */
    BlockCipherMode.createEncryptor = function (cipher, iv) {
        // workaround for typescript not being able to create a abstract creator function directly
        var encryptorClass = this.Encryptor;
        return new encryptorClass(cipher, iv);
    };
    /**
     * Creates this mode for decryption.
     *
     * @param cipher A block cipher instance.
     * @param iv The IV words.
     *
     * @example
     *
     *     var mode = CBC.createDecryptor(cipher, iv.words);
     */
    BlockCipherMode.createDecryptor = function (cipher, iv) {
        // workaround for typescript not being able to create a abstract creator function directly
        var decryptorClass = this.Decryptor;
        return new decryptorClass(cipher, iv);
    };
    BlockCipherMode.Encryptor = BlockCipherModeAlgorithm_1.BlockCipherModeAlgorithm;
    BlockCipherMode.Decryptor = BlockCipherModeAlgorithm_1.BlockCipherModeAlgorithm;
    return BlockCipherMode;
}());
exports.BlockCipherMode = BlockCipherMode;

cc._RF.pop();