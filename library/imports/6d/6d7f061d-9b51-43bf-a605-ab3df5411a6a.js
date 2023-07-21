"use strict";
cc._RF.push(module, '6d7f0Ydm1FDv6YFqz31QRpq', 'ErmjGameStartView');
// ermj/Ermj/scripts/subView/ErmjGameStartView.ts

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
var ErmjBaseView_1 = require("./ErmjBaseView");
var ErmjGameStartView = /** @class */ (function (_super) {
    __extends(ErmjGameStartView, _super);
    function ErmjGameStartView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    ErmjGameStartView.prototype.initView = function () {
        this.effectSk = this.getComponent("content/effect", sp.Skeleton);
    };
    ErmjGameStartView.prototype.showAnim = function () {
        var _this = this;
        this.effectSk.node.active = true;
        this.effectSk.setAnimation(0, "idle", false);
        Game.Component.scheduleOnce(function () {
            _this.active = false;
        }, 1);
    };
    ErmjGameStartView.prototype.onOpen = function () {
        this.showAnim();
    };
    ErmjGameStartView.prototype.onClose = function () {
        this.effectSk.node.active = false;
        this.effectSk.clearTracks();
    };
    ErmjGameStartView.prototype.clearByRound = function () {
        this.active = false;
    };
    return ErmjGameStartView;
}(ErmjBaseView_1.default));
exports.default = ErmjGameStartView;

cc._RF.pop();