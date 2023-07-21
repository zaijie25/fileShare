import PlayerInfoModel from "../../../hallcommon/model/PlayerInfoModel";
import VipPrivilegeViewItem from "./VipPrivilegeViewItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class VipPrivilegeView extends cc.Component {


    iconSprite: cc.Sprite = null

    level: cc.Label = null

    itemList: Array<cc.Node> = [];

    /**
    * 当前页的vip等级下的特权文本
    */
    labelTequanArr: cc.Label[] = [];


    initView() {
        this.iconSprite = cc.find("info_node/icon_vip", this.node).getComponent(cc.Sprite)

        this.level = cc.find("info_node/level", this.node).getComponent(cc.Label)

        for (let index = 0; index < 4; index++) {
            let node = cc.find(`layout/item_${index}`, this.node)
            if (cc.isValid(node)) {
                this.itemList.push(node)
            }
            if (index < 3) {
                node.active = false
            }

        }

        for (var i = 0; i < 4; i++) {
            this.labelTequanArr[i] = cc.find("viptips/tip_" + (i + 1), this.node).getComponent(cc.Label);
            this.labelTequanArr[i].node.active = false;
        }
    }


    refreshUI(data, index, vip) {
        

        var myVip = Global.PlayerData.vip;
        var leftVip = vip - 1;
        var rightVip = vip;
        var toVip = myVip + 1;
        if (myVip < rightVip) {
            leftVip = myVip;
            toVip = rightVip;
        }

        var atlasString = "hall/texture/hall/vip_auto_atlas/vip_auto_atlas";
        var sfString0 = "img_viptb_" + rightVip;
        Global.ResourceManager.loadAutoAtlas(this.iconSprite, atlasString, sfString0, null, false);

        if (rightVip < 10) {
            this.labelTequanArr[0].string = "活动可领取更多奖励";
            this.labelTequanArr[0].node.active = true;
            this.labelTequanArr[1].string = "专属在线客服，24小时服务";
            this.labelTequanArr[1].node.active = true;
            this.labelTequanArr[2].string = "专属捕鱼炮台，捕鱼更加激情";
            this.labelTequanArr[2].node.active = true;
            
        } else {
            this.labelTequanArr[0].string = "活动可领取更多奖励";
            this.labelTequanArr[0].node.active = true;
            this.labelTequanArr[1].string = "专属在线客服，24小时服务";
            this.labelTequanArr[1].node.active = true;
            this.labelTequanArr[2].string = "专属捕鱼炮台，捕鱼更激情";
            this.labelTequanArr[2].node.active = true;
            this.labelTequanArr[3].string = "VIP专享表情，互动更炫丽";
            this.labelTequanArr[3].node.active = true;
        }



        if (PlayerInfoModel.instance.vipSubsidy != null && PlayerInfoModel.instance.vipSubsidyStatus == 1) {
            let subsidy = PlayerInfoModel.instance.vipSubsidy[rightVip]
            if(subsidy){
                this.labelTequanArr[0].string = "每日可领转运金" + subsidy.times + "次";
            }
            
        }

        this.level.string = `VIP${rightVip}`

        // if (rightVip > 9) {
        //     this.richTextArr[1].string = "<b>V" + rightVip + "专属表情</b>";
        //     var sfPaotai = "biaoqing_" + rightVip;
        //     Global.ResourceManager.loadAutoAtlas(this.spriteIconArr[1], atlasString, sfPaotai, null, false);
        // }
        // else {
        //     this.richTextArr[1].string = "<b>V" + rightVip + "捕鱼炮台</b>";
        //     var sfPaotai = "paotai_" + rightVip;
        //     Global.ResourceManager.loadAutoAtlas(this.spriteIconArr[1], atlasString, sfPaotai, null, false);
        // }
        if (rightVip <= 8) {
            for (let index = 0; index < this.itemList.length - 2; index++) {
                let item = this.itemList[index];
                if (item) {
                    item.getComponent(VipPrivilegeViewItem).refreshUI(index, rightVip)
                    item.active = true
                }

            }
        }
        else if (rightVip == 9) {
            for (let index = 0; index < this.itemList.length - 2; index++) {
                let item = this.itemList[index];
                if (item) {
                    item.getComponent(VipPrivilegeViewItem).refreshUI(index, rightVip)
                    item.active = true
                }

            }

            let item = this.itemList[2];
            if (item) {
                item.getComponent(VipPrivilegeViewItem).refreshUI(3, rightVip)
                item.active = true
            }

        }

        else if (rightVip > 9 && rightVip <= 13) {
            let type = 0
            for (let index = 0; index < this.itemList.length - 2; index++) {
                let item = this.itemList[index];
                if (item) {
                    item.getComponent(VipPrivilegeViewItem).refreshUI(type, rightVip)
                    item.active = true
                }

                type += 2
            }
            let item = this.itemList[2];
            if (item) {
                item.getComponent(VipPrivilegeViewItem).refreshUI(3, rightVip)
                item.active = true
            }

        }
        else {
            let type = 0
            for (let index = 0; index < this.itemList.length - 2; index++) {
                let item = this.itemList[index];
                if (item) {
                    item.getComponent(VipPrivilegeViewItem).refreshUI(type, rightVip)
                    item.active = true
                }
                type += 2

            }

            let item = this.itemList[2];
            if (item) {
                item.getComponent(VipPrivilegeViewItem).refreshUI(3, rightVip)
                item.active = true
            }
        }



    }


}

export enum PrivilegeType {
    HeadKuang = 0,
    PaoTai = 1,
    BiaoQing = 2,
    Kefu = 3
}