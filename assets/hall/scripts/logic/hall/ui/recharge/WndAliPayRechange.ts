import WndBase, { DestoryType } from "../../../core/ui/WndBase";

export default class WndAliPayRechange extends WndBase {
    private nameLabel: cc.Label;
    private numberLabel: cc.Label;
    private bankNameLabel: cc.Label;
    private addresLabel: cc.Label;
    protected onInit() {
        this.name = "WndAliPayRechange";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/AliPayRechargeUI";
        this.destoryType = DestoryType.None;
    }
    protected initView() {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.nameLabel = this.getChild("bankNode/nameLabel").getComponent(cc.Label);
        this.numberLabel = this.getChild("bankNode/numberLabel").getComponent(cc.Label);
        this.bankNameLabel = this.getChild("bankNode/bankNameLabel").getComponent(cc.Label);
        this.addresLabel = this.getChild("bankNode/addresLabel").getComponent(cc.Label);
        // this.bgNode.node.active = false;
        // this.imageNode.spriteFrame = null;
        this.addCommonClick("headNode/btnBack", this.goBack, this,cc.Button.Transition.NONE);
        this.addCommonClick("headNode/helpNode", this.goBack, this,cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/nameLabel/copyNode", this.copyName, this,cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/numberLabel/copyNode", this.copyNumber, this,cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/bankNameLabel/copyNode", this.copyBankName, this,cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/addresLabel/copyNode", this.copyAddres, this,cc.Button.Transition.NONE);
    }
    onOpen(){
        let data = this.args[0];
        this.nameLabel.string       = data['account']   //支付宝账号
        this.addresLabel.string     = data['name']      //支付宝姓名
        // this.numberLabel.string     = data['bank_zhi']  //支付宝姓
        // this.bankNameLabel.string   = data['bank_type'] //支付宝名

    }
    private goBack() {
        this.close();
    }
    
    private copyName() {
        Global.NativeEvent.copyTextToClipboard(String(this.nameLabel.string), this.copyTextToClipboardCallBack.bind(this) );
    }
    private copyNumber() {
        Global.NativeEvent.copyTextToClipboard(String(this.numberLabel.string), this.copyTextToClipboardCallBack.bind(this) );
    }
    private copyBankName() {
        Global.NativeEvent.copyTextToClipboard(String(this.bankNameLabel.string), this.copyTextToClipboardCallBack.bind(this) );
    }
    private copyAddres() {
        Global.NativeEvent.copyTextToClipboard(String(this.addresLabel.string), this.copyTextToClipboardCallBack.bind(this) );
    }
    /**
     * 复制回调
     * @param retStr 
     */
    private copyTextToClipboardCallBack(retStr){
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
        }else {
            Global.UI.fastTip("复制失败");
        }
    }
}