"use strict";
cc._RF.push(module, 'e15ddSPa/pPJqsMrHiMVvs5', 'LoginModule');
// hall/scripts/logic/hallcommon/module/LoginModule.ts

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
/**
 * 登录模块
 *
*/
var ModuleBase_1 = require("../../../framework/module/ModuleBase");
var LoginModule = /** @class */ (function (_super) {
    __extends(LoginModule, _super);
    function LoginModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndLogin";
        _this.modelClass = "LoginModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/LoginUI"];
        _this.children = [
            {
                viewClass: "WndPhoneLogin",
                modelClass: "",
                resPaths: [],
                prefabPaths: [],
                children: []
            },
            {
                viewClass: "WndForgetPwd",
                modelClass: "",
                resPaths: [],
                prefabPaths: [],
                children: []
            },
            {
                viewClass: "WndRegist",
                modelClass: "",
                resPaths: [],
                prefabPaths: [],
                children: []
            },
        ];
        return _this;
    }
    return LoginModule;
}(ModuleBase_1.ModuleBase));
exports.default = LoginModule;

cc._RF.pop();