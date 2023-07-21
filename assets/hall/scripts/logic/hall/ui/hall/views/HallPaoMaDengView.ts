import ViewBase from "../../../../core/ui/ViewBase";
import PaoMaDengBaseView from "../PaoMaDengBaseView";
import GlobalEvent from "../../../../core/GlobalEvent";

export default class HallPaoMaDengView extends PaoMaDengBaseView {

    protected onOpen(){
        super.onOpen();
        this.addDefautMsg();
        Global.Event.on(GlobalEvent.MARQUEESCROLL_COMMON,this,this.addMsgData);
        Global.Event.on(GlobalEvent.MARQUEESCROLL_BIGWINNER,this,this.addMsgData);
    }

    protected onClose(){
        Global.Event.off(GlobalEvent.MARQUEESCROLL_COMMON,this,this.addMsgData);
        Global.Event.off(GlobalEvent.MARQUEESCROLL_BIGWINNER,this,this.addMsgData);
        super.onClose();
    }

    //界面销毁
    protected onDispose()
    {
        Global.Event.off(GlobalEvent.MARQUEESCROLL_COMMON,this,this.addMsgData);
        Global.Event.off(GlobalEvent.MARQUEESCROLL_BIGWINNER,this,this.addMsgData);
        super.onDispose();
    }


    protected addDefautMsg(){
        let msgList = [
            { msg: "<color=#00d2FF>尊敬的玩家，欢迎进入游戏大厅！</color>", type: 1 },
            { msg: "<color=#f9a314>抵制不良游戏，拒绝盗版游戏，注意自身保护，谨防上当受骗</color>", type: 1 },
            { msg: "<color=#f9a314>适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活</color>", type: 1 },
        ]
        for (let index = 0; index < msgList.length; index++) {
            const data = msgList[index];
            this.addMsgItem(data);
        }
    }

    /**
     * @param msg {
                type : 20001,
                data : {
                    type : 0 , 
                    msg : "<color=#FF0000>TestData!!!!!!!!!!!!!!</color>"
                },
            }
     */
    private addMsgData( msg : any){
        this.addMsgItem( msg.data );
    }
   
}
