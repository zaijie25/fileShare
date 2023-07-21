import HallFacade from "./MVC/HallFacade";
import HallSection from "./HallSection";
import SceneManager, { SceneType } from "../core/scene/SceneManager";
import LoadingFacade from "../core/loadingMVC/LoadingFacade";
import AppHelper from "../core/tool/AppHelper";
import PlayerInfoModel from "../hallcommon/model/PlayerInfoModel";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;


@ccclass
export default class HallDriver extends cc.Component {

    private hallSectionName = "hallSection";
    private startTime = 0;


    public requireList =[
    ];

    public requireAtlasList =[
    ];

    // 预加载需要动态变换的spine
    public requireGameIconList = [
    ];

    private dependenceCount = 0;
    //加载条节点
    private loadingNode:cc.Node;
    //tips节点
    private tipNode:cc.Node;
    //预加载类型数量
    private DEPENCE_COUNT = 3;

    private slider:cc.ProgressBar;

    //资源是否预加载过
    static PRELOAD_FINISH = false;
    

    //背景图
    private bg:cc.Sprite;

    onLoad() {
        this.loadingNode = cc.find("loading/loadingBar", this.node)
        let bgNode = cc.find("loading/bg", this.node)
        if(bgNode)
            this.bg = bgNode.getComponent(cc.Sprite);
        let silderNode = cc.find( "loading/loadingBar/bar_1_1", this.node)
        let checkNode = cc.find("loading/checkNode",this.node)
        let checkNodeSprite = null
        let infoLabel = null
        if (checkNode){
            checkNodeSprite = checkNode.getComponent(cc.Sprite)
            let infoLabelNode = checkNode.getChildByName("infoLabel")
            if (infoLabelNode){
                infoLabel = infoLabelNode.getComponent(cc.Label)
            }
            
        }
        if(silderNode)
        {
            this.slider = silderNode.getComponent(cc.ProgressBar);
            this.slider.progress = 0;
        }
        this.sceneSetup();
    }

    private sceneSetup() {

        if(window["Global"] == null)
        {
            LoadingFacade.initGlobal();
            Logger.error('Global not init!!!!');
        }
        this.dependenceCount = 0;
        //初始化mvc
        HallFacade.Instance.startUp();
        //初始化section  注册ui  model
        // if (!Global.SectionManager.hasSection(this.hallSectionName)) {
        //     Global.SectionManager.register(this.hallSectionName, new HallSection());
        // }
        // Global.SectionManager.callSectionInit(this.hallSectionName);
        //初始化update驱动  初始化timer
        Global.Component.initDriver();

        
        cc.game.setFrameRate(Global.Setting.FPSConfig);

        Global.UI.initUIRoot(!HallDriver.PRELOAD_FINISH);


        // Global.Audio.playHallBGM();//xiaoc 2019-10-28 背景音乐的播放在下面的函数中处理PlayerInfoModel.InitBgm();
        this.requireAtlasList = Global.Setting.SkinConfig.requireAtlasList;
        this.requireList = Global.Setting.SkinConfig.requireList;
        this.requireGameIconList = Global.Setting.SkinConfig.requireGameIconList;

        if (!HallDriver.PRELOAD_FINISH) {
            Global.ResourceManager.releaseHelper.recordUnusedAsset(this.requireGameIconList, null);
            this.updateNodeAcvite();
            this.startTime = Date.now();
            this.preLoadRes();
            //添加常驻节点   防止部分内置资源被删除
            Global.ResourceManager.loadRes("hall/effect/notDestroy", (error, prefab) => {
                if (prefab) {
                    let node = cc.instantiate(prefab);
                    Global.Persist.saveToPool("keep", node);
                }
            })

            Global.ResourceManager.loadRes("hall/prefabs/ui/ChooseRoom/GameLobbyShellUI", (error, prefab) => {
                if (prefab) {
                    let node = cc.instantiate(prefab);
                    Global.Persist.saveToPool("WndGameLobbyShell", node);
                }
            })
        }
        else {
            this.updateNodeAcvite();
            this.onSceneLoadFinish();
        }
    }



    private updateNodeAcvite()
    {
        //this.loadingNode.active = !HallDriver.PRELOAD_FINISH;
        //this.tipNode.active = HallDriver.PRELOAD_FINISH;
        if (cc.sys.isNative){
            if (this.loadingNode){
                this.loadingNode.active = false;
            }
        }
    }

    private preLoadRes()
    {
        this.dependenceCount = 0;
        Global.ResourceManager.loadBundleRes(Global.customApp.getHallBundleName(),this.requireGameIconList)
        this.beginLoadAltas();
        this.beginLoadDependence();
        this.beginLoadSpine();

    }

    private beginLoadDependence(){
        //显示loading 预加载资源
        if (this.requireList == null || this.requireList.length == 0)
            this.onDependenceLoaded();
        else
            Global.ResourceManager.loadResArr(this.requireList, this.onDependenceLoaded.bind(this), null, null, false, true);
    }

    private beginLoadAltas(){
        //显示loading 预加载资源
        if (this.requireAtlasList == null || this.requireAtlasList.length == 0)
            this.onAltasLoaded();
        else
            Global.ResourceManager.loadAtlasArr(this.requireAtlasList, this.onAltasLoaded.bind(this));
    }

    private beginLoadSpine(){
        //显示loading 预加载spine资源
        if (this.requireGameIconList == null || this.requireGameIconList.length == 0)
        {
            this.onAltasLoaded();
        }
        else
        {
            Global.ResourceManager.loadBundleRes(Global.customApp.getHallBundleName(),this.requireGameIconList, this.onAltasLoaded.bind(this))
        }
            // Global.ResourceManager.loadResArr(this.requireGameIconList, this.onAltasLoaded.bind(this), null, null,false, true);
    }

    private onAltasLoaded() {
        this.dependenceCount++;
        this.checkDependenceAllFinish();
    }

    private onDependenceLoaded() {
        this.dependenceCount++;
        this.checkDependenceAllFinish();
    }

    private checkDependenceAllFinish() {
        if (this.dependenceCount >= this.DEPENCE_COUNT) {
            // Logger.error("loaded", Date.now())
            //关闭loading
            // this.currentScene.onLoaded();
            this.onSceneLoadFinish();
        }
    }


    private onSceneLoadFinish() {
        //开启写日志
        Global.ReportTool.enableRecord();

        HallDriver.PRELOAD_FINISH = true;
        if (Global.SceneManager.sceneType == SceneType.Hall) {
            Global.UI.show("WndHall");
            Global.UI.closeHallLoading();
        }
        else if (Global.SceneManager.sceneType == SceneType.Login) {
            Global.UI.show("WndLogin");
        }

    }
    // update (dt) {}
}
