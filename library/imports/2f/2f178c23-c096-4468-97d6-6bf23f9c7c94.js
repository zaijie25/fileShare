"use strict";
cc._RF.push(module, '2f178wjwJZEaJfWa/I/nHyU', 'ErmjChangeFlowerHandler');
// ermj/Ermj/scripts/handlers/ErmjChangeFlowerHandler.ts

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
var ErmjChangeFlowerHandler = /** @class */ (function (_super) {
    __extends(ErmjChangeFlowerHandler, _super);
    function ErmjChangeFlowerHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjChangeFlowerHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var outArr = msg._para.flowers || [];
        var inArr = msg._para.new_cards || [];
        this.mainUI.onChangeFlower(localSeat, outArr, inArr, msg._para.left_count);
    };
    ErmjChangeFlowerHandler.prototype.executeSync = function (msg) {
        // 重连不会进这个协议, 合并到table_data
    };
    return ErmjChangeFlowerHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjChangeFlowerHandler;

cc._RF.pop();