import ViewBase from "../../../../core/ui/ViewBase";
import GameHotUpdateComponent from "../../../../core/hotUpdate/component/GameHotUpdateComponent";
import HallStorageKey from "../../../../hallcommon/const/HallStorageKey";
import HallModel from "../../../../hallcommon/model/HallModel";
import { GameType } from "../../ChooseRoom/WndGameLobbyShell";
import BindingButtonEffect from "../../../../core/component/BindingButtonEffect";
import ButtonPlus from "../../../../core/component/ButtonPlus";
import YXButton from "../../../../core/component/YXButton";
//初始 -1000 -1 没下载过 0 下载成功并且版本是最新  1下载成功，版本不是最新 2下载中 3等待下载   4下载失败
enum GameDownloadStatus {
    INIT = -1000,
    NEVER_DOWNLOAD = -1,
    NEW_VERSION_SUCCESS = 0,
    OLD_VERSION = 1,
    DOWNLOADING = 2,
    WAIT_DOWNLOAD = 3,
    FAILD = 4
}

// 1开放，2即将上线，3维护
enum GameStatue {
    None = 0,
    Open,
    Soon,
    Maintain,
}


export default class GameItemView extends ViewBase {
    gameData: any;
    //纯客户端资源配置
    public gameResData: any;
    updateState: cc.Node;

    gameUpdateState = GameDownloadStatus.INIT;  //  -1 没下载过 0 下载成功并且版本是最新  1下载成功，版本不是最新 2下载中 3等待下载   4下载失败   ----// 1 new 2 下载中 3下载成功  4下载失败  

    updateState_download: cc.Node;
    updateState_waiting: cc.Node;
    updateState_update: cc.Node;
    updateState_stop: cc.Node;
    updateState_loading: cc.Node;
    //gameitem中的spine节点
    spineNode: cc.Node;

    isBtnClick = false;
    checked = false;
    updateComponent: GameHotUpdateComponent;


    private index;

    private tagImg: cc.Node;
    private tagSpineNode: cc.Node;
    private grayImg: cc.Node;
    private weihuFlag: cc.Node;
    private waitFlag: cc.Node;

    private tagParent:cc.Node

    private gameIconNode: cc.Node;

    private effectMountNode: cc.Node;

    //支持spine和dragonbones两种格式
    private spine: sp.Skeleton;
    private dragonBones: dragonBones.ArmatureDisplay;

    private tagResMap = {
        1: "hall@effect/gameicon/huobao",
        2: "hall@effect/gameicon/tuijian",
        3: "hall@effect/gameicon/zuixin",
    }

    /**
     * 将子游戏icon渲染层进行分成达到优化drawcall
     * @param parentNode 分层父节点
     */
    moveSpine(parentNode:cc.Node)
     {
        if(!cc.isValid(parentNode)) return
        let spineNode = parentNode.getChildByName("spineNode")

       
        let spine = cc.find(`${this.gameData.prefabName}/effect`,this.effectMountNode)
        if(cc.isValid(spine))
        {
            let pos = Global.UIUtil.convertSameNodePos(this.effectMountNode,spineNode,spine.position)
            spine.setParent(spineNode)
            spine.setPosition(pos)
        }
        let backgroundNode = parentNode.getChildByName("backgroundNode")
        let pos1 = Global.UIUtil.convertSameNodePos(this.node,backgroundNode)
        if(cc.isValid( this.effectMountNode))
        {
            this.effectMountNode.setParent(backgroundNode)
            this.effectMountNode.setPosition(pos1)
        }
       
        let tagStr = `tagNode_${this.gameData.top}`
        let tagParentNode =  parentNode.getChildByName(tagStr)
        let tagNode = cc.find("tag",this.node)

        let pos2 = Global.UIUtil.convertSameNodePos(tagNode,backgroundNode)

        if(cc.isValid( this.tagSpineNode))
        {
            this.tagSpineNode.setParent(tagParentNode)
            this.tagSpineNode.setPosition(pos2)
        }

        let nameParentNode =  parentNode.getChildByName("nameNode")
        let nameNode = cc.find(`${this.gameData.prefabName}/name`,this.effectMountNode)
        let prefabNode = cc.find(`${this.gameData.prefabName}`,this.effectMountNode)

        let pos3 = Global.UIUtil.convertSameNodePos(prefabNode,nameParentNode)

        if(cc.isValid( nameNode))
        {
            nameNode.setParent(nameParentNode)
            nameNode.setPosition(pos3)
        }


    }   

    registerEvent() {
        Global.Event.on(GlobalEvent.UPDATE_SUB_GAME_FAILED, this, this.onUpdateSubGameFailed)
        Global.Event.on(GlobalEvent.UPDATE_SUB_GAME_FINISH, this, this.onUpdateSubGameFinish)
        Global.Event.on(GlobalEvent.UPDATE_SUB_GAME_PERCENT, this, this.onUpdateSubGamePercent)
        Global.Event.on(GlobalEvent.UPDATE_SUB_GAME_STATE, this, this.checkGameUpdateState)
    }

    unRegisterEvent() {
        Global.Event.off(GlobalEvent.UPDATE_SUB_GAME_FAILED, this, this.onUpdateSubGameFailed)
        Global.Event.off(GlobalEvent.UPDATE_SUB_GAME_FINISH, this, this.onUpdateSubGameFinish)
        Global.Event.off(GlobalEvent.UPDATE_SUB_GAME_PERCENT, this, this.onUpdateSubGamePercent)
        Global.Event.off(GlobalEvent.UPDATE_SUB_GAME_STATE, this, this.checkGameUpdateState)
    }

    onUpdateSubGameFailed(gid) {
        
        if (!gid) {
            Logger.error("onUpdateSubGameFailed gid == null")
            return;
        }
        if (!this.gameData) {
            Logger.error("onUpdateSubGameFailed this.gameData == null")
            return;
        }
        if (Number(gid) === this.gameData.game_id) {
            this.needFaildView();
        }
    }
    onUpdateSubGameFinish(gid) {
        if (!gid) {
            return;
        }
        if (!this.gameData) {
            return;
        }
        if (gid === this.gameData.game_id) {
            if(!this.gameIconNode || !this.gameIconNode.isValid)
            {
                return
            }
            this.setNodeAlpha(255)
            //Global.UIHelper.setNodeGray(this.gameIconNode, false, 255, true);
            this.alreadyGameView(true)
        }
    }

    


    onUpdateSubGamePercent(gid, per) {
        if (!gid) {
            return;
        }
        if (!this.gameData) {
            return;
        }
        // Logger.log("onUpdateSubGamePercent  gid = " + gid + " per = " + per)
        if (gid === this.gameData.game_id) {
            this.downloadingView(per)
        }
    }

    protected initView() {
        this.tagImg = cc.find("tag/img", this.node)
        this.tagSpineNode = cc.find("tag/spineNode/spineParent", this.node)
        this.grayImg = cc.find("grayImg", this.node);
        this.weihuFlag = this.grayImg.getChildByName('weihuFlag');
        this.waitFlag = this.grayImg.getChildByName('waitFlag');
        this.spineNode = cc.find("spineNode", this.node)

        this.effectMountNode = this.getChild("iconMountNode");

        this.updateState = cc.find("updateState", this.node)
        this.updateState.active = true;
        this.updateState_download = this.updateState.getChildByName("download");
        this.updateState_waiting = this.updateState.getChildByName("waiting");
        this.updateState_update = this.updateState.getChildByName("update");
        this.updateState_stop = this.updateState.getChildByName("stop");
        this.updateState_loading = this.updateState.getChildByName("loading");
        this.updateState_download.active = false;
        this.updateState_waiting.active = false;
        this.updateState_update.active = false;
        this.updateState_stop.active = false;
        this.updateState_loading.active = false;

        this.registerEvent();
        this.isBtnClick = false;
        // this.node.on(cc.Node.EventType.TOUCH_END, this.onItemClick, this);
        // this.updateState.on(cc.Node.EventType.TOUCH_END, this.onItemClick, this);
    }

    public setServerInfo(gameData, index) {
        this.gameData = gameData;
        this.index = index;
        this.updateTag();
        this.updateGameStatus();
    }

    //设置资源信息
    public async setResInfo(gameRes) {
        return new Promise(async resolve =>{
            this.gameResData = gameRes;
            let name = gameRes.prefabName
            let result = await this.loadGameIcon(name);
            resolve(result)
        })
       
    }

    private loadGameIcon(name) {
        return new Promise((resolve,reject )=> {
            let iconPath = "hall@effect/gameicon/" + name;
            if (this.gameResData.platformIconPath && this.gameResData.platformIconPath != "")
                iconPath = this.gameResData.platformIconPath;
            Global.ResourceManager.releaseHelper.markUsed(iconPath);
            Global.ResourceManager.loadRes(iconPath, (error, prefab) => {
                if (error != null) {
                    Logger.error("加载图标特效异常", iconPath);
                    reject(error)
                }
               if(!cc.isValid(this.node) || !cc.isValid(this.effectMountNode)) return
                let effect = cc.instantiate(prefab) as cc.Node;
                // effect.scale = 0.95;
                this.effectMountNode.addChild(effect);

                effect.position = cc.Vec2.ZERO;
                for (let index = 0; index < effect.childrenCount; index++) {
                    let element = effect.children[index];
                    let component = element.getComponent(BindingButtonEffect)
                    if(!component)
                    {
                        element.addComponent(BindingButtonEffect)
                    }
                    
                }
                this.gameIconNode = effect;
               
                this.spine = effect.getComponentInChildren(sp.Skeleton)
                this.dragonBones = effect.getComponentInChildren(dragonBones.ArmatureDisplay);

                this.gameIconNode.setPosition(0, 0)
                resolve(prefab)
            }, null, null, false, true)
        })

    }



    //tag状态，最新、火爆等
    private updateTag() {
        if (this.gameData.status !== 1) {
            this.tagImg.active = false;
            this.tagSpineNode.active = false;
            return;
        }
        this.tagSpineNode.active = true
        let tagEffPath = "";
        let tagRes = this.tagResMap[this.gameData.top];
        if (tagRes != null) {
            this.tagSpineNode.active = true;
            tagEffPath = tagRes;
            this.tagSpineNode.removeAllChildren();
            this.tagImg.active = false
            Global.ResourceManager.loadRes(tagEffPath, (error, Prefab) => {
                if (error) {
                    return;
                }
                if(!cc.isValid(this.node) || !cc.isValid(this.tagSpineNode)) return
                if (Prefab) {
                    let preTag = cc.instantiate(Prefab);
                    preTag.name = "newTag";
                    let component = this.tagSpineNode.getComponent(BindingButtonEffect)
                    if(!component)
                    {
                        component =  this.tagSpineNode.addComponent(BindingButtonEffect)
                    }
                    let btn = this.node.getComponent(YXButton)
                    if(btn)
                    {
                        btn.setBind(component)
                    }
                    this.tagSpineNode.addChild(preTag);
                    let arr = Global.Setting.SkinConfig.getHallGameListTagOffsetX()
                    preTag.setPosition(cc.v2(arr[0],arr[1]))
                    // preTag.scale = 0.95;
                }
            }, cc.Prefab, null, true)
        }

        let openFlag = this.gameData.top2
        //开启体验场标签
        this.tagImg.active = openFlag == 1;
    }

    //更新游戏状态  开启/敬请期待
    private updateGameStatus() {
        this.gameIconNode.active = true;
        if (this.gameData.status == GameStatue.Open) {
            this.pauseIcon(false)
            this.grayImg.active = false;
            this.checkGameUpdateState();
            //在下载中，从子游戏切到大厅，gameicon 会重新加载，需要重置状态
            let isUpdating = false;
            let gameHotUpdateComp = Global.HotUpdateManager.getHotUpdateGameComp(this.gameData.game_id);
            if (gameHotUpdateComp && !gameHotUpdateComp._updating) {
                this.setNodeAlpha(255)
            }
        }
        else if (this.gameData.status == GameStatue.Soon) {
            this.setNodeAlpha(255 * 0.3)
            //Global.UIHelper.setNodeGray(this.gameIconNode, true, 255 * 0.3, true);
            this.pauseIcon(true)
            this.grayImg.active = true;
            this.weihuFlag.active = false;
            this.waitFlag.active = true;
        }
        else if (this.gameData.status == GameStatue.Maintain) {
            this.pauseIcon(true)
            this.setNodeAlpha(255 * 0.3)
            //Global.UIHelper.setNodeGray(this.gameIconNode, true, 255 * 0.3, true);
            this.grayImg.active = true;
            this.weihuFlag.active = true;
            this.waitFlag.active = false;
        }
    }

