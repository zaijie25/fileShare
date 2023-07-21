"use strict";
cc._RF.push(module, '48058r/wTREcIsqwbTq8Lm5', 'CommandDefine');
// hall/scripts/logic/core/game/CommandDefine.ts

"use strict";
//游戏通用协议定义
//每个子游戏对应一个子游戏命令定义
Object.defineProperty(exports, "__esModule", { value: true });
var GameCommand = /** @class */ (function () {
    function GameCommand() {
        this.HeartBeat = "*he1*"; //心跳
        this.GameCfg = "*a*"; //游戏配置
        this.Session = "*sss*";
        this.Enter = "*en1*";
        this.Leave = "*lee*";
        // enter 前的匹配
        this.WaitMatch = "wait_match";
    }
    return GameCommand;
}());
exports.default = GameCommand;

cc._RF.pop();