"use strict";
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