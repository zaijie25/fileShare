"use strict";
cc._RF.push(module, '2d1faQa94lPiaJ0kJrQS+N0', 'DdzRefreshHandPokerHandler');
// ddz/ddz/scripts/handlers/DdzRefreshHandPokerHandler.ts

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
var DdzRefreshHandPokerHandler = /** @class */ (function (_super) {
    __extends(DdzRefreshHandPokerHandler, _super);
    function DdzRefreshHandPokerHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzRefreshHandPokerHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        if (localSeat == 0) {
            this.context.refreshHandPokers(msg._para.cards);
        }
    };
    DdzRefreshHandPokerHandler.prototype.executeSync = function (msg) {
        this.execute(msg);
    };
    return DdzRefreshHandPokerHandler;
}(DdzBaseHandler_1.default));
exports.default = DdzRefreshHandPokerHandler;

cc._RF.pop();