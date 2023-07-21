
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/framework/setting/Storage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcZnJhbWV3b3JrXFxzZXR0aW5nXFxTdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQXlDO0FBRXpDO0lBQUE7SUFnR0EsQ0FBQztJQTlGRyxxQkFBcUI7SUFDZCxxQkFBRyxHQUFWLFVBQVcsR0FBVSxFQUFFLEtBQVM7UUFFNUIsSUFBRyxLQUFLLElBQUksSUFBSTtZQUNaLEtBQUssR0FBRyxFQUFFLENBQUE7UUFDZCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDOUMsQ0FBQztJQUVNLDJCQUFTLEdBQWhCLFVBQWlCLEdBQUcsRUFBRSxLQUFLO1FBRXZCLElBQUcsS0FBSyxJQUFJLElBQUk7WUFDWixPQUFPO1FBQ1gsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFBO1FBQ2hCLElBQ0E7WUFDSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUMxQjtRQUNELE9BQU0sQ0FBQyxFQUNQO1lBQ0ksZUFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3BELE9BQU87U0FDVjtJQUNMLENBQUM7SUFFTSx5QkFBTyxHQUFkLFVBQWUsR0FBRyxFQUFFLEtBQWE7UUFFN0IsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFBLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtRQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU0sd0JBQU0sR0FBYixVQUFjLEdBQUc7UUFFYixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQzlCLENBQUM7SUFHTSxxQkFBRyxHQUFWLFVBQVcsR0FBRztRQUVWLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELElBQUcsS0FBSyxJQUFJLElBQUk7WUFDWixLQUFLLEdBQUcsRUFBRSxDQUFBO1FBQ2QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVNLDJCQUFTLEdBQWhCLFVBQWlCLEdBQUcsRUFBRSxPQUFXO1FBQVgsd0JBQUEsRUFBQSxXQUFXO1FBRTdCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBRyxPQUFPLElBQUksRUFBRTtZQUNaLE9BQU8sT0FBTyxDQUFDO1FBQ25CLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixJQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNaLE9BQU8sS0FBSyxDQUFBOztZQUVaLE9BQU8sT0FBTyxDQUFDO0lBQ3ZCLENBQUM7SUFFTSwyQkFBUyxHQUFoQixVQUFpQixHQUFHO1FBRWhCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBRyxPQUFPLElBQUksRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztRQUNmLElBQ0E7WUFDSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3QjtRQUNELE9BQU0sQ0FBQyxFQUNQO1lBQ0csZUFBTSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQ3REO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRU0seUJBQU8sR0FBZCxVQUFlLEdBQUc7UUFFZCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sT0FBTyxJQUFJLEdBQUcsQ0FBQztJQUMxQixDQUFDO0lBRU0sMkJBQVMsR0FBaEIsVUFBaUIsR0FBRztRQUVoQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBR0QsU0FBUztJQUNELDZCQUFXLEdBQW5CLFVBQW9CLEdBQUc7UUFFbkIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQ0wsY0FBQztBQUFELENBaEdBLEFBZ0dDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiLi4vZGVidWcvTG9nZ2VyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yYWdlXHJcbntcclxuICAgIC8v6buY6K6k5Li6c3RyaW5n5qC85byP5a2Y5YKoICDljIXmi6zmlbDlrZdcclxuICAgIHB1YmxpYyBzZXQoa2V5OnN0cmluZywgdmFsdWU6YW55KVxyXG4gICAge1xyXG4gICAgICAgIGlmKHZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICAgIHZhbHVlID0gXCJcIlxyXG4gICAgICAgIGxldCBuZXdLZXkgPSB0aGlzLmdldEZpbmFsS2V5KGtleSk7XHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKG5ld0tleSwgdmFsdWUpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldE9iamVjdChrZXksIHZhbHVlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgY29udGVudCA9IFwiXCJcclxuICAgICAgICB0cnlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcclxuICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCBjb250ZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2goZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIlN0b3JhZ2Uuc2V0T2JqZWN0IOWHuumUmVwiLCBlICYmIGUubWVzc2FnZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Qm9vbChrZXksIHZhbHVlOmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB2YWx1ZT8gXCIxXCIgOiBcIjBcIlxyXG4gICAgICAgIHRoaXMuc2V0KGtleSwgY29udGVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhc0tleShrZXkpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KGtleSkgIT0gXCJcIlxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0KGtleSlcclxuICAgIHtcclxuICAgICAgICBsZXQgbmV3S2V5ID0gdGhpcy5nZXRGaW5hbEtleShrZXkpO1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShuZXdLZXkpO1xyXG4gICAgICAgIGlmKHZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICAgIHZhbHVlID0gXCJcIlxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TnVtYmVyKGtleSwgZGVmYWx1dCA9IDApXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmdldChrZXkpO1xyXG4gICAgICAgIGlmKGNvbnRlbnQgPT0gXCJcIilcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmFsdXQ7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gTnVtYmVyKGNvbnRlbnQpO1xyXG4gICAgICAgIGlmKCFpc05hTih2YWx1ZSkpXHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICAgIGVsc2UgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhbHV0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRPYmplY3Qoa2V5KTphbnlcclxuICAgIHtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYoY29udGVudCA9PSBcIlwiKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICBsZXQgb2JqID0gbnVsbDtcclxuICAgICAgICB0cnlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG9iaiA9IEpTT04ucGFyc2UoY29udGVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoKGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIExvZ2dlci5lcnJvcihcIlN0b3JhZ2UuZ2V0T2JqZWN0IOWHuumUmVwiLCBlICYmIGUubWVzc2FnZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Qm9vbChrZXkpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuZ2V0KGtleSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQgPT0gXCIxXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZUtleShrZXkpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG5ld0tleSA9IHRoaXMuZ2V0RmluYWxLZXkoa2V5KTsgXHJcbiAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKG5ld0tleSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5a+5a2V55YGa5Yqg5belXHJcbiAgICBwcml2YXRlIGdldEZpbmFsS2V5KGtleSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4ga2V5O1xyXG4gICAgfVxyXG59Il19