"use strict";
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