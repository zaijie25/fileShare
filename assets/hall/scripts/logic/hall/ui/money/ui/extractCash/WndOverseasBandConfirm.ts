import WndBase from "../../../../../core/ui/WndBase"
import ExtractModel from "../../../../../hallcommon/model/ExtractModel";
import { ExtractEvent } from "./ExtractEvent";

export default class WndOverseasBandConfirm extends WndBase{
    private model : ExtractModel;
    
    private nameLabel : cc.Label;
    private accountLabel : cc.Label;
    private bankTipLabel : cc.Label;

    private nameData : string;
    private accountData : string;
    private bankData : string;

    protected onInit()
    {
        this.name = "WndOverseasBandConfirm";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/extractCash/overseasBandConfirmUI";
        this.model = <ExtractModel>Global.ModelManager.getModel("ExtractModel");
    }

    protected initView(){
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;

        this.nameLabel = this.getComponent("NameLabel",cc.Label);
        this.accountLabel = this.getComponent("AccountLabel",cc.Label);
        this.bankTipLabel = this.getComponent("BankLabel",cc.Label);
        
        this.addCommonClick("close",this.backBtnFunc,this);
        this.addCommonClick("confirmBtn",this.confirmBtnFunc,this);

        //Listener
        this.model.on(ExtractEvent.BankBindInfoOver,this,this.close);
    }

    protected onOpen(args)
    {
        this.nameData = args[0];
        this.accountData = args[1];
        this.bankData = args[2];
        this.nameLabel.string = this.nameData;
        this.accountLabel.string = this.accountData;
        this.bankTipLabel.string = this.bankData;
    }


    confirmBtnFunc(){
        this.model.reqBindOverseasInfo(this.nameData,this.accountData,this.bankData);
        //接口请求
        this.backBtnFunc();
    }

    //关闭按钮
    backBtnFunc(){
        this.close();
    }
}