
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/VipPayView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcVmlwUGF5Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBaUQ7QUFDakQ7SUFBd0MsOEJBQVE7SUFBaEQ7O0lBd0NBLENBQUM7SUFqQ2EsNkJBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVPLGlDQUFZLEdBQXBCO1FBQ0ksSUFBSSxXQUFXLEdBQUcsVUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUk7WUFDaEMsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3BILENBQUM7SUFFTSxxQ0FBZ0IsR0FBdkIsVUFBd0IsSUFBSTtRQUN4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UUFDVCxvQ0FBb0M7UUFDcEMsSUFBSTtRQUNKLEtBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDbkIsSUFBSSxRQUFRLEdBQWEsSUFBSSxDQUFDLFlBQVksQ0FBQywrQkFBK0IsR0FBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xHLElBQUcsVUFBVSxJQUFJLENBQUMsRUFBQztnQkFDZixNQUFNLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUMsNkJBQTZCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNyRztpQkFBSyxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBQyw2QkFBNkIsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3JHO2lCQUFJO2dCQUNELE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBQyw2QkFBNkIsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3JHO1lBQ0QsVUFBVSxHQUFHLFVBQVUsR0FBRSxDQUFDLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBQ00sd0JBQU0sR0FBYixVQUFjLENBQVMsRUFBRSxDQUFTO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQS9MQSxBQStMQyxDQS9McUIsa0JBQVEsR0ErTDdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpcFBheVZpZXcgZXh0ZW5kcyBWaWV3QmFzZXtcclxuICAgIHByaXZhdGUgY29weU5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHN2Q29udGVudDogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgc3Y6IGNjLlNjcm9sbFZpZXc7XHJcbiAgICBwcml2YXRlIG1vZGVsOiBSZWNoYXJnZU1vZGVsO1xyXG4gICAgcHJpdmF0ZSBsaXN0VmlldzogYW55O1xyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUmVjaGFyZ2VNb2RlbFwiKTtcclxuICAgICAgICB0aGlzLnN2ID0gdGhpcy5nZXRDb21wb25lbnQoXCJzY3JvbGxWaWV3XCIsIGNjLlNjcm9sbFZpZXcpO1xyXG4gICAgICAgIHRoaXMuc3ZDb250ZW50ID0gdGhpcy5nZXRDaGlsZChcInNjcm9sbFZpZXcvdmlldy9jb250ZW50XCIpO1xyXG4gICAgICAgIHRoaXMuY29weU5vZGUgPSB0aGlzLmdldENoaWxkKFwic2Nyb2xsVmlldy92aWV3L2NvbnRlbnQvdmlwSXRlbVwiKTtcclxuICAgICAgICB0aGlzLmNvcHlOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW5pdExpc3RWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0TGlzdFZpZXcoKXtcclxuICAgICAgICBsZXQgaXRlbV9zZXR0ZXIgPSAoaXRlbSwgaW5kZXgsIGRhdGEpID0+e1xyXG4gICAgICAgICAgICBuZXcgVmlwSXRlbShpdGVtLCBkYXRhKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RWaWV3ID0gR2xvYmFsLlVJSGVscGVyLmFkZFNjcm9sbFZpZXdDYXJtYWNrQ29tcCh0aGlzLnN2Lm5vZGUsIHRoaXMuY29weU5vZGUsIDEwLCAwLCB0aGlzLCBpdGVtX3NldHRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNjcm9sbFZpZXcobGlzdCl7XHJcbiAgICAgICAgbGV0IGRhdGFBcnI6IEFycmF5PGFueT4gPSBsaXN0IHx8IFtdO1xyXG4gICAgICAgIHRoaXMubGlzdFZpZXcuY2xlYXJWaWV3KCk7XHJcbiAgICAgICAgaWYgKCFHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KGRhdGFBcnIpKXsgICBcclxuICAgICAgICAgICAgdGhpcy5saXN0Vmlldy5hbGxEYXRhcyA9IEdsb2JhbC5Ub29sa2l0LmdldE91dE9yZGVyQXJyYXkoZGF0YUFycik7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFZpZXcudXBkYXRlVmlldygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TdWJWaWV3U2hvdygpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TdWJWaWV3SGlkZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuaW1wb3J0IFJlY2hhcmdlTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvUmVjaGFyZ2VNb2RlbFwiO1xyXG5pbXBvcnQgQXBwSGVscGVyIGZyb20gXCIuLi8uLi8uLi9jb3JlL3Rvb2wvQXBwSGVscGVyXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyRW50cmFuY2VUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvU2VydmljZXJNb2RlbFwiO1xyXG5cclxuY2xhc3MgVmlwSXRlbSBleHRlbmRzIFZpZXdCYXNle1xyXG4gICAgcHJpdmF0ZSB2aXBIZWFkU3A6IGNjLlNwcml0ZTtcclxuICAgIHByaXZhdGUgdmlwTmFtZUxibDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIGljb25MaXN0OiBBcnJheTxjYy5Ob2RlPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBjcmVkaXROb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBjcmVkaXRUeXBlTGJsOiBjYy5SaWNoVGV4dDtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSB4aW5nTm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgc2FsZXNMYWJlbDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIGV4dENmZyA9IFtcclxuICAgICAgICBcIuiKseWRl1wiLFxyXG4gICAgICAgIFwi5L+h55So5Y2hXCIsXHJcbiAgICAgICAgXCJxcemSseWMhVwiXHJcbiAgICBdXHJcbiAgICBwcml2YXRlIHBheVR5cGUgPXtcclxuICAgICAgICAxMDAwOjEsIC8v5pSv5LuY5a6dXHJcbiAgICAgICAgMTAwMTowLCAvL+W+ruS/oVxyXG4gICAgICAgIDEwMDI6MiwgLy/pk7booYzljaFcclxuICAgIH1cclxuICAgIHByaXZhdGUgb2xkUGF5VHlwZSA9e1xyXG4gICAgICAgIDE6MSwgLy/mlK/ku5jlrp1cclxuICAgICAgICAyOjAsIC8v5b6u5L+hXHJcbiAgICAgICAgMzoyIC8v6ZO26KGM5Y2hXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHc6IG51bWJlcjtcclxuICAgIHByaXZhdGUgaDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUsIHByaXZhdGUgZGF0YTogYW55KXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICB0aGlzLnZpcEhlYWRTcCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwibGVmdE5vZGUvdmlwSGVhZFwiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMudyA9IHRoaXMudmlwSGVhZFNwLm5vZGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5oID0gdGhpcy52aXBIZWFkU3Aubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy52aXBOYW1lTGJsID0gdGhpcy5nZXRDb21wb25lbnQoXCJsZWZ0Tm9kZS92aXBOYW1lTGJsXCIsIGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmNyZWRpdE5vZGUgPSB0aGlzLmdldENoaWxkKFwibGVmdE5vZGUvbGF5b3V0L2NyZWRpdE5vZGVcIik7XHJcbiAgICAgICAgdGhpcy5jcmVkaXRUeXBlTGJsID0gdGhpcy5nZXRDb21wb25lbnQoXCJsZWZ0Tm9kZS9sYXlvdXQvY3JlZGl0Tm9kZS90eXBlXCIsIGNjLlJpY2hUZXh0KTtcclxuXHJcbiAgICAgICAgdGhpcy5pY29uTGlzdCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGk9MTsgaTw9IDM7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpY29uTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJyaWdodE5vZGUvaWNvbkxpc3QvaWNvblwiKyBTdHJpbmcoaSkpO1xyXG4gICAgICAgICAgICBpY29uTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pY29uTGlzdC5wdXNoKGljb25Ob2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy54aW5nTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJsZWZ0Tm9kZS9sYXlvdXQveGluZ0xpc3RcIik7XHJcbiAgICAgICAgdGhpcy5zYWxlc0xhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJyaWdodE5vZGUvc2FsZXNcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuZ2V0Q2hpbGQoJ3JpZ2h0Tm9kZS9wYXlCdG4nKS5vZmYoJ2NsaWNrJyk7IC8vIGRlYnVnIOS6i+S7tuaXoOazleebtOaOpeimhuebllxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJyaWdodE5vZGUvcGF5QnRuXCIsIHRoaXMub3BlblZpcFNlcnZpY2UsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2V0SXRlbVN0eWxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvcGVuVmlwU2VydmljZSgpe1xyXG5cclxuICAgICAgICBpZihHbG9iYWwuVG9vbGtpdC5jaGVja1JlY2hhcmdlTGltaXRlZCgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuZGF0YS5wdHlwZSA9PSBDdXN0b21lckVudHJhbmNlVHlwZS5RdWlja1BheVNlcnZpY2Upe1xyXG4gICAgICAgICAgICBHbG9iYWwuQ2hhdFNlcnZlci5zZXJ2ZXJUeXBlID0gQ3VzdG9tZXJFbnRyYW5jZVR5cGUuUXVpY2tQYXlTZXJ2aWNlO1xyXG4gICAgICAgICAgICBHbG9iYWwuQ2hhdFNlcnZlci51c2VyU2V0dGluZyh0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGp1bXBUeXBlID0gdGhpcy5kYXRhLm9wZW5fdHlwZTtcclxuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuZGF0YS51cmw7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoanVtcFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIumFjee9ruW8guW4uFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoU3RyaW5nKHVybCkuaW5kZXhPZignaHR0cCcpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBcImh0dHA6Ly9cIiArIHVybDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzLm9wZW5VUkwoR2xvYmFsLlRvb2xraXQuRGVhbFdpdGhVcmwodXJsKSlcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kUmVjaGFyZ2VWaXBTaG93XCIsIHRoaXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF1cmwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLphY3nva7lvILluLhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkNoYXRTZXJ2ZXIudXNlclNldHRpbmcobnVsbCwgdXJsKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIumFjee9ruW8guW4uFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoU3RyaW5nKHVybCkuaW5kZXhPZignaHR0cCcpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBcImh0dHA6Ly9cIiArIHVybDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gR2xvYmFsLlRvb2xraXQuQXNzZW1ieVVybCh1cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzLm9wZW5VUkwoR2xvYmFsLlRvb2xraXQuRGVhbFdpdGhVcmwodXJsKSlcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0SXRlbVN0eWxlKCl7XHJcbiAgICAgICAgdGhpcy52aXBOYW1lTGJsLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LnN1YnN0ckVuZFdpdGhFbGxpKHRoaXMuZGF0YS5uYW1lLCAxNCk7XHJcbiAgICAgICAgdGhpcy5zZXRJY29uTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuc2V0Q3JlZGl0KCk7XHJcbiAgICAgICAgdGhpcy5zZXRIZWFkKCk7XHJcbiAgICAgICAgdGhpcy5zZXRYaW5nWGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0SWNvbkxpc3QoKXtcclxuICAgICAgICBsZXQgcGF5TGlzdCA9IHRoaXMuZGF0YS5wYXlfdHlwZSB8fCBbXTtcclxuICAgICAgICBpZih0aGlzLmRhdGEucHR5cGUgPT0gQ3VzdG9tZXJFbnRyYW5jZVR5cGUuUXVpY2tQYXlTZXJ2aWNlKXtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBwYXlLZXkgaW4gcGF5TGlzdCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGljb25JbmRleCA9IHRoaXMucGF5VHlwZVtwYXlMaXN0W3BheUtleV1dO1xyXG4gICAgICAgICAgICAgICAgaWYoaWNvbkluZGV4ICE9bnVsbCAmJiBpY29uSW5kZXggIT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpY29uTm9kZSA9IHRoaXMuaWNvbkxpc3RbaWNvbkluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpY29uTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgcGF5S2V5IGluIHBheUxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpY29uSW5kZXggPSB0aGlzLm9sZFBheVR5cGVbcGF5TGlzdFtwYXlLZXldXTtcclxuICAgICAgICAgICAgICAgIGlmKGljb25JbmRleCAhPW51bGwgJiYgaWNvbkluZGV4ICE9dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWNvbk5vZGUgPSB0aGlzLmljb25MaXN0W2ljb25JbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldENyZWRpdCgpe1xyXG4gICAgICAgIGxldCBleHRMaXN0ID0gdGhpcy5kYXRhLmV4dF90eXBlIHx8IFtdO1xyXG4gICAgICAgIGlmIChleHRMaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICB0aGlzLmNyZWRpdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHN0ciA9IFwiXCI7XHJcbiAgICAgICAgICAgIGV4dExpc3QuZm9yRWFjaCgoZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSAnwrcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RyICs9IHRoaXMuZXh0Q2ZnW2UtMV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWRpdFR5cGVMYmwuc3RyaW5nID0gc3RyO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWRpdE5vZGUud2lkdGggPSA1MCArIGV4dExpc3QubGVuZ3RoICogNjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlZGl0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRIZWFkKCl7XHJcbiAgICAgICAgbGV0IHNmTmFtZSA9IHRoaXMuZGF0YS5oZWFkX3VybCB8fCAnMSc7XHJcbiAgICAgICAgLy8gR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMudmlwSGVhZFNwLCBcImhhbGwvdGV4dHVyZS9oYWxsL3JlY2hhcmdlQ2FzaC9yZWNoYXJnZUNhc2hcIiwgc2ZOYW1lKVxyXG4gICAgICAgIHRoaXMudmlwSGVhZFNwLnNwcml0ZUZyYW1lID0gR2xvYmFsLlRvb2xraXQuZ2V0TG9jYWxIZWFkU2Yoc2ZOYW1lKVxyXG4gICAgICAgIHRoaXMudmlwSGVhZFNwLm5vZGUud2lkdGggPSB0aGlzLnc7XHJcbiAgICAgICAgdGhpcy52aXBIZWFkU3Aubm9kZS5oZWlnaHQgPSB0aGlzLmg7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNldFhpbmdYaW5nKCl7XHJcbiAgICAgICAgLy/plIDph49cclxuICAgICAgICAvLyBpZih0aGlzLmRhdGEuc2FsZXMpe1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNhbGVzTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNhbGVzTGFiZWwuc3RyaW5nID0gYOaciOmUgCR7dGhpcy5kYXRhLnNhbGVzfStgO1xyXG4gICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNhbGVzTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy/mmJ/mmJ9cclxuICAgICAgICBsZXQgeGluZ051bWJlciA9IE51bWJlcih0aGlzLmRhdGEueGluZ3hpbmcgfHwgJzAnKTtcclxuICAgICAgICAvLyBpZih4aW5nTnVtYmVyID4gMCl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMueGluZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy54aW5nTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPDU7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpY29uTm9kZTpjYy5TcHJpdGUgPSB0aGlzLmdldENvbXBvbmVudChcImxlZnROb2RlL2xheW91dC94aW5nTGlzdC94aW5nXCIrIFN0cmluZyhpKSwgY2MuU3ByaXRlKTtcclxuICAgICAgICAgICAgaWYoeGluZ051bWJlciA+PSAxKXtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyhpY29uTm9kZSxcImhhbGwvdGV4dHVyZS9oYWxsL2NoYXQvY2hhdFwiLCBcImZfMjBcIiwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZiggeGluZ051bWJlciA+IDApe1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKGljb25Ob2RlLFwiaGFsbC90ZXh0dXJlL2hhbGwvY2hhdC9jaGF0XCIsIFwiZl8xOVwiLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKGljb25Ob2RlLFwiaGFsbC90ZXh0dXJlL2hhbGwvY2hhdC9jaGF0XCIsIFwiZl8xOFwiLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgeGluZ051bWJlciA9IHhpbmdOdW1iZXIgLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldFBvcyh4OiBudW1iZXIsIHk6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5ub2RlLnggPSB4O1xyXG4gICAgICAgIHRoaXMubm9kZS55ID0geTtcclxuICAgIH1cclxufSJdfQ==