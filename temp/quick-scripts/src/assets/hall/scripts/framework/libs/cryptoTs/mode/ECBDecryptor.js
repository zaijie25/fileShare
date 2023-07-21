"use strict";
cc._RF.push(module, 'dc332WZC/tEur9kktvxrlhB', 'ECBDecryptor');
// hall/scripts/framework/libs/cryptoTs/mode/ECBDecryptor.ts

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
exports.ECBDecryptor = void 0;
var BlockCipherModeAlgorithm_1 = require("./BlockCipherModeAlgorithm");
var ECBDecryptor = /** @class */ (function (_super) {
    __extends(ECBDecryptor, _super);
    function ECBDecryptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Processes the data block at offset.
     *
     * @param words The data words to operate on.
     * @param offset The offset where the block starts.
     *
     * @example
     *
     *     mode.processBlock(data.words, offset);
     */
    ECBDecryptor.prototype.processBlock = function (words, offset) {
        this._cipher.decryptBlock(words, offset);
    };
    return ECBDecryptor;
}(BlockCipherModeAlgorithm_1.BlockCipherModeAlgorithm));
exports.ECBDecryptor = ECBDecryptor;

cc._RF.pop();