
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/WndSpreadCenter.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXFduZFNwcmVhZENlbnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBK0M7QUFDL0MsMERBQXFEO0FBTXJEO0lBQTZDLG1DQUFPO0lBQXBEOztJQXVIQSxDQUFDO0lBbkhhLGdDQUFNLEdBQWhCO1FBRUksSUFBSSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsZ0NBQWdDLENBQUM7SUFDcEQsQ0FBQztJQUVTLGtDQUFRLEdBQWxCO1FBRUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFL0MsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFDO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzRTthQUNJLElBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQTtTQUNqQztRQUVELElBQUksQ0FBQyxXQUFXLEdBQWdCLE1BQU0sQ0FBQyxZQUFZLENB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LFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUE7UUFFM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsVUFBQyxNQUFNO1lBRXJDLElBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQ3JCO2dCQUNJLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQzlCLEtBQUssRUFDTCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFDeEIsUUFBUSxFQUNSLE9BQU8sRUFDUCxJQUFJLENBQUMsQ0FBQTthQUNaO2lCQUVEO2dCQUNJLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlCO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUwsc0JBQUM7QUFBRCxDQXZIQSxBQXVIQyxDQXZINEMsaUJBQU8sR0F1SG5EIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5pbXBvcnQgQXBwSGVscGVyIGZyb20gXCIuLi8uLi8uLi9jb3JlL3Rvb2wvQXBwSGVscGVyXCI7XHJcbmltcG9ydCBTcHJlYWRNb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9TcHJlYWRNb2RlbFwiO1xyXG5pbXBvcnQgeyBTcHJlYWRFdmVudCB9IGZyb20gXCIuL1NwcmVhZEV2ZW50XCI7XHJcbmltcG9ydCBDdXN0b21BcHBJbmZvIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL2FwcC9DdXN0b21BcHBcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRTcHJlYWRDZW50ZXIgZXh0ZW5kcyBXbmRCYXNlXHJcbntcclxuICAgIHByaXZhdGUgcXJOb2RlOmNjLk5vZGU7XHJcbiAgICBTcHJlYWRNb2RlbDogU3ByZWFkTW9kZWw7XHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkgXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRTcHJlYWRDZW50ZXJcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlBvcExheWVyO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1NwcmVlZENlbnRlclVJXCI7XHJcbiAgICB9IFxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5xck5vZGUgPSB0aGlzLmdldENoaWxkKFwicXJOb2RlXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjbG9zZVwiLCB0aGlzLmNsb3NlLCB0aGlzKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IEdsb2JhbC5jdXN0b21BcHAuZ2V0QXBwQ29uZmlnKClcclxuICAgICAgICBpZiAoY29uZmlnICYmIGNvbmZpZy5xcmNvZGVQb3Mpe1xyXG4gICAgICAgICAgICB0aGlzLnFyTm9kZS5zZXRQb3NpdGlvbihjYy52Mihjb25maWcucXJjb2RlUG9zWzBdLGNvbmZpZy5xcmNvZGVQb3NbMV0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihjb25maWcgJiYgY29uZmlnLnFyY29kZVgpe1xyXG4gICAgICAgICAgICB0aGlzLnFyTm9kZS54ID0gY29uZmlnLnFyY29kZVhcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5TcHJlYWRNb2RlbCA9IDxTcHJlYWRNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiU3ByZWFkTW9kZWxcIik7XHJcbiAgICAgICAgbGV0IHdpZGdldDpjYy5XaWRnZXQgPSB0aGlzLmdldENvbXBvbmVudChcImNsb3NlXCIsIGNjLldpZGdldClcclxuICAgICAgICBpZih3aWRnZXQgIT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHdpZGdldC50YXJnZXQgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vdGhpcy50aXBzTGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcInRpcHNcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIC8vdGhpcy50aXBzTGFiZWwuc3RyaW5nID0gXCLnlLPor7fmiJDkuLrlubPlj7DlkIjkvJnkurpcXG7ogZTns7vlvq7kv6FcIiArIEdsb2JhbC5TZXR0aW5nLnNwcmVhZFd4O1xyXG5cclxuICAgICAgICAvL3RoaXMud3hOb2RlLmFjdGl2ZSA9IEFwcEhlbHBlci5lbmFibGVXeFNoYXJlO1xyXG4gICAgICAgIC8vdGhpcy5tb21lbnROb2RlLmFjdGl2ZSA9IEFwcEhlbHBlci5lbmFibGVXeFNoYXJlO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uT3BlbihhcmdzKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCB1cmwgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmludml0ZVVybDtcclxuICAgICAgICB1cmwgPSB0aGlzLlNwcmVhZE1vZGVsLlVybCB8fCB1cmxcclxuICAgICAgICBHbG9iYWwuVG9vbGtpdC5pbml0UVJDb2RlKHRoaXMucXJOb2RlLCB1cmwsIDUpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgb25DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNlcnZpY2VDbGljaygpXHJcbiAgICB7XHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNvcHlUZXh0VG9DbGlwYm9hcmQoR2xvYmFsLlNldHRpbmcuc3ByZWFkV3gsIHRoaXMuY29weVRleHRUb0NsaXBib2FyZENhbGxCYWNrLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29weVRleHRUb0NsaXBib2FyZENhbGxCYWNrKHJldFN0cil7XHJcbiAgICAgICAgaWYgKHJldFN0ci5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWkjeWItuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5hd2FrZVdlY2hhdEFwcCh0aGlzLmF3YWtlV2VDaGF0Q2FsbEJhY2suYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWkjeWItuWksei0pVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgYXdha2VXZUNoYXRDYWxsQmFjayhyZXRTdHIpe1xyXG4gICAgICAgIGlmIChyZXRTdHIucmVzdWx0ID09IDApIHtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmV0ID0gcmV0U3RyLnJlc3VsdFxyXG4gICAgICAgICAgICBpZiAocmV0ID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi6K+35YWI5a6J6KOF5b6u5L+hXCIpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLor7flhYjlronoo4Xlvq7kv6FcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi5omT5byA5b6u5L+h5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLmiZPlvIDlvq7kv6HlpLHotKVcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbld4RnJpZW5kQ2xpY2soKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMud3hTaGFyZSgwLCBHbG9iYWwuU2V0dGluZy53eEZpcmVuZFNoYXJlVGl0bGUsIEdsb2JhbC5TZXR0aW5nLnd4RmlyZW5kU2hhcmVDb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTW9tZW50Q2xpY2soKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMud3hTaGFyZSgxLCBHbG9iYWwuU2V0dGluZy53eE1vbWVudFNoYXJlVGl0bGUsIEdsb2JhbC5TZXR0aW5nLnd4TW9tZW50U2hhcmVDb250ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHd4U2hhcmUodHlwZSwgdGl0bGUsIGNvbnRlbnQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIUFwcEhlbHBlci5lbmFibGVXeFNoYXJlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gaWYoIUFwcEhlbHBlci5nZXRBcHBXWFNoYXJlRW5hYmxlKCkpXHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICBsZXQgc2hhcmVVcmwgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmludml0ZVVybDtcclxuICAgICAgICBzaGFyZVVybCA9IHRoaXMuU3ByZWFkTW9kZWwuVXJsIHx8IHNoYXJlVXJsXHJcbiAgICAgICBcclxuICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuY2hlY2tXWEluc3RhbGwoKHJlc3VsdCk9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYocmVzdWx0LnJlc3VsdCA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuc2hhcmVXWCh0eXBlLCA1LCBcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuU2V0dGluZy53eEljb25VcmwsIFxyXG4gICAgICAgICAgICAgICAgICAgIHNoYXJlVXJsLCBcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LCBcclxuICAgICAgICAgICAgICAgICAgICBudWxsKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLor7flronoo4Xlvq7kv6FcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxufSJdfQ==