
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/data/ErmjContext.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcZGF0YVxcRXJtakNvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO1FBUUksVUFBVTtRQUNILGFBQVEsR0FBRyxLQUFLLENBQUM7UUFFeEIsUUFBUTtRQUNELGVBQVUsR0FBb0IsRUFBRSxDQUFDO1FBRWhDLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFFZCxrQkFBYSxHQUFHLENBQUMsQ0FBQyxDQUFRLDZCQUE2QjtRQUN0RCxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUV0QixhQUFRLEdBQUcsS0FBSyxDQUFDO0lBc0Q1QixDQUFDO0lBcERVLHlCQUFHLEdBQVYsVUFBVyxHQUFXLEVBQUUsS0FBVTtRQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRU0seUJBQUcsR0FBVixVQUFXLEdBQVc7UUFDbEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTSw0QkFBTSxHQUFiLFVBQWMsR0FBVztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM3QixDQUFDO0lBRU0sOEJBQVEsR0FBZixVQUFtQixHQUFHO1FBQ2xCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsSUFBSSxJQUFJLElBQUksSUFBSTtZQUNaLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLE9BQU8sSUFBUyxDQUFDO0lBQ3JCLENBQUM7SUFHRCxzQkFBVyxvQ0FBVzthQUl0QjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDO1FBUEQsVUFBVTthQUNWLFVBQXVCLElBQWE7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFPRCxzQkFBVyxrQ0FBUzthQUlwQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDO1FBUEQsU0FBUzthQUNULFVBQXFCLElBQWE7WUFDOUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFNRCxjQUFjO0lBQ2Qsb0JBQW9CO0lBQ2Isa0NBQVksR0FBbkI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBRU0saUNBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQXpFQSxBQXlFQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtakNvbnRleHQge1xyXG4gICAgLy9zZXNzaW9u5pWw5o2uXHJcbiAgICBwdWJsaWMgc2Vzc2lvbjogYW55O1xyXG4gICAgLy/mnI3liqHlmajmuLjmiI/phY3nva5cclxuICAgIHB1YmxpYyBzZXJ2ZXJHYW1lQ2ZnOiBhbnlcclxuICAgIC8v6Ieq5bex55qE5bqn5L2N5Y+3XHJcbiAgICBwdWJsaWMgc2VsZlNyYztcclxuXHJcbiAgICAvL+aYr+WQpuWkhOS6jumHjei/numYtuautVxyXG4gICAgcHVibGljIHN5bmNNb2RlID0gZmFsc2U7XHJcblxyXG4gICAgLy/njqnlrrbmlbDmja7liJfooahcclxuICAgIHB1YmxpYyBwbGF5ZXJMaXN0OiBQVlBQbGF5ZXJEYXRhW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIGRhdGFNYXAgPSB7fTtcclxuXHJcbiAgICBwdWJsaWMgc2VsZkxvY2FsU2VhdCA9IDA7ICAgICAgICAvLyDoh6rlt7Hlm7rlrprmnKzlnLDluqfkvY0wLCDlpLTlg4/jgIHmiYvniYzjgIHniYzlopnpg73orr7lrprmnKzmnLrkuLowXHJcbiAgICBwcml2YXRlIF9pc1dhaXRNYXRjaCA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBfY21kQXV0byA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmRhdGFNYXBba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhTWFwW2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuZGF0YU1hcFtrZXldID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VmFsdWU8VD4oa2V5KTogVCB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmRhdGFNYXBba2V5XTtcclxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gZGF0YSBhcyBUO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaYr+WQpuWMuemFjeS4reeKtuaAgVxyXG4gICAgcHVibGljIHNldCBpc1dhaXRNYXRjaChmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5faXNXYWl0TWF0Y2ggPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNXYWl0TWF0Y2goKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzV2FpdE1hdGNoO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaYr+WQpuaMguacuueKtuaAgVxyXG4gICAgcHVibGljIHNldCBpc0NtZEF1dG8oZmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2NtZEF1dG8gPSBmbGFnO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNDbWRBdXRvKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jbWRBdXRvO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Y2V5bGA57uT5p2fIOaVsOaNrua4heeQhiAgIFxyXG4gICAgLy/muLjmiI/nu5PmnZ8g5pW05LiqQ29udGV4dOS8muiiq+a4heepulxyXG4gICAgcHVibGljIGNsZWFyQnlSb3VuZCgpIHtcclxuICAgICAgICB0aGlzLmRhdGFNYXAgPSB7fTtcclxuICAgICAgICB0aGlzLnN5bmNNb2RlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQnlHYW1lKCkge1xyXG4gICAgICAgIHRoaXMucGxheWVyTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGF0YU1hcCA9IHt9O1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJHYW1lQ2ZnID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN5bmNNb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faXNXYWl0TWF0Y2ggPSBmYWxzZTtcclxuICAgIH1cclxufSJdfQ==