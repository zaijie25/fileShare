import RechargeModel from "../../../hallcommon/model/RechargeModel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RecordingItem extends cc.Component {

    @property(cc.Sprite)
    bgIcon: cc.Sprite = null;

    @property(cc.Label)
    dateLabel: cc.Label = null;
    //支付状态类型
    @property(cc.Label)
    payTypeLabel: cc.Label = null;
    //支付状态
    @property(cc.Label)
    tyLable: cc.Label = null;
    //金额
    @property(cc.Label)
    moneyLabel: cc.Label = null;
    
    @property(cc.Sprite)
    typeIcon: cc.Sprite = null;
        // "create_date":"0000-00-00 00:00:00",
        // "account":"6212264000031391242",
        // "point":20000,
        // "status": 1 // -1 拒绝 0默认 待审核 1已审核 2确认中 3 兑换成功
        private typeDefine = [
            "VIP充值",
            "线上充值",
            "银行卡充值",
            "后台赠送",
            "小额充值",
        ]
    // 线上充值又分了这些
    private onlinePay = {
        [RechargeModel.PayType.Vip]: "VIP充值",
        [RechargeModel.PayType.VipQuickPay]: "专享闪付",
        [RechargeModel.PayType.Ali]: "支付宝充值",
        [RechargeModel.PayType.Wechat]: "微信充值",
        [RechargeModel.PayType.Qq]: "QQ充值",
        [RechargeModel.PayType.YunPay]: "云闪付",
        [RechargeModel.PayType.Union]: "银行卡转账",
        [RechargeModel.PayType.OnlinePay]: "收银台",
    }
    Init(data,j,isRecharge)
    {
        let colorArr = Global.Setting.SkinConfig.recordingItemColors;

        if(j%2 == 0){
            this.bgIcon.node.active = false;
        }else{
            this.bgIcon.node.active = true;
        }
        if (isRecharge)
        {
            this.dateLabel.string = String(data.ctime);

            if (data.ctype == 2){
                this.payTypeLabel.string = String(this.onlinePay[data.pay_name]);
            }
            else{
                this.payTypeLabel.string = String(this.typeDefine[data.ctype-1]);
            }
            if(data.status == 2){
                this.typeIcon.node.active = false
                this.tyLable.string = "充值成功";
            }else{
                this.typeIcon.node.active = true
                this.tyLable.string = "充值失败";
            }
            this.moneyLabel.string = ""+ (data.point / Global.Setting.glodRatio)
            this.tyLable.string = data.status == 1 ? '处理中': data.status == 2 ? '充值成功': '充值失败';
            let color = new cc.Color();
            this.tyLable.node.color = data.status == 1 ? color.fromHEX(colorArr[0]): data.status == 2 ? color.fromHEX(colorArr[1]): color.fromHEX(colorArr[2]);
        }
        else
        { //提现
                /**
     * 
     * @param data  {
            "create_date":"0000-00-00 00:00:00",
            "account":"6212264000031391242",
            "point":20000,
            "status": 1 // -1 拒绝 0默认 待审核 1已审核 2确认中 3 兑换成功
            "type":0全部 1支付宝 2银行卡
        }
     */
            this.dateLabel.string = String(data.create_date);
            this.payTypeLabel.string = data.type == 1 ? "银行卡提现" : "支付宝提现";
            this.moneyLabel.string = ""+ (data.point / Global.Setting.glodRatio)

            
            if(data.status == -1){
                this.typeIcon.node.active = true
            }else{
                this.typeIcon.node.active = false
            }
            this.tyLable.string = data.status == 3 ? '提现成功': data.status == -1 ? '提现失败': '处理中';
            let color = new cc.Color();
            this.tyLable.node.color = data.status == 3 ? color.fromHEX(colorArr[3]): data.status == -1 ? color.fromHEX(colorArr[4]): color.fromHEX(colorArr[5]);
            this.moneyLabel.string = Global.Toolkit.formatPointStr(data.point);
        }
    }
}
