
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/CommisionModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ec9bdDKD+ZJ4KMDyX8gJNdD', 'CommisionModule');
// hall/scripts/logic/hallcommon/module/CommisionModule.ts

"use strict";
/**
 * 财神到-任务系统
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
var CommisionModule = /** @class */ (function (_super) {
    __extends(CommisionModule, _super);
    function CommisionModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndCommision";
        _this.modelClass = "CommisionModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/Commision/CommisionUI"];
        return _this;
    }
    return CommisionModule;
}(ModuleBase_1.ModuleBase));
exports.default = CommisionModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcQ29tbWlzaW9uTW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0VBR0U7Ozs7Ozs7Ozs7Ozs7OztBQUVGLG1FQUFpRTtBQUVqRTtJQUE2QyxtQ0FBVTtJQUF2RDtRQUFBLHFFQVFDO1FBUEcsZUFBUyxHQUFHLGNBQWMsQ0FBQTtRQUMxQixnQkFBVSxHQUFJLGdCQUFnQixDQUFBO1FBQzlCLGNBQVEsR0FBRyxFQUFFLENBQUE7UUFDYixpQkFBVyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQTs7SUFJM0QsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FSQSxBQVFDLENBUjRDLHVCQUFVLEdBUXREIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOi0ouelnuWIsC3ku7vliqHns7vnu59cclxuICogXHJcbiovXHJcblxyXG5pbXBvcnQgeyBNb2R1bGVCYXNlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9tb2R1bGUvTW9kdWxlQmFzZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21taXNpb25Nb2R1bGUgZXh0ZW5kcyBNb2R1bGVCYXNlIHtcclxuICAgIHZpZXdDbGFzcyA9IFwiV25kQ29tbWlzaW9uXCJcclxuICAgIG1vZGVsQ2xhc3MgPSAgXCJDb21taXNpb25Nb2RlbFwiXHJcbiAgICByZXNQYXRocyA9IFtdXHJcbiAgICBwcmVmYWJQYXRocyA9IFtcImhhbGwvcHJlZmFicy91aS9Db21taXNpb24vQ29tbWlzaW9uVUlcIl1cclxuICAgIGNoaWxkcmVuOiBbXHJcbiAgICBdXHJcblxyXG59Il19