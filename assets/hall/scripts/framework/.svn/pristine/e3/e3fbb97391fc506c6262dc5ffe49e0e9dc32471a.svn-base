import EventDispatcher from "../event/EventDispatcher";

/**
 * 所有数据模块的基类,
 * 注意: 新建的数据模块请在onInit()函数中指定数据模块的名字, 格式: this._name = "ModelBase";
 */
export default class ModelBase extends EventDispatcher
{
    //模块名字
    protected name:string;

    constructor() {
        super()
        this.name = "ModelBase";
        this.init();

        Global.ModelManager.registerModel(this);
    }

    /**
     * 初始化,创建时调用
     */
    protected init() {
        this.onInit();
    }

    /**
     * get 方法获取模块名
     */
    public get Name()
    {
        return this.name;
    }

    /**
     * 清理数据
     */
    public clear() {
        this.onClear();
    }

    /**
     * 数据模块销毁
     */
    public destroy() {
        this.onDestroy();
    }

    /**
     * 初始化时的回调
     * 注意:请在onInit()中给name赋值
     */
    protected onInit() {
        //this.name = "ModelBase";
    }

    /**
     * 数据清理时的回调
     */
    protected onClear() {

    }

    /**
     * 数据模块销毁时的回调
     */
    protected onDestroy() {

    }
}