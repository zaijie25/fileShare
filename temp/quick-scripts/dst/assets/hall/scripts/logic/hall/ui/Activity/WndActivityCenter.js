
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Activity/WndActivityCenter.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cc8fapPcF5JKbVZ7JYIQqBq', 'WndActivityCenter');
// hall/scripts/logic/hall/ui/Activity/WndActivityCenter.ts

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
exports.ActivityEntity = void 0;
var WndBase_1 = require("../../../core/ui/WndBase");
var PoolBase_1 = require("../../../core/tool/PoolBase");
var ActivityRightPanelView_1 = require("./ActivityRightPanelView");
var ServicerItem_1 = require("../serviver/ServicerItem");
var HallPopMsgHelper_1 = require("../../tool/HallPopMsgHelper");
var HallModel_1 = require("../../../hallcommon/model/HallModel");
var ActivityConstants_1 = require("./ActivityConstants");
var HallBtnHelper_1 = require("../hall/views/HallBtnHelper");
var WndActivityCenter = /** @class */ (function (_super) {
    __extends(WndActivityCenter, _super);
    function WndActivityCenter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeList = [];
        _this.actMap = null;
        _this.waittingNode = null;
        _this.timer = null;
        return _this;
    }
    WndActivityCenter.prototype.onInit = function () {
        this.name = "WndActivityCenter";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/ActivityCenter/ActivityCenterUI";
        this.hallModel = Global.ModelManager.getModel("HallModel");
        this.isNeedDelay = true;
        this.destoryType = WndBase_1.DestoryType.ChangeScene;
    };
    WndActivityCenter.prototype.onOpen = function () {
        this.initActivityLeft();
        this.activityPanelView.subViewState = true;
    };
    WndActivityCenter.prototype.initActivityLeft = function () {
        var _this = this;
        // if (this.actMap && this.actMap.size > 0 && cc.isValid(this.node)) {
        //     this.initLeftItem();
        //     return
        // }
        // HallPopMsgHelper.Instance.releaseLock(PopWndName.ActivityCenter);
        this.hallModel.requestMyActivityList(function (info) {
            _this.OnDataPrepared();
            _this.actMap = info;
            if (_this.actMap.size == 0) {
                _this.contentNode.removeAllChildren();
                _this.itemPool.resetPool();
                _this.nodeList = [];
                _this.activityPanelView.changeView(ActivityConstants_1.ActivityType.noMsgTips);
                _this.showZi();
                return;
            }
            if (cc.isValid(_this.node)) {
                _this.initLeftItem();
            }
        });
    };
    WndActivityCenter.prototype.openAnimFinish = function () {
    };
    WndActivityCenter.prototype.initLeftItem = function () {
        this.recycle();
        this.nodeList = [];
        this.contentNode.removeAllChildren();
        var mapInfo = this.actMap;
        var arrGen = this.actMap.keys();
        for (var i = 0; i < mapInfo.size; i++) {
            var key = arrGen.next().value;
            var entity = mapInfo.get(key);
            if (entity.status == 0) {
                continue;
            }
            var item = this.itemPool.getItem();
            item.active = true;
            item.name = entity.atype.toString();
            var itemEntity = item.getComponent("FeedbackLeftItem");
            itemEntity.onInit(entity.name);
            itemEntity.entityData = entity;
            // itemEntity
            item.setParent(this.contentNode);
            this.nodeList.push(item);
            item.on(cc.Node.EventType.TOUCH_END, this.leftItemClick, this);
            var path = "hall/texture/commonui/common";
            var typeName = "";
            if (entity.flag == 1) {
                typeName = "bq_huobao";
            }
            else if (entity.flag == 2) {
                typeName = "bq_xingzeng";
            }
            item.getComponent("FeedbackLeftItem").SetTypeSprite(path, typeName);
            // item.getChildByName("typeSprite").getChildByName("la").getComponent(cc.Label).string=typeName
            item.getChildByName("Background").active = true;
            if (i == 0) {
                item.getComponent("FeedbackLeftItem").SetToggleChecked(true);
                item.getChildByName("Background").active = false;
                if (entity.ptype == 1) {
                    this.activityPanelView.changeView(ActivityConstants_1.ActivityType.picture, entity);
                }
                else {
                    this.activityPanelView.changeView(entity.atype, entity);
                }
                this.changeService(entity);
                if (typeName) {
                    this.moveFlag(item);
                }
            }
        }
        if (this.sc) {
            this.sc.scrollToTop();
        }
    };
    WndActivityCenter.prototype.moveFlag = function (item, reset) {
        if (!item || !cc.isValid(item))
            return;
        var flagNode = cc.find("typeSprite", item);
        if (reset) {
            if (flagNode) {
                // flagNode.setPosition(65, 30);
            }
            return;
        }
        if (flagNode) {
            // flagNode.setPosition(65, 30)
        }
    };
    WndActivityCenter.prototype.leftItemClick = function (event) {
        Global.Audio.playBtnSound();
        var item = event.target;
        if (!item.getChildByName("Background").active) {
            return;
        }
        this.resetItemFlag();
        var itmeParent = event.target.parent;
        itmeParent.children.forEach(function (element) {
            element.getChildByName("Background").active = true;
        });
        item.getChildByName("Background").active = false;
        var leftItem = item.getComponent("FeedbackLeftItem");
        var entityData = leftItem.entityData;
        if (entityData && entityData.ptype == 1) {
            this.activityPanelView.changeView(ActivityConstants_1.ActivityType.picture, entityData);
        }
        else {
            this.activityPanelView.changeView(entityData.atype, entityData);
        }
        this.moveFlag(item);
        this.changeService(entityData);
    };
    WndActivityCenter.prototype.resetItemFlag = function () {
        for (var index = 0; index < this.nodeList.length; index++) {
            var element = this.nodeList[index];
            if (element) {
                var leftItem = element.getComponent("FeedbackLeftItem");
                if (leftItem && leftItem.node) {
                    this.moveFlag(leftItem.node, true);
                }
            }
        }
    };
    WndActivityCenter.prototype.changeService = function (data) {
        var serviceData1 = {};
        var serviceData2 = {};
        serviceData1 = data.job1;
        serviceData2 = data.job2;
        if ((serviceData1.type == 0 && serviceData2.type == 0)) {
            this.showZi();
        }
        else {
            this.ziSprite.active = false;
            if (serviceData1) {
                this.Servicer1.active = true;
                this.Servicer1.getComponent(ServicerItem_1.default).setData(serviceData1);
            }
            if (serviceData2) {
                this.Servicer2.active = true;
                this.Servicer2.getComponent(ServicerItem_1.default).setData(serviceData2);
            }
        }
    };
    WndActivityCenter.prototype.showZi = function () {
        this.Servicer1.active = false;
        this.Servicer2.active = false;
        this.ziSprite.active = true;
    };
    WndActivityCenter.prototype.initView = function () {
        this.waittingNode = this.getChild("waittingNode");
        if (this.waittingNode) {
            this.waittingNode.active = false;
        }
        this.sc = this.getComponent("LeftPanel/scrollview", cc.ScrollView);
        this.leftPanel = this.getChild("LeftPanel");
        this.activityPanel = this.getChild("RightPanel");
        this.copyItem = this.getChild("LeftPanel/MsgItem");
        this.contentNode = this.getChild("LeftPanel/scrollview/view/content");
        this.ziSprite = this.getChild("service/ziSprite");
        this.Servicer1 = this.getChild("service/Servicer1");
        this.Servicer2 = this.getChild("service/Servicer2");
        // this.addCommonClick("service/ziSprite/btn_normal_ljlj", this.onServiceClick, this);
        Global.Event.on(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, this, this.showWaitting);
        Global.Event.on(ActivityConstants_1.ActivityConstants.HIDE_ACT_WAITTING, this, this.showWaitting);
        this.addCommonClick("close", this.closeWnd, this);
        this.initItemPool();
        this.activityPanelView = this.addView("ActivityRightPanelView", this.activityPanel, ActivityRightPanelView_1.default);
    };
    WndActivityCenter.prototype.onServiceClick = function () {
        var kefuModel = Global.ModelManager.getModel("HallModel");
        kefuModel.closeRedSpot(HallModel_1.HallRedSpotType.Kefu);
        Global.Audio.playAudioSource("hall/sound/Customer_service");
        HallBtnHelper_1.default.WndServiceOpen();
    };
    WndActivityCenter.prototype.showWaitting = function (arg) {
        if (arg) {
            this.startWaittingTimer();
        }
        else {
            this.stopWaittingTimer();
        }
        if (this.waittingNode && this.waittingNode.isValid && this.waittingNode.active != arg)
            this.waittingNode.active = arg;
    };
    WndActivityCenter.prototype.stopWaittingTimer = function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };
    WndActivityCenter.prototype.startWaittingTimer = function () {
        var _this = this;
        this.stopWaittingTimer();
        this.timer = setTimeout(function () {
            _this.waittingNode.active = false;
        }, 10000);
    };
    WndActivityCenter.prototype.closeWnd = function () {
        this.close();
    };
    WndActivityCenter.prototype.initItemPool = function () {
        this.itemPool = new LeftItemPool(this.copyItem);
    };
    WndActivityCenter.prototype.onClose = function () {
        this.stopWaittingTimer();
        this.resetItemFlag();
        HallPopMsgHelper_1.default.Instance.releaseLock(HallPopMsgHelper_1.PopWndName.ActivityCenter);
    };
    WndActivityCenter.prototype.onDispose = function () {
        this.itemPool.resetPool();
        this.nodeList = [];
        this.stopWaittingTimer();
        Global.Event.off(ActivityConstants_1.ActivityConstants.SHOW_ACT_WAITTING, this, this.showWaitting);
        Global.Event.off(ActivityConstants_1.ActivityConstants.HIDE_ACT_WAITTING, this, this.showWaitting);
    };
    WndActivityCenter.prototype.recycle = function () {
        this.itemPool.recycleAll(this.nodeList);
        this.nodeList = [];
    };
    return WndActivityCenter;
}(WndBase_1.default));
exports.default = WndActivityCenter;
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
    };
    return LeftItemPool;
}(PoolBase_1.default));
/**
 * 活动数据实体类
 */
