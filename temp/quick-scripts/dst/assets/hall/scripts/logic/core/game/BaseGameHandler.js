
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/BaseGameHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9ea4cMufLdKTKca6p77odEA', 'BaseGameHandler');
// hall/scripts/logic/core/game/BaseGameHandler.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//一个handler对应一条协议，只做逻辑处理，内部不保留数据
var BaseGameHandler = /** @class */ (function () {
    function BaseGameHandler() {
    }
    //判断协议是否需要如队列
    BaseGameHandler.prototype.checkInQueue = function (msgParam) {
        return true;
    };
    BaseGameHandler.prototype.Handle = function (msgParam) {
    };
    //预处理数据 
    BaseGameHandler.prototype.prepare = function (msg) {
        return null;
    };
    //解析pb
    BaseGameHandler.prototype.decodePb = function (msg) {
        return null;
    };
    return BaseGameHandler;
}());
exports.default = BaseGameHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXEJhc2VHYW1lSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdDQUFnQztBQUNoQztJQUFBO0lBd0JBLENBQUM7SUFyQkcsYUFBYTtJQUNOLHNDQUFZLEdBQW5CLFVBQW9CLFFBQVE7UUFFeEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLGdDQUFNLEdBQWIsVUFBYyxRQUFRO0lBRXRCLENBQUM7SUFFRCxRQUFRO0lBQ0QsaUNBQU8sR0FBZCxVQUFlLEdBQUc7UUFFZCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsTUFBTTtJQUNDLGtDQUFRLEdBQWYsVUFBZ0IsR0FBRztRQUVmLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxzQkFBQztBQUFELENBeEJBLEFBd0JDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL+S4gOS4qmhhbmRsZXLlr7nlupTkuIDmnaHljY/orq7vvIzlj6rlgZrpgLvovpHlpITnkIbvvIzlhoXpg6jkuI3kv53nlZnmlbDmja5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZUdhbWVIYW5kbGVyXHJcbntcclxuXHJcbiAgICAvL+WIpOaWreWNj+iuruaYr+WQpumcgOimgeWmgumYn+WIl1xyXG4gICAgcHVibGljIGNoZWNrSW5RdWV1ZShtc2dQYXJhbSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgSGFuZGxlKG1zZ1BhcmFtKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIC8v6aKE5aSE55CG5pWw5o2uIFxyXG4gICAgcHVibGljIHByZXBhcmUobXNnKTphbnlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+ino+aekHBiXHJcbiAgICBwdWJsaWMgZGVjb2RlUGIobXNnKTphbnlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG4iXX0=