import WndBase, { LoadingState, DestoryType } from "./WndBase";
import ResourceManager from "../../../framework/resource/ResourceManager";
import FastTip from "../../hall/ui/common/FastTip";
import UIAnimComponent from "../component/UIAnimComponent";
import { SceneType } from "../scene/SceneManager";
import BlackBgComp from "../component/BlackBgComp";
import YXButton from "../component/YXButton";
import AppHelper from "../tool/AppHelper";

export default class UIManager {
    //防止子游戏import不了，使用变量的形式，如果有需要就改成enum
    //用layer区分不同的弹窗效果
    public MainLayer = "MainLayer";
    public FullScreenLayer = "FullScreenLayer";
    public PopLayer = "PopLayer";
    public TipsLayer = "TipsLayer";



    private uiRoot: cc.Node;
    private canvasNode: cc.Node;
    //layerName => layerNode
    private layerMap = {};

    //bg模板
    private bgTemplate: cc.Node;

    //string => wndbase
    private windowMap: { [key: string]: WndBase } = {}
    private showWindowList = [];

    private resourceMgr: ResourceManager;


    private fastTipMgr: FastTip;
    /**
     * 当前子游戏内是否有处理大厅messagebox
     */
    private bMessageBoxInGame: boolean = false;

    constructor() {
    }

    public setup(resourceMgr: ResourceManager) {
        this.resourceMgr = resourceMgr;
        this.fastTipMgr = new FastTip();
    }


    //进场景公共操作  @todo  不要放到uiManager
    public enterSceneInit() {
        if (!CC_PREVIEW)
            cc.debug.setDisplayStats(false);
        cc.sys.garbageCollect();

        if (cc.director.getScene().name == "HallScene")
            cc.game.setFrameRate(Global.Setting.HallFPSConfig);
        else
            cc.game.setFrameRate(Global.Setting.FPSConfig);
    }


    //初始化界面
    public initUIRoot(firstEnter = false) {
        this.enterSceneInit();
        //清理上一场景界面
        this.clearAllUIPrefab();
        Global.Persist.setState(false)
        if (!firstEnter) {
            Global.ResourceManager.releaseHelper.clearUnuseAssets()
        }
        else {
            Global.ResourceManager.releaseHelper.adjustByIphone6();
        }
        let canvasNode = cc.find("Canvas");

        if (canvasNode == null) {
            Logger.error("找不到Canvas");
            return;
        }
        this.canvasNode = canvasNode;
        let canvas = canvasNode.getComponent(cc.Canvas);


        // //@todo 根据分辨率判断
        // canvas.fitHeight = true;
        // // canvas.fitWidth = true;
        this.adjuestCanvasScreenStretch(canvas);

        let uiRoot = canvasNode.getChildByName("HUIRoot");
        if (uiRoot == null) {
            uiRoot = new cc.Node("HUIRoot");
            uiRoot.zIndex = 10;
            canvasNode.addChild(uiRoot);
        }
        this.uiRoot = uiRoot;
        this.addUILayer(uiRoot, this.MainLayer);
        this.addUILayer(uiRoot, this.FullScreenLayer);
        this.addUILayer(uiRoot, this.PopLayer)
        this.addUILayer(uiRoot, this.TipsLayer)
        this.loadCommonBg();

        this.fastTipMgr.initTip(this.layerMap[this.TipsLayer]);
    }

    RestorePersistNode() {
        Global.Persist.setState(true);		// debug 大厅选场切场景保留显示时先显示根, 再挂UI, 避免触发一次active
        for (let key in this.windowMap) {
            if (this.windowMap[key]) {
                if (this.windowMap[key].destoryType == DestoryType.Persist) {
                    if (this.windowMap[key].node && this.windowMap[key].node.isValid && this.windowMap[key].active) {
                        Global.Persist.saveToPool(this.windowMap[key].name, this.windowMap[key].node, true);
                    }
                }
            }
        }

        let RestoreNode = ["WndGameLobbyShell"]
        for (let index = 0; index < RestoreNode.length; index++) {
            let key = RestoreNode[index];
            if (key) {
                let restore = this.getWindow(key)
                let flag = restore ? restore.active : false;
                if(!flag) // 只有在有大厅选场的游戏 进入子游戏的情况下 才保留大厅选场显示 防止闪现大厅的问题
                {
                    let tmpNode :cc.Node = Global.Persist.getFromPool(key)
                    if(cc.isValid(tmpNode))
                    {
                        tmpNode.removeFromParent(true)
                        tmpNode.destroy()
                        tmpNode = null
                    }
                    continue
                }
                // else
                // {
                //     Global.Persist.setState(flag)
                // }
            }
        }
    }

