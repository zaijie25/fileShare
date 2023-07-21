
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/views/HallPaoMaDengView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2cb8eWezJtFm73shw+dY7y8', 'HallPaoMaDengView');
// hall/scripts/logic/hall/ui/hall/views/HallPaoMaDengView.ts

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
var PaoMaDengBaseView_1 = require("../PaoMaDengBaseView");
var GlobalEvent_1 = require("../../../../core/GlobalEvent");
var HallPaoMaDengView = /** @class */ (function (_super) {
    __extends(HallPaoMaDengView, _super);
    function HallPaoMaDengView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HallPaoMaDengView.prototype.onOpen = function () {
        _super.prototype.onOpen.call(this);
        this.addDefautMsg();
        Global.Event.on(GlobalEvent_1.default.MARQUEESCROLL_COMMON, this, this.addMsgData);
        Global.Event.on(GlobalEvent_1.default.MARQUEESCROLL_BIGWINNER, this, this.addMsgData);
    };
    HallPaoMaDengView.prototype.onClose = function () {
        Global.Event.off(GlobalEvent_1.default.MARQUEESCROLL_COMMON, this, this.addMsgData);
        Global.Event.off(GlobalEvent_1.default.MARQUEESCROLL_BIGWINNER, this, this.addMsgData);
        _super.prototype.onClose.call(this);
    };
    //界面销毁
    HallPaoMaDengView.prototype.onDispose = function () {
        Global.Event.off(GlobalEvent_1.default.MARQUEESCROLL_COMMON, this, this.addMsgData);
        Global.Event.off(GlobalEvent_1.default.MARQUEESCROLL_BIGWINNER, this, this.addMsgData);
        _super.prototype.onDispose.call(this);
    };
    HallPaoMaDengView.prototype.addDefautMsg = function () {
        var msgList = [
            { msg: "<color=#00d2FF>尊敬的玩家，欢迎进入游戏大厅！</color>", type: 1 },
            { msg: "<color=#f9a314>抵制不良游戏，拒绝盗版游戏，注意自身保护，谨防上当受骗</color>", type: 1 },
            { msg: "<color=#f9a314>适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活</color>", type: 1 },
        ];
        for (var index = 0; index < msgList.length; index++) {
            var data = msgList[index];
            this.addMsgItem(data);
        }
    };
    /**
     * @param msg {
                type : 20001,
                data : {
                    type : 0 ,
                    msg : "<color=#FF0000>TestData!!!!!!!!!!!!!!</color>"
                },
            }
     */
    HallPaoMaDengView.prototype.addMsgData = function (msg) {
        this.addMsgItem(msg.data);
    };
    return HallPaoMaDengView;
}(PaoMaDengBaseView_1.default));
exports.default = HallPaoMaDengView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFx2aWV3c1xcSGFsbFBhb01hRGVuZ1ZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMERBQXFEO0FBQ3JELDREQUF1RDtBQUV2RDtJQUErQyxxQ0FBaUI7SUFBaEU7O0lBaURBLENBQUM7SUEvQ2Esa0NBQU0sR0FBaEI7UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxxQkFBVyxDQUFDLG9CQUFvQixFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMscUJBQVcsQ0FBQyx1QkFBdUIsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFUyxtQ0FBTyxHQUFqQjtRQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLHFCQUFXLENBQUMsb0JBQW9CLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxxQkFBVyxDQUFDLHVCQUF1QixFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0UsaUJBQU0sT0FBTyxXQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELE1BQU07SUFDSSxxQ0FBUyxHQUFuQjtRQUVJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLHFCQUFXLENBQUMsb0JBQW9CLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxxQkFBVyxDQUFDLHVCQUF1QixFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0UsaUJBQU0sU0FBUyxXQUFFLENBQUM7SUFDdEIsQ0FBQztJQUdTLHdDQUFZLEdBQXRCO1FBQ0ksSUFBSSxPQUFPLEdBQUc7WUFDVixFQUFFLEdBQUcsRUFBRSx3Q0FBd0MsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFO1lBQzFELEVBQUUsR0FBRyxFQUFFLG9EQUFvRCxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7WUFDdEUsRUFBRSxHQUFHLEVBQUUsb0RBQW9ELEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtTQUN6RSxDQUFBO1FBQ0QsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDakQsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSyxzQ0FBVSxHQUFsQixVQUFvQixHQUFTO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUUsR0FBRyxDQUFDLElBQUksQ0FBRSxDQUFDO0lBQ2hDLENBQUM7SUFFTCx3QkFBQztBQUFELENBakRBLEFBaURDLENBakQ4QywyQkFBaUIsR0FpRC9EIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBQYW9NYURlbmdCYXNlVmlldyBmcm9tIFwiLi4vUGFvTWFEZW5nQmFzZVZpZXdcIjtcclxuaW1wb3J0IEdsb2JhbEV2ZW50IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL0dsb2JhbEV2ZW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYWxsUGFvTWFEZW5nVmlldyBleHRlbmRzIFBhb01hRGVuZ0Jhc2VWaWV3IHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCl7XHJcbiAgICAgICAgc3VwZXIub25PcGVuKCk7XHJcbiAgICAgICAgdGhpcy5hZGREZWZhdXRNc2coKTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuTUFSUVVFRVNDUk9MTF9DT01NT04sdGhpcyx0aGlzLmFkZE1zZ0RhdGEpO1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5NQVJRVUVFU0NST0xMX0JJR1dJTk5FUix0aGlzLHRoaXMuYWRkTXNnRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKXtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50Lk1BUlFVRUVTQ1JPTExfQ09NTU9OLHRoaXMsdGhpcy5hZGRNc2dEYXRhKTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50Lk1BUlFVRUVTQ1JPTExfQklHV0lOTkVSLHRoaXMsdGhpcy5hZGRNc2dEYXRhKTtcclxuICAgICAgICBzdXBlci5vbkNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlYzpnaLplIDmr4FcclxuICAgIHByb3RlY3RlZCBvbkRpc3Bvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuTUFSUVVFRVNDUk9MTF9DT01NT04sdGhpcyx0aGlzLmFkZE1zZ0RhdGEpO1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuTUFSUVVFRVNDUk9MTF9CSUdXSU5ORVIsdGhpcyx0aGlzLmFkZE1zZ0RhdGEpO1xyXG4gICAgICAgIHN1cGVyLm9uRGlzcG9zZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWRkRGVmYXV0TXNnKCl7XHJcbiAgICAgICAgbGV0IG1zZ0xpc3QgPSBbXHJcbiAgICAgICAgICAgIHsgbXNnOiBcIjxjb2xvcj0jMDBkMkZGPuWwiuaVrOeahOeOqeWutu+8jOasoui/jui/m+WFpea4uOaIj+Wkp+WOhe+8gTwvY29sb3I+XCIsIHR5cGU6IDEgfSxcclxuICAgICAgICAgICAgeyBtc2c6IFwiPGNvbG9yPSNmOWEzMTQ+5oq15Yi25LiN6Imv5ri45oiP77yM5ouS57ud55uX54mI5ri45oiP77yM5rOo5oSP6Ieq6Lqr5L+d5oqk77yM6LCo6Ziy5LiK5b2T5Y+X6aqXPC9jb2xvcj5cIiwgdHlwZTogMSB9LFxyXG4gICAgICAgICAgICB7IG1zZzogXCI8Y29sb3I9I2Y5YTMxND7pgILluqbmuLjmiI/nm4rohJHvvIzmsonov7fmuLjmiI/kvKTouqvvvIzlkIjnkIblronmjpLml7bpl7TvvIzkuqvlj5flgaXlurfnlJ/mtLs8L2NvbG9yPlwiLCB0eXBlOiAxIH0sXHJcbiAgICAgICAgXVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBtc2dMaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbXNnTGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgIHRoaXMuYWRkTXNnSXRlbShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gbXNnIHtcclxuICAgICAgICAgICAgICAgIHR5cGUgOiAyMDAwMSxcclxuICAgICAgICAgICAgICAgIGRhdGEgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA6IDAgLCBcclxuICAgICAgICAgICAgICAgICAgICBtc2cgOiBcIjxjb2xvcj0jRkYwMDAwPlRlc3REYXRhISEhISEhISEhISEhISE8L2NvbG9yPlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkTXNnRGF0YSggbXNnIDogYW55KXtcclxuICAgICAgICB0aGlzLmFkZE1zZ0l0ZW0oIG1zZy5kYXRhICk7XHJcbiAgICB9XHJcbiAgIFxyXG59XHJcbiJdfQ==