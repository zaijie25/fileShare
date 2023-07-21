"use strict";
cc._RF.push(module, '6588blu2QJJeptsilaITQNN', 'BaseSetting');
// hall/scripts/framework/setting/BaseSetting.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Storage_1 = require("./Storage");
var BaseSettingData_1 = require("./BaseSettingData");
//开关  + 本地存储 + app配置
var BaseSetting = /** @class */ (function () {
    function BaseSetting() {
        this.storage = new Storage_1.default;
    }
    BaseSetting.prototype.setup = function () {
        this.settingData = new BaseSettingData_1.default();
        this.settingData.setup(this.storage);
    };
    return BaseSetting;
}());
exports.default = BaseSetting;

cc._RF.pop();