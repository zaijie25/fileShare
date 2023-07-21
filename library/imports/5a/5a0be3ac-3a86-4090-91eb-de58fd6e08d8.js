"use strict";
cc._RF.push(module, '5a0beOsOoZAkJHr3lj9bgjY', 'SpreadTutorialWin');
// hall/scripts/logic/hall/ui/Spread/SpreadTutorialWin.ts

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
var SpreadTutorialWin = /** @class */ (function (_super) {
    __extends(SpreadTutorialWin, _super);
    function SpreadTutorialWin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpreadTutorialWin.prototype.initView = function () {
        this.spreadModel = Global.ModelManager.getModel("SpreadModel");
        // this.spreadService = <SpreadServices>this.addView("spreadService", this.getChild("ServerNode"), SpreadServices);
        this.cmmi_type = this.spreadModel.commiType;
        if (this.cmmi_type == 2) {
            this.bigNode = this.getChild("big");
            this.addCommonClick("View/scrollview/view/content/Description", this.onDescription, this, null, 1);
            this.addCommonClick("View/scrollview/view/content/btnMoney", this.OnCommissionBtnClicked, this);
            this.addCommonClick("big/close", this.onBigclose, this);
        }
    };
    SpreadTutorialWin.prototype.onSubViewShow = function () {
        //this.spreadService.subViewState = true;
        // this.spreadModel.on(SpreadEvent.GetDayAgentCommi, this, this.OpenRrturnMoney);
    };
    SpreadTutorialWin.prototype.onSubViewHide = function () {
        // this.spreadModel.off(SpreadEvent.GetDayAgentCommi, this, this.OpenRrturnMoney);
    };
    SpreadTutorialWin.prototype.OnCommissionBtnClicked = function () {
        var data = this.spreadModel.CommidData;
        if (data == null) {
            this.spreadModel.GetDayAgentCommi();
        }
        else {
            Global.UI.show("WndCommissionlist", data);
        }
    };
    SpreadTutorialWin.prototype.onDescription = function () {
        this.bigNode.active = true;
    };
    SpreadTutorialWin.prototype.onBigclose = function () {
        this.bigNode.active = false;
    };
    return SpreadTutorialWin;
}(ViewBase_1.default));
exports.default = SpreadTutorialWin;

cc._RF.pop();