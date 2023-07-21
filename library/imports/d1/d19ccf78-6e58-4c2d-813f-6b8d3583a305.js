"use strict";
cc._RF.push(module, 'd19cc94blhMLYE/a401g6MF', 'GroupItem');
// hall/scripts/logic/hall/ui/Spread/GroupItem.ts

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
var GroupItem = /** @class */ (function (_super) {
    __extends(GroupItem, _super);
    function GroupItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bgIcon = null;
        /**游戏id */
        _this.IdLabel = null;
        /**直属业绩名字 */
        _this.NameLabel = null;
        /**下级业绩 */
        _this.VatLable = null;
        /**佣金 */
        _this.GroupPopulation = null;
        _this.Icon = null;
        /**团队人数 */
        _this.GroupVat = null;
        return _this;
    }
    GroupItem.prototype.Init = function (data, j) {
        var SpreadModel = Global.ModelManager.getModel("SpreadModel");
        var cmmi_type = SpreadModel.commiType;
        if (data == null) {
            this.Icon.node.active = false;
            this.IdLabel.string = "";
            this.NameLabel.string = "";
            this.VatLable.string = "";
            this.GroupVat.string = "";
            this.GroupPopulation.string = "";
        }
        else {
            if (j % 2 == 0) {
                this.bgIcon.node.active = true;
            }
            else {
                this.bgIcon.node.active = false;
            }
            if (cmmi_type == 1) {
                // this.Icon.node.active = (data.is_new == 1)
                // this.IdLabel.string = data.user_id
                // this.NameLabel.string = Global.Toolkit.substrEndWithElli( data.name , 8)
                // this.VatLable.string = Global.Toolkit.formatPointStr(data.percent, true)
                // this.GroupVat.string = Global.Toolkit.formatPointStr(data.team_percent, true)
                // this.GroupPopulation.string = data.team_num
            }
            else if (cmmi_type == 2) {
                this.IdLabel.string = data.user_id;
                this.NameLabel.string = Global.Toolkit.formatPointStr(data.unter_flow, true);
                this.VatLable.string = Global.Toolkit.formatPointStr(data.team_flow, true);
                this.GroupVat.string = data.team_num;
                this.GroupPopulation.string = Global.Toolkit.formatPointStr(data.commi, true);
            }
        }
    };
    __decorate([
        property(cc.Sprite)
    ], GroupItem.prototype, "bgIcon", void 0);
    __decorate([
        property(cc.Label)
    ], GroupItem.prototype, "IdLabel", void 0);
    __decorate([
        property(cc.Label)
    ], GroupItem.prototype, "NameLabel", void 0);
    __decorate([
        property(cc.Label)
    ], GroupItem.prototype, "VatLable", void 0);
    __decorate([
        property(cc.Label)
    ], GroupItem.prototype, "GroupPopulation", void 0);
    __decorate([
        property(cc.Sprite)
    ], GroupItem.prototype, "Icon", void 0);
    __decorate([
        property(cc.Label)
    ], GroupItem.prototype, "GroupVat", void 0);
    GroupItem = __decorate([
        ccclass
    ], GroupItem);
    return GroupItem;
}(cc.Component));
exports.default = GroupItem;

cc._RF.pop();