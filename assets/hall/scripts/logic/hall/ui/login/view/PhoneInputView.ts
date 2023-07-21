import ViewBase from "../../../../core/ui/ViewBase";
import { ListView } from "../../../../../listview";
export default class PhoneInputView extends ViewBase
{

    private areaInput:cc.EditBox;
    private codeIcon:cc.Sprite;
    private phoneInput:cc.EditBox;

    private countryLabel:cc.Label;

    private showAreaView = false;

    private chooseCountryView:ChooseCountryView;


    protected initView()
    {
        this.codeIcon = this.getComponent("codeIcon", cc.Sprite);
        this.phoneInput = this.getComponent("phone", cc.EditBox);
        this.areaInput = this.getComponent("area", cc.EditBox);
        this.countryLabel = this.getComponent("countryName", cc.Label);
        // this.addCommonClick("bg4", this.onCodeIconClick, this, null);
        // this.addCommonClick("codeIcon", this.onCodeIconClick, this, null);
        // this.addCommonClick("chooseAreaView/mask", this.onCodeIconClick, this, null);
        this.chooseCountryView = new ChooseCountryView();
        this.chooseCountryView.onSelect = this.selectCountry.bind(this);
        this.chooseCountryView.setNode(this.getChild("chooseAreaView"));
        this.chooseCountryView.subViewState = false;

        this.areaInput.node.on("editing-did-ended", this.onAreaEditEnd, this);


    }


    private onAreaEditEnd()
    {
        this.countryLabel.string = this.chooseCountryView.searchArea(this.areaInput.string);
    }

    private onCodeIconClick()
    {
        this.showAreaView = !this.showAreaView;
        this.updateCodeState();
    }

    private updateCodeState()
    {
        this.chooseCountryView.active = this.showAreaView;
        this.codeIcon.node.angle = this.showAreaView ? -180 : 0
    }

    private selectCountry(code, name)
    {
        this.areaInput.string = code;
        this.countryLabel.string = name;
        this.onCodeIconClick();
    }

    public set phone(value)
    {
        this.phoneInput.string = value;
    }

    public get phone()
    {
        return this.phoneInput.string;
    }
    
    public set area(value)
    {
        this.areaInput.string = value;
        this.countryLabel.string = this.chooseCountryView.searchArea(value);
    }
    public get area()
    {
        return this.areaInput.string;
    }

    protected onSubViewShow()
    {
        this.chooseCountryView.onSubViewShow();
        this.showAreaView = false;
        this.updateCodeState();
    }

    public isAreaVaild()
    {
        return this.chooseCountryView.isAreaVaild(this.area);
    }
}


class ChooseCountryView extends ViewBase
{
    private item:cc.Node;
    private contentRoot:cc.Node;
    private scroll:cc.ScrollView;
    private itemList = [];
    private countryCfg:any
    private listView:ListView;

    public onSelect:Function

    protected initView()
    {
        this.item = this.getChild("scroll/view/content/item");
        this.contentRoot = this.getChild("scroll/view/content");
        this.item.active = false;

        this.scroll = this.getComponent("scroll", cc.ScrollView);

        this.countryCfg = Global.ResourceManager.getRes("hall/config/countrycode", cc.JsonAsset).json;

        let listParam:any = {}
        listParam.scrollview = this.scroll;
        listParam.mask  = this.getChild("scroll/view");
        listParam.content = this.getChild("scroll/view/content");
        listParam.item_tpl = this.getChild("scroll/view/content/item");
        listParam.direction = 1;
        listParam.item_setter = (item, data, index) =>
        {
            let info = this.countryCfg[index];
            let numLabel = item.getChildByName("code").getComponent(cc.Label);
            let countryLabel = item.getChildByName("country").getComponent(cc.Label);
            numLabel.string = info.phone_code; 
            countryLabel.string = info.cn;
        };

        listParam.select_cb = (data, index)=>
        {
            let info = this.countryCfg[index];
            if(this.onSelect)
                this.onSelect(info.phone_code.replace("+", ""), info.cn);
        }
        this.listView = new ListView(listParam);
        this.listView.set_data(this.countryCfg);


        // this.contentRoot.height = this.item.height * this.countryCfg.length;
        // this.initItems()

    }

    public onSubViewShow()
    {
        this.scroll.scrollToTop(0);
        this.listView.set_data(this.countryCfg);
    }

    private initItems()
    {
        for(let i = 0; i < this.countryCfg.length; i++)
        {
            let info = this.countryCfg[i];
            let item = cc.instantiate(this.item);
            item.active = true;
            let numLabel = item.getChildByName("code").getComponent(cc.Label);
            let countryLabel = item.getChildByName("country").getComponent(cc.Label);
            numLabel.string = info.phone_code; 
            countryLabel.string = info.cn;
            this.contentRoot.addChild(item);
            let tmpIndex = i
            item.on(cc.Node.EventType.TOUCH_END,()=>
            {
                this.onItemClick(tmpIndex);
            }, this)
            this.itemList.push(item);
        }
    }

    private onItemClick(index)
    {
        if(this.countryCfg[index])
        {
            let info = this.countryCfg[index];
            if(this.onSelect)
                this.onSelect(info.phone_code.replace("+", ""), info.cn);
        }
    }

    public searchArea(areacode)
    {
        if(areacode == "")
            return "请从列表中选择";
        let code = "+" + areacode;
        for(let i = 0; i < this.countryCfg.length; i++)
        {
            if(this.countryCfg[i].phone_code == code)
            {
                return this.countryCfg[i].cn;
            }
        }
        return "国家/地区代码无效"
    }

    public isAreaVaild(areacode)
    {
        if(areacode == "")
            return false;
        let code = "+" + areacode;
        for(let i = 0; i < this.countryCfg.length; i++)
        {
            if(this.countryCfg[i].phone_code == code)
            {
                return true;
            }
        }
        return false
    }



}