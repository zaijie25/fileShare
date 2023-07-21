"use strict";
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