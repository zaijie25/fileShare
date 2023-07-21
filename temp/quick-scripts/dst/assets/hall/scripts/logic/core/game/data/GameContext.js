
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/data/GameContext.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b3b70i8wZZJ1ZDFG4hGQqwr', 'GameContext');
// hall/scripts/logic/core/game/data/GameContext.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//游戏运行时数据  每个游戏自己定制 
//数据挂在Game下面
var GameContext = /** @class */ (function () {
    function GameContext() {
        this.dataMap = {};
    }
    GameContext.prototype.set = function (key, value) {
        this.dataMap[key] = value;
    };
    GameContext.prototype.get = function (key) {
        return this.dataMap[key];
    };
    GameContext.prototype.remove = function (key) {
        this.dataMap[key] = null;
    };
    GameContext.prototype.getValue = function (key) {
        var data = this.dataMap[key];
        if (data == null)
            return null;
        return data;
    };
    //读取服务器配置
    GameContext.prototype.parseServerCfg = function (cfg) {
    };
    //单局结束 数据清理   
    //游戏结束 整个Context会被清空
    GameContext.prototype.clearByRound = function () {
    };
    return GameContext;
}());
exports.default = GameContext;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXGRhdGFcXEdhbWVDb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLFlBQVk7QUFDWjtJQUFBO1FBU1ksWUFBTyxHQUFHLEVBQUUsQ0FBQTtJQWtDeEIsQ0FBQztJQS9CVSx5QkFBRyxHQUFWLFVBQVcsR0FBVyxFQUFFLEtBQVU7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVNLHlCQUFHLEdBQVYsVUFBVyxHQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU0sNEJBQU0sR0FBYixVQUFjLEdBQVc7UUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVNLDhCQUFRLEdBQWYsVUFBbUIsR0FBRztRQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksSUFBSSxJQUFJLElBQUk7WUFDWixPQUFPLElBQUksQ0FBQztRQUNoQixPQUFPLElBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsU0FBUztJQUNGLG9DQUFjLEdBQXJCLFVBQXNCLEdBQUc7SUFHekIsQ0FBQztJQUVELGNBQWM7SUFDZCxvQkFBb0I7SUFDYixrQ0FBWSxHQUFuQjtJQUdBLENBQUM7SUFDTCxrQkFBQztBQUFELENBM0NBLEFBMkNDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvL+a4uOaIj+i/kOihjOaXtuaVsOaNriAg5q+P5Liq5ri45oiP6Ieq5bex5a6a5Yi2IFxyXG4vL+aVsOaNruaMguWcqEdhbWXkuIvpnaJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbnRleHQgXHJcbntcclxuICAgIC8vc2Vzc2lvbuaVsOaNrlxyXG4gICAgcHVibGljIHNlc3Npb246YW55O1xyXG4gICAgLy/mnI3liqHlmajmuLjmiI/phY3nva5cclxuICAgIHB1YmxpYyBzZXJ2ZXJHYW1lQ2ZnOmFueVxyXG4gICAgLy/oh6rlt7HnmoTluqfkvY3lj7dcclxuICAgIHB1YmxpYyBzZWxmU3JjO1xyXG5cclxuICAgIHByaXZhdGUgZGF0YU1hcCA9IHt9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5kYXRhTWFwW2tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0KGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YU1hcFtrZXldO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmUoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmRhdGFNYXBba2V5XSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFZhbHVlPFQ+KGtleSk6IFQge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhTWFwW2tleV07XHJcbiAgICAgICAgaWYgKGRhdGEgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGRhdGEgYXMgVDtcclxuICAgIH1cclxuXHJcbiAgICAvL+ivu+WPluacjeWKoeWZqOmFjee9rlxyXG4gICAgcHVibGljIHBhcnNlU2VydmVyQ2ZnKGNmZylcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/ljZXlsYDnu5PmnZ8g5pWw5o2u5riF55CGICAgXHJcbiAgICAvL+a4uOaIj+e7k+adnyDmlbTkuKpDb250ZXh05Lya6KKr5riF56m6XHJcbiAgICBwdWJsaWMgY2xlYXJCeVJvdW5kKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbn0iXX0=