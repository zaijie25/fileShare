"use strict";
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