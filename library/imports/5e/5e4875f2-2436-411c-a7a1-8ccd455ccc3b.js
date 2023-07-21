"use strict";
cc._RF.push(module, '5e487XyJDZBHKehjM1FXMw7', 'AwardDetailItem');
// hall/scripts/logic/hall/ui/Spread/AwardDetailItem.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AwardDetailItem = /** @class */ (function (_super) {
    __extends(AwardDetailItem, _super);
    function AwardDetailItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /***日期 */
        _this.TimeLabel = null;
        /**团队业绩 */
        _this.weekMyselfDir = null;
        /**直属业绩 */
        _this.WeekDirLabel = null;
        /** 下属业绩*/
        _this.WeekOtherLabel = null;
        /**所得佣金 */
        _this.Amount = null;
        return _this;
    }
    AwardDetailItem.prototype.Init = function (data) {
        var SpreadModel = Global.ModelManager.getModel("SpreadModel");
        var cmmi_type = SpreadModel.commiType;
        if (data == null) {
            this.TimeLabel.string = "";
            if (this.weekMyselfDir)
                this.weekMyselfDir.string = "";
            this.WeekDirLabel.string = "";
            this.WeekOtherLabel.string = "";
            this.Amount.string = "";
        }
        else {
            if (cmmi_type == 1) {
                // this.TimeLabel.string = data.send_time
                // if (this.weekMyselfDir)
                //     this.weekMyselfDir.string = Global.Toolkit.formatPointStr(data.self_point)
                // this.WeekDirLabel.string = Global.Toolkit.formatPointStr(data.unter_point)
                // this.Amount.string = Global.Toolkit.formatPointStr(data.total_point)
                // this.WeekOtherLabel.string = Global.Toolkit.formatPointStr(data.other_point)
            }
            if (cmmi_type == 2) {
                this.TimeLabel.string = data.time;
                if (this.weekMyselfDir)
                    this.weekMyselfDir.string = Global.Toolkit.formatPointStr(data.total_flow);
                this.WeekDirLabel.string = Global.Toolkit.formatPointStr(data.unter_flow);
                this.Amount.string = Global.Toolkit.formatPointStr(data.commi);
                this.WeekOtherLabel.string = Global.Toolkit.formatPointStr(data.team_flow);
            }
        }
    };
    __decorate([
        property(cc.Label)
    ], AwardDetailItem.prototype, "TimeLabel", void 0);
    __decorate([
        property(cc.Label)
    ], AwardDetailItem.prototype, "weekMyselfDir", void 0);
    __decorate([
        property(cc.Label)
    ], AwardDetailItem.prototype, "WeekDirLabel", void 0);
    __decorate([
        property(cc.Label)
    ], AwardDetailItem.prototype, "WeekOtherLabel", void 0);
    __decorate([
        property(cc.Label)
    ], AwardDetailItem.prototype, "Amount", void 0);
    AwardDetailItem = __decorate([
        ccclass
    ], AwardDetailItem);
    return AwardDetailItem;
}(cc.Component));
exports.default = AwardDetailItem;

cc._RF.pop();