"use strict";
cc._RF.push(module, '74682f05n9PhZZ2r45dmzpW', 'SettingData');
// hall/scripts/logic/core/setting/SettingData.ts

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
var BaseSettingData_1 = require("../../../framework/setting/BaseSettingData");
var SettingData = /** @class */ (function (_super) {
    __extends(SettingData, _super);
    function SettingData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SettingData;
}(BaseSettingData_1.default));
exports.default = SettingData;

cc._RF.pop();