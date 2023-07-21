/**
 * 游戏的每个阶段(section)会对应不同的场景、config、model和界面,添加Section的目的是让数据模块、配置和View加载更流程化
 */
export default class SectionBase
{
    protected name:string = "";
    protected isInited:boolean = false;

    public get Name() {
        return this.name;
    }

    /**
     * 是否初始化
     */
    public get IsInited() {
        return this.isInited;
    }

    //declare只会调用一次  场景切换不会重复调用
    protected declare()
    {
        if(this.isInited)
            return;
        this.isInited = true;
        this.declareModel();
        this.declareWnd();
    }

    protected declareModel()
    {}

    protected declareWnd()
    {}


    /**
     * 初始化函数,在onCreate()函数后调用
     */
    public init() {
        this.declare();
        this.onInit();
    }

    /**
     * 场景切换后 固定初始化
     */
    public onInit() {
        
    }


}