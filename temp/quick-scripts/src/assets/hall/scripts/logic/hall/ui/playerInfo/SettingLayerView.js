"use strict";
cc._RF.push(module, '2502a4qM+lAG4CucOUqhA40', 'SettingLayerView');
// hall/scripts/logic/hall/ui/playerInfo/SettingLayerView.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
var HallBtnHelper_1 = require("../hall/views/HallBtnHelper");
/**
 * 选择头像界面
 */
var SettingLayerView = /** @class */ (function (_super) {
    __extends(SettingLayerView, _super);
    function SettingLayerView() {
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
    SettingLayerView.prototype.initView = function () {
        var musicNode = this.addCommonClick("musicSwitch", this.onMusicSwitch, this);
        var soundNode = this.addCommonClick("audioSwitch", this.onAudioSwitch, this);
        this.officalUrlText = this.getComponent("officalNode/url", cc.Label);
        this.addCommonClick("officalNode/btn", this.onBackUpGameBtn, this);
        this.musicNodeArr[0] = cc.find("control_shut", musicNode);
        this.musicNodeArr[1] = cc.find("control_open", musicNode);
        this.soundNodeArr[0] = cc.find("control_shut", soundNode);
        this.soundNodeArr[1] = cc.find("control_open", soundNode);
        this.versionLbl = this.getComponent("versionLbl", cc.Label);
        var verStr = Global.HotUpdateManager.nativeVersions["hall"]; //Global.Setting.SystemInfo.Version
        this.setVersionLblText(verStr);
        this.initOfficalUrl();
    };
    SettingLayerView.prototype.onSubViewShow = function () {
        this.UpdateUI();
        this.setVersionLblText();
    };
    /**
     * 更新界面
     */
    SettingLayerView.prototype.UpdateUI = function () {
        var musicEnable = Global.Setting.settingData.musicEnable;
        var soundEnable = Global.Setting.settingData.soundEnable;
        this.musicNodeArr[0].active = !musicEnable;
        this.musicNodeArr[1].active = musicEnable;
        this.soundNodeArr[0].active = !soundEnable;
        this.soundNodeArr[1].active = soundEnable;
    };
    SettingLayerView.prototype.onBackUpGameBtn = function () {
        HallBtnHelper_1.default.WndBackUpOpen();
    };
    /**
     * 设置版本号文本
     * @param str
     */
    SettingLayerView.prototype.setVersionLblText = function (str) {
        this.versionLbl.string = "版本号:" + Global.Toolkit.genAppInfo() + "•" + Global.PlayerData.merge_type;
    };
    SettingLayerView.prototype.initOfficalUrl = function () {
        var url = Global.Setting.Urls.downLoadUrl;
        var arr = url.split("//");
        var arr1 = arr[arr.length - 1].split("/");
        var name = arr1[0];
        var baseWide = 123;
        this.officalUrlText.string = name;
        // setTimeout(() => {
        //     if (cc.isValid(this.save_bg.node)) {
        //         this.save_bg.node.width = baseWide +this.officalUrlText.node.width
        //     }
        // }, 20);
    };
    /**
     * 音乐点击
     */
    SettingLayerView.prototype.onMusicSwitch = function () {
        var musicEnable = Global.Setting.settingData.musicEnable;
        Global.Audio.setMusicEnable(!musicEnable);
        this.UpdateUI();
    };
    /**
     * 音效点击
     */
    SettingLayerView.prototype.onAudioSwitch = function () {
        var soundEnable = Global.Setting.settingData.soundEnable;
        Global.Audio.setSoundEnable(!soundEnable);
        this.UpdateUI();
    };
    return SettingLayerView;
}(ViewBase_1.default));
exports.default = SettingLayerView;

cc._RF.pop();