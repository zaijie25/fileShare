import ViewBase from "../../../core/ui/ViewBase";
import HeadLayerView from "./HeadLayerView";
import HeadFrameLayerView from "./HeadFrameLayerView";

export default class ChooseHeadView extends ViewBase {

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

    protected initView()
    {

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

    UpdateUI(){
        for(var i = 0; i < 2; i++){
            var bShow:boolean = (i == this.curViewIndex);
            var yeqianNode = this.yeqianArr[i * 2 + 1];
            yeqianNode.active = bShow;
        }

    }

    changeView(viewIndex: number) {
       
        if(this.curViewIndex != viewIndex){
            this.curViewIndex = viewIndex;
            this.headLayerView.subViewState = this.curViewIndex == 0
            this.headFrameLayerView.subViewState = this.curViewIndex == 1
            this.UpdateUI();
        }
    }

    protected onSubViewShow()
    {
        this.changeView(0)
    }

    protected onSubViewHide()
    {
        this.curViewIndex = -1
    }



}