"use strict";
cc._RF.push(module, '8599dwXxZVIYaGtfDzCAYnH', 'PersonalInfoView');
// hall/scripts/logic/hall/ui/playerInfo/PersonalInfoView.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
var PersonalInfoView = /** @class */ (function (_super) {
    __extends(PersonalInfoView, _super);
    function PersonalInfoView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 绑定手机按钮
         */
        _this.bindPhoneBtn = null;
        /**
         * 修改密码按钮
         */
        _this.changePwdBtn = null;
        /**
         * 名字
         */
        _this.nameLbl = null;
        /**
         * id
         */
        _this.idLbl = null;
        /**
         * 账户类型
         */
        _this.userTypeLbl = null;
        /**
         * 手机号码
         */
        _this.phoneLbl = null;
        /**
         * 头像
         */
        _this.spriteHead = null;
        /**
         * 头像框
         */
        _this.spriteHeadFrame = null;
        /**
         * vip内容根节点
         */
        _this.vipNode = null;
        /**
         * 激活按钮
         */
        _this.activateBtn = null;
        /**
         * 激活文本
         */
        _this.activateTextNode = null;
        /**
         * 升级文本
         */
        _this.upgradeTextNode = null;
        /**
         * vip显示节点集合(包含玩家 不是vip的情况 和 玩家已经是vip的情况)
         */
        _this.vipNodeArr = [];
        /**
         * 升级到下一级的vip提示文本
         */
        _this.labelVip = null;
        _this.labelVip1 = null;
        /**
         * 升级到下一级的vip需要的金額
         */
        _this.vipMoney = null;
        /**
         * 下一级的vip等級
         */
        _this.vipLevel = null;
        /**
         * 当前vip等级图标
         */
        _this.spriteVip = null;
        /**
         * vip进度
         */
        _this.processVip = null;
        _this.bindPhone = null;
        return _this;
    }
    PersonalInfoView.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("PlayerInfoModel");
        Global.Event.on(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPanel);
        this.addCommonClick("editNameBtn", this.openEditNicknameUI, this);
        this.addCommonClick("copyIdBtn", this.copyIdAction, this);
        // this.addCommonClick( "settingBtn", this.openSettingUI, this);
        this.addCommonClick("exitBtn", this.exitAccountAction, this);
        this.addCommonClick("changLabel", this.openEditAvaterUI, this);
        this.bindPhoneBtn = this.addCommonClick("bindPhoneBtn", this.openBindPhoneUI, this);
        this.changePwdBtn = this.addCommonClick("changePwdBtn", this.openEditPwdUI, this);
        // this.bindPhone = this.getChild("bindPhoneBtn/hongdian");
        this.nameLbl = this.getComponent("nameLbl", cc.Label);
        this.idLbl = this.getComponent("idLbl", cc.Label);
        this.userTypeLbl = this.getComponent("userTypeLbl", cc.Label);
        this.phoneLbl = this.getComponent("phoneLbl", cc.Label);
        this.spriteHead = this.getComponent("headImg/headFrame", cc.Sprite);
        this.spriteHeadFrame = this.getComponent("headImg/headbox", cc.Sprite);
        this.vipNode = this.getChild("vip");
        this.activateBtn = Global.UIHelper.addCommonClick(this.vipNode, "jihuoBtn", this.activateBtnFunc, this);
        this.activateTextNode = cc.find("fnt_activate", this.activateBtn);
        this.upgradeTextNode = cc.find("upgradText", this.activateBtn);
        this.vipNodeArr[0] = cc.find("vip0", this.vipNode);
        this.vipNodeArr[1] = cc.find("vip1", this.vipNode);
        this.labelVip = cc.find("iconList/label_vip", this.vipNode).getComponent(cc.Label);
        this.labelVip1 = cc.find("iconList/label_vip_to", this.vipNode).getComponent(cc.Label);
        this.vipMoney = cc.find("iconList/vip_money", this.vipNode).getComponent(cc.Label);
        this.vipLevel = cc.find("iconList/vip_level", this.vipNode).getComponent(cc.Label);
        this.spriteVip = cc.find("vip1/icon_vip", this.vipNode).getComponent(cc.Sprite);
        this.processVip = cc.find("vip1/process_di/progressBar", this.vipNode).getComponent(cc.ProgressBar);
        // this.vipNode.active = !Global.Setting.vipDisable;
    };
    /**
     * 修改昵称按钮
     */
    PersonalInfoView.prototype.openEditNicknameUI = function () {
        Global.UI.show("WndEditName");
    };
    /**
    * 复制按钮
    */
    PersonalInfoView.prototype.copyIdAction = function () {
        Global.NativeEvent.copyTextToClipboard(String(Global.PlayerData.uid), this.copyTextToClipboardCallBack.bind(this));
    };
    /**
     * 复制回调
     * @param retStr
     */
    PersonalInfoView.prototype.copyTextToClipboardCallBack = function (retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
        }
        else {
            Global.UI.fastTip("复制失败");
        }
    };
    /**
     * 设置按钮
     */
    PersonalInfoView.prototype.openSettingUI = function () {
        // Global.UI.show("WndSetting");
        //WndPlayerInfo.instance.ChangeYeqian(3);
        // this.internalEvent.event("ChangeView",3)
    };
    /**
     * 点击修改头像
     */
    PersonalInfoView.prototype.openEditAvaterUI = function () {
        this.internalEvent.event("ChangeView", 1);
        //WndPlayerInfo.instance.ChangeYeqian(1);
    };
    /**
     * 切换账号按钮
     */
    PersonalInfoView.prototype.exitAccountAction = function () {
        Global.UI.show("WndMessageBox", "您确定退出当前账号返回登录界面？", 1, function () {
            Global.SceneManager.goToLogin();
        }, function () {
        });
        // Global.UI.show("WndToggleAccount");
    };
    /**
     * 绑定手机按钮
     */
    PersonalInfoView.prototype.openBindPhoneUI = function () {
        Global.UI.show("WndBindPhone");
    };
    /**
     * 修改密码按钮
     */
    PersonalInfoView.prototype.openEditPwdUI = function () {
        Global.UI.show("WndChangePwd");
    };
    /**
    * 激活按钮
    */
    PersonalInfoView.prototype.activateBtnFunc = function () {
        //打开vip特权界面
        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndVip3");
        Global.UI.show("WndVip3");
    };
    PersonalInfoView.prototype.onSubViewHide = function () {
    };
    PersonalInfoView.prototype.onSubViewShow = function () {
        this.model.reqGetUserInfo(null, null);
        this.refreshPanel();
    };
    PersonalInfoView.prototype.onDispose = function () {
        Global.Event.off(GlobalEvent.PERSONALINFOUPDATE, this, this.refreshPanel);
    };
    PersonalInfoView.prototype.refreshPanel = function () {
        var data = Global.PlayerData;
        this.nameLbl.string = Global.Toolkit.removeEmoji(data.nickname);
        this.idLbl.string = "ID:" + String(data.uid);
        this.userTypeLbl.string = (data.type == 1 ? "游客用户" : "正式用户");
        if (Global.Setting.SkinConfig.isRed)
            this.userTypeLbl.node.color = (data.type == 1 ? this.userTypeLbl.node.color : cc.color(74, 157, 70, 255));
        var phoneStr = data.phone.split(" ")[1];
        phoneStr = phoneStr || data.phone;
        this.phoneLbl.string = (data.phone == "" ? "未绑定" : Global.Toolkit.formateStrWithAsterisk(phoneStr, 3, 4));
        this.spriteHead.spriteFrame = Global.Toolkit.getLocalHeadSf(data.headimg);
        //头像框设置
        // Global.Toolkit.loadLocalHeadFrame(this.spriteHeadFrame, data.headkuang);
        // if (this.bindPhone && data.phone != "") {
        //     this.bindPhone.active = false;
        // }
        // else {
        //     this.bindPhone.active = true;
        // }
        if (data.phone) {
            this.changePwdBtn.active = true;
            this.bindPhoneBtn.active = false;
        }
        else {
            this.changePwdBtn.active = false;
            this.bindPhoneBtn.active = true;
        }
        if (data.vip > 0) {
            //已经是vip的情况
            this.vipNodeArr[0].active = false;
            this.vipNodeArr[1].active = true;
            this.activateTextNode.active = false;
            this.upgradeTextNode.active = true;
            Global.Toolkit.loadLocalVip(this.spriteVip, data.vip);
        }
        else {
            //不是vip的情况
            this.vipNodeArr[0].active = true;
            this.vipNodeArr[1].active = false;
            this.activateTextNode.active = true;
            this.upgradeTextNode.active = false;
        }
        var percent = 1;
        var toVip = data.vip + 1;
        var vipUgradeExp = this.model.GetVipUpgradeExp(toVip);
        var vipNeedExp = vipUgradeExp - data.vipExp;
        // if(vipNeedExp > 0){
        //     this.labelVip.string = "仅需充值" + vipNeedExp + "元，即可成为VIP" + toVip;
        //     percent = data.vipExp / vipUgradeExp;
        //     this.activateBtn.active = true;
        // }else{
        //     this.labelVip.string = "恭喜您已成为至尊VIP" + data.vip;
        //     this.activateBtn.active = false;
        // }
        if (vipNeedExp > 0) {
            // this.labelVip.string = cc.js.formatStr("仅需充值%s元，即可成为VIP%s", vipNeedExp, toVip)
            this.vipMoney.string = vipNeedExp + "元";
            this.vipLevel.string = "VIP" + String(toVip);
            percent = data.vipExp / vipUgradeExp;
            this.activateBtn.active = true;
            this.vipMoney.node.active = true;
            this.vipLevel.node.active = true;
            this.labelVip1.node.active = true;
        }
        else {
            this.labelVip.string = "恭喜您已成为至尊VIP" + data.vip;
            this.activateBtn.active = false;
            this.vipMoney.node.active = false;
            this.vipLevel.node.active = false;
            this.labelVip1.node.active = false;
        }
        this.processVip.progress = percent;
    };
    return PersonalInfoView;
}(ViewBase_1.default));
exports.default = PersonalInfoView;

cc._RF.pop();