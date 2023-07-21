"use strict";
cc._RF.push(module, '479d7sNeS1JT5OzKoexLEuB', 'ErmjContext');
// ermj/Ermj/scripts/data/ErmjContext.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErmjContext = /** @class */ (function () {
    function ErmjContext() {
        //是否处于重连阶段
        this.syncMode = false;
        //玩家数据列表
        this.playerList = [];
        this.dataMap = {};
        this.selfLocalSeat = 0; // 自己固定本地座位0, 头像、手牌、牌墙都设定本机为0
        this._isWaitMatch = false;
        this._cmdAuto = false;
    }
    ErmjContext.prototype.set = function (key, value) {
        this.dataMap[key] = value;
    };
    ErmjContext.prototype.get = function (key) {
        return this.dataMap[key];
    };
    ErmjContext.prototype.remove = function (key) {
        this.dataMap[key] = null;
    };
    ErmjContext.prototype.getValue = function (key) {
        var data = this.dataMap[key];
        if (data == null)
            return null;
        return data;
    };
    Object.defineProperty(ErmjContext.prototype, "isWaitMatch", {
        get: function () {
            return this._isWaitMatch;
        },
        // 是否匹配中状态
        set: function (flag) {
            this._isWaitMatch = flag;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErmjContext.prototype, "isCmdAuto", {
        get: function () {
            return this._cmdAuto;
        },
        // 是否挂机状态
        set: function (flag) {
            this._cmdAuto = flag;
        },
        enumerable: false,
        configurable: true
    });
    //单局结束 数据清理   
    //游戏结束 整个Context会被清空
    ErmjContext.prototype.clearByRound = function () {
        this.dataMap = {};
        this.syncMode = false;
    };
    ErmjContext.prototype.clearByGame = function () {
        this.playerList = [];
        this.dataMap = {};
        this.session = null;
        this.serverGameCfg = null;
        this.syncMode = false;
        this._isWaitMatch = false;
    };
    return ErmjContext;
}());
exports.default = ErmjContext;

cc._RF.pop();