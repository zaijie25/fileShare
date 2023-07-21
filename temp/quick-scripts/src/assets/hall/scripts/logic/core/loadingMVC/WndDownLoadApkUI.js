"use strict";
cc._RF.push(module, '1ef32G5u/FOLLTCc3Ig+znM', 'WndDownLoadApkUI');
// hall/scripts/logic/core/loadingMVC/WndDownLoadApkUI.ts

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
var WndBase_1 = require("../ui/WndBase");
var WndDownLoadApkUI = /** @class */ (function (_super) {
    __extends(WndDownLoadApkUI, _super);
    function WndDownLoadApkUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autoClose = true;
        _this.autoReleaseFunc = true;
        _this.downloadApkUrl = "";
        _this.downdloadApkName = "appGame.apk";
        _this.curPer = 0;
        return _this;
    }
    WndDownLoadApkUI.prototype.onInit = function () {
        this.name = "WndDownLoadApkUI";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/LoadingScene/DownLoadApkUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndDownLoadApkUI.prototype.initView = function () {
        this.addCommonClick("bg/close", this.onCloseClick, this);
        this.yesBtnNode = this.addCommonClick("yesBtn", this.onYesBtnClick, this);
        this.noBtnNode = this.addCommonClick("noBtn", this.onCloseClick, this);
        this.content = this.getComponent("content", cc.Label);
        this.content.string = "";
        this.loadingBar = this.getChild("loadingBar");
    };
    WndDownLoadApkUI.prototype.updateLoadingBar = function (per) {
        if (this.loadingBar == null || !this.loadingBar.isValid)
            return;
        if (per > 1) {
            Logger.error("!!!!!!!! per > 1");
            return;
        }
        var progressNode = this.loadingBar.getChildByName("bar_1_1");
        var progressBar = progressNode.getComponent(cc.ProgressBar);
        progressBar.progress = per;
        this.updateLoadingBarStr(Math.round(per * 100) + "%");
    };
    WndDownLoadApkUI.prototype.updateLoadingBarStr = function (str) {
        if (this.loadingBar == null || !this.loadingBar.isValid)
            return;
        var progressPercentLabel = this.loadingBar.getChildByName("lbPer").getComponent(cc.Label);
        progressPercentLabel.string = str;
    };
    /**
     * @param {string} content
     * @param {number} type   1 显示 确定取消  2  显示 确定
     * @param {Function} yesCallback
     * @param {Function} noCallback
     * @param {boolean} autoClose  点击按钮后是否自动关闭界面
     * @memberof WndDownLoadApkUI
     */
    WndDownLoadApkUI.prototype.onOpen = function () {
        if (this.args == null || this.args.length == 0) {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        var content = this.args[0];
        if (content == null || content == "") {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        //1 两个按钮  2 yes 一个按钮
        var type = this.args[1];
        this.updateBtnByType(type);
        this.content.string = content;
        this.downloadApkUrl = this.args[2];
        this.yesCallback = this.args[3];
        this.noCallback = this.args[4];
        this.autoClose = this.args[5] != false;
        this.autoReleaseFunc = this.args[6] != false;
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
    };
    WndDownLoadApkUI.prototype.updateBtnByType = function (type) {
        if (type == 1) {
            this.yesBtnNode.active = true;
            this.noBtnNode.active = true;
            this.yesBtnNode.x = 157;
            this.noBtnNode.x = -157;
        }
        else {
            this.yesBtnNode.active = true;
            this.noBtnNode.active = false;
            this.yesBtnNode.x = 0;
        }
    };
    WndDownLoadApkUI.prototype.onCloseClick = function () {
        if (this.autoClose)
            this.close();
    };
    WndDownLoadApkUI.prototype.onClose = function () {
    };
    WndDownLoadApkUI.prototype.onCloseAnimFinish = function () {
        if (this.noCallback) {
            //防止嵌套调用
            var tmpnoCallback = this.noCallback;
            if (this.autoReleaseFunc) {
                this.noCallback = null;
            }
            tmpnoCallback();
        }
    };
    WndDownLoadApkUI.prototype.onYesBtnClick = function () {
        if (this.yesCallback) {
            this.yesCallback();
            if (this.autoReleaseFunc) {
                this.yesCallback = null;
            }
        }
        if (this.curPer >= 1 || this.curPer >= 1.0) {
            var fullPath = jsb.fileUtils.getWritablePath() + this.downdloadApkName;
            //安装apk
            if (jsb.fileUtils.isFileExist(fullPath)) {
                Global.NativeEvent.installApk(fullPath, function (retObj) {
                    if (retObj.result == 0) {
                        Logger.error("安装成功！");
                    }
                    else {
                        Logger.error("安装失败!");
                    }
                });
            }
        }
        else {
            if (this.curPer == 0) {
                if (this.downloadApkUrl != null && this.downloadApkUrl != "") {
                    this.startAndroidDownLoadApk(this.downloadApkUrl, this.downdloadApkName);
                }
                else {
                    Global.UI.fastTip("下载地址为空！");
                }
            }
            else {
                Global.UI.fastTip("下载中请稍等！");
            }
        }
    };
    WndDownLoadApkUI.prototype.startAndroidDownLoadApk = function (url, fileName, callback) {
        var _this = this;
        var fullPath = jsb.fileUtils.getWritablePath() + fileName;
        var apkDownloader = new jsb.Downloader();
        apkDownloader.setOnFileTaskSuccess(function () {
            if (callback) {
                callback(fullPath);
            }
            //安装apk
            if (jsb.fileUtils.isFileExist(fullPath)) {
                Global.NativeEvent.installApk(fullPath, function (retObj) {
                    if (retObj.result == 0) {
                        Logger.error("安装成功！");
                    }
                    else {
                        Logger.error("安装失败!");
                    }
                });
            }
        });
        apkDownloader.setOnTaskError(function (obj, errorCode, errorCodeInternal, errorStr) {
            Logger.error("startAndroidDownLoadApk error url = " + url);
            if (jsb.fileUtils.isFileExist(fullPath)) {
                jsb.fileUtils.removeFile(fullPath);
            }
            _this.curPer = 0;
            _this.updateLoadingBarStr("下载失败，请重试! errorCode " + errorCode);
        });
        apkDownloader.setOnTaskProgress(function (obj, bytesReceived, totalBytesReceived, totalBytesExpected) {
            // Logger.error("bytesReceived = " + bytesReceived)
            // Logger.error("totalBytesReceived = " + totalBytesReceived)
            // Logger.error("totalBytesExpected = " + totalBytesExpected)
            var per = Number((totalBytesReceived / totalBytesExpected).toFixed(2));
            _this.curPer = per;
            _this.updateLoadingBar(per);
        });
        apkDownloader.createDownloadFileTask(url, fullPath); //创建下载任务
    };
    return WndDownLoadApkUI;
}(WndBase_1.default));
exports.default = WndDownLoadApkUI;

cc._RF.pop();