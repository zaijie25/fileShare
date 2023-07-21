"use strict";
cc._RF.push(module, '50eeaih/QpGRqCR1FOSWiZ0', 'ErmjMenuView');
// ermj/Ermj/scripts/subView/ErmjMenuView.ts

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
var ErmjBaseView_1 = require("./ErmjBaseView");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjDriver_1 = require("../ErmjDriver");
var ErmjMenuView = /** @class */ (function (_super) {
    __extends(ErmjMenuView, _super);
    function ErmjMenuView(node) {
        var _this = _super.call(this) || this;
        _this.isPressed = false;
        _this.setNode(node);
        return _this;
    }
    ErmjMenuView.prototype.initView = function () {
        this.bgNode = this.getChild('maskBg');
        this.bgNode.active = false;
        ErmjGameConst_1.default.addCommonClick(this.bgNode, "", this.onBgTouch, this, cc.Button.Transition.NONE);
        this.pressDownBtn = this.getChild("menuBtn/sprite_down");
        this.pressUpBtn = this.getChild("menuBtn/sprite_up");
        ErmjGameConst_1.default.addCommonClick(this.node, "menuBtn", this.onMenuBtnClick, this);
        this.menuContainer = this.getChild("maskNode/menuContainer");
        this.menuRawPos = this.menuContainer.position;
        this.menuContainer.active = false;
        this.menuContainer.setPosition(0, this.menuContainer.height);
        ErmjGameConst_1.default.addCommonClick(this.node, "maskNode/menuContainer/settingBtn", this.onSettingBtnClick, this);
        ErmjGameConst_1.default.addCommonClick(this.node, "maskNode/menuContainer/ruleBtn", this.onRuleBtnClick, this);
        ErmjGameConst_1.default.addCommonClick(this.node, "maskNode/menuContainer/exitBtn", this.onExitBtnClick, this);
    };
    ErmjMenuView.prototype.onBgTouch = function () {
        this.bgNode.active = false;
        this.menuBtnClick();
    };
    ErmjMenuView.prototype.menuBtnClick = function (isTween) {
        if (isTween === void 0) { isTween = true; }
        if (this.isPressed) {
            this.isPressed = false;
            this.pressUpBtn.active = false;
            this.pressDownBtn.active = true;
            this.bgNode.active = false;
            this.menuContainer.stopAllActions();
            var endPos = cc.v2(this.menuRawPos.x, this.menuRawPos.y + this.menuContainer.height);
            if (isTween) {
                this.menuContainer.runAction(cc.moveTo(0.2, endPos).easing(cc.easeBackIn()));
            }
            else {
                this.menuContainer.setPosition(endPos);
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
                this.menuContainer.runAction(cc.moveTo(0.2, cc.v2(this.menuRawPos.x, this.menuRawPos.y)).easing(cc.easeBackOut()));
            }
            else {
                this.menuContainer.setPosition(cc.v2(this.menuRawPos.x, this.menuRawPos.y));
            }
        }
    };
    ErmjMenuView.prototype.onMenuBtnClick = function () {
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        this.menuBtnClick();
    };
    ErmjMenuView.prototype.onSettingBtnClick = function () {
        this.menuBtnClick();
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        ErmjDriver_1.default.instance.openSettingPop();
    };
    ErmjMenuView.prototype.onRuleBtnClick = function () {
        this.menuBtnClick();
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        ErmjDriver_1.default.instance.openRulePop();
    };
    ErmjMenuView.prototype.onExitBtnClick = function () {
        var _this = this;
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        this.menuBtnClick(false);
        var inGame = this.Context.get(this.Define.FieldGameStart);
        if (inGame) {
            Global.UI.showYesNoBox('退出后将自动变为托管出牌，且在牌局结束前无法进入其他游戏。确定退出吗？', function () {
                Game.Server.send(_this.Define.CmdLeave, { "IsClose": 1 });
                ErmjDriver_1.default.instance.leaveGame();
            });
        }
        else {
            Game.Server.send(this.Define.CmdLeave, { "IsClose": 1 });
            ErmjDriver_1.default.instance.leaveGame();
            Global.UI.close("WndMessageBox");
        }
    };
    ErmjMenuView.prototype.clearByGame = function () {
        if (this.isPressed) {
            this.menuBtnClick(false);
        }
    };
    return ErmjMenuView;
}(ErmjBaseView_1.default));
exports.default = ErmjMenuView;

cc._RF.pop();