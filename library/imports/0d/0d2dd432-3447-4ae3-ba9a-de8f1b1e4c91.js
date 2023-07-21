"use strict";
cc._RF.push(module, '0d2ddQyNEdK47qa3o8bHkyR', 'ErmjAutoHandler');
// ermj/Ermj/scripts/handlers/ErmjAutoHandler.ts

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
var ErmjAutoHandler = /** @class */ (function (_super) {
    __extends(ErmjAutoHandler, _super);
    function ErmjAutoHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjAutoHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var isAuto = msg._para.auto_play == 1;
        this.mainUI.callPlayer(localSeat, 'showAutoSign', isAuto);
        if (localSeat == 0) {
            this.mainUI.askBtnView.setAutoPlayBtnShow(!isAuto);
            this.mainUI.doResetMj();
            this.context.isCmdAuto = isAuto;
        }
    };
    ErmjAutoHandler.prototype.executeSync = function (msg) {
        this.execute(msg);
    };
    return ErmjAutoHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjAutoHandler;

cc._RF.pop();