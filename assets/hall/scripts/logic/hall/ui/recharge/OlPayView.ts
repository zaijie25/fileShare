import ViewBase from "../../../core/ui/ViewBase";
import RechargeModel from "../../../hallcommon/model/RechargeModel";
import { NetAppface } from "../../../core/net/hall/NetEvent";
import AppHelper from "../../../core/tool/AppHelper";
import HallStorageKey from "../../../hallcommon/const/HallStorageKey";
import ScanCodeView from "./ScanCodeView";
import { LoadingState } from "../../../core/ui/WndBase";

export default class OlPayView extends ViewBase {
    private payTipsLbl: cc.Label;
    private payKey: string;
    private nView = RechargeModel.PayType.Wechat;
    private itemList: Array<ToggleItem> = [];
    private moneyArr: Array<number> = [];
    private curBtnIndex: number = -1;
    private btnLayout: cc.Layout;
    private model: RechargeModel;
    private data: any;
    private curPayUrl: string = "";
    private orderNo: string = "";
    private bankAccountEditBox: cc.EditBox
    private nameEditBox: cc.EditBox
    private infoNode: cc.Node
    private scanCodeView:ScanCodeView


    protected initView() {
        this.model = Global.ModelManager.getModel("RechargeModel");
        this.payTipsLbl = this.getComponent("node/InputBox/moneyLbl", cc.Label);
        this.btnLayout = this.getComponent("btnLayout", cc.Layout);
        this.infoNode = this.getChild("Infonode")
        this.infoNode.active = false
        this.bankAccountEditBox = this.getComponent("Infonode/unionAccountEditBox", cc.EditBox)
        this.nameEditBox = this.getComponent("Infonode/nameEditBox", cc.EditBox)
        this.btnLayout.node.active = true;
        this.addCommonClick("goToPayBtn", this.goToPay, this);
        this.initToggleList();
        this.scanCodeView = <ScanCodeView>this.addView("ScanCodeView", this.getChild("ScanCodeView"), ScanCodeView, false);
    }

    private initToggleList() {
        for (let i = 1; i <= 8; i++) {
            let toggle = this.getChild("btnLayout/toggle" + String(i));
            let item = new ToggleItem(toggle, this.onItemClick, this);
            item.node.active = false;
            this.itemList.push(item);
        }

        // 按钮列表的适配  注意不可频繁变动btnLayout大小，开销大
        // this.btnLayout.node.on(cc.Node.EventType.SIZE_CHANGED, () => {
        //     let w = this.btnLayout.node.width;
        //     let tmpW = this.itemList[0].node.width;
        //     let spaceX = (w - tmpW * 4) / 5;
        //     this.btnLayout.paddingLeft = spaceX;
        //     this.btnLayout.spacingX = spaceX;
        // })
        this.bankAccountEditBox.string = "请输入银行卡号"
        this.nameEditBox.string = "请输入姓名"
    }


    showScanCodeView(data) {
        if(this.scanCodeView)
        {
            this.scanCodeView.data = data
            this.scanCodeView.subViewState = true
        }
    }
    private onItemClick(num: number) {
        this.payTipsLbl.string = String(this.moneyArr[num]);
        // this.payTipsLbl.node.color = new cc.Color(160, 116, 56);
        if (this.curBtnIndex != num) {
            let curItem = this.itemList[this.curBtnIndex];
            if (curItem) {
                curItem.isChecked = false;
            }
            this.curBtnIndex = num;
        }
    }

    public initData(viewIndex: string, data) {
        this.resetSelect();
        this.data = data;
        this.nView = viewIndex;
        this.payKey = data.id;
        this.moneyArr = data.pay_num_list || [];
        this.moneyArr.sort((a, b) => { return a - b });
        for (let i = 0; i < this.itemList.length; i++) {
            let item = this.itemList[i];
            if (this.moneyArr[i]) {
                item.initItemData(i, this.moneyArr[i]);
                item.node.active = true;
            }
            else {
                item.node.active = false;
            }
        }
    }

    private goToPay() {
        let str = this.payTipsLbl.string;
        if (str == '' || isNaN(Number(str))) {
            return Global.UI.fastTip("请选择充值金额");
        }
        console.log(Global.PlayerData.phone)
        if(this.model.need_bind_phone && Global.PlayerData.phone == "")
        {
            return Global.UI.fastTip("为了您的财产安全，请先绑定手机号码后再充值");
        }
        let attach = {
            "name": "加藤",
            "card": "12542245542125",
        }
        // if (this.nView == RechargeModel.PayType.UnionFast) {
        //     if (!this.checkTextEmptyAndShowTips(this.nameEditBox.string, "姓名不能为空"))
        //         return;
        //     if (!this.checkTextEmptyAndShowTips(this.bankAccountEditBox.string, "账户不能为空"))
        //         return;
        // }
        if (this.nView.indexOf(RechargeModel.PayType.Union) > -1) {
            Global.UI.show("WndRechangeBankInfo", str, this.data);
        }
        else {
            this.model.reqGetUserDownPay(this.nView, Number(str), this.payKey, JSON.stringify(attach));
            Logger.log("支付请求中----", this.payKey);
        }
    }

    private checkTextEmptyAndShowTips(text: string, tipsLabel: string) {
        if (text.length <= 0) {
            Global.UI.fastTip(tipsLabel);
            return false;
        }
        return true;
    }

    protected onSubViewShow() {
        Global.HallServer.on(NetAppface.UserDownPay, this, this.onReqOrder);
        this.model.on(RechargeModel.GetPayUrlResult, this, this.onGetPayUrl);
    }

    private onReqOrder(data) {
        console.log(data);
        let order = data.order_id;
        if (order) {
            this.model.event(RechargeModel.ShowWaitingAnim, true, this.nView);
            this.model.reqGetPayUrl(order);
        }
    }

     /**
     * 请求绑定信息
     * @param bind_type 0全部 1银行卡 2支付宝
     */
    public reqGetBankInfo(bNew:boolean = false){
        let _param = {
            "bind_type": 0, 
        };
        Global.HallServer.send(NetAppface.mod,NetAppface.GetBankInfo,_param,this.onResGetBankInfo.bind(this), null, true, 60);
    }
    public onResGetBankInfo(data : any)
    {
        if(data)
        {
            this.bankAccountEditBox.string = data.entrus_bank_account
            this.nameEditBox.string = data.entrus_bank_user
        }
    }

    //h5 打开支付
    private openPayUrlByH5(url: string) {
        cc.sys.openURL(Global.Toolkit.DealWithUrl(url));
        Global.UI.showSingleBox(Global.Language.getWord(1606) || "支付等待中");
    }
    //支付宝SDK订单
    private openAliSDKByOrder(url: string) {
        if (AppHelper.enableAliPaySDK) {
            // 类型为支付宝支付时调用原生支付包支付
            Logger.log("SDK支付url：", url);
            Global.NativeEvent.checkAliPayInstalled((retObj) => {
                if (retObj.result == 0) {
                    Logger.error("AliPayInstalled true")
                    Global.NativeEvent.paymentAliPayOrder(url, this.paymentOrderCallBack.bind(this));
                } 
                else if(retObj.result == -1){
                    Global.UI.showSingleBox("请先安装支付宝", null);
                }
            })
            
        } else {
            Global.UI.showSingleBox("当前版本不支持支付宝，请更新到最新版本", null);
        }
    }
    //DPaySDK订单
    private openDPayByOrder(url: string,token: string,le_pay_url:string) {
        if (AppHelper.enableSDKPay) {
            Global.NativeEvent.paymentDPayWithToken(token,url,le_pay_url, (retObj) =>{
            })
        } else {
            Global.UI.showSingleBox("当前版本不支持Upay支付方式", null);
        }
    }
    //微信SDK订单
    private openWXByOrder(url: string) {
        if (AppHelper.enableWXSDK) {
            // 类型为支付宝支付时调用原生支付包支付
            Logger.log("微信SDK支付url：", url);
            Global.NativeEvent.checkWXInstall((retObj) => {
                if (retObj.result == 0) {
                    Logger.error("WXInstalled true")
                    Global.NativeEvent.paymentWXPayOrder(url, this.paymentOrderCallBack.bind(this));
                } 
                else if(retObj.result == -1){
                    Global.UI.showSingleBox("请先安装微信", null);
                }
            })
            
        } else {
            Global.UI.showSingleBox("当前版本不支持微信支付，请更新到最新版本", null);
        }
    }
    //UPaySDK订单
    private openUPayByOrder(url: string,token: string,le_pay_url:string) {
        if (AppHelper.enableUPay) {
            Global.NativeEvent.paymentUPayWithToken(token,url,le_pay_url, (retObj) =>{
            })
        } else {
            Global.UI.showSingleBox("当前版本不支持Dpay支付方式", null);
        }
    }
    //SDK订单支付
    private openSDKByOrder(payStr: string) {
        if (AppHelper.enableSDK) {
            Global.NativeEvent.paymentSDKWithUrl(payStr, (retObj) =>{
                if (retObj.result == 0) {
                    Logger.error("openSDKByOrder true")
                    this.model.event(RechargeModel.ShowWaitingAnim, false);
                }else{
                    Global.UI.showSingleBox("订单获取失败,请稍后再试", null);
                    this.model.event(RechargeModel.ShowWaitingAnim, false);
                }
            })
        } else {
            Global.UI.showSingleBox("当前版本不支持SDK支付方式", null);
        }
    }
    //SDK订单支付
    private openLibByOrder(payStr: string) {
        Global.NativeEvent.payLibWithUrl(payStr, (retObj) =>{
            if (retObj.result == 0) {
                Logger.error("openSDKByOrder true")
                this.model.event(RechargeModel.ShowWaitingAnim, false);
            }else{
                Global.UI.showSingleBox("订单获取失败,请稍后再试", null);
                this.model.event(RechargeModel.ShowWaitingAnim, false);
            }
        })
    }
    //支付宝h5转native 
    private openAliSDKInterceptorWithUrl(url: string) {
        if (AppHelper.enableAliPaySDK) {
            if (AppHelper.enableAliPayInterceptorWithUrl) {
                if (AppHelper.enableAliPayCheckInstall) {
                    Global.NativeEvent.checkAliPayInstalled((retObj) => {
                        if (retObj.result == 0) {
                            Logger.error("AliPayInstalled true")
                            Logger.log("openAliSDKInterceptorWithUrl url：", url);
                            Global.NativeEvent.aliPayInterceptorWithUrl(url, this.aliPayInterceptorWithUrlCallBack.bind(this));
                        } else {
                            Logger.error("AliPayInstalled false")
                            this.openPayUrlByH5(url)
                        }
                    })
                } else {
                    Logger.error("enableAliPayCheckInstall false")
                    this.openPayUrlByH5(url)
                }

            } else {
                Logger.log("openAliSDKInterceptorWithUrl  enableAliPayInterceptorWithUrl = false url：", url);
                this.openPayUrlByH5(url)
            }
        } else {
            Logger.error("openAliSDKInterceptorWithUrl enableAliPaySDK = false open url")
            this.openPayUrlByH5(url)
        }
    }

    private aliPayInterceptorWithUrlCallBack(retObj) {
        if (!retObj) {
            Logger.error("aliPayInterceptorWithUrlCallBack retObj == null")
            return;
        }
        let ret = Number(retObj.result)
        if (ret == 0) {
            Logger.error("aliPayInterceptorWithUrl success and wait money")
        } else {
            Logger.error("aliPayInterceptorWithUrl failed")
            this.openPayUrlByH5(this.curPayUrl)
        }
    }

    private checkPayrUrlValid(url) {
        if (url != null && url != "") {
            return true;
        }
        return false;
    }

    //支付宝h5 授权 url
    private openAliSDKAuthWithUrl(url: string, attach_param: any = {}) {
        if (AppHelper.enableAliPaySDK) {
            if (AppHelper.enableAliPayAuthWithUrl) {
                if (AppHelper.enableAliPayCheckInstall) {
                    Global.NativeEvent.checkAliPayInstalled((retObj) => {
                        if (retObj.result == 0) {
                            Logger.error("AliPayInstalled true")
                            Logger.log("openAliSDKAuthWithUrl url：", url);
                            Logger.log("openAliSDKAuthWithUrl orderNo", this.orderNo);
                            Global.NativeEvent.aliPayAuthWithUrl(url, attach_param, this.orderNo, this.aliPayAuthWithUrlCallBack.bind(this));
                        }
                        else {
                            Logger.error("openAliSDKAuthWithUrl() AliPayInstalled false")
                        }
                    })
                }
                else {
                    Logger.error("openAliSDKAuthWithUrl() enableAliPayCheckInstall false")
                }
            }
            else {
                Logger.error("openAliSDKAuthWithUrl()  enableAliPayAuthWithUrl = false url：", url);
            }
        }
        else {
            Logger.error("openAliSDKAuthWithUrl() enableAliPaySDK = false open url");
        }
    }

    private aliPayAuthWithUrlCallBack(retObj) {
        if (!retObj) {
            Logger.error("aliPayAuthWithUrlCallBack retObj == null")
            return;
        }
        let ret = Number(retObj.result)
        if (ret == 0) {
            Logger.error("aliPayAuthWithUrlCallBack success and wait money")
        }
        else {
            Logger.error("aliPayAuthWithUrlCallBack failed")
            this.openPayUrlByH5(this.curPayUrl)
        }
    }

    private openAliSDKAuthWithAppID(appid: string) {
        if (AppHelper.enableAliPaySDK) {
            if (AppHelper.enableAliPayAuthWithUrl) {
                if (AppHelper.enableAliPayCheckInstall) {
                    Global.NativeEvent.checkAliPayInstalled((retObj) => {
                        if (retObj.result == 0) {
                            Logger.error("AliPayInstalled true")
                            Logger.log("openAliSDKAuthWithAppID appid:", appid);
                            Logger.log("openAliSDKAuthWithAppID order_no:", this.orderNo);
                            Global.NativeEvent.aliPayAuthWithAppID(appid, this.orderNo, this.aliPayAuthWithAppIDCallBack.bind(this));
                        }
                        else {
                            Logger.error("openAliSDKAuthWithAppID() AliPayInstalled false")
                            Global.UI.showSingleBox("请先安装支付宝!", null);
                        }
                    })
                }
                else {
                    Logger.error("openAliSDKAuthWithAppID() enableAliPayCheckInstall false")
                }
            }
            else {
                Logger.error("openAliSDKAuthWithAppID()  enableAliPayAuthWithUrl = false url：", appid);
            }
        }
        else {
            Logger.error("openAliSDKAuthWithAppID() enableAliPaySDK = false open url");
        }
    }

    private aliPayAuthWithAppIDCallBack(retObj) {
        if (!retObj) {
            Logger.error("aliPayAuthWithAppIDCallBack retObj == null")
            return;
        }
        let ret = Number(retObj.result)
        if (ret == 0) {
            Logger.error("aliPayAuthWithAppIDCallBack success and wait money")
            //原始逻辑是要拿到authcode后请求，但是会出现切后台请求被关掉问题。此请求放到原生来做。
            // let auth_code = retObj.funcParam
            // let order_no = this.orderNo
            // if (auth_code && order_no){
            //     this.model.reqOrderStrByAuthCode(auth_code,order_no)
            // }else {
            //     Logger.error("aliPayAuthWithAppIDCallBack failed params error auth_code = " + auth_code + " order_no = " + order_no )
            // }

        }
        else {
            Logger.error("aliPayAuthWithAppIDCallBack failed")
        }
    }

    private openAliSDKAuthWithPayAuthInfo(jsonStr: string) {
        if (AppHelper.enableAliPaySDK) {
            if (AppHelper.enableAliPayAuthWithPayAuthInfo) {
                if (AppHelper.enableAliPayCheckInstall) {
                    Global.NativeEvent.checkAliPayInstalled((retObj) => {
                        if (retObj.result == 0) {
                            Logger.error("AliPayInstalled true")
                            let jsonObj = JSON.parse(jsonStr)
                            let payAuthInfo = jsonObj.payAuthInfo
                            let payUrl = jsonObj.payUrl
                            if (payAuthInfo && payUrl) {
                                Logger.log("openAliSDKAuthWithPayAuthInfo payAuthInfo:", payAuthInfo);
                                Logger.log("openAliSDKAuthWithPayAuthInfo payUrl:", payUrl);
                                Logger.log("openAliSDKAuthWithPayAuthInfo order_no:", this.orderNo);
                                Global.NativeEvent.aliPayAuthWithPayAuthInfo(payAuthInfo, payUrl, this.orderNo, this.aliPayAuthWithPayAuthInfoCallBack.bind(this));
                            } else {
                                Logger.log("openAliSDKAuthWithPayAuthInfo payAuthInfo payUrl not invalid");
                            }

                        }
                        else {
                            Logger.error("openAliSDKAuthWithPayAuthInfo() AliPayInstalled false")
                            Global.UI.showSingleBox("请先安装支付宝!", null);
                        }
                    })
                }
                else {
                    Logger.error("openAliSDKAuthWithPayAuthInfo() enableAliPayCheckInstall false")
                }
            }
            else {
                Logger.error("openAliSDKAuthWithPayAuthInfo()  enableAliPayAuthWithPayAuthInfo = false url：", jsonStr);
            }
        }
        else {
            Logger.error("openAliSDKAuthWithPayAuthInfo() enableAliPaySDK = false open url");
        }
    }

    private aliPayAuthWithPayAuthInfoCallBack(retObj) {
        if (!retObj) {
            Logger.error("aliPayAuthWithPayAuthInfoCallBack retObj == null")
            return;
        }
        let ret = Number(retObj.result)
        if (ret == 0) {
            Logger.error("aliPayAuthWithPayAuthInfoCallBack success and wait money")
            //原始逻辑是要拿到authcode后请求，但是会出现切后台请求被关掉问题。此请求放到原生来做。
        }
        else {
            Logger.error("aliPayAuthWithPayAuthInfoCallBack failed")
        }
    }


    //老版本支付判断逻辑
    private oldPayUrlLogic(url: string) {
        if (this.checkPayrUrlValid(url)) {
            if (url.startsWith('http')) {
                this.openPayUrlByH5(url)
            } else if (url.startsWith('weixin')) {
                this.openWXByOrder(url)
            } else {
                this.openAliSDKByOrder(url)
            }
        } else {
            Logger.error("pay_sdk_type = null invalid url ++++++")
        }
    }

    private onGetPayUrl(result: number, data: any) {
        // console.error(data);
        let pay_sdk_type = data.pay_sdk_type;
        if(pay_sdk_type !=null && pay_sdk_type !=undefined && pay_sdk_type !=12  && pay_sdk_type !=13){ //sdk支付走回调关闭
            this.model.event(RechargeModel.ShowWaitingAnim, false);
        }
        if (result == 0) {
            let url = data.url;
            this.curPayUrl = url;
            //pay_sdk_type   1原有 url 模式  2  现在支付宝SDK   3 h5转sdk native模式 0 之前的版本
            let order_no = data.order_no
            this.orderNo = order_no
            if (pay_sdk_type != null) { // 新版本加入的字段
                if (this.checkPayrUrlValid(url)) {
                    switch (pay_sdk_type) {
                        case 0: //有这种可能性，配置没有生效
                            this.oldPayUrlLogic(url)
                            break;
                        case 1: // 1原有 url 模式
                            this.openPayUrlByH5(url)
                            break;
                        case 2://2现在支付宝SDK
                            this.openAliSDKByOrder(url)
                            break;
                        case 3: //3 h5转sdk native模式
                            this.openAliSDKInterceptorWithUrl(url)
                            break;
                        case 4: //4 支付宝授权
                            //附件参数, json格式的字符串
                            let paramStr = data.attach_param || "{}";
                            let attach_param = JSON.parse(paramStr);
                            this.openAliSDKAuthWithUrl(url, attach_param);
                            break;
                        case 5: //支付宝授权直接通过AppID获取authcode
                            let appid = url;
                            this.openAliSDKAuthWithAppID(appid)
                            break;
                        case 6:
                            this.openAliSDKAuthWithPayAuthInfo(url)
                            break;
                        case 7://DPaySDK支付
                            this.openDPayByOrder(url, data.token, data.le_pay_url)
                            break;
                        case 9://Upay支付
                            this.openUPayByOrder(url, data.token, data.le_pay_url)
                            break
                        case 10://扫码支付
                            this.showScanCodeView(data)
                            break
                        case 11://微信SDK支付
                            this.openWXByOrder(url)
                            break
                        case 12://SDK支付
                            this.openSDKByOrder(url)
                            break
                        case 13://果子SDK支付
                            this.openLibByOrder(url)
                            break
                    }
                } else {
                    Logger.error("pay_sdk_type = " + pay_sdk_type + " invalid url ++++++")
                }
            } else { //没有该字段走老的模式
                this.oldPayUrlLogic(url)
            }

        }
        else if (result == 2) {
            let errno = data._errno;
            if (errno) {
                Global.UI.fastTip(data._errstr);
            }
        }
        else {
            Global.UI.fastTip("支付失败，请尝试其他充值方式");
        }
    }

    private paymentOrderCallBack(result) {
        Logger.log("支付返回的参数", result);
    }

    protected onSubViewHide() {
        Global.HallServer.off(NetAppface.UserDownPay, this, this.onReqOrder);
        this.model.off(RechargeModel.GetPayUrlResult, this, this.onGetPayUrl);
    }

    public resetSelect() {
        if(!this.node) return
        if(this.payTipsLbl)
        {
            this.payTipsLbl.string = "请选择充值金额";
        }
        // this.payTipsLbl.node.color = new cc.Color(160, 116, 56);
        this.scanCodeView.subViewState = false
        if (this.itemList[this.curBtnIndex]) {
            this.itemList[this.curBtnIndex].isChecked = false;
        }
    }

    public hideAllItems() {
        for (let i = 0; i < this.itemList.length; i++) {
            this.itemList[i].active = false;
        }
    }
}

class ToggleItem extends ViewBase {
    private valueLbl: cc.Label[] = [];
    private index: number;
    private checked: boolean = false;
    private bg: cc.Node;
    private checkBg: cc.Node;

    constructor(node: cc.Node, private callback: Function, private target: any) {
        super();
        this.setNode(node);
    }

    protected initView() {
        this.addCommonClick("", this.onToggleClick, this);
        this.valueLbl.push(this.getComponent("Background/valueLbl", cc.Label));
        this.valueLbl.push(this.getComponent("checkmark/valueLbl", cc.Label));
        this.bg = this.getChild("Background");
        this.checkBg = this.getChild("checkmark");
    }

    public initItemData(index: number, money: number) {
        this.index = index;
        this.valueLbl[0].string = String(money);
        this.valueLbl[1].string = String(money);
    }

    public set isChecked(value: boolean) {
        if (this.checked != value) {
            this.checked = value;
        }
        this.setItemStyle();
    }

    public get isChecked() {
        return this.checked;
    }

    private onToggleClick() {
        if (this.callback) {
            this.callback.call(this.target, this.index);
        }
        this.isChecked = true;
    }

    private setItemStyle() {
        this.bg.active = !this.isChecked;
        this.checkBg.active = this.isChecked;
    }
}