
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/panel/BbwzOnlinePlayerPop.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '324efouKbpEVItbMK6AfMZl', 'BbwzOnlinePlayerPop');
// bbwz/Bbwz/scripts/panel/BbwzOnlinePlayerPop.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BbwzData_1 = require("../data/BbwzData");
var BbwzOnlinePlayerItem_1 = require("../component/BbwzOnlinePlayerItem");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 弹窗 在线玩家界面
 */
var BbwzOnlinePlayerPop = /** @class */ (function (_super) {
    __extends(BbwzOnlinePlayerPop, _super);
    function BbwzOnlinePlayerPop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingKey = "OnlinePlayerPop";
        _this.scrollView = null;
        // 滚动容器内的子节点（范例：用于生成多个）
        _this.itemNode = null;
        return _this;
    }
    BbwzOnlinePlayerPop.prototype.onLoad = function () {
        this.node.setContentSize(cc.Canvas.instance.node.getContentSize());
        this.maskNode = cc.find("mask", this.node);
        this.contentNode = cc.find("content", this.node);
        this.animComp = Global.UIHelper.addAnimComp(this.node, this.contentNode, this.maskNode);
        BbwzConstDefine_1.default.addCommonClick(this.contentNode, "button_close", this.onCloseClick, this);
        BbwzConstDefine_1.default.addCommonClick(this.node, "mask", this.onCloseClick, this, cc.Button.Transition.NONE);
        this.scrollView = cc.find("scrollview", this.contentNode).getComponent(cc.ScrollView);
        this.itemNode = cc.find("view/content/itemNode", this.scrollView.node);
        this.scrollViewCarmack = Global.UIHelper.addScrollViewCarmackComp(this.scrollView.node, this.itemNode, 5, 5, this, this.item_setter);
    };
    BbwzOnlinePlayerPop.prototype.onEnable = function () {
        var _this = this;
        this.animComp.doPopupOpenAnim(function () {
            _this.scrollView.scrollToTop();
        });
        this.scrollViewCarmack.clearView();
    };
    BbwzOnlinePlayerPop.prototype.onDisable = function () {
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING, this.loadingKey);
    };
    /**
     * 子节点更新函数
     * @param itemNode
     * @param index
     */
    BbwzOnlinePlayerPop.prototype.item_setter = function (itemNode, index) {
        var data = this.scrollViewCarmack.allDatas[index];
        var itemComponent = Global.UIHelper.safeGetComponent(itemNode, "", BbwzOnlinePlayerItem_1.default);
        itemComponent.updateUI(data, index);
    };
    BbwzOnlinePlayerPop.prototype.updateAfterGetData = function () {
        this.updateUI();
    };
    BbwzOnlinePlayerPop.prototype.updateUI = function () {
        var datas = BbwzData_1.default.instance.onLinePlayerList;
        if (datas.length > 0) {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, this.loadingKey);
            for (var index = 0; index < datas.length; index++) {
                var data = datas[index];
                data.index = index;
            }
            this.scrollViewCarmack.allDatas = datas;
            this.scrollViewCarmack.updateView();
        }
    };
    BbwzOnlinePlayerPop.prototype.onCloseClick = function () {
        var _this = this;
        BbwzConstDefine_1.default.playBtnSound();
        this.animComp.doPopupCloseAnim(function () {
            _this.node.active = false;
        });
    };
    BbwzOnlinePlayerPop = __decorate([
        ccclass
    ], BbwzOnlinePlayerPop);
    return BbwzOnlinePlayerPop;
}(cc.Component));
exports.default = BbwzOnlinePlayerPop;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xccGFuZWxcXEJid3pPbmxpbmVQbGF5ZXJQb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXdDO0FBQ3hDLDBFQUFxRTtBQUNyRSwyREFBc0Q7QUFFaEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUM7O0dBRUc7QUFFSDtJQUFpRCx1Q0FBWTtJQUE3RDtRQUFBLHFFQXVFQztRQXRFVSxnQkFBVSxHQUFVLGlCQUFpQixDQUFDO1FBS3JDLGdCQUFVLEdBQWlCLElBQUksQ0FBQztRQUN4Qyx1QkFBdUI7UUFDZixjQUFRLEdBQVcsSUFBSSxDQUFDOztJQStEcEMsQ0FBQztJQTVEYSxvQ0FBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4Rix5QkFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFGLHlCQUFlLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJHLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekksQ0FBQztJQUVTLHNDQUFRLEdBQWxCO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztZQUMxQixLQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFUyx1Q0FBUyxHQUFuQjtRQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyx5Q0FBVyxHQUFuQixVQUFvQixRQUFnQixFQUFFLEtBQVk7UUFDOUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxJQUFJLGFBQWEsR0FBd0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLDhCQUFvQixDQUFDLENBQUM7UUFDOUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLGdEQUFrQixHQUF6QjtRQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU0sc0NBQVEsR0FBZjtRQUNJLElBQUksS0FBSyxHQUFHLGtCQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1FBQy9DLElBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7WUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVsRSxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDL0MsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUN0QjtZQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFTywwQ0FBWSxHQUFwQjtRQUFBLGlCQUtDO1FBSkcseUJBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1lBQzNCLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUF0RWdCLG1CQUFtQjtRQUR2QyxPQUFPO09BQ2EsbUJBQW1CLENBdUV2QztJQUFELDBCQUFDO0NBdkVELEFBdUVDLENBdkVnRCxFQUFFLENBQUMsU0FBUyxHQXVFNUQ7a0JBdkVvQixtQkFBbUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmJ3ekRhdGEgZnJvbSBcIi4uL2RhdGEvQmJ3ekRhdGFcIjtcclxuaW1wb3J0IEJid3pPbmxpbmVQbGF5ZXJJdGVtIGZyb20gXCIuLi9jb21wb25lbnQvQmJ3ek9ubGluZVBsYXllckl0ZW1cIjtcclxuaW1wb3J0IEJid3pDb25zdERlZmluZSBmcm9tIFwiLi4vZGF0YS9CYnd6Q29uc3REZWZpbmVcIjtcclxuXHJcbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqXHJcbiAqIOW8ueeqlyDlnKjnur/njqnlrrbnlYzpnaJcclxuICovXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJid3pPbmxpbmVQbGF5ZXJQb3AgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHVibGljIGxvYWRpbmdLZXk6c3RyaW5nID0gXCJPbmxpbmVQbGF5ZXJQb3BcIjtcclxuICAgIHByaXZhdGUgbWFza05vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGNvbnRlbnROb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBhbmltQ29tcDogYW55O1xyXG4gICAgcHJpdmF0ZSBzY3JvbGxWaWV3Q2FybWFjazogYW55OyAgICAgICAvLyDljaHpqazlhYvljbfovbTnu4Tku7ZcclxuICAgIHByaXZhdGUgc2Nyb2xsVmlldzpjYy5TY3JvbGxWaWV3ID0gbnVsbDtcclxuICAgIC8vIOa7muWKqOWuueWZqOWGheeahOWtkOiKgueCue+8iOiMg+S+i++8mueUqOS6jueUn+aIkOWkmuS4qu+8iVxyXG4gICAgcHJpdmF0ZSBpdGVtTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuICAgIFxyXG5cclxuICAgIHByb3RlY3RlZCBvbkxvYWQoKXtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUoY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuZ2V0Q29udGVudFNpemUoKSk7XHJcbiAgICAgICAgdGhpcy5tYXNrTm9kZSA9IGNjLmZpbmQoXCJtYXNrXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50Tm9kZSA9IGNjLmZpbmQoXCJjb250ZW50XCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5hbmltQ29tcCA9IEdsb2JhbC5VSUhlbHBlci5hZGRBbmltQ29tcCh0aGlzLm5vZGUsIHRoaXMuY29udGVudE5vZGUsIHRoaXMubWFza05vZGUpO1xyXG5cclxuICAgICAgICBCYnd6Q29uc3REZWZpbmUuYWRkQ29tbW9uQ2xpY2sodGhpcy5jb250ZW50Tm9kZSwgXCJidXR0b25fY2xvc2VcIiwgdGhpcy5vbkNsb3NlQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIEJid3pDb25zdERlZmluZS5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwibWFza1wiLCB0aGlzLm9uQ2xvc2VDbGljaywgdGhpcyxjYy5CdXR0b24uVHJhbnNpdGlvbi5OT05FKTtcclxuXHJcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3ID0gY2MuZmluZChcInNjcm9sbHZpZXdcIiwgdGhpcy5jb250ZW50Tm9kZSkuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpO1xyXG4gICAgICAgIHRoaXMuaXRlbU5vZGUgPSBjYy5maW5kKFwidmlldy9jb250ZW50L2l0ZW1Ob2RlXCIsIHRoaXMuc2Nyb2xsVmlldy5ub2RlKTtcclxuICAgICAgICB0aGlzLnNjcm9sbFZpZXdDYXJtYWNrID0gR2xvYmFsLlVJSGVscGVyLmFkZFNjcm9sbFZpZXdDYXJtYWNrQ29tcCh0aGlzLnNjcm9sbFZpZXcubm9kZSwgdGhpcy5pdGVtTm9kZSwgNSwgNSwgdGhpcywgdGhpcy5pdGVtX3NldHRlcik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpe1xyXG4gICAgICAgIHRoaXMuYW5pbUNvbXAuZG9Qb3B1cE9wZW5BbmltKCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb1RvcCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsVmlld0Nhcm1hY2suY2xlYXJWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpe1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5ISURFX05FVF9XQUlUSU5HLCB0aGlzLmxvYWRpbmdLZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a2Q6IqC54K55pu05paw5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gaXRlbU5vZGUgXHJcbiAgICAgKiBAcGFyYW0gaW5kZXggXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXRlbV9zZXR0ZXIoaXRlbU5vZGU6Y2MuTm9kZSwgaW5kZXg6bnVtYmVyKXtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuc2Nyb2xsVmlld0Nhcm1hY2suYWxsRGF0YXNbaW5kZXhdO1xyXG4gICAgICAgIGxldCBpdGVtQ29tcG9uZW50OkJid3pPbmxpbmVQbGF5ZXJJdGVtID0gR2xvYmFsLlVJSGVscGVyLnNhZmVHZXRDb21wb25lbnQoaXRlbU5vZGUsIFwiXCIsIEJid3pPbmxpbmVQbGF5ZXJJdGVtKTtcclxuICAgICAgICBpdGVtQ29tcG9uZW50LnVwZGF0ZVVJKGRhdGEsIGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlQWZ0ZXJHZXREYXRhKCl7XHJcbiAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVVSSgpe1xyXG4gICAgICAgIGxldCBkYXRhcyA9IEJid3pEYXRhLmluc3RhbmNlLm9uTGluZVBsYXllckxpc3Q7XHJcbiAgICAgICAgaWYoZGF0YXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5ISURFX05FVF9XQUlUSU5HLCB0aGlzLmxvYWRpbmdLZXkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRhdGFzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGRhdGFzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGRhdGEuaW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFZpZXdDYXJtYWNrLmFsbERhdGFzID0gZGF0YXM7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVmlld0Nhcm1hY2sudXBkYXRlVmlldygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xvc2VDbGljaygpe1xyXG4gICAgICAgIEJid3pDb25zdERlZmluZS5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICB0aGlzLmFuaW1Db21wLmRvUG9wdXBDbG9zZUFuaW0oKCk9PntcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19