    setNodeAlpha(alpha)
    {
        Global.UIHelper.setNodeGray(this.gameIconNode, true, alpha, true);
        let btn = this.node.getComponent(YXButton)
        if(btn && cc.isValid(btn.node))
        {
            let bindObjArr = btn.bindedObject

            if(bindObjArr)
            {
                for (let index = 0; index < bindObjArr.length; index++) {
                    let item = bindObjArr[index];
                    if(item && cc.isValid(item.node))
                    {
                        Global.UIHelper.setNodeGray(item.node, true, alpha, true);
                    }
                }
            }
        }
    }

    private pauseIcon(value) {
        if (this.spine)
            this.spine.timeScale = value ? 0 : 1;
        if (this.dragonBones)
            this.dragonBones.timeScale = value ? 0 : 1;
    }

    private updateDownState() {
        if(cc.sys.isBrowser) return;
        this.updateState_download.active = this.gameUpdateState == GameDownloadStatus.NEVER_DOWNLOAD;
        this.updateState_waiting.active = this.gameUpdateState == GameDownloadStatus.WAIT_DOWNLOAD;
        this.updateState_update.active = this.gameUpdateState == GameDownloadStatus.OLD_VERSION;
        this.updateState_stop.active = this.gameUpdateState == GameDownloadStatus.FAILD;
        this.updateState_loading.active = this.gameUpdateState == GameDownloadStatus.DOWNLOADING;
    }

    checkGameUpdateState(gid = null) {
        if(gid && gid != this.gameData.game_id)
        {
            return
        }
        let gameHotUpdateComp = Global.HotUpdateManager.getHotUpdateGameComp(this.gameData.game_id);
        if (gameHotUpdateComp) {
            if (!gameHotUpdateComp._updating) {
                this.needWaitingView();
            }else {
                if (gameHotUpdateComp._download_percent){
                    this.downloadingView(gameHotUpdateComp._download_percent)
                }else {
                    this.downloadingView(0)
                }
            }
        } else {
            let isGameDownloaded = this.checkDownloaded()
            if(isGameDownloaded){
                this.alreadyGameView();
            }else{
                this.needDownloadView();
            }
            // let nativeVersion = Global.HotUpdateManager.nativeVersions[this.gameData.game_id.toString()] || "0.0.0"
            // // Logger.log("---------gameid nativeVersion ---" + nativeVersion)
            // let newVersion = this.gameData.version;
            // let isGameDownloaded = this.checkDownloaded()
            // if (newVersion != "" ) {
            //     let versionCompareFlag = Global.Toolkit.versionCompare(newVersion, nativeVersion)
            //     let isBackVersionFlag = this.gameData.isBackVersionFlag
            //     if ((versionCompareFlag > 0) || ((versionCompareFlag < 0) && isBackVersionFlag  == 1)) {
            //         if (((versionCompareFlag < 0) && isBackVersionFlag  == 1)){
            //             Logger.log("回滚版本操作 gameID = " + this.gameData.game_id)
            //         }
            //         if (isGameDownloaded) {
            //             // Logger.log("enter needUpdateView")
            //             this.needUpdateView();
            //         } else {
            //             // Logger.log("enter needDownloadView")
            //             this.needDownloadView();
            //         }
            //     }else {
            //         if (isGameDownloaded) {
            //             // Logger.log("enter alreadyGameView 0")
            //             this.alreadyGameView();
            //         }
            //     }
            // } else {
            //     if (isGameDownloaded) {
            //         // Logger.log("enter alreadyGameView 1")
            //         this.alreadyGameView();
            //     }
            // }
        }
    }
    //  -1 没下载过 0 下载成功并且版本是最新  1下载过，版本不是最新 2下载中 3等待下载  4网络问题下载停止
    needDownloadView() {
        this.gameUpdateState = GameDownloadStatus.NEVER_DOWNLOAD
        this.updateDownState();
    }

