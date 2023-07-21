import ExtractCashWin from "../common/ExtractCashWin";

export default class overseasExtractCashWin extends ExtractCashWin{
    private OverseasAccountLabel: cc.RichText = null;

    protected initView()
    {
        super.initView();

        this.OverseasAccountLabel = this.getComponent("OverseasAccountBox/OverseasAccountLabel",cc.RichText);
    }

    public onSubViewShow(){
        super.onSubViewShow();
        var datas = this.model.bankDatas || {};  //海外账户信息
        this.info = "tips：\nIf you have any questions, please contact customer service!\n温馨提示：\n如有问题，请联系客服咨询！";
        this.msgLabel.string = this.info;
        this.OverseasAccountLabel.string = "<b>" + datas.over_sea_entrus_bank_account + "</b>" || "";
    }

    private checkData(){
        var num = parseInt(this.ecNumEditBox.string);
        if(num < this.model.getOverseasMaxLimit()) {
            Global.UI.fastTip("提现金额超出限制范围");
            return false
        };
        if(num > this.model.getOverseasMinLimit()) {
            Global.UI.fastTip("提现金额超出限制范围");
            return false;
        }
        if(num % 10 != 0) {
            Global.UI.fastTip("提现金额只能为10的倍数");
            return false;
        }
        if(num > Global.PlayerData.point / Global.Setting.glodRatio) {
            Global.UI.fastTip("发起提现失败，你的可提现金额不足");
            return false;
        }
        return true;
    }

    protected confirmBtn(){
        if(this.checkData()){
            var num = parseInt(this.ecNumEditBox.string);
            // this.model.reqUnionApplyCash(num);
            this.model.reqOverseasApplyCash(num);
            // 海外提现接口
        }else{
            this.resetBtnFunc();
        }
    }

    /** 筹码列表更新 */
    protected updateChipList(){
    }
}