"use strict";
cc._RF.push(module, 'd7793w6KrNJLa/JTnF9pAPs', 'ServicerModel');
// hall/scripts/logic/hallcommon/model/ServicerModel.ts

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
exports.PopItemType = exports.ServiceType = exports.CustomerEntranceType = void 0;
var ModelBase_1 = require("../../../framework/model/ModelBase");
/**
 * 入口类型
 */
var CustomerEntranceType;
(function (CustomerEntranceType) {
    CustomerEntranceType[CustomerEntranceType["QuickPayService"] = 101] = "QuickPayService";
    /**
     * 加载登录按钮
     */
    CustomerEntranceType[CustomerEntranceType["LoginService"] = 10000] = "LoginService";
    /**
     * 推广客服
     */
    CustomerEntranceType[CustomerEntranceType["SpreadService"] = 10001] = "SpreadService";
    /**
     * 大厅客服
     */
    CustomerEntranceType[CustomerEntranceType["HallService"] = 10002] = "HallService";
})(CustomerEntranceType = exports.CustomerEntranceType || (exports.CustomerEntranceType = {}));
/**
 * 配置类型
 */
var ServiceType;
(function (ServiceType) {
    /**
     * 多页签弹窗
     */
    ServiceType[ServiceType["BigPop"] = 1] = "BigPop";
    /**
     * 艾特弹窗
     */
    ServiceType[ServiceType["AtWnd"] = 2] = "AtWnd";
    /**
     * 外部链接
     */
    ServiceType[ServiceType["Link"] = 3] = "Link";
    /**
     * 小弹窗
     */
    ServiceType[ServiceType["Pop"] = 4] = "Pop";
    /**
     * 网页艾特
     */
    ServiceType[ServiceType["AtLink"] = 5] = "AtLink";
})(ServiceType = exports.ServiceType || (exports.ServiceType = {}));
/**
 * 页面显示Item用的类型
 */
