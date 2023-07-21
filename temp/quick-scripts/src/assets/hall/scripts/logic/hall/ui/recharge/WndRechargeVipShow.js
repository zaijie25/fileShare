"use strict";
cc._RF.push(module, '4578dECdjJINZjbg5vA8UI+', 'WndRechargeVipShow');
// hall/scripts/logic/hall/ui/recharge/WndRechargeVipShow.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
var Type;
(function (Type) {
    Type[Type["wechat"] = 1] = "wechat";
    Type[Type["qq"] = 2] = "qq";
    Type[Type["gzh"] = 3] = "gzh";
    Type[Type["kf"] = 4] = "kf";
    Type[Type["zfb"] = 5] = "zfb";
})(Type || (Type = {}));
var WndRechargeVipShow = /** @class */ (function (_super) {
    __extends(WndRechargeVipShow, _super);
    function WndRechargeVipShow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndRechargeVipShow.prototype.onInit = function () {
        this.name = "WndRechargeVipShow";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/RechageVipShowUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndRechargeVipShow.prototype.initView = function () {
        this.wxItem = new Item(this.getChild("centerNode/scrollview/maskView/content/item_wx"), this.onItemClick, this);
        this.wxpItem = new Item(this.getChild("centerNode/scrollview/maskView/content/item_wxp"), this.onItemClick, this);
        this.qqItem = new Item(this.getChild("centerNode/scrollview/maskView/content/item_qq"), this.onItemClick, this);
        this.aliItem = new Item(this.getChild("centerNode/scrollview/maskView/content/item_alixxx"), this.onItemClick, this);
        this.addCommonClick("close", this.closeWnd, this);
    };
    WndRechargeVipShow.prototype.onItemClick = function (str, type) {
        this.clickType = type;
        if (type === Type.kf) {
            cc.sys.openURL(Global.Toolkit.DealWithUrl(str));
        }
        else {
            Global.NativeEvent.copyTextToClipboard(str, this.copyTextToClipboardCallBack.bind(this));
        }
    };
    WndRechargeVipShow.prototype.copyTextToClipboardCallBack = function (retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
            if (this.clickType == Type.wechat) {
                Global.NativeEvent.awakeWechatApp(this.awakeWeChatCallBack.bind(this));
            }
            else if (this.clickType == Type.qq) {
                Global.NativeEvent.awakeQQApp(this.awakeQQCallBack.bind(this));
            }
            else if (this.clickType == Type.gzh) {
                Global.NativeEvent.awakeWechatApp(this.awakeWeChatCallBack.bind(this));
            }
            else if (this.clickType == Type.zfb) {
                Global.NativeEvent.awakeALiPayApp(this.awakeAliCallBack.bind(this));
            }
            else {
                Global.UI.fastTip("复制失败");
            }
        }
    };
    WndRechargeVipShow.prototype.awakeQQCallBack = function (retStr) {
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
    WndRechargeVipShow.prototype.awakeAliCallBack = function (retStr) {
        if (retStr.result == 0) {
        }
        else {
            var ret = retStr.result;
            if (ret == -1) {
                Logger.log("请先安装支付宝");
                Global.UI.showSingleBox("请先安装支付宝", null);
            }
            else {
                Logger.log("打开支付宝失败");
                Global.UI.showSingleBox("打开支付宝失败", null);
            }
        }
    };
    WndRechargeVipShow.prototype.awakeWeChatCallBack = function (retStr) {
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
    WndRechargeVipShow.prototype.onOpen = function (data) {
        var t = data[0];
        var itemArray = [];
        if (t.ptype1 !== 0) {
            this.wxItem.setStyle(t.ptype1, t.data1);
            this.wxItem.active = true;
            itemArray.push(this.wxItem);
        }
        else {
            this.wxItem.active = false;
        }
        if (t.ptype2 !== 0) {
            this.wxpItem.setStyle(t.ptype2, t.data2);
            this.wxpItem.active = true;
            itemArray.push(this.wxpItem);
        }
        else {
            this.wxpItem.active = false;
        }
        if (t.ptype3 !== 0) {
            this.qqItem.setStyle(t.ptype3, t.data3);
            this.qqItem.active = true;
            itemArray.push(this.qqItem);
        }
        else {
            this.qqItem.active = false;
        }
        if (t.ptype4 !== 0) {
            this.aliItem.setStyle(t.ptype4, t.data4);
            this.aliItem.active = true;
            itemArray.push(this.aliItem);
        }
        else {
            this.aliItem.active = false;
        }
        var scrollView = this.getChild("centerNode/scrollview").getComponent(cc.ScrollView);
        scrollView.enabled = true;
        scrollView.scrollToTop();
        var itemHeight = 60;
        if (itemArray.length > 4) {
            var content = this.getChild("centerNode/scrollview/maskView/content");
            content.height = 310;
            scrollView.inertia = true;
            itemHeight = 60;
        }
        else {
            scrollView.enabled = false;
        }
        for (var i = 0; i < itemArray.length; i++) {
            var item = itemArray[i];
            item.node.y = -40 - i * itemHeight;
        }
    };
    WndRechargeVipShow.prototype.closeWnd = function () {
        this.close();
    };
    return WndRechargeVipShow;
}(WndBase_1.default));
exports.default = WndRechargeVipShow;
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item(node, callback, target) {
        var _this = _super.call(this) || this;
        _this.callback = callback;
        _this.target = target;
        _this.setNode(node);
        return _this;
    }
    Item.prototype.initView = function () {
        this.icon = this.getComponent("icon", cc.Sprite);
        this.typeLbl = this.getComponent("typeLbl", cc.Label);
        this.numLbl = this.getComponent("numLbl", cc.Label);
        this.addCommonClick("actBtn", this.onActClick, this);
    };
    Item.prototype.setStyle = function (type, str) {
        this.numLbl.node.active = true;
        this.customType = type;
        if (str) {
            this.numLbl.string = str;
        }
        if (type === Type.kf) {
            this.numLbl.node.active = false;
        }
        else {
            this.numLbl.node.active = true;
        }
        var arr = Global.Setting.SkinConfig.rechargeVipConfig[type];
        if (arr == null)
            return;
        switch (type) {
            case Type.wechat:
                this.typeLbl.string = "客服微信";
                break;
            case Type.qq:
                this.typeLbl.string = "客服QQ";
                break;
            case Type.gzh:
                this.typeLbl.string = "公众号";
                break;
            case Type.kf:
                this.typeLbl.string = "在线客服";
                break;
            case Type.zfb:
                this.typeLbl.string = "支付宝";
                break;
            default:
                break;
        }
        if (Global.Setting.SkinConfig.isPurple)
            this.icon.spriteFrame = Global.ResourceManager.getSprite(arr[0], arr[1]);
        else
            Global.ResourceManager.loadAutoAtlas(this.icon, arr[0], arr[1]);
    };
    Item.prototype.onActClick = function () {
        if (this.callback) {
            this.callback.call(this.target, this.numLbl.string, this.customType);
        }
    };
    return Item;
}(ViewBase_1.default));

cc._RF.pop();