"use strict";
cc._RF.push(module, '5dab9FDg21AJKOOctRJTb9G', 'GameLobbyShellModule');
// hall/scripts/logic/hallcommon/module/GameLobbyShellModule.ts

"use strict";
/**
 * 子游戏选场模块
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
var GameLobbyShellModule = /** @class */ (function (_super) {
    __extends(GameLobbyShellModule, _super);
    function GameLobbyShellModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndGameLobbyShell";
        _this.modelClass = "";
        _this.resPaths = [];
        _this.prefabPaths = [""];
        _this.children = [];
        return _this;
    }
    return GameLobbyShellModule;
}(ModuleBase_1.ModuleBase));
exports.default = GameLobbyShellModule;

cc._RF.pop();