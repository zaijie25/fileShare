"use strict";
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