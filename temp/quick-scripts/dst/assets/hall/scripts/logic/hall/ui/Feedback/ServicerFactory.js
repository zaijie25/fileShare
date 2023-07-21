
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Feedback/ServicerFactory.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e61abgx3lZHhoXkwQPXzH20', 'ServicerFactory');
// hall/scripts/logic/hall/ui/Feedback/ServicerFactory.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OuterServicer_1 = require("./OuterServicer");
var InnerServicer_1 = require("./InnerServicer");
/*
   懒汉单例
   客服工厂
*/
var ServicerFactory = /** @class */ (function () {
    // 私有构造函数
    function ServicerFactory() {
        this.map = new Map();
        this.servicerDic = {
            "onlineService": OuterServicer_1.OnlineServicer,
            "wxService": OuterServicer_1.WxServicer,
            "qqService": OuterServicer_1.QqServicer,
            "atService": InnerServicer_1.AtServicer,
        };
    }
    ServicerFactory.getInstance = function () {
        if (ServicerFactory.instance == null) {
            ServicerFactory.instance = new ServicerFactory();
        }
        return ServicerFactory.instance;
    };
    //创建客服实例
    ServicerFactory.prototype.createServicerObj = function (c) {
        return this.createObj(this.servicerDic[c]);
    };
    //这里用泛型保证类型安全
    ServicerFactory.prototype.createObj = function (c) {
        var d = null;
        try {
            d = new c();
        }
        catch (e) {
            cc.error(e);
        }
        return d;
    };
    //添加客服实例
    ServicerFactory.prototype.addEntity = function (key, ser) {
        this.map.set(key, ser);
        return ServicerFactory.instance;
    };
    //获取客服实例
    ServicerFactory.prototype.getEntity = function (key) {
        return this.map.get(key);
    };
    // 静态成员instance
    ServicerFactory.instance = null;
    return ServicerFactory;
}());
exports.default = ServicerFactory;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxGZWVkYmFja1xcU2VydmljZXJGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaURBQXlFO0FBQ3pFLGlEQUE2QztBQUU3Qzs7O0VBR0U7QUFDRjtJQUtJLFNBQVM7SUFDVDtRQUhPLFFBQUcsR0FBMkIsSUFBSSxHQUFHLEVBQXNCLENBQUM7UUFZbkQsZ0JBQVcsR0FBRztZQUMxQixlQUFlLEVBQUUsOEJBQWM7WUFDL0IsV0FBVyxFQUFFLDBCQUFVO1lBQ3ZCLFdBQVcsRUFBRSwwQkFBVTtZQUN2QixXQUFXLEVBQUUsMEJBQVU7U0FDMUIsQ0FBQTtJQWRxQixDQUFDO0lBRVQsMkJBQVcsR0FBekI7UUFDSSxJQUFHLGVBQWUsQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFDO1lBQ2hDLGVBQWUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztTQUNwRDtRQUNELE9BQU8sZUFBZSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBU0QsUUFBUTtJQUNBLDJDQUFpQixHQUF6QixVQUEwQixDQUFTO1FBQy9CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELGFBQWE7SUFDTCxtQ0FBUyxHQUFqQixVQUF5QyxDQUFjO1FBQ25ELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNiLElBQUc7WUFDQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUNmO1FBQUEsT0FBTSxDQUFDLEVBQUM7WUFDTCxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2Y7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCxRQUFRO0lBQ0QsbUNBQVMsR0FBaEIsVUFBaUIsR0FBVSxFQUFDLEdBQWU7UUFDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sZUFBZSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUQsUUFBUTtJQUNELG1DQUFTLEdBQWhCLFVBQWlCLEdBQVU7UUFDdkIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBOUNELGVBQWU7SUFDUix3QkFBUSxHQUFHLElBQUksQ0FBQztJQStDM0Isc0JBQUM7Q0FqREQsQUFpREMsSUFBQTtrQkFqRG9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWJzU2VydmljZXIgZnJvbSBcIi4vQWJzU2VydmljZXJcIjtcclxuaW1wb3J0IHsgT25saW5lU2VydmljZXIsIFd4U2VydmljZXIsIFFxU2VydmljZXIgfSBmcm9tIFwiLi9PdXRlclNlcnZpY2VyXCI7XHJcbmltcG9ydCB7IEF0U2VydmljZXIgfSBmcm9tIFwiLi9Jbm5lclNlcnZpY2VyXCI7XHJcblxyXG4vKiAgXHJcbiAgIOaHkuaxieWNleS+iyBcclxuICAg5a6i5pyN5bel5Y6CIFxyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2aWNlckZhY3Rvcnl7XHJcbiAgICAvLyDpnZnmgIHmiJDlkZhpbnN0YW5jZVxyXG4gICAgc3RhdGljIGluc3RhbmNlID0gbnVsbDtcclxuICAgIHB1YmxpYyBtYXA6TWFwPHN0cmluZyxBYnNTZXJ2aWNlcj4gPSBuZXcgTWFwPHN0cmluZyxBYnNTZXJ2aWNlcj4oKTtcclxuXHJcbiAgICAvLyDnp4HmnInmnoTpgKDlh73mlbBcclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKXt9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpe1xyXG4gICAgICAgIGlmKFNlcnZpY2VyRmFjdG9yeS5pbnN0YW5jZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgU2VydmljZXJGYWN0b3J5Lmluc3RhbmNlID0gbmV3IFNlcnZpY2VyRmFjdG9yeSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gU2VydmljZXJGYWN0b3J5Lmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBzZXJ2aWNlckRpYyA9IHtcclxuICAgICAgICBcIm9ubGluZVNlcnZpY2VcIjogT25saW5lU2VydmljZXIsXHJcbiAgICAgICAgXCJ3eFNlcnZpY2VcIjogV3hTZXJ2aWNlcixcclxuICAgICAgICBcInFxU2VydmljZVwiOiBRcVNlcnZpY2VyLFxyXG4gICAgICAgIFwiYXRTZXJ2aWNlXCI6IEF0U2VydmljZXIsXHJcbiAgICB9XHJcblxyXG4gICAgLy/liJvlu7rlrqLmnI3lrp7kvotcclxuICAgIHB1YmxpYyAgY3JlYXRlU2VydmljZXJPYmooYzogc3RyaW5nKTogQWJzU2VydmljZXJ8bnVsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlT2JqKHRoaXMuc2VydmljZXJEaWNbY10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6L+Z6YeM55So5rOb5Z6L5L+d6K+B57G75Z6L5a6J5YWoXHJcbiAgICBwcml2YXRlIGNyZWF0ZU9iajxUIGV4dGVuZHMgQWJzU2VydmljZXI+KGM6IG5ldyAoKSA9PiBUKTogVHxudWxsIHtcclxuICAgICAgICBsZXQgZCA9IG51bGw7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBkID0gbmV3IGMoKTtcclxuICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgIGNjLmVycm9yKGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZDtcclxuICAgIH1cclxuXHJcbiAgICAvL+a3u+WKoOWuouacjeWunuS+i1xyXG4gICAgcHVibGljIGFkZEVudGl0eShrZXk6c3RyaW5nLHNlcjpBYnNTZXJ2aWNlcik6U2VydmljZXJGYWN0b3J5e1xyXG4gICAgICAgIHRoaXMubWFwLnNldChrZXksc2VyKTtcclxuICAgICAgICByZXR1cm4gU2VydmljZXJGYWN0b3J5Lmluc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5a6i5pyN5a6e5L6LXHJcbiAgICBwdWJsaWMgZ2V0RW50aXR5KGtleTpzdHJpbmcpOkFic1NlcnZpY2Vye1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcC5nZXQoa2V5KTtcclxuICAgIH1cclxuXHJcbn0iXX0=