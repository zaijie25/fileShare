"use strict";
cc._RF.push(module, '1d7c93ReARGp4aMgfBbVANb', 'ErmjMatchPlayerView');
// ermj/Ermj/scripts/subView/ErmjMatchPlayerView.ts

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
var ErmjTimeAutoRun_1 = require("../component/ErmjTimeAutoRun");
var ErmjMatchPlayerView = /** @class */ (function (_super) {
    __extends(ErmjMatchPlayerView, _super);
    function ErmjMatchPlayerView(node) {
        var _this = _super.call(this) || this;
        _this.dotList = [];
        _this.curDotIndex = 0;
        _this.setNode(node);
        return _this;
    }
    ErmjMatchPlayerView.prototype.initView = function () {
        this.timeRun = Global.UIHelper.safeGetComponent(this.getChild('content/timeLbl'), "", ErmjTimeAutoRun_1.default);
        this.timeRun.node.active = false;
        this.dotList = [];
        for (var i = 0; i < 3; i++) {
            var node = this.getChild("content/action/dot" + i.toString());
            this.dotList.push(node);
            node.active = false;
        }
    };
    ErmjMatchPlayerView.prototype.onOpen = function () {
        var _this = this;
        this.interval = setInterval(function () {
            _this.startAnim();
        }, 400);
        this.resetAnim();
        this.startAnim();
    };
    ErmjMatchPlayerView.prototype.startAnim = function () {
        if (this.curDotIndex >= this.dotList.length) {
            this.resetAnim();
        }
        else {
            this.dotList[this.curDotIndex].active = true;
            this.curDotIndex++;
        }
    };
    ErmjMatchPlayerView.prototype.resetAnim = function () {
        this.curDotIndex = 0;
        this.dotList.forEach(function (node) {
            node.active = false;
        });
    };
    ErmjMatchPlayerView.prototype.setTimeRunConfig = function (leftTime, callback, target) {
        this.timeRun.node.active = true;
        this.timeRun.setTimer(leftTime, callback, target);
    };
    ErmjMatchPlayerView.prototype.clearByRound = function () {
        this.active = false;
    };
    ErmjMatchPlayerView.prototype.onClose = function () {
        clearInterval(this.interval);
        this.resetAnim();
        this.timeRun.node.active = false;
    };
    return ErmjMatchPlayerView;
}(ErmjBaseView_1.default));
exports.default = ErmjMatchPlayerView;

cc._RF.pop();