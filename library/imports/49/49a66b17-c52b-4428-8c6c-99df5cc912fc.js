"use strict";
cc._RF.push(module, '49a66sXxStEKIxsmd9cyRL8', 'WndServicerUI');
// hall/scripts/logic/hall/ui/serviver/WndServicerUI.ts

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
var FeedbackServiceItem_1 = require("../Feedback/FeedbackServiceItem");
var WndServicerUI = /** @class */ (function (_super) {
    __extends(WndServicerUI, _super);
    function WndServicerUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.listNode = null;
        _this.itemPrefab = null;
        _this.itemList = new Array();
        _this.itemPool = new Array();
        _this.serviceDatas = [];
        return _this;
    }
    WndServicerUI.prototype.getItem = function () {
        if (this.itemPool.length > 0) {
            var item = this.itemPool.pop();
            item.node.setSiblingIndex(-1);
            item.node.active = true;
            return item;
        }
        else {
            var itemObj = cc.instantiate(this.itemPrefab);
            var item = itemObj.getComponent(FeedbackServiceItem_1.default);
            item.node.setParent(this.listNode);
            item.node.active = true;
            return item;
        }
    };
    WndServicerUI.prototype.recoveryItem = function (item) {
        item.node.active = false;
        this.itemPool.push(item);
    };
    WndServicerUI.prototype.clearItem = function () {
        this.listNode.y = 0;
        for (var index = 0; index < this.itemList.length; index++) {
            var item = this.itemList[index];
            this.recoveryItem(item);
        }
        this.itemList = [];
    };
    WndServicerUI.prototype.onInit = function () {
        this.name = "WndServicerUI";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/ServiceUI";
    };
    WndServicerUI.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("close", this.close, this);
        this.listNode = this.getChild("ScrollView/view/ServicersNode");
        this.itemPrefab = this.getChild("ScrollView/view/ServicersNode/ServicerItem");
        if (this.itemPrefab) {
            this.itemPrefab.active = false;
        }
    };
    WndServicerUI.prototype.onDispose = function () {
        this.itemPool = [];
        this.itemList = [];
    };
    WndServicerUI.prototype.onOpen = function () {
        if (this.args && this.args[0]) {
            this.serviceDatas = this.args[0];
            /* let res = this.args[1];
            if(res != "")
                this.titleSp.spriteFrame = Global.ResourceManager.getSprite("hall/texture/common/txtImg", res) */
        }
        else
            this.serviceDatas = [];
        this.updateView();
    };
    WndServicerUI.prototype.onClose = function () {
        this.itemPool = [];
        this.listNode.removeAllChildren();
    };
    WndServicerUI.prototype.updateView = function () {
        if (!this.serviceDatas)
            return;
        //
        this.clearItem();
        for (var index = 0; index < this.serviceDatas.length; index++) {
            if (!this.serviceDatas[index].type) {
                continue;
            }
            var item = this.getItem();
            item.refreshUI(this.serviceDatas[index]);
        }
    };
    return WndServicerUI;
}(WndBase_1.default));
exports.default = WndServicerUI;

cc._RF.pop();