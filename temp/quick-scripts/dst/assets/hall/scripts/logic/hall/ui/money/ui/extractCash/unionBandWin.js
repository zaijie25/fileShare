
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/extractCash/unionBandWin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6e71eks40VET6CzUdsggple', 'unionBandWin');
// hall/scripts/logic/hall/ui/money/ui/extractCash/unionBandWin.ts

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
exports.BankInfoType = void 0;
var ViewBase_1 = require("../../../../../core/ui/ViewBase");
var PoolBase_1 = require("../../../../../core/tool/PoolBase");
var unionBandWin = /** @class */ (function (_super) {
    __extends(unionBandWin, _super);
    function unionBandWin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameEditBox = null;
        _this.accountEditBox = null;
        _this.bankbranchEditBox = null;
        _this.openBankLabel = null;
        _this.openBankTipNode = null;
        _this.openProvinceLabel = null;
        _this.openProvinceTipNode = null;
        _this.openCityLabel = null;
        _this.openCityTipNode = null;
        _this.banklocationInfo = null;
        _this.provinceCode = 100000;
        _this.bankInfo = {};
        return _this;
    }
    unionBandWin.prototype.initView = function () {
        var _this = this;
        this.model = Global.ModelManager.getModel("ExtractModel");
        this.nameEditBox = this.getComponent("NameEditBox", cc.EditBox);
        this.accountEditBox = this.getComponent("AccountEditBox", cc.EditBox);
        this.bankbranchEditBox = this.getComponent("BankbranchEditBox", cc.EditBox);
        this.openBankLabel = this.getComponent("OpeningbankBox/TEXT_LABEL", cc.Label);
        this.openBankTipNode = this.getChild("OpeningbankBox/PLACEHOLDER_LABEL");
        this.openProvinceLabel = this.getComponent("adapt/ProvinceEditBox/TEXT_LABEL", cc.Label);
        this.openProvinceTipNode = this.getChild("adapt/ProvinceEditBox/PLACEHOLDER_LABEL");
        this.openCityLabel = this.getComponent("adapt/CityEditBox/TEXT_LABEL", cc.Label);
        this.openCityTipNode = this.getChild("adapt/CityEditBox/PLACEHOLDER_LABEL");
        this.cityBg = this.getChild("adapt/CityEditBox/BACKGROUND_SPRITE").getComponent(cc.Sprite);
        this.banklocationInfo = Global.ResourceManager.getRes("hall/config/location", cc.JsonAsset).json;
        this.model.BankLocationInfo = this.banklocationInfo;
        this.icon = this.getChild("OpeningbankBox/SelectBranch");
        this.chooseBankView = new ChooseBankView();
        this.chooseBankView.onSelect = this.selectBankFunc.bind(this);
        this.chooseBankView.setNode(this.getChild("chooseBank"));
        this.chooseBankView.subViewState = false;
        this.chooseProvinceView = new ChooseProvinceView();
        this.chooseProvinceView.onSelect = this.selectBankFunc.bind(this);
        this.chooseProvinceView.setNode(this.getChild("chooseProvince"));
        this.chooseProvinceView.subViewState = false;
        this.chooseCityView = new ChooseCityView();
        this.chooseCityView.onSelect = this.selectBankFunc.bind(this);
        this.chooseCityView.setNode(this.getChild("chooseCity"));
        this.chooseCityView.subViewState = false;
        // this.addCommonClick("chooseBank/mask_button",this.switchChooseAreaView,this);
        this.switchKey = false;
        this.updateChooseAreaView();
        this.addCommonClick("OpeningbankBox", function () { _this.chooseBankView.onSubViewShow(); }, this, null);
        this.addCommonClick("adapt/ProvinceEditBox", function () { _this.chooseProvinceView.onSubViewShow(); }, this, null);
        this.addCommonClick("adapt/CityEditBox", this.openCityView, this, null);
        this.addCommonClick("bandBtn", this.bandBtnFunc, this);
    };
    unionBandWin.prototype.SetCityContentState = function (flag) {
        this.cityBg.node.color = flag ? cc.color(255, 255, 255, 255) : cc.color(150, 150, 150, 150);
    };
    unionBandWin.prototype.openCityView = function () {
        if (this.openProvinceLabel.string) {
            this.chooseCityView.onSubViewShow();
        }
    };
    unionBandWin.prototype.onSubViewShow = function () {
        this.openBankLabel.string = "";
        this.openBankTipNode.active = true;
        this.SetCityContentState(false);
    };
    unionBandWin.prototype.onSubViewHide = function () {
        this.openBankLabel.string = "";
        this.openCityLabel.string = "";
        this.openProvinceLabel.string = "";
        this.provinceCode = 100000;
        this.nameEditBox.string = "";
        this.accountEditBox.string = "";
        this.bankbranchEditBox.string = "";
        this.openBankTipNode.active = true;
        this.openCityTipNode.active = true;
        this.openProvinceTipNode.active = true;
        // this.chooseBankView.active = false
        // this.chooseCityView.active = false
        // this.chooseProvinceView.active = false
    };
    unionBandWin.prototype.updateChooseAreaView = function () {
        this.chooseBankView.subViewState = false;
        // this.icon.scaleY = this.switchKey ? 1 : -1;
    };
    unionBandWin.prototype.switchChooseAreaView = function () {
        this.chooseBankView.subViewState = true;
        //this.openBankTipNode.active =true
    };
    unionBandWin.prototype.selectBankFunc = function (key, info) {
        Global.Audio.playBtnSound();
        this.SwitchLabelState(key, info);
        this.updateChooseAreaView();
    };
    unionBandWin.prototype.SwitchLabelState = function (key, info) {
        switch (key) {
            case BankInfoType.BankName:
                this.openBankLabel.string = info;
                this.openBankLabel.node.active = true;
                this.openBankTipNode.active = false;
                this.chooseBankView.active = false;
                break;
            case BankInfoType.Province:
                this.openProvinceLabel.string = info;
                this.openProvinceLabel.node.active = true;
                this.openProvinceTipNode.active = false;
                this.chooseProvinceView.active = false;
                this.openCityLabel.node.active = false;
                this.openCityTipNode.active = true;
                this.SetCityContentState(true);
                break;
            case BankInfoType.City:
                this.openCityLabel.string = info;
                this.openCityLabel.node.active = true;
                this.openCityTipNode.active = false;
                this.chooseCityView.active = false;
                break;
            default:
                break;
        }
    };
    unionBandWin.prototype.checkTextEmptyAndShowTips = function (text, tipsLabel) {
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
    unionBandWin.prototype.checkSpecialCharAndShowTips = function (text, specialString, tipsLabel) {
        for (var i = 0; i < text.length; i++) {
            var c = text.charAt(i);
            if (specialString.indexOf(c) >= 0) {
                Global.UI.fastTip(tipsLabel);
                return false;
            }
        }
        return true;
    };
    //发送绑定消息
    unionBandWin.prototype.bandBtnFunc = function () {
        if (!this.checkTextEmptyAndShowTips(this.accountEditBox.string, "银行卡不能为空"))
            return;
        if (!this.checkTextEmptyAndShowTips(this.nameEditBox.string, "姓名不能为空"))
            return;
        if (!this.checkTextEmptyAndShowTips(this.openBankLabel.string, "请选择开户银行"))
            return;
        if (!this.checkTextEmptyAndShowTips(this.openProvinceLabel.string, "请选择开户省份"))
            return;
        if (!this.checkTextEmptyAndShowTips(this.openCityLabel.string, "请选择开户城市"))
            return;
        if (!this.checkSpecialCharAndShowTips(this.accountEditBox.string, " ", "账号中有非法字符，请重新输入"))
            return;
        if (!this.checkTextEmptyAndShowTips(this.bankbranchEditBox.string, "开户支行不能为空"))
            return;
        Global.UI.show("WndUnionBandConfirm", this.nameEditBox.string, this.accountEditBox.string, this.bankbranchEditBox.string, this.openBankLabel.string, this.openProvinceLabel.string, this.openCityLabel.string, this.model.getBankCoke(this.openBankLabel.string));
    };
    return unionBandWin;
}(ViewBase_1.default));
exports.default = unionBandWin;
var BankInfoType;
(function (BankInfoType) {
    BankInfoType[BankInfoType["BankName"] = 1] = "BankName";
    BankInfoType[BankInfoType["Province"] = 2] = "Province";
    BankInfoType[BankInfoType["City"] = 3] = "City";
})(BankInfoType = exports.BankInfoType || (exports.BankInfoType = {}));
var ChooseBankView = /** @class */ (function (_super) {
    __extends(ChooseBankView, _super);
    function ChooseBankView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemList = [];
        _this.comfirmBtn = null;
        _this.dataIndex = 0;
        return _this;
    }
    ChooseBankView.prototype.initView = function () {
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
    ChooseBankView.prototype.onSubViewShow = function () {
        this.active = true;
        this.scroll.scrollToTop(0);
    };
    ChooseBankView.prototype.onComfirmClick = function () {
        if (this.datas[this.dataIndex]) {
            var info = this.datas[this.dataIndex];
            if (this.onSelect)
                this.onSelect(BankInfoType.BankName, info);
        }
    };
    ChooseBankView.prototype.initItems = function () {
        var _this = this;
        this.datas = this.model.getBankArray();
        var _loop_1 = function (i) {
            var info = this_1.datas[i];
            var item = cc.instantiate(this_1.item);
            item.active = true;
            /* let numLabel = item.getChildByName("bankName").getComponent(cc.Label);
            numLabel.string = info;  */
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
    ChooseBankView.prototype.onItemClick = function (index) {
        this.dataIndex = index;
    };
    return ChooseBankView;
}(ViewBase_1.default));
var ChooseProvinceView = /** @class */ (function (_super) {
    __extends(ChooseProvinceView, _super);
    function ChooseProvinceView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChooseProvinceView.prototype.onComfirmClick = function () {
        if (this.datas[this.dataIndex]) {
            var info = this.datas[this.dataIndex];
            if (this.onSelect)
                this.onSelect(BankInfoType.Province, info.name);
        }
    };
    ChooseProvinceView.prototype.onSubViewShow = function () {
        _super.prototype.onSubViewShow.call(this);
        this.dataIndex = this.model.DefautProvinceCode;
    };
    ChooseProvinceView.prototype.initItems = function () {
        var _this = this;
        this.datas = this.model.BankLocationInfo;
        var _loop_2 = function (id) {
            if (this_2.datas.hasOwnProperty(id)) {
                var info = this_2.datas[id].name;
                var item = cc.instantiate(this_2.item);
                item.active = true;
                /* let numLabel = item.getChildByName("bankName").getComponent(cc.Label);
                numLabel.string = info; */
                cc.find("checkToggle/Background/bankName", item).getComponent(cc.Label).string = info;
                cc.find("checkToggle/checkmark/bankName", item).getComponent(cc.Label).string = info;
                this_2.contentRoot.addChild(item);
                var tmpIndex_1 = id;
                var toggle_1 = item.getChildByName("checkToggle").getComponent(cc.Toggle);
                item.on(cc.Node.EventType.TOUCH_END, function () {
                    toggle_1.isChecked = true;
                    _this.onItemClick(tmpIndex_1);
                }, this_2);
                this_2.itemList.push(item);
            }
        };
        var this_2 = this;
        for (var id in this.datas) {
            _loop_2(id);
        }
    };
    ChooseProvinceView.prototype.onItemClick = function (index) {
        _super.prototype.onItemClick.call(this, index);
        this.model.DefautProvinceCode = index;
    };
    return ChooseProvinceView;
}(ChooseBankView));
var ChooseCityView = /** @class */ (function (_super) {
    __extends(ChooseCityView, _super);
    function ChooseCityView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemTable = [];
        return _this;
    }
    ChooseCityView.prototype.onComfirmClick = function () {
        if (this.datas[this.ProvinceIndex]) {
            var info = this.datas[this.ProvinceIndex].city[this.dataIndex];
            if (this.onSelect)
                this.onSelect(BankInfoType.City, info.name);
        }
    };
    ChooseCityView.prototype.initView = function () {
        var _this = this;
        this.item = this.getChild("scrollview/view/content/item");
        this.item.active = false;
        this.contentRoot = this.getChild("scrollview/view/content");
        this.scroll = this.getComponent("scrollview", cc.ScrollView);
        this.comfirmBtn = this.getChild("btnComfirm");
        this.comfirmBtn.on("click", this.onComfirmClick, this);
        this.model = Global.ModelManager.getModel("ExtractModel");
        this.addCommonClick("mask", function () { _this.active = false; }, this, null);
        this.initItemPool();
    };
    ChooseCityView.prototype.initItemPool = function () {
        this.itemPool = new CityItemPool(this.item);
    };
    ChooseCityView.prototype.onSubViewShow = function (args) {
        _super.prototype.onSubViewShow.call(this);
        this.ProvinceIndex = this.model.DefautProvinceCode;
        this.dataIndex = parseInt(this.model.GetDefautCityCode(this.ProvinceIndex), 10);
        this.initItems();
    };
    ChooseCityView.prototype.onSubViewHide = function () {
    };
    ChooseCityView.prototype.initItems = function () {
        var _this = this;
        this.recycle();
        this.datas = this.model.BankLocationInfo;
        if (this.datas.hasOwnProperty(this.ProvinceIndex)) {
            var _loop_3 = function (id) {
                var info = this_3.datas[this_3.ProvinceIndex].city[id].name;
                var item = this_3.itemPool.getItem();
                item.active = true;
                /* let numLabel = item.getChildByName("bankName").getComponent(cc.Label);
                numLabel.string = info; */
                cc.find("checkToggle/Background/bankName", item).getComponent(cc.Label).string = info;
                cc.find("checkToggle/checkmark/bankName", item).getComponent(cc.Label).string = info;
                this_3.contentRoot.addChild(item);
                var tmpIndex = id;
                var toggle = item.getChildByName("checkToggle").getComponent(cc.Toggle);
                item.on(cc.Node.EventType.TOUCH_END, function () {
                    toggle.isChecked = true;
                    _this.onItemClick(tmpIndex);
                }, this_3);
                this_3.itemTable.push(item);
            };
            var this_3 = this;
            for (var id in this.datas[this.ProvinceIndex].city) {
                _loop_3(id);
            }
        }
    };
    ChooseCityView.prototype.recycle = function () {
        this.itemPool.recycleAll(this.itemTable);
        this.itemTable = [];
    };
    ChooseCityView.prototype.onDispose = function () {
        this.itemPool.resetPool();
        this.itemTable = [];
    };
    return ChooseCityView;
}(ChooseBankView));
var CityItemPool = /** @class */ (function (_super) {
    __extends(CityItemPool, _super);
    function CityItemPool(copyNode) {
        var _this = _super.call(this) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    CityItemPool.prototype.createItem = function () {
        return cc.instantiate(this.copyNode);
    };
    CityItemPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    CityItemPool.prototype.recycleAll = function (arr) {
        var _this = this;
        _super.prototype.recycleAll.call(this, arr);
        arr.forEach(function (ele) {
            _this.resetItem(ele);
        });
    };
    return CityItemPool;
}(PoolBase_1.default));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGV4dHJhY3RDYXNoXFx1bmlvbkJhbmRXaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDREQUF1RDtBQUV2RCw4REFBeUQ7QUFFekQ7SUFBMEMsZ0NBQVE7SUFBbEQ7UUFBQSxxRUF5TkM7UUFyTlcsaUJBQVcsR0FBZSxJQUFJLENBQUM7UUFDL0Isb0JBQWMsR0FBZSxJQUFJLENBQUM7UUFDbEMsdUJBQWlCLEdBQWUsSUFBSSxDQUFDO1FBQ3JDLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBQ2hDLHFCQUFlLEdBQWEsSUFBSSxDQUFDO1FBRWpDLHVCQUFpQixHQUFZLElBQUksQ0FBQTtRQUNqQyx5QkFBbUIsR0FBVyxJQUFJLENBQUE7UUFFbEMsbUJBQWEsR0FBWSxJQUFJLENBQUE7UUFDN0IscUJBQWUsR0FBVyxJQUFJLENBQUE7UUFFL0Isc0JBQWdCLEdBQVEsSUFBSSxDQUFBO1FBRTVCLGtCQUFZLEdBQVUsTUFBTSxDQUFBO1FBVTNCLGNBQVEsR0FBc0IsRUFBRSxDQUFBOztJQTZMNUMsQ0FBQztJQXhMYSwrQkFBUSxHQUFsQjtRQUFBLGlCQXVEQztRQXJERyxJQUFJLENBQUMsS0FBSyxHQUFpQixNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUV4RSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFDLEVBQUUsQ0FBQyxP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Q0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FsRkEsQUFrRkMsQ0FsRjRCLGNBQWMsR0FrRjFDO0FBQ0Q7SUFBMkIsZ0NBQVE7SUFDL0Isc0JBQW9CLFFBQWlCO1FBQXJDLFlBQ0ksaUJBQU8sU0FDVjtRQUZtQixjQUFRLEdBQVIsUUFBUSxDQUFTOztJQUVyQyxDQUFDO0lBRVMsaUNBQVUsR0FBcEI7UUFDSSxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFUyxnQ0FBUyxHQUFuQixVQUFvQixJQUFhO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUNNLGlDQUFVLEdBQWpCLFVBQWtCLEdBQWU7UUFBakMsaUJBTUM7UUFMRyxpQkFBTSxVQUFVLFlBQUMsR0FBRyxDQUFDLENBQUE7UUFDckIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDWCxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FwQkEsQUFvQkMsQ0FwQjBCLGtCQUFRLEdBb0JsQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBFeHRyYWN0TW9kZWwgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvRXh0cmFjdE1vZGVsXCI7XHJcbmltcG9ydCBQb29sQmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29yZS90b29sL1Bvb2xCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB1bmlvbkJhbmRXaW4gZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBtb2RlbCA6IEV4dHJhY3RNb2RlbDtcclxuXHJcbiAgICBwcml2YXRlIG5hbWVFZGl0Qm94OiBjYy5FZGl0Qm94ID0gbnVsbDtcclxuICAgIHByaXZhdGUgYWNjb3VudEVkaXRCb3g6IGNjLkVkaXRCb3ggPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBiYW5rYnJhbmNoRWRpdEJveDogY2MuRWRpdEJveCA9IG51bGw7XHJcbiAgICBwcml2YXRlIG9wZW5CYW5rTGFiZWwgOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBwcml2YXRlIG9wZW5CYW5rVGlwTm9kZSA6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgb3BlblByb3ZpbmNlTGFiZWw6Y2MuTGFiZWwgPSBudWxsXHJcbiAgICBwcml2YXRlIG9wZW5Qcm92aW5jZVRpcE5vZGU6Y2MuTm9kZSA9IG51bGxcclxuXHJcbiAgICBwcml2YXRlIG9wZW5DaXR5TGFiZWw6Y2MuTGFiZWwgPSBudWxsXHJcbiAgICBwcml2YXRlIG9wZW5DaXR5VGlwTm9kZTpjYy5Ob2RlID0gbnVsbFxyXG5cclxuICAgIHB1YmxpYyBiYW5rbG9jYXRpb25JbmZvIDphbnkgPSBudWxsXHJcblxyXG4gICAgcHVibGljIHByb3ZpbmNlQ29kZTpudW1iZXIgPSAxMDAwMDBcclxuXHJcbiAgICBwcml2YXRlIGNob29zZUJhbmtWaWV3IDogQ2hvb3NlQmFua1ZpZXc7XHJcblxyXG4gICAgcHJpdmF0ZSBjaG9vc2VQcm92aW5jZVZpZXc6Q2hvb3NlUHJvdmluY2VWaWV3XHJcbiAgICBcclxuICAgIHByaXZhdGUgY2hvb3NlQ2l0eVZpZXc6Q2hvb3NlQ2l0eVZpZXdcclxuXHJcbiAgICBwcml2YXRlIGNpdHlCZzpjYy5TcHJpdGVcclxuXHJcbiAgICBwcml2YXRlIGJhbmtJbmZvOntba2V5Om51bWJlcl06YW55fSA9IHt9XHJcbiAgICBwcml2YXRlIGljb24gOiBjYy5Ob2RlO1xyXG5cclxuICAgIHByaXZhdGUgc3dpdGNoS2V5IDogYm9vbGVhbjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgaW5pdFZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSA8RXh0cmFjdE1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJFeHRyYWN0TW9kZWxcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5uYW1lRWRpdEJveCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiTmFtZUVkaXRCb3hcIixjYy5FZGl0Qm94KTtcclxuICAgICAgICB0aGlzLmFjY291bnRFZGl0Qm94ID0gdGhpcy5nZXRDb21wb25lbnQoXCJBY2NvdW50RWRpdEJveFwiLGNjLkVkaXRCb3gpO1xyXG4gICAgICAgIHRoaXMuYmFua2JyYW5jaEVkaXRCb3ggPSB0aGlzLmdldENvbXBvbmVudChcIkJhbmticmFuY2hFZGl0Qm94XCIsY2MuRWRpdEJveCk7XHJcblxyXG4gICAgICAgIHRoaXMub3BlbkJhbmtMYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiT3BlbmluZ2JhbmtCb3gvVEVYVF9MQUJFTFwiLGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLm9wZW5CYW5rVGlwTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJPcGVuaW5nYmFua0JveC9QTEFDRUhPTERFUl9MQUJFTFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5vcGVuUHJvdmluY2VMYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiYWRhcHQvUHJvdmluY2VFZGl0Qm94L1RFWFRfTEFCRUxcIixjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5vcGVuUHJvdmluY2VUaXBOb2RlID0gdGhpcy5nZXRDaGlsZChcImFkYXB0L1Byb3ZpbmNlRWRpdEJveC9QTEFDRUhPTERFUl9MQUJFTFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5vcGVuQ2l0eUxhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJhZGFwdC9DaXR5RWRpdEJveC9URVhUX0xBQkVMXCIsY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMub3BlbkNpdHlUaXBOb2RlID0gdGhpcy5nZXRDaGlsZChcImFkYXB0L0NpdHlFZGl0Qm94L1BMQUNFSE9MREVSX0xBQkVMXCIpO1xyXG5cclxuICAgICAgICB0aGlzLmNpdHlCZyA9IHRoaXMuZ2V0Q2hpbGQoXCJhZGFwdC9DaXR5RWRpdEJveC9CQUNLR1JPVU5EX1NQUklURVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5iYW5rbG9jYXRpb25JbmZvID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRSZXMoXCJoYWxsL2NvbmZpZy9sb2NhdGlvblwiLCBjYy5Kc29uQXNzZXQpLmpzb247XHJcbiAgICAgICAgdGhpcy5tb2RlbC5CYW5rTG9jYXRpb25JbmZvID0gdGhpcy5iYW5rbG9jYXRpb25JbmZvXHJcbiAgICAgICAgdGhpcy5pY29uID0gdGhpcy5nZXRDaGlsZChcIk9wZW5pbmdiYW5rQm94L1NlbGVjdEJyYW5jaFwiKTtcclxuICAgICAgICB0aGlzLmNob29zZUJhbmtWaWV3ID0gbmV3IENob29zZUJhbmtWaWV3KCk7XHJcbiAgICAgICAgdGhpcy5jaG9vc2VCYW5rVmlldy5vblNlbGVjdCA9IHRoaXMuc2VsZWN0QmFua0Z1bmMuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNob29zZUJhbmtWaWV3LnNldE5vZGUodGhpcy5nZXRDaGlsZChcImNob29zZUJhbmtcIikpO1xyXG4gICAgICAgIHRoaXMuY2hvb3NlQmFua1ZpZXcuc3ViVmlld1N0YXRlID0gZmFsc2U7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmNob29zZVByb3ZpbmNlVmlldyA9IG5ldyBDaG9vc2VQcm92aW5jZVZpZXcoKTtcclxuICAgICAgICB0aGlzLmNob29zZVByb3ZpbmNlVmlldy5vblNlbGVjdCA9IHRoaXMuc2VsZWN0QmFua0Z1bmMuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNob29zZVByb3ZpbmNlVmlldy5zZXROb2RlKHRoaXMuZ2V0Q2hpbGQoXCJjaG9vc2VQcm92aW5jZVwiKSk7XHJcbiAgICAgICAgdGhpcy5jaG9vc2VQcm92aW5jZVZpZXcuc3ViVmlld1N0YXRlID0gZmFsc2U7XHJcblxyXG5cclxuICAgICAgICB0aGlzLmNob29zZUNpdHlWaWV3ID0gbmV3IENob29zZUNpdHlWaWV3KCk7XHJcbiAgICAgICAgdGhpcy5jaG9vc2VDaXR5Vmlldy5vblNlbGVjdCA9IHRoaXMuc2VsZWN0QmFua0Z1bmMuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNob29zZUNpdHlWaWV3LnNldE5vZGUodGhpcy5nZXRDaGlsZChcImNob29zZUNpdHlcIikpO1xyXG4gICAgICAgIHRoaXMuY2hvb3NlQ2l0eVZpZXcuc3ViVmlld1N0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgLy8gdGhpcy5hZGRDb21tb25DbGljayhcImNob29zZUJhbmsvbWFza19idXR0b25cIix0aGlzLnN3aXRjaENob29zZUFyZWFWaWV3LHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnN3aXRjaEtleSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ2hvb3NlQXJlYVZpZXcoKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiT3BlbmluZ2JhbmtCb3hcIiwoKT0+eyB0aGlzLmNob29zZUJhbmtWaWV3Lm9uU3ViVmlld1Nob3coKX0sdGhpcyxudWxsKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYWRhcHQvUHJvdmluY2VFZGl0Qm94XCIsKCk9PnsgdGhpcy5jaG9vc2VQcm92aW5jZVZpZXcub25TdWJWaWV3U2hvdygpfSx0aGlzLG51bGwpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJhZGFwdC9DaXR5RWRpdEJveFwiLHRoaXMub3BlbkNpdHlWaWV3LHRoaXMsbnVsbCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJiYW5kQnRuXCIsdGhpcy5iYW5kQnRuRnVuYyx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRDaXR5Q29udGVudFN0YXRlKGZsYWc6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmNpdHlCZy5ub2RlLmNvbG9yID0gZmxhZz9jYy5jb2xvcigyNTUsMjU1LDI1NSwyNTUpOmNjLmNvbG9yKDE1MCwxNTAsMTUwLDE1MClcclxuICAgIH1cclxuXHJcbiAgICBvcGVuQ2l0eVZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMub3BlblByb3ZpbmNlTGFiZWwuc3RyaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jaG9vc2VDaXR5Vmlldy5vblN1YlZpZXdTaG93KClcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgIH1cclxuICAgXHJcblxyXG4gICAgcHVibGljIG9uU3ViVmlld1Nob3coKXtcclxuICAgICAgICB0aGlzLm9wZW5CYW5rTGFiZWwuc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB0aGlzLm9wZW5CYW5rVGlwTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuU2V0Q2l0eUNvbnRlbnRTdGF0ZShmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TdWJWaWV3SGlkZSgpe1xyXG4gICAgICAgIHRoaXMub3BlbkJhbmtMYWJlbC5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgdGhpcy5vcGVuQ2l0eUxhYmVsLnN0cmluZyA9IFwiXCJcclxuICAgICAgICB0aGlzLm9wZW5Qcm92aW5jZUxhYmVsLnN0cmluZyA9IFwiXCJcclxuICAgICAgICB0aGlzLnByb3ZpbmNlQ29kZSA9IDEwMDAwMFxyXG4gICAgICAgIHRoaXMubmFtZUVkaXRCb3guc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIHRoaXMuYWNjb3VudEVkaXRCb3guc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIHRoaXMuYmFua2JyYW5jaEVkaXRCb3guc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIHRoaXMub3BlbkJhbmtUaXBOb2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB0aGlzLm9wZW5DaXR5VGlwTm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5vcGVuUHJvdmluY2VUaXBOb2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAvLyB0aGlzLmNob29zZUJhbmtWaWV3LmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgLy8gdGhpcy5jaG9vc2VDaXR5Vmlldy5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIC8vIHRoaXMuY2hvb3NlUHJvdmluY2VWaWV3LmFjdGl2ZSA9IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ2hvb3NlQXJlYVZpZXcoKXtcclxuICAgICAgICB0aGlzLmNob29zZUJhbmtWaWV3LnN1YlZpZXdTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgLy8gdGhpcy5pY29uLnNjYWxlWSA9IHRoaXMuc3dpdGNoS2V5ID8gMSA6IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaENob29zZUFyZWFWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5jaG9vc2VCYW5rVmlldy5zdWJWaWV3U3RhdGUgPSB0cnVlXHJcbiAgICAgICAgLy90aGlzLm9wZW5CYW5rVGlwTm9kZS5hY3RpdmUgPXRydWVcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RCYW5rRnVuYygga2V5LGluZm8gKXtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5Td2l0Y2hMYWJlbFN0YXRlKGtleSxpbmZvKVxyXG4gICAgICAgIHRoaXMudXBkYXRlQ2hvb3NlQXJlYVZpZXcoKTtcclxuICAgIH1cclxuICAgIFN3aXRjaExhYmVsU3RhdGUoa2V5OiBCYW5rSW5mb1R5cGUsaW5mbzpzdHJpbmcpIHtcclxuICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICBjYXNlIEJhbmtJbmZvVHlwZS5CYW5rTmFtZTpcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkJhbmtMYWJlbC5zdHJpbmcgPSBpbmZvXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5CYW5rTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5CYW5rVGlwTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaG9vc2VCYW5rVmlldy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEJhbmtJbmZvVHlwZS5Qcm92aW5jZTpcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlblByb3ZpbmNlTGFiZWwuc3RyaW5nID0gaW5mb1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuUHJvdmluY2VMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlblByb3ZpbmNlVGlwTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaG9vc2VQcm92aW5jZVZpZXcuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5DaXR5TGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuQ2l0eVRpcE5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5TZXRDaXR5Q29udGVudFN0YXRlKHRydWUpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBCYW5rSW5mb1R5cGUuQ2l0eTpcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkNpdHlMYWJlbC5zdHJpbmcgPSBpbmZvXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5DaXR5TGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5DaXR5VGlwTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jaG9vc2VDaXR5Vmlldy5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tUZXh0RW1wdHlBbmRTaG93VGlwcyh0ZXh0OnN0cmluZywgdGlwc0xhYmVsOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBpZih0ZXh0Lmxlbmd0aCA8PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAodGlwc0xhYmVsKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+Wtl+espuS4suS4reaYr+WQpuWMheWQq+afkOS6m+eJueauiuWtl+esplxyXG4gICAgICogQHBhcmFtIHRleHQg6KaB5qOA5rWL55qE5a2X56ym5LiyXHJcbiAgICAgKiBAcGFyYW0gc3BlY2lhbFN0cmluZyDnibnmrorlrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSB0aXBzTGFiZWwg5qOA5rWL5aaC5p6c5YyF5ZCr5YiZdGlw5o+Q56S655qE5a2X56ym5LiyXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2hlY2tTcGVjaWFsQ2hhckFuZFNob3dUaXBzKHRleHQ6c3RyaW5nLCBzcGVjaWFsU3RyaW5nOnN0cmluZywgdGlwc0xhYmVsOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGMgPSB0ZXh0LmNoYXJBdChpKTtcclxuICAgICAgICAgICAgaWYgKHNwZWNpYWxTdHJpbmcuaW5kZXhPZihjKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcCh0aXBzTGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Y+R6YCB57uR5a6a5raI5oGvXHJcbiAgICBiYW5kQnRuRnVuYygpe1xyXG4gICAgICAgIGlmKCF0aGlzLmNoZWNrVGV4dEVtcHR5QW5kU2hvd1RpcHModGhpcy5hY2NvdW50RWRpdEJveC5zdHJpbmcsIFwi6ZO26KGM5Y2h5LiN6IO95Li656m6XCIpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYoIXRoaXMuY2hlY2tUZXh0RW1wdHlBbmRTaG93VGlwcyh0aGlzLm5hbWVFZGl0Qm94LnN0cmluZywgXCLlp5PlkI3kuI3og73kuLrnqbpcIikpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZighdGhpcy5jaGVja1RleHRFbXB0eUFuZFNob3dUaXBzKHRoaXMub3BlbkJhbmtMYWJlbC5zdHJpbmcsIFwi6K+36YCJ5oup5byA5oi36ZO26KGMXCIpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYoIXRoaXMuY2hlY2tUZXh0RW1wdHlBbmRTaG93VGlwcyh0aGlzLm9wZW5Qcm92aW5jZUxhYmVsLnN0cmluZywgXCLor7fpgInmi6nlvIDmiLfnnIHku71cIikpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZighdGhpcy5jaGVja1RleHRFbXB0eUFuZFNob3dUaXBzKHRoaXMub3BlbkNpdHlMYWJlbC5zdHJpbmcsIFwi6K+36YCJ5oup5byA5oi35Z+O5biCXCIpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYoIXRoaXMuY2hlY2tTcGVjaWFsQ2hhckFuZFNob3dUaXBzKHRoaXMuYWNjb3VudEVkaXRCb3guc3RyaW5nLCBcIiBcIiwgXCLotKblj7fkuK3mnInpnZ7ms5XlrZfnrKbvvIzor7fph43mlrDovpPlhaVcIikpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZighdGhpcy5jaGVja1RleHRFbXB0eUFuZFNob3dUaXBzKHRoaXMuYmFua2JyYW5jaEVkaXRCb3guc3RyaW5nLCBcIuW8gOaIt+aUr+ihjOS4jeiDveS4uuepulwiKSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRVbmlvbkJhbmRDb25maXJtXCIsdGhpcy5uYW1lRWRpdEJveC5zdHJpbmcsdGhpcy5hY2NvdW50RWRpdEJveC5zdHJpbmcsdGhpcy5iYW5rYnJhbmNoRWRpdEJveC5zdHJpbmcsdGhpcy5vcGVuQmFua0xhYmVsLnN0cmluZyx0aGlzLm9wZW5Qcm92aW5jZUxhYmVsLnN0cmluZ1xyXG4gICAgICAgICx0aGlzLm9wZW5DaXR5TGFiZWwuc3RyaW5nLHRoaXMubW9kZWwuZ2V0QmFua0Nva2UodGhpcy5vcGVuQmFua0xhYmVsLnN0cmluZyksKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGVudW0gQmFua0luZm9UeXBlXHJcbntcclxuICAgIEJhbmtOYW1lID0gMSxcclxuICAgIFByb3ZpbmNlID0gMixcclxuICAgIENpdHkgPSAzXHJcbn1cclxuXHJcbmNsYXNzIENob29zZUJhbmtWaWV3IGV4dGVuZHMgVmlld0Jhc2Vcclxue1xyXG4gICAgcHJvdGVjdGVkIG1vZGVsIDogRXh0cmFjdE1vZGVsO1xyXG4gICAgcHJvdGVjdGVkIGl0ZW06Y2MuTm9kZTtcclxuICAgIHByb3RlY3RlZCBjb250ZW50Um9vdDpjYy5Ob2RlO1xyXG4gICAgcHJvdGVjdGVkIHNjcm9sbDpjYy5TY3JvbGxWaWV3O1xyXG4gICAgcHJvdGVjdGVkIGl0ZW1MaXN0ID0gW107XHJcbiAgICBwcm90ZWN0ZWQgY29tZmlybUJ0bjpjYy5Ob2RlID0gbnVsbFxyXG5cclxuICAgIHByb3RlY3RlZCBkYXRhcyA6IGFueVtdO1xyXG4gICAgcHJvdGVjdGVkIGRhdGFJbmRleDpudW1iZXIgPSAwXHJcblxyXG4gICAgcHVibGljIG9uU2VsZWN0OkZ1bmN0aW9uXHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLml0ZW0gPSB0aGlzLmdldENoaWxkKFwic2Nyb2xsdmlldy92aWV3L2NvbnRlbnQvaXRlbVwiKTtcclxuICAgICAgICB0aGlzLml0ZW0uYWN0aXZlID1mYWxzZVxyXG4gICAgICAgIHRoaXMuY29udGVudFJvb3QgPSB0aGlzLmdldENoaWxkKFwic2Nyb2xsdmlldy92aWV3L2NvbnRlbnRcIik7XHJcbiAgICAgICAgdGhpcy5zY3JvbGwgPSB0aGlzLmdldENvbXBvbmVudChcInNjcm9sbHZpZXdcIiwgY2MuU2Nyb2xsVmlldyk7XHJcbiAgICAgICAgdGhpcy5jb21maXJtQnRuID0gdGhpcy5nZXRDaGlsZChcImJ0bkNvbWZpcm1cIilcclxuICAgICAgICB0aGlzLmNvbWZpcm1CdG4ub24oXCJjbGlja1wiLHRoaXMub25Db21maXJtQ2xpY2ssdGhpcylcclxuICAgICAgICB0aGlzLm1vZGVsID0gPEV4dHJhY3RNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiRXh0cmFjdE1vZGVsXCIpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJtYXNrXCIsICgpPT57IHRoaXMuYWN0aXZlID1mYWxzZSB9LCB0aGlzLCBudWxsKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0SXRlbXMoKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblN1YlZpZXdTaG93KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICB0aGlzLnNjcm9sbC5zY3JvbGxUb1RvcCgwKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkNvbWZpcm1DbGljaygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhc1t0aGlzLmRhdGFJbmRleF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZGF0YXNbdGhpcy5kYXRhSW5kZXhdO1xyXG4gICAgICAgICAgICBpZih0aGlzLm9uU2VsZWN0KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdChCYW5rSW5mb1R5cGUuQmFua05hbWUsaW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0SXRlbXMoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZGF0YXMgPSB0aGlzLm1vZGVsLmdldEJhbmtBcnJheSgpO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhcy5sZW5ndGg7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gdGhpcy5kYXRhc1tpXTtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW0pO1xyXG4gICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8qIGxldCBudW1MYWJlbCA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJiYW5rTmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICBudW1MYWJlbC5zdHJpbmcgPSBpbmZvOyAgKi9cclxuICAgICAgICAgICAgY2MuZmluZChcImNoZWNrVG9nZ2xlL0JhY2tncm91bmQvYmFua05hbWVcIixpdGVtKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGluZm87XHJcbiAgICAgICAgICAgIGNjLmZpbmQoXCJjaGVja1RvZ2dsZS9jaGVja21hcmsvYmFua05hbWVcIixpdGVtKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGluZm87XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFJvb3QuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIGxldCB0bXBJbmRleCA9IGlcclxuICAgICAgICAgICAgbGV0IHRvZ2dsZSA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJjaGVja1RvZ2dsZVwiKS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKVxyXG4gICAgICAgICAgICBpdGVtLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwoKT0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRvZ2dsZS5pc0NoZWNrZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uSXRlbUNsaWNrKHRtcEluZGV4KTtcclxuICAgICAgICAgICAgfSwgdGhpcylcclxuICAgICAgICAgICAgdGhpcy5pdGVtTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25JdGVtQ2xpY2soaW5kZXgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kYXRhSW5kZXggPSBpbmRleFxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuY2xhc3MgQ2hvb3NlUHJvdmluY2VWaWV3IGV4dGVuZHMgQ2hvb3NlQmFua1ZpZXdcclxue1xyXG5cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Db21maXJtQ2xpY2soKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YXNbdGhpcy5kYXRhSW5kZXhdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGluZm8gPSB0aGlzLmRhdGFzW3RoaXMuZGF0YUluZGV4XTtcclxuICAgICAgICAgICAgaWYodGhpcy5vblNlbGVjdClcclxuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QoQmFua0luZm9UeXBlLlByb3ZpbmNlLGluZm8ubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblN1YlZpZXdTaG93KClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vblN1YlZpZXdTaG93KClcclxuICAgICAgICB0aGlzLmRhdGFJbmRleCA9IHRoaXMubW9kZWwuRGVmYXV0UHJvdmluY2VDb2RlXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRJdGVtcygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kYXRhcyA9IHRoaXMubW9kZWwuQmFua0xvY2F0aW9uSW5mbztcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBpZCBpbiB0aGlzLmRhdGFzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFzLmhhc093blByb3BlcnR5KGlkKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpbmZvID0gdGhpcy5kYXRhc1tpZF0ubmFtZTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8qIGxldCBudW1MYWJlbCA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJiYW5rTmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgbnVtTGFiZWwuc3RyaW5nID0gaW5mbzsgKi9cclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJjaGVja1RvZ2dsZS9CYWNrZ3JvdW5kL2JhbmtOYW1lXCIsaXRlbSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpbmZvO1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcImNoZWNrVG9nZ2xlL2NoZWNrbWFyay9iYW5rTmFtZVwiLGl0ZW0pLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gaW5mbztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFJvb3QuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wSW5kZXggPSBpZFxyXG4gICAgICAgICAgICAgICAgbGV0IHRvZ2dsZSA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJjaGVja1RvZ2dsZVwiKS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKVxyXG4gICAgICAgICAgICAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGUuaXNDaGVja2VkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25JdGVtQ2xpY2sodG1wSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcylcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbUxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uSXRlbUNsaWNrKGluZGV4KVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uSXRlbUNsaWNrKGluZGV4KVxyXG4gICAgICAgIHRoaXMubW9kZWwuRGVmYXV0UHJvdmluY2VDb2RlID0gaW5kZXhcclxuICAgIH1cclxuXHJcbiAgIFxyXG59XHJcblxyXG5jbGFzcyBDaG9vc2VDaXR5VmlldyBleHRlbmRzIENob29zZUJhbmtWaWV3XHJcbntcclxuICAgIHByaXZhdGUgUHJvdmluY2VJbmRleDphbnk7XHJcbiAgICBwcml2YXRlIGl0ZW1UYWJsZSA9IFtdXHJcbiAgICBpdGVtUG9vbDogQ2l0eUl0ZW1Qb29sO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkNvbWZpcm1DbGljaygpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhc1t0aGlzLlByb3ZpbmNlSW5kZXhdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGluZm8gPSB0aGlzLmRhdGFzW3RoaXMuUHJvdmluY2VJbmRleF0uY2l0eVt0aGlzLmRhdGFJbmRleF07XHJcbiAgICAgICAgICAgIGlmKHRoaXMub25TZWxlY3QpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0KEJhbmtJbmZvVHlwZS5DaXR5LGluZm8ubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5pdGVtID0gdGhpcy5nZXRDaGlsZChcInNjcm9sbHZpZXcvdmlldy9jb250ZW50L2l0ZW1cIik7XHJcbiAgICAgICAgdGhpcy5pdGVtLmFjdGl2ZSA9ZmFsc2VcclxuICAgICAgICB0aGlzLmNvbnRlbnRSb290ID0gdGhpcy5nZXRDaGlsZChcInNjcm9sbHZpZXcvdmlldy9jb250ZW50XCIpO1xyXG4gICAgICAgIHRoaXMuc2Nyb2xsID0gdGhpcy5nZXRDb21wb25lbnQoXCJzY3JvbGx2aWV3XCIsIGNjLlNjcm9sbFZpZXcpO1xyXG4gICAgICAgIHRoaXMuY29tZmlybUJ0biA9IHRoaXMuZ2V0Q2hpbGQoXCJidG5Db21maXJtXCIpXHJcbiAgICAgICAgdGhpcy5jb21maXJtQnRuLm9uKFwiY2xpY2tcIix0aGlzLm9uQ29tZmlybUNsaWNrLHRoaXMpXHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxFeHRyYWN0TW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIkV4dHJhY3RNb2RlbFwiKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwibWFza1wiLCAoKT0+eyB0aGlzLmFjdGl2ZSA9ZmFsc2UgfSwgdGhpcywgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5pbml0SXRlbVBvb2woKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgaW5pdEl0ZW1Qb29sKCkge1xyXG5cclxuICAgICAgICB0aGlzLml0ZW1Qb29sID0gbmV3IENpdHlJdGVtUG9vbCh0aGlzLml0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblN1YlZpZXdTaG93KGFyZ3M/KVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uU3ViVmlld1Nob3coKVxyXG4gICAgICAgIHRoaXMuUHJvdmluY2VJbmRleCA9IHRoaXMubW9kZWwuRGVmYXV0UHJvdmluY2VDb2RlXHJcbiAgICAgICAgdGhpcy5kYXRhSW5kZXggPSBwYXJzZUludCh0aGlzLm1vZGVsLkdldERlZmF1dENpdHlDb2RlKHRoaXMuUHJvdmluY2VJbmRleCksMTApXHJcbiAgICAgICAgdGhpcy5pbml0SXRlbXMoKVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld0hpZGUoKVxyXG4gICAge1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGluaXRJdGVtcygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5yZWN5Y2xlKClcclxuICAgICAgICB0aGlzLmRhdGFzID0gdGhpcy5tb2RlbC5CYW5rTG9jYXRpb25JbmZvO1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGFzLmhhc093blByb3BlcnR5KHRoaXMuUHJvdmluY2VJbmRleCkpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBpZCBpbiB0aGlzLmRhdGFzW3RoaXMuUHJvdmluY2VJbmRleF0uY2l0eSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZm8gPSB0aGlzLmRhdGFzW3RoaXMuUHJvdmluY2VJbmRleF0uY2l0eVtpZF0ubmFtZTtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5pdGVtUG9vbC5nZXRJdGVtKClcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8qIGxldCBudW1MYWJlbCA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJiYW5rTmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICAgICAgbnVtTGFiZWwuc3RyaW5nID0gaW5mbzsgKi9cclxuICAgICAgICAgICAgICAgIGNjLmZpbmQoXCJjaGVja1RvZ2dsZS9CYWNrZ3JvdW5kL2JhbmtOYW1lXCIsaXRlbSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBpbmZvO1xyXG4gICAgICAgICAgICAgICAgY2MuZmluZChcImNoZWNrVG9nZ2xlL2NoZWNrbWFyay9iYW5rTmFtZVwiLGl0ZW0pLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gaW5mbztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFJvb3QuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG1wSW5kZXggPSBpZFxyXG4gICAgICAgICAgICAgICAgbGV0IHRvZ2dsZSA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJjaGVja1RvZ2dsZVwiKS5nZXRDb21wb25lbnQoY2MuVG9nZ2xlKVxyXG4gICAgICAgICAgICAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGUuaXNDaGVja2VkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25JdGVtQ2xpY2sodG1wSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcylcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRhYmxlLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyByZWN5Y2xlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLml0ZW1Qb29sLnJlY3ljbGVBbGwodGhpcy5pdGVtVGFibGUpO1xyXG4gICAgICAgIHRoaXMuaXRlbVRhYmxlID0gW107XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25EaXNwb3NlKCkge1xyXG5cclxuICAgICAgICB0aGlzLml0ZW1Qb29sLnJlc2V0UG9vbCgpO1xyXG4gICAgICAgIHRoaXMuaXRlbVRhYmxlID0gW107XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgQ2l0eUl0ZW1Qb29sIGV4dGVuZHMgUG9vbEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb3B5Tm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUl0ZW0oKSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLmluc3RhbnRpYXRlKHRoaXMuY29weU5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCByZXNldEl0ZW0obm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbm9kZS5zZXRQYXJlbnQobnVsbClcclxuICAgIH1cclxuICAgIHB1YmxpYyByZWN5Y2xlQWxsKGFycjogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIHN1cGVyLnJlY3ljbGVBbGwoYXJyKVxyXG4gICAgICAgIGFyci5mb3JFYWNoKGVsZSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRJdGVtKGVsZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==