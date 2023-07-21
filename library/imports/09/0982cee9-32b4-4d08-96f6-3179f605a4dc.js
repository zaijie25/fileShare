"use strict";
cc._RF.push(module, '0982c7pMrRNCJb2MXn2BaTc', 'ChannelInfo');
// hall/scripts/logic/core/setting/ChannelInfo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//玩家渠道信息数据
var ChannelInfo = /** @class */ (function () {
    function ChannelInfo() {
        //邀请人id
        this._inviteId = 0;
    }
    Object.defineProperty(ChannelInfo.prototype, "openInstallChannel", {
        get: function () { return this._openInstallChannel; },
        set: function (value) {
            if (value == 0)
                return;
            this._openInstallChannel = value;
            Global.Setting.storage.set(ChannelInfo.OpenInstallChannelKey, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChannelInfo.prototype, "inviteId", {
        get: function () { return this._inviteId; },
        set: function (value) {
            if (value == 0)
                return;
            this._inviteId = value;
            Global.Setting.storage.set(ChannelInfo.InviteIdKey, value);
        },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(ChannelInfo.prototype, "clipboardChannel", {
        get: function () { return this._clipboardChannel; },
        set: function (value) {
            this._clipboardChannel = value;
            Global.Setting.storage.set(ChannelInfo.ClipboardChannelKey, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChannelInfo.prototype, "infoChannel", {
        get: function () { return this._infoChannel; },
        set: function (value) {
            this._infoChannel = value;
            Global.Setting.storage.set(ChannelInfo.infoChannelKey, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChannelInfo.prototype, "playerChannel", {
        get: function () { return this._playerChannel; },
        set: function (value) {
            this._playerChannel = value;
            Global.Setting.storage.set(ChannelInfo.PlayerChannelKey, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChannelInfo.prototype, "playerInviteCode", {
        get: function () { return this._playerInviteCode; },
        set: function (value) {
            this._playerInviteCode = value;
            Global.Setting.storage.set(ChannelInfo.PlayerInviteCodelKey, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ChannelInfo.prototype, "serverAppInfoContent", {
        get: function () {
            return this._serverAppInfoContent;
        },
        set: function (value) {
            this._serverAppInfoContent = value;
            if (value != null)
                Global.Setting.storage.set(ChannelInfo.ServerAppInfoContentKey, JSON.stringify(value));
        },
        enumerable: false,
        configurable: true
    });
    ChannelInfo.prototype.setup = function () {
        this._playerChannel = Global.Setting.storage.getNumber(ChannelInfo.PlayerChannelKey);
        this._playerInviteCode = Global.Setting.storage.getNumber(ChannelInfo.PlayerInviteCodelKey);
        this._inviteId = Global.Setting.storage.getNumber(ChannelInfo.InviteIdKey);
        var serInfoStr = Global.Setting.storage.get(ChannelInfo.ServerAppInfoContentKey);
        this.parseServerInfo(serInfoStr);
    };
    //优先级 openinstall >sharetraceChannel > plist > 剪贴板 > appInfo > 包渠道号 > 配置表渠道号 
    //@todo  需要玩家身上渠道号的本地缓存吗?
    ChannelInfo.prototype.getRegistChannel = function () {
        if (this.isChannelViald(this.openInstallChannel))
            return this.openInstallChannel;
        if (this.isChannelViald(this.infoChannel))
            return this.infoChannel;
        if (this.isChannelViald(this.clipboardChannel))
            return this.clipboardChannel;
        if (this.serverAppInfoContent && this.isChannelViald(this.serverAppInfoContent.ch))
            return this.serverAppInfoContent.ch;
        if (this.isChannelViald(this.playerChannel))
            return this.playerChannel;
        if (this.isChannelViald(this.packageChannel))
            return this.packageChannel;
        if (this.isChannelViald(this.configChannel))
            return this.configChannel;
        return 0;
    };
    ChannelInfo.prototype.getPlayerChannel = function () {
        return this.playerChannel;
    };
    ChannelInfo.prototype.isChannelViald = function (value) {
        if (value == null || isNaN(value) || value == 0)
            return false;
        return true;
    };
    ChannelInfo.prototype.getInviteId = function () {
        if (this.isChannelViald(this.inviteId))
            return this.inviteId;
        if (this.serverAppInfoContent && this.isChannelViald(this.serverAppInfoContent.ic))
            return this.serverAppInfoContent.ic;
        if (this.isChannelViald(this.playerInviteCode))
            return this.playerInviteCode;
        return 0;
    };
    ChannelInfo.prototype.parseServerInfo = function (content) {
        var tab = null;
        try {
            tab = JSON.parse(content);
        }
        catch (e) {
            return;
        }
        this.serverAppInfoContent = tab;
    };
    ChannelInfo.OpenInstallChannelKey = "OpenInstallChannelKey";
    ChannelInfo.PlayerChannelKey = "PlayerChannelKey";
    ChannelInfo.PlayerInviteCodelKey = "PlayerInviteCodelKey";
    ChannelInfo.InviteIdKey = "InviteIdKey";
    ChannelInfo.ClipboardChannelKey = "ClipboardChannelKey";
    ChannelInfo.infoChannelKey = "infoChannelKey";
    ChannelInfo.ServerAppInfoContentKey = "ServerAppInfoContentKey";
    return ChannelInfo;
}());
exports.default = ChannelInfo;

cc._RF.pop();