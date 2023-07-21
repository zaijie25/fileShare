"use strict";
cc._RF.push(module, '1b7491tuf5PF6yueyiQpLkw', 'DdzSkinDefine');
// ddz/ddz/scripts/data/DdzSkinDefine.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DdzPathHelper_1 = require("./DdzPathHelper");
var DdzSkinDefine = /** @class */ (function () {
    function DdzSkinDefine(jsonMap) {
        if (jsonMap === void 0) { jsonMap = {}; }
        this.jsonMap = jsonMap;
        /**
         * 皮肤ID
         */
        this.skinIndex = 0;
        /** 记牌器文本颜色 0为数量0颜色 1为数量不为0颜色 */
        this.markerColorArr = [];
        /** 使用角色替代玩家头像 */
        this.useRole = false;
        this.initData();
    }
    DdzSkinDefine.prototype.initData = function () {
        this.skinIndex = this.jsonMap["skinIndex"] || 0;
        this.markerColorArr = this.jsonMap["markerLblColor"] || [];
        this.useRole = this.jsonMap["useRole"];
    };
    DdzSkinDefine.jsonPath = DdzPathHelper_1.default.configPath + "DdzSkinConfig";
    return DdzSkinDefine;
}());
exports.default = DdzSkinDefine;

cc._RF.pop();