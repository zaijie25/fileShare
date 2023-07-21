
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Feedback/FeedbackServiceItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxGZWVkYmFja1xcRmVlZGJhY2tTZXJ2aWNlSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5RUFBMkY7QUFHckYsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBaUQsdUNBQVk7SUFBN0Q7UUFBQSxxRUErRkM7UUE1RkcsZ0JBQVUsR0FBMkIsRUFBRSxDQUFDO1FBR3hDLGdCQUFVLEdBQWtCLEVBQUUsQ0FBQztRQUcvQixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBQ3RCLFVBQUksR0FBUyxJQUFJLENBQUM7O0lBK0U5QixDQUFDO0lBNUVHLHVDQUFTLEdBQVQsVUFBVSxJQUFJO1FBRVYsSUFBRyxDQUFDLElBQUksRUFDUjtZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDdkIsT0FBTTtTQUNUO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQTtRQUNqRSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMs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Q0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDM0QsTUFBTTtZQUNWLEtBQUssMkJBQVcsQ0FBQyxLQUFLO2dCQUNsQixNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxvQ0FBb0IsQ0FBQyxXQUFXLENBQUE7Z0JBQy9ELE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwRCxNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQTNGRDtRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzsyREFDYTtJQUd4QztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQzsyREFDUztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJEQUNTO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7eURBQ087SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs2REFDVztJQWZiLG1CQUFtQjtRQUR2QyxPQUFPO09BQ2EsbUJBQW1CLENBK0Z2QztJQUFELDBCQUFDO0NBL0ZELEFBK0ZDLENBL0ZnRCxFQUFFLENBQUMsU0FBUyxHQStGNUQ7a0JBL0ZvQixtQkFBbUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0N1c3RvbWVyRW50cmFuY2VUeXBlLCBQb3BJdGVtVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1NlcnZpY2VyTW9kZWxcIjtcclxuXHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZlZWRiYWNrU2VydmljZUl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc3ByaXRlTGlzdCA6IEFycmF5PGNjLlNwcml0ZUZyYW1lPiA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3RyaW5nXSlcclxuICAgIHN0cmluZ0xpc3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgaWNvblNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBpY29uTmFtZTogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHNlcnZpY2VyTmFtZTogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBkYXRhIDogYW55ID0gbnVsbDtcclxuICAgXHJcblxyXG4gICAgcmVmcmVzaFVJKGRhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIWRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLlrqLmnI3kv6Hmga/kuI3lrZjlnKhcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFcclxuICAgICAgICB0aGlzLmljb25TcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZUxpc3RbZGF0YS50eXBlXTtcclxuICAgICAgICBsZXQgc3RyaW5nID0gZGF0YS5tc2cgfHwgdGhpcy5zdHJpbmdMaXN0W2RhdGEudHlwZV07XHJcbiAgICAgICAgdGhpcy5pY29uTmFtZS5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5zdWJzdHJFbmRXaXRoRWxsaShzdHJpbmcsOClcclxuICAgICAgICB0aGlzLnNlcnZpY2VyTmFtZS5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5zdWJzdHJFbmRXaXRoRWxsaShkYXRhLmRhdGEsMTApXHJcblxyXG4gICAgfVxyXG4gICAgYXdha2VRUUNhbGxCYWNrKCByZXRTdHIgKXtcclxuICAgICAgICBpZiAocmV0U3RyLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHJldCA9IHJldFN0ci5yZXN1bHRcclxuICAgICAgICAgICAgaWYgKHJldCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIuivt+WFiOWuieijhVFRXCIpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLor7flhYjlronoo4VRUVwiLCBudWxsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCLmiZPlvIBRUeWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi5omT5byAUVHlpLHotKVcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXdha2VXZUNoYXRDYWxsQmFjayggcmV0U3RyICl7XHJcbiAgICAgICAgaWYgKHJldFN0ci5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCByZXQgPSByZXRTdHIucmVzdWx0XHJcbiAgICAgICAgICAgIGlmIChyZXQgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCLor7flhYjlronoo4Xlvq7kv6FcIik7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIuivt+WFiOWuieijheW+ruS/oVwiLCBudWxsKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCLmiZPlvIDlvq7kv6HlpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIuaJk+W8gOW+ruS/oeWksei0pVwiLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb3B5VGV4dFRvQ2xpcGJvYXJkQ2FsbEJhY2soIHJldFN0ciApe1xyXG4gICAgICAgIGlmIChyZXRTdHIucmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlpI3liLbmiJDlip9cIik7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YS50eXBlID09IFBvcEl0ZW1UeXBlLlFRKXtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5hd2FrZVFRQXBwKHRoaXMuYXdha2VRUUNhbGxCYWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmRhdGEudHlwZSA9PSBQb3BJdGVtVHlwZS5XWCB8fCB0aGlzLmRhdGEudHlwZSA9PSBQb3BJdGVtVHlwZS5XWFBVQkxJQyl7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuYXdha2VXZWNoYXRBcHAodGhpcy5hd2FrZVdlQ2hhdENhbGxCYWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWkjeWItuWksei0pVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lpI3liLblubbliY3lvoBcclxuICAgIFNlcnZpY2VyQnRuRnVuYyhldmVudCwgY3VzdG9tRXZlbnREYXRhKSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmRhdGEudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFBvcEl0ZW1UeXBlLlFROlxyXG4gICAgICAgICAgICBjYXNlIFBvcEl0ZW1UeXBlLldYOlxyXG4gICAgICAgICAgICBjYXNlIFBvcEl0ZW1UeXBlLldYUFVCTElDOlxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNvcHlUZXh0VG9DbGlwYm9hcmQodGhpcy5kYXRhLmRhdGEsIHRoaXMuY29weVRleHRUb0NsaXBib2FyZENhbGxCYWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUG9wSXRlbVR5cGUuTGluazpcclxuICAgICAgICAgICAgY2FzZSBQb3BJdGVtVHlwZS5BdExpbms6XHJcbiAgICAgICAgICAgICAgICBjYy5zeXMub3BlblVSTChHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybCh0aGlzLmRhdGEuZGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUG9wSXRlbVR5cGUuQXRXbmQ6XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuQ2hhdFNlcnZlci5zZXJ2ZXJUeXBlID0gQ3VzdG9tZXJFbnRyYW5jZVR5cGUuSGFsbFNlcnZpY2VcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5DaGF0U2VydmVyLnVzZXJTZXR0aW5nKG51bGwsIHRoaXMuZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==