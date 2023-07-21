"use strict";
cc._RF.push(module, '9b272O0S9FCU5XkRvQwWkKa', 'VipGiftView');
// hall/scripts/logic/hall/ui/playerInfo/VipGiftView.ts

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
var VipGiftViewItem_1 = require("./VipGiftViewItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * vip特权下的单个pageview视图
 */
var VipGiftView = /** @class */ (function (_super) {
    __extends(VipGiftView, _super);
    function VipGiftView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemList = [];
        return _this;
    }
    VipGiftView.prototype.initView = function () {
        for (var index = 0; index < 3; index++) {
            var item = cc.find("item_" + index, this.node);
            if (item) {
                this.itemList.push(item);
            }
        }
    };
    VipGiftView.prototype.refreshUI = function (data, pageIndex) {
        for (var index = 0; index < 3; index++) {
            if (this.itemList.length >= index) {
                if (this.itemList[index]) {
                    var viewItem = this.itemList[index].getComponent(VipGiftViewItem_1.default);
                    if (viewItem) {
                        viewItem.refreshUI(data, index, pageIndex);
                    }
                }
            }
        }
    };
    VipGiftView = __decorate([
        ccclass
    ], VipGiftView);
    return VipGiftView;
}(cc.Component));
exports.default = VipGiftView;

cc._RF.pop();