"use strict";
cc._RF.push(module, 'da3d04w5MxGBoLdrzxOSwfj', 'BbwzOnlinePlayerItem');
// bbwz/Bbwz/scripts/component/BbwzOnlinePlayerItem.ts

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
var BbwzDriver_1 = require("../BbwzDriver");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 在线玩家弹窗界面中的单个玩家 组件
 */
var BbwzOnlinePlayerItem = /** @class */ (function (_super) {
    __extends(BbwzOnlinePlayerItem, _super);
    function BbwzOnlinePlayerItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 头像
         */
        _this.spriteHead = null;
        /**
         * 头像框
         */
        _this.headKuang = null;
        /**
         * 玩家名字
         */
        _this.lableName = null;
        /**
         * 玩家金币
         */
        _this.lableGold = null;
        /**
         * 自己的标签
         */
        _this.selfNode = null;
        /**
         * 下注数量文本
         */
        _this.lableXiazhu = null;
        /**
         * 获胜局数文本
         */
        _this.labelWinCount = null;
        _this.richerTextArr = [];
        return _this;
    }
    BbwzOnlinePlayerItem.prototype.onLoad = function () {
        this.spriteHead = cc.find("mask/sprite_head", this.node).getComponent(cc.Sprite);
        this.headKuang = cc.find("head_kuang", this.node).getComponent(cc.Sprite);
        this.lableName = cc.find("label_name", this.node).getComponent(cc.Label);
        this.lableGold = cc.find("label_gold", this.node).getComponent(cc.Label);
        this.selfNode = cc.find("sprite_self", this.node);
        this.labelCur = cc.find("info/label_ju", this.node).getComponent(cc.Label);
        this.labelCur.string = "20";
        this.lableXiazhu = cc.find("info/label_xiazhu", this.node).getComponent(cc.Label);
        this.labelWinCount = cc.find("info/label_winCount", this.node).getComponent(cc.Label);
        this.richerNode = cc.find("rank/sprite_richer", this.node);
        for (var i = 1; i <= 3; i++) {
            var node = cc.find("richer" + i, this.richerNode);
            this.richerTextArr.push(node);
        }
        this.wiseNode = cc.find("rank/sprite_wise", this.node);
        this.labelRank = cc.find("rank/label_rank", this.node).getComponent(cc.Label);
    };
    /**
     * 更新显示
     * @param data 数据对象
     * @param index 排名索引 0-智多星
     */
    BbwzOnlinePlayerItem.prototype.updateUI = function (data, index) {
        this.spriteHead.spriteFrame = Global.Toolkit.getLocalHeadSf(data.headimg);
        BbwzDriver_1.default.instance.loadVipHeadKuang(this.headKuang, data.a_box);
        this.lableName.string = data.nickname;
        this.lableGold.string = "" + Global.Toolkit.GetMoneyFormat(data.point);
        this.selfNode.active = false;
        if (data.isMy) {
            //自己
            this.selfNode.active = true;
        }
        this.lableXiazhu.string = Global.Toolkit.formatPointStr(data.total_bet, false, false); // 确定会不会出现小数 目前没有切小数点
        this.labelWinCount.string = "" + data.win_count;
        if (data.isZhiduoxing) {
            //智多星
            this.wiseNode.active = true;
            this.richerNode.active = false;
            this.labelRank.node.active = false;
        }
        else if (index < 3) {
            //大富豪
            this.wiseNode.active = false;
            this.richerNode.active = true;
            this.labelRank.node.active = false;
            this.richerTextArr.forEach(function (node, i) {
                if (i == index)
                    node.active = true;
                else
                    node.active = false;
            });
        }
        else {
            this.wiseNode.active = false;
            this.richerNode.active = false;
            this.labelRank.node.active = true;
            this.labelRank.string = "" + (1 + index);
        }
    };
    BbwzOnlinePlayerItem = __decorate([
        ccclass
    ], BbwzOnlinePlayerItem);
    return BbwzOnlinePlayerItem;
}(cc.Component));
exports.default = BbwzOnlinePlayerItem;

cc._RF.pop();