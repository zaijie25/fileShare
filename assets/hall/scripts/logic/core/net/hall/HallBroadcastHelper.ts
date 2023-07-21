import HallServer from "./HallServer";
import EventDispatcher from "../../../../framework/event/EventDispatcher";
import { NetAppface } from "./NetEvent";
import HallModel, { HallRedSpotType } from "../../../hallcommon/model/HallModel";
import GlobalEvent from "../../GlobalEvent";
import { SceneType } from "../../scene/SceneManager";
import HallStorageKey from "../../../hallcommon/const/HallStorageKey";
import AppHelper from "../../tool/AppHelper";


//服务器广播消息类型
enum ServerPushType {
    TYPE_MARQEE_MSG = 20000, // 普通跑马灯消息
    TYPE_MARQEE_WINNER = 20001, // 跑马灯大赢家播报消息
    TYPE_MARQEE_CP = 20002, // 彩票跑马灯信息

    TYPE_UPDATE_INFO = 20003, // 拉取用户金币信息
    TYPE_PUT_DENY = 20004, // 提现拒绝信息


    TYPE_MARQEE_MAilMSG = 20005, // 消息红点
    TYPE_MARQEE_ACTiVETE = 20006, // 活动红点
    TYPE_MARQEE_HAVENOTICE = 20007, //有新的公告
    TYPE_MARQEE_HAVEMAIL = 20008, //有新的邮件  这两个

    TYPE_SendFlowPoint = 20009,     // 返利推送
    TYPE_MARQEE_RECHARGEGIFT = 20010,//充值返利

    TYPE_VipCoin = 20011,       //vip积分变化
    TYPE_GAMEROOM_CHANGE = 20012, //房间配置变化
    TYPE_MARQEE_PAY_BACK = 20013, // 充值返利消息
    TYPE_MARQEE_COMMI = 20014, // 领取佣金
    TYPE_NEW_TASK_ACHIEVE = 20015,  //达成新的任务
    TYPE_REWARD_PACK = 20017,       //奖励红包
    TYPE_RECHARGE_RED = 20018,       //充值红包
    TYPE_LIMIT_FIRST_PAY   = 20021, //限时首充参与通知
    //彩票相关
    TYPE_LOTTERY_TAB = 30000, //tab重新拉取
    TYPE_LOTTERY_CFG = 30001, //cfg重新拉取
    TYPE_LOTTERY_ODD = 30002, //odd重新拉取
    TYPE_LOTTERY_GAMEDATA = 30003, //开奖售卖信息
    TYPE_LOTTERY_RESULT = 30004, //开奖历史
    TYPE_LOTTERY_ORDER = 30005, //订单重新拉取

    // VIp进游戏推送
    TYPE_VIP_ENTER_GAME = 20019,// vip进游戏
    TYPE_PRIVATE_MARQUEE = 20020 // 私人跑马灯推送消息
}

export default class HallBroadcastHelper {
    private msgseq = 0;
    private msgseq1 = 0;
    private server: HallServer;
    private internalEvent: EventDispatcher;
    private cacheHallMsg: any = [];
    private CONFIG_MD5_KEY = "CONFIG_MD5_KEY";
    private CONFIG_KEY = "CONFIG_KEY";

    constructor(server: HallServer, internalEvent: EventDispatcher) {
        this.server = server;
        this.internalEvent = internalEvent;
        this.setup();
    }

    public setup() {
        this.internalEvent.on(HallServer.EVENT_INTERNAL_ONHEARTBEAT, this, this.handleHeartbeat);
        //监听场景切换
        Global.Event.on(GlobalEvent.ON_HALL_OPEN, this, this.DealCacheHallMsg);
    }

    //执行大厅缓存的消息
    private DealCacheHallMsg() {
        if (Global.SceneManager.sceneType !== SceneType.Hall) {
            return;
        }

        let msgFuncMap = {}
        for (let msg of this.cacheHallMsg) {
            let msgType = msg.type;
            if (!this.dealMap[msgType]) {
                Logger.error("未找到handler" + msgType);
                continue;
            }
            let func = this.dealMap[msgType].func
            let merge = this.dealMap[msgType].merge;
            if (!merge) {
                func.apply(this, [msg]);
            }
            else {
                msgFuncMap[msgType] = [func, msg];
            }
        }
        for (let msgType in msgFuncMap) {
            let func = msgFuncMap[msgType][0];
            let msg = msgFuncMap[msgType][1];
            
            func.apply(this, [msg]);
        }
        this.cacheHallMsg = [];
    }

    private addTestData(msgData: any) {

    }

    //处理心跳并分发方法
    private handleHeartbeat(param) {
        let msgData = param;
        if (msgData == null || msgData.list == null)
            return;

        //解析心跳消息
        let msgFuncMap = {}

        if (this.checkMsgseq(param.msg_seq_1, this.msgseq1)) {
            if (param.msg_seq_1 && param.msg_seq_1 > 0)
                this.msgseq1 = param.msg_seq_1;
            this.handleMsgList(msgData.list_1, msgFuncMap, 1);
        }

        if (this.checkMsgseq(param.msg_seq, this.msgseq)) {
            if (param.msg_seq && param.msg_seq > 0)
                this.msgseq = param.msg_seq;
            this.handleMsgList(msgData.list, msgFuncMap);
        }




        //执行对应心跳合并方法
        for (let msgType in msgFuncMap) {
            let func = msgFuncMap[msgType][0];
            let msg = msgFuncMap[msgType][1];
            func.apply(this, [msg]);
        }
        //如果在大厅中则直接处理
        this.DealCacheHallMsg();
        //设置下次心跳发送的seq
        this.internalEvent.event(HallServer.EVENT_INTERNAL_UPDATEMSGSEQ, this.msgseq, this.msgseq1);
    }

    private checkMsgseq(serverSeq, localMsgSeq) {
        if (serverSeq
            && serverSeq > 0                           //不等0
            && (localMsgSeq >= serverSeq)              //小于等于本地seq
            && (localMsgSeq - serverSeq < 1000))      //差值小于1000
        {
            return false;
        }
        return true;
    }

    private handleMsgList(list, msgFuncMap, priority = 0) {
        if (list == null)
            return;

        //console.error("list===================",list);

        for (let element of list) {
            // //判断有效seq
            // if( element.msgseq 
            //     && element.msgseq > 0                           //不等0
            //     && (this.msgseq >= element.msgseq)              //小于等于本地seq
            //     && (this.msgseq - element.msgseq < 1000) )      //差值小于1000
            // {
            //     continue;
            // }
            // else if(element.msgseq && element.msgseq > 0)
            // {
            //     this.msgseq = element.msgseq;
            // }
            //执行消息对应方法

            let msg = element.msg;

            if (!msg) {
                return
            }
            let msgType = msg.type;
            if (msg.data && typeof (msg.data) != "string") {
                msg.data.clientPriority = priority
            }

            if (!this.dealMap[msgType]) {
                Logger.error("未找到handler" + msgType);
                continue;
            }
            let func = this.dealMap[msgType].func
            let merge = this.dealMap[msgType].merge;
            let inHall = this.dealMap[msgType].cacheInHall;
            if (inHall) {
                this.cacheHallMsg.push(msg);
            }
            else {
                if (!merge) {
                    func.apply(this, [msg]);
                }
                else {
                    msgFuncMap[msgType] = [func, msg];
                }
            }
        }

    }



    public clear() {
        this.msgseq = 0;
        this.msgseq1 = 0;
    }

