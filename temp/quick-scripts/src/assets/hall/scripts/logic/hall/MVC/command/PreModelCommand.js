"use strict";
cc._RF.push(module, '4bc38NwAjVHyLsZvx7pGq9X', 'PreModelCommand');
// hall/scripts/logic/hall/MVC/command/PreModelCommand.ts

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
var AppConfigProxy_1 = require("../model/proxy/AppConfigProxy");
var PreModelCommand = /** @class */ (function (_super) {
    __extends(PreModelCommand, _super);
    function PreModelCommand() {
        return _super.call(this) || this;
    }
    PreModelCommand.prototype.execute = function (notification) {
        _super.prototype.execute.call(this, notification);
        this.facade.registerProxy(new AppConfigProxy_1.default());
    };
    return PreModelCommand;
}(puremvc.SimpleCommand));
exports.default = PreModelCommand;

cc._RF.pop();