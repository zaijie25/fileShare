
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/subview/player/BbwzPlayerBaseView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4b7e2r+tIJB5KVHGavj7yZD', 'BbwzPlayerBaseView');
// bbwz/Bbwz/scripts/subview/player/BbwzPlayerBaseView.ts

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
var BbwzBaseView_1 = require("../BbwzBaseView");
var BbwzDriver_1 = require("../../BbwzDriver");
var BbwzPathHelper_1 = require("../../tool/BbwzPathHelper");
var BbwzConstDefine_1 = require("../../data/BbwzConstDefine");
var BbwzPlayerBaseView = /** @class */ (function (_super) {
    __extends(BbwzPlayerBaseView, _super);
    function BbwzPlayerBaseView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isSomeone = false;
        return _this;
    }
    Object.defineProperty(BbwzPlayerBaseView.prototype, "isSomeOne", {
        get: function () {
            return this._isSomeone;
        },
        enumerable: false,
        configurable: true
    });
    BbwzPlayerBaseView.prototype.initView = function () {
        this.headImgSp = this.getComponent("mask/sprite_head", cc.Sprite);
        this.headBoxSp = this.getComponent("head_kuang", cc.Sprite);
        this.vipLevel = this.getComponent("vipLbl", cc.Label);
        this.nameLbl = this.getComponent("label_name", cc.Label);
        this.piaoziNode = this.getChild("piaoziNode");
        this.piaoziNode.active = false;
        this.piaoziRawPos = this.piaoziNode.position;
        this.resultLbl = this.getComponent("piaoziNode/label_result", cc.Label);
        this.winEffectNode = this.getChild("spineNode/spineWin");
        this.winEffectNode.active = false;
        this.loseEffectNode = this.getChild("spineNode/spineLose");
        this.loseEffectNode.active = false;
    };
    BbwzPlayerBaseView.prototype.onSit = function (data) {
        this.active = true;
        this._isSomeone = true;
        this.loadHead(data.headimg, data.a_box);
        this.setNameLbl(data.nickname);
    };
    BbwzPlayerBaseView.prototype.onLeave = function () {
        this.active = false;
        this._isSomeone = false;
        this.clearByRound();
    };
    BbwzPlayerBaseView.prototype.loadHead = function (headimg, a_box) {
        this.headImgSp.spriteFrame = Global.Toolkit.getLocalHeadSf(headimg);
        BbwzDriver_1.default.instance.loadVipHeadKuang(this.headBoxSp, a_box);
        this.vipLevel.string = a_box;
    };
    BbwzPlayerBaseView.prototype.setNameLbl = function (name) {
        this.nameLbl.string = Global.Toolkit.substrEndWithElli(name, 12, true);
    };
    BbwzPlayerBaseView.prototype.setReward = function (point) {
        this.piaoziNode.active = true;
        this.resultLbl.string = Global.Toolkit.formatPointStr(point, true, true);
        var fontName = point >= 0 ? BbwzConstDefine_1.default.rewardFontStr.Win : BbwzConstDefine_1.default.rewardFontStr.Lose;
        if (point > 0) {
            this.winEffectNode.active = true;
            this.loseEffectNode.active = false;
        }
        else if (point < 0) {
            this.winEffectNode.active = false;
            this.loseEffectNode.active = true;
        }
        this.resultLbl.font = Global.ResourceManager.getBundleRes(BbwzConstDefine_1.default.GAME_ID, BbwzPathHelper_1.default.gameTexturePath + "atlas/dynamic/font/" + fontName, cc.Font);
        this.piaoziNode.setPosition(this.piaoziRawPos);
        this.piaoziNode.runAction(cc.moveBy(0.5, cc.v2(0, 30)).easing(cc.easeBackOut()));
    };
    BbwzPlayerBaseView.prototype.clearByRound = function () {
        this.winEffectNode.active = false;
        this.loseEffectNode.active = false;
        this.piaoziNode.active = false;
        this.piaoziNode.stopAllActions();
    };
    return BbwzPlayerBaseView;
}(BbwzBaseView_1.default));
exports.default = BbwzPlayerBaseView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcc3Vidmlld1xccGxheWVyXFxCYnd6UGxheWVyQmFzZVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTJDO0FBQzNDLCtDQUEwQztBQUMxQyw0REFBdUQ7QUFDdkQsOERBQXlEO0FBRXpEO0lBQWdELHNDQUFZO0lBQTVEO1FBQUEscUVBNkVDO1FBckVXLGdCQUFVLEdBQUcsS0FBSyxDQUFDOztJQXFFL0IsQ0FBQztJQWxFRyxzQkFBVyx5Q0FBUzthQUFwQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVTLHFDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBYyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsU0FBUyxHQUFjLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsUUFBUSxHQUFhLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsT0FBTyxHQUFhLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsR0FBYSxJQUFJLENBQUMsWUFBWSxDQUFDLHlC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VUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFTSx5Q0FBWSxHQUFuQjtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0E3RUEsQUE2RUMsQ0E3RStDLHNCQUFZLEdBNkUzRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYnd6QmFzZVZpZXcgZnJvbSBcIi4uL0Jid3pCYXNlVmlld1wiO1xyXG5pbXBvcnQgQmJ3ekRyaXZlciBmcm9tIFwiLi4vLi4vQmJ3ekRyaXZlclwiO1xyXG5pbXBvcnQgQmJ3elBhdGhIZWxwZXIgZnJvbSBcIi4uLy4uL3Rvb2wvQmJ3elBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IEJid3pDb25zdERlZmluZSBmcm9tIFwiLi4vLi4vZGF0YS9CYnd6Q29uc3REZWZpbmVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJid3pQbGF5ZXJCYXNlVmlldyBleHRlbmRzIEJid3pCYXNlVmlldyB7XHJcbiAgICBwcm90ZWN0ZWQgaGVhZEltZ1NwOiBjYy5TcHJpdGU7XHJcbiAgICBwcm90ZWN0ZWQgaGVhZEJveFNwOiBjYy5TcHJpdGU7XHJcbiAgICBwcm90ZWN0ZWQgdmlwTGV2ZWw6IGNjLkxhYmVsO1xyXG4gICAgcHJvdGVjdGVkIG5hbWVMYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJvdGVjdGVkIHBpYW96aU5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcm90ZWN0ZWQgcGlhb3ppUmF3UG9zOiBjYy5WZWMyO1xyXG4gICAgcHJvdGVjdGVkIHJlc3VsdExibDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIF9pc1NvbWVvbmUgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgd2luRWZmZWN0Tm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgbG9zZUVmZmVjdE5vZGU6IGNjLk5vZGU7XHJcbiAgICBwdWJsaWMgZ2V0IGlzU29tZU9uZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNTb21lb25lO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLmhlYWRJbWdTcCA9IDxjYy5TcHJpdGU+dGhpcy5nZXRDb21wb25lbnQoXCJtYXNrL3Nwcml0ZV9oZWFkXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5oZWFkQm94U3AgPSA8Y2MuU3ByaXRlPnRoaXMuZ2V0Q29tcG9uZW50KFwiaGVhZF9rdWFuZ1wiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMudmlwTGV2ZWwgPSA8Y2MuTGFiZWw+dGhpcy5nZXRDb21wb25lbnQoXCJ2aXBMYmxcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMubmFtZUxibCA9IDxjYy5MYWJlbD50aGlzLmdldENvbXBvbmVudChcImxhYmVsX25hbWVcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMucGlhb3ppTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJwaWFvemlOb2RlXCIpO1xyXG4gICAgICAgIHRoaXMucGlhb3ppTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBpYW96aVJhd1BvcyA9IHRoaXMucGlhb3ppTm9kZS5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnJlc3VsdExibCA9IDxjYy5MYWJlbD50aGlzLmdldENvbXBvbmVudChcInBpYW96aU5vZGUvbGFiZWxfcmVzdWx0XCIsIGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLndpbkVmZmVjdE5vZGUgPSB0aGlzLmdldENoaWxkKFwic3BpbmVOb2RlL3NwaW5lV2luXCIpO1xyXG4gICAgICAgIHRoaXMud2luRWZmZWN0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxvc2VFZmZlY3ROb2RlID0gdGhpcy5nZXRDaGlsZChcInNwaW5lTm9kZS9zcGluZUxvc2VcIik7XHJcbiAgICAgICAgdGhpcy5sb3NlRWZmZWN0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TaXQoZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2lzU29tZW9uZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sb2FkSGVhZChkYXRhLmhlYWRpbWcsIGRhdGEuYV9ib3gpO1xyXG4gICAgICAgIHRoaXMuc2V0TmFtZUxibChkYXRhLm5pY2tuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25MZWF2ZSgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzU29tZW9uZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xlYXJCeVJvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvYWRIZWFkKGhlYWRpbWc6IHN0cmluZywgYV9ib3g6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaGVhZEltZ1NwLnNwcml0ZUZyYW1lID0gR2xvYmFsLlRvb2xraXQuZ2V0TG9jYWxIZWFkU2YoaGVhZGltZyk7XHJcbiAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5sb2FkVmlwSGVhZEt1YW5nKHRoaXMuaGVhZEJveFNwLCBhX2JveCk7XHJcbiAgICAgICAgdGhpcy52aXBMZXZlbC5zdHJpbmcgPSBhX2JveDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TmFtZUxibChuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWVMYmwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuc3Vic3RyRW5kV2l0aEVsbGkobmFtZSwgMTIsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRSZXdhcmQocG9pbnQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucGlhb3ppTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVzdWx0TGJsLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKHBvaW50LCB0cnVlLCB0cnVlKTtcclxuICAgICAgICBsZXQgZm9udE5hbWUgPSBwb2ludCA+PSAwID8gQmJ3ekNvbnN0RGVmaW5lLnJld2FyZEZvbnRTdHIuV2luIDogQmJ3ekNvbnN0RGVmaW5lLnJld2FyZEZvbnRTdHIuTG9zZTtcclxuXHJcbiAgICAgICAgaWYgKHBvaW50ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLndpbkVmZmVjdE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sb3NlRWZmZWN0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocG9pbnQgPCAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luRWZmZWN0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sb3NlRWZmZWN0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc3VsdExibC5mb250ID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRCdW5kbGVSZXMoQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUQsIEJid3pQYXRoSGVscGVyLmdhbWVUZXh0dXJlUGF0aCArIFwiYXRsYXMvZHluYW1pYy9mb250L1wiICsgZm9udE5hbWUsIGNjLkZvbnQpO1xyXG4gICAgICAgIHRoaXMucGlhb3ppTm9kZS5zZXRQb3NpdGlvbih0aGlzLnBpYW96aVJhd1Bvcyk7XHJcbiAgICAgICAgdGhpcy5waWFvemlOb2RlLnJ1bkFjdGlvbihjYy5tb3ZlQnkoMC41LCBjYy52MigwLCAzMCkpLmVhc2luZyhjYy5lYXNlQmFja091dCgpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQnlSb3VuZCgpIHtcclxuICAgICAgICB0aGlzLndpbkVmZmVjdE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb3NlRWZmZWN0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBpYW96aU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5waWFvemlOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICB9XHJcbn0iXX0=