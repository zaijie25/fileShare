"use strict";
cc._RF.push(module, '80981e7OipKYaZQcf4763/F', 'DiantaiItem');
// hall/scripts/logic/hall/ui/playerInfo/DiantaiItem.ts

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
var PlayerInfoModel_1 = require("../../../hallcommon/model/PlayerInfoModel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 电台单个Item
 */
var DiantaiItem = /** @class */ (function (_super) {
    __extends(DiantaiItem, _super);
    function DiantaiItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 歌曲数据对象
         */
        _this.dataObj = null;
        /**
         * 歌曲名称
         */
        _this.labelName = null;
        /**
         * 歌手
         */
        _this.labelSinger = null;
        /**
         * 下载进度条
         */
        _this.processBar = null;
        /**
         * 各个状态节点集合
         */
        _this.stateNodeArr = [];
        /**
         * 当前显示进度
         */
        _this.progressPercent = 0;
        return _this;
    }
    DiantaiItem.prototype.onLoad = function () {
        this.labelName = cc.find("label_name", this.node).getComponent(cc.Label);
        this.labelSinger = cc.find("label_singer", this.node).getComponent(cc.Label);
        this.processBar = cc.find("xiazaizhong/progressBar", this.node).getComponent(cc.ProgressBar);
        this.stateNodeArr[0] = Global.UIHelper.addCommonClick(this.node, "xiazaiBtn", this.xiazaiBtnFunc, this);
        this.stateNodeArr[1] = cc.find("xiazaizhong", this.node);
        this.stateNodeArr[2] = Global.UIHelper.addCommonClick(this.node, "bofangBtn", this.bofangBtnFunc, this);
        this.stateNodeArr[3] = cc.find("bofangzhong", this.node);
        // this.stateNodeArr[4] = cc.find("btnLayout/img_play_icon", this.node);
        // this.stateNodeArr[5] = cc.find("img_bg_now", this.node);
    };
    DiantaiItem.prototype.update = function (dt) {
        if (!this.dataObj || !this.dataObj.downloadpercent) {
            return;
        }
        if (this.progressPercent < this.dataObj.downloadpercent) {
            this.progressPercent += dt * 0.1;
        }
        if (this.progressPercent > this.dataObj.downloadpercent) {
            this.progressPercent = this.dataObj.downloadpercent;
            if (this.progressPercent >= 1) {
                this.dataObj.download = true;
                this.UpdateUI();
            }
        }
        this.processBar.progress = this.progressPercent;
    };
    /**
     * 初始化
     */
    DiantaiItem.prototype.init = function (data) {
        this.dataObj = data;
        if (CC_JSB) {
            if (this.dataObj && !this.dataObj.download) {
                var name = this.dataObj.file;
                // let filePath = jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(name)+".mp3";
                var filePath = this.getLocalFileName(name);
                if (jsb.fileUtils.isFileExist(filePath)) {
                    this.dataObj.download = true;
                    this.loadSoundRes();
                }
            }
        }
        this.UpdateUI();
    };
    /**
     * 更新界面
     */
    DiantaiItem.prototype.UpdateUI = function () {
        if (!this.labelName || !this.dataObj) {
            return;
        }
        this.labelName.string = "" + this.dataObj.name;
        this.labelSinger.string = "" + this.dataObj.singer;
        for (var i = 0; i < this.stateNodeArr.length; i++) {
            var node = this.stateNodeArr[i];
            node.active = false;
        }
        var playingUrl = Global.Setting.storage.get("bgm");
        var bPlaying = (this.dataObj.surl == playingUrl);
        var defautColor = Global.Setting.SkinConfig.infoSinerColors[0];
        var selectColor = Global.Setting.SkinConfig.infoSinerColors[1];
        if (bPlaying) {
            this.stateNodeArr[3].active = true;
            this.labelName.node.color = new cc.Color().fromHEX(selectColor);
            this.labelSinger.node.color = new cc.Color().fromHEX(selectColor);
            // this.stateNodeArr[4].active = true;
            // this.stateNodeArr[5].active = true;
        }
        else {
            this.labelName.node.color = new cc.Color().fromHEX(defautColor);
            this.labelSinger.node.color = new cc.Color().fromHEX(defautColor);
            // this.stateNodeArr[4].active = false;
            // this.stateNodeArr[5].active = false;
            if (this.dataObj.download) {
                this.stateNodeArr[2].active = true;
            }
            else if (this.dataObj.downloadpercent > 0) {
                this.stateNodeArr[1].active = true;
            }
            else {
                this.stateNodeArr[0].active = true;
            }
        }
    };
    /**
     * 下载按钮点击
     */
    DiantaiItem.prototype.xiazaiBtnFunc = function () {
        var self = this;
        var name = this.dataObj.file;
        var url = this.dataObj.url;
        var bTest = false;
        // var bTest = true;
        if (bTest || CC_JSB) {
            if (CC_JSB) {
                // var filePath = jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(name)+".mp3";
                var filePath = this.getLocalFileName(name);
            }
            if (bTest || !jsb.fileUtils.isFileExist(filePath)) {
                var xhr_1 = cc.loader.getXMLHttpRequest();
                xhr_1.onreadystatechange = function () {
                    if (xhr_1.readyState === 4) {
                        if (xhr_1.status === 200) {
                            if (filePath) {
                                self.saveFileToNative(filePath, xhr_1.response, function () { self.downloadSuccess(); });
                            }
                            return;
                        }
                        else {
                            self.downloadFaild();
                        }
                    }
                }.bind(this);
                //进度回调在C++层没有实现，所以原生环境下无效
                xhr_1.onprogress = function (event) {
                    if (event.lengthComputable) {
                        var percent = event.loaded / event.total;
                        // Global.UI.fastTip("下载进度：" + percent);
                        if (percent > 0.99) {
                            percent = 0.99;
                        }
                        self.dataObj.downloadpercent = percent;
                    }
                    else {
                        self.dataObj.downloadpercent = 0.99;
                    }
                }.bind(this);
                xhr_1.responseType = 'arraybuffer';
                xhr_1.open("GET", url, true);
                xhr_1.send();
            }
            else {
                self.downloadSuccess();
                return;
            }
        }
        else {
            Global.UI.fastTip("web版不支持下载");
            return;
        }
        this.dataObj.downloadpercent = 0.99;
        this.UpdateUI();
    };
    /**
     * url转MD5，并拼接后缀
     * @param url
     */
    DiantaiItem.prototype.getLocalFileName = function (url) {
        var name = url;
        var end = name.lastIndexOf('.');
        var namePre = name.slice(0, end);
        var fileSuffix = name.substring(end);
        return jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(namePre) + fileSuffix;
    };
    /**
     * 保存文件到本地
     * @param filepath
     * @param data
     * @param callback
     */
    DiantaiItem.prototype.saveFileToNative = function (filepath, data, callback) {
        if (typeof data !== 'undefined') {
            if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filepath)) {
                cc.log('DiantaiItem Remote write file succeed.');
                if (callback) {
                    callback();
                }
                return;
            }
        }
        this.downloadFaild();
    };
    /**
     * 下载完成
     */
    DiantaiItem.prototype.downloadSuccess = function () {
        this.dataObj.downloadpercent = 1;
        this.UpdateUI();
        this.loadSoundRes();
    };
    /**
     * 下载失败
     */
    DiantaiItem.prototype.downloadFaild = function () {
        this.dataObj.downloadpercent = 0;
        this.UpdateUI();
        Global.UI.fastTip("下载失败，请重试");
    };
    /**
     * 加载本地音乐资源
     */
    DiantaiItem.prototype.loadSoundRes = function () {
        Global.ResourceManager.load(this.dataObj.surl, function (error, res) {
            if (error) {
                Logger.error(error.message || error);
                return;
            }
            // Global.ResourceManager.setAutoReleaseRecursively(res, false);
        });
    };
    /**
     * 播放按钮点击
     */
    DiantaiItem.prototype.bofangBtnFunc = function () {
        if (this.dataObj.file == Global.Setting.hallBGM) {
            Global.Audio.playHallBGM();
        }
        else {
            Global.Audio.playMusic(this.dataObj.surl);
        }
        //PlayerInfoModel.playingObj = this.dataObj;
        Global.Setting.storage.set("bgm", this.dataObj.surl);
        this.UpdateUI();
        var model = Global.ModelManager.getModel("PlayerInfoModel");
        if (model) {
            model.event(PlayerInfoModel_1.default.UpdateScrollView);
        }
    };
    DiantaiItem = __decorate([
        ccclass
    ], DiantaiItem);
    return DiantaiItem;
}(cc.Component));
exports.default = DiantaiItem;

cc._RF.pop();