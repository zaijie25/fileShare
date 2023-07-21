import WndBase, { DestoryType } from "../../../core/ui/WndBase";

export default class WndBackUpGame extends WndBase {

    protected onInit() {
        this.name = "WndBackUpGame";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/BackUpGameUI";
        this.destoryType = DestoryType.Now;
    }

    protected initView() {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("content/saveBtn", this.onBackUpGameBtn, this)
        this.addCommonClick("content/copyBtn", this.onCopyOfficalBtnClicked, this)
        this.addCommonClick('close',this.close,this)
    }

    private onBackUpGameBtn(){
        let url = Global.Setting.Urls.getBackUrl();
        cc.sys.openURL(url);
        this.close()
    }

    private onCopyOfficalBtnClicked()
    {
        Global.NativeEvent.copyTextToClipboard(Global.Setting.Urls.downLoadUrl, (retStr)=>{
            cc.log(retStr)
            if (retStr.result == 0) {
                Global.UI.fastTip("复制成功");

            }else {
                Global.UI.fastTip("复制失败");
            }
        } );
    }
}