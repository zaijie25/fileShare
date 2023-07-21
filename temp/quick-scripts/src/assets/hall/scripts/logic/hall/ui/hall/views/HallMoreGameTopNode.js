"use strict";
cc._RF.push(module, 'efcfbzazNhPYIWYkSD2QHDn', 'HallMoreGameTopNode');
// hall/scripts/logic/hall/ui/hall/views/HallMoreGameTopNode.ts

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
var ViewBase_1 = require("../../../../core/ui/ViewBase");
var PlayerWallet_1 = require("../../../../core/component/PlayerWallet");
var PlayerHeadView_1 = require("./PlayerHeadView");
var HallBtnHelper_1 = require("./HallBtnHelper");
var GlobalEvent_1 = require("../../../../core/GlobalEvent");
var HallMoreGameTopNode = /** @class */ (function (_super) {
    __extends(HallMoreGameTopNode, _super);
    function HallMoreGameTopNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HallMoreGameTopNode.prototype.initView = function () {
        //头像组件
        this.playerHead = this.addView("PlayerHeadView", this.getChild("PlayerHeadView"), PlayerHeadView_1.default, true);
        //钱包组件
        this.playerWalllet = this.addView("PlayerWallet", this.getChild("PlayerHeadView/PlayerWallet"), PlayerWallet_1.default, true);
        this.playerWalllet.rechargeAction();
        //点击事件注册
        this.addCommonClick("PlayerHeadView/head", this.onHeadClick, this, null);
        this.addCommonClick("moreGameCloseBtn", this.onCloseMoreGame, this);
    };
    HallMoreGameTopNode.prototype.onSubViewShow = function () {
        this.playerWalllet.subViewState = true;
        this.playerHead.subViewState = true;
    };
    HallMoreGameTopNode.prototype.onSubViewHide = function () {
    };
    HallMoreGameTopNode.prototype.onDispose = function () {
    };
    /***************************************************** 点击事件区域 **************************************/
    HallMoreGameTopNode.prototype.onHeadClick = function () {
        HallBtnHelper_1.default.WndPersonalInfoOpen();
    };
    HallMoreGameTopNode.prototype.onCloseMoreGame = function () {
        Global.Event.event(GlobalEvent_1.default.CloseMoreGame, true);
    };
    return HallMoreGameTopNode;
}(ViewBase_1.default));
exports.default = HallMoreGameTopNode;

cc._RF.pop();