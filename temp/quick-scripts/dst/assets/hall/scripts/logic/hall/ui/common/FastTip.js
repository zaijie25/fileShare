
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/common/FastTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxjb21tb25cXEZhc3RUaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7SUFBQTtRQUVZLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWIsbUJBQWMsR0FBRyxHQUFHLENBQUM7UUFDckIsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDcEIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDMUIsTUFBTTtRQUNFLGtCQUFhLEdBQUcsR0FBRyxDQUFDO1FBQzVCLE1BQU07UUFDRSxpQkFBWSxHQUFHLEdBQUcsQ0FBQztRQUMzQixTQUFTO1FBQ0QsZ0JBQVcsR0FBRyxFQUFFLENBQUE7UUFDeEIsU0FBUztRQUNELGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBR2pCLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBRWhCLFlBQU8sR0FBRyxLQUFLLENBQUM7SUE4SDVCLENBQUM7SUE1SFUseUJBQU8sR0FBZCxVQUFlLElBQVk7UUFBM0IsaUJBZ0NDO1FBOUJHLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFDZjtZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDekI7UUFDRCxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsRUFBRSxVQUFDLEtBQUssRUFBRSxNQUFNO1lBRXhFLElBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUNwQjtnQkFDSSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN2QixPQUFPO2FBQ1Y7WUFDRCxJQUFHLEtBQUssSUFBSSxJQUFJLEVBQ2hCO2dCQUNJLE1BQU0sQ0FBQyxLQUFL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QVEsQ0FBQyxDQUFDO1FBRTlCLGtDQUFrQztRQUNsQyw0Q0FBNEM7UUFDNUMsaUNBQWlDO1FBQ2pDLGVBQWU7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztZQUN0QixLQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2hCLENBQUM7SUFFTSw0QkFBTSxHQUFiLFVBQWMsSUFBSSxFQUFFLFFBQVE7UUFFeEIsSUFBSSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUM1RCxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVNLDZCQUFPLEdBQWQ7UUFFSSxJQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQ2pDO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQW5GQSxBQW1GQyxDQW5GeUIsa0JBQVEsR0FtRmpDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhc3RUaXAgXHJcbntcclxuICAgIHByaXZhdGUgdGlwTGlzdCA9IFtdO1xyXG4gICAgcHJpdmF0ZSBtc2dMaXN0ID0gW107XHJcblxyXG4gICAgcHJpdmF0ZSBDSEVDS19JTlRFUlZBTCA9IDAuMztcclxuICAgIHByaXZhdGUgVElQX0RJU1RBTkNFX0ggPSA1MDtcclxuICAgIHByaXZhdGUgTUFYX1RJUF9DT1VOVCA9IDU7XHJcbiAgICAvL+mAj+aYjuaXtumXtFxyXG4gICAgcHJpdmF0ZSBGQURFX09VVF9USU1FID0gMC4xO1xyXG4gICAgLy/np7vliqjml7bpl7RcclxuICAgIHByaXZhdGUgTU9WRV9VUF9USU1FID0gMC4yO1xyXG4gICAgLy90aXDotbflp4vkvY3nva5cclxuICAgIHByaXZhdGUgU1RBUlRfUE9TX1kgPSAyMFxyXG4gICAgLy90aXDmmL7npLrml7bpl7RcclxuICAgIHByaXZhdGUgVElQX0xJVkVfVElNRSA9IDI7XHJcblxyXG4gICAgcHJpdmF0ZSB0aW1lSW50ZXJ2YWwgPSAwO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIGN1clRpcEluZGV4ID0gMDtcclxuXHJcbiAgICBwcml2YXRlIGhhc0luaXQgPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgaW5pdFRpcChyb290OmNjLk5vZGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50aW1lSW50ZXJ2YWwgPSAwO1xyXG4gICAgICAgIGlmKHRoaXMuaGFzSW5pdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIumHjeWkjeWIneWni+WMllwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkUmVzKFwiaGFsbC9wcmVmYWJzL3VpL0Zhc3RUaXBJdGVtXCIsIChlcnJvciwgcHJlZmFiKT0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZighY2MuaXNWYWxpZChyb290KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcInJvb3Tlt7Lnu4/plIDmr4FcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZXJyb3IgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHByZWZhYilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuTUFYX1RJUF9DT1VOVDsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aXAgPSBuZXcgRmFzdFRpcEl0ZW0oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aXAuc2V0Tm9kZShjYy5pbnN0YW50aWF0ZShwcmVmYWIpKTtcclxuICAgICAgICAgICAgICAgICAgICByb290LmFkZENoaWxkKHRpcC5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aXAubm9kZS5uYW1lID0gXCJ0aXBcIiArIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwTGlzdC5wdXNoKHRpcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhc0luaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHNob3coY29udGVudDpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoY29udGVudCA9PSBudWxsIHx8IGNvbnRlbnQgPT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuaXNGaXNydCgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHRpcCA9IHRoaXMuZ2V0VGlwKCk7XHJcbiAgICAgICAgICAgIGlmKHRpcCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aXAucmVzZXQoKTtcclxuICAgICAgICAgICAgdGlwLnNob3coY29udGVudCwgdGhpcy5TVEFSVF9QT1NfWSwwLCB0aGlzLkZBREVfT1VUX1RJTUUsIHRoaXMuVElQX0xJVkVfVElNRSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmZpbHRlcihjb250ZW50KSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5tc2dMaXN0LnB1c2goY29udGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6L+H5ruk5o6J6YeN5aSN5o+Q56S6XHJcbiAgICBwcml2YXRlIGZpbHRlcihjb250ZW50KVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMubXNnTGlzdC5pbmRleE9mKGNvbnRlbnQpID4gLTEpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy50aXBMaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy50aXBMaXN0W2ldLmdldENvbnRlbnQoKSA9PSBjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGNsZWFyQWxsKClcclxuICAgIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy50aXBMaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50aXBMaXN0W2ldLmRpc3Bvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aXBMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5oYXNJbml0ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBvblVwZGF0ZShkdClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5oYXNJbml0KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy50aW1lSW50ZXJ2YWwgKz0gZHQ7XHJcbiAgICAgICAgaWYodGhpcy50aW1lSW50ZXJ2YWwgPiB0aGlzLkNIRUNLX0lOVEVSVkFMKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lSW50ZXJ2YWwgPSAwO1xyXG4gICAgICAgICAgICBpZih0aGlzLm1zZ0xpc3QubGVuZ3RoID09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8v5pKt5pS+XHJcbiAgICAgICAgICAgIGxldCBtc2cgPSB0aGlzLm1zZ0xpc3Quc2hpZnQoKTtcclxuICAgICAgICAgICAgbGV0IHRpcCA9IHRoaXMuZ2V0VGlwKCk7XHJcbiAgICAgICAgICAgIHRpcC5yZXNldCgpO1xyXG4gICAgICAgICAgICB0aXAuc2hvdyhtc2csIHRoaXMuU1RBUlRfUE9TX1ksIHRoaXMuTU9WRV9VUF9USU1FLCB0aGlzLkZBREVfT1VUX1RJTUUsIHRoaXMuVElQX0xJVkVfVElNRSk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnRpcExpc3QubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMudGlwTGlzdFtpXSAhPSB0aXAgJiYgdGhpcy50aXBMaXN0W2ldLmlzUnVubmluZylcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcExpc3RbaV0ubW92ZVVwKHRoaXMuTU9WRV9VUF9USU1FLCB0aGlzLlRJUF9ESVNUQU5DRV9IKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICBwcml2YXRlIGdldFRpcCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHRpcCA9IHRoaXMudGlwTGlzdFt0aGlzLmN1clRpcEluZGV4XTtcclxuICAgICAgICB0aGlzLmN1clRpcEluZGV4ID0gKHRoaXMuY3VyVGlwSW5kZXggKyAxKSAlIHRoaXMuTUFYX1RJUF9DT1VOVDtcclxuICAgICAgICByZXR1cm4gdGlwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNGaXNydCgpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudGlwTGlzdC5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudGlwTGlzdFtpXS5pc1J1bm5pbmcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiXHJcbmNsYXNzIEZhc3RUaXBJdGVtIGV4dGVuZHMgVmlld0Jhc2Vcclxue1xyXG4gICAgcHJpdmF0ZSBjb250ZW50OmNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBiZ05vZGU6Y2MuTm9kZTtcclxuICAgIHB1YmxpYyBpc1J1bm5pbmc7XHJcbiAgICBwcml2YXRlIHRhcmdldFBvc1kgPSAwO1xyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmdldENvbXBvbmVudChcImNvbnRlbnRcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuYmdOb2RlID0gdGhpcy5nZXRDaGlsZChcImJsYWNrX2JnXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRDb250ZW50KHR4dClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNvbnRlbnQuc3RyaW5nID0gdHh0O1xyXG4gICAgICAgIGxldCB0eHRXaWR0aCA9IHRoaXMuY29udGVudC5ub2RlLndpZHRoO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLmNvbnRlbnQubm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIHR4dFdpZHRoID0gdGhpcy5jb250ZW50Lm5vZGUud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBpZiAodHh0V2lkdGggPCA0MClcclxuICAgICAgICAgICAgICAgICAgICB0eHRXaWR0aCA9IDQwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHdpZHRoID0gdHh0V2lkdGggKyAxNTA7XHJcbiAgICAgICAgICAgICAgICBpZiAod2lkdGggPCA2MDIpXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGggPSA2MDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJnTm9kZS53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMjApO1xyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENvbnRlbnQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuaXNWYWxpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuc3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0UG9zWSA9IDA7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuY29udGVudC51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3coY29udGVudCwgcG9zWSwgZGVsYXlUaW1lLCB0aW1lLCBoaWRlVGltZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNldENvbnRlbnQoY29udGVudClcclxuICAgICAgICB0aGlzLnRhcmdldFBvc1kgPSBwb3NZO1xyXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUueSA9IHBvc1k7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIGxldCBzZXF1ZW5jZSA9IGNjLnNlcXVlbmNlKGNjLmRlbGF5VGltZShkZWxheVRpbWUpLCBjYy5mYWRlSW4odGltZSkpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oc2VxdWVuY2UpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmNvbnRlbnQuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MuZmFkZUluKHRpbWUpKTtcclxuICAgICAgICAvLyAgICAgLy8gdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAvLyB9LCBoaWRlVGltZSlcclxuICAgICAgICB0aGlzLmNvbnRlbnQuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ydW5BY3Rpb24oY2MuZmFkZU91dCh0aW1lKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNSdW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSwgaGlkZVRpbWUpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVVcCh0aW1lLCBkaXN0YW5jZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRhcmdldFBvc1kgKz0gZGlzdGFuY2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihjYy5tb3ZlVG8odGltZSwgdGhpcy5ub2RlLngsIHRoaXMudGFyZ2V0UG9zWSlcclxuICAgICAgICAgICAgLmVhc2luZyhjYy5lYXNlSW4oMSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlzcG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5ub2RlICYmIHRoaXMubm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=