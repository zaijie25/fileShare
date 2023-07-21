
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/WndRechargeVipShow.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcV25kUmVjaGFyZ2VWaXBTaG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFnRTtBQUNoRSxzREFBaUQ7QUFFakQsSUFBSyxJQU1KO0FBTkQsV0FBSyxJQUFJO0lBQ0wsbUNBQVUsQ0FBQTtJQUNWLDJCQUFNLENBQUE7SUFDTiw2QkFBTyxDQUFBO0lBQ1AsMkJBQU0sQ0FBQTtJQUNOLDZCQUFPLENBQUE7QUFDWCxDQUFDLEVBTkksSUFBSSxLQUFKLElBQUksUUFNUjtBQUVEO0lBQWdELHNDQUFPO0lBQXZEOztJQXNKQSxDQUFDO0lBL0lhLG1DQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxvQkFBb0IsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsMkNBQTJDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBVyxDQUFDLElBQUksQ0FBQztJQUN4QyxDQUFDO0lBRVMscUNBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0RBQWdELENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hILElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpREFBaUQsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEgsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdEQUFnRCxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcs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Q0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0wsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQW5FQSxBQW1FQyxDQW5Fa0Isa0JBQVEsR0FtRTFCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UsIHsgRGVzdG9yeVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5cclxuZW51bSBUeXBlIHtcclxuICAgIHdlY2hhdCA9IDEsXHJcbiAgICBxcSA9IDIsXHJcbiAgICBnemggPSAzLFxyXG4gICAga2YgPSA0LFxyXG4gICAgemZiID0gNSxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kUmVjaGFyZ2VWaXBTaG93IGV4dGVuZHMgV25kQmFzZSB7XHJcbiAgICBwcml2YXRlIHd4SXRlbTogSXRlbTtcclxuICAgIHByaXZhdGUgcXFJdGVtOiBJdGVtO1xyXG4gICAgcHJpdmF0ZSBjbGlja1R5cGU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgd3hwSXRlbTogSXRlbTtcclxuICAgIHByaXZhdGUgYWxpSXRlbTogSXRlbTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiV25kUmVjaGFyZ2VWaXBTaG93XCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IEdsb2JhbC5VSS5Qb3BMYXllcjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9SZWNoYXJnZS9SZWNoYWdlVmlwU2hvd1VJXCI7XHJcbiAgICAgICAgdGhpcy5kZXN0b3J5VHlwZSA9IERlc3RvcnlUeXBlLk5vbmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMud3hJdGVtID0gbmV3IEl0ZW0odGhpcy5nZXRDaGlsZChcImNlbnRlck5vZGUvc2Nyb2xsdmlldy9tYXNrVmlldy9jb250ZW50L2l0ZW1fd3hcIiksIHRoaXMub25JdGVtQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMud3hwSXRlbSA9IG5ldyBJdGVtKHRoaXMuZ2V0Q2hpbGQoXCJjZW50ZXJOb2RlL3Njcm9sbHZpZXcvbWFza1ZpZXcvY29udGVudC9pdGVtX3d4cFwiKSwgdGhpcy5vbkl0ZW1DbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5xcUl0ZW0gPSBuZXcgSXRlbSh0aGlzLmdldENoaWxkKFwiY2VudGVyTm9kZS9zY3JvbGx2aWV3L21hc2tWaWV3L2NvbnRlbnQvaXRlbV9xcVwiKSwgdGhpcy5vbkl0ZW1DbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hbGlJdGVtID0gbmV3IEl0ZW0odGhpcy5nZXRDaGlsZChcImNlbnRlck5vZGUvc2Nyb2xsdmlldy9tYXNrVmlldy9jb250ZW50L2l0ZW1fYWxpeHh4XCIpLCB0aGlzLm9uSXRlbUNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY2xvc2VcIiwgdGhpcy5jbG9zZVduZCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkl0ZW1DbGljayhzdHI6IHN0cmluZywgdHlwZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5jbGlja1R5cGUgPSB0eXBlO1xyXG4gICAgICAgIGlmICh0eXBlID09PSBUeXBlLmtmKSB7XHJcbiAgICAgICAgICAgIGNjLnN5cy5vcGVuVVJMKEdsb2JhbC5Ub29sa2l0LkRlYWxXaXRoVXJsKHN0cikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNvcHlUZXh0VG9DbGlwYm9hcmQoc3RyLCB0aGlzLmNvcHlUZXh0VG9DbGlwYm9hcmRDYWxsQmFjay5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29weVRleHRUb0NsaXBib2FyZENhbGxCYWNrKHJldFN0cikge1xyXG4gICAgICAgIGlmIChyZXRTdHIucmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlpI3liLbmiJDlip9cIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsaWNrVHlwZSA9PSBUeXBlLndlY2hhdCkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmF3YWtlV2VjaGF0QXBwKHRoaXMuYXdha2VXZUNoYXRDYWxsQmFjay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNsaWNrVHlwZSA9PSBUeXBlLnFxKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuYXdha2VRUUFwcCh0aGlzLmF3YWtlUVFDYWxsQmFjay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmNsaWNrVHlwZSA9PSBUeXBlLmd6aCkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmF3YWtlV2VjaGF0QXBwKHRoaXMuYXdha2VXZUNoYXRDYWxsQmFjay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNsaWNrVHlwZSA9PSBUeXBlLnpmYikge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmF3YWtlQUxpUGF5QXBwKHRoaXMuYXdha2VBbGlDYWxsQmFjay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5aSN5Yi25aSx6LSlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXdha2VRUUNhbGxCYWNrKHJldFN0cikge1xyXG4gICAgICAgIGlmIChyZXRTdHIucmVzdWx0ID09IDApIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCByZXQgPSByZXRTdHIucmVzdWx0XHJcbiAgICAgICAgICAgIGlmIChyZXQgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCLor7flhYjlronoo4VRUVwiKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi6K+35YWI5a6J6KOFUVFcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi5omT5byAUVHlpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIuaJk+W8gFFR5aSx6LSlXCIsIG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXdha2VBbGlDYWxsQmFjayhyZXRTdHIpIHtcclxuICAgICAgICBpZiAocmV0U3RyLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHJldCA9IHJldFN0ci5yZXN1bHRcclxuICAgICAgICAgICAgaWYgKHJldCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIuivt+WFiOWuieijheaUr+S7mOWunVwiKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi6K+35YWI5a6J6KOF5pSv5LuY5a6dXCIsIG51bGwpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIuaJk+W8gOaUr+S7mOWuneWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi5omT5byA5pSv5LuY5a6d5aSx6LSlXCIsIG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXdha2VXZUNoYXRDYWxsQmFjayhyZXRTdHIpe1xyXG4gICAgICAgIGlmIChyZXRTdHIucmVzdWx0ID09IDApIHtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmV0ID0gcmV0U3RyLnJlc3VsdFxyXG4gICAgICAgICAgICBpZiAocmV0ID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi6K+35YWI5a6J6KOF5b6u5L+hXCIpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLor7flhYjlronoo4Xlvq7kv6FcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi5omT5byA5b6u5L+h5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLmiZPlvIDlvq7kv6HlpLHotKVcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbihkYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgdCA9IGRhdGFbMF07XHJcbiAgICAgICAgbGV0IGl0ZW1BcnJheSA9IFtdXHJcbiAgICAgICAgaWYgKHQucHR5cGUxICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMud3hJdGVtLnNldFN0eWxlKHQucHR5cGUxLCB0LmRhdGExKTtcclxuICAgICAgICAgICAgdGhpcy53eEl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaXRlbUFycmF5LnB1c2godGhpcy53eEl0ZW0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53eEl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0LnB0eXBlMiAhPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnd4cEl0ZW0uc2V0U3R5bGUodC5wdHlwZTIsIHQuZGF0YTIpO1xyXG4gICAgICAgICAgICB0aGlzLnd4cEl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaXRlbUFycmF5LnB1c2godGhpcy53eHBJdGVtKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud3hwSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHQucHR5cGUzICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucXFJdGVtLnNldFN0eWxlKHQucHR5cGUzLCB0LmRhdGEzKTtcclxuICAgICAgICAgICAgdGhpcy5xcUl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaXRlbUFycmF5LnB1c2godGhpcy5xcUl0ZW0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5xcUl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0LnB0eXBlNCAhPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmFsaUl0ZW0uc2V0U3R5bGUodC5wdHlwZTQsIHQuZGF0YTQpO1xyXG4gICAgICAgICAgICB0aGlzLmFsaUl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaXRlbUFycmF5LnB1c2godGhpcy5hbGlJdGVtKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hbGlJdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNjcm9sbFZpZXcgPSB0aGlzLmdldENoaWxkKFwiY2VudGVyTm9kZS9zY3JvbGx2aWV3XCIpLmdldENvbXBvbmVudChjYy5TY3JvbGxWaWV3KVxyXG4gICAgICAgIHNjcm9sbFZpZXcuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgc2Nyb2xsVmlldy5zY3JvbGxUb1RvcCgpXHJcblxyXG4gICAgICAgIGxldCBpdGVtSGVpZ2h0ID0gNjBcclxuICAgICAgICBpZiAoaXRlbUFycmF5Lmxlbmd0aCA+IDQpIHtcclxuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmdldENoaWxkKFwiY2VudGVyTm9kZS9zY3JvbGx2aWV3L21hc2tWaWV3L2NvbnRlbnRcIilcclxuICAgICAgICAgICAgY29udGVudC5oZWlnaHQgPSAzMTA7XHJcbiAgICAgICAgICAgIHNjcm9sbFZpZXcuaW5lcnRpYSA9IHRydWU7XHJcbiAgICAgICAgICAgIGl0ZW1IZWlnaHQgPSA2MFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNjcm9sbFZpZXcuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtQXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBpdGVtQXJyYXlbaV1cclxuICAgICAgICAgICAgaXRlbS5ub2RlLnkgPSAtNDAgLSBpICogaXRlbUhlaWdodFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsb3NlV25kKCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSXRlbSBleHRlbmRzIFZpZXdCYXNlIHtcclxuICAgIHByaXZhdGUgaWNvbjogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSB0eXBlTGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgbnVtTGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgY3VzdG9tVHlwZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUsIHByaXZhdGUgY2FsbGJhY2s6IEZ1bmN0aW9uLCBwcml2YXRlIHRhcmdldDogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuaWNvbiA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiaWNvblwiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMudHlwZUxibCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwidHlwZUxibFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5udW1MYmwgPSB0aGlzLmdldENvbXBvbmVudChcIm51bUxibFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImFjdEJ0blwiLCB0aGlzLm9uQWN0Q2xpY2ssIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTdHlsZSh0eXBlOiBudW1iZXIsIHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5udW1MYmwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tVHlwZSA9IHR5cGU7XHJcbiAgICAgICAgaWYoc3RyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5udW1MYmwuc3RyaW5nID0gc3RyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0eXBlID09PSBUeXBlLmtmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5udW1MYmwubm9kZS5hY3RpdmUgPWZhbHNlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLm51bUxibC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYXJyID0gR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5yZWNoYXJnZVZpcENvbmZpZ1t0eXBlXVxyXG4gICAgICAgIGlmKGFyciA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVHlwZS53ZWNoYXQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGVMYmwuc3RyaW5nID0gXCLlrqLmnI3lvq7kv6FcIlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUeXBlLnFxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlTGJsLnN0cmluZyA9IFwi5a6i5pyNUVFcIlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVHlwZS5nemg6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGVMYmwuc3RyaW5nID0gXCLlhazkvJflj7dcIlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVHlwZS5rZjpcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZUxibC5zdHJpbmcgPSBcIuWcqOe6v+WuouacjVwiXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUeXBlLnpmYjpcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZUxibC5zdHJpbmcgPSBcIuaUr+S7mOWunVwiXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLmlzUHVycGxlKVxyXG4gICAgICAgICAgICB0aGlzLmljb24uc3ByaXRlRnJhbWUgPSBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdldFNwcml0ZShhcnJbMF0sIGFyclsxXSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXModGhpcy5pY29uLCBhcnJbMF0sIGFyclsxXSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25BY3RDbGljaygpIHtcclxuICAgICAgICBpZiAodGhpcy5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy50YXJnZXQsIHRoaXMubnVtTGJsLnN0cmluZywgdGhpcy5jdXN0b21UeXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=