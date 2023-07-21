"use strict";
cc._RF.push(module, '7334bfj8wdNX5YgK1DJ7My6', 'BbwzBetGameTool');
// bbwz/Bbwz/scripts/tool/BbwzBetGameTool.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BbwzBetGameTool = /** @class */ (function () {
    function BbwzBetGameTool() {
    }
    //数组乱序
    BbwzBetGameTool.shuffle = function (array) {
        return Global.Toolkit.getOutOrderArray(array);
    };
    // 获取(0, 1)之间随机数
    BbwzBetGameTool.random = function () {
        return Math.random();
    };
    // 获取(-1, 1)之间随机数
    BbwzBetGameTool.signedRandom = function () {
        return Math.random() * -2 + 1;
    };
    return BbwzBetGameTool;
}());
exports.default = BbwzBetGameTool;

cc._RF.pop();