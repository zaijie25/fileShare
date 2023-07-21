"use strict";
cc._RF.push(module, 'c01bdW1h89GIpnYGvqL+A0R', 'AwardCommiItem');
// hall/scripts/logic/hall/ui/Spread/AwardCommiItem.ts

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
var AwardCommiItem = /** @class */ (function (_super) {
    __extends(AwardCommiItem, _super);
    function AwardCommiItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameLabel = null;
        _this.min_maxLabel = null;
        _this.commiLabel = null;
        return _this;
    }
    AwardCommiItem.prototype.Init = function (data) {
        if (data == null) {
            this.nameLabel.string = "";
            this.min_maxLabel.string = "";
            this.commiLabel.string = "";
        }
        else {
            this.nameLabel.string = data.name;
            if (data.max_point === 0) {
                var max = data.min_point;
                if (data.min_point >= 10000) {
                    max = (data.min_point / 10000).toString() + "万";
                }
                this.min_maxLabel.string = max + "以上";
            }
            else {
                var min = data.min_point;
                var max = data.max_point;
                if (data.min_point >= 10000) {
                    min = (data.min_point / 10000).toString() + "万";
                }
                if (data.max_point >= 10000) {
                    max = (data.max_point / 10000).toString() + "万";
                }
                this.min_maxLabel.string = min.toString() + "-" + max.toString();
            }
            this.commiLabel.string = data.commi + "/万";
        }
    };
    __decorate([
        property(cc.Label)
    ], AwardCommiItem.prototype, "nameLabel", void 0);
    __decorate([
        property(cc.Label)
    ], AwardCommiItem.prototype, "min_maxLabel", void 0);
    __decorate([
        property(cc.Label)
    ], AwardCommiItem.prototype, "commiLabel", void 0);
    AwardCommiItem = __decorate([
        ccclass
    ], AwardCommiItem);
    return AwardCommiItem;
}(cc.Component));
exports.default = AwardCommiItem;

cc._RF.pop();