
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/MessageItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '814fde3BR5DRpjYR0cTh0cx', 'MessageItem');
// hall/scripts/logic/hall/ui/recharge/MessageItem.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MessageItem = /** @class */ (function (_super) {
    __extends(MessageItem, _super);
    function MessageItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spriteList = [];
        _this.stringList = [];
        _this.iconSprite = null;
        _this.iconName = null;
        _this.messageLabel = null;
        _this._isRechargePanel = false;
        _this._isMyself = false;
        _this._isOther = false;
        _this.holdTime = 0; //用来检测长按
        _this.holdClick = false; //用来检测点击
        return _this;
    }
    Object.defineProperty(MessageItem.prototype, "isRechargePanel", {
        /* @property(cc.Label)
        servicerName: cc.Label = null;
    
        @property([cc.SpriteFrame])
        btnSpriteList : Array<cc.SpriteFrame> = []; */
        /* private data : any = null;
        private btn_RichText: cc.RichText;
        private btnSprite: cc.Sprite;
        // private btn_Label: cc.Label;
        private isOnlineServicer: boolean = false; */
        get: function () {
            return this._isRechargePanel;
        },
        set: function (isPanrel) {
            this._isRechargePanel = isPanrel;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MessageItem.prototype, "isMyself", {
        get: function () {
            return this._isMyself;
        },
        set: function (isMyself) {
            this._isMyself = isMyself;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MessageItem.prototype, "isOther", {
        get: function () {
            return this._isOther;
        },
        set: function (isOther) {
            this._isOther = isOther;
        },
        enumerable: false,
        configurable: true
    });
    MessageItem.prototype.reset = function () {
    };
    MessageItem.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    };
    MessageItem.prototype.touchStart = function () {
        this.holdClick = true;
        this.holdTime = 0;
    };
    MessageItem.prototype.touchEnd = function () {
        this.holdClick = false;
        //开始记录时间
        this.holdTime = 0;
    };
    MessageItem.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    };
    MessageItem.prototype.update = function (dt) {
        if (this.holdClick) {
            this.holdTime += dt;
            if (this.holdTime > 1500) {
                //如果长按时间大于1.5s，则认为长按了1.5s
                this.holdTime = 1500;
                var msg = this.messageLabel.string;
                if (msg && msg != null) {
                    this.ServicerBtnFunc(msg);
                }
            }
        }
    };
    MessageItem.prototype.setData = function (data) {
    };
    MessageItem.prototype.copyTextToClipboardCallBack = function (retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("已复制到剪贴板");
        }
        else {
            Global.UI.fastTip("复制失败");
        }
    };
    //复制消息
    MessageItem.prototype.ServicerBtnFunc = function (str) {
        Global.NativeEvent.copyTextToClipboard(str, this.copyTextToClipboardCallBack.bind(this));
    };
    __decorate([
        property([cc.SpriteFrame])
    ], MessageItem.prototype, "spriteList", void 0);
    __decorate([
        property([cc.String])
    ], MessageItem.prototype, "stringList", void 0);
    __decorate([
        property(cc.Sprite)
    ], MessageItem.prototype, "iconSprite", void 0);
    __decorate([
        property(cc.Label)
    ], MessageItem.prototype, "iconName", void 0);
    __decorate([
        property(cc.Label)
    ], MessageItem.prototype, "messageLabel", void 0);
    MessageItem = __decorate([
        ccclass
    ], MessageItem);
    return MessageItem;
}(cc.Component));
exports.default = MessageItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcTWVzc2FnZUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUFvSEM7UUFqSEcsZ0JBQVUsR0FBMEIsRUFBRSxDQUFDO1FBR3ZDLGdCQUFVLEdBQWtCLEVBQUUsQ0FBQztRQUcvQixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBRzFCLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRXRCLHNCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxlQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLGNBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsY0FBUSxHQUFHLENBQUMsQ0FBQyxDQUFJLFFBQVE7UUFDekIsZUFBUyxHQUFHLEtBQUssQ0FBQyxDQUFFLFFBQVE7O0lBK0Z4QyxDQUFDO0lBakZHLHNCQUFXLHdDQUFlO1FBWjFCOzs7O3NEQUk4QztRQUU5Qzs7OztxREFJNkM7YUFFN0M7WUFDSSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqQyxDQUFDO2FBRUQsVUFBMkIsUUFBaUI7WUFDeEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztRQUNyQyxDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLGlDQUFRO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7YUFFRCxVQUFvQixRQUFpQjtZQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUM5QixDQUFDOzs7T0FKQTtJQU1ELHNCQUFXLGdDQUFPO2FBQWxCO1lBQ0ksT0FBTyxJQUFJ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Q0FBQztxREFDVztJQWZiLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FvSC9CO0lBQUQsa0JBQUM7Q0FwSEQsQUFvSEMsQ0FwSHdDLEVBQUUsQ0FBQyxTQUFTLEdBb0hwRDtrQkFwSG9CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzc2FnZUl0ZW0gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxyXG4gICAgc3ByaXRlTGlzdDogQXJyYXk8Y2MuU3ByaXRlRnJhbWU+ID0gW107XHJcblxyXG4gICAgQHByb3BlcnR5KFtjYy5TdHJpbmddKVxyXG4gICAgc3RyaW5nTGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBpY29uU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIGljb25OYW1lOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgbWVzc2FnZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfaXNSZWNoYXJnZVBhbmVsOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9pc015c2VsZjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfaXNPdGhlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBob2xkVGltZSA9IDA7ICAgIC8v55So5p2l5qOA5rWL6ZW/5oyJXHJcbiAgICBwcml2YXRlIGhvbGRDbGljayA9IGZhbHNlOyAgLy/nlKjmnaXmo4DmtYvngrnlh7tcclxuXHJcbiAgICAvKiBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBzZXJ2aWNlck5hbWU6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcclxuICAgIGJ0blNwcml0ZUxpc3QgOiBBcnJheTxjYy5TcHJpdGVGcmFtZT4gPSBbXTsgKi9cclxuXHJcbiAgICAvKiBwcml2YXRlIGRhdGEgOiBhbnkgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBidG5fUmljaFRleHQ6IGNjLlJpY2hUZXh0O1xyXG4gICAgcHJpdmF0ZSBidG5TcHJpdGU6IGNjLlNwcml0ZTtcclxuICAgIC8vIHByaXZhdGUgYnRuX0xhYmVsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgaXNPbmxpbmVTZXJ2aWNlcjogYm9vbGVhbiA9IGZhbHNlOyAqL1xyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNSZWNoYXJnZVBhbmVsKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1JlY2hhcmdlUGFuZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpc1JlY2hhcmdlUGFuZWwoaXNQYW5yZWw6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9pc1JlY2hhcmdlUGFuZWwgPSBpc1BhbnJlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzTXlzZWxmKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc015c2VsZjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGlzTXlzZWxmKGlzTXlzZWxmOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5faXNNeXNlbGYgPSBpc015c2VsZjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzT3RoZXIoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzT3RoZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpc090aGVyKGlzT3RoZXI6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9pc090aGVyID0gaXNPdGhlcjtcclxuICAgIH1cclxuXHJcbiAgICByZXNldCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy50b3VjaFN0YXJ0LCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnRvdWNoRW5kLCB0aGlzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdG91Y2hTdGFydCgpIHtcclxuICAgICAgICB0aGlzLmhvbGRDbGljayA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ob2xkVGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdG91Y2hFbmQoKSB7XHJcbiAgICAgICAgdGhpcy5ob2xkQ2xpY2sgPSBmYWxzZTtcclxuICAgICAgICAvL+W8gOWni+iusOW9leaXtumXtFxyXG4gICAgICAgIHRoaXMuaG9sZFRpbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLnRvdWNoU3RhcnQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnRvdWNoRW5kLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGUoZHQpIHtcclxuICAgICAgICBpZiAodGhpcy5ob2xkQ2xpY2spIHtcclxuICAgICAgICAgICAgdGhpcy5ob2xkVGltZSArPSBkdDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaG9sZFRpbWUgPiAxNTAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenOmVv+aMieaXtumXtOWkp+S6jjEuNXPvvIzliJnorqTkuLrplb/mjInkuoYxLjVzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvbGRUaW1lID0gMTUwMDtcclxuICAgICAgICAgICAgICAgIGxldCBtc2cgPSB0aGlzLm1lc3NhZ2VMYWJlbC5zdHJpbmc7XHJcbiAgICAgICAgICAgICAgICBpZiAobXNnICYmIG1zZyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TZXJ2aWNlckJ0bkZ1bmMobXNnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldERhdGEoZGF0YTogYW55KSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvcHlUZXh0VG9DbGlwYm9hcmRDYWxsQmFjayhyZXRTdHIpIHtcclxuICAgICAgICBpZiAocmV0U3RyLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5bey5aSN5Yi25Yiw5Ymq6LS05p2/XCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5aSN5Yi25aSx6LSlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WkjeWItua2iOaBr1xyXG4gICAgU2VydmljZXJCdG5GdW5jKHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNvcHlUZXh0VG9DbGlwYm9hcmQoc3RyLCB0aGlzLmNvcHlUZXh0VG9DbGlwYm9hcmRDYWxsQmFjay5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxufVxyXG4iXX0=