    needUpdateView() {
        this.gameUpdateState = GameDownloadStatus.OLD_VERSION
        this.updateDownState();
    }

    needWaitingView() {
        this.gameUpdateState = GameDownloadStatus.WAIT_DOWNLOAD;
        this.updateDownState();
    }

    needFaildView() {
        this.gameUpdateState = GameDownloadStatus.FAILD;
        this.updateDownState();
    }

   
    downloadingView(per = 0) {

        if (!this.node || !this.node.isValid) {
            // Logger.log("downloadingView node === null" + per)
            return;
        }

        this.gameUpdateState = GameDownloadStatus.DOWNLOADING;
        this.updateDownState();
        let progress_label = this.updateState_loading.getChildByName("progressLabel")
        let perStr = ""
        if (per) {
            perStr = Math.floor(per * 100) + "%"
        } else {
            perStr = "0%";
        }
        progress_label.getComponent(cc.Label).string = perStr;
        this.UpdateFillange(per)
    }


    UpdateFillange(per) {
        if (!per) {
            per = 0
        }
        let progress_Sprite = this.updateState_loading.getChildByName("RadialProgress")
        let rangeSprite = progress_Sprite.getComponent(cc.Sprite)
        rangeSprite.fillRange = 1 - per
        if (per > 0.99999) {
            rangeSprite.fillRange = 0
        }
        if (!this.gameIconNode || !this.gameIconNode.isValid) {
            Logger.error("UpdateFillange this.gameIconNode.isValid = false")
            return
        }
        let alpha = 255 * 0.3 + (255 * 0.7 * per)
        this.setNodeAlpha(alpha)
        //Global.UIHelper.setNodeGray(this.gameIconNode, true, alpha, true);

    }

    alreadyGameView(isHotBack: boolean = false) {
        Logger.log('游戏已经下载')
        this.gameUpdateState = GameDownloadStatus.NEW_VERSION_SUCCESS
        this.updateDownState();
        Global.HotUpdateManager.gIsGameDownloading[this.gameData.game_id] = false;
        Global.HotUpdateManager.gameChecked[this.gameData.game_id] = false;

    }

    checkDownloaded() {
        if (!cc.sys.isNative) {
            return true;
        }
        else {
            return Global.HotUpdateManager.checkIsGameDownload(this.gameData.game_id)
        }
    }

    public getGameData() {
        return this.gameData;
    }


    private checkMoney() {
        if (this.gameData.checkMoney) {
            if (this.gameData.levels && this.gameData.levels.length == 1) {
                let pointLow = this.gameData.levels[0].PointLow;
                if (Global.PlayerData.point < pointLow) {
                    let limit = Global.Toolkit.formatPointStr(pointLow);
                    let str = "游戏准入" + limit + "金币，请您充值哦！"
                    //Global.UI.fastTip();
                    Global.Toolkit.showMoneyNotEnough(str)
                    return false;
                }
            }
        }
        return true;
    }

    private checkVersion() {
        if (this.gameData.supportVersion && this.gameData.supportVersion > 0) {
            if (!Global.Toolkit.checkVersionSupport(this.gameData.supportVersion, this.gameData.supportIosVersion)) {
                Global.UI.showYesNoBox("版本过旧，请下载新包使用该功能", () => {
                    cc.sys.openURL(Global.Setting.Urls.downLoadUrl);
                })
                return false;
            }
        }
        return true;
    }

    private checkGameCfg() {
        //进游戏前判断是否拉到游戏配置
        if(Game.Control.GAME_DDZ_HJ_ARR[0] == this.gameData.game_id){
            return true;
        }
        if (this.gameData && this.gameData.levels && this.gameData.levels.length > 0) {
            return true;
        }
        return false;
    }