    public adjuestCanvasScreenStretch(canvas: cc.Canvas) {
        let size = cc.winSize;
        if (Global.Setting.SystemInfo.orientationLandscape) {
            canvas.designResolution = cc.size(1280, 720);
            let designSize = canvas.designResolution;
            if (size.width / size.height >= designSize.width / designSize.height) {
                canvas.fitHeight = true;
                canvas.fitWidth = false;
            }
            else {
                canvas.fitHeight = true;
                canvas.fitWidth = true;
            }
        } else {
            canvas.designResolution = cc.size(720, 1280);
            canvas.fitHeight = false;
            canvas.fitWidth = true;
        }


    }


    private addUILayer(root: cc.Node, layer: string) {
        let node = root.getChildByName(layer);
        if (node == null) {
            node = new cc.Node(layer);
            root.addChild(node);
        }
        this.layerMap[layer] = node;
    }

    public getLayer(key) {
        return this.layerMap[key];
    }

    //注册UI
    public registUI(wndbase: WndBase) {
        if (this.windowMap[wndbase.name] != null) {
            Logger.error("重复注册UI", wndbase.name);
            return;
        }
        this.windowMap[wndbase.name] = wndbase;
    }



    public getWindow<T extends WndBase>(wndName: string): T {
        if (this.windowMap[wndName] == null) {
            Logger.error("没有注册界面！！！需要先注册", wndName);
            return null;
        }
        let window = this.windowMap[wndName];
        return window as T;
    }


    public show(wndName: string, ...args) {
        if (this.windowMap[wndName] == null) {
            Logger.error("没有注册界面！！！需要先注册", wndName);
            return;
        }
        let window = this.windowMap[wndName] as WndBase;
        window.args = args
        //界面正在加载  只设置active属性
        if (window.isLoading) {
            window.active = true;
            return;
        }
        //已经加载过
        if (window.isLoaded) {
            //界面已经打开  触发onreshow
            if (window.active == true) {
                this.addToTop(window);
                window.reshow();
                return;
            }
            this.openWindowInternal(window);

            return;
        }
        window.active = true;

        window.loadingState = LoadingState.Loading;
        if (window.resPath == null || window.resPath == "") {
            Logger.error("未设置界面资源路径！！！", window.name);
            return;
        }
        if (window.destoryType == DestoryType.Persist) {
            let tmpNode = Global.Persist.getFromPool(window.name)
            if (tmpNode) {
                this.onWindowLoaded(window, null, tmpNode, true);

                return
            }
        }
        this.resourceMgr.loadRes(window.resPath, (error, prefab) => {
            Logger.log("show window", wndName)
            this.onWindowLoaded(window, error, prefab);
        }, null, null, false, true);
    }

    public close(wndName: string) {
        let window = this.getWindow<WndBase>(wndName);
        Logger.log("close wnd", wndName);
        if (window == null || !window.isLoaded || !window.active) {
            Logger.log("-----close " + wndName)
            return;
        }
        //@todo 根据动画类型关闭界面
        this.realClose(window);
    }

    public closeHallLoading() {
        // let loading = cc.Canvas.instance.node.getChildByName("loading");
        // if(loading)
        //     loading.active = false;
    }

    public showHallLoading() {
        // let loading = cc.Canvas.instance.node.getChildByName("loading");
        // if(loading)
        //     loading.active = true;
    }



    public dispose(wndName: string) {
        let window = this.getWindow<WndBase>(wndName);
        if (window == null)
            return;
        if (window.loadingState == LoadingState.None)
            return;
        if (window.destoryType == DestoryType.Persist && window.active) {
            return
        }
        window.loadingState = LoadingState.None;
        window.dispose();

        if (window.node != null && cc.isValid(window.node)) {
            window.node.removeFromParent(true);
            window.node.destroy();
            window.node = null;
        }
        window.releaseRes();
    }


