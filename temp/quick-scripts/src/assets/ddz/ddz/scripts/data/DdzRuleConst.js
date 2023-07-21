"use strict";
cc._RF.push(module, 'd02d59TdPZBqq83dE4imPWL', 'DdzRuleConst');
// ddz/ddz/scripts/data/DdzRuleConst.ts

"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DdzMode = exports.DdzTypeDefine = void 0;
var DdzTypeDefine;
(function (DdzTypeDefine) {
    DdzTypeDefine[DdzTypeDefine["DDZ_SINGLE"] = 1] = "DDZ_SINGLE";
    DdzTypeDefine[DdzTypeDefine["DDZ_PAIR"] = 2] = "DDZ_PAIR";
    DdzTypeDefine[DdzTypeDefine["DDZ_THREE_ZERO"] = 3] = "DDZ_THREE_ZERO";
    DdzTypeDefine[DdzTypeDefine["DDZ_THREE_ONE"] = 4] = "DDZ_THREE_ONE";
    DdzTypeDefine[DdzTypeDefine["DDZ_THREE_TWO"] = 5] = "DDZ_THREE_TWO";
    DdzTypeDefine[DdzTypeDefine["DDZ_STRAIGHT"] = 6] = "DDZ_STRAIGHT";
    DdzTypeDefine[DdzTypeDefine["DDZ_LINK_PAIR"] = 7] = "DDZ_LINK_PAIR";
    DdzTypeDefine[DdzTypeDefine["DDZ_PLANE_ZERO"] = 8] = "DDZ_PLANE_ZERO";
    DdzTypeDefine[DdzTypeDefine["DDZ_PLANE_ONE"] = 9] = "DDZ_PLANE_ONE";
    DdzTypeDefine[DdzTypeDefine["DDZ_PLANE_TWO"] = 10] = "DDZ_PLANE_TWO";
    DdzTypeDefine[DdzTypeDefine["DDZ_FOUR_ONE"] = 11] = "DDZ_FOUR_ONE";
    DdzTypeDefine[DdzTypeDefine["DDZ_FOUR_TWO"] = 12] = "DDZ_FOUR_TWO";
    DdzTypeDefine[DdzTypeDefine["DDZ_BOMB"] = 13] = "DDZ_BOMB";
    DdzTypeDefine[DdzTypeDefine["DDZ_ROCKET"] = 14] = "DDZ_ROCKET";
})(DdzTypeDefine = exports.DdzTypeDefine || (exports.DdzTypeDefine = {}));
var DdzMode;
(function (DdzMode) {
    DdzMode[DdzMode["Normal"] = 0] = "Normal";
    DdzMode[DdzMode["Quick"] = 1] = "Quick";
})(DdzMode = exports.DdzMode || (exports.DdzMode = {}));
var DdzRuleConst = /** @class */ (function () {
    function DdzRuleConst() {
    }
    DdzRuleConst.checkIsPlane = function (type) {
        if (type == DdzTypeDefine.DDZ_PLANE_ZERO || type == DdzTypeDefine.DDZ_PLANE_ONE || type == DdzTypeDefine.DDZ_PLANE_TWO)
            return !0;
        else
            return !1;
    };
    DdzRuleConst.checkIsRocket = function (type) {
        return type == DdzTypeDefine.DDZ_ROCKET;
    };
    DdzRuleConst.checkIsBomb = function (type) {
        return type == DdzTypeDefine.DDZ_BOMB;
    };
    DdzRuleConst.checkIsLinkPair = function (type) {
        return type == DdzTypeDefine.DDZ_LINK_PAIR;
    };
    DdzRuleConst.checkIsStraight = function (type) {
        return type == DdzTypeDefine.DDZ_STRAIGHT;
    };
    DdzRuleConst.getPlayTypeSoundRes = function (type, weight) {
        // if (DdzRuleConst.checkIsPlane(type))
        //     return;
        // if (DdzRuleConst.checkIsRocket(type))
        //     return;
        // if (DdzRuleConst.checkIsBomb(type))
        //     return;
        if (type == DdzTypeDefine.DDZ_SINGLE) {
            var arr = DdzRuleConst.SingleSoundCfg[weight];
            return arr[Global.Toolkit.getRoundInteger(arr.length)];
        }
        else if (type == DdzTypeDefine.DDZ_PAIR) {
            var arr = DdzRuleConst.PairSoundCfg[weight];
            return arr[Global.Toolkit.getRoundInteger(arr.length)];
        }
        else if (type == DdzTypeDefine.DDZ_THREE_ZERO) {
            var arr = DdzRuleConst.ThreeSoundCfg[weight];
            return arr[Global.Toolkit.getRoundInteger(arr.length)];
        }
        else {
            var arr = DdzRuleConst.cardTypeSound[type];
            return arr[Global.Toolkit.getRoundInteger(arr.length)];
        }
    };
    DdzRuleConst.getPassSoundRes = function (type) {
        if (type == DdzTypeDefine.DDZ_SINGLE) {
            return DdzRuleConst.NotPlayPokerArr[0];
        }
        else if (type == DdzTypeDefine.DDZ_PAIR) {
            return DdzRuleConst.NotPlayPokerArr[1];
        }
        else {
            return DdzRuleConst.NotPlayPokerArr[2];
        }
    };
    DdzRuleConst.cardTypeStr = (_a = {},
        _a[DdzTypeDefine.DDZ_SINGLE] = "单牌",
        _a[DdzTypeDefine.DDZ_PAIR] = "对子",
        _a[DdzTypeDefine.DDZ_THREE_ZERO] = "三条",
        _a[DdzTypeDefine.DDZ_THREE_ONE] = "三带一",
        _a[DdzTypeDefine.DDZ_THREE_TWO] = "三带二",
        _a[DdzTypeDefine.DDZ_STRAIGHT] = "顺子",
        _a[DdzTypeDefine.DDZ_LINK_PAIR] = "连对",
        _a[DdzTypeDefine.DDZ_PLANE_ZERO] = "飞机",
        _a[DdzTypeDefine.DDZ_PLANE_ONE] = "飞机带单翅膀",
        _a[DdzTypeDefine.DDZ_PLANE_TWO] = "飞机带双翅膀",
        _a[DdzTypeDefine.DDZ_FOUR_ONE] = "四带两单",
        _a[DdzTypeDefine.DDZ_FOUR_TWO] = "四带两对",
        _a[DdzTypeDefine.DDZ_BOMB] = "炸弹",
        _a[DdzTypeDefine.DDZ_ROCKET] = "火箭",
        _a);
    DdzRuleConst.cardTypeSound = (_b = {},
        // [DdzTypeDefine.DDZ_SINGLE]:         "单牌",
        // [DdzTypeDefine.DDZ_PAIR]:           "对子",
        _b[DdzTypeDefine.DDZ_THREE_ZERO] = [""],
        _b[DdzTypeDefine.DDZ_THREE_ONE] = ["type7"],
        _b[DdzTypeDefine.DDZ_THREE_TWO] = ["type8"],
        _b[DdzTypeDefine.DDZ_STRAIGHT] = ["type4"],
        _b[DdzTypeDefine.DDZ_LINK_PAIR] = ["type5"],
        _b[DdzTypeDefine.DDZ_PLANE_ZERO] = ["type6"],
        _b[DdzTypeDefine.DDZ_PLANE_ONE] = ["type6"],
        _b[DdzTypeDefine.DDZ_PLANE_TWO] = ["type6"],
        _b[DdzTypeDefine.DDZ_FOUR_ONE] = ["type9"],
        _b[DdzTypeDefine.DDZ_FOUR_TWO] = ["type13"],
        _b[DdzTypeDefine.DDZ_BOMB] = ["type11"],
        _b[DdzTypeDefine.DDZ_ROCKET] = ["type12"],
        _b);
    DdzRuleConst.PlaneSoundArr = ["common_plane"];
    DdzRuleConst.BombSoundArr = ["common_bomb"];
    DdzRuleConst.RocketSoundArr = ["huojian"];
    DdzRuleConst.StraightSoundArr = ["shunzi"];
    DdzRuleConst.LinkPairSoundArr = ["liandui"];
    DdzRuleConst.NotPlayPokerArr = ["pass1", "pass0", "pass3"];
    DdzRuleConst.SingleSoundCfg = {
        16: ['2'],
        3: ['3'],
        4: ['4'],
        5: ['5'],
        6: ['6'],
        7: ['7'],
        8: ['8'],
        9: ['9'],
        10: ['10'],
        11: ['11'],
        12: ['12'],
        13: ['13'],
        14: ['1'],
        79: ['14'],
        95: ['15'],
    };
    DdzRuleConst.PairSoundCfg = {
        16: ['type2_2'],
        3: ['type2_3'],
        4: ['type2_4'],
        5: ['type2_5'],
        6: ['type2_6'],
        7: ['type2_7'],
        8: ['type2_8'],
        9: ['type2_9'],
        10: ['type2_10'],
        11: ['type2_11'],
        12: ['type2_12'],
        13: ['type2_13'],
        14: ['type2_1'],
    };
    DdzRuleConst.ThreeSoundCfg = {
        16: ['type3_2'],
        3: ['type3_3'],
        4: ['type3_4'],
        5: ['type3_5'],
        6: ['type3_6'],
        7: ['type3_7'],
        8: ['type3_8'],
        9: ['type3_9'],
        10: ['type3_10'],
        11: ['type3_11'],
        12: ['type3_12'],
        13: ['type3_13'],
        14: ['type3_1'],
    };
    DdzRuleConst.ModeConfig = (_c = {},
        _c[DdzMode.Normal] = {
            totalCount: 54,
            baseCount: 17,
            leftCount: 3
        },
        _c[DdzMode.Quick] = {
            totalCount: 42,
            baseCount: 13,
            leftCount: 3
        },
        _c);
    return DdzRuleConst;
}());
exports.default = DdzRuleConst;

cc._RF.pop();