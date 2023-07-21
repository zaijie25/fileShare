"use strict";
cc._RF.push(module, '94373pR5X9GF7RdlZgfNXLe', 'BbwzSkinDefine');
// bbwz/Bbwz/scripts/data/BbwzSkinDefine.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BbwzSkinDefine = /** @class */ (function () {
    function BbwzSkinDefine() {
    }
    /* 底部筹码栏选中放大比例 */
    BbwzSkinDefine.selectScale = 1.05;
    /* 头像信息弹窗离中心偏移量 */
    BbwzSkinDefine.headTipOffset = cc.v2(210, 0);
    /* 筹码选中特效偏移筹码中心 */
    BbwzSkinDefine.selectChipOffset = cc.v2(0, 0);
    /* 筹码选中特效动画     如果无差异就保持五个一样 */
    BbwzSkinDefine.skBigChipIdleArr = [
        "idle_green",
        "idle_bule",
        "idle_purple",
        "idle_red",
        "idle_yellow"
    ];
    return BbwzSkinDefine;
}());
exports.default = BbwzSkinDefine;

cc._RF.pop();