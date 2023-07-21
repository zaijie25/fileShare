
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/bank/BankSaveDrawBaseWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGJhbmtcXEJhbmtTYXZlRHJhd0Jhc2VXaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNERBQXVEO0FBRXZELCtEQUEwRDtBQUkxRDtJQUFpRCx1Q0FBUTtJQUF6RDtRQUFBLHFFQStIQztRQXhIYSxrQkFBWSxHQUFnQixJQUFJLENBQUM7UUFDakMsZ0JBQVUsR0FBZ0IsSUFBSSxDQUFDO1FBRXpDLG1DQUFtQztRQUV6QixpQkFBVyxHQUFHLENBQUMsQ0FBQzs7SUFtSDlCLENBQUM7SUFqSGEsc0NBQVEsR0FBbEI7UUFFSSxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXZELHFDQUFxQztRQUNyQyxvREFBb0Q7UUFDcEQsOERBQThEO1FBRTlELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBQyxJQUFJLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQTtRQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVks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QUFHLENBQUM7WUFDaEMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFZLDhDQUE4QztnQkFDbEUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN6RCxDQUFDOzs7T0FBQTtJQU1NLDBCQUFLLEdBQVosVUFBYSxJQUFJLEVBQUcsTUFBTTtRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxNQUFNLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ00sZ0NBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FqREEsQUFpREMsQ0FqRHdCLGtCQUFRLEdBaURoQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IEJhbmtNb2RlbCBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9CYW5rTW9kZWxcIjtcclxuaW1wb3J0IEdsb2JhbEV2ZW50IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb3JlL0dsb2JhbEV2ZW50XCI7XHJcbmltcG9ydCBXbmRCYW5rVUkgZnJvbSBcIi4vV25kQmFua1VJXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFua1NhdmVEcmF3QmFzZVdpbiBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgbW9kZWwgOiBCYW5rTW9kZWw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG15TW9uZXkgOiBjYy5MYWJlbDtcclxuICAgIHByb3RlY3RlZCBiYW5rTW9uZXkgOiBjYy5MYWJlbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5wdXRFZGl0Qm94IDogY2MuRWRpdEJveCA9IG51bGw7XHJcbiAgICBwcm90ZWN0ZWQgc2xpZGVyUGx1cyA6IFNsaWRlclBsdXMgPSBudWxsO1xyXG5cclxuICAgIC8vIHByb3RlY3RlZCBtc2dJbmZvQm94IDpNc2dJbmZvQm94XHJcblxyXG4gICAgcHJvdGVjdGVkIGN1cklucHV0TnVtID0gMDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiQmFua01vZGVsXCIpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLm1zZ0luZm9Cb3ggPSBuZXcgTXNnSW5mb0JveCgpXHJcbiAgICAgICAgLy8gdGhpcy5tc2dJbmZvQm94LnNldE5vZGUodGhpcy5nZXRDaGlsZChcIm1zZ0luZm9cIikpXHJcbiAgICAgICAgLy90aGlzLmFkZFZpZXcoXCJtc2dJbmZvXCIsdGhpcy5nZXRDaGlsZChcIm1zZ0luZm9cIiksTXNnSW5mb0JveCk7XHJcblxyXG4gICAgICAgIHRoaXMubXlNb25leSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiYmFsYW5jZUxhYmVsXCIsY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuYmFua01vbmV5ID0gdGhpcy5nZXRDb21wb25lbnQoXCJiYW5rTGFiZWxcIixjYy5MYWJlbCk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5wdXRFZGl0Qm94ID0gdGhpcy5nZXRDb21wb25lbnQoXCJpbnB1dEVkaXRCb3hcIixjYy5FZGl0Qm94KTtcclxuICAgICAgICB0aGlzLmlucHV0RWRpdEJveC5ub2RlLm9uKCdlZGl0aW5nLWRpZC1lbmRlZCcsdGhpcy50ZXh0Q2hhbmdlRnVuYyx0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnNsaWRlclBsdXMgPSBuZXcgU2xpZGVyUGx1cygpXHJcbiAgICAgICAgdGhpcy5zbGlkZXJQbHVzLnNldE5vZGUodGhpcy5nZXRDaGlsZChcIlNsaWRlclBsdXNcIikpXHJcbiAgICAgICAgdGhpcy5zbGlkZXJQbHVzLmFkZE9uKHRoaXMuc2xpZGVyQ2hhbmdlRnVuYyx0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcInJlc2V0QnRuXCIsdGhpcy5yZXNldEJ0bkZ1bmMsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNvbmZpcm1CdG5cIix0aGlzLmNvbmZpcm1CdG5GdW5jLHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblN1YlZpZXdTaG93KCl7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LlBFUlNPTkFMSU5GT1VQREFURSx0aGlzLHRoaXMudXBkYXRlTW9uZXlWaWV3KTtcclxuICAgICAgICAvLyB0aGlzLm1zZ0luZm9Cb3gub25TdWJWaWV3U2hvdygpXHJcbiAgICAgICAgdGhpcy5zbGlkZXJQbHVzLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB0aGlzLnNsaWRlclBsdXMucHJvID0gMDtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1vbmV5VmlldygpO1xyXG4gICAgICAgIHRoaXMuaW5wdXRFZGl0Qm94LnN0cmluZyA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld0hpZGUoKVxyXG4gICAge1xyXG4gICAgICAgIC8vIHRoaXMubXNnSW5mb0JveC5vblN1YlZpZXdIaWRlKClcclxuICAgICAgICB0aGlzLnNsaWRlclBsdXMuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50LlBFUlNPTkFMSU5GT1VQREFURSx0aGlzLHRoaXMudXBkYXRlTW9uZXlWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0QmFzZU51bSgpe1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCB1cGRhdGVNb25leVZpZXcoKXtcclxuICAgICAgICB0aGlzLm15TW9uZXkuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoR2xvYmFsLlBsYXllckRhdGEucG9pbnQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMuYmFua01vbmV5LnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKEdsb2JhbC5QbGF5ZXJEYXRhLmJhbmtfcG9pbnQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmlldyh0aGlzLnNsaWRlclBsdXMucHJvKTtcclxuICAgICAgICBsZXQgd25kQmFuayA9IDxXbmRCYW5rVUk+R2xvYmFsLlVJLmdldFdpbmRvdyhcIlduZEJhbmtVSVwiKVxyXG4gICAgICAgIGlmKHduZEJhbmspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB3bmRCYW5rLk9uRGF0YVByZXBhcmVkKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaMiea7keWKqOadoeabtOaWsOaYvuekuiAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVZpZXcoIHBybyA6IG51bWJlciApe1xyXG4gICAgICAgIHZhciBiYXNlTnVtID0gdGhpcy5nZXRCYXNlTnVtKCk7IC8v6L+Z6YeM5piv5YWDXHJcbiAgICAgICAgdmFyIGZCYXNlTnVtID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoYmFzZU51bSAqIEdsb2JhbC5TZXR0aW5nLmdsb2RSYXRpbywgdHJ1ZSk7Ly8g5o2V6bG85Lit5Y+v6IO95Ye6546w5bCP5pWw54K55ZCOM+S9je+8jOWcqOi/memHjOe7n+S4gOagvOW8j+WKoOWIpOaWreS4jeeEtuS8muWHuueOsDAuMDA2NOi/meagt+eahO+8jOmSseWMheaYvuekuuS4ujAuMDDkvYbmmK/lrp7pmYXov5jmmK/mnInpkrHnmoRcclxuXHJcbiAgICAgICAgaWYoYmFzZU51bSA9PSAwIHx8IGZCYXNlTnVtID09IFwiMC4wMFwiKXtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dEVkaXRCb3guc3RyaW5nID0gXCIwXCI7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyUGx1cy5wcm8gPSAwO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBybyA9IE1hdGguY2VpbChwcm8gKiAxMDApIC8gMTAwOyAgICAgICAvL+eZvuWIhuWPt+WQkeS4iuWPluaVtFxyXG4gICAgICAgIGxldCBudW0gPSBNYXRoLmZsb29yKGJhc2VOdW0gKiBwcm8gKiAxMDApIC8gMTAwOyAgLy/msYLlh7rlr7nlupTlhYPmlbDkv53nlZnkuKTkvY3lsI/mlbBcclxuICAgICAgICAvLyBpZihwcm8gPT0gMSkgLy/lm6Dmta7ngrnmlbDnibnmgKfnibnmrorlpITnkIbvvIzlkKbliJnmnInor6/lt65cclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIG51bSA9IGJhc2VOdW1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jdXJJbnB1dE51bSA9IG51bTtcclxuICAgICAgICB0aGlzLmlucHV0RWRpdEJveC5zdHJpbmcgPSBudW0gKyBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyUGx1cy5wcm8gPSBwcm87XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOaMiei+k+WFpeahhuabtOaWsOaYvuekuiAqL1xyXG4gICAgcHJvdGVjdGVkIHRleHRDaGFuZ2VGdW5jKCl7XHJcbiAgICAgICAgdmFyIGJhc2VOdW0gPSB0aGlzLmdldEJhc2VOdW0oKTtcclxuICAgICAgICBpZihiYXNlTnVtID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoMCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG51bSA9IHBhcnNlRmxvYXQodGhpcy5pbnB1dEVkaXRCb3guc3RyaW5nID09IFwiXCIgPyBcIjBcIiA6IHRoaXMuaW5wdXRFZGl0Qm94LnN0cmluZyk7IC8v6I635Y+W5YWD5pWwXHJcbiAgICAgICAgaWYobnVtID49IDApe1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL+WPr+iDveeUn+aIkE5hTu+8jOi/memHjOWBmuS/ruato1xyXG4gICAgICAgICAgICBudW0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihudW0gPiBiYXNlTnVtKXtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5zaG93QmFua1RpcHMoXCLovpPlhaXotoXlh7rojIPlm7RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG51bSA9IE1hdGgubWluKG51bSxiYXNlTnVtKTtcclxuICAgICAgICBudW0gPSBOdW1iZXIoR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIobnVtKkdsb2JhbC5TZXR0aW5nLmdsb2RSYXRpbywgdHJ1ZSkpO1xyXG4gICAgICAgIHRoaXMuY3VySW5wdXROdW0gPSBudW07XHJcbiAgICAgICAgdmFyIHBybyA9IE1hdGguY2VpbChudW0gLyBiYXNlTnVtICogMTAwKSAvIDEwMDsgLy/nmb7liIblj7flkJHkuIrlj5bmlbRcclxuICAgICAgICB0aGlzLnNsaWRlclBsdXMucHJvID0gTWF0aC5taW4oMSxwcm8pO1xyXG4gICAgICAgIHRoaXMuaW5wdXRFZGl0Qm94LnN0cmluZyA9IG51bSArIFwiXCI7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBzbGlkZXJDaGFuZ2VGdW5jKCl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCB0aGlzLnNsaWRlclBsdXMucHJvICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlc2V0QnRuRnVuYygpe1xyXG4gICAgICAgIExvZ2dlci5lcnJvcihcIumHjee9rlwiLDApXHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCAwICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbmZpcm1CdG5GdW5jKCl7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLyoqIOmTtuihjOS/oeaBr+ebkuWtkCAqL1xyXG5jbGFzcyBNc2dJbmZvQm94IGV4dGVuZHMgVmlld0Jhc2V7XHJcblxyXG4gICAgcHJpdmF0ZSBiYW5kTm9kZSA6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgbXNnTm9kZSA6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5iYW5kTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJiYW5kTm9kZVwiKTtcclxuICAgICAgICB0aGlzLm1zZ05vZGUgPSB0aGlzLmdldENoaWxkKFwibXNnTm9kZVwiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYmFuZE5vZGUvYmFuZEJ0blwiLHRoaXMuYmFuZEJ0bkZ1bmMsdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdWJWaWV3U2hvdygpe1xyXG4gICAgICAgIC8vIGNjLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tTXNnSW5mb0JveOKAlOKAlOKAlOKAlG9uT3BlblwiKTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFLHRoaXMsdGhpcy51cGRhdGVWaWV3KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBvblN1YlZpZXdIaWRlKCl7XHJcbiAgICAgICAgLy8gY2MubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS1Nc2dJbmZvQm944oCU4oCU4oCU4oCUb25DbG9zZVwiKTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50LlBFUlNPTkFMSU5GT1VQREFURSx0aGlzLHRoaXMudXBkYXRlVmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVZpZXcoKXtcclxuICAgICAgICB2YXIgaGF2ZVBob25lID0gKEdsb2JhbC5QbGF5ZXJEYXRhLnBob25lICE9IG51bGwgJiYgR2xvYmFsLlBsYXllckRhdGEucGhvbmUgIT0gXCJcIik7XHJcbiAgICAgICAgdGhpcy5iYW5kTm9kZS5hY3RpdmUgPSAhaGF2ZVBob25lO1xyXG4gICAgICAgIHRoaXMubXNnTm9kZS5hY3RpdmUgPSBoYXZlUGhvbmU7XHJcbiAgICB9XHJcblxyXG4gICAgYmFuZEJ0bkZ1bmMoKXtcclxuICAgICAgICAvL+aJk+W8gOaJi+acuue7keWumlxyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kQmluZFBob25lXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKiog5ouT5bGVc2xpZGVyICovXHJcbmNsYXNzIFNsaWRlclBsdXMgZXh0ZW5kcyBWaWV3QmFzZXtcclxuXHJcbiAgICBwcml2YXRlIHByb2dyZXNzQmFyIDogY2MuUHJvZ3Jlc3NCYXIgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgc2xpZGVyQmFyIDogY2MuU2xpZGVyID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHZhbHVlTGFiZWwgOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIGhhbmRsZU5vZGU6IGNjLk5vZGU7XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzQmFyID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0Jhcik7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJCYXIgPSB0aGlzLmdldENvbXBvbmVudChcInNsaWRlclwiLGNjLlNsaWRlcik7XHJcbiAgICAgICAgdGhpcy52YWx1ZUxhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJzbGlkZXIvSGFuZGxlL3ZhbHVlQm94L3ZhbHVlTGFiZWxcIixjYy5MYWJlbCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyQmFyLm5vZGUub24oJ3NsaWRlJyx0aGlzLnVwZGF0ZVZpZXcsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJCYXIubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy50b3VjaERvd24sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyQmFyLmhhbmRsZS5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy50b3VjaERvd24sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJzbGlkZXIvSGFuZGxlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvdWNoRG93bigpe1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnRuU291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVWaWV3KCl7XHJcbiAgICAgICAgdmFyIHBybyA9IHRoaXMuc2xpZGVyQmFyLnByb2dyZXNzO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXIucHJvZ3Jlc3MgPSBwcm87XHJcbiAgICAgICAgdGhpcy52YWx1ZUxhYmVsLnN0cmluZyA9IHBybyAqIDEwMCArIFwiJVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcHJvKCBwcm8gOiBudW1iZXIgKXtcclxuICAgICAgICB0aGlzLnNsaWRlckJhci5wcm9ncmVzcyA9IHBybztcclxuICAgICAgICB0aGlzLnByb2dyZXNzQmFyLnByb2dyZXNzID0gcHJvO1xyXG4gICAgICAgIGlmIChwcm8gPT0gMCkgICAgICAgICAgIC8vZGVidWcg5omT5byA6aG16Z2i5by556qX5Yqo55S75pe277yMaGFuZGxl5L2N572u6K6h566X6ZSZ6K+v77yM5L+u5pS5dWnnu4Tku7bpurvng6bvvIzmmoLml7bmmrTlipvph43orr5cclxuICAgICAgICAgICAgdGhpcy5mb3JjZUxvY2F0ZSgpO1xyXG4gICAgICAgIHRoaXMudmFsdWVMYWJlbC5zdHJpbmcgPSBNYXRoLmZsb29yKHBybyAqIDEwMCkgKyBcIiVcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBybygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNsaWRlckJhci5wcm9ncmVzcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkT24oZnVuYyAsIHRhcmdldCl7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJCYXIubm9kZS5vbignc2xpZGUnLGZ1bmMsdGFyZ2V0KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBmb3JjZUxvY2F0ZSgpe1xyXG4gICAgICAgIHRoaXMuaGFuZGxlTm9kZS5zZXRQb3NpdGlvbihjYy52MigtMzEyLjUsIDApKTtcclxuICAgIH1cclxufSJdfQ==