"use strict";
cc._RF.push(module, '09384wBfItBP4elok4GB1xQ', 'ServicerItem');
// hall/scripts/logic/hall/ui/serviver/ServicerItem.ts

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
var FeedbackConstants_1 = require("../Feedback/FeedbackConstants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ServicerItem = /** @class */ (function (_super) {
    __extends(ServicerItem, _super);
    function ServicerItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spriteList = [];
        _this.stringList = [];
        _this.iconSprite = null;
        _this.iconName = null;
        _this.servicerName = null;
        _this.btnSpriteList = [];
        _this.data = null;
        // private btn_Label: cc.Label;
        _this.isOnlineServicer = false;
        _this.isAtServicer = false;
        _this.server = null;
        _this.order = -1;
        return _this;
    }
    ServicerItem.prototype.reset = function () {
    };
    ServicerItem.prototype.onLoad = function () {
        if (this.stringList.length == 1) {
            // this.btn_Label = cc.find("ServicerBtn/Label",this.node).getComponent(cc.Label);
        }
        else {
            var richTextNode = cc.find("ServicerBtn/RichText", this.node);
            if (richTextNode) {
                this.btn_RichText = richTextNode.getComponent(cc.RichText);
            }
            if (this.btnSpriteList.length == 2) {
                this.btnSprite = cc.find("ServicerBtn/btnSprite", this.node).getComponent(cc.Sprite);
            }
        }
    };
    ServicerItem.prototype.setData2 = function (index, data) {
        this.server = data;
        this.order = index;
        this.setData(data.initServicerData()[index]);
    };
    /**
     *
     * @param data AppId int32  `json:"app_id"`
            Type  int32  `json:"type"` //1qq 2微信
            Info  string `json:"info"`
     */
    ServicerItem.prototype.setData = function (data) {
        if (data.type <= 0 || data.type > 5) {
            this.node.active = false;
            return;
        }
        this.data = data;
        this.node.active = true;
        if (this.spriteList.length == 1) {
            this.iconSprite.spriteFrame = this.spriteList[0];
        }
        else {
            this.iconSprite.spriteFrame = this.spriteList[data.type - 1];
        }
        if (this.stringList.length == 1) {
            if (data.name) {
                this.iconName.string = data.name;
            }
            else {
                this.iconName.string = this.stringList[0];
            }
        }
        else {
            if (data.name) {
                this.iconName.string = data.name;
            }
            else {
                this.iconName.string = this.stringList[data.type - 1] || "";
            }
        }
        if (data.info != null && data.info != undefined) {
            this.servicerName.node.active = true;
            this.servicerName.string = Global.Toolkit.substrEndWithElli(data.info, 12);
        }
        if (data.type == 5) {
            if (this.stringList.length == 1) {
                // this.btn_Label.string = "联系客服";
            }
            else {
                if (this.btn_RichText)
                    this.btn_RichText.string = "立即联系";
                if (this.btnSpriteList && this.btnSpriteList.length == 2) {
                    this.btnSprite.spriteFrame = this.btnSpriteList[1];
                }
            }
            this.isOnlineServicer = true;
            this.isAtServicer = false;
        }
        else {
            if (data.type == 4) {
                this.isAtServicer = true;
            }
            else {
                this.isAtServicer = false;
            }
            if (this.stringList.length == 1) {
                // this.btn_Label.string = "联系客服";
            }
            else {
                if (this.btn_RichText)
                    this.btn_RichText.string = "立即联系";
                if (this.btnSpriteList && this.btnSpriteList.length == 2) {
                    this.btnSprite.spriteFrame = this.btnSpriteList[1];
                }
            }
            this.isOnlineServicer = false;
        }
    };
    ServicerItem.prototype.awakeQQCallBack = function (retStr) {
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
    ServicerItem.prototype.awakeWeChatCallBack = function (retStr) {
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
    ServicerItem.prototype.copyTextToClipboardCallBack = function (retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
            if (this.data.type == ServicerModel_1.PopItemType.QQ) {
                Global.NativeEvent.awakeQQApp(this.awakeQQCallBack.bind(this));
            }
            else if (this.data.type == ServicerModel_1.PopItemType.WX || this.data.type == ServicerModel_1.PopItemType.WX) {
                Global.NativeEvent.awakeWechatApp(this.awakeWeChatCallBack.bind(this));
            }
        }
        else {
            Global.UI.fastTip("复制失败");
        }
    };
    //复制并前往
    ServicerItem.prototype.ServicerBtnFunc = function (event, customEventData) {
        if (this.server != null) {
            if (this.isOnlineServicer) {
                var rightPanelView = Global.UI.getWindow("WndFeedback").getView("RightPanelView");
                rightPanelView.changeView(FeedbackConstants_1.RightViewType.feedback2);
                var feedback2 = rightPanelView.getView("feedback2");
                feedback2.server = this.server;
                feedback2.order = this.order;
            }
            else {
                this.server.acceptService(this.order);
            }
            return;
        }
        if (this.isOnlineServicer) {
            cc.sys.openURL(Global.Toolkit.DealWithUrl(this.data.info));
        }
        else {
            if (this.isAtServicer) {
                Global.ChatServer.serverType = ServicerModel_1.CustomerEntranceType.HallService;
                if (customEventData && customEventData == "proxy" && !this.data.pop) {
                    Global.ChatServer.userSetting(null, this.data.aite_url);
                    return;
                }
                Global.ChatServer.userSetting(null, this.data.info);
                return;
            }
            Global.NativeEvent.copyTextToClipboard(this.data.info, this.copyTextToClipboardCallBack.bind(this));
        }
    };
    __decorate([
        property([cc.SpriteFrame])
    ], ServicerItem.prototype, "spriteList", void 0);
    __decorate([
        property([cc.String])
    ], ServicerItem.prototype, "stringList", void 0);
    __decorate([
        property(cc.Sprite)
    ], ServicerItem.prototype, "iconSprite", void 0);
    __decorate([
        property(cc.Label)
    ], ServicerItem.prototype, "iconName", void 0);
    __decorate([
        property(cc.Label)
    ], ServicerItem.prototype, "servicerName", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ServicerItem.prototype, "btnSpriteList", void 0);
    ServicerItem = __decorate([
        ccclass
    ], ServicerItem);
    return ServicerItem;
}(cc.Component));
exports.default = ServicerItem;

cc._RF.pop();