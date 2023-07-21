
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/WndRecharge.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcV25kUmVjaGFyZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLG9EQUFnRTtBQUNoRSwrQ0FBMEM7QUFDMUMsdUNBQWtDO0FBQ2xDLDBEQUFxRDtBQUVyRCxpRUFBNkQ7QUFFN0Q7SUFBeUMsK0JBQU87SUFBaEQ7UUFBQSxxRUE4SEM7UUFqSFcsaUJBQVcsR0FBUTtZQUN2QixjQUFjLEVBQUMsZ0RBQWdEO1lBQy9ELFVBQVUsRUFBQyw0Q0FBNEM7U0FFMUQsQ0FBQTtRQUVPLG9CQUFjLEdBQVE7WUFDMUIsY0FBYyxFQUFDLHNCQUFZO1lBQzNCLFVBQVUsRUFBQyxrQkFBUTtTQUV0QixDQUFBOztJQXVHTCxDQUFDO0lBdEdhLDRCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7UUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLHFDQUFxQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxLQUFLLEdBQWtCLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQVcsQ0FBQyxJQUFJLENBQUM7SUFDeEMsQ0FBQztJQUNELDRCQUFNLEdBQU47UUFDSSxJQUFJLG1CQUFTLENBQUMsTUFBTSxFQUFFO1lBQ2xCLGtDQUFrQztZQUNsQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3ZCO2FBQUk7WUFDRCxzQ0FBc0M7WUFDdEMsSUFBSSxDQUFD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QVksR0FBRyxJQUFJLENBQUM7U0FDckM7UUFDRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNTLDZCQUFPLEdBQWpCO1FBQ0ksVUFBVTtRQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUMzQixtQkFBUyxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsdUJBQWEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQTlIQSxBQThIQyxDQTlId0MsaUJBQU8sR0E4SC9DIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlY2hhcmdlTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvUmVjaGFyZ2VNb2RlbFwiO1xyXG5pbXBvcnQgV25kQmFzZSwgeyBEZXN0b3J5VHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3VpL1duZEJhc2VcIjtcclxuaW1wb3J0IFJlY2hhbmdlVmlldyBmcm9tIFwiLi9SZWNoYW5nZVZpZXdcIjtcclxuaW1wb3J0IENhc2hWaWV3IGZyb20gXCIuL0Nhc2hWaWV3XCI7XHJcbmltcG9ydCBBcHBIZWxwZXIgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdG9vbC9BcHBIZWxwZXJcIjtcclxuaW1wb3J0IFJlY2hhZ3JlVGlwTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvUmVjaGFncmVUaXBNb2RlbFwiO1xyXG5pbXBvcnQgeyBTY2VuZVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zY2VuZS9TY2VuZU1hbmFnZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZFJlY2hhcmdlIGV4dGVuZHMgV25kQmFzZXtcclxuICAgIHB1YmxpYyByZWNoYXJnZVZpZXc6IFJlY2hhbmdlVmlldztcclxuICAgIHByaXZhdGUgY2FzaFZpZXc6IENhc2hWaWV3O1xyXG4gICAgcmVjaGFyZ2VUaXRsZTogY2MuTm9kZVxyXG4gICAgY2FzaFRpdGxlOiBjYy5Ob2RlXHJcbiAgICByZWNoYXJnZVBhbmVsOiBjYy5Ob2RlO1xyXG4gICAgY2FzaFBhbmVsOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBtb2RlbDogUmVjaGFyZ2VNb2RlbDtcclxuICAgIHByaXZhdGUgbG9hZGluZ05vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGljb25TcDogY2MuU3ByaXRlO1xyXG4gICAgVGlwbW9kZWw6IFJlY2hhZ3JlVGlwTW9kZWw7XHJcblxyXG5cclxuICAgIHByaXZhdGUgc3ViVmlld1BhdGggOmFueSA9IHtcclxuICAgICAgICBcInJlY2hhcmdlVmlld1wiOlwiaGFsbC9wcmVmYWJzL3VpL1JlY2hhcmdlL3N1YlZpZXcvUmVjaGFuZ2VQYW5lbFwiLFxyXG4gICAgICAgIFwiY2FzaFZpZXdcIjpcImhhbGwvcHJlZmFicy91aS9SZWNoYXJnZS9zdWJWaWV3L0Nhc2hQYW5lbFwiLFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmlld0tleVR5cGVNYXAgOmFueSA9IHtcclxuICAgICAgICBcInJlY2hhcmdlVmlld1wiOlJlY2hhbmdlVmlldyxcclxuICAgICAgICBcImNhc2hWaWV3XCI6Q2FzaFZpZXcsXHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRSZWNoYXJnZVwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvUmVjaGFyZ2UvUmVjaGFuZ2VVSVwiO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSA8UmVjaGFyZ2VNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUmVjaGFyZ2VNb2RlbFwiKTtcclxuICAgICAgICB0aGlzLmRlc3RvcnlUeXBlID0gRGVzdG9yeVR5cGUuTm9uZTtcclxuICAgIH1cclxuICAgIG9uT3Blbigpe1xyXG4gICAgICAgIGlmIChBcHBIZWxwZXIuaXNDYXNoKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuY2FzaFRpdGxlLmlzQ2hlY2tlZCA9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUb1JlY2hhcmdlVG9nZ2xlKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYW5lbDIoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gdGhpcy5yZWNoYXJnZVRpdGxlLmlzQ2hlY2tlZCA9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUb1JlY2hhcmdlVG9nZ2xlKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVBhbmVsKClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb2RlbC5vbihSZWNoYXJnZU1vZGVsLlNob3dXYWl0aW5nQW5pbSwgdGhpcywgdGhpcy5zaG93TG9hZGluZyk7IFxyXG4gICAgfVxyXG4gICBcclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJjbG9zZVwiLHRoaXMuY2xvc2UsdGhpcyk7XHJcbiAgICAgICAgdGhpcy5yZWNoYXJnZVRpdGxlID0gdGhpcy5nZXRDaGlsZChcInRvcEJ1dHRvbi9yZWNoYXJnZVRpdGxlXCIpO1xyXG4gICAgICAgIHRoaXMuY2FzaFRpdGxlID0gdGhpcy5nZXRDaGlsZChcInRvcEJ1dHRvbi9jYXNoVGl0bGVcIik7XHJcbiAgICAgICAgdGhpcy5UaXBtb2RlbCA9IDxSZWNoYWdyZVRpcE1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJSZWNoYWdyZVRpcE1vZGVsXCIpO1xyXG4gICAgICAgIHRoaXMucmVjaGFyZ2VUaXRsZS5vbihcImNsaWNrXCIsdGhpcy5jaGFuZ2VQYW5lbCx0aGlzKTtcclxuICAgICAgICB0aGlzLmNhc2hUaXRsZS5vbihcImNsaWNrXCIsdGhpcy5jaGFuZ2VQYW5lbDIsdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGluZ05vZGUgPSB0aGlzLmdldENoaWxkKFwiYW5pbUxvYWRpbmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuaWNvblNwID0gPGNjLlNwcml0ZT50aGlzLmdldENvbXBvbmVudChcImFuaW1Mb2FkaW5nL2ljb25cIiwgY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLmluaXRTdWJWaWV3Q2xhc3ModGhpcy52aWV3S2V5VHlwZU1hcClcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLkluaXRTY3JpcHRzKClcclxuICAgIH1cclxuXHJcblxyXG4gICAgYXN5bmMgSW5pdFNjcmlwdHMoKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5pbml0U3ViVmlldyh0aGlzLnN1YlZpZXdQYXRoLHRoaXMudmlld0tleVR5cGVNYXAsdGhpcy5nZXRDaGlsZChcInBheU5vZGVcIikpXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNob3dMb2FkaW5nKGZsYWc6IGJvb2xlYW4sIGtleT86IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nTm9kZS5hY3RpdmUgPSBmbGFnO1xyXG4gICAgICAgIGlmIChmbGFnKXtcclxuICAgICAgICAgICAgLy/pmaTkuobntKvoibLniYjmnKzlpJYg5YW25LuW54mI5pys6LWE5rqQ6ZyA6KaB5pS+5YiwaGFsbC90ZXh0dXJlL2hhbGwvcmVjaGFyZ2VDYXNoL3JlY2hhcmdlQ2FzaCAg5LitXHJcbiAgICAgICAgICAgIGlmKEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuaXNQdXJwbGUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmljb25TcC5zcHJpdGVGcmFtZSA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0U3ByaXRlKFwiaGFsbC90ZXh0dXJlL2NvbW1vbi9pY29uXCIsIEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcucmVjaGFyZ2VJY29uc0NmZ1trZXldWzJdKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXModGhpcy5pY29uU3AsIFwiaGFsbC90ZXh0dXJlL2hhbGwvcmVjaGFyZ2VDYXNoL3JlY2hhcmdlQ2FzaFwiLCBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLnJlY2hhcmdlSWNvbnNDZmdba2V5XVsyXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUGFuZWwoKXtcclxuICAgICAgICBpZih0aGlzLnJlY2hhcmdlVmlldylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjaGFyZ2VWaWV3LnN1YlZpZXdTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY2FzaFZpZXcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNhc2hWaWV3LnN1YlZpZXdTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoYW5nZVRvUmVjaGFyZ2VUb2dnbGUodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlVG9SZWNoYXJnZVRvZ2dsZSh5ZXM6Ym9vbGVhbil7XHJcbiAgICAgICAgbGV0IGNhc2hDaGVjayA9IHRoaXMuY2FzaFRpdGxlLmdldENoaWxkQnlOYW1lKFwiY2hlY2tcIikgYXMgY2MuTm9kZTtcclxuICAgICAgICBsZXQgY2FzaFVuY2hlY2sgPSB0aGlzLmNhc2hUaXRsZS5nZXRDaGlsZEJ5TmFtZShcInVuY2hlY2tlZFwiKSBhcyBjYy5Ob2RlO1xyXG4gICAgICAgIGxldCByZWNoYXJnZUNoZWNrID0gdGhpcy5yZWNoYXJnZVRpdGxlLmdldENoaWxkQnlOYW1lKFwiY2hlY2tcIikgYXMgY2MuTm9kZTtcclxuICAgICAgICBsZXQgcmVjaGFyZ2VVbmNoZWNrID0gdGhpcy5yZWNoYXJnZVRpdGxlLmdldENoaWxkQnlOYW1lKFwidW5jaGVja2VkXCIpIGFzIGNjLk5vZGU7XHJcbiAgICAgICAgcmVjaGFyZ2VDaGVjay5hY3RpdmUgPSB5ZXM7XHJcbiAgICAgICAgcmVjaGFyZ2VVbmNoZWNrLmFjdGl2ZSA9ICF5ZXM7XHJcbiAgICAgICAgY2FzaENoZWNrLmFjdGl2ZSA9ICF5ZXM7XHJcbiAgICAgICAgY2FzaFVuY2hlY2suYWN0aXZlID0geWVzO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVBhbmVsMigpe1xyXG4gICAgICAgIGlmIChHbG9iYWwuU2NlbmVNYW5hZ2VyLnNjZW5lVHlwZSA9PSBTY2VuZVR5cGUuR2FtZSkge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuivt+i/lOWbnua4uOaIj+Wkp+WOheWQju+8jOWGjei/m+ihjOaPkOeOsOaTjeS9nOWTpu+8gVwiKTtcclxuICAgICAgICAgICAgR2FtZS5Db21wb25lbnQuc2NoZWR1bGVPbmNlKCgpPT57XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnJlY2hhcmdlVGl0bGUuaXNDaGVja2VkID10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VUb1JlY2hhcmdlVG9nZ2xlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYW5lbCgpXHJcbiAgICAgICAgICAgIH0sMC4xKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMucmVjaGFyZ2VWaWV3KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5yZWNoYXJnZVZpZXcuc3ViVmlld1N0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY2FzaFZpZXcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNhc2hWaWV3LnN1YlZpZXdTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hhbmdlVG9SZWNoYXJnZVRvZ2dsZShmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25DbG9zZSgpe1xyXG4gICAgICAgIC8vTGlzdGVuZXJcclxuICAgICAgICB0aGlzLlRpcG1vZGVsLmZsYWcgPSBmYWxzZTtcclxuICAgICAgICBBcHBIZWxwZXIuaXNDYXNoPWZhbHNlO1xyXG4gICAgICAgIHRoaXMubW9kZWwub2ZmKFJlY2hhcmdlTW9kZWwuU2hvd1dhaXRpbmdBbmltLCB0aGlzLCB0aGlzLnNob3dMb2FkaW5nKTsgXHJcbiAgICB9XHJcbn0gICAgIl19