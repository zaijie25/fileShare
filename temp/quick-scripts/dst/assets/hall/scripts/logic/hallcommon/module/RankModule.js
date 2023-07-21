
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/module/RankModule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1480a+TV1pF573Jkdji6LmS', 'RankModule');
// hall/scripts/logic/hallcommon/module/RankModule.ts

"use strict";
/**
 * 排行榜模块
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
var RankModule = /** @class */ (function (_super) {
    __extends(RankModule, _super);
    function RankModule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.viewClass = "WndRank";
        _this.modelClass = "RankModel";
        _this.resPaths = [];
        _this.prefabPaths = ["hall/prefabs/ui/RankUI"];
        _this.children = [];
        return _this;
    }
    return RankModule;
}(ModuleBase_1.ModuleBase));
exports.default = RankModule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZHVsZVxcUmFua01vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7OztFQUdFOzs7Ozs7Ozs7Ozs7Ozs7QUFFRixtRUFBa0U7QUFFbEU7SUFBd0MsOEJBQVU7SUFBbEQ7UUFBQSxxRUFTQztRQVJHLGVBQVMsR0FBRyxTQUFTLENBQUE7UUFDckIsZ0JBQVUsR0FBRyxXQUFXLENBQUE7UUFDeEIsY0FBUSxHQUFHLEVBQUUsQ0FBQTtRQUNiLGlCQUFXLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1FBQ3hDLGNBQVEsR0FBRyxFQUVWLENBQUE7O0lBRUwsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FUQSxBQVNDLENBVHVDLHVCQUFVLEdBU2pEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOaOkuihjOamnOaooeWdl1xyXG4gKiBcclxuKi9cclxuXHJcbmltcG9ydCB7IE1vZHVsZUJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL21vZHVsZS9Nb2R1bGVCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5rTW9kdWxlIGV4dGVuZHMgTW9kdWxlQmFzZSB7XHJcbiAgICB2aWV3Q2xhc3MgPSBcIlduZFJhbmtcIlxyXG4gICAgbW9kZWxDbGFzcyA9IFwiUmFua01vZGVsXCJcclxuICAgIHJlc1BhdGhzID0gW11cclxuICAgIHByZWZhYlBhdGhzID0gW1wiaGFsbC9wcmVmYWJzL3VpL1JhbmtVSVwiXVxyXG4gICAgY2hpbGRyZW4gPSBbXHJcbiAgICAgICBcclxuICAgIF1cclxuXHJcbn0iXX0=