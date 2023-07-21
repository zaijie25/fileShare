
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/common/ExtractCashWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '707a8b0qEtCYZzJxTsWPhZk', 'ExtractCashWin');
// hall/scripts/logic/hall/ui/money/ui/common/ExtractCashWin.ts

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
var ExtractEvent_1 = require("../extractCash/ExtractEvent");
var ExtractCashWin = /** @class */ (function (_super) {
    __extends(ExtractCashWin, _super);
    function ExtractCashWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.msgLabel = null;
        _this.curMoneyNumLabel = null;
        _this.ecNumEditBox = null;
        _this.rateLabel = null;
        return _this;
    }
    ExtractCashWin.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("ExtractModel");
        this.msgLabel = this.getComponent("aliMsg/msgLabel", cc.Label);
        this.curMoneyNumLabel = this.getComponent("CurMoneyBox/curMoneyNumLabel", cc.Label);
        this.ecNumEditBox = this.getComponent("ecEditBox", cc.EditBox);
        this.rateLabel = this.getComponent("rateLabel", cc.RichText);
        // this.addCommonClick("confirmBtn",this.confirmBtn,this);
        // this.addCommonClick("resetBtn",this.resetBtnFunc,this);
    };
    ExtractCashWin.prototype.chipItemToggleFunc = function (data) {
        var num = this.ecNumEditBox.string != "" ? parseFloat(this.ecNumEditBox.string) : 0; //获取元数
        num = Math.max(num, 0);
        num = Math.round(num * 100) / 100; //保留两位小数
        num += data;
        this.ecNumEditBox.string = num + "";
    };
    ExtractCashWin.prototype.onSubViewShow = function () {
        //Listener
        this.model.on(ExtractEvent_1.ExtractEvent.ChipItemToggle, this, this.chipItemToggleFunc);
        Global.Event.on(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.updateCurMoney);
        this.updateCurMoney();
        this.updateChipList();
        this.resetBtnFunc();
    };
    ExtractCashWin.prototype.onSubViewHide = function () {
        //Listener
        this.model.off(ExtractEvent_1.ExtractEvent.ChipItemToggle, this, this.chipItemToggleFunc);
        Global.Event.off(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.updateCurMoney);
        //this.clearItem();
    };
    /** 更新当前可提现金额 */
    ExtractCashWin.prototype.updateCurMoney = function () {
        if (!this.model.bankDatas) {
            return;
        }
    };
    /** 重置提现金额 */
    ExtractCashWin.prototype.resetBtnFunc = function () {
        this.ecNumEditBox.string = "";
    };
    /** 确认提现 */
    ExtractCashWin.prototype.confirmBtn = function () {
    };
    /** 筹码列表更新 */
    ExtractCashWin.prototype.updateChipList = function () {
    };
    return ExtractCashWin;
}(ViewBase_1.default));
exports.default = ExtractCashWin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGNvbW1vblxcRXh0cmFjdENhc2hXaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsNERBQXVEO0FBQ3ZELCtEQUEwRDtBQUUxRCw0REFBMkQ7QUFHM0Q7SUFBNEMsa0NBQVE7SUFBcEQ7UUFBQSxxRUE0RUM7UUF0RWEsY0FBUSxHQUFhLElBQUksQ0FBQztRQUUxQixzQkFBZ0IsR0FBYSxJQUFJLENBQUM7UUFFbEMsa0JBQVksR0FBZSxJQUFJLENBQUM7UUFFaEMsZUFBUyxHQUFZLElBQUksQ0FBQTs7SUFnRXZDLENBQUM7SUE5RGEsaUNBQVEsR0FBbEI7UUFFSSxJQUFJLENBQUMsS0FBSyxHQUFpQixNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUV4RSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLDhCQUE4QixFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU1RCwwREFBMEQ7UUFDMUQsMERBQTBEO0lBQzlELENBQUM7SUFFUywyQ0FBa0IsR0FBNUIsVUFBOEIsSUFBSTtRQUM5QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO1FBQzNGLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUUsUUFBUTtRQUM1QyxHQUFHLElBQUksSUFBSSxDQUFDO1FBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBR00sc0NBQWEsR0FBcEI7UUFDSSxVQUFVO1FBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsMkJBQVksQ0FBQyxjQUFjLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLHFCQUFXLENBQUMsa0JBQWtCLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUV6RSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU0sc0NBQWEsR0FBcEI7UUFDSSxVQUFVO1FBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsMkJBQVksQ0FBQyxjQUFjLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLHFCQUFXLENBQUMsa0JBQWtCLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxRSxtQkFBbUI7SUFDdkIsQ0FBQztJQUVELGdCQUFnQjtJQUNOLHVDQUFjLEdBQXhCO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFDO1lBQ3JCLE9BQU87U0FDVjtJQUNMLENBQUM7SUFFRCxhQUFhO0lBQ0gscUNBQVksR0FBdEI7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELFdBQVc7SUFDRCxtQ0FBVSxHQUFwQjtJQUVBLENBQUM7SUFFRCxhQUFhO0lBQ0gsdUNBQWMsR0FBeEI7SUFFQSxDQUFDO0lBR0wscUJBQUM7QUFBRCxDQTVFQSxBQTRFQyxDQTVFMkMsa0JBQVEsR0E0RW5EIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IEdsb2JhbEV2ZW50IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb3JlL0dsb2JhbEV2ZW50XCI7XHJcbmltcG9ydCBFeHRyYWN0TW9kZWwgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvRXh0cmFjdE1vZGVsXCI7XHJcbmltcG9ydCB7IEV4dHJhY3RFdmVudCB9IGZyb20gXCIuLi9leHRyYWN0Q2FzaC9FeHRyYWN0RXZlbnRcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHRyYWN0Q2FzaFdpbiBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgbW9kZWwgOiBFeHRyYWN0TW9kZWw7XHJcblxyXG4gICAgcHJvdGVjdGVkIGluZm8gOiBzdHJpbmc7XHJcblxyXG4gICAgcHJvdGVjdGVkIG1zZ0xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIGN1ck1vbmV5TnVtTGFiZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgZWNOdW1FZGl0Qm94OiBjYy5FZGl0Qm94ID0gbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgcmF0ZUxhYmVsOmNjLkxhYmVsID0gbnVsbFxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxFeHRyYWN0TW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkV4dHJhY3RNb2RlbFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5tc2dMYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiYWxpTXNnL21zZ0xhYmVsXCIsY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuY3VyTW9uZXlOdW1MYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiQ3VyTW9uZXlCb3gvY3VyTW9uZXlOdW1MYWJlbFwiLGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmVjTnVtRWRpdEJveCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiZWNFZGl0Qm94XCIsY2MuRWRpdEJveCk7XHJcbiAgICAgICAgdGhpcy5yYXRlTGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcInJhdGVMYWJlbFwiLGNjLlJpY2hUZXh0KTtcclxuICAgICAgICBcclxuICAgICAgICAvLyB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY29uZmlybUJ0blwiLHRoaXMuY29uZmlybUJ0bix0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLmFkZENvbW1vbkNsaWNrKFwicmVzZXRCdG5cIix0aGlzLnJlc2V0QnRuRnVuYyx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY2hpcEl0ZW1Ub2dnbGVGdW5jKCBkYXRhICl7XHJcbiAgICAgICAgdmFyIG51bSA9IHRoaXMuZWNOdW1FZGl0Qm94LnN0cmluZyAhPSBcIlwiID8gcGFyc2VGbG9hdCh0aGlzLmVjTnVtRWRpdEJveC5zdHJpbmcpIDogMDsgLy/ojrflj5blhYPmlbBcclxuICAgICAgICBudW0gPSBNYXRoLm1heChudW0sMCk7XHJcbiAgICAgICAgbnVtID0gTWF0aC5yb3VuZChudW0gKiAxMDApIC8gMTAwOyAgLy/kv53nlZnkuKTkvY3lsI/mlbBcclxuICAgICAgICBudW0gKz0gZGF0YTtcclxuICAgICAgICB0aGlzLmVjTnVtRWRpdEJveC5zdHJpbmcgPSBudW0gKyBcIlwiO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgb25TdWJWaWV3U2hvdygpe1xyXG4gICAgICAgIC8vTGlzdGVuZXJcclxuICAgICAgICB0aGlzLm1vZGVsLm9uKEV4dHJhY3RFdmVudC5DaGlwSXRlbVRvZ2dsZSx0aGlzLHRoaXMuY2hpcEl0ZW1Ub2dnbGVGdW5jKTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFLHRoaXMsdGhpcy51cGRhdGVDdXJNb25leSk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlQ3VyTW9uZXkoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNoaXBMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5yZXNldEJ0bkZ1bmMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TdWJWaWV3SGlkZSgpe1xyXG4gICAgICAgIC8vTGlzdGVuZXJcclxuICAgICAgICB0aGlzLm1vZGVsLm9mZihFeHRyYWN0RXZlbnQuQ2hpcEl0ZW1Ub2dnbGUsdGhpcyx0aGlzLmNoaXBJdGVtVG9nZ2xlRnVuYyk7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5QRVJTT05BTElORk9VUERBVEUsdGhpcyx0aGlzLnVwZGF0ZUN1ck1vbmV5KTtcclxuICAgICAgICAvL3RoaXMuY2xlYXJJdGVtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOabtOaWsOW9k+WJjeWPr+aPkOeOsOmHkeminSAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUN1ck1vbmV5KCl7XHJcbiAgICAgICAgaWYoIXRoaXMubW9kZWwuYmFua0RhdGFzKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog6YeN572u5o+Q546w6YeR6aKdICovXHJcbiAgICBwcm90ZWN0ZWQgcmVzZXRCdG5GdW5jKCl7XHJcbiAgICAgICAgdGhpcy5lY051bUVkaXRCb3guc3RyaW5nID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKiog56Gu6K6k5o+Q546wICovXHJcbiAgICBwcm90ZWN0ZWQgY29uZmlybUJ0bigpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKiog562556CB5YiX6KGo5pu05pawICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlQ2hpcExpc3QoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn1cclxuIl19