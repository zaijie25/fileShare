
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/AESUtil.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '54027Buy+RKIIJXc5rn+jfZ', 'AESUtil');
// hall/scripts/logic/core/tool/AESUtil.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AESUtil = void 0;
var Hasher_1 = require("../../../framework/libs/cryptoTs/lib/Hasher");
var MD5_1 = require("../../../framework/libs/cryptoTs/algo/MD5");
var Crypto = require("../../../framework/libs/cryptoTs/crypto-ts");
/**
 * 加解密,MD5操作
 * @author Peter
 *
*/
var AESUtil = /** @class */ (function () {
    function AESUtil() {
        this.cryptoKey = "yaoxing8901234561234567890123488";
        this.cryptoIv = "yaoxing890123488";
        this.routeCrypKey = "kjhlouyuf20987677869887978987277";
        this.routeCrypIv = "kjhlouyuf2098767";
        /** 密码检测字符串*/
        this._pwCheckString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    }
    AESUtil.prototype.md5 = function (content) {
        if (this.MD5Hasher == null) {
            this.MD5Hasher = Hasher_1.Hasher._createHelper(MD5_1.MD5);
        }
        return this.MD5Hasher(content).toString();
    };
    //加密客户端发送的内容
    AESUtil.prototype.aesEncrptMsg = function (msg) {
        var encryptMsg = this.aesEncrypt(this.routeCrypKey, this.routeCrypIv, msg);
        // Logger.error("encryptMsg " + encryptMsg)
        return "s:" + encryptMsg;
    };
    AESUtil.prototype.decodeMsg = function (msg) {
        var tmp = msg.trim();
        if (!tmp) {
            return "";
        }
        if (tmp.charAt(0) == "{")
            return msg;
        //有出现server 底层被拦截直接返回客户端一个html 页面，导致底层解密失败报错
        if (tmp.indexOf("<html") > 0 || tmp.indexOf(" ") > 0 || tmp.indexOf("\t") > 0 || tmp.indexOf(">") > 0) {
            return "";
        }
        var result = Global.NativeEvent.decryptData(msg);
        if (result == null || result.result < 0)
            return this.decodeInternal(msg);
        else {
            return result.funcParam;
        }
    };
    AESUtil.prototype.decodeInternal = function (msg) {
        return this.aesDecrypt(msg);
    };
    AESUtil.prototype.aesEncryptWithCommonKey = function (msg) {
        var encryptMsg = this.aesEncrypt(this.cryptoKey, this.cryptoIv, msg);
        return encryptMsg;
    };
    AESUtil.prototype.aesEncrypt = function (cryptoKey, cryptoIv, msg) {
        var key = Crypto.enc.Utf8.parse(cryptoKey);
        var iv = Crypto.enc.Utf8.parse(cryptoIv);
        var encrypt = Crypto.AES.encrypt(msg, key, {
            iv: iv,
            mode: Crypto.mode.CBC,
            padding: Crypto.pad.PKCS7
        });
        return encrypt.toString();
    };
    AESUtil.prototype.aesDcryptWithPKC27 = function (msg) {
        var key = Crypto.enc.Utf8.parse(this.cryptoKey);
        var iv = Crypto.enc.Utf8.parse(this.cryptoIv);
        var decrypted = Crypto.AES.decrypt(msg, key, {
            iv: iv,
            mode: Crypto.mode.CBC,
            padding: Crypto.pad.PKCS7
        });
        return decrypted.toString(Crypto.enc.Utf8);
    };
    AESUtil.prototype.aesDecrypt = function (msg) {
        var key = Crypto.enc.Utf8.parse(this.cryptoKey);
        var iv = Crypto.enc.Utf8.parse(this.cryptoIv);
        var decrypted = Crypto.AES.decrypt(msg, key, {
            iv: iv,
            mode: Crypto.mode.CBC,
            padding: Crypto.pad.NoPadding
        });
        return decrypted.toString(Crypto.enc.Utf8);
    };
    //加密客户端发送的内容
    AESUtil.prototype.aesEncrptSendMsg = function (msg) {
        var encryptMsg = this.aesEncrypt(this.routeCrypKey, this.routeCrypIv, msg);
        // Logger.error("encryptMsg " + encryptMsg)
        return "s:" + encryptMsg;
    };
    //解密host
    AESUtil.prototype.aesDecrptHost = function (host) {
        var key = Crypto.enc.Utf8.parse(this.routeCrypKey);
        var iv = Crypto.enc.Utf8.parse(this.routeCrypIv);
        var decrypted = Crypto.AES.decrypt(host, key, {
            iv: iv,
            mode: Crypto.mode.CBC,
            padding: Crypto.pad.NoPadding
        });
        var decryptedStr = decrypted.toString(Crypto.enc.Utf8);
        //有控制字符，替换为空
        decryptedStr = Global.Toolkit.strReplaceCtrChar(decryptedStr);
        return decryptedStr;
    };
    return AESUtil;
}());
exports.AESUtil = AESUtil;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXEFFU1V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQXFFO0FBQ3JFLGlFQUFnRTtBQUNoRSxtRUFBb0U7QUFDcEU7Ozs7RUFJRTtBQUNGO0lBQUE7UUFDVyxjQUFTLEdBQVcsa0NBQWtDLENBQUM7UUFDdkQsYUFBUSxHQUFXLGtCQUFrQixDQUFDO1FBRXRDLGlCQUFZLEdBQVcsa0NBQWtDLENBQUM7UUFDMUQsZ0JBQVcsR0FBVyxrQkFBa0IsQ0FBQztRQUVoRCxhQUFhO1FBQ0wsbUJBQWMsR0FBVyxnRUFBZ0UsQ0FBQztJQW1HdEcsQ0FBQztJQWhHVSxxQkFBRyxHQUFWLFVBQVcsT0FBTztRQUNkLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFNLENBQUMsYUFBYSxDQUFDLFNBQUcsQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRCxZQUFZO0lBQ0wsOEJBQVksR0FBbkIsVUFBb0IsR0FBRztRQUNuQixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUMxRSwyQ0FBMkM7UUFDM0MsT0FBTyxJQUFJLEdBQUcsVUFBVSxDQUFBO0lBQzVCLENBQUM7SUFFTSwyQkFBUyxHQUFoQixVQUFpQixHQUFHO1FBQ2hCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ04sT0FBTyxFQUFFLENBQUE7U0FDWjtRQUNELElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFD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RyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsWUFBWTtRQUNaLFlBQVksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQzdELE9BQU8sWUFBWSxDQUFBO0lBQ3ZCLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0EzR0EsQUEyR0MsSUFBQTtBQTNHWSwwQkFBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhhc2hlciB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbGlicy9jcnlwdG9Ucy9saWIvSGFzaGVyXCI7XHJcbmltcG9ydCB7IE1ENSB9IGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbGlicy9jcnlwdG9Ucy9hbGdvL01ENVwiO1xyXG5pbXBvcnQgKiBhcyBDcnlwdG8gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9saWJzL2NyeXB0b1RzL2NyeXB0by10c1wiXHJcbi8qKlxyXG4gKiDliqDop6Plr4YsTUQ15pON5L2cXHJcbiAqIEBhdXRob3IgUGV0ZXJcclxuICogXHJcbiovXHJcbmV4cG9ydCBjbGFzcyBBRVNVdGlsIHtcclxuICAgIHB1YmxpYyBjcnlwdG9LZXk6IHN0cmluZyA9IFwieWFveGluZzg5MDEyMzQ1NjEyMzQ1Njc4OTAxMjM0ODhcIjtcclxuICAgIHB1YmxpYyBjcnlwdG9Jdjogc3RyaW5nID0gXCJ5YW94aW5nODkwMTIzNDg4XCI7XHJcblxyXG4gICAgcHVibGljIHJvdXRlQ3J5cEtleTogc3RyaW5nID0gXCJramhsb3V5dWYyMDk4NzY3Nzg2OTg4Nzk3ODk4NzI3N1wiO1xyXG4gICAgcHVibGljIHJvdXRlQ3J5cEl2OiBzdHJpbmcgPSBcImtqaGxvdXl1ZjIwOTg3NjdcIjtcclxuXHJcbiAgICAvKiog5a+G56CB5qOA5rWL5a2X56ym5LiyKi9cclxuICAgIHByaXZhdGUgX3B3Q2hlY2tTdHJpbmc6IHN0cmluZyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIjtcclxuICAgIHByaXZhdGUgTUQ1SGFzaGVyO1xyXG5cclxuICAgIHB1YmxpYyBtZDUoY29udGVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLk1ENUhhc2hlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTUQ1SGFzaGVyID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoTUQ1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuTUQ1SGFzaGVyKGNvbnRlbnQpLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liqDlr4blrqLmiLfnq6/lj5HpgIHnmoTlhoXlrrlcclxuICAgIHB1YmxpYyBhZXNFbmNycHRNc2cobXNnKSB7XHJcbiAgICAgICAgbGV0IGVuY3J5cHRNc2cgPSB0aGlzLmFlc0VuY3J5cHQodGhpcy5yb3V0ZUNyeXBLZXksIHRoaXMucm91dGVDcnlwSXYsIG1zZylcclxuICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJlbmNyeXB0TXNnIFwiICsgZW5jcnlwdE1zZylcclxuICAgICAgICByZXR1cm4gXCJzOlwiICsgZW5jcnlwdE1zZ1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkZWNvZGVNc2cobXNnKSB7XHJcbiAgICAgICAgbGV0IHRtcCA9IG1zZy50cmltKCk7XHJcbiAgICAgICAgaWYgKCF0bXApIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRtcC5jaGFyQXQoMCkgPT0gXCJ7XCIpXHJcbiAgICAgICAgICAgIHJldHVybiBtc2c7XHJcbiAgICAgICAgLy/mnInlh7rnjrBzZXJ2ZXIg5bqV5bGC6KKr5oum5oiq55u05o6l6L+U5Zue5a6i5oi356uv5LiA5LiqaHRtbCDpobXpnaLvvIzlr7zoh7TlupXlsYLop6Plr4blpLHotKXmiqXplJlcclxuICAgICAgICBpZiAodG1wLmluZGV4T2YoXCI8aHRtbFwiKSA+IDAgfHwgdG1wLmluZGV4T2YoXCIgXCIpID4gMCB8fCB0bXAuaW5kZXhPZihcIlxcdFwiKSA+IDAgfHwgdG1wLmluZGV4T2YoXCI+XCIpID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IEdsb2JhbC5OYXRpdmVFdmVudC5kZWNyeXB0RGF0YShtc2cpO1xyXG4gICAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCB8fCByZXN1bHQucmVzdWx0IDwgMClcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlSW50ZXJuYWwobXNnKVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmZ1bmNQYXJhbTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZWNvZGVJbnRlcm5hbChtc2cpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hZXNEZWNyeXB0KG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFlc0VuY3J5cHRXaXRoQ29tbW9uS2V5KG1zZykge1xyXG4gICAgICAgIGxldCBlbmNyeXB0TXNnID0gdGhpcy5hZXNFbmNyeXB0KHRoaXMuY3J5cHRvS2V5LCB0aGlzLmNyeXB0b0l2LCBtc2cpXHJcbiAgICAgICAgcmV0dXJuIGVuY3J5cHRNc2c7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFlc0VuY3J5cHQoY3J5cHRvS2V5LCBjcnlwdG9JdiwgbXNnKSB7XHJcbiAgICAgICAgbGV0IGtleSA9IENyeXB0by5lbmMuVXRmOC5wYXJzZShjcnlwdG9LZXkpO1xyXG4gICAgICAgIGxldCBpdiA9IENyeXB0by5lbmMuVXRmOC5wYXJzZShjcnlwdG9Jdik7XHJcbiAgICAgICAgbGV0IGVuY3J5cHQgPSBDcnlwdG8uQUVTLmVuY3J5cHQobXNnLCBrZXksIHtcclxuICAgICAgICAgICAgaXY6IGl2LFxyXG4gICAgICAgICAgICBtb2RlOiBDcnlwdG8ubW9kZS5DQkMsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6IENyeXB0by5wYWQuUEtDUzdcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZW5jcnlwdC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZXNEY3J5cHRXaXRoUEtDMjcobXNnKSB7XHJcbiAgICAgICAgbGV0IGtleSA9IENyeXB0by5lbmMuVXRmOC5wYXJzZSh0aGlzLmNyeXB0b0tleSk7XHJcbiAgICAgICAgbGV0IGl2ID0gQ3J5cHRvLmVuYy5VdGY4LnBhcnNlKHRoaXMuY3J5cHRvSXYpO1xyXG4gICAgICAgIGxldCBkZWNyeXB0ZWQgPSBDcnlwdG8uQUVTLmRlY3J5cHQobXNnLCBrZXksIHtcclxuICAgICAgICAgICAgaXY6IGl2LFxyXG4gICAgICAgICAgICBtb2RlOiBDcnlwdG8ubW9kZS5DQkMsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6IENyeXB0by5wYWQuUEtDUzdcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVjcnlwdGVkLnRvU3RyaW5nKENyeXB0by5lbmMuVXRmOCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFlc0RlY3J5cHQobXNnKSB7XHJcbiAgICAgICAgbGV0IGtleSA9IENyeXB0by5lbmMuVXRmOC5wYXJzZSh0aGlzLmNyeXB0b0tleSk7XHJcbiAgICAgICAgbGV0IGl2ID0gQ3J5cHRvLmVuYy5VdGY4LnBhcnNlKHRoaXMuY3J5cHRvSXYpO1xyXG4gICAgICAgIGxldCBkZWNyeXB0ZWQgPSBDcnlwdG8uQUVTLmRlY3J5cHQobXNnLCBrZXksIHtcclxuICAgICAgICAgICAgaXY6IGl2LFxyXG4gICAgICAgICAgICBtb2RlOiBDcnlwdG8ubW9kZS5DQkMsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6IENyeXB0by5wYWQuTm9QYWRkaW5nXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlY3J5cHRlZC50b1N0cmluZyhDcnlwdG8uZW5jLlV0ZjgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yqg5a+G5a6i5oi356uv5Y+R6YCB55qE5YaF5a65XHJcbiAgICBwdWJsaWMgYWVzRW5jcnB0U2VuZE1zZyhtc2cpIHtcclxuICAgICAgICBsZXQgZW5jcnlwdE1zZyA9IHRoaXMuYWVzRW5jcnlwdCh0aGlzLnJvdXRlQ3J5cEtleSwgdGhpcy5yb3V0ZUNyeXBJdiwgbXNnKVxyXG4gICAgICAgIC8vIExvZ2dlci5lcnJvcihcImVuY3J5cHRNc2cgXCIgKyBlbmNyeXB0TXNnKVxyXG4gICAgICAgIHJldHVybiBcInM6XCIgKyBlbmNyeXB0TXNnXHJcbiAgICB9XHJcblxyXG4gICAgLy/op6Plr4Zob3N0XHJcbiAgICBwdWJsaWMgYWVzRGVjcnB0SG9zdChob3N0KSB7XHJcbiAgICAgICAgbGV0IGtleSA9IENyeXB0by5lbmMuVXRmOC5wYXJzZSh0aGlzLnJvdXRlQ3J5cEtleSk7XHJcbiAgICAgICAgbGV0IGl2ID0gQ3J5cHRvLmVuYy5VdGY4LnBhcnNlKHRoaXMucm91dGVDcnlwSXYpO1xyXG4gICAgICAgIGxldCBkZWNyeXB0ZWQgPSBDcnlwdG8uQUVTLmRlY3J5cHQoaG9zdCwga2V5LCB7XHJcbiAgICAgICAgICAgIGl2OiBpdixcclxuICAgICAgICAgICAgbW9kZTogQ3J5cHRvLm1vZGUuQ0JDLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiBDcnlwdG8ucGFkLk5vUGFkZGluZ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBkZWNyeXB0ZWRTdHIgPSBkZWNyeXB0ZWQudG9TdHJpbmcoQ3J5cHRvLmVuYy5VdGY4KTtcclxuICAgICAgICAvL+acieaOp+WItuWtl+espu+8jOabv+aNouS4uuepulxyXG4gICAgICAgIGRlY3J5cHRlZFN0ciA9IEdsb2JhbC5Ub29sa2l0LnN0clJlcGxhY2VDdHJDaGFyKGRlY3J5cHRlZFN0cilcclxuICAgICAgICByZXR1cm4gZGVjcnlwdGVkU3RyXHJcbiAgICB9XHJcbn1cclxuIl19