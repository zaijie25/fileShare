import AppHelper from "../tool/AppHelper";
import PoolBase from "../tool/PoolBase";
import PaoMaDengItem from "./PaoMaDengItem";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

/**跑马灯通用组件 */
@ccclass
export default class PaoMaDengCompNew extends cc.Component {

  
    /**
     * 根节点，无消息时隐藏
     */
    rootNode: cc.Node = null;

    private itemPool:PaoMaDengItemPool = null
    private nodeList = []
    private copyNode:cc.Node
    private nodePoolLen:number = 3
    private poolNode:cc.Node
    private startPos = cc.v2(1170,260)

    private currentUsedPaoMaDeng = []

    public initNode(poolCount)
    {
        this.nodePoolLen = poolCount
        this.copyNode = this.node.getChildByName("PaoMaDengBoxItem")
        this.poolNode = this.node.getChildByName("poolNode")
        if(!cc.isValid(this.copyNode))
        {
            return
        }
        this.copyNode.active = false
        this.itemPool = new PaoMaDengItemPool(this.copyNode)
        for (let index = 0; index < this.nodePoolLen; index++) {
            let item:cc.Node = this.itemPool.getItem()   
            if(cc.isValid(item))
            {
                item.setPosition(this.startPos)
                this.poolNode.addChild(item)
                this.nodeList.push(item)
            }
        }
        this.itemPool.recycleAll(this.nodeList)

    }

    onLoad()
    {
        cc.game.on(cc.game.EVENT_HIDE, this.onHide, this);
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
    }


    private onHide()
    {
        this.stopTimer();
        this.pause()
    }

    private onResume()
    {
        this.startTimer();
        this.resume()
    }
    
    /**
     * 
     * @param bAddDefaultMsg 是否添加默认跑马灯
     */
    run(bAddDefaultMsg)
    {
        if(bAddDefaultMsg)
        {
            this.addDefautMsg()
        }
        this.startTimer();

      

    }
    private getPaoMaDengItem(msg)
    {

        let item:cc.Node = this.itemPool.getItem()
        if(cc.isValid(item))
        {
            
            let itemComp = item.getComponent(PaoMaDengItem)
            this.currentUsedPaoMaDeng.push(itemComp)
            let callback = ()=>{
                let itemNode = this.currentUsedPaoMaDeng.shift()
                itemNode.recoveryItem(itemNode.playNode)
                this.itemPool.recycleItem(itemNode.node)

            }
            if(itemComp)
            {
                let currentRunnig = this.getCurrentRunning()
                this.currentUsedPaoMaDeng.forEach(element => {
                    if(element.isPlaying && currentRunnig >= this.nodePoolLen -1)
                    {
                        element.moveUp(callback)
                    }
                    
                });
                itemComp.node.active = true
                itemComp.run(msg,currentRunnig,this.nodePoolLen -1)
            }
        }
    }

    /**
     * 获取当前正在使用的跑马灯数量
     */
    private getCurrentRunning()
    {
        let count = 0
        this.currentUsedPaoMaDeng.forEach(element => {
            if(element.isPlaying)
            {
                count += 1
            }
            
        });

        return count

    }



  
    //轮询Timer
    private checkTimer = null;

    //消息缓存队列
    private msgDataCacheList = [];
    //消息队列缓存长度限制
    private listLengthLimit = 8;

    //所有优先级的总长度
    private totalLenghLimit = 10;

    //跑马灯遮罩宽度
    private boxLength = 600;
    //跑马灯速度
    private baseSpeed = 120;


    //界面销毁
    protected onDestroy() {
        this.stopTimer();
        if (this.itemPool)
            this.itemPool.resetPool()
        this.nodeList = [];
        this.currentUsedPaoMaDeng = []
        cc.game.off(cc.game.EVENT_HIDE, this.onHide, this);
        cc.game.off(cc.game.EVENT_SHOW, this.onResume, this);
    }

    onEnable() {
        this.startTimer();
    }

    onDisable() {
        this.reset()
        this.stopTimer();
    }



    startTimer() {
        if (this.checkTimer == null) {
            this.checkTimer = setInterval(this.checkMsgList.bind(this), 1000);

            Global.Event.on(GlobalEvent.MARQUEESCROLL_COMMON, this, this.addMsgData);
            Global.Event.on(GlobalEvent.MARQUEESCROLL_BIGWINNER, this, this.addMsgData);
            Global.Event.on(GlobalEvent.MARQUEESCROLL_VIP, this, this.addPriorityMsgData);
            Global.Event.on(GlobalEvent.MARQUEESCROLL_COMMI, this, this.addPriorityMsgData);
        }
    }

    stopTimer() {
        if (this.checkTimer) {
            Global.Event.off(GlobalEvent.MARQUEESCROLL_COMMON, this, this.addMsgData);
            Global.Event.off(GlobalEvent.MARQUEESCROLL_BIGWINNER, this, this.addMsgData);
            Global.Event.off(GlobalEvent.MARQUEESCROLL_VIP, this, this.addPriorityMsgData);
            Global.Event.off(GlobalEvent.MARQUEESCROLL_COMMI, this, this.addPriorityMsgData);

            clearInterval(this.checkTimer);
            this.checkTimer = null;
        }
    }
    
    addPriorityMsgData(data) {
        if(this.node == null || !this.node.isValid)
        {
            this.stopTimer();
            return;
        }
        //缓存数量大于10 任何消息都丢
        if(this.msgDataCacheList.length >= this.totalLenghLimit)
        {
            this.msgDataCacheList.pop()
            this.msgDataCacheList.unshift(data.data)
            return;
        }
        this.msgDataCacheList.unshift(data.data)

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
    private checkMsgList() {
        try {
            if (!this.node || !this.node.isValid)
                return;
          
            if (this.msgDataCacheList.length == 0) return;
            var data = this.msgDataCacheList.shift();
            this.getPaoMaDengItem(data);
           
        } catch (error) {
            //this.stopTimer();
            Logger.error(error);
        }
    }

    private pause()
    {
        this.nodeList.forEach((item)=>{
            let paomadengItem = item.getComponent(PaoMaDengItem)
            if(paomadengItem && cc.isValid(paomadengItem.node))
            {
                paomadengItem.node.pauseAllActions()
            }
        })
    }

    private resume()
    {
        this.nodeList.forEach((item)=>{
            let paomadengItem = item.getComponent(PaoMaDengItem)
            if(paomadengItem && cc.isValid(paomadengItem.node))
            {
                paomadengItem.node.resumeAllActions()
            }
        })
    }


    private reset() {
        this.currentUsedPaoMaDeng = []
        this.nodeList.forEach((item)=>{
            let paomadengItem = item.getComponent(PaoMaDengItem)
            if(paomadengItem)
            {
                paomadengItem.recoveryItem(paomadengItem.playNode)
                this.itemPool.recycleItem(paomadengItem.node)
            }
        })
    }

    /**
     * 排序方法,子类可重写
     * @param dataA 
     * @param dataB 
     */
    protected dataSortFunc(dataA: any, dataB: any) {
        return dataA.type - dataB.type;
    }

    /**
     * 添加跑马灯数据
     * @param data {
            msg,
            type,
     * }
     */
    protected addMsgItem(data: any) {
        if(this.node == null || !this.node.isValid)
        {
            this.stopTimer();
            return;
        }


        //缓存数量大于10 任何消息都丢
        if(this.msgDataCacheList.length >= this.totalLenghLimit)
        {
            return;
        }

        //当数据大于8时，优先插入高优先级数据
        if(this.msgDataCacheList.length >= this.listLengthLimit)
        {
            if(data.clientPriority != null && data.clientPriority == 0 && data.nickname != null)
            {
                return;
            }
        }

        this.msgDataCacheList.push(data);
    }

    public addDefautMsg() {
        let msgList = [
            { msg: PaoMaDengMsgTemp.Welcome, type: 1 },
            { msg: PaoMaDengMsgTemp.TipBadGame, type: 1 },
            { msg: PaoMaDengMsgTemp.NoWallow, type: 1 },
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
    private addMsgData(msg: any) {
        if(msg.data.game_id)
        {
            let gameInfo = Global.GameData.getGameInfo(msg.data.game_id);
            if (gameInfo.status != 1) {
                return
            }
            if (!gameInfo || gameInfo.name == null) {
                Logger.error("找不到gameid", msg.data.game_id);
                return;
            }
        }
        this.addMsgItem(msg.data);
    }



}
class PaoMaDengItemPool extends PoolBase{
    constructor(private copyNode: cc.Node){
        super();
    }
    protected createItem(){
        return cc.instantiate(this.copyNode);
    }

    protected resetItem(node: cc.Node){
        node.stopAllActions()
        node.active = false;
    }
    public recycleAll(arr: Array<any>)
    {
        super.recycleAll(arr)
        arr.forEach(ele => {
            this.resetItem(ele);
        });

    }
}

export enum PaoMaDengMsgTemp{
    Welcome = "尊敬的玩家，欢迎进入游戏大厅！",
    TipBadGame = "抵制不良游戏，拒绝盗版游戏，注意自身保护，谨防上当受骗",
    NoWallow = "适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活",
}