    ///服务器广播消息和处理方法对应数组,支持function 和 handler
    private dealMap: { [key: number]: any } =
        {
            [ServerPushType.TYPE_PRIVATE_MARQUEE]: { "func": this.PrivateMarquee, merge: false },//私人跑马灯信息
            [ServerPushType.TYPE_VIP_ENTER_GAME]: { "func": this.AddmissionVIp, merge: false },//VIp进游戏消息
            [ServerPushType.TYPE_MARQEE_MSG]: { "func": this.DealMarqueeScroll, merge: false }, //普通跑马灯消息
            [ServerPushType.TYPE_MARQEE_WINNER]: { "func": this.DealMarqueeScroll, merge: false }, //大赢家跑马灯消息
            [ServerPushType.TYPE_MARQEE_CP]: { "func": this.DealMarqueeScroll, merge: false }, //彩票跑马灯信息

            [ServerPushType.TYPE_MARQEE_PAY_BACK]: { "func": this.DealMarqueeScroll, merge: false }, //充值返利消息

            [ServerPushType.TYPE_MARQEE_COMMI]: { "func": this.DealMarqueeScroll, merge: false }, //领取佣金

            [ServerPushType.TYPE_UPDATE_INFO]: { "func": this.DealUpdatePlayerMoneyInfo, merge: true }, //拉取用户金币信息

            [ServerPushType.TYPE_MARQEE_HAVEMAIL]: { "func": this.DealUpdateMAilMSG, merge: true }, //消息红点
            [ServerPushType.TYPE_LIMIT_FIRST_PAY]: { "func": this.DealUpdateHallBtn, merge: true }, //消息红点
            [ServerPushType.TYPE_NEW_TASK_ACHIEVE]: { "func": this.DealUpdatNewTask, merge: true }, //新的任务达成
            [ServerPushType.TYPE_REWARD_PACK]: { "func": this.DealUpdatRedEnvelope, merge: true },  //奖励红包
            [ServerPushType.TYPE_RECHARGE_RED]: { "func": this.DealUpdatHallRed, merge: true },     //充值红包
            [ServerPushType.TYPE_MARQEE_ACTiVETE]: { "func": this.DealUpdateACTiVETE, merge: true }, //活动红点
            [ServerPushType.TYPE_MARQEE_HAVENOTICE]: { "func": this.DealUpdateNotice, merge: true }, //公告红点
            // [ServerPushType.TYPE_MARQEE_RECHARGEGIFT]: {"func":this.DealRechargeGiftMSG, merge:true},
            // [ServerPushType.TYPE_SendFlowPoint]: {"func":this.DealRebateMsg, merge:false, cacheInHall: true}, //返利

            [ServerPushType.TYPE_VipCoin]: { "func": this.DealVipMsg, merge: true }, //vip积分变化

            //彩票相关
            [ServerPushType.TYPE_LOTTERY_TAB]: { "func": this.DealUpdateLotteryTab, merge: true }, //tab重新拉取
            [ServerPushType.TYPE_LOTTERY_CFG]: { "func": this.DealUpdateLotteryCfg, merge: true }, //cfg重新拉取
            [ServerPushType.TYPE_LOTTERY_ODD]: { "func": this.DealUpdateLotteryOdds, merge: true }, //odd重新拉取
            [ServerPushType.TYPE_LOTTERY_GAMEDATA]: { "func": this.DealUpdateLotteryGameData, merge: true }, //开奖售卖信息
            [ServerPushType.TYPE_LOTTERY_RESULT]: { "func": this.DealUpdateLotteryResult, merge: true }, //开奖历史
            [ServerPushType.TYPE_LOTTERY_ORDER]: { "func": this.DealUpdateLotteryOrder, merge: true }, //订单重新拉取
            [ServerPushType.TYPE_GAMEROOM_CHANGE]: { "func": this.DealNewGameCfg, merge: true }, //普通跑马灯消息
        }

    //广播跑马灯
    private DealMarqueeScroll(msg) {
        switch (msg.type) {
            case ServerPushType.TYPE_MARQEE_MSG: //普通跑马灯
                {
                    Global.Event.event(GlobalEvent.MARQUEESCROLL_COMMON, msg);
                    break;
                }
            case ServerPushType.TYPE_MARQEE_WINNER: //大赢家跑马灯
                {
                    /**
                     * //大赢家, 直接推送给客户端, 客户端来拼
                        type BigWinner struct {
                        Uid       uint64 `json:"-"`
                        HitPoint  int64  `json:"hitPoint"`
                        Nickname  string `json:"nickname"`
                        Headimg   string `json:"headimg"`
                        GameId    int32  `json:"game_id"`
                        GameRule  string `json:"game_rule"`
                        GameLevel string `json:"game_level"`
                        }
                     */
                    Global.Event.event(GlobalEvent.MARQUEESCROLL_BIGWINNER, msg);
                    break;
                }
            case ServerPushType.TYPE_MARQEE_PAY_BACK: //VIP返利马灯
                {
                    Global.Event.event(GlobalEvent.MARQUEESCROLL_VIP, msg);
                    break;
                }

            case ServerPushType.TYPE_MARQEE_COMMI: //VIP返利马灯
                {
                    Global.Event.event(GlobalEvent.MARQUEESCROLL_COMMI, msg);
                    break;
                }
        }
    }

    //拉取用户金币信息
    private DealUpdatePlayerMoneyInfo(msg) {
       
        Global.HallServer.send(NetAppface.mod, NetAppface.GetUserPoint, {});
    }

    //消息红点
    private DealUpdateMAilMSG(msg) {
        Global.Event.event(GlobalEvent.ShowRedSpot, [true, HallRedSpotType.Mail]);
    }

    //消息红点
    private DealUpdateHallBtn(msg) {
        Global.Event.event(GlobalEvent.TimeLimitedRechargeStatusChange,false);
    }

