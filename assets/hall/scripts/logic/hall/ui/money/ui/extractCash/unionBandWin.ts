

import ViewBase from "../../../../../core/ui/ViewBase";
import ExtractModel from "../../../../../hallcommon/model/ExtractModel";
import PoolBase from "../../../../../core/tool/PoolBase";

export default class unionBandWin extends ViewBase {

    private model : ExtractModel;

    private nameEditBox: cc.EditBox = null;
    private accountEditBox: cc.EditBox = null;
    private bankbranchEditBox: cc.EditBox = null;
    private openBankLabel : cc.Label = null;
    private openBankTipNode : cc.Node = null;

    private openProvinceLabel:cc.Label = null
    private openProvinceTipNode:cc.Node = null

    private openCityLabel:cc.Label = null
    private openCityTipNode:cc.Node = null

    public banklocationInfo :any = null

    public provinceCode:number = 100000

    private chooseBankView : ChooseBankView;

    private chooseProvinceView:ChooseProvinceView
    
    private chooseCityView:ChooseCityView

    private cityBg:cc.Sprite

    private bankInfo:{[key:number]:any} = {}
    private icon : cc.Node;

    private switchKey : boolean;

    protected initView()
    {
        this.model = <ExtractModel>Global.ModelManager.getModel("ExtractModel");
        
        this.nameEditBox = this.getComponent("NameEditBox",cc.EditBox);
        this.accountEditBox = this.getComponent("AccountEditBox",cc.EditBox);
        this.bankbranchEditBox = this.getComponent("BankbranchEditBox",cc.EditBox);

        this.openBankLabel = this.getComponent("OpeningbankBox/TEXT_LABEL",cc.Label);
        this.openBankTipNode = this.getChild("OpeningbankBox/PLACEHOLDER_LABEL");

        this.openProvinceLabel = this.getComponent("adapt/ProvinceEditBox/TEXT_LABEL",cc.Label);
        this.openProvinceTipNode = this.getChild("adapt/ProvinceEditBox/PLACEHOLDER_LABEL");

        this.openCityLabel = this.getComponent("adapt/CityEditBox/TEXT_LABEL",cc.Label);
        this.openCityTipNode = this.getChild("adapt/CityEditBox/PLACEHOLDER_LABEL");

        this.cityBg = this.getChild("adapt/CityEditBox/BACKGROUND_SPRITE").getComponent(cc.Sprite)


        this.banklocationInfo = Global.ResourceManager.getRes("hall/config/location", cc.JsonAsset).json;
        this.model.BankLocationInfo = this.banklocationInfo
        this.icon = this.getChild("OpeningbankBox/SelectBranch");
        this.chooseBankView = new ChooseBankView();
        this.chooseBankView.onSelect = this.selectBankFunc.bind(this);
        this.chooseBankView.setNode(this.getChild("chooseBank"));
        this.chooseBankView.subViewState = false;


        this.chooseProvinceView = new ChooseProvinceView();
        this.chooseProvinceView.onSelect = this.selectBankFunc.bind(this);
        this.chooseProvinceView.setNode(this.getChild("chooseProvince"));
        this.chooseProvinceView.subViewState = false;


        this.chooseCityView = new ChooseCityView();
        this.chooseCityView.onSelect = this.selectBankFunc.bind(this);
        this.chooseCityView.setNode(this.getChild("chooseCity"));
        this.chooseCityView.subViewState = false;
        
        
        




       // this.addCommonClick("chooseBank/mask_button",this.switchChooseAreaView,this);

        this.switchKey = false;
        this.updateChooseAreaView();
        this.addCommonClick("OpeningbankBox",()=>{ this.chooseBankView.onSubViewShow()},this,null);
        this.addCommonClick("adapt/ProvinceEditBox",()=>{ this.chooseProvinceView.onSubViewShow()},this,null);
        this.addCommonClick("adapt/CityEditBox",this.openCityView,this,null);

        this.addCommonClick("bandBtn",this.bandBtnFunc,this);
    }

    SetCityContentState(flag: boolean) {
        this.cityBg.node.color = flag?cc.color(255,255,255,255):cc.color(150,150,150,150)
    }

