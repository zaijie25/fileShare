"use strict";
cc._RF.push(module, '1308eqZDOpGbqjVT1hCqh94', 'BlockCipherModeAlgorithm');
// hall/scripts/framework/libs/cryptoTs/mode/BlockCipherModeAlgorithm.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockCipherModeAlgorithm = void 0;
var BlockCipherModeAlgorithm = /** @class */ (function () {
    function BlockCipherModeAlgorithm(cipher, iv) {
        this.init(cipher, iv);
    }
    /**
     * Initializes a newly created mode.
     *
     * @param cipher A block cipher instance.
     * @param iv The IV words.
     *
     * @example
     *
     *     var mode = CBC.Encryptor.create(cipher, iv.words);
     */
    BlockCipherModeAlgorithm.prototype.init = function (cipher, iv) {
        this._cipher = cipher;
        this._iv = iv;
    };
    return BlockCipherModeAlgorithm;
}());
exports.BlockCipherModeAlgorithm = BlockCipherModeAlgorithm;

cc._RF.pop();