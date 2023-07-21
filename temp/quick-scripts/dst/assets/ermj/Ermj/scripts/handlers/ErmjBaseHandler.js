
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjBaseHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0278b2iieRKTakXXvSQK16I', 'ErmjBaseHandler');
// ermj/Ermj/scripts/handlers/ErmjBaseHandler.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErmjDriver_1 = require("../ErmjDriver");
var ErmjBaseHandler = /** @class */ (function () {
    function ErmjBaseHandler() {
    }
    //判断协议是否需要进入队列
    ErmjBaseHandler.prototype.checkInQueue = function (msgParam) {
        return true;
    };
    //协议处理入口
    ErmjBaseHandler.prototype.Handle = function (msgParam) {
        this.mainUI = ErmjDriver_1.default.instance.mainUI;
        this.context = ErmjDriver_1.default.instance.Context;
        this.Define = ErmjDriver_1.default.instance.Define;
        this.SitHelper = ErmjDriver_1.default.instance.SitHelper;
        this.Path = ErmjDriver_1.default.instance.Path;
        this.refreshData(msgParam);
        //重连执行executeSync 正常执行execute
        if (this.context.syncMode)
            this.executeSync(msgParam);
        else
            this.execute(msgParam);
    };
    //数据刷新入口
    ErmjBaseHandler.prototype.refreshData = function (msgParam) { };
    //正常流程逻辑处理
    ErmjBaseHandler.prototype.execute = function (msgParam) { };
    //重连流程逻辑处理
    //默认为execute  如果涉及到动画   需要重写
    ErmjBaseHandler.prototype.executeSync = function (msgParam) {
        this.execute(msgParam);
    };
    return ErmjBaseHandler;
}());
exports.default = ErmjBaseHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpCYXNlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLDRDQUF1QztBQUV2QztJQUFBO0lBMkNBLENBQUM7SUFwQ0csY0FBYztJQUNQLHNDQUFZLEdBQW5CLFVBQW9CLFFBQVE7UUFFeEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFFBQVE7SUFDRCxnQ0FBTSxHQUFiLFVBQWMsUUFBUTtRQUVsQixJQUFJLENBQUMsTUFBTSxHQUFHLG9CQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLG9CQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLG9CQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLG9CQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFHLG9CQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLDZCQUE2QjtRQUM3QixJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBOztZQUUxQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFQyxRQUFRO0lBQ0UscUNBQVcsR0FBckIsVUFBc0IsUUFBUSxJQUM3QixDQUFDO0lBRUYsVUFBVTtJQUNBLGlDQUFPLEdBQWpCLFVBQWtCLFFBQVEsSUFDekIsQ0FBQztJQUVGLFVBQVU7SUFDViw0QkFBNEI7SUFDbEIscUNBQVcsR0FBckIsVUFBc0IsUUFBUTtRQUUxQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDUCxzQkFBQztBQUFELENBM0NBLEFBMkNDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtak1haW5VSSBmcm9tIFwiLi4vcGFuZWwvRXJtak1haW5VSVwiO1xyXG5pbXBvcnQgRXJtakNvbnRleHQgZnJvbSBcIi4uL2RhdGEvRXJtakNvbnRleHRcIjtcclxuaW1wb3J0IEVybWpEZWZpbmUgZnJvbSBcIi4uL2RhdGEvRXJtakRlZmluZVwiO1xyXG5pbXBvcnQgRXJtalBhdGhIZWxwZXIgZnJvbSBcIi4uL2RhdGEvRXJtalBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IEVybWpEcml2ZXIgZnJvbSBcIi4uL0VybWpEcml2ZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpCYXNlSGFuZGxlclxyXG57ICAgIFxyXG4gICAgcHJvdGVjdGVkIG1haW5VSTogRXJtak1haW5VSTtcclxuICAgIHByb3RlY3RlZCBjb250ZXh0OiBFcm1qQ29udGV4dDtcclxuICAgIHByb3RlY3RlZCBEZWZpbmU6IEVybWpEZWZpbmU7XHJcbiAgICBwcm90ZWN0ZWQgU2l0SGVscGVyOiBQVlBTaXRIZWxwZXI7XHJcbiAgICBwcm90ZWN0ZWQgUGF0aDogRXJtalBhdGhIZWxwZXI7XHJcbiAgICAvL+WIpOaWreWNj+iuruaYr+WQpumcgOimgei/m+WFpemYn+WIl1xyXG4gICAgcHVibGljIGNoZWNrSW5RdWV1ZShtc2dQYXJhbSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/ljY/orq7lpITnkIblhaXlj6NcclxuICAgIHB1YmxpYyBIYW5kbGUobXNnUGFyYW0pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tYWluVUkgPSBFcm1qRHJpdmVyLmluc3RhbmNlLm1haW5VSTtcclxuICAgICAgICB0aGlzLmNvbnRleHQgPSBFcm1qRHJpdmVyLmluc3RhbmNlLkNvbnRleHQ7XHJcbiAgICAgICAgdGhpcy5EZWZpbmUgPSBFcm1qRHJpdmVyLmluc3RhbmNlLkRlZmluZTtcclxuICAgICAgICB0aGlzLlNpdEhlbHBlciA9IEVybWpEcml2ZXIuaW5zdGFuY2UuU2l0SGVscGVyO1xyXG4gICAgICAgIHRoaXMuUGF0aCA9IEVybWpEcml2ZXIuaW5zdGFuY2UuUGF0aDtcclxuICAgICAgICB0aGlzLnJlZnJlc2hEYXRhKG1zZ1BhcmFtKTtcclxuICAgICAgICAvL+mHjei/nuaJp+ihjGV4ZWN1dGVTeW5jIOato+W4uOaJp+ihjGV4ZWN1dGVcclxuICAgICAgICBpZih0aGlzLmNvbnRleHQuc3luY01vZGUpXHJcbiAgICAgICAgICAgIHRoaXMuZXhlY3V0ZVN5bmMobXNnUGFyYW0pXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLmV4ZWN1dGUobXNnUGFyYW0pO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgICAvL+aVsOaNruWIt+aWsOWFpeWPo1xyXG4gICAgICBwcm90ZWN0ZWQgcmVmcmVzaERhdGEobXNnUGFyYW0pXHJcbiAgICAgIHt9XHJcbiAgXHJcbiAgICAgIC8v5q2j5bi45rWB56iL6YC76L6R5aSE55CGXHJcbiAgICAgIHByb3RlY3RlZCBleGVjdXRlKG1zZ1BhcmFtKVxyXG4gICAgICB7fVxyXG4gIFxyXG4gICAgICAvL+mHjei/nua1geeoi+mAu+i+keWkhOeQhlxyXG4gICAgICAvL+m7mOiupOS4umV4ZWN1dGUgIOWmguaenOa2ieWPiuWIsOWKqOeUuyAgIOmcgOimgemHjeWGmVxyXG4gICAgICBwcm90ZWN0ZWQgZXhlY3V0ZVN5bmMobXNnUGFyYW0pXHJcbiAgICAgIHtcclxuICAgICAgICAgIHRoaXMuZXhlY3V0ZShtc2dQYXJhbSk7XHJcbiAgICAgIH1cclxufSJdfQ==