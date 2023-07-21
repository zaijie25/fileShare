"use strict";
cc._RF.push(module, 'ccb37MynCxC4LhsyfIFkwhE', 'WndWeChatRechange');
// hall/scripts/logic/hall/ui/recharge/WndWeChatRechange.ts

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
var WndWeChatRechange = /** @class */ (function (_super) {
    __extends(WndWeChatRechange, _super);
    function WndWeChatRechange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndWeChatRechange.prototype.onInit = function () {
        this.name = "WndWeChatRechange";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/WeChatRechangeUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndWeChatRechange.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.codeSprite = this.getChild("bankNode/qrCodeSprite").getComponent(cc.Sprite);
        this.addCommonClick("headNode/btnBack", this.goBack, this, cc.Button.Transition.NONE);
        this.addCommonClick("headNode/helpNode", this.goBack, this, cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/copyNode", this.saveQRCode, this, cc.Button.Transition.NONE); //保存二维码
    };
    WndWeChatRechange.prototype.onOpen = function () {
        var self = this;
        var data = this.args[0];
        this.qrCodeURl = data.url;
        this.codeSprite.spriteFrame = null;
        if (CC_JSB) {
            Global.Event.event(GlobalEvent.SHOW_NET_WAITING, true);
            Global.Toolkit.LoadPicToNative(Global.Toolkit.DealWithUrl(this.qrCodeURl), Global.Toolkit.DealWithUrl(this.qrCodeURl), function (texture) {
                if (self.node && self.node.isValid) {
                    var frame = new cc.SpriteFrame(texture);
                    self.codeSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                    self.codeSprite.spriteFrame = frame;
                    Global.Event.event(GlobalEvent.HIDE_NET_WAITING, false);
                }
            });
        }
        else {
            Global.Event.event(GlobalEvent.SHOW_NET_WAITING, true);
            cc.loader.load(this.qrCodeURl, function (err, texture) {
                if (self.node && self.node.isValid) {
                    var frame = new cc.SpriteFrame(texture);
                    self.codeSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                    self.codeSprite.spriteFrame = frame;
                    Global.Event.event(GlobalEvent.SHOW_NET_WAITING, false);
                }
            });
        }
    };
    WndWeChatRechange.prototype.goBack = function () {
        this.close();
    };
    //保存二维码
    WndWeChatRechange.prototype.saveQRCode = function () {
        if (!CC_JSB) {
            return;
        }
        if (this.qrCodeURl && this.codeSprite.spriteFrame != null) {
            var name = Global.Toolkit.md5(this.qrCodeURl);
            var filePath = jsb.fileUtils.getWritablePath() + name + '.jpg';
            Global.NativeEvent.saveToAlbum(filePath, function () {
            });
            Global.UI.fastTip("保存二维码成功");
        }
        else {
            Global.UI.fastTip("二维码未加载完成");
        }
    };
    return WndWeChatRechange;
}(WndBase_1.default));
exports.default = WndWeChatRechange;

cc._RF.pop();