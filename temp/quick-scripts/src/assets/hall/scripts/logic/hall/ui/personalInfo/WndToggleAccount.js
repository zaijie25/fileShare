"use strict";
cc._RF.push(module, '8b8630Z1a1Iqb/j6sYtr6o3', 'WndToggleAccount');
// hall/scripts/logic/hall/ui/personalInfo/WndToggleAccount.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var WndToggleAccount = /** @class */ (function (_super) {
    __extends(WndToggleAccount, _super);
    function WndToggleAccount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndToggleAccount.prototype.onInit = function () {
        this.name = "WndToggleAccount";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/PersonalInfo/ToggleAccountUI";
        this.model = Global.ModelManager.getModel("PersonalInfoModel");
    };
    WndToggleAccount.prototype.initView = function () {
        this.addCommonClick("cancelBtn", this.cancelClick, this);
        this.addCommonClick("sureBtn", this.sureClick, this);
        this.addCommonClick("close", this.closeWnd, this);
    };
    WndToggleAccount.prototype.onOpen = function () {
    };
    WndToggleAccount.prototype.closeWnd = function () {
        this.close();
    };
    WndToggleAccount.prototype.cancelClick = function () {
        this.close();
    };
    WndToggleAccount.prototype.sureClick = function () {
        Global.SceneManager.goToLogin();
    };
    return WndToggleAccount;
}(WndBase_1.default));
exports.default = WndToggleAccount;

cc._RF.pop();