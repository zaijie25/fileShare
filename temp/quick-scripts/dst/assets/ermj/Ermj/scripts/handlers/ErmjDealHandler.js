
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/handlers/ErmjDealHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cab56woA1hLfJhDMwVCcPyr', 'ErmjDealHandler');
// ermj/Ermj/scripts/handlers/ErmjDealHandler.ts

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
var ErmjDealHandler = /** @class */ (function (_super) {
    __extends(ErmjDealHandler, _super);
    function ErmjDealHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjDealHandler.prototype.execute = function (msg) {
        var _this = this;
        var bankerSeat = this.context.get(this.Define.FieldBankerSeat);
        var userArr = msg._para.user_cards || [];
        var map = {};
        userArr.forEach(function (data) {
            var localSeat = _this.SitHelper.serverSToLocalN(data.chair);
            map[localSeat] = data;
        });
        this.mainUI.onDeal(map, bankerSeat, msg._para.left_count);
    };
    ErmjDealHandler.prototype.executeSync = function (msg) {
        var _this = this;
        var userArr = msg._para.user_cards || [];
        var map = {};
        userArr.forEach(function (data) {
            var localSeat = _this.SitHelper.serverSToLocalN(data.chair);
            map[localSeat] = data;
        });
        this.mainUI.onDealDirectly(map, msg._para.left_count);
    };
    return ErmjDealHandler;
}(ErmjBaseHandler_1.default));
exports.default = ErmjDealHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcaGFuZGxlcnNcXEVybWpEZWFsSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBZ0Q7QUFFaEQ7SUFBNkMsbUNBQWU7SUFBNUQ7O0lBdUJBLENBQUM7SUF0QmEsaUNBQU8sR0FBakIsVUFBa0IsR0FBRztRQUFyQixpQkFVQztRQVRHLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0QsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO1FBRXpDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ2hCLElBQUksU0FBUyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzRCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFUyxxQ0FBVyxHQUFyQixVQUFzQixHQUFHO1FBQXpCLGlCQVNDO1FBUkcsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO1FBRXpDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ2hCLElBQUksU0FBUyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzRCxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0F2QkEsQUF1QkMsQ0F2QjRDLHlCQUFlLEdBdUIzRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFcm1qQmFzZUhhbmRsZXIgZnJvbSBcIi4vRXJtakJhc2VIYW5kbGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcm1qRGVhbEhhbmRsZXIgZXh0ZW5kcyBFcm1qQmFzZUhhbmRsZXJ7XHJcbiAgICBwcm90ZWN0ZWQgZXhlY3V0ZShtc2cpe1xyXG4gICAgICAgIGxldCBiYW5rZXJTZWF0ID0gdGhpcy5jb250ZXh0LmdldCh0aGlzLkRlZmluZS5GaWVsZEJhbmtlclNlYXQpO1xyXG4gICAgICAgIGxldCB1c2VyQXJyID0gbXNnLl9wYXJhLnVzZXJfY2FyZHMgfHwgW107XHJcblxyXG4gICAgICAgIGxldCBtYXAgPSB7fTtcclxuICAgICAgICB1c2VyQXJyLmZvckVhY2goZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsb2NhbFNlYXQgPSB0aGlzLlNpdEhlbHBlci5zZXJ2ZXJTVG9Mb2NhbE4oZGF0YS5jaGFpcik7XHJcbiAgICAgICAgICAgIG1hcFtsb2NhbFNlYXRdID0gZGF0YTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm1haW5VSS5vbkRlYWwobWFwLCBiYW5rZXJTZWF0LCBtc2cuX3BhcmEubGVmdF9jb3VudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVTeW5jKG1zZyl7XHJcbiAgICAgICAgbGV0IHVzZXJBcnIgPSBtc2cuX3BhcmEudXNlcl9jYXJkcyB8fCBbXTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbWFwID0ge307XHJcbiAgICAgICAgdXNlckFyci5mb3JFYWNoKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbG9jYWxTZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKGRhdGEuY2hhaXIpO1xyXG4gICAgICAgICAgICBtYXBbbG9jYWxTZWF0XSA9IGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkub25EZWFsRGlyZWN0bHkobWFwLCBtc2cuX3BhcmEubGVmdF9jb3VudCk7XHJcbiAgICB9XHJcbn0iXX0=