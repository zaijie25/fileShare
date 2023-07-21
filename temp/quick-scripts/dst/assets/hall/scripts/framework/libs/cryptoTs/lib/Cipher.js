
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/lib/Cipher.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcbGliXFxDaXBoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1FQUFrRTtBQUVsRSwyREFBMEQ7QUFDMUQsNkRBQTREO0FBSTVEO0lBQXFDLDBCQUFzQjtJQXVHdkQ7Ozs7Ozs7Ozs7T0FVRztJQUNILGdCQUFtQixTQUFpQixFQUFFLEdBQWMsRUFBRSxHQUFrQztRQUF4RjtRQUNJLHdCQUF3QjtRQUN4QixrQkFBTSxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxDQUFDO1NBQ2YsRUFBRSxHQUFHLENBQUMsQ0FBQyxTQVFYO1FBTkcsK0JBQStCO1FBQy9CLEtBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLEtBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBRWhCLHFCQUFxQjtRQUNyQixLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7O0lBQ2pCLENBQUM7SUEvRkQ7Ozs7Ozs7Ozs7O09BV0c7SUFDVyxzQkFBZSxHQUE3QixVQUE4QixHQUFjLEVBQUUsR0FBa0M7UUFDNUUsMEZBQTBGO1FBQzFGLElBQU0sU0FBUyxHQUFRLElBQUksQ0FBQztRQUU1QixPQUFPLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNXLHNCQUFlLEdBQTdCLFVBQThCLEdBQWMsRUFBRSxHQUFrQztRQUM1RSwwRkFBMEY7UUFDMUYsSUFBTSxTQUFTLEdBQVEsSUFBSSxDQUFDO1FBRTVCLE9BQU8sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDVyxvQkFBYSxHQUEzQixVQUE0QixNQUFxQjtRQUM3QyxTQUFTLE9BQU8sQ0FBQyxPQUEyQixFQUFFLEdBQXVCLEVBQUUsR0FBa0M7WUFDckcsSUFBRyxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7Z0JBQ3hCLE9BQU8seUNBQW1CLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2pFO2lCQUFNO2dCQUNILE9BQU8sdUNBQWtCLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2hFO1FBQ0wsQ0FBQztRQUVELFNBQVMsT0FBTyxDQUFDLFVBQWlDLEVBQUUsR0FBdUIsRUFBRSxHQUFrQztZQUMzRyxJQUFHLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtnQkFDeEIsT0FBTyx5Q0FBbUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDcEU7aUJBQU07Z0JBQ0gsT0FBTyx1Q0FBa0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDbkU7UUFDTCxDQUFDO1FBRUQsT0FBTztZQUNILE9BQU8sRUFBRSxPQUFPO1lBQ2hCLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUM7SUFDTixDQUFDO0lBMkJEOzs7Ozs7Ozs7OztPQVdHO0lBQ0ksd0JBQU8sR0FBZCxVQUFlLFVBQThCO1FBQ3pDLFNBQVM7UUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXpCLDJCQUEyQjtRQUMzQixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNJLHlCQUFRLEdBQWYsVUFBZ0IsVUFBK0I7UUFDM0Msb0JBQW9CO1FBQ3BCLElBQUcsVUFBVSxFQUFFO1lBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM1QjtRQUVELGdDQUFnQztRQUNoQyxJQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUU5QyxPQUFPLGtCQUFrQixDQUFDO0lBQzlCLENBQUM7SUEzS0Q7O09BRUc7SUFDVyxzQkFBZSxHQUFHLENBQUMsQ0FBQztJQUVsQzs7T0FFRztJQUNXLHNCQUFlLEdBQUcsQ0FBQyxDQUFDO0lBRWxDOztPQUVHO0lBQ1csY0FBTyxHQUFHLENBQUMsQ0FBQztJQUUxQjs7T0FFRztJQUNXLGFBQU0sR0FBRyxDQUFDLENBQUM7SUErSjdCLGFBQUM7Q0FsTEQsQUFrTEMsQ0FsTG9DLCtDQUFzQixHQWtMMUQ7QUFsTHFCLHdCQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVmZmVyZWRCbG9ja0FsZ29yaXRobSB9IGZyb20gJy4vQnVmZmVyZWRCbG9ja0FsZ29yaXRobSc7XHJcbmltcG9ydCB7IFdvcmRBcnJheSB9IGZyb20gJy4vV29yZEFycmF5JztcclxuaW1wb3J0IHsgU2VyaWFsaXphYmxlQ2lwaGVyIH0gZnJvbSAnLi9TZXJpYWxpemFibGVDaXBoZXInO1xyXG5pbXBvcnQgeyBQYXNzd29yZEJhc2VkQ2lwaGVyIH0gZnJvbSAnLi9QYXNzd29yZEJhc2VkQ2lwaGVyJztcclxuaW1wb3J0IHsgQnVmZmVyZWRCbG9ja0FsZ29yaXRobUNvbmZpZyB9IGZyb20gJy4vQnVmZmVyZWRCbG9ja0FsZ29yaXRobUNvbmZpZyc7XHJcbmltcG9ydCB7IENpcGhlclBhcmFtcyB9IGZyb20gJy4vQ2lwaGVyUGFyYW1zJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDaXBoZXIgZXh0ZW5kcyBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtIHtcclxuICAgIC8qKlxyXG4gICAgICogQSBjb25zdGFudCByZXByZXNlbnRpbmcgZW5jcnlwdGlvbiBtb2RlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIF9FTkNfWEZPUk1fTU9ERSA9IDE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBIGNvbnN0YW50IHJlcHJlc2VudGluZyBkZWNyeXB0aW9uIG1vZGUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgX0RFQ19YRk9STV9NT0RFID0gMjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgY2lwaGVyJ3Mga2V5IHNpemUuIERlZmF1bHQ6IDQgKDEyOCBiaXRzIC8gMzIgQml0cylcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBrZXlTaXplID0gNDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgY2lwaGVyJ3MgSVYgc2l6ZS4gRGVmYXVsdDogNCAoMTI4IGJpdHMgLyAzMiBCaXRzKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGl2U2l6ZSA9IDQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFaXRoZXIgdGhlIGVuY3J5cHRpb24gb3IgZGVjcnlwdGlvbiB0cmFuc2Zvcm1hdGlvbiBtb2RlIGNvbnN0YW50LlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgX3hmb3JtTW9kZTogbnVtYmVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGtleS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIF9rZXk6IFdvcmRBcnJheTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgdGhpcyBjaXBoZXIgaW4gZW5jcnlwdGlvbiBtb2RlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBrZXkgVGhlIGtleS5cclxuICAgICAqIEBwYXJhbSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBvcGVyYXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBBIGNpcGhlciBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBsZXQgY2lwaGVyID0gQUVTLmNyZWF0ZUVuY3J5cHRvcihrZXlXb3JkQXJyYXksIHsgaXY6IGl2V29yZEFycmF5IH0pO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUVuY3J5cHRvcihrZXk6IFdvcmRBcnJheSwgY2ZnPzogQnVmZmVyZWRCbG9ja0FsZ29yaXRobUNvbmZpZyk6IENpcGhlciB7XHJcbiAgICAgICAgLy8gd29ya2Fyb3VuZCBmb3IgdHlwZXNjcmlwdCBub3QgYmVpbmcgYWJsZSB0byBjcmVhdGUgYSBhYnN0cmFjdCBjcmVhdG9yIGZ1bmN0aW9uIGRpcmVjdGx5XHJcbiAgICAgICAgY29uc3QgdGhpc0NsYXNzOiBhbnkgPSB0aGlzO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IHRoaXNDbGFzcyh0aGlzLl9FTkNfWEZPUk1fTU9ERSwga2V5LCBjZmcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyB0aGlzIGNpcGhlciBpbiBkZWNyeXB0aW9uIG1vZGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGtleSBUaGUga2V5LlxyXG4gICAgICogQHBhcmFtIGNmZyAoT3B0aW9uYWwpIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gdXNlIGZvciB0aGlzIG9wZXJhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIEEgY2lwaGVyIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKlxyXG4gICAgICogICAgIGxldCBjaXBoZXIgPSBBRVMuY3JlYXRlRGVjcnlwdG9yKGtleVdvcmRBcnJheSwgeyBpdjogaXZXb3JkQXJyYXkgfSk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlRGVjcnlwdG9yKGtleTogV29yZEFycmF5LCBjZmc/OiBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtQ29uZmlnKTogQ2lwaGVyIHtcclxuICAgICAgICAvLyB3b3JrYXJvdW5kIGZvciB0eXBlc2NyaXB0IG5vdCBiZWluZyBhYmxlIHRvIGNyZWF0ZSBhIGFic3RyYWN0IGNyZWF0b3IgZnVuY3Rpb24gZGlyZWN0bHlcclxuICAgICAgICBjb25zdCB0aGlzQ2xhc3M6IGFueSA9IHRoaXM7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgdGhpc0NsYXNzKHRoaXMuX0RFQ19YRk9STV9NT0RFLCBrZXksIGNmZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIHNob3J0Y3V0IGZ1bmN0aW9ucyB0byBhIGNpcGhlcidzIG9iamVjdCBpbnRlcmZhY2UuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNpcGhlciBUaGUgY2lwaGVyIHRvIGNyZWF0ZSBhIGhlbHBlciBmb3IuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBBbiBvYmplY3Qgd2l0aCBlbmNyeXB0IGFuZCBkZWNyeXB0IHNob3J0Y3V0IGZ1bmN0aW9ucy5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBsZXQgQUVTID0gQ2lwaGVyLl9jcmVhdGVIZWxwZXIoQUVTQWxnb3JpdGhtKTtcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBfY3JlYXRlSGVscGVyKGNpcGhlcjogdHlwZW9mIENpcGhlcikge1xyXG4gICAgICAgIGZ1bmN0aW9uIGVuY3J5cHQobWVzc2FnZTogV29yZEFycmF5IHwgc3RyaW5nLCBrZXk6IFdvcmRBcnJheSB8IHN0cmluZywgY2ZnPzogQnVmZmVyZWRCbG9ja0FsZ29yaXRobUNvbmZpZykge1xyXG4gICAgICAgICAgICBpZih0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBhc3N3b3JkQmFzZWRDaXBoZXIuZW5jcnlwdChjaXBoZXIsIG1lc3NhZ2UsIGtleSwgY2ZnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBTZXJpYWxpemFibGVDaXBoZXIuZW5jcnlwdChjaXBoZXIsIG1lc3NhZ2UsIGtleSwgY2ZnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZGVjcnlwdChjaXBoZXJ0ZXh0OiBDaXBoZXJQYXJhbXMgfCBzdHJpbmcsIGtleTogV29yZEFycmF5IHwgc3RyaW5nLCBjZmc/OiBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUGFzc3dvcmRCYXNlZENpcGhlci5kZWNyeXB0KGNpcGhlciwgY2lwaGVydGV4dCwga2V5LCBjZmcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFNlcmlhbGl6YWJsZUNpcGhlci5kZWNyeXB0KGNpcGhlciwgY2lwaGVydGV4dCwga2V5LCBjZmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlbmNyeXB0OiBlbmNyeXB0LFxyXG4gICAgICAgICAgICBkZWNyeXB0OiBkZWNyeXB0XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBjaXBoZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHhmb3JtTW9kZSBFaXRoZXIgdGhlIGVuY3J5cHRpb24gb3IgZGVjcnlwdGlvbiB0cmFuc29ybWF0aW9uIG1vZGUgY29uc3RhbnQuXHJcbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkuXHJcbiAgICAgKiBAcGFyYW0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgb3BlcmF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKlxyXG4gICAgICogICAgIGxldCBjaXBoZXIgPSBBRVMuY3JlYXRlKEFFUy5fRU5DX1hGT1JNX01PREUsIGtleVdvcmRBcnJheSwgeyBpdjogaXZXb3JkQXJyYXkgfSk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcih4Zm9ybU1vZGU6IG51bWJlciwga2V5OiBXb3JkQXJyYXksIGNmZz86IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG1Db25maWcpIHtcclxuICAgICAgICAvLyBBcHBseSBjb25maWcgZGVmYXVsdHNcclxuICAgICAgICBzdXBlcihPYmplY3QuYXNzaWduKHtcclxuICAgICAgICAgICAgYmxvY2tTaXplOiAxXHJcbiAgICAgICAgfSwgY2ZnKSk7XHJcblxyXG4gICAgICAgIC8vIFN0b3JlIHRyYW5zZm9ybSBtb2RlIGFuZCBrZXlcclxuICAgICAgICB0aGlzLl94Zm9ybU1vZGUgPSB4Zm9ybU1vZGU7XHJcbiAgICAgICAgdGhpcy5fa2V5ID0ga2V5O1xyXG5cclxuICAgICAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZXNcclxuICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGRhdGEgdG8gYmUgZW5jcnlwdGVkIG9yIGRlY3J5cHRlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZGF0YVVwZGF0ZSBUaGUgZGF0YSB0byBlbmNyeXB0IG9yIGRlY3J5cHQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBUaGUgZGF0YSBhZnRlciBwcm9jZXNzaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKlxyXG4gICAgICogICAgIGxldCBlbmNyeXB0ZWQgPSBjaXBoZXIucHJvY2VzcygnZGF0YScpO1xyXG4gICAgICogICAgIGxldCBlbmNyeXB0ZWQgPSBjaXBoZXIucHJvY2Vzcyh3b3JkQXJyYXkpO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcHJvY2VzcyhkYXRhVXBkYXRlOiBXb3JkQXJyYXkgfCBzdHJpbmcpOiBXb3JkQXJyYXkge1xyXG4gICAgICAgIC8vIEFwcGVuZFxyXG4gICAgICAgIHRoaXMuX2FwcGVuZChkYXRhVXBkYXRlKTtcclxuXHJcbiAgICAgICAgLy8gUHJvY2VzcyBhdmFpbGFibGUgYmxvY2tzXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbmFsaXplcyB0aGUgZW5jcnlwdGlvbiBvciBkZWNyeXB0aW9uIHByb2Nlc3MuXHJcbiAgICAgKiBOb3RlIHRoYXQgdGhlIGZpbmFsaXplIG9wZXJhdGlvbiBpcyBlZmZlY3RpdmVseSBhIGRlc3RydWN0aXZlLCByZWFkLW9uY2Ugb3BlcmF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkYXRhVXBkYXRlIFRoZSBmaW5hbCBkYXRhIHRvIGVuY3J5cHQgb3IgZGVjcnlwdC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIFRoZSBkYXRhIGFmdGVyIGZpbmFsIHByb2Nlc3NpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgdmFyIGVuY3J5cHRlZCA9IGNpcGhlci5maW5hbGl6ZSgpO1xyXG4gICAgICogICAgIHZhciBlbmNyeXB0ZWQgPSBjaXBoZXIuZmluYWxpemUoJ2RhdGEnKTtcclxuICAgICAqICAgICB2YXIgZW5jcnlwdGVkID0gY2lwaGVyLmZpbmFsaXplKHdvcmRBcnJheSk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBmaW5hbGl6ZShkYXRhVXBkYXRlPzogV29yZEFycmF5IHwgc3RyaW5nKTogV29yZEFycmF5IHtcclxuICAgICAgICAvLyBGaW5hbCBkYXRhIHVwZGF0ZVxyXG4gICAgICAgIGlmKGRhdGFVcGRhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXBwZW5kKGRhdGFVcGRhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1jaXBoZXIgbG9naWNcclxuICAgICAgICBjb25zdCBmaW5hbFByb2Nlc3NlZERhdGEgPSB0aGlzLl9kb0ZpbmFsaXplKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBmaW5hbFByb2Nlc3NlZERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaXBoZXIgc3BlY2lmaWMgZmluYWxpemUgZnVuY3Rpb24gZXhwbGljaXRseSBpbXBsZW1lbnRlZCBpbiB0aGUgZGVyaXZlZCBjbGFzcy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGFic3RyYWN0IF9kb0ZpbmFsaXplKCk6IFdvcmRBcnJheTtcclxufSJdfQ==