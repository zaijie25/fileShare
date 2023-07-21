"use strict";
cc._RF.push(module, 'b360fH7OfdGcKWD88WmgU78', 'DdzContext');
// ddz/ddz/scripts/data/DdzContext.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DdzGameEvent_1 = require("./DdzGameEvent");
var DdzRuleConst_1 = require("./DdzRuleConst");
var DdzContext = /** @class */ (function () {
    function DdzContext() {
        //是否处于重连阶段
        this.syncMode = false;
        //玩家数据列表
        this.playerList = [];
        this.dataMap = {};
        this.selectPokerList = [];
        this.selectPokerMap = {};
        // 记牌器数据, 记录出过的牌
        this.pokerMarkerData = [];
        // 自己手牌
        this.pokerSelfHand = [];
        this._isWaitMatch = false;
        this._mode = DdzRuleConst_1.DdzMode.Normal;
    }
    Object.defineProperty(DdzContext.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (value) {
            this._mode = value == 1 ? DdzRuleConst_1.DdzMode.Quick : DdzRuleConst_1.DdzMode.Normal;
        },
        enumerable: false,
        configurable: true
    });
    DdzContext.prototype.set = function (key, value) {
        this.dataMap[key] = value;
    };
    DdzContext.prototype.get = function (key) {
        return this.dataMap[key];
    };
    DdzContext.prototype.remove = function (key) {
        this.dataMap[key] = null;
    };
    DdzContext.prototype.getValue = function (key) {
        var data = this.dataMap[key];
        if (data == null)
            return null;
        return data;
    };
    DdzContext.prototype.addSelectPoker = function (pokerValue, order) {
        this.selectPokerList.push(pokerValue);
        this.selectPokerMap[order] = pokerValue;
        Game.Event.event(DdzGameEvent_1.default.EnableSelect, this.selectPokerList.length);
    };
    DdzContext.prototype.removeSelectPoker = function (pokerValue, order) {
        var index = this.selectPokerList.indexOf(pokerValue);
        if (index > -1) {
            this.selectPokerList.splice(index, 1);
            this.selectPokerMap[order] = null;
        }
        Game.Event.event(DdzGameEvent_1.default.EnableSelect, this.selectPokerList.length);
    };
    DdzContext.prototype.getSelectPokers = function () {
        // let result = this.selectPokerList.filter((item, index, arr)=> arr.indexOf(item) === index); //去重
        return this.selectPokerList;
    };
    DdzContext.prototype.getSelectPokersMap = function () {
        return this.selectPokerMap;
    };
    DdzContext.prototype.clearSelectPokerCache = function () {
        this.selectPokerList = [];
        this.selectPokerMap = {};
        Game.Event.event(DdzGameEvent_1.default.EnableSelect, this.selectPokerList.length);
    };
    DdzContext.prototype.updateMarkerData = function (arr) {
        this.pokerMarkerData = this.pokerMarkerData.concat(arr);
        Game.Event.event(DdzGameEvent_1.default.UpdateMarker, this.pokerMarkerData.length);
    };
    DdzContext.prototype.getMarkerData = function () {
        return this.pokerMarkerData;
    };
    /**
     *
     * @param arr
     * @param isFirst 添加标志区别发牌和地主牌  debug 避免不叫地主重发牌 牌数组一直拼接的问题
     */
    DdzContext.prototype.addSelfHandPokers = function (arr, isFirst) {
        if (isFirst === void 0) { isFirst = false; }
        if (isFirst) {
            this.pokerSelfHand = [];
        }
        this.pokerSelfHand = this.pokerSelfHand.concat(arr);
    };
    DdzContext.prototype.removeSelfHandPokers = function (arr) {
        var _this = this;
        arr.forEach(function (num) {
            var index = _this.pokerSelfHand.indexOf(num);
            if (index > -1)
                _this.pokerSelfHand.splice(index, 1);
        });
    };
    DdzContext.prototype.refreshHandPokers = function (pokerArr) {
        this.pokerSelfHand = pokerArr;
    };
    DdzContext.prototype.getSelfHandPokers = function () {
        return this.pokerSelfHand;
    };
    Object.defineProperty(DdzContext.prototype, "isWaitMatch", {
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
    //单局结束 数据清理   
    //游戏结束 整个Context会被清空
    DdzContext.prototype.clearByRound = function () {
        this.dataMap = {};
        this.pokerMarkerData = [];
        this.pokerSelfHand = [];
        this.syncMode = false;
        this.clearSelectPokerCache();
    };
    DdzContext.prototype.clearByGame = function () {
        this.playerList = [];
        this.dataMap = {};
        this.pokerMarkerData = [];
        this.pokerSelfHand = [];
        this.session = null;
        this.serverGameCfg = null;
        this.syncMode = false;
        this.clearSelectPokerCache();
        this._isWaitMatch = false;
    };
    return DdzContext;
}());
exports.default = DdzContext;

cc._RF.pop();