"use strict";
cc._RF.push(module, '76ad1sgRXlEnLlvwLp7EBO3', 'WndBankUI');
// hall/scripts/logic/hall/ui/money/ui/bank/WndBankUI.ts

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
var WndBase_1 = require("../../../../../core/ui/WndBase");
var BankSaveWin_1 = require("./BankSaveWin");
var BankDrawWin_1 = require("./BankDrawWin");
var WndBankUI = /** @class */ (function (_super) {
    __extends(WndBankUI, _super);
    function WndBankUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curWin = 1; //1存 2取
        return _this;
    }
    WndBankUI.prototype.onInit = function () {
        this.isNeedDelay = true;
        this.name = "WndBankUI";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/bank/BankUI";
        this.model = Global.ModelManager.getModel("BankModel");
    };
    WndBankUI.prototype.initView = function () {
        // this.node.width = cc.Canvas.instance.node.width;
        // this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("bg_popup_almost/close", this.close, this);
        //leftBtn
        this.saveToggle = this.getComponent("leftBtns/layout/saveBtn", cc.Toggle);
        this.drawToggle = this.getComponent("leftBtns/layout/drawBtn", cc.Toggle);
        this.saveToggle.node.on("click", this.changeInfoNode, this);
        this.drawToggle.node.on("click", this.changeInfoNode, this);
        //winNodes
        this.saveWin = this.addView("saveWin", this.getChild("winsNode/saveWin"), BankSaveWin_1.default, false);
        this.drawWin = this.addView("drawWin", this.getChild("winsNode/drawWin"), BankDrawWin_1.default), false;
        // 提示栏
        this.bindPhoneBtn = this.getChild("winsNode/msgInfo/bandNode/bandBtn");
        this.msgtip = this.getChild("winsNode/msgInfo/bandNode/msgLabel").getComponent(cc.Label);
        this.addCommonClick("winsNode/msgInfo/bandNode/bandBtn", this.openBindPhoneBtn, this);
    };
    // public open(args?)
    // {
    //     this.onOpen(args)
    // }
    //面板打开回调
    WndBankUI.prototype.onOpen = function (args) {
        var havePhone = (Global.PlayerData.phone != null && Global.PlayerData.phone != "");
        if (havePhone) { //已绑定电话
            this.bindPhoneBtn.active = false;
            this.msgtip.string = "温馨提示：银行存取款不收取任何手续费哦~";
        }
        else { //未绑定电话
            this.bindPhoneBtn.active = true;
            this.msgtip.string = "温馨提示：为了您的资金安全，请您绑定手机号码！";
        }
        this.updateInfoNode();
    };
    WndBankUI.prototype.afterOpen = function () {
        // this.animComp.doFullScreenOpenAnim(this.getChild("topBar"), 
        // this.getChild("leftBtns"), 
        // [this.getChild("winsNode"), this.getChild("zhuangshi")]);
    };
    WndBankUI.prototype.closeAllWin = function () {
        this.saveWin.subViewState = false;
        this.drawWin.subViewState = false;
    };
    WndBankUI.prototype.updateInfoNode = function () {
        this.closeAllWin();
        if (this.curWin == 1) {
            this.saveWin.subViewState = true;
            this.saveToggle.isChecked = true;
        }
        else if (this.curWin == 2) {
            this.drawWin.subViewState = true;
            this.drawToggle.isChecked = true;
        }
    };
    //提现界面切换
    WndBankUI.prototype.changeInfoNode = function (target) {
        var curWin = 1;
        if (target == this.drawToggle) {
            curWin = 2;
        }
        else if (target == this.saveToggle) {
            curWin = 1;
        }
        if (curWin == this.curWin) {
            return;
        }
        Global.Audio.playBtnSound();
        this.curWin = curWin;
        this.updateInfoNode();
    };
    WndBankUI.prototype.openBindPhoneBtn = function () {
        Global.UI.show("WndBindPhone");
    };
    return WndBankUI;
}(WndBase_1.default));
exports.default = WndBankUI;

cc._RF.pop();