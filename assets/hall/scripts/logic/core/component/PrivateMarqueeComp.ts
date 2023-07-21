import HallModel from "../../hallcommon/model/HallModel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PrivateMarqueeComp extends cc.Component {
    private textNode: cc.RichText;
    private gameid = 0;
    gameData: any;
    onLoad() {
        this.textNode = cc.find("text", this.node).getComponent(cc.RichText)
        let addNode = cc.find("tuwan_03", this.node);
        addNode.on(cc.Node.EventType.TOUCH_END, this.onOpenGame, this);
        this.updateUseInfo(null)
    }

    updateUseInfo(data) {
        if(data && data.gid != 0){

            let gameInfo = Global.GameData.getGameInfo(data.gid);
            if (!gameInfo || gameInfo.name == null) {
                Logger.error("找不到gameid", data.gid);
                return;
            }
            this.gameid = data.gid;
            let text = "<outline color=#791e02 width=1>哇！玩家<color=#70f0f6>%s</color>太棒了，在<color=#ed0353>%s</color>游戏中一把赢得了<color=#fbed7b>%s</color>元！</outline>";
            let point = Global.Toolkit.formatPoint(data.point);//佣金或者返利数
            var msgStr = cc.js.formatStr(text,data.nickname,data.gname,point);
            this.textNode.string = msgStr;
        }
    }

    //界面销毁
    protected onDestroy() {
    }

    onOpenGame() {
        let gid = this.gameid;
        this.gameData = Global.GameData.getGameInfo(gid);
        Global.HotUpdateManager.CurrentGame = this.gameData.game_id;
        if(Game.Control.GAME_DDZ_HJ_ARR.indexOf(gid) >= 0){
            //斗地主合集
            Global.HotUpdateManager.CurrentGame = "" + Game.Control.GAME_DDZ_HJ_ARR[0];
            Game.Control.curGid = gid;
        }
        if (Global.SceneManager.inGame())
            return;
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
        }
        if(!Global.HotUpdateManager.checkIsGameDownload(gid) && cc.sys.isNative){
            Global.UI.fastTip("未下载游戏");
            return;
        }
        //没有更新游戏
        if(!Global.HotUpdateManager.checkIsGameNewest(gid) && cc.sys.isNative){
            return;
        }
        let self = this;
        let enterFunc = async () => {
            if (Global.Setting.needHallChooseRoom && self.gameData.levels.length == 1 && self.gameData.gameType != 1) //除了PVP只有一个选场直接进游戏
            {
                let level = self.gameData.levels[0].level || "l0"
                if(!Global.Toolkit.checkMoney(level,self.gameData))
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
        if (self.gameData.portraitModel) {
            Global.UI.showPortraitScreenNotice(enterFunc);
        }
        else {
            enterFunc();
        }
    }

    onDisable() {
        
    }
    hideNode() {
        let hide = () => {
            this.node.active = false;
        }
        if (this.node.active) {
            this.node.stopAllActions();
            this.node.opacity = 255;
            var ac = cc.fadeOut(0.5);
            var af = cc.callFunc(() => {
                hide();
                this.node.opacity = 255;
            });
            var seq = cc.sequence(ac, af);
            this.node.runAction(seq);
            return;
        }
    }
    
    showNode(data) {
        this.updateUseInfo(data)
        let show = () => {
            this.node.active = true;
        }
        this.node.y = -500;
        if (this.node) {
            this.node.stopAllActions();
            this.node.opacity = 255;
            var mv = cc.moveTo(0.2, 0, -200);
            var af = cc.callFunc(() => {
                show();
                this.node.opacity = 255;
            });
            var seq = cc.sequence(mv, af);
            this.node.runAction(seq);
            Global.Component.scheduleOnce(() => {
                this.hideNode()
            }, 10);
            return;
        }
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
        if (this.gameData && this.gameData.levels && this.gameData.levels.length > 0) {
            return true;
        }
        return false;
    }
}