"use strict";
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