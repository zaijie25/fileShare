
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/CommandDefine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXENvbW1hbmREZWZpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFVBQVU7QUFDVixrQkFBa0I7O0FBRWxCO0lBQUE7UUFFVyxjQUFTLEdBQUcsT0FBTyxDQUFDLENBQUUsSUFBSTtRQUMxQixZQUFPLEdBQUcsS0FBSyxDQUFDLENBQUcsTUFBTTtRQUN6QixZQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ2xCLFVBQUssR0FBRyxPQUFPLENBQUM7UUFDaEIsVUFBSyxHQUFHLE9BQU8sQ0FBQztRQUV2QixhQUFhO1FBQ04sY0FBUyxHQUFHLFlBQVksQ0FBQztJQUNwQyxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQVZBLEFBVUMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8v5ri45oiP6YCa55So5Y2P6K6u5a6a5LmJXHJcbi8v5q+P5Liq5a2Q5ri45oiP5a+55bqU5LiA5Liq5a2Q5ri45oiP5ZG95Luk5a6a5LmJXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29tbWFuZFxyXG57XHJcbiAgICBwdWJsaWMgSGVhcnRCZWF0ID0gXCIqaGUxKlwiOyAgLy/lv4Pot7NcclxuICAgIHB1YmxpYyBHYW1lQ2ZnID0gXCIqYSpcIjsgICAvL+a4uOaIj+mFjee9rlxyXG4gICAgcHVibGljIFNlc3Npb24gPSBcIipzc3MqXCI7ICBcclxuICAgIHB1YmxpYyBFbnRlciA9IFwiKmVuMSpcIjtcclxuICAgIHB1YmxpYyBMZWF2ZSA9IFwiKmxlZSpcIjtcclxuICAgIFxyXG4gICAgLy8gZW50ZXIg5YmN55qE5Yy56YWNXHJcbiAgICBwdWJsaWMgV2FpdE1hdGNoID0gXCJ3YWl0X21hdGNoXCI7XHJcbn0iXX0=