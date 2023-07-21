"use strict";
cc._RF.push(module, '76022t0lq1Buqdd3s9rFewD', 'WndVipRule');
// hall/scripts/logic/hall/ui/playerInfo/WndVipRule.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var WndVipRule = /** @class */ (function (_super) {
    __extends(WndVipRule, _super);
    function WndVipRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndVipRule.prototype.onInit = function () {
        this.name = "WndVipRule";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/vipRule";
        // this.destoryType = DestoryType.ChangeScene;
    };
    WndVipRule.prototype.onDispose = function () {
    };
    /**
     * 初始化UI
     */
    WndVipRule.prototype.initView = function () {
        this.addCommonClick("close", this.close, this);
    };
    /**
     * 界面打开回调
     */
    WndVipRule.prototype.onOpen = function () {
    };
    return WndVipRule;
}(WndBase_1.default));
exports.default = WndVipRule;

cc._RF.pop();