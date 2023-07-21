import AppHelper from "../tool/AppHelper";

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
export default class PaoMaDengComp extends cc.Component {

    //当前播放的跑马灯节点
    private playNode:cc.RichText = null;
    //当前是否播放跑马灯
    private isPlaying:boolean = false;
    /**
     * 根节点，无消息时隐藏
     */
    rootNode: cc.Node = null;

    /**获取一个可用的子节点对象 */
    private getItem() {
        if(this.playNode == null){
            let itemObj: cc.Node = new cc.Node("richtextNode");
            this.playNode = itemObj.addComponent(cc.RichText);
            this.playNode.node.setParent(this.node);
            //设置richtext的属性
            this.playNode.node.anchorX = 0;
            this.playNode.node.anchorY = this.node.anchorY;
            this.playNode.horizontalAlign = cc.macro.TextAlignment.LEFT;
            this.playNode.fontSize = 24;
            this.playNode.useSystemFont = true;
            this.playNode.fontFamily = "Microsoft Yahei";
            this.playNode.maxWidth = 0;
            this.playNode.lineHeight = this.node.height;
            this.playNode.handleTouchEvent = true;
        }
        this.playNode.node.active = true;
        this.playNode.node.x = 0;
        return this.playNode;
    }

    /**回收 */
    private recoveryItem(reitem: cc.RichText) {
        this.isPlaying = false;
        reitem.string = "";
        reitem.node.active = false;
        reitem.node.stopAllActions();
    }

