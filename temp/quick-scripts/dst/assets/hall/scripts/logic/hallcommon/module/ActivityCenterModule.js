
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/ActivityCenterModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '305a1XheXhFAY/NGp7o80L8', 'ActivityCenterModule');
// hall/scripts/logic/hallcommon/module/ActivityCenterModule.ts

"use strict";
/**
 * 活动模块
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
var ActivityCenterModule = /** @class */ (function (_super) {
    __extends(ActivityCenterModule, _super);
    function ActivityCenterModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndActivityCenter";
        _this.modelClass = "";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/PlayerInfo/PlayerInfoUI"];
        _this.children = [
            {
                viewClass: "",
                modelClass: "",
                resPaths: [],
                prefabPaths: [],
                children: []
            }
        ];
        return _this;
    }
    return ActivityCenterModule;
}(ModuleBase_1.ModuleBase));
exports.default = ActivityCenterModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcQWN0aXZpdHlDZW50ZXJNb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7RUFHRTs7Ozs7Ozs7Ozs7Ozs7O0FBRUYsbUVBQWtFO0FBRWxFO0lBQWtELHdDQUFVO0lBQTVEO1FBQUEscUVBZUM7UUFkRyxlQUFTLEdBQUcsbUJBQW1CLENBQUE7UUFDL0IsZ0JBQVUsR0FBRyxFQUFFLENBQUE7UUFDZixjQUFRLEdBQUcsRUFBRSxDQUFBO1FBQ2IsaUJBQVcsR0FBRyxDQUFDLHlDQUF5QyxDQUFDLENBQUE7UUFDekQsY0FBUSxHQUFHO1lBQ1A7Z0JBQ0ksU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osV0FBVyxFQUFFLEVBQUU7Z0JBQ2YsUUFBUSxFQUFFLEVBQUU7YUFDZjtTQUNKLENBQUE7O0lBRUwsQ0FBQztJQUFELDJCQUFDO0FBQUQsQ0FmQSxBQWVDLENBZmlELHVCQUFVLEdBZTNEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOa0u+WKqOaooeWdl1xyXG4gKiBcclxuKi9cclxuXHJcbmltcG9ydCB7IE1vZHVsZUJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL21vZHVsZS9Nb2R1bGVCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rpdml0eUNlbnRlck1vZHVsZSBleHRlbmRzIE1vZHVsZUJhc2Uge1xyXG4gICAgdmlld0NsYXNzID0gXCJXbmRBY3Rpdml0eUNlbnRlclwiXHJcbiAgICBtb2RlbENsYXNzID0gXCJcIlxyXG4gICAgcmVzUGF0aHMgPSBbXVxyXG4gICAgcHJlZmFiUGF0aHMgPSBbXCJoYWxsL3ByZWZhYnMvdWkvUGxheWVySW5mby9QbGF5ZXJJbmZvVUlcIl1cclxuICAgIGNoaWxkcmVuID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmlld0NsYXNzOiBcIlwiLFxyXG4gICAgICAgICAgICBtb2RlbENsYXNzOiBcIlwiLFxyXG4gICAgICAgICAgICByZXNQYXRoczogW10sXHJcbiAgICAgICAgICAgIHByZWZhYlBhdGhzOiBbXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG5cclxufSJdfQ==