import PlayerInfoModel from "../../../hallcommon/model/PlayerInfoModel";

const {ccclass, property} = cc._decorator;

/**
 * 电台单个Item
 */
@ccclass
export default class DiantaiItem extends cc.Component {
    /**
     * 歌曲数据对象
     */
    dataObj = null;
    /**
     * 歌曲名称
     */
    labelName:cc.Label = null;
    /**
     * 歌手
     */
    labelSinger:cc.Label = null;
    /**
     * 下载进度条
     */
    processBar:cc.ProgressBar = null;
    /**
     * 各个状态节点集合
     */
    stateNodeArr:cc.Node[] = [];
    /**
     * 当前显示进度
     */
    progressPercent = 0;

    onLoad(){
        this.labelName = cc.find("label_name", this.node).getComponent(cc.Label);
        this.labelSinger = cc.find("label_singer", this.node).getComponent(cc.Label);

        this.processBar = cc.find("xiazaizhong/progressBar", this.node).getComponent(cc.ProgressBar);

        this.stateNodeArr[0] = Global.UIHelper.addCommonClick(this.node, "xiazaiBtn", this.xiazaiBtnFunc, this);
        this.stateNodeArr[1] = cc.find("xiazaizhong", this.node);
        this.stateNodeArr[2] = Global.UIHelper.addCommonClick(this.node, "bofangBtn", this.bofangBtnFunc, this);
        this.stateNodeArr[3] = cc.find("bofangzhong", this.node);
        // this.stateNodeArr[4] = cc.find("btnLayout/img_play_icon", this.node);
        // this.stateNodeArr[5] = cc.find("img_bg_now", this.node);
       
    }

   

    update(dt){
        if(!this.dataObj || !this.dataObj.downloadpercent)
        {
            return
        }
        if(this.progressPercent < this.dataObj.downloadpercent){
            this.progressPercent += dt * 0.1;
        }
        if(this.progressPercent > this.dataObj.downloadpercent){
            this.progressPercent = this.dataObj.downloadpercent;
            if(this.progressPercent >= 1){
                this.dataObj.download = true;
                this.UpdateUI();
            }
        }
        this.processBar.progress = this.progressPercent;
    }
    /**
     * 初始化
     */
    init(data) {
        this.dataObj = data
        if (CC_JSB) {
            if (this.dataObj && !this.dataObj.download) {
                let name = this.dataObj.file;
                // let filePath = jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(name)+".mp3";
                const filePath = this.getLocalFileName(name);
                if (jsb.fileUtils.isFileExist(filePath)) {
                    this.dataObj.download = true;
                    this.loadSoundRes();
                }
            }
        }
        this.UpdateUI();
    }

    /**
     * 更新界面
     */
    UpdateUI() {
        if (!this.labelName || !this.dataObj) {
            return;
        }
        this.labelName.string = "" + this.dataObj.name;
        this.labelSinger.string = "" + this.dataObj.singer;

        for (var i = 0; i < this.stateNodeArr.length; i++) {
            var node = this.stateNodeArr[i];
            node.active = false;
        }
        let playingUrl = Global.Setting.storage.get("bgm")
        var bPlaying: boolean = (this.dataObj.surl == playingUrl);
        let defautColor = Global.Setting.SkinConfig.infoSinerColors[0];
        let selectColor = Global.Setting.SkinConfig.infoSinerColors[1];
        if (bPlaying) {
            this.stateNodeArr[3].active = true;
            this.labelName.node.color = new cc.Color().fromHEX(selectColor);
            this.labelSinger.node.color = new cc.Color().fromHEX(selectColor);
            // this.stateNodeArr[4].active = true;
            // this.stateNodeArr[5].active = true;
        } else {
            this.labelName.node.color = new cc.Color().fromHEX(defautColor);
            this.labelSinger.node.color = new cc.Color().fromHEX(defautColor);
            // this.stateNodeArr[4].active = false;
            // this.stateNodeArr[5].active = false;
            if(this.dataObj.download){
                this.stateNodeArr[2].active = true;
            }else if(this.dataObj.downloadpercent > 0){
                this.stateNodeArr[1].active = true;
            }else{
                this.stateNodeArr[0].active = true;
            }
        }
    }

    /**
     * 下载按钮点击
     */
    xiazaiBtnFunc(){
        var self = this;
        let name: string = this.dataObj.file;
        let url = this.dataObj.url;
        var bTest = false;
        // var bTest = true;
        if (bTest || CC_JSB) {
            if(CC_JSB){
                // var filePath = jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(name)+".mp3";
                var filePath = this.getLocalFileName(name);
            }
            if (bTest || !jsb.fileUtils.isFileExist(filePath)) {
                let xhr = cc.loader.getXMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            if(filePath){
                                self.saveFileToNative(filePath, xhr.response, ()=>{self.downloadSuccess()});
                            }
                            return;
                        }else{
                            self.downloadFaild();
                        }
                    }
                }.bind(this);
                //进度回调在C++层没有实现，所以原生环境下无效
                xhr.onprogress = function(event:ProgressEvent){
                    if(event.lengthComputable){
                        var percent = event.loaded / event.total;
                        // Global.UI.fastTip("下载进度：" + percent);
                        if(percent > 0.99){
                            percent = 0.99;
                        }
                        self.dataObj.downloadpercent = percent;
                    }else{
                        self.dataObj.downloadpercent = 0.99;
                    }
                }.bind(this);
                xhr.responseType = 'arraybuffer';
                xhr.open("GET", url, true);
                xhr.send();
            }else{
                self.downloadSuccess();
                return;
            }
        }else{
            Global.UI.fastTip("web版不支持下载");
            return;
        }

        this.dataObj.downloadpercent = 0.99;
        this.UpdateUI();
    }

    /**
     * url转MD5，并拼接后缀
     * @param url 
     */
    getLocalFileName(url:string):string{
        let name = url;
        let end = name.lastIndexOf('.');
        let namePre = name.slice(0,end);
        let fileSuffix = name.substring(end);
        return jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(namePre)+fileSuffix;
    }
    
    /**
     * 保存文件到本地
     * @param filepath 
     * @param data 
     * @param callback 
     */
    saveFileToNative(filepath, data, callback?) {
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
    }

    /**
     * 下载完成
     */
    downloadSuccess(){
        this.dataObj.downloadpercent = 1;
        this.UpdateUI();
        this.loadSoundRes();
    }

    /**
     * 下载失败
     */
    downloadFaild(){
        this.dataObj.downloadpercent = 0;
        this.UpdateUI();
        Global.UI.fastTip("下载失败，请重试");
    }

    /**
     * 加载本地音乐资源
     */
    loadSoundRes(){
        Global.ResourceManager.load(this.dataObj.surl, 
            function( error : Error , res : any){
                if (error) {
                    Logger.error(error.message || error);
                    return;
                }
                // Global.ResourceManager.setAutoReleaseRecursively(res, false);
            });
    }

    /**
     * 播放按钮点击
     */
    bofangBtnFunc(){
        

        if(this.dataObj.file == Global.Setting.hallBGM){
            Global.Audio.playHallBGM();
        }else{
            Global.Audio.playMusic(this.dataObj.surl);
        }

        //PlayerInfoModel.playingObj = this.dataObj;
        Global.Setting.storage.set("bgm", this.dataObj.surl);
        this.UpdateUI();
        var model:PlayerInfoModel = Global.ModelManager.getModel("PlayerInfoModel")
        if(model)
        {
            model.event(PlayerInfoModel.UpdateScrollView)
        }
    }
}
