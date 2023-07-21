"use strict";
cc._RF.push(module, 'c667epedh1NqqASVeoZq0c8', 'BbwzHistoryData');
// bbwz/Bbwz/scripts/data/BbwzHistoryData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BbwzConstDefine_1 = require("./BbwzConstDefine");
var BbwzGameEvent_1 = require("./BbwzGameEvent");
var BbwzDriver_1 = require("../BbwzDriver");
var updateInterval = 5;
var BbwzHistoryData = /** @class */ (function () {
    function BbwzHistoryData() {
        this.trendDataList = [];
        this.longCount = 0;
        this.huCount = 0;
        this.heCount = 0;
        this.tableID = ""; // 牌桌唯一标识
        this.tableName = "牌桌名字";
        this.onlinePlayer = 0; // 在线人数
        this.tableState = 0; // 牌桌状态 0-等待开局 1-开始下注 2-下注结束 3-开奖
        this.betLeftTime = 13; // 开始下注倒计时：秒，带小数点
        this.dtTotal = 0;
        this.reqEnable = false;
    }
    // 设置数据
    BbwzHistoryData.prototype.parseServerCfg = function (cfg) {
        var _this = this;
        this.trendDataList = cfg.AwardList || [];
        this.longCount = 0;
        this.huCount = 0;
        this.heCount = 0;
        this.trendDataList.forEach(function (element) {
            var hit = element.hit;
            if (hit.mix > 0) {
                _this.heCount++;
                element.result = 0;
            }
            if (hit.dragon > 0) {
                _this.longCount++;
                element.result = 1;
            }
            if (hit.tiger > 0) {
                _this.huCount++;
                element.result = 2;
            }
        });
        // 以下暂时用不上
        this.rateTag = cfg.rate_tag;
        this.tableID = cfg.level;
        this.onlinePlayer = cfg.player_count;
        this.tableState = cfg.status;
        this.betLeftTime = cfg.count_down;
    };
    BbwzHistoryData.prototype.clear = function () {
        this.trendDataList = [];
        this.longCount = 0;
        this.huCount = 0;
        this.heCount = 0;
    };
    BbwzHistoryData.prototype.onUpdate = function (dt) {
        if (!this.reqEnable)
            return;
        this.dtTotal += dt;
        if (this.dtTotal < updateInterval)
            return;
        this.reqGameHisData();
    };
    BbwzHistoryData.prototype.reqGameHisData = function () {
        var _this = this;
        this.dtTotal = 0;
        Global.HallServer.send(NetAppface.mod, "GetGameData", { "gid": BbwzConstDefine_1.default.GAME_ID }, function (_param) {
            if (!BbwzDriver_1.default.instance || !BbwzDriver_1.default.instance.inGame) // 容错 不依赖大厅的协议跨场景丢弃
                return;
            var dataArr = _param.Data;
            if (dataArr && dataArr.length > 0) {
                for (var i = 0; i < dataArr.length; i++) {
                    var data = dataArr[i];
                    if (data.gid == BbwzConstDefine_1.default.GAME_ID && data.level == Game.Control.curLv) {
                        _this.parseServerCfg(data);
                        Game.Event.event(BbwzGameEvent_1.default.onHistoryDataRes, _this.trendDataList);
                        break;
                    }
                }
            }
        }, null, false);
    };
    return BbwzHistoryData;
}());
exports.default = BbwzHistoryData;

cc._RF.pop();