import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import PlayerInfoModel from "../../../hallcommon/model/PlayerInfoModel";
import VipGiftView from "./VipGiftView";
import VipView from "./VipView";
import VipViewUI from "./VipViewUI";

export default class WndVip3 extends WndBase {
    /**
     * 滑动容器
     */
    pageView: cc.PageView = null;

    private giftViewUI:VipGiftView
    /**
     * pageview对象数组
     */
    vipViewArr: VipViewUI[] = [];

    banned = false

    giftBtn:cc.Node
    moreBtn:cc.Node

    giftNode:cc.Node

    private currentSelect = 0

    private layout:cc.Layout


    model:PlayerInfoModel
    /**
     * 左右箭头数组
     */
    jiantouNodeArr: cc.Node[] = [];

    private itemNode: cc.Node = null

    private vipCount: number = 15;

    private _uiInit = false;
    

    private get uiInit()
    {
        return this._uiInit
    } 

    private set uiInit( val)
    {
        this._uiInit = val
        if(val)
            this.UpdateUI()
    } 

    private VipReward :any;
    /**
     * 当前显示的页面
     */
    private LockvipView = -1;
    /**
     * 初始化脚本
     */
    protected onInit() {
        this.isNeedDelay = true
        this.name = "WndVip3";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/VipUI3";
        // this.destoryType = DestoryType.ChangeScene;
        this.model = <PlayerInfoModel>Global.ModelManager.getModel("PlayerInfoModel");
    }

    onDispose() {
        this.vipViewArr = []
        this.VipReward = null
        this.uiInit = false;
        Global.Event.off(GlobalEvent.UPDATEVIPDATA, this, this.updateData)
        Global.Event.off(GlobalEvent.CHANGEVIP, this, this.UseInfoUpdateUI)
    }

    /**
     * 初始化UI
     */
    protected initView() {
        this.addCommonClick("bg/close", this.closeBtnFunc, this);
        this.pageView = cc.find("pageview", this.node).getComponent(cc.PageView);
        this.pageView.node.on("page-turning", this.PageTurnCallback, this);
        Global.UIHelper.addCommonClick(this.node, "gift/info_node/rule", this.openRule, this);
        this.itemNode = cc.find("pageview/view/content/page_1", this.node);
        this.itemNode.active = false;
        this.itemNode.parent.width = this.itemNode.width * PlayerInfoModel.instance.vip_cfg.length;
        let index = 1;
        this.vipCount = PlayerInfoModel.instance.vip_cfg.length + 1;
        this.giftNode = this.getChild("gift")
        if(this.giftNode)
        {
            this.giftViewUI = this.giftNode.getComponent(VipGiftView)
            if(this.giftViewUI)
            {
                this.giftViewUI.initView()
            }
        }
        this.layout = cc.find("title",this.node).getComponent(cc.Layout)
        this.giftBtn = cc.find("title/gift", this.node)
        if(this.giftBtn)
        {
            this.giftBtn.on("click", this.changePanel, this);
        }
        this.moreBtn = cc.find("title/more", this.node)
        if(this.moreBtn)
        {
            this.moreBtn.on("click", this.changePanel, this);
        }
        
        Global.Component.schedule(() => {
            if (index > this.vipCount) {
                this.itemNode.parent.width = this.itemNode.width * PlayerInfoModel.instance.vip_cfg.length;
                //this.PageTurnCallback();
                this.uiInit = true;
                
                return;
            }
            let end = index + 1;
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
                var vipView: VipViewUI = item.getComponent(VipViewUI);
                vipView.vip = index;
                vipView.initView()
                this.vipViewArr.push(vipView);
              //  item.active = false;
                item.setParent(this.itemNode.parent);
                index++;
            }
        }, 0, this.vipCount )
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
        
