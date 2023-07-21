
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/GameLoadingComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e99afkde1NK24JbKRqNQlDF', 'GameLoadingComp');
// hall/scripts/logic/core/component/GameLoadingComp.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameLoadingComp = /** @class */ (function (_super) {
    __extends(GameLoadingComp, _super);
    function GameLoadingComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.logoSkIdleCount = 1;
        _this.delay = 1;
        return _this;
    }
    GameLoadingComp.prototype.onLoad = function () {
        this.logoSk = cc.find("logoSk", this.node).getComponent(sp.Skeleton);
        this.logoSk.node.active = false;
    };
    GameLoadingComp.prototype.onEnable = function () {
        if (this.logoSkIdleCount <= 0)
            return RangeError("logoSpine 动画数量设定异常");
        this.logoSk.node.active = true;
        this.logoSk.clearTracks();
        if (this.logoSkIdleCount == 1) {
            this.logoSk.setAnimation(0, "animation", true);
        }
        else {
            this.logoSk.setAnimation(0, "animation", false);
            this.logoSk.addAnimation(0, "animation", true, this.delay);
        }
    };
    GameLoadingComp.prototype.onDisable = function () {
        this.logoSk.node.active = false;
        this.logoSk.clearTracks();
    };
    __decorate([
        property({
            type: cc.Integer,
            tooltip: "logoSpine播放动画数量, 1单一循环, 2播放第一个后循环第二个",
            min: 0
        })
    ], GameLoadingComp.prototype, "logoSkIdleCount", void 0);
    __decorate([
        property({
            type: cc.Float,
            visible: function () { return this.logoSkIdleCount >= 2; },
            tooltip: "logoSpine 切换动画延时s",
            min: 0
        })
    ], GameLoadingComp.prototype, "delay", void 0);
    GameLoadingComp = __decorate([
        ccclass
    ], GameLoadingComp);
    return GameLoadingComp;
}(cc.Component));
exports.default = GameLoadingComp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcR2FtZUxvYWRpbmdDb21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDO0lBQTZDLG1DQUFZO0lBQXpEO1FBQUEscUVBdUNDO1FBakNXLHFCQUFlLEdBQVcsQ0FBQyxDQUFDO1FBTzVCLFdBQUssR0FBVyxDQUFDLENBQUM7O0lBMEI5QixDQUFDO0lBdkJhLGdDQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3BDLENBQUM7SUFFUyxrQ0FBUSxHQUFsQjtRQUNJLElBQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDO1lBQ3hCLE9BQU8sVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUE7UUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFCLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLEVBQUM7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNsRDthQUNHO1lBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUQ7SUFDTCxDQUFDO0lBRVMsbUNBQVMsR0FBbkI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQWhDRDtRQUxDLFFBQVEsQ0FBQztZQUNOLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTztZQUNoQixPQUFPLEVBQUUsc0NBQXNDO1lBQy9DLEdBQUcsRUFBRSxDQUFDO1NBQ1QsQ0FBQzs0REFDa0M7SUFPcEM7UUFOQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUs7WUFDZCxPQUFPLGdCQUFHLE9BQU8sSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDO1lBQzNDLE9BQU8sRUFBRSxtQkFBbUI7WUFDNUIsR0FBRyxFQUFFLENBQUM7U0FDVCxDQUFDO2tEQUN3QjtJQWJULGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0F1Q25DO0lBQUQsc0JBQUM7Q0F2Q0QsQUF1Q0MsQ0F2QzRDLEVBQUUsQ0FBQyxTQUFTLEdBdUN4RDtrQkF2Q29CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTG9hZGluZ0NvbXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyLFxyXG4gICAgICAgIHRvb2x0aXA6IFwibG9nb1NwaW5l5pKt5pS+5Yqo55S75pWw6YePLCAx5Y2V5LiA5b6q546vLCAy5pKt5pS+56ys5LiA5Liq5ZCO5b6q546v56ys5LqM5LiqXCIsXHJcbiAgICAgICAgbWluOiAwXHJcbiAgICB9KVxyXG4gICAgcHJpdmF0ZSBsb2dvU2tJZGxlQ291bnQ6IG51bWJlciA9IDE7XHJcbiAgICBAcHJvcGVydHkoe1xyXG4gICAgICAgIHR5cGU6IGNjLkZsb2F0LFxyXG4gICAgICAgIHZpc2libGUoKXtyZXR1cm4gdGhpcy5sb2dvU2tJZGxlQ291bnQgPj0gMn0sXHJcbiAgICAgICAgdG9vbHRpcDogXCJsb2dvU3BpbmUg5YiH5o2i5Yqo55S75bu25pe2c1wiLFxyXG4gICAgICAgIG1pbjogMFxyXG4gICAgfSlcclxuICAgIHByaXZhdGUgZGVsYXk6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIGxvZ29Tazogc3AuU2tlbGV0b247XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpe1xyXG4gICAgICAgIHRoaXMubG9nb1NrID0gY2MuZmluZChcImxvZ29Ta1wiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgdGhpcy5sb2dvU2subm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKXtcclxuICAgICAgICBpZih0aGlzLmxvZ29Ta0lkbGVDb3VudCA8PSAwKVxyXG4gICAgICAgICAgICByZXR1cm4gUmFuZ2VFcnJvcihcImxvZ29TcGluZSDliqjnlLvmlbDph4/orr7lrprlvILluLhcIilcclxuICAgICAgICB0aGlzLmxvZ29Tay5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sb2dvU2suY2xlYXJUcmFja3MoKTtcclxuICAgICAgICBpZiAodGhpcy5sb2dvU2tJZGxlQ291bnQgPT0gMSl7XHJcbiAgICAgICAgICAgIHRoaXMubG9nb1NrLnNldEFuaW1hdGlvbigwLCBcImFuaW1hdGlvblwiLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sb2dvU2suc2V0QW5pbWF0aW9uKDAsIFwiYW5pbWF0aW9uXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5sb2dvU2suYWRkQW5pbWF0aW9uKDAsIFwiYW5pbWF0aW9uXCIsIHRydWUsIHRoaXMuZGVsYXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCl7XHJcbiAgICAgICAgdGhpcy5sb2dvU2subm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxvZ29Tay5jbGVhclRyYWNrcygpO1xyXG4gICAgfVxyXG59Il19