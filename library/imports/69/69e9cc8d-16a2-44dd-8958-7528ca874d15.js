"use strict";
cc._RF.push(module, '69e9cyNFqJE3YlYdSjKh00V', 'overseasBankWin');
// hall/scripts/logic/hall/ui/money/ui/extractCash/overseasBankWin.ts

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
var ViewBase_1 = require("../../../../../core/ui/ViewBase");
var overseasBankWin = /** @class */ (function (_super) {
    __extends(overseasBankWin, _super);
    function overseasBankWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameEditBox = null;
        _this.accountEditBox = null;
        _this.openBankLabel = null;
        _this.openBankTipNode = null;
        return _this;
    }
    overseasBankWin.prototype.initView = function () {
        var _this = this;
        this.model = Global.ModelManager.getModel("ExtractModel");
        this.nameEditBox = this.getComponent("NameEditBox", cc.EditBox);
        this.accountEditBox = this.getComponent("AccountEditBox", cc.EditBox);
        this.openBankLabel = this.getComponent("OpeningbankBox/TEXT_LABEL", cc.Label);
        this.openBankTipNode = this.getChild("OpeningbankBox/PLACEHOLDER_LABEL");
        this.icon = this.getChild("OpeningbankBox/SelectBranch");
        this.chooseOverseasBankView = new ChooseOverseasBankView();
        this.chooseOverseasBankView.onSelect = this.selectBankFunc.bind(this);
        this.chooseOverseasBankView.setNode(this.getChild("chooseBank"));
        this.chooseOverseasBankView.active = false;
        this.updateChooseAreaView();
        this.addCommonClick("OpeningbankBox", function () { _this.chooseOverseasBankView.active = true; }, this, null);
        this.addCommonClick("bandBtn", this.bandBtnFunc, this);
    };
    overseasBankWin.prototype.updateChooseAreaView = function () {
        this.chooseOverseasBankView.active = false;
        // this.icon.scaleY = this.switchKey ? 1 : -1;
    };
    overseasBankWin.prototype.SwitchLabelState = function (info) {
        Logger.log("选择了哪个银行", info);
        this.openBankLabel.string = info;
        this.openBankLabel.node.active = true;
        this.openBankTipNode.active = false;
        this.chooseOverseasBankView.active = false;
    };
    overseasBankWin.prototype.selectBankFunc = function (info) {
        Global.Audio.playBtnSound();
        Logger.log("选择了啥", info);
        this.SwitchLabelState(info);
        this.updateChooseAreaView();
    };
    //发送绑定消息
    overseasBankWin.prototype.bandBtnFunc = function () {
        if (!this.checkTextEmptyAndShowTips(this.accountEditBox.string, "银行卡不能为空"))
            return;
        if (!this.checkTextEmptyAndShowTips(this.nameEditBox.string, "姓名不能为空"))
            return;
        if (!this.checkTextEmptyAndShowTips(this.openBankLabel.string, "请选择开户银行"))
            return;
        if (!this.checkSpecialCharAndShowTips(this.accountEditBox.string, " ", "账号中有非法字符，请重新输入"))
            return;
        Global.UI.show("WndOverseasBandConfirm", this.nameEditBox.string, this.accountEditBox.string, this.openBankLabel.string);
    };
    overseasBankWin.prototype.checkTextEmptyAndShowTips = function (text, tipsLabel) {
        if (text.length <= 0) {
            Global.UI.fastTip(tipsLabel);
            return false;
        }
        return true;
    };
    /**
     * 检测字符串中是否包含某些特殊字符
     * @param text 要检测的字符串
     * @param specialString 特殊字符串
     * @param tipsLabel 检测如果包含则tip提示的字符串
     */
    overseasBankWin.prototype.checkSpecialCharAndShowTips = function (text, specialString, tipsLabel) {
        for (var i = 0; i < text.length; i++) {
            var c = text.charAt(i);
            if (specialString.indexOf(c) >= 0) {
                Global.UI.fastTip(tipsLabel);
                return false;
            }
        }
        return true;
    };
    return overseasBankWin;
}(ViewBase_1.default));
exports.default = overseasBankWin;
var ChooseOverseasBankView = /** @class */ (function (_super) {
    __extends(ChooseOverseasBankView, _super);
    function ChooseOverseasBankView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemList = [];
        _this.comfirmBtn = null;
        _this.dataIndex = 0;
        return _this;
    }
    ChooseOverseasBankView.prototype.initView = function () {
        var _this = this;
        this.item = this.getChild("scrollview/view/content/item");
        this.item.active = false;
        this.contentRoot = this.getChild("scrollview/view/content");
        this.scroll = this.getComponent("scrollview", cc.ScrollView);
        this.comfirmBtn = this.getChild("btnComfirm");
        this.comfirmBtn.on("click", this.onComfirmClick, this);
        this.model = Global.ModelManager.getModel("ExtractModel");
        this.addCommonClick("mask", function () { _this.active = false; }, this, null);
        this.initItems();
    };
    ChooseOverseasBankView.prototype.onSubViewShow = function () {
        this.scroll.scrollToTop(0);
    };
    ChooseOverseasBankView.prototype.onComfirmClick = function () {
        if (this.datas[this.dataIndex]) {
            var info = this.datas[this.dataIndex];
            if (this.onSelect)
                this.onSelect(info);
        }
    };
    ChooseOverseasBankView.prototype.initItems = function () {
        var _this = this;
        this.datas = this.model.getOverseasBankArray();
        var _loop_1 = function (i) {
            var info = this_1.datas[i];
            Logger.log("银行", info);
            var item = cc.instantiate(this_1.item);
            item.active = true;
            cc.find("checkToggle/Background/bankName", item).getComponent(cc.Label).string = info;
            cc.find("checkToggle/checkmark/bankName", item).getComponent(cc.Label).string = info;
            this_1.contentRoot.addChild(item);
            var tmpIndex = i;
            var toggle = item.getChildByName("checkToggle").getComponent(cc.Toggle);
            item.on(cc.Node.EventType.TOUCH_END, function () {
                toggle.isChecked = true;
                _this.onItemClick(tmpIndex);
            }, this_1);
            this_1.itemList.push(item);
        };
        var this_1 = this;
        for (var i = 0; i < this.datas.length; i++) {
            _loop_1(i);
        }
    };
    ChooseOverseasBankView.prototype.onItemClick = function (index) {
        this.dataIndex = index;
    };
    return ChooseOverseasBankView;
}(ViewBase_1.default));

cc._RF.pop();