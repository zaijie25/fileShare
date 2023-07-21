import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import PlayerInfoModel from "../../../hallcommon/model/PlayerInfoModel";
import VipView from "./VipView";

export default class WndVip2 extends WndBase {
    /**
     * 全局对象
     */
    static instance: WndVip2 = null;

    /**
     * 滑动容器
     */
    pageView: cc.PageView = null;
    /**
     * pageview对象数组
     */
    vipViewArr: VipView[] = [];
    /**
     * 左右箭头数组
     */
    jiantouNodeArr: cc.Node[] = [];

    private itemNode: cc.Node = null

    private vipCount: number = 15;

    private uiInit = false;

    private VipListReward = [];
    /**
     * 当前显示的页面
     */
    private LockvipView = -1;
    /**
     * 初始化脚本
     */
    protected onInit() {
        WndVip2.instance = this;
        this.isNeedDelay = true
        this.name = "WndVip2";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/VipUI2";
        // this.destoryType = DestoryType.ChangeScene;
        // this.model = <PlayerInfoModel>Global.ModelManager.getModel("PlayerInfoModel");
    }

    onDispose() {
        this.vipViewArr = []
        this.uiInit = false;
        WndVip2.instance = null;
    }

    /**
     * 初始化UI
     */
    protected initView() {
        this.addCommonClick("bg/close", this.closeBtnFunc, this);

        this.pageView = cc.find("pageview", this.node).getComponent(cc.PageView);
        this.pageView.node.on("page-turning", this.PageTurnCallback, this);
        this.itemNode = cc.find("pageview/view/content/page_1", this.node);
        this.itemNode.active = false;
        this.itemNode.parent.width = this.itemNode.width * PlayerInfoModel.instance.vip_cfg.length;
        let index = 1;
        this.vipCount = PlayerInfoModel.instance.vip_cfg.length + 1;
        Global.Component.schedule(() => {
            if (index >= this.vipCount) {
                this.itemNode.parent.width = this.itemNode.width * PlayerInfoModel.instance.vip_cfg.length;
                this.PageTurnCallback();
                this.uiInit = true;
                this.OnDataPrepared()
                return;
            }
            let end = index + 2;
            let begin = index;
            for (let i = begin; i < end; i++) {
                if (i >= this.vipCount) {
                    index++;
                    return;
                }
                var item: cc.Node = cc.instantiate(this.itemNode);
                item.name = "page_" + index;
                item.active = true;
                item.x = (index - 1) * this.itemNode.width;
                var vipView: VipView = item.getComponent(VipView);
                vipView.vip = index;
                vipView.initView()
                this.vipViewArr.push(vipView);
                item.setParent(this.itemNode.parent);
                index++;
            }
        }, 0, this.vipCount / 2)
        this.jiantouNodeArr[0] = Global.UIHelper.addCommonClick(this.node, "jiantou_left", this.leftBtnFunc, this);
        this.jiantouNodeArr[1] = Global.UIHelper.addCommonClick(this.node, "jiantou_right", this.rightBtnFunc, this);

        var scaleValue = 1.2;
        var time = 0.8;
        var ac1 = cc.scaleTo(time, scaleValue, scaleValue);
        var ac2 = cc.scaleTo(time, 1, 1);
        var seq = cc.sequence(ac1, ac2);
        var action = cc.repeatForever(seq);
        this.jiantouNodeArr[1].runAction(action);

        var ac1 = cc.scaleTo(time, scaleValue, scaleValue);
        var ac2 = cc.scaleTo(time, 1, 1);
        var seq = cc.sequence(ac1, ac2);
        var action = cc.repeatForever(seq);
        this.jiantouNodeArr[0].runAction(action);

    }

    /**
     * 界面打开回调
     */
    protected onOpen() {
        // this.pageView.node.active = false;
        // this.UpdateJiantou();
        if (this.uiInit)
            this.OnDataPrepared();
        Global.Event.on(GlobalEvent.CHANGEVIP, this, this.UseInfoUpdateUI)
    }

    openAnimFinish() {
        this.PageTurnCallback()
        this.LockvipView = Global.PlayerData.vip
        this.UpdateUI()
        this.UpdateJiantou();
        // this.pageView.node.active = true;
        // this.UpdateUI();
    }
    /**
     * 界面关闭回调
     */
    protected onClose() {
        Global.Event.off(GlobalEvent.CHANGEVIP, this, this.UseInfoUpdateUI)
    }

    /**
     * 关闭按钮点击
     */
    private closeBtnFunc() {
        this.close();
    }

    /**
     * 更新界面
     */
    UpdateUI() {
        Global.HallServer.send(NetAppface.mod, NetAppface.CheckVipReward, null, (data) => {
            if (data.list) {
                this.VipListReward = data.list;
                let status = 0;
                for (var i = 0; i < this.vipViewArr.length; i++) {
                    var vipView: VipView = this.vipViewArr[i];
                    if (this.VipListReward[i]) {
                        vipView.UpdateUI(this.VipListReward[i]);
                        if (this.VipListReward[i].status == 0 && Global.PlayerData.vip > i) {
                            status = 1;
                        }
                    }
                    else {
                        vipView.UpdateUI();
                    }
                }
                PlayerInfoModel.instance.is_vip_reward = status;
                Global.Event.event(GlobalEvent.VIPREWARD, null);
                if (this.LockvipView <= 0) {
                    this.LockvipView = Global.PlayerData.vip
                }
                if (this.LockvipView >= PlayerInfoModel.instance.vip_cfg.length) {
                    this.LockvipView = PlayerInfoModel.instance.vipExpArr.length - 1;
                }
                this.pageView.scrollToPage(this.LockvipView, 0.01);
            }
        }, (error) => {
            Global.UI.fastTip(error._errstr);
            // console.log(error);
        }, false, 60);
    }

    /**
     * 通知更新界面
     */
    private UseInfoUpdateUI() {
        Global.HallServer.clearCache(NetAppface.mod, NetAppface.CheckVipReward, null)
        this.UpdateUI();
    }

    /**
     * 更新箭头
     */
    UpdateJiantou() {
        var index = this.pageView.getCurrentPageIndex();
        this.LockvipView = this.pageView.getCurrentPageIndex();
        if (index > this.vipCount - 1)
            index = this.vipCount - 1;
        if (index <= 0) {
            this.jiantouNodeArr[0].active = false;
            this.jiantouNodeArr[1].active = true;
        } else if (index >= PlayerInfoModel.instance.vip_cfg.length - 1) {
            this.jiantouNodeArr[0].active = true;
            this.jiantouNodeArr[1].active = false;
        } else {
            this.jiantouNodeArr[0].active = true;
            this.jiantouNodeArr[1].active = true;
        }
        // this.OnDataPrepared()
    }

    /**
     * 翻页事件回调
     */
    PageTurnCallback() {
        var index = this.pageView.getCurrentPageIndex();
        this.LockvipView = this.pageView.getCurrentPageIndex();
        this.pageView.content.width = PlayerInfoModel.instance.vip_cfg.length * this.itemNode.width
        if (index > this.vipCount - 1) {
            index = this.vipCount - 1;
        }
        for (let i = 0; i < this.vipViewArr.length; i++) {
            if (i < index - 1 || i > index + 1)
                this.vipViewArr[i].node.active = false;
            else
                this.vipViewArr[i].node.active = true;
        }
        this.UpdateJiantou();
    }

    /**
     * 左箭头 点击
     */
    leftBtnFunc() {
        var index = this.pageView.getCurrentPageIndex();
        this.LockvipView = this.pageView.getCurrentPageIndex();
        if (index > 0) {
            this.pageView.scrollToPage(index - 1, 0.3);
        }
    }

    /**
     * 右箭头 点击
     */
    rightBtnFunc() {
        var index = this.pageView.getCurrentPageIndex();
        this.LockvipView = this.pageView.getCurrentPageIndex();
        if (index < PlayerInfoModel.instance.vip_cfg.length - 1) {
            this.pageView.scrollToPage(index + 1, 0.3);
        }
    }
}