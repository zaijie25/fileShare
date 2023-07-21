"use strict";
cc._RF.push(module, '4e71fd8AOVB9Y89OVdWljfY', 'ProxyWin');
// hall/scripts/logic/hall/ui/Spread/ProxyWin.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
var ServicerModel_1 = require("../../../hallcommon/model/ServicerModel");
var ProxyWin = /** @class */ (function (_super) {
    __extends(ProxyWin, _super);
    function ProxyWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.show_img = "";
        _this.servicerNode = [];
        _this.servicerType = {
            1: "icon_kfwx",
            2: "icon_kfqq",
            3: "icon_kfwx",
            4: "icon_kfat",
            5: "img_llgf",
            6: "img_llgf" //在线客服
        };
        _this.servicerName = {
            1: "客服微信",
            2: "客服QQ",
            3: "公众号",
            4: "艾特客服",
            5: "在线客服",
            6: "在线客服" //默认
        };
        return _this;
    }
    ProxyWin.prototype.onInit = function () {
    };
    ProxyWin.prototype.initView = function () {
        this.serviceModel = Global.ModelManager.getModel("ServicerModel");
        this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
        this.centerImg = this.getChild("mask/centerImg");
        this.contentSprite = this.centerImg.getComponent(cc.Sprite);
        this.delegateNode = this.getChild("ServerNode");
        var leftNode = this.getChild("ServerNode/leftNode");
        // if (leftNode) {
        //     leftNode.active = false
        // }
        //  let rightNode = this.getChild("ServerNode/rightNode")
        // if (rightNode) {
        //     rightNode.active = false
        // }
        this.servicerNode.push(leftNode);
        //   this.servicerNode.push(rightNode)
        Global.UIHelper.addCommonClick(this.node, "ServerNode/leftNode/btn_leftkefu", this.openServicerApp, this);
        //  Global.UIHelper.addCommonClick(this.node, "ServerNode/rightNode/btn_leftkefu", this.openServicerApp, this);
    };
    ProxyWin.prototype.onSubViewShow = function () {
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        var url = Global.Setting.Urls.getinviteUrl();
        this.SpreadModel.GetDayAgentShare(url);
        //  this.CheckKefu()
        this.showProxy();
        this.InitCenterImg();
    };
    ProxyWin.prototype.InitCenterImg = function () {
        if (!this.show_img) {
            return;
        }
        this.contentSprite.spriteFrame = null;
        var self = this;
        if (self.show_img != null && !Global.Toolkit.isEmptyObject(self.show_img)) {
            if (CC_JSB) {
                Global.Toolkit.LoadPicToNative(Global.Toolkit.DealWithUrl(self.show_img), Global.Toolkit.DealWithUrl(self.show_img), function (texture) {
                    if (self.centerImg && self.centerImg.isValid) {
                        var frame = new cc.SpriteFrame(texture);
                        self.contentSprite.spriteFrame = frame;
                    }
                });
            }
            else {
                cc.loader.load(Global.Toolkit.DealWithUrl(self.show_img), function (err, texture) {
                    if (err != null) {
                        return;
                    }
                    if (self.centerImg && self.centerImg.isValid) {
                        var frame = new cc.SpriteFrame(texture);
                        self.contentSprite.spriteFrame = frame;
                    }
                });
            }
        }
    };
    ProxyWin.prototype.CheckKefu = function () {
        var data = null;
        var model = Global.ModelManager.getModel("ServicerModel");
        if (model) {
            data = model.getServiceInfo(ServicerModel_1.CustomerEntranceType.SpreadService);
        }
        if (!data || !data.status) {
            this.delegateNode.active = false;
        }
        else {
            this.delegateNode.active = true;
        }
    };
    ProxyWin.prototype.showProxy = function () {
        var data = this.serviceModel.getServiceInfo(ServicerModel_1.CustomerEntranceType.SpreadService);
        if (!data) {
            Global.UI.fastTip("客服数据未配置！");
            return;
        }
        this.show_img = data.show_img;
        if (!data || data.arr.length === 0)
            return;
        var severArr = data.arr;
        for (var index = 0; index < severArr.length; index++) {
            if (index > (this.servicerNode.length - 1)) {
                return;
            }
            var servicerItem = this.servicerNode[index];
            var data_1 = severArr[index];
            if (data_1.type !== 0 && servicerItem && cc.isValid(servicerItem)) {
                servicerItem.active = true;
                // let labe1 = cc.find("label1", servicerItem).getComponent(cc.Label);
                var labe2 = cc.find("lb_kefu", servicerItem).getComponent(cc.Label);
                var icon = cc.find("img_qq", servicerItem).getComponent(cc.Sprite);
                var btnNode = cc.find("btn_leftkefu", servicerItem);
                btnNode.data = data_1;
                //  labe1.string = this.servicerName[data.type]
                labe2.string = Global.Toolkit.substrEndWithElli(data_1.data, 10);
                Global.ResourceManager.loadAutoAtlas(icon, "hall/texture/Proxy/Proxy", this.servicerType[data_1.type]);
            }
        }
    };
    ProxyWin.prototype.openServicerApp = function (target) {
        var _this = this;
        if (target && target.node && target.node.data) {
            Global.NativeEvent.copyTextToClipboard(target.node.data.data, function (retStr) {
                if (retStr.result == 0) {
                    if (target.node.data.type == ServicerModel_1.PopItemType.QQ) {
                        Global.UI.fastTip("复制成功");
                        Global.NativeEvent.awakeQQApp(_this.awakeQQCallBack.bind(_this));
                    }
                    else if (target.node.data.type == ServicerModel_1.PopItemType.WX || target.node.data.type == ServicerModel_1.PopItemType.WXPUBLIC) {
                        Global.UI.fastTip("复制成功");
                        Global.NativeEvent.awakeWechatApp(_this.awakeWeChatCallBack.bind(_this));
                    }
                    else if (target.node.data.type == ServicerModel_1.PopItemType.AtWnd) {
                        Global.ChatServer.serverType = ServicerModel_1.CustomerEntranceType.HallService;
                        Global.ChatServer.userSetting(null, target.node.data.data);
                    }
                    else if (target.node.data.type == ServicerModel_1.PopItemType.Link) {
                        cc.sys.openURL(Global.Toolkit.DealWithUrl(target.node.data.data));
                    }
                    else if (target.node.data.type == ServicerModel_1.PopItemType.AtLink) {
                        cc.sys.openURL(Global.Toolkit.DealWithUrl(target.node.data.data));
                    }
                    else {
                        Global.UI.fastTip("复制失败");
                    }
                }
            });
        }
    };
    ProxyWin.prototype.awakeQQCallBack = function (retStr) {
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
    ProxyWin.prototype.awakeWeChatCallBack = function (retStr) {
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
    return ProxyWin;
}(ViewBase_1.default));
exports.default = ProxyWin;

cc._RF.pop();