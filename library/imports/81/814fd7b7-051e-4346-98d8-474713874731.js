"use strict";
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