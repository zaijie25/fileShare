"use strict";
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