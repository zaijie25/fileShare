
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/CommissionSys/WndCommision.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2f0817OLTlPirx86lYsi8hz', 'WndCommision');
// hall/scripts/logic/hall/ui/CommissionSys/WndCommision.ts

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
var PoolBase_1 = require("../../../core/tool/PoolBase");
var WndBase_1 = require("../../../core/ui/WndBase");
var CommisionLeftItem_1 = require("./CommisionLeftItem");
var CommisionModel_1 = require("../../../hallcommon/model/CommisionModel");
var HallModel_1 = require("../../../hallcommon/model/HallModel");
var WaitingView_1 = require("../waiting/WaitingView");
var WndCommision = /** @class */ (function (_super) {
    __extends(WndCommision, _super);
    function WndCommision() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.leftItemNodeList = [];
        _this.RightItemNodeList = [];
        _this.taskType = -1;
        _this.clickedId = -1;
        return _this;
    }
    WndCommision.prototype.onOpen = function () {
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        this.model.reqGetCommisionAllList();
    };
    WndCommision.prototype.initView = function () {
        this.leftCopyItem = this.getChild("leftPanel/missionItem");
        if (this.leftCopyItem) {
            this.leftCopyItem.active = false;
        }
        this.rightCopyItem = this.getChild("rightPanel/item");
        if (this.rightCopyItem) {
            this.rightCopyItem.active = false;
        }
        this.lfetContentNode = this.getChild("leftPanel/scrollview/view/content");
        this.rightScrollView = this.getComponent("rightPanel/scrollview", cc.ScrollView);
        this.addCommonClick("close", this.close, this);
        this.initItemPool();
        this.initRightListView();
        this.model.on(CommisionModel_1.default.UpdateleftView, this, this.RefershLeftPanel);
        this.model.on(CommisionModel_1.default.UpdateScrollview, this, this.RefershRightPanel);
        this.model.on(CommisionModel_1.default.GetCommisionAward, this, this.onGetAward);
        if (this.waitingNode == null || this.waitingNode == undefined) {
            //view 内的loading
            this.waitingNode = WaitingView_1.default.initWaitingView(this.node, cc.v2(0, 0));
        }
    };
    WndCommision.prototype.onGetAward = function (data) {
        var flag = this.model.checkIsAnyCommisionCanGet(this.clickedId);
        var node = this.lfetContentNode.getChildByName(this.clickedId.toString());
        if (!flag) {
            node.getComponent(CommisionLeftItem_1.default).SetUnReadActiveState(false);
            // this.refreshPanel()
        }
        this.ChangeStatus(data);
        this.rightListView.updateView();
    };
    WndCommision.prototype.initItemPool = function () {
        this.leftItemPool = new CommissionItemPool(this.leftCopyItem);
    };
    WndCommision.prototype.onInit = function () {
        this.isNeedDelay = true;
        this.name = "WndCommision";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/Commision/CommisionUI";
        this.model = Global.ModelManager.getModel("CommisionModel");
    };
    WndCommision.prototype.initRightListView = function () {
        var _this = this;
        var item_setter = function (item, index) {
            var data = _this.rightListView.allDatas[index];
            item.getComponent("CommisionItem").UpdateUI(data, _this.taskType);
        };
        var _a = Global.Setting.SkinConfig.commisionCfg, itemPadding = _a[0], itemOffset = _a[1];
        this.rightListView = Global.UIHelper.addScrollViewCarmackComp(this.rightScrollView.node, this.rightCopyItem, itemPadding, itemOffset, this, item_setter);
    };
    WndCommision.prototype.onClose = function () {
        this.recycleItems();
        var flag = this.model.checkShowHallRedSpot();
        if (flag) {
            Global.Event.event(GlobalEvent.ShowRedSpot, [true, HallModel_1.HallRedSpotType.Commision]);
        }
        else {
            Global.Event.event(GlobalEvent.CloseRedSpot, HallModel_1.HallRedSpotType.Commision);
        }
        this.model.resetData();
    };
    WndCommision.prototype.onDispose = function () {
        this.leftItemPool.resetPool();
        this.leftItemNodeList = [];
        this.RightItemNodeList = [];
        this.model.off(CommisionModel_1.default.UpdateleftView, this, this.RefershLeftPanel);
        this.model.off(CommisionModel_1.default.UpdateScrollview, this, this.RefershRightPanel);
        this.model.off(CommisionModel_1.default.GetCommisionAward, this, this.onGetAward);
    };
    WndCommision.prototype.RefershRightPanel = function (data) {
        if (this.waitingNode) {
            this.waitingNode.active = false;
        }
        var arr = data.data || [];
        this.taskType = data.global_task_type ? data.global_task_type : -1;
        arr.sort(this.sortData);
        this.rightListView.allDatas = arr;
        this.rightListView.updateView();
    };
    WndCommision.prototype.sortData = function (a, b) {
        if (a.task_status !== 1 && b.task_status !== 1) {
            return a - b;
        }
        else if (a.task_status === 1 && b.task_status !== 1) {
            return -1;
        }
        else if (a.task_status === 1 && b.task_status === 1) {
            return a - b;
        }
        else {
            return 1;
        }
    };
    WndCommision.prototype.ChangeStatus = function (data) {
        var arr = this.rightListView.allDatas;
        if (!arr || arr.length == 0)
            return;
        for (var index = 0; index < arr.length; index++) {
            var element = arr[index];
            if (element.task_id == data.id && data.global_task_type == this.clickedId) {
                element.task_status = 2;
            }
        }
        arr.sort(this.sortData);
    };
    WndCommision.prototype.SortItem = function () {
    };
    WndCommision.prototype.UpdataListData = function (data) {
        if (data == null)
            return;
        this.rightListView.allDatas = data;
        this.rightListView.UpDateScrollData();
    };
    WndCommision.prototype.RefershLeftPanel = function (data) {
        if (this.waitingNode) {
            this.waitingNode.active = false;
        }
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING, "WndCommision");
        if (!data || data.length == 0) {
            Global.UI.fastTip("该功能暂未开放，敬请期待哦！");
            return;
        }
        this.OnDataPrepared();
        for (var index = 0; index < data.length; index++) {
            // if(data[index].global_task_type == 7){ //屏蔽掉游戏活跃
            //     continue;
            // }
            var leftItem = this.leftItemPool.getItem();
            leftItem.setParent(this.lfetContentNode);
            this.leftItemNodeList.push(leftItem);
            var CommisionItem_1 = leftItem.getComponent("CommisionLeftItem");
            CommisionItem_1.data = data[index];
            if (index === 0) {
                this.clickedId = data[index].global_task_type;
                CommisionItem_1.SetToggleChecked(true);
                this.model.reqGetCommisionInfo(data[index].global_task_type);
            }
            leftItem.active = true;
            leftItem.name = data[index].global_task_type.toString();
            leftItem.on(cc.Node.EventType.TOUCH_END, this.leftItemClick, this);
            CommisionItem_1.onInit(data[index]);
        }
    };
    WndCommision.prototype.leftItemClick = function (target) {
        var CommisionItem = target.target.getComponent("CommisionLeftItem");
        if (CommisionItem && CommisionItem.data) {
            if (this.clickedId == CommisionItem.data.global_task_type) {
                return;
            }
            this.clickedId = CommisionItem.data.global_task_type;
            var data = this.model.GetCommisionInfoByType(CommisionItem.data.global_task_type);
            if (data) {
                this.RefershRightPanel(data);
                return;
            }
            if (this.waitingNode) {
                this.waitingNode.active = true;
            }
            this.model.reqGetCommisionInfo(CommisionItem.data.global_task_type);
        }
    };
    /**
     *
     * @param type 1左边 2 右边 0 全部
     */
    WndCommision.prototype.recycleItems = function () {
        this.leftItemPool.recycleAll(this.leftItemNodeList);
        this.leftItemNodeList = [];
    };
    return WndCommision;
}(WndBase_1.default));
exports.default = WndCommision;
var CommissionItemPool = /** @class */ (function (_super) {
    __extends(CommissionItemPool, _super);
    function CommissionItemPool(copyNode) {
        var _this = _super.call(this) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    CommissionItemPool.prototype.createItem = function () {
        return cc.instantiate(this.copyNode);
    };
    CommissionItemPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    CommissionItemPool.prototype.recycleAll = function (arr) {
        var _this = this;
        _super.prototype.recycleAll.call(this, arr);
        arr.forEach(function (ele) {
            _this.resetItem(ele);
        });
    };
    return CommissionItemPool;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxDb21taXNzaW9uU3lzXFxXbmRDb21taXNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQW1EO0FBQ25ELG9EQUErQztBQUUvQyx5REFBb0Q7QUFDcEQsMkVBQXNFO0FBQ3RFLGlFQUFzRTtBQUN0RSxzREFBaUQ7QUFFakQ7SUFBMkIsZ0NBQU87SUFBbEM7UUFBQSxxRUF1UEM7UUFqUEcsc0JBQWdCLEdBQUcsRUFBRSxDQUFBO1FBQ3JCLHVCQUFpQixHQUFHLEVBQUUsQ0FBQTtRQVFkLGNBQVEsR0FBVSxDQUFDLENBQUMsQ0FBQztRQUVyQixlQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUE7O0lBc08xQixDQUFDO0lBbk9hLDZCQUFNLEdBQWhCO1FBQ0ksSUFBRyxJQUFJLENBQUMsV0FBVyxFQUNuQjtZQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNsQztRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTtJQUN2QyxDQUFDO0lBRVMsK0JBQVEsR0FBbEI7UUFDRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtRQUMxRCxJQUFHLElBQUksQ0FBQyxZQUFZLEVBQ3BCO1lBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFBO1NBQ25DO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDckQsSUFBRyxJQUFJLENBQUMsYUFBYSxFQUNyQjtZQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtTQUNwQztRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxt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c0NBQVE7SUFDckMsNEJBQW9CLFFBQWlCO1FBQXJDLFlBQ0ksaUJBQU8sU0FDVjtRQUZtQixjQUFRLEdBQVIsUUFBUSxDQUFTOztJQUVyQyxDQUFDO0lBQ1MsdUNBQVUsR0FBcEI7UUFDSSxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFUyxzQ0FBUyxHQUFuQixVQUFvQixJQUFhO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUNNLHVDQUFVLEdBQWpCLFVBQWtCLEdBQWU7UUFBakMsaUJBT0M7UUFMRyxpQkFBTSxVQUFVLFlBQUMsR0FBRyxDQUFDLENBQUE7UUFDckIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDWCxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FwQkEsQUFvQkMsQ0FwQmdDLGtCQUFRLEdBb0J4QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb29sQmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS90b29sL1Bvb2xCYXNlXCI7XHJcbmltcG9ydCBXbmRCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IENvbW1pc2lvbkl0ZW0gZnJvbSBcIi4vQ29tbWlzaW9uSXRlbVwiO1xyXG5pbXBvcnQgQ29tbWlzaW9uTGVmdEl0ZW0gZnJvbSBcIi4vQ29tbWlzaW9uTGVmdEl0ZW1cIjtcclxuaW1wb3J0IENvbW1pc2lvbk1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0NvbW1pc2lvbk1vZGVsXCI7XHJcbmltcG9ydCB7IEhhbGxSZWRTcG90VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0hhbGxNb2RlbFwiO1xyXG5pbXBvcnQgV2FpdGluZ1ZpZXcgZnJvbSBcIi4uL3dhaXRpbmcvV2FpdGluZ1ZpZXdcIjtcclxuXHJcbmNsYXNzIFduZENvbW1pc2lvbiBleHRlbmRzIFduZEJhc2V7XHJcbiAgICBcclxuICAgIGxlZnRJdGVtUG9vbDogQ29tbWlzc2lvbkl0ZW1Qb29sO1xyXG4gICAgcmlnaHRMaXN0Vmlldzphbnk7XHJcbiAgICBwcml2YXRlIHJpZ2h0U2Nyb2xsVmlldzpjYy5TY3JvbGxWaWV3O1xyXG5cclxuICAgIGxlZnRJdGVtTm9kZUxpc3QgPSBbXVxyXG4gICAgUmlnaHRJdGVtTm9kZUxpc3QgPSBbXVxyXG5cclxuICAgIHByaXZhdGUgbGVmdENvcHlJdGVtIDpjYy5Ob2RlXHJcbiAgICBwcml2YXRlIHJpZ2h0Q29weUl0ZW0gOmNjLk5vZGVcclxuXHJcbiAgICBwcml2YXRlIG1vZGVsOkNvbW1pc2lvbk1vZGVsXHJcblxyXG4gICAgcHJpdmF0ZSBsZmV0Q29udGVudE5vZGU6Y2MuTm9kZVxyXG4gICAgcHJpdmF0ZSB0YXNrVHlwZTpudW1iZXIgPSAtMTtcclxuXHJcbiAgICBwcml2YXRlIGNsaWNrZWRJZCA9IC0xXHJcblxyXG4gICAgcHJpdmF0ZSB3YWl0aW5nTm9kZSA6Y2MuTm9kZTtcclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKXtcclxuICAgICAgICBpZih0aGlzLndhaXRpbmdOb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy53YWl0aW5nTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vZGVsLnJlcUdldENvbW1pc2lvbkFsbExpc3QoKVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgdGhpcy5sZWZ0Q29weUl0ZW0gPSB0aGlzLmdldENoaWxkKFwibGVmdFBhbmVsL21pc3Npb25JdGVtXCIpXHJcbiAgICAgICBpZih0aGlzLmxlZnRDb3B5SXRlbSlcclxuICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLmxlZnRDb3B5SXRlbS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgfVxyXG5cclxuICAgICAgIHRoaXMucmlnaHRDb3B5SXRlbSA9IHRoaXMuZ2V0Q2hpbGQoXCJyaWdodFBhbmVsL2l0ZW1cIilcclxuICAgICAgIGlmKHRoaXMucmlnaHRDb3B5SXRlbSlcclxuICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLnJpZ2h0Q29weUl0ZW0uYWN0aXZlID0gZmFsc2VcclxuICAgICAgIH1cclxuICAgICAgIHRoaXMubGZldENvbnRlbnROb2RlID0gdGhpcy5nZXRDaGlsZChcImxlZnRQYW5lbC9zY3JvbGx2aWV3L3ZpZXcvY29udGVudFwiKVxyXG4gICAgICAgdGhpcy5yaWdodFNjcm9sbFZpZXcgPSB0aGlzLmdldENvbXBvbmVudChcInJpZ2h0UGFuZWwvc2Nyb2xsdmlld1wiLGNjLlNjcm9sbFZpZXcpXHJcbiAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY2xvc2VcIix0aGlzLmNsb3NlLHRoaXMpXHJcbiAgICAgICB0aGlzLmluaXRJdGVtUG9vbCgpXHJcbiAgICAgICB0aGlzLmluaXRSaWdodExpc3RWaWV3KCk7XHJcbiAgICAgICB0aGlzLm1vZGVsLm9uKENvbW1pc2lvbk1vZGVsLlVwZGF0ZWxlZnRWaWV3LHRoaXMsdGhpcy5SZWZlcnNoTGVmdFBhbmVsKVxyXG4gICAgICAgdGhpcy5tb2RlbC5vbihDb21taXNpb25Nb2RlbC5VcGRhdGVTY3JvbGx2aWV3LHRoaXMsdGhpcy5SZWZlcnNoUmlnaHRQYW5lbClcclxuICAgICAgIHRoaXMubW9kZWwub24oQ29tbWlzaW9uTW9kZWwuR2V0Q29tbWlzaW9uQXdhcmQsIHRoaXMsdGhpcy5vbkdldEF3YXJkKTtcclxuICAgICAgIGlmKHRoaXMud2FpdGluZ05vZGUgPT0gbnVsbHx8IHRoaXMud2FpdGluZ05vZGUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAvL3ZpZXcg5YaF55qEbG9hZGluZ1xyXG4gICAgICAgICAgICB0aGlzLndhaXRpbmdOb2RlID0gV2FpdGluZ1ZpZXcuaW5pdFdhaXRpbmdWaWV3KHRoaXMubm9kZSxjYy52MigwLDApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkdldEF3YXJkKGRhdGEpIHtcclxuICAgICAgICBsZXQgZmxhZyA9IHRoaXMubW9kZWwuY2hlY2tJc0FueUNvbW1pc2lvbkNhbkdldCh0aGlzLmNsaWNrZWRJZClcclxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMubGZldENvbnRlbnROb2RlLmdldENoaWxkQnlOYW1lKHRoaXMuY2xpY2tlZElkLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgaWYoIWZsYWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChDb21taXNpb25MZWZ0SXRlbSkuU2V0VW5SZWFkQWN0aXZlU3RhdGUoZmFsc2UpXHJcbiAgICAgICAgICAgIC8vIHRoaXMucmVmcmVzaFBhbmVsKClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VTdGF0dXMoZGF0YSlcclxuICAgICAgICB0aGlzLnJpZ2h0TGlzdFZpZXcudXBkYXRlVmlldygpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGluaXRJdGVtUG9vbCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5sZWZ0SXRlbVBvb2wgPSBuZXcgQ29tbWlzc2lvbkl0ZW1Qb29sKHRoaXMubGVmdENvcHlJdGVtKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCl7XHJcbiAgICAgICAgdGhpcy5pc05lZWREZWxheSA9IHRydWVcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZENvbW1pc2lvblwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBcIlBvcExheWVyXCI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvQ29tbWlzaW9uL0NvbW1pc2lvblVJXCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxDb21taXNpb25Nb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiQ29tbWlzaW9uTW9kZWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRSaWdodExpc3RWaWV3KCl7XHJcbiAgICAgICAgbGV0IGl0ZW1fc2V0dGVyID0gKGl0ZW0sIGluZGV4KSA9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnJpZ2h0TGlzdFZpZXcuYWxsRGF0YXNbaW5kZXhdO1xyXG4gICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChcIkNvbW1pc2lvbkl0ZW1cIikuVXBkYXRlVUkoZGF0YSx0aGlzLnRhc2tUeXBlKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IFtpdGVtUGFkZGluZyxpdGVtT2Zmc2V0XSA9IEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuY29tbWlzaW9uQ2ZnO1xyXG4gICAgICAgIHRoaXMucmlnaHRMaXN0VmlldyA9IEdsb2JhbC5VSUhlbHBlci5hZGRTY3JvbGxWaWV3Q2FybWFja0NvbXAodGhpcy5yaWdodFNjcm9sbFZpZXcubm9kZSwgdGhpcy5yaWdodENvcHlJdGVtLCBpdGVtUGFkZGluZywgaXRlbU9mZnNldCwgdGhpcywgaXRlbV9zZXR0ZXIpO1xyXG4gICAgfVxyXG4gICBcclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMucmVjeWNsZUl0ZW1zKClcclxuICAgICAgICBsZXQgZmxhZyA9IHRoaXMubW9kZWwuY2hlY2tTaG93SGFsbFJlZFNwb3QoKVxyXG4gICAgICAgIGlmKGZsYWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU2hvd1JlZFNwb3QsIFt0cnVlLEhhbGxSZWRTcG90VHlwZS5Db21taXNpb25dKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkNsb3NlUmVkU3BvdCwgSGFsbFJlZFNwb3RUeXBlLkNvbW1pc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW9kZWwucmVzZXREYXRhKClcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzcG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5sZWZ0SXRlbVBvb2wucmVzZXRQb29sKClcclxuICAgICAgICB0aGlzLmxlZnRJdGVtTm9kZUxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLlJpZ2h0SXRlbU5vZGVMaXN0ID0gW11cclxuICAgICAgICB0aGlzLm1vZGVsLm9mZihDb21taXNpb25Nb2RlbC5VcGRhdGVsZWZ0Vmlldyx0aGlzLHRoaXMuUmVmZXJzaExlZnRQYW5lbClcclxuICAgICAgICB0aGlzLm1vZGVsLm9mZihDb21taXNpb25Nb2RlbC5VcGRhdGVTY3JvbGx2aWV3LHRoaXMsdGhpcy5SZWZlcnNoUmlnaHRQYW5lbClcclxuICAgICAgICB0aGlzLm1vZGVsLm9mZihDb21taXNpb25Nb2RlbC5HZXRDb21taXNpb25Bd2FyZCwgdGhpcyx0aGlzLm9uR2V0QXdhcmQpO1xyXG4gICAgfVxyXG5cclxuICAgIFJlZmVyc2hSaWdodFBhbmVsKGRhdGEpIHtcclxuICAgICAgICBpZih0aGlzLndhaXRpbmdOb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy53YWl0aW5nTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFycjogQXJyYXk8YW55PiA9IGRhdGEuZGF0YSB8fCBbXTtcclxuICAgICAgICB0aGlzLnRhc2tUeXBlID0gZGF0YS5nbG9iYWxfdGFza190eXBlID8gZGF0YS5nbG9iYWxfdGFza190eXBlIDogLTE7IFxyXG4gICAgICAgIGFyci5zb3J0KHRoaXMuc29ydERhdGEpXHJcbiAgICAgICAgdGhpcy5yaWdodExpc3RWaWV3LmFsbERhdGFzID0gYXJyO1xyXG4gICAgICAgIHRoaXMucmlnaHRMaXN0Vmlldy51cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc29ydERhdGEoYSxiKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGEudGFza19zdGF0dXMgIT09IDEgJiYgYi50YXNrX3N0YXR1cyAhPT0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBhIC0gYlxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGEudGFza19zdGF0dXMgPT09IDEgJiYgYi50YXNrX3N0YXR1cyAhPT0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAtIDFcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihhLnRhc2tfc3RhdHVzID09PSAxICYmIGIudGFza19zdGF0dXMgPT09IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gYSAtIGIgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIENoYW5nZVN0YXR1cyhkYXRhKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBhcnIgPSB0aGlzLnJpZ2h0TGlzdFZpZXcuYWxsRGF0YXNcclxuICAgICAgICBpZighYXJyIHx8IGFyci5sZW5ndGggPT0gMCkgcmV0dXJuXHJcblxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gYXJyW2luZGV4XTtcclxuICAgICAgICAgICAgaWYoZWxlbWVudC50YXNrX2lkID09IGRhdGEuaWQgJiYgZGF0YS5nbG9iYWxfdGFza190eXBlID09IHRoaXMuY2xpY2tlZElkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnRhc2tfc3RhdHVzID0gMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBhcnIuc29ydCh0aGlzLnNvcnREYXRhKVxyXG5cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBTb3J0SXRlbSgpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0YUxpc3REYXRhKGRhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoZGF0YSA9PSBudWxsKSByZXR1cm5cclxuICAgICAgICB0aGlzLnJpZ2h0TGlzdFZpZXcuYWxsRGF0YXMgPSBkYXRhXHJcbiAgICAgICAgdGhpcy5yaWdodExpc3RWaWV3LlVwRGF0ZVNjcm9sbERhdGEoKVxyXG4gICAgfVxyXG5cclxuICAgIFJlZmVyc2hMZWZ0UGFuZWwoZGF0YSkge1xyXG4gICAgICAgIGlmKHRoaXMud2FpdGluZ05vZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLndhaXRpbmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuSElERV9ORVRfV0FJVElORyxcIlduZENvbW1pc2lvblwiKVxyXG4gICAgICAgIGlmICghZGF0YSB8fCBkYXRhLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi6K+l5Yqf6IO95pqC5pyq5byA5pS+77yM5pWs6K+35pyf5b6F5ZOm77yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5PbkRhdGFQcmVwYXJlZCgpXHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRhdGEubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIC8vIGlmKGRhdGFbaW5kZXhdLmdsb2JhbF90YXNrX3R5cGUgPT0gNyl7IC8v5bGP6JS95o6J5ri45oiP5rS76LeDXHJcbiAgICAgICAgICAgIC8vICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBsZXQgbGVmdEl0ZW0gPSB0aGlzLmxlZnRJdGVtUG9vbC5nZXRJdGVtKClcclxuICAgICAgICAgICAgbGVmdEl0ZW0uc2V0UGFyZW50KHRoaXMubGZldENvbnRlbnROb2RlKVxyXG4gICAgICAgICAgICB0aGlzLmxlZnRJdGVtTm9kZUxpc3QucHVzaChsZWZ0SXRlbSk7XHJcbiAgICAgICAgICAgIGxldCBDb21taXNpb25JdGVtID0gbGVmdEl0ZW0uZ2V0Q29tcG9uZW50KFwiQ29tbWlzaW9uTGVmdEl0ZW1cIilcclxuICAgICAgICAgICAgQ29tbWlzaW9uSXRlbS5kYXRhID0gZGF0YVtpbmRleF1cclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsaWNrZWRJZCA9IGRhdGFbaW5kZXhdLmdsb2JhbF90YXNrX3R5cGVcclxuICAgICAgICAgICAgICAgIENvbW1pc2lvbkl0ZW0uU2V0VG9nZ2xlQ2hlY2tlZCh0cnVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5yZXFHZXRDb21taXNpb25JbmZvKGRhdGFbaW5kZXhdLmdsb2JhbF90YXNrX3R5cGUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGVmdEl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGVmdEl0ZW0ubmFtZSA9ICBkYXRhW2luZGV4XS5nbG9iYWxfdGFza190eXBlLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgbGVmdEl0ZW0ub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLmxlZnRJdGVtQ2xpY2ssIHRoaXMpXHJcbiAgICAgICAgICAgIENvbW1pc2lvbkl0ZW0ub25Jbml0KGRhdGFbaW5kZXhdKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxlZnRJdGVtQ2xpY2sodGFyZ2V0KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IENvbW1pc2lvbkl0ZW0gPSB0YXJnZXQudGFyZ2V0LmdldENvbXBvbmVudChcIkNvbW1pc2lvbkxlZnRJdGVtXCIpXHJcbiAgICAgICAgaWYoQ29tbWlzaW9uSXRlbSAmJiBDb21taXNpb25JdGVtLmRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLmNsaWNrZWRJZCA9PSBDb21taXNpb25JdGVtLmRhdGEuZ2xvYmFsX3Rhc2tfdHlwZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jbGlja2VkSWQgPSBDb21taXNpb25JdGVtLmRhdGEuZ2xvYmFsX3Rhc2tfdHlwZVxyXG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMubW9kZWwuR2V0Q29tbWlzaW9uSW5mb0J5VHlwZShDb21taXNpb25JdGVtLmRhdGEuZ2xvYmFsX3Rhc2tfdHlwZSlcclxuICAgICAgICAgICAgaWYoZGF0YSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZWZlcnNoUmlnaHRQYW5lbChkYXRhKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy53YWl0aW5nTm9kZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWwucmVxR2V0Q29tbWlzaW9uSW5mbyhDb21taXNpb25JdGVtLmRhdGEuZ2xvYmFsX3Rhc2tfdHlwZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB0eXBlIDHlt6bovrkgMiDlj7PovrkgMCDlhajpg6hcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlY3ljbGVJdGVtcygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5sZWZ0SXRlbVBvb2wucmVjeWNsZUFsbCh0aGlzLmxlZnRJdGVtTm9kZUxpc3QpO1xyXG4gICAgICAgIHRoaXMubGVmdEl0ZW1Ob2RlTGlzdCA9IFtdO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV25kQ29tbWlzaW9uXHJcblxyXG5jbGFzcyBDb21taXNzaW9uSXRlbVBvb2wgZXh0ZW5kcyBQb29sQmFzZXtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29weU5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlSXRlbSgpe1xyXG4gICAgICAgIHJldHVybiBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvcHlOb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVzZXRJdGVtKG5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbm9kZS5zZXRQYXJlbnQobnVsbClcclxuICAgIH1cclxuICAgIHB1YmxpYyByZWN5Y2xlQWxsKGFycjogQXJyYXk8YW55PilcclxuICAgIHtcclxuICAgICAgICBzdXBlci5yZWN5Y2xlQWxsKGFycilcclxuICAgICAgICBhcnIuZm9yRWFjaChlbGUgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0SXRlbShlbGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxufSJdfQ==