"use strict";
cc._RF.push(module, '7f556HysPhGY7Uf1WnF52DM', 'WndChatImage');
// hall/scripts/logic/hall/ui/recharge/WndChatImage.ts

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
var WndChatImage = /** @class */ (function (_super) {
    __extends(WndChatImage, _super);
    function WndChatImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndChatImage.prototype.onInit = function () {
        this.name = "WndChatImage";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/ChatImage";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndChatImage.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.imageNode = this.getChild("imageNode").getComponent(cc.Sprite);
        // this.bgNode.node.active = false;
        this.imageNode.spriteFrame = null;
        this.addCommonClick("btnBack", this.goBack, this);
    };
    WndChatImage.prototype.onOpen = function () {
        var _this = this;
        var data = this.args[0];
        // console.log("URL= ",data.url);
        this.imageNode.spriteFrame = null;
        this.loadSeverHeader(data.url, function (frame) {
            _this.imageNode.spriteFrame = frame;
            _this.imageNode.node.width = _this.node.width;
            _this.imageNode.node.height = (_this.node.width / data.imageWidth) * data.imageHeight;
        });
    };
    WndChatImage.prototype.goBack = function () {
        this.close();
    };
    WndChatImage.prototype.loadSeverHeader = function (url, callback) {
        //获取图片
        cc.loader.load({
            url: url,
            type: "jpg"
        }, function (err, texture) {
            var frame = new cc.SpriteFrame(texture);
            callback(frame);
        });
    };
    return WndChatImage;
}(WndBase_1.default));
exports.default = WndChatImage;

cc._RF.pop();