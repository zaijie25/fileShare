"use strict";
cc._RF.push(module, '2facbVdkq5Dx70xYqNOAXYM', 'SpreadServices');
// hall/scripts/logic/hall/ui/Spread/SpreadServices.ts

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
var SpreadServices = /** @class */ (function (_super) {
    __extends(SpreadServices, _super);
    function SpreadServices() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.servicerNode = [];
        _this.servicerType = {
            1: "icon_kfwx",
            2: "icon_kfqq",
            3: "icon_kfwx",
            4: "icon_kfat",
            5: "icon_zxkf",
            6: "icon_zxkf" //在线客服
        };
        _this.servicerName = {
            1: "客服微信",
            2: "客服QQ",
            3: "公众号",
            4: "客服艾特",
            5: "在线客服",
            6: "在线客服"
        };
        return _this;
    }
    SpreadServices.prototype.initView = function () {
        this.ServicerModel = Global.ModelManager.getModel("ServicerModel");
        var leftNode = this.getChild("left");
        Global.UIHelper.addCommonClick(leftNode, "btn_ljlx", this.openServicerApp, this);
        leftNode.active = false;
        var rightNode = this.getChild("right");
        Global.UIHelper.addCommonClick(rightNode, "btn_ljlx", this.openServicerApp, this);
        rightNode.active = false;
        this.servicerNode.push(leftNode);
        this.servicerNode.push(rightNode);
    };
    SpreadServices.prototype.onSubViewShow = function () {
        var serviceData = this.ServicerModel.getServiceInfo(ServicerModel_1.CustomerEntranceType.SpreadService);
        this.updateUI(serviceData);
    };
    SpreadServices.prototype.onSubViewHide = function () {
    };
    SpreadServices.prototype.onDispose = function () {
        this.servicerNode = [];
    };
    SpreadServices.prototype.updateUI = function (data) {
        if (!data || data.length == 0)
            return;
        var severArr = data.arr;
        //暂时显示
        // this.servicerNode[0].active = true;
        // this.servicerNode[1].active = true;
        for (var index = 0; index < severArr.length; index++) {
            var servicerItem = this.servicerNode[index];
            var data_1 = severArr[index];
            if (data_1.type != 0) {
                servicerItem.active = true;
                var labe1 = cc.find("label1", servicerItem).getComponent(cc.Label);
                var labe2 = cc.find("label2", servicerItem).getComponent(cc.Label);
                var icon = cc.find("icon_kfqq", servicerItem).getComponent(cc.Sprite);
                var btnNode = cc.find("btn_ljlx", servicerItem);
                btnNode.data = data_1;
                labe1.string = this.servicerName[data_1.type];
                labe2.string = Global.Toolkit.substrEndWithElli(data_1.data, 10);
                Global.ResourceManager.loadAutoAtlas(icon, "hall/texture/Proxy/Proxy", this.servicerType[data_1.type]);
            }
        }
    };
    SpreadServices.prototype.openServicerApp = function (target) {
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
    SpreadServices.prototype.awakeQQCallBack = function (retStr) {
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
    SpreadServices.prototype.awakeWeChatCallBack = function (retStr) {
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
    return SpreadServices;
}(ViewBase_1.default));
exports.default = SpreadServices;

cc._RF.pop();