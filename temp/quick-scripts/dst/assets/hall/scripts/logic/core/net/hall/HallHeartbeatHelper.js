
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/net/hall/HallHeartbeatHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXG5ldFxcaGFsbFxcSGFsbEhlYXJ0YmVhdEhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFzQztBQUN0Qyx1Q0FBdUM7QUFHdkM7SUF3QkksNkJBQVksTUFBaUIsRUFBRSxZQUE0QjtRQXRCbkQsNkJBQXdCLEdBQUcsQ0FBQyxDQUFDO1FBVXJDLFNBQVM7UUFDRCxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUN6QixrQkFBa0I7UUFDVixxQkFBZ0IsR0FBRyxDQUFDLENBQUE7UUFFcEIsb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFFcEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUduQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUluQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVNLG1DQUFLLEdBQVo7UUFFSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxvQkFBUyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLG9CQUFVLENBQUMsMkJBQTJCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUN4RixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLDJDQUEyQztJQUMzQywyQ0FBMkM7SUFDM0MsMkNBQTJDO0lBQzNDLGdDQUFnQztJQUNoQyxtQ0FBbUM7SUFDbkMsNkRBQTZEO0lBQ3RELHdDQUFVLEdBQWpCLFVBQWtCLE9BQU87UUFFckIsSUFBRyxPQUFPLElBQUksSUFBSTtZQUNkLElBQUksQ0FB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SSxDQUFDLFlBQVksQ0FBQztRQUN6QyxVQUFVO1FBQ1YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsb0JBQVUsQ0FBQywwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRU0sc0NBQVEsR0FBZixVQUFnQixFQUFFO1FBRWQsSUFBRyxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ2QsT0FBTztRQUNYLElBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLEVBQ3hCO1lBQ0ksSUFBSSxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7WUFDeEIsSUFBRyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsRUFDekI7Z0JBQ0ksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3hCO1NBQ0o7UUFFRCxRQUFRO1FBQ1IsSUFBSSxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQztRQUM1QixJQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEVBQzVCO1lBQ0ksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO1NBQ3ZCO0lBQ0wsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FqSkEsQUFpSkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIYWxsU2VydmVyIGZyb20gXCIuL0hhbGxTZXJ2ZXJcIjtcclxuaW1wb3J0IHsgTmV0T25saW5lIH0gZnJvbSBcIi4vTmV0RXZlbnRcIjtcclxuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWV3b3JrL2V2ZW50L0V2ZW50RGlzcGF0Y2hlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFsbEhlYXJ0QmVhdEhlbHBlclxyXG57XHJcbiAgICBwcml2YXRlIENIRUNLX0hFQVJUQkVBVF9JTlRFUlZBTCA9IDU7XHJcbiAgICAvL+W/g+i3s+S9v+eUqOWQjOS4gOS4quaVsOaNruWMhVxyXG4gICAgLy/mlbDmja7ljIXlhoXnmoRwYXJhbSBcclxuICAgIHByaXZhdGUgaGVhcnREYXRhOmFueTtcclxuICAgIHByaXZhdGUgaGVhcnRQYXJhbTphbnk7XHJcblxyXG4gICAgcHJpdmF0ZSBzZXJ2ZXI6SGFsbFNlcnZlcjtcclxuICAgIC8v6LSf6LSjaGFsbFNldmVyIOe7hOS7tumXtOmAmuS/oVxyXG4gICAgcHJpdmF0ZSBpbnRlcm5hbEV2ZW50OkV2ZW50RGlzcGF0Y2hlcjtcclxuXHJcbiAgICAvL+S4i+S4gOasoeW/g+i3s+mXtOmalFxyXG4gICAgcHJpdmF0ZSBzZW5kSW50ZXJ2YWwgPSAwO1xyXG4gICAgLy8256eS5rKh5pS25Yiw5b+D6LezICDliJnkuLvliqjlj5HpgIHlv4Pot7NcclxuICAgIHByaXZhdGUgbGFzdFNlbmRJbnRlcnZhbCA9IDZcclxuXHJcbiAgICBwcml2YXRlIGxhc3RTZW5kVGltZW91dCA9IDM7XHJcblxyXG4gICAgcHJpdmF0ZSBpc1J1bm5pbmcgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgcHVibGljIG5ldEludGVydmFsID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzZXJ2ZXI6SGFsbFNlcnZlciwgaW50ZXJhbEV2ZW50OkV2ZW50RGlzcGF0Y2hlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcclxuICAgICAgICB0aGlzLmludGVybmFsRXZlbnQgPSBpbnRlcmFsRXZlbnQ7XHJcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXR1cCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXIub24oTmV0T25saW5lLkhlYXJ0QmVhdCwgdGhpcywgdGhpcy5vbkhlYXJ0QmVhdCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcm5hbEV2ZW50Lm9uKEhhbGxTZXJ2ZXIuRVZFTlRfSU5URVJOQUxfVVBEQVRFTVNHU0VRLCB0aGlzLCB0aGlzLm9uVXBkYXRlTXNnc2VxKVxyXG4gICAgICAgIHRoaXMuaW5pdEhlYXJ0QmVhdERhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBHYW1lICpzdHJ1Y3Qge1xyXG4gICAgLy8gICAgIEdpZCAgIGludDMyICBganNvbjpcIl9naWQsb21pdGVtcHR5XCJgXHJcbiAgICAvLyAgICAgR3NjICAgc3RyaW5nIGBqc29uOlwiX2dzYyxvbWl0ZW1wdHlcImBcclxuICAgIC8vICAgICBHbHYgICBzdHJpbmcgYGpzb246XCJfZ2x2LG9taXRlbXB0eVwiYFxyXG4gICAgLy8gICAgIEd0ICAgIGludDMyICBganNvbjpcIl9ndFwiYFxyXG4gICAgLy8gICAgIENoYWlyIGludDMyICBganNvbjpcIl9jaGFpclwiYFxyXG4gICAgLy8gICB9IGBqc29uOlwiZ2FtZSxvbWl0ZW1wdHlcImAgLy/miYDlnKjmuLjmiI/kv6Hmga8sIOWmguaenOWcqOa4uOaIj+WwseWwhui/meS6m+S/oeaBr+W4puS4iiwg5LiN5Zyo5bCx5LiN5bimXHJcbiAgICBwdWJsaWMgc2V0U2Vzc2lvbihzZXNzaW9uKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHNlc3Npb24gPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5oZWFydERhdGEuX3BhcmFtLmdhbWUgPSBudWxsXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGdhbWU6YW55ID0ge31cclxuICAgICAgICAgICAgZ2FtZS5fZ2lkID0gc2Vzc2lvbi5fcGFyYS5fZ2lkO1xyXG4gICAgICAgICAgICBnYW1lLl9jaGFpciA9IHNlc3Npb24uX3BhcmEuX2NoYWlyO1xyXG4gICAgICAgICAgICBnYW1lLl9nc2MgPSBzZXNzaW9uLl9wYXJhLl9nc2M7XHJcbiAgICAgICAgICAgIGdhbWUuX2dsdiA9IHNlc3Npb24uX3BhcmEuX2dsdjtcclxuICAgICAgICAgICAgZ2FtZS5fZ3QgPSBzZXNzaW9uLl9wYXJhLl9ndDtcclxuICAgICAgICAgICAgdGhpcy5oZWFydERhdGEuX3BhcmFtLmdhbWUgPSBnYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBpbml0SGVhcnRCZWF0RGF0YSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5oZWFydFBhcmFtID0ge31cclxuICAgICAgICB0aGlzLmhlYXJ0UGFyYW0uZmlsdGVyID0ge31cclxuICAgICAgICAvLyB0aGlzLmhlYXJ0UGFyYW0uZmlsdGVyLmFwcGlkID0gR2xvYmFsLlNldHRpbmcuYXBwSWQ7XHJcbiAgICAgICAgdGhpcy5oZWFydFBhcmFtLm1zZ3NlcSA9IDA7XHJcbiAgICAgICAgdGhpcy5oZWFydFBhcmFtLm1heF9tc2cgPSBHbG9iYWwuU2V0dGluZy5ib2FyZGNhc3RDb3VudDtcclxuXHJcbiAgICAgICAgdGhpcy5oZWFydERhdGEgPSB7fVxyXG4gICAgICAgIHRoaXMuaGVhcnREYXRhLl9tb2QgPSBOZXRPbmxpbmUubW9kO1xyXG4gICAgICAgIHRoaXMuaGVhcnREYXRhLl9mdW5jID0gTmV0T25saW5lLkhlYXJ0QmVhdDtcclxuICAgICAgICB0aGlzLmhlYXJ0RGF0YS5fcGFyYW0gPSB0aGlzLmhlYXJ0UGFyYW07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v55m75b2V5oiQ5Yqf5byA5aeLXHJcbiAgICBwdWJsaWMgcnVuKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZW5kSGVhcnRCZWF0KCk7XHJcbiAgICB9XHJcbiAgICAvL+WIh+aNoui0puWPt+aYr3N0b3BcclxuICAgIHB1YmxpYyBzdG9wKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaGVhcnRQYXJhbS5tc2dzZXEgPSAwO1xyXG4gICAgICAgIHRoaXMuc2VuZEludGVydmFsID0gMDtcclxuICAgICAgICB0aGlzLmxhc3RTZW5kSW50ZXJ2YWwgPSB0aGlzLkNIRUNLX0hFQVJUQkVBVF9JTlRFUlZBTDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHNlbmRIZWFydEJlYXQoZXh0cmFTdHIgPSBcIlwiKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubGFzdFNlbmRJbnRlcnZhbCA9IHRoaXMubGFzdFNlbmRUaW1lb3V0ICsgMTtcclxuICAgICAgICB0aGlzLnNlcnZlci5zZW5kSGVhcnRCZWF0KE5ldE9ubGluZS5tb2QsIE5ldE9ubGluZS5IZWFydEJlYXQsIHRoaXMuaGVhcnRQYXJhbSwgbnVsbCwgbnVsbCwgZmFsc2UsIDAsIGV4dHJhU3RyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4i+asoeW/g+i3s3NlcVxyXG4gICAgICogQHBhcmFtIG1zZ3NlcSBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblVwZGF0ZU1zZ3NlcShtc2dzZXEsIG1zZ3NlcTEpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5oZWFydFBhcmFtLm1zZ3NlcSA9IG1zZ3NlcTtcclxuICAgICAgICB0aGlzLmhlYXJ0UGFyYW0ubXNnc2VxXzEgPSBtc2dzZXExO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+D6Lez5raI5oGv6L+U5ZueXHJcbiAgICAgKiBAcGFyYW0gbXNnIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uSGVhcnRCZWF0KCBwYXJhbSApXHJcbiAgICB7XHJcbiAgICAgICAgLy/orr7nva7kuIvmrKHlv4Pot7Por7fmsYLml7bpl7RcclxuICAgICAgICBpZihwYXJhbSAmJiBwYXJhbS50aW1lb3V0KVxyXG4gICAgICAgICAgICB0aGlzLnNlbmRJbnRlcnZhbCA9IHBhcmFtLnRpbWVvdXQ7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnNlbmRJbnRlcnZhbCA9IDM7XHJcbiAgICAgICAgdGhpcy5sYXN0U2VuZFRpbWVvdXQgPSB0aGlzLnNlbmRJbnRlcnZhbDtcclxuICAgICAgICAvL+mAmuefpeW5v+aSree7hOS7tuWkhOeQhlxyXG4gICAgICAgIHRoaXMuaW50ZXJuYWxFdmVudC5ldmVudChIYWxsU2VydmVyLkVWRU5UX0lOVEVSTkFMX09OSEVBUlRCRUFULCBwYXJhbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uVXBkYXRlKGR0KVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLmlzUnVubmluZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKHRoaXMuc2VuZEludGVydmFsID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZEludGVydmFsIC09IGR0O1xyXG4gICAgICAgICAgICBpZih0aGlzLnNlbmRJbnRlcnZhbCA8PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRIZWFydEJlYXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/pmLLmraLlv4Pot7Pmlq3mjolcclxuICAgICAgICB0aGlzLmxhc3RTZW5kSW50ZXJ2YWwgLT0gZHQ7XHJcbiAgICAgICAgaWYodGhpcy5sYXN0U2VuZEludGVydmFsIDwgMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZEhlYXJ0QmVhdCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19