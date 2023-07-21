
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/views/HallMoreGameTopNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'efcfbzazNhPYIWYkSD2QHDn', 'HallMoreGameTopNode');
// hall/scripts/logic/hall/ui/hall/views/HallMoreGameTopNode.ts

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
var ViewBase_1 = require("../../../../core/ui/ViewBase");
var PlayerWallet_1 = require("../../../../core/component/PlayerWallet");
var PlayerHeadView_1 = require("./PlayerHeadView");
var HallBtnHelper_1 = require("./HallBtnHelper");
var GlobalEvent_1 = require("../../../../core/GlobalEvent");
var HallMoreGameTopNode = /** @class */ (function (_super) {
    __extends(HallMoreGameTopNode, _super);
    function HallMoreGameTopNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HallMoreGameTopNode.prototype.initView = function () {
        //头像组件
        this.playerHead = this.addView("PlayerHeadView", this.getChild("PlayerHeadView"), PlayerHeadView_1.default, true);
        //钱包组件
        this.playerWalllet = this.addView("PlayerWallet", this.getChild("PlayerHeadView/PlayerWallet"), PlayerWallet_1.default, true);
        this.playerWalllet.rechargeAction();
        //点击事件注册
        this.addCommonClick("PlayerHeadView/head", this.onHeadClick, this, null);
        this.addCommonClick("moreGameCloseBtn", this.onCloseMoreGame, this);
    };
    HallMoreGameTopNode.prototype.onSubViewShow = function () {
        this.playerWalllet.subViewState = true;
        this.playerHead.subViewState = true;
    };
    HallMoreGameTopNode.prototype.onSubViewHide = function () {
    };
    HallMoreGameTopNode.prototype.onDispose = function () {
    };
    /***************************************************** 点击事件区域 **************************************/
    HallMoreGameTopNode.prototype.onHeadClick = function () {
        HallBtnHelper_1.default.WndPersonalInfoOpen();
    };
    HallMoreGameTopNode.prototype.onCloseMoreGame = function () {
        Global.Event.event(GlobalEvent_1.default.CloseMoreGame, true);
    };
    return HallMoreGameTopNode;
}(ViewBase_1.default));
exports.default = HallMoreGameTopNode;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFx2aWV3c1xcSGFsbE1vcmVHYW1lVG9wTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBb0Q7QUFDcEQsd0VBQW1FO0FBQ25FLG1EQUE4QztBQUU5QyxpREFBNEM7QUFDNUMsNERBQXVEO0FBRXZEO0lBQWlELHVDQUFRO0lBQXpEOztJQTBDQSxDQUFDO0lBcENhLHNDQUFRLEdBQWxCO1FBRUksTUFBTTtRQUNOLElBQUksQ0FBQyxVQUFVLEdBQW1CLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFDLHdCQUFjLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDckgsTUFBTTtRQUNOLElBQUksQ0FBQyxhQUFhLEdBQWtCLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsNkJBQTZCLENBQUMsRUFBQyxzQkFBWSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hJLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDcEMsUUFBUTtRQUNSLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsRUFBQyxJQUFJLENBQUMsZUFBZSxFQUFDLElBQUksQ0FBQyxDQUFBO0lBRXJFLENBQUM7SUFFRCwyQ0FBYSxHQUFiO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTtJQUN2QyxDQUFDO0lBRUQsMkNBQWEsR0FBYjtJQUNBLENBQUM7SUFFRCx1Q0FBUyxHQUFUO0lBR0EsQ0FBQztJQUVELHFHQUFxRztJQUU3Rix5Q0FBVyxHQUFuQjtRQUVJLHVCQUFhLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRU8sNkNBQWUsR0FBdkI7UUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxxQkFBVyxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQTFDQSxBQTBDQyxDQTFDZ0Qsa0JBQVEsR0EwQ3hEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBQbGF5ZXJXYWxsZXQgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvY29tcG9uZW50L1BsYXllcldhbGxldFwiO1xyXG5pbXBvcnQgUGxheWVySGVhZFZpZXcgZnJvbSBcIi4vUGxheWVySGVhZFZpZXdcIjtcclxuaW1wb3J0IEhhbGxNb2RlbCwgeyBIYWxsUmVkU3BvdFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9IYWxsTW9kZWxcIjtcclxuaW1wb3J0IEhhbGxCdG5IZWxwZXIgZnJvbSBcIi4vSGFsbEJ0bkhlbHBlclwiO1xyXG5pbXBvcnQgR2xvYmFsRXZlbnQgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvR2xvYmFsRXZlbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhbGxNb3JlR2FtZVRvcE5vZGUgZXh0ZW5kcyBWaWV3QmFzZVxyXG57XHJcbiAgICBwcml2YXRlIHBsYXllcldhbGxsZXQ6UGxheWVyV2FsbGV0O1xyXG5cclxuICAgIHByaXZhdGUgcGxheWVySGVhZDpQbGF5ZXJIZWFkVmlld1xyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpLTlg4/nu4Tku7ZcclxuICAgICAgICB0aGlzLnBsYXllckhlYWQgPSA8UGxheWVySGVhZFZpZXc+dGhpcy5hZGRWaWV3KFwiUGxheWVySGVhZFZpZXdcIix0aGlzLmdldENoaWxkKFwiUGxheWVySGVhZFZpZXdcIiksUGxheWVySGVhZFZpZXcsdHJ1ZSk7XHJcbiAgICAgICAgLy/pkrHljIXnu4Tku7ZcclxuICAgICAgICB0aGlzLnBsYXllcldhbGxsZXQgPSAgPFBsYXllcldhbGxldD50aGlzLmFkZFZpZXcoXCJQbGF5ZXJXYWxsZXRcIix0aGlzLmdldENoaWxkKFwiUGxheWVySGVhZFZpZXcvUGxheWVyV2FsbGV0XCIpLFBsYXllcldhbGxldCx0cnVlKTtcclxuICAgICAgICB0aGlzLnBsYXllcldhbGxsZXQucmVjaGFyZ2VBY3Rpb24oKTtcclxuICAgICAgICAvL+eCueWHu+S6i+S7tuazqOWGjFxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJQbGF5ZXJIZWFkVmlldy9oZWFkXCIsIHRoaXMub25IZWFkQ2xpY2ssIHRoaXMsIG51bGwpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJtb3JlR2FtZUNsb3NlQnRuXCIsdGhpcy5vbkNsb3NlTW9yZUdhbWUsdGhpcylcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblN1YlZpZXdTaG93KCl7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJXYWxsbGV0LnN1YlZpZXdTdGF0ZSA9IHRydWVcclxuICAgICAgICB0aGlzLnBsYXllckhlYWQuc3ViVmlld1N0YXRlID0gdHJ1ZVxyXG4gICAgfVxyXG5cclxuICAgIG9uU3ViVmlld0hpZGUoKXtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc3Bvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiDngrnlh7vkuovku7bljLrln58gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4gICAgcHJpdmF0ZSBvbkhlYWRDbGljaygpXHJcbiAgICB7XHJcbiAgICAgICAgSGFsbEJ0bkhlbHBlci5XbmRQZXJzb25hbEluZm9PcGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsb3NlTW9yZUdhbWUoKXtcclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuQ2xvc2VNb3JlR2FtZSx0cnVlKTtcclxuICAgIH1cclxufSJdfQ==