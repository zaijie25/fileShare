import WndBase from "../../../core/ui/WndBase";
import PlayerInfoModel from "../../../hallcommon/model/PlayerInfoModel";
import HeadLayerView from "./HeadLayerView";
import HeadFrameLayerView from "./HeadFrameLayerView";

export default class WndChooseHead extends WndBase{

    /**
     * 数据对象
     */
    private model: PlayerInfoModel;
    //头像
    spriteHead:cc.Sprite = null;
    //头像框
    spriteHeadFrame:cc.Sprite = null;

    /**
     * 当前页签
     */
    curViewIndex:number = -1;
    /**
     * 页签根节点集合
     */
    yeqianRootNodeArr:cc.Node[] = [];
    /**
     * 页签节点集合
     */

    headLayerView:HeadLayerView
    headFrameLayerView:HeadFrameLayerView
    yeqianArr:cc.Node[] = [];

    /**
     * 初始化脚本
     */
    protected onInit() {
        this.name = "WndChooseHead";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/ChooseHeadUI";
        this.model = <PlayerInfoModel>Global.ModelManager.getModel("PlayerInfoModel");
    }

    onDispose(){
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPersonInfo)

    }

    /**
     * 初始化UI
     */
    protected initView() {
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPersonInfo)

        this.addCommonClick("bg/close",this.closeBtnFunc,this);

        this.spriteHead =this.getComponent("headImg/headFrame", cc.Sprite);
        this.spriteHeadFrame = this.getComponent("headbox", cc.Sprite);

        for(var i = 0; i < 2; i++){
            var yeqianNode:cc.Node = this.addCommonClick( "yeqian/yeqian_" + i, this.subViewBtnFunc, this);
            this.yeqianRootNodeArr[i] = yeqianNode;

            this.yeqianArr[i * 2] = cc.find("noSelected", yeqianNode);
            this.yeqianArr[i * 2 + 1] = cc.find("selected", yeqianNode);
           
        }
        this.headLayerView = <HeadLayerView>this.addView("HeadLayerView", this.getChild("content/content_0"), HeadLayerView);
        this.headFrameLayerView = <HeadFrameLayerView>this.addView("HeadFrameLayerView", this.getChild("content/content_1"), HeadFrameLayerView);
        this.yeqianRootNodeArr[1].active = !Global.Setting.vipDisable;

    }

    UpdateUI(){
        for(var i = 0; i < 2; i++){
            var bShow:boolean = (i == this.curViewIndex);
            var yeqianNode = this.yeqianArr[i * 2 + 1];
            yeqianNode.active = bShow;
        }

    }

    /**
     * 页签按钮点击
     * @param target 
     */
    subViewBtnFunc(target){
        var arr = target.node.name.split("_");
        var param = arr[arr.length - 1];
        var viewIndex = parseInt(param);
        this.changeView(viewIndex)
    }

    changeView(viewIndex: number) {
       
        if(this.curViewIndex != viewIndex){
            this.curViewIndex = viewIndex;
            this.headLayerView.subViewState = this.curViewIndex == 0
            this.headFrameLayerView.subViewState = this.curViewIndex == 1
            this.UpdateUI();
        }
    }

    /**
     * 界面打开回调
     */
    protected onOpen(){
        this.model.reqGetUserInfo(null,null);
        this.refreshPersonInfo();
        this.changeView(0);
    }

    private refreshPersonInfo(){
        if(Global.SceneManager.inGame())
        {
            return
        }
        var data = Global.PlayerData;
        this.spriteHead.spriteFrame = Global.Toolkit.getLocalHeadSf(data.headimg);
        //头像框设置
        Global.Toolkit.loadLocalHeadFrame(this.spriteHeadFrame, data.headkuang);
    }
    /**
     * 界面关闭回调
     */
    protected onClose(){
        this.curViewIndex = -1
    }

    
    /**
     * 关闭按钮点击
     */
    private closeBtnFunc(){
        this.close();
    }
}