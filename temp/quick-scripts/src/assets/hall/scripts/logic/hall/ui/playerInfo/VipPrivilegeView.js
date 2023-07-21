"use strict";
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