"use strict";
cc._RF.push(module, '5620aE6k3RLoq8RGkzoRUpd', 'FeedbackServiceItem');
// hall/scripts/logic/hall/ui/Feedback/FeedbackServiceItem.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServicerModel_1 = require("../../../hallcommon/model/ServicerModel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FeedbackServiceItem = /** @class */ (function (_super) {
    __extends(FeedbackServiceItem, _super);
    function FeedbackServiceItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spriteList = [];
        _this.stringList = [];
        _this.iconSprite = null;
        _this.iconName = null;
        _this.servicerName = null;
        _this.data = null;
        return _this;
    }
    FeedbackServiceItem.prototype.refreshUI = function (data) {
        if (!data) {
            Logger.error("客服信息不存在");
            return;
        }
        this.data = data;
        this.iconSprite.spriteFrame = this.spriteList[data.type];
        var string = data.msg || this.stringList[data.type];
        this.iconName.string = Global.Toolkit.substrEndWithElli(string, 8);
        this.servicerName.string = Global.Toolkit.substrEndWithElli(data.data, 10);
    };
    FeedbackServiceItem.prototype.awakeQQCallBack = function (retStr) {
        if (retStr.result == 0) {
        }
        else {
            var ret = retStr.result;
            if (ret == -1) {
                Logger.log("请先安装QQ");
                Global.UI.showSingleBox("请先安装QQ", null);
            }
            else {
                Logger.log("打开QQ失败");
                Global.UI.showSingleBox("打开QQ失败", null);
            }
        }
    };
    FeedbackServiceItem.prototype.awakeWeChatCallBack = function (retStr) {
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
    FeedbackServiceItem.prototype.copyTextToClipboardCallBack = function (retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
            if (this.data.type == ServicerModel_1.PopItemType.QQ) {
                Global.NativeEvent.awakeQQApp(this.awakeQQCallBack.bind(this));
            }
            else if (this.data.type == ServicerModel_1.PopItemType.WX || this.data.type == ServicerModel_1.PopItemType.WXPUBLIC) {
                Global.NativeEvent.awakeWechatApp(this.awakeWeChatCallBack.bind(this));
            }
        }
        else {
            Global.UI.fastTip("复制失败");
        }
    };
    //复制并前往
    FeedbackServiceItem.prototype.ServicerBtnFunc = function (event, customEventData) {
        switch (this.data.type) {
            case ServicerModel_1.PopItemType.QQ:
            case ServicerModel_1.PopItemType.WX:
            case ServicerModel_1.PopItemType.WXPUBLIC:
                Global.NativeEvent.copyTextToClipboard(this.data.data, this.copyTextToClipboardCallBack.bind(this));
                break;
            case ServicerModel_1.PopItemType.Link:
            case ServicerModel_1.PopItemType.AtLink:
                cc.sys.openURL(Global.Toolkit.DealWithUrl(this.data.data));
                break;
            case ServicerModel_1.PopItemType.AtWnd:
                Global.ChatServer.serverType = ServicerModel_1.CustomerEntranceType.HallService;
                Global.ChatServer.userSetting(null, this.data.data);
                break;
            default:
                break;
        }
    };
    __decorate([
        property([cc.SpriteFrame])
    ], FeedbackServiceItem.prototype, "spriteList", void 0);
    __decorate([
        property([cc.String])
    ], FeedbackServiceItem.prototype, "stringList", void 0);
    __decorate([
        property(cc.Sprite)
    ], FeedbackServiceItem.prototype, "iconSprite", void 0);
    __decorate([
        property(cc.Label)
    ], FeedbackServiceItem.prototype, "iconName", void 0);
    __decorate([
        property(cc.Label)
    ], FeedbackServiceItem.prototype, "servicerName", void 0);
    FeedbackServiceItem = __decorate([
        ccclass
    ], FeedbackServiceItem);
    return FeedbackServiceItem;
}(cc.Component));
exports.default = FeedbackServiceItem;

cc._RF.pop();