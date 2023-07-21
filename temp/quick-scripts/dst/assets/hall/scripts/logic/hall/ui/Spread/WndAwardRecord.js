
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Spread/WndAwardRecord.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7f5ceGKvPpBpbZWkcSRghgI', 'WndAwardRecord');
// hall/scripts/logic/hall/ui/Spread/WndAwardRecord.ts

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
var WndAwardRecord = /** @class */ (function (_super) {
    __extends(WndAwardRecord, _super);
    function WndAwardRecord() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeList = [];
        _this.page = 1;
        _this.TotalPage = 0;
        _this.SpreadModel = null;
        _this.limit = 4;
        return _this;
    }
    // tipmyself: cc.Node;
    WndAwardRecord.prototype.onInit = function () {
        this.name = "WndAwardRecord";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/SpreadUI/AwardHistory";
    };
    WndAwardRecord.prototype.initView = function () {
        var SpreadModel = Global.ModelManager.getModel("SpreadModel");
        this.cmmi_type = SpreadModel.commiType;
        this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("bg_popup_middle/close", this.close, this);
        this.LastPageBtn = this.getChild("BotBtn/LastPage");
        this.NextPageBtn = this.getChild("BotBtn/NextPage");
        this.LastPageBtn.on("click", this.OnLastPageBtnClick, this);
        // this.tipmyself = this.getChild("bg_popup_middle/topTitle/type")
        // if (this.SpreadModel.self_rate > 0|| this.cmmi_type === 2) {
        //     this.tipmyself.active = true
        // }
        // else {
        //     this.tipmyself.active = false
        // }
        this.NextPageBtn.on("click", this.OnNextPagePageBtnClick, this);
        this.copyItem = this.getChild("bg_popup_middle/scrollview/view/content/item");
        this.contentNode = this.getChild("bg_popup_middle/scrollview/view/content");
        this.TotalInfoLabel = this.getChild("BotBtn/TotalInfoLabel").getComponent(cc.Label);
        this.PageLabel = this.getChild("BotBtn/PageLabel").getComponent(cc.Label);
        this.noTips = this.getChild("bg_popup_middle/scrollview/noListTipsSk");
        this.noTips.active = false;
        this.titleNode = this.getChild("bg_popup_middle/topTitle");
        this.titleNode.active = false;
        this.botNode = this.getChild("BotBtn");
        this.botNode.active = false;
        this.initItemPool();
    };
    WndAwardRecord.prototype.OnNextPagePageBtnClick = function () {
        Global.Audio.playBtnSound();
        this.page++;
        if (this.page > this.TotalPage) {
            this.page = this.TotalPage;
            Global.UI.fastTip("没有更多数据");
            return;
        }
        this.SpreadModel.GetDayAgentRecord(this.page, this.limit);
    };
    WndAwardRecord.prototype.OnLastPageBtnClick = function () {
        Global.Audio.playBtnSound();
        this.page--;
        if (this.page <= 0) {
            this.page = 1;
            Global.UI.fastTip("已经是第一页了");
            return;
        }
        this.SpreadModel.GetDayAgentRecord(this.page, this.limit);
    };
    WndAwardRecord.prototype.onOpen = function (data) {
        this.SpreadModel.on(NetEvent_1.NetAppface.GetSelfReadRecord, this, this.RefreshScrollView);
        this.SpreadModel.on(NetEvent_1.NetAppface.GetDayAgentRecord, this, this.RefreshScrollView);
        this.copyItem.active = false;
        if (data == null || data.length == 0) {
            return;
        }
        this.RefreshScrollView(data[0]);
    };
    WndAwardRecord.prototype.RefreshScrollView = function (data) {
        if (data == null) {
            Global.UI.fastTip("无数据");
            return;
        }
        if (data.total == 0) {
            this.noTips.active = true;
            this.titleNode.active = false;
            this.botNode.active = false;
        }
        else {
            this.noTips.active = false;
            this.titleNode.active = true;
            this.botNode.active = true;
        }
        this.TotalPage = Math.ceil(data.total / data.limit);
        var msgFormat = "共%s条";
        this.TotalInfoLabel.string = cc.js.formatStr(msgFormat, data.total);
        var str = "第%s页";
        this.PageLabel.string = cc.js.formatStr(str, this.TotalPage);
        var arr = data.data || [];
        var count = arr.length;
        this.recycle();
        for (var j = 0; j < count; j++) {
            var node = this.itemPool.getItem();
            this.nodeList.push(node);
            node.active = true;
            // node.getChildByName("bg").active = j % 2 == 0;
            node.setParent(this.contentNode);
            node.getComponent("AwardRecordItem").Init(arr[j]);
        }
    };
    WndAwardRecord.prototype.onClose = function () {
        this.ResetData();
        this.SpreadModel.off(NetEvent_1.NetAppface.GetSelfReadRecord, this, this.RefreshScrollView);
        this.SpreadModel.off(NetEvent_1.NetAppface.GetDayAgentRecord, this, this.RefreshScrollView);
    };
    WndAwardRecord.prototype.ResetData = function () {
        this.page = 1;
        this.TotalPage = 0;
    };
    WndAwardRecord.prototype.onDispose = function () {
        this.nodeList = [];
        this.itemPool.resetPool();
    };
    WndAwardRecord.prototype.initItemPool = function () {
        this.itemPool = new AwardRecordItemPool(this.copyItem);
    };
    WndAwardRecord.prototype.recycle = function () {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    return WndAwardRecord;
}(WndBase_1.default));
exports.default = WndAwardRecord;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxTcHJlYWRcXFduZEF3YXJkUmVjb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUErQztBQUMvQyx3REFBbUQ7QUFFbkQsNERBQTZEO0FBRTdEO0lBQTRDLGtDQUFPO0lBQW5EO1FBQUEscUVBdUpDO1FBbkpHLGNBQVEsR0FBVSxFQUFFLENBQUM7UUFDckIsVUFBSSxHQUFHLENBQUMsQ0FBQTtRQUNSLGVBQVMsR0FBRyxDQUFDLENBQUE7UUFDYixpQkFBVyxHQUFHLElBQUksQ0FBQTtRQUNsQixXQUFLLEdBQUcsQ0FBQyxDQUFBOztJQStJYixDQUFDO0lBcklHLHNCQUFzQjtJQUVaLCtCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsdUNBQXVDLENBQUM7SUFFM0QsQ0FBQztJQUVTLGlDQUFRLEdBQWxCO1FBQ0ksSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFBO1FBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQWdCLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0s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QUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDTCwwQkFBQztBQUFELENBYkEsQUFhQyxDQWJpQyxrQkFBUSxHQWF6QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IFBvb2xCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3Rvb2wvUG9vbEJhc2VcIjtcclxuaW1wb3J0IFNwcmVhZE1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1NwcmVhZE1vZGVsXCI7XHJcbmltcG9ydCB7IE5ldEFwcGZhY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9uZXQvaGFsbC9OZXRFdmVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kQXdhcmRSZWNvcmQgZXh0ZW5kcyBXbmRCYXNlIHtcclxuICAgIGNvcHlJdGVtOiBhbnk7XHJcbiAgICBjb250ZW50Tm9kZTogYW55O1xyXG4gICAgaXRlbVBvb2w6IEF3YXJkUmVjb3JkSXRlbVBvb2w7XHJcbiAgICBub2RlTGlzdDogYW55W10gPSBbXTtcclxuICAgIHBhZ2UgPSAxXHJcbiAgICBUb3RhbFBhZ2UgPSAwXHJcbiAgICBTcHJlYWRNb2RlbCA9IG51bGxcclxuICAgIGxpbWl0ID0gNFxyXG4gICAgbm9UaXBzOiBjYy5Ob2RlXHJcbiAgICB0aXRsZU5vZGU6IGNjLk5vZGVcclxuICAgIGJvdE5vZGU6IGNjLk5vZGVcclxuXHJcbiAgICBUb3RhbEluZm9MYWJlbDogY2MuTGFiZWxcclxuICAgIFBhZ2VMYWJlbDogY2MuTGFiZWxcclxuICAgIExhc3RQYWdlQnRuOiBjYy5Ob2RlXHJcbiAgICBOZXh0UGFnZUJ0bjogY2MuTm9kZVxyXG4gICAgY21taV90eXBlOiBudW1iZXJcclxuICAgIC8vIHRpcG15c2VsZjogY2MuTm9kZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiV25kQXdhcmRSZWNvcmRcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlBvcExheWVyO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1NwcmVhZFVJL0F3YXJkSGlzdG9yeVwiO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdmFyIFNwcmVhZE1vZGVsID0gR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlNwcmVhZE1vZGVsXCIpO1xyXG4gICAgICAgIHRoaXMuY21taV90eXBlID0gU3ByZWFkTW9kZWwuY29tbWlUeXBlXHJcbiAgICAgICAgdGhpcy5TcHJlYWRNb2RlbCA9IDxTcHJlYWRNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiU3ByZWFkTW9kZWxcIik7XHJcbiAgICAgICAgdGhpcy5ub2RlLndpZHRoID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodDtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYmdfcG9wdXBfbWlkZGxlL2Nsb3NlXCIsIHRoaXMuY2xvc2UsIHRoaXMpXHJcbiAgICAgICAgdGhpcy5MYXN0UGFnZUJ0biA9IHRoaXMuZ2V0Q2hpbGQoXCJCb3RCdG4vTGFzdFBhZ2VcIilcclxuICAgICAgICB0aGlzLk5leHRQYWdlQnRuID0gdGhpcy5nZXRDaGlsZChcIkJvdEJ0bi9OZXh0UGFnZVwiKVxyXG4gICAgICAgIHRoaXMuTGFzdFBhZ2VCdG4ub24oXCJjbGlja1wiLCB0aGlzLk9uTGFzdFBhZ2VCdG5DbGljaywgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy50aXBteXNlbGYgPSB0aGlzLmdldENoaWxkKFwiYmdfcG9wdXBfbWlkZGxlL3RvcFRpdGxlL3R5cGVcIilcclxuICAgICAgICAvLyBpZiAodGhpcy5TcHJlYWRNb2RlbC5zZWxmX3JhdGUgPiAwfHwgdGhpcy5jbW1pX3R5cGUgPT09IDIpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy50aXBteXNlbGYuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICAvLyAgICAgdGhpcy50aXBteXNlbGYuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5OZXh0UGFnZUJ0bi5vbihcImNsaWNrXCIsIHRoaXMuT25OZXh0UGFnZVBhZ2VCdG5DbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jb3B5SXRlbSA9IHRoaXMuZ2V0Q2hpbGQoXCJiZ19wb3B1cF9taWRkbGUvc2Nyb2xsdmlldy92aWV3L2NvbnRlbnQvaXRlbVwiKVxyXG4gICAgICAgIHRoaXMuY29udGVudE5vZGUgPSB0aGlzLmdldENoaWxkKFwiYmdfcG9wdXBfbWlkZGxlL3Njcm9sbHZpZXcvdmlldy9jb250ZW50XCIpXHJcbiAgICAgICAgdGhpcy5Ub3RhbEluZm9MYWJlbCA9IHRoaXMuZ2V0Q2hpbGQoXCJCb3RCdG4vVG90YWxJbmZvTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuUGFnZUxhYmVsID0gdGhpcy5nZXRDaGlsZChcIkJvdEJ0bi9QYWdlTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMubm9UaXBzID0gdGhpcy5nZXRDaGlsZChcImJnX3BvcHVwX21pZGRsZS9zY3JvbGx2aWV3L25vTGlzdFRpcHNTa1wiKVxyXG4gICAgICAgIHRoaXMubm9UaXBzLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy50aXRsZU5vZGUgPSB0aGlzLmdldENoaWxkKFwiYmdfcG9wdXBfbWlkZGxlL3RvcFRpdGxlXCIpXHJcbiAgICAgICAgdGhpcy50aXRsZU5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLmJvdE5vZGUgPSB0aGlzLmdldENoaWxkKFwiQm90QnRuXCIpXHJcbiAgICAgICAgdGhpcy5ib3ROb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5pbml0SXRlbVBvb2woKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgT25OZXh0UGFnZVBhZ2VCdG5DbGljaygpIHtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5wYWdlKytcclxuICAgICAgICBpZiAodGhpcy5wYWdlID4gdGhpcy5Ub3RhbFBhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlID0gdGhpcy5Ub3RhbFBhZ2VcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLmsqHmnInmm7TlpJrmlbDmja5cIilcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU3ByZWFkTW9kZWwuR2V0RGF5QWdlbnRSZWNvcmQodGhpcy5wYWdlLCB0aGlzLmxpbWl0KVxyXG4gICAgfVxyXG4gICAgT25MYXN0UGFnZUJ0bkNsaWNrKCkge1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICB0aGlzLnBhZ2UtLVxyXG4gICAgICAgIGlmICh0aGlzLnBhZ2UgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSAxXHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5bey57uP5piv56ys5LiA6aG15LqGXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5TcHJlYWRNb2RlbC5HZXREYXlBZ2VudFJlY29yZCh0aGlzLnBhZ2UsIHRoaXMubGltaXQpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oZGF0YSkge1xyXG4gICAgICAgIHRoaXMuU3ByZWFkTW9kZWwub24oTmV0QXBwZmFjZS5HZXRTZWxmUmVhZFJlY29yZCwgdGhpcywgdGhpcy5SZWZyZXNoU2Nyb2xsVmlldylcclxuICAgICAgICB0aGlzLlNwcmVhZE1vZGVsLm9uKE5ldEFwcGZhY2UuR2V0RGF5QWdlbnRSZWNvcmQsIHRoaXMsIHRoaXMuUmVmcmVzaFNjcm9sbFZpZXcpXHJcbiAgICAgICAgdGhpcy5jb3B5SXRlbS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIGlmIChkYXRhID09IG51bGwgfHwgZGF0YS5sZW5ndGggPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlJlZnJlc2hTY3JvbGxWaWV3KGRhdGFbMF0pXHJcbiAgICB9XHJcbiAgICBSZWZyZXNoU2Nyb2xsVmlldyhkYXRhOiBhbnkpIHtcclxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5peg5pWw5o2uXCIpXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF0YS50b3RhbCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9UaXBzLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy50aXRsZU5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5ib3ROb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vVGlwcy5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlTm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMuYm90Tm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuVG90YWxQYWdlID0gTWF0aC5jZWlsKGRhdGEudG90YWwgLyBkYXRhLmxpbWl0KVxyXG4gICAgICAgIGxldCBtc2dGb3JtYXQgPSBcIuWFsSVz5p2hXCJcclxuICAgICAgICB0aGlzLlRvdGFsSW5mb0xhYmVsLnN0cmluZyA9IGNjLmpzLmZvcm1hdFN0cihtc2dGb3JtYXQsIGRhdGEudG90YWwpO1xyXG4gICAgICAgIGxldCBzdHIgPSBcIuesrCVz6aG1XCJcclxuICAgICAgICB0aGlzLlBhZ2VMYWJlbC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoc3RyLCB0aGlzLlRvdGFsUGFnZSk7XHJcbiAgICAgICAgbGV0IGFycjogQXJyYXk8YW55PiA9IGRhdGEuZGF0YSB8fCBbXTtcclxuICAgICAgICBsZXQgY291bnQgPSBhcnIubGVuZ3RoO1xyXG5cclxuICAgICAgICB0aGlzLnJlY3ljbGUoKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvdW50OyBqKyspIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5pdGVtUG9vbC5nZXRJdGVtKCkgYXMgY2MuTm9kZTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlTGlzdC5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgLy8gbm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmFjdGl2ZSA9IGogJSAyID09IDA7XHJcbiAgICAgICAgICAgIG5vZGUuc2V0UGFyZW50KHRoaXMuY29udGVudE5vZGUpO1xyXG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcIkF3YXJkUmVjb3JkSXRlbVwiKS5Jbml0KGFycltqXSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuUmVzZXREYXRhKClcclxuICAgICAgICB0aGlzLlNwcmVhZE1vZGVsLm9mZihOZXRBcHBmYWNlLkdldFNlbGZSZWFkUmVjb3JkLCB0aGlzLCB0aGlzLlJlZnJlc2hTY3JvbGxWaWV3KVxyXG4gICAgICAgIHRoaXMuU3ByZWFkTW9kZWwub2ZmKE5ldEFwcGZhY2UuR2V0RGF5QWdlbnRSZWNvcmQsIHRoaXMsIHRoaXMuUmVmcmVzaFNjcm9sbFZpZXcpXHJcbiAgICB9XHJcbiAgICBSZXNldERhdGEoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlID0gMVxyXG4gICAgICAgIHRoaXMuVG90YWxQYWdlID0gMFxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uRGlzcG9zZSgpIHtcclxuICAgICAgICB0aGlzLm5vZGVMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5pdGVtUG9vbC5yZXNldFBvb2woKVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpbml0SXRlbVBvb2woKSB7XHJcblxyXG5cclxuICAgICAgICB0aGlzLml0ZW1Qb29sID0gbmV3IEF3YXJkUmVjb3JkSXRlbVBvb2wodGhpcy5jb3B5SXRlbSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVjeWNsZSgpIHtcclxuICAgICAgICB0aGlzLml0ZW1Qb29sLnJlY3ljbGVBbGwodGhpcy5ub2RlTGlzdCk7XHJcbiAgICAgICAgdGhpcy5ub2RlTGlzdCA9IFtdO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEF3YXJkUmVjb3JkSXRlbVBvb2wgZXh0ZW5kcyBQb29sQmFzZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvcHlOb2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlSXRlbSgpIHtcclxuICAgICAgICByZXR1cm4gY2MuaW5zdGFudGlhdGUodGhpcy5jb3B5Tm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHJlc2V0SXRlbShub2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBub2RlLnNldFBhcmVudChudWxsKTtcclxuICAgIH1cclxufSJdfQ==