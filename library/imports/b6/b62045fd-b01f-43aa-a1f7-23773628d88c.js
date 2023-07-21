"use strict";
cc._RF.push(module, 'b6204X9sB9DqqH3I3c2KNiM', 'DdzMatchPlayerView');
// ddz/ddz/scripts/subView/DdzMatchPlayerView.ts

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
var DdzBaseView_1 = require("./DdzBaseView");
var DDZTimeAutoRun_1 = require("../component/DDZTimeAutoRun");
/**
 * 匹配倒计时view
 */
var DdzMatchPlayerView = /** @class */ (function (_super) {
    __extends(DdzMatchPlayerView, _super);
    function DdzMatchPlayerView(node) {
        var _this = _super.call(this) || this;
        _this.spotList = [];
        _this.delay = 0.1;
        _this.setNode(node);
        return _this;
    }
    DdzMatchPlayerView.prototype.initView = function () {
        this.spotList = [];
        for (var i = 1; i <= 9; i++) {
            var node = this.getChild('action/' + i.toString());
            this.spotList.push(node);
            node.active = true;
        }
        this.timeRun = this.getComponent('timeLbl', DDZTimeAutoRun_1.default);
        this.timeRun.node.active = false;
    };
    DdzMatchPlayerView.prototype.onOpen = function () {
        var _this = this;
        this.interval = setInterval(function () {
            _this.startAnim();
        }, 1500);
        this.startAnim();
    };
    DdzMatchPlayerView.prototype.startAnim = function () {
        for (var i = 0; i <= this.spotList.length - 1; i++) {
            var tween = Game.Tween.get(this.spotList[i]);
            tween.delay(i * this.delay)
                .by(0.2, { position: cc.v2(0, 10) }, cc.easeIn(1))
                .by(0.2, { position: cc.v2(0, -10) }, cc.easeOut(1))
                .start();
        }
    };
    DdzMatchPlayerView.prototype.resetAnim = function () {
        this.spotList.forEach(function (node) {
            node.y = 0;
        });
    };
    DdzMatchPlayerView.prototype.onClose = function () {
        clearInterval(this.interval);
        this.resetAnim();
        this.timeRun.node.active = false;
    };
    DdzMatchPlayerView.prototype.clearByRound = function () {
        this.active = false;
    };
    DdzMatchPlayerView.prototype.setTimeRunConfig = function (leftTime, callback, target) {
        this.timeRun.node.active = true;
        this.timeRun.setTimer(leftTime, callback, target);
    };
    return DdzMatchPlayerView;
}(DdzBaseView_1.default));
exports.default = DdzMatchPlayerView;

cc._RF.pop();