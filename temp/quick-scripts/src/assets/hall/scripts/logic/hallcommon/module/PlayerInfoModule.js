"use strict";
cc._RF.push(module, '270e8pBwiZDIY877b/OOdeU', 'PlayerInfoModule');
// hall/scripts/logic/hallcommon/module/PlayerInfoModule.ts

"use strict";
/**
 * 个人信息模块
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
var PlayerInfoModule = /** @class */ (function (_super) {
    __extends(PlayerInfoModule, _super);
    function PlayerInfoModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndPlayerInfo";
        _this.modelClass = "PlayerInfoModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/PlayerInfo/NewPlayerInfoUI"];
        _this.children = [
            // {
            //     viewClass: "WndVip",
            //     modelClass: "",
            //     resPaths: [],
            //     prefabPaths: ["hall/prefabs/ui/PlayerInfo/VipUI"],
            //     children: []
            // },
            // {
            //     viewClass: "WndVip2",
            //     modelClass: "",
            //     resPaths: [],
            //     prefabPaths: ["hall/prefabs/ui/PlayerInfo/VipUI2"],
            //     children: []
            // },
            {
                viewClass: "WndVip3",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/PlayerInfo/VipUI3"],
                children: []
            },
            {
                viewClass: "WndVipRule",
                modelClass: "",
                resPaths: [],
                prefabPaths: ["hall/prefabs/ui/PlayerInfo/vipRule"],
                children: []
            }
        ];
        return _this;
    }
    return PlayerInfoModule;
}(ModuleBase_1.ModuleBase));
exports.default = PlayerInfoModule;

cc._RF.pop();