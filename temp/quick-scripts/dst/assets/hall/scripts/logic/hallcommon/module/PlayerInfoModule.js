
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/PlayerInfoModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcUGxheWVySW5mb01vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztFQUdFOzs7Ozs7Ozs7Ozs7Ozs7QUFFRixtRUFBa0U7QUFFbEU7SUFBOEMsb0NBQVU7SUFBeEQ7UUFBQSxxRUFvQ0M7UUFuQ0csZUFBUyxHQUFHLGVBQWUsQ0FBQTtRQUMzQixnQkFBVSxHQUFHLGlCQUFpQixDQUFBO1FBQzlCLGNBQVEsR0FBRyxFQUFFLENBQUE7UUFDYixpQkFBVyxHQUFHLENBQUMsNENBQTRDLENBQUMsQ0FBQTtRQUM1RCxjQUFRLEdBQUc7WUFDUCxJQUFJO1lBQ0osMkJBQTJCO1lBQzNCLHNCQUFzQjtZQUN0QixvQkFBb0I7WUFDcEIseURBQXlEO1lBQ3pELG1CQUFtQjtZQUNuQixLQUFLO1lBQ0wsSUFBSTtZQUNKLDRCQUE0QjtZQUM1QixzQkFBc0I7WUFDdEIsb0JBQW9CO1lBQ3BCLDBEQUEwRDtZQUMxRCxtQkFBbUI7WUFDbkIsS0FBSztZQUNMO2dCQUNJLFNBQVMsRUFBRSxTQUFTO2dCQUNwQixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztnQkFDbEQsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNEO2dCQUNJLFNBQVMsRUFBRSxZQUFZO2dCQUN2QixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBRTtnQkFDWixXQUFXLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztnQkFDbkQsUUFBUSxFQUFFLEVBQUU7YUFDZjtTQUNKLENBQUE7O0lBRUwsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FwQ0EsQUFvQ0MsQ0FwQzZDLHVCQUFVLEdBb0N2RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDkuKrkurrkv6Hmga/mqKHlnZdcclxuICogXHJcbiovXHJcblxyXG5pbXBvcnQgeyBNb2R1bGVCYXNlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9tb2R1bGUvTW9kdWxlQmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVySW5mb01vZHVsZSBleHRlbmRzIE1vZHVsZUJhc2Uge1xyXG4gICAgdmlld0NsYXNzID0gXCJXbmRQbGF5ZXJJbmZvXCJcclxuICAgIG1vZGVsQ2xhc3MgPSBcIlBsYXllckluZm9Nb2RlbFwiXHJcbiAgICByZXNQYXRocyA9IFtdXHJcbiAgICBwcmVmYWJQYXRocyA9IFtcImhhbGwvcHJlZmFicy91aS9QbGF5ZXJJbmZvL05ld1BsYXllckluZm9VSVwiXVxyXG4gICAgY2hpbGRyZW4gPSBbXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB2aWV3Q2xhc3M6IFwiV25kVmlwXCIsXHJcbiAgICAgICAgLy8gICAgIG1vZGVsQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgLy8gICAgIHJlc1BhdGhzOiBbXSxcclxuICAgICAgICAvLyAgICAgcHJlZmFiUGF0aHM6IFtcImhhbGwvcHJlZmFicy91aS9QbGF5ZXJJbmZvL1ZpcFVJXCJdLFxyXG4gICAgICAgIC8vICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdmlld0NsYXNzOiBcIlduZFZpcDJcIixcclxuICAgICAgICAvLyAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAvLyAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgIC8vICAgICBwcmVmYWJQYXRoczogW1wiaGFsbC9wcmVmYWJzL3VpL1BsYXllckluZm8vVmlwVUkyXCJdLFxyXG4gICAgICAgIC8vICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZFZpcDNcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiaGFsbC9wcmVmYWJzL3VpL1BsYXllckluZm8vVmlwVUkzXCJdLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlduZFZpcFJ1bGVcIixcclxuICAgICAgICAgICAgbW9kZWxDbGFzczogXCJcIixcclxuICAgICAgICAgICAgcmVzUGF0aHM6IFtdLFxyXG4gICAgICAgICAgICBwcmVmYWJQYXRoczogW1wiaGFsbC9wcmVmYWJzL3VpL1BsYXllckluZm8vdmlwUnVsZVwiXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfSBcclxuICAgIF1cclxuXHJcbn0iXX0=