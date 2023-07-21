
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Feedback/WndFeedback.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxGZWVkYmFja1xcV25kRmVlZGJhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQStDO0FBRS9DLHdEQUFtRDtBQUluRCw2REFBd0Q7QUFJeEQ7SUFBeUMsK0JBQU87SUFBaEQ7UUFBQSxxRUFpUkM7UUF4UUcsY0FBUSxHQUFVLEVBQUUsQ0FBQztRQUNyQixpQ0FBaUM7UUFDakMseUJBQW1CLEdBQWMsRUFBRSxDQUFBOztJQXNRdkMsQ0FBQztJQTdQYSw0QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsNEJBQTRCLENBQUM7UUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBa0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFOUUsQ0FBQztJQUdTLDRCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUcsSUFBSSxDQUFDLFVBQVUsRUFBQztZQUNmLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7WUFDckIseUNBQXlDO1NBQzVDO0lBRUwsQ0FBQztJQUdELGtDQUFZLEdBQVo7UUFFSSxJQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSSxDQUFDLEVBQ2xEO1lBQ0ksT0FBTTtTQUNUO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUMs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Q0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUwsa0JBQUM7QUFBRCxDQWpSQSxBQWlSQyxDQWpSd0MsaUJBQU8sR0FpUi9DOztBQUVEO0lBQTJCLGdDQUFRO0lBQy9CLHNCQUFvQixRQUFpQjtRQUFyQyxZQUNJLGlCQUFPLFNBQ1Y7UUFGbUIsY0FBUSxHQUFSLFFBQVEsQ0FBUzs7SUFFckMsQ0FBQztJQUVTLGlDQUFVLEdBQXBCO1FBQ0ksT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRVMsZ0NBQVMsR0FBbkIsVUFBb0IsSUFBYTtRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDTSxpQ0FBVSxHQUFqQixVQUFrQixHQUFlO1FBQzdCLGlCQUFNLFVBQVUsWUFBQyxHQUFHLENBQUMsQ0FBQztRQUN2Qjs7ZUFFTztJQUVWLENBQUM7SUFDTCxtQkFBQztBQUFELENBcEJBLEFBb0JDLENBcEIwQixrQkFBUSxHQW9CbEMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCB7IEhhbGxSZWRTcG90VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0hhbGxNb2RlbFwiO1xyXG5pbXBvcnQgUG9vbEJhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdG9vbC9Qb29sQmFzZVwiO1xyXG5pbXBvcnQgUmlnaHRQYW5lbFZpZXcgZnJvbSBcIi4vUmlnaHRQYW5lbFZpZXdcIjtcclxuaW1wb3J0IFNlcnZpY2VyTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvU2VydmljZXJNb2RlbFwiO1xyXG5pbXBvcnQgeyBSaWdodFZpZXdUeXBlIH0gZnJvbSBcIi4vRmVlZGJhY2tDb25zdGFudHNcIjtcclxuaW1wb3J0IEZlZWRiYWNrU2VydmljZUl0ZW0gZnJvbSBcIi4vRmVlZGJhY2tTZXJ2aWNlSXRlbVwiO1xyXG5pbXBvcnQgRmVlZGJhY2tMZWZ0SXRlbSBmcm9tIFwiLi9GZWVkYmFja0xlZnRJdGVtXCI7XHJcbmltcG9ydCBTZXJ2aWNlTGVmdEl0ZW0gZnJvbSBcIi4vU2VydmljZUxlZnRJdGVtXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRGZWVkYmFjayBleHRlbmRzIFduZEJhc2Uge1xyXG5cclxuICAgIG1vZGVsOiBTZXJ2aWNlck1vZGVsO1xyXG4gICAgY29udGVudE5vZGU6IGNjLk5vZGU7XHJcbiAgICBjb3B5SXRlbTogYW55O1xyXG4gICAgc2VsZWN0SWQ6IG51bWJlcjtcclxuICAgIGxlZnRQYW5lbDogY2MuTm9kZTtcclxuICAgIHJpZ2h0UGFuZWw6IGNjLk5vZGU7XHJcbiAgICBpdGVtUG9vbDogTGVmdEl0ZW1Qb29sO1xyXG4gICAgbm9kZUxpc3Q6IGFueVtdID0gW107XHJcbiAgICAvL3JpZ2h0UGFuZWxWaWV3OiBSaWdodFBhbmVsVmlldztcclxuICAgIHNlcnZpY2VJdGVtTm9kZUxpc3QgOmNjLk5vZGVbXSA9IFtdXHJcblxyXG4gICAgZmVlZGJhY2tOb2RlOmNjLk5vZGVcclxuICAgIGZlZWRiYWNrMk5vZGU6Y2MuTm9kZVxyXG4gICAgcXVpY2tGZWVkYmFja05vZGU6Y2MuTm9kZVxyXG4gICAgb25saW5lU2VydmljZU5vZGU6Y2MuTm9kZVxyXG4gICAgRkFROmNjLk5vZGVcclxuICAgIG5vTXNnVGlwczpjYy5Ob2RlXHJcbiAgICBwcml2YXRlIHNlcnZlckluZm86IGFueTtcclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5pc05lZWREZWxheSA9IHRydWVcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZEZlZWRiYWNrXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IFwiUG9wTGF5ZXJcIjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9GZWVkYmFja1VJXCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxTZXJ2aWNlck1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJTZXJ2aWNlck1vZGVsXCIpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpIHtcclxuICAgICAgICB0aGlzLnNlcnZlckluZm8gPSB0aGlzLmFyZ3NbMF07XHJcbiAgICAgICAgaWYodGhpcy5zZXJ2ZXJJbmZvKXtcclxuICAgICAgICAgICAgdGhpcy5pbml0TGVmdEl0ZW0oKTtcclxuICAgICAgICAgICAgdGhpcy5PbkRhdGFQcmVwYXJlZCgpXHJcbiAgICAgICAgICAgIC8vdGhpcy5yaWdodFBhbmVsVmlldy5zdWJWaWV3U3RhdGUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgaW5pdExlZnRJdGVtKCl7XHJcblxyXG4gICAgICAgIGlmKCF0aGlzLnNlcnZlckluZm8gfHwgdGhpcy5zZXJ2ZXJJbmZvLmxlbmd0aCA9PT0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2VydmVySW5mby5zb3J0KChhLGIpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBhLnNvcnQgLSBiLnNvcnRcclxuICAgICAgICB9KVxyXG4gICAgICAgIGxldCBzZWxlY3QgPSAtMVxyXG4gICAgICAgIC8qKuWIneWni+WMlml0ZW0gKi9cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5zZXJ2ZXJJbmZvLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbURhdGEgPSB0aGlzLnNlcnZlckluZm9baW5kZXhdO1xyXG4gICAgICAgICAgICBpZighaXRlbURhdGEuc3RhdHVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vaXRlbURhdGEuaWQgPSBHbG9iYWwuVG9vbGtpdC5tZDUoaXRlbURhdGEpXHJcbiAgICAgICAgICAgIGxldCBub2RlIDpjYy5Ob2RlID0gdGhpcy5pdGVtUG9vbC5nZXRJdGVtKCk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gbm9kZS5nZXRDb21wb25lbnQoXCJTZXJ2aWNlTGVmdEl0ZW1cIilcclxuICAgICAgICAgICAgaXRlbS5TZXRUb2dnbGVDaGVja2VkKGZhbHNlKTtcclxuICAgICAgICAgICAgc2VsZWN0ICs9IDFcclxuICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQodGhpcy5jb250ZW50Tm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZUxpc3QucHVzaChub2RlKTtcclxuICAgICAgICAgICAgaWYoaXRlbSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBpdGVtLm9uSW5pdChpdGVtRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoc2VsZWN0ID09PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KClcclxuICAgICAgICAgICAgICAgIGl0ZW0uU2V0VG9nZ2xlQ2hlY2tlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaFJpZ2h0UGFuZWwoaXRlbURhdGEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIG5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLmxlZnRJdGVtQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5o6S5bqPXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgLy8gZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuY29udGVudE5vZGUuY2hpbGRyZW5Db3VudDsgaW5kZXgrKykge1xyXG4gICAgICAgIC8vICAgICBsZXQgaXRlbURhdGEgPSB0aGlzLmNvbnRlbnROb2RlLmNoaWxkcmVuW2luZGV4XS5nZXRDb21wb25lbnQoU2VydmljZUxlZnRJdGVtKS5nZXRHYW1lRGF0YSgpO1xyXG4gICAgICAgIC8vICAgICBpZihpdGVtRGF0YSlcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgbGV0IHNvcnQgPSBpdGVtRGF0YS5zb3J0IC0xIFxyXG4gICAgICAgIC8vICAgICAgICAgaWYoc29ydDwwKVxyXG4gICAgICAgIC8vICAgICAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHNvcnQgPSAwXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICBlbHNlIGlmKHNvcnQgPj10aGlzLmNvbnRlbnROb2RlLmNoaWxkcmVuQ291bnQpXHJcbiAgICAgICAgLy8gICAgICAgICB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgc29ydCA9IHRoaXMuY29udGVudE5vZGUuY2hpbGRyZW5Db3VudCAtIDFcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuY29udGVudE5vZGUuY2hpbGRyZW5baW5kZXhdLnNldFNpYmxpbmdJbmRleChzb3J0KVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyB0aGlzLk9uRGF0YVByZXBhcmVkKClcclxuICAgICAgICAvLyAvKipcclxuICAgICAgICAvLyAgKiDpgInkuK3nrKzkuIDkuKpcclxuICAgICAgICAvLyAgKi9cclxuICAgICAgICAvLyBpZih0aGlzLmNvbnRlbnROb2RlLmNoaWxkcmVuQ291bnQgPT0gMCkgcmV0dXJuXHJcbiAgICAgICAgLy8gbGV0IG5vZGUgPSB0aGlzLmNvbnRlbnROb2RlLmNoaWxkcmVuWzBdXHJcbiAgICAgICAgLy8gaWYgKG5vZGUpIHtcclxuICAgICAgICAvLyAgICAgbGV0IGl0ZW0gPSBub2RlLmdldENvbXBvbmVudChTZXJ2aWNlTGVmdEl0ZW0pXHJcbiAgICAgICAgLy8gICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgaXRlbURhdGEgPSBpdGVtLmdldEdhbWVEYXRhKCk7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnJlc2V0KClcclxuICAgICAgICAvLyAgICAgICAgIGl0ZW0uU2V0VG9nZ2xlQ2hlY2tlZCh0cnVlKTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMucmVmcmVzaFJpZ2h0UGFuZWwoaXRlbURhdGEpXHJcbiAgICAgICAgLy8gICAgIH1cclxuXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vdGhpcy5hZGRGQVEoKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRGQVEoKXtcclxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbVBvb2wuZ2V0SXRlbSgpO1xyXG4gICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvL2l0ZW0uZ2V0Q29tcG9uZW50KFwiRmVlZGJhY2tMZWZ0SXRlbVwiKS5vbkluaXQodGhpcy5sZWZ0SXRlbVs3XSk7XHJcbiAgICAgICAgbGV0IGRhdGEgOmFueSA9IHt9XHJcbiAgICAgICAgZGF0YS5uYW1lID0gXCJGQVFcIlxyXG4gICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFwiU2VydmljZUxlZnRJdGVtXCIpLm9uSW5pdChkYXRhKTtcclxuICAgICAgICBpdGVtLnNldFBhcmVudCh0aGlzLmNvbnRlbnROb2RlKTtcclxuICAgICAgICB0aGlzLm5vZGVMaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMubGVmdEl0ZW1DbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5PbkRhdGFQcmVwYXJlZCgpXHJcbiAgICB9XHJcblxyXG4gICAgbGVmdEl0ZW1DbGljayhldmVudCl7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgICAgIGxldCBpdGVtID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIGxldCBnYW1lTGlzdEl0ZW0gPSBpdGVtLmdldENvbXBvbmVudChcIlNlcnZpY2VMZWZ0SXRlbVwiKTtcclxuICAgICAgICBsZXQgZ2FtZURhdGEgPSBnYW1lTGlzdEl0ZW0uZ2V0R2FtZURhdGEoKTtcclxuICAgICAgICAvL3RoaXMuRkFRLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5vbmxpbmVTZXJ2aWNlTm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5ub01zZ1RpcHMuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICBpZihnYW1lRGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zZWxlY3RJZCA9IGdhbWVEYXRhLmlkXHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFJpZ2h0UGFuZWwoZ2FtZURhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICBcclxuICAgIHJlZnJlc2hSaWdodFBhbmVsKGdhbWVEYXRhOiBhbnkpIHtcclxuXHJcbiAgICAgICAgbGV0IGFyciA9IGdhbWVEYXRhLndpbmRvd3NcclxuICAgICAgICBpZighYXJyIHx8ICFhcnIubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5ub01zZ1RpcHMuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB0aGlzLm9ubGluZVNlcnZpY2VOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmhpZGVBbGxJdGVtKClcclxuICAgICAgICB0aGlzLm9ubGluZVNlcnZpY2VOb2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB0aGlzLm5vTXNnVGlwcy5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gYXJyW2luZGV4XTtcclxuICAgICAgICAgICAgaWYoaW5kZXg8dGhpcy5zZXJ2aWNlSXRlbU5vZGVMaXN0Lmxlbmd0aCAmJiB0aGlzLnNlcnZpY2VJdGVtTm9kZUxpc3RbaW5kZXhdICYmIGVsZW1lbnQudHlwZSApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZUl0ZW1Ob2RlTGlzdFtpbmRleF0uZ2V0Q29tcG9uZW50KEZlZWRiYWNrU2VydmljZUl0ZW0pLnJlZnJlc2hVSShlbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlSXRlbU5vZGVMaXN0W2luZGV4XS5hY3RpdmUgPSB0cnVlXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoaWRlQWxsSXRlbSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlSXRlbU5vZGVMaXN0LmZvckVhY2goKGVsZSk9PntcclxuICAgICAgICAgICAgaWYoY2MuaXNWYWxpZChlbGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMubGVmdFBhbmVsID0gdGhpcy5nZXRDaGlsZChcIkxlZnRQYW5lbFwiKTtcclxuICAgICAgICB0aGlzLnJpZ2h0UGFuZWwgPSB0aGlzLmdldENoaWxkKFwiUmlnaHRQYW5lbFwiKTtcclxuICAgICAgICB0aGlzLmNvcHlJdGVtID0gdGhpcy5nZXRDaGlsZChcIkxlZnRQYW5lbC9Nc2dJdGVtXCIpO1xyXG4gICAgICAgIHRoaXMuY29weUl0ZW0uYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB0aGlzLmNvbnRlbnROb2RlID0gdGhpcy5nZXRDaGlsZChcIkxlZnRQYW5lbC9zY3JvbGx2aWV3L3ZpZXcvY29udGVudFwiKTtcclxuICAgICAgICAvL3RoaXMucmlnaHRQYW5lbFZpZXcgPSA8UmlnaHRQYW5lbFZpZXc+dGhpcy5hZGRWaWV3KFwiUmlnaHRQYW5lbFZpZXdcIix0aGlzLnJpZ2h0UGFuZWwsUmlnaHRQYW5lbFZpZXcpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjbG9zZVwiLCB0aGlzLmNsb3NlV25kLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmluaXRJdGVtUG9vbCgpO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCAzOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXRoID0gYFJpZ2h0UGFuZWwvb25saW5lU2VydmljZS9zY3JvbGxWaWV3L3ZpZXcvY29udGVudC9zZXJ2aWNlXyR7aW5kZXh9YFxyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZ2V0Q2hpbGQocGF0aClcclxuICAgICAgICAgICAgaWYobm9kZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlSXRlbU5vZGVMaXN0LnB1c2gobm9kZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mZWVkYmFja05vZGUgPSB0aGlzLmdldENoaWxkKFwiUmlnaHRQYW5lbC9mZWVkYmFja1wiKVxyXG4gICAgICAgIGlmKHRoaXMuZmVlZGJhY2tOb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5mZWVkYmFja05vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mZWVkYmFjazJOb2RlID0gdGhpcy5nZXRDaGlsZChcIlJpZ2h0UGFuZWwvZmVlZGJhY2syXCIpXHJcbiAgICAgICAgaWYodGhpcy5mZWVkYmFjazJOb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5mZWVkYmFjazJOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnF1aWNrRmVlZGJhY2tOb2RlID0gdGhpcy5nZXRDaGlsZChcIlJpZ2h0UGFuZWwvZmVlZGJhY2tXcml0ZVwiKVxyXG4gICAgICAgIGlmKHRoaXMucXVpY2tGZWVkYmFja05vZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnF1aWNrRmVlZGJhY2tOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkZBUSA9IHRoaXMuZ2V0Q2hpbGQoXCJSaWdodFBhbmVsL0ZBUVwiKVxyXG4gICAgICAgIGlmKHRoaXMuRkFRKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5GQVEuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub01zZ1RpcHMgPSB0aGlzLmdldENoaWxkKFwiUmlnaHRQYW5lbC9ub01zZ1RpcHNcIilcclxuICAgICAgICBpZih0aGlzLm5vTXNnVGlwcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubm9Nc2dUaXBzLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25saW5lU2VydmljZU5vZGUgPSB0aGlzLmdldENoaWxkKFwiUmlnaHRQYW5lbC9vbmxpbmVTZXJ2aWNlXCIpXHJcbiAgICAgICAgaWYodGhpcy5vbmxpbmVTZXJ2aWNlTm9kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMub25saW5lU2VydmljZU5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xvc2VXbmQoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdEl0ZW1Qb29sKCkge1xyXG5cclxuICAgICAgICB0aGlzLml0ZW1Qb29sID0gbmV3IExlZnRJdGVtUG9vbCh0aGlzLmNvcHlJdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICByZXNldCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5GQVEuYWN0aXZlID1mYWxzZVxyXG4gICAgICAgIHRoaXMub25saW5lU2VydmljZU5vZGUuYWN0aXZlID1mYWxzZVxyXG4gICAgICAgIHRoaXMubm9Nc2dUaXBzLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCkge1xyXG4gICAgICAgIC8qIHRoaXMuY29udGVudE5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5pdGVtUG9vbC5yZXNldFBvb2woKTtcclxuICAgICAgICB0aGlzLm5vZGVMaXN0ID0gW107ICovXHJcbiAgICAgICAgaWYodGhpcy5ub2RlTGlzdCl7XHJcbiAgICAgICAgICAgIHRoaXMucmVjeWNsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKCkge1xyXG5cclxuICAgICAgICB0aGlzLml0ZW1Qb29sLnJlc2V0UG9vbCgpO1xyXG4gICAgICAgIHRoaXMubm9kZUxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLml0ZW1Qb29sID0gbnVsbFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWN5Y2xlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLml0ZW1Qb29sLnJlY3ljbGVBbGwodGhpcy5ub2RlTGlzdCk7XHJcbiAgICAgICAgdGhpcy5ub2RlTGlzdCA9IFtdO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuY2xhc3MgTGVmdEl0ZW1Qb29sIGV4dGVuZHMgUG9vbEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3B5Tm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUl0ZW0oKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLmluc3RhbnRpYXRlKHRoaXMuY29weU5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCByZXNldEl0ZW0obm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbm9kZS5zZXRQYXJlbnQobnVsbCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVjeWNsZUFsbChhcnI6IEFycmF5PGFueT4pIHtcclxuICAgICAgICBzdXBlci5yZWN5Y2xlQWxsKGFycik7XHJcbiAgICAgICAvKiAgYXJyLmZvckVhY2goZWxlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEl0ZW0oZWxlKTtcclxuICAgICAgICB9KTsgKi9cclxuXHJcbiAgICB9XHJcbn0iXX0=