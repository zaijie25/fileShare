"use strict";
cc._RF.push(module, '69240GLbxRPibzO4zMaUR9M', 'DdzPokerGroup');
// ddz/ddz/scripts/subView/DdzPokerGroup.ts

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
var DdzBaseView_1 = require("./DdzBaseView");
var DdzDriver_1 = require("../DdzDriver");
var DdzPokerGroup = /** @class */ (function (_super) {
    __extends(DdzPokerGroup, _super);
    function DdzPokerGroup(node, nSeat) {
        var _this = _super.call(this) || this;
        _this.nSeat = nSeat;
        _this.onShowPokers = [];
        _this.showSpaceX = 23;
        _this.showSpaceY = -60;
        _this.pokerPool = DdzDriver_1.default.instance.PokerPool;
        _this.setNode(node);
        return _this;
    }
    DdzPokerGroup.prototype.initView = function () {
        this.restNode = this.getChild('rest');
        this.restNode.active = false;
        this.restCountLbl = this.getComponent('rest/countLbl', cc.Label);
        this.pokerShowRoot = this.getChild('pokerShow');
        this.desPos = this.pokerShowRoot.position;
        this.playStartRoot = this.getChild('playStartRoot');
    };
    DdzPokerGroup.prototype.setRestCountShow = function (isShow, num) {
        this.restNode.active = isShow;
        if (isShow)
            this.restCountLbl.string = String(num);
    };
    /**
     *
     * @param isShow
     * @param arr
     */
    DdzPokerGroup.prototype.showPlayPokers = function (isShow, arr) {
        var _this = this;
        if (arr === void 0) { arr = []; }
        if (isShow) {
            this.showCenterPos = cc.Vec3.ZERO;
            this.pokerPool.recycleAll(this.onShowPokers);
            this.onShowPokers = [];
            var sortArr_1 = arr;
            this.onShowPokers = this.pokerPool.getItemArr(sortArr_1.length);
            this.onShowPokers.forEach(function (poker, index) {
                poker.active = true;
                poker.isFront = true;
                poker.pokerValue = sortArr_1[index];
                poker.setPokerStyle(0);
                poker.node.setParent(_this.pokerShowRoot);
            });
            this.layoutShowPokers();
            var dzLocalSeat = this.Context.get(this.Define.FieldDzLocSeat);
            if (this.nSeat == dzLocalSeat) {
                this.onShowPokers[sortArr_1.length - 1].setDzOwner(true);
            }
            this.pokerShowRoot.active = false;
        }
        else {
            this.showCenterPos = cc.Vec3.ZERO;
            this.pokerPool.recycleAll(this.onShowPokers);
            this.onShowPokers = [];
        }
    };
    DdzPokerGroup.prototype.playOutPokersAnim = function (isAnim, arr) {
        this.pokerShowRoot.active = true;
        if (isAnim) {
            var count = arr.length;
            if (count >= 5) {
                this.pokerShowRoot.setPosition(this.desPos);
                this.onShowPokers.forEach(function (poker, index) {
                    poker.active = false;
                    Game.Component.scheduleOnce(function () {
                        poker.active = true;
                    }, index * 0.03 + 0.01);
                });
                Game.Event.event(Game.EVENT_ADDTIMELOCK, 'playOutPokersAnim', count * 0.03 + 0.01);
            }
            else {
                this.pokerShowRoot.setPosition(this.playStartRoot.position);
                var tween = Game.Tween.get(this.pokerShowRoot);
                tween.to(this.Define.PokerPlayMoveTime, { position: this.desPos }, cc.easeQuarticActionOut())
                    .start();
            }
        }
        else {
            this.pokerShowRoot.setPosition(this.desPos);
        }
    };
    DdzPokerGroup.prototype.layoutShowPokers = function () {
        var _this = this;
        var count = this.onShowPokers.length;
        if (count <= 0)
            return;
        var _a = this.onShowPokers[0].getPokerSize(), width = _a[0], height = _a[1];
        var _b = [width / 2, -height / 2], startX = _b[0], startY = _b[1];
        var maxCol = 10; // 一行展示太多 在春天时两个人剩余牌会重叠
        if (this.nSeat == 0) {
            this.onShowPokers.forEach(function (poker, i) {
                var pos = cc.v3((i - Math.ceil(count / 2 - 1)) * _this.showSpaceX, 0);
                poker.setPokerPosition(pos);
            });
            this.showCenterPos = this.desPos;
        }
        else if (this.nSeat == 1) {
            this.onShowPokers.forEach(function (poker, i) {
                if (i <= maxCol - 1) {
                    var colCount = count > maxCol ? maxCol : count;
                    var pos = cc.v3(-startX - (colCount - i - 1) * _this.showSpaceX, startY);
                    poker.setPokerPosition(pos);
                }
                else {
                    var colCount = count - maxCol;
                    var pos = cc.v3(-startX - (colCount - i % maxCol - 1) * _this.showSpaceX, startY + _this.showSpaceY);
                    poker.setPokerPosition(pos);
                }
            });
            if (count <= maxCol) { // n张牌等间距m叠放 width = 2 * (n-1) *m
                this.showCenterPos = cc.v3((this.desPos.x - (width * count - 2 * (count - 1) * this.showSpaceX) / 2), this.desPos.y - height / 2);
            }
            else { // 两张牌由于父节点锚点在上方，牌锚点在中心，因而需要先加h/2
                this.showCenterPos = cc.v3((this.desPos.x - (width * count - 2 * (count - 1) * this.showSpaceX) / 2), this.desPos.y + height / 2 - (height * 2 - this.showSpaceY) / 2);
            }
        }
        else if (this.nSeat == 2) {
            this.onShowPokers.forEach(function (poker, i) {
                if (i <= maxCol - 1) {
                    var pos = cc.v3(startX + i * _this.showSpaceX, startY);
                    poker.setPokerPosition(pos);
                }
                else {
                    var pos = cc.v3(startX + i % maxCol * _this.showSpaceX, startY + _this.showSpaceY);
                    poker.setPokerPosition(pos);
                }
            });
            if (count <= maxCol) {
                this.showCenterPos = cc.v3((this.desPos.x + (width * count - 2 * (count - 1) * this.showSpaceX) / 2), this.desPos.y - height / 2);
            }
            else {
                this.showCenterPos = cc.v3((this.desPos.x + (width * count - 2 * (count - 1) * this.showSpaceX) / 2), this.desPos.y + height / 2 - (height * 2 - this.showSpaceY) / 2);
            }
        }
    };
    DdzPokerGroup.prototype.getPokerDealAnimPos = function () {
        return this.restNode.parent.convertToWorldSpaceAR(this.restNode.position);
    };
    DdzPokerGroup.prototype.getPokerShowDesWorldPos = function () {
        return this.pokerShowRoot.parent.convertToWorldSpaceAR(this.showCenterPos || this.desPos);
    };
    DdzPokerGroup.prototype.resetGroupPoker = function () {
        this.restNode.active = false;
        this.showPlayPokers(false);
    };
    return DdzPokerGroup;
}(DdzBaseView_1.default));
exports.default = DdzPokerGroup;

cc._RF.pop();