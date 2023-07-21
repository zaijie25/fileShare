import ViewBase from "../../../../core/ui/ViewBase";
import HallBtnHelper from "./HallBtnHelper";
import HallModel, { HallRedSpotType } from "../../../../hallcommon/model/HallModel";
import AppHelper from "../../../../core/tool/AppHelper";
import PlayerInfoModel from "../../../../hallcommon/model/PlayerInfoModel";
import { NetAppface } from "../../../../core/net/hall/NetEvent";
import { CustomerEntranceType } from "../../../../hallcommon/model/ServicerModel";
import PlayerWallet from "../../../../core/component/PlayerWallet";
import PlayerHeadView from "./PlayerHeadView";
/** 大厅底部控件(包括红点控制) */
export default class HallBottomView extends ViewBase {
    private model: HallModel;

    // private tixianRedSpot: cc.Node;
    private mailRedSpot: cc.Node;
    private kefuSpot: cc.Node;
 
    // private actNode:cc.Node

    private playerWalllet: PlayerWallet;

    private playerHead: PlayerHeadView

    private layoutNode:cc.Node = null;

    private rechargeNode:cc.Node;
    private comissionNode:cc.Node
    private commisionRedRpot: cc.Node;
    private kefuNode: cc.Node;
    private bottomLayout: cc.Layout;
    private botOrignalWidth:any;
    buzhuNode: cc.Node; //转运金
    private moneyLabel: cc.Label;
    private countLabel: cc.Label;
    
    

    protected initView() {
        this.model = <HallModel>Global.ModelManager.getModel("HallModel");

         //头像组件
        this.playerHead = <PlayerHeadView>this.addView("PlayerHeadView", this.getChild("PlayerHeadView"), PlayerHeadView);

         //钱包组件
        this.playerWalllet = <PlayerWallet>this.addView("PlayerWallet", this.getChild("PlayerHeadView/PlayerWallet"), PlayerWallet);
         // wallet.subViewState = true
        this.playerWalllet.refreshAction();
        this.layoutNode = this.getChild("layoutNode");
      
        this.mailRedSpot = this.getChild("layoutNode/mailNode/hongdian");
        this.kefuSpot = this.getChild("layoutNode/kefuNode/hongdian");
        this.rechargeNode = this.getChild("rechargeNode");
        this.mailRedSpot.active = false;
       
        this.kefuSpot.active = false;
        this.kefuNode = this.addCommonClick("layoutNode/kefuNode", this.onServiceClick, this);
        this.comissionNode = this.addCommonClick("layoutNode/caishenNode", this.onCommisionClick, this);
        this.bottomLayout = this.getChild("layoutNode").getComponent(cc.Layout)
        this.botOrignalWidth = this.bottomLayout.node.width
        this.commisionRedRpot = this.getChild("layoutNode/caishenNode/hongdian")

        this.addCommonClick("layoutNode/yinhang", this.onBankClick, this);
        if(this.commisionRedRpot)
        {
            this.commisionRedRpot.active = false
        }
        //点击事件注册
        this.addCommonClick("layoutNode/rankNode", this.onRankClick, this);
        
        this.addCommonClick("layoutNode/mailNode", this.onMailClick, this);
       
        this.addCommonClick("rechargeNode", this.onRechargeClick, this);
        //this.addCommonClick("lobby_03/PlayerHeadView/head", this.onHeadClick, this, null);
        // this.actNode = this.addCommonClick("layoutNode/activityCenter", this.openActivityCenter, this)


        this.moneyLabel = this.getComponent("layoutNode/zhuanyunNode/moneyLabel", cc.Label);
        this.countLabel = this.getComponent("layoutNode/zhuanyunNode/countLabel", cc.Label);
        this.buzhuNode = this.addCommonClick("layoutNode/zhuanyunNode", this.onBuZhuClick, this);


        //调整底部按钮适配
        // --------- start
        let canvas_width = cc.view.getFrameSize().width;
        let canvas_height = cc.view.getFrameSize().height; 
        let scale1 = canvas_width/canvas_height;
        let scale2 = 1280/720;
        this.layoutNode.width = this.layoutNode.width * scale1/scale2;
        for(let i = 0 ;i < this.layoutNode.childrenCount ; i++){
            this.layoutNode.children[i].x = (this.layoutNode.width/(this.layoutNode.childrenCount))*i + (this.layoutNode.children[i].width/2);
        }
        // --------- end
        // this.actNode.active = false

        this.registEvent()
    }



 

    CheckKefu()
    {
        let data = null
        let model = Global.ModelManager.getModel("ServicerModel")
        if(model)
        {
            data = model.getServiceInfo(CustomerEntranceType.HallService)
        }
        if(!data || !data.status)
        {
            this.kefuNode.active = false
        }
    }

