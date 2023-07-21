"use strict";
cc._RF.push(module, '26992UuFkJJuIMcjbXS+PPY', 'AwardRecordItem');
// hall/scripts/logic/hall/ui/Spread/AwardRecordItem.ts

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
var AwardRecordItem = /** @class */ (function (_super) {
    __extends(AwardRecordItem, _super);
    function AwardRecordItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TimeLabel = null;
        _this.TypeLabel = null;
        _this.Amount = null;
        return _this;
    }
    AwardRecordItem.prototype.Init = function (data) {
        var SpreadModel = Global.ModelManager.getModel("SpreadModel");
        var cmmi_type = SpreadModel.commiType;
        if (data == null) {
            this.TimeLabel.string = "";
            this.TypeLabel.string = "";
            this.Amount.string = "";
        }
        else {
            if (cmmi_type === 2) {
                this.TimeLabel.string = data.read_date + " " + data.read_time;
                this.TypeLabel.string = "业绩收入奖励";
            }
            else {
                this.TimeLabel.string = data.read_time;
            }
            if (data.read_type == 0) {
                this.TypeLabel.string = "推广税收奖励";
            }
            else if (data.read_type == 1) {
                this.TypeLabel.string = "自营税收奖励";
            }
            this.Amount.string = Global.Toolkit.formatPointStr(data.read_point);
        }
    };
    __decorate([
        property(cc.Label)
    ], AwardRecordItem.prototype, "TimeLabel", void 0);
    __decorate([
        property(cc.Label)
    ], AwardRecordItem.prototype, "TypeLabel", void 0);
    __decorate([
        property(cc.Label)
    ], AwardRecordItem.prototype, "Amount", void 0);
    AwardRecordItem = __decorate([
        ccclass
    ], AwardRecordItem);
    return AwardRecordItem;
}(cc.Component));
exports.default = AwardRecordItem;

cc._RF.pop();