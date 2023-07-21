"use strict";
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