
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/WndCommissionlist.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '76961YM+f5JTpruhMJbErEn', 'WndCommissionlist');
// hall/scripts/logic/hall/ui/Spread/WndCommissionlist.ts

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
var PoolBase_1 = require("../../../core/tool/PoolBase");
var NetEvent_1 = require("../../../core/net/hall/NetEvent");
var WndCommissionlist = /** @class */ (function (_super) {
    __extends(WndCommissionlist, _super);
    function WndCommissionlist() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeList = [];
        _this.SpreadModel = null;
        return _this;
    }
    WndCommissionlist.prototype.onInit = function () {
        this.name = "WndCommissionlist";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/SpreadUI/Commissionlist";
    };
    WndCommissionlist.prototype.initView = function () {
        this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("close", this.close, this);
        this.copyItem = this.getChild("ScrollView/view/content/item");
        this.contentNode = this.getChild("ScrollView/view/content");
        this.noTips = this.getChild("noListTipsSk");
        this.noTips.active = false;
        this.titleNode = this.getChild("topTitle");
        this.titleNode.active = false;
        this.initItemPool();
    };
    WndCommissionlist.prototype.onOpen = function (data) {
        this.SpreadModel.on(NetEvent_1.NetAppface.GetSelfReadRecord, this, this.RefreshScrollView);
        this.copyItem.active = false;
        if (data == null || data.length == 0) {
            return;
        }
        this.RefreshScrollView(data[0]);
    };
    WndCommissionlist.prototype.RefreshScrollView = function (data) {
        if (data == null) {
            Global.UI.fastTip("无数据");
            this.noTips.active = true;
            this.titleNode.active = false;
            return;
        }
        this.noTips.active = false;
        this.titleNode.active = true;
        var arr = data.list || [];
        var count = arr.length;
        this.recycle();
        for (var j = 0; j < count; j++) {
            var node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            node.getComponent("AwardCommiItem").Init(arr[j]);
        }
    };
    WndCommissionlist.prototype.onClose = function () {
        this.SpreadModel.off(NetEvent_1.NetAppface.GetDayAgentCommi, this, this.RefreshScrollView);
    };
    WndCommissionlist.prototype.onDispose = function () {
        this.itemPool.resetPool();
        this.nodeList = [];
    };
    WndCommissionlist.prototype.initItemPool = function () {
        this.itemPool = new AwardRecordItemPool(this.copyItem);
    };
    WndCommissionlist.prototype.recycle = function () {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    return WndCommissionlist;
}(WndBase_1.default));
exports.default = WndCommissionlist;
var AwardRecordItemPool = /** @class */ (function (_super) {
    __extends(AwardRecordItemPool, _super);
    function AwardRecordItemPool(copyNode) {
        var _this = _super.call(this) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    AwardRecordItemPool.prototype.createItem = function () {
        return cc.instantiate(this.copyNode);
    };
    AwardRecordItemPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    return AwardRecordItemPool;
}(PoolBase_1.default));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXFduZENvbW1pc3Npb25saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUErQztBQUMvQyx3REFBbUQ7QUFFbkQsNERBQTZEO0FBRTdEO0lBQStDLHFDQUFPO0lBQXREO1FBQUEscUVBa0ZDO1FBOUVHLGNBQVEsR0FBVSxFQUFFLENBQUM7UUFDckIsaUJBQVcsR0FBRyxJQUFJLENBQUE7O0lBNkV0QixDQUFDO0lBeEVhLGtDQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcseUNBQXlDLENBQUM7SUFFN0QsQ0FBQztJQUVTLG9DQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBZ0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2xELElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDOUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLDhCQUE4QixDQUFDLENBQUE7UUFDN0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFD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LENBQUM7SUFDdkIsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FsRkEsQUFrRkMsQ0FsRjhDLGlCQUFPLEdBa0ZyRDs7QUFDRDtJQUFrQyx1Q0FBUTtJQUN0Qyw2QkFBb0IsUUFBaUI7UUFBckMsWUFDSSxpQkFBTyxTQUNWO1FBRm1CLGNBQVEsR0FBUixRQUFRLENBQVM7O0lBRXJDLENBQUM7SUFFUyx3Q0FBVSxHQUFwQjtRQUNJLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVTLHVDQUFTLEdBQW5CLFVBQW9CLElBQWE7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQWJBLEFBYUMsQ0FiaUMsa0JBQVEsR0FhekMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBQb29sQmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS90b29sL1Bvb2xCYXNlXCI7XHJcbmltcG9ydCBTcHJlYWRNb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9TcHJlYWRNb2RlbFwiO1xyXG5pbXBvcnQgeyBOZXRBcHBmYWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvbmV0L2hhbGwvTmV0RXZlbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZENvbW1pc3Npb25saXN0IGV4dGVuZHMgV25kQmFzZSB7XHJcbiAgICBjb3B5SXRlbTogYW55O1xyXG4gICAgY29udGVudE5vZGU6IGFueTtcclxuICAgIGl0ZW1Qb29sOiBBd2FyZFJlY29yZEl0ZW1Qb29sO1xyXG4gICAgbm9kZUxpc3Q6IGFueVtdID0gW107XHJcbiAgICBTcHJlYWRNb2RlbCA9IG51bGxcclxuICAgIG5vVGlwczogY2MuTm9kZVxyXG4gICAgdGl0bGVOb2RlOiBjYy5Ob2RlXHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRDb21taXNzaW9ubGlzdFwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvU3ByZWFkVUkvQ29tbWlzc2lvbmxpc3RcIjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuU3ByZWFkTW9kZWwgPSA8U3ByZWFkTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlNwcmVhZE1vZGVsXCIpO1xyXG4gICAgICAgIHRoaXMubm9kZS53aWR0aCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLndpZHRoO1xyXG4gICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNsb3NlXCIsIHRoaXMuY2xvc2UsIHRoaXMpXHJcbiAgICAgICAgdGhpcy5jb3B5SXRlbSA9IHRoaXMuZ2V0Q2hpbGQoXCJTY3JvbGxWaWV3L3ZpZXcvY29udGVudC9pdGVtXCIpXHJcbiAgICAgICAgdGhpcy5jb250ZW50Tm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJTY3JvbGxWaWV3L3ZpZXcvY29udGVudFwiKVxyXG4gICAgICAgIHRoaXMubm9UaXBzID0gdGhpcy5nZXRDaGlsZChcIm5vTGlzdFRpcHNTa1wiKVxyXG4gICAgICAgIHRoaXMubm9UaXBzLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy50aXRsZU5vZGUgPSB0aGlzLmdldENoaWxkKFwidG9wVGl0bGVcIilcclxuICAgICAgICB0aGlzLnRpdGxlTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuaW5pdEl0ZW1Qb29sKCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKGRhdGEpIHtcclxuICAgICAgICB0aGlzLlNwcmVhZE1vZGVsLm9uKE5ldEFwcGZhY2UuR2V0U2VsZlJlYWRSZWNvcmQsIHRoaXMsIHRoaXMuUmVmcmVzaFNjcm9sbFZpZXcpXHJcbiAgICAgICAgdGhpcy5jb3B5SXRlbS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIGlmIChkYXRhID09IG51bGwgfHwgZGF0YS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUmVmcmVzaFNjcm9sbFZpZXcoZGF0YVswXSlcclxuICAgIH1cclxuICAgIFJlZnJlc2hTY3JvbGxWaWV3KGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLml6DmlbDmja5cIilcclxuICAgICAgICAgICAgdGhpcy5ub1RpcHMuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub1RpcHMuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLnRpdGxlTm9kZS5hY3RpdmUgPSB0cnVlXHJcblxyXG4gICAgICAgIGxldCBhcnI6IEFycmF5PGFueT4gPSBkYXRhLmxpc3QgfHwgW107XHJcbiAgICAgICAgbGV0IGNvdW50ID0gYXJyLmxlbmd0aDtcclxuXHJcbiAgICAgICAgdGhpcy5yZWN5Y2xlKClcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb3VudDsgaisrKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5pdGVtUG9vbC5nZXRJdGVtKCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZUxpc3QucHVzaChub2RlKTtcclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLmNvbnRlbnROb2RlKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJBd2FyZENvbW1pSXRlbVwiKS5Jbml0KGFycltqXSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuU3ByZWFkTW9kZWwub2ZmKE5ldEFwcGZhY2UuR2V0RGF5QWdlbnRDb21taSwgdGhpcywgdGhpcy5SZWZyZXNoU2Nyb2xsVmlldylcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuaXRlbVBvb2wucmVzZXRQb29sKClcclxuICAgICAgICB0aGlzLm5vZGVMaXN0ID0gW107XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGluaXRJdGVtUG9vbCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5pdGVtUG9vbCA9IG5ldyBBd2FyZFJlY29yZEl0ZW1Qb29sKHRoaXMuY29weUl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlY3ljbGUoKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtUG9vbC5yZWN5Y2xlQWxsKHRoaXMubm9kZUxpc3QpO1xyXG4gICAgICAgIHRoaXMubm9kZUxpc3QgPSBbXTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBBd2FyZFJlY29yZEl0ZW1Qb29sIGV4dGVuZHMgUG9vbEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3B5Tm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUl0ZW0oKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLmluc3RhbnRpYXRlKHRoaXMuY29weU5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCByZXNldEl0ZW0obm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbm9kZS5zZXRQYXJlbnQobnVsbCk7XHJcbiAgICB9XHJcbn0iXX0=