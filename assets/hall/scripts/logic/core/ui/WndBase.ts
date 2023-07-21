import EventDispatcher from "../../../framework/event/EventDispatcher";
import ViewBase from "./ViewBase";
import UIAnimComponent from "../component/UIAnimComponent";

export enum LoadingState {
    None = 0,
    Loading = 1,
    Loaded = 2,
}

export enum DestoryType {
    None = 0,   //不销毁资源
    Now = 1,    //关闭界面立即销毁资源
    ChangeScene = 2,    //切场景时清理资源
    Persist = 3 ,//持久化节点
}

export default class WndBase extends ViewBase implements IAnimWnd {
    //加载状态
    public loadingState: LoadingState = LoadingState.None;
    //销毁类型
    public destoryType:DestoryType = DestoryType.ChangeScene;
    //层级
    public layer: string;
    //动画类型
    public animType: string;

    //界面名称
    public name: string;
    //资源路径
    public resPath: string;

    public args: any[] = null;

    //只有popup层有效
    public showBg = true;

    

    //弹窗界面背景
    public commonBg: cc.Node;
    //通用弹窗组件
    public animComp: UIAnimComponent;

    //是否正在播动画
    public isRuningAnim;

    //是否初始化成功（拉取数据）
    protected isInited = false;

    //是否需要先拉拉取数据再显示弹窗
    public isNeedDelay = false;

    //当节点打开切场景的时候，界面不销毁，转移到持久化节点
    public putToPersistWhenVisible = false;


    

    constructor() {
        super();
        this.internalEvent = new EventDispatcher();
        this.onInit();
        this.registToUIManager();
    }

    protected onInit() { }

    protected registToUIManager() {
        Global.UI.registUI(this);
    }


    //界面显示之前调用  负责初始化
    public prepare() { }

    public afterOpen() { }

    public reshow() {
        this.onReshow();
    }

    protected onReshow() { }


    public close() {
        Global.UI.close(this.name);
    }


    public realClose()
    {
        this.resetState()
        this.onClose();
        this.closeAllSubView()
        // this.callAllView("realClose");
    }

    public get isLoaded() {
        return this.loadingState == LoadingState.Loaded;
    }

    public get isLoading() {
        return this.loadingState == LoadingState.Loading;
    }

    public openAnimFinish() { }

    public afterAnimFinish() { }

    public closeAnimFinish() {
        this.active = false;
        if (this.commonBg)
            this.commonBg.active = false;
        this.onCloseAnimFinish();

        if(this.destoryType == DestoryType.Now)
        {

            Global.UI.dispose(this.name)
            if (this.node != null && cc.isValid(this.node)) {
                this.node.removeFromParent(true);
                this.node.destroy();
                this.node = null;
            }
            Global.ResourceManager.releaseCache(this.resPath, null);
            this.loadingState = LoadingState.None;
        }
    }


    public releaseRes()
    {
        if(this.destoryType == DestoryType.ChangeScene)
        {
            Logger.error("release", this.resPath)
            Global.ResourceManager.releaseCache(this.resPath, null);
            this.loadingState = LoadingState.None;
        }
    }


    protected onCloseAnimFinish() {
    }

    public OnDataPrepared() {
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING, this.name)
        if (this.active == true) {
            return
        }
        this.isInited = true
        if (this.isInited &&  this.isNeedDelay ) {
            this.active = true;
            this.animComp.bg = this.commonBg;
            this.animComp.ui = this.node;
            this.animComp.target = this;
            this.animComp.doPopupOpenAnim();
        }
    }

    public resetState()
    {
        this.isInited = false
    }



    //在持久化节点打开，退出游戏时，切场景之前打开
    public onOpenPersist(){

    }
     //在持久化节点关闭，进入游戏时，切场景之后
    public onClosePersist(){

    }

    //在持久化节点下，改变active
    public set activeInPersistNode(value){
        if(this._active == value)
            return;
        this._active = value;
        this.node.active = value;
        if(value){
            this.onOpenPersist()
        } else {
            this.onClosePersist()
        }
    }
}   