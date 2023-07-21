"use strict";
cc._RF.push(module, '0b8c4bIl7NM6LFIXQYZk8ox', 'FastTip');
// hall/scripts/logic/hall/ui/common/FastTip.ts

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
var FastTip = /** @class */ (function () {
    function FastTip() {
        this.tipList = [];
        this.msgList = [];
        this.CHECK_INTERVAL = 0.3;
        this.TIP_DISTANCE_H = 50;
        this.MAX_TIP_COUNT = 5;
        //透明时间
        this.FADE_OUT_TIME = 0.1;
        //移动时间
        this.MOVE_UP_TIME = 0.2;
        //tip起始位置
        this.START_POS_Y = 20;
        //tip显示时间
        this.TIP_LIVE_TIME = 2;
        this.timeInterval = 0;
        this.curTipIndex = 0;
        this.hasInit = false;
    }
    FastTip.prototype.initTip = function (root) {
        var _this = this;
        this.timeInterval = 0;
        if (this.hasInit) {
            Logger.error("重复初始化");
        }
        Global.ResourceManager.loadRes("hall/prefabs/ui/FastTipItem", function (error, prefab) {
            if (!cc.isValid(root)) {
                Logger.log("root已经销毁");
                return;
            }
            if (error != null) {
                Logger.error(error.message);
            }
            if (prefab) {
                for (var i = 0; i < _this.MAX_TIP_COUNT; i++) {
                    var tip = new FastTipItem();
                    tip.setNode(cc.instantiate(prefab));
                    root.addChild(tip.node);
                    tip.node.name = "tip" + i;
                    tip.active = false;
                    _this.tipList.push(tip);
                }
                _this.hasInit = true;
            }
        });
    };
    FastTip.prototype.show = function (content) {
        if (content == null || content == "") {
            return;
        }
        if (this.isFisrt()) {
            var tip = this.getTip();
            if (tip == null)
                return;
            tip.reset();
            tip.show(content, this.START_POS_Y, 0, this.FADE_OUT_TIME, this.TIP_LIVE_TIME);
        }
        else {
            if (!this.filter(content))
                return;
            this.msgList.push(content);
        }
    };
    //过滤掉重复提示
    FastTip.prototype.filter = function (content) {
        if (this.msgList.indexOf(content) > -1)
            return false;
        for (var i = 0; i < this.tipList.length; i++) {
            if (this.tipList[i].getContent() == content)
                return false;
        }
        return true;
    };
    FastTip.prototype.clearAll = function () {
        for (var i = 0; i < this.tipList.length; i++) {
            this.tipList[i].dispose();
        }
        this.tipList = [];
        this.hasInit = false;
    };
    FastTip.prototype.onUpdate = function (dt) {
        if (!this.hasInit)
            return;
        this.timeInterval += dt;
        if (this.timeInterval > this.CHECK_INTERVAL) {
            this.timeInterval = 0;
            if (this.msgList.length == 0)
                return;
            //播放
            var msg = this.msgList.shift();
            var tip = this.getTip();
            tip.reset();
            tip.show(msg, this.START_POS_Y, this.MOVE_UP_TIME, this.FADE_OUT_TIME, this.TIP_LIVE_TIME);
            for (var i = 0; i < this.tipList.length; i++) {
                if (this.tipList[i] != tip && this.tipList[i].isRunning)
                    this.tipList[i].moveUp(this.MOVE_UP_TIME, this.TIP_DISTANCE_H);
            }
        }
    };
    FastTip.prototype.getTip = function () {
        var tip = this.tipList[this.curTipIndex];
        this.curTipIndex = (this.curTipIndex + 1) % this.MAX_TIP_COUNT;
        return tip;
    };
    FastTip.prototype.isFisrt = function () {
        for (var i = 0; i < this.tipList.length; i++) {
            if (this.tipList[i].isRunning)
                return false;
        }
        return true;
    };
    return FastTip;
}());
exports.default = FastTip;
var ViewBase_1 = require("../../../core/ui/ViewBase");
var FastTipItem = /** @class */ (function (_super) {
    __extends(FastTipItem, _super);
    function FastTipItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.targetPosY = 0;
        return _this;
    }
    FastTipItem.prototype.initView = function () {
        this.content = this.getComponent("content", cc.Label);
        this.bgNode = this.getChild("black_bg");
    };
    FastTipItem.prototype.setContent = function (txt) {
        var _this = this;
        this.content.string = txt;
        var txtWidth = this.content.node.width;
        setTimeout(function () {
            if (cc.isValid(_this.content.node)) {
                txtWidth = _this.content.node.width;
                if (txtWidth < 40)
                    txtWidth = 40;
                var width = txtWidth + 150;
                if (width < 602)
                    width = 602;
                _this.bgNode.width = width;
            }
        }, 20);
    };
    FastTipItem.prototype.getContent = function () {
        if (this.node && this.node.isValid) {
            return this.content.string;
        }
    };
    FastTipItem.prototype.reset = function () {
        this.targetPosY = 0;
        this.node.active = false;
        this.content.string = "";
        this.content.unscheduleAllCallbacks();
        this.node.stopAllActions();
    };
    FastTipItem.prototype.show = function (content, posY, delayTime, time, hideTime) {
        var _this = this;
        this.setContent(content);
        this.targetPosY = posY;
        this.isRunning = true;
        this.node.active = true;
        this.node.y = posY;
        this.node.opacity = 0;
        var sequence = cc.sequence(cc.delayTime(delayTime), cc.fadeIn(time));
        this.node.runAction(sequence);
        // this.content.scheduleOnce(()=>{
        //     this.node.runAction(cc.fadeIn(time));
        //     // this.isRunning = false;
        // }, hideTime)
        this.content.scheduleOnce(function () {
            _this.node.runAction(cc.fadeOut(time));
            _this.isRunning = false;
        }, hideTime);
    };
    FastTipItem.prototype.moveUp = function (time, distance) {
        this.targetPosY += distance;
        this.node.runAction(cc.moveTo(time, this.node.x, this.targetPosY)
            .easing(cc.easeIn(1)));
    };
    FastTipItem.prototype.dispose = function () {
        if (this.node && this.node.isValid) {
            this.node.removeFromParent();
            this.node.destroy();
        }
    };
    return FastTipItem;
}(ViewBase_1.default));

cc._RF.pop();