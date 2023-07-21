"use strict";
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