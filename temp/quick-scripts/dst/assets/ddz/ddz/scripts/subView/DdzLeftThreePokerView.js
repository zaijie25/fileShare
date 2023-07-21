
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/subView/DdzLeftThreePokerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHN1YlZpZXdcXERkekxlZnRUaHJlZVBva2VyVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBd0M7QUFFeEMsMENBQXFDO0FBRXJDOztHQUVHO0FBQ0g7SUFBbUQseUNBQVc7SUFPMUQsK0JBQVksSUFBYTtRQUF6QixZQUNJLGlCQUFPLFNBRVY7UUFOTyxlQUFTLEdBQW1CLEVBQUUsQ0FBQztRQUMvQixZQUFNLEdBQUcsRUFBRSxDQUFDO1FBSWhCLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0lBQ3ZCLENBQUM7SUFFUyx3Q0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQWEsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVNLDJDQUFXLEdBQWxCLFVBQW1CLEdBQXdCO1FBQTNDLGlCQVVDO1FBVmtCLG9CQUFBLEVBQUEsUUFBd0I7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1lBQ3hCLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDdEIsS0FBSyxDQUFDLElBQUksQ0FB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aWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGR6QmFzZVZpZXcgZnJvbSBcIi4vRGR6QmFzZVZpZXdcIjtcclxuaW1wb3J0IERkelBva2VyVmlldyBmcm9tIFwiLi9EZHpQb2tlclZpZXdcIjtcclxuaW1wb3J0IERkekRyaXZlciBmcm9tIFwiLi4vRGR6RHJpdmVyXCI7XHJcblxyXG4vKipcclxuICog5bqV5YiG5YCN5pWw77yM5Zyw5Li75LiJ5byg54mM55qEdmlld1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6TGVmdFRocmVlUG9rZXJWaWV3IGV4dGVuZHMgRGR6QmFzZVZpZXd7XHJcbiAgICBwcml2YXRlIGR6UG9rZXJzUm9vdDogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgZHpTY29yZU5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGR6U2NvcmVMYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBwb2tlckxpc3Q6IERkelBva2VyVmlld1tdID0gW107XHJcbiAgICBwcml2YXRlIHNwYWNlWCA9IDI1O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMuZHpQb2tlcnNSb290ID0gdGhpcy5nZXRDaGlsZCgnZHpQb2tlcnNSb290Jyk7XHJcbiAgICAgICAgdGhpcy5kelNjb3JlTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoJ3NvY3JlJyk7XHJcbiAgICAgICAgdGhpcy5kelNjb3JlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmR6U2NvcmVMYmwgPSA8Y2MuTGFiZWw+dGhpcy5nZXRDb21wb25lbnQoJ3NvY3JlL2R6U2NvcmVMYmwnLCBjYy5MYWJlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZERaUG9rZXJzKGFycjogRGR6UG9rZXJWaWV3W10gPSBbXSl7XHJcbiAgICAgICAgdGhpcy5wb2tlckxpc3QgPSBhcnI7XHJcbiAgICAgICAgdGhpcy5wb2tlckxpc3QuZm9yRWFjaChwb2tlcj0+e1xyXG4gICAgICAgICAgICBwb2tlci5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBwb2tlci5zZXRQb2tlclN0eWxlKDApO1xyXG4gICAgICAgICAgICBwb2tlci5pc0Zyb250ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHBva2VyLm5vZGUuc2V0UGFyZW50KHRoaXMuZHpQb2tlcnNSb290KTtcclxuICAgICAgICAgICAgcG9rZXIuc2V0UG9rZXJQb3NpdGlvbihjYy5WZWMzLlpFUk8pO1xyXG4gICAgICAgICAgICBwb2tlci5zZXRQb2tlclNjYWxlKHRoaXMuRGVmaW5lLlNtYWxsUG9rZXJTY2FsZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlTaG93QW5pbWF0aW9uKGlzQW5pbSA9IHRydWUsIHRpbWVTY2FsZSA9IDAuMil7XHJcbiAgICAgICAgdGhpcy5wb2tlckxpc3QuZm9yRWFjaCgocG9rZXIsIGkpPT57XHJcbiAgICAgICAgICAgIHBva2VyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChpc0FuaW0pXHJcbiAgICAgICAgICAgICAgICBwb2tlci5kb1Bva2VyTW92ZShjYy5WZWMzLlpFUk8sIGNjLnYzKC10aGlzLnNwYWNlWCArIGkgKiB0aGlzLnNwYWNlWCwgMCksIHRpbWVTY2FsZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHBva2VyLnNldFBva2VyUG9zaXRpb24oY2MudjMoLXRoaXMuc3BhY2VYICsgaSAqIHRoaXMuc3BhY2VYLCAwKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dUaHJlZVBva2VyKGlzRnJvbnQ6IGJvb2xlYW4gPSBmYWxzZSl7XHJcbiAgICAgICAgdGhpcy5wb2tlckxpc3QuZm9yRWFjaChwb2tlcj0+e1xyXG4gICAgICAgICAgICBwb2tlci5pc0Zyb250ID0gaXNGcm9udDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VGhyZWVQb2tlclZhbHVlKGFycjogbnVtYmVyW10pe1xyXG4gICAgICAgIGZvcihsZXQgaT0wOyBpPCAzOyBpKyspe1xyXG4gICAgICAgICAgICBpZiAoYXJyW2ldKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9rZXJMaXN0W2ldLnBva2VyVmFsdWUgPSBhcnJbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOaLvOeahOWtl+S9k+eahOWIhlxyXG4gICAgcHVibGljIHNob3dTY29yZUxibChpc1Nob3c6IGJvb2xlYW4sIHNjb3JlOiBudW1iZXIgPSAwKXtcclxuICAgICAgICB0aGlzLmR6U2NvcmVOb2RlLmFjdGl2ZSA9IGlzU2hvdztcclxuICAgICAgICBpZiAoaXNTaG93KVxyXG4gICAgICAgICAgICB0aGlzLmR6U2NvcmVMYmwuc3RyaW5nID0gc2NvcmUgKyAnRic7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0UG9rZXJzKCl7XHJcbiAgICAgICAgdGhpcy5wb2tlckxpc3QuZm9yRWFjaChwb2tlcj0+e1xyXG4gICAgICAgICAgICBwb2tlci5zZXRQb2tlclBvc2l0aW9uKGNjLlZlYzMuWkVSTyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQnlSb3VuZCgpe1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93U2NvcmVMYmwoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuc2hvd1RocmVlUG9rZXIoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMucmVzZXRQb2tlcnMoKTtcclxuICAgICAgICBEZHpEcml2ZXIuaW5zdGFuY2UuUG9rZXJQb29sLnJlY3ljbGVBbGwodGhpcy5wb2tlckxpc3QpO1xyXG4gICAgICAgIHRoaXMucG9rZXJMaXN0ID0gW107XHJcbiAgICB9XHJcbn0iXX0=