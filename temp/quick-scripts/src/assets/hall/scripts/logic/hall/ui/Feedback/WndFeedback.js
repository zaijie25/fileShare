"use strict";
cc._RF.push(module, 'f9145r1ZIFCJ5QZ08NeP97k', 'WndFeedback');
// hall/scripts/logic/hall/ui/Feedback/WndFeedback.ts

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
var FeedbackServiceItem_1 = require("./FeedbackServiceItem");
var WndFeedback = /** @class */ (function (_super) {
    __extends(WndFeedback, _super);
    function WndFeedback() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeList = [];
        //rightPanelView: RightPanelView;
        _this.serviceItemNodeList = [];
        return _this;
    }
    WndFeedback.prototype.onInit = function () {
        this.isNeedDelay = true;
        this.name = "WndFeedback";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/FeedbackUI";
        this.model = Global.ModelManager.getModel("ServicerModel");
    };
    WndFeedback.prototype.onOpen = function () {
        this.serverInfo = this.args[0];
        if (this.serverInfo) {
            this.initLeftItem();
            this.OnDataPrepared();
            //this.rightPanelView.subViewState = true
        }
    };
    WndFeedback.prototype.initLeftItem = function () {
        if (!this.serverInfo || this.serverInfo.length === 0) {
            return;
        }
        this.serverInfo.sort(function (a, b) {
            return a.sort - b.sort;
        });
        var select = -1;
        /**初始化item */
        for (var index = 0; index < this.serverInfo.length; index++) {
            var itemData = this.serverInfo[index];
            if (!itemData.status) {
                continue;
            }
            //itemData.id = Global.Toolkit.md5(itemData)
            var node = this.itemPool.getItem();
            var item = node.getComponent("ServiceLeftItem");
            item.SetToggleChecked(false);
            select += 1;
            node.setParent(this.contentNode);
            this.nodeList.push(node);
            if (item) {
                item.onInit(itemData);
            }
            if (select === 0) {
                this.reset();
                item.SetToggleChecked(true);
                this.refreshRightPanel(itemData);
            }
            node.active = true;
            node.on(cc.Node.EventType.TOUCH_END, this.leftItemClick, this);
        }
        /**
         * 排序
         */
        // for (let index = 0; index < this.contentNode.childrenCount; index++) {
        //     let itemData = this.contentNode.children[index].getComponent(ServiceLeftItem).getGameData();
        //     if(itemData)
        //     {
        //         let sort = itemData.sort -1 
        //         if(sort<0)
        //         {
        //             sort = 0
        //         }
        //         else if(sort >=this.contentNode.childrenCount)
        //         {
        //             sort = this.contentNode.childrenCount - 1
        //         }
        //         this.contentNode.children[index].setSiblingIndex(sort)
        //     }
        // }
        // this.OnDataPrepared()
        // /**
        //  * 选中第一个
        //  */
        // if(this.contentNode.childrenCount == 0) return
        // let node = this.contentNode.children[0]
        // if (node) {
        //     let item = node.getComponent(ServiceLeftItem)
        //     if (item) {
        //         let itemData = item.getGameData();
        //         this.reset()
        //         item.SetToggleChecked(true);
        //         this.refreshRightPanel(itemData)
        //     }
        // }
        //this.addFAQ();
    };
    WndFeedback.prototype.addFAQ = function () {
        var item = this.itemPool.getItem();
        item.active = true;
        //item.getComponent("FeedbackLeftItem").onInit(this.leftItem[7]);
        var data = {};
        data.name = "FAQ";
        item.getComponent("ServiceLeftItem").onInit(data);
        item.setParent(this.contentNode);
        this.nodeList.push(item);
        item.on(cc.Node.EventType.TOUCH_END, this.leftItemClick, this);
        this.OnDataPrepared();
    };
    WndFeedback.prototype.leftItemClick = function (event) {
        Global.Audio.playBtnSound();
        var item = event.target;
        var gameListItem = item.getComponent("ServiceLeftItem");
        var gameData = gameListItem.getGameData();
        //this.FAQ.active = false
        this.onlineServiceNode.active = true;
        this.noMsgTips.active = false;
        if (gameData) {
            //this.selectId = gameData.id
            this.refreshRightPanel(gameData);
        }
    };
    WndFeedback.prototype.refreshRightPanel = function (gameData) {
        var arr = gameData.windows;
        if (!arr || !arr.length) {
            this.noMsgTips.active = true;
            this.onlineServiceNode.active = false;
            return;
        }
        this.hideAllItem();
        this.onlineServiceNode.active = true;
        this.noMsgTips.active = false;
        for (var index = 0; index < arr.length; index++) {
            var element = arr[index];
            if (index < this.serviceItemNodeList.length && this.serviceItemNodeList[index] && element.type) {
                this.serviceItemNodeList[index].getComponent(FeedbackServiceItem_1.default).refreshUI(element);
                this.serviceItemNodeList[index].active = true;
            }
        }
    };
    WndFeedback.prototype.hideAllItem = function () {
        this.serviceItemNodeList.forEach(function (ele) {
            if (cc.isValid(ele)) {
                ele.active = false;
            }
        });
    };
    WndFeedback.prototype.initView = function () {
        this.leftPanel = this.getChild("LeftPanel");
        this.rightPanel = this.getChild("RightPanel");
        this.copyItem = this.getChild("LeftPanel/MsgItem");
        this.copyItem.active = false;
        this.contentNode = this.getChild("LeftPanel/scrollview/view/content");
        //this.rightPanelView = <RightPanelView>this.addView("RightPanelView",this.rightPanel,RightPanelView);
        this.addCommonClick("close", this.closeWnd, this);
        this.initItemPool();
        for (var index = 0; index < 3; index++) {
            var path = "RightPanel/onlineService/scrollView/view/content/service_" + index;
            var node = this.getChild(path);
            if (node) {
                this.serviceItemNodeList.push(node);
            }
        }
        this.feedbackNode = this.getChild("RightPanel/feedback");
        if (this.feedbackNode) {
            this.feedbackNode.active = false;
        }
        this.feedback2Node = this.getChild("RightPanel/feedback2");
        if (this.feedback2Node) {
            this.feedback2Node.active = false;
        }
        this.quickFeedbackNode = this.getChild("RightPanel/feedbackWrite");
        if (this.quickFeedbackNode) {
            this.quickFeedbackNode.active = false;
        }
        this.FAQ = this.getChild("RightPanel/FAQ");
        if (this.FAQ) {
            this.FAQ.active = false;
        }
        this.noMsgTips = this.getChild("RightPanel/noMsgTips");
        if (this.noMsgTips) {
            this.noMsgTips.active = false;
        }
        this.onlineServiceNode = this.getChild("RightPanel/onlineService");
        if (this.onlineServiceNode) {
            this.onlineServiceNode.active = false;
        }
    };
    WndFeedback.prototype.closeWnd = function () {
        this.close();
    };
    WndFeedback.prototype.initItemPool = function () {
        this.itemPool = new LeftItemPool(this.copyItem);
    };
    WndFeedback.prototype.reset = function () {
        this.FAQ.active = false;
        this.onlineServiceNode.active = false;
        this.noMsgTips.active = false;
    };
    WndFeedback.prototype.onClose = function () {
        /* this.contentNode.removeAllChildren(true);
        this.itemPool.resetPool();
        this.nodeList = []; */
        if (this.nodeList) {
            this.recycle();
        }
    };
    WndFeedback.prototype.onDispose = function () {
        this.itemPool.resetPool();
        this.nodeList = [];
        this.itemPool = null;
    };
    WndFeedback.prototype.recycle = function () {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    return WndFeedback;
}(WndBase_1.default));
exports.default = WndFeedback;
var LeftItemPool = /** @class */ (function (_super) {
    __extends(LeftItemPool, _super);
    function LeftItemPool(copyNode) {
        var _this = _super.call(this) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    LeftItemPool.prototype.createItem = function () {
        return cc.instantiate(this.copyNode);
    };
    LeftItemPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    LeftItemPool.prototype.recycleAll = function (arr) {
        _super.prototype.recycleAll.call(this, arr);
        /*  arr.forEach(ele => {
             this.resetItem(ele);
         }); */
    };
    return LeftItemPool;
}(PoolBase_1.default));

cc._RF.pop();