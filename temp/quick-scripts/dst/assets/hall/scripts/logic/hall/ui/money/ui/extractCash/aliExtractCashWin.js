
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/extractCash/aliExtractCashWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f97f8Z6ynZB47yG2yuiV4p8', 'aliExtractCashWin');
// hall/scripts/logic/hall/ui/money/ui/extractCash/aliExtractCashWin.ts

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
var aliExtractCashWin = /** @class */ (function (_super) {
    __extends(aliExtractCashWin, _super);
    function aliExtractCashWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.aliAccountLabel = null;
        return _this;
    }
    aliExtractCashWin.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.aliAccountLabel = this.getComponent("aliAccountBox/aliAccountTextLabel", cc.RichText);
    };
    aliExtractCashWin.prototype.onSubViewShow = function () {
        _super.prototype.onSubViewShow.call(this);
        var datas = this.model.bankDatas || {};
        this.info = "1.支付宝单次提现额度为%s~%s元，且只能为10的倍数\n2.每人每天支付宝最多提现%s元，最多提现%s次\n3.每笔提现需达到充值金额一倍流水，且余额至少保留%s元";
        // if (aliPut > 0){
        //     let str = aliPut + '%';
        //     this.info += `\n4.单次提现收取提现额度${str}的手续费`;
        // }
        this.rateLabel.string = this.model.getRateInfo();
        this.info += this.model.getPutInfo(2);
        this.msgLabel.string = cc.js.formatStr(this.info, datas.ali_min_put_point, datas.ali_max_put_point, datas.ali_day_max_put_point, datas.ali_put_day_max_num, datas.forzen_point);
        this.aliAccountLabel.string = "<b>" + datas.ali_account + "</b>" || "";
    };
    aliExtractCashWin.prototype.checkData = function () {
        var num = parseInt(this.ecNumEditBox.string);
        if (num < this.model.getAliMinLimit()) {
            // Global.UI.showSingleBox("提现金额超出限制范围" + this.model.getAliMinLimit() + "元");
            Global.UI.fastTip("提现金额超出限制范围");
            return false;
        }
        ;
        if (num > this.model.getAliMaxLimit()) {
            // Global.UI.showSingleBox("提现金额超出限制范围" + this.model.getAliMaxLimit() + "元");
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
    aliExtractCashWin.prototype.confirmBtn = function () {
        if (this.checkData()) {
            var num = parseInt(this.ecNumEditBox.string);
            this.model.reqAliApplyCash(num);
        }
        else {
            this.resetBtnFunc();
        }
    };
    /** 筹码列表更新 */
    aliExtractCashWin.prototype.updateChipList = function () {
    };
    return aliExtractCashWin;
}(ExtractCashWin_1.default));
exports.default = aliExtractCashWin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGV4dHJhY3RDYXNoXFxhbGlFeHRyYWN0Q2FzaFdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBc0Q7QUFHdEQ7SUFBK0MscUNBQWM7SUFBN0Q7UUFBQSxxRUE4REM7UUE1RFcscUJBQWUsR0FBZ0IsSUFBSSxDQUFDOztJQTREaEQsQ0FBQztJQTFEYSxvQ0FBUSxHQUFsQjtRQUVJLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQ0FBbUMsRUFBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVNLHlDQUFhLEdBQXBCO1FBQ0ksaUJBQU0sYUFBYSxXQUFFLENBQUM7UUFDdEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsc0ZBQXNGLENBQUM7UUFDbkcsbUJBQW1CO1FBQ25CLDhCQUE4QjtRQUM5QiwrQ0FBK0M7UUFDL0MsSUFBSTtRQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDaEQsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBQyxLQUFLLENBQUMsaUJBQWlCLEVBQzVGLEtBQUssQ0FBQyxxQkFBcUIsRUFBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7SUFDM0UsQ0FBQztJQUVPLHFDQUFTLEdBQWpCO1FBQ0ksSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsSUFBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUNsQyw2RUFBNkU7WUFDN0UsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEMsT0FBTyxLQUFLLENBQUE7U0FDZjtRQUFBLENBQUM7UUFDRixJQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ2xDLDZFQUE2RTtZQUM3RSxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoQyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDZCwyQ0FBMkM7WUFDM0MsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbEMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUN6RCwrQ0FBK0M7WUFDL0MsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN0QyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFUyxzQ0FBVSxHQUFwQjtRQUNJLElBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDO1lBQ2hCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25DO2FBQUk7WUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRUQsYUFBYTtJQUNILDBDQUFjLEdBQXhCO0lBQ0EsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0E5REEsQUE4REMsQ0E5RDhDLHdCQUFjLEdBOEQ1RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFeHRyYWN0Q2FzaFdpbiBmcm9tIFwiLi4vY29tbW9uL0V4dHJhY3RDYXNoV2luXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYWxpRXh0cmFjdENhc2hXaW4gZXh0ZW5kcyBFeHRyYWN0Q2FzaFdpbiB7XHJcblxyXG4gICAgcHJpdmF0ZSBhbGlBY2NvdW50TGFiZWw6IGNjLlJpY2hUZXh0ID0gbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLmluaXRWaWV3KCk7XHJcbiAgICAgICAgdGhpcy5hbGlBY2NvdW50TGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcImFsaUFjY291bnRCb3gvYWxpQWNjb3VudFRleHRMYWJlbFwiLGNjLlJpY2hUZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TdWJWaWV3U2hvdygpe1xyXG4gICAgICAgIHN1cGVyLm9uU3ViVmlld1Nob3coKTtcclxuICAgICAgICB2YXIgZGF0YXMgPSB0aGlzLm1vZGVsLmJhbmtEYXRhcyB8fCB7fTtcclxuICAgICAgICB0aGlzLmluZm8gPSBcIjEu5pSv5LuY5a6d5Y2V5qyh5o+Q546w6aKd5bqm5Li6JXN+JXPlhYPvvIzkuJTlj6rog73kuLoxMOeahOWAjeaVsFxcbjIu5q+P5Lq65q+P5aSp5pSv5LuY5a6d5pyA5aSa5o+Q546wJXPlhYPvvIzmnIDlpJrmj5DnjrAlc+asoVxcbjMu5q+P56yU5o+Q546w6ZyA6L6+5Yiw5YWF5YC86YeR6aKd5LiA5YCN5rWB5rC077yM5LiU5L2Z6aKd6Iez5bCR5L+d55WZJXPlhYNcIjtcclxuICAgICAgICAvLyBpZiAoYWxpUHV0ID4gMCl7XHJcbiAgICAgICAgLy8gICAgIGxldCBzdHIgPSBhbGlQdXQgKyAnJSc7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaW5mbyArPSBgXFxuNC7ljZXmrKHmj5DnjrDmlLblj5bmj5DnjrDpop3luqYke3N0cn3nmoTmiYvnu63otLlgO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLnJhdGVMYWJlbC5zdHJpbmcgPSB0aGlzLm1vZGVsLmdldFJhdGVJbmZvKClcclxuICAgICAgICB0aGlzLmluZm8gKz0gdGhpcy5tb2RlbC5nZXRQdXRJbmZvKDIpXHJcbiAgICAgICAgdGhpcy5tc2dMYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIodGhpcy5pbmZvLGRhdGFzLmFsaV9taW5fcHV0X3BvaW50LGRhdGFzLmFsaV9tYXhfcHV0X3BvaW50LFxyXG4gICAgICAgICAgICBkYXRhcy5hbGlfZGF5X21heF9wdXRfcG9pbnQsZGF0YXMuYWxpX3B1dF9kYXlfbWF4X251bSxkYXRhcy5mb3J6ZW5fcG9pbnQpO1xyXG4gICAgICAgIHRoaXMuYWxpQWNjb3VudExhYmVsLnN0cmluZyA9IFwiPGI+XCIgKyBkYXRhcy5hbGlfYWNjb3VudCArIFwiPC9iPlwiIHx8IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0RhdGEoKXtcclxuICAgICAgICB2YXIgbnVtID0gcGFyc2VJbnQodGhpcy5lY051bUVkaXRCb3guc3RyaW5nKTtcclxuICAgICAgICBpZihudW0gPCB0aGlzLm1vZGVsLmdldEFsaU1pbkxpbWl0KCkpIHtcclxuICAgICAgICAgICAgLy8gR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLmj5DnjrDph5Hpop3otoXlh7rpmZDliLbojIPlm7RcIiArIHRoaXMubW9kZWwuZ2V0QWxpTWluTGltaXQoKSArIFwi5YWDXCIpO1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuaPkOeOsOmHkeminei2heWHuumZkOWItuiMg+WbtFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZihudW0gPiB0aGlzLm1vZGVsLmdldEFsaU1heExpbWl0KCkpIHtcclxuICAgICAgICAgICAgLy8gR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLmj5DnjrDph5Hpop3otoXlh7rpmZDliLbojIPlm7RcIiArIHRoaXMubW9kZWwuZ2V0QWxpTWF4TGltaXQoKSArIFwi5YWDXCIpO1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuaPkOeOsOmHkeminei2heWHuumZkOWItuiMg+WbtFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihudW0gJSAxMCAhPSAwKSB7XHJcbiAgICAgICAgICAgIC8vIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi5o+Q546w6YeR6aKd5Y+q6IO95Li6MTDnmoTlgI3mlbBcIik7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5o+Q546w6YeR6aKd5Y+q6IO95Li6MTDnmoTlgI3mlbBcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobnVtID4gR2xvYmFsLlBsYXllckRhdGEucG9pbnQgLyBHbG9iYWwuU2V0dGluZy5nbG9kUmF0aW8pIHtcclxuICAgICAgICAgICAgLy8gR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLlj5Hotbfmj5DnjrDlpLHotKXvvIzkvaDnmoTlj6/mj5DnjrDph5Hpop3kuI3otrNcIik7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5Y+R6LW35o+Q546w5aSx6LSl77yM5L2g55qE5Y+v5o+Q546w6YeR6aKd5LiN6LazXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjb25maXJtQnRuKCl7XHJcbiAgICAgICAgaWYodGhpcy5jaGVja0RhdGEoKSl7XHJcbiAgICAgICAgICAgIHZhciBudW0gPSBwYXJzZUludCh0aGlzLmVjTnVtRWRpdEJveC5zdHJpbmcpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnJlcUFsaUFwcGx5Q2FzaChudW0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0QnRuRnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog562556CB5YiX6KGo5pu05pawICovXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlQ2hpcExpc3QoKXtcclxuICAgIH1cclxufVxyXG4iXX0=