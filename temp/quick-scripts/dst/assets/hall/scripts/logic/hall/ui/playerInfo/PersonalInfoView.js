
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/PersonalInfoView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxQZXJzb25hbEluZm9WaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQUdqRDtJQUE4QyxvQ0FBUTtJQUF0RDtRQUFBLHFFQXlTQztRQXBTRzs7V0FFRztRQUNILGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCOztXQUVHO1FBQ0gsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0I7O1dBRUc7UUFDSCxhQUFPLEdBQWEsSUFBSSxDQUFDO1FBQ3pCOztXQUVHO1FBQ0gsV0FBSyxHQUFhLElBQUksQ0FBQztRQUN2Qjs7V0FFRztRQUNILGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBQzdCOztXQUVHO1FBQ0gsY0FBUSxHQUFhLElBQUksQ0FBQztRQUMxQjs7V0FFRztRQUNILGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBQzVCOztXQUVHO1FBQ0gscUJBQWUsR0FBYSxJQUFJLENBQUM7UUFFakM7O1dBRUc7UUFDSCxhQUFPLEdBQVcsSUFBSSxDQUFDO1FBQ3ZCOztXQUVHO1FBQ0gsaUJBQVcsR0FBVyxJQUFJLENBQUM7UUFDM0I7O1dBRUc7UUFDSCxzQkFBZ0IsR0FBVyxJQUFJLENBQUM7UUFDaEM7O1dBRUc7UUFDSCxxQkFBZSxHQUFXLElBQUksQ0FBQztRQUMvQjs7V0FFRztRQUNILGdCQUFVLEdBQWEsRUFBRSxDQUFDO1FBQzFCOztXQUVHO1FBQ0gsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6QixlQUFTLEdBQWEsSUFBSSxDQUFDO1FBQzNCOztXQUVHO1FBQ0gsY0FBUSxHQUFhLElBQUksQ0FBQztRQUMxQjs7V0FFRztRQUNGLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFDM0I7O1dBRUc7UUFDSCxlQUFTLEdBQWEsSUFBSSxDQUFDO1FBQzNCOztXQUVHO1FBQ0gsZ0JBQVUsR0FBa0IsSUFBSSxD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RyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNyQzthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQ3ZDLENBQUM7SUFFTCx1QkFBQztBQUFELENBelNBLEFBeVNDLENBelM2QyxrQkFBUSxHQXlTckQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IFBsYXllckluZm9Nb2RlbCBmcm9tIFwiLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9QbGF5ZXJJbmZvTW9kZWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBlcnNvbmFsSW5mb1ZpZXcgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG5cclxuICAgIHByaXZhdGUgbW9kZWw6UGxheWVySW5mb01vZGVsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5HlrprmiYvmnLrmjInpkq5cclxuICAgICAqL1xyXG4gICAgYmluZFBob25lQnRuOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5L+u5pS55a+G56CB5oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIGNoYW5nZVB3ZEJ0bjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOWQjeWtl1xyXG4gICAgICovXHJcbiAgICBuYW1lTGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIGlkXHJcbiAgICAgKi9cclxuICAgIGlkTGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOi0puaIt+exu+Wei1xyXG4gICAgICovXHJcbiAgICB1c2VyVHlwZUxibDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmiYvmnLrlj7fnoIFcclxuICAgICAqL1xyXG4gICAgcGhvbmVMYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5aS05YOPXHJcbiAgICAgKi9cclxuICAgIHNwcml0ZUhlYWQ6Y2MuU3ByaXRlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5aS05YOP5qGGXHJcbiAgICAgKi9cclxuICAgIHNwcml0ZUhlYWRGcmFtZTpjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogdmlw5YaF5a655qC56IqC54K5XHJcbiAgICAgKi9cclxuICAgIHZpcE5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOa/gOa0u+aMiemSrlxyXG4gICAgICovXHJcbiAgICBhY3RpdmF0ZUJ0bjpjYy5Ob2RlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5r+A5rS75paH5pysXHJcbiAgICAgKi9cclxuICAgIGFjdGl2YXRlVGV4dE5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOWNh+e6p+aWh+acrFxyXG4gICAgICovXHJcbiAgICB1cGdyYWRlVGV4dE5vZGU6Y2MuTm9kZSA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIHZpcOaYvuekuuiKgueCuembhuWQiCjljIXlkKvnjqnlrrYg5LiN5pivdmlw55qE5oOF5Ya1IOWSjCDnjqnlrrblt7Lnu4/mmK92aXDnmoTmg4XlhrUpXHJcbiAgICAgKi9cclxuICAgIHZpcE5vZGVBcnI6Y2MuTm9kZVtdID0gW107XHJcbiAgICAvKipcclxuICAgICAqIOWNh+e6p+WIsOS4i+S4gOe6p+eahHZpcOaPkOekuuaWh+acrFxyXG4gICAgICovXHJcbiAgICBsYWJlbFZpcDpjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBsYWJlbFZpcDE6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5Y2H57qn5Yiw5LiL5LiA57qn55qEdmlw6ZyA6KaB55qE6YeR6aGNXHJcbiAgICAgKi9cclxuICAgIHZpcE1vbmV5OiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICAvKipcclxuICAgICAqIOS4i+S4gOe6p+eahHZpcOetiee0mlxyXG4gICAgICovXHJcbiAgICAgdmlwTGV2ZWw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmNdmlw562J57qn5Zu+5qCHXHJcbiAgICAgKi9cclxuICAgIHNwcml0ZVZpcDpjYy5TcHJpdGUgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiB2aXDov5vluqZcclxuICAgICAqL1xyXG4gICAgcHJvY2Vzc1ZpcDpjYy5Qcm9ncmVzc0JhciA9IG51bGw7XHJcbiAgICBiaW5kUGhvbmU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IEdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJQbGF5ZXJJbmZvTW9kZWxcIilcclxuXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LlBFUlNPTkFMSU5GT1VQREFURSwgdGhpcywgdGhpcy5yZWZyZXNoUGFuZWwpXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImVkaXROYW1lQnRuXCIsIHRoaXMub3BlbkVkaXROaWNrbmFtZVVJLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY29weUlkQnRuXCIsIHRoaXMuY29weUlkQWN0aW9uLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLmFkZENvbW1vbkNsaWNrKCBcInNldHRpbmdCdG5cIiwgdGhpcy5vcGVuU2V0dGluZ1VJLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiZXhpdEJ0blwiLCB0aGlzLmV4aXRBY2NvdW50QWN0aW9uLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKCBcImNoYW5nTGFiZWxcIiwgdGhpcy5vcGVuRWRpdEF2YXRlclVJLCB0aGlzKTtcclxuICAgICAgICB0aGlzLmJpbmRQaG9uZUJ0biA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJiaW5kUGhvbmVCdG5cIiwgdGhpcy5vcGVuQmluZFBob25lVUksIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlUHdkQnRuID0gIHRoaXMuYWRkQ29tbW9uQ2xpY2soIFwiY2hhbmdlUHdkQnRuXCIsIHRoaXMub3BlbkVkaXRQd2RVSSwgdGhpcyk7XHJcbiAgICAgICAgLy8gdGhpcy5iaW5kUGhvbmUgPSB0aGlzLmdldENoaWxkKFwiYmluZFBob25lQnRuL2hvbmdkaWFuXCIpO1xyXG4gICAgICAgIHRoaXMubmFtZUxibCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwibmFtZUxibFwiLCBjYy5MYWJlbClcclxuICAgICAgICB0aGlzLmlkTGJsID0gdGhpcy5nZXRDb21wb25lbnQoXCJpZExibFwiLCBjYy5MYWJlbClcclxuICAgICAgICB0aGlzLnVzZXJUeXBlTGJsID0gdGhpcy5nZXRDb21wb25lbnQoXCJ1c2VyVHlwZUxibFwiLCAgY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5waG9uZUxibCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwicGhvbmVMYmxcIiwgY2MuTGFiZWwpO1xyXG5cclxuICAgICAgICB0aGlzLnNwcml0ZUhlYWQgPXRoaXMuZ2V0Q29tcG9uZW50KFwiaGVhZEltZy9oZWFkRnJhbWVcIiwgY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLnNwcml0ZUhlYWRGcmFtZSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiaGVhZEltZy9oZWFkYm94XCIsIGNjLlNwcml0ZSk7XHJcblxyXG4gICAgICAgIHRoaXMudmlwTm9kZSA9dGhpcy5nZXRDaGlsZChcInZpcFwiKTtcclxuICAgICAgICB0aGlzLmFjdGl2YXRlQnRuID0gR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMudmlwTm9kZSwgXCJqaWh1b0J0blwiLCB0aGlzLmFjdGl2YXRlQnRuRnVuYywgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZVRleHROb2RlID0gY2MuZmluZChcImZudF9hY3RpdmF0ZVwiLCB0aGlzLmFjdGl2YXRlQnRuKTtcclxuICAgICAgICB0aGlzLnVwZ3JhZGVUZXh0Tm9kZSA9IGNjLmZpbmQoXCJ1cGdyYWRUZXh0XCIsIHRoaXMuYWN0aXZhdGVCdG4pXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy52aXBOb2RlQXJyWzBdID0gY2MuZmluZChcInZpcDBcIiwgdGhpcy52aXBOb2RlKTtcclxuICAgICAgICB0aGlzLnZpcE5vZGVBcnJbMV0gPSBjYy5maW5kKFwidmlwMVwiLCB0aGlzLnZpcE5vZGUpO1xyXG4gICAgICAgIHRoaXMubGFiZWxWaXAgPSBjYy5maW5kKFwiaWNvbkxpc3QvbGFiZWxfdmlwXCIsIHRoaXMudmlwTm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmxhYmVsVmlwMSA9IGNjLmZpbmQoXCJpY29uTGlzdC9sYWJlbF92aXBfdG9cIiwgdGhpcy52aXBOb2RlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMudmlwTW9uZXkgPSBjYy5maW5kKFwiaWNvbkxpc3QvdmlwX21vbmV5XCIsIHRoaXMudmlwTm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLnZpcExldmVsID0gY2MuZmluZChcImljb25MaXN0L3ZpcF9sZXZlbFwiLCB0aGlzLnZpcE5vZGUpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVWaXAgPSBjYy5maW5kKFwidmlwMS9pY29uX3ZpcFwiLCB0aGlzLnZpcE5vZGUpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG5cclxuICAgICAgICB0aGlzLnByb2Nlc3NWaXAgPSBjYy5maW5kKFwidmlwMS9wcm9jZXNzX2RpL3Byb2dyZXNzQmFyXCIsIHRoaXMudmlwTm9kZSkuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy52aXBOb2RlLmFjdGl2ZSA9ICFHbG9iYWwuU2V0dGluZy52aXBEaXNhYmxlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueaYteensOaMiemSrlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9wZW5FZGl0Tmlja25hbWVVSSgpe1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kRWRpdE5hbWVcIik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgICAvKipcclxuICAgICAqIOWkjeWItuaMiemSrlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvcHlJZEFjdGlvbigpe1xyXG4gICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5jb3B5VGV4dFRvQ2xpcGJvYXJkKFN0cmluZyhHbG9iYWwuUGxheWVyRGF0YS51aWQpLCB0aGlzLmNvcHlUZXh0VG9DbGlwYm9hcmRDYWxsQmFjay5iaW5kKHRoaXMpICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlpI3liLblm57osINcclxuICAgICAqIEBwYXJhbSByZXRTdHIgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29weVRleHRUb0NsaXBib2FyZENhbGxCYWNrKHJldFN0cil7XHJcbiAgICAgICAgaWYgKHJldFN0ci5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWkjeWItuaIkOWKn1wiKTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5aSN5Yi25aSx6LSlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7mjInpkq5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvcGVuU2V0dGluZ1VJKCl7XHJcbiAgICAgICAgLy8gR2xvYmFsLlVJLnNob3coXCJXbmRTZXR0aW5nXCIpO1xyXG4gICAgICAgIC8vV25kUGxheWVySW5mby5pbnN0YW5jZS5DaGFuZ2VZZXFpYW4oMyk7XHJcbiAgICAgICAgLy8gdGhpcy5pbnRlcm5hbEV2ZW50LmV2ZW50KFwiQ2hhbmdlVmlld1wiLDMpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vkv67mlLnlpLTlg49cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvcGVuRWRpdEF2YXRlclVJKCl7XHJcbiAgICAgICAgdGhpcy5pbnRlcm5hbEV2ZW50LmV2ZW50KFwiQ2hhbmdlVmlld1wiLDEpXHJcbiAgICAgICAgLy9XbmRQbGF5ZXJJbmZvLmluc3RhbmNlLkNoYW5nZVllcWlhbigxKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5YiH5o2i6LSm5Y+35oyJ6ZKuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZXhpdEFjY291bnRBY3Rpb24oKXtcclxuICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZE1lc3NhZ2VCb3hcIiwgXCLmgqjnoa7lrprpgIDlh7rlvZPliY3otKblj7fov5Tlm57nmbvlvZXnlYzpnaLvvJ9cIiwgMSwgKCk9PntcclxuICAgICAgICAgICAgR2xvYmFsLlNjZW5lTWFuYWdlci5nb1RvTG9naW4oKTtcclxuICAgICAgICB9LCAoKT0+e1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBHbG9iYWwuVUkuc2hvdyhcIlduZFRvZ2dsZUFjY291bnRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5HlrprmiYvmnLrmjInpkq5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvcGVuQmluZFBob25lVUkoKXtcclxuICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZEJpbmRQaG9uZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS/ruaUueWvhueggeaMiemSrlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9wZW5FZGl0UHdkVUkoKXtcclxuICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZENoYW5nZVB3ZFwiKTtcclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiDmv4DmtLvmjInpkq5cclxuICAgICAqL1xyXG4gICAgYWN0aXZhdGVCdG5GdW5jKCl7XHJcbiAgICAgICAgIC8v5omT5byAdmlw54m55p2D55WM6Z2iXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNIT1dfTkVUX1dBSVRJTkcsIFwiV25kVmlwM1wiKVxyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kVmlwM1wiKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvblN1YlZpZXdIaWRlKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TdWJWaWV3U2hvdygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZXFHZXRVc2VySW5mbyhudWxsLG51bGwpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaFBhbmVsKClcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc3Bvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFLCB0aGlzLCB0aGlzLnJlZnJlc2hQYW5lbClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hQYW5lbCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBHbG9iYWwuUGxheWVyRGF0YTtcclxuICAgICAgICB0aGlzLm5hbWVMYmwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQucmVtb3ZlRW1vamkoZGF0YS5uaWNrbmFtZSk7XHJcbiAgICAgICAgdGhpcy5pZExibC5zdHJpbmcgPSBcIklEOlwiICsgU3RyaW5nKGRhdGEudWlkKTtcclxuICAgICAgICB0aGlzLnVzZXJUeXBlTGJsLnN0cmluZyA9IChkYXRhLnR5cGUgPT0gMT8gXCLmuLjlrqLnlKjmiLdcIiA6IFwi5q2j5byP55So5oi3XCIpO1xyXG4gICAgICAgIGlmKEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuaXNSZWQgKVxyXG4gICAgICAgICAgICB0aGlzLnVzZXJUeXBlTGJsLm5vZGUuY29sb3IgPSAoZGF0YS50eXBlID09IDE/IHRoaXMudXNlclR5cGVMYmwubm9kZS5jb2xvciA6IGNjLmNvbG9yKDc0LDE1Nyw3MCwyNTUpKVxyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IHBob25lU3RyID0gZGF0YS5waG9uZS5zcGxpdChcIiBcIilbMV07XHJcbiAgICAgICAgcGhvbmVTdHIgPSBwaG9uZVN0ciB8fCBkYXRhLnBob25lO1xyXG4gICAgICAgIHRoaXMucGhvbmVMYmwuc3RyaW5nID0gKGRhdGEucGhvbmUgPT0gXCJcIiA/IFwi5pyq57uR5a6aXCIgOiBHbG9iYWwuVG9vbGtpdC5mb3JtYXRlU3RyV2l0aEFzdGVyaXNrKHBob25lU3RyLCAzLCA0KSk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVIZWFkLnNwcml0ZUZyYW1lID0gR2xvYmFsLlRvb2xraXQuZ2V0TG9jYWxIZWFkU2YoZGF0YS5oZWFkaW1nKTtcclxuICAgICAgICAvL+WktOWDj+ahhuiuvue9rlxyXG4gICAgICAgIC8vIEdsb2JhbC5Ub29sa2l0LmxvYWRMb2NhbEhlYWRGcmFtZSh0aGlzLnNwcml0ZUhlYWRGcmFtZSwgZGF0YS5oZWFka3VhbmcpO1xyXG5cclxuICAgICAgICAvLyBpZiAodGhpcy5iaW5kUGhvbmUgJiYgZGF0YS5waG9uZSAhPSBcIlwiKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYmluZFBob25lLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5iaW5kUGhvbmUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLnBob25lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlUHdkQnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZFBob25lQnRuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VQd2RCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZFBob25lQnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihkYXRhLnZpcCA+IDApe1xyXG4gICAgICAgICAgICAvL+W3sue7j+aYr3ZpcOeahOaDheWGtVxyXG4gICAgICAgICAgICB0aGlzLnZpcE5vZGVBcnJbMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudmlwTm9kZUFyclsxXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlVGV4dE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudXBncmFkZVRleHROb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIEdsb2JhbC5Ub29sa2l0LmxvYWRMb2NhbFZpcCh0aGlzLnNwcml0ZVZpcCwgZGF0YS52aXApO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL+S4jeaYr3ZpcOeahOaDheWGtVxyXG4gICAgICAgICAgICB0aGlzLnZpcE5vZGVBcnJbMF0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy52aXBOb2RlQXJyWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlVGV4dE5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy51cGdyYWRlVGV4dE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICB2YXIgcGVyY2VudCA9IDE7XHJcbiAgICAgICAgdmFyIHRvVmlwID0gZGF0YS52aXAgKyAxO1xyXG4gICAgICAgIHZhciB2aXBVZ3JhZGVFeHAgPSB0aGlzLm1vZGVsLkdldFZpcFVwZ3JhZGVFeHAodG9WaXApO1xyXG4gICAgICAgIHZhciB2aXBOZWVkRXhwID0gdmlwVWdyYWRlRXhwIC0gZGF0YS52aXBFeHA7XHJcbiAgICAgICAgLy8gaWYodmlwTmVlZEV4cCA+IDApe1xyXG4gICAgICAgIC8vICAgICB0aGlzLmxhYmVsVmlwLnN0cmluZyA9IFwi5LuF6ZyA5YWF5YC8XCIgKyB2aXBOZWVkRXhwICsgXCLlhYPvvIzljbPlj6/miJDkuLpWSVBcIiArIHRvVmlwO1xyXG4gICAgICAgIC8vICAgICBwZXJjZW50ID0gZGF0YS52aXBFeHAgLyB2aXBVZ3JhZGVFeHA7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYWN0aXZhdGVCdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAvLyAgICAgdGhpcy5sYWJlbFZpcC5zdHJpbmcgPSBcIuaBreWWnOaCqOW3suaIkOS4uuiHs+WwilZJUFwiICsgZGF0YS52aXA7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuYWN0aXZhdGVCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGlmICh2aXBOZWVkRXhwID4gMCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLmxhYmVsVmlwLnN0cmluZyA9IGNjLmpzLmZvcm1hdFN0cihcIuS7hemcgOWFheWAvCVz5YWD77yM5Y2z5Y+v5oiQ5Li6VklQJXNcIiwgdmlwTmVlZEV4cCwgdG9WaXApXHJcbiAgICAgICAgICAgIHRoaXMudmlwTW9uZXkuc3RyaW5nID0gdmlwTmVlZEV4cCArIFwi5YWDXCI7XHJcbiAgICAgICAgICAgIHRoaXMudmlwTGV2ZWwuc3RyaW5nID0gXCJWSVBcIiArIFN0cmluZyh0b1ZpcCk7XHJcbiAgICAgICAgICAgIHBlcmNlbnQgPSBkYXRhLnZpcEV4cCAvIHZpcFVncmFkZUV4cDtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUJ0bi5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnZpcE1vbmV5Lm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy52aXBMZXZlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxWaXAxLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsVmlwLnN0cmluZyA9IFwi5oGt5Zac5oKo5bey5oiQ5Li66Iez5bCKVklQXCIgKyBkYXRhLnZpcDtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUJ0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy52aXBNb25leS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnZpcExldmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxWaXAxLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByb2Nlc3NWaXAucHJvZ3Jlc3MgPSBwZXJjZW50O1xyXG4gICAgfVxyXG5cclxufSJdfQ==