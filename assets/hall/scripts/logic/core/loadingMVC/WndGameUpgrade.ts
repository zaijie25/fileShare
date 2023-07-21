import WndBase, { DestoryType } from "../ui/WndBase";


export default class WndGameUpgrade extends WndBase {

    protected onInit() {
        this.name = "WndGameUpgrade";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/LoadingScene/GameUpGradeUI";
        this.destoryType = DestoryType.None;
    }

    protected initView() {
        //this.addCommonClick("bg/close", this.onCloseClick, this);
       
    }


    

    onOpen()
    {
        if(this.commonBg)
        {
            this.commonBg.active = false
        }
    }
}