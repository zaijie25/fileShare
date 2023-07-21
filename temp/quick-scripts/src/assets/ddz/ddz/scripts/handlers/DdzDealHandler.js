"use strict";
cc._RF.push(module, '19ec6exyS9PkZcBafdE50hc', 'DdzDealHandler');
// ddz/ddz/scripts/handlers/DdzDealHandler.ts

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
var DdzBaseHandler_1 = require("./DdzBaseHandler");
var DdzDealHandler = /** @class */ (function (_super) {
    __extends(DdzDealHandler, _super);
    function DdzDealHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzDealHandler.prototype.execute = function (msg) {
        var userCards = msg._para.UserCards || [];
        this.setSelfPokers(userCards);
        this.mainUI.showActionTimer(false);
        this.mainUI.dealPokersAnim();
    };
    DdzDealHandler.prototype.executeSync = function (msg) {
        var userCards = msg._para.UserCards || [];
        this.setSelfPokers(userCards);
        this.mainUI.dealPokerDirect(userCards);
    };
    DdzDealHandler.prototype.setSelfPokers = function (usercards) {
        var _this = this;
        usercards.forEach(function (user) {
            var localSeat = _this.SitHelper.serverSToLocalN(user.chair);
            if (localSeat == 0) {
                if (user.all_cards && !Global.Toolkit.isEmptyObject(user.all_cards)) {
                    _this.mainUI.selfPlayView.setGroupPokersValue(user.all_cards);
                    _this.context.addSelfHandPokers(user.all_cards, true);
                }
            }
        });
    };
    return DdzDealHandler;
}(DdzBaseHandler_1.default));
exports.default = DdzDealHandler;

cc._RF.pop();