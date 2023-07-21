import ModelBase from "../../../framework/model/ModelBase";



export default class BindingGiftModel extends ModelBase{
    protected onInit(){

    }
    private _data: any;
    public get data(){
        return this._data
    }

    private _Status:boolean 

    private _BindAwardNum:number = 0
    public get Status()
    {
        return this._Status
    }

    public SetStatus(status)
    {
        this._Status = status
    }

    public set BindAwardNum(num:number)
    {
        this._BindAwardNum = num
    }

    public get BindAwardNum()
    {
        return this._BindAwardNum
    }

    public get Name()
    {
        return "BindingGiftModel";
    }
    
    public clear()
    {
        this.SetStatus(false)
    }
}