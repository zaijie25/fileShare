import WndBase from "../../../core/ui/WndBase";
import RechargeModel from "../../../hallcommon/model/RechargeModel";
import { NetAppface } from "../../../core/net/hall/NetEvent";
export default class WndRechangeBankInfo extends WndBase{
    private model: RechargeModel;
    private bankLbl: cc.Label;
    private bankNumLbl: cc.Label;
    private bankUserLbl: cc.Label;
    private idLbl: cc.Label;
    private payLbl: cc.Label;
    private payTimeLbl: cc.Label;
    private payNameEdit: cc.EditBox;
    private data: any;
    private isOverseas:boolean; //是否是海外支付
    private viewCfg:any;        //适配海外支付/银行卡支付配置
    protected onInit() {
        this.name = "WndRechangeBankInfo";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/RechangeBankInfoUI";
    }

    protected initView(){
        this.model = Global.ModelManager.getModel("RechargeModel");
        
        this.addCommonClick("close", this.closeWnd, this);
        this.bankLbl = this.getComponent("centerNode/bank/bankLbl", cc.Label);
        this.bankNumLbl = this.getComponent("centerNode/bankNum/bankNumLbl", cc.Label);
        this.addCommonClick("centerNode/bankNum/copyBtn", this.onCopyCardNumClick, this);
        this.bankUserLbl = this.getComponent("centerNode/bankUser/bankUserLbl", cc.Label);
        this.addCommonClick("centerNode/bankUser/copyBtn", this.onCopyUserClick, this);
        this.idLbl = this.getComponent("centerNode/ID/idLbl", cc.Label);
        this.addCommonClick("centerNode/ID/copyBtn", this.onCopyUserIdClick, this);
        this.payLbl = this.getComponent("centerNode/pay/payLbl", cc.Label);
        this.payTimeLbl = this.getComponent("centerNode/payTime/timeLbl", cc.Label);
        this.payNameEdit = <cc.EditBox>this.getComponent("centerNode/payName/nameEditBox", cc.EditBox);
        this.addCommonClick("centerNode/sureBtn", this.reqSubmitOrder, this);
    }

    private initData(){
        this.bankLbl.string = this.data['card_type'];
        this.bankNumLbl.string = this.data["card_no"];
        this.bankUserLbl.string = this.data["card_name"];
        this.idLbl.string = String(Global.PlayerData.uid);
    }

    private onCopyCardNumClick(){
        Global.NativeEvent.copyTextToClipboard(this.bankNumLbl.string, this.copyTextToClipboardCallBack.bind(this));
    }

    private onCopyUserClick(){
        Global.NativeEvent.copyTextToClipboard(this.bankUserLbl.string, this.copyTextToClipboardCallBack.bind(this));
    }

    private onCopyUserIdClick(){
        Global.NativeEvent.copyTextToClipboard(this.idLbl.string, this.copyTextToClipboardCallBack.bind(this));
    }

    private copyTextToClipboardCallBack(retStr){
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
        }else {
            Global.UI.fastTip("复制失败");
        }
    }

    protected onOpen(data){
        this.payLbl.string = String(data[0]);
        this.data = data[1] || {};
        this.isOverseas = data[2] || false;
        this.payNameEdit.string = '';
        this.payTimeLbl.string = Global.Toolkit.parseTime(Date.now());
        Global.HallServer.on(NetAppface.UserUnionPay, this, this.onSubmitOrder);
        this.adaptOverseasPay();
        this.initData();
    }

    private adaptOverseasPay(){
        this.viewCfg = this.isOverseas ? Global.Setting.SkinConfig.rechangeOverseasBankInfoCfg : Global.Setting.SkinConfig.rechangeUnionpayBankInfoCfg;
        //复制按钮
        this.adaptCopyBtn();
        //提交订单按钮
        this.adaptSureBtn();
        //提示内容
        this.adaptTips();
    }

    private adaptCopyBtn(){
        let type = this.viewCfg['copyBtnType'];
        let content = this.viewCfg['copyBtnContent'];
        if(type === "cc.RichText"){
            let bankNumCopy = this.getComponent("centerNode/bankNum/copyBtn/New RichText",type) as cc.RichText;
            let bankUserCopy = this.getComponent("centerNode/bankUser/copyBtn/New RichText",type) as cc.RichText;
            let idCopy = this.getComponent("centerNode/ID/copyBtn/New RichText",type) as cc.RichText;
            bankNumCopy.string = content;
            bankUserCopy.string = content;
            idCopy.string = content;
        }else if(type === "cc.Sprite"){
            let bankNumCopy = this.getComponent("centerNode/bankNum/copyBtn/New RichText",type) as cc.Sprite;
            let bankUserCopy = this.getComponent("centerNode/bankUser/copyBtn/New RichText",type) as cc.Sprite;
            let idCopy = this.getComponent("centerNode/ID/copyBtn/New RichText",type) as cc.Sprite;
            // let spName = this.isOverseas ? "button_zi_copy" : "button_zi_fz";
            // Global.ResourceManager.loadAutoAtlas(bankNumCopy, content, spName);
            // Global.ResourceManager.loadAutoAtlas(bankUserCopy, content, spName);
            // Global.ResourceManager.loadAutoAtlas(idCopy, content, spName);
        }
    }

    private adaptSureBtn(){
        let type = this.viewCfg['sureBtnType'];
        let content = this.viewCfg['sureBtnContent'];
        // if(type === "cc.Sprite"){
        //     let sureBtn = this.getComponent("centerNode/sureBtn/g_4",type) as cc.Sprite;
        //     let spName = this.isOverseas ? "button_zi_yes" : "button_zi_tijiaodd";
        //     if(Global.Setting.SkinConfig.isPurple && !this.isOverseas){//紫色特殊处理并且不是海外支付的
        //         spName = "g_4";
        //         let btnSprite = Global.ResourceManager.getSprite(content,spName);
        //         sureBtn.spriteFrame = btnSprite;
        //     }else{
        //         Global.ResourceManager.loadAutoAtlas(sureBtn, content, spName);
        //     }
        // }else if(type === "cc.Label"){
        //     let sureBtn = this.getComponent("centerNode/sureBtn/g_4",type) as cc.Label;
        //     sureBtn.string = content;
        // }
    }

    private adaptTips(){
        // let tipEnglishSize = this.viewCfg['tipEnglishSize'];
        // let tipEnglishColor = this.viewCfg['tipEnglishColor'];
        // let tipChineseSize = this.viewCfg['tipChineseSize'];
        // let tipChineseColor = this.viewCfg['tipChineseColor'];
        // let tipsRichText = this.getComponent("centerNode/tipsLbl",cc.RichText) as cc.RichText;
        // tipsRichText.horizontalAlign = this.isOverseas ? cc.macro.TextAlignment.CENTER : cc.macro.TextAlignment.LEFT;
        // let tipStr = "<color=%s><size=%s>请您复制收款银行的卡号和姓名，线下转账至该银行卡后，返回此界面添加您转账账户的真实姓名后提交订单！若有任何疑问请</c><color=%s><size=%s>联系客服</color>";
        // if(this.isOverseas){
        //     tipStr = "<color=%s><size=%s>If you have any questions, please contact customer service!</c><br/><color=%s><size=%s>如有问题，请联系客服咨询！</color>";
        // }
        // let str = cc.js.formatStr(tipStr,tipEnglishColor,tipEnglishSize,tipChineseColor,tipChineseSize);
        // tipsRichText.string = str;
    }

    private reqSubmitOrder(){
        if (this.payNameEdit.string == '')
            return Global.UI.fastTip("请输入转账姓名");
        this.model.reqUserUnionPay(this.data.type, Number(this.payLbl.string), this.payNameEdit.string);
    }

    private onSubmitOrder(){
        Global.UI.fastTip("提交订单成功");
        this.closeWnd();
    }

    private closeWnd(){
        this.close();
    }
}