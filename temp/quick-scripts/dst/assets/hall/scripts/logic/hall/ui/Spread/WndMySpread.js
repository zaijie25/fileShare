
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/WndMySpread.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4a86c00O0FIxI19ftQo2VgH', 'WndMySpread');
// hall/scripts/logic/hall/ui/Spread/WndMySpread.ts

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
var SpreadEvent_1 = require("./SpreadEvent");
var AppHelper_1 = require("../../../core/tool/AppHelper");
var ViewBase_1 = require("../../../core/ui/ViewBase");
var YXButton_1 = require("../../../core/component/YXButton");
var CodeTipView_1 = require("../waiting/CodeTipView");
var WaitingView_1 = require("../waiting/WaitingView");
var WndMySpreadUnlimited = /** @class */ (function (_super) {
    __extends(WndMySpreadUnlimited, _super);
    function WndMySpreadUnlimited() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndMySpreadUnlimited.prototype.initView = function () {
        if (this.waitingNode == null || this.waitingNode == undefined) {
            //view 内的loading
            this.waitingNode = WaitingView_1.default.initWaitingView(this.node, cc.v2(0, 0));
        }
        this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
        this.registEvent();
        this.MyId = this.getChild("Leftbox/MyId/Count").getComponent(cc.Label);
        this.SuperiorId = this.getChild("Leftbox/SuperiorId/Count").getComponent(cc.Label);
        this.AllAddPeople = this.getChild("Leftbox/AllAddPeople/Count").getComponent(cc.Label);
        this.TodayAllMoney = this.getChild("Leftbox/TodayAllMoney/Count").getComponent(cc.Label);
        this.MyAddPeople = this.getChild("Leftbox/MyAddPeople/Count").getComponent(cc.Label);
        this.TodayMyMoney = this.getChild("Leftbox/TodayMyMoney/Count").getComponent(cc.Label);
        this.YesterdayAllMoney = this.getChild("Leftbox/YesterdayAllMoney/Count").getComponent(cc.Label);
        this.YesterdayMoney = this.getChild("Leftbox/YesterdayMoney/Count").getComponent(cc.Label);
        this.UrlString = this.getChild("Adapt/Url/TEXT_LABEL").getComponent(cc.Label);
        this.QRNode = this.getChild("Adapt/SpriteMa/qrNode");
        this.codeTip = this.getChild("Adapt/SpriteMa/codeTip").getComponent(CodeTipView_1.default);
        this.inviteNode = this.getChild("Adapt/InviteCode");
        this.inviteNode.active = false;
        this.AwardRecordBtn = this.getChild("Adapt/BotButton/AwardRecordBtn/Background");
        this.AwardRecordReturnBtn = this.getChild("Adapt/BotButton/AwardRecordBtn/BackReturn");
        this.InviteCodeInput = this.getChild("Adapt/InviteCode/InviteCodeInput").getComponent(cc.EditBox);
        this.HistoryLabel = this.getChild("GetAwardPanel/bg/HistoryTitle/HisAward").getComponent(cc.Label);
        this.CurrentAward = this.getChild("GetAwardPanel/bg/contentBg/currentAward").getComponent(cc.Label);
        this.EffectNode = this.getChild("GetAwardPanel/bg/GetAwardBtn");
        this.EffectNode.active = true;
        var btn = this.EffectNode.getComponent(YXButton_1.default);
        if (btn) {
            Global.UIHelper.setNodeGray(btn.node, true, 250, true);
            btn.interactable = true;
        }
        this.addCommonClick("Adapt/WeChat", this.ShareToFriend, this);
        this.addCommonClick("Adapt/SpriteMa", this.OnQRCodeClicked, this);
        this.addCommonClick("Adapt/WeChatFriends", this.ShareToWeChatFriends, this);
        this.addCommonClick("Adapt/BotButton/AwardRecordBtn/Background", this.OnRecordBtnClicked, this);
        this.addCommonClick("Adapt/BotButton/AwardRecordBtn/BackReturn", this.OnCommissionBtnClicked, this);
        this.addCommonClick("Adapt/Url/CopyUrl", this.OnCopyClicked, this);
        this.addCommonClick("Adapt/InviteCode/BindInviteCode", this.OnBindClicked, this);
        this.addCommonClick("GetAwardPanel/bg/GetAwardBtn", this.GetDayAgent, this);
    };
    WndMySpreadUnlimited.prototype.registEvent = function () {
        this.SpreadModel.on(SpreadEvent_1.SpreadEvent.GetDayAgentShare, this, this.OnGetAgentShare);
        this.SpreadModel.on(SpreadEvent_1.SpreadEvent.GetDayAgentRecord, this, this.OpenAwardRecord);
        this.SpreadModel.on(SpreadEvent_1.SpreadEvent.GetDayAgentCommi, this, this.OpenRrturnMoney);
        this.SpreadModel.on(SpreadEvent_1.SpreadEvent.GetDayAgent, this, this.OnGetReward);
        this.SpreadModel.on(SpreadEvent_1.SpreadEvent.BindSucceed, this, this.OnBindSucceed);
        this.SpreadModel.on(SpreadEvent_1.SpreadEvent.RefreshShortUrl, this, this.OnRefreshUrl);
    };
    WndMySpreadUnlimited.prototype.OnBindClicked = function () {
        if (this.CheckInput(this.InviteCodeInput.string)) {
            this.SpreadModel.BindInviteCode(Number(this.InviteCodeInput.string));
        }
    };
    WndMySpreadUnlimited.prototype.CheckInput = function (text) {
        if (text.length <= 0) {
            Global.UI.fastTip("推荐人ID不能为空!");
            return false;
        }
        if (text.length < 6) {
            Global.UI.fastTip("请输入正确的推荐人ID!");
            return false;
        }
        return true;
    };
    WndMySpreadUnlimited.prototype.GetDayAgent = function () {
        this.SpreadModel.GetDayAgent();
    };
    WndMySpreadUnlimited.prototype.OnCopyClicked = function () {
        var url = this.UrlString.string || null;
        if (!url) {
            Global.UI.fastTip("正在获取推广链接，请稍后再试！");
            return;
        }
        Global.NativeEvent.copyTextToClipboard(String(url), this.copyTextToClipboardCallBack.bind(this));
    };
    WndMySpreadUnlimited.prototype.copyTextToClipboardCallBack = function (retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
        }
        else {
            Global.UI.fastTip("复制失败");
        }
    };
    WndMySpreadUnlimited.prototype.OnRecordBtnClicked = function () {
        var data = null; //this.SpreadModel.AwardRecordData;
        if (data == null) {
            this.SpreadModel.GetDayAgentRecord(1, 6);
        }
        else {
            Global.UI.show("WndAwardRecord", data);
        }
    };
    WndMySpreadUnlimited.prototype.OnCommissionBtnClicked = function () {
        var data = this.SpreadModel.CommidData;
        if (data == null) {
            this.SpreadModel.GetDayAgentCommi();
        }
        else {
            Global.UI.show("WndCommissionlist", data);
        }
    };
    WndMySpreadUnlimited.prototype.ShareToWeChatFriends = function () {
        var flag = Global.Toolkit.checkVersionSupport(10006);
        // if (flag) {
        if (true) {
            var url = Global.Setting.Urls.inviteUrl;
            var filePath = jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(url) + '_capImage.png';
            if (Global.Toolkit.CheckFileExist(filePath)) {
                this.wxShare(1, Global.Setting.wxFirendShareTitle, Global.Setting.wxFirendShareContent);
                return;
            }
            var self_1 = this;
            var callback = function () {
                self_1.wxShare(1, Global.Setting.wxFirendShareTitle, Global.Setting.wxFirendShareContent);
            };
            var wndSpread = Global.UI.getWindow("WndSpread");
            if (wndSpread) {
                wndSpread.CaptureTool.node.active = true;
                wndSpread.CaptureTool.BeginCapture(url, callback);
            }
        }
        else {
            Global.UI.show("WndMessageBox", "版本过旧，请下载新包使用该功能！", 2, function () {
                cc.sys.openURL(Global.Setting.Urls.downLoadUrl);
            }, function () {
            });
        }
    };
    WndMySpreadUnlimited.prototype.ShareToFriend = function () {
        var flag = Global.Toolkit.checkVersionSupport(10006);
        //if (flag) {
        if (true) {
            var url = Global.Setting.Urls.inviteUrl;
            var filePath = jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(url) + '_capImage.png';
            if (Global.Toolkit.CheckFileExist(filePath)) {
                this.wxShare(0, Global.Setting.wxMomentShareTitle, Global.Setting.wxMomentShareContent);
                return;
            }
            var self_2 = this;
            var callback = function () {
                self_2.wxShare(0, Global.Setting.wxMomentShareTitle, Global.Setting.wxMomentShareContent);
            };
            var wndSpread = Global.UI.getWindow("WndSpreadUnlimited");
            if (wndSpread) {
                wndSpread.CaptureTool.node.active = true;
                wndSpread.CaptureTool.BeginCapture(url, callback);
            }
        }
        else {
            Global.UI.show("WndMessageBox", "版本过旧，请下载新包使用该功能！", 2, function () {
                cc.sys.openURL(Global.Setting.Urls.downLoadUrl);
            }, function () {
            });
        }
        // Global.UI.fastTip("功能暂未开放，请手动截图分享")
    };
    WndMySpreadUnlimited.prototype.wxShare = function (type, title, content) {
        if (!AppHelper_1.default.enableWxShare)
            return;
        // if(!AppHelper.getAppWXShareEnable())
        //     return;
        var shareUrl = Global.Setting.Urls.inviteUrl;
        shareUrl = this.SpreadModel.Url || shareUrl;
        Global.NativeEvent.checkWXInstall(function (result) {
            if (result.result == 0) {
                Global.NativeEvent.shareWX(type, 2, title, Global.Toolkit.getSpreadImgPath(), shareUrl, content, null);
            }
            else {
                Global.UI.fastTip("请安装微信");
            }
        });
    };
    WndMySpreadUnlimited.prototype.OnQRCodeClicked = function () {
        Global.UI.show("WndSpreadCenter", this.UrlString.string);
    };
    WndMySpreadUnlimited.prototype.onSubViewShow = function () {
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        var url = Global.Setting.Urls.getinviteUrl();
        // this.getChild("RightPanel/bg_popup_middle/MySpreadPanel/Adapt/QRBigNode").getComponent("TestCap").CreatImage()
        this.SpreadModel.GetDayAgentShare(url);
        this.InitQrcode();
    };
    WndMySpreadUnlimited.prototype.OnBindSucceed = function (data) {
        this.inviteNode.active = false;
        this.SetGetAwardBtnPos(true);
        Global.UI.fastTip("绑定推荐人成功");
    };
    WndMySpreadUnlimited.prototype.InitQrcode = function () {
        var shareUrl = Global.Setting.Urls.inviteUrl;
        shareUrl = this.SpreadModel.Url || shareUrl;
        if (this.SpreadModel.urlType != 1) {
            this.codeTip.error();
        }
        else {
            Global.Toolkit.initQRCode(this.QRNode, shareUrl, 10);
            this.codeTip.success();
        }
        //this.CaptureTool.CreatImage(this.CapNode)
        //this.QRNode.getComponent("CaptureTool").CreatImage()
    };
    WndMySpreadUnlimited.prototype.OnGetReward = function (data) {
        this.CurrentAward.string = "0";
        var btn = this.EffectNode.getComponent(YXButton_1.default);
        if (btn) {
            Global.UIHelper.setNodeGray(btn.node, true, 150, false);
            btn.interactable = false;
        }
        Global.UI.show("WndRebateGet", data.get_point);
    };
    WndMySpreadUnlimited.prototype.OnGetAgentShare = function (data) {
        if (this.waitingNode) {
            this.waitingNode.active = false;
        }
        var wndSpread = Global.UI.getWindow("WndSpread");
        if (wndSpread) {
            wndSpread.OnDataPrepared();
        }
        this.initLetPanel(data);
    };
    WndMySpreadUnlimited.prototype.OnRefreshUrl = function () {
        var url = this.SpreadModel.Url;
        if (this.SpreadModel.urlType != 1) {
            this.UrlString.string = "";
            this.codeTip.error();
        }
        else {
            this.UrlString.string = url;
            Global.Toolkit.initQRCode(this.QRNode, url, 10);
            this.codeTip.success();
        }
        var wndSpread = Global.UI.getWindow("WndSpread");
        if (wndSpread) {
            wndSpread.InitQrcode(url);
        }
    };
    WndMySpreadUnlimited.prototype.initLetPanel = function (data) {
        if (data == null) {
            this.MyId.string = "";
            this.SuperiorId.string = "";
            this.AllAddPeople.string = "";
            this.TodayAllMoney.string = "";
            this.MyAddPeople.string = "";
            this.TodayMyMoney.string = "";
            this.YesterdayAllMoney.string = "";
            this.YesterdayMoney.string = "";
            this.CurrentAward.string = "";
            this.HistoryLabel.string = "";
            this.UrlString.string = "";
            this.InviteCodeInput.string = "";
        }
        else {
            this.MyId.string = Global.PlayerData.uid.toString();
            this.SuperiorId.string = data.pid;
            this.AllAddPeople.string = data.team_num;
            this.TodayAllMoney.string = Global.Toolkit.formatPoint(data.day_team_flow, 3).toString();
            this.MyAddPeople.string = data.unter_new_num;
            this.TodayMyMoney.string = Global.Toolkit.formatPoint(data.day_unter_flow, 3).toString();
            this.YesterdayAllMoney.string = Global.Toolkit.formatPoint(data.ye_total_flow, 3).toString();
            this.YesterdayMoney.string = this.GetText(Global.Toolkit.formatPointStr(data.ye_commi));
            this.UrlString.string = this.GetText(Global.Toolkit.formatPointStr(data.url));
            if (data.read_commi === 0) {
                var btn = this.EffectNode.getComponent(YXButton_1.default);
                if (btn) {
                    Global.UIHelper.setNodeGray(btn.node, true, 150, false);
                    btn.interactable = false;
                }
            }
            else {
                var btn = this.EffectNode.getComponent(YXButton_1.default);
                if (btn) {
                    Global.UIHelper.setNodeGray(btn.node, true, 250, true);
                    btn.interactable = true;
                }
            }
            this.CurrentAward.string = this.GetText(Global.Toolkit.formatPointStr(data.read_commi));
            this.HistoryLabel.string = this.GetText(Global.Toolkit.formatPointStr(data.total_commi));
            if (data.pid != 0) {
                this.inviteNode.active = false;
                this.SetGetAwardBtnPos(true);
                this.InviteCodeInput.string = data.pid.toString();
            }
            else {
                if (Global.PlayerData.pack === 0) {
                    this.inviteNode.active = false;
                    this.SetGetAwardBtnPos(false);
                    this.InviteCodeInput.string = "";
                }
                else {
                    this.inviteNode.active = false;
                    this.SetGetAwardBtnPos(true);
                }
            }
            if (data.read_point > 0) {
                if (this.EffectNode)
                    this.EffectNode.active = true;
            }
            if (this.SpreadModel.urlType != 1) {
                this.UrlString.string = "";
                this.codeTip.error();
            }
            else {
                this.UrlString.string = this.SpreadModel.Url;
                Global.Toolkit.initQRCode(this.QRNode, this.SpreadModel.Url, 10);
                this.codeTip.success();
            }
        }
    };
    WndMySpreadUnlimited.prototype.SetGetAwardBtnPos = function (chg) {
        var index = chg ? 1 : 0;
        // this.AwardRecordBtn.position.y = Global.Setting.SkinConfig.mySpreadOrgChgPosYs[index];
    };
    WndMySpreadUnlimited.prototype.GetText = function (num) {
        var txt;
        txt = num.toString();
        return txt;
    };
    WndMySpreadUnlimited.prototype.OpenAwardRecord = function (data) {
        Global.UI.show("WndAwardRecord", data);
    };
    WndMySpreadUnlimited.prototype.OpenRrturnMoney = function (data) {
        Global.UI.show("WndCommissionlist", data);
    };
    WndMySpreadUnlimited.prototype.onSubViewHide = function () {
    };
    WndMySpreadUnlimited.prototype.onDispose = function () {
        this.SpreadModel.off(SpreadEvent_1.SpreadEvent.GetDayAgentShare, this, this.OnGetAgentShare);
        this.SpreadModel.off(SpreadEvent_1.SpreadEvent.GetDayAgentRecord, this, this.OpenAwardRecord);
        this.SpreadModel.off(SpreadEvent_1.SpreadEvent.GetDayAgentCommi, this, this.OpenRrturnMoney);
        this.SpreadModel.off(SpreadEvent_1.SpreadEvent.GetSelfRead, this, this.OnGetReward);
        this.SpreadModel.off(SpreadEvent_1.SpreadEvent.BindSucceed, this, this.OnBindSucceed);
        this.SpreadModel.off(SpreadEvent_1.SpreadEvent.RefreshShortUrl, this, this.OnRefreshUrl);
    };
    return WndMySpreadUnlimited;
}(ViewBase_1.default));
exports.default = WndMySpreadUnlimited;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXFduZE15U3ByZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZDQUE0QztBQUM1QywwREFBcUQ7QUFDckQsc0RBQWlEO0FBQ2pELDZEQUF3RDtBQUN4RCxzREFBaUQ7QUFDakQsc0RBQWlEO0FBRWpEO0lBQWtELHdDQUFRO0lBQTFEOztJQTJaQSxDQUFDO0lBbllhLHVDQUFRLEdBQWxCO1FBQ0ksSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLFNBQVMsRUFBRTtZQUMzRCxnQkFBZ0I7WUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUU7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFnQixNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN0RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ2xGLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdEYsSUFBSSxDQUFDLGFBQWEsR0FB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QyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0lBRU0sOENBQWUsR0FBdEIsVUFBdUIsSUFBSTtRQUN2QixNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBRUQsNENBQWEsR0FBYjtJQUdBLENBQUM7SUFDUyx3Q0FBUyxHQUFuQjtRQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLHlCQUFXLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyx5QkFBVyxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMseUJBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLHlCQUFXLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDckUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMseUJBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUN2RSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyx5QkFBVyxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBRTlFLENBQUM7SUFHTCwyQkFBQztBQUFELENBM1pBLEFBMlpDLENBM1ppRCxrQkFBUSxHQTJaekQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3ByZWFkTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvU3ByZWFkTW9kZWxcIjtcclxuaW1wb3J0IHsgU3ByZWFkRXZlbnQgfSBmcm9tIFwiLi9TcHJlYWRFdmVudFwiO1xyXG5pbXBvcnQgQXBwSGVscGVyIGZyb20gXCIuLi8uLi8uLi9jb3JlL3Rvb2wvQXBwSGVscGVyXCI7XHJcbmltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgWVhCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvcmUvY29tcG9uZW50L1lYQnV0dG9uXCI7XHJcbmltcG9ydCBDb2RlVGlwVmlldyBmcm9tIFwiLi4vd2FpdGluZy9Db2RlVGlwVmlld1wiO1xyXG5pbXBvcnQgV2FpdGluZ1ZpZXcgZnJvbSBcIi4uL3dhaXRpbmcvV2FpdGluZ1ZpZXdcIjtcclxuaW1wb3J0IFduZFNwcmVhZCBmcm9tIFwiLi9XbmRTcHJlYWRcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kTXlTcHJlYWRVbmxpbWl0ZWQgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgU3ByZWFkTW9kZWw6IFNwcmVhZE1vZGVsO1xyXG4gICAgcHJpdmF0ZSBNeUlkOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgU3VwZXJpb3JJZDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIEFsbEFkZFBlb3BsZTogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIFRvZGF5QWxsTW9uZXk6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBNeUFkZFBlb3BsZTogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIFRvZGF5TXlNb25leTogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIFllc3RlcmRheUFsbE1vbmV5OiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgWWVzdGVyZGF5TW9uZXk6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBVcmxTdHJpbmc6IGNjLkxhYmVsXHJcbiAgICBwcml2YXRlIEludml0ZUNvZGVJbnB1dDogY2MuRWRpdEJveFxyXG4gICAgcHJpdmF0ZSBIaXN0b3J5TGFiZWw6IGNjLkxhYmVsXHJcbiAgICBwcml2YXRlIEN1cnJlbnRBd2FyZDogY2MuTGFiZWxcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBRUk5vZGU6IGNjLk5vZGVcclxuICAgIHByaXZhdGUgRWZmZWN0Tm9kZTogY2MuTm9kZVxyXG4gICAgcHJpdmF0ZSBBd2FyZFJlY29yZEJ0bjogY2MuTm9kZVxyXG4gICAgcHJpdmF0ZSBBd2FyZFJlY29yZFJldHVybkJ0bjogY2MuTm9kZVxyXG4gICAgcHJpdmF0ZSBpbnZpdGVOb2RlOiBjYy5Ob2RlXHJcbiAgICBwcml2YXRlIGNvZGVUaXA6IENvZGVUaXBWaWV3XHJcbiAgICBwcml2YXRlIHdhaXRpbmdOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIGlmICh0aGlzLndhaXRpbmdOb2RlID09IG51bGwgfHwgdGhpcy53YWl0aW5nTm9kZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy92aWV3IOWGheeahGxvYWRpbmdcclxuICAgICAgICAgICAgdGhpcy53YWl0aW5nTm9kZSA9IFdhaXRpbmdWaWV3LmluaXRXYWl0aW5nVmlldyh0aGlzLm5vZGUsIGNjLnYyKDAsIDApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TcHJlYWRNb2RlbCA9IDxTcHJlYWRNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiU3ByZWFkTW9kZWxcIik7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RFdmVudCgpXHJcbiAgICAgICAgdGhpcy5NeUlkID0gdGhpcy5nZXRDaGlsZChcIkxlZnRib3gvTXlJZC9Db3VudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5TdXBlcmlvcklkID0gdGhpcy5nZXRDaGlsZChcIkxlZnRib3gvU3VwZXJpb3JJZC9Db3VudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5BbGxBZGRQZW9wbGUgPSB0aGlzLmdldENoaWxkKFwiTGVmdGJveC9BbGxBZGRQZW9wbGUvQ291bnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuVG9kYXlBbGxNb25leSA9IHRoaXMuZ2V0Q2hpbGQoXCJMZWZ0Ym94L1RvZGF5QWxsTW9uZXkvQ291bnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuTXlBZGRQZW9wbGUgPSB0aGlzLmdldENoaWxkKFwiTGVmdGJveC9NeUFkZFBlb3BsZS9Db3VudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5Ub2RheU15TW9uZXkgPSB0aGlzLmdldENoaWxkKFwiTGVmdGJveC9Ub2RheU15TW9uZXkvQ291bnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuWWVzdGVyZGF5QWxsTW9uZXkgPSB0aGlzLmdldENoaWxkKFwiTGVmdGJveC9ZZXN0ZXJkYXlBbGxNb25leS9Db3VudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5ZZXN0ZXJkYXlNb25leSA9IHRoaXMuZ2V0Q2hpbGQoXCJMZWZ0Ym94L1llc3RlcmRheU1vbmV5L0NvdW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuXHJcbiAgICAgICAgdGhpcy5VcmxTdHJpbmcgPSB0aGlzLmdldENoaWxkKFwiQWRhcHQvVXJsL1RFWFRfTEFCRUxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuUVJOb2RlID0gdGhpcy5nZXRDaGlsZChcIkFkYXB0L1Nwcml0ZU1hL3FyTm9kZVwiKVxyXG4gICAgICAgIHRoaXMuY29kZVRpcCA9IHRoaXMuZ2V0Q2hpbGQoXCJBZGFwdC9TcHJpdGVNYS9jb2RlVGlwXCIpLmdldENvbXBvbmVudChDb2RlVGlwVmlldyk7XHJcbiAgICAgICAgdGhpcy5pbnZpdGVOb2RlID0gdGhpcy5nZXRDaGlsZChcIkFkYXB0L0ludml0ZUNvZGVcIilcclxuICAgICAgICB0aGlzLmludml0ZU5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLkF3YXJkUmVjb3JkQnRuID0gdGhpcy5nZXRDaGlsZChcIkFkYXB0L0JvdEJ1dHRvbi9Bd2FyZFJlY29yZEJ0bi9CYWNrZ3JvdW5kXCIpXHJcbiAgICAgICAgdGhpcy5Bd2FyZFJlY29yZFJldHVybkJ0biA9IHRoaXMuZ2V0Q2hpbGQoXCJBZGFwdC9Cb3RCdXR0b24vQXdhcmRSZWNvcmRCdG4vQmFja1JldHVyblwiKVxyXG4gICAgICAgIHRoaXMuSW52aXRlQ29kZUlucHV0ID0gdGhpcy5nZXRDaGlsZChcIkFkYXB0L0ludml0ZUNvZGUvSW52aXRlQ29kZUlucHV0XCIpLmdldENvbXBvbmVudChjYy5FZGl0Qm94KVxyXG5cclxuICAgICAgICB0aGlzLkhpc3RvcnlMYWJlbCA9IHRoaXMuZ2V0Q2hpbGQoXCJHZXRBd2FyZFBhbmVsL2JnL0hpc3RvcnlUaXRsZS9IaXNBd2FyZFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5DdXJyZW50QXdhcmQgPSB0aGlzLmdldENoaWxkKFwiR2V0QXdhcmRQYW5lbC9iZy9jb250ZW50QmcvY3VycmVudEF3YXJkXCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICB0aGlzLkVmZmVjdE5vZGUgPSB0aGlzLmdldENoaWxkKFwiR2V0QXdhcmRQYW5lbC9iZy9HZXRBd2FyZEJ0blwiKVxyXG4gICAgICAgIHRoaXMuRWZmZWN0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCBidG4gPSB0aGlzLkVmZmVjdE5vZGUuZ2V0Q29tcG9uZW50KFlYQnV0dG9uKVxyXG4gICAgICAgIGlmIChidG4pIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJSGVscGVyLnNldE5vZGVHcmF5KGJ0bi5ub2RlLCB0cnVlLCAyNTAsIHRydWUpXHJcbiAgICAgICAgICAgIGJ0bi5pbnRlcmFjdGFibGUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiQWRhcHQvV2VDaGF0XCIsIHRoaXMuU2hhcmVUb0ZyaWVuZCwgdGhpcylcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiQWRhcHQvU3ByaXRlTWFcIiwgdGhpcy5PblFSQ29kZUNsaWNrZWQsIHRoaXMpXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcIkFkYXB0L1dlQ2hhdEZyaWVuZHNcIiwgdGhpcy5TaGFyZVRvV2VDaGF0RnJpZW5kcywgdGhpcylcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiQWRhcHQvQm90QnV0dG9uL0F3YXJkUmVjb3JkQnRuL0JhY2tncm91bmRcIiwgdGhpcy5PblJlY29yZEJ0bkNsaWNrZWQsIHRoaXMpXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcIkFkYXB0L0JvdEJ1dHRvbi9Bd2FyZFJlY29yZEJ0bi9CYWNrUmV0dXJuXCIsIHRoaXMuT25Db21taXNzaW9uQnRuQ2xpY2tlZCwgdGhpcylcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiQWRhcHQvVXJsL0NvcHlVcmxcIiwgdGhpcy5PbkNvcHlDbGlja2VkLCB0aGlzKVxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJBZGFwdC9JbnZpdGVDb2RlL0JpbmRJbnZpdGVDb2RlXCIsIHRoaXMuT25CaW5kQ2xpY2tlZCwgdGhpcylcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiR2V0QXdhcmRQYW5lbC9iZy9HZXRBd2FyZEJ0blwiLCB0aGlzLkdldERheUFnZW50LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3RFdmVudCgpIHtcclxuICAgICAgICB0aGlzLlNwcmVhZE1vZGVsLm9uKFNwcmVhZEV2ZW50LkdldERheUFnZW50U2hhcmUsIHRoaXMsIHRoaXMuT25HZXRBZ2VudFNoYXJlKTtcclxuICAgICAgICB0aGlzLlNwcmVhZE1vZGVsLm9uKFNwcmVhZEV2ZW50LkdldERheUFnZW50UmVjb3JkLCB0aGlzLCB0aGlzLk9wZW5Bd2FyZFJlY29yZCk7XHJcbiAgICAgICAgdGhpcy5TcHJlYWRNb2RlbC5vbihTcHJlYWRFdmVudC5HZXREYXlBZ2VudENvbW1pLCB0aGlzLCB0aGlzLk9wZW5ScnR1cm5Nb25leSk7XHJcbiAgICAgICAgdGhpcy5TcHJlYWRNb2RlbC5vbihTcHJlYWRFdmVudC5HZXREYXlBZ2VudCwgdGhpcywgdGhpcy5PbkdldFJld2FyZClcclxuICAgICAgICB0aGlzLlNwcmVhZE1vZGVsLm9uKFNwcmVhZEV2ZW50LkJpbmRTdWNjZWVkLCB0aGlzLCB0aGlzLk9uQmluZFN1Y2NlZWQpXHJcbiAgICAgICAgdGhpcy5TcHJlYWRNb2RlbC5vbihTcHJlYWRFdmVudC5SZWZyZXNoU2hvcnRVcmwsIHRoaXMsIHRoaXMuT25SZWZyZXNoVXJsKVxyXG4gICAgfVxyXG5cclxuICAgIE9uQmluZENsaWNrZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ2hlY2tJbnB1dCh0aGlzLkludml0ZUNvZGVJbnB1dC5zdHJpbmcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU3ByZWFkTW9kZWwuQmluZEludml0ZUNvZGUoTnVtYmVyKHRoaXMuSW52aXRlQ29kZUlucHV0LnN0cmluZykpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIENoZWNrSW5wdXQodGV4dCkge1xyXG4gICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5o6o6I2Q5Lq6SUTkuI3og73kuLrnqbohXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRleHQubGVuZ3RoIDwgNikge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+i+k+WFpeato+ehrueahOaOqOiNkOS6uklEIVwiKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBHZXREYXlBZ2VudCgpIHtcclxuICAgICAgICB0aGlzLlNwcmVhZE1vZGVsLkdldERheUFnZW50KClcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIE9uQ29weUNsaWNrZWQoKSB7XHJcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuVXJsU3RyaW5nLnN0cmluZyB8fCBudWxsXHJcbiAgICAgICAgaWYgKCF1cmwpIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLmraPlnKjojrflj5bmjqjlub/pk77mjqXvvIzor7fnqI3lkI7lho3or5XvvIFcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5jb3B5VGV4dFRvQ2xpcGJvYXJkKFN0cmluZyh1cmwpLCB0aGlzLmNvcHlUZXh0VG9DbGlwYm9hcmRDYWxsQmFjay5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY29weVRleHRUb0NsaXBib2FyZENhbGxCYWNrKHJldFN0cikge1xyXG4gICAgICAgIGlmIChyZXRTdHIucmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlpI3liLbmiJDlip9cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlpI3liLblpLHotKVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIE9uUmVjb3JkQnRuQ2xpY2tlZCgpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IG51bGwvL3RoaXMuU3ByZWFkTW9kZWwuQXdhcmRSZWNvcmREYXRhO1xyXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5TcHJlYWRNb2RlbC5HZXREYXlBZ2VudFJlY29yZCgxLCA2KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRBd2FyZFJlY29yZFwiLCBkYXRhKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBPbkNvbW1pc3Npb25CdG5DbGlja2VkKCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5TcHJlYWRNb2RlbC5Db21taWREYXRhO1xyXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5TcHJlYWRNb2RlbC5HZXREYXlBZ2VudENvbW1pKClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kQ29tbWlzc2lvbmxpc3RcIiwgZGF0YSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgU2hhcmVUb1dlQ2hhdEZyaWVuZHMoKSB7XHJcblxyXG4gICAgICAgIGxldCBmbGFnID0gR2xvYmFsLlRvb2xraXQuY2hlY2tWZXJzaW9uU3VwcG9ydCgxMDAwNilcclxuICAgICAgICAvLyBpZiAoZmxhZykge1xyXG4gICAgICAgIGlmICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmludml0ZVVybFxyXG4gICAgICAgICAgICBsZXQgZmlsZVBhdGggPSBqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpICsgR2xvYmFsLlRvb2xraXQubWQ1KHVybCkgKyAnX2NhcEltYWdlLnBuZyc7XHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwuVG9vbGtpdC5DaGVja0ZpbGVFeGlzdChmaWxlUGF0aCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud3hTaGFyZSgxLCBHbG9iYWwuU2V0dGluZy53eEZpcmVuZFNoYXJlVGl0bGUsIEdsb2JhbC5TZXR0aW5nLnd4RmlyZW5kU2hhcmVDb250ZW50KTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgY2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnd4U2hhcmUoMSwgR2xvYmFsLlNldHRpbmcud3hGaXJlbmRTaGFyZVRpdGxlLCBHbG9iYWwuU2V0dGluZy53eEZpcmVuZFNoYXJlQ29udGVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHduZFNwcmVhZCA9IDxXbmRTcHJlYWQ+R2xvYmFsLlVJLmdldFdpbmRvdyhcIlduZFNwcmVhZFwiKVxyXG4gICAgICAgICAgICBpZiAod25kU3ByZWFkKSB7XHJcbiAgICAgICAgICAgICAgICB3bmRTcHJlYWQuQ2FwdHVyZVRvb2wubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB3bmRTcHJlYWQuQ2FwdHVyZVRvb2wuQmVnaW5DYXB0dXJlKHVybCwgY2FsbGJhY2spXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZE1lc3NhZ2VCb3hcIiwgXCLniYjmnKzov4fml6fvvIzor7fkuIvovb3mlrDljIXkvb/nlKjor6Xlip/og73vvIFcIiwgMiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLm9wZW5VUkwoR2xvYmFsLlNldHRpbmcuVXJscy5kb3duTG9hZFVybClcclxuICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgU2hhcmVUb0ZyaWVuZCgpIHtcclxuICAgICAgICBsZXQgZmxhZyA9IEdsb2JhbC5Ub29sa2l0LmNoZWNrVmVyc2lvblN1cHBvcnQoMTAwMDYpXHJcbiAgICAgICAgLy9pZiAoZmxhZykge1xyXG4gICAgICAgIGlmICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmludml0ZVVybFxyXG4gICAgICAgICAgICBsZXQgZmlsZVBhdGggPSBqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpICsgR2xvYmFsLlRvb2xraXQubWQ1KHVybCkgKyAnX2NhcEltYWdlLnBuZyc7XHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwuVG9vbGtpdC5DaGVja0ZpbGVFeGlzdChmaWxlUGF0aCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMud3hTaGFyZSgwLCBHbG9iYWwuU2V0dGluZy53eE1vbWVudFNoYXJlVGl0bGUsIEdsb2JhbC5TZXR0aW5nLnd4TW9tZW50U2hhcmVDb250ZW50KTtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgICAgICBsZXQgY2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnd4U2hhcmUoMCwgR2xvYmFsLlNldHRpbmcud3hNb21lbnRTaGFyZVRpdGxlLCBHbG9iYWwuU2V0dGluZy53eE1vbWVudFNoYXJlQ29udGVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHduZFNwcmVhZCA9IDxXbmRTcHJlYWQ+R2xvYmFsLlVJLmdldFdpbmRvdyhcIlduZFNwcmVhZFVubGltaXRlZFwiKVxyXG4gICAgICAgICAgICBpZiAod25kU3ByZWFkKSB7XHJcbiAgICAgICAgICAgICAgICB3bmRTcHJlYWQuQ2FwdHVyZVRvb2wubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB3bmRTcHJlYWQuQ2FwdHVyZVRvb2wuQmVnaW5DYXB0dXJlKHVybCwgY2FsbGJhY2spXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZE1lc3NhZ2VCb3hcIiwgXCLniYjmnKzov4fml6fvvIzor7fkuIvovb3mlrDljIXkvb/nlKjor6Xlip/og73vvIFcIiwgMiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2Muc3lzLm9wZW5VUkwoR2xvYmFsLlNldHRpbmcuVXJscy5kb3duTG9hZFVybClcclxuICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gR2xvYmFsLlVJLmZhc3RUaXAoXCLlip/og73mmoLmnKrlvIDmlL7vvIzor7fmiYvliqjmiKrlm77liIbkuqtcIilcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBwcml2YXRlIHd4U2hhcmUodHlwZSwgdGl0bGUsIGNvbnRlbnQpIHtcclxuICAgICAgICBpZiAoIUFwcEhlbHBlci5lbmFibGVXeFNoYXJlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIGlmKCFBcHBIZWxwZXIuZ2V0QXBwV1hTaGFyZUVuYWJsZSgpKVxyXG4gICAgICAgIC8vICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCBzaGFyZVVybCA9IEdsb2JhbC5TZXR0aW5nLlVybHMuaW52aXRlVXJsO1xyXG4gICAgICAgIHNoYXJlVXJsID0gdGhpcy5TcHJlYWRNb2RlbC5VcmwgfHwgc2hhcmVVcmxcclxuICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuY2hlY2tXWEluc3RhbGwoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0LnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuc2hhcmVXWCh0eXBlLCAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5Ub29sa2l0LmdldFNwcmVhZEltZ1BhdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICBzaGFyZVVybCxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIG51bGwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+WuieijheW+ruS/oVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgT25RUkNvZGVDbGlja2VkKCkge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kU3ByZWFkQ2VudGVyXCIsIHRoaXMuVXJsU3RyaW5nLnN0cmluZyk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBvblN1YlZpZXdTaG93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLndhaXRpbmdOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdGluZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHVybCA9IEdsb2JhbC5TZXR0aW5nLlVybHMuZ2V0aW52aXRlVXJsKClcclxuICAgICAgICAvLyB0aGlzLmdldENoaWxkKFwiUmlnaHRQYW5lbC9iZ19wb3B1cF9taWRkbGUvTXlTcHJlYWRQYW5lbC9BZGFwdC9RUkJpZ05vZGVcIikuZ2V0Q29tcG9uZW50KFwiVGVzdENhcFwiKS5DcmVhdEltYWdlKClcclxuICAgICAgICB0aGlzLlNwcmVhZE1vZGVsLkdldERheUFnZW50U2hhcmUodXJsKTtcclxuICAgICAgICB0aGlzLkluaXRRcmNvZGUoKVxyXG4gICAgfVxyXG4gICAgT25CaW5kU3VjY2VlZChkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5pbnZpdGVOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5TZXRHZXRBd2FyZEJ0blBvcyh0cnVlKVxyXG4gICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi57uR5a6a5o6o6I2Q5Lq65oiQ5YqfXCIpXHJcbiAgICB9XHJcbiAgICBJbml0UXJjb2RlKCkge1xyXG4gICAgICAgIGxldCBzaGFyZVVybCA9IEdsb2JhbC5TZXR0aW5nLlVybHMuaW52aXRlVXJsO1xyXG4gICAgICAgIHNoYXJlVXJsID0gdGhpcy5TcHJlYWRNb2RlbC5VcmwgfHwgc2hhcmVVcmxcclxuICAgICAgICBpZiAodGhpcy5TcHJlYWRNb2RlbC51cmxUeXBlICE9IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5jb2RlVGlwLmVycm9yKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQuaW5pdFFSQ29kZSh0aGlzLlFSTm9kZSwgc2hhcmVVcmwsIDEwKTtcclxuICAgICAgICAgICAgdGhpcy5jb2RlVGlwLnN1Y2Nlc3MoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLkNhcHR1cmVUb29sLkNyZWF0SW1hZ2UodGhpcy5DYXBOb2RlKVxyXG4gICAgICAgIC8vdGhpcy5RUk5vZGUuZ2V0Q29tcG9uZW50KFwiQ2FwdHVyZVRvb2xcIikuQ3JlYXRJbWFnZSgpXHJcbiAgICB9XHJcblxyXG4gICAgT25HZXRSZXdhcmQoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuQ3VycmVudEF3YXJkLnN0cmluZyA9IFwiMFwiXHJcbiAgICAgICAgbGV0IGJ0biA9IHRoaXMuRWZmZWN0Tm9kZS5nZXRDb21wb25lbnQoWVhCdXR0b24pXHJcbiAgICAgICAgaWYgKGJ0bikge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUlIZWxwZXIuc2V0Tm9kZUdyYXkoYnRuLm5vZGUsIHRydWUsIDE1MCwgZmFsc2UpXHJcbiAgICAgICAgICAgIGJ0bi5pbnRlcmFjdGFibGUgPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFJlYmF0ZUdldFwiLCBkYXRhLmdldF9wb2ludCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBPbkdldEFnZW50U2hhcmUoZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLndhaXRpbmdOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdGluZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB3bmRTcHJlYWQgPSA8V25kU3ByZWFkPkdsb2JhbC5VSS5nZXRXaW5kb3coXCJXbmRTcHJlYWRcIilcclxuICAgICAgICBpZiAod25kU3ByZWFkKSB7XHJcbiAgICAgICAgICAgIHduZFNwcmVhZC5PbkRhdGFQcmVwYXJlZCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5pdExldFBhbmVsKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIE9uUmVmcmVzaFVybCgpIHtcclxuICAgICAgICBsZXQgdXJsID0gdGhpcy5TcHJlYWRNb2RlbC5Vcmw7XHJcbiAgICAgICAgaWYgKHRoaXMuU3ByZWFkTW9kZWwudXJsVHlwZSAhPSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVXJsU3RyaW5nLnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgdGhpcy5jb2RlVGlwLmVycm9yKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5VcmxTdHJpbmcuc3RyaW5nID0gdXJsXHJcbiAgICAgICAgICAgIEdsb2JhbC5Ub29sa2l0LmluaXRRUkNvZGUodGhpcy5RUk5vZGUsIHVybCwgMTApO1xyXG4gICAgICAgICAgICB0aGlzLmNvZGVUaXAuc3VjY2VzcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgd25kU3ByZWFkID0gPFduZFNwcmVhZD5HbG9iYWwuVUkuZ2V0V2luZG93KFwiV25kU3ByZWFkXCIpXHJcbiAgICAgICAgaWYgKHduZFNwcmVhZCkge1xyXG4gICAgICAgICAgICB3bmRTcHJlYWQuSW5pdFFyY29kZSh1cmwpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRMZXRQYW5lbChkYXRhOiBhbnkpIHtcclxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuTXlJZC5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIHRoaXMuU3VwZXJpb3JJZC5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIHRoaXMuQWxsQWRkUGVvcGxlLnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgdGhpcy5Ub2RheUFsbE1vbmV5LnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgdGhpcy5NeUFkZFBlb3BsZS5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIHRoaXMuVG9kYXlNeU1vbmV5LnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgdGhpcy5ZZXN0ZXJkYXlBbGxNb25leS5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIHRoaXMuWWVzdGVyZGF5TW9uZXkuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICB0aGlzLkN1cnJlbnRBd2FyZC5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIHRoaXMuSGlzdG9yeUxhYmVsLnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgdGhpcy5VcmxTdHJpbmcuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICB0aGlzLkludml0ZUNvZGVJbnB1dC5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLk15SWQuc3RyaW5nID0gR2xvYmFsLlBsYXllckRhdGEudWlkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3VwZXJpb3JJZC5zdHJpbmcgPSBkYXRhLnBpZFxyXG4gICAgICAgICAgICB0aGlzLkFsbEFkZFBlb3BsZS5zdHJpbmcgPSBkYXRhLnRlYW1fbnVtXHJcbiAgICAgICAgICAgIHRoaXMuVG9kYXlBbGxNb25leS5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludChkYXRhLmRheV90ZWFtX2Zsb3csIDMpLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgdGhpcy5NeUFkZFBlb3BsZS5zdHJpbmcgPSBkYXRhLnVudGVyX25ld19udW1cclxuICAgICAgICAgICAgdGhpcy5Ub2RheU15TW9uZXkuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnQoZGF0YS5kYXlfdW50ZXJfZmxvdywgMykudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB0aGlzLlllc3RlcmRheUFsbE1vbmV5LnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50KGRhdGEueWVfdG90YWxfZmxvdywgMykudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB0aGlzLlllc3RlcmRheU1vbmV5LnN0cmluZyA9IHRoaXMuR2V0VGV4dChHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihkYXRhLnllX2NvbW1pKSlcclxuICAgICAgICAgICAgdGhpcy5VcmxTdHJpbmcuc3RyaW5nID0gdGhpcy5HZXRUZXh0KEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKGRhdGEudXJsKSlcclxuICAgICAgICAgICAgaWYgKGRhdGEucmVhZF9jb21taSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ0biA9IHRoaXMuRWZmZWN0Tm9kZS5nZXRDb21wb25lbnQoWVhCdXR0b24pXHJcbiAgICAgICAgICAgICAgICBpZiAoYnRuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJSGVscGVyLnNldE5vZGVHcmF5KGJ0bi5ub2RlLCB0cnVlLCAxNTAsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5pbnRlcmFjdGFibGUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ0biA9IHRoaXMuRWZmZWN0Tm9kZS5nZXRDb21wb25lbnQoWVhCdXR0b24pXHJcbiAgICAgICAgICAgICAgICBpZiAoYnRuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJSGVscGVyLnNldE5vZGVHcmF5KGJ0bi5ub2RlLCB0cnVlLCAyNTAsIHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmludGVyYWN0YWJsZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkN1cnJlbnRBd2FyZC5zdHJpbmcgPSB0aGlzLkdldFRleHQoR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoZGF0YS5yZWFkX2NvbW1pKSlcclxuICAgICAgICAgICAgdGhpcy5IaXN0b3J5TGFiZWwuc3RyaW5nID0gdGhpcy5HZXRUZXh0KEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKGRhdGEudG90YWxfY29tbWkpKVxyXG4gICAgICAgICAgICBpZiAoZGF0YS5waWQgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnZpdGVOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLlNldEdldEF3YXJkQnRuUG9zKHRydWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLkludml0ZUNvZGVJbnB1dC5zdHJpbmcgPSBkYXRhLnBpZC50b1N0cmluZygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoR2xvYmFsLlBsYXllckRhdGEucGFjayA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW52aXRlTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU2V0R2V0QXdhcmRCdG5Qb3MoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5JbnZpdGVDb2RlSW5wdXQuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnZpdGVOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TZXRHZXRBd2FyZEJ0blBvcyh0cnVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZWFkX3BvaW50ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuRWZmZWN0Tm9kZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkVmZmVjdE5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNwcmVhZE1vZGVsLnVybFR5cGUgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VcmxTdHJpbmcuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlVGlwLmVycm9yKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVybFN0cmluZy5zdHJpbmcgPSB0aGlzLlNwcmVhZE1vZGVsLlVybFxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQuaW5pdFFSQ29kZSh0aGlzLlFSTm9kZSwgdGhpcy5TcHJlYWRNb2RlbC5VcmwsIDEwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29kZVRpcC5zdWNjZXNzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuICAgIFNldEdldEF3YXJkQnRuUG9zKGNoZzogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBpbmRleCA9IGNoZyA/IDEgOiAwO1xyXG4gICAgICAgIC8vIHRoaXMuQXdhcmRSZWNvcmRCdG4ucG9zaXRpb24ueSA9IEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcubXlTcHJlYWRPcmdDaGdQb3NZc1tpbmRleF07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIEdldFRleHQobnVtOiBhbnkpIHtcclxuICAgICAgICBsZXQgdHh0O1xyXG4gICAgICAgIHR4dCA9IG51bS50b1N0cmluZygpXHJcbiAgICAgICAgcmV0dXJuIHR4dFxyXG4gICAgfVxyXG4gICAgcHVibGljIE9wZW5Bd2FyZFJlY29yZChkYXRhKSB7XHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRBd2FyZFJlY29yZFwiLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBPcGVuUnJ0dXJuTW9uZXkoZGF0YSkge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kQ29tbWlzc2lvbmxpc3RcIiwgZGF0YSlcclxuICAgIH1cclxuXHJcbiAgICBvblN1YlZpZXdIaWRlKCkge1xyXG5cclxuXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuU3ByZWFkTW9kZWwub2ZmKFNwcmVhZEV2ZW50LkdldERheUFnZW50U2hhcmUsIHRoaXMsIHRoaXMuT25HZXRBZ2VudFNoYXJlKTtcclxuICAgICAgICB0aGlzLlNwcmVhZE1vZGVsLm9mZihTcHJlYWRFdmVudC5HZXREYXlBZ2VudFJlY29yZCwgdGhpcywgdGhpcy5PcGVuQXdhcmRSZWNvcmQpO1xyXG4gICAgICAgIHRoaXMuU3ByZWFkTW9kZWwub2ZmKFNwcmVhZEV2ZW50LkdldERheUFnZW50Q29tbWksIHRoaXMsIHRoaXMuT3BlblJydHVybk1vbmV5KTtcclxuICAgICAgICB0aGlzLlNwcmVhZE1vZGVsLm9mZihTcHJlYWRFdmVudC5HZXRTZWxmUmVhZCwgdGhpcywgdGhpcy5PbkdldFJld2FyZClcclxuICAgICAgICB0aGlzLlNwcmVhZE1vZGVsLm9mZihTcHJlYWRFdmVudC5CaW5kU3VjY2VlZCwgdGhpcywgdGhpcy5PbkJpbmRTdWNjZWVkKVxyXG4gICAgICAgIHRoaXMuU3ByZWFkTW9kZWwub2ZmKFNwcmVhZEV2ZW50LlJlZnJlc2hTaG9ydFVybCwgdGhpcywgdGhpcy5PblJlZnJlc2hVcmwpXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0iXX0=