
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/MVC/HallFacade.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXE1WQ1xcSGFsbEZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBcUQ7QUFDckQseUNBQStCO0FBQy9CO0lBQXdDLDhCQUFjO0lBQXREOztJQW1DQSxDQUFDO0lBakNHLHlDQUFvQixHQUFwQjtRQUNJLGlCQUFNLG9CQUFvQixXQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxnQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBSyxDQUFDLFFBQVEsRUFBRSx3QkFBYyxDQUFDLENBQUE7SUFDeEQsQ0FBQztJQUVELDRCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBRUQscUNBQWdCLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRXRDLENBQUM7SUFDYSwwQkFBZSxHQUE3QjtRQUNJLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RELElBQUksUUFBUSxFQUFFO1lBQ1YsUUFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDNUIsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDekM7UUFDRCxPQUFPO0lBQ1gsQ0FBQztJQUVELHNCQUFrQixzQkFBUTthQUExQjtZQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU5RSxPQUF3QixVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRSxDQUFDOzs7T0FBQTtJQWhDYSxlQUFJLEdBQUcsWUFBWSxDQUFDO0lBa0N0QyxpQkFBQztDQW5DRCxBQW1DQyxDQW5DdUMsT0FBTyxDQUFDLE1BQU0sR0FtQ3JEO2tCQW5Db0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdGFydFVwQ29tbWFuZCBmcm9tICcuL2NvbW1hbmQvU3RhcnRVcENvbW1hbmQnXHJcbmltcG9ydCBDb25zdCBmcm9tICcuL0hhbGxDb25zdCdcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFsbEZhY2FkZSBleHRlbmRzIHB1cmVtdmMuRmFjYWRlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgTkFNRSA9IFwiSGFsbEZhY2FkZVwiO1xyXG4gICAgaW5pdGlhbGl6ZUNvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgc3VwZXIuaW5pdGlhbGl6ZUNvbnRyb2xsZXIoKTtcclxuICAgICAgICB0aGlzLmluaXRDb21tYW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENvbW1hbmQoKSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckNvbW1hbmQoQ29uc3QuU1RBUlRfVVAsIFN0YXJ0VXBDb21tYW5kKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0VXAoKSB7XHJcbiAgICAgICAgdGhpcy5zZW5kTm90aWZpY2F0aW9uKENvbnN0LlNUQVJUX1VQKVxyXG4gICAgfVxyXG5cclxuICAgIHVucmVnaXN0ZXJGYWNhZGUoKXtcclxuICAgICAgICB0aGlzLnJlbW92ZUNvbW1hbmQoQ29uc3QuU1RBUlRfVVApXHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyByZWxlYXNlSW5zdGFuY2UoKXtcclxuICAgICAgICBsZXQgaW5zdGFuY2UgPSBIYWxsRmFjYWRlLmluc3RhbmNlTWFwW0hhbGxGYWNhZGUuTkFNRV1cclxuICAgICAgICBpZiAoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgaW5zdGFuY2UudW5yZWdpc3RlckZhY2FkZSgpO1xyXG4gICAgICAgICAgICBIYWxsRmFjYWRlLnJlbW92ZUNvcmUoSGFsbEZhY2FkZS5OQU1FKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogSGFsbEZhY2FkZSB7XHJcbiAgICAgICAgaWYgKCFIYWxsRmFjYWRlLmluc3RhbmNlTWFwW0hhbGxGYWNhZGUuTkFNRV0pXHJcbiAgICAgICAgICAgIEhhbGxGYWNhZGUuaW5zdGFuY2VNYXBbSGFsbEZhY2FkZS5OQU1FXSA9IG5ldyBIYWxsRmFjYWRlKEhhbGxGYWNhZGUuTkFNRSk7XHJcblxyXG4gICAgICAgIHJldHVybiA8SGFsbEZhY2FkZT48YW55PkhhbGxGYWNhZGUuaW5zdGFuY2VNYXBbSGFsbEZhY2FkZS5OQU1FXTtcclxuICAgIH1cclxuXHJcbn0iXX0=