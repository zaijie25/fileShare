
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/FeedbackModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0c8a8CmoVxAqYIHxKgB95rj', 'FeedbackModule');
// hall/scripts/logic/hallcommon/module/FeedbackModule.ts

"use strict";
/**
 * 反馈模块
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
var FeedbackModule = /** @class */ (function (_super) {
    __extends(FeedbackModule, _super);
    function FeedbackModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndFeedback";
        _this.modelClass = "FeedbackModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/FeedbackUI"];
        _this.children = [];
        return _this;
    }
    return FeedbackModule;
}(ModuleBase_1.ModuleBase));
exports.default = FeedbackModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcRmVlZGJhY2tNb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7RUFHRTs7Ozs7Ozs7Ozs7Ozs7O0FBRUYsbUVBQWtFO0FBRWxFO0lBQTRDLGtDQUFVO0lBQXREO1FBQUEscUVBU0M7UUFSRyxlQUFTLEdBQUcsYUFBYSxDQUFBO1FBQ3pCLGdCQUFVLEdBQUcsZUFBZSxDQUFBO1FBQzVCLGNBQVEsR0FBRyxFQUFFLENBQUE7UUFDYixpQkFBVyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtRQUM1QyxjQUFRLEdBQUcsRUFFVixDQUFBOztJQUVMLENBQUM7SUFBRCxxQkFBQztBQUFELENBVEEsQUFTQyxDQVQyQyx1QkFBVSxHQVNyRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDlj43ppojmqKHlnZdcclxuICogXHJcbiovXHJcblxyXG5pbXBvcnQgeyBNb2R1bGVCYXNlIH0gZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9tb2R1bGUvTW9kdWxlQmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmVlZGJhY2tNb2R1bGUgZXh0ZW5kcyBNb2R1bGVCYXNlIHtcclxuICAgIHZpZXdDbGFzcyA9IFwiV25kRmVlZGJhY2tcIlxyXG4gICAgbW9kZWxDbGFzcyA9IFwiRmVlZGJhY2tNb2RlbFwiXHJcbiAgICByZXNQYXRocyA9IFtdXHJcbiAgICBwcmVmYWJQYXRocyA9IFtcImhhbGwvcHJlZmFicy91aS9GZWVkYmFja1VJXCJdXHJcbiAgICBjaGlsZHJlbiA9IFtcclxuICAgICAgIFxyXG4gICAgXVxyXG5cclxufSJdfQ==