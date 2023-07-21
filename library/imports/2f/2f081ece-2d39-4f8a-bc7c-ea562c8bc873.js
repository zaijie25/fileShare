"use strict";
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