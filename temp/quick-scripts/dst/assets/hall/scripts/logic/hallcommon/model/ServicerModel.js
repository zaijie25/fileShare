
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/ServicerModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxTZXJ2aWNlck1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnRUFBMkQ7QUFDM0Q7O0dBRUc7QUFDSCxJQUFZLG9CQW1CWDtBQW5CRCxXQUFZLG9CQUFvQjtJQUc1Qix1RkFBcUIsQ0FBQTtJQUNyQjs7T0FFRztJQUNILG1GQUFvQixDQUFBO0lBRXBCOztPQUVHO0lBQ0gscUZBQXFCLENBQUE7SUFFckI7O09BRUc7SUFDSCxpRkFBbUIsQ0FBQTtBQUV2QixDQUFDLEVBbkJXLG9CQUFvQixHQUFwQiw0QkFBb0IsS0FBcEIsNEJBQW9CLFFBbUIvQjtBQUVEOztHQUVHO0FBQ0gsSUFBWSxXQXVCWDtBQXZCRCxXQUFZLFdBQVc7SUFFbkI7O09BRUc7SUFDSCxpREFBVSxDQUFBO0lBQ1Y7O09BRUc7SUFDSCwrQ0FBUyxDQUFBO0lBQ1Q7O09BRUc7SUFDSCw2Q0FBUSxDQUFBO0lBQ1I7O09BRUc7SUFDSCwyQ0FBTyxDQUFBO0lBQ1A7O09BRUc7SUFDSCxpREFBVSxDQUFBO0FBRWQsQ0FBQyxFQXZCVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQXVCdEI7QUFFRDs7R0FFRztBQUNILElBQVksV0EwQlg7QUExQkQsV0FBWSxXQUFXO0lBRW5COztPQUVHO0lBQ0gseUNBQU0sQ0FBQTtJQUNOOztPQUVHO0lBQ0gseUNBQU0sQ0FBQTtJQUNOOztPQUVHO0lBQ0gscURBQVksQ0FBQTtJQUNaOztPQUVHO0lBQ0gsK0NBQVMsQ0FBQTtJQUNUOztPQUVHO0lBQ0gsNkNBQVEsQ0FBQTtJQUNSOztPQUVHO0lBQ0gsaURBQVUsQ0FBQTtBQUNkLENBQUMsRUExQlcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUEwQnRCO0FBRUQ7SUFBMkMsaUNBQVM7SUFBcEQ7UUFBQSxxRUE0TUM7UUEzTUcseUJBQXlC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QU8sSUFBSSxFQUFFLENBQUE7d0JBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUNwQyxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3JCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsTUFBTSxFQUFFO2dDQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTs2QkFDbkQ7eUJBQ0o7cUJBRUo7aUJBRUo7Z0JBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN2QyxNQUFLO1lBQ1Q7Z0JBQ0ksTUFBTTtTQUNiO0lBRUwsQ0FBQztJQUtMLG9CQUFDO0FBQUQsQ0E1TUEsQUE0TUMsQ0E1TTBDLG1CQUFTLEdBNE1uRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2RlbEJhc2UgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9tb2RlbC9Nb2RlbEJhc2VcIjtcclxuLyoqXHJcbiAqIOWFpeWPo+exu+Wei1xyXG4gKi9cclxuZXhwb3J0IGVudW0gQ3VzdG9tZXJFbnRyYW5jZVR5cGVcclxue1xyXG5cclxuICAgIFF1aWNrUGF5U2VydmljZSA9IDEwMSwgLy/kuJPkuqvpl6rku5hcclxuICAgIC8qKlxyXG4gICAgICog5Yqg6L2955m75b2V5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIExvZ2luU2VydmljZSA9IDEwMDAwLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o6o5bm/5a6i5pyNXHJcbiAgICAgKi9cclxuICAgIFNwcmVhZFNlcnZpY2UgPSAxMDAwMSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWkp+WOheWuouacjVxyXG4gICAgICovXHJcbiAgICBIYWxsU2VydmljZSA9IDEwMDAyXHJcblxyXG59XHJcblxyXG4vKipcclxuICog6YWN572u57G75Z6LXHJcbiAqL1xyXG5leHBvcnQgZW51bSBTZXJ2aWNlVHlwZVxyXG57XHJcbiAgICAvKipcclxuICAgICAqIOWkmumhteetvuW8ueeql1xyXG4gICAgICovXHJcbiAgICBCaWdQb3AgPSAxLFxyXG4gICAgLyoqXHJcbiAgICAgKiDoib7nibnlvLnnqpdcclxuICAgICAqL1xyXG4gICAgQXRXbmQgPSAyLFxyXG4gICAgLyoqXHJcbiAgICAgKiDlpJbpg6jpk77mjqVcclxuICAgICAqL1xyXG4gICAgTGluayA9IDMsXHJcbiAgICAvKipcclxuICAgICAqIOWwj+W8ueeql1xyXG4gICAgICovXHJcbiAgICBQb3AgPSA0LFxyXG4gICAgLyoqXHJcbiAgICAgKiDnvZHpobXoib7niblcclxuICAgICAqL1xyXG4gICAgQXRMaW5rID0gNVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIOmhtemdouaYvuekukl0ZW3nlKjnmoTnsbvlnotcclxuICovXHJcbmV4cG9ydCBlbnVtIFBvcEl0ZW1UeXBlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW+ruS/oVxyXG4gICAgICovXHJcbiAgICBXWCA9IDEsXHJcbiAgICAvKipcclxuICAgICAqIFFRXHJcbiAgICAgKi9cclxuICAgIFFRID0gMixcclxuICAgIC8qKlxyXG4gICAgICog5YWs5LyX5Y+3XHJcbiAgICAgKi9cclxuICAgIFdYUFVCTElDID0gMyxcclxuICAgIC8qKlxyXG4gICAgICog5YaF572u6Im+54m5XHJcbiAgICAgKi9cclxuICAgIEF0V25kID0gNCxcclxuICAgIC8qKlxyXG4gICAgICogd2Vi5aSW6ZO+XHJcbiAgICAgKi9cclxuICAgIExpbmsgPSA1LFxyXG4gICAgLyoqXHJcbiAgICAgKiDnvZHpobXoib7niblcclxuICAgICAqL1xyXG4gICAgQXRMaW5rID0gNlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2aWNlck1vZGVsIGV4dGVuZHMgTW9kZWxCYXNle1xyXG4gICAgLy9pbmZvX3R5cGUgLT4gW2luZm9pdGVtXVxyXG4gICAgcHJpdmF0ZSBzZXJ2aWNlTWFwID0ge307XHJcbiAgICBwdWJsaWMgY3VzdG9tZXJEYXRhPW51bGw7XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgTmFtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiU2VydmljZXJNb2RlbFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5a6i5pyN5pWw5o2uXHJcbiAgICBwdWJsaWMgaW5pdERhdGEoIGRhdGEgOiBhbnkgKXtcclxuICAgICAgICBpZihkYXRhID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJzZXJ2aWNlckRhdGFzICA9PSBudWxsIFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1c3RvbWVyRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlTWFwID0ge31cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCB0eXBlID0gZGF0YVtpXS5rZXk7XHJcbiAgICAgICAgICAgIGlmKHR5cGUgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiaW5mb190eXBlID09IG51bGxcIiwgaSk7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmljZU1hcFt0eXBlXSA9IGRhdGFbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTZXJ2aWNlcyh0eXBlKVxyXG4gICAge1xyXG4gICAgICAgaWYoIXRoaXMuc2VydmljZU1hcCB8fCAhdGhpcy5zZXJ2aWNlTWFwW3R5cGVdKVxyXG4gICAgICAge1xyXG4gICAgICAgICAgIHJldHVybiBudWxsXHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgcmV0dXJuIHRoaXMuc2VydmljZU1hcFt0eXBlXVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u57G75Z6L6I635Y+W5a6i5pyN5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTZXJ2aWNlSW5mbyhzZXJ2aWNlRW50cmFuY2VUeXBlKSB7XHJcbiAgICAgICAgbGV0IHNlcnZpY2VEYXRhID0gdGhpcy5nZXRTZXJ2aWNlcyhzZXJ2aWNlRW50cmFuY2VUeXBlKTtcclxuICAgICAgICBpZighc2VydmljZURhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRhdGEgOmFueSA9IHt9XHJcbiAgICAgICAgc3dpdGNoIChzZXJ2aWNlRW50cmFuY2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ3VzdG9tZXJFbnRyYW5jZVR5cGUuU3ByZWFkU2VydmljZTpcclxuICAgICAgICAgICAgICAgIGRhdGEuYXJyID0gW11cclxuICAgICAgICAgICAgICAgIGRhdGEuc2hvd19pbWcgPSBzZXJ2aWNlRGF0YS5zaG93X2ltZ1xyXG4gICAgICAgICAgICAgICAgZGF0YS5zdGF0dXMgPSBzZXJ2aWNlRGF0YS5zdGF0dXNcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoc2VydmljZURhdGEudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU2VydmljZVR5cGUuQXRMaW5rOiAvLyDoib7nibnnvZHpobXpk77mjqVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGF0TGlrZUl0ZW06IGFueSA9IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0TGlrZUl0ZW0udXJsID0gR2xvYmFsLlRvb2xraXQuQXNzZW1ieVVybChzZXJ2aWNlRGF0YS5haXRlX3dlYl91cmwpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdExpa2VJdGVtLmRhdGEgPSBHbG9iYWwuVG9vbGtpdC5Bc3NlbWJ5VXJsKHNlcnZpY2VEYXRhLmFpdGVfd2ViX3VybCkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0TGlrZUl0ZW0ubXNnID0gXCLmjqjlub/lrqLmnI1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdExpa2VJdGVtLnR5cGUgPSBQb3BJdGVtVHlwZS5BdExpbmtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5hcnIucHVzaChhdExpa2VJdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFNlcnZpY2VUeXBlLkF0V25kOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXRXbmRJdGVtOiBhbnkgPSB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdFduZEl0ZW0udXJsID0gc2VydmljZURhdGEuYWl0ZV91cmxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXRXbmRJdGVtLmRhdGEgPSBzZXJ2aWNlRGF0YS5haXRlX3VybFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdFduZEl0ZW0ubXNnID0gXCLmjqjlub/lrqLmnI1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdFduZEl0ZW0udHlwZSA9IFBvcEl0ZW1UeXBlLkF0V25kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuYXJyLnB1c2goYXRXbmRJdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFNlcnZpY2VUeXBlLkxpbms6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsaW5rSXRlbTogYW55ID0ge31cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua0l0ZW0udXJsID0gc2VydmljZURhdGEudXJsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmtJdGVtLmRhdGEgPSBzZXJ2aWNlRGF0YS51cmxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua0l0ZW0ubXNnID0gXCLmjqjlub/lrqLmnI1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rSXRlbS50eXBlID0gUG9wSXRlbVR5cGUuTGlua1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmFyci5wdXNoKGxpbmtJdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFNlcnZpY2VUeXBlLlBvcDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRtcEFycjogQXJyYXk8YW55PiA9IHNlcnZpY2VEYXRhLndpbmRvd3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRtcEFyci5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0bXBBcnIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0bXBBcnJbaW5kZXhdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBvcEl0ZW06IGFueSA9IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wSXRlbS50eXBlID0gaXRlbS50eXBlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wSXRlbS5tc2cgPSBpdGVtLm1zZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcEl0ZW0uZGF0YSA9IGl0ZW0uZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0udHlwZSA9PT0gUG9wSXRlbVR5cGUuQXRMaW5rKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wSXRlbS5kYXRhID0gR2xvYmFsLlRvb2xraXQuQXNzZW1ieVVybChpdGVtLmRhdGEpIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmFyci5wdXNoKHBvcEl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDdXN0b21lckVudHJhbmNlVHlwZS5IYWxsU2VydmljZTpcclxuICAgICAgICAgICAgY2FzZSBDdXN0b21lckVudHJhbmNlVHlwZS5Mb2dpblNlcnZpY2U6XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gc2VydmljZURhdGFcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGFcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGVudGVyQ3VzdG9tZXJTZXJ2aWNlKHNlcnZpY2VFbnRyYW5jZVR5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHR5cGUgPSBzZXJ2aWNlRW50cmFuY2VUeXBlXHJcbiAgICAgICAgbGV0IHNlcnZpY2VEYXRhID0gdGhpcy5nZXRTZXJ2aWNlcyhzZXJ2aWNlRW50cmFuY2VUeXBlKTtcclxuICAgICAgICBpZighc2VydmljZURhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWuouacjeato+WcqOWKoOmAn+i1tuadpe+8jOivt+eojeWQjuWGjeivlVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdXJsID0gXCJcIlxyXG4gICAgICAgIHN3aXRjaCAoc2VydmljZURhdGEudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFNlcnZpY2VUeXBlLkxpbms6XHJcbiAgICAgICAgICAgICAgICB1cmwgPSBzZXJ2aWNlRGF0YS51cmw7XHJcbiAgICAgICAgICAgICAgICBpZiAodXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICog5aSW6YOo6ZO+5o6l6ZyA6KaB5pu/5o2i55qE5Y+C5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmFtTGlzdCA9IFt7IFwicGFyYW1cIjogXCJtZW1iZXJOYW1lXCIsIFwidmFsdWVcIjogR2xvYmFsLlBsYXllckRhdGEubmlja25hbWUgfSwgeyBcInBhcmFtXCI6IFwibWVtYmVySWRcIiwgXCJ2YWx1ZVwiOiBHbG9iYWwuUGxheWVyRGF0YS51aWQgfV1cclxuICAgICAgICAgICAgICAgICAgICB1cmwgPSBHbG9iYWwuVXJsVXRpbC5yZXBsYWNlVXJsUGFyYW0odXJsLCBwYXJhbUxpc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgLy91cmwgPSBHbG9iYWwuVG9vbGtpdC5Bc3NlbWJ5VXJsKHVybClcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXMub3BlblVSTChHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybCh1cmwpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNlcnZpY2VUeXBlLkF0TGluazpcclxuICAgICAgICAgICAgICAgIHVybCA9IHNlcnZpY2VEYXRhLmFpdGVfd2ViX3VybDtcclxuICAgICAgICAgICAgICAgIGlmICh1cmwpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmwgPSBHbG9iYWwuVG9vbGtpdC5Bc3NlbWJ5VXJsKHVybClcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXMub3BlblVSTChHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybCh1cmwpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNlcnZpY2VUeXBlLkF0V25kOlxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkNoYXRTZXJ2ZXIuc2VydmVyVHlwZSA9IHR5cGVcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5DaGF0U2VydmVyLnVzZXJTZXR0aW5nKG51bGwsc2VydmljZURhdGEuYWl0ZV91cmwpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSBTZXJ2aWNlVHlwZS5Qb3A6XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5mb3NBcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gc2VydmljZURhdGEud2luZG93c1xyXG4gICAgICAgICAgICAgICAgaWYoIWRhdGEgfHwgZGF0YS5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWuouacjeato+WcqOWKoOmAn+i1tuadpe+8jOivt+eojeWQjuWGjeivlVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YVtpXVtcInR5cGVcIl0gIT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzaW5nbGVQb3BJbmZvOmFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHlwZSA9IGRhdGFbaV1bXCJ0eXBlXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVQb3BJbmZvLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVQb3BJbmZvLmRhdGEgPSBkYXRhW2ldW1wiZGF0YVwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZSA9PT0gUG9wSXRlbVR5cGUuQXRMaW5rKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVQb3BJbmZvLmRhdGEgPSBHbG9iYWwuVG9vbGtpdC5Bc3NlbWJ5VXJsKGRhdGFbaV1bXCJkYXRhXCJdKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvc0Fyci5wdXNoKHNpbmdsZVBvcEluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kU2VydmljZXJVSVwiLCBpbmZvc0Fycik7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIFNlcnZpY2VUeXBlLkJpZ1BvcDpcclxuICAgICAgICAgICAgICAgIGxldCBwb3BEYXRhID0gc2VydmljZURhdGEucGFnZV9zaWduXHJcbiAgICAgICAgICAgICAgICBpZiAoIXBvcERhdGEgfHwgcG9wRGF0YS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5a6i5pyN5q2j5Zyo5Yqg6YCf6LW25p2l77yM6K+356iN5ZCO5YaN6K+VXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwb3BEYXRhLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gcG9wRGF0YVtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdpbmRvdyA9IGVsZW1lbnQud2luZG93cyB8fCBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpbmRvdy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB3aW5kb3dbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSBQb3BJdGVtVHlwZS5BdExpbmspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmRhdGEgPSBHbG9iYWwuVG9vbGtpdC5Bc3NlbWJ5VXJsKGl0ZW0uZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRGZWVkYmFja1wiLCBwb3BEYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICBcclxuXHJcbiAgICBcclxuXHJcbn0iXX0=