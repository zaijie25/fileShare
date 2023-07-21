
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/handlers/DdzBaseHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c780bQQZs9Af5IjaoC767hL', 'DdzBaseHandler');
// ddz/ddz/scripts/handlers/DdzBaseHandler.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DdzDriver_1 = require("../DdzDriver");
var DdzBaseHandler = /** @class */ (function () {
    function DdzBaseHandler() {
    }
    //判断协议是否需要进入队列
    DdzBaseHandler.prototype.checkInQueue = function (msgParam) {
        return true;
    };
    //协议处理入口
    DdzBaseHandler.prototype.Handle = function (msgParam) {
        this.mainUI = DdzDriver_1.default.instance.mainUI;
        this.context = DdzDriver_1.default.instance.Context;
        this.Define = DdzDriver_1.default.instance.Define;
        this.SitHelper = DdzDriver_1.default.instance.SitHelper;
        this.Path = DdzDriver_1.default.instance.Path;
        this.refreshData(msgParam);
        //重连执行executeSync 正常执行execute
        if (this.context.syncMode)
            this.executeSync(msgParam);
        else
            this.execute(msgParam);
    };
    //数据刷新入口
    DdzBaseHandler.prototype.refreshData = function (msgParam) { };
    //正常流程逻辑处理
    DdzBaseHandler.prototype.execute = function (msgParam) { };
    //重连流程逻辑处理
    //默认为execute  如果涉及到动画   需要重写
    DdzBaseHandler.prototype.executeSync = function (msgParam) {
        this.execute(msgParam);
    };
    return DdzBaseHandler;
}());
exports.default = DdzBaseHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGhhbmRsZXJzXFxEZHpCYXNlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLDBDQUFxQztBQUVyQztJQUFBO0lBMkNBLENBQUM7SUFwQ0csY0FBYztJQUNQLHFDQUFZLEdBQW5CLFVBQW9CLFFBQVE7UUFFeEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFFBQVE7SUFDRCwrQkFBTSxHQUFiLFVBQWMsUUFBUTtRQUVsQixJQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxHQUFHLG1CQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLDZCQUE2QjtRQUM3QixJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBOztZQUUxQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFQyxRQUFRO0lBQ0Usb0NBQVcsR0FBckIsVUFBc0IsUUFBUSxJQUM3QixDQUFDO0lBRUYsVUFBVTtJQUNBLGdDQUFPLEdBQWpCLFVBQWtCLFFBQVEsSUFDekIsQ0FBQztJQUVGLFVBQVU7SUFDViw0QkFBNEI7SUFDbEIsb0NBQVcsR0FBckIsVUFBc0IsUUFBUTtRQUUxQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDUCxxQkFBQztBQUFELENBM0NBLEFBMkNDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGR6TWFpblVJIGZyb20gXCIuLi9wYW5lbC9EZHpNYWluVUlcIjtcclxuaW1wb3J0IERkekNvbnRleHQgZnJvbSBcIi4uL2RhdGEvRGR6Q29udGV4dFwiO1xyXG5pbXBvcnQgRGR6RGVmaW5lIGZyb20gXCIuLi9kYXRhL0RkekRlZmluZVwiO1xyXG5pbXBvcnQgRGR6UGF0aEhlbHBlciBmcm9tIFwiLi4vZGF0YS9EZHpQYXRoSGVscGVyXCI7XHJcbmltcG9ydCBEZHpEcml2ZXIgZnJvbSBcIi4uL0RkekRyaXZlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6QmFzZUhhbmRsZXJcclxueyAgICBcclxuICAgIHByb3RlY3RlZCBtYWluVUk6IERkek1haW5VSTtcclxuICAgIHByb3RlY3RlZCBjb250ZXh0OiBEZHpDb250ZXh0O1xyXG4gICAgcHJvdGVjdGVkIERlZmluZTogRGR6RGVmaW5lO1xyXG4gICAgcHJvdGVjdGVkIFNpdEhlbHBlcjogUFZQU2l0SGVscGVyO1xyXG4gICAgcHJvdGVjdGVkIFBhdGg6IERkelBhdGhIZWxwZXI7XHJcbiAgICAvL+WIpOaWreWNj+iuruaYr+WQpumcgOimgei/m+WFpemYn+WIl1xyXG4gICAgcHVibGljIGNoZWNrSW5RdWV1ZShtc2dQYXJhbSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/ljY/orq7lpITnkIblhaXlj6NcclxuICAgIHB1YmxpYyBIYW5kbGUobXNnUGFyYW0pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tYWluVUkgPSBEZHpEcml2ZXIuaW5zdGFuY2UubWFpblVJO1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IERkekRyaXZlci5pbnN0YW5jZS5Db250ZXh0O1xyXG4gICAgICAgIHRoaXMuRGVmaW5lID0gRGR6RHJpdmVyLmluc3RhbmNlLkRlZmluZTtcclxuICAgICAgICB0aGlzLlNpdEhlbHBlciA9IERkekRyaXZlci5pbnN0YW5jZS5TaXRIZWxwZXI7XHJcbiAgICAgICAgdGhpcy5QYXRoID0gRGR6RHJpdmVyLmluc3RhbmNlLlBhdGg7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoRGF0YShtc2dQYXJhbSk7XHJcbiAgICAgICAgLy/ph43ov57miafooYxleGVjdXRlU3luYyDmraPluLjmiafooYxleGVjdXRlXHJcbiAgICAgICAgaWYodGhpcy5jb250ZXh0LnN5bmNNb2RlKVxyXG4gICAgICAgICAgICB0aGlzLmV4ZWN1dGVTeW5jKG1zZ1BhcmFtKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5leGVjdXRlKG1zZ1BhcmFtKTtcclxuICAgIH1cclxuICBcclxuICAgICAgLy/mlbDmja7liLfmlrDlhaXlj6NcclxuICAgICAgcHJvdGVjdGVkIHJlZnJlc2hEYXRhKG1zZ1BhcmFtKVxyXG4gICAgICB7fVxyXG4gIFxyXG4gICAgICAvL+ato+W4uOa1geeoi+mAu+i+keWkhOeQhlxyXG4gICAgICBwcm90ZWN0ZWQgZXhlY3V0ZShtc2dQYXJhbSlcclxuICAgICAge31cclxuICBcclxuICAgICAgLy/ph43ov57mtYHnqIvpgLvovpHlpITnkIZcclxuICAgICAgLy/pu5jorqTkuLpleGVjdXRlICDlpoLmnpzmtonlj4rliLDliqjnlLsgICDpnIDopoHph43lhplcclxuICAgICAgcHJvdGVjdGVkIGV4ZWN1dGVTeW5jKG1zZ1BhcmFtKVxyXG4gICAgICB7XHJcbiAgICAgICAgICB0aGlzLmV4ZWN1dGUobXNnUGFyYW0pO1xyXG4gICAgICB9XHJcbn0iXX0=