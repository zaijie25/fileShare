
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/WndBankRechange.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ba0daI56r1EV6yugyjKE/Gg', 'WndBankRechange');
// hall/scripts/logic/hall/ui/recharge/WndBankRechange.ts

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
var WndBankRechange = /** @class */ (function (_super) {
    __extends(WndBankRechange, _super);
    function WndBankRechange() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.colorString = {
            1000: "#478CF6",
            1001: "#14AE58",
            1002: "#EAB429",
        };
        return _this;
    }
    WndBankRechange.prototype.onInit = function () {
        this.name = "WndBankRechange";
        this.layer = Global.UI.PopLayer;
        this.resPath = "hall/prefabs/ui/Recharge/BankRechangeUI";
        this.destoryType = WndBase_1.DestoryType.None;
    };
    WndBankRechange.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.bg = this.getChild("bg");
        this.tipNode = this.getChild("tipNode");
        this.bankNode = this.getChild("bankNode");
        this.textNode = this.getChild("bankNode/textNode");
        this.titleLabel = this.getChild("bankNode/titleLabel").getComponent(cc.Label);
        this.iconSprite = this.getChild("bankNode/iconSprite").getComponent(cc.Sprite);
        this.nameLabel = this.getChild("bankNode/textNode/nameLabel").getComponent(cc.Label);
        this.numberLabel = this.getChild("bankNode/textNode/numberLabel").getComponent(cc.Label);
        this.bankNameLabel = this.getChild("bankNode/textNode/bankNameLabel").getComponent(cc.Label);
        this.textLabel = this.getChild("bankNode/textLabel").getComponent(cc.Label);
        this.tipsLabel = this.getChild("tipNode/tips/tipsLabel").getComponent(cc.Label);
        this.addCommonClick("headNode/btnBack", this.goBack, this, cc.Button.Transition.NONE);
        this.addCommonClick("headNode/helpNode", this.goBack, this, cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/textNode/nameLabel/copyNode", this.copyName, this, cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/textNode/numberLabel/copyNode", this.copyNumber, this, cc.Button.Transition.NONE);
        this.addCommonClick("bankNode/textNode/bankNameLabel/copyNode", this.copyBankName, this, cc.Button.Transition.NONE);
        // this.addCommonClick("bankNode/addresLabel/copyNode", this.copyAddres, this,cc.Button.Transition.NONE);
    };
    WndBankRechange.prototype.onOpen = function () {
        // 392
        var data = this.args[0];
        var colorStr = this.colorString[data.pay_type];
        this.bg.color = new cc.Color().fromHEX(colorStr);
        this.nameLabel.string = data['name']; //银行卡姓名
        this.numberLabel.string = data['account']; //银行卡卡号
        this.bankNameLabel.string = data['bank_type']; //银行名称
        // this.addresLabel.string     = data['bank_zhi']  //支行名称
        this.tipsLabel.string = data['tips']; //温馨提示
        this.updateUI(data);
    };
    //更新界面
    WndBankRechange.prototype.updateUI = function (data) {
        var tipWidget = this.tipNode.getComponent(cc.Widget);
        if (data.pay_type == "1002") {
            this.bankNode.height = 310;
            tipWidget.top = 530;
            this.textNode.y = -180;
            this.textLabel.node.active = true;
        }
        else {
            this.bankNode.height = 270;
            tipWidget.top = 490;
            this.textNode.y = -130;
            this.textLabel.node.active = false;
        }
        tipWidget.updateAlignment();
        if (data.pay_type == "1000") {
            this.titleLabel.string = "支付宝银行卡转账";
            Global.ResourceManager.loadAutoAtlas(this.iconSprite, "hall/texture/hall/chat/chat", "f_35", null, false);
            this.iconSprite.node.x = -110;
        }
        else if (data.pay_type == "1001") {
            this.titleLabel.string = "微信银行卡转账";
            Global.ResourceManager.loadAutoAtlas(this.iconSprite, "hall/texture/hall/chat/chat", "f_36", null, false);
            this.iconSprite.node.x = -100;
        }
        else {
            this.titleLabel.string = "银行卡收款";
            Global.ResourceManager.loadAutoAtlas(this.iconSprite, "hall/texture/hall/chat/chat", "f_34", null, false);
            this.iconSprite.node.x = -70;
        }
    };
    WndBankRechange.prototype.goBack = function () {
        this.close();
    };
    WndBankRechange.prototype.copyName = function () {
        Global.NativeEvent.copyTextToClipboard(String(this.nameLabel.string), this.copyTextToClipboardCallBack.bind(this));
    };
    WndBankRechange.prototype.copyNumber = function () {
        Global.NativeEvent.copyTextToClipboard(String(this.numberLabel.string), this.copyTextToClipboardCallBack.bind(this));
    };
    WndBankRechange.prototype.copyBankName = function () {
        Global.NativeEvent.copyTextToClipboard(String(this.bankNameLabel.string), this.copyTextToClipboardCallBack.bind(this));
    };
    // private copyAddres() {
    //     Global.NativeEvent.copyTextToClipboard(String(this.addresLabel.string), this.copyTextToClipboardCallBack.bind(this) );
    // }
    /**
     * 复制回调
     * @param retStr
     */
    WndBankRechange.prototype.copyTextToClipboardCallBack = function (retStr) {
        if (retStr.result == 0) {
            Global.UI.fastTip("复制成功");
        }
        else {
            Global.UI.fastTip("复制失败");
        }
    };
    return WndBankRechange;
}(WndBase_1.default));
exports.default = WndBankRechange;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcV25kQmFua1JlY2hhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFnRTtBQUVoRTtJQUE2QyxtQ0FBTztJQUFwRDtRQUFBLHFFQW9IQztRQXZHVyxpQkFBVyxHQUFFO1lBQ2pCLElBQUksRUFBQyxTQUFTO1lBQ2QsSUFBSSxFQUFDLFNBQVM7WUFDZCxJQUFJLEVBQUMsU0FBUztTQUNqQixDQUFDOztJQW1HTixDQUFDO0lBbEdhLGdDQUFNLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcseUNBQXlDLENBQUM7UUFDekQsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBVyxDQUFDLElBQUksQ0FBQztJQUN4QyxDQUFDO0lBQ1Msa0NBQVEsR0FBbEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckQsSUFBSSxDQUFDLEVBQUUsR0FBZSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FB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QUFDO0lBQ08sc0NBQVksR0FBcEI7UUFDSSxNQUFNLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQztJQUM1SCxDQUFDO0lBQ0QseUJBQXlCO0lBQ3pCLDZIQUE2SDtJQUM3SCxJQUFJO0lBQ0o7OztPQUdHO0lBQ0sscURBQTJCLEdBQW5DLFVBQW9DLE1BQU07UUFDdEMsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNwQixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM3QjthQUFLO1lBQ0YsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQXBIQSxBQW9IQyxDQXBINEMsaUJBQU8sR0FvSG5EIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFduZEJhc2UsIHsgRGVzdG9yeVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9XbmRCYXNlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXbmRCYW5rUmVjaGFuZ2UgZXh0ZW5kcyBXbmRCYXNlIHtcclxuICAgIHByaXZhdGUgbmFtZUxhYmVsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgbnVtYmVyTGFiZWw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBiYW5rTmFtZUxhYmVsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgdGlwc0xhYmVsOiBjYy5MYWJlbDtcclxuXHJcbiAgICBwcml2YXRlIHRpdGxlTGFiZWw6IGNjLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBpY29uU3ByaXRlOiBjYy5TcHJpdGU7XHJcbiAgICBwcml2YXRlIHRpcE5vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGJhbmtOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSB0ZXh0Tm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgdGV4dExhYmVsOiBjYy5MYWJlbDtcclxuICAgIHByaXZhdGUgYmc6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGNvbG9yU3RyaW5nPSB7XHJcbiAgICAgICAgMTAwMDpcIiM0NzhDRjZcIixcclxuICAgICAgICAxMDAxOlwiIzE0QUU1OFwiLFxyXG4gICAgICAgIDEwMDI6XCIjRUFCNDI5XCIsXHJcbiAgICB9O1xyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlduZEJhbmtSZWNoYW5nZVwiO1xyXG4gICAgICAgIHRoaXMubGF5ZXIgPSBHbG9iYWwuVUkuUG9wTGF5ZXI7XHJcbiAgICAgICAgdGhpcy5yZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvUmVjaGFyZ2UvQmFua1JlY2hhbmdlVUlcIjtcclxuICAgICAgICB0aGlzLmRlc3RvcnlUeXBlID0gRGVzdG9yeVR5cGUuTm9uZTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLm5vZGUud2lkdGggICAgID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodCAgICA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodDtcclxuICAgICAgICB0aGlzLmJnICAgICAgICAgICAgID0gdGhpcy5nZXRDaGlsZChcImJnXCIpO1xyXG4gICAgICAgIHRoaXMudGlwTm9kZSAgICAgICAgPSB0aGlzLmdldENoaWxkKFwidGlwTm9kZVwiKTtcclxuICAgICAgICB0aGlzLmJhbmtOb2RlICAgICAgID0gdGhpcy5nZXRDaGlsZChcImJhbmtOb2RlXCIpO1xyXG4gICAgICAgIHRoaXMudGV4dE5vZGUgICAgICAgPSB0aGlzLmdldENoaWxkKFwiYmFua05vZGUvdGV4dE5vZGVcIik7XHJcbiAgICAgICAgdGhpcy50aXRsZUxhYmVsICAgICA9IHRoaXMuZ2V0Q2hpbGQoXCJiYW5rTm9kZS90aXRsZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5pY29uU3ByaXRlICAgICA9IHRoaXMuZ2V0Q2hpbGQoXCJiYW5rTm9kZS9pY29uU3ByaXRlXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMubmFtZUxhYmVsICAgICAgPSB0aGlzLmdldENoaWxkKFwiYmFua05vZGUvdGV4dE5vZGUvbmFtZUxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5udW1iZXJMYWJlbCAgICA9IHRoaXMuZ2V0Q2hpbGQoXCJiYW5rTm9kZS90ZXh0Tm9kZS9udW1iZXJMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuYmFua05hbWVMYWJlbCAgPSB0aGlzLmdldENoaWxkKFwiYmFua05vZGUvdGV4dE5vZGUvYmFua05hbWVMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMudGV4dExhYmVsICAgID0gdGhpcy5nZXRDaGlsZChcImJhbmtOb2RlL3RleHRMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMudGlwc0xhYmVsICAgICAgPSB0aGlzLmdldENoaWxkKFwidGlwTm9kZS90aXBzL3RpcHNMYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJoZWFkTm9kZS9idG5CYWNrXCIsIHRoaXMuZ29CYWNrLCB0aGlzLGNjLkJ1dHRvbi5UcmFuc2l0aW9uLk5PTkUpO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJoZWFkTm9kZS9oZWxwTm9kZVwiLCB0aGlzLmdvQmFjaywgdGhpcyxjYy5CdXR0b24uVHJhbnNpdGlvbi5OT05FKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYmFua05vZGUvdGV4dE5vZGUvbmFtZUxhYmVsL2NvcHlOb2RlXCIsIHRoaXMuY29weU5hbWUsIHRoaXMsY2MuQnV0dG9uLlRyYW5zaXRpb24uTk9ORSk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcImJhbmtOb2RlL3RleHROb2RlL251bWJlckxhYmVsL2NvcHlOb2RlXCIsIHRoaXMuY29weU51bWJlciwgdGhpcyxjYy5CdXR0b24uVHJhbnNpdGlvbi5OT05FKTtcclxuICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYmFua05vZGUvdGV4dE5vZGUvYmFua05hbWVMYWJlbC9jb3B5Tm9kZVwiLCB0aGlzLmNvcHlCYW5rTmFtZSwgdGhpcyxjYy5CdXR0b24uVHJhbnNpdGlvbi5OT05FKTtcclxuICAgICAgICAvLyB0aGlzLmFkZENvbW1vbkNsaWNrKFwiYmFua05vZGUvYWRkcmVzTGFiZWwvY29weU5vZGVcIiwgdGhpcy5jb3B5QWRkcmVzLCB0aGlzLGNjLkJ1dHRvbi5UcmFuc2l0aW9uLk5PTkUpO1xyXG4gICAgfVxyXG4gICAgb25PcGVuKCl7XHJcbiAgICAgICAgLy8gMzkyXHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmFyZ3NbMF07XHJcbiAgICAgICAgbGV0IGNvbG9yU3RyID0gdGhpcy5jb2xvclN0cmluZ1tkYXRhLnBheV90eXBlXTtcclxuICAgICAgICB0aGlzLmJnLmNvbG9yID0gIG5ldyBjYy5Db2xvcigpLmZyb21IRVgoY29sb3JTdHIpO1xyXG4gICAgICAgIHRoaXMubmFtZUxhYmVsLnN0cmluZyAgICAgICA9IGRhdGFbJ25hbWUnXSAgICAgIC8v6ZO26KGM5Y2h5aeT5ZCNXHJcbiAgICAgICAgdGhpcy5udW1iZXJMYWJlbC5zdHJpbmcgICAgID0gZGF0YVsnYWNjb3VudCddICAgLy/pk7booYzljaHljaHlj7dcclxuICAgICAgICB0aGlzLmJhbmtOYW1lTGFiZWwuc3RyaW5nICAgPSBkYXRhWydiYW5rX3R5cGUnXSAvL+mTtuihjOWQjeensFxyXG4gICAgICAgIC8vIHRoaXMuYWRkcmVzTGFiZWwuc3RyaW5nICAgICA9IGRhdGFbJ2JhbmtfemhpJ10gIC8v5pSv6KGM5ZCN56ewXHJcbiAgICAgICAgdGhpcy50aXBzTGFiZWwuc3RyaW5nICAgICAgID0gZGF0YVsndGlwcyddICAgICAgLy/muKnppqjmj5DnpLpcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVVSShkYXRhKTtcclxuICAgIH1cclxuICAgIC8v5pu05paw55WM6Z2iXHJcbiAgICBwcml2YXRlIHVwZGF0ZVVJKGRhdGEpe1xyXG4gICAgICAgIGxldCB0aXBXaWRnZXQgPSB0aGlzLnRpcE5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XHJcbiAgICAgICAgaWYoZGF0YS5wYXlfdHlwZSA9PSBcIjEwMDJcIil7XHJcbiAgICAgICAgICAgIHRoaXMuYmFua05vZGUuaGVpZ2h0ID0gMzEwXHJcbiAgICAgICAgICAgIHRpcFdpZGdldC50b3AgPSA1MzA7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dE5vZGUueSA9IC0xODA7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dExhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5iYW5rTm9kZS5oZWlnaHQgPSAyNzBcclxuICAgICAgICAgICAgdGlwV2lkZ2V0LnRvcCA9IDQ5MDtcclxuICAgICAgICAgICAgdGhpcy50ZXh0Tm9kZS55ID0gLTEzMDtcclxuICAgICAgICAgICAgdGhpcy50ZXh0TGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGlwV2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xyXG5cclxuICAgICAgICBpZihkYXRhLnBheV90eXBlID09IFwiMTAwMFwiKXtcclxuICAgICAgICAgICAgdGhpcy50aXRsZUxhYmVsLnN0cmluZyA9IFwi5pSv5LuY5a6d6ZO26KGM5Y2h6L2s6LSmXCI7XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLmljb25TcHJpdGUsXCJoYWxsL3RleHR1cmUvaGFsbC9jaGF0L2NoYXRcIiwgXCJmXzM1XCIsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5pY29uU3ByaXRlLm5vZGUueCA9IC0xMTBcclxuICAgICAgICB9ZWxzZSBpZihkYXRhLnBheV90eXBlID09IFwiMTAwMVwiKXtcclxuICAgICAgICAgICAgdGhpcy50aXRsZUxhYmVsLnN0cmluZyA9IFwi5b6u5L+h6ZO26KGM5Y2h6L2s6LSmXCI7XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLmljb25TcHJpdGUsXCJoYWxsL3RleHR1cmUvaGFsbC9jaGF0L2NoYXRcIiwgXCJmXzM2XCIsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5pY29uU3ByaXRlLm5vZGUueCA9IC0xMDBcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy50aXRsZUxhYmVsLnN0cmluZyA9IFwi6ZO26KGM5Y2h5pS25qy+XCI7XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLmljb25TcHJpdGUsXCJoYWxsL3RleHR1cmUvaGFsbC9jaGF0L2NoYXRcIiwgXCJmXzM0XCIsIG51bGwsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5pY29uU3ByaXRlLm5vZGUueCA9IC03MFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgY29weU5hbWUoKSB7XHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNvcHlUZXh0VG9DbGlwYm9hcmQoU3RyaW5nKHRoaXMubmFtZUxhYmVsLnN0cmluZyksIHRoaXMuY29weVRleHRUb0NsaXBib2FyZENhbGxCYWNrLmJpbmQodGhpcykgKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY29weU51bWJlcigpIHtcclxuICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuY29weVRleHRUb0NsaXBib2FyZChTdHJpbmcodGhpcy5udW1iZXJMYWJlbC5zdHJpbmcpLCB0aGlzLmNvcHlUZXh0VG9DbGlwYm9hcmRDYWxsQmFjay5iaW5kKHRoaXMpICk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNvcHlCYW5rTmFtZSgpIHtcclxuICAgICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuY29weVRleHRUb0NsaXBib2FyZChTdHJpbmcodGhpcy5iYW5rTmFtZUxhYmVsLnN0cmluZyksIHRoaXMuY29weVRleHRUb0NsaXBib2FyZENhbGxCYWNrLmJpbmQodGhpcykgKTtcclxuICAgIH1cclxuICAgIC8vIHByaXZhdGUgY29weUFkZHJlcygpIHtcclxuICAgIC8vICAgICBHbG9iYWwuTmF0aXZlRXZlbnQuY29weVRleHRUb0NsaXBib2FyZChTdHJpbmcodGhpcy5hZGRyZXNMYWJlbC5zdHJpbmcpLCB0aGlzLmNvcHlUZXh0VG9DbGlwYm9hcmRDYWxsQmFjay5iaW5kKHRoaXMpICk7XHJcbiAgICAvLyB9XHJcbiAgICAvKipcclxuICAgICAqIOWkjeWItuWbnuiwg1xyXG4gICAgICogQHBhcmFtIHJldFN0ciBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb3B5VGV4dFRvQ2xpcGJvYXJkQ2FsbEJhY2socmV0U3RyKXtcclxuICAgICAgICBpZiAocmV0U3RyLnJlc3VsdCA9PSAwKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi5aSN5Yi25oiQ5YqfXCIpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlpI3liLblpLHotKVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19