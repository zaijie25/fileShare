
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/game/serverHelper/BaseServerHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e8b81yzVa1C0p9o+pHO3b7L', 'BaseServerHelper');
// hall/scripts/logic/core/game/serverHelper/BaseServerHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseServerHelper = /** @class */ (function () {
    function BaseServerHelper(server) {
        this.server = server;
        this.onInit();
    }
    BaseServerHelper.prototype.onInit = function () { };
    BaseServerHelper.prototype.run = function () { };
    //GameServer关闭时 清理适用
    BaseServerHelper.prototype.clear = function () { };
    BaseServerHelper.prototype.onUpdate = function (dt) { };
    return BaseServerHelper;
}());
exports.default = BaseServerHelper;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGdhbWVcXHNlcnZlckhlbHBlclxcQmFzZVNlcnZlckhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0lBSUksMEJBQVksTUFBTTtRQUVkLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRVMsaUNBQU0sR0FBaEIsY0FBbUIsQ0FBQztJQUViLDhCQUFHLEdBQVYsY0FBYSxDQUFDO0lBRWQsb0JBQW9CO0lBQ2IsZ0NBQUssR0FBWixjQUNDLENBQUM7SUFFSyxtQ0FBUSxHQUFmLFVBQWdCLEVBQUUsSUFDakIsQ0FBQztJQUVOLHVCQUFDO0FBQUQsQ0FyQkEsQUFxQkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lU2VydmVyIGZyb20gXCIuLi9HYW1lU2VydmVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlU2VydmVySGVscGVyXHJcbntcclxuICAgIHByb3RlY3RlZCBzZXJ2ZXI6R2FtZVNlcnZlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzZXJ2ZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXI7XHJcbiAgICAgICAgdGhpcy5vbkluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCl7fVxyXG5cclxuICAgIHB1YmxpYyBydW4oKXt9XHJcblxyXG4gICAgLy9HYW1lU2VydmVy5YWz6Zet5pe2IOa4heeQhumAgueUqFxyXG4gICAgcHVibGljIGNsZWFyKClcclxuICAgIHt9XHJcblxyXG4gICAgcHVibGljIG9uVXBkYXRlKGR0KVxyXG4gICAge31cclxuXHJcbn0iXX0=