
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/kdf/OpenSSLKdf.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '22c8ccQnJlGGKrzZmoRCI/O', 'OpenSSLKdf');
// hall/scripts/framework/libs/cryptoTs/kdf/OpenSSLKdf.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSSLKdf = void 0;
var WordArray_1 = require("../lib/WordArray");
var CipherParams_1 = require("../lib/CipherParams");
var EvpKDF_1 = require("../algo/EvpKDF");
var OpenSSLKdf = /** @class */ (function () {
    function OpenSSLKdf() {
    }
    /**
     * Derives a key and IV from a password.
     *
     * @param password The password to derive from.
     * @param keySize The size in words of the key to generate.
     * @param ivSize The size in words of the IV to generate.
     * @param salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
     *
     * @return A cipher params object with the key, IV, and salt.
     *
     * @example
     *
     *     let derivedParams = OpenSSL.execute('Password', 256/32, 128/32);
     *     let derivedParams = OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
     */
    OpenSSLKdf.execute = function (password, keySize, ivSize, salt) {
        // Generate random salt
        if (!salt) {
            salt = WordArray_1.WordArray.random(64 / 8);
        }
        // Derive key and IV
        var key = (new EvpKDF_1.EvpKDF({ keySize: keySize + ivSize })).compute(password, salt);
        // Separate key and IV
        var iv = new WordArray_1.WordArray(key.words.slice(keySize), ivSize * 4);
        key.sigBytes = keySize * 4;
        // Return params
        return new CipherParams_1.CipherParams({ key: key, iv: iv, salt: salt });
    };
    return OpenSSLKdf;
}());
exports.OpenSSLKdf = OpenSSLKdf;
var _ = OpenSSLKdf;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xca2RmXFxPcGVuU1NMS2RmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUE2QztBQUM3QyxvREFBbUQ7QUFDbkQseUNBQXdDO0FBRXhDO0lBQUE7SUFnQ0EsQ0FBQztJQS9CRzs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNXLGtCQUFPLEdBQXJCLFVBQXNCLFFBQWdCLEVBQUUsT0FBZSxFQUFFLE1BQWMsRUFBRSxJQUF5QjtRQUM5Rix1QkFBdUI7UUFDdkIsSUFBRyxDQUFDLElBQUksRUFBRTtZQUNOLElBQUksR0FBRyxxQkFBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDbkM7UUFFRCxvQkFBb0I7UUFDcEIsSUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLGVBQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFaEYsc0JBQXNCO1FBQ3RCLElBQU0sRUFBRSxHQUFHLElBQUkscUJBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0QsR0FBRyxDQUFDLFFBQVEsR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLGdCQUFnQjtRQUNoQixPQUFPLElBQUksMkJBQVksQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQWhDQSxBQWdDQyxJQUFBO0FBaENZLGdDQUFVO0FBa0N2QixJQUFNLENBQUMsR0FBUSxVQUFVLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBLREYgfSBmcm9tICcuL0tERic7XHJcbmltcG9ydCB7IFdvcmRBcnJheSB9IGZyb20gJy4uL2xpYi9Xb3JkQXJyYXknO1xyXG5pbXBvcnQgeyBDaXBoZXJQYXJhbXMgfSBmcm9tICcuLi9saWIvQ2lwaGVyUGFyYW1zJztcclxuaW1wb3J0IHsgRXZwS0RGIH0gZnJvbSAnLi4vYWxnby9FdnBLREYnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9wZW5TU0xLZGYge1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZXJpdmVzIGEga2V5IGFuZCBJViBmcm9tIGEgcGFzc3dvcmQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhc3N3b3JkIFRoZSBwYXNzd29yZCB0byBkZXJpdmUgZnJvbS5cclxuICAgICAqIEBwYXJhbSBrZXlTaXplIFRoZSBzaXplIGluIHdvcmRzIG9mIHRoZSBrZXkgdG8gZ2VuZXJhdGUuXHJcbiAgICAgKiBAcGFyYW0gaXZTaXplIFRoZSBzaXplIGluIHdvcmRzIG9mIHRoZSBJViB0byBnZW5lcmF0ZS5cclxuICAgICAqIEBwYXJhbSBzYWx0IChPcHRpb25hbCkgQSA2NC1iaXQgc2FsdCB0byB1c2UuIElmIG9taXR0ZWQsIGEgc2FsdCB3aWxsIGJlIGdlbmVyYXRlZCByYW5kb21seS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIEEgY2lwaGVyIHBhcmFtcyBvYmplY3Qgd2l0aCB0aGUga2V5LCBJViwgYW5kIHNhbHQuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgbGV0IGRlcml2ZWRQYXJhbXMgPSBPcGVuU1NMLmV4ZWN1dGUoJ1Bhc3N3b3JkJywgMjU2LzMyLCAxMjgvMzIpO1xyXG4gICAgICogICAgIGxldCBkZXJpdmVkUGFyYW1zID0gT3BlblNTTC5leGVjdXRlKCdQYXNzd29yZCcsIDI1Ni8zMiwgMTI4LzMyLCAnc2FsdHNhbHQnKTtcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBleGVjdXRlKHBhc3N3b3JkOiBzdHJpbmcsIGtleVNpemU6IG51bWJlciwgaXZTaXplOiBudW1iZXIsIHNhbHQ/OiBXb3JkQXJyYXkgfCBzdHJpbmcpOiBDaXBoZXJQYXJhbXMge1xyXG4gICAgICAgIC8vIEdlbmVyYXRlIHJhbmRvbSBzYWx0XHJcbiAgICAgICAgaWYoIXNhbHQpIHtcclxuICAgICAgICAgICAgc2FsdCA9IFdvcmRBcnJheS5yYW5kb20oNjQgLyA4KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERlcml2ZSBrZXkgYW5kIElWXHJcbiAgICAgICAgY29uc3Qga2V5ID0gKG5ldyBFdnBLREYoeyBrZXlTaXplOiBrZXlTaXplICsgaXZTaXplIH0pKS5jb21wdXRlKHBhc3N3b3JkLCBzYWx0KTtcclxuXHJcbiAgICAgICAgLy8gU2VwYXJhdGUga2V5IGFuZCBJVlxyXG4gICAgICAgIGNvbnN0IGl2ID0gbmV3IFdvcmRBcnJheShrZXkud29yZHMuc2xpY2Uoa2V5U2l6ZSksIGl2U2l6ZSAqIDQpO1xyXG4gICAgICAgIGtleS5zaWdCeXRlcyA9IGtleVNpemUgKiA0O1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gcGFyYW1zXHJcbiAgICAgICAgcmV0dXJuIG5ldyBDaXBoZXJQYXJhbXMoeyBrZXk6IGtleSwgaXY6IGl2LCBzYWx0OiBzYWx0IH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBfOiBLREYgPSBPcGVuU1NMS2RmOyJdfQ==