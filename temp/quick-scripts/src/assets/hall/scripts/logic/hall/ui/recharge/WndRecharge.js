"use strict";
cc._RF.push(module, '43536UHNBVHi48RT/JSWChm', 'WndRecharge');
// hall/scripts/logic/hall/ui/recharge/WndRecharge.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var RechargeModel_1 = require("../../../hallcommon/model/RechargeModel");
var WndBase_1 = require("../../../core/ui/WndBase");
var RechangeView_1 = require("./RechangeView");
var CashView_1 = require("./CashView");
var AppHelper_1 = require("../../../core/tool/AppHelper");
var SceneManager_1 = require("../../../core/scene/SceneManager");
var WndRecharge = /** @class */ (function (_super) {
    __extends(WndRecharge, _super);
    function WndRecharge() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.subViewPath = {
            "rechargeView": "hall/prefabs/ui/Recharge/subView/RechangePanel",
            "cashView": "hall/prefabs/ui/Recharge/subView/CashPanel",
        };
        _this.viewKeyTypeMap = {
            "rechargeView": RechangeView_1.default,
            "cashView": CashView_1.default,
        };
        return _this;
    }
    WndRecharge.prototype.onInit = function () {
        this.name = "WndRecharge";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/RechangeUI";
        this.model = Global.ModelManager.getModel("RechargeModel");
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndRecharge.prototype.onOpen = function () {
        if (AppHelper_1.default.isCash) {
            // this.cashTitle.isChecked =true;
            this.changeToRechargeToggle(false);
            this.changePanel2();
        }
        else {
            // this.rechargeTitle.isChecked =true;
            this.changeToRechargeToggle(true);
            this.changePanel();
        }
        this.model.on(RechargeModel_1.default.ShowWaitingAnim, this, this.showLoading);
    };
    WndRecharge.prototype.initView = function () {
        this.addCommonClick("close", this.close, this);
        this.rechargeTitle = this.getChild("topButton/rechargeTitle");
        this.cashTitle = this.getChild("topButton/cashTitle");
        this.Tipmodel = Global.ModelManager.getModel("RechagreTipModel");
        this.rechargeTitle.on("click", this.changePanel, this);
        this.cashTitle.on("click", this.changePanel2, this);
        this.loadingNode = this.getChild("animLoading");
        this.loadingNode.active = false;
        this.iconSp = this.getComponent("animLoading/icon", cc.Sprite);
        this.initSubViewClass(this.viewKeyTypeMap);
        this.InitScripts();
    };
    WndRecharge.prototype.InitScripts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initSubView(this.subViewPath, this.viewKeyTypeMap, this.getChild("payNode"))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WndRecharge.prototype.showLoading = function (flag, key) {
        this.loadingNode.active = flag;
        if (flag) {
            //除了紫色版本外 其他版本资源需要放到hall/texture/hall/rechargeCash/rechargeCash  中
            if (Global.Setting.SkinConfig.isPurple)
                this.iconSp.spriteFrame = Global.ResourceManager.getSprite("hall/texture/common/icon", Global.Setting.SkinConfig.rechargeIconsCfg[key][2]);
            else {
                Global.ResourceManager.loadAutoAtlas(this.iconSp, "hall/texture/hall/rechargeCash/rechargeCash", Global.Setting.SkinConfig.rechargeIconsCfg[key][2]);
            }
        }
    };
    WndRecharge.prototype.changePanel = function () {
        if (this.rechargeView) {
            this.rechargeView.subViewState = true;
        }
        if (this.cashView) {
            this.cashView.subViewState = false;
        }
        this.changeToRechargeToggle(true);
    };
    WndRecharge.prototype.changeToRechargeToggle = function (yes) {
        var cashCheck = this.cashTitle.getChildByName("check");
        var cashUncheck = this.cashTitle.getChildByName("unchecked");
        var rechargeCheck = this.rechargeTitle.getChildByName("check");
        var rechargeUncheck = this.rechargeTitle.getChildByName("unchecked");
        rechargeCheck.active = yes;
        rechargeUncheck.active = !yes;
        cashCheck.active = !yes;
        cashUncheck.active = yes;
    };
    WndRecharge.prototype.changePanel2 = function () {
        var _this = this;
        if (Global.SceneManager.sceneType == SceneManager_1.SceneType.Game) {
            Global.UI.fastTip("请返回游戏大厅后，再进行提现操作哦！");
            Game.Component.scheduleOnce(function () {
                // this.rechargeTitle.isChecked =true;
                _this.changeToRechargeToggle(true);
                _this.changePanel();
            }, 0.1);
            return;
        }
        if (this.rechargeView) {
            this.rechargeView.subViewState = false;
        }
        if (this.cashView) {
            this.cashView.subViewState = true;
        }
        this.changeToRechargeToggle(false);
    };
    WndRecharge.prototype.onClose = function () {
        //Listener
        this.Tipmodel.flag = false;
        AppHelper_1.default.isCash = false;
        this.model.off(RechargeModel_1.default.ShowWaitingAnim, this, this.showLoading);
    };
    return WndRecharge;
}(WndBase_1.default));
exports.default = WndRecharge;

cc._RF.pop();