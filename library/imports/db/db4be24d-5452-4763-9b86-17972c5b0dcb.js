"use strict";
cc._RF.push(module, 'db4beJNVFJHY5uGF5csWw3L', 'WndTurntableView');
// hall/scripts/logic/hall/ui/Activity/Turntable/WndTurntableView.ts

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
var WndBase_1 = require("../../../../core/ui/WndBase");
var ZhuanpanModel_1 = require("../../../../hallcommon/model/ZhuanpanModel");
var HallPopMsgHelper_1 = require("../../../tool/HallPopMsgHelper");
var ActivityConstants_1 = require("../ActivityConstants");
var TurnTable_1 = require("./TurnTable");
var WndTurntableView = /** @class */ (function (_super) {
    __extends(WndTurntableView, _super);
    function WndTurntableView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 30;
        /**
         * 当前轮播数据索引
         */
        _this.lunboIndex = -1;
        /**
         * 积分文本集合
         */
        _this.labelArr = [];
        /**
         * 子元素 RichText组件集合
         */
        _this.itemArr = new Array();
        /**
         * 轮播遮罩节点
         */
        _this.maskNode = null;
        /**
         * xy坐标和间隔
         */
        _this.xyGapArr = [0, -16, 0, 26];
        _this.subViewPath = {
            "turnTable": "hall/prefabs/ui/luckyDraw/turnTable",
        };
        _this.viewKeyTypeMap = {
            "turnTable": TurnTable_1.default,
        };
        _this.frameTime = 16;
        return _this;
    }
    WndTurntableView.prototype.onInit = function () {
        this.name = "WndTurntableView";
        this.isNeedDelay = false;
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/luckyDraw/turnTableNode";
    };
    WndTurntableView.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("ZhuanpanModel");
        this.model.on(ZhuanpanModel_1.default.RefreshRecordUI, this, this.updateIndex);
        this.model.on(ZhuanpanModel_1.default.RefreshScore, this, this.refreshScore);
        for (var i = 0; i < 5; i++) {
            this.labelArr[i] = this.getComponent("turnTableView/jifen/label_jifen_" + i, cc.Label);
        }
        this.addCommonClick("turnTableView/jifen/btn_rule", this.onRuleBtnClicked, this);
        this.addCommonClick("close", this.close, this);
        this.maskNode = this.getChild("turnTableView/lunbo/mask");
        // var tempItem:cc.RichText = this.getComponent("turnTableView/lunbo/mask/itemRichText",cc.RichText)
        // tempItem.string = "";
        // for(var i = 0; i < 6; i++){
        //     if(i > 0){
        //         tempItem = cc.instantiate(tempItem.node).getComponent(cc.RichText);
        //     }
        //     this.itemArr.push(tempItem);
        //     tempItem.node.setParent(this.maskNode);
        //     tempItem.node.y = this.xyGapArr[1] - i * this.xyGapArr[3];
        // }
        var tempItem = this.getChild("turnTableView/lunbo/mask/lay");
        tempItem.getChildByName("itemRichText1").getComponent(cc.RichText).string = '';
        tempItem.getChildByName("itemRichText2").getComponent(cc.RichText).string = '';
        for (var i = 0; i < 6; i++) {
            if (i > 0) {
                tempItem = cc.instantiate(tempItem);
            }
            this.itemArr.push(tempItem);
            tempItem.setParent(this.maskNode);
            tempItem.y = this.xyGapArr[1] - i * this.xyGapArr[3];
        }
        this.initSubViewClass(this.viewKeyTypeMap);
        this.InitScripts();
    };
    WndTurntableView.prototype.InitScripts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initSubView(this.subViewPath, this.viewKeyTypeMap, this.getChild("turnTableView"))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WndTurntableView.prototype.updateIndex = function (index) {
        this.lunboIndex = index;
    };
    WndTurntableView.prototype.onRuleBtnClicked = function () {
        Global.UI.show("WndTurntableRule");
    };
    WndTurntableView.prototype.refreshScore = function () {
        var data = this.model.data;
        if (!data) {
            return;
        }
        this.labelArr[0].string = "" + data["coin"];
        this.labelArr[1].string = "" + data["week_login_coin"];
        this.labelArr[2].string = "" + data["week_bet_coin"];
        this.labelArr[3].string = "" + data["week_share_coin"];
        this.labelArr[4].string = "" + data["week_share_bet_coin"];
    };
    WndTurntableView.prototype.onOpen = function () {
        this.model.reqActivityCfg();
        this.model.reqLunbo();
        this.turnTable.subViewState = true;
        this.timer = setInterval(this.runCarousel.bind(this), this.frameTime);
    };
    WndTurntableView.prototype.runCarousel = function () {
        var dt = this.frameTime / 1000;
        if (this.lunboIndex < 0) {
            this.UpdateCarouselUI();
            return;
        }
        var dis = dt * this.speed;
        // for(var i = 0; i < this.itemArr.length; i++){
        //     var item:cc.RichText = this.itemArr[i];
        //     item.node.y += dis;
        //     if(item.node.y >= this.xyGapArr[1] + this.xyGapArr[3]){
        //         item.node.y -= this.xyGapArr[3] * 6;
        //         this.UpdateRichText(item);
        //     }
        // }
        for (var i = 0; i < this.itemArr.length; i++) {
            var item = this.itemArr[i];
            item.y += dis;
            if (item.y >= this.xyGapArr[1] + this.xyGapArr[3]) {
                item.y -= this.xyGapArr[3] * 6;
                this.UpdateRichText(item);
            }
        }
    };
    WndTurntableView.prototype.onDispose = function () {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.itemArr = [];
        this.model.off(ZhuanpanModel_1.default.RefreshRecordUI, this, this.updateIndex);
        this.model.off(ZhuanpanModel_1.default.RefreshScore, this, this.refreshScore);
    };
    /**
     * 更新显示
     */
    WndTurntableView.prototype.UpdateCarouselUI = function () {
        var dataArr = this.model.lunboDataArr;
        if (dataArr.length > 0) {
            for (var i = 0; i < this.itemArr.length; i++) {
                var item = this.itemArr[i];
                this.UpdateRichText(item);
            }
        }
    };
    /**
     * 更新单一轮播文本
     * @param item
     */
    WndTurntableView.prototype.UpdateRichText = function (item) {
        var dataArr = this.model.lunboDataArr;
        if (dataArr.length <= 0) {
            return;
        }
        this.lunboIndex++;
        if (this.lunboIndex >= dataArr.length) {
            this.lunboIndex = 0;
        }
        var obj = dataArr[this.lunboIndex];
        var color1 = Global.Setting.SkinConfig.zhuanpanColors[0];
        var color2 = Global.Setting.SkinConfig.zhuanpanColors[1];
        // item.string = "恭喜玩家<color=" + color1 + ">" + obj.name + "</c>，获得<color=" + color2 + ">" + obj.point_name + "</c>";
        item.getChildByName("itemRichText1").getComponent(cc.RichText).string = "恭喜玩家 <color=" + color1 + ">" + obj.name + "</c>";
        item.getChildByName("itemRichText2").getComponent(cc.RichText).string = "获得 <color=" + color2 + ">" + obj.point_name + "</c>";
        if (this.lunboIndex == dataArr.length - 1) {
            //请求新的轮播数据
            this.model.reqLunbo(1000);
        }
    };
    WndTurntableView.prototype.onClose = function () {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        HallPopMsgHelper_1.default.Instance.releaseLock(ActivityConstants_1.ActivityType.zhuanpan);
    };
    return WndTurntableView;
}(WndBase_1.default));
exports.default = WndTurntableView;

cc._RF.pop();