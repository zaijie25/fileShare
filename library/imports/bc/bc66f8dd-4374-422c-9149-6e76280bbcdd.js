"use strict";
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