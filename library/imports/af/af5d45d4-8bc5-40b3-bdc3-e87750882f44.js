"use strict";
cc._RF.push(module, 'af5d4XUi8VAs73D6HdQiC9E', 'ErmjMjStyleHelper');
// ermj/Ermj/scripts/tool/ErmjMjStyleHelper.ts

"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErmjRelativeDefine = void 0;
/** 与自己相对位置 值即本地座位差值 */
var ErmjRelativeDefine;
(function (ErmjRelativeDefine) {
    ErmjRelativeDefine[ErmjRelativeDefine["Self"] = 0] = "Self";
    // Right,       // 自己右方
    ErmjRelativeDefine[ErmjRelativeDefine["Opposite"] = 1] = "Opposite";
    // Left         // 自己左方
})(ErmjRelativeDefine = exports.ErmjRelativeDefine || (exports.ErmjRelativeDefine = {}));
var ErmjMjStyleHelper = /** @class */ (function () {
    function ErmjMjStyleHelper() {
    }
    ErmjMjStyleHelper.getPerspectiveCfg = function (persp) {
        var perspAbs = Math.abs(persp);
        if (!this.perspectiveCfgArr[perspAbs]) {
            console.error("error 找不到对应透视等级配置", persp);
            return { cfg: this.perspectiveCfgArr[0], dir: 1 };
        }
        var dir = persp >= 0 ? 1 : -1;
        return { cfg: this.perspectiveCfgArr[perspAbs], dir: dir };
    };
    /** 手牌的麻将 */
    ErmjMjStyleHelper.mjHandMap = {
        // 万1-9
        1: "majiang1_wan_1",
        2: "majiang1_wan_2",
        3: "majiang1_wan_3",
        4: "majiang1_wan_4",
        5: "majiang1_wan_5",
        6: "majiang1_wan_6",
        7: "majiang1_wan_7",
        8: "majiang1_wan_8",
        9: "majiang1_wan_9",
        // 条1-9
        11: "",
        12: "",
        13: "",
        14: "",
        15: "",
        16: "",
        17: "",
        18: "",
        19: "",
        // 筒1-9
        21: "",
        22: "",
        23: "",
        24: "",
        25: "",
        26: "",
        27: "",
        28: "",
        29: "",
        // 东南西北
        31: "majiang1_dong",
        32: "majiang1_nan",
        33: "majiang1_xi",
        34: "majiang1_bei",
        // 中发白
        35: "majiang1_zhong",
        36: "majiang1_fa",
        37: "majiang1_baiban",
        // 梅兰竹菊春夏秋冬
        41: "majiang1_chun",
        42: "majiang1_xia",
        43: "majiang1_qiu",
        44: "majiang1_dong-1",
        45: "majiang1_mei",
        46: "majiang1_lanhua",
        47: "majiang1_zhu",
        48: "majiang1_ju",
    };
    /** 打出去的麻将 */
    ErmjMjStyleHelper.mjOutMap = {
        // 万1-9
        1: "majiang2_wan_1",
        2: "majiang2_wan_2",
        3: "majiang2_wan_3",
        4: "majiang2_wan_4",
        5: "majiang2_wan_5",
        6: "majiang2_wan_6",
        7: "majiang2_wan_7",
        8: "majiang2_wan_8",
        9: "majiang2_wan_9",
        // 条1-9
        11: "",
        12: "",
        13: "",
        14: "",
        15: "",
        16: "",
        17: "",
        18: "",
        19: "",
        // 筒1-9
        21: "",
        22: "",
        23: "",
        24: "",
        25: "",
        26: "",
        27: "",
        28: "",
        29: "",
        // 东南西北
        31: "majiang2_dong",
        32: "majiang2_nan",
        33: "majiang2_xi",
        34: "majiang2_bei",
        // 中发白
        35: "majiang2_zhong",
        36: "majiang2_fa",
        37: "majiang2_baiban",
        // 梅兰竹菊春夏秋冬
        41: "majiang2_chun",
        42: "majiang2_xia",
        43: "majiang2_qiu",
        44: "majiang2_dong-1",
        45: "majiang2_mei",
        46: "majiang2_lanhua",
        47: "majiang2_zhu",
        48: "majiang2_ju",
    };
    ErmjMjStyleHelper.mjOutSoundMap = {
        // 万1-9
        1: "mj1wan",
        2: "mj2wan",
        3: "mj3wan",
        4: "mj4wan",
        5: "mj5wan",
        6: "mj6wan",
        7: "mj7wan",
        8: "mj8wan",
        9: "mj9wan",
        // 条1-9
        11: "",
        12: "",
        13: "",
        14: "",
        15: "",
        16: "",
        17: "",
        18: "",
        19: "",
        // 筒1-9
        21: "",
        22: "",
        23: "",
        24: "",
        25: "",
        26: "",
        27: "",
        28: "",
        29: "",
        // 东南西北
        31: "mj31",
        32: "mj32",
        33: "mj33",
        34: "mj34",
        // 中发白
        35: "mj35",
        36: "mj36",
        37: "mj37",
        // 梅兰竹菊春夏秋冬
        41: "",
        42: "",
        43: "",
        44: "",
        45: "",
        46: "",
        47: "",
        48: "",
    };
    ErmjMjStyleHelper.SpecialBgColor = cc.color(144, 251, 251, 255);
    ErmjMjStyleHelper.NormalBgColor = cc.Color.WHITE;
    /**
     * 打出展示牌显示配置 key是与自己本地座位的偏移值
     * frontAngle: 牌面旋转 perspScale: 透视等级系数 -1取反
     */
    ErmjMjStyleHelper.mjOutStyle = (_a = {},
        _a[ErmjRelativeDefine.Self] = { frontAngle: 0, perspScale: 1 },
        // [ErmjRelativeDefine.Right]: {frontAngle: 90, perspectiveScale: 1},
        _a[ErmjRelativeDefine.Opposite] = { frontAngle: 180, perspScale: -1 },
        _a);
    /**
     * 打出麻将子透视等级配置 缩放取上层父节点整体缩放 中心某个麻将子为参考基准向右(透视取连续), 向左的数值取相反数
     * @key 0~9表示中心往右, 0~-9表示中心往左, key为负数时bg和back的scale和front的skewX取负值;
     * @space 正透视等级的下个间距取devOffsetX, 负透视等级间距取negDevSpaceX;
     * @Hierarch 透视等级越高, 节点层级越低
     */
    ErmjMjStyleHelper.perspectiveCfgArr = [
        { bgSp: "majiang6_1", backSp: "majiang6_11", frontSkewX: 0, devSpaceX: 48, negDevSpaceX: 46 },
        { bgSp: "majiang6_2", backSp: "majiang6_12", frontSkewX: 0, devSpaceX: 46, negDevSpaceX: 48 },
        { bgSp: "majiang6_3", backSp: "majiang6_13", frontSkewX: -4, devSpaceX: 47.5, negDevSpaceX: 46 },
        { bgSp: "majiang6_4", backSp: "majiang6_14", frontSkewX: -8, devSpaceX: 49.5, negDevSpaceX: 47.5 },
        { bgSp: "majiang6_5", backSp: "majiang6_15", frontSkewX: -12, devSpaceX: 46, negDevSpaceX: 49.5 },
        { bgSp: "majiang6_6", backSp: "majiang6_16", frontSkewX: -16, devSpaceX: 47, negDevSpaceX: 46 },
        { bgSp: "majiang6_7", backSp: "majiang6_17", frontSkewX: -20, devSpaceX: 46, negDevSpaceX: 47 },
        { bgSp: "majiang6_8", backSp: "majiang6_18", frontSkewX: -22, devSpaceX: 47.5, negDevSpaceX: 46 },
        { bgSp: "majiang6_9", backSp: "majiang6_19", frontSkewX: -24, devSpaceX: 48, negDevSpaceX: 47.5 },
        { bgSp: "majiang6_10", backSp: "majiang6_20", frontSkewX: -26, devSpaceX: 46, negDevSpaceX: 48 },
    ];
    return ErmjMjStyleHelper;
}());
exports.default = ErmjMjStyleHelper;

cc._RF.pop();