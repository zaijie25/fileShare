
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Activity/Turntable/WndTurntableRule.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4b0d81kmQ5P45bVj9epwxx1', 'WndTurntableRule');
// hall/scripts/logic/hall/ui/Activity/Turntable/WndTurntableRule.ts

"use strict";
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
var WndBase_1 = require("../../../../core/ui/WndBase");
var WndTurntableRule = /** @class */ (function (_super) {
    __extends(WndTurntableRule, _super);
    function WndTurntableRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndTurntableRule.prototype.onInit = function () {
        this.name = "WndTurntableRule";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/luckyDraw/TurntableRuleUI";
    };
    WndTurntableRule.prototype.initView = function () {
        Global.UIHelper.addCommonClick(this.node, "popNode/close", this.close, this);
    };
    WndTurntableRule.prototype.onOpen = function () {
    };
    return WndTurntableRule;
}(WndBase_1.default));
exports.default = WndTurntableRule;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxBY3Rpdml0eVxcVHVybnRhYmxlXFxXbmRUdXJudGFibGVSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFrRDtBQUVsRDtJQUE4QyxvQ0FBTztJQUFyRDs7SUFpQkEsQ0FBQztJQWZhLGlDQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLDJDQUEyQyxDQUFDO0lBQy9ELENBQUM7SUFFUyxtQ0FBUSxHQUFsQjtRQUVJLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsZUFBZSxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFDN0UsQ0FBQztJQUVTLGlDQUFNLEdBQWhCO0lBR0EsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FqQkEsQUFpQkMsQ0FqQjZDLGlCQUFPLEdBaUJwRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlIGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZFR1cm50YWJsZVJ1bGUgZXh0ZW5kcyBXbmRCYXNlIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRUdXJudGFibGVSdWxlXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IFwiUG9wTGF5ZXJcIjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9sdWNreURyYXcvVHVybnRhYmxlUnVsZVVJXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLFwicG9wTm9kZS9jbG9zZVwiLHRoaXMuY2xvc2UsdGhpcylcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxufSJdfQ==