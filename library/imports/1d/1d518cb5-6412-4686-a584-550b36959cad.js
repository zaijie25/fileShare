"use strict";
cc._RF.push(module, '1d518y1ZBJGhqWEVQs2lZyt', 'WndMsg');
// hall/scripts/logic/hall/ui/msg/WndMsg.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var WndBase_1 = require("../../../core/ui/WndBase");
// import { HallRedSpotType } from "../hall/HallModel";
var HallPopMsgHelper_1 = require("../../tool/HallPopMsgHelper");
var NoticeView_1 = require("./NoticeView");
var MsgView_1 = require("./MsgView");
var MsgEvent_1 = require("./MsgEvent");
var HallModel_1 = require("../../../hallcommon/model/HallModel");
var WndMsg = /** @class */ (function (_super) {
    __extends(WndMsg, _super);
    function WndMsg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.subViewPath = {
            "noticeView": "hall/prefabs/ui/msg/subView/NoticePanel",
            "msgView": "hall/prefabs/ui/msg/subView/MsgPanel"
        };
        _this.viewKeyTypeMap = {
            "noticeView": NoticeView_1.default,
            "msgView": MsgView_1.default
        };
        return _this;
    }
    WndMsg.prototype.onOpen = function () {
        // this.noticeTitle.isChecked = true;
        this.changeTitle(false);
        this.changeNoticePanel();
        this.MsgModel.on(MsgEvent_1.MsgEvent.ReadMsgCallBack, this, this.checkUnread);
        this.checkUnread();
    };
    WndMsg.prototype.checkUnread = function () {
        var MailFlag = this.MsgModel.CheckIsAnyMailNotRead();
        var NoticeFlag = this.MsgModel.CheckIsAnyNoticeNotRead();
        this.msgUnread.active = MailFlag;
        this.noticeUnread.active = NoticeFlag;
    };
    //切换公告
    WndMsg.prototype.changeNoticePanel = function () {
        // this.msgView.active = false;
        // this.noticeView.active = true;
        this.msgView.subViewState = false;
        this.noticeView.subViewState = true;
        this.changeTitle(false);
    };
    //切换邮件
    WndMsg.prototype.changeMsgPanel = function () {
        // this.noticeView.active = false;
        // this.msgView.active = true;
        this.noticeView.subViewState = false;
        this.msgView.subViewState = true;
        this.changeTitle(true);
    };
    WndMsg.prototype.onInit = function () {
        this.name = "WndMsg";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/msg/MsgUI";
        this.MsgModel = Global.ModelManager.getModel("MsgModel");
        this.destoryType = WndBase_1.DestoryType.ChangeScene;
    };
    WndMsg.prototype.initView = function () {
        this.noticeTitle = this.getChild("bg1/topButton/noticeTitle");
        this.msgTitle = this.getChild("bg1/topButton/msgTitle");
        this.noticeCheck = this.getChild("bg1/topButton/noticeTitle/check");
        this.noticeUncheck = this.getChild("bg1/topButton/noticeTitle/uncheck");
        this.msgCheck = this.getChild("bg1/topButton/msgTitle/check");
        this.msgUncheck = this.getChild("bg1/topButton/msgTitle/uncheck");
        this.noticeTitle.on("click", this.changeNoticePanel, this);
        this.msgTitle.on("click", this.changeMsgPanel, this);
        this.noticeUnread = this.getChild("bg1/topButton/noticeTitle/unread");
        this.msgUnread = this.getChild("bg1/topButton/msgTitle/unread");
        this.noticeUnread.active = false;
        this.msgUnread.active = false;
        // this.noticePanel = this.getChild("NoticeNode");
        // this.noticeView = <NoticeView>this.addView("NoticeView", this.noticePanel, NoticeView);
        // this.msgPanel = this.getChild("MsgNode");
        // this.msgView = <MsgView>this.addView("MsgView",this.msgPanel,MsgView);
        this.addCommonClick("close", this.closeWnd, this);
        this.initSubViewClass(this.viewKeyTypeMap);
        this.InitScripts();
    };
    WndMsg.prototype.changeTitle = function (isMsg) {
        this.msgCheck.active = isMsg;
        this.msgUncheck.active = !isMsg;
        this.noticeCheck.active = !isMsg;
        this.noticeUncheck.active = isMsg;
    };
    WndMsg.prototype.InitScripts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initSubView(this.subViewPath, this.viewKeyTypeMap, this.getChild("contentNode"))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WndMsg.prototype.onClose = function () {
        var MailFlag = this.MsgModel.CheckIsAnyMailNotRead();
        var NoticeFlag = this.MsgModel.CheckIsAnyNoticeNotRead();
        if (MailFlag || NoticeFlag) {
            Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallModel_1.HallRedSpotType.Mail]);
        }
        else {
            Global.Event.event(GlobalEvent.CloseRedSpot, HallModel_1.HallRedSpotType.Mail);
        }
        this.MsgModel.off(MsgEvent_1.MsgEvent.ReadMsgCallBack, this, this.checkUnread);
        HallPopMsgHelper_1.default.Instance.releaseLock(HallPopMsgHelper_1.PopWndName.Mail);
    };
    WndMsg.prototype.closeWnd = function () {
        this.close();
    };
    WndMsg.prototype.onDispose = function () {
    };
    return WndMsg;
}(WndBase_1.default));
exports.default = WndMsg;

cc._RF.pop();