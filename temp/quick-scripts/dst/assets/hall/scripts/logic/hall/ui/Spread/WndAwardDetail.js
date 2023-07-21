
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/WndAwardDetail.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '41c36jRKLhGFrppbRrEKKZp', 'WndAwardDetail');
// hall/scripts/logic/hall/ui/Spread/WndAwardDetail.ts

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
var NetEvent_1 = require("../../../core/net/hall/NetEvent");
var WaitingView_1 = require("../waiting/WaitingView");
var WndAwardDetail = /** @class */ (function (_super) {
    __extends(WndAwardDetail, _super);
    function WndAwardDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeList = [];
        _this.page = 1;
        _this.limit = 7;
        _this.totalPage = 0;
        return _this;
    }
    WndAwardDetail.prototype.initView = function () {
        if (this.waitingNode == null || this.waitingNode == undefined) {
            //view 内的loading
            this.waitingNode = WaitingView_1.default.initWaitingView(this.node, cc.v2(0, 0));
        }
        this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
        this.top_normal = this.getChild("Top_Normal");
        this.top_self = this.getChild("Top_Self");
        this.title_self = this.getChild("View/Title_Self");
        this.title_normal = this.getChild("View/Title_Normal");
        this.cmmi_type = this.SpreadModel.commiType;
        this.copyItem = this.getChild("View/scrollview/item");
        if (this.SpreadModel.self_rate > 0 && this.cmmi_type === 1) {
            // this.WeekMyselfDir = this.getChild("Top_Self/WeekMyselfDir/Count").getComponent(cc.Label)
            // this.top_self.active = true
            // this.title_self.active = true
            // this.top_normal.active = false
            // this.title_normal.active = false
            // this.titleNode = this.title_self
            // this.topNode = this.top_self
            // this.WeekTotal = this.getChild("Top_Self/WeekTotal/Count").getComponent(cc.Label)
            // this.WeekDir = this.getChild("Top_Self/WeekDir/Count").getComponent(cc.Label)
            // this.WeekOther = this.getChild("Top_Self/WeekOther/Count").getComponent(cc.Label)
            // this.copyItem = this.getChild("View/scrollview/item_self");
        }
        else if (this.SpreadModel.self_rate <= 0 && this.cmmi_type === 1) {
            // this.top_self.active = false
            // this.title_self.active = false
            // this.top_normal.active = true
            // this.titleNode = this.title_normal
            // this.topNode = this.top_normal
            // this.title_normal.active = true
            // this.WeekTotal = this.getChild("Top_Normal/WeekTotal/Count").getComponent(cc.Label)
            // this.WeekDir = this.getChild("Top_Normal/WeekDir/Count").getComponent(cc.Label)
            // this.WeekOther = this.getChild("Top_Normal/WeekOther/Count").getComponent(cc.Label)
            // this.top_self.active = false
            // this.title_self.active = false 
        }
        if (this.cmmi_type == 2) {
            this.titleNode = this.getChild("View/Title");
        }
        this.LastPageBtn = this.getChild("View/BotBtn/LastPage");
        this.NextPageBtn = this.getChild("View/BotBtn/NextPage");
        this.LastPageBtn.on("click", this.OnLastPageBtnClick, this);
        this.NextPageBtn.on("click", this.OnNextPagePageBtnClick, this);
        this.contentNode = this.getChild("View/scrollview/view/content");
        this.copyItem.active = false;
        this.TotalInfo = this.getChild("View/BotBtn/TotalInfoLabel").getComponent(cc.Label);
        this.pageInfo = this.getChild("View/BotBtn/TotalInfoLabel/PageLabel").getComponent(cc.Label);
        this.noTips = this.getChild("View/noListTipsSk");
        this.noTips.active = false;
        this.botNode = this.getChild("View/BotBtn");
        this.botNode.active = false;
        this.initItemPool();
    };
    WndAwardDetail.prototype.OnNextPagePageBtnClick = function () {
        Global.Audio.playBtnSound();
        this.page++;
        if (this.page > this.totalPage) {
            this.page = this.totalPage;
            Global.UI.fastTip("没有更多数据");
            return;
        }
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        if (this.cmmi_type === 1) {
            // this.SpreadModel.GetAwardRecordInfo(this.page, this.limit)
        }
        if (this.cmmi_type === 2) {
            this.SpreadModel.GetDayFlowInfoList(this.page, this.limit);
        }
    };
    WndAwardDetail.prototype.OnLastPageBtnClick = function () {
        Global.Audio.playBtnSound();
        this.page--;
        if (this.page <= 0) {
            this.page = 1;
            Global.UI.fastTip("已经是第一页了");
            return;
        }
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        if (this.cmmi_type === 1) {
            //  this.SpreadModel.GetAwardRecordInfo(this.page, this.limit)
        }
        if (this.cmmi_type === 2) {
            this.SpreadModel.GetDayFlowInfoList(this.page, this.limit);
        }
    };
    WndAwardDetail.prototype.initItemPool = function () {
        this.itemPool = new AwardDetailItemPool(this.copyItem);
    };
    // public open(args?:any[])
    // {
    //     this.onOpen(args);
    //     //this.callAllView("open", args);
    // }
    WndAwardDetail.prototype.onSubViewShow = function () {
        Global.HallServer.on(NetEvent_1.NetAppface.GetSendRecord, this, this.InitTeamListView);
        Global.HallServer.on(NetEvent_1.NetAppface.GetDayFlowInfoList, this, this.InitTeamListView);
        if (this.cmmi_type === 1) {
            //  this.SpreadModel.GetAwardRecordInfo(this.page, this.limit)
        }
        if (this.cmmi_type === 2) {
            this.SpreadModel.GetDayFlowInfoList(this.page, this.limit);
        }
    };
    WndAwardDetail.prototype.InitTeamListView = function (data) {
        if (this.waitingNode) {
            this.waitingNode.active = false;
        }
        if (data == null || Global.Toolkit.isEmptyObject(data)) {
            return;
        }
        if (data.total == 0) {
            if (this.topNode)
                this.topNode.active = false;
            this.noTips.active = true;
            this.titleNode.active = false;
            this.botNode.active = false;
        }
        else {
            if (this.topNode)
                this.topNode.active = true;
            this.noTips.active = false;
            this.titleNode.active = true;
            this.botNode.active = true;
        }
        this.InitTopView(data);
        var arr;
        if (this.cmmi_type === 1) {
            // arr = data.data || []
        }
        if (this.cmmi_type === 2) {
            arr = data.list || [];
        }
        var count = arr.length;
        this.totalPage = Math.ceil(data.total / data.limit);
        this.recycle();
        var msgFormat = "共%s条";
        this.TotalInfo.string = cc.js.formatStr(msgFormat, data.total);
        var str = "第%s页";
        this.pageInfo.string = cc.js.formatStr(str, data.page);
        for (var j = 0; j < count; j++) {
            var node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            node.getComponent("AwardDetailItem").Init(arr[j]);
        }
    };
    WndAwardDetail.prototype.InitTopView = function (data) {
        if (data == null) {
            if (this.WeekTotal)
                this.WeekTotal.string = "";
            if (this.WeekMyselfDir)
                this.WeekMyselfDir.string = "";
            if (this.WeekDir)
                this.WeekDir.string = "";
            if (this.WeekOther)
                this.WeekOther.string = "";
        }
        else {
            //TODO
            if (this.WeekTotal)
                this.WeekTotal.string = Global.Toolkit.formatPointStr(data.week_total_send_point);
            if (this.WeekMyselfDir)
                this.WeekMyselfDir.string = Global.Toolkit.formatPointStr(data.week_self_send_point);
            if (this.WeekDir)
                this.WeekDir.string = Global.Toolkit.formatPointStr(data.week_unter_send_point);
            if (this.WeekOther)
                this.WeekOther.string = Global.Toolkit.formatPointStr(data.week_other_send_point);
        }
    };
    WndAwardDetail.prototype.recycle = function () {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    WndAwardDetail.prototype.onSubViewHide = function () {
        this.ResetData();
        Global.HallServer.offAllByCaller(this);
        Global.HallServer.off(NetEvent_1.NetAppface.GetSendRecord, this, this.InitTeamListView);
        Global.HallServer.off(NetEvent_1.NetAppface.GetCommiInfoList, this, this.InitTeamListView);
    };
    WndAwardDetail.prototype.ResetData = function () {
        this.totalPage = 0;
        this.page = 1;
    };
    WndAwardDetail.prototype.onDispose = function () {
        this.itemPool.resetPool();
    };
    return WndAwardDetail;
}(ViewBase_1.default));
exports.default = WndAwardDetail;
var AwardDetailItemPool = /** @class */ (function (_super) {
    __extends(AwardDetailItemPool, _super);
    function AwardDetailItemPool(copyNode) {
        var _this = _super.call(this) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    AwardDetailItemPool.prototype.createItem = function () {
        return cc.instantiate(this.copyNode);
    };
    AwardDetailItemPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    return AwardDetailItemPool;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXFduZEF3YXJkRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQUNqRCx3REFBbUQ7QUFFbkQsNERBQTZEO0FBQzdELHNEQUFpRDtBQUVqRDtJQUE0QyxrQ0FBUTtJQUFwRDtRQUFBLHFFQW1QQztRQTlPRyxjQUFRLEdBQVUsRUFBRSxDQUFDO1FBb0JyQixVQUFJLEdBQUcsQ0FBQyxDQUFBO1FBQ1IsV0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNULGVBQVMsR0FBRyxDQUFDLENBQUE7O0lBd05qQixDQUFDO0lBck5hLGlDQUFRLEdBQWxCO1FBQ0ksSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFJLFNBQVMsRUFBQztZQUN4RCxnQkFBZ0I7WUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEU7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFnQixNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQ2xELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1FBQ3RELElB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bVBuRDs7QUFDRDtJQUFrQyx1Q0FBUTtJQUN0Qyw2QkFBb0IsUUFBaUI7UUFBckMsWUFDSSxpQkFBTyxTQUNWO1FBRm1CLGNBQVEsR0FBUixRQUFRLENBQVM7O0lBRXJDLENBQUM7SUFFUyx3Q0FBVSxHQUFwQjtRQUNJLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVTLHVDQUFTLEdBQW5CLFVBQW9CLElBQWE7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0wsMEJBQUM7QUFBRCxDQWJBLEFBYUMsQ0FiaUMsa0JBQVEsR0FhekMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IFBvb2xCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3Rvb2wvUG9vbEJhc2VcIjtcclxuaW1wb3J0IFNwcmVhZE1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1NwcmVhZE1vZGVsXCI7XHJcbmltcG9ydCB7IE5ldEFwcGZhY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9uZXQvaGFsbC9OZXRFdmVudFwiO1xyXG5pbXBvcnQgV2FpdGluZ1ZpZXcgZnJvbSBcIi4uL3dhaXRpbmcvV2FpdGluZ1ZpZXdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZEF3YXJkRGV0YWlsIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgY29weUl0ZW06IGFueTtcclxuICAgIGNvbnRlbnROb2RlOiBhbnk7XHJcbiAgICBTcHJlYWRNb2RlbDogU3ByZWFkTW9kZWxcclxuICAgIGl0ZW1Qb29sOiBBd2FyZERldGFpbEl0ZW1Qb29sO1xyXG4gICAgbm9kZUxpc3Q6IGFueVtdID0gW107XHJcbiAgICBXZWVrVG90YWw6IGNjLkxhYmVsXHJcbiAgICBXZWVrTXlzZWxmRGlyOiBjYy5MYWJlbFxyXG4gICAgV2Vla0RpcjogY2MuTGFiZWxcclxuICAgIFdlZWtPdGhlcjogY2MuTGFiZWxcclxuICAgIFRvdGFsSW5mbzogY2MuTGFiZWxcclxuICAgIHBhZ2VJbmZvOiBjYy5MYWJlbFxyXG4gICAgTGFzdFBhZ2VCdG46IGNjLk5vZGVcclxuICAgIE5leHRQYWdlQnRuOiBjYy5Ob2RlXHJcbiAgICBub1RpcHM6IGNjLk5vZGVcclxuICAgIHRpdGxlTm9kZTogY2MuTm9kZVxyXG4gICAgYm90Tm9kZTogY2MuTm9kZVxyXG4gICAgY21taV90eXBlOiBudW1iZXJcclxuICAgIHRvcE5vZGU6IGNjLk5vZGVcclxuICAgIHByaXZhdGUgdG9wX3NlbGY6Y2MuTm9kZVxyXG4gICAgcHJpdmF0ZSB0b3Bfbm9ybWFsOmNjLk5vZGVcclxuXHJcbiAgICBwcml2YXRlIHRpdGxlX3NlbGY6Y2MuTm9kZVxyXG4gICAgcHJpdmF0ZSB0aXRsZV9ub3JtYWw6Y2MuTm9kZVxyXG5cclxuICAgIHBhZ2UgPSAxXHJcbiAgICBsaW1pdCA9IDdcclxuICAgIHRvdGFsUGFnZSA9IDBcclxuXHJcbiAgICBwcml2YXRlIHdhaXRpbmdOb2RlIDpjYy5Ob2RlO1xyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIGlmKHRoaXMud2FpdGluZ05vZGUgPT0gbnVsbHx8IHRoaXMud2FpdGluZ05vZGUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy92aWV3IOWGheeahGxvYWRpbmdcclxuICAgICAgICAgICAgdGhpcy53YWl0aW5nTm9kZSA9IFdhaXRpbmdWaWV3LmluaXRXYWl0aW5nVmlldyh0aGlzLm5vZGUsY2MudjIoMCwwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU3ByZWFkTW9kZWwgPSA8U3ByZWFkTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlNwcmVhZE1vZGVsXCIpO1xyXG4gICAgICAgIHRoaXMudG9wX25vcm1hbCA9IHRoaXMuZ2V0Q2hpbGQoXCJUb3BfTm9ybWFsXCIpXHJcbiAgICAgICAgdGhpcy50b3Bfc2VsZiA9IHRoaXMuZ2V0Q2hpbGQoXCJUb3BfU2VsZlwiKVxyXG4gICAgICAgIHRoaXMudGl0bGVfc2VsZiA9IHRoaXMuZ2V0Q2hpbGQoXCJWaWV3L1RpdGxlX1NlbGZcIilcclxuICAgICAgICB0aGlzLnRpdGxlX25vcm1hbCA9IHRoaXMuZ2V0Q2hpbGQoXCJWaWV3L1RpdGxlX05vcm1hbFwiKVxyXG4gICAgICAgIHRoaXMuY21taV90eXBlID0gdGhpcy5TcHJlYWRNb2RlbC5jb21taVR5cGVcclxuICAgICAgICB0aGlzLmNvcHlJdGVtID0gdGhpcy5nZXRDaGlsZChcIlZpZXcvc2Nyb2xsdmlldy9pdGVtXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLlNwcmVhZE1vZGVsLnNlbGZfcmF0ZSA+IDAgJiYgdGhpcy5jbW1pX3R5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5XZWVrTXlzZWxmRGlyID0gdGhpcy5nZXRDaGlsZChcIlRvcF9TZWxmL1dlZWtNeXNlbGZEaXIvQ291bnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgICAgICAvLyB0aGlzLnRvcF9zZWxmLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgLy8gdGhpcy50aXRsZV9zZWxmLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgLy8gdGhpcy50b3Bfbm9ybWFsLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIC8vIHRoaXMudGl0bGVfbm9ybWFsLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIC8vIHRoaXMudGl0bGVOb2RlID0gdGhpcy50aXRsZV9zZWxmXHJcbiAgICAgICAgICAgIC8vIHRoaXMudG9wTm9kZSA9IHRoaXMudG9wX3NlbGZcclxuICAgICAgICAgICAgLy8gdGhpcy5XZWVrVG90YWwgPSB0aGlzLmdldENoaWxkKFwiVG9wX1NlbGYvV2Vla1RvdGFsL0NvdW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICAgICAgLy8gdGhpcy5XZWVrRGlyID0gdGhpcy5nZXRDaGlsZChcIlRvcF9TZWxmL1dlZWtEaXIvQ291bnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgICAgICAvLyB0aGlzLldlZWtPdGhlciA9IHRoaXMuZ2V0Q2hpbGQoXCJUb3BfU2VsZi9XZWVrT3RoZXIvQ291bnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgICAgICAvLyB0aGlzLmNvcHlJdGVtID0gdGhpcy5nZXRDaGlsZChcIlZpZXcvc2Nyb2xsdmlldy9pdGVtX3NlbGZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5TcHJlYWRNb2RlbC5zZWxmX3JhdGUgPD0gMCAmJiB0aGlzLmNtbWlfdHlwZSA9PT0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMudG9wX3NlbGYuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgLy8gdGhpcy50aXRsZV9zZWxmLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIC8vIHRoaXMudG9wX25vcm1hbC5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIC8vIHRoaXMudGl0bGVOb2RlID0gdGhpcy50aXRsZV9ub3JtYWxcclxuICAgICAgICAgICAgLy8gdGhpcy50b3BOb2RlID0gdGhpcy50b3Bfbm9ybWFsXHJcbiAgICAgICAgICAgIC8vIHRoaXMudGl0bGVfbm9ybWFsLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgLy8gdGhpcy5XZWVrVG90YWwgPSB0aGlzLmdldENoaWxkKFwiVG9wX05vcm1hbC9XZWVrVG90YWwvQ291bnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgICAgICAvLyB0aGlzLldlZWtEaXIgPSB0aGlzLmdldENoaWxkKFwiVG9wX05vcm1hbC9XZWVrRGlyL0NvdW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICAgICAgLy8gdGhpcy5XZWVrT3RoZXIgPSB0aGlzLmdldENoaWxkKFwiVG9wX05vcm1hbC9XZWVrT3RoZXIvQ291bnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgICAgICAvLyB0aGlzLnRvcF9zZWxmLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIC8vIHRoaXMudGl0bGVfc2VsZi5hY3RpdmUgPSBmYWxzZSBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jbW1pX3R5cGUgPT0gMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGVOb2RlID0gdGhpcy5nZXRDaGlsZChcIlZpZXcvVGl0bGVcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5MYXN0UGFnZUJ0biA9IHRoaXMuZ2V0Q2hpbGQoXCJWaWV3L0JvdEJ0bi9MYXN0UGFnZVwiKVxyXG4gICAgICAgIHRoaXMuTmV4dFBhZ2VCdG4gPSB0aGlzLmdldENoaWxkKFwiVmlldy9Cb3RCdG4vTmV4dFBhZ2VcIilcclxuICAgICAgICB0aGlzLkxhc3RQYWdlQnRuLm9uKFwiY2xpY2tcIiwgdGhpcy5Pbkxhc3RQYWdlQnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuTmV4dFBhZ2VCdG4ub24oXCJjbGlja1wiLCB0aGlzLk9uTmV4dFBhZ2VQYWdlQnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY29udGVudE5vZGUgPSB0aGlzLmdldENoaWxkKFwiVmlldy9zY3JvbGx2aWV3L3ZpZXcvY29udGVudFwiKTtcclxuICAgICAgICB0aGlzLmNvcHlJdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuVG90YWxJbmZvID0gdGhpcy5nZXRDaGlsZChcIlZpZXcvQm90QnRuL1RvdGFsSW5mb0xhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICB0aGlzLnBhZ2VJbmZvID0gdGhpcy5nZXRDaGlsZChcIlZpZXcvQm90QnRuL1RvdGFsSW5mb0xhYmVsL1BhZ2VMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5ub1RpcHMgPSB0aGlzLmdldENoaWxkKFwiVmlldy9ub0xpc3RUaXBzU2tcIilcclxuICAgICAgICB0aGlzLm5vVGlwcy5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuYm90Tm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJWaWV3L0JvdEJ0blwiKVxyXG4gICAgICAgIHRoaXMuYm90Tm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuaW5pdEl0ZW1Qb29sKCk7XHJcbiAgICB9XHJcblxyXG4gICAgT25OZXh0UGFnZVBhZ2VCdG5DbGljaygpIHtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5wYWdlKytcclxuICAgICAgICBpZiAodGhpcy5wYWdlID4gdGhpcy50b3RhbFBhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlID0gdGhpcy50b3RhbFBhZ2VcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLmsqHmnInmm7TlpJrmlbDmja5cIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMud2FpdGluZ05vZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLndhaXRpbmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNtbWlfdHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgIC8vIHRoaXMuU3ByZWFkTW9kZWwuR2V0QXdhcmRSZWNvcmRJbmZvKHRoaXMucGFnZSwgdGhpcy5saW1pdClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY21taV90eXBlID09PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU3ByZWFkTW9kZWwuR2V0RGF5Rmxvd0luZm9MaXN0KHRoaXMucGFnZSwgdGhpcy5saW1pdClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBPbkxhc3RQYWdlQnRuQ2xpY2soKSB7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgICAgIHRoaXMucGFnZS0tXHJcbiAgICAgICAgaWYgKHRoaXMucGFnZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IDFcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlt7Lnu4/mmK/nrKzkuIDpobXkuoZcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMud2FpdGluZ05vZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLndhaXRpbmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNtbWlfdHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgLy8gIHRoaXMuU3ByZWFkTW9kZWwuR2V0QXdhcmRSZWNvcmRJbmZvKHRoaXMucGFnZSwgdGhpcy5saW1pdClcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY21taV90eXBlID09PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU3ByZWFkTW9kZWwuR2V0RGF5Rmxvd0luZm9MaXN0KHRoaXMucGFnZSwgdGhpcy5saW1pdClcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIHByaXZhdGUgaW5pdEl0ZW1Qb29sKCkge1xyXG5cclxuICAgICAgICB0aGlzLml0ZW1Qb29sID0gbmV3IEF3YXJkRGV0YWlsSXRlbVBvb2wodGhpcy5jb3B5SXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHVibGljIG9wZW4oYXJncz86YW55W10pXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgdGhpcy5vbk9wZW4oYXJncyk7XHJcbiAgICAvLyAgICAgLy90aGlzLmNhbGxBbGxWaWV3KFwib3BlblwiLCBhcmdzKTtcclxuICAgIC8vIH1cclxuICAgIG9uU3ViVmlld1Nob3coKSB7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIub24oTmV0QXBwZmFjZS5HZXRTZW5kUmVjb3JkLCB0aGlzLCB0aGlzLkluaXRUZWFtTGlzdFZpZXcpXHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIub24oTmV0QXBwZmFjZS5HZXREYXlGbG93SW5mb0xpc3QsIHRoaXMsIHRoaXMuSW5pdFRlYW1MaXN0VmlldylcclxuICAgICAgICBpZiAodGhpcy5jbW1pX3R5cGUgPT09IDEpIHtcclxuICAgICAgICAgIC8vICB0aGlzLlNwcmVhZE1vZGVsLkdldEF3YXJkUmVjb3JkSW5mbyh0aGlzLnBhZ2UsIHRoaXMubGltaXQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNtbWlfdHlwZSA9PT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLlNwcmVhZE1vZGVsLkdldERheUZsb3dJbmZvTGlzdCh0aGlzLnBhZ2UsIHRoaXMubGltaXQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgSW5pdFRlYW1MaXN0VmlldyhkYXRhKSB7XHJcbiAgICAgICAgaWYodGhpcy53YWl0aW5nTm9kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdGluZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRhID09IG51bGwgfHwgR2xvYmFsLlRvb2xraXQuaXNFbXB0eU9iamVjdChkYXRhKSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEudG90YWwgPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50b3BOb2RlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b3BOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMubm9UaXBzLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy50aXRsZU5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5ib3ROb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50b3BOb2RlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50b3BOb2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5ub1RpcHMuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy50aXRsZU5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLmJvdE5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5Jbml0VG9wVmlldyhkYXRhKVxyXG4gICAgICAgIGxldCBhcnI6IEFycmF5PGFueT47XHJcbiAgICAgICAgaWYgKHRoaXMuY21taV90eXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgLy8gYXJyID0gZGF0YS5kYXRhIHx8IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmNtbWlfdHlwZSA9PT0gMikge1xyXG4gICAgICAgICAgICBhcnIgPSBkYXRhLmxpc3QgfHwgW11cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvdW50ID0gYXJyLmxlbmd0aDtcclxuICAgICAgICB0aGlzLnRvdGFsUGFnZSA9IE1hdGguY2VpbChkYXRhLnRvdGFsIC8gZGF0YS5saW1pdClcclxuICAgICAgICB0aGlzLnJlY3ljbGUoKVxyXG4gICAgICAgIGxldCBtc2dGb3JtYXQgPSBcIuWFsSVz5p2hXCJcclxuICAgICAgICB0aGlzLlRvdGFsSW5mby5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIobXNnRm9ybWF0LCBkYXRhLnRvdGFsKTtcclxuICAgICAgICBsZXQgc3RyID0gXCLnrKwlc+mhtVwiXHJcbiAgICAgICAgdGhpcy5wYWdlSW5mby5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoc3RyLCBkYXRhLnBhZ2UpO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY291bnQ7IGorKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuaXRlbVBvb2wuZ2V0SXRlbSgpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGVMaXN0LnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLmNvbnRlbnROb2RlKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJBd2FyZERldGFpbEl0ZW1cIikuSW5pdChhcnJbal0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgSW5pdFRvcFZpZXcoZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuV2Vla1RvdGFsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5XZWVrVG90YWwuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICBpZiAodGhpcy5XZWVrTXlzZWxmRGlyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5XZWVrTXlzZWxmRGlyLnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgaWYgKHRoaXMuV2Vla0RpcilcclxuICAgICAgICAgICAgICAgIHRoaXMuV2Vla0Rpci5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIGlmICh0aGlzLldlZWtPdGhlcilcclxuICAgICAgICAgICAgICAgIHRoaXMuV2Vla090aGVyLnN0cmluZyA9IFwiXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vVE9ET1xyXG4gICAgICAgICAgICBpZiAodGhpcy5XZWVrVG90YWwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLldlZWtUb3RhbC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihkYXRhLndlZWtfdG90YWxfc2VuZF9wb2ludClcclxuICAgICAgICAgICAgaWYgKHRoaXMuV2Vla015c2VsZkRpcilcclxuICAgICAgICAgICAgICAgIHRoaXMuV2Vla015c2VsZkRpci5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihkYXRhLndlZWtfc2VsZl9zZW5kX3BvaW50KVxyXG4gICAgICAgICAgICBpZiAodGhpcy5XZWVrRGlyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5XZWVrRGlyLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKGRhdGEud2Vla191bnRlcl9zZW5kX3BvaW50KVxyXG4gICAgICAgICAgICBpZiAodGhpcy5XZWVrT3RoZXIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLldlZWtPdGhlci5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihkYXRhLndlZWtfb3RoZXJfc2VuZF9wb2ludClcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWN5Y2xlKCkge1xyXG4gICAgICAgIHRoaXMuaXRlbVBvb2wucmVjeWNsZUFsbCh0aGlzLm5vZGVMaXN0KTtcclxuICAgICAgICB0aGlzLm5vZGVMaXN0ID0gW107XHJcbiAgICB9XHJcbiAgICBvblN1YlZpZXdIaWRlKCkge1xyXG4gICAgICAgIHRoaXMuUmVzZXREYXRhKClcclxuXHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIub2ZmQWxsQnlDYWxsZXIodGhpcylcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5vZmYoTmV0QXBwZmFjZS5HZXRTZW5kUmVjb3JkLCB0aGlzLCB0aGlzLkluaXRUZWFtTGlzdFZpZXcpXHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIub2ZmKE5ldEFwcGZhY2UuR2V0Q29tbWlJbmZvTGlzdCwgdGhpcywgdGhpcy5Jbml0VGVhbUxpc3RWaWV3KVxyXG4gICAgfVxyXG4gICAgUmVzZXREYXRhKCkge1xyXG4gICAgICAgIHRoaXMudG90YWxQYWdlID0gMFxyXG4gICAgICAgIHRoaXMucGFnZSA9IDFcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuaXRlbVBvb2wucmVzZXRQb29sKClcclxuICAgIH1cclxuXHJcbn1cclxuY2xhc3MgQXdhcmREZXRhaWxJdGVtUG9vbCBleHRlbmRzIFBvb2xCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29weU5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjcmVhdGVJdGVtKCkge1xyXG4gICAgICAgIHJldHVybiBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvcHlOb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVzZXRJdGVtKG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIG5vZGUuc2V0UGFyZW50KG51bGwpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==