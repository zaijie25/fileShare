"use strict";
cc._RF.push(module, 'ea2aaCEtaZLWbIwyW1RazmA', 'PersonalInfoModule');
// hall/scripts/logic/hallcommon/module/PersonalInfoModule.ts

"use strict";
/**
 * 账号信息模块
 *
*/
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
var ModuleBase_1 = require("../../../framework/module/ModuleBase");
var PersonalInfoModule = /** @class */ (function (_super) {
    __extends(PersonalInfoModule, _super);
    function PersonalInfoModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndBindPhone";
        _this.modelClass = "PersonalInfoModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/PersonalInfo/BindPhoneUI"];
        _this.children = [
            {
                viewClass: "WndChangePwd",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/PersonalInfo/ChangePwdUI"],
                children: []
            },
            {
                viewClass: "WndEditName",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/PersonalInfo/EditNameUI"],
                children: []
            },
            {
                viewClass: "WndSetting",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/PersonalInfo/SettingBox"],
                children: []
            },
            {
                viewClass: "WndToggleAccount",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/PersonalInfo/ToggleAccountUI"],
                children: []
            }
        ];
        return _this;
    }
    return PersonalInfoModule;
}(ModuleBase_1.ModuleBase));
exports.default = PersonalInfoModule;

cc._RF.pop();