"use strict";
cc._RF.push(module, '47675EVyJ9EBowDe9/vFcfz', 'WndPlayerInfo');
// hall/scripts/logic/hall/ui/playerInfo/WndPlayerInfo.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var PersonalInfoView_1 = require("./PersonalInfoView");
var ChooseHeadView_1 = require("./ChooseHeadView");
var MusicLayerView_1 = require("./MusicLayerView");
var SettingLayerView_1 = require("./SettingLayerView");
var WndPlayerInfo = /** @class */ (function (_super) {
    __extends(WndPlayerInfo, _super);
    function WndPlayerInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 当前页签
         */
        _this.currYeqian = -1;
        /**
         * 页签节点集合
         */
        _this.yeqianArr = [];
        /**
         * 内容节点集合
         */
        _this.contentArr = [];
        _this.subViewPath = {
            "personalInfoView": "hall/prefabs/ui/PlayerInfo/PersonalInfo",
        };
        _this.viewKeyTypeMap = {
            "personalInfoView": PersonalInfoView_1.default,
        };
        return _this;
    }
    /**
     * 初始化脚本
     */
    WndPlayerInfo.prototype.onInit = function () {
        this.name = "WndPlayerInfo";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/PlayerInfo/PlayerInfoUI";
        this.model = Global.ModelManager.getModel("PlayerInfoModel");
    };
    WndPlayerInfo.prototype.onDispose = function () {
        this.internalEvent.off("ChangeView", this, this.ChangeYeqian);
        this.currYeqian = -1;
    };
    /**
     * 初始化UI
     */
    WndPlayerInfo.prototype.initView = function () {
        this.internalEvent.on("ChangeView", this, this.ChangeYeqian);
        this.addCommonClick("bg/close", this.closeBtnFunc, this);
        for (var i = 0; i < 4; i++) {
            var yeqianNode = this.addCommonClick("yeqian/yeqian_" + i, this.yeqianBtnFunc, this);
            this.yeqianArr[i * 2] = cc.find("noSelected", yeqianNode);
            this.yeqianArr[i * 2 + 1] = cc.find("selected", yeqianNode);
            this.contentArr[i] = cc.find("content/content_" + i, this.node);
        }
        this.chooseHeadView = this.addView("ChooseHeadView", this.getChild("content/content_1"), ChooseHeadView_1.default);
        this.musicLayerView = this.addView("MusicLayerView", this.getChild("content/content_2"), MusicLayerView_1.default);
        this.settingLayerView = this.addView("SettingLayerView", this.getChild("content/content_3"), SettingLayerView_1.default);
        this.initSubViewClass(this.viewKeyTypeMap);
        this.InitScripts();
    };
    WndPlayerInfo.prototype.InitScripts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initSubView(this.subViewPath, this.viewKeyTypeMap, this.getChild("content"))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 界面打开回调
     */
    WndPlayerInfo.prototype.onOpen = function () {
        this.ChangeYeqian(0);
        var model = Global.ModelManager.getModel("BindingGiftModel");
        //头像点击事件
        var playerData = Global.PlayerData;
        if (playerData.phone == "" && model.BindAwardNum != 0) {
            Global.UI.show("WndBindingGift");
        }
    };
    /**
     * 界面关闭回调
     */
    WndPlayerInfo.prototype.onClose = function () {
        this.currYeqian = -1;
    };
    /**
     * 关闭按钮点击
     */
    WndPlayerInfo.prototype.closeBtnFunc = function () {
        this.close();
    };
    /**
     * 页签按钮点击
     * @param target
     */
    WndPlayerInfo.prototype.yeqianBtnFunc = function (target) {
        var arr = target.node.name.split("_");
        var param = arr[arr.length - 1];
        var yeqian = parseInt(param);
        this.ChangeYeqian(yeqian);
    };
    /**
     * 切换页签
     * @param yeqian
     */
    WndPlayerInfo.prototype.ChangeYeqian = function (yeqian) {
        if (this.currYeqian != yeqian) {
            this.currYeqian = yeqian;
            this.closeAllSubView();
            switch (this.currYeqian) {
                case 0:
                    this.personalInfoView.subViewState = true;
                    break;
                case 1:
                    this.chooseHeadView.subViewState = true;
                    break;
                case 2:
                    this.musicLayerView.subViewState = true;
                    break;
                case 3:
                    this.settingLayerView.subViewState = true;
                    break;
                default:
                    break;
            }
            this.UpdatBtn();
        }
    };
    /**
     * 更新界面
     */
    WndPlayerInfo.prototype.UpdatBtn = function () {
        for (var i = 0; i < 4; i++) {
            var bShow = (i == this.currYeqian);
            var yeqianNode = this.yeqianArr[i * 2 + 1];
            yeqianNode.active = bShow;
        }
        this.OnDataPrepared();
    };
    return WndPlayerInfo;
}(WndBase_1.default));
exports.default = WndPlayerInfo;

cc._RF.pop();