    private onWindowLoaded(window: WndBase, error, prefab, isNode = false) {
        if (error != null) {
            Logger.error("加载UI出错", window.name, error.message);
            Logger.error("msg", JSON.stringify(error));
            if (prefab == null) {
                return;
            }
            // return;
        }
        if (!this.uiRoot.isValid)
            return;
        window.loadingState = LoadingState.Loaded;
        if (window.destoryType == DestoryType.Persist) {
            if (isNode) {
                window.setNode(prefab);
            }
            else {
                let tmpNode = cc.instantiate(prefab)
                window.setNode(tmpNode);
            }
        }
        else {
            window.setNode(cc.instantiate(prefab));
        }

        if (window.isNeedDelay) {
            window.active = false
        }
        AppHelper.afterWindowInit(window.name, window.node, window)
        window.node.active = window.active;
        if (window.commonBg != null && window.commonBg.isValid) {
            window.commonBg.removeFromParent();
            window.commonBg.destroy();
            window.commonBg = null;
        }
        if (this.bgTemplate) {

            window.commonBg = cc.instantiate(this.bgTemplate);

            let comp = Global.UIHelper.safeGetComponent(window.commonBg, "", BlackBgComp);
            comp.window = window;
            if (window.commonBg) {
                let btn = window.commonBg.getComponent(YXButton);
                if (btn == null) {
                    btn = window.commonBg.addComponent(YXButton);
                    btn.transition = null
                }

                window.commonBg.on("click", () => {
                    if (!btn.isClickValid)
                        return;
                    btn.isClickValid = false;
                    btn.scheduleOnce(() => {
                        if (btn.isValid)
                            btn.isClickValid = true;
                    }, 1);
                    this.realClose(window)
                })

            }
        }
        window.animComp = Global.UIHelper.safeGetComponent(window.node, "", UIAnimComponent);
        //防止资源没加载完关闭
        if (window.active || window.isNeedDelay) {
            this.openWindowInternal(window);
        }
    }


    private realClose(window) {
        window.realClose();
        this.removeWindowFromShowList(window);
        this.doCloseAnim(window)
        // this.adjustBg();
    }

    private doCloseAnim(window) {
        if (window.animComp && window.layer == this.PopLayer) {
            window.animComp.doPopupCloseAnim();
        }
        else {
            if (window.commonBg) {
                window.commonBg.active = false;
                window.active = false;
            }
        }

    }

    //调整层级
    private addToTop(window: WndBase) {
        if (!window.isLoaded)
            return;
        let layerView = this.layerMap[window.layer]
        if (layerView == null) {
            layerView = this.layerMap[this.PopLayer];
        }

        if (!window.node.isValid) {
            this.dispose(window.name);
            return;
        }

        if (layerView == null || !layerView.isValid) {
            return;
        }
        window.node.setParent(null);
        if (window.layer == this.PopLayer && window.showBg && window.commonBg) {
            // window.commonBg.active = true;
            window.commonBg.removeFromParent(false);
            layerView.addChild(window.commonBg);
        }
        layerView.addChild(window.node);
    }



    private openWindowInternal(window: WndBase) {
        if (this.showWindowList.indexOf(window) > -1) {
            Logger.error("!!!! 重复add window", window)
        }
        this.showWindowList.push(window);
        this.addToTop(window);

        if (window.isNeedDelay) {
            window.tryOpen(window.args);
            window.animComp.bg = window.commonBg;
            window.animComp.ui = window.node;
            window.animComp.target = window;
        }
        else {
            window.active = true;
            window.open(window.args);
            this.openWindowByLayer(window);
        }


    }




    private openWindowByLayer(window: WndBase) {

        if (window.layer == this.PopLayer) {
            window.active = true;
            window.animComp.bg = window.commonBg;
            window.animComp.ui = window.node;
            window.animComp.target = window;
            window.animComp.doPopupOpenAnim();
        }
        else if (window.layer == this.FullScreenLayer) {
            // window.active = true;
            window.node.opacity = 1;
            Global.Component.frameEnd(() => {
                window.node.opacity = 255
                window.afterOpen();
            });
        }
        else {
            window.active = true;
        }
    }


    private removeWindowFromShowList(window: WndBase) {
        for (let i = this.showWindowList.length - 1; i >= 0; i--) {
            if (this.showWindowList[i] == window) {
                this.showWindowList.splice(i, 1);
            }
        }
    }

