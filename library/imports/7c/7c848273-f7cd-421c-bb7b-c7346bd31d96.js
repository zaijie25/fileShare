"use strict";
cc._RF.push(module, '7c848Jz981CHLt7xzRr0x2W', 'WndScreenPortraitNotice');
// hall/scripts/logic/hall/ui/common/WndScreenPortraitNotice.ts

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
/**
 * 横竖版转换提示UI
 */
var WndBase_1 = require("../../../core/ui/WndBase");
var WndScreenPortraitNotice = /** @class */ (function (_super) {
    __extends(WndScreenPortraitNotice, _super);
    function WndScreenPortraitNotice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 背景的Sprite */
        _this.bgSprite = null;
        /** 竖屏提示动画 */
        _this.noticeSpine = null;
        /** 动画播放完成后的回调 */
        _this.finishCallBack = null;
        /** 界面显示时长 */
        _this.showTime = 0;
        /** 界面开始显示时间 */
        _this.beginShowTick = 0;
        return _this;
    }
    WndScreenPortraitNotice.prototype.onInit = function () {
        this.name = "WndScreenPortraitNotice";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/ScreenPortraitNoticeUI";
        this.showBg = false;
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndScreenPortraitNotice.prototype.initView = function () {
        this.bgSprite = this.getComponent("bg", cc.Sprite);
        if (this.bgSprite == null) {
            Logger.error("WndScreenPortraitNotice::onInit() this.bgSprite == null");
        }
        this.noticeSpine = this.getComponent("content/spineNode", sp.Skeleton);
        if (this.noticeSpine == null) {
            Logger.error("WndScreenPortraitNotice::onInit() this.noticeSpine == null");
        }
    };
    /**
     * @param {Function} finishCallBack
     * @param {number} showTime
     * @memberof WndScreenPortraitNotice
     */
    WndScreenPortraitNotice.prototype.onOpen = function () {
        var self = this;
        if (this.args == null || this.args.length == 0) {
            Logger.error("WndScreenPortraitNotice::onOpen() 没有设置参数");
            this.close();
            return;
        }
        var finishCallBack = this.args[0];
        if (finishCallBack == null || finishCallBack == "") {
            Logger.error("WndScreenPortraitNotice::onOpen() finishCallBack = null");
            this.close();
            return;
        }
        this.finishCallBack = finishCallBack;
        var showTime = this.args[1];
        showTime = (!showTime || showTime <= 0) ? 0 : showTime;
        showTime = (showTime > 10) ? 10 : showTime;
        this.showTime = showTime;
        // Logger.error("WndScreenPortraitNotice::onOpen() this.showTime = " + this.showTime);
        if (this.showTime > 0 && this.bgSprite) {
            this.beginShowTick = Date.now();
            this.bgSprite.schedule(function () {
                self.checkTimer();
            }, 0.1);
        }
        if (this.noticeSpine) {
            var loop = (this.showTime > 0);
            var animName_1 = "idle";
            this.noticeSpine.clearTrack(0);
            this.noticeSpine.addAnimation(0, animName_1, loop);
            if (!loop) {
                this.noticeSpine.setCompleteListener(function (trackEntry) {
                    var name = trackEntry.animation ? trackEntry.animation.name : '';
                    if (name === animName_1) {
                        if (self.finishCallBack) {
                            self.finishCallBack();
                        }
                        self.close();
                    }
                });
            }
        }
    };
    /** 时间检查 */
    WndScreenPortraitNotice.prototype.checkTimer = function () {
        // Logger.error("WndScreenPortraitNotice::checkTimer() this.showTime = " + this.showTime);
        if ((Date.now() - this.beginShowTick) >= this.showTime * 1000) {
            if (this.finishCallBack) {
                this.finishCallBack();
            }
            this.bgSprite.unscheduleAllCallbacks();
            this.close();
        }
    };
    return WndScreenPortraitNotice;
}(WndBase_1.default));
exports.default = WndScreenPortraitNotice;

cc._RF.pop();