"use strict";
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