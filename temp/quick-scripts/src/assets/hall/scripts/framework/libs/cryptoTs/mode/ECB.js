"use strict";
cc._RF.push(module, '2881cZgK8tCP5nrlU+ioMJX', 'ECB');
// hall/scripts/framework/libs/cryptoTs/mode/ECB.ts

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
exports.ECB = void 0;
var BlockCipherMode_1 = require("./BlockCipherMode");
var ECBEncryptor_1 = require("./ECBEncryptor");
var ECBDecryptor_1 = require("./ECBDecryptor");
/**
 * Cipher Block Chaining mode.
 */
var ECB = /** @class */ (function (_super) {
    __extends(ECB, _super);
    function ECB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ECB.Encryptor = ECBEncryptor_1.ECBEncryptor;
    ECB.Decryptor = ECBDecryptor_1.ECBDecryptor;
    return ECB;
}(BlockCipherMode_1.BlockCipherMode));
exports.ECB = ECB;

cc._RF.pop();