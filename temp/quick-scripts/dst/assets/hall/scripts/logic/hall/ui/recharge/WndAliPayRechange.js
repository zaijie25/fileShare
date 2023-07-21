
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/WndAliPayRechange.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '34f90OHcGZOz7wNSpZALSiL', 'WndAliPayRechange');
// hall/scripts/logic/hall/ui/recharge/WndAliPayRechange.ts

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
var WndBase_1 = require("../../../core/ui/WndBase");
var WndAliPayRechange = /** @class */ (function (_super) {
    __extends(WndAliPayRechange, _super);
    function WndAliPayRechange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WndAliPayRechange.prototype.onInit = function () {
        this.name = "WndAliPayRechange";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/AliPayRechargeUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndAliPayRechange.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.nameLabel = this.getChild("bankNode/nameLabel").getComponent(cc.Label);
        this.numberLabel = this.getChild("bankNode/numberLabel").getComponent(cc.Label);
        this.bankNameLabel = this.getChild("bankNode/bankNameLabel").getComponent(cc.Label);
        this.addresLabel = this.getChild("bankNode/addresLabel").getComponent(cc.Label);
        // this.bgNode.node.active = false;
        // this.imageNode.spriteFrame = null;
        this.addCommonClick("headNode/btnBack", this.goBack, this, cc.Button.Transition.NONE);
        this.addCommonClick("headNode/helpNode", this.goBack, this, cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/nameLabel/copyNode", this.copyName, this, cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/numberLabel/copyNode", this.copyNumber, this, cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/bankNameLabel/copyNode", this.copyBankName, this, cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/addresLabel/copyNode", this.copyAddres, this, cc.Button.Transition.NONE);
    };
    WndAliPayRechange.prototype.onOpen = function () {
        var data = this.args[0];
        this.nameLabel.string = data['account']; //支付宝账号
        this.addresLabel.string = data['name']; //支付宝姓名
        // this.numberLabel.string     = data['bank_zhi']  //支付宝姓
        // this.bankNameLabel.string   = data['bank_type'] //支付宝名
    };
    WndAliPayRechange.prototype.goBack = function () {
        this.close();
    };
    WndAliPayRechange.prototype.copyName = function () {
        Global.NativeEvent.copyTextToClipboard(String(this.nameLabel.string), this.copyTextToClipboardCallBack.bind(this));
    };
    WndAliPayRechange.prototype.copyNumber = function () {
        Global.NativeEvent.copyTextToClipboard(String(this.numberLabel.string), this.copyTextToClipboardCallBack.bind(this));
    };
    WndAliPayRechange.prototype.copyBankName = function () {
        Global.NativeEvent.copyTextToClipboard(String(this.bankNameLabel.string), this.copyTextToClipboardCallBack.bind(this));
    };
    WndAliPayRechange.prototype.copyAddres = function () {
        Global.NativeEvent.copyTextToClipboard(String(this.addresLabel.string), this.copyTextToClipboardCallBack.bind(this));
    };
    /**
     * 复制回调
     * @param retStr
     */
    WndAliPayRechange.prototype.copyTextToClipboardCallBack = function (retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
        }
        else {
            Global.UI.fastTip("复制失败");
        }
    };
    return WndAliPayRechange;
}(WndBase_1.default));
exports.default = WndAliPayRechange;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcV25kQWxpUGF5UmVjaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWdFO0FBRWhFO0lBQStDLHFDQUFPO0lBQXREOztJQThEQSxDQUFDO0lBekRhLGtDQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxtQkFBbUIsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsMkNBQTJDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBVyxDQUFDLElBQUksQ0FBQztJQUN4QyxDQUFDO0lBQ1Msb0NBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDbEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEYsSUFBSSxD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dEMsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNwQixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM3QjthQUFLO1lBQ0YsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQTlEQSxBQThEQyxDQTlEOEMsaUJBQU8sR0E4RHJEIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UsIHsgRGVzdG9yeVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRBbGlQYXlSZWNoYW5nZSBleHRlbmRzIFduZEJhc2Uge1xyXG4gICAgcHJpdmF0ZSBuYW1lTGFiZWw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBudW1iZXJMYWJlbDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIGJhbmtOYW1lTGFiZWw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBhZGRyZXNMYWJlbDogY2MuTGFiZWw7XHJcbiAgICBwcm90ZWN0ZWQgb25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMubmFtZSA9IFwiV25kQWxpUGF5UmVjaGFuZ2VcIjtcclxuICAgICAgICB0aGlzLmxheWVyID0gR2xvYmFsLlVJLlBvcExheWVyO1xyXG4gICAgICAgIHRoaXMucmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1JlY2hhcmdlL0FsaVBheVJlY2hhcmdlVUlcIjtcclxuICAgICAgICB0aGlzLmRlc3RvcnlUeXBlID0gRGVzdG9yeVR5cGUuTm9uZTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLm5vZGUud2lkdGggPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS53aWR0aDtcclxuICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubmFtZUxhYmVsID0gdGhpcy5nZXRDaGlsZChcImJhbmtOb2RlL25hbWVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMubnVtYmVyTGFiZWwgPSB0aGlzLmdldENoaWxkKFwiYmFua05vZGUvbnVtYmVyTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLmJhbmtOYW1lTGFiZWwgPSB0aGlzLmdldENoaWxkKFwiYmFua05vZGUvYmFua05hbWVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuYWRkcmVzTGFiZWwgPSB0aGlzLmdldENoaWxkKFwiYmFua05vZGUvYWRkcmVzTGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAvLyB0aGlzLmJnTm9kZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMuaW1hZ2VOb2RlLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiaGVhZE5vZGUvYnRuQmFja1wiLCB0aGlzLmdvQmFjaywgdGhpcyxjYy5CdXR0b24uVHJhbnNpdGlvbi5OT05FKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiaGVhZE5vZGUvaGVscE5vZGVcIiwgdGhpcy5nb0JhY2ssIHRoaXMsY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJhbmtOb2RlL25hbWVMYWJlbC9jb3B5Tm9kZVwiLCB0aGlzLmNvcHlOYW1lLCB0aGlzLGNjLkJ1dHRvbi5UcmFuc2l0aW9uLk5PTkUpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJiYW5rTm9kZS9udW1iZXJMYWJlbC9jb3B5Tm9kZVwiLCB0aGlzLmNvcHlOdW1iZXIsIHRoaXMsY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJhbmtOb2RlL2JhbmtOYW1lTGFiZWwvY29weU5vZGVcIiwgdGhpcy5jb3B5QmFua05hbWUsIHRoaXMsY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJhbmtOb2RlL2FkZHJlc0xhYmVsL2NvcHlOb2RlXCIsIHRoaXMuY29weUFkZHJlcywgdGhpcyxjYy5CdXR0b24uVHJhbnNpdGlvbi5OT05FKTtcclxuICAgIH1cclxuICAgIG9uT3Blbigpe1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5hcmdzWzBdO1xyXG4gICAgICAgIHRoaXMubmFtZUxhYmVsLnN0cmluZyAgICAgICA9IGRhdGFbJ2FjY291bnQnXSAgIC8v5pSv5LuY5a6d6LSm5Y+3XHJcbiAgICAgICAgdGhpcy5hZGRyZXNMYWJlbC5zdHJpbmcgICAgID0gZGF0YVsnbmFtZSddICAgICAgLy/mlK/ku5jlrp3lp5PlkI1cclxuICAgICAgICAvLyB0aGlzLm51bWJlckxhYmVsLnN0cmluZyAgICAgPSBkYXRhWydiYW5rX3poaSddICAvL+aUr+S7mOWuneWnk1xyXG4gICAgICAgIC8vIHRoaXMuYmFua05hbWVMYWJlbC5zdHJpbmcgICA9IGRhdGFbJ2JhbmtfdHlwZSddIC8v5pSv5LuY5a6d5ZCNXHJcblxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGNvcHlOYW1lKCkge1xyXG4gICAgICAgIEdsb2JhbC5OYXRpdmVFdmVudC5jb3B5VGV4dFRvQ2xpcGJvYXJkKFN0cmluZyh0aGlzLm5hbWVMYWJlbC5zdHJpbmcpLCB0aGlzLmNvcHlUZXh0VG9DbGlwYm9hcmRDYWxsQmFjay5iaW5kKHRoaXMpICk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNvcHlOdW1iZXIoKSB7XHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNvcHlUZXh0VG9DbGlwYm9hcmQoU3RyaW5nKHRoaXMubnVtYmVyTGFiZWwuc3RyaW5nKSwgdGhpcy5jb3B5VGV4dFRvQ2xpcGJvYXJkQ2FsbEJhY2suYmluZCh0aGlzKSApO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjb3B5QmFua05hbWUoKSB7XHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNvcHlUZXh0VG9DbGlwYm9hcmQoU3RyaW5nKHRoaXMuYmFua05hbWVMYWJlbC5zdHJpbmcpLCB0aGlzLmNvcHlUZXh0VG9DbGlwYm9hcmRDYWxsQmFjay5iaW5kKHRoaXMpICk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNvcHlBZGRyZXMoKSB7XHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNvcHlUZXh0VG9DbGlwYm9hcmQoU3RyaW5nKHRoaXMuYWRkcmVzTGFiZWwuc3RyaW5nKSwgdGhpcy5jb3B5VGV4dFRvQ2xpcGJvYXJkQ2FsbEJhY2suYmluZCh0aGlzKSApO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlpI3liLblm57osINcclxuICAgICAqIEBwYXJhbSByZXRTdHIgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29weVRleHRUb0NsaXBib2FyZENhbGxCYWNrKHJldFN0cil7XHJcbiAgICAgICAgaWYgKHJldFN0ci5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWkjeWItuaIkOWKn1wiKTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5aSN5Yi25aSx6LSlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==