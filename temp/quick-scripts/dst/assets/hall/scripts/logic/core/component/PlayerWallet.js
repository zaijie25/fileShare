
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/PlayerWallet.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '66490iHSFdGNoX/H3XBe39K', 'PlayerWallet');
// hall/scripts/logic/core/component/PlayerWallet.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../ui/ViewBase");
var GlobalEvent_1 = require("../GlobalEvent");
var HallBtnHelper_1 = require("../../hall/ui/hall/views/HallBtnHelper");
var PlayerInfoModel_1 = require("../../hallcommon/model/PlayerInfoModel");
var PlayerWallet = /** @class */ (function (_super) {
    __extends(PlayerWallet, _super);
    function PlayerWallet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jbLabel = null;
        _this.SpineNode = null;
        // private yhLabel: cc.Label = null;
        _this.getTime = 0; //点击时长
        _this.img_shuaxin = null;
        return _this;
    }
    PlayerWallet.prototype.initView = function () {
        this.img_shuaxin = this.getChild("img_shuaxin");
        Global.UIHelper.addCommonClick(this.node, "img_shuaxin", this.refreshCoinBtnClick, this);
        this.jbLabel = this.getComponent("jbLabel", cc.Label);
        this.SpineNode = this.getComponent("refreshSkeleton", sp.Skeleton);
        //  Global.UIHelper.addCommonClick(this.node, "icon_yinhang", this.onBankClick, this);
        // this.yhLabel = this.getComponent("yhLabel",cc.Label);
        // this.addCommonClick("jbBox", this.jbBtnClickFunc, this, null);
        // this.addCommonClick("yhBox",this.yhBtnClickFunc,this, null);
    };
    PlayerWallet.prototype.onBankClick = function () {
        HallBtnHelper_1.default.WndBankOpen();
        Global.Audio.playAudioSource("hall/sound/bank");
    };
    //刷新事件
    PlayerWallet.prototype.refreshAction = function () {
        // this.addCommonClick("jinb_sx", this.refreshCoinBtnClick, this, null);
    };
    //充值事件
    PlayerWallet.prototype.rechargeAction = function () {
        this.addCommonClick("jbBox", this.jbBtnClickFunc, this, null);
    };
    PlayerWallet.prototype.onSubViewShow = function () {
        this.playerPointChange();
        //监听玩家金钱变化
        Global.Event.on(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.playerPointChange);
    };
    PlayerWallet.prototype.onSubViewHide = function () {
        //注销玩家金钱变化
        Global.Event.off(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.playerPointChange);
    };
    PlayerWallet.prototype.onDispose = function () {
        //注销玩家金钱变化
        Global.Event.off(GlobalEvent_1.default.PERSONALINFOUPDATE, this, this.playerPointChange);
    };
    //玩家金币变化
    PlayerWallet.prototype.playerPointChange = function () {
        // this.jbLabel.string = Global.Toolkit.formatPoint(Global.PlayerData.point, 3).toString();
        // this.yhLabel.string = Global.Toolkit.formatPoint(Global.PlayerData.bank_point, 3).toString();
        this.jbLabel.string = Global.Toolkit.formatPointStr(Global.PlayerData.point, true).toString();
        // this.yhLabel.string = Global.Toolkit.formatPointStr(Global.PlayerData.bank_point, true).toString();
    };
    //金币充值
    PlayerWallet.prototype.jbBtnClickFunc = function () {
        HallBtnHelper_1.default.WndRechargeOpen();
    };
    //银货充值
    PlayerWallet.prototype.yhBtnClickFunc = function () {
        HallBtnHelper_1.default.WndBankOpen();
    };
    PlayerWallet.prototype.sendLoadingTime = function () {
        clearTimeout(this.hearttime);
        var self = this;
        this.hearttime = setTimeout(function () {
            self.getTime++;
            if (self.getTime > 3) {
                self.getTime = 0;
                return;
            }
            self.sendLoadingTime();
        }, 1000 * 1);
    };
    PlayerWallet.prototype.refreshCoinBtnClick = function () {
        var _this = this;
        cc.tween(this.img_shuaxin).to(2, { rotation: 720 }).call(function () {
            _this.img_shuaxin.rotation = 0;
        }).start();
        if (this.getTime == 0) {
            this.getTime++;
            this.sendLoadingTime();
            PlayerInfoModel_1.default.instance.reqGetUserInfo(function (retObj) {
                Global.HallServer.event(NetAppface.GetUserInfo, retObj);
            }, function (error) {
            });
        }
        else {
            Logger.error("倒计时未结束 ==== " + this.getTime);
        }
    };
    return PlayerWallet;
}(ViewBase_1.default));
exports.default = PlayerWallet;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcUGxheWVyV2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFzQztBQUN0Qyw4Q0FBeUM7QUFDekMsd0VBQW1FO0FBQ25FLDBFQUFxRTtBQUdyRTtJQUEwQyxnQ0FBUTtJQUFsRDtRQUFBLHFFQW9HQztRQWxHVyxhQUFPLEdBQWEsSUFBSSxDQUFDO1FBQ3pCLGVBQVMsR0FBZ0IsSUFBSSxDQUFDO1FBQ3RDLG9DQUFvQztRQUM1QixhQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTTtRQUVuQixpQkFBVyxHQUFXLElBQUksQ0FBQzs7SUE2RnZDLENBQUM7SUE1RmEsK0JBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckUsc0ZBQXNGO1FBQ3BGLHdEQUF3RDtRQUN4RCxpRUFBaUU7UUFDakUsK0RBQStEO0lBQ25FLENBQUM7SUFFTyxrQ0FBVyxHQUFuQjtRQUNJLHVCQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNuRCxDQUFDO0lBQ0QsTUFB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QUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvQztJQUVMLENBQUM7SUFDTCxtQkFBQztBQUFELENBcEdBLEFBb0dDLENBcEd5QyxrQkFBUSxHQW9HakQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uL3VpL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBHbG9iYWxFdmVudCBmcm9tIFwiLi4vR2xvYmFsRXZlbnRcIjtcclxuaW1wb3J0IEhhbGxCdG5IZWxwZXIgZnJvbSBcIi4uLy4uL2hhbGwvdWkvaGFsbC92aWV3cy9IYWxsQnRuSGVscGVyXCI7XHJcbmltcG9ydCBQbGF5ZXJJbmZvTW9kZWwgZnJvbSBcIi4uLy4uL2hhbGxjb21tb24vbW9kZWwvUGxheWVySW5mb01vZGVsXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyV2FsbGV0IGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgamJMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBTcGluZU5vZGU6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuICAgIC8vIHByaXZhdGUgeWhMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBnZXRUaW1lID0gMDsgLy/ngrnlh7vml7bplb9cclxuICAgIHByaXZhdGUgaGVhcnR0aW1lOiBhbnk7XHJcbiAgICBwcml2YXRlIGltZ19zaHVheGluOmNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuaW1nX3NodWF4aW4gPSB0aGlzLmdldENoaWxkKFwiaW1nX3NodWF4aW5cIik7XHJcbiAgICAgICAgR2xvYmFsLlVJSGVscGVyLmFkZENvbW1vbkNsaWNrKHRoaXMubm9kZSwgXCJpbWdfc2h1YXhpblwiLCB0aGlzLnJlZnJlc2hDb2luQnRuQ2xpY2ssIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuamJMYWJlbCA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiamJMYWJlbFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5TcGluZU5vZGUgPSB0aGlzLmdldENvbXBvbmVudChcInJlZnJlc2hTa2VsZXRvblwiLCBzcC5Ta2VsZXRvbik7XHJcbiAgICAgIC8vICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLCBcImljb25feWluaGFuZ1wiLCB0aGlzLm9uQmFua0NsaWNrLCB0aGlzKTtcclxuICAgICAgICAvLyB0aGlzLnloTGFiZWwgPSB0aGlzLmdldENvbXBvbmVudChcInloTGFiZWxcIixjYy5MYWJlbCk7XHJcbiAgICAgICAgLy8gdGhpcy5hZGRDb21tb25DbGljayhcImpiQm94XCIsIHRoaXMuamJCdG5DbGlja0Z1bmMsIHRoaXMsIG51bGwpO1xyXG4gICAgICAgIC8vIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJ5aEJveFwiLHRoaXMueWhCdG5DbGlja0Z1bmMsdGhpcywgbnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJhbmtDbGljaygpIHtcclxuICAgICAgICBIYWxsQnRuSGVscGVyLlduZEJhbmtPcGVuKCk7XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlBdWRpb1NvdXJjZShcImhhbGwvc291bmQvYmFua1wiKVxyXG4gICAgfVxyXG4gICAgLy/liLfmlrDkuovku7ZcclxuICAgIHB1YmxpYyByZWZyZXNoQWN0aW9uICgpe1xyXG4gICAgICAgLy8gdGhpcy5hZGRDb21tb25DbGljayhcImppbmJfc3hcIiwgdGhpcy5yZWZyZXNoQ29pbkJ0bkNsaWNrLCB0aGlzLCBudWxsKTtcclxuICAgIH1cclxuICAgIC8v5YWF5YC85LqL5Lu2XHJcbiAgICBwdWJsaWMgcmVjaGFyZ2VBY3Rpb24gKCl7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImpiQm94XCIsIHRoaXMuamJCdG5DbGlja0Z1bmMsIHRoaXMsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU3ViVmlld1Nob3coKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJQb2ludENoYW5nZSgpO1xyXG4gICAgICAgIC8v55uR5ZCs546p5a626YeR6ZKx5Y+Y5YyWXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LlBFUlNPTkFMSU5GT1VQREFURSwgdGhpcywgdGhpcy5wbGF5ZXJQb2ludENoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdWJWaWV3SGlkZSgpIHtcclxuICAgICAgICAvL+azqOmUgOeOqeWutumHkemSseWPmOWMllxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuUEVSU09OQUxJTkZPVVBEQVRFLCB0aGlzLCB0aGlzLnBsYXllclBvaW50Q2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc3Bvc2UoKSB7XHJcbiAgICAgICAgLy/ms6jplIDnjqnlrrbph5HpkrHlj5jljJZcclxuICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50LlBFUlNPTkFMSU5GT1VQREFURSwgdGhpcywgdGhpcy5wbGF5ZXJQb2ludENoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/njqnlrrbph5HluIHlj5jljJZcclxuICAgIHBsYXllclBvaW50Q2hhbmdlKCkge1xyXG4gICAgICAgIC8vIHRoaXMuamJMYWJlbC5zdHJpbmcgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludChHbG9iYWwuUGxheWVyRGF0YS5wb2ludCwgMykudG9TdHJpbmcoKTtcclxuICAgICAgICAvLyB0aGlzLnloTGFiZWwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnQoR2xvYmFsLlBsYXllckRhdGEuYmFua19wb2ludCwgMykudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLmpiTGFiZWwuc3RyaW5nID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnRTdHIoR2xvYmFsLlBsYXllckRhdGEucG9pbnQsIHRydWUpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgLy8gdGhpcy55aExhYmVsLnN0cmluZyA9IEdsb2JhbC5Ub29sa2l0LmZvcm1hdFBvaW50U3RyKEdsb2JhbC5QbGF5ZXJEYXRhLmJhbmtfcG9pbnQsIHRydWUpLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ph5HluIHlhYXlgLxcclxuICAgIGpiQnRuQ2xpY2tGdW5jKCkge1xyXG4gICAgICAgIEhhbGxCdG5IZWxwZXIuV25kUmVjaGFyZ2VPcGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/pk7botKflhYXlgLxcclxuICAgIHloQnRuQ2xpY2tGdW5jKCkge1xyXG4gICAgICAgIEhhbGxCdG5IZWxwZXIuV25kQmFua09wZW4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZExvYWRpbmdUaW1lKCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmhlYXJ0dGltZSk7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuaGVhcnR0aW1lID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZ2V0VGltZSsrO1xyXG4gICAgICAgICAgICBpZihzZWxmLmdldFRpbWUgPiAzKXtcclxuICAgICAgICAgICAgICAgIHNlbGYuZ2V0VGltZSA9IDBcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnNlbmRMb2FkaW5nVGltZSgpO1xyXG4gICAgICAgIH0sIDEwMDAgKiAxKTtcclxuICAgIH1cclxuICAgIHJlZnJlc2hDb2luQnRuQ2xpY2soKSB7XHJcblxyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuaW1nX3NodWF4aW4pLnRvKDIse3JvdGF0aW9uOjcyMH0pLmNhbGwoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5pbWdfc2h1YXhpbi5yb3RhdGlvbiA9IDA7XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuXHJcblxyXG4gICAgICAgIGlmKHRoaXMuZ2V0VGltZSA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5nZXRUaW1lKys7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZExvYWRpbmdUaW1lKClcclxuICAgIFxyXG4gICAgICAgICAgICBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UucmVxR2V0VXNlckluZm8oKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuZXZlbnQoTmV0QXBwZmFjZS5HZXRVc2VySW5mbyxyZXRPYmopXHJcblxyXG4gICAgICAgICAgICB9LChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuWAkuiuoeaXtuacque7k+adnyA9PT09IFwiICsgdGhpcy5nZXRUaW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==