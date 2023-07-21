
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/CashView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcQ2FzaFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWlEO0FBRWpELGlFQUE0RDtBQUM1RCwrRUFBMEU7QUFDMUUscUVBQWdFO0FBQ2hFLG1GQUE4RTtBQUM5RSxrRUFBa0U7QUFDbEUscUVBQW9FO0FBRXBFLDJFQUFzRTtBQUN0RSx5RkFBb0Y7QUFDcEYsc0RBQWlEO0FBRWpEO0lBQXNDLDRCQUFRO0lBQTlDO1FBQUEscUVBOFBDO1FBNVBXLFlBQU0sR0FBWSxDQUFDLENBQUMsQ0FBQSxrQkFBa0I7UUFZOUMsb0NBQW9DO1FBQzFCLHNCQUFnQixHQUFhLElBQUksQ0FBQztRQU9wQyxpQkFBVyxHQUFRO1lBQ3ZCLFlBQVksRUFBQyxrREFBa0Q7WUFDL0QsbUJBQW1CLEVBQUMseURBQXlEO1lBQzdFLGNBQWMsRUFBQyxvREFBb0Q7WUFDbkUscUJBQXFCLEVBQUMsMkRBQTJEO1lBQ2pGLGlCQUFpQixFQUFDLHVEQUF1RDtZQUN6RSx3QkFBd0IsRUFBQyw4REFBOEQ7U0FDMUYsQ0FBQTtRQUVPLG9CQUFjLEdBQVE7WUFDMUIsWUFBWSxFQUFDLG9CQUFVO1lBQ3ZCLG1CQUFtQixFQUFDLDJCQUFpQjtZQUNyQyxjQUFjLEVBQUMsc0JBQVk7WUFDM0IscUJBQXFCLEVBQUMsNkJBQW1CO1lBQ3pDLGlCQUFpQixFQUFDLHlCQUFlO1lBQ2pDLHdCQUF3QixFQUFDLGdDQUFzQjtTQUNsRCxDQUFBOztJQXdOTCxDQUFDO0lBcE5hLGdDQUFhLEdBQXZCO1FBRUksaUJBQU0sYUFBYSxXQUFFLENBQUE7UUFDckIsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUNuQjtZQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztT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UUFDRCxJQUFHLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFDO1lBQ3JCLE9BQU87U0FDVjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTCxlQUFDO0FBQUQsQ0E5UEEsQUE4UEMsQ0E5UHFDLGtCQUFRLEdBOFA3QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgRXh0cmFjdE1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0V4dHJhY3RNb2RlbFwiO1xyXG5pbXBvcnQgYWxpQmFuZFdpbiBmcm9tIFwiLi4vbW9uZXkvdWkvZXh0cmFjdENhc2gvYWxpQmFuZFdpblwiO1xyXG5pbXBvcnQgYWxpRXh0cmFjdENhc2hXaW4gZnJvbSBcIi4uL21vbmV5L3VpL2V4dHJhY3RDYXNoL2FsaUV4dHJhY3RDYXNoV2luXCI7XHJcbmltcG9ydCB1bmlvbkJhbmRXaW4gZnJvbSBcIi4uL21vbmV5L3VpL2V4dHJhY3RDYXNoL3VuaW9uQmFuZFdpblwiO1xyXG5pbXBvcnQgdW5pb25FeHRyYWN0Q2FzaFdpbiBmcm9tIFwiLi4vbW9uZXkvdWkvZXh0cmFjdENhc2gvdW5pb25FeHRyYWN0Q2FzaFdpblwiO1xyXG4vLyBpbXBvcnQgTW9uZXlSZWNvcmRCb3ggZnJvbSBcIi4uL21vbmV5L3VpL2NvbW1vbi9Nb25leVJlY29yZEJveFwiO1xyXG5pbXBvcnQgeyBFeHRyYWN0RXZlbnQgfSBmcm9tIFwiLi4vbW9uZXkvdWkvZXh0cmFjdENhc2gvRXh0cmFjdEV2ZW50XCI7XHJcbmltcG9ydCBDYXNoTGlzdFZpZXcgZnJvbSBcIi4vQ2FzaExpc3RWaWV3XCI7XHJcbmltcG9ydCBvdmVyc2Vhc0JhbmtXaW4gZnJvbSBcIi4uL21vbmV5L3VpL2V4dHJhY3RDYXNoL292ZXJzZWFzQmFua1dpblwiO1xyXG5pbXBvcnQgb3ZlcnNlYXNFeHRyYWN0Q2FzaFdpbiBmcm9tIFwiLi4vbW9uZXkvdWkvZXh0cmFjdENhc2gvb3ZlcnNlYXNFeHRyYWN0Q2FzaFdpblwiO1xyXG5pbXBvcnQgV2FpdGluZ1ZpZXcgZnJvbSBcIi4uL3dhaXRpbmcvV2FpdGluZ1ZpZXdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhc2hWaWV3IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgcHJpdmF0ZSBtb2RlbCA6IEV4dHJhY3RNb2RlbDtcclxuICAgIHByaXZhdGUgY3VyV2luIDogbnVtYmVyID0gMDsvLzDpk7booYwgMeaUr+S7mOWunSAy5rW35aSWIDPliJfooahcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBhbGlUb2dnbGU6Y2MuTm9kZTtcclxuICAgIHByaXZhdGUgdW5pb25Ub2dnbGU6Y2MuTm9kZTtcclxuICAgIHByaXZhdGUgbGlzdFRvZ2dsZTpjYy5Ob2RlO1xyXG4gICAgLy8gcHJpdmF0ZSBvdmVyc2Vhc1RvZ2dsZTpjYy5Ob2RlOyAvL+aPkOeOsCDmtbflpJYg5oyJ6ZKuXHJcblxyXG4gICAgcHJpdmF0ZSBhbGlCYW5kV2luOmFsaUJhbmRXaW47XHJcbiAgICBwcml2YXRlIGFsaUV4dHJhY3RDYXNoV2luOmFsaUV4dHJhY3RDYXNoV2luO1xyXG4gICAgcHJpdmF0ZSB1bmlvbkJhbmRXaW46dW5pb25CYW5kV2luO1xyXG4gICAgcHJpdmF0ZSB1bmlvbkV4dHJhY3RDYXNoV2luOnVuaW9uRXh0cmFjdENhc2hXaW47XHJcbiAgICAvL3ByaXZhdGUgY2FzaExpc3RWaWV3OkNhc2hMaXN0VmlldztcclxuICAgIHByb3RlY3RlZCBjdXJNb25leU51bUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIG92ZXJzZWFzQmFua1dpbjpvdmVyc2Vhc0JhbmtXaW47XHJcbiAgICBwcml2YXRlIG92ZXJzZWFzRXh0cmFjdENhc2hXaW46b3ZlcnNlYXNFeHRyYWN0Q2FzaFdpbjtcclxuXHJcbiAgICBwcml2YXRlIHN1YlZpZXdQYXJlbnROb2RlOmNjLk5vZGVcclxuXHJcbiAgICBwcml2YXRlIHdhaXRpbmdOb2RlIDpjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBzdWJWaWV3UGF0aCA6YW55ID0ge1xyXG4gICAgICAgIFwiYWxpQmFuZFdpblwiOlwiaGFsbC9wcmVmYWJzL3VpL1JlY2hhcmdlL3N1YlZpZXcvY2FzaC9hbGlCYW5kV2luXCIsXHJcbiAgICAgICAgXCJhbGlFeHRyYWN0Q2FzaFdpblwiOlwiaGFsbC9wcmVmYWJzL3VpL1JlY2hhcmdlL3N1YlZpZXcvY2FzaC9hbGlFeHRyYWN0Q2FzaFdpblwiLFxyXG4gICAgICAgIFwidW5pb25CYW5kV2luXCI6XCJoYWxsL3ByZWZhYnMvdWkvUmVjaGFyZ2Uvc3ViVmlldy9jYXNoL3VuaW9uQmFuZFdpblwiLFxyXG4gICAgICAgIFwidW5pb25FeHRyYWN0Q2FzaFdpblwiOlwiaGFsbC9wcmVmYWJzL3VpL1JlY2hhcmdlL3N1YlZpZXcvY2FzaC91bmlvbkV4dHJhY3RDYXNoV2luXCIsXHJcbiAgICAgICAgXCJvdmVyc2Vhc0JhbmtXaW5cIjpcImhhbGwvcHJlZmFicy91aS9SZWNoYXJnZS9zdWJWaWV3L2Nhc2gvb3ZlcnNlYXNCYW5kV2luXCIsXHJcbiAgICAgICAgXCJvdmVyc2Vhc0V4dHJhY3RDYXNoV2luXCI6XCJoYWxsL3ByZWZhYnMvdWkvUmVjaGFyZ2Uvc3ViVmlldy9jYXNoL292ZXJzZWFzRXh0cmFjdENhc2hXaW5cIlxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmlld0tleVR5cGVNYXAgOmFueSA9IHtcclxuICAgICAgICBcImFsaUJhbmRXaW5cIjphbGlCYW5kV2luLFxyXG4gICAgICAgIFwiYWxpRXh0cmFjdENhc2hXaW5cIjphbGlFeHRyYWN0Q2FzaFdpbixcclxuICAgICAgICBcInVuaW9uQmFuZFdpblwiOnVuaW9uQmFuZFdpbixcclxuICAgICAgICBcInVuaW9uRXh0cmFjdENhc2hXaW5cIjp1bmlvbkV4dHJhY3RDYXNoV2luLFxyXG4gICAgICAgIFwib3ZlcnNlYXNCYW5rV2luXCI6b3ZlcnNlYXNCYW5rV2luLFxyXG4gICAgICAgIFwib3ZlcnNlYXNFeHRyYWN0Q2FzaFdpblwiOm92ZXJzZWFzRXh0cmFjdENhc2hXaW5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvblN1YlZpZXdTaG93KClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vblN1YlZpZXdTaG93KClcclxuICAgICAgICBpZih0aGlzLndhaXRpbmdOb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy53YWl0aW5nTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL0xpc3RlbmVyXHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZXFHZXRCYW5rSW5mbygpO1xyXG4gICAgICAgIHRoaXMubW9kZWwuYWxsUHV0TGlzdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jdXJXaW4gPSAtMTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUluZm9Ob2RlKCk7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZXFHZXRBbGxQdXRMaXN0KCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubm9kZS53aWR0aCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLndpZHRoO1xyXG4gICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zdWJWaWV3UGFyZW50Tm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJJbmZvTm9kZVwiKVxyXG4gICAgICAgIC8v5Y+v55So5L2Z6aKdXHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxFeHRyYWN0TW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkV4dHJhY3RNb2RlbFwiKTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFLHRoaXMsdGhpcy51cGRhdGVDdXJNb25leSk7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5vbihFeHRyYWN0RXZlbnQuT25VcGRhdGVCYW5rQmluZEluZm8sdGhpcyx0aGlzLnVwZGF0ZUluZm9Ob2RlKTtcclxuICAgICAgICAvL2xlZnRCdG5cclxuICAgICAgICB0aGlzLmFsaVRvZ2dsZSA9IHRoaXMuZ2V0Q2hpbGQoXCJsZWZ0QnRucy9sYXlvdXQvYWxpQnRuXCIpO1xyXG4gICAgICAgIHRoaXMudW5pb25Ub2dnbGUgPSB0aGlzLmdldENoaWxkKFwibGVmdEJ0bnMvbGF5b3V0L3VuaW9uQnRuXCIpO1xyXG4gICAgICAgIHRoaXMubGlzdFRvZ2dsZSA9IHRoaXMuZ2V0Q2hpbGQoXCJsZWZ0QnRucy9sYXlvdXQvbGlzdEJ0blwiKTtcclxuICAgICAgICAvLyB0aGlzLm92ZXJzZWFzVG9nZ2xlID0gdGhpcy5nZXRDaGlsZChcImxlZnRCdG5zL2xheW91dC9vdmVyc2Vhc0J0blwiKTsgLy/mj5DnjrAg5rW35aSWIOaMiemSrlxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWxpVG9nZ2xlLm9uKFwiY2xpY2tcIix0aGlzLmNoYW5nZUluZm9Ob2RlLHRoaXMpO1xyXG4gICAgICAgIHRoaXMudW5pb25Ub2dnbGUub24oXCJjbGlja1wiLHRoaXMuY2hhbmdlSW5mb05vZGUsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5saXN0VG9nZ2xlLm9uKFwiY2xpY2tcIix0aGlzLmNoYW5nZUluZm9Ob2RlLHRoaXMpO1xyXG4gICAgICAgIC8vIHRoaXMub3ZlcnNlYXNUb2dnbGUub24oXCJjbGlja1wiLHRoaXMuY2hhbmdlSW5mb05vZGUsdGhpcyk7IC8v5o+Q546wIOa1t+WkliDmjInpkq4g54K55Ye75LqL5Lu2XHJcblxyXG5cclxuICAgICAgICB0aGlzLmN1ck1vbmV5TnVtTGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcIkluZm9Ob2RlL3RhYkJhci9DdXJNb25leUJveC9jdXJNb25leU51bUxhYmVsXCIsY2MuTGFiZWwpO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5pbml0U3ViVmlld0NsYXNzKHRoaXMudmlld0tleVR5cGVNYXApXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5Jbml0U2NyaXB0cygpXHJcbiAgICAgICAgLy92aWV3IOWGheeahGxvYWRpbmdcclxuICAgICAgICBpZih0aGlzLndhaXRpbmdOb2RlID09IG51bGx8fCB0aGlzLndhaXRpbmdOb2RlID09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIC8vdmlldyDlhoXnmoRsb2FkaW5nXHJcbiAgICAgICAgICAgIHRoaXMud2FpdGluZ05vZGUgPSBXYWl0aW5nVmlldy5pbml0V2FpdGluZ1ZpZXcodGhpcy5ub2RlLGNjLnYyKDEzOCwwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaW5mb05vZGVcclxuICAgICAgICAvLyB0aGlzLmFsaUJhbmRXaW4gPSA8YWxpQmFuZFdpbj50aGlzLmFkZFZpZXcoXCJhbGlCYW5kV2luXCIsdGhpcy5nZXRDaGlsZChcIkluZm9Ob2RlL2FsaUJhbmRXaW5cIiksYWxpQmFuZFdpbiwgZmFsc2UpO1xyXG4gICAgICAgIC8vIHRoaXMuYWxpRXh0cmFjdENhc2hXaW4gPSA8YWxpRXh0cmFjdENhc2hXaW4+dGhpcy5hZGRWaWV3KFwiYWxpRXh0cmFjdENhc2hXaW5cIix0aGlzLmdldENoaWxkKFwiSW5mb05vZGUvYWxpRXh0cmFjdENhc2hXaW5cIiksYWxpRXh0cmFjdENhc2hXaW4sIGZhbHNlKTtcclxuICAgICAgICAvLyB0aGlzLnVuaW9uQmFuZFdpbiA9IDx1bmlvbkJhbmRXaW4+dGhpcy5hZGRWaWV3KFwidW5pb25CYW5kV2luXCIsdGhpcy5nZXRDaGlsZChcIkluZm9Ob2RlL3VuaW9uQmFuZFdpblwiKSx1bmlvbkJhbmRXaW4sIGZhbHNlKTtcclxuICAgICAgICAvLyB0aGlzLnVuaW9uRXh0cmFjdENhc2hXaW4gPSA8dW5pb25FeHRyYWN0Q2FzaFdpbj50aGlzLmFkZFZpZXcoXCJ1bmlvbkV4dHJhY3RDYXNoV2luXCIsdGhpcy5nZXRDaGlsZChcIkluZm9Ob2RlL3VuaW9uRXh0cmFjdENhc2hXaW5cIiksdW5pb25FeHRyYWN0Q2FzaFdpbiwgZmFsc2UpO1xyXG4gICAgICAgIC8vIC8vdGhpcy5jYXNoTGlzdFZpZXcgPSAgPENhc2hMaXN0Vmlldz50aGlzLmFkZFZpZXcoXCJDYXNoTGlzdFZpZXdcIix0aGlzLmdldENoaWxkKFwiSW5mb05vZGUvcGF5TGlzdFwiKSxDYXNoTGlzdFZpZXcsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8gLy/mj5DnjrAg5rW35aSWXHJcbiAgICAgICAgLy8gdGhpcy5vdmVyc2Vhc0JhbmtXaW4gPSA8b3ZlcnNlYXNCYW5rV2luPnRoaXMuYWRkVmlldyhcIm92ZXJzZWFzQmFua1dpblwiLHRoaXMuZ2V0Q2hpbGQoXCJJbmZvTm9kZS9vdmVyc2Vhc0JhbmRXaW5cIiksb3ZlcnNlYXNCYW5rV2luLGZhbHNlKTtcclxuICAgICAgICAvLyB0aGlzLm92ZXJzZWFzRXh0cmFjdENhc2hXaW4gPSA8b3ZlcnNlYXNFeHRyYWN0Q2FzaFdpbj50aGlzLmFkZFZpZXcoXCJvdmVyc2Vhc0V4dHJhY3RDYXNoV2luXCIsdGhpcy5nZXRDaGlsZChcIkluZm9Ob2RlL292ZXJzZWFzRXh0cmFjdENhc2hXaW5cIiksb3ZlcnNlYXNFeHRyYWN0Q2FzaFdpbixmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgSW5pdFNjcmlwdHMoKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5pbml0U3ViVmlldyh0aGlzLnN1YlZpZXdQYXRoLHRoaXMudmlld0tleVR5cGVNYXAsdGhpcy5zdWJWaWV3UGFyZW50Tm9kZSlcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1vZGVsLm9mZihFeHRyYWN0RXZlbnQuT25VcGRhdGVCYW5rQmluZEluZm8sdGhpcyx0aGlzLnVwZGF0ZUluZm9Ob2RlKTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50LlBFUlNPTkFMSU5GT1VQREFURSx0aGlzLHRoaXMudXBkYXRlQ3VyTW9uZXkpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld0hpZGUoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uU3ViVmlld0hpZGUoKVxyXG4gICAgICAgIC8vTGlzdGVuZXJcclxuICAgIH1cclxuXHJcbiAgICAgICAgLyoqIOabtOaWsOW9k+WJjeWPr+aPkOeOsOmHkeminSAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUN1ck1vbmV5KCl7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLm1vZGVsLmJhbmtEYXRhcyl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHBsYXllck1vbmV5ID0gR2xvYmFsLlBsYXllckRhdGEucG9pbnQgLSAoKHRoaXMubW9kZWwuYmFua0RhdGFzLmZvcnplbl9wb2ludCB8fCAwKSAqIEdsb2JhbC5TZXR0aW5nLmdsb2RSYXRpbyApO1xyXG4gICAgICAgIHBsYXllck1vbmV5ID0gTWF0aC5tYXgoMCxwbGF5ZXJNb25leSk7XHJcbiAgICAgICAgdGhpcy5jdXJNb25leU51bUxhYmVsLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LkdldE1vbmV5Rm9ybWF0KHBsYXllck1vbmV5KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUb2dnbGVDaGVja2VkKHRhcmdlOmNjLk5vZGUsZmxhZzpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjaGVjayA9IHRhcmdlLmdldENoaWxkQnlOYW1lKFwiY2hlY2ttYXJrXCIpXHJcbiAgICAgICAgbGV0IG5vcm1hbCA9IHRhcmdlLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKVxyXG4gICAgICAgIGlmIChjaGVjaykge1xyXG4gICAgICAgICAgICBjaGVjay5hY3RpdmUgPSBmbGFnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub3JtYWwpIHtcclxuICAgICAgICAgICAgbm9ybWFsLmFjdGl2ZSA9ICFmbGFnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzaG93QWxpV2luKCl7XHJcbiAgICAgICAgdmFyIGhhdmVEYXRhID0gdGhpcy5tb2RlbC5oYXZlQWxpKCk7XHJcbiAgICAgICAgdGhpcy5hbGlCYW5kV2luLnN1YlZpZXdTdGF0ZSA9ICFoYXZlRGF0YTtcclxuICAgICAgICB0aGlzLmFsaUV4dHJhY3RDYXNoV2luLnN1YlZpZXdTdGF0ZSA9IGhhdmVEYXRhO1xyXG4gICAgICAgIC8vdGhpcy5jYXNoTGlzdFZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1VuaW9uV2luKCl7XHJcbiAgICAgICAgdmFyIGhhdmVEYXRhID0gdGhpcy5tb2RlbC5oYXZlVW5pb24oKTtcclxuICAgICAgICB0aGlzLnVuaW9uQmFuZFdpbi5zdWJWaWV3U3RhdGUgPSAhaGF2ZURhdGE7XHJcbiAgICAgICAgdGhpcy51bmlvbkV4dHJhY3RDYXNoV2luLnN1YlZpZXdTdGF0ZSA9IGhhdmVEYXRhO1xyXG4gICAgICAgIC8vdGhpcy5jYXNoTGlzdFZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLyBzaG93TGlzdFZpZXcoKXtcclxuICAgIC8vICAgICB0aGlzLmNhc2hMaXN0Vmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgLy8gICAgIHRoaXMuY2FzaExpc3RWaWV3Lm9uT3BlblJlY2hhcmdlKGZhbHNlKVxyXG4gICAgLy8gfVxyXG4gICAgc2hvd092ZXJzZWFzV2luKCl7XHJcbiAgICAgICAgdmFyIGhhdmFEYXRhID0gdGhpcy5tb2RlbC5oYXZlT3ZlcnNlYXMoKTtcclxuICAgICAgICB0aGlzLm92ZXJzZWFzQmFua1dpbi5zdWJWaWV3U3RhdGUgPSAhaGF2YURhdGE7XHJcbiAgICAgICAgdGhpcy5vdmVyc2Vhc0V4dHJhY3RDYXNoV2luLnN1YlZpZXdTdGF0ZSA9IGhhdmFEYXRhO1xyXG4gICAgICAgIC8vdGhpcy5jYXNoTGlzdFZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLyBzaG93TGlzdFZpZXcoKXtcclxuICAgIC8vICAgICB0aGlzLmNhc2hMaXN0Vmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgLy8gICAgIHRoaXMuY2FzaExpc3RWaWV3Lm9uT3BlblJlY2hhcmdlKGZhbHNlKVxyXG4gICAgLy8gfVxyXG4gICAgY2xvc2VBbGxXaW4oKXtcclxuICAgICAgICB0aGlzLmFsaUJhbmRXaW4uc3ViVmlld1N0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hbGlFeHRyYWN0Q2FzaFdpbi5zdWJWaWV3U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVuaW9uQmFuZFdpbi5zdWJWaWV3U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVuaW9uRXh0cmFjdENhc2hXaW4uc3ViVmlld1N0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgLy90aGlzLmNhc2hMaXN0Vmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFsaVRvZ2dsZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVuaW9uVG9nZ2xlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMub3ZlcnNlYXNUb2dnbGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vdmVyc2Vhc0JhbmtXaW4uc3ViVmlld1N0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vdmVyc2Vhc0V4dHJhY3RDYXNoV2luLnN1YlZpZXdTdGF0ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUluZm9Ob2RlKCl7XHJcbiAgICAgICAgaWYodGhpcy53YWl0aW5nTm9kZSl7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdGluZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlQ3VyTW9uZXkoKTtcclxuICAgICAgICB0aGlzLmNsb3NlQWxsV2luKCk7XHJcbiAgICAgICAgaWYoIXRoaXMubW9kZWwuYmFua0RhdGFzKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5hbGlUb2dnbGUuYWN0aXZlID0gdGhpcy5tb2RlbC5iYW5rRGF0YXMuYWxpX3N0YXR1cyA+IDA7XHJcbiAgICAgICAgdGhpcy51bmlvblRvZ2dsZS5hY3RpdmUgPSB0aGlzLm1vZGVsLmJhbmtEYXRhcy5iYW5rX3N0YXR1cyA+IDA7XHJcbiAgICAgICAgLy8gdGhpcy5vdmVyc2Vhc1RvZ2dsZS5hY3RpdmUgPSB0aGlzLm1vZGVsLmJhbmtEYXRhcy5vdmVyX3NlYV9iYW5rX3N0YXR1cyA+IDA7XHJcbiAgICAgICAgaWYodGhpcy5jdXJXaW4gPT0gLTEpe1xyXG4gICAgICAgICAgICAvL+mHjee9rum7mOiupOaYvuekulxyXG4gICAgICAgICAgICBpZih0aGlzLm1vZGVsLmJhbmtEYXRhcy5hbGlfc3RhdHVzID09IDEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJXaW4gPSAxO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLm1vZGVsLmJhbmtEYXRhcy5iYW5rX3N0YXR1cyA9PSAxKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyV2luID0gMCAgICBcclxuICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5tb2RlbC5iYW5rRGF0YXMub3Zlcl9zZWFfYmFua19zdGF0dXMgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cldpbiA9IDI7ICAgIFxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyV2luID0gMzsgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY3VyV2luID09IDEgJiYgdGhpcy5tb2RlbC5iYW5rRGF0YXMuYWxpX3N0YXR1cyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0FsaVdpbigpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy5hbGlUb2dnbGUsdHJ1ZSlcclxuICAgICAgICAgICAgdGhpcy5zZXRUb2dnbGVDaGVja2VkKHRoaXMudW5pb25Ub2dnbGUsZmFsc2UpXHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0VG9nZ2xlQ2hlY2tlZCh0aGlzLm92ZXJzZWFzVG9nZ2xlLGZhbHNlKVxyXG4gICAgICAgICAgICB0aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy5saXN0VG9nZ2xlLGZhbHNlKVxyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuY3VyV2luID09IDAgJiYgdGhpcy5tb2RlbC5iYW5rRGF0YXMuYmFua19zdGF0dXMpe1xyXG4gICAgICAgICAgICB0aGlzLnNob3dVbmlvbldpbigpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy5hbGlUb2dnbGUsZmFsc2UpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VG9nZ2xlQ2hlY2tlZCh0aGlzLnVuaW9uVG9nZ2xlLHRydWUpXHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0VG9nZ2xlQ2hlY2tlZCh0aGlzLm92ZXJzZWFzVG9nZ2xlLGZhbHNlKVxyXG4gICAgICAgICAgICB0aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy5saXN0VG9nZ2xlLGZhbHNlKVxyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuY3VyV2luID09IDIgJiYgdGhpcy5tb2RlbC5iYW5rRGF0YXMub3Zlcl9zZWFfYmFua19zdGF0dXMpe1xyXG4gICAgICAgICAgICB0aGlzLnNob3dPdmVyc2Vhc1dpbigpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy5hbGlUb2dnbGUsZmFsc2UpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VG9nZ2xlQ2hlY2tlZCh0aGlzLnVuaW9uVG9nZ2xlLGZhbHNlKVxyXG4gICAgICAgICAgICAvLyB0aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy5vdmVyc2Vhc1RvZ2dsZSx0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy5saXN0VG9nZ2xlLGZhbHNlKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNob3dMaXN0VmlldygpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy5hbGlUb2dnbGUsZmFsc2UpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VG9nZ2xlQ2hlY2tlZCh0aGlzLnVuaW9uVG9nZ2xlLGZhbHNlKVxyXG4gICAgICAgICAgICAvLyB0aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy5vdmVyc2Vhc1RvZ2dsZSxmYWxzZSlcclxuICAgICAgICAgICAgdGhpcy5zZXRUb2dnbGVDaGVja2VkKHRoaXMubGlzdFRvZ2dsZSx0cnVlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aPkOeOsOeVjOmdouWIh+aNolxyXG4gICAgY2hhbmdlSW5mb05vZGUoIHRhcmdldCA6IGFueSApe1xyXG4gICAgICAgIHZhciBjdXJXaW4gPSAxO1xyXG4gICAgICAgIGlmKHRhcmdldC5ub2RlID09IHRoaXMuYWxpVG9nZ2xlKXtcclxuICAgICAgICAgICAgY3VyV2luID0gMTtcclxuICAgICAgICB9ZWxzZSBpZih0YXJnZXQubm9kZSA9PSB0aGlzLnVuaW9uVG9nZ2xlKXtcclxuICAgICAgICAgICAgY3VyV2luID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZWxzZSBpZih0YXJnZXQubm9kZSA9PSB0aGlzLm92ZXJzZWFzVG9nZ2xlKXtcclxuICAgICAgICAvLyAgICAgY3VyV2luID0gMjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgZWxzZSBpZih0YXJnZXQubm9kZSA9PSB0aGlzLmxpc3RUb2dnbGUpe1xyXG4gICAgICAgICAgICBjdXJXaW4gPSAzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjdXJXaW4gPT0gdGhpcy5jdXJXaW4pe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICB0aGlzLmN1cldpbiA9IGN1cldpbjtcclxuICAgICAgICB0aGlzLnVwZGF0ZUluZm9Ob2RlKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=