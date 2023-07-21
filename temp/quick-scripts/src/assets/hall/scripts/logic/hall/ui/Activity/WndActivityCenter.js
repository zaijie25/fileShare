"use strict";
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