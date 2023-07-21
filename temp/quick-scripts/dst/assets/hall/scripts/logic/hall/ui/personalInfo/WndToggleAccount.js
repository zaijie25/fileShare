
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/personalInfo/WndToggleAccount.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8b8630Z1a1Iqb/j6sYtr6o3', 'WndToggleAccount');
// hall/scripts/logic/hall/ui/personalInfo/WndToggleAccount.ts

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
var WndToggleAccount = /** @class */ (function (_super) {
    __extends(WndToggleAccount, _super);
    function WndToggleAccount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndToggleAccount.prototype.onInit = function () {
        this.name = "WndToggleAccount";
        this.layer = "PopLayer";
        this.resPath = "hall/prefabs/ui/PersonalInfo/ToggleAccountUI";
        this.model = Global.ModelManager.getModel("PersonalInfoModel");
    };
    WndToggleAccount.prototype.initView = function () {
        this.addCommonClick("cancelBtn", this.cancelClick, this);
        this.addCommonClick("sureBtn", this.sureClick, this);
        this.addCommonClick("close", this.closeWnd, this);
    };
    WndToggleAccount.prototype.onOpen = function () {
    };
    WndToggleAccount.prototype.closeWnd = function () {
        this.close();
    };
    WndToggleAccount.prototype.cancelClick = function () {
        this.close();
    };
    WndToggleAccount.prototype.sureClick = function () {
        Global.SceneManager.goToLogin();
    };
    return WndToggleAccount;
}(WndBase_1.default));
exports.default = WndToggleAccount;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwZXJzb25hbEluZm9cXFduZFRvZ2dsZUFjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQStDO0FBRy9DO0lBQThDLG9DQUFPO0lBQXJEOztJQWdDQSxDQUFDO0lBN0JhLGlDQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLDhDQUE4QyxDQUFDO1FBQzlELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRVMsbUNBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRVMsaUNBQU0sR0FBaEI7SUFFQSxDQUFDO0lBRU8sbUNBQVEsR0FBaEI7UUFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVPLHNDQUFXLEdBQW5CO1FBQ0ksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTyxvQ0FBUyxHQUFqQjtRQUNJLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVMLHVCQUFDO0FBQUQsQ0FoQ0EsQUFnQ0MsQ0FoQzZDLGlCQUFPLEdBZ0NwRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IFBlcnNvbmFsSW5mb01vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1BlcnNvbmFsSW5mb01vZGVsXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRUb2dnbGVBY2NvdW50IGV4dGVuZHMgV25kQmFzZSB7XHJcbiAgICBwcml2YXRlIG1vZGVsOiBQZXJzb25hbEluZm9Nb2RlbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiV25kVG9nZ2xlQWNjb3VudFwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBcIlBvcExheWVyXCI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvUGVyc29uYWxJbmZvL1RvZ2dsZUFjY291bnRVSVwiO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSBHbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUGVyc29uYWxJbmZvTW9kZWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjYW5jZWxCdG5cIiwgdGhpcy5jYW5jZWxDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcInN1cmVCdG5cIiwgdGhpcy5zdXJlQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjbG9zZVwiLCB0aGlzLmNsb3NlV25kLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsb3NlV25kKCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhbmNlbENsaWNrKCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN1cmVDbGljaygpIHtcclxuICAgICAgICBHbG9iYWwuU2NlbmVNYW5hZ2VyLmdvVG9Mb2dpbigpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==