
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/serviver/ServicerItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxzZXJ2aXZlclxcU2VydmljZXJJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlFQUEyRjtBQUkzRixtRUFBOEQ7QUFJeEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFrTUM7UUEvTEcsZ0JBQVUsR0FBMkIsRUFBRSxDQUFDO1FBR3hDLGdCQUFVLEdBQWtCLEVBQUUsQ0FBQztRQUcvQixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLG1CQUFhLEdBQTJCLEVBQUUsQ0FBQztRQUVuQyxVQUFJLEdBQVMsSUFBSSxDQUFDO1FBRzFCLCtCQUErQjtRQUN2QixzQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsa0JBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsWUFBTSxHQUFpQixJQUFJLENBQUM7UUFDNUIsV0FBSyxHQUFZLENBQUMsQ0FBQyxDQUFDOztJQXVLaEMsQ0FBQztJQXJLRyw0QkFBSyxHQUFMO0lBRUEsQ0FBQztJQUNELDZCQUFNLEdBQU47UUFDSSxJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztZQUMzQixrRkFBa0Y7U0FDckY7YUFBSTtZQUNELElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzVELElBQUcsWUFBWSxFQUNmO2dCQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7YUFD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bGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q3VzdG9tZXJFbnRyYW5jZVR5cGUsIFBvcEl0ZW1UeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvU2VydmljZXJNb2RlbFwiO1xyXG5pbXBvcnQgVG9vbGtpdCBmcm9tIFwiLi4vLi4vLi4vY29yZS90b29sL1Rvb2xraXRcIjtcclxuaW1wb3J0IEFic1NlcnZpY2VyIGZyb20gXCIuLi9GZWVkYmFjay9BYnNTZXJ2aWNlclwiO1xyXG5pbXBvcnQgUmlnaHRQYW5lbFZpZXcgZnJvbSBcIi4uL0ZlZWRiYWNrL1JpZ2h0UGFuZWxWaWV3XCI7XHJcbmltcG9ydCB7IFJpZ2h0Vmlld1R5cGUgfSBmcm9tIFwiLi4vRmVlZGJhY2svRmVlZGJhY2tDb25zdGFudHNcIjtcclxuaW1wb3J0IEZlZWRiYWNrMiBmcm9tIFwiLi4vRmVlZGJhY2svRmVlZGJhY2syXCI7XHJcblxyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2aWNlckl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc3ByaXRlTGlzdCA6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3RyaW5nXSlcclxuICAgIHN0cmluZ0xpc3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgaWNvblNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBpY29uTmFtZTogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHNlcnZpY2VyTmFtZTogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgYnRuU3ByaXRlTGlzdCA6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgZGF0YSA6IGFueSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGJ0bl9SaWNoVGV4dDogY2MuUmljaFRleHQ7XHJcbiAgICBwcml2YXRlIGJ0blNwcml0ZTogY2MuU3ByaXRlO1xyXG4gICAgLy8gcHJpdmF0ZSBidG5fTGFiZWw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBpc09ubGluZVNlcnZpY2VyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGlzQXRTZXJ2aWNlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBzZXJ2ZXIgOiBBYnNTZXJ2aWNlciA9IG51bGw7XHJcbiAgICBwcml2YXRlIG9yZGVyIDogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgcmVzZXQoKXtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICAgIGlmKHRoaXMuc3RyaW5nTGlzdC5sZW5ndGggPT0gMSl7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuYnRuX0xhYmVsID0gY2MuZmluZChcIlNlcnZpY2VyQnRuL0xhYmVsXCIsdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgcmljaFRleHROb2RlID0gY2MuZmluZChcIlNlcnZpY2VyQnRuL1JpY2hUZXh0XCIsdGhpcy5ub2RlKVxyXG4gICAgICAgICAgICBpZihyaWNoVGV4dE5vZGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRuX1JpY2hUZXh0ID0gcmljaFRleHROb2RlLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuYnRuU3ByaXRlTGlzdC5sZW5ndGg9PTIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idG5TcHJpdGUgPSBjYy5maW5kKFwiU2VydmljZXJCdG4vYnRuU3ByaXRlXCIsdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXREYXRhMihpbmRleDogbnVtYmVyLGRhdGE6IEFic1NlcnZpY2VyKXtcclxuICAgICAgICB0aGlzLnNlcnZlciA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5vcmRlciA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YShkYXRhLmluaXRTZXJ2aWNlckRhdGEoKVtpbmRleF0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBBcHBJZCBpbnQzMiAgYGpzb246XCJhcHBfaWRcImBcclxuXHRcdFx0VHlwZSAgaW50MzIgIGBqc29uOlwidHlwZVwiYCAvLzFxcSAy5b6u5L+hXHJcblx0XHRcdEluZm8gIHN0cmluZyBganNvbjpcImluZm9cImBcclxuICAgICAqL1xyXG4gICAgc2V0RGF0YShkYXRhIDogYW55KXtcclxuICAgICAgICBpZihkYXRhLnR5cGUgPD0gMCB8fCBkYXRhLnR5cGUgPiA1ICl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGlmKHRoaXMuc3ByaXRlTGlzdC5sZW5ndGggPT0gMSl7XHJcbiAgICAgICAgICAgIHRoaXMuaWNvblNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuc3ByaXRlTGlzdFswXTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5pY29uU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVMaXN0W2RhdGEudHlwZSAtIDFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnN0cmluZ0xpc3QubGVuZ3RoID09IDEpe1xyXG4gICAgICAgICAgICBpZihkYXRhLm5hbWUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uTmFtZS5zdHJpbmcgPSBkYXRhLm5hbWU7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pY29uTmFtZS5zdHJpbmcgPSB0aGlzLnN0cmluZ0xpc3RbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoZGF0YS5uYW1lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbk5hbWUuc3RyaW5nID0gZGF0YS5uYW1lO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWNvbk5hbWUuc3RyaW5nID0gdGhpcy5zdHJpbmdMaXN0W2RhdGEudHlwZSAtIDFdIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEuaW5mbyE9bnVsbCYmZGF0YS5pbmZvIT11bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlck5hbWUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2VyTmFtZS5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5zdWJzdHJFbmRXaXRoRWxsaSggZGF0YS5pbmZvICwxMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRhdGEudHlwZSA9PSA1KXtcclxuICAgICAgICAgICAgaWYodGhpcy5zdHJpbmdMaXN0Lmxlbmd0aCA9PSAxKXtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuYnRuX0xhYmVsLnN0cmluZyA9IFwi6IGU57O75a6i5pyNXCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5idG5fUmljaFRleHQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5fUmljaFRleHQuc3RyaW5nID0gXCLnq4vljbPogZTns7tcIjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYnRuU3ByaXRlTGlzdCYmdGhpcy5idG5TcHJpdGVMaXN0Lmxlbmd0aD09Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5TcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmJ0blNwcml0ZUxpc3RbMV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc09ubGluZVNlcnZpY2VyID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5pc0F0U2VydmljZXIgPSBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoZGF0YS50eXBlID09IDQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0F0U2VydmljZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNBdFNlcnZpY2VyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5zdHJpbmdMaXN0Lmxlbmd0aCA9PSAxKXtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuYnRuX0xhYmVsLnN0cmluZyA9IFwi6IGU57O75a6i5pyNXCI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5idG5fUmljaFRleHQpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5fUmljaFRleHQuc3RyaW5nID0gXCLnq4vljbPogZTns7tcIjtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYnRuU3ByaXRlTGlzdCYmdGhpcy5idG5TcHJpdGVMaXN0Lmxlbmd0aD09Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5TcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmJ0blNwcml0ZUxpc3RbMV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc09ubGluZVNlcnZpY2VyID0gZmFsc2U7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBhd2FrZVFRQ2FsbEJhY2soIHJldFN0ciApe1xyXG4gICAgICAgIGlmIChyZXRTdHIucmVzdWx0ID09IDApIHtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmV0ID0gcmV0U3RyLnJlc3VsdFxyXG4gICAgICAgICAgICBpZiAocmV0ID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi6K+35YWI5a6J6KOFUVFcIik7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIuivt+WFiOWuieijhVFRXCIsIG51bGwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIuaJk+W8gFFR5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLmiZPlvIBRUeWksei0pVwiLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhd2FrZVdlQ2hhdENhbGxCYWNrKCByZXRTdHIgKXtcclxuICAgICAgICBpZiAocmV0U3RyLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHJldCA9IHJldFN0ci5yZXN1bHRcclxuICAgICAgICAgICAgaWYgKHJldCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIuivt+WFiOWuieijheW+ruS/oVwiKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi6K+35YWI5a6J6KOF5b6u5L+hXCIsIG51bGwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIuaJk+W8gOW+ruS/oeWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi5omT5byA5b6u5L+h5aSx6LSlXCIsIG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvcHlUZXh0VG9DbGlwYm9hcmRDYWxsQmFjayggcmV0U3RyICl7XHJcbiAgICAgICAgaWYgKHJldFN0ci5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWkjeWItuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgaWYodGhpcy5kYXRhLnR5cGUgPT0gUG9wSXRlbVR5cGUuUVEpe1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmF3YWtlUVFBcHAodGhpcy5hd2FrZVFRQ2FsbEJhY2suYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuZGF0YS50eXBlID09IFBvcEl0ZW1UeXBlLldYIHx8IHRoaXMuZGF0YS50eXBlID09IFBvcEl0ZW1UeXBlLldYKXtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5hd2FrZVdlY2hhdEFwcCh0aGlzLmF3YWtlV2VDaGF0Q2FsbEJhY2suYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5aSN5Yi25aSx6LSlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WkjeWItuW5tuWJjeW+gFxyXG4gICAgU2VydmljZXJCdG5GdW5jKGV2ZW50LCBjdXN0b21FdmVudERhdGEpe1xyXG4gICAgICAgIGlmKHRoaXMuc2VydmVyIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNPbmxpbmVTZXJ2aWNlcil7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmlnaHRQYW5lbFZpZXcgPSA8UmlnaHRQYW5lbFZpZXc+R2xvYmFsLlVJLmdldFdpbmRvdyhcIlduZEZlZWRiYWNrXCIpLmdldFZpZXcoXCJSaWdodFBhbmVsVmlld1wiKTtcclxuICAgICAgICAgICAgICAgIHJpZ2h0UGFuZWxWaWV3LmNoYW5nZVZpZXcoUmlnaHRWaWV3VHlwZS5mZWVkYmFjazIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZlZWRiYWNrMiA9IDxGZWVkYmFjazI+cmlnaHRQYW5lbFZpZXcuZ2V0VmlldyhcImZlZWRiYWNrMlwiKTtcclxuICAgICAgICAgICAgICAgIGZlZWRiYWNrMi5zZXJ2ZXIgPSB0aGlzLnNlcnZlcjtcclxuICAgICAgICAgICAgICAgIGZlZWRiYWNrMi5vcmRlciA9IHRoaXMub3JkZXI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2ZXIuYWNjZXB0U2VydmljZSh0aGlzLm9yZGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuaXNPbmxpbmVTZXJ2aWNlcil7XHJcbiAgICAgICAgICAgIGNjLnN5cy5vcGVuVVJMKEdsb2JhbC5Ub29sa2l0LkRlYWxXaXRoVXJsKHRoaXMuZGF0YS5pbmZvKSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNBdFNlcnZpY2VyKXtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5DaGF0U2VydmVyLnNlcnZlclR5cGUgPSBDdXN0b21lckVudHJhbmNlVHlwZS5IYWxsU2VydmljZTtcclxuICAgICAgICAgICAgICAgIGlmKGN1c3RvbUV2ZW50RGF0YSAmJiBjdXN0b21FdmVudERhdGEgPT0gXCJwcm94eVwiICYmICF0aGlzLmRhdGEucG9wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5DaGF0U2VydmVyLnVzZXJTZXR0aW5nKG51bGwsdGhpcy5kYXRhLmFpdGVfdXJsKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEdsb2JhbC5DaGF0U2VydmVyLnVzZXJTZXR0aW5nKG51bGwsdGhpcy5kYXRhLmluZm8pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5jb3B5VGV4dFRvQ2xpcGJvYXJkKHRoaXMuZGF0YS5pbmZvLCB0aGlzLmNvcHlUZXh0VG9DbGlwYm9hcmRDYWxsQmFjay5iaW5kKHRoaXMpICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==