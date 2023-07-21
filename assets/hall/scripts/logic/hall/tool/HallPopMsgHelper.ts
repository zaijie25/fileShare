import { SceneType } from "../../core/scene/SceneManager";

export enum BindAwardUIType{ //弹出AwardUI方式
    onlyBindPoint = 1,  //绑定手机后只有bind_point
    onlyPhonePoint = 2, //绑定手机后只有phone_point
    bindPoint = 3,      //绑定手机后有bind_point,phone_point,但是先弹bind_point
    phonePoint = 4,     //绑定手机后有bind_point,phone_point,弹phone_point
    share = 5,          //分享
    MegePoint           //合服奖励弹窗

}

export enum PopWndName{
    ForceUpdate = 0,
    Spread = 1,
    Mail = 2,
    ActivityCenter = 3,
    MegePoint, //合服奖励弹窗
    BindPhone ,
    BindGiftGet,    //绑定手机后bind_point
    PhoneGiftGet,   //绑定手机后phone_point
    RebateGet,
    // 顺序低即优先级高, 上面是插入式弹窗(弹窗里点开的弹窗) 优先级要比下面的高
    Notice,     
    BindGift
   
    
}

export default class HallPopMsgHelper{
    private static _instance: HallPopMsgHelper = null;
    private msgList = [];
    private lock = false;
    private lockName: number = 0;
    private timer;

    private needPop = true;
    private timeCounter = 0;
    
    public static get Instance(): HallPopMsgHelper {
        if (this._instance == null) {
            this._instance = new HallPopMsgHelper();
            
        }
        return this._instance;
    }


    public static releaseInstance() {
        if (this._instance) {
            this._instance.stopTimer();
            this._instance = null;
        }
    }

    private startTimer()
    {
        this.stopTimer();
        this.timer = setInterval(() => {
            this.update();
        }, 150);
    }

    private stopTimer()
    {
        clearTimeout(this.timer);
    }

    public addMsgList(name: number, func: Function,sort = null){
        if (func){
            let priority = sort || name;
            let msg = {name, func, priority};
            this.msgList.push(msg);
            this.sortMsgList();
            //this.popMsgList();
        }
    }
    
    public sortMsgList(){
        this.msgList.sort((a, b)=>{
            return b.priority - a.priority;
        })
    }

    public popMsgList(){
        if (Global.SceneManager.sceneType !== SceneType.Hall){
            return;
        } 
        if(!this.timer)
        {
            this.startTimer()
        }
        if(this.msgList.length > 0 && !this.lock && !this.lockName){
            let msg = this.msgList[this.msgList.length - 1];    // 消息存在时序问题，可能hallUI还没open, 不能pop掉
            msg.func.call();
        }
    }

    public addLock(name: number){
        this.lockName = name;
        this.lock = true;
    }

    public releaseLock(name: number, isForce: boolean = false){
        if (this.lockName == name || isForce){
            this.msgList = this.msgList.filter((item)=>{
                return item.name != this.lockName;
            })
            this.lock = false;
            this.lockName = 0;
            this.needPop = true;
            // this.popMsgList();
        }
    }

    public update()
    {
        if(!this.needPop || this.msgList.length == 0)
            return;
        this.timeCounter++;
        if(this.timeCounter >= 2)
        {   
            this.needPop = false;
            this.timeCounter = 0;
            this.popMsgList();
        }
        
    }
}