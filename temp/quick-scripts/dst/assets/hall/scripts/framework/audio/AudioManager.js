
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/audio/AudioManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bc66fjdQ3RCLJFJbnYoC7zd', 'AudioManager');
// hall/scripts/framework/audio/AudioManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AudioManager = /** @class */ (function () {
    function AudioManager() {
        //正在播放的bgm  
        this.curRunningBgm = "";
        //打开音效开关后应该播放的
        this.targetBgm = "";
        this.commonBtnSoundUrl = "hall/sound/btnClick";
        this.commonCloseSoundUrl = "";
        this.pauseTime = 0;
        this.inBackground = false;
        //最多有5个音源
        this.MaxAudioSourceCount = 5;
        //音源列表
        this.audioSourceList = [];
        // key -> 音源
        this.resToAudioMap = {};
    }
    AudioManager.prototype.setup = function (settingData, resourceMgr) {
        this.settingData = settingData;
        this.resourceMgr = resourceMgr;
        //设置单个音源的最大实例个数
        cc.audioEngine.setMaxAudioInstance(30);
        this.setMusicVolume(this.settingData.musicVolume);
        this.setSoundVolume(this.settingData.soundVolume);
        cc.game.on(cc.game.EVENT_HIDE, this.onPause, this);
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
    };
    AudioManager.prototype.onPause = function () {
        this.pauseTime = Date.now();
        this.inBackground = true;
    };
    //防止音效在切回来后再播
    AudioManager.prototype.onResume = function () {
        this.pauseTime = 0;
        this.inBackground = false;
        if (this.pauseTime != 0 && Date.now() - this.pauseTime > 2000) {
            this.stopAllEffect();
        }
    };
    AudioManager.prototype.playGameBundleMusic = function (url, isAutoRelease) {
        if (isAutoRelease === void 0) { isAutoRelease = false; }
        var bundleName = Global.ResourceManager.gameBundle;
        if (bundleName) {
            this.playBundleMusic(bundleName, url);
        }
        else {
            Logger.error("playGameBundleMusic bundleName null");
        }
    };
    AudioManager.prototype.playBundleMusic = function (bundleName, url, isAutoRelease) {
        var _this = this;
        if (isAutoRelease === void 0) { isAutoRelease = false; }
        this.targetBgm = url;
        if (url == this.curRunningBgm || url == "")
            return;
        if (!this.settingData.musicEnable)
            return;
        this.curRunningBgm = url;
        //2019-6-22 xiaoC 先获取资源，取不到再加载，否则预加载音乐资源后这里又重复加载（做法与playSound一致）
        var audio = this.resourceMgr.getBundleRes(bundleName, url, cc.AudioClip);
        if (audio) {
            cc.audioEngine.playMusic(audio, true);
        }
        else {
            var func = function (error, audio) {
                if (error != null) {
                    Logger.error("音效加载失败", error.message, url);
                    return;
                }
                if (url != _this.curRunningBgm) {
                    Logger.error("声音未加载完就切换音乐", url, _this.curRunningBgm);
                    return;
                }
                cc.audioEngine.playMusic(audio, true);
            };
            if (cc.sys.isNative && jsb && jsb.fileUtils.isFileExist(url)) {
                this.resourceMgr.load(url, func);
            }
            else
                this.resourceMgr.loadBundleRes(bundleName, url, func);
        }
    };
    //url:  Resouces下的完整路径
    AudioManager.prototype.playMusic = function (url, isAutoRelease) {
        var _this = this;
        if (isAutoRelease === void 0) { isAutoRelease = false; }
        this.targetBgm = url;
        if (url == this.curRunningBgm || url == "")
            return;
        if (!this.settingData.musicEnable)
            return;
        this.curRunningBgm = url;
        //2019-6-22 xiaoC 先获取资源，取不到再加载，否则预加载音乐资源后这里又重复加载（做法与playSound一致）
        var audio = this.resourceMgr.getRes(url, cc.AudioClip);
        if (audio) {
            cc.audioEngine.playMusic(audio, true);
        }
        else {
            var func = function (error, audio) {
                if (error != null) {
                    Logger.error("音效加载失败", error.message, url);
                    return;
                }
                if (url != _this.curRunningBgm) {
                    Logger.error("声音未加载完就切换音乐", url, _this.curRunningBgm);
                    return;
                }
                isAutoRelease && Global.ResourceManager.setAutoReleaseRecursively(audio, true);
                cc.audioEngine.playMusic(audio, true);
            };
            if (cc.sys.isNative && jsb && jsb.fileUtils.isFileExist(url)) {
                this.resourceMgr.load(url, func);
            }
            else
                this.resourceMgr.loadRes(url, func, cc.AudioClip);
        }
    };
    AudioManager.prototype.stopMusic = function () {
        cc.audioEngine.stopMusic();
        this.targetBgm = this.curRunningBgm;
        this.curRunningBgm = "";
    };
    //播放音效 isAutoRelease设置切换场景自动释放资源
    AudioManager.prototype.playSound = function (url, isAutoRelease) {
        if (isAutoRelease === void 0) { isAutoRelease = false; }
        if (!this.settingData.soundEnable)
            return;
        if (this.inBackground) {
            Logger.error("play sound in background!!!", url);
            return;
        }
        var audio = this.resourceMgr.getRes(url, cc.AudioClip);
        if (audio) {
            var audioId = cc.audioEngine.playEffect(audio, false);
            return audioId;
        }
        else {
            this.resourceMgr.loadRes(url, function (error, audio) {
                if (error != null) {
                    Logger.error("音效加载失败", error.message, url);
                    return;
                }
                var audioId = cc.audioEngine.playEffect(audio, false);
                isAutoRelease && Global.ResourceManager.setAutoReleaseRecursively(audio, true);
            }, cc.AudioClip);
        }
    };
    AudioManager.prototype.playGameBundleSound = function (url, isAutoRelease) {
        if (isAutoRelease === void 0) { isAutoRelease = false; }
        var bundleName = Global.ResourceManager.gameBundle;
        if (bundleName) {
            return this.playBundleSound(bundleName, url);
        }
        else {
            Logger.error("playGameBundleSound bundleName null");
        }
    };
    AudioManager.prototype.playBundleSound = function (bundleName, url, isAutoRelease) {
        if (isAutoRelease === void 0) { isAutoRelease = false; }
        if (!this.settingData.soundEnable)
            return;
        if (this.inBackground) {
            Logger.error("play sound in background!!!", url);
            return;
        }
        var audio = this.resourceMgr.getBundleRes(bundleName, url, cc.AudioClip);
        if (audio) {
            var audioId = cc.audioEngine.playEffect(audio, false);
            return audioId;
        }
        else {
            this.resourceMgr.loadBundleRes(bundleName, url, function (error, audio) {
                if (error != null) {
                    Logger.error("音效加载失败", error.message, url);
                    return;
                }
                var audioId = cc.audioEngine.playEffect(audio, false);
                isAutoRelease && Global.ResourceManager.setAutoReleaseRecursively(audio, true);
            });
        }
    };
    //停止所有音效
    AudioManager.prototype.stopAllEffect = function () {
        cc.audioEngine.stopAllEffects();
    };
    //@todo  通用声音比较多时，考虑注册的形式
    //通用按钮声音  
    AudioManager.prototype.playBtnSound = function () {
        if (this.commonBtnSoundUrl != "")
            this.playSound(this.commonBtnSoundUrl);
    };
    AudioManager.prototype.playCloseSound = function () {
        if (this.commonCloseSoundUrl != "")
            this.playSound(this.commonCloseSoundUrl);
    };
    AudioManager.prototype.setMusicEnable = function (value) {
        this.settingData.setMusicEnable(value);
        if (!value)
            this.stopMusic();
        else {
            var bundleName = Global.ResourceManager.gameBundle;
            if (bundleName) {
                this.playBundleMusic(bundleName, this.targetBgm);
            }
            else {
                this.playMusic(this.targetBgm);
            }
        }
    };
    AudioManager.prototype.playHallBGM = function () {
        this.playMusic(Global.Setting.hallBGM);
    };
    AudioManager.prototype.setSoundEnable = function (value) {
        this.settingData.setSoundEnable(value);
        if (!value)
            this.stopAllEffect();
    };
    AudioManager.prototype.setMusicVolume = function (value) {
        this.settingData.musicVolume = value;
        cc.audioEngine.setMusicVolume(value);
    };
    AudioManager.prototype.setSoundVolume = function (value) {
        this.settingData.soundVolume = value;
        cc.audioEngine.setEffectsVolume(value);
    };
    //获得空闲的source
    AudioManager.prototype.getIdleAudioSource = function () {
        var audio = null;
        for (var i = 0; i < this.audioSourceList.length; i++) {
            if (this.audioSourceList[i] && !this.audioSourceList[i].isPlaying) {
                audio = this.audioSourceList[i];
                break;
            }
        }
        if (audio) {
            for (var key in this.resToAudioMap) {
                if (this.resToAudioMap[key] == audio) {
                    this.resToAudioMap[key] = null;
                    break;
                }
            }
        }
        // //清理被占用的key
        // if(audio != null)
        // {
        //     this.resToAudioMap[audio] = null;
        // }
        return audio;
    };
    //创建一个新的audioSource
    AudioManager.prototype.getNewAudioSource = function () {
        if (this.audioSourceList.length >= this.MaxAudioSourceCount)
            return null;
        var audioSource = Global.Persist.getPersistNode().addComponent(cc.AudioSource);
        this.audioSourceList.push(audioSource);
        return audioSource;
    };
    AudioManager.prototype.getAudioSource = function (key) {
        //如果key正在被使用 则返回对应的audioSource
        var audioSource = this.resToAudioMap[key];
        if (audioSource == null)
            audioSource = this.getIdleAudioSource();
        if (audioSource == null)
            audioSource = this.getNewAudioSource();
        return audioSource;
    };
    /**
     * 使用AudioSource播放音效，一个音效同时最多只能播放一个，同时最多播放5个音源
     * @param url
     * @param override 是否覆盖播放
     * @param isAutoRelease 资源是否释放
     */
    AudioManager.prototype.playAudioSource = function (url, override, isAutoRelease) {
        if (override === void 0) { override = false; }
        if (isAutoRelease === void 0) { isAutoRelease = false; }
        if (!this.settingData.soundEnable)
            return;
        if (this.inBackground) {
            Logger.error("play sound in background!!!", url);
            return;
        }
        var audioSource = this.getAudioSource(url);
        //没有空闲音源
        if (audioSource == null)
            return;
        //正在播放
        if (audioSource.isPlaying && !override)
            return;
        this.resToAudioMap[url] = audioSource;
        var audio = this.resourceMgr.getRes(url, cc.AudioClip);
        if (audio) {
            audioSource.clip = audio;
            audioSource.play();
        }
        else {
            this.resourceMgr.loadRes(url, function (error, audio) {
                if (error != null) {
                    Logger.error("音效加载失败", error.message, url);
                    return;
                }
                isAutoRelease && Global.ResourceManager.setAutoReleaseRecursively(audio, true);
                if (audioSource.isPlaying)
                    return;
                audioSource.clip = audio;
                audioSource.play();
            }, cc.AudioClip);
        }
    };
    return AudioManager;
}());
exports.default = AudioManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxhdWRpb1xcQXVkaW9NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7SUFBQTtRQUtJLFlBQVk7UUFDSixrQkFBYSxHQUFVLEVBQUUsQ0FBQTtRQUNqQyxjQUFjO1FBQ04sY0FBUyxHQUFVLEVBQUUsQ0FBQTtRQUV0QixzQkFBaUIsR0FBRyxxQkFBcUIsQ0FBQztRQUMxQyx3QkFBbUIsR0FBRyxFQUFFLENBQUM7UUFFeEIsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBOFA3QixTQUFTO1FBQ0Qsd0JBQW1CLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLE1BQU07UUFDRSxvQkFBZSxHQUFHLEVBQUUsQ0FBQTtRQUM1QixZQUFZO1FBQ0osa0JBQWEsR0FBRyxFQUFFLENBQUE7SUE2RzlCLENBQUM7SUE5V1UsNEJBQUssR0FBWixVQUFhLFdBQTJCLEVBQUUsV0FBMkI7UUFFakUsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsZUFBZTtRQUNmLEVBQUUsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ2pELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUVqRCxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ2xELEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxF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SUFBSSxFQUNoQjtvQkFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUMzQyxPQUFPO2lCQUNWO2dCQUNELGFBQWEsSUFBSSxNQUFNLENBQUMsZUFBZSxDQUFDLHlCQUF5QixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDL0UsSUFBRyxXQUFXLENBQUMsU0FBUztvQkFDcEIsT0FBTztnQkFDWCxXQUFXLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFDekIsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLENBQUMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDcEI7SUFDTCxDQUFDO0lBS0wsbUJBQUM7QUFBRCxDQTlYQSxBQThYQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VTZXR0aW5nRGF0YSBmcm9tIFwiLi4vc2V0dGluZy9CYXNlU2V0dGluZ0RhdGFcIjtcclxuaW1wb3J0IFJlc291cmNlTWFuYWdlciBmcm9tIFwiLi4vcmVzb3VyY2UvUmVzb3VyY2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBBcHBIZWxwZXIgZnJvbSBcIi4uLy4uL2xvZ2ljL2NvcmUvdG9vbC9BcHBIZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvTWFuYWdlciBcclxue1xyXG4gICAgcHJpdmF0ZSBzZXR0aW5nRGF0YTpCYXNlU2V0dGluZ0RhdGE7XHJcbiAgICBwcml2YXRlIHJlc291cmNlTWdyOlJlc291cmNlTWFuYWdlcjtcclxuXHJcbiAgICAvL+ato+WcqOaSreaUvueahGJnbSAgXHJcbiAgICBwcml2YXRlIGN1clJ1bm5pbmdCZ206c3RyaW5nID0gXCJcIlxyXG4gICAgLy/miZPlvIDpn7PmlYjlvIDlhbPlkI7lupTor6Xmkq3mlL7nmoRcclxuICAgIHByaXZhdGUgdGFyZ2V0QmdtOnN0cmluZyA9IFwiXCJcclxuXHJcbiAgICBwdWJsaWMgY29tbW9uQnRuU291bmRVcmwgPSBcImhhbGwvc291bmQvYnRuQ2xpY2tcIjtcclxuICAgIHB1YmxpYyBjb21tb25DbG9zZVNvdW5kVXJsID0gXCJcIjtcclxuXHJcbiAgICBwcml2YXRlIHBhdXNlVGltZSA9IDA7XHJcbiAgICBwcml2YXRlIGluQmFja2dyb3VuZCA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzZXR1cChzZXR0aW5nRGF0YTpCYXNlU2V0dGluZ0RhdGEsIHJlc291cmNlTWdyOlJlc291cmNlTWFuYWdlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNldHRpbmdEYXRhID0gc2V0dGluZ0RhdGE7XHJcbiAgICAgICAgdGhpcy5yZXNvdXJjZU1nciA9IHJlc291cmNlTWdyO1xyXG4gICAgICAgIC8v6K6+572u5Y2V5Liq6Z+z5rqQ55qE5pyA5aSn5a6e5L6L5Liq5pWwXHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0TWF4QXVkaW9JbnN0YW5jZSgzMCk7XHJcbiAgICAgICAgdGhpcy5zZXRNdXNpY1ZvbHVtZSh0aGlzLnNldHRpbmdEYXRhLm11c2ljVm9sdW1lKVxyXG4gICAgICAgIHRoaXMuc2V0U291bmRWb2x1bWUodGhpcy5zZXR0aW5nRGF0YS5zb3VuZFZvbHVtZSlcclxuXHJcbiAgICAgICAgY2MuZ2FtZS5vbihjYy5nYW1lLkVWRU5UX0hJREUsIHRoaXMub25QYXVzZSwgdGhpcylcclxuICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfU0hPVywgdGhpcy5vblJlc3VtZSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgb25QYXVzZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wYXVzZVRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMuaW5CYWNrZ3JvdW5kID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+mYsuatoumfs+aViOWcqOWIh+WbnuadpeWQjuWGjeaSrVxyXG4gICAgcHJpdmF0ZSBvblJlc3VtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wYXVzZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuaW5CYWNrZ3JvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgaWYodGhpcy5wYXVzZVRpbWUgIT0gMCAmJiBEYXRlLm5vdygpIC0gdGhpcy5wYXVzZVRpbWUgPiAyMDAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wQWxsRWZmZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgcGxheUdhbWVCdW5kbGVNdXNpYyh1cmw6c3RyaW5nLGlzQXV0b1JlbGVhc2UgPSBmYWxzZSl7XHJcbiAgICAgICAgbGV0IGJ1bmRsZU5hbWUgPSBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdhbWVCdW5kbGVcclxuICAgICAgICBpZiAoYnVuZGxlTmFtZSl7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ1bmRsZU11c2ljKGJ1bmRsZU5hbWUsdXJsKVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwicGxheUdhbWVCdW5kbGVNdXNpYyBidW5kbGVOYW1lIG51bGxcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlCdW5kbGVNdXNpYyhidW5kbGVOYW1lOmFueSx1cmw6c3RyaW5nLGlzQXV0b1JlbGVhc2UgPSBmYWxzZSl7XHJcbiAgICAgICAgdGhpcy50YXJnZXRCZ20gPSB1cmw7XHJcbiAgICAgICAgaWYodXJsID09IHRoaXMuY3VyUnVubmluZ0JnbSB8fCB1cmwgPT0gXCJcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKCF0aGlzLnNldHRpbmdEYXRhLm11c2ljRW5hYmxlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJSdW5uaW5nQmdtID0gdXJsO1xyXG4gICAgICAgIC8vMjAxOS02LTIyIHhpYW9DIOWFiOiOt+WPlui1hOa6kO+8jOWPluS4jeWIsOWGjeWKoOi9ve+8jOWQpuWImemihOWKoOi9vemfs+S5kOi1hOa6kOWQjui/memHjOWPiOmHjeWkjeWKoOi9ve+8iOWBmuazleS4jnBsYXlTb3VuZOS4gOiHtO+8iVxyXG4gICAgICAgIGxldCBhdWRpbyA9IHRoaXMucmVzb3VyY2VNZ3IuZ2V0QnVuZGxlUmVzKGJ1bmRsZU5hbWUsdXJsLCBjYy5BdWRpb0NsaXApO1xyXG4gICAgICAgIGlmIChhdWRpbyl7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyhhdWRpbywgdHJ1ZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBmdW5jID0gKGVycm9yLCBhdWRpbyk9PntcclxuICAgICAgICAgICAgICAgIGlmKGVycm9yICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi6Z+z5pWI5Yqg6L295aSx6LSlXCIsIGVycm9yLm1lc3NhZ2UsIHVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYodXJsICE9IHRoaXMuY3VyUnVubmluZ0JnbSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLlo7Dpn7PmnKrliqDovb3lrozlsLHliIfmjaLpn7PkuZBcIiwgdXJsLCB0aGlzLmN1clJ1bm5pbmdCZ20pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyhhdWRpbywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY2Muc3lzLmlzTmF0aXZlICYmIGpzYiAmJiBqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KHVybCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzb3VyY2VNZ3IubG9hZCh1cmwsIGZ1bmMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNvdXJjZU1nci5sb2FkQnVuZGxlUmVzKGJ1bmRsZU5hbWUsdXJsLCBmdW5jKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy91cmw6ICBSZXNvdWNlc+S4i+eahOWujOaVtOi3r+W+hFxyXG4gICAgcHVibGljIHBsYXlNdXNpYyh1cmw6c3RyaW5nLCBpc0F1dG9SZWxlYXNlID0gZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50YXJnZXRCZ20gPSB1cmw7XHJcbiAgICAgICAgaWYodXJsID09IHRoaXMuY3VyUnVubmluZ0JnbSB8fCB1cmwgPT0gXCJcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKCF0aGlzLnNldHRpbmdEYXRhLm11c2ljRW5hYmxlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJSdW5uaW5nQmdtID0gdXJsO1xyXG4gICAgICAgIC8vMjAxOS02LTIyIHhpYW9DIOWFiOiOt+WPlui1hOa6kO+8jOWPluS4jeWIsOWGjeWKoOi9ve+8jOWQpuWImemihOWKoOi9vemfs+S5kOi1hOa6kOWQjui/memHjOWPiOmHjeWkjeWKoOi9ve+8iOWBmuazleS4jnBsYXlTb3VuZOS4gOiHtO+8iVxyXG4gICAgICAgIGxldCBhdWRpbyA9IHRoaXMucmVzb3VyY2VNZ3IuZ2V0UmVzKHVybCwgY2MuQXVkaW9DbGlwKTtcclxuICAgICAgICBpZiAoYXVkaW8pe1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWMoYXVkaW8sIHRydWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgZnVuYyA9IChlcnJvciwgYXVkaW8pPT57XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIumfs+aViOWKoOi9veWksei0pVwiLCBlcnJvci5tZXNzYWdlLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKHVybCAhPSB0aGlzLmN1clJ1bm5pbmdCZ20pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5aOw6Z+z5pyq5Yqg6L295a6M5bCx5YiH5o2i6Z+z5LmQXCIsIHVybCwgdGhpcy5jdXJSdW5uaW5nQmdtKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpc0F1dG9SZWxlYXNlICYmIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuc2V0QXV0b1JlbGVhc2VSZWN1cnNpdmVseShhdWRpbywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5TXVzaWMoYXVkaW8sIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNjLnN5cy5pc05hdGl2ZSAmJiBqc2IgJiYganNiLmZpbGVVdGlscy5pc0ZpbGVFeGlzdCh1cmwpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc291cmNlTWdyLmxvYWQodXJsLCBmdW5jKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzb3VyY2VNZ3IubG9hZFJlcyh1cmwsIGZ1bmMsIGNjLkF1ZGlvQ2xpcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdG9wTXVzaWMoKVxyXG4gICAge1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BNdXNpYygpO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0QmdtID0gdGhpcy5jdXJSdW5uaW5nQmdtO1xyXG4gICAgICAgIHRoaXMuY3VyUnVubmluZ0JnbSA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mkq3mlL7pn7PmlYggaXNBdXRvUmVsZWFzZeiuvue9ruWIh+aNouWcuuaZr+iHquWKqOmHiuaUvui1hOa6kFxyXG4gICAgcHVibGljIHBsYXlTb3VuZCh1cmw6c3RyaW5nLCBpc0F1dG9SZWxlYXNlID0gZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuc2V0dGluZ0RhdGEuc291bmRFbmFibGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZih0aGlzLmluQmFja2dyb3VuZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInBsYXkgc291bmQgaW4gYmFja2dyb3VuZCEhIVwiLCB1cmwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBhdWRpbyA9IHRoaXMucmVzb3VyY2VNZ3IuZ2V0UmVzKHVybCwgY2MuQXVkaW9DbGlwKTtcclxuICAgICAgICBpZiAoYXVkaW8pe1xyXG4gICAgICAgICAgIGxldCBhdWRpb0lkID0gIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoYXVkaW8sIGZhbHNlKTtcclxuICAgICAgICAgICByZXR1cm4gYXVkaW9JZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZU1nci5sb2FkUmVzKHVybCwgKGVycm9yLCBhdWRpbyk9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIumfs+aViOWKoOi9veWksei0pVwiLCBlcnJvci5tZXNzYWdlLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBhdWRpb0lkID0gIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoYXVkaW8sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlzQXV0b1JlbGVhc2UgJiYgR2xvYmFsLlJlc291cmNlTWFuYWdlci5zZXRBdXRvUmVsZWFzZVJlY3Vyc2l2ZWx5KGF1ZGlvLCB0cnVlKTtcclxuICAgICAgICAgICAgfSwgY2MuQXVkaW9DbGlwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlHYW1lQnVuZGxlU291bmQodXJsOnN0cmluZyxpc0F1dG9SZWxlYXNlID0gZmFsc2Upe1xyXG4gICAgICAgIGxldCBidW5kbGVOYW1lID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nYW1lQnVuZGxlXHJcbiAgICAgICAgaWYgKGJ1bmRsZU5hbWUpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5QnVuZGxlU291bmQoYnVuZGxlTmFtZSx1cmwpXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJwbGF5R2FtZUJ1bmRsZVNvdW5kIGJ1bmRsZU5hbWUgbnVsbFwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheUJ1bmRsZVNvdW5kKGJ1bmRsZU5hbWUsIHVybDpzdHJpbmcsIGlzQXV0b1JlbGVhc2UgPSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5zZXR0aW5nRGF0YS5zb3VuZEVuYWJsZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKHRoaXMuaW5CYWNrZ3JvdW5kKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwicGxheSBzb3VuZCBpbiBiYWNrZ3JvdW5kISEhXCIsIHVybCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGF1ZGlvID0gdGhpcy5yZXNvdXJjZU1nci5nZXRCdW5kbGVSZXMoYnVuZGxlTmFtZSx1cmwsIGNjLkF1ZGlvQ2xpcCk7XHJcbiAgICAgICAgaWYgKGF1ZGlvKXtcclxuICAgICAgICAgICBsZXQgYXVkaW9JZCA9ICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KGF1ZGlvLCBmYWxzZSk7XHJcbiAgICAgICAgICAgcmV0dXJuIGF1ZGlvSWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VNZ3IubG9hZEJ1bmRsZVJlcyhidW5kbGVOYW1lLHVybCwgKGVycm9yLCBhdWRpbyk9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIumfs+aViOWKoOi9veWksei0pVwiLCBlcnJvci5tZXNzYWdlLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBhdWRpb0lkID0gIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoYXVkaW8sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlzQXV0b1JlbGVhc2UgJiYgR2xvYmFsLlJlc291cmNlTWFuYWdlci5zZXRBdXRvUmVsZWFzZVJlY3Vyc2l2ZWx5KGF1ZGlvLCB0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5YGc5q2i5omA5pyJ6Z+z5pWIXHJcbiAgICBwdWJsaWMgc3RvcEFsbEVmZmVjdCgpXHJcbiAgICB7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEFsbEVmZmVjdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL0B0b2RvICDpgJrnlKjlo7Dpn7Pmr5TovoPlpJrml7bvvIzogIPomZHms6jlhoznmoTlvaLlvI9cclxuICAgIC8v6YCa55So5oyJ6ZKu5aOw6Z+zICBcclxuICAgIHB1YmxpYyBwbGF5QnRuU291bmQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuY29tbW9uQnRuU291bmRVcmwgIT0gXCJcIilcclxuICAgICAgICAgICAgdGhpcy5wbGF5U291bmQodGhpcy5jb21tb25CdG5Tb3VuZFVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlDbG9zZVNvdW5kKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmNvbW1vbkNsb3NlU291bmRVcmwgIT0gXCJcIilcclxuICAgICAgICAgICAgdGhpcy5wbGF5U291bmQodGhpcy5jb21tb25DbG9zZVNvdW5kVXJsKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHNldE11c2ljRW5hYmxlKHZhbHVlKVxyXG4gICAgeyAgIFxyXG4gICAgICAgIHRoaXMuc2V0dGluZ0RhdGEuc2V0TXVzaWNFbmFibGUodmFsdWUpO1xyXG5cclxuICAgICAgICBpZighdmFsdWUpXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcE11c2ljKClcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBidW5kbGVOYW1lID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nYW1lQnVuZGxlXHJcbiAgICAgICAgICAgICAgICBpZiAoYnVuZGxlTmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5QnVuZGxlTXVzaWMoYnVuZGxlTmFtZSx0aGlzLnRhcmdldEJnbSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5TXVzaWModGhpcy50YXJnZXRCZ20pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgcGxheUhhbGxCR00oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucGxheU11c2ljKEdsb2JhbC5TZXR0aW5nLmhhbGxCR00pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTb3VuZEVuYWJsZSh2YWx1ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNldHRpbmdEYXRhLnNldFNvdW5kRW5hYmxlKHZhbHVlKTtcclxuICAgICAgICBpZighdmFsdWUpXHJcbiAgICAgICAgICAgIHRoaXMuc3RvcEFsbEVmZmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRNdXNpY1ZvbHVtZSh2YWx1ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNldHRpbmdEYXRhLm11c2ljVm9sdW1lID0gdmFsdWU7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0TXVzaWNWb2x1bWUodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTb3VuZFZvbHVtZSh2YWx1ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNldHRpbmdEYXRhLnNvdW5kVm9sdW1lID0gdmFsdWU7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0RWZmZWN0c1ZvbHVtZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5pyA5aSa5pyJNeS4qumfs+a6kFxyXG4gICAgcHJpdmF0ZSBNYXhBdWRpb1NvdXJjZUNvdW50ID0gNTtcclxuICAgIC8v6Z+z5rqQ5YiX6KGoXHJcbiAgICBwcml2YXRlIGF1ZGlvU291cmNlTGlzdCA9IFtdXHJcbiAgICAvLyBrZXkgLT4g6Z+z5rqQXHJcbiAgICBwcml2YXRlIHJlc1RvQXVkaW9NYXAgPSB7fVxyXG5cclxuXHJcbiAgICAvL+iOt+W+l+epuumXsueahHNvdXJjZVxyXG4gICAgcHJpdmF0ZSBnZXRJZGxlQXVkaW9Tb3VyY2UoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBhdWRpbyA9IG51bGw7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYXVkaW9Tb3VyY2VMaXN0Lmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5hdWRpb1NvdXJjZUxpc3RbaV0gJiYgIXRoaXMuYXVkaW9Tb3VyY2VMaXN0W2ldLmlzUGxheWluZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYXVkaW8gPSB0aGlzLmF1ZGlvU291cmNlTGlzdFtpXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGF1ZGlvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5yZXNUb0F1ZGlvTWFwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnJlc1RvQXVkaW9NYXBba2V5XSA9PSBhdWRpbylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc1RvQXVkaW9NYXBba2V5XSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIC8v5riF55CG6KKr5Y2g55So55qEa2V5XHJcbiAgICAgICAgLy8gaWYoYXVkaW8gIT0gbnVsbClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucmVzVG9BdWRpb01hcFthdWRpb10gPSBudWxsO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICByZXR1cm4gYXVkaW87XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJvlu7rkuIDkuKrmlrDnmoRhdWRpb1NvdXJjZVxyXG4gICAgcHJpdmF0ZSBnZXROZXdBdWRpb1NvdXJjZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5hdWRpb1NvdXJjZUxpc3QubGVuZ3RoID49IHRoaXMuTWF4QXVkaW9Tb3VyY2VDb3VudClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgbGV0IGF1ZGlvU291cmNlID0gR2xvYmFsLlBlcnNpc3QuZ2V0UGVyc2lzdE5vZGUoKS5hZGRDb21wb25lbnQoY2MuQXVkaW9Tb3VyY2UpO1xyXG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2VMaXN0LnB1c2goYXVkaW9Tb3VyY2UpO1xyXG4gICAgICAgIHJldHVybiBhdWRpb1NvdXJjZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldEF1ZGlvU291cmNlKGtleSlcclxuICAgIHtcclxuICAgICAgICAvL+WmguaenGtleeato+WcqOiiq+S9v+eUqCDliJnov5Tlm57lr7nlupTnmoRhdWRpb1NvdXJjZVxyXG4gICAgICAgIGxldCBhdWRpb1NvdXJjZSA9IHRoaXMucmVzVG9BdWRpb01hcFtrZXldO1xyXG4gICAgICAgIGlmKGF1ZGlvU291cmNlID09IG51bGwpXHJcbiAgICAgICAgICAgIGF1ZGlvU291cmNlID0gdGhpcy5nZXRJZGxlQXVkaW9Tb3VyY2UoKTtcclxuICAgICAgICBpZihhdWRpb1NvdXJjZSA9PSBudWxsKVxyXG4gICAgICAgICAgICBhdWRpb1NvdXJjZSA9IHRoaXMuZ2V0TmV3QXVkaW9Tb3VyY2UoKTtcclxuICAgICAgICByZXR1cm4gYXVkaW9Tb3VyY2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5L2/55SoQXVkaW9Tb3VyY2Xmkq3mlL7pn7PmlYjvvIzkuIDkuKrpn7PmlYjlkIzml7bmnIDlpJrlj6rog73mkq3mlL7kuIDkuKrvvIzlkIzml7bmnIDlpJrmkq3mlL415Liq6Z+z5rqQXHJcbiAgICAgKiBAcGFyYW0gdXJsIFxyXG4gICAgICogQHBhcmFtIG92ZXJyaWRlIOaYr+WQpuimhuebluaSreaUvlxyXG4gICAgICogQHBhcmFtIGlzQXV0b1JlbGVhc2Ug6LWE5rqQ5piv5ZCm6YeK5pS+XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwbGF5QXVkaW9Tb3VyY2UodXJsLCBvdmVycmlkZSA9IGZhbHNlLCBpc0F1dG9SZWxlYXNlID0gZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuc2V0dGluZ0RhdGEuc291bmRFbmFibGUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZih0aGlzLmluQmFja2dyb3VuZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInBsYXkgc291bmQgaW4gYmFja2dyb3VuZCEhIVwiLCB1cmwpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IGF1ZGlvU291cmNlID0gdGhpcy5nZXRBdWRpb1NvdXJjZSh1cmwpO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy/msqHmnInnqbrpl7Lpn7PmupBcclxuICAgICAgICBpZihhdWRpb1NvdXJjZSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy/mraPlnKjmkq3mlL5cclxuICAgICAgICBpZihhdWRpb1NvdXJjZS5pc1BsYXlpbmcgJiYgIW92ZXJyaWRlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5yZXNUb0F1ZGlvTWFwW3VybF0gPSBhdWRpb1NvdXJjZTtcclxuICAgICAgICBsZXQgYXVkaW8gPSB0aGlzLnJlc291cmNlTWdyLmdldFJlcyh1cmwsIGNjLkF1ZGlvQ2xpcCk7XHJcbiAgICAgICAgaWYoYXVkaW8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhdWRpb1NvdXJjZS5jbGlwID0gYXVkaW87XHJcbiAgICAgICAgICAgIGF1ZGlvU291cmNlLnBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNvdXJjZU1nci5sb2FkUmVzKHVybCwgKGVycm9yLCBhdWRpbyk9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIumfs+aViOWKoOi9veWksei0pVwiLCBlcnJvci5tZXNzYWdlLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlzQXV0b1JlbGVhc2UgJiYgR2xvYmFsLlJlc291cmNlTWFuYWdlci5zZXRBdXRvUmVsZWFzZVJlY3Vyc2l2ZWx5KGF1ZGlvLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGlmKGF1ZGlvU291cmNlLmlzUGxheWluZylcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBhdWRpb1NvdXJjZS5jbGlwID0gYXVkaW87XHJcbiAgICAgICAgICAgICAgICBhdWRpb1NvdXJjZS5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0sIGNjLkF1ZGlvQ2xpcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxufSJdfQ==