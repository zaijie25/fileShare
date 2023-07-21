"use strict";
cc._RF.push(module, 'fcc24qHfcRJzaaA8JsTcL8G', 'HallFacade');
// hall/scripts/logic/hall/MVC/HallFacade.ts

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
var StartUpCommand_1 = require("./command/StartUpCommand");
var HallConst_1 = require("./HallConst");
var HallFacade = /** @class */ (function (_super) {
    __extends(HallFacade, _super);
    function HallFacade() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HallFacade.prototype.initializeController = function () {
        _super.prototype.initializeController.call(this);
        this.initCommand();
    };
    HallFacade.prototype.initCommand = function () {
        this.registerCommand(HallConst_1.default.START_UP, StartUpCommand_1.default);
    };
    HallFacade.prototype.startUp = function () {
        this.sendNotification(HallConst_1.default.START_UP);
    };
    HallFacade.prototype.unregisterFacade = function () {
        this.removeCommand(HallConst_1.default.START_UP);
    };
    HallFacade.releaseInstance = function () {
        var instance = HallFacade.instanceMap[HallFacade.NAME];
        if (instance) {
            instance.unregisterFacade();
            HallFacade.removeCore(HallFacade.NAME);
        }
        return;
    };
    Object.defineProperty(HallFacade, "Instance", {
        get: function () {
            if (!HallFacade.instanceMap[HallFacade.NAME])
                HallFacade.instanceMap[HallFacade.NAME] = new HallFacade(HallFacade.NAME);
            return HallFacade.instanceMap[HallFacade.NAME];
        },
        enumerable: false,
        configurable: true
    });
    HallFacade.NAME = "HallFacade";
    return HallFacade;
}(puremvc.Facade));
exports.default = HallFacade;

cc._RF.pop();