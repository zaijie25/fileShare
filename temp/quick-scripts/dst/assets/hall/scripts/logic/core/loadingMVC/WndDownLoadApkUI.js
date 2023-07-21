
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/loadingMVC/WndDownLoadApkUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGxvYWRpbmdNVkNcXFduZERvd25Mb2FkQXBrVUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQXFEO0FBRXJEO0lBQThDLG9DQUFPO0lBQXJEO1FBQUEscUVBZ01DO1FBMUxXLGVBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIscUJBQWUsR0FBRyxJQUFJLENBQUM7UUFFdkIsb0JBQWMsR0FBVyxFQUFFLENBQUM7UUFDNUIsc0JBQWdCLEdBQVcsYUFBYSxDQUFDO1FBQ3pDLFlBQU0sR0FBRyxDQUFDLENBQUM7O0lBcUx2QixDQUFDO0lBbkxhLGlDQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLDRDQUE0QyxDQUFDO1FBQzVELElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQVcsQ0FBQyxJQUFJLENBQUM7SUFDeEMsQ0FBQztJQUVTLG1DQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxPQUFP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QUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN0RSxLQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUNsQixLQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDOUIsQ0FBQyxDQUFDLENBQUE7UUFDRixhQUFhLENBQUMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUEsUUFBUTtJQUNoRSxDQUFDO0lBR0wsdUJBQUM7QUFBRCxDQWhNQSxBQWdNQyxDQWhNNkMsaUJBQU8sR0FnTXBEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UsIHsgRGVzdG9yeVR5cGUgfSBmcm9tIFwiLi4vdWkvV25kQmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kRG93bkxvYWRBcGtVSSBleHRlbmRzIFduZEJhc2Uge1xyXG4gICAgcHJpdmF0ZSB5ZXNCdG5Ob2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBub0J0bk5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGNvbnRlbnQ6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSB5ZXNDYWxsYmFjazogRnVuY3Rpb247XHJcbiAgICBwcml2YXRlIG5vQ2FsbGJhY2s6IEZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBhdXRvQ2xvc2UgPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBhdXRvUmVsZWFzZUZ1bmMgPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBsb2FkaW5nQmFyOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBkb3dubG9hZEFwa1VybDogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgZG93bmRsb2FkQXBrTmFtZTogc3RyaW5nID0gXCJhcHBHYW1lLmFwa1wiO1xyXG4gICAgcHJpdmF0ZSBjdXJQZXIgPSAwO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmREb3duTG9hZEFwa1VJXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IFwiUG9wTGF5ZXJcIjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9Mb2FkaW5nU2NlbmUvRG93bkxvYWRBcGtVSVwiO1xyXG4gICAgICAgIHRoaXMuZGVzdG9yeVR5cGUgPSBEZXN0b3J5VHlwZS5Ob25lO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYmcvY2xvc2VcIiwgdGhpcy5vbkNsb3NlQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMueWVzQnRuTm9kZSA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJ5ZXNCdG5cIiwgdGhpcy5vblllc0J0bkNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vQnRuTm9kZSA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJub0J0blwiLCB0aGlzLm9uQ2xvc2VDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5nZXRDb21wb25lbnQoXCJjb250ZW50XCIsIGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQuc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgdGhpcy5sb2FkaW5nQmFyID0gdGhpcy5nZXRDaGlsZChcImxvYWRpbmdCYXJcIilcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlTG9hZGluZ0JhcihwZXI6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmdCYXIgPT0gbnVsbCB8fCAhdGhpcy5sb2FkaW5nQmFyLmlzVmFsaWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAocGVyID4gMSkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCIhISEhISEhISBwZXIgPiAxXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHByb2dyZXNzTm9kZSA9IHRoaXMubG9hZGluZ0Jhci5nZXRDaGlsZEJ5TmFtZShcImJhcl8xXzFcIilcclxuICAgICAgICBsZXQgcHJvZ3Jlc3NCYXIgPSBwcm9ncmVzc05vZGUuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKVxyXG4gICAgICAgIHByb2dyZXNzQmFyLnByb2dyZXNzID0gcGVyXHJcbiAgICAgICAgdGhpcy51cGRhdGVMb2FkaW5nQmFyU3RyKE1hdGgucm91bmQocGVyICogMTAwKSArIFwiJVwiKVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUxvYWRpbmdCYXJTdHIoc3RyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9hZGluZ0JhciA9PSBudWxsIHx8ICF0aGlzLmxvYWRpbmdCYXIuaXNWYWxpZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCBwcm9ncmVzc1BlcmNlbnRMYWJlbCA9IHRoaXMubG9hZGluZ0Jhci5nZXRDaGlsZEJ5TmFtZShcImxiUGVyXCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICBwcm9ncmVzc1BlcmNlbnRMYWJlbC5zdHJpbmcgPSBzdHJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdHlwZSAgIDEg5pi+56S6IOehruWumuWPlua2iCAgMiAg5pi+56S6IOehruWumlxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0geWVzQ2FsbGJhY2tcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG5vQ2FsbGJhY2tcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYXV0b0Nsb3NlICDngrnlh7vmjInpkq7lkI7mmK/lkKboh6rliqjlhbPpl63nlYzpnaJcclxuICAgICAqIEBtZW1iZXJvZiBXbmREb3duTG9hZEFwa1VJXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXJncyA9PSBudWxsIHx8IHRoaXMuYXJncy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmsqHmnInorr7nva7lj4LmlbBcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuYXJnc1swXTtcclxuICAgICAgICBpZiAoY29udGVudCA9PSBudWxsIHx8IGNvbnRlbnQgPT0gXCJcIikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmsqHmnInorr7nva7lj4LmlbBcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzEg5Lik5Liq5oyJ6ZKuICAyIHllcyDkuIDkuKrmjInpkq5cclxuICAgICAgICBsZXQgdHlwZSA9IHRoaXMuYXJnc1sxXTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUJ0bkJ5VHlwZSh0eXBlKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQuc3RyaW5nID0gY29udGVudDtcclxuICAgICAgICB0aGlzLmRvd25sb2FkQXBrVXJsID0gdGhpcy5hcmdzWzJdXHJcbiAgICAgICAgdGhpcy55ZXNDYWxsYmFjayA9IHRoaXMuYXJnc1szXTtcclxuICAgICAgICB0aGlzLm5vQ2FsbGJhY2sgPSB0aGlzLmFyZ3NbNF07XHJcbiAgICAgICAgdGhpcy5hdXRvQ2xvc2UgPSB0aGlzLmFyZ3NbNV0gIT0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdXRvUmVsZWFzZUZ1bmMgPSB0aGlzLmFyZ3NbNl0gIT0gZmFsc2U7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkZPUkNFX0hJREVfV0FJVElORyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVCdG5CeVR5cGUodHlwZSkge1xyXG4gICAgICAgIGlmICh0eXBlID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy55ZXNCdG5Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9CdG5Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMueWVzQnRuTm9kZS54ID0gMTU3O1xyXG4gICAgICAgICAgICB0aGlzLm5vQnRuTm9kZS54ID0gLTE1N1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy55ZXNCdG5Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9CdG5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnllc0J0bk5vZGUueCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xvc2VDbGljaygpIHtcclxuICAgICAgICBpZiAodGhpcy5hdXRvQ2xvc2UpXHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlQW5pbUZpbmlzaCgpIHtcclxuICAgICAgICBpZiAodGhpcy5ub0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIC8v6Ziy5q2i5bWM5aWX6LCD55SoXHJcbiAgICAgICAgICAgIGxldCB0bXBub0NhbGxiYWNrID0gdGhpcy5ub0NhbGxiYWNrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvUmVsZWFzZUZ1bmMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdG1wbm9DYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uWWVzQnRuQ2xpY2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMueWVzQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy55ZXNDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvUmVsZWFzZUZ1bmMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueWVzQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmN1clBlciA+PSAxIHx8IHRoaXMuY3VyUGVyID49IDEuMCkge1xyXG4gICAgICAgICAgICBsZXQgZnVsbFBhdGggPSBqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpICsgdGhpcy5kb3duZGxvYWRBcGtOYW1lXHJcbiAgICAgICAgICAgIC8v5a6J6KOFYXBrXHJcbiAgICAgICAgICAgIGlmIChqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KGZ1bGxQYXRoKSkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50Lmluc3RhbGxBcGsoZnVsbFBhdGgsIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0T2JqLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuWuieijheaIkOWKn++8gVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuWuieijheWksei0pSFcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyUGVyID09IDAgKXtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRvd25sb2FkQXBrVXJsICE9IG51bGwgJiYgdGhpcy5kb3dubG9hZEFwa1VybCAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydEFuZHJvaWREb3duTG9hZEFwayh0aGlzLmRvd25sb2FkQXBrVXJsLCB0aGlzLmRvd25kbG9hZEFwa05hbWUpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5LiL6L295Zyw5Z2A5Li656m677yBXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5LiL6L295Lit6K+356iN562J77yBXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhcnRBbmRyb2lkRG93bkxvYWRBcGsodXJsOiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuICAgICAgICBsZXQgZnVsbFBhdGggPSBqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpICsgZmlsZU5hbWVcclxuICAgICAgICBsZXQgYXBrRG93bmxvYWRlciA9IG5ldyBqc2IuRG93bmxvYWRlcigpO1xyXG4gICAgICAgIGFwa0Rvd25sb2FkZXIuc2V0T25GaWxlVGFza1N1Y2Nlc3MoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGZ1bGxQYXRoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5a6J6KOFYXBrXHJcbiAgICAgICAgICAgIGlmIChqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KGZ1bGxQYXRoKSkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50Lmluc3RhbGxBcGsoZnVsbFBhdGgsIChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0T2JqLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuWuieijheaIkOWKn++8gVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuWuieijheWksei0pSFcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFwa0Rvd25sb2FkZXIuc2V0T25UYXNrRXJyb3IoKG9iaiwgZXJyb3JDb2RlLCBlcnJvckNvZGVJbnRlcm5hbCwgZXJyb3JTdHIpID0+IHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwic3RhcnRBbmRyb2lkRG93bkxvYWRBcGsgZXJyb3IgdXJsID0gXCIgKyB1cmwpXHJcbiAgICAgICAgICAgIGlmIChqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KGZ1bGxQYXRoKSkge1xyXG4gICAgICAgICAgICAgICAganNiLmZpbGVVdGlscy5yZW1vdmVGaWxlKGZ1bGxQYXRoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3VyUGVyID0gMDtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVMb2FkaW5nQmFyU3RyKFwi5LiL6L295aSx6LSl77yM6K+36YeN6K+VISBlcnJvckNvZGUgXCIgKyBlcnJvckNvZGUpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGFwa0Rvd25sb2FkZXIuc2V0T25UYXNrUHJvZ3Jlc3MoKG9iaiwgYnl0ZXNSZWNlaXZlZCwgdG90YWxCeXRlc1JlY2VpdmVkLCB0b3RhbEJ5dGVzRXhwZWN0ZWQpID0+IHtcclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwiYnl0ZXNSZWNlaXZlZCA9IFwiICsgYnl0ZXNSZWNlaXZlZClcclxuICAgICAgICAgICAgLy8gTG9nZ2VyLmVycm9yKFwidG90YWxCeXRlc1JlY2VpdmVkID0gXCIgKyB0b3RhbEJ5dGVzUmVjZWl2ZWQpXHJcbiAgICAgICAgICAgIC8vIExvZ2dlci5lcnJvcihcInRvdGFsQnl0ZXNFeHBlY3RlZCA9IFwiICsgdG90YWxCeXRlc0V4cGVjdGVkKVxyXG4gICAgICAgICAgICBsZXQgcGVyID0gTnVtYmVyKCh0b3RhbEJ5dGVzUmVjZWl2ZWQgLyB0b3RhbEJ5dGVzRXhwZWN0ZWQpLnRvRml4ZWQoMikpXHJcbiAgICAgICAgICAgIHRoaXMuY3VyUGVyID0gcGVyO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxvYWRpbmdCYXIocGVyKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgYXBrRG93bmxvYWRlci5jcmVhdGVEb3dubG9hZEZpbGVUYXNrKHVybCwgZnVsbFBhdGgpOy8v5Yib5bu65LiL6L295Lu75YqhXHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==