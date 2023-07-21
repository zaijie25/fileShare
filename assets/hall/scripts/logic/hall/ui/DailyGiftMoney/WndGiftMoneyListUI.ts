import PoolBase from "../../../core/tool/PoolBase";
import WndBase from "../../../core/ui/WndBase";

export default class WndGiftMoneyListUI extends WndBase {
    copyItem: any;
    contentNode: any;
    itemPool: GiftMoneyItemPool;
    nodeList: any[] = [];
    /**
     * 当前页签
     */
    currYeqian: number = -1;
    /**
     * 页签节点集合
     */
    yeqianArr: cc.Node[] = [];
    titleSp: cc.Sprite;
    titlenName = ["xbt_2", "xbt_5", "xbt_6"];
    titleSp2: cc.Sprite;
    titlenName2 = ["xbt_3", "xbt_4", "xbt_4"];
    /**
     * 昨日投注
     */
    yesterdayBet: cc.Label;
    /**
     * 累计投注
     */
    totalBet: cc.Label;
    /**
     * 数据集合
     */
    listmsg = null;

    protected onInit() {
        this.isNeedDelay = true
        this.name = "WndGiftMoneyListUI";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/DailyGiftMoney/GiftMoneyListUI";
    }

    protected initView() {
        this.copyItem = this.getChild("scrollview/view/content/item")
        this.copyItem.active = false
        this.contentNode = this.getChild("scrollview/view/content")
        this.initItemPool();
        this.addCommonClick('close', this.close, this)
        this.titleSp = this.getComponent("centerNode/panel/xbt_1", cc.Sprite);
        this.titleSp2 = this.getComponent("centerNode/panel/xbt_2", cc.Sprite);
        for (var i = 0; i < 3; i++) {
            var yeqianNode = this.addCommonClick("topyeqian/yeqian_" + i, this.yeqianBtnFunc, this);
            this.yeqianArr[i * 2] = cc.find("noSelected", yeqianNode);
            this.yeqianArr[i * 2 + 1] = cc.find("selected", yeqianNode);
            // this.contentArr[i] = cc.find("content/content_" + i, this.node);
        }
        this.yesterdayBet = this.getComponent("centerNode/yesterdayBet", cc.Label)
        this.totalBet = this.getComponent("centerNode/totalBet", cc.Label)
    }

    yeqianBtnFunc(target) {
        var arr = target.node.name.split("_");
        var param = arr[arr.length - 1];
        var yeqian = parseInt(param);
        this.ChangeYeqian(yeqian);
    }
    UpdatBtn() {
        for (var i = 0; i < 3; i++) {
            var bShow: boolean = (i == this.currYeqian);
            var yeqianNode = this.yeqianArr[i * 2 + 1];
            yeqianNode.active = bShow;
        }
        this.OnDataPrepared()
    }
    protected onOpen(args?: any) {
        this.listmsg = args[0];
        if (this.listmsg) {
            this.ChangeYeqian(0);
        }

        // this.CashBackModel.GetActivityCfg();
    }
    RefreshScrollView(data: any) {
        this.recycle()
        this.yesterdayBet.string = Global.Toolkit.GetMoneyFormat(this.listmsg.yesterday_bet)
        this.totalBet.string = Global.Toolkit.GetMoneyFormat(this.listmsg.total_bet)
        for (let j = 0; j < 7; j++) {
            let node = this.itemPool.getItem() as cc.Node;
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            let bgSprite = node.getChildByName("shurusz_d") as cc.Node;
            //表格条纹背景
            if(bgSprite){
                bgSprite.active = j % 2 == 0;
            }
            if (data == 0) {
                if (!this.listmsg.daily_cfg)
                    return;
                if (this.listmsg.yesterday_bet >= this.listmsg.daily_cfg[j].bet_point) {
                    if (j === 6) {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.daily_cfg[j], this.listmsg.yesterday_bet)
                    } else if (this.listmsg.yesterday_bet < this.listmsg.daily_cfg[j + 1].bet_point) {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.daily_cfg[j], this.listmsg.yesterday_bet)
                    } else {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.daily_cfg[j], -1)
                    }
                } else {
                    node.getComponent("GiftMoneyItem").Init(this.listmsg.daily_cfg[j], -1)
                }
            } else if (data == 1) {
                if (!this.listmsg.weekly_cfg)
                    return;
                if (this.listmsg.last_week_total_bet >= this.listmsg.weekly_cfg[j].bet_point) {
                    if (j === 6) {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.weekly_cfg[j], this.listmsg.last_week_total_bet)
                    } else if (this.listmsg.last_week_total_bet < this.listmsg.weekly_cfg[j + 1].bet_point) {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.weekly_cfg[j], this.listmsg.last_week_total_bet)
                    } else {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.weekly_cfg[j], -1)
                    }
                } else {
                    node.getComponent("GiftMoneyItem").Init(this.listmsg.weekly_cfg[j], -1)
                }
            } else if (data == 2) {
                if (!this.listmsg.monthly_cfg)
                    return;
                if (this.listmsg.last_month_total_bet >= this.listmsg.monthly_cfg[j].bet_point) {
                    if (j === 6) {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.monthly_cfg[j], this.listmsg.last_month_total_bet)
                    } else if (this.listmsg.last_month_total_bet < this.listmsg.monthly_cfg[j + 1].bet_point) {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.monthly_cfg[j], this.listmsg.last_month_total_bet)
                    } else {
                        node.getComponent("GiftMoneyItem").Init(this.listmsg.monthly_cfg[j], -1)
                    }
                }
                else {
                    node.getComponent("GiftMoneyItem").Init(this.listmsg.monthly_cfg[j], -1)
                }
            }
        }
    }
    /**
     * 切换页签
     * @param yeqian 
     */
    ChangeYeqian(yeqian: number) {
        let path = "hall/texture/hall/DailyGiftMoney/DailyGiftMoney";
        if (this.currYeqian != yeqian) {
            this.currYeqian = yeqian;
            this.UpdatBtn();
            Global.ResourceManager.loadAutoAtlas(this.titleSp, path, this.titlenName[yeqian], null);
            Global.ResourceManager.loadAutoAtlas(this.titleSp2, path, this.titlenName2[yeqian], null);
        }
        this.RefreshScrollView(yeqian)
    }

    /**
     * 界面关闭回调
     */
    protected onClose() {
        this.currYeqian = -1
    }
    protected onDispose() {
        this.currYeqian = -1
        this.itemPool.resetPool()
        this.nodeList = [];
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