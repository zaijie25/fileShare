"use strict";
cc._RF.push(module, 'c34fcKtG3JOZ5PKnaGXum2y', 'ErmjMahjongOperView');
// ermj/Ermj/scripts/subView/mahjong/ErmjMahjongOperView.ts

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
exports.OperState = void 0;
var ErmjBaseView_1 = require("../ErmjBaseView");
var ErmjMahjongOutView_1 = require("./ErmjMahjongOutView");
var ErmjMjStyleHelper_1 = require("../../tool/ErmjMjStyleHelper");
var OperState;
(function (OperState) {
    OperState[OperState["Chow"] = 1] = "Chow";
    OperState[OperState["Pong"] = 2] = "Pong";
    OperState[OperState["Kong"] = 3] = "Kong";
    OperState[OperState["DarkKong"] = 4] = "DarkKong";
})(OperState = exports.OperState || (exports.OperState = {}));
var ErmjMahjongOperView = /** @class */ (function (_super) {
    __extends(ErmjMahjongOperView, _super);
    function ErmjMahjongOperView(node, nRelative) {
        var _this = _super.call(this) || this;
        _this.nRelative = nRelative;
        /** 四个麻将子, 第4个是上方那个用于杠 */
        _this.mjOutItemList = [];
        _this.setNode(node);
        return _this;
    }
    ErmjMahjongOperView.prototype.initView = function () {
        for (var i = 0; i < 4; i++) {
            var node = this.getChild("mahjongOutView" + i.toString()); // 直接摆在预设上, 后续无须设置setSiblingIndex
            var view = new ErmjMahjongOutView_1.default(node);
            view.active = false;
            this.mjOutItemList.push(view);
        }
    };
    /** 吃  presArr透视配置 */
    ErmjMahjongOperView.prototype.setChowStyle = function (valueArr, chowCard, perspArr) {
        this.state = OperState.Chow;
        var temp = valueArr[0];
        var startPos = cc.Vec3.ZERO;
        var total = perspArr.length;
        for (var i = 0; i < this.mjOutItemList.length; i++) {
            var value = valueArr[i];
            var mjItem = this.mjOutItemList[i];
            if (value) {
                mjItem.active = true;
                mjItem.mahjongValue = value;
                mjItem.isFront = true;
                mjItem.setSpecialColor(chowCard == value);
                var nPersp = perspArr[total - i - 1] || 0;
                var _a = ErmjMjStyleHelper_1.default.getPerspectiveCfg(nPersp), cfg = _a.cfg, dir = _a.dir;
                mjItem.setPerspStyle(nPersp, this.nRelative);
                mjItem.node.setPosition(startPos);
                var offsetX = dir > 0 ? cfg.devSpaceX : cfg.negDevSpaceX;
                var spaceX = this.nRelative == 0 ? offsetX : -offsetX;
                startPos = startPos.add(cc.v3(spaceX, 0));
            }
            else {
                mjItem.active = false;
            }
            if (value < temp)
                temp = value;
        }
        this.value = temp; // 找最小的
    };
    /** 碰 */
    ErmjMahjongOperView.prototype.setPongStyle = function (valueArr, perspArr) {
        this.state = OperState.Pong;
        var startPos = cc.Vec3.ZERO;
        var centerIndex = 1;
        var total = perspArr.length;
        for (var i = 0; i < this.mjOutItemList.length; i++) {
            var value = valueArr[i];
            var mjItem = this.mjOutItemList[i];
            if (value) {
                mjItem.active = true;
                mjItem.mahjongValue = value;
                mjItem.isFront = true;
                mjItem.setSpecialColor(i == centerIndex); // 中间那张
                var nPersp = perspArr[total - i - 1] || 0; // 顺序和perspArr倒序
                var _a = ErmjMjStyleHelper_1.default.getPerspectiveCfg(nPersp), cfg = _a.cfg, dir = _a.dir;
                mjItem.setPerspStyle(nPersp, this.nRelative);
                mjItem.node.setPosition(startPos);
                var offsetX = dir > 0 ? cfg.devSpaceX : cfg.negDevSpaceX;
                var spaceX = this.nRelative == 0 ? offsetX : -offsetX;
                startPos = startPos.add(cc.v3(spaceX, 0));
            }
            else {
                mjItem.active = false;
            }
        }
        this.value = valueArr[0];
    };
    /**
     * 杠
     * @param valueArr 牌值数组 别人暗杠[]
     * @param isVisible true明杠 false暗杠
     * @param isOneSeen 是否3暗+1明
     * @param perspArr 透视配置列表 只有三个 杠牌取中间向上偏移
     */
    ErmjMahjongOperView.prototype.setKongStyle = function (valueArr, isVisible, isOneSeen, perspArr) {
        if (isVisible) {
            this.state = OperState.Kong;
            this.value = valueArr[0];
        }
        else
            this.state = OperState.DarkKong;
        var startPos = cc.Vec3.ZERO;
        var fourthPos = cc.Vec3.ZERO;
        var centerIndex = 1;
        var total = perspArr.length;
        for (var i = 0; i < this.mjOutItemList.length; i++) {
            var value = valueArr[i];
            var mjItem = this.mjOutItemList[i];
            if (isVisible && value) {
                mjItem.active = true;
                mjItem.mahjongValue = value;
                mjItem.isFront = true;
                mjItem.setSpecialColor(i == this.mjOutItemList.length - 1); // 上面那张 暗杠不显示
            }
            else {
                mjItem.active = true;
                if (isOneSeen && i == this.mjOutItemList.length - 1) { // 看自己暗杠 下三张暗 上面明的
                    mjItem.isFront = true;
                    mjItem.mahjongValue = value;
                    mjItem.setSpecialColor(false);
                }
                else {
                    mjItem.isFront = false;
                }
            }
            if (i == this.mjOutItemList.length - 1) {
                var nPersp = perspArr[centerIndex] || 0;
                mjItem.setPerspStyle(nPersp, this.nRelative);
                mjItem.node.setPosition(fourthPos);
            }
            else {
                var nPersp = perspArr[total - i - 1] || 0;
                var _a = ErmjMjStyleHelper_1.default.getPerspectiveCfg(nPersp), cfg = _a.cfg, dir = _a.dir;
                mjItem.setPerspStyle(nPersp, this.nRelative);
                mjItem.node.setPosition(startPos);
                if (i == centerIndex) {
                    fourthPos = cc.v3(startPos.x, startPos.y + this.Define.operMjKongOffsetY);
                }
                var offsetX = dir > 0 ? cfg.devSpaceX : cfg.negDevSpaceX;
                var spaceX = this.nRelative == 0 ? offsetX : -offsetX;
                startPos = startPos.add(cc.v3(spaceX, 0));
            }
        }
    };
    /** 被抢杠胡了 降级为碰 */
    ErmjMahjongOperView.prototype.beKongRobbed = function () {
        this.mjOutItemList[this.mjOutItemList.length - 1].active = false;
        this.mjOutItemList[this.mjOutItemList.length - 3].setSpecialColor(true);
        this.state = OperState.Pong;
    };
    ErmjMahjongOperView.prototype.checkPongValid = function () {
        return this.state == OperState.Pong && this.value > 0;
    };
    ErmjMahjongOperView.prototype.checkKongValid = function () {
        return this.state == OperState.Kong && this.value > 0;
    };
    ErmjMahjongOperView.prototype.checkDarkKongValid = function () {
        return this.state == OperState.DarkKong;
    };
    ErmjMahjongOperView.prototype.onClose = function () {
        this.state = -1;
        this.value = 0;
        this.mjOutItemList.forEach(function (item) {
            item.active = false;
        });
    };
    return ErmjMahjongOperView;
}(ErmjBaseView_1.default));
exports.default = ErmjMahjongOperView;

cc._RF.pop();