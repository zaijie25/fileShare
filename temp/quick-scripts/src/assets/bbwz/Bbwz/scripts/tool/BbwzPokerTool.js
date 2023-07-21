"use strict";
cc._RF.push(module, '236adlbPZ1NMZUfNYCZVUJC', 'BbwzPokerTool');
// bbwz/Bbwz/scripts/tool/BbwzPokerTool.ts

"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var BbwzPathHelper_1 = require("./BbwzPathHelper");
/**
 * 扑克相关工具类
 */
var BbwzPokerTool = /** @class */ (function () {
    function BbwzPokerTool() {
    }
    /**
     * 牌型分等级 用以区分特效 返回 1：单张对子 2: 顺子金花 3: 顺金豹子
     * @param nType 牌型
     */
    BbwzPokerTool.sortZjhPokerType = function (nType) {
        if (nType == this.zjhTypeDefine.JH_SHUNZI || nType == this.zjhTypeDefine.JH_JINHUA)
            return 2;
        if (nType == this.zjhTypeDefine.JH_SHUNJIN || nType == this.zjhTypeDefine.JH_BAOZI)
            return 3;
        return 1;
    };
    /**
     * 牌型分等级 用以区分特效 返回 1: 无牛 2: 牛1-牛9 3: 牛牛-五小牛
     * @param nType 牌型
     */
    BbwzPokerTool.sortBullPokerType = function (nType) {
        if (nType == this.bullTypeDefine.BULL_NONE)
            return 1;
        if (nType >= this.bullTypeDefine.BULL_TEN && nType <= this.bullTypeDefine.BULL_SMALL)
            return 3;
        return 2;
    };
    // 检测是否要摆成3+2
    BbwzPokerTool.checkIsThreeWithTwo = function (ntype) {
        if (ntype === void 0) { ntype = 0; }
        var nnFlag = ntype > this.bullTypeDefine.BULL_NONE && ntype != this.bullTypeDefine.BULL_BOMB && ntype != this.bullTypeDefine.BULL_SMALL;
        var zjhFlag = true; // 金花固定3+2
        return nnFlag && zjhFlag;
    };
    BbwzPokerTool.getPokerRealValue = function (value) {
        var num = value % 16;
        var color = Math.floor(value / 16) + 1;
        return [num, color];
    };
    /** 牌对应的资源 */
    BbwzPokerTool.pokerResMap = {
        0x02: "puke_05",
        0x03: "puke_09",
        0x04: "puke_13",
        0x05: "puke_17",
        0x06: "puke_21",
        0x07: "puke_25",
        0x08: "puke_29",
        0x09: "puke_33",
        0x0A: "puke_37",
        0x0B: "puke_41",
        0x0C: "puke_45",
        0x0D: "puke_49",
        0x0E: "puke_01",
        0x12: "puke_08",
        0x13: "puke_12",
        0x14: "puke_16",
        0x15: "puke_20",
        0x16: "puke_24",
        0x17: "puke_28",
        0x18: "puke_32",
        0x19: "puke_36",
        0x1A: "puke_40",
        0x1B: "puke_44",
        0x1C: "puke_48",
        0x1D: "puke_52",
        0x1E: "puke_04",
        0x22: "puke_07",
        0x23: "puke_11",
        0x24: "puke_15",
        0x25: "puke_19",
        0x26: "puke_23",
        0x27: "puke_27",
        0x28: "puke_31",
        0x29: "puke_35",
        0x2A: "puke_39",
        0x2B: "puke_43",
        0x2C: "puke_47",
        0x2D: "puke_51",
        0x2E: "puke_03",
        0x32: "puke_06",
        0x33: "puke_10",
        0x34: "puke_14",
        0x35: "puke_18",
        0x36: "puke_22",
        0x37: "puke_26",
        0x38: "puke_30",
        0x39: "puke_34",
        0x3A: "puke_38",
        0x3B: "puke_42",
        0x3C: "puke_46",
        0x3D: "puke_50",
        0x3E: "puke_02",
    };
    BbwzPokerTool.zjhTypeDefine = {
        JH_GAOPAI: 51,
        JH_DUIZI: 52,
        JH_SHUNZI: 53,
        JH_JINHUA: 54,
        JH_SHUNJIN: 55,
        JH_BAOZI: 56 //豹子
    };
    /** 金花牌型音效 */
    BbwzPokerTool.zjhPokerTypeSound = (_a = {},
        _a[BbwzPokerTool.zjhTypeDefine.JH_GAOPAI] = BbwzPathHelper_1.default.gameSoundPath + "zjh/ctype_1",
        _a[BbwzPokerTool.zjhTypeDefine.JH_DUIZI] = BbwzPathHelper_1.default.gameSoundPath + "zjh/ctype_2",
        _a[BbwzPokerTool.zjhTypeDefine.JH_SHUNZI] = BbwzPathHelper_1.default.gameSoundPath + "zjh/ctype_3",
        _a[BbwzPokerTool.zjhTypeDefine.JH_JINHUA] = BbwzPathHelper_1.default.gameSoundPath + "zjh/ctype_4",
        _a[BbwzPokerTool.zjhTypeDefine.JH_SHUNJIN] = BbwzPathHelper_1.default.gameSoundPath + "zjh/ctype_5",
        _a[BbwzPokerTool.zjhTypeDefine.JH_BAOZI] = BbwzPathHelper_1.default.gameSoundPath + "zjh/ctype_6",
        _a);
    /** 金花牌型图片帧 */
    BbwzPokerTool.zjhPokerTypeSf = (_b = {},
        _b[BbwzPokerTool.zjhTypeDefine.JH_GAOPAI] = "paixing_1",
        _b[BbwzPokerTool.zjhTypeDefine.JH_DUIZI] = "paixing_2",
        _b[BbwzPokerTool.zjhTypeDefine.JH_SHUNZI] = "paixing_3",
        _b[BbwzPokerTool.zjhTypeDefine.JH_JINHUA] = "paixing_4",
        _b[BbwzPokerTool.zjhTypeDefine.JH_SHUNJIN] = "paixing_5",
        _b[BbwzPokerTool.zjhTypeDefine.JH_BAOZI] = "paixing_6",
        _b);
    BbwzPokerTool.bullTypeDefine = {
        BULL_NONE: 1,
        BULL_ONE: 2,
        BULL_TWO: 3,
        BULL_THREE: 4,
        BULL_FOUR: 5,
        BULL_FIVE: 6,
        BULL_SIX: 7,
        BULL_SEVEN: 8,
        BULL_EIGHT: 9,
        BULL_NINE: 10,
        BULL_TEN: 11,
        BULL_SILVER: 12,
        BULL_FLOWER: 13,
        BULL_BOMB: 14,
        BULL_SMALL: 15 // 五小牛:五张牌都小余5，且牌点总数小余或等于10
    };
    /**  牛牛牌型音效 */
    BbwzPokerTool.bullPokerTypeSound = (_c = {},
        _c[BbwzPokerTool.bullTypeDefine.BULL_NONE] = BbwzPathHelper_1.default.gameSoundPath + "bull/type_0_1",
        _c[BbwzPokerTool.bullTypeDefine.BULL_ONE] = BbwzPathHelper_1.default.gameSoundPath + "bull/type_0_2",
        _c[BbwzPokerTool.bullTypeDefine.BULL_TWO] = BbwzPathHelper_1.default.gameSoundPath + "bull/type_0_3",
        _c[BbwzPokerTool.bullTypeDefine.BULL_THREE] = BbwzPathHelper_1.default.gameSoundPath + "bull/type_0_4",
        _c[BbwzPokerTool.bullTypeDefine.BULL_FOUR] = BbwzPathHelper_1.default.gameSoundPath + "bull/type_0_5",
        _c[BbwzPokerTool.bullTypeDefine.BULL_FIVE] = BbwzPathHelper_1.default.gameSoundPath + "bull/type_0_6",
        _c[BbwzPokerTool.bullTypeDefine.BULL_SIX] = BbwzPathHelper_1.default.gameSoundPath + "bull/type_0_7",
        _c[BbwzPokerTool.bullTypeDefine.BULL_SEVEN] = BbwzPathHelper_1.default.gameSoundPath + "bull/type_0_8",
        _c[BbwzPokerTool.bullTypeDefine.BULL_EIGHT] = BbwzPathHelper_1.default.gameSoundPath + "bull/type_0_9",
        _c[BbwzPokerTool.bullTypeDefine.BULL_NINE] = BbwzPathHelper_1.default.gameSoundPath + "bull/type_0_10",
        _c[BbwzPokerTool.bullTypeDefine.BULL_TEN] = BbwzPathHelper_1.default.gameSoundPath + "bull/type_0_11",
        _c[BbwzPokerTool.bullTypeDefine.BULL_SILVER] = BbwzPathHelper_1.default.gameSoundPath + "bull/type_0_15",
        _c[BbwzPokerTool.bullTypeDefine.BULL_FLOWER] = BbwzPathHelper_1.default.gameSoundPath + "bull/type_0_16",
        _c[BbwzPokerTool.bullTypeDefine.BULL_BOMB] = BbwzPathHelper_1.default.gameSoundPath + "bull/type_0_14",
        _c[BbwzPokerTool.bullTypeDefine.BULL_SMALL] = BbwzPathHelper_1.default.gameSoundPath + "bull/type_0_13",
        _c);
    /**  牛牛牌型图片帧 */
    BbwzPokerTool.bullPokerTypeSf = (_d = {},
        _d[BbwzPokerTool.bullTypeDefine.BULL_NONE] = "niu_15",
        _d[BbwzPokerTool.bullTypeDefine.BULL_ONE] = "niu_1",
        _d[BbwzPokerTool.bullTypeDefine.BULL_TWO] = "niu_2",
        _d[BbwzPokerTool.bullTypeDefine.BULL_THREE] = "niu_3",
        _d[BbwzPokerTool.bullTypeDefine.BULL_FOUR] = "niu_4",
        _d[BbwzPokerTool.bullTypeDefine.BULL_FIVE] = "niu_5",
        _d[BbwzPokerTool.bullTypeDefine.BULL_SIX] = "niu_6",
        _d[BbwzPokerTool.bullTypeDefine.BULL_SEVEN] = "niu_7",
        _d[BbwzPokerTool.bullTypeDefine.BULL_EIGHT] = "niu_8",
        _d[BbwzPokerTool.bullTypeDefine.BULL_NINE] = "niu_9",
        _d[BbwzPokerTool.bullTypeDefine.BULL_TEN] = "niu_10",
        _d[BbwzPokerTool.bullTypeDefine.BULL_SILVER] = "niu_12",
        _d[BbwzPokerTool.bullTypeDefine.BULL_FLOWER] = "niu_11",
        _d[BbwzPokerTool.bullTypeDefine.BULL_BOMB] = "niu_13",
        _d[BbwzPokerTool.bullTypeDefine.BULL_SMALL] = "niu_14",
        _d);
    /** 牌型倍数对应的图片 */
    BbwzPokerTool.multiSfRes = {
        1: "beishu_1",
        2: "beishu_2",
        3: "beishu_3",
        4: "beishu_4",
        5: "beishu_5",
        6: "beishu_6",
        7: "beishu_7",
        8: "beishu_8",
        9: "beishu_9",
        10: "beishu_10",
    };
    return BbwzPokerTool;
}());
exports.default = BbwzPokerTool;

cc._RF.pop();