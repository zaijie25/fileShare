"use strict";
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