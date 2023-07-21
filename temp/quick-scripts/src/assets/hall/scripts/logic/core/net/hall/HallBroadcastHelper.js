"use strict";
cc._RF.push(module, '6190buM9ExN84QxXOK1Szhq', 'HallBroadcastHelper');
// hall/scripts/logic/core/net/hall/HallBroadcastHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HallServer_1 = require("./HallServer");
var NetEvent_1 = require("./NetEvent");
var HallModel_1 = require("../../../hallcommon/model/HallModel");
var GlobalEvent_1 = require("../../GlobalEvent");
var SceneManager_1 = require("../../scene/SceneManager");
//服务器广播消息类型
var ServerPushType;
(function (ServerPushType) {
    ServerPushType[ServerPushType["TYPE_MARQEE_MSG"] = 20000] = "TYPE_MARQEE_MSG";
    ServerPushType[ServerPushType["TYPE_MARQEE_WINNER"] = 20001] = "TYPE_MARQEE_WINNER";
    ServerPushType[ServerPushType["TYPE_MARQEE_CP"] = 20002] = "TYPE_MARQEE_CP";
    ServerPushType[ServerPushType["TYPE_UPDATE_INFO"] = 20003] = "TYPE_UPDATE_INFO";
    ServerPushType[ServerPushType["TYPE_PUT_DENY"] = 20004] = "TYPE_PUT_DENY";
    ServerPushType[ServerPushType["TYPE_MARQEE_MAilMSG"] = 20005] = "TYPE_MARQEE_MAilMSG";
    ServerPushType[ServerPushType["TYPE_MARQEE_ACTiVETE"] = 20006] = "TYPE_MARQEE_ACTiVETE";
    ServerPushType[ServerPushType["TYPE_MARQEE_HAVENOTICE"] = 20007] = "TYPE_MARQEE_HAVENOTICE";
    ServerPushType[ServerPushType["TYPE_MARQEE_HAVEMAIL"] = 20008] = "TYPE_MARQEE_HAVEMAIL";
    ServerPushType[ServerPushType["TYPE_SendFlowPoint"] = 20009] = "TYPE_SendFlowPoint";
    ServerPushType[ServerPushType["TYPE_MARQEE_RECHARGEGIFT"] = 20010] = "TYPE_MARQEE_RECHARGEGIFT";
    ServerPushType[ServerPushType["TYPE_VipCoin"] = 20011] = "TYPE_VipCoin";
    ServerPushType[ServerPushType["TYPE_GAMEROOM_CHANGE"] = 20012] = "TYPE_GAMEROOM_CHANGE";
    ServerPushType[ServerPushType["TYPE_MARQEE_PAY_BACK"] = 20013] = "TYPE_MARQEE_PAY_BACK";
    ServerPushType[ServerPushType["TYPE_MARQEE_COMMI"] = 20014] = "TYPE_MARQEE_COMMI";
    ServerPushType[ServerPushType["TYPE_NEW_TASK_ACHIEVE"] = 20015] = "TYPE_NEW_TASK_ACHIEVE";
    ServerPushType[ServerPushType["TYPE_REWARD_PACK"] = 20017] = "TYPE_REWARD_PACK";
    ServerPushType[ServerPushType["TYPE_RECHARGE_RED"] = 20018] = "TYPE_RECHARGE_RED";
    ServerPushType[ServerPushType["TYPE_LIMIT_FIRST_PAY"] = 20021] = "TYPE_LIMIT_FIRST_PAY";
    //彩票相关
    ServerPushType[ServerPushType["TYPE_LOTTERY_TAB"] = 30000] = "TYPE_LOTTERY_TAB";
    ServerPushType[ServerPushType["TYPE_LOTTERY_CFG"] = 30001] = "TYPE_LOTTERY_CFG";
    ServerPushType[ServerPushType["TYPE_LOTTERY_ODD"] = 30002] = "TYPE_LOTTERY_ODD";
    ServerPushType[ServerPushType["TYPE_LOTTERY_GAMEDATA"] = 30003] = "TYPE_LOTTERY_GAMEDATA";
    ServerPushType[ServerPushType["TYPE_LOTTERY_RESULT"] = 30004] = "TYPE_LOTTERY_RESULT";
    ServerPushType[ServerPushType["TYPE_LOTTERY_ORDER"] = 30005] = "TYPE_LOTTERY_ORDER";
    // VIp进游戏推送
    ServerPushType[ServerPushType["TYPE_VIP_ENTER_GAME"] = 20019] = "TYPE_VIP_ENTER_GAME";
    ServerPushType[ServerPushType["TYPE_PRIVATE_MARQUEE"] = 20020] = "TYPE_PRIVATE_MARQUEE"; // 私人跑马灯推送消息
})(ServerPushType || (ServerPushType = {}));
var HallBroadcastHelper = /** @class */ (function () {
    function HallBroadcastHelper(server, internalEvent) {
        var _a;
        this.msgseq = 0;
        this.msgseq1 = 0;
        this.cacheHallMsg = [];
        this.CONFIG_MD5_KEY = "CONFIG_MD5_KEY";
        this.CONFIG_KEY = "CONFIG_KEY";
        ///服务器广播消息和处理方法对应数组,支持function 和 handler
        this.dealMap = (_a = {},
            _a[ServerPushType.TYPE_PRIVATE_MARQUEE] = { "func": this.PrivateMarquee, merge: false },
            _a[ServerPushType.TYPE_VIP_ENTER_GAME] = { "func": this.AddmissionVIp, merge: false },
            _a[ServerPushType.TYPE_MARQEE_MSG] = { "func": this.DealMarqueeScroll, merge: false },
            _a[ServerPushType.TYPE_MARQEE_WINNER] = { "func": this.DealMarqueeScroll, merge: false },
            _a[ServerPushType.TYPE_MARQEE_CP] = { "func": this.DealMarqueeScroll, merge: false },
            _a[ServerPushType.TYPE_MARQEE_PAY_BACK] = { "func": this.DealMarqueeScroll, merge: false },
            _a[ServerPushType.TYPE_MARQEE_COMMI] = { "func": this.DealMarqueeScroll, merge: false },
            _a[ServerPushType.TYPE_UPDATE_INFO] = { "func": this.DealUpdatePlayerMoneyInfo, merge: true },
            _a[ServerPushType.TYPE_MARQEE_HAVEMAIL] = { "func": this.DealUpdateMAilMSG, merge: true },
            _a[ServerPushType.TYPE_LIMIT_FIRST_PAY] = { "func": this.DealUpdateHallBtn, merge: true },
            _a[ServerPushType.TYPE_NEW_TASK_ACHIEVE] = { "func": this.DealUpdatNewTask, merge: true },
            _a[ServerPushType.TYPE_REWARD_PACK] = { "func": this.DealUpdatRedEnvelope, merge: true },
            _a[ServerPushType.TYPE_RECHARGE_RED] = { "func": this.DealUpdatHallRed, merge: true },
            _a[ServerPushType.TYPE_MARQEE_ACTiVETE] = { "func": this.DealUpdateACTiVETE, merge: true },
            _a[ServerPushType.TYPE_MARQEE_HAVENOTICE] = { "func": this.DealUpdateNotice, merge: true },
            // [ServerPushType.TYPE_MARQEE_RECHARGEGIFT]: {"func":this.DealRechargeGiftMSG, merge:true},
            // [ServerPushType.TYPE_SendFlowPoint]: {"func":this.DealRebateMsg, merge:false, cacheInHall: true}, //返利
            _a[ServerPushType.TYPE_VipCoin] = { "func": this.DealVipMsg, merge: true },
            //彩票相关
            _a[ServerPushType.TYPE_LOTTERY_TAB] = { "func": this.DealUpdateLotteryTab, merge: true },
            _a[ServerPushType.TYPE_LOTTERY_CFG] = { "func": this.DealUpdateLotteryCfg, merge: true },
            _a[ServerPushType.TYPE_LOTTERY_ODD] = { "func": this.DealUpdateLotteryOdds, merge: true },
            _a[ServerPushType.TYPE_LOTTERY_GAMEDATA] = { "func": this.DealUpdateLotteryGameData, merge: true },
            _a[ServerPushType.TYPE_LOTTERY_RESULT] = { "func": this.DealUpdateLotteryResult, merge: true },
            _a[ServerPushType.TYPE_LOTTERY_ORDER] = { "func": this.DealUpdateLotteryOrder, merge: true },
            _a[ServerPushType.TYPE_GAMEROOM_CHANGE] = { "func": this.DealNewGameCfg, merge: true },
            _a);
        this.server = server;
        this.internalEvent = internalEvent;
        this.setup();
    }
    HallBroadcastHelper.prototype.setup = function () {
        this.internalEvent.on(HallServer_1.default.EVENT_INTERNAL_ONHEARTBEAT, this, this.handleHeartbeat);
        //监听场景切换
        Global.Event.on(GlobalEvent_1.default.ON_HALL_OPEN, this, this.DealCacheHallMsg);
    };
    //执行大厅缓存的消息
    HallBroadcastHelper.prototype.DealCacheHallMsg = function () {
        if (Global.SceneManager.sceneType !== SceneManager_1.SceneType.Hall) {
            return;
        }
        var msgFuncMap = {};
        for (var _i = 0, _a = this.cacheHallMsg; _i < _a.length; _i++) {
            var msg = _a[_i];
            var msgType = msg.type;
            if (!this.dealMap[msgType]) {
                Logger.error("未找到handler" + msgType);
                continue;
            }
            var func = this.dealMap[msgType].func;
            var merge = this.dealMap[msgType].merge;
            if (!merge) {
                func.apply(this, [msg]);
            }
            else {
                msgFuncMap[msgType] = [func, msg];
            }
        }
        for (var msgType in msgFuncMap) {
            var func = msgFuncMap[msgType][0];
            var msg = msgFuncMap[msgType][1];
            func.apply(this, [msg]);
        }
        this.cacheHallMsg = [];
    };
    HallBroadcastHelper.prototype.addTestData = function (msgData) {
    };
    //处理心跳并分发方法
    HallBroadcastHelper.prototype.handleHeartbeat = function (param) {
        var msgData = param;
        if (msgData == null || msgData.list == null)
            return;
        //解析心跳消息
        var msgFuncMap = {};
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
        for (var msgType in msgFuncMap) {
            var func = msgFuncMap[msgType][0];
            var msg = msgFuncMap[msgType][1];
            func.apply(this, [msg]);
        }
        //如果在大厅中则直接处理
        this.DealCacheHallMsg();
        //设置下次心跳发送的seq
        this.internalEvent.event(HallServer_1.default.EVENT_INTERNAL_UPDATEMSGSEQ, this.msgseq, this.msgseq1);
    };
    HallBroadcastHelper.prototype.checkMsgseq = function (serverSeq, localMsgSeq) {
        if (serverSeq
            && serverSeq > 0 //不等0
            && (localMsgSeq >= serverSeq) //小于等于本地seq
            && (localMsgSeq - serverSeq < 1000)) //差值小于1000
         {
            return false;
        }
        return true;
    };
    HallBroadcastHelper.prototype.handleMsgList = function (list, msgFuncMap, priority) {
        if (priority === void 0) { priority = 0; }
        if (list == null)
            return;
        //console.error("list===================",list);
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var element = list_2[_i];
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
            var msg = element.msg;
            if (!msg) {
                return;
            }
            var msgType = msg.type;
            if (msg.data && typeof (msg.data) != "string") {
                msg.data.clientPriority = priority;
            }
            if (!this.dealMap[msgType]) {
                Logger.error("未找到handler" + msgType);
                continue;
            }
            var func = this.dealMap[msgType].func;
            var merge = this.dealMap[msgType].merge;
            var inHall = this.dealMap[msgType].cacheInHall;
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
    };
    HallBroadcastHelper.prototype.clear = function () {
        this.msgseq = 0;
        this.msgseq1 = 0;
    };
    //广播跑马灯
    HallBroadcastHelper.prototype.DealMarqueeScroll = function (msg) {
        switch (msg.type) {
            case ServerPushType.TYPE_MARQEE_MSG: //普通跑马灯
                {
                    Global.Event.event(GlobalEvent_1.default.MARQUEESCROLL_COMMON, msg);
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
                    Global.Event.event(GlobalEvent_1.default.MARQUEESCROLL_BIGWINNER, msg);
                    break;
                }
            case ServerPushType.TYPE_MARQEE_PAY_BACK: //VIP返利马灯
                {
                    Global.Event.event(GlobalEvent_1.default.MARQUEESCROLL_VIP, msg);
                    break;
                }
            case ServerPushType.TYPE_MARQEE_COMMI: //VIP返利马灯
                {
                    Global.Event.event(GlobalEvent_1.default.MARQUEESCROLL_COMMI, msg);
                    break;
                }
        }
    };
    //拉取用户金币信息
    HallBroadcastHelper.prototype.DealUpdatePlayerMoneyInfo = function (msg) {
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetUserPoint, {});
    };
    //消息红点
    HallBroadcastHelper.prototype.DealUpdateMAilMSG = function (msg) {
        Global.Event.event(GlobalEvent_1.default.ShowRedSpot, [true, HallModel_1.HallRedSpotType.Mail]);
    };
    //消息红点
    HallBroadcastHelper.prototype.DealUpdateHallBtn = function (msg) {
        Global.Event.event(GlobalEvent_1.default.TimeLimitedRechargeStatusChange, false);
    };
    //任务红点
    HallBroadcastHelper.prototype.DealUpdatNewTask = function (msg) {
        Global.Event.event(GlobalEvent_1.default.ShowRedSpot, [true, HallModel_1.HallRedSpotType.Commision]);
    };
    //获取红包个数
    HallBroadcastHelper.prototype.DealUpdatRedEnvelope = function (msg) {
        var model = Global.ModelManager.getModel("HallModel");
        model.requestGetRewardPackCount();
    };
    //大厅充值红包
    HallBroadcastHelper.prototype.DealUpdatHallRed = function (msg) {
        var model = Global.ModelManager.getModel("HallModel");
        model.recharge_red = msg.data;
        Global.Event.event(GlobalEvent_1.default.ShowHallRed, msg.data);
        // model.requestGetRewardPackCount()
    };
    //活动红点
    HallBroadcastHelper.prototype.DealUpdateACTiVETE = function (msg) {
        Global.Event.event(GlobalEvent_1.default.ShowRedSpot, [false, HallModel_1.HallRedSpotType.Activity]);
    };
    //活动红点
    HallBroadcastHelper.prototype.DealUpdateNotice = function (msg) {
        Global.Event.event(GlobalEvent_1.default.ShowRedSpot, [true, HallModel_1.HallRedSpotType.Gonggao]);
    };
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
    HallBroadcastHelper.prototype.DealVipMsg = function (msg) {
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetUserInfo, {});
    };
    /** 彩票 tab重新拉取 */
    HallBroadcastHelper.prototype.DealUpdateLotteryTab = function (msg) {
        Global.Event.event(GlobalEvent_1.default.LotteryUpdateTab, [msg.data]);
    };
    /** 彩票 cfg重新拉取 */
    HallBroadcastHelper.prototype.DealUpdateLotteryCfg = function (msg) {
        Global.Event.event(GlobalEvent_1.default.LotteryUpdateCfg, [msg.data]);
    };
    /** 彩票 odd重新拉取 */
    HallBroadcastHelper.prototype.DealUpdateLotteryOdds = function (msg) {
        Global.Event.event(GlobalEvent_1.default.LotteryUpdateOdds, [msg.data]);
    };
    /** 重新拉取游戏配置 */
    HallBroadcastHelper.prototype.DealNewGameCfg = function (msg) {
        var _this = this;
        var md5 = this.loadLocalMd5();
        var cfg = null;
        var param = {};
        if (md5 && md5 != "")
            cfg = this.loadConfig();
        if (cfg != null && cfg.length > 0 && md5) {
            param.game_sum = md5;
        }
        var device = Global.Toolkit.genDeviceInfo();
        param.device = device;
        param.hall_skin = Global.Setting.SystemInfo.hallSkin;
        param.game_skin = Global.Setting.SystemInfo.gameSkin;
        param.app_version = Global.Setting.SystemInfo.appVersion;
        var megeServerFlag = Global.Toolkit.checkMegeServer();
        if (megeServerFlag) {
            param.old_app_id = parseInt(Global.Setting.SystemInfo.appID);
        }
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetGameList, param, function (data) {
            if (data.game_list != null && data.game_list.length > 0) {
                cfg = data.game_list;
                var svrMd5 = data.game_sum;
                try {
                    var cfgStr = JSON.stringify(data.game_list);
                    if (!svrMd5 || svrMd5 == "")
                        svrMd5 = Global.Toolkit.md5(cfgStr);
                    Global.Setting.storage.set(_this.CONFIG_MD5_KEY, svrMd5);
                    Global.Setting.storage.set(_this.CONFIG_KEY, cfgStr);
                }
                catch (e) {
                }
                Global.GameData.init(cfg);
            }
        });
        //保存游戏配置
    };
    /** 彩票  开奖售卖信息 */
    HallBroadcastHelper.prototype.DealUpdateLotteryGameData = function (msg) {
        Global.Event.event(GlobalEvent_1.default.LotteryUpdateGameData, [msg.data]);
    };
    /** 彩票 开奖历史 */
    HallBroadcastHelper.prototype.DealUpdateLotteryResult = function (msg) {
        Global.Event.event(GlobalEvent_1.default.LotteryUpdateResult, [msg.data]);
    };
    /** 彩票 订单重新拉取 */
    HallBroadcastHelper.prototype.DealUpdateLotteryOrder = function (msg) {
        Global.Event.event(GlobalEvent_1.default.LotteryUpdateOrder, [msg.data]);
    };
    /**vip玩家进场时候的推送 */
    HallBroadcastHelper.prototype.AddmissionVIp = function (msg) {
        Global.Event.event(GlobalEvent_1.default.TYPE_VIP_ENTER_GAME, msg);
    };
    HallBroadcastHelper.prototype.PrivateMarquee = function (msg) {
        Global.Event.event(GlobalEvent_1.default.TYPE_PRIVATE_MARQUEE, msg);
    };
    HallBroadcastHelper.prototype.loadLocalMd5 = function () {
        var md5 = Global.Setting.storage.get(this.CONFIG_MD5_KEY);
        return md5;
    };
    HallBroadcastHelper.prototype.loadConfig = function () {
        var cfgStr = Global.Setting.storage.get(this.CONFIG_KEY);
        if (cfgStr != null && cfgStr != "") {
            try {
                var cfg = JSON.parse(cfgStr);
                return cfg;
            }
            catch (e) {
                cc.error("解析config 失败");
                return null;
            }
        }
        return null;
    };
    return HallBroadcastHelper;
}());
exports.default = HallBroadcastHelper;

cc._RF.pop();