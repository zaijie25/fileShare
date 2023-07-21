import ViewBase from "../../../../core/ui/ViewBase";
import PlayerWallet from "../../../../core/component/PlayerWallet";
import PlayerHeadView from "./PlayerHeadView";
import HallModel, { HallRedSpotType } from "../../../../hallcommon/model/HallModel";
import HallBtnHelper from "./HallBtnHelper";
import GlobalEvent from "../../../../core/GlobalEvent";

export default class HallMoreGameTopNode extends ViewBase
{
    private playerWalllet:PlayerWallet;

    private playerHead:PlayerHeadView

    protected initView()
    {
        //头像组件
        this.playerHead = <PlayerHeadView>this.addView("PlayerHeadView",this.getChild("PlayerHeadView"),PlayerHeadView,true);
        //钱包组件
        this.playerWalllet =  <PlayerWallet>this.addView("PlayerWallet",this.getChild("PlayerHeadView/PlayerWallet"),PlayerWallet,true);
        this.playerWalllet.rechargeAction();
        //点击事件注册
        this.addCommonClick("PlayerHeadView/head", this.onHeadClick, this, null);
        this.addCommonClick("moreGameCloseBtn",this.onCloseMoreGame,this)
        
    }

    onSubViewShow(){
        this.playerWalllet.subViewState = true
        this.playerHead.subViewState = true
    }

    onSubViewHide(){
    }

    onDispose()
    {
        
    }

    /***************************************************** 点击事件区域 **************************************/

    private onHeadClick()
    {
        HallBtnHelper.WndPersonalInfoOpen();
    }

    private onCloseMoreGame(){
        Global.Event.event(GlobalEvent.CloseMoreGame,true);
    }
}