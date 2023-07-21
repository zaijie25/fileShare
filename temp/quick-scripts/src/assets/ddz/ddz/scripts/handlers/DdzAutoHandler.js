"use strict";
cc._RF.push(module, '14424G4pFFA+68ipG/M2iLw', 'DdzAutoHandler');
// ddz/ddz/scripts/handlers/DdzAutoHandler.ts

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
var DdzAutoHandler = /** @class */ (function (_super) {
    __extends(DdzAutoHandler, _super);
    function DdzAutoHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzAutoHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var isAuto = msg._para.auto_play == 1;
        this.mainUI.callPlayer(localSeat, 'showAutoSign', isAuto);
        if (localSeat == 0) {
            this.mainUI.askActionView.setAutoPlayBtnShow(!isAuto);
            this.mainUI.doResetPokers();
        }
    };
    DdzAutoHandler.prototype.executeSync = function (msg) {
        this.execute(msg);
    };
    return DdzAutoHandler;
}(DdzBaseHandler_1.default));
exports.default = DdzAutoHandler;

cc._RF.pop();