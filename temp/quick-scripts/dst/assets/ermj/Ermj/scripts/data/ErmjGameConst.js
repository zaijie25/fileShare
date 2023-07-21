
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/data/ErmjGameConst.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcZGF0YVxcRXJtakdhbWVDb25zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUJBQXlCO0FBQ3pCLElBQVksWUFHWDtBQUhELFdBQVksWUFBWTtJQUNwQixpREFBUyxDQUFBO0lBQ1QsaURBQUssQ0FBQTtBQUNULENBQUMsRUFIVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUd2QjtBQUVELElBQVksY0FLWDtBQUxELFdBQVksY0FBYztJQUN0Qix5REFBVyxDQUFBO0lBQ1gsbURBQUksQ0FBQTtJQUNKLHVEQUFNLENBQUE7SUFDTixtREFBSSxDQUFBO0FBQ1IsQ0FBQyxFQUxXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBS3pCO0FBRUQ7SUFBQTtJQW1EQSxDQUFDO0lBcEJpQix1QkFBUyxHQUF2QixVQUF3QixJQUFZLEVBQUUsWUFBcUI7UUFDdkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRWEsdUJBQVMsR0FBdkIsVUFBd0IsSUFBWSxFQUFFLFlBQXFCO1FBQ3ZELE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7Ozs7OztNQVFFO0lBQ1csNEJBQWMsR0FBNUIsVUFBNkIsSUFBYSxFQUFFLElBQVksRUFBRSxRQUFrQixFQUFFLE1BQVksRUFBRSxVQUF1QyxFQUFFLFNBQTBCO1FBQW5FLDJCQUFBLEVBQUEsYUFBYSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLO1FBQUUsMEJBQUEsRUFBQSxpQkFBMEI7UUFDM0osT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBakR1QixpQkFBRyxHQUFHLElBQUksQ0FBQyxDQUFTLE9BQU87SUFDM0IsMEJBQVksR0FBRyxFQUFFLENBQUM7SUFDbEIseUJBQVcsR0FBRyxDQUFDLENBQUM7SUFDdkMsZUFBZTtJQUNRLDRCQUFjLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLGdCQUFnQjtJQUNPLDRCQUFjLEdBQUcsRUFFdkMsQ0FBQztJQUNxQix3QkFBVSxHQUFHO1FBQ2hDLElBQUksRUFBRSxZQUFZO1FBQ2xCLElBQUksRUFBRSxZQUFZO1FBQ2xCLElBQUksRUFBRSxZQUFZO0tBQ3JCLENBQUE7SUFDRCxnQkFBZ0I7SUFDTywyQkFBYSxHQUFHO1FBQ25DLElBQUksRUFBRSxLQUFLO1FBQ1gsSUFBSSxFQUFFLE1BQU07UUFDWixHQUFHLEVBQUUsU0FBUztRQUNkLElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLE1BQU07UUFDZCxJQUFJLEVBQUUsTUFBTTtRQUNaLE1BQU0sRUFBRSxXQUFXO0tBQ3RCLENBQUE7SUFDRCx5QkFBeUI7SUFDRiw2QkFBZTtRQUNsQyxHQUFDLFlBQVksQ0FBQyxLQUFLLElBQUcsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDO1FBQ3JFLEdBQUMsWUFBWSxDQUFDLEtBQUssSUFBRyxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsQ0FBRTtZQUNsRjtJQXNCTCxvQkFBQztDQW5ERCxBQW1EQyxJQUFBO2tCQW5Eb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiDluqfkvY3mnJ3lkJEg5LiO5pyN5Yqh5Zmo5bqn5L2N5a+55bqUIDHljZcy5YyXICovXHJcbmV4cG9ydCBlbnVtIEVybWpMb2NhdGlvbntcclxuICAgIFNvdXRoID0gMSxcclxuICAgIE5vcnRoXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVybWpNakFjdFN0YXRle1xyXG4gICAgRGlzYWJsZSA9IDAsXHJcbiAgICBEZWFsLFxyXG4gICAgQ2hhbmdlLFxyXG4gICAgUGxheSxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtakdhbWVDb25zdHtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR2lkID0gMjEwMTsgICAgICAgICAvLyAyMTAxXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG1haGpvbmdUb3RhbCA9IDcyO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBtYWhqb25nV2FsbCA9IDI7XHJcbiAgICAvKiog54mM5qGM5pyA5aSn5pSv5oyB5Lq65pWwICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IG1heFBsYXllckNvdW50ID0gMjtcclxuICAgIC8qKiDmnKzlnLDluqfkvY3mmKDlsITliLDmoYzpnaIgKi8gXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGxvY2FsVG9WaWV3TWFwID0ge1xyXG4gICAgICAgIFxyXG4gICAgfTtcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTGV2ZWxTcENmZyA9IHtcclxuICAgICAgICBcImwwXCI6IFwiY2hhbmdjaV8wMVwiLFxyXG4gICAgICAgIFwibDFcIjogXCJjaGFuZ2NpXzAyXCIsXHJcbiAgICAgICAgXCJsMlwiOiBcImNoYW5nY2lfMDNcIlxyXG4gICAgfVxyXG4gICAgLyoqIOeOqeWutuaTjeS9nOaPkOekuuWbvueJh+W4pyAqL1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBTdGF0ZVNwU3RyQ2ZnID0ge1xyXG4gICAgICAgIENob3c6IFwiY2hpXCIsXHJcbiAgICAgICAgUG9uZzogXCJwZW5nXCIsXHJcbiAgICAgICAgV2luOiBcImRpYW5wYW9cIixcclxuICAgICAgICBLb25nOiBcImdhbmdcIixcclxuICAgICAgICBXaW5BbGw6IFwiemltb1wiLFxyXG4gICAgICAgIFRpbmc6IFwidGluZ1wiLFxyXG4gICAgICAgIFJvYldpbjogXCJxaWFuZ2dhbmdcIixcclxuICAgIH1cclxuICAgIC8qKiDluqfkvY3mj5DnpLrmoI/phY3nva4g5qC55o2u6Ieq5bex5omA5aSE5pa55L2N6K6+5a6aICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGFza05vdGljZVN0ckNmZyA9IHtcclxuICAgICAgICBbRXJtakxvY2F0aW9uLlNvdXRoXTogW1wiZGFvamlzaGlcIiwgXCJ4dWFuemhvbmdfaG9uZ1wiLCBcInh1YW56aG9uZ19sYW5cIl0sXHJcbiAgICAgICAgW0VybWpMb2NhdGlvbi5Ob3J0aF06IFtcImRhb2ppc2hpXzAxXCIsIFwieHVhbnpob25nX2xhbl8wMVwiLCBcInh1YW56aG9uZ19ob25nXzAxXCIgXVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcGxheU11c2ljKHBhdGg6IHN0cmluZywgaXNBdXRvUmVhbHNlOiBib29sZWFuKXtcclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ1bmRsZU11c2ljKEVybWpHYW1lQ29uc3QuR2lkLCBwYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHBsYXlTb3VuZChwYXRoOiBzdHJpbmcsIGlzQXV0b1JlYWxzZTogYm9vbGVhbil7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdW5kbGVTb3VuZChFcm1qR2FtZUNvbnN0LkdpZCwgcGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOe7meiKgueCuea3u+WKoOeCueWHu+S6i+S7tlxyXG4gICAgKiBAcGFyYW0gcm9vdCDmoLnoioLngrlcclxuICAgICogQHBhcmFtIHBhdGgg55u45a+55LqO5qC56IqC54K555qE6Lev5b6EXHJcbiAgICAqIEBwYXJhbSBjYWxsYmFjayDlm57osIPlh73mlbBcclxuICAgICogQHBhcmFtIHRhcmdldCDlm57osIPlh73mlbDnmoTosIPnlKjogIV0aGlzXHJcbiAgICAqIEBwYXJhbSB0cmFuc2l0aW9uIOaMiemSrueCueWHu+i/h+a4oeexu+Wei1xyXG4gICAgKiBAcGFyYW0gdGltZSDov4fmuKHml7bpl7RcclxuICAgICovXHJcbiAgIHB1YmxpYyBzdGF0aWMgYWRkQ29tbW9uQ2xpY2socm9vdDogY2MuTm9kZSwgcGF0aDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIHRhcmdldD86IGFueSwgdHJhbnNpdGlvbiA9IGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFLCBwbGF5U291bmQ6IGJvb2xlYW4gPSBmYWxzZSk6IGNjLk5vZGUge1xyXG4gICAgICAgcmV0dXJuIEdsb2JhbC5VSUhlbHBlci5hZGRDb21tb25DbGljayhyb290LCBwYXRoLCBjYWxsYmFjaywgdGFyZ2V0LCB0cmFuc2l0aW9uLCBudWxsLCBwbGF5U291bmQpO1xyXG4gICB9XHJcbn0iXX0=