
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/data/PlayerData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7391eu57gdLZIjaVjBFvPvL', 'PlayerData');
// hall/scripts/logic/hallcommon/data/PlayerData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HallStorageKey_1 = require("../const/HallStorageKey");
var GlobalEvent_1 = require("../../core/GlobalEvent");
var NetEvent_1 = require("../../core/net/hall/NetEvent");
var PlayerData = /** @class */ (function () {
    function PlayerData() {
        /**
         * 玩家标识
         */
        this.merge_type = "";
        //玩家头像框
        this._headkuang = "0";
    }
    Object.defineProperty(PlayerData.prototype, "vip", {
        get: function () {
            return this._vip ? this._vip : 0;
        },
        set: function (newVip) {
            if (this._vip == newVip)
                return;
            this._vip = newVip;
            //通知玩家信息发生更新
            Global.Event.event(GlobalEvent_1.default.PERSONALINFOUPDATE);
            Global.Event.event(GlobalEvent_1.default.CHANGEVIP);
            this.changeVip();
        },
        enumerable: false,
        configurable: true
    });
    PlayerData.prototype.changeVip = function () {
        //请求修改头像框
        var model = Global.ModelManager.getModel("PlayerInfoModel");
        var param = {};
        param.head = Global.PlayerData.vip;
        model.reqSetSelfCfg(param, function () {
            Global.PlayerData.headkuang = Global.PlayerData.vip.toString();
        });
    };
    Object.defineProperty(PlayerData.prototype, "type", {
        get: function () {
            return this._type;
        },
        //玩家类型 1 游客 2 绑定手机
        set: function (newType) {
            if (this._type == newType)
                return;
            this._type = newType;
            //通知玩家信息发生更新
            Global.Event.event(GlobalEvent_1.default.PERSONALINFOUPDATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlayerData.prototype, "phone", {
        get: function () {
            return this._phone;
        },
        set: function (newPhone) {
            if (this._phone == newPhone)
                return;
            this._phone = newPhone;
            //通知玩家信息发生更新
            Global.Event.event(GlobalEvent_1.default.PERSONALINFOUPDATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlayerData.prototype, "nickname", {
        get: function () {
            return this._nickname;
        },
        set: function (newNickname) {
            if (this._nickname == newNickname)
                return;
            this._nickname = newNickname;
            //通知玩家信息发生更新
            Global.Event.event(GlobalEvent_1.default.PERSONALINFOUPDATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlayerData.prototype, "headimg", {
        get: function () {
            return this._headimg;
        },
        set: function (newHeadimg) {
            if (this.headimg == newHeadimg)
                return;
            this._headimg = newHeadimg;
            //通知玩家信息发生更新
            Global.Event.event(GlobalEvent_1.default.PERSONALINFOUPDATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlayerData.prototype, "headkuang", {
        get: function () {
            return this._headkuang;
        },
        set: function (newHeadkuang) {
            if (newHeadkuang == "") {
                newHeadkuang = "0";
            }
            if (this.headkuang == newHeadkuang)
                return;
            this._headkuang = newHeadkuang;
            //通知玩家信息发生更新
            Global.Event.event(GlobalEvent_1.default.PERSONALINFOUPDATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlayerData.prototype, "point", {
        get: function () {
            return this._point;
        },
        set: function (newPoint) {
            if (this._point == newPoint)
                return;
            this._point = newPoint;
            //玩家金币发生变化
            Global.Event.event(GlobalEvent_1.default.PERSONALINFOUPDATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlayerData.prototype, "bank_point", {
        get: function () {
            return this._bank_point;
        },
        set: function (newPoint) {
            if (this._bank_point == newPoint)
                return;
            this._bank_point = newPoint;
            //玩家金币发生变化
            Global.Event.event(GlobalEvent_1.default.PERSONALINFOUPDATE);
        },
        enumerable: false,
        configurable: true
    });
    PlayerData.prototype.clear = function () {
        this.uid = 0;
        this._vip = 0;
        this.vipExp = 0;
        this.headkuang = "0";
        this.buyuPaotai = "0";
        this.token = "";
        this.nickname = "";
        this.headimg = "";
        this.point = 0;
        this.type = 0;
        this.phone = "";
        this.pack = 0;
        this.pid = null;
        this.open_id = "";
        this.accesstoken = "";
    };
    /**
        Uid         uint64                 `json:"uid"`
        Token       string                 `json:"token"`
        Nickname    string                 `json:"nickname"`
        Headimg     string                 `json:"headimg"`
        Point       int64                  `json:"point"`     //金币
        UserType    int32                  `json:"user_type"` //-----
        Phone       string                 `json:"phone"`     //------
        PackNo      int32                  `json:"pack_no"`
        Pid         uint64                 `json:"pid"`
        SAddr       []string               `json:"s_addr"` //----
        OpenId      string                 `json:"open_id"`
        Accesstoken string                 `json:"accesstoken"`
     */
    PlayerData.prototype.init = function (msg) {
        this.clear();
        //玩家系统数据
        this.uid = msg.uid;
        this.token = msg.token;
        this.pack = msg.pack_no ? msg.pack_no : 0;
        this.pid = msg.pid ? msg.pid : 0;
        this.open_id = msg.open_id;
        this.accesstoken = msg.accesstoken;
        this.ip = msg.list_ip || "";
        if (msg && msg.merge_type !== "") {
            this.merge_type = msg.merge_type.toString();
        }
        Global.Setting.ChannelInfo.playerChannel = this.pack;
        if (Global.Toolkit.checkNumValid(this.pid) == false) {
            this.pid = 0;
        }
        Global.Setting.ChannelInfo.playerInviteCode = this.pid;
        if (this.pack != null && this.pack != 0) {
            Global.Setting.storage.set(HallStorageKey_1.default.Channel, this.pack);
        }
        if (this.pid && this.pid != 0) {
            Global.Setting.storage.set(HallStorageKey_1.default.InviteCode, this.pid.toString());
        }
        Global.Setting.storage.set(HallStorageKey_1.default.Token, this.token);
        Global.Setting.storage.set(HallStorageKey_1.default.Uid, this.uid.toString());
        //玩家游戏数据
        this.update(msg);
        //监听后续玩家数据更新
        Global.HallServer.on(NetEvent_1.NetAppface.GetUserInfo, this, this.update);
        //请求最新金币
        Global.HallServer.on(NetEvent_1.NetAppface.GetUserPoint, this, this.updateMoney);
        this.urlSign = Global.UrlUtil.getPlatformSign(this.uid + this.token + Global.Setting.SystemInfo.deviceId, Global.Setting.signKey);
    };
    PlayerData.prototype.updateMoney = function (msg) {
        this.point = msg.point;
        this.bank_point = msg.bank_point;
    };
    PlayerData.prototype.update = function (msg) {
        this.uid = msg.uid;
        if (msg.self_cfg) {
            this.vip = msg.vip_level;
            this.vipExp = msg.vip_coin;
            this.headkuang = "" + msg.self_cfg["head"];
            this.buyuPaotai = "" + msg.self_cfg["pao"];
        }
        var storage_vip = Global.Setting.storage.get(HallStorageKey_1.default.VIPLevel);
        if (!storage_vip && this._vip) {
            Global.Setting.storage.set(HallStorageKey_1.default.VIPLevel, Number(this._vip));
        }
        else if (storage_vip && storage_vip < this.vip) {
            Global.Setting.storage.set(HallStorageKey_1.default.VIPLevel, Number(this._vip));
        }
        if (msg && msg.merge_type !== "") {
            this.merge_type = msg.merge_type.toString();
        }
        this.nickname = Global.Toolkit.substrEndWithElli(msg.nickname, 14, true);
        this.headimg = msg.headimg;
        this.point = msg.point ? msg.point : 0;
        this.bank_point = msg.bank_point ? msg.bank_point : 0;
        this.type = msg.user_type;
        if (!msg.phone) {
            this.phone = "";
            return;
        }
        if (msg.phone.indexOf(" ") == -1) {
            this.phone = Global.AESUtil.decodeMsg(msg.phone);
            this.phone = this.functionSw(this.phone);
        }
        else {
            this.phone = msg.phone;
        }
    };
    PlayerData.prototype.functionSw = function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    };
    return PlayerData;
}());
exports.default = PlayerData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXGRhdGFcXFBsYXllckRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBcUQ7QUFDckQsc0RBQWlEO0FBQ2pELHlEQUEwRDtBQUcxRDtJQUFBO1FBeUNJOztXQUVHO1FBQ0ksZUFBVSxHQUFVLEVBQUUsQ0FBQztRQXNEOUIsT0FBTztRQUNDLGVBQVUsR0FBWSxHQUFHLENBQUM7SUFtS3RDLENBQUM7SUEvUEcsc0JBQVcsMkJBQUc7YUFrQmQ7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNqQyxDQUFDO2FBcEJELFVBQWUsTUFBYTtZQUN4QixJQUFHLElBQUksQ0FBQyxJQUFJLElBQUksTUFBTTtnQkFBRSxPQUFPO1lBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1lBQ25CLFlBQVk7WUFDWixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxxQkFBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMscUJBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDcEIsQ0FBQzs7O09BQUE7SUFFRCw4QkFBUyxHQUFUO1FBQ0ksU0FBUztRQUNULElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDM0QsSUFBSSxLQUFLLEdBQVEsRUFBRSxDQUFBO1FBQ25CLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUE7UUFDbEMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsTUFBTSxDQUFDLFVBQVUs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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhhbGxTdG9yYWdlS2V5IGZyb20gXCIuLi9jb25zdC9IYWxsU3RvcmFnZUtleVwiO1xyXG5pbXBvcnQgR2xvYmFsRXZlbnQgZnJvbSBcIi4uLy4uL2NvcmUvR2xvYmFsRXZlbnRcIjtcclxuaW1wb3J0IHsgTmV0QXBwZmFjZSB9IGZyb20gXCIuLi8uLi9jb3JlL25ldC9oYWxsL05ldEV2ZW50XCI7XHJcbmltcG9ydCBUb29sa2l0IGZyb20gXCIuLi8uLi9jb3JlL3Rvb2wvVG9vbGtpdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyRGF0YVxyXG57XHJcbiAgICBwdWJsaWMgdWlkOm51bWJlcjtcclxuICAgIC8qKlxyXG4gICAgICogdmlw562J57qnXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3ZpcCA6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzZXQgdmlwKG5ld1ZpcDpudW1iZXIpe1xyXG4gICAgICAgIGlmKHRoaXMuX3ZpcCA9PSBuZXdWaXApIHJldHVybjtcclxuICAgICAgICB0aGlzLl92aXAgPSBuZXdWaXA7IFxyXG4gICAgICAgIC8v6YCa55+l546p5a625L+h5oGv5Y+R55Sf5pu05pawXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlBFUlNPTkFMSU5GT1VQREFURSk7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkNIQU5HRVZJUCk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VWaXAoKVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVZpcCgpIHtcclxuICAgICAgICAvL+ivt+axguS/ruaUueWktOWDj+ahhlxyXG4gICAgICAgIGxldCBtb2RlbCA9IEdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJQbGF5ZXJJbmZvTW9kZWxcIilcclxuICAgICAgICBsZXQgcGFyYW06IGFueSA9IHt9XHJcbiAgICAgICAgcGFyYW0uaGVhZCA9IEdsb2JhbC5QbGF5ZXJEYXRhLnZpcFxyXG4gICAgICAgIG1vZGVsLnJlcVNldFNlbGZDZmcocGFyYW0sICgpID0+IHtcclxuICAgICAgICAgICAgR2xvYmFsLlBsYXllckRhdGEuaGVhZGt1YW5nID0gR2xvYmFsLlBsYXllckRhdGEudmlwLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHZpcCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92aXA/dGhpcy5fdmlwOjA7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWFheWAvOmHkeminVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdmlwRXhwOm51bWJlcjtcclxuICAgIHB1YmxpYyB0b2tlbjpzdHJpbmc7XHJcbiAgICBwdWJsaWMgcGFjazpudW1iZXI7ICAvL+a4oOmBk2lkXHJcbiAgICBwdWJsaWMgcGlkOmFueTsgIC8v5LiK57qnaWRcclxuICAgIHB1YmxpYyBvcGVuX2lkOnN0cmluZzsgIFxyXG4gICAgcHVibGljIGFjY2Vzc3Rva2VuOnN0cmluZzsgXHJcbiAgICBwdWJsaWMgcGF5Q2hhbm5lbDpzdHJpbmc7XHJcbiAgICBwdWJsaWMgdXJsU2lnbjpzdHJpbmc7XHJcbiAgICBwdWJsaWMgaXA6c3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog546p5a625qCH6K+GXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtZXJnZV90eXBlOnN0cmluZyA9IFwiXCI7XHJcbiAgICAvKipcclxuICAgICAqIOaNlemxvOeCruWPsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYnV5dVBhb3RhaTpzdHJpbmc7XHJcblxyXG4gICAgcHJpdmF0ZSBfdHlwZSA6IG51bWJlcjtcclxuICAgIC8v546p5a6257G75Z6LIDEg5ri45a6iIDIg57uR5a6a5omL5py6XHJcbiAgICBwdWJsaWMgc2V0IHR5cGUoIG5ld1R5cGU6bnVtYmVyICl7XHJcbiAgICAgICAgaWYodGhpcy5fdHlwZSA9PSBuZXdUeXBlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fdHlwZSA9IG5ld1R5cGU7IFxyXG4gICAgICAgIC8v6YCa55+l546p5a625L+h5oGv5Y+R55Sf5pu05pawXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlBFUlNPTkFMSU5GT1VQREFURSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHR5cGUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eOqeWutuaJi+aculxyXG4gICAgcHJpdmF0ZSBfcGhvbmUgOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2V0IHBob25lKCBuZXdQaG9uZTpzdHJpbmcgKXtcclxuICAgICAgICBpZih0aGlzLl9waG9uZSA9PSBuZXdQaG9uZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX3Bob25lID0gbmV3UGhvbmU7IFxyXG4gICAgICAgIC8v6YCa55+l546p5a625L+h5oGv5Y+R55Sf5pu05pawXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlBFUlNPTkFMSU5GT1VQREFURSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHBob25lKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bob25lO1xyXG4gICAgfVxyXG5cclxuICAgIC8v546p5a625pi156ewXHJcbiAgICBwcml2YXRlIF9uaWNrbmFtZSA6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZXQgbmlja25hbWUoIG5ld05pY2tuYW1lOnN0cmluZyApe1xyXG4gICAgICAgIGlmKHRoaXMuX25pY2tuYW1lID09IG5ld05pY2tuYW1lKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fbmlja25hbWUgPSBuZXdOaWNrbmFtZTsgXHJcbiAgICAgICAgLy/pgJrnn6Xnjqnlrrbkv6Hmga/lj5HnlJ/mm7TmlrBcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgbmlja25hbWUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmlja25hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/njqnlrrblpLTlg49cclxuICAgIHByaXZhdGUgX2hlYWRpbWcgOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2V0IGhlYWRpbWcoIG5ld0hlYWRpbWc6c3RyaW5nICl7XHJcbiAgICAgICAgaWYodGhpcy5oZWFkaW1nID09IG5ld0hlYWRpbWcpIHJldHVybjtcclxuICAgICAgICB0aGlzLl9oZWFkaW1nID0gbmV3SGVhZGltZzsgXHJcbiAgICAgICAgLy/pgJrnn6Xnjqnlrrbkv6Hmga/lj5HnlJ/mm7TmlrBcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaGVhZGltZygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWFkaW1nO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eOqeWutuWktOWDj+ahhlxyXG4gICAgcHJpdmF0ZSBfaGVhZGt1YW5nIDogc3RyaW5nID0gXCIwXCI7XHJcbiAgICBwdWJsaWMgc2V0IGhlYWRrdWFuZyggbmV3SGVhZGt1YW5nOnN0cmluZyApe1xyXG4gICAgICAgIGlmKG5ld0hlYWRrdWFuZyA9PSBcIlwiKXtcclxuICAgICAgICAgICAgbmV3SGVhZGt1YW5nID0gXCIwXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaGVhZGt1YW5nID09IG5ld0hlYWRrdWFuZykgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX2hlYWRrdWFuZyA9IG5ld0hlYWRrdWFuZzsgXHJcbiAgICAgICAgLy/pgJrnn6Xnjqnlrrbkv6Hmga/lj5HnlJ/mm7TmlrBcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaGVhZGt1YW5nKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlYWRrdWFuZztcclxuICAgIH1cclxuXHJcbiAgICAvL+mHkeW4geaVsOmHj1xyXG4gICAgcHJpdmF0ZSBfcG9pbnQgOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc2V0IHBvaW50KCBuZXdQb2ludDpudW1iZXIgKXtcclxuICAgICAgICBpZih0aGlzLl9wb2ludCA9PSBuZXdQb2ludCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX3BvaW50ID0gbmV3UG9pbnQ7IFxyXG4gICAgICAgIC8v546p5a626YeR5biB5Y+R55Sf5Y+Y5YyWXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlBFUlNPTkFMSU5GT1VQREFURSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHBvaW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvaW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8v6ZO26KGM5a2Y5qy+5pWw6YePXHJcbiAgICBwcml2YXRlIF9iYW5rX3BvaW50IDogbnVtYmVyO1xyXG4gICAgcHVibGljIHNldCBiYW5rX3BvaW50KCBuZXdQb2ludDpudW1iZXIgKXtcclxuICAgICAgICBpZih0aGlzLl9iYW5rX3BvaW50ID09IG5ld1BvaW50KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fYmFua19wb2ludCA9IG5ld1BvaW50OyBcclxuICAgICAgICAvL+eOqeWutumHkeW4geWPkeeUn+WPmOWMllxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5QRVJTT05BTElORk9VUERBVEUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBiYW5rX3BvaW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhbmtfcG9pbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnVpZCA9IDA7XHJcbiAgICAgICAgdGhpcy5fdmlwID0gMDtcclxuICAgICAgICB0aGlzLnZpcEV4cCA9IDA7XHJcbiAgICAgICAgdGhpcy5oZWFka3VhbmcgPSBcIjBcIjtcclxuICAgICAgICB0aGlzLmJ1eXVQYW90YWkgPSBcIjBcIjtcclxuICAgICAgICB0aGlzLnRva2VuID0gXCJcIjtcclxuICAgICAgICB0aGlzLm5pY2tuYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLmhlYWRpbWcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMucG9pbnQgPSAwO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IDA7XHJcbiAgICAgICAgdGhpcy5waG9uZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5wYWNrID0gMDtcclxuICAgICAgICB0aGlzLnBpZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vcGVuX2lkID0gXCJcIjtcclxuICAgICAgICB0aGlzLmFjY2Vzc3Rva2VuID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAgICBVaWQgICAgICAgICB1aW50NjQgICAgICAgICAgICAgICAgIGBqc29uOlwidWlkXCJgXHJcbiAgICAgICAgVG9rZW4gICAgICAgc3RyaW5nICAgICAgICAgICAgICAgICBganNvbjpcInRva2VuXCJgXHJcbiAgICAgICAgTmlja25hbWUgICAgc3RyaW5nICAgICAgICAgICAgICAgICBganNvbjpcIm5pY2tuYW1lXCJgXHJcbiAgICAgICAgSGVhZGltZyAgICAgc3RyaW5nICAgICAgICAgICAgICAgICBganNvbjpcImhlYWRpbWdcImBcclxuICAgICAgICBQb2ludCAgICAgICBpbnQ2NCAgICAgICAgICAgICAgICAgIGBqc29uOlwicG9pbnRcImAgICAgIC8v6YeR5biBXHJcbiAgICAgICAgVXNlclR5cGUgICAgaW50MzIgICAgICAgICAgICAgICAgICBganNvbjpcInVzZXJfdHlwZVwiYCAvLy0tLS0tXHJcbiAgICAgICAgUGhvbmUgICAgICAgc3RyaW5nICAgICAgICAgICAgICAgICBganNvbjpcInBob25lXCJgICAgICAvLy0tLS0tLVxyXG4gICAgICAgIFBhY2tObyAgICAgIGludDMyICAgICAgICAgICAgICAgICAgYGpzb246XCJwYWNrX25vXCJgXHJcbiAgICAgICAgUGlkICAgICAgICAgdWludDY0ICAgICAgICAgICAgICAgICBganNvbjpcInBpZFwiYFxyXG4gICAgICAgIFNBZGRyICAgICAgIFtdc3RyaW5nICAgICAgICAgICAgICAgYGpzb246XCJzX2FkZHJcImAgLy8tLS0tXHJcbiAgICAgICAgT3BlbklkICAgICAgc3RyaW5nICAgICAgICAgICAgICAgICBganNvbjpcIm9wZW5faWRcImBcclxuICAgICAgICBBY2Nlc3N0b2tlbiBzdHJpbmcgICAgICAgICAgICAgICAgIGBqc29uOlwiYWNjZXNzdG9rZW5cImBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGluaXQobXNnOmFueSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgLy/njqnlrrbns7vnu5/mlbDmja5cclxuICAgICAgICB0aGlzLnVpZCA9IG1zZy51aWQ7XHJcbiAgICAgICAgdGhpcy50b2tlbiA9IG1zZy50b2tlbjtcclxuICAgICAgICB0aGlzLnBhY2sgPSBtc2cucGFja19ubz8gbXNnLnBhY2tfbm8gOiAwO1xyXG4gICAgICAgIHRoaXMucGlkID0gbXNnLnBpZD8gbXNnLnBpZCA6IDA7XHJcbiAgICAgICAgdGhpcy5vcGVuX2lkID0gbXNnLm9wZW5faWQ7XHJcbiAgICAgICAgdGhpcy5hY2Nlc3N0b2tlbiA9IG1zZy5hY2Nlc3N0b2tlbjtcclxuICAgICAgICB0aGlzLmlwID0gbXNnLmxpc3RfaXAgfHwgXCJcIlxyXG4gICAgICAgIGlmKG1zZyAmJiBtc2cubWVyZ2VfdHlwZSAhPT0gXCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWVyZ2VfdHlwZSA9IG1zZy5tZXJnZV90eXBlLnRvU3RyaW5nKCkgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLkNoYW5uZWxJbmZvLnBsYXllckNoYW5uZWwgPSB0aGlzLnBhY2s7XHJcbiAgICAgICAgaWYgKEdsb2JhbC5Ub29sa2l0LmNoZWNrTnVtVmFsaWQodGhpcy5waWQpID09IGZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy5waWQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5DaGFubmVsSW5mby5wbGF5ZXJJbnZpdGVDb2RlID0gdGhpcy5waWQ7XHJcbiAgICAgICAgaWYodGhpcy5wYWNrICE9IG51bGwgJiYgdGhpcy5wYWNrICE9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnNldChIYWxsU3RvcmFnZUtleS5DaGFubmVsLCB0aGlzLnBhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnBpZCAmJiB0aGlzLnBpZCAhPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXQoSGFsbFN0b3JhZ2VLZXkuSW52aXRlQ29kZSwgdGhpcy5waWQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0KEhhbGxTdG9yYWdlS2V5LlRva2VuLCB0aGlzLnRva2VuKTtcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnNldChIYWxsU3RvcmFnZUtleS5VaWQsIHRoaXMudWlkLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAvL+eOqeWutua4uOaIj+aVsOaNrlxyXG4gICAgICAgIHRoaXMudXBkYXRlKG1zZyk7XHJcbiAgICAgICAgLy/nm5HlkKzlkI7nu63njqnlrrbmlbDmja7mm7TmlrBcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5vbihOZXRBcHBmYWNlLkdldFVzZXJJbmZvLCB0aGlzLCB0aGlzLnVwZGF0ZSk7XHJcbiAgICAgICAgLy/or7fmsYLmnIDmlrDph5HluIFcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5vbihOZXRBcHBmYWNlLkdldFVzZXJQb2ludCx0aGlzLHRoaXMudXBkYXRlTW9uZXkpO1xyXG5cclxuICAgICAgICB0aGlzLnVybFNpZ24gPSBHbG9iYWwuVXJsVXRpbC5nZXRQbGF0Zm9ybVNpZ24odGhpcy51aWQgKyB0aGlzLnRva2VuICsgR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5kZXZpY2VJZCxHbG9iYWwuU2V0dGluZy5zaWduS2V5KVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlTW9uZXkoIG1zZyA6IGFueSApe1xyXG4gICAgICAgIHRoaXMucG9pbnQgPSBtc2cucG9pbnQ7XHJcbiAgICAgICAgdGhpcy5iYW5rX3BvaW50ID0gbXNnLmJhbmtfcG9pbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShtc2c6IGFueSkgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy51aWQgPSBtc2cudWlkO1xyXG4gICAgICAgIGlmKG1zZy5zZWxmX2NmZyl7XHJcbiAgICAgICAgICAgIHRoaXMudmlwID0gbXNnLnZpcF9sZXZlbDtcclxuICAgICAgICAgICAgdGhpcy52aXBFeHAgPSBtc2cudmlwX2NvaW47XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZGt1YW5nID0gXCJcIiArIG1zZy5zZWxmX2NmZ1tcImhlYWRcIl07XHJcbiAgICAgICAgICAgIHRoaXMuYnV5dVBhb3RhaSA9IFwiXCIgKyBtc2cuc2VsZl9jZmdbXCJwYW9cIl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzdG9yYWdlX3ZpcCA9IEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0KEhhbGxTdG9yYWdlS2V5LlZJUExldmVsKVxyXG4gICAgICAgIGlmICghc3RvcmFnZV92aXAgJiYgdGhpcy5fdmlwKXtcclxuICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXQoSGFsbFN0b3JhZ2VLZXkuVklQTGV2ZWwsIE51bWJlcih0aGlzLl92aXApKTtcclxuICAgICAgICB9ZWxzZSBpZiAoc3RvcmFnZV92aXAgJiYgc3RvcmFnZV92aXAgPCB0aGlzLnZpcCl7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0KEhhbGxTdG9yYWdlS2V5LlZJUExldmVsLCBOdW1iZXIodGhpcy5fdmlwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG1zZyAmJiBtc2cubWVyZ2VfdHlwZSAhPT0gXCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubWVyZ2VfdHlwZSA9IG1zZy5tZXJnZV90eXBlLnRvU3RyaW5nKCkgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5pY2tuYW1lID0gR2xvYmFsLlRvb2xraXQuc3Vic3RyRW5kV2l0aEVsbGkobXNnLm5pY2tuYW1lLDE0LHRydWUpO1xyXG4gICAgICAgIHRoaXMuaGVhZGltZyA9IG1zZy5oZWFkaW1nO1xyXG4gICAgICAgIHRoaXMucG9pbnQgPSBtc2cucG9pbnQgPyBtc2cucG9pbnQgOiAwO1xyXG4gICAgICAgIHRoaXMuYmFua19wb2ludCA9IG1zZy5iYW5rX3BvaW50ID8gbXNnLmJhbmtfcG9pbnQgOiAwO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IG1zZy51c2VyX3R5cGU7XHJcbiAgICAgICAgaWYoIW1zZy5waG9uZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucGhvbmUgPSBcIlwiXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihtc2cucGhvbmUuaW5kZXhPZihcIiBcIikgPT0gLTEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBob25lID0gR2xvYmFsLkFFU1V0aWwuZGVjb2RlTXNnKG1zZy5waG9uZSlcclxuICAgICAgICAgICAgdGhpcy5waG9uZSA9IHRoaXMuZnVuY3Rpb25Tdyh0aGlzLnBob25lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5waG9uZSA9IG1zZy5waG9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvblN3KHN0cil7IC8v5Y675o6J6aaW5bC+5Lik56uv55qE56m65qC8KF5cXHMqKXwoXFxzKiQpXHJcbiAgICAgICAg44CA44CAICByZXR1cm4gc3RyLnJlcGxhY2UoLyheXFxzKil8KFxccyokKS9nLCBcIlwiKTtcclxuICAgIH1cclxufSJdfQ==