import ViewBase from "../../../core/ui/ViewBase";
import RechargeModel from "../../../hallcommon/model/RechargeModel";
import { NetAppface } from "../../../core/net/hall/NetEvent";

export default class RechargeOnlineView extends ViewBase{
        private payKey: string;
        // private id:string;
        private btnLayout: cc.Layout;
        private model: RechargeModel;
    
        protected initView(){
            this.model = Global.ModelManager.getModel("RechargeModel");
            this.btnLayout = this.getComponent("btnLayout", cc.Layout);
            this.addCommonClick("goToPayBtn", this.goToPay, this);
            this.addCommonClick("btnLayout",this.goToPay, this,cc.Button.Transition.NONE);

        }
    
        //TODO 按钮点击事件
        private goToPay(){
            // this.model.reqGetUserDownPay(this.payKey,0,this.id);
            Logger.log("支付请求中----", this.payKey);
        }

        public initData(data){
            this.payKey = data.pay_key;
            // this.id =  data.data[0].id;
        }
    
        protected onSubViewShow(){
            Global.HallServer.on(NetAppface.UserDownPay, this, this.onReqOrder);
            this.model.on(RechargeModel.GetPayUrlResult, this, this.onGetPayUrl);
        }
    
        private onReqOrder(data){
            let order = data.order_id;
            if (order){
                this.model.event(RechargeModel.ShowWaitingAnim, true, this.payKey);
                this.model.reqGetPayUrl(order);
            }
        }
    
        private onGetPayUrl(result: number, data: any){
            this.model.event(RechargeModel.ShowWaitingAnim, false);
            if (result == 0){
                let url = data.url;
                if (url){
                    cc.sys.openURL(Global.Toolkit.DealWithUrl(url));
                    Global.UI.showSingleBox(Global.Language.getWord(1606) || "支付等待中");
                }
            }
            else if(result == 2){
                let errno = data._errno;
                if (errno){
                    Global.UI.fastTip(data._errstr);
                }
            }
            else{
                Global.UI.fastTip("支付失败，请尝试其他充值方式");
            }
        }
    
        protected onSubViewHide(){
            Global.HallServer.off(NetAppface.UserDownPay, this, this.onReqOrder);
            this.model.off(RechargeModel.GetPayUrlResult, this, this.onGetPayUrl);
        }
       
}