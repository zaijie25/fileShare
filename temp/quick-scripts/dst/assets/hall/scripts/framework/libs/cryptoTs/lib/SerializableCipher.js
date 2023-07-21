
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/lib/SerializableCipher.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '304daQV5rJFZK4j7/CAxJ2m', 'SerializableCipher');
// hall/scripts/framework/libs/cryptoTs/lib/SerializableCipher.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializableCipher = void 0;
var WordArray_1 = require("./WordArray");
var OpenSSL_1 = require("../format/OpenSSL");
var CipherParams_1 = require("./CipherParams");
var SerializableCipher = /** @class */ (function () {
    function SerializableCipher() {
    }
    /**
     * Encrypts a message.
     *
     * @param cipher The cipher algorithm to use.
     * @param message The message to encrypt.
     * @param key The key.
     * @param cfg (Optional) The configuration options to use for this operation.
     *
     * @return A cipher params object.
     *
     * @example
     *
     *     let ciphertextParams = SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
     *     let ciphertextParams = SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
     *     let ciphertextParams = SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, {
     *       iv: iv,
     *       format: CryptoJS.format.OpenSSL
     *     });
     */
    SerializableCipher.encrypt = function (cipher, message, key, cfg) {
        // Apply config defaults
        var config = Object.assign({}, this.cfg, cfg);
        // Encrypt
        var encryptor = cipher.createEncryptor(key, config);
        var ciphertext = encryptor.finalize(message);
        // Create and return serializable cipher params
        return new CipherParams_1.CipherParams({
            ciphertext: ciphertext,
            key: key,
            iv: encryptor.cfg.iv,
            algorithm: cipher,
            mode: encryptor.cfg.mode,
            padding: encryptor.cfg.padding,
            blockSize: encryptor.cfg.blockSize,
            formatter: config.format
        });
    };
    /**
     * Decrypts serialized ciphertext.
     *
     * @param cipher The cipher algorithm to use.
     * @param ciphertext The ciphertext to decrypt.
     * @param key The key.
     * @param cfg (Optional) The configuration options to use for this operation.
     *
     * @return The plaintext.
     *
     * @example
     *
     *     let plaintext = SerializableCipher.decrypt(
     *         AESAlgorithm,
     *         formattedCiphertext,
     *         key, {
     *             iv: iv,
     *             format: CryptoJS.format.OpenSSL
     *         }
     *     );
     *
     *     let plaintext = SerializableCipher.decrypt(
     *         AESAlgorithm,
     *         ciphertextParams,
     *         key, {
     *             iv: iv,
     *             format: CryptoJS.format.OpenSSL
     *         }
     *     );
     */
    SerializableCipher.decrypt = function (cipher, ciphertext, key, optionalCfg) {
        // Apply config defaults
        var cfg = Object.assign({}, this.cfg, optionalCfg);
        if (!cfg.format) {
            throw new Error('could not determine format');
        }
        // Convert string to CipherParams
        ciphertext = this._parse(ciphertext, cfg.format);
        if (!ciphertext.ciphertext) {
            throw new Error('could not determine ciphertext');
        }
        // Decrypt
        var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
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
    SerializableCipher._parse = function (ciphertext, format) {
        if (typeof ciphertext === 'string') {
            return format.parse(ciphertext);
        }
        else {
            return ciphertext;
        }
    };
    SerializableCipher.cfg = {
        blockSize: 4,
        iv: new WordArray_1.WordArray([]),
        format: OpenSSL_1.OpenSSL
    };
    return SerializableCipher;
}());
exports.SerializableCipher = SerializableCipher;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcbGliXFxTZXJpYWxpemFibGVDaXBoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBR3hDLDZDQUE0QztBQUM1QywrQ0FBOEM7QUFHOUM7SUFBQTtJQWdJQSxDQUFDO0lBekhHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDVywwQkFBTyxHQUFyQixVQUNJLE1BQXFCLEVBQ3JCLE9BQTJCLEVBQzNCLEdBQWMsRUFDZCxHQUFrQztRQUVsQyx3QkFBd0I7UUFDeEIsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVoRCxVQUFVO1FBQ1YsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEQsSUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUvQywrQ0FBK0M7UUFDL0MsT0FBTyxJQUFJLDJCQUFZLENBQUM7WUFDcEIsVUFBVSxFQUFFLFVBQVU7WUFDdEIsR0FBRyxFQUFFLEdBQUc7WUFDUixFQUFFLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLElBQUksRUFBUyxTQUFTLENBQUMsR0FBSSxDQUFDLElBQUk7WUFDaEMsT0FBTyxFQUFTLFNBQVMsQ0FBQyxHQUFJLENBQUMsT0FBTztZQUN0QyxTQUFTLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTO1lBQ2xDLFNBQVMsRUFBRSxNQUFNLENBQUMsTUFBTTtTQUMzQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBQ1csMEJBQU8sR0FBckIsVUFDSSxNQUFxQixFQUNyQixVQUFpQyxFQUNqQyxHQUFjLEVBQ2QsV0FBMEM7UUFFMUMsd0JBQXdCO1FBQ3hCLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFckQsSUFBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDakQ7UUFFRCxpQ0FBaUM7UUFDakMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVqRCxJQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRTtZQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7U0FDckQ7UUFFRCxVQUFVO1FBQ1YsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVuRixPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ1cseUJBQU0sR0FBcEIsVUFBcUIsVUFBaUMsRUFBRSxNQUFpQjtRQUNyRSxJQUFHLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtZQUMvQixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNILE9BQU8sVUFBVSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQTlIYSxzQkFBRyxHQUFpQztRQUM5QyxTQUFTLEVBQUUsQ0FBQztRQUNaLEVBQUUsRUFBRSxJQUFJLHFCQUFTLENBQUMsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sRUFBRSxpQkFBTztLQUNsQixDQUFDO0lBMkhOLHlCQUFDO0NBaElELEFBZ0lDLElBQUE7QUFoSVksZ0RBQWtCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV29yZEFycmF5IH0gZnJvbSAnLi9Xb3JkQXJyYXknO1xyXG5pbXBvcnQgeyBDaXBoZXIgfSBmcm9tICcuL0NpcGhlcic7XHJcbmltcG9ydCB7IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG1Db25maWcgfSBmcm9tICcuL0J1ZmZlcmVkQmxvY2tBbGdvcml0aG1Db25maWcnO1xyXG5pbXBvcnQgeyBPcGVuU1NMIH0gZnJvbSAnLi4vZm9ybWF0L09wZW5TU0wnO1xyXG5pbXBvcnQgeyBDaXBoZXJQYXJhbXMgfSBmcm9tICcuL0NpcGhlclBhcmFtcyc7XHJcbmltcG9ydCB7IEZvcm1hdHRlciB9IGZyb20gJy4uL2Zvcm1hdC9Gb3JtYXR0ZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlcmlhbGl6YWJsZUNpcGhlciB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGNmZzogQnVmZmVyZWRCbG9ja0FsZ29yaXRobUNvbmZpZyA9IHtcclxuICAgICAgICBibG9ja1NpemU6IDQsXHJcbiAgICAgICAgaXY6IG5ldyBXb3JkQXJyYXkoW10pLFxyXG4gICAgICAgIGZvcm1hdDogT3BlblNTTFxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEVuY3J5cHRzIGEgbWVzc2FnZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2lwaGVyIFRoZSBjaXBoZXIgYWxnb3JpdGhtIHRvIHVzZS5cclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGVuY3J5cHQuXHJcbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkuXHJcbiAgICAgKiBAcGFyYW0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgb3BlcmF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gQSBjaXBoZXIgcGFyYW1zIG9iamVjdC5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBsZXQgY2lwaGVydGV4dFBhcmFtcyA9IFNlcmlhbGl6YWJsZUNpcGhlci5lbmNyeXB0KENyeXB0b0pTLmFsZ28uQUVTLCBtZXNzYWdlLCBrZXkpO1xyXG4gICAgICogICAgIGxldCBjaXBoZXJ0ZXh0UGFyYW1zID0gU2VyaWFsaXphYmxlQ2lwaGVyLmVuY3J5cHQoQ3J5cHRvSlMuYWxnby5BRVMsIG1lc3NhZ2UsIGtleSwgeyBpdjogaXYgfSk7XHJcbiAgICAgKiAgICAgbGV0IGNpcGhlcnRleHRQYXJhbXMgPSBTZXJpYWxpemFibGVDaXBoZXIuZW5jcnlwdChDcnlwdG9KUy5hbGdvLkFFUywgbWVzc2FnZSwga2V5LCB7XHJcbiAgICAgKiAgICAgICBpdjogaXYsXHJcbiAgICAgKiAgICAgICBmb3JtYXQ6IENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMXHJcbiAgICAgKiAgICAgfSk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZW5jcnlwdChcclxuICAgICAgICBjaXBoZXI6IHR5cGVvZiBDaXBoZXIsXHJcbiAgICAgICAgbWVzc2FnZTogV29yZEFycmF5IHwgc3RyaW5nLFxyXG4gICAgICAgIGtleTogV29yZEFycmF5LFxyXG4gICAgICAgIGNmZz86IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG1Db25maWdcclxuICAgICk6IENpcGhlclBhcmFtcyB7XHJcbiAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXHJcbiAgICAgICAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jZmcsIGNmZyk7XHJcblxyXG4gICAgICAgIC8vIEVuY3J5cHRcclxuICAgICAgICBjb25zdCBlbmNyeXB0b3IgPSBjaXBoZXIuY3JlYXRlRW5jcnlwdG9yKGtleSwgY29uZmlnKTtcclxuICAgICAgICBjb25zdCBjaXBoZXJ0ZXh0ID0gZW5jcnlwdG9yLmZpbmFsaXplKG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYW5kIHJldHVybiBzZXJpYWxpemFibGUgY2lwaGVyIHBhcmFtc1xyXG4gICAgICAgIHJldHVybiBuZXcgQ2lwaGVyUGFyYW1zKHtcclxuICAgICAgICAgICAgY2lwaGVydGV4dDogY2lwaGVydGV4dCxcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIGl2OiBlbmNyeXB0b3IuY2ZnLml2LFxyXG4gICAgICAgICAgICBhbGdvcml0aG06IGNpcGhlcixcclxuICAgICAgICAgICAgbW9kZTogKDxhbnk+IGVuY3J5cHRvci5jZmcpLm1vZGUsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICg8YW55PiBlbmNyeXB0b3IuY2ZnKS5wYWRkaW5nLFxyXG4gICAgICAgICAgICBibG9ja1NpemU6IGVuY3J5cHRvci5jZmcuYmxvY2tTaXplLFxyXG4gICAgICAgICAgICBmb3JtYXR0ZXI6IGNvbmZpZy5mb3JtYXRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIERlY3J5cHRzIHNlcmlhbGl6ZWQgY2lwaGVydGV4dC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gY2lwaGVyIFRoZSBjaXBoZXIgYWxnb3JpdGhtIHRvIHVzZS5cclxuICAgICAqIEBwYXJhbSBjaXBoZXJ0ZXh0IFRoZSBjaXBoZXJ0ZXh0IHRvIGRlY3J5cHQuXHJcbiAgICAgKiBAcGFyYW0ga2V5IFRoZSBrZXkuXHJcbiAgICAgKiBAcGFyYW0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgb3BlcmF0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gVGhlIHBsYWludGV4dC5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBsZXQgcGxhaW50ZXh0ID0gU2VyaWFsaXphYmxlQ2lwaGVyLmRlY3J5cHQoXHJcbiAgICAgKiAgICAgICAgIEFFU0FsZ29yaXRobSxcclxuICAgICAqICAgICAgICAgZm9ybWF0dGVkQ2lwaGVydGV4dCxcclxuICAgICAqICAgICAgICAga2V5LCB7XHJcbiAgICAgKiAgICAgICAgICAgICBpdjogaXYsXHJcbiAgICAgKiAgICAgICAgICAgICBmb3JtYXQ6IENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMXHJcbiAgICAgKiAgICAgICAgIH1cclxuICAgICAqICAgICApO1xyXG4gICAgICpcclxuICAgICAqICAgICBsZXQgcGxhaW50ZXh0ID0gU2VyaWFsaXphYmxlQ2lwaGVyLmRlY3J5cHQoXHJcbiAgICAgKiAgICAgICAgIEFFU0FsZ29yaXRobSxcclxuICAgICAqICAgICAgICAgY2lwaGVydGV4dFBhcmFtcyxcclxuICAgICAqICAgICAgICAga2V5LCB7XHJcbiAgICAgKiAgICAgICAgICAgICBpdjogaXYsXHJcbiAgICAgKiAgICAgICAgICAgICBmb3JtYXQ6IENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMXHJcbiAgICAgKiAgICAgICAgIH1cclxuICAgICAqICAgICApO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRlY3J5cHQoXHJcbiAgICAgICAgY2lwaGVyOiB0eXBlb2YgQ2lwaGVyLFxyXG4gICAgICAgIGNpcGhlcnRleHQ6IENpcGhlclBhcmFtcyB8IHN0cmluZyxcclxuICAgICAgICBrZXk6IFdvcmRBcnJheSxcclxuICAgICAgICBvcHRpb25hbENmZz86IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG1Db25maWdcclxuICAgICk6IFdvcmRBcnJheSB7XHJcbiAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXHJcbiAgICAgICAgY29uc3QgY2ZnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jZmcsIG9wdGlvbmFsQ2ZnKTtcclxuXHJcbiAgICAgICAgaWYoIWNmZy5mb3JtYXQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgZGV0ZXJtaW5lIGZvcm1hdCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gQ2lwaGVyUGFyYW1zXHJcbiAgICAgICAgY2lwaGVydGV4dCA9IHRoaXMuX3BhcnNlKGNpcGhlcnRleHQsIGNmZy5mb3JtYXQpO1xyXG5cclxuICAgICAgICBpZighY2lwaGVydGV4dC5jaXBoZXJ0ZXh0KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IGRldGVybWluZSBjaXBoZXJ0ZXh0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZWNyeXB0XHJcbiAgICAgICAgY29uc3QgcGxhaW50ZXh0ID0gY2lwaGVyLmNyZWF0ZURlY3J5cHRvcihrZXksIGNmZykuZmluYWxpemUoY2lwaGVydGV4dC5jaXBoZXJ0ZXh0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBsYWludGV4dDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnZlcnRzIHNlcmlhbGl6ZWQgY2lwaGVydGV4dCB0byBDaXBoZXJQYXJhbXMsXHJcbiAgICAgKiBlbHNlIGFzc3VtZWQgQ2lwaGVyUGFyYW1zIGFscmVhZHkgYW5kIHJldHVybnMgY2lwaGVydGV4dCB1bmNoYW5nZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNpcGhlcnRleHQgVGhlIGNpcGhlcnRleHQuXHJcbiAgICAgKiBAcGFyYW0gZm9ybWF0IFRoZSBmb3JtYXR0aW5nIHN0cmF0ZWd5IHRvIHVzZSB0byBwYXJzZSBzZXJpYWxpemVkIGNpcGhlcnRleHQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBUaGUgdW5zZXJpYWxpemVkIGNpcGhlcnRleHQuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgdmFyIGNpcGhlcnRleHRQYXJhbXMgPSBDcnlwdG9KUy5saWIuU2VyaWFsaXphYmxlQ2lwaGVyLl9wYXJzZShjaXBoZXJ0ZXh0U3RyaW5nT3JQYXJhbXMsIGZvcm1hdCk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgX3BhcnNlKGNpcGhlcnRleHQ6IENpcGhlclBhcmFtcyB8IHN0cmluZywgZm9ybWF0OiBGb3JtYXR0ZXIpOiBDaXBoZXJQYXJhbXMge1xyXG4gICAgICAgIGlmKHR5cGVvZiBjaXBoZXJ0ZXh0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0LnBhcnNlKGNpcGhlcnRleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjaXBoZXJ0ZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==