var PopItemType;
(function (PopItemType) {
    /**
     * 微信
     */
    PopItemType[PopItemType["WX"] = 1] = "WX";
    /**
     * QQ
     */
    PopItemType[PopItemType["QQ"] = 2] = "QQ";
    /**
     * 公众号
     */
    PopItemType[PopItemType["WXPUBLIC"] = 3] = "WXPUBLIC";
    /**
     * 内置艾特
     */
    PopItemType[PopItemType["AtWnd"] = 4] = "AtWnd";
    /**
     * web外链
     */
    PopItemType[PopItemType["Link"] = 5] = "Link";
    /**
     * 网页艾特
     */
    PopItemType[PopItemType["AtLink"] = 6] = "AtLink";
})(PopItemType = exports.PopItemType || (exports.PopItemType = {}));
var ServicerModel = /** @class */ (function (_super) {
    __extends(ServicerModel, _super);
    function ServicerModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //info_type -> [infoitem]
        _this.serviceMap = {};
        _this.customerData = null;
        return _this;
    }
    Object.defineProperty(ServicerModel.prototype, "Name", {
        get: function () {
            return "ServicerModel";
        },
        enumerable: false,
        configurable: true
    });
    //客服数据
    ServicerModel.prototype.initData = function (data) {
        if (data == null) {
            Logger.error("servicerDatas  == null ");
            return;
        }
        this.customerData = data;
        this.serviceMap = {};
        for (var i = 0; i < data.length; i++) {
            var type = data[i].key;
            if (type == null) {
                Logger.error("info_type == null", i);
                type = 0;
            }
            this.serviceMap[type] = data[i];
        }
    };
    ServicerModel.prototype.getServices = function (type) {
        if (!this.serviceMap || !this.serviceMap[type]) {
            return null;
        }
        return this.serviceMap[type];
    };
    /**
     * 根据类型获取客服数据
     */
    ServicerModel.prototype.getServiceInfo = function (serviceEntranceType) {
        var serviceData = this.getServices(serviceEntranceType);
        if (!serviceData) {
            return null;
        }
        var data = {};
        switch (serviceEntranceType) {
            case CustomerEntranceType.SpreadService:
                data.arr = [];
                data.show_img = serviceData.show_img;
                data.status = serviceData.status;
                switch (serviceData.type) {
                    case ServiceType.AtLink: // 艾特网页链接
                        var atLikeItem = {};
                        atLikeItem.url = Global.Toolkit.AssembyUrl(serviceData.aite_web_url);
                        atLikeItem.data = Global.Toolkit.AssembyUrl(serviceData.aite_web_url);
                        atLikeItem.msg = "推广客服";
                        atLikeItem.type = PopItemType.AtLink;
                        data.arr.push(atLikeItem);
                        break;
                    case ServiceType.AtWnd:
                        var atWndItem = {};
                        atWndItem.url = serviceData.aite_url;
                        atWndItem.data = serviceData.aite_url;
                        atWndItem.msg = "推广客服";
                        atWndItem.type = PopItemType.AtWnd;
                        data.arr.push(atWndItem);
                        break;
                    case ServiceType.Link:
                        var linkItem = {};
                        linkItem.url = serviceData.url;
                        linkItem.data = serviceData.url;
                        linkItem.msg = "推广客服";
                        linkItem.type = PopItemType.Link;
                        data.arr.push(linkItem);
                        break;
                    case ServiceType.Pop:
                        var tmpArr = serviceData.windows;
                        if (tmpArr.length !== 0) {
                            for (var index = 0; index < tmpArr.length; index++) {
                                var item = tmpArr[index];
                                var popItem = {};
                                popItem.type = item.type;
                                popItem.msg = item.msg;
                                popItem.data = item.data;
                                if (item.type === PopItemType.AtLink) {
                                    popItem.data = Global.Toolkit.AssembyUrl(item.data);
                                }
                                data.arr.push(popItem);
                            }
                        }
                        break;
                    default:
                        break;
                }
                break;
            case CustomerEntranceType.HallService:
            case CustomerEntranceType.LoginService:
                data = serviceData;
                break;
            default:
                break;
        }
        return data;
    };
    ServicerModel.prototype.enterCustomerService = function (serviceEntranceType) {
        var type = serviceEntranceType;
        var serviceData = this.getServices(serviceEntranceType);
        if (!serviceData) {
            Global.UI.fastTip("客服正在加速赶来，请稍后再试");
            return;
        }
        var url = "";
        switch (serviceData.type) {
            case ServiceType.Link:
                url = serviceData.url;
                if (url) {
                    /**
                     * 外部链接需要替换的参数
                     */
                    var paramList = [{ "param": "memberName", "value": Global.PlayerData.nickname }, { "param": "memberId", "value": Global.PlayerData.uid }];
                    url = Global.UrlUtil.replaceUrlParam(url, paramList);
                    //url = Global.Toolkit.AssembyUrl(url)
                    cc.sys.openURL(Global.Toolkit.DealWithUrl(url));
                }
                break;
            case ServiceType.AtLink:
                url = serviceData.aite_web_url;
                if (url) {
                    url = Global.Toolkit.AssembyUrl(url);
                    cc.sys.openURL(Global.Toolkit.DealWithUrl(url));
                }
                break;
            case ServiceType.AtWnd:
                Global.ChatServer.serverType = type;
                Global.ChatServer.userSetting(null, serviceData.aite_url);
                break;
            case ServiceType.Pop:
                var infosArr = [];
                var data = serviceData.windows;
                if (!data || data.length == 0) {
                    Global.UI.fastTip("客服正在加速赶来，请稍后再试");
                    return;
                }
                for (var i = 0; i < data.length; i++) {
                    if (data[i]["type"] != 0) {
                        var singlePopInfo = {};
                        var type_1 = data[i]["type"];
                        singlePopInfo.type = type_1;
                        singlePopInfo.data = data[i]["data"];
                        if (type_1 === PopItemType.AtLink) {
                            singlePopInfo.data = Global.Toolkit.AssembyUrl(data[i]["data"]);
                        }
                        infosArr.push(singlePopInfo);
                    }
                }
                Global.UI.show("WndServicerUI", infosArr);
                break;
            case ServiceType.BigPop:
                var popData = serviceData.page_sign;
                if (!popData || popData.length == 0) {
                    Global.UI.fastTip("客服正在加速赶来，请稍后再试");
                    return;
                }
                for (var index = 0; index < popData.length; index++) {
                    var element = popData[index];
                    if (element) {
                        var window = element.windows || [];
                        for (var i = 0; i < window.length; i++) {
                            var item = window[i];
                            if (item.type === PopItemType.AtLink) {
                                item.data = Global.Toolkit.AssembyUrl(item.data);
                            }
                        }
                    }
                }
                Global.UI.show("WndFeedback", popData);
                break;
            default:
                break;
        }
    };
    return ServicerModel;
}(ModelBase_1.default));
exports.default = ServicerModel;

cc._RF.pop();