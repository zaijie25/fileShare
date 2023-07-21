
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/ScreenShakeAction.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b67b3dWvWpKXI0GLEqNazSe', 'ScreenShakeAction');
// hall/scripts/logic/core/component/ScreenShakeAction.ts

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
var ScreenShakeAction = /** @class */ (function (_super) {
    __extends(ScreenShakeAction, _super);
    function ScreenShakeAction(duration, shakeStrengthX, shakeStrengthY) {
        var _this = _super.call(this) || this;
        // 节点初始位置
        _this.nodeInitialPos = null;
        //X轴抖动幅度
        _this.nodeShakeStrengthX = 0;
        //Y轴抖动幅度
        _this.nodeShakeStrengthY = 0;
        //抖动时间
        _this.duration = 0;
        _this.duration = duration;
        _this.initWithDuration(duration, shakeStrengthX, shakeStrengthY);
        return _this;
    }
    ScreenShakeAction.prototype.initWithDuration = function (duration, shakeStrengthX, shakeStrengthY) {
        _super.prototype.initWithDuration.call(this);
        this.setDuration(duration);
        this.nodeShakeStrengthX = shakeStrengthX;
        this.nodeShakeStrengthY = shakeStrengthY;
    };
    // 获取两个数间的随机值
    ScreenShakeAction.prototype.getRandomStrength = function (min, max) {
        return Math.random() * (max - min + 1) + min;
    };
    ScreenShakeAction.prototype.update = function (dt) {
        var randX = this.getRandomStrength(-this.nodeShakeStrengthX, this.nodeShakeStrengthX) * dt;
        var randY = this.getRandomStrength(-this.nodeShakeStrengthY, this.nodeShakeStrengthY) * dt;
        this.getTarget().setPosition(this.nodeInitialPos.add(cc.v2(randX, randY)));
    };
    ScreenShakeAction.prototype.startWithTarget = function (target) {
        _super.prototype.startWithTarget.call(this, target);
        this.nodeInitialPos = target.getPosition();
    };
    ScreenShakeAction.prototype.stop = function () {
        this.getTarget().setPosition(this.nodeInitialPos);
    };
    return ScreenShakeAction;
}(cc.ActionInterval));
exports.default = ScreenShakeAction;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcU2NyZWVuU2hha2VBY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBK0MscUNBQWlCO0lBUzVELDJCQUFZLFFBQWdCLEVBQUUsY0FBc0IsRUFBRSxjQUFzQjtRQUE1RSxZQUNJLGlCQUFPLFNBR1Y7UUFaRCxTQUFTO1FBQ0Msb0JBQWMsR0FBWSxJQUFJLENBQUM7UUFDekMsUUFBUTtRQUNFLHdCQUFrQixHQUFHLENBQUMsQ0FBQztRQUNqQyxRQUFRO1FBQ0Usd0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLE1BQU07UUFDSSxjQUFRLEdBQUcsQ0FBQyxDQUFDO1FBR25CLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUMsY0FBYyxFQUFDLGNBQWMsQ0FBQyxDQUFDOztJQUNsRSxDQUFDO0lBRVMsNENBQWdCLEdBQTFCLFVBQTJCLFFBQWdCLEVBQUUsY0FBc0IsRUFBRSxjQUFzQjtRQUN2RixpQkFBTSxnQkFBZ0IsV0FBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGNBQWMsQ0FBQztRQUN6QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsY0FBYyxDQUFDO0lBQzdDLENBQUM7SUFFRCxhQUFhO0lBQ0gsNkNBQWlCLEdBQTNCLFVBQTRCLEdBQVcsRUFBRSxHQUFXO1FBQ2hELE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFFLEdBQUcsR0FBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDL0MsQ0FBQztJQUVTLGtDQUFNLEdBQWhCLFVBQWlCLEVBQUU7UUFDZixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzNGLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDM0YsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDN0UsQ0FBQztJQUVELDJDQUFlLEdBQWYsVUFBZ0IsTUFBTTtRQUNsQixpQkFBTSxlQUFlLFlBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELGdDQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQXpDQSxBQXlDQyxDQXpDOEMsRUFBRSxDQUFDLGNBQWMsR0F5Qy9EIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyZWVuU2hha2VBY3Rpb24gZXh0ZW5kcyBjYy5BY3Rpb25JbnRlcnZhbHtcclxuICAgIC8vIOiKgueCueWIneWni+S9jee9rlxyXG4gICAgcHJvdGVjdGVkIG5vZGVJbml0aWFsUG9zOiBjYy5WZWMyID0gbnVsbDtcclxuICAgIC8vWOi9tOaKluWKqOW5heW6plxyXG4gICAgcHJvdGVjdGVkIG5vZGVTaGFrZVN0cmVuZ3RoWCA9IDA7XHJcbiAgICAvL1novbTmipbliqjluYXluqZcclxuICAgIHByb3RlY3RlZCBub2RlU2hha2VTdHJlbmd0aFkgPSAwO1xyXG4gICAgLy/mipbliqjml7bpl7RcclxuICAgIHByb3RlY3RlZCBkdXJhdGlvbiA9IDA7XHJcbiAgICBjb25zdHJ1Y3RvcihkdXJhdGlvbjogbnVtYmVyLCBzaGFrZVN0cmVuZ3RoWDogbnVtYmVyLCBzaGFrZVN0cmVuZ3RoWTogbnVtYmVyKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcclxuICAgICAgICB0aGlzLmluaXRXaXRoRHVyYXRpb24oZHVyYXRpb24sc2hha2VTdHJlbmd0aFgsc2hha2VTdHJlbmd0aFkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0V2l0aER1cmF0aW9uKGR1cmF0aW9uOiBudW1iZXIsIHNoYWtlU3RyZW5ndGhYOiBudW1iZXIsIHNoYWtlU3RyZW5ndGhZOiBudW1iZXIpe1xyXG4gICAgICAgIHN1cGVyLmluaXRXaXRoRHVyYXRpb24oKTtcclxuICAgICAgICB0aGlzLnNldER1cmF0aW9uKGR1cmF0aW9uKTtcclxuICAgICAgICB0aGlzLm5vZGVTaGFrZVN0cmVuZ3RoWCA9IHNoYWtlU3RyZW5ndGhYO1xyXG4gICAgICAgIHRoaXMubm9kZVNoYWtlU3RyZW5ndGhZID0gc2hha2VTdHJlbmd0aFk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W5Lik5Liq5pWw6Ze055qE6ZqP5py65YC8XHJcbiAgICBwcm90ZWN0ZWQgZ2V0UmFuZG9tU3RyZW5ndGgobWluOiBudW1iZXIsIG1heDogbnVtYmVyKXtcclxuICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLW1pbiArMSkgKyBtaW47XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZShkdCl7XHJcbiAgICAgICAgdmFyIHJhbmRYID0gdGhpcy5nZXRSYW5kb21TdHJlbmd0aCgtdGhpcy5ub2RlU2hha2VTdHJlbmd0aFgsIHRoaXMubm9kZVNoYWtlU3RyZW5ndGhYKSAqIGR0O1xyXG4gICAgICAgIHZhciByYW5kWSA9IHRoaXMuZ2V0UmFuZG9tU3RyZW5ndGgoLXRoaXMubm9kZVNoYWtlU3RyZW5ndGhZLCB0aGlzLm5vZGVTaGFrZVN0cmVuZ3RoWSkgKiBkdDtcclxuICAgICAgICB0aGlzLmdldFRhcmdldCgpLnNldFBvc2l0aW9uKHRoaXMubm9kZUluaXRpYWxQb3MuYWRkKGNjLnYyKHJhbmRYLHJhbmRZKSkpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRXaXRoVGFyZ2V0KHRhcmdldCl7XHJcbiAgICAgICAgc3VwZXIuc3RhcnRXaXRoVGFyZ2V0KHRhcmdldCk7XHJcbiAgICAgICAgdGhpcy5ub2RlSW5pdGlhbFBvcyA9IHRhcmdldC5nZXRQb3NpdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3AoKXtcclxuICAgICAgICB0aGlzLmdldFRhcmdldCgpLnNldFBvc2l0aW9uKHRoaXMubm9kZUluaXRpYWxQb3MpO1xyXG4gICAgfVxyXG59Il19