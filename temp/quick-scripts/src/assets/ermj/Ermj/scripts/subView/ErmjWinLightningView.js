"use strict";
cc._RF.push(module, '19db7e0T29MSL+m0NUl1USJ', 'ErmjWinLightningView');
// ermj/Ermj/scripts/subView/ErmjWinLightningView.ts

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
var ErmjWinLightningView = /** @class */ (function (_super) {
    __extends(ErmjWinLightningView, _super);
    function ErmjWinLightningView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    ErmjWinLightningView.prototype.initView = function () {
        this.contentNode = this.getChild("content");
        this.effectSk = this.getComponent("content/effect", sp.Skeleton);
    };
    ErmjWinLightningView.prototype.onOpen = function () {
        var _this = this;
        this.effectSk.node.active = true;
        this.effectSk.setAnimation(0, "idle", false);
        Game.Component.scheduleOnce(function () {
            _this.active = false;
        }, 1);
    };
    ErmjWinLightningView.prototype.setLightPoint = function (worldPos) {
        this.contentNode.setPosition(this.contentNode.parent.convertToNodeSpaceAR(worldPos));
    };
    ErmjWinLightningView.prototype.onClose = function () {
        this.effectSk.node.active = false;
        this.effectSk.clearTracks();
    };
    ErmjWinLightningView.prototype.clearByRound = function () {
        this.active = false;
    };
    return ErmjWinLightningView;
}(ErmjBaseView_1.default));
exports.default = ErmjWinLightningView;

cc._RF.pop();