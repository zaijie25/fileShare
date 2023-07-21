
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/tool/ErmjMjStyleHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcdG9vbFxcRXJtak1qU3R5bGVIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVCQUF1QjtBQUN2QixJQUFZLGtCQUtYO0FBTEQsV0FBWSxrQkFBa0I7SUFDMUIsMkRBQVEsQ0FBQTtJQUNSLHVCQUF1QjtJQUN2QixtRUFBWSxDQUFBO0lBQ1osdUJBQXVCO0FBQzNCLENBQUMsRUFMVyxrQkFBa0IsR0FBbEIsMEJBQWtCLEtBQWxCLDBCQUFrQixRQUs3QjtBQUVEO0lBQUE7SUFzTUEsQ0FBQztJQVRpQixtQ0FBaUIsR0FBL0IsVUFBZ0MsS0FBYTtRQUN6QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEVBQUM7WUFDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMxQyxPQUFPLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFDLENBQUM7U0FDbkQ7UUFDRCxJQUFJLEdBQUcsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUMsQ0FBQztJQUM3RCxDQUFDO0lBcE1ELFlBQVk7SUFDVywyQkFBUyxHQUFHO1FBQy9CLE9BQU87UUFDUCxDQUFDLEVBQUUsZ0JBQWdCO1FBQ25CLENBQUMsRUFBRSxnQkFBZ0I7UUFDbkIsQ0FBQyxFQUFFLGdCQUFnQjtRQUNuQixDQUFDLEVBQUUsZ0JB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RyxFQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFDO1FBQy9GLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUM7UUFDN0YsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBQztRQUM3RixFQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFDO1FBQy9GLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUM7UUFDL0YsRUFBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLEVBQUUsRUFBQztLQUNqRyxDQUFBO0lBV0wsd0JBQUM7Q0F0TUQsQUFzTUMsSUFBQTtrQkF0TW9CLGlCQUFpQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vKiog5LiO6Ieq5bex55u45a+55L2N572uIOWAvOWNs+acrOWcsOW6p+S9jeW3ruWAvCAqL1xyXG5leHBvcnQgZW51bSBFcm1qUmVsYXRpdmVEZWZpbmV7XHJcbiAgICBTZWxmID0gMCwgICAgICAgLy8g6Ieq5bexXHJcbiAgICAvLyBSaWdodCwgICAgICAgLy8g6Ieq5bex5Y+z5pa5XHJcbiAgICBPcHBvc2l0ZSA9IDEsICAgICAgIC8vIOiHquW3seWvuemdolxyXG4gICAgLy8gTGVmdCAgICAgICAgIC8vIOiHquW3seW3puaWuVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcm1qTWpTdHlsZUhlbHBlcntcclxuICAgIC8qKiDmiYvniYznmoTpurvlsIYgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgbWpIYW5kTWFwID0ge1xyXG4gICAgICAgIC8vIOS4hzEtOVxyXG4gICAgICAgIDE6IFwibWFqaWFuZzFfd2FuXzFcIixcclxuICAgICAgICAyOiBcIm1hamlhbmcxX3dhbl8yXCIsXHJcbiAgICAgICAgMzogXCJtYWppYW5nMV93YW5fM1wiLFxyXG4gICAgICAgIDQ6IFwibWFqaWFuZzFfd2FuXzRcIixcclxuICAgICAgICA1OiBcIm1hamlhbmcxX3dhbl81XCIsXHJcbiAgICAgICAgNjogXCJtYWppYW5nMV93YW5fNlwiLFxyXG4gICAgICAgIDc6IFwibWFqaWFuZzFfd2FuXzdcIixcclxuICAgICAgICA4OiBcIm1hamlhbmcxX3dhbl84XCIsXHJcbiAgICAgICAgOTogXCJtYWppYW5nMV93YW5fOVwiLFxyXG4gICAgICAgIC8vIOadoTEtOVxyXG4gICAgICAgIDExOiBcIlwiLFxyXG4gICAgICAgIDEyOiBcIlwiLFxyXG4gICAgICAgIDEzOiBcIlwiLFxyXG4gICAgICAgIDE0OiBcIlwiLFxyXG4gICAgICAgIDE1OiBcIlwiLFxyXG4gICAgICAgIDE2OiBcIlwiLFxyXG4gICAgICAgIDE3OiBcIlwiLFxyXG4gICAgICAgIDE4OiBcIlwiLFxyXG4gICAgICAgIDE5OiBcIlwiLFxyXG4gICAgICAgIC8vIOetkjEtOVxyXG4gICAgICAgIDIxOiBcIlwiLFxyXG4gICAgICAgIDIyOiBcIlwiLFxyXG4gICAgICAgIDIzOiBcIlwiLFxyXG4gICAgICAgIDI0OiBcIlwiLFxyXG4gICAgICAgIDI1OiBcIlwiLFxyXG4gICAgICAgIDI2OiBcIlwiLFxyXG4gICAgICAgIDI3OiBcIlwiLFxyXG4gICAgICAgIDI4OiBcIlwiLFxyXG4gICAgICAgIDI5OiBcIlwiLFxyXG4gICAgICAgIC8vIOS4nOWNl+ilv+WMl1xyXG4gICAgICAgIDMxOiBcIm1hamlhbmcxX2RvbmdcIixcclxuICAgICAgICAzMjogXCJtYWppYW5nMV9uYW5cIixcclxuICAgICAgICAzMzogXCJtYWppYW5nMV94aVwiLFxyXG4gICAgICAgIDM0OiBcIm1hamlhbmcxX2JlaVwiLFxyXG4gICAgICAgIC8vIOS4reWPkeeZvVxyXG4gICAgICAgIDM1OiBcIm1hamlhbmcxX3pob25nXCIsXHJcbiAgICAgICAgMzY6IFwibWFqaWFuZzFfZmFcIixcclxuICAgICAgICAzNzogXCJtYWppYW5nMV9iYWliYW5cIixcclxuICAgICAgICAvLyDmooXlhbDnq7noj4rmmKXlpI/np4vlhqxcclxuICAgICAgICA0MTogXCJtYWppYW5nMV9jaHVuXCIsXHJcbiAgICAgICAgNDI6IFwibWFqaWFuZzFfeGlhXCIsXHJcbiAgICAgICAgNDM6IFwibWFqaWFuZzFfcWl1XCIsXHJcbiAgICAgICAgNDQ6IFwibWFqaWFuZzFfZG9uZy0xXCIsXHJcbiAgICAgICAgNDU6IFwibWFqaWFuZzFfbWVpXCIsXHJcbiAgICAgICAgNDY6IFwibWFqaWFuZzFfbGFuaHVhXCIsXHJcbiAgICAgICAgNDc6IFwibWFqaWFuZzFfemh1XCIsXHJcbiAgICAgICAgNDg6IFwibWFqaWFuZzFfanVcIixcclxuICAgIH1cclxuXHJcbiAgICAvKiog5omT5Ye65Y6755qE6bq75bCGICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG1qT3V0TWFwID0ge1xyXG4gICAgICAgIC8vIOS4hzEtOVxyXG4gICAgICAgIDE6IFwibWFqaWFuZzJfd2FuXzFcIixcclxuICAgICAgICAyOiBcIm1hamlhbmcyX3dhbl8yXCIsXHJcbiAgICAgICAgMzogXCJtYWppYW5nMl93YW5fM1wiLFxyXG4gICAgICAgIDQ6IFwibWFqaWFuZzJfd2FuXzRcIixcclxuICAgICAgICA1OiBcIm1hamlhbmcyX3dhbl81XCIsXHJcbiAgICAgICAgNjogXCJtYWppYW5nMl93YW5fNlwiLFxyXG4gICAgICAgIDc6IFwibWFqaWFuZzJfd2FuXzdcIixcclxuICAgICAgICA4OiBcIm1hamlhbmcyX3dhbl84XCIsXHJcbiAgICAgICAgOTogXCJtYWppYW5nMl93YW5fOVwiLFxyXG4gICAgICAgIC8vIOadoTEtOVxyXG4gICAgICAgIDExOiBcIlwiLFxyXG4gICAgICAgIDEyOiBcIlwiLFxyXG4gICAgICAgIDEzOiBcIlwiLFxyXG4gICAgICAgIDE0OiBcIlwiLFxyXG4gICAgICAgIDE1OiBcIlwiLFxyXG4gICAgICAgIDE2OiBcIlwiLFxyXG4gICAgICAgIDE3OiBcIlwiLFxyXG4gICAgICAgIDE4OiBcIlwiLFxyXG4gICAgICAgIDE5OiBcIlwiLFxyXG4gICAgICAgIC8vIOetkjEtOVxyXG4gICAgICAgIDIxOiBcIlwiLFxyXG4gICAgICAgIDIyOiBcIlwiLFxyXG4gICAgICAgIDIzOiBcIlwiLFxyXG4gICAgICAgIDI0OiBcIlwiLFxyXG4gICAgICAgIDI1OiBcIlwiLFxyXG4gICAgICAgIDI2OiBcIlwiLFxyXG4gICAgICAgIDI3OiBcIlwiLFxyXG4gICAgICAgIDI4OiBcIlwiLFxyXG4gICAgICAgIDI5OiBcIlwiLFxyXG4gICAgICAgIC8vIOS4nOWNl+ilv+WMl1xyXG4gICAgICAgIDMxOiBcIm1hamlhbmcyX2RvbmdcIixcclxuICAgICAgICAzMjogXCJtYWppYW5nMl9uYW5cIixcclxuICAgICAgICAzMzogXCJtYWppYW5nMl94aVwiLFxyXG4gICAgICAgIDM0OiBcIm1hamlhbmcyX2JlaVwiLFxyXG4gICAgICAgIC8vIOS4reWPkeeZvVxyXG4gICAgICAgIDM1OiBcIm1hamlhbmcyX3pob25nXCIsXHJcbiAgICAgICAgMzY6IFwibWFqaWFuZzJfZmFcIixcclxuICAgICAgICAzNzogXCJtYWppYW5nMl9iYWliYW5cIixcclxuICAgICAgICAvLyDmooXlhbDnq7noj4rmmKXlpI/np4vlhqxcclxuICAgICAgICA0MTogXCJtYWppYW5nMl9jaHVuXCIsXHJcbiAgICAgICAgNDI6IFwibWFqaWFuZzJfeGlhXCIsXHJcbiAgICAgICAgNDM6IFwibWFqaWFuZzJfcWl1XCIsXHJcbiAgICAgICAgNDQ6IFwibWFqaWFuZzJfZG9uZy0xXCIsXHJcbiAgICAgICAgNDU6IFwibWFqaWFuZzJfbWVpXCIsXHJcbiAgICAgICAgNDY6IFwibWFqaWFuZzJfbGFuaHVhXCIsXHJcbiAgICAgICAgNDc6IFwibWFqaWFuZzJfemh1XCIsXHJcbiAgICAgICAgNDg6IFwibWFqaWFuZzJfanVcIixcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG1qT3V0U291bmRNYXAgPSB7XHJcbiAgICAgICAgLy8g5LiHMS05XHJcbiAgICAgICAgMTogXCJtajF3YW5cIixcclxuICAgICAgICAyOiBcIm1qMndhblwiLFxyXG4gICAgICAgIDM6IFwibWozd2FuXCIsXHJcbiAgICAgICAgNDogXCJtajR3YW5cIixcclxuICAgICAgICA1OiBcIm1qNXdhblwiLFxyXG4gICAgICAgIDY6IFwibWo2d2FuXCIsXHJcbiAgICAgICAgNzogXCJtajd3YW5cIixcclxuICAgICAgICA4OiBcIm1qOHdhblwiLFxyXG4gICAgICAgIDk6IFwibWo5d2FuXCIsXHJcbiAgICAgICAgLy8g5p2hMS05XHJcbiAgICAgICAgMTE6IFwiXCIsXHJcbiAgICAgICAgMTI6IFwiXCIsXHJcbiAgICAgICAgMTM6IFwiXCIsXHJcbiAgICAgICAgMTQ6IFwiXCIsXHJcbiAgICAgICAgMTU6IFwiXCIsXHJcbiAgICAgICAgMTY6IFwiXCIsXHJcbiAgICAgICAgMTc6IFwiXCIsXHJcbiAgICAgICAgMTg6IFwiXCIsXHJcbiAgICAgICAgMTk6IFwiXCIsXHJcbiAgICAgICAgLy8g562SMS05XHJcbiAgICAgICAgMjE6IFwiXCIsXHJcbiAgICAgICAgMjI6IFwiXCIsXHJcbiAgICAgICAgMjM6IFwiXCIsXHJcbiAgICAgICAgMjQ6IFwiXCIsXHJcbiAgICAgICAgMjU6IFwiXCIsXHJcbiAgICAgICAgMjY6IFwiXCIsXHJcbiAgICAgICAgMjc6IFwiXCIsXHJcbiAgICAgICAgMjg6IFwiXCIsXHJcbiAgICAgICAgMjk6IFwiXCIsXHJcbiAgICAgICAgLy8g5Lic5Y2X6KW/5YyXXHJcbiAgICAgICAgMzE6IFwibWozMVwiLFxyXG4gICAgICAgIDMyOiBcIm1qMzJcIixcclxuICAgICAgICAzMzogXCJtajMzXCIsXHJcbiAgICAgICAgMzQ6IFwibWozNFwiLFxyXG4gICAgICAgIC8vIOS4reWPkeeZvVxyXG4gICAgICAgIDM1OiBcIm1qMzVcIixcclxuICAgICAgICAzNjogXCJtajM2XCIsXHJcbiAgICAgICAgMzc6IFwibWozN1wiLFxyXG4gICAgICAgIC8vIOaiheWFsOerueiPiuaYpeWkj+eni+WGrFxyXG4gICAgICAgIDQxOiBcIlwiLFxyXG4gICAgICAgIDQyOiBcIlwiLFxyXG4gICAgICAgIDQzOiBcIlwiLFxyXG4gICAgICAgIDQ0OiBcIlwiLFxyXG4gICAgICAgIDQ1OiBcIlwiLFxyXG4gICAgICAgIDQ2OiBcIlwiLFxyXG4gICAgICAgIDQ3OiBcIlwiLFxyXG4gICAgICAgIDQ4OiBcIlwiLFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU3BlY2lhbEJnQ29sb3IgPSBjYy5jb2xvcigxNDQsIDI1MSwgMjUxLCAyNTUpO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBOb3JtYWxCZ0NvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPlh7rlsZXnpLrniYzmmL7npLrphY3nva4ga2V55piv5LiO6Ieq5bex5pys5Zyw5bqn5L2N55qE5YGP56e75YC8XHJcbiAgICAgKiBmcm9udEFuZ2xlOiDniYzpnaLml4vovawgcGVyc3BTY2FsZTog6YCP6KeG562J57qn57O75pWwIC0x5Y+W5Y+NXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbWpPdXRTdHlsZSA9IHtcclxuICAgICAgICBbRXJtalJlbGF0aXZlRGVmaW5lLlNlbGZdOiB7ZnJvbnRBbmdsZTogMCwgcGVyc3BTY2FsZTogMX0sXHJcbiAgICAgICAgLy8gW0VybWpSZWxhdGl2ZURlZmluZS5SaWdodF06IHtmcm9udEFuZ2xlOiA5MCwgcGVyc3BlY3RpdmVTY2FsZTogMX0sXHJcbiAgICAgICAgW0VybWpSZWxhdGl2ZURlZmluZS5PcHBvc2l0ZV06IHtmcm9udEFuZ2xlOiAxODAsIHBlcnNwU2NhbGU6IC0xfSxcclxuICAgICAgICAvLyBbRXJtalJlbGF0aXZlRGVmaW5lLkxlZnRdOiB7ZnJvbnRBbmdsZTogLTkwLCBwZXJzcGVjdGl2ZVNjYWxlOiAxfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBcclxuICAgICAqIOaJk+WHuum6u+WwhuWtkOmAj+inhuetiee6p+mFjee9riDnvKnmlL7lj5bkuIrlsYLniLboioLngrnmlbTkvZPnvKnmlL4g5Lit5b+D5p+Q5Liq6bq75bCG5a2Q5Li65Y+C6ICD5Z+65YeG5ZCR5Y+zKOmAj+inhuWPlui/nue7rSksIOWQkeW3pueahOaVsOWAvOWPluebuOWPjeaVsCBcclxuICAgICAqIEBrZXkgMH456KGo56S65Lit5b+D5b6A5Y+zLCAwfi056KGo56S65Lit5b+D5b6A5bemLCBrZXnkuLrotJ/mlbDml7ZiZ+WSjGJhY2vnmoRzY2FsZeWSjGZyb25055qEc2tld1jlj5botJ/lgLw7XHJcbiAgICAgKiBAc3BhY2Ug5q2j6YCP6KeG562J57qn55qE5LiL5Liq6Ze06Led5Y+WZGV2T2Zmc2V0WCwg6LSf6YCP6KeG562J57qn6Ze06Led5Y+WbmVnRGV2U3BhY2VYO1xyXG4gICAgICogQEhpZXJhcmNoIOmAj+inhuetiee6p+i2iumrmCwg6IqC54K55bGC57qn6LaK5L2OXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcGVyc3BlY3RpdmVDZmdBcnIgPSBbXHJcbiAgICAgICAge2JnU3A6IFwibWFqaWFuZzZfMVwiLCBiYWNrU3A6IFwibWFqaWFuZzZfMTFcIiwgZnJvbnRTa2V3WDogMCwgZGV2U3BhY2VYOiA0OCwgbmVnRGV2U3BhY2VYOiA0Nn0sXHJcbiAgICAgICAge2JnU3A6IFwibWFqaWFuZzZfMlwiLCBiYWNrU3A6IFwibWFqaWFuZzZfMTJcIiwgZnJvbnRTa2V3WDogMCwgZGV2U3BhY2VYOiA0NiwgbmVnRGV2U3BhY2VYOiA0OH0sXHJcbiAgICAgICAge2JnU3A6IFwibWFqaWFuZzZfM1wiLCBiYWNrU3A6IFwibWFqaWFuZzZfMTNcIiwgZnJvbnRTa2V3WDogLTQsIGRldlNwYWNlWDogNDcuNSwgbmVnRGV2U3BhY2VYOiA0Nn0sXHJcbiAgICAgICAge2JnU3A6IFwibWFqaWFuZzZfNFwiLCBiYWNrU3A6IFwibWFqaWFuZzZfMTRcIiwgZnJvbnRTa2V3WDogLTgsIGRldlNwYWNlWDogNDkuNSwgbmVnRGV2U3BhY2VYOiA0Ny41fSxcclxuICAgICAgICB7YmdTcDogXCJtYWppYW5nNl81XCIsIGJhY2tTcDogXCJtYWppYW5nNl8xNVwiLCBmcm9udFNrZXdYOiAtMTIsIGRldlNwYWNlWDogNDYsIG5lZ0RldlNwYWNlWDogNDkuNX0sXHJcbiAgICAgICAge2JnU3A6IFwibWFqaWFuZzZfNlwiLCBiYWNrU3A6IFwibWFqaWFuZzZfMTZcIiwgZnJvbnRTa2V3WDogLTE2LCBkZXZTcGFjZVg6IDQ3LCBuZWdEZXZTcGFjZVg6IDQ2fSxcclxuICAgICAgICB7YmdTcDogXCJtYWppYW5nNl83XCIsIGJhY2tTcDogXCJtYWppYW5nNl8xN1wiLCBmcm9udFNrZXdYOiAtMjAsIGRldlNwYWNlWDogNDYsIG5lZ0RldlNwYWNlWDogNDd9LFxyXG4gICAgICAgIHtiZ1NwOiBcIm1hamlhbmc2XzhcIiwgYmFja1NwOiBcIm1hamlhbmc2XzE4XCIsIGZyb250U2tld1g6IC0yMiwgZGV2U3BhY2VYOiA0Ny41LCBuZWdEZXZTcGFjZVg6IDQ2fSxcclxuICAgICAgICB7YmdTcDogXCJtYWppYW5nNl85XCIsIGJhY2tTcDogXCJtYWppYW5nNl8xOVwiLCBmcm9udFNrZXdYOiAtMjQsIGRldlNwYWNlWDogNDgsIG5lZ0RldlNwYWNlWDogNDcuNX0sXHJcbiAgICAgICAge2JnU3A6IFwibWFqaWFuZzZfMTBcIiwgYmFja1NwOiBcIm1hamlhbmc2XzIwXCIsIGZyb250U2tld1g6IC0yNiwgZGV2U3BhY2VYOiA0NiwgbmVnRGV2U3BhY2VYOiA0OH0sXHJcbiAgICBdXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRQZXJzcGVjdGl2ZUNmZyhwZXJzcDogbnVtYmVyKXtcclxuICAgICAgICBsZXQgcGVyc3BBYnMgPSBNYXRoLmFicyhwZXJzcCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBlcnNwZWN0aXZlQ2ZnQXJyW3BlcnNwQWJzXSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvciDmib7kuI3liLDlr7nlupTpgI/op4bnrYnnuqfphY3nva5cIiwgcGVyc3ApO1xyXG4gICAgICAgICAgICByZXR1cm4ge2NmZzogdGhpcy5wZXJzcGVjdGl2ZUNmZ0FyclswXSwgZGlyOiAxfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGRpciA9IHBlcnNwID49IDAgPyAxIDogLTE7XHJcbiAgICAgICAgcmV0dXJuIHtjZmc6IHRoaXMucGVyc3BlY3RpdmVDZmdBcnJbcGVyc3BBYnNdLCBkaXI6IGRpcn07XHJcbiAgICB9XHJcbn0iXX0=