    /**清理 */
    private clearRecord() {
        this.playNode = null;
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

    //初始化
    public init() {
        this.boxLength = this.node.width;

        this.startTimer();
    }

    //界面销毁
    protected onDestroy() {
        this.stopTimer();
    }

    onEnable() {
        this.isPlaying = false;
        this.reset()
        this.startTimer();
    }

    onDisable() {
        this.stopTimer();
    }

    startTimer() {
        if (this.checkTimer == null) {
            this.checkTimer = setInterval(this.checkMsgList.bind(this), 100);

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

    private playAnim(item: cc.RichText) {
        if (!item.node.isValid) {
            Logger.error("!item.node.isValid");
        }
        var moveds = item.node.x + item.node.width + this.boxLength;
        var moveTime = moveds / this.baseSpeed;
        // console.log("播放:移动距离",moveds,"移动时间",moveTime,"初始距离",item.node.x)
        var mv = cc.moveTo(moveTime, -(item.node.width + this.boxLength), 0);
        var mvover = cc.callFunc(function () {
            this.recoveryItem(item);
        }, this);
        this.isPlaying = true;
        item.node.runAction(cc.sequence(mv, mvover));

        if (this.rootNode) {
            this.rootNode.opacity = 255;
        }
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
            if(this.isPlaying) return;
            if(this.playNode == null){
                if(this.rootNode){
                    this.rootNode.opacity = 0;
                }
            }
            if (this.msgDataCacheList.length == 0) return;
            var data = this.msgDataCacheList.shift();

            var msgStr = "";
            if (data.nickname != null) {
                if(data.game_id) //有game_id为大赢家消息
                {
                    let gameInfo = Global.GameData.getGameInfo(data.game_id);
                    // console.log("gameInfo.name",gameInfo.name)
                    if (!gameInfo || gameInfo.name == null) {
                        Logger.error("找不到gameid", data.game_id);
                        return;
                    }
                    if (gameInfo.status != 1) {
                        return
                    }
                    let gameType = gameInfo.marqueeStrType;//游戏类型
                    let playerName = data.nickname;//玩家名称
                    let gameName = gameInfo.name;//游戏名
                    let point = data.hitPoint;//点数
                    msgStr = this.GetMarQueeStr(gameType,playerName,gameName,point);
                }
                else //优先消息
                {
                    let type = data.pay_type ? data.pay_type : data.type;//优先级消息类型
                    let name = data.nickname;//玩家名字
                    let point = Global.Toolkit.formatPoint(data.point);//佣金或者返利数
                    msgStr = this.GetPriorityMsg(type,name,point);
                }
            } else {
                msgStr = data.msg;
            }
            if(AppHelper.isBaiduSpecialState())
                msgStr = msgStr.replace(new RegExp("元", 'g'), "");
            this.playNode = this.getItem();
            this.playNode.string = msgStr;
            this.playAnim(this.playNode);
        } catch (error) {
            // this.stopTimer();
            // Logger.error(error);
        }
    }
    private reset(){
        let item = this.getItem()
        item.node.x = 0
        item.node.stopAllActions();
        this.isPlaying = false; 
    }

    /**
     * 拼接优先跑马灯的富文本内容
     * @param type 优先级消息类型 
     * @param name 玩家名字
     * @param point 返利/佣金数
     * @returns 返回跑马灯富文本内容
     */
    GetPriorityMsg(type:number,name:string,point:number)
    {
        let msgStr = ''
        switch (type) {
            case CommiType.Group:
                msgStr = cc.js.formatStr(PaoMaDengMsgTemp.Commission,PaoMaDengIdiom.CommissionGroup,name,point); 
                break;
            case CommiType.SelfCommi:
                msgStr = cc.js.formatStr(PaoMaDengMsgTemp.Commission,PaoMaDengIdiom.CommissionSelfCommi,name,point); 
                break;
            case CommiType.Unlimited:
                msgStr = cc.js.formatStr(PaoMaDengMsgTemp.Commission,PaoMaDengIdiom.CommissionUnlimited,name,point); 
                break;
            case PayType.SysPayTypeVip:
                msgStr = cc.js.formatStr(PaoMaDengMsgTemp.Rebate,PaoMaDengIdiom.RebateSysPayTypeVip,name,point); 
                break;
            case PayType.SysPayTypeUnion:
                msgStr = cc.js.formatStr(PaoMaDengMsgTemp.Rebate,PaoMaDengIdiom.RebateSysSysPayTypeUnion,name,point);
                break;
            default:
                break;
        }
        return msgStr
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
        this.addMsgItem(msg.data);
    }

    /**
     * 拼接赢钱富文本消息内容
     * @param strType 赢钱游戏类型
     * @param playerName 玩家名字
     * @param gameName 游戏名字
     * @param profit 赢得的码数
     */
    public GetMarQueeStr(strType: number,playerName:string,gameName:string,profit: number) {
        let msgStr = ''
        let level = Global.Toolkit.formatPoint(profit);
        let point = Global.Toolkit.GetMoneyFormat(profit);
        switch (strType) {
            case 1:
                if (500 <= level && level <= 1000) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin,PaoMaDengIdiom.Type1Level1,playerName,gameName,point);
                    return msgStr
                }
                else if (1001 <= level && level <= 2000) {
                        msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin,PaoMaDengIdiom.Type1Level2,playerName,gameName,point);
                    return msgStr
                }
                else if (2001 <= level && level <= 3000) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin,PaoMaDengIdiom.Type1Level3,playerName,gameName,point);
                    return msgStr
                }
                else if (level >= 3001) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin,PaoMaDengIdiom.Type1Level4,playerName,gameName,point);
                    return msgStr
                }
                else {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin,PaoMaDengIdiom.Type1Level0,playerName,gameName,point);
                    return msgStr
                }
                break;
            case 2:
                if (100 <= level) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin,PaoMaDengIdiom.Type2Level0,playerName,gameName,point);
                    return msgStr
                }
                break;
            case 3:
                if (10 <= level) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin,PaoMaDengIdiom.Type3Level0,playerName,gameName,point);
                    return msgStr
                }
                break;
            case 4:
                if (100 <= level && level <= 200) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin,PaoMaDengIdiom.Type4Level0,playerName,gameName,point);
                    return msgStr
                }
                else if (201 <= level && level <= 500) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin,PaoMaDengIdiom.Type4Level1,playerName,gameName,point);
                    return msgStr
                }
                else if (501 <= level && level <= 1000) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin,PaoMaDengIdiom.Type4Level2,playerName,gameName,point);
                    return msgStr
                }
                else if (level > 1000) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin,PaoMaDengIdiom.Type4Level3,playerName,gameName,point);
                    return msgStr
                }
                break;
            case 5://捕鱼大战
                msgStr = cc.js.formatStr(PaoMaDengMsgTemp.BuyuType,PaoMaDengIdiom.Type5Level0,playerName,gameName,point);
                return msgStr
                break;
            case 6://欢乐捕鱼
                msgStr = cc.js.formatStr(PaoMaDengMsgTemp.BuyuType,PaoMaDengIdiom.Type6Level0,playerName,gameName,point);
                return msgStr
                break;
            case 7://大闹天宫
                msgStr = cc.js.formatStr(PaoMaDengMsgTemp.BuyuType,PaoMaDengIdiom.Type7Level0,playerName,gameName,point);
                return msgStr
                break;
            default:
                return msgStr
                break;
                
        }
    }


}
export enum PayType
{
    SysPayTypeVip = 1, //vip充值
    SysPayTypeDown = 2, //线上充值
    SysPayTypeUnion = 3, //银行卡充值
    SysPayTypeGive = 4, //赠送
    SysPayTypeSmall = 5, //小额支付

}

