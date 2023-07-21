
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/serverHelper/HandlerHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7d49eON+YtHVZj+oU+cBYm3', 'HandlerHelper');
// hall/scripts/logic/core/game/serverHelper/HandlerHelper.ts

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
var BaseServerHelper_1 = require("./BaseServerHelper");
var HandlerHelper = /** @class */ (function (_super) {
    __extends(HandlerHelper, _super);
    function HandlerHelper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handlerMap = {};
        //主要存放公共handler    一类型游戏可以配置一套defaultMap   handlerMap注册差异函数
        _this.defaultHandlerMap = {};
        return _this;
    }
    //每个游戏注册一次Handler    key为服务器协议字段
    HandlerHelper.prototype.registHandler = function (key, handlerInstance) {
        if (this.handlerMap[key] != null) {
            Logger.error("重复注册handler", key);
        }
        this.handlerMap[key] = handlerInstance;
    };
    HandlerHelper.prototype.registDefaultHandler = function (key, handlerInstance) {
        if (this.defaultHandlerMap[key] != null) {
            Logger.error("重复注册defaulthandler", key);
        }
        this.defaultHandlerMap[key] = handlerInstance;
    };
    HandlerHelper.prototype.removeHandler = function (key) {
        if (this.handlerMap[key])
            this.handlerMap[key] = null;
    };
    HandlerHelper.prototype.clearHandlers = function () {
        this.handlerMap = {};
        this.defaultHandlerMap = {};
    };
    HandlerHelper.prototype.getHandler = function (key) {
        var handler = this.handlerMap[key];
        if (handler == null)
            handler = this.defaultHandlerMap[key];
        if (handler == null) {
            Logger.error("没有找到对应处理handler", key);
        }
        return handler;
    };
    return HandlerHelper;
}(BaseServerHelper_1.default));
exports.default = HandlerHelper;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXHNlcnZlckhlbHBlclxcSGFuZGxlckhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1REFBa0Q7QUFFbEQ7SUFBMkMsaUNBQWdCO0lBQTNEO1FBQUEscUVBa0RDO1FBaERVLGdCQUFVLEdBQU0sRUFBRSxDQUFBO1FBRXpCLDJEQUEyRDtRQUNwRCx1QkFBaUIsR0FBTSxFQUFFLENBQUE7O0lBNkNwQyxDQUFDO0lBM0NHLGdDQUFnQztJQUN6QixxQ0FBYSxHQUFwQixVQUFxQixHQUFPLEVBQUUsZUFBbUI7UUFFN0MsSUFBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFDL0I7WUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsZUFBZSxDQUFDO0lBQzNDLENBQUM7SUFFTSw0Q0FBb0IsR0FBM0IsVUFBNEIsR0FBTyxFQUFFLGVBQW1CO1FBRXBELElBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFDdEM7WUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLGVBQWUsQ0FBQztJQUNsRCxDQUFDO0lBRU0scUNBQWEsR0FBcEIsVUFBcUIsR0FBTztRQUV4QixJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3BDLENBQUM7SUFFTSxxQ0FBYSxHQUFwQjtRQUVJLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFBO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUE7SUFDL0IsQ0FBQztJQUVNLGtDQUFVLEdBQWpCLFVBQWtCLEdBQU87UUFFckIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxJQUFHLE9BQU8sSUFBSSxJQUFJO1lBQ2QsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUxQyxJQUFHLE9BQU8sSUFBSSxJQUFJLEVBQ2xCO1lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN4QztRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFDTCxvQkFBQztBQUFELENBbERBLEFBa0RDLENBbEQwQywwQkFBZ0IsR0FrRDFEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VHYW1lSGFuZGxlciBmcm9tIFwiLi4vQmFzZUdhbWVIYW5kbGVyXCI7XHJcbmltcG9ydCBCYXNlU2VydmVySGVscGVyIGZyb20gXCIuL0Jhc2VTZXJ2ZXJIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhbmRsZXJIZWxwZXIgZXh0ZW5kcyBCYXNlU2VydmVySGVscGVyXHJcbntcclxuICAgIHB1YmxpYyBoYW5kbGVyTWFwOnt9ID0ge31cclxuXHJcbiAgICAvL+S4u+imgeWtmOaUvuWFrOWFsWhhbmRsZXIgICAg5LiA57G75Z6L5ri45oiP5Y+v5Lul6YWN572u5LiA5aWXZGVmYXVsdE1hcCAgIGhhbmRsZXJNYXDms6jlhozlt67lvILlh73mlbBcclxuICAgIHB1YmxpYyBkZWZhdWx0SGFuZGxlck1hcDp7fSA9IHt9XHJcblxyXG4gICAgLy/mr4/kuKrmuLjmiI/ms6jlhozkuIDmrKFIYW5kbGVyICAgIGtleeS4uuacjeWKoeWZqOWNj+iuruWtl+autVxyXG4gICAgcHVibGljIHJlZ2lzdEhhbmRsZXIoa2V5OmFueSwgaGFuZGxlckluc3RhbmNlOmFueSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmhhbmRsZXJNYXBba2V5XSAhPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi6YeN5aSN5rOo5YaMaGFuZGxlclwiLCBrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhhbmRsZXJNYXBba2V5XSA9IGhhbmRsZXJJbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0RGVmYXVsdEhhbmRsZXIoa2V5OmFueSwgaGFuZGxlckluc3RhbmNlOmFueSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmRlZmF1bHRIYW5kbGVyTWFwW2tleV0gIT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIumHjeWkjeazqOWGjGRlZmF1bHRoYW5kbGVyXCIsIGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGVmYXVsdEhhbmRsZXJNYXBba2V5XSA9IGhhbmRsZXJJbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlSGFuZGxlcihrZXk6YW55KVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuaGFuZGxlck1hcFtrZXldKVxyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJNYXBba2V5XSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFySGFuZGxlcnMoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlck1hcCA9IHt9XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0SGFuZGxlck1hcCA9IHt9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEhhbmRsZXIoa2V5OmFueSk6YW55XHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGhhbmRsZXIgPSB0aGlzLmhhbmRsZXJNYXBba2V5XTtcclxuICAgICAgICBpZihoYW5kbGVyID09IG51bGwpXHJcbiAgICAgICAgICAgIGhhbmRsZXIgPSB0aGlzLmRlZmF1bHRIYW5kbGVyTWFwW2tleV07XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoaGFuZGxlciA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5rKh5pyJ5om+5Yiw5a+55bqU5aSE55CGaGFuZGxlclwiLCBrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaGFuZGxlcjtcclxuICAgIH1cclxufSJdfQ==