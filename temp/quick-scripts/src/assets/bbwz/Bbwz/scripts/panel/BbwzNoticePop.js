"use strict";
cc._RF.push(module, 'c5c82P8qbZAVoCeVpOeyPNi', 'BbwzNoticePop');
// bbwz/Bbwz/scripts/panel/BbwzNoticePop.ts

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
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
/**
 * 弹窗 提示界面
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BbwzNoticePop = /** @class */ (function (_super) {
    __extends(BbwzNoticePop, _super);
    function BbwzNoticePop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzNoticePop.prototype.onLoad = function () {
        this.node.setContentSize(cc.Canvas.instance.node.getContentSize());
        this.maskNode = cc.find("mask", this.node);
        this.contentNode = cc.find("content", this.node);
        this.animComp = Global.UIHelper.addAnimComp(this.node, this.contentNode, this.maskNode);
        this.buttonYesNode = BbwzConstDefine_1.default.addCommonClick(this.contentNode, "btnLayout/button_no", this.onCloseClick, this);
        this.buttonNoNode = BbwzConstDefine_1.default.addCommonClick(this.contentNode, "btnLayout/button_yes", this.onYesBtnClick, this);
        this.richText = cc.find("richText", this.contentNode).getComponent(cc.RichText);
        Game.Event.on(Game.EVENT_MESSAGE_BOX, this, this.onMessageBox);
    };
    BbwzNoticePop.prototype.onEnable = function () {
        Global.UI.SetMessageBoxInGame(true);
        this.animComp.doPopupOpenAnim();
    };
    BbwzNoticePop.prototype.onDisable = function () {
        Global.UI.SetMessageBoxInGame(false);
    };
    BbwzNoticePop.prototype.onDestroy = function () {
        Game.Event.off(Game.EVENT_MESSAGE_BOX, this, this.onMessageBox);
    };
    BbwzNoticePop.prototype.onCloseClick = function () {
        var _this = this;
        BbwzConstDefine_1.default.playBtnSound();
        this.animComp.doPopupCloseAnim(function () {
            _this.node.active = false;
        });
        if (this.customCbNo) {
            this.customCbNo();
            this.customCbNo = null;
        }
    };
    BbwzNoticePop.prototype.onYesBtnClick = function () {
        var _this = this;
        BbwzConstDefine_1.default.playBtnSound();
        this.animComp.doPopupCloseAnim(function () {
            _this.node.active = false;
        });
        if (this.customCbYes) {
            this.customCbYes();
            this.customCbYes = null;
            return;
        }
    };
    BbwzNoticePop.prototype.setCustomMessageBox = function (content, type, cbYes, cbNo) {
        if (type === void 0) { type = 0; }
        this.richText.string = content;
        this.customCbYes = cbYes;
        this.customCbNo = cbNo;
        if (type == 0) { // layout布局
            this.buttonYesNode.active = true;
            this.buttonNoNode.active = true;
        }
        else {
            this.buttonYesNode.active = true;
            this.buttonNoNode.active = false;
        }
    };
    // 大厅弹窗Messagebox
    BbwzNoticePop.prototype.onMessageBox = function (objArr) {
        var content = objArr[0];
        var type = parseInt(objArr[1]) - 1; //大厅type：1-有确定和取消2个按钮 2-只有确定按钮  注意与子游戏区分
        var funcY = objArr[2];
        var funcN = objArr[3];
        this.setCustomMessageBox(content, type, funcY, funcN);
    };
    BbwzNoticePop = __decorate([
        ccclass
    ], BbwzNoticePop);
    return BbwzNoticePop;
}(cc.Component));
exports.default = BbwzNoticePop;

cc._RF.pop();