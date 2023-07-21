import Const from './LoadingConst'
import StartUpCommand from './LoadingStartUpCmd'
import Global from "../Global";
import Game from "../Game";
import ViewSet from "../game/ViewSet";
import { Logger } from "../../../framework/debug/Logger";
import ViewMediator from './LoadingMediator';
import HotUpdateProxy from './HotUpdateProxy';
import PreLoadProxy from './PreLoadProxy';
import PVPSitHelper from "../game/pvp/PvpSitHelper";
import PVPPlayerData from "../game/pvp/PVPPlayerData";
import EventDispatcher from "../../../framework/event/EventDispatcher";
import { NetAppface } from '../net/hall/NetEvent';
import GlobalEvent from '../GlobalEvent';
import AppHelper from '../tool/AppHelper';
import HeadTipsManager from '../tool/HeadTipsManager';
import TaskManager from '../tool/TaskManager';
import AppHotUpdateProxy from './AppHotUpdateProxy';

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingFacade extends puremvc.Facade {
    public manifest: cc.Asset[];
    public static NAME = "LoadingFacade";
    initializeController() {
        super.initializeController();
        this.gameStartUp();
        Global.Event.on(GlobalEvent.DunInitFinish, this, this.onDunInitFinish);
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
    }

    onResume = function () {
        Logger.log("---------LoadingFacade----------onResume---------")
        this.sendNotification(Const.CHCEK_HOTUPDATE_PROGRESS)
    }

    public static initGlobal()
    {
        (<any>window).Global = Global;
        (<any>window).Game = Game;
        (<any>window).Logger = Logger;
        (<any>window).ViewSet = ViewSet;
        (<any>window).PVPSitHelper = PVPSitHelper;
        (<any>window).PVPPlayerData = PVPPlayerData;
        (<any>window).NetAppface = NetAppface;
        (<any>window).EventDispatcher = EventDispatcher;
        (<any>window).GlobalEvent = GlobalEvent;
        (<any>window).HeadTipsManager = HeadTipsManager;
        (<any>window).TaskManager = TaskManager;

        Global.setup();
        Game.setup();
        AppHelper.init();
    }

    //初始化游戏内相关配置
    public gameStartUp() {
        Logger.error("gameStartUp");
        LoadingFacade.initGlobal()
        //初始化section  注册ui  model
        Global.UI.initUIRoot();
        //初始化常驻节点
        Global.Persist.init();
        // if(!Global.SectionManager.hasSection("hallSection"))
        // {
        //     Global.SectionManager.register("hallSection", new HallSection());   
        // }
        // Global.SectionManager.callSectionInit("hallSection");
        // Global.UI.initUIRoot();
        Global.ModuleManager.loadSkinModuleCfg(Global.Setting.SkinConfig.moduleCfg)
        Global.Language.registLanguage("hall/config/language");
        cc.game.setFrameRate(Global.Setting.FPSConfig);
    }
    
    startUp(manifest, node, isStartUpdate, serverType) {
        Global.NativeEvent.Init();
        this.manifest = manifest;
        // Logger.log("--------manifest url -----" + this.manifest.nativeUrl)
        //正式环境下强制热更，后续有不热更需求再更新逻辑
        if(!CC_PREVIEW)
            isStartUpdate = true;
        Global.Setting.isStartHotUpdate = isStartUpdate;
        Global.Setting.serverType = serverType;
        this.registerProxy(new PreLoadProxy(this.manifest[this.manifest.length - 1]))
        this.registerProxy(new AppHotUpdateProxy(this.manifest))
        //this.registerProxy(new HotUpdateProxy(this.manifest))
        this.registerMediator(new ViewMediator(node))
        this.sendNotification(Const.START_UP)

    }

    onDunInitFinish(){
        this.sendNotification(Const.DUN_INIT_FINISH)
    }

    unregisterFacade() {
        this.removeCommand(Const.START_UP)
        this.removeMediator(ViewMediator.NAME)
        //this.removeProxy(HotUpdateProxy.NAME)
        this.removeProxy(AppHotUpdateProxy.NAME)
        Global.Event.off(GlobalEvent.DunInitFinish, this, this.onDunInitFinish);
        cc.game.off(cc.game.EVENT_SHOW, this.onResume, this);
    }
    public static releaseInstance() {
        let instance = LoadingFacade.instanceMap[LoadingFacade.NAME]
        if (instance) {
            instance.unregisterFacade();
            LoadingFacade.removeCore(LoadingFacade.NAME)
        }
        return;
    }


    public static get Instance(): LoadingFacade {
        if (!LoadingFacade.instanceMap[LoadingFacade.NAME])
            LoadingFacade.instanceMap[LoadingFacade.NAME] = new LoadingFacade(LoadingFacade.NAME);

        return <LoadingFacade><any>(LoadingFacade.instanceMap[LoadingFacade.NAME]);
    }
}
