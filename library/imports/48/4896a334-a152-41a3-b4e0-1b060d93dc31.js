"use strict";
cc._RF.push(module, '4896aM0oVJBo7TgGwYNk9wx', 'RechargeModel');
// hall/scripts/logic/hallcommon/model/RechargeModel.ts

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
var ModelBase_1 = require("../../../framework/model/ModelBase");
var NetEvent_1 = require("../../core/net/hall/NetEvent");
var HallModel_1 = require("./HallModel");
var ServicerModel_1 = require("./ServicerModel");
var RechargeModel = /** @class */ (function (_super) {
    __extends(RechargeModel, _super);
    function RechargeModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chatSpot = false;
        _this.kefuSpot = false;
        _this.reqCount = 7;
        _this.payCfgList = [];
        _this.payCfgMap = {};
        _this.hisListPage = 1;
        _this.hisListData = [];
        _this.hisTotal = 0;
        _this.need_bind_phone = false;
        return _this;
    }
    RechargeModel.prototype.onInit = function () {
        this.name = "RechargeModel";
        Global.Event.on(GlobalEvent.ShowRedSpot, this, this.showRedSpot);
        Global.Event.on(GlobalEvent.CloseRedSpot, this, this.closeRedSpot);
    };
    RechargeModel.prototype.showRedSpot = function (data) {
        var redSpotType = data[1];
        switch (redSpotType) {
            case HallModel_1.HallRedSpotType.YunPalyKefu:
                {
                    if (Global.ChatServer.serverType == ServicerModel_1.CustomerEntranceType.QuickPayService) {
                        this.chatSpot = true;
                    }
                    else {
                        this.kefuSpot = true;
                    }
                    break;
                }
        }
        this.event("UpdateResSpot", redSpotType);
    };
    RechargeModel.prototype.closeRedSpot = function (redSpotType) {
        switch (redSpotType) {
            case HallModel_1.HallRedSpotType.YunPalyKefu:
                {
                    if (Global.ChatServer.serverType == ServicerModel_1.CustomerEntranceType.QuickPayService) {
                        this.chatSpot = false;
                    }
                    else {
                        this.kefuSpot = false;
                    }
                    break;
                }
        }
        this.event("UpdateResSpot", redSpotType);
    };
    RechargeModel.prototype.reqGetPayConfig = function () {
        var _this = this;
        var device = Global.Toolkit.genDeviceInfo();
        var param = {
            "device": device
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetNewPayConfig, param, function (data) {
            _this.initData(data.new_pay_info);
            _this.need_bind_phone = data.need_bind_phone;
            _this.event(RechargeModel.ReadyForConfig);
        }, null, false, 0);
    };
    RechargeModel.prototype.reqGetUserDownPay = function (payKey, point, id, attach) {
        if (attach === void 0) { attach = ""; }
        if (Global.Toolkit.checkRechargeLimited()) {
            return;
        }
        var _index = payKey.indexOf("_");
        var newPayKey = "";
        if (_index > -1) {
            newPayKey = payKey.substring(0, _index);
        }
        else {
            newPayKey = payKey;
        }
        var device = Global.Toolkit.genDeviceInfo();
        var param = {
            "pay_key": newPayKey,
            "price": point,
            "pay_type_id": id,
            "device": device,
            "attach": attach
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.UserDownPay, param);
    };
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
    RechargeModel.prototype.reqGetPayUrl = function (order) {
        if (Global.Toolkit.checkRechargeLimited()) {
            return;
        }
        var param = {
            "order_id": order,
        };
        this.reqGetUrlTimes(param, this.reqCount);
    };
    // event 0：拉取成功，1：拉取不到，2：拉取回调异常 
    RechargeModel.prototype.reqGetUrlTimes = function (param, times) {
        var _this = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetDownPayUrl, param, function (data) {
            times--;
            var url = data.url;
            var tServer = data.tServer;
            if (url.startsWith("/notice") && tServer && tServer.length > 0) ///notice开头则为加盾的
             {
                Global.DunHotUpdateUrlSetting.payRouteCfg = data.tServer;
                var dunUrl = Global.DunHotUpdateUrlSetting.payeUrl;
                if (dunUrl) {
                    data.url = dunUrl + url;
                }
            }
            if (url) {
                return _this.event(RechargeModel.GetPayUrlResult, 0, data);
            }
            else {
                if (times == 0) {
                    return _this.event(RechargeModel.GetPayUrlResult, 1, data);
                }
                _this.timeOut = setTimeout(function () {
                    _this.reqGetUrlTimes(param, times);
                }, 1500);
            }
        }, function (data) {
            _this.event(RechargeModel.GetPayUrlResult, 2, data);
        }, false);
    };
    RechargeModel.prototype.reqGetUserPayList = function (next) {
        var _this = this;
        if (next === void 0) { next = false; }
        if (next) {
            if (this.hisListData.length >= this.hisTotal) {
                Global.UI.fastTip("无更多信息");
                return;
            }
            this.hisListPage++;
        }
        else {
            this.hisListPage = 1;
        }
        var listCount = this.hisTotal - (this.hisListPage - 1) * 6 > 6 ? 6 : this.hisTotal - (this.hisListPage - 1) * 6;
        var param = {
            "page": this.hisListPage,
            "limit": listCount == 0 ? 6 : listCount,
        };
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "reqGetUserPayList", 3);
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetUserPayList, param, function (res) {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "reqGetUserPayList");
            if (res.list.length < 6) {
                _this.hisTotal = (_this.hisListPage - 1) * 6 + res.list.length;
                if (res.list.length == 0) {
                    _this.hisListPage--;
                    _this.hisTotal = _this.hisListData.length;
                }
            }
            else {
                _this.hisTotal = res.total;
            }
            var list = res.list || [];
            if (!list) {
                return;
            }
            if (_this.hisListPage == 1) {
                _this.hisListData = list;
            }
            else {
                if (_this.hisListData.length > _this.hisTotal)
                    return;
                _this.hisListData = _this.hisListData.concat(list);
            }
            _this.event(RechargeModel.UpdateHistory);
        });
    };
    RechargeModel.prototype.getHisListData = function () {
        return this.hisListData;
    };
    RechargeModel.prototype.reqGetAllPayList = function () {
        var param = {};
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetAllPayPutList, param, null, null, false); // 轮播 数据界面缓存 关闭清空
    };
    /**
     * 'key1': [data1, data2], 'key2': []
     * @param data
     */
    RechargeModel.prototype.initData = function (data) {
        var _this = this;
        this.payCfgMap = {};
        this.payCfgList = [];
        if (data && !Global.Toolkit.isEmptyObject(data)) {
            var isvippay_1 = false;
            data.forEach(function (e) {
                if (!_this.payCfgMap[e.pay_key]) {
                    _this.payCfgMap[e.pay_key] = [];
                    _this.payCfgList.push(e); // 只用于左边页签，不需要全部的e
                }
                if (e.pay_key == "vippay") {
                    isvippay_1 = true;
                    var RechagreTipModel = Global.ModelManager.getModel("RechagreTipModel");
                    RechagreTipModel.initData(e.sale_num);
                }
                _this.payCfgMap[e.pay_key].push(e);
            });
            if (!isvippay_1) {
                //如果没有公司入账这条数据，就默认显示0，避免出现udf的情况
                var RechagreTipModel = Global.ModelManager.getModel("RechagreTipModel");
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
    };
    RechargeModel.prototype.getPayListData = function () {
        var list = this.payCfgList;
        if (!list || Global.Toolkit.isEmptyObject(list)) {
            Logger.error("支付配置为空");
            return [];
        }
        return list;
    };
    RechargeModel.prototype.getPayMapData = function (key) {
        var map = this.payCfgMap;
        if (key && map[key]) {
            return map[key];
        }
        return map;
    };
    RechargeModel.prototype.onClear = function () {
        this.clearReqTimeout();
    };
    RechargeModel.prototype.clearReqTimeout = function () {
        if (this.timeOut) {
            clearTimeout(this.timeOut);
        }
    };
    RechargeModel.prototype.reqUserUnionPay = function (type, point, name) {
        if (Global.Toolkit.checkRechargeLimited()) {
            return;
        }
        var param = {
            "type": type,
            "point": point,
            "name": name,
        };
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.UserUnionPay, param, null, null, true);
    };
    RechargeModel.UpdateHistory = "UpdateHistory";
    RechargeModel.GetPayUrlResult = "GetPayUrlResult";
    RechargeModel.ShowWaitingAnim = "ShowWaitingAnim";
    RechargeModel.ReadyForConfig = "ReadyForConfig";
    RechargeModel.ShowScanCodeView = "ShowScanCodeView";
    RechargeModel.PayType = {
        Vip: "vippay",
        VipQuickPay: "vipQuickPay",
        Wechat: "wxpay",
        Ali: "alipay",
        Union: "unionpay",
        Qq: "qqpay",
        YunPay: "yunpay",
        OnlinePay: "onlineCash",
        UnionFast: "unionFast",
        RechargeList: "rechargelist",
        Dpay: "digpay",
        ScanCode: "scanCode",
        USDT: "usdtPay",
        JDPay: "jdPay",
        International: "international" //海外充值
    };
    return RechargeModel;
}(ModelBase_1.default));
exports.default = RechargeModel;

cc._RF.pop();