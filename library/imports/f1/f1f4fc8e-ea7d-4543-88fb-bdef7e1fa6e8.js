"use strict";
cc._RF.push(module, 'f1f4fyO6n1FQ4j7ve9+H6bo', 'StartUpCommand');
// hall/scripts/logic/hall/MVC/command/StartUpCommand.ts

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
var HallConst_1 = require("../HallConst");
var PreModelCommand_1 = require("../command/PreModelCommand");
var PreViewCommand_1 = require("../command/PreViewCommand");
var StartUpCommand = /** @class */ (function (_super) {
    __extends(StartUpCommand, _super);
    function StartUpCommand() {
        var _this = _super.call(this) || this;
        Logger.log('StartUpcommand init');
        return _this;
    }
    StartUpCommand.prototype.initializeMacroCommand = function () {
        _super.prototype.initializeMacroCommand.call(this);
        Logger.log("StartUpCommand initializeMacroCommand");
        this.addSubCommand(PreModelCommand_1.default);
        this.addSubCommand(PreViewCommand_1.default);
    };
    StartUpCommand.prototype.execute = function (note) {
        _super.prototype.execute.call(this, note);
        Logger.log('--------------startUpCommand execute-----------');
        this.sendNotification(HallConst_1.default.PUSH_VIEW, {}, HallConst_1.default.HALL_SCENE);
    };
    return StartUpCommand;
}(puremvc.MacroCommand));
exports.default = StartUpCommand;

cc._RF.pop();