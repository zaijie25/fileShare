"use strict";
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