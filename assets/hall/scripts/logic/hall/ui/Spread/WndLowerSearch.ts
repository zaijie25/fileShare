import WndBase from "../../../core/ui/WndBase";
import SpreadModel from "../../../hallcommon/model/SpreadModel";
import { NetAppface } from "../../../core/net/hall/NetEvent";

export default class WndLowerSearch extends WndBase {
    IDLabel: cc.Label
    NickNameLabel: cc.Label
    RecommendLabel: cc.Label
    LastLoginTime: cc.Label
    PlayerLevel: cc.Label
    /** 团队税收，直属业绩*/
    PlayerTax: cc.Label
    /** 个人税收，下属业绩*/
    GroupTax: cc.Label
    GroupCount: cc.Label
    SpreadModel: SpreadModel
    /** 团队，直属业绩*/
    lab1:cc.RichText;
    /** 个人，下属业绩*/
    lab2:cc.RichText;



    protected onInit() {
        this.name = "WndLowerSearch";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/SpreadUI/LowerPer";
        this.SpreadModel = <SpreadModel>Global.ModelManager.getModel("SpreadModel");
    }

    protected initView() {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.IDLabel = this.getChild("Content/IDLabel/ID").getComponent(cc.Label)
        this.NickNameLabel = this.getChild("Content/NameLabel/Name").getComponent(cc.Label)
        this.RecommendLabel = this.getChild("Content/RecommendLabel/ID").getComponent(cc.Label)
        this.LastLoginTime = this.getChild("Panel/LastLoginTime").getComponent(cc.Label)
        this.PlayerLevel = this.getChild("Panel/PlayerLevel/Count").getComponent(cc.Label)
        this.PlayerTax = this.getChild("Panel/PlayerTax/Count").getComponent(cc.Label)
        this.GroupCount = this.getChild("Panel/GroupCount/Count").getComponent(cc.Label)
        this.GroupTax = this.getChild("Panel/GroupTax/Count").getComponent(cc.Label)
        this.lab1 = this.getChild("Panel/PlayerTax").getComponent(cc.RichText)
        this.lab2 = this.getChild("Panel/GroupTax").getComponent(cc.RichText)
        this.addCommonClick("close", this.close, this)
    }

    protected onOpen(data) {
        this.initPanel(data)


    }

    /*
    ```
{
    "_mod": "appface",
    "_func": "GetFlowInfoList",
    "_check": "",
    "_param": {
		"user_id":222
		"name":222
		"list":{
				"time":"11221"
			"total_flow":总业绩
			"unter_flow":直属业绩
			"team_flow":代理业绩
		}
    }
}*/
    initPanel(args) {
        if (args != null) {
            let data = args[0]

            this.NickNameLabel.string = data.name + "（ID" + data.user_id + "）"
            this.RecommendLabel.string = data.pid

            this.LastLoginTime.string = "最后登录时间:" + cc.js.formatStr(data.last_login)

            this.PlayerLevel.string = data.level
            this.lab1.string = "直属业绩："
            this.lab2.string = "下属业绩："
            this.PlayerTax.string = Global.Toolkit.formatPointStr(data.flow)
            this.GroupTax.string = Global.Toolkit.formatPointStr(data.team_flow)
            this.GroupCount.string = data.team_num

        }
        else {
            this.NickNameLabel.string = "";
            this.RecommendLabel.string = "";
            this.LastLoginTime.string = ""
            this.PlayerLevel.string = ""
            this.PlayerTax.string = ""
            this.GroupTax.string = ""
            this.GroupCount.string = ""
        }
    }

    GetText(num: any) {
        let txt;
        if (num > 10000) {
            txt = (num / 10000).toFixed(2) + "W"
        }
        else {
            txt = num
        }
        return txt
    }
    protected onClose() {

    }
}
