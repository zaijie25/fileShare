
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/VipPrivilegeView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9e921mg0V1KsL1KXAopQgq4', 'VipPrivilegeView');
// hall/scripts/logic/hall/ui/playerInfo/VipPrivilegeView.ts

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
exports.PrivilegeType = void 0;
var PlayerInfoModel_1 = require("../../../hallcommon/model/PlayerInfoModel");
var VipPrivilegeViewItem_1 = require("./VipPrivilegeViewItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VipPrivilegeView = /** @class */ (function (_super) {
    __extends(VipPrivilegeView, _super);
    function VipPrivilegeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.iconSprite = null;
        _this.level = null;
        _this.itemList = [];
        /**
        * 当前页的vip等级下的特权文本
        */
        _this.labelTequanArr = [];
        return _this;
    }
    VipPrivilegeView.prototype.initView = function () {
        this.iconSprite = cc.find("info_node/icon_vip", this.node).getComponent(cc.Sprite);
        this.level = cc.find("info_node/level", this.node).getComponent(cc.Label);
        for (var index = 0; index < 4; index++) {
            var node = cc.find("layout/item_" + index, this.node);
            if (cc.isValid(node)) {
                this.itemList.push(node);
            }
            if (index < 3) {
                node.active = false;
            }
        }
        for (var i = 0; i < 4; i++) {
            this.labelTequanArr[i] = cc.find("viptips/tip_" + (i + 1), this.node).getComponent(cc.Label);
            this.labelTequanArr[i].node.active = false;
        }
    };
    VipPrivilegeView.prototype.refreshUI = function (data, index, vip) {
        var myVip = Global.PlayerData.vip;
        var leftVip = vip - 1;
        var rightVip = vip;
        var toVip = myVip + 1;
        if (myVip < rightVip) {
            leftVip = myVip;
            toVip = rightVip;
        }
        var atlasString = "hall/texture/hall/vip_auto_atlas/vip_auto_atlas";
        var sfString0 = "img_viptb_" + rightVip;
        Global.ResourceManager.loadAutoAtlas(this.iconSprite, atlasString, sfString0, null, false);
        if (rightVip < 10) {
            this.labelTequanArr[0].string = "活动可领取更多奖励";
            this.labelTequanArr[0].node.active = true;
            this.labelTequanArr[1].string = "专属在线客服，24小时服务";
            this.labelTequanArr[1].node.active = true;
            this.labelTequanArr[2].string = "专属捕鱼炮台，捕鱼更加激情";
            this.labelTequanArr[2].node.active = true;
        }
        else {
            this.labelTequanArr[0].string = "活动可领取更多奖励";
            this.labelTequanArr[0].node.active = true;
            this.labelTequanArr[1].string = "专属在线客服，24小时服务";
            this.labelTequanArr[1].node.active = true;
            this.labelTequanArr[2].string = "专属捕鱼炮台，捕鱼更激情";
            this.labelTequanArr[2].node.active = true;
            this.labelTequanArr[3].string = "VIP专享表情，互动更炫丽";
            this.labelTequanArr[3].node.active = true;
        }
        if (PlayerInfoModel_1.default.instance.vipSubsidy != null && PlayerInfoModel_1.default.instance.vipSubsidyStatus == 1) {
            var subsidy = PlayerInfoModel_1.default.instance.vipSubsidy[rightVip];
            if (subsidy) {
                this.labelTequanArr[0].string = "每日可领转运金" + subsidy.times + "次";
            }
        }
        this.level.string = "VIP" + rightVip;
        // if (rightVip > 9) {
        //     this.richTextArr[1].string = "<b>V" + rightVip + "专属表情</b>";
        //     var sfPaotai = "biaoqing_" + rightVip;
        //     Global.ResourceManager.loadAutoAtlas(this.spriteIconArr[1], atlasString, sfPaotai, null, false);
        // }
        // else {
        //     this.richTextArr[1].string = "<b>V" + rightVip + "捕鱼炮台</b>";
        //     var sfPaotai = "paotai_" + rightVip;
        //     Global.ResourceManager.loadAutoAtlas(this.spriteIconArr[1], atlasString, sfPaotai, null, false);
        // }
        if (rightVip <= 8) {
            for (var index_1 = 0; index_1 < this.itemList.length - 2; index_1++) {
                var item = this.itemList[index_1];
                if (item) {
                    item.getComponent(VipPrivilegeViewItem_1.default).refreshUI(index_1, rightVip);
                    item.active = true;
                }
            }
        }
        else if (rightVip == 9) {
            for (var index_2 = 0; index_2 < this.itemList.length - 2; index_2++) {
                var item_1 = this.itemList[index_2];
                if (item_1) {
                    item_1.getComponent(VipPrivilegeViewItem_1.default).refreshUI(index_2, rightVip);
                    item_1.active = true;
                }
            }
            var item = this.itemList[2];
            if (item) {
                item.getComponent(VipPrivilegeViewItem_1.default).refreshUI(3, rightVip);
                item.active = true;
            }
        }
        else if (rightVip > 9 && rightVip <= 13) {
            var type = 0;
            for (var index_3 = 0; index_3 < this.itemList.length - 2; index_3++) {
                var item_2 = this.itemList[index_3];
                if (item_2) {
                    item_2.getComponent(VipPrivilegeViewItem_1.default).refreshUI(type, rightVip);
                    item_2.active = true;
                }
                type += 2;
            }
            var item = this.itemList[2];
            if (item) {
                item.getComponent(VipPrivilegeViewItem_1.default).refreshUI(3, rightVip);
                item.active = true;
            }
        }
        else {
            var type = 0;
            for (var index_4 = 0; index_4 < this.itemList.length - 2; index_4++) {
                var item_3 = this.itemList[index_4];
                if (item_3) {
                    item_3.getComponent(VipPrivilegeViewItem_1.default).refreshUI(type, rightVip);
                    item_3.active = true;
                }
                type += 2;
            }
            var item = this.itemList[2];
            if (item) {
                item.getComponent(VipPrivilegeViewItem_1.default).refreshUI(3, rightVip);
                item.active = true;
            }
        }
    };
    VipPrivilegeView = __decorate([
        ccclass
    ], VipPrivilegeView);
    return VipPrivilegeView;
}(cc.Component));
exports.default = VipPrivilegeView;
var PrivilegeType;
(function (PrivilegeType) {
    PrivilegeType[PrivilegeType["HeadKuang"] = 0] = "HeadKuang";
    PrivilegeType[PrivilegeType["PaoTai"] = 1] = "PaoTai";
    PrivilegeType[PrivilegeType["BiaoQing"] = 2] = "BiaoQing";
    PrivilegeType[PrivilegeType["Kefu"] = 3] = "Kefu";
})(PrivilegeType = exports.PrivilegeType || (exports.PrivilegeType = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxWaXBQcml2aWxlZ2VWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2RUFBd0U7QUFDeEUsK0RBQTBEO0FBRXBELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQThDLG9DQUFZO0lBQTFEO1FBQUEscUVBcUtDO1FBbEtHLGdCQUFVLEdBQWMsSUFBSSxDQUFBO1FBRTVCLFdBQUssR0FBYSxJQUFJLENBQUE7UUFFdEIsY0FBUSxHQUFtQixFQUFFLENBQUM7UUFFOUI7O1VBRUU7UUFDRixvQkFBYyxHQUFlLEVBQUUsQ0FBQzs7SUF5SnBDLENBQUM7SUF0SkcsbUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVsRixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFekUsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNwQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFlLEtBQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDckQsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUMzQjtZQUNELElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTthQUN0QjtTQUVKO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdGLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDOUM7SUFDTCxDQUFDO0lBR0Qsb0NBQVMsR0FBVCxVQUFVLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRztRQUd0QixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztRQUNsQyxJQUFJLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksS0FBSyxHQUFHLFFBQVEsRUFBRTtZQUNsQixPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ2hCLEtBQUssR0FBRyxRQUFRLENBQUM7U0FDcEI7UUFFRCxJQUFJLFdBQVcsR0FBRyxpREFBaUQsQ0FBQztRQUNwRSxJQUFJLFNBQVMsR0FBRyxZQUFZLEdBQUcsUUFBUSxDQUFDO1FBQ3hDLE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFM0YsSUFBSSxRQUFRLEdBQUcsRUFBRSxFQUFFO1lBQ2YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1lBQzVDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDO1lBQ2hELElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDMUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDO1lBQ2hELElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FFN0M7YUFBTTtZQUNILElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztZQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQztZQUNoRCxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQztZQUMvQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQztZQUNoRCxJQUFJ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LGdCQUFnQjtBQXVLckMsSUFBWSxhQUtYO0FBTEQsV0FBWSxhQUFhO0lBQ3JCLDJEQUFhLENBQUE7SUFDYixxREFBVSxDQUFBO0lBQ1YseURBQVksQ0FBQTtJQUNaLGlEQUFRLENBQUE7QUFDWixDQUFDLEVBTFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFLeEIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxheWVySW5mb01vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1BsYXllckluZm9Nb2RlbFwiO1xyXG5pbXBvcnQgVmlwUHJpdmlsZWdlVmlld0l0ZW0gZnJvbSBcIi4vVmlwUHJpdmlsZWdlVmlld0l0ZW1cIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaXBQcml2aWxlZ2VWaWV3IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcblxyXG4gICAgaWNvblNwcml0ZTogY2MuU3ByaXRlID0gbnVsbFxyXG5cclxuICAgIGxldmVsOiBjYy5MYWJlbCA9IG51bGxcclxuXHJcbiAgICBpdGVtTGlzdDogQXJyYXk8Y2MuTm9kZT4gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICog5b2T5YmN6aG155qEdmlw562J57qn5LiL55qE54m55p2D5paH5pysXHJcbiAgICAqL1xyXG4gICAgbGFiZWxUZXF1YW5BcnI6IGNjLkxhYmVsW10gPSBbXTtcclxuXHJcblxyXG4gICAgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5pY29uU3ByaXRlID0gY2MuZmluZChcImluZm9fbm9kZS9pY29uX3ZpcFwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5TcHJpdGUpXHJcblxyXG4gICAgICAgIHRoaXMubGV2ZWwgPSBjYy5maW5kKFwiaW5mb19ub2RlL2xldmVsXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgNDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmZpbmQoYGxheW91dC9pdGVtXyR7aW5kZXh9YCwgdGhpcy5ub2RlKVxyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtTGlzdC5wdXNoKG5vZGUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGluZGV4IDwgMykge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbFRlcXVhbkFycltpXSA9IGNjLmZpbmQoXCJ2aXB0aXBzL3RpcF9cIiArIChpICsgMSksIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbFRlcXVhbkFycltpXS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVmcmVzaFVJKGRhdGEsIGluZGV4LCB2aXApIHtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgdmFyIG15VmlwID0gR2xvYmFsLlBsYXllckRhdGEudmlwO1xyXG4gICAgICAgIHZhciBsZWZ0VmlwID0gdmlwIC0gMTtcclxuICAgICAgICB2YXIgcmlnaHRWaXAgPSB2aXA7XHJcbiAgICAgICAgdmFyIHRvVmlwID0gbXlWaXAgKyAxO1xyXG4gICAgICAgIGlmIChteVZpcCA8IHJpZ2h0VmlwKSB7XHJcbiAgICAgICAgICAgIGxlZnRWaXAgPSBteVZpcDtcclxuICAgICAgICAgICAgdG9WaXAgPSByaWdodFZpcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBhdGxhc1N0cmluZyA9IFwiaGFsbC90ZXh0dXJlL2hhbGwvdmlwX2F1dG9fYXRsYXMvdmlwX2F1dG9fYXRsYXNcIjtcclxuICAgICAgICB2YXIgc2ZTdHJpbmcwID0gXCJpbWdfdmlwdGJfXCIgKyByaWdodFZpcDtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXModGhpcy5pY29uU3ByaXRlLCBhdGxhc1N0cmluZywgc2ZTdHJpbmcwLCBudWxsLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIGlmIChyaWdodFZpcCA8IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxUZXF1YW5BcnJbMF0uc3RyaW5nID0gXCLmtLvliqjlj6/pooblj5bmm7TlpJrlpZblirFcIjtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbFRlcXVhbkFyclswXS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxUZXF1YW5BcnJbMV0uc3RyaW5nID0gXCLkuJPlsZ7lnKjnur/lrqLmnI3vvIwyNOWwj+aXtuacjeWKoVwiO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsVGVxdWFuQXJyWzFdLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbFRlcXVhbkFyclsyXS5zdHJpbmcgPSBcIuS4k+WxnuaNlemxvOeCruWPsO+8jOaNlemxvOabtOWKoOa/gOaDhVwiO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsVGVxdWFuQXJyWzJdLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbFRlcXVhbkFyclswXS5zdHJpbmcgPSBcIua0u+WKqOWPr+mihuWPluabtOWkmuWlluWKsVwiO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsVGVxdWFuQXJyWzBdLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbFRlcXVhbkFyclsxXS5zdHJpbmcgPSBcIuS4k+WxnuWcqOe6v+Wuouacje+8jDI05bCP5pe25pyN5YqhXCI7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxUZXF1YW5BcnJbMV0ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsVGVxdWFuQXJyWzJdLnN0cmluZyA9IFwi5LiT5bGe5o2V6bG854Ku5Y+w77yM5o2V6bG85pu05r+A5oOFXCI7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxUZXF1YW5BcnJbMl0ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsVGVxdWFuQXJyWzNdLnN0cmluZyA9IFwiVklQ5LiT5Lqr6KGo5oOF77yM5LqS5Yqo5pu054Kr5Li9XCI7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxUZXF1YW5BcnJbM10ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcFN1YnNpZHkgIT0gbnVsbCAmJiBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UudmlwU3Vic2lkeVN0YXR1cyA9PSAxKSB7XHJcbiAgICAgICAgICAgIGxldCBzdWJzaWR5ID0gUGxheWVySW5mb01vZGVsLmluc3RhbmNlLnZpcFN1YnNpZHlbcmlnaHRWaXBdXHJcbiAgICAgICAgICAgIGlmKHN1YnNpZHkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYWJlbFRlcXVhbkFyclswXS5zdHJpbmcgPSBcIuavj+aXpeWPr+mihui9rOi/kOmHkVwiICsgc3Vic2lkeS50aW1lcyArIFwi5qyhXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxldmVsLnN0cmluZyA9IGBWSVAke3JpZ2h0VmlwfWBcclxuXHJcbiAgICAgICAgLy8gaWYgKHJpZ2h0VmlwID4gOSkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnJpY2hUZXh0QXJyWzFdLnN0cmluZyA9IFwiPGI+VlwiICsgcmlnaHRWaXAgKyBcIuS4k+WxnuihqOaDhTwvYj5cIjtcclxuICAgICAgICAvLyAgICAgdmFyIHNmUGFvdGFpID0gXCJiaWFvcWluZ19cIiArIHJpZ2h0VmlwO1xyXG4gICAgICAgIC8vICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXModGhpcy5zcHJpdGVJY29uQXJyWzFdLCBhdGxhc1N0cmluZywgc2ZQYW90YWksIG51bGwsIGZhbHNlKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMucmljaFRleHRBcnJbMV0uc3RyaW5nID0gXCI8Yj5WXCIgKyByaWdodFZpcCArIFwi5o2V6bG854Ku5Y+wPC9iPlwiO1xyXG4gICAgICAgIC8vICAgICB2YXIgc2ZQYW90YWkgPSBcInBhb3RhaV9cIiArIHJpZ2h0VmlwO1xyXG4gICAgICAgIC8vICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXModGhpcy5zcHJpdGVJY29uQXJyWzFdLCBhdGxhc1N0cmluZywgc2ZQYW90YWksIG51bGwsIGZhbHNlKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYgKHJpZ2h0VmlwIDw9IDgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuaXRlbUxpc3QubGVuZ3RoIC0gMjsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW1MaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoVmlwUHJpdmlsZWdlVmlld0l0ZW0pLnJlZnJlc2hVSShpbmRleCwgcmlnaHRWaXApXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJpZ2h0VmlwID09IDkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuaXRlbUxpc3QubGVuZ3RoIC0gMjsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW1MaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoVmlwUHJpdmlsZWdlVmlld0l0ZW0pLnJlZnJlc2hVSShpbmRleCwgcmlnaHRWaXApXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbUxpc3RbMl07XHJcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmdldENvbXBvbmVudChWaXBQcml2aWxlZ2VWaWV3SXRlbSkucmVmcmVzaFVJKDMsIHJpZ2h0VmlwKVxyXG4gICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbHNlIGlmIChyaWdodFZpcCA+IDkgJiYgcmlnaHRWaXAgPD0gMTMpIHtcclxuICAgICAgICAgICAgbGV0IHR5cGUgPSAwXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLml0ZW1MaXN0Lmxlbmd0aCAtIDI7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5pdGVtTGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFZpcFByaXZpbGVnZVZpZXdJdGVtKS5yZWZyZXNoVUkodHlwZSwgcmlnaHRWaXApXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdHlwZSArPSAyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW1MaXN0WzJdO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoVmlwUHJpdmlsZWdlVmlld0l0ZW0pLnJlZnJlc2hVSSgzLCByaWdodFZpcClcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHR5cGUgPSAwXHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLml0ZW1MaXN0Lmxlbmd0aCAtIDI7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5pdGVtTGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFZpcFByaXZpbGVnZVZpZXdJdGVtKS5yZWZyZXNoVUkodHlwZSwgcmlnaHRWaXApXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0eXBlICs9IDJcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5pdGVtTGlzdFsyXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KFZpcFByaXZpbGVnZVZpZXdJdGVtKS5yZWZyZXNoVUkoMywgcmlnaHRWaXApXHJcbiAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5leHBvcnQgZW51bSBQcml2aWxlZ2VUeXBlIHtcclxuICAgIEhlYWRLdWFuZyA9IDAsXHJcbiAgICBQYW9UYWkgPSAxLFxyXG4gICAgQmlhb1FpbmcgPSAyLFxyXG4gICAgS2VmdSA9IDNcclxufSJdfQ==