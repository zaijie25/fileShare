// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { CBCDecryptor } from "../../../../../framework/libs/cryptoTs/mode/CBCDecryptor";
import { RedPackState } from "./WndSpreadGiftActivityView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SpreadGiftItemView extends cc.Component {

    @property([cc.Node])
    nodeArr: cc.Node[] = [];

    @property(cc.Node)
    lightNode: cc.Node = null;

    @property(cc.Label)
    achievedLabel: cc.Label = null;

    @property(cc.Label)
    normalLabel: cc.Label = null;


    @property(cc.Label)
    personNumLabel: cc.Label = null;
    @property(cc.Label)
    achievedPersonNumLabel: cc.Label = null;

    RefreshState(state: RedPackState, data) {
        let btn = this.node.getComponent(cc.Button)
        switch (state) {
            case RedPackState.Normal:
                this.nodeArr[0].active = true
                this.nodeArr[1].active = false
                this.lightNode.active = false
                this.normalLabel.string = cc.js.formatStr("%s元", Global.Toolkit.formatPointStr(data.point))
                this.achievedLabel.string = cc.js.formatStr("%s元", Global.Toolkit.formatPointStr(data.point))
                this.personNumLabel.string = cc.js.formatStr("%s人", data.num)
                this. achievedPersonNumLabel.string = cc.js.formatStr("%s人", data.num)

                if (btn) {
                    btn.interactable = false
                }
                break;
            case RedPackState.HightLight:
                this.nodeArr[0].active = true
                this.nodeArr[1].active = false
                this.lightNode.active = true
                this.normalLabel.string = cc.js.formatStr("%s元", Global.Toolkit.formatPointStr(data.point))
                this.achievedLabel.string = cc.js.formatStr("%s元", Global.Toolkit.formatPointStr(data.point))
                this.personNumLabel.string = cc.js.formatStr("%s人", data.num)
                this. achievedPersonNumLabel.string = cc.js.formatStr("%s人", data.num)
                if (btn) {
                    btn.interactable = true
                }
                break;
            case RedPackState.Open:
                this.nodeArr[0].active = false
                this.nodeArr[1].active = true
                this.lightNode.active = false
                if (btn) {
                    btn.interactable = false
                }
                break;


            default:
                break;
        }

    }

}
