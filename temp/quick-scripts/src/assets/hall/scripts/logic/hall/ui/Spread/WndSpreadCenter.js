"use strict";
cc._RF.push(module, 'dcc17w9R55ByZr/aWhK+qQz', 'WndSpreadCenter');
// hall/scripts/logic/hall/ui/Spread/WndSpreadCenter.ts

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
var AppHelper_1 = require("../../../core/tool/AppHelper");
var WndSpreadCenter = /** @class */ (function (_super) {
    __extends(WndSpreadCenter, _super);
    function WndSpreadCenter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndSpreadCenter.prototype.onInit = function () {
        this.name = "WndSpreadCenter";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/SpreedCenterUI";
    };
    WndSpreadCenter.prototype.initView = function () {
        this.qrNode = this.getChild("qrNode");
        this.addCommonClick("close", this.close, this);
        var config = Global.customApp.getAppConfig();
        if (config && config.qrcodePos) {
            this.qrNode.setPosition(cc.v2(config.qrcodePos[0], config.qrcodePos[1]));
        }
        else if (config && config.qrcodeX) {
            this.qrNode.x = config.qrcodeX;
        }
        this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
        var widget = this.getComponent("close", cc.Widget);
        if (widget != null) {
            widget.target = cc.Canvas.instance.node;
        }
        //this.tipsLabel = this.getComponent("tips", cc.Label);
        //this.tipsLabel.string = "申请成为平台合伙人\n联系微信" + Global.Setting.spreadWx;
        //this.wxNode.active = AppHelper.enableWxShare;
        //this.momentNode.active = AppHelper.enableWxShare;
    };
    WndSpreadCenter.prototype.onOpen = function (args) {
        var url = Global.Setting.Urls.inviteUrl;
        url = this.SpreadModel.Url || url;
        Global.Toolkit.initQRCode(this.qrNode, url, 5);
    };
    WndSpreadCenter.prototype.onClose = function () {
    };
    WndSpreadCenter.prototype.onServiceClick = function () {
        Global.NativeEvent.copyTextToClipboard(Global.Setting.spreadWx, this.copyTextToClipboardCallBack.bind(this));
    };
    WndSpreadCenter.prototype.copyTextToClipboardCallBack = function (retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
            Global.NativeEvent.awakeWechatApp(this.awakeWeChatCallBack.bind(this));
        }
        else {
            Global.UI.fastTip("复制失败");
        }
    };
    WndSpreadCenter.prototype.awakeWeChatCallBack = function (retStr) {
        if (retStr.result == 0) {
        }
        else {
            var ret = retStr.result;
            if (ret == -1) {
                Logger.log("请先安装微信");
                Global.UI.showSingleBox("请先安装微信", null);
            }
            else {
                Logger.log("打开微信失败");
                Global.UI.showSingleBox("打开微信失败", null);
            }
        }
    };
    WndSpreadCenter.prototype.onWxFriendClick = function () {
        this.wxShare(0, Global.Setting.wxFirendShareTitle, Global.Setting.wxFirendShareContent);
    };
    WndSpreadCenter.prototype.onMomentClick = function () {
        this.wxShare(1, Global.Setting.wxMomentShareTitle, Global.Setting.wxMomentShareContent);
    };
    WndSpreadCenter.prototype.wxShare = function (type, title, content) {
        if (!AppHelper_1.default.enableWxShare)
            return;
        // if(!AppHelper.getAppWXShareEnable())
        //     return;
        var shareUrl = Global.Setting.Urls.inviteUrl;
        shareUrl = this.SpreadModel.Url || shareUrl;
        Global.NativeEvent.checkWXInstall(function (result) {
            if (result.result == 0) {
                Global.NativeEvent.shareWX(type, 5, title, Global.Setting.wxIconUrl, shareUrl, content, null);
            }
            else {
                Global.UI.fastTip("请安装微信");
            }
        });
    };
    return WndSpreadCenter;
}(WndBase_1.default));
exports.default = WndSpreadCenter;

cc._RF.pop();