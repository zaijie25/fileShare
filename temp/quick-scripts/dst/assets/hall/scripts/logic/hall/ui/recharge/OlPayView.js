
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/OlPayView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcT2xQYXlWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQUNqRCx5RUFBb0U7QUFDcEUsNERBQTZEO0FBQzdELDBEQUFxRDtBQUVyRCwrQ0FBMEM7QUFHMUM7SUFBdUMsNkJBQVE7SUFBL0M7UUFBQSxxRUE4akJDO1FBM2pCVyxXQUFLLEdBQUcsdUJBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3JDLGNBQVEsR0FBc0IsRUFBRSxDQUFDO1FBQ2pDLGNBQVEsR0FBa0IsRUFBRSxDQUFDO1FBQzdCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFJekIsZUFBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixhQUFPLEdBQVcsRUFBRSxDQUFDOztJQW1qQmpDLENBQUM7SUE1aUJhLDRCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsd0JBQXdCLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7UUFDNUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsOEJBQThCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3ZGLElBQUks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SUFDNUMsQ0FBQztJQUVELHNCQUFXLGlDQUFTO2FBT3BCO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7YUFURCxVQUFxQixLQUFjO1lBQy9CLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxLQUFLLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1lBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBTU8sa0NBQWEsR0FBckI7UUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQztRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFTyxpQ0FBWSxHQUFwQjtRQUNJLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3pDLENBQUM7SUFDTCxpQkFBQztBQUFELENBaERBLEFBZ0RDLENBaER3QixrQkFBUSxHQWdEaEMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IFJlY2hhcmdlTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvUmVjaGFyZ2VNb2RlbFwiO1xyXG5pbXBvcnQgeyBOZXRBcHBmYWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvbmV0L2hhbGwvTmV0RXZlbnRcIjtcclxuaW1wb3J0IEFwcEhlbHBlciBmcm9tIFwiLi4vLi4vLi4vY29yZS90b29sL0FwcEhlbHBlclwiO1xyXG5pbXBvcnQgSGFsbFN0b3JhZ2VLZXkgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vY29uc3QvSGFsbFN0b3JhZ2VLZXlcIjtcclxuaW1wb3J0IFNjYW5Db2RlVmlldyBmcm9tIFwiLi9TY2FuQ29kZVZpZXdcIjtcclxuaW1wb3J0IHsgTG9hZGluZ1N0YXRlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2xQYXlWaWV3IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgcHJpdmF0ZSBwYXlUaXBzTGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgcGF5S2V5OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG5WaWV3ID0gUmVjaGFyZ2VNb2RlbC5QYXlUeXBlLldlY2hhdDtcclxuICAgIHByaXZhdGUgaXRlbUxpc3Q6IEFycmF5PFRvZ2dsZUl0ZW0+ID0gW107XHJcbiAgICBwcml2YXRlIG1vbmV5QXJyOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICBwcml2YXRlIGN1ckJ0bkluZGV4OiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgYnRuTGF5b3V0OiBjYy5MYXlvdXQ7XHJcbiAgICBwcml2YXRlIG1vZGVsOiBSZWNoYXJnZU1vZGVsO1xyXG4gICAgcHJpdmF0ZSBkYXRhOiBhbnk7XHJcbiAgICBwcml2YXRlIGN1clBheVVybDogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgb3JkZXJObzogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgYmFua0FjY291bnRFZGl0Qm94OiBjYy5FZGl0Qm94XHJcbiAgICBwcml2YXRlIG5hbWVFZGl0Qm94OiBjYy5FZGl0Qm94XHJcbiAgICBwcml2YXRlIGluZm9Ob2RlOiBjYy5Ob2RlXHJcbiAgICBwcml2YXRlIHNjYW5Db2RlVmlldzpTY2FuQ29kZVZpZXdcclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUmVjaGFyZ2VNb2RlbFwiKTtcclxuICAgICAgICB0aGlzLnBheVRpcHNMYmwgPSB0aGlzLmdldENvbXBvbmVudChcIm5vZGUvSW5wdXRCb3gvbW9uZXlMYmxcIiwgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuYnRuTGF5b3V0ID0gdGhpcy5nZXRDb21wb25lbnQoXCJidG5MYXlvdXRcIiwgY2MuTGF5b3V0KTtcclxuICAgICAgICB0aGlzLmluZm9Ob2RlID0gdGhpcy5nZXRDaGlsZChcIkluZm9ub2RlXCIpXHJcbiAgICAgICAgdGhpcy5pbmZvTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuYmFua0FjY291bnRFZGl0Qm94ID0gdGhpcy5nZXRDb21wb25lbnQoXCJJbmZvbm9kZS91bmlvbkFjY291bnRFZGl0Qm94XCIsIGNjLkVkaXRCb3gpXHJcbiAgICAgICAgdGhpcy5uYW1lRWRpdEJveCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiSW5mb25vZGUvbmFtZUVkaXRCb3hcIiwgY2MuRWRpdEJveClcclxuICAgICAgICB0aGlzLmJ0bkxheW91dC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImdvVG9QYXlCdG5cIiwgdGhpcy5nb1RvUGF5LCB0aGlzKTtcclxuICAgICAgICB0aGlzLmluaXRUb2dnbGVMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5zY2FuQ29kZVZpZXcgPSA8U2NhbkNvZGVWaWV3PnRoaXMuYWRkVmlldyhcIlNjYW5Db2RlVmlld1wiLCB0aGlzLmdldENoaWxkKFwiU2NhbkNvZGVWaWV3XCIpLCBTY2FuQ29kZVZpZXcsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRUb2dnbGVMaXN0KCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdG9nZ2xlID0gdGhpcy5nZXRDaGlsZChcImJ0bkxheW91dC90b2dnbGVcIiArIFN0cmluZyhpKSk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gbmV3IFRvZ2dsZUl0ZW0odG9nZ2xlLCB0aGlzLm9uSXRlbUNsaWNrLCB0aGlzKTtcclxuICAgICAgICAgICAgaXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1MaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDmjInpkq7liJfooajnmoTpgILphY0gIOazqOaEj+S4jeWPr+mikee5geWPmOWKqGJ0bkxheW91dOWkp+Wwj++8jOW8gOmUgOWkp1xyXG4gICAgICAgIC8vIHRoaXMuYnRuTGF5b3V0Lm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGxldCB3ID0gdGhpcy5idG5MYXlvdXQubm9kZS53aWR0aDtcclxuICAgICAgICAvLyAgICAgbGV0IHRtcFcgPSB0aGlzLml0ZW1MaXN0WzBdLm5vZGUud2lkdGg7XHJcbiAgICAgICAgLy8gICAgIGxldCBzcGFjZVggPSAodyAtIHRtcFcgKiA0KSAvIDU7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYnRuTGF5b3V0LnBhZGRpbmdMZWZ0ID0gc3BhY2VYO1xyXG4gICAgICAgIC8vICAgICB0aGlzLmJ0bkxheW91dC5zcGFjaW5nWCA9IHNwYWNlWDtcclxuICAgICAgICAvLyB9KVxyXG4gICAgICAgIHRoaXMuYmFua0FjY291bnRFZGl0Qm94LnN0cmluZyA9IFwi6K+36L6T5YWl6ZO26KGM5Y2h5Y+3XCJcclxuICAgICAgICB0aGlzLm5hbWVFZGl0Qm94LnN0cmluZyA9IFwi6K+36L6T5YWl5aeT5ZCNXCJcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2hvd1NjYW5Db2RlVmlldyhkYXRhKSB7XHJcbiAgICAgICAgaWYodGhpcy5zY2FuQ29kZVZpZXcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNjYW5Db2RlVmlldy5kYXRhID0gZGF0YVxyXG4gICAgICAgICAgICB0aGlzLnNjYW5Db2RlVmlldy5zdWJWaWV3U3RhdGUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkl0ZW1DbGljayhudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucGF5VGlwc0xibC5zdHJpbmcgPSBTdHJpbmcodGhpcy5tb25leUFycltudW1dKTtcclxuICAgICAgICAvLyB0aGlzLnBheVRpcHNMYmwubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigxNjAsIDExNiwgNTYpO1xyXG4gICAgICAgIGlmICh0aGlzLmN1ckJ0bkluZGV4ICE9IG51bSkge1xyXG4gICAgICAgICAgICBsZXQgY3VySXRlbSA9IHRoaXMuaXRlbUxpc3RbdGhpcy5jdXJCdG5JbmRleF07XHJcbiAgICAgICAgICAgIGlmIChjdXJJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJJdGVtLmlzQ2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3VyQnRuSW5kZXggPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0RGF0YSh2aWV3SW5kZXg6IHN0cmluZywgZGF0YSkge1xyXG4gICAgICAgIHRoaXMucmVzZXRTZWxlY3QoKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMublZpZXcgPSB2aWV3SW5kZXg7XHJcbiAgICAgICAgdGhpcy5wYXlLZXkgPSBkYXRhLmlkO1xyXG4gICAgICAgIHRoaXMubW9uZXlBcnIgPSBkYXRhLnBheV9udW1fbGlzdCB8fCBbXTtcclxuICAgICAgICB0aGlzLm1vbmV5QXJyLnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGEgLSBiIH0pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5pdGVtTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbUxpc3RbaV07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1vbmV5QXJyW2ldKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmluaXRJdGVtRGF0YShpLCB0aGlzLm1vbmV5QXJyW2ldKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ29Ub1BheSgpIHtcclxuICAgICAgICBsZXQgc3RyID0gdGhpcy5wYXlUaXBzTGJsLnN0cmluZztcclxuICAgICAgICBpZiAoc3RyID09ICcnIHx8IGlzTmFOKE51bWJlcihzdHIpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gR2xvYmFsLlVJLmZhc3RUaXAoXCLor7fpgInmi6nlhYXlgLzph5Hpop1cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKEdsb2JhbC5QbGF5ZXJEYXRhLnBob25lKVxyXG4gICAgICAgIGlmKHRoaXMubW9kZWwubmVlZF9iaW5kX3Bob25lICYmIEdsb2JhbC5QbGF5ZXJEYXRhLnBob25lID09IFwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gR2xvYmFsLlVJLmZhc3RUaXAoXCLkuLrkuobmgqjnmoTotKLkuqflronlhajvvIzor7flhYjnu5HlrprmiYvmnLrlj7fnoIHlkI7lho3lhYXlgLxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhdHRhY2ggPSB7XHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIuWKoOiXpFwiLFxyXG4gICAgICAgICAgICBcImNhcmRcIjogXCIxMjU0MjI0NTU0MjEyNVwiLFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiAodGhpcy5uVmlldyA9PSBSZWNoYXJnZU1vZGVsLlBheVR5cGUuVW5pb25GYXN0KSB7XHJcbiAgICAgICAgLy8gICAgIGlmICghdGhpcy5jaGVja1RleHRFbXB0eUFuZFNob3dUaXBzKHRoaXMubmFtZUVkaXRCb3guc3RyaW5nLCBcIuWnk+WQjeS4jeiDveS4uuepulwiKSlcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyAgICAgaWYgKCF0aGlzLmNoZWNrVGV4dEVtcHR5QW5kU2hvd1RpcHModGhpcy5iYW5rQWNjb3VudEVkaXRCb3guc3RyaW5nLCBcIui0puaIt+S4jeiDveS4uuepulwiKSlcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYgKHRoaXMublZpZXcuaW5kZXhPZihSZWNoYXJnZU1vZGVsLlBheVR5cGUuVW5pb24pID4gLTEpIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRSZWNoYW5nZUJhbmtJbmZvXCIsIHN0ciwgdGhpcy5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwucmVxR2V0VXNlckRvd25QYXkodGhpcy5uVmlldywgTnVtYmVyKHN0ciksIHRoaXMucGF5S2V5LCBKU09OLnN0cmluZ2lmeShhdHRhY2gpKTtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIuaUr+S7mOivt+axguS4rS0tLS1cIiwgdGhpcy5wYXlLZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrVGV4dEVtcHR5QW5kU2hvd1RpcHModGV4dDogc3RyaW5nLCB0aXBzTGFiZWw6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKHRpcHNMYWJlbCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld1Nob3coKSB7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIub24oTmV0QXBwZmFjZS5Vc2VyRG93blBheSwgdGhpcywgdGhpcy5vblJlcU9yZGVyKTtcclxuICAgICAgICB0aGlzLm1vZGVsLm9uKFJlY2hhcmdlTW9kZWwuR2V0UGF5VXJsUmVzdWx0LCB0aGlzLCB0aGlzLm9uR2V0UGF5VXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uUmVxT3JkZXIoZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIGxldCBvcmRlciA9IGRhdGEub3JkZXJfaWQ7XHJcbiAgICAgICAgaWYgKG9yZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwuZXZlbnQoUmVjaGFyZ2VNb2RlbC5TaG93V2FpdGluZ0FuaW0sIHRydWUsIHRoaXMublZpZXcpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLnJlcUdldFBheVVybChvcmRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqIOivt+axgue7keWumuS/oeaBr1xyXG4gICAgICogQHBhcmFtIGJpbmRfdHlwZSAw5YWo6YOoIDHpk7booYzljaEgMuaUr+S7mOWunVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVxR2V0QmFua0luZm8oYk5ldzpib29sZWFuID0gZmFsc2Upe1xyXG4gICAgICAgIGxldCBfcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIFwiYmluZF90eXBlXCI6IDAsIFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCxOZXRBcHBmYWNlLkdldEJhbmtJbmZvLF9wYXJhbSx0aGlzLm9uUmVzR2V0QmFua0luZm8uYmluZCh0aGlzKSwgbnVsbCwgdHJ1ZSwgNjApO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG9uUmVzR2V0QmFua0luZm8oZGF0YSA6IGFueSlcclxuICAgIHtcclxuICAgICAgICBpZihkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5iYW5rQWNjb3VudEVkaXRCb3guc3RyaW5nID0gZGF0YS5lbnRydXNfYmFua19hY2NvdW50XHJcbiAgICAgICAgICAgIHRoaXMubmFtZUVkaXRCb3guc3RyaW5nID0gZGF0YS5lbnRydXNfYmFua191c2VyXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vaDUg5omT5byA5pSv5LuYXHJcbiAgICBwcml2YXRlIG9wZW5QYXlVcmxCeUg1KHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgY2Muc3lzLm9wZW5VUkwoR2xvYmFsLlRvb2xraXQuRGVhbFdpdGhVcmwodXJsKSk7XHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goR2xvYmFsLkxhbmd1YWdlLmdldFdvcmQoMTYwNikgfHwgXCLmlK/ku5jnrYnlvoXkuK1cIik7XHJcbiAgICB9XHJcbiAgICAvL+aUr+S7mOWunVNES+iuouWNlVxyXG4gICAgcHJpdmF0ZSBvcGVuQWxpU0RLQnlPcmRlcih1cmw6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChBcHBIZWxwZXIuZW5hYmxlQWxpUGF5U0RLKSB7XHJcbiAgICAgICAgICAgIC8vIOexu+Wei+S4uuaUr+S7mOWuneaUr+S7mOaXtuiwg+eUqOWOn+eUn+aUr+S7mOWMheaUr+S7mFxyXG4gICAgICAgICAgICBMb2dnZXIubG9nKFwiU0RL5pSv5LuYdXJs77yaXCIsIHVybCk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5jaGVja0FsaVBheUluc3RhbGxlZCgocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0T2JqLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiQWxpUGF5SW5zdGFsbGVkIHRydWVcIilcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQucGF5bWVudEFsaVBheU9yZGVyKHVybCwgdGhpcy5wYXltZW50T3JkZXJDYWxsQmFjay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHJldE9iai5yZXN1bHQgPT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi6K+35YWI5a6J6KOF5pSv5LuY5a6dXCIsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIuW9k+WJjeeJiOacrOS4jeaUr+aMgeaUr+S7mOWune+8jOivt+abtOaWsOWIsOacgOaWsOeJiOacrFwiLCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL0RQYXlTREvorqLljZVcclxuICAgIHByaXZhdGUgb3BlbkRQYXlCeU9yZGVyKHVybDogc3RyaW5nLHRva2VuOiBzdHJpbmcsbGVfcGF5X3VybDpzdHJpbmcpIHtcclxuICAgICAgICBpZiAoQXBwSGVscGVyLmVuYWJsZVNES1BheSkge1xyXG4gICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQucGF5bWVudERQYXlXaXRoVG9rZW4odG9rZW4sdXJsLGxlX3BheV91cmwsIChyZXRPYmopID0+e1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi5b2T5YmN54mI5pys5LiN5pSv5oyBVXBheeaUr+S7mOaWueW8j1wiLCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+W+ruS/oVNES+iuouWNlVxyXG4gICAgcHJpdmF0ZSBvcGVuV1hCeU9yZGVyKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKEFwcEhlbHBlci5lbmFibGVXWFNESykge1xyXG4gICAgICAgICAgICAvLyDnsbvlnovkuLrmlK/ku5jlrp3mlK/ku5jml7bosIPnlKjljp/nlJ/mlK/ku5jljIXmlK/ku5hcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIuW+ruS/oVNES+aUr+S7mHVybO+8mlwiLCB1cmwpO1xyXG4gICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuY2hlY2tXWEluc3RhbGwoKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldE9iai5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIldYSW5zdGFsbGVkIHRydWVcIilcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQucGF5bWVudFdYUGF5T3JkZXIodXJsLCB0aGlzLnBheW1lbnRPcmRlckNhbGxCYWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYocmV0T2JqLnJlc3VsdCA9PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3dTaW5nbGVCb3goXCLor7flhYjlronoo4Xlvq7kv6FcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi5b2T5YmN54mI5pys5LiN5pSv5oyB5b6u5L+h5pSv5LuY77yM6K+35pu05paw5Yiw5pyA5paw54mI5pysXCIsIG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vVVBheVNES+iuouWNlVxyXG4gICAgcHJpdmF0ZSBvcGVuVVBheUJ5T3JkZXIodXJsOiBzdHJpbmcsdG9rZW46IHN0cmluZyxsZV9wYXlfdXJsOnN0cmluZykge1xyXG4gICAgICAgIGlmIChBcHBIZWxwZXIuZW5hYmxlVVBheSkge1xyXG4gICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQucGF5bWVudFVQYXlXaXRoVG9rZW4odG9rZW4sdXJsLGxlX3BheV91cmwsIChyZXRPYmopID0+e1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi5b2T5YmN54mI5pys5LiN5pSv5oyBRHBheeaUr+S7mOaWueW8j1wiLCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL1NES+iuouWNleaUr+S7mFxyXG4gICAgcHJpdmF0ZSBvcGVuU0RLQnlPcmRlcihwYXlTdHI6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChBcHBIZWxwZXIuZW5hYmxlU0RLKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5wYXltZW50U0RLV2l0aFVybChwYXlTdHIsIChyZXRPYmopID0+e1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldE9iai5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIm9wZW5TREtCeU9yZGVyIHRydWVcIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmV2ZW50KFJlY2hhcmdlTW9kZWwuU2hvd1dhaXRpbmdBbmltLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1NpbmdsZUJveChcIuiuouWNleiOt+WPluWksei0pSzor7fnqI3lkI7lho3or5VcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5ldmVudChSZWNoYXJnZU1vZGVsLlNob3dXYWl0aW5nQW5pbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi5b2T5YmN54mI5pys5LiN5pSv5oyBU0RL5pSv5LuY5pa55byPXCIsIG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vU0RL6K6i5Y2V5pSv5LuYXHJcbiAgICBwcml2YXRlIG9wZW5MaWJCeU9yZGVyKHBheVN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LnBheUxpYldpdGhVcmwocGF5U3RyLCAocmV0T2JqKSA9PntcclxuICAgICAgICAgICAgaWYgKHJldE9iai5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwib3BlblNES0J5T3JkZXIgdHJ1ZVwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5ldmVudChSZWNoYXJnZU1vZGVsLlNob3dXYWl0aW5nQW5pbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi6K6i5Y2V6I635Y+W5aSx6LSlLOivt+eojeWQjuWGjeivlVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwuZXZlbnQoUmVjaGFyZ2VNb2RlbC5TaG93V2FpdGluZ0FuaW0sIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvL+aUr+S7mOWunWg16L2sbmF0aXZlIFxyXG4gICAgcHJpdmF0ZSBvcGVuQWxpU0RLSW50ZXJjZXB0b3JXaXRoVXJsKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKEFwcEhlbHBlci5lbmFibGVBbGlQYXlTREspIHtcclxuICAgICAgICAgICAgaWYgKEFwcEhlbHBlci5lbmFibGVBbGlQYXlJbnRlcmNlcHRvcldpdGhVcmwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChBcHBIZWxwZXIuZW5hYmxlQWxpUGF5Q2hlY2tJbnN0YWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNoZWNrQWxpUGF5SW5zdGFsbGVkKChyZXRPYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldE9iai5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiQWxpUGF5SW5zdGFsbGVkIHRydWVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJvcGVuQWxpU0RLSW50ZXJjZXB0b3JXaXRoVXJsIHVybO+8mlwiLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmFsaVBheUludGVyY2VwdG9yV2l0aFVybCh1cmwsIHRoaXMuYWxpUGF5SW50ZXJjZXB0b3JXaXRoVXJsQ2FsbEJhY2suYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJBbGlQYXlJbnN0YWxsZWQgZmFsc2VcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlblBheVVybEJ5SDUodXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiZW5hYmxlQWxpUGF5Q2hlY2tJbnN0YWxsIGZhbHNlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuUGF5VXJsQnlINSh1cmwpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIm9wZW5BbGlTREtJbnRlcmNlcHRvcldpdGhVcmwgIGVuYWJsZUFsaVBheUludGVyY2VwdG9yV2l0aFVybCA9IGZhbHNlIHVybO+8mlwiLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuUGF5VXJsQnlINSh1cmwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJvcGVuQWxpU0RLSW50ZXJjZXB0b3JXaXRoVXJsIGVuYWJsZUFsaVBheVNESyA9IGZhbHNlIG9wZW4gdXJsXCIpXHJcbiAgICAgICAgICAgIHRoaXMub3BlblBheVVybEJ5SDUodXJsKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFsaVBheUludGVyY2VwdG9yV2l0aFVybENhbGxCYWNrKHJldE9iaikge1xyXG4gICAgICAgIGlmICghcmV0T2JqKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImFsaVBheUludGVyY2VwdG9yV2l0aFVybENhbGxCYWNrIHJldE9iaiA9PSBudWxsXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJldCA9IE51bWJlcihyZXRPYmoucmVzdWx0KVxyXG4gICAgICAgIGlmIChyZXQgPT0gMCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJhbGlQYXlJbnRlcmNlcHRvcldpdGhVcmwgc3VjY2VzcyBhbmQgd2FpdCBtb25leVwiKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImFsaVBheUludGVyY2VwdG9yV2l0aFVybCBmYWlsZWRcIilcclxuICAgICAgICAgICAgdGhpcy5vcGVuUGF5VXJsQnlINSh0aGlzLmN1clBheVVybClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1BheXJVcmxWYWxpZCh1cmwpIHtcclxuICAgICAgICBpZiAodXJsICE9IG51bGwgJiYgdXJsICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aUr+S7mOWunWg1IOaOiOadgyB1cmxcclxuICAgIHByaXZhdGUgb3BlbkFsaVNES0F1dGhXaXRoVXJsKHVybDogc3RyaW5nLCBhdHRhY2hfcGFyYW06IGFueSA9IHt9KSB7XHJcbiAgICAgICAgaWYgKEFwcEhlbHBlci5lbmFibGVBbGlQYXlTREspIHtcclxuICAgICAgICAgICAgaWYgKEFwcEhlbHBlci5lbmFibGVBbGlQYXlBdXRoV2l0aFVybCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKEFwcEhlbHBlci5lbmFibGVBbGlQYXlDaGVja0luc3RhbGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuY2hlY2tBbGlQYXlJbnN0YWxsZWQoKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0T2JqLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJBbGlQYXlJbnN0YWxsZWQgdHJ1ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIm9wZW5BbGlTREtBdXRoV2l0aFVybCB1cmzvvJpcIiwgdXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJvcGVuQWxpU0RLQXV0aFdpdGhVcmwgb3JkZXJOb1wiLCB0aGlzLm9yZGVyTm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmFsaVBheUF1dGhXaXRoVXJsKHVybCwgYXR0YWNoX3BhcmFtLCB0aGlzLm9yZGVyTm8sIHRoaXMuYWxpUGF5QXV0aFdpdGhVcmxDYWxsQmFjay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIm9wZW5BbGlTREtBdXRoV2l0aFVybCgpIEFsaVBheUluc3RhbGxlZCBmYWxzZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIm9wZW5BbGlTREtBdXRoV2l0aFVybCgpIGVuYWJsZUFsaVBheUNoZWNrSW5zdGFsbCBmYWxzZVwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwib3BlbkFsaVNES0F1dGhXaXRoVXJsKCkgIGVuYWJsZUFsaVBheUF1dGhXaXRoVXJsID0gZmFsc2UgdXJs77yaXCIsIHVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIm9wZW5BbGlTREtBdXRoV2l0aFVybCgpIGVuYWJsZUFsaVBheVNESyA9IGZhbHNlIG9wZW4gdXJsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFsaVBheUF1dGhXaXRoVXJsQ2FsbEJhY2socmV0T2JqKSB7XHJcbiAgICAgICAgaWYgKCFyZXRPYmopIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiYWxpUGF5QXV0aFdpdGhVcmxDYWxsQmFjayByZXRPYmogPT0gbnVsbFwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXQgPSBOdW1iZXIocmV0T2JqLnJlc3VsdClcclxuICAgICAgICBpZiAocmV0ID09IDApIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiYWxpUGF5QXV0aFdpdGhVcmxDYWxsQmFjayBzdWNjZXNzIGFuZCB3YWl0IG1vbmV5XCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJhbGlQYXlBdXRoV2l0aFVybENhbGxCYWNrIGZhaWxlZFwiKVxyXG4gICAgICAgICAgICB0aGlzLm9wZW5QYXlVcmxCeUg1KHRoaXMuY3VyUGF5VXJsKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9wZW5BbGlTREtBdXRoV2l0aEFwcElEKGFwcGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoQXBwSGVscGVyLmVuYWJsZUFsaVBheVNESykge1xyXG4gICAgICAgICAgICBpZiAoQXBwSGVscGVyLmVuYWJsZUFsaVBheUF1dGhXaXRoVXJsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXBwSGVscGVyLmVuYWJsZUFsaVBheUNoZWNrSW5zdGFsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5jaGVja0FsaVBheUluc3RhbGxlZCgocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRPYmoucmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIkFsaVBheUluc3RhbGxlZCB0cnVlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwib3BlbkFsaVNES0F1dGhXaXRoQXBwSUQgYXBwaWQ6XCIsIGFwcGlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJvcGVuQWxpU0RLQXV0aFdpdGhBcHBJRCBvcmRlcl9ubzpcIiwgdGhpcy5vcmRlck5vKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5hbGlQYXlBdXRoV2l0aEFwcElEKGFwcGlkLCB0aGlzLm9yZGVyTm8sIHRoaXMuYWxpUGF5QXV0aFdpdGhBcHBJRENhbGxCYWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwib3BlbkFsaVNES0F1dGhXaXRoQXBwSUQoKSBBbGlQYXlJbnN0YWxsZWQgZmFsc2VcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi6K+35YWI5a6J6KOF5pSv5LuY5a6dIVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJvcGVuQWxpU0RLQXV0aFdpdGhBcHBJRCgpIGVuYWJsZUFsaVBheUNoZWNrSW5zdGFsbCBmYWxzZVwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwib3BlbkFsaVNES0F1dGhXaXRoQXBwSUQoKSAgZW5hYmxlQWxpUGF5QXV0aFdpdGhVcmwgPSBmYWxzZSB1cmzvvJpcIiwgYXBwaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJvcGVuQWxpU0RLQXV0aFdpdGhBcHBJRCgpIGVuYWJsZUFsaVBheVNESyA9IGZhbHNlIG9wZW4gdXJsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFsaVBheUF1dGhXaXRoQXBwSURDYWxsQmFjayhyZXRPYmopIHtcclxuICAgICAgICBpZiAoIXJldE9iaikge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJhbGlQYXlBdXRoV2l0aEFwcElEQ2FsbEJhY2sgcmV0T2JqID09IG51bGxcIilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmV0ID0gTnVtYmVyKHJldE9iai5yZXN1bHQpXHJcbiAgICAgICAgaWYgKHJldCA9PSAwKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImFsaVBheUF1dGhXaXRoQXBwSURDYWxsQmFjayBzdWNjZXNzIGFuZCB3YWl0IG1vbmV5XCIpXHJcbiAgICAgICAgICAgIC8v5Y6f5aeL6YC76L6R5piv6KaB5ou/5YiwYXV0aGNvZGXlkI7or7fmsYLvvIzkvYbmmK/kvJrlh7rnjrDliIflkI7lj7Dor7fmsYLooqvlhbPmjonpl67popjjgILmraTor7fmsYLmlL7liLDljp/nlJ/mnaXlgZrjgIJcclxuICAgICAgICAgICAgLy8gbGV0IGF1dGhfY29kZSA9IHJldE9iai5mdW5jUGFyYW1cclxuICAgICAgICAgICAgLy8gbGV0IG9yZGVyX25vID0gdGhpcy5vcmRlck5vXHJcbiAgICAgICAgICAgIC8vIGlmIChhdXRoX2NvZGUgJiYgb3JkZXJfbm8pe1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5tb2RlbC5yZXFPcmRlclN0ckJ5QXV0aENvZGUoYXV0aF9jb2RlLG9yZGVyX25vKVxyXG4gICAgICAgICAgICAvLyB9ZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICBMb2dnZXIuZXJyb3IoXCJhbGlQYXlBdXRoV2l0aEFwcElEQ2FsbEJhY2sgZmFpbGVkIHBhcmFtcyBlcnJvciBhdXRoX2NvZGUgPSBcIiArIGF1dGhfY29kZSArIFwiIG9yZGVyX25vID0gXCIgKyBvcmRlcl9ubyApXHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJhbGlQYXlBdXRoV2l0aEFwcElEQ2FsbEJhY2sgZmFpbGVkXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3BlbkFsaVNES0F1dGhXaXRoUGF5QXV0aEluZm8oanNvblN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKEFwcEhlbHBlci5lbmFibGVBbGlQYXlTREspIHtcclxuICAgICAgICAgICAgaWYgKEFwcEhlbHBlci5lbmFibGVBbGlQYXlBdXRoV2l0aFBheUF1dGhJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoQXBwSGVscGVyLmVuYWJsZUFsaVBheUNoZWNrSW5zdGFsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5jaGVja0FsaVBheUluc3RhbGxlZCgocmV0T2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRPYmoucmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIkFsaVBheUluc3RhbGxlZCB0cnVlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQganNvbk9iaiA9IEpTT04ucGFyc2UoanNvblN0cilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXlBdXRoSW5mbyA9IGpzb25PYmoucGF5QXV0aEluZm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXlVcmwgPSBqc29uT2JqLnBheVVybFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBheUF1dGhJbmZvICYmIHBheVVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJvcGVuQWxpU0RLQXV0aFdpdGhQYXlBdXRoSW5mbyBwYXlBdXRoSW5mbzpcIiwgcGF5QXV0aEluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJvcGVuQWxpU0RLQXV0aFdpdGhQYXlBdXRoSW5mbyBwYXlVcmw6XCIsIHBheVVybCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIm9wZW5BbGlTREtBdXRoV2l0aFBheUF1dGhJbmZvIG9yZGVyX25vOlwiLCB0aGlzLm9yZGVyTm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5hbGlQYXlBdXRoV2l0aFBheUF1dGhJbmZvKHBheUF1dGhJbmZvLCBwYXlVcmwsIHRoaXMub3JkZXJObywgdGhpcy5hbGlQYXlBdXRoV2l0aFBheUF1dGhJbmZvQ2FsbEJhY2suYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCJvcGVuQWxpU0RLQXV0aFdpdGhQYXlBdXRoSW5mbyBwYXlBdXRoSW5mbyBwYXlVcmwgbm90IGludmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwib3BlbkFsaVNES0F1dGhXaXRoUGF5QXV0aEluZm8oKSBBbGlQYXlJbnN0YWxsZWQgZmFsc2VcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93U2luZ2xlQm94KFwi6K+35YWI5a6J6KOF5pSv5LuY5a6dIVwiLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJvcGVuQWxpU0RLQXV0aFdpdGhQYXlBdXRoSW5mbygpIGVuYWJsZUFsaVBheUNoZWNrSW5zdGFsbCBmYWxzZVwiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwib3BlbkFsaVNES0F1dGhXaXRoUGF5QXV0aEluZm8oKSAgZW5hYmxlQWxpUGF5QXV0aFdpdGhQYXlBdXRoSW5mbyA9IGZhbHNlIHVybO+8mlwiLCBqc29uU3RyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwib3BlbkFsaVNES0F1dGhXaXRoUGF5QXV0aEluZm8oKSBlbmFibGVBbGlQYXlTREsgPSBmYWxzZSBvcGVuIHVybFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhbGlQYXlBdXRoV2l0aFBheUF1dGhJbmZvQ2FsbEJhY2socmV0T2JqKSB7XHJcbiAgICAgICAgaWYgKCFyZXRPYmopIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiYWxpUGF5QXV0aFdpdGhQYXlBdXRoSW5mb0NhbGxCYWNrIHJldE9iaiA9PSBudWxsXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJldCA9IE51bWJlcihyZXRPYmoucmVzdWx0KVxyXG4gICAgICAgIGlmIChyZXQgPT0gMCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJhbGlQYXlBdXRoV2l0aFBheUF1dGhJbmZvQ2FsbEJhY2sgc3VjY2VzcyBhbmQgd2FpdCBtb25leVwiKVxyXG4gICAgICAgICAgICAvL+WOn+Wni+mAu+i+keaYr+imgeaLv+WIsGF1dGhjb2Rl5ZCO6K+35rGC77yM5L2G5piv5Lya5Ye6546w5YiH5ZCO5Y+w6K+35rGC6KKr5YWz5o6J6Zeu6aKY44CC5q2k6K+35rGC5pS+5Yiw5Y6f55Sf5p2l5YGa44CCXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJhbGlQYXlBdXRoV2l0aFBheUF1dGhJbmZvQ2FsbEJhY2sgZmFpbGVkXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+iAgeeJiOacrOaUr+S7mOWIpOaWremAu+i+kVxyXG4gICAgcHJpdmF0ZSBvbGRQYXlVcmxMb2dpYyh1cmw6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrUGF5clVybFZhbGlkKHVybCkpIHtcclxuICAgICAgICAgICAgaWYgKHVybC5zdGFydHNXaXRoKCdodHRwJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlblBheVVybEJ5SDUodXJsKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHVybC5zdGFydHNXaXRoKCd3ZWl4aW4nKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuV1hCeU9yZGVyKHVybClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkFsaVNES0J5T3JkZXIodXJsKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwicGF5X3Nka190eXBlID0gbnVsbCBpbnZhbGlkIHVybCArKysrKytcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkdldFBheVVybChyZXN1bHQ6IG51bWJlciwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5lcnJvcihkYXRhKTtcclxuICAgICAgICBsZXQgcGF5X3Nka190eXBlID0gZGF0YS5wYXlfc2RrX3R5cGU7XHJcbiAgICAgICAgaWYocGF5X3Nka190eXBlICE9bnVsbCAmJiBwYXlfc2RrX3R5cGUgIT11bmRlZmluZWQgJiYgcGF5X3Nka190eXBlICE9MTIgICYmIHBheV9zZGtfdHlwZSAhPTEzKXsgLy9zZGvmlK/ku5jotbDlm57osIPlhbPpl61cclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5ldmVudChSZWNoYXJnZU1vZGVsLlNob3dXYWl0aW5nQW5pbSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmVzdWx0ID09IDApIHtcclxuICAgICAgICAgICAgbGV0IHVybCA9IGRhdGEudXJsO1xyXG4gICAgICAgICAgICB0aGlzLmN1clBheVVybCA9IHVybDtcclxuICAgICAgICAgICAgLy9wYXlfc2RrX3R5cGUgICAx5Y6f5pyJIHVybCDmqKHlvI8gIDIgIOeOsOWcqOaUr+S7mOWunVNESyAgIDMgaDXovaxzZGsgbmF0aXZl5qih5byPIDAg5LmL5YmN55qE54mI5pysXHJcbiAgICAgICAgICAgIGxldCBvcmRlcl9ubyA9IGRhdGEub3JkZXJfbm9cclxuICAgICAgICAgICAgdGhpcy5vcmRlck5vID0gb3JkZXJfbm9cclxuICAgICAgICAgICAgaWYgKHBheV9zZGtfdHlwZSAhPSBudWxsKSB7IC8vIOaWsOeJiOacrOWKoOWFpeeahOWtl+autVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tQYXlyVXJsVmFsaWQodXJsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocGF5X3Nka190eXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDogLy/mnInov5nnp43lj6/og73mgKfvvIzphY3nva7msqHmnInnlJ/mlYhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub2xkUGF5VXJsTG9naWModXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTogLy8gMeWOn+aciSB1cmwg5qih5byPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5QYXlVcmxCeUg1KHVybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6Ly8y546w5Zyo5pSv5LuY5a6dU0RLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5BbGlTREtCeU9yZGVyKHVybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IC8vMyBoNei9rHNkayBuYXRpdmXmqKHlvI9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkFsaVNES0ludGVyY2VwdG9yV2l0aFVybCh1cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiAvLzQg5pSv5LuY5a6d5o6I5p2DXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+mZhOS7tuWPguaVsCwganNvbuagvOW8j+eahOWtl+espuS4slxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmFtU3RyID0gZGF0YS5hdHRhY2hfcGFyYW0gfHwgXCJ7fVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0dGFjaF9wYXJhbSA9IEpTT04ucGFyc2UocGFyYW1TdHIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuQWxpU0RLQXV0aFdpdGhVcmwodXJsLCBhdHRhY2hfcGFyYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTogLy/mlK/ku5jlrp3mjojmnYPnm7TmjqXpgJrov4dBcHBJROiOt+WPlmF1dGhjb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXBwaWQgPSB1cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5BbGlTREtBdXRoV2l0aEFwcElEKGFwcGlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkFsaVNES0F1dGhXaXRoUGF5QXV0aEluZm8odXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzovL0RQYXlTREvmlK/ku5hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkRQYXlCeU9yZGVyKHVybCwgZGF0YS50b2tlbiwgZGF0YS5sZV9wYXlfdXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgOTovL1VwYXnmlK/ku5hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlblVQYXlCeU9yZGVyKHVybCwgZGF0YS50b2tlbiwgZGF0YS5sZV9wYXlfdXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDovL+aJq+eggeaUr+S7mFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U2NhbkNvZGVWaWV3KGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDExOi8v5b6u5L+hU0RL5pSv5LuYXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5XWEJ5T3JkZXIodXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjovL1NES+aUr+S7mFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuU0RLQnlPcmRlcih1cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEzOi8v5p6c5a2QU0RL5pSv5LuYXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5MaWJCeU9yZGVyKHVybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJwYXlfc2RrX3R5cGUgPSBcIiArIHBheV9zZGtfdHlwZSArIFwiIGludmFsaWQgdXJsICsrKysrK1wiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgeyAvL+ayoeacieivpeWtl+autei1sOiAgeeahOaooeW8j1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbGRQYXlVcmxMb2dpYyh1cmwpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJlc3VsdCA9PSAyKSB7XHJcbiAgICAgICAgICAgIGxldCBlcnJubyA9IGRhdGEuX2Vycm5vO1xyXG4gICAgICAgICAgICBpZiAoZXJybm8pIHtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKGRhdGEuX2VycnN0cik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5pSv5LuY5aSx6LSl77yM6K+35bCd6K+V5YW25LuW5YWF5YC85pa55byPXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBheW1lbnRPcmRlckNhbGxCYWNrKHJlc3VsdCkge1xyXG4gICAgICAgIExvZ2dlci5sb2coXCLmlK/ku5jov5Tlm57nmoTlj4LmlbBcIiwgcmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TdWJWaWV3SGlkZSgpIHtcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5vZmYoTmV0QXBwZmFjZS5Vc2VyRG93blBheSwgdGhpcywgdGhpcy5vblJlcU9yZGVyKTtcclxuICAgICAgICB0aGlzLm1vZGVsLm9mZihSZWNoYXJnZU1vZGVsLkdldFBheVVybFJlc3VsdCwgdGhpcywgdGhpcy5vbkdldFBheVVybCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0U2VsZWN0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLm5vZGUpIHJldHVyblxyXG4gICAgICAgIGlmKHRoaXMucGF5VGlwc0xibClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucGF5VGlwc0xibC5zdHJpbmcgPSBcIuivt+mAieaLqeWFheWAvOmHkeminVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyB0aGlzLnBheVRpcHNMYmwubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigxNjAsIDExNiwgNTYpO1xyXG4gICAgICAgIHRoaXMuc2NhbkNvZGVWaWV3LnN1YlZpZXdTdGF0ZSA9IGZhbHNlXHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbUxpc3RbdGhpcy5jdXJCdG5JbmRleF0pIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtTGlzdFt0aGlzLmN1ckJ0bkluZGV4XS5pc0NoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGVBbGxJdGVtcygpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaXRlbUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtTGlzdFtpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRvZ2dsZUl0ZW0gZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICBwcml2YXRlIHZhbHVlTGJsOiBjYy5MYWJlbFtdID0gW107XHJcbiAgICBwcml2YXRlIGluZGV4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgYmc6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGNoZWNrQmc6IGNjLk5vZGU7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSwgcHJpdmF0ZSBjYWxsYmFjazogRnVuY3Rpb24sIHByaXZhdGUgdGFyZ2V0OiBhbnkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2V0Tm9kZShub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcIlwiLCB0aGlzLm9uVG9nZ2xlQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudmFsdWVMYmwucHVzaCh0aGlzLmdldENvbXBvbmVudChcIkJhY2tncm91bmQvdmFsdWVMYmxcIiwgY2MuTGFiZWwpKTtcclxuICAgICAgICB0aGlzLnZhbHVlTGJsLnB1c2godGhpcy5nZXRDb21wb25lbnQoXCJjaGVja21hcmsvdmFsdWVMYmxcIiwgY2MuTGFiZWwpKTtcclxuICAgICAgICB0aGlzLmJnID0gdGhpcy5nZXRDaGlsZChcIkJhY2tncm91bmRcIik7XHJcbiAgICAgICAgdGhpcy5jaGVja0JnID0gdGhpcy5nZXRDaGlsZChcImNoZWNrbWFya1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdEl0ZW1EYXRhKGluZGV4OiBudW1iZXIsIG1vbmV5OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdGhpcy52YWx1ZUxibFswXS5zdHJpbmcgPSBTdHJpbmcobW9uZXkpO1xyXG4gICAgICAgIHRoaXMudmFsdWVMYmxbMV0uc3RyaW5nID0gU3RyaW5nKG1vbmV5KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGlzQ2hlY2tlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQgIT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0SXRlbVN0eWxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc0NoZWNrZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tlZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVG9nZ2xlQ2xpY2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjay5jYWxsKHRoaXMudGFyZ2V0LCB0aGlzLmluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0SXRlbVN0eWxlKCkge1xyXG4gICAgICAgIHRoaXMuYmcuYWN0aXZlID0gIXRoaXMuaXNDaGVja2VkO1xyXG4gICAgICAgIHRoaXMuY2hlY2tCZy5hY3RpdmUgPSB0aGlzLmlzQ2hlY2tlZDtcclxuICAgIH1cclxufSJdfQ==