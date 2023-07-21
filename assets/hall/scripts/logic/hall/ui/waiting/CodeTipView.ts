import SpreadModel from "../../../hallcommon/model/SpreadModel";
import AppHelper from "../../../core/tool/AppHelper";


//游戏列表item
const {ccclass, property} = cc._decorator;

@ccclass
export default class CodeTipView extends cc.Component {
    @property(cc.Node)
    circle :cc.Node = null;
    @property(cc.Label)
    tips :cc.Label = null;
    private action;
    private isTounch = true;
    SpreadModel: SpreadModel;
        /**
     * 单例对象
     */
    static instance:CodeTipView = null;
    onLoad()
    {
        CodeTipView.instance = this;
        Global.UIHelper.addCommonClick(this.node, "bgNode", this.callback, this);
        this.action = cc.rotateTo(5, 360 * 5);
        // this.action.easing(); //停止状态 慢 - 快 - 慢
        this.circle.runAction(this.action);
    }
    
    onDestroy(){
        CodeTipView.instance = null;
    }

    protected callback(){
        if(this.isTounch){
            this.isTounch = false;
            this.start();
            this.tips.string = "正在获取";
            this.SpreadModel = <SpreadModel>Global.ModelManager.getModel("SpreadModel");
            this.SpreadModel.loadShortUrl(Global.Setting.Urls.inviteUrl)
        }
    }

    protected start()
    {
        this.circle.runAction(this.action);
        this.node.active = true;
    }
    public success()
    {
        this.isTounch = true;
        this.circle.stopAction(this.action);
        this.node.active = false;
    }
    public error()
    {
        this.isTounch = true;
        this.node.active = true;
        this.tips.string = "获取失败,请重试";
        this.circle.stopAction(this.action);
    }
}
