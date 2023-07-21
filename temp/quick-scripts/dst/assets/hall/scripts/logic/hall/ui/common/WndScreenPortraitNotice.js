
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/common/WndScreenPortraitNotice.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7c848Jz981CHLt7xzRr0x2W', 'WndScreenPortraitNotice');
// hall/scripts/logic/hall/ui/common/WndScreenPortraitNotice.ts

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
/**
 * 横竖版转换提示UI
 */
var WndBase_1 = require("../../../core/ui/WndBase");
var WndScreenPortraitNotice = /** @class */ (function (_super) {
    __extends(WndScreenPortraitNotice, _super);
    function WndScreenPortraitNotice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 背景的Sprite */
        _this.bgSprite = null;
        /** 竖屏提示动画 */
        _this.noticeSpine = null;
        /** 动画播放完成后的回调 */
        _this.finishCallBack = null;
        /** 界面显示时长 */
        _this.showTime = 0;
        /** 界面开始显示时间 */
        _this.beginShowTick = 0;
        return _this;
    }
    WndScreenPortraitNotice.prototype.onInit = function () {
        this.name = "WndScreenPortraitNotice";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/ScreenPortraitNoticeUI";
        this.showBg = false;
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndScreenPortraitNotice.prototype.initView = function () {
        this.bgSprite = this.getComponent("bg", cc.Sprite);
        if (this.bgSprite == null) {
            Logger.error("WndScreenPortraitNotice::onInit() this.bgSprite == null");
        }
        this.noticeSpine = this.getComponent("content/spineNode", sp.Skeleton);
        if (this.noticeSpine == null) {
            Logger.error("WndScreenPortraitNotice::onInit() this.noticeSpine == null");
        }
    };
    /**
     * @param {Function} finishCallBack
     * @param {number} showTime
     * @memberof WndScreenPortraitNotice
     */
    WndScreenPortraitNotice.prototype.onOpen = function () {
        var self = this;
        if (this.args == null || this.args.length == 0) {
            Logger.error("WndScreenPortraitNotice::onOpen() 没有设置参数");
            this.close();
            return;
        }
        var finishCallBack = this.args[0];
        if (finishCallBack == null || finishCallBack == "") {
            Logger.error("WndScreenPortraitNotice::onOpen() finishCallBack = null");
            this.close();
            return;
        }
        this.finishCallBack = finishCallBack;
        var showTime = this.args[1];
        showTime = (!showTime || showTime <= 0) ? 0 : showTime;
        showTime = (showTime > 10) ? 10 : showTime;
        this.showTime = showTime;
        // Logger.error("WndScreenPortraitNotice::onOpen() this.showTime = " + this.showTime);
        if (this.showTime > 0 && this.bgSprite) {
            this.beginShowTick = Date.now();
            this.bgSprite.schedule(function () {
                self.checkTimer();
            }, 0.1);
        }
        if (this.noticeSpine) {
            var loop = (this.showTime > 0);
            var animName_1 = "idle";
            this.noticeSpine.clearTrack(0);
            this.noticeSpine.addAnimation(0, animName_1, loop);
            if (!loop) {
                this.noticeSpine.setCompleteListener(function (trackEntry) {
                    var name = trackEntry.animation ? trackEntry.animation.name : '';
                    if (name === animName_1) {
                        if (self.finishCallBack) {
                            self.finishCallBack();
                        }
                        self.close();
                    }
                });
            }
        }
    };
    /** 时间检查 */
    WndScreenPortraitNotice.prototype.checkTimer = function () {
        // Logger.error("WndScreenPortraitNotice::checkTimer() this.showTime = " + this.showTime);
        if ((Date.now() - this.beginShowTick) >= this.showTime * 1000) {
            if (this.finishCallBack) {
                this.finishCallBack();
            }
            this.bgSprite.unscheduleAllCallbacks();
            this.close();
        }
    };
    return WndScreenPortraitNotice;
}(WndBase_1.default));
exports.default = WndScreenPortraitNotice;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxjb21tb25cXFduZFNjcmVlblBvcnRyYWl0Tm90aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsb0RBQWdFO0FBRWhFO0lBQXFELDJDQUFPO0lBQTVEO1FBQUEscUVBMEdDO1FBeEdHLGdCQUFnQjtRQUNSLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFFbEMsYUFBYTtRQUNMLGlCQUFXLEdBQWUsSUFBSSxDQUFDO1FBRXZDLGlCQUFpQjtRQUNULG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRXZDLGFBQWE7UUFDTCxjQUFRLEdBQVUsQ0FBQyxDQUFDO1FBRTVCLGVBQWU7UUFDUCxtQkFBYSxHQUFVLENBQUMsQ0FBQzs7SUEyRnJDLENBQUM7SUF6RmEsd0NBQU0sR0FBaEI7UUFFSSxJQUFJLENBQUMsSUFBSSxHQUFHLHlCQUF5QixDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsd0NBQXdDLENBQUM7UUFDeEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBVyxDQUFDLElBQUksQ0FBQztJQUN4QyxDQUFDO0lBRVMsMENBQVEsR0FBbEI7UUFFSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCxJQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ3RCLE1BQU0sQ0FBQyxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQztTQUMzRTtRQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFD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LElBQUksRUFBRTtZQUN6RCxJQUFHLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN6QjtZQUVELElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBQ0wsOEJBQUM7QUFBRCxDQTFHQSxBQTBHQyxDQTFHb0QsaUJBQU8sR0EwRzNEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOaoquerlueJiOi9rOaNouaPkOekulVJXHJcbiAqL1xyXG5pbXBvcnQgV25kQmFzZSwgeyBEZXN0b3J5VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZFNjcmVlblBvcnRyYWl0Tm90aWNlIGV4dGVuZHMgV25kQmFzZVxyXG57XHJcbiAgICAvKiog6IOM5pmv55qEU3ByaXRlICovXHJcbiAgICBwcml2YXRlIGJnU3ByaXRlOmNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgLyoqIOerluWxj+aPkOekuuWKqOeUuyAqL1xyXG4gICAgcHJpdmF0ZSBub3RpY2VTcGluZTpzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgLyoqIOWKqOeUu+aSreaUvuWujOaIkOWQjueahOWbnuiwgyAqL1xyXG4gICAgcHJpdmF0ZSBmaW5pc2hDYWxsQmFjazpGdW5jdGlvbiA9IG51bGw7XHJcblxyXG4gICAgLyoqIOeVjOmdouaYvuekuuaXtumVvyAqL1xyXG4gICAgcHJpdmF0ZSBzaG93VGltZTpudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKiDnlYzpnaLlvIDlp4vmmL7npLrml7bpl7QgKi9cclxuICAgIHByaXZhdGUgYmVnaW5TaG93VGljazpudW1iZXIgPSAwO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiV25kU2NyZWVuUG9ydHJhaXROb3RpY2VcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gXCJQb3BMYXllclwiO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1NjcmVlblBvcnRyYWl0Tm90aWNlVUlcIjtcclxuICAgICAgICB0aGlzLnNob3dCZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGVzdG9yeVR5cGUgPSBEZXN0b3J5VHlwZS5Ob25lO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5iZ1Nwcml0ZSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiYmdcIiwgY2MuU3ByaXRlKTtcclxuICAgICAgICBpZih0aGlzLmJnU3ByaXRlID09IG51bGwpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiV25kU2NyZWVuUG9ydHJhaXROb3RpY2U6Om9uSW5pdCgpIHRoaXMuYmdTcHJpdGUgPT0gbnVsbFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubm90aWNlU3BpbmUgPSB0aGlzLmdldENvbXBvbmVudChcImNvbnRlbnQvc3BpbmVOb2RlXCIsIHNwLlNrZWxldG9uKTtcclxuICAgICAgICBpZih0aGlzLm5vdGljZVNwaW5lID09IG51bGwpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiV25kU2NyZWVuUG9ydHJhaXROb3RpY2U6Om9uSW5pdCgpIHRoaXMubm90aWNlU3BpbmUgPT0gbnVsbFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmaW5pc2hDYWxsQmFja1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNob3dUaW1lXHJcbiAgICAgKiBAbWVtYmVyb2YgV25kU2NyZWVuUG9ydHJhaXROb3RpY2VcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZih0aGlzLmFyZ3MgPT0gbnVsbCB8fCB0aGlzLmFyZ3MubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiV25kU2NyZWVuUG9ydHJhaXROb3RpY2U6Om9uT3BlbigpIOayoeacieiuvue9ruWPguaVsFwiKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZmluaXNoQ2FsbEJhY2sgPSB0aGlzLmFyZ3NbMF07XHJcbiAgICAgICAgaWYoZmluaXNoQ2FsbEJhY2sgPT0gbnVsbCB8fCBmaW5pc2hDYWxsQmFjayA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIlduZFNjcmVlblBvcnRyYWl0Tm90aWNlOjpvbk9wZW4oKSBmaW5pc2hDYWxsQmFjayA9IG51bGxcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZpbmlzaENhbGxCYWNrID0gZmluaXNoQ2FsbEJhY2s7XHJcblxyXG4gICAgICAgIGxldCBzaG93VGltZSA9IHRoaXMuYXJnc1sxXTtcclxuICAgICAgICBzaG93VGltZSA9ICghc2hvd1RpbWUgfHwgc2hvd1RpbWUgPD0gMCkgPyAwIDogc2hvd1RpbWU7XHJcbiAgICAgICAgc2hvd1RpbWUgPSAoc2hvd1RpbWUgPiAxMCkgPyAxMCA6IHNob3dUaW1lO1xyXG4gICAgICAgIHRoaXMuc2hvd1RpbWUgPSBzaG93VGltZTtcclxuICAgICAgICAvLyBMb2dnZXIuZXJyb3IoXCJXbmRTY3JlZW5Qb3J0cmFpdE5vdGljZTo6b25PcGVuKCkgdGhpcy5zaG93VGltZSA9IFwiICsgdGhpcy5zaG93VGltZSk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc2hvd1RpbWUgPiAwICYmIHRoaXMuYmdTcHJpdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5iZWdpblNob3dUaWNrID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgdGhpcy5iZ1Nwcml0ZS5zY2hlZHVsZSgoKT0+e1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jaGVja1RpbWVyKCk7XHJcbiAgICAgICAgICAgIH0sIDAuMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLm5vdGljZVNwaW5lKSB7XHJcbiAgICAgICAgICAgIGxldCBsb29wID0gKHRoaXMuc2hvd1RpbWUgPiAwKTtcclxuICAgICAgICAgICAgbGV0IGFuaW1OYW1lID0gXCJpZGxlXCI7XHJcbiAgICAgICAgICAgIHRoaXMubm90aWNlU3BpbmUuY2xlYXJUcmFjaygwKTtcclxuICAgICAgICAgICAgdGhpcy5ub3RpY2VTcGluZS5hZGRBbmltYXRpb24oMCwgYW5pbU5hbWUsIGxvb3ApO1xyXG4gICAgICAgICAgICBpZighbG9vcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpY2VTcGluZS5zZXRDb21wbGV0ZUxpc3RlbmVyKCh0cmFja0VudHJ5OmFueSk9PntcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmFtZSA9IHRyYWNrRW50cnkuYW5pbWF0aW9uID8gdHJhY2tFbnRyeS5hbmltYXRpb24ubmFtZSA6ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09PSBhbmltTmFtZSkgeyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZi5maW5pc2hDYWxsQmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5maW5pc2hDYWxsQmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiog5pe26Ze05qOA5p+lICovXHJcbiAgICBwcml2YXRlIGNoZWNrVGltZXIoKSB7XHJcbiAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiV25kU2NyZWVuUG9ydHJhaXROb3RpY2U6OmNoZWNrVGltZXIoKSB0aGlzLnNob3dUaW1lID0gXCIgKyB0aGlzLnNob3dUaW1lKTtcclxuICAgICAgICBpZigoRGF0ZS5ub3coKSAtIHRoaXMuYmVnaW5TaG93VGljaykgPj0gdGhpcy5zaG93VGltZSogMTAwMCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLmZpbmlzaENhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaENhbGxCYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmdTcHJpdGUudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19