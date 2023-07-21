
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/loadingMVC/WndGameUpdateUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bcf9cDAmM5JUY0yNU3RftMP', 'WndGameUpdateUI');
// hall/scripts/logic/core/loadingMVC/WndGameUpdateUI.ts

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
var WndGameUpdateUI = /** @class */ (function (_super) {
    __extends(WndGameUpdateUI, _super);
    function WndGameUpdateUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autoClose = true;
        _this.autoReleaseFunc = true;
        return _this;
    }
    WndGameUpdateUI.prototype.onInit = function () {
        this.name = "WndGameUpdateUI";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/LoadingScene/GameUpdateUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndGameUpdateUI.prototype.initView = function () {
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
    WndGameUpdateUI.prototype.onOpen = function () {
        if (this.args == null || this.args.length == 0) {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        //1 两个按钮  2 yes 一个按钮
        var type = this.args[0];
        this.updateBtnByType(type);
        this.yesCallback = this.args[1];
        this.noCallback = this.args[2];
        this.autoClose = this.args[3] != false;
        this.autoReleaseFunc = this.args[4] != false;
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
    };
    WndGameUpdateUI.prototype.updateBtnByType = function (type) {
        if (type == 1) {
            this.yesBtnNode.active = true;
            this.noBtnNode.active = true;
            this.yesBtnNode.x = 157;
            this.noBtnNode.x = -157;
        }
        else {
            this.yesBtnNode.active = true;
            this.noBtnNode.active = false;
            this.yesBtnNode.x = 0;
        }
    };
    WndGameUpdateUI.prototype.onCloseClick = function () {
        if (this.autoClose)
            this.close();
    };
    WndGameUpdateUI.prototype.onClose = function () {
    };
    WndGameUpdateUI.prototype.onCloseAnimFinish = function () {
        if (this.noCallback) {
            //防止嵌套调用
            var tmpnoCallback = this.noCallback;
            if (this.autoReleaseFunc) {
                this.noCallback = null;
            }
            tmpnoCallback();
        }
        else {
            Logger.error("onCloseAnimFinish noCallback is null");
        }
    };
    WndGameUpdateUI.prototype.onYesBtnClick = function () {
        // this.noCallback = null;
        // if(this.autoClose)
        //     this.close();
        if (this.yesCallback) {
            this.yesCallback();
            if (this.autoReleaseFunc) {
                this.yesCallback = null;
            }
        }
    };
    return WndGameUpdateUI;
}(WndBase_1.default));
exports.default = WndGameUpdateUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGxvYWRpbmdNVkNcXFduZEdhbWVVcGRhdGVVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBcUQ7QUFHckQ7SUFBNkMsbUNBQU87SUFBcEQ7UUFBQSxxRUE0R0M7UUF2R1csZUFBUyxHQUFHLElBQUksQ0FBQztRQUNqQixxQkFBZSxHQUFHLElBQUksQ0FBQzs7SUFzR25DLENBQUM7SUFwR2EsZ0NBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsMkNBQTJDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBVyxDQUFDLElBQUksQ0FBQztJQUN4QyxDQUFDO0lBRVMsa0NBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUdBOzs7Ozs7O01BT0U7SUFDTyxnQ0FBTSxHQUFoQjtRQUVJLElBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUM3QztZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTztTQUNWO1FBQ0Qsb0JBQW9CO1FBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUM7UUFDdkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQztRQUU3QyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRU8seUNBQWUsR0FBdkIsVUFBd0IsSUFBSTtRQUV4QixJQUFHLElBQUksSUFBSSxDQUFDLEVBQ1o7WUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQTtTQUMxQjthQUVEO1lBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBR08sc0NBQVksR0FBcEI7UUFFSSxJQUFHLElBQUksQ0FBQyxTQUFTO1lBQ2IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRXJCLENBQUM7SUFFUyxpQ0FBTyxHQUFqQjtJQUdBLENBQUM7SUFFUywyQ0FBaUIsR0FBM0I7UUFDSSxJQUFHLElBQUksQ0FBQyxVQUFVLEVBQ2xCO1lBQ0ksUUFBUTtZQUNSLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDcEMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzthQUMxQjtZQUNELGFBQWEsRUFBRSxDQUFDO1NBQ25CO2FBQUs7WUFDRixNQUFNLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUE7U0FDdkQ7SUFDTCxDQUFDO0lBRU8sdUNBQWEsR0FBckI7UUFFSSwwQkFBMEI7UUFDMUIscUJBQXFCO1FBQ3JCLG9CQUFvQjtRQUNwQixJQUFHLElBQUksQ0FBQyxXQUFXLEVBQ25CO1lBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7YUFDM0I7U0FDSjtJQUNMLENBQUM7SUFHTCxzQkFBQztBQUFELENBNUdBLEFBNEdDLENBNUc0QyxpQkFBTyxHQTRHbkQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSwgeyBEZXN0b3J5VHlwZSB9IGZyb20gXCIuLi91aS9XbmRCYXNlXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kR2FtZVVwZGF0ZVVJIGV4dGVuZHMgV25kQmFzZSB7XHJcbiAgICBwcml2YXRlIHllc0J0bk5vZGU6Y2MuTm9kZTtcclxuICAgIHByaXZhdGUgbm9CdG5Ob2RlOmNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHllc0NhbGxiYWNrOkZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBub0NhbGxiYWNrOkZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBhdXRvQ2xvc2UgPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBhdXRvUmVsZWFzZUZ1bmMgPSB0cnVlO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRHYW1lVXBkYXRlVUlcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gXCJQb3BMYXllclwiO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL0xvYWRpbmdTY2VuZS9HYW1lVXBkYXRlVUlcIjtcclxuICAgICAgICB0aGlzLmRlc3RvcnlUeXBlID0gRGVzdG9yeVR5cGUuTm9uZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJnL2Nsb3NlXCIsIHRoaXMub25DbG9zZUNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm5vQnRuTm9kZSA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjYW5jZWxCdG5cIiwgdGhpcy5vbkNsb3NlQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMueWVzQnRuTm9kZSA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJva0J0blwiLCB0aGlzLm9uWWVzQnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHR5cGUgICAxIOaYvuekuiDnoa7lrprlj5bmtoggIDIgIOaYvuekuiDnoa7lrppcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHllc0NhbGxiYWNrXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBub0NhbGxiYWNrXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGF1dG9DbG9zZSAg54K55Ye75oyJ6ZKu5ZCO5piv5ZCm6Ieq5Yqo5YWz6Zet55WM6Z2iXHJcbiAgICAgKiBAbWVtYmVyb2YgV25kTWVzc2FnZUJveFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmFyZ3MgPT0gbnVsbCB8fCB0aGlzLmFyZ3MubGVuZ3RoID09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmsqHmnInorr7nva7lj4LmlbBcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLzEg5Lik5Liq5oyJ6ZKuICAyIHllcyDkuIDkuKrmjInpkq5cclxuICAgICAgICBsZXQgdHlwZSA9IHRoaXMuYXJnc1swXTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUJ0bkJ5VHlwZSh0eXBlKTtcclxuICAgICAgICB0aGlzLnllc0NhbGxiYWNrID0gdGhpcy5hcmdzWzFdO1xyXG4gICAgICAgIHRoaXMubm9DYWxsYmFjayA9IHRoaXMuYXJnc1syXTtcclxuICAgICAgICB0aGlzLmF1dG9DbG9zZSA9IHRoaXMuYXJnc1szXSAhPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmF1dG9SZWxlYXNlRnVuYyA9IHRoaXMuYXJnc1s0XSAhPSBmYWxzZTtcclxuXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkZPUkNFX0hJREVfV0FJVElORyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVCdG5CeVR5cGUodHlwZSlcclxuICAgIHtcclxuICAgICAgICBpZih0eXBlID09IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnllc0J0bk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ub0J0bk5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy55ZXNCdG5Ob2RlLnggPSAxNTc7XHJcbiAgICAgICAgICAgIHRoaXMubm9CdG5Ob2RlLnggPSAtMTU3XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueWVzQnRuTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vQnRuTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy55ZXNCdG5Ob2RlLnggPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsb3NlQ2xpY2soKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuYXV0b0Nsb3NlKVxyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZUFuaW1GaW5pc2goKSB7XHJcbiAgICAgICAgaWYodGhpcy5ub0NhbGxiYWNrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/pmLLmraLltYzlpZfosIPnlKhcclxuICAgICAgICAgICAgbGV0IHRtcG5vQ2FsbGJhY2sgPSB0aGlzLm5vQ2FsbGJhY2s7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9SZWxlYXNlRnVuYykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0bXBub0NhbGxiYWNrKCk7XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJvbkNsb3NlQW5pbUZpbmlzaCBub0NhbGxiYWNrIGlzIG51bGxcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblllc0J0bkNsaWNrKClcclxuICAgIHtcclxuICAgICAgICAvLyB0aGlzLm5vQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIC8vIGlmKHRoaXMuYXV0b0Nsb3NlKVxyXG4gICAgICAgIC8vICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgaWYodGhpcy55ZXNDYWxsYmFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueWVzQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1JlbGVhc2VGdW5jKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnllc0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59Il19