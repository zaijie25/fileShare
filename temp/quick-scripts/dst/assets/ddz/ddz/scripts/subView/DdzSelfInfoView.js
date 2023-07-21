
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/subView/DdzSelfInfoView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '03c7euicuZNKbg0friNWWOo', 'DdzSelfInfoView');
// ddz/ddz/scripts/subView/DdzSelfInfoView.ts

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
var DdzBaseView_1 = require("./DdzBaseView");
var DdzDriver_1 = require("../DdzDriver");
/**
 * 玩家自己的个人信息view
 */
var DdzSelfInfoView = /** @class */ (function (_super) {
    __extends(DdzSelfInfoView, _super);
    function DdzSelfInfoView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    DdzSelfInfoView.prototype.initView = function () {
        this.nameLbl = this.getComponent('nameNode/nameLbl', cc.Label);
        this.idLbl = this.getComponent('nameNode/idLbl', cc.Label);
        this.headImg = this.getComponent('nameNode/mask/headImg', cc.Sprite);
        this.headBox = this.getComponent("nameNode/headBox", cc.Sprite);
        this.coinLbl = this.getComponent('coinNode/coinLbl', cc.Label);
        this.vip = this.getComponent("nameNode/vip", cc.Sprite);
    };
    DdzSelfInfoView.prototype.updateSelfInfo = function () {
        var player = Global.PlayerData;
        if (this.headBox) {
            DdzDriver_1.default.instance.LoadVipHeadKuang(this.headBox, player.headkuang);
        }
        this.loadHeadImg(player.headimg);
        this.nameLbl.string = player.nickname;
        this.idLbl.string = 'ID:' + player.uid;
        // this.idLbl.string = Global.Toolkit.formatPointStr(player.point, true);
        this.coinLbl.string = Global.Toolkit.formatPointStr(player.point, true);
        if (this.vip)
            Global.Toolkit.loadLocalVipIconGame(this.vip, player.vip);
    };
    DdzSelfInfoView.prototype.loadHeadImg = function (str) {
        this.headImg.spriteFrame = Global.Toolkit.getLocalHeadSf(str);
    };
    DdzSelfInfoView.prototype.updateSelfPoint = function (point) {
        this.coinLbl.string = Global.Toolkit.formatPointStr(point, true);
    };
    return DdzSelfInfoView;
}(DdzBaseView_1.default));
exports.default = DdzSelfInfoView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHN1YlZpZXdcXERkelNlbGZJbmZvVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBd0M7QUFDeEMsMENBQXFDO0FBRXJDOztHQUVHO0FBQ0g7SUFBNkMsbUNBQVc7SUFPcEQseUJBQVksSUFBYTtRQUF6QixZQUNJLGlCQUFPLFNBRVY7UUFERyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRVMsa0NBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFhLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxLQUFLLEdBQWEsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLE9BQU8sR0FBYyxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsT0FBTyxHQUFjLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzFFLElBQUksQ0FBQyxPQUFPLEdBQWEsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLEdBQUcsR0FBYyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdEUsQ0FBQztJQUVNLHdDQUFjLEdBQXJCO1FBQ0ksSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUMvQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxtQkFBUyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN2RTtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUU7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDdkMseUVBQXlFO1FBQ3pFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEUsSUFBSSxJQUFJLENBQUMsR0FBRztZQUNSLE1BQU0sQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVPLHFDQUFXLEdBQW5CLFVBQW9CLEdBQVc7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVNLHlDQUFlLEdBQXRCLFVBQXVCLEtBQWE7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDTCxzQkFBQztBQUFELENBMUNBLEFBMENDLENBMUM0QyxxQkFBVyxHQTBDdkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGR6QmFzZVZpZXcgZnJvbSBcIi4vRGR6QmFzZVZpZXdcIjtcclxuaW1wb3J0IERkekRyaXZlciBmcm9tIFwiLi4vRGR6RHJpdmVyXCI7XHJcblxyXG4vKipcclxuICog546p5a626Ieq5bex55qE5Liq5Lq65L+h5oGvdmlld1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6U2VsZkluZm9WaWV3IGV4dGVuZHMgRGR6QmFzZVZpZXcge1xyXG4gICAgcHJpdmF0ZSBuYW1lTGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgaWRMYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBoZWFkSW1nOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIGNvaW5MYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBoZWFkQm94OiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIHZpcDogY2MuU3ByaXRlO1xyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLm5hbWVMYmwgPSA8Y2MuTGFiZWw+dGhpcy5nZXRDb21wb25lbnQoJ25hbWVOb2RlL25hbWVMYmwnLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5pZExibCA9IDxjYy5MYWJlbD50aGlzLmdldENvbXBvbmVudCgnbmFtZU5vZGUvaWRMYmwnLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5oZWFkSW1nID0gPGNjLlNwcml0ZT50aGlzLmdldENvbXBvbmVudCgnbmFtZU5vZGUvbWFzay9oZWFkSW1nJywgY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLmhlYWRCb3ggPSA8Y2MuU3ByaXRlPnRoaXMuZ2V0Q29tcG9uZW50KFwibmFtZU5vZGUvaGVhZEJveFwiLCBjYy5TcHJpdGUpXHJcbiAgICAgICAgdGhpcy5jb2luTGJsID0gPGNjLkxhYmVsPnRoaXMuZ2V0Q29tcG9uZW50KCdjb2luTm9kZS9jb2luTGJsJywgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMudmlwID0gPGNjLlNwcml0ZT50aGlzLmdldENvbXBvbmVudChcIm5hbWVOb2RlL3ZpcFwiLCBjYy5TcHJpdGUpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNlbGZJbmZvKCkge1xyXG4gICAgICAgIGxldCBwbGF5ZXIgPSBHbG9iYWwuUGxheWVyRGF0YTtcclxuICAgICAgICBpZiAodGhpcy5oZWFkQm94KSB7XHJcbiAgICAgICAgICAgIERkekRyaXZlci5pbnN0YW5jZS5Mb2FkVmlwSGVhZEt1YW5nKHRoaXMuaGVhZEJveCwgcGxheWVyLmhlYWRrdWFuZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZEhlYWRJbWcocGxheWVyLmhlYWRpbWcpO1xyXG4gICAgICAgIHRoaXMubmFtZUxibC5zdHJpbmcgPSBwbGF5ZXIubmlja25hbWUgO1xyXG4gICAgICAgIHRoaXMuaWRMYmwuc3RyaW5nID0gJ0lEOicgKyBwbGF5ZXIudWlkO1xyXG4gICAgICAgIC8vIHRoaXMuaWRMYmwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIocGxheWVyLnBvaW50LCB0cnVlKTtcclxuICAgICAgICB0aGlzLmNvaW5MYmwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIocGxheWVyLnBvaW50LCB0cnVlKTtcclxuICAgICAgICBpZiAodGhpcy52aXApXHJcbiAgICAgICAgICAgIEdsb2JhbC5Ub29sa2l0LmxvYWRMb2NhbFZpcEljb25HYW1lKHRoaXMudmlwLCBwbGF5ZXIudmlwKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRIZWFkSW1nKHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5oZWFkSW1nLnNwcml0ZUZyYW1lID0gR2xvYmFsLlRvb2xraXQuZ2V0TG9jYWxIZWFkU2Yoc3RyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2VsZlBvaW50KHBvaW50OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmNvaW5MYmwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIocG9pbnQsIHRydWUpO1xyXG4gICAgfVxyXG59Il19