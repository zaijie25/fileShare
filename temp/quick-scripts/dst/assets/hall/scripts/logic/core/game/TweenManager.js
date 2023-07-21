
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/TweenManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a1628sWAJdJB4kPwp0B9tmP', 'TweenManager');
// hall/scripts/logic/core/game/TweenManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var YXTween_1 = require("./YXTween");
var TweenManager = /** @class */ (function () {
    function TweenManager() {
        this.tweenList = [];
        this.time = 0;
    }
    TweenManager.prototype.setup = function () {
        this.actionMgr = new cc.ActionManager();
        cc.director.getScheduler().scheduleUpdate(this.actionMgr, cc.Scheduler.PRIORITY_SYSTEM, false);
    };
    TweenManager.prototype.get = function (target) {
        if (!target || !target.isValid) {
            Logger.error("TweenManager  target is !isValid!!!!!");
            return;
        }
        var tween = new YXTween_1.YXTween();
        tween.target(target);
        //this.tweenList.push({tween:tween, time:Date.now()});
        return tween;
    };
    TweenManager.prototype.clear = function () {
        this.actionMgr.removeAllActions();
        // for(let i = 0 ; i < this.tweenList.length; i++)
        // {
        //     if(this.tweenList[i] != null && this.tweenList[i].tween != null)
        //         this.tweenList[i].tween.stop();
        // }
        // this.tweenList = [];
        // this.time = 0;
    };
    TweenManager.prototype.onUpdate = function (dt) {
        // this.time += dt;
        // //每30秒检查一次    存在60秒 则移除
        // if(this.time >= 10)        
        // {
        //     for(let i = this.tweenList.length - 1; i >= 0; i--)
        //     {
        //         if(this.tweenList[i] == null || this.tweenList[i].tween == null || Date.now() - this.tweenList[i].time > 10000)
        //         {
        //             if(this.tweenList[i] == null && this.tweenList[i].tween)
        //             {
        //                 this.tweenList[i].tween.stop();
        //             }
        //             this.tweenList.splice(i, 1);
        //         }
        //     }
        // }
    };
    return TweenManager;
}());
exports.default = TweenManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXFR3ZWVuTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFvQztBQUVwQztJQUFBO1FBRVcsY0FBUyxHQUFPLEVBQUUsQ0FBQztRQUVsQixTQUFJLEdBQUcsQ0FBQyxDQUFDO0lBeURyQixDQUFDO0lBckRVLDRCQUFLLEdBQVo7UUFFSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3hDLEVBQUUsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDbEcsQ0FBQztJQUVNLDBCQUFHLEdBQVYsVUFBVyxNQUFlO1FBRXRCLElBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUM3QjtZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtZQUNyRCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUMxQixLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLHNEQUFzRDtRQUN0RCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBR00sNEJBQUssR0FBWjtRQUVJLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNsQyxrREFBa0Q7UUFDbEQsSUFBSTtRQUNKLHVFQUF1RTtRQUN2RSwwQ0FBMEM7UUFDMUMsSUFBSTtRQUNKLHVCQUF1QjtRQUN2QixpQkFBaUI7SUFDckIsQ0FBQztJQUVNLCtCQUFRLEdBQWYsVUFBZ0IsRUFBRTtRQUVkLG1CQUFtQjtRQUNuQiwwQkFBMEI7UUFDMUIsOEJBQThCO1FBQzlCLElBQUk7UUFDSiwwREFBMEQ7UUFDMUQsUUFBUTtRQUNSLDBIQUEwSDtRQUMxSCxZQUFZO1FBQ1osdUVBQXVFO1FBQ3ZFLGdCQUFnQjtRQUNoQixrREFBa0Q7UUFDbEQsZ0JBQWdCO1FBQ2hCLDJDQUEyQztRQUMzQyxZQUFZO1FBQ1osUUFBUTtRQUNSLElBQUk7SUFDUixDQUFDO0lBR0wsbUJBQUM7QUFBRCxDQTdEQSxBQTZEQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgWVhUd2VlbiB9IGZyb20gXCIuL1lYVHdlZW5cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR3ZWVuTWFuYWdlclxyXG57XHJcbiAgICBwdWJsaWMgdHdlZW5MaXN0OmFueSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgdGltZSA9IDA7XHJcblxyXG4gICAgcHVibGljIGFjdGlvbk1ncjpjYy5BY3Rpb25NYW5hZ2VyO1xyXG5cclxuICAgIHB1YmxpYyBzZXR1cCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25NZ3IgPSBuZXcgY2MuQWN0aW9uTWFuYWdlcigpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnNjaGVkdWxlVXBkYXRlKHRoaXMuYWN0aW9uTWdyLCBjYy5TY2hlZHVsZXIuUFJJT1JJVFlfU1lTVEVNLCBmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0KHRhcmdldD86Y2MuTm9kZSk6IGNjLlR3ZWVuXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRhcmdldCB8fCAhdGFyZ2V0LmlzVmFsaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJUd2Vlbk1hbmFnZXIgIHRhcmdldCBpcyAhaXNWYWxpZCEhISEhXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHR3ZWVuID0gbmV3IFlYVHdlZW4oKTtcclxuICAgICAgICB0d2Vlbi50YXJnZXQodGFyZ2V0KTtcclxuICAgICAgICAvL3RoaXMudHdlZW5MaXN0LnB1c2goe3R3ZWVuOnR3ZWVuLCB0aW1lOkRhdGUubm93KCl9KTtcclxuICAgICAgICByZXR1cm4gdHdlZW47XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25NZ3IucmVtb3ZlQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIC8vIGZvcihsZXQgaSA9IDAgOyBpIDwgdGhpcy50d2Vlbkxpc3QubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBpZih0aGlzLnR3ZWVuTGlzdFtpXSAhPSBudWxsICYmIHRoaXMudHdlZW5MaXN0W2ldLnR3ZWVuICE9IG51bGwpXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnR3ZWVuTGlzdFtpXS50d2Vlbi5zdG9wKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHRoaXMudHdlZW5MaXN0ID0gW107XHJcbiAgICAgICAgLy8gdGhpcy50aW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25VcGRhdGUoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgLy8gdGhpcy50aW1lICs9IGR0O1xyXG4gICAgICAgIC8vIC8v5q+PMzDnp5Lmo4Dmn6XkuIDmrKEgICAg5a2Y5ZyoNjDnp5Ig5YiZ56e76ZmkXHJcbiAgICAgICAgLy8gaWYodGhpcy50aW1lID49IDEwKSAgICAgICAgXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBmb3IobGV0IGkgPSB0aGlzLnR3ZWVuTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSlcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgaWYodGhpcy50d2Vlbkxpc3RbaV0gPT0gbnVsbCB8fCB0aGlzLnR3ZWVuTGlzdFtpXS50d2VlbiA9PSBudWxsIHx8IERhdGUubm93KCkgLSB0aGlzLnR3ZWVuTGlzdFtpXS50aW1lID4gMTAwMDApXHJcbiAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYodGhpcy50d2Vlbkxpc3RbaV0gPT0gbnVsbCAmJiB0aGlzLnR3ZWVuTGlzdFtpXS50d2VlbilcclxuICAgICAgICAvLyAgICAgICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHRoaXMudHdlZW5MaXN0W2ldLnR3ZWVuLnN0b3AoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy50d2Vlbkxpc3Quc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuXHJcbn0iXX0=