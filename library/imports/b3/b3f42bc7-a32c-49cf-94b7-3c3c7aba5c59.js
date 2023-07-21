"use strict";
cc._RF.push(module, 'b3f42vHoyxJz5S3PDx6ulxZ', 'ErmjLeftTipsView');
// ermj/Ermj/scripts/subView/ErmjLeftTipsView.ts

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
var ErmjLeftTipsView = /** @class */ (function (_super) {
    __extends(ErmjLeftTipsView, _super);
    function ErmjLeftTipsView(node) {
        var _this = _super.call(this) || this;
        _this.nLeftCount = 0;
        _this.setNode(node);
        return _this;
    }
    ErmjLeftTipsView.prototype.initView = function () {
        this.leftLbl = this.getComponent("leftLbl", cc.Label);
        this.leftLbl.string = "";
    };
    ErmjLeftTipsView.prototype.updateLeftLbl = function (nCount) {
        this.nLeftCount = nCount;
        this.leftLbl.string = String(nCount);
    };
    ErmjLeftTipsView.prototype.reduceLeftLbl = function (dev) {
        this.updateLeftLbl(this.nLeftCount - dev);
    };
    ErmjLeftTipsView.prototype.clearByRound = function () {
        this.leftLbl.string = "0";
        this.active = false;
    };
    return ErmjLeftTipsView;
}(ErmjBaseView_1.default));
exports.default = ErmjLeftTipsView;

cc._RF.pop();