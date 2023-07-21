
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/libs/cryptoTs/lib/CipherParams.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxsaWJzXFxjcnlwdG9Uc1xcbGliXFxDaXBoZXJQYXJhbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUE4QjtBQVE5QjtJQUFrQyxnQ0FBSTtJQW1CbEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILHNCQUFtQixZQUFtQztRQUF0RCxZQUNJLGlCQUFPLFNBV1Y7UUFURyxLQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUM7UUFDMUMsS0FBSSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDO1FBQzVCLEtBQUksQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQztRQUMxQixLQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7UUFDOUIsS0FBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDO1FBQ3hDLEtBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQztRQUM5QixLQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUM7UUFDcEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDO1FBQ3hDLEtBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQzs7SUFDNUMsQ0FBQztJQUVNLDZCQUFNLEdBQWIsVUFBYyxnQkFBOEI7UUFDeEMsSUFBRyxnQkFBZ0IsQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQzFDLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDO1NBQ2pEO1FBRUQsSUFBRyxnQkFBZ0IsQ0FBQyxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ25DLElBQUksQ0FBQyxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDO1NBQ25DO1FBRUQsSUFBRyxnQkFBZ0IsQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO1NBQ2pDO1FBRUQsSUFBRyxnQkFBZ0IsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1NBQ3JDO1FBRUQsSUFBRyxnQkFBZ0IsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1NBQy9DO1FBRUQsSUFBRyxnQkFBZ0IsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1NBQ3JDO1FBRUQsSUFBRyxnQkFBZ0IsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO1NBQzNDO1FBRUQsSUFBRyxnQkFBZ0IsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1NBQy9DO1FBRUQsSUFBRyxnQkFBZ0IsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1NBQy9DO1FBR0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0ksK0JBQVEsR0FBZixVQUFnQixTQUFxQjtRQUNqQyxJQUFHLFNBQVMsRUFBRTtZQUNWLE9BQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pDO2FBQU07WUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLHlFQUF5RSxDQUFDLENBQUM7U0FDOUY7SUFDTCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXJIQSxBQXFIQyxDQXJIaUMsV0FBSSxHQXFIckM7QUFySFksb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlIH0gZnJvbSAnLi9CYXNlJztcclxuaW1wb3J0IHsgQ2lwaGVyUGFyYW1zSW50ZXJmYWNlIH0gZnJvbSAnLi9DaXBoZXJQYXJhbXNJbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBXb3JkQXJyYXkgfSBmcm9tICcuL1dvcmRBcnJheSc7XHJcbmltcG9ydCB7IENpcGhlciB9IGZyb20gJy4vQ2lwaGVyJztcclxuaW1wb3J0IHsgQmxvY2tDaXBoZXJNb2RlIH0gZnJvbSAnLi4vbW9kZS9CbG9ja0NpcGhlck1vZGUnO1xyXG5pbXBvcnQgeyBQYWRkaW5nIH0gZnJvbSAnLi4vcGFkL1BhZGRpbmcnO1xyXG5pbXBvcnQgeyBGb3JtYXR0ZXIgfSBmcm9tICcuLi9mb3JtYXQvRm9ybWF0dGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDaXBoZXJQYXJhbXMgZXh0ZW5kcyBCYXNlIGltcGxlbWVudHMgQ2lwaGVyUGFyYW1zSW50ZXJmYWNlIHtcclxuICAgIGNpcGhlcnRleHQ/OiBXb3JkQXJyYXk7XHJcblxyXG4gICAga2V5PzogV29yZEFycmF5IHwgc3RyaW5nO1xyXG5cclxuICAgIGl2PzogV29yZEFycmF5O1xyXG5cclxuICAgIHNhbHQ/OiBXb3JkQXJyYXkgfCBzdHJpbmc7XHJcblxyXG4gICAgYWxnb3JpdGhtPzogdHlwZW9mIENpcGhlcjtcclxuXHJcbiAgICBtb2RlPzogdHlwZW9mIEJsb2NrQ2lwaGVyTW9kZTtcclxuXHJcbiAgICBwYWRkaW5nPzogUGFkZGluZztcclxuXHJcbiAgICBibG9ja1NpemU/OiBudW1iZXI7XHJcblxyXG4gICAgZm9ybWF0dGVyPzogRm9ybWF0dGVyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIGNpcGhlciBwYXJhbXMgb2JqZWN0LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBjaXBoZXJQYXJhbXMgQW4gb2JqZWN0IHdpdGggYW55IG9mIHRoZSBwb3NzaWJsZSBjaXBoZXIgcGFyYW1ldGVycy5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICpcclxuICAgICAqICAgICBsZXQgY2lwaGVyUGFyYW1zID0gQ2lwaGVyUGFyYW1zLmNyZWF0ZSh7XHJcbiAgICAgKiAgICAgICAgIGNpcGhlcnRleHQ6IGNpcGhlcnRleHRXb3JkQXJyYXksXHJcbiAgICAgKiAgICAgICAgIGtleToga2V5V29yZEFycmF5LFxyXG4gICAgICogICAgICAgICBpdjogaXZXb3JkQXJyYXksXHJcbiAgICAgKiAgICAgICAgIHNhbHQ6IHNhbHRXb3JkQXJyYXksXHJcbiAgICAgKiAgICAgICAgIGFsZ29yaXRobTogQUVTQWxnb3JpdGhtLFxyXG4gICAgICogICAgICAgICBtb2RlOiBDQkMsXHJcbiAgICAgKiAgICAgICAgIHBhZGRpbmc6IFBLQ1M3LFxyXG4gICAgICogICAgICAgICBibG9ja1NpemU6IDQsXHJcbiAgICAgKiAgICAgICAgIGZvcm1hdHRlcjogT3BlblNTTEZvcm1hdHRlclxyXG4gICAgICogICAgIH0pO1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY2lwaGVyUGFyYW1zOiBDaXBoZXJQYXJhbXNJbnRlcmZhY2UpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmNpcGhlcnRleHQgPSBjaXBoZXJQYXJhbXMuY2lwaGVydGV4dDtcclxuICAgICAgICB0aGlzLmtleSA9IGNpcGhlclBhcmFtcy5rZXk7XHJcbiAgICAgICAgdGhpcy5pdiA9IGNpcGhlclBhcmFtcy5pdjtcclxuICAgICAgICB0aGlzLnNhbHQgPSBjaXBoZXJQYXJhbXMuc2FsdDtcclxuICAgICAgICB0aGlzLmFsZ29yaXRobSA9IGNpcGhlclBhcmFtcy5hbGdvcml0aG07XHJcbiAgICAgICAgdGhpcy5tb2RlID0gY2lwaGVyUGFyYW1zLm1vZGU7XHJcbiAgICAgICAgdGhpcy5wYWRkaW5nID0gY2lwaGVyUGFyYW1zLnBhZGRpbmc7XHJcbiAgICAgICAgdGhpcy5ibG9ja1NpemUgPSBjaXBoZXJQYXJhbXMuYmxvY2tTaXplO1xyXG4gICAgICAgIHRoaXMuZm9ybWF0dGVyID0gY2lwaGVyUGFyYW1zLmZvcm1hdHRlcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXh0ZW5kKGFkZGl0aW9uYWxQYXJhbXM6IENpcGhlclBhcmFtcyk6IENpcGhlclBhcmFtcyB7XHJcbiAgICAgICAgaWYoYWRkaXRpb25hbFBhcmFtcy5jaXBoZXJ0ZXh0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaXBoZXJ0ZXh0ID0gYWRkaXRpb25hbFBhcmFtcy5jaXBoZXJ0ZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYWRkaXRpb25hbFBhcmFtcy5rZXkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmtleSA9IGFkZGl0aW9uYWxQYXJhbXMua2V5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYWRkaXRpb25hbFBhcmFtcy5pdiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXYgPSBhZGRpdGlvbmFsUGFyYW1zLml2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYWRkaXRpb25hbFBhcmFtcy5zYWx0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zYWx0ID0gYWRkaXRpb25hbFBhcmFtcy5zYWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYWRkaXRpb25hbFBhcmFtcy5hbGdvcml0aG0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFsZ29yaXRobSA9IGFkZGl0aW9uYWxQYXJhbXMuYWxnb3JpdGhtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYWRkaXRpb25hbFBhcmFtcy5tb2RlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlID0gYWRkaXRpb25hbFBhcmFtcy5tb2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYWRkaXRpb25hbFBhcmFtcy5wYWRkaW5nICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWRkaW5nID0gYWRkaXRpb25hbFBhcmFtcy5wYWRkaW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYWRkaXRpb25hbFBhcmFtcy5ibG9ja1NpemUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmJsb2NrU2l6ZSA9IGFkZGl0aW9uYWxQYXJhbXMuYmxvY2tTaXplO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYWRkaXRpb25hbFBhcmFtcy5mb3JtYXR0ZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1hdHRlciA9IGFkZGl0aW9uYWxQYXJhbXMuZm9ybWF0dGVyO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29udmVydHMgdGhpcyBjaXBoZXIgcGFyYW1zIG9iamVjdCB0byBhIHN0cmluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZm9ybWF0dGVyIChPcHRpb25hbCkgVGhlIGZvcm1hdHRpbmcgc3RyYXRlZ3kgdG8gdXNlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4gVGhlIHN0cmluZ2lmaWVkIGNpcGhlciBwYXJhbXMuXHJcbiAgICAgKlxyXG4gICAgICogQHRocm93cyBFcnJvciBJZiBuZWl0aGVyIHRoZSBmb3JtYXR0ZXIgbm9yIHRoZSBkZWZhdWx0IGZvcm1hdHRlciBpcyBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiAgICAgbGV0IHN0cmluZyA9IGNpcGhlclBhcmFtcyArICcnO1xyXG4gICAgICogICAgIGxldCBzdHJpbmcgPSBjaXBoZXJQYXJhbXMudG9TdHJpbmcoKTtcclxuICAgICAqICAgICBsZXQgc3RyaW5nID0gY2lwaGVyUGFyYW1zLnRvU3RyaW5nKENyeXB0b0pTLmZvcm1hdC5PcGVuU1NMKTtcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRvU3RyaW5nKGZvcm1hdHRlcj86IEZvcm1hdHRlcik6IHN0cmluZyB7XHJcbiAgICAgICAgaWYoZm9ybWF0dGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZXIuc3RyaW5naWZ5KHRoaXMpO1xyXG4gICAgICAgIH0gZWxzZSBpZih0aGlzLmZvcm1hdHRlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXR0ZXIuc3RyaW5naWZ5KHRoaXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2lwaGVyIG5lZWRzIGEgZm9ybWF0dGVyIHRvIGJlIGFibGUgdG8gY29udmVydCB0aGUgcmVzdWx0IGludG8gYSBzdHJpbmcnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=