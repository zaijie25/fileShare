
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/BindingGiftModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '85ebf5y/WxCI483LlOludth', 'BindingGiftModel');
// hall/scripts/logic/hallcommon/model/BindingGiftModel.ts

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
var ModelBase_1 = require("../../../framework/model/ModelBase");
var BindingGiftModel = /** @class */ (function (_super) {
    __extends(BindingGiftModel, _super);
    function BindingGiftModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._BindAwardNum = 0;
        return _this;
    }
    BindingGiftModel.prototype.onInit = function () {
    };
    Object.defineProperty(BindingGiftModel.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BindingGiftModel.prototype, "Status", {
        get: function () {
            return this._Status;
        },
        enumerable: false,
        configurable: true
    });
    BindingGiftModel.prototype.SetStatus = function (status) {
        this._Status = status;
    };
    Object.defineProperty(BindingGiftModel.prototype, "BindAwardNum", {
        get: function () {
            return this._BindAwardNum;
        },
        set: function (num) {
            this._BindAwardNum = num;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BindingGiftModel.prototype, "Name", {
        get: function () {
            return "BindingGiftModel";
        },
        enumerable: false,
        configurable: true
    });
    BindingGiftModel.prototype.clear = function () {
        this.SetStatus(false);
    };
    return BindingGiftModel;
}(ModelBase_1.default));
exports.default = BindingGiftModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxCaW5kaW5nR2lmdE1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUEyRDtBQUkzRDtJQUE4QyxvQ0FBUztJQUF2RDtRQUFBLHFFQXlDQztRQTlCVyxtQkFBYSxHQUFVLENBQUMsQ0FBQTs7SUE4QnBDLENBQUM7SUF4Q2EsaUNBQU0sR0FBaEI7SUFFQSxDQUFDO0lBRUQsc0JBQVcsa0NBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtRQUNyQixDQUFDOzs7T0FBQTtJQUtELHNCQUFXLG9DQUFNO2FBQWpCO1lBRUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQ3ZCLENBQUM7OztPQUFBO0lBRU0sb0NBQVMsR0FBaEIsVUFBaUIsTUFBTTtRQUVuQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTtJQUN6QixDQUFDO0lBRUQsc0JBQVcsMENBQVk7YUFLdkI7WUFFSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUE7UUFDN0IsQ0FBQzthQVJELFVBQXdCLEdBQVU7WUFFOUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUE7UUFDNUIsQ0FBQzs7O09BQUE7SUFPRCxzQkFBVyxrQ0FBSTthQUFmO1lBRUksT0FBTyxrQkFBa0IsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUVNLGdDQUFLLEdBQVo7UUFFSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3pCLENBQUM7SUFDTCx1QkFBQztBQUFELENBekNBLEFBeUNDLENBekM2QyxtQkFBUyxHQXlDdEQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kZWxCYXNlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbW9kZWwvTW9kZWxCYXNlXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJpbmRpbmdHaWZ0TW9kZWwgZXh0ZW5kcyBNb2RlbEJhc2V7XHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCl7XHJcblxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfZGF0YTogYW55O1xyXG4gICAgcHVibGljIGdldCBkYXRhKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9TdGF0dXM6Ym9vbGVhbiBcclxuXHJcbiAgICBwcml2YXRlIF9CaW5kQXdhcmROdW06bnVtYmVyID0gMFxyXG4gICAgcHVibGljIGdldCBTdGF0dXMoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9TdGF0dXNcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0U3RhdHVzKHN0YXR1cylcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9TdGF0dXMgPSBzdGF0dXNcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IEJpbmRBd2FyZE51bShudW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0JpbmRBd2FyZE51bSA9IG51bVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgQmluZEF3YXJkTnVtKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQmluZEF3YXJkTnVtXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBOYW1lKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJCaW5kaW5nR2lmdE1vZGVsXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBjbGVhcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TZXRTdGF0dXMoZmFsc2UpXHJcbiAgICB9XHJcbn0iXX0=