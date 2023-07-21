import ViewBase from "../ui/ViewBase";
import GlobalEvent from "../GlobalEvent";
import HallBtnHelper from "../../hall/ui/hall/views/HallBtnHelper";
import PlayerInfoModel from "../../hallcommon/model/PlayerInfoModel";


export default class PlayerWallet extends ViewBase {

    private jbLabel: cc.Label = null;
    private SpineNode: sp.Skeleton = null;
    // private yhLabel: cc.Label = null;
    private getTime = 0; //点击时长
    private hearttime: any;
    private img_shuaxin:cc.Node = null;
    protected initView() {
        this.img_shuaxin = this.getChild("img_shuaxin");
        Global.UIHelper.addCommonClick(this.node, "img_shuaxin", this.refreshCoinBtnClick, this);
        this.jbLabel = this.getComponent("jbLabel", cc.Label);
        this.SpineNode = this.getComponent("refreshSkeleton", sp.Skeleton);
      //  Global.UIHelper.addCommonClick(this.node, "icon_yinhang", this.onBankClick, this);
        // this.yhLabel = this.getComponent("yhLabel",cc.Label);
        // this.addCommonClick("jbBox", this.jbBtnClickFunc, this, null);
        // this.addCommonClick("yhBox",this.yhBtnClickFunc,this, null);
    }

    private onBankClick() {
        HallBtnHelper.WndBankOpen();
        Global.Audio.playAudioSource("hall/sound/bank")
    }
    //刷新事件
    public refreshAction (){
       // this.addCommonClick("jinb_sx", this.refreshCoinBtnClick, this, null);
    }
    //充值事件
    public rechargeAction (){
        this.addCommonClick("jbBox", this.jbBtnClickFunc, this, null);
    }

    onSubViewShow() {
        this.playerPointChange();
        //监听玩家金钱变化
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE, this, this.playerPointChange);
    }

    onSubViewHide() {
        //注销玩家金钱变化
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.playerPointChange);
    }

    onDispose() {
        //注销玩家金钱变化
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.playerPointChange);
    }

    //玩家金币变化
    playerPointChange() {
        // this.jbLabel.string = Global.Toolkit.formatPoint(Global.PlayerData.point, 3).toString();
        // this.yhLabel.string = Global.Toolkit.formatPoint(Global.PlayerData.bank_point, 3).toString();
        this.jbLabel.string = Global.Toolkit.formatPointStr(Global.PlayerData.point, true).toString();
        // this.yhLabel.string = Global.Toolkit.formatPointStr(Global.PlayerData.bank_point, true).toString();
    }

    //金币充值
    jbBtnClickFunc() {
        HallBtnHelper.WndRechargeOpen();
    }

    //银货充值
    yhBtnClickFunc() {
        HallBtnHelper.WndBankOpen();
    }

    public sendLoadingTime() {
        clearTimeout(this.hearttime);
        let self = this;
        this.hearttime = setTimeout(function () {
            self.getTime++;
            if(self.getTime > 3){
                self.getTime = 0
                return;
            }
            self.sendLoadingTime();
        }, 1000 * 1);
    }
    refreshCoinBtnClick() {

        cc.tween(this.img_shuaxin).to(2,{rotation:720}).call(()=>{
            this.img_shuaxin.rotation = 0;
        }).start();


        if(this.getTime == 0){
            this.getTime++;
            this.sendLoadingTime()
    
            PlayerInfoModel.instance.reqGetUserInfo((retObj) => {
                Global.HallServer.event(NetAppface.GetUserInfo,retObj)

            },(error) => {
               
            });
        }else{
            Logger.error("倒计时未结束 ==== " + this.getTime);
        }

    }
}
