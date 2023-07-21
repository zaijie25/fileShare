"use strict";
cc._RF.push(module, 'f5e36MHxhNF5aR01OMbSPvz', 'PwdInputView');
// hall/scripts/logic/hall/ui/login/view/PwdInputView.ts

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
var ViewBase_1 = require("../../../../core/ui/ViewBase");
var PwdInputView = /** @class */ (function (_super) {
    __extends(PwdInputView, _super);
    function PwdInputView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pwdVisible = false;
        return _this;
    }
    PwdInputView.prototype.initView = function () {
        this.pwdInput = this.getComponent("pwd", cc.EditBox);
        this.pwdInput.placeholder = "请输入6~10位数字和字母密码";
        this.pwdInput.maxLength = 16;
        this.visibleIcon = this.getChild("visibleIcon");
        this.inVisibleIcon = this.getChild("inVisibleIcon");
        this.addCommonClick("visibleIcon", this.onVisibleClick, this, null);
        this.addCommonClick("inVisibleIcon", this.onVisibleClick, this, null);
    };
    PwdInputView.prototype.onVisibleClick = function () {
        this.pwdVisible = !this.pwdVisible;
        if (this.pwdVisible)
            this.pwdInput.inputFlag = cc.EditBox.InputFlag.DEFAULT;
        else
            this.pwdInput.inputFlag = cc.EditBox.InputFlag.PASSWORD;
        this.updateVisible();
    };
    Object.defineProperty(PwdInputView.prototype, "pwd", {
        get: function () {
            return this.pwdInput.string;
        },
        set: function (str) {
            this.pwdInput.string = str;
        },
        enumerable: false,
        configurable: true
    });
    PwdInputView.prototype.onSubViewShow = function () {
        this.pwdVisible = false;
        this.updateVisible();
    };
    PwdInputView.prototype.updateVisible = function () {
        this.visibleIcon.active = this.pwdVisible;
        this.inVisibleIcon.active = !this.pwdVisible;
    };
    return PwdInputView;
}(ViewBase_1.default));
exports.default = PwdInputView;

cc._RF.pop();