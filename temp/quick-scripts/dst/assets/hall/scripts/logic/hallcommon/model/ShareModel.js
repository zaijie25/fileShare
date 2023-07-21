
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/ShareModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e42fbK1tkVKoqtE6H5zJkMp', 'ShareModel');
// hall/scripts/logic/hallcommon/model/ShareModel.ts

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
var ShareModel = /** @class */ (function (_super) {
    __extends(ShareModel, _super);
    function ShareModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._ShareMoney = 0;
        return _this;
    }
    Object.defineProperty(ShareModel.prototype, "ShareMoney", {
        get: function () {
            return this._ShareMoney;
        },
        set: function (num) {
            this._ShareMoney = num;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShareModel.prototype, "Name", {
        get: function () {
            return "ShareModel";
        },
        enumerable: false,
        configurable: true
    });
    ShareModel.prototype.initData = function (data) {
        this.ShareMoney = data;
    };
    return ShareModel;
}(ModelBase_1.default));
exports.default = ShareModel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxTaGFyZU1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUEyRDtBQUUzRDtJQUF3Qyw4QkFBUztJQUFqRDtRQUFBLHFFQXNCQztRQXJCVyxpQkFBVyxHQUFVLENBQUMsQ0FBQTs7SUFxQmxDLENBQUM7SUFuQkcsc0JBQVcsa0NBQVU7YUFLckI7WUFFSSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUE7UUFDM0IsQ0FBQzthQVJELFVBQXNCLEdBQVU7WUFFNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUE7UUFDMUIsQ0FBQzs7O09BQUE7SUFPRCxzQkFBVyw0QkFBSTthQUFmO1lBRUksT0FBTyxZQUFZLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFTSw2QkFBUSxHQUFmLFVBQWdCLElBQUk7UUFFaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUE7SUFDMUIsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0F0QkEsQUFzQkMsQ0F0QnVDLG1CQUFTLEdBc0JoRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNb2RlbEJhc2UgZnJvbSBcIi4uLy4uLy4uL2ZyYW1ld29yay9tb2RlbC9Nb2RlbEJhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXJlTW9kZWwgZXh0ZW5kcyBNb2RlbEJhc2V7XHJcbiAgICBwcml2YXRlIF9TaGFyZU1vbmV5Om51bWJlciA9IDBcclxuXHJcbiAgICBwdWJsaWMgc2V0IFNoYXJlTW9uZXkobnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9TaGFyZU1vbmV5ID0gbnVtXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBTaGFyZU1vbmV5KClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fU2hhcmVNb25leVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgTmFtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiU2hhcmVNb2RlbFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0RGF0YShkYXRhKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU2hhcmVNb25leSA9IGRhdGFcclxuICAgIH1cclxufSJdfQ==