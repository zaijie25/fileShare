
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/subView/DdzMatchPlayerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHN1YlZpZXdcXERkek1hdGNoUGxheWVyVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBd0M7QUFDeEMsOERBQXlEO0FBRXpEOztHQUVHO0FBQ0g7SUFBZ0Qsc0NBQVc7SUFNdkQsNEJBQVksSUFBYTtRQUF6QixZQUNJLGlCQUFPLFNBRVY7UUFSTyxjQUFRLEdBQWMsRUFBRSxDQUFDO1FBQ3pCLFdBQUssR0FBVyxHQUFHLENBQUM7UUFNeEIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7SUFDdkIsQ0FBQztJQUVTLHFDQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxPQUFPLEdBQW1CLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLHdCQUFjLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3JDLENBQUM7SUFFUyxtQ0FBTSxHQUFoQjtRQUFBLGlCQUtDO1FBSkcsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7WUFDeEIsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNULElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sc0NBQVMsR0FBaEI7UUFDSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUN0QixFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakQsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbkQsS0FBSyxFQUFFLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRU0sc0NBQVMsR0FBaEI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDdEIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFUyxvQ0FBTyxHQUFqQjtRQUNJLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUVNLHlDQUFZLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVNLDZDQUFnQixHQUF2QixVQUF3QixRQUFnQixFQUFFLFFBQWtCLEVBQUUsTUFBVztRQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0EzREEsQUEyREMsQ0EzRCtDLHFCQUFXLEdBMkQxRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpCYXNlVmlldyBmcm9tIFwiLi9EZHpCYXNlVmlld1wiO1xyXG5pbXBvcnQgRERaVGltZUF1dG9SdW4gZnJvbSBcIi4uL2NvbXBvbmVudC9ERFpUaW1lQXV0b1J1blwiO1xyXG5cclxuLyoqXHJcbiAqIOWMuemFjeWAkuiuoeaXtnZpZXdcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERkek1hdGNoUGxheWVyVmlldyBleHRlbmRzIERkekJhc2VWaWV3IHtcclxuICAgIHByaXZhdGUgc3BvdExpc3Q6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBkZWxheTogbnVtYmVyID0gMC4xO1xyXG4gICAgcHJpdmF0ZSBpbnRlcnZhbDogTm9kZUpTLlRpbWVvdXQ7XHJcbiAgICBwcml2YXRlIHRpbWVSdW46IEREWlRpbWVBdXRvUnVuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5zcG90TGlzdCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDk7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2V0Q2hpbGQoJ2FjdGlvbi8nICsgaS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgdGhpcy5zcG90TGlzdC5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZVJ1biA9IDxERFpUaW1lQXV0b1J1bj50aGlzLmdldENvbXBvbmVudCgndGltZUxibCcsIEREWlRpbWVBdXRvUnVuKTtcclxuICAgICAgICB0aGlzLnRpbWVSdW4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCkge1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRBbmltKCk7XHJcbiAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgdGhpcy5zdGFydEFuaW0oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhcnRBbmltKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMuc3BvdExpc3QubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCB0d2VlbiA9IEdhbWUuVHdlZW4uZ2V0KHRoaXMuc3BvdExpc3RbaV0pO1xyXG4gICAgICAgICAgICB0d2Vlbi5kZWxheShpICogdGhpcy5kZWxheSlcclxuICAgICAgICAgICAgICAgIC5ieSgwLjIsIHsgcG9zaXRpb246IGNjLnYyKDAsIDEwKSB9LCBjYy5lYXNlSW4oMSkpXHJcbiAgICAgICAgICAgICAgICAuYnkoMC4yLCB7IHBvc2l0aW9uOiBjYy52MigwLCAtMTApIH0sIGNjLmVhc2VPdXQoMSkpXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0QW5pbSgpIHtcclxuICAgICAgICB0aGlzLnNwb3RMaXN0LmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgICAgIG5vZGUueSA9IDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgICAgICB0aGlzLnJlc2V0QW5pbSgpO1xyXG4gICAgICAgIHRoaXMudGltZVJ1bi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5Um91bmQoKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VGltZVJ1bkNvbmZpZyhsZWZ0VGltZTogbnVtYmVyLCBjYWxsYmFjazogRnVuY3Rpb24sIHRhcmdldDogYW55KSB7XHJcbiAgICAgICAgdGhpcy50aW1lUnVuLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRpbWVSdW4uc2V0VGltZXIobGVmdFRpbWUsIGNhbGxiYWNrLCB0YXJnZXQpO1xyXG4gICAgfVxyXG59Il19