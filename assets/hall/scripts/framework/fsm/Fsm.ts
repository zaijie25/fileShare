import FsmState from "./FsmState";

export default class Fsm
{
    public name:string;
    public stateMap = {}
    public currentState:FsmState;
    public isDestroyed = false;

    public get isRunning()
    {
        return this.currentState != null;
    }

    public registState(state:FsmState)
    {
        if(state == null)
            return;
        let key = state.type;
        if(this.stateMap[key] != null)
        {
            Logger.log("重复注册状态机:" + key)
            return;
        }
        this.stateMap[key] = state;
        state.onInit(this);
        this.isDestroyed = false;
    }

    public removeState(key)
    {
        if(!this.hasState(key))
            return;
        let state = this.getState(key);
        if(state == this.currentState)
        {
            Logger.log("正在运行的state不能移除");
            return;
        }
        state.onDestory();
        this.stateMap[key] = null;
    }


    public changeState(key)
    {
        let state = this.getState(key);
        if(state == null)
        {
            Logger.log("找不到状态"); 
            return;
        }
        if(this.currentState != null)
        {
            this.currentState.onLeave();
        }
        this.currentState = state;
        state.onEnter();
    }        


    public start(key)
    {
        if(this.isRunning)
            return;
        let state = this.getState(key);
        if(state == null)
            return;
        this.currentState = state;
        this.currentState.onEnter()
    }


    public getState(key):FsmState
    {
        return this.stateMap[key];
    }

    public hasState(key)
    {
        return this.stateMap[key] != null;
    }


    public onUpdate()
    {
        if(this.currentState == null)
            return;
        this.currentState.onUpdate();
    }

    //发送状态机事件  只有当前状态机响应
    public fireEvent(type, ...args)
    {
        if(this.currentState != null)
        {
            this.currentState.onEvent(type, args);
        }
    }

    public shutDown()
    {
        if(this.currentState != null)
        {
            this.currentState.onLeave();
            this.currentState = null;
        }
        for(let key in this.stateMap)
        {
            this.stateMap[key].onDestory()
        }
        this.stateMap = {};
        this.isDestroyed = true;
    }
}