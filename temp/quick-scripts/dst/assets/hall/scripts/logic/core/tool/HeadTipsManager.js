
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/HeadTipsManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd21daTX38VAr5EssgBsfRmR', 'HeadTipsManager');
// hall/scripts/logic/core/tool/HeadTipsManager.ts

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var InteractHeadTipComp_1 = require("../component/InteractHeadTipComp");
var InteractPlayComp_1 = require("../component/InteractPlayComp");
var baseBundle = "resources";
var headTipPath = "hall/prefabs/ui/interact/headTip";
var interactPlayPath = "hall/prefabs/ui/interact/interactPlayView";
var HeadTipsManager = /** @class */ (function () {
    function HeadTipsManager() {
    }
    // 版本迭代暂用, 后续删除
    HeadTipsManager.prototype.preloadRes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Global.ResourceManager.loadBundleRes(baseBundle, [headTipPath, interactPlayPath], function (err, res) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(res);
                            }
                        });
                    })];
            });
        });
    };
    HeadTipsManager.preloadRes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Global.ResourceManager.loadBundleRes(baseBundle, [headTipPath, interactPlayPath], function (err, res) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(res);
                            }
                        });
                    })];
            });
        });
    };
    HeadTipsManager.prototype.init = function (headTipsRoot, playRoot, isNeedHeadInfo) {
        var node0 = cc.instantiate(Global.ResourceManager.getBundleRes(baseBundle, headTipPath));
        var node1 = cc.instantiate(Global.ResourceManager.getBundleRes(baseBundle, interactPlayPath));
        // 挂到场景上初始化后再挂到游戏UI下
        node0.setParent(cc.Canvas.instance.node);
        node1.setParent(cc.Canvas.instance.node);
        this.headTipsComp = Global.UIHelper.safeGetComponent(node0, "", InteractHeadTipComp_1.default);
        this.interactPlayComp = Global.UIHelper.safeGetComponent(node1, "", InteractPlayComp_1.default);
        this.headTipsComp.node.setParent(headTipsRoot);
        this.interactPlayComp.node.setParent(playRoot);
        this.headTipsComp.node.active = false; // 默认隐藏
        this.interactPlayComp.node.active = true; // 不隐藏
        this.headTipsComp.needHeadTip = isNeedHeadInfo;
    };
    HeadTipsManager.prototype.setConfig = function (sChair) {
        this.headTipsComp.interactChooseView.setSelfSrc(sChair);
    };
    /**
     * 显示头像信息
     * @param isShow 是否显示
     * @param localSeat 显示者本地座位
     * @param data
     */
    HeadTipsManager.prototype.showHeadView = function (isShow, localSeat, worldPos, data) {
        var wPos = worldPos || cc.Vec3.ZERO;
        this.headTipsComp.showHeadView(isShow, localSeat, wPos, data);
    };
    /** 打开时更新玩家信息的金币变换 */
    HeadTipsManager.prototype.updatePoint = function (localSeat, point) {
        this.headTipsComp.updatePoint(localSeat, point);
    };
    /**
     * 播放表情
     * @param key 表情key
     * @param fWPos 世界起点
     * @param tWPos 世界终点
     * @param localSeat 表情归属的本地座位
     */
    HeadTipsManager.prototype.playAct = function (key, fWPos, tWPos, localSeat) {
        this.interactPlayComp.node.active = true;
        this.interactPlayComp.playAct(key, fWPos, tWPos, localSeat);
    };
    /** 玩家leave时调用清理正在飞的表情 */
    HeadTipsManager.prototype.clearOneOwner = function (owner) {
        this.interactPlayComp.clearOneOwner(owner);
    };
    /** 退出时调用 */
    HeadTipsManager.prototype.clearByGame = function () {
        if (this.headTipsComp && cc.isValid(this.headTipsComp)) {
            this.headTipsComp.node.active = false;
        }
        if (this.interactPlayComp && cc.isValid(this.interactPlayComp)) {
            this.interactPlayComp.node.active = false;
            this.interactPlayComp.clearAllOwner();
        }
    };
    return HeadTipsManager;
}());
exports.default = HeadTipsManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXEhlYWRUaXBzTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdFQUFtRTtBQUNuRSxrRUFBNkQ7QUFFN0QsSUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDO0FBQy9CLElBQU0sV0FBVyxHQUFHLGtDQUFrQyxDQUFDO0FBQ3ZELElBQU0sZ0JBQWdCLEdBQUcsMkNBQTJDLENBQUM7QUFDckU7SUFBQTtJQWdHQSxDQUFDO0lBNUZHLGVBQWU7SUFDRixvQ0FBVSxHQUF2Qjs7O2dCQUNJLHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQy9CLE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7NEJBQ3ZGLElBQUksR0FBRyxFQUFDO2dDQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs2QkFDZjtpQ0FDRztnQ0FDQSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7NkJBQ2hCO3dCQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUMsQ0FBQyxFQUFBOzs7S0FDTDtJQUVtQiwwQkFBVSxHQUE5Qjs7O2dCQUNJLHNCQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQy9CLE1BQU0sQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7NEJBQ3ZGLElBQUksR0FBRyxFQUFDO2dDQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs2QkFDZjtpQ0FDRztnQ0FDQSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7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QUFZLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUM7WUFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN6QztRQUNELElBQUcsSUFBSSxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUM7WUFDMUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQzFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN6QztJQUNMLENBQUM7SUFDTCxzQkFBQztBQUFELENBaEdBLEFBZ0dDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW50ZXJhY3RIZWFkVGlwQ29tcCBmcm9tIFwiLi4vY29tcG9uZW50L0ludGVyYWN0SGVhZFRpcENvbXBcIjtcclxuaW1wb3J0IEludGVyYWN0UGxheUNvbXAgZnJvbSBcIi4uL2NvbXBvbmVudC9JbnRlcmFjdFBsYXlDb21wXCI7XHJcblxyXG5jb25zdCBiYXNlQnVuZGxlID0gXCJyZXNvdXJjZXNcIjtcclxuY29uc3QgaGVhZFRpcFBhdGggPSBcImhhbGwvcHJlZmFicy91aS9pbnRlcmFjdC9oZWFkVGlwXCI7XHJcbmNvbnN0IGludGVyYWN0UGxheVBhdGggPSBcImhhbGwvcHJlZmFicy91aS9pbnRlcmFjdC9pbnRlcmFjdFBsYXlWaWV3XCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRUaXBzTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIGhlYWRUaXBzQ29tcDogSW50ZXJhY3RIZWFkVGlwQ29tcDtcclxuICAgIHByaXZhdGUgaW50ZXJhY3RQbGF5Q29tcDogSW50ZXJhY3RQbGF5Q29tcDtcclxuXHJcbiAgICAvLyDniYjmnKzov63ku6PmmoLnlKgsIOWQjue7reWIoOmZpFxyXG4gICAgcHVibGljIGFzeW5jIHByZWxvYWRSZXMoKXtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQnVuZGxlUmVzKGJhc2VCdW5kbGUsIFtoZWFkVGlwUGF0aCwgaW50ZXJhY3RQbGF5UGF0aF0sIChlcnIsIHJlcyk9PntcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBwcmVsb2FkUmVzKCl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZVJlcyhiYXNlQnVuZGxlLCBbaGVhZFRpcFBhdGgsIGludGVyYWN0UGxheVBhdGhdLCAoZXJyLCByZXMpPT57XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyKXtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KGhlYWRUaXBzUm9vdDogY2MuTm9kZSwgcGxheVJvb3Q6IGNjLk5vZGUsIGlzTmVlZEhlYWRJbmZvOiBib29sZWFuKXtcclxuICAgICAgICBsZXQgbm9kZTAgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZShHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdldEJ1bmRsZVJlcyhiYXNlQnVuZGxlLCBoZWFkVGlwUGF0aCkpO1xyXG4gICAgICAgIGxldCBub2RlMSA9IDxjYy5Ob2RlPmNjLmluc3RhbnRpYXRlKEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0QnVuZGxlUmVzKGJhc2VCdW5kbGUsIGludGVyYWN0UGxheVBhdGgpKTtcclxuICAgICAgICAvLyDmjILliLDlnLrmma/kuIrliJ3lp4vljJblkI7lho3mjILliLDmuLjmiI9VSeS4i1xyXG4gICAgICAgIG5vZGUwLnNldFBhcmVudChjYy5DYW52YXMuaW5zdGFuY2Uubm9kZSk7XHJcbiAgICAgICAgbm9kZTEuc2V0UGFyZW50KGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlKTtcclxuICAgICAgICB0aGlzLmhlYWRUaXBzQ29tcCA9IEdsb2JhbC5VSUhlbHBlci5zYWZlR2V0Q29tcG9uZW50KG5vZGUwLCBcIlwiLCBJbnRlcmFjdEhlYWRUaXBDb21wKTtcclxuICAgICAgICB0aGlzLmludGVyYWN0UGxheUNvbXAgPSBHbG9iYWwuVUlIZWxwZXIuc2FmZUdldENvbXBvbmVudChub2RlMSwgXCJcIiwgSW50ZXJhY3RQbGF5Q29tcCk7XHJcblxyXG4gICAgICAgIHRoaXMuaGVhZFRpcHNDb21wLm5vZGUuc2V0UGFyZW50KGhlYWRUaXBzUm9vdCk7XHJcbiAgICAgICAgdGhpcy5pbnRlcmFjdFBsYXlDb21wLm5vZGUuc2V0UGFyZW50KHBsYXlSb290KTtcclxuXHJcbiAgICAgICAgdGhpcy5oZWFkVGlwc0NvbXAubm9kZS5hY3RpdmUgPSBmYWxzZTsgICAgICAvLyDpu5jorqTpmpDol49cclxuICAgICAgICB0aGlzLmludGVyYWN0UGxheUNvbXAubm9kZS5hY3RpdmUgPSB0cnVlOyAgIC8vIOS4jemakOiXj1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuaGVhZFRpcHNDb21wLm5lZWRIZWFkVGlwID0gaXNOZWVkSGVhZEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldENvbmZpZyhzQ2hhaXI6IG51bWJlcil7XHJcbiAgICAgICAgdGhpcy5oZWFkVGlwc0NvbXAuaW50ZXJhY3RDaG9vc2VWaWV3LnNldFNlbGZTcmMoc0NoYWlyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuWktOWDj+S/oeaBr1xyXG4gICAgICogQHBhcmFtIGlzU2hvdyDmmK/lkKbmmL7npLpcclxuICAgICAqIEBwYXJhbSBsb2NhbFNlYXQg5pi+56S66ICF5pys5Zyw5bqn5L2NXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNob3dIZWFkVmlldyhpc1Nob3c6IGJvb2xlYW4sIGxvY2FsU2VhdDogbnVtYmVyLCB3b3JsZFBvczogY2MuVmVjMywgZGF0YTogYW55KXtcclxuICAgICAgICBsZXQgd1BvcyA9IHdvcmxkUG9zIHx8IGNjLlZlYzMuWkVSTztcclxuICAgICAgICB0aGlzLmhlYWRUaXBzQ29tcC5zaG93SGVhZFZpZXcoaXNTaG93LCBsb2NhbFNlYXQsIHdQb3MsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDmiZPlvIDml7bmm7TmlrDnjqnlrrbkv6Hmga/nmoTph5HluIHlj5jmjaIgKi9cclxuICAgIHB1YmxpYyB1cGRhdGVQb2ludChsb2NhbFNlYXQ6IG51bWJlciwgcG9pbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaGVhZFRpcHNDb21wLnVwZGF0ZVBvaW50KGxvY2FsU2VhdCwgcG9pbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+6KGo5oOFXHJcbiAgICAgKiBAcGFyYW0ga2V5IOihqOaDhWtleVxyXG4gICAgICogQHBhcmFtIGZXUG9zIOS4lueVjOi1t+eCuVxyXG4gICAgICogQHBhcmFtIHRXUG9zIOS4lueVjOe7iOeCuVxyXG4gICAgICogQHBhcmFtIGxvY2FsU2VhdCDooajmg4XlvZLlsZ7nmoTmnKzlnLDluqfkvY1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHBsYXlBY3Qoa2V5OiBzdHJpbmcsIGZXUG9zOiBjYy5WZWMzLCB0V1BvczogY2MuVmVjMywgbG9jYWxTZWF0OiBudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuaW50ZXJhY3RQbGF5Q29tcC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pbnRlcmFjdFBsYXlDb21wLnBsYXlBY3Qoa2V5LCBmV1BvcywgdFdQb3MsIGxvY2FsU2VhdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOeOqeWutmxlYXZl5pe26LCD55So5riF55CG5q2j5Zyo6aOe55qE6KGo5oOFICovXHJcbiAgICBwdWJsaWMgY2xlYXJPbmVPd25lcihvd25lcjogc3RyaW5nKXtcclxuICAgICAgICB0aGlzLmludGVyYWN0UGxheUNvbXAuY2xlYXJPbmVPd25lcihvd25lcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOmAgOWHuuaXtuiwg+eUqCAqL1xyXG4gICAgcHVibGljIGNsZWFyQnlHYW1lKCl7XHJcbiAgICAgICAgaWYgKHRoaXMuaGVhZFRpcHNDb21wICYmIGNjLmlzVmFsaWQodGhpcy5oZWFkVGlwc0NvbXApKXtcclxuICAgICAgICAgICAgdGhpcy5oZWFkVGlwc0NvbXAubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5pbnRlcmFjdFBsYXlDb21wICYmIGNjLmlzVmFsaWQodGhpcy5pbnRlcmFjdFBsYXlDb21wKSl7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJhY3RQbGF5Q29tcC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmludGVyYWN0UGxheUNvbXAuY2xlYXJBbGxPd25lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==