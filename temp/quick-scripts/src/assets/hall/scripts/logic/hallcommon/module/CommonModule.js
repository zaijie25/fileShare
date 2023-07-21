"use strict";
cc._RF.push(module, '67bc17Nm/5M+IQW8OblNHKA', 'CommonModule');
// hall/scripts/logic/hallcommon/module/CommonModule.ts

"use strict";
/**
 * 通用模块:网络
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
var CommonModule = /** @class */ (function (_super) {
    __extends(CommonModule, _super);
    function CommonModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndNetReconnect";
        _this.modelClass = "WaitingModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/NetReconnect"];
        _this.children = [
            {
                viewClass: "WndNetWaiting",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/NetWaitUI"],
                children: []
            },
            {
                viewClass: "WndScreenPortraitNotice",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndMessageBox",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndRebateGet",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndRedEnvelope",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndHallRedEnvelope",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndDailyRedEnvelope",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndGetRedEnvelope",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndDownLoadApkUI",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndGameMaintainUI",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndGameRestoreUI",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndGameUpdateUI",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndGameUpgrade",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndDailyGiftMoneyUI",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
            {
                viewClass: "WndGiftMoneyListUI",
                modelClass: "",
                resPaths: [],
                prefabPaths: [""],
                children: []
            },
        ];
        return _this;
    }
    return CommonModule;
}(ModuleBase_1.ModuleBase));
exports.default = CommonModule;

cc._RF.pop();