
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/msg/WndMsg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtc2dcXFduZE1zZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBZ0U7QUFHaEUsdURBQXVEO0FBQ3ZELGdFQUEyRTtBQUMzRSwyQ0FBc0M7QUFDdEMscUNBQStCO0FBQy9CLHVDQUFzQztBQUN0QyxpRUFBc0U7QUFFdEU7SUFBcUIsMEJBQU87SUFBNUI7UUFBQSxxRUFtSUM7UUE3R1csaUJBQVcsR0FBUTtZQUN2QixZQUFZLEVBQUMseUNBQXlDO1lBQ3RELFNBQVMsRUFBQyxzQ0FBc0M7U0FDbkQsQ0FBQTtRQUVPLG9CQUFjLEdBQVE7WUFDMUIsWUFBWSxFQUFDLG9CQUFVO1lBQ3ZCLFNBQVMsRUFBQyxpQkFBTztTQUNwQixDQUFBOztJQXFHTCxDQUFDO0lBbEdhLHVCQUFNLEdBQWhCO1FBQ0kscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUE7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsbUJBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDdEIsQ0FBQztJQUVELDRCQUFXLEdBQVg7UUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUE7UUFDcEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxDQUFBO1FBQ3hELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0s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Q0FuSW9CLGlCQUFPLEdBbUkzQjtBQUNELGtCQUFlLE1BQU0sQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlLCB7IERlc3RvcnlUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG4vLyBpbXBvcnQgTXNnTW9kZWwgZnJvbSBcIi4vTXNnTW9kZWxcIjtcclxuaW1wb3J0IE1zZ01vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL01zZ01vZGVsXCJcclxuLy8gaW1wb3J0IHsgSGFsbFJlZFNwb3RUeXBlIH0gZnJvbSBcIi4uL2hhbGwvSGFsbE1vZGVsXCI7XHJcbmltcG9ydCBIYWxsUG9wTXNnSGVscGVyLCB7IFBvcFduZE5hbWUgfSBmcm9tIFwiLi4vLi4vdG9vbC9IYWxsUG9wTXNnSGVscGVyXCI7XHJcbmltcG9ydCBOb3RpY2VWaWV3IGZyb20gXCIuL05vdGljZVZpZXdcIjtcclxuaW1wb3J0IE1zZ1ZpZXcgZnJvbSBcIi4vTXNnVmlld1wiXHJcbmltcG9ydCB7IE1zZ0V2ZW50IH0gZnJvbSBcIi4vTXNnRXZlbnRcIjtcclxuaW1wb3J0IHsgSGFsbFJlZFNwb3RUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvSGFsbE1vZGVsXCI7XHJcblxyXG5jbGFzcyBXbmRNc2cgZXh0ZW5kcyBXbmRCYXNle1xyXG4gICAgTXNnTW9kZWw6IE1zZ01vZGVsO1xyXG4gXHJcbiAgICBub3RpY2VUaXRsZTogY2MuTm9kZTsgLy/lhazlkYrmoIfpophcclxuICAgIG1zZ1RpdGxlOiBjYy5Ob2RlOyAgICAvL+mCruS7tuagh+mimFxyXG4gICAgbm90aWNlQ2hlY2s6Y2MuTm9kZTtcclxuICAgIG5vdGljZVVuY2hlY2s6Y2MuTm9kZTtcclxuICAgIG1zZ0NoZWNrOmNjLk5vZGU7XHJcbiAgICBtc2dVbmNoZWNrOmNjLk5vZGU7XHJcblxyXG5cclxuICAgIG5vdGljZVBhbmVsOiBjYy5Ob2RlOyAgIFxyXG5cclxuICAgIG5vdGljZVZpZXc6IE5vdGljZVZpZXc7IC8v5YWs5ZGKXHJcblxyXG4gICAgbXNnUGFuZWw6Y2MuTm9kZTtcclxuXHJcbiAgICBtc2dWaWV3Ok1zZ1ZpZXc7ICAgIC8v6YKu5Lu2XHJcblxyXG4gICAgbm90aWNlVW5yZWFkOmNjLk5vZGU7ICAgLy/lhazlkYrlsI/nuqLngrlcclxuICAgIG1zZ1VucmVhZDpjYy5Ob2RlOyAgICAgIC8v6YKu5Lu25bCP57qi54K5XHJcblxyXG4gICAgcHJpdmF0ZSBzdWJWaWV3UGF0aCA6YW55ID0ge1xyXG4gICAgICAgIFwibm90aWNlVmlld1wiOlwiaGFsbC9wcmVmYWJzL3VpL21zZy9zdWJWaWV3L05vdGljZVBhbmVsXCIsXHJcbiAgICAgICAgXCJtc2dWaWV3XCI6XCJoYWxsL3ByZWZhYnMvdWkvbXNnL3N1YlZpZXcvTXNnUGFuZWxcIlxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmlld0tleVR5cGVNYXAgOmFueSA9IHtcclxuICAgICAgICBcIm5vdGljZVZpZXdcIjpOb3RpY2VWaWV3LFxyXG4gICAgICAgIFwibXNnVmlld1wiOk1zZ1ZpZXdcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3Blbigpe1xyXG4gICAgICAgIC8vIHRoaXMubm90aWNlVGl0bGUuaXNDaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNoYW5nZVRpdGxlKGZhbHNlKTtcclxuICAgICAgICB0aGlzLmNoYW5nZU5vdGljZVBhbmVsKClcclxuICAgICAgICB0aGlzLk1zZ01vZGVsLm9uKE1zZ0V2ZW50LlJlYWRNc2dDYWxsQmFjaywgdGhpcywgdGhpcy5jaGVja1VucmVhZCk7XHJcbiAgICAgICAgdGhpcy5jaGVja1VucmVhZCgpXHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tVbnJlYWQoKXtcclxuICAgICAgICBsZXQgTWFpbEZsYWcgPSB0aGlzLk1zZ01vZGVsLkNoZWNrSXNBbnlNYWlsTm90UmVhZCgpXHJcbiAgICAgICAgbGV0IE5vdGljZUZsYWcgPSB0aGlzLk1zZ01vZGVsLkNoZWNrSXNBbnlOb3RpY2VOb3RSZWFkKClcclxuICAgICAgICB0aGlzLm1zZ1VucmVhZC5hY3RpdmUgPSBNYWlsRmxhZztcclxuICAgICAgICB0aGlzLm5vdGljZVVucmVhZC5hY3RpdmUgPSBOb3RpY2VGbGFnOyBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/liIfmjaLlhazlkYpcclxuICAgIGNoYW5nZU5vdGljZVBhbmVsKCl7XHJcbiAgICAgICAgLy8gdGhpcy5tc2dWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMubm90aWNlVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubXNnVmlldy5zdWJWaWV3U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vdGljZVZpZXcuc3ViVmlld1N0YXRlID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMuY2hhbmdlVGl0bGUoZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgLy/liIfmjaLpgq7ku7ZcclxuICAgIGNoYW5nZU1zZ1BhbmVsKCl7XHJcbiAgICAgICAgLy8gdGhpcy5ub3RpY2VWaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMubXNnVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubm90aWNlVmlldy5zdWJWaWV3U3RhdGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1zZ1ZpZXcuc3ViVmlld1N0YXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNoYW5nZVRpdGxlKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKXtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZE1zZ1wiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBcIlBvcExheWVyXCI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvbXNnL01zZ1VJXCI7XHJcbiAgICAgICAgdGhpcy5Nc2dNb2RlbCA9IDxNc2dNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiTXNnTW9kZWxcIik7XHJcbiAgICAgICAgdGhpcy5kZXN0b3J5VHlwZSA9IERlc3RvcnlUeXBlLkNoYW5nZVNjZW5lO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMubm90aWNlVGl0bGUgPSB0aGlzLmdldENoaWxkKFwiYmcxL3RvcEJ1dHRvbi9ub3RpY2VUaXRsZVwiKTtcclxuICAgICAgICB0aGlzLm1zZ1RpdGxlID0gdGhpcy5nZXRDaGlsZChcImJnMS90b3BCdXR0b24vbXNnVGl0bGVcIik7XHJcbiAgICAgICAgdGhpcy5ub3RpY2VDaGVjayA9IHRoaXMuZ2V0Q2hpbGQoXCJiZzEvdG9wQnV0dG9uL25vdGljZVRpdGxlL2NoZWNrXCIpO1xyXG4gICAgICAgIHRoaXMubm90aWNlVW5jaGVjayA9IHRoaXMuZ2V0Q2hpbGQoXCJiZzEvdG9wQnV0dG9uL25vdGljZVRpdGxlL3VuY2hlY2tcIik7XHJcbiAgICAgICAgdGhpcy5tc2dDaGVjayA9IHRoaXMuZ2V0Q2hpbGQoXCJiZzEvdG9wQnV0dG9uL21zZ1RpdGxlL2NoZWNrXCIpO1xyXG4gICAgICAgIHRoaXMubXNnVW5jaGVjayA9IHRoaXMuZ2V0Q2hpbGQoXCJiZzEvdG9wQnV0dG9uL21zZ1RpdGxlL3VuY2hlY2tcIik7XHJcblxyXG4gICAgICAgIHRoaXMubm90aWNlVGl0bGUub24oXCJjbGlja1wiLCB0aGlzLmNoYW5nZU5vdGljZVBhbmVsLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm1zZ1RpdGxlLm9uKFwiY2xpY2tcIiwgdGhpcy5jaGFuZ2VNc2dQYW5lbCwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMubm90aWNlVW5yZWFkID0gdGhpcy5nZXRDaGlsZChcImJnMS90b3BCdXR0b24vbm90aWNlVGl0bGUvdW5yZWFkXCIpO1xyXG4gICAgICAgIHRoaXMubXNnVW5yZWFkID0gdGhpcy5nZXRDaGlsZChcImJnMS90b3BCdXR0b24vbXNnVGl0bGUvdW5yZWFkXCIpO1xyXG4gICAgICAgIHRoaXMubm90aWNlVW5yZWFkLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubXNnVW5yZWFkLmFjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyB0aGlzLm5vdGljZVBhbmVsID0gdGhpcy5nZXRDaGlsZChcIk5vdGljZU5vZGVcIik7XHJcbiAgICAgICAgLy8gdGhpcy5ub3RpY2VWaWV3ID0gPE5vdGljZVZpZXc+dGhpcy5hZGRWaWV3KFwiTm90aWNlVmlld1wiLCB0aGlzLm5vdGljZVBhbmVsLCBOb3RpY2VWaWV3KTtcclxuICAgICAgICAvLyB0aGlzLm1zZ1BhbmVsID0gdGhpcy5nZXRDaGlsZChcIk1zZ05vZGVcIik7XHJcbiAgICAgICAgLy8gdGhpcy5tc2dWaWV3ID0gPE1zZ1ZpZXc+dGhpcy5hZGRWaWV3KFwiTXNnVmlld1wiLHRoaXMubXNnUGFuZWwsTXNnVmlldyk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNsb3NlXCIsIHRoaXMuY2xvc2VXbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaW5pdFN1YlZpZXdDbGFzcyh0aGlzLnZpZXdLZXlUeXBlTWFwKVxyXG4gICAgICAgIHRoaXMuSW5pdFNjcmlwdHMoKVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVRpdGxlKGlzTXNnOmJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMubXNnQ2hlY2suYWN0aXZlID0gaXNNc2c7XHJcbiAgICAgICAgdGhpcy5tc2dVbmNoZWNrLmFjdGl2ZSA9ICFpc01zZztcclxuICAgICAgICB0aGlzLm5vdGljZUNoZWNrLmFjdGl2ZSA9ICFpc01zZztcclxuICAgICAgICB0aGlzLm5vdGljZVVuY2hlY2suYWN0aXZlID0gaXNNc2c7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgSW5pdFNjcmlwdHMoKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5pbml0U3ViVmlldyh0aGlzLnN1YlZpZXdQYXRoLHRoaXMudmlld0tleVR5cGVNYXAsdGhpcy5nZXRDaGlsZChcImNvbnRlbnROb2RlXCIpKVxyXG4gICAgfVxyXG4gICBcclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCkge1xyXG4gICAgICAgIGxldCBNYWlsRmxhZyA9IHRoaXMuTXNnTW9kZWwuQ2hlY2tJc0FueU1haWxOb3RSZWFkKClcclxuICAgICAgICBsZXQgTm90aWNlRmxhZyA9IHRoaXMuTXNnTW9kZWwuQ2hlY2tJc0FueU5vdGljZU5vdFJlYWQoKVxyXG4gICAgICAgIGlmIChNYWlsRmxhZyB8fCBOb3RpY2VGbGFnKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TaG93UmVkU3BvdCwgW2ZhbHNlLCBIYWxsUmVkU3BvdFR5cGUuTWFpbF0pO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkNsb3NlUmVkU3BvdCwgSGFsbFJlZFNwb3RUeXBlLk1haWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLk1zZ01vZGVsLm9mZihNc2dFdmVudC5SZWFkTXNnQ2FsbEJhY2ssIHRoaXMsIHRoaXMuY2hlY2tVbnJlYWQpO1xyXG4gICAgICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UucmVsZWFzZUxvY2soUG9wV25kTmFtZS5NYWlsKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbG9zZVduZCgpe1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKCl7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFduZE1zZyJdfQ==