    private loadCommonBg() {
        this.resourceMgr.loadRes("hall/prefabs/ui/CommonBg", (error, prefab) => {
            if (error != null) {
                Logger.error("hall/prefabs/ui/CommonBg  加载失败");
                return;
            }
            this.bgTemplate = cc.instantiate(prefab);
            this.bgTemplate.active = false
            let widget = this.bgTemplate.getComponent(cc.Widget);
            if (widget) {
                widget.target = this.canvasNode;
            }
            // this.bgTemplate.addChild(bg);
        })
    }


    public clearAllUIPrefab() {
        for (let key in this.windowMap) {
            this.dispose(key);
        }
        if (this.bgTemplate && cc.isValid(this.bgTemplate)) {
            this.bgTemplate.destroy();
            this.bgTemplate = null;
        }
        this.showWindowList = []

        this.fastTipMgr.clearAll();
    }

    public closeAllUIPrefab(ignoreMainLayer = false) {
        this.showHallLoading();

        for (let i = this.showWindowList.length - 1; i >= 0; i--) {

            if (this.showWindowList[i] == null) {
                Logger.error("showWindowList[i] == null ~!!!!!", i);
            }
            else {
                if (this.showWindowList[i].layer == this.MainLayer && ignoreMainLayer
                    || (this.showWindowList[i].layer == this.FullScreenLayer && ignoreMainLayer))//grace 2020 3.19 大厅跟随选场 切场景不强制关闭选场界面 防止闪现大厅的问题
                {
                    continue;
                }
                if(this.showWindowList[i].name == "WndNetWaiting")
                {
                    continue
                }
                this.showWindowList[i].close();
            }
        }
    }


    private scaleAnim(window: WndBase) {
        window.node.scale = 0.4;
        window.node.runAction(cc.scaleTo(0.2, 1).easing(cc.easeBackOut()));
    }


    public onUpdate(dt) {
        this.fastTipMgr.onUpdate(dt);
    }


    //-------------messagebox接口------------------------------------------------
    /**
     * 带警报Icon的提示弹窗
     * @param content 显示文本
     * @param callbackY 确定回调
     * @param callbackN 取消或者关闭回调
     */
    public showAlertBox(content: string, callbackY?: Function, callbackN?: Function, autoClose = true, autoReleaseFunc = true) {
        this.show("WndMessageBox", content, 2, callbackY, callbackN, autoClose, autoReleaseFunc, true);
    }
    /**
     * 只有确定按钮的提示弹窗
     * @param content 显示文本
     * @param callbackY 确定回调
     * @param callbackN 取消或者关闭回调
     */
    public showSingleBox(content: string, callbackY?: Function, callbackN?: Function, autoClose = true, autoReleaseFunc = true) {
        if (Global.SceneManager.sceneType == SceneType.Game) {
            if (this.bMessageBoxInGame) {
                var objArr = [content, 2, callbackY, callbackN, autoClose, autoReleaseFunc];
                Game.Event.event(Game.EVENT_MESSAGE_BOX, objArr);
                return;
            }
        }
        this.show("WndMessageBox", content, 2, callbackY, callbackN, autoClose, autoReleaseFunc);
    }

    public showYesNoBox(content: string, callbackY?: Function, callbackN?: Function, autoClose = true) {
        if (Global.SceneManager.sceneType == SceneType.Game) {
            if (this.bMessageBoxInGame) {
                var objArr = [content, 1, callbackY, callbackN, autoClose];
                Game.Event.event(Game.EVENT_MESSAGE_BOX, objArr);
                return;
            }
        }
        this.show("WndMessageBox", content, 1, callbackY, callbackN, autoClose);
    }



    /**
     * 设置是否在子游戏内处理大厅messagebox
     * @param bMessageBox 
     */
    public SetMessageBoxInGame(bMessageBox: boolean) {
        this.bMessageBoxInGame = bMessageBox;
    }


    //---------------------------------------------------------------------------
    /**
     * 通用tips  支持富文本
     * @param msg 
     */
    public fastTip(msg) {
        this.fastTipMgr.show(msg);
    }

    /**
     * 显示横竖屏切换提示UI
     * @param compeleteCallBack 提示播放完以后的回调
     * @param showTime 提示显示时长(单位:秒)
     */
    public showPortraitScreenNotice(compeleteCallBack: Function, showTime?: number) {
        // Logger.error("showPortraitScreenNotice() called!!!");
        this.show("WndScreenPortraitNotice", compeleteCallBack, showTime);
    }
}