
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Activity/Turntable/TurntableView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '88067d1dpVFBbE/KtfWlbMP', 'TurntableView');
// hall/scripts/logic/hall/ui/Activity/Turntable/TurntableView.ts

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
var ViewBase_1 = require("../../../../core/ui/ViewBase");
var ZhuanpanModel_1 = require("../../../../hallcommon/model/ZhuanpanModel");
var TurnTable_1 = require("./TurnTable");
var TurntableView = /** @class */ (function (_super) {
    __extends(TurntableView, _super);
    function TurntableView() {
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
            "turnTable": "hall/prefabs/ui/ActivityCenter/subView/turnTable",
        };
        _this.viewKeyTypeMap = {
            "turnTable": TurnTable_1.default,
        };
        _this.frameTime = 16;
        return _this;
    }
    TurntableView.prototype.initView = function () {
        this.model = Global.ModelManager.getModel("ZhuanpanModel");
        this.model.on(ZhuanpanModel_1.default.RefreshRecordUI, this, this.updateIndex);
        this.model.on(ZhuanpanModel_1.default.RefreshScore, this, this.refreshScore);
        // if(this.model)
        // {
        //     this.model.reqLunbo()
        // }
        for (var i = 0; i < 5; i++) {
            this.labelArr[i] = this.getComponent("turnTableView/jifen/label_jifen_" + i, cc.Label);
        }
        this.addCommonClick("turnTableView/jifen/btn_rule", this.onRuleBtnClicked, this);
        this.maskNode = this.getChild("turnTableView/lunbo/mask");
        var tempItem = this.getComponent("turnTableView/lunbo/mask/itemRichText", cc.RichText);
        tempItem.string = "";
        for (var i = 0; i < 6; i++) {
            if (i > 0) {
                tempItem = cc.instantiate(tempItem.node).getComponent(cc.RichText);
            }
            this.itemArr.push(tempItem);
            tempItem.node.setParent(this.maskNode);
            tempItem.node.y = this.xyGapArr[1] - i * this.xyGapArr[3];
        }
        this.initSubViewClass(this.viewKeyTypeMap);
        this.InitScripts();
    };
    TurntableView.prototype.InitScripts = function () {
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
    TurntableView.prototype.updateIndex = function (index) {
        this.lunboIndex = index;
    };
    TurntableView.prototype.onRuleBtnClicked = function () {
        Global.UI.show("WndTurntableRule");
    };
    TurntableView.prototype.refreshScore = function () {
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
    TurntableView.prototype.onSubViewShow = function () {
        //this.model.reqActivityCfg()
        //this.model.reqLunbo()
        this.turnTable.subViewState = true;
        this.timer = setInterval(this.runCarousel.bind(this), this.frameTime);
    };
    TurntableView.prototype.runCarousel = function () {
        var dt = this.frameTime / 1000;
        if (this.lunboIndex < 0) {
            this.UpdateCarouselUI();
            return;
        }
        var dis = dt * this.speed;
        for (var i = 0; i < this.itemArr.length; i++) {
            var item = this.itemArr[i];
            item.node.y += dis;
            if (item.node.y >= this.xyGapArr[1] + this.xyGapArr[3]) {
                item.node.y -= this.xyGapArr[3] * 6;
                this.UpdateRichText(item);
            }
        }
    };
    TurntableView.prototype.onDispose = function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.model.off(ZhuanpanModel_1.default.RefreshRecordUI, this, this.updateIndex);
        this.model.off(ZhuanpanModel_1.default.RefreshScore, this, this.refreshScore);
    };
    /**
     * 更新显示
     */
    TurntableView.prototype.UpdateCarouselUI = function () {
        var dataArr = ZhuanpanModel_1.default.instance.lunboDataArr;
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
    TurntableView.prototype.UpdateRichText = function (item) {
        var dataArr = ZhuanpanModel_1.default.instance.lunboDataArr;
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
        item.string = "恭喜玩家<color=" + color1 + ">" + obj.name + "</c>，获得<color=" + color2 + ">" + obj.point_name + "</c>";
        if (this.lunboIndex == dataArr.length - 1) {
            //请求新的轮播数据
            ZhuanpanModel_1.default.instance.reqLunbo(1000);
        }
    };
    TurntableView.prototype.onSubViewHide = function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };
    return TurntableView;
}(ViewBase_1.default));
exports.default = TurntableView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxBY3Rpdml0eVxcVHVybnRhYmxlXFxUdXJudGFibGVWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFvRDtBQUNwRCw0RUFBdUU7QUFDdkUseUNBQW9DO0FBRXBDO0lBQTJDLGlDQUFRO0lBQW5EO1FBQUEscUVBNkxDO1FBckxHLFdBQUssR0FBVSxFQUFFLENBQUM7UUFDbEI7O1dBRUc7UUFDSCxnQkFBVSxHQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCOztXQUVHO1FBQ0gsY0FBUSxHQUFjLEVBQUUsQ0FBQztRQUV6Qjs7V0FFRztRQUNILGFBQU8sR0FBd0IsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUUzQzs7V0FFRztRQUNILGNBQVEsR0FBVyxJQUFJLENBQUM7UUFFeEI7O1dBRUc7UUFDSCxjQUFRLEdBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRTVCLGlCQUFXLEdBQVE7WUFDdkIsV0FBVyxFQUFDLGtEQUFrRDtTQUNqRSxDQUFBO1FBRU8sb0JBQWMsR0FBUTtZQUMxQixXQUFXLEVBQUMsbUJBQVM7U0FDeEIsQ0FBQTtRQUlELGVBQVMsR0FBVyxFQUFFLENBQUM7O0lBa0ozQixDQUFDO0lBaEphLGdDQUFRLEdBQWxCO1FBSUksSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUUxRCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyx1QkFBYSxDQUFDLGVBQWUsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ2xFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLHVCQUFh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QUksQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBQztZQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUN2QjtRQUVELElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLEdBQUcsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUVsSCxJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7WUFDckMsVUFBVTtZQUNWLHVCQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QztJQUNMLENBQUM7SUFHUyxxQ0FBYSxHQUF2QjtRQUVJLElBQUcsSUFBSSxDQUFDLEtBQUssRUFDYjtZQUNJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDM0I7SUFDTCxDQUFDO0lBSUwsb0JBQUM7QUFBRCxDQTdMQSxBQTZMQyxDQTdMMEMsa0JBQVEsR0E2TGxEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3VpL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBaaHVhbnBhbk1vZGVsIGZyb20gXCIuLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1podWFucGFuTW9kZWxcIjtcclxuaW1wb3J0IFR1cm5UYWJsZSBmcm9tIFwiLi9UdXJuVGFibGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFR1cm50YWJsZVZpZXcgZXh0ZW5kcyBWaWV3QmFzZSBcclxue1xyXG5cclxuXHJcbiAgICBwcml2YXRlIG1vZGVsIDpaaHVhbnBhbk1vZGVsXHJcblxyXG4gICAgcHJpdmF0ZSB0dXJuVGFibGU6VHVyblRhYmxlXHJcblxyXG4gICAgc3BlZWQ6bnVtYmVyID0gMzA7XHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjei9ruaSreaVsOaNrue0ouW8lVxyXG4gICAgICovXHJcbiAgICBsdW5ib0luZGV4Om51bWJlciA9IC0xO1xyXG4gICAgLyoqXHJcbiAgICAgKiDnp6/liIbmlofmnKzpm4blkIhcclxuICAgICAqL1xyXG4gICAgbGFiZWxBcnI6Y2MuTGFiZWxbXSA9IFtdO1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOWtkOWFg+e0oCBSaWNoVGV4dOe7hOS7tumbhuWQiCBcclxuICAgICAqL1xyXG4gICAgaXRlbUFyciA6IEFycmF5PGNjLlJpY2hUZXh0PiA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2u5pKt6YGu572p6IqC54K5XHJcbiAgICAgKi9cclxuICAgIG1hc2tOb2RlOmNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogeHnlnZDmoIflkozpl7TpmpRcclxuICAgICAqL1xyXG4gICAgeHlHYXBBcnI6bnVtYmVyW10gPSBbMCwgLTE2LCAwLCAyNl07XHJcblxyXG4gICAgcHJpdmF0ZSBzdWJWaWV3UGF0aCA6YW55ID0ge1xyXG4gICAgICAgIFwidHVyblRhYmxlXCI6XCJoYWxsL3ByZWZhYnMvdWkvQWN0aXZpdHlDZW50ZXIvc3ViVmlldy90dXJuVGFibGVcIixcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHZpZXdLZXlUeXBlTWFwIDphbnkgPSB7XHJcbiAgICAgICAgXCJ0dXJuVGFibGVcIjpUdXJuVGFibGUsXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0aW1lciA6IE5vZGVKUy5UaW1lb3V0XHJcblxyXG4gICAgZnJhbWVUaW1lOiBudW1iZXIgPSAxNjtcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLm1vZGVsID0gR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlpodWFucGFuTW9kZWxcIilcclxuXHJcbiAgICAgICAgdGhpcy5tb2RlbC5vbihaaHVhbnBhbk1vZGVsLlJlZnJlc2hSZWNvcmRVSSx0aGlzLHRoaXMudXBkYXRlSW5kZXgpXHJcbiAgICAgICAgdGhpcy5tb2RlbC5vbihaaHVhbnBhbk1vZGVsLlJlZnJlc2hTY29yZSx0aGlzLHRoaXMucmVmcmVzaFNjb3JlKVxyXG4gICAgICAgIC8vIGlmKHRoaXMubW9kZWwpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLm1vZGVsLnJlcUx1bmJvKClcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IDU7IGkrKyl7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWxBcnJbaV0gPSB0aGlzLmdldENvbXBvbmVudChcInR1cm5UYWJsZVZpZXcvamlmZW4vbGFiZWxfamlmZW5fXCIgKyBpLGNjLkxhYmVsKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwidHVyblRhYmxlVmlldy9qaWZlbi9idG5fcnVsZVwiLHRoaXMub25SdWxlQnRuQ2xpY2tlZCx0aGlzKVxyXG5cclxuICAgICAgICB0aGlzLm1hc2tOb2RlID10aGlzLmdldENoaWxkKFwidHVyblRhYmxlVmlldy9sdW5iby9tYXNrXCIpO1xyXG4gICAgICAgIHZhciB0ZW1wSXRlbTpjYy5SaWNoVGV4dCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwidHVyblRhYmxlVmlldy9sdW5iby9tYXNrL2l0ZW1SaWNoVGV4dFwiLGNjLlJpY2hUZXh0KVxyXG4gICAgICAgIHRlbXBJdGVtLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IDY7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGkgPiAwKXtcclxuICAgICAgICAgICAgICAgIHRlbXBJdGVtID0gY2MuaW5zdGFudGlhdGUodGVtcEl0ZW0ubm9kZSkuZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5pdGVtQXJyLnB1c2godGVtcEl0ZW0pO1xyXG4gICAgICAgICAgICB0ZW1wSXRlbS5ub2RlLnNldFBhcmVudCh0aGlzLm1hc2tOb2RlKTtcclxuICAgICAgICAgICAgdGVtcEl0ZW0ubm9kZS55ID0gdGhpcy54eUdhcEFyclsxXSAtIGkgKiB0aGlzLnh5R2FwQXJyWzNdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXRTdWJWaWV3Q2xhc3ModGhpcy52aWV3S2V5VHlwZU1hcClcclxuICAgICAgICB0aGlzLkluaXRTY3JpcHRzKClcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgSW5pdFNjcmlwdHMoKSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5pbml0U3ViVmlldyh0aGlzLnN1YlZpZXdQYXRoLHRoaXMudmlld0tleVR5cGVNYXAsdGhpcy5nZXRDaGlsZChcInR1cm5UYWJsZVZpZXdcIikpXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSW5kZXgoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLmx1bmJvSW5kZXggPSBpbmRleFxyXG4gICAgfVxyXG4gICAgb25SdWxlQnRuQ2xpY2tlZCgpIHtcclxuICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFR1cm50YWJsZVJ1bGVcIilcclxuICAgIH1cclxuXHJcbiAgICByZWZyZXNoU2NvcmUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkYXRhID10aGlzLm1vZGVsLmRhdGE7XHJcbiAgICAgICAgaWYoIWRhdGEpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFiZWxBcnJbMF0uc3RyaW5nID0gXCJcIiArIGRhdGFbXCJjb2luXCJdO1xyXG4gICAgICAgIHRoaXMubGFiZWxBcnJbMV0uc3RyaW5nID0gXCJcIiArIGRhdGFbXCJ3ZWVrX2xvZ2luX2NvaW5cIl07XHJcbiAgICAgICAgdGhpcy5sYWJlbEFyclsyXS5zdHJpbmcgPSBcIlwiICsgZGF0YVtcIndlZWtfYmV0X2NvaW5cIl07XHJcbiAgICAgICAgdGhpcy5sYWJlbEFyclszXS5zdHJpbmcgPSBcIlwiICsgZGF0YVtcIndlZWtfc2hhcmVfY29pblwiXTtcclxuICAgICAgICB0aGlzLmxhYmVsQXJyWzRdLnN0cmluZyA9IFwiXCIgKyBkYXRhW1wid2Vla19zaGFyZV9iZXRfY29pblwiXTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld1Nob3coKVxyXG4gICAge1xyXG4gICAgICAgIC8vdGhpcy5tb2RlbC5yZXFBY3Rpdml0eUNmZygpXHJcbiAgICAgICAgLy90aGlzLm1vZGVsLnJlcUx1bmJvKClcclxuICAgICAgICB0aGlzLnR1cm5UYWJsZS5zdWJWaWV3U3RhdGUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKHRoaXMucnVuQ2Fyb3VzZWwuYmluZCh0aGlzKSx0aGlzLmZyYW1lVGltZSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgcnVuQ2Fyb3VzZWwoKSB7XHJcbiAgICAgICAgbGV0IGR0ID0gdGhpcy5mcmFtZVRpbWUgLyAxMDAwXHJcbiAgICAgICAgaWYodGhpcy5sdW5ib0luZGV4IDwgMCl7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlQ2Fyb3VzZWxVSSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkaXMgPSBkdCAqIHRoaXMuc3BlZWQ7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIHZhciBpdGVtOmNjLlJpY2hUZXh0ID0gdGhpcy5pdGVtQXJyW2ldO1xyXG4gICAgICAgICAgICBpdGVtLm5vZGUueSArPSBkaXM7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0ubm9kZS55ID49IHRoaXMueHlHYXBBcnJbMV0gKyB0aGlzLnh5R2FwQXJyWzNdKXtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubm9kZS55IC09IHRoaXMueHlHYXBBcnJbM10gKiA2O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVSaWNoVGV4dChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIG9uRGlzcG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy50aW1lcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgdGhpcy5tb2RlbC5vZmYoWmh1YW5wYW5Nb2RlbC5SZWZyZXNoUmVjb3JkVUksdGhpcyx0aGlzLnVwZGF0ZUluZGV4KVxyXG4gICAgICAgIHRoaXMubW9kZWwub2ZmKFpodWFucGFuTW9kZWwuUmVmcmVzaFNjb3JlLHRoaXMsdGhpcy5yZWZyZXNoU2NvcmUpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrDmmL7npLpcclxuICAgICAqL1xyXG4gICAgVXBkYXRlQ2Fyb3VzZWxVSSgpe1xyXG4gICAgICAgIHZhciBkYXRhQXJyID0gWmh1YW5wYW5Nb2RlbC5pbnN0YW5jZS5sdW5ib0RhdGFBcnI7XHJcbiAgICAgICAgaWYoZGF0YUFyci5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbUFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbTpjYy5SaWNoVGV4dCA9IHRoaXMuaXRlbUFycltpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlUmljaFRleHQoaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrDljZXkuIDova7mkq3mlofmnKxcclxuICAgICAqIEBwYXJhbSBpdGVtIFxyXG4gICAgICovXHJcbiAgICBVcGRhdGVSaWNoVGV4dChpdGVtOmNjLlJpY2hUZXh0KXtcclxuICAgICAgICB2YXIgZGF0YUFyciA9IFpodWFucGFuTW9kZWwuaW5zdGFuY2UubHVuYm9EYXRhQXJyO1xyXG4gICAgICAgIGlmKGRhdGFBcnIubGVuZ3RoIDw9IDApe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubHVuYm9JbmRleCsrO1xyXG4gICAgICAgIGlmKHRoaXMubHVuYm9JbmRleCA+PSBkYXRhQXJyLmxlbmd0aCl7XHJcbiAgICAgICAgICAgIHRoaXMubHVuYm9JbmRleCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgb2JqID0gZGF0YUFyclt0aGlzLmx1bmJvSW5kZXhdO1xyXG4gICAgICAgIGxldCBjb2xvcjEgPSBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLnpodWFucGFuQ29sb3JzWzBdO1xyXG4gICAgICAgIGxldCBjb2xvcjIgPSBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLnpodWFucGFuQ29sb3JzWzFdO1xyXG4gICAgICAgIGl0ZW0uc3RyaW5nID0gXCLmga3llpznjqnlrrY8Y29sb3I9XCIgKyBjb2xvcjEgKyBcIj5cIiArIG9iai5uYW1lICsgXCI8L2M+77yM6I635b6XPGNvbG9yPVwiICsgY29sb3IyICsgXCI+XCIgKyBvYmoucG9pbnRfbmFtZSArIFwiPC9jPlwiO1xyXG5cclxuICAgICAgICBpZih0aGlzLmx1bmJvSW5kZXggPT0gZGF0YUFyci5sZW5ndGggLSAxKXtcclxuICAgICAgICAgICAgLy/or7fmsYLmlrDnmoTova7mkq3mlbDmja5cclxuICAgICAgICAgICAgWmh1YW5wYW5Nb2RlbC5pbnN0YW5jZS5yZXFMdW5ibygxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByb3RlY3RlZCBvblN1YlZpZXdIaWRlKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnRpbWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgXHJcbiAgICBcclxufSJdfQ==