    openCityView()
    {
        if(this.openProvinceLabel.string)
        {
            this.chooseCityView.onSubViewShow()
        }
       
    }
   

    public onSubViewShow(){
        this.openBankLabel.string = "";
        this.openBankTipNode.active = true;
        this.SetCityContentState(false)
    }

    public onSubViewHide(){
        this.openBankLabel.string = ""
        this.openCityLabel.string = ""
        this.openProvinceLabel.string = ""
        this.provinceCode = 100000
        this.nameEditBox.string = ""
        this.accountEditBox.string = ""
        this.bankbranchEditBox.string = ""
        this.openBankTipNode.active = true
        this.openCityTipNode.active = true
        this.openProvinceTipNode.active = true
        // this.chooseBankView.active = false
        // this.chooseCityView.active = false
        // this.chooseProvinceView.active = false
    }

    updateChooseAreaView(){
        this.chooseBankView.subViewState = false;
       // this.icon.scaleY = this.switchKey ? 1 : -1;
    }

    switchChooseAreaView(){
        this.chooseBankView.subViewState = true
        //this.openBankTipNode.active =true
    }

    selectBankFunc( key,info ){
        Global.Audio.playBtnSound();
        this.SwitchLabelState(key,info)
        this.updateChooseAreaView();
    }
    SwitchLabelState(key: BankInfoType,info:string) {
        switch (key) {
            case BankInfoType.BankName:
                this.openBankLabel.string = info
                this.openBankLabel.node.active = true
                this.openBankTipNode.active = false
                this.chooseBankView.active = false;
                break;
            case BankInfoType.Province:
                this.openProvinceLabel.string = info
                this.openProvinceLabel.node.active = true
                this.openProvinceTipNode.active = false
                this.chooseProvinceView.active = false;
                this.openCityLabel.node.active = false
                this.openCityTipNode.active = true
                this.SetCityContentState(true)
                break;
            case BankInfoType.City:
                this.openCityLabel.string = info
                this.openCityLabel.node.active = true
                this.openCityTipNode.active = false
                this.chooseCityView.active = false
                break;
            default:
                break;
        }

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

    //发送绑定消息
    bandBtnFunc(){
        if(!this.checkTextEmptyAndShowTips(this.accountEditBox.string, "银行卡不能为空"))
            return;
        if(!this.checkTextEmptyAndShowTips(this.nameEditBox.string, "姓名不能为空"))
            return;
        if(!this.checkTextEmptyAndShowTips(this.openBankLabel.string, "请选择开户银行"))
            return;
        if(!this.checkTextEmptyAndShowTips(this.openProvinceLabel.string, "请选择开户省份"))
            return;
        if(!this.checkTextEmptyAndShowTips(this.openCityLabel.string, "请选择开户城市"))
            return;
        if(!this.checkSpecialCharAndShowTips(this.accountEditBox.string, " ", "账号中有非法字符，请重新输入"))
            return;
        if(!this.checkTextEmptyAndShowTips(this.bankbranchEditBox.string, "开户支行不能为空"))
            return
        Global.UI.show("WndUnionBandConfirm",this.nameEditBox.string,this.accountEditBox.string,this.bankbranchEditBox.string,this.openBankLabel.string,this.openProvinceLabel.string
        ,this.openCityLabel.string,this.model.getBankCoke(this.openBankLabel.string),);
    }
}

export enum BankInfoType
{
    BankName = 1,
    Province = 2,
    City = 3
}

class ChooseBankView extends ViewBase
{
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

    public onSubViewShow()
    {
        this.active = true
        this.scroll.scrollToTop(0);
    }
    protected onComfirmClick()
    {
        if(this.datas[this.dataIndex])
        {
            let info = this.datas[this.dataIndex];
            if(this.onSelect)
                this.onSelect(BankInfoType.BankName,info);
        }
    }

    protected initItems()
    {
        this.datas = this.model.getBankArray();
        

        for(let i = 0; i < this.datas.length; i++)
        {
            let info = this.datas[i];
            let item = cc.instantiate(this.item);
            item.active = true;
            /* let numLabel = item.getChildByName("bankName").getComponent(cc.Label);
            numLabel.string = info;  */
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

class ChooseProvinceView extends ChooseBankView
{


    protected onComfirmClick()
    {
        if(this.datas[this.dataIndex])
        {
            let info = this.datas[this.dataIndex];
            if(this.onSelect)
                this.onSelect(BankInfoType.Province,info.name);
        }
    }

    public onSubViewShow()
    {
        super.onSubViewShow()
        this.dataIndex = this.model.DefautProvinceCode
    }

    protected initItems()
    {
        this.datas = this.model.BankLocationInfo;

        for (const id in this.datas) {
            if (this.datas.hasOwnProperty(id)) {

                let info = this.datas[id].name;
                let item = cc.instantiate(this.item);
                item.active = true;
                /* let numLabel = item.getChildByName("bankName").getComponent(cc.Label);
                numLabel.string = info; */
                cc.find("checkToggle/Background/bankName",item).getComponent(cc.Label).string = info;
                cc.find("checkToggle/checkmark/bankName",item).getComponent(cc.Label).string = info;
                this.contentRoot.addChild(item);
                let tmpIndex = id
                let toggle = item.getChildByName("checkToggle").getComponent(cc.Toggle)
                item.on(cc.Node.EventType.TOUCH_END, () => {
                    toggle.isChecked = true
                    this.onItemClick(tmpIndex);
                }, this)
                this.itemList.push(item);
            }
        }
       
    }
    protected onItemClick(index)
    {
        super.onItemClick(index)
        this.model.DefautProvinceCode = index
    }

   
}

class ChooseCityView extends ChooseBankView
{
    private ProvinceIndex:any;
    private itemTable = []
    itemPool: CityItemPool;

    protected onComfirmClick()
    {
        if(this.datas[this.ProvinceIndex])
        {
            let info = this.datas[this.ProvinceIndex].city[this.dataIndex];
            if(this.onSelect)
                this.onSelect(BankInfoType.City,info.name);
        }
    }

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
        this.initItemPool();

    }


    private initItemPool() {

        this.itemPool = new CityItemPool(this.item);
    }

    public onSubViewShow(args?)
    {
        super.onSubViewShow()
        this.ProvinceIndex = this.model.DefautProvinceCode
        this.dataIndex = parseInt(this.model.GetDefautCityCode(this.ProvinceIndex),10)
        this.initItems()
    }
    protected onSubViewHide()
    {
    }
    protected initItems()
    {
        this.recycle()
        this.datas = this.model.BankLocationInfo;
        if (this.datas.hasOwnProperty(this.ProvinceIndex)) {
            for (const id in this.datas[this.ProvinceIndex].city) {
                let info = this.datas[this.ProvinceIndex].city[id].name;
                let item = this.itemPool.getItem()
                item.active = true;
                /* let numLabel = item.getChildByName("bankName").getComponent(cc.Label);
                numLabel.string = info; */
                cc.find("checkToggle/Background/bankName",item).getComponent(cc.Label).string = info;
                cc.find("checkToggle/checkmark/bankName",item).getComponent(cc.Label).string = info;
                this.contentRoot.addChild(item);
                let tmpIndex = id
                let toggle = item.getChildByName("checkToggle").getComponent(cc.Toggle)
                item.on(cc.Node.EventType.TOUCH_END, () => {
                    toggle.isChecked = true
                    this.onItemClick(tmpIndex);
                }, this)
                this.itemTable.push(item);
            }
        }
        
    }
    
    public recycle()
    {
        this.itemPool.recycleAll(this.itemTable);
        this.itemTable = [];
    }
    protected onDispose() {

        this.itemPool.resetPool();
        this.itemTable = [];
    }
}
class CityItemPool extends PoolBase {
    constructor(private copyNode: cc.Node) {
        super();
    }

    protected createItem() {
        return cc.instantiate(this.copyNode);
    }

    protected resetItem(node: cc.Node) {
        node.active = false;
        node.setParent(null)
    }
    public recycleAll(arr: Array<any>) {
        super.recycleAll(arr)
        arr.forEach(ele => {
            this.resetItem(ele);
        });

    }
}
