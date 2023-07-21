
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/ErmjMatchPlayerView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1d7c93ReARGp4aMgfBbVANb', 'ErmjMatchPlayerView');
// ermj/Ermj/scripts/subView/ErmjMatchPlayerView.ts

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
var ErmjBaseView_1 = require("./ErmjBaseView");
var ErmjTimeAutoRun_1 = require("../component/ErmjTimeAutoRun");
var ErmjMatchPlayerView = /** @class */ (function (_super) {
    __extends(ErmjMatchPlayerView, _super);
    function ErmjMatchPlayerView(node) {
        var _this = _super.call(this) || this;
        _this.dotList = [];
        _this.curDotIndex = 0;
        _this.setNode(node);
        return _this;
    }
    ErmjMatchPlayerView.prototype.initView = function () {
        this.timeRun = Global.UIHelper.safeGetComponent(this.getChild('content/timeLbl'), "", ErmjTimeAutoRun_1.default);
        this.timeRun.node.active = false;
        this.dotList = [];
        for (var i = 0; i < 3; i++) {
            var node = this.getChild("content/action/dot" + i.toString());
            this.dotList.push(node);
            node.active = false;
        }
    };
    ErmjMatchPlayerView.prototype.onOpen = function () {
        var _this = this;
        this.interval = setInterval(function () {
            _this.startAnim();
        }, 400);
        this.resetAnim();
        this.startAnim();
    };
    ErmjMatchPlayerView.prototype.startAnim = function () {
        if (this.curDotIndex >= this.dotList.length) {
            this.resetAnim();
        }
        else {
            this.dotList[this.curDotIndex].active = true;
            this.curDotIndex++;
        }
    };
    ErmjMatchPlayerView.prototype.resetAnim = function () {
        this.curDotIndex = 0;
        this.dotList.forEach(function (node) {
            node.active = false;
        });
    };
    ErmjMatchPlayerView.prototype.setTimeRunConfig = function (leftTime, callback, target) {
        this.timeRun.node.active = true;
        this.timeRun.setTimer(leftTime, callback, target);
    };
    ErmjMatchPlayerView.prototype.clearByRound = function () {
        this.active = false;
    };
    ErmjMatchPlayerView.prototype.onClose = function () {
        clearInterval(this.interval);
        this.resetAnim();
        this.timeRun.node.active = false;
    };
    return ErmjMatchPlayerView;
}(ErmjBaseView_1.default));
exports.default = ErmjMatchPlayerView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcRXJtak1hdGNoUGxheWVyVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMEM7QUFDMUMsZ0VBQTJEO0FBRTNEO0lBQWlELHVDQUFZO0lBTXpELDZCQUFZLElBQWE7UUFBekIsWUFDSSxpQkFBTyxTQUVWO1FBUE8sYUFBTyxHQUFjLEVBQUUsQ0FBQztRQUV4QixpQkFBVyxHQUFHLENBQUMsQ0FBQztRQUlwQixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRVMsc0NBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSx5QkFBZSxDQUFDLENBQUM7UUFDdkcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ3RCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRVMsb0NBQU0sR0FBaEI7UUFBQSxpQkFNQztRQUxHLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDUixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTyx1Q0FBUyxHQUFqQjtRQUNJLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEI7YUFDRztZQUNBLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDN0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUVPLHVDQUFTLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLDhDQUFnQixHQUF2QixVQUF3QixRQUFnQixFQUFFLFFBQWtCLEVBQUUsTUFBVztRQUNyRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVNLDBDQUFZLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUVTLHFDQUFPLEdBQWpCO1FBQ0ksYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNyQyxDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQTdEQSxBQTZEQyxDQTdEZ0Qsc0JBQVksR0E2RDVEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVybWpCYXNlVmlldyBmcm9tIFwiLi9Fcm1qQmFzZVZpZXdcIjtcclxuaW1wb3J0IEVybWpUaW1lQXV0b1J1biBmcm9tIFwiLi4vY29tcG9uZW50L0VybWpUaW1lQXV0b1J1blwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtak1hdGNoUGxheWVyVmlldyBleHRlbmRzIEVybWpCYXNlVmlld3tcclxuICAgIHByaXZhdGUgdGltZVJ1bjogRXJtalRpbWVBdXRvUnVuO1xyXG4gICAgcHJpdmF0ZSBkb3RMaXN0OiBjYy5Ob2RlW10gPSBbXTtcclxuICAgIHByaXZhdGUgaW50ZXJ2YWw6IE5vZGVKUy5UaW1lb3V0O1xyXG4gICAgcHJpdmF0ZSBjdXJEb3RJbmRleCA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy50aW1lUnVuID0gR2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQodGhpcy5nZXRDaGlsZCgnY29udGVudC90aW1lTGJsJyksIFwiXCIsIEVybWpUaW1lQXV0b1J1bik7XHJcbiAgICAgICAgdGhpcy50aW1lUnVuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kb3RMaXN0ID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDM7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5nZXRDaGlsZChcImNvbnRlbnQvYWN0aW9uL2RvdFwiICsgaS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgdGhpcy5kb3RMaXN0LnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKXtcclxuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5zdGFydEFuaW0oKTtcclxuICAgICAgICB9LCA0MDApO1xyXG4gICAgICAgIHRoaXMucmVzZXRBbmltKCk7XHJcbiAgICAgICAgdGhpcy5zdGFydEFuaW0oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXJ0QW5pbSgpe1xyXG4gICAgICAgIGlmICh0aGlzLmN1ckRvdEluZGV4ID49IHRoaXMuZG90TGlzdC5sZW5ndGgpe1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0QW5pbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRvdExpc3RbdGhpcy5jdXJEb3RJbmRleF0uYWN0aXZlID0gdHJ1ZTsgIFxyXG4gICAgICAgICAgICB0aGlzLmN1ckRvdEluZGV4Kys7ICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldEFuaW0oKXtcclxuICAgICAgICB0aGlzLmN1ckRvdEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmRvdExpc3QuZm9yRWFjaChub2RlPT57XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0VGltZVJ1bkNvbmZpZyhsZWZ0VGltZTogbnVtYmVyLCBjYWxsYmFjazogRnVuY3Rpb24sIHRhcmdldDogYW55KXtcclxuICAgICAgICB0aGlzLnRpbWVSdW4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudGltZVJ1bi5zZXRUaW1lcihsZWZ0VGltZSwgY2FsbGJhY2ssIHRhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQnlSb3VuZCgpe1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKXtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgICAgIHRoaXMucmVzZXRBbmltKCk7XHJcbiAgICAgICAgdGhpcy50aW1lUnVuLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iXX0=