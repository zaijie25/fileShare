
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/TextRollSceen.ts.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0cb46Ui9gJB3aQM+NwwoRAX', 'TextRollSceen.ts');
// hall/scripts/logic/core/component/TextRollSceen.ts.ts

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
var TextRollSceen = /** @class */ (function (_super) {
    __extends(TextRollSceen, _super);
    function TextRollSceen() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showOrderArr = [];
        _this.index = 0;
        _this.timeInterval = 6;
        _this.changeTime = 1;
        return _this;
    }
    TextRollSceen.prototype.onLoad = function () {
        this.showText = cc.find("txt", this.node).getComponent(cc.Label);
    };
    // 有需求再优化通用
    TextRollSceen.prototype.start = function () {
        if (window["Global"] == null) {
            Logger.error("global is null");
            return;
        }
        if (Global.Setting.SkinConfig && Global.Setting.SkinConfig.loadedFinish)
            this.startRun();
        else
            Global.Event.once(GlobalEvent.SkinConfigLoadFinish, this, this.startRun);
    };
    TextRollSceen.prototype.startRun = function () {
        this.showOrderArr = Global.Toolkit.getOutOrderArray(Global.Setting.SkinConfig.loadingTips);
        this.setShowText(this.showOrderArr[this.index]);
        this.schedule(this.onTimerUpdate, this.timeInterval);
    };
    TextRollSceen.prototype.setShowText = function (str) {
        var _this = this;
        if (str === void 0) { str = ''; }
        if (this.showText == null)
            return;
        this.showText.string = str;
        this.scheduleOnce(function () {
            if (_this.node.isValid)
                _this.node.width = _this.showText.node.width + 200;
        }, 0);
        // let len = Global.Toolkit.getTotalBytes(str);
        // this.node.width = len * 15 + 80;
    };
    TextRollSceen.prototype.onTimerUpdate = function () {
        var _this = this;
        this.index++;
        var fadeOutAc = cc.fadeTo(this.changeTime / 2, 30);
        var funcAc = cc.callFunc(function () {
            _this.setShowText(_this.showOrderArr[_this.index]);
        }, this);
        var fadeInAc = cc.fadeTo(this.changeTime / 2, 255);
        this.node.runAction(cc.sequence(fadeOutAc, funcAc, fadeInAc));
        if (this.index == this.showOrderArr.length - 1) {
            this.index = 0;
        }
    };
    TextRollSceen.prototype.onDestroy = function () {
        this.node.stopAllActions();
        this.unschedule(this.onTimerUpdate);
    };
    TextRollSceen = __decorate([
        ccclass
    ], TextRollSceen);
    return TextRollSceen;
}(cc.Component));
exports.default = TextRollSceen;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcVGV4dFJvbGxTY2Vlbi50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTSxJQUFBLEtBQXNCLEVBQUUsQ0FBQyxVQUFVLEVBQWxDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBaUIsQ0FBQztBQUcxQztJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQTZEQztRQTNEVyxrQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUNsQixXQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1Ysa0JBQVksR0FBRyxDQUFDLENBQUM7UUFDakIsZ0JBQVUsR0FBRyxDQUFDLENBQUM7O0lBd0QzQixDQUFDO0lBdERHLDhCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxXQUFXO0lBQ1gsNkJBQUssR0FBTDtRQUNJLElBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFDM0I7WUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUE7WUFDOUIsT0FBTztTQUNWO1FBQ0QsSUFBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxZQUFZO1lBQ2xFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7WUFFaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDaEYsQ0FBQztJQUdPLGdDQUFRLEdBQWhCO1FBRUksSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTyxtQ0FBVyxHQUFuQixVQUFvQixHQUFnQjtRQUFwQyxpQkFVQztRQVZtQixvQkFBQSxFQUFBLFFBQWdCO1FBQ2hDLElBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJO1lBQ3BCLE9BQU87UUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLElBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPO2dCQUNoQixLQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ3pELENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNMLCtDQUErQztRQUMvQyxtQ0FBbUM7SUFDdkMsQ0FBQztJQUVPLHFDQUFhLEdBQXJCO1FBQUEsaUJBV0M7UUFWRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDYixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDckIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3BELENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNULElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQztZQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNsQjtJQUNMLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBNURnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBNkRqQztJQUFELG9CQUFDO0NBN0RELEFBNkRDLENBN0QwQyxFQUFFLENBQUMsU0FBUyxHQTZEdEQ7a0JBN0RvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0Um9sbFNjZWVuIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIHByaXZhdGUgc2hvd1RleHQ6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBzaG93T3JkZXJBcnIgPSBbXTtcclxuICAgIHByaXZhdGUgaW5kZXggPSAwO1xyXG4gICAgcHJpdmF0ZSB0aW1lSW50ZXJ2YWwgPSA2O1xyXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaW1lID0gMTtcclxuXHJcbiAgICBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLnNob3dUZXh0ID0gY2MuZmluZChcInR4dFwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5pyJ6ZyA5rGC5YaN5LyY5YyW6YCa55SoXHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIGlmKHdpbmRvd1tcIkdsb2JhbFwiXSA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZ2xvYmFsIGlzIG51bGxcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnICYmIEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcubG9hZGVkRmluaXNoKVxyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0UnVuKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQub25jZShHbG9iYWxFdmVudC5Ta2luQ29uZmlnTG9hZEZpbmlzaCwgdGhpcywgdGhpcy5zdGFydFJ1bilcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzdGFydFJ1bigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zaG93T3JkZXJBcnIgPSBHbG9iYWwuVG9vbGtpdC5nZXRPdXRPcmRlckFycmF5KEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcubG9hZGluZ1RpcHMpO1xyXG4gICAgICAgIHRoaXMuc2V0U2hvd1RleHQodGhpcy5zaG93T3JkZXJBcnJbdGhpcy5pbmRleF0pO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5vblRpbWVyVXBkYXRlLCB0aGlzLnRpbWVJbnRlcnZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTaG93VGV4dChzdHI6IHN0cmluZyA9ICcnKXtcclxuICAgICAgICBpZih0aGlzLnNob3dUZXh0ID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnNob3dUZXh0LnN0cmluZyA9IHN0cjtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKT0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGUuaXNWYWxpZClcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS53aWR0aCA9IHRoaXMuc2hvd1RleHQubm9kZS53aWR0aCArIDIwMDtcclxuICAgICAgICB9LCAwKVxyXG4gICAgICAgIC8vIGxldCBsZW4gPSBHbG9iYWwuVG9vbGtpdC5nZXRUb3RhbEJ5dGVzKHN0cik7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLndpZHRoID0gbGVuICogMTUgKyA4MDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVGltZXJVcGRhdGUoKXtcclxuICAgICAgICB0aGlzLmluZGV4Kys7XHJcbiAgICAgICAgbGV0IGZhZGVPdXRBYyA9IGNjLmZhZGVUbyh0aGlzLmNoYW5nZVRpbWUgLyAyLCAzMCk7XHJcbiAgICAgICAgbGV0IGZ1bmNBYyA9IGNjLmNhbGxGdW5jKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2hvd1RleHQodGhpcy5zaG93T3JkZXJBcnJbdGhpcy5pbmRleF0pO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIGxldCBmYWRlSW5BYyA9IGNjLmZhZGVUbyh0aGlzLmNoYW5nZVRpbWUgLyAyLCAyNTUpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoZmFkZU91dEFjLCBmdW5jQWMsIGZhZGVJbkFjKSk7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggPT0gdGhpcy5zaG93T3JkZXJBcnIubGVuZ3RoLTEpe1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMub25UaW1lclVwZGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuIl19