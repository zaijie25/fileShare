import ExtractCashWin from "../common/ExtractCashWin";


export default class unionExtractCashWin extends ExtractCashWin {

    private unionAccountLabel: cc.RichText = null;

    protected initView()
    {
        super.initView();

        this.unionAccountLabel = this.getComponent("unionAccountBox/unionAccountLabel",cc.RichText);
    }

    public onSubViewShow(){
        super.onSubViewShow();
        var datas = this.model.bankDatas || {};
        this.info = "1.单次提现额度为%s元~%s元，且只能为10的倍数\n2.每人每天提现次数最多为%s次，钱包余额至少保留%s元\n3.每笔提现需达到充值金额的一倍流水，详情请咨询客服";
        // let [bankPut, put] = this.model.getBankPutServerRecharge();
        // if (bankPut > 0){
        //     let str = bankPut + '%';
        //     this.info += `\n4.单次提现收取提现额度${str}的手续费`;
        // }
        this.rateLabel.string = this.model.getRateInfo()
        this.info += this.model.getPutInfo(1)
        this.msgLabel.string = cc.js.formatStr(this.info,datas.bank_min_put_point,datas.bank_max_put_point,
            datas.bank_put_day_max_num,datas.forzen_point);
        this.unionAccountLabel.string = "<b>" + datas.entrus_bank_account + "</b>" || "";
    }

    private checkData(){
        var num = parseInt(this.ecNumEditBox.string);
        if(num < this.model.getUnionMinLimit()) {
            // Global.UI.showSingleBox("提现金额超出限制范围" + this.model.getUnionMinLimit() + "元");
            Global.UI.fastTip("提现金额超出限制范围");
            return false
        };
        if(num > this.model.getUnionMaxLimit()) {
            // Global.UI.showSingleBox("提现金额超出限制范围" + this.model.getUnionMaxLimit() + "元");
            Global.UI.fastTip("提现金额超出限制范围");
            return false;
        }
        if(num % 10 != 0) {
            // Global.UI.showSingleBox("提现金额只能为10的倍数");
            Global.UI.fastTip("提现金额只能为10的倍数");
            return false;
        }
        if(num > Global.PlayerData.point / Global.Setting.glodRatio) {
            // Global.UI.showSingleBox("发起提现失败，你的可提现金额不足");
            Global.UI.fastTip("发起提现失败，你的可提现金额不足");
            return false;
        }
        return true;
    }

    protected confirmBtn(){
        if(this.checkData()){
            var num = parseInt(this.ecNumEditBox.string);
            this.model.reqUnionApplyCash(num);
        }else{
            this.resetBtnFunc();
        }
    }

    /** 筹码列表更新 */
    protected updateChipList(){
    }
}
