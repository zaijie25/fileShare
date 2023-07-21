import WndBase from "../../../../../core/ui/WndBase";
import ExtractModel from "../../../../../hallcommon/model/ExtractModel";
import { ExtractEvent } from "./ExtractEvent";


export default class WndUnionBandConfirm extends WndBase {

    private model : ExtractModel;
    
    private nameLabel : cc.Label;
    private accountLabel : cc.Label;
    private bankbranchLabel : cc.Label;
    private openBankLabel : cc.Label;
    private PrivinceLabel:cc.Label
    private CityLabel:cc.Label

    private nameData : string;
    private accountData : string;
    private bankbranchData : string;
    private openBankData : string;
    private provinceData:string
    private cityData:string
    private bankCode:string


    protected onInit()
    {
        this.name = "WndUnionBandConfirm";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/extractCash/unionBandConfirmUI";
    }

    protected initView()
    {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.model = <ExtractModel>Global.ModelManager.getModel("ExtractModel");
        this.nameLabel = this.getComponent("NameLabel",cc.Label);
        this.accountLabel = this.getComponent("AccountLabel",cc.Label);
        this.bankbranchLabel = this.getComponent("BankbranchLabel",cc.Label);
        this.openBankLabel = this.getComponent("OpenBankLabel",cc.Label);
        this.PrivinceLabel = this.getComponent("ProvinceLabel",cc.Label)
        this.CityLabel = this.getComponent("CityLabel",cc.Label)
        
        this.addCommonClick("close",this.backBtnFunc,this);
        this.addCommonClick("confirmBtn",this.confirmBtnFunc,this);

        //Listener
        this.model.on(ExtractEvent.BankBindInfoOver,this,this.close);
    }

    protected onOpen(args)
    {
        this.nameData = args[0];
        this.accountData = args[1];
        this.bankbranchData = args[2];
        this.openBankData = args[3];
        this.provinceData = args[4]
        this.cityData = args[5]
        this.bankCode = args[6]
        this.nameLabel.string = this.nameData;
        this.accountLabel.string = this.accountData;
        this.bankbranchLabel.string = this.bankbranchData;
        this.openBankLabel.string = this.openBankData;
        this.PrivinceLabel.string = this.provinceData
        this.CityLabel.string = this.cityData
    }

    confirmBtnFunc(){
        this.model.reqBindUnionInfo(this.nameData,this.accountData,this.openBankData,this.bankbranchData,this.provinceData,this.cityData,this.bankCode);
    }

    //关闭按钮
    backBtnFunc(){
        this.close();
    }
}
