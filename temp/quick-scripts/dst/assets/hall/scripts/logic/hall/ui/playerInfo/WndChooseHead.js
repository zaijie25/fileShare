
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/WndChooseHead.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1e496aMCMhDtqDoDDacHiMd', 'WndChooseHead');
// hall/scripts/logic/hall/ui/playerInfo/WndChooseHead.ts

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
var HeadLayerView_1 = require("./HeadLayerView");
var HeadFrameLayerView_1 = require("./HeadFrameLayerView");
var WndChooseHead = /** @class */ (function (_super) {
    __extends(WndChooseHead, _super);
    function WndChooseHead() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //头像
        _this.spriteHead = null;
        //头像框
        _this.spriteHeadFrame = null;
        /**
         * 当前页签
         */
        _this.curViewIndex = -1;
        /**
         * 页签根节点集合
         */
        _this.yeqianRootNodeArr = [];
        _this.yeqianArr = [];
        return _this;
    }
    /**
     * 初始化脚本
     */
    WndChooseHead.prototype.onInit = function () {
        this.name = "WndChooseHead";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/ChooseHeadUI";
        this.model = Global.ModelManager.getModel("PlayerInfoModel");
    };
    WndChooseHead.prototype.onDispose = function () {
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPersonInfo);
    };
    /**
     * 初始化UI
     */
    WndChooseHead.prototype.initView = function () {
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPersonInfo);
        this.addCommonClick("bg/close", this.closeBtnFunc, this);
        this.spriteHead = this.getComponent("headImg/headFrame", cc.Sprite);
        this.spriteHeadFrame = this.getComponent("headbox", cc.Sprite);
        for (var i = 0; i < 2; i++) {
            var yeqianNode = this.addCommonClick("yeqian/yeqian_" + i, this.subViewBtnFunc, this);
            this.yeqianRootNodeArr[i] = yeqianNode;
            this.yeqianArr[i * 2] = cc.find("noSelected", yeqianNode);
            this.yeqianArr[i * 2 + 1] = cc.find("selected", yeqianNode);
        }
        this.headLayerView = this.addView("HeadLayerView", this.getChild("content/content_0"), HeadLayerView_1.default);
        this.headFrameLayerView = this.addView("HeadFrameLayerView", this.getChild("content/content_1"), HeadFrameLayerView_1.default);
        this.yeqianRootNodeArr[1].active = !Global.Setting.vipDisable;
    };
    WndChooseHead.prototype.UpdateUI = function () {
        for (var i = 0; i < 2; i++) {
            var bShow = (i == this.curViewIndex);
            var yeqianNode = this.yeqianArr[i * 2 + 1];
            yeqianNode.active = bShow;
        }
    };
    /**
     * 页签按钮点击
     * @param target
     */
    WndChooseHead.prototype.subViewBtnFunc = function (target) {
        var arr = target.node.name.split("_");
        var param = arr[arr.length - 1];
        var viewIndex = parseInt(param);
        this.changeView(viewIndex);
    };
    WndChooseHead.prototype.changeView = function (viewIndex) {
        if (this.curViewIndex != viewIndex) {
            this.curViewIndex = viewIndex;
            this.headLayerView.subViewState = this.curViewIndex == 0;
            this.headFrameLayerView.subViewState = this.curViewIndex == 1;
            this.UpdateUI();
        }
    };
    /**
     * 界面打开回调
     */
    WndChooseHead.prototype.onOpen = function () {
        this.model.reqGetUserInfo(null, null);
        this.refreshPersonInfo();
        this.changeView(0);
    };
    WndChooseHead.prototype.refreshPersonInfo = function () {
        if (Global.SceneManager.inGame()) {
            return;
        }
        var data = Global.PlayerData;
        this.spriteHead.spriteFrame = Global.Toolkit.getLocalHeadSf(data.headimg);
        //头像框设置
        Global.Toolkit.loadLocalHeadFrame(this.spriteHeadFrame, data.headkuang);
    };
    /**
     * 界面关闭回调
     */
    WndChooseHead.prototype.onClose = function () {
        this.curViewIndex = -1;
    };
    /**
     * 关闭按钮点击
     */
    WndChooseHead.prototype.closeBtnFunc = function () {
        this.close();
    };
    return WndChooseHead;
}(WndBase_1.default));
exports.default = WndChooseHead;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxXbmRDaG9vc2VIZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUErQztBQUUvQyxpREFBNEM7QUFDNUMsMkRBQXNEO0FBRXREO0lBQTJDLGlDQUFPO0lBQWxEO1FBQUEscUVBa0lDO1FBNUhHLElBQUk7UUFDSixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUM1QixLQUFLO1FBQ0wscUJBQWUsR0FBYSxJQUFJLENBQUM7UUFFakM7O1dBRUc7UUFDSCxrQkFBWSxHQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3pCOztXQUVHO1FBQ0gsdUJBQWlCLEdBQWEsRUFBRSxDQUFDO1FBT2pDLGVBQVMsR0FBYSxFQUFFLENBQUM7O0lBeUc3QixDQUFDO0lBdkdHOztPQUVHO0lBQ08sOEJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcseUNBQXlDLENBQUM7UUFDekQsSUFBSSxDQUFDLEtBQUssR0FBb0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsaUNBQVMsR0FBVDtRQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFFbEYsQ0FBQztJQUVEOztPQUVHO0lBQ08sZ0NBQVEsR0FBbEI7UUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxD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QUFRLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNPLDhCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVPLHlDQUFpQixHQUF6QjtRQUNJLElBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFDL0I7WUFDSSxPQUFNO1NBQ1Q7UUFDRCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRSxPQUFPO1FBQ1AsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBQ0Q7O09BRUc7SUFDTywrQkFBTyxHQUFqQjtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUdEOztPQUVHO0lBQ0ssb0NBQVksR0FBcEI7UUFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FsSUEsQUFrSUMsQ0FsSTBDLGlCQUFPLEdBa0lqRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXbmRCYXNlIGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IFBsYXllckluZm9Nb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9QbGF5ZXJJbmZvTW9kZWxcIjtcclxuaW1wb3J0IEhlYWRMYXllclZpZXcgZnJvbSBcIi4vSGVhZExheWVyVmlld1wiO1xyXG5pbXBvcnQgSGVhZEZyYW1lTGF5ZXJWaWV3IGZyb20gXCIuL0hlYWRGcmFtZUxheWVyVmlld1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kQ2hvb3NlSGVhZCBleHRlbmRzIFduZEJhc2V7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlbDmja7lr7nosaFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtb2RlbDogUGxheWVySW5mb01vZGVsO1xyXG4gICAgLy/lpLTlg49cclxuICAgIHNwcml0ZUhlYWQ6Y2MuU3ByaXRlID0gbnVsbDtcclxuICAgIC8v5aS05YOP5qGGXHJcbiAgICBzcHJpdGVIZWFkRnJhbWU6Y2MuU3ByaXRlID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjemhteetvlxyXG4gICAgICovXHJcbiAgICBjdXJWaWV3SW5kZXg6bnVtYmVyID0gLTE7XHJcbiAgICAvKipcclxuICAgICAqIOmhteetvuagueiKgueCuembhuWQiFxyXG4gICAgICovXHJcbiAgICB5ZXFpYW5Sb290Tm9kZUFycjpjYy5Ob2RlW10gPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICog6aG1562+6IqC54K56ZuG5ZCIXHJcbiAgICAgKi9cclxuXHJcbiAgICBoZWFkTGF5ZXJWaWV3OkhlYWRMYXllclZpZXdcclxuICAgIGhlYWRGcmFtZUxheWVyVmlldzpIZWFkRnJhbWVMYXllclZpZXdcclxuICAgIHllcWlhbkFycjpjYy5Ob2RlW10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluiEmuacrFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiV25kQ2hvb3NlSGVhZFwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvUGxheWVySW5mby9DaG9vc2VIZWFkVUlcIjtcclxuICAgICAgICB0aGlzLm1vZGVsID0gPFBsYXllckluZm9Nb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUGxheWVySW5mb01vZGVsXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzcG9zZSgpe1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFLCB0aGlzLCB0aGlzLnJlZnJlc2hQZXJzb25JbmZvKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMllVJXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFLCB0aGlzLCB0aGlzLnJlZnJlc2hQZXJzb25JbmZvKVxyXG5cclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYmcvY2xvc2VcIix0aGlzLmNsb3NlQnRuRnVuYyx0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVIZWFkID10aGlzLmdldENvbXBvbmVudChcImhlYWRJbWcvaGVhZEZyYW1lXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVIZWFkRnJhbWUgPSB0aGlzLmdldENvbXBvbmVudChcImhlYWRib3hcIiwgY2MuU3ByaXRlKTtcclxuXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IDI7IGkrKyl7XHJcbiAgICAgICAgICAgIHZhciB5ZXFpYW5Ob2RlOmNjLk5vZGUgPSB0aGlzLmFkZENvbW1vbkNsaWNrKCBcInllcWlhbi95ZXFpYW5fXCIgKyBpLCB0aGlzLnN1YlZpZXdCdG5GdW5jLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy55ZXFpYW5Sb290Tm9kZUFycltpXSA9IHllcWlhbk5vZGU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnllcWlhbkFycltpICogMl0gPSBjYy5maW5kKFwibm9TZWxlY3RlZFwiLCB5ZXFpYW5Ob2RlKTtcclxuICAgICAgICAgICAgdGhpcy55ZXFpYW5BcnJbaSAqIDIgKyAxXSA9IGNjLmZpbmQoXCJzZWxlY3RlZFwiLCB5ZXFpYW5Ob2RlKTtcclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oZWFkTGF5ZXJWaWV3ID0gPEhlYWRMYXllclZpZXc+dGhpcy5hZGRWaWV3KFwiSGVhZExheWVyVmlld1wiLCB0aGlzLmdldENoaWxkKFwiY29udGVudC9jb250ZW50XzBcIiksIEhlYWRMYXllclZpZXcpO1xyXG4gICAgICAgIHRoaXMuaGVhZEZyYW1lTGF5ZXJWaWV3ID0gPEhlYWRGcmFtZUxheWVyVmlldz50aGlzLmFkZFZpZXcoXCJIZWFkRnJhbWVMYXllclZpZXdcIiwgdGhpcy5nZXRDaGlsZChcImNvbnRlbnQvY29udGVudF8xXCIpLCBIZWFkRnJhbWVMYXllclZpZXcpO1xyXG4gICAgICAgIHRoaXMueWVxaWFuUm9vdE5vZGVBcnJbMV0uYWN0aXZlID0gIUdsb2JhbC5TZXR0aW5nLnZpcERpc2FibGU7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZVVJKCl7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IDI7IGkrKyl7XHJcbiAgICAgICAgICAgIHZhciBiU2hvdzpib29sZWFuID0gKGkgPT0gdGhpcy5jdXJWaWV3SW5kZXgpO1xyXG4gICAgICAgICAgICB2YXIgeWVxaWFuTm9kZSA9IHRoaXMueWVxaWFuQXJyW2kgKiAyICsgMV07XHJcbiAgICAgICAgICAgIHllcWlhbk5vZGUuYWN0aXZlID0gYlNob3c7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmhteetvuaMiemSrueCueWHu1xyXG4gICAgICogQHBhcmFtIHRhcmdldCBcclxuICAgICAqL1xyXG4gICAgc3ViVmlld0J0bkZ1bmModGFyZ2V0KXtcclxuICAgICAgICB2YXIgYXJyID0gdGFyZ2V0Lm5vZGUubmFtZS5zcGxpdChcIl9cIik7XHJcbiAgICAgICAgdmFyIHBhcmFtID0gYXJyW2Fyci5sZW5ndGggLSAxXTtcclxuICAgICAgICB2YXIgdmlld0luZGV4ID0gcGFyc2VJbnQocGFyYW0pO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlVmlldyh2aWV3SW5kZXgpXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlVmlldyh2aWV3SW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5jdXJWaWV3SW5kZXggIT0gdmlld0luZGV4KXtcclxuICAgICAgICAgICAgdGhpcy5jdXJWaWV3SW5kZXggPSB2aWV3SW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMuaGVhZExheWVyVmlldy5zdWJWaWV3U3RhdGUgPSB0aGlzLmN1clZpZXdJbmRleCA9PSAwXHJcbiAgICAgICAgICAgIHRoaXMuaGVhZEZyYW1lTGF5ZXJWaWV3LnN1YlZpZXdTdGF0ZSA9IHRoaXMuY3VyVmlld0luZGV4ID09IDFcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVVSSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeVjOmdouaJk+W8gOWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCl7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZXFHZXRVc2VySW5mbyhudWxsLG51bGwpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFBlcnNvbkluZm8oKTtcclxuICAgICAgICB0aGlzLmNoYW5nZVZpZXcoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWZyZXNoUGVyc29uSW5mbygpe1xyXG4gICAgICAgIGlmKEdsb2JhbC5TY2VuZU1hbmFnZXIuaW5HYW1lKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRhdGEgPSBHbG9iYWwuUGxheWVyRGF0YTtcclxuICAgICAgICB0aGlzLnNwcml0ZUhlYWQuc3ByaXRlRnJhbWUgPSBHbG9iYWwuVG9vbGtpdC5nZXRMb2NhbEhlYWRTZihkYXRhLmhlYWRpbWcpO1xyXG4gICAgICAgIC8v5aS05YOP5qGG6K6+572uXHJcbiAgICAgICAgR2xvYmFsLlRvb2xraXQubG9hZExvY2FsSGVhZEZyYW1lKHRoaXMuc3ByaXRlSGVhZEZyYW1lLCBkYXRhLmhlYWRrdWFuZyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeVjOmdouWFs+mXreWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpe1xyXG4gICAgICAgIHRoaXMuY3VyVmlld0luZGV4ID0gLTFcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet5oyJ6ZKu54K55Ye7XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xvc2VCdG5GdW5jKCl7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG59Il19