    //任务红点
    private DealUpdatNewTask(msg) {
        Global.Event.event(GlobalEvent.ShowRedSpot, [true, HallRedSpotType.Commision]);
    }
    //获取红包个数
    private DealUpdatRedEnvelope(msg) {
        let model = <HallModel>Global.ModelManager.getModel("HallModel");
        model.requestGetRewardPackCount()
    }
    //大厅充值红包
    private DealUpdatHallRed(msg) {
        let model = <HallModel>Global.ModelManager.getModel("HallModel");
        model.recharge_red = msg.data;
        Global.Event.event(GlobalEvent.ShowHallRed, msg.data);
        // model.requestGetRewardPackCount()
    }
    //活动红点
    private DealUpdateACTiVETE(msg) {
        Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallRedSpotType.Activity]);
    }
    //活动红点
    private DealUpdateNotice(msg) {
        Global.Event.event(GlobalEvent.ShowRedSpot, [true, HallRedSpotType.Gonggao]);
    }

    // private DealRebateMsg(msg){
    //     Global.Event.event(GlobalEvent.ShowRedSpot, [true,HallRedSpotType.Rebate]);
    //     if (msg && msg.data){
    //         Global.Event.event(GlobalEvent.SHOW_REBATE_GET, msg.data);
    //     }
    // }

    /**
     * vip积分变化处理
     * @param msg 
     */
    private DealVipMsg(msg) {
        Global.HallServer.send(NetAppface.mod, NetAppface.GetUserInfo, {});
    }

    /** 彩票 tab重新拉取 */
    private DealUpdateLotteryTab(msg) {
        Global.Event.event(GlobalEvent.LotteryUpdateTab, [msg.data]);
    }

    /** 彩票 cfg重新拉取 */
    private DealUpdateLotteryCfg(msg) {
        Global.Event.event(GlobalEvent.LotteryUpdateCfg, [msg.data]);
    }

    /** 彩票 odd重新拉取 */
    private DealUpdateLotteryOdds(msg) {
        Global.Event.event(GlobalEvent.LotteryUpdateOdds, [msg.data]);
    }


    /** 重新拉取游戏配置 */
    private DealNewGameCfg(msg) {
        let md5 = this.loadLocalMd5();
        let cfg = null;
        let param: any = {};
        if (md5 && md5 != "")
            cfg = this.loadConfig();

        if (cfg != null && cfg.length > 0 && md5) {
            param.game_sum = md5;
        }
        let device = Global.Toolkit.genDeviceInfo();
        param.device = device
        param.hall_skin = Global.Setting.SystemInfo.hallSkin;
        param.game_skin = Global.Setting.SystemInfo.gameSkin;
        param.app_version = Global.Setting.SystemInfo.appVersion
        let megeServerFlag = Global.Toolkit.checkMegeServer()
        if (megeServerFlag) {
            param.old_app_id = parseInt(Global.Setting.SystemInfo.appID)
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.GetGameList, param, (data) => {
            if (data.game_list != null && data.game_list.length > 0) {
                cfg = data.game_list;
                let svrMd5 = data.game_sum;
                try {
                    let cfgStr = JSON.stringify(data.game_list);
                    if (!svrMd5 || svrMd5 == "")
                        svrMd5 = Global.Toolkit.md5(cfgStr);
                    Global.Setting.storage.set(this.CONFIG_MD5_KEY, svrMd5);
                    Global.Setting.storage.set(this.CONFIG_KEY, cfgStr);
                }
                catch (e) {
                }
                Global.GameData.init(cfg);
            }
        })

        //保存游戏配置
    }
    /** 彩票  开奖售卖信息 */
    private DealUpdateLotteryGameData(msg) {
        Global.Event.event(GlobalEvent.LotteryUpdateGameData, [msg.data]);
    }

    /** 彩票 开奖历史 */
    private DealUpdateLotteryResult(msg) {
        Global.Event.event(GlobalEvent.LotteryUpdateResult, [msg.data]);
    }

    /** 彩票 订单重新拉取 */
    private DealUpdateLotteryOrder(msg) {
        Global.Event.event(GlobalEvent.LotteryUpdateOrder, [msg.data]);
    }

    /**vip玩家进场时候的推送 */
    private AddmissionVIp(msg) {
        Global.Event.event(GlobalEvent.TYPE_VIP_ENTER_GAME, msg)
    }
    private PrivateMarquee(msg) {
        Global.Event.event(GlobalEvent.TYPE_PRIVATE_MARQUEE, msg)
    }
    private loadLocalMd5() {
        let md5 = Global.Setting.storage.get(this.CONFIG_MD5_KEY);
        return md5;
    }

    private loadConfig() {
        let cfgStr = Global.Setting.storage.get(this.CONFIG_KEY);
        if (cfgStr != null && cfgStr != "") {
            try {
                let cfg = JSON.parse(cfgStr);
                return cfg;
            }
            catch (e) {
                cc.error("解析config 失败");
                return null;
            }
        }
        return null;
    }

}
