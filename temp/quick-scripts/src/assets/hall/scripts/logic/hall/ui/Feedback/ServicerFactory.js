"use strict";
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