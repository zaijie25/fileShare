
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/CashListView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '176608tdthLN5nR96lz5V5d', 'CashListView');
// hall/scripts/logic/hall/ui/recharge/CashListView.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
var ExtractEvent_1 = require("../money/ui/extractCash/ExtractEvent");
var PoolBase_1 = require("../../../core/tool/PoolBase");
var CashListView = /** @class */ (function (_super) {
    __extends(CashListView, _super);
    function CashListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeList = [];
        _this.limit = 6;
        return _this;
    }
    CashListView.prototype.initView = function () {
        // cc.log("打开界面");
        this.model = Global.ModelManager.getModel("ExtractModel");
        this.model.on(ExtractEvent_1.ExtractEvent.OnUpdateApplyCashList, this, this.InitCashListView);
        Global.UIHelper.addCommonClick(this.node, "nexPage", this.OnNextPagePageBtnClick, this);
        Global.UIHelper.addCommonClick(this.node, "upPage", this.OnLastPageBtnClick, this);
        this.contentNode = this.getChild("scrollview/view/content");
        this.copyItem = this.getChild("scrollview/view/content/Item");
        this.pageLabel = this.getChild("pageLabel").getComponent(cc.Label);
        //暂无任何信息
        this.nothingNode = this.getChild("Nothing");
        this.nothingNode.active = false;
        this.nextBtn = this.getChild("nexPage");
        this.lastBtn = this.getChild("upPage");
        this.copyItem.active = false;
        this.initItemPool();
    };
    CashListView.prototype.onOpenRecharge = function (isRecharge) {
        if (isRecharge === void 0) { isRecharge = false; }
        this.isRecharge = isRecharge;
        this.model.reqApplyCashList();
    };
    CashListView.prototype.onDispose = function () {
        this.itemPool.resetPool();
        this.model.off(ExtractEvent_1.ExtractEvent.OnUpdateApplyCashList, this, this.InitCashListView);
    };
    //下一页
    CashListView.prototype.OnNextPagePageBtnClick = function () {
        Global.Audio.playBtnSound();
        if (this.arrList.length > this.model.cashListPage * this.limit) {
            this.model.cashListPage++;
            this.InitCashListView();
        }
        else {
            this.model.reqApplyCashList(true);
        }
    };
    // 上一页
    CashListView.prototype.OnLastPageBtnClick = function () {
        Global.Audio.playBtnSound();
        this.model.cashListPage--;
        if (this.model.cashListPage <= 0) {
            this.model.cashListPage = 1;
            Global.UI.fastTip("已经是第一页了");
            return;
        }
        this.InitCashListView();
    };
    CashListView.prototype.initItemPool = function () {
        this.itemPool = new RecordingItemPool(this.copyItem);
    };
    CashListView.prototype.recycle = function () {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    CashListView.prototype.InitCashListView = function () {
        this.arrList = this.model.getCashListData() || [];
        var count = this.arrList.length;
        if (count < 1) {
            this.nothingNode.active = true;
            this.pageLabel.node.active = false;
            this.nextBtn.active = false;
            this.lastBtn.active = false;
        }
        else {
            this.nothingNode.active = false;
            this.pageLabel.node.active = true;
            this.nextBtn.active = true;
            this.lastBtn.active = true;
        }
        if (count == 0)
            return;
        var listCount = count - (this.model.cashListPage - 1) * this.limit > this.limit ? this.limit : count - (this.model.cashListPage - 1) * this.limit;
        this.recycle();
        for (var j = 0; j < listCount; j++) {
            var node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            node.getComponent("RecordingItem").Init(this.arrList[(this.model.cashListPage - 1) * this.limit + j], j, this.isRecharge);
        }
        var msgFormat = "共%s条";
        var str = "第%s页";
        this.pageLabel.string = cc.js.formatStr(msgFormat, this.model.cashTotal) + cc.js.formatStr(str, this.model.cashListPage);
    };
    return CashListView;
}(ViewBase_1.default));
exports.default = CashListView;
var RecordingItemPool = /** @class */ (function (_super) {
    __extends(RecordingItemPool, _super);
    function RecordingItemPool(copyNode) {
        var _this = _super.call(this) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    RecordingItemPool.prototype.createItem = function () {
        return cc.instantiate(this.copyNode);
    };
    RecordingItemPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    RecordingItemPool.prototype.recycleAll = function (arr) {
        var _this = this;
        _super.prototype.recycleAll.call(this, arr);
        arr.forEach(function (ele) {
            _this.resetItem(ele);
        });
    };
    return RecordingItemPool;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcQ2FzaExpc3RWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQUVqRCxxRUFBb0U7QUFDcEUsd0RBQW1EO0FBRW5EO0lBQTBDLGdDQUFRO0lBQWxEO1FBQUEscUVBMEdDO1FBaEdXLGNBQVEsR0FBVSxFQUFFLENBQUM7UUFDckIsV0FBSyxHQUFHLENBQUMsQ0FBQTs7SUErRnJCLENBQUM7SUE1RmEsK0JBQVEsR0FBbEI7UUFFSSxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBaUIsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsMkJBQVksQ0FBQyxxQkFBcUIsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0UsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hGLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFL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Q0FBQztJQUVQLENBQUM7SUFFTCx3QkFBQztBQUFELENBdEJBLEFBc0JDLENBdEIrQixrQkFBUSxHQXNCdkMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IEV4dHJhY3RNb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9FeHRyYWN0TW9kZWxcIjtcclxuaW1wb3J0IHsgRXh0cmFjdEV2ZW50IH0gZnJvbSBcIi4uL21vbmV5L3VpL2V4dHJhY3RDYXNoL0V4dHJhY3RFdmVudFwiO1xyXG5pbXBvcnQgUG9vbEJhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdG9vbC9Qb29sQmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FzaExpc3RWaWV3IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgcHJpdmF0ZSBtb2RlbCA6IEV4dHJhY3RNb2RlbDtcclxuICAgIHByaXZhdGUgY29weUl0ZW06IGFueTtcclxuICAgIHByaXZhdGUgY29udGVudE5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHBhZ2VMYWJlbDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIG5leHRCdG46IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGxhc3RCdG46IGNjLk5vZGU7XHJcbiAgICAvL+ayoeacieaVsOaNrlxyXG4gICAgcHJpdmF0ZSBub3RoaW5nTm9kZTpjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBpdGVtUG9vbDogUmVjb3JkaW5nSXRlbVBvb2w7XHJcbiAgICBwcml2YXRlIG5vZGVMaXN0OiBhbnlbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBsaW1pdCA9IDZcclxuICAgIHByaXZhdGUgYXJyTGlzdDogQXJyYXk8YW55PlxyXG4gICAgcHJpdmF0ZSBpc1JlY2hhcmdlOiBib29sZWFuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIC8vIGNjLmxvZyhcIuaJk+W8gOeVjOmdolwiKTtcclxuICAgICAgICB0aGlzLm1vZGVsID0gPEV4dHJhY3RNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiRXh0cmFjdE1vZGVsXCIpO1xyXG4gICAgICAgIHRoaXMubW9kZWwub24oRXh0cmFjdEV2ZW50Lk9uVXBkYXRlQXBwbHlDYXNoTGlzdCx0aGlzLHRoaXMuSW5pdENhc2hMaXN0Vmlldyk7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJuZXhQYWdlXCIsIHRoaXMuT25OZXh0UGFnZVBhZ2VCdG5DbGljaywgdGhpcyk7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJ1cFBhZ2VcIiwgdGhpcy5Pbkxhc3RQYWdlQnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY29udGVudE5vZGUgPSB0aGlzLmdldENoaWxkKFwic2Nyb2xsdmlldy92aWV3L2NvbnRlbnRcIik7XHJcbiAgICAgICAgdGhpcy5jb3B5SXRlbSA9IHRoaXMuZ2V0Q2hpbGQoXCJzY3JvbGx2aWV3L3ZpZXcvY29udGVudC9JdGVtXCIpO1xyXG4gICAgICAgIHRoaXMucGFnZUxhYmVsID0gdGhpcy5nZXRDaGlsZChcInBhZ2VMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIC8v5pqC5peg5Lu75L2V5L+h5oGvXHJcbiAgICAgICAgdGhpcy5ub3RoaW5nTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJOb3RoaW5nXCIpO1xyXG4gICAgICAgIHRoaXMubm90aGluZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5uZXh0QnRuID0gdGhpcy5nZXRDaGlsZChcIm5leFBhZ2VcIik7XHJcbiAgICAgICAgdGhpcy5sYXN0QnRuID0gdGhpcy5nZXRDaGlsZChcInVwUGFnZVwiKTtcclxuICAgICAgICB0aGlzLmNvcHlJdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaW5pdEl0ZW1Qb29sKClcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIG9uT3BlblJlY2hhcmdlKGlzUmVjaGFyZ2U6IGJvb2xlYW4gPSBmYWxzZSl7XHJcbiAgICAgICAgdGhpcy5pc1JlY2hhcmdlID0gaXNSZWNoYXJnZTtcclxuICAgICAgICB0aGlzLm1vZGVsLnJlcUFwcGx5Q2FzaExpc3QoKTtcclxuICAgIH1cclxuIFxyXG4gICAgcHJvdGVjdGVkIG9uRGlzcG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pdGVtUG9vbC5yZXNldFBvb2woKVxyXG4gICAgICAgIHRoaXMubW9kZWwub2ZmKEV4dHJhY3RFdmVudC5PblVwZGF0ZUFwcGx5Q2FzaExpc3QsdGhpcyx0aGlzLkluaXRDYXNoTGlzdFZpZXcpO1xyXG4gICAgfVxyXG4gICAgLy/kuIvkuIDpobVcclxuICAgIE9uTmV4dFBhZ2VQYWdlQnRuQ2xpY2soKSB7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgICAgIGlmKHRoaXMuYXJyTGlzdC5sZW5ndGggPiB0aGlzLm1vZGVsLmNhc2hMaXN0UGFnZSAqIHRoaXMubGltaXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLmNhc2hMaXN0UGFnZSsrO1xyXG4gICAgICAgICAgICB0aGlzLkluaXRDYXNoTGlzdFZpZXcoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5yZXFBcHBseUNhc2hMaXN0KHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIOS4iuS4gOmhtVxyXG4gICAgT25MYXN0UGFnZUJ0bkNsaWNrKCkge1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICB0aGlzLm1vZGVsLmNhc2hMaXN0UGFnZS0tO1xyXG4gICAgICAgIGlmKHRoaXMubW9kZWwuY2FzaExpc3RQYWdlPD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5jYXNoTGlzdFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuW3sue7j+aYr+esrOS4gOmhteS6hlwiKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5Jbml0Q2FzaExpc3RWaWV3KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGluaXRJdGVtUG9vbCgpe1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5pdGVtUG9vbCA9IG5ldyBSZWNvcmRpbmdJdGVtUG9vbCh0aGlzLmNvcHlJdGVtKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHJlY3ljbGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaXRlbVBvb2wucmVjeWNsZUFsbCh0aGlzLm5vZGVMaXN0KTtcclxuICAgICAgICB0aGlzLm5vZGVMaXN0ID0gW107XHJcbiAgICB9XHJcbiAgICBJbml0Q2FzaExpc3RWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuYXJyTGlzdCA9ICB0aGlzLm1vZGVsLmdldENhc2hMaXN0RGF0YSgpIHx8IFtdO1xyXG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMuYXJyTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgaWYoY291bnQgPCAxKXtcclxuICAgICAgICAgICAgdGhpcy5ub3RoaW5nTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdEJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5ub3RoaW5nTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0QnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3VudCA9PTApICByZXR1cm47XHJcbiAgICAgICAgbGV0IGxpc3RDb3VudCA9IGNvdW50IC0gKHRoaXMubW9kZWwuY2FzaExpc3RQYWdlLTEpKnRoaXMubGltaXQgPiB0aGlzLmxpbWl0P3RoaXMubGltaXQ6Y291bnQgLSAodGhpcy5tb2RlbC5jYXNoTGlzdFBhZ2UtMSkqdGhpcy5saW1pdFxyXG4gICAgICAgIHRoaXMucmVjeWNsZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGo9MDsgajwgbGlzdENvdW50OyBqKyspe1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuaXRlbVBvb2wuZ2V0SXRlbSgpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVMaXN0LnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQodGhpcy5jb250ZW50Tm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUmVjb3JkaW5nSXRlbVwiKS5Jbml0KHRoaXMuYXJyTGlzdFsodGhpcy5tb2RlbC5jYXNoTGlzdFBhZ2UtMSkqdGhpcy5saW1pdCtqXSxqLHRoaXMuaXNSZWNoYXJnZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1zZ0Zvcm1hdCA9IFwi5YWxJXPmnaFcIlxyXG4gICAgICAgIGxldCBzdHIgPSBcIuesrCVz6aG1XCJcclxuICAgICAgICB0aGlzLnBhZ2VMYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIobXNnRm9ybWF0LHRoaXMubW9kZWwuY2FzaFRvdGFsKSArIGNjLmpzLmZvcm1hdFN0cihzdHIsdGhpcy5tb2RlbC5jYXNoTGlzdFBhZ2UpO1xyXG4gICAgfVxyXG5cclxufVxyXG5jbGFzcyBSZWNvcmRpbmdJdGVtUG9vbCBleHRlbmRzIFBvb2xCYXNle1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3B5Tm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlSXRlbSgpe1xyXG4gICAgICAgIHJldHVybiBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvcHlOb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVzZXRJdGVtKG5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbm9kZS5zZXRQYXJlbnQobnVsbClcclxuICAgIH1cclxuICAgIHB1YmxpYyByZWN5Y2xlQWxsKGFycjogQXJyYXk8YW55PilcclxuICAgIHtcclxuICAgICAgICBzdXBlci5yZWN5Y2xlQWxsKGFycilcclxuICAgICAgICBhcnIuZm9yRWFjaChlbGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0SXRlbShlbGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIFxyXG59Il19