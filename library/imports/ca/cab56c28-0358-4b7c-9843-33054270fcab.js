"use strict";
cc._RF.push(module, 'cab56woA1hLfJhDMwVCcPyr', 'ErmjDealHandler');
// ermj/Ermj/scripts/handlers/ErmjDealHandler.ts

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
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjDealHandler = /** @class */ (function (_super) {
    __extends(ErmjDealHandler, _super);
    function ErmjDealHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjDealHandler.prototype.execute = function (msg) {
        var _this = this;
        var bankerSeat = this.context.get(this.Define.FieldBankerSeat);
        var userArr = msg._para.user_cards || [];
        var map = {};
        userArr.forEach(function (data) {
            var localSeat = _this.SitHelper.serverSToLocalN(data.chair);
            map[localSeat] = data;
        });
        this.mainUI.onDeal(map, bankerSeat, msg._para.left_count);
    };
    ErmjDealHandler.prototype.executeSync = function (msg) {
        var _this = this;
        var userArr = msg._para.user_cards || [];
        var map = {};
        userArr.forEach(function (data) {
            var localSeat = _this.SitHelper.serverSToLocalN(data.chair);
            map[localSeat] = data;
        });
        this.mainUI.onDealDirectly(map, msg._para.left_count);
    };
    return ErmjDealHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjDealHandler;

cc._RF.pop();