"use strict";
cc._RF.push(module, 'e8a3b2X+4JB4pPREy97Zf1B', 'WndGameUpgrade');
// hall/scripts/logic/core/loadingMVC/WndGameUpgrade.ts

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
var WndBase_1 = require("../ui/WndBase");
var WndGameUpgrade = /** @class */ (function (_super) {
    __extends(WndGameUpgrade, _super);
    function WndGameUpgrade() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndGameUpgrade.prototype.onInit = function () {
        this.name = "WndGameUpgrade";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/LoadingScene/GameUpGradeUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndGameUpgrade.prototype.initView = function () {
        //this.addCommonClick("bg/close", this.onCloseClick, this);
    };
    WndGameUpgrade.prototype.onOpen = function () {
        if (this.commonBg) {
            this.commonBg.active = false;
        }
    };
    return WndGameUpgrade;
}(WndBase_1.default));
exports.default = WndGameUpgrade;

cc._RF.pop();