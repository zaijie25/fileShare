"use strict";
cc._RF.push(module, 'c68b2HAEVRKJpoJ4uW7L9mq', 'ErmjGameConst');
// ermj/Ermj/scripts/data/ErmjGameConst.ts

"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErmjMjActState = exports.ErmjLocation = void 0;
/** 座位朝向 与服务器座位对应 1南2北 */
var ErmjLocation;
(function (ErmjLocation) {
    ErmjLocation[ErmjLocation["South"] = 1] = "South";
    ErmjLocation[ErmjLocation["North"] = 2] = "North";
})(ErmjLocation = exports.ErmjLocation || (exports.ErmjLocation = {}));
var ErmjMjActState;
(function (ErmjMjActState) {
    ErmjMjActState[ErmjMjActState["Disable"] = 0] = "Disable";
    ErmjMjActState[ErmjMjActState["Deal"] = 1] = "Deal";
    ErmjMjActState[ErmjMjActState["Change"] = 2] = "Change";
    ErmjMjActState[ErmjMjActState["Play"] = 3] = "Play";
})(ErmjMjActState = exports.ErmjMjActState || (exports.ErmjMjActState = {}));
var ErmjGameConst = /** @class */ (function () {
    function ErmjGameConst() {
    }
    ErmjGameConst.playMusic = function (path, isAutoRealse) {
        Global.Audio.playBundleMusic(ErmjGameConst.Gid, path);
    };
    ErmjGameConst.playSound = function (path, isAutoRealse) {
        Global.Audio.playBundleSound(ErmjGameConst.Gid, path);
    };
    /**
    * 给节点添加点击事件
    * @param root 根节点
    * @param path 相对于根节点的路径
    * @param callback 回调函数
    * @param target 回调函数的调用者this
    * @param transition 按钮点击过渡类型
    * @param time 过渡时间
    */
    ErmjGameConst.addCommonClick = function (root, path, callback, target, transition, playSound) {
        if (transition === void 0) { transition = cc.Button.Transition.SCALE; }
        if (playSound === void 0) { playSound = false; }
        return Global.UIHelper.addCommonClick(root, path, callback, target, transition, null, playSound);
    };
    ErmjGameConst.Gid = 2101; // 2101
    ErmjGameConst.mahjongTotal = 72;
    ErmjGameConst.mahjongWall = 2;
    /** 牌桌最大支持人数 */
    ErmjGameConst.maxPlayerCount = 2;
    /** 本地座位映射到桌面 */
    ErmjGameConst.localToViewMap = {};
    ErmjGameConst.LevelSpCfg = {
        "l0": "changci_01",
        "l1": "changci_02",
        "l2": "changci_03"
    };
    /** 玩家操作提示图片帧 */
    ErmjGameConst.StateSpStrCfg = {
        Chow: "chi",
        Pong: "peng",
        Win: "dianpao",
        Kong: "gang",
        WinAll: "zimo",
        Ting: "ting",
        RobWin: "qianggang",
    };
    /** 座位提示栏配置 根据自己所处方位设定 */
    ErmjGameConst.askNoticeStrCfg = (_a = {},
        _a[ErmjLocation.South] = ["daojishi", "xuanzhong_hong", "xuanzhong_lan"],
        _a[ErmjLocation.North] = ["daojishi_01", "xuanzhong_lan_01", "xuanzhong_hong_01"],
        _a);
    return ErmjGameConst;
}());
exports.default = ErmjGameConst;

cc._RF.pop();