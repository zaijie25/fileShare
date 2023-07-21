"use strict";
cc._RF.push(module, '004f3BAPcxB55PVrxtB3YD6', 'OlPayView');
// hall/scripts/logic/hall/ui/recharge/OlPayView.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../../core/ui/ViewBase");
var RechargeModel_1 = require("../../../hallcommon/model/RechargeModel");
var NetEvent_1 = require("../../../core/net/hall/NetEvent");
var AppHelper_1 = require("../../../core/tool/AppHelper");
var ScanCodeView_1 = require("./ScanCodeView");
var OlPayView = /** @class */ (function (_super) {
    __extends(OlPayView, _super);
    function OlPayView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nView = RechargeModel_1.default.PayType.Wechat;
        _this.itemList = [];
        _this.moneyArr = [];
        _this.curBtnIndex = -1;
        _this.curPayUrl = "";
        _this.orderNo = "";
        return _this;
    }
    OlPayView.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("RechargeModel");
        this.payTipsLbl = this.getComponent("node/InputBox/moneyLbl", cc.Label);
        this.btnLayout = this.getComponent("btnLayout", cc.Layout);
        this.infoNode = this.getChild("Infonode");
        this.infoNode.active = false;
        this.bankAccountEditBox = this.getComponent("Infonode/unionAccountEditBox", cc.EditBox);
        this.nameEditBox = this.getComponent("Infonode/nameEditBox", cc.EditBox);
        this.btnLayout.node.active = true;
        this.addCommonClick("goToPayBtn", this.goToPay, this);
        this.initToggleList();
        this.scanCodeView = this.addView("ScanCodeView", this.getChild("ScanCodeView"), ScanCodeView_1.default, false);
    };
    OlPayView.prototype.initToggleList = function () {
        for (var i = 1; i <= 8; i++) {
            var toggle = this.getChild("btnLayout/toggle" + String(i));
            var item = new ToggleItem(toggle, this.onItemClick, this);
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
        this.bankAccountEditBox.string = "请输入银行卡号";
        this.nameEditBox.string = "请输入姓名";
    };
    OlPayView.prototype.showScanCodeView = function (data) {
        if (this.scanCodeView) {
            this.scanCodeView.data = data;
            this.scanCodeView.subViewState = true;
        }
    };
    OlPayView.prototype.onItemClick = function (num) {
        this.payTipsLbl.string = String(this.moneyArr[num]);
        // this.payTipsLbl.node.color = new cc.Color(160, 116, 56);
        if (this.curBtnIndex != num) {
            var curItem = this.itemList[this.curBtnIndex];
            if (curItem) {
                curItem.isChecked = false;
            }
            this.curBtnIndex = num;
        }
    };
    OlPayView.prototype.initData = function (viewIndex, data) {
        this.resetSelect();
        this.data = data;
        this.nView = viewIndex;
        this.payKey = data.id;
        this.moneyArr = data.pay_num_list || [];
        this.moneyArr.sort(function (a, b) { return a - b; });
        for (var i = 0; i < this.itemList.length; i++) {
            var item = this.itemList[i];
            if (this.moneyArr[i]) {
                item.initItemData(i, this.moneyArr[i]);
                item.node.active = true;
            }
            else {
                item.node.active = false;
            }
        }
    };
    OlPayView.prototype.goToPay = function () {
        var str = this.payTipsLbl.string;
        if (str == '' || isNaN(Number(str))) {
            return Global.UI.fastTip("请选择充值金额");
        }
        console.log(Global.PlayerData.phone);
        if (this.model.need_bind_phone && Global.PlayerData.phone == "") {
            return Global.UI.fastTip("为了您的财产安全，请先绑定手机号码后再充值");
        }
        var attach = {
            "name": "加藤",
            "card": "12542245542125",
        };
        // if (this.nView == RechargeModel.PayType.UnionFast) {
        //     if (!this.checkTextEmptyAndShowTips(this.nameEditBox.string, "姓名不能为空"))
        //         return;
        //     if (!this.checkTextEmptyAndShowTips(this.bankAccountEditBox.string, "账户不能为空"))
        //         return;
        // }
        if (this.nView.indexOf(RechargeModel_1.default.PayType.Union) > -1) {
            Global.UI.show("WndRechangeBankInfo", str, this.data);
        }
        else {
            this.model.reqGetUserDownPay(this.nView, Number(str), this.payKey, JSON.stringify(attach));
            Logger.log("支付请求中----", this.payKey);
        }
    };
    OlPayView.prototype.checkTextEmptyAndShowTips = function (text, tipsLabel) {
        if (text.length <= 0) {
            Global.UI.fastTip(tipsLabel);
            return false;
        }
        return true;
    };
    OlPayView.prototype.onSubViewShow = function () {
        Global.HallServer.on(NetEvent_1.NetAppface.UserDownPay, this, this.onReqOrder);
        this.model.on(RechargeModel_1.default.GetPayUrlResult, this, this.onGetPayUrl);
    };
    OlPayView.prototype.onReqOrder = function (data) {
        console.log(data);
        var order = data.order_id;
        if (order) {
            this.model.event(RechargeModel_1.default.ShowWaitingAnim, true, this.nView);
            this.model.reqGetPayUrl(order);
        }
    };
    /**
    * 请求绑定信息
    * @param bind_type 0全部 1银行卡 2支付宝
    */
    OlPayView.prototype.reqGetBankInfo = function (bNew) {
        if (bNew === void 0) { bNew = false; }
        var _param = {
            "bind_type": 0,
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetBankInfo, _param, this.onResGetBankInfo.bind(this), null, true, 60);
    };
    OlPayView.prototype.onResGetBankInfo = function (data) {
        if (data) {
            this.bankAccountEditBox.string = data.entrus_bank_account;
            this.nameEditBox.string = data.entrus_bank_user;
        }
    };
    //h5 打开支付
    OlPayView.prototype.openPayUrlByH5 = function (url) {
        cc.sys.openURL(Global.Toolkit.DealWithUrl(url));
        Global.UI.showSingleBox(Global.Language.getWord(1606) || "支付等待中");
    };
    //支付宝SDK订单
    OlPayView.prototype.openAliSDKByOrder = function (url) {
        var _this = this;
        if (AppHelper_1.default.enableAliPaySDK) {
            // 类型为支付宝支付时调用原生支付包支付
            Logger.log("SDK支付url：", url);
            Global.NativeEvent.checkAliPayInstalled(function (retObj) {
                if (retObj.result == 0) {
                    Logger.error("AliPayInstalled true");
                    Global.NativeEvent.paymentAliPayOrder(url, _this.paymentOrderCallBack.bind(_this));
                }
                else if (retObj.result == -1) {
                    Global.UI.showSingleBox("请先安装支付宝", null);
                }
            });
        }
        else {
            Global.UI.showSingleBox("当前版本不支持支付宝，请更新到最新版本", null);
        }
    };
    //DPaySDK订单
    OlPayView.prototype.openDPayByOrder = function (url, token, le_pay_url) {
        if (AppHelper_1.default.enableSDKPay) {
            Global.NativeEvent.paymentDPayWithToken(token, url, le_pay_url, function (retObj) {
            });
        }
        else {
            Global.UI.showSingleBox("当前版本不支持Upay支付方式", null);
        }
    };
    //微信SDK订单
    OlPayView.prototype.openWXByOrder = function (url) {
        var _this = this;
        if (AppHelper_1.default.enableWXSDK) {
            // 类型为支付宝支付时调用原生支付包支付
            Logger.log("微信SDK支付url：", url);
            Global.NativeEvent.checkWXInstall(function (retObj) {
                if (retObj.result == 0) {
                    Logger.error("WXInstalled true");
                    Global.NativeEvent.paymentWXPayOrder(url, _this.paymentOrderCallBack.bind(_this));
                }
                else if (retObj.result == -1) {
                    Global.UI.showSingleBox("请先安装微信", null);
                }
            });
        }
        else {
            Global.UI.showSingleBox("当前版本不支持微信支付，请更新到最新版本", null);
        }
    };
    //UPaySDK订单
    OlPayView.prototype.openUPayByOrder = function (url, token, le_pay_url) {
        if (AppHelper_1.default.enableUPay) {
            Global.NativeEvent.paymentUPayWithToken(token, url, le_pay_url, function (retObj) {
            });
        }
        else {
            Global.UI.showSingleBox("当前版本不支持Dpay支付方式", null);
        }
    };
    //SDK订单支付
    OlPayView.prototype.openSDKByOrder = function (payStr) {
        var _this = this;
        if (AppHelper_1.default.enableSDK) {
            Global.NativeEvent.paymentSDKWithUrl(payStr, function (retObj) {
                if (retObj.result == 0) {
                    Logger.error("openSDKByOrder true");
                    _this.model.event(RechargeModel_1.default.ShowWaitingAnim, false);
                }
                else {
                    Global.UI.showSingleBox("订单获取失败,请稍后再试", null);
                    _this.model.event(RechargeModel_1.default.ShowWaitingAnim, false);
                }
            });
        }
        else {
            Global.UI.showSingleBox("当前版本不支持SDK支付方式", null);
        }
    };
    //SDK订单支付
    OlPayView.prototype.openLibByOrder = function (payStr) {
        var _this = this;
        Global.NativeEvent.payLibWithUrl(payStr, function (retObj) {
            if (retObj.result == 0) {
                Logger.error("openSDKByOrder true");
                _this.model.event(RechargeModel_1.default.ShowWaitingAnim, false);
            }
            else {
                Global.UI.showSingleBox("订单获取失败,请稍后再试", null);
                _this.model.event(RechargeModel_1.default.ShowWaitingAnim, false);
            }
        });
    };
    //支付宝h5转native 
    OlPayView.prototype.openAliSDKInterceptorWithUrl = function (url) {
        var _this = this;
        if (AppHelper_1.default.enableAliPaySDK) {
            if (AppHelper_1.default.enableAliPayInterceptorWithUrl) {
                if (AppHelper_1.default.enableAliPayCheckInstall) {
                    Global.NativeEvent.checkAliPayInstalled(function (retObj) {
                        if (retObj.result == 0) {
                            Logger.error("AliPayInstalled true");
                            Logger.log("openAliSDKInterceptorWithUrl url：", url);
                            Global.NativeEvent.aliPayInterceptorWithUrl(url, _this.aliPayInterceptorWithUrlCallBack.bind(_this));
                        }
                        else {
                            Logger.error("AliPayInstalled false");
                            _this.openPayUrlByH5(url);
                        }
                    });
                }
                else {
                    Logger.error("enableAliPayCheckInstall false");
                    this.openPayUrlByH5(url);
                }
            }
            else {
                Logger.log("openAliSDKInterceptorWithUrl  enableAliPayInterceptorWithUrl = false url：", url);
                this.openPayUrlByH5(url);
            }
        }
        else {
            Logger.error("openAliSDKInterceptorWithUrl enableAliPaySDK = false open url");
            this.openPayUrlByH5(url);
        }
    };
    OlPayView.prototype.aliPayInterceptorWithUrlCallBack = function (retObj) {
        if (!retObj) {
            Logger.error("aliPayInterceptorWithUrlCallBack retObj == null");
            return;
        }
        var ret = Number(retObj.result);
        if (ret == 0) {
            Logger.error("aliPayInterceptorWithUrl success and wait money");
        }
        else {
            Logger.error("aliPayInterceptorWithUrl failed");
            this.openPayUrlByH5(this.curPayUrl);
        }
    };
    OlPayView.prototype.checkPayrUrlValid = function (url) {
        if (url != null && url != "") {
            return true;
        }
        return false;
    };
    //支付宝h5 授权 url
    OlPayView.prototype.openAliSDKAuthWithUrl = function (url, attach_param) {
        var _this = this;
        if (attach_param === void 0) { attach_param = {}; }
        if (AppHelper_1.default.enableAliPaySDK) {
            if (AppHelper_1.default.enableAliPayAuthWithUrl) {
                if (AppHelper_1.default.enableAliPayCheckInstall) {
                    Global.NativeEvent.checkAliPayInstalled(function (retObj) {
                        if (retObj.result == 0) {
                            Logger.error("AliPayInstalled true");
                            Logger.log("openAliSDKAuthWithUrl url：", url);
                            Logger.log("openAliSDKAuthWithUrl orderNo", _this.orderNo);
                            Global.NativeEvent.aliPayAuthWithUrl(url, attach_param, _this.orderNo, _this.aliPayAuthWithUrlCallBack.bind(_this));
                        }
                        else {
                            Logger.error("openAliSDKAuthWithUrl() AliPayInstalled false");
                        }
                    });
                }
                else {
                    Logger.error("openAliSDKAuthWithUrl() enableAliPayCheckInstall false");
                }
            }
            else {
                Logger.error("openAliSDKAuthWithUrl()  enableAliPayAuthWithUrl = false url：", url);
            }
        }
        else {
            Logger.error("openAliSDKAuthWithUrl() enableAliPaySDK = false open url");
        }
    };
    OlPayView.prototype.aliPayAuthWithUrlCallBack = function (retObj) {
        if (!retObj) {
            Logger.error("aliPayAuthWithUrlCallBack retObj == null");
            return;
        }
        var ret = Number(retObj.result);
        if (ret == 0) {
            Logger.error("aliPayAuthWithUrlCallBack success and wait money");
        }
        else {
            Logger.error("aliPayAuthWithUrlCallBack failed");
            this.openPayUrlByH5(this.curPayUrl);
        }
    };
    OlPayView.prototype.openAliSDKAuthWithAppID = function (appid) {
        var _this = this;
        if (AppHelper_1.default.enableAliPaySDK) {
            if (AppHelper_1.default.enableAliPayAuthWithUrl) {
                if (AppHelper_1.default.enableAliPayCheckInstall) {
                    Global.NativeEvent.checkAliPayInstalled(function (retObj) {
                        if (retObj.result == 0) {
                            Logger.error("AliPayInstalled true");
                            Logger.log("openAliSDKAuthWithAppID appid:", appid);
                            Logger.log("openAliSDKAuthWithAppID order_no:", _this.orderNo);
                            Global.NativeEvent.aliPayAuthWithAppID(appid, _this.orderNo, _this.aliPayAuthWithAppIDCallBack.bind(_this));
                        }
                        else {
                            Logger.error("openAliSDKAuthWithAppID() AliPayInstalled false");
                            Global.UI.showSingleBox("请先安装支付宝!", null);
                        }
                    });
                }
                else {
                    Logger.error("openAliSDKAuthWithAppID() enableAliPayCheckInstall false");
                }
            }
            else {
                Logger.error("openAliSDKAuthWithAppID()  enableAliPayAuthWithUrl = false url：", appid);
            }
        }
        else {
            Logger.error("openAliSDKAuthWithAppID() enableAliPaySDK = false open url");
        }
    };
    OlPayView.prototype.aliPayAuthWithAppIDCallBack = function (retObj) {
        if (!retObj) {
            Logger.error("aliPayAuthWithAppIDCallBack retObj == null");
            return;
        }
        var ret = Number(retObj.result);
        if (ret == 0) {
            Logger.error("aliPayAuthWithAppIDCallBack success and wait money");
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
            Logger.error("aliPayAuthWithAppIDCallBack failed");
        }
    };
    OlPayView.prototype.openAliSDKAuthWithPayAuthInfo = function (jsonStr) {
        var _this = this;
        if (AppHelper_1.default.enableAliPaySDK) {
            if (AppHelper_1.default.enableAliPayAuthWithPayAuthInfo) {
                if (AppHelper_1.default.enableAliPayCheckInstall) {
                    Global.NativeEvent.checkAliPayInstalled(function (retObj) {
                        if (retObj.result == 0) {
                            Logger.error("AliPayInstalled true");
                            var jsonObj = JSON.parse(jsonStr);
                            var payAuthInfo = jsonObj.payAuthInfo;
                            var payUrl = jsonObj.payUrl;
                            if (payAuthInfo && payUrl) {
                                Logger.log("openAliSDKAuthWithPayAuthInfo payAuthInfo:", payAuthInfo);
                                Logger.log("openAliSDKAuthWithPayAuthInfo payUrl:", payUrl);
                                Logger.log("openAliSDKAuthWithPayAuthInfo order_no:", _this.orderNo);
                                Global.NativeEvent.aliPayAuthWithPayAuthInfo(payAuthInfo, payUrl, _this.orderNo, _this.aliPayAuthWithPayAuthInfoCallBack.bind(_this));
                            }
                            else {
                                Logger.log("openAliSDKAuthWithPayAuthInfo payAuthInfo payUrl not invalid");
                            }
                        }
                        else {
                            Logger.error("openAliSDKAuthWithPayAuthInfo() AliPayInstalled false");
                            Global.UI.showSingleBox("请先安装支付宝!", null);
                        }
                    });
                }
                else {
                    Logger.error("openAliSDKAuthWithPayAuthInfo() enableAliPayCheckInstall false");
                }
            }
            else {
                Logger.error("openAliSDKAuthWithPayAuthInfo()  enableAliPayAuthWithPayAuthInfo = false url：", jsonStr);
            }
        }
        else {
            Logger.error("openAliSDKAuthWithPayAuthInfo() enableAliPaySDK = false open url");
        }
    };
    OlPayView.prototype.aliPayAuthWithPayAuthInfoCallBack = function (retObj) {
        if (!retObj) {
            Logger.error("aliPayAuthWithPayAuthInfoCallBack retObj == null");
            return;
        }
        var ret = Number(retObj.result);
        if (ret == 0) {
            Logger.error("aliPayAuthWithPayAuthInfoCallBack success and wait money");
            //原始逻辑是要拿到authcode后请求，但是会出现切后台请求被关掉问题。此请求放到原生来做。
        }
        else {
            Logger.error("aliPayAuthWithPayAuthInfoCallBack failed");
        }
    };
    //老版本支付判断逻辑
    OlPayView.prototype.oldPayUrlLogic = function (url) {
        if (this.checkPayrUrlValid(url)) {
            if (url.startsWith('http')) {
                this.openPayUrlByH5(url);
            }
            else if (url.startsWith('weixin')) {
                this.openWXByOrder(url);
            }
            else {
                this.openAliSDKByOrder(url);
            }
        }
        else {
            Logger.error("pay_sdk_type = null invalid url ++++++");
        }
    };
    OlPayView.prototype.onGetPayUrl = function (result, data) {
        // console.error(data);
        var pay_sdk_type = data.pay_sdk_type;
        if (pay_sdk_type != null && pay_sdk_type != undefined && pay_sdk_type != 12 && pay_sdk_type != 13) { //sdk支付走回调关闭
            this.model.event(RechargeModel_1.default.ShowWaitingAnim, false);
        }
        if (result == 0) {
            var url = data.url;
            this.curPayUrl = url;
            //pay_sdk_type   1原有 url 模式  2  现在支付宝SDK   3 h5转sdk native模式 0 之前的版本
            var order_no = data.order_no;
            this.orderNo = order_no;
            if (pay_sdk_type != null) { // 新版本加入的字段
                if (this.checkPayrUrlValid(url)) {
                    switch (pay_sdk_type) {
                        case 0: //有这种可能性，配置没有生效
                            this.oldPayUrlLogic(url);
                            break;
                        case 1: // 1原有 url 模式
                            this.openPayUrlByH5(url);
                            break;
                        case 2: //2现在支付宝SDK
                            this.openAliSDKByOrder(url);
                            break;
                        case 3: //3 h5转sdk native模式
                            this.openAliSDKInterceptorWithUrl(url);
                            break;
                        case 4: //4 支付宝授权
                            //附件参数, json格式的字符串
                            var paramStr = data.attach_param || "{}";
                            var attach_param = JSON.parse(paramStr);
                            this.openAliSDKAuthWithUrl(url, attach_param);
                            break;
                        case 5: //支付宝授权直接通过AppID获取authcode
                            var appid = url;
                            this.openAliSDKAuthWithAppID(appid);
                            break;
                        case 6:
                            this.openAliSDKAuthWithPayAuthInfo(url);
                            break;
                        case 7: //DPaySDK支付
                            this.openDPayByOrder(url, data.token, data.le_pay_url);
                            break;
                        case 9: //Upay支付
                            this.openUPayByOrder(url, data.token, data.le_pay_url);
                            break;
                        case 10: //扫码支付
                            this.showScanCodeView(data);
                            break;
                        case 11: //微信SDK支付
                            this.openWXByOrder(url);
                            break;
                        case 12: //SDK支付
                            this.openSDKByOrder(url);
                            break;
                        case 13: //果子SDK支付
                            this.openLibByOrder(url);
                            break;
                    }
                }
                else {
                    Logger.error("pay_sdk_type = " + pay_sdk_type + " invalid url ++++++");
                }
            }
            else { //没有该字段走老的模式
                this.oldPayUrlLogic(url);
            }
        }
        else if (result == 2) {
            var errno = data._errno;
            if (errno) {
                Global.UI.fastTip(data._errstr);
            }
        }
        else {
            Global.UI.fastTip("支付失败，请尝试其他充值方式");
        }
    };
    OlPayView.prototype.paymentOrderCallBack = function (result) {
        Logger.log("支付返回的参数", result);
    };
    OlPayView.prototype.onSubViewHide = function () {
        Global.HallServer.off(NetEvent_1.NetAppface.UserDownPay, this, this.onReqOrder);
        this.model.off(RechargeModel_1.default.GetPayUrlResult, this, this.onGetPayUrl);
    };
    OlPayView.prototype.resetSelect = function () {
        if (!this.node)
            return;
        if (this.payTipsLbl) {
            this.payTipsLbl.string = "请选择充值金额";
        }
        // this.payTipsLbl.node.color = new cc.Color(160, 116, 56);
        this.scanCodeView.subViewState = false;
        if (this.itemList[this.curBtnIndex]) {
            this.itemList[this.curBtnIndex].isChecked = false;
        }
    };
    OlPayView.prototype.hideAllItems = function () {
        for (var i = 0; i < this.itemList.length; i++) {
            this.itemList[i].active = false;
        }
    };
    return OlPayView;
}(ViewBase_1.default));
exports.default = OlPayView;
var ToggleItem = /** @class */ (function (_super) {
    __extends(ToggleItem, _super);
    function ToggleItem(node, callback, target) {
        var _this = _super.call(this) || this;
        _this.callback = callback;
        _this.target = target;
        _this.valueLbl = [];
        _this.checked = false;
        _this.setNode(node);
        return _this;
    }
    ToggleItem.prototype.initView = function () {
        this.addCommonClick("", this.onToggleClick, this);
        this.valueLbl.push(this.getComponent("Background/valueLbl", cc.Label));
        this.valueLbl.push(this.getComponent("checkmark/valueLbl", cc.Label));
        this.bg = this.getChild("Background");
        this.checkBg = this.getChild("checkmark");
    };
    ToggleItem.prototype.initItemData = function (index, money) {
        this.index = index;
        this.valueLbl[0].string = String(money);
        this.valueLbl[1].string = String(money);
    };
    Object.defineProperty(ToggleItem.prototype, "isChecked", {
        get: function () {
            return this.checked;
        },
        set: function (value) {
            if (this.checked != value) {
                this.checked = value;
            }
            this.setItemStyle();
        },
        enumerable: false,
        configurable: true
    });
    ToggleItem.prototype.onToggleClick = function () {
        if (this.callback) {
            this.callback.call(this.target, this.index);
        }
        this.isChecked = true;
    };
    ToggleItem.prototype.setItemStyle = function () {
        this.bg.active = !this.isChecked;
        this.checkBg.active = this.isChecked;
    };
    return ToggleItem;
}(ViewBase_1.default));

cc._RF.pop();