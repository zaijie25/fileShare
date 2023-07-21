
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/serverHelper/GameErrorHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '07b271ivMhDmpMxU7H9KJZO', 'GameErrorHelper');
// hall/scripts/logic/core/game/serverHelper/GameErrorHelper.ts

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
//游戏逻辑通用错误处理
var GameErrorHelper = /** @class */ (function (_super) {
    __extends(GameErrorHelper, _super);
    function GameErrorHelper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.errorHandlerMap = {};
        //余额不足
        _this.ERROR_NOT_ENOUGH = 301;
        _this.ERROR_NO_SERVICE = 404;
        //不在桌上
        _this.ERROR_NOT_IN_TABLE = 1001;
        //网络变化 需要回到大厅
        _this.ERROR_NET_CHANGE = 902;
        //不在桌子上
        _this.ERROR_NOT_ONTABLE = 905;
        //货币不足
        _this.ERROR_LOW_LIMIT = 906;
        //货币超出限制
        _this.ERROR_UPPER_LIMIT = 907;
        _this.ERROR_SYS_BUSY = 204;
        return _this;
    }
    GameErrorHelper.prototype.onInit = function () {
    };
    //注册子游戏定制错误处理  参数为errnoid, netData   返回true表示继续入队列 false丢弃协议
    GameErrorHelper.prototype.registErrorHandler = function (key, callback) {
        this.errorHandlerMap[key] = callback;
    };
    GameErrorHelper.prototype.clear = function () {
        this.errorHandlerMap = {};
    };
    GameErrorHelper.prototype.handleSysError = function (netData) {
        if (netData._errno == null)
            return true;
        //上报enter异常
        if (netData._param && netData._param._cmd == Game.Command.Enter && Game.Control.enterData != null && netData._errno == this.ERROR_SYS_BUSY) {
            var content = {};
            content.enter = Game.Control.enterData;
            content.error = netData;
            Global.ReportTool.ReportClientError("EnterError", content);
        }
        var handler = this.getErrorHandler(netData._errno);
        if (handler)
            return handler(netData._errno, netData);
        this.defultErrorHandler(netData._errno, netData._errstr);
    };
    GameErrorHelper.prototype.handleCmdError = function (netData) {
        if (netData._param._errno == null)
            return true;
        //上报enter异常
        if (netData._param && netData._param._cmd == Game.Command.Enter && Game.Control.enterData != null && netData._param._errno == this.ERROR_SYS_BUSY) {
            var content = {};
            content.enter = Game.Control.enterData;
            content.error = netData;
            Global.ReportTool.ReportClientError("EnterError", content);
        }
        var handler = this.getErrorHandler(netData._param._errno);
        if (handler)
            return handler(netData._param._errno, netData);
        this.defultErrorHandler(netData._param._errno, netData._param._errstr);
    };
    GameErrorHelper.prototype.handleLogicError = function (netData) {
        if (netData._param._para == null || netData._param._para._errno == null)
            return true;
        //上报enter异常
        if (netData._param && netData._param._cmd == Game.Command.Enter && Game.Control.enterData != null && netData._param._para._errno == this.ERROR_SYS_BUSY) {
            var content = {};
            content.enter = Game.Control.enterData;
            content.error = netData;
            Global.ReportTool.ReportClientError("EnterError", content);
        }
        var handler = this.getErrorHandler(netData._param._para._errno);
        if (handler)
            return handler(netData._param._para._errno, netData);
        this.defultErrorHandler(netData._param._para._errno, netData._param._para._errstr);
    };
    GameErrorHelper.prototype.getErrorHandler = function (key) {
        return this.errorHandlerMap[key];
    };
    //服务器errno是唯一的
    GameErrorHelper.prototype.defultErrorHandler = function (errno, errorStr) {
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
        Game.Control.stopCheckMsgTimer();
        //pvp直接回选场  pve重新进游戏
        if (errno == this.ERROR_NOT_IN_TABLE) {
            // this.server.stopGame();
            this.server.clearData();
            Game.Event.event(Game.EVENT_NOT_IN_TABLE);
            return;
        }
        if (errno == this.ERROR_LOW_LIMIT) {
            this.server.stopGame();
            Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME);
            Global.Toolkit.showMoneyNotEnough();
            return;
        }
        //1000以下error默认退出
        if (errno < 1000) {
            this.server.stopGame();
            var errFunc = function () { Game.Event.event(Game.EVENT_FORCE_LEAVE_GAME); };
            var err = cc.js.formatStr("%s[%s]", errorStr, errno);
            Global.UI.showSingleBox(err, errFunc, errFunc);
            return;
        }
        if (errorStr && errorStr != "") {
            // Global.UI.fastTip(errorStr+"["+errno+"]");
            Global.UI.fastTip(errorStr + "");
            return;
        }
    };
    return GameErrorHelper;
}(BaseServerHelper_1.default));
exports.default = GameErrorHelper;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXHNlcnZlckhlbHBlclxcR2FtZUVycm9ySGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFrRDtBQUVsRCxZQUFZO0FBQ1o7SUFBNkMsbUNBQWdCO0lBQTdEO1FBQUEscUVBb0pDO1FBbEpVLHFCQUFlLEdBQTJCLEVBQUUsQ0FBQTtRQUVuRCxNQUFNO1FBQ0Usc0JBQWdCLEdBQUcsR0FBRyxDQUFDO1FBRXZCLHNCQUFnQixHQUFHLEdBQUcsQ0FBQztRQUMvQixNQUFNO1FBQ0Usd0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLGFBQWE7UUFDTCxzQkFBZ0IsR0FBRyxHQUFHLENBQUM7UUFFL0IsT0FBTztRQUNDLHVCQUFpQixHQUFHLEdBQUcsQ0FBQztRQUNoQyxNQUFNO1FBQ0UscUJBQWUsR0FBRyxHQUFHLENBQUM7UUFDOUIsUUFBUTtRQUNBLHVCQUFpQixHQUFHLEdBQUcsQ0FBQztRQUV4QixvQkFBYyxHQUFHLEdBQUcsQ0FBQzs7SUFnSWpDLENBQUM7SUE5SGEsZ0NBQU0sR0FBaEI7SUFFQSxDQUFDO0lBRUQsNERBQTREO0lBQ3JELDRDQUFrQixHQUF6QixVQUEwQixHQUFVLEVBQUUsUUFBaUI7UUFFbkQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7SUFDekMsQ0FBQztJQUVNLCtCQUFLLEdBQVo7UUFFSSxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQTtJQUM3QixDQUFDO0lBRU0sd0NBQWMsR0FBckIsVUFBc0IsT0FBTztRQUV6QixJQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSTtZQUNyQixPQUFPLElBQUksQ0FBQztRQUNoQixXQUFXO1FBQ1gsSUFBRyxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLElB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a0IsRUFBRSxDQUFDO1lBQ3BDLE9BQU07U0FDVDtRQUVELGlCQUFpQjtRQUNqQixJQUFHLEtBQUssR0FBRyxJQUFJLEVBQ2Y7WUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZCLElBQUksT0FBTyxHQUFHLGNBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUE7WUFDbEUsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQTtZQUNsRCxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQy9DLE9BQU87U0FDVjtRQUVELElBQUcsUUFBUSxJQUFJLFFBQVEsSUFBSSxFQUFFLEVBQzdCO1lBRUcsNkNBQTZDO1lBQzVDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBQyxFQUFFLENBQUMsQ0FBQztZQUMvQixPQUFPO1NBQ1Y7SUFDTCxDQUFDO0lBRUwsc0JBQUM7QUFBRCxDQXBKQSxBQW9KQyxDQXBKNEMsMEJBQWdCLEdBb0o1RCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlU2VydmVySGVscGVyIGZyb20gXCIuL0Jhc2VTZXJ2ZXJIZWxwZXJcIjtcclxuXHJcbi8v5ri45oiP6YC76L6R6YCa55So6ZSZ6K+v5aSE55CGXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVFcnJvckhlbHBlciBleHRlbmRzIEJhc2VTZXJ2ZXJIZWxwZXJcclxue1xyXG4gICAgcHVibGljIGVycm9ySGFuZGxlck1hcDp7W2tleTpudW1iZXJdOkZ1bmN0aW9ufSA9IHt9XHJcblxyXG4gICAgLy/kvZnpop3kuI3otrNcclxuICAgIHByaXZhdGUgRVJST1JfTk9UX0VOT1VHSCA9IDMwMTtcclxuXHJcbiAgICBwcml2YXRlIEVSUk9SX05PX1NFUlZJQ0UgPSA0MDQ7XHJcbiAgICAvL+S4jeWcqOahjOS4ilxyXG4gICAgcHJpdmF0ZSBFUlJPUl9OT1RfSU5fVEFCTEUgPSAxMDAxO1xyXG4gICAgLy/nvZHnu5zlj5jljJYg6ZyA6KaB5Zue5Yiw5aSn5Y6FXHJcbiAgICBwcml2YXRlIEVSUk9SX05FVF9DSEFOR0UgPSA5MDI7XHJcblxyXG4gICAgLy/kuI3lnKjmoYzlrZDkuIpcclxuICAgIHByaXZhdGUgRVJST1JfTk9UX09OVEFCTEUgPSA5MDU7XHJcbiAgICAvL+i0p+W4geS4jei2s1xyXG4gICAgcHJpdmF0ZSBFUlJPUl9MT1dfTElNSVQgPSA5MDY7XHJcbiAgICAvL+i0p+W4gei2heWHuumZkOWItlxyXG4gICAgcHJpdmF0ZSBFUlJPUl9VUFBFUl9MSU1JVCA9IDkwNztcclxuXHJcbiAgICBwcml2YXRlIEVSUk9SX1NZU19CVVNZID0gMjA0O1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIC8v5rOo5YaM5a2Q5ri45oiP5a6a5Yi26ZSZ6K+v5aSE55CGICDlj4LmlbDkuLplcnJub2lkLCBuZXREYXRhICAg6L+U5ZuedHJ1ZeihqOekuue7p+e7reWFpemYn+WIlyBmYWxzZeS4ouW8g+WNj+iurlxyXG4gICAgcHVibGljIHJlZ2lzdEVycm9ySGFuZGxlcihrZXk6bnVtYmVyLCBjYWxsYmFjazpGdW5jdGlvbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLmVycm9ySGFuZGxlck1hcFtrZXldID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmVycm9ySGFuZGxlck1hcCA9IHt9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhbmRsZVN5c0Vycm9yKG5ldERhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYobmV0RGF0YS5fZXJybm8gPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgLy/kuIrmiqVlbnRlcuW8guW4uFxyXG4gICAgICAgIGlmKG5ldERhdGEuX3BhcmFtICYmIG5ldERhdGEuX3BhcmFtLl9jbWQgPT0gR2FtZS5Db21tYW5kLkVudGVyICYmIEdhbWUuQ29udHJvbC5lbnRlckRhdGEgIT0gbnVsbCAgJiYgbmV0RGF0YS5fZXJybm8gPT0gdGhpcy5FUlJPUl9TWVNfQlVTWSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBjb250ZW50OmFueSA9IHt9XHJcbiAgICAgICAgICAgIGNvbnRlbnQuZW50ZXIgPSBHYW1lLkNvbnRyb2wuZW50ZXJEYXRhO1xyXG4gICAgICAgICAgICBjb250ZW50LmVycm9yID0gbmV0RGF0YTtcclxuICAgICAgICAgICAgR2xvYmFsLlJlcG9ydFRvb2wuUmVwb3J0Q2xpZW50RXJyb3IoXCJFbnRlckVycm9yXCIsIGNvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGhhbmRsZXIgPSB0aGlzLmdldEVycm9ySGFuZGxlcihuZXREYXRhLl9lcnJubyk7XHJcbiAgICAgICAgaWYoaGFuZGxlcilcclxuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZXIobmV0RGF0YS5fZXJybm8sIG5ldERhdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGVmdWx0RXJyb3JIYW5kbGVyKG5ldERhdGEuX2Vycm5vLCBuZXREYXRhLl9lcnJzdHIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgaGFuZGxlQ21kRXJyb3IobmV0RGF0YSlcclxuICAgIHtcclxuICAgICAgICBpZihuZXREYXRhLl9wYXJhbS5fZXJybm8gPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIC8v5LiK5oqlZW50ZXLlvILluLhcclxuICAgICAgICBpZihuZXREYXRhLl9wYXJhbSAmJiBuZXREYXRhLl9wYXJhbS5fY21kID09IEdhbWUuQ29tbWFuZC5FbnRlciAmJiBHYW1lLkNvbnRyb2wuZW50ZXJEYXRhICE9IG51bGwgJiYgbmV0RGF0YS5fcGFyYW0uX2Vycm5vID09IHRoaXMuRVJST1JfU1lTX0JVU1kpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgY29udGVudDphbnkgPSB7fVxyXG4gICAgICAgICAgICBjb250ZW50LmVudGVyID0gR2FtZS5Db250cm9sLmVudGVyRGF0YTtcclxuICAgICAgICAgICAgY29udGVudC5lcnJvciA9IG5ldERhdGE7XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKFwiRW50ZXJFcnJvclwiLCBjb250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGhhbmRsZXIgPSB0aGlzLmdldEVycm9ySGFuZGxlcihuZXREYXRhLl9wYXJhbS5fZXJybm8pO1xyXG4gICAgICAgIGlmKGhhbmRsZXIpXHJcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVyKG5ldERhdGEuX3BhcmFtLl9lcnJubywgbmV0RGF0YSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5kZWZ1bHRFcnJvckhhbmRsZXIobmV0RGF0YS5fcGFyYW0uX2Vycm5vLCBuZXREYXRhLl9wYXJhbS5fZXJyc3RyKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGhhbmRsZUxvZ2ljRXJyb3IobmV0RGF0YSlcclxuICAgIHtcclxuICAgICAgICBpZihuZXREYXRhLl9wYXJhbS5fcGFyYSA9PSBudWxsIHx8IG5ldERhdGEuX3BhcmFtLl9wYXJhLl9lcnJubyA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBcclxuICAgICAgICAvL+S4iuaKpWVudGVy5byC5bi4XHJcbiAgICAgICAgaWYobmV0RGF0YS5fcGFyYW0mJiBuZXREYXRhLl9wYXJhbS5fY21kID09IEdhbWUuQ29tbWFuZC5FbnRlciAmJiBHYW1lLkNvbnRyb2wuZW50ZXJEYXRhICE9IG51bGwgJiYgbmV0RGF0YS5fcGFyYW0uX3BhcmEuX2Vycm5vID09IHRoaXMuRVJST1JfU1lTX0JVU1kpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgY29udGVudDphbnkgPSB7fVxyXG4gICAgICAgICAgICBjb250ZW50LmVudGVyID0gR2FtZS5Db250cm9sLmVudGVyRGF0YTtcclxuICAgICAgICAgICAgY29udGVudC5lcnJvciA9IG5ldERhdGE7XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXBvcnRUb29sLlJlcG9ydENsaWVudEVycm9yKFwiRW50ZXJFcnJvclwiLCBjb250ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBoYW5kbGVyID0gdGhpcy5nZXRFcnJvckhhbmRsZXIobmV0RGF0YS5fcGFyYW0uX3BhcmEuX2Vycm5vKTtcclxuICAgICAgICBpZihoYW5kbGVyKVxyXG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlcihuZXREYXRhLl9wYXJhbS5fcGFyYS5fZXJybm8sIG5ldERhdGEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGVmdWx0RXJyb3JIYW5kbGVyKG5ldERhdGEuX3BhcmFtLl9wYXJhLl9lcnJubywgbmV0RGF0YS5fcGFyYW0uX3BhcmEuX2VycnN0cik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgZ2V0RXJyb3JIYW5kbGVyKGtleSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvckhhbmRsZXJNYXBba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICAvL+acjeWKoeWZqGVycm5v5piv5ZSv5LiA55qEXHJcbiAgICBwcml2YXRlIGRlZnVsdEVycm9ySGFuZGxlcihlcnJubywgZXJyb3JTdHIpXHJcbiAgICB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkZPUkNFX0hJREVfV0FJVElORyk7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLnN0b3BDaGVja01zZ1RpbWVyKCk7XHJcbiAgICAgICAgLy9wdnDnm7TmjqXlm57pgInlnLogIHB2ZemHjeaWsOi/m+a4uOaIj1xyXG4gICAgICAgIGlmKGVycm5vID09IHRoaXMuRVJST1JfTk9UX0lOX1RBQkxFKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5zZXJ2ZXIuc3RvcEdhbWUoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIuY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoR2FtZS5FVkVOVF9OT1RfSU5fVEFCTEUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGVycm5vID09IHRoaXMuRVJST1JfTE9XX0xJTUlUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIuc3RvcEdhbWUoKTtcclxuICAgICAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0ZPUkNFX0xFQVZFX0dBTUUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQuc2hvd01vbmV5Tm90RW5vdWdoKCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8xMDAw5Lul5LiLZXJyb3Lpu5jorqTpgIDlh7pcclxuICAgICAgICBpZihlcnJubyA8IDEwMDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlci5zdG9wR2FtZSgpO1xyXG4gICAgICAgICAgICBsZXQgZXJyRnVuYyA9ICgpPT57R2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0ZPUkNFX0xFQVZFX0dBTUUpO31cclxuICAgICAgICAgICAgbGV0IGVyciA9IGNjLmpzLmZvcm1hdFN0cihcIiVzWyVzXVwiLGVycm9yU3RyLGVycm5vKVxyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChlcnIsIGVyckZ1bmMsIGVyckZ1bmMpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihlcnJvclN0ciAmJiBlcnJvclN0ciAhPSBcIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgLy8gR2xvYmFsLlVJLmZhc3RUaXAoZXJyb3JTdHIrXCJbXCIrZXJybm8rXCJdXCIpO1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChlcnJvclN0citcIlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iXX0=