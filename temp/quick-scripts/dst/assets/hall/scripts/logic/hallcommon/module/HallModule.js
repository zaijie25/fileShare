
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/HallModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f7e03jWSfVLZ5sNQtDhCroL', 'HallModule');
// hall/scripts/logic/hallcommon/module/HallModule.ts

"use strict";
/**
 * 大厅模块
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
var HallModule = /** @class */ (function (_super) {
    __extends(HallModule, _super);
    function HallModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndHall";
        _this.modelClass = "HallModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/HallUI"];
        _this.children = [];
        return _this;
    }
    return HallModule;
}(ModuleBase_1.ModuleBase));
exports.default = HallModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcSGFsbE1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztFQUdFOzs7Ozs7Ozs7Ozs7Ozs7QUFFRixtRUFBa0U7QUFFbEU7SUFBeUMsOEJBQVU7SUFBbkQ7UUFBQSxxRUFRQztRQVBHLGVBQVMsR0FBRyxTQUFTLENBQUE7UUFDckIsZ0JBQVUsR0FBRyxXQUFXLENBQUE7UUFDeEIsY0FBUSxHQUFHLEVBQUUsQ0FBQTtRQUNiLGlCQUFXLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1FBQ3hDLGNBQVEsR0FBRyxFQUNWLENBQUE7O0lBRUwsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FSQSxBQVFDLENBUndDLHVCQUFVLEdBUWxEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOWkp+WOheaooeWdl1xyXG4gKiBcclxuKi9cclxuXHJcbmltcG9ydCB7IE1vZHVsZUJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL21vZHVsZS9Nb2R1bGVCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAgY2xhc3MgSGFsbE1vZHVsZSBleHRlbmRzIE1vZHVsZUJhc2Uge1xyXG4gICAgdmlld0NsYXNzID0gXCJXbmRIYWxsXCJcclxuICAgIG1vZGVsQ2xhc3MgPSBcIkhhbGxNb2RlbFwiXHJcbiAgICByZXNQYXRocyA9IFtdXHJcbiAgICBwcmVmYWJQYXRocyA9IFtcImhhbGwvcHJlZmFicy91aS9IYWxsVUlcIl1cclxuICAgIGNoaWxkcmVuID0gW1xyXG4gICAgXVxyXG5cclxufSJdfQ==