
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/WndMyGroup.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2593eMqo8pMOLFV8vRBi1PR', 'WndMyGroup');
// hall/scripts/logic/hall/ui/Spread/WndMyGroup.ts

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
var WndMyGroup = /** @class */ (function (_super) {
    __extends(WndMyGroup, _super);
    function WndMyGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeList = [];
        _this.page = 1;
        _this.limit = 4;
        _this.TotalPage = 0;
        return _this;
    }
    WndMyGroup.prototype.initView = function () {
        if (this.waitingNode == null || this.waitingNode == undefined) {
            //view 内的loading
            this.waitingNode = WaitingView_1.default.initWaitingView(this.node, cc.v2(0, 0));
        }
        this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
        this.LastPageBtn = this.getChild("View/BotBtn/LastPage");
        this.NextPageBtn = this.getChild("View/BotBtn/NextPage");
        this.LastPageBtn.on("click", this.OnLastPageBtnClick, this);
        this.NextPageBtn.on("click", this.OnNextPagePageBtnClick, this);
        this.addCommonClick("EditItem/SearchButton", this.OnSearchBtnClick, this);
        this.contentNode = this.getChild("View/scrollview/view/content");
        this.copyItem = this.getChild("View/scrollview/view/content/item");
        this.copyItem.active = false;
        this.cmmi_type = this.SpreadModel.commiType;
        this.TodayNew = this.getChild("TopRight/TodayAdd/Count").getComponent(cc.Label);
        this.DirDelegate = this.getChild("TopLeft/DirectPlayer/Count").getComponent(cc.Label);
        // if (this.cmmi_type == 1) {
        //     this.DirectPlayer = this.getChild("TopRight/DirectPlayer/Count").getComponent(cc.Label)
        // }
        this.GroupAmount = this.getChild("TopLeft/GroupCountTitle/GroupCount").getComponent(cc.Label);
        this.DelegateAmount = this.getChild("TopLeft/OtherPlayer/Count").getComponent(cc.Label);
        this.TotalInfoLabel = this.getChild("View/BotBtn/TotalInfoLabel").getComponent(cc.Label);
        this.PageLabel = this.getChild("View/BotBtn/TotalInfoLabel/PageLabel").getComponent(cc.Label);
        this.editBox = this.getChild("EditItem/SearchEditBox").getComponent(cc.EditBox);
        this.initItemPool();
    };
    WndMyGroup.prototype.OnNextPagePageBtnClick = function () {
        Global.Audio.playBtnSound();
        this.page++;
        if (this.page > this.TotalPage) {
            this.page = this.TotalPage;
            Global.UI.fastTip("没有更多数据");
            return;
        }
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        // if (this.cmmi_type == 1) {
        //     this.SpreadModel.ReqGetSelfTeam(this.page, this.limit)
        // }
        else if (this.cmmi_type == 2) {
            this.SpreadModel.GetDayAgentTeamInfo(0, this.page, this.limit);
        }
    };
    WndMyGroup.prototype.OnLastPageBtnClick = function () {
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
        // if (this.cmmi_type == 1) {
        //     this.SpreadModel.ReqGetSelfTeam(this.page, this.limit)
        // }
        else if (this.cmmi_type == 2) {
            this.SpreadModel.GetDayAgentTeamInfo(0, this.page, this.limit);
        }
    };
    WndMyGroup.prototype.OnSearchBtnClick = function () {
        this.CheckEmptyFunc(this.editBox.string);
    };
    WndMyGroup.prototype.CheckEmptyFunc = function (str) {
        if (!this.checkTextEmptyAndShowTips(str, "ID不能为空"))
            return;
        // if (this.cmmi_type == 1) {
        //     this.SpreadModel.ReqSearchSelfTeam(Number(str))
        // }
        else if (this.cmmi_type == 2) {
            this.SpreadModel.SeachSelfTeamUser(Number(str));
        }
    };
    WndMyGroup.prototype.checkTextEmptyAndShowTips = function (text, tipsLabel) {
        if (text.length <= 0) {
            Global.UI.fastTip(tipsLabel);
            return false;
        }
        return true;
    };
    WndMyGroup.prototype.initItemPool = function () {
        this.itemPool = new GroupItemPool(this.copyItem);
    };
    WndMyGroup.prototype.onSubViewShow = function () {
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        Global.HallServer.on(NetEvent_1.NetAppface.SeachSelfTeam, this, this.OnQueryTeamUser);
        Global.HallServer.on(NetEvent_1.NetAppface.SeachSelfTeamUser, this, this.OnQueryTeamUser);
        Global.HallServer.on(NetEvent_1.NetAppface.GetSelfTeam, this, this.InitTeamListView);
        Global.HallServer.on(NetEvent_1.NetAppface.GetDayAgentTeamInfo, this, this.InitTeamListView);
        if (this.cmmi_type == 1) {
            //   this.SpreadModel.ReqGetSelfTeam(this.page, this.limit)
        }
        else if (this.cmmi_type == 2) {
            this.SpreadModel.GetDayAgentTeamInfo(0, this.page, this.limit);
        }
    };
    WndMyGroup.prototype.OnQueryTeamUser = function (data) {
        Global.UI.show("WndLowerSearch", data);
    };
    WndMyGroup.prototype.InitTeamListView = function (data) {
        if (this.waitingNode) {
            this.waitingNode.active = false;
        }
        if (data == null) {
            return;
        }
        // if (this.cmmi_type == 1) {
        //     this.InitTopView(data)
        // }
        else if (this.cmmi_type == 2) {
            this.InitTopViewCommi(data);
        }
        var arr = data.data || [];
        var count = arr.length;
        this.recycle();
        for (var j = 0; j < count; j++) {
            var node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            node.setParent(this.contentNode);
            node.getComponent("GroupItem").Init(arr[j], j);
        }
        var msgFormat = "共%s条";
        this.TotalInfoLabel.string = cc.js.formatStr(msgFormat, data.total);
        var str = "第%s页";
        this.PageLabel.string = cc.js.formatStr(str, data.page);
        this.TotalPage = Math.ceil(data.total / data.limit);
    };
    WndMyGroup.prototype.InitTopView = function (data) {
        if (data == null) {
            this.DirDelegate.string = "";
            this.GroupAmount.string = "";
            this.DelegateAmount.string = "";
            if (this.TodayNew)
                this.TodayNew.string = "";
            if (this.DirectPlayer)
                this.DirectPlayer.string = "";
        }
        else {
            this.DirDelegate.string = data.unter_num;
            this.GroupAmount.string = data.team_num;
            this.DelegateAmount.string = data.other_num;
            if (this.TodayNew)
                this.TodayNew.string = data.new_unter_num;
            if (this.DirectPlayer)
                this.DirectPlayer.string = data.new_other_num;
        }
    };
    WndMyGroup.prototype.InitTopViewCommi = function (data) {
        if (data == null) {
            this.DirDelegate.string = "";
            this.GroupAmount.string = "";
            this.DelegateAmount.string = "";
            this.TodayNew.string = "";
        }
        else {
            this.DirDelegate.string = data.unter_user_num;
            this.GroupAmount.string = data.all_user_num;
            this.DelegateAmount.string = data.team_user_num;
            this.TodayNew.string = Global.Toolkit.formatPointStr(data.total_flow, true);
        }
    };
    WndMyGroup.prototype.onSubViewHide = function () {
        Global.HallServer.offAllByCaller(this);
        //Global.HallServer.off(NetAppface.QueryTeamUser,this,this.OnQueryTeamUser)
        this.ResetData();
    };
    WndMyGroup.prototype.ResetData = function () {
        this.page = 1;
        this.TotalPage = 0;
        this.editBox.string = "";
    };
    WndMyGroup.prototype.onDispose = function () {
        this.itemPool.resetPool();
    };
    WndMyGroup.prototype.recycle = function () {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    return WndMyGroup;
}(ViewBase_1.default));
exports.default = WndMyGroup;
var GroupItemPool = /** @class */ (function (_super) {
    __extends(GroupItemPool, _super);
    function GroupItemPool(copyNode) {
        var _this = _super.call(this) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    GroupItemPool.prototype.createItem = function () {
        return cc.instantiate(this.copyNode);
    };
    GroupItemPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    GroupItemPool.prototype.recycleAll = function (arr) {
        var _this = this;
        _super.prototype.recycleAll.call(this, arr);
        arr.forEach(function (ele) {
            _this.resetItem(ele);
        });
    };
    return GroupItemPool;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXFduZE15R3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWlEO0FBQ2pELHdEQUFtRDtBQUVuRCw0REFBNkQ7QUFDN0Qsc0RBQWlEO0FBRWpEO0lBQXdDLDhCQUFRO0lBQWhEO1FBQUEscUVBZ1BDO1FBM09HLGNBQVEsR0FBVSxFQUFFLENBQUM7UUFrQnJCLFVBQUksR0FBRyxDQUFDLENBQUE7UUFDUixXQUFLLEdBQUcsQ0FBQyxDQUFBO1FBQ1QsZUFBUyxHQUFHLENBQUMsQ0FBQTs7SUF1TmpCLENBQUM7SUFwTmEsNkJBQVEsR0FBbEI7UUFDSSxJQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFHLElBQUksQ0FBQyxXQUFXLElBQUksU0FBUyxFQUFDO1lBQ3hELGdCQUFnQjtZQUNoQixJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4RTtRQUNELElBQUksQ0FBQyxXQUFXLEdBQWdCLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO1FBQ3hELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO1FBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUks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QUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUwsaUJBQUM7QUFBRCxDQWhQQSxBQWdQQyxDQWhQdUMsa0JBQVEsR0FnUC9DOztBQUNEO0lBQTRCLGlDQUFRO0lBQ2hDLHVCQUFvQixRQUFpQjtRQUFyQyxZQUNJLGlCQUFPLFNBQ1Y7UUFGbUIsY0FBUSxHQUFSLFFBQVEsQ0FBUzs7SUFFckMsQ0FBQztJQUVTLGtDQUFVLEdBQXBCO1FBQ0ksT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRVMsaUNBQVMsR0FBbkIsVUFBb0IsSUFBYTtRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFDTSxrQ0FBVSxHQUFqQixVQUFrQixHQUFlO1FBQWpDLGlCQU1DO1FBTEcsaUJBQU0sVUFBVSxZQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3JCLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ1gsS0FBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFTCxvQkFBQztBQUFELENBckJBLEFBcUJDLENBckIyQixrQkFBUSxHQXFCbkMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IFBvb2xCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3Rvb2wvUG9vbEJhc2VcIjtcclxuaW1wb3J0IFNwcmVhZE1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1NwcmVhZE1vZGVsXCI7XHJcbmltcG9ydCB7IE5ldEFwcGZhY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9uZXQvaGFsbC9OZXRFdmVudFwiO1xyXG5pbXBvcnQgV2FpdGluZ1ZpZXcgZnJvbSBcIi4uL3dhaXRpbmcvV2FpdGluZ1ZpZXdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZE15R3JvdXAgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICBjb3B5SXRlbTogYW55O1xyXG4gICAgY29udGVudE5vZGU6IGFueTtcclxuICAgIFNwcmVhZE1vZGVsOiBTcHJlYWRNb2RlbFxyXG4gICAgaXRlbVBvb2w6IEdyb3VwSXRlbVBvb2w7XHJcbiAgICBub2RlTGlzdDogYW55W10gPSBbXTtcclxuICAgIC8qKuebtOWxnueOqeWutiAqL1xyXG4gICAgRGlyRGVsZWdhdGU6IGNjLkxhYmVsXHJcbiAgICAvKirlm6LpmJ/miJDlkZggKi9cclxuICAgIEdyb3VwQW1vdW50OiBjYy5MYWJlbFxyXG4gICAgLyoq5YW25LuW546p5a62ICovXHJcbiAgICBEZWxlZ2F0ZUFtb3VudDogY2MuTGFiZWxcclxuICAgIC8qKuacrOaXpeaAu+S4mue7qSAqL1xyXG4gICAgVG9kYXlOZXc6IGNjLkxhYmVsXHJcbiAgICAvKirmlrDlop7lhbbku5bnjqnlrrYgKi9cclxuICAgIERpcmVjdFBsYXllcjogY2MuTGFiZWxcclxuICAgIFRvdGFsSW5mb0xhYmVsOiBjYy5MYWJlbFxyXG4gICAgUGFnZUxhYmVsOiBjYy5MYWJlbFxyXG4gICAgZWRpdEJveDogY2MuRWRpdEJveFxyXG4gICAgTGFzdFBhZ2VCdG46IGNjLk5vZGVcclxuICAgIE5leHRQYWdlQnRuOiBjYy5Ob2RlXHJcbiAgICBjbW1pX3R5cGU7XHJcblxyXG4gICAgcGFnZSA9IDFcclxuICAgIGxpbWl0ID0gNFxyXG4gICAgVG90YWxQYWdlID0gMFxyXG5cclxuICAgIHByaXZhdGUgd2FpdGluZ05vZGUgOmNjLk5vZGU7XHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgaWYodGhpcy53YWl0aW5nTm9kZSA9PSBudWxsfHwgdGhpcy53YWl0aW5nTm9kZSA9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAvL3ZpZXcg5YaF55qEbG9hZGluZ1xyXG4gICAgICAgICAgICB0aGlzLndhaXRpbmdOb2RlID0gV2FpdGluZ1ZpZXcuaW5pdFdhaXRpbmdWaWV3KHRoaXMubm9kZSxjYy52MigwLDApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TcHJlYWRNb2RlbCA9IDxTcHJlYWRNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiU3ByZWFkTW9kZWxcIik7XHJcbiAgICAgICAgdGhpcy5MYXN0UGFnZUJ0biA9IHRoaXMuZ2V0Q2hpbGQoXCJWaWV3L0JvdEJ0bi9MYXN0UGFnZVwiKVxyXG4gICAgICAgIHRoaXMuTmV4dFBhZ2VCdG4gPSB0aGlzLmdldENoaWxkKFwiVmlldy9Cb3RCdG4vTmV4dFBhZ2VcIilcclxuICAgICAgICB0aGlzLkxhc3RQYWdlQnRuLm9uKFwiY2xpY2tcIiwgdGhpcy5Pbkxhc3RQYWdlQnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuTmV4dFBhZ2VCdG4ub24oXCJjbGlja1wiLCB0aGlzLk9uTmV4dFBhZ2VQYWdlQnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJFZGl0SXRlbS9TZWFyY2hCdXR0b25cIiwgdGhpcy5PblNlYXJjaEJ0bkNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNvbnRlbnROb2RlID0gdGhpcy5nZXRDaGlsZChcIlZpZXcvc2Nyb2xsdmlldy92aWV3L2NvbnRlbnRcIik7XHJcbiAgICAgICAgdGhpcy5jb3B5SXRlbSA9IHRoaXMuZ2V0Q2hpbGQoXCJWaWV3L3Njcm9sbHZpZXcvdmlldy9jb250ZW50L2l0ZW1cIik7XHJcbiAgICAgICAgdGhpcy5jb3B5SXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNtbWlfdHlwZSA9IHRoaXMuU3ByZWFkTW9kZWwuY29tbWlUeXBlXHJcbiAgICAgICAgdGhpcy5Ub2RheU5ldyA9IHRoaXMuZ2V0Q2hpbGQoXCJUb3BSaWdodC9Ub2RheUFkZC9Db3VudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcblxyXG4gICAgICAgIHRoaXMuRGlyRGVsZWdhdGUgPSB0aGlzLmdldENoaWxkKFwiVG9wTGVmdC9EaXJlY3RQbGF5ZXIvQ291bnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIC8vIGlmICh0aGlzLmNtbWlfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuRGlyZWN0UGxheWVyID0gdGhpcy5nZXRDaGlsZChcIlRvcFJpZ2h0L0RpcmVjdFBsYXllci9Db3VudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuR3JvdXBBbW91bnQgPSB0aGlzLmdldENoaWxkKFwiVG9wTGVmdC9Hcm91cENvdW50VGl0bGUvR3JvdXBDb3VudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5EZWxlZ2F0ZUFtb3VudCA9IHRoaXMuZ2V0Q2hpbGQoXCJUb3BMZWZ0L090aGVyUGxheWVyL0NvdW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuXHJcbiAgICAgICAgdGhpcy5Ub3RhbEluZm9MYWJlbCA9IHRoaXMuZ2V0Q2hpbGQoXCJWaWV3L0JvdEJ0bi9Ub3RhbEluZm9MYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5QYWdlTGFiZWwgPSB0aGlzLmdldENoaWxkKFwiVmlldy9Cb3RCdG4vVG90YWxJbmZvTGFiZWwvUGFnZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICB0aGlzLmVkaXRCb3ggPSB0aGlzLmdldENoaWxkKFwiRWRpdEl0ZW0vU2VhcmNoRWRpdEJveFwiKS5nZXRDb21wb25lbnQoY2MuRWRpdEJveClcclxuICAgICAgICB0aGlzLmluaXRJdGVtUG9vbCgpO1xyXG4gICAgfVxyXG4gICAgT25OZXh0UGFnZVBhZ2VCdG5DbGljaygpIHtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5wYWdlKytcclxuICAgICAgICBpZiAodGhpcy5wYWdlID4gdGhpcy5Ub3RhbFBhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlID0gdGhpcy5Ub3RhbFBhZ2VcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLmsqHmnInmm7TlpJrmlbDmja5cIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMud2FpdGluZ05vZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLndhaXRpbmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmICh0aGlzLmNtbWlfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuU3ByZWFkTW9kZWwuUmVxR2V0U2VsZlRlYW0odGhpcy5wYWdlLCB0aGlzLmxpbWl0KVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmNtbWlfdHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU3ByZWFkTW9kZWwuR2V0RGF5QWdlbnRUZWFtSW5mbygwLCB0aGlzLnBhZ2UsIHRoaXMubGltaXQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBPbkxhc3RQYWdlQnRuQ2xpY2soKSB7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgICAgIHRoaXMucGFnZS0tXHJcbiAgICAgICAgaWYgKHRoaXMucGFnZSA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZSA9IDFcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlt7Lnu4/mmK/nrKzkuIDpobXkuoZcIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMud2FpdGluZ05vZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLndhaXRpbmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmICh0aGlzLmNtbWlfdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuU3ByZWFkTW9kZWwuUmVxR2V0U2VsZlRlYW0odGhpcy5wYWdlLCB0aGlzLmxpbWl0KVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmNtbWlfdHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU3ByZWFkTW9kZWwuR2V0RGF5QWdlbnRUZWFtSW5mbygwLCB0aGlzLnBhZ2UsIHRoaXMubGltaXQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBPblNlYXJjaEJ0bkNsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuQ2hlY2tFbXB0eUZ1bmModGhpcy5lZGl0Qm94LnN0cmluZylcclxuICAgIH1cclxuXHJcblxyXG4gICAgQ2hlY2tFbXB0eUZ1bmMoc3RyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrVGV4dEVtcHR5QW5kU2hvd1RpcHMoc3RyLCBcIklE5LiN6IO95Li656m6XCIpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuY21taV90eXBlID09IDEpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5TcHJlYWRNb2RlbC5SZXFTZWFyY2hTZWxmVGVhbShOdW1iZXIoc3RyKSlcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5jbW1pX3R5cGUgPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLlNwcmVhZE1vZGVsLlNlYWNoU2VsZlRlYW1Vc2VyKE51bWJlcihzdHIpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrVGV4dEVtcHR5QW5kU2hvd1RpcHModGV4dDogc3RyaW5nLCB0aXBzTGFiZWw6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0ZXh0Lmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKHRpcHNMYWJlbCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGluaXRJdGVtUG9vbCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5pdGVtUG9vbCA9IG5ldyBHcm91cEl0ZW1Qb29sKHRoaXMuY29weUl0ZW0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgb25TdWJWaWV3U2hvdygpIHtcclxuICAgICAgICBpZih0aGlzLndhaXRpbmdOb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy53YWl0aW5nTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5vbihOZXRBcHBmYWNlLlNlYWNoU2VsZlRlYW0sIHRoaXMsIHRoaXMuT25RdWVyeVRlYW1Vc2VyKVxyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLm9uKE5ldEFwcGZhY2UuU2VhY2hTZWxmVGVhbVVzZXIsIHRoaXMsIHRoaXMuT25RdWVyeVRlYW1Vc2VyKVxyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLm9uKE5ldEFwcGZhY2UuR2V0U2VsZlRlYW0sIHRoaXMsIHRoaXMuSW5pdFRlYW1MaXN0VmlldylcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5vbihOZXRBcHBmYWNlLkdldERheUFnZW50VGVhbUluZm8sIHRoaXMsIHRoaXMuSW5pdFRlYW1MaXN0VmlldylcclxuICAgICAgICBpZiAodGhpcy5jbW1pX3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAvLyAgIHRoaXMuU3ByZWFkTW9kZWwuUmVxR2V0U2VsZlRlYW0odGhpcy5wYWdlLCB0aGlzLmxpbWl0KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0aGlzLmNtbWlfdHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU3ByZWFkTW9kZWwuR2V0RGF5QWdlbnRUZWFtSW5mbygwLCB0aGlzLnBhZ2UsIHRoaXMubGltaXQpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIE9uUXVlcnlUZWFtVXNlcihkYXRhKSB7XHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRMb3dlclNlYXJjaFwiLCBkYXRhKVxyXG5cclxuICAgIH1cclxuICAgIEluaXRUZWFtTGlzdFZpZXcoZGF0YSkge1xyXG4gICAgICAgIGlmKHRoaXMud2FpdGluZ05vZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLndhaXRpbmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiAodGhpcy5jbW1pX3R5cGUgPT0gMSkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLkluaXRUb3BWaWV3KGRhdGEpXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY21taV90eXBlID09IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5Jbml0VG9wVmlld0NvbW1pKGRhdGEpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYXJyOiBBcnJheTxhbnk+ID0gZGF0YS5kYXRhIHx8IFtdO1xyXG4gICAgICAgIGxldCBjb3VudCA9IGFyci5sZW5ndGg7XHJcblxyXG4gICAgICAgIHRoaXMucmVjeWNsZSgpXHJcblxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY291bnQ7IGorKykge1xyXG5cclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLml0ZW1Qb29sLmdldEl0ZW0oKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlTGlzdC5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLmNvbnRlbnROb2RlKTtcclxuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJHcm91cEl0ZW1cIikuSW5pdChhcnJbal0sIGopXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtc2dGb3JtYXQgPSBcIuWFsSVz5p2hXCJcclxuICAgICAgICB0aGlzLlRvdGFsSW5mb0xhYmVsLnN0cmluZyA9IGNjLmpzLmZvcm1hdFN0cihtc2dGb3JtYXQsIGRhdGEudG90YWwpO1xyXG4gICAgICAgIGxldCBzdHIgPSBcIuesrCVz6aG1XCJcclxuICAgICAgICB0aGlzLlBhZ2VMYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoc3RyLCBkYXRhLnBhZ2UpO1xyXG4gICAgICAgIHRoaXMuVG90YWxQYWdlID0gTWF0aC5jZWlsKGRhdGEudG90YWwgLyBkYXRhLmxpbWl0KVxyXG4gICAgfVxyXG4gICAgSW5pdFRvcFZpZXcoZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5EaXJEZWxlZ2F0ZS5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIHRoaXMuR3JvdXBBbW91bnQuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICB0aGlzLkRlbGVnYXRlQW1vdW50LnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgaWYgKHRoaXMuVG9kYXlOZXcpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlRvZGF5TmV3LnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgaWYgKHRoaXMuRGlyZWN0UGxheWVyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5EaXJlY3RQbGF5ZXIuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5EaXJEZWxlZ2F0ZS5zdHJpbmcgPSBkYXRhLnVudGVyX251bVxyXG4gICAgICAgICAgICB0aGlzLkdyb3VwQW1vdW50LnN0cmluZyA9IGRhdGEudGVhbV9udW1cclxuICAgICAgICAgICAgdGhpcy5EZWxlZ2F0ZUFtb3VudC5zdHJpbmcgPSBkYXRhLm90aGVyX251bVxyXG4gICAgICAgICAgICBpZiAodGhpcy5Ub2RheU5ldylcclxuICAgICAgICAgICAgICAgIHRoaXMuVG9kYXlOZXcuc3RyaW5nID0gZGF0YS5uZXdfdW50ZXJfbnVtXHJcbiAgICAgICAgICAgIGlmICh0aGlzLkRpcmVjdFBsYXllcilcclxuICAgICAgICAgICAgICAgIHRoaXMuRGlyZWN0UGxheWVyLnN0cmluZyA9IGRhdGEubmV3X290aGVyX251bVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBJbml0VG9wVmlld0NvbW1pKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuRGlyRGVsZWdhdGUuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICB0aGlzLkdyb3VwQW1vdW50LnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgdGhpcy5EZWxlZ2F0ZUFtb3VudC5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIHRoaXMuVG9kYXlOZXcuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5EaXJEZWxlZ2F0ZS5zdHJpbmcgPSBkYXRhLnVudGVyX3VzZXJfbnVtXHJcbiAgICAgICAgICAgIHRoaXMuR3JvdXBBbW91bnQuc3RyaW5nID0gZGF0YS5hbGxfdXNlcl9udW1cclxuICAgICAgICAgICAgdGhpcy5EZWxlZ2F0ZUFtb3VudC5zdHJpbmcgPSBkYXRhLnRlYW1fdXNlcl9udW1cclxuICAgICAgICAgICAgdGhpcy5Ub2RheU5ldy5zdHJpbmcgPSAgR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoZGF0YS50b3RhbF9mbG93LCB0cnVlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblN1YlZpZXdIaWRlKCkge1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLm9mZkFsbEJ5Q2FsbGVyKHRoaXMpXHJcbiAgICAgICAgLy9HbG9iYWwuSGFsbFNlcnZlci5vZmYoTmV0QXBwZmFjZS5RdWVyeVRlYW1Vc2VyLHRoaXMsdGhpcy5PblF1ZXJ5VGVhbVVzZXIpXHJcbiAgICAgICAgdGhpcy5SZXNldERhdGEoKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZXNldERhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gMVxyXG4gICAgICAgIHRoaXMuVG90YWxQYWdlID0gMFxyXG4gICAgICAgIHRoaXMuZWRpdEJveC5zdHJpbmcgPSBcIlwiXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKCkge1xyXG4gICAgICAgIHRoaXMuaXRlbVBvb2wucmVzZXRQb29sKClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjeWNsZSgpIHtcclxuICAgICAgICB0aGlzLml0ZW1Qb29sLnJlY3ljbGVBbGwodGhpcy5ub2RlTGlzdCk7XHJcbiAgICAgICAgdGhpcy5ub2RlTGlzdCA9IFtdO1xyXG4gICAgfVxyXG5cclxufVxyXG5jbGFzcyBHcm91cEl0ZW1Qb29sIGV4dGVuZHMgUG9vbEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3B5Tm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUl0ZW0oKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLmluc3RhbnRpYXRlKHRoaXMuY29weU5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCByZXNldEl0ZW0obm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbm9kZS5zZXRQYXJlbnQobnVsbClcclxuICAgIH1cclxuICAgIHB1YmxpYyByZWN5Y2xlQWxsKGFycjogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIHN1cGVyLnJlY3ljbGVBbGwoYXJyKVxyXG4gICAgICAgIGFyci5mb3JFYWNoKGVsZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRJdGVtKGVsZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=