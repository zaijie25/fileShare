"use strict";
cc._RF.push(module, 'bdacdwQXdVN35vo7hrwOaL5', 'DdzPokerTypeData');
// ddz/ddz/scripts/tool/DdzPokerTypeData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DdzPlayRule_1 = require("./DdzPlayRule");
var DdzPokerTypeData = /** @class */ (function () {
    /**
     *
     * @param type 牌型
     * @param count 组成牌型权柄数 连对对子数 飞机数 顺子连续数 其他是牌数量
     * @param weight 牌型对应权重
     */
    function DdzPokerTypeData(type, count, weight) {
        if (type === void 0) { type = 0; }
        if (count === void 0) { count = 0; }
        if (weight === void 0) { weight = 0; }
        this.type = type;
        this.count = count;
        this.weight = weight;
    }
    DdzPokerTypeData.prototype.getData = function () {
        return [this.type, this.count, this.weight];
    };
    DdzPokerTypeData.prototype.isDataValid = function () {
        return this.type > DdzPlayRule_1.DdzPlayTypeDefine.DDZ_NONE;
    };
    return DdzPokerTypeData;
}());
exports.default = DdzPokerTypeData;

cc._RF.pop();