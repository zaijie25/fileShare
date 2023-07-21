import ViewBase from "../../../core/ui/ViewBase";
import PlayerInfoModel from "../../../hallcommon/model/PlayerInfoModel";

/**
 * 装扮页签下的头像框页签视图
 */
export default class HeadFrameLayerView extends ViewBase {

    model: PlayerInfoModel


    /**
    * 头像框范围
    */
    private headFrameCount: number = 15;
    /**
     * 当前选中的头像框索引
     */
    private chooseHeadFrameIndex: number = -1;
    /**
     * 滚动容器
     */
    scrollView: cc.ScrollView = null;
    /**
     * 预设节点
     */
    itemNode: cc.Node = null;
    /**
     * 初始坐标和间隔
     */
    xyGapArr = [0, 0, 164, 160];
    /**
     * 头像框节点集合
     */
    itemNodeArr: cc.Node[] = [];
    /**
     * 当前生效的头像框标识（勾）
     */
    // chooseBg: cc.Node = null;
    chooseGou: cc.Node = null;

    /**
     * 当前显示的头像框内的头像
     */
    spriteHeadVip: cc.Sprite = null;
    /**
     * 当前显示的头像框
     */
    spriteHeadFrameVip: cc.Sprite = null;
    /**
     * 当前显示的头像框vip图标
     */
    spriteVip: cc.Sprite = null;
    /**
     * 当前显示的头像框vip文本
     */
    labelVip: cc.Label = null;
    /**
     * 当前显示的头像框信息索引
     */
    showHeadFrameIndex = -1;


    protected initView() {
        this.model = Global.ModelManager.getModel("PlayerInfoModel")

        this.scrollView = cc.find("scrollview", this.node).getComponent(cc.ScrollView);
        this.itemNode = cc.find("itemlayer/item", this.scrollView.content);

        // this.chooseBg = cc.find("chooselayer/chooseBG", this.scrollView.content)
        this.chooseGou = cc.find("chooselayer/chooseGou", this.scrollView.content);

        var startX = this.itemNode.x;
        var startY = this.itemNode.y;
        this.xyGapArr[0] = startX;
        this.xyGapArr[1] = startY;

        this.xyGapArr[2] = Global.Setting.SkinConfig.zhuangbanKuangWH[0]
        this.xyGapArr[3] = Global.Setting.SkinConfig.zhuangbanKuangWH[1]

        var h = 0;
        let index = 0;
        // this.headFrameCount = PlayerInfoModel.instance.vip_cfg.length;
        Global.Component.schedule(() => {

            let end = index + 2;
            let begin = index;
            for (let i = begin; i < end; i++) {
                if (i >= this.headFrameCount) {
                    if (index >= this.headFrameCount) {
                        h = -h + (this.itemNode.height / 2);
                        var size = this.scrollView.node.getContentSize();
                        if (h < size.height) {
                            h = size.height;
                        }
                        this.scrollView.content.setContentSize(0, h + 20);
                        return
                    }
                    return;
                }
                var item: cc.Node = cc.instantiate(this.itemNode);
                item.setParent(this.itemNode.parent);
                item.active = true
                this.itemNodeArr.push(item);

                item.name = "head_" + i;
                item.x = startX + this.xyGapArr[2] * (i % 3);

                h = startY - this.xyGapArr[3] * Math.floor(i / 3);
                item.y = h;
                Global.UIHelper.addCommonClick(item, "", this.HeadBtnFunc, this, cc.Button.Transition.NONE);

                this.UpdateHead(item, i);
                index++
            }
        }, 0, this.headFrameCount / 2)

        this.itemNode.active = false;

        this.spriteHeadVip = cc.find("right/item/head", this.node).getComponent(cc.Sprite);
        this.spriteHeadFrameVip = cc.find("right/item/txk", this.node).getComponent(cc.Sprite);
        this.spriteVip = cc.find("right/icon_vip", this.node).getComponent(cc.Sprite);
        this.labelVip = cc.find("right/label_vip", this.node).getComponent(cc.Label);
        Global.Event.on(GlobalEvent.CHANGEVIP, this, this.updateUserInfo)
    }

