
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ddz/ddz/scripts/data/DdzGameConst.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZGR6XFxkZHpcXHNjcmlwdHNcXGRhdGFcXERkekdhbWVDb25zdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQXlDO0FBQ3pDLElBQVksZUFRWDtBQVJELFdBQVksZUFBZTtJQUN2QixxREFBUSxDQUFBO0lBQ1IsdURBQUssQ0FBQTtJQUNMLG1EQUFHLENBQUE7SUFDSCxxREFBSSxDQUFBO0lBQ0oscURBQUksQ0FBQTtJQUNKLHlEQUFNLENBQUE7SUFDTixxREFBSSxDQUFBO0FBQ1IsQ0FBQyxFQVJXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBUTFCO0FBRUQ7SUFBQTtJQXFEQSxDQUFDO0lBWkk7Ozs7Ozs7O01BUUU7SUFDVywyQkFBYyxHQUE1QixVQUE2QixJQUFhLEVBQUUsSUFBWSxFQUFFLFFBQWtCLEVBQUUsTUFBWSxFQUFFLFVBQXVDLEVBQUUsU0FBMEI7UUFBbkUsMkJBQUEsRUFBQSxhQUFhLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUs7UUFBRSwwQkFBQSxFQUFBLGlCQUEwQjtRQUMzSixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFuRHNCLGdCQUFHLEdBQUcsSUFBSSxDQUFDO0lBRXBCLDRCQUFlLEdBQUc7UUFDNUIsSUFBSSxFQUFFLEtBQUs7UUFDWCxJQUFJLEVBQUUsS0FBSztRQUNYLElBQUksRUFBRSxLQUFLO1FBQ1gsSUFBSSxFQUFFLEtBQUs7S0FDZCxDQUFBO0lBRWEsMkJBQWMsR0FBRztRQUMzQixJQUFJLEVBQUUsZUFBZTtRQUNyQixJQUFJLEVBQUUsZUFBZTtRQUNyQixJQUFJLEVBQUUsZUFBZTtRQUNyQixJQUFJLEVBQUUsZUFBZTtRQUNyQixJQUFJLEVBQUUsZUFBZTtRQUNyQixJQUFJLEVBQUUsZUFBZTtLQUN4QixDQUFBO0lBRWEsMEJBQWEsR0FBRztRQUMxQixDQUFDLEVBQUUsY0FBYztRQUNqQixDQUFDLEVBQUUsWUFBWTtRQUNmLENBQUMsRUFBRSxZQUFZO1FBQ2YsQ0FBQyxFQUFFLFlBQVk7S0FDbEIsQ0FBQTtJQUVhLDJCQUFjLEdBQUc7UUFDM0IsQ0FBQyxFQUFFLGdCQUFnQjtRQUNuQixDQUFDLEVBQUUsY0FBYztLQUNwQixDQUFBO0lBRWEsMkJBQWMsR0FBRztRQUMzQixDQUFDLEVBQUUsYUFBYTtRQUNoQixDQUFDLEVBQUUsRUFBRTtLQUNSLENBQUM7SUFFWSx1QkFBVTtRQUNwQixHQUFDLHNCQUFPLENBQUMsTUFBTSxJQUFHLGVBQWU7UUFDakMsR0FBQyxzQkFBTyxDQUFDLEtBQUssSUFBRyxlQUFlO1lBQ25DO0lBY0wsbUJBQUM7Q0FyREQsQUFxREMsSUFBQTtrQkFyRG9CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZHpNb2RlIH0gZnJvbSBcIi4vRGR6UnVsZUNvbnN0XCI7XHJcbmV4cG9ydCBlbnVtIERkekdhbWVBY3RTdGF0ZSB7XHJcbiAgICBOb25lID0gMCxcclxuICAgIFJlYWR5LFxyXG4gICAgUm9iLFxyXG4gICAgTXVsdCxcclxuICAgIFBsYXksIFxyXG4gICAgUmV3YXJkLFxyXG4gICAgV2FpdCxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGR6R2FtZUNvbnN0e1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBHaWQgPSAyMDA1O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgRGVza0xldmVsU3RyQ2ZnID0ge1xyXG4gICAgICAgICdsMCc6ICflsI/otYTlnLonLFxyXG4gICAgICAgICdsMSc6ICfogIHmnb/lnLonLFxyXG4gICAgICAgICdsMic6ICflnJ/osarlnLonLFxyXG4gICAgICAgICdsMyc6ICfnmoflrrblnLonLFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgRGVza0xldmVsU2ZDZmcgPSB7XHJcbiAgICAgICAgJ2wwJzogJ2Rkel96aHVvemlfMDEnLFxyXG4gICAgICAgICdsMSc6ICdkZHpfemh1b3ppXzAyJyxcclxuICAgICAgICAnbDInOiAnZGR6X3podW96aV8wMycsXHJcbiAgICAgICAgJ2wzJzogJ2Rkel96aHVvemlfMDQnLFxyXG4gICAgICAgICdsNCc6ICdkZHpfemh1b3ppXzA3JyxcclxuICAgICAgICAnbDUnOiBcImRkel96aHVvemlfMDhcIlxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgR2FtZVJvYlN0ckNmZyA9IHtcclxuICAgICAgICAwOiAnZm9udHNfYnVqaWFvJyxcclxuICAgICAgICAxOiAnZm9udHNfMWZlbicsXHJcbiAgICAgICAgMjogJ2ZvbnRzXzJmZW4nLFxyXG4gICAgICAgIDM6ICdmb250c18zZmVuJyxcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEdhbWVNdWx0U3RyQ2ZnID0ge1xyXG4gICAgICAgIDE6ICdmb250c19idWppYWJlaScsXHJcbiAgICAgICAgMjogJ2ZvbnRzX2ppYWJlaScsXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBHYW1lUGxheVN0ckNmZyA9IHtcclxuICAgICAgICAwOiAnZm9udHNfYnVjaHUnLFxyXG4gICAgICAgIDE6ICcnLFxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgcHVibGljIHN0YXRpYyBNb2RlU3RyQ2ZnID0ge1xyXG4gICAgICAgIFtEZHpNb2RlLk5vcm1hbF06IFwiZGR6X3podW96aV8wNVwiLFxyXG4gICAgICAgIFtEZHpNb2RlLlF1aWNrXTogXCJkZHpfemh1b3ppXzA2XCJcclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiDnu5noioLngrnmt7vliqDngrnlh7vkuovku7ZcclxuICAgICAqIEBwYXJhbSByb290IOagueiKgueCuVxyXG4gICAgICogQHBhcmFtIHBhdGgg55u45a+55LqO5qC56IqC54K555qE6Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCD5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOWbnuiwg+WHveaVsOeahOiwg+eUqOiAhXRoaXNcclxuICAgICAqIEBwYXJhbSB0cmFuc2l0aW9uIOaMiemSrueCueWHu+i/h+a4oeexu+Wei1xyXG4gICAgICogQHBhcmFtIHRpbWUg6L+H5rih5pe26Ze0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgYWRkQ29tbW9uQ2xpY2socm9vdDogY2MuTm9kZSwgcGF0aDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIHRhcmdldD86IGFueSwgdHJhbnNpdGlvbiA9IGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFLCBwbGF5U291bmQ6IGJvb2xlYW4gPSBmYWxzZSk6IGNjLk5vZGUge1xyXG4gICAgICAgIHJldHVybiBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2socm9vdCwgcGF0aCwgY2FsbGJhY2ssIHRhcmdldCwgdHJhbnNpdGlvbiwgbnVsbCwgcGxheVNvdW5kKTtcclxuICAgIH1cclxufSJdfQ==