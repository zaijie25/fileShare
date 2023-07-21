import Fsm from "./Fsm";

export default class FsmManager
{
    private fsmList:Fsm[] = [];
    private removeIndexArr:number[] = [];


    public createFsm(name = "")
    {
        let fsm = new Fsm();
        this.fsmList.push(fsm);
        return fsm;
    }

    public onUpdate()
    {
        if(this.fsmList.length == 0)
            return;
        for(let i = 0; i < this.fsmList.length; i++)
        {
            if(this.fsmList[i].isDestroyed)
            {
                this.removeIndexArr.push(i);
                continue;
            }
            this.fsmList[i].onUpdate();
        }

        if(this.removeIndexArr.length > 0)
        {
            for(let i = this.removeIndexArr.length - 1; i >= 0 ; i--)
            {
                this.fsmList.splice(this.removeIndexArr[i], 1);
            }
            this.removeIndexArr.length = 0;
        }
    }
}