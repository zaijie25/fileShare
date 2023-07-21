
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/component/ErmjDiceAnim.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd2911kDGIdDiJVn3YCIW3RP', 'ErmjDiceAnim');
// ermj/Ermj/scripts/component/ErmjDiceAnim.ts

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
var ErmjDiceAnim = /** @class */ (function (_super) {
    __extends(ErmjDiceAnim, _super);
    function ErmjDiceAnim() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dice1Sp = null;
        _this.dice2Sp = null;
        _this.diceSfArr = [];
        return _this;
    }
    ErmjDiceAnim.prototype.onLoad = function () {
        this.effectSk = cc.find("effect", this.node).getComponent(sp.Skeleton);
        this.dice1Sp.node.active = false;
        this.dice2Sp.node.active = false;
    };
    ErmjDiceAnim.prototype.showDice = function (dice, isAnim) {
        this.setDiceStyle(dice);
        if (isAnim) {
            this.dice1Sp.node.active = false;
            this.dice2Sp.node.active = false;
            this.effectSk.setAnimation(0, "idle", false);
        }
        else {
            this.dice1Sp.node.active = true;
            this.dice2Sp.node.active = true;
        }
    };
    ErmjDiceAnim.prototype.setDiceStyle = function (dice) {
        var _this = this;
        var dice1 = dice[0], dice2 = dice[1];
        this.dice1Sp.spriteFrame = this.diceSfArr[dice1 - 1];
        this.dice2Sp.spriteFrame = this.diceSfArr[dice2 - 1];
        this.scheduleOnce(function () {
            _this.dice1Sp.node.active = true;
            _this.dice2Sp.node.active = true;
        }, 1);
    };
    ErmjDiceAnim.prototype.onDisable = function () {
        this.unscheduleAllCallbacks();
        this.effectSk.clearTracks();
    };
    __decorate([
        property(cc.Sprite)
    ], ErmjDiceAnim.prototype, "dice1Sp", void 0);
    __decorate([
        property(cc.Sprite)
    ], ErmjDiceAnim.prototype, "dice2Sp", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], ErmjDiceAnim.prototype, "diceSfArr", void 0);
    ErmjDiceAnim = __decorate([
        ccclass
    ], ErmjDiceAnim);
    return ErmjDiceAnim;
}(cc.Component));
exports.default = ErmjDiceAnim;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcY29tcG9uZW50XFxFcm1qRGljZUFuaW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUEyQ0M7UUF6Q0csYUFBTyxHQUFjLElBQUksQ0FBQztRQUUxQixhQUFPLEdBQWMsSUFBSSxDQUFDO1FBRTFCLGVBQVMsR0FBcUIsRUFBRSxDQUFDOztJQXFDckMsQ0FBQztJQWpDYSw2QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3JDLENBQUM7SUFFTSwrQkFBUSxHQUFmLFVBQWdCLElBQWMsRUFBRSxNQUFlO1FBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsSUFBSSxNQUFNLEVBQUM7WUFDUCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNoRDthQUNHO1lBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztJQUVPLG1DQUFZLEdBQXBCLFVBQXFCLElBQWM7UUFBbkMsaUJBUUM7UUFQUSxJQUFBLEtBQUssR0FBVyxJQUFJLEdBQWYsRUFBRSxLQUFLLEdBQUksSUFBSSxHQUFSLENBQVM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDaEMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNwQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRVMsZ0NBQVMsR0FBbkI7UUFDSSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUF4Q0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDTTtJQUUxQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNNO0lBRTFCO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO21EQUNNO0lBTmhCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0EyQ2hDO0lBQUQsbUJBQUM7Q0EzQ0QsQUEyQ0MsQ0EzQ3lDLEVBQUUsQ0FBQyxTQUFTLEdBMkNyRDtrQkEzQ29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVybWpEaWNlQW5pbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgZGljZTFTcDogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBkaWNlMlNwOiBjYy5TcHJpdGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXHJcbiAgICBkaWNlU2ZBcnI6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIGVmZmVjdFNrOiBzcC5Ta2VsZXRvbjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCl7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTayA9IGNjLmZpbmQoXCJlZmZlY3RcIiwgdGhpcy5ub2RlKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMuZGljZTFTcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZGljZTJTcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93RGljZShkaWNlOiBudW1iZXJbXSwgaXNBbmltOiBib29sZWFuKXtcclxuICAgICAgICB0aGlzLnNldERpY2VTdHlsZShkaWNlKTtcclxuICAgICAgICBpZiAoaXNBbmltKXtcclxuICAgICAgICAgICAgdGhpcy5kaWNlMVNwLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZGljZTJTcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVmZmVjdFNrLnNldEFuaW1hdGlvbigwLCBcImlkbGVcIiwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRpY2UxU3Aubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmRpY2UyU3Aubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldERpY2VTdHlsZShkaWNlOiBudW1iZXJbXSl7XHJcbiAgICAgICAgbGV0IFtkaWNlMSwgZGljZTJdID0gZGljZTtcclxuICAgICAgICB0aGlzLmRpY2UxU3Auc3ByaXRlRnJhbWUgPSB0aGlzLmRpY2VTZkFycltkaWNlMSAtIDFdO1xyXG4gICAgICAgIHRoaXMuZGljZTJTcC5zcHJpdGVGcmFtZSA9IHRoaXMuZGljZVNmQXJyW2RpY2UyIC0gMV07XHJcbiAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5kaWNlMVNwLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5kaWNlMlNwLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCl7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5lZmZlY3RTay5jbGVhclRyYWNrcygpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==