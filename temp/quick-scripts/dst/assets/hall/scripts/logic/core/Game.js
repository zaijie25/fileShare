
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '002a38UCnBE4I2GsxvQP7UH', 'Game');
// hall/scripts/logic/core/Game.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher_1 = require("../../framework/event/EventDispatcher");
var ComponentProvider_1 = require("./component/ComponentProvider");
var TweenManager_1 = require("./game/TweenManager");
var GameServer_1 = require("./game/GameServer");
var CommandDefine_1 = require("./game/CommandDefine");
var GameControl_1 = require("./game/GameControl");
var DataBridge_1 = require("./game/data/DataBridge");
var GamePreloadTool_1 = require("./game/GamePreloadTool");
//游戏公共逻辑入口
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.setup = function () {
        this.Command = new CommandDefine_1.default();
        this.Event = new EventDispatcher_1.default();
        this.Component = new ComponentProvider_1.default("GameDriver");
        this.Component.setup(this.onUpdate.bind(this), this.onLateUpdate.bind(this));
        this.Tween = new TweenManager_1.default();
        this.Tween.setup();
        this.Server = new GameServer_1.default();
        this.Server.setup();
        this.Control = new GameControl_1.default();
        this.Control.setup();
        this.DataBridge = new DataBridge_1.default();
        this.GamePreloadTool = new GamePreloadTool_1.default();
    };
    Game.onUpdate = function (dt) {
        this.Tween.onUpdate(dt);
        this.Server.onUpdate(dt);
    };
    Game.onLateUpdate = function () { };
    //游戏内通用事件
    Game.EVENT_ADDTIMELOCK = "EVENT_ADDTIMELOCK"; //时间锁  到时间自动解锁
    Game.EVENT_ADDMANUALLOCK = "EVENT_ADDMANUALLOCK"; //手动锁，需要手动解锁  或者等待超时
    Game.EVENT_REMOVELOCK = "EVENT_REMOVELOCK"; //解锁消息
    //游戏网络接通
    Game.EVENT_SOCKET_OPEN = "EVENT_SOCKET_OPEN"; //游戏socket链接
    Game.EVENT_SOCKET_CLOSE = "EVENT_SOCKET_CLOSE"; //游戏socket关闭
    Game.EVENT_SOCKET_ERROR = "EVENT_SOCKET_ERROR"; //游戏socket异常
    Game.EVENT_SOCKET_RECONNECT = "EVENT_SOCKET_RECONNECT"; //游戏重连通知
    Game.EVENT_CALL_RECONNECT = "EVENT_CALL_RECONNECT"; //游戏内部强制重连
    Game.EVENT_SOCKET_RESUME = "EVENT_SOCKET_RESUME"; //从后台切回来后事件  参数：切后台时间。
    //插入消息到队列头部
    Game.EVENT_UNSHFIT_MSGLIST = "EVENT_UNSHFIT_MSGLIST";
    //强制退出游戏  常用与网络异常
    Game.EVENT_FORCE_LEAVE_GAME = "EVENT_FORCE_LEAVE_GAME";
    //不在桌上 对应901错误
    Game.EVENT_NOT_IN_TABLE = "EVENT_NOT_IN_TABLE";
    // 通知子游戏匹配玩家中
    Game.EVENT_MATCH_PLAYER = "EVENT_MATCH_PLAYER";
    //设置大厅选场点击场次的回调
    Game.EVENT_SETINTOGAME_FUN = "EVENT_SETINTOGAME_FUN";
    // 拉霸游戏socket连上通知
    Game.EVENT_LABA_CONNECT = "EVENT_LABA_CONNECT";
    //子游戏内显示自定义messagebox
    Game.EVENT_MESSAGE_BOX = "EVENT_MESSAGE_BOX";
    return Game;
}());
exports.default = Game;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXEdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5RUFBb0U7QUFDcEUsbUVBQThEO0FBQzlELG9EQUErQztBQUMvQyxnREFBMkM7QUFDM0Msc0RBQStDO0FBQy9DLGtEQUE2QztBQUM3QyxxREFBZ0Q7QUFDaEQsMERBQXFEO0FBRXJELFVBQVU7QUFDVjtJQUFBO0lBK0VBLENBQUM7SUF6QmlCLFVBQUssR0FBbkI7UUFFSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksdUJBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSx5QkFBZSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLDJCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLHNCQUFZLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxvQkFBVSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUkscUJBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLG9CQUFVLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUkseUJBQWUsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFYSxhQUFRLEdBQXRCLFVBQXVCLEVBQUU7UUFFckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVhLGlCQUFZLEdBQTFCLGNBQ0MsQ0FBQztJQTNFRixTQUFTO0lBQ0ssc0JBQWlCLEdBQUcsbUJBQW1CLENBQUMsQ0FBRyxjQUFjO0lBQ3pELHdCQUFtQixHQUFHLHFCQUFxQixDQUFDLENBQUUsb0JBQW9CO0lBQ2xFLHFCQUFnQixHQUFHLGtCQUFrQixDQUFDLENBQUksTUFBTTtJQUM5RCxRQUFRO0lBQ00sc0JBQWlCLEdBQUcsbUJBQW1CLENBQUMsQ0FBRSxZQUFZO0lBQ3RELHVCQUFrQixHQUFHLG9CQUFvQixDQUFDLENBQUUsWUFBWTtJQUN4RCx1QkFBa0IsR0FBRyxvQkFBb0IsQ0FBQyxDQUFFLFlBQVk7SUFDeEQsMkJBQXNCLEdBQUcsd0JBQXdCLENBQUMsQ0FBRSxRQUFRO0lBQzVELHlCQUFvQixHQUFHLHNCQUFzQixDQUFDLENBQUUsVUFBVTtJQUMxRCx3QkFBbUIsR0FBRyxxQkFBcUIsQ0FBQyxDQUFFLHNCQUFzQjtJQUVsRixXQUFXO0lBQ0csMEJBQXFCLEdBQUcsdUJBQXVCLENBQUM7SUFHOUQsaUJBQWlCO0lBQ0gsMkJBQXNCLEdBQUcsd0JBQXdCLENBQUM7SUFDaEUsY0FBYztJQUNBLHVCQUFrQixHQUFHLG9CQUFvQixDQUFDO0lBQ3hELGFBQWE7SUFDQyx1QkFBa0IsR0FBRyxvQkFBb0IsQ0FBQztJQUV4RCxlQUFlO0lBQ0QsMEJBQXFCLEdBQUcsdUJBQXVCLENBQUM7SUFFOUQsaUJBQWlCO0lBQ0gsdUJBQWtCLEdBQUcsb0JBQW9CLENBQUM7SUFHeEQscUJBQXFCO0lBQ1Asc0JBQWlCLEdBQUcsbUJBQW1CLENBQUM7SUE4QzFELFdBQUM7Q0EvRUQsQUErRUMsSUFBQTtrQkEvRW9CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvZXZlbnQvRXZlbnREaXNwYXRjaGVyXCI7XHJcbmltcG9ydCBDb21wb25lbnRQcm92aWRlciBmcm9tIFwiLi9jb21wb25lbnQvQ29tcG9uZW50UHJvdmlkZXJcIjtcclxuaW1wb3J0IFR3ZWVuTWFuYWdlciBmcm9tIFwiLi9nYW1lL1R3ZWVuTWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZVNlcnZlciBmcm9tIFwiLi9nYW1lL0dhbWVTZXJ2ZXJcIjtcclxuaW1wb3J0IEdhbWVDb21tYW5kIGZyb20gXCIuL2dhbWUvQ29tbWFuZERlZmluZVwiO1xyXG5pbXBvcnQgR2FtZUNvbnRyb2wgZnJvbSBcIi4vZ2FtZS9HYW1lQ29udHJvbFwiO1xyXG5pbXBvcnQgRGF0YUJyaWRnZSBmcm9tIFwiLi9nYW1lL2RhdGEvRGF0YUJyaWRnZVwiO1xyXG5pbXBvcnQgR2FtZVByZWxvYWRUb29sIGZyb20gXCIuL2dhbWUvR2FtZVByZWxvYWRUb29sXCI7XHJcblxyXG4vL+a4uOaIj+WFrOWFsemAu+i+keWFpeWPo1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lXHJcbntcclxuICAgIC8v5ri45oiP5YaF6YCa55So5LqL5Lu2XHJcbiAgICBwdWJsaWMgc3RhdGljIEVWRU5UX0FERFRJTUVMT0NLID0gXCJFVkVOVF9BRERUSU1FTE9DS1wiOyAgIC8v5pe26Ze06ZSBICDliLDml7bpl7Toh6rliqjop6PplIFcclxuICAgIHB1YmxpYyBzdGF0aWMgRVZFTlRfQURETUFOVUFMTE9DSyA9IFwiRVZFTlRfQURETUFOVUFMTE9DS1wiOyAgLy/miYvliqjplIHvvIzpnIDopoHmiYvliqjop6PplIEgIOaIluiAheetieW+hei2heaXtlxyXG4gICAgcHVibGljIHN0YXRpYyBFVkVOVF9SRU1PVkVMT0NLID0gXCJFVkVOVF9SRU1PVkVMT0NLXCI7ICAgIC8v6Kej6ZSB5raI5oGvXHJcbiAgICAvL+a4uOaIj+e9kee7nOaOpemAmlxyXG4gICAgcHVibGljIHN0YXRpYyBFVkVOVF9TT0NLRVRfT1BFTiA9IFwiRVZFTlRfU09DS0VUX09QRU5cIjsgIC8v5ri45oiPc29ja2V06ZO+5o6lXHJcbiAgICBwdWJsaWMgc3RhdGljIEVWRU5UX1NPQ0tFVF9DTE9TRSA9IFwiRVZFTlRfU09DS0VUX0NMT1NFXCI7ICAvL+a4uOaIj3NvY2tldOWFs+mXrVxyXG4gICAgcHVibGljIHN0YXRpYyBFVkVOVF9TT0NLRVRfRVJST1IgPSBcIkVWRU5UX1NPQ0tFVF9FUlJPUlwiOyAgLy/muLjmiI9zb2NrZXTlvILluLhcclxuICAgIHB1YmxpYyBzdGF0aWMgRVZFTlRfU09DS0VUX1JFQ09OTkVDVCA9IFwiRVZFTlRfU09DS0VUX1JFQ09OTkVDVFwiOyAgLy/muLjmiI/ph43ov57pgJrnn6VcclxuICAgIHB1YmxpYyBzdGF0aWMgRVZFTlRfQ0FMTF9SRUNPTk5FQ1QgPSBcIkVWRU5UX0NBTExfUkVDT05ORUNUXCI7ICAvL+a4uOaIj+WGhemDqOW8uuWItumHjei/nlxyXG4gICAgcHVibGljIHN0YXRpYyBFVkVOVF9TT0NLRVRfUkVTVU1FID0gXCJFVkVOVF9TT0NLRVRfUkVTVU1FXCI7ICAvL+S7juWQjuWPsOWIh+WbnuadpeWQjuS6i+S7tiAg5Y+C5pWw77ya5YiH5ZCO5Y+w5pe26Ze044CCXHJcblxyXG4gICAgLy/mj5LlhaXmtojmga/liLDpmJ/liJflpLTpg6hcclxuICAgIHB1YmxpYyBzdGF0aWMgRVZFTlRfVU5TSEZJVF9NU0dMSVNUID0gXCJFVkVOVF9VTlNIRklUX01TR0xJU1RcIjtcclxuXHJcblxyXG4gICAgLy/lvLrliLbpgIDlh7rmuLjmiI8gIOW4uOeUqOS4jue9kee7nOW8guW4uFxyXG4gICAgcHVibGljIHN0YXRpYyBFVkVOVF9GT1JDRV9MRUFWRV9HQU1FID0gXCJFVkVOVF9GT1JDRV9MRUFWRV9HQU1FXCI7XHJcbiAgICAvL+S4jeWcqOahjOS4iiDlr7nlupQ5MDHplJnor69cclxuICAgIHB1YmxpYyBzdGF0aWMgRVZFTlRfTk9UX0lOX1RBQkxFID0gXCJFVkVOVF9OT1RfSU5fVEFCTEVcIjtcclxuICAgIC8vIOmAmuefpeWtkOa4uOaIj+WMuemFjeeOqeWutuS4rVxyXG4gICAgcHVibGljIHN0YXRpYyBFVkVOVF9NQVRDSF9QTEFZRVIgPSBcIkVWRU5UX01BVENIX1BMQVlFUlwiO1xyXG5cclxuICAgIC8v6K6+572u5aSn5Y6F6YCJ5Zy654K55Ye75Zy65qyh55qE5Zue6LCDXHJcbiAgICBwdWJsaWMgc3RhdGljIEVWRU5UX1NFVElOVE9HQU1FX0ZVTiA9IFwiRVZFTlRfU0VUSU5UT0dBTUVfRlVOXCI7XHJcblxyXG4gICAgLy8g5ouJ6Zy45ri45oiPc29ja2V06L+e5LiK6YCa55+lXHJcbiAgICBwdWJsaWMgc3RhdGljIEVWRU5UX0xBQkFfQ09OTkVDVCA9IFwiRVZFTlRfTEFCQV9DT05ORUNUXCI7XHJcblxyXG5cclxuICAgIC8v5a2Q5ri45oiP5YaF5pi+56S66Ieq5a6a5LmJbWVzc2FnZWJveFxyXG4gICAgcHVibGljIHN0YXRpYyBFVkVOVF9NRVNTQUdFX0JPWCA9IFwiRVZFTlRfTUVTU0FHRV9CT1hcIjtcclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBFdmVudDpFdmVudERpc3BhdGNoZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIENvbXBvbmVudDpDb21wb25lbnRQcm92aWRlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgVHdlZW46VHdlZW5NYW5hZ2VyO1xyXG4gICAgcHVibGljIHN0YXRpYyBTZXJ2ZXI6R2FtZVNlcnZlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ29tbWFuZDpHYW1lQ29tbWFuZDtcclxuICAgIC8v5ri45oiP6ZO+5o6l566h55CGXHJcbiAgICBwdWJsaWMgc3RhdGljIENvbnRyb2w6R2FtZUNvbnRyb2w7XHJcblxyXG4gICAgLy/muLjmiI/ov5DooYzml7bmlbDmja4gIOavj+S4quWtkOa4uOaIj+WumuWItlxyXG4gICAgcHVibGljIHN0YXRpYyBDb250ZXh0OmFueTtcclxuXHJcbiAgICAvL+WtkOa4uOaIj+WFqOWxgOiKgueCuSAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBFbnRyeTphbnk7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBEYXRhQnJpZGdlOmFueTtcclxuICAgIHB1YmxpYyBzdGF0aWMgR2FtZVByZWxvYWRUb29sOiBHYW1lUHJlbG9hZFRvb2w7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0dXAoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ29tbWFuZCA9IG5ldyBHYW1lQ29tbWFuZCgpO1xyXG4gICAgICAgIHRoaXMuRXZlbnQgPSBuZXcgRXZlbnREaXNwYXRjaGVyKCk7XHJcbiAgICAgICAgdGhpcy5Db21wb25lbnQgPSBuZXcgQ29tcG9uZW50UHJvdmlkZXIoXCJHYW1lRHJpdmVyXCIpO1xyXG4gICAgICAgIHRoaXMuQ29tcG9uZW50LnNldHVwKHRoaXMub25VcGRhdGUuYmluZCh0aGlzKSwgdGhpcy5vbkxhdGVVcGRhdGUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5Ud2VlbiA9IG5ldyBUd2Vlbk1hbmFnZXIoKTtcclxuICAgICAgICB0aGlzLlR3ZWVuLnNldHVwKCk7XHJcbiAgICAgICAgdGhpcy5TZXJ2ZXIgPSBuZXcgR2FtZVNlcnZlcigpO1xyXG4gICAgICAgIHRoaXMuU2VydmVyLnNldHVwKCk7XHJcbiAgICAgICAgdGhpcy5Db250cm9sID0gbmV3IEdhbWVDb250cm9sKCk7XHJcbiAgICAgICAgdGhpcy5Db250cm9sLnNldHVwKCk7XHJcbiAgICAgICAgdGhpcy5EYXRhQnJpZGdlID0gbmV3IERhdGFCcmlkZ2UoKTtcclxuICAgICAgICB0aGlzLkdhbWVQcmVsb2FkVG9vbCA9IG5ldyBHYW1lUHJlbG9hZFRvb2woKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG9uVXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVHdlZW4ub25VcGRhdGUoZHQpO1xyXG4gICAgICAgIHRoaXMuU2VydmVyLm9uVXBkYXRlKGR0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG9uTGF0ZVVwZGF0ZSgpXHJcbiAgICB7fVxyXG4gICAgXHJcbn0iXX0=