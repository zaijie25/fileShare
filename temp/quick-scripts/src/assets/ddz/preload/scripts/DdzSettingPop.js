"use strict";
cc._RF.push(module, '31ec8mlt4VAi6cRA44JtgTF', 'DdzSettingPop');
// ddz/preload/scripts/DdzSettingPop.ts

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
var DdzSettingPop = /** @class */ (function (_super) {
    __extends(DdzSettingPop, _super);
    function DdzSettingPop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.version = '1.0.1';
        return _this;
    }
    DdzSettingPop.prototype.onLoad = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        Global.UIHelper.addCommonClick(this.node, "centerNode/close", this.closeWnd, this, cc.Button.Transition.SCALE, null, false);
        Global.UIHelper.addCommonClick(this.node, "mask", this.closeWnd, this, cc.Button.Transition.NONE, cc.Button.Transition.SCALE, false);
        this.initVersion();
        this.initToggle();
        this.animComp = Global.UIHelper.addAnimComp(this.node, cc.find("centerNode", this.node), cc.find("mask", this.node));
    };
    DdzSettingPop.prototype.onEnable = function () {
        this.animComp.doPopupOpenAnim();
    };
    DdzSettingPop.prototype.initVersion = function () {
        this.versionLbl = cc.find("centerNode/versionLbl", this.node).getComponent(cc.Label);
        var gid = Game.GamePreloadTool.curGameId;
        var gameInfo = Global.GameData.getGameInfo(gid);
        if (gameInfo) {
            this.setVersion(gameInfo.native_version);
        }
        else {
            this.setVersion(this.version);
        }
    };
    DdzSettingPop.prototype.initToggle = function () {
        var musicEnable = Global.Setting.settingData.musicEnable;
        var soundEnable = Global.Setting.settingData.soundEnable;
        var musicToggle = Global.UIHelper.safeGetComponent(this.node, "centerNode/musicToggle", SetToggle);
        musicToggle.setCallback(this.onMusicToggle, this);
        var audioToggle = Global.UIHelper.safeGetComponent(this.node, "centerNode/soundToggle", SetToggle);
        audioToggle.setCallback(this.onAudioToggle, this);
        musicToggle.isChecked = musicEnable;
        audioToggle.isChecked = soundEnable;
    };
    DdzSettingPop.prototype.setVersion = function (str) {
        this.versionLbl.string = "版本号：V" + str;
    };
    DdzSettingPop.prototype.onMusicToggle = function (toggle) {
        Global.Audio.playBtnSound();
        var state = toggle.isChecked;
        Global.Audio.setMusicEnable(state);
    };
    DdzSettingPop.prototype.onAudioToggle = function (toggle) {
        var state = toggle.isChecked;
        Global.Audio.setSoundEnable(state);
        Global.Audio.playBtnSound();
    };
    DdzSettingPop.prototype.closeWnd = function () {
        var _this = this;
        Global.Audio.playBtnSound();
        this.animComp.doPopupCloseAnim(function () {
            _this.node.active = false;
        });
    };
    __decorate([
        property
    ], DdzSettingPop.prototype, "version", void 0);
    DdzSettingPop = __decorate([
        ccclass
    ], DdzSettingPop);
    return DdzSettingPop;
}(cc.Component));
exports.default = DdzSettingPop;
var SetToggle = /** @class */ (function (_super) {
    __extends(SetToggle, _super);
    function SetToggle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetToggle.prototype.setCallback = function (callback, target) {
        this.callback = callback;
        this.target = target;
    };
    SetToggle.prototype.onLoad = function () {
        this.normalNode = cc.find("close", this.node);
        this.checkNode = cc.find("open", this.node);
        Global.UIHelper.addCommonClick(this.node, "", this.onToggleClick, this, cc.Button.Transition.SCALE, null, false);
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
}(cc.Component));

cc._RF.pop();