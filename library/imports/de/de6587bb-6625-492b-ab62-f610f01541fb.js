"use strict";
cc._RF.push(module, 'de658e7ZiVJK6ti9hDwFUH7', 'PhoneInputView');
// hall/scripts/logic/hall/ui/login/view/PhoneInputView.ts

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
var ViewBase_1 = require("../../../../core/ui/ViewBase");
var listview_1 = require("../../../../../listview");
var PhoneInputView = /** @class */ (function (_super) {
    __extends(PhoneInputView, _super);
    function PhoneInputView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showAreaView = false;
        return _this;
    }
    PhoneInputView.prototype.initView = function () {
        this.codeIcon = this.getComponent("codeIcon", cc.Sprite);
        this.phoneInput = this.getComponent("phone", cc.EditBox);
        this.areaInput = this.getComponent("area", cc.EditBox);
        this.countryLabel = this.getComponent("countryName", cc.Label);
        // this.addCommonClick("bg4", this.onCodeIconClick, this, null);
        // this.addCommonClick("codeIcon", this.onCodeIconClick, this, null);
        // this.addCommonClick("chooseAreaView/mask", this.onCodeIconClick, this, null);
        this.chooseCountryView = new ChooseCountryView();
        this.chooseCountryView.onSelect = this.selectCountry.bind(this);
        this.chooseCountryView.setNode(this.getChild("chooseAreaView"));
        this.chooseCountryView.subViewState = false;
        this.areaInput.node.on("editing-did-ended", this.onAreaEditEnd, this);
    };
    PhoneInputView.prototype.onAreaEditEnd = function () {
        this.countryLabel.string = this.chooseCountryView.searchArea(this.areaInput.string);
    };
    PhoneInputView.prototype.onCodeIconClick = function () {
        this.showAreaView = !this.showAreaView;
        this.updateCodeState();
    };
    PhoneInputView.prototype.updateCodeState = function () {
        this.chooseCountryView.active = this.showAreaView;
        this.codeIcon.node.angle = this.showAreaView ? -180 : 0;
    };
    PhoneInputView.prototype.selectCountry = function (code, name) {
        this.areaInput.string = code;
        this.countryLabel.string = name;
        this.onCodeIconClick();
    };
    Object.defineProperty(PhoneInputView.prototype, "phone", {
        get: function () {
            return this.phoneInput.string;
        },
        set: function (value) {
            this.phoneInput.string = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PhoneInputView.prototype, "area", {
        get: function () {
            return this.areaInput.string;
        },
        set: function (value) {
            this.areaInput.string = value;
            this.countryLabel.string = this.chooseCountryView.searchArea(value);
        },
        enumerable: false,
        configurable: true
    });
    PhoneInputView.prototype.onSubViewShow = function () {
        this.chooseCountryView.onSubViewShow();
        this.showAreaView = false;
        this.updateCodeState();
    };
    PhoneInputView.prototype.isAreaVaild = function () {
        return this.chooseCountryView.isAreaVaild(this.area);
    };
    return PhoneInputView;
}(ViewBase_1.default));
exports.default = PhoneInputView;
var ChooseCountryView = /** @class */ (function (_super) {
    __extends(ChooseCountryView, _super);
    function ChooseCountryView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemList = [];
        return _this;
    }
    ChooseCountryView.prototype.initView = function () {
        var _this = this;
        this.item = this.getChild("scroll/view/content/item");
        this.contentRoot = this.getChild("scroll/view/content");
        this.item.active = false;
        this.scroll = this.getComponent("scroll", cc.ScrollView);
        this.countryCfg = Global.ResourceManager.getRes("hall/config/countrycode", cc.JsonAsset).json;
        var listParam = {};
        listParam.scrollview = this.scroll;
        listParam.mask = this.getChild("scroll/view");
        listParam.content = this.getChild("scroll/view/content");
        listParam.item_tpl = this.getChild("scroll/view/content/item");
        listParam.direction = 1;
        listParam.item_setter = function (item, data, index) {
            var info = _this.countryCfg[index];
            var numLabel = item.getChildByName("code").getComponent(cc.Label);
            var countryLabel = item.getChildByName("country").getComponent(cc.Label);
            numLabel.string = info.phone_code;
            countryLabel.string = info.cn;
        };
        listParam.select_cb = function (data, index) {
            var info = _this.countryCfg[index];
            if (_this.onSelect)
                _this.onSelect(info.phone_code.replace("+", ""), info.cn);
        };
        this.listView = new listview_1.ListView(listParam);
        this.listView.set_data(this.countryCfg);
        // this.contentRoot.height = this.item.height * this.countryCfg.length;
        // this.initItems()
    };
    ChooseCountryView.prototype.onSubViewShow = function () {
        this.scroll.scrollToTop(0);
        this.listView.set_data(this.countryCfg);
    };
    ChooseCountryView.prototype.initItems = function () {
        var _this = this;
        var _loop_1 = function (i) {
            var info = this_1.countryCfg[i];
            var item = cc.instantiate(this_1.item);
            item.active = true;
            var numLabel = item.getChildByName("code").getComponent(cc.Label);
            var countryLabel = item.getChildByName("country").getComponent(cc.Label);
            numLabel.string = info.phone_code;
            countryLabel.string = info.cn;
            this_1.contentRoot.addChild(item);
            var tmpIndex = i;
            item.on(cc.Node.EventType.TOUCH_END, function () {
                _this.onItemClick(tmpIndex);
            }, this_1);
            this_1.itemList.push(item);
        };
        var this_1 = this;
        for (var i = 0; i < this.countryCfg.length; i++) {
            _loop_1(i);
        }
    };
    ChooseCountryView.prototype.onItemClick = function (index) {
        if (this.countryCfg[index]) {
            var info = this.countryCfg[index];
            if (this.onSelect)
                this.onSelect(info.phone_code.replace("+", ""), info.cn);
        }
    };
    ChooseCountryView.prototype.searchArea = function (areacode) {
        if (areacode == "")
            return "请从列表中选择";
        var code = "+" + areacode;
        for (var i = 0; i < this.countryCfg.length; i++) {
            if (this.countryCfg[i].phone_code == code) {
                return this.countryCfg[i].cn;
            }
        }
        return "国家/地区代码无效";
    };
    ChooseCountryView.prototype.isAreaVaild = function (areacode) {
        if (areacode == "")
            return false;
        var code = "+" + areacode;
        for (var i = 0; i < this.countryCfg.length; i++) {
            if (this.countryCfg[i].phone_code == code) {
                return true;
            }
        }
        return false;
    };
    return ChooseCountryView;
}(ViewBase_1.default));

cc._RF.pop();