    /**
     * 更新界面
     */
    UpdateUI() {
        if (this.chooseHeadFrameIndex >= 0) {
            var node = this.itemNodeArr[this.chooseHeadFrameIndex];
            this.UpdateHead(node, this.chooseHeadFrameIndex, true);
        }

        var i = parseInt(Global.PlayerData.headkuang) - 1;
        if (i >= 0) {
            // this.chooseBg.active = true;
            this.chooseGou.active = true;
            var x = this.xyGapArr[0] + this.xyGapArr[2] * (i % 3);
            var y = this.xyGapArr[1] - this.xyGapArr[3] * Math.floor(i / 3);
            this.chooseGou.x = x;
            this.chooseGou.y = y - 30;
            // this.chooseBg.x = x;
            // this.chooseBg.y = y -30;
        } else {
            // this.chooseBg.active = false;
            this.chooseGou.active = false;
        }
    }

    /**
     * 更新头像框
     * @param itemNode 头像节点
     * @param index 索引
     */
    UpdateHead(itemNode: cc.Node, index: number, bChoose: boolean = false) {
        var headImg = "" + (index + 1);
        var sprite: cc.Sprite = cc.find("txk", itemNode).getComponent(cc.Sprite);
        var unlock = cc.find("unlock", itemNode);
        unlock.active = false;
        var unlocklab = cc.find("unlock_lab", unlock).getComponent(cc.Label);
        unlocklab.string = "vip" + headImg;
        if (Global.PlayerData.vip < index + 1) {
            unlock.active = true
        }
        Global.Toolkit.loadLocalHeadFrame(sprite, headImg, false, true);
    }

    /**
     * 更新vip内容
     */
    UpdateVip() {
        var showVip = this.showHeadFrameIndex + 1;
        if (showVip < 1) {
            showVip = 1;
        }
        if (this.model.vipExpArr.length <= showVip) {
            showVip = this.model.vipExpArr.length;
        }
        var headImg = "" + showVip;
        Global.Toolkit.loadLocalHeadFrame(this.spriteHeadFrameVip, headImg);

        Global.Toolkit.loadLocalVip(this.spriteVip, showVip);

        this.labelVip.string = "激活" + "VIP" + showVip + "即可获得";
    }

    /**
     * 头像框点击
     * @param target 
     */
    HeadBtnFunc(target) {
        var arr = target.name.split("_");
        var index = parseInt(arr[arr.length - 1]);
        this.showHeadFrameIndex = index;
        this.UpdateVip();

        var needVip = index + 1;
        if (Global.PlayerData.vip < needVip) {
            Global.UI.fastTip("头像框未拥有");
            return;
        }

        this.CancelChooseLastHead();

        this.chooseHeadFrameIndex = index;
        this.UpdateUI();

        var chooseHead = "" + (this.chooseHeadFrameIndex + 1);
        if (chooseHead != Global.PlayerData.headkuang) {
            //请求修改头像框
            let param: any = {}
            param.head = parseInt(chooseHead);
            this.model.reqSetSelfCfg(param, () => {
                Global.PlayerData.headkuang = chooseHead;
                this.UpdateUI();
                // Global.UI.fastTip("修改头像框成功！");
            });
        }
    }

    /**
     * 取消选择之前的头像框
     */
    CancelChooseLastHead() {
        if (this.chooseHeadFrameIndex >= 0) {
            var lastNode = this.itemNodeArr[this.chooseHeadFrameIndex];
            this.UpdateHead(lastNode, this.chooseHeadFrameIndex);
        }
    }

    onDispose() {
        Global.Event.off(GlobalEvent.CHANGEVIP, this, this.updateUserInfo)
    }

    protected onSubViewShow() {
        this.CancelChooseLastHead();
        this.spriteHeadVip.spriteFrame = Global.Toolkit.getLocalHeadSf(Global.PlayerData.headimg);

        this.chooseHeadFrameIndex = parseInt(Global.PlayerData.headkuang) - 1;
        this.showHeadFrameIndex = this.chooseHeadFrameIndex;
        this.UpdateUI();
        this.UpdateVip();
    }

    private updateUserInfo() {
        for (let i = 0; i < Global.PlayerData.vip; i++) {
            var node = this.itemNodeArr[i];
            if (node) {
                var unlock = cc.find("unlock", node);
                unlock.active = false;
            }
        }
    }

}