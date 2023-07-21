
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/bbwz/Bbwz/scripts/component/BbwzOnlinePlayerItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcYmJ3elxcQmJ3elxcc2NyaXB0c1xcY29tcG9uZW50XFxCYnd6T25saW5lUGxheWVySXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBdUM7QUFFakMsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFFMUM7O0dBRUc7QUFFSDtJQUFrRCx3Q0FBWTtJQUE5RDtRQUFBLHFFQTBHQztRQXpHRzs7V0FFRztRQUNILGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBQzVCOztXQUVHO1FBQ0gsZUFBUyxHQUFhLElBQUksQ0FBQztRQUMzQjs7V0FFRztRQUNILGVBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUI7O1dBRUc7UUFDSCxlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCOztXQUVHO1FBQ0gsY0FBUSxHQUFXLElBQUksQ0FBQztRQUN4Qjs7V0FFRztRQUNILGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCOztXQUVHO1FBQ0gsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFPdEIsbUJBQWEsR0FBYyxFQUFFLENBQUM7O0lBdUUxQyxDQUFDO0lBbkVHLHFDQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJ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b0IsQ0EwR3hDO0lBQUQsMkJBQUM7Q0ExR0QsQUEwR0MsQ0ExR2lELEVBQUUsQ0FBQyxTQUFTLEdBMEc3RDtrQkExR29CLG9CQUFvQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYnd6RHJpdmVyIGZyb20gXCIuLi9CYnd6RHJpdmVyXCI7XHJcblxyXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbi8qKlxyXG4gKiDlnKjnur/njqnlrrblvLnnqpfnlYzpnaLkuK3nmoTljZXkuKrnjqnlrrYg57uE5Lu2XHJcbiAqL1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYnd6T25saW5lUGxheWVySXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICAvKipcclxuICAgICAqIOWktOWDj1xyXG4gICAgICovXHJcbiAgICBzcHJpdGVIZWFkOmNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOWktOWDj+ahhlxyXG4gICAgICovXHJcbiAgICBoZWFkS3Vhbmc6Y2MuU3ByaXRlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog546p5a625ZCN5a2XXHJcbiAgICAgKi9cclxuICAgIGxhYmxlTmFtZTpjYy5MYWJlbCA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOeOqeWutumHkeW4gVxyXG4gICAgICovXHJcbiAgICBsYWJsZUdvbGQ6Y2MuTGFiZWwgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiDoh6rlt7HnmoTmoIfnrb5cclxuICAgICAqL1xyXG4gICAgc2VsZk5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOS4i+azqOaVsOmHj+aWh+acrFxyXG4gICAgICovXHJcbiAgICBsYWJsZVhpYXpodTpjYy5MYWJlbCA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOiOt+iDnOWxgOaVsOaWh+acrFxyXG4gICAgICovXHJcbiAgICBsYWJlbFdpbkNvdW50OmNjLkxhYmVsID0gbnVsbDtcclxuICAgIC8vIOaOkuWQjeaWh+acrFxyXG4gICAgbGFiZWxDdXI6IGNjLkxhYmVsO1xyXG4gICAgLy8g5pm65aSa5pifXHJcbiAgICBwcml2YXRlIHdpc2VOb2RlOiBjYy5Ob2RlO1xyXG4gICAgLy8g5aSn5a+M6LGqXHJcbiAgICBwcml2YXRlIHJpY2hlck5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHJpY2hlclRleHRBcnI6IGNjLk5vZGVbXSA9IFtdO1xyXG4gICAgLy8g5o6S5ZCN5paH5pysXHJcbiAgICBwcml2YXRlIGxhYmVsUmFuazpjYy5MYWJlbDtcclxuICAgIFxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVIZWFkID0gY2MuZmluZChcIm1hc2svc3ByaXRlX2hlYWRcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLmhlYWRLdWFuZyA9IGNjLmZpbmQoXCJoZWFkX2t1YW5nXCIsIHRoaXMubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5sYWJsZU5hbWUgPSBjYy5maW5kKFwibGFiZWxfbmFtZVwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5sYWJsZUdvbGQgPSBjYy5maW5kKFwibGFiZWxfZ29sZFwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5zZWxmTm9kZSA9IGNjLmZpbmQoXCJzcHJpdGVfc2VsZlwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMubGFiZWxDdXIgPSBjYy5maW5kKFwiaW5mby9sYWJlbF9qdVwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5sYWJlbEN1ci5zdHJpbmcgPSBcIjIwXCI7XHJcbiAgICAgICAgdGhpcy5sYWJsZVhpYXpodSA9IGNjLmZpbmQoXCJpbmZvL2xhYmVsX3hpYXpodVwiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5sYWJlbFdpbkNvdW50ID0gY2MuZmluZChcImluZm8vbGFiZWxfd2luQ291bnRcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG5cclxuICAgICAgICB0aGlzLnJpY2hlck5vZGUgPSBjYy5maW5kKFwicmFuay9zcHJpdGVfcmljaGVyXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgZm9yIChsZXQgaT0gMTsgaTw9IDM7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuZmluZChcInJpY2hlclwiICsgaSwgdGhpcy5yaWNoZXJOb2RlKTtcclxuICAgICAgICAgICAgdGhpcy5yaWNoZXJUZXh0QXJyLnB1c2gobm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMud2lzZU5vZGUgPSBjYy5maW5kKFwicmFuay9zcHJpdGVfd2lzZVwiLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMubGFiZWxSYW5rID0gY2MuZmluZChcInJhbmsvbGFiZWxfcmFua1wiLCB0aGlzLm5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrDmmL7npLpcclxuICAgICAqIEBwYXJhbSBkYXRhIOaVsOaNruWvueixoVxyXG4gICAgICogQHBhcmFtIGluZGV4IOaOkuWQjee0ouW8lSAwLeaZuuWkmuaYn1xyXG4gICAgICovXHJcbiAgICB1cGRhdGVVSShkYXRhLCBpbmRleDogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLnNwcml0ZUhlYWQuc3ByaXRlRnJhbWUgPSBHbG9iYWwuVG9vbGtpdC5nZXRMb2NhbEhlYWRTZihkYXRhLmhlYWRpbWcpO1xyXG4gICAgICAgIEJid3pEcml2ZXIuaW5zdGFuY2UubG9hZFZpcEhlYWRLdWFuZyh0aGlzLmhlYWRLdWFuZywgZGF0YS5hX2JveCk7XHJcblxyXG4gICAgICAgIHRoaXMubGFibGVOYW1lLnN0cmluZyA9IGRhdGEubmlja25hbWU7XHJcbiAgICAgICAgdGhpcy5sYWJsZUdvbGQuc3RyaW5nID0gXCJcIiArIEdsb2JhbC5Ub29sa2l0LkdldE1vbmV5Rm9ybWF0KGRhdGEucG9pbnQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2VsZk5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYoZGF0YS5pc015KXtcclxuICAgICAgICAgICAgLy/oh6rlt7FcclxuICAgICAgICAgICAgdGhpcy5zZWxmTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sYWJsZVhpYXpodS5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludFN0cihkYXRhLnRvdGFsX2JldCwgZmFsc2UsIGZhbHNlKTsgIC8vIOehruWumuS8muS4jeS8muWHuueOsOWwj+aVsCDnm67liY3msqHmnInliIflsI/mlbDngrlcclxuICAgICAgICB0aGlzLmxhYmVsV2luQ291bnQuc3RyaW5nID0gXCJcIiArIGRhdGEud2luX2NvdW50O1xyXG5cclxuICAgICAgICBpZihkYXRhLmlzWmhpZHVveGluZyl7XHJcbiAgICAgICAgICAgIC8v5pm65aSa5pifXHJcbiAgICAgICAgICAgIHRoaXMud2lzZU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yaWNoZXJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsUmFuay5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpbmRleCA8IDMpIHtcclxuICAgICAgICAgICAgLy/lpKflr4zosapcclxuICAgICAgICAgICAgdGhpcy53aXNlTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5yaWNoZXJOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxSYW5rLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucmljaGVyVGV4dEFyci5mb3JFYWNoKChub2RlLCBpKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMud2lzZU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucmljaGVyTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbFJhbmsubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsUmFuay5zdHJpbmcgPSBcIlwiICsgKDEgKyBpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=