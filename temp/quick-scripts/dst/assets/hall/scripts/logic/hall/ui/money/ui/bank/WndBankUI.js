
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/money/ui/bank/WndBankUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '76ad1sgRXlEnLlvwLp7EBO3', 'WndBankUI');
// hall/scripts/logic/hall/ui/money/ui/bank/WndBankUI.ts

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
var WndBase_1 = require("../../../../../core/ui/WndBase");
var BankSaveWin_1 = require("./BankSaveWin");
var BankDrawWin_1 = require("./BankDrawWin");
var WndBankUI = /** @class */ (function (_super) {
    __extends(WndBankUI, _super);
    function WndBankUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curWin = 1; //1存 2取
        return _this;
    }
    WndBankUI.prototype.onInit = function () {
        this.isNeedDelay = true;
        this.name = "WndBankUI";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/money/bank/BankUI";
        this.model = Global.ModelManager.getModel("BankModel");
    };
    WndBankUI.prototype.initView = function () {
        // this.node.width = cc.Canvas.instance.node.width;
        // this.node.height = cc.Canvas.instance.node.height;
        this.addCommonClick("bg_popup_almost/close", this.close, this);
        //leftBtn
        this.saveToggle = this.getComponent("leftBtns/layout/saveBtn", cc.Toggle);
        this.drawToggle = this.getComponent("leftBtns/layout/drawBtn", cc.Toggle);
        this.saveToggle.node.on("click", this.changeInfoNode, this);
        this.drawToggle.node.on("click", this.changeInfoNode, this);
        //winNodes
        this.saveWin = this.addView("saveWin", this.getChild("winsNode/saveWin"), BankSaveWin_1.default, false);
        this.drawWin = this.addView("drawWin", this.getChild("winsNode/drawWin"), BankDrawWin_1.default), false;
        // 提示栏
        this.bindPhoneBtn = this.getChild("winsNode/msgInfo/bandNode/bandBtn");
        this.msgtip = this.getChild("winsNode/msgInfo/bandNode/msgLabel").getComponent(cc.Label);
        this.addCommonClick("winsNode/msgInfo/bandNode/bandBtn", this.openBindPhoneBtn, this);
    };
    // public open(args?)
    // {
    //     this.onOpen(args)
    // }
    //面板打开回调
    WndBankUI.prototype.onOpen = function (args) {
        var havePhone = (Global.PlayerData.phone != null && Global.PlayerData.phone != "");
        if (havePhone) { //已绑定电话
            this.bindPhoneBtn.active = false;
            this.msgtip.string = "温馨提示：银行存取款不收取任何手续费哦~";
        }
        else { //未绑定电话
            this.bindPhoneBtn.active = true;
            this.msgtip.string = "温馨提示：为了您的资金安全，请您绑定手机号码！";
        }
        this.updateInfoNode();
    };
    WndBankUI.prototype.afterOpen = function () {
        // this.animComp.doFullScreenOpenAnim(this.getChild("topBar"), 
        // this.getChild("leftBtns"), 
        // [this.getChild("winsNode"), this.getChild("zhuangshi")]);
    };
    WndBankUI.prototype.closeAllWin = function () {
        this.saveWin.subViewState = false;
        this.drawWin.subViewState = false;
    };
    WndBankUI.prototype.updateInfoNode = function () {
        this.closeAllWin();
        if (this.curWin == 1) {
            this.saveWin.subViewState = true;
            this.saveToggle.isChecked = true;
        }
        else if (this.curWin == 2) {
            this.drawWin.subViewState = true;
            this.drawToggle.isChecked = true;
        }
    };
    //提现界面切换
    WndBankUI.prototype.changeInfoNode = function (target) {
        var curWin = 1;
        if (target == this.drawToggle) {
            curWin = 2;
        }
        else if (target == this.saveToggle) {
            curWin = 1;
        }
        if (curWin == this.curWin) {
            return;
        }
        Global.Audio.playBtnSound();
        this.curWin = curWin;
        this.updateInfoNode();
    };
    WndBankUI.prototype.openBindPhoneBtn = function () {
        Global.UI.show("WndBindPhone");
    };
    return WndBankUI;
}(WndBase_1.default));
exports.default = WndBankUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxtb25leVxcdWlcXGJhbmtcXFduZEJhbmtVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBcUQ7QUFFckQsNkNBQXFDO0FBQ3JDLDZDQUFxQztBQUVyQztJQUF1Qyw2QkFBTztJQUE5QztRQUFBLHFFQTBHQztRQW5HVyxZQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTzs7SUFtRy9CLENBQUM7SUEzRmEsMEJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTtRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsbUNBQW1DLENBQUM7UUFDbkQsSUFBSSxDQUFDLEtBQUssR0FBYyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRVMsNEJBQVEsR0FBbEI7UUFFSSxtREFBbUQ7UUFDbkQscURBQXFEO1FBQ3JELElBQUksQ0FBQyxjQUFjLENBQUMsdUJBQXVCLEVBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxTQUFTO1FBQ1QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHlCQUF5QixFQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMseUJBQXlCLEVBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLGNBQWMs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QUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2Q7UUFDRCxJQUFHLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFDO1lBQ3JCLE9BQU87U0FDVjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxvQ0FBZ0IsR0FBaEI7UUFDSSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUwsZ0JBQUM7QUFBRCxDQTFHQSxBQTBHQyxDQTFHc0MsaUJBQU8sR0EwRzdDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UgZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvcmUvdWkvV25kQmFzZVwiO1xyXG5pbXBvcnQgQmFua01vZGVsIGZyb20gXCIuLi8uLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL0JhbmtNb2RlbFwiO1xyXG5pbXBvcnQgQmFua1NhdmUgZnJvbSBcIi4vQmFua1NhdmVXaW5cIjtcclxuaW1wb3J0IEJhbmtEcmF3IGZyb20gXCIuL0JhbmtEcmF3V2luXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRCYW5rVUkgZXh0ZW5kcyBXbmRCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIG1vZGVsIDogQmFua01vZGVsO1xyXG5cclxuICAgIHByaXZhdGUgc2F2ZVRvZ2dsZSA6IGNjLlRvZ2dsZTtcclxuICAgIHByaXZhdGUgZHJhd1RvZ2dsZSA6IGNjLlRvZ2dsZTtcclxuXHJcbiAgICBwcml2YXRlIGN1cldpbiA9IDE7IC8vMeWtmCAy5Y+WXHJcblxyXG4gICAgcHJpdmF0ZSBzYXZlV2luIDogQmFua1NhdmU7XHJcbiAgICBwcml2YXRlIGRyYXdXaW4gOiBCYW5rRHJhdztcclxuXHJcbiAgICBwcml2YXRlIG1zZ3RpcDpjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgYmluZFBob25lQnRuOmNjLk5vZGU7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmlzTmVlZERlbGF5ID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiV25kQmFua1VJXCI7XHJcbiAgICAgICAgdGhpcy5sYXllciA9IEdsb2JhbC5VSS5Qb3BMYXllcjtcclxuICAgICAgICB0aGlzLnJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9tb25leS9iYW5rL0JhbmtVSVwiO1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSA8QmFua01vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJCYW5rTW9kZWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KClcclxuICAgIHtcclxuICAgICAgICAvLyB0aGlzLm5vZGUud2lkdGggPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS53aWR0aDtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuaGVpZ2h0ID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJiZ19wb3B1cF9hbG1vc3QvY2xvc2VcIix0aGlzLmNsb3NlLHRoaXMpO1xyXG4gICAgICAgIC8vbGVmdEJ0blxyXG4gICAgICAgIHRoaXMuc2F2ZVRvZ2dsZSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwibGVmdEJ0bnMvbGF5b3V0L3NhdmVCdG5cIixjYy5Ub2dnbGUpO1xyXG4gICAgICAgIHRoaXMuZHJhd1RvZ2dsZSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwibGVmdEJ0bnMvbGF5b3V0L2RyYXdCdG5cIixjYy5Ub2dnbGUpO1xyXG4gICAgICAgIHRoaXMuc2F2ZVRvZ2dsZS5ub2RlLm9uKFwiY2xpY2tcIix0aGlzLmNoYW5nZUluZm9Ob2RlLHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZHJhd1RvZ2dsZS5ub2RlLm9uKFwiY2xpY2tcIix0aGlzLmNoYW5nZUluZm9Ob2RlLHRoaXMpO1xyXG4gICAgICAgIC8vd2luTm9kZXNcclxuICAgICAgICB0aGlzLnNhdmVXaW4gPSA8QmFua1NhdmU+dGhpcy5hZGRWaWV3KFwic2F2ZVdpblwiLHRoaXMuZ2V0Q2hpbGQoXCJ3aW5zTm9kZS9zYXZlV2luXCIpLEJhbmtTYXZlLGZhbHNlKTtcclxuICAgICAgICB0aGlzLmRyYXdXaW4gPSA8QmFua0RyYXc+dGhpcy5hZGRWaWV3KFwiZHJhd1dpblwiLHRoaXMuZ2V0Q2hpbGQoXCJ3aW5zTm9kZS9kcmF3V2luXCIpLEJhbmtEcmF3KSxmYWxzZTtcclxuICAgICAgICAvLyDmj5DnpLrmoI9cclxuICAgICAgICB0aGlzLmJpbmRQaG9uZUJ0biA9IHRoaXMuZ2V0Q2hpbGQoXCJ3aW5zTm9kZS9tc2dJbmZvL2JhbmROb2RlL2JhbmRCdG5cIik7XHJcbiAgICAgICAgdGhpcy5tc2d0aXAgPSB0aGlzLmdldENoaWxkKFwid2luc05vZGUvbXNnSW5mby9iYW5kTm9kZS9tc2dMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwid2luc05vZGUvbXNnSW5mby9iYW5kTm9kZS9iYW5kQnRuXCIsdGhpcy5vcGVuQmluZFBob25lQnRuLHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLy8gcHVibGljIG9wZW4oYXJncz8pXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgdGhpcy5vbk9wZW4oYXJncylcclxuICAgIC8vIH1cclxuXHJcbiAgICAgLy/pnaLmnb/miZPlvIDlm57osINcclxuICAgICBwcm90ZWN0ZWQgb25PcGVuKGFyZ3M/OmFueVtdKVxyXG4gICAgIHtcclxuICAgICAgICB2YXIgaGF2ZVBob25lID0gKEdsb2JhbC5QbGF5ZXJEYXRhLnBob25lICE9IG51bGwgJiYgR2xvYmFsLlBsYXllckRhdGEucGhvbmUgIT0gXCJcIik7XHJcbiAgICAgICAgaWYoaGF2ZVBob25lKXsgLy/lt7Lnu5HlrprnlLXor51cclxuICAgICAgICAgICAgdGhpcy5iaW5kUGhvbmVCdG4uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubXNndGlwLnN0cmluZyA9IFwi5rip6aao5o+Q56S677ya6ZO26KGM5a2Y5Y+W5qy+5LiN5pS25Y+W5Lu75L2V5omL57ut6LS55ZOmflwiXHJcbiAgICAgICAgfWVsc2V7IC8v5pyq57uR5a6a55S16K+dXHJcbiAgICAgICAgICAgIHRoaXMuYmluZFBob25lQnRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubXNndGlwLnN0cmluZyA9IFwi5rip6aao5o+Q56S677ya5Li65LqG5oKo55qE6LWE6YeR5a6J5YWo77yM6K+35oKo57uR5a6a5omL5py65Y+356CB77yBXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbmZvTm9kZSgpO1xyXG4gICAgIH1cclxuXHJcbiAgICAgcHVibGljIGFmdGVyT3BlbigpXHJcbiAgICAge1xyXG4gICAgICAgIC8vIHRoaXMuYW5pbUNvbXAuZG9GdWxsU2NyZWVuT3BlbkFuaW0odGhpcy5nZXRDaGlsZChcInRvcEJhclwiKSwgXHJcbiAgICAgICAgLy8gdGhpcy5nZXRDaGlsZChcImxlZnRCdG5zXCIpLCBcclxuICAgICAgICAvLyBbdGhpcy5nZXRDaGlsZChcIndpbnNOb2RlXCIpLCB0aGlzLmdldENoaWxkKFwiemh1YW5nc2hpXCIpXSk7XHJcbiAgICAgfVxyXG5cclxuICAgIGNsb3NlQWxsV2luKCl7XHJcbiAgICAgICAgdGhpcy5zYXZlV2luLnN1YlZpZXdTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZHJhd1dpbi5zdWJWaWV3U3RhdGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVJbmZvTm9kZSgpe1xyXG4gICAgICAgIHRoaXMuY2xvc2VBbGxXaW4oKTtcclxuICAgICAgICBpZih0aGlzLmN1cldpbiA9PSAxKXtcclxuICAgICAgICAgICAgdGhpcy5zYXZlV2luLnN1YlZpZXdTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2F2ZVRvZ2dsZS5pc0NoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuY3VyV2luID09IDIpe1xyXG4gICAgICAgICAgICB0aGlzLmRyYXdXaW4uc3ViVmlld1N0YXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5kcmF3VG9nZ2xlLmlzQ2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5o+Q546w55WM6Z2i5YiH5o2iXHJcbiAgICBjaGFuZ2VJbmZvTm9kZSggdGFyZ2V0IDogYW55ICl7XHJcbiAgICAgICAgdmFyIGN1cldpbiA9IDE7XHJcbiAgICAgICAgaWYodGFyZ2V0ID09IHRoaXMuZHJhd1RvZ2dsZSl7XHJcbiAgICAgICAgICAgIGN1cldpbiA9IDI7XHJcbiAgICAgICAgfWVsc2UgaWYodGFyZ2V0ID09IHRoaXMuc2F2ZVRvZ2dsZSl7XHJcbiAgICAgICAgICAgIGN1cldpbiA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGN1cldpbiA9PSB0aGlzLmN1cldpbil7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlCdG5Tb3VuZCgpO1xyXG4gICAgICAgIHRoaXMuY3VyV2luID0gY3VyV2luO1xyXG4gICAgICAgIHRoaXMudXBkYXRlSW5mb05vZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuQmluZFBob25lQnRuKCkge1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kQmluZFBob25lXCIpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=