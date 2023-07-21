export default class EventHandler
{
    private static _pool:any[] = [];
    private static _gid = 0;
    public caller:any;
    public method:Function;
    public args:[];
    public once:boolean;
    public id:number;

    public setTo(caller, method, args, once)
    {
        EventHandler._gid++;
        this.id = EventHandler._gid;
        this.caller = caller;
        this.method = method;
        this.args = args;
        this.once = once;
        return this;
    }

    constructor(caller, method, args, once)
    {
        this.setTo(caller, method, args, once);
    }


    public clear()
    {
        this.caller = null;
        this.args = null;
        this.method = null;
    }

    public recover()
    {
        if(this.id > 0)
        {
            this.id = 0;
            this.clear();
            EventHandler._pool.push(this);
        }
    }


    public run()
    {
        if(this.method == null)
            return null;
        //防止handler被使用后重新复制  避免被回收
        let oldId = this.id;
        let result = this.method.apply(this.caller, this.args);
        oldId === this.id && this.once && this.recover();
        return result;
    }

    public runWith(data) {
        if (this.method == null) return null;
        let oldId = this.id;
        if (data == null)
            var result = this.method.apply(this.caller, this.args);
        //args 为空  data不是数组
        else if (!this.args && !data.unshift) result= this.method.call(this.caller, data);
        //args不为空
        else if (this.args) result = this.method.apply(this.caller, this.args.concat(data));
        //args 为空 data 为数组
        else result = this.method.apply(this.caller, data);
        oldId === this.id && this.once && this.recover();
        return result;
    }

    public static create(caller, method:Function, args:[] = null, once:Boolean = true)
    {
        if (this._pool.length) return this._pool.pop().setTo(caller, method, args, once);
        return new EventHandler(caller, method, args, once);
    }
}