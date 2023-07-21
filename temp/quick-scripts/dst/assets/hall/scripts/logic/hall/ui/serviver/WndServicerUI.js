
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/serviver/WndServicerUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '49a66sXxStEKIxsmd9cyRL8', 'WndServicerUI');
// hall/scripts/logic/hall/ui/serviver/WndServicerUI.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var FeedbackServiceItem_1 = require("../Feedback/FeedbackServiceItem");
var WndServicerUI = /** @class */ (function (_super) {
    __extends(WndServicerUI, _super);
    function WndServicerUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.listNode = null;
        _this.itemPrefab = null;
        _this.itemList = new Array();
        _this.itemPool = new Array();
        _this.serviceDatas = [];
        return _this;
    }
    WndServicerUI.prototype.getItem = function () {
        if (this.itemPool.length > 0) {
            var item = this.itemPool.pop();
            item.node.setSiblingIndex(-1);
            item.node.active = true;
            return item;
        }
        else {
            var itemObj = cc.instantiate(this.itemPrefab);
            var item = itemObj.getComponent(FeedbackServiceItem_1.default);
            item.node.setParent(this.listNode);
            item.node.active = true;
            return item;
        }
    };
    WndServicerUI.prototype.recoveryItem = function (item) {
        item.node.active = false;
        this.itemPool.push(item);
    };
    WndServicerUI.prototype.clearItem = function () {
        this.listNode.y = 0;
        for (var index = 0; index < this.itemList.length; index++) {
            var item = this.itemList[index];
            this.recoveryItem(item);
        }
        this.itemList = [];
    };
    WndServicerUI.prototype.onInit = function () {
        this.name = "WndServicerUI";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/ServiceUI";
    };
    WndServicerUI.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("close", this.close, this);
        this.listNode = this.getChild("ScrollView/view/ServicersNode");
        this.itemPrefab = this.getChild("ScrollView/view/ServicersNode/ServicerItem");
        if (this.itemPrefab) {
            this.itemPrefab.active = false;
        }
    };
    WndServicerUI.prototype.onDispose = function () {
        this.itemPool = [];
        this.itemList = [];
    };
    WndServicerUI.prototype.onOpen = function () {
        if (this.args && this.args[0]) {
            this.serviceDatas = this.args[0];
            /* let res = this.args[1];
            if(res != "")
                this.titleSp.spriteFrame = Global.ResourceManager.getSprite("hall/texture/common/txtImg", res) */
        }
        else
            this.serviceDatas = [];
        this.updateView();
    };
    WndServicerUI.prototype.onClose = function () {
        this.itemPool = [];
        this.listNode.removeAllChildren();
    };
    WndServicerUI.prototype.updateView = function () {
        if (!this.serviceDatas)
            return;
        //
        this.clearItem();
        for (var index = 0; index < this.serviceDatas.length; index++) {
            if (!this.serviceDatas[index].type) {
                continue;
            }
            var item = this.getItem();
            item.refreshUI(this.serviceDatas[index]);
        }
    };
    return WndServicerUI;
}(WndBase_1.default));
exports.default = WndServicerUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxzZXJ2aXZlclxcV25kU2VydmljZXJVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBK0M7QUFHL0MsdUVBQWtFO0FBR2xFO0lBQTJDLGlDQUFPO0lBQWxEO1FBQUEscUVBdUdDO1FBcEdXLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFDekIsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsY0FBUSxHQUFnQyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3BELGNBQVEsR0FBZ0MsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUlwRCxrQkFBWSxHQUFHLEVBQUUsQ0FBQTs7SUE2RjdCLENBQUM7SUEzRlcsK0JBQU8sR0FBZjtRQUNJLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDO1lBQ3hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDeEIsT0FBTyxJQUFJLENBQUM7U0FDZjthQUFJO1lBQ0QsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyw2QkFBbUIsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDeEIsT0FBTyxJQUFJLENBQUM7U0FDZjtJQUNMLENBQUM7SUFFTyxvQ0FBWSxHQUFwQixVQUFzQixJQUEwQjtRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVPLGlDQUFTLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN2RCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRVMsOEJBQU0sR0FBaEI7UUFFSSxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO0lBQy9DLENBQUM7SUFFUyxnQ0FBUSxHQUFsQjtRQUVJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNsRCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1FBQzlFLElBQUcsSUFBSSxDQUFDLFVBQVUsRUFDbEI7WUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUE7U0FDakM7SUFDTCxDQUFDO0lBRUQsaUNBQVMsR0FBVDtRQUVJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCw4QkFBTSxHQUFOO1FBQ0ksSUFBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQzVCO1lBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2hDOztpSEFFcUc7U0FDeEc7O1lBRUcsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCwrQkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFUyxrQ0FBVSxHQUFwQjtRQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU87UUFDOUIsRUFBRTtRQUNGLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDM0QsSUFBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUNqQztnQkFDSSxTQUFRO2FBQ1g7WUFDRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBSUwsb0JBQUM7QUFBRCxDQXZHQSxBQXVHQyxDQXZHMEMsaUJBQU8sR0F1R2pEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5pbXBvcnQgU2VydmljZXJJdGVtIGZyb20gXCIuL1NlcnZpY2VySXRlbVwiO1xyXG5pbXBvcnQgeyBTZXJ2aWNlckV2ZW50IH0gZnJvbSBcIi4vU2VydmljZXJFdmVudFwiO1xyXG5pbXBvcnQgRmVlZGJhY2tTZXJ2aWNlSXRlbSBmcm9tIFwiLi4vRmVlZGJhY2svRmVlZGJhY2tTZXJ2aWNlSXRlbVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZFNlcnZpY2VyVUkgZXh0ZW5kcyBXbmRCYXNlXHJcbntcclxuXHJcbiAgICBwcml2YXRlIGxpc3ROb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIHByaXZhdGUgaXRlbVByZWZhYjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGl0ZW1MaXN0IDogQXJyYXk8RmVlZGJhY2tTZXJ2aWNlSXRlbT4gPSBuZXcgQXJyYXkoKTtcclxuICAgIHByaXZhdGUgaXRlbVBvb2wgOiBBcnJheTxGZWVkYmFja1NlcnZpY2VJdGVtPiA9IG5ldyBBcnJheSgpO1xyXG5cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzZXJ2aWNlRGF0YXMgPSBbXVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SXRlbSgpe1xyXG4gICAgICAgIGlmKHRoaXMuaXRlbVBvb2wubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gdGhpcy5pdGVtUG9vbC5wb3AoKTtcclxuICAgICAgICAgICAgaXRlbS5ub2RlLnNldFNpYmxpbmdJbmRleCgtMSk7XHJcbiAgICAgICAgICAgIGl0ZW0ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdmFyIGl0ZW1PYmogPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW1QcmVmYWIpO1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IGl0ZW1PYmouZ2V0Q29tcG9uZW50KEZlZWRiYWNrU2VydmljZUl0ZW0pO1xyXG4gICAgICAgICAgICBpdGVtLm5vZGUuc2V0UGFyZW50KHRoaXMubGlzdE5vZGUpO1xyXG4gICAgICAgICAgICBpdGVtLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVjb3ZlcnlJdGVtKCBpdGVtIDogRmVlZGJhY2tTZXJ2aWNlSXRlbSl7XHJcbiAgICAgICAgaXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXRlbVBvb2wucHVzaChpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsZWFySXRlbSgpe1xyXG4gICAgICAgIHRoaXMubGlzdE5vZGUueSA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuaXRlbUxpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1MaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgdGhpcy5yZWNvdmVyeUl0ZW0oaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXRlbUxpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZFNlcnZpY2VyVUlcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gXCJQb3BMYXllclwiO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1NlcnZpY2VVSVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodDtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY2xvc2VcIix0aGlzLmNsb3NlLHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3ROb2RlID0gdGhpcy5nZXRDaGlsZChcIlNjcm9sbFZpZXcvdmlldy9TZXJ2aWNlcnNOb2RlXCIpO1xyXG4gICAgICAgIHRoaXMuaXRlbVByZWZhYiA9IHRoaXMuZ2V0Q2hpbGQoXCJTY3JvbGxWaWV3L3ZpZXcvU2VydmljZXJzTm9kZS9TZXJ2aWNlckl0ZW1cIik7XHJcbiAgICAgICAgaWYodGhpcy5pdGVtUHJlZmFiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtUHJlZmFiLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzcG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pdGVtUG9vbCA9IFtdO1xyXG4gICAgICAgIHRoaXMuaXRlbUxpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBvbk9wZW4oKXtcclxuICAgICAgICBpZih0aGlzLmFyZ3MgJiYgdGhpcy5hcmdzWzBdIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmljZURhdGFzID0gdGhpcy5hcmdzWzBdXHJcbiAgICAgICAgICAgIC8qIGxldCByZXMgPSB0aGlzLmFyZ3NbMV07XHJcbiAgICAgICAgICAgIGlmKHJlcyAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZVNwLnNwcml0ZUZyYW1lID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRTcHJpdGUoXCJoYWxsL3RleHR1cmUvY29tbW9uL3R4dEltZ1wiLCByZXMpICovXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlRGF0YXMgPSBbXTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsb3NlKCl7XHJcbiAgICAgICAgdGhpcy5pdGVtUG9vbCA9IFtdO1xyXG4gICAgICAgIHRoaXMubGlzdE5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlVmlldygpe1xyXG4gICAgICAgIGlmKCF0aGlzLnNlcnZpY2VEYXRhcykgcmV0dXJuO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5jbGVhckl0ZW0oKTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5zZXJ2aWNlRGF0YXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLnNlcnZpY2VEYXRhc1tpbmRleF0udHlwZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMuZ2V0SXRlbSgpO1xyXG4gICAgICAgICAgICBpdGVtLnJlZnJlc2hVSSh0aGlzLnNlcnZpY2VEYXRhc1tpbmRleF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgIFxyXG5cclxufSJdfQ==