"use strict";
cc._RF.push(module, '56f5ceaaPlDP4tts+9p/473', 'CipherParams');
// hall/scripts/framework/libs/cryptoTs/lib/CipherParams.ts

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
exports.CipherParams = void 0;
var Base_1 = require("./Base");
var CipherParams = /** @class */ (function (_super) {
    __extends(CipherParams, _super);
    /**
     * Initializes a newly created cipher params object.
     *
     * @param cipherParams An object with any of the possible cipher parameters.
     *
     * @example
     *
     *     let cipherParams = CipherParams.create({
     *         ciphertext: ciphertextWordArray,
     *         key: keyWordArray,
     *         iv: ivWordArray,
     *         salt: saltWordArray,
     *         algorithm: AESAlgorithm,
     *         mode: CBC,
     *         padding: PKCS7,
     *         blockSize: 4,
     *         formatter: OpenSSLFormatter
     *     });
     */
    function CipherParams(cipherParams) {
        var _this = _super.call(this) || this;
        _this.ciphertext = cipherParams.ciphertext;
        _this.key = cipherParams.key;
        _this.iv = cipherParams.iv;
        _this.salt = cipherParams.salt;
        _this.algorithm = cipherParams.algorithm;
        _this.mode = cipherParams.mode;
        _this.padding = cipherParams.padding;
        _this.blockSize = cipherParams.blockSize;
        _this.formatter = cipherParams.formatter;
        return _this;
    }
    CipherParams.prototype.extend = function (additionalParams) {
        if (additionalParams.ciphertext !== undefined) {
            this.ciphertext = additionalParams.ciphertext;
        }
        if (additionalParams.key !== undefined) {
            this.key = additionalParams.key;
        }
        if (additionalParams.iv !== undefined) {
            this.iv = additionalParams.iv;
        }
        if (additionalParams.salt !== undefined) {
            this.salt = additionalParams.salt;
        }
        if (additionalParams.algorithm !== undefined) {
            this.algorithm = additionalParams.algorithm;
        }
        if (additionalParams.mode !== undefined) {
            this.mode = additionalParams.mode;
        }
        if (additionalParams.padding !== undefined) {
            this.padding = additionalParams.padding;
        }
        if (additionalParams.blockSize !== undefined) {
            this.blockSize = additionalParams.blockSize;
        }
        if (additionalParams.formatter !== undefined) {
            this.formatter = additionalParams.formatter;
        }
        return this;
    };
    /**
     * Converts this cipher params object to a string.
     *
     * @param formatter (Optional) The formatting strategy to use.
     *
     * @return The stringified cipher params.
     *
     * @throws Error If neither the formatter nor the default formatter is set.
     *
     * @example
     *
     *     let string = cipherParams + '';
     *     let string = cipherParams.toString();
     *     let string = cipherParams.toString(CryptoJS.format.OpenSSL);
     */
    CipherParams.prototype.toString = function (formatter) {
        if (formatter) {
            return formatter.stringify(this);
        }
        else if (this.formatter) {
            return this.formatter.stringify(this);
        }
        else {
            throw new Error('cipher needs a formatter to be able to convert the result into a string');
        }
    };
    return CipherParams;
}(Base_1.Base));
exports.CipherParams = CipherParams;

cc._RF.pop();