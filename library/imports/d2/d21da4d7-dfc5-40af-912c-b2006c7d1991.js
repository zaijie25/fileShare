"use strict";
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