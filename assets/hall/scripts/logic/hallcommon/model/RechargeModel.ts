import ModelBase from "../../../framework/model/ModelBase";
import { NetAppface } from "../../core/net/hall/NetEvent";
import RechagreTipModel from "./RechagreTipModel";
import { HallRedSpotType } from "./HallModel";
import { CustomerEntranceType } from "./ServicerModel";

export default class RechargeModel extends ModelBase {
    public static UpdateHistory = "UpdateHistory";
    public static GetPayUrlResult = "GetPayUrlResult";
    public static ShowWaitingAnim = "ShowWaitingAnim";
    public static ReadyForConfig = "ReadyForConfig";
    public static ShowScanCodeView = "ShowScanCodeView"
    public chatSpot = false
    public kefuSpot = false
    public static PayType = {
        Vip: "vippay",//vip支付
        VipQuickPay: "vipQuickPay", //专享闪付
        Wechat: "wxpay",//微信支付
        Ali: "alipay",//支付宝支付
        Union: "unionpay",//银行卡
        Qq: "qqpay",//QQ支付
        YunPay: "yunpay",//云闪付
        OnlinePay: "onlineCash",//收银台
        UnionFast: "unionFast",//银联快捷
        RechargeList: "rechargelist", //历史记录
        Dpay: "digpay",
        ScanCode: "scanCode",
        USDT: "usdtPay",
        JDPay: "jdPay",
        International: "international"//海外充值
    }

    private reqCount = 7;
    private timeOut: any;

    private payCfgList = [];
    private payCfgMap = {};

    public hisListPage: number = 1;
    private hisListData: Array<any> = [];
    public hisTotal: number = 0;
    public need_bind_phone = false;
    protected onInit() {
        this.name = "RechargeModel";
        Global.Event.on(GlobalEvent.ShowRedSpot, this, this.showRedSpot);
        Global.Event.on(GlobalEvent.CloseRedSpot, this, this.closeRedSpot);
    }
    private showRedSpot(data) {
        let redSpotType = data[1]
        switch (redSpotType) {
            case HallRedSpotType.YunPalyKefu:
                {
                    if (Global.ChatServer.serverType == CustomerEntranceType.QuickPayService) {
                        this.chatSpot = true;
                    } else {
                        this.kefuSpot = true;
                    }
                    break;
                }
        }
        this.event("UpdateResSpot", redSpotType);
    }

    public closeRedSpot(redSpotType) {
        switch (redSpotType) {
            case HallRedSpotType.YunPalyKefu:
                {
                    if (Global.ChatServer.serverType == CustomerEntranceType.QuickPayService) {
                        this.chatSpot = false;
                    } else {
                        this.kefuSpot = false;
                    }
                    break;
                }
        }
        this.event("UpdateResSpot", redSpotType);
    }

    public reqGetPayConfig() {
        let device = Global.Toolkit.genDeviceInfo();
        let param = {
            "device": device
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.GetNewPayConfig, param, (data) => {
            this.initData(data.new_pay_info);
            this.need_bind_phone = data.need_bind_phone
            this.event(RechargeModel.ReadyForConfig);
        }, null, false, 0);
    }

    public reqGetUserDownPay(payKey: string, point: number, id: string, attach: string = "") {
        if (Global.Toolkit.checkRechargeLimited()) {
            return
        }
        let _index = payKey.indexOf("_");
        let newPayKey = "";
        if (_index > -1) {
            newPayKey = payKey.substring(0, _index);
        } else {
            newPayKey = payKey;
        }
        let device = Global.Toolkit.genDeviceInfo();
        let param = {
            "pay_key": newPayKey,
            "price": point,
            "pay_type_id": id,
            "device": device,
            "attach": attach
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.UserDownPay, param);
    }




    //通过授权码获取orderStr
    // public reqOrderStrByAuthCode(auth_code:string,order_no:string){
    //     let param = {
    //         "order_no": order_no,
    //         "attach": auth_code,
    //     }
    //     Global.HallServer.send(NetAppface.mod, NetAppface.UserNewDownPayAttach, param,(data)=>{
    //         let order_id = data.order_id
    //         if (order_id){
    //             this.reqGetPayUrl(order_id)
    //         } else {
    //             Logger.error("reqOrderStrByAuthCode order_id error")
    //         }
    //     });
    // }

    public reqGetPayUrl(order: string) {
        if (Global.Toolkit.checkRechargeLimited()) {
            return
        }
        let param = {
            "order_id": order,
        }
        this.reqGetUrlTimes(param, this.reqCount);
    }


    // event 0：拉取成功，1：拉取不到，2：拉取回调异常 
    private reqGetUrlTimes(param: any, times: number) {
        Global.HallServer.send(NetAppface.mod, NetAppface.GetDownPayUrl, param, (data) => {
            times--;
            let url = data.url;
            let tServer = data.tServer
            if (url.startsWith("/notice") && tServer && tServer.length > 0) ///notice开头则为加盾的
            {
                Global.DunHotUpdateUrlSetting.payRouteCfg = data.tServer
                let dunUrl = Global.DunHotUpdateUrlSetting.payeUrl
                if (dunUrl) {
                    data.url = dunUrl + url
                }
            }
            if (url) {
                return this.event(RechargeModel.GetPayUrlResult, 0, data);
            }
            else {
                if (times == 0) {
                    return this.event(RechargeModel.GetPayUrlResult, 1, data);
                }
                this.timeOut = setTimeout(() => {
                    this.reqGetUrlTimes(param, times);
                }, 1500);
            }
        }, (data) => {
            this.event(RechargeModel.GetPayUrlResult, 2, data);
        }, false);
    }

    public reqGetUserPayList(next: boolean = false) {
        if (next) {
            if (this.hisListData.length >= this.hisTotal) {
                Global.UI.fastTip("无更多信息")
                return;
            }
            this.hisListPage++;
        } else {
            this.hisListPage = 1;
        }
        let listCount = this.hisTotal - (this.hisListPage - 1) * 6 > 6 ? 6 : this.hisTotal - (this.hisListPage - 1) * 6
        let param = {
            "page": this.hisListPage,
            "limit": listCount == 0 ? 6 : listCount,
        }
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "reqGetUserPayList", 3);
        Global.HallServer.send(NetAppface.mod, NetAppface.GetUserPayList, param, (res) => {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "reqGetUserPayList");
            if (res.list.length < 6) {
                this.hisTotal = (this.hisListPage - 1) * 6 + res.list.length;
                if (res.list.length == 0) {
                    this.hisListPage--;
                    this.hisTotal = this.hisListData.length;
                }
            } else {
                this.hisTotal = res.total;
            }
            let list = res.list || [];
            if (!list) {
                return;
            }
            if (this.hisListPage == 1) {
                this.hisListData = list;
            }
            else {
                if (this.hisListData.length > this.hisTotal)
                    return;
                this.hisListData = this.hisListData.concat(list);
            }
            this.event(RechargeModel.UpdateHistory);
        });
    }

    public getHisListData() {
        return this.hisListData;
    }

    public reqGetAllPayList() {
        let param = {
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.GetAllPayPutList, param, null, null, false);  // 轮播 数据界面缓存 关闭清空
    }

    /**
     * 'key1': [data1, data2], 'key2': []
     * @param data 
     */
    public initData(data) {
        this.payCfgMap = {};
        this.payCfgList = [];
        if (data && !Global.Toolkit.isEmptyObject(data)) {
            let isvippay = false;
            data.forEach(e => {
                if (!this.payCfgMap[e.pay_key]) {
                    this.payCfgMap[e.pay_key] = [];
                    this.payCfgList.push(e);    // 只用于左边页签，不需要全部的e
                }
                if (e.pay_key == "vippay") {
                    isvippay = true;
                    var RechagreTipModel = <RechagreTipModel>Global.ModelManager.getModel("RechagreTipModel")
                    RechagreTipModel.initData(e.sale_num);
                }
                this.payCfgMap[e.pay_key].push(e);
            });

            if(!isvippay){  
                //如果没有公司入账这条数据，就默认显示0，避免出现udf的情况
                var RechagreTipModel = <RechagreTipModel>Global.ModelManager.getModel("RechagreTipModel")
                RechagreTipModel.initData(0);
            }
            //增加充值列表
            // let rechargeData = {
            // pay_num_list:[10, 30, 50, 100, 200, 300, 500, 1000],
            // pay_key: "rechargelist",
            // name: "充值记录",
            // sale_status: 0,
            // sale_text: "",
            // text: "支付宝快捷支付，方便省心！",
            // text2: "若充值未及时到账，请联系在线客服协助",}
            // if (!this.payCfgMap[rechargeData.pay_key]){
            //     this.payCfgMap[rechargeData.pay_key] = [];
            //     this.payCfgList.push(rechargeData);    // 只用于左边页签，不需要全部的e
            // }
            // this.payCfgMap[rechargeData.pay_key].push(rechargeData);
        }
    }

    public getPayListData() {
        let list = this.payCfgList;
        if (!list || Global.Toolkit.isEmptyObject(list)) {
            Logger.error("支付配置为空");
            return [];
        }
        return list;
    }

    public getPayMapData(key?: string) {
        let map = this.payCfgMap;
        if (key && map[key]) {
            return map[key];
        }
        return map;
    }

    protected onClear() {
        this.clearReqTimeout();
    }

    public clearReqTimeout() {
        if (this.timeOut) {
            clearTimeout(this.timeOut);
        }
    }

    public reqUserUnionPay(type: number, point: number, name: string) {
        if (Global.Toolkit.checkRechargeLimited()) {
            return
        }
        let param = {
            "type": type,
            "point": point,
            "name": name,
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.UserUnionPay, param, null, null, true);
    }
}