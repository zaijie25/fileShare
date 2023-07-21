
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/WndWeChatRechange.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcV25kV2VDaGF0UmVjaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWdFO0FBRWhFO0lBQStDLHFDQUFPO0lBQXREOztJQWtFQSxDQUFDO0lBL0RhLGtDQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsMkNBQTJDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBVyxDQUFDLElBQUksQ0FBQztJQUN4QyxDQUFDO0lBQ1Msb0NBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDbEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENB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QUFHLE1BQU0sQ0FBQztZQUMvRCxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUE7WUFDRixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNoQzthQUFJO1lBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDakM7SUFFTCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQWxFQSxBQWtFQyxDQWxFOEMsaUJBQU8sR0FrRXJEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UsIHsgRGVzdG9yeVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRXZUNoYXRSZWNoYW5nZSBleHRlbmRzIFduZEJhc2Uge1xyXG4gICAgcHJpdmF0ZSBjb2RlU3ByaXRlOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIHFyQ29kZVVSbDtcclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRXZUNoYXRSZWNoYW5nZVwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvUmVjaGFyZ2UvV2VDaGF0UmVjaGFuZ2VVSVwiO1xyXG4gICAgICAgIHRoaXMuZGVzdG9yeVR5cGUgPSBEZXN0b3J5VHlwZS5Ob25lO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMubm9kZS53aWR0aCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLndpZHRoO1xyXG4gICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5jb2RlU3ByaXRlID0gdGhpcy5nZXRDaGlsZChcImJhbmtOb2RlL3FyQ29kZVNwcml0ZVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiaGVhZE5vZGUvYnRuQmFja1wiLCB0aGlzLmdvQmFjaywgdGhpcyxjYy5CdXR0b24uVHJhbnNpdGlvbi5OT05FKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiaGVhZE5vZGUvaGVscE5vZGVcIiwgdGhpcy5nb0JhY2ssIHRoaXMsY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJhbmtOb2RlL2NvcHlOb2RlXCIsIHRoaXMuc2F2ZVFSQ29kZSwgdGhpcyxjYy5CdXR0b24uVHJhbnNpdGlvbi5OT05FKTsvL+S/neWtmOS6jOe7tOeggVxyXG4gICAgfVxyXG4gICAgb25PcGVuKCl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5hcmdzWzBdO1xyXG4gICAgICAgIHRoaXMucXJDb2RlVVJsID0gZGF0YS51cmw7XHJcbiAgICAgICAgdGhpcy5jb2RlU3ByaXRlLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICBpZiAoQ0NfSlNCKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TSE9XX05FVF9XQUlUSU5HLCB0cnVlKVxyXG4gICAgICAgICAgICBHbG9iYWwuVG9vbGtpdC5Mb2FkUGljVG9OYXRpdmUoR2xvYmFsLlRvb2xraXQuRGVhbFdpdGhVcmwodGhpcy5xckNvZGVVUmwpLCBHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybCh0aGlzLnFyQ29kZVVSbCksICh0ZXh0dXJlOmNjLlRleHR1cmUyRCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5ub2RlICYmIHNlbGYubm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvZGVTcHJpdGUuc2l6ZU1vZGUgPSAgY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29kZVNwcml0ZS5zcHJpdGVGcmFtZSA9IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkhJREVfTkVUX1dBSVRJTkcsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNIT1dfTkVUX1dBSVRJTkcsIHRydWUpXHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKHRoaXMucXJDb2RlVVJsLCBmdW5jdGlvbiAoZXJyLCB0ZXh0dXJlOmNjLlRleHR1cmUyRCkge1xyXG4gICAgICAgICAgICAgICAgaWYoc2VsZi5ub2RlICYmIHNlbGYubm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvZGVTcHJpdGUuc2l6ZU1vZGUgPSAgY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29kZVNwcml0ZS5zcHJpdGVGcmFtZSA9IGZyYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNIT1dfTkVUX1dBSVRJTkcsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuICAgIC8v5L+d5a2Y5LqM57u056CBXHJcbiAgICBwcml2YXRlIHNhdmVRUkNvZGUoKSB7XHJcbiAgICAgICAgaWYgKCFDQ19KU0IpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnFyQ29kZVVSbCAmJiB0aGlzLmNvZGVTcHJpdGUuc3ByaXRlRnJhbWUgIT1udWxsKXtcclxuICAgICAgICAgICAgbGV0IG5hbWUgPSBHbG9iYWwuVG9vbGtpdC5tZDUodGhpcy5xckNvZGVVUmwpXHJcbiAgICAgICAgICAgIGxldCBmaWxlUGF0aCA9IGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCkgKyBuYW1lICsgJy5qcGcnO1xyXG4gICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuc2F2ZVRvQWxidW0oZmlsZVBhdGgsKCkgPT4ge1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuS/neWtmOS6jOe7tOeggeaIkOWKn1wiKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLkuoznu7TnoIHmnKrliqDovb3lrozmiJBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgIH1cclxufSJdfQ==