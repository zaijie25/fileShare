"use strict";
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