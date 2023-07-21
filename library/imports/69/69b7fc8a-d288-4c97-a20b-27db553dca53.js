"use strict";
cc._RF.push(module, '69b7fyK0ohMl6ILJ9tVPcpT', 'VipQuickPayChatModule');
// hall/scripts/logic/hallcommon/module/VipQuickPayChatModule.ts

"use strict";
/**
 * 艾特客服模块
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
var VipQuickPayChatModule = /** @class */ (function (_super) {
    __extends(VipQuickPayChatModule, _super);
    function VipQuickPayChatModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndVipQuickPayChat";
        _this.modelClass = "";
        _this.resPaths = [];
        _this.prefabPaths = [""];
        _this.children = [
            {
                viewClass: "WndChatImage",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndBankRechange",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndAliPayRechange",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndWeChatRechange",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
        ];
        return _this;
    }
    return VipQuickPayChatModule;
}(ModuleBase_1.ModuleBase));
exports.default = VipQuickPayChatModule;

cc._RF.pop();