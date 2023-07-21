

const {ccclass, property} = cc._decorator;

@ccclass
export default class BankGiftRecordItem extends cc.Component {

    @property(cc.Label)
    timeLabel: cc.Label = null;

    @property(cc.Label)
    giverIDLabel: cc.Label = null;

    @property(cc.Label)
    numLabel: cc.Label = null;

    @property([cc.Node])
    stateNodes: Array<cc.Node> = [];

    reset(){ 

    }

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
    setData( data: any ){
        // this.timeLabel.string = data.create_date;
        // this.giverIDLabel.string = data.type == 1 ? "银行卡提现" : "支付宝提现";
        // this.numLabel.string = data.point;
        // for (let index = 0; index < this.stateNodes.length; index++) {
        //     const stateNode = this.stateNodes[index];
        //     stateNode.active = (data.status == index);
        // }
    }

}
