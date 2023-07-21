"use strict";
cc._RF.push(module, '20f1dWFWoZBvp9hmXMVasYW', 'DdzMarkerView');
// ddz/ddz/scripts/subView/DdzMarkerView.ts

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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var DdzBaseView_1 = require("./DdzBaseView");
var DdzGameEvent_1 = require("../data/DdzGameEvent");
var DdzPokerHelper_1 = require("../data/DdzPokerHelper");
var DdzRuleConst_1 = require("../data/DdzRuleConst");
var DdzDriver_1 = require("../DdzDriver");
/**
 * 记牌器的view
 */
var DdzMarkerView = /** @class */ (function (_super) {
    __extends(DdzMarkerView, _super);
    function DdzMarkerView(node) {
        var _this = _super.call(this) || this;
        _this.pokerMarkerColList = [];
        // 记牌器数据, 0大王 1小王 2~14 2-A
        _this.pokerMarkerDefaultArr = [
            1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ];
        _this.quickPokerMarkerDefaultArr = [
            1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0
        ];
        _this.keyMap = {
            3: 14,
            4: 13,
            5: 12,
            6: 11,
            7: 10,
            8: 9,
            9: 8,
            10: 7,
            11: 6,
            12: 5,
            13: 4,
            14: 3,
        };
        _this.setNode(node);
        return _this;
    }
    DdzMarkerView.prototype.initView = function () {
        for (var i = 0; i < 15; i++) {
            var node = this.getChild('content/item' + i);
            var item = new MarkerItem(node);
            this.pokerMarkerColList.push(item);
        }
    };
    DdzMarkerView.prototype.onOpen = function () {
        Game.Event.on(DdzGameEvent_1.default.UpdateMarker, this, this.onUpdateMarker);
        this.onUpdateMarker();
    };
    DdzMarkerView.prototype.onClose = function () {
        Game.Event.off(DdzGameEvent_1.default.UpdateMarker, this, this.onUpdateMarker);
    };
    DdzMarkerView.prototype.onUpdateMarker = function () {
        var markerData = this.Context.getMarkerData();
        var selfHandPokers = this.Context.getSelfHandPokers();
        var knownArr = markerData.concat(selfHandPokers);
        var result = knownArr.filter(function (item, index, arr) { return arr.indexOf(item) === index; }); //去重
        var defaultArr = this.Context.mode == DdzRuleConst_1.DdzMode.Quick && __spreadArrays(this.quickPokerMarkerDefaultArr) || __spreadArrays(this.pokerMarkerDefaultArr);
        for (var i = 0; i <= result.length - 1; i++) {
            var value = result[i];
            if (this.PokerHelper.checkPokerValid(value)) {
                var key = -1;
                if (value == DdzPokerHelper_1.default.RedGhost)
                    key = 0;
                else if (value == DdzPokerHelper_1.default.BlackGhost)
                    key = 1;
                else {
                    key = this.PokerHelper.getPokerValue(value)[0];
                }
                if (key >= 0 && key <= 14) {
                    if (this.keyMap[key])
                        key = this.keyMap[key];
                    defaultArr[key] -= 1;
                }
            }
        }
        this.setDataShow(defaultArr);
    };
    DdzMarkerView.prototype.setDataShow = function (arr) {
        this.pokerMarkerColList.forEach(function (item, key) {
            var count = arr[key];
            if (count >= 0) {
                item.setLeftCount(count);
            }
        });
    };
    return DdzMarkerView;
}(DdzBaseView_1.default));
exports.default = DdzMarkerView;
var MarkerItem = /** @class */ (function (_super) {
    __extends(MarkerItem, _super);
    function MarkerItem(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    MarkerItem.prototype.initView = function () {
        this.countLbl = this.getComponent('countLbl', cc.Label);
    };
    //TODO 记牌器字体颜色
    MarkerItem.prototype.setLeftCount = function (num) {
        if (num === void 0) { num = 4; }
        this.countLbl.string = String(num);
        if (num == 0) {
            // this.countLbl.node.color = new cc.Color(194, 48, 17, 255);
            this.countLbl.node.color = new cc.Color().fromHEX(DdzDriver_1.default.instance.skinDefine.markerColorArr[0]);
        }
        else {
            // this.countLbl.node.color = new cc.Color(240, 155, 85, 255);
            this.countLbl.node.color = new cc.Color().fromHEX(DdzDriver_1.default.instance.skinDefine.markerColorArr[1]);
        }
    };
    return MarkerItem;
}(DdzBaseView_1.default));

cc._RF.pop();