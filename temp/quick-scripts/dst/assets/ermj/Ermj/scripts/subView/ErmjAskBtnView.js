
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/ErmjAskBtnView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '39e695Jig9BlZDbrUSNqQxv', 'ErmjAskBtnView');
// ermj/Ermj/scripts/subView/ErmjAskBtnView.ts

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
var ErmjBaseView_1 = require("./ErmjBaseView");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjAskBtnView = /** @class */ (function (_super) {
    __extends(ErmjAskBtnView, _super);
    function ErmjAskBtnView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    ErmjAskBtnView.prototype.initView = function () {
        this.autoBtn = this.getChild('autoBtn');
        this.autoBtn.active = false;
        this.autoCloseBtn = this.getChild('autoBtn/autoClose');
        this.autoCloseBtn.active = false;
        ErmjGameConst_1.default.addCommonClick(this.autoBtn, "", this.onAutoPlayClick, this);
        this.cancelAuto = this.getChild('cancelAuto');
        this.cancelAuto.active = false;
        ErmjGameConst_1.default.addCommonClick(this.node, "cancelAuto/btnCancel", this.onCancelAutoClick, this);
    };
    ErmjAskBtnView.prototype.onClose = function () {
        this.clearByRound();
    };
    ErmjAskBtnView.prototype.clearByRound = function () {
        this.autoBtn.active = false;
        this.cancelAuto.active = false;
        this.autoCloseBtn.active = false;
    };
    ErmjAskBtnView.prototype.clearByGame = function () {
        this.autoBtn.active = false;
        this.cancelAuto.active = false;
        this.autoCloseBtn.active = false;
    };
    //挂机按钮
    ErmjAskBtnView.prototype.onAutoPlayClick = function () {
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        this.setAutoPlayBtnShow(false);
        Game.Server.send(this.Define.CmdAuto, { auto_play: 1 });
    };
    //取消挂机按钮
    ErmjAskBtnView.prototype.onCancelAutoClick = function () {
        ErmjGameConst_1.default.playSound(ErmjPathHelper_1.ErmjAudioConst.commonAudio.ButtonClick, true);
        this.setAutoPlayBtnShow(true);
        Game.Server.send(this.Define.CmdAuto, { auto_play: 0 });
    };
    ErmjAskBtnView.prototype.setAutoPlayBtnShow = function (isShow) {
        this.autoBtn.active = true;
        this.cancelAuto.active = !isShow;
        this.autoCloseBtn.active = !isShow;
    };
    return ErmjAskBtnView;
}(ErmjBaseView_1.default));
exports.default = ErmjAskBtnView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcRXJtakFza0J0blZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBQzFDLHlEQUF3RDtBQUN4RCx1REFBa0Q7QUFFbEQ7SUFBNEMsa0NBQVk7SUFNcEQsd0JBQVksSUFBYTtRQUF6QixZQUNJLGlCQUFPLFNBRVY7UUFERyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQUN2QixDQUFDO0lBRVMsaUNBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNqQyx1QkFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDL0IsdUJBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEcsQ0FBQztJQUdTLGdDQUFPLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxxQ0FBWSxHQUFuQjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxvQ0FBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxNQUFNO0lBQ0Usd0NBQWUsR0FBdkI7UUFDSSx1QkFBYSxDQUFDLFNBQVMsQ0FBQywrQkFBYyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELFFBQVE7SUFDQSwwQ0FBaUIsR0FBekI7UUFDSSx1QkFBYSxDQUFDLFNBQVMsQ0FBQywrQkFBYyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVNLDJDQUFrQixHQUF6QixVQUEwQixNQUFlO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUN2QyxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQTFEQSxBQTBEQyxDQTFEMkMsc0JBQVksR0EwRHZEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVybWpCYXNlVmlldyBmcm9tIFwiLi9Fcm1qQmFzZVZpZXdcIjtcclxuaW1wb3J0IHsgRXJtakF1ZGlvQ29uc3QgfSBmcm9tIFwiLi4vZGF0YS9Fcm1qUGF0aEhlbHBlclwiO1xyXG5pbXBvcnQgRXJtakdhbWVDb25zdCBmcm9tIFwiLi4vZGF0YS9Fcm1qR2FtZUNvbnN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcm1qQXNrQnRuVmlldyBleHRlbmRzIEVybWpCYXNlVmlldyB7XHJcblxyXG4gICAgcHJpdmF0ZSBhdXRvQnRuOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBjYW5jZWxBdXRvOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBhdXRvQ2xvc2VCdG46IGNjLk5vZGU7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLmF1dG9CdG4gPSB0aGlzLmdldENoaWxkKCdhdXRvQnRuJyk7XHJcbiAgICAgICAgdGhpcy5hdXRvQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXV0b0Nsb3NlQnRuID0gdGhpcy5nZXRDaGlsZCgnYXV0b0J0bi9hdXRvQ2xvc2UnKTtcclxuICAgICAgICB0aGlzLmF1dG9DbG9zZUJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LmFkZENvbW1vbkNsaWNrKHRoaXMuYXV0b0J0biwgXCJcIiwgdGhpcy5vbkF1dG9QbGF5Q2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2FuY2VsQXV0byA9IHRoaXMuZ2V0Q2hpbGQoJ2NhbmNlbEF1dG8nKTtcclxuICAgICAgICB0aGlzLmNhbmNlbEF1dG8uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5hZGRDb21tb25DbGljayh0aGlzLm5vZGUsIFwiY2FuY2VsQXV0by9idG5DYW5jZWxcIiwgdGhpcy5vbkNhbmNlbEF1dG9DbGljaywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJCeVJvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQnlSb3VuZCgpIHtcclxuICAgICAgICB0aGlzLmF1dG9CdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxBdXRvLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXV0b0Nsb3NlQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhckJ5R2FtZSgpIHtcclxuICAgICAgICB0aGlzLmF1dG9CdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxBdXRvLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXV0b0Nsb3NlQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5oyC5py65oyJ6ZKuXHJcbiAgICBwcml2YXRlIG9uQXV0b1BsYXlDbGljaygpIHtcclxuICAgICAgICBFcm1qR2FtZUNvbnN0LnBsYXlTb3VuZChFcm1qQXVkaW9Db25zdC5jb21tb25BdWRpby5CdXR0b25DbGljaywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRBdXRvUGxheUJ0blNob3coZmFsc2UpO1xyXG4gICAgICAgIEdhbWUuU2VydmVyLnNlbmQodGhpcy5EZWZpbmUuQ21kQXV0bywgeyBhdXRvX3BsYXk6IDEgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lj5bmtojmjILmnLrmjInpkq5cclxuICAgIHByaXZhdGUgb25DYW5jZWxBdXRvQ2xpY2soKSB7XHJcbiAgICAgICAgRXJtakdhbWVDb25zdC5wbGF5U291bmQoRXJtakF1ZGlvQ29uc3QuY29tbW9uQXVkaW8uQnV0dG9uQ2xpY2ssIHRydWUpO1xyXG4gICAgICAgIHRoaXMuc2V0QXV0b1BsYXlCdG5TaG93KHRydWUpO1xyXG4gICAgICAgIEdhbWUuU2VydmVyLnNlbmQodGhpcy5EZWZpbmUuQ21kQXV0bywgeyBhdXRvX3BsYXk6IDAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEF1dG9QbGF5QnRuU2hvdyhpc1Nob3c6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmF1dG9CdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNhbmNlbEF1dG8uYWN0aXZlID0gIWlzU2hvdztcclxuICAgICAgICB0aGlzLmF1dG9DbG9zZUJ0bi5hY3RpdmUgPSAhaXNTaG93O1xyXG4gICAgfVxyXG59Il19