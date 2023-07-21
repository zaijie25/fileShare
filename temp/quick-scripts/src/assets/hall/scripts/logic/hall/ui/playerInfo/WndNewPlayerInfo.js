"use strict";
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