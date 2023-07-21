"use strict";
cc._RF.push(module, 'd26eaArng1KTra2acmIr/HI', 'BbwzMenuView');
// bbwz/Bbwz/scripts/subview/BbwzMenuView.ts

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
var BbwzBaseView_1 = require("./BbwzBaseView");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var BbwzDriver_1 = require("../BbwzDriver");
var BbwzData_1 = require("../data/BbwzData");
var BbwzMenuView = /** @class */ (function (_super) {
    __extends(BbwzMenuView, _super);
    function BbwzMenuView(node) {
        var _this = _super.call(this) || this;
        _this.isPressed = false;
        _this.setNode(node);
        return _this;
    }
    BbwzMenuView.prototype.initView = function () {
        this.bgNode = this.getChild('maskBg');
        this.bgNode.active = false;
        BbwzConstDefine_1.default.addCommonClick(this.node, "maskBg", this.onBgTouch, this, cc.Button.Transition.NONE);
        this.pressDownBtn = this.getChild("menuBtn/sprite_down");
        this.pressUpBtn = this.getChild("menuBtn/sprite_up");
        BbwzConstDefine_1.default.addCommonClick(this.node, "menuBtn", this.onMenuBtnClick, this);
        this.menuContainer = this.getChild("maskNode/menuContainer");
        this.menuContainer.active = false;
        this.menuContainer.setPosition(0, this.menuContainer.height);
        BbwzConstDefine_1.default.addCommonClick(this.menuContainer, "settingBtn", this.onSettingBtnClick, this);
        BbwzConstDefine_1.default.addCommonClick(this.menuContainer, "ruleBtn", this.onRuleBtnClick, this);
        BbwzConstDefine_1.default.addCommonClick(this.menuContainer, "exitBtn", this.onExitBtnClick, this);
    };
    BbwzMenuView.prototype.onBgTouch = function () {
        this.bgNode.active = false;
        this.menuBtnClick();
    };
    BbwzMenuView.prototype.menuBtnClick = function (isTween) {
        if (isTween === void 0) { isTween = true; }
        if (this.isPressed) {
            this.isPressed = false;
            this.pressUpBtn.active = false;
            this.pressDownBtn.active = true;
            this.bgNode.active = false;
            this.menuContainer.stopAllActions();
            if (isTween) {
                this.menuContainer.runAction(cc.moveTo(0.2, cc.v2(0, this.menuContainer.height)).easing(cc.easeBackIn()));
            }
            else {
                this.menuContainer.setPosition(cc.v2(0, this.menuContainer.height));
            }
        }
        else {
            this.isPressed = true;
            this.pressUpBtn.active = true;
            this.pressDownBtn.active = false;
            this.menuContainer.active = true;
            this.bgNode.active = true;
            this.menuContainer.stopAllActions();
            if (isTween) {
                this.menuContainer.runAction(cc.moveTo(0.2, cc.Vec2.ZERO).easing(cc.easeBackOut()));
            }
            else {
                this.menuContainer.setPosition(cc.Vec2.ZERO);
            }
        }
    };
    BbwzMenuView.prototype.onMenuBtnClick = function () {
        BbwzConstDefine_1.default.playBtnSound();
        this.menuBtnClick();
    };
    BbwzMenuView.prototype.onSettingBtnClick = function () {
        this.menuBtnClick();
        BbwzConstDefine_1.default.playBtnSound();
        BbwzDriver_1.default.instance.settingPop.node.active = true;
    };
    BbwzMenuView.prototype.onRuleBtnClick = function () {
        this.menuBtnClick();
        BbwzConstDefine_1.default.playBtnSound();
        BbwzDriver_1.default.instance.rulePop.node.active = true;
    };
    BbwzMenuView.prototype.onExitBtnClick = function () {
        BbwzConstDefine_1.default.playBtnSound();
        this.menuBtnClick(false);
        if (BbwzData_1.default.instance.gameState >= BbwzConstDefine_1.BbwzGameState.Reward) {
            //当前局已经开奖
            BbwzDriver_1.default.instance.reqLeaveGame();
            return;
        }
        else {
            //判断自己是否已经下注
            var myTotalBet = BbwzData_1.default.instance.getMyTotalBet();
            if (myTotalBet <= 0) {
                //自己没下注，可以直接退出
                BbwzDriver_1.default.instance.reqLeaveGame();
                return;
            }
        }
        var text = "您已开始游戏，退出游戏会自动托管，不影响金币结算，确定退出吗？";
        BbwzDriver_1.default.instance.noticePop.node.active = true;
        BbwzDriver_1.default.instance.noticePop.setCustomMessageBox(text, 0, function () {
            BbwzDriver_1.default.instance.reqLeaveGame();
        });
    };
    BbwzMenuView.prototype.clearByGame = function () {
        if (this.isPressed) {
            this.menuBtnClick(false);
        }
    };
    return BbwzMenuView;
}(BbwzBaseView_1.default));
exports.default = BbwzMenuView;

cc._RF.pop();