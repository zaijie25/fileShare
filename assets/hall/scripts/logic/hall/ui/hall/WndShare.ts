
import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import AppHelper from "../../../core/tool/AppHelper";
import ShareModel from "../../../hallcommon/model/ShareModel";
import HallPopMsgHelper, { BindAwardUIType } from "../../tool/HallPopMsgHelper";
import { ActivityType } from "../Activity/ActivityConstants";

export default class WndShare extends WndBase {
    private shareMoney: cc.Label;
    private shareData;

    private shortUrl = "";
    protected onInit() {
        this.name = "WndShare";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/Share";
        this.destoryType = DestoryType.None;
        this.shareData = <ShareModel>Global.ModelManager.getModel("ShareModel")
    }

    initView() {
        this.shareMoney = this.node.getChildByName("money").getComponent(cc.Label)
        this.shareMoney.string = this.shareData.ShareMoney.toString();
        this.addCommonClick('wx', this.ShareWX, this)
        this.addCommonClick('pyq', this.SharePYQ, this)
        this.addCommonClick('close', this.close, this)
        let shareUrl = Global.Setting.Urls.inviteUrl;
        let param = {
            "url": shareUrl,
        }
        Global.HallServer.send(NetAppface.mod, "GetUserShareUrl", param, (data)=>{
            Logger.log(data);
            this.shortUrl = data.url;
        }, null, true, 30);
    }

    ShareWX() {
        Global.NativeEvent.checkWXInstall((result) => {
            if (result.result == 0) {
                Global.NativeEvent.shareWX(0, 5,
                    Global.Setting.wxFirendShareTitle,
                    "",
                    this.shortUrl,
                    Global.Setting.wxMomentShareContent,
                    this.shareCallBack.bind(this))
            }
            else {
                Global.UI.fastTip("请安装微信");
            }
        })
        
    }

    private shareCallBack(result) {
        let Tf = 0;
        let num = Number(result.result)
        if (num === 0) {
            let param = {
                "ptype": 1,
            }
            Global.HallServer.send(NetAppface.mod, "ShareGetPoint", param, (data) => {
                Tf = data.point;
                if (Tf !== 0) {
                    // Tf = Tf / Global.Setting.glodRatio;
                    Global.UI.show("WndRebateGet", Tf,BindAwardUIType.share)
                    Global.HallServer.send(NetAppface.mod, NetAppface.GetUserPoint, {});
                }
                else {
                    Global.UI.fastTip("分享成功");
                }
            }, null, true, 0);
        }
        else {
            Global.UI.fastTip("分享失败");
        }
    }

    SharePYQ() {
        Global.NativeEvent.checkWXInstall((result) => {
            if (result.result == 0) {
                Global.NativeEvent.shareWX(1, 5,
                    Global.Setting.wxMomentShareTitle,
                    "",
                    this.shortUrl,
                    Global.Setting.wxMomentShareContent,
                    this.shareCallBack.bind(this))
            }
            else {
                Global.UI.fastTip("请安装微信");
            }
        })
        
    }

    onClose()
    {
        HallPopMsgHelper.Instance.releaseLock(ActivityType.shareActivity);
    }
}