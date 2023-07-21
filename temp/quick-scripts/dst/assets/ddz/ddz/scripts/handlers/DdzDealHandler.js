
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/handlers/DdzDealHandler.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '19ec6exyS9PkZcBafdE50hc', 'DdzDealHandler');
// ddz/ddz/scripts/handlers/DdzDealHandler.ts

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
var DdzDealHandler = /** @class */ (function (_super) {
    __extends(DdzDealHandler, _super);
    function DdzDealHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DdzDealHandler.prototype.execute = function (msg) {
        var userCards = msg._para.UserCards || [];
        this.setSelfPokers(userCards);
        this.mainUI.showActionTimer(false);
        this.mainUI.dealPokersAnim();
    };
    DdzDealHandler.prototype.executeSync = function (msg) {
        var userCards = msg._para.UserCards || [];
        this.setSelfPokers(userCards);
        this.mainUI.dealPokerDirect(userCards);
    };
    DdzDealHandler.prototype.setSelfPokers = function (usercards) {
        var _this = this;
        usercards.forEach(function (user) {
            var localSeat = _this.SitHelper.serverSToLocalN(user.chair);
            if (localSeat == 0) {
                if (user.all_cards && !Global.Toolkit.isEmptyObject(user.all_cards)) {
                    _this.mainUI.selfPlayView.setGroupPokersValue(user.all_cards);
                    _this.context.addSelfHandPokers(user.all_cards, true);
                }
            }
        });
    };
    return DdzDealHandler;
}(DdzBaseHandler_1.default));
exports.default = DdzDealHandler;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGhhbmRsZXJzXFxEZHpEZWFsSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFFOUM7SUFBNEMsa0NBQWM7SUFBMUQ7O0lBeUJBLENBQUM7SUF4QmEsZ0NBQU8sR0FBakIsVUFBa0IsR0FBRztRQUNqQixJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFUyxvQ0FBVyxHQUFyQixVQUFzQixHQUFHO1FBQ3JCLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTyxzQ0FBYSxHQUFyQixVQUFzQixTQUFTO1FBQS9CLGlCQVVDO1FBVEcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7WUFDbkIsSUFBSSxTQUFTLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNELElBQUksU0FBUyxJQUFJLENBQUMsRUFBQztnQkFDZixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUM7b0JBQ2hFLEtBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDN0QsS0FBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN4RDthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQXpCQSxBQXlCQyxDQXpCMkMsd0JBQWMsR0F5QnpEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERkekJhc2VIYW5kbGVyIGZyb20gXCIuL0RkekJhc2VIYW5kbGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZHpEZWFsSGFuZGxlciBleHRlbmRzIERkekJhc2VIYW5kbGVye1xyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGUobXNnKXtcclxuICAgICAgICBsZXQgdXNlckNhcmRzID0gbXNnLl9wYXJhLlVzZXJDYXJkcyB8fCBbXTtcclxuICAgICAgICB0aGlzLnNldFNlbGZQb2tlcnModXNlckNhcmRzKTtcclxuICAgICAgICB0aGlzLm1haW5VSS5zaG93QWN0aW9uVGltZXIoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubWFpblVJLmRlYWxQb2tlcnNBbmltKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGV4ZWN1dGVTeW5jKG1zZyl7XHJcbiAgICAgICAgbGV0IHVzZXJDYXJkcyA9IG1zZy5fcGFyYS5Vc2VyQ2FyZHMgfHwgW107XHJcbiAgICAgICAgdGhpcy5zZXRTZWxmUG9rZXJzKHVzZXJDYXJkcyk7XHJcbiAgICAgICAgdGhpcy5tYWluVUkuZGVhbFBva2VyRGlyZWN0KHVzZXJDYXJkcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTZWxmUG9rZXJzKHVzZXJjYXJkcyl7XHJcbiAgICAgICAgdXNlcmNhcmRzLmZvckVhY2goKHVzZXIpID0+IHtcclxuICAgICAgICAgICAgbGV0IGxvY2FsU2VhdCA9IHRoaXMuU2l0SGVscGVyLnNlcnZlclNUb0xvY2FsTih1c2VyLmNoYWlyKTtcclxuICAgICAgICAgICAgaWYgKGxvY2FsU2VhdCA9PSAwKXtcclxuICAgICAgICAgICAgICAgIGlmICh1c2VyLmFsbF9jYXJkcyAmJiAhR2xvYmFsLlRvb2xraXQuaXNFbXB0eU9iamVjdCh1c2VyLmFsbF9jYXJkcykpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFpblVJLnNlbGZQbGF5Vmlldy5zZXRHcm91cFBva2Vyc1ZhbHVlKHVzZXIuYWxsX2NhcmRzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuYWRkU2VsZkhhbmRQb2tlcnModXNlci5hbGxfY2FyZHMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=