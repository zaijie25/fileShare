"use strict";
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