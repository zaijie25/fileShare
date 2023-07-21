//游戏运行时数据  每个游戏自己定制 
//数据挂在Game下面
export default class GameContext 
{
    //session数据
    public session:any;
    //服务器游戏配置
    public serverGameCfg:any
    //自己的座位号
    public selfSrc;

    private dataMap = {}

    
    public set(key: string, value: any) {
        this.dataMap[key] = value;
    }

    public get(key: string) {
        return this.dataMap[key];
    }

    public remove(key: string) {
        this.dataMap[key] = null;
    }

    public getValue<T>(key): T {
        let data = this.dataMap[key];
        if (data == null)
            return null;
        return data as T;
    }

    //读取服务器配置
    public parseServerCfg(cfg)
    {

    }

    //单局结束 数据清理   
    //游戏结束 整个Context会被清空
    public clearByRound()
    {

    }
}