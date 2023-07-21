import PoolBase from "../../../core/tool/PoolBase";
import WndBase from "../../../core/ui/WndBase";
import RechargeGiftModel from "../../../hallcommon/model/RechargeGiftModel";
import { NetAppface } from "../../../core/net/hall/NetEvent";
export default class WndBuySafeUI extends WndBase{
    private  rechargeModel:RechargeGiftModel
    private gmbxNode:cc.Node
    private lqbxjNode:cc.Node
    copyItem: any;
    contentNode: any;
    itemPool: GiftMoneyItemPool;
    nodeList: any[] = [];
    /**
     * 当前页签
     */
    currYeqian:number = -1;
    /**
     * 页签节点集合
     */
    yeqianArr:cc.Node[] = [];
    private  list = null;
    protected onInit() {
        this.name = "WndBuySafeUI";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/safe/BuySafeUI";
        this.rechargeModel = <RechargeGiftModel>Global.ModelManager.getModel("RechargeGiftModel");
    }

    protected initView() {
        this.rechargeModel.on(RechargeGiftModel.GetCfg, this, this.onGetConfig);
        this.copyItem = this.getChild("scrollview/view/content/item")
        this.contentNode = this.getChild("scrollview/view/content")
        this.initItemPool();
        this.addCommonClick('close', this.close, this)
        this.addCommonClick('btn_gz', this.onRule, this)
        this.updateUI();
    }
    //保险金
    onGetConfig(data){
        if(data == null) return
        let arr = data.data
        for (let index = 0; index < arr.length; index++) {
            let cfg = arr[index];
            if(cfg && cfg.atype == 19 )
            {
                this.rechargeModel.safeData = cfg.cfg;
                this.updateUI();
                break
            }
        }
    }
    updateUI(){
        let yesterdayBet = this.getChild("centerNode/yesterdayBet").getComponent(cc.Label);
        let point = Number(this.rechargeModel.safeData.profit)*-1 // 显示时需要正负转换
        yesterdayBet.string = Global.Toolkit.formatPointStr(point, true)
        this.gmbxNode =  this.addCommonClick('centerNode/btn_gmbx/btn_gmbx', this.onBuySafe, this)
        this.lqbxjNode = this.addCommonClick('centerNode/btn_lqbxj/btn_lqbxj', this.onReceiveSafe, this)
        let btn_lqbxj_1 = this.getChild("centerNode/btn_lqbxj/btn_lqbxj_1")
        let btn_gmbx_1 = this.getChild("centerNode/btn_gmbx/btn_gmbx_1")
        if(this.rechargeModel.safeData.recive_point == 0){ //可以领取保险的金额
            this.lqbxjNode.active = false;
            btn_lqbxj_1.active = true;
        }else{
            this.lqbxjNode.active = true;
            btn_lqbxj_1.active = false;
        }
        if(this.rechargeModel.safeData.premium != 0){ //是否购买了保险
            this.gmbxNode.active = false;
            btn_gmbx_1.active = true;
        }else{
            this.gmbxNode.active = true;
            btn_gmbx_1.active = false;
        }
        this.list = this.rechargeModel.safeData.cfg.list;
        for(var i = 0; i < 3; i++){
            var yeqianNode = this.addCommonClick("topyeqian/yeqian_" + i, this.yeqianBtnFunc, this);
            this.yeqianArr[i * 2] = cc.find("noSelected", yeqianNode);
            this.yeqianArr[i * 2 + 1] = cc.find("selected", yeqianNode);
            if(this.list && this.list[i]){
                let data = this.list[i];
                let label =  cc.find("noSelected/num", yeqianNode).getComponent(cc.Label);
                label.string = (data.premium/Global.Setting.glodRatio).toString();
                let slabel =  cc.find("selected/num", yeqianNode).getComponent(cc.Label);
                slabel.string = (data.premium/Global.Setting.glodRatio).toString();
                yeqianNode.active = true
            }else{
                yeqianNode.active = false
            }
        }
    }
    yeqianBtnFunc(target){
        var arr = target.node.name.split("_");
        var param = arr[arr.length - 1];
        var yeqian = parseInt(param);
        this.ChangeYeqian(yeqian);
    }
    UpdatBtn(){
        for(var i = 0; i < 3; i++){
            var bShow:boolean = (i == this.currYeqian);
            var yeqianNode = this.yeqianArr[i * 2 + 1];
            yeqianNode.active = bShow;
            if(this.list[i] && bShow){
                this.RefreshScrollView(this.list[i])
            }
        }
    }
    protected onOpen(args?: any[]) {
        this.copyItem.active = false
        this.ChangeYeqian(0);
        if(this.list[0]){
            this.RefreshScrollView(this.list[0])
        }
        this.rechargeModel.reqGetActivityCfg(false)
    }
    RefreshScrollView(data: any) {
        this.recycle()
        for (let j = 0; j < data.odds.length; j++) {
            let node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            if(data.odds[j]){
                node.getComponent("GiftMoneyItem").InitSafe(data.odds[j],data.premium)
            }
        }
    }
    /**
     * 切换页签
     * @param yeqian 
     */
    ChangeYeqian(yeqian: number) {
        if (this.currYeqian != yeqian) {
            this.currYeqian = yeqian;
            this.UpdatBtn();
        }
    }
    onRule(){
        Global.UI.show("WndSafeRuleUI")
    }
    /**
     * 购买保险
     */
    onBuySafe(){
        Global.HallServer.send(NetAppface.mod, NetAppface.BuyInsurance, {premium:this.list[this.currYeqian].premium},(retObj) => {
            Global.UI.fastTip("购买保险成功");
            this.rechargeModel.reqGetActivityCfg(false)
            Global.HallServer.send(NetAppface.mod,NetAppface.GetUserPoint,{});
        },(error) => {
            Global.UI.fastTip(error._errstr);
        },false);
    }
    /**
     * 领取保险
     */
    onReceiveSafe(){
        Global.HallServer.send(NetAppface.mod, NetAppface.ReciveInsurance, {},(retObj) => {
            Global.UI.show("WndRebateGet", retObj.recive_point,null,() => {
            })
            Global.HallServer.send(NetAppface.mod,NetAppface.GetUserPoint,{});
            this.rechargeModel.reqGetActivityCfg(false)
        },(error) => {
            Global.UI.fastTip(error._errstr);
        },false);
    }
    /**
     * 界面关闭回调
     */
    protected onClose(){
        this.currYeqian = -1
    }
    protected onDispose() {
        this.currYeqian = -1
        this.itemPool.resetPool()
        this.nodeList = [];
        this.rechargeModel.off(RechargeGiftModel.GetCfg, this, this.onGetConfig);
    }
    private initItemPool() {

        this.itemPool = new GiftMoneyItemPool(this.copyItem);
    }
    public recycle() {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    }
}
class GiftMoneyItemPool extends PoolBase {
    constructor(private copyNode: cc.Node) {
        super();
    }

    protected createItem() {
        return cc.instantiate(this.copyNode);
    }

    protected resetItem(node: cc.Node) {
        node.active = false;
        node.setParent(null);
    }
}