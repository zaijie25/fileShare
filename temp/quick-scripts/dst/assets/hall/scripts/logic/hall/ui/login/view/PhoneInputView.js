
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/login/view/PhoneInputView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxsb2dpblxcdmlld1xcUGhvbmVJbnB1dFZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQW9EO0FBQ3BELG9EQUFtRDtBQUNuRDtJQUE0QyxrQ0FBUTtJQUFwRDtRQUFBLHFFQXlGQztRQWhGVyxrQkFBWSxHQUFHLEtBQUssQ0FBQzs7SUFnRmpDLENBQUM7SUEzRWEsaUNBQVEsR0FBbEI7UUFFSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvRCxnRUFBZ0U7UUFDaEUscUVBQXFFO1FBQ3JFLGdGQUFnRjtRQUNoRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUU1QyxJ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Q0FBQyxFQUFFLENBQUM7YUFDaEM7U0FDSjtRQUNELE9BQU8sV0FBVyxDQUFBO0lBQ3RCLENBQUM7SUFFTSx1Q0FBVyxHQUFsQixVQUFtQixRQUFRO1FBRXZCLElBQUcsUUFBUSxJQUFJLEVBQUU7WUFDYixPQUFPLEtBQUssQ0FBQztRQUNqQixJQUFJLElBQUksR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDO1FBQzFCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFDOUM7WUFDSSxJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLElBQUksRUFDeEM7Z0JBQ0ksT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQUlMLHdCQUFDO0FBQUQsQ0F4SEEsQUF3SEMsQ0F4SCtCLGtCQUFRLEdBd0h2QyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9saXN0dmlld1wiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaG9uZUlucHV0VmlldyBleHRlbmRzIFZpZXdCYXNlXHJcbntcclxuXHJcbiAgICBwcml2YXRlIGFyZWFJbnB1dDpjYy5FZGl0Qm94O1xyXG4gICAgcHJpdmF0ZSBjb2RlSWNvbjpjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIHBob25lSW5wdXQ6Y2MuRWRpdEJveDtcclxuXHJcbiAgICBwcml2YXRlIGNvdW50cnlMYWJlbDpjYy5MYWJlbDtcclxuXHJcbiAgICBwcml2YXRlIHNob3dBcmVhVmlldyA9IGZhbHNlO1xyXG5cclxuICAgIHByaXZhdGUgY2hvb3NlQ291bnRyeVZpZXc6Q2hvb3NlQ291bnRyeVZpZXc7XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jb2RlSWNvbiA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiY29kZUljb25cIiwgY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLnBob25lSW5wdXQgPSB0aGlzLmdldENvbXBvbmVudChcInBob25lXCIsIGNjLkVkaXRCb3gpO1xyXG4gICAgICAgIHRoaXMuYXJlYUlucHV0ID0gdGhpcy5nZXRDb21wb25lbnQoXCJhcmVhXCIsIGNjLkVkaXRCb3gpO1xyXG4gICAgICAgIHRoaXMuY291bnRyeUxhYmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJjb3VudHJ5TmFtZVwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgLy8gdGhpcy5hZGRDb21tb25DbGljayhcImJnNFwiLCB0aGlzLm9uQ29kZUljb25DbGljaywgdGhpcywgbnVsbCk7XHJcbiAgICAgICAgLy8gdGhpcy5hZGRDb21tb25DbGljayhcImNvZGVJY29uXCIsIHRoaXMub25Db2RlSWNvbkNsaWNrLCB0aGlzLCBudWxsKTtcclxuICAgICAgICAvLyB0aGlzLmFkZENvbW1vbkNsaWNrKFwiY2hvb3NlQXJlYVZpZXcvbWFza1wiLCB0aGlzLm9uQ29kZUljb25DbGljaywgdGhpcywgbnVsbCk7XHJcbiAgICAgICAgdGhpcy5jaG9vc2VDb3VudHJ5VmlldyA9IG5ldyBDaG9vc2VDb3VudHJ5VmlldygpO1xyXG4gICAgICAgIHRoaXMuY2hvb3NlQ291bnRyeVZpZXcub25TZWxlY3QgPSB0aGlzLnNlbGVjdENvdW50cnkuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmNob29zZUNvdW50cnlWaWV3LnNldE5vZGUodGhpcy5nZXRDaGlsZChcImNob29zZUFyZWFWaWV3XCIpKTtcclxuICAgICAgICB0aGlzLmNob29zZUNvdW50cnlWaWV3LnN1YlZpZXdTdGF0ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmFyZWFJbnB1dC5ub2RlLm9uKFwiZWRpdGluZy1kaWQtZW5kZWRcIiwgdGhpcy5vbkFyZWFFZGl0RW5kLCB0aGlzKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIG9uQXJlYUVkaXRFbmQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY291bnRyeUxhYmVsLnN0cmluZyA9IHRoaXMuY2hvb3NlQ291bnRyeVZpZXcuc2VhcmNoQXJlYSh0aGlzLmFyZWFJbnB1dC5zdHJpbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Db2RlSWNvbkNsaWNrKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNob3dBcmVhVmlldyA9ICF0aGlzLnNob3dBcmVhVmlldztcclxuICAgICAgICB0aGlzLnVwZGF0ZUNvZGVTdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlQ29kZVN0YXRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNob29zZUNvdW50cnlWaWV3LmFjdGl2ZSA9IHRoaXMuc2hvd0FyZWFWaWV3O1xyXG4gICAgICAgIHRoaXMuY29kZUljb24ubm9kZS5hbmdsZSA9IHRoaXMuc2hvd0FyZWFWaWV3ID8gLTE4MCA6IDBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbGVjdENvdW50cnkoY29kZSwgbmFtZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFyZWFJbnB1dC5zdHJpbmcgPSBjb2RlO1xyXG4gICAgICAgIHRoaXMuY291bnRyeUxhYmVsLnN0cmluZyA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5vbkNvZGVJY29uQ2xpY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHBob25lKHZhbHVlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucGhvbmVJbnB1dC5zdHJpbmcgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHBob25lKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waG9uZUlucHV0LnN0cmluZztcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHNldCBhcmVhKHZhbHVlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYXJlYUlucHV0LnN0cmluZyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuY291bnRyeUxhYmVsLnN0cmluZyA9IHRoaXMuY2hvb3NlQ291bnRyeVZpZXcuc2VhcmNoQXJlYSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGFyZWEoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFyZWFJbnB1dC5zdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld1Nob3coKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hvb3NlQ291bnRyeVZpZXcub25TdWJWaWV3U2hvdygpO1xyXG4gICAgICAgIHRoaXMuc2hvd0FyZWFWaWV3ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb2RlU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNBcmVhVmFpbGQoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNob29zZUNvdW50cnlWaWV3LmlzQXJlYVZhaWxkKHRoaXMuYXJlYSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBDaG9vc2VDb3VudHJ5VmlldyBleHRlbmRzIFZpZXdCYXNlXHJcbntcclxuICAgIHByaXZhdGUgaXRlbTpjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBjb250ZW50Um9vdDpjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBzY3JvbGw6Y2MuU2Nyb2xsVmlldztcclxuICAgIHByaXZhdGUgaXRlbUxpc3QgPSBbXTtcclxuICAgIHByaXZhdGUgY291bnRyeUNmZzphbnlcclxuICAgIHByaXZhdGUgbGlzdFZpZXc6TGlzdFZpZXc7XHJcblxyXG4gICAgcHVibGljIG9uU2VsZWN0OkZ1bmN0aW9uXHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLml0ZW0gPSB0aGlzLmdldENoaWxkKFwic2Nyb2xsL3ZpZXcvY29udGVudC9pdGVtXCIpO1xyXG4gICAgICAgIHRoaXMuY29udGVudFJvb3QgPSB0aGlzLmdldENoaWxkKFwic2Nyb2xsL3ZpZXcvY29udGVudFwiKTtcclxuICAgICAgICB0aGlzLml0ZW0uYWN0aXZlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuc2Nyb2xsID0gdGhpcy5nZXRDb21wb25lbnQoXCJzY3JvbGxcIiwgY2MuU2Nyb2xsVmlldyk7XHJcblxyXG4gICAgICAgIHRoaXMuY291bnRyeUNmZyA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0UmVzKFwiaGFsbC9jb25maWcvY291bnRyeWNvZGVcIiwgY2MuSnNvbkFzc2V0KS5qc29uO1xyXG5cclxuICAgICAgICBsZXQgbGlzdFBhcmFtOmFueSA9IHt9XHJcbiAgICAgICAgbGlzdFBhcmFtLnNjcm9sbHZpZXcgPSB0aGlzLnNjcm9sbDtcclxuICAgICAgICBsaXN0UGFyYW0ubWFzayAgPSB0aGlzLmdldENoaWxkKFwic2Nyb2xsL3ZpZXdcIik7XHJcbiAgICAgICAgbGlzdFBhcmFtLmNvbnRlbnQgPSB0aGlzLmdldENoaWxkKFwic2Nyb2xsL3ZpZXcvY29udGVudFwiKTtcclxuICAgICAgICBsaXN0UGFyYW0uaXRlbV90cGwgPSB0aGlzLmdldENoaWxkKFwic2Nyb2xsL3ZpZXcvY29udGVudC9pdGVtXCIpO1xyXG4gICAgICAgIGxpc3RQYXJhbS5kaXJlY3Rpb24gPSAxO1xyXG4gICAgICAgIGxpc3RQYXJhbS5pdGVtX3NldHRlciA9IChpdGVtLCBkYXRhLCBpbmRleCkgPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gdGhpcy5jb3VudHJ5Q2ZnW2luZGV4XTtcclxuICAgICAgICAgICAgbGV0IG51bUxhYmVsID0gaXRlbS5nZXRDaGlsZEJ5TmFtZShcImNvZGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgbGV0IGNvdW50cnlMYWJlbCA9IGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJjb3VudHJ5XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIG51bUxhYmVsLnN0cmluZyA9IGluZm8ucGhvbmVfY29kZTsgXHJcbiAgICAgICAgICAgIGNvdW50cnlMYWJlbC5zdHJpbmcgPSBpbmZvLmNuO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpc3RQYXJhbS5zZWxlY3RfY2IgPSAoZGF0YSwgaW5kZXgpPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gdGhpcy5jb3VudHJ5Q2ZnW2luZGV4XTtcclxuICAgICAgICAgICAgaWYodGhpcy5vblNlbGVjdClcclxuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QoaW5mby5waG9uZV9jb2RlLnJlcGxhY2UoXCIrXCIsIFwiXCIpLCBpbmZvLmNuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5saXN0VmlldyA9IG5ldyBMaXN0VmlldyhsaXN0UGFyYW0pO1xyXG4gICAgICAgIHRoaXMubGlzdFZpZXcuc2V0X2RhdGEodGhpcy5jb3VudHJ5Q2ZnKTtcclxuXHJcblxyXG4gICAgICAgIC8vIHRoaXMuY29udGVudFJvb3QuaGVpZ2h0ID0gdGhpcy5pdGVtLmhlaWdodCAqIHRoaXMuY291bnRyeUNmZy5sZW5ndGg7XHJcbiAgICAgICAgLy8gdGhpcy5pbml0SXRlbXMoKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TdWJWaWV3U2hvdygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zY3JvbGwuc2Nyb2xsVG9Ub3AoMCk7XHJcbiAgICAgICAgdGhpcy5saXN0Vmlldy5zZXRfZGF0YSh0aGlzLmNvdW50cnlDZmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdEl0ZW1zKClcclxuICAgIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jb3VudHJ5Q2ZnLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGluZm8gPSB0aGlzLmNvdW50cnlDZmdbaV07XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtKTtcclxuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgbnVtTGFiZWwgPSBpdGVtLmdldENoaWxkQnlOYW1lKFwiY29kZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgICAgICBsZXQgY291bnRyeUxhYmVsID0gaXRlbS5nZXRDaGlsZEJ5TmFtZShcImNvdW50cnlcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgbnVtTGFiZWwuc3RyaW5nID0gaW5mby5waG9uZV9jb2RlOyBcclxuICAgICAgICAgICAgY291bnRyeUxhYmVsLnN0cmluZyA9IGluZm8uY247XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudFJvb3QuYWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgICAgIGxldCB0bXBJbmRleCA9IGlcclxuICAgICAgICAgICAgaXRlbS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsKCk9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uSXRlbUNsaWNrKHRtcEluZGV4KTtcclxuICAgICAgICAgICAgfSwgdGhpcylcclxuICAgICAgICAgICAgdGhpcy5pdGVtTGlzdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uSXRlbUNsaWNrKGluZGV4KVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuY291bnRyeUNmZ1tpbmRleF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgaW5mbyA9IHRoaXMuY291bnRyeUNmZ1tpbmRleF07XHJcbiAgICAgICAgICAgIGlmKHRoaXMub25TZWxlY3QpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2VsZWN0KGluZm8ucGhvbmVfY29kZS5yZXBsYWNlKFwiK1wiLCBcIlwiKSwgaW5mby5jbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWFyY2hBcmVhKGFyZWFjb2RlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGFyZWFjb2RlID09IFwiXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBcIuivt+S7juWIl+ihqOS4remAieaLqVwiO1xyXG4gICAgICAgIGxldCBjb2RlID0gXCIrXCIgKyBhcmVhY29kZTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jb3VudHJ5Q2ZnLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5jb3VudHJ5Q2ZnW2ldLnBob25lX2NvZGUgPT0gY29kZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY291bnRyeUNmZ1tpXS5jbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCLlm73lrrYv5Zyw5Yy65Luj56CB5peg5pWIXCJcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNBcmVhVmFpbGQoYXJlYWNvZGUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoYXJlYWNvZGUgPT0gXCJcIilcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGxldCBjb2RlID0gXCIrXCIgKyBhcmVhY29kZTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5jb3VudHJ5Q2ZnLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5jb3VudHJ5Q2ZnW2ldLnBob25lX2NvZGUgPT0gY29kZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iXX0=