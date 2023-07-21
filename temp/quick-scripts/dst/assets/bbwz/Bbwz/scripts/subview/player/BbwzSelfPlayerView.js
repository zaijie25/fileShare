
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/subview/player/BbwzSelfPlayerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c2f59denS1EDrDVnvSzLpIo', 'BbwzSelfPlayerView');
// bbwz/Bbwz/scripts/subview/player/BbwzSelfPlayerView.ts

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
var BbwzPlayerBaseView_1 = require("./BbwzPlayerBaseView");
var BbwzConstDefine_1 = require("../../data/BbwzConstDefine");
var BbwzData_1 = require("../../data/BbwzData");
var BbwzSelfPlayerView = /** @class */ (function (_super) {
    __extends(BbwzSelfPlayerView, _super);
    function BbwzSelfPlayerView(node, chair) {
        var _this = _super.call(this) || this;
        _this.chair = chair;
        _this.setNode(node);
        return _this;
    }
    BbwzSelfPlayerView.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.goldLbl = this.getComponent("label_gold", cc.Label);
        BbwzConstDefine_1.default.addCommonClick(this.node, "btn_cz", this.onRechargeClick, this);
        BbwzData_1.default.instance.playerChipsFlyPos[this.chair] = this.getCenterWorldPos();
    };
    BbwzSelfPlayerView.prototype.setGoldLbl = function (point) {
        this.goldLbl.string = Global.Toolkit.formatPointStr(point, true);
    };
    BbwzSelfPlayerView.prototype.onSit = function (data) {
        _super.prototype.onSit.call(this, data);
        this.setGoldLbl(data.point);
    };
    BbwzSelfPlayerView.prototype.onRechargeClick = function () {
        BbwzConstDefine_1.default.playBtnSound();
        Global.UI.show("WndRecharge");
    };
    BbwzSelfPlayerView.prototype.getCenterWorldPos = function () {
        return this.headImgSp.node.parent.convertToWorldSpaceAR(this.headImgSp.node.position);
    };
    //返回头像之间点的世界坐标
    BbwzSelfPlayerView.prototype.getChipStartPos = function () {
        return this.node.parent.convertToWorldSpaceAR(this.node.position);
    };
    return BbwzSelfPlayerView;
}(BbwzPlayerBaseView_1.default));
exports.default = BbwzSelfPlayerView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcc3Vidmlld1xccGxheWVyXFxCYnd6U2VsZlBsYXllclZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXNEO0FBQ3RELDhEQUF5RDtBQUN6RCxnREFBMkM7QUFFM0M7SUFBZ0Qsc0NBQWtCO0lBRTlELDRCQUFZLElBQWEsRUFBUyxLQUFhO1FBQS9DLFlBQ0ksaUJBQU8sU0FFVjtRQUhpQyxXQUFLLEdBQUwsS0FBSyxDQUFRO1FBRTNDLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0lBQ3ZCLENBQUM7SUFFUyxxQ0FBUSxHQUFsQjtRQUNJLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQWEsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25FLHlCQUFlLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEYsa0JBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQy9FLENBQUM7SUFFTSx1Q0FBVSxHQUFqQixVQUFrQixLQUFhO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRU0sa0NBQUssR0FBWixVQUFhLElBQVM7UUFDbEIsaUJBQU0sS0FBSyxZQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTyw0Q0FBZSxHQUF2QjtRQUNJLHlCQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDL0IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLDhDQUFpQixHQUF4QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFRCxjQUFjO0lBQ1AsNENBQWUsR0FBdEI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FwQ0EsQUFvQ0MsQ0FwQytDLDRCQUFrQixHQW9DakUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmJ3elBsYXllckJhc2VWaWV3IGZyb20gXCIuL0Jid3pQbGF5ZXJCYXNlVmlld1wiO1xyXG5pbXBvcnQgQmJ3ekNvbnN0RGVmaW5lIGZyb20gXCIuLi8uLi9kYXRhL0Jid3pDb25zdERlZmluZVwiO1xyXG5pbXBvcnQgQmJ3ekRhdGEgZnJvbSBcIi4uLy4uL2RhdGEvQmJ3ekRhdGFcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJid3pTZWxmUGxheWVyVmlldyBleHRlbmRzIEJid3pQbGF5ZXJCYXNlVmlldyB7XHJcbiAgICBwcml2YXRlIGdvbGRMYmw6IGNjLkxhYmVsO1xyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSwgcHVibGljIGNoYWlyOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdFZpZXcoKTtcclxuICAgICAgICB0aGlzLmdvbGRMYmwgPSA8Y2MuTGFiZWw+dGhpcy5nZXRDb21wb25lbnQoXCJsYWJlbF9nb2xkXCIsIGNjLkxhYmVsKTtcclxuICAgICAgICBCYnd6Q29uc3REZWZpbmUuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImJ0bl9jelwiLCB0aGlzLm9uUmVjaGFyZ2VDbGljaywgdGhpcyk7XHJcbiAgICAgICAgQmJ3ekRhdGEuaW5zdGFuY2UucGxheWVyQ2hpcHNGbHlQb3NbdGhpcy5jaGFpcl0gPSB0aGlzLmdldENlbnRlcldvcmxkUG9zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEdvbGRMYmwocG9pbnQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZ29sZExibC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihwb2ludCwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2l0KGRhdGE6IGFueSkge1xyXG4gICAgICAgIHN1cGVyLm9uU2l0KGRhdGEpO1xyXG4gICAgICAgIHRoaXMuc2V0R29sZExibChkYXRhLnBvaW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uUmVjaGFyZ2VDbGljaygpIHtcclxuICAgICAgICBCYnd6Q29uc3REZWZpbmUucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRSZWNoYXJnZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2VudGVyV29ybGRQb3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhZEltZ1NwLm5vZGUucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLmhlYWRJbWdTcC5ub2RlLnBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+i/lOWbnuWktOWDj+S5i+mXtOeCueeahOS4lueVjOWdkOagh1xyXG4gICAgcHVibGljIGdldENoaXBTdGFydFBvcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIodGhpcy5ub2RlLnBvc2l0aW9uKTtcclxuICAgIH1cclxufSJdfQ==