
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/RechargePayView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1f0d0NiQTJBJ4W0qDF7TjLv', 'RechargePayView');
// hall/scripts/logic/hall/ui/recharge/RechargePayView.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleItem = void 0;
var ViewBase_1 = require("../../../core/ui/ViewBase");
var RechargeModel_1 = require("../../../hallcommon/model/RechargeModel");
var VipPayView_1 = require("./VipPayView");
var OlPayView_1 = require("./OlPayView");
var ServicerModel_1 = require("../../../hallcommon/model/ServicerModel");
var RechargeOnlineView_1 = require("./RechargeOnlineView");
var HallModel_1 = require("../../../hallcommon/model/HallModel");
var RechargePayView = /** @class */ (function (_super) {
    __extends(RechargePayView, _super);
    function RechargePayView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
          * 头像框
          */
        _this.headKuang = null;
        _this.toggleList = [];
        _this.payCfgMap = {};
        //赠送入款专区特殊处理（原vip入款）
        //充值列表
        //private rechargeListView: RechargeListView;
        _this.subViewPath = {
            "vipPayView": "hall/prefabs/ui/Recharge/subView/pay/vipPayView",
            "olPayView": "hall/prefabs/ui/Recharge/subView/pay/olPayView",
            "rechargeOnlineView": "hall/prefabs/ui/Recharge/subView/pay/onlinePayView"
        };
        _this.viewKeyTypeMap = {
            "vipPayView": VipPayView_1.default,
            "olPayView": OlPayView_1.default,
            "rechargeOnlineView": RechargeOnlineView_1.default,
        };
        _this.curPaynum = 0;
        _this.payCfgList = [];
        return _this;
    }
    RechargePayView.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("RechargeModel");
        this.subViewParentNode = this.getChild("descLayout");
        // this.vipPayView = <VipPayView>this.addView("VipPayView", this.getChild("descLayout/vipPayView"), VipPayView, false);
        // this.olPayView = <OlPayView>this.addView("OlPayView", this.getChild("descLayout/olPayView"), OlPayView, false);
        // this.rechargeOnlineView = <RechargeOnlineView>this.addView("RechargeOnlineView", this.getChild("descLayout/onlinePayView"), RechargeOnlineView, false);
        this.idLbl = this.getComponent("descLayout/payDesc/userInfo/idRoot/idLbl", cc.Label);
        this.idLbl.string = String(Global.PlayerData.uid);
        this.headSprite = this.getComponent("descLayout/payDesc/headImg", cc.Sprite);
        this.headKuang = this.getComponent("descLayout/payDesc/headImg/headFrame", cc.Sprite);
        this.copyBtn = this.getChild("descLayout/payDesc/userInfo/idRoot/copyBtn");
        this.addCommonClick("descLayout/payDesc/userInfo/idRoot/copyBtn", this.copyIDClick, this);
        this.tipsLbl = this.getComponent("descLayout/payDesc/userInfo/tipsRoot/tipsLbl", cc.Label);
        this.tipSprite = this.getComponent("descLayout/payDesc/userInfo/tipsRoot/tipSprite", cc.Sprite);
        this.bgBig = this.getChild("bg1");
        console.log(this.bgBig);
        console.log("1111111111111");
        // this.tipSprite = this.getChild("descLayout/payDesc/userInfo/tipsRoot/tipSprite");
        this.downloadBtn = this.getChild('descLayout/payDesc/userInfo/downloadBtn');
        this.kefuSpot = this.getChild('descLayout/payDesc/userInfo/downloadBtn/hongdian');
        this.kefuSpot.active = false;
        this.downloadBtn.active = false;
        this.addCommonClick('descLayout/payDesc/userInfo/downloadBtn', this.gotoDownload, this);
        this.chatBtn = this.getChild('descLayout/payDesc/userInfo/chatBtn');
        this.chatSpot = this.getChild('descLayout/payDesc/userInfo/chatBtn/hongdian');
        this.chatSpot.active = false;
        this.chatBtn.active = false;
        this.addCommonClick('descLayout/payDesc/userInfo/chatBtn', this.gotoAiteChat, this);
        this.uploadBtn = this.getChild('descLayout/payDesc/uploadBtn');
        if (this.uploadBtn) {
            this.uploadBtn.active = false;
        }
        this.addCommonClick('descLayout/payDesc/uploadBtn', this.OnUploadBtnClicked, this);
        // tab滚动条
        this.tabView = this.getChild('descLayout/toggleSv').getComponent(cc.ScrollView);
        this.tabView.node.active = true;
        this.copyToggle = this.getChild("descLayout/toggleSv/view/btnLayout/toggle_1");
        this.btnLayout = this.getComponent("descLayout/toggleSv/view/btnLayout", cc.Layout);
        this.btnLayout.node.active = true;
        this.copyToggle.active = false;
        // this.bg2 = this.getChild("bg2")
        this.initSubViewClass(this.viewKeyTypeMap);
        this.InitScripts();
        //this.rechargeListView = <RechargeListView>this.addView("RechargeListView", this.getChild("payList"), RechargeListView, false);
    };
    RechargePayView.prototype.InitScripts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initSubView(this.subViewPath, this.viewKeyTypeMap, this.subViewParentNode)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RechargePayView.prototype.OnUploadBtnClicked = function () {
        var model = Global.ModelManager.getModel("ServicerModel");
        if (model) {
            model.enterCustomerService(ServicerModel_1.CustomerEntranceType.HallService);
        }
    };
    RechargePayView.prototype.onSubViewShow = function () {
        this.idLbl.string = String(Global.PlayerData.uid);
        this.updateUserHead();
        this.model.on("UpdateResSpot", this, this.updateResSpot);
    };
    RechargePayView.prototype.updateResSpot = function (redSpotType) {
        switch (redSpotType) {
            case HallModel_1.HallRedSpotType.YunPalyKefu:
                {
                    if (Global.ChatServer.serverType == ServicerModel_1.CustomerEntranceType.QuickPayService) {
                        this.chatSpot.active = this.model.chatSpot;
                    }
                    else {
                        this.kefuSpot.active = this.model.kefuSpot;
                    }
                    break;
                }
        }
    };
    RechargePayView.prototype.updateUserHead = function () {
        var playerData = Global.PlayerData;
        var headImg = this.headSprite;
        if (headImg.node) {
            var w = headImg.node.width, h = headImg.node.height;
            headImg.spriteFrame = Global.Toolkit.getLocalHeadSf(playerData.headimg);
            headImg.node.width = w;
            headImg.node.height = h;
        }
        // if (this.headKuang && this.headKuang.node && this.headKuang.node.isValid) {
        //     Global.Toolkit.loadLocalHeadFrame(this.headKuang, playerData.headkuang);
        // }
    };
    RechargePayView.prototype.onSubViewHide = function () {
        this.model.off("UpdateResSpot", this, this.updateResSpot);
    };
    RechargePayView.prototype.onDispose = function () {
        this.model.off("UpdateResSpot", this, this.updateResSpot);
    };
    RechargePayView.prototype.showView = function (viewStr) {
        this.payCfgMap = this.model.getPayMapData();
        if (!this.payCfgMap || Global.Toolkit.isEmptyObject(this.payCfgMap)) {
            return;
        }
        if (viewStr) {
            this.curViewStr = viewStr;
        }
        this.uploadBtn.active = false;
        this.setCurDescStyle(viewStr);
        //this.rechargeListView.active = false;
        //赠送入款专区特殊处理（原vip入款）
        //   this.vipTipSprite.active = this.curViewStr == RechargeModel.PayType.Vip;
        //赠送入款专区特殊处理（原vip入款）
        if (this.curViewStr == RechargeModel_1.default.PayType.Vip || this.curViewStr == RechargeModel_1.default.PayType.VipQuickPay || this.curViewStr == RechargeModel_1.default.PayType.Dpay) {
            this.vipPayView.subViewState = true;
            this.olPayView.subViewState = false;
            this.rechargeOnlineView.subViewState = false;
            this.vipPayView.updateScrollView(this.payCfgMap[this.curViewStr][0].data);
            this.copyBtn.active = true;
            this.downloadBtn.active = false;
            this.chatBtn.active = false;
            if (this.curViewStr == RechargeModel_1.default.PayType.VipQuickPay) {
                this.chatBtn.active = true;
                this.chatSpot.active = this.model.chatSpot;
            }
        }
        else if (this.curViewStr == RechargeModel_1.default.PayType.OnlinePay) {
            this.vipPayView.subViewState = false;
            this.olPayView.subViewState = false;
            this.rechargeOnlineView.subViewState = true;
            this.rechargeOnlineView.initData(this.payCfgMap[this.curViewStr][0]);
            this.copyBtn.active = true;
            this.downloadBtn.active = false;
            this.chatBtn.active = false;
        }
        // else if (this.curViewStr == RechargeModel.PayType.RechargeList) {
        //     this.rechargeListView.active = true;
        //     this.rechargeListView.onOpenRecharge(true);
        //     return;
        // } 
        else {
            this.rechargeOnlineView.subViewState = false;
            this.vipPayView.subViewState = false;
            this.olPayView.subViewState = true;
            this.chatBtn.active = false;
            if (this.curViewStr == RechargeModel_1.default.PayType.ScanCode) {
                this.uploadBtn.active = true;
            }
            switch (this.curViewStr) {
                case RechargeModel_1.default.PayType.Union:
                    this.copyBtn.active = true;
                    this.downloadBtn.active = false;
                    break;
                case RechargeModel_1.default.PayType.YunPay:
                    this.copyBtn.active = false;
                    this.downloadBtn.active = true;
                    this.kefuSpot.active = this.model.kefuSpot;
                    break;
                default:
                    this.copyBtn.active = false;
                    this.downloadBtn.active = false;
            }
        }
        this.showBankPayTab();
    };
    RechargePayView.prototype.setCurDescStyle = function (viewStr) {
        this.tipSprite.node.active = false;
        this.tipsLbl.node.active = true;
        if (viewStr == RechargeModel_1.default.PayType.International) { //海外充值特有提示
            this.tipsLbl.string = "";
            this.tipsLbl.node.active = false;
            this.tipSprite.node.active = true;
        }
        if (this.payCfgMap[viewStr][0].dest == null || this.payCfgMap[viewStr][0].dest == undefined) {
            this.tipsLbl.string = "";
        }
        else {
            this.tipsLbl.string = this.payCfgMap[viewStr][0].dest;
        }
    };
    // 设置标题是否显示
    RechargePayView.prototype.showBankPayTab = function () {
        if (this.curViewStr !== RechargeModel_1.default.PayType.Vip && this.curViewStr !== RechargeModel_1.default.PayType.VipQuickPay &&
            this.curViewStr !== RechargeModel_1.default.PayType.OnlinePay && this.curViewStr !== RechargeModel_1.default.PayType.Dpay) {
            this.tabView.node.active = true;
            this.initToggleList();
            this.bgBig.active = false;
            // this.subViewParentNode.y = 270;
            // this.bg2.active = false;
            // this.bg.active = true;
        }
        else {
            this.tabView.node.active = false;
            this.bgBig.active = true;
            // this.subViewParentNode.y = 248;
            // this.bg2.active = true;
            // this.bg.active = false;
        }
    };
    RechargePayView.prototype.copyIDClick = function () {
        Global.NativeEvent.copyTextToClipboard(String(Global.PlayerData.uid), this.copyTextToClipboardCallBack.bind(this));
    };
    RechargePayView.prototype.copyTextToClipboardCallBack = function (retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("已复制到剪贴板");
        }
        else {
            Global.UI.fastTip("复制失败");
        }
    };
    RechargePayView.prototype.gotoDownload = function () {
        // let servicerModel = <ServicerModel>Global.ModelManager.getModel('ServicerModel');
        // servicerModel.showServices(ServiceEntranceType.YunpayDownload);
    };
    RechargePayView.prototype.gotoAiteChat = function () {
        // 默认选择充值方式最多的客服进入
        Global.ChatServer.serverType = ServicerModel_1.CustomerEntranceType.QuickPayService;
        if (Global.ChatServer.QuickData) {
            Global.ChatServer.userSetting(Global.ChatServer.QuickData);
        }
        else {
            var list = this.payCfgMap[this.curViewStr][0].data;
            var data = { pay_type: [] };
            for (var i = 0; i < list.length; i++) {
                var data2 = list[i];
                if (data2.pay_type.length > data.pay_type.length) {
                    data = data2;
                }
            }
            Global.ChatServer.userSetting(data);
        }
    };
    RechargePayView.prototype.initToggleList = function () {
        this.payCfgList = this.payCfgMap[this.curViewStr][0].data;
        if (this.payCfgMap[this.curViewStr][0].rand_sort === 0)
            this.payCfgList = Global.Toolkit.getOutOrderArray(this.payCfgList);
        this.recycleToggleList();
        this.curPaynum = 0;
        var isForceSelect = true;
        this.olPayView.hideAllItems();
        if (this.payCfgList) {
            for (var i = 0; i < this.payCfgList.length; i++) {
                var item = this.toggleList[i];
                if (!item) {
                    var node = cc.instantiate(this.copyToggle);
                    node.setParent(this.btnLayout.node);
                    item = new ToggleItem(node, this.onToggleClick, this);
                    this.toggleList.push(item);
                }
                item.bg.string = this.payCfgList[i].name;
                item.checkBg.string = this.payCfgList[i].name;
                item.active = true;
                item.setItemStyle(i);
                if (this.curPaynum == i) { // 设置当前页签
                    isForceSelect = false;
                    item.setToggleChecked(true);
                    this.olPayView.initData(this.curViewStr, this.payCfgList[this.curPaynum]);
                    if (this.payCfgList[this.curPaynum].tip != "") {
                        this.tipsLbl.string = this.payCfgList[this.curPaynum].tip;
                    }
                }
            }
            if (!Global.Toolkit.isEmptyObject(this.payCfgList) && isForceSelect) {
                this.curPaynum = 0;
            }
            this.tabView.scrollToLeft();
        }
    };
    RechargePayView.prototype.onToggleClick = function (num) {
        var numTag = num;
        if (numTag == this.curPaynum)
            return;
        this.curPaynum = numTag;
        this.olPayView.initData(this.curViewStr, this.payCfgList[this.curPaynum]);
        if (this.payCfgList[this.curPaynum].tip != "") {
            this.tipsLbl.string = this.payCfgList[this.curPaynum].tip;
        }
    };
    RechargePayView.prototype.recycleToggleList = function () {
        this.toggleList.forEach(function (element) {
            element.active = false;
        });
    };
    return RechargePayView;
}(ViewBase_1.default));
exports.default = RechargePayView;
var ToggleItem = /** @class */ (function (_super) {
    __extends(ToggleItem, _super);
    function ToggleItem(node, callback, target) {
        var _this = _super.call(this) || this;
        _this.callback = callback;
        _this.target = target;
        _this.itemkey = 0;
        _this.setNode(node);
        return _this;
    }
    ToggleItem.prototype.initView = function () {
        this.bg = this.getComponent("check_close/bg", cc.Label);
        this.checkBg = this.getComponent("check_open/bg", cc.Label);
        this.addCommonClick("", this.onItemClick, this, null);
        this.toggleComp = this.getComponent("", cc.Toggle);
    };
    ToggleItem.prototype.onItemClick = function () {
        if (this.callback) {
            this.callback.call(this.target, this.itemkey);
        }
    };
    ToggleItem.prototype.setItemStyle = function (num) {
        this.itemkey = num;
    };
    ToggleItem.prototype.setToggleChecked = function (flag) {
        if (flag)
            this.toggleComp.check();
        else
            this.toggleComp.uncheck();
    };
    return ToggleItem;
}(ViewBase_1.default));
exports.ToggleItem = ToggleItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcUmVjaGFyZ2VQYXlWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBaUQ7QUFDakQseUVBQW9FO0FBQ3BFLDJDQUFzQztBQUN0Qyx5Q0FBb0M7QUFDcEMseUVBQThGO0FBQzlGLDJEQUFzRDtBQUV0RCxpRUFBc0U7QUFFdEU7SUFBNkMsbUNBQVE7SUFBckQ7UUFBQSxxRUE4VkM7UUF0Vkc7O1lBRUk7UUFDSSxlQUFTLEdBQWMsSUFBSSxDQUFDO1FBSzVCLGdCQUFVLEdBQUcsRUFBRSxDQUFDO1FBUWhCLGVBQVMsR0FBRyxFQUFFLENBQUM7UUFXckIsb0JBQW9CO1FBRXRCLE1BQU07UUFDTiw2Q0FBNkM7UUFFckMsaUJBQVcsR0FBUTtZQUN2QixZQUFZLEVBQUMsaURBQWlEO1lBQzlELFdBQVcsRUFBQyxnREFBZ0Q7WUFDNUQsb0JBQW9CLEVBQUMsb0RBQW9EO1NBQzVFLENBQUE7UUFFTyxvQkFBYyxHQUFRO1lBQzFCLFlBQVksRUFBQyxvQkFBVTtZQUN2QixXQUFXLEVBQUMsbUJBQVM7WUFDckIsb0JBQW9CLEVBQUMsNEJBQWtCO1NBQzFDLENBQUE7UUFNTyxlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsZ0JBQVUsR0FBRyxFQUFFLENBQUM7O0lBcVM1QixDQUFDO0lBcFNhLGtDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUNwRCx1SEFBdUg7UUFDdkgsa0hBQWtIO1FBQ2xILDBKQUEwSjtRQUUxSixJQUFJLENB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QUFPLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUwsaUJBQUM7QUFBRCxDQWxDQSxBQWtDQyxDQWxDK0Isa0JBQVEsR0FrQ3ZDO0FBbENZLGdDQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBSZWNoYXJnZU1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1JlY2hhcmdlTW9kZWxcIjtcclxuaW1wb3J0IFZpcFBheVZpZXcgZnJvbSBcIi4vVmlwUGF5Vmlld1wiO1xyXG5pbXBvcnQgT2xQYXlWaWV3IGZyb20gXCIuL09sUGF5Vmlld1wiO1xyXG5pbXBvcnQgU2VydmljZXJNb2RlbCwgeyBDdXN0b21lckVudHJhbmNlVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1NlcnZpY2VyTW9kZWxcIjtcclxuaW1wb3J0IFJlY2hhcmdlT25saW5lVmlldyBmcm9tIFwiLi9SZWNoYXJnZU9ubGluZVZpZXdcIjtcclxuaW1wb3J0IFJlY2hhcmdlTGlzdFZpZXcgZnJvbSBcIi4vUmVjaGFyZ2VMaXN0Vmlld1wiO1xyXG5pbXBvcnQgeyBIYWxsUmVkU3BvdFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9IYWxsTW9kZWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY2hhcmdlUGF5VmlldyBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIHJlY2hhcmdlT25saW5lVmlldzogUmVjaGFyZ2VPbmxpbmVWaWV3O1xyXG4gICAgcHJpdmF0ZSB2aXBQYXlWaWV3OiBWaXBQYXlWaWV3O1xyXG4gICAgcHJpdmF0ZSBvbFBheVZpZXc6IE9sUGF5VmlldztcclxuICAgIHByaXZhdGUgaWRMYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBoZWFkU3ByaXRlOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIHN1YlZpZXdQYXJlbnROb2RlIDpjYy5Ob2RlXHJcbiAgICAvKipcclxuICAgICAgKiDlpLTlg4/moYZcclxuICAgICAgKi9cclxuICAgIHByaXZhdGUgaGVhZEt1YW5nOiBjYy5TcHJpdGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSB0aXBzTGJsOiBjYy5MYWJlbDsvL+WFheWAvOaPkOekuuaWh+acrFxyXG4gICAgcHJpdmF0ZSB0aXBTcHJpdGU6IGNjLlNwcml0ZTsvL+WFheWAvOaPkOekuuWbvueJh++8iOa1t+WkluWFheWAvOeJueacieaPkOekuu+8jOebruWJjeS4jeWFgeiuuOmFjee9ru+8iVxyXG4gICAgLy8gdGFi5rua5Yqo5p2hXHJcbiAgICBwcml2YXRlIGNvcHlUb2dnbGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHRvZ2dsZUxpc3QgPSBbXTtcclxuICAgIHByaXZhdGUgYnRuTGF5b3V0OiBjYy5MYXlvdXQ7XHJcbiAgICBwcml2YXRlIHRhYlZpZXc6IGNjLlNjcm9sbFZpZXc7XHJcblxyXG4gICAgcHJpdmF0ZSBiZ0JpZzogY2MuTm9kZTtcclxuXHJcbiAgICBwcml2YXRlIG1vZGVsOiBSZWNoYXJnZU1vZGVsO1xyXG4gICAgcHJpdmF0ZSBjdXJWaWV3U3RyOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHBheUNmZ01hcCA9IHt9O1xyXG4gICAgcHJpdmF0ZSBjb3B5QnRuOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBkb3dubG9hZEJ0bjogY2MuTm9kZTtcclxuICAgIHByaXZhdGUga2VmdVNwb3Q6Y2MuTm9kZTsgLy/kupHpl6rku5jlrqLmnI3lsI/nuqLngrlcclxuICAgIHByaXZhdGUgY2hhdEJ0bjogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgY2hhdFNwb3Q6Y2MuTm9kZTsgLy/lrqLmnI3lsI/nuqLngrlcclxuXHJcbiAgICBwcml2YXRlIHVwbG9hZEJ0bjpjYy5Ob2RlXHJcblxyXG4gICAgICAvL+i1oOmAgeWFpeasvuS4k+WMuueJueauiuWkhOeQhu+8iOWOn3ZpcOWFpeasvu+8iVxyXG4gICAgICBwcml2YXRlIHZpcFRpcFNwcml0ZTpjYy5Ob2RlO1xyXG4gICAgICAvL+i1oOmAgeWFpeasvuS4k+WMuueJueauiuWkhOeQhu+8iOWOn3ZpcOWFpeasvu+8iVxyXG4gIFxyXG4gICAgLy/lhYXlgLzliJfooahcclxuICAgIC8vcHJpdmF0ZSByZWNoYXJnZUxpc3RWaWV3OiBSZWNoYXJnZUxpc3RWaWV3O1xyXG5cclxuICAgIHByaXZhdGUgc3ViVmlld1BhdGggOmFueSA9IHtcclxuICAgICAgICBcInZpcFBheVZpZXdcIjpcImhhbGwvcHJlZmFicy91aS9SZWNoYXJnZS9zdWJWaWV3L3BheS92aXBQYXlWaWV3XCIsXHJcbiAgICAgICAgXCJvbFBheVZpZXdcIjpcImhhbGwvcHJlZmFicy91aS9SZWNoYXJnZS9zdWJWaWV3L3BheS9vbFBheVZpZXdcIixcclxuICAgICAgICBcInJlY2hhcmdlT25saW5lVmlld1wiOlwiaGFsbC9wcmVmYWJzL3VpL1JlY2hhcmdlL3N1YlZpZXcvcGF5L29ubGluZVBheVZpZXdcIlxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmlld0tleVR5cGVNYXAgOmFueSA9IHtcclxuICAgICAgICBcInZpcFBheVZpZXdcIjpWaXBQYXlWaWV3LFxyXG4gICAgICAgIFwib2xQYXlWaWV3XCI6T2xQYXlWaWV3LFxyXG4gICAgICAgIFwicmVjaGFyZ2VPbmxpbmVWaWV3XCI6UmVjaGFyZ2VPbmxpbmVWaWV3LFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGJnOmNjLk5vZGVcclxuICAgIC8v5bimdGFiYmFy55qE6IOM5pmvXHJcbiAgICBwcml2YXRlIGJnMjogY2MuTm9kZTsgXHJcbiAgICBwcml2YXRlIGN1clBheW51bSA9IDA7XHJcbiAgICBwcml2YXRlIHBheUNmZ0xpc3QgPSBbXTtcclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlJlY2hhcmdlTW9kZWxcIik7XHJcbiAgICAgICAgdGhpcy5zdWJWaWV3UGFyZW50Tm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJkZXNjTGF5b3V0XCIpXHJcbiAgICAgICAgLy8gdGhpcy52aXBQYXlWaWV3ID0gPFZpcFBheVZpZXc+dGhpcy5hZGRWaWV3KFwiVmlwUGF5Vmlld1wiLCB0aGlzLmdldENoaWxkKFwiZGVzY0xheW91dC92aXBQYXlWaWV3XCIpLCBWaXBQYXlWaWV3LCBmYWxzZSk7XHJcbiAgICAgICAgLy8gdGhpcy5vbFBheVZpZXcgPSA8T2xQYXlWaWV3PnRoaXMuYWRkVmlldyhcIk9sUGF5Vmlld1wiLCB0aGlzLmdldENoaWxkKFwiZGVzY0xheW91dC9vbFBheVZpZXdcIiksIE9sUGF5VmlldywgZmFsc2UpO1xyXG4gICAgICAgIC8vIHRoaXMucmVjaGFyZ2VPbmxpbmVWaWV3ID0gPFJlY2hhcmdlT25saW5lVmlldz50aGlzLmFkZFZpZXcoXCJSZWNoYXJnZU9ubGluZVZpZXdcIiwgdGhpcy5nZXRDaGlsZChcImRlc2NMYXlvdXQvb25saW5lUGF5Vmlld1wiKSwgUmVjaGFyZ2VPbmxpbmVWaWV3LCBmYWxzZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5pZExibCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiZGVzY0xheW91dC9wYXlEZXNjL3VzZXJJbmZvL2lkUm9vdC9pZExibFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5pZExibC5zdHJpbmcgPSBTdHJpbmcoR2xvYmFsLlBsYXllckRhdGEudWlkKTtcclxuICAgICAgICB0aGlzLmhlYWRTcHJpdGUgPSB0aGlzLmdldENvbXBvbmVudChcImRlc2NMYXlvdXQvcGF5RGVzYy9oZWFkSW1nXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5oZWFkS3VhbmcgPSB0aGlzLmdldENvbXBvbmVudChcImRlc2NMYXlvdXQvcGF5RGVzYy9oZWFkSW1nL2hlYWRGcmFtZVwiLCBjYy5TcHJpdGUpO1xyXG5cclxuICAgICAgICB0aGlzLmNvcHlCdG4gPSB0aGlzLmdldENoaWxkKFwiZGVzY0xheW91dC9wYXlEZXNjL3VzZXJJbmZvL2lkUm9vdC9jb3B5QnRuXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJkZXNjTGF5b3V0L3BheURlc2MvdXNlckluZm8vaWRSb290L2NvcHlCdG5cIiwgdGhpcy5jb3B5SURDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy50aXBzTGJsID0gdGhpcy5nZXRDb21wb25lbnQoXCJkZXNjTGF5b3V0L3BheURlc2MvdXNlckluZm8vdGlwc1Jvb3QvdGlwc0xibFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy50aXBTcHJpdGUgPSB0aGlzLmdldENvbXBvbmVudChcImRlc2NMYXlvdXQvcGF5RGVzYy91c2VySW5mby90aXBzUm9vdC90aXBTcHJpdGVcIixjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuYmdCaWcgPSB0aGlzLmdldENoaWxkKFwiYmcxXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYmdCaWcpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCIxMTExMTExMTExMTExXCIpXHJcbiAgICAgICAgLy8gdGhpcy50aXBTcHJpdGUgPSB0aGlzLmdldENoaWxkKFwiZGVzY0xheW91dC9wYXlEZXNjL3VzZXJJbmZvL3RpcHNSb290L3RpcFNwcml0ZVwiKTtcclxuICAgICAgICB0aGlzLmRvd25sb2FkQnRuID0gdGhpcy5nZXRDaGlsZCgnZGVzY0xheW91dC9wYXlEZXNjL3VzZXJJbmZvL2Rvd25sb2FkQnRuJyk7XHJcbiAgICAgICAgdGhpcy5rZWZ1U3BvdCA9IHRoaXMuZ2V0Q2hpbGQoJ2Rlc2NMYXlvdXQvcGF5RGVzYy91c2VySW5mby9kb3dubG9hZEJ0bi9ob25nZGlhbicpO1xyXG4gICAgICAgIHRoaXMua2VmdVNwb3QuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kb3dubG9hZEJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKCdkZXNjTGF5b3V0L3BheURlc2MvdXNlckluZm8vZG93bmxvYWRCdG4nLCB0aGlzLmdvdG9Eb3dubG9hZCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaGF0QnRuID0gdGhpcy5nZXRDaGlsZCgnZGVzY0xheW91dC9wYXlEZXNjL3VzZXJJbmZvL2NoYXRCdG4nKTtcclxuICAgICAgICB0aGlzLmNoYXRTcG90ID0gdGhpcy5nZXRDaGlsZCgnZGVzY0xheW91dC9wYXlEZXNjL3VzZXJJbmZvL2NoYXRCdG4vaG9uZ2RpYW4nKTtcclxuICAgICAgICB0aGlzLmNoYXRTcG90LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2hhdEJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKCdkZXNjTGF5b3V0L3BheURlc2MvdXNlckluZm8vY2hhdEJ0bicsIHRoaXMuZ290b0FpdGVDaGF0LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGxvYWRCdG4gPSB0aGlzLmdldENoaWxkKCdkZXNjTGF5b3V0L3BheURlc2MvdXBsb2FkQnRuJyk7XHJcbiAgICAgICAgaWYodGhpcy51cGxvYWRCdG4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnVwbG9hZEJ0bi5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljaygnZGVzY0xheW91dC9wYXlEZXNjL3VwbG9hZEJ0bicsIHRoaXMuT25VcGxvYWRCdG5DbGlja2VkLCB0aGlzKTtcclxuICAgICAgICAvLyB0YWLmu5rliqjmnaFcclxuICAgICAgICB0aGlzLnRhYlZpZXcgPSB0aGlzLmdldENoaWxkKCdkZXNjTGF5b3V0L3RvZ2dsZVN2JykuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpO1xyXG4gICAgICAgIHRoaXMudGFiVmlldy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jb3B5VG9nZ2xlID0gdGhpcy5nZXRDaGlsZChcImRlc2NMYXlvdXQvdG9nZ2xlU3Yvdmlldy9idG5MYXlvdXQvdG9nZ2xlXzFcIik7XHJcbiAgICAgICAgdGhpcy5idG5MYXlvdXQgPSA8Y2MuTGF5b3V0PnRoaXMuZ2V0Q29tcG9uZW50KFwiZGVzY0xheW91dC90b2dnbGVTdi92aWV3L2J0bkxheW91dFwiLCBjYy5MYXlvdXQpO1xyXG4gICAgICAgIHRoaXMuYnRuTGF5b3V0Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNvcHlUb2dnbGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuYmcyID0gdGhpcy5nZXRDaGlsZChcImJnMlwiKVxyXG4gICAgICAgIHRoaXMuaW5pdFN1YlZpZXdDbGFzcyh0aGlzLnZpZXdLZXlUeXBlTWFwKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuSW5pdFNjcmlwdHMoKVxyXG4gICAgICAgIC8vdGhpcy5yZWNoYXJnZUxpc3RWaWV3ID0gPFJlY2hhcmdlTGlzdFZpZXc+dGhpcy5hZGRWaWV3KFwiUmVjaGFyZ2VMaXN0Vmlld1wiLCB0aGlzLmdldENoaWxkKFwicGF5TGlzdFwiKSwgUmVjaGFyZ2VMaXN0VmlldywgZmFsc2UpO1xyXG59XHJcblxyXG5hc3luYyBJbml0U2NyaXB0cygpIHtcclxuICAgIGF3YWl0IHRoaXMuaW5pdFN1YlZpZXcodGhpcy5zdWJWaWV3UGF0aCx0aGlzLnZpZXdLZXlUeXBlTWFwLHRoaXMuc3ViVmlld1BhcmVudE5vZGUpXHJcbn1cclxuICAgIE9uVXBsb2FkQnRuQ2xpY2tlZCgpIHtcclxuICAgICAgICBsZXQgbW9kZWwgPSAgR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlNlcnZpY2VyTW9kZWxcIilcclxuICAgICAgICBpZihtb2RlbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGVsLmVudGVyQ3VzdG9tZXJTZXJ2aWNlKEN1c3RvbWVyRW50cmFuY2VUeXBlLkhhbGxTZXJ2aWNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgIFxyXG5cclxuICAgIHByb3RlY3RlZCBvblN1YlZpZXdTaG93KCkge1xyXG4gICAgICAgIHRoaXMuaWRMYmwuc3RyaW5nID0gU3RyaW5nKEdsb2JhbC5QbGF5ZXJEYXRhLnVpZCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVVc2VySGVhZCgpO1xyXG4gICAgICAgIHRoaXMubW9kZWwub24oXCJVcGRhdGVSZXNTcG90XCIsdGhpcyx0aGlzLnVwZGF0ZVJlc1Nwb3QpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cGRhdGVSZXNTcG90KCByZWRTcG90VHlwZSApe1xyXG4gICAgICAgIHN3aXRjaChyZWRTcG90VHlwZSl7XHJcbiAgICAgICAgICAgICBjYXNlIEhhbGxSZWRTcG90VHlwZS5ZdW5QYWx5S2VmdTpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoR2xvYmFsLkNoYXRTZXJ2ZXIuc2VydmVyVHlwZSA9PSBDdXN0b21lckVudHJhbmNlVHlwZS5RdWlja1BheVNlcnZpY2UpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGF0U3BvdC5hY3RpdmUgPSB0aGlzLm1vZGVsLmNoYXRTcG90O1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZWZ1U3BvdC5hY3RpdmUgPSB0aGlzLm1vZGVsLmtlZnVTcG90O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVVc2VySGVhZCgpIHtcclxuICAgICAgICBsZXQgcGxheWVyRGF0YSA9IEdsb2JhbC5QbGF5ZXJEYXRhO1xyXG4gICAgICAgIGxldCBoZWFkSW1nID0gdGhpcy5oZWFkU3ByaXRlO1xyXG4gICAgICAgIGlmIChoZWFkSW1nLm5vZGUpIHtcclxuICAgICAgICAgICAgbGV0IHcgPSBoZWFkSW1nLm5vZGUud2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoID0gaGVhZEltZy5ub2RlLmhlaWdodDtcclxuICAgICAgICAgICAgaGVhZEltZy5zcHJpdGVGcmFtZSA9IEdsb2JhbC5Ub29sa2l0LmdldExvY2FsSGVhZFNmKHBsYXllckRhdGEuaGVhZGltZyk7XHJcbiAgICAgICAgICAgIGhlYWRJbWcubm9kZS53aWR0aCA9IHc7XHJcbiAgICAgICAgICAgIGhlYWRJbWcubm9kZS5oZWlnaHQgPSBoO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiAodGhpcy5oZWFkS3VhbmcgJiYgdGhpcy5oZWFkS3Vhbmcubm9kZSAmJiB0aGlzLmhlYWRLdWFuZy5ub2RlLmlzVmFsaWQpIHtcclxuICAgICAgICAvLyAgICAgR2xvYmFsLlRvb2xraXQubG9hZExvY2FsSGVhZEZyYW1lKHRoaXMuaGVhZEt1YW5nLCBwbGF5ZXJEYXRhLmhlYWRrdWFuZyk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld0hpZGUoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5vZmYoXCJVcGRhdGVSZXNTcG90XCIsdGhpcyx0aGlzLnVwZGF0ZVJlc1Nwb3QpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uRGlzcG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5vZmYoXCJVcGRhdGVSZXNTcG90XCIsdGhpcyx0aGlzLnVwZGF0ZVJlc1Nwb3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93Vmlldyh2aWV3U3RyOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnBheUNmZ01hcCA9IHRoaXMubW9kZWwuZ2V0UGF5TWFwRGF0YSgpO1xyXG4gICAgICAgIGlmICghdGhpcy5wYXlDZmdNYXAgfHwgR2xvYmFsLlRvb2xraXQuaXNFbXB0eU9iamVjdCh0aGlzLnBheUNmZ01hcCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmlld1N0cikge1xyXG4gICAgICAgICAgICB0aGlzLmN1clZpZXdTdHIgPSB2aWV3U3RyO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwbG9hZEJ0bi5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuc2V0Q3VyRGVzY1N0eWxlKHZpZXdTdHIpO1xyXG4gICAgICAgIC8vdGhpcy5yZWNoYXJnZUxpc3RWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgLy/otaDpgIHlhaXmrL7kuJPljLrnibnmrorlpITnkIbvvIjljp92aXDlhaXmrL7vvIlcclxuICAgICAgICAvLyAgIHRoaXMudmlwVGlwU3ByaXRlLmFjdGl2ZSA9IHRoaXMuY3VyVmlld1N0ciA9PSBSZWNoYXJnZU1vZGVsLlBheVR5cGUuVmlwO1xyXG4gICAgICAgICAgLy/otaDpgIHlhaXmrL7kuJPljLrnibnmrorlpITnkIbvvIjljp92aXDlhaXmrL7vvIlcclxuICAgICAgICBpZiAodGhpcy5jdXJWaWV3U3RyID09IFJlY2hhcmdlTW9kZWwuUGF5VHlwZS5WaXAgfHwgdGhpcy5jdXJWaWV3U3RyID09IFJlY2hhcmdlTW9kZWwuUGF5VHlwZS5WaXBRdWlja1BheSB8fCB0aGlzLmN1clZpZXdTdHIgPT0gUmVjaGFyZ2VNb2RlbC5QYXlUeXBlLkRwYXkpIHtcclxuICAgICAgICAgICAgdGhpcy52aXBQYXlWaWV3LnN1YlZpZXdTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMub2xQYXlWaWV3LnN1YlZpZXdTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJlY2hhcmdlT25saW5lVmlldy5zdWJWaWV3U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy52aXBQYXlWaWV3LnVwZGF0ZVNjcm9sbFZpZXcodGhpcy5wYXlDZmdNYXBbdGhpcy5jdXJWaWV3U3RyXVswXS5kYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5jb3B5QnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZG93bmxvYWRCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhdEJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJWaWV3U3RyID09IFJlY2hhcmdlTW9kZWwuUGF5VHlwZS5WaXBRdWlja1BheSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXRCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhdFNwb3QuYWN0aXZlID0gdGhpcy5tb2RlbC5jaGF0U3BvdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJWaWV3U3RyID09IFJlY2hhcmdlTW9kZWwuUGF5VHlwZS5PbmxpbmVQYXkpIHtcclxuICAgICAgICAgICAgdGhpcy52aXBQYXlWaWV3LnN1YlZpZXdTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm9sUGF5Vmlldy5zdWJWaWV3U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5yZWNoYXJnZU9ubGluZVZpZXcuc3ViVmlld1N0YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yZWNoYXJnZU9ubGluZVZpZXcuaW5pdERhdGEodGhpcy5wYXlDZmdNYXBbdGhpcy5jdXJWaWV3U3RyXVswXSlcclxuICAgICAgICAgICAgdGhpcy5jb3B5QnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZG93bmxvYWRCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhdEJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZWxzZSBpZiAodGhpcy5jdXJWaWV3U3RyID09IFJlY2hhcmdlTW9kZWwuUGF5VHlwZS5SZWNoYXJnZUxpc3QpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5yZWNoYXJnZUxpc3RWaWV3LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucmVjaGFyZ2VMaXN0Vmlldy5vbk9wZW5SZWNoYXJnZSh0cnVlKTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjaGFyZ2VPbmxpbmVWaWV3LnN1YlZpZXdTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnZpcFBheVZpZXcuc3ViVmlld1N0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMub2xQYXlWaWV3LnN1YlZpZXdTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhdEJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJWaWV3U3RyID09IFJlY2hhcmdlTW9kZWwuUGF5VHlwZS5TY2FuQ29kZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZEJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5jdXJWaWV3U3RyKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFJlY2hhcmdlTW9kZWwuUGF5VHlwZS5VbmlvbjpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvcHlCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvd25sb2FkQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBSZWNoYXJnZU1vZGVsLlBheVR5cGUuWXVuUGF5OlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29weUJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvd25sb2FkQnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZWZ1U3BvdC5hY3RpdmUgPSB0aGlzLm1vZGVsLmtlZnVTcG90O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvcHlCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3dubG9hZEJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNob3dCYW5rUGF5VGFiKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDdXJEZXNjU3R5bGUodmlld1N0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy50aXBTcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRpcHNMYmwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGlmICh2aWV3U3RyID09IFJlY2hhcmdlTW9kZWwuUGF5VHlwZS5JbnRlcm5hdGlvbmFsKXsvL+a1t+WkluWFheWAvOeJueacieaPkOekulxyXG4gICAgICAgICAgICB0aGlzLnRpcHNMYmwuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICB0aGlzLnRpcHNMYmwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy50aXBTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wYXlDZmdNYXBbdmlld1N0cl1bMF0uZGVzdCA9PSBudWxsIHx8IHRoaXMucGF5Q2ZnTWFwW3ZpZXdTdHJdWzBdLmRlc3QgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGlwc0xibC5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRpcHNMYmwuc3RyaW5nID0gdGhpcy5wYXlDZmdNYXBbdmlld1N0cl1bMF0uZGVzdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyDorr7nva7moIfpopjmmK/lkKbmmL7npLpcclxuICAgIHByaXZhdGUgc2hvd0JhbmtQYXlUYWIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyVmlld1N0ciAhPT0gUmVjaGFyZ2VNb2RlbC5QYXlUeXBlLlZpcCAmJiB0aGlzLmN1clZpZXdTdHIgIT09IFJlY2hhcmdlTW9kZWwuUGF5VHlwZS5WaXBRdWlja1BheSAmJlxyXG4gICAgICAgICAgICB0aGlzLmN1clZpZXdTdHIgIT09IFJlY2hhcmdlTW9kZWwuUGF5VHlwZS5PbmxpbmVQYXkgJiYgdGhpcy5jdXJWaWV3U3RyICE9PSBSZWNoYXJnZU1vZGVsLlBheVR5cGUuRHBheSkge1xyXG4gICAgICAgICAgICB0aGlzLnRhYlZpZXcubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRUb2dnbGVMaXN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmdCaWcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc3ViVmlld1BhcmVudE5vZGUueSA9IDI3MDtcclxuICAgICAgICAgICAgLy8gdGhpcy5iZzIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuYmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRhYlZpZXcubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5iZ0JpZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnN1YlZpZXdQYXJlbnROb2RlLnkgPSAyNDg7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuYmcyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuYmcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29weUlEQ2xpY2soKSB7XHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNvcHlUZXh0VG9DbGlwYm9hcmQoU3RyaW5nKEdsb2JhbC5QbGF5ZXJEYXRhLnVpZCksIHRoaXMuY29weVRleHRUb0NsaXBib2FyZENhbGxCYWNrLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29weVRleHRUb0NsaXBib2FyZENhbGxCYWNrKHJldFN0cikge1xyXG4gICAgICAgIGlmIChyZXRTdHIucmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlt7LlpI3liLbliLDliarotLTmnb9cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlpI3liLblpLHotKVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ290b0Rvd25sb2FkKCkge1xyXG4gICAgICAgIC8vIGxldCBzZXJ2aWNlck1vZGVsID0gPFNlcnZpY2VyTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbCgnU2VydmljZXJNb2RlbCcpO1xyXG4gICAgICAgIC8vIHNlcnZpY2VyTW9kZWwuc2hvd1NlcnZpY2VzKFNlcnZpY2VFbnRyYW5jZVR5cGUuWXVucGF5RG93bmxvYWQpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnb3RvQWl0ZUNoYXQoKSB7XHJcbiAgICAgICAgLy8g6buY6K6k6YCJ5oup5YWF5YC85pa55byP5pyA5aSa55qE5a6i5pyN6L+b5YWlXHJcbiAgICAgICAgR2xvYmFsLkNoYXRTZXJ2ZXIuc2VydmVyVHlwZSA9IEN1c3RvbWVyRW50cmFuY2VUeXBlLlF1aWNrUGF5U2VydmljZTtcclxuICAgICAgICBpZihHbG9iYWwuQ2hhdFNlcnZlci5RdWlja0RhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuQ2hhdFNlcnZlci51c2VyU2V0dGluZyhHbG9iYWwuQ2hhdFNlcnZlci5RdWlja0RhdGEpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHRoaXMucGF5Q2ZnTWFwW3RoaXMuY3VyVmlld1N0cl1bMF0uZGF0YTtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB7cGF5X3R5cGU6W119O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhMiA9IGxpc3RbaV07XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhMi5wYXlfdHlwZS5sZW5ndGggPiBkYXRhLnBheV90eXBlLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdsb2JhbC5DaGF0U2VydmVyLnVzZXJTZXR0aW5nKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5pdFRvZ2dsZUxpc3QoKSB7XHJcbiAgICAgICAgdGhpcy5wYXlDZmdMaXN0ID0gdGhpcy5wYXlDZmdNYXBbdGhpcy5jdXJWaWV3U3RyXVswXS5kYXRhO1xyXG4gICAgICAgIGlmICh0aGlzLnBheUNmZ01hcFt0aGlzLmN1clZpZXdTdHJdWzBdLnJhbmRfc29ydCA9PT0gMClcclxuICAgICAgICAgICAgdGhpcy5wYXlDZmdMaXN0ID0gR2xvYmFsLlRvb2xraXQuZ2V0T3V0T3JkZXJBcnJheSh0aGlzLnBheUNmZ0xpc3QpXHJcbiAgICAgICAgdGhpcy5yZWN5Y2xlVG9nZ2xlTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuY3VyUGF5bnVtID0gMDtcclxuICAgICAgICBsZXQgaXNGb3JjZVNlbGVjdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vbFBheVZpZXcuaGlkZUFsbEl0ZW1zKClcclxuICAgICAgICBpZiAodGhpcy5wYXlDZmdMaXN0KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wYXlDZmdMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMudG9nZ2xlTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGlmICghaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5jb3B5VG9nZ2xlKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLmJ0bkxheW91dC5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gbmV3IFRvZ2dsZUl0ZW0obm9kZSwgdGhpcy5vblRvZ2dsZUNsaWNrLCB0aGlzKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXRlbS5iZy5zdHJpbmcgPSB0aGlzLnBheUNmZ0xpc3RbaV0ubmFtZVxyXG4gICAgICAgICAgICAgICAgaXRlbS5jaGVja0JnLnN0cmluZyA9IHRoaXMucGF5Q2ZnTGlzdFtpXS5uYW1lXHJcbiAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNldEl0ZW1TdHlsZShpKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1clBheW51bSA9PSBpKSB7ICAgIC8vIOiuvue9ruW9k+WJjemhteetvlxyXG4gICAgICAgICAgICAgICAgICAgIGlzRm9yY2VTZWxlY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnNldFRvZ2dsZUNoZWNrZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbFBheVZpZXcuaW5pdERhdGEodGhpcy5jdXJWaWV3U3RyLCB0aGlzLnBheUNmZ0xpc3RbdGhpcy5jdXJQYXludW1dKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXlDZmdMaXN0W3RoaXMuY3VyUGF5bnVtXS50aXAgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcHNMYmwuc3RyaW5nID0gdGhpcy5wYXlDZmdMaXN0W3RoaXMuY3VyUGF5bnVtXS50aXA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghR2xvYmFsLlRvb2xraXQuaXNFbXB0eU9iamVjdCh0aGlzLnBheUNmZ0xpc3QpICYmIGlzRm9yY2VTZWxlY3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyUGF5bnVtID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnRhYlZpZXcuc2Nyb2xsVG9MZWZ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblRvZ2dsZUNsaWNrKG51bSkge1xyXG4gICAgICAgIGxldCBudW1UYWcgPSBudW07XHJcbiAgICAgICAgaWYgKG51bVRhZyA9PSB0aGlzLmN1clBheW51bSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY3VyUGF5bnVtID0gbnVtVGFnO1xyXG4gICAgICAgIHRoaXMub2xQYXlWaWV3LmluaXREYXRhKHRoaXMuY3VyVmlld1N0ciwgdGhpcy5wYXlDZmdMaXN0W3RoaXMuY3VyUGF5bnVtXSk7XHJcbiAgICAgICAgaWYgKHRoaXMucGF5Q2ZnTGlzdFt0aGlzLmN1clBheW51bV0udGlwICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgdGhpcy50aXBzTGJsLnN0cmluZyA9IHRoaXMucGF5Q2ZnTGlzdFt0aGlzLmN1clBheW51bV0udGlwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgcmVjeWNsZVRvZ2dsZUxpc3QoKSB7XHJcbiAgICAgICAgdGhpcy50b2dnbGVMaXN0LmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFRvZ2dsZUl0ZW0gZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICBwcml2YXRlIGJnOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgY2hlY2tCZzogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIGl0ZW1rZXkgPSAwO1xyXG4gICAgcHJpdmF0ZSB0b2dnbGVDb21wOiBjYy5Ub2dnbGU7XHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlLCBwcml2YXRlIGNhbGxiYWNrOiBGdW5jdGlvbiwgcHJpdmF0ZSB0YXJnZXQ6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLmJnID0gPGNjLkxhYmVsPnRoaXMuZ2V0Q29tcG9uZW50KFwiY2hlY2tfY2xvc2UvYmdcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tCZyA9IDxjYy5MYWJlbD50aGlzLmdldENvbXBvbmVudChcImNoZWNrX29wZW4vYmdcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJcIiwgdGhpcy5vbkl0ZW1DbGljaywgdGhpcywgbnVsbCk7XHJcbiAgICAgICAgdGhpcy50b2dnbGVDb21wID0gPGNjLlRvZ2dsZT50aGlzLmdldENvbXBvbmVudChcIlwiLCBjYy5Ub2dnbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25JdGVtQ2xpY2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjay5jYWxsKHRoaXMudGFyZ2V0LCB0aGlzLml0ZW1rZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0SXRlbVN0eWxlKG51bSkge1xyXG4gICAgICAgIHRoaXMuaXRlbWtleSA9IG51bTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VG9nZ2xlQ2hlY2tlZChmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKGZsYWcpXHJcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlQ29tcC5jaGVjaygpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVDb21wLnVuY2hlY2soKTtcclxuICAgIH1cclxuXHJcbn0iXX0=