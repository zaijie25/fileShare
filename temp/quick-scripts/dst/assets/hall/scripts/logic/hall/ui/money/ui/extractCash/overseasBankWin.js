
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/extractCash/overseasBankWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGV4dHJhY3RDYXNoXFxvdmVyc2Vhc0JhbmtXaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNERBQXVEO0FBR3ZEO0lBQTZDLG1DQUFRO0lBQXJEO1FBQUEscUVBa0dDO1FBL0ZXLGlCQUFXLEdBQWUsSUFBSSxDQUFDO1FBQy9CLG9CQUFjLEdBQWUsSUFBSSxDQUFDO1FBRWxDLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBQ2hDLHFCQUFlLEdBQWEsSUFBSSxDQUFDOztJQTJGN0MsQ0FBQztJQXBGYSxrQ0FBUSxHQUFsQjtRQUFBLGlCQXFCQztRQW5CRyxJQUFJLENBQUMsS0FBSyxHQUFpQixNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUV4RSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBR3JFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQywyQkFBMkIsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGtDQUFrQyxDQUFDLENBQUE7UUFFeEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksc0JBQXNCLEVBQUUsQ0FBQztRQUMzRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxHQUFHLElBQUks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Q0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3JGLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLEVBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3BGLE9BQUssV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUE7WUFDaEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3ZFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFDO2dCQUVoQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtnQkFDdkIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQixDQUFDLFNBQU8sQ0FBQTtZQUNSLE9BQUssUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O1FBaEI3QixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO29CQUFqQyxDQUFDO1NBaUJSO0lBQ0wsQ0FBQztJQUVTLDRDQUFXLEdBQXJCLFVBQXNCLEtBQUs7UUFFdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUE7SUFDMUIsQ0FBQztJQUVMLDZCQUFDO0FBQUQsQ0F0RUEsQUFzRUMsQ0F0RW9DLGtCQUFRLEdBc0U1QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgRXh0cmFjdE1vZGVsIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0V4dHJhY3RNb2RlbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgb3ZlcnNlYXNCYW5rV2luIGV4dGVuZHMgVmlld0Jhc2V7XHJcbiAgICBwcml2YXRlIG1vZGVsIDogRXh0cmFjdE1vZGVsO1xyXG5cclxuICAgIHByaXZhdGUgbmFtZUVkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBhY2NvdW50RWRpdEJveDogY2MuRWRpdEJveCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBvcGVuQmFua0xhYmVsIDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBvcGVuQmFua1RpcE5vZGUgOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGNob29zZU92ZXJzZWFzQmFua1ZpZXcgOiBDaG9vc2VPdmVyc2Vhc0JhbmtWaWV3O1xyXG5cclxuICAgIHByaXZhdGUgaWNvbiA6IGNjLk5vZGU7XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxFeHRyYWN0TW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkV4dHJhY3RNb2RlbFwiKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm5hbWVFZGl0Qm94ID0gdGhpcy5nZXRDb21wb25lbnQoXCJOYW1lRWRpdEJveFwiLGNjLkVkaXRCb3gpO1xyXG4gICAgICAgIHRoaXMuYWNjb3VudEVkaXRCb3ggPSB0aGlzLmdldENvbXBvbmVudChcIkFjY291bnRFZGl0Qm94XCIsY2MuRWRpdEJveCk7XHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5vcGVuQmFua0xhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJPcGVuaW5nYmFua0JveC9URVhUX0xBQkVMXCIsY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMub3BlbkJhbmtUaXBOb2RlID0gdGhpcy5nZXRDaGlsZChcIk9wZW5pbmdiYW5rQm94L1BMQUNFSE9MREVSX0xBQkVMXCIpXHJcblxyXG4gICAgICAgIHRoaXMuaWNvbiA9IHRoaXMuZ2V0Q2hpbGQoXCJPcGVuaW5nYmFua0JveC9TZWxlY3RCcmFuY2hcIik7XHJcbiAgICAgICAgdGhpcy5jaG9vc2VPdmVyc2Vhc0JhbmtWaWV3ID0gbmV3IENob29zZU92ZXJzZWFzQmFua1ZpZXcoKTtcclxuICAgICAgICB0aGlzLmNob29zZU92ZXJzZWFzQmFua1ZpZXcub25TZWxlY3QgPSB0aGlzLnNlbGVjdEJhbmtGdW5jLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaG9vc2VPdmVyc2Vhc0JhbmtWaWV3LnNldE5vZGUodGhpcy5nZXRDaGlsZChcImNob29zZUJhbmtcIikpO1xyXG4gICAgICAgIHRoaXMuY2hvb3NlT3ZlcnNlYXNCYW5rVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVDaG9vc2VBcmVhVmlldygpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJPcGVuaW5nYmFua0JveFwiLCgpPT57IHRoaXMuY2hvb3NlT3ZlcnNlYXNCYW5rVmlldy5hY3RpdmUgPSB0cnVlfSx0aGlzLG51bGwpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYmFuZEJ0blwiLHRoaXMuYmFuZEJ0bkZ1bmMsdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ2hvb3NlQXJlYVZpZXcoKXtcclxuICAgICAgICB0aGlzLmNob29zZU92ZXJzZWFzQmFua1ZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAvLyB0aGlzLmljb24uc2NhbGVZID0gdGhpcy5zd2l0Y2hLZXkgPyAxIDogLTE7XHJcbiAgICB9XHJcblxyXG4gICAgU3dpdGNoTGFiZWxTdGF0ZShpbmZvOnN0cmluZykge1xyXG4gICAgICAgIExvZ2dlci5sb2coXCLpgInmi6nkuoblk6rkuKrpk7booYxcIixpbmZvKTtcclxuICAgICAgICB0aGlzLm9wZW5CYW5rTGFiZWwuc3RyaW5nID0gaW5mb1xyXG4gICAgICAgIHRoaXMub3BlbkJhbmtMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB0aGlzLm9wZW5CYW5rVGlwTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuY2hvb3NlT3ZlcnNlYXNCYW5rVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0QmFua0Z1bmMoaW5mbyApe1xyXG4gICAgICAgIEdsb2JhbC5BdWRpby5wbGF5QnRuU291bmQoKTtcclxuICAgICAgICBMb2dnZXIubG9nKFwi6YCJ5oup5LqG5ZWlXCIsaW5mbylcclxuICAgICAgICB0aGlzLlN3aXRjaExhYmVsU3RhdGUoaW5mbylcclxuICAgICAgICB0aGlzLnVwZGF0ZUNob29zZUFyZWFWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lj5HpgIHnu5Hlrprmtojmga9cclxuICAgIGJhbmRCdG5GdW5jKCl7XHJcbiAgICAgICAgaWYoIXRoaXMuY2hlY2tUZXh0RW1wdHlBbmRTaG93VGlwcyh0aGlzLmFjY291bnRFZGl0Qm94LnN0cmluZywgXCLpk7booYzljaHkuI3og73kuLrnqbpcIikpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZighdGhpcy5jaGVja1RleHRFbXB0eUFuZFNob3dUaXBzKHRoaXMubmFtZUVkaXRCb3guc3RyaW5nLCBcIuWnk+WQjeS4jeiDveS4uuepulwiKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKCF0aGlzLmNoZWNrVGV4dEVtcHR5QW5kU2hvd1RpcHModGhpcy5vcGVuQmFua0xhYmVsLnN0cmluZywgXCLor7fpgInmi6nlvIDmiLfpk7booYxcIikpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZighdGhpcy5jaGVja1NwZWNpYWxDaGFyQW5kU2hvd1RpcHModGhpcy5hY2NvdW50RWRpdEJveC5zdHJpbmcsIFwiIFwiLCBcIui0puWPt+S4reaciemdnuazleWtl+espu+8jOivt+mHjeaWsOi+k+WFpVwiKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kT3ZlcnNlYXNCYW5kQ29uZmlybVwiLHRoaXMubmFtZUVkaXRCb3guc3RyaW5nLHRoaXMuYWNjb3VudEVkaXRCb3guc3RyaW5nLHRoaXMub3BlbkJhbmtMYWJlbC5zdHJpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tUZXh0RW1wdHlBbmRTaG93VGlwcyh0ZXh0OnN0cmluZywgdGlwc0xhYmVsOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBpZih0ZXh0Lmxlbmd0aCA8PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAodGlwc0xhYmVsKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+Wtl+espuS4suS4reaYr+WQpuWMheWQq+afkOS6m+eJueauiuWtl+esplxyXG4gICAgICogQHBhcmFtIHRleHQg6KaB5qOA5rWL55qE5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0gc3BlY2lhbFN0cmluZyDnibnmrorlrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSB0aXBzTGFiZWwg5qOA5rWL5aaC5p6c5YyF5ZCr5YiZdGlw5o+Q56S655qE5a2X56ym5LiyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tTcGVjaWFsQ2hhckFuZFNob3dUaXBzKHRleHQ6c3RyaW5nLCBzcGVjaWFsU3RyaW5nOnN0cmluZywgdGlwc0xhYmVsOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGMgPSB0ZXh0LmNoYXJBdChpKTtcclxuICAgICAgICAgICAgaWYgKHNwZWNpYWxTdHJpbmcuaW5kZXhPZihjKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcCh0aXBzTGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDaG9vc2VPdmVyc2Vhc0JhbmtWaWV3IGV4dGVuZHMgVmlld0Jhc2V7XHJcbiAgICBwcm90ZWN0ZWQgbW9kZWwgOiBFeHRyYWN0TW9kZWw7XHJcbiAgICBwcm90ZWN0ZWQgaXRlbTpjYy5Ob2RlO1xyXG4gICAgcHJvdGVjdGVkIGNvbnRlbnRSb290OmNjLk5vZGU7XHJcbiAgICBwcm90ZWN0ZWQgc2Nyb2xsOmNjLlNjcm9sbFZpZXc7XHJcbiAgICBwcm90ZWN0ZWQgaXRlbUxpc3QgPSBbXTtcclxuICAgIHByb3RlY3RlZCBjb21maXJtQnRuOmNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgcHJvdGVjdGVkIGRhdGFzIDogYW55W107XHJcbiAgICBwcm90ZWN0ZWQgZGF0YUluZGV4Om51bWJlciA9IDBcclxuXHJcbiAgICBwdWJsaWMgb25TZWxlY3Q6RnVuY3Rpb25cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaXRlbSA9IHRoaXMuZ2V0Q2hpbGQoXCJzY3JvbGx2aWV3L3ZpZXcvY29udGVudC9pdGVtXCIpO1xyXG4gICAgICAgIHRoaXMuaXRlbS5hY3RpdmUgPWZhbHNlXHJcbiAgICAgICAgdGhpcy5jb250ZW50Um9vdCA9IHRoaXMuZ2V0Q2hpbGQoXCJzY3JvbGx2aWV3L3ZpZXcvY29udGVudFwiKTtcclxuICAgICAgICB0aGlzLnNjcm9sbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwic2Nyb2xsdmlld1wiLCBjYy5TY3JvbGxWaWV3KTtcclxuICAgICAgICB0aGlzLmNvbWZpcm1CdG4gPSB0aGlzLmdldENoaWxkKFwiYnRuQ29tZmlybVwiKVxyXG4gICAgICAgIHRoaXMuY29tZmlybUJ0bi5vbihcImNsaWNrXCIsdGhpcy5vbkNvbWZpcm1DbGljayx0aGlzKVxyXG4gICAgICAgIHRoaXMubW9kZWwgPSA8RXh0cmFjdE1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJFeHRyYWN0TW9kZWxcIik7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcIm1hc2tcIiwgKCk9PnsgdGhpcy5hY3RpdmUgPWZhbHNlIH0sIHRoaXMsIG51bGwpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRJdGVtcygpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld1Nob3coKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsLnNjcm9sbFRvVG9wKDApO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uQ29tZmlybUNsaWNrKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLmRhdGFzW3RoaXMuZGF0YUluZGV4XSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gdGhpcy5kYXRhc1t0aGlzLmRhdGFJbmRleF07XHJcbiAgICAgICAgICAgIGlmKHRoaXMub25TZWxlY3QpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0KGluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdEl0ZW1zKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmRhdGFzID0gdGhpcy5tb2RlbC5nZXRPdmVyc2Vhc0JhbmtBcnJheSgpO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhcy5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gdGhpcy5kYXRhc1tpXTtcclxuICAgICAgICAgICAgTG9nZ2VyLmxvZyhcIumTtuihjFwiLGluZm8pO1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbSk7XHJcbiAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY2MuZmluZChcImNoZWNrVG9nZ2xlL0JhY2tncm91bmQvYmFua05hbWVcIixpdGVtKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGluZm87XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJjaGVja1RvZ2dsZS9jaGVja21hcmsvYmFua05hbWVcIixpdGVtKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGluZm87XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFJvb3QuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIGxldCB0bXBJbmRleCA9IGlcclxuICAgICAgICAgICAgbGV0IHRvZ2dsZSA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJjaGVja1RvZ2dsZVwiKS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKVxyXG4gICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZS5pc0NoZWNrZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uSXRlbUNsaWNrKHRtcEluZGV4KTtcclxuICAgICAgICAgICAgfSwgdGhpcylcclxuICAgICAgICAgICAgdGhpcy5pdGVtTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25JdGVtQ2xpY2soaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kYXRhSW5kZXggPSBpbmRleFxyXG4gICAgfVxyXG5cclxufSJdfQ==