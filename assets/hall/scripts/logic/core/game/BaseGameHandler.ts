//一个handler对应一条协议，只做逻辑处理，内部不保留数据
export default class BaseGameHandler
{

    //判断协议是否需要如队列
    public checkInQueue(msgParam)
    {
        return true;
    }

    public Handle(msgParam)
    {
    }

    //预处理数据 
    public prepare(msg):any
    {
        return null;
    }

    //解析pb
    public decodePb(msg):any
    {
        return null;
    }
}