    private enterGame() {
        let self = this;
        let enterFunc = async () => {
            self.reSetGameDownloading();
            if (Global.Setting.needHallChooseRoom && this.gameData.levels.length == 1 && this.gameData.gameType != GameType.PVP) //除了PVP只有一个选场直接进游戏
            {
                let level = this.gameData.levels[0].level || "l0"
                if(!Global.Toolkit.checkMoney(level,this.gameData))
                {
                    return
                }
                Global.Event.event(GlobalEvent.RecordGameListOffsetX);
                Game.Control.curLv = level
                if (self.gameData.levelType == 1) {
                    Game.Control.connnectAndEnterGame(self.gameData.game_id, "l0");
                }
                else {
                    Global.SceneManager.loadGameScene();
                }
                return
            }

            let gid = this.gameData.game_id;
            Game.GamePreloadTool.setup(gid);
            if (Game.GamePreloadTool.checkPreloadBundleExist(gid)){        // 配置了走游戏选场
                await Game.GamePreloadTool.preloadBundle();
                await Game.GamePreloadTool.preloadPrefab(Game.GamePreloadTool.lobbyUIPath);
                Global.UI.show("WndGameLobbyShell", gid);
                return;
            }
            Global.Event.event(GlobalEvent.RecordGameListOffsetX);
            if (self.gameData.levelType == 1) {
                Game.Control.connnectAndEnterGame(self.gameData.game_id, "l0");
            }
            else {
                Global.SceneManager.loadGameScene();
            }
        }

        //进游戏前判断是否拉到游戏配置
        if (!this.checkGameCfg()) {
            //弹框提示游戏没有配置
            Global.UI.showSingleBox("游戏配置没有拉到，请稍等~");
            return;
        }

        if (!this.checkMoney())
            return;

        if (!this.checkVersion())
            return;

        //检查是否需要显示横竖屏切换提示
        if (this.gameData.portraitModel) {
            Global.UI.showPortraitScreenNotice(enterFunc);
        }
        else {
            enterFunc();
        }
    }

    private reSetGameDownloading() {
        let HotUpdateManager = Global.HotUpdateManager
        for (let key in HotUpdateManager.gIsGameDownloading) {
            if (HotUpdateManager.gIsGameDownloading[key]) {
                HotUpdateManager.gIsGameDownloading[key] = false;
            }
        }
    }

