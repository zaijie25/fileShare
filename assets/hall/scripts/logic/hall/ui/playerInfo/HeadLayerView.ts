import ViewBase from "../../../core/ui/ViewBase";
import PlayerInfoModel from "../../../hallcommon/model/PlayerInfoModel";

/**
 * 选择头像界面
 */
export default class HeadLayerView extends ViewBase {

    model: PlayerInfoModel
    /**
     * 头像范围
     */
    private headCount: number = 81;
    /**
     * 当前选中的头像索引
     */
    private chooseHeadIndex: number = 0;
    /**
     * 滚动容器
     */
    scrollView: cc.ScrollView = null;
    /**
     * 预设节点
     */
    itemNode: cc.Node = null;
    /**
     * 选中节点
     */
    //chooseNode:cc.Node = null;
    /**
     * 当前生效的头像标识（勾）
     */
    chooseBg: cc.Node = null;
    chooseGou: cc.Node = null;
    chooseCheck: cc.Node = null;
    /**
     * 初始坐标和间隔
     */
    xyGapArr = [0, 0, 138, 141];

    protected initView() {
        this.model = Global.ModelManager.getModel("PlayerInfoModel")
        this.headCount = Global.Setting.headNameRange;

        this.scrollView = this.getComponent("scrollview", cc.ScrollView)
        this.itemNode = this.getChild("scrollview/view/content/itemlayer/item");
        this.itemNode.active = false;
        let startX = this.itemNode.x;
        let startY = this.itemNode.y;
        this.xyGapArr[0] = startX;
        this.xyGapArr[1] = startY;

        this.xyGapArr[2] = Global.Setting.SkinConfig.zhuangbanHeadWH[0]
        this.xyGapArr[3] = Global.Setting.SkinConfig.zhuangbanHeadWH[1]

        let h = 0;
        let index = 0;

        Global.Component.schedule(() => {
            if (index >= this.headCount) {
                h = -h + (this.itemNode.height / 2)
                var size = this.scrollView.node.getContentSize();
                if (h < size.height) {
                    h = size.height;
                }
                this.scrollView.content.setContentSize(0, h);
                return
            }
            let end = index + 2;
            let begin = index;
            for (let i = begin; i < end; i++) {
                if (i >= this.headCount) {
                    index++;
                    return;
                }
                let item: cc.Node = cc.instantiate(this.itemNode);
                item.active = true
                item.setParent(this.itemNode.parent);

                item.name = "head_" + i;
                item.x = startX + this.xyGapArr[2] * (i % 5); 

                h = startY - this.xyGapArr[3] * Math.floor(i / 5);
                item.y = h;
                Global.UIHelper.addCommonClick(item, "", this.HeadBtnFunc, this, cc.Button.Transition.NONE);

                this.UpdateHead(item, i);
                index++;
            }
        }, 0, this.headCount / 2)


        // this.chooseBg = cc.find("chooselayer/chooseBG", this.scrollView.content);
        this.chooseGou = cc.find("chooselayer/chooseGou", this.scrollView.content);
        // this.chooseCheck = cc.find("chooselayer/chooseCheck", this.scrollView.content)
    }


    /**
    * 更新界面
    */
    UpdateUI() {
        var i = this.chooseHeadIndex;
        var x = this.xyGapArr[0] + this.xyGapArr[2] * (i % 5);
        var y = this.xyGapArr[1] - this.xyGapArr[3] * Math.floor(i / 5);

        i = parseInt(Global.PlayerData.headimg) - 1;
        var x = this.xyGapArr[0] + this.xyGapArr[2] * (i % 5);
        var y = this.xyGapArr[1] - this.xyGapArr[3] * Math.floor(i / 5);
        this.chooseGou.x = x + 48;
        this.chooseGou.y = y - 48;
        // this.chooseBg.x = x;
        // this.chooseBg.y = y -30;
        // this.chooseCheck.x = x + 4;
        // this.chooseCheck.y = y - 5;
    }

    /**
     * 更新头像
     * @param itemNode 头像节点
     * @param index 索引
     */
    UpdateHead(itemNode: cc.Node, index: number) {
        var headImg = "" + (index + 1);
        var sprite: cc.Sprite = cc.find("mask/headFrame", itemNode).getComponent(cc.Sprite)
        sprite.spriteFrame = Global.Toolkit.getLocalHeadSf(headImg);
    }

    /**
     * 头像点击
     * @param target 
     */
    HeadBtnFunc(target){
        var arr = target.name.split("_");
        var index = parseInt(arr[arr.length - 1]);
        this.chooseHeadIndex = index;
        this.UpdateUI();
        
        var chooseHead = "" + (this.chooseHeadIndex + 1);
        if(chooseHead != Global.PlayerData.headimg){
            //请求修改头像
            let param:any = {}
            param.headimg = chooseHead;
            this.model.reqEditUserInfo(param, ()=>{
                Global.PlayerData.headimg = chooseHead; //更新玩家数据！
                this.UpdateUI();
                
            });
        }
    }

    protected onSubViewShow() {
        this.chooseHeadIndex = parseInt(Global.PlayerData.headimg) - 1;
        this.UpdateUI();
    }

    protected onSubViewHide() {

    }

}