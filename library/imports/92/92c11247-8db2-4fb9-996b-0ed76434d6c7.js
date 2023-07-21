"use strict";
cc._RF.push(module, '92c11JHjbJPuZlrDtdkNNbH', 'DdzReadyHandler');
// ddz/ddz/scripts/handlers/DdzReadyHandler.ts

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
var DdzReadyHandler = /** @class */ (function (_super) {
    __extends(DdzReadyHandler, _super);
    function DdzReadyHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzReadyHandler.prototype.execute = function (msg) {
        this.context.isWaitMatch = false;
        this.mainUI.matchPlayerView.active = false;
        var time = msg._timeo * 1000 - (Date.now() - msg._receiveTime);
        // if (time <= 0)
        //     time = 1000;
        if (time >= 1000)
            this.mainUI.showActionTimer(true, 0, time, null);
    };
    DdzReadyHandler.prototype.executeSync = function (msg) {
        this.execute(msg);
    };
    return DdzReadyHandler;
}(DdzBaseHandler_1.default));
exports.default = DdzReadyHandler;

cc._RF.pop();