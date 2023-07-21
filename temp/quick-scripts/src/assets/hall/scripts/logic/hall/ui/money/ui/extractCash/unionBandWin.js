"use strict";
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