"use strict";
cc._RF.push(module, '17210G9yMNCX6Vi9MJWJNBF', 'HallHeartbeatHelper');
// hall/scripts/logic/core/net/hall/HallHeartbeatHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HallServer_1 = require("./HallServer");
var NetEvent_1 = require("./NetEvent");
var HallHeartBeatHelper = /** @class */ (function () {
    function HallHeartBeatHelper(server, interalEvent) {
        this.CHECK_HEARTBEAT_INTERVAL = 5;
        //下一次心跳间隔
        this.sendInterval = 0;
        //6秒没收到心跳  则主动发送心跳
        this.lastSendInterval = 6;
        this.lastSendTimeout = 3;
        this.isRunning = false;
        this.netInterval = 0;
        this.server = server;
        this.internalEvent = interalEvent;
        this.setup();
    }
    HallHeartBeatHelper.prototype.setup = function () {
        this.server.on(NetEvent_1.NetOnline.HeartBeat, this, this.onHeartBeat);
        this.internalEvent.on(HallServer_1.default.EVENT_INTERNAL_UPDATEMSGSEQ, this, this.onUpdateMsgseq);
        this.initHeartBeatData();
    };
    // Game *struct {
    //     Gid   int32  `json:"_gid,omitempty"`
    //     Gsc   string `json:"_gsc,omitempty"`
    //     Glv   string `json:"_glv,omitempty"`
    //     Gt    int32  `json:"_gt"`
    //     Chair int32  `json:"_chair"`
    //   } `json:"game,omitempty"` //所在游戏信息, 如果在游戏就将这些信息带上, 不在就不带
    HallHeartBeatHelper.prototype.setSession = function (session) {
        if (session == null)
            this.heartData._param.game = null;
        else {
            var game = {};
            game._gid = session._para._gid;
            game._chair = session._para._chair;
            game._gsc = session._para._gsc;
            game._glv = session._para._glv;
            game._gt = session._para._gt;
            this.heartData._param.game = game;
        }
    };
    HallHeartBeatHelper.prototype.initHeartBeatData = function () {
        this.heartParam = {};
        this.heartParam.filter = {};
        // this.heartParam.filter.appid = Global.Setting.appId;
        this.heartParam.msgseq = 0;
        this.heartParam.max_msg = Global.Setting.boardcastCount;
        this.heartData = {};
        this.heartData._mod = NetEvent_1.NetOnline.mod;
        this.heartData._func = NetEvent_1.NetOnline.HeartBeat;
        this.heartData._param = this.heartParam;
    };
    //登录成功开始
    HallHeartBeatHelper.prototype.run = function () {
        this.isRunning = true;
        this.sendHeartBeat();
    };
    //切换账号是stop
    HallHeartBeatHelper.prototype.stop = function () {
        this.isRunning = false;
        this.heartParam.msgseq = 0;
        this.sendInterval = 0;
        this.lastSendInterval = this.CHECK_HEARTBEAT_INTERVAL;
    };
    HallHeartBeatHelper.prototype.sendHeartBeat = function (extraStr) {
        if (extraStr === void 0) { extraStr = ""; }
        this.lastSendInterval = this.lastSendTimeout + 1;
        this.server.sendHeartBeat(NetEvent_1.NetOnline.mod, NetEvent_1.NetOnline.HeartBeat, this.heartParam, null, null, false, 0, extraStr);
    };
    /**
     * 下次心跳seq
     * @param msgseq
     */
    HallHeartBeatHelper.prototype.onUpdateMsgseq = function (msgseq, msgseq1) {
        this.heartParam.msgseq = msgseq;
        this.heartParam.msgseq_1 = msgseq1;
    };
    /**
     * 心跳消息返回
     * @param msg
     */
    HallHeartBeatHelper.prototype.onHeartBeat = function (param) {
        //设置下次心跳请求时间
        if (param && param.timeout)
            this.sendInterval = param.timeout;
        else
            this.sendInterval = 3;
        this.lastSendTimeout = this.sendInterval;
        //通知广播组件处理
        this.internalEvent.event(HallServer_1.default.EVENT_INTERNAL_ONHEARTBEAT, param);
    };
    HallHeartBeatHelper.prototype.onUpdate = function (dt) {
        if (!this.isRunning)
            return;
        if (this.sendInterval > 0) {
            this.sendInterval -= dt;
            if (this.sendInterval <= 0) {
                this.sendHeartBeat();
            }
        }
        //防止心跳断掉
        this.lastSendInterval -= dt;
        if (this.lastSendInterval < 0) {
            this.sendHeartBeat();
        }
    };
    return HallHeartBeatHelper;
}());
exports.default = HallHeartBeatHelper;

cc._RF.pop();