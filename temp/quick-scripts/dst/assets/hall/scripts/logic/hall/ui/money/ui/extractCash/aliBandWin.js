
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/extractCash/aliBandWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3fc639/i29DZpe+xej3jPN9', 'aliBandWin');
// hall/scripts/logic/hall/ui/money/ui/extractCash/aliBandWin.ts

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
var aliBandWin = /** @class */ (function (_super) {
    __extends(aliBandWin, _super);
    function aliBandWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameEditBox = null;
        _this.aliAccountEditBox = null;
        return _this;
    }
    aliBandWin.prototype.initView = function () {
        this.nameEditBox = this.getComponent("NameEditBox", cc.EditBox);
        this.aliAccountEditBox = this.getComponent("AccountEditBox", cc.EditBox);
        this.addCommonClick("bandBtn", this.bandBtnFunc, this);
    };
    aliBandWin.prototype.checkTextEmptyAndShowTips = function (text, tipsLabel) {
        if (text.length <= 0) {
            Global.UI.fastTip(tipsLabel);
            return false;
        }
        return true;
    };
    /**
     * 检测字符串中是否包含某些特殊字符
     * @param text 要检测的字符串
     * @param specialString 特殊字符串
     * @param tipsLabel 检测如果包含则tip提示的字符串
     */
    aliBandWin.prototype.checkSpecialCharAndShowTips = function (text, specialString, tipsLabel) {
        for (var i = 0; i < text.length; i++) {
            var c = text.charAt(i);
            if (specialString.indexOf(c) >= 0) {
                Global.UI.fastTip(tipsLabel);
                return false;
            }
        }
        return true;
    };
    //发送绑定消息
    aliBandWin.prototype.bandBtnFunc = function () {
        if (!this.checkTextEmptyAndShowTips(this.nameEditBox.string, "姓名不能为空"))
            return;
        if (!this.checkTextEmptyAndShowTips(this.aliAccountEditBox.string, "账户不能为空"))
            return;
        if (!this.checkSpecialCharAndShowTips(this.aliAccountEditBox.string, " ", "账号中有非法字符，请重新输入")) {
            return;
        }
        Global.UI.show("WndaliBandConfirm", this.nameEditBox.string, this.aliAccountEditBox.string);
    };
    return aliBandWin;
}(ViewBase_1.default));
exports.default = aliBandWin;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGV4dHJhY3RDYXNoXFxhbGlCYW5kV2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDREQUF1RDtBQUd2RDtJQUF3Qyw4QkFBUTtJQUFoRDtRQUFBLHFFQXVEQztRQXJEVyxpQkFBVyxHQUFlLElBQUksQ0FBQztRQUUvQix1QkFBaUIsR0FBZSxJQUFJLENBQUM7O0lBbURqRCxDQUFDO0lBaERhLDZCQUFRLEdBQWxCO1FBRUksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXhFLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVPLDhDQUF5QixHQUFqQyxVQUFrQyxJQUFXLEVBQUUsU0FBZ0I7UUFFM0QsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFDbkI7WUFDSSxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM3QixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLGdEQUEyQixHQUFuQyxVQUFvQyxJQUFXLEVBQUUsYUFBb0IsRUFBRSxTQUFnQjtRQUVuRixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQy9CLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM3QixPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFFBQVE7SUFDUixnQ0FBVyxHQUFYO1FBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7WUFDakUsT0FBTztRQUNYLElBQUcsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUM7WUFDdkUsT0FBTztRQUNYLElBQUcsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsRUFBQztZQUN2RixPQUFPO1NBQ1Y7UUFDRCxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVMLGlCQUFDO0FBQUQsQ0F2REEsQUF1REMsQ0F2RHVDLGtCQUFRLEdBdUQvQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBhbGlCYW5kV2luIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgbmFtZUVkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgYWxpQWNjb3VudEVkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubmFtZUVkaXRCb3ggPSB0aGlzLmdldENvbXBvbmVudChcIk5hbWVFZGl0Qm94XCIsY2MuRWRpdEJveCk7XHJcbiAgICAgICAgdGhpcy5hbGlBY2NvdW50RWRpdEJveCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiQWNjb3VudEVkaXRCb3hcIixjYy5FZGl0Qm94KTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJhbmRCdG5cIix0aGlzLmJhbmRCdG5GdW5jLHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tUZXh0RW1wdHlBbmRTaG93VGlwcyh0ZXh0OnN0cmluZywgdGlwc0xhYmVsOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBpZih0ZXh0Lmxlbmd0aCA8PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAodGlwc0xhYmVsKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4DmtYvlrZfnrKbkuLLkuK3mmK/lkKbljIXlkKvmn5DkupvnibnmrorlrZfnrKZcclxuICAgICAqIEBwYXJhbSB0ZXh0IOimgeajgOa1i+eahOWtl+espuS4slxyXG4gICAgICogQHBhcmFtIHNwZWNpYWxTdHJpbmcg54m55q6K5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0gdGlwc0xhYmVsIOajgOa1i+WmguaenOWMheWQq+WImXRpcOaPkOekuueahOWtl+espuS4slxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoZWNrU3BlY2lhbENoYXJBbmRTaG93VGlwcyh0ZXh0OnN0cmluZywgc3BlY2lhbFN0cmluZzpzdHJpbmcsIHRpcHNMYWJlbDpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjID0gdGV4dC5jaGFyQXQoaSk7XHJcbiAgICAgICAgICAgIGlmIChzcGVjaWFsU3RyaW5nLmluZGV4T2YoYykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAodGlwc0xhYmVsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WPkemAgee7keWumua2iOaBr1xyXG4gICAgYmFuZEJ0bkZ1bmMoKXtcclxuICAgICAgICBpZighdGhpcy5jaGVja1RleHRFbXB0eUFuZFNob3dUaXBzKHRoaXMubmFtZUVkaXRCb3guc3RyaW5nLCBcIuWnk+WQjeS4jeiDveS4uuepulwiKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKCF0aGlzLmNoZWNrVGV4dEVtcHR5QW5kU2hvd1RpcHModGhpcy5hbGlBY2NvdW50RWRpdEJveC5zdHJpbmcsIFwi6LSm5oi35LiN6IO95Li656m6XCIpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYoIXRoaXMuY2hlY2tTcGVjaWFsQ2hhckFuZFNob3dUaXBzKHRoaXMuYWxpQWNjb3VudEVkaXRCb3guc3RyaW5nLCBcIiBcIiwgXCLotKblj7fkuK3mnInpnZ7ms5XlrZfnrKbvvIzor7fph43mlrDovpPlhaVcIikpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kYWxpQmFuZENvbmZpcm1cIix0aGlzLm5hbWVFZGl0Qm94LnN0cmluZyx0aGlzLmFsaUFjY291bnRFZGl0Qm94LnN0cmluZyk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==