
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/subView/DdzSettleView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '274acS12ZZNY6jpjWoAK80u', 'DdzSettleView');
// ddz/ddz/scripts/subView/DdzSettleView.ts

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
var DdzPathHelper_1 = require("../data/DdzPathHelper");
var DdzDriver_1 = require("../DdzDriver");
var DdzGameConst_1 = require("../data/DdzGameConst");
/**
 * 左侧方设置，规则，退出等功能按钮
 */
var DdzSettleView = /** @class */ (function (_super) {
    __extends(DdzSettleView, _super);
    function DdzSettleView(node) {
        var _this = _super.call(this) || this;
        _this.clickLimit = false;
        _this.setNode(node);
        return _this;
    }
    DdzSettleView.prototype.initView = function () {
        this.winView = new DdzSettleContent(this.getChild('contentNode/winNode'));
        this.winView.active = false;
        this.loseView = new DdzSettleContent(this.getChild('contentNode/loseNode'));
        this.loseView.active = false;
        this.closeBtn = this.getChild('contentNode/closeBtn');
        this.closeBtn.active = false;
        DdzGameConst_1.default.addCommonClick(this.closeBtn, "", this.closeView, this);
        this.exitBtn = this.getChild('contentNode/exitBtn');
        this.exitBtn.active = false;
        DdzGameConst_1.default.addCommonClick(this.exitBtn, "", this.onExitClick, this);
        this.gameBtn = this.getChild('contentNode/gameBtn');
        this.gameBtn.active = false;
        DdzGameConst_1.default.addCommonClick(this.gameBtn, "", this.onGameClick, this);
    };
    DdzSettleView.prototype.onOpen = function () {
        this.delayShowActionBtn(5000); // 以防没收到服务器协议情况
    };
    DdzSettleView.prototype.delayShowActionBtn = function (delay) {
        var _this = this;
        this.timer = setTimeout(function () {
            _this.showActionBtn(true);
        }, delay);
    };
    DdzSettleView.prototype.playSettleAnim = function (isWin, detail) {
        if (detail === void 0) { detail = {}; }
        var arr = detail.user_calcs || [];
        if (isWin) {
            this.winView.active = true;
            this.winView.showData(arr, isWin, detail.land_chair);
        }
        else {
            this.loseView.active = true;
            this.loseView.showData(arr, isWin, detail.land_chair);
        }
    };
    DdzSettleView.prototype.showActionBtn = function (flag) {
        this.closeBtn.active = flag;
        this.exitBtn.active = flag;
        this.gameBtn.active = flag;
        if (flag)
            clearTimeout(this.timer);
    };
    // public showSettleAction(timeout: number = 2) {
    //     Game.Component.scheduleOnce(() => {
    //         this.closeBtn.active = true;
    //         this.exitBtn.active = true;
    //         this.gameBtn.active = true;
    //     }, timeout);
    // }
    DdzSettleView.prototype.onClose = function () {
        this.winView.active = false;
        this.loseView.active = false;
        this.closeBtn.active = false;
        this.exitBtn.active = false;
        this.gameBtn.active = false;
        this.clickLimit = false;
        clearTimeout(this.timer);
    };
    DdzSettleView.prototype.closeView = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        this.active = false;
    };
    DdzSettleView.prototype.onExitClick = function () {
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        Game.Server.send(this.Define.CmdLeave, { "IsClose": 1 });
        DdzDriver_1.default.instance.leaveGame();
    };
    DdzSettleView.prototype.onGameClick = function () {
        var _this = this;
        Global.Audio.playGameBundleSound(DdzPathHelper_1.DdzAudioConst.audioCommonPath + DdzPathHelper_1.DdzAudioConst.commonAudio.ButtonClick, true);
        if (this.clickLimit)
            return;
        DdzDriver_1.default.instance.reMatchPlayer();
        this.clickLimit = true;
        Game.Component.scheduleOnce(function () {
            _this.clickLimit = false;
        }, 3);
    };
    DdzSettleView.prototype.clearByRound = function () {
        this.active = false;
    };
    return DdzSettleView;
}(DdzBaseView_1.default));
exports.default = DdzSettleView;
var DdzSettleContent = /** @class */ (function (_super) {
    __extends(DdzSettleContent, _super);
    function DdzSettleContent(node) {
        var _this = _super.call(this) || this;
        _this.itemList = [];
        _this.setNode(node);
        return _this;
    }
    DdzSettleContent.prototype.initView = function () {
        this.effect = this.getComponent('effect', sp.Skeleton);
        this.contentNode = this.getChild('content');
        for (var i = 1; i <= 3; i++) {
            var node = this.getChild('content/item' + i);
            var item = new DdzSettleItem(node);
            this.itemList.push(item);
        }
    };
    DdzSettleContent.prototype.onOpen = function () {
        var _this = this;
        this.effect.setAnimation(0, 'idle', false);
        this.effect.addAnimation(0, 'idle1', true, this.Define.PlaySettleEffectTime);
        this.contentNode.opacity = 1;
        Game.Component.scheduleOnce(function () {
            var action = cc.fadeTo(0.5, 255);
            _this.contentNode.runAction(action);
        }, this.Define.PlaySettleEffectTime);
    };
    DdzSettleContent.prototype.showData = function (arr, isSelfWin, landChair) {
        var _this = this;
        if (arr === void 0) { arr = []; }
        var dzLocalSeat = this.Context.get(this.Define.FieldDzLocSeat);
        if (isSelfWin && dzLocalSeat == 0) {
            arr.sort(function (user) {
                var flag = (user.chair - landChair) == 0 ? -1 : 1;
                return flag;
            });
        }
        arr.forEach(function (user, index) {
            if (_this.itemList[index]) {
                _this.itemList[index].setStyle(dzLocalSeat, isSelfWin, user);
            }
        });
    };
    DdzSettleContent.prototype.onClose = function () {
        this.contentNode.stopAllActions();
    };
    return DdzSettleContent;
}(DdzBaseView_1.default));
var DdzSettleItem = /** @class */ (function (_super) {
    __extends(DdzSettleItem, _super);
    function DdzSettleItem(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    DdzSettleItem.prototype.initView = function () {
        this.checkBg = this.getChild('checkBg');
        this.dzIcon = this.getChild('dzIcon');
        this.nameLbl = this.getComponent('nameLbl', cc.Label);
        this.multLbl = this.getComponent('multLbl', cc.Label);
        this.pointLbl = this.getComponent('pointLbl', cc.Label);
    };
    DdzSettleItem.prototype.setStyle = function (dzSeat, isSelfWin, data) {
        var localSeat = DdzDriver_1.default.instance.SitHelper.serverSToLocalN(data.chair);
        this.dzIcon.active = dzSeat == localSeat;
        this.checkBg.active = localSeat == 0;
        this.multLbl.string = '' + data.total_mult;
        this.pointLbl.string = '' + Global.Toolkit.formatPointStr(data.total_points, false, false);
        var info = this.Context.playerList[localSeat];
        this.nameLbl.string = Global.Toolkit.substrEndWithElli(info.nickname, 10, false);
        var color = new cc.Color(255, 255, 255);
        if (isSelfWin) {
            if (localSeat == 0) {
                color = new cc.Color(255, 197, 148);
            }
            else {
                color = new cc.Color(251, 250, 241);
            }
        }
        else {
            if (localSeat == 0) {
                color = new cc.Color(151, 181, 252);
            }
            else {
                color = new cc.Color(203, 227, 255);
            }
        }
        this.multLbl.node.color = color;
        this.nameLbl.node.color = color;
        this.pointLbl.node.color = color;
    };
    return DdzSettleItem;
}(DdzBaseView_1.default));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXHN1YlZpZXdcXERkelNldHRsZVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQXdDO0FBQ3hDLHVEQUFzRDtBQUN0RCwwQ0FBcUM7QUFDckMscURBQWdEO0FBRWhEOztHQUVHO0FBQ0g7SUFBMkMsaUNBQVc7SUFTbEQsdUJBQVksSUFBSTtRQUFoQixZQUNJLGlCQUFPLFNBRVY7UUFOTyxnQkFBVSxHQUFHLEtBQUssQ0FBQztRQUt2QixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRVMsZ0NBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzdCLHNCQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxN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QyxDQUFDO1FBRWpGLElBQUksS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksU0FBUyxFQUFFO1lBQ1gsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFO2dCQUNoQixLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDdkM7aUJBQ0k7Z0JBQ0QsS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZDO1NBQ0o7YUFDSTtZQUNELElBQUksU0FBUyxJQUFJLENBQUMsRUFBRTtnQkFDaEIsS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZDO2lCQUNJO2dCQUNELEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUN2QztTQUNKO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FqREEsQUFpREMsQ0FqRDJCLHFCQUFXLEdBaUR0QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZHpCYXNlVmlldyBmcm9tIFwiLi9EZHpCYXNlVmlld1wiO1xyXG5pbXBvcnQgeyBEZHpBdWRpb0NvbnN0IH0gZnJvbSBcIi4uL2RhdGEvRGR6UGF0aEhlbHBlclwiO1xyXG5pbXBvcnQgRGR6RHJpdmVyIGZyb20gXCIuLi9EZHpEcml2ZXJcIjtcclxuaW1wb3J0IERkekdhbWVDb25zdCBmcm9tIFwiLi4vZGF0YS9EZHpHYW1lQ29uc3RcIjtcclxuXHJcbi8qKlxyXG4gKiDlt6bkvqfmlrnorr7nva7vvIzop4TliJnvvIzpgIDlh7rnrYnlip/og73mjInpkq5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERkelNldHRsZVZpZXcgZXh0ZW5kcyBEZHpCYXNlVmlldyB7XHJcbiAgICBwcml2YXRlIHdpblZpZXc6IERkelNldHRsZUNvbnRlbnQ7XHJcbiAgICBwcml2YXRlIGxvc2VWaWV3OiBEZHpTZXR0bGVDb250ZW50O1xyXG4gICAgcHJpdmF0ZSBjbG9zZUJ0bjogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgZXhpdEJ0bjogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgZ2FtZUJ0bjogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgY2xpY2tMaW1pdCA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSB0aW1lcjogTm9kZUpTLlRpbWVvdXQ7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLndpblZpZXcgPSBuZXcgRGR6U2V0dGxlQ29udGVudCh0aGlzLmdldENoaWxkKCdjb250ZW50Tm9kZS93aW5Ob2RlJykpO1xyXG4gICAgICAgIHRoaXMud2luVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmxvc2VWaWV3ID0gbmV3IERkelNldHRsZUNvbnRlbnQodGhpcy5nZXRDaGlsZCgnY29udGVudE5vZGUvbG9zZU5vZGUnKSk7XHJcbiAgICAgICAgdGhpcy5sb3NlVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsb3NlQnRuID0gdGhpcy5nZXRDaGlsZCgnY29udGVudE5vZGUvY2xvc2VCdG4nKTtcclxuICAgICAgICB0aGlzLmNsb3NlQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIERkekdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLmNsb3NlQnRuLCBcIlwiLCB0aGlzLmNsb3NlVmlldywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5leGl0QnRuID0gdGhpcy5nZXRDaGlsZCgnY29udGVudE5vZGUvZXhpdEJ0bicpO1xyXG4gICAgICAgIHRoaXMuZXhpdEJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBEZHpHYW1lQ29uc3QuYWRkQ29tbW9uQ2xpY2sodGhpcy5leGl0QnRuLCBcIlwiLCB0aGlzLm9uRXhpdENsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmdhbWVCdG4gPSB0aGlzLmdldENoaWxkKCdjb250ZW50Tm9kZS9nYW1lQnRuJyk7XHJcbiAgICAgICAgdGhpcy5nYW1lQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIERkekdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLmdhbWVCdG4sIFwiXCIsIHRoaXMub25HYW1lQ2xpY2ssIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCl7XHJcbiAgICAgICAgdGhpcy5kZWxheVNob3dBY3Rpb25CdG4oNTAwMCk7ICAgICAgICAgLy8g5Lul6Ziy5rKh5pS25Yiw5pyN5Yqh5Zmo5Y2P6K6u5oOF5Ya1XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbGF5U2hvd0FjdGlvbkJ0bihkZWxheTogbnVtYmVyKXtcclxuICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0FjdGlvbkJ0bih0cnVlKTtcclxuICAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgcGxheVNldHRsZUFuaW0oaXNXaW46IGJvb2xlYW4sIGRldGFpbDogYW55ID0ge30pIHtcclxuICAgICAgICBsZXQgYXJyID0gZGV0YWlsLnVzZXJfY2FsY3MgfHwgW107XHJcbiAgICAgICAgaWYgKGlzV2luKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2luVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLndpblZpZXcuc2hvd0RhdGEoYXJyLCBpc1dpbiwgZGV0YWlsLmxhbmRfY2hhaXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sb3NlVmlldy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxvc2VWaWV3LnNob3dEYXRhKGFyciwgaXNXaW4sIGRldGFpbC5sYW5kX2NoYWlyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dBY3Rpb25CdG4oZmxhZzogYm9vbGVhbil7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ0bi5hY3RpdmUgPSBmbGFnO1xyXG4gICAgICAgIHRoaXMuZXhpdEJ0bi5hY3RpdmUgPSBmbGFnO1xyXG4gICAgICAgIHRoaXMuZ2FtZUJ0bi5hY3RpdmUgPSBmbGFnO1xyXG5cdFx0aWYoZmxhZylcclxuICAgICAgICBcdGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgc2hvd1NldHRsZUFjdGlvbih0aW1lb3V0OiBudW1iZXIgPSAyKSB7XHJcbiAgICAvLyAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgIC8vICAgICAgICAgdGhpcy5jbG9zZUJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgLy8gICAgICAgICB0aGlzLmV4aXRCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgIC8vICAgICAgICAgdGhpcy5nYW1lQnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAvLyAgICAgfSwgdGltZW91dCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy53aW5WaWV3LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubG9zZVZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmV4aXRCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5nYW1lQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xpY2tMaW1pdCA9IGZhbHNlO1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsb3NlVmlldygpIHtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVTb3VuZChEZHpBdWRpb0NvbnN0LmF1ZGlvQ29tbW9uUGF0aCArIERkekF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQnV0dG9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkV4aXRDbGljaygpIHtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUdhbWVCdW5kbGVTb3VuZChEZHpBdWRpb0NvbnN0LmF1ZGlvQ29tbW9uUGF0aCArIERkekF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQnV0dG9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgIEdhbWUuU2VydmVyLnNlbmQodGhpcy5EZWZpbmUuQ21kTGVhdmUsIHsgXCJJc0Nsb3NlXCI6IDEgfSk7XHJcbiAgICAgICAgRGR6RHJpdmVyLmluc3RhbmNlLmxlYXZlR2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25HYW1lQ2xpY2soKSB7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlHYW1lQnVuZGxlU291bmQoRGR6QXVkaW9Db25zdC5hdWRpb0NvbW1vblBhdGggKyBEZHpBdWRpb0NvbnN0LmNvbW1vbkF1ZGlvLkJ1dHRvbkNsaWNrLCB0cnVlKTtcclxuICAgICAgICBpZiAodGhpcy5jbGlja0xpbWl0KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgRGR6RHJpdmVyLmluc3RhbmNlLnJlTWF0Y2hQbGF5ZXIoKTtcclxuICAgICAgICB0aGlzLmNsaWNrTGltaXQgPSB0cnVlO1xyXG4gICAgICAgIEdhbWUuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tMaW1pdCA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5Um91bmQoKXtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEZHpTZXR0bGVDb250ZW50IGV4dGVuZHMgRGR6QmFzZVZpZXcge1xyXG4gICAgcHJpdmF0ZSBlZmZlY3Q6IHNwLlNrZWxldG9uO1xyXG4gICAgcHJpdmF0ZSBpdGVtTGlzdDogRGR6U2V0dGxlSXRlbVtdID0gW107XHJcbiAgICBwcml2YXRlIGNvbnRlbnROb2RlOiBjYy5Ob2RlO1xyXG4gICAgY29uc3RydWN0b3Iobm9kZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLmVmZmVjdCA9IDxzcC5Ta2VsZXRvbj50aGlzLmdldENvbXBvbmVudCgnZWZmZWN0Jywgc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMuY29udGVudE5vZGUgPSB0aGlzLmdldENoaWxkKCdjb250ZW50Jyk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5nZXRDaGlsZCgnY29udGVudC9pdGVtJyArIGkpO1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IG5ldyBEZHpTZXR0bGVJdGVtKG5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1MaXN0LnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy5lZmZlY3Quc2V0QW5pbWF0aW9uKDAsICdpZGxlJywgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuZWZmZWN0LmFkZEFuaW1hdGlvbigwLCAnaWRsZTEnLCB0cnVlLCB0aGlzLkRlZmluZS5QbGF5U2V0dGxlRWZmZWN0VGltZSk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50Tm9kZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICBHYW1lLkNvbXBvbmVudC5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYWN0aW9uID0gY2MuZmFkZVRvKDAuNSwgMjU1KTtcclxuICAgICAgICAgICAgdGhpcy5jb250ZW50Tm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcclxuICAgICAgICB9LCB0aGlzLkRlZmluZS5QbGF5U2V0dGxlRWZmZWN0VGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dEYXRhKGFyciA9IFtdLCBpc1NlbGZXaW46IGJvb2xlYW4sIGxhbmRDaGFpcjogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGR6TG9jYWxTZWF0ID0gdGhpcy5Db250ZXh0LmdldCh0aGlzLkRlZmluZS5GaWVsZER6TG9jU2VhdCk7XHJcbiAgICAgICAgaWYgKGlzU2VsZldpbiAmJiBkekxvY2FsU2VhdCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGFyci5zb3J0KHVzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZsYWcgPSAodXNlci5jaGFpciAtIGxhbmRDaGFpcikgPT0gMCA/IC0xIDogMTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmbGFnO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBhcnIuZm9yRWFjaCgodXNlciwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXRlbUxpc3RbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1MaXN0W2luZGV4XS5zZXRTdHlsZShkekxvY2FsU2VhdCwgaXNTZWxmV2luLCB1c2VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50Tm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEZHpTZXR0bGVJdGVtIGV4dGVuZHMgRGR6QmFzZVZpZXcge1xyXG4gICAgcHJpdmF0ZSBjaGVja0JnOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBkekljb246IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIG5hbWVMYmw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBtdWx0TGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgcG9pbnRMYmw6IGNjLkxhYmVsO1xyXG4gICAgY29uc3RydWN0b3Iobm9kZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLmNoZWNrQmcgPSB0aGlzLmdldENoaWxkKCdjaGVja0JnJyk7XHJcbiAgICAgICAgdGhpcy5kekljb24gPSB0aGlzLmdldENoaWxkKCdkekljb24nKTtcclxuICAgICAgICB0aGlzLm5hbWVMYmwgPSA8Y2MuTGFiZWw+dGhpcy5nZXRDb21wb25lbnQoJ25hbWVMYmwnLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5tdWx0TGJsID0gPGNjLkxhYmVsPnRoaXMuZ2V0Q29tcG9uZW50KCdtdWx0TGJsJywgY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMucG9pbnRMYmwgPSA8Y2MuTGFiZWw+dGhpcy5nZXRDb21wb25lbnQoJ3BvaW50TGJsJywgY2MuTGFiZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTdHlsZShkelNlYXQ6IG51bWJlciwgaXNTZWxmV2luOiBib29sZWFuLCBkYXRhKSB7XHJcbiAgICAgICAgbGV0IGxvY2FsU2VhdCA9IERkekRyaXZlci5pbnN0YW5jZS5TaXRIZWxwZXIuc2VydmVyU1RvTG9jYWxOKGRhdGEuY2hhaXIpO1xyXG4gICAgICAgIHRoaXMuZHpJY29uLmFjdGl2ZSA9IGR6U2VhdCA9PSBsb2NhbFNlYXQ7XHJcbiAgICAgICAgdGhpcy5jaGVja0JnLmFjdGl2ZSA9IGxvY2FsU2VhdCA9PSAwO1xyXG4gICAgICAgIHRoaXMubXVsdExibC5zdHJpbmcgPSAnJyArIGRhdGEudG90YWxfbXVsdDtcclxuICAgICAgICB0aGlzLnBvaW50TGJsLnN0cmluZyA9ICcnICsgR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoZGF0YS50b3RhbF9wb2ludHMsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLkNvbnRleHQucGxheWVyTGlzdFtsb2NhbFNlYXRdO1xyXG4gICAgICAgIHRoaXMubmFtZUxibC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5zdWJzdHJFbmRXaXRoRWxsaShpbmZvLm5pY2tuYW1lLCAxMCwgZmFsc2UpO1xyXG5cclxuICAgICAgICBsZXQgY29sb3IgPSBuZXcgY2MuQ29sb3IoMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAgICAgaWYgKGlzU2VsZldpbikge1xyXG4gICAgICAgICAgICBpZiAobG9jYWxTZWF0ID09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbG9yID0gbmV3IGNjLkNvbG9yKDI1NSwgMTk3LCAxNDgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29sb3IgPSBuZXcgY2MuQ29sb3IoMjUxLCAyNTAsIDI0MSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbFNlYXQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29sb3IgPSBuZXcgY2MuQ29sb3IoMTUxLCAxODEsIDI1Mik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb2xvciA9IG5ldyBjYy5Db2xvcigyMDMsIDIyNywgMjU1KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm11bHRMYmwubm9kZS5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMubmFtZUxibC5ub2RlLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5wb2ludExibC5ub2RlLmNvbG9yID0gY29sb3I7XHJcbiAgICB9XHJcbn0iXX0=