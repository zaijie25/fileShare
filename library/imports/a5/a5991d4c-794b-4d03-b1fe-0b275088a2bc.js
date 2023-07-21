"use strict";
cc._RF.push(module, 'a59911MeUtNA7H+CydQiKK8', 'WndSetting');
// hall/scripts/logic/hall/ui/playerInfo/WndSetting.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var HallBtnHelper_1 = require("../hall/views/HallBtnHelper");
/**
 * 选择头像界面
 */
var WndSetting = /** @class */ (function (_super) {
    __extends(WndSetting, _super);
    function WndSetting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 版本号文本
         */
        _this.versionLbl = null;
        /**
         * 音乐设置节点集合
         */
        _this.musicNodeArr = [];
        /**
         * 音效设置节点集合
         */
        _this.soundNodeArr = [];
        return _this;
    }
    WndSetting.prototype.onInit = function () {
        this.name = "WndSetting";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/SettingBox";
        this.model = Global.ModelManager.getModel("PlayerInfoModel");
    };
    WndSetting.prototype.initView = function () {
        var musicNode = this.addCommonClick("musicSwitch", this.onMusicSwitch, this);
        var soundNode = this.addCommonClick("audioSwitch", this.onAudioSwitch, this);
        this.officalUrlText = this.getComponent("officalNode/url", cc.Label);
        this.save_bg = this.getComponent("officalNode/save_bg", cc.Sprite);
        this.addCommonClick("close", this.onCloseUI, this);
        this.addCommonClick("officalNode/btn", this.onBackUpGameBtn, this);
        this.musicNodeArr[0] = cc.find("control_shut", musicNode);
        this.musicNodeArr[1] = cc.find("control_open", musicNode);
        this.soundNodeArr[0] = cc.find("control_shut", soundNode);
        this.soundNodeArr[1] = cc.find("control_open", soundNode);
        this.versionLbl = this.getComponent("versionLabel", cc.Label);
        var verStr = Global.HotUpdateManager.nativeVersions["hall"]; //Global.Setting.SystemInfo.Version
        this.setVersionLblText(verStr);
        this.initOfficalUrl();
    };
    WndSetting.prototype.onBackUpGameBtn = function () {
        HallBtnHelper_1.default.WndBackUpOpen();
    };
    WndSetting.prototype.initOfficalUrl = function () {
        var _this = this;
        var url = Global.Setting.Urls.downLoadUrl;
        var arr = url.split("//");
        var arr1 = arr[arr.length - 1].split("/");
        var name = arr1[0];
        var baseWide = 123;
        this.officalUrlText.string = name;
        setTimeout(function () {
            if (cc.isValid(_this.save_bg.node)) {
                _this.save_bg.node.width = baseWide + _this.officalUrlText.node.width;
            }
        }, 20);
    };
    WndSetting.prototype.onCloseUI = function () {
        this.close();
    };
    WndSetting.prototype.onOpen = function () {
        this.UpdateUI();
        this.setVersionLblText();
    };
    /**
     * 更新界面
     */
    WndSetting.prototype.UpdateUI = function () {
        var musicEnable = Global.Setting.settingData.musicEnable;
        var soundEnable = Global.Setting.settingData.soundEnable;
        this.musicNodeArr[0].active = !musicEnable;
        this.musicNodeArr[1].active = musicEnable;
        this.soundNodeArr[0].active = !soundEnable;
        this.soundNodeArr[1].active = soundEnable;
    };
    /**
     * 设置版本号文本
     * @param str
     */
    WndSetting.prototype.setVersionLblText = function (str) {
        this.versionLbl.string = "版本号:" + Global.Toolkit.genLoadingAppInfo();
    };
    /**
     * 音乐点击
     */
    WndSetting.prototype.onMusicSwitch = function () {
        var musicEnable = Global.Setting.settingData.musicEnable;
        Global.Audio.setMusicEnable(!musicEnable);
        this.UpdateUI();
    };
    /**
     * 音效点击
     */
    WndSetting.prototype.onAudioSwitch = function () {
        var soundEnable = Global.Setting.settingData.soundEnable;
        Global.Audio.setSoundEnable(!soundEnable);
        this.UpdateUI();
    };
    return WndSetting;
}(WndBase_1.default));
exports.default = WndSetting;

cc._RF.pop();