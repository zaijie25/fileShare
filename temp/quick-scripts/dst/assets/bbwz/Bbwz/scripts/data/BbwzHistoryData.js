
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/data/BbwzHistoryData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcZGF0YVxcQmJ3ekhpc3RvcnlEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBQ2hELGlEQUE0QztBQUM1Qyw0Q0FBdUM7QUFFdkMsSUFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCO0lBQUE7UUFDVyxrQkFBYSxHQUFVLEVBQUUsQ0FBQztRQUMxQixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFFWixZQUFPLEdBQVcsRUFBRSxDQUFDLENBQVEsU0FBUztRQUN0QyxjQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ25CLGlCQUFZLEdBQUcsQ0FBQyxDQUFDLENBQVksT0FBTztRQUNwQyxlQUFVLEdBQUcsQ0FBQyxDQUFDLENBQWMsaUNBQWlDO1FBQzlELGdCQUFXLEdBQUcsRUFBRSxDQUFDLENBQWUsaUJBQWlCO1FBRWhELFlBQU8sR0FBRyxDQUFDLENBQUM7UUFDYixjQUFTLEdBQUcsS0FBSyxDQUFDO0lBcUU3QixDQUFDO0lBbkVHLE9BQU87SUFDQyx3Q0FBYyxHQUF0QixVQUF1QixHQUFRO1FBQS9CLGlCQTRCQztRQTNCRyxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO1FBRXpDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztZQUM5QixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ3RCLElBQUksR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsS0FBSSxDQUFD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ImltcG9ydCBCYnd6Q29uc3REZWZpbmUgZnJvbSBcIi4vQmJ3ekNvbnN0RGVmaW5lXCI7XHJcbmltcG9ydCBCYnd6R2FtZUV2ZW50IGZyb20gXCIuL0Jid3pHYW1lRXZlbnRcIjtcclxuaW1wb3J0IEJid3pEcml2ZXIgZnJvbSBcIi4uL0Jid3pEcml2ZXJcIjtcclxuXHJcbmNvbnN0IHVwZGF0ZUludGVydmFsID0gNTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmJ3ekhpc3RvcnlEYXRhe1xyXG4gICAgcHVibGljIHRyZW5kRGF0YUxpc3Q6IGFueVtdID0gW107XHJcbiAgICBwdWJsaWMgbG9uZ0NvdW50ID0gMDtcclxuICAgIHB1YmxpYyBodUNvdW50ID0gMDtcclxuICAgIHB1YmxpYyBoZUNvdW50ID0gMDtcclxuICAgIHB1YmxpYyByYXRlVGFnOiBudW1iZXI7ICAgICAgICAgICAgIC8vIOWcuuWtkOagh+etviAxLeS9juWAjeWcuiAyLeS4reWAjeWcuiAzLemrmOWAjeWculxyXG4gICAgcHVibGljIHRhYmxlSUQ6IHN0cmluZyA9IFwiXCI7ICAgICAgICAvLyDniYzmoYzllK/kuIDmoIfor4ZcclxuICAgIHB1YmxpYyB0YWJsZU5hbWUgPSBcIueJjOahjOWQjeWtl1wiO1xyXG4gICAgcHVibGljIG9ubGluZVBsYXllciA9IDA7ICAgICAgICAgICAgLy8g5Zyo57q/5Lq65pWwXHJcbiAgICBwdWJsaWMgdGFibGVTdGF0ZSA9IDA7ICAgICAgICAgICAgICAvLyDniYzmoYznirbmgIEgMC3nrYnlvoXlvIDlsYAgMS3lvIDlp4vkuIvms6ggMi3kuIvms6jnu5PmnZ8gMy3lvIDlpZZcclxuICAgIHB1YmxpYyBiZXRMZWZ0VGltZSA9IDEzOyAgICAgICAgICAgICAgIC8vIOW8gOWni+S4i+azqOWAkuiuoeaXtu+8muenku+8jOW4puWwj+aVsOeCuVxyXG5cclxuICAgIHByaXZhdGUgZHRUb3RhbCA9IDA7XHJcbiAgICBwdWJsaWMgcmVxRW5hYmxlID0gZmFsc2U7XHJcblxyXG4gICAgLy8g6K6+572u5pWw5o2uXHJcbiAgICBwcml2YXRlIHBhcnNlU2VydmVyQ2ZnKGNmZzogYW55KSB7XHJcbiAgICAgICAgdGhpcy50cmVuZERhdGFMaXN0ID0gY2ZnLkF3YXJkTGlzdCB8fCBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5sb25nQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuaHVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5oZUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnRyZW5kRGF0YUxpc3QuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgbGV0IGhpdCA9IGVsZW1lbnQuaGl0O1xyXG4gICAgICAgICAgICBpZiAoaGl0Lm1peCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZXN1bHQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChoaXQuZHJhZ29uID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb25nQ291bnQrKztcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVzdWx0ID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaGl0LnRpZ2VyID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5odUNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlc3VsdCA9IDI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g5Lul5LiL5pqC5pe255So5LiN5LiKXHJcbiAgICAgICAgdGhpcy5yYXRlVGFnID0gY2ZnLnJhdGVfdGFnO1xyXG4gICAgICAgIHRoaXMudGFibGVJRCA9IGNmZy5sZXZlbDtcclxuICAgICAgICB0aGlzLm9ubGluZVBsYXllciA9IGNmZy5wbGF5ZXJfY291bnQ7XHJcbiAgICAgICAgdGhpcy50YWJsZVN0YXRlID0gY2ZnLnN0YXR1cztcclxuICAgICAgICB0aGlzLmJldExlZnRUaW1lID0gY2ZnLmNvdW50X2Rvd247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKCl7XHJcbiAgICAgICAgdGhpcy50cmVuZERhdGFMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5sb25nQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuaHVDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5oZUNvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25VcGRhdGUoZHQ6IG51bWJlcil7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJlcUVuYWJsZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZHRUb3RhbCArPSBkdDtcclxuICAgICAgICBpZiAodGhpcy5kdFRvdGFsIDwgdXBkYXRlSW50ZXJ2YWwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5yZXFHYW1lSGlzRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXFHYW1lSGlzRGF0YSgpe1xyXG4gICAgICAgIHRoaXMuZHRUb3RhbCA9IDA7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgXCJHZXRHYW1lRGF0YVwiLCB7XCJnaWRcIjogQmJ3ekNvbnN0RGVmaW5lLkdBTUVfSUR9LCAoX3BhcmFtOiBhbnkpPT57XHJcbiAgICAgICAgICAgIGlmICghQmJ3ekRyaXZlci5pbnN0YW5jZSB8fCAhQmJ3ekRyaXZlci5pbnN0YW5jZS5pbkdhbWUpICAgICAgIC8vIOWuuemUmSDkuI3kvp3otZblpKfljoXnmoTljY/orq7ot6jlnLrmma/kuKLlvINcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IGRhdGFBcnI6IGFueVtdID0gX3BhcmFtLkRhdGE7XHJcbiAgICAgICAgICAgIGlmIChkYXRhQXJyICYmIGRhdGFBcnIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBkYXRhQXJyW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmdpZCA9PSBCYnd6Q29uc3REZWZpbmUuR0FNRV9JRCAmJiBkYXRhLmxldmVsID09IEdhbWUuQ29udHJvbC5jdXJMdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcnNlU2VydmVyQ2ZnKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lLkV2ZW50LmV2ZW50KEJid3pHYW1lRXZlbnQub25IaXN0b3J5RGF0YVJlcywgdGhpcy50cmVuZERhdGFMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgbnVsbCwgZmFsc2UpO1xyXG4gICAgfVxyXG59Il19