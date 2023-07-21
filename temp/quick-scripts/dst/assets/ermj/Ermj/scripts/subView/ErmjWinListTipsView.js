
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/subView/ErmjWinListTipsView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b923bxSbnNN7ItoF/faUmHZ', 'ErmjWinListTipsView');
// ermj/Ermj/scripts/subView/ErmjWinListTipsView.ts

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
var ErmjBaseView_1 = require("./ErmjBaseView");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjMjStyleHelper_1 = require("../tool/ErmjMjStyleHelper");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var bgMinWidth = 264;
var bgMinContain = 2; // 最小宽可容纳数
var bgStepWidth = 65;
var ErmjWinListTipsView = /** @class */ (function (_super) {
    __extends(ErmjWinListTipsView, _super);
    function ErmjWinListTipsView(node) {
        var _this = _super.call(this) || this;
        _this.winMjItemList = [];
        _this.setNode(node);
        return _this;
    }
    ErmjWinListTipsView.prototype.initView = function () {
        this.bgNode = this.getChild("bgNode");
        this.winCount = this.getComponent("winCount", cc.Label);
        this.listLayout = this.getComponent("listLayout", cc.Layout);
        this.copyNode = this.getChild("winMjItem");
        this.copyNode.active = false;
    };
    ErmjWinListTipsView.prototype.updateWinList = function (winArr) {
        if (winArr === void 0) { winArr = []; }
        this.hideAllMj();
        var typeCount = winArr.length;
        var mjCount = 0;
        for (var i = 0; i < winArr.length; i++) {
            var info = winArr[i];
            var mjItem = this.winMjItemList[i];
            if (!mjItem)
                mjItem = this.getOneWinMjItem();
            mjItem.active = true;
            mjItem.setInfo(info.card, info.fan, info.num);
            mjCount += info.num;
        }
        this.winCount.string = "" + mjCount;
        var mul = typeCount >= bgMinContain ? typeCount - bgMinContain : 0;
        this.bgNode.width = bgMinWidth + mul * bgStepWidth;
    };
    ErmjWinListTipsView.prototype.getOneWinMjItem = function () {
        var node = cc.instantiate(this.copyNode);
        node.setParent(this.listLayout.node);
        var view = new WinMjItemView(node);
        this.winMjItemList.push(view);
        return view;
    };
    ErmjWinListTipsView.prototype.hideAllMj = function () {
        this.winMjItemList.forEach(function (item) {
            item.active = false;
        });
    };
    return ErmjWinListTipsView;
}(ErmjBaseView_1.default));
exports.default = ErmjWinListTipsView;
var WinMjItemView = /** @class */ (function (_super) {
    __extends(WinMjItemView, _super);
    function WinMjItemView(node) {
        var _this = _super.call(this) || this;
        _this.setNode(node);
        return _this;
    }
    WinMjItemView.prototype.initView = function () {
        this.frontSp = this.getComponent("front", cc.Sprite);
        this.countLbl = this.getComponent("countLbl", cc.Label);
        this.multLbl = this.getComponent("multLbl", cc.Label);
    };
    WinMjItemView.prototype.setInfo = function (value, nMult, nCount) {
        Global.ResourceManager.loadBundleAutoAtlas(ErmjGameConst_1.default.Gid, this.frontSp, ErmjPathHelper_1.default.gameTexturePath + "mahjong/atlas_mahjong", ErmjMjStyleHelper_1.default.mjOutMap[value], null, true);
        this.countLbl.string = "x" + nCount;
        this.multLbl.string = nMult + "\u756A";
    };
    return WinMjItemView;
}(ErmjBaseView_1.default));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcc3ViVmlld1xcRXJtaldpbkxpc3RUaXBzVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBMEM7QUFDMUMseURBQW9EO0FBQ3BELCtEQUEwRDtBQUMxRCx1REFBa0Q7QUFFbEQsSUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDO0FBQ3ZCLElBQU0sWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFLLFVBQVU7QUFDdEMsSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCO0lBQWlELHVDQUFZO0lBT3pELDZCQUFZLElBQWE7UUFBekIsWUFDSSxpQkFBTyxTQUVWO1FBTE8sbUJBQWEsR0FBb0IsRUFBRSxDQUFDO1FBSXhDLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7O0lBQ3ZCLENBQUM7SUFFUyxzQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFFTSwyQ0FBYSxHQUFwQixVQUFxQixNQUFrQjtRQUFsQix1QkFBQSxFQUFBLFdBQWtCO1FBQ25DLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLFNBQVMsR0FBRyxNQUFNLENB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LENBQUMsTUFBTSxHQUFNLEtBQUssV0FBRyxDQUFDO0lBQ3RDLENBQUM7SUFDTCxvQkFBQztBQUFELENBckJBLEFBcUJDLENBckIyQixzQkFBWSxHQXFCdkMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtakJhc2VWaWV3IGZyb20gXCIuL0VybWpCYXNlVmlld1wiO1xyXG5pbXBvcnQgRXJtalBhdGhIZWxwZXIgZnJvbSBcIi4uL2RhdGEvRXJtalBhdGhIZWxwZXJcIjtcclxuaW1wb3J0IEVybWpNalN0eWxlSGVscGVyIGZyb20gXCIuLi90b29sL0VybWpNalN0eWxlSGVscGVyXCI7XHJcbmltcG9ydCBFcm1qR2FtZUNvbnN0IGZyb20gXCIuLi9kYXRhL0VybWpHYW1lQ29uc3RcIjtcclxuXHJcbmNvbnN0IGJnTWluV2lkdGggPSAyNjQ7XHJcbmNvbnN0IGJnTWluQ29udGFpbiA9IDI7ICAgICAvLyDmnIDlsI/lrr3lj6/lrrnnurPmlbBcclxuY29uc3QgYmdTdGVwV2lkdGggPSA2NTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJtaldpbkxpc3RUaXBzVmlldyBleHRlbmRzIEVybWpCYXNlVmlld3tcclxuICAgIHByaXZhdGUgYmdOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSB3aW5Db3VudDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIGxpc3RMYXlvdXQ6IGNjLkxheW91dDtcclxuICAgIHByaXZhdGUgY29weU5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHdpbk1qSXRlbUxpc3Q6IFdpbk1qSXRlbVZpZXdbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlKG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBpbml0Vmlldygpe1xyXG4gICAgICAgIHRoaXMuYmdOb2RlID0gdGhpcy5nZXRDaGlsZChcImJnTm9kZVwiKTtcclxuICAgICAgICB0aGlzLndpbkNvdW50ID0gdGhpcy5nZXRDb21wb25lbnQoXCJ3aW5Db3VudFwiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5saXN0TGF5b3V0ID0gdGhpcy5nZXRDb21wb25lbnQoXCJsaXN0TGF5b3V0XCIsIGNjLkxheW91dCk7XHJcbiAgICAgICAgdGhpcy5jb3B5Tm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJ3aW5Nakl0ZW1cIik7XHJcbiAgICAgICAgdGhpcy5jb3B5Tm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlV2luTGlzdCh3aW5BcnI6IGFueVtdID0gW10pe1xyXG4gICAgICAgIHRoaXMuaGlkZUFsbE1qKCk7XHJcbiAgICAgICAgbGV0IHR5cGVDb3VudCA9IHdpbkFyci5sZW5ndGg7XHJcbiAgICAgICAgbGV0IG1qQ291bnQgPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDsgaSA8IHdpbkFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gd2luQXJyW2ldO1xyXG4gICAgICAgICAgICBsZXQgbWpJdGVtID0gdGhpcy53aW5Nakl0ZW1MaXN0W2ldO1xyXG4gICAgICAgICAgICBpZighbWpJdGVtKVxyXG4gICAgICAgICAgICAgICAgbWpJdGVtID0gdGhpcy5nZXRPbmVXaW5Nakl0ZW0oKTtcclxuICAgICAgICAgICAgbWpJdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIG1qSXRlbS5zZXRJbmZvKGluZm8uY2FyZCwgaW5mby5mYW4sIGluZm8ubnVtKTtcclxuICAgICAgICAgICAgbWpDb3VudCArPSBpbmZvLm51bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy53aW5Db3VudC5zdHJpbmcgPSBgJHttakNvdW50fWA7XHJcbiAgICAgICAgbGV0IG11bCA9IHR5cGVDb3VudCA+PSBiZ01pbkNvbnRhaW4gPyB0eXBlQ291bnQgLSBiZ01pbkNvbnRhaW4gOiAwO1xyXG4gICAgICAgIHRoaXMuYmdOb2RlLndpZHRoID0gYmdNaW5XaWR0aCArIG11bCAqIGJnU3RlcFdpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0T25lV2luTWpJdGVtKCl7XHJcbiAgICAgICAgbGV0IG5vZGUgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZSh0aGlzLmNvcHlOb2RlKTtcclxuICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLmxpc3RMYXlvdXQubm9kZSk7XHJcbiAgICAgICAgbGV0IHZpZXcgPSBuZXcgV2luTWpJdGVtVmlldyhub2RlKTtcclxuICAgICAgICB0aGlzLndpbk1qSXRlbUxpc3QucHVzaCh2aWV3KTtcclxuICAgICAgICByZXR1cm4gdmlldztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhpZGVBbGxNaigpe1xyXG4gICAgICAgIHRoaXMud2luTWpJdGVtTGlzdC5mb3JFYWNoKGl0ZW09PntcclxuICAgICAgICAgICAgaXRlbS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBXaW5Nakl0ZW1WaWV3IGV4dGVuZHMgRXJtakJhc2VWaWV3e1xyXG4gICAgcHJpdmF0ZSBmcm9udFNwOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIGNvdW50TGJsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgbXVsdExibDogY2MuTGFiZWw7XHJcblxyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCl7XHJcbiAgICAgICAgdGhpcy5mcm9udFNwID0gdGhpcy5nZXRDb21wb25lbnQoXCJmcm9udFwiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuY291bnRMYmwgPSB0aGlzLmdldENvbXBvbmVudChcImNvdW50TGJsXCIsIGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLm11bHRMYmwgPSB0aGlzLmdldENvbXBvbmVudChcIm11bHRMYmxcIiwgY2MuTGFiZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRJbmZvKHZhbHVlOiBudW1iZXIsIG5NdWx0OiBudW1iZXIsIG5Db3VudDogbnVtYmVyKXtcclxuICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRCdW5kbGVBdXRvQXRsYXMoRXJtakdhbWVDb25zdC5HaWQsIHRoaXMuZnJvbnRTcCwgRXJtalBhdGhIZWxwZXIuZ2FtZVRleHR1cmVQYXRoICsgXCJtYWhqb25nL2F0bGFzX21haGpvbmdcIiwgRXJtak1qU3R5bGVIZWxwZXIubWpPdXRNYXBbdmFsdWVdLCBudWxsLCB0cnVlKTtcclxuICAgICAgICB0aGlzLmNvdW50TGJsLnN0cmluZyA9IGB4JHtuQ291bnR9YDtcclxuICAgICAgICB0aGlzLm11bHRMYmwuc3RyaW5nID0gYCR7bk11bHR955WqYDtcclxuICAgIH1cclxufSJdfQ==