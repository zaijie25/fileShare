
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/fsm/Fsm.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a9308h1RpxPVYm4HojzBTeQ', 'Fsm');
// hall/scripts/framework/fsm/Fsm.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fsm = /** @class */ (function () {
    function Fsm() {
        this.stateMap = {};
        this.isDestroyed = false;
    }
    Object.defineProperty(Fsm.prototype, "isRunning", {
        get: function () {
            return this.currentState != null;
        },
        enumerable: false,
        configurable: true
    });
    Fsm.prototype.registState = function (state) {
        if (state == null)
            return;
        var key = state.type;
        if (this.stateMap[key] != null) {
            Logger.log("重复注册状态机:" + key);
            return;
        }
        this.stateMap[key] = state;
        state.onInit(this);
        this.isDestroyed = false;
    };
    Fsm.prototype.removeState = function (key) {
        if (!this.hasState(key))
            return;
        var state = this.getState(key);
        if (state == this.currentState) {
            Logger.log("正在运行的state不能移除");
            return;
        }
        state.onDestory();
        this.stateMap[key] = null;
    };
    Fsm.prototype.changeState = function (key) {
        var state = this.getState(key);
        if (state == null) {
            Logger.log("找不到状态");
            return;
        }
        if (this.currentState != null) {
            this.currentState.onLeave();
        }
        this.currentState = state;
        state.onEnter();
    };
    Fsm.prototype.start = function (key) {
        if (this.isRunning)
            return;
        var state = this.getState(key);
        if (state == null)
            return;
        this.currentState = state;
        this.currentState.onEnter();
    };
    Fsm.prototype.getState = function (key) {
        return this.stateMap[key];
    };
    Fsm.prototype.hasState = function (key) {
        return this.stateMap[key] != null;
    };
    Fsm.prototype.onUpdate = function () {
        if (this.currentState == null)
            return;
        this.currentState.onUpdate();
    };
    //发送状态机事件  只有当前状态机响应
    Fsm.prototype.fireEvent = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.currentState != null) {
            this.currentState.onEvent(type, args);
        }
    };
    Fsm.prototype.shutDown = function () {
        if (this.currentState != null) {
            this.currentState.onLeave();
            this.currentState = null;
        }
        for (var key in this.stateMap) {
            this.stateMap[key].onDestory();
        }
        this.stateMap = {};
        this.isDestroyed = true;
    };
    return Fsm;
}());
exports.default = Fsm;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxmc21cXEZzbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0lBQUE7UUFHVyxhQUFRLEdBQUcsRUFBRSxDQUFBO1FBRWIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7SUEyRy9CLENBQUM7SUF6R0csc0JBQVcsMEJBQVM7YUFBcEI7WUFFSSxPQUFPLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDO1FBQ3JDLENBQUM7OztPQUFBO0lBRU0seUJBQVcsR0FBbEIsVUFBbUIsS0FBYztRQUU3QixJQUFHLEtBQUssSUFBSSxJQUFJO1lBQ1osT0FBTztRQUNYLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDckIsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFDN0I7WUFDSSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQTtZQUM1QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMzQixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFTSx5QkFBVyxHQUFsQixVQUFtQixHQUFHO1FBRWxCLElBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUNsQixPQUFPO1FBQ1gsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxFQUM3QjtZQUNJLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM3QixPQUFPO1NBQ1Y7UUFDRCxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUdNLHlCQUFXLEdBQWxCLFVBQW1CLEdBQUc7UUFFbEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFHLEtBQUssSUFBSSxJQUFJLEVBQ2hCO1lBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwQixPQUFPO1NBQ1Y7UUFDRCxJQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxFQUM1QjtZQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUdNLG1CQUFLLEdBQVosVUFBYSxHQUFHO1FBRVosSUFBRyxJQUFJLENBQUMsU0FBUztZQUNiLE9BQU87UUFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLElBQUcsS0FBSyxJQUFJLElBQUk7WUFDWixPQUFPO1FBQ1gsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUMvQixDQUFDO0lBR00sc0JBQVEsR0FBZixVQUFnQixHQUFHO1FBRWYsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTSxzQkFBUSxHQUFmLFVBQWdCLEdBQUc7UUFFZixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ3RDLENBQUM7SUFHTSxzQkFBUSxHQUFmO1FBRUksSUFBRyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUk7WUFDeEIsT0FBTztRQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELG9CQUFvQjtJQUNiLHVCQUFTLEdBQWhCLFVBQWlCLElBQUk7UUFBRSxjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLDZCQUFPOztRQUUxQixJQUFHLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxFQUM1QjtZQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6QztJQUNMLENBQUM7SUFFTSxzQkFBUSxHQUFmO1FBRUksSUFBRyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFDNUI7WUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzVCO1FBQ0QsS0FBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUM1QjtZQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUE7U0FDakM7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBQ0wsVUFBQztBQUFELENBaEhBLEFBZ0hDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRnNtU3RhdGUgZnJvbSBcIi4vRnNtU3RhdGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZzbVxyXG57XHJcbiAgICBwdWJsaWMgbmFtZTpzdHJpbmc7XHJcbiAgICBwdWJsaWMgc3RhdGVNYXAgPSB7fVxyXG4gICAgcHVibGljIGN1cnJlbnRTdGF0ZTpGc21TdGF0ZTtcclxuICAgIHB1YmxpYyBpc0Rlc3Ryb3llZCA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNSdW5uaW5nKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U3RhdGUgIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0U3RhdGUoc3RhdGU6RnNtU3RhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoc3RhdGUgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBrZXkgPSBzdGF0ZS50eXBlO1xyXG4gICAgICAgIGlmKHRoaXMuc3RhdGVNYXBba2V5XSAhPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIumHjeWkjeazqOWGjOeKtuaAgeacujpcIiArIGtleSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXRlTWFwW2tleV0gPSBzdGF0ZTtcclxuICAgICAgICBzdGF0ZS5vbkluaXQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5pc0Rlc3Ryb3llZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVTdGF0ZShrZXkpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuaGFzU3RhdGUoa2V5KSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoa2V5KTtcclxuICAgICAgICBpZihzdGF0ZSA9PSB0aGlzLmN1cnJlbnRTdGF0ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5sb2coXCLmraPlnKjov5DooYznmoRzdGF0ZeS4jeiDveenu+mZpFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0ZS5vbkRlc3RvcnkoKTtcclxuICAgICAgICB0aGlzLnN0YXRlTWFwW2tleV0gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2hhbmdlU3RhdGUoa2V5KVxyXG4gICAge1xyXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoa2V5KTtcclxuICAgICAgICBpZihzdGF0ZSA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIuaJvuS4jeWIsOeKtuaAgVwiKTsgXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jdXJyZW50U3RhdGUgIT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlLm9uTGVhdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICBzdGF0ZS5vbkVudGVyKCk7XHJcbiAgICB9ICAgICAgICBcclxuXHJcblxyXG4gICAgcHVibGljIHN0YXJ0KGtleSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmlzUnVubmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoa2V5KTtcclxuICAgICAgICBpZihzdGF0ZSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZS5vbkVudGVyKClcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldFN0YXRlKGtleSk6RnNtU3RhdGVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZU1hcFtrZXldO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXNTdGF0ZShrZXkpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVNYXBba2V5XSAhPSBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgb25VcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFN0YXRlID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZS5vblVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Y+R6YCB54q25oCB5py65LqL5Lu2ICDlj6rmnInlvZPliY3nirbmgIHmnLrlk43lupRcclxuICAgIHB1YmxpYyBmaXJlRXZlbnQodHlwZSwgLi4uYXJncylcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmN1cnJlbnRTdGF0ZSAhPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUub25FdmVudCh0eXBlLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNodXREb3duKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmN1cnJlbnRTdGF0ZSAhPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUub25MZWF2ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMuc3RhdGVNYXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlTWFwW2tleV0ub25EZXN0b3J5KClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1hcCA9IHt9O1xyXG4gICAgICAgIHRoaXMuaXNEZXN0cm95ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG59Il19