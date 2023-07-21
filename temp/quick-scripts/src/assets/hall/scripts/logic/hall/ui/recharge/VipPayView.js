"use strict";
cc._RF.push(module, '97f5dr8Aw5O+pqMyQUWhb87', 'VipPayView');
// hall/scripts/logic/hall/ui/recharge/VipPayView.ts

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
var VipPayView = /** @class */ (function (_super) {
    __extends(VipPayView, _super);
    function VipPayView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VipPayView.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("RechargeModel");
        this.sv = this.getComponent("scrollView", cc.ScrollView);
        this.svContent = this.getChild("scrollView/view/content");
        this.copyNode = this.getChild("scrollView/view/content/vipItem");
        this.copyNode.active = false;
        this.initListView();
    };
    VipPayView.prototype.initListView = function () {
        var item_setter = function (item, index, data) {
            new VipItem(item, data);
        };
        this.listView = Global.UIHelper.addScrollViewCarmackComp(this.sv.node, this.copyNode, 10, 0, this, item_setter);
    };
    VipPayView.prototype.updateScrollView = function (list) {
        var dataArr = list || [];
        this.listView.clearView();
        if (!Global.Toolkit.isEmptyObject(dataArr)) {
            this.listView.allDatas = Global.Toolkit.getOutOrderArray(dataArr);
            this.listView.updateView();
        }
    };
    VipPayView.prototype.onSubViewShow = function () {
    };
    VipPayView.prototype.onSubViewHide = function () {
    };
    return VipPayView;
}(ViewBase_1.default));
exports.default = VipPayView;
var ServicerModel_1 = require("../../../hallcommon/model/ServicerModel");
var VipItem = /** @class */ (function (_super) {
    __extends(VipItem, _super);
    function VipItem(node, data) {
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.iconList = [];
        _this.extCfg = [
            "花呗",
            "信用卡",
            "qq钱包"
        ];
        _this.payType = {
            1000: 1,
            1001: 0,
            1002: 2,
        };
        _this.oldPayType = {
            1: 1,
            2: 0,
            3: 2 //银行卡
        };
        _this.setNode(node);
        return _this;
    }
    VipItem.prototype.initView = function () {
        this.vipHeadSp = this.getComponent("leftNode/vipHead", cc.Sprite);
        this.w = this.vipHeadSp.node.width;
        this.h = this.vipHeadSp.node.height;
        this.vipNameLbl = this.getComponent("leftNode/vipNameLbl", cc.Label);
        this.creditNode = this.getChild("leftNode/layout/creditNode");
        this.creditTypeLbl = this.getComponent("leftNode/layout/creditNode/type", cc.RichText);
        this.iconList = [];
        for (var i = 1; i <= 3; i++) {
            var iconNode = this.getChild("rightNode/iconList/icon" + String(i));
            iconNode.active = false;
            this.iconList.push(iconNode);
        }
        this.xingNode = this.getChild("leftNode/layout/xingList");
        this.salesLabel = this.getComponent("rightNode/sales", cc.Label);
        this.getChild('rightNode/payBtn').off('click'); // debug 事件无法直接覆盖
        this.addCommonClick("rightNode/payBtn", this.openVipService, this);
        this.setItemStyle();
    };
    VipItem.prototype.openVipService = function () {
        if (Global.Toolkit.checkRechargeLimited()) {
            return;
        }
        if (this.data.ptype == ServicerModel_1.CustomerEntranceType.QuickPayService) {
            Global.ChatServer.serverType = ServicerModel_1.CustomerEntranceType.QuickPayService;
            Global.ChatServer.userSetting(this.data);
        }
        else {
            var jumpType = this.data.open_type;
            var url = this.data.url;
            switch (jumpType) {
                case 0:
                    if (!url) {
                        Global.UI.fastTip("配置异常");
                        return;
                    }
                    if (String(url).indexOf('http') < 0) {
                        url = "http://" + url;
                    }
                    cc.sys.openURL(Global.Toolkit.DealWithUrl(url));
                    break;
                case 1:
                    Global.UI.show("WndRechargeVipShow", this.data);
                    break;
                case 2:
                    if (!url) {
                        Global.UI.fastTip("配置异常");
                        return;
                    }
                    Global.ChatServer.userSetting(null, url);
                    break;
                case 3:
                    if (!url) {
                        Global.UI.fastTip("配置异常");
                        return;
                    }
                    if (String(url).indexOf('http') < 0) {
                        url = "http://" + url;
                    }
                    url = Global.Toolkit.AssembyUrl(url);
                    cc.sys.openURL(Global.Toolkit.DealWithUrl(url));
                    break;
                default:
                    break;
            }
        }
    };
    VipItem.prototype.setItemStyle = function () {
        this.vipNameLbl.string = Global.Toolkit.substrEndWithElli(this.data.name, 14);
        this.setIconList();
        this.setCredit();
        this.setHead();
        this.setXingXing();
    };
    VipItem.prototype.setIconList = function () {
        var payList = this.data.pay_type || [];
        if (this.data.ptype == ServicerModel_1.CustomerEntranceType.QuickPayService) {
            for (var payKey in payList) {
                var iconIndex = this.payType[payList[payKey]];
                if (iconIndex != null && iconIndex != undefined) {
                    var iconNode = this.iconList[iconIndex];
                    iconNode.active = true;
                }
            }
        }
        else {
            for (var payKey in payList) {
                var iconIndex = this.oldPayType[payList[payKey]];
                if (iconIndex != null && iconIndex != undefined) {
                    var iconNode = this.iconList[iconIndex];
                    iconNode.active = true;
                }
            }
        }
    };
    VipItem.prototype.setCredit = function () {
        var _this = this;
        var extList = this.data.ext_type || [];
        if (extList.length > 0) {
            this.creditNode.active = true;
            var str_1 = "";
            extList.forEach(function (e, index) {
                if (index > 0) {
                    str_1 += '·';
                }
                str_1 += _this.extCfg[e - 1];
            });
            this.creditTypeLbl.string = str_1;
            this.creditNode.width = 50 + extList.length * 60;
        }
        else {
            this.creditNode.active = false;
        }
    };
    VipItem.prototype.setHead = function () {
        var sfName = this.data.head_url || '1';
        // Global.ResourceManager.loadAutoAtlas(this.vipHeadSp, "hall/texture/hall/rechargeCash/rechargeCash", sfName)
        this.vipHeadSp.spriteFrame = Global.Toolkit.getLocalHeadSf(sfName);
        this.vipHeadSp.node.width = this.w;
        this.vipHeadSp.node.height = this.h;
    };
    VipItem.prototype.setXingXing = function () {
        //销量
        // if(this.data.sales){
        //     this.salesLabel.node.active = true;
        //     this.salesLabel.string = `月销${this.data.sales}+`;
        // }else{
        //     this.salesLabel.node.active = false;
        // }
        //星星
        var xingNumber = Number(this.data.xingxing || '0');
        // if(xingNumber > 0){
        //     this.xingNode.active = true;
        // }else{
        //     this.xingNode.active = false;
        // }
        for (var i = 0; i < 5; i++) {
            var iconNode = this.getComponent("leftNode/layout/xingList/xing" + String(i), cc.Sprite);
            if (xingNumber >= 1) {
                Global.ResourceManager.loadAutoAtlas(iconNode, "hall/texture/hall/chat/chat", "f_20", null, false);
            }
            else if (xingNumber > 0) {
                Global.ResourceManager.loadAutoAtlas(iconNode, "hall/texture/hall/chat/chat", "f_19", null, false);
            }
            else {
                Global.ResourceManager.loadAutoAtlas(iconNode, "hall/texture/hall/chat/chat", "f_18", null, false);
            }
            xingNumber = xingNumber - 1;
        }
    };
    VipItem.prototype.setPos = function (x, y) {
        this.node.x = x;
        this.node.y = y;
    };
    return VipItem;
}(ViewBase_1.default));

cc._RF.pop();