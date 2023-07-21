
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/ComponentProvider.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4daa9buNeVF+7qA/3ObyDD2', 'ComponentProvider');
// hall/scripts/logic/core/component/ComponentProvider.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameTimeChecker_1 = require("../game/GameTimeChecker");
//驱动脚本管理器  提供timer  tween等操作
var ComponentProvider = /** @class */ (function () {
    function ComponentProvider(name) {
        this.hasInit = false;
        //下一帧执行回调
        this.callLaterList = [];
        //帧结束
        this.frameEndList = [];
        this.name = name;
        cc.director.on(cc.Director.EVENT_AFTER_UPDATE, this.onFrameEnd, this);
    }
    ComponentProvider.prototype.setup = function (updateFunc, lateUpdateFunc) {
        this.updateFunc = updateFunc;
        this.lateUpdateFunc = lateUpdateFunc;
    };
    ComponentProvider.prototype.initDriver = function () {
        this.clear();
        var canvas = cc.find("Canvas");
        if (canvas == null) {
            Logger.error("找不到Canvas");
            return;
        }
        this.driverNode = canvas.getChildByName(this.name);
        if (this.driverNode == null) {
            this.driverNode = new cc.Node(this.name);
            canvas.addChild(this.driverNode);
        }
        this.driverComponent = this.driverNode.getComponent("DriverComponent");
        if (this.driverComponent == null)
            this.driverComponent = this.driverNode.addComponent("DriverComponent");
        this.driverComponent.onLoadFunc = this.onLoad.bind(this);
        this.driverComponent.updateFunc = this.onUpdate.bind(this);
        this.driverComponent.lateUpdateFunc = this.onLateUpdate.bind(this);
        this.hasInit = true;
        this.timeChecker = Global.UIHelper.safeGetComponent(this.driverNode, "", GameTimeChecker_1.default);
    };
    ComponentProvider.prototype.clear = function () {
        this.driverComponent = null;
        this.driverNode = null;
        this.hasInit = null;
        this.stopChecker();
        this.timeChecker = null;
    };
    ComponentProvider.prototype.onLoad = function () {
    };
    ComponentProvider.prototype.onFrameEnd = function () {
        for (var i = 0; i < this.frameEndList.length; i++) {
            this.frameEndList[i]();
        }
        this.frameEndList = [];
    };
    ComponentProvider.prototype.onUpdate = function (dt) {
        if (this.updateFunc)
            this.updateFunc(dt);
    };
    ComponentProvider.prototype.onLateUpdate = function () {
        if (this.lateUpdateFunc)
            this.lateUpdateFunc();
        for (var i = 0; i < this.callLaterList.length; i++) {
            this.callLaterList[i]();
        }
        this.callLaterList.length = 0;
    };
    //存在问题  this指向的是component  需要bind
    ComponentProvider.prototype.schedule = function (callback, interval, repeat, delay) {
        if (!this.hasInit || this.driverComponent == null) {
            Logger.error("Driver 还未初始化");
            return;
        }
        this.driverComponent.schedule(callback, interval, repeat, delay);
    };
    ComponentProvider.prototype.scheduleOnce = function (callback, delay) {
        if (!this.hasInit || this.driverComponent == null) {
            Logger.error("Driver 还未初始化");
            return;
        }
        this.driverComponent.scheduleOnce(callback, delay);
    };
    ComponentProvider.prototype.unschedule = function (callback) {
        if (!this.hasInit || this.driverComponent == null) {
            return;
        }
        this.driverComponent.unschedule(callback);
    };
    ComponentProvider.prototype.unscheduleAllCallbacks = function () {
        if (!this.hasInit || this.driverComponent == null) {
            return;
        }
        this.driverComponent.unscheduleAllCallbacks();
        this.callLaterList.length = 0;
        this.frameEndList.length = 0;
    };
    ComponentProvider.prototype.callLater = function (func) {
        this.callLaterList.push(func);
    };
    ComponentProvider.prototype.frameEnd = function (func) {
        this.frameEndList.push(func);
    };
    ComponentProvider.prototype.doChecker = function (time) {
        if (!this.timeChecker) {
            return;
        }
        this.timeChecker.checkTimestamp(time);
    };
    ComponentProvider.prototype.stopChecker = function () {
        if (!this.timeChecker) {
            return;
        }
        this.timeChecker.stopTimer();
    };
    /** 得到协议当前时间传输时延 单位ms */
    ComponentProvider.prototype.correctTime = function (time) {
        if (!this.timeChecker) {
            return 0;
        }
        return this.timeChecker.correctTime(time);
    };
    return ComponentProvider;
}());
exports.default = ComponentProvider;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcQ29tcG9uZW50UHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyREFBc0Q7QUFFdEQsNEJBQTRCO0FBQzVCO0lBaUJJLDJCQUFZLElBQVc7UUFaZixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBSXhCLFNBQVM7UUFDRixrQkFBYSxHQUFHLEVBQUUsQ0FBQTtRQUV6QixLQUFLO1FBQ0UsaUJBQVksR0FBRyxFQUFFLENBQUE7UUFNcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3pFLENBQUM7SUFFTSxpQ0FBSyxHQUFaLFVBQWEsVUFBVSxFQUFFLGNBQWM7UUFFbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztJQUVNLHNDQUFVLEdBQWpCO1FBRUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQixJQUFHLE1BQU0sSUFBSSxJQUFJLEVBQ2pCO1lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQzFCO1lBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENB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SSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLHVDQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUM7WUFDbEIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsd0JBQXdCO0lBQ2pCLHVDQUFXLEdBQWxCLFVBQW1CLElBQVk7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUM7WUFDbEIsT0FBTyxDQUFDLENBQUM7U0FDWjtRQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0EzS0EsQUEyS0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEcml2ZXJDb21wb25lbnQgZnJvbSBcIi4vRHJpdmVyQ29tcG9uZW50XCI7XHJcbmltcG9ydCBHYW1lVGltZUNoZWNrZXIgZnJvbSBcIi4uL2dhbWUvR2FtZVRpbWVDaGVja2VyXCI7XHJcblxyXG4vL+mpseWKqOiEmuacrOeuoeeQhuWZqCAg5o+Q5L6bdGltZXIgIHR3ZWVu562J5pON5L2cXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvbmVudFByb3ZpZGVyXHJcbntcclxuICAgIHByaXZhdGUgZHJpdmVyQ29tcG9uZW50OkRyaXZlckNvbXBvbmVudDtcclxuICAgIHByaXZhdGUgZHJpdmVyTm9kZTpjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBuYW1lOnN0cmluZztcclxuICAgIHByaXZhdGUgaGFzSW5pdCA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVGdW5jOkZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBsYXRlVXBkYXRlRnVuYzpGdW5jdGlvbjtcclxuXHJcbiAgICAvL+S4i+S4gOW4p+aJp+ihjOWbnuiwg1xyXG4gICAgcHVibGljIGNhbGxMYXRlckxpc3QgPSBbXVxyXG5cclxuICAgIC8v5bin57uT5p2fXHJcbiAgICBwdWJsaWMgZnJhbWVFbmRMaXN0ID0gW11cclxuXHJcbiAgICBwcml2YXRlIHRpbWVDaGVja2VyOiBHYW1lVGltZUNoZWNrZXI7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgY2MuZGlyZWN0b3Iub24oY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfVVBEQVRFLCB0aGlzLm9uRnJhbWVFbmQsIHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldHVwKHVwZGF0ZUZ1bmMsIGxhdGVVcGRhdGVGdW5jKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRnVuYyA9IHVwZGF0ZUZ1bmM7XHJcbiAgICAgICAgdGhpcy5sYXRlVXBkYXRlRnVuYyA9IGxhdGVVcGRhdGVGdW5jO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0RHJpdmVyKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IGNjLmZpbmQoXCJDYW52YXNcIik7XHJcbiAgICAgICAgaWYoY2FudmFzID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmib7kuI3liLBDYW52YXNcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kcml2ZXJOb2RlID0gY2FudmFzLmdldENoaWxkQnlOYW1lKHRoaXMubmFtZSk7XHJcbiAgICAgICAgaWYodGhpcy5kcml2ZXJOb2RlID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmRyaXZlck5vZGUgPSBuZXcgY2MuTm9kZSh0aGlzLm5hbWUpO1xyXG4gICAgICAgICAgICBjYW52YXMuYWRkQ2hpbGQodGhpcy5kcml2ZXJOb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kcml2ZXJDb21wb25lbnQgPSB0aGlzLmRyaXZlck5vZGUuZ2V0Q29tcG9uZW50KFwiRHJpdmVyQ29tcG9uZW50XCIpO1xyXG4gICAgICAgIGlmKHRoaXMuZHJpdmVyQ29tcG9uZW50ID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuZHJpdmVyQ29tcG9uZW50ID0gdGhpcy5kcml2ZXJOb2RlLmFkZENvbXBvbmVudChcIkRyaXZlckNvbXBvbmVudFwiKTtcclxuICAgICAgICB0aGlzLmRyaXZlckNvbXBvbmVudC5vbkxvYWRGdW5jID0gdGhpcy5vbkxvYWQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmRyaXZlckNvbXBvbmVudC51cGRhdGVGdW5jID0gdGhpcy5vblVwZGF0ZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZHJpdmVyQ29tcG9uZW50LmxhdGVVcGRhdGVGdW5jID0gdGhpcy5vbkxhdGVVcGRhdGUuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhc0luaXQgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnRpbWVDaGVja2VyID0gR2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQodGhpcy5kcml2ZXJOb2RlLCBcIlwiLCBHYW1lVGltZUNoZWNrZXIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY2xlYXIoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZHJpdmVyQ29tcG9uZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmRyaXZlck5vZGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaGFzSW5pdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdG9wQ2hlY2tlcigpO1xyXG4gICAgICAgIHRoaXMudGltZUNoZWNrZXIgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uRnJhbWVFbmQoKVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmZyYW1lRW5kTGlzdC5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhbWVFbmRMaXN0W2ldKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJhbWVFbmRMaXN0ID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnVwZGF0ZUZ1bmMpXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRnVuYyhkdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkxhdGVVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMubGF0ZVVwZGF0ZUZ1bmMpXHJcbiAgICAgICAgICAgIHRoaXMubGF0ZVVwZGF0ZUZ1bmMoKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jYWxsTGF0ZXJMaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsTGF0ZXJMaXN0W2ldKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsbExhdGVyTGlzdC5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+WtmOWcqOmXrumimCAgdGhpc+aMh+WQkeeahOaYr2NvbXBvbmVudCAg6ZyA6KaBYmluZFxyXG4gICAgcHVibGljIHNjaGVkdWxlKGNhbGxiYWNrOkZ1bmN0aW9uLCBpbnRlcnZhbD86bnVtYmVyLCByZXBlYXQ/Om51bWJlciwgZGVsYXk/Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5oYXNJbml0IHx8IHRoaXMuZHJpdmVyQ29tcG9uZW50ID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJEcml2ZXIg6L+Y5pyq5Yid5aeL5YyWXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZHJpdmVyQ29tcG9uZW50LnNjaGVkdWxlKGNhbGxiYWNrLCBpbnRlcnZhbCwgcmVwZWF0LCBkZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNjaGVkdWxlT25jZShjYWxsYmFjazpGdW5jdGlvbiwgZGVsYXk/Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5oYXNJbml0IHx8IHRoaXMuZHJpdmVyQ29tcG9uZW50ID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJEcml2ZXIg6L+Y5pyq5Yid5aeL5YyWXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZHJpdmVyQ29tcG9uZW50LnNjaGVkdWxlT25jZShjYWxsYmFjaywgZGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bnNjaGVkdWxlKGNhbGxiYWNrOkZ1bmN0aW9uKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLmhhc0luaXQgfHwgdGhpcy5kcml2ZXJDb21wb25lbnQgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kcml2ZXJDb21wb25lbnQudW5zY2hlZHVsZShjYWxsYmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLmhhc0luaXQgfHwgdGhpcy5kcml2ZXJDb21wb25lbnQgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kcml2ZXJDb21wb25lbnQudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIHRoaXMuY2FsbExhdGVyTGlzdC5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuZnJhbWVFbmRMaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjYWxsTGF0ZXIoZnVuYylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNhbGxMYXRlckxpc3QucHVzaChmdW5jKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZnJhbWVFbmQoZnVuYylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmZyYW1lRW5kTGlzdC5wdXNoKGZ1bmMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkb0NoZWNrZXIodGltZTogbnVtYmVyKXtcclxuICAgICAgICBpZiAoIXRoaXMudGltZUNoZWNrZXIpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZUNoZWNrZXIuY2hlY2tUaW1lc3RhbXAodGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0b3BDaGVja2VyKCl7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRpbWVDaGVja2VyKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpbWVDaGVja2VyLnN0b3BUaW1lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlvpfliLDljY/orq7lvZPliY3ml7bpl7TkvKDovpPml7blu7Yg5Y2V5L2NbXMgKi9cclxuICAgIHB1YmxpYyBjb3JyZWN0VGltZSh0aW1lOiBudW1iZXIpe1xyXG4gICAgICAgIGlmICghdGhpcy50aW1lQ2hlY2tlcil7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy50aW1lQ2hlY2tlci5jb3JyZWN0VGltZSh0aW1lKTtcclxuICAgIH1cclxufSJdfQ==