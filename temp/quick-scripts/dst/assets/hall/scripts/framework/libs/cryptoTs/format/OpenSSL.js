
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/format/OpenSSL.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '11f09CdWepNz7y60SFiZhJz', 'OpenSSL');
// hall/scripts/framework/libs/cryptoTs/format/OpenSSL.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenSSL = void 0;
var CipherParams_1 = require("../lib/CipherParams");
var WordArray_1 = require("../lib/WordArray");
var Base64_1 = require("../enc/Base64");
var OpenSSL = /** @class */ (function () {
    function OpenSSL() {
    }
    /**
     * Converts a cipher params object to an OpenSSL-compatible string.
     *
     * @param cipherParams The cipher params object.
     *
     * @return The OpenSSL-compatible string.
     *
     * @example
     *
     *     let openSSLString = OpenSSLFormatter.stringify(cipherParams);
     */
    OpenSSL.stringify = function (cipherParams) {
        if (!cipherParams.ciphertext) {
            throw new Error('missing ciphertext in params');
        }
        // Shortcuts
        var ciphertext = cipherParams.ciphertext;
        var salt = cipherParams.salt;
        // Format
        var wordArray;
        if (salt) {
            if (typeof salt === 'string') {
                throw new Error('salt is expected to be a WordArray');
            }
            wordArray = (new WordArray_1.WordArray([0x53616c74, 0x65645f5f])).concat(salt).concat(ciphertext);
        }
        else {
            wordArray = ciphertext;
        }
        return wordArray.toString(Base64_1.Base64);
    };
    /**
     * Converts an OpenSSL-compatible string to a cipher params object.
     *
     * @param openSSLStr The OpenSSL-compatible string.
     *
     * @return The cipher params object.
     *
     * @example
     *
     *     let cipherParams = OpenSSLFormatter.parse(openSSLString);
     */
    OpenSSL.parse = function (openSSLStr) {
        // Parse base64
        var ciphertext = Base64_1.Base64.parse(openSSLStr);
        // Test for salt
        var salt;
        if (ciphertext.words[0] === 0x53616c74 && ciphertext.words[1] === 0x65645f5f) {
            // Extract salt
            salt = new WordArray_1.WordArray(ciphertext.words.slice(2, 4));
            // Remove salt from ciphertext
            ciphertext.words.splice(0, 4);
            ciphertext.sigBytes -= 16;
        }
        return new CipherParams_1.CipherParams({ ciphertext: ciphertext, salt: salt });
    };
    return OpenSSL;
}());
exports.OpenSSL = OpenSSL;
// type guard for OpenSSL formatter (to ensure it has the required static methods)
var _ = OpenSSL;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcZm9ybWF0XFxPcGVuU1NMLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLG9EQUFtRDtBQUNuRCw4Q0FBNkM7QUFDN0Msd0NBQXVDO0FBRXZDO0lBQUE7SUFnRUEsQ0FBQztJQS9ERzs7Ozs7Ozs7OztPQVVHO0lBQ1csaUJBQVMsR0FBdkIsVUFBd0IsWUFBMEI7UUFDOUMsSUFBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUU7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsWUFBWTtRQUNaLElBQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUM7UUFDM0MsSUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztRQUUvQixTQUFTO1FBQ1QsSUFBSSxTQUFvQixDQUFDO1FBQ3pCLElBQUcsSUFBSSxFQUFFO1lBQ0wsSUFBRyxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQzthQUN6RDtZQUVELFNBQVMsR0FBRyxDQUFDLElBQUkscUJBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN6RjthQUFNO1lBQ0gsU0FBUyxHQUFHLFVBQVUsQ0FBQztTQUMxQjtRQUVELE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxlQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNXLGFBQUssR0FBbkIsVUFBb0IsVUFBa0I7UUFDbEMsZUFBZTtRQUNmLElBQU0sVUFBVSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFNUMsZ0JBQWdCO1FBQ2hCLElBQUksSUFBMkIsQ0FBQztRQUNoQyxJQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxFQUFFO1lBQ3pFLGVBQWU7WUFDZixJQUFJLEdBQUcsSUFBSSxxQkFBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRW5ELDhCQUE4QjtZQUM5QixVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDOUIsVUFBVSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7U0FDN0I7UUFFRCxPQUFPLElBQUksMkJBQVksQ0FBQyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQWhFQSxBQWdFQyxJQUFBO0FBaEVZLDBCQUFPO0FBa0VwQixrRkFBa0Y7QUFDbEYsSUFBTSxDQUFDLEdBQWMsT0FBTyxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybWF0dGVyIH0gZnJvbSAnLi9Gb3JtYXR0ZXInO1xyXG5pbXBvcnQgeyBDaXBoZXJQYXJhbXMgfSBmcm9tICcuLi9saWIvQ2lwaGVyUGFyYW1zJztcclxuaW1wb3J0IHsgV29yZEFycmF5IH0gZnJvbSAnLi4vbGliL1dvcmRBcnJheSc7XHJcbmltcG9ydCB7IEJhc2U2NCB9IGZyb20gJy4uL2VuYy9CYXNlNjQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9wZW5TU0wge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhIGNpcGhlciBwYXJhbXMgb2JqZWN0IHRvIGFuIE9wZW5TU0wtY29tcGF0aWJsZSBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNpcGhlclBhcmFtcyBUaGUgY2lwaGVyIHBhcmFtcyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBUaGUgT3BlblNTTC1jb21wYXRpYmxlIHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBsZXQgb3BlblNTTFN0cmluZyA9IE9wZW5TU0xGb3JtYXR0ZXIuc3RyaW5naWZ5KGNpcGhlclBhcmFtcyk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5naWZ5KGNpcGhlclBhcmFtczogQ2lwaGVyUGFyYW1zKTogc3RyaW5nIHtcclxuICAgICAgICBpZighY2lwaGVyUGFyYW1zLmNpcGhlcnRleHQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIGNpcGhlcnRleHQgaW4gcGFyYW1zJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaG9ydGN1dHNcclxuICAgICAgICBjb25zdCBjaXBoZXJ0ZXh0ID0gY2lwaGVyUGFyYW1zLmNpcGhlcnRleHQ7XHJcbiAgICAgICAgY29uc3Qgc2FsdCA9IGNpcGhlclBhcmFtcy5zYWx0O1xyXG5cclxuICAgICAgICAvLyBGb3JtYXRcclxuICAgICAgICBsZXQgd29yZEFycmF5OiBXb3JkQXJyYXk7XHJcbiAgICAgICAgaWYoc2FsdCkge1xyXG4gICAgICAgICAgICBpZih0eXBlb2Ygc2FsdCA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc2FsdCBpcyBleHBlY3RlZCB0byBiZSBhIFdvcmRBcnJheScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3b3JkQXJyYXkgPSAobmV3IFdvcmRBcnJheShbMHg1MzYxNmM3NCwgMHg2NTY0NWY1Zl0pKS5jb25jYXQoc2FsdCkuY29uY2F0KGNpcGhlcnRleHQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdvcmRBcnJheSA9IGNpcGhlcnRleHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gd29yZEFycmF5LnRvU3RyaW5nKEJhc2U2NCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0cyBhbiBPcGVuU1NMLWNvbXBhdGlibGUgc3RyaW5nIHRvIGEgY2lwaGVyIHBhcmFtcyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG9wZW5TU0xTdHIgVGhlIE9wZW5TU0wtY29tcGF0aWJsZSBzdHJpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiBUaGUgY2lwaGVyIHBhcmFtcyBvYmplY3QuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgbGV0IGNpcGhlclBhcmFtcyA9IE9wZW5TU0xGb3JtYXR0ZXIucGFyc2Uob3BlblNTTFN0cmluZyk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcGFyc2Uob3BlblNTTFN0cjogc3RyaW5nKTogQ2lwaGVyUGFyYW1zIHtcclxuICAgICAgICAvLyBQYXJzZSBiYXNlNjRcclxuICAgICAgICBjb25zdCBjaXBoZXJ0ZXh0ID0gQmFzZTY0LnBhcnNlKG9wZW5TU0xTdHIpO1xyXG5cclxuICAgICAgICAvLyBUZXN0IGZvciBzYWx0XHJcbiAgICAgICAgbGV0IHNhbHQ6IFdvcmRBcnJheSB8IHVuZGVmaW5lZDtcclxuICAgICAgICBpZihjaXBoZXJ0ZXh0LndvcmRzWzBdID09PSAweDUzNjE2Yzc0ICYmIGNpcGhlcnRleHQud29yZHNbMV0gPT09IDB4NjU2NDVmNWYpIHtcclxuICAgICAgICAgICAgLy8gRXh0cmFjdCBzYWx0XHJcbiAgICAgICAgICAgIHNhbHQgPSBuZXcgV29yZEFycmF5KGNpcGhlcnRleHQud29yZHMuc2xpY2UoMiwgNCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHNhbHQgZnJvbSBjaXBoZXJ0ZXh0XHJcbiAgICAgICAgICAgIGNpcGhlcnRleHQud29yZHMuc3BsaWNlKDAsIDQpO1xyXG4gICAgICAgICAgICBjaXBoZXJ0ZXh0LnNpZ0J5dGVzIC09IDE2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBDaXBoZXJQYXJhbXMoeyBjaXBoZXJ0ZXh0OiBjaXBoZXJ0ZXh0LCBzYWx0OiBzYWx0IH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyB0eXBlIGd1YXJkIGZvciBPcGVuU1NMIGZvcm1hdHRlciAodG8gZW5zdXJlIGl0IGhhcyB0aGUgcmVxdWlyZWQgc3RhdGljIG1ldGhvZHMpXHJcbmNvbnN0IF86IEZvcm1hdHRlciA9IE9wZW5TU0w7Il19