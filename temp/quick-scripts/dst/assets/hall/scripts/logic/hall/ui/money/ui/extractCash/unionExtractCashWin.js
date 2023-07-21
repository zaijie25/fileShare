
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/extractCash/unionExtractCashWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '924ben4i0ZFz5Rj/f99jAg4', 'unionExtractCashWin');
// hall/scripts/logic/hall/ui/money/ui/extractCash/unionExtractCashWin.ts

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
var ExtractCashWin_1 = require("../common/ExtractCashWin");
var unionExtractCashWin = /** @class */ (function (_super) {
    __extends(unionExtractCashWin, _super);
    function unionExtractCashWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.unionAccountLabel = null;
        return _this;
    }
    unionExtractCashWin.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.unionAccountLabel = this.getComponent("unionAccountBox/unionAccountLabel", cc.RichText);
    };
    unionExtractCashWin.prototype.onSubViewShow = function () {
        _super.prototype.onSubViewShow.call(this);
        var datas = this.model.bankDatas || {};
        this.info = "1.单次提现额度为%s元~%s元，且只能为10的倍数\n2.每人每天提现次数最多为%s次，钱包余额至少保留%s元\n3.每笔提现需达到充值金额的一倍流水，详情请咨询客服";
        // let [bankPut, put] = this.model.getBankPutServerRecharge();
        // if (bankPut > 0){
        //     let str = bankPut + '%';
        //     this.info += `\n4.单次提现收取提现额度${str}的手续费`;
        // }
        this.rateLabel.string = this.model.getRateInfo();
        this.info += this.model.getPutInfo(1);
        this.msgLabel.string = cc.js.formatStr(this.info, datas.bank_min_put_point, datas.bank_max_put_point, datas.bank_put_day_max_num, datas.forzen_point);
        this.unionAccountLabel.string = "<b>" + datas.entrus_bank_account + "</b>" || "";
    };
    unionExtractCashWin.prototype.checkData = function () {
        var num = parseInt(this.ecNumEditBox.string);
        if (num < this.model.getUnionMinLimit()) {
            // Global.UI.showSingleBox("提现金额超出限制范围" + this.model.getUnionMinLimit() + "元");
            Global.UI.fastTip("提现金额超出限制范围");
            return false;
        }
        ;
        if (num > this.model.getUnionMaxLimit()) {
            // Global.UI.showSingleBox("提现金额超出限制范围" + this.model.getUnionMaxLimit() + "元");
            Global.UI.fastTip("提现金额超出限制范围");
            return false;
        }
        if (num % 10 != 0) {
            // Global.UI.showSingleBox("提现金额只能为10的倍数");
            Global.UI.fastTip("提现金额只能为10的倍数");
            return false;
        }
        if (num > Global.PlayerData.point / Global.Setting.glodRatio) {
            // Global.UI.showSingleBox("发起提现失败，你的可提现金额不足");
            Global.UI.fastTip("发起提现失败，你的可提现金额不足");
            return false;
        }
        return true;
    };
    unionExtractCashWin.prototype.confirmBtn = function () {
        if (this.checkData()) {
            var num = parseInt(this.ecNumEditBox.string);
            this.model.reqUnionApplyCash(num);
        }
        else {
            this.resetBtnFunc();
        }
    };
    /** 筹码列表更新 */
    unionExtractCashWin.prototype.updateChipList = function () {
    };
    return unionExtractCashWin;
}(ExtractCashWin_1.default));
exports.default = unionExtractCashWin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGV4dHJhY3RDYXNoXFx1bmlvbkV4dHJhY3RDYXNoV2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUFzRDtBQUd0RDtJQUFpRCx1Q0FBYztJQUEvRDtRQUFBLHFFQWdFQztRQTlEVyx1QkFBaUIsR0FBZ0IsSUFBSSxDQUFDOztJQThEbEQsQ0FBQztJQTVEYSxzQ0FBUSxHQUFsQjtRQUVJLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG1DQUFtQyxFQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBRU0sMkNBQWEsR0FBcEI7UUFDSSxpQkFBTSxhQUFhLFdBQUUsQ0FBQztRQUN0QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksR0FBRyxzRkFBc0YsQ0FBQztRQUNuRyw4REFBOEQ7UUFDOUQsb0JBQW9CO1FBQ3BCLCtCQUErQjtRQUMvQiwrQ0FBK0M7UUFDL0MsSUFBSTtRQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDaEQsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBQyxLQUFLLENBQUMsa0JBQWtCLEVBQzlGLEtBQUssQ0FBQyxvQkFBb0IsRUFBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLG1CQUFtQixHQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDckYsQ0FBQztJQUVPLHVDQUFTLEdBQWpCO1FBQ0ksSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsSUFBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BDLCtFQUErRTtZQUMvRSxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoQyxPQUFPLEtBQUssQ0FBQTtTQUNmO1FBQUEsQ0FBQztRQUNGLElBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQywrRUFBK0U7WUFDL0UsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ2QsMkNBQTJDO1lBQzNDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDekQsK0NBQStDO1lBQy9DLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDdEMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRVMsd0NBQVUsR0FBcEI7UUFDSSxJQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBQztZQUNoQixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JDO2FBQUk7WUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRUQsYUFBYTtJQUNILDRDQUFjLEdBQXhCO0lBQ0EsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FoRUEsQUFnRUMsQ0FoRWdELHdCQUFjLEdBZ0U5RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFeHRyYWN0Q2FzaFdpbiBmcm9tIFwiLi4vY29tbW9uL0V4dHJhY3RDYXNoV2luXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdW5pb25FeHRyYWN0Q2FzaFdpbiBleHRlbmRzIEV4dHJhY3RDYXNoV2luIHtcclxuXHJcbiAgICBwcml2YXRlIHVuaW9uQWNjb3VudExhYmVsOiBjYy5SaWNoVGV4dCA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5pbml0VmlldygpO1xyXG5cclxuICAgICAgICB0aGlzLnVuaW9uQWNjb3VudExhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJ1bmlvbkFjY291bnRCb3gvdW5pb25BY2NvdW50TGFiZWxcIixjYy5SaWNoVGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU3ViVmlld1Nob3coKXtcclxuICAgICAgICBzdXBlci5vblN1YlZpZXdTaG93KCk7XHJcbiAgICAgICAgdmFyIGRhdGFzID0gdGhpcy5tb2RlbC5iYW5rRGF0YXMgfHwge307XHJcbiAgICAgICAgdGhpcy5pbmZvID0gXCIxLuWNleasoeaPkOeOsOmineW6puS4uiVz5YWDfiVz5YWD77yM5LiU5Y+q6IO95Li6MTDnmoTlgI3mlbBcXG4yLuavj+S6uuavj+WkqeaPkOeOsOasoeaVsOacgOWkmuS4uiVz5qyh77yM6ZKx5YyF5L2Z6aKd6Iez5bCR5L+d55WZJXPlhYNcXG4zLuavj+eslOaPkOeOsOmcgOi+vuWIsOWFheWAvOmHkemineeahOS4gOWAjea1geawtO+8jOivpuaDheivt+WSqOivouWuouacjVwiO1xyXG4gICAgICAgIC8vIGxldCBbYmFua1B1dCwgcHV0XSA9IHRoaXMubW9kZWwuZ2V0QmFua1B1dFNlcnZlclJlY2hhcmdlKCk7XHJcbiAgICAgICAgLy8gaWYgKGJhbmtQdXQgPiAwKXtcclxuICAgICAgICAvLyAgICAgbGV0IHN0ciA9IGJhbmtQdXQgKyAnJSc7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaW5mbyArPSBgXFxuNC7ljZXmrKHmj5DnjrDmlLblj5bmj5DnjrDpop3luqYke3N0cn3nmoTmiYvnu63otLlgO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLnJhdGVMYWJlbC5zdHJpbmcgPSB0aGlzLm1vZGVsLmdldFJhdGVJbmZvKClcclxuICAgICAgICB0aGlzLmluZm8gKz0gdGhpcy5tb2RlbC5nZXRQdXRJbmZvKDEpXHJcbiAgICAgICAgdGhpcy5tc2dMYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIodGhpcy5pbmZvLGRhdGFzLmJhbmtfbWluX3B1dF9wb2ludCxkYXRhcy5iYW5rX21heF9wdXRfcG9pbnQsXHJcbiAgICAgICAgICAgIGRhdGFzLmJhbmtfcHV0X2RheV9tYXhfbnVtLGRhdGFzLmZvcnplbl9wb2ludCk7XHJcbiAgICAgICAgdGhpcy51bmlvbkFjY291bnRMYWJlbC5zdHJpbmcgPSBcIjxiPlwiICsgZGF0YXMuZW50cnVzX2JhbmtfYWNjb3VudCArIFwiPC9iPlwiIHx8IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0RhdGEoKXtcclxuICAgICAgICB2YXIgbnVtID0gcGFyc2VJbnQodGhpcy5lY051bUVkaXRCb3guc3RyaW5nKTtcclxuICAgICAgICBpZihudW0gPCB0aGlzLm1vZGVsLmdldFVuaW9uTWluTGltaXQoKSkge1xyXG4gICAgICAgICAgICAvLyBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIuaPkOeOsOmHkeminei2heWHuumZkOWItuiMg+WbtFwiICsgdGhpcy5tb2RlbC5nZXRVbmlvbk1pbkxpbWl0KCkgKyBcIuWFg1wiKTtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLmj5DnjrDph5Hpop3otoXlh7rpmZDliLbojIPlm7RcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYobnVtID4gdGhpcy5tb2RlbC5nZXRVbmlvbk1heExpbWl0KCkpIHtcclxuICAgICAgICAgICAgLy8gR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLmj5DnjrDph5Hpop3otoXlh7rpmZDliLbojIPlm7RcIiArIHRoaXMubW9kZWwuZ2V0VW5pb25NYXhMaW1pdCgpICsgXCLlhYNcIik7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5o+Q546w6YeR6aKd6LaF5Ye66ZmQ5Yi26IyD5Zu0XCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG51bSAlIDEwICE9IDApIHtcclxuICAgICAgICAgICAgLy8gR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLmj5DnjrDph5Hpop3lj6rog73kuLoxMOeahOWAjeaVsFwiKTtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLmj5DnjrDph5Hpop3lj6rog73kuLoxMOeahOWAjeaVsFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihudW0gPiBHbG9iYWwuUGxheWVyRGF0YS5wb2ludCAvIEdsb2JhbC5TZXR0aW5nLmdsb2RSYXRpbykge1xyXG4gICAgICAgICAgICAvLyBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIuWPkei1t+aPkOeOsOWksei0pe+8jOS9oOeahOWPr+aPkOeOsOmHkemineS4jei2s1wiKTtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlj5Hotbfmj5DnjrDlpLHotKXvvIzkvaDnmoTlj6/mj5DnjrDph5Hpop3kuI3otrNcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbmZpcm1CdG4oKXtcclxuICAgICAgICBpZih0aGlzLmNoZWNrRGF0YSgpKXtcclxuICAgICAgICAgICAgdmFyIG51bSA9IHBhcnNlSW50KHRoaXMuZWNOdW1FZGl0Qm94LnN0cmluZyk7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwucmVxVW5pb25BcHBseUNhc2gobnVtKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEJ0bkZ1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOetueeggeWIl+ihqOabtOaWsCAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUNoaXBMaXN0KCl7XHJcbiAgICB9XHJcbn1cclxuIl19