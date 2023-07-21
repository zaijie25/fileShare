
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/ui/WndBase.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7ead6CU+MxGd7OQaoNPsjrD', 'WndBase');
// hall/scripts/logic/core/ui/WndBase.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestoryType = exports.LoadingState = void 0;
var EventDispatcher_1 = require("../../../framework/event/EventDispatcher");
var ViewBase_1 = require("./ViewBase");
var LoadingState;
(function (LoadingState) {
    LoadingState[LoadingState["None"] = 0] = "None";
    LoadingState[LoadingState["Loading"] = 1] = "Loading";
    LoadingState[LoadingState["Loaded"] = 2] = "Loaded";
})(LoadingState = exports.LoadingState || (exports.LoadingState = {}));
var DestoryType;
(function (DestoryType) {
    DestoryType[DestoryType["None"] = 0] = "None";
    DestoryType[DestoryType["Now"] = 1] = "Now";
    DestoryType[DestoryType["ChangeScene"] = 2] = "ChangeScene";
    DestoryType[DestoryType["Persist"] = 3] = "Persist";
})(DestoryType = exports.DestoryType || (exports.DestoryType = {}));
var WndBase = /** @class */ (function (_super) {
    __extends(WndBase, _super);
    function WndBase() {
        var _this = _super.call(this) || this;
        //加载状态
        _this.loadingState = LoadingState.None;
        //销毁类型
        _this.destoryType = DestoryType.ChangeScene;
        _this.args = null;
        //只有popup层有效
        _this.showBg = true;
        //是否初始化成功（拉取数据）
        _this.isInited = false;
        //是否需要先拉拉取数据再显示弹窗
        _this.isNeedDelay = false;
        //当节点打开切场景的时候，界面不销毁，转移到持久化节点
        _this.putToPersistWhenVisible = false;
        _this.internalEvent = new EventDispatcher_1.default();
        _this.onInit();
        _this.registToUIManager();
        return _this;
    }
    WndBase.prototype.onInit = function () { };
    WndBase.prototype.registToUIManager = function () {
        Global.UI.registUI(this);
    };
    //界面显示之前调用  负责初始化
    WndBase.prototype.prepare = function () { };
    WndBase.prototype.afterOpen = function () { };
    WndBase.prototype.reshow = function () {
        this.onReshow();
    };
    WndBase.prototype.onReshow = function () { };
    WndBase.prototype.close = function () {
        Global.UI.close(this.name);
    };
    WndBase.prototype.realClose = function () {
        this.resetState();
        this.onClose();
        this.closeAllSubView();
        // this.callAllView("realClose");
    };
    Object.defineProperty(WndBase.prototype, "isLoaded", {
        get: function () {
            return this.loadingState == LoadingState.Loaded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WndBase.prototype, "isLoading", {
        get: function () {
            return this.loadingState == LoadingState.Loading;
        },
        enumerable: false,
        configurable: true
    });
    WndBase.prototype.openAnimFinish = function () { };
    WndBase.prototype.afterAnimFinish = function () { };
    WndBase.prototype.closeAnimFinish = function () {
        this.active = false;
        if (this.commonBg)
            this.commonBg.active = false;
        this.onCloseAnimFinish();
        if (this.destoryType == DestoryType.Now) {
            Global.UI.dispose(this.name);
            if (this.node != null && cc.isValid(this.node)) {
                this.node.removeFromParent(true);
                this.node.destroy();
                this.node = null;
            }
            Global.ResourceManager.releaseCache(this.resPath, null);
            this.loadingState = LoadingState.None;
        }
    };
    WndBase.prototype.releaseRes = function () {
        if (this.destoryType == DestoryType.ChangeScene) {
            Logger.error("release", this.resPath);
            Global.ResourceManager.releaseCache(this.resPath, null);
            this.loadingState = LoadingState.None;
        }
    };
    WndBase.prototype.onCloseAnimFinish = function () {
    };
    WndBase.prototype.OnDataPrepared = function () {
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING, this.name);
        if (this.active == true) {
            return;
        }
        this.isInited = true;
        if (this.isInited && this.isNeedDelay) {
            this.active = true;
            this.animComp.bg = this.commonBg;
            this.animComp.ui = this.node;
            this.animComp.target = this;
            this.animComp.doPopupOpenAnim();
        }
    };
    WndBase.prototype.resetState = function () {
        this.isInited = false;
    };
    //在持久化节点打开，退出游戏时，切场景之前打开
    WndBase.prototype.onOpenPersist = function () {
    };
    //在持久化节点关闭，进入游戏时，切场景之后
    WndBase.prototype.onClosePersist = function () {
    };
    Object.defineProperty(WndBase.prototype, "activeInPersistNode", {
        //在持久化节点下，改变active
        set: function (value) {
            if (this._active == value)
                return;
            this._active = value;
            this.node.active = value;
            if (value) {
                this.onOpenPersist();
            }
            else {
                this.onClosePersist();
            }
        },
        enumerable: false,
        configurable: true
    });
    return WndBase;
}(ViewBase_1.default));
exports.default = WndBase;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHVpXFxXbmRCYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0RUFBdUU7QUFDdkUsdUNBQWtDO0FBR2xDLElBQVksWUFJWDtBQUpELFdBQVksWUFBWTtJQUNwQiwrQ0FBUSxDQUFBO0lBQ1IscURBQVcsQ0FBQTtJQUNYLG1EQUFVLENBQUE7QUFDZCxDQUFDLEVBSlcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFJdkI7QUFFRCxJQUFZLFdBS1g7QUFMRCxXQUFZLFdBQVc7SUFDbkIsNkNBQVEsQ0FBQTtJQUNSLDJDQUFPLENBQUE7SUFDUCwyREFBZSxDQUFBO0lBQ2YsbURBQVcsQ0FBQTtBQUNmLENBQUMsRUFMVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUt0QjtBQUVEO0lBQXFDLDJCQUFRO0lBMEN6QztRQUFBLFlBQ0ksaUJBQU8sU0FJVjtRQTlDRCxNQUFNO1FBQ0Msa0JBQVksR0FBaUIsWUFBWSxDQUFDLElBQUksQ0FBQztRQUN0RCxNQUFNO1FBQ0MsaUJBQVcsR0FBZSxXQUFXLENBQUMsV0FBVyxDQUFDO1FBV2xELFVBQUksR0FBVSxJQUFJLENBQUM7UUFFMUIsWUFBWTtRQUNMLFlBQU0sR0FBRyxJQUFJLENBQUM7UUFZckIsZUFBZTtRQUNMLGNBQVEsR0FBRyxLQUFLLENBQUM7UUFFM0IsaUJBQWlCO1FBQ1YsaUJBQVcsR0FBRyxLQUFLLENBQUM7UUFFM0IsNEJBQTRCO1FBQ3JCLDZCQUF1QixHQUFHLEtBQUssQ0FBQztRQU9uQyxLQUFJLENBQUMsYUFBYSxHQUFHLElBQUkseUJBQWUsRUFBRSxDQUFDO1FBQzNDLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDOztJQUM3QixDQUFDO0lBRVMsd0JBQU0sR0FBaEIsY0FBcUIsQ0FBQztJQUVa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QUksSUFBSSxDQUFDLFFBQVEsSUFBSyxJQUFJLENBQUMsV0FBVyxFQUFHO1lBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUNuQztJQUNMLENBQUM7SUFFTSw0QkFBVSxHQUFqQjtRQUVJLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO0lBQ3pCLENBQUM7SUFJRCx3QkFBd0I7SUFDakIsK0JBQWEsR0FBcEI7SUFFQSxDQUFDO0lBQ0Esc0JBQXNCO0lBQ2hCLGdDQUFjLEdBQXJCO0lBRUEsQ0FBQztJQUdELHNCQUFXLHdDQUFtQjtRQUQ5QixrQkFBa0I7YUFDbEIsVUFBK0IsS0FBSztZQUNoQyxJQUFHLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSztnQkFDcEIsT0FBTztZQUNYLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFHLEtBQUssRUFBQztnQkFDTCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7YUFDdkI7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO2FBQ3hCO1FBQ0wsQ0FBQzs7O09BQUE7SUFDTCxjQUFDO0FBQUQsQ0EzS0EsQUEyS0MsQ0EzS29DLGtCQUFRLEdBMks1QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9ldmVudC9FdmVudERpc3BhdGNoZXJcIjtcclxuaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBVSUFuaW1Db21wb25lbnQgZnJvbSBcIi4uL2NvbXBvbmVudC9VSUFuaW1Db21wb25lbnRcIjtcclxuXHJcbmV4cG9ydCBlbnVtIExvYWRpbmdTdGF0ZSB7XHJcbiAgICBOb25lID0gMCxcclxuICAgIExvYWRpbmcgPSAxLFxyXG4gICAgTG9hZGVkID0gMixcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRGVzdG9yeVR5cGUge1xyXG4gICAgTm9uZSA9IDAsICAgLy/kuI3plIDmr4HotYTmupBcclxuICAgIE5vdyA9IDEsICAgIC8v5YWz6Zet55WM6Z2i56uL5Y2z6ZSA5q+B6LWE5rqQXHJcbiAgICBDaGFuZ2VTY2VuZSA9IDIsICAgIC8v5YiH5Zy65pmv5pe25riF55CG6LWE5rqQXHJcbiAgICBQZXJzaXN0ID0gMyAsLy/mjIHkuYXljJboioLngrlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kQmFzZSBleHRlbmRzIFZpZXdCYXNlIGltcGxlbWVudHMgSUFuaW1XbmQge1xyXG4gICAgLy/liqDovb3nirbmgIFcclxuICAgIHB1YmxpYyBsb2FkaW5nU3RhdGU6IExvYWRpbmdTdGF0ZSA9IExvYWRpbmdTdGF0ZS5Ob25lO1xyXG4gICAgLy/plIDmr4HnsbvlnotcclxuICAgIHB1YmxpYyBkZXN0b3J5VHlwZTpEZXN0b3J5VHlwZSA9IERlc3RvcnlUeXBlLkNoYW5nZVNjZW5lO1xyXG4gICAgLy/lsYLnuqdcclxuICAgIHB1YmxpYyBsYXllcjogc3RyaW5nO1xyXG4gICAgLy/liqjnlLvnsbvlnotcclxuICAgIHB1YmxpYyBhbmltVHlwZTogc3RyaW5nO1xyXG5cclxuICAgIC8v55WM6Z2i5ZCN56ewXHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgLy/otYTmupDot6/lvoRcclxuICAgIHB1YmxpYyByZXNQYXRoOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGFyZ3M6IGFueVtdID0gbnVsbDtcclxuXHJcbiAgICAvL+WPquaciXBvcHVw5bGC5pyJ5pWIXHJcbiAgICBwdWJsaWMgc2hvd0JnID0gdHJ1ZTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAvL+W8ueeql+eVjOmdouiDjOaZr1xyXG4gICAgcHVibGljIGNvbW1vbkJnOiBjYy5Ob2RlO1xyXG4gICAgLy/pgJrnlKjlvLnnqpfnu4Tku7ZcclxuICAgIHB1YmxpYyBhbmltQ29tcDogVUlBbmltQ29tcG9uZW50O1xyXG5cclxuICAgIC8v5piv5ZCm5q2j5Zyo5pKt5Yqo55S7XHJcbiAgICBwdWJsaWMgaXNSdW5pbmdBbmltO1xyXG5cclxuICAgIC8v5piv5ZCm5Yid5aeL5YyW5oiQ5Yqf77yI5ouJ5Y+W5pWw5o2u77yJXHJcbiAgICBwcm90ZWN0ZWQgaXNJbml0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvL+aYr+WQpumcgOimgeWFiOaLieaLieWPluaVsOaNruWGjeaYvuekuuW8ueeql1xyXG4gICAgcHVibGljIGlzTmVlZERlbGF5ID0gZmFsc2U7XHJcblxyXG4gICAgLy/lvZPoioLngrnmiZPlvIDliIflnLrmma/nmoTml7blgJnvvIznlYzpnaLkuI3plIDmr4HvvIzovaznp7vliLDmjIHkuYXljJboioLngrlcclxuICAgIHB1YmxpYyBwdXRUb1BlcnNpc3RXaGVuVmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICBcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuaW50ZXJuYWxFdmVudCA9IG5ldyBFdmVudERpc3BhdGNoZXIoKTtcclxuICAgICAgICB0aGlzLm9uSW5pdCgpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0VG9VSU1hbmFnZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkgeyB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlZ2lzdFRvVUlNYW5hZ2VyKCkge1xyXG4gICAgICAgIEdsb2JhbC5VSS5yZWdpc3RVSSh0aGlzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/nlYzpnaLmmL7npLrkuYvliY3osIPnlKggIOi0n+i0o+WIneWni+WMllxyXG4gICAgcHVibGljIHByZXBhcmUoKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgYWZ0ZXJPcGVuKCkgeyB9XHJcblxyXG4gICAgcHVibGljIHJlc2hvdygpIHtcclxuICAgICAgICB0aGlzLm9uUmVzaG93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uUmVzaG93KCkgeyB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICBHbG9iYWwuVUkuY2xvc2UodGhpcy5uYW1lKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHJlYWxDbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5yZXNldFN0YXRlKClcclxuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcclxuICAgICAgICB0aGlzLmNsb3NlQWxsU3ViVmlldygpXHJcbiAgICAgICAgLy8gdGhpcy5jYWxsQWxsVmlldyhcInJlYWxDbG9zZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzTG9hZGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmdTdGF0ZSA9PSBMb2FkaW5nU3RhdGUuTG9hZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNMb2FkaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRpbmdTdGF0ZSA9PSBMb2FkaW5nU3RhdGUuTG9hZGluZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlbkFuaW1GaW5pc2goKSB7IH1cclxuXHJcbiAgICBwdWJsaWMgYWZ0ZXJBbmltRmluaXNoKCkgeyB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlQW5pbUZpbmlzaCgpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbW1vbkJnKVxyXG4gICAgICAgICAgICB0aGlzLmNvbW1vbkJnLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub25DbG9zZUFuaW1GaW5pc2goKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5kZXN0b3J5VHlwZSA9PSBEZXN0b3J5VHlwZS5Ob3cpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgR2xvYmFsLlVJLmRpc3Bvc2UodGhpcy5uYW1lKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlICE9IG51bGwgJiYgY2MuaXNWYWxpZCh0aGlzLm5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUucmVtb3ZlRnJvbVBhcmVudCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIucmVsZWFzZUNhY2hlKHRoaXMucmVzUGF0aCwgbnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZ1N0YXRlID0gTG9hZGluZ1N0YXRlLk5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgcmVsZWFzZVJlcygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5kZXN0b3J5VHlwZSA9PSBEZXN0b3J5VHlwZS5DaGFuZ2VTY2VuZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInJlbGVhc2VcIiwgdGhpcy5yZXNQYXRoKVxyXG4gICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLnJlbGVhc2VDYWNoZSh0aGlzLnJlc1BhdGgsIG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmdTdGF0ZSA9IExvYWRpbmdTdGF0ZS5Ob25lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2VBbmltRmluaXNoKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBPbkRhdGFQcmVwYXJlZCgpIHtcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuSElERV9ORVRfV0FJVElORywgdGhpcy5uYW1lKVxyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzSW5pdGVkID0gdHJ1ZVxyXG4gICAgICAgIGlmICh0aGlzLmlzSW5pdGVkICYmICB0aGlzLmlzTmVlZERlbGF5ICkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbUNvbXAuYmcgPSB0aGlzLmNvbW1vbkJnO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1Db21wLnVpID0gdGhpcy5ub2RlO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1Db21wLnRhcmdldCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbUNvbXAuZG9Qb3B1cE9wZW5BbmltKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldFN0YXRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlzSW5pdGVkID0gZmFsc2VcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8v5Zyo5oyB5LmF5YyW6IqC54K55omT5byA77yM6YCA5Ye65ri45oiP5pe277yM5YiH5Zy65pmv5LmL5YmN5omT5byAXHJcbiAgICBwdWJsaWMgb25PcGVuUGVyc2lzdCgpe1xyXG5cclxuICAgIH1cclxuICAgICAvL+WcqOaMgeS5heWMluiKgueCueWFs+mXre+8jOi/m+WFpea4uOaIj+aXtu+8jOWIh+WcuuaZr+S5i+WQjlxyXG4gICAgcHVibGljIG9uQ2xvc2VQZXJzaXN0KCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v5Zyo5oyB5LmF5YyW6IqC54K55LiL77yM5pS55Y+YYWN0aXZlXHJcbiAgICBwdWJsaWMgc2V0IGFjdGl2ZUluUGVyc2lzdE5vZGUodmFsdWUpe1xyXG4gICAgICAgIGlmKHRoaXMuX2FjdGl2ZSA9PSB2YWx1ZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB2YWx1ZTtcclxuICAgICAgICBpZih2YWx1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMub25PcGVuUGVyc2lzdCgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNsb3NlUGVyc2lzdCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59ICAgIl19