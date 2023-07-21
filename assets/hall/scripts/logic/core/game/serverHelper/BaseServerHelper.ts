import GameServer from "../GameServer";

export default class BaseServerHelper
{
    protected server:GameServer;

    constructor(server)
    {
        this.server = server;
        this.onInit();
    }

    protected onInit(){}

    public run(){}

    //GameServer关闭时 清理适用
    public clear()
    {}

    public onUpdate(dt)
    {}

}