       // this.itemNode.parent.children[0].active = true;

    }

    /**
     * 界面打开回调
     */
    protected onOpen() {
        Global.Event.on(GlobalEvent.CHANGEVIP, this, this.UseInfoUpdateUI)

        Global.Event.on(GlobalEvent.UPDATEVIPDATA, this, this.updateData)

        // this.pageView.node.active = false;
        // this.UpdateJiantou();
        // if (this.uiInit)
        //     this.OnDataPrepared();
        //this.PageTurnCallback()
        this.LockvipView = Global.PlayerData.vip
        if(this.uiInit)
            this.UpdateUI()
        
        
    }
    updateData(data) {
        if(!data) return
        let index = data.index
        let type = data.type
        if(type === 0)
        {
            if(this.VipReward.list.length > index)
                this.VipReward.list[index].status = 1
        }
        else if( type === 1)
        {
            this.VipReward.week.last_get = 1
        }
        else if (type === 2)
        {
            this.VipReward.month.last_get = 1
        }
        this.UpdateUI()



    }



    openAnimFinish() {
        
        
        // this.pageView.node.active = true;
        // this.UpdateUI();
    }

    openRule(node: cc.Node, arg1: string, openRule: any, arg3: this) {
        Global.UI.show("WndVipRule")
    }

    /**
     * 界面关闭回调
     */
    protected onClose() {
        this.VipReward = null
        this.pageView.enabled = true
        Global.Event.event("SHOWPREVILEGE",true)
        this.giftNode.active = false
        Global.Event.off(GlobalEvent.CHANGEVIP, this, this.UseInfoUpdateUI)
        Global.Event.off(GlobalEvent.UPDATEVIPDATA, this, this.updateData)
        
    }

    changePanel(target) {
        if (target === 0) {
            
            this.giftNode.active = true
            this.setToggleChecked(this.giftBtn, true)
            this.setToggleChecked(this.moreBtn, false)
            this.moreBtn.setSiblingIndex(0)
            this.giftBtn.setSiblingIndex(1)
            Global.Event.event("SHOWPREVILEGE",false)
            this.giftViewUI.refreshUI(this.VipReward,this.LockvipView)
            this.currentSelect = 0
            
            setTimeout(() => {
                this.UpdateJiantou("0")
            }, 100);
            

        }
        else if (target === 1){
            this.moreBtn.setSiblingIndex(1)
            this.giftBtn.setSiblingIndex(0)
            this.giftNode.active = false
            this.setToggleChecked(this.giftBtn, false)
            this.setToggleChecked(this.moreBtn, true)
            Global.Event.event("SHOWPREVILEGE",true)
            this.currentSelect = 1
            this.UpdateJiantou()
            
        }
        else if (target.node &&target.node.name === "gift")
        {
            this.moreBtn.setSiblingIndex(0)
            this.giftBtn.setSiblingIndex(1)
            this.currentSelect = 0
            this.giftNode.active = true
            this.giftViewUI.refreshUI(this.VipReward,this.LockvipView)
            Global.Event.event("SHOWPREVILEGE",false)
            this.setToggleChecked(this.giftBtn, true)
            this.setToggleChecked(this.moreBtn, false)
            this.UpdateJiantou("0")
            
        }
        else if (target.node &&target.node.name === "more")
        {
            this.moreBtn.setSiblingIndex(1)
            this.giftBtn.setSiblingIndex(0)
            this.currentSelect = 1
            this.giftNode.active = false
            Global.Event.event("SHOWPREVILEGE",true)
            this.setToggleChecked(this.giftBtn, false)
            this.setToggleChecked(this.moreBtn, true)
            this.UpdateJiantou()
            
        }

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
        if(!PlayerInfoModel.instance.vip_reward)
        {
            if(this.layout)
            {
                this.layout.enabled = true
            }
            for (var i = 0; i < this.vipViewArr.length; i++) {
                var vipView: VipViewUI = this.vipViewArr[i];
                vipView.UpdateUI(this.VipReward,i);
            }
            this.OnDataPrepared()
            if (this.LockvipView <= 0) {
                this.LockvipView = Global.PlayerData.vip
            }
            if (this.LockvipView >= PlayerInfoModel.instance.vip_cfg.length) {
                this.LockvipView = PlayerInfoModel.instance.vipExpArr.length - 1;
            }
            Global.Event.event(GlobalEvent.VIPREWARD, null);
            this.pageView.scrollToPage(this.LockvipView, 0.01);
            this.closeNotNeedItem();
            this.giftNode.active = false
            this.giftBtn.active = false
            Global.Event.event("SHOWPREVILEGE",true)
            
            return
        }
        if(this.VipReward)
        {
            if (this.layout) {
                this.layout.enabled = false
            }
            let status = 0;
            for (var i = 0; i < this.vipViewArr.length; i++) {
                var vipView: VipViewUI = this.vipViewArr[i];
                if (this.VipReward.list && i < this.VipReward.list.length && this.VipReward.list[i]) {
                    vipView.UpdateUI(this.VipReward, i);
                    if (this.VipReward.list[i].status === 0 && Global.PlayerData.vip >= this.VipReward.list[i].level) {
                        status = 1;
                    }
                }
            }

            PlayerInfoModel.instance.is_vip_reward = status;
            this.checkReward(this.VipReward)
            if (this.LockvipView <= 0) {
                this.LockvipView = Global.PlayerData.vip
            }
            if (this.LockvipView >= PlayerInfoModel.instance.vip_cfg.length) {
                this.LockvipView = PlayerInfoModel.instance.vipExpArr.length - 1;
            }
            Global.Event.event(GlobalEvent.VIPREWARD, null);
            this.pageView.scrollToPage(this.LockvipView, 0.01);
            this.closeNotNeedItem();
            if (PlayerInfoModel.instance.vip_reward === 1) {
                this.changePanel(0)
            }
            else {
                this.changePanel(1)
            }
            return
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.NewCheckVipReward, null, (data) => {
            if (data.list) {
                if (this.layout) {
                    this.layout.enabled = false
                }
                this.VipReward = data;
                let status = 0;
                this.OnDataPrepared()
                let count = 0
                for (var i = 0; i < this.vipViewArr.length; i++) {
                    count += 1
                    var vipView: VipViewUI = this.vipViewArr[i];
                    if (this.VipReward.list && i < this.VipReward.list.length && this.VipReward.list[i]) {
                        vipView.UpdateUI(this.VipReward, i);
                        if (this.VipReward.list[i].status == 0 && Global.PlayerData.vip >= this.VipReward.list[i].level) {
                            status = 1;
                        }
                    }
                }

                PlayerInfoModel.instance.is_vip_reward = status;
                this.checkReward(this.VipReward)
                Global.Event.event(GlobalEvent.VIPREWARD, null);
                if (this.LockvipView <= 0) {
                    this.LockvipView = Global.PlayerData.vip
                }
                if (this.LockvipView >= PlayerInfoModel.instance.vip_cfg.length) {
                    this.LockvipView = PlayerInfoModel.instance.vipExpArr.length - 1;
                }
                this.pageView.scrollToPage(this.LockvipView, 0.01);

                this.closeNotNeedItem();
                
                if (PlayerInfoModel.instance.vip_reward === 1) {
                    this.changePanel(0)
                }
                else {
                    this.changePanel(1)
                }

            }
        }, (error) => {
            Global.UI.fastTip(error._errstr);
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "WndVip3")
            // console.log(error);
        }, false);
    }

    closeNotNeedItem(){
          //关闭不显示的item
          let index = this.LockvipView;
          for (let i = 0; i < this.vipViewArr.length; i++) {
              if (i < index - 1 || i > index + 1)
                  this.vipViewArr[i].node.active = false;
              else
              {
                  this.vipViewArr[i].node.active = true;  
              }
          }
    }

    checkReward(data: any) {
        if(!data)
        {
            return
        }
        let weekData = data.week
        let month = data.month
        if(!weekData.last_get)
        {
            PlayerInfoModel.instance.is_week_reward = 1
        }
        else
        {
            PlayerInfoModel.instance.is_week_reward = 0
        }
        if(!month.last_get)
        {
            PlayerInfoModel.instance.is_month_reward = 1
        }
        else
        {
            PlayerInfoModel.instance.is_month_reward = 0
        }
        
    }

    /**
     * 通知更新界面
     */
    private UseInfoUpdateUI() {
        Global.HallServer.clearCache(NetAppface.mod, NetAppface.NewCheckVipReward, null)
        this.VipReward = null
        this.UpdateUI();
    }

    /**
     * 更新箭头
     */
    UpdateJiantou(flag?) {
        var index = this.pageView.getCurrentPageIndex();
        this.LockvipView = this.pageView.getCurrentPageIndex();
       
        this.pageView.enabled = true
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
        if(flag === "0") // 等于0表示特权礼包界面 需要隐藏镜头 并关闭pageVIEW
        {
            this.jiantouNodeArr[0].active = false;
            this.jiantouNodeArr[1].active = false;
            this.pageView.enabled = false
        }
        // this.OnDataPrepared()
    }

    setJiantouActive(flag)
    {
        this.jiantouNodeArr[0].active = flag;
        this.jiantouNodeArr[1].active = flag;
    }

    /**
     * 翻页事件回调
     */
    PageTurnCallback(event?) {
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
            {
                this.vipViewArr[i].node.active = true;  
            }
        }
        this.UpdateJiantou()
        // if(this.vipViewArr[index] && this.vipViewArr[index].currentSelect === 0)
        // {
        //     this.vipViewArr[index].changePanel(0)
        //     this.UpdateJiantou("0")
        // }
        // else if(this.vipViewArr[index] && this.vipViewArr[index].currentSelect === 1)
        // {
        //     this.vipViewArr[index].changePanel(1)
        //     this.UpdateJiantou()
        // }
        
       
       
            
    }

    /**
     * 左箭头 点击
     */
    leftBtnFunc() {
        Global.Event.event("SHOWPREVILEGE",true)
        this.giftNode.active = false
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
        Global.Event.event("SHOWPREVILEGE",true)
        this.giftNode.active = false
        var index = this.pageView.getCurrentPageIndex();
        this.LockvipView = this.pageView.getCurrentPageIndex();
        if (index < PlayerInfoModel.instance.vip_cfg.length - 1) {
            this.pageView.scrollToPage(index + 1, 0.3);
        }
    }

    setToggleChecked(targe: cc.Node, flag: boolean) {
        let check = targe.getChildByName("check")
        let normal = targe.getChildByName("unchecked")
        if (check) {
            check.active = flag
        }
        if (normal) {
            normal.active = !flag
        }

    }
}

export enum AwardBtnState
{
    NOTREADY = 0, //未达成
    READY = 1, // 已达成未领取
    ACHIEVED = 2,// 未达成 
    REACHED =3 // 已领取 

}

export enum ItemType
{
    LEVEL = 0,
    WEEK = 1,
    MONTH = 2
}