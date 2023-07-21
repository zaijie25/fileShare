
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Feedback/OuterServicer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '88cc0LcloZP85C68P94Iuru', 'OuterServicer');
// hall/scripts/logic/hall/ui/Feedback/OuterServicer.ts

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
exports.OnlineServicer = exports.WxServicer = exports.QqServicer = void 0;
var AbsServicer_1 = require("./AbsServicer");
/**
   跳转外部打开的客服。如：在线客服，QQ，微信，在线客服等
 */
var OuterServicer = /** @class */ (function (_super) {
    __extends(OuterServicer, _super);
    function OuterServicer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OuterServicer.prototype.acceptService = function (index) {
        this.jumpOrOpen(this.serviceDatas[index]);
    };
    return OuterServicer;
}(AbsServicer_1.default));
exports.default = OuterServicer;
var QqServicer = /** @class */ (function (_super) {
    __extends(QqServicer, _super);
    function QqServicer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QqServicer.prototype.jumpOrOpen = function (data) {
        var _this = this;
        Global.NativeEvent.copyTextToClipboard(data.info, function (retStr) {
            if (retStr.result == 0) {
                Global.UI.fastTip("复制成功");
                Global.NativeEvent.awakeQQApp(_this.awakeQQCallBack.bind(_this));
            }
            else {
                Global.UI.fastTip("复制失败");
            }
        });
    };
    QqServicer.prototype.awakeQQCallBack = function (retStr) {
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
    return QqServicer;
}(OuterServicer));
exports.QqServicer = QqServicer;
var WxServicer = /** @class */ (function (_super) {
    __extends(WxServicer, _super);
    function WxServicer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WxServicer.prototype.jumpOrOpen = function (data) {
        var _this = this;
        Global.NativeEvent.copyTextToClipboard(data.info, function (retStr) {
            if (retStr.result == 0) {
                Global.UI.fastTip("复制成功");
                Global.NativeEvent.awakeWechatApp(_this.awakeWeChatCallBack.bind(_this));
            }
            else {
                Global.UI.fastTip("复制失败");
            }
        });
    };
    WxServicer.prototype.awakeWeChatCallBack = function (retStr) {
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
    return WxServicer;
}(OuterServicer));
exports.WxServicer = WxServicer;
var OnlineServicer = /** @class */ (function (_super) {
    __extends(OnlineServicer, _super);
    function OnlineServicer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OnlineServicer.prototype.jumpOrOpen = function (data) {
        cc.sys.openURL(Global.Toolkit.DealWithUrl(data.info));
    };
    return OnlineServicer;
}(OuterServicer));
exports.OnlineServicer = OnlineServicer;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxGZWVkYmFja1xcT3V0ZXJTZXJ2aWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXdDO0FBSXhDOztHQUVHO0FBQ0g7SUFBb0QsaUNBQVc7SUFBL0Q7O0lBUUEsQ0FBQztJQU5VLHFDQUFhLEdBQXBCLFVBQXFCLEtBQVk7UUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUlMLG9CQUFDO0FBQUQsQ0FSQSxBQVFDLENBUm1ELHFCQUFXLEdBUTlEOztBQUVEO0lBQWdDLDhCQUFhO0lBQTdDOztJQThCQSxDQUFDO0lBM0JHLCtCQUFVLEdBQVYsVUFBVyxJQUFTO1FBQXBCLGlCQVNDO1FBUkcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQUMsTUFBTTtZQUNyRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUNwQixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQzthQUNsRTtpQkFBSztnQkFDRixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM3QjtRQUNMLENBQUMsQ0FBRSxDQUFDO0lBQ1IsQ0FBQztJQUVELG9DQUFlLEdBQWYsVUFBaUIsTUFBTTtRQUNuQixJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1NBQ3ZCO2FBQ0k7WUFDRCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO1lBQ3ZCLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFO2dCQUNYLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMzQztpQkFBTTtnQkFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDM0M7U0FDSjtJQUNMLENBQUM7SUFHTCxpQkFBQztBQUFELENBOUJBLEFBOEJDLENBOUIrQixhQUFhLEdBOEI1QztBQTlCWSxnQ0FBVTtBQWdDdkI7SUFBZ0MsOEJBQWE7SUFBN0M7O0lBMkJBLENBQUM7SUF6QkcsK0JBQVUsR0FBVixVQUFXLElBQVM7UUFBcEIsaUJBU0M7UUFSRyxNQUFNLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQyxNQUFNO1lBQ3JELElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3BCLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQixNQUFNLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7YUFDMUU7aUJBQUs7Z0JBQ0YsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDN0I7UUFDTCxDQUFDLENBQUUsQ0FBQztJQUNSLENBQUM7SUFFRCx3Q0FBbUIsR0FBbkIsVUFBcUIsTUFBTTtRQUN2QixJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1NBQ3ZCO2FBQU07WUFDSCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO1lBQ3ZCLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFO2dCQUNYLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMzQztpQkFBTTtnQkFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDM0M7U0FDSjtJQUNMLENBQUM7SUFFTCxpQkFBQztBQUFELENBM0JBLEFBMkJDLENBM0IrQixhQUFhLEdBMkI1QztBQTNCWSxnQ0FBVTtBQTZCdkI7SUFBb0Msa0NBQWE7SUFBakQ7O0lBU0EsQ0FBQztJQU5HLG1DQUFVLEdBQVYsVUFBVyxJQUFTO1FBQ2hCLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFJTCxxQkFBQztBQUFELENBVEEsQUFTQyxDQVRtQyxhQUFhLEdBU2hEO0FBVFksd0NBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWJzU2VydmljZXIgZnJvbSBcIi4vQWJzU2VydmljZXJcIjtcclxuXHJcblxyXG5cclxuLyoqXHJcbiAgIOi3s+i9rOWklumDqOaJk+W8gOeahOWuouacjeOAguWmgu+8muWcqOe6v+Wuouacje+8jFFR77yM5b6u5L+h77yM5Zyo57q/5a6i5pyN562JXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBPdXRlclNlcnZpY2VyIGV4dGVuZHMgQWJzU2VydmljZXIge1xyXG5cclxuICAgIHB1YmxpYyBhY2NlcHRTZXJ2aWNlKGluZGV4Om51bWJlcil7XHJcbiAgICAgICAgdGhpcy5qdW1wT3JPcGVuKHRoaXMuc2VydmljZURhdGFzW2luZGV4XSk7XHJcbiAgICB9XHJcbiAgICAvL+i3s+i9rOaIluaJk+W8gFxyXG4gICAgYWJzdHJhY3QganVtcE9yT3BlbihkYXRhKTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBRcVNlcnZpY2VyIGV4dGVuZHMgT3V0ZXJTZXJ2aWNlciB7XHJcblxyXG5cclxuICAgIGp1bXBPck9wZW4oZGF0YTogYW55KSB7XHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNvcHlUZXh0VG9DbGlwYm9hcmQoZGF0YS5pbmZvLCAocmV0U3RyKT0+e1xyXG4gICAgICAgICAgICBpZiAocmV0U3RyLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWkjeWItuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5hd2FrZVFRQXBwKHRoaXMuYXdha2VRUUNhbGxCYWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWkjeWItuWksei0pVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICBhd2FrZVFRQ2FsbEJhY2soIHJldFN0ciApe1xyXG4gICAgICAgIGlmIChyZXRTdHIucmVzdWx0ID09IDApIHtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmV0ID0gcmV0U3RyLnJlc3VsdFxyXG4gICAgICAgICAgICBpZiAocmV0ID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi6K+35YWI5a6J6KOFUVFcIik7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIuivt+WFiOWuieijhVFRXCIsIG51bGwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIuaJk+W8gFFR5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLmiZPlvIBRUeWksei0pVwiLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgIFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV3hTZXJ2aWNlciBleHRlbmRzIE91dGVyU2VydmljZXIge1xyXG5cclxuICAgIGp1bXBPck9wZW4oZGF0YTogYW55KSB7XHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNvcHlUZXh0VG9DbGlwYm9hcmQoZGF0YS5pbmZvLCAocmV0U3RyKT0+e1xyXG4gICAgICAgICAgICBpZiAocmV0U3RyLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWkjeWItuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5hd2FrZVdlY2hhdEFwcCh0aGlzLmF3YWtlV2VDaGF0Q2FsbEJhY2suYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5aSN5Yi25aSx6LSlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSApO1xyXG4gICAgfVxyXG5cclxuICAgIGF3YWtlV2VDaGF0Q2FsbEJhY2soIHJldFN0ciApe1xyXG4gICAgICAgIGlmIChyZXRTdHIucmVzdWx0ID09IDApIHtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmV0ID0gcmV0U3RyLnJlc3VsdFxyXG4gICAgICAgICAgICBpZiAocmV0ID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi6K+35YWI5a6J6KOF5b6u5L+hXCIpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLor7flhYjlronoo4Xlvq7kv6FcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi5omT5byA5b6u5L+h5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLmiZPlvIDlvq7kv6HlpLHotKVcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgIFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgT25saW5lU2VydmljZXIgZXh0ZW5kcyBPdXRlclNlcnZpY2VyIHtcclxuXHJcblxyXG4gICAganVtcE9yT3BlbihkYXRhOiBhbnkpIHtcclxuICAgICAgICBjYy5zeXMub3BlblVSTChHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybChkYXRhLmluZm8pKTtcclxuICAgIH1cclxuXHJcblxyXG4gICBcclxufSJdfQ==