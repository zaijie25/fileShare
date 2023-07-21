//客服接口
interface Servicer{

    //初始化客服数据
    initServicerData();
    //接受服务
    acceptService(index:number);

}

//客服公共抽象类
export default abstract class AbsServicer implements Servicer {

    private _name:string[]=[];
    private _info:string[]=[];
    private _type: number;
    private _serKey:string="";
    protected serviceDatas: Array<ServicerDataEntity> = null;

    constructor (serKey:string){
        this._serKey = serKey;
    }

    public initServicerData() :Array<ServicerDataEntity>{
        if(this.serviceDatas==null){
            this.serviceDatas = new Array<ServicerDataEntity>();
        }
        if(this.serviceDatas.length>0){
            return this.serviceDatas;
        }
        let info: any[] = this._info;
        let name :any[] = this._name||[];
        for(let i=0;i<info.length;i++){
            if(info[i].trim()==""||!info[i]){
                continue;
            }
            let entity = new ServicerDataEntity();
            entity.name = name[i];
            entity.info = info[i];
            entity.type = this._type;
            this.serviceDatas.push(entity);
        }
        return this.serviceDatas;
    }

    public acceptService(index:number) {}

    public get name():string[]{
        return this._name;
    }

    public set name(name:string[]){
        this._name = name;
    }

    public get info():string[]{
        return this._info;
    }

    public set info(info:string[]){
        this._info = info;
    }

    public set type(type:number){
        this._type = type;
    }

    public get type():number{
        return this._type;
    }

    public get serKey():string{
        return this._serKey;
    }

    public isEmptyInfo():boolean{
        return (!this._info)||this._info.length==0;
    }


}

export class ServicerDataEntity{
    private _type: number;
    private _info: string[];
    private _name: string[]

    public set info(info:string[]){
        this._info = info;
    }

    public get info():string[]{
        return this._info;
    }

    public get name():string[]{
        return this._name;
    }

    public set name(name:string[]){
        this._name = name;
    }

    public set type(type:number){
        this._type = type;
    }

    public get type():number{
        return this._type;
    }

}