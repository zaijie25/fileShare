"use strict";
cc._RF.push(module, 'a1690bfez9NT52Jg4MqoMSC', 'CBC');
// hall/scripts/framework/libs/cryptoTs/mode/CBC.ts

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
exports.CBC = void 0;
var BlockCipherMode_1 = require("./BlockCipherMode");
var CBCEncryptor_1 = require("./CBCEncryptor");
var CBCDecryptor_1 = require("./CBCDecryptor");
/**
 * Cipher Block Chaining mode.
 */
var CBC = /** @class */ (function (_super) {
    __extends(CBC, _super);
    function CBC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CBC.Encryptor = CBCEncryptor_1.CBCEncryptor;
    CBC.Decryptor = CBCDecryptor_1.CBCDecryptor;
    return CBC;
}(BlockCipherMode_1.BlockCipherMode));
exports.CBC = CBC;

cc._RF.pop();