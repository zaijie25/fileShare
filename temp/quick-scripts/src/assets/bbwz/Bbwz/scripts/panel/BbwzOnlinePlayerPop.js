"use strict";
cc._RF.push(module, '324efouKbpEVItbMK6AfMZl', 'BbwzOnlinePlayerPop');
// bbwz/Bbwz/scripts/panel/BbwzOnlinePlayerPop.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BbwzData_1 = require("../data/BbwzData");
var BbwzOnlinePlayerItem_1 = require("../component/BbwzOnlinePlayerItem");
var BbwzConstDefine_1 = require("../data/BbwzConstDefine");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 弹窗 在线玩家界面
 */
var BbwzOnlinePlayerPop = /** @class */ (function (_super) {
    __extends(BbwzOnlinePlayerPop, _super);
    function BbwzOnlinePlayerPop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingKey = "OnlinePlayerPop";
        _this.scrollView = null;
        // 滚动容器内的子节点（范例：用于生成多个）
        _this.itemNode = null;
        return _this;
    }
    BbwzOnlinePlayerPop.prototype.onLoad = function () {
        this.node.setContentSize(cc.Canvas.instance.node.getContentSize());
        this.maskNode = cc.find("mask", this.node);
        this.contentNode = cc.find("content", this.node);
        this.animComp = Global.UIHelper.addAnimComp(this.node, this.contentNode, this.maskNode);
        BbwzConstDefine_1.default.addCommonClick(this.contentNode, "button_close", this.onCloseClick, this);
        BbwzConstDefine_1.default.addCommonClick(this.node, "mask", this.onCloseClick, this, cc.Button.Transition.NONE);
        this.scrollView = cc.find("scrollview", this.contentNode).getComponent(cc.ScrollView);
        this.itemNode = cc.find("view/content/itemNode", this.scrollView.node);
        this.scrollViewCarmack = Global.UIHelper.addScrollViewCarmackComp(this.scrollView.node, this.itemNode, 5, 5, this, this.item_setter);
    };
    BbwzOnlinePlayerPop.prototype.onEnable = function () {
        var _this = this;
        this.animComp.doPopupOpenAnim(function () {
            _this.scrollView.scrollToTop();
        });
        this.scrollViewCarmack.clearView();
    };
    BbwzOnlinePlayerPop.prototype.onDisable = function () {
        Global.Event.event(GlobalEvent.HIDE_NET_WAITING, this.loadingKey);
    };
    /**
     * 子节点更新函数
     * @param itemNode
     * @param index
     */
    BbwzOnlinePlayerPop.prototype.item_setter = function (itemNode, index) {
        var data = this.scrollViewCarmack.allDatas[index];
        var itemComponent = Global.UIHelper.safeGetComponent(itemNode, "", BbwzOnlinePlayerItem_1.default);
        itemComponent.updateUI(data, index);
    };
    BbwzOnlinePlayerPop.prototype.updateAfterGetData = function () {
        this.updateUI();
    };
    BbwzOnlinePlayerPop.prototype.updateUI = function () {
        var datas = BbwzData_1.default.instance.onLinePlayerList;
        if (datas.length > 0) {
            Global.Event.event(GlobalEvent.HIDE_NET_WAITING, this.loadingKey);
            for (var index = 0; index < datas.length; index++) {
                var data = datas[index];
                data.index = index;
            }
            this.scrollViewCarmack.allDatas = datas;
            this.scrollViewCarmack.updateView();
        }
    };
    BbwzOnlinePlayerPop.prototype.onCloseClick = function () {
        var _this = this;
        BbwzConstDefine_1.default.playBtnSound();
        this.animComp.doPopupCloseAnim(function () {
            _this.node.active = false;
        });
    };
    BbwzOnlinePlayerPop = __decorate([
        ccclass
    ], BbwzOnlinePlayerPop);
    return BbwzOnlinePlayerPop;
}(cc.Component));
exports.default = BbwzOnlinePlayerPop;

cc._RF.pop();