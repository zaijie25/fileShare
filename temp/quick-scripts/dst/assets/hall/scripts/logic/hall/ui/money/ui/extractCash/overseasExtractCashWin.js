
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/extractCash/overseasExtractCashWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '61306RoVaxCVqcoUY9dvHJh', 'overseasExtractCashWin');
// hall/scripts/logic/hall/ui/money/ui/extractCash/overseasExtractCashWin.ts

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
var overseasExtractCashWin = /** @class */ (function (_super) {
    __extends(overseasExtractCashWin, _super);
    function overseasExtractCashWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.OverseasAccountLabel = null;
        return _this;
    }
    overseasExtractCashWin.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.OverseasAccountLabel = this.getComponent("OverseasAccountBox/OverseasAccountLabel", cc.RichText);
    };
    overseasExtractCashWin.prototype.onSubViewShow = function () {
        _super.prototype.onSubViewShow.call(this);
        var datas = this.model.bankDatas || {}; //海外账户信息
        this.info = "tips：\nIf you have any questions, please contact customer service!\n温馨提示：\n如有问题，请联系客服咨询！";
        this.msgLabel.string = this.info;
        this.OverseasAccountLabel.string = "<b>" + datas.over_sea_entrus_bank_account + "</b>" || "";
    };
    overseasExtractCashWin.prototype.checkData = function () {
        var num = parseInt(this.ecNumEditBox.string);
        if (num < this.model.getOverseasMaxLimit()) {
            Global.UI.fastTip("提现金额超出限制范围");
            return false;
        }
        ;
        if (num > this.model.getOverseasMinLimit()) {
            Global.UI.fastTip("提现金额超出限制范围");
            return false;
        }
        if (num % 10 != 0) {
            Global.UI.fastTip("提现金额只能为10的倍数");
            return false;
        }
        if (num > Global.PlayerData.point / Global.Setting.glodRatio) {
            Global.UI.fastTip("发起提现失败，你的可提现金额不足");
            return false;
        }
        return true;
    };
    overseasExtractCashWin.prototype.confirmBtn = function () {
        if (this.checkData()) {
            var num = parseInt(this.ecNumEditBox.string);
            // this.model.reqUnionApplyCash(num);
            this.model.reqOverseasApplyCash(num);
            // 海外提现接口
        }
        else {
            this.resetBtnFunc();
        }
    };
    /** 筹码列表更新 */
    overseasExtractCashWin.prototype.updateChipList = function () {
    };
    return overseasExtractCashWin;
}(ExtractCashWin_1.default));
exports.default = overseasExtractCashWin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGV4dHJhY3RDYXNoXFxvdmVyc2Vhc0V4dHJhY3RDYXNoV2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUFzRDtBQUV0RDtJQUFvRCwwQ0FBYztJQUFsRTtRQUFBLHFFQXFEQztRQXBEVywwQkFBb0IsR0FBZ0IsSUFBSSxDQUFDOztJQW9EckQsQ0FBQztJQWxEYSx5Q0FBUSxHQUFsQjtRQUVJLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHlDQUF5QyxFQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6RyxDQUFDO0lBRU0sOENBQWEsR0FBcEI7UUFDSSxpQkFBTSxhQUFhLFdBQUUsQ0FBQztRQUN0QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsQ0FBRSxRQUFRO1FBQ2pELElBQUksQ0FBQyxJQUFJLEdBQUcsMEZBQTBGLENBQUM7UUFDdkcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsNEJBQTRCLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUNqRyxDQUFDO0lBRU8sMENBQVMsR0FBakI7UUFDSSxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxJQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEVBQUU7WUFDdkMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEMsT0FBTyxLQUFLLENBQUE7U0FDZjtRQUFBLENBQUM7UUFDRixJQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLEVBQUU7WUFDdkMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbEMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUN6RCxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVTLDJDQUFVLEdBQXBCO1FBQ0ksSUFBRyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUM7WUFDaEIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0MscUNBQXFDO1lBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckMsU0FBUztTQUNaO2FBQUk7WUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRUQsYUFBYTtJQUNILCtDQUFjLEdBQXhCO0lBQ0EsQ0FBQztJQUNMLDZCQUFDO0FBQUQsQ0FyREEsQUFxREMsQ0FyRG1ELHdCQUFjLEdBcURqRSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFeHRyYWN0Q2FzaFdpbiBmcm9tIFwiLi4vY29tbW9uL0V4dHJhY3RDYXNoV2luXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBvdmVyc2Vhc0V4dHJhY3RDYXNoV2luIGV4dGVuZHMgRXh0cmFjdENhc2hXaW57XHJcbiAgICBwcml2YXRlIE92ZXJzZWFzQWNjb3VudExhYmVsOiBjYy5SaWNoVGV4dCA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5pbml0VmlldygpO1xyXG5cclxuICAgICAgICB0aGlzLk92ZXJzZWFzQWNjb3VudExhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJPdmVyc2Vhc0FjY291bnRCb3gvT3ZlcnNlYXNBY2NvdW50TGFiZWxcIixjYy5SaWNoVGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU3ViVmlld1Nob3coKXtcclxuICAgICAgICBzdXBlci5vblN1YlZpZXdTaG93KCk7XHJcbiAgICAgICAgdmFyIGRhdGFzID0gdGhpcy5tb2RlbC5iYW5rRGF0YXMgfHwge307ICAvL+a1t+Wklui0puaIt+S/oeaBr1xyXG4gICAgICAgIHRoaXMuaW5mbyA9IFwidGlwc++8mlxcbklmIHlvdSBoYXZlIGFueSBxdWVzdGlvbnMsIHBsZWFzZSBjb250YWN0IGN1c3RvbWVyIHNlcnZpY2UhXFxu5rip6aao5o+Q56S677yaXFxu5aaC5pyJ6Zeu6aKY77yM6K+36IGU57O75a6i5pyN5ZKo6K+i77yBXCI7XHJcbiAgICAgICAgdGhpcy5tc2dMYWJlbC5zdHJpbmcgPSB0aGlzLmluZm87XHJcbiAgICAgICAgdGhpcy5PdmVyc2Vhc0FjY291bnRMYWJlbC5zdHJpbmcgPSBcIjxiPlwiICsgZGF0YXMub3Zlcl9zZWFfZW50cnVzX2JhbmtfYWNjb3VudCArIFwiPC9iPlwiIHx8IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0RhdGEoKXtcclxuICAgICAgICB2YXIgbnVtID0gcGFyc2VJbnQodGhpcy5lY051bUVkaXRCb3guc3RyaW5nKTtcclxuICAgICAgICBpZihudW0gPCB0aGlzLm1vZGVsLmdldE92ZXJzZWFzTWF4TGltaXQoKSkge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuaPkOeOsOmHkeminei2heWHuumZkOWItuiMg+WbtFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZihudW0gPiB0aGlzLm1vZGVsLmdldE92ZXJzZWFzTWluTGltaXQoKSkge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuaPkOeOsOmHkeminei2heWHuumZkOWItuiMg+WbtFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihudW0gJSAxMCAhPSAwKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5o+Q546w6YeR6aKd5Y+q6IO95Li6MTDnmoTlgI3mlbBcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYobnVtID4gR2xvYmFsLlBsYXllckRhdGEucG9pbnQgLyBHbG9iYWwuU2V0dGluZy5nbG9kUmF0aW8pIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlj5Hotbfmj5DnjrDlpLHotKXvvIzkvaDnmoTlj6/mj5DnjrDph5Hpop3kuI3otrNcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbmZpcm1CdG4oKXtcclxuICAgICAgICBpZih0aGlzLmNoZWNrRGF0YSgpKXtcclxuICAgICAgICAgICAgdmFyIG51bSA9IHBhcnNlSW50KHRoaXMuZWNOdW1FZGl0Qm94LnN0cmluZyk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubW9kZWwucmVxVW5pb25BcHBseUNhc2gobnVtKTtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5yZXFPdmVyc2Vhc0FwcGx5Q2FzaChudW0pO1xyXG4gICAgICAgICAgICAvLyDmtbflpJbmj5DnjrDmjqXlj6NcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEJ0bkZ1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOetueeggeWIl+ihqOabtOaWsCAqL1xyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUNoaXBMaXN0KCl7XHJcbiAgICB9XHJcbn0iXX0=