var ActivityEntity = /** @class */ (function () {
    function ActivityEntity() {
        this.flag = 0;
        this.atype = -1;
        this.ptype = 0; //1图片
        this.name = "";
        this.url = "";
        this.status = -1;
        this.red_status = -1; //红点 0 显示 其他不显示
        this.job1 = {
            type: 0,
            name: "",
            data: "" //客服号码
        };
        this.job2 = {
            type: 0,
            name: "",
            data: "" //客服号码
        };
    }
    return ActivityEntity;
}());
exports.ActivityEntity = ActivityEntity;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxBY3Rpdml0eVxcV25kQWN0aXZpdHlDZW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFnRTtBQUNoRSx3REFBbUQ7QUFDbkQsbUVBQThEO0FBQzlELHlEQUFvRDtBQUNwRCxnRUFBMkU7QUFDM0UsaUVBQWlGO0FBRWpGLHlEQUFzRTtBQUN0RSw2REFBd0Q7QUFFeEQ7SUFBK0MscUNBQU87SUFBdEQ7UUFBQSxxRUFpUkM7UUExUUcsY0FBUSxHQUFVLEVBQUUsQ0FBQztRQU1yQixZQUFNLEdBQWdDLElBQUksQ0FBQztRQUUzQyxrQkFBWSxHQUFZLElBQUksQ0FBQTtRQUU1QixXQUFLLEdBQVEsSUFBSSxDQUFBOztJQWdRckIsQ0FBQztJQTdQYSxrQ0FBTSxHQUFoQjtRQUVJLElBQUksQ0FBQyxJQUFJLEdBQUcsbUJBQW1CLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxpREFBaUQsQ0FBQztRQUNqRSxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQVcsQ0FBQyxXQUFXLENBQUM7SUFDL0MsQ0FBQztJQUVTLGtDQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7SUFDOUMsQ0FBQztJQUVELDRDQUFnQixHQUFoQjtRQUFBLGlCQXNCQztRQXJCRyxzRUFBc0U7UUFDdEUsMkJBQTJCO1FBQzNCLGFBQWE7UUFDYixJQUFJO1FBQ0osb0VBQW9F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LFdBQU0sR0FBVyxDQUFDLENBQUMsQ0FBQTtRQUNuQixlQUFVLEdBQVcsQ0FBQyxDQUFDLENBQUEsQ0FBRSxlQUFlO1FBQ3hDLFNBQUksR0FBUTtZQUNSLElBQUksRUFBRSxDQUFDO1lBQ1AsSUFBSSxFQUFFLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU07U0FDbEIsQ0FBQTtRQUNELFNBQUksR0FBUTtZQUNSLElBQUksRUFBRSxDQUFDO1lBQ1AsSUFBSSxFQUFFLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU07U0FDbEIsQ0FBQTtJQUNMLENBQUM7SUFBRCxxQkFBQztBQUFELENBbEJBLEFBa0JDLElBQUE7QUFsQlksd0NBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSwgeyBEZXN0b3J5VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IFBvb2xCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3Rvb2wvUG9vbEJhc2VcIjtcclxuaW1wb3J0IEFjdGl2aXR5UmlnaHRQYW5lbFZpZXcgZnJvbSBcIi4vQWN0aXZpdHlSaWdodFBhbmVsVmlld1wiO1xyXG5pbXBvcnQgU2VydmljZXJJdGVtIGZyb20gXCIuLi9zZXJ2aXZlci9TZXJ2aWNlckl0ZW1cIjtcclxuaW1wb3J0IEhhbGxQb3BNc2dIZWxwZXIsIHsgUG9wV25kTmFtZSB9IGZyb20gXCIuLi8uLi90b29sL0hhbGxQb3BNc2dIZWxwZXJcIjtcclxuaW1wb3J0IEhhbGxNb2RlbCwgeyBIYWxsUmVkU3BvdFR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9IYWxsTW9kZWxcIjtcclxuaW1wb3J0IEFwcEhlbHBlciBmcm9tIFwiLi4vLi4vLi4vY29yZS90b29sL0FwcEhlbHBlclwiO1xyXG5pbXBvcnQgeyBBY3Rpdml0eUNvbnN0YW50cywgQWN0aXZpdHlUeXBlIH0gZnJvbSBcIi4vQWN0aXZpdHlDb25zdGFudHNcIjtcclxuaW1wb3J0IEhhbGxCdG5IZWxwZXIgZnJvbSBcIi4uL2hhbGwvdmlld3MvSGFsbEJ0bkhlbHBlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kQWN0aXZpdHlDZW50ZXIgZXh0ZW5kcyBXbmRCYXNlIHtcclxuXHJcbiAgICBjb250ZW50Tm9kZTogY2MuTm9kZTtcclxuICAgIGNvcHlJdGVtOiBhbnk7XHJcbiAgICBsZWZ0UGFuZWw6IGNjLk5vZGU7XHJcbiAgICBhY3Rpdml0eVBhbmVsOiBjYy5Ob2RlO1xyXG4gICAgaXRlbVBvb2w6IExlZnRJdGVtUG9vbDtcclxuICAgIG5vZGVMaXN0OiBhbnlbXSA9IFtdO1xyXG4gICAgYWN0aXZpdHlQYW5lbFZpZXc6IEFjdGl2aXR5UmlnaHRQYW5lbFZpZXc7XHJcbiAgICB6aVNwcml0ZTogY2MuTm9kZTtcclxuICAgIFNlcnZpY2VyMTogY2MuTm9kZTtcclxuICAgIFNlcnZpY2VyMjogY2MuTm9kZTtcclxuICAgIGhhbGxNb2RlbDogSGFsbE1vZGVsO1xyXG4gICAgYWN0TWFwOiBNYXA8bnVtYmVyLCBBY3Rpdml0eUVudGl0eT4gPSBudWxsO1xyXG4gICAgc2M6IGNjLlNjcm9sbFZpZXdcclxuICAgIHdhaXR0aW5nTm9kZTogY2MuTm9kZSA9IG51bGxcclxuXHJcbiAgICB0aW1lcjogYW55ID0gbnVsbFxyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkge1xyXG5cclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZEFjdGl2aXR5Q2VudGVyXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IFwiUG9wTGF5ZXJcIjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9BY3Rpdml0eUNlbnRlci9BY3Rpdml0eUNlbnRlclVJXCI7XHJcbiAgICAgICAgdGhpcy5oYWxsTW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiSGFsbE1vZGVsXCIpO1xyXG4gICAgICAgIHRoaXMuaXNOZWVkRGVsYXkgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5kZXN0b3J5VHlwZSA9IERlc3RvcnlUeXBlLkNoYW5nZVNjZW5lO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy5pbml0QWN0aXZpdHlMZWZ0KCk7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0eVBhbmVsVmlldy5zdWJWaWV3U3RhdGUgPSB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEFjdGl2aXR5TGVmdCgpIHtcclxuICAgICAgICAvLyBpZiAodGhpcy5hY3RNYXAgJiYgdGhpcy5hY3RNYXAuc2l6ZSA+IDAgJiYgY2MuaXNWYWxpZCh0aGlzLm5vZGUpKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaW5pdExlZnRJdGVtKCk7XHJcbiAgICAgICAgLy8gICAgIHJldHVyblxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBIYWxsUG9wTXNnSGVscGVyLkluc3RhbmNlLnJlbGVhc2VMb2NrKFBvcFduZE5hbWUuQWN0aXZpdHlDZW50ZXIpO1xyXG4gICAgICAgIHRoaXMuaGFsbE1vZGVsLnJlcXVlc3RNeUFjdGl2aXR5TGlzdCgoaW5mbzogTWFwPG51bWJlciwgQWN0aXZpdHlFbnRpdHk+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuT25EYXRhUHJlcGFyZWQoKVxyXG4gICAgICAgICAgICB0aGlzLmFjdE1hcCA9IGluZm87XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdE1hcC5zaXplID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudE5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbVBvb2wucmVzZXRQb29sKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXR5UGFuZWxWaWV3LmNoYW5nZVZpZXcoQWN0aXZpdHlUeXBlLm5vTXNnVGlwcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3daaSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLm5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRMZWZ0SXRlbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5BbmltRmluaXNoKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbml0TGVmdEl0ZW0oKSB7XHJcbiAgICAgICAgdGhpcy5yZWN5Y2xlKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuY29udGVudE5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBsZXQgbWFwSW5mbzogTWFwPG51bWJlciwgQWN0aXZpdHlFbnRpdHk+ID0gdGhpcy5hY3RNYXA7XHJcbiAgICAgICAgbGV0IGFyckdlbiA9IHRoaXMuYWN0TWFwLmtleXMoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcEluZm8uc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSBhcnJHZW4ubmV4dCgpLnZhbHVlIGFzIG51bWJlcjtcclxuICAgICAgICAgICAgbGV0IGVudGl0eTogQWN0aXZpdHlFbnRpdHkgPSBtYXBJbmZvLmdldChrZXkpO1xyXG4gICAgICAgICAgICBpZiAoZW50aXR5LnN0YXR1cyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5pdGVtUG9vbC5nZXRJdGVtKCk7XHJcbiAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaXRlbS5uYW1lID0gZW50aXR5LmF0eXBlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGxldCBpdGVtRW50aXR5ID0gaXRlbS5nZXRDb21wb25lbnQoXCJGZWVkYmFja0xlZnRJdGVtXCIpO1xyXG4gICAgICAgICAgICBpdGVtRW50aXR5Lm9uSW5pdChlbnRpdHkubmFtZSk7XHJcbiAgICAgICAgICAgIGl0ZW1FbnRpdHkuZW50aXR5RGF0YSA9IGVudGl0eTtcclxuICAgICAgICAgICAgLy8gaXRlbUVudGl0eVxyXG4gICAgICAgICAgICBpdGVtLnNldFBhcmVudCh0aGlzLmNvbnRlbnROb2RlKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5sZWZ0SXRlbUNsaWNrLCB0aGlzKTtcclxuICAgICAgICAgICAgbGV0IHBhdGggPSBcImhhbGwvdGV4dHVyZS9jb21tb251aS9jb21tb25cIjtcclxuICAgICAgICAgICAgbGV0IHR5cGVOYW1lID0gXCJcIlxyXG4gICAgICAgICAgICBpZiAoZW50aXR5LmZsYWcgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdHlwZU5hbWUgPSBcImJxX2h1b2Jhb1wiXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZW50aXR5LmZsYWcgPT0gMikge1xyXG4gICAgICAgICAgICAgICAgdHlwZU5hbWUgPSBcImJxX3hpbmd6ZW5nXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChcIkZlZWRiYWNrTGVmdEl0ZW1cIikuU2V0VHlwZVNwcml0ZShwYXRoLCB0eXBlTmFtZSk7XHJcbiAgICAgICAgICAgIC8vIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0eXBlU3ByaXRlXCIpLmdldENoaWxkQnlOYW1lKFwibGFcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmc9dHlwZU5hbWVcclxuICAgICAgICAgICAgaXRlbS5nZXRDaGlsZEJ5TmFtZShcIkJhY2tncm91bmRcIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoXCJGZWVkYmFja0xlZnRJdGVtXCIpLlNldFRvZ2dsZUNoZWNrZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChlbnRpdHkucHR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlQYW5lbFZpZXcuY2hhbmdlVmlldyhBY3Rpdml0eVR5cGUucGljdHVyZSwgZW50aXR5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlQYW5lbFZpZXcuY2hhbmdlVmlldyhlbnRpdHkuYXR5cGUsIGVudGl0eSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVNlcnZpY2UoZW50aXR5KTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZUZsYWcoaXRlbSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNjKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Muc2Nyb2xsVG9Ub3AoKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIG1vdmVGbGFnKGl0ZW0sIHJlc2V0Pykge1xyXG4gICAgICAgIGlmICghaXRlbSB8fCAhY2MuaXNWYWxpZChpdGVtKSkgcmV0dXJuXHJcbiAgICAgICAgbGV0IGZsYWdOb2RlID0gY2MuZmluZChcInR5cGVTcHJpdGVcIiwgaXRlbSk7XHJcbiAgICAgICAgaWYgKHJlc2V0KSB7XHJcbiAgICAgICAgICAgIGlmIChmbGFnTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gZmxhZ05vZGUuc2V0UG9zaXRpb24oNjUsIDMwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZsYWdOb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIGZsYWdOb2RlLnNldFBvc2l0aW9uKDY1LCAzMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGVmdEl0ZW1DbGljayhldmVudCkge1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICBsZXQgaXRlbSA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICBpZiggIWl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLmFjdGl2ZSl7cmV0dXJufVxyXG4gICAgICAgIHRoaXMucmVzZXRJdGVtRmxhZygpXHJcbiAgICAgICAgbGV0IGl0bWVQYXJlbnQgPSBldmVudC50YXJnZXQucGFyZW50XHJcbiAgICAgICAgaXRtZVBhcmVudC5jaGlsZHJlbi5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBlbGVtZW50LmdldENoaWxkQnlOYW1lKFwiQmFja2dyb3VuZFwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJCYWNrZ3JvdW5kXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBsZWZ0SXRlbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KFwiRmVlZGJhY2tMZWZ0SXRlbVwiKTtcclxuICAgICAgICBsZXQgZW50aXR5RGF0YSA9IGxlZnRJdGVtLmVudGl0eURhdGE7XHJcbiAgICAgICAgaWYgKGVudGl0eURhdGEgJiYgZW50aXR5RGF0YS5wdHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlQYW5lbFZpZXcuY2hhbmdlVmlldyhBY3Rpdml0eVR5cGUucGljdHVyZSwgZW50aXR5RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5UGFuZWxWaWV3LmNoYW5nZVZpZXcoZW50aXR5RGF0YS5hdHlwZSwgZW50aXR5RGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1vdmVGbGFnKGl0ZW0pXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VTZXJ2aWNlKGVudGl0eURhdGEpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXNldEl0ZW1GbGFnKCkge1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLm5vZGVMaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMubm9kZUxpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlZnRJdGVtID0gZWxlbWVudC5nZXRDb21wb25lbnQoXCJGZWVkYmFja0xlZnRJdGVtXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlZnRJdGVtICYmIGxlZnRJdGVtLm5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVGbGFnKGxlZnRJdGVtLm5vZGUsIHRydWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVNlcnZpY2UoZGF0YSkge1xyXG4gICAgICAgIGxldCBzZXJ2aWNlRGF0YTE6IGFueSA9IHt9O1xyXG4gICAgICAgIGxldCBzZXJ2aWNlRGF0YTI6IGFueSA9IHt9O1xyXG4gICAgICAgIHNlcnZpY2VEYXRhMSA9IGRhdGEuam9iMTtcclxuICAgICAgICBzZXJ2aWNlRGF0YTIgPSBkYXRhLmpvYjI7XHJcbiAgICAgICAgaWYgKChzZXJ2aWNlRGF0YTEudHlwZSA9PSAwICYmIHNlcnZpY2VEYXRhMi50eXBlID09IDApKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1ppKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy56aVNwcml0ZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHNlcnZpY2VEYXRhMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TZXJ2aWNlcjEuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2VydmljZXIxLmdldENvbXBvbmVudChTZXJ2aWNlckl0ZW0pLnNldERhdGEoc2VydmljZURhdGExKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2VydmljZURhdGEyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNlcnZpY2VyMi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TZXJ2aWNlcjIuZ2V0Q29tcG9uZW50KFNlcnZpY2VySXRlbSkuc2V0RGF0YShzZXJ2aWNlRGF0YTIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd1ppKCkge1xyXG4gICAgICAgIHRoaXMuU2VydmljZXIxLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuU2VydmljZXIyLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuemlTcHJpdGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy53YWl0dGluZ05vZGUgPSB0aGlzLmdldENoaWxkKFwid2FpdHRpbmdOb2RlXCIpXHJcbiAgICAgICAgaWYgKHRoaXMud2FpdHRpbmdOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdHRpbmdOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2MgPSB0aGlzLmdldENvbXBvbmVudDxjYy5TY3JvbGxWaWV3PihcIkxlZnRQYW5lbC9zY3JvbGx2aWV3XCIsIGNjLlNjcm9sbFZpZXcpXHJcbiAgICAgICAgdGhpcy5sZWZ0UGFuZWwgPSB0aGlzLmdldENoaWxkKFwiTGVmdFBhbmVsXCIpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdHlQYW5lbCA9IHRoaXMuZ2V0Q2hpbGQoXCJSaWdodFBhbmVsXCIpO1xyXG4gICAgICAgIHRoaXMuY29weUl0ZW0gPSB0aGlzLmdldENoaWxkKFwiTGVmdFBhbmVsL01zZ0l0ZW1cIik7XHJcbiAgICAgICAgdGhpcy5jb250ZW50Tm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJMZWZ0UGFuZWwvc2Nyb2xsdmlldy92aWV3L2NvbnRlbnRcIik7XHJcbiAgICAgICAgdGhpcy56aVNwcml0ZSA9IHRoaXMuZ2V0Q2hpbGQoXCJzZXJ2aWNlL3ppU3ByaXRlXCIpO1xyXG4gICAgICAgIHRoaXMuU2VydmljZXIxID0gdGhpcy5nZXRDaGlsZChcInNlcnZpY2UvU2VydmljZXIxXCIpO1xyXG4gICAgICAgIHRoaXMuU2VydmljZXIyID0gdGhpcy5nZXRDaGlsZChcInNlcnZpY2UvU2VydmljZXIyXCIpO1xyXG4gICAgICAgIC8vIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJzZXJ2aWNlL3ppU3ByaXRlL2J0bl9ub3JtYWxfbGpsalwiLCB0aGlzLm9uU2VydmljZUNsaWNrLCB0aGlzKTtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oQWN0aXZpdHlDb25zdGFudHMuU0hPV19BQ1RfV0FJVFRJTkcsIHRoaXMsIHRoaXMuc2hvd1dhaXR0aW5nKVxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihBY3Rpdml0eUNvbnN0YW50cy5ISURFX0FDVF9XQUlUVElORywgdGhpcywgdGhpcy5zaG93V2FpdHRpbmcpXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNsb3NlXCIsIHRoaXMuY2xvc2VXbmQsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaW5pdEl0ZW1Qb29sKCk7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0eVBhbmVsVmlldyA9IDxBY3Rpdml0eVJpZ2h0UGFuZWxWaWV3PnRoaXMuYWRkVmlldyhcIkFjdGl2aXR5UmlnaHRQYW5lbFZpZXdcIiwgdGhpcy5hY3Rpdml0eVBhbmVsLCBBY3Rpdml0eVJpZ2h0UGFuZWxWaWV3KTtcclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uU2VydmljZUNsaWNrKCkge1xyXG4gICAgICAgIGxldCBrZWZ1TW9kZWwgPSA8SGFsbE1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJIYWxsTW9kZWxcIik7XHJcbiAgICAgICAga2VmdU1vZGVsLmNsb3NlUmVkU3BvdChIYWxsUmVkU3BvdFR5cGUuS2VmdSk7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlBdWRpb1NvdXJjZShcImhhbGwvc291bmQvQ3VzdG9tZXJfc2VydmljZVwiKVxyXG4gICAgICAgIEhhbGxCdG5IZWxwZXIuV25kU2VydmljZU9wZW4oKTtcclxuICAgIH1cclxuICAgIHNob3dXYWl0dGluZyhhcmcpIHtcclxuICAgICAgICBpZiAoYXJnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnRXYWl0dGluZ1RpbWVyKClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFdhaXR0aW5nVGltZXIoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy53YWl0dGluZ05vZGUgJiYgdGhpcy53YWl0dGluZ05vZGUuaXNWYWxpZCAmJiB0aGlzLndhaXR0aW5nTm9kZS5hY3RpdmUgIT0gYXJnKVxyXG4gICAgICAgICAgICB0aGlzLndhaXR0aW5nTm9kZS5hY3RpdmUgPSBhcmdcclxuICAgIH1cclxuICAgIHN0b3BXYWl0dGluZ1RpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXJ0V2FpdHRpbmdUaW1lcigpIHtcclxuICAgICAgICB0aGlzLnN0b3BXYWl0dGluZ1RpbWVyKClcclxuICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMud2FpdHRpbmdOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgfSwgMTAwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xvc2VXbmQoKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdEl0ZW1Qb29sKCkge1xyXG4gICAgICAgIHRoaXMuaXRlbVBvb2wgPSBuZXcgTGVmdEl0ZW1Qb29sKHRoaXMuY29weUl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuc3RvcFdhaXR0aW5nVGltZXIoKVxyXG4gICAgICAgIHRoaXMucmVzZXRJdGVtRmxhZygpXHJcbiAgICAgICAgSGFsbFBvcE1zZ0hlbHBlci5JbnN0YW5jZS5yZWxlYXNlTG9jayhQb3BXbmROYW1lLkFjdGl2aXR5Q2VudGVyKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtUG9vbC5yZXNldFBvb2woKTtcclxuICAgICAgICB0aGlzLm5vZGVMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5zdG9wV2FpdHRpbmdUaW1lcigpXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihBY3Rpdml0eUNvbnN0YW50cy5TSE9XX0FDVF9XQUlUVElORywgdGhpcywgdGhpcy5zaG93V2FpdHRpbmcpXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihBY3Rpdml0eUNvbnN0YW50cy5ISURFX0FDVF9XQUlUVElORywgdGhpcywgdGhpcy5zaG93V2FpdHRpbmcpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlY3ljbGUoKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtUG9vbC5yZWN5Y2xlQWxsKHRoaXMubm9kZUxpc3QpO1xyXG4gICAgICAgIHRoaXMubm9kZUxpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIExlZnRJdGVtUG9vbCBleHRlbmRzIFBvb2xCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29weU5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjcmVhdGVJdGVtKCkge1xyXG4gICAgICAgIHJldHVybiBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvcHlOb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVzZXRJdGVtKG5vZGU6IGNjLk5vZGUpIHtcclxuXHJcbiAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBub2RlLnNldFBhcmVudChudWxsKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZWN5Y2xlQWxsKGFycjogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIHN1cGVyLnJlY3ljbGVBbGwoYXJyKTtcclxuICAgIH1cclxufVxyXG4vKipcclxuICog5rS75Yqo5pWw5o2u5a6e5L2T57G7XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQWN0aXZpdHlFbnRpdHkge1xyXG4gICAgZmxhZzogbnVtYmVyID0gMDtcclxuICAgIGF0eXBlOiBudW1iZXIgPSAtMTtcclxuICAgIHB0eXBlOiBudW1iZXIgPSAwOyAvLzHlm77niYdcclxuICAgIG5hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICB1cmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBzdGF0dXM6IG51bWJlciA9IC0xXHJcbiAgICByZWRfc3RhdHVzOiBudW1iZXIgPSAtMSAgLy/nuqLngrkgMCDmmL7npLog5YW25LuW5LiN5pi+56S6XHJcbiAgICBqb2IxOiBhbnkgPSB7XHJcbiAgICAgICAgdHlwZTogMCwgLy/lrqLmnI3nsbvlnotcclxuICAgICAgICBuYW1lOiBcIlwiLCAvL+WuouacjeWQjeensFxyXG4gICAgICAgIGRhdGE6IFwiXCIgLy/lrqLmnI3lj7fnoIFcclxuICAgIH1cclxuICAgIGpvYjI6IGFueSA9IHtcclxuICAgICAgICB0eXBlOiAwLCAvL+Wuouacjeexu+Wei1xyXG4gICAgICAgIG5hbWU6IFwiXCIsIC8v5a6i5pyN5ZCN56ewXHJcbiAgICAgICAgZGF0YTogXCJcIiAvL+WuouacjeWPt+eggVxyXG4gICAgfVxyXG59Il19