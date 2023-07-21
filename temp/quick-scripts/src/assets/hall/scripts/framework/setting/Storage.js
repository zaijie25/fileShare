"use strict";
cc._RF.push(module, '67738H0CT5B7KdMOI2g/pi+', 'Storage');
// hall/scripts/framework/setting/Storage.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger_1 = require("../debug/Logger");
var Storage = /** @class */ (function () {
    function Storage() {
    }
    //默认为string格式存储  包括数字
    Storage.prototype.set = function (key, value) {
        if (value == null)
            value = "";
        var newKey = this.getFinalKey(key);
        cc.sys.localStorage.setItem(newKey, value);
    };
    Storage.prototype.setObject = function (key, value) {
        if (value == null)
            return;
        var content = "";
        try {
            content = JSON.stringify(value);
            this.set(key, content);
        }
        catch (e) {
            Logger_1.Logger.error("Storage.setObject 出错", e && e.message);
            return;
        }
    };
    Storage.prototype.setBool = function (key, value) {
        var content = value ? "1" : "0";
        this.set(key, content);
    };
    Storage.prototype.hasKey = function (key) {
        return this.get(key) != "";
    };
    Storage.prototype.get = function (key) {
        var newKey = this.getFinalKey(key);
        var value = cc.sys.localStorage.getItem(newKey);
        if (value == null)
            value = "";
        return value;
    };
    Storage.prototype.getNumber = function (key, defalut) {
        if (defalut === void 0) { defalut = 0; }
        var content = this.get(key);
        if (content == "")
            return defalut;
        var value = Number(content);
        if (!isNaN(value))
            return value;
        else
            return defalut;
    };
    Storage.prototype.getObject = function (key) {
        var content = this.get(key);
        if (content == "")
            return null;
        var obj = null;
        try {
            obj = JSON.parse(content);
        }
        catch (e) {
            Logger_1.Logger.error("Storage.getObject 出错", e && e.message);
        }
        return obj;
    };
    Storage.prototype.getBool = function (key) {
        var content = this.get(key);
        return content == "1";
    };
    Storage.prototype.removeKey = function (key) {
        var newKey = this.getFinalKey(key);
        cc.sys.localStorage.removeItem(newKey);
    };
    //对key做加工
    Storage.prototype.getFinalKey = function (key) {
        return key;
    };
    return Storage;
}());
exports.default = Storage;

cc._RF.pop();