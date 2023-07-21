
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Feedback/ServiceView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '064c2JDPMxHZqBPIk4SVRL2', 'ServiceView');
// hall/scripts/logic/hall/ui/Feedback/ServiceView.ts

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
var ServicerItem_1 = require("../serviver/ServicerItem");
var FeedbackConstants_1 = require("./FeedbackConstants");
var ServicerFactory_1 = require("./ServicerFactory");
var ServiceView = /** @class */ (function (_super) {
    __extends(ServiceView, _super);
    function ServiceView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // private model : ServicerModel;
        _this.listNode = null;
        _this.serviceItem = null;
        _this.serviceDatas = [];
        _this.itemList = new Array();
        _this.itemPool = new Array();
        return _this;
    }
    ServiceView.prototype.initView = function () {
        // this.model = <ServicerModel>Global.ModelManager.getModel("ServicerModel");
        this.listNode = this.getChild("scrollView/view/content");
        this.serviceItem = this.getChild("service_item");
        // this.nameLabel = this.getChild("service_item/nameLabel");
        this.scrollView = this.getComponent("scrollView", cc.ScrollView);
        this.scrollView.enabled = true;
    };
    ServiceView.prototype.onSubViewShow = function () {
        var factory = ServicerFactory_1.default.getInstance();
        var serObj = factory.getEntity(this.viewKey);
        if (serObj.isEmptyInfo()) {
            this.showNoMsgTip();
            return;
        }
        this.serviceDatas = serObj.initServicerData();
        this.updateView(serObj);
        // this.model.on(ServicerEvent.OnUpdateServicerView,this,this.updateView);
    };
    ServiceView.prototype.showNoMsgTip = function () {
        var rightPanelView = Global.UI.getWindow("WndFeedback").getView("RightPanelView");
        rightPanelView.changeView(FeedbackConstants_1.RightViewType.noMsgTips);
    };
    ServiceView.prototype.onSubViewHide = function () {
        // this.model.off(ServicerEvent.OnUpdateServicerView,this,this.updateView);
        // this.listNode.removeAllChildren(true);
        this.serviceDatas = [];
    };
    ServiceView.prototype.updateView = function (data) {
        this.clearItem();
        //生成item
        for (var index = 0; index < this.serviceDatas.length; index++) {
            var item = this.getItem();
            var itemObj = item.getComponent(ServicerItem_1.default);
            // itemObj.setData(this.serviceDatas[index]);
            //itemObj.setData2(index,data);
            this.itemList.push(itemObj);
        }
        this.scrollView.scrollToLeft();
    };
    ServiceView.prototype.getItem = function () {
        if (this.itemPool.length > 0) {
            var item = this.itemPool.pop();
            item.node.setSiblingIndex(-1);
            item.node.active = true;
            return item;
        }
        else {
            var item = cc.instantiate(this.serviceItem);
            item.setParent(this.listNode);
            item.active = true;
            return item;
        }
    };
    ServiceView.prototype.clearItem = function () {
        this.listNode.y = 0;
        for (var index = 0; index < this.itemList.length; index++) {
            var item = this.itemList[index];
            this.recoveryItem(item);
        }
        this.itemList = [];
    };
    ServiceView.prototype.recoveryItem = function (item) {
        item.reset();
        item.node.active = false;
        this.itemPool.push(item);
    };
    return ServiceView;
}(ViewBase_1.default));
exports.default = ServiceView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxGZWVkYmFja1xcU2VydmljZVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQWlEO0FBR2pELHlEQUFvRDtBQUVwRCx5REFBb0Q7QUFDcEQscURBQWdEO0FBTWhEO0lBQXlDLCtCQUFRO0lBQWpEO1FBQUEscUVBeUZDO1FBdkZHLGlDQUFpQztRQUNqQyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBQ3pCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBR3BCLGtCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLGNBQVEsR0FBeUIsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUM3QyxjQUFRLEdBQXlCLElBQUksS0FBSyxFQUFFLENBQUM7O0lBZ0Z6RCxDQUFDO0lBOUVhLDhCQUFRLEdBQWxCO1FBRUksNkVBQTZFO1FBQzdFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNqRCw0REFBNEQ7UUFDNUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFUyxtQ0FBYSxHQUF2QjtRQUNJLElBQU0sT0FBTyxHQUFtQix5QkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlELElBQUksTUFBTSxHQUFlLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELElBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFDO1lBQ3BCLElBQUksQ0FBQyxZ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c0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBTZXJ2aWNlck1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1NlcnZpY2VyTW9kZWxcIjtcclxuaW1wb3J0IHsgU2VydmljZXJFdmVudCB9IGZyb20gXCIuLi9zZXJ2aXZlci9TZXJ2aWNlckV2ZW50XCI7XHJcbmltcG9ydCBTZXJ2aWNlckl0ZW0gZnJvbSBcIi4uL3NlcnZpdmVyL1NlcnZpY2VySXRlbVwiO1xyXG5pbXBvcnQgUmlnaHRQYW5lbFZpZXcgZnJvbSBcIi4vUmlnaHRQYW5lbFZpZXdcIjtcclxuaW1wb3J0IHsgUmlnaHRWaWV3VHlwZSB9IGZyb20gXCIuL0ZlZWRiYWNrQ29uc3RhbnRzXCI7XHJcbmltcG9ydCBTZXJ2aWNlckZhY3RvcnkgZnJvbSBcIi4vU2VydmljZXJGYWN0b3J5XCI7XHJcbmltcG9ydCBBYnNTZXJ2aWNlciBmcm9tIFwiLi9BYnNTZXJ2aWNlclwiO1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmljZVZpZXcgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgLy8gcHJpdmF0ZSBtb2RlbCA6IFNlcnZpY2VyTW9kZWw7XHJcbiAgICBsaXN0Tm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBzZXJ2aWNlSXRlbTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvLyBuYW1lTGFiZWw6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgc2Nyb2xsVmlldzpjYy5TY3JvbGxWaWV3O1xyXG4gICAgcHJpdmF0ZSBzZXJ2aWNlRGF0YXMgPSBbXTtcclxuICAgIHByaXZhdGUgaXRlbUxpc3QgOiBBcnJheTxTZXJ2aWNlckl0ZW0+ID0gbmV3IEFycmF5KCk7XHJcbiAgICBwcml2YXRlIGl0ZW1Qb29sIDogQXJyYXk8U2VydmljZXJJdGVtPiA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHRoaXMubW9kZWwgPSA8U2VydmljZXJNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiU2VydmljZXJNb2RlbFwiKTtcclxuICAgICAgICB0aGlzLmxpc3ROb2RlID0gdGhpcy5nZXRDaGlsZChcInNjcm9sbFZpZXcvdmlldy9jb250ZW50XCIpO1xyXG4gICAgICAgIHRoaXMuc2VydmljZUl0ZW0gPSB0aGlzLmdldENoaWxkKFwic2VydmljZV9pdGVtXCIpO1xyXG4gICAgICAgIC8vIHRoaXMubmFtZUxhYmVsID0gdGhpcy5nZXRDaGlsZChcInNlcnZpY2VfaXRlbS9uYW1lTGFiZWxcIik7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3ID0gdGhpcy5nZXRDb21wb25lbnQoXCJzY3JvbGxWaWV3XCIsY2MuU2Nyb2xsVmlldyk7XHJcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3LmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblN1YlZpZXdTaG93KCl7XHJcbiAgICAgICAgY29uc3QgZmFjdG9yeTpTZXJ2aWNlckZhY3RvcnkgPSBTZXJ2aWNlckZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgc2VyT2JqOkFic1NlcnZpY2VyID0gZmFjdG9yeS5nZXRFbnRpdHkodGhpcy52aWV3S2V5KTtcclxuICAgICAgICBpZihzZXJPYmouaXNFbXB0eUluZm8oKSl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd05vTXNnVGlwKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlRGF0YXMgPSBzZXJPYmouaW5pdFNlcnZpY2VyRGF0YSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmlldyhzZXJPYmopO1xyXG4gICAgICAgIC8vIHRoaXMubW9kZWwub24oU2VydmljZXJFdmVudC5PblVwZGF0ZVNlcnZpY2VyVmlldyx0aGlzLHRoaXMudXBkYXRlVmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd05vTXNnVGlwKCl7XHJcbiAgICAgICAgbGV0IHJpZ2h0UGFuZWxWaWV3ID0gPFJpZ2h0UGFuZWxWaWV3Pkdsb2JhbC5VSS5nZXRXaW5kb3coXCJXbmRGZWVkYmFja1wiKS5nZXRWaWV3KFwiUmlnaHRQYW5lbFZpZXdcIik7XHJcbiAgICAgICAgcmlnaHRQYW5lbFZpZXcuY2hhbmdlVmlldyhSaWdodFZpZXdUeXBlLm5vTXNnVGlwcyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdWJWaWV3SGlkZSgpe1xyXG4gICAgICAgIC8vIHRoaXMubW9kZWwub2ZmKFNlcnZpY2VyRXZlbnQuT25VcGRhdGVTZXJ2aWNlclZpZXcsdGhpcyx0aGlzLnVwZGF0ZVZpZXcpO1xyXG4gICAgICAgIC8vIHRoaXMubGlzdE5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlRGF0YXM9W107XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVZpZXcoZGF0YTogQWJzU2VydmljZXIpe1xyXG4gICAgICAgIHRoaXMuY2xlYXJJdGVtKCk7XHJcbiAgICAgICAgLy/nlJ/miJBpdGVtXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuc2VydmljZURhdGFzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZ2V0SXRlbSgpO1xyXG4gICAgICAgICAgICBsZXQgaXRlbU9iaiA9IGl0ZW0uZ2V0Q29tcG9uZW50KFNlcnZpY2VySXRlbSk7XHJcbiAgICAgICAgICAgIC8vIGl0ZW1PYmouc2V0RGF0YSh0aGlzLnNlcnZpY2VEYXRhc1tpbmRleF0pO1xyXG4gICAgICAgICAgICAvL2l0ZW1PYmouc2V0RGF0YTIoaW5kZXgsZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbUxpc3QucHVzaChpdGVtT2JqKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvTGVmdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0SXRlbSgpe1xyXG4gICAgICAgIGlmKHRoaXMuaXRlbVBvb2wubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5pdGVtUG9vbC5wb3AoKTtcclxuICAgICAgICAgICAgaXRlbS5ub2RlLnNldFNpYmxpbmdJbmRleCgtMSk7XHJcbiAgICAgICAgICAgIGl0ZW0ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnNlcnZpY2VJdGVtKTtcclxuICAgICAgICAgICAgaXRlbS5zZXRQYXJlbnQodGhpcy5saXN0Tm9kZSk7XHJcbiAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xlYXJJdGVtKCl7XHJcbiAgICAgICAgdGhpcy5saXN0Tm9kZS55ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5pdGVtTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbUxpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICB0aGlzLnJlY292ZXJ5SXRlbShpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pdGVtTGlzdCA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVjb3ZlcnlJdGVtKCBpdGVtIDogU2VydmljZXJJdGVtKXtcclxuICAgICAgICBpdGVtLnJlc2V0KCk7XHJcbiAgICAgICAgaXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXRlbVBvb2wucHVzaChpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcblxyXG59XHJcbiJdfQ==