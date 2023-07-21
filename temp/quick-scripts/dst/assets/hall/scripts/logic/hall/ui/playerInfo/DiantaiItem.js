
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/DiantaiItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxEaWFudGFpSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2RUFBd0U7QUFFbEUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUM7O0dBRUc7QUFFSDtJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQW1RQztRQWxRRzs7V0FFRztRQUNILGFBQU8sR0FBRyxJQUFJLENBQUM7UUFDZjs7V0FFRztRQUNILGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUI7O1dBRUc7UUFDSCxpQkFBVyxHQUFZLElBQUksQ0FBQztRQUM1Qjs7V0FFRztRQUNILGdCQUFVLEdBQWtCLElBQUksQ0FBQztRQUNqQzs7V0FFRztRQUNILGtCQUFZLEdBQWEsRUFBRSxDQUFDO1FBQzVCOztXQUVHO1FBQ0gscUJBQWUsR0FBRyxDQUFDLENBQUM7O0lBMk94QixDQUFDO0lBek9HLDRCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFN0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTdGLElBQUksQ0FB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bUIsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUMzRSxJQUFHLEtBQUssRUFDUjtZQUNJLEtBQUssQ0FBQyxLQUFLLENBQUMseUJBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1NBQ2hEO0lBQ0wsQ0FBQztJQWxRZ0IsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQW1RL0I7SUFBRCxrQkFBQztDQW5RRCxBQW1RQyxDQW5Rd0MsRUFBRSxDQUFDLFNBQVMsR0FtUXBEO2tCQW5Rb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQbGF5ZXJJbmZvTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvUGxheWVySW5mb01vZGVsXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKlxyXG4gKiDnlLXlj7DljZXkuKpJdGVtXHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaWFudGFpSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICAvKipcclxuICAgICAqIOatjOabsuaVsOaNruWvueixoVxyXG4gICAgICovXHJcbiAgICBkYXRhT2JqID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5q2M5puy5ZCN56ewXHJcbiAgICAgKi9cclxuICAgIGxhYmVsTmFtZTpjYy5MYWJlbCA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOatjOaJi1xyXG4gICAgICovXHJcbiAgICBsYWJlbFNpbmdlcjpjYy5MYWJlbCA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOS4i+i9vei/m+W6puadoVxyXG4gICAgICovXHJcbiAgICBwcm9jZXNzQmFyOmNjLlByb2dyZXNzQmFyID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5ZCE5Liq54q25oCB6IqC54K56ZuG5ZCIXHJcbiAgICAgKi9cclxuICAgIHN0YXRlTm9kZUFycjpjYy5Ob2RlW10gPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN5pi+56S66L+b5bqmXHJcbiAgICAgKi9cclxuICAgIHByb2dyZXNzUGVyY2VudCA9IDA7XHJcblxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5sYWJlbE5hbWUgPSBjYy5maW5kKFwibGFiZWxfbmFtZVwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5sYWJlbFNpbmdlciA9IGNjLmZpbmQoXCJsYWJlbF9zaW5nZXJcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG5cclxuICAgICAgICB0aGlzLnByb2Nlc3NCYXIgPSBjYy5maW5kKFwieGlhemFpemhvbmcvcHJvZ3Jlc3NCYXJcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlTm9kZUFyclswXSA9IEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwieGlhemFpQnRuXCIsIHRoaXMueGlhemFpQnRuRnVuYywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU5vZGVBcnJbMV0gPSBjYy5maW5kKFwieGlhemFpemhvbmdcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLnN0YXRlTm9kZUFyclsyXSA9IEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiYm9mYW5nQnRuXCIsIHRoaXMuYm9mYW5nQnRuRnVuYywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU5vZGVBcnJbM10gPSBjYy5maW5kKFwiYm9mYW5nemhvbmdcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICAvLyB0aGlzLnN0YXRlTm9kZUFycls0XSA9IGNjLmZpbmQoXCJidG5MYXlvdXQvaW1nX3BsYXlfaWNvblwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIC8vIHRoaXMuc3RhdGVOb2RlQXJyWzVdID0gY2MuZmluZChcImltZ19iZ19ub3dcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgXHJcblxyXG4gICAgdXBkYXRlKGR0KXtcclxuICAgICAgICBpZighdGhpcy5kYXRhT2JqIHx8ICF0aGlzLmRhdGFPYmouZG93bmxvYWRwZXJjZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMucHJvZ3Jlc3NQZXJjZW50IDwgdGhpcy5kYXRhT2JqLmRvd25sb2FkcGVyY2VudCl7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NQZXJjZW50ICs9IGR0ICogMC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLnByb2dyZXNzUGVyY2VudCA+IHRoaXMuZGF0YU9iai5kb3dubG9hZHBlcmNlbnQpe1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzUGVyY2VudCA9IHRoaXMuZGF0YU9iai5kb3dubG9hZHBlcmNlbnQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvZ3Jlc3NQZXJjZW50ID49IDEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhT2JqLmRvd25sb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlVUkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb2Nlc3NCYXIucHJvZ3Jlc3MgPSB0aGlzLnByb2dyZXNzUGVyY2VudDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIGluaXQoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuZGF0YU9iaiA9IGRhdGFcclxuICAgICAgICBpZiAoQ0NfSlNCKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFPYmogJiYgIXRoaXMuZGF0YU9iai5kb3dubG9hZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSB0aGlzLmRhdGFPYmouZmlsZTtcclxuICAgICAgICAgICAgICAgIC8vIGxldCBmaWxlUGF0aCA9IGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCkgKyBHbG9iYWwuVG9vbGtpdC5tZDUobmFtZSkrXCIubXAzXCI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHRoaXMuZ2V0TG9jYWxGaWxlTmFtZShuYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KGZpbGVQYXRoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YU9iai5kb3dubG9hZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkU291bmRSZXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlVwZGF0ZVVJKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrDnlYzpnaJcclxuICAgICAqL1xyXG4gICAgVXBkYXRlVUkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxhYmVsTmFtZSB8fCAhdGhpcy5kYXRhT2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYWJlbE5hbWUuc3RyaW5nID0gXCJcIiArIHRoaXMuZGF0YU9iai5uYW1lO1xyXG4gICAgICAgIHRoaXMubGFiZWxTaW5nZXIuc3RyaW5nID0gXCJcIiArIHRoaXMuZGF0YU9iai5zaW5nZXI7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdGF0ZU5vZGVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLnN0YXRlTm9kZUFycltpXTtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBsYXlpbmdVcmwgPSBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldChcImJnbVwiKVxyXG4gICAgICAgIHZhciBiUGxheWluZzogYm9vbGVhbiA9ICh0aGlzLmRhdGFPYmouc3VybCA9PSBwbGF5aW5nVXJsKTtcclxuICAgICAgICBsZXQgZGVmYXV0Q29sb3IgPSBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLmluZm9TaW5lckNvbG9yc1swXTtcclxuICAgICAgICBsZXQgc2VsZWN0Q29sb3IgPSBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLmluZm9TaW5lckNvbG9yc1sxXTtcclxuICAgICAgICBpZiAoYlBsYXlpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZU5vZGVBcnJbM10uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbE5hbWUubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigpLmZyb21IRVgoc2VsZWN0Q29sb3IpO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsU2luZ2VyLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoKS5mcm9tSEVYKHNlbGVjdENvbG9yKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5zdGF0ZU5vZGVBcnJbNF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gdGhpcy5zdGF0ZU5vZGVBcnJbNV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsTmFtZS5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKCkuZnJvbUhFWChkZWZhdXRDb2xvcik7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxTaW5nZXIubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigpLmZyb21IRVgoZGVmYXV0Q29sb3IpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnN0YXRlTm9kZUFycls0XS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gdGhpcy5zdGF0ZU5vZGVBcnJbNV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGF0YU9iai5kb3dubG9hZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlTm9kZUFyclsyXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmRhdGFPYmouZG93bmxvYWRwZXJjZW50ID4gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlTm9kZUFyclsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVOb2RlQXJyWzBdLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIvovb3mjInpkq7ngrnlh7tcclxuICAgICAqL1xyXG4gICAgeGlhemFpQnRuRnVuYygpe1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gdGhpcy5kYXRhT2JqLmZpbGU7XHJcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuZGF0YU9iai51cmw7XHJcbiAgICAgICAgdmFyIGJUZXN0ID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdmFyIGJUZXN0ID0gdHJ1ZTtcclxuICAgICAgICBpZiAoYlRlc3QgfHwgQ0NfSlNCKSB7XHJcbiAgICAgICAgICAgIGlmKENDX0pTQil7XHJcbiAgICAgICAgICAgICAgICAvLyB2YXIgZmlsZVBhdGggPSBqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpICsgR2xvYmFsLlRvb2xraXQubWQ1KG5hbWUpK1wiLm1wM1wiO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZpbGVQYXRoID0gdGhpcy5nZXRMb2NhbEZpbGVOYW1lKG5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChiVGVzdCB8fCAhanNiLmZpbGVVdGlscy5pc0ZpbGVFeGlzdChmaWxlUGF0aCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCB4aHIgPSBjYy5sb2FkZXIuZ2V0WE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZpbGVQYXRoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNhdmVGaWxlVG9OYXRpdmUoZmlsZVBhdGgsIHhoci5yZXNwb25zZSwgKCk9PntzZWxmLmRvd25sb2FkU3VjY2VzcygpfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kb3dubG9hZEZhaWxkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAvL+i/m+W6puWbnuiwg+WcqEMrK+WxguayoeacieWunueOsO+8jOaJgOS7peWOn+eUn+eOr+Wig+S4i+aXoOaViFxyXG4gICAgICAgICAgICAgICAgeGhyLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbihldmVudDpQcm9ncmVzc0V2ZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBpZihldmVudC5sZW5ndGhDb21wdXRhYmxlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSBldmVudC5sb2FkZWQgLyBldmVudC50b3RhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2xvYmFsLlVJLmZhc3RUaXAoXCLkuIvovb3ov5vluqbvvJpcIiArIHBlcmNlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwZXJjZW50ID4gMC45OSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJjZW50ID0gMC45OTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGFPYmouZG93bmxvYWRwZXJjZW50ID0gcGVyY2VudDtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhT2JqLmRvd25sb2FkcGVyY2VudCA9IDAuOTk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcbiAgICAgICAgICAgICAgICB4aHIub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRvd25sb2FkU3VjY2VzcygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwid2Vi54mI5LiN5pSv5oyB5LiL6L29XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmRhdGFPYmouZG93bmxvYWRwZXJjZW50ID0gMC45OTtcclxuICAgICAgICB0aGlzLlVwZGF0ZVVJKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cmzovaxNRDXvvIzlubbmi7zmjqXlkI7nvIBcclxuICAgICAqIEBwYXJhbSB1cmwgXHJcbiAgICAgKi9cclxuICAgIGdldExvY2FsRmlsZU5hbWUodXJsOnN0cmluZyk6c3RyaW5ne1xyXG4gICAgICAgIGxldCBuYW1lID0gdXJsO1xyXG4gICAgICAgIGxldCBlbmQgPSBuYW1lLmxhc3RJbmRleE9mKCcuJyk7XHJcbiAgICAgICAgbGV0IG5hbWVQcmUgPSBuYW1lLnNsaWNlKDAsZW5kKTtcclxuICAgICAgICBsZXQgZmlsZVN1ZmZpeCA9IG5hbWUuc3Vic3RyaW5nKGVuZCk7XHJcbiAgICAgICAgcmV0dXJuIGpzYi5maWxlVXRpbHMuZ2V0V3JpdGFibGVQYXRoKCkgKyBHbG9iYWwuVG9vbGtpdC5tZDUobmFtZVByZSkrZmlsZVN1ZmZpeDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDkv53lrZjmlofku7bliLDmnKzlnLBcclxuICAgICAqIEBwYXJhbSBmaWxlcGF0aCBcclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICovXHJcbiAgICBzYXZlRmlsZVRvTmF0aXZlKGZpbGVwYXRoLCBkYXRhLCBjYWxsYmFjaz8pIHtcclxuICAgICAgICBpZiAodHlwZW9mIGRhdGEgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlmIChqc2IuZmlsZVV0aWxzLndyaXRlRGF0YVRvRmlsZShuZXcgVWludDhBcnJheShkYXRhKSwgZmlsZXBhdGgpKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2coJ0RpYW50YWlJdGVtIFJlbW90ZSB3cml0ZSBmaWxlIHN1Y2NlZWQuJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZG93bmxvYWRGYWlsZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiL6L295a6M5oiQXHJcbiAgICAgKi9cclxuICAgIGRvd25sb2FkU3VjY2Vzcygpe1xyXG4gICAgICAgIHRoaXMuZGF0YU9iai5kb3dubG9hZHBlcmNlbnQgPSAxO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlVUkoKTtcclxuICAgICAgICB0aGlzLmxvYWRTb3VuZFJlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiL6L295aSx6LSlXHJcbiAgICAgKi9cclxuICAgIGRvd25sb2FkRmFpbGQoKXtcclxuICAgICAgICB0aGlzLmRhdGFPYmouZG93bmxvYWRwZXJjZW50ID0gMDtcclxuICAgICAgICB0aGlzLlVwZGF0ZVVJKCk7XHJcbiAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLkuIvovb3lpLHotKXvvIzor7fph43or5VcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3mnKzlnLDpn7PkuZDotYTmupBcclxuICAgICAqL1xyXG4gICAgbG9hZFNvdW5kUmVzKCl7XHJcbiAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkKHRoaXMuZGF0YU9iai5zdXJsLCBcclxuICAgICAgICAgICAgZnVuY3Rpb24oIGVycm9yIDogRXJyb3IgLCByZXMgOiBhbnkpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuc2V0QXV0b1JlbGVhc2VSZWN1cnNpdmVseShyZXMsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7mjInpkq7ngrnlh7tcclxuICAgICAqL1xyXG4gICAgYm9mYW5nQnRuRnVuYygpe1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBpZih0aGlzLmRhdGFPYmouZmlsZSA9PSBHbG9iYWwuU2V0dGluZy5oYWxsQkdNKXtcclxuICAgICAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlIYWxsQkdNKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIEdsb2JhbC5BdWRpby5wbGF5TXVzaWModGhpcy5kYXRhT2JqLnN1cmwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9QbGF5ZXJJbmZvTW9kZWwucGxheWluZ09iaiA9IHRoaXMuZGF0YU9iajtcclxuICAgICAgICBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLnNldChcImJnbVwiLCB0aGlzLmRhdGFPYmouc3VybCk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVVSSgpO1xyXG4gICAgICAgIHZhciBtb2RlbDpQbGF5ZXJJbmZvTW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUGxheWVySW5mb01vZGVsXCIpXHJcbiAgICAgICAgaWYobW9kZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2RlbC5ldmVudChQbGF5ZXJJbmZvTW9kZWwuVXBkYXRlU2Nyb2xsVmlldylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19