"use strict";
cc._RF.push(module, 'a0dbcpZuBNLw7dIcKUoSYcf', 'DdzMenuView');
// ddz/ddz/scripts/subView/DdzMenuView.ts

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
var DdzBaseView_1 = require("./DdzBaseView");
var DdzPathHelper_1 = require("../data/DdzPathHelper");
var DdzDriver_1 = require("../DdzDriver");
var DdzGameConst_1 = require("../data/DdzGameConst");
var DdzMenuView = /** @class */ (function (_super) {
    __extends(DdzMenuView, _super);
    function DdzMenuView(node) {
        var _this = _super.call(this) || this;
        _this.isPressed = false;
        _this.setNode(node);
        return _this;
    }
    DdzMenuView.prototype.initView = function () {
        this.bgNode = this.getChild('maskBg');
        this.bgNode.active = false;
        DdzGameConst_1.default.addCommonClick(this.bgNode, "", this.onBgTouch, this, cc.Button.Transition.NONE);
        this.pressDownBtn = this.getChild("menuBtn/sprite_down");
        this.pressDownBtn.active = true;
        this.pressUpBtn = this.getChild("menuBtn/sprite_up");
        this.pressUpBtn.active = false;
        DdzGameConst_1.default.addCommonClick(this.node, "menuBtn", this.onMenuBtnClick, this);
        this.menuContainer = this.getChild("maskNode/menuContainer");
        this.menuRawPos = this.menuContainer.position;
        this.menuContainer.active = false;
        this.menuContainer.setPosition(0, this.menuContainer.height);
        DdzGameConst_1.default.addCommonClick(this.node, "maskNode/menuContainer/settingBtn", this.onSettingBtnClick, this);
        DdzGameConst_1.default.addCommonClick(this.node, "maskNode/menuContainer/ruleBtn", this.onRuleBtnClick, this);
        DdzGameConst_1.default.addCommonClick(this.node, "maskNode/menuContainer/exitBtn", this.onExitBtnClick, this);
    };
    DdzMenuView.prototype.onBgTouch = function () {
        this.bgNode.active = false;
        this.menuBtnClick();
    };
    DdzMenuView.prototype.menuBtnClick = function (isTween) {
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
    DdzMenuView.prototype.onMenuBtnClick = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        this.menuBtnClick();
    };
    DdzMenuView.prototype.onSettingBtnClick = function () {
        this.menuBtnClick();
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        DdzDriver_1.default.instance.openSettingPop();
    };
    DdzMenuView.prototype.onRuleBtnClick = function () {
        this.menuBtnClick();
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        DdzDriver_1.default.instance.openRulePop();
    };
    DdzMenuView.prototype.onExitBtnClick = function () {
        var _this = this;
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        this.menuBtnClick(false);
        var inGame = this.Context.get(this.Define.FieldGameStart);
        if (inGame) {
            Global.UI.showYesNoBox('退出后将自动变为托管出牌，且在牌局结束前无法进入其他游戏。确定退出吗？', function () {
                Game.Server.send(_this.Define.CmdLeave, { "IsClose": 1 });
                DdzDriver_1.default.instance.leaveGame();
            });
        }
        else {
            Game.Server.send(this.Define.CmdLeave, { "IsClose": 1 });
            DdzDriver_1.default.instance.leaveGame();
            Global.UI.close("WndMessageBox");
        }
    };
    DdzMenuView.prototype.clearByGame = function () {
        if (this.isPressed) {
            this.menuBtnClick(false);
        }
    };
    return DdzMenuView;
}(DdzBaseView_1.default));
exports.default = DdzMenuView;

cc._RF.pop();