"use strict";
cc._RF.push(module, 'b5ec22Es/REVpTUJSUbn/Sb', 'CashView');
// hall/scripts/logic/hall/ui/recharge/CashView.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
var aliBandWin_1 = require("../money/ui/extractCash/aliBandWin");
var aliExtractCashWin_1 = require("../money/ui/extractCash/aliExtractCashWin");
var unionBandWin_1 = require("../money/ui/extractCash/unionBandWin");
var unionExtractCashWin_1 = require("../money/ui/extractCash/unionExtractCashWin");
// import MoneyRecordBox from "../money/ui/common/MoneyRecordBox";
var ExtractEvent_1 = require("../money/ui/extractCash/ExtractEvent");
var overseasBankWin_1 = require("../money/ui/extractCash/overseasBankWin");
var overseasExtractCashWin_1 = require("../money/ui/extractCash/overseasExtractCashWin");
var WaitingView_1 = require("../waiting/WaitingView");
var CashView = /** @class */ (function (_super) {
    __extends(CashView, _super);
    function CashView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curWin = 0; //0银行 1支付宝 2海外 3列表
        //private cashListView:CashListView;
        _this.curMoneyNumLabel = null;
        _this.subViewPath = {
            "aliBandWin": "hall/prefabs/ui/Recharge/subView/cash/aliBandWin",
            "aliExtractCashWin": "hall/prefabs/ui/Recharge/subView/cash/aliExtractCashWin",
            "unionBandWin": "hall/prefabs/ui/Recharge/subView/cash/unionBandWin",
            "unionExtractCashWin": "hall/prefabs/ui/Recharge/subView/cash/unionExtractCashWin",
            "overseasBankWin": "hall/prefabs/ui/Recharge/subView/cash/overseasBandWin",
            "overseasExtractCashWin": "hall/prefabs/ui/Recharge/subView/cash/overseasExtractCashWin"
        };
        _this.viewKeyTypeMap = {
            "aliBandWin": aliBandWin_1.default,
            "aliExtractCashWin": aliExtractCashWin_1.default,
            "unionBandWin": unionBandWin_1.default,
            "unionExtractCashWin": unionExtractCashWin_1.default,
            "overseasBankWin": overseasBankWin_1.default,
            "overseasExtractCashWin": overseasExtractCashWin_1.default
        };
        return _this;
    }
    CashView.prototype.onSubViewShow = function () {
        _super.prototype.onSubViewShow.call(this);
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        //Listener
        this.model.reqGetBankInfo();
        this.model.allPutList = null;
        this.curWin = -1;
        this.updateInfoNode();
        this.model.reqGetAllPutList();
    };
    CashView.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.subViewParentNode = this.getChild("InfoNode");
        //可用余额
        this.model = Global.ModelManager.getModel("ExtractModel");
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE, this, this.updateCurMoney);
        this.model.on(ExtractEvent_1.ExtractEvent.OnUpdateBankBindInfo, this, this.updateInfoNode);
        //leftBtn
        this.aliToggle = this.getChild("leftBtns/layout/aliBtn");
        this.unionToggle = this.getChild("leftBtns/layout/unionBtn");
        this.listToggle = this.getChild("leftBtns/layout/listBtn");
        // this.overseasToggle = this.getChild("leftBtns/layout/overseasBtn"); //提现 海外 按钮
        this.aliToggle.on("click", this.changeInfoNode, this);
        this.unionToggle.on("click", this.changeInfoNode, this);
        this.listToggle.on("click", this.changeInfoNode, this);
        // this.overseasToggle.on("click",this.changeInfoNode,this); //提现 海外 按钮 点击事件
        this.curMoneyNumLabel = this.getComponent("InfoNode/tabBar/CurMoneyBox/curMoneyNumLabel", cc.Label);
        this.initSubViewClass(this.viewKeyTypeMap);
        this.InitScripts();
        //view 内的loading
        if (this.waitingNode == null || this.waitingNode == undefined) {
            //view 内的loading
            this.waitingNode = WaitingView_1.default.initWaitingView(this.node, cc.v2(138, 0));
        }
        //infoNode
        // this.aliBandWin = <aliBandWin>this.addView("aliBandWin",this.getChild("InfoNode/aliBandWin"),aliBandWin, false);
        // this.aliExtractCashWin = <aliExtractCashWin>this.addView("aliExtractCashWin",this.getChild("InfoNode/aliExtractCashWin"),aliExtractCashWin, false);
        // this.unionBandWin = <unionBandWin>this.addView("unionBandWin",this.getChild("InfoNode/unionBandWin"),unionBandWin, false);
        // this.unionExtractCashWin = <unionExtractCashWin>this.addView("unionExtractCashWin",this.getChild("InfoNode/unionExtractCashWin"),unionExtractCashWin, false);
        // //this.cashListView =  <CashListView>this.addView("CashListView",this.getChild("InfoNode/payList"),CashListView, false);
        // //提现 海外
        // this.overseasBankWin = <overseasBankWin>this.addView("overseasBankWin",this.getChild("InfoNode/overseasBandWin"),overseasBankWin,false);
        // this.overseasExtractCashWin = <overseasExtractCashWin>this.addView("overseasExtractCashWin",this.getChild("InfoNode/overseasExtractCashWin"),overseasExtractCashWin,false);
    };
    CashView.prototype.InitScripts = function () {
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
    CashView.prototype.onDispose = function () {
        this.model.off(ExtractEvent_1.ExtractEvent.OnUpdateBankBindInfo, this, this.updateInfoNode);
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.updateCurMoney);
    };
    CashView.prototype.onSubViewHide = function () {
        _super.prototype.onSubViewHide.call(this);
        //Listener
    };
    /** 更新当前可提现金额 */
    CashView.prototype.updateCurMoney = function () {
        if (!this.model.bankDatas) {
            return;
        }
        var playerMoney = Global.PlayerData.point - ((this.model.bankDatas.forzen_point || 0) * Global.Setting.glodRatio);
        playerMoney = Math.max(0, playerMoney);
        this.curMoneyNumLabel.string = Global.Toolkit.GetMoneyFormat(playerMoney);
    };
    CashView.prototype.setToggleChecked = function (targe, flag) {
        var check = targe.getChildByName("checkmark");
        var normal = targe.getChildByName("Background");
        if (check) {
            check.active = flag;
        }
        if (normal) {
            normal.active = !flag;
        }
    };
    CashView.prototype.showAliWin = function () {
        var haveData = this.model.haveAli();
        this.aliBandWin.subViewState = !haveData;
        this.aliExtractCashWin.subViewState = haveData;
        //this.cashListView.active = false;
    };
    CashView.prototype.showUnionWin = function () {
        var haveData = this.model.haveUnion();
        this.unionBandWin.subViewState = !haveData;
        this.unionExtractCashWin.subViewState = haveData;
        //this.cashListView.active = false;
    };
    // showListView(){
    //     this.cashListView.active = true;
    //     this.cashListView.onOpenRecharge(false)
    // }
    CashView.prototype.showOverseasWin = function () {
        var havaData = this.model.haveOverseas();
        this.overseasBankWin.subViewState = !havaData;
        this.overseasExtractCashWin.subViewState = havaData;
        //this.cashListView.active = false;
    };
    // showListView(){
    //     this.cashListView.active = true;
    //     this.cashListView.onOpenRecharge(false)
    // }
    CashView.prototype.closeAllWin = function () {
        this.aliBandWin.subViewState = false;
        this.aliExtractCashWin.subViewState = false;
        this.unionBandWin.subViewState = false;
        this.unionExtractCashWin.subViewState = false;
        //this.cashListView.active = false;
        this.aliToggle.active = false;
        this.unionToggle.active = false;
        // this.overseasToggle.active = false;
        this.overseasBankWin.subViewState = false;
        this.overseasExtractCashWin.subViewState = false;
    };
    CashView.prototype.updateInfoNode = function () {
        if (this.waitingNode) {
            this.waitingNode.active = false;
        }
        this.updateCurMoney();
        this.closeAllWin();
        if (!this.model.bankDatas)
            return;
        this.aliToggle.active = this.model.bankDatas.ali_status > 0;
        this.unionToggle.active = this.model.bankDatas.bank_status > 0;
        // this.overseasToggle.active = this.model.bankDatas.over_sea_bank_status > 0;
        if (this.curWin == -1) {
            //重置默认显示
            if (this.model.bankDatas.ali_status == 1) {
                this.curWin = 1;
            }
            else if (this.model.bankDatas.bank_status == 1) {
                this.curWin = 0;
            }
            else if (this.model.bankDatas.over_sea_bank_status == 1) {
                this.curWin = 2;
            }
            else {
                this.curWin = 3;
            }
        }
        if (this.curWin == 1 && this.model.bankDatas.ali_status) {
            this.showAliWin();
            this.setToggleChecked(this.aliToggle, true);
            this.setToggleChecked(this.unionToggle, false);
            // this.setToggleChecked(this.overseasToggle,false)
            this.setToggleChecked(this.listToggle, false);
        }
        else if (this.curWin == 0 && this.model.bankDatas.bank_status) {
            this.showUnionWin();
            this.setToggleChecked(this.aliToggle, false);
            this.setToggleChecked(this.unionToggle, true);
            // this.setToggleChecked(this.overseasToggle,false)
            this.setToggleChecked(this.listToggle, false);
        }
        else if (this.curWin == 2 && this.model.bankDatas.over_sea_bank_status) {
            this.showOverseasWin();
            this.setToggleChecked(this.aliToggle, false);
            this.setToggleChecked(this.unionToggle, false);
            // this.setToggleChecked(this.overseasToggle,true)
            this.setToggleChecked(this.listToggle, false);
        }
        else {
            // this.showListView();
            this.setToggleChecked(this.aliToggle, false);
            this.setToggleChecked(this.unionToggle, false);
            // this.setToggleChecked(this.overseasToggle,false)
            this.setToggleChecked(this.listToggle, true);
        }
    };
    //提现界面切换
    CashView.prototype.changeInfoNode = function (target) {
        var curWin = 1;
        if (target.node == this.aliToggle) {
            curWin = 1;
        }
        else if (target.node == this.unionToggle) {
            curWin = 0;
        }
        // else if(target.node == this.overseasToggle){
        //     curWin = 2;
        // }
        else if (target.node == this.listToggle) {
            curWin = 3;
        }
        if (curWin == this.curWin) {
            return;
        }
        Global.Audio.playBtnSound();
        this.curWin = curWin;
        this.updateInfoNode();
    };
    return CashView;
}(ViewBase_1.default));
exports.default = CashView;

cc._RF.pop();