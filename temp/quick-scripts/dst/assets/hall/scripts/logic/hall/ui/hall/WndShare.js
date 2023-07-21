
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/WndShare.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0aefakj36dF56Ap9UbJ1/wH', 'WndShare');
// hall/scripts/logic/hall/ui/hall/WndShare.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var HallPopMsgHelper_1 = require("../../tool/HallPopMsgHelper");
var ActivityConstants_1 = require("../Activity/ActivityConstants");
var WndShare = /** @class */ (function (_super) {
    __extends(WndShare, _super);
    function WndShare() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shortUrl = "";
        return _this;
    }
    WndShare.prototype.onInit = function () {
        this.name = "WndShare";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/Share";
        this.destoryType = WndBase_1.DestoryType.None;
        this.shareData = Global.ModelManager.getModel("ShareModel");
    };
    WndShare.prototype.initView = function () {
        var _this = this;
        this.shareMoney = this.node.getChildByName("money").getComponent(cc.Label);
        this.shareMoney.string = this.shareData.ShareMoney.toString();
        this.addCommonClick('wx', this.ShareWX, this);
        this.addCommonClick('pyq', this.SharePYQ, this);
        this.addCommonClick('close', this.close, this);
        var shareUrl = Global.Setting.Urls.inviteUrl;
        var param = {
            "url": shareUrl,
        };
        Global.HallServer.send(NetAppface.mod, "GetUserShareUrl", param, function (data) {
            Logger.log(data);
            _this.shortUrl = data.url;
        }, null, true, 30);
    };
    WndShare.prototype.ShareWX = function () {
        var _this = this;
        Global.NativeEvent.checkWXInstall(function (result) {
            if (result.result == 0) {
                Global.NativeEvent.shareWX(0, 5, Global.Setting.wxFirendShareTitle, "", _this.shortUrl, Global.Setting.wxMomentShareContent, _this.shareCallBack.bind(_this));
            }
            else {
                Global.UI.fastTip("请安装微信");
            }
        });
    };
    WndShare.prototype.shareCallBack = function (result) {
        var Tf = 0;
        var num = Number(result.result);
        if (num === 0) {
            var param = {
                "ptype": 1,
            };
            Global.HallServer.send(NetAppface.mod, "ShareGetPoint", param, function (data) {
                Tf = data.point;
                if (Tf !== 0) {
                    // Tf = Tf / Global.Setting.glodRatio;
                    Global.UI.show("WndRebateGet", Tf, HallPopMsgHelper_1.BindAwardUIType.share);
                    Global.HallServer.send(NetAppface.mod, NetAppface.GetUserPoint, {});
                }
                else {
                    Global.UI.fastTip("分享成功");
                }
            }, null, true, 0);
        }
        else {
            Global.UI.fastTip("分享失败");
        }
    };
    WndShare.prototype.SharePYQ = function () {
        var _this = this;
        Global.NativeEvent.checkWXInstall(function (result) {
            if (result.result == 0) {
                Global.NativeEvent.shareWX(1, 5, Global.Setting.wxMomentShareTitle, "", _this.shortUrl, Global.Setting.wxMomentShareContent, _this.shareCallBack.bind(_this));
            }
            else {
                Global.UI.fastTip("请安装微信");
            }
        });
    };
    WndShare.prototype.onClose = function () {
        HallPopMsgHelper_1.default.Instance.releaseLock(ActivityConstants_1.ActivityType.shareActivity);
    };
    return WndShare;
}(WndBase_1.default));
exports.default = WndShare;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFxXbmRTaGFyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxvREFBZ0U7QUFHaEUsZ0VBQWdGO0FBQ2hGLG1FQUE2RDtBQUU3RDtJQUFzQyw0QkFBTztJQUE3QztRQUFBLHFFQTJGQztRQXZGVyxjQUFRLEdBQUcsRUFBRSxDQUFDOztJQXVGMUIsQ0FBQztJQXRGYSx5QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7UUFDdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBVyxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFlLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQzNFLENBQUM7SUFFRCwyQkFBUSxHQUFSO1FBQUEsaUJBY0M7UUFiRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDMUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUM3QyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQy9DLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElB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LEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUE7YUFDckM7aUJBQ0k7Z0JBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDOUI7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFRCwwQkFBTyxHQUFQO1FBRUksMEJBQWdCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxnQ0FBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0EzRkEsQUEyRkMsQ0EzRnFDLGlCQUFPLEdBMkY1QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgV25kQmFzZSwgeyBEZXN0b3J5VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IEFwcEhlbHBlciBmcm9tIFwiLi4vLi4vLi4vY29yZS90b29sL0FwcEhlbHBlclwiO1xyXG5pbXBvcnQgU2hhcmVNb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9TaGFyZU1vZGVsXCI7XHJcbmltcG9ydCBIYWxsUG9wTXNnSGVscGVyLCB7IEJpbmRBd2FyZFVJVHlwZSB9IGZyb20gXCIuLi8uLi90b29sL0hhbGxQb3BNc2dIZWxwZXJcIjtcclxuaW1wb3J0IHsgQWN0aXZpdHlUeXBlIH0gZnJvbSBcIi4uL0FjdGl2aXR5L0FjdGl2aXR5Q29uc3RhbnRzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRTaGFyZSBleHRlbmRzIFduZEJhc2Uge1xyXG4gICAgcHJpdmF0ZSBzaGFyZU1vbmV5OiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgc2hhcmVEYXRhO1xyXG5cclxuICAgIHByaXZhdGUgc2hvcnRVcmwgPSBcIlwiO1xyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZFNoYXJlXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IFwiUG9wTGF5ZXJcIjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9TaGFyZVwiO1xyXG4gICAgICAgIHRoaXMuZGVzdG9yeVR5cGUgPSBEZXN0b3J5VHlwZS5Ob25lO1xyXG4gICAgICAgIHRoaXMuc2hhcmVEYXRhID0gPFNoYXJlTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlNoYXJlTW9kZWxcIilcclxuICAgIH1cclxuXHJcbiAgICBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLnNoYXJlTW9uZXkgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtb25leVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5zaGFyZU1vbmV5LnN0cmluZyA9IHRoaXMuc2hhcmVEYXRhLlNoYXJlTW9uZXkudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKCd3eCcsIHRoaXMuU2hhcmVXWCwgdGhpcylcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKCdweXEnLCB0aGlzLlNoYXJlUFlRLCB0aGlzKVxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soJ2Nsb3NlJywgdGhpcy5jbG9zZSwgdGhpcylcclxuICAgICAgICBsZXQgc2hhcmVVcmwgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmludml0ZVVybDtcclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIFwidXJsXCI6IHNoYXJlVXJsLFxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBcIkdldFVzZXJTaGFyZVVybFwiLCBwYXJhbSwgKGRhdGEpPT57XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvcnRVcmwgPSBkYXRhLnVybDtcclxuICAgICAgICB9LCBudWxsLCB0cnVlLCAzMCk7XHJcbiAgICB9XHJcblxyXG4gICAgU2hhcmVXWCgpIHtcclxuICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuY2hlY2tXWEluc3RhbGwoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuc2hhcmVXWCgwLCA1LFxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnd4RmlyZW5kU2hhcmVUaXRsZSxcclxuICAgICAgICAgICAgICAgICAgICBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvcnRVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcud3hNb21lbnRTaGFyZUNvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFyZUNhbGxCYWNrLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+WuieijheW+ruS/oVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaGFyZUNhbGxCYWNrKHJlc3VsdCkge1xyXG4gICAgICAgIGxldCBUZiA9IDA7XHJcbiAgICAgICAgbGV0IG51bSA9IE51bWJlcihyZXN1bHQucmVzdWx0KVxyXG4gICAgICAgIGlmIChudW0gPT09IDApIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgXCJwdHlwZVwiOiAxLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIFwiU2hhcmVHZXRQb2ludFwiLCBwYXJhbSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIFRmID0gZGF0YS5wb2ludDtcclxuICAgICAgICAgICAgICAgIGlmIChUZiAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRmID0gVGYgLyBHbG9iYWwuU2V0dGluZy5nbG9kUmF0aW87XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRSZWJhdGVHZXRcIiwgVGYsQmluZEF3YXJkVUlUeXBlLnNoYXJlKVxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuR2V0VXNlclBvaW50LCB7fSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWIhuS6q+aIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgbnVsbCwgdHJ1ZSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWIhuS6q+Wksei0pVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgU2hhcmVQWVEoKSB7XHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNoZWNrV1hJbnN0YWxsKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LnNoYXJlV1goMSwgNSxcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuU2V0dGluZy53eE1vbWVudFNoYXJlVGl0bGUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3J0VXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnd4TW9tZW50U2hhcmVDb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVDYWxsQmFjay5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLor7flronoo4Xlvq7kv6FcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UucmVsZWFzZUxvY2soQWN0aXZpdHlUeXBlLnNoYXJlQWN0aXZpdHkpO1xyXG4gICAgfVxyXG59Il19