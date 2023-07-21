"use strict";
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