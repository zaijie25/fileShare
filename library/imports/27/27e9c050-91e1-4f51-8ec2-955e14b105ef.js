"use strict";
cc._RF.push(module, '27e9cBQkeFPUY7ClV4UsQXv', 'DdzChangeScoreHandler');
// ddz/ddz/scripts/handlers/DdzChangeScoreHandler.ts

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
var DdzChangeScoreHandler = /** @class */ (function (_super) {
    __extends(DdzChangeScoreHandler, _super);
    function DdzChangeScoreHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzChangeScoreHandler.prototype.execute = function (msg) {
        var selected = msg._para.selected;
        this.mainUI.updateRoundMult(selected);
    };
    return DdzChangeScoreHandler;
}(DdzBaseHandler_1.default));
exports.default = DdzChangeScoreHandler;

cc._RF.pop();