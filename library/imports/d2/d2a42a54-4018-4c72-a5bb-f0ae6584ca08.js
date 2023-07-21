"use strict";
cc._RF.push(module, 'd2a42pUQBhMcqW78K5lhMoI', 'BankSaveDrawBaseWin');
// hall/scripts/logic/hall/ui/money/ui/bank/BankSaveDrawBaseWin.ts

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
var ViewBase_1 = require("../../../../../core/ui/ViewBase");
var GlobalEvent_1 = require("../../../../../core/GlobalEvent");
var BankSaveDrawBaseWin = /** @class */ (function (_super) {
    __extends(BankSaveDrawBaseWin, _super);
    function BankSaveDrawBaseWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputEditBox = null;
        _this.sliderPlus = null;
        // protected msgInfoBox :MsgInfoBox
        _this.curInputNum = 0;
        return _this;
    }
    BankSaveDrawBaseWin.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("BankModel");
        // this.msgInfoBox = new MsgInfoBox()
        // this.msgInfoBox.setNode(this.getChild("msgInfo"))
        //this.addView("msgInfo",this.getChild("msgInfo"),MsgInfoBox);
        this.myMoney = this.getComponent("balanceLabel", cc.Label);
        this.bankMoney = this.getComponent("bankLabel", cc.Label);
        this.inputEditBox = this.getComponent("inputEditBox", cc.EditBox);
        this.inputEditBox.node.on('editing-did-ended', this.textChangeFunc, this);
        this.sliderPlus = new SliderPlus();
        this.sliderPlus.setNode(this.getChild("SliderPlus"));
        this.sliderPlus.addOn(this.sliderChangeFunc, this);
        this.addCommonClick("resetBtn", this.resetBtnFunc, this);
        this.addCommonClick("confirmBtn", this.confirmBtnFunc, this);
    };
    BankSaveDrawBaseWin.prototype.onSubViewShow = function () {
        Global.Event.on(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.updateMoneyView);
        // this.msgInfoBox.onSubViewShow()
        this.sliderPlus.active = true;
        this.sliderPlus.pro = 0;
        this.updateMoneyView();
        this.inputEditBox.string = "";
    };
    BankSaveDrawBaseWin.prototype.onSubViewHide = function () {
        // this.msgInfoBox.onSubViewHide()
        this.sliderPlus.active = false;
        Global.Event.off(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.updateMoneyView);
    };
    BankSaveDrawBaseWin.prototype.getBaseNum = function () {
        return 1;
    };
    BankSaveDrawBaseWin.prototype.updateMoneyView = function () {
        this.myMoney.string = Global.Toolkit.formatPointStr(Global.PlayerData.point, true);
        this.bankMoney.string = Global.Toolkit.formatPointStr(Global.PlayerData.bank_point, true);
        this.updateView(this.sliderPlus.pro);
        var wndBank = Global.UI.getWindow("WndBankUI");
        if (wndBank) {
            wndBank.OnDataPrepared();
        }
    };
    /** 按滑动条更新显示 */
    BankSaveDrawBaseWin.prototype.updateView = function (pro) {
        var baseNum = this.getBaseNum(); //这里是元
        var fBaseNum = Global.Toolkit.formatPointStr(baseNum * Global.Setting.glodRatio, true); // 捕鱼中可能出现小数点后3位，在这里统一格式加判断不然会出现0.0064这样的，钱包显示为0.00但是实际还是有钱的
        if (baseNum == 0 || fBaseNum == "0.00") {
            this.inputEditBox.string = "0";
            this.sliderPlus.pro = 0;
            return;
        }
        pro = Math.ceil(pro * 100) / 100; //百分号向上取整
        var num = Math.floor(baseNum * pro * 100) / 100; //求出对应元数保留两位小数
        // if(pro == 1) //因浮点数特性特殊处理，否则有误差
        // {
        //     num = baseNum
        // }
        this.curInputNum = num;
        this.inputEditBox.string = num + "";
        this.sliderPlus.pro = pro;
    };
    /** 按输入框更新显示 */
    BankSaveDrawBaseWin.prototype.textChangeFunc = function () {
        var baseNum = this.getBaseNum();
        if (baseNum == 0) {
            this.updateView(0);
            return;
        }
        var num = parseFloat(this.inputEditBox.string == "" ? "0" : this.inputEditBox.string); //获取元数
        if (num >= 0) {
        }
        else {
            //可能生成NaN，这里做修正
            num = 0;
        }
        if (num > baseNum) {
            this.model.showBankTips("输入超出范围");
        }
        num = Math.min(num, baseNum);
        num = Number(Global.Toolkit.formatPointStr(num * Global.Setting.glodRatio, true));
        this.curInputNum = num;
        var pro = Math.ceil(num / baseNum * 100) / 100; //百分号向上取整
        this.sliderPlus.pro = Math.min(1, pro);
        this.inputEditBox.string = num + "";
    };
    BankSaveDrawBaseWin.prototype.sliderChangeFunc = function () {
        this.updateView(this.sliderPlus.pro);
    };
    BankSaveDrawBaseWin.prototype.resetBtnFunc = function () {
        Logger.error("重置", 0);
        this.updateView(0);
    };
    BankSaveDrawBaseWin.prototype.confirmBtnFunc = function () {
    };
    return BankSaveDrawBaseWin;
}(ViewBase_1.default));
exports.default = BankSaveDrawBaseWin;
/** 银行信息盒子 */
var MsgInfoBox = /** @class */ (function (_super) {
    __extends(MsgInfoBox, _super);
    function MsgInfoBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bandNode = null;
        _this.msgNode = null;
        return _this;
    }
    MsgInfoBox.prototype.initView = function () {
        this.bandNode = this.getChild("bandNode");
        this.msgNode = this.getChild("msgNode");
        this.addCommonClick("bandNode/bandBtn", this.bandBtnFunc, this);
    };
    MsgInfoBox.prototype.onSubViewShow = function () {
        // cc.log("--------------------MsgInfoBox————onOpen");
        Global.Event.on(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.updateView);
        this.updateView();
    };
    MsgInfoBox.prototype.onSubViewHide = function () {
        // cc.log("--------------------MsgInfoBox————onClose");
        Global.Event.off(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.updateView);
    };
    MsgInfoBox.prototype.updateView = function () {
        var havePhone = (Global.PlayerData.phone != null && Global.PlayerData.phone != "");
        this.bandNode.active = !havePhone;
        this.msgNode.active = havePhone;
    };
    MsgInfoBox.prototype.bandBtnFunc = function () {
        //打开手机绑定
        Global.UI.show("WndBindPhone");
    };
    return MsgInfoBox;
}(ViewBase_1.default));
/** 拓展slider */
var SliderPlus = /** @class */ (function (_super) {
    __extends(SliderPlus, _super);
    function SliderPlus() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.progressBar = null;
        _this.sliderBar = null;
        _this.valueLabel = null;
        return _this;
    }
    SliderPlus.prototype.initView = function () {
        this.progressBar = this.node.getComponent(cc.ProgressBar);
        this.sliderBar = this.getComponent("slider", cc.Slider);
        this.valueLabel = this.getComponent("slider/Handle/valueBox/valueLabel", cc.Label);
        this.sliderBar.node.on('slide', this.updateView, this);
        this.sliderBar.node.on(cc.Node.EventType.TOUCH_START, this.touchDown, this);
        this.sliderBar.handle.node.on(cc.Node.EventType.TOUCH_END, this.touchDown, this);
        this.handleNode = this.getChild("slider/Handle");
    };
    SliderPlus.prototype.touchDown = function () {
        Global.Audio.playBtnSound();
    };
    SliderPlus.prototype.updateView = function () {
        var pro = this.sliderBar.progress;
        this.progressBar.progress = pro;
        this.valueLabel.string = pro * 100 + "%";
    };
    Object.defineProperty(SliderPlus.prototype, "pro", {
        get: function () {
            return this.sliderBar.progress;
        },
        set: function (pro) {
            this.sliderBar.progress = pro;
            this.progressBar.progress = pro;
            if (pro == 0) //debug 打开页面弹窗动画时，handle位置计算错误，修改ui组件麻烦，暂时暴力重设
                this.forceLocate();
            this.valueLabel.string = Math.floor(pro * 100) + "%";
        },
        enumerable: false,
        configurable: true
    });
    SliderPlus.prototype.addOn = function (func, target) {
        this.sliderBar.node.on('slide', func, target);
    };
    SliderPlus.prototype.forceLocate = function () {
        this.handleNode.setPosition(cc.v2(-312.5, 0));
    };
    return SliderPlus;
}(ViewBase_1.default));

cc._RF.pop();