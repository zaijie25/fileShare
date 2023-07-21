import AbsServicer from "./AbsServicer";
import { OnlineServicer, WxServicer, QqServicer } from "./OuterServicer";
import { AtServicer } from "./InnerServicer";

/*  
   懒汉单例 
   客服工厂 
*/
export default class ServicerFactory{
    // 静态成员instance
    static instance = null;
    public map:Map<string,AbsServicer> = new Map<string,AbsServicer>();

    // 私有构造函数
    private constructor(){}

    public static getInstance(){
        if(ServicerFactory.instance == null){
            ServicerFactory.instance = new ServicerFactory();
        }
        return ServicerFactory.instance;
    }

    public readonly servicerDic = {
        "onlineService": OnlineServicer,
        "wxService": WxServicer,
        "qqService": QqServicer,
        "atService": AtServicer,
    }

    //创建客服实例
    public  createServicerObj(c: string): AbsServicer|null {
        return this.createObj(this.servicerDic[c]);
    }

    //这里用泛型保证类型安全
    private createObj<T extends AbsServicer>(c: new () => T): T|null {
        let d = null;
        try{
            d = new c();
        }catch(e){
            cc.error(e);
        }
        return d;
    }

    //添加客服实例
    public addEntity(key:string,ser:AbsServicer):ServicerFactory{
        this.map.set(key,ser);
        return ServicerFactory.instance;
    }

    //获取客服实例
    public getEntity(key:string):AbsServicer{
        return this.map.get(key);
    }

}