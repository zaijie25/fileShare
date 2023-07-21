
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/net/hall/HallBroadcastHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXG5ldFxcaGFsbFxcSGFsbEJyb2FkY2FzdEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFzQztBQUV0Qyx1Q0FBd0M7QUFDeEMsaUVBQWlGO0FBQ2pGLGlEQUE0QztBQUM1Qyx5REFBcUQ7QUFLckQsV0FBVztBQUNYLElBQUssY0FvQ0o7QUFwQ0QsV0FBSyxjQUFjO0lBQ2YsNkVBQXVCLENBQUE7SUFDdkIsbUZBQTBCLENBQUE7SUFDMUIsMkVBQXNCLENBQUE7SUFFdEIsK0VBQXdCLENBQUE7SUFDeEIseUVBQXFCLENBQUE7SUFHckIscUZBQTJCLENBQUE7SUFDM0IsdUZBQTRCLENBQUE7SUFDNUIsMkZBQThCLENBQUE7SUFDOUIsdUZBQTRCLENBQUE7SUFFNUIsbUZBQTBCLENBQUE7SUFDMUIsK0ZBQWdDLENBQUE7SUFFaEMsdUVBQW9CLENBQUE7SUFDcEIsdUZBQTRCLENBQUE7SUFDNUIsdUZBQTRCLENBQUE7SUFDNUIsaUZBQXlCLENBQUE7SUFDekIseUZBQTZCLENBQUE7SUFDN0IsK0VBQXdCLENBQUE7SUFDeEIsaUZBQXlCLENBQUE7SUFDekIsdUZBQThCLENBQUE7SUFDOUIsTUFBTTtJQUNOLCtFQUF3QixDQUFBO0lBQ3hCLCtFQUF3QixDQUFBO0lBQ3hCLCtFQUF3QixDQUFBO0lBQ3hCLHlGQUE2QixDQUFBO0lBQzdCLHFGQUEyQixDQUFBO0lBQzNCLG1GQUEwQixDQUFBO0lBRTFCLFdBQVc7SUFDWCxxRkFBMkIsQ0FBQTtJQUMzQix1RkFBNEIsQ0FBQSxDQUFDLFlBQVk7QUFDN0MsQ0FBQyxFQXBDSSxjQUFjLEtBQWQsY0FBYyxRQW9DbEI7QUFFRDtJQVNJLDZCQUFZLE1BQWtCLEVBQUUsYUFBOEI7O1FBUnRELFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBR1osaUJBQVksR0FBUSxF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RCxDQUFDO0lBQ08sNENBQWMsR0FBdEIsVUFBdUIsR0FBRztRQUN0QixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxxQkFBVyxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFDTywwQ0FBWSxHQUFwQjtRQUNJLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUQsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRU8sd0NBQVUsR0FBbEI7UUFDSSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLElBQUksRUFBRSxFQUFFO1lBQ2hDLElBQUk7Z0JBQ0EsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDN0IsT0FBTyxHQUFHLENBQUM7YUFDZDtZQUNELE9BQU8sQ0FBQyxFQUFFO2dCQUNOLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3hCLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTCwwQkFBQztBQUFELENBeFlBLEFBd1lDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGFsbFNlcnZlciBmcm9tIFwiLi9IYWxsU2VydmVyXCI7XHJcbmltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1ld29yay9ldmVudC9FdmVudERpc3BhdGNoZXJcIjtcclxuaW1wb3J0IHsgTmV0QXBwZmFjZSB9IGZyb20gXCIuL05ldEV2ZW50XCI7XHJcbmltcG9ydCBIYWxsTW9kZWwsIHsgSGFsbFJlZFNwb3RUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvSGFsbE1vZGVsXCI7XHJcbmltcG9ydCBHbG9iYWxFdmVudCBmcm9tIFwiLi4vLi4vR2xvYmFsRXZlbnRcIjtcclxuaW1wb3J0IHsgU2NlbmVUeXBlIH0gZnJvbSBcIi4uLy4uL3NjZW5lL1NjZW5lTWFuYWdlclwiO1xyXG5pbXBvcnQgSGFsbFN0b3JhZ2VLZXkgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vY29uc3QvSGFsbFN0b3JhZ2VLZXlcIjtcclxuaW1wb3J0IEFwcEhlbHBlciBmcm9tIFwiLi4vLi4vdG9vbC9BcHBIZWxwZXJcIjtcclxuXHJcblxyXG4vL+acjeWKoeWZqOW5v+aSrea2iOaBr+exu+Wei1xyXG5lbnVtIFNlcnZlclB1c2hUeXBlIHtcclxuICAgIFRZUEVfTUFSUUVFX01TRyA9IDIwMDAwLCAvLyDmma7pgJrot5Hpqaznga/mtojmga9cclxuICAgIFRZUEVfTUFSUUVFX1dJTk5FUiA9IDIwMDAxLCAvLyDot5Hpqaznga/lpKfotaLlrrbmkq3miqXmtojmga9cclxuICAgIFRZUEVfTUFSUUVFX0NQID0gMjAwMDIsIC8vIOW9qeelqOi3kemprOeBr+S/oeaBr1xyXG5cclxuICAgIFRZUEVfVVBEQVRFX0lORk8gPSAyMDAwMywgLy8g5ouJ5Y+W55So5oi36YeR5biB5L+h5oGvXHJcbiAgICBUWVBFX1BVVF9ERU5ZID0gMjAwMDQsIC8vIOaPkOeOsOaLkue7neS/oeaBr1xyXG5cclxuXHJcbiAgICBUWVBFX01BUlFFRV9NQWlsTVNHID0gMjAwMDUsIC8vIOa2iOaBr+e6oueCuVxyXG4gICAgVFlQRV9NQVJRRUVfQUNUaVZFVEUgPSAyMDAwNiwgLy8g5rS75Yqo57qi54K5XHJcbiAgICBUWVBFX01BUlFFRV9IQVZFTk9USUNFID0gMjAwMDcsIC8v5pyJ5paw55qE5YWs5ZGKXHJcbiAgICBUWVBFX01BUlFFRV9IQVZFTUFJTCA9IDIwMDA4LCAvL+acieaWsOeahOmCruS7tiAg6L+Z5Lik5LiqXHJcblxyXG4gICAgVFlQRV9TZW5kRmxvd1BvaW50ID0gMjAwMDksICAgICAvLyDov5TliKnmjqjpgIFcclxuICAgIFRZUEVfTUFSUUVFX1JFQ0hBUkdFR0lGVCA9IDIwMDEwLC8v5YWF5YC86L+U5YipXHJcblxyXG4gICAgVFlQRV9WaXBDb2luID0gMjAwMTEsICAgICAgIC8vdmlw56ev5YiG5Y+Y5YyWXHJcbiAgICBUWVBFX0dBTUVST09NX0NIQU5HRSA9IDIwMDEyLCAvL+aIv+mXtOmFjee9ruWPmOWMllxyXG4gICAgVFlQRV9NQVJRRUVfUEFZX0JBQ0sgPSAyMDAxMywgLy8g5YWF5YC86L+U5Yip5raI5oGvXHJcbiAgICBUWVBFX01BUlFFRV9DT01NSSA9IDIwMDE0LCAvLyDpooblj5bkvaPph5FcclxuICAgIFRZUEVfTkVXX1RBU0tfQUNISUVWRSA9IDIwMDE1LCAgLy/ovr7miJDmlrDnmoTku7vliqFcclxuICAgIFRZUEVfUkVXQVJEX1BBQ0sgPSAyMDAxNywgICAgICAgLy/lpZblirHnuqLljIVcclxuICAgIFRZUEVfUkVDSEFSR0VfUkVEID0gMjAwMTgsICAgICAgIC8v5YWF5YC857qi5YyFXHJcbiAgICBUWVBFX0xJTUlUX0ZJUlNUX1BBWSAgID0gMjAwMjEsIC8v6ZmQ5pe26aaW5YWF5Y+C5LiO6YCa55+lXHJcbiAgICAvL+W9qeelqOebuOWFs1xyXG4gICAgVFlQRV9MT1RURVJZX1RBQiA9IDMwMDAwLCAvL3RhYumHjeaWsOaLieWPllxyXG4gICAgVFlQRV9MT1RURVJZX0NGRyA9IDMwMDAxLCAvL2NmZ+mHjeaWsOaLieWPllxyXG4gICAgVFlQRV9MT1RURVJZX09ERCA9IDMwMDAyLCAvL29kZOmHjeaWsOaLieWPllxyXG4gICAgVFlQRV9MT1RURVJZX0dBTUVEQVRBID0gMzAwMDMsIC8v5byA5aWW5ZSu5Y2W5L+h5oGvXHJcbiAgICBUWVBFX0xPVFRFUllfUkVTVUxUID0gMzAwMDQsIC8v5byA5aWW5Y6G5Y+yXHJcbiAgICBUWVBFX0xPVFRFUllfT1JERVIgPSAzMDAwNSwgLy/orqLljZXph43mlrDmi4nlj5ZcclxuXHJcbiAgICAvLyBWSXDov5vmuLjmiI/mjqjpgIFcclxuICAgIFRZUEVfVklQX0VOVEVSX0dBTUUgPSAyMDAxOSwvLyB2aXDov5vmuLjmiI9cclxuICAgIFRZUEVfUFJJVkFURV9NQVJRVUVFID0gMjAwMjAgLy8g56eB5Lq66LeR6ams54Gv5o6o6YCB5raI5oGvXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhbGxCcm9hZGNhc3RIZWxwZXIge1xyXG4gICAgcHJpdmF0ZSBtc2dzZXEgPSAwO1xyXG4gICAgcHJpdmF0ZSBtc2dzZXExID0gMDtcclxuICAgIHByaXZhdGUgc2VydmVyOiBIYWxsU2VydmVyO1xyXG4gICAgcHJpdmF0ZSBpbnRlcm5hbEV2ZW50OiBFdmVudERpc3BhdGNoZXI7XHJcbiAgICBwcml2YXRlIGNhY2hlSGFsbE1zZzogYW55ID0gW107XHJcbiAgICBwcml2YXRlIENPTkZJR19NRDVfS0VZID0gXCJDT05GSUdfTUQ1X0tFWVwiO1xyXG4gICAgcHJpdmF0ZSBDT05GSUdfS0VZID0gXCJDT05GSUdfS0VZXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2VydmVyOiBIYWxsU2VydmVyLCBpbnRlcm5hbEV2ZW50OiBFdmVudERpc3BhdGNoZXIpIHtcclxuICAgICAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcclxuICAgICAgICB0aGlzLmludGVybmFsRXZlbnQgPSBpbnRlcm5hbEV2ZW50O1xyXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0dXAoKSB7XHJcbiAgICAgICAgdGhpcy5pbnRlcm5hbEV2ZW50Lm9uKEhhbGxTZXJ2ZXIuRVZFTlRfSU5URVJOQUxfT05IRUFSVEJFQVQsIHRoaXMsIHRoaXMuaGFuZGxlSGVhcnRiZWF0KTtcclxuICAgICAgICAvL+ebkeWQrOWcuuaZr+WIh+aNolxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5PTl9IQUxMX09QRU4sIHRoaXMsIHRoaXMuRGVhbENhY2hlSGFsbE1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/miafooYzlpKfljoXnvJPlrZjnmoTmtojmga9cclxuICAgIHByaXZhdGUgRGVhbENhY2hlSGFsbE1zZygpIHtcclxuICAgICAgICBpZiAoR2xvYmFsLlNjZW5lTWFuYWdlci5zY2VuZVR5cGUgIT09IFNjZW5lVHlwZS5IYWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtc2dGdW5jTWFwID0ge31cclxuICAgICAgICBmb3IgKGxldCBtc2cgb2YgdGhpcy5jYWNoZUhhbGxNc2cpIHtcclxuICAgICAgICAgICAgbGV0IG1zZ1R5cGUgPSBtc2cudHlwZTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRlYWxNYXBbbXNnVHlwZV0pIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuacquaJvuWIsGhhbmRsZXJcIiArIG1zZ1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGZ1bmMgPSB0aGlzLmRlYWxNYXBbbXNnVHlwZV0uZnVuY1xyXG4gICAgICAgICAgICBsZXQgbWVyZ2UgPSB0aGlzLmRlYWxNYXBbbXNnVHlwZV0ubWVyZ2U7XHJcbiAgICAgICAgICAgIGlmICghbWVyZ2UpIHtcclxuICAgICAgICAgICAgICAgIGZ1bmMuYXBwbHkodGhpcywgW21zZ10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbXNnRnVuY01hcFttc2dUeXBlXSA9IFtmdW5jLCBtc2ddO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IG1zZ1R5cGUgaW4gbXNnRnVuY01hcCkge1xyXG4gICAgICAgICAgICBsZXQgZnVuYyA9IG1zZ0Z1bmNNYXBbbXNnVHlwZV1bMF07XHJcbiAgICAgICAgICAgIGxldCBtc2cgPSBtc2dGdW5jTWFwW21zZ1R5cGVdWzFdO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZnVuYy5hcHBseSh0aGlzLCBbbXNnXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FjaGVIYWxsTXNnID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRUZXN0RGF0YShtc2dEYXRhOiBhbnkpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/lpITnkIblv4Pot7PlubbliIblj5Hmlrnms5VcclxuICAgIHByaXZhdGUgaGFuZGxlSGVhcnRiZWF0KHBhcmFtKSB7XHJcbiAgICAgICAgbGV0IG1zZ0RhdGEgPSBwYXJhbTtcclxuICAgICAgICBpZiAobXNnRGF0YSA9PSBudWxsIHx8IG1zZ0RhdGEubGlzdCA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIC8v6Kej5p6Q5b+D6Lez5raI5oGvXHJcbiAgICAgICAgbGV0IG1zZ0Z1bmNNYXAgPSB7fVxyXG5cclxuICAgICAgICBpZiAodGhpcy5jaGVja01zZ3NlcShwYXJhbS5tc2dfc2VxXzEsIHRoaXMubXNnc2VxMSkpIHtcclxuICAgICAgICAgICAgaWYgKHBhcmFtLm1zZ19zZXFfMSAmJiBwYXJhbS5tc2dfc2VxXzEgPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tc2dzZXExID0gcGFyYW0ubXNnX3NlcV8xO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1zZ0xpc3QobXNnRGF0YS5saXN0XzEsIG1zZ0Z1bmNNYXAsIDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tNc2dzZXEocGFyYW0ubXNnX3NlcSwgdGhpcy5tc2dzZXEpKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbS5tc2dfc2VxICYmIHBhcmFtLm1zZ19zZXEgPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tc2dzZXEgPSBwYXJhbS5tc2dfc2VxO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU1zZ0xpc3QobXNnRGF0YS5saXN0LCBtc2dGdW5jTWFwKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8v5omn6KGM5a+55bqU5b+D6Lez5ZCI5bm25pa55rOVXHJcbiAgICAgICAgZm9yIChsZXQgbXNnVHlwZSBpbiBtc2dGdW5jTWFwKSB7XHJcbiAgICAgICAgICAgIGxldCBmdW5jID0gbXNnRnVuY01hcFttc2dUeXBlXVswXTtcclxuICAgICAgICAgICAgbGV0IG1zZyA9IG1zZ0Z1bmNNYXBbbXNnVHlwZV1bMV07XHJcbiAgICAgICAgICAgIGZ1bmMuYXBwbHkodGhpcywgW21zZ10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WmguaenOWcqOWkp+WOheS4reWImeebtOaOpeWkhOeQhlxyXG4gICAgICAgIHRoaXMuRGVhbENhY2hlSGFsbE1zZygpO1xyXG4gICAgICAgIC8v6K6+572u5LiL5qyh5b+D6Lez5Y+R6YCB55qEc2VxXHJcbiAgICAgICAgdGhpcy5pbnRlcm5hbEV2ZW50LmV2ZW50KEhhbGxTZXJ2ZXIuRVZFTlRfSU5URVJOQUxfVVBEQVRFTVNHU0VRLCB0aGlzLm1zZ3NlcSwgdGhpcy5tc2dzZXExKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrTXNnc2VxKHNlcnZlclNlcSwgbG9jYWxNc2dTZXEpIHtcclxuICAgICAgICBpZiAoc2VydmVyU2VxXHJcbiAgICAgICAgICAgICYmIHNlcnZlclNlcSA+IDAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+S4jeetiTBcclxuICAgICAgICAgICAgJiYgKGxvY2FsTXNnU2VxID49IHNlcnZlclNlcSkgICAgICAgICAgICAgIC8v5bCP5LqO562J5LqO5pys5Zywc2VxXHJcbiAgICAgICAgICAgICYmIChsb2NhbE1zZ1NlcSAtIHNlcnZlclNlcSA8IDEwMDApKSAgICAgIC8v5beu5YC85bCP5LqOMTAwMFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZU1zZ0xpc3QobGlzdCwgbXNnRnVuY01hcCwgcHJpb3JpdHkgPSAwKSB7XHJcbiAgICAgICAgaWYgKGxpc3QgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoXCJsaXN0PT09PT09PT09PT09PT09PT09PVwiLGxpc3QpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBlbGVtZW50IG9mIGxpc3QpIHtcclxuICAgICAgICAgICAgLy8gLy/liKTmlq3mnInmlYhzZXFcclxuICAgICAgICAgICAgLy8gaWYoIGVsZW1lbnQubXNnc2VxIFxyXG4gICAgICAgICAgICAvLyAgICAgJiYgZWxlbWVudC5tc2dzZXEgPiAwICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/kuI3nrYkwXHJcbiAgICAgICAgICAgIC8vICAgICAmJiAodGhpcy5tc2dzZXEgPj0gZWxlbWVudC5tc2dzZXEpICAgICAgICAgICAgICAvL+Wwj+S6juetieS6juacrOWcsHNlcVxyXG4gICAgICAgICAgICAvLyAgICAgJiYgKHRoaXMubXNnc2VxIC0gZWxlbWVudC5tc2dzZXEgPCAxMDAwKSApICAgICAgLy/lt67lgLzlsI/kuo4xMDAwXHJcbiAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgLy8gICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8vIGVsc2UgaWYoZWxlbWVudC5tc2dzZXEgJiYgZWxlbWVudC5tc2dzZXEgPiAwKVxyXG4gICAgICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLm1zZ3NlcSA9IGVsZW1lbnQubXNnc2VxO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIC8v5omn6KGM5raI5oGv5a+55bqU5pa55rOVXHJcblxyXG4gICAgICAgICAgICBsZXQgbXNnID0gZWxlbWVudC5tc2c7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW1zZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG1zZ1R5cGUgPSBtc2cudHlwZTtcclxuICAgICAgICAgICAgaWYgKG1zZy5kYXRhICYmIHR5cGVvZiAobXNnLmRhdGEpICE9IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIG1zZy5kYXRhLmNsaWVudFByaW9yaXR5ID0gcHJpb3JpdHlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRlYWxNYXBbbXNnVHlwZV0pIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuacquaJvuWIsGhhbmRsZXJcIiArIG1zZ1R5cGUpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGZ1bmMgPSB0aGlzLmRlYWxNYXBbbXNnVHlwZV0uZnVuY1xyXG4gICAgICAgICAgICBsZXQgbWVyZ2UgPSB0aGlzLmRlYWxNYXBbbXNnVHlwZV0ubWVyZ2U7XHJcbiAgICAgICAgICAgIGxldCBpbkhhbGwgPSB0aGlzLmRlYWxNYXBbbXNnVHlwZV0uY2FjaGVJbkhhbGw7XHJcbiAgICAgICAgICAgIGlmIChpbkhhbGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVIYWxsTXNnLnB1c2gobXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghbWVyZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBmdW5jLmFwcGx5KHRoaXMsIFttc2ddKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG1zZ0Z1bmNNYXBbbXNnVHlwZV0gPSBbZnVuYywgbXNnXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5tc2dzZXEgPSAwO1xyXG4gICAgICAgIHRoaXMubXNnc2VxMSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8v5pyN5Yqh5Zmo5bm/5pKt5raI5oGv5ZKM5aSE55CG5pa55rOV5a+55bqU5pWw57uELOaUr+aMgWZ1bmN0aW9uIOWSjCBoYW5kbGVyXHJcbiAgICBwcml2YXRlIGRlYWxNYXA6IHsgW2tleTogbnVtYmVyXTogYW55IH0gPVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgW1NlcnZlclB1c2hUeXBlLlRZUEVfUFJJVkFURV9NQVJRVUVFXTogeyBcImZ1bmNcIjogdGhpcy5Qcml2YXRlTWFycXVlZSwgbWVyZ2U6IGZhbHNlIH0sLy/np4Hkurrot5Hpqaznga/kv6Hmga9cclxuICAgICAgICAgICAgW1NlcnZlclB1c2hUeXBlLlRZUEVfVklQX0VOVEVSX0dBTUVdOiB7IFwiZnVuY1wiOiB0aGlzLkFkZG1pc3Npb25WSXAsIG1lcmdlOiBmYWxzZSB9LC8vVklw6L+b5ri45oiP5raI5oGvXHJcbiAgICAgICAgICAgIFtTZXJ2ZXJQdXNoVHlwZS5UWVBFX01BUlFFRV9NU0ddOiB7IFwiZnVuY1wiOiB0aGlzLkRlYWxNYXJxdWVlU2Nyb2xsLCBtZXJnZTogZmFsc2UgfSwgLy/mma7pgJrot5Hpqaznga/mtojmga9cclxuICAgICAgICAgICAgW1NlcnZlclB1c2hUeXBlLlRZUEVfTUFSUUVFX1dJTk5FUl06IHsgXCJmdW5jXCI6IHRoaXMuRGVhbE1hcnF1ZWVTY3JvbGwsIG1lcmdlOiBmYWxzZSB9LCAvL+Wkp+i1ouWutui3kemprOeBr+a2iOaBr1xyXG4gICAgICAgICAgICBbU2VydmVyUHVzaFR5cGUuVFlQRV9NQVJRRUVfQ1BdOiB7IFwiZnVuY1wiOiB0aGlzLkRlYWxNYXJxdWVlU2Nyb2xsLCBtZXJnZTogZmFsc2UgfSwgLy/lvannpajot5Hpqaznga/kv6Hmga9cclxuXHJcbiAgICAgICAgICAgIFtTZXJ2ZXJQdXNoVHlwZS5UWVBFX01BUlFFRV9QQVlfQkFDS106IHsgXCJmdW5jXCI6IHRoaXMuRGVhbE1hcnF1ZWVTY3JvbGwsIG1lcmdlOiBmYWxzZSB9LCAvL+WFheWAvOi/lOWIqea2iOaBr1xyXG5cclxuICAgICAgICAgICAgW1NlcnZlclB1c2hUeXBlLlRZUEVfTUFSUUVFX0NPTU1JXTogeyBcImZ1bmNcIjogdGhpcy5EZWFsTWFycXVlZVNjcm9sbCwgbWVyZ2U6IGZhbHNlIH0sIC8v6aKG5Y+W5L2j6YeRXHJcblxyXG4gICAgICAgICAgICBbU2VydmVyUHVzaFR5cGUuVFlQRV9VUERBVEVfSU5GT106IHsgXCJmdW5jXCI6IHRoaXMuRGVhbFVwZGF0ZVBsYXllck1vbmV5SW5mbywgbWVyZ2U6IHRydWUgfSwgLy/mi4nlj5bnlKjmiLfph5HluIHkv6Hmga9cclxuXHJcbiAgICAgICAgICAgIFtTZXJ2ZXJQdXNoVHlwZS5UWVBFX01BUlFFRV9IQVZFTUFJTF06IHsgXCJmdW5jXCI6IHRoaXMuRGVhbFVwZGF0ZU1BaWxNU0csIG1lcmdlOiB0cnVlIH0sIC8v5raI5oGv57qi54K5XHJcbiAgICAgICAgICAgIFtTZXJ2ZXJQdXNoVHlwZS5UWVBFX0xJTUlUX0ZJUlNUX1BBWV06IHsgXCJmdW5jXCI6IHRoaXMuRGVhbFVwZGF0ZUhhbGxCdG4sIG1lcmdlOiB0cnVlIH0sIC8v5raI5oGv57qi54K5XHJcbiAgICAgICAgICAgIFtTZXJ2ZXJQdXNoVHlwZS5UWVBFX05FV19UQVNLX0FDSElFVkVdOiB7IFwiZnVuY1wiOiB0aGlzLkRlYWxVcGRhdE5ld1Rhc2ssIG1lcmdlOiB0cnVlIH0sIC8v5paw55qE5Lu75Yqh6L6+5oiQXHJcbiAgICAgICAgICAgIFtTZXJ2ZXJQdXNoVHlwZS5UWVBFX1JFV0FSRF9QQUNLXTogeyBcImZ1bmNcIjogdGhpcy5EZWFsVXBkYXRSZWRFbnZlbG9wZSwgbWVyZ2U6IHRydWUgfSwgIC8v5aWW5Yqx57qi5YyFXHJcbiAgICAgICAgICAgIFtTZXJ2ZXJQdXNoVHlwZS5UWVBFX1JFQ0hBUkdFX1JFRF06IHsgXCJmdW5jXCI6IHRoaXMuRGVhbFVwZGF0SGFsbFJlZCwgbWVyZ2U6IHRydWUgfSwgICAgIC8v5YWF5YC857qi5YyFXHJcbiAgICAgICAgICAgIFtTZXJ2ZXJQdXNoVHlwZS5UWVBFX01BUlFFRV9BQ1RpVkVURV06IHsgXCJmdW5jXCI6IHRoaXMuRGVhbFVwZGF0ZUFDVGlWRVRFLCBtZXJnZTogdHJ1ZSB9LCAvL+a0u+WKqOe6oueCuVxyXG4gICAgICAgICAgICBbU2VydmVyUHVzaFR5cGUuVFlQRV9NQVJRRUVfSEFWRU5PVElDRV06IHsgXCJmdW5jXCI6IHRoaXMuRGVhbFVwZGF0ZU5vdGljZSwgbWVyZ2U6IHRydWUgfSwgLy/lhazlkYrnuqLngrlcclxuICAgICAgICAgICAgLy8gW1NlcnZlclB1c2hUeXBlLlRZUEVfTUFSUUVFX1JFQ0hBUkdFR0lGVF06IHtcImZ1bmNcIjp0aGlzLkRlYWxSZWNoYXJnZUdpZnRNU0csIG1lcmdlOnRydWV9LFxyXG4gICAgICAgICAgICAvLyBbU2VydmVyUHVzaFR5cGUuVFlQRV9TZW5kRmxvd1BvaW50XToge1wiZnVuY1wiOnRoaXMuRGVhbFJlYmF0ZU1zZywgbWVyZ2U6ZmFsc2UsIGNhY2hlSW5IYWxsOiB0cnVlfSwgLy/ov5TliKlcclxuXHJcbiAgICAgICAgICAgIFtTZXJ2ZXJQdXNoVHlwZS5UWVBFX1ZpcENvaW5dOiB7IFwiZnVuY1wiOiB0aGlzLkRlYWxWaXBNc2csIG1lcmdlOiB0cnVlIH0sIC8vdmlw56ev5YiG5Y+Y5YyWXHJcblxyXG4gICAgICAgICAgICAvL+W9qeelqOebuOWFs1xyXG4gICAgICAgICAgICBbU2VydmVyUHVzaFR5cGUuVFlQRV9MT1RURVJZX1RBQl06IHsgXCJmdW5jXCI6IHRoaXMuRGVhbFVwZGF0ZUxvdHRlcnlUYWIsIG1lcmdlOiB0cnVlIH0sIC8vdGFi6YeN5paw5ouJ5Y+WXHJcbiAgICAgICAgICAgIFtTZXJ2ZXJQdXNoVHlwZS5UWVBFX0xPVFRFUllfQ0ZHXTogeyBcImZ1bmNcIjogdGhpcy5EZWFsVXBkYXRlTG90dGVyeUNmZywgbWVyZ2U6IHRydWUgfSwgLy9jZmfph43mlrDmi4nlj5ZcclxuICAgICAgICAgICAgW1NlcnZlclB1c2hUeXBlLlRZUEVfTE9UVEVSWV9PRERdOiB7IFwiZnVuY1wiOiB0aGlzLkRlYWxVcGRhdGVMb3R0ZXJ5T2RkcywgbWVyZ2U6IHRydWUgfSwgLy9vZGTph43mlrDmi4nlj5ZcclxuICAgICAgICAgICAgW1NlcnZlclB1c2hUeXBlLlRZUEVfTE9UVEVSWV9HQU1FREFUQV06IHsgXCJmdW5jXCI6IHRoaXMuRGVhbFVwZGF0ZUxvdHRlcnlHYW1lRGF0YSwgbWVyZ2U6IHRydWUgfSwgLy/lvIDlpZbllK7ljZbkv6Hmga9cclxuICAgICAgICAgICAgW1NlcnZlclB1c2hUeXBlLlRZUEVfTE9UVEVSWV9SRVNVTFRdOiB7IFwiZnVuY1wiOiB0aGlzLkRlYWxVcGRhdGVMb3R0ZXJ5UmVzdWx0LCBtZXJnZTogdHJ1ZSB9LCAvL+W8gOWlluWOhuWPslxyXG4gICAgICAgICAgICBbU2VydmVyUHVzaFR5cGUuVFlQRV9MT1RURVJZX09SREVSXTogeyBcImZ1bmNcIjogdGhpcy5EZWFsVXBkYXRlTG90dGVyeU9yZGVyLCBtZXJnZTogdHJ1ZSB9LCAvL+iuouWNlemHjeaWsOaLieWPllxyXG4gICAgICAgICAgICBbU2VydmVyUHVzaFR5cGUuVFlQRV9HQU1FUk9PTV9DSEFOR0VdOiB7IFwiZnVuY1wiOiB0aGlzLkRlYWxOZXdHYW1lQ2ZnLCBtZXJnZTogdHJ1ZSB9LCAvL+aZrumAmui3kemprOeBr+a2iOaBr1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAvL+W5v+aSrei3kemprOeBr1xyXG4gICAgcHJpdmF0ZSBEZWFsTWFycXVlZVNjcm9sbChtc2cpIHtcclxuICAgICAgICBzd2l0Y2ggKG1zZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU2VydmVyUHVzaFR5cGUuVFlQRV9NQVJRRUVfTVNHOiAvL+aZrumAmui3kemprOeBr1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5NQVJRVUVFU0NST0xMX0NPTU1PTiwgbXNnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBTZXJ2ZXJQdXNoVHlwZS5UWVBFX01BUlFFRV9XSU5ORVI6IC8v5aSn6LWi5a626LeR6ams54GvXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICogLy/lpKfotaLlrrYsIOebtOaOpeaOqOmAgee7meWuouaIt+errywg5a6i5oi356uv5p2l5ou8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgQmlnV2lubmVyIHN0cnVjdCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFVpZCAgICAgICB1aW50NjQgYGpzb246XCItXCJgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEhpdFBvaW50ICBpbnQ2NCAgYGpzb246XCJoaXRQb2ludFwiYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBOaWNrbmFtZSAgc3RyaW5nIGBqc29uOlwibmlja25hbWVcImBcclxuICAgICAgICAgICAgICAgICAgICAgICAgSGVhZGltZyAgIHN0cmluZyBganNvbjpcImhlYWRpbWdcImBcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZUlkICAgIGludDMyICBganNvbjpcImdhbWVfaWRcImBcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZVJ1bGUgIHN0cmluZyBganNvbjpcImdhbWVfcnVsZVwiYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lTGV2ZWwgc3RyaW5nIGBqc29uOlwiZ2FtZV9sZXZlbFwiYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50Lk1BUlFVRUVTQ1JPTExfQklHV0lOTkVSLCBtc2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFNlcnZlclB1c2hUeXBlLlRZUEVfTUFSUUVFX1BBWV9CQUNLOiAvL1ZJUOi/lOWIqemprOeBr1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5NQVJRVUVFU0NST0xMX1ZJUCwgbXNnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhc2UgU2VydmVyUHVzaFR5cGUuVFlQRV9NQVJRRUVfQ09NTUk6IC8vVklQ6L+U5Yip6ams54GvXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50Lk1BUlFVRUVTQ1JPTExfQ09NTUksIG1zZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5ouJ5Y+W55So5oi36YeR5biB5L+h5oGvXHJcbiAgICBwcml2YXRlIERlYWxVcGRhdGVQbGF5ZXJNb25leUluZm8obXNnKSB7XHJcbiAgICAgICBcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkdldFVzZXJQb2ludCwge30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5raI5oGv57qi54K5XHJcbiAgICBwcml2YXRlIERlYWxVcGRhdGVNQWlsTVNHKG1zZykge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TaG93UmVkU3BvdCwgW3RydWUsIEhhbGxSZWRTcG90VHlwZS5NYWlsXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mtojmga/nuqLngrlcclxuICAgIHByaXZhdGUgRGVhbFVwZGF0ZUhhbGxCdG4obXNnKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlRpbWVMaW1pdGVkUmVjaGFyZ2VTdGF0dXNDaGFuZ2UsZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Lu75Yqh57qi54K5XHJcbiAgICBwcml2YXRlIERlYWxVcGRhdE5ld1Rhc2sobXNnKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNob3dSZWRTcG90LCBbdHJ1ZSwgSGFsbFJlZFNwb3RUeXBlLkNvbW1pc2lvbl0pO1xyXG4gICAgfVxyXG4gICAgLy/ojrflj5bnuqLljIXkuKrmlbBcclxuICAgIHByaXZhdGUgRGVhbFVwZGF0UmVkRW52ZWxvcGUobXNnKSB7XHJcbiAgICAgICAgbGV0IG1vZGVsID0gPEhhbGxNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiSGFsbE1vZGVsXCIpO1xyXG4gICAgICAgIG1vZGVsLnJlcXVlc3RHZXRSZXdhcmRQYWNrQ291bnQoKVxyXG4gICAgfVxyXG4gICAgLy/lpKfljoXlhYXlgLznuqLljIVcclxuICAgIHByaXZhdGUgRGVhbFVwZGF0SGFsbFJlZChtc2cpIHtcclxuICAgICAgICBsZXQgbW9kZWwgPSA8SGFsbE1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJIYWxsTW9kZWxcIik7XHJcbiAgICAgICAgbW9kZWwucmVjaGFyZ2VfcmVkID0gbXNnLmRhdGE7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNob3dIYWxsUmVkLCBtc2cuZGF0YSk7XHJcbiAgICAgICAgLy8gbW9kZWwucmVxdWVzdEdldFJld2FyZFBhY2tDb3VudCgpXHJcbiAgICB9XHJcbiAgICAvL+a0u+WKqOe6oueCuVxyXG4gICAgcHJpdmF0ZSBEZWFsVXBkYXRlQUNUaVZFVEUobXNnKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNob3dSZWRTcG90LCBbZmFsc2UsIEhhbGxSZWRTcG90VHlwZS5BY3Rpdml0eV0pO1xyXG4gICAgfVxyXG4gICAgLy/mtLvliqjnuqLngrlcclxuICAgIHByaXZhdGUgRGVhbFVwZGF0ZU5vdGljZShtc2cpIHtcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU2hvd1JlZFNwb3QsIFt0cnVlLCBIYWxsUmVkU3BvdFR5cGUuR29uZ2dhb10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHByaXZhdGUgRGVhbFJlYmF0ZU1zZyhtc2cpe1xyXG4gICAgLy8gICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TaG93UmVkU3BvdCwgW3RydWUsSGFsbFJlZFNwb3RUeXBlLlJlYmF0ZV0pO1xyXG4gICAgLy8gICAgIGlmIChtc2cgJiYgbXNnLmRhdGEpe1xyXG4gICAgLy8gICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU0hPV19SRUJBVEVfR0VULCBtc2cuZGF0YSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdmlw56ev5YiG5Y+Y5YyW5aSE55CGXHJcbiAgICAgKiBAcGFyYW0gbXNnIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIERlYWxWaXBNc2cobXNnKSB7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRVc2VySW5mbywge30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlvannpaggdGFi6YeN5paw5ouJ5Y+WICovXHJcbiAgICBwcml2YXRlIERlYWxVcGRhdGVMb3R0ZXJ5VGFiKG1zZykge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5Mb3R0ZXJ5VXBkYXRlVGFiLCBbbXNnLmRhdGFdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5b2p56WoIGNmZ+mHjeaWsOaLieWPliAqL1xyXG4gICAgcHJpdmF0ZSBEZWFsVXBkYXRlTG90dGVyeUNmZyhtc2cpIHtcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuTG90dGVyeVVwZGF0ZUNmZywgW21zZy5kYXRhXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOW9qeelqCBvZGTph43mlrDmi4nlj5YgKi9cclxuICAgIHByaXZhdGUgRGVhbFVwZGF0ZUxvdHRlcnlPZGRzKG1zZykge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5Mb3R0ZXJ5VXBkYXRlT2RkcywgW21zZy5kYXRhXSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKiDph43mlrDmi4nlj5bmuLjmiI/phY3nva4gKi9cclxuICAgIHByaXZhdGUgRGVhbE5ld0dhbWVDZmcobXNnKSB7XHJcbiAgICAgICAgbGV0IG1kNSA9IHRoaXMubG9hZExvY2FsTWQ1KCk7XHJcbiAgICAgICAgbGV0IGNmZyA9IG51bGw7XHJcbiAgICAgICAgbGV0IHBhcmFtOiBhbnkgPSB7fTtcclxuICAgICAgICBpZiAobWQ1ICYmIG1kNSAhPSBcIlwiKVxyXG4gICAgICAgICAgICBjZmcgPSB0aGlzLmxvYWRDb25maWcoKTtcclxuXHJcbiAgICAgICAgaWYgKGNmZyAhPSBudWxsICYmIGNmZy5sZW5ndGggPiAwICYmIG1kNSkge1xyXG4gICAgICAgICAgICBwYXJhbS5nYW1lX3N1bSA9IG1kNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRldmljZSA9IEdsb2JhbC5Ub29sa2l0LmdlbkRldmljZUluZm8oKTtcclxuICAgICAgICBwYXJhbS5kZXZpY2UgPSBkZXZpY2VcclxuICAgICAgICBwYXJhbS5oYWxsX3NraW4gPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmhhbGxTa2luO1xyXG4gICAgICAgIHBhcmFtLmdhbWVfc2tpbiA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uZ2FtZVNraW47XHJcbiAgICAgICAgcGFyYW0uYXBwX3ZlcnNpb24gPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcFZlcnNpb25cclxuICAgICAgICBsZXQgbWVnZVNlcnZlckZsYWcgPSBHbG9iYWwuVG9vbGtpdC5jaGVja01lZ2VTZXJ2ZXIoKVxyXG4gICAgICAgIGlmIChtZWdlU2VydmVyRmxhZykge1xyXG4gICAgICAgICAgICBwYXJhbS5vbGRfYXBwX2lkID0gcGFyc2VJbnQoR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5hcHBJRClcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRHYW1lTGlzdCwgcGFyYW0sIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmdhbWVfbGlzdCAhPSBudWxsICYmIGRhdGEuZ2FtZV9saXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNmZyA9IGRhdGEuZ2FtZV9saXN0O1xyXG4gICAgICAgICAgICAgICAgbGV0IHN2ck1kNSA9IGRhdGEuZ2FtZV9zdW07XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjZmdTdHIgPSBKU09OLnN0cmluZ2lmeShkYXRhLmdhbWVfbGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdnJNZDUgfHwgc3ZyTWQ1ID09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN2ck1kNSA9IEdsb2JhbC5Ub29sa2l0Lm1kNShjZmdTdHIpO1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0KHRoaXMuQ09ORklHX01ENV9LRVksIHN2ck1kNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXQodGhpcy5DT05GSUdfS0VZLCBjZmdTdHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEdsb2JhbC5HYW1lRGF0YS5pbml0KGNmZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvL+S/neWtmOa4uOaIj+mFjee9rlxyXG4gICAgfVxyXG4gICAgLyoqIOW9qeelqCAg5byA5aWW5ZSu5Y2W5L+h5oGvICovXHJcbiAgICBwcml2YXRlIERlYWxVcGRhdGVMb3R0ZXJ5R2FtZURhdGEobXNnKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkxvdHRlcnlVcGRhdGVHYW1lRGF0YSwgW21zZy5kYXRhXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOW9qeelqCDlvIDlpZbljoblj7IgKi9cclxuICAgIHByaXZhdGUgRGVhbFVwZGF0ZUxvdHRlcnlSZXN1bHQobXNnKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkxvdHRlcnlVcGRhdGVSZXN1bHQsIFttc2cuZGF0YV0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlvannpagg6K6i5Y2V6YeN5paw5ouJ5Y+WICovXHJcbiAgICBwcml2YXRlIERlYWxVcGRhdGVMb3R0ZXJ5T3JkZXIobXNnKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkxvdHRlcnlVcGRhdGVPcmRlciwgW21zZy5kYXRhXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqdmlw546p5a626L+b5Zy65pe25YCZ55qE5o6o6YCBICovXHJcbiAgICBwcml2YXRlIEFkZG1pc3Npb25WSXAobXNnKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlRZUEVfVklQX0VOVEVSX0dBTUUsIG1zZylcclxuICAgIH1cclxuICAgIHByaXZhdGUgUHJpdmF0ZU1hcnF1ZWUobXNnKSB7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlRZUEVfUFJJVkFURV9NQVJRVUVFLCBtc2cpXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGxvYWRMb2NhbE1kNSgpIHtcclxuICAgICAgICBsZXQgbWQ1ID0gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQodGhpcy5DT05GSUdfTUQ1X0tFWSk7XHJcbiAgICAgICAgcmV0dXJuIG1kNTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRDb25maWcoKSB7XHJcbiAgICAgICAgbGV0IGNmZ1N0ciA9IEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0KHRoaXMuQ09ORklHX0tFWSk7XHJcbiAgICAgICAgaWYgKGNmZ1N0ciAhPSBudWxsICYmIGNmZ1N0ciAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2ZnID0gSlNPTi5wYXJzZShjZmdTdHIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNmZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoXCLop6PmnpBjb25maWcg5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==