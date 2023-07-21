
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/common/WndMessageBox.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ca1e1zjmYhE8aUGKz+pXPXO', 'WndMessageBox');
// hall/scripts/logic/hall/ui/common/WndMessageBox.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var WndMessageBox = /** @class */ (function (_super) {
    __extends(WndMessageBox, _super);
    function WndMessageBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.autoClose = true;
        _this.autoReleaseFunc = true;
        return _this;
    }
    WndMessageBox.prototype.onInit = function () {
        this.name = "WndMessageBox";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/MessageBoxUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndMessageBox.prototype.initView = function () {
        this.addCommonClick("bg/close", this.onCloseClick, this);
        this.yesBtnNode = this.addCommonClick("yesBtn", this.onYesBtnClick, this);
        this.noBtnNode = this.addCommonClick("noBtn", this.onCloseClick, this);
        this.content = this.getComponent("content", cc.RichText);
        this.versionLabel = this.getComponent("versionLabel", cc.Label);
        this.versionLabel.string = "";
        this.content.string = "";
    };
    /**
     * @param {string} content
     * @param {number} type   1 显示 确定取消  2  显示 确定
     * @param {Function} yesCallback
     * @param {Function} noCallback
     * @param {boolean} autoClose  点击按钮后是否自动关闭界面
     * @memberof WndMessageBox
     */
    WndMessageBox.prototype.onOpen = function () {
        if (this.args == null || this.args.length == 0) {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        var content = this.args[0];
        if (content == null || content == "") {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        //1 两个按钮  2 yes 一个按钮
        var type = this.args[1];
        this.updateBtnByType(type);
        this.content.string = content;
        this.yesCallback = this.args[2];
        this.noCallback = this.args[3];
        this.autoClose = this.args[4] != false;
        this.autoReleaseFunc = this.args[5] != false;
        if (this.args[6]) {
            //文字前加警报icon，且文字为红色
            content = "<color=#ff0000> " + content + "</color>";
            this.content.string = content;
        }
        this.setNativeVersion();
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
    };
    // 重新打开时覆盖参数
    WndMessageBox.prototype.onReshow = function () {
        if (this.args == null || this.args.length == 0) {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        var content = this.args[0];
        if (content == null || content == "") {
            Logger.error("没有设置参数");
            this.close();
            return;
        }
        //1 两个按钮  2 yes 一个按钮
        var type = this.args[1];
        this.updateBtnByType(type);
        this.content.string = content;
        this.yesCallback = this.args[2];
        this.noCallback = this.args[3];
        this.autoClose = this.args[4] != false;
        this.autoReleaseFunc = this.args[5] != false;
        if (this.args[6]) {
            //文字前加警报icon，且文字为红色
            content = "<color=#ff0000> " + content + "</color>";
            this.content.string = content;
        }
        Global.Event.event(GlobalEvent.FORCE_HIDE_WAITING);
    };
    WndMessageBox.prototype.updateBtnByType = function (type) {
        if (!cc.isValid(this.node))
            return;
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
    WndMessageBox.prototype.onCloseClick = function () {
        if (this.autoClose)
            this.close();
    };
    WndMessageBox.prototype.onClose = function () {
    };
    WndMessageBox.prototype.onCloseAnimFinish = function () {
        if (this.noCallback) {
            //防止嵌套调用
            var tmpnoCallback = this.noCallback;
            if (this.autoReleaseFunc) {
                this.noCallback = null;
            }
            tmpnoCallback();
        }
    };
    WndMessageBox.prototype.onYesBtnClick = function () {
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
    WndMessageBox.prototype.setNativeVersion = function () {
        // let version = Global.HotUpdateManager.hallNewVersion
        // let version =  Global.Toolkit.genLoadingAppInfo();
        // if(version)
        // {
        //     version = version  + "_"+ Global.ReportTool.GetReportTimes()
        // }
        // if(this.versionLabel && this.versionLabel.node.isValid){
        //     this.versionLabel.string =  version
        // }
    };
    return WndMessageBox;
}(WndBase_1.default));
exports.default = WndMessageBox;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxjb21tb25cXFduZE1lc3NhZ2VCb3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0RBQWdFO0FBR2hFO0lBQTJDLGlDQUFPO0lBQWxEO1FBQUEscUVBOEtDO1FBdEtXLGVBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIscUJBQWUsR0FBRyxJQUFJLENBQUM7O0lBcUtuQyxDQUFDO0lBbkthLDhCQUFNLEdBQWhCO1FBRUksSUFBSSxDQUFDLElBQUksR0FBRyxlQUFlLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyw4QkFBOEIsQ0FBQztRQUM5QyxJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFXLENBQUMsSUFBSSxDQUFDO0lBQ3hDLENBQUM7SUFFUyxnQ0FBUSxHQUFsQjtRQUVJLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM5RCxJQUFJLENBQUMsWUFBWSxDQUFD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Q0FBQyxTQUFTO1lBQ2IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRXJCLENBQUM7SUFFUywrQkFBTyxHQUFqQjtJQUdBLENBQUM7SUFFUyx5Q0FBaUIsR0FBM0I7UUFDSSxJQUFHLElBQUksQ0FBQyxVQUFVLEVBQ2xCO1lBQ0ksUUFBUTtZQUNSLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDcEMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzthQUMxQjtZQUNELGFBQWEsRUFBRSxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUVPLHFDQUFhLEdBQXJCO1FBRUksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBRyxJQUFJLENBQUMsU0FBUztZQUNiLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixJQUFHLElBQUksQ0FBQyxXQUFXLEVBQ25CO1lBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7YUFDM0I7U0FDSjtJQUNMLENBQUM7SUFFRCx3Q0FBZ0IsR0FBaEI7UUFDRyx1REFBdUQ7UUFDdEQscURBQXFEO1FBQ3JELGNBQWM7UUFDZCxJQUFJO1FBQ0osbUVBQW1FO1FBQ25FLElBQUk7UUFDSiwyREFBMkQ7UUFDM0QsMENBQTBDO1FBQzFDLElBQUk7SUFDUixDQUFDO0lBSUwsb0JBQUM7QUFBRCxDQTlLQSxBQThLQyxDQTlLMEMsaUJBQU8sR0E4S2pEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBXbmRCYXNlLCB7IERlc3RvcnlUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5pbXBvcnQgTG9hZGluZ0NvbnN0IGZyb20gXCIuLi8uLi8uLi9jb3JlL2xvYWRpbmdNVkMvTG9hZGluZ0NvbnN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRNZXNzYWdlQm94IGV4dGVuZHMgV25kQmFzZVxyXG57XHJcbiAgICBwcml2YXRlIHllc0J0bk5vZGU6Y2MuTm9kZTtcclxuICAgIHByaXZhdGUgbm9CdG5Ob2RlOmNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGNvbnRlbnQ6Y2MuUmljaFRleHQ7XHJcbiAgICBwcml2YXRlIHllc0NhbGxiYWNrOkZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSBub0NhbGxiYWNrOkZ1bmN0aW9uO1xyXG4gICAgcHJpdmF0ZSB2ZXJzaW9uTGFiZWw6Y2MuTGFiZWxcclxuICAgIHByaXZhdGUgYXV0b0Nsb3NlID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgYXV0b1JlbGVhc2VGdW5jID0gdHJ1ZTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZE1lc3NhZ2VCb3hcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gXCJQb3BMYXllclwiO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL01lc3NhZ2VCb3hVSVwiO1xyXG4gICAgICAgIHRoaXMuZGVzdG9yeVR5cGUgPSBEZXN0b3J5VHlwZS5Ob25lO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJnL2Nsb3NlXCIsIHRoaXMub25DbG9zZUNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnllc0J0bk5vZGUgPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwieWVzQnRuXCIsIHRoaXMub25ZZXNCdG5DbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub0J0bk5vZGUgPSB0aGlzLmFkZENvbW1vbkNsaWNrKFwibm9CdG5cIiwgdGhpcy5vbkNsb3NlQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY29udGVudFwiLCBjYy5SaWNoVGV4dCk7XHJcbiAgICAgICAgdGhpcy52ZXJzaW9uTGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcInZlcnNpb25MYWJlbFwiLGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMudmVyc2lvbkxhYmVsLnN0cmluZyA9IFwiXCJcclxuICAgICAgICB0aGlzLmNvbnRlbnQuc3RyaW5nID0gXCJcIjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29udGVudFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHR5cGUgICAxIOaYvuekuiDnoa7lrprlj5bmtoggIDIgIOaYvuekuiDnoa7lrppcclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHllc0NhbGxiYWNrXHJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBub0NhbGxiYWNrXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGF1dG9DbG9zZSAg54K55Ye75oyJ6ZKu5ZCO5piv5ZCm6Ieq5Yqo5YWz6Zet55WM6Z2iXHJcbiAgICAgKiBAbWVtYmVyb2YgV25kTWVzc2FnZUJveFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmFyZ3MgPT0gbnVsbCB8fCB0aGlzLmFyZ3MubGVuZ3RoID09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmsqHmnInorr7nva7lj4LmlbBcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuYXJnc1swXTtcclxuICAgICAgICBpZihjb250ZW50ID09IG51bGwgfHwgY29udGVudCA9PSBcIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5rKh5pyJ6K6+572u5Y+C5pWwXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8xIOS4pOS4quaMiemSriAgMiB5ZXMg5LiA5Liq5oyJ6ZKuXHJcbiAgICAgICAgbGV0IHR5cGUgPSB0aGlzLmFyZ3NbMV07XHJcbiAgICAgICAgdGhpcy51cGRhdGVCdG5CeVR5cGUodHlwZSk7XHJcbiAgICAgICAgdGhpcy5jb250ZW50LnN0cmluZyA9IGNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy55ZXNDYWxsYmFjayA9IHRoaXMuYXJnc1syXTtcclxuICAgICAgICB0aGlzLm5vQ2FsbGJhY2sgPSB0aGlzLmFyZ3NbM107XHJcbiAgICAgICAgdGhpcy5hdXRvQ2xvc2UgPSB0aGlzLmFyZ3NbNF0gIT0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hdXRvUmVsZWFzZUZ1bmMgPSB0aGlzLmFyZ3NbNV0gIT0gZmFsc2U7XHJcbiAgICAgICAgaWYodGhpcy5hcmdzWzZdKXtcclxuICAgICAgICAgICAgLy/mloflrZfliY3liqDorabmiqVpY29u77yM5LiU5paH5a2X5Li657qi6ImyXHJcbiAgICAgICAgICAgIGNvbnRlbnQgPSBcIjxjb2xvcj0jZmYwMDAwPiBcIiArIGNvbnRlbnQgKyBcIjwvY29sb3I+XCI7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5zdHJpbmcgPSBjb250ZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldE5hdGl2ZVZlcnNpb24oKVxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5GT1JDRV9ISURFX1dBSVRJTkcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOmHjeaWsOaJk+W8gOaXtuimhuebluWPguaVsFxyXG4gICAgcHJvdGVjdGVkIG9uUmVzaG93KCl7XHJcbiAgICAgICAgaWYodGhpcy5hcmdzID09IG51bGwgfHwgdGhpcy5hcmdzLmxlbmd0aCA9PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5rKh5pyJ6K6+572u5Y+C5pWwXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0aGlzLmFyZ3NbMF07XHJcbiAgICAgICAgaWYoY29udGVudCA9PSBudWxsIHx8IGNvbnRlbnQgPT0gXCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuayoeacieiuvue9ruWPguaVsFwiKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vMSDkuKTkuKrmjInpkq4gIDIgeWVzIOS4gOS4quaMiemSrlxyXG4gICAgICAgIGxldCB0eXBlID0gdGhpcy5hcmdzWzFdO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQnRuQnlUeXBlKHR5cGUpO1xyXG4gICAgICAgIHRoaXMuY29udGVudC5zdHJpbmcgPSBjb250ZW50O1xyXG4gICAgICAgIHRoaXMueWVzQ2FsbGJhY2sgPSB0aGlzLmFyZ3NbMl07XHJcbiAgICAgICAgdGhpcy5ub0NhbGxiYWNrID0gdGhpcy5hcmdzWzNdO1xyXG4gICAgICAgIHRoaXMuYXV0b0Nsb3NlID0gdGhpcy5hcmdzWzRdICE9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXV0b1JlbGVhc2VGdW5jID0gdGhpcy5hcmdzWzVdICE9IGZhbHNlO1xyXG4gICAgICAgIGlmKHRoaXMuYXJnc1s2XSl7XHJcbiAgICAgICAgICAgIC8v5paH5a2X5YmN5Yqg6K2m5oqlaWNvbu+8jOS4lOaWh+Wtl+S4uue6ouiJslxyXG4gICAgICAgICAgICBjb250ZW50ID0gXCI8Y29sb3I9I2ZmMDAwMD4gXCIgKyBjb250ZW50ICsgXCI8L2NvbG9yPlwiO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuc3RyaW5nID0gY29udGVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LkZPUkNFX0hJREVfV0FJVElORyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVCdG5CeVR5cGUodHlwZSlcclxuICAgIHtcclxuICAgICAgICBpZiAoIWNjLmlzVmFsaWQodGhpcy5ub2RlKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKHR5cGUgPT0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueWVzQnRuTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vQnRuTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnllc0J0bk5vZGUueCA9IDE1NztcclxuICAgICAgICAgICAgdGhpcy5ub0J0bk5vZGUueCA9IC0xNTdcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy55ZXNCdG5Ob2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9CdG5Ob2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnllc0J0bk5vZGUueCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xvc2VDbGljaygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5hdXRvQ2xvc2UpXHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlQW5pbUZpbmlzaCgpIHtcclxuICAgICAgICBpZih0aGlzLm5vQ2FsbGJhY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+mYsuatouW1jOWll+iwg+eUqFxyXG4gICAgICAgICAgICBsZXQgdG1wbm9DYWxsYmFjayA9IHRoaXMubm9DYWxsYmFjaztcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1JlbGVhc2VGdW5jKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRtcG5vQ2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblllc0J0bkNsaWNrKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5vQ2FsbGJhY2sgPSBudWxsO1xyXG4gICAgICAgIGlmKHRoaXMuYXV0b0Nsb3NlKVxyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgaWYodGhpcy55ZXNDYWxsYmFjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueWVzQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1JlbGVhc2VGdW5jKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnllc0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXROYXRpdmVWZXJzaW9uKCl7XHJcbiAgICAgICAvLyBsZXQgdmVyc2lvbiA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLmhhbGxOZXdWZXJzaW9uXHJcbiAgICAgICAgLy8gbGV0IHZlcnNpb24gPSAgR2xvYmFsLlRvb2xraXQuZ2VuTG9hZGluZ0FwcEluZm8oKTtcclxuICAgICAgICAvLyBpZih2ZXJzaW9uKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdmVyc2lvbiA9IHZlcnNpb24gICsgXCJfXCIrIEdsb2JhbC5SZXBvcnRUb29sLkdldFJlcG9ydFRpbWVzKClcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYodGhpcy52ZXJzaW9uTGFiZWwgJiYgdGhpcy52ZXJzaW9uTGFiZWwubm9kZS5pc1ZhbGlkKXtcclxuICAgICAgICAvLyAgICAgdGhpcy52ZXJzaW9uTGFiZWwuc3RyaW5nID0gIHZlcnNpb25cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG59Il19