export enum CommiType
{
    Group = 20, //团队税收返佣
    SelfCommi = 25, //自营税收返佣
    Unlimited = 26, //无限代佣金

}

export enum PaoMaDengMsgTemp{
    Welcome = "<color=#00d2FF>尊敬的玩家，欢迎进入游戏大厅！</color>",
    TipBadGame = "<color=#f9a314>抵制不良游戏，拒绝盗版游戏，注意自身保护，谨防上当受骗</color>",
    NoWallow = "<color=#f9a314>适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活</color>",
    GamesWin = "<color=#ffffff>%s！恭喜玩家</color><color=#00ff00>%s</color><color=#ffffff>在</color><color=#00d2ff>%s</color><color=#ffffff>中赢得</color><color=#fff100>%s</color><color=#ffffff>元！</color><color=#ffffff>快来围观吧！</color>",
    Rebate = "<color=#ffffff>%s！玩家</color><color=#00ff00>%s</color><color=#ffffff>通过公司入款充值获得</color><color=#fff100>%s</color><color=#ffffff>元</color><color=#ffffff>返利！</color>",
    Commission = "<color=#ffffff>%s！玩家</color><color=#00ff00>%s</color><color=#ffffff>领取了</color><color=#fff100>%s</color><color=#ffffff>元</color><color=#ffffff>代理佣金！</color>",
    BuyuType = "<color=#ffffff>%s！恭喜玩家</color><color=#00ff00>%s</color><color=#ffffff>在</color><color=#00d2ff>%s</color><color=#ffffff>游戏中击杀BOSS赢得</color><color=#fff100>%s</color><color=#ffffff>元！</color>"
}

export enum PaoMaDengIdiom{
    CommissionGroup = "天道酬勤",           //团队税收佣金
    CommissionSelfCommi = "天道酬勤",       //自营税收佣金
    CommissionUnlimited = "喜从天降",       //无限代佣金
    RebateSysPayTypeVip = "天降横财",       //vip充值返利
    RebateSysSysPayTypeUnion = "官方送金",  //银行卡充值返利
    Type1Level0 = "恭喜发财",   //type1 <500
    Type1Level1 = "鸿运当头",   //type1 500<= x <=1000
    Type1Level2 = "大吉大利",   //type1 1001<= x <= 2000
    Type1Level3 = "财源广进",   //type1 2001<= x <= 3000
    Type1Level4 = "八方来财",   //type1 >3001
    Type2Level0 = "一发入魂",   //type2 >=100
    Type3Level0 = "鸿运当头",   //type3 >=10
    Type4Level0 = "初入江湖",   //type4 100<= x <=200
    Type4Level1 = "小试牛刀",   //type4 201<= x <=500
    Type4Level2 = "大杀四方",   //type4 501<= x <=1000
    Type4Level3 = "独孤求败",   //type4 x>1000
    Type5Level0 = "一击即中",   //type5(捕鱼类) 捕鱼大战 
    Type6Level0 = "一马当先",   //type5(捕鱼类) 欢乐捕鱼
    Type7Level0 = "洪福齐天"    //type5(捕鱼类) 大闹天宫

}
