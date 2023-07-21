
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/MVC/command/StartUpCommand.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXE1WQ1xcY29tbWFuZFxcU3RhcnRVcENvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQWdDO0FBQ2hDLDhEQUF3RDtBQUN4RCw0REFBc0Q7QUFFdEQ7SUFBNEMsa0NBQW9CO0lBQzVEO1FBQUEsWUFDSSxpQkFBTyxTQUVWO1FBREcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBOztJQUNyQyxDQUFDO0lBRUQsK0NBQXNCLEdBQXRCO1FBQ0ksaUJBQU0sc0JBQXNCLFdBQUUsQ0FBQztRQUMvQixNQUFNLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxDQUFDLENBQUE7UUFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyx5QkFBZSxDQUFDLENBQUE7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyx3QkFBYyxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUVELGdDQUFPLEdBQVAsVUFBUSxJQUFJO1FBQ1IsaUJBQU0sT0FBTyxZQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsaURBQWlELENBQUMsQ0FBQTtRQUM3RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQUssQ0FBQyxTQUFTLEVBQUMsRUFBRSxFQUFDLG1CQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FsQkEsQUFrQkMsQ0FsQjJDLE9BQU8sQ0FBQyxZQUFZLEdBa0IvRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb25zdCBmcm9tICcuLi9IYWxsQ29uc3QnXHJcbmltcG9ydCBQcmVNb2RlbENvbW1hbmQgZnJvbSAnLi4vY29tbWFuZC9QcmVNb2RlbENvbW1hbmQnXHJcbmltcG9ydCBQcmVWaWV3Q29tbWFuZCBmcm9tICcuLi9jb21tYW5kL1ByZVZpZXdDb21tYW5kJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhcnRVcENvbW1hbmQgZXh0ZW5kcyBwdXJlbXZjLk1hY3JvQ29tbWFuZHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIExvZ2dlci5sb2coJ1N0YXJ0VXBjb21tYW5kIGluaXQnKVxyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVNYWNyb0NvbW1hbmQoKXtcclxuICAgICAgICBzdXBlci5pbml0aWFsaXplTWFjcm9Db21tYW5kKCk7XHJcbiAgICAgICAgTG9nZ2VyLmxvZyhcIlN0YXJ0VXBDb21tYW5kIGluaXRpYWxpemVNYWNyb0NvbW1hbmRcIilcclxuICAgICAgICB0aGlzLmFkZFN1YkNvbW1hbmQoUHJlTW9kZWxDb21tYW5kKVxyXG4gICAgICAgIHRoaXMuYWRkU3ViQ29tbWFuZChQcmVWaWV3Q29tbWFuZClcclxuICAgIH1cclxuXHJcbiAgICBleGVjdXRlKG5vdGUpe1xyXG4gICAgICAgIHN1cGVyLmV4ZWN1dGUobm90ZSlcclxuICAgICAgICBMb2dnZXIubG9nKCctLS0tLS0tLS0tLS0tLXN0YXJ0VXBDb21tYW5kIGV4ZWN1dGUtLS0tLS0tLS0tLScpXHJcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKENvbnN0LlBVU0hfVklFVyx7fSxDb25zdC5IQUxMX1NDRU5FKVxyXG4gICAgfVxyXG59Il19