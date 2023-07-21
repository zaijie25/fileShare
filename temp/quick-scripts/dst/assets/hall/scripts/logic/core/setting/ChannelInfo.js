
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/setting/ChannelInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHNldHRpbmdcXENoYW5uZWxJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsVUFBVTtBQUNWO0lBQUE7UUFzQkssT0FBTztRQUNDLGNBQVMsR0FBVyxDQUFDLENBQUM7SUF3SG5DLENBQUM7SUFqSUcsc0JBQVcsMkNBQWtCO2FBQTdCLGNBQWtDLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQzthQUNwRSxVQUE4QixLQUFLO1lBQy9CLElBQUksS0FBSyxJQUFJLENBQUM7Z0JBQ1YsT0FBTztZQUNYLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7WUFDakMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6RSxDQUFDOzs7T0FObUU7SUFVbkUsc0JBQVcsaUNBQVE7YUFBbkIsY0FBd0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFBLENBQUMsQ0FBQzthQUMvQyxVQUFvQixLQUFLO1lBQ3JCLElBQUksS0FBSyxJQUFJLENBQUM7Z0JBQ1YsT0FBTztZQUNYLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9ELENBQUM7OztPQU44QztJQUFBLENBQUM7SUFVakQsc0JBQVcseUNBQWdCO2FBQTNCLGNBQWdDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzthQUNoRSxVQUE0QixLQUFLO1lBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7WUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxt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UUFDM0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2YsSUFBSTtZQUNBLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdCO1FBQ0QsT0FBTyxDQUFDLEVBQUU7WUFDTixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxDQUFDO0lBQ3BDLENBQUM7SUE1SWMsaUNBQXFCLEdBQUcsdUJBQXVCLENBQUM7SUFDaEQsNEJBQWdCLEdBQUcsa0JBQWtCLENBQUM7SUFDdEMsZ0NBQW9CLEdBQUcsc0JBQXNCLENBQUM7SUFDOUMsdUJBQVcsR0FBRyxhQUFhLENBQUM7SUFDNUIsK0JBQW1CLEdBQUcscUJBQXFCLENBQUM7SUFDNUMsMEJBQWMsR0FBRyxnQkFBZ0IsQ0FBQztJQUNsQyxtQ0FBdUIsR0FBRyx5QkFBeUIsQ0FBQztJQXdJdkUsa0JBQUM7Q0EvSUQsQUErSUMsSUFBQTtrQkEvSW9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL+eOqeWutua4oOmBk+S/oeaBr+aVsOaNrlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFubmVsSW5mbyB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBPcGVuSW5zdGFsbENoYW5uZWxLZXkgPSBcIk9wZW5JbnN0YWxsQ2hhbm5lbEtleVwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgUGxheWVyQ2hhbm5lbEtleSA9IFwiUGxheWVyQ2hhbm5lbEtleVwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgUGxheWVySW52aXRlQ29kZWxLZXkgPSBcIlBsYXllckludml0ZUNvZGVsS2V5XCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBJbnZpdGVJZEtleSA9IFwiSW52aXRlSWRLZXlcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIENsaXBib2FyZENoYW5uZWxLZXkgPSBcIkNsaXBib2FyZENoYW5uZWxLZXlcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIGluZm9DaGFubmVsS2V5ID0gXCJpbmZvQ2hhbm5lbEtleVwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgU2VydmVyQXBwSW5mb0NvbnRlbnRLZXkgPSBcIlNlcnZlckFwcEluZm9Db250ZW50S2V5XCI7XHJcblxyXG4gICAgLy9hcHBjb25maWfkuK3nmoRjaGFubmVsSWRcclxuICAgIHB1YmxpYyBjb25maWdDaGFubmVsOiBudW1iZXI7XHJcblxyXG4gICAgLy9vcGVuaW5zdGFsbCDkvKDmnaXnmoRjaGFubmVsaWRcclxuICAgIHByaXZhdGUgX29wZW5JbnN0YWxsQ2hhbm5lbDogbnVtYmVyO1xyXG4gICAgcHVibGljIGdldCBvcGVuSW5zdGFsbENoYW5uZWwoKSB7IHJldHVybiB0aGlzLl9vcGVuSW5zdGFsbENoYW5uZWw7IH1cclxuICAgIHB1YmxpYyBzZXQgb3Blbkluc3RhbGxDaGFubmVsKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IDApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl9vcGVuSW5zdGFsbENoYW5uZWwgPSB2YWx1ZTtcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnNldChDaGFubmVsSW5mby5PcGVuSW5zdGFsbENoYW5uZWxLZXksIHZhbHVlKTtcclxuICAgIH1cclxuICBcclxuICAgICAvL+mCgOivt+S6umlkXHJcbiAgICAgcHJpdmF0ZSBfaW52aXRlSWQ6IG51bWJlciA9IDA7XHJcbiAgICAgcHVibGljIGdldCBpbnZpdGVJZCgpIHsgcmV0dXJuIHRoaXMuX2ludml0ZUlkIH07XHJcbiAgICAgcHVibGljIHNldCBpbnZpdGVJZCh2YWx1ZSkge1xyXG4gICAgICAgICBpZiAodmFsdWUgPT0gMClcclxuICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgdGhpcy5faW52aXRlSWQgPSB2YWx1ZTtcclxuICAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXQoQ2hhbm5lbEluZm8uSW52aXRlSWRLZXksIHZhbHVlKTtcclxuICAgICB9XHJcbiAgICBcclxuICAgIC8v5Ymq6LS05p2/5Lit55qE5rig6YGT5Y+3XHJcbiAgICBwcml2YXRlIF9jbGlwYm9hcmRDaGFubmVsOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZ2V0IGNsaXBib2FyZENoYW5uZWwoKSB7IHJldHVybiB0aGlzLl9jbGlwYm9hcmRDaGFubmVsOyB9XHJcbiAgICBwdWJsaWMgc2V0IGNsaXBib2FyZENoYW5uZWwodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9jbGlwYm9hcmRDaGFubmVsID0gdmFsdWU7XHJcbiAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXQoQ2hhbm5lbEluZm8uQ2xpcGJvYXJkQ2hhbm5lbEtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy9pbmZvLnBsaXN05Lit55qE5rig6YGT5Y+3XHJcbiAgICBwcml2YXRlIF9pbmZvQ2hhbm5lbDogbnVtYmVyO1xyXG4gICAgcHVibGljIGdldCBpbmZvQ2hhbm5lbCgpIHsgcmV0dXJuIHRoaXMuX2luZm9DaGFubmVsOyB9XHJcbiAgICBwdWJsaWMgc2V0IGluZm9DaGFubmVsKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5faW5mb0NoYW5uZWwgPSB2YWx1ZTtcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnNldChDaGFubmVsSW5mby5pbmZvQ2hhbm5lbEtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy/pmo/ljIXnmoRjaGFubmVsaWRcclxuICAgIHB1YmxpYyBwYWNrYWdlQ2hhbm5lbDogbnVtYmVyO1xyXG5cclxuICAgIC8vcGxheWVyZGF0YeeahOWunumZhWNoYW5uZWxpZFxyXG4gICAgcHJpdmF0ZSBfcGxheWVyQ2hhbm5lbDogbnVtYmVyO1xyXG4gICAgcHVibGljIGdldCBwbGF5ZXJDaGFubmVsKCkgeyByZXR1cm4gdGhpcy5fcGxheWVyQ2hhbm5lbDsgfVxyXG4gICAgcHVibGljIHNldCBwbGF5ZXJDaGFubmVsKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyQ2hhbm5lbCA9IHZhbHVlO1xyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0KENoYW5uZWxJbmZvLlBsYXllckNoYW5uZWxLZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3BsYXllcmRhdGHnmoTlrp7pmYVjaGFubmVsaWRcclxuICAgIHByaXZhdGUgX3BsYXllckludml0ZUNvZGU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBnZXQgcGxheWVySW52aXRlQ29kZSgpIHsgcmV0dXJuIHRoaXMuX3BsYXllckludml0ZUNvZGU7IH1cclxuICAgIHB1YmxpYyBzZXQgcGxheWVySW52aXRlQ29kZSh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3BsYXllckludml0ZUNvZGUgPSB2YWx1ZTtcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnNldChDaGFubmVsSW5mby5QbGF5ZXJJbnZpdGVDb2RlbEtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgXHJcbiAgICAvL+a4oOmBk+WPt+iOt+WPluexu+WeiyAxIG9wZW5pbnN0YWxsIDIg5Ymq6LS05p2/IDIg6LaF57qn562+ICA0IOivt+axguacjeWKoeWZqOiOt+WPlua4oOmBk+S/oeaBryA1IHNoYXJldHJhY2VcclxuICAgIHB1YmxpYyBzb3VyY2VUeXBlOiBudW1iZXI7XHJcbiAgICAvL+WJqui0tOadv+mqjOivgeaVsOaNrlxyXG4gICAgcHVibGljIGNsaXBib2FyZENvbnRlbnQ6IHN0cmluZztcclxuICAgIC8vb3Blbmluc3RhbGwg6L+U5Zue5pWw5o2uXHJcbiAgICBwdWJsaWMgb3Blbkluc3RhbGxDb250ZW50OiBhbnk7XHJcbiAgICAvL2Rvd25sb2FkQXBwSW5mb+e8k+WtmFxyXG4gICAgcHJpdmF0ZSBfc2VydmVyQXBwSW5mb0NvbnRlbnQ6IGFueTtcclxuICAgIHB1YmxpYyBnZXQgc2VydmVyQXBwSW5mb0NvbnRlbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZlckFwcEluZm9Db250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2VydmVyQXBwSW5mb0NvbnRlbnQodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zZXJ2ZXJBcHBJbmZvQ29udGVudCA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnNldChDaGFubmVsSW5mby5TZXJ2ZXJBcHBJbmZvQ29udGVudEtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0dXAoKSB7XHJcbiAgICAgICAgdGhpcy5fcGxheWVyQ2hhbm5lbCA9IEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0TnVtYmVyKENoYW5uZWxJbmZvLlBsYXllckNoYW5uZWxLZXkpO1xyXG4gICAgICAgIHRoaXMuX3BsYXllckludml0ZUNvZGUgPSBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldE51bWJlcihDaGFubmVsSW5mby5QbGF5ZXJJbnZpdGVDb2RlbEtleSk7XHJcbiAgICAgICAgdGhpcy5faW52aXRlSWQgPSBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldE51bWJlcihDaGFubmVsSW5mby5JbnZpdGVJZEtleSk7XHJcbiAgICAgICAgbGV0IHNlckluZm9TdHIgPSBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldChDaGFubmVsSW5mby5TZXJ2ZXJBcHBJbmZvQ29udGVudEtleSk7XHJcbiAgICAgICAgdGhpcy5wYXJzZVNlcnZlckluZm8oc2VySW5mb1N0cik7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kvJjlhYjnuqcgb3Blbmluc3RhbGwgPnNoYXJldHJhY2VDaGFubmVsID4gcGxpc3QgPiDliarotLTmnb8gPiBhcHBJbmZvID4g5YyF5rig6YGT5Y+3ID4g6YWN572u6KGo5rig6YGT5Y+3IFxyXG4gICAgLy9AdG9kbyAg6ZyA6KaB546p5a626Lqr5LiK5rig6YGT5Y+355qE5pys5Zyw57yT5a2Y5ZCXP1xyXG4gICAgcHVibGljIGdldFJlZ2lzdENoYW5uZWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDaGFubmVsVmlhbGQodGhpcy5vcGVuSW5zdGFsbENoYW5uZWwpKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuSW5zdGFsbENoYW5uZWw7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDaGFubmVsVmlhbGQodGhpcy5pbmZvQ2hhbm5lbCkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluZm9DaGFubmVsO1xyXG4gICAgICAgIGlmICh0aGlzLmlzQ2hhbm5lbFZpYWxkKHRoaXMuY2xpcGJvYXJkQ2hhbm5lbCkpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsaXBib2FyZENoYW5uZWw7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VydmVyQXBwSW5mb0NvbnRlbnQgJiYgdGhpcy5pc0NoYW5uZWxWaWFsZCh0aGlzLnNlcnZlckFwcEluZm9Db250ZW50LmNoKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyQXBwSW5mb0NvbnRlbnQuY2g7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDaGFubmVsVmlhbGQodGhpcy5wbGF5ZXJDaGFubmVsKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyQ2hhbm5lbDtcclxuICAgICAgICBpZiAodGhpcy5pc0NoYW5uZWxWaWFsZCh0aGlzLnBhY2thZ2VDaGFubmVsKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFja2FnZUNoYW5uZWw7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDaGFubmVsVmlhbGQodGhpcy5jb25maWdDaGFubmVsKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnQ2hhbm5lbDtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGxheWVyQ2hhbm5lbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXJDaGFubmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNDaGFubmVsVmlhbGQodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCBpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJbnZpdGVJZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0NoYW5uZWxWaWFsZCh0aGlzLmludml0ZUlkKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW52aXRlSWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VydmVyQXBwSW5mb0NvbnRlbnQgJiYgdGhpcy5pc0NoYW5uZWxWaWFsZCh0aGlzLnNlcnZlckFwcEluZm9Db250ZW50LmljKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyQXBwSW5mb0NvbnRlbnQuaWM7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDaGFubmVsVmlhbGQodGhpcy5wbGF5ZXJJbnZpdGVDb2RlKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxheWVySW52aXRlQ29kZTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBhcnNlU2VydmVySW5mbyhjb250ZW50KSB7XHJcbiAgICAgICAgbGV0IHRhYiA9IG51bGw7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGFiID0gSlNPTi5wYXJzZShjb250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlcnZlckFwcEluZm9Db250ZW50ID0gdGFiO1xyXG4gICAgfVxyXG5cclxufSJdfQ==