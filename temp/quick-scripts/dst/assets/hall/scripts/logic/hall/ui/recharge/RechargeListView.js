
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/RechargeListView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '554698tEwVLtK1ZjX0ba+b2', 'RechargeListView');
// hall/scripts/logic/hall/ui/recharge/RechargeListView.ts

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
var PoolBase_1 = require("../../../core/tool/PoolBase");
var RechargeModel_1 = require("../../../hallcommon/model/RechargeModel");
var RechargeListView = /** @class */ (function (_super) {
    __extends(RechargeListView, _super);
    function RechargeListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeList = [];
        //当前显示的页数
        _this.limit = 6;
        return _this;
    }
    RechargeListView.prototype.initView = function () {
        this.Rechagemodel = Global.ModelManager.getModel("RechargeModel");
        this.Rechagemodel.on(RechargeModel_1.default.UpdateHistory, this, this.InitTeamListView);
        Global.UIHelper.addCommonClick(this.node, "nexPage", this.OnNextPagePageBtnClick, this);
        Global.UIHelper.addCommonClick(this.node, "upPage", this.OnLastPageBtnClick, this);
        this.contentNode = this.getChild("scrollview/view/content");
        this.copyItem = this.getChild("scrollview/view/content/Item");
        this.pageLabel = this.getChild("pageLabel").getComponent(cc.Label);
        this.nothingNode = this.getChild("Nothing");
        this.nothingNode.active = false;
        this.nextBtn = this.getChild("nexPage");
        this.lastBtn = this.getChild("upPage");
        this.copyItem.active = false;
        this.initItemPool();
    };
    RechargeListView.prototype.onOpenRecharge = function (isRecharge) {
        if (isRecharge === void 0) { isRecharge = false; }
        this.isRecharge = isRecharge;
        this.Rechagemodel.reqGetUserPayList();
    };
    RechargeListView.prototype.onDispose = function () {
        this.itemPool.resetPool();
        this.Rechagemodel.off(RechargeModel_1.default.UpdateHistory, this, this.InitTeamListView);
    };
    //下一页
    RechargeListView.prototype.OnNextPagePageBtnClick = function () {
        Global.Audio.playBtnSound();
        if (this.arrList.length > this.Rechagemodel.hisListPage * this.limit) {
            this.Rechagemodel.hisListPage++;
            this.InitTeamListView();
        }
        else {
            this.Rechagemodel.reqGetUserPayList(true);
        }
    };
    // 上一页
    RechargeListView.prototype.OnLastPageBtnClick = function () {
        Global.Audio.playBtnSound();
        this.Rechagemodel.hisListPage--;
        if (this.Rechagemodel.hisListPage <= 0) {
            this.Rechagemodel.hisListPage = 1;
            Global.UI.fastTip("已经是第一页了");
            return;
        }
        this.InitTeamListView();
    };
    RechargeListView.prototype.initItemPool = function () {
        this.itemPool = new RecordingItemPool(this.copyItem);
    };
    RechargeListView.prototype.recycle = function () {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    RechargeListView.prototype.InitTeamListView = function () {
        this.arrList = this.Rechagemodel.getHisListData() || [];
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
        var listCount = count - (this.Rechagemodel.hisListPage - 1) * this.limit > this.limit ? this.limit : count - (this.Rechagemodel.hisListPage - 1) * this.limit;
        this.recycle();
        for (var j = 0; j < listCount; j++) {
            var node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            node.getComponent("RecordingItem").Init(this.arrList[(this.Rechagemodel.hisListPage - 1) * this.limit + j], j, this.isRecharge);
        }
        var msgFormat = "共%s条";
        var str = "第%s页";
        this.pageLabel.string = cc.js.formatStr(msgFormat, this.Rechagemodel.hisTotal) + cc.js.formatStr(str, this.Rechagemodel.hisListPage);
    };
    return RechargeListView;
}(ViewBase_1.default));
exports.default = RechargeListView;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcUmVjaGFyZ2VMaXN0Vmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBaUQ7QUFDakQsd0RBQW1EO0FBQ25ELHlFQUFvRTtBQUdwRTtJQUE4QyxvQ0FBUTtJQUF0RDtRQUFBLHFFQXdHQztRQTlGVyxjQUFRLEdBQVUsRUFBRSxDQUFDO1FBQzdCLFNBQVM7UUFDRCxXQUFLLEdBQUcsQ0FBQyxDQUFBOztJQTRGckIsQ0FBQztJQXpGYSxtQ0FBUSxHQUFsQjtRQUVJLElBQUksQ0FBQyxZQUFZLEdBQWtCLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLHVCQUFhLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMvRSxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEYsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25GLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUss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QztJQUVMLHdCQUFDO0FBQUQsQ0F0QkEsQUFzQkMsQ0F0QitCLGtCQUFRLEdBc0J2QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgUG9vbEJhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdG9vbC9Qb29sQmFzZVwiO1xyXG5pbXBvcnQgUmVjaGFyZ2VNb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9SZWNoYXJnZU1vZGVsXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjaGFyZ2VMaXN0VmlldyBleHRlbmRzIFZpZXdCYXNlIHtcclxuICAgIHByaXZhdGUgUmVjaGFnZW1vZGVsOiBSZWNoYXJnZU1vZGVsO1xyXG4gICAgcHJpdmF0ZSBjb3B5SXRlbTogYW55O1xyXG4gICAgcHJpdmF0ZSBjb250ZW50Tm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgcGFnZUxhYmVsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgbmV4dEJ0bjogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgbGFzdEJ0bjogY2MuTm9kZTtcclxuICAgIC8v5rKh5pyJ5pWw5o2uXHJcbiAgICBwcml2YXRlIG5vdGhpbmdOb2RlOmNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGl0ZW1Qb29sOiBSZWNvcmRpbmdJdGVtUG9vbDtcclxuICAgIHByaXZhdGUgbm9kZUxpc3Q6IGFueVtdID0gW107XHJcbiAgICAvL+W9k+WJjeaYvuekuueahOmhteaVsFxyXG4gICAgcHJpdmF0ZSBsaW1pdCA9IDZcclxuICAgIHByaXZhdGUgYXJyTGlzdDogQXJyYXk8YW55PlxyXG4gICAgcHJpdmF0ZSBpc1JlY2hhcmdlOiBib29sZWFuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUmVjaGFnZW1vZGVsID0gPFJlY2hhcmdlTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlJlY2hhcmdlTW9kZWxcIik7XHJcbiAgICAgICAgdGhpcy5SZWNoYWdlbW9kZWwub24oUmVjaGFyZ2VNb2RlbC5VcGRhdGVIaXN0b3J5LCB0aGlzLCB0aGlzLkluaXRUZWFtTGlzdFZpZXcpO1xyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwibmV4UGFnZVwiLCB0aGlzLk9uTmV4dFBhZ2VQYWdlQnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwidXBQYWdlXCIsIHRoaXMuT25MYXN0UGFnZUJ0bkNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnROb2RlID0gdGhpcy5nZXRDaGlsZChcInNjcm9sbHZpZXcvdmlldy9jb250ZW50XCIpO1xyXG4gICAgICAgIHRoaXMuY29weUl0ZW0gPSB0aGlzLmdldENoaWxkKFwic2Nyb2xsdmlldy92aWV3L2NvbnRlbnQvSXRlbVwiKTtcclxuICAgICAgICB0aGlzLnBhZ2VMYWJlbCA9IHRoaXMuZ2V0Q2hpbGQoXCJwYWdlTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLm5vdGhpbmdOb2RlID0gdGhpcy5nZXRDaGlsZChcIk5vdGhpbmdcIik7XHJcbiAgICAgICAgdGhpcy5ub3RoaW5nTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5leHRCdG4gPSB0aGlzLmdldENoaWxkKFwibmV4UGFnZVwiKTtcclxuICAgICAgICB0aGlzLmxhc3RCdG4gPSB0aGlzLmdldENoaWxkKFwidXBQYWdlXCIpO1xyXG4gICAgICAgIHRoaXMuY29weUl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbml0SXRlbVBvb2woKVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgb25PcGVuUmVjaGFyZ2UoaXNSZWNoYXJnZTogYm9vbGVhbiA9IGZhbHNlKXtcclxuICAgICAgICB0aGlzLmlzUmVjaGFyZ2UgPSBpc1JlY2hhcmdlO1xyXG4gICAgICAgIHRoaXMuUmVjaGFnZW1vZGVsLnJlcUdldFVzZXJQYXlMaXN0KClcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLml0ZW1Qb29sLnJlc2V0UG9vbCgpXHJcbiAgICAgICAgdGhpcy5SZWNoYWdlbW9kZWwub2ZmKFJlY2hhcmdlTW9kZWwuVXBkYXRlSGlzdG9yeSwgdGhpcywgdGhpcy5Jbml0VGVhbUxpc3RWaWV3KTtcclxuICAgIH1cclxuICAgIC8v5LiL5LiA6aG1XHJcbiAgICBPbk5leHRQYWdlUGFnZUJ0bkNsaWNrKCkge1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICBpZih0aGlzLmFyckxpc3QubGVuZ3RoID4gdGhpcy5SZWNoYWdlbW9kZWwuaGlzTGlzdFBhZ2UgKiB0aGlzLmxpbWl0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5SZWNoYWdlbW9kZWwuaGlzTGlzdFBhZ2UrKztcclxuICAgICAgICAgICAgdGhpcy5Jbml0VGVhbUxpc3RWaWV3KCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuUmVjaGFnZW1vZGVsLnJlcUdldFVzZXJQYXlMaXN0KHRydWUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8g5LiK5LiA6aG1XHJcbiAgICBPbkxhc3RQYWdlQnRuQ2xpY2soKSB7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgICAgIHRoaXMuUmVjaGFnZW1vZGVsLmhpc0xpc3RQYWdlLS07XHJcbiAgICAgICAgaWYodGhpcy5SZWNoYWdlbW9kZWwuaGlzTGlzdFBhZ2U8PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlJlY2hhZ2Vtb2RlbC5oaXNMaXN0UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5bey57uP5piv56ys5LiA6aG15LqGXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkluaXRUZWFtTGlzdFZpZXcoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5pdEl0ZW1Qb29sKCl7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLml0ZW1Qb29sID0gbmV3IFJlY29yZGluZ0l0ZW1Qb29sKHRoaXMuY29weUl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWN5Y2xlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLml0ZW1Qb29sLnJlY3ljbGVBbGwodGhpcy5ub2RlTGlzdCk7XHJcbiAgICAgICAgdGhpcy5ub2RlTGlzdCA9IFtdO1xyXG4gICAgfVxyXG4gICAgSW5pdFRlYW1MaXN0VmlldygpIHtcclxuICAgICAgICB0aGlzLmFyckxpc3QgPSB0aGlzLlJlY2hhZ2Vtb2RlbC5nZXRIaXNMaXN0RGF0YSgpIHx8IFtdO1xyXG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMuYXJyTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgaWYoY291bnQgPCAxKXtcclxuICAgICAgICAgICAgdGhpcy5ub3RoaW5nTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdEJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5ub3RoaW5nTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0QnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb3VudCA9PTApICByZXR1cm47XHJcbiAgICAgICAgbGV0IGxpc3RDb3VudCA9IGNvdW50IC0gKHRoaXMuUmVjaGFnZW1vZGVsLmhpc0xpc3RQYWdlLTEpKnRoaXMubGltaXQgPiB0aGlzLmxpbWl0P3RoaXMubGltaXQ6Y291bnQgLSAodGhpcy5SZWNoYWdlbW9kZWwuaGlzTGlzdFBhZ2UtMSkqdGhpcy5saW1pdFxyXG4gICAgICAgIHRoaXMucmVjeWNsZSgpO1xyXG4gICAgICAgIGZvciAobGV0IGo9MDsgajwgbGlzdENvdW50OyBqKyspe1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuaXRlbVBvb2wuZ2V0SXRlbSgpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVMaXN0LnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQodGhpcy5jb250ZW50Tm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KFwiUmVjb3JkaW5nSXRlbVwiKS5Jbml0KHRoaXMuYXJyTGlzdFsodGhpcy5SZWNoYWdlbW9kZWwuaGlzTGlzdFBhZ2UtMSkqdGhpcy5saW1pdCtqXSxqLHRoaXMuaXNSZWNoYXJnZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1zZ0Zvcm1hdCA9IFwi5YWxJXPmnaFcIlxyXG4gICAgICAgIGxldCBzdHIgPSBcIuesrCVz6aG1XCJcclxuICAgICAgICB0aGlzLnBhZ2VMYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIobXNnRm9ybWF0LHRoaXMuUmVjaGFnZW1vZGVsLmhpc1RvdGFsKSArIGNjLmpzLmZvcm1hdFN0cihzdHIsdGhpcy5SZWNoYWdlbW9kZWwuaGlzTGlzdFBhZ2UpO1xyXG4gICAgfVxyXG5cclxufVxyXG5jbGFzcyBSZWNvcmRpbmdJdGVtUG9vbCBleHRlbmRzIFBvb2xCYXNle1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3B5Tm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlSXRlbSgpe1xyXG4gICAgICAgIHJldHVybiBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvcHlOb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVzZXRJdGVtKG5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbm9kZS5zZXRQYXJlbnQobnVsbClcclxuICAgIH1cclxuICAgIHB1YmxpYyByZWN5Y2xlQWxsKGFycjogQXJyYXk8YW55PilcclxuICAgIHtcclxuICAgICAgICBzdXBlci5yZWN5Y2xlQWxsKGFycilcclxuICAgICAgICBhcnIuZm9yRWFjaChlbGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0SXRlbShlbGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==