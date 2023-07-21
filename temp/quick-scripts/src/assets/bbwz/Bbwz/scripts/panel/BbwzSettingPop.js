"use strict";
cc._RF.push(module, '5f451fHW3VPr6dvtWoUYHL2', 'BbwzSettingPop');
// bbwz/Bbwz/scripts/panel/BbwzSettingPop.ts

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
var BbwzBaseView_1 = require("../subview/BbwzBaseView");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 弹窗 设置界面
 */
var BbwzSettingPop = /** @class */ (function (_super) {
    __extends(BbwzSettingPop, _super);
    function BbwzSettingPop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BbwzSettingPop.prototype.onLoad = function () {
        this.node.setContentSize(cc.Canvas.instance.node.getContentSize());
        this.maskNode = cc.find("mask", this.node);
        this.contentNode = cc.find("content", this.node);
        this.animComp = Global.UIHelper.addAnimComp(this.node, this.contentNode, this.maskNode);
        BbwzConstDefine_1.default.addCommonClick(this.contentNode, "button_close", this.onCloseClick, this);
        BbwzConstDefine_1.default.addCommonClick(this.node, "mask", this.onCloseClick, this, cc.Button.Transition.NONE);
        this.versionLbl = cc.find('content/label_version', this.node).getComponent(cc.Label);
        var gameInfo = Global.GameData.getGameInfo(BbwzConstDefine_1.default.GAME_ID);
        if (gameInfo)
            this.versionLbl.string = "\u7248\u672C\u53F7:V" + gameInfo.native_version;
        this.initToggle();
    };
    BbwzSettingPop.prototype.initToggle = function () {
        var musicEnable = Global.Setting.settingData.musicEnable;
        var soundEnable = Global.Setting.settingData.soundEnable;
        var musicToggle = new SetToggle(cc.find("musicToggle", this.contentNode), this.onMusicToggle, this);
        var soundToggle = new SetToggle(cc.find("soundToggle", this.contentNode), this.onAudioToggle, this);
        musicToggle.isChecked = musicEnable;
        soundToggle.isChecked = soundEnable;
    };
    BbwzSettingPop.prototype.onEnable = function () {
        this.animComp.doPopupOpenAnim();
    };
    BbwzSettingPop.prototype.onCloseClick = function () {
        var _this = this;
        BbwzConstDefine_1.default.playBtnSound();
        this.animComp.doPopupCloseAnim(function () {
            _this.node.active = false;
        });
    };
    BbwzSettingPop.prototype.onMusicToggle = function (toggle) {
        BbwzConstDefine_1.default.playBtnSound();
        var state = toggle.isChecked;
        Global.Audio.setMusicEnable(state);
    };
    BbwzSettingPop.prototype.onAudioToggle = function (toggle) {
        BbwzConstDefine_1.default.playBtnSound();
        var state = toggle.isChecked;
        Global.Audio.setSoundEnable(state);
    };
    BbwzSettingPop = __decorate([
        ccclass
    ], BbwzSettingPop);
    return BbwzSettingPop;
}(cc.Component));
exports.default = BbwzSettingPop;
var SetToggle = /** @class */ (function (_super) {
    __extends(SetToggle, _super);
    function SetToggle(node, callback, target) {
        var _this = _super.call(this) || this;
        _this.callback = callback;
        _this.target = target;
        _this.setNode(node);
        return _this;
    }
    SetToggle.prototype.initView = function () {
        this.normalNode = this.getChild("close");
        this.checkNode = this.getChild("open");
        BbwzConstDefine_1.default.addCommonClick(this.node, "", this.onToggleClick, this);
    };
    SetToggle.prototype.onToggleClick = function () {
        this.isChecked = !this._isCheck;
        if (this.callback && this.target) {
            this.callback.call(this.target, this);
        }
    };
    Object.defineProperty(SetToggle.prototype, "isChecked", {
        get: function () {
            return this._isCheck;
        },
        set: function (flag) {
            if (flag === this._isCheck)
                return;
            this._isCheck = flag;
            this.updateStyle();
        },
        enumerable: false,
        configurable: true
    });
    SetToggle.prototype.updateStyle = function () {
        this.normalNode.active = !this._isCheck;
        this.checkNode.active = !!this._isCheck;
    };
    return SetToggle;
}(BbwzBaseView_1.default));

cc._RF.pop();