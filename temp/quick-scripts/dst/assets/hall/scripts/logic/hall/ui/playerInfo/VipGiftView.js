
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/VipGiftView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9b272O0S9FCU5XkRvQwWkKa', 'VipGiftView');
// hall/scripts/logic/hall/ui/playerInfo/VipGiftView.ts

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
var VipGiftViewItem_1 = require("./VipGiftViewItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * vip特权下的单个pageview视图
 */
var VipGiftView = /** @class */ (function (_super) {
    __extends(VipGiftView, _super);
    function VipGiftView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemList = [];
        return _this;
    }
    VipGiftView.prototype.initView = function () {
        for (var index = 0; index < 3; index++) {
            var item = cc.find("item_" + index, this.node);
            if (item) {
                this.itemList.push(item);
            }
        }
    };
    VipGiftView.prototype.refreshUI = function (data, pageIndex) {
        for (var index = 0; index < 3; index++) {
            if (this.itemList.length >= index) {
                if (this.itemList[index]) {
                    var viewItem = this.itemList[index].getComponent(VipGiftViewItem_1.default);
                    if (viewItem) {
                        viewItem.refreshUI(data, index, pageIndex);
                    }
                }
            }
        }
    };
    VipGiftView = __decorate([
        ccclass
    ], VipGiftView);
    return VipGiftView;
}(cc.Component));
exports.default = VipGiftView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxWaXBHaWZ0Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxREFBK0M7QUFFekMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7O0dBRUc7QUFFSDtJQUF5QywrQkFBWTtJQUFyRDtRQUFBLHFFQW9DQztRQWxDRyxjQUFRLEdBQWtCLEVBQUUsQ0FBQTs7SUFrQ2hDLENBQUM7SUFoQ0csOEJBQVEsR0FBUjtRQUVJLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFRLEtBQU8sRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDN0MsSUFBRyxJQUFJLEVBQ1A7Z0JBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDM0I7U0FDSjtJQUVMLENBQUM7SUFFRCwrQkFBUyxHQUFULFVBQVUsSUFBSSxFQUFDLFNBQVM7UUFFcEIsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNwQyxJQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFHLEtBQUssRUFDL0I7Z0JBQ0ksSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUN2QjtvQkFDSSxJQUFJLFFBQVEsR0FBc0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMseUJBQWUsQ0FBQyxDQUFBO29CQUNwRixJQUFHLFFBQVEsRUFDWDt3QkFDSSxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsU0FBUyxDQUFDLENBQUE7cUJBQzNDO2lCQUVKO2FBRUo7U0FDSjtJQUNMLENBQUM7SUFqQ2dCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FvQy9CO0lBQUQsa0JBQUM7Q0FwQ0QsQUFvQ0MsQ0FwQ3dDLEVBQUUsQ0FBQyxTQUFTLEdBb0NwRDtrQkFwQ29CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlwR2lmdFZpZXdJdGVtIGZyb20gXCIuL1ZpcEdpZnRWaWV3SXRlbVwiXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoqXHJcbiAqIHZpcOeJueadg+S4i+eahOWNleS4qnBhZ2V2aWV36KeG5Zu+XHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaXBHaWZ0VmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgaXRlbUxpc3Q6QXJyYXk8Y2MuTm9kZT4gPSBbXVxyXG5cclxuICAgIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMzsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNjLmZpbmQoYGl0ZW1fJHtpbmRleH1gLHRoaXMubm9kZSlcclxuICAgICAgICAgICAgaWYoaXRlbSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtTGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFVJKGRhdGEscGFnZUluZGV4KVxyXG4gICAge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCAzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXRlbUxpc3QubGVuZ3RoPj0gaW5kZXgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuaXRlbUxpc3RbaW5kZXhdKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWV3SXRlbSA6IFZpcEdpZnRWaWV3SXRlbSA9ICB0aGlzLml0ZW1MaXN0W2luZGV4XS5nZXRDb21wb25lbnQoVmlwR2lmdFZpZXdJdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZpZXdJdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0l0ZW0ucmVmcmVzaFVJKGRhdGEsaW5kZXgscGFnZUluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICBcclxufSJdfQ==