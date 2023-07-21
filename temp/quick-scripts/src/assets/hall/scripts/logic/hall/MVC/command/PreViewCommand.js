"use strict";
cc._RF.push(module, '240b02BN/5E94Gw3m5XyuXk', 'PreViewCommand');
// hall/scripts/logic/hall/MVC/command/PreViewCommand.ts

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
var ViewMediator_1 = require("../mediator/ViewMediator");
var PreViewCommand = /** @class */ (function (_super) {
    __extends(PreViewCommand, _super);
    function PreViewCommand() {
        return _super.call(this) || this;
    }
    PreViewCommand.prototype.execute = function (notification) {
        _super.prototype.execute.call(this, notification);
        this.facade.registerMediator(new ViewMediator_1.default());
    };
    return PreViewCommand;
}(puremvc.SimpleCommand));
exports.default = PreViewCommand;

cc._RF.pop();