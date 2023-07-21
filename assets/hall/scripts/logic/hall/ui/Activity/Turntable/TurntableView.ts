import ViewBase from "../../../../core/ui/ViewBase";
import ZhuanpanModel from "../../../../hallcommon/model/ZhuanpanModel";
import TurnTable from "./TurnTable";

export default class TurntableView extends ViewBase 
{


    private model :ZhuanpanModel

    private turnTable:TurnTable

    speed:number = 30;
    /**
     * 当前轮播数据索引
     */
    lunboIndex:number = -1;
    /**
     * 积分文本集合
     */
    labelArr:cc.Label[] = [];
    
    /**
     * 子元素 RichText组件集合 
     */
    itemArr : Array<cc.RichText> = new Array();

    /**
     * 轮播遮罩节点
     */
    maskNode:cc.Node = null;

    /**
     * xy坐标和间隔
     */
    xyGapArr:number[] = [0, -16, 0, 26];

    private subViewPath :any = {
        "turnTable":"hall/prefabs/ui/ActivityCenter/subView/turnTable",
    }

    private viewKeyTypeMap :any = {
        "turnTable":TurnTable,
    }

    private timer : NodeJS.Timeout

    frameTime: number = 16;
    
    protected initView()
    {
       

        this.model = Global.ModelManager.getModel("ZhuanpanModel")

        this.model.on(ZhuanpanModel.RefreshRecordUI,this,this.updateIndex)
        this.model.on(ZhuanpanModel.RefreshScore,this,this.refreshScore)
        // if(this.model)
        // {
        //     this.model.reqLunbo()
        // }
        for(var i = 0; i < 5; i++){
            this.labelArr[i] = this.getComponent("turnTableView/jifen/label_jifen_" + i,cc.Label)
        }
        this.addCommonClick("turnTableView/jifen/btn_rule",this.onRuleBtnClicked,this)

        this.maskNode =this.getChild("turnTableView/lunbo/mask");
        var tempItem:cc.RichText = this.getComponent("turnTableView/lunbo/mask/itemRichText",cc.RichText)
        tempItem.string = "";
        for(var i = 0; i < 6; i++){
            if(i > 0){
                tempItem = cc.instantiate(tempItem.node).getComponent(cc.RichText);
            }

            this.itemArr.push(tempItem);
            tempItem.node.setParent(this.maskNode);
            tempItem.node.y = this.xyGapArr[1] - i * this.xyGapArr[3];
        }
        this.initSubViewClass(this.viewKeyTypeMap)
        this.InitScripts()

    }

    async InitScripts() {
        await this.initSubView(this.subViewPath,this.viewKeyTypeMap,this.getChild("turnTableView"))
    }

    updateIndex(index) {
        this.lunboIndex = index
    }
    onRuleBtnClicked() {
        Global.UI.show("WndTurntableRule")
    }

    refreshScore()
    {
        var data =this.model.data;
        if(!data){
            return;
        }
        this.labelArr[0].string = "" + data["coin"];
        this.labelArr[1].string = "" + data["week_login_coin"];
        this.labelArr[2].string = "" + data["week_bet_coin"];
        this.labelArr[3].string = "" + data["week_share_coin"];
        this.labelArr[4].string = "" + data["week_share_bet_coin"];

    }

    protected onSubViewShow()
    {
        //this.model.reqActivityCfg()
        //this.model.reqLunbo()
        this.turnTable.subViewState = true
        this.timer = setInterval(this.runCarousel.bind(this),this.frameTime)
    }
    
    runCarousel() {
        let dt = this.frameTime / 1000
        if(this.lunboIndex < 0){
            this.UpdateCarouselUI();
            return;
        }
        var dis = dt * this.speed;
        for(var i = 0; i < this.itemArr.length; i++){
            var item:cc.RichText = this.itemArr[i];
            item.node.y += dis;
            if(item.node.y >= this.xyGapArr[1] + this.xyGapArr[3]){
                item.node.y -= this.xyGapArr[3] * 6;
                this.UpdateRichText(item);
            }
        }
    }
    

    onDispose()
    {
        if(this.timer)
        {
            clearTimeout(this.timer)
        } 
        this.model.off(ZhuanpanModel.RefreshRecordUI,this,this.updateIndex)
        this.model.off(ZhuanpanModel.RefreshScore,this,this.refreshScore)
    }

    /**
     * 更新显示
     */
    UpdateCarouselUI(){
        var dataArr = ZhuanpanModel.instance.lunboDataArr;
        if(dataArr.length > 0){
            for(var i = 0; i < this.itemArr.length; i++){
                var item:cc.RichText = this.itemArr[i];
                this.UpdateRichText(item);
            }
        }
    }

    /**
     * 更新单一轮播文本
     * @param item 
     */
    UpdateRichText(item:cc.RichText){
        var dataArr = ZhuanpanModel.instance.lunboDataArr;
        if(dataArr.length <= 0){
            return;
        }
        this.lunboIndex++;
        if(this.lunboIndex >= dataArr.length){
            this.lunboIndex = 0;
        }

        var obj = dataArr[this.lunboIndex];
        let color1 = Global.Setting.SkinConfig.zhuanpanColors[0];
        let color2 = Global.Setting.SkinConfig.zhuanpanColors[1];
        item.string = "恭喜玩家<color=" + color1 + ">" + obj.name + "</c>，获得<color=" + color2 + ">" + obj.point_name + "</c>";

        if(this.lunboIndex == dataArr.length - 1){
            //请求新的轮播数据
            ZhuanpanModel.instance.reqLunbo(1000);
        }
    }


    protected onSubViewHide()
    {
        if(this.timer)
        {
            clearTimeout(this.timer)
        }
    }

   
    
}