import ViewBase from "../../../../../core/ui/ViewBase";
import ExtractModel from "../../../../../hallcommon/model/ExtractModel";

export default class overseasBankWin extends ViewBase{
    private model : ExtractModel;

    private nameEditBox: cc.EditBox = null;
    private accountEditBox: cc.EditBox = null;

    private openBankLabel : cc.Label = null;
    private openBankTipNode : cc.Node = null;

    private chooseOverseasBankView : ChooseOverseasBankView;

    private icon : cc.Node;


    protected initView()
    {
        this.model = <ExtractModel>Global.ModelManager.getModel("ExtractModel");
        
        this.nameEditBox = this.getComponent("NameEditBox",cc.EditBox);
        this.accountEditBox = this.getComponent("AccountEditBox",cc.EditBox);
       

        this.openBankLabel = this.getComponent("OpeningbankBox/TEXT_LABEL",cc.Label);
        this.openBankTipNode = this.getChild("OpeningbankBox/PLACEHOLDER_LABEL")

        this.icon = this.getChild("OpeningbankBox/SelectBranch");
        this.chooseOverseasBankView = new ChooseOverseasBankView();
        this.chooseOverseasBankView.onSelect = this.selectBankFunc.bind(this);
        this.chooseOverseasBankView.setNode(this.getChild("chooseBank"));
        this.chooseOverseasBankView.active = false;

        this.updateChooseAreaView();
        this.addCommonClick("OpeningbankBox",()=>{ this.chooseOverseasBankView.active = true},this,null);

        this.addCommonClick("bandBtn",this.bandBtnFunc,this);
    }

    updateChooseAreaView(){
        this.chooseOverseasBankView.active = false;
       // this.icon.scaleY = this.switchKey ? 1 : -1;
    }

    SwitchLabelState(info:string) {
        Logger.log("选择了哪个银行",info);
        this.openBankLabel.string = info
        this.openBankLabel.node.active = true
        this.openBankTipNode.active = false
        this.chooseOverseasBankView.active = false;

    }

    selectBankFunc(info ){
        Global.Audio.playBtnSound();
        Logger.log("选择了啥",info)
        this.SwitchLabelState(info)
        this.updateChooseAreaView();
    }

    //发送绑定消息
    bandBtnFunc(){
        if(!this.checkTextEmptyAndShowTips(this.accountEditBox.string, "银行卡不能为空"))
            return;
        if(!this.checkTextEmptyAndShowTips(this.nameEditBox.string, "姓名不能为空"))
            return;
        if(!this.checkTextEmptyAndShowTips(this.openBankLabel.string, "请选择开户银行"))
            return;
        if(!this.checkSpecialCharAndShowTips(this.accountEditBox.string, " ", "账号中有非法字符，请重新输入"))
            return;
        Global.UI.show("WndOverseasBandConfirm",this.nameEditBox.string,this.accountEditBox.string,this.openBankLabel.string);
    }

    private checkTextEmptyAndShowTips(text:string, tipsLabel:string)
    {
        if(text.length <= 0)
        {
            Global.UI.fastTip(tipsLabel);
            return false;
        }
        return true;
    }

    /**
     * 检测字符串中是否包含某些特殊字符
     * @param text 要检测的字符串
     * @param specialString 特殊字符串
     * @param tipsLabel 检测如果包含则tip提示的字符串
     */
    private checkSpecialCharAndShowTips(text:string, specialString:string, tipsLabel:string)
    {
        for (let i = 0; i < text.length; i++) {
            let c = text.charAt(i);
            if (specialString.indexOf(c) >= 0) {
                Global.UI.fastTip(tipsLabel);
                return false;
            }
        }
        return true;
    }
}

class ChooseOverseasBankView extends ViewBase{
    protected model : ExtractModel;
    protected item:cc.Node;
    protected contentRoot:cc.Node;
    protected scroll:cc.ScrollView;
    protected itemList = [];
    protected comfirmBtn:cc.Node = null

    protected datas : any[];
    protected dataIndex:number = 0

    public onSelect:Function

    protected initView()
    {
        this.item = this.getChild("scrollview/view/content/item");
        this.item.active =false
        this.contentRoot = this.getChild("scrollview/view/content");
        this.scroll = this.getComponent("scrollview", cc.ScrollView);
        this.comfirmBtn = this.getChild("btnComfirm")
        this.comfirmBtn.on("click",this.onComfirmClick,this)
        this.model = <ExtractModel>Global.ModelManager.getModel("ExtractModel");
        this.addCommonClick("mask", ()=>{ this.active =false }, this, null);

        this.initItems()
    }

    protected onSubViewShow()
    {
        this.scroll.scrollToTop(0);
    }
    protected onComfirmClick()
    {
        if(this.datas[this.dataIndex])
        {
            let info = this.datas[this.dataIndex];
            if(this.onSelect)
                this.onSelect(info);
        }
    }

    protected initItems()
    {
        this.datas = this.model.getOverseasBankArray();

        for(let i = 0; i < this.datas.length; i++)
        {
            let info = this.datas[i];
            Logger.log("银行",info);
            let item = cc.instantiate(this.item);
            item.active = true;
            cc.find("checkToggle/Background/bankName",item).getComponent(cc.Label).string = info;
            cc.find("checkToggle/checkmark/bankName",item).getComponent(cc.Label).string = info;
            this.contentRoot.addChild(item);
            let tmpIndex = i
            let toggle = item.getChildByName("checkToggle").getComponent(cc.Toggle)
            item.on(cc.Node.EventType.TOUCH_END,()=>
            {
                toggle.isChecked = true
                this.onItemClick(tmpIndex);
            }, this)
            this.itemList.push(item);
        }
    }

    protected onItemClick(index)
    {
        this.dataIndex = index
    }

}