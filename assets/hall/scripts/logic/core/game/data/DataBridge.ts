//负责大厅与子游戏数据共享，数据通信
//每加一个属性，需要标注用途，和适用的游戏
export default class DataBridge
{
    //子游戏判断有锁，并且gid与自己相同，则直接进游戏，并且清空锁
    //适用游戏：全部
    public locker:any;


    //负责游戏内消息大厅提示
    // {
    //     "content":123,   //内容
    //     "type": 1,       //类型 1 显示单个按钮 2显示两个按钮
    //     "yFunc":null,    //确定回调
    //     "nFunc":null,    //返回回调
    // }
    public msg:any;

    public fastTipMsg:string;  //tips

    /**负责储存退出子游戏后要显示的界面 防止切场景时序问题 */
    public cacheShow :any

}