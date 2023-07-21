
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/playerInfo/WndPlayerInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxwbGF5ZXJJbmZvXFxXbmRQbGF5ZXJJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUErQztBQUcvQyx1REFBa0Q7QUFDbEQsbURBQThDO0FBQzlDLG1EQUE4QztBQUM5Qyx1REFBa0Q7QUFFbEQ7SUFBMkMsaUNBQU87SUFBbEQ7UUFBQSxxRUEwSkM7UUE1SUc7O1dBRUc7UUFDSCxnQkFBVSxHQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCOztXQUVHO1FBQ0gsZUFBUyxHQUFhLEVBQUUsQ0FBQztRQUN6Qjs7V0FFRztRQUNILGdCQUFVLEdBQWEsRUFBRSxDQUFDO1FBRWxCLGlCQUFXLEdBQVE7WUFDdkIsa0JBQWtCLEVBQUMseUNBQXlDO1NBRS9ELENBQUE7UUFFTyxvQkFBYyxHQUFRO1lBQzFCLGtCQUFrQixFQUFDLDBCQUFnQjtTQUN0QyxDQUFBOztJQXdITCxDQUFDO0lBdEhHOztPQUVHO0lBQ08sOEJBQU0sR0FBaEI7UUFFSSxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcseUNBQXlDLENBQUM7UUFDekQsSUFBSSxDQUFDLEtBQUssR0FBb0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsaUNBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQzNELElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUVEOztPQUVHO0lBQ08sZ0NBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtRQUMxRCxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDdEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVyRixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFNUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkU7UUFDRCxJQUFJLENBQUMsY0FBYyxHQUFtQixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRSx3QkFBYyxDQUFDLENBQUM7UUFDekgsSUFBSSxDQUFDLGNBQWMsR0FBbUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsd0JBQWMsQ0FBQyxDQUFDO1FBQ3pILElBQUksQ0FBQyxnQkFBZ0IsR0FBcUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsMEJBQWdCLENBQUMsQ0FBQztRQUNqSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQzFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUN0QixDQUFDO0lBRUssbUNBQVcsR0FBakI7Ozs7NEJBQ0kscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLElBQUksQ0FBQyxjQUFjLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFBOzt3QkFBckYsU0FBcUYsQ0FBQTs7Ozs7S0FDeEY7SUFFRDs7T0FFRztJQUNPLDhCQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLEtBQUssR0FBcUIsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMvRSxRQUFRO1FBQ1IsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUNuQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRSxJQUFJLEtBQUssQ0FBQyxZQUFZLElBQUksQ0FBQyxFQUFFO1lBQ25ELE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBQ0Q7O09BRUc7SUFDTywrQkFBTyxHQUFqQjtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ssb0NBQVksR0FBcEI7UUFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7T0FHRztJQUNILHFDQUFhLEdBQWIsVUFBYyxNQUFNO1FBQ2hCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsb0NBQVksR0FBWixVQUFhLE1BQWM7UUFDdkIsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLE1BQU0sRUFBRTtZQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztZQUN6QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7WUFDdEIsUUFBUSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNyQixLQUFLLENBQUM7b0JBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7b0JBQ3pDLE1BQU07Z0JBQ1YsS0FBSyxDQUFDO29CQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTtvQkFDdkMsTUFBTTtnQkFDVixLQUFLLENBQUM7b0JBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO29CQUN2QyxNQUFLO2dCQUNULEtBQUssQ0FBQztvQkFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTtvQkFDekMsTUFBSztnQkFDVDtvQkFDSSxNQUFNO2FBQ2I7WUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQ0FBUSxHQUFSO1FBQ0ksS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQztZQUN0QixJQUFJLEtBQUssR0FBVyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDM0MsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzNDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO0lBQ3pCLENBQUM7SUFDTCxvQkFBQztBQUFELENBMUpBLEFBMEpDLENBMUowQyxpQkFBTyxHQTBKakQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBQbGF5ZXJJbmZvTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvUGxheWVySW5mb01vZGVsXCI7XHJcbmltcG9ydCBCaW5kaW5nR2lmdE1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0JpbmRpbmdHaWZ0TW9kZWxcIjtcclxuaW1wb3J0IFBlcnNvbmFsSW5mb1ZpZXcgZnJvbSBcIi4vUGVyc29uYWxJbmZvVmlld1wiO1xyXG5pbXBvcnQgQ2hvb3NlSGVhZFZpZXcgZnJvbSBcIi4vQ2hvb3NlSGVhZFZpZXdcIjtcclxuaW1wb3J0IE11c2ljTGF5ZXJWaWV3IGZyb20gXCIuL011c2ljTGF5ZXJWaWV3XCI7XHJcbmltcG9ydCBTZXR0aW5nTGF5ZXJWaWV3IGZyb20gXCIuL1NldHRpbmdMYXllclZpZXdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZFBsYXllckluZm8gZXh0ZW5kcyBXbmRCYXNle1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pWw5o2u5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbW9kZWw6IFBsYXllckluZm9Nb2RlbDtcclxuXHJcbiAgICBwcml2YXRlIHBlcnNvbmFsSW5mb1ZpZXc6UGVyc29uYWxJbmZvVmlld1xyXG5cclxuICAgIHByaXZhdGUgY2hvb3NlSGVhZFZpZXc6Q2hvb3NlSGVhZFZpZXdcclxuXHJcbiAgICBwcml2YXRlIG11c2ljTGF5ZXJWaWV3Ok11c2ljTGF5ZXJWaWV3XHJcblxyXG4gICAgcHJpdmF0ZSBzZXR0aW5nTGF5ZXJWaWV3OlNldHRpbmdMYXllclZpZXdcclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN6aG1562+XHJcbiAgICAgKi9cclxuICAgIGN1cnJZZXFpYW46bnVtYmVyID0gLTE7XHJcbiAgICAvKipcclxuICAgICAqIOmhteetvuiKgueCuembhuWQiFxyXG4gICAgICovXHJcbiAgICB5ZXFpYW5BcnI6Y2MuTm9kZVtdID0gW107XHJcbiAgICAvKipcclxuICAgICAqIOWGheWuueiKgueCuembhuWQiFxyXG4gICAgICovXHJcbiAgICBjb250ZW50QXJyOmNjLk5vZGVbXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgc3ViVmlld1BhdGggOmFueSA9IHtcclxuICAgICAgICBcInBlcnNvbmFsSW5mb1ZpZXdcIjpcImhhbGwvcHJlZmFicy91aS9QbGF5ZXJJbmZvL1BlcnNvbmFsSW5mb1wiLFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdmlld0tleVR5cGVNYXAgOmFueSA9IHtcclxuICAgICAgICBcInBlcnNvbmFsSW5mb1ZpZXdcIjpQZXJzb25hbEluZm9WaWV3LFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW6ISa5pysXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkluaXQoKSB7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZFBsYXllckluZm9cIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlBvcExheWVyO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1BsYXllckluZm8vUGxheWVySW5mb1VJXCI7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IDxQbGF5ZXJJbmZvTW9kZWw+R2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlBsYXllckluZm9Nb2RlbFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc3Bvc2UoKXtcclxuICAgICAgICB0aGlzLmludGVybmFsRXZlbnQub2ZmKFwiQ2hhbmdlVmlld1wiLHRoaXMsdGhpcy5DaGFuZ2VZZXFpYW4pXHJcbiAgICAgICAgdGhpcy5jdXJyWWVxaWFuID0gLTFcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMllVJXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLmludGVybmFsRXZlbnQub24oXCJDaGFuZ2VWaWV3XCIsdGhpcyx0aGlzLkNoYW5nZVllcWlhbilcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYmcvY2xvc2VcIiwgdGhpcy5jbG9zZUJ0bkZ1bmMsIHRoaXMpO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCA0OyBpKyspe1xyXG4gICAgICAgICAgICB2YXIgeWVxaWFuTm9kZSA9IHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJ5ZXFpYW4veWVxaWFuX1wiICsgaSwgdGhpcy55ZXFpYW5CdG5GdW5jLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMueWVxaWFuQXJyW2kgKiAyXSA9IGNjLmZpbmQoXCJub1NlbGVjdGVkXCIsIHllcWlhbk5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLnllcWlhbkFycltpICogMiArIDFdID0gY2MuZmluZChcInNlbGVjdGVkXCIsIHllcWlhbk5vZGUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb250ZW50QXJyW2ldID0gY2MuZmluZChcImNvbnRlbnQvY29udGVudF9cIiArIGksIHRoaXMubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hvb3NlSGVhZFZpZXcgPSA8Q2hvb3NlSGVhZFZpZXc+dGhpcy5hZGRWaWV3KFwiQ2hvb3NlSGVhZFZpZXdcIiwgdGhpcy5nZXRDaGlsZChcImNvbnRlbnQvY29udGVudF8xXCIpLCBDaG9vc2VIZWFkVmlldyk7XHJcbiAgICAgICAgdGhpcy5tdXNpY0xheWVyVmlldyA9IDxNdXNpY0xheWVyVmlldz50aGlzLmFkZFZpZXcoXCJNdXNpY0xheWVyVmlld1wiLCB0aGlzLmdldENoaWxkKFwiY29udGVudC9jb250ZW50XzJcIiksIE11c2ljTGF5ZXJWaWV3KTtcclxuICAgICAgICB0aGlzLnNldHRpbmdMYXllclZpZXcgPSA8U2V0dGluZ0xheWVyVmlldz50aGlzLmFkZFZpZXcoXCJTZXR0aW5nTGF5ZXJWaWV3XCIsIHRoaXMuZ2V0Q2hpbGQoXCJjb250ZW50L2NvbnRlbnRfM1wiKSwgU2V0dGluZ0xheWVyVmlldyk7XHJcbiAgICAgICAgdGhpcy5pbml0U3ViVmlld0NsYXNzKHRoaXMudmlld0tleVR5cGVNYXApXHJcbiAgICAgICAgdGhpcy5Jbml0U2NyaXB0cygpXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgSW5pdFNjcmlwdHMoKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5pbml0U3ViVmlldyh0aGlzLnN1YlZpZXdQYXRoLHRoaXMudmlld0tleVR5cGVNYXAsdGhpcy5nZXRDaGlsZChcImNvbnRlbnRcIikpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlYzpnaLmiZPlvIDlm57osINcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uT3Blbigpe1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlWWVxaWFuKDApO1xyXG4gICAgICAgIHZhciBtb2RlbCA9IDxCaW5kaW5nR2lmdE1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJCaW5kaW5nR2lmdE1vZGVsXCIpO1xyXG4gICAgICAgIC8v5aS05YOP54K55Ye75LqL5Lu2XHJcbiAgICAgICAgbGV0IHBsYXllckRhdGEgPSBHbG9iYWwuUGxheWVyRGF0YTtcclxuICAgICAgICBpZiAocGxheWVyRGF0YS5waG9uZSA9PSBcIlwiICYmIG1vZGVsLkJpbmRBd2FyZE51bSAhPSAwKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kQmluZGluZ0dpZnRcIik7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog55WM6Z2i5YWz6Zet5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKCl7XHJcbiAgICAgICAgdGhpcy5jdXJyWWVxaWFuID0gLTFcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFs+mXreaMiemSrueCueWHu1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNsb3NlQnRuRnVuYygpe1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmhteetvuaMiemSrueCueWHu1xyXG4gICAgICogQHBhcmFtIHRhcmdldCBcclxuICAgICAqL1xyXG4gICAgeWVxaWFuQnRuRnVuYyh0YXJnZXQpe1xyXG4gICAgICAgIHZhciBhcnIgPSB0YXJnZXQubm9kZS5uYW1lLnNwbGl0KFwiX1wiKTtcclxuICAgICAgICB2YXIgcGFyYW0gPSBhcnJbYXJyLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIHZhciB5ZXFpYW4gPSBwYXJzZUludChwYXJhbSk7XHJcblxyXG4gICAgICAgIHRoaXMuQ2hhbmdlWWVxaWFuKHllcWlhbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliIfmjaLpobXnrb5cclxuICAgICAqIEBwYXJhbSB5ZXFpYW4gXHJcbiAgICAgKi9cclxuICAgIENoYW5nZVllcWlhbih5ZXFpYW46IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJZZXFpYW4gIT0geWVxaWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VyclllcWlhbiA9IHllcWlhbjtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZUFsbFN1YlZpZXcoKVxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY3VyclllcWlhbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVyc29uYWxJbmZvVmlldy5zdWJWaWV3U3RhdGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaG9vc2VIZWFkVmlldy5zdWJWaWV3U3RhdGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tdXNpY0xheWVyVmlldy5zdWJWaWV3U3RhdGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdMYXllclZpZXcuc3ViVmlld1N0YXRlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRCdG4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrDnlYzpnaJcclxuICAgICAqL1xyXG4gICAgVXBkYXRCdG4oKXtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgNDsgaSsrKXtcclxuICAgICAgICAgICAgdmFyIGJTaG93OmJvb2xlYW4gPSAoaSA9PSB0aGlzLmN1cnJZZXFpYW4pO1xyXG4gICAgICAgICAgICB2YXIgeWVxaWFuTm9kZSA9IHRoaXMueWVxaWFuQXJyW2kgKiAyICsgMV07XHJcbiAgICAgICAgICAgIHllcWlhbk5vZGUuYWN0aXZlID0gYlNob3c7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuT25EYXRhUHJlcGFyZWQoKVxyXG4gICAgfVxyXG59Il19