
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/ChooseHeadModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5e698e62z1F0YjVDHoqY9q7', 'ChooseHeadModule');
// hall/scripts/logic/hallcommon/module/ChooseHeadModule.ts

"use strict";
/**
 * 分享模块
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
var ChooseHeadModule = /** @class */ (function (_super) {
    __extends(ChooseHeadModule, _super);
    function ChooseHeadModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndChooseHead";
        _this.modelClass = "";
        _this.resPaths = [];
        _this.prefabPaths = [""];
        _this.children = [];
        return _this;
    }
    return ChooseHeadModule;
}(ModuleBase_1.ModuleBase));
exports.default = ChooseHeadModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcQ2hvb3NlSGVhZE1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztFQUdFOzs7Ozs7Ozs7Ozs7Ozs7QUFFRixtRUFBa0U7QUFFbEU7SUFBOEMsb0NBQVU7SUFBeEQ7UUFBQSxxRUFTQztRQVJHLGVBQVMsR0FBRyxlQUFlLENBQUE7UUFDM0IsZ0JBQVUsR0FBRyxFQUFFLENBQUE7UUFDZixjQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ2IsaUJBQVcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2xCLGNBQVEsR0FBRyxFQUVWLENBQUE7O0lBRUwsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FUQSxBQVNDLENBVDZDLHVCQUFVLEdBU3ZEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOWIhuS6q+aooeWdl1xyXG4gKiBcclxuKi9cclxuXHJcbmltcG9ydCB7IE1vZHVsZUJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL21vZHVsZS9Nb2R1bGVCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaG9vc2VIZWFkTW9kdWxlIGV4dGVuZHMgTW9kdWxlQmFzZSB7XHJcbiAgICB2aWV3Q2xhc3MgPSBcIlduZENob29zZUhlYWRcIlxyXG4gICAgbW9kZWxDbGFzcyA9IFwiXCJcclxuICAgIHJlc1BhdGhzID0gW11cclxuICAgIHByZWZhYlBhdGhzID0gW1wiXCJdXHJcbiAgICBjaGlsZHJlbiA9IFtcclxuICAgICAgIFxyXG4gICAgXVxyXG5cclxufSJdfQ==