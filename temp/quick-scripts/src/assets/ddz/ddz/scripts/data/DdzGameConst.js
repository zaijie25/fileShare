"use strict";
cc._RF.push(module, '79795gS7vBIPJDbZILxsUTK', 'DdzGameConst');
// ddz/ddz/scripts/data/DdzGameConst.ts

"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DdzGameActState = void 0;
var DdzRuleConst_1 = require("./DdzRuleConst");
var DdzGameActState;
(function (DdzGameActState) {
    DdzGameActState[DdzGameActState["None"] = 0] = "None";
    DdzGameActState[DdzGameActState["Ready"] = 1] = "Ready";
    DdzGameActState[DdzGameActState["Rob"] = 2] = "Rob";
    DdzGameActState[DdzGameActState["Mult"] = 3] = "Mult";
    DdzGameActState[DdzGameActState["Play"] = 4] = "Play";
    DdzGameActState[DdzGameActState["Reward"] = 5] = "Reward";
    DdzGameActState[DdzGameActState["Wait"] = 6] = "Wait";
})(DdzGameActState = exports.DdzGameActState || (exports.DdzGameActState = {}));
var DdzGameConst = /** @class */ (function () {
    function DdzGameConst() {
    }
    /**
    * 给节点添加点击事件
    * @param root 根节点
    * @param path 相对于根节点的路径
    * @param callback 回调函数
    * @param target 回调函数的调用者this
    * @param transition 按钮点击过渡类型
    * @param time 过渡时间
    */
    DdzGameConst.addCommonClick = function (root, path, callback, target, transition, playSound) {
        if (transition === void 0) { transition = cc.Button.Transition.SCALE; }
        if (playSound === void 0) { playSound = false; }
        return Global.UIHelper.addCommonClick(root, path, callback, target, transition, null, playSound);
    };
    DdzGameConst.Gid = 2005;
    DdzGameConst.DeskLevelStrCfg = {
        'l0': '小资场',
        'l1': '老板场',
        'l2': '土豪场',
        'l3': '皇家场',
    };
    DdzGameConst.DeskLevelSfCfg = {
        'l0': 'ddz_zhuozi_01',
        'l1': 'ddz_zhuozi_02',
        'l2': 'ddz_zhuozi_03',
        'l3': 'ddz_zhuozi_04',
        'l4': 'ddz_zhuozi_07',
        'l5': "ddz_zhuozi_08"
    };
    DdzGameConst.GameRobStrCfg = {
        0: 'fonts_bujiao',
        1: 'fonts_1fen',
        2: 'fonts_2fen',
        3: 'fonts_3fen',
    };
    DdzGameConst.GameMultStrCfg = {
        1: 'fonts_bujiabei',
        2: 'fonts_jiabei',
    };
    DdzGameConst.GamePlayStrCfg = {
        0: 'fonts_buchu',
        1: '',
    };
    DdzGameConst.ModeStrCfg = (_a = {},
        _a[DdzRuleConst_1.DdzMode.Normal] = "ddz_zhuozi_05",
        _a[DdzRuleConst_1.DdzMode.Quick] = "ddz_zhuozi_06",
        _a);
    return DdzGameConst;
}());
exports.default = DdzGameConst;

cc._RF.pop();