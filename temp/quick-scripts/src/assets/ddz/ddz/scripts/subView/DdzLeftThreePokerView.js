"use strict";
cc._RF.push(module, 'ff155EVWuFEuZ1ehEBthFUp', 'DdzLeftThreePokerView');
// ddz/ddz/scripts/subView/DdzLeftThreePokerView.ts

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
var DdzDriver_1 = require("../DdzDriver");
/**
 * 底分倍数，地主三张牌的view
 */
var DdzLeftThreePokerView = /** @class */ (function (_super) {
    __extends(DdzLeftThreePokerView, _super);
    function DdzLeftThreePokerView(node) {
        var _this = _super.call(this) || this;
        _this.pokerList = [];
        _this.spaceX = 25;
        _this.setNode(node);
        return _this;
    }
    DdzLeftThreePokerView.prototype.initView = function () {
        this.dzPokersRoot = this.getChild('dzPokersRoot');
        this.dzScoreNode = this.getChild('socre');
        this.dzScoreNode.active = false;
        this.dzScoreLbl = this.getComponent('socre/dzScoreLbl', cc.Label);
    };
    DdzLeftThreePokerView.prototype.addDZPokers = function (arr) {
        var _this = this;
        if (arr === void 0) { arr = []; }
        this.pokerList = arr;
        this.pokerList.forEach(function (poker) {
            poker.active = true;
            poker.setPokerStyle(0);
            poker.isFront = false;
            poker.node.setParent(_this.dzPokersRoot);
            poker.setPokerPosition(cc.Vec3.ZERO);
            poker.setPokerScale(_this.Define.SmallPokerScale);
        });
    };
    DdzLeftThreePokerView.prototype.playShowAnimation = function (isAnim, timeScale) {
        var _this = this;
        if (isAnim === void 0) { isAnim = true; }
        if (timeScale === void 0) { timeScale = 0.2; }
        this.pokerList.forEach(function (poker, i) {
            poker.active = true;
            if (isAnim)
                poker.doPokerMove(cc.Vec3.ZERO, cc.v3(-_this.spaceX + i * _this.spaceX, 0), timeScale);
            else
                poker.setPokerPosition(cc.v3(-_this.spaceX + i * _this.spaceX, 0));
        });
    };
    DdzLeftThreePokerView.prototype.showThreePoker = function (isFront) {
        if (isFront === void 0) { isFront = false; }
        this.pokerList.forEach(function (poker) {
            poker.isFront = isFront;
        });
    };
    DdzLeftThreePokerView.prototype.setThreePokerValue = function (arr) {
        for (var i = 0; i < 3; i++) {
            if (arr[i]) {
                this.pokerList[i].pokerValue = arr[i];
            }
        }
    };
    //TODO 拼的字体的分
    DdzLeftThreePokerView.prototype.showScoreLbl = function (isShow, score) {
        if (score === void 0) { score = 0; }
        this.dzScoreNode.active = isShow;
        if (isShow)
            this.dzScoreLbl.string = score + 'F';
    };
    DdzLeftThreePokerView.prototype.resetPokers = function () {
        this.pokerList.forEach(function (poker) {
            poker.setPokerPosition(cc.Vec3.ZERO);
        });
    };
    DdzLeftThreePokerView.prototype.clearByRound = function () {
        this.active = false;
        this.showScoreLbl(false);
        this.showThreePoker(false);
        this.resetPokers();
        DdzDriver_1.default.instance.PokerPool.recycleAll(this.pokerList);
        this.pokerList = [];
    };
    return DdzLeftThreePokerView;
}(DdzBaseView_1.default));
exports.default = DdzLeftThreePokerView;

cc._RF.pop();