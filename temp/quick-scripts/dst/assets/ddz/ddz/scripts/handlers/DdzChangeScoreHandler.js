
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/handlers/DdzChangeScoreHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGhhbmRsZXJzXFxEZHpDaGFuZ2VTY29yZUhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBRTlDO0lBQW1ELHlDQUFjO0lBQWpFOztJQUtBLENBQUM7SUFKYSx1Q0FBTyxHQUFqQixVQUFrQixHQUFHO1FBQ2pCLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDTCw0QkFBQztBQUFELENBTEEsQUFLQyxDQUxrRCx3QkFBYyxHQUtoRSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpCYXNlSGFuZGxlciBmcm9tIFwiLi9EZHpCYXNlSGFuZGxlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6Q2hhbmdlU2NvcmVIYW5kbGVyIGV4dGVuZHMgRGR6QmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZShtc2cpe1xyXG4gICAgICAgIGxldCBzZWxlY3RlZCA9IG1zZy5fcGFyYS5zZWxlY3RlZDtcclxuICAgICAgICB0aGlzLm1haW5VSS51cGRhdGVSb3VuZE11bHQoc2VsZWN0ZWQpO1xyXG4gICAgfVxyXG59Il19