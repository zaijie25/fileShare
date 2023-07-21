
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/SpreadModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '78c4b2lwkpK16wAQHtHzAye', 'SpreadModel');
// hall/scripts/logic/hallcommon/model/SpreadModel.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ModelBase_1 = require("../../../framework/model/ModelBase");
var NetEvent_1 = require("../../core/net/hall/NetEvent");
var SpreadEvent_1 = require("../../hall/ui/Spread/SpreadEvent");
var HallModel_1 = require("./HallModel");
var SpreadModel = /** @class */ (function (_super) {
    __extends(SpreadModel, _super);
    function SpreadModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.limit = 10;
        _this._AwardRecordData = null;
        _this._CommidData = null;
        _this.RecordPage = 0;
        _this.redFlag = false;
        _this.commi_type = -1;
        _this.percent_rate = -1;
        _this.self_rate = -1;
        _this._rank_type = 1;
        //是否是短链接  0 不是 1 是
        _this.urlType = 0;
        //请求次数
        _this.shortUrlRequestTime = 0;
        //请求间隔
        _this.shortUrlRequestInterval = 3;
        return _this;
    }
    Object.defineProperty(SpreadModel.prototype, "Rate", {
        get: function () {
            return this.percent_rate;
        },
        set: function (rate) {
            this.percent_rate = rate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpreadModel.prototype, "SelfRate", {
        get: function () {
            return this.self_rate;
        },
        set: function (rate) {
            this.self_rate = rate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpreadModel.prototype, "RankType", {
        get: function () {
            return this._rank_type;
        },
        set: function (type) {
            this._rank_type = type;
        },
        enumerable: false,
        configurable: true
    });
    SpreadModel.prototype.onInit = function () {
    };
    Object.defineProperty(SpreadModel.prototype, "Name", {
        get: function () {
            return "SpreadModel";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpreadModel.prototype, "Data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpreadModel.prototype, "AwardRecordData", {
        get: function () {
            return this._AwardRecordData;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpreadModel.prototype, "CommidData", {
        get: function () {
            return this._CommidData;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpreadModel.prototype, "Url", {
        get: function () {
            return this._url;
        },
        set: function (url) {
            this._url = url;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpreadModel.prototype, "RedFLag", {
        get: function () {
            return this.redFlag;
        },
        set: function (flag) {
            this.redFlag = flag;
            if (this.redFlag) {
                Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallModel_1.HallRedSpotType.Spread]);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpreadModel.prototype, "commiType", {
        /**
         * 0返水 1老推广 2 无限代理
         */
        get: function () {
            return this.commi_type;
        },
        set: function (commi_type) {
            this.commi_type = commi_type;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 请求我的推广
     * @param url
     */
    SpreadModel.prototype.GetAgentShare = function (url) {
        var _this = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetSelfShare, { share_url: url }, function (msg) {
            _this._data = msg;
            _this.event(SpreadEvent_1.SpreadEvent.GetAgentShare, msg);
        }, this.SpreadErronFunc.bind(this), false, 0);
    };
    /**
        * 请求我的推广（无限代）
         * @param url
         */
    SpreadModel.prototype.GetDayAgentShare = function (url) {
        var _this = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetDayAgentShare, { share_url: url }, function (msg) {
            _this._data = msg;
            _this.event(SpreadEvent_1.SpreadEvent.GetDayAgentShare, msg);
        }, this.SpreadErronFunc.bind(this), false, 0);
    };
    SpreadModel.prototype.startRequestShortUrl = function (url) {
        var _this = this;
        if (this.isReqestingShortUrl)
            return;
        this.isReqestingShortUrl = true;
        this.shortUrlRequestTime = 0;
        if (this.urlType == 1) {
            this.isReqestingShortUrl = false;
            clearInterval(this.requestTimer);
            return;
        }
        this.requestTimer = setInterval(function () {
            _this.shortUrlRequestTime++;
            if (_this.shortUrlRequestTime >= 3 || _this.urlType == 1) {
                clearInterval(_this.requestTimer);
                _this.isReqestingShortUrl = false;
                return;
            }
            Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetUserShareUrl, { url: url }, function (msg) {
                _this.Url = msg.url;
                _this.urlType = msg.type;
                _this.urlType = 1;
                _this.event(SpreadEvent_1.SpreadEvent.RefreshShortUrl);
            }, null, false);
        }, this.shortUrlRequestInterval * 1000);
    };
    SpreadModel.prototype.loadShortUrl = function (url) {
        var _this = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetUserShareUrl, { url: url }, function (msg) {
            _this.Url = msg.url;
            _this.urlType = msg.type;
            _this.event(SpreadEvent_1.SpreadEvent.RefreshShortUrl);
        }, this.loadShortUrlErronFunc.bind(this), false);
    };
    SpreadModel.prototype.loadShortUrlErronFunc = function (data) {
        this.event(SpreadEvent_1.SpreadEvent.RefreshShortUrl);
        if (data._errstr != null) {
            Global.UI.fastTip(data._errstr);
            return false;
        }
        return true;
    };
    SpreadModel.prototype.BindInviteCode = function (pid) {
        var _this = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.BindPid, { pid: pid }, function (msg) {
            _this.event(SpreadEvent_1.SpreadEvent.BindSucceed, msg);
        }, this.SpreadErronFunc.bind(this), false, 0);
    };
    SpreadModel.prototype.SpreadErronFunc = function (data) {
        if (data._errstr != null) {
            Global.UI.fastTip(data._errstr);
            return false;
        }
        return true;
    };
    /**
     * 请求奖励明细
     */
    SpreadModel.prototype.GetAwardRecordInfo = function (page, limit) {
        var param = {
            "page": page,
            "limit": limit
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetSendRecord, param, null, this.SpreadErronFunc.bind(this), false, 180);
    };
    /**
     * 业绩查询无限代
     */
    SpreadModel.prototype.GetDayFlowInfoList = function (page, limit) {
        var param = {
            "page": page,
            "limit": limit
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetDayFlowInfoList, param, null, this.SpreadErronFunc.bind(this), false, 180);
    };
    /**
     * 返佣金额表
     */
    SpreadModel.prototype.GetDayAgentCommi = function () {
        var _this = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetDayAgentCommi, {}, function (msg) {
            _this._CommidData = msg;
            _this.event(SpreadEvent_1.SpreadEvent.GetDayAgentCommi, msg);
        }, this.SpreadErronFunc.bind(this), true, 0);
    };
    /**
     * 请求领奖记录
     * @param page
     * @param limit
     */
    SpreadModel.prototype.GetAwardRecord = function (page, limit) {
        var _this = this;
        var param = {
            "page": page,
            "limit": limit
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetSelfReadRecord, param, function (msg) {
            _this._AwardRecordData = msg;
            _this.event(SpreadEvent_1.SpreadEvent.GetSelfReadRecord, msg);
        }, this.SpreadErronFunc.bind(this), true, 0);
    };
    /**
    * 请求领奖记录无限代
    * @param page
    * @param limit
    */
    SpreadModel.prototype.GetDayAgentRecord = function (page, limit) {
        var _this = this;
        var param = {
            "page": page,
            "limit": limit
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetDayAgentRecord, param, function (msg) {
            _this._AwardRecordData = msg;
            _this.event(SpreadEvent_1.SpreadEvent.GetDayAgentRecord, msg);
        }, this.SpreadErronFunc.bind(this), true, 0);
    };
    /**
     * 请求领奖
     */
    SpreadModel.prototype.ReqGetReward = function () {
        var _this = this;
        var param = {
            "read_type": -1
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetSelfRead, param, function (msg) {
            _this._data.read_point = 0;
            _this._data.read_self_point = 0;
            _this.RedFLag = false;
            _this.event(SpreadEvent_1.SpreadEvent.GetSelfRead, msg);
        }, this.SpreadErronFunc.bind(this), true, 0);
    };
    /**
     * 请求领奖（无限代）
     */
    SpreadModel.prototype.GetDayAgent = function () {
        var _this = this;
        var param = {};
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetDayAgent, param, function (msg) {
            _this.event(SpreadEvent_1.SpreadEvent.GetDayAgent, msg);
        }, this.SpreadErronFunc.bind(this), true, 0);
    };
    /**
     * 查询团队信息
     * @param page
     * @param limit
     */
    SpreadModel.prototype.ReqGetSelfTeam = function (page, limit) {
        var param = {
            "page": page,
            "limit": limit
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetSelfTeam, param, null, this.SpreadErronFunc.bind(this), false, 60);
    };
    /**
     * 查询团队信息无限代
     * @param page
     * @param limit
     */
    SpreadModel.prototype.GetDayAgentTeamInfo = function (uid, page, limit) {
        var param = {
            "user_id": uid,
            "page": page,
            "limit": limit
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetDayAgentTeamInfo, param, null, this.SpreadErronFunc.bind(this), false, 60);
    };
    /**
     * 查询下级
     * @param _id
     */
    SpreadModel.prototype.ReqSearchSelfTeam = function (_id) {
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.SeachSelfTeam, { user_id: _id }, null, this.SpreadErronFunc.bind(this), true, 0);
    };
    SpreadModel.prototype.CheckRedFlag = function () {
        if (this.redFlag) {
            Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallModel_1.HallRedSpotType.Spread]);
        }
    };
    /**
     * 查询下级（无限代）
     * @param _id
     */
    SpreadModel.prototype.SeachSelfTeamUser = function (_id) {
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.SeachSelfTeamUser, { user_id: _id }, null, this.SpreadErronFunc.bind(this), true, 0);
    };
    SpreadModel.prototype.clear = function () {
        this.urlType = -1;
        this.Url = null;
        this._AwardRecordData = null;
        this._CommidData = null;
        this._data = null;
    };
    return SpreadModel;
}(ModelBase_1.default));
exports.default = SpreadModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxTcHJlYWRNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBMkQ7QUFDM0QseURBQTBEO0FBQzFELGdFQUErRDtBQUMvRCx5Q0FBOEM7QUFLOUM7SUFBeUMsK0JBQVM7SUFBbEQ7UUFBQSxxRUFnV0M7UUEvVkcsV0FBSyxHQUFRLEVBQUUsQ0FBQztRQUVSLHNCQUFnQixHQUFRLElBQUksQ0FBQTtRQUM1QixpQkFBVyxHQUFRLElBQUksQ0FBQTtRQUcvQixnQkFBVSxHQUFXLENBQUMsQ0FBQztRQVN2QixhQUFPLEdBQUcsS0FBSyxDQUFBO1FBRWYsZ0JBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUVmLGtCQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFFakIsZUFBUyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBRWQsZ0JBQVUsR0FBRyxDQUFDLENBQUE7UUFpRGQsa0JBQWtCO1FBQ1gsYUFBTyxHQUFHLENBQUMsQ0FBQTtRQUdsQixNQUFNO1FBQ0UseUJBQW1CLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLE1BQU07UUFDRSw2QkFBdUIsR0FBRyxDQUFDLENBQUM7O0lBZ1J4QyxDQUFDO0lBdFVHLHNCQUFXLDZCQUFJO2FBSWY7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUE7UUFDNUIsQ0FBQzthQU5ELFVBQWdCLElBQUk7WUFFaEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7UUFDNUIsQ0FBQzs7O09BQUE7SUFLRCxzQkFBVyxpQ0FBUTthQUluQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQTtRQUN6QixDQUFDO2FBTkQsVUFBb0IsSUFBSTtZQUVwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtRQUN6QixDQUFDOzs7T0FBQTtJQUtELHNCQUFXLGlDQUFRO2FBS25CO1lBRUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBO1FBQzFCLENBQUM7YUFSRCxVQUFvQixJQUFJO1lBRXBCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFBO1FBQzFCLENBQUM7OztPQUFBO0lBT1MsNEJBQU0sR0FBaEI7SUFFQSxDQUFDO0lBRUQsc0JBQVcsNkJBQUk7YUFBZjtZQUNJLE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcsNkJBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUNyQixDQUFDOzs7T0FBQTtJQUNELHNCQUFXLHdDQUFlO2FBQTFCO1lBRUksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUE7UUFDaEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxtQ0FBVTthQUFyQjtZQUVJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtRQUMzQixDQUFDOzs7T0FBQTtJQWVELHNCQUFXLDRCQUFHO2FBS2Q7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUE7UUFDcEIsQ0FBQzthQVBELFVBQWUsR0FBRztZQUVkLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFBO1FBQ25CLENBQUM7OztPQUFBO0lBS0Qsc0JBQVcsZ0NBQU87YUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDdkIsQ0FBQzthQUNELFVBQW1CLElBQUk7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUE7WUFDbkIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsMkJBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ2hGO1FBQ0wsQ0FBQzs7O09BTkE7SUFVRCxzQkFBVyxrQ0FBUztRQUhwQjs7V0FFRzthQUNIO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBO1FBQzFCLENBQUM7YUFDRCxVQUFxQixVQUFVO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFBO1FBQ2hDLENBQUM7OztPQUhBO0lBTUQ7OztPQUdHO0lBQ0ksbUNBQWEsR0FBcEIsVUFBcUIsR0FBVztRQUFoQyxpQkFPQztRQU5HLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFVLENBQUMsR0FBRyxFQUFFLHFCQUFVLENBQUMsWUFBWSxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFFLFVBQUMsR0FBRztZQUNwRixLQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNqQixLQUFJLENBQUMsS0FBSyxDQUFDLHlCQUFXLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBRzlDLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDakQsQ0FBQztJQUNEOzs7V0FHTztJQUNBLHNDQUFnQixHQUF2QixVQUF3QixHQUFXO1FBQW5DLGlCQU1DO1FBTEcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBRSxVQUFDLEdBQUc7WUFDeEYsS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDakIsS0FBSSxDQUFDLEtBQUssQ0FBQyx5QkFBVyxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBRWpELENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDakQsQ0FBQztJQUVNLDBDQUFvQixHQUEzQixVQUE0QixHQUFXO1FBQXZDLGlCQTBCQztRQXpCRyxJQUFJLElBQUksQ0FBQyxtQkFBbUI7WUFDeEIsT0FBTztRQUNYLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQztRQUM3QixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7WUFDakMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUNoQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztZQUM1QixLQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMzQixJQUFJLEtBQUksQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLElBQUksS0FBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUc7Z0JBQ3JELGFBQWEsQ0FBQyxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7Z0JBQ2hDLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7Z0JBQ2pDLE9BQU87YUFDVjtZQUNELE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFVLENBQUMsR0FBRyxFQUFFLHFCQUFVLENBQUMsZUFBZSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLFVBQUMsR0FBRztnQkFDakYsS0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO2dCQUNuQixLQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsS0FBSyxDQUFDLHlCQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNuQixDQUFDLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxDQUFBO0lBRzNDLENBQUM7SUFFTSxrQ0FBWSxHQUFuQixVQUFvQixHQUFXO1FBQS9CLGlCQU1DO1FBTEcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQVUsQ0FBQyxlQUFlLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsVUFBQyxHQUFHO1lBQ2pGLEtBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUNuQixLQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDeEIsS0FBSSxDQUFDLEtBQUssQ0FBQyx5QkFBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzVDLENBQUMsRUFBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3JELENBQUM7SUFDTywyQ0FBcUIsR0FBN0IsVUFBOEIsSUFBUztRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLHlCQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDeEMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtZQUN0QixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sb0NBQWMsR0FBckIsVUFBc0IsR0FBVztRQUFqQyxpQkFJQztRQUhHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFVLENBQUMsR0FBRyxFQUFFLHFCQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLFVBQUMsR0FBRztZQUN6RSxLQUFJLENBQUMsS0FBSyxDQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQzVDLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDakQsQ0FBQztJQUVPLHFDQUFlLEdBQXZCLFVBQXdCLElBQVM7UUFDN0IsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtZQUN0QixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0Q7O09BRUc7SUFDSSx3Q0FBa0IsR0FBekIsVUFBMEIsSUFBWSxFQUFFLEtBQWE7UUFDakQsSUFBSSxLQUFLLEdBQUc7WUFDUixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxLQUFLO1NBQ2pCLENBQUE7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBVSxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUM5SCxDQUFDO0lBRUQ7O09BRUc7SUFDSSx3Q0FBa0IsR0FBekIsVUFBMEIsSUFBWSxFQUFFLEtBQWE7UUFDakQsSUFBSSxLQUFLLEdBQUc7WUFDUixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxLQUFLO1NBQ2pCLENBQUE7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBVSxDQUFDLGtCQUFrQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ25JLENBQUM7SUFDRDs7T0FFRztJQUNJLHNDQUFnQixHQUF2QjtRQUFBLGlCQU1DO1FBSkcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsVUFBQyxHQUFHO1lBQ3hFLEtBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFBO1lBQ3RCLEtBQUksQ0FBQyxLQUFLLENBQUMseUJBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNqRCxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksb0NBQWMsR0FBckIsVUFBc0IsSUFBWSxFQUFFLEtBQWE7UUFBakQsaUJBVUM7UUFURyxJQUFJLEtBQUssR0FBRztZQUNSLE1BQU0sRUFBRSxJQUFJO1lBQ1osT0FBTyxFQUFFLEtBQUs7U0FDakIsQ0FBQTtRQUNELE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFVLENBQUMsR0FBRyxFQUFFLHFCQUFVLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLFVBQUMsR0FBRztZQUU1RSxLQUFJLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFBO1lBQzNCLEtBQUksQ0FBQyxLQUFLLENBQUMseUJBQVcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNsRCxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFFRDs7OztNQUlFO0lBQ0ssdUNBQWlCLEdBQXhCLFVBQXlCLElBQVksRUFBRSxLQUFhO1FBQXBELGlCQVVDO1FBVEcsSUFBSSxLQUFLLEdBQUc7WUFDUixNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxLQUFLO1NBQ2pCLENBQUE7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBVSxDQUFDLGlCQUFpQixFQUFFLEtBQUssRUFBRSxVQUFDLEdBQUc7WUFFNUUsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQTtZQUMzQixLQUFJLENBQUMsS0FBSyxDQUFDLHlCQUFXLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDbEQsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0lBR0Q7O09BRUc7SUFDSSxrQ0FBWSxHQUFuQjtRQUFBLGlCQVdDO1FBVEcsSUFBSSxLQUFLLEdBQUc7WUFDUixXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ2xCLENBQUE7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBVSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBQyxHQUFHO1lBQ3RFLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQTtZQUN6QixLQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUE7WUFDOUIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7WUFDcEIsS0FBSSxDQUFDLEtBQUssQ0FBQyx5QkFBVyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUM1QyxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ2hELENBQUM7SUFFRDs7T0FFRztJQUNJLGlDQUFXLEdBQWxCO1FBQUEsaUJBUUM7UUFORyxJQUFJLEtBQUssR0FBRyxFQUVYLENBQUE7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBVSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBQyxHQUFHO1lBQ3RFLEtBQUksQ0FBQyxLQUFLLENBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDNUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLG9DQUFjLEdBQXJCLFVBQXNCLElBQVksRUFBRSxLQUFhO1FBRTdDLElBQUksS0FBSyxHQUFHO1lBQ1IsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUUsS0FBSztTQUNqQixDQUFBO1FBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUgsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSx5Q0FBbUIsR0FBMUIsVUFBMkIsR0FBVyxFQUFFLElBQVksRUFBRSxLQUFhO1FBRS9ELElBQUksS0FBSyxHQUFHO1lBQ1IsU0FBUyxFQUFFLEdBQUc7WUFDZCxNQUFNLEVBQUUsSUFBSTtZQUNaLE9BQU8sRUFBRSxLQUFLO1NBQ2pCLENBQUE7UUFDRCxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBVSxDQUFDLG1CQUFtQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BJLENBQUM7SUFFRDs7O09BR0c7SUFFSSx1Q0FBaUIsR0FBeEIsVUFBeUIsR0FBVztRQUNoQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBVSxDQUFDLEdBQUcsRUFBRSxxQkFBVSxDQUFDLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3RJLENBQUM7SUFFRCxrQ0FBWSxHQUFaO1FBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssRUFBRSwyQkFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDaEY7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBRUksdUNBQWlCLEdBQXhCLFVBQXlCLEdBQVc7UUFDaEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVUsQ0FBQyxHQUFHLEVBQUUscUJBQVUsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQzFJLENBQUM7SUFFTSwyQkFBSyxHQUFaO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQTtRQUNmLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUE7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7SUFFckIsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FoV0EsQUFnV0MsQ0FoV3dDLG1CQUFTLEdBZ1dqRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2RlbEJhc2UgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9tb2RlbC9Nb2RlbEJhc2VcIjtcclxuaW1wb3J0IHsgTmV0QXBwZmFjZSB9IGZyb20gXCIuLi8uLi9jb3JlL25ldC9oYWxsL05ldEV2ZW50XCI7XHJcbmltcG9ydCB7IFNwcmVhZEV2ZW50IH0gZnJvbSBcIi4uLy4uL2hhbGwvdWkvU3ByZWFkL1NwcmVhZEV2ZW50XCI7XHJcbmltcG9ydCB7IEhhbGxSZWRTcG90VHlwZSB9IGZyb20gXCIuL0hhbGxNb2RlbFwiO1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByZWFkTW9kZWwgZXh0ZW5kcyBNb2RlbEJhc2Uge1xyXG4gICAgbGltaXQ6IGFueSA9IDEwO1xyXG4gICAgcHJpdmF0ZSBfZGF0YTogYW55XHJcbiAgICBwcml2YXRlIF9Bd2FyZFJlY29yZERhdGE6IGFueSA9IG51bGxcclxuICAgIHByaXZhdGUgX0NvbW1pZERhdGE6IGFueSA9IG51bGxcclxuICAgIFJlY29yZFRvdGFsOiBudW1iZXI7XHJcbiAgICBSZWNvcmRMaXN0OiBhbnk7XHJcbiAgICBSZWNvcmRQYWdlOiBudW1iZXIgPSAwO1xyXG4gICAgQXdhcmRMaXN0RGV0YWlsOiBhbnk7XHJcbiAgICBEZXRhaWxUb3RhbDogbnVtYmVyO1xyXG4gICAgRGV0YWlsUGFnZTogbnVtYmVyO1xyXG4gICAgU2VsZlRlYW1MaXN0OiBhbnk7XHJcbiAgICBTZWxmVGVhbVRvdGFsOiBhbnk7XHJcbiAgICBTZWxmVGVhbVBhZ2U6IGFueTtcclxuICAgIHByaXZhdGUgX3VybDogc3RyaW5nXHJcblxyXG4gICAgcmVkRmxhZyA9IGZhbHNlXHJcblxyXG4gICAgY29tbWlfdHlwZSA9IC0xXHJcblxyXG4gICAgcGVyY2VudF9yYXRlID0gLTFcclxuXHJcbiAgICBzZWxmX3JhdGUgPSAtMVxyXG5cclxuICAgIF9yYW5rX3R5cGUgPSAxXHJcblxyXG4gICAgcHVibGljIHNldCBSYXRlKHJhdGUpIC8v6L+U5Yip5q+U5L6LXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wZXJjZW50X3JhdGUgPSByYXRlXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IFJhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGVyY2VudF9yYXRlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBTZWxmUmF0ZShyYXRlKSAvL+iHquiQpeavlOS+i1xyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2VsZl9yYXRlID0gcmF0ZVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBTZWxmUmF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxmX3JhdGVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IFJhbmtUeXBlKHR5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fcmFua190eXBlID0gdHlwZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgUmFua1R5cGUoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYW5rX3R5cGUgXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiBcIlNwcmVhZE1vZGVsXCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IERhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQXdhcmRSZWNvcmREYXRhKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fQXdhcmRSZWNvcmREYXRhXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBDb21taWREYXRhKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ29tbWlkRGF0YVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+aYr+WQpuaYr+efremTvuaOpSAgMCDkuI3mmK8gMSDmmK9cclxuICAgIHB1YmxpYyB1cmxUeXBlID0gMFxyXG4gICAgLy/mmK/lkKbmraPlnKjor7fmsYJzaG9ydHVybFxyXG4gICAgcHJpdmF0ZSBpc1JlcWVzdGluZ1Nob3J0VXJsO1xyXG4gICAgLy/or7fmsYLmrKHmlbBcclxuICAgIHByaXZhdGUgc2hvcnRVcmxSZXF1ZXN0VGltZSA9IDA7XHJcbiAgICAvL+ivt+axgumXtOmalFxyXG4gICAgcHJpdmF0ZSBzaG9ydFVybFJlcXVlc3RJbnRlcnZhbCA9IDM7XHJcbiAgICAvL+efremTvuaOpeivt+axgnRpbWVyXHJcbiAgICBwcml2YXRlIHJlcXVlc3RUaW1lcjogYW55O1xyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0IFVybCh1cmwpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fdXJsID0gdXJsXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VybFxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBSZWRGTGFnKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZEZsYWdcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgUmVkRkxhZyhmbGFnKSB7XHJcbiAgICAgICAgdGhpcy5yZWRGbGFnID0gZmxhZ1xyXG4gICAgICAgIGlmICh0aGlzLnJlZEZsYWcpIHtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNob3dSZWRTcG90LCBbZmFsc2UsIEhhbGxSZWRTcG90VHlwZS5TcHJlYWRdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIDDov5TmsLQgMeiAgeaOqOW5vyAyIOaXoOmZkOS7o+eQhlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1pVHlwZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb21taV90eXBlXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGNvbW1pVHlwZShjb21taV90eXBlKSB7XHJcbiAgICAgICAgdGhpcy5jb21taV90eXBlID0gY29tbWlfdHlwZVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOivt+axguaIkeeahOaOqOW5v1xyXG4gICAgICogQHBhcmFtIHVybCBcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldEFnZW50U2hhcmUodXJsOiBzdHJpbmcpIHtcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkdldFNlbGZTaGFyZSwgeyBzaGFyZV91cmw6IHVybCB9LCAobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBtc2c7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnQoU3ByZWFkRXZlbnQuR2V0QWdlbnRTaGFyZSwgbXNnKVxyXG4gICAgICAgICAgIFxyXG5cclxuICAgICAgICB9LCB0aGlzLlNwcmVhZEVycm9uRnVuYy5iaW5kKHRoaXMpLCBmYWxzZSwgMClcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICAgICog6K+35rGC5oiR55qE5o6o5bm/77yI5peg6ZmQ5Luj77yJXHJcbiAgICAgICAgICogQHBhcmFtIHVybCBcclxuICAgICAgICAgKi9cclxuICAgIHB1YmxpYyBHZXREYXlBZ2VudFNoYXJlKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXREYXlBZ2VudFNoYXJlLCB7IHNoYXJlX3VybDogdXJsIH0sIChtc2cpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IG1zZztcclxuICAgICAgICAgICAgdGhpcy5ldmVudChTcHJlYWRFdmVudC5HZXREYXlBZ2VudFNoYXJlLCBtc2cpXHJcblxyXG4gICAgICAgIH0sIHRoaXMuU3ByZWFkRXJyb25GdW5jLmJpbmQodGhpcyksIGZhbHNlLCAwKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGFydFJlcXVlc3RTaG9ydFVybCh1cmw6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUmVxZXN0aW5nU2hvcnRVcmwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLmlzUmVxZXN0aW5nU2hvcnRVcmwgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvcnRVcmxSZXF1ZXN0VGltZSA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMudXJsVHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNSZXFlc3RpbmdTaG9ydFVybCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMucmVxdWVzdFRpbWVyKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVxdWVzdFRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNob3J0VXJsUmVxdWVzdFRpbWUrKztcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvcnRVcmxSZXF1ZXN0VGltZSA+PSAzIHx8IHRoaXMudXJsVHlwZSA9PSAxICkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnJlcXVlc3RUaW1lcilcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNSZXFlc3RpbmdTaG9ydFVybCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuR2V0VXNlclNoYXJlVXJsLCB7IHVybDogdXJsIH0sIChtc2cpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuVXJsID0gbXNnLnVybDtcclxuICAgICAgICAgICAgICAgIHRoaXMudXJsVHlwZSA9IG1zZy50eXBlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cmxUeXBlID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnQoU3ByZWFkRXZlbnQuUmVmcmVzaFNob3J0VXJsKTtcclxuICAgICAgICAgICAgfSwgbnVsbCwgZmFsc2UpXHJcbiAgICAgICAgfSwgdGhpcy5zaG9ydFVybFJlcXVlc3RJbnRlcnZhbCAqIDEwMDApXHJcblxyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGxvYWRTaG9ydFVybCh1cmw6IHN0cmluZykge1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuR2V0VXNlclNoYXJlVXJsLCB7IHVybDogdXJsIH0sIChtc2cpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5VcmwgPSBtc2cudXJsO1xyXG4gICAgICAgICAgICB0aGlzLnVybFR5cGUgPSBtc2cudHlwZTtcclxuICAgICAgICAgICAgdGhpcy5ldmVudChTcHJlYWRFdmVudC5SZWZyZXNoU2hvcnRVcmwpO1xyXG4gICAgICAgIH0sICB0aGlzLmxvYWRTaG9ydFVybEVycm9uRnVuYy5iaW5kKHRoaXMpLCBmYWxzZSlcclxuICAgIH1cclxuICAgIHByaXZhdGUgbG9hZFNob3J0VXJsRXJyb25GdW5jKGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZXZlbnQoU3ByZWFkRXZlbnQuUmVmcmVzaFNob3J0VXJsKTtcclxuICAgICAgICBpZiAoZGF0YS5fZXJyc3RyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoZGF0YS5fZXJyc3RyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQmluZEludml0ZUNvZGUocGlkOiBudW1iZXIpIHtcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkJpbmRQaWQsIHsgcGlkOiBwaWQgfSwgKG1zZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50KFNwcmVhZEV2ZW50LkJpbmRTdWNjZWVkLCBtc2cpXHJcbiAgICAgICAgfSwgdGhpcy5TcHJlYWRFcnJvbkZ1bmMuYmluZCh0aGlzKSwgZmFsc2UsIDApXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTcHJlYWRFcnJvbkZ1bmMoZGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYgKGRhdGEuX2VycnN0ciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKGRhdGEuX2VycnN0cik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOivt+axguWlluWKseaYjue7hlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0QXdhcmRSZWNvcmRJbmZvKHBhZ2U6IG51bWJlciwgbGltaXQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJwYWdlXCI6IHBhZ2UsXHJcbiAgICAgICAgICAgIFwibGltaXRcIjogbGltaXRcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRTZW5kUmVjb3JkLCBwYXJhbSwgbnVsbCwgdGhpcy5TcHJlYWRFcnJvbkZ1bmMuYmluZCh0aGlzKSwgZmFsc2UsIDE4MClcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4mue7qeafpeivouaXoOmZkOS7o1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0RGF5Rmxvd0luZm9MaXN0KHBhZ2U6IG51bWJlciwgbGltaXQ6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJwYWdlXCI6IHBhZ2UsXHJcbiAgICAgICAgICAgIFwibGltaXRcIjogbGltaXRcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXREYXlGbG93SW5mb0xpc3QsIHBhcmFtLCBudWxsLCB0aGlzLlNwcmVhZEVycm9uRnVuYy5iaW5kKHRoaXMpLCBmYWxzZSwgMTgwKVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDov5TkvaPph5Hpop3ooahcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldERheUFnZW50Q29tbWkoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXREYXlBZ2VudENvbW1pLCB7fSwgKG1zZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9Db21taWREYXRhID0gbXNnXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnQoU3ByZWFkRXZlbnQuR2V0RGF5QWdlbnRDb21taSwgbXNnKVxyXG4gICAgICAgIH0sIHRoaXMuU3ByZWFkRXJyb25GdW5jLmJpbmQodGhpcyksIHRydWUsIDApXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDor7fmsYLpooblpZborrDlvZVcclxuICAgICAqIEBwYXJhbSBwYWdlIFxyXG4gICAgICogQHBhcmFtIGxpbWl0IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0QXdhcmRSZWNvcmQocGFnZTogbnVtYmVyLCBsaW1pdDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBcInBhZ2VcIjogcGFnZSxcclxuICAgICAgICAgICAgXCJsaW1pdFwiOiBsaW1pdFxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkdldFNlbGZSZWFkUmVjb3JkLCBwYXJhbSwgKG1zZykgPT4ge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fQXdhcmRSZWNvcmREYXRhID0gbXNnXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnQoU3ByZWFkRXZlbnQuR2V0U2VsZlJlYWRSZWNvcmQsIG1zZylcclxuICAgICAgICB9LCB0aGlzLlNwcmVhZEVycm9uRnVuYy5iaW5kKHRoaXMpLCB0cnVlLCAwKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDor7fmsYLpooblpZborrDlvZXml6DpmZDku6NcclxuICAgICogQHBhcmFtIHBhZ2UgXHJcbiAgICAqIEBwYXJhbSBsaW1pdCBcclxuICAgICovXHJcbiAgICBwdWJsaWMgR2V0RGF5QWdlbnRSZWNvcmQocGFnZTogbnVtYmVyLCBsaW1pdDogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBcInBhZ2VcIjogcGFnZSxcclxuICAgICAgICAgICAgXCJsaW1pdFwiOiBsaW1pdFxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkdldERheUFnZW50UmVjb3JkLCBwYXJhbSwgKG1zZykgPT4ge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fQXdhcmRSZWNvcmREYXRhID0gbXNnXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnQoU3ByZWFkRXZlbnQuR2V0RGF5QWdlbnRSZWNvcmQsIG1zZylcclxuICAgICAgICB9LCB0aGlzLlNwcmVhZEVycm9uRnVuYy5iaW5kKHRoaXMpLCB0cnVlLCAwKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOivt+axgumihuWlllxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgUmVxR2V0UmV3YXJkKCkge1xyXG5cclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIFwicmVhZF90eXBlXCI6IC0xXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuR2V0U2VsZlJlYWQsIHBhcmFtLCAobXNnKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEucmVhZF9wb2ludCA9IDBcclxuICAgICAgICAgICAgdGhpcy5fZGF0YS5yZWFkX3NlbGZfcG9pbnQgPSAwXHJcbiAgICAgICAgICAgIHRoaXMuUmVkRkxhZyA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnQoU3ByZWFkRXZlbnQuR2V0U2VsZlJlYWQsIG1zZylcclxuICAgICAgICB9LCB0aGlzLlNwcmVhZEVycm9uRnVuYy5iaW5kKHRoaXMpLCB0cnVlLCAwKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+35rGC6aKG5aWW77yI5peg6ZmQ5Luj77yJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXREYXlBZ2VudCgpIHtcclxuXHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXREYXlBZ2VudCwgcGFyYW0sIChtc2cpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudChTcHJlYWRFdmVudC5HZXREYXlBZ2VudCwgbXNnKVxyXG4gICAgICAgIH0sIHRoaXMuU3ByZWFkRXJyb25GdW5jLmJpbmQodGhpcyksIHRydWUsIDApXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmn6Xor6Llm6LpmJ/kv6Hmga9cclxuICAgICAqIEBwYXJhbSBwYWdlIFxyXG4gICAgICogQHBhcmFtIGxpbWl0IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgUmVxR2V0U2VsZlRlYW0ocGFnZTogbnVtYmVyLCBsaW1pdDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJwYWdlXCI6IHBhZ2UsXHJcbiAgICAgICAgICAgIFwibGltaXRcIjogbGltaXRcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRTZWxmVGVhbSwgcGFyYW0sIG51bGwsIHRoaXMuU3ByZWFkRXJyb25GdW5jLmJpbmQodGhpcyksIGZhbHNlLCA2MCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmn6Xor6Llm6LpmJ/kv6Hmga/ml6DpmZDku6NcclxuICAgICAqIEBwYXJhbSBwYWdlIFxyXG4gICAgICogQHBhcmFtIGxpbWl0IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0RGF5QWdlbnRUZWFtSW5mbyh1aWQ6IG51bWJlciwgcGFnZTogbnVtYmVyLCBsaW1pdDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJ1c2VyX2lkXCI6IHVpZCxcclxuICAgICAgICAgICAgXCJwYWdlXCI6IHBhZ2UsXHJcbiAgICAgICAgICAgIFwibGltaXRcIjogbGltaXRcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXREYXlBZ2VudFRlYW1JbmZvLCBwYXJhbSwgbnVsbCwgdGhpcy5TcHJlYWRFcnJvbkZ1bmMuYmluZCh0aGlzKSwgZmFsc2UsIDYwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOafpeivouS4i+e6p1xyXG4gICAgICogQHBhcmFtIF9pZCBcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyBSZXFTZWFyY2hTZWxmVGVhbShfaWQ6IG51bWJlcikge1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuU2VhY2hTZWxmVGVhbSwgeyB1c2VyX2lkOiBfaWQgfSwgbnVsbCwgdGhpcy5TcHJlYWRFcnJvbkZ1bmMuYmluZCh0aGlzKSwgdHJ1ZSwgMClcclxuICAgIH1cclxuXHJcbiAgICBDaGVja1JlZEZsYWcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVkRmxhZykge1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU2hvd1JlZFNwb3QsIFtmYWxzZSwgSGFsbFJlZFNwb3RUeXBlLlNwcmVhZF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOafpeivouS4i+e6p++8iOaXoOmZkOS7o++8iVxyXG4gICAgICogQHBhcmFtIF9pZCBcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyBTZWFjaFNlbGZUZWFtVXNlcihfaWQ6IG51bWJlcikge1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuU2VhY2hTZWxmVGVhbVVzZXIsIHsgdXNlcl9pZDogX2lkIH0sIG51bGwsIHRoaXMuU3ByZWFkRXJyb25GdW5jLmJpbmQodGhpcyksIHRydWUsIDApXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnVybFR5cGUgPSAtMVxyXG4gICAgICAgIHRoaXMuVXJsID0gbnVsbFxyXG4gICAgICAgIHRoaXMuX0F3YXJkUmVjb3JkRGF0YSA9IG51bGxcclxuICAgICAgICB0aGlzLl9Db21taWREYXRhID0gbnVsbFxyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBudWxsXHJcblxyXG4gICAgfVxyXG59Il19