
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/bank/WndBankLogin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8e7266tU3BKIrWiqjLssCMJ', 'WndBankLogin');
// hall/scripts/logic/hall/ui/money/ui/bank/WndBankLogin.ts

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
var WndBankLogin = /** @class */ (function (_super) {
    __extends(WndBankLogin, _super);
    function WndBankLogin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndBankLogin.prototype.onInit = function () {
        this.name = "WndBankLogin";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/bank/BankLoginBankUI";
        this.model = Global.ModelManager.getModel("BankModel");
    };
    WndBankLogin.prototype.initView = function () {
        // this.node.width = cc.Canvas.instance.node.width;
        // this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("close", this.close, this);
        this.addCommonClick("confirmBtn", this.confirmBtnFunc, this);
        this.addCommonClick("changePWBtn", this.changePWBtnFunc, this, null);
        this.addCommonClick("forgetPWBtn", this.forgetPWBtnFunc, this, null);
        this.pwEditBox = this.getComponent("PasswordBox/editBox", cc.EditBox);
    };
    WndBankLogin.prototype.onOpen = function (args) {
        //this.pwEditBox.string = this.model.getDefaultPassword();
    };
    WndBankLogin.prototype.checkTextEmptyAndShowTips = function (text, tipsLabel) {
        if (text.length <= 0) {
            this.model.showBankTips(tipsLabel);
            return false;
        }
        return true;
    };
    /** 确认按钮 */
    WndBankLogin.prototype.confirmBtnFunc = function () {
        if (!this.checkTextEmptyAndShowTips(this.pwEditBox.string, "密码不能为空"))
            return;
        this.model.reqLoginBank(this.pwEditBox.string);
    };
    /** 修改密码按钮 */
    WndBankLogin.prototype.changePWBtnFunc = function () {
        // 1游客 没有绑定手机 2 绑定手机了 3微信 4第三方账号
        var havePhone = (Global.PlayerData.phone != null && Global.PlayerData.phone != "");
        if (!havePhone) {
            this.model.showBankTips("请您先绑定手机号码再修改银行密码！");
            return;
        }
        Global.UI.show("WndBankChangePW");
    };
    /** 忘记密码按钮 */
    WndBankLogin.prototype.forgetPWBtnFunc = function () {
        var havePhone = (Global.PlayerData.phone != null && Global.PlayerData.phone != "");
        if (!havePhone) {
            this.model.showBankTips("请您先绑定手机号码再找回银行密码");
            return;
        }
        Global.UI.show("WndBankForgetPW");
    };
    return WndBankLogin;
}(WndBase_1.default));
exports.default = WndBankLogin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGJhbmtcXFduZEJhbmtMb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBcUQ7QUFHckQ7SUFBMEMsZ0NBQU87SUFBakQ7O0lBc0VBLENBQUM7SUFoRWEsNkJBQU0sR0FBaEI7UUFFSSxJQUFJLENBQUMsSUFBSSxHQUFHLGNBQWMsQ0FBQztRQUMzQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsNENBQTRDLENBQUM7UUFDNUQsSUFBSSxDQUFDLEtBQUssR0FBYyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRVMsK0JBQVEsR0FBbEI7UUFFSSxtREFBbUQ7UUFDbkQscURBQXFEO1FBRXJELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsZUFBZSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsZUFBZSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQztRQUVsRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLEVBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFUyw2QkFBTSxHQUFoQixVQUFpQixJQUFJO1FBRWpCLDBEQUEwRDtJQUM5RCxDQUFDO0lBRU8sZ0RBQXlCLEdBQWpDLFVBQWtDLElBQVcsRUFBRSxTQUFnQjtRQUUzRCxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUNuQjtZQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25DLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFdBQVc7SUFDWCxxQ0FBYyxHQUFkO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7WUFDL0QsT0FBTztRQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELGFBQWE7SUFDYixzQ0FBZSxHQUFmO1FBQ0ksZ0NBQWdDO1FBQ2hDLElBQUksU0FBUyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ25GLElBQUcsQ0FBQyxTQUFTLEVBQUM7WUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzdDLE9BQU87U0FDVjtRQUNELE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELGFBQWE7SUFDYixzQ0FBZSxHQUFmO1FBQ0ksSUFBSSxTQUFTLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbkYsSUFBRyxDQUFDLFNBQVMsRUFBQztZQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDNUMsT0FBTztTQUNWO1FBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXRFQSxBQXNFQyxDQXRFeUMsaUJBQU8sR0FzRWhEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5pbXBvcnQgQmFua01vZGVsIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0JhbmtNb2RlbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kQmFua0xvZ2luIGV4dGVuZHMgV25kQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBtb2RlbCA6IEJhbmtNb2RlbDtcclxuXHJcbiAgICBwcml2YXRlIHB3RWRpdEJveCA6IGNjLkVkaXRCb3g7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRCYW5rTG9naW5cIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlBvcExheWVyO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL21vbmV5L2JhbmsvQmFua0xvZ2luQmFua1VJXCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxCYW5rTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkJhbmtNb2RlbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS53aWR0aCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLndpZHRoO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZS5oZWlnaHQgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjbG9zZVwiLHRoaXMuY2xvc2UsdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjb25maXJtQnRuXCIsdGhpcy5jb25maXJtQnRuRnVuYyx0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY2hhbmdlUFdCdG5cIix0aGlzLmNoYW5nZVBXQnRuRnVuYyx0aGlzLG51bGwpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJmb3JnZXRQV0J0blwiLHRoaXMuZm9yZ2V0UFdCdG5GdW5jLHRoaXMsbnVsbCk7XHJcblxyXG4gICAgICAgIHRoaXMucHdFZGl0Qm94ID0gdGhpcy5nZXRDb21wb25lbnQoXCJQYXNzd29yZEJveC9lZGl0Qm94XCIsY2MuRWRpdEJveCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbihhcmdzKVxyXG4gICAge1xyXG4gICAgICAgIC8vdGhpcy5wd0VkaXRCb3guc3RyaW5nID0gdGhpcy5tb2RlbC5nZXREZWZhdWx0UGFzc3dvcmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrVGV4dEVtcHR5QW5kU2hvd1RpcHModGV4dDpzdHJpbmcsIHRpcHNMYWJlbDpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGV4dC5sZW5ndGggPD0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc2hvd0JhbmtUaXBzKHRpcHNMYWJlbCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOehruiupOaMiemSriAqL1xyXG4gICAgY29uZmlybUJ0bkZ1bmMoKXtcclxuICAgICAgICBpZighdGhpcy5jaGVja1RleHRFbXB0eUFuZFNob3dUaXBzKHRoaXMucHdFZGl0Qm94LnN0cmluZywgXCLlr4bnoIHkuI3og73kuLrnqbpcIikpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLm1vZGVsLnJlcUxvZ2luQmFuayh0aGlzLnB3RWRpdEJveC5zdHJpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDkv67mlLnlr4bnoIHmjInpkq4gKi9cclxuICAgIGNoYW5nZVBXQnRuRnVuYygpe1xyXG4gICAgICAgIC8vIDHmuLjlrqIg5rKh5pyJ57uR5a6a5omL5py6IDIg57uR5a6a5omL5py65LqGIDPlvq7kv6EgNOesrOS4ieaWuei0puWPt1xyXG4gICAgICAgIHZhciBoYXZlUGhvbmUgPSAoR2xvYmFsLlBsYXllckRhdGEucGhvbmUgIT0gbnVsbCAmJiBHbG9iYWwuUGxheWVyRGF0YS5waG9uZSAhPSBcIlwiKTtcclxuICAgICAgICBpZighaGF2ZVBob25lKXtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5zaG93QmFua1RpcHMoXCLor7fmgqjlhYjnu5HlrprmiYvmnLrlj7fnoIHlho3kv67mlLnpk7booYzlr4bnoIHvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRCYW5rQ2hhbmdlUFdcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOW/mOiusOWvhueggeaMiemSriAqL1xyXG4gICAgZm9yZ2V0UFdCdG5GdW5jKCl7XHJcbiAgICAgICAgdmFyIGhhdmVQaG9uZSA9IChHbG9iYWwuUGxheWVyRGF0YS5waG9uZSAhPSBudWxsICYmIEdsb2JhbC5QbGF5ZXJEYXRhLnBob25lICE9IFwiXCIpO1xyXG4gICAgICAgIGlmKCFoYXZlUGhvbmUpe1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNob3dCYW5rVGlwcyhcIuivt+aCqOWFiOe7keWumuaJi+acuuWPt+eggeWGjeaJvuWbnumTtuihjOWvhueggVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZEJhbmtGb3JnZXRQV1wiKTtcclxuICAgIH1cclxufVxyXG4iXX0=