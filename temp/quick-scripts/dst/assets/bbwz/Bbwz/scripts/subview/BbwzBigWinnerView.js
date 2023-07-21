
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/subview/BbwzBigWinnerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1cf3fdE+GpGK7CHo7dTaq5+', 'BbwzBigWinnerView');
// bbwz/Bbwz/scripts/subview/BbwzBigWinnerView.ts

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
var BbwzDriver_1 = require("../BbwzDriver");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzBaseView_1 = require("./BbwzBaseView");
/**
 * 游戏层 大赢家
 */
var BbwzBigWinnerView = /** @class */ (function (_super) {
    __extends(BbwzBigWinnerView, _super);
    function BbwzBigWinnerView(node) {
        var _this = _super.call(this) || this;
        _this.bigSpine = null;
        _this.head = null;
        _this.head_kuang = null;
        _this.money = null;
        _this.nameLbl = null;
        _this.setNode(node);
        return _this;
    }
    BbwzBigWinnerView.prototype.initView = function () {
        this.bigSpine = cc.find("content/spine", this.node).getComponent(sp.Skeleton);
        this.head = cc.find("content/mask/sprite_head", this.node).getComponent(cc.Sprite);
        this.head_kuang = cc.find("content/head_kuang", this.node).getComponent(cc.Sprite);
        this.money = cc.find("content/bigwinMoney", this.node).getComponent(cc.Label);
        this.nameLbl = cc.find("content/name", this.node).getComponent(cc.Label);
    };
    BbwzBigWinnerView.prototype.updateUI = function (big_winner) {
        var _this = this;
        this.clear();
        if (big_winner && big_winner.nickname !== "") {
            this.head.spriteFrame = Global.Toolkit.getLocalHeadSf(big_winner.headimg);
            BbwzDriver_1.default.instance.loadVipHeadKuang(this.head_kuang, big_winner.a_box);
            this.money.string = Global.Toolkit.formatPointStr(big_winner.hitPoint, true, true);
            this.nameLbl.string = big_winner.nickname;
            this.bigSpine.setAnimation(0, "idle", false);
            Game.Component.scheduleOnce(function () {
                _this.head.node.active = true;
                _this.head_kuang.node.active = true;
                _this.money.node.active = true;
                _this.nameLbl.node.active = true;
            }, 0.5);
            Global.Audio.playBundleSound(BbwzConstDefine_1.default.GAME_ID, BbwzConstDefine_1.default.SOUND_WIN, true);
        }
    };
    BbwzBigWinnerView.prototype.clear = function () {
        this.head.node.active = false;
        this.head_kuang.node.active = false;
        this.money.node.active = false;
        this.nameLbl.node.active = false;
        this.bigSpine.clearTracks();
    };
    BbwzBigWinnerView.prototype.clearByRound = function () {
        this.active = false;
    };
    return BbwzBigWinnerView;
}(BbwzBaseView_1.default));
exports.default = BbwzBigWinnerView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcc3Vidmlld1xcQmJ3ekJpZ1dpbm5lclZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNENBQXVDO0FBQ3ZDLDJEQUFzRDtBQUN0RCwrQ0FBMEM7QUFFMUM7O0dBRUc7QUFDSDtJQUErQyxxQ0FBWTtJQU92RCwyQkFBWSxJQUFhO1FBQXpCLFlBQ0ksaUJBQU8sU0FFVjtRQVRPLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBQzdCLFVBQUksR0FBYyxJQUFJLENBQUM7UUFDdkIsZ0JBQVUsR0FBYyxJQUFJLENBQUM7UUFDN0IsV0FBSyxHQUFhLElBQUksQ0FBQztRQUN2QixhQUFPLEdBQWEsSUFBSSxDQUFDO1FBSTdCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0lBQ3ZCLENBQUM7SUFFUyxvQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU0sb0NBQVEsR0FBZixVQUFnQixVQUFlO1FBQS9CLGlCQWlCQztRQWhCRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsUUFBUSxLQUFLLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUUsb0JBQVUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbkYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUUxQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO2dCQUN4QixLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUM3QixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNuQyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUM5QixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLHlCQUFlLENBQUMsT0FBTyxFQUFDLHlCQUFlLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3pGO0lBQ0wsQ0FBQztJQUVPLGlDQUFLLEdBQWI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVNLHdDQUFZLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FsREEsQUFrREMsQ0FsRDhDLHNCQUFZLEdBa0QxRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYnd6RHJpdmVyIGZyb20gXCIuLi9CYnd6RHJpdmVyXCI7XHJcbmltcG9ydCBCYnd6Q29uc3REZWZpbmUgZnJvbSBcIi4uL2RhdGEvQmJ3ekNvbnN0RGVmaW5lXCI7XHJcbmltcG9ydCBCYnd6QmFzZVZpZXcgZnJvbSBcIi4vQmJ3ekJhc2VWaWV3XCI7XHJcblxyXG4vKipcclxuICog5ri45oiP5bGCIOWkp+i1ouWutlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmJ3ekJpZ1dpbm5lclZpZXcgZXh0ZW5kcyBCYnd6QmFzZVZpZXcge1xyXG4gICAgcHJpdmF0ZSBiaWdTcGluZTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBoZWFkOiBjYy5TcHJpdGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBoZWFkX2t1YW5nOiBjYy5TcHJpdGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBtb25leTogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBuYW1lTGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLmJpZ1NwaW5lID0gY2MuZmluZChcImNvbnRlbnQvc3BpbmVcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMuaGVhZCA9IGNjLmZpbmQoXCJjb250ZW50L21hc2svc3ByaXRlX2hlYWRcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLmhlYWRfa3VhbmcgPSBjYy5maW5kKFwiY29udGVudC9oZWFkX2t1YW5nXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5tb25leSA9IGNjLmZpbmQoXCJjb250ZW50L2JpZ3dpbk1vbmV5XCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLm5hbWVMYmwgPSBjYy5maW5kKFwiY29udGVudC9uYW1lXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlVUkoYmlnX3dpbm5lcjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIGlmIChiaWdfd2lubmVyICYmIGJpZ193aW5uZXIubmlja25hbWUgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5oZWFkLnNwcml0ZUZyYW1lID0gR2xvYmFsLlRvb2xraXQuZ2V0TG9jYWxIZWFkU2YoYmlnX3dpbm5lci5oZWFkaW1nKTtcclxuICAgICAgICAgICAgQmJ3ekRyaXZlci5pbnN0YW5jZS5sb2FkVmlwSGVhZEt1YW5nKHRoaXMuaGVhZF9rdWFuZywgYmlnX3dpbm5lci5hX2JveCk7XHJcbiAgICAgICAgICAgIHRoaXMubW9uZXkuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoYmlnX3dpbm5lci5oaXRQb2ludCwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZUxibC5zdHJpbmcgPSBiaWdfd2lubmVyLm5pY2tuYW1lO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iaWdTcGluZS5zZXRBbmltYXRpb24oMCwgXCJpZGxlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVhZC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRfa3Vhbmcubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tb25leS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWVMYmwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9LCAwLjUpO1xyXG4gICAgICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ1bmRsZVNvdW5kKEJid3pDb25zdERlZmluZS5HQU1FX0lELEJid3pDb25zdERlZmluZS5TT1VORF9XSU4sIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMuaGVhZC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaGVhZF9rdWFuZy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubW9uZXkubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5hbWVMYmwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmJpZ1NwaW5lLmNsZWFyVHJhY2tzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQnlSb3VuZCgpe1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIl19