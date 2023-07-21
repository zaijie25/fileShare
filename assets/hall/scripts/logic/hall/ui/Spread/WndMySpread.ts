import SpreadModel from "../../../hallcommon/model/SpreadModel";
import { SpreadEvent } from "./SpreadEvent";
import AppHelper from "../../../core/tool/AppHelper";
import ViewBase from "../../../core/ui/ViewBase";
import YXButton from "../../../core/component/YXButton";
import CodeTipView from "../waiting/CodeTipView";
import WaitingView from "../waiting/WaitingView";
import WndSpread from "./WndSpread";
export default class WndMySpreadUnlimited extends ViewBase {

    SpreadModel: SpreadModel;
    private MyId: cc.Label;
    private SuperiorId: cc.Label;
    private AllAddPeople: cc.Label;
    private TodayAllMoney: cc.Label;
    private MyAddPeople: cc.Label;
    private TodayMyMoney: cc.Label;
    private YesterdayAllMoney: cc.Label;
    private YesterdayMoney: cc.Label;
    private UrlString: cc.Label
    private InviteCodeInput: cc.EditBox
    private HistoryLabel: cc.Label
    private CurrentAward: cc.Label


    private QRNode: cc.Node
    private EffectNode: cc.Node
    private AwardRecordBtn: cc.Node
    private AwardRecordReturnBtn: cc.Node
    private inviteNode: cc.Node
    private codeTip: CodeTipView
    private waitingNode: cc.Node;
    protected initView() {
        if (this.waitingNode == null || this.waitingNode == undefined) {
            //view 内的loading
            this.waitingNode = WaitingView.initWaitingView(this.node, cc.v2(0, 0));
        }
        this.SpreadModel = <SpreadModel>Global.ModelManager.getModel("SpreadModel");
        this.registEvent()
        this.MyId = this.getChild("Leftbox/MyId/Count").getComponent(cc.Label)
        this.SuperiorId = this.getChild("Leftbox/SuperiorId/Count").getComponent(cc.Label)
        this.AllAddPeople = this.getChild("Leftbox/AllAddPeople/Count").getComponent(cc.Label)
        this.TodayAllMoney = this.getChild("Leftbox/TodayAllMoney/Count").getComponent(cc.Label)
        this.MyAddPeople = this.getChild("Leftbox/MyAddPeople/Count").getComponent(cc.Label)
        this.TodayMyMoney = this.getChild("Leftbox/TodayMyMoney/Count").getComponent(cc.Label)
        this.YesterdayAllMoney = this.getChild("Leftbox/YesterdayAllMoney/Count").getComponent(cc.Label)
        this.YesterdayMoney = this.getChild("Leftbox/YesterdayMoney/Count").getComponent(cc.Label)

        this.UrlString = this.getChild("Adapt/Url/TEXT_LABEL").getComponent(cc.Label)
        this.QRNode = this.getChild("Adapt/SpriteMa/qrNode")
        this.codeTip = this.getChild("Adapt/SpriteMa/codeTip").getComponent(CodeTipView);
        this.inviteNode = this.getChild("Adapt/InviteCode")
        this.inviteNode.active = false
        this.AwardRecordBtn = this.getChild("Adapt/BotButton/AwardRecordBtn/Background")
        this.AwardRecordReturnBtn = this.getChild("Adapt/BotButton/AwardRecordBtn/BackReturn")
        this.InviteCodeInput = this.getChild("Adapt/InviteCode/InviteCodeInput").getComponent(cc.EditBox)

        this.HistoryLabel = this.getChild("GetAwardPanel/bg/HistoryTitle/HisAward").getComponent(cc.Label)
        this.CurrentAward = this.getChild("GetAwardPanel/bg/contentBg/currentAward").getComponent(cc.Label)
        this.EffectNode = this.getChild("GetAwardPanel/bg/GetAwardBtn")
        this.EffectNode.active = true;
        let btn = this.EffectNode.getComponent(YXButton)
        if (btn) {
            Global.UIHelper.setNodeGray(btn.node, true, 250, true)
            btn.interactable = true
        }

        this.addCommonClick("Adapt/WeChat", this.ShareToFriend, this)
        this.addCommonClick("Adapt/SpriteMa", this.OnQRCodeClicked, this)
        this.addCommonClick("Adapt/WeChatFriends", this.ShareToWeChatFriends, this)
        this.addCommonClick("Adapt/BotButton/AwardRecordBtn/Background", this.OnRecordBtnClicked, this)
        this.addCommonClick("Adapt/BotButton/AwardRecordBtn/BackReturn", this.OnCommissionBtnClicked, this)
        this.addCommonClick("Adapt/Url/CopyUrl", this.OnCopyClicked, this)
        this.addCommonClick("Adapt/InviteCode/BindInviteCode", this.OnBindClicked, this)
        this.addCommonClick("GetAwardPanel/bg/GetAwardBtn", this.GetDayAgent, this);
    }

    registEvent() {
        this.SpreadModel.on(SpreadEvent.GetDayAgentShare, this, this.OnGetAgentShare);
        this.SpreadModel.on(SpreadEvent.GetDayAgentRecord, this, this.OpenAwardRecord);
        this.SpreadModel.on(SpreadEvent.GetDayAgentCommi, this, this.OpenRrturnMoney);
        this.SpreadModel.on(SpreadEvent.GetDayAgent, this, this.OnGetReward)
        this.SpreadModel.on(SpreadEvent.BindSucceed, this, this.OnBindSucceed)
        this.SpreadModel.on(SpreadEvent.RefreshShortUrl, this, this.OnRefreshUrl)
    }

    OnBindClicked() {
        if (this.CheckInput(this.InviteCodeInput.string)) {
            this.SpreadModel.BindInviteCode(Number(this.InviteCodeInput.string))
        }

    }
    CheckInput(text) {
        if (text.length <= 0) {
            Global.UI.fastTip("推荐人ID不能为空!")
            return false;
        }
        if (text.length < 6) {
            Global.UI.fastTip("请输入正确的推荐人ID!")
            return false;
        }
        return true;
    }


    GetDayAgent() {
        this.SpreadModel.GetDayAgent()
    }






    OnCopyClicked() {
        let url = this.UrlString.string || null
        if (!url) {
            Global.UI.fastTip("正在获取推广链接，请稍后再试！")
            return
        }
        Global.NativeEvent.copyTextToClipboard(String(url), this.copyTextToClipboardCallBack.bind(this));
    }
    private copyTextToClipboardCallBack(retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
        } else {
            Global.UI.fastTip("复制失败");
        }
    }

    OnRecordBtnClicked() {
        let data = null//this.SpreadModel.AwardRecordData;
        if (data == null) {
            this.SpreadModel.GetDayAgentRecord(1, 6)
        }
        else {
            Global.UI.show("WndAwardRecord", data)
        }
    }

    OnCommissionBtnClicked() {
        let data = this.SpreadModel.CommidData;
        if (data == null) {
            this.SpreadModel.GetDayAgentCommi()
        }
        else {
            Global.UI.show("WndCommissionlist", data)
        }
    }

    ShareToWeChatFriends() {

        let flag = Global.Toolkit.checkVersionSupport(10006)
        // if (flag) {
        if (true) {
            let url = Global.Setting.Urls.inviteUrl
            let filePath = jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(url) + '_capImage.png';
            if (Global.Toolkit.CheckFileExist(filePath)) {
                this.wxShare(1, Global.Setting.wxFirendShareTitle, Global.Setting.wxFirendShareContent);
                return
            }
            let self = this
            let callback = () => {
                self.wxShare(1, Global.Setting.wxFirendShareTitle, Global.Setting.wxFirendShareContent);
            }
            let wndSpread = <WndSpread>Global.UI.getWindow("WndSpread")
            if (wndSpread) {
                wndSpread.CaptureTool.node.active = true
                wndSpread.CaptureTool.BeginCapture(url, callback)
            }

        }
        else {
            Global.UI.show("WndMessageBox", "版本过旧，请下载新包使用该功能！", 2, () => {
                cc.sys.openURL(Global.Setting.Urls.downLoadUrl)
            }, () => {

            })
        }

    }
    ShareToFriend() {
        let flag = Global.Toolkit.checkVersionSupport(10006)
        //if (flag) {
        if (true) {
            let url = Global.Setting.Urls.inviteUrl
            let filePath = jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(url) + '_capImage.png';
            if (Global.Toolkit.CheckFileExist(filePath)) {
                this.wxShare(0, Global.Setting.wxMomentShareTitle, Global.Setting.wxMomentShareContent);
                return
            }
            let self = this
            let callback = () => {
                self.wxShare(0, Global.Setting.wxMomentShareTitle, Global.Setting.wxMomentShareContent);
            }
            let wndSpread = <WndSpread>Global.UI.getWindow("WndSpreadUnlimited")
            if (wndSpread) {
                wndSpread.CaptureTool.node.active = true
                wndSpread.CaptureTool.BeginCapture(url, callback)
            }

        }
        else {
            Global.UI.show("WndMessageBox", "版本过旧，请下载新包使用该功能！", 2, () => {
                cc.sys.openURL(Global.Setting.Urls.downLoadUrl)
            }, () => {

            })
        }
        // Global.UI.fastTip("功能暂未开放，请手动截图分享")

    }



    private wxShare(type, title, content) {
        if (!AppHelper.enableWxShare)
            return;

        // if(!AppHelper.getAppWXShareEnable())
        //     return;

        let shareUrl = Global.Setting.Urls.inviteUrl;
        shareUrl = this.SpreadModel.Url || shareUrl
        Global.NativeEvent.checkWXInstall((result) => {
            if (result.result == 0) {
                Global.NativeEvent.shareWX(type, 2,
                    title,
                    Global.Toolkit.getSpreadImgPath(),
                    shareUrl,
                    content,
                    null)
            }
            else {
                Global.UI.fastTip("请安装微信");
            }
        })
    }

    OnQRCodeClicked() {
        Global.UI.show("WndSpreadCenter", this.UrlString.string);
    }



    onSubViewShow() {
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        let url = Global.Setting.Urls.getinviteUrl()
        // this.getChild("RightPanel/bg_popup_middle/MySpreadPanel/Adapt/QRBigNode").getComponent("TestCap").CreatImage()
        this.SpreadModel.GetDayAgentShare(url);
        this.InitQrcode()
    }
    OnBindSucceed(data) {
        this.inviteNode.active = false
        this.SetGetAwardBtnPos(true)
        Global.UI.fastTip("绑定推荐人成功")
    }
    InitQrcode() {
        let shareUrl = Global.Setting.Urls.inviteUrl;
        shareUrl = this.SpreadModel.Url || shareUrl
        if (this.SpreadModel.urlType != 1) {
            this.codeTip.error();
        } else {
            Global.Toolkit.initQRCode(this.QRNode, shareUrl, 10);
            this.codeTip.success();
        }
        //this.CaptureTool.CreatImage(this.CapNode)
        //this.QRNode.getComponent("CaptureTool").CreatImage()
    }

    OnGetReward(data) {
        this.CurrentAward.string = "0"
        let btn = this.EffectNode.getComponent(YXButton)
        if (btn) {
            Global.UIHelper.setNodeGray(btn.node, true, 150, false)
            btn.interactable = false
        }
        Global.UI.show("WndRebateGet", data.get_point);
    }



    OnGetAgentShare(data) {
        if (this.waitingNode) {
            this.waitingNode.active = false;
        }
        let wndSpread = <WndSpread>Global.UI.getWindow("WndSpread")
        if (wndSpread) {
            wndSpread.OnDataPrepared()
        }
        this.initLetPanel(data);
    }

    OnRefreshUrl() {
        let url = this.SpreadModel.Url;
        if (this.SpreadModel.urlType != 1) {
            this.UrlString.string = ""
            this.codeTip.error();
        } else {
            this.UrlString.string = url
            Global.Toolkit.initQRCode(this.QRNode, url, 10);
            this.codeTip.success();
        }
        let wndSpread = <WndSpread>Global.UI.getWindow("WndSpread")
        if (wndSpread) {
            wndSpread.InitQrcode(url)
        }
    }

    initLetPanel(data: any) {
        if (data == null) {
            this.MyId.string = ""
            this.SuperiorId.string = ""
            this.AllAddPeople.string = ""
            this.TodayAllMoney.string = ""
            this.MyAddPeople.string = ""
            this.TodayMyMoney.string = ""
            this.YesterdayAllMoney.string = ""
            this.YesterdayMoney.string = ""
            this.CurrentAward.string = ""
            this.HistoryLabel.string = ""
            this.UrlString.string = ""
            this.InviteCodeInput.string = ""
        }
        else {
            this.MyId.string = Global.PlayerData.uid.toString();
            this.SuperiorId.string = data.pid
            this.AllAddPeople.string = data.team_num
            this.TodayAllMoney.string = Global.Toolkit.formatPoint(data.day_team_flow, 3).toString()
            this.MyAddPeople.string = data.unter_new_num
            this.TodayMyMoney.string = Global.Toolkit.formatPoint(data.day_unter_flow, 3).toString()
            this.YesterdayAllMoney.string = Global.Toolkit.formatPoint(data.ye_total_flow, 3).toString()
            this.YesterdayMoney.string = this.GetText(Global.Toolkit.formatPointStr(data.ye_commi))
            this.UrlString.string = this.GetText(Global.Toolkit.formatPointStr(data.url))
            if (data.read_commi === 0) {
                let btn = this.EffectNode.getComponent(YXButton)
                if (btn) {
                    Global.UIHelper.setNodeGray(btn.node, true, 150, false)
                    btn.interactable = false
                }
            }
            else {
                let btn = this.EffectNode.getComponent(YXButton)
                if (btn) {
                    Global.UIHelper.setNodeGray(btn.node, true, 250, true)
                    btn.interactable = true
                }
            }
            this.CurrentAward.string = this.GetText(Global.Toolkit.formatPointStr(data.read_commi))
            this.HistoryLabel.string = this.GetText(Global.Toolkit.formatPointStr(data.total_commi))
            if (data.pid != 0) {
                this.inviteNode.active = false
                this.SetGetAwardBtnPos(true)
                this.InviteCodeInput.string = data.pid.toString()
            }
            else {
                if (Global.PlayerData.pack === 0) {
                    this.inviteNode.active = false
                    this.SetGetAwardBtnPos(false)
                    this.InviteCodeInput.string = ""
                }
                else {
                    this.inviteNode.active = false
                    this.SetGetAwardBtnPos(true)
                }

            }
            if (data.read_point > 0) {
                if (this.EffectNode)
                    this.EffectNode.active = true
            }
            if (this.SpreadModel.urlType != 1) {
                this.UrlString.string = ""
                this.codeTip.error();
            } else {
                this.UrlString.string = this.SpreadModel.Url
                Global.Toolkit.initQRCode(this.QRNode, this.SpreadModel.Url, 10);
                this.codeTip.success();
            }
        }


    }
    SetGetAwardBtnPos(chg: boolean) {
        let index = chg ? 1 : 0;
        // this.AwardRecordBtn.position.y = Global.Setting.SkinConfig.mySpreadOrgChgPosYs[index];

    }

    GetText(num: any) {
        let txt;
        txt = num.toString()
        return txt
    }
    public OpenAwardRecord(data) {
        Global.UI.show("WndAwardRecord", data)
    }

    public OpenRrturnMoney(data) {
        Global.UI.show("WndCommissionlist", data)
    }

    onSubViewHide() {


    }
    protected onDispose() {
        this.SpreadModel.off(SpreadEvent.GetDayAgentShare, this, this.OnGetAgentShare);
        this.SpreadModel.off(SpreadEvent.GetDayAgentRecord, this, this.OpenAwardRecord);
        this.SpreadModel.off(SpreadEvent.GetDayAgentCommi, this, this.OpenRrturnMoney);
        this.SpreadModel.off(SpreadEvent.GetSelfRead, this, this.OnGetReward)
        this.SpreadModel.off(SpreadEvent.BindSucceed, this, this.OnBindSucceed)
        this.SpreadModel.off(SpreadEvent.RefreshShortUrl, this, this.OnRefreshUrl)

    }


}