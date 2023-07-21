
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/lib/PasswordBasedCipher.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0007atd6eBKNazrJkQizznB', 'PasswordBasedCipher');
// hall/scripts/framework/libs/cryptoTs/lib/PasswordBasedCipher.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordBasedCipher = void 0;
var SerializableCipher_1 = require("./SerializableCipher");
var WordArray_1 = require("./WordArray");
var OpenSSL_1 = require("../format/OpenSSL");
var OpenSSLKdf_1 = require("../kdf/OpenSSLKdf");
var PasswordBasedCipher = /** @class */ (function () {
    function PasswordBasedCipher() {
    }
    /**
     * Encrypts a message using a password.
     *
     * @param cipher The cipher algorithm to use.
     * @param message The message to encrypt.
     * @param password The password.
     * @param cfg (Optional) The configuration options to use for this operation.
     *
     * @return A cipher params object.
     *
     * @example
     *
     *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(AES, message, 'password');
     *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(AES, message, 'password', { format: OpenSSL });
     */
    PasswordBasedCipher.encrypt = function (cipher, message, password, cfg) {
        // Apply config defaults
        var config = Object.assign({}, this.cfg, cfg);
        // Check if we have a kdf
        if (config.kdf === undefined) {
            throw new Error('missing kdf in config');
        }
        // Derive key and other params
        var derivedParams = config.kdf.execute(password, cipher.keySize, cipher.ivSize);
        // Check if we have an IV
        if (derivedParams.iv !== undefined) {
            // Add IV to config
            config.iv = derivedParams.iv;
        }
        // Encrypt
        var ciphertext = SerializableCipher_1.SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, config);
        // Mix in derived params
        return ciphertext.extend(derivedParams);
    };
    /**
     * Decrypts serialized ciphertext using a password.
     *
     * @param cipher The cipher algorithm to use.
     * @param ciphertext The ciphertext to decrypt.
     * @param password The password.
     * @param cfg (Optional) The configuration options to use for this operation.
     *
     * @return The plaintext.
     *
     * @example
     *
     *     var plaintext = PasswordBasedCipher.decrypt(AES, formattedCiphertext, 'password', { format: OpenSSL });
     *     var plaintext = PasswordBasedCipher.decrypt(AES, ciphertextParams, 'password', { format: OpenSSL });
     */
    PasswordBasedCipher.decrypt = function (cipher, ciphertext, password, cfg) {
        // Apply config defaults
        var config = Object.assign({}, this.cfg, cfg);
        // Check if we have a kdf
        if (config.format === undefined) {
            throw new Error('missing format in config');
        }
        // Convert string to CipherParams
        ciphertext = this._parse(ciphertext, config.format);
        // Check if we have a kdf
        if (config.kdf === undefined) {
            throw new Error('the key derivation function must be set');
        }
        // Derive key and other params
        var derivedParams = config.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
        // Check if we have an IV
        if (derivedParams.iv !== undefined) {
            // Add IV to config
            config.iv = derivedParams.iv;
        }
        // Decrypt
        var plaintext = SerializableCipher_1.SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, config);
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
    PasswordBasedCipher._parse = function (ciphertext, format) {
        if (typeof ciphertext === 'string') {
            return format.parse(ciphertext);
        }
        else {
            return ciphertext;
        }
    };
    PasswordBasedCipher.cfg = {
        blockSize: 4,
        iv: new WordArray_1.WordArray([]),
        format: OpenSSL_1.OpenSSL,
        kdf: OpenSSLKdf_1.OpenSSLKdf
    };
    return PasswordBasedCipher;
}());
exports.PasswordBasedCipher = PasswordBasedCipher;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcbGliXFxQYXNzd29yZEJhc2VkQ2lwaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUEwRDtBQUMxRCx5Q0FBd0M7QUFHeEMsNkNBQTRDO0FBRzVDLGdEQUErQztBQUUvQztJQUFBO0lBNkhBLENBQUM7SUFySEc7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDVywyQkFBTyxHQUFyQixVQUNJLE1BQXFCLEVBQ3JCLE9BQTJCLEVBQzNCLFFBQWdCLEVBQ2hCLEdBQWtDO1FBRWxDLHdCQUF3QjtRQUN4QixJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRWhELHlCQUF5QjtRQUN6QixJQUFHLE1BQU0sQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUM1QztRQUVELDhCQUE4QjtRQUM5QixJQUFNLGFBQWEsR0FBaUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRWhHLHlCQUF5QjtRQUN6QixJQUFHLGFBQWEsQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUFFO1lBQy9CLG1CQUFtQjtZQUNuQixNQUFNLENBQUMsRUFBRSxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUM7U0FDaEM7UUFFRCxVQUFVO1FBQ1YsSUFBTSxVQUFVLEdBQWlCLHVDQUFrQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVuSCx3QkFBd0I7UUFDeEIsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNXLDJCQUFPLEdBQXJCLFVBQ0ksTUFBcUIsRUFDckIsVUFBaUMsRUFDakMsUUFBZ0IsRUFDaEIsR0FBa0M7UUFFbEMsd0JBQXdCO1FBQ3hCLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFaEQseUJBQXlCO1FBQ3pCLElBQUcsTUFBTSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1NBQy9DO1FBRUQsaUNBQWlDO1FBQ2pDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFcEQseUJBQXlCO1FBQ3pCLElBQUcsTUFBTSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUU7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1NBQzlEO1FBRUQsOEJBQThCO1FBQzlCLElBQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5HLHlCQUF5QjtRQUN6QixJQUFHLGFBQWEsQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUFFO1lBQy9CLG1CQUFtQjtZQUNuQixNQUFNLENBQUMsRUFBRSxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUM7U0FDaEM7UUFFRCxVQUFVO1FBQ1YsSUFBTSxTQUFTLEdBQUcsdUNBQWtCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXZHLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDVywwQkFBTSxHQUFwQixVQUFxQixVQUFpQyxFQUFFLE1BQWlCO1FBQ3JFLElBQUcsT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO1lBQy9CLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0gsT0FBTyxVQUFVLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBM0hhLHVCQUFHLEdBQWlDO1FBQzlDLFNBQVMsRUFBRSxDQUFDO1FBQ1osRUFBRSxFQUFFLElBQUkscUJBQVMsQ0FBQyxFQUFFLENBQUM7UUFDckIsTUFBTSxFQUFFLGlCQUFPO1FBQ2YsR0FBRyxFQUFFLHVCQUFVO0tBQ2xCLENBQUM7SUF1SE4sMEJBQUM7Q0E3SEQsQUE2SEMsSUFBQTtBQTdIWSxrREFBbUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJpYWxpemFibGVDaXBoZXIgfSBmcm9tICcuL1NlcmlhbGl6YWJsZUNpcGhlcic7XHJcbmltcG9ydCB7IFdvcmRBcnJheSB9IGZyb20gJy4vV29yZEFycmF5JztcclxuaW1wb3J0IHsgQ2lwaGVyIH0gZnJvbSAnLi9DaXBoZXInO1xyXG5pbXBvcnQgeyBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtQ29uZmlnIH0gZnJvbSAnLi9CdWZmZXJlZEJsb2NrQWxnb3JpdGhtQ29uZmlnJztcclxuaW1wb3J0IHsgT3BlblNTTCB9IGZyb20gJy4uL2Zvcm1hdC9PcGVuU1NMJztcclxuaW1wb3J0IHsgQ2lwaGVyUGFyYW1zIH0gZnJvbSAnLi9DaXBoZXJQYXJhbXMnO1xyXG5pbXBvcnQgeyBGb3JtYXR0ZXIgfSBmcm9tICcuLi9mb3JtYXQvRm9ybWF0dGVyJztcclxuaW1wb3J0IHsgT3BlblNTTEtkZiB9IGZyb20gJy4uL2tkZi9PcGVuU1NMS2RmJztcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXNzd29yZEJhc2VkQ2lwaGVyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgY2ZnOiBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtQ29uZmlnID0ge1xyXG4gICAgICAgIGJsb2NrU2l6ZTogNCxcclxuICAgICAgICBpdjogbmV3IFdvcmRBcnJheShbXSksXHJcbiAgICAgICAgZm9ybWF0OiBPcGVuU1NMLFxyXG4gICAgICAgIGtkZjogT3BlblNTTEtkZlxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuY3J5cHRzIGEgbWVzc2FnZSB1c2luZyBhIHBhc3N3b3JkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaXBoZXIgVGhlIGNpcGhlciBhbGdvcml0aG0gdG8gdXNlLlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gZW5jcnlwdC5cclxuICAgICAqIEBwYXJhbSBwYXNzd29yZCBUaGUgcGFzc3dvcmQuXHJcbiAgICAgKiBAcGFyYW0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgb3BlcmF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gQSBjaXBoZXIgcGFyYW1zIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICB2YXIgY2lwaGVydGV4dFBhcmFtcyA9IENyeXB0b0pTLmxpYi5QYXNzd29yZEJhc2VkQ2lwaGVyLmVuY3J5cHQoQUVTLCBtZXNzYWdlLCAncGFzc3dvcmQnKTtcclxuICAgICAqICAgICB2YXIgY2lwaGVydGV4dFBhcmFtcyA9IENyeXB0b0pTLmxpYi5QYXNzd29yZEJhc2VkQ2lwaGVyLmVuY3J5cHQoQUVTLCBtZXNzYWdlLCAncGFzc3dvcmQnLCB7IGZvcm1hdDogT3BlblNTTCB9KTtcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBlbmNyeXB0KFxyXG4gICAgICAgIGNpcGhlcjogdHlwZW9mIENpcGhlcixcclxuICAgICAgICBtZXNzYWdlOiBXb3JkQXJyYXkgfCBzdHJpbmcsXHJcbiAgICAgICAgcGFzc3dvcmQ6IHN0cmluZyxcclxuICAgICAgICBjZmc/OiBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtQ29uZmlnXHJcbiAgICApOiBDaXBoZXJQYXJhbXMge1xyXG4gICAgICAgIC8vIEFwcGx5IGNvbmZpZyBkZWZhdWx0c1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY2ZnLCBjZmcpO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGEga2RmXHJcbiAgICAgICAgaWYoY29uZmlnLmtkZiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyBrZGYgaW4gY29uZmlnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZXJpdmUga2V5IGFuZCBvdGhlciBwYXJhbXNcclxuICAgICAgICBjb25zdCBkZXJpdmVkUGFyYW1zOiBDaXBoZXJQYXJhbXMgPSBjb25maWcua2RmLmV4ZWN1dGUocGFzc3dvcmQsIGNpcGhlci5rZXlTaXplLCBjaXBoZXIuaXZTaXplKTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UgaGF2ZSBhbiBJVlxyXG4gICAgICAgIGlmKGRlcml2ZWRQYXJhbXMuaXYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAvLyBBZGQgSVYgdG8gY29uZmlnXHJcbiAgICAgICAgICAgIGNvbmZpZy5pdiA9IGRlcml2ZWRQYXJhbXMuaXY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFbmNyeXB0XHJcbiAgICAgICAgY29uc3QgY2lwaGVydGV4dDogQ2lwaGVyUGFyYW1zID0gU2VyaWFsaXphYmxlQ2lwaGVyLmVuY3J5cHQuY2FsbCh0aGlzLCBjaXBoZXIsIG1lc3NhZ2UsIGRlcml2ZWRQYXJhbXMua2V5LCBjb25maWcpO1xyXG5cclxuICAgICAgICAvLyBNaXggaW4gZGVyaXZlZCBwYXJhbXNcclxuICAgICAgICByZXR1cm4gY2lwaGVydGV4dC5leHRlbmQoZGVyaXZlZFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWNyeXB0cyBzZXJpYWxpemVkIGNpcGhlcnRleHQgdXNpbmcgYSBwYXNzd29yZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2lwaGVyIFRoZSBjaXBoZXIgYWxnb3JpdGhtIHRvIHVzZS5cclxuICAgICAqIEBwYXJhbSBjaXBoZXJ0ZXh0IFRoZSBjaXBoZXJ0ZXh0IHRvIGRlY3J5cHQuXHJcbiAgICAgKiBAcGFyYW0gcGFzc3dvcmQgVGhlIHBhc3N3b3JkLlxyXG4gICAgICogQHBhcmFtIGNmZyAoT3B0aW9uYWwpIFRoZSBjb25maWd1cmF0aW9uIG9wdGlvbnMgdG8gdXNlIGZvciB0aGlzIG9wZXJhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIFRoZSBwbGFpbnRleHQuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgdmFyIHBsYWludGV4dCA9IFBhc3N3b3JkQmFzZWRDaXBoZXIuZGVjcnlwdChBRVMsIGZvcm1hdHRlZENpcGhlcnRleHQsICdwYXNzd29yZCcsIHsgZm9ybWF0OiBPcGVuU1NMIH0pO1xyXG4gICAgICogICAgIHZhciBwbGFpbnRleHQgPSBQYXNzd29yZEJhc2VkQ2lwaGVyLmRlY3J5cHQoQUVTLCBjaXBoZXJ0ZXh0UGFyYW1zLCAncGFzc3dvcmQnLCB7IGZvcm1hdDogT3BlblNTTCB9KTtcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkZWNyeXB0KFxyXG4gICAgICAgIGNpcGhlcjogdHlwZW9mIENpcGhlcixcclxuICAgICAgICBjaXBoZXJ0ZXh0OiBDaXBoZXJQYXJhbXMgfCBzdHJpbmcsXHJcbiAgICAgICAgcGFzc3dvcmQ6IHN0cmluZyxcclxuICAgICAgICBjZmc/OiBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtQ29uZmlnXHJcbiAgICApOiBXb3JkQXJyYXkge1xyXG4gICAgICAgIC8vIEFwcGx5IGNvbmZpZyBkZWZhdWx0c1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY2ZnLCBjZmcpO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGEga2RmXHJcbiAgICAgICAgaWYoY29uZmlnLmZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbWlzc2luZyBmb3JtYXQgaW4gY29uZmlnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDb252ZXJ0IHN0cmluZyB0byBDaXBoZXJQYXJhbXNcclxuICAgICAgICBjaXBoZXJ0ZXh0ID0gdGhpcy5fcGFyc2UoY2lwaGVydGV4dCwgY29uZmlnLmZvcm1hdCk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIGhhdmUgYSBrZGZcclxuICAgICAgICBpZihjb25maWcua2RmID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0aGUga2V5IGRlcml2YXRpb24gZnVuY3Rpb24gbXVzdCBiZSBzZXQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERlcml2ZSBrZXkgYW5kIG90aGVyIHBhcmFtc1xyXG4gICAgICAgIGNvbnN0IGRlcml2ZWRQYXJhbXMgPSBjb25maWcua2RmLmV4ZWN1dGUocGFzc3dvcmQsIGNpcGhlci5rZXlTaXplLCBjaXBoZXIuaXZTaXplLCBjaXBoZXJ0ZXh0LnNhbHQpO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB3ZSBoYXZlIGFuIElWXHJcbiAgICAgICAgaWYoZGVyaXZlZFBhcmFtcy5pdiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIC8vIEFkZCBJViB0byBjb25maWdcclxuICAgICAgICAgICAgY29uZmlnLml2ID0gZGVyaXZlZFBhcmFtcy5pdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERlY3J5cHRcclxuICAgICAgICBjb25zdCBwbGFpbnRleHQgPSBTZXJpYWxpemFibGVDaXBoZXIuZGVjcnlwdC5jYWxsKHRoaXMsIGNpcGhlciwgY2lwaGVydGV4dCwgZGVyaXZlZFBhcmFtcy5rZXksIGNvbmZpZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBwbGFpbnRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBzZXJpYWxpemVkIGNpcGhlcnRleHQgdG8gQ2lwaGVyUGFyYW1zLFxyXG4gICAgICogZWxzZSBhc3N1bWVkIENpcGhlclBhcmFtcyBhbHJlYWR5IGFuZCByZXR1cm5zIGNpcGhlcnRleHQgdW5jaGFuZ2VkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaXBoZXJ0ZXh0IFRoZSBjaXBoZXJ0ZXh0LlxyXG4gICAgICogQHBhcmFtIGZvcm1hdCBUaGUgZm9ybWF0dGluZyBzdHJhdGVneSB0byB1c2UgdG8gcGFyc2Ugc2VyaWFsaXplZCBjaXBoZXJ0ZXh0LlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gVGhlIHVuc2VyaWFsaXplZCBjaXBoZXJ0ZXh0LlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKlxyXG4gICAgICogICAgIHZhciBjaXBoZXJ0ZXh0UGFyYW1zID0gQ3J5cHRvSlMubGliLlNlcmlhbGl6YWJsZUNpcGhlci5fcGFyc2UoY2lwaGVydGV4dFN0cmluZ09yUGFyYW1zLCBmb3JtYXQpO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIF9wYXJzZShjaXBoZXJ0ZXh0OiBDaXBoZXJQYXJhbXMgfCBzdHJpbmcsIGZvcm1hdDogRm9ybWF0dGVyKTogQ2lwaGVyUGFyYW1zIHtcclxuICAgICAgICBpZih0eXBlb2YgY2lwaGVydGV4dCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5wYXJzZShjaXBoZXJ0ZXh0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gY2lwaGVydGV4dDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=