import { Hasher } from "../../../framework/libs/cryptoTs/lib/Hasher";
import { MD5 } from "../../../framework/libs/cryptoTs/algo/MD5";
import * as Crypto from "../../../framework/libs/cryptoTs/crypto-ts"
/**
 * 加解密,MD5操作
 * @author Peter
 * 
*/
export class AESUtil {
    public cryptoKey: string = "yaoxing8901234561234567890123488";
    public cryptoIv: string = "yaoxing890123488";

    public routeCrypKey: string = "kjhlouyuf20987677869887978987277";
    public routeCrypIv: string = "kjhlouyuf2098767";

    /** 密码检测字符串*/
    private _pwCheckString: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    private MD5Hasher;

    public md5(content) {
        if (this.MD5Hasher == null) {
            this.MD5Hasher = Hasher._createHelper(MD5);
        }
        return this.MD5Hasher(content).toString();
    }

    //加密客户端发送的内容
    public aesEncrptMsg(msg) {
        let encryptMsg = this.aesEncrypt(this.routeCrypKey, this.routeCrypIv, msg)
        // Logger.error("encryptMsg " + encryptMsg)
        return "s:" + encryptMsg
    }

    public decodeMsg(msg) {
        let tmp = msg.trim();
        if (!tmp) {
            return ""
        }
        if (tmp.charAt(0) == "{")
            return msg;
        //有出现server 底层被拦截直接返回客户端一个html 页面，导致底层解密失败报错
        if (tmp.indexOf("<html") > 0 || tmp.indexOf(" ") > 0 || tmp.indexOf("\t") > 0 || tmp.indexOf(">") > 0) {
            return "";
        }
        let result = Global.NativeEvent.decryptData(msg);
        if (result == null || result.result < 0)
            return this.decodeInternal(msg)
        else {
            return result.funcParam;
        }
    }

    private decodeInternal(msg) {
        return this.aesDecrypt(msg);
    }

    public aesEncryptWithCommonKey(msg) {
        let encryptMsg = this.aesEncrypt(this.cryptoKey, this.cryptoIv, msg)
        return encryptMsg;
    }

    public aesEncrypt(cryptoKey, cryptoIv, msg) {
        let key = Crypto.enc.Utf8.parse(cryptoKey);
        let iv = Crypto.enc.Utf8.parse(cryptoIv);
        let encrypt = Crypto.AES.encrypt(msg, key, {
            iv: iv,
            mode: Crypto.mode.CBC,
            padding: Crypto.pad.PKCS7
        });
        return encrypt.toString();
    }

    public aesDcryptWithPKC27(msg) {
        let key = Crypto.enc.Utf8.parse(this.cryptoKey);
        let iv = Crypto.enc.Utf8.parse(this.cryptoIv);
        let decrypted = Crypto.AES.decrypt(msg, key, {
            iv: iv,
            mode: Crypto.mode.CBC,
            padding: Crypto.pad.PKCS7
        });
        return decrypted.toString(Crypto.enc.Utf8);
    }

    public aesDecrypt(msg) {
        let key = Crypto.enc.Utf8.parse(this.cryptoKey);
        let iv = Crypto.enc.Utf8.parse(this.cryptoIv);
        let decrypted = Crypto.AES.decrypt(msg, key, {
            iv: iv,
            mode: Crypto.mode.CBC,
            padding: Crypto.pad.NoPadding
        });
        return decrypted.toString(Crypto.enc.Utf8);
    }

    //加密客户端发送的内容
    public aesEncrptSendMsg(msg) {
        let encryptMsg = this.aesEncrypt(this.routeCrypKey, this.routeCrypIv, msg)
        // Logger.error("encryptMsg " + encryptMsg)
        return "s:" + encryptMsg
    }

    //解密host
    public aesDecrptHost(host) {
        let key = Crypto.enc.Utf8.parse(this.routeCrypKey);
        let iv = Crypto.enc.Utf8.parse(this.routeCrypIv);
        let decrypted = Crypto.AES.decrypt(host, key, {
            iv: iv,
            mode: Crypto.mode.CBC,
            padding: Crypto.pad.NoPadding
        });
        let decryptedStr = decrypted.toString(Crypto.enc.Utf8);
        //有控制字符，替换为空
        decryptedStr = Global.Toolkit.strReplaceCtrChar(decryptedStr)
        return decryptedStr
    }
}
