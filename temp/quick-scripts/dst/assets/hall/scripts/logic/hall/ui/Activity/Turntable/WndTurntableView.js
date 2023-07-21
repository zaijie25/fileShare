
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Activity/Turntable/WndTurntableView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxBY3Rpdml0eVxcVHVybnRhYmxlXFxXbmRUdXJudGFibGVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUFrRDtBQUNsRCw0RUFBdUU7QUFDdkUsbUVBQThEO0FBQzlELDBEQUFvRDtBQUNwRCx5Q0FBb0M7QUFFcEM7SUFBOEMsb0NBQU87SUFBckQ7UUFBQSxxRUEyTkM7UUFuTkcsV0FBSyxHQUFVLEVBQUUsQ0FBQztRQUNsQjs7V0FFRztRQUNILGdCQUFVLEdBQVUsQ0FBQyxDQUFDLENBQUM7UUFDdkI7O1dBRUc7UUFDSCxjQUFRLEdBQWMsRUFBRSxDQUFDO1FBRXpCOztXQUVHO1FBQ0gsYUFBTyxHQUFvQixJQUFJLEtBQUssRUFBRSxDQUFDO1FBRXZDOztXQUVHO1FBQ0gsY0FBUSxHQUFXLElBQUksQ0FBQztRQUV4Qjs7V0FFRztRQUNILGNBQVEsR0FBWSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFNUIsaUJBQVcsR0FBUTtZQUN2QixXQUFXLEVBQUMscUNBQXFDO1NBQ3BELENBQUE7UUFFTyxvQkFBYyxHQUFRO1lBQzFCLFdBQVcsRUFBQyxtQkFBUztTQUN4QixDQUFBO1FBSUQsZUFBUyxHQUFXLEVBQUUsQ0FBQzs7SUFnTDNCLENBQUM7SUE5S2EsaUNBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLGtCQUFrQixDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFBO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyx5Q0FBeUMsQ0FBQTtJQUM1RCxD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QWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxxSEFBcUg7UUFDckgsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxjQUFjLEdBQUcsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUMxSCxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLFlBQVksR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBRTlILElBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQztZQUNyQyxVQUFVO1lBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBR1Msa0NBQU8sR0FBakI7UUFFSSxJQUFHLElBQUksQ0FBQyxLQUFLLEVBQ2I7WUFDSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1NBQ3BCO1FBQ0QsMEJBQWdCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxnQ0FBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFJTCx1QkFBQztBQUFELENBM05BLEFBMk5DLENBM042QyxpQkFBTyxHQTJOcEQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV25kQmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcbmltcG9ydCBaaHVhbnBhbk1vZGVsIGZyb20gXCIuLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1podWFucGFuTW9kZWxcIjtcclxuaW1wb3J0IEhhbGxQb3BNc2dIZWxwZXIgZnJvbSBcIi4uLy4uLy4uL3Rvb2wvSGFsbFBvcE1zZ0hlbHBlclwiO1xyXG5pbXBvcnQgeyBBY3Rpdml0eVR5cGUgfSBmcm9tIFwiLi4vQWN0aXZpdHlDb25zdGFudHNcIjtcclxuaW1wb3J0IFR1cm5UYWJsZSBmcm9tIFwiLi9UdXJuVGFibGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFduZFR1cm50YWJsZVZpZXcgZXh0ZW5kcyBXbmRCYXNlIFxyXG57XHJcblxyXG5cclxuICAgIHByaXZhdGUgbW9kZWwgOlpodWFucGFuTW9kZWxcclxuXHJcbiAgICBwcml2YXRlIHR1cm5UYWJsZTpUdXJuVGFibGVcclxuXHJcbiAgICBzcGVlZDpudW1iZXIgPSAzMDtcclxuICAgIC8qKlxyXG4gICAgICog5b2T5YmN6L2u5pKt5pWw5o2u57Si5byVXHJcbiAgICAgKi9cclxuICAgIGx1bmJvSW5kZXg6bnVtYmVyID0gLTE7XHJcbiAgICAvKipcclxuICAgICAqIOenr+WIhuaWh+acrOmbhuWQiFxyXG4gICAgICovXHJcbiAgICBsYWJlbEFycjpjYy5MYWJlbFtdID0gW107XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5a2Q5YWD57SgIFJpY2hUZXh057uE5Lu26ZuG5ZCIIFxyXG4gICAgICovXHJcbiAgICBpdGVtQXJyIDogQXJyYXk8Y2MuTm9kZT4gPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi9ruaSremBrue9qeiKgueCuVxyXG4gICAgICovXHJcbiAgICBtYXNrTm9kZTpjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHh55Z2Q5qCH5ZKM6Ze06ZqUXHJcbiAgICAgKi9cclxuICAgIHh5R2FwQXJyOm51bWJlcltdID0gWzAsIC0xNiwgMCwgMjZdO1xyXG5cclxuICAgIHByaXZhdGUgc3ViVmlld1BhdGggOmFueSA9IHtcclxuICAgICAgICBcInR1cm5UYWJsZVwiOlwiaGFsbC9wcmVmYWJzL3VpL2x1Y2t5RHJhdy90dXJuVGFibGVcIixcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZpZXdLZXlUeXBlTWFwIDphbnkgPSB7XHJcbiAgICAgICAgXCJ0dXJuVGFibGVcIjpUdXJuVGFibGUsXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0aW1lciA6IE5vZGVKUy5UaW1lb3V0XHJcblxyXG4gICAgZnJhbWVUaW1lOiBudW1iZXIgPSAxNjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJXbmRUdXJudGFibGVWaWV3XCI7XHJcbiAgICAgICAgdGhpcy5pc05lZWREZWxheSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5sYXllciA9IEdsb2JhbC5VSS5Qb3BMYXllcjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9sdWNreURyYXcvdHVyblRhYmxlTm9kZVwiXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IEdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJaaHVhbnBhbk1vZGVsXCIpXHJcblxyXG4gICAgICAgIHRoaXMubW9kZWwub24oWmh1YW5wYW5Nb2RlbC5SZWZyZXNoUmVjb3JkVUksdGhpcyx0aGlzLnVwZGF0ZUluZGV4KVxyXG4gICAgICAgIHRoaXMubW9kZWwub24oWmh1YW5wYW5Nb2RlbC5SZWZyZXNoU2NvcmUsdGhpcyx0aGlzLnJlZnJlc2hTY29yZSlcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgNTsgaSsrKXtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbEFycltpXSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwidHVyblRhYmxlVmlldy9qaWZlbi9sYWJlbF9qaWZlbl9cIiArIGksY2MuTGFiZWwpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJ0dXJuVGFibGVWaWV3L2ppZmVuL2J0bl9ydWxlXCIsdGhpcy5vblJ1bGVCdG5DbGlja2VkLHRoaXMpXHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImNsb3NlXCIsdGhpcy5jbG9zZSx0aGlzKVxyXG5cclxuICAgICAgICB0aGlzLm1hc2tOb2RlID10aGlzLmdldENoaWxkKFwidHVyblRhYmxlVmlldy9sdW5iby9tYXNrXCIpO1xyXG4gICAgICAgIC8vIHZhciB0ZW1wSXRlbTpjYy5SaWNoVGV4dCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwidHVyblRhYmxlVmlldy9sdW5iby9tYXNrL2l0ZW1SaWNoVGV4dFwiLGNjLlJpY2hUZXh0KVxyXG4gICAgICAgIC8vIHRlbXBJdGVtLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgLy8gZm9yKHZhciBpID0gMDsgaSA8IDY7IGkrKyl7XHJcbiAgICAgICAgLy8gICAgIGlmKGkgPiAwKXtcclxuICAgICAgICAvLyAgICAgICAgIHRlbXBJdGVtID0gY2MuaW5zdGFudGlhdGUodGVtcEl0ZW0ubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KTtcclxuICAgICAgICAvLyAgICAgfVxyXG5cclxuICAgICAgICAvLyAgICAgdGhpcy5pdGVtQXJyLnB1c2godGVtcEl0ZW0pO1xyXG4gICAgICAgIC8vICAgICB0ZW1wSXRlbS5ub2RlLnNldFBhcmVudCh0aGlzLm1hc2tOb2RlKTtcclxuICAgICAgICAvLyAgICAgdGVtcEl0ZW0ubm9kZS55ID0gdGhpcy54eUdhcEFyclsxXSAtIGkgKiB0aGlzLnh5R2FwQXJyWzNdO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB2YXIgdGVtcEl0ZW09IHRoaXMuZ2V0Q2hpbGQoXCJ0dXJuVGFibGVWaWV3L2x1bmJvL21hc2svbGF5XCIpXHJcbiAgICAgICAgdGVtcEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtUmljaFRleHQxXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nPScnXHJcbiAgICAgICAgdGVtcEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtUmljaFRleHQyXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nPScnXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IDY7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGkgPiAwKXtcclxuICAgICAgICAgICAgICAgIHRlbXBJdGVtID0gY2MuaW5zdGFudGlhdGUodGVtcEl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLml0ZW1BcnIucHVzaCh0ZW1wSXRlbSk7XHJcbiAgICAgICAgICAgIHRlbXBJdGVtLnNldFBhcmVudCh0aGlzLm1hc2tOb2RlKTtcclxuICAgICAgICAgICAgdGVtcEl0ZW0ueSA9IHRoaXMueHlHYXBBcnJbMV0gLSBpICogdGhpcy54eUdhcEFyclszXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbml0U3ViVmlld0NsYXNzKHRoaXMudmlld0tleVR5cGVNYXApXHJcbiAgICAgICAgdGhpcy5Jbml0U2NyaXB0cygpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIEluaXRTY3JpcHRzKCkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuaW5pdFN1YlZpZXcodGhpcy5zdWJWaWV3UGF0aCx0aGlzLnZpZXdLZXlUeXBlTWFwLHRoaXMuZ2V0Q2hpbGQoXCJ0dXJuVGFibGVWaWV3XCIpKVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUluZGV4KGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5sdW5ib0luZGV4ID0gaW5kZXhcclxuICAgIH1cclxuICAgIG9uUnVsZUJ0bkNsaWNrZWQoKSB7XHJcbiAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRUdXJudGFibGVSdWxlXCIpXHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaFNjb3JlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgZGF0YSA9dGhpcy5tb2RlbC5kYXRhO1xyXG4gICAgICAgIGlmKCFkYXRhKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhYmVsQXJyWzBdLnN0cmluZyA9IFwiXCIgKyBkYXRhW1wiY29pblwiXTtcclxuICAgICAgICB0aGlzLmxhYmVsQXJyWzFdLnN0cmluZyA9IFwiXCIgKyBkYXRhW1wid2Vla19sb2dpbl9jb2luXCJdO1xyXG4gICAgICAgIHRoaXMubGFiZWxBcnJbMl0uc3RyaW5nID0gXCJcIiArIGRhdGFbXCJ3ZWVrX2JldF9jb2luXCJdO1xyXG4gICAgICAgIHRoaXMubGFiZWxBcnJbM10uc3RyaW5nID0gXCJcIiArIGRhdGFbXCJ3ZWVrX3NoYXJlX2NvaW5cIl07XHJcbiAgICAgICAgdGhpcy5sYWJlbEFycls0XS5zdHJpbmcgPSBcIlwiICsgZGF0YVtcIndlZWtfc2hhcmVfYmV0X2NvaW5cIl07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbk9wZW4oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubW9kZWwucmVxQWN0aXZpdHlDZmcoKVxyXG4gICAgICAgIHRoaXMubW9kZWwucmVxTHVuYm8oKVxyXG4gICAgICAgIHRoaXMudHVyblRhYmxlLnN1YlZpZXdTdGF0ZSA9IHRydWVcclxuICAgICAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwodGhpcy5ydW5DYXJvdXNlbC5iaW5kKHRoaXMpLHRoaXMuZnJhbWVUaW1lKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBydW5DYXJvdXNlbCgpIHtcclxuICAgICAgICBsZXQgZHQgPSB0aGlzLmZyYW1lVGltZSAvIDEwMDBcclxuICAgICAgICBpZih0aGlzLmx1bmJvSW5kZXggPCAwKXtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVDYXJvdXNlbFVJKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRpcyA9IGR0ICogdGhpcy5zcGVlZDtcclxuICAgICAgICAvLyBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAvLyAgICAgdmFyIGl0ZW06Y2MuUmljaFRleHQgPSB0aGlzLml0ZW1BcnJbaV07XHJcbiAgICAgICAgLy8gICAgIGl0ZW0ubm9kZS55ICs9IGRpcztcclxuICAgICAgICAvLyAgICAgaWYoaXRlbS5ub2RlLnkgPj0gdGhpcy54eUdhcEFyclsxXSArIHRoaXMueHlHYXBBcnJbM10pe1xyXG4gICAgICAgIC8vICAgICAgICAgaXRlbS5ub2RlLnkgLT0gdGhpcy54eUdhcEFyclszXSAqIDY7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLlVwZGF0ZVJpY2hUZXh0KGl0ZW0pO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1BcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICB2YXIgaXRlbTpjYy5Ob2RlID0gdGhpcy5pdGVtQXJyW2ldO1xyXG4gICAgICAgICAgICBpdGVtLnkgKz0gZGlzO1xyXG4gICAgICAgICAgICBpZihpdGVtLnkgPj0gdGhpcy54eUdhcEFyclsxXSArIHRoaXMueHlHYXBBcnJbM10pe1xyXG4gICAgICAgICAgICAgICAgaXRlbS55IC09IHRoaXMueHlHYXBBcnJbM10gKiA2O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVSaWNoVGV4dChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIG9uRGlzcG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy50aW1lcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKVxyXG4gICAgICAgICAgICB0aGlzLnRpbWVyID0gbnVsbFxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgdGhpcy5pdGVtQXJyID0gW11cclxuICAgICAgICB0aGlzLm1vZGVsLm9mZihaaHVhbnBhbk1vZGVsLlJlZnJlc2hSZWNvcmRVSSx0aGlzLHRoaXMudXBkYXRlSW5kZXgpXHJcbiAgICAgICAgdGhpcy5tb2RlbC5vZmYoWmh1YW5wYW5Nb2RlbC5SZWZyZXNoU2NvcmUsdGhpcyx0aGlzLnJlZnJlc2hTY29yZSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOabtOaWsOaYvuekulxyXG4gICAgICovXHJcbiAgICBVcGRhdGVDYXJvdXNlbFVJKCl7XHJcbiAgICAgICAgdmFyIGRhdGFBcnIgPSB0aGlzLm1vZGVsLmx1bmJvRGF0YUFycjtcclxuICAgICAgICBpZihkYXRhQXJyLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtQXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtOmNjLk5vZGUgPSB0aGlzLml0ZW1BcnJbaV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZVJpY2hUZXh0KGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05paw5Y2V5LiA6L2u5pKt5paH5pysXHJcbiAgICAgKiBAcGFyYW0gaXRlbSBcclxuICAgICAqL1xyXG4gICAgVXBkYXRlUmljaFRleHQoaXRlbTpjYy5Ob2RlKXtcclxuICAgICAgICB2YXIgZGF0YUFyciA9IHRoaXMubW9kZWwubHVuYm9EYXRhQXJyO1xyXG4gICAgICAgIGlmKGRhdGFBcnIubGVuZ3RoIDw9IDApe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubHVuYm9JbmRleCsrO1xyXG4gICAgICAgIGlmKHRoaXMubHVuYm9JbmRleCA+PSBkYXRhQXJyLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHRoaXMubHVuYm9JbmRleCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgb2JqID0gZGF0YUFyclt0aGlzLmx1bmJvSW5kZXhdO1xyXG4gICAgICAgIGxldCBjb2xvcjEgPSBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLnpodWFucGFuQ29sb3JzWzBdO1xyXG4gICAgICAgIGxldCBjb2xvcjIgPSBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLnpodWFucGFuQ29sb3JzWzFdO1xyXG4gICAgICAgIC8vIGl0ZW0uc3RyaW5nID0gXCLmga3llpznjqnlrrY8Y29sb3I9XCIgKyBjb2xvcjEgKyBcIj5cIiArIG9iai5uYW1lICsgXCI8L2M+77yM6I635b6XPGNvbG9yPVwiICsgY29sb3IyICsgXCI+XCIgKyBvYmoucG9pbnRfbmFtZSArIFwiPC9jPlwiO1xyXG4gICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtUmljaFRleHQxXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gXCLmga3llpznjqnlrrYgPGNvbG9yPVwiICsgY29sb3IxICsgXCI+XCIgKyBvYmoubmFtZSArIFwiPC9jPlwiO1xyXG4gICAgICAgIGl0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJpdGVtUmljaFRleHQyXCIpLmdldENvbXBvbmVudChjYy5SaWNoVGV4dCkuc3RyaW5nID0gXCLojrflvpcgPGNvbG9yPVwiICsgY29sb3IyICsgXCI+XCIgKyBvYmoucG9pbnRfbmFtZSArIFwiPC9jPlwiO1xyXG5cclxuICAgICAgICBpZih0aGlzLmx1bmJvSW5kZXggPT0gZGF0YUFyci5sZW5ndGggLSAxKXtcclxuICAgICAgICAgICAgLy/or7fmsYLmlrDnmoTova7mkq3mlbDmja5cclxuICAgICAgICAgICAgdGhpcy5tb2RlbC5yZXFMdW5ibygxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNsb3NlKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnRpbWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXHJcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIEhhbGxQb3BNc2dIZWxwZXIuSW5zdGFuY2UucmVsZWFzZUxvY2soQWN0aXZpdHlUeXBlLnpodWFucGFuKTtcclxuICAgIH1cclxuXHJcbiAgIFxyXG4gICAgXHJcbn0iXX0=