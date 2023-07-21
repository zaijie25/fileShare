
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/RechargeModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxSZWNoYXJnZU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUEyRDtBQUMzRCx5REFBMEQ7QUFFMUQseUNBQThDO0FBQzlDLGlEQUF1RDtBQUV2RDtJQUEyQyxpQ0FBUztJQUFwRDtRQUFBLHFFQTZTQztRQXZTVSxjQUFRLEdBQUcsS0FBSyxDQUFBO1FBQ2hCLGNBQVEsR0FBRyxLQUFLLENBQUE7UUFtQmYsY0FBUSxHQUFHLENBQUMsQ0FBQztRQUdiLGdCQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGVBQVMsR0FBRyxFQUFFLENBQUM7UUFFaEIsaUJBQVcsR0FBVyxDQUFDLENBQUM7UUFDdkIsaUJBQVcsR0FBZSxFQUFFLENBQUM7UUFDOUIsY0FBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixxQkFBZSxHQUFHLEtBQUssQ0FBQzs7SUEwUW5DLENBQUM7SUF6UWEsOEJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQztRQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFDTyxtQ0FBVyxHQUFuQixVQUFvQixJQUFJO1FBQ3BCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN6QixRQUFRLFdBQVcsRUFBRTtZQUNqQixLQUFLLDJCQUFlLENBQUMsV0FBVztnQkFDNUI7b0JBQ0ksSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsSUFBSSxv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TUFBTSxFQUFFLE9BQU87UUFDZixHQUFHLEVBQUUsUUFBUTtRQUNiLEtBQUssRUFBRSxVQUFVO1FBQ2pCLEVBQUUsRUFBRSxPQUFPO1FBQ1gsTUFBTSxFQUFFLFFBQVE7UUFDaEIsU0FBUyxFQUFFLFlBQVk7UUFDdkIsU0FBUyxFQUFFLFdBQVc7UUFDdEIsWUFBWSxFQUFFLGNBQWM7UUFDNUIsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsVUFBVTtRQUNwQixJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxPQUFPO1FBQ2QsYUFBYSxFQUFFLGVBQWUsQ0FBQSxNQUFNO0tBQ3ZDLENBQUE7SUFxUkwsb0JBQUM7Q0E3U0QsQUE2U0MsQ0E3UzBDLG1CQUFTLEdBNlNuRDtrQkE3U29CLGFBQWEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kZWxCYXNlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbW9kZWwvTW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7IE5ldEFwcGZhY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9uZXQvaGFsbC9OZXRFdmVudFwiO1xyXG5pbXBvcnQgUmVjaGFncmVUaXBNb2RlbCBmcm9tIFwiLi9SZWNoYWdyZVRpcE1vZGVsXCI7XHJcbmltcG9ydCB7IEhhbGxSZWRTcG90VHlwZSB9IGZyb20gXCIuL0hhbGxNb2RlbFwiO1xyXG5pbXBvcnQgeyBDdXN0b21lckVudHJhbmNlVHlwZSB9IGZyb20gXCIuL1NlcnZpY2VyTW9kZWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY2hhcmdlTW9kZWwgZXh0ZW5kcyBNb2RlbEJhc2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyBVcGRhdGVIaXN0b3J5ID0gXCJVcGRhdGVIaXN0b3J5XCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFBheVVybFJlc3VsdCA9IFwiR2V0UGF5VXJsUmVzdWx0XCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNob3dXYWl0aW5nQW5pbSA9IFwiU2hvd1dhaXRpbmdBbmltXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFJlYWR5Rm9yQ29uZmlnID0gXCJSZWFkeUZvckNvbmZpZ1wiO1xyXG4gICAgcHVibGljIHN0YXRpYyBTaG93U2NhbkNvZGVWaWV3ID0gXCJTaG93U2NhbkNvZGVWaWV3XCJcclxuICAgIHB1YmxpYyBjaGF0U3BvdCA9IGZhbHNlXHJcbiAgICBwdWJsaWMga2VmdVNwb3QgPSBmYWxzZVxyXG4gICAgcHVibGljIHN0YXRpYyBQYXlUeXBlID0ge1xyXG4gICAgICAgIFZpcDogXCJ2aXBwYXlcIiwvL3ZpcOaUr+S7mFxyXG4gICAgICAgIFZpcFF1aWNrUGF5OiBcInZpcFF1aWNrUGF5XCIsIC8v5LiT5Lqr6Zeq5LuYXHJcbiAgICAgICAgV2VjaGF0OiBcInd4cGF5XCIsLy/lvq7kv6HmlK/ku5hcclxuICAgICAgICBBbGk6IFwiYWxpcGF5XCIsLy/mlK/ku5jlrp3mlK/ku5hcclxuICAgICAgICBVbmlvbjogXCJ1bmlvbnBheVwiLC8v6ZO26KGM5Y2hXHJcbiAgICAgICAgUXE6IFwicXFwYXlcIiwvL1FR5pSv5LuYXHJcbiAgICAgICAgWXVuUGF5OiBcInl1bnBheVwiLC8v5LqR6Zeq5LuYXHJcbiAgICAgICAgT25saW5lUGF5OiBcIm9ubGluZUNhc2hcIiwvL+aUtumTtuWPsFxyXG4gICAgICAgIFVuaW9uRmFzdDogXCJ1bmlvbkZhc3RcIiwvL+mTtuiBlOW/q+aNt1xyXG4gICAgICAgIFJlY2hhcmdlTGlzdDogXCJyZWNoYXJnZWxpc3RcIiwgLy/ljoblj7LorrDlvZVcclxuICAgICAgICBEcGF5OiBcImRpZ3BheVwiLFxyXG4gICAgICAgIFNjYW5Db2RlOiBcInNjYW5Db2RlXCIsXHJcbiAgICAgICAgVVNEVDogXCJ1c2R0UGF5XCIsXHJcbiAgICAgICAgSkRQYXk6IFwiamRQYXlcIixcclxuICAgICAgICBJbnRlcm5hdGlvbmFsOiBcImludGVybmF0aW9uYWxcIi8v5rW35aSW5YWF5YC8XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXFDb3VudCA9IDc7XHJcbiAgICBwcml2YXRlIHRpbWVPdXQ6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIHBheUNmZ0xpc3QgPSBbXTtcclxuICAgIHByaXZhdGUgcGF5Q2ZnTWFwID0ge307XHJcblxyXG4gICAgcHVibGljIGhpc0xpc3RQYWdlOiBudW1iZXIgPSAxO1xyXG4gICAgcHJpdmF0ZSBoaXNMaXN0RGF0YTogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgcHVibGljIGhpc1RvdGFsOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIG5lZWRfYmluZF9waG9uZSA9IGZhbHNlO1xyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlJlY2hhcmdlTW9kZWxcIjtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuU2hvd1JlZFNwb3QsIHRoaXMsIHRoaXMuc2hvd1JlZFNwb3QpO1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5DbG9zZVJlZFNwb3QsIHRoaXMsIHRoaXMuY2xvc2VSZWRTcG90KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc2hvd1JlZFNwb3QoZGF0YSkge1xyXG4gICAgICAgIGxldCByZWRTcG90VHlwZSA9IGRhdGFbMV1cclxuICAgICAgICBzd2l0Y2ggKHJlZFNwb3RUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgSGFsbFJlZFNwb3RUeXBlLll1blBhbHlLZWZ1OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChHbG9iYWwuQ2hhdFNlcnZlci5zZXJ2ZXJUeXBlID09IEN1c3RvbWVyRW50cmFuY2VUeXBlLlF1aWNrUGF5U2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXRTcG90ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmtlZnVTcG90ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXZlbnQoXCJVcGRhdGVSZXNTcG90XCIsIHJlZFNwb3RUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VSZWRTcG90KHJlZFNwb3RUeXBlKSB7XHJcbiAgICAgICAgc3dpdGNoIChyZWRTcG90VHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIEhhbGxSZWRTcG90VHlwZS5ZdW5QYWx5S2VmdTpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoR2xvYmFsLkNoYXRTZXJ2ZXIuc2VydmVyVHlwZSA9PSBDdXN0b21lckVudHJhbmNlVHlwZS5RdWlja1BheVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGF0U3BvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMua2VmdVNwb3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXZlbnQoXCJVcGRhdGVSZXNTcG90XCIsIHJlZFNwb3RUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVxR2V0UGF5Q29uZmlnKCkge1xyXG4gICAgICAgIGxldCBkZXZpY2UgPSBHbG9iYWwuVG9vbGtpdC5nZW5EZXZpY2VJbmZvKCk7XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBcImRldmljZVwiOiBkZXZpY2VcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXROZXdQYXlDb25maWcsIHBhcmFtLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmluaXREYXRhKGRhdGEubmV3X3BheV9pbmZvKTtcclxuICAgICAgICAgICAgdGhpcy5uZWVkX2JpbmRfcGhvbmUgPSBkYXRhLm5lZWRfYmluZF9waG9uZVxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50KFJlY2hhcmdlTW9kZWwuUmVhZHlGb3JDb25maWcpO1xyXG4gICAgICAgIH0sIG51bGwsIGZhbHNlLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVxR2V0VXNlckRvd25QYXkocGF5S2V5OiBzdHJpbmcsIHBvaW50OiBudW1iZXIsIGlkOiBzdHJpbmcsIGF0dGFjaDogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIGlmIChHbG9iYWwuVG9vbGtpdC5jaGVja1JlY2hhcmdlTGltaXRlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgX2luZGV4ID0gcGF5S2V5LmluZGV4T2YoXCJfXCIpO1xyXG4gICAgICAgIGxldCBuZXdQYXlLZXkgPSBcIlwiO1xyXG4gICAgICAgIGlmIChfaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBuZXdQYXlLZXkgPSBwYXlLZXkuc3Vic3RyaW5nKDAsIF9pbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3UGF5S2V5ID0gcGF5S2V5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZGV2aWNlID0gR2xvYmFsLlRvb2xraXQuZ2VuRGV2aWNlSW5mbygpO1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgXCJwYXlfa2V5XCI6IG5ld1BheUtleSxcclxuICAgICAgICAgICAgXCJwcmljZVwiOiBwb2ludCxcclxuICAgICAgICAgICAgXCJwYXlfdHlwZV9pZFwiOiBpZCxcclxuICAgICAgICAgICAgXCJkZXZpY2VcIjogZGV2aWNlLFxyXG4gICAgICAgICAgICBcImF0dGFjaFwiOiBhdHRhY2hcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5Vc2VyRG93blBheSwgcGFyYW0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIC8v6YCa6L+H5o6I5p2D56CB6I635Y+Wb3JkZXJTdHJcclxuICAgIC8vIHB1YmxpYyByZXFPcmRlclN0ckJ5QXV0aENvZGUoYXV0aF9jb2RlOnN0cmluZyxvcmRlcl9ubzpzdHJpbmcpe1xyXG4gICAgLy8gICAgIGxldCBwYXJhbSA9IHtcclxuICAgIC8vICAgICAgICAgXCJvcmRlcl9ub1wiOiBvcmRlcl9ubyxcclxuICAgIC8vICAgICAgICAgXCJhdHRhY2hcIjogYXV0aF9jb2RlLFxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLlVzZXJOZXdEb3duUGF5QXR0YWNoLCBwYXJhbSwoZGF0YSk9PntcclxuICAgIC8vICAgICAgICAgbGV0IG9yZGVyX2lkID0gZGF0YS5vcmRlcl9pZFxyXG4gICAgLy8gICAgICAgICBpZiAob3JkZXJfaWQpe1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5yZXFHZXRQYXlVcmwob3JkZXJfaWQpXHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJyZXFPcmRlclN0ckJ5QXV0aENvZGUgb3JkZXJfaWQgZXJyb3JcIilcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHB1YmxpYyByZXFHZXRQYXlVcmwob3JkZXI6IHN0cmluZykge1xyXG4gICAgICAgIGlmIChHbG9iYWwuVG9vbGtpdC5jaGVja1JlY2hhcmdlTGltaXRlZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIFwib3JkZXJfaWRcIjogb3JkZXIsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVxR2V0VXJsVGltZXMocGFyYW0sIHRoaXMucmVxQ291bnQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBldmVudCAw77ya5ouJ5Y+W5oiQ5Yqf77yMMe+8muaLieWPluS4jeWIsO+8jDLvvJrmi4nlj5blm57osIPlvILluLggXHJcbiAgICBwcml2YXRlIHJlcUdldFVybFRpbWVzKHBhcmFtOiBhbnksIHRpbWVzOiBudW1iZXIpIHtcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBOZXRBcHBmYWNlLkdldERvd25QYXlVcmwsIHBhcmFtLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB0aW1lcy0tO1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gZGF0YS51cmw7XHJcbiAgICAgICAgICAgIGxldCB0U2VydmVyID0gZGF0YS50U2VydmVyXHJcbiAgICAgICAgICAgIGlmICh1cmwuc3RhcnRzV2l0aChcIi9ub3RpY2VcIikgJiYgdFNlcnZlciAmJiB0U2VydmVyLmxlbmd0aCA+IDApIC8vL25vdGljZeW8gOWktOWImeS4uuWKoOebvueahFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuRHVuSG90VXBkYXRlVXJsU2V0dGluZy5wYXlSb3V0ZUNmZyA9IGRhdGEudFNlcnZlclxyXG4gICAgICAgICAgICAgICAgbGV0IGR1blVybCA9IEdsb2JhbC5EdW5Ib3RVcGRhdGVVcmxTZXR0aW5nLnBheWVVcmxcclxuICAgICAgICAgICAgICAgIGlmIChkdW5VcmwpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnVybCA9IGR1blVybCArIHVybFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1cmwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV2ZW50KFJlY2hhcmdlTW9kZWwuR2V0UGF5VXJsUmVzdWx0LCAwLCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aW1lcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnQoUmVjaGFyZ2VNb2RlbC5HZXRQYXlVcmxSZXN1bHQsIDEsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lT3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXFHZXRVcmxUaW1lcyhwYXJhbSwgdGltZXMpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50KFJlY2hhcmdlTW9kZWwuR2V0UGF5VXJsUmVzdWx0LCAyLCBkYXRhKTtcclxuICAgICAgICB9LCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlcUdldFVzZXJQYXlMaXN0KG5leHQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGlmIChuZXh0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhpc0xpc3REYXRhLmxlbmd0aCA+PSB0aGlzLmhpc1RvdGFsKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuaXoOabtOWkmuS/oeaBr1wiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaGlzTGlzdFBhZ2UrKztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhpc0xpc3RQYWdlID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxpc3RDb3VudCA9IHRoaXMuaGlzVG90YWwgLSAodGhpcy5oaXNMaXN0UGFnZSAtIDEpICogNiA+IDYgPyA2IDogdGhpcy5oaXNUb3RhbCAtICh0aGlzLmhpc0xpc3RQYWdlIC0gMSkgKiA2XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBcInBhZ2VcIjogdGhpcy5oaXNMaXN0UGFnZSxcclxuICAgICAgICAgICAgXCJsaW1pdFwiOiBsaXN0Q291bnQgPT0gMCA/IDYgOiBsaXN0Q291bnQsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TSE9XX05FVF9XQUlUSU5HLCBcInJlcUdldFVzZXJQYXlMaXN0XCIsIDMpO1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuR2V0VXNlclBheUxpc3QsIHBhcmFtLCAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5ISURFX05FVF9XQUlUSU5HLCBcInJlcUdldFVzZXJQYXlMaXN0XCIpO1xyXG4gICAgICAgICAgICBpZiAocmVzLmxpc3QubGVuZ3RoIDwgNikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaXNUb3RhbCA9ICh0aGlzLmhpc0xpc3RQYWdlIC0gMSkgKiA2ICsgcmVzLmxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5saXN0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaXNMaXN0UGFnZS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlzVG90YWwgPSB0aGlzLmhpc0xpc3REYXRhLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlzVG90YWwgPSByZXMudG90YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGxpc3QgPSByZXMubGlzdCB8fCBbXTtcclxuICAgICAgICAgICAgaWYgKCFsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaGlzTGlzdFBhZ2UgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaXNMaXN0RGF0YSA9IGxpc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oaXNMaXN0RGF0YS5sZW5ndGggPiB0aGlzLmhpc1RvdGFsKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlzTGlzdERhdGEgPSB0aGlzLmhpc0xpc3REYXRhLmNvbmNhdChsaXN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50KFJlY2hhcmdlTW9kZWwuVXBkYXRlSGlzdG9yeSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEhpc0xpc3REYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmhpc0xpc3REYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXFHZXRBbGxQYXlMaXN0KCkge1xyXG4gICAgICAgIGxldCBwYXJhbSA9IHtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRBbGxQYXlQdXRMaXN0LCBwYXJhbSwgbnVsbCwgbnVsbCwgZmFsc2UpOyAgLy8g6L2u5pKtIOaVsOaNrueVjOmdoue8k+WtmCDlhbPpl63muIXnqbpcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICdrZXkxJzogW2RhdGExLCBkYXRhMl0sICdrZXkyJzogW11cclxuICAgICAqIEBwYXJhbSBkYXRhIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaW5pdERhdGEoZGF0YSkge1xyXG4gICAgICAgIHRoaXMucGF5Q2ZnTWFwID0ge307XHJcbiAgICAgICAgdGhpcy5wYXlDZmdMaXN0ID0gW107XHJcbiAgICAgICAgaWYgKGRhdGEgJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QoZGF0YSkpIHtcclxuICAgICAgICAgICAgbGV0IGlzdmlwcGF5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wYXlDZmdNYXBbZS5wYXlfa2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF5Q2ZnTWFwW2UucGF5X2tleV0gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBheUNmZ0xpc3QucHVzaChlKTsgICAgLy8g5Y+q55So5LqO5bem6L656aG1562+77yM5LiN6ZyA6KaB5YWo6YOo55qEZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGUucGF5X2tleSA9PSBcInZpcHBheVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXN2aXBwYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBSZWNoYWdyZVRpcE1vZGVsID0gPFJlY2hhZ3JlVGlwTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlJlY2hhZ3JlVGlwTW9kZWxcIilcclxuICAgICAgICAgICAgICAgICAgICBSZWNoYWdyZVRpcE1vZGVsLmluaXREYXRhKGUuc2FsZV9udW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXlDZmdNYXBbZS5wYXlfa2V5XS5wdXNoKGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmKCFpc3ZpcHBheSl7ICBcclxuICAgICAgICAgICAgICAgIC8v5aaC5p6c5rKh5pyJ5YWs5Y+45YWl6LSm6L+Z5p2h5pWw5o2u77yM5bCx6buY6K6k5pi+56S6MO+8jOmBv+WFjeWHuueOsHVkZueahOaDheWGtVxyXG4gICAgICAgICAgICAgICAgdmFyIFJlY2hhZ3JlVGlwTW9kZWwgPSA8UmVjaGFncmVUaXBNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUmVjaGFncmVUaXBNb2RlbFwiKVxyXG4gICAgICAgICAgICAgICAgUmVjaGFncmVUaXBNb2RlbC5pbml0RGF0YSgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WinuWKoOWFheWAvOWIl+ihqFxyXG4gICAgICAgICAgICAvLyBsZXQgcmVjaGFyZ2VEYXRhID0ge1xyXG4gICAgICAgICAgICAvLyBwYXlfbnVtX2xpc3Q6WzEwLCAzMCwgNTAsIDEwMCwgMjAwLCAzMDAsIDUwMCwgMTAwMF0sXHJcbiAgICAgICAgICAgIC8vIHBheV9rZXk6IFwicmVjaGFyZ2VsaXN0XCIsXHJcbiAgICAgICAgICAgIC8vIG5hbWU6IFwi5YWF5YC86K6w5b2VXCIsXHJcbiAgICAgICAgICAgIC8vIHNhbGVfc3RhdHVzOiAwLFxyXG4gICAgICAgICAgICAvLyBzYWxlX3RleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgIC8vIHRleHQ6IFwi5pSv5LuY5a6d5b+r5o235pSv5LuY77yM5pa55L6/55yB5b+D77yBXCIsXHJcbiAgICAgICAgICAgIC8vIHRleHQyOiBcIuiLpeWFheWAvOacquWPiuaXtuWIsOi0pu+8jOivt+iBlOezu+WcqOe6v+WuouacjeWNj+WKqVwiLH1cclxuICAgICAgICAgICAgLy8gaWYgKCF0aGlzLnBheUNmZ01hcFtyZWNoYXJnZURhdGEucGF5X2tleV0pe1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5wYXlDZmdNYXBbcmVjaGFyZ2VEYXRhLnBheV9rZXldID0gW107XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnBheUNmZ0xpc3QucHVzaChyZWNoYXJnZURhdGEpOyAgICAvLyDlj6rnlKjkuo7lt6bovrnpobXnrb7vvIzkuI3pnIDopoHlhajpg6jnmoRlXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgLy8gdGhpcy5wYXlDZmdNYXBbcmVjaGFyZ2VEYXRhLnBheV9rZXldLnB1c2gocmVjaGFyZ2VEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBheUxpc3REYXRhKCkge1xyXG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5wYXlDZmdMaXN0O1xyXG4gICAgICAgIGlmICghbGlzdCB8fCBHbG9iYWwuVG9vbGtpdC5pc0VtcHR5T2JqZWN0KGxpc3QpKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuaUr+S7mOmFjee9ruS4uuepulwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGF5TWFwRGF0YShrZXk/OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgbWFwID0gdGhpcy5wYXlDZmdNYXA7XHJcbiAgICAgICAgaWYgKGtleSAmJiBtYXBba2V5XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWFwW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhclJlcVRpbWVvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJSZXFUaW1lb3V0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVPdXQpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZU91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXFVc2VyVW5pb25QYXkodHlwZTogbnVtYmVyLCBwb2ludDogbnVtYmVyLCBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoR2xvYmFsLlRvb2xraXQuY2hlY2tSZWNoYXJnZUxpbWl0ZWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBcInR5cGVcIjogdHlwZSxcclxuICAgICAgICAgICAgXCJwb2ludFwiOiBwb2ludCxcclxuICAgICAgICAgICAgXCJuYW1lXCI6IG5hbWUsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuVXNlclVuaW9uUGF5LCBwYXJhbSwgbnVsbCwgbnVsbCwgdHJ1ZSk7XHJcbiAgICB9XHJcbn0iXX0=