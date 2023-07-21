
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/subView/DdzMarkerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHN1YlZpZXdcXERkek1hcmtlclZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUF3QztBQUN4QyxxREFBZ0Q7QUFDaEQseURBQW9EO0FBQ3BELHFEQUErQztBQUMvQywwQ0FBcUM7QUFFckM7O0dBRUc7QUFDSDtJQUEyQyxpQ0FBVztJQTBCbEQsdUJBQVksSUFBYTtRQUF6QixZQUNJLGlCQUFPLFNBRVY7UUE1Qk8sd0JBQWtCLEdBQWlCLEVBQUUsQ0FBQztRQUM5QywwQkFBMEI7UUFDbEIsMkJBQXFCLEdBQUc7WUFDNUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQzlDLENBQUM7UUFFTSxnQ0FBMEIsR0FBRztZQUNqQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDOUMsQ0FBQztRQUVNLFlBQU0sR0FBRztZQUNiLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLEVBQUU7WUFDTCxDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osRUFBRSxFQUFFLENBQUM7WUFDTCxFQUFFLEVBQUUsQ0FBQztZQUNMLEVBQUUsRUFBRSxDQUFDO1lBQ0wsRUFBRSxF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QUUsQ0FBQyxPQUFPLENBQUMsbUJBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RHO0lBQ0wsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0F2QkEsQUF1QkMsQ0F2QndCLHFCQUFXLEdBdUJuQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpCYXNlVmlldyBmcm9tIFwiLi9EZHpCYXNlVmlld1wiO1xyXG5pbXBvcnQgRGR6R2FtZUV2ZW50IGZyb20gXCIuLi9kYXRhL0RkekdhbWVFdmVudFwiO1xyXG5pbXBvcnQgRGR6UG9rZXJIZWxwZXIgZnJvbSBcIi4uL2RhdGEvRGR6UG9rZXJIZWxwZXJcIjtcclxuaW1wb3J0IHsgRGR6TW9kZSB9IGZyb20gXCIuLi9kYXRhL0RkelJ1bGVDb25zdFwiO1xyXG5pbXBvcnQgRGR6RHJpdmVyIGZyb20gXCIuLi9EZHpEcml2ZXJcIjtcclxuXHJcbi8qKlxyXG4gKiDorrDniYzlmajnmoR2aWV3XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZHpNYXJrZXJWaWV3IGV4dGVuZHMgRGR6QmFzZVZpZXcge1xyXG4gICAgcHJpdmF0ZSBwb2tlck1hcmtlckNvbExpc3Q6IE1hcmtlckl0ZW1bXSA9IFtdO1xyXG4gICAgLy8g6K6w54mM5Zmo5pWw5o2uLCAw5aSn546LIDHlsI/njosgMn4xNCAyLUFcclxuICAgIHByaXZhdGUgcG9rZXJNYXJrZXJEZWZhdWx0QXJyID0gW1xyXG4gICAgICAgIDEsIDEsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDQsIDRcclxuICAgIF07XHJcbiAgICBcclxuICAgIHByaXZhdGUgcXVpY2tQb2tlck1hcmtlckRlZmF1bHRBcnIgPSBbXHJcbiAgICAgICAgMSwgMSwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgNCwgMCwgMCwgMFxyXG4gICAgXTtcclxuXHJcbiAgICBwcml2YXRlIGtleU1hcCA9IHtcclxuICAgICAgICAzOiAxNCxcclxuICAgICAgICA0OiAxMyxcclxuICAgICAgICA1OiAxMixcclxuICAgICAgICA2OiAxMSxcclxuICAgICAgICA3OiAxMCxcclxuICAgICAgICA4OiA5LFxyXG4gICAgICAgIDk6IDgsXHJcbiAgICAgICAgMTA6IDcsXHJcbiAgICAgICAgMTE6IDYsXHJcbiAgICAgICAgMTI6IDUsXHJcbiAgICAgICAgMTM6IDQsXHJcbiAgICAgICAgMTQ6IDMsXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE1OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmdldENoaWxkKCdjb250ZW50L2l0ZW0nICsgaSk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gbmV3IE1hcmtlckl0ZW0obm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMucG9rZXJNYXJrZXJDb2xMaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKSB7XHJcbiAgICAgICAgR2FtZS5FdmVudC5vbihEZHpHYW1lRXZlbnQuVXBkYXRlTWFya2VyLCB0aGlzLCB0aGlzLm9uVXBkYXRlTWFya2VyKTtcclxuICAgICAgICB0aGlzLm9uVXBkYXRlTWFya2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgR2FtZS5FdmVudC5vZmYoRGR6R2FtZUV2ZW50LlVwZGF0ZU1hcmtlciwgdGhpcywgdGhpcy5vblVwZGF0ZU1hcmtlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVXBkYXRlTWFya2VyKCkge1xyXG4gICAgICAgIGxldCBtYXJrZXJEYXRhID0gdGhpcy5Db250ZXh0LmdldE1hcmtlckRhdGEoKTtcclxuICAgICAgICBsZXQgc2VsZkhhbmRQb2tlcnMgPSB0aGlzLkNvbnRleHQuZ2V0U2VsZkhhbmRQb2tlcnMoKTtcclxuICAgICAgICBsZXQga25vd25BcnIgPSBtYXJrZXJEYXRhLmNvbmNhdChzZWxmSGFuZFBva2Vycyk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGtub3duQXJyLmZpbHRlcigoaXRlbSwgaW5kZXgsIGFycikgPT4gYXJyLmluZGV4T2YoaXRlbSkgPT09IGluZGV4KTsgLy/ljrvph41cclxuICAgICAgICBsZXQgZGVmYXVsdEFyciA9IHRoaXMuQ29udGV4dC5tb2RlID09IERkek1vZGUuUXVpY2sgJiYgWy4uLnRoaXMucXVpY2tQb2tlck1hcmtlckRlZmF1bHRBcnJdfHwgWy4uLnRoaXMucG9rZXJNYXJrZXJEZWZhdWx0QXJyXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSByZXN1bHQubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHJlc3VsdFtpXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUG9rZXJIZWxwZXIuY2hlY2tQb2tlclZhbGlkKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IERkelBva2VySGVscGVyLlJlZEdob3N0KVxyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IDA7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PSBEZHpQb2tlckhlbHBlci5CbGFja0dob3N0KVxyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IDE7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBba2V5XSA9IHRoaXMuUG9rZXJIZWxwZXIuZ2V0UG9rZXJWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA+PSAwICYmIGtleSA8PSAxNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmtleU1hcFtrZXldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXkgPSB0aGlzLmtleU1hcFtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBcnJba2V5XSAtPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YVNob3coZGVmYXVsdEFycik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXREYXRhU2hvdyhhcnI6IG51bWJlcltdKSB7XHJcbiAgICAgICAgdGhpcy5wb2tlck1hcmtlckNvbExpc3QuZm9yRWFjaCgoaXRlbSwga2V5KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IGFycltrZXldO1xyXG4gICAgICAgICAgICBpZiAoY291bnQgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZXRMZWZ0Q291bnQoY291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1hcmtlckl0ZW0gZXh0ZW5kcyBEZHpCYXNlVmlldyB7XHJcbiAgICBwcml2YXRlIGNvdW50TGJsOiBjYy5MYWJlbDtcclxuICAgIGNvbnN0cnVjdG9yKG5vZGUpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5jb3VudExibCA9IDxjYy5MYWJlbD50aGlzLmdldENvbXBvbmVudCgnY291bnRMYmwnLCBjYy5MYWJlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOiusOeJjOWZqOWtl+S9k+minOiJslxyXG4gICAgcHVibGljIHNldExlZnRDb3VudChudW06IG51bWJlciA9IDQpIHtcclxuICAgICAgICB0aGlzLmNvdW50TGJsLnN0cmluZyA9IFN0cmluZyhudW0pO1xyXG4gICAgICAgIGlmIChudW0gPT0gMCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLmNvdW50TGJsLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMTk0LCA0OCwgMTcsIDI1NSk7XHJcbiAgICAgICAgICAgIHRoaXMuY291bnRMYmwubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigpLmZyb21IRVgoRGR6RHJpdmVyLmluc3RhbmNlLnNraW5EZWZpbmUubWFya2VyQ29sb3JBcnJbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5jb3VudExibC5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDI0MCwgMTU1LCA4NSwgMjU1KTtcclxuICAgICAgICAgICAgdGhpcy5jb3VudExibC5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWChEZHpEcml2ZXIuaW5zdGFuY2Uuc2tpbkRlZmluZS5tYXJrZXJDb2xvckFyclsxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19