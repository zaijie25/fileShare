import WndBase, { DestoryType } from "../ui/WndBase";

export default class WndDownLoadApkUI extends WndBase {
    private yesBtnNode: cc.Node;
    private noBtnNode: cc.Node;
    private content: cc.Label;
    private yesCallback: Function;
    private noCallback: Function;
    private autoClose = true;
    private autoReleaseFunc = true;
    private loadingBar: cc.Node;
    private downloadApkUrl: string = "";
    private downdloadApkName: string = "appGame.apk";
    private curPer = 0;

    protected onInit() {
        this.name = "WndDownLoadApkUI";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/LoadingScene/DownLoadApkUI";
        this.destoryType = DestoryType.None;
    }

    protected initView() {
        this.addCommonClick("bg/close", this.onCloseClick, this);
        this.yesBtnNode = this.addCommonClick("yesBtn", this.onYesBtnClick, this);
        this.noBtnNode = this.addCommonClick("noBtn", this.onCloseClick, this);
        this.content = this.getComponent("content", cc.Label);
        this.content.string = "";

        this.loadingBar = this.getChild("loadingBar")

    }

    updateLoadingBar(per: number) {
        if (this.loadingBar == null || !this.loadingBar.isValid)
            return;
        if (per > 1) {
            Logger.error("!!!!!!!! per > 1")
            return;
        }
        let progressNode = this.loadingBar.getChildByName("bar_1_1")
        let progressBar = progressNode.getComponent(cc.ProgressBar)
        progressBar.progress = per
        this.updateLoadingBarStr(Math.round(per * 100) + "%")
    }

    updateLoadingBarStr(str) {
        if (this.loadingBar == null || !this.loadingBar.isValid)
            return;
        let progressPercentLabel = this.loadingBar.getChildByName("lbPer").getComponent(cc.Label)
        progressPercentLabel.string = str
    }

    /**
     * @param {string} content
     * @param {number} type   1 显示 确定取消  2  显示 确定
     * @param {Function} yesCallback
     * @param {Function} noCallback
     * @param {boolean} autoClose  点击按钮后是否自动关闭界面
     * @memberof WndDownLoadApkUI
     */
    protected onOpen() {
        if (this.args == null || this.args.length == 0) {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        let content = this.args[0];
        if (content == null || content == "") {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        //1 两个按钮  2 yes 一个按钮
        let type = this.args[1];
        this.updateBtnByType(type);
        this.content.string = content;
        this.downloadApkUrl = this.args[2]
        this.yesCallback = this.args[3];
        this.noCallback = this.args[4];
        this.autoClose = this.args[5] != false;
        this.autoReleaseFunc = this.args[6] != false;
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
    }

    private updateBtnByType(type) {
        if (type == 1) {
            this.yesBtnNode.active = true;
            this.noBtnNode.active = true;
            this.yesBtnNode.x = 157;
            this.noBtnNode.x = -157
        }
        else {
            this.yesBtnNode.active = true;
            this.noBtnNode.active = false;
            this.yesBtnNode.x = 0;
        }
    }


    private onCloseClick() {
        if (this.autoClose)
            this.close();

    }

    protected onClose() {

    }

    protected onCloseAnimFinish() {
        if (this.noCallback) {
            //防止嵌套调用
            let tmpnoCallback = this.noCallback;
            if (this.autoReleaseFunc) {
                this.noCallback = null;
            }
            tmpnoCallback();
        }
    }

    private onYesBtnClick() {
        if (this.yesCallback) {
            this.yesCallback();
            if (this.autoReleaseFunc) {
                this.yesCallback = null;
            }
        }
        if (this.curPer >= 1 || this.curPer >= 1.0) {
            let fullPath = jsb.fileUtils.getWritablePath() + this.downdloadApkName
            //安装apk
            if (jsb.fileUtils.isFileExist(fullPath)) {
                Global.NativeEvent.installApk(fullPath, (retObj) => {
                    if (retObj.result == 0) {
                        Logger.error("安装成功！")
                    } else {
                        Logger.error("安装失败!")
                    }
                })
            }
        } else {
            if (this.curPer == 0 ){
                if (this.downloadApkUrl != null && this.downloadApkUrl != "") {
                    this.startAndroidDownLoadApk(this.downloadApkUrl, this.downdloadApkName)
                } else {
                    Global.UI.fastTip("下载地址为空！")
                }
            }else {
                Global.UI.fastTip("下载中请稍等！")
            }
            
        }
    }

    private startAndroidDownLoadApk(url: string, fileName: string, callback?: Function) {
        let fullPath = jsb.fileUtils.getWritablePath() + fileName
        let apkDownloader = new jsb.Downloader();
        apkDownloader.setOnFileTaskSuccess(() => {
            if (callback) {
                callback(fullPath)
            }
            //安装apk
            if (jsb.fileUtils.isFileExist(fullPath)) {
                Global.NativeEvent.installApk(fullPath, (retObj) => {
                    if (retObj.result == 0) {
                        Logger.error("安装成功！")
                    } else {
                        Logger.error("安装失败!")
                    }
                })
            }

        });
        apkDownloader.setOnTaskError((obj, errorCode, errorCodeInternal, errorStr) => {
            Logger.error("startAndroidDownLoadApk error url = " + url)
            if (jsb.fileUtils.isFileExist(fullPath)) {
                jsb.fileUtils.removeFile(fullPath)
            }
            this.curPer = 0;
            this.updateLoadingBarStr("下载失败，请重试! errorCode " + errorCode)
        });

        apkDownloader.setOnTaskProgress((obj, bytesReceived, totalBytesReceived, totalBytesExpected) => {
            // Logger.error("bytesReceived = " + bytesReceived)
            // Logger.error("totalBytesReceived = " + totalBytesReceived)
            // Logger.error("totalBytesExpected = " + totalBytesExpected)
            let per = Number((totalBytesReceived / totalBytesExpected).toFixed(2))
            this.curPer = per;
            this.updateLoadingBar(per)
        })
        apkDownloader.createDownloadFileTask(url, fullPath);//创建下载任务
    }


}