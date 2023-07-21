
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/loadingMVC/WndGameRestoreUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '735aexVqGZMDYvq8csk5614', 'WndGameRestoreUI');
// hall/scripts/logic/core/loadingMVC/WndGameRestoreUI.ts

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
var WndBase_1 = require("../ui/WndBase");
var WndGameRestoreUI = /** @class */ (function (_super) {
    __extends(WndGameRestoreUI, _super);
    function WndGameRestoreUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autoClose = true;
        _this.autoReleaseFunc = true;
        return _this;
    }
    WndGameRestoreUI.prototype.onInit = function () {
        this.name = "WndGameRestoreUI";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/LoadingScene/GameRestoreUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndGameRestoreUI.prototype.initView = function () {
        this.addCommonClick("bg/close", this.onCloseClick, this);
        this.noBtnNode = this.addCommonClick("cancelBtn", this.onCloseClick, this);
        this.yesBtnNode = this.addCommonClick("okBtn", this.onYesBtnClick, this);
    };
    /**
    * @param {string} content
    * @param {number} type   1 显示 确定取消  2  显示 确定
    * @param {Function} yesCallback
    * @param {Function} noCallback
    * @param {boolean} autoClose  点击按钮后是否自动关闭界面
    * @memberof WndMessageBox
    */
    WndGameRestoreUI.prototype.onOpen = function () {
        if (this.args == null || this.args.length == 0) {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        this.yesCallback = this.args[0];
        this.noCallback = this.args[1];
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
    };
    WndGameRestoreUI.prototype.onCloseClick = function () {
        if (this.autoClose)
            this.close();
    };
    WndGameRestoreUI.prototype.onClose = function () {
    };
    WndGameRestoreUI.prototype.onCloseAnimFinish = function () {
        if (this.noCallback) {
            //防止嵌套调用
            var tmpnoCallback = this.noCallback;
            if (this.autoReleaseFunc) {
                this.noCallback = null;
            }
            tmpnoCallback();
        }
    };
    WndGameRestoreUI.prototype.onYesBtnClick = function () {
        this.noCallback = null;
        if (this.autoClose)
            this.close();
        if (this.yesCallback) {
            this.yesCallback();
            if (this.autoReleaseFunc) {
                this.yesCallback = null;
            }
        }
    };
    return WndGameRestoreUI;
}(WndBase_1.default));
exports.default = WndGameRestoreUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGxvYWRpbmdNVkNcXFduZEdhbWVSZXN0b3JlVUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQXFEO0FBR3JEO0lBQThDLG9DQUFPO0lBQXJEO1FBQUEscUVBbUZDO1FBOUVXLGVBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIscUJBQWUsR0FBRyxJQUFJLENBQUM7O0lBNkVuQyxDQUFDO0lBM0VhLGlDQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLDRDQUE0QyxDQUFDO1FBQzVELElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQVcsQ0FBQyxJQUFJLENBQUM7SUFDeEMsQ0FBQztJQUVTLG1DQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFHQTs7Ozs7OztNQU9FO0lBQ08saUNBQU0sR0FBaEI7UUFFSSxJQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFDN0M7WUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUdPLHVDQUFZLEdBQXBCO1FBRUksSUFBRyxJQUFJLENBQUMsU0FBUztZQUNiLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVyQixDQUFDO0lBRVMsa0NBQU8sR0FBakI7SUFHQSxDQUFDO0lBRVMsNENBQWlCLEdBQTNCO1FBQ0ksSUFBRyxJQUFJLENBQUMsVUFBVSxFQUNsQjtZQUNJLFFBQVE7WUFDUixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3BDLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7YUFDMUI7WUFDRCxhQUFhLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFTyx3Q0FBYSxHQUFyQjtRQUVJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUcsSUFBSSxDQUFDLFNBQVM7WUFDYixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUNuQjtZQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQzNCO1NBQ0o7SUFDTCxDQUFDO0lBR0wsdUJBQUM7QUFBRCxDQW5GQSxBQW1GQyxDQW5GNkMsaUJBQU8sR0FtRnBEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UsIHsgRGVzdG9yeVR5cGUgfSBmcm9tIFwiLi4vdWkvV25kQmFzZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZEdhbWVSZXN0b3JlVUkgZXh0ZW5kcyBXbmRCYXNlIHtcclxuICAgIHByaXZhdGUgeWVzQnRuTm9kZTpjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBub0J0bk5vZGU6Y2MuTm9kZTtcclxuICAgIHByaXZhdGUgeWVzQ2FsbGJhY2s6RnVuY3Rpb247XHJcbiAgICBwcml2YXRlIG5vQ2FsbGJhY2s6RnVuY3Rpb247XHJcbiAgICBwcml2YXRlIGF1dG9DbG9zZSA9IHRydWU7XHJcbiAgICBwcml2YXRlIGF1dG9SZWxlYXNlRnVuYyA9IHRydWU7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZEdhbWVSZXN0b3JlVUlcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gXCJQb3BMYXllclwiO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL0xvYWRpbmdTY2VuZS9HYW1lUmVzdG9yZVVJXCI7XHJcbiAgICAgICAgdGhpcy5kZXN0b3J5VHlwZSA9IERlc3RvcnlUeXBlLk5vbmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJiZy9jbG9zZVwiLCB0aGlzLm9uQ2xvc2VDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub0J0bk5vZGUgPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY2FuY2VsQnRuXCIsIHRoaXMub25DbG9zZUNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnllc0J0bk5vZGUgPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwib2tCdG5cIiwgdGhpcy5vblllc0J0bkNsaWNrLCB0aGlzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0eXBlICAgMSDmmL7npLog56Gu5a6a5Y+W5raIICAyICDmmL7npLog56Gu5a6aXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB5ZXNDYWxsYmFja1xyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbm9DYWxsYmFja1xyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhdXRvQ2xvc2UgIOeCueWHu+aMiemSruWQjuaYr+WQpuiHquWKqOWFs+mXreeVjOmdolxyXG4gICAgICogQG1lbWJlcm9mIFduZE1lc3NhZ2VCb3hcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uT3BlbigpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5hcmdzID09IG51bGwgfHwgdGhpcy5hcmdzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5rKh5pyJ6K6+572u5Y+C5pWwXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy55ZXNDYWxsYmFjayA9IHRoaXMuYXJnc1swXTtcclxuICAgICAgICB0aGlzLm5vQ2FsbGJhY2sgPSB0aGlzLmFyZ3NbMV07XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkZPUkNFX0hJREVfV0FJVElORyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgb25DbG9zZUNsaWNrKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmF1dG9DbG9zZSlcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2VBbmltRmluaXNoKCkge1xyXG4gICAgICAgIGlmKHRoaXMubm9DYWxsYmFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v6Ziy5q2i5bWM5aWX6LCD55SoXHJcbiAgICAgICAgICAgIGxldCB0bXBub0NhbGxiYWNrID0gdGhpcy5ub0NhbGxiYWNrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvUmVsZWFzZUZ1bmMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdG1wbm9DYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uWWVzQnRuQ2xpY2soKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubm9DYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgaWYodGhpcy5hdXRvQ2xvc2UpXHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICBpZih0aGlzLnllc0NhbGxiYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy55ZXNDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvUmVsZWFzZUZ1bmMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueWVzQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn0iXX0=