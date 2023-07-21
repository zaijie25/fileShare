
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/bank/WndBankChangePW.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5c601LCQEtIubGIxc4AeDUt', 'WndBankChangePW');
// hall/scripts/logic/hall/ui/money/ui/bank/WndBankChangePW.ts

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
var WndBankChangePW = /** @class */ (function (_super) {
    __extends(WndBankChangePW, _super);
    function WndBankChangePW() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //private _pwCheckRx : RegExp = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{2,})(?=.*[a-z]{2,})(?=.*[!@#$%^&*?\(\)]).*$/;
        //private _pwCheckRx : RegExp = /^.*(?=.{6,16})(?=.*\d)(?=.*[a-zA-Z]).*$/;
        _this._pwCheckString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        return _this;
    }
    WndBankChangePW.prototype.onInit = function () {
        this.name = "WndBankChangePW";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/bank/BankChangePWUI";
        this.model = Global.ModelManager.getModel("BankModel");
    };
    WndBankChangePW.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("close", this.close, this);
        this.addCommonClick("confirmBtn", this.confirmBtnFunc, this);
        this.addCommonClick("canelBtn", this.close, this);
        this.pwEditBox0 = this.getComponent("PasswordBox0/editBox", cc.EditBox);
        this.pwEditBox1 = this.getComponent("PasswordBox1/editBox", cc.EditBox);
        this.pwEditBox2 = this.getComponent("PasswordBox2/editBox", cc.EditBox);
    };
    WndBankChangePW.prototype.onOpen = function (args) {
        this.pwEditBox0.string = "";
        this.pwEditBox1.string = "";
        this.pwEditBox2.string = "";
        // Global.Event.on(GlobalEvent.BANK_CHANGE_PWD_SUCCEED, this, this.bank_change_pwd_succeed);
    };
    WndBankChangePW.prototype.onClose = function () {
        // Global.Event.off(GlobalEvent.BANK_CHANGE_PWD_SUCCEED, this, this.bank_change_pwd_succeed);
    };
    WndBankChangePW.prototype.checkTextEmptyAndShowTips = function (text, tipsLabel) {
        if (text.length <= 0) {
            this.model.showBankTips(tipsLabel);
            return false;
        }
        return true;
    };
    WndBankChangePW.prototype.checkPWFormat = function (text, tipsLabel) {
        var bValid = Global.Toolkit.checkPWFormat(text);
        if (!bValid) {
            this.model.showBankTips(tipsLabel);
        }
        return bValid;
    };
    /** 密码修改成功回调事件*/
    // bank_change_pwd_succeed() 
    // {
    //     this.close();
    // }
    /** 确认按钮 */
    WndBankChangePW.prototype.confirmBtnFunc = function () {
        if (!this.checkTextEmptyAndShowTips(this.pwEditBox0.string, "请输入密码"))
            return;
        if (!this.checkPWFormat(this.pwEditBox1.string, "请按要求输入6~16位数字和字母密码"))
            return;
        // if(!this.checkPWFormat(this.pwEditBox2.string, "请按要求输入6~16位数字和字母密码"))
        //     return;
        if (this.pwEditBox1.string != this.pwEditBox2.string) {
            this.model.showBankTips("新密码输入不一致，请重新输入");
            return;
        }
        this.model.reqSetBankPwd(this.pwEditBox0.string, this.pwEditBox1.string);
    };
    return WndBankChangePW;
}(WndBase_1.default));
exports.default = WndBankChangePW;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGJhbmtcXFduZEJhbmtDaGFuZ2VQVy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBcUQ7QUFJckQ7SUFBNkMsbUNBQU87SUFBcEQ7UUFBQSxxRUFzRkM7UUFwRkcsK0dBQStHO1FBQy9HLDBFQUEwRTtRQUNsRSxvQkFBYyxHQUFZLGdFQUFnRSxDQUFDOztJQWtGdkcsQ0FBQztJQTNFYSxnQ0FBTSxHQUFoQjtRQUVJLElBQUksQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLDJDQUEyQyxDQUFDO1FBQzNELElBQUksQ0FBQyxLQUFLLEdBQWMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVTLGtDQUFRLEdBQWxCO1FBRUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRWxELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsRUFBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixFQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLEVBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFUyxnQ0FBTSxHQUFoQixVQUFpQixJQUFJO1FBRWpCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzVCLDRGQUE0RjtJQUNoRyxDQUFDO0lBRVMsaUNBQU8sR0FBakI7UUFFSSw2RkFBNkY7SUFDakcsQ0FBQztJQUVPLG1EQUF5QixHQUFqQyxVQUFrQyxJQUFXLEVBQUUsU0FBZ0I7UUFFM0QsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFDbkI7WUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuQyxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTyx1Q0FBYSxHQUFyQixVQUFzQixJQUFXLEVBQUUsU0FBZ0I7UUFDL0MsSUFBSSxNQUFNLEdBQWEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBRyxDQUFDLE1BQU0sRUFBQztZQUNQLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELGdCQUFnQjtJQUNoQiw2QkFBNkI7SUFDN0IsSUFBSTtJQUNKLG9CQUFvQjtJQUNwQixJQUFJO0lBRUosV0FBVztJQUNYLHdDQUFjLEdBQWQ7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztZQUMvRCxPQUFPO1FBQ1gsSUFBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsb0JBQW9CLENBQUM7WUFDaEUsT0FBTztRQUNYLHdFQUF3RTtRQUN4RSxjQUFjO1FBQ2QsSUFBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQztZQUNoRCxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzFDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUdMLHNCQUFDO0FBQUQsQ0F0RkEsQUFzRkMsQ0F0RjRDLGlCQUFPLEdBc0ZuRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IEJhbmtNb2RlbCBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9CYW5rTW9kZWxcIjtcclxuaW1wb3J0IEdsb2JhbEV2ZW50IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb3JlL0dsb2JhbEV2ZW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRCYW5rQ2hhbmdlUFcgZXh0ZW5kcyBXbmRCYXNlIHtcclxuXHJcbiAgICAvL3ByaXZhdGUgX3B3Q2hlY2tSeCA6IFJlZ0V4cCA9IC9eLiooPz0uezYsMTZ9KSg/PS4qXFxkKSg/PS4qW0EtWl17Mix9KSg/PS4qW2Etel17Mix9KSg/PS4qWyFAIyQlXiYqP1xcKFxcKV0pLiokLztcclxuICAgIC8vcHJpdmF0ZSBfcHdDaGVja1J4IDogUmVnRXhwID0gL14uKig/PS57NiwxNn0pKD89LipcXGQpKD89LipbYS16QS1aXSkuKiQvO1xyXG4gICAgcHJpdmF0ZSBfcHdDaGVja1N0cmluZyA6IHN0cmluZyA9IFwiMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIjtcclxuICAgIHByaXZhdGUgbW9kZWwgOiBCYW5rTW9kZWw7XHJcblxyXG4gICAgcHJpdmF0ZSBwd0VkaXRCb3gwIDogY2MuRWRpdEJveDtcclxuICAgIHByaXZhdGUgcHdFZGl0Qm94MSA6IGNjLkVkaXRCb3g7XHJcbiAgICBwcml2YXRlIHB3RWRpdEJveDIgOiBjYy5FZGl0Qm94O1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiV25kQmFua0NoYW5nZVBXXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IEdsb2JhbC5VSS5Qb3BMYXllcjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9tb25leS9iYW5rL0JhbmtDaGFuZ2VQV1VJXCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxCYW5rTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkJhbmtNb2RlbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubm9kZS53aWR0aCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLndpZHRoO1xyXG4gICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjbG9zZVwiLHRoaXMuY2xvc2UsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNvbmZpcm1CdG5cIix0aGlzLmNvbmZpcm1CdG5GdW5jLHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjYW5lbEJ0blwiLHRoaXMuY2xvc2UsdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMucHdFZGl0Qm94MCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiUGFzc3dvcmRCb3gwL2VkaXRCb3hcIixjYy5FZGl0Qm94KTtcclxuICAgICAgICB0aGlzLnB3RWRpdEJveDEgPSB0aGlzLmdldENvbXBvbmVudChcIlBhc3N3b3JkQm94MS9lZGl0Qm94XCIsY2MuRWRpdEJveCk7XHJcbiAgICAgICAgdGhpcy5wd0VkaXRCb3gyID0gdGhpcy5nZXRDb21wb25lbnQoXCJQYXNzd29yZEJveDIvZWRpdEJveFwiLGNjLkVkaXRCb3gpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oYXJncylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnB3RWRpdEJveDAuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLnB3RWRpdEJveDEuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLnB3RWRpdEJveDIuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAvLyBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuQkFOS19DSEFOR0VfUFdEX1NVQ0NFRUQsIHRoaXMsIHRoaXMuYmFua19jaGFuZ2VfcHdkX3N1Y2NlZWQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5CQU5LX0NIQU5HRV9QV0RfU1VDQ0VFRCwgdGhpcywgdGhpcy5iYW5rX2NoYW5nZV9wd2Rfc3VjY2VlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1RleHRFbXB0eUFuZFNob3dUaXBzKHRleHQ6c3RyaW5nLCB0aXBzTGFiZWw6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRleHQubGVuZ3RoIDw9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNob3dCYW5rVGlwcyh0aXBzTGFiZWwpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tQV0Zvcm1hdCh0ZXh0OnN0cmluZywgdGlwc0xhYmVsOnN0cmluZyl7XHJcbiAgICAgICAgbGV0IGJWYWxpZCA6IGJvb2xlYW4gPSBHbG9iYWwuVG9vbGtpdC5jaGVja1BXRm9ybWF0KHRleHQpO1xyXG4gICAgICAgIGlmKCFiVmFsaWQpe1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnNob3dCYW5rVGlwcyh0aXBzTGFiZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYlZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlr4bnoIHkv67mlLnmiJDlip/lm57osIPkuovku7YqL1xyXG4gICAgLy8gYmFua19jaGFuZ2VfcHdkX3N1Y2NlZWQoKSBcclxuICAgIC8vIHtcclxuICAgIC8vICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoqIOehruiupOaMiemSriAqL1xyXG4gICAgY29uZmlybUJ0bkZ1bmMoKXtcclxuICAgICAgICBpZighdGhpcy5jaGVja1RleHRFbXB0eUFuZFNob3dUaXBzKHRoaXMucHdFZGl0Qm94MC5zdHJpbmcsIFwi6K+36L6T5YWl5a+G56CBXCIpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYoIXRoaXMuY2hlY2tQV0Zvcm1hdCh0aGlzLnB3RWRpdEJveDEuc3RyaW5nLCBcIuivt+aMieimgeaxgui+k+WFpTZ+MTbkvY3mlbDlrZflkozlrZfmr43lr4bnoIFcIikpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyBpZighdGhpcy5jaGVja1BXRm9ybWF0KHRoaXMucHdFZGl0Qm94Mi5zdHJpbmcsIFwi6K+35oyJ6KaB5rGC6L6T5YWlNn4xNuS9jeaVsOWtl+WSjOWtl+avjeWvhueggVwiKSlcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKHRoaXMucHdFZGl0Qm94MS5zdHJpbmcgIT0gdGhpcy5wd0VkaXRCb3gyLnN0cmluZyl7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc2hvd0JhbmtUaXBzKFwi5paw5a+G56CB6L6T5YWl5LiN5LiA6Ie077yM6K+36YeN5paw6L6T5YWlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9kZWwucmVxU2V0QmFua1B3ZCh0aGlzLnB3RWRpdEJveDAuc3RyaW5nICwgdGhpcy5wd0VkaXRCb3gxLnN0cmluZyk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbn1cclxuXHJcblxyXG5cclxuIl19