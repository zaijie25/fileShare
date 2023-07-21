"use strict";
cc._RF.push(module, 'df37aqIvdpF4YcpMskJ2b7J', 'BaseSettingData');
// hall/scripts/framework/setting/BaseSettingData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//游戏设置（设置面板使用数据）
var BaseSettingData = /** @class */ (function () {
    function BaseSettingData() {
        //是否打开背景音乐
        this.musicEnable = true;
        //背景音乐音量
        this.musicVolume = 1.0;
        //是否打开音效
        this.soundEnable = true;
        //音效音量
        this.soundVolume = 1.0;
    }
    BaseSettingData.prototype.setup = function (storage) {
        this.storage = storage;
        this.load();
    };
    BaseSettingData.prototype.load = function () {
        if (this.storage.hasKey(BaseSettingData.MusicEnableKey))
            this.musicEnable = this.storage.getBool(BaseSettingData.MusicEnableKey);
        if (this.storage.hasKey(BaseSettingData.SoundEnableKey))
            this.soundEnable = this.storage.getBool(BaseSettingData.SoundEnableKey);
        if (this.storage.hasKey(BaseSettingData.MusicVolumeKey))
            this.musicVolume = this.storage.getNumber(BaseSettingData.MusicVolumeKey, 1);
        if (this.storage.hasKey(BaseSettingData.SoundVolumeKey))
            this.soundVolume = this.storage.getNumber(BaseSettingData.SoundVolumeKey, 1);
    };
    BaseSettingData.prototype.setMusicEnable = function (value) {
        if (value == this.musicEnable)
            return;
        this.musicEnable = value;
        this.storage.setBool(BaseSettingData.MusicEnableKey, value);
    };
    BaseSettingData.prototype.setSoundEnable = function (value) {
        if (value == this.soundEnable)
            return;
        this.soundEnable = value;
        this.storage.setBool(BaseSettingData.SoundEnableKey, value);
    };
    BaseSettingData.prototype.setMusicVolume = function (value) {
        if (value == this.musicVolume)
            return;
        this.musicVolume = value;
        this.storage.set(BaseSettingData.MusicVolumeKey, value.toString());
    };
    BaseSettingData.prototype.setSoundVolume = function (value) {
        if (value == this.soundVolume)
            return;
        this.soundVolume = value;
        this.storage.set(BaseSettingData.SoundVolumeKey, value.toString());
    };
    BaseSettingData.MusicEnableKey = "MusicEnable";
    BaseSettingData.SoundEnableKey = "SoundEnable";
    BaseSettingData.MusicVolumeKey = "MusicVolume";
    BaseSettingData.SoundVolumeKey = "SoundVolume";
    return BaseSettingData;
}());
exports.default = BaseSettingData;

cc._RF.pop();