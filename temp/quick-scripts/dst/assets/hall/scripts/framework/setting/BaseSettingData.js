
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/setting/BaseSettingData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxzZXR0aW5nXFxCYXNlU2V0dGluZ0RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxnQkFBZ0I7QUFDaEI7SUFBQTtRQU9JLFVBQVU7UUFDSCxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUMxQixRQUFRO1FBQ0QsZ0JBQVcsR0FBRyxHQUFHLENBQUM7UUFDekIsUUFBUTtRQUNELGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzFCLE1BQU07UUFDQyxnQkFBVyxHQUFHLEdBQUcsQ0FBQztJQTJEN0IsQ0FBQztJQXREVSwrQkFBSyxHQUFaLFVBQWEsT0FBTztRQUVoQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUdTLDhCQUFJLEdBQWQ7UUFFSSxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUM7WUFDbEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFNUUsSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDO1lBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTVFLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQztZQUNsRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFFaEYsSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDO1lBQ2xELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNwRixDQUFDO0lBRU0sd0NBQWMsR0FBckIsVUFBc0IsS0FBYTtRQUUvQixJQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVztZQUN4QixPQUFPO1FBQ1gsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU0sd0NBQWMsR0FBckIsVUFBc0IsS0FBYTtRQUUvQixJQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVztZQUN4QixPQUFPO1FBQ1gsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU0sd0NBQWMsR0FBckIsVUFBc0IsS0FBWTtRQUU5QixJQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVztZQUN4QixPQUFPO1FBQ1gsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRU0sd0NBQWMsR0FBckIsVUFBc0IsS0FBWTtRQUU5QixJQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVztZQUN4QixPQUFPO1FBQ1gsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBckVNLDhCQUFjLEdBQUcsYUFBYSxDQUFDO0lBQy9CLDhCQUFjLEdBQUcsYUFBYSxDQUFDO0lBQy9CLDhCQUFjLEdBQUcsYUFBYSxDQUFDO0lBQy9CLDhCQUFjLEdBQUcsYUFBYSxDQUFDO0lBb0UxQyxzQkFBQztDQXpFRCxBQXlFQyxJQUFBO2tCQXpFb0IsZUFBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdG9yYWdlIGZyb20gXCIuL1N0b3JhZ2VcIjtcclxuXHJcbi8v5ri45oiP6K6+572u77yI6K6+572u6Z2i5p2/5L2/55So5pWw5o2u77yJXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VTZXR0aW5nRGF0YSBcclxue1xyXG4gICAgc3RhdGljIE11c2ljRW5hYmxlS2V5ID0gXCJNdXNpY0VuYWJsZVwiO1xyXG4gICAgc3RhdGljIFNvdW5kRW5hYmxlS2V5ID0gXCJTb3VuZEVuYWJsZVwiO1xyXG4gICAgc3RhdGljIE11c2ljVm9sdW1lS2V5ID0gXCJNdXNpY1ZvbHVtZVwiO1xyXG4gICAgc3RhdGljIFNvdW5kVm9sdW1lS2V5ID0gXCJTb3VuZFZvbHVtZVwiO1xyXG5cclxuICAgIC8v5piv5ZCm5omT5byA6IOM5pmv6Z+z5LmQXHJcbiAgICBwdWJsaWMgbXVzaWNFbmFibGUgPSB0cnVlO1xyXG4gICAgLy/og4zmma/pn7PkuZDpn7Pph49cclxuICAgIHB1YmxpYyBtdXNpY1ZvbHVtZSA9IDEuMDtcclxuICAgIC8v5piv5ZCm5omT5byA6Z+z5pWIXHJcbiAgICBwdWJsaWMgc291bmRFbmFibGUgPSB0cnVlO1xyXG4gICAgLy/pn7PmlYjpn7Pph49cclxuICAgIHB1YmxpYyBzb3VuZFZvbHVtZSA9IDEuMDtcclxuXHJcbiAgICBwcml2YXRlIHN0b3JhZ2U6U3RvcmFnZTtcclxuXHJcblxyXG4gICAgcHVibGljIHNldHVwKHN0b3JhZ2UpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgICAgICB0aGlzLmxvYWQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIGxvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuc3RvcmFnZS5oYXNLZXkoQmFzZVNldHRpbmdEYXRhLk11c2ljRW5hYmxlS2V5KSlcclxuICAgICAgICAgICAgdGhpcy5tdXNpY0VuYWJsZSA9IHRoaXMuc3RvcmFnZS5nZXRCb29sKEJhc2VTZXR0aW5nRGF0YS5NdXNpY0VuYWJsZUtleSk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc3RvcmFnZS5oYXNLZXkoQmFzZVNldHRpbmdEYXRhLlNvdW5kRW5hYmxlS2V5KSlcclxuICAgICAgICAgICAgdGhpcy5zb3VuZEVuYWJsZSA9IHRoaXMuc3RvcmFnZS5nZXRCb29sKEJhc2VTZXR0aW5nRGF0YS5Tb3VuZEVuYWJsZUtleSk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuc3RvcmFnZS5oYXNLZXkoQmFzZVNldHRpbmdEYXRhLk11c2ljVm9sdW1lS2V5KSlcclxuICAgICAgICAgICAgdGhpcy5tdXNpY1ZvbHVtZSA9IHRoaXMuc3RvcmFnZS5nZXROdW1iZXIoQmFzZVNldHRpbmdEYXRhLk11c2ljVm9sdW1lS2V5LCAxKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuc3RvcmFnZS5oYXNLZXkoQmFzZVNldHRpbmdEYXRhLlNvdW5kVm9sdW1lS2V5KSlcclxuICAgICAgICAgICAgdGhpcy5zb3VuZFZvbHVtZSA9IHRoaXMuc3RvcmFnZS5nZXROdW1iZXIoQmFzZVNldHRpbmdEYXRhLlNvdW5kVm9sdW1lS2V5LCAxKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNdXNpY0VuYWJsZSh2YWx1ZTpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHZhbHVlID09IHRoaXMubXVzaWNFbmFibGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLm11c2ljRW5hYmxlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLnNldEJvb2woQmFzZVNldHRpbmdEYXRhLk11c2ljRW5hYmxlS2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNvdW5kRW5hYmxlKHZhbHVlOmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgaWYodmFsdWUgPT0gdGhpcy5zb3VuZEVuYWJsZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc291bmRFbmFibGUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0Qm9vbChCYXNlU2V0dGluZ0RhdGEuU291bmRFbmFibGVLZXksIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TXVzaWNWb2x1bWUodmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHZhbHVlID09IHRoaXMubXVzaWNWb2x1bWUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLm11c2ljVm9sdW1lID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlLnNldChCYXNlU2V0dGluZ0RhdGEuTXVzaWNWb2x1bWVLZXksIHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTb3VuZFZvbHVtZSh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodmFsdWUgPT0gdGhpcy5zb3VuZFZvbHVtZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc291bmRWb2x1bWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0KEJhc2VTZXR0aW5nRGF0YS5Tb3VuZFZvbHVtZUtleSwgdmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcblxyXG59Il19