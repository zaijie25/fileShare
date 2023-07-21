import WndBase, { DestoryType } from "../../../core/ui/WndBase";
import PlayerInfoModel from "../../../hallcommon/model/PlayerInfoModel";
import VipView from "./VipView";
import VipViewUI from "./VipViewUI";

export default class WndVipRule extends WndBase {
   
    protected onInit() {
        this.name = "WndVipRule";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/vipRule";
        // this.destoryType = DestoryType.ChangeScene;
    }

    onDispose() {
      
    }

    /**
     * 初始化UI
     */
    protected initView() {
        this.addCommonClick("close",this.close,this)
       
    }

    /**
     * 界面打开回调
     */
    protected onOpen() {
       
        
        
    }

   
}

