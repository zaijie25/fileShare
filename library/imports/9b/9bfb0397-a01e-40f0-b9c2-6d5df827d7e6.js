"use strict";
cc._RF.push(module, '9bfb0OXoB5A8LnCbV34J9fm', 'WndEditName');
// hall/scripts/logic/hall/ui/personalInfo/WndEditName.ts

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
var WndEditName = /** @class */ (function (_super) {
    __extends(WndEditName, _super);
    function WndEditName() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndEditName.prototype.onInit = function () {
        this.name = "WndEditName";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/PersonalInfo/EditNameUI";
        this.model = Global.ModelManager.getModel("PersonalInfoModel");
    };
    WndEditName.prototype.initView = function () {
        this.nameInput = this.getComponent("nameEditBox", cc.EditBox);
        this.nameInput.maxLength = 6;
        this.addCommonClick("cancelBtn", this.cancelClick, this);
        this.addCommonClick("sureBtn", this.sureClick, this);
        this.addCommonClick("close", this.closeWnd, this);
    };
    WndEditName.prototype.onOpen = function () {
        this.nameInput.string = "";
    };
    WndEditName.prototype.closeWnd = function () {
        this.close();
    };
    WndEditName.prototype.cancelClick = function () {
        this.close();
    };
    WndEditName.prototype.sureClick = function () {
        var str = this.nameInput.string;
        if (!str)
            return Global.UI.fastTip("请输入昵称~");
        if (str.indexOf(" ") > -1)
            return Global.UI.fastTip("昵称不能含有空格");
        // if (Global.Toolkit.getTotalBytes(str) > 14){
        //     return Global.UI.fastTip("昵称最长七个字");
        // }
        if (Global.Toolkit.checkContainsEmoji(str)) {
            return Global.UI.fastTip("昵称不能含表情符号!");
        }
        this.reqEditUserInfo(str);
    };
    WndEditName.prototype.reqEditUserInfo = function (nickname) {
        var _this = this;
        var param = {};
        param.nickname = nickname;
        this.model.reqEditUserInfo(param, function () {
            Global.UI.fastTip("修改昵称成功！");
            Global.PlayerData.nickname = nickname;
            _this.close();
        });
    };
    return WndEditName;
}(WndBase_1.default));
exports.default = WndEditName;

cc._RF.pop();