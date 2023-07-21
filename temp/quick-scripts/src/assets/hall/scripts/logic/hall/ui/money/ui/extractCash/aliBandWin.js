"use strict";
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