
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/handlers/DdzAutoHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '14424G4pFFA+68ipG/M2iLw', 'DdzAutoHandler');
// ddz/ddz/scripts/handlers/DdzAutoHandler.ts

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
var DdzAutoHandler = /** @class */ (function (_super) {
    __extends(DdzAutoHandler, _super);
    function DdzAutoHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzAutoHandler.prototype.execute = function (msg) {
        var localSeat = this.SitHelper.serverSToLocalN(msg._src);
        var isAuto = msg._para.auto_play == 1;
        this.mainUI.callPlayer(localSeat, 'showAutoSign', isAuto);
        if (localSeat == 0) {
            this.mainUI.askActionView.setAutoPlayBtnShow(!isAuto);
            this.mainUI.doResetPokers();
        }
    };
    DdzAutoHandler.prototype.executeSync = function (msg) {
        this.execute(msg);
    };
    return DdzAutoHandler;
}(DdzBaseHandler_1.default));
exports.default = DdzAutoHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGhhbmRsZXJzXFxEZHpBdXRvSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFFOUM7SUFBNEMsa0NBQWM7SUFBMUQ7O0lBY0EsQ0FBQztJQWJhLGdDQUFPLEdBQWpCLFVBQWtCLEdBQUc7UUFDakIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFELElBQUcsU0FBUyxJQUFJLENBQUMsRUFBQztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFUyxvQ0FBVyxHQUFyQixVQUFzQixHQUFHO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FkQSxBQWNDLENBZDJDLHdCQUFjLEdBY3pEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERkekJhc2VIYW5kbGVyIGZyb20gXCIuL0RkekJhc2VIYW5kbGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZHpBdXRvSGFuZGxlciBleHRlbmRzIERkekJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICBsZXQgbG9jYWxTZWF0ID0gdGhpcy5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKG1zZy5fc3JjKTtcclxuICAgICAgICBsZXQgaXNBdXRvID0gbXNnLl9wYXJhLmF1dG9fcGxheSA9PSAxO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmNhbGxQbGF5ZXIobG9jYWxTZWF0LCAnc2hvd0F1dG9TaWduJywgaXNBdXRvKTtcclxuICAgICAgICBpZihsb2NhbFNlYXQgPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMubWFpblVJLmFza0FjdGlvblZpZXcuc2V0QXV0b1BsYXlCdG5TaG93KCFpc0F1dG8pO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5VSS5kb1Jlc2V0UG9rZXJzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBleGVjdXRlU3luYyhtc2cpe1xyXG4gICAgICAgIHRoaXMuZXhlY3V0ZShtc2cpO1xyXG4gICAgfVxyXG59Il19