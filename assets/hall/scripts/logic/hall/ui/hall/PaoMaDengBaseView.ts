import GlobalEvent from "../../../core/GlobalEvent";
import ViewBase from "../../../core/ui/ViewBase";

export default class PaoMaDengBaseView extends ViewBase {

    private listNode : cc.Node;
    private itemPrefab: cc.Node = null;
    private itemList : Array<cc.RichText> = new Array();
    private itemPool : Array<cc.RichText> = new Array();
    private showCountLimit = 4;
    private curShowCount = 0;

    private getItem(){
        var item = null;
        if(this.itemPool.length > 0){
            item = this.itemPool.pop();
            item.node.setSiblingIndex(-1);

        }else{
            var itemObj = cc.instantiate(this.itemPrefab);
            item = itemObj.getComponent(cc.RichText);
            item.node.setParent(this.listNode);
        }
        item.node.active = true;
        item.node.x = 0;
        this.itemList.push(item);
        return item;
    }

    private recoveryItem( reitem : cc.RichText ){
        for (let index = 0; index < this.itemList.length; index++) {
            const item = this.itemList[index];
            if(item == reitem){
                item.string = "";
                item.node.active = false;
                item.node.stopAllActions();
                this.itemPool.push(item);
                this.itemList.splice(index,1);
                break;
            }
        }
    }

    private clearRecord(){
        for (let index = 0; index < this.itemList.length; index++) {
            const item = this.itemList[index];
            item.string = "";
            item.node.active = false;
            item.node.stopAllActions();
            this.itemPool.push(item);
        }
        this.itemList = [];
    }

    //轮询Timer
    private checkTimer = null;

    //最后显示的消息Item
    private lastMsgItem : cc.RichText = null;

    //消息缓存队列
    private msgDataCacheList = [];
    //消息队列缓存长度限制
    private listLengthLimit = 8;

    //跑马灯基础路程长度
    private boxLength = 590;
    //跑马灯默认路程花费时间
    private baseTime = 3;
    //跑马灯速度
    private baseSpeed = 1;

    protected initView()
    {
        this.listNode = this.getChild("MsgBox");
        this.itemPrefab = this.getChild("MsgBox/PMDMsgItem");
        this.boxLength = this.listNode.width;
        this.baseSpeed = this.boxLength / this.baseTime;
    }

    protected onSubViewShow(){
        this.startTimer();
    }

    protected onSubViewHide(){
        this.stopTimer();
        this.clearRecord();
    }

    //界面销毁
    protected onDispose()
    {
        this.stopTimer();
    }

    protected startTimer(){
        if(this.checkTimer == null){
            this.checkTimer = setInterval(this.checkMsgList.bind(this),100);
        }
    }

    protected stopTimer(){
        if(this.checkTimer){
            clearInterval(this.checkTimer);
            this.checkTimer = null;
        }
    }

    private playAnim(item : cc.RichText ){
        var moveds = item.node.x + item.node.width + this.boxLength;
        var moveTime = moveds / this.baseSpeed;
        var mv = cc.moveTo(moveTime , -(item.node.width + this.boxLength) , 0);
        var mvover = cc.callFunc(function(){
            this.recoveryItem(item);
            this.curShowCount--;
        },this);
        item.node.runAction(cc.sequence(mv,mvover));
        this.curShowCount++;
    }

    /**
     * data ={  game_id: 1007
                game_level: "l0"
                game_rule: "default"
                headimg: "7"
                hitPoint: 5434000
                nickname: "鱼一直下"
        }
     */
    private checkMsgList(){
        try {
            if(this.node == null || !this.node.isValid)
                return;
            if(this.msgDataCacheList.length == 0 || this.curShowCount >= this.showCountLimit) return;
            var data = this.msgDataCacheList.shift();
    
            var startX = 0;
            if(this.lastMsgItem != null ){ //
                startX = this.lastMsgItem.node.x + this.lastMsgItem.node.width + 100;
                startX = Math.max(0,startX);
            }

            //拼接跑马灯文字
            var formatStr = "<color=#ffffff>鸿运当头，恭喜玩家</color>"+
            "<color=#00ff00>%s,</color>" +
            "<color=#ffffff>在</color><color=#00d2ff>%s</color>" +
            "<color=#ffffff>中赢得</color>" +
            "<color=#fff100>%s</color><color=#ffffff>元</color>";
            var msgStr = "";
            if(data.nickname != null){
                msgStr = cc.js.formatStr(formatStr,data.nickname,data.game_id,Global.Toolkit.GetMoneyFormat(data.hitPoint));
            }else{
                msgStr = data.msg;
            }
            //
            this.lastMsgItem = this.getItem();
            this.lastMsgItem.string = msgStr;
            this.lastMsgItem.node.x = startX;
            this.playAnim(this.lastMsgItem);
        } catch (error) {
            this.stopTimer();
            Logger.error(error);
        }
    }

    /**
     * 排序方法,子类可重写
     * @param dataA 
     * @param dataB 
     */
    protected dataSortFunc( dataA : any , dataB : any ){
        return dataA.type - dataB.type;
    }

    /**
     * 添加跑马灯数据
     * @param data {
            msg,
            type,
     * }
     */
    protected addMsgItem( data : any ){
        this.msgDataCacheList.push(data);
        while (this.msgDataCacheList.length > this.listLengthLimit) {
            this.msgDataCacheList.shift()
        }
        this.msgDataCacheList.sort(this.dataSortFunc);
        this.startTimer();
    }
    
}
