
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/WndNewPlayerInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e5fcd2ON8xBxK4gsZVUPGnq', 'WndNewPlayerInfo');
// hall/scripts/logic/hall/ui/playerInfo/WndNewPlayerInfo.ts

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
var HallBtnHelper_1 = require("../hall/views/HallBtnHelper");
var WndNewPlayerInfo = /** @class */ (function (_super) {
    __extends(WndNewPlayerInfo, _super);
    function WndNewPlayerInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //头像
        _this.spriteHead = null;
        //头像框
        _this.spriteHeadFrame = null;
        return _this;
    }
    /**
     * 初始化脚本
     */
    WndNewPlayerInfo.prototype.onInit = function () {
        this.name = "WndNewPlayerInfo";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/NewPlayerInfoUI";
        this.model = Global.ModelManager.getModel("PlayerInfoModel");
    };
    WndNewPlayerInfo.prototype.onDispose = function () {
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPersonInfo);
    };
    /**
     * 初始化UI
     */
    WndNewPlayerInfo.prototype.initView = function () {
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPersonInfo);
        this.binded = this.getChild("personInfo/panel/bind/binded");
        this.addCommonClick("bg/close", this.closeBtnFunc, this);
        this.addCommonClick("personInfo/changeBtn", this.showChooseHeadView, this);
        this.addCommonClick("personInfo/idLabel/btn", this.copyIdFunc, this);
        this.addCommonClick("personInfo/nickName/changeBtn", this.openEditNicknameUI, this);
        this.addCommonClick("personInfo/panel/logout", this.logOutFunc, this);
        this.bindBtn = this.addCommonClick("personInfo/panel/bind/bindBtn", this.openBindUi, this);
        this.addCommonClick("personInfo/panel/setting", this.openSettingUi, this);
        this.addCommonClick("personInfo/coinBar/add", this.addPonitBtn, this);
        this.addCommonClick("personInfo/vipFrame", this.showVipView, this);
        this.nickName = this.getComponent("personInfo/nickName/nickLabel", cc.Label);
        this.idLabel = this.getComponent("personInfo/idLabel/id", cc.Label);
        this.pointLabel = this.getComponent("personInfo/coinBar/coinLabel", cc.Label);
        this.spriteHead = this.getComponent("headImg/headFrame", cc.Sprite);
        this.spriteHeadFrame = this.getComponent("headbox", cc.Sprite);
        this.phoneLabel = this.getComponent("personInfo/panel/bind/binded/phone", cc.Label);
        this.vipFrame = this.getComponent("personInfo/vipFrame", cc.Sprite);
    };
    WndNewPlayerInfo.prototype.showVipView = function () {
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndVip3");
        Global.UI.show("WndVip3");
    };
    WndNewPlayerInfo.prototype.showChooseHeadView = function () {
        Global.UI.show("WndChooseHead");
    };
    WndNewPlayerInfo.prototype.copyIdFunc = function () {
        Global.NativeEvent.copyTextToClipboard(String(Global.PlayerData.uid), this.copyTextToClipboardCallBack.bind(this));
    };
    WndNewPlayerInfo.prototype.openEditNicknameUI = function () {
        Global.UI.show("WndEditName");
    };
    WndNewPlayerInfo.prototype.copyTextToClipboardCallBack = function (retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
        }
        else {
            Global.UI.fastTip("复制失败");
        }
    };
    WndNewPlayerInfo.prototype.logOutFunc = function () {
        Global.UI.show("WndMessageBox", "您确定退出当前账号返回登录界面？", 1, function () {
            Global.SceneManager.goToLogin();
        }, function () {
        });
    };
    WndNewPlayerInfo.prototype.openBindUi = function () {
        Global.UI.show("WndBindPhone");
    };
    WndNewPlayerInfo.prototype.openSettingUi = function () {
        Global.UI.show("WndSetting");
    };
    WndNewPlayerInfo.prototype.addPonitBtn = function () {
        HallBtnHelper_1.default.WndRechargeOpen();
    };
    /**
     * 界面打开回调
     */
    WndNewPlayerInfo.prototype.onOpen = function () {
        this.model.reqGetUserInfo(null, null);
        this.refreshPersonInfo();
        var model = Global.ModelManager.getModel("BindingGiftModel");
        var playerData = Global.PlayerData;
        if (playerData.phone == "" && model.BindAwardNum != 0) {
            Global.UI.show("WndBindingGift");
        }
    };
    WndNewPlayerInfo.prototype.refreshPersonInfo = function () {
        if (Global.SceneManager.inGame()) {
            return;
        }
        var data = Global.PlayerData;
        this.nickName.string = Global.Toolkit.removeEmoji(data.nickname);
        this.idLabel.string = String(data.uid);
        var phoneStr = data.phone.split(" ")[1];
        phoneStr = phoneStr || data.phone;
        this.bindBtn.active = phoneStr == "";
        this.binded.active = phoneStr != "";
        this.phoneLabel.string = Global.Toolkit.formateStrWithAsterisk(phoneStr, 3, 4);
        this.pointLabel.string = Global.Toolkit.formatPointStr(Global.PlayerData.point, true).toString();
        this.spriteHead.spriteFrame = Global.Toolkit.getLocalHeadSf(data.headimg);
        //头像框设置
        Global.Toolkit.loadLocalHeadFrame(this.spriteHeadFrame, data.headkuang);
        //vip图标设置
        var atlasString = "hall/texture/hall/playerInfo/AutoAtlas_playerinfo";
        var sfString0 = "vip_tq" + data.vip;
        Global.ResourceManager.loadAutoAtlas(this.vipFrame, atlasString, sfString0, null, false);
    };
    /**
     * 界面关闭回调
     */
    WndNewPlayerInfo.prototype.onClose = function () {
        // this.currYeqian = -1
        // this.close();
    };
    /**
     * 关闭按钮点击
     */
    WndNewPlayerInfo.prototype.closeBtnFunc = function () {
        this.close();
    };
    return WndNewPlayerInfo;
}(WndBase_1.default));
exports.default = WndNewPlayerInfo;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxXbmROZXdQbGF5ZXJJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUErQztBQUcvQyw2REFBd0Q7QUFFeEQ7SUFBOEMsb0NBQU87SUFBckQ7UUFBQSxxRUFxS0M7UUF2SkcsSUFBSTtRQUNKLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBQzVCLEtBQUs7UUFDTCxxQkFBZSxHQUFhLElBQUksQ0FBQzs7SUFvSnJDLENBQUM7SUExSUc7O09BRUc7SUFDTyxpQ0FBTSxHQUFoQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLDRDQUE0QyxDQUFDO1FBQzVELElBQUksQ0FBQyxLQUFLLEdBQW9CLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUVELG9DQUFTLEdBQVQ7UUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBRWxGLENBQUM7SUFFRDs7T0FFRztJQUNPLG1DQUFRLEdBQWxCO1FBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUM3RSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsWUFB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V0FBVyxHQUFHLG1EQUFtRCxDQUFDO1FBQ3RFLElBQUksU0FBUyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUNEOztPQUVHO0lBQ08sa0NBQU8sR0FBakI7UUFDSSx1QkFBdUI7UUFDdkIsZ0JBQWdCO0lBQ3BCLENBQUM7SUFFRDs7T0FFRztJQUNLLHVDQUFZLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFDTCx1QkFBQztBQUFELENBcktBLEFBcUtDLENBcks2QyxpQkFBTyxHQXFLcEQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBQbGF5ZXJJbmZvTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvUGxheWVySW5mb01vZGVsXCI7XHJcbmltcG9ydCBCaW5kaW5nR2lmdE1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0JpbmRpbmdHaWZ0TW9kZWxcIjtcclxuaW1wb3J0IEhhbGxCdG5IZWxwZXIgZnJvbSBcIi4uL2hhbGwvdmlld3MvSGFsbEJ0bkhlbHBlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV25kTmV3UGxheWVySW5mbyBleHRlbmRzIFduZEJhc2V7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlbDmja7lr7nosaFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBtb2RlbDogUGxheWVySW5mb01vZGVsO1xyXG4gICAgLy/mmLXnp7BcclxuICAgIHByaXZhdGUgbmlja05hbWU6Y2MuTGFiZWw7XHJcbiAgICAvL2lkXHJcbiAgICBwcml2YXRlIGlkTGFiZWw6Y2MuTGFiZWw7XHJcbiAgICAvL+mHkeW4gVxyXG4gICAgcHJpdmF0ZSBwb2ludExhYmVsOmNjLkxhYmVsO1xyXG4gICAgLy/miYvmnLrlj7dcclxuICAgIHByaXZhdGUgcGhvbmVMYWJlbDpjYy5MYWJlbDtcclxuICAgIC8v5aS05YOPXHJcbiAgICBzcHJpdGVIZWFkOmNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICAvL+WktOWDj+ahhlxyXG4gICAgc3ByaXRlSGVhZEZyYW1lOmNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSB2aXBGcmFtZTpjYy5TcHJpdGU7XHJcblxyXG4gICAgLy/nu5HlrprmiYvmnLrmjInpkq5cclxuICAgIHByaXZhdGUgYmluZEJ0bjpjYy5Ob2RlO1xyXG5cclxuICAgIC8v5bey57uR5a6a5omL5py66IqC54K5XHJcbiAgICBwcml2YXRlIGJpbmRlZDpjYy5Ob2RlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW6ISa5pysXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmROZXdQbGF5ZXJJbmZvXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IEdsb2JhbC5VSS5Qb3BMYXllcjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9QbGF5ZXJJbmZvL05ld1BsYXllckluZm9VSVwiO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSA8UGxheWVySW5mb01vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJQbGF5ZXJJbmZvTW9kZWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNwb3NlKCl7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5QRVJTT05BTElORk9VUERBVEUsIHRoaXMsIHRoaXMucmVmcmVzaFBlcnNvbkluZm8pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWVUlcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5QRVJTT05BTElORk9VUERBVEUsIHRoaXMsIHRoaXMucmVmcmVzaFBlcnNvbkluZm8pXHJcbiAgICAgICAgdGhpcy5iaW5kZWQgPSB0aGlzLmdldENoaWxkKFwicGVyc29uSW5mby9wYW5lbC9iaW5kL2JpbmRlZFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJnL2Nsb3NlXCIsdGhpcy5jbG9zZUJ0bkZ1bmMsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcInBlcnNvbkluZm8vY2hhbmdlQnRuXCIsdGhpcy5zaG93Q2hvb3NlSGVhZFZpZXcsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcInBlcnNvbkluZm8vaWRMYWJlbC9idG5cIix0aGlzLmNvcHlJZEZ1bmMsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcInBlcnNvbkluZm8vbmlja05hbWUvY2hhbmdlQnRuXCIsdGhpcy5vcGVuRWRpdE5pY2tuYW1lVUksdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcInBlcnNvbkluZm8vcGFuZWwvbG9nb3V0XCIsdGhpcy5sb2dPdXRGdW5jLHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYmluZEJ0biA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJwZXJzb25JbmZvL3BhbmVsL2JpbmQvYmluZEJ0blwiLHRoaXMub3BlbkJpbmRVaSx0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwicGVyc29uSW5mby9wYW5lbC9zZXR0aW5nXCIsdGhpcy5vcGVuU2V0dGluZ1VpLHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJwZXJzb25JbmZvL2NvaW5CYXIvYWRkXCIsdGhpcy5hZGRQb25pdEJ0bix0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwicGVyc29uSW5mby92aXBGcmFtZVwiLHRoaXMuc2hvd1ZpcFZpZXcsdGhpcyk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLm5pY2tOYW1lID0gdGhpcy5nZXRDb21wb25lbnQoXCJwZXJzb25JbmZvL25pY2tOYW1lL25pY2tMYWJlbFwiLGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmlkTGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcInBlcnNvbkluZm8vaWRMYWJlbC9pZFwiLGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLnBvaW50TGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcInBlcnNvbkluZm8vY29pbkJhci9jb2luTGFiZWxcIixjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVIZWFkID10aGlzLmdldENvbXBvbmVudChcImhlYWRJbWcvaGVhZEZyYW1lXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVIZWFkRnJhbWUgPSB0aGlzLmdldENvbXBvbmVudChcImhlYWRib3hcIiwgY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLnBob25lTGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcInBlcnNvbkluZm8vcGFuZWwvYmluZC9iaW5kZWQvcGhvbmVcIixjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy52aXBGcmFtZSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwicGVyc29uSW5mby92aXBGcmFtZVwiLGNjLlNwcml0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93VmlwVmlldygpe1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5ldmVudChHbG9iYWxFdmVudC5TSE9XX05FVF9XQUlUSU5HLCBcIlduZFZpcDNcIilcclxuICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFZpcDNcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93Q2hvb3NlSGVhZFZpZXcoKXtcclxuICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZENob29zZUhlYWRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb3B5SWRGdW5jKCl7XHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNvcHlUZXh0VG9DbGlwYm9hcmQoU3RyaW5nKEdsb2JhbC5QbGF5ZXJEYXRhLnVpZCksIHRoaXMuY29weVRleHRUb0NsaXBib2FyZENhbGxCYWNrLmJpbmQodGhpcykgKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9wZW5FZGl0Tmlja25hbWVVSSgpe1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kRWRpdE5hbWVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb3B5VGV4dFRvQ2xpcGJvYXJkQ2FsbEJhY2socmV0U3RyKXtcclxuICAgICAgICBpZiAocmV0U3RyLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5aSN5Yi25oiQ5YqfXCIpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlpI3liLblpLHotKVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9nT3V0RnVuYygpe1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kTWVzc2FnZUJveFwiLCBcIuaCqOehruWumumAgOWHuuW9k+WJjei0puWPt+i/lOWbnueZu+W9leeVjOmdou+8n1wiLCAxLCAoKT0+e1xyXG4gICAgICAgICAgICBHbG9iYWwuU2NlbmVNYW5hZ2VyLmdvVG9Mb2dpbigpO1xyXG4gICAgICAgIH0sICgpPT57XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3BlbkJpbmRVaSgpe1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kQmluZFBob25lXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3BlblNldHRpbmdVaSgpe1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kU2V0dGluZ1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZFBvbml0QnRuKCl7XHJcbiAgICAgICAgSGFsbEJ0bkhlbHBlci5XbmRSZWNoYXJnZU9wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeVjOmdouaJk+W8gOWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25PcGVuKCl7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZXFHZXRVc2VySW5mbyhudWxsLG51bGwpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFBlcnNvbkluZm8oKTtcclxuICAgICAgICB2YXIgbW9kZWwgPSA8QmluZGluZ0dpZnRNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiQmluZGluZ0dpZnRNb2RlbFwiKTtcclxuICAgICAgICBsZXQgcGxheWVyRGF0YSA9IEdsb2JhbC5QbGF5ZXJEYXRhO1xyXG4gICAgICAgIGlmIChwbGF5ZXJEYXRhLnBob25lID09IFwiXCIgJiYgbW9kZWwuQmluZEF3YXJkTnVtICE9IDApIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRCaW5kaW5nR2lmdFwiKTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVmcmVzaFBlcnNvbkluZm8oKXtcclxuICAgICAgICBpZihHbG9iYWwuU2NlbmVNYW5hZ2VyLmluR2FtZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkYXRhID0gR2xvYmFsLlBsYXllckRhdGE7XHJcbiAgICAgICAgdGhpcy5uaWNrTmFtZS5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5yZW1vdmVFbW9qaShkYXRhLm5pY2tuYW1lKTtcclxuICAgICAgICB0aGlzLmlkTGFiZWwuc3RyaW5nID0gICBTdHJpbmcoZGF0YS51aWQpO1xyXG5cclxuICAgICAgICBsZXQgcGhvbmVTdHIgPSBkYXRhLnBob25lLnNwbGl0KFwiIFwiKVsxXTtcclxuICAgICAgICBwaG9uZVN0ciA9IHBob25lU3RyIHx8IGRhdGEucGhvbmU7XHJcbiAgICAgICAgdGhpcy5iaW5kQnRuLmFjdGl2ZSA9IHBob25lU3RyID09IFwiXCI7XHJcbiAgICAgICAgdGhpcy5iaW5kZWQuYWN0aXZlID0gcGhvbmVTdHIgIT0gXCJcIjtcclxuICAgICAgICB0aGlzLnBob25lTGFiZWwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0ZVN0cldpdGhBc3RlcmlzayhwaG9uZVN0ciwgMywgNCk7XHJcbiAgICAgICAgdGhpcy5wb2ludExhYmVsLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKEdsb2JhbC5QbGF5ZXJEYXRhLnBvaW50LCB0cnVlKS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlSGVhZC5zcHJpdGVGcmFtZSA9IEdsb2JhbC5Ub29sa2l0LmdldExvY2FsSGVhZFNmKGRhdGEuaGVhZGltZyk7XHJcbiAgICAgICAgLy/lpLTlg4/moYborr7nva5cclxuICAgICAgICBHbG9iYWwuVG9vbGtpdC5sb2FkTG9jYWxIZWFkRnJhbWUodGhpcy5zcHJpdGVIZWFkRnJhbWUsIGRhdGEuaGVhZGt1YW5nKTtcclxuXHJcbiAgICAgICAgLy92aXDlm77moIforr7nva5cclxuICAgICAgICB2YXIgYXRsYXNTdHJpbmcgPSBcImhhbGwvdGV4dHVyZS9oYWxsL3BsYXllckluZm8vQXV0b0F0bGFzX3BsYXllcmluZm9cIjtcclxuICAgICAgICB2YXIgc2ZTdHJpbmcwID0gXCJ2aXBfdHFcIiArIGRhdGEudmlwO1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLnZpcEZyYW1lLCBhdGxhc1N0cmluZywgc2ZTdHJpbmcwLCBudWxsLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeVjOmdouWFs+mXreWbnuiwg1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpe1xyXG4gICAgICAgIC8vIHRoaXMuY3VyclllcWlhbiA9IC0xXHJcbiAgICAgICAgLy8gdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet5oyJ6ZKu54K55Ye7XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xvc2VCdG5GdW5jKCl7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG59Il19