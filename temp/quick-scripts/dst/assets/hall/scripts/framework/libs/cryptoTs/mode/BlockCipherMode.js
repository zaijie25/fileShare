
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/mode/BlockCipherMode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcbW9kZVxcQmxvY2tDaXBoZXJNb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVFQUFzRTtBQUV0RTtJQUFBO0lBc0NBLENBQUM7SUFqQ0c7Ozs7Ozs7OztPQVNHO0lBQ1csK0JBQWUsR0FBN0IsVUFBOEIsTUFBbUIsRUFBRSxFQUFpQjtRQUNoRSwwRkFBMEY7UUFDMUYsSUFBTSxjQUFjLEdBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUUzQyxPQUFPLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ1csK0JBQWUsR0FBN0IsVUFBOEIsTUFBbUIsRUFBRSxFQUFpQjtRQUNoRSwwRkFBMEY7UUFDMUYsSUFBTSxjQUFjLEdBQVEsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUUzQyxPQUFPLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBcENhLHlCQUFTLEdBQVEsbURBQXdCLENBQUM7SUFFMUMseUJBQVMsR0FBUSxtREFBd0IsQ0FBQztJQW1DNUQsc0JBQUM7Q0F0Q0QsQUFzQ0MsSUFBQTtBQXRDcUIsMENBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCbG9ja0NpcGhlciB9IGZyb20gJy4uL2xpYi9CbG9ja0NpcGhlcic7XHJcbmltcG9ydCB7IEJsb2NrQ2lwaGVyTW9kZUFsZ29yaXRobSB9IGZyb20gJy4vQmxvY2tDaXBoZXJNb2RlQWxnb3JpdGhtJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCbG9ja0NpcGhlck1vZGUge1xyXG4gICAgcHVibGljIHN0YXRpYyBFbmNyeXB0b3I6IGFueSA9IEJsb2NrQ2lwaGVyTW9kZUFsZ29yaXRobTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIERlY3J5cHRvcjogYW55ID0gQmxvY2tDaXBoZXJNb2RlQWxnb3JpdGhtO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGlzIG1vZGUgZm9yIGVuY3J5cHRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNpcGhlciBBIGJsb2NrIGNpcGhlciBpbnN0YW5jZS5cclxuICAgICAqIEBwYXJhbSBpdiBUaGUgSVYgd29yZHMuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgdmFyIG1vZGUgPSBDQkMuY3JlYXRlRW5jcnlwdG9yKGNpcGhlciwgaXYud29yZHMpO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUVuY3J5cHRvcihjaXBoZXI6IEJsb2NrQ2lwaGVyLCBpdjogQXJyYXk8bnVtYmVyPik6IEJsb2NrQ2lwaGVyTW9kZUFsZ29yaXRobSB7XHJcbiAgICAgICAgLy8gd29ya2Fyb3VuZCBmb3IgdHlwZXNjcmlwdCBub3QgYmVpbmcgYWJsZSB0byBjcmVhdGUgYSBhYnN0cmFjdCBjcmVhdG9yIGZ1bmN0aW9uIGRpcmVjdGx5XHJcbiAgICAgICAgY29uc3QgZW5jcnlwdG9yQ2xhc3M6IGFueSA9IHRoaXMuRW5jcnlwdG9yO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IGVuY3J5cHRvckNsYXNzKGNpcGhlciwgaXYpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGlzIG1vZGUgZm9yIGRlY3J5cHRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNpcGhlciBBIGJsb2NrIGNpcGhlciBpbnN0YW5jZS5cclxuICAgICAqIEBwYXJhbSBpdiBUaGUgSVYgd29yZHMuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgdmFyIG1vZGUgPSBDQkMuY3JlYXRlRGVjcnlwdG9yKGNpcGhlciwgaXYud29yZHMpO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZURlY3J5cHRvcihjaXBoZXI6IEJsb2NrQ2lwaGVyLCBpdjogQXJyYXk8bnVtYmVyPik6IEJsb2NrQ2lwaGVyTW9kZUFsZ29yaXRobSB7XHJcbiAgICAgICAgLy8gd29ya2Fyb3VuZCBmb3IgdHlwZXNjcmlwdCBub3QgYmVpbmcgYWJsZSB0byBjcmVhdGUgYSBhYnN0cmFjdCBjcmVhdG9yIGZ1bmN0aW9uIGRpcmVjdGx5XHJcbiAgICAgICAgY29uc3QgZGVjcnlwdG9yQ2xhc3M6IGFueSA9IHRoaXMuRGVjcnlwdG9yO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IGRlY3J5cHRvckNsYXNzKGNpcGhlciwgaXYpO1xyXG4gICAgfVxyXG59Il19