    private itemClickWaiting: boolean = false;
    public onItemClick() {
        //防止连续多次点击游戏图标出发多次进入
        if (this.itemClickWaiting) {
            return;
        }
        
        this.itemClickWaiting = true;
        setTimeout(() => {
            this.itemClickWaiting = false;
        }, 1000);

        this.isBtnClick = true;
        if (Global.SceneManager.inGame())
            return;

        Global.HotUpdateManager.CurrentGame = this.gameData.game_id;
        let nativeVersion = Global.HotUpdateManager.getNativeHotUpdateVersion(this.gameData.game_id)
        //// 是否显示  0不 1显示 2待开放  3维护中
        if (this.gameData.status == 2 || this.gameData.status == 3) {
            cc.error("game status = " + this.gameData.status)
            Global.Audio.playAudioSource("hall/sound/coming_soon")
            return;
        }
        Global.Audio.playBtnSound();
        //百盛游戏
        if (this.gameData.gtype === 8){
            if (this.checkVersion())
            {
                let hallModel:HallModel = Global.ModelManager.getModel("HallModel")
                hallModel.requestApplyEnterGame(this.gameData.game_id)
            }
            return;
        }
        //外接web游戏
        if (this.gameData.gameType === 9){
            let hallModel:HallModel = Global.ModelManager.getModel("HallModel")
            hallModel.requestApplyEnterGame(this.gameData.game_id)
            return;
        }
        if (!cc.sys.isNative||this.gameData.isNew) {
            Logger.log("已经更新过一次"+this.gameData.isNew)
            this.enterGame();
            return;
        }
      
        let versionUrl = `${this.gameData.getUpdateUrl()}/${this.gameData.version}/${this.gameData.game_id}/${Global.HotUpdateManager.versionCfgFileName}`;
        Logger.log("这是当前的版本号获取url="+versionUrl)
        Global.HotUpdateManager.getGameVersion(versionUrl).then(data=>{
            let  nativeVersion = Global.HotUpdateManager.getNativeHotUpdateVersion(this.gameData.game_id)
            Logger.log("远程版本="+data.version +"本地当前版本="+nativeVersion)
            this.gameData.native_version = nativeVersion;
            this.gameData.remote_version = data.version;
            if(Global.Toolkit.versionCompare(this.gameData.native_version,data.version) == -1){
                this.needUpdateView();
            }else{
                this.gameData.isNew = true;
                this.enterGame();
                return
            }
            this.checkByGameUpdateState();
        },()=>{
            Global.UI.showSingleBox("配置拉取失败，请检查网络");
        })       
      
    }
    checkByGameUpdateState(){
  //// 1 new 2 下载中 3下载成功  4下载失败
        //// -1 没下载过 0 下载成功并且版本是最新  1下载过，版本不是最新 2下载中 3等待下载 4 下载异常
        switch (this.gameUpdateState) {
            case GameDownloadStatus.OLD_VERSION:
            case GameDownloadStatus.NEVER_DOWNLOAD:
                let gid = Global.HotUpdateManager.getWhichGameIsDowning()
                if (gid) {
                    if (gid == this.gameData.game_id) {
                        this.downloadingView(0)
                    } else {
                        this.needWaitingView();
                        Global.UI.fastTip(this.gameData.name + "已加入下载队列")
                        Global.HotUpdateManager.addHotUpdateGameComp(this.gameData.game_id, this.gameData.version, this.gameData.getUpdateUrl(), this.gameData.remote_version)

                    }
                } else {
                    this.downloadingView(0)
                    Global.HotUpdateManager.addHotUpdateGameComp(this.gameData.game_id, this.gameData.version, this.gameData.getUpdateUrl(), this.gameData.remote_version)
                }
                break;
            case GameDownloadStatus.NEW_VERSION_SUCCESS:
                this.enterGame();
                break;
            case GameDownloadStatus.DOWNLOADING:
                Logger.log("正在下载中")
                break;
            case GameDownloadStatus.WAIT_DOWNLOAD:
                Global.HotUpdateManager.removeHotUpdateGameComp(this.gameData.game_id)
                Global.UI.fastTip(cc.js.formatStr("%s已取消下载",this.gameData.name))
                this.gameUpdateState = GameDownloadStatus.NEVER_DOWNLOAD 
                this.checkGameUpdateState()
                Logger.log("等待下载")
                break;
            case GameDownloadStatus.FAILD:
                Logger.log("下载失败", this.gameData.game_id);
                let f_gid = Global.HotUpdateManager.getWhichGameIsDowning()
                if (f_gid) {
                    if (f_gid == this.gameData.game_id) {
                        this.downloadingView(0)
                    } else {
                        this.needWaitingView();
                        Global.UI.fastTip(this.gameData.name + "已加入下载队列")
                        Global.HotUpdateManager.addHotUpdateGameComp(this.gameData.game_id, this.gameData.version, this.gameData.getUpdateUrl(), this.gameData.isBackVersionFlag,nativeVersion)
                    }
                } else {
                    this.downloadingView(0)
                    Global.HotUpdateManager.addHotUpdateGameComp(this.gameData.game_id, this.gameData.version, this.gameData.getUpdateUrl(), this.gameData.isBackVersionFlag,nativeVersion)
                }
                break;
            default:
                break;
        }
    }
  
    public destroy() {
        this.isBtnClick = false;
        this.unRegisterEvent()
    }

    public releaseGameIcon() {
        if (this.index >= Global.Setting.cachedGameItemCount) {
            let iconPath = "hall/effect/gameicon/" + this.gameResData.prefabName;
            if (this.gameResData.platformIconPath && this.gameResData.platformIconPath != "")
                iconPath = this.gameResData.platformIconPath;
            Global.ResourceManager.releaseCache(iconPath, null);
        }
    }
    onDispose() {
        let tag = this.tagSpineNode.getChildByName("newTag")
        if (tag) {
            tag.removeFromParent()
            tag.destroy()
        }
    }
    protected onClose() {
    }
}