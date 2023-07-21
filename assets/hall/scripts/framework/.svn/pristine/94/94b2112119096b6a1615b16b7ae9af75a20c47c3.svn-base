import Fsm from "./Fsm";

export default class FsmState
{
    public type:string;
    public fsm:Fsm;
    public onInit(fsm:Fsm)
    {
        this.fsm = fsm;
    }
    public onEnter(){}
    public onLeave(){}
    public onDestory(){}

    public onUpdate(){}

    public changeStage(type:string)
    {
        this.fsm.changeState(type);
    }

    //暂时不做事件注册   如果监听的事件多了 再考虑添加
    public onEvent(eventType, argList)
    {
    }
}
