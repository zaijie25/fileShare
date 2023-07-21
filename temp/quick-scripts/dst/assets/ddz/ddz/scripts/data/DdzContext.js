
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/data/DdzContext.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGRhdGFcXERkekNvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMEM7QUFDMUMsK0NBQXlDO0FBRXpDO0lBQUE7UUFTSSxVQUFVO1FBQ0gsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUV4QixRQUFRO1FBQ0QsZUFBVSxHQUFtQixFQUFFLENBQUM7UUFHL0IsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUViLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBRTVCLGdCQUFnQjtRQUNSLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzdCLE9BQU87UUFDQyxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUVuQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUVyQixVQUFLLEdBQVksc0JBQU8sQ0FBQyxNQUFNLENBQUM7SUFpSTVDLENBQUM7SUEvSEcsc0JBQVcsNEJBQUk7YUFJZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO2FBTkQsVUFBZ0IsS0FBYTtZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxzQkFBTyxDQUFDLE1BQU0sQ0FBQztRQUM3RCxDQUFDOzs7T0FBQTtJQU9NLHdCQUFHLEdBQVYsVUFBVyxHQUFXLEVBQUUsS0FBVTtRQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRU0sd0JBQUcsR0FBVixVQUFXLEdBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTSwyQkFBTSxHQUFiLFVBQWMsR0FBVztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FB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SUFDOUIsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0E3SkEsQUE2SkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpHYW1lRXZlbnQgZnJvbSBcIi4vRGR6R2FtZUV2ZW50XCI7XHJcbmltcG9ydCB7IERkek1vZGUgfSBmcm9tIFwiLi9EZHpSdWxlQ29uc3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERkekNvbnRleHRcclxue1xyXG4gICAgLy9zZXNzaW9u5pWw5o2uXHJcbiAgICBwdWJsaWMgc2Vzc2lvbjphbnk7XHJcbiAgICAvL+acjeWKoeWZqOa4uOaIj+mFjee9rlxyXG4gICAgcHVibGljIHNlcnZlckdhbWVDZmc6YW55XHJcbiAgICAvL+iHquW3seeahOW6p+S9jeWPt1xyXG4gICAgcHVibGljIHNlbGZTcmM7XHJcblxyXG4gICAgLy/mmK/lkKblpITkuo7ph43ov57pmLbmrrVcclxuICAgIHB1YmxpYyBzeW5jTW9kZSA9IGZhbHNlO1xyXG5cclxuICAgIC8v546p5a625pWw5o2u5YiX6KGoXHJcbiAgICBwdWJsaWMgcGxheWVyTGlzdDpQVlBQbGF5ZXJEYXRhW10gPSBbXTtcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBkYXRhTWFwID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSBzZWxlY3RQb2tlckxpc3QgPSBbXTtcclxuICAgIHByaXZhdGUgc2VsZWN0UG9rZXJNYXAgPSB7fTtcclxuXHJcbiAgICAvLyDorrDniYzlmajmlbDmja4sIOiusOW9leWHuui/h+eahOeJjFxyXG4gICAgcHJpdmF0ZSBwb2tlck1hcmtlckRhdGEgPSBbXTtcclxuICAgIC8vIOiHquW3seaJi+eJjFxyXG4gICAgcHJpdmF0ZSBwb2tlclNlbGZIYW5kID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNXYWl0TWF0Y2ggPSBmYWxzZTtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfbW9kZTogRGR6TW9kZSA9IERkek1vZGUuTm9ybWFsO1xyXG5cclxuICAgIHB1YmxpYyBzZXQgbW9kZSh2YWx1ZTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLl9tb2RlID0gdmFsdWUgPT0gMSA/IERkek1vZGUuUXVpY2sgOiBEZHpNb2RlLk5vcm1hbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG1vZGUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9kZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZGF0YU1hcFtrZXldID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldChrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFNYXBba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhTWFwW2tleV0gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRWYWx1ZTxUPihrZXkpOiBUIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YU1hcFtrZXldO1xyXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiBkYXRhIGFzIFQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFNlbGVjdFBva2VyKHBva2VyVmFsdWU6IG51bWJlciwgb3JkZXI6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RQb2tlckxpc3QucHVzaChwb2tlclZhbHVlKTtcclxuICAgICAgICB0aGlzLnNlbGVjdFBva2VyTWFwW29yZGVyXSA9IHBva2VyVmFsdWU7XHJcbiAgICAgICAgR2FtZS5FdmVudC5ldmVudChEZHpHYW1lRXZlbnQuRW5hYmxlU2VsZWN0LCB0aGlzLnNlbGVjdFBva2VyTGlzdC5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVTZWxlY3RQb2tlcihwb2tlclZhbHVlOiBudW1iZXIsIG9yZGVyOiBudW1iZXIpe1xyXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuc2VsZWN0UG9rZXJMaXN0LmluZGV4T2YocG9rZXJWYWx1ZSk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpe1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFBva2VyTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFBva2VyTWFwW29yZGVyXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoRGR6R2FtZUV2ZW50LkVuYWJsZVNlbGVjdCwgdGhpcy5zZWxlY3RQb2tlckxpc3QubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2VsZWN0UG9rZXJzKCl7XHJcbiAgICAgICAgLy8gbGV0IHJlc3VsdCA9IHRoaXMuc2VsZWN0UG9rZXJMaXN0LmZpbHRlcigoaXRlbSwgaW5kZXgsIGFycik9PiBhcnIuaW5kZXhPZihpdGVtKSA9PT0gaW5kZXgpOyAvL+WOu+mHjVxyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdFBva2VyTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2VsZWN0UG9rZXJzTWFwKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0UG9rZXJNYXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyU2VsZWN0UG9rZXJDYWNoZSgpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0UG9rZXJMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5zZWxlY3RQb2tlck1hcCA9IHt9O1xyXG4gICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoRGR6R2FtZUV2ZW50LkVuYWJsZVNlbGVjdCwgdGhpcy5zZWxlY3RQb2tlckxpc3QubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlTWFya2VyRGF0YShhcnI6IG51bWJlcltdKXtcclxuICAgICAgICB0aGlzLnBva2VyTWFya2VyRGF0YSA9IHRoaXMucG9rZXJNYXJrZXJEYXRhLmNvbmNhdChhcnIpO1xyXG4gICAgICAgIEdhbWUuRXZlbnQuZXZlbnQoRGR6R2FtZUV2ZW50LlVwZGF0ZU1hcmtlciwgdGhpcy5wb2tlck1hcmtlckRhdGEubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TWFya2VyRGF0YSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBva2VyTWFya2VyRGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGFyciBcclxuICAgICAqIEBwYXJhbSBpc0ZpcnN0IOa3u+WKoOagh+W/l+WMuuWIq+WPkeeJjOWSjOWcsOS4u+eJjCAgZGVidWcg6YG/5YWN5LiN5Y+r5Zyw5Li76YeN5Y+R54mMIOeJjOaVsOe7hOS4gOebtOaLvOaOpeeahOmXrumimFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkU2VsZkhhbmRQb2tlcnMoYXJyOiBudW1iZXJbXSwgaXNGaXJzdCA9IGZhbHNlKXtcclxuICAgICAgICBpZiAoaXNGaXJzdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucG9rZXJTZWxmSGFuZCA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBva2VyU2VsZkhhbmQgPSB0aGlzLnBva2VyU2VsZkhhbmQuY29uY2F0KGFycik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVNlbGZIYW5kUG9rZXJzKGFycjogbnVtYmVyW10pe1xyXG4gICAgICAgIGFyci5mb3JFYWNoKG51bSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMucG9rZXJTZWxmSGFuZC5pbmRleE9mKG51bSk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2tlclNlbGZIYW5kLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZnJlc2hIYW5kUG9rZXJzKHBva2VyQXJyOm51bWJlcltdKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucG9rZXJTZWxmSGFuZCA9IHBva2VyQXJyXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNlbGZIYW5kUG9rZXJzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9rZXJTZWxmSGFuZDtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmmK/lkKbljLnphY3kuK3nirbmgIFcclxuICAgIHB1YmxpYyBzZXQgaXNXYWl0TWF0Y2goZmxhZzogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5faXNXYWl0TWF0Y2ggPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNXYWl0TWF0Y2goKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNXYWl0TWF0Y2g7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ljZXlsYDnu5PmnZ8g5pWw5o2u5riF55CGICAgXHJcbiAgICAvL+a4uOaIj+e7k+adnyDmlbTkuKpDb250ZXh05Lya6KKr5riF56m6XHJcbiAgICBwdWJsaWMgY2xlYXJCeVJvdW5kKCl7XHJcbiAgICAgICAgdGhpcy5kYXRhTWFwID0ge307XHJcbiAgICAgICAgdGhpcy5wb2tlck1hcmtlckRhdGEgPSBbXTtcclxuICAgICAgICB0aGlzLnBva2VyU2VsZkhhbmQgPSBbXTtcclxuICAgICAgICB0aGlzLnN5bmNNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdFBva2VyQ2FjaGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJCeUdhbWUoKXtcclxuICAgICAgICB0aGlzLnBsYXllckxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLmRhdGFNYXAgPSB7fTtcclxuICAgICAgICB0aGlzLnBva2VyTWFya2VyRGF0YSA9IFtdO1xyXG4gICAgICAgIHRoaXMucG9rZXJTZWxmSGFuZCA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJHYW1lQ2ZnID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN5bmNNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdFBva2VyQ2FjaGUoKTtcclxuICAgICAgICB0aGlzLl9pc1dhaXRNYXRjaCA9IGZhbHNlO1xyXG4gICAgfVxyXG59Il19