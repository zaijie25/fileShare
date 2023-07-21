"use strict";
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