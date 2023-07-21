
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/loadingMVC/WndGameMaintainUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b26220K3gdA0ZBkGaWjNxle', 'WndGameMaintainUI');
// hall/scripts/logic/core/loadingMVC/WndGameMaintainUI.ts

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
var WndBase_1 = require("../ui/WndBase");
var WndGameMaintainUI = /** @class */ (function (_super) {
    __extends(WndGameMaintainUI, _super);
    function WndGameMaintainUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autoClose = true;
        _this.autoReleaseFunc = true;
        _this.endTime = 0;
        return _this;
    }
    WndGameMaintainUI.prototype.onInit = function () {
        this.name = "WndGameMaintainUI";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/LoadingScene/GameMaintainUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndGameMaintainUI.prototype.initView = function () {
        this.addCommonClick("bg/close", this.onCloseClick, this);
        this.onlineCustomBtnNode = this.addCommonClick("onlineCustomBtn", this.onlineCustomBtnClick, this);
        this.officialWebBtnNode = this.addCommonClick("officialWebBtn", this.officialWebBtnClick, this);
        this.content = this.getComponent("content", cc.Label);
        this.countTimeLabel = this.getComponent("timeLabel", cc.Label);
        this.content.string = "";
        this.countTimeLabel.string = ""; // <color=#f08f48><size=24><b><u>剩余维护时间 00:30:00</u></b></size></color>
    };
    /**
     * @param {string} content
     * @param {number} type   1 显示 确定取消  2  显示 确定
     * @param {Function} yesCallback
     * @param {Function} noCallback
     * @param {boolean} autoClose  点击按钮后是否自动关闭界面
     * @memberof WndGameMaintainUI
     */
    WndGameMaintainUI.prototype.onOpen = function () {
        if (this.args == null || this.args.length == 0) {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        var content = this.args[0];
        if (content == null || content == "") {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        var endTime = this.args[1];
        this.endTime = endTime;
        var startTime = Math.round(new Date().getTime() / 1000); //开始时间
        var t = this.endTime - startTime; //时间差
        this.showLeftTime(t);
        this.countTimeLabel.schedule(this.startCounter.bind(this), 1, cc.macro.REPEAT_FOREVER);
        this.content.string = content;
        this.onlineCustomCallback = this.args[2];
        this.officialWebCallback = this.args[3];
        this.closeCallback = this.args[4];
        this.autoClose = this.args[5] != false;
        this.autoReleaseFunc = this.args[6] != false;
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
    };
    /**
 *
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */
    WndGameMaintainUI.prototype.formatRemainTime = function (leftTime) {
        var t = leftTime;
        var d = 0, h = 0, m = 0, s = 0;
        if (t >= 0) {
            h = Math.floor(t / 60 / 60 % 24);
            m = Math.floor(t / 60 % 60);
            s = Math.floor(t % 60);
        }
        var h_str = "";
        var m_str = "";
        var s_str = "";
        if (h < 10) {
            h_str = "0" + h;
        }
        else {
            h_str = h_str + h;
        }
        if (m < 10) {
            m_str = "0" + m;
        }
        else {
            m_str = m_str + m;
        }
        if (s < 10) {
            s_str = "0" + s;
        }
        else {
            s_str = s_str + s;
        }
        return h_str + ":" + m_str + ":" + s_str;
    };
    WndGameMaintainUI.prototype.showLeftTime = function (leftTime) {
        var leftTimeStr = this.formatRemainTime(leftTime);
        this.countTimeLabel.string = "剩余维护时间" + leftTimeStr;
    };
    WndGameMaintainUI.prototype.stopCounter = function () {
        this.countTimeLabel.unscheduleAllCallbacks();
    };
    WndGameMaintainUI.prototype.startCounter = function () {
        var startTime = Math.round(new Date().getTime() / 1000); //开始时间
        var t = this.endTime - startTime; //时间差
        this.showLeftTime(t);
        if (t <= 0) {
            this.stopCounter();
            this.onCloseClick();
        }
    };
    WndGameMaintainUI.prototype.officialWebBtnClick = function () {
        if (this.officialWebCallback) {
            this.officialWebCallback();
        }
    };
    WndGameMaintainUI.prototype.onCloseClick = function () {
        this.close();
    };
    WndGameMaintainUI.prototype.onClose = function () {
    };
    WndGameMaintainUI.prototype.onCloseAnimFinish = function () {
        if (this.closeCallback) {
            this.closeCallback();
            this.closeCallback = null;
        }
    };
    WndGameMaintainUI.prototype.onlineCustomBtnClick = function () {
        if (this.onlineCustomCallback) {
            this.onlineCustomCallback();
        }
    };
    return WndGameMaintainUI;
}(WndBase_1.default));
exports.default = WndGameMaintainUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGxvYWRpbmdNVkNcXFduZEdhbWVNYWludGFpblVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFxRDtBQUdyRDtJQUErQyxxQ0FBTztJQUF0RDtRQUFBLHFFQThKQztRQXRKVyxlQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLHFCQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLGFBQU8sR0FBRyxDQUFDLENBQUM7O0lBb0p4QixDQUFDO0lBakphLGtDQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLDZDQUE2QyxDQUFDO1FBQzdELElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQVcsQ0FBQyxJQUFJLENBQUM7SUFDeEMsQ0FBQztJQUVTLG9DQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFBRSxD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RyxTQUFTLENBQUMsQ0FBQyxLQUFLO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDO1lBQ1AsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtTQUN0QjtJQUNMLENBQUM7SUFHTywrQ0FBbUIsR0FBM0I7UUFDSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUMxQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUM5QjtJQUVMLENBQUM7SUFFTyx3Q0FBWSxHQUFwQjtRQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRVMsbUNBQU8sR0FBakI7SUFFQSxDQUFDO0lBRVMsNkNBQWlCLEdBQTNCO1FBQ0ksSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQTtTQUM1QjtJQUNMLENBQUM7SUFFTyxnREFBb0IsR0FBNUI7UUFDSSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUMzQixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFHTCx3QkFBQztBQUFELENBOUpBLEFBOEpDLENBOUo4QyxpQkFBTyxHQThKckQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSwgeyBEZXN0b3J5VHlwZSB9IGZyb20gXCIuLi91aS9XbmRCYXNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kR2FtZU1haW50YWluVUkgZXh0ZW5kcyBXbmRCYXNlIHtcclxuICAgIHByaXZhdGUgb25saW5lQ3VzdG9tQnRuTm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgb2ZmaWNpYWxXZWJCdG5Ob2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBjb250ZW50OiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgY291bnRUaW1lTGFiZWw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBvbmxpbmVDdXN0b21DYWxsYmFjazogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIG9mZmljaWFsV2ViQ2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBjbG9zZUNhbGxiYWNrOiBGdW5jdGlvbjtcclxuICAgIHByaXZhdGUgYXV0b0Nsb3NlID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgYXV0b1JlbGVhc2VGdW5jID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgZW5kVGltZSA9IDA7XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRHYW1lTWFpbnRhaW5VSVwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBcIlBvcExheWVyXCI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvTG9hZGluZ1NjZW5lL0dhbWVNYWludGFpblVJXCI7XHJcbiAgICAgICAgdGhpcy5kZXN0b3J5VHlwZSA9IERlc3RvcnlUeXBlLk5vbmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJiZy9jbG9zZVwiLCB0aGlzLm9uQ2xvc2VDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5vbmxpbmVDdXN0b21CdG5Ob2RlID0gdGhpcy5hZGRDb21tb25DbGljayhcIm9ubGluZUN1c3RvbUJ0blwiLCB0aGlzLm9ubGluZUN1c3RvbUJ0bkNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm9mZmljaWFsV2ViQnRuTm9kZSA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJvZmZpY2lhbFdlYkJ0blwiLCB0aGlzLm9mZmljaWFsV2ViQnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY29udGVudFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5jb3VudFRpbWVMYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwidGltZUxhYmVsXCIsIGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuY29udGVudC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY291bnRUaW1lTGFiZWwuc3RyaW5nID0gXCJcIjsgLy8gPGNvbG9yPSNmMDhmNDg+PHNpemU9MjQ+PGI+PHU+5Ymp5L2Z57u05oqk5pe26Ze0IDAwOjMwOjAwPC91PjwvYj48L3NpemU+PC9jb2xvcj5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHR5cGUgICAxIOaYvuekuiDnoa7lrprlj5bmtoggIDIgIOaYvuekuiDnoa7lrppcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHllc0NhbGxiYWNrXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBub0NhbGxiYWNrXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGF1dG9DbG9zZSAg54K55Ye75oyJ6ZKu5ZCO5piv5ZCm6Ieq5Yqo5YWz6Zet55WM6Z2iXHJcbiAgICAgKiBAbWVtYmVyb2YgV25kR2FtZU1haW50YWluVUlcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpIHtcclxuICAgICAgICBpZiAodGhpcy5hcmdzID09IG51bGwgfHwgdGhpcy5hcmdzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuayoeacieiuvue9ruWPguaVsFwiKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5hcmdzWzBdO1xyXG4gICAgICAgIGlmIChjb250ZW50ID09IG51bGwgfHwgY29udGVudCA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuayoeacieiuvue9ruWPguaVsFwiKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZW5kVGltZSA9IHRoaXMuYXJnc1sxXTtcclxuICAgICAgICB0aGlzLmVuZFRpbWUgPSBlbmRUaW1lO1xyXG4gICAgICAgIGxldCBzdGFydFRpbWUgPSBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7IC8v5byA5aeL5pe26Ze0XHJcbiAgICAgICAgbGV0IHQgPSB0aGlzLmVuZFRpbWUgLSBzdGFydFRpbWU7IC8v5pe26Ze05beuXHJcbiAgICAgICAgdGhpcy5zaG93TGVmdFRpbWUodClcclxuICAgICAgICB0aGlzLmNvdW50VGltZUxhYmVsLnNjaGVkdWxlKHRoaXMuc3RhcnRDb3VudGVyLmJpbmQodGhpcyksIDEsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSKVxyXG5cclxuICAgICAgICB0aGlzLmNvbnRlbnQuc3RyaW5nID0gY29udGVudDtcclxuICAgICAgICB0aGlzLm9ubGluZUN1c3RvbUNhbGxiYWNrID0gdGhpcy5hcmdzWzJdO1xyXG4gICAgICAgIHRoaXMub2ZmaWNpYWxXZWJDYWxsYmFjayA9IHRoaXMuYXJnc1szXTtcclxuICAgICAgICB0aGlzLmNsb3NlQ2FsbGJhY2sgPSB0aGlzLmFyZ3NbNF07XHJcbiAgICAgICAgdGhpcy5hdXRvQ2xvc2UgPSB0aGlzLmFyZ3NbNV0gIT0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdXRvUmVsZWFzZUZ1bmMgPSB0aGlzLmFyZ3NbNl0gIT0gZmFsc2U7XHJcblxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5GT1JDRV9ISURFX1dBSVRJTkcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gKiBcclxuICogQGRlc2MgICDmoLzlvI/ljJbnjrDlnKjot50ke2VuZFRpbWV955qE5Ymp5L2Z5pe26Ze0XHJcbiAqIEBwYXJhbSAge0RhdGV9IGVuZFRpbWUgIFxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqL1xyXG4gICAgcHJpdmF0ZSBmb3JtYXRSZW1haW5UaW1lKGxlZnRUaW1lKSB7XHJcbiAgICAgICAgbGV0IHQgPSBsZWZ0VGltZVxyXG4gICAgICAgIGxldCBkID0gMCxcclxuICAgICAgICAgICAgaCA9IDAsXHJcbiAgICAgICAgICAgIG0gPSAwLFxyXG4gICAgICAgICAgICBzID0gMDtcclxuICAgICAgICBpZiAodCA+PSAwKSB7XHJcbiAgICAgICAgICAgIGggPSBNYXRoLmZsb29yKHQgIC8gNjAgLyA2MCAlIDI0KTtcclxuICAgICAgICAgICAgbSA9IE1hdGguZmxvb3IodCAgLyA2MCAlIDYwKTtcclxuICAgICAgICAgICAgcyA9IE1hdGguZmxvb3IodCAgJSA2MCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBoX3N0ciA9IFwiXCI7XHJcbiAgICAgICAgbGV0IG1fc3RyID0gXCJcIjtcclxuICAgICAgICBsZXQgc19zdHIgPSBcIlwiO1xyXG4gICAgICAgIGlmIChoIDwgMTApe1xyXG4gICAgICAgICAgICBoX3N0ciA9IFwiMFwiICsgaFxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgaF9zdHIgPSBoX3N0ciArIGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtIDwgMTApe1xyXG4gICAgICAgICAgICBtX3N0ciA9IFwiMFwiICsgbVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgbV9zdHIgPSBtX3N0ciArIG07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChzIDwgMTApe1xyXG4gICAgICAgICAgICBzX3N0ciA9IFwiMFwiICsgc1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgc19zdHIgPSBzX3N0ciArIHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBoX3N0ciArIFwiOlwiICsgbV9zdHIgKyBcIjpcIiArIHNfc3RyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd0xlZnRUaW1lKGxlZnRUaW1lKSB7XHJcbiAgICAgICAgbGV0IGxlZnRUaW1lU3RyID0gdGhpcy5mb3JtYXRSZW1haW5UaW1lKGxlZnRUaW1lKVxyXG4gICAgICAgIHRoaXMuY291bnRUaW1lTGFiZWwuc3RyaW5nID0gIFwi5Ymp5L2Z57u05oqk5pe26Ze0XCIrIGxlZnRUaW1lU3RyIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RvcENvdW50ZXIoKSB7XHJcbiAgICAgICAgdGhpcy5jb3VudFRpbWVMYWJlbC51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXJ0Q291bnRlcigpIHtcclxuICAgICAgICBsZXQgc3RhcnRUaW1lID0gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApOyAvL+W8gOWni+aXtumXtFxyXG4gICAgICAgIGxldCB0ID0gdGhpcy5lbmRUaW1lIC0gc3RhcnRUaW1lOyAvL+aXtumXtOW3rlxyXG4gICAgICAgIHRoaXMuc2hvd0xlZnRUaW1lKHQpXHJcbiAgICAgICAgaWYgKHQgPD0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcENvdW50ZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5vbkNsb3NlQ2xpY2soKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvZmZpY2lhbFdlYkJ0bkNsaWNrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9mZmljaWFsV2ViQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5vZmZpY2lhbFdlYkNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xvc2VDbGljaygpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlQW5pbUZpbmlzaCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jbG9zZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlQ2FsbGJhY2sgPSBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25saW5lQ3VzdG9tQnRuQ2xpY2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub25saW5lQ3VzdG9tQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5vbmxpbmVDdXN0b21DYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59Il19