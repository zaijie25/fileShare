
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/RechagreTipModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e53f4Wm5BdOZo9NyDRiGxFo', 'RechagreTipModel');
// hall/scripts/logic/hallcommon/model/RechagreTipModel.ts

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
var HallStorageKey_1 = require("../const/HallStorageKey");
var ModelBase_1 = require("../../../framework/model/ModelBase");
var RechagreTipModel = /** @class */ (function (_super) {
    __extends(RechagreTipModel, _super);
    function RechagreTipModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.flag = false;
        return _this;
    }
    RechagreTipModel.prototype.onInit = function () {
        this.name = "RechagreTipModel";
    };
    RechagreTipModel.prototype.setRechagreTipModel = function () {
        var time = Global.Setting.storage.get(HallStorageKey_1.default.Sale);
        var Onlinetime = new Date().getTime();
        if (time == null || time == "") {
            time = new Date().getTime();
            Global.Setting.storage.set(HallStorageKey_1.default.Sale, time);
            this._RechagreTipModel = true;
        }
        else {
            if (this.salenum > 0) {
                this._RechagreTipModel = this.SetTimeData(time, Onlinetime);
            }
        }
        Global.Setting.storage.set(HallStorageKey_1.default.Sale, Onlinetime);
    };
    Object.defineProperty(RechagreTipModel.prototype, "RechagreTipModel", {
        get: function () {
            var time = Global.Setting.storage.get(HallStorageKey_1.default.Sale);
            var Onlinetime = new Date().getTime();
            if (time == null || time == "") {
                this._RechagreTipModel = true;
            }
            else {
                if (this.salenum > 0) {
                    this._RechagreTipModel = this.SetTimeData(time, Onlinetime);
                }
            }
            return this._RechagreTipModel;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RechagreTipModel.prototype, "Salenum", {
        get: function () {
            return this.salenum;
        },
        enumerable: false,
        configurable: true
    });
    RechagreTipModel.prototype.initData = function (num) {
        if (num) {
            this.salenum = num;
        }
        else
            this.salenum = 0;
    };
    RechagreTipModel.prototype.SetTimeData = function (date1, date2) {
        var time1 = new Date(Number(date1));
        var time2 = new Date(date2);
        var y1 = time1.getFullYear();
        var y2 = time2.getFullYear();
        var m1 = time1.getMonth();
        var m2 = time2.getMonth();
        var d1 = time1.getDate();
        var d2 = time2.getDate();
        if (y2 > y1) {
            return true;
        }
        if (m2 > m1) {
            return true;
        }
        if (d2 > d1) {
            return true;
        }
        return false;
    };
    return RechagreTipModel;
}(ModelBase_1.default));
exports.default = RechagreTipModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxSZWNoYWdyZVRpcE1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBEQUFxRDtBQUNyRCxnRUFBMkQ7QUFHM0Q7SUFBOEMsb0NBQVM7SUFBdkQ7UUFBQSxxRUF1RUM7UUFwRVUsVUFBSSxHQUFZLEtBQUssQ0FBQTs7SUFvRWhDLENBQUM7SUFsRWEsaUNBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0lBQ25DLENBQUM7SUFFTSw4Q0FBbUIsR0FBMUI7UUFDSSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxJQUFJLFVBQVUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ3JDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxFQUFFO1lBQzVCLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1NBQ2pDO2FBQ0k7WUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFO2dCQUNsQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUE7YUFDOUQ7U0FDSjtRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBYyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsc0JBQVcsOENBQWdCO2FBQTNCO1lBQ0ksSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUNyQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQzthQUNqQztpQkFDSTtnQkFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFO29CQUNsQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUE7aUJBQzlEO2FBQ0o7WUFDRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHFDQUFPO2FBQWxCO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBRU0sbUNBQVEsR0FBZixVQUFnQixHQUFXO1FBQ3ZCLElBQUksR0FBRyxFQUFFO1lBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7U0FDdEI7O1lBRUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELHNDQUFXLEdBQVgsVUFBWSxLQUFLLEVBQUUsS0FBSztRQUNwQixJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUNuQyxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUIsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN6QixJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQXZFQSxBQXVFQyxDQXZFNkMsbUJBQVMsR0F1RXREIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhhbGxTdG9yYWdlS2V5IGZyb20gXCIuLi9jb25zdC9IYWxsU3RvcmFnZUtleVwiO1xyXG5pbXBvcnQgTW9kZWxCYXNlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbW9kZWwvTW9kZWxCYXNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjaGFncmVUaXBNb2RlbCBleHRlbmRzIE1vZGVsQmFzZSB7XHJcbiAgICBwcml2YXRlIF9SZWNoYWdyZVRpcE1vZGVsOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBzYWxlbnVtO1xyXG4gICAgcHVibGljIGZsYWcgOmJvb2xlYW4gPSBmYWxzZVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJSZWNoYWdyZVRpcE1vZGVsXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFJlY2hhZ3JlVGlwTW9kZWwoKSB7XHJcbiAgICAgICAgbGV0IHRpbWUgPSBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldChIYWxsU3RvcmFnZUtleS5TYWxlKTtcclxuICAgICAgICBsZXQgT25saW5ldGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXHJcbiAgICAgICAgaWYgKHRpbWUgPT0gbnVsbCB8fCB0aW1lID09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0KEhhbGxTdG9yYWdlS2V5LlNhbGUsIHRpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9SZWNoYWdyZVRpcE1vZGVsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNhbGVudW0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9SZWNoYWdyZVRpcE1vZGVsID0gdGhpcy5TZXRUaW1lRGF0YSh0aW1lLCBPbmxpbmV0aW1lKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0KEhhbGxTdG9yYWdlS2V5LlNhbGUsIE9ubGluZXRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgUmVjaGFncmVUaXBNb2RlbCgpIHtcclxuICAgICAgICBsZXQgdGltZSA9IEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2UuZ2V0KEhhbGxTdG9yYWdlS2V5LlNhbGUpO1xyXG4gICAgICAgIGxldCBPbmxpbmV0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICBpZiAodGltZSA9PSBudWxsIHx8IHRpbWUgPT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9SZWNoYWdyZVRpcE1vZGVsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNhbGVudW0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9SZWNoYWdyZVRpcE1vZGVsID0gdGhpcy5TZXRUaW1lRGF0YSh0aW1lLCBPbmxpbmV0aW1lKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9SZWNoYWdyZVRpcE1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgU2FsZW51bSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zYWxlbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0RGF0YShudW06IG51bWJlcikge1xyXG4gICAgICAgIGlmIChudW0pIHtcclxuICAgICAgICAgICAgdGhpcy5zYWxlbnVtID0gbnVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuc2FsZW51bSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0VGltZURhdGEoZGF0ZTEsIGRhdGUyKSB7XHJcbiAgICAgICAgbGV0IHRpbWUxID0gbmV3IERhdGUoTnVtYmVyKGRhdGUxKSlcclxuICAgICAgICBsZXQgdGltZTIgPSBuZXcgRGF0ZShkYXRlMik7XHJcbiAgICAgICAgbGV0IHkxID0gdGltZTEuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICBsZXQgeTIgPSB0aW1lMi5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgIGxldCBtMSA9IHRpbWUxLmdldE1vbnRoKCk7XHJcbiAgICAgICAgbGV0IG0yID0gdGltZTIuZ2V0TW9udGgoKTtcclxuICAgICAgICBsZXQgZDEgPSB0aW1lMS5nZXREYXRlKCk7XHJcbiAgICAgICAgbGV0IGQyID0gdGltZTIuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIGlmICh5MiA+IHkxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobTIgPiBtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGQyID4gZDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufSJdfQ==