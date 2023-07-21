import { CommiType, PayType } from "./PaoMaDengComp";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PaoMaDengItem extends cc.Component {

    //当前播放的跑马灯节点
    public playNode: cc.Node = null;

    public isPlaying = false


    public vipStr:any = {
        "content1":"恭喜玩家",
        "content2":"通过公司入款充值获得",
        "content3":"",
        "content4":"元返利！",
    }

    public delegeteStr:any = {
        "content1":"恭喜玩家",
        "content2":"领取了",
        "content3":"",
        "content4":"代理佣金!",
    }


    public gameStr:any = {
        "content1":"哇!玩家",
        "content2":"太棒了,在",
        "content3":"游戏中一把赢了",
        "content4":"元!",
    }


    private greenNode :cc.Node = null

    private blueNode :cc.Node = null

    private yellowNode :cc.Node = null

    private nameLabel : cc.Label = null

    private nameLabel1 : cc.Label = null

    private gameLabel : cc.Label = null

    private pointLabel : cc.Label = null
    private pointLabel1 : cc.Label = null

    private content1 : cc.Label = null
    private content2 : cc.Label = null
    private content3 : cc.Label = null
    private content4 : cc.Label = null


    private content5 : cc.Label = null
    private content6 : cc.Label = null
    private content7 : cc.Label = null
    private content8 : cc.Label = null


    private runType = -1



    //跑马灯遮罩宽度
    private boxLength = 669;
    //跑马灯速度
    private baseSpeed = 120;
    //轮询Timer
    private checkTimer = null;

    private defautLabel :cc.Label = null
    private combineNode1 :cc.Node = null
    private combineNode2 :cc.Node = null

    /**
     * 起始运动位置
     */
    private startPos = cc.v2(1170,340)

    private bottmStartPos = cc.v2(1170,260)

    /**
     * 中心位置
     */
    private centerPos = cc.v2(270,260)
    private endPos = cc.v2(270,360)
    onLoad()
    {
        this.playNode = cc.find("MsgBox/itemLayOut",this.node)
        this.defautLabel = cc.find("defautLabel",this.playNode).getComponent(cc.Label)
        this.combineNode1 = cc.find("combineNode1",this.playNode)
        this.greenNode = cc.find("greenNode",this.playNode)
        this.blueNode = cc.find("blueNode",this.playNode)
        this.yellowNode = cc.find("yellowNode",this.playNode)
        this.content1 = cc.find("content1",this.combineNode1).getComponent(cc.Label)
        this.content2 = cc.find("content2",this.combineNode1).getComponent(cc.Label)
        this.content3 = cc.find("content3",this.combineNode1).getComponent(cc.Label)
        this.content4 = cc.find("content4",this.combineNode1).getComponent(cc.Label)
        this.gameLabel = cc.find("game",this.combineNode1).getComponent(cc.Label)
        this.nameLabel = cc.find("name",this.combineNode1).getComponent(cc.Label)
        this.pointLabel = cc.find("point",this.combineNode1).getComponent(cc.Label)
        this.combineNode2 = cc.find("combineNode2",this.playNode)
        this.content5 = cc.find("content1",this.combineNode2).getComponent(cc.Label)
        this.content6 = cc.find("content2",this.combineNode2).getComponent(cc.Label)
        this.content7 = cc.find("content3",this.combineNode2).getComponent(cc.Label)
        this.content8 = cc.find("content4",this.combineNode2).getComponent(cc.Label)
        this.nameLabel1 = cc.find("name",this.combineNode2).getComponent(cc.Label)
        this.pointLabel1 = cc.find("point",this.combineNode2).getComponent(cc.Label)
    }

    initComponent()
    {
        // this.playNode = cc.find("MsgBox/itemLayOut",this.node)
        // this.defautLabel = cc.find("defautLabel",this.playNode).getComponent(cc.Label)
        // this.combineNode1 = cc.find("combineNode1",this.playNode)
        // this.content1 = cc.find("content1",this.combineNode1).getComponent(cc.Label)
        // this.content2 = cc.find("content2",this.combineNode1).getComponent(cc.Label)
        // this.content3 = cc.find("content3",this.combineNode1).getComponent(cc.Label)
        // this.content4 = cc.find("content4",this.combineNode1).getComponent(cc.Label)
        // this.gameLabel = cc.find("game",this.combineNode1).getComponent(cc.Label)
        // this.nameLabel = cc.find("name",this.combineNode1).getComponent(cc.Label)
        // this.pointLabel = cc.find("point",this.combineNode1).getComponent(cc.Label)
        // this.combineNode2 = cc.find("combineNode2",this.playNode)
        // this.content5 = cc.find("content1",this.combineNode2).getComponent(cc.Label)
        // this.content6 = cc.find("content2",this.combineNode2).getComponent(cc.Label)
        // this.content7 = cc.find("content3",this.combineNode2).getComponent(cc.Label)
        // this.content8 = cc.find("content4",this.combineNode2).getComponent(cc.Label)
        // this.nameLabel1 = cc.find("name",this.combineNode2).getComponent(cc.Label)
        // this.pointLabel1 = cc.find("point",this.combineNode2).getComponent(cc.Label)
    }
    
    /**
     * 
     * @param data 填充数据
     */
    init(data)
    {
        //this.reset()
        let gameInfo = Global.GameData.getGameInfo(data.game_id);
       
        // console.log("gameInfo.name",gameInfo.name)
        let gameName = gameInfo.name;//游戏名
        let profit = data.hitPoint;//点数
        let point = Global.Toolkit.GetMoneyFormat(profit);
        if (data.nickname != null) {
            if(data.game_id) //有game_id为大赢家消息
            {
                this.runType = 0 //默认大赢家消息
                if (!gameInfo || gameInfo.name == null) {
                    Logger.error("找不到gameid", data.game_id);
                    return;
                }
                if (gameInfo.status != 1) {
                    return
                }
                this.defautLabel.node.active = false
                this.combineNode1.active = true
                this.combineNode2.active = false
               if(cc.isValid(this.combineNode1))
               {
                   let usedWide = 0
                   if(cc.isValid(this.content1))
                   {
                        this.content1.string = this.gameStr["content1"]
                        this.content1._forceUpdateRenderData()
                        this.content1.node.setPosition(cc.v2(0,0))
                        usedWide += this.content1.node.width
                   }
                   if(cc.isValid(this.nameLabel))
                   {
                        this.nameLabel.string = data.nickname
                        this.nameLabel._forceUpdateRenderData()
                        this.nameLabel.node.setPosition(cc.v2(usedWide,0))
                        usedWide += this.nameLabel.node.width
                   }
                   if(cc.isValid(this.content2))
                   {
                        this.content2.string = this.gameStr["content2"]
                        this.content2._forceUpdateRenderData()
                        this.content2.node.setPosition(cc.v2(usedWide,0))
                        usedWide += this.content2.node.width
                   }
                   if(cc.isValid(this.gameLabel))
                   {
                        this.gameLabel.string = gameName
                        this.gameLabel._forceUpdateRenderData()
                        this.gameLabel.node.setPosition(cc.v2(usedWide,0))
                        usedWide += this.gameLabel.node.width
                   }
                   if(cc.isValid(this.content3))
                   {
                        this.content3.string = this.gameStr["content3"]
                        this.content3._forceUpdateRenderData()
                        this.content3.node.setPosition(cc.v2(usedWide,0))
                        usedWide += this.content3.node.width
                   }
                   if(cc.isValid(this.pointLabel))
                   {
                        this.pointLabel.string = point
                        this.pointLabel._forceUpdateRenderData()
                        this.pointLabel.node.setPosition(cc.v2(usedWide,0))
                        usedWide += this.pointLabel.node.width
                   }
                   if(cc.isValid(this.content4))
                   {
                        this.content4.string = this.gameStr["content4"]
                        this.content4._forceUpdateRenderData()
                        this.content4.node.setPosition(cc.v2(usedWide,0))
                        usedWide += this.content4.node.width
                   }
                  
                   
               }
            }
            else //优先消息
            {
                this.runType = 1 //返利消息
                point = Global.Toolkit.GetMoneyFormat(data.point)
                this.defautLabel.node.active = false
                this.combineNode1.active = false
                this.combineNode2.active = true
                let type = data.pay_type ? data.pay_type : data.type;//优先级消息类型
                let contentStr = this.getContentStr(type)
               if(cc.isValid(this.combineNode2))
               {
                    let usedWide = 0
                   if(cc.isValid(this.content5))
                   {
                        this.content5.string = contentStr["content1"]
                        this.content5._forceUpdateRenderData()
                        this.content5.node.setPosition(cc.v2(usedWide,0))
                        usedWide += this.content5.node.width
                   }
                   if(cc.isValid(this.nameLabel1))
                   {
                        this.nameLabel1.string = data.nickname
                        this.nameLabel1._forceUpdateRenderData()
                        this.nameLabel1.node.setPosition(cc.v2(usedWide,0))
                        usedWide += this.nameLabel1.node.width
                   }
                   if(cc.isValid(this.content6))
                   {
                        this.content6.string = contentStr["content2"]
                        this.content6._forceUpdateRenderData()
                        this.content6.node.setPosition(cc.v2(usedWide,0))
                        usedWide += this.content6.node.width
                   }
                  
                   if(cc.isValid(this.content7))
                   {
                        this.content7.string = contentStr["content3"]
                        this.content7._forceUpdateRenderData()
                        this.content7.node.setPosition(cc.v2(usedWide,0))
                        usedWide += this.content7.node.width
                   }
                   if(cc.isValid(this.pointLabel1))
                   {
                        this.pointLabel1.string = point
                        this.pointLabel1._forceUpdateRenderData()
                        this.pointLabel1.node.setPosition(cc.v2(usedWide,0))
                        usedWide += this.pointLabel1.node.width
                   }
                   if(cc.isValid(this.content8))
                   {
                        this.content8.string = contentStr["content4"]
                        this.content8._forceUpdateRenderData()
                        this.content8.node.setPosition(cc.v2(usedWide,0))
                        usedWide += this.content8.node.width
                   }
                  
                   
               }
               
            }
        } else {
            this.runType = 2 //默认消息
            this.defautLabel.node.active = true
            this.combineNode1.active = false
            this.combineNode2.active = false
            this.defautLabel.string = data.msg
        }
    }

    getContentStr(type)
    {
        let msgStr = this.vipStr
        switch (type) {
            case CommiType.Group:
                msgStr = this.delegeteStr
                break;
            case CommiType.SelfCommi:
                msgStr = this.delegeteStr
                break;
            case CommiType.Unlimited:
                msgStr = this.delegeteStr
                break;
            case PayType.SysPayTypeVip:
                msgStr = this.vipStr
                break;
            case PayType.SysPayTypeUnion:
                msgStr = this.vipStr
                break;
            default:
                break;
        }
        return msgStr
    }

    run(msg,currentRunningCount,maxCount = 2)
    {
        if(cc.isValid(this.playNode))
        {
            this.refreshContent(msg)
        }
        if(currentRunningCount>maxCount - 1)
        {
            currentRunningCount = maxCount - 1
        }
        let startPos = cc.v2(this.startPos.x,this.startPos.y -(currentRunningCount*40))
        
        this.node.setPosition(startPos)
        this.node.active = true
        var moveTime = 0.5
        let centerPos =  cc.v2(this.centerPos.x,startPos.y)
        // console.log("播放:移动距离",moveds,"移动时间",moveTime,"初始距离",item.node.x)
        var mv = cc.moveTo(moveTime,centerPos);
        mv.easing(cc.easeIn(moveTime))
        this.playNode.setPosition(cc.v2(-600,0))
        this.moveText()

        let end = cc.callFunc(()=>{
            this.playAnim(this.playNode)
        })

        this.isPlaying = true;
        this.node.runAction((cc.sequence(mv,end)))

    }

    /**
     * 移动不同颜色的label
     */
    moveText()
    {
        let parentNode = this.getParentNode()
        if(cc.isValid(parentNode))
        {
            let nameLabel = parentNode == this.combineNode1 ? this.nameLabel : this.nameLabel1
            let gameLabel = parentNode == this.combineNode1 ? this.gameLabel : null
            let pointLabel = parentNode == this.combineNode1 ? this.pointLabel : this.pointLabel1

            if(cc.isValid(nameLabel.node))
            {
                let origPos = nameLabel.node.position
                let pos = Global.UIUtil.convertSameNodePos(parentNode,this.greenNode,origPos)
                nameLabel.node.setParent(this.greenNode)
                nameLabel.node.setPosition(pos)
            }
            if(gameLabel && cc.isValid(gameLabel.node))
            {
                let origPos = gameLabel.node.position
                let pos = Global.UIUtil.convertSameNodePos(parentNode,this.blueNode,origPos)
                gameLabel.node.setParent(this.blueNode)
                gameLabel.node.setPosition(pos)
            }
            if(cc.isValid(pointLabel.node))
            {
                let origPos = pointLabel.node.position
                let pos = Global.UIUtil.convertSameNodePos(parentNode,this.yellowNode,origPos)
                pointLabel.node.setParent(this.yellowNode)
                pointLabel.node.setPosition(pos)

            }

        }

    }

    getParentNode()
    {
        let parentNode = null
        switch (this.runType) {
            case 0:
                parentNode = this.combineNode1
                break
            case 1:
                parentNode = this.combineNode2
            default:
                break;
        }
        return parentNode
    }

    moveUp(callback)
    {
        var moveTime = 0.5
        let end = cc.callFunc(()=>{
            this.checkPosition(callback)
        })


        var mvUp = cc.moveBy(moveTime, cc.v2(0, 40));
        mvUp.easing = (cc.easeOut(moveTime))
        this.node.runAction(cc.sequence(mvUp,end));
    }

    checkPosition(callback)
    {
        if(cc.isValid(this.node))
        {
            if(this.node.y>this.endPos.y)
            {
                this.isPlaying = false;
                if(callback)
                {
                    callback()
                }
            }
        }
       
    }

    refreshContent(data)
    {
        this.init(data)
    }


    private playAnim(item: cc.Node) {
        if (!cc.isValid(item)) {
            Logger.error("!item.node.isValid");
            return
        }
        item.active = true
        var moveTime = 12;
        let parentWide = item.parent.width
        let defautLabel = cc.find("defautLabel",item)
        if(defautLabel.width<=parentWide ||this.runType != 2 )
        {
            return
        }
       
        let distence = defautLabel.width
        var moveTime = distence / this.baseSpeed;
        distence = item.x - distence
        // console.log("播放:移动距离",moveds,"移动时间",moveTime,"初始距离",item.node.x)
        let endPos = cc.v2((distence),item.y)
        var mv = cc.moveTo(moveTime, endPos);
        
        let callBack = cc.callFunc(()=>{
            item.setPosition(cc.v2(0,0))
            item.stopAllActions();
            let moveTime = (defautLabel.width)/this.baseSpeed
            let endPos = cc.v2((-defautLabel.width - this.boxLength ),item.y)
            var mv = cc.moveTo(moveTime, endPos);
            item.runAction(cc.sequence(mv,callBack));
        })
       
        this.isPlaying = true;
        item.runAction(cc.sequence(mv,callBack));


    }

    /**回收 */
    public recoveryItem(reitem: cc.Node) {
        this.isPlaying = false;
        this.reset()
        this.node.setPosition(this.startPos)
        if(cc.isValid(reitem))
        {
            reitem.setPosition(cc.v2(0,0))
            reitem.stopAllActions();
        }
        //reitem.active = false;
        
    }

    private reset(){
        if(cc.isValid(this.node))
        {
            if(this.content1)
                this.content1.string = ""
            if(this.content2)
                this.content2.string = ""
            if(this.content3)
                this.content3.string = ""
            if(this.content4)
                this.content4.string = ""
            if(this.content5)
                this.content5.string = ""
            if(this.content6)
                this.content6.string = ""
            if(this.content7)
                this.content7.string = ""
            if(this.content8)
                this.content8.string = ""
            if(this.nameLabel1)   
                this.nameLabel1.string = ""
            if(this.nameLabel)
                this.nameLabel.string = ""
            if(this.gameLabel)
                this.gameLabel.string = ""
            if(this.pointLabel)
                this.pointLabel.string = ""
            if(this.pointLabel1)
                this.pointLabel1.string = ""
            if(this.defautLabel) 
                this.defautLabel.string = ""
            if(this.nameLabel1) 
                this.nameLabel1.node.setParent(this.combineNode2)
            if(this.nameLabel) 
                this.nameLabel.node.setParent(this.combineNode1)
            if(this.gameLabel) 
                this.gameLabel.node.setParent(this.combineNode1)
            if(this.pointLabel1) 
                this.pointLabel1.node.setParent(this.combineNode2)
            if(this.pointLabel) 
                this.pointLabel.node.setParent(this.combineNode1)
            this.runType = -1

        }
      
    }
    // update (dt) {}
}