    private registEvent() {
     
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE, this, this.checkCommisionRedSpot);
    }


    private onBuZhuClick() {
        let param: any = {}
        Global.HallServer.send(NetAppface.mod, NetAppface.GetSubsidyPoint, param, (retObj) => {
            PlayerInfoModel.instance.vipSubsidyCount = retObj.times
            this.countLabel.string = PlayerInfoModel.instance.vipSubsidyCount + "";
            Global.UI.show("WndRebateGet", retObj.point);
        }, (error) => {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        }, false, 10);
    }

    
    openActivityCenter() {
        HallBtnHelper.WndActivityOpen()
    }


    private onHeadClick() {
        HallBtnHelper.WndPersonalInfoOpen();
    }

    private onCommisionClick() {
        this.model.closeRedSpot(HallRedSpotType.Commision);
        HallBtnHelper.WndCommision();
    }


    onSubViewShow() {
      
        this.model.on("UpdateResSpot", this, this.updateResSpot);
        this.playerWalllet.subViewState = true
        this.playerHead.subViewState = true
       
        //this.CheckKefu()
        this.checkCommisionRedSpot()
        var CommisionModel = Global.ModelManager.getModel("CommisionModel");
        let RedFlag = CommisionModel.redSwitch
        if (RedFlag) {
            this.commisionRedRpot.active = true
        }
    }


    onSubViewHide() {
        Global.Event.off(GlobalEvent.SHOW_SPREAD_NODE, this, this.showSpreadNode);
        this.model.off("UpdateResSpot", this, this.updateResSpot);
    }

    onDispose() {
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.checkCommisionRedSpot);
    }

    /***************************************************** 点击事件区域 **************************************/
    private updateResSpot(redSpotType) {
        switch (redSpotType) {
            case HallRedSpotType.Mail:
                {
                    this.mailRedSpot.active = this.model.mailRedSpotSwitch;
                    break;
                }
            case HallRedSpotType.Gonggao:
                {
                    this.mailRedSpot.active = this.model.mailRedSpotSwitch;
                    break;
                }
            case HallRedSpotType.Kefu:
                {
                    this.kefuSpot.active = this.model.kefuSpotSwitch;
                    break;
                }
            case HallRedSpotType.Spread:
                {
                    this.spreadRedSpot.active = this.model.SpreadRedSpot;
                    break;
                }
            case HallRedSpotType.Commision:
                {
                    this.commisionRedRpot.active = this.model.CommisionRedSpotActive;
                    break;
                }
        }
    }


    checkCommisionRedSpot() {

        this.buzhuNode.active = PlayerInfoModel.instance.vipSubsidyStatus !== 0

        if (PlayerInfoModel.instance.vipSubsidy != null) {
            // let subsidy = PlayerInfoModel.instance.vipSubsidy[Global.PlayerData.vip]
            let subsidy = PlayerInfoModel.instance.vipSubsidy[Global.PlayerData.vip]
            if (subsidy) {
                this.moneyLabel.string = Global.Toolkit.formatPointStr(subsidy.point, true).toString();
            }
            else {
                this.moneyLabel.string = "0"
            }
        }
        this.countLabel.string = PlayerInfoModel.instance.vipSubsidyCount + "";
        //刷新剩余次数
        let param: any = {}
        Global.HallServer.send(NetAppface.mod, NetAppface.SubsidyPoint, param, (retObj) => {
            PlayerInfoModel.instance.vipSubsidyCount = retObj.times
            this.countLabel.string = PlayerInfoModel.instance.vipSubsidyCount + "";
        }, (error) => {
            // Global.UI.fastTip(error._errstr);
            // console.log(error);
        }, false, 10);
    }


    private onRankClick() {
        this.model.closeRedSpot(HallRedSpotType.Rank);
        HallBtnHelper.WndRankOpen();
    }

    private onBankClick() {
        HallBtnHelper.WndBankOpen();
        Global.Audio.playAudioSource("hall/sound/bank")
    }

    private onMailClick() {
        this.model.closeRedSpot(HallRedSpotType.Mail);
        HallBtnHelper.WndMailOpen();
    }

    private onServiceClick() {
        this.model.closeRedSpot(HallRedSpotType.Kefu);
        Global.Audio.playAudioSource("hall/sound/Customer_service")
        HallBtnHelper.WndServiceOpen();
    }
    private onRechargeClick() {
        Global.Component.scheduleOnce(()=>{
            HallBtnHelper.WndRechargeOpen();
            Global.Audio.playAudioSource("hall/sound/recharge")
         },0);
    }
}