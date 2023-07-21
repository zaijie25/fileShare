"use strict";
cc._RF.push(module, 'ce291iJJhVPEaVJr3g2dyZ4', 'ErmjBankerHandler');
// ermj/Ermj/scripts/handlers/ErmjBankerHandler.ts

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
var ErmjBankerHandler = /** @class */ (function (_super) {
    __extends(ErmjBankerHandler, _super);
    function ErmjBankerHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjBankerHandler.prototype.execute = function (msg) {
        var banker = msg._para.banker;
        var bankerLocalSeat = this.SitHelper.serverSToLocalN(banker);
        this.context.set(this.Define.FieldBankerSeat, bankerLocalSeat);
        this.mainUI.onBanker(bankerLocalSeat, msg._para.dice, true);
    };
    ErmjBankerHandler.prototype.executeSync = function (msg) {
        var banker = msg._para.banker;
        var bankerLocalSeat = this.SitHelper.serverSToLocalN(banker);
        this.context.set(this.Define.FieldBankerSeat, bankerLocalSeat);
        this.mainUI.onBanker(bankerLocalSeat, msg._para.dice, false);
    };
    return ErmjBankerHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjBankerHandler;

cc._RF.pop();