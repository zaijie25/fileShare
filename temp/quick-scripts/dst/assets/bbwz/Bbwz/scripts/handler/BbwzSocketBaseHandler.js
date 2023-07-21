
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/handler/BbwzSocketBaseHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '07b1bv8dJNFY5r2ZVSRcdSq', 'BbwzSocketBaseHandler');
// bbwz/Bbwz/scripts/handler/BbwzSocketBaseHandler.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 协议处理基类，注意入队列的处理
 */
var BbwzSocketBaseHandler = /** @class */ (function () {
    function BbwzSocketBaseHandler() {
    }
    //判断协议是否需要入队列，默认入队列
    BbwzSocketBaseHandler.prototype.checkInQueue = function (msgParam) {
        return true;
    };
    BbwzSocketBaseHandler.prototype.Handle = function (msgParam) {
        this.handleData(msgParam);
    };
    //业务逻辑处理
    BbwzSocketBaseHandler.prototype.execute = function (msgParam) { };
    //重连逻辑处理
    BbwzSocketBaseHandler.prototype.executeSync = function (msgParam) {
        this.execute(msgParam);
    };
    return BbwzSocketBaseHandler;
}());
exports.default = BbwzSocketBaseHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcaGFuZGxlclxcQmJ3elNvY2tldEJhc2VIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSDtJQUFBO0lBZ0JBLENBQUM7SUFmRyxtQkFBbUI7SUFDWiw0Q0FBWSxHQUFuQixVQUFvQixRQUFRO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTSxzQ0FBTSxHQUFiLFVBQWMsUUFBUTtRQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFHRCxRQUFRO0lBQ0UsdUNBQU8sR0FBakIsVUFBa0IsUUFBUSxJQUFJLENBQUM7SUFDL0IsUUFBUTtJQUNFLDJDQUFXLEdBQXJCLFVBQXNCLFFBQVE7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0wsNEJBQUM7QUFBRCxDQWhCQSxBQWdCQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOWNj+iuruWkhOeQhuWfuuexu++8jOazqOaEj+WFpemYn+WIl+eahOWkhOeQhlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmJ3elNvY2tldEJhc2VIYW5kbGVyIHtcclxuICAgIC8v5Yik5pat5Y2P6K6u5piv5ZCm6ZyA6KaB5YWl6Zif5YiX77yM6buY6K6k5YWl6Zif5YiXXHJcbiAgICBwdWJsaWMgY2hlY2tJblF1ZXVlKG1zZ1BhcmFtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgSGFuZGxlKG1zZ1BhcmFtKSB7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVEYXRhKG1zZ1BhcmFtKTtcclxuICAgIH1cclxuICAgIC8v5pWw5o2u6YC76L6R5aSE55CGXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgaGFuZGxlRGF0YShtc2dQYXJhbSk7XHJcbiAgICAvL+S4muWKoemAu+i+keWkhOeQhlxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnUGFyYW0pIHsgfVxyXG4gICAgLy/ph43ov57pgLvovpHlpITnkIZcclxuICAgIHByb3RlY3RlZCBleGVjdXRlU3luYyhtc2dQYXJhbSkge1xyXG4gICAgICAgIHRoaXMuZXhlY3V0ZShtc2dQYXJhbSk7XHJcbiAgICB9XHJcbn0iXX0=