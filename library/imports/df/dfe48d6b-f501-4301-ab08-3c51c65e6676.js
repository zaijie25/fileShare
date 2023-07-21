"use strict";
cc._RF.push(module, 'dfe481r9QFDAasIPFHGXmZ2', 'MsgModel');
// hall/scripts/logic/hallcommon/model/MsgModel.ts

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
var MsgEvent_1 = require("../../hall/ui/msg/MsgEvent");
var HallModel_1 = require("./HallModel");
var HallPopMsgHelper_1 = require("../../hall/tool/HallPopMsgHelper");
var MsgModel = /** @class */ (function (_super) {
    __extends(MsgModel, _super);
    function MsgModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.DataTabel = {};
        _this.MailContenTabel = {}; //存储已读公告
        _this.NoticeContenTabel = {}; //存储已读邮件
        return _this;
    }
    MsgModel.prototype.onInit = function () {
        Global.Event.on(GlobalEvent.ShowRedSpot, this, this.RefreshData);
    };
    MsgModel.prototype.RefreshData = function (data) {
        var needfresh = data[0] || false;
        var redSpotType = data[1];
        if (!needfresh) {
            return;
        }
        switch (redSpotType) {
            case HallModel_1.HallRedSpotType.Gonggao:
                {
                    this.RefreshDataByType(MsgEvent_1.MsgType.Notice);
                    break;
                }
            case HallModel_1.HallRedSpotType.Mail:
                {
                    this.RefreshDataByType(MsgEvent_1.MsgType.Mail);
                    break;
                }
        }
    };
    MsgModel.prototype.GetDataByType = function (msg_type) {
        if (this.DataTabel[msg_type] && !Global.Toolkit.isEmptyObject(this.DataTabel[msg_type])) {
            this.Sort();
            var data = this.DataTabel[msg_type];
            return data;
        }
        return null;
    };
    Object.defineProperty(MsgModel.prototype, "Name", {
        get: function () {
            return "MsgModel";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MsgModel.prototype, "Status", {
        get: function () {
            return this._Status;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 公告弹窗字段
     * @param status
     */
    MsgModel.prototype.SetStatus = function (status) {
        this._Status = (status == null) ? 0 : status;
        if (status) {
            HallPopMsgHelper_1.default.Instance.addMsgList(HallPopMsgHelper_1.PopWndName.Notice, function () {
                Global.Event.event(GlobalEvent.POP_NOTICE);
            });
        }
    };
    MsgModel.prototype.RefreshDataByType = function (msg_type) {
        // Global.HallServer.clearCache(NetAppface.mod,NetAppface.GetMsgList,{type:msg_type})
        this.ClearAllNetFaceCache();
        this.GetMsgList(msg_type, false, false, false);
    };
    MsgModel.prototype.ClearAllNetFaceCache = function () {
        Global.HallServer.clearCache(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetMsgList, { type: MsgEvent_1.MsgType.All });
        Global.HallServer.clearCache(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetMsgList, { type: MsgEvent_1.MsgType.Mail });
        Global.HallServer.clearCache(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetMsgList, { type: MsgEvent_1.MsgType.Notice });
    };
    MsgModel.prototype.GetMsgList = function (msg_type, isFromHall, isFresh, showwaiting) {
        var _this = this;
        if (isFromHall === void 0) { isFromHall = false; }
        if (isFresh === void 0) { isFresh = false; }
        if (showwaiting === void 0) { showwaiting = false; }
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetMsgList, { type: msg_type }, function (msg) {
            _this.DataTabel[msg_type] = msg;
            if (isFromHall) {
                var MsgFlag = _this.CheckIsAnyMailNotRead(isFromHall);
                if (MsgFlag) {
                    Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallModel_1.HallRedSpotType.Mail]);
                }
                var noticeFlag = _this.CheckIsAnyNoticeNotRead(isFromHall);
                if (noticeFlag) {
                    Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallModel_1.HallRedSpotType.Gonggao]);
                }
                _this.AssemblyData(msg);
            }
            else {
                _this.Sort();
                var data = _this.DataTabel[msg_type];
                if (msg_type == MsgEvent_1.MsgType.Notice) {
                    _this.event(MsgEvent_1.MsgEvent.NoticeListCallback, data);
                }
                else {
                    _this.event(MsgEvent_1.MsgEvent.MsgListCallback, data);
                }
            }
        }, this.SpreadErronFunc.bind(this), false, isFresh ? 0 : 180);
    };
    MsgModel.prototype.AssemblyData = function (msg) {
        if (msg == null || Global.Toolkit.isEmptyObject(msg)) {
            return;
        }
        if (!this.DataTabel.hasOwnProperty(MsgEvent_1.MsgType.Mail)) {
            var data = {};
            data["mail_total"] = msg.mail_total || -1;
            data["mail"] = msg.mail || null;
            this.DataTabel[MsgEvent_1.MsgType.Mail] = data || null;
        }
        if (!this.DataTabel.hasOwnProperty(MsgEvent_1.MsgType.Notice)) {
            var data = {};
            data["notice_tital"] = msg.notice_tital || -1;
            data["notice"] = msg.notice || null;
            this.DataTabel[MsgEvent_1.MsgType.Notice] = data || null;
        }
    };
    MsgModel.prototype.SpreadErronFunc = function (data) {
        if (data._errstr != null) {
            Global.UI.fastTip(data._errstr + "");
            //  Global.UI.fastTip(data._errstr+"["+data._errno+"]");
            return false;
        }
        return true;
    };
    MsgModel.prototype.DelMail = function (id) {
        var _this = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.DelMail, { id: id }, function (msg) {
            var type = MsgEvent_1.MsgType.Mail;
            for (var i = 0; i < _this.DataTabel[type].mail.length; i++) {
                if (_this.DataTabel[type].mail[i] && _this.DataTabel[type].mail[i].id === id) {
                    _this.DataTabel[type].mail.splice(i, 1);
                    break;
                }
            }
            _this.ClearAllNetFaceCache();
            _this.event(MsgEvent_1.MsgEvent.DeleteMsgCallback, msg);
        }, this.SpreadErronFunc.bind(this));
    };
    MsgModel.prototype.ReadMsg = function (id, msg_type, red_status) {
        var _this = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.ReadMsg, { id: id, msg_type: msg_type, red_status: red_status }, function (msg) {
            var data = null;
            if (msg_type == MsgEvent_1.MsgType.Mail) {
                data = _this.DataTabel[msg_type].mail;
            }
            else if (msg_type == MsgEvent_1.MsgType.Notice) {
                data = _this.DataTabel[msg_type].notice;
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i] && data[i].id === id) {
                    data[i].red_status = 1;
                    break;
                }
            }
            _this.ClearAllNetFaceCache();
            _this.SaveContent(msg_type, id, msg);
            _this.event(MsgEvent_1.MsgEvent.ReadMsgCallBack, msg);
            // },this.SpreadErronFunc.bind(this), false, 10000)
        }, this.SpreadErronFunc.bind(this), false, 10000);
    };
    MsgModel.prototype.SaveContent = function (msg_type, id, msg) {
        if (msg_type == MsgEvent_1.MsgType.Mail) {
            this.MailContenTabel[id] = msg;
        }
        else {
            this.NoticeContenTabel[id] = msg;
        }
    };
    MsgModel.prototype.GetContentByID = function (type, id) {
        if (type == MsgEvent_1.MsgType.Mail) {
            if (this.MailContenTabel.hasOwnProperty(id)) {
                return this.MailContenTabel[id];
            }
            return null;
        }
        else {
            if (this.NoticeContenTabel.hasOwnProperty(id)) {
                return this.NoticeContenTabel[id];
            }
            return null;
        }
    };
    /**
     *
     * @param isFromHall 是否登录时请求
     */
    MsgModel.prototype.CheckIsAnyMailNotRead = function (isFromHall) {
        if (isFromHall === void 0) { isFromHall = false; }
        if (this.DataTabel == null) {
            return;
        }
        var flag = false;
        var data = isFromHall ? this.DataTabel[MsgEvent_1.MsgType.All] : this.DataTabel[MsgEvent_1.MsgType.Mail];
        if (data) {
            for (var i = 0; i < data.mail.length; i++) {
                if (data.mail[i] && data.mail[i].red_status == 0) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    };
    MsgModel.prototype.CheckIsAnyNoticeNotRead = function (isFromHall) {
        if (isFromHall === void 0) { isFromHall = false; }
        if (this.DataTabel == null) {
            return;
        }
        var flag = false;
        var data = isFromHall ? this.DataTabel[MsgEvent_1.MsgType.All] : this.DataTabel[MsgEvent_1.MsgType.Notice];
        if (data) {
            for (var i = 0; i < data.notice.length; i++) {
                if (data.notice[i] && data.notice[i].red_status == 0) {
                    flag = true;
                    break;
                }
            }
        }
        return flag;
    };
    MsgModel.prototype.clear = function () {
        this.DataTabel = [];
        this.MailContenTabel = [];
        this.NoticeContenTabel = [];
        // Global.Event.off(GlobalEvent.ShowRedSpot,this,this.RefreshData)
    };
    MsgModel.prototype.Sort = function () {
        if (this.DataTabel == null || Global.Toolkit.isEmptyObject(this.DataTabel)) {
            cc.error("没有数据");
            return;
        }
        if (this.DataTabel.hasOwnProperty(MsgEvent_1.MsgType.Mail)) {
            var MailData = this.DataTabel[MsgEvent_1.MsgType.Mail].mail || null;
            if (MailData && MailData.length != 0) {
                MailData.sort(this.SortByStatus);
            }
        }
        if (this.DataTabel.hasOwnProperty(MsgEvent_1.MsgType.Notice)) {
            var NoticeData = this.DataTabel[MsgEvent_1.MsgType.Notice].notice || null;
            if (NoticeData && NoticeData.length != 0) {
                NoticeData.sort(this.SortByStatus);
            }
        }
    };
    /**
     * 根据是否已读排序
     * @param a
     * @param b
     */
    MsgModel.prototype.SortByStatus = function (a, b) {
        if (a.red_status == 0 && b.red_status == 1) {
            return -1;
        }
        else if (a.red_status == 1 && b.red_status == 0) {
            return 1;
        }
        else {
            return b.id - a.id;
        }
    };
    return MsgModel;
}(ModelBase_1.default));
exports.default = MsgModel;

cc._RF.pop();