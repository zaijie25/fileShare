
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/rank/WndRank.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dd9dfHaikJGa5LQSfJDQRU3', 'WndRank');
// hall/scripts/logic/hall/ui/rank/WndRank.ts

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
var RankModel_1 = require("../../../hallcommon/model/RankModel");
var WaitingView_1 = require("../waiting/WaitingView");
var WndRank = /** @class */ (function (_super) {
    __extends(WndRank, _super);
    function WndRank() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeList = [];
        _this.curWin = 0; //0日 1周
        // SpFrameurl = "hall/texture/rank/rankAtlas"
        // SpDayWeek = ["jryl_1","jryl_2","bzyl_1","bzyl_2","jrylb_1", "jrylb_2", "bzyjb_1", "bzyjb_2"]
        _this.DayWeek = ["今日盈利榜", "本周盈利榜", "今日盈利榜", "本周佣金榜"];
        return _this;
    }
    WndRank.prototype.onOpen = function () {
        this.RankModel.on(RankModel_1.default.RefreshScrollview, this, this.RefreshScrollView);
        this.RankModel.on(RankModel_1.default.UpdateRankData, this, this.UpdataListData);
        this.setToggleChecked(this.dayRank, true);
        this.setToggleChecked(this.weekRank, false);
        this.changeInfoNode(null);
    };
    WndRank.prototype.afterOpen = function () {
    };
    WndRank.prototype.onInit = function () {
        this.isNeedDelay = true;
        this.name = "WndRank";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/RankUI";
        this.RankModel = Global.ModelManager.getModel("RankModel");
    };
    WndRank.prototype.initView = function () {
        var _this = this;
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        // this.dayRank = this.getChild("PanelNode/RankPanel/TopTitle/topButton/dayRank");
        // this.weekRank = this.getChild("PanelNode/RankPanel/TopTitle/topButton/weekRank");
        this.dayRank = this.getChild("leftPanel/dayRank");
        this.weekRank = this.getChild("leftPanel/weekRank");
        this.dayRank.on("click", this.changeInfoNode, this);
        this.weekRank.on("click", this.changeInfoNode2, this);
        this.addCommonClick("close", this.close, this);
        this.RankScrollView = this.getComponent("rightPanel/scrollview", cc.ScrollView);
        this.copyItem = this.getChild("rightPanel/scrollview/view/content/Item");
        this.copyItem.active = false;
        var tmpSelfLbID = this.getChild("SelfInfo/LeftNode/IdLab");
        this.selfLabelID = tmpSelfLbID.getComponent(cc.Label);
        var tmpSelfLbName = this.getChild("SelfInfo/LeftNode/NameLab");
        this.selfLabelName = tmpSelfLbName.getComponent(cc.Label);
        var tmpContent = this.getChild("SelfInfo/RightNode/CoinLabel");
        this.selfLabelCount = tmpContent.getComponent(cc.Label);
        // this.fontSprite = this.getChild("SelfInfo/RightNode/Font").getComponent(cc.Sprite);
        // this.fontSprite.node.active = false
        var tmpRankLab = this.getChild("SelfInfo/LeftNode/RankBg/RankLabel");
        this.selfRankLab = tmpRankLab.getComponent(cc.Label);
        this.notInListNode = this.getChild("SelfInfo/LeftNode/RankBg/notInList");
        this.notInListNode.active = false;
        var tmpRankSp = this.getChild("SelfInfo/LeftNode/RankBg");
        this.selfRankSprite = tmpRankSp.getComponent(cc.Sprite);
        // this.CommissionUn = this.getComponent("PanelNode/RankPanel/TopTitle/topButton/dayRank/unchecked/unchecked", cc.Sprite)
        // this.CommissionCh = this.getComponent("PanelNode/RankPanel/TopTitle/topButton/dayRank/check/unchecked", cc.Sprite)
        // this.CommissionUn1 = this.getComponent("PanelNode/RankPanel/TopTitle/topButton/weekRank/unchecked/unchecked", cc.Sprite)
        // this.CommissionCh1 = this.getComponent("PanelNode/RankPanel/TopTitle/topButton/weekRank/check/unchecked", cc.Sprite)
        this.CommissionUn = this.getComponent("leftPanel/dayRank/unchecked/label", cc.Label);
        this.CommissionCh = this.getComponent("leftPanel/dayRank/check/label", cc.Label);
        this.CommissionUn1 = this.getComponent("leftPanel/weekRank/unchecked/label", cc.Label);
        this.CommissionCh1 = this.getComponent("leftPanel/weekRank/check/label", cc.Label);
        this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
        this.RankScrollView.node.on("scroll-to-bottom", function () {
            if (_this.waitingNode && _this.listView.allDatas && _this.listView.allDatas.length < 100) {
                _this.waitingNode.active = true;
            }
            _this.reqNewData();
        }, this);
        var rank_type = this.SpreadModel.RankType;
        if (rank_type == 1) {
            // Global.ResourceManager.loadAutoAtlas(this.CommissionUn, this.SpFrameurl, this.SpDayWeek[2],null,false)
            // Global.ResourceManager.loadAutoAtlas(this.CommissionCh, this.SpFrameurl, this.SpDayWeek[3],null,false)
            // Global.ResourceManager.loadAutoAtlas(this.CommissionUn1, this.SpFrameurl, this.SpDayWeek[0],null,false)
            // Global.ResourceManager.loadAutoAtlas(this.CommissionCh1, this.SpFrameurl, this.SpDayWeek[1],null,false)
            //暂时屏蔽 @parker
            //this.CommissionUn.string = this.DayWeek[1];
            //this.CommissionCh.string = this.DayWeek[1];
            //this.CommissionUn1.string = this.DayWeek[0];
            //this.CommissionCh1.string = this.DayWeek[0];
        }
        else if (rank_type == 2) {
            // Global.ResourceManager.loadAutoAtlas(this.CommissionUn, this.SpFrameurl, this.SpDayWeek[6],null,false)
            // Global.ResourceManager.loadAutoAtlas(this.CommissionCh, this.SpFrameurl, this.SpDayWeek[7],null,false)
            // Global.ResourceManager.loadAutoAtlas(this.CommissionUn1, this.SpFrameurl, this.SpDayWeek[4],null,false)
            // Global.ResourceManager.loadAutoAtlas(this.CommissionCh1, this.SpFrameurl, this.SpDayWeek[5],null,false)
            //暂时屏蔽 @parker
            // this.CommissionUn.string = this.DayWeek[3];
            // this.CommissionCh.string = this.DayWeek[3];
            // this.CommissionUn1.string = this.DayWeek[2];
            // this.CommissionCh1.string = this.DayWeek[2];
        }
        this.selfheadImg = this.getChild("SelfInfo/LeftNode/headImg");
        this.InitScrollViewObj();
        if (this.waitingNode == null || this.waitingNode == undefined) {
            //view 内的loading
            this.waitingNode = WaitingView_1.default.initWaitingView(this.node, cc.v2(0, 0));
        }
    };
    WndRank.prototype.reqNewData = function () {
        var rankType = this.SpreadModel.RankType;
        if (rankType == 1) {
            if (this.curWin == 0) {
                this.RankModel.reqRankInfo(3, true);
                return;
            }
            this.RankModel.reqRankInfo(1, true);
        }
        else if (rankType == 2) {
            if (this.curWin == 0) {
                this.RankModel.reqRankInfo(6, true);
                return;
            }
            this.RankModel.reqRankInfo(1, true);
        }
    };
    WndRank.prototype.InitScrollViewObj = function () {
        var _this = this;
        var item_setter = function (item, index) {
            var data = _this.listView.allDatas[index];
            item.getComponent("RankItem").Init(data);
        };
        this.listView = Global.UIHelper.addScrollViewCarmackComp(this.RankScrollView.node, this.copyItem, 15, 0, this, item_setter);
    };
    WndRank.prototype.initSelfPanel = function (rank, profit) {
        if (Number(Global.PlayerData.headimg)) {
            var headSprite = this.selfheadImg.getComponent(cc.Sprite);
            var tempFrame = Global.Toolkit.getLocalHeadSf(Global.PlayerData.headimg);
            headSprite.spriteFrame = tempFrame;
        }
        else {
            Global.Toolkit.loadWebPic(this.selfheadImg, Global.PlayerData.headimg);
        }
        this.selfLabelID.string = Global.PlayerData.uid.toString();
        this.selfLabelName.string = Global.Toolkit.substrEndWithElli(Global.PlayerData.nickname, 8);
        this.selfLabelCount.string = Global.Toolkit.GetText(profit);
        this.selfRankLab.node.active = false;
        var atlasPath = "hall/texture/rank/rankAtlas";
        if (rank == null || rank == undefined || rank > 100 || rank == 0) {
            this.selfRankSprite.spriteFrame = null;
            this.selfRankLab.node.active = false;
            //显示未上榜
            this.notInListNode.active = true;
            return;
        }
        if (rank && rank > 3) {
            if (Global.Setting.SkinConfig.isPurple)
                Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_04", null, false);
            else
                this.selfRankSprite.spriteFrame = null;
            this.selfRankLab.node.active = true;
            this.notInListNode.active = false;
            this.selfRankLab.string = rank;
        }
        else {
            this.notInListNode.active = false;
            switch (rank) {
                case 1:
                    Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_01", null, false);
                    break;
                case 2:
                    Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_02", null, false);
                    break;
                case 3:
                    Global.ResourceManager.loadAutoAtlas(this.selfRankSprite, atlasPath, "rank_03", null, false);
                    break;
            }
        }
    };
    WndRank.prototype.onClose = function () {
        this.RankModel.clear();
        this.RankModel.off(RankModel_1.default.RefreshScrollview, this, this.RefreshScrollView);
        this.RankModel.off(RankModel_1.default.UpdateRankData, this, this.UpdataListData);
    };
    WndRank.prototype.RefreshScrollView = function (msg) {
        if (!msg)
            return;
        if (this.waitingNode) {
            this.waitingNode.active = false;
        }
        this.OnDataPrepared();
        var arr = msg.pointRankList || [];
        this.listView.allDatas = arr;
        this.listView.updateView();
        this.initSelfPanel(msg.my_rank, msg.my_hit_point);
    };
    WndRank.prototype.UpdataListData = function (data) {
        if (this.waitingNode) {
            this.waitingNode.active = false;
        }
        if (data == null)
            return;
        this.listView.allDatas = data;
        this.listView.UpDateScrollData();
    };
    WndRank.prototype.changeInfoNode = function (target) {
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        this.curWin = 0;
        var cmmi_type = this.SpreadModel.RankType;
        if (cmmi_type == 1) {
            this.RankModel.reqRankInfo(3, false);
        }
        else if (cmmi_type == 2) {
            this.RankModel.reqRankInfo(6, false);
        }
        this.setToggleChecked(this.dayRank, true);
        this.setToggleChecked(this.weekRank, false);
        if (target)
            Global.Audio.playBtnSound();
    };
    WndRank.prototype.changeInfoNode2 = function (target) {
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        this.curWin = 1;
        this.RankModel.reqRankInfo(1, false);
        this.setToggleChecked(this.dayRank, false);
        this.setToggleChecked(this.weekRank, true);
        if (target)
            Global.Audio.playBtnSound();
    };
    WndRank.prototype.setToggleChecked = function (targe, flag) {
        var check = targe.getChildByName("check");
        var normal = targe.getChildByName("unchecked");
        if (check) {
            check.active = flag;
        }
        if (normal) {
            normal.active = !flag;
        }
    };
    return WndRank;
}(WndBase_1.default));
exports.default = WndRank;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyYW5rXFxXbmRSYW5rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUErQztBQUMvQyxpRUFBNEQ7QUFFNUQsc0RBQWlEO0FBRWpEO0lBQXNCLDJCQUFPO0lBQTdCO1FBQUEscUVBZ1NDO1FBalJHLGNBQVEsR0FBVSxFQUFFLENBQUM7UUFHYixZQUFNLEdBQVcsQ0FBQyxDQUFDLENBQUEsT0FBTztRQVFsQyw2Q0FBNkM7UUFDN0MsK0ZBQStGO1FBQy9GLGFBQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDOztJQW9RbkQsQ0FBQztJQWhRYSx3QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLG1CQUFTLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQzVFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLG1CQUFTLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDdEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDM0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sMkJBQVMsR0FBaEI7SUFDQSxDQUFDO0lBRVMsd0JBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFH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QjtBQUVELGtCQUFlLE9BQU8sQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IFJhbmtNb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9SYW5rTW9kZWxcIjtcclxuaW1wb3J0IFNwcmVhZE1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1NwcmVhZE1vZGVsXCI7XHJcbmltcG9ydCBXYWl0aW5nVmlldyBmcm9tIFwiLi4vd2FpdGluZy9XYWl0aW5nVmlld1wiO1xyXG5cclxuY2xhc3MgV25kUmFuayBleHRlbmRzIFduZEJhc2Uge1xyXG4gICAgcHJpdmF0ZSBSYW5rU2Nyb2xsVmlldzogY2MuU2Nyb2xsVmlldztcclxuICAgIHByaXZhdGUgc2VsZkxhYmVsTmFtZTogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIHNlbGZMYWJlbElEOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgc2VsZkxhYmVsQ291bnQ6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBzZWxmUmFua0xhYjogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIHNlbGZoZWFkSW1nOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBzZWxmUmFua1Nwcml0ZTogY2MuU3ByaXRlO1xyXG4gICAgLy9wcml2YXRlIGZvbnRTcHJpdGU6IGNjLlNwcml0ZTtcclxuICAgIHByaXZhdGUgUmFua01vZGVsOiBSYW5rTW9kZWw7XHJcbiAgICBwcml2YXRlIGNvcHlJdGVtOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBkYXlSYW5rOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSB3ZWVrUmFuazogY2MuTm9kZTtcclxuICAgIC8v5pyq5LiK5qacXHJcbiAgICBwcml2YXRlIG5vdEluTGlzdE5vZGU6IGNjLk5vZGU7XHJcbiAgICBub2RlTGlzdDogYW55W10gPSBbXTtcclxuICAgIGxpc3RWaWV3OiBhbnk7XHJcbiAgICBsaXN0VmlldzI6IGFueTtcclxuICAgIHByaXZhdGUgY3VyV2luOiBudW1iZXIgPSAwOy8vMOaXpSAx5ZGoXHJcblxyXG4gICAgLy/kvaPph5FcclxuICAgIENvbW1pc3Npb25VbjogY2MuTGFiZWw7XHJcbiAgICBDb21taXNzaW9uQ2g6IGNjLkxhYmVsO1xyXG5cclxuICAgIENvbW1pc3Npb25VbjE6IGNjLkxhYmVsO1xyXG4gICAgQ29tbWlzc2lvbkNoMTogY2MuTGFiZWw7XHJcbiAgICAvLyBTcEZyYW1ldXJsID0gXCJoYWxsL3RleHR1cmUvcmFuay9yYW5rQXRsYXNcIlxyXG4gICAgLy8gU3BEYXlXZWVrID0gW1wianJ5bF8xXCIsXCJqcnlsXzJcIixcImJ6eWxfMVwiLFwiYnp5bF8yXCIsXCJqcnlsYl8xXCIsIFwianJ5bGJfMlwiLCBcImJ6eWpiXzFcIiwgXCJienlqYl8yXCJdXHJcbiAgICBEYXlXZWVrID0gW1wi5LuK5pel55uI5Yip5qacXCIsIFwi5pys5ZGo55uI5Yip5qacXCIsIFwi5LuK5pel55uI5Yip5qacXCIsIFwi5pys5ZGo5L2j6YeR5qacXCJdO1xyXG5cclxuICAgIHByaXZhdGUgd2FpdGluZ05vZGU6IGNjLk5vZGU7XHJcbiAgICBTcHJlYWRNb2RlbDogU3ByZWFkTW9kZWw7XHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCkge1xyXG4gICAgICAgIHRoaXMuUmFua01vZGVsLm9uKFJhbmtNb2RlbC5SZWZyZXNoU2Nyb2xsdmlldywgdGhpcywgdGhpcy5SZWZyZXNoU2Nyb2xsVmlldylcclxuICAgICAgICB0aGlzLlJhbmtNb2RlbC5vbihSYW5rTW9kZWwuVXBkYXRlUmFua0RhdGEsIHRoaXMsIHRoaXMuVXBkYXRhTGlzdERhdGEpXHJcbiAgICAgICAgdGhpcy5zZXRUb2dnbGVDaGVja2VkKHRoaXMuZGF5UmFuaywgdHJ1ZSlcclxuICAgICAgICB0aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy53ZWVrUmFuaywgZmFsc2UpXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VJbmZvTm9kZShudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWZ0ZXJPcGVuKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5pc05lZWREZWxheSA9IHRydWVcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZFJhbmtcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlBvcExheWVyO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1JhbmtVSVwiO1xyXG4gICAgICAgIHRoaXMuUmFua01vZGVsID0gPFJhbmtNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUmFua01vZGVsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodDtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5kYXlSYW5rID0gdGhpcy5nZXRDaGlsZChcIlBhbmVsTm9kZS9SYW5rUGFuZWwvVG9wVGl0bGUvdG9wQnV0dG9uL2RheVJhbmtcIik7XHJcbiAgICAgICAgLy8gdGhpcy53ZWVrUmFuayA9IHRoaXMuZ2V0Q2hpbGQoXCJQYW5lbE5vZGUvUmFua1BhbmVsL1RvcFRpdGxlL3RvcEJ1dHRvbi93ZWVrUmFua1wiKTtcclxuICAgICAgICB0aGlzLmRheVJhbmsgPSB0aGlzLmdldENoaWxkKFwibGVmdFBhbmVsL2RheVJhbmtcIik7XHJcbiAgICAgICAgdGhpcy53ZWVrUmFuayA9IHRoaXMuZ2V0Q2hpbGQoXCJsZWZ0UGFuZWwvd2Vla1JhbmtcIik7XHJcbiAgICAgICAgdGhpcy5kYXlSYW5rLm9uKFwiY2xpY2tcIiwgdGhpcy5jaGFuZ2VJbmZvTm9kZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy53ZWVrUmFuay5vbihcImNsaWNrXCIsIHRoaXMuY2hhbmdlSW5mb05vZGUyLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNsb3NlXCIsIHRoaXMuY2xvc2UsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuUmFua1Njcm9sbFZpZXcgPSB0aGlzLmdldENvbXBvbmVudChcInJpZ2h0UGFuZWwvc2Nyb2xsdmlld1wiLCBjYy5TY3JvbGxWaWV3KTtcclxuICAgICAgICB0aGlzLmNvcHlJdGVtID0gdGhpcy5nZXRDaGlsZChcInJpZ2h0UGFuZWwvc2Nyb2xsdmlldy92aWV3L2NvbnRlbnQvSXRlbVwiKTtcclxuICAgICAgICB0aGlzLmNvcHlJdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0bXBTZWxmTGJJRCA9IHRoaXMuZ2V0Q2hpbGQoXCJTZWxmSW5mby9MZWZ0Tm9kZS9JZExhYlwiKVxyXG4gICAgICAgIHRoaXMuc2VsZkxhYmVsSUQgPSB0bXBTZWxmTGJJRC5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcblxyXG4gICAgICAgIGxldCB0bXBTZWxmTGJOYW1lID0gdGhpcy5nZXRDaGlsZChcIlNlbGZJbmZvL0xlZnROb2RlL05hbWVMYWJcIilcclxuICAgICAgICB0aGlzLnNlbGZMYWJlbE5hbWUgPSB0bXBTZWxmTGJOYW1lLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuXHJcbiAgICAgICAgbGV0IHRtcENvbnRlbnQgPSB0aGlzLmdldENoaWxkKFwiU2VsZkluZm8vUmlnaHROb2RlL0NvaW5MYWJlbFwiKVxyXG4gICAgICAgIHRoaXMuc2VsZkxhYmVsQ291bnQgPSB0bXBDb250ZW50LmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICAvLyB0aGlzLmZvbnRTcHJpdGUgPSB0aGlzLmdldENoaWxkKFwiU2VsZkluZm8vUmlnaHROb2RlL0ZvbnRcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgLy8gdGhpcy5mb250U3ByaXRlLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICBsZXQgdG1wUmFua0xhYiA9IHRoaXMuZ2V0Q2hpbGQoXCJTZWxmSW5mby9MZWZ0Tm9kZS9SYW5rQmcvUmFua0xhYmVsXCIpXHJcbiAgICAgICAgdGhpcy5zZWxmUmFua0xhYiA9IHRtcFJhbmtMYWIuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG5cclxuICAgICAgICB0aGlzLm5vdEluTGlzdE5vZGUgPSB0aGlzLmdldENoaWxkKFwiU2VsZkluZm8vTGVmdE5vZGUvUmFua0JnL25vdEluTGlzdFwiKTtcclxuICAgICAgICB0aGlzLm5vdEluTGlzdE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCB0bXBSYW5rU3AgPSB0aGlzLmdldENoaWxkKFwiU2VsZkluZm8vTGVmdE5vZGUvUmFua0JnXCIpXHJcbiAgICAgICAgdGhpcy5zZWxmUmFua1Nwcml0ZSA9IHRtcFJhbmtTcC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG5cclxuICAgICAgICAvLyB0aGlzLkNvbW1pc3Npb25VbiA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiUGFuZWxOb2RlL1JhbmtQYW5lbC9Ub3BUaXRsZS90b3BCdXR0b24vZGF5UmFuay91bmNoZWNrZWQvdW5jaGVja2VkXCIsIGNjLlNwcml0ZSlcclxuICAgICAgICAvLyB0aGlzLkNvbW1pc3Npb25DaCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiUGFuZWxOb2RlL1JhbmtQYW5lbC9Ub3BUaXRsZS90b3BCdXR0b24vZGF5UmFuay9jaGVjay91bmNoZWNrZWRcIiwgY2MuU3ByaXRlKVxyXG5cclxuICAgICAgICAvLyB0aGlzLkNvbW1pc3Npb25VbjEgPSB0aGlzLmdldENvbXBvbmVudChcIlBhbmVsTm9kZS9SYW5rUGFuZWwvVG9wVGl0bGUvdG9wQnV0dG9uL3dlZWtSYW5rL3VuY2hlY2tlZC91bmNoZWNrZWRcIiwgY2MuU3ByaXRlKVxyXG4gICAgICAgIC8vIHRoaXMuQ29tbWlzc2lvbkNoMSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiUGFuZWxOb2RlL1JhbmtQYW5lbC9Ub3BUaXRsZS90b3BCdXR0b24vd2Vla1JhbmsvY2hlY2svdW5jaGVja2VkXCIsIGNjLlNwcml0ZSlcclxuICAgICAgICB0aGlzLkNvbW1pc3Npb25VbiA9IHRoaXMuZ2V0Q29tcG9uZW50KFwibGVmdFBhbmVsL2RheVJhbmsvdW5jaGVja2VkL2xhYmVsXCIsIGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuQ29tbWlzc2lvbkNoID0gdGhpcy5nZXRDb21wb25lbnQoXCJsZWZ0UGFuZWwvZGF5UmFuay9jaGVjay9sYWJlbFwiLCBjYy5MYWJlbClcclxuXHJcbiAgICAgICAgdGhpcy5Db21taXNzaW9uVW4xID0gdGhpcy5nZXRDb21wb25lbnQoXCJsZWZ0UGFuZWwvd2Vla1JhbmsvdW5jaGVja2VkL2xhYmVsXCIsIGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuQ29tbWlzc2lvbkNoMSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwibGVmdFBhbmVsL3dlZWtSYW5rL2NoZWNrL2xhYmVsXCIsIGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuU3ByZWFkTW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiU3ByZWFkTW9kZWxcIik7XHJcblxyXG4gICAgICAgIHRoaXMuUmFua1Njcm9sbFZpZXcubm9kZS5vbihcInNjcm9sbC10by1ib3R0b21cIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy53YWl0aW5nTm9kZSAmJiB0aGlzLmxpc3RWaWV3LmFsbERhdGFzICYmIHRoaXMubGlzdFZpZXcuYWxsRGF0YXMubGVuZ3RoIDwgMTAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmdOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZXFOZXdEYXRhKClcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICBsZXQgcmFua190eXBlID0gdGhpcy5TcHJlYWRNb2RlbC5SYW5rVHlwZVxyXG4gICAgICAgIGlmIChyYW5rX3R5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAvLyBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXModGhpcy5Db21taXNzaW9uVW4sIHRoaXMuU3BGcmFtZXVybCwgdGhpcy5TcERheVdlZWtbMl0sbnVsbCxmYWxzZSlcclxuICAgICAgICAgICAgLy8gR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMuQ29tbWlzc2lvbkNoLCB0aGlzLlNwRnJhbWV1cmwsIHRoaXMuU3BEYXlXZWVrWzNdLG51bGwsZmFsc2UpXHJcbiAgICAgICAgICAgIC8vIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLkNvbW1pc3Npb25VbjEsIHRoaXMuU3BGcmFtZXVybCwgdGhpcy5TcERheVdlZWtbMF0sbnVsbCxmYWxzZSlcclxuICAgICAgICAgICAgLy8gR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMuQ29tbWlzc2lvbkNoMSwgdGhpcy5TcEZyYW1ldXJsLCB0aGlzLlNwRGF5V2Vla1sxXSxudWxsLGZhbHNlKVxyXG5cclxuICAgICAgICAgICAgLy/mmoLml7blsY/olL0gQHBhcmtlclxyXG4gICAgICAgICAgICAvL3RoaXMuQ29tbWlzc2lvblVuLnN0cmluZyA9IHRoaXMuRGF5V2Vla1sxXTtcclxuICAgICAgICAgICAgLy90aGlzLkNvbW1pc3Npb25DaC5zdHJpbmcgPSB0aGlzLkRheVdlZWtbMV07XHJcbiAgICAgICAgICAgIC8vdGhpcy5Db21taXNzaW9uVW4xLnN0cmluZyA9IHRoaXMuRGF5V2Vla1swXTtcclxuICAgICAgICAgICAgLy90aGlzLkNvbW1pc3Npb25DaDEuc3RyaW5nID0gdGhpcy5EYXlXZWVrWzBdO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmFua190eXBlID09IDIpIHtcclxuICAgICAgICAgICAgLy8gR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMuQ29tbWlzc2lvblVuLCB0aGlzLlNwRnJhbWV1cmwsIHRoaXMuU3BEYXlXZWVrWzZdLG51bGwsZmFsc2UpXHJcbiAgICAgICAgICAgIC8vIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLkNvbW1pc3Npb25DaCwgdGhpcy5TcEZyYW1ldXJsLCB0aGlzLlNwRGF5V2Vla1s3XSxudWxsLGZhbHNlKVxyXG4gICAgICAgICAgICAvLyBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXModGhpcy5Db21taXNzaW9uVW4xLCB0aGlzLlNwRnJhbWV1cmwsIHRoaXMuU3BEYXlXZWVrWzRdLG51bGwsZmFsc2UpXHJcbiAgICAgICAgICAgIC8vIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLkNvbW1pc3Npb25DaDEsIHRoaXMuU3BGcmFtZXVybCwgdGhpcy5TcERheVdlZWtbNV0sbnVsbCxmYWxzZSlcclxuXHJcbiAgICAgICAgICAgIC8v5pqC5pe25bGP6JS9IEBwYXJrZXJcclxuICAgICAgICAgICAgLy8gdGhpcy5Db21taXNzaW9uVW4uc3RyaW5nID0gdGhpcy5EYXlXZWVrWzNdO1xyXG4gICAgICAgICAgICAvLyB0aGlzLkNvbW1pc3Npb25DaC5zdHJpbmcgPSB0aGlzLkRheVdlZWtbM107XHJcbiAgICAgICAgICAgIC8vIHRoaXMuQ29tbWlzc2lvblVuMS5zdHJpbmcgPSB0aGlzLkRheVdlZWtbMl07XHJcbiAgICAgICAgICAgIC8vIHRoaXMuQ29tbWlzc2lvbkNoMS5zdHJpbmcgPSB0aGlzLkRheVdlZWtbMl07XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNlbGZoZWFkSW1nID0gdGhpcy5nZXRDaGlsZChcIlNlbGZJbmZvL0xlZnROb2RlL2hlYWRJbWdcIilcclxuXHJcbiAgICAgICAgdGhpcy5Jbml0U2Nyb2xsVmlld09iaigpXHJcblxyXG4gICAgICAgIGlmICh0aGlzLndhaXRpbmdOb2RlID09IG51bGwgfHwgdGhpcy53YWl0aW5nTm9kZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy92aWV3IOWGheeahGxvYWRpbmdcclxuICAgICAgICAgICAgdGhpcy53YWl0aW5nTm9kZSA9IFdhaXRpbmdWaWV3LmluaXRXYWl0aW5nVmlldyh0aGlzLm5vZGUsIGNjLnYyKDAsIDApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVxTmV3RGF0YSgpIHtcclxuICAgICAgICBsZXQgcmFua1R5cGUgPSB0aGlzLlNwcmVhZE1vZGVsLlJhbmtUeXBlXHJcbiAgICAgICAgaWYgKHJhbmtUeXBlID09IDEpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyV2luID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFua01vZGVsLnJlcVJhbmtJbmZvKDMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5SYW5rTW9kZWwucmVxUmFua0luZm8oMSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJhbmtUeXBlID09IDIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyV2luID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmFua01vZGVsLnJlcVJhbmtJbmZvKDYsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5SYW5rTW9kZWwucmVxUmFua0luZm8oMSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBJbml0U2Nyb2xsVmlld09iaigpIHtcclxuICAgICAgICBsZXQgaXRlbV9zZXR0ZXIgPSAoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmxpc3RWaWV3LmFsbERhdGFzW2luZGV4XTtcclxuXHJcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFwiUmFua0l0ZW1cIikuSW5pdChkYXRhKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5saXN0VmlldyA9IEdsb2JhbC5VSUhlbHBlci5hZGRTY3JvbGxWaWV3Q2FybWFja0NvbXAodGhpcy5SYW5rU2Nyb2xsVmlldy5ub2RlLCB0aGlzLmNvcHlJdGVtLCAxNSwgMCwgdGhpcywgaXRlbV9zZXR0ZXIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpbml0U2VsZlBhbmVsKHJhbms6IGFueSwgcHJvZml0OiBhbnkpIHtcclxuICAgICAgICBpZiAoTnVtYmVyKEdsb2JhbC5QbGF5ZXJEYXRhLmhlYWRpbWcpKSB7XHJcbiAgICAgICAgICAgIGxldCBoZWFkU3ByaXRlID0gdGhpcy5zZWxmaGVhZEltZy5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgICAgICBsZXQgdGVtcEZyYW1lID0gR2xvYmFsLlRvb2xraXQuZ2V0TG9jYWxIZWFkU2YoR2xvYmFsLlBsYXllckRhdGEuaGVhZGltZylcclxuICAgICAgICAgICAgaGVhZFNwcml0ZS5zcHJpdGVGcmFtZSA9IHRlbXBGcmFtZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5Ub29sa2l0LmxvYWRXZWJQaWModGhpcy5zZWxmaGVhZEltZywgR2xvYmFsLlBsYXllckRhdGEuaGVhZGltZylcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZWxmTGFiZWxJRC5zdHJpbmcgPSBHbG9iYWwuUGxheWVyRGF0YS51aWQudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLnNlbGZMYWJlbE5hbWUuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuc3Vic3RyRW5kV2l0aEVsbGkoR2xvYmFsLlBsYXllckRhdGEubmlja25hbWUsIDgpO1xyXG4gICAgICAgIHRoaXMuc2VsZkxhYmVsQ291bnQuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuR2V0VGV4dChwcm9maXQpO1xyXG4gICAgICAgIHRoaXMuc2VsZlJhbmtMYWIubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbGV0IGF0bGFzUGF0aCA9IFwiaGFsbC90ZXh0dXJlL3JhbmsvcmFua0F0bGFzXCJcclxuICAgICAgICBpZiAocmFuayA9PSBudWxsIHx8IHJhbmsgPT0gdW5kZWZpbmVkIHx8IHJhbmsgPiAxMDAgfHwgcmFuayA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZlJhbmtTcHJpdGUuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGZSYW5rTGFiLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgLy/mmL7npLrmnKrkuIrmppxcclxuICAgICAgICAgICAgdGhpcy5ub3RJbkxpc3ROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocmFuayAmJiByYW5rID4gMykge1xyXG4gICAgICAgICAgICBpZiAoR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5pc1B1cnBsZSlcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLnNlbGZSYW5rU3ByaXRlLCBhdGxhc1BhdGgsIFwicmFua18wNFwiLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZlJhbmtTcHJpdGUuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGZSYW5rTGFiLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ub3RJbkxpc3ROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGZSYW5rTGFiLnN0cmluZyA9IHJhbms7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vdEluTGlzdE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaCAocmFuaykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLnNlbGZSYW5rU3ByaXRlLCBhdGxhc1BhdGgsIFwicmFua18wMVwiLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMuc2VsZlJhbmtTcHJpdGUsIGF0bGFzUGF0aCwgXCJyYW5rXzAyXCIsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXModGhpcy5zZWxmUmFua1Nwcml0ZSwgYXRsYXNQYXRoLCBcInJhbmtfMDNcIiwgbnVsbCwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpIHtcclxuICAgICAgICB0aGlzLlJhbmtNb2RlbC5jbGVhcigpXHJcbiAgICAgICAgdGhpcy5SYW5rTW9kZWwub2ZmKFJhbmtNb2RlbC5SZWZyZXNoU2Nyb2xsdmlldywgdGhpcywgdGhpcy5SZWZyZXNoU2Nyb2xsVmlldylcclxuICAgICAgICB0aGlzLlJhbmtNb2RlbC5vZmYoUmFua01vZGVsLlVwZGF0ZVJhbmtEYXRhLCB0aGlzLCB0aGlzLlVwZGF0YUxpc3REYXRhKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVmcmVzaFNjcm9sbFZpZXcobXNnOiBhbnkpIHtcclxuICAgICAgICBpZiAoIW1zZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLndhaXRpbmdOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdGluZ05vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuT25EYXRhUHJlcGFyZWQoKVxyXG4gICAgICAgIGxldCBhcnI6IEFycmF5PGFueT4gPSBtc2cucG9pbnRSYW5rTGlzdCB8fCBbXTtcclxuICAgICAgICB0aGlzLmxpc3RWaWV3LmFsbERhdGFzID0gYXJyO1xyXG4gICAgICAgIHRoaXMubGlzdFZpZXcudXBkYXRlVmlldygpO1xyXG4gICAgICAgIHRoaXMuaW5pdFNlbGZQYW5lbChtc2cubXlfcmFuaywgbXNnLm15X2hpdF9wb2ludCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0YUxpc3REYXRhKGRhdGEpIHtcclxuICAgICAgICBpZiAodGhpcy53YWl0aW5nTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLndhaXRpbmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSByZXR1cm5cclxuICAgICAgICB0aGlzLmxpc3RWaWV3LmFsbERhdGFzID0gZGF0YVxyXG4gICAgICAgIHRoaXMubGlzdFZpZXcuVXBEYXRlU2Nyb2xsRGF0YSgpXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlSW5mb05vZGUodGFyZ2V0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2FpdGluZ05vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy53YWl0aW5nTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmN1cldpbiA9IDA7XHJcbiAgICAgICAgbGV0IGNtbWlfdHlwZSA9IHRoaXMuU3ByZWFkTW9kZWwuUmFua1R5cGVcclxuICAgICAgICBpZiAoY21taV90eXBlID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5SYW5rTW9kZWwucmVxUmFua0luZm8oMywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjbW1pX3R5cGUgPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLlJhbmtNb2RlbC5yZXFSYW5rSW5mbyg2LCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0VG9nZ2xlQ2hlY2tlZCh0aGlzLmRheVJhbmssIHRydWUpXHJcbiAgICAgICAgdGhpcy5zZXRUb2dnbGVDaGVja2VkKHRoaXMud2Vla1JhbmssIGZhbHNlKVxyXG4gICAgICAgIGlmICh0YXJnZXQpXHJcbiAgICAgICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnRuU291bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VJbmZvTm9kZTIodGFyZ2V0KSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLndhaXRpbmdOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdGluZ05vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jdXJXaW4gPSAxO1xyXG4gICAgICAgIHRoaXMuUmFua01vZGVsLnJlcVJhbmtJbmZvKDEsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy5kYXlSYW5rLCBmYWxzZSlcclxuICAgICAgICB0aGlzLnNldFRvZ2dsZUNoZWNrZWQodGhpcy53ZWVrUmFuaywgdHJ1ZSlcclxuICAgICAgICBpZiAodGFyZ2V0KVxyXG4gICAgICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ0blNvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VG9nZ2xlQ2hlY2tlZCh0YXJnZTogY2MuTm9kZSwgZmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBjaGVjayA9IHRhcmdlLmdldENoaWxkQnlOYW1lKFwiY2hlY2tcIilcclxuICAgICAgICBsZXQgbm9ybWFsID0gdGFyZ2UuZ2V0Q2hpbGRCeU5hbWUoXCJ1bmNoZWNrZWRcIilcclxuICAgICAgICBpZiAoY2hlY2spIHtcclxuICAgICAgICAgICAgY2hlY2suYWN0aXZlID0gZmxhZ1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm9ybWFsKSB7XHJcbiAgICAgICAgICAgIG5vcm1hbC5hY3RpdmUgPSAhZmxhZ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFduZFJhbmsiXX0=