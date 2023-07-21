
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/native/NativeJSBBridge.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '52bdeY7N6hOa5vpMpRzphgL', 'NativeJSBBridge');
// hall/scripts/framework/native/NativeJSBBridge.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HallStorageKey_1 = require("../../logic/hallcommon/const/HallStorageKey");
var NativeJSBBridge = /** @class */ (function () {
    function NativeJSBBridge() {
        this.REPORT_CLICK_GAME_KEY = "clickGame";
        this.clickGames = [];
    }
    NativeJSBBridge.prototype.init = function () {
        if (CC_PREVIEW)
            return;
        if (cc.sys.isBrowser)
            return;
        if (Global.Toolkit.checkVersionSupport(20009)) {
            if (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS) {
                if (native && native.JSBBridge) {
                    this.jsbBridge = native.JSBBridge.getInstance();
                }
            }
        }
    };
    NativeJSBBridge.prototype.addClickGames = function (gameid) {
        if (gameid && gameid != null) {
            this.clickGames[this.clickGames.length] = gameid;
        }
        var uid = Global.Setting.storage.get(HallStorageKey_1.default.Uid) || 'guest';
        this.setBuglyUserID(uid);
        this.addBuglyUserValue(this.REPORT_CLICK_GAME_KEY, JSON.stringify(this.clickGames));
    };
    /**
     * 打印本地日志
     * @param level 1 2 3 4
     * @param tag
     * @param msg 标题
     * @returns null
     */
    NativeJSBBridge.prototype.log = function (level, tag, msg) {
        if (this.jsbBridge && this.jsbBridge.log) {
            this.jsbBridge.log(level, tag, msg);
        }
    };
    /**
     * 设置上报UserID
     * @param userID
     * @returns null
     */
    NativeJSBBridge.prototype.setBuglyUserID = function (userID) {
        if (this.jsbBridge && this.jsbBridge.setBuglyUserID) {
            this.jsbBridge.setBuglyUserID(userID);
        }
    };
    /**
     * 设置上报Tag
     * @param userID
     * @returns null
     */
    NativeJSBBridge.prototype.setBuglyTag = function (tag) {
        if (this.jsbBridge && this.jsbBridge.setBuglyTag) {
            this.jsbBridge.setBuglyTag(tag);
        }
    };
    /**
     * 设置上报玩家自定义信息
     * @param key
     * @param value
     * @returns null
     */
    NativeJSBBridge.prototype.addBuglyUserValue = function (key, value) {
        if (this.jsbBridge && this.jsbBridge.addBuglyUserValue) {
            this.jsbBridge.addBuglyUserValue(key, value);
        }
    };
    /**
     * 移除上报玩家自定义信息
     * @param key
     * @returns null
     */
    NativeJSBBridge.prototype.removeBuglyUserValue = function (key) {
        if (this.jsbBridge && this.jsbBridge.removeBuglyUserValue) {
            this.jsbBridge.removeBuglyUserValue(key);
        }
    };
    /**
     * 设置bugly 上报错误信息
     * @param msg
     * @param stack
     * @returns null
     */
    NativeJSBBridge.prototype.reportException = function (msg, stack) {
        if (this.jsbBridge && this.jsbBridge.reportException) {
            this.jsbBridge.reportException(msg, stack);
        }
    };
    /**
     * 设置bugly AppID
     * @param appID
     * @returns null
     */
    NativeJSBBridge.prototype.setBuglyAppID = function (appID) {
        if (this.jsbBridge && this.jsbBridge.setBuglyAppID) {
            this.jsbBridge.setBuglyAppID(appID);
        }
    };
    /**
     * 设置bugly 渠道id
     * @param channel
     * @returns null
     */
    NativeJSBBridge.prototype.setBuglyAppChannel = function (channel) {
        if (this.jsbBridge && this.jsbBridge.setBuglyAppChannel) {
            this.jsbBridge.setBuglyAppChannel(channel);
        }
    };
    /**
     * 设置bugly 上报原生版本号
     * @param channel
     * @returns null
     */
    NativeJSBBridge.prototype.setBuglyAppVersion = function (version) {
        if (this.jsbBridge && this.jsbBridge.setBuglyAppVersion) {
            this.jsbBridge.setBuglyAppVersion(version);
        }
    };
    /**
     * 解密数据
     * @param encryptData
     * @returns string 解密数据
     */
    NativeJSBBridge.prototype.decryptData = function (encryptData) {
        if (this.jsbBridge && this.jsbBridge.decryptData) {
            var retData = this.jsbBridge.decryptData(encryptData);
            if (retData) {
                retData = Global.Toolkit.strReplaceCtrChar(retData);
            }
            // Logger.error("decryptData = " + retData)
            return retData;
        }
    };
    /**
     * 获取加密数据
     * @param sign_key
     * @param deviceId
     * @returns string 加密数据
     */
    NativeJSBBridge.prototype.getLoginSign = function (sign_key, deviceId) {
        if (this.jsbBridge && this.jsbBridge.getLoginSign) {
            var retData = this.jsbBridge.getLoginSign(sign_key, deviceId);
            // Logger.error("getLoginSign = " + retData)
            return retData;
        }
    };
    /**
     * 获取总内存
     * @param null
     * @returns int 总内存
     */
    NativeJSBBridge.prototype.getTotalMem = function () {
        if (this.jsbBridge && this.jsbBridge.getTotalMem) {
            var retData = this.jsbBridge.getTotalMem();
            Logger.error("getTotalMem = " + retData);
            return retData;
        }
    };
    /**
     * 获取剩余可用内存
     * @param null
     * @returns int 可用内存
     */
    NativeJSBBridge.prototype.getFreeMem = function () {
        if (this.jsbBridge && this.jsbBridge.getFreeMem) {
            var retData = this.jsbBridge.getFreeMem();
            Logger.error("getFreeMem = " + retData);
            return retData;
        }
    };
    /**
     * 获取已用内存(IOS 可以获取 Android 获取不了)
     * @param null
     * @returns int 已用内存
     */
    NativeJSBBridge.prototype.getUsedMem = function () {
        if (this.jsbBridge && this.jsbBridge.getUsedMem) {
            var retData = this.jsbBridge.getUsedMem();
            Logger.error("getUsedMem = " + retData);
            return retData;
        }
    };
    return NativeJSBBridge;
}());
exports.default = NativeJSBBridge;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxuYXRpdmVcXE5hdGl2ZUpTQkJyaWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhFQUF5RTtBQUV6RTtJQUlJO1FBREEsMEJBQXFCLEdBQUcsV0FBVyxDQUFDO1FBRWhDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTSw4QkFBSSxHQUFYO1FBQ0ksSUFBRyxVQUFVO1lBQ1QsT0FBTztRQUNYLElBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTO1lBQ2YsT0FBTztRQUNYLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsRUFBQztZQUMxQyxJQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDO2dCQUM1RCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFDO29CQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ25EO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFRCx1Q0FBYSxHQUFiLFVBQWMsTUFBYTtRQUN2QixJQUFJLE1BQU0sSUFBSSxNQUFNLElBQUksSUFBSSxFQUFDO1lBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUE7U0FDbkQ7UUFDRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUE7UUFDbkUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFH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QUFPLENBQUMsQ0FBQTtZQUN2QyxPQUFPLE9BQU8sQ0FBQztTQUNsQjtJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsb0NBQVUsR0FBVjtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBQztZQUM1QyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBQ3pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxDQUFBO1lBQ3ZDLE9BQU8sT0FBTyxDQUFDO1NBQ2xCO0lBQ0wsQ0FBQztJQXFDTCxzQkFBQztBQUFELENBOU9BLEFBOE9DLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGFsbFN0b3JhZ2VLZXkgZnJvbSBcIi4uLy4uL2xvZ2ljL2hhbGxjb21tb24vY29uc3QvSGFsbFN0b3JhZ2VLZXlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdGl2ZUpTQkJyaWRnZSB7XHJcbiAgICBqc2JCcmlkZ2U6YW55O1xyXG4gICAgY2xpY2tHYW1lczpzdHJpbmdbXTtcclxuICAgIFJFUE9SVF9DTElDS19HQU1FX0tFWSA9IFwiY2xpY2tHYW1lXCI7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuY2xpY2tHYW1lcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KCl7XHJcbiAgICAgICAgaWYoQ0NfUFJFVklFVylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKGNjLnN5cy5pc0Jyb3dzZXIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAoR2xvYmFsLlRvb2xraXQuY2hlY2tWZXJzaW9uU3VwcG9ydCgyMDAwOSkpe1xyXG4gICAgICAgICAgICBpZihjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0FORFJPSUQgfHwgY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1Mpe1xyXG4gICAgICAgICAgICAgICAgaWYgKG5hdGl2ZSAmJiBuYXRpdmUuSlNCQnJpZGdlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmpzYkJyaWRnZSA9IG5hdGl2ZS5KU0JCcmlkZ2UuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhZGRDbGlja0dhbWVzKGdhbWVpZDpzdHJpbmcpe1xyXG4gICAgICAgIGlmIChnYW1laWQgJiYgZ2FtZWlkICE9IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrR2FtZXNbdGhpcy5jbGlja0dhbWVzLmxlbmd0aF0gPSBnYW1laWRcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHVpZCA9IEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0KEhhbGxTdG9yYWdlS2V5LlVpZCkgfHwgJ2d1ZXN0J1xyXG4gICAgICAgIHRoaXMuc2V0QnVnbHlVc2VySUQodWlkKVxyXG4gICAgICAgIHRoaXMuYWRkQnVnbHlVc2VyVmFsdWUodGhpcy5SRVBPUlRfQ0xJQ0tfR0FNRV9LRVksSlNPTi5zdHJpbmdpZnkodGhpcy5jbGlja0dhbWVzKSlcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5omT5Y2w5pys5Zyw5pel5b+XXHJcbiAgICAgKiBAcGFyYW0gbGV2ZWwgMSAyIDMgNCBcclxuICAgICAqIEBwYXJhbSB0YWcgXHJcbiAgICAgKiBAcGFyYW0gbXNnIOagh+mimFxyXG4gICAgICogQHJldHVybnMgbnVsbFxyXG4gICAgICovXHJcbiAgICBsb2cobGV2ZWw6bnVtYmVyLHRhZzpzdHJpbmcsbXNnOnN0cmluZyl7XHJcbiAgICAgICAgaWYgKHRoaXMuanNiQnJpZGdlICYmIHRoaXMuanNiQnJpZGdlLmxvZyl7XHJcbiAgICAgICAgICAgIHRoaXMuanNiQnJpZGdlLmxvZyhsZXZlbCx0YWcsbXNnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruS4iuaKpVVzZXJJRFxyXG4gICAgICogQHBhcmFtIHVzZXJJRFxyXG4gICAgICogQHJldHVybnMgbnVsbCBcclxuICAgICAqL1xyXG4gICAgc2V0QnVnbHlVc2VySUQodXNlcklEOnN0cmluZyl7XHJcbiAgICAgICAgaWYgKHRoaXMuanNiQnJpZGdlICYmIHRoaXMuanNiQnJpZGdlLnNldEJ1Z2x5VXNlcklEKXtcclxuICAgICAgICAgICAgdGhpcy5qc2JCcmlkZ2Uuc2V0QnVnbHlVc2VySUQodXNlcklEKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruS4iuaKpVRhZ1xyXG4gICAgICogQHBhcmFtIHVzZXJJRCBcclxuICAgICAqIEByZXR1cm5zIG51bGxcclxuICAgICAqL1xyXG4gICAgc2V0QnVnbHlUYWcodGFnOm51bWJlcil7XHJcbiAgICAgICAgaWYgKHRoaXMuanNiQnJpZGdlICYmIHRoaXMuanNiQnJpZGdlLnNldEJ1Z2x5VGFnKXtcclxuICAgICAgICAgICAgdGhpcy5qc2JCcmlkZ2Uuc2V0QnVnbHlUYWcodGFnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruS4iuaKpeeOqeWutuiHquWumuS5ieS/oeaBr1xyXG4gICAgICogQHBhcmFtIGtleSAgXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgIFxyXG4gICAgICogQHJldHVybnMgbnVsbFxyXG4gICAgICovXHJcbiAgICBhZGRCdWdseVVzZXJWYWx1ZShrZXk6c3RyaW5nLHZhbHVlOnN0cmluZyl7XHJcbiAgICAgICAgaWYgKHRoaXMuanNiQnJpZGdlICYmIHRoaXMuanNiQnJpZGdlLmFkZEJ1Z2x5VXNlclZhbHVlKXtcclxuICAgICAgICAgICAgdGhpcy5qc2JCcmlkZ2UuYWRkQnVnbHlVc2VyVmFsdWUoa2V5LHZhbHVlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+mZpOS4iuaKpeeOqeWutuiHquWumuS5ieS/oeaBr1xyXG4gICAgICogQHBhcmFtIGtleSAgXHJcbiAgICAgKiBAcmV0dXJucyBudWxsXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUJ1Z2x5VXNlclZhbHVlKGtleTpzdHJpbmcpe1xyXG4gICAgICAgIGlmICh0aGlzLmpzYkJyaWRnZSAmJiB0aGlzLmpzYkJyaWRnZS5yZW1vdmVCdWdseVVzZXJWYWx1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMuanNiQnJpZGdlLnJlbW92ZUJ1Z2x5VXNlclZhbHVlKGtleSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva5idWdseSDkuIrmiqXplJnor6/kv6Hmga9cclxuICAgICAqIEBwYXJhbSBtc2cgIFxyXG4gICAgICogQHBhcmFtIHN0YWNrICBcclxuICAgICAqIEByZXR1cm5zIG51bGxcclxuICAgICAqL1xyXG4gICAgcmVwb3J0RXhjZXB0aW9uKG1zZzpzdHJpbmcsc3RhY2s6c3RyaW5nKXtcclxuICAgICAgICBpZiAodGhpcy5qc2JCcmlkZ2UgJiYgdGhpcy5qc2JCcmlkZ2UucmVwb3J0RXhjZXB0aW9uKXtcclxuICAgICAgICAgICAgdGhpcy5qc2JCcmlkZ2UucmVwb3J0RXhjZXB0aW9uKG1zZyxzdGFjaylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva5idWdseSBBcHBJRFxyXG4gICAgICogQHBhcmFtIGFwcElEICBcclxuICAgICAqIEByZXR1cm5zIG51bGxcclxuICAgICAqL1xyXG4gICAgc2V0QnVnbHlBcHBJRChhcHBJRDpzdHJpbmcpe1xyXG4gICAgICAgIGlmICh0aGlzLmpzYkJyaWRnZSAmJiB0aGlzLmpzYkJyaWRnZS5zZXRCdWdseUFwcElEKXtcclxuICAgICAgICAgICAgdGhpcy5qc2JCcmlkZ2Uuc2V0QnVnbHlBcHBJRChhcHBJRClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva5idWdseSDmuKDpgZNpZFxyXG4gICAgICogQHBhcmFtIGNoYW5uZWwgIFxyXG4gICAgICogQHJldHVybnMgbnVsbFxyXG4gICAgICovXHJcbiAgICBzZXRCdWdseUFwcENoYW5uZWwoY2hhbm5lbDpzdHJpbmcpe1xyXG4gICAgICAgIGlmICh0aGlzLmpzYkJyaWRnZSAmJiB0aGlzLmpzYkJyaWRnZS5zZXRCdWdseUFwcENoYW5uZWwpe1xyXG4gICAgICAgICAgICB0aGlzLmpzYkJyaWRnZS5zZXRCdWdseUFwcENoYW5uZWwoY2hhbm5lbClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva5idWdseSDkuIrmiqXljp/nlJ/niYjmnKzlj7dcclxuICAgICAqIEBwYXJhbSBjaGFubmVsICBcclxuICAgICAqIEByZXR1cm5zIG51bGxcclxuICAgICAqL1xyXG4gICAgc2V0QnVnbHlBcHBWZXJzaW9uKHZlcnNpb246c3RyaW5nKXtcclxuICAgICAgICBpZiAodGhpcy5qc2JCcmlkZ2UgJiYgdGhpcy5qc2JCcmlkZ2Uuc2V0QnVnbHlBcHBWZXJzaW9uKXtcclxuICAgICAgICAgICAgdGhpcy5qc2JCcmlkZ2Uuc2V0QnVnbHlBcHBWZXJzaW9uKHZlcnNpb24pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Kej5a+G5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gZW5jcnlwdERhdGEgIFxyXG4gICAgICogQHJldHVybnMgc3RyaW5nIOino+WvhuaVsOaNrlxyXG4gICAgICovXHJcbiAgICBkZWNyeXB0RGF0YShlbmNyeXB0RGF0YTogc3RyaW5nKXtcclxuICAgICAgICBpZiAodGhpcy5qc2JCcmlkZ2UgJiYgdGhpcy5qc2JCcmlkZ2UuZGVjcnlwdERhdGEpe1xyXG4gICAgICAgICAgICBsZXQgcmV0RGF0YSA9IHRoaXMuanNiQnJpZGdlLmRlY3J5cHREYXRhKGVuY3J5cHREYXRhKVxyXG4gICAgICAgICAgICBpZiAocmV0RGF0YSl7XHJcbiAgICAgICAgICAgICAgICByZXREYXRhID0gR2xvYmFsLlRvb2xraXQuc3RyUmVwbGFjZUN0ckNoYXIocmV0RGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiZGVjcnlwdERhdGEgPSBcIiArIHJldERhdGEpXHJcbiAgICAgICAgICAgIHJldHVybiByZXREYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWKoOWvhuaVsOaNrlxyXG4gICAgICogQHBhcmFtIHNpZ25fa2V5XHJcbiAgICAgKiBAcGFyYW0gZGV2aWNlSWQgICBcclxuICAgICAqIEByZXR1cm5zIHN0cmluZyDliqDlr4bmlbDmja5cclxuICAgICAqL1xyXG4gICAgZ2V0TG9naW5TaWduKHNpZ25fa2V5OiBzdHJpbmcsIGRldmljZUlkOiBzdHJpbmcpe1xyXG4gICAgICAgIGlmICh0aGlzLmpzYkJyaWRnZSAmJiB0aGlzLmpzYkJyaWRnZS5nZXRMb2dpblNpZ24pe1xyXG4gICAgICAgICAgICBsZXQgcmV0RGF0YSA9IHRoaXMuanNiQnJpZGdlLmdldExvZ2luU2lnbihzaWduX2tleSxkZXZpY2VJZClcclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiZ2V0TG9naW5TaWduID0gXCIgKyByZXREYXRhKVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0RGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5oC75YaF5a2YXHJcbiAgICAgKiBAcGFyYW0gbnVsbCBcclxuICAgICAqIEByZXR1cm5zIGludCDmgLvlhoXlrZhcclxuICAgICAqL1xyXG4gICAgZ2V0VG90YWxNZW0oKXtcclxuICAgICAgICBpZiAodGhpcy5qc2JCcmlkZ2UgJiYgdGhpcy5qc2JCcmlkZ2UuZ2V0VG90YWxNZW0pe1xyXG4gICAgICAgICAgICBsZXQgcmV0RGF0YSA9IHRoaXMuanNiQnJpZGdlLmdldFRvdGFsTWVtKClcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZ2V0VG90YWxNZW0gPSBcIiArIHJldERhdGEpXHJcbiAgICAgICAgICAgIHJldHVybiByZXREYXRhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bliankvZnlj6/nlKjlhoXlrZhcclxuICAgICAqIEBwYXJhbSBudWxsIFxyXG4gICAgICogQHJldHVybnMgaW50IOWPr+eUqOWGheWtmFxyXG4gICAgICovXHJcbiAgICBnZXRGcmVlTWVtKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuanNiQnJpZGdlICYmIHRoaXMuanNiQnJpZGdlLmdldEZyZWVNZW0pe1xyXG4gICAgICAgICAgICBsZXQgcmV0RGF0YSA9IHRoaXMuanNiQnJpZGdlLmdldEZyZWVNZW0oKVxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJnZXRGcmVlTWVtID0gXCIgKyByZXREYXRhKVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0RGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blt7LnlKjlhoXlrZgoSU9TIOWPr+S7peiOt+WPliBBbmRyb2lkIOiOt+WPluS4jeS6hilcclxuICAgICAqIEBwYXJhbSBudWxsIFxyXG4gICAgICogQHJldHVybnMgaW50IOW3sueUqOWGheWtmFxyXG4gICAgICovXHJcbiAgICBnZXRVc2VkTWVtKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuanNiQnJpZGdlICYmIHRoaXMuanNiQnJpZGdlLmdldFVzZWRNZW0pe1xyXG4gICAgICAgICAgICBsZXQgcmV0RGF0YSA9IHRoaXMuanNiQnJpZGdlLmdldFVzZWRNZW0oKVxyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJnZXRVc2VkTWVtID0gXCIgKyByZXREYXRhKVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0RGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiDlvIDlkK/ojrflj5bnvZHnu5zlu7bov59cclxuICAgIC8vICAqIEBwYXJhbSBudWxsIFxyXG4gICAgLy8gICogQHJldHVybnMgXHJcbiAgICAvLyAgKi9cclxuICAgIC8vIHN0YXJ0R2V0TmV0RGVsYXkoaG9zdE5hbWU6c3RyaW5nKXtcclxuICAgIC8vICAgICBMb2dnZXIuZXJyb3IoXCJzdGFydEdldE5ldERlbGF5ID0gaG9zdE5hbWUgXCIgKyBob3N0TmFtZSlcclxuICAgIC8vICAgICBpZiAodGhpcy5qc2JCcmlkZ2UgJiYgdGhpcy5qc2JCcmlkZ2Uuc3RhcnRHZXROZXREZWxheSl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuanNiQnJpZGdlLnN0YXJ0R2V0TmV0RGVsYXkoaG9zdE5hbWUpXHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIC8qKlxyXG4gICAgLy8gICog5YGc5q2i6I635Y+W572R57uc5bu26L+fXHJcbiAgICAvLyAgKiBAcGFyYW0gbnVsbCBcclxuICAgIC8vICAqIEByZXR1cm5zIFxyXG4gICAgLy8gICovXHJcbiAgICAvLyBzdG9wR2V0TmV0RGVsYXkoKXtcclxuICAgIC8vICAgICBpZiAodGhpcy5qc2JCcmlkZ2UgJiYgdGhpcy5qc2JCcmlkZ2Uuc3RvcEdldE5ldERlbGF5KXtcclxuICAgIC8vICAgICAgICAgdGhpcy5qc2JCcmlkZ2Uuc3RvcEdldE5ldERlbGF5KClcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gLyoqXHJcbiAgICAvLyAgKiDojrflj5bnvZHnu5zlu7bov59cclxuICAgIC8vICAqIEBwYXJhbSBudWxsIFxyXG4gICAgLy8gICogQHJldHVybnMgXHJcbiAgICAvLyAgKi9cclxuICAgIC8vIGdldE5ldERlbGF5KCl7XHJcbiAgICAvLyAgICAgaWYgKHRoaXMuanNiQnJpZGdlICYmIHRoaXMuanNiQnJpZGdlLmdldE5ldERlbGF5KXtcclxuICAgIC8vICAgICAgICAgbGV0IHJldERhdGEgPSB0aGlzLmpzYkJyaWRnZS5nZXROZXREZWxheSgpXHJcbiAgICAvLyAgICAgICAgIExvZ2dlci5lcnJvcihcImdldE5ldERlbGF5ID0gXCIgKyByZXREYXRhKVxyXG4gICAgLy8gICAgICAgICByZXR1cm4gcmV0RGF0YTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbn0iXX0=