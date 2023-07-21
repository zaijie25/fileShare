
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/subView/DdzPokerGroup.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHN1YlZpZXdcXERkelBva2VyR3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXdDO0FBR3hDLDBDQUFxQztBQUVyQztJQUEyQyxpQ0FBVztJQWFsRCx1QkFBWSxJQUFhLEVBQVksS0FBYTtRQUFsRCxZQUNJLGlCQUFPLFNBR1Y7UUFKb0MsV0FBSyxHQUFMLEtBQUssQ0FBUTtRQVAxQyxrQkFBWSxHQUFtQixFQUFFLENBQUM7UUFFbEMsZ0JBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsZ0JBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQU1yQixLQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUM5QyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRVMsZ0NBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQWEsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQzFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU0sd0NBQWdCLEdBQXZCLFVBQXdCLE1BQWUsRUFBRSxHQUFXO1FBQ2hELElBQUksQ0FBQyxRQUFR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LE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU0sK0NBQXVCLEdBQTlCO1FBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRU0sdUNBQWUsR0FBdEI7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQWpLQSxBQWlLQyxDQWpLMEMscUJBQVcsR0FpS3JEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERkekJhc2VWaWV3IGZyb20gXCIuL0RkekJhc2VWaWV3XCI7XHJcbmltcG9ydCBEZHpQb2tlclZpZXcgZnJvbSBcIi4uL3N1YlZpZXcvRGR6UG9rZXJWaWV3XCI7XHJcbmltcG9ydCBEZHpQb2tlclBvb2wgZnJvbSBcIi4uL3Rvb2wvRGR6UG9rZXJQb29sXCI7XHJcbmltcG9ydCBEZHpEcml2ZXIgZnJvbSBcIi4uL0RkekRyaXZlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6UG9rZXJHcm91cCBleHRlbmRzIERkekJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSByZXN0Tm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgcmVzdENvdW50TGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgcG9rZXJTaG93Um9vdDogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgcGxheVN0YXJ0Um9vdDogY2MuTm9kZTtcclxuXHJcbiAgICBwcml2YXRlIG9uU2hvd1Bva2VyczogRGR6UG9rZXJWaWV3W10gPSBbXTtcclxuICAgIHByaXZhdGUgcG9rZXJQb29sOiBEZHpQb2tlclBvb2w7XHJcbiAgICBwcml2YXRlIHNob3dTcGFjZVggPSAyMztcclxuICAgIHByaXZhdGUgc2hvd1NwYWNlWSA9IC02MDtcclxuICAgIHByaXZhdGUgZGVzUG9zOiBjYy5WZWMzO1xyXG4gICAgcHJpdmF0ZSBzaG93Q2VudGVyUG9zOiBjYy5WZWMzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUsIHByb3RlY3RlZCBuU2VhdDogbnVtYmVyKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMucG9rZXJQb29sID0gRGR6RHJpdmVyLmluc3RhbmNlLlBva2VyUG9vbDtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5yZXN0Tm9kZSA9IHRoaXMuZ2V0Q2hpbGQoJ3Jlc3QnKTtcclxuICAgICAgICB0aGlzLnJlc3ROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVzdENvdW50TGJsID0gPGNjLkxhYmVsPnRoaXMuZ2V0Q29tcG9uZW50KCdyZXN0L2NvdW50TGJsJywgY2MuTGFiZWwpO1xyXG5cclxuICAgICAgICB0aGlzLnBva2VyU2hvd1Jvb3QgPSB0aGlzLmdldENoaWxkKCdwb2tlclNob3cnKTtcclxuICAgICAgICB0aGlzLmRlc1BvcyA9IHRoaXMucG9rZXJTaG93Um9vdC5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnBsYXlTdGFydFJvb3QgPSB0aGlzLmdldENoaWxkKCdwbGF5U3RhcnRSb290Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFJlc3RDb3VudFNob3coaXNTaG93OiBib29sZWFuLCBudW06IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5yZXN0Tm9kZS5hY3RpdmUgPSBpc1Nob3c7XHJcbiAgICAgICAgaWYgKGlzU2hvdylcclxuICAgICAgICAgICAgdGhpcy5yZXN0Q291bnRMYmwuc3RyaW5nID0gU3RyaW5nKG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBpc1Nob3cgXHJcbiAgICAgKiBAcGFyYW0gYXJyIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvd1BsYXlQb2tlcnMoaXNTaG93OiBib29sZWFuLCBhcnI6IG51bWJlcltdID0gW10pe1xyXG4gICAgICAgIGlmKGlzU2hvdyl7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0NlbnRlclBvcyA9IGNjLlZlYzMuWkVSTztcclxuICAgICAgICAgICAgdGhpcy5wb2tlclBvb2wucmVjeWNsZUFsbCh0aGlzLm9uU2hvd1Bva2Vycyk7XHJcbiAgICAgICAgICAgIHRoaXMub25TaG93UG9rZXJzID0gW107XHJcbiAgICAgICAgICAgIGxldCBzb3J0QXJyID0gYXJyO1xyXG4gICAgICAgICAgICB0aGlzLm9uU2hvd1Bva2VycyA9IHRoaXMucG9rZXJQb29sLmdldEl0ZW1BcnIoc29ydEFyci5sZW5ndGgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uU2hvd1Bva2Vycy5mb3JFYWNoKChwb2tlciwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBva2VyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBwb2tlci5pc0Zyb250ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHBva2VyLnBva2VyVmFsdWUgPSBzb3J0QXJyW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIHBva2VyLnNldFBva2VyU3R5bGUoMCk7XHJcbiAgICAgICAgICAgICAgICBwb2tlci5ub2RlLnNldFBhcmVudCh0aGlzLnBva2VyU2hvd1Jvb3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5sYXlvdXRTaG93UG9rZXJzKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZHpMb2NhbFNlYXQgPSB0aGlzLkNvbnRleHQuZ2V0KHRoaXMuRGVmaW5lLkZpZWxkRHpMb2NTZWF0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMublNlYXQgPT0gZHpMb2NhbFNlYXQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblNob3dQb2tlcnNbc29ydEFyci5sZW5ndGggLTFdLnNldER6T3duZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wb2tlclNob3dSb290LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnNob3dDZW50ZXJQb3MgPSBjYy5WZWMzLlpFUk87XHJcbiAgICAgICAgICAgIHRoaXMucG9rZXJQb29sLnJlY3ljbGVBbGwodGhpcy5vblNob3dQb2tlcnMpO1xyXG4gICAgICAgICAgICB0aGlzLm9uU2hvd1Bva2VycyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheU91dFBva2Vyc0FuaW0oaXNBbmltOiBib29sZWFuLCBhcnI6IG51bWJlcltdKXtcclxuICAgICAgICB0aGlzLnBva2VyU2hvd1Jvb3QuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBpZiAoaXNBbmltKXtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gYXJyLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKGNvdW50ID49IDUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2tlclNob3dSb290LnNldFBvc2l0aW9uKHRoaXMuZGVzUG9zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25TaG93UG9rZXJzLmZvckVhY2goKHBva2VyLCBpbmRleCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgcG9rZXIuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBva2VyLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgaW5kZXggKiAwLjAzICsgMC4wMSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgR2FtZS5FdmVudC5ldmVudChHYW1lLkVWRU5UX0FERFRJTUVMT0NLLCAncGxheU91dFBva2Vyc0FuaW0nLCBjb3VudCAqIDAuMDMgKyAwLjAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2tlclNob3dSb290LnNldFBvc2l0aW9uKHRoaXMucGxheVN0YXJ0Um9vdC5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBsZXQgdHdlZW4gPSBHYW1lLlR3ZWVuLmdldCh0aGlzLnBva2VyU2hvd1Jvb3QpO1xyXG4gICAgICAgICAgICAgICAgdHdlZW4udG8odGhpcy5EZWZpbmUuUG9rZXJQbGF5TW92ZVRpbWUsIHtwb3NpdGlvbjogdGhpcy5kZXNQb3N9LCBjYy5lYXNlUXVhcnRpY0FjdGlvbk91dCgpKVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5wb2tlclNob3dSb290LnNldFBvc2l0aW9uKHRoaXMuZGVzUG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsYXlvdXRTaG93UG9rZXJzKCl7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5vblNob3dQb2tlcnMubGVuZ3RoO1xyXG4gICAgICAgIGlmKGNvdW50IDw9IDApXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgW3dpZHRoLCBoZWlnaHRdID0gdGhpcy5vblNob3dQb2tlcnNbMF0uZ2V0UG9rZXJTaXplKCk7XHJcbiAgICAgICAgbGV0IFtzdGFydFgsIHN0YXJ0WV0gPSBbd2lkdGggLzIsIC1oZWlnaHQgLzJdO1xyXG4gICAgICAgIGxldCBtYXhDb2wgPSAxMDsgICAgICAgIC8vIOS4gOihjOWxleekuuWkquWkmiDlnKjmmKXlpKnml7bkuKTkuKrkurrliankvZnniYzkvJrph43lj6BcclxuICAgICAgICBpZiAodGhpcy5uU2VhdCA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5vblNob3dQb2tlcnMuZm9yRWFjaCgocG9rZXIsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwb3MgPSBjYy52MygoaS0gTWF0aC5jZWlsKGNvdW50LzIgLSAxKSkgKiB0aGlzLnNob3dTcGFjZVgsIDApO1xyXG4gICAgICAgICAgICAgICAgcG9rZXIuc2V0UG9rZXJQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zaG93Q2VudGVyUG9zID0gdGhpcy5kZXNQb3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5uU2VhdCA9PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5vblNob3dQb2tlcnMuZm9yRWFjaCgocG9rZXIsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpIDw9IG1heENvbCAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbENvdW50ID0gY291bnQgPiBtYXhDb2wgPyBtYXhDb2w6IGNvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSBjYy52Mygtc3RhcnRYIC0gKGNvbENvdW50IC0gaSAtIDEpICogdGhpcy5zaG93U3BhY2VYLCBzdGFydFkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBva2VyLnNldFBva2VyUG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbENvdW50ID0gY291bnQgLSBtYXhDb2w7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IGNjLnYzKC1zdGFydFggLSAoY29sQ291bnQgLSBpICUgbWF4Q29sIC0gMSkgKiB0aGlzLnNob3dTcGFjZVgsIHN0YXJ0WSArIHRoaXMuc2hvd1NwYWNlWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9rZXIuc2V0UG9rZXJQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGNvdW50IDw9IG1heENvbCl7ICAvLyBu5byg54mM562J6Ze06LedbeWPoOaUviB3aWR0aCA9IDIgKiAobi0xKSAqbVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Q2VudGVyUG9zID0gY2MudjMoKHRoaXMuZGVzUG9zLnggLSAod2lkdGggKiBjb3VudCAtIDIqKGNvdW50LTEpKiB0aGlzLnNob3dTcGFjZVgpIC8yKSwgdGhpcy5kZXNQb3MueSAtIGhlaWdodCAvMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXsgICAgICAgLy8g5Lik5byg54mM55Sx5LqO54i26IqC54K56ZSa54K55Zyo5LiK5pa577yM54mM6ZSa54K55Zyo5Lit5b+D77yM5Zug6ICM6ZyA6KaB5YWI5YqgaC8yXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dDZW50ZXJQb3MgPSBjYy52MygodGhpcy5kZXNQb3MueCAtICh3aWR0aCAqIGNvdW50IC0gMiooY291bnQtMSkqIHRoaXMuc2hvd1NwYWNlWCkgLzIpLCB0aGlzLmRlc1Bvcy55ICsgaGVpZ2h0IC8yIC0gKGhlaWdodCAqIDIgLSB0aGlzLnNob3dTcGFjZVkpIC8yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMublNlYXQgPT0gMil7XHJcbiAgICAgICAgICAgIHRoaXMub25TaG93UG9rZXJzLmZvckVhY2goKHBva2VyLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA8PSBtYXhDb2wgLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwb3MgPSBjYy52MyhzdGFydFggKyBpICogdGhpcy5zaG93U3BhY2VYLCBzdGFydFkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBva2VyLnNldFBva2VyUG9zaXRpb24ocG9zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvcyA9IGNjLnYzKHN0YXJ0WCArIGkgJSBtYXhDb2wgKiB0aGlzLnNob3dTcGFjZVgsIHN0YXJ0WSArIHRoaXMuc2hvd1NwYWNlWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9rZXIuc2V0UG9rZXJQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGNvdW50IDw9IG1heENvbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dDZW50ZXJQb3MgPSBjYy52MygodGhpcy5kZXNQb3MueCArICh3aWR0aCAqIGNvdW50IC0gMiooY291bnQtMSkqIHRoaXMuc2hvd1NwYWNlWCkgLzIpLCB0aGlzLmRlc1Bvcy55IC0gaGVpZ2h0IC8yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Q2VudGVyUG9zID0gY2MudjMoKHRoaXMuZGVzUG9zLnggKyAod2lkdGggKiBjb3VudCAtIDIqKGNvdW50LTEpKiB0aGlzLnNob3dTcGFjZVgpIC8yKSwgdGhpcy5kZXNQb3MueSArIGhlaWdodCAvMiAtIChoZWlnaHQgKiAyIC0gdGhpcy5zaG93U3BhY2VZKSAvMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBva2VyRGVhbEFuaW1Qb3MoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXN0Tm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHRoaXMucmVzdE5vZGUucG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQb2tlclNob3dEZXNXb3JsZFBvcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBva2VyU2hvd1Jvb3QucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUih0aGlzLnNob3dDZW50ZXJQb3MgfHwgdGhpcy5kZXNQb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldEdyb3VwUG9rZXIoKXtcclxuICAgICAgICB0aGlzLnJlc3ROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd1BsYXlQb2tlcnMoZmFsc2UpO1xyXG4gICAgfVxyXG59Il19