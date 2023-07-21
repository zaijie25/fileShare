//玩家渠道信息数据
export default class ChannelInfo {
    private static OpenInstallChannelKey = "OpenInstallChannelKey";
    private static PlayerChannelKey = "PlayerChannelKey";
    private static PlayerInviteCodelKey = "PlayerInviteCodelKey";
    private static InviteIdKey = "InviteIdKey";
    private static ClipboardChannelKey = "ClipboardChannelKey";
    private static infoChannelKey = "infoChannelKey";
    private static ServerAppInfoContentKey = "ServerAppInfoContentKey";

    //appconfig中的channelId
    public configChannel: number;

    //openinstall 传来的channelid
    private _openInstallChannel: number;
    public get openInstallChannel() { return this._openInstallChannel; }
    public set openInstallChannel(value) {
        if (value == 0)
            return;
        this._openInstallChannel = value;
        Global.Setting.storage.set(ChannelInfo.OpenInstallChannelKey, value);
    }
  
     //邀请人id
     private _inviteId: number = 0;
     public get inviteId() { return this._inviteId };
     public set inviteId(value) {
         if (value == 0)
             return;
         this._inviteId = value;
         Global.Setting.storage.set(ChannelInfo.InviteIdKey, value);
     }
    
    //剪贴板中的渠道号
    private _clipboardChannel: number;
    public get clipboardChannel() { return this._clipboardChannel; }
    public set clipboardChannel(value) {
        this._clipboardChannel = value;
        Global.Setting.storage.set(ChannelInfo.ClipboardChannelKey, value);
    }
    //info.plist中的渠道号
    private _infoChannel: number;
    public get infoChannel() { return this._infoChannel; }
    public set infoChannel(value) {
        this._infoChannel = value;
        Global.Setting.storage.set(ChannelInfo.infoChannelKey, value);
    }
    //随包的channelid
    public packageChannel: number;

    //playerdata的实际channelid
    private _playerChannel: number;
    public get playerChannel() { return this._playerChannel; }
    public set playerChannel(value) {
        this._playerChannel = value;
        Global.Setting.storage.set(ChannelInfo.PlayerChannelKey, value);
    }

    //playerdata的实际channelid
    private _playerInviteCode: number;
    public get playerInviteCode() { return this._playerInviteCode; }
    public set playerInviteCode(value) {
        this._playerInviteCode = value;
        Global.Setting.storage.set(ChannelInfo.PlayerInviteCodelKey, value);
    }

   
    //渠道号获取类型 1 openinstall 2 剪贴板 2 超级签  4 请求服务器获取渠道信息 5 sharetrace
    public sourceType: number;
    //剪贴板验证数据
    public clipboardContent: string;
    //openinstall 返回数据
    public openInstallContent: any;
    //downloadAppInfo缓存
    private _serverAppInfoContent: any;
    public get serverAppInfoContent() {
        return this._serverAppInfoContent;
    }

    public set serverAppInfoContent(value) {
        this._serverAppInfoContent = value;
        if (value != null)
            Global.Setting.storage.set(ChannelInfo.ServerAppInfoContentKey, JSON.stringify(value));
    }

    public setup() {
        this._playerChannel = Global.Setting.storage.getNumber(ChannelInfo.PlayerChannelKey);
        this._playerInviteCode = Global.Setting.storage.getNumber(ChannelInfo.PlayerInviteCodelKey);
        this._inviteId = Global.Setting.storage.getNumber(ChannelInfo.InviteIdKey);
        let serInfoStr = Global.Setting.storage.get(ChannelInfo.ServerAppInfoContentKey);
        this.parseServerInfo(serInfoStr);
    }

    //优先级 openinstall >sharetraceChannel > plist > 剪贴板 > appInfo > 包渠道号 > 配置表渠道号 
    //@todo  需要玩家身上渠道号的本地缓存吗?
    public getRegistChannel() {
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
    }

    public getPlayerChannel() {
        return this.playerChannel;
    }

    private isChannelViald(value) {
        if (value == null || isNaN(value) || value == 0)
            return false;
        return true;
    }

    public getInviteId() {
        if (this.isChannelViald(this.inviteId))
            return this.inviteId;
        if (this.serverAppInfoContent && this.isChannelViald(this.serverAppInfoContent.ic))
            return this.serverAppInfoContent.ic;
        if (this.isChannelViald(this.playerInviteCode))
            return this.playerInviteCode;
        return 0;
    }

    private parseServerInfo(content) {
        let tab = null;
        try {
            tab = JSON.parse(content);
        }
        catch (e) {
            return;
        }
        this.serverAppInfoContent = tab;
    }

}