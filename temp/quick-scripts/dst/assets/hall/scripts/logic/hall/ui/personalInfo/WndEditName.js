
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/personalInfo/WndEditName.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9bfb0OXoB5A8LnCbV34J9fm', 'WndEditName');
// hall/scripts/logic/hall/ui/personalInfo/WndEditName.ts

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
var WndEditName = /** @class */ (function (_super) {
    __extends(WndEditName, _super);
    function WndEditName() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndEditName.prototype.onInit = function () {
        this.name = "WndEditName";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/PersonalInfo/EditNameUI";
        this.model = Global.ModelManager.getModel("PersonalInfoModel");
    };
    WndEditName.prototype.initView = function () {
        this.nameInput = this.getComponent("nameEditBox", cc.EditBox);
        this.nameInput.maxLength = 6;
        this.addCommonClick("cancelBtn", this.cancelClick, this);
        this.addCommonClick("sureBtn", this.sureClick, this);
        this.addCommonClick("close", this.closeWnd, this);
    };
    WndEditName.prototype.onOpen = function () {
        this.nameInput.string = "";
    };
    WndEditName.prototype.closeWnd = function () {
        this.close();
    };
    WndEditName.prototype.cancelClick = function () {
        this.close();
    };
    WndEditName.prototype.sureClick = function () {
        var str = this.nameInput.string;
        if (!str)
            return Global.UI.fastTip("请输入昵称~");
        if (str.indexOf(" ") > -1)
            return Global.UI.fastTip("昵称不能含有空格");
        // if (Global.Toolkit.getTotalBytes(str) > 14){
        //     return Global.UI.fastTip("昵称最长七个字");
        // }
        if (Global.Toolkit.checkContainsEmoji(str)) {
            return Global.UI.fastTip("昵称不能含表情符号!");
        }
        this.reqEditUserInfo(str);
    };
    WndEditName.prototype.reqEditUserInfo = function (nickname) {
        var _this = this;
        var param = {};
        param.nickname = nickname;
        this.model.reqEditUserInfo(param, function () {
            Global.UI.fastTip("修改昵称成功！");
            Global.PlayerData.nickname = nickname;
            _this.close();
        });
    };
    return WndEditName;
}(WndBase_1.default));
exports.default = WndEditName;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwZXJzb25hbEluZm9cXFduZEVkaXROYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUErQztBQUcvQztJQUF5QywrQkFBTztJQUFoRDs7SUFzREEsQ0FBQztJQWxEYSw0QkFBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcseUNBQXlDLENBQUM7UUFDekQsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFUyw4QkFBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRVMsNEJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVPLDhCQUFRLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTyxpQ0FBVyxHQUFuQjtRQUNJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU8sK0JBQVMsR0FBakI7UUFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUNoQyxJQUFJLENBQUMsR0FBRztZQUFFLE9BQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUFHLE9BQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakUsK0NBQStDO1FBQy9DLDJDQUEyQztRQUMzQyxJQUFJO1FBQ0osSUFBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxFQUN6QztZQUNJLE9BQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7U0FDekM7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTyxxQ0FBZSxHQUF2QixVQUF3QixRQUFnQjtRQUF4QyxpQkFRQztRQVBHLElBQUksS0FBSyxHQUFPLEVBQUUsQ0FBQTtRQUNsQixLQUFLLENBQUMsUUFBUSxHQUFFLFFBQVEsQ0FBRTtRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUU7WUFDOUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCxrQkFBQztBQUFELENBdERBLEFBc0RDLENBdER3QyxpQkFBTyxHQXNEL0MiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBQZXJzb25hbEluZm9Nb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9QZXJzb25hbEluZm9Nb2RlbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kRWRpdE5hbWUgZXh0ZW5kcyBXbmRCYXNle1xyXG4gICAgcHJpdmF0ZSBuYW1lSW5wdXQ6IGNjLkVkaXRCb3g7XHJcbiAgICBwcml2YXRlIG1vZGVsOiBQZXJzb25hbEluZm9Nb2RlbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiV25kRWRpdE5hbWVcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gXCJQb3BMYXllclwiO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1BlcnNvbmFsSW5mby9FZGl0TmFtZVVJXCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IEdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJQZXJzb25hbEluZm9Nb2RlbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lSW5wdXQgPSB0aGlzLmdldENvbXBvbmVudChcIm5hbWVFZGl0Qm94XCIsIGNjLkVkaXRCb3gpO1xyXG4gICAgICAgIHRoaXMubmFtZUlucHV0Lm1heExlbmd0aCA9IDY7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNhbmNlbEJ0blwiLCB0aGlzLmNhbmNlbENsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwic3VyZUJ0blwiLCB0aGlzLnN1cmVDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNsb3NlXCIsIHRoaXMuY2xvc2VXbmQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKXtcclxuICAgICAgICB0aGlzLm5hbWVJbnB1dC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xvc2VXbmQoKXtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYW5jZWxDbGljaygpe1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN1cmVDbGljaygpe1xyXG4gICAgICAgIGxldCBzdHIgPSB0aGlzLm5hbWVJbnB1dC5zdHJpbmc7XHJcbiAgICAgICAgaWYgKCFzdHIpIHJldHVybiBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+i+k+WFpeaYteensH5cIik7XHJcbiAgICAgICAgaWYgKHN0ci5pbmRleE9mKFwiIFwiKSA+IC0xKSAgcmV0dXJuIEdsb2JhbC5VSS5mYXN0VGlwKFwi5pi156ew5LiN6IO95ZCr5pyJ56m65qC8XCIpO1xyXG4gICAgICAgIC8vIGlmIChHbG9iYWwuVG9vbGtpdC5nZXRUb3RhbEJ5dGVzKHN0cikgPiAxNCl7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBHbG9iYWwuVUkuZmFzdFRpcChcIuaYteensOacgOmVv+S4g+S4quWtl1wiKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYoR2xvYmFsLlRvb2xraXQuY2hlY2tDb250YWluc0Vtb2ppKHN0cikpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gR2xvYmFsLlVJLmZhc3RUaXAoXCLmmLXnp7DkuI3og73lkKvooajmg4XnrKblj7chXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVxRWRpdFVzZXJJbmZvKHN0cik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXFFZGl0VXNlckluZm8obmlja25hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IHBhcmFtOmFueSA9IHt9XHJcbiAgICAgICAgcGFyYW0ubmlja25hbWUgPW5pY2tuYW1lIDtcclxuICAgICAgICB0aGlzLm1vZGVsLnJlcUVkaXRVc2VySW5mbyhwYXJhbSwgKCk9PntcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLkv67mlLnmmLXnp7DmiJDlip/vvIFcIik7XHJcbiAgICAgICAgICAgIEdsb2JhbC5QbGF5ZXJEYXRhLm5pY2tuYW1lID0gbmlja25hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==