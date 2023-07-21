
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/MsgModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxNc2dNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBMkQ7QUFDM0QseURBQTBEO0FBQzFELHVEQUErRDtBQUMvRCx5Q0FBOEM7QUFDOUMscUVBQWdGO0FBSWhGO0lBQXNDLDRCQUFTO0lBQS9DO1FBQUEscUVBa1VDO1FBelNXLGVBQVMsR0FBMEIsRUFBRSxDQUFBO1FBQ3JDLHFCQUFlLEdBQXNCLEVBQUUsQ0FBQSxDQUFDLFFBQVE7UUFDaEQsdUJBQWlCLEdBQXNCLEVBQUUsQ0FBQSxDQUFBLFFBQVE7O0lBdVM3RCxDQUFDO0lBalVhLHlCQUFNLEdBQWhCO1FBQ0csTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ2pFLENBQUM7SUFDRCw4QkFBVyxHQUFYLFVBQVksSUFBSTtRQUNaLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUE7UUFDaEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3pCLElBQUcsQ0FBQyxTQUFTLEVBQ2I7WUFDSSxPQUFNO1NBQ1Q7UUFDRCxRQUFRLFdBQVcsRUFBRTtZQUNqQixLQUFLLDJCQUFlLENBQUMsT0FBTztnQkFDeEI7b0JBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7b0JBQ3RDLE1BQU07aUJBQ1Q7WUFDTCxLQUFLLDJCQUFlLENBQUMsSUFBSTtnQkFDckI7b0JBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBQ3BDLE1BQU07aUJBQ1Q7U0FFUjtJQUNMLENBQUM7SUFLTSxnQ0FB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QyxDQWxVcUMsbUJBQVMsR0FrVTlDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsQmFzZSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL21vZGVsL01vZGVsQmFzZVwiO1xyXG5pbXBvcnQgeyBOZXRBcHBmYWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvbmV0L2hhbGwvTmV0RXZlbnRcIjtcclxuaW1wb3J0IHsgTXNnRXZlbnQsIE1zZ1R5cGUgfSBmcm9tIFwiLi4vLi4vaGFsbC91aS9tc2cvTXNnRXZlbnRcIjtcclxuaW1wb3J0IHsgSGFsbFJlZFNwb3RUeXBlIH0gZnJvbSBcIi4vSGFsbE1vZGVsXCI7XHJcbmltcG9ydCBIYWxsUG9wTXNnSGVscGVyLCB7IFBvcFduZE5hbWUgfSBmcm9tIFwiLi4vLi4vaGFsbC90b29sL0hhbGxQb3BNc2dIZWxwZXJcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXNnTW9kZWwgZXh0ZW5kcyBNb2RlbEJhc2V7XHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCl7XHJcbiAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuU2hvd1JlZFNwb3QsdGhpcyx0aGlzLlJlZnJlc2hEYXRhKVxyXG4gICAgfVxyXG4gICAgUmVmcmVzaERhdGEoZGF0YSkge1xyXG4gICAgICAgIGxldCBuZWVkZnJlc2ggPSBkYXRhWzBdIHx8IGZhbHNlXHJcbiAgICAgICAgbGV0IHJlZFNwb3RUeXBlID0gZGF0YVsxXSBcclxuICAgICAgICBpZighbmVlZGZyZXNoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAocmVkU3BvdFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBIYWxsUmVkU3BvdFR5cGUuR29uZ2dhbzpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlJlZnJlc2hEYXRhQnlUeXBlKE1zZ1R5cGUuTm90aWNlKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEhhbGxSZWRTcG90VHlwZS5NYWlsOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUmVmcmVzaERhdGFCeVR5cGUoTXNnVHlwZS5NYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIERhdGFUYWJlbDogeyBba2V5OiBudW1iZXJdOiBhbnkgfSA9e30gXHJcbiAgICBwcml2YXRlIE1haWxDb250ZW5UYWJlbDp7W2tleTpudW1iZXJdOmFueX0gPSB7fSAvL+WtmOWCqOW3suivu+WFrOWRilxyXG4gICAgcHJpdmF0ZSBOb3RpY2VDb250ZW5UYWJlbDp7W2tleTpudW1iZXJdOmFueX0gPSB7fS8v5a2Y5YKo5bey6K+76YKu5Lu2XHJcblxyXG4gICAgcHVibGljIEdldERhdGFCeVR5cGUobXNnX3R5cGU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuRGF0YVRhYmVsW21zZ190eXBlXSAmJiAhR2xvYmFsLlRvb2xraXQuaXNFbXB0eU9iamVjdCh0aGlzLkRhdGFUYWJlbFttc2dfdHlwZV0pKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Tb3J0KClcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLkRhdGFUYWJlbFttc2dfdHlwZV1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGFcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGxcclxuXHJcbiAgICB9XHJcbiAgIFxyXG4gICAgcHVibGljIGdldCBOYW1lKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJNc2dNb2RlbFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1N0YXR1czpudW1iZXIgXHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IFN0YXR1cygpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1N0YXR1c1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWs5ZGK5by556qX5a2X5q61XHJcbiAgICAgKiBAcGFyYW0gc3RhdHVzIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU2V0U3RhdHVzKHN0YXR1cylcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9TdGF0dXMgPSAoc3RhdHVzID09IG51bGwpID8gMDpzdGF0dXNcclxuICAgICAgICBpZiAoc3RhdHVzKXtcclxuICAgICAgICAgICAgSGFsbFBvcE1zZ0hlbHBlci5JbnN0YW5jZS5hZGRNc2dMaXN0KFBvcFduZE5hbWUuTm90aWNlLCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlBPUF9OT1RJQ0UpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVmcmVzaERhdGFCeVR5cGUobXNnX3R5cGU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIC8vIEdsb2JhbC5IYWxsU2VydmVyLmNsZWFyQ2FjaGUoTmV0QXBwZmFjZS5tb2QsTmV0QXBwZmFjZS5HZXRNc2dMaXN0LHt0eXBlOm1zZ190eXBlfSlcclxuICAgICAgICB0aGlzLkNsZWFyQWxsTmV0RmFjZUNhY2hlKClcclxuICAgICAgICB0aGlzLkdldE1zZ0xpc3QobXNnX3R5cGUsZmFsc2UsZmFsc2UsZmFsc2UpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENsZWFyQWxsTmV0RmFjZUNhY2hlKCl7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuY2xlYXJDYWNoZShOZXRBcHBmYWNlLm1vZCxOZXRBcHBmYWNlLkdldE1zZ0xpc3Qse3R5cGU6TXNnVHlwZS5BbGx9KVxyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLmNsZWFyQ2FjaGUoTmV0QXBwZmFjZS5tb2QsTmV0QXBwZmFjZS5HZXRNc2dMaXN0LHt0eXBlOk1zZ1R5cGUuTWFpbH0pXHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuY2xlYXJDYWNoZShOZXRBcHBmYWNlLm1vZCxOZXRBcHBmYWNlLkdldE1zZ0xpc3Qse3R5cGU6TXNnVHlwZS5Ob3RpY2V9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRNc2dMaXN0KG1zZ190eXBlOm51bWJlciwgaXNGcm9tSGFsbCA6Ym9vbGVhbiA9IGZhbHNlLCBpc0ZyZXNoIDpib29sZWFuPWZhbHNlLHNob3d3YWl0aW5nIDpib29sZWFuID0gZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRNc2dMaXN0LCB7dHlwZTptc2dfdHlwZX0sKG1zZykgPT57XHJcbiAgICAgICAgICAgIHRoaXMuRGF0YVRhYmVsW21zZ190eXBlXSA9IG1zZ1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihpc0Zyb21IYWxsKVxyXG4gICAgICAgICAgICB7ICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgTXNnRmxhZyA9IHRoaXMuQ2hlY2tJc0FueU1haWxOb3RSZWFkKGlzRnJvbUhhbGwpXHJcbiAgICAgICAgICAgICAgICBpZihNc2dGbGFnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TaG93UmVkU3BvdCxbZmFsc2UsSGFsbFJlZFNwb3RUeXBlLk1haWxdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbm90aWNlRmxhZyA9IHRoaXMuQ2hlY2tJc0FueU5vdGljZU5vdFJlYWQoaXNGcm9tSGFsbClcclxuICAgICAgICAgICAgICAgIGlmKG5vdGljZUZsYWcpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNob3dSZWRTcG90LFtmYWxzZSxIYWxsUmVkU3BvdFR5cGUuR29uZ2dhb10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Bc3NlbWJseURhdGEobXNnKVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU29ydCgpXHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuRGF0YVRhYmVsW21zZ190eXBlXVxyXG4gICAgICAgICAgICAgICAgaWYobXNnX3R5cGUgPT0gTXNnVHlwZS5Ob3RpY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudChNc2dFdmVudC5Ob3RpY2VMaXN0Q2FsbGJhY2ssZGF0YSkgXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50KE1zZ0V2ZW50Lk1zZ0xpc3RDYWxsYmFjayxkYXRhKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSx0aGlzLlNwcmVhZEVycm9uRnVuYy5iaW5kKHRoaXMpLCBmYWxzZSwgaXNGcmVzaD8wOjE4MCApXHJcbiAgICB9XHJcblxyXG4gICAgQXNzZW1ibHlEYXRhKG1zZzogYW55KSB7XHJcbiAgICAgICAgaWYobXNnID09IG51bGwgfHwgR2xvYmFsLlRvb2xraXQuaXNFbXB0eU9iamVjdChtc2cpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCF0aGlzLkRhdGFUYWJlbC5oYXNPd25Qcm9wZXJ0eShNc2dUeXBlLk1haWwpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB7fVxyXG4gICAgICAgICAgICBkYXRhW1wibWFpbF90b3RhbFwiXSA9IG1zZy5tYWlsX3RvdGFsIHx8IC0xXHJcbiAgICAgICAgICAgIGRhdGFbXCJtYWlsXCJdID0gbXNnLm1haWwgfHwgbnVsbFxyXG4gICAgICAgICAgICB0aGlzLkRhdGFUYWJlbFtNc2dUeXBlLk1haWxdID0gZGF0YSB8fCBudWxsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZighdGhpcy5EYXRhVGFiZWwuaGFzT3duUHJvcGVydHkoTXNnVHlwZS5Ob3RpY2UpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB7fVxyXG4gICAgICAgICAgICBkYXRhW1wibm90aWNlX3RpdGFsXCJdID0gbXNnLm5vdGljZV90aXRhbCB8fCAtMVxyXG4gICAgICAgICAgICBkYXRhW1wibm90aWNlXCJdID0gbXNnLm5vdGljZSB8fCBudWxsXHJcbiAgICAgICAgICAgIHRoaXMuRGF0YVRhYmVsW01zZ1R5cGUuTm90aWNlXSA9IGRhdGEgfHwgbnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTcHJlYWRFcnJvbkZ1bmMoIGRhdGEgOiBhbnkgKXtcclxuICAgICAgICBpZihkYXRhLl9lcnJzdHIgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKGRhdGEuX2VycnN0citcIlwiKTtcclxuICAgICAgICAgIC8vICBHbG9iYWwuVUkuZmFzdFRpcChkYXRhLl9lcnJzdHIrXCJbXCIrZGF0YS5fZXJybm8rXCJdXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgXHJcbiAgICBwdWJsaWMgRGVsTWFpbChpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5EZWxNYWlsLCB7aWQ6aWR9LChtc2cpID0+e1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IE1zZ1R5cGUuTWFpbFxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5EYXRhVGFiZWxbdHlwZV0ubWFpbC5sZW5ndGg7IGkgKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuRGF0YVRhYmVsW3R5cGVdLm1haWxbaV0gJiZ0aGlzLkRhdGFUYWJlbFt0eXBlXS5tYWlsW2ldLmlkID09PSBpZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkRhdGFUYWJlbFt0eXBlXS5tYWlsLnNwbGljZShpLDEpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuQ2xlYXJBbGxOZXRGYWNlQ2FjaGUoKVxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50KE1zZ0V2ZW50LkRlbGV0ZU1zZ0NhbGxiYWNrLG1zZylcclxuXHJcbiAgICAgICAgfSx0aGlzLlNwcmVhZEVycm9uRnVuYy5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWFkTXNnKGlkLG1zZ190eXBlLHJlZF9zdGF0dXMpXHJcbiAgICB7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5SZWFkTXNnLCB7aWQ6aWQsbXNnX3R5cGU6bXNnX3R5cGUscmVkX3N0YXR1czpyZWRfc3RhdHVzfSwobXNnKSA9PntcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBudWxsXHJcblxyXG4gICAgICAgICAgICBpZihtc2dfdHlwZSA9PSBNc2dUeXBlLk1haWwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLkRhdGFUYWJlbFttc2dfdHlwZV0ubWFpbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYobXNnX3R5cGUgPT0gTXNnVHlwZS5Ob3RpY2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLkRhdGFUYWJlbFttc2dfdHlwZV0ubm90aWNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhW2ldICYmZGF0YVtpXS5pZCA9PT0gaWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtpXS5yZWRfc3RhdHVzID0gMVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkNsZWFyQWxsTmV0RmFjZUNhY2hlKClcclxuICAgICAgICAgICAgdGhpcy5TYXZlQ29udGVudChtc2dfdHlwZSxpZCxtc2cpXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnQoTXNnRXZlbnQuUmVhZE1zZ0NhbGxCYWNrLG1zZylcclxuXHJcbiAgICAgICAgLy8gfSx0aGlzLlNwcmVhZEVycm9uRnVuYy5iaW5kKHRoaXMpLCBmYWxzZSwgMTAwMDApXHJcbiAgICAgICAgfSx0aGlzLlNwcmVhZEVycm9uRnVuYy5iaW5kKHRoaXMpLGZhbHNlLDEwMDAwKVxyXG4gICAgfVxyXG4gICAgU2F2ZUNvbnRlbnQobXNnX3R5cGU6IG51bWJlcixpZDpudW1iZXIsIG1zZzogYW55KSB7XHJcbiAgICAgICAgaWYobXNnX3R5cGUgPT0gTXNnVHlwZS5NYWlsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5NYWlsQ29udGVuVGFiZWxbaWRdID0gbXNnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTm90aWNlQ29udGVuVGFiZWxbaWRdID0gbXNnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRDb250ZW50QnlJRCh0eXBlOk1zZ1R5cGUsaWQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHR5cGUgPT0gTXNnVHlwZS5NYWlsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5NYWlsQ29udGVuVGFiZWwuaGFzT3duUHJvcGVydHkoaWQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5NYWlsQ29udGVuVGFiZWxbaWRdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHsgICBcclxuICAgICAgICAgICAgaWYodGhpcy5Ob3RpY2VDb250ZW5UYWJlbC5oYXNPd25Qcm9wZXJ0eShpZCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLk5vdGljZUNvbnRlblRhYmVsW2lkXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGlzRnJvbUhhbGwg5piv5ZCm55m75b2V5pe26K+35rGCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBDaGVja0lzQW55TWFpbE5vdFJlYWQoaXNGcm9tSGFsbDpib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAodGhpcy5EYXRhVGFiZWwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZsYWcgPSBmYWxzZVxyXG4gICAgICAgIGxldCBkYXRhID0gaXNGcm9tSGFsbCA/IHRoaXMuRGF0YVRhYmVsW01zZ1R5cGUuQWxsXTp0aGlzLkRhdGFUYWJlbFtNc2dUeXBlLk1haWxdXHJcbiAgICAgICAgaWYoZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5tYWlsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5tYWlsW2ldICYmIGRhdGEubWFpbFtpXS5yZWRfc3RhdHVzID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZsYWdcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2hlY2tJc0FueU5vdGljZU5vdFJlYWQoaXNGcm9tSGFsbDpib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAodGhpcy5EYXRhVGFiZWwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZsYWcgPSBmYWxzZVxyXG4gICAgICAgIGxldCBkYXRhID0gaXNGcm9tSGFsbCA/IHRoaXMuRGF0YVRhYmVsW01zZ1R5cGUuQWxsXTp0aGlzLkRhdGFUYWJlbFtNc2dUeXBlLk5vdGljZV1cclxuICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLm5vdGljZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubm90aWNlW2ldICYmIGRhdGEubm90aWNlW2ldLnJlZF9zdGF0dXMgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmxhZ1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNsZWFyKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkRhdGFUYWJlbCA9IFtdO1xyXG4gICAgICAgIHRoaXMuTWFpbENvbnRlblRhYmVsID0gW11cclxuICAgICAgICB0aGlzLk5vdGljZUNvbnRlblRhYmVsID0gW11cclxuICAgICAgIC8vIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuU2hvd1JlZFNwb3QsdGhpcyx0aGlzLlJlZnJlc2hEYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTb3J0KClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLkRhdGFUYWJlbCA9PSBudWxsIHx8IEdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QodGhpcy5EYXRhVGFiZWwpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2MuZXJyb3IoXCLmsqHmnInmlbDmja5cIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuRGF0YVRhYmVsLmhhc093blByb3BlcnR5KE1zZ1R5cGUuTWFpbCkpe1xyXG4gICAgICAgICAgICBsZXQgTWFpbERhdGEgPSB0aGlzLkRhdGFUYWJlbFtNc2dUeXBlLk1haWxdLm1haWwgfHwgbnVsbFxyXG4gICAgICAgXHJcbiAgICAgICAgICAgIGlmKE1haWxEYXRhJiZNYWlsRGF0YS5sZW5ndGggIT0gMCApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1haWxEYXRhLnNvcnQodGhpcy5Tb3J0QnlTdGF0dXMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuRGF0YVRhYmVsLmhhc093blByb3BlcnR5KE1zZ1R5cGUuTm90aWNlKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBOb3RpY2VEYXRhID0gdGhpcy5EYXRhVGFiZWxbTXNnVHlwZS5Ob3RpY2VdLm5vdGljZSB8fCBudWxsXHJcbiAgICAgICAgICAgIGlmIChOb3RpY2VEYXRhICYmIE5vdGljZURhdGEubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgIE5vdGljZURhdGEuc29ydCh0aGlzLlNvcnRCeVN0YXR1cylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5piv5ZCm5bey6K+75o6S5bqPXHJcbiAgICAgKiBAcGFyYW0gYSBcclxuICAgICAqIEBwYXJhbSBiIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgU29ydEJ5U3RhdHVzKGEsYilcclxuICAgIHtcclxuICAgICAgICBpZihhLnJlZF9zdGF0dXMgPT0gMCAmJiBiLnJlZF9zdGF0dXMgPT0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAtMVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGEucmVkX3N0YXR1cyA9PSAxICYmIGIucmVkX3N0YXR1cyA9PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDFcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuICBiLmlkLWEuaWQgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn0iXX0=