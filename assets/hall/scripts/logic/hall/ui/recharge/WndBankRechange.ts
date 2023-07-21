import WndBase, { DestoryType } from "../../../core/ui/WndBase";

export default class WndBankRechange extends WndBase {
    private nameLabel: cc.Label;
    private numberLabel: cc.Label;
    private bankNameLabel: cc.Label;
    private tipsLabel: cc.Label;

    private titleLabel: cc.Label;
    private iconSprite: cc.Sprite;
    private tipNode: cc.Node;
    private bankNode: cc.Node;
    private textNode: cc.Node;
    private textLabel: cc.Label;
    private bg: cc.Node;
    private colorString= {
        1000:"#478CF6",
        1001:"#14AE58",
        1002:"#EAB429",
    };
    protected onInit() {
        this.name = "WndBankRechange";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/BankRechangeUI";
        this.destoryType = DestoryType.None;
    }
    protected initView() {
        this.node.width     = cc.Canvas.instance.node.width;
        this.node.height    = cc.Canvas.instance.node.height;
        this.bg             = this.getChild("bg");
        this.tipNode        = this.getChild("tipNode");
        this.bankNode       = this.getChild("bankNode");
        this.textNode       = this.getChild("bankNode/textNode");
        this.titleLabel     = this.getChild("bankNode/titleLabel").getComponent(cc.Label);
        this.iconSprite     = this.getChild("bankNode/iconSprite").getComponent(cc.Sprite);
        this.nameLabel      = this.getChild("bankNode/textNode/nameLabel").getComponent(cc.Label);
        this.numberLabel    = this.getChild("bankNode/textNode/numberLabel").getComponent(cc.Label);
        this.bankNameLabel  = this.getChild("bankNode/textNode/bankNameLabel").getComponent(cc.Label);
        this.textLabel    = this.getChild("bankNode/textLabel").getComponent(cc.Label);
        this.tipsLabel      = this.getChild("tipNode/tips/tipsLabel").getComponent(cc.Label);
        this.addCommonClick("headNode/btnBack", this.goBack, this,cc.Button.Transition.NONE);
        this.addCommonClick("headNode/helpNode", this.goBack, this,cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/textNode/nameLabel/copyNode", this.copyName, this,cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/textNode/numberLabel/copyNode", this.copyNumber, this,cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/textNode/bankNameLabel/copyNode", this.copyBankName, this,cc.Button.Transition.NONE);
        // this.addCommonClick("bankNode/addresLabel/copyNode", this.copyAddres, this,cc.Button.Transition.NONE);
    }
    onOpen(){
        // 392
        let data = this.args[0];
        let colorStr = this.colorString[data.pay_type];
        this.bg.color =  new cc.Color().fromHEX(colorStr);
        this.nameLabel.string       = data['name']      //银行卡姓名
        this.numberLabel.string     = data['account']   //银行卡卡号
        this.bankNameLabel.string   = data['bank_type'] //银行名称
        // this.addresLabel.string     = data['bank_zhi']  //支行名称
        this.tipsLabel.string       = data['tips']      //温馨提示

        this.updateUI(data);
    }
    //更新界面
    private updateUI(data){
        let tipWidget = this.tipNode.getComponent(cc.Widget);
        if(data.pay_type == "1002"){
            this.bankNode.height = 310
            tipWidget.top = 530;
            this.textNode.y = -180;
            this.textLabel.node.active = true;
        }else{
            this.bankNode.height = 270
            tipWidget.top = 490;
            this.textNode.y = -130;
            this.textLabel.node.active = false;
        }
        tipWidget.updateAlignment();

        if(data.pay_type == "1000"){
            this.titleLabel.string = "支付宝银行卡转账";
            Global.ResourceManager.loadAutoAtlas(this.iconSprite,"hall/texture/hall/chat/chat", "f_35", null, false);
            this.iconSprite.node.x = -110
        }else if(data.pay_type == "1001"){
            this.titleLabel.string = "微信银行卡转账";
            Global.ResourceManager.loadAutoAtlas(this.iconSprite,"hall/texture/hall/chat/chat", "f_36", null, false);
            this.iconSprite.node.x = -100
        }else{
            this.titleLabel.string = "银行卡收款";
            Global.ResourceManager.loadAutoAtlas(this.iconSprite,"hall/texture/hall/chat/chat", "f_34", null, false);
            this.iconSprite.node.x = -70
        }

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
    // private copyAddres() {
    //     Global.NativeEvent.copyTextToClipboard(String(this.addresLabel.string), this.copyTextToClipboardCallBack.bind(this) );
    // }
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