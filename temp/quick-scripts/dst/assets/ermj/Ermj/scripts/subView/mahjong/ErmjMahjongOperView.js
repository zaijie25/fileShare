
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/mahjong/ErmjMahjongOperView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcbWFoam9uZ1xcRXJtak1haGpvbmdPcGVyVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBQzNDLDJEQUFzRDtBQUN0RCxrRUFBNkQ7QUFFN0QsSUFBWSxTQUtYO0FBTEQsV0FBWSxTQUFTO0lBQ2pCLHlDQUFRLENBQUE7SUFDUix5Q0FBSSxDQUFBO0lBQ0oseUNBQUksQ0FBQTtJQUNKLGlEQUFRLENBQUE7QUFDWixDQUFDLEVBTFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFLcEI7QUFFRDtJQUFpRCx1Q0FBWTtJQU16RCw2QkFBWSxJQUFhLEVBQVUsU0FBaUI7UUFBcEQsWUFDSSxpQkFBTyxTQUVWO1FBSGtDLGVBQVMsR0FBVCxTQUFTLENBQVE7UUFMcEQseUJBQXlCO1FBQ2pCLG1CQUFhLEdBQXlCLEVBQUUsQ0FBQztRQU03QyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRVMsc0NBQVEsR0FBbEI7UUFDSSxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ25CLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBVSxpQ0FBaUM7WUFDckcsSUFBSSxJQUFJLEdBQUcsSUFBSSw0QkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQztJQUNMLENBQUM7SUFFRCxxQkFBcUI7SUFDZCwwQ0FBWSxHQUFuQixVQUFvQixRQUFrQixF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LENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDTCwwQkFBQztBQUFELENBektBLEFBeUtDLENBektnRCxzQkFBWSxHQXlLNUQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtakJhc2VWaWV3IGZyb20gXCIuLi9Fcm1qQmFzZVZpZXdcIjtcclxuaW1wb3J0IEVybWpNYWhqb25nT3V0VmlldyBmcm9tIFwiLi9Fcm1qTWFoam9uZ091dFZpZXdcIjtcclxuaW1wb3J0IEVybWpNalN0eWxlSGVscGVyIGZyb20gXCIuLi8uLi90b29sL0VybWpNalN0eWxlSGVscGVyXCI7XHJcblxyXG5leHBvcnQgZW51bSBPcGVyU3RhdGV7XHJcbiAgICBDaG93ID0gMSxcclxuICAgIFBvbmcsXHJcbiAgICBLb25nLFxyXG4gICAgRGFya0tvbmcsXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpNYWhqb25nT3BlclZpZXcgZXh0ZW5kcyBFcm1qQmFzZVZpZXd7XHJcbiAgICAvKiog5Zub5Liq6bq75bCG5a2QLCDnrKw05Liq5piv5LiK5pa56YKj5Liq55So5LqO5p2gICovXHJcbiAgICBwcml2YXRlIG1qT3V0SXRlbUxpc3Q6IEVybWpNYWhqb25nT3V0Vmlld1tdID0gW107XHJcbiAgICBwdWJsaWMgc3RhdGU6IE9wZXJTdGF0ZTtcclxuICAgIHB1YmxpYyB2YWx1ZTogbnVtYmVyOyAgICAgICAvLyDlkIPlj5bmnIDlsI/nmoTlgLxcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlOiBjYy5Ob2RlLCBwcml2YXRlIG5SZWxhdGl2ZTogbnVtYmVyKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKXtcclxuICAgICAgICBmb3IobGV0IGk9MDsgaTwgNDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmdldENoaWxkKFwibWFoam9uZ091dFZpZXdcIiArIGkudG9TdHJpbmcoKSk7ICAgICAgICAgIC8vIOebtOaOpeaRhuWcqOmihOiuvuS4iiwg5ZCO57ut5peg6aG76K6+572uc2V0U2libGluZ0luZGV4XHJcbiAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEVybWpNYWhqb25nT3V0Vmlldyhub2RlKTtcclxuICAgICAgICAgICAgdmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tak91dEl0ZW1MaXN0LnB1c2godmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlkIMgIHByZXNBcnLpgI/op4bphY3nva4gKi9cclxuICAgIHB1YmxpYyBzZXRDaG93U3R5bGUodmFsdWVBcnI6IG51bWJlcltdLCBjaG93Q2FyZDogbnVtYmVyLCBwZXJzcEFycjogbnVtYmVyW10pe1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBPcGVyU3RhdGUuQ2hvdztcclxuICAgICAgICBsZXQgW3RlbXBdID0gdmFsdWVBcnI7XHJcbiAgICAgICAgbGV0IHN0YXJ0UG9zID0gY2MuVmVjMy5aRVJPO1xyXG4gICAgICAgIGxldCB0b3RhbCA9IHBlcnNwQXJyLmxlbmd0aDtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5tak91dEl0ZW1MaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdmFsdWVBcnJbaV07XHJcbiAgICAgICAgICAgIGxldCBtakl0ZW0gPSB0aGlzLm1qT3V0SXRlbUxpc3RbaV07XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5tYWhqb25nVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5pc0Zyb250ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5zZXRTcGVjaWFsQ29sb3IoY2hvd0NhcmQgPT0gdmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuUGVyc3AgPSBwZXJzcEFyclt0b3RhbCAtIGkgLSAxXSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHtjZmcsIGRpcn0gPSBFcm1qTWpTdHlsZUhlbHBlci5nZXRQZXJzcGVjdGl2ZUNmZyhuUGVyc3ApO1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLnNldFBlcnNwU3R5bGUoblBlcnNwLCB0aGlzLm5SZWxhdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0ubm9kZS5zZXRQb3NpdGlvbihzdGFydFBvcyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBvZmZzZXRYID0gZGlyID4gMCA/IGNmZy5kZXZTcGFjZVggOiBjZmcubmVnRGV2U3BhY2VYO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwYWNlWCA9IHRoaXMublJlbGF0aXZlID09IDAgPyBvZmZzZXRYIDogLW9mZnNldFg7XHJcbiAgICAgICAgICAgICAgICBzdGFydFBvcyA9IHN0YXJ0UG9zLmFkZChjYy52MyhzcGFjZVgsIDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IHRlbXApXHJcbiAgICAgICAgICAgICAgICB0ZW1wID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmFsdWUgPSB0ZW1wOyAgICAgIC8vIOaJvuacgOWwj+eahFxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDnorAgKi9cclxuICAgIHB1YmxpYyBzZXRQb25nU3R5bGUodmFsdWVBcnI6IG51bWJlcltdLCBwZXJzcEFycjogbnVtYmVyW10pe1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBPcGVyU3RhdGUuUG9uZztcclxuICAgICAgICBsZXQgc3RhcnRQb3MgPSBjYy5WZWMzLlpFUk87XHJcbiAgICAgICAgbGV0IGNlbnRlckluZGV4ID0gMTtcclxuICAgICAgICBsZXQgdG90YWwgPSBwZXJzcEFyci5sZW5ndGg7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubWpPdXRJdGVtTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHZhbHVlQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgbWpJdGVtID0gdGhpcy5tak91dEl0ZW1MaXN0W2ldO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0ubWFoam9uZ1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0uaXNGcm9udCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0uc2V0U3BlY2lhbENvbG9yKGkgPT0gY2VudGVySW5kZXgpOyAgICAgLy8g5Lit6Ze06YKj5bygXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5QZXJzcCA9IHBlcnNwQXJyW3RvdGFsIC0gaSAtIDFdIHx8IDA7ICAgICAgLy8g6aG65bqP5ZKMcGVyc3BBcnLlgJLluo9cclxuICAgICAgICAgICAgICAgIGxldCB7Y2ZnLCBkaXJ9ID0gRXJtak1qU3R5bGVIZWxwZXIuZ2V0UGVyc3BlY3RpdmVDZmcoblBlcnNwKTtcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5zZXRQZXJzcFN0eWxlKG5QZXJzcCwgdGhpcy5uUmVsYXRpdmUpO1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLm5vZGUuc2V0UG9zaXRpb24oc3RhcnRQb3MpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0WCA9IGRpciA+IDAgPyBjZmcuZGV2U3BhY2VYIDogY2ZnLm5lZ0RldlNwYWNlWDtcclxuICAgICAgICAgICAgICAgIGxldCBzcGFjZVggPSB0aGlzLm5SZWxhdGl2ZSA9PSAwID8gb2Zmc2V0WCA6IC1vZmZzZXRYO1xyXG4gICAgICAgICAgICAgICAgc3RhcnRQb3MgPSBzdGFydFBvcy5hZGQoY2MudjMoc3BhY2VYLCAwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBbdGhpcy52YWx1ZV0gPSB2YWx1ZUFycjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmnaBcclxuICAgICAqIEBwYXJhbSB2YWx1ZUFyciDniYzlgLzmlbDnu4Qg5Yir5Lq65pqX5p2gW11cclxuICAgICAqIEBwYXJhbSBpc1Zpc2libGUgdHJ1ZeaYjuadoCBmYWxzZeaal+adoFxyXG4gICAgICogQHBhcmFtIGlzT25lU2VlbiDmmK/lkKYz5pqXKzHmmI5cclxuICAgICAqIEBwYXJhbSBwZXJzcEFyciDpgI/op4bphY3nva7liJfooagg5Y+q5pyJ5LiJ5LiqIOadoOeJjOWPluS4remXtOWQkeS4iuWBj+enu1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0S29uZ1N0eWxlKHZhbHVlQXJyOiBudW1iZXJbXSwgaXNWaXNpYmxlOiBib29sZWFuLCBpc09uZVNlZW46IGJvb2xlYW4sIHBlcnNwQXJyOiBudW1iZXJbXSl7XHJcbiAgICAgICAgaWYgKGlzVmlzaWJsZSl7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBPcGVyU3RhdGUuS29uZztcclxuICAgICAgICAgICAgW3RoaXMudmFsdWVdID0gdmFsdWVBcnI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IE9wZXJTdGF0ZS5EYXJrS29uZztcclxuICAgICAgICBsZXQgc3RhcnRQb3MgPSBjYy5WZWMzLlpFUk87XHJcbiAgICAgICAgbGV0IGZvdXJ0aFBvcyA9IGNjLlZlYzMuWkVSTztcclxuICAgICAgICBsZXQgY2VudGVySW5kZXggPSAxO1xyXG4gICAgICAgIGxldCB0b3RhbCA9IHBlcnNwQXJyLmxlbmd0aDtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5tak91dEl0ZW1MaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdmFsdWVBcnJbaV07XHJcbiAgICAgICAgICAgIGxldCBtakl0ZW0gPSB0aGlzLm1qT3V0SXRlbUxpc3RbaV07XHJcbiAgICAgICAgICAgIGlmIChpc1Zpc2libGUgJiYgdmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0ubWFoam9uZ1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0uaXNGcm9udCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0uc2V0U3BlY2lhbENvbG9yKGkgPT0gdGhpcy5tak91dEl0ZW1MaXN0Lmxlbmd0aCAtMSk7ICAgICAvLyDkuIrpnaLpgqPlvKAg5pqX5p2g5LiN5pi+56S6XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzT25lU2VlbiAmJiBpID09IHRoaXMubWpPdXRJdGVtTGlzdC5sZW5ndGggLTEpeyAgICAgICAvLyDnnIvoh6rlt7HmmpfmnaAg5LiL5LiJ5byg5pqXIOS4iumdouaYjueahFxyXG4gICAgICAgICAgICAgICAgICAgIG1qSXRlbS5pc0Zyb250ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBtakl0ZW0ubWFoam9uZ1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbWpJdGVtLnNldFNwZWNpYWxDb2xvcihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG1qSXRlbS5pc0Zyb250ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGkgPT0gdGhpcy5tak91dEl0ZW1MaXN0Lmxlbmd0aCAtIDEpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG5QZXJzcCA9IHBlcnNwQXJyW2NlbnRlckluZGV4XSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLnNldFBlcnNwU3R5bGUoblBlcnNwLCB0aGlzLm5SZWxhdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICBtakl0ZW0ubm9kZS5zZXRQb3NpdGlvbihmb3VydGhQb3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgblBlcnNwID0gcGVyc3BBcnJbdG90YWwgLSBpIC0gMV0gfHwgMDtcclxuICAgICAgICAgICAgICAgIGxldCB7Y2ZnLCBkaXJ9ID0gRXJtak1qU3R5bGVIZWxwZXIuZ2V0UGVyc3BlY3RpdmVDZmcoblBlcnNwKTtcclxuICAgICAgICAgICAgICAgIG1qSXRlbS5zZXRQZXJzcFN0eWxlKG5QZXJzcCwgdGhpcy5uUmVsYXRpdmUpO1xyXG4gICAgICAgICAgICAgICAgbWpJdGVtLm5vZGUuc2V0UG9zaXRpb24oc3RhcnRQb3MpO1xyXG4gICAgICAgICAgICAgICAgaWYoaSA9PSBjZW50ZXJJbmRleCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm91cnRoUG9zID0gY2MudjMoc3RhcnRQb3MueCwgc3RhcnRQb3MueSArIHRoaXMuRGVmaW5lLm9wZXJNaktvbmdPZmZzZXRZKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldFggPSBkaXIgPiAwID8gY2ZnLmRldlNwYWNlWCA6IGNmZy5uZWdEZXZTcGFjZVg7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3BhY2VYID0gdGhpcy5uUmVsYXRpdmUgPT0gMCA/IG9mZnNldFggOiAtb2Zmc2V0WDtcclxuICAgICAgICAgICAgICAgIHN0YXJ0UG9zID0gc3RhcnRQb3MuYWRkKGNjLnYzKHNwYWNlWCwgMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiDooqvmiqLmnaDog6HkuoYg6ZmN57qn5Li656KwICovXHJcbiAgICBwdWJsaWMgYmVLb25nUm9iYmVkKCl7XHJcbiAgICAgICAgdGhpcy5tak91dEl0ZW1MaXN0W3RoaXMubWpPdXRJdGVtTGlzdC5sZW5ndGggLSAxXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1qT3V0SXRlbUxpc3RbdGhpcy5tak91dEl0ZW1MaXN0Lmxlbmd0aCAtIDNdLnNldFNwZWNpYWxDb2xvcih0cnVlKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gT3BlclN0YXRlLlBvbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrUG9uZ1ZhbGlkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgPT0gT3BlclN0YXRlLlBvbmcgJiYgdGhpcy52YWx1ZSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrS29uZ1ZhbGlkKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgPT0gT3BlclN0YXRlLktvbmcgJiYgdGhpcy52YWx1ZSA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrRGFya0tvbmdWYWxpZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlID09IE9wZXJTdGF0ZS5EYXJrS29uZztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpe1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSAtMTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLm1qT3V0SXRlbUxpc3QuZm9yRWFjaChpdGVtPT57XHJcbiAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSJdfQ==