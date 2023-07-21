
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/views/GongGaoViewItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6e31aycXtpDU4s02U4UPcs5', 'GongGaoViewItem');
// hall/scripts/logic/hall/ui/hall/views/GongGaoViewItem.ts

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
var ViewBase_1 = require("../../../../core/ui/ViewBase");
var SpreadEvent_1 = require("../../Spread/SpreadEvent");
var CodeTipView_1 = require("../../waiting/CodeTipView");
var BindingButtonEffect_1 = require("../../../../core/component/BindingButtonEffect");
var GongGaoViewItem = /** @class */ (function (_super) {
    __extends(GongGaoViewItem, _super);
    function GongGaoViewItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GongGaoViewItem.prototype.initView = function () {
        this.icon = this.getComponent("content/guangao_di", cc.Sprite);
        this.childrenRoot = this.getChild("content");
        //let btn = this.getChild("btn")
        //btn.on("click", this.onClick, this);
        Global.UIHelper.addCommonClick(this.node, "content/btn", this.onClick, this);
        this.childrenRoot.addComponent(BindingButtonEffect_1.default);
        if (cc.isValid(this.getChild("content/codeTip"))) {
            this.codeTip = this.getChild("content/codeTip").getComponent(CodeTipView_1.default);
        }
        this.SpreadModel = Global.ModelManager.getModel("SpreadModel");
    };
    //{type:1, subtype, param}
    //1 弹窗 点击
    //2 二维码
    GongGaoViewItem.prototype.setData = function (info, pageView) {
        if (pageView === void 0) { pageView = null; }
        if (info == null) {
            this.node.active = false;
            return;
        }
        this.pageView = pageView;
        if (!this.node || !this.node.isValid) {
            return;
        }
        this.info = info;
        if (info.type == 2) {
            this.SpreadModel.on(SpreadEvent_1.SpreadEvent.RefreshShortUrl, this, this.initQrImg);
            this.initQrImg();
        }
    };
    GongGaoViewItem.prototype.moveSpine = function (rootNode) {
    };
    GongGaoViewItem.prototype.onOpen = function () {
    };
    GongGaoViewItem.prototype.getData = function () {
        return this.info;
    };
    GongGaoViewItem.prototype.initQrImg = function () {
        if (!this.node || !this.node.isValid) {
            return;
        }
        var node = this.getChild("content/qrNode");
        this.codeTip.tips.string = "正在获取";
        if (node != null) {
            var url = Global.Setting.Urls.inviteUrl;
            url = this.SpreadModel.Url || url;
            // if (this.SpreadModel.urlType != 1) {
            //     this.codeTip.error();
            // }else{
            Global.Toolkit.initQRCode(node, url, 5);
            if (this.pageView && cc.isValid(this.pageView)) {
                this.pageView.updatePage(this.node);
            }
            this.codeTip.success();
            // }
        }
    };
    GongGaoViewItem.prototype.onDestoy = function () {
        this.SpreadModel.off(SpreadEvent_1.SpreadEvent.RefreshShortUrl, this, this.initQrImg);
    };
    GongGaoViewItem.prototype.onClick = function () {
        if (this.info.type == 1) {
            switch (this.info.subtype) {
                //财富秘籍
                case 1:
                    {
                        Global.Event.event(GlobalEvent.SHOW_NET_WAITING, "WndSpread");
                        Global.UI.show("WndSpread");
                        break;
                    }
                //复制官网
                case 2:
                    {
                        this.copyUrl();
                        break;
                    }
                //修复
                case 3:
                    {
                        this.openBackUrl();
                        break;
                    }
                //充值
                case 4:
                    {
                        Global.UI.show("WndRecharge", "vippay");
                        break;
                    }
            }
        }
        else if (this.info.type == 2) {
            Global.UI.show("WndSpreadCenter");
        }
        else if (this.info.type == 3) {
            cc.sys.openURL(Global.Toolkit.DealWithUrl(this.info.subtype));
        }
    };
    GongGaoViewItem.prototype.InitVipCharge = function () {
        var vipNum = Global.ModelManager.getModel("RechagreTipModel").Salenum;
        var rateLabel = this.getComponent("content/rateLabel", cc.Label);
        if (rateLabel) {
            rateLabel.string = vipNum;
        }
    };
    GongGaoViewItem.prototype.copyUrl = function () {
        var url = Global.Setting.Urls.downLoadUrl;
        Global.NativeEvent.copyTextToClipboard(url, function (retStr) {
            if (retStr.result == 0)
                Global.UI.fastTip("复制成功");
            else
                Global.UI.fastTip("复制失败");
        });
    };
    GongGaoViewItem.prototype.hideChild = function (flag) {
        if (cc.isValid(this.childrenRoot)) {
            this.childrenRoot.active = flag;
        }
    };
    GongGaoViewItem.prototype.openBackUrl = function () {
        var url = Global.Setting.Urls.getBackUrl();
        cc.sys.openURL(url);
    };
    return GongGaoViewItem;
}(ViewBase_1.default));
exports.default = GongGaoViewItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFx2aWV3c1xcR29uZ0dhb1ZpZXdJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFvRDtBQUVwRCx3REFBdUQ7QUFFdkQseURBQW9EO0FBQ3BELHNGQUFpRjtBQUNqRjtJQUE2QyxtQ0FBUTtJQUFyRDs7SUF5SkEsQ0FBQztJQWxKYSxrQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLGdDQUFnQztRQUNoQyxzQ0FBc0M7UUFDdEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsQ0FBQTtRQUN6RSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyw2QkFBbUIsQ0FBQyxDQUFBO1FBQ25ELElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBQztZQUM3QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxZQUFZLENBQUMscUJBQVcsQ0FBQyxDQUFDO1NBQzdFO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBZ0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELDBCQUEwQjtJQUMxQixTQUFTO0lBQ1QsT0FBTztJQUNBLGlDQUFPLEdBQWQsVUFBZSxJQUFJLEVBQUMsUUFBZTtR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LEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsbUNBQVMsR0FBVCxVQUFVLElBQUk7UUFFVixJQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUNoQztZQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtTQUNsQztJQUNMLENBQUM7SUFFTyxxQ0FBVyxHQUFuQjtRQUNJLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFJTCxzQkFBQztBQUFELENBekpBLEFBeUpDLENBeko0QyxrQkFBUSxHQXlKcEQiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IEFwcEhlbHBlciBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS90b29sL0FwcEhlbHBlclwiO1xyXG5pbXBvcnQgeyBTcHJlYWRFdmVudCB9IGZyb20gXCIuLi8uLi9TcHJlYWQvU3ByZWFkRXZlbnRcIjtcclxuaW1wb3J0IFNwcmVhZE1vZGVsIGZyb20gXCIuLi8uLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1NwcmVhZE1vZGVsXCI7XHJcbmltcG9ydCBDb2RlVGlwVmlldyBmcm9tIFwiLi4vLi4vd2FpdGluZy9Db2RlVGlwVmlld1wiO1xyXG5pbXBvcnQgQmluZGluZ0J1dHRvbkVmZmVjdCBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9jb21wb25lbnQvQmluZGluZ0J1dHRvbkVmZmVjdFwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHb25nR2FvVmlld0l0ZW0gZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICBwdWJsaWMgaWNvbjogY2MuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBpbmZvOiBhbnk7XHJcbiAgICBTcHJlYWRNb2RlbDogU3ByZWFkTW9kZWw7XHJcbiAgICBwcml2YXRlIHBhZ2VWaWV3OmFueVxyXG4gICAgcHJpdmF0ZSBjb2RlVGlwOiBDb2RlVGlwVmlldztcclxuICAgIHByaXZhdGUgY2hpbGRyZW5Sb290OmNjLk5vZGVcclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLmljb24gPSB0aGlzLmdldENvbXBvbmVudChcImNvbnRlbnQvZ3Vhbmdhb19kaVwiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5Sb290ID0gdGhpcy5nZXRDaGlsZChcImNvbnRlbnRcIik7XHJcbiAgICAgICAgLy9sZXQgYnRuID0gdGhpcy5nZXRDaGlsZChcImJ0blwiKVxyXG4gICAgICAgIC8vYnRuLm9uKFwiY2xpY2tcIiwgdGhpcy5vbkNsaWNrLCB0aGlzKTtcclxuICAgICAgICBHbG9iYWwuVUlIZWxwZXIuYWRkQ29tbW9uQ2xpY2sodGhpcy5ub2RlLFwiY29udGVudC9idG5cIix0aGlzLm9uQ2xpY2ssdGhpcylcclxuICAgICAgICB0aGlzLmNoaWxkcmVuUm9vdC5hZGRDb21wb25lbnQoQmluZGluZ0J1dHRvbkVmZmVjdClcclxuICAgICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLmdldENoaWxkKFwiY29udGVudC9jb2RlVGlwXCIpKSl7XHJcbiAgICAgICAgICAgIHRoaXMuY29kZVRpcCA9IHRoaXMuZ2V0Q2hpbGQoXCJjb250ZW50L2NvZGVUaXBcIikuZ2V0Q29tcG9uZW50KENvZGVUaXBWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TcHJlYWRNb2RlbCA9IDxTcHJlYWRNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiU3ByZWFkTW9kZWxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLy97dHlwZToxLCBzdWJ0eXBlLCBwYXJhbX1cclxuICAgIC8vMSDlvLnnqpcg54K55Ye7XHJcbiAgICAvLzIg5LqM57u056CBXHJcbiAgICBwdWJsaWMgc2V0RGF0YShpbmZvLHBhZ2VWaWV3ID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChpbmZvID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFnZVZpZXcgPSBwYWdlVmlld1xyXG4gICAgICAgIGlmKCF0aGlzLm5vZGUgfHwgIXRoaXMubm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5mbyA9IGluZm87XHJcbiAgICAgICAgaWYgKGluZm8udHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlNwcmVhZE1vZGVsLm9uKFNwcmVhZEV2ZW50LlJlZnJlc2hTaG9ydFVybCwgdGhpcywgdGhpcy5pbml0UXJJbWcpXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFFySW1nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVTcGluZShyb290Tm9kZSlcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbk9wZW4oKVxyXG4gICAge1xyXG4gICAgfVxyXG4gICBcclxuICAgIHB1YmxpYyBnZXREYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluZm87XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0UXJJbWcoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMubm9kZSB8fCAhdGhpcy5ub2RlLmlzVmFsaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmdldENoaWxkKFwiY29udGVudC9xck5vZGVcIik7XHJcbiAgICAgICAgdGhpcy5jb2RlVGlwLnRpcHMuc3RyaW5nID0gXCLmraPlnKjojrflj5ZcIjtcclxuICAgICAgICBpZiAobm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmludml0ZVVybDtcclxuICAgICAgICAgICAgdXJsID0gdGhpcy5TcHJlYWRNb2RlbC5VcmwgfHwgdXJsXHJcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLlNwcmVhZE1vZGVsLnVybFR5cGUgIT0gMSkge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5jb2RlVGlwLmVycm9yKCk7XHJcbiAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlRvb2xraXQuaW5pdFFSQ29kZShub2RlLCB1cmwsIDUpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5wYWdlVmlldyAmJiBjYy5pc1ZhbGlkKHRoaXMucGFnZVZpZXcpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnZVZpZXcudXBkYXRlUGFnZSh0aGlzLm5vZGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGVUaXAuc3VjY2VzcygpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRlc3RveSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TcHJlYWRNb2RlbC5vZmYoU3ByZWFkRXZlbnQuUmVmcmVzaFNob3J0VXJsLCB0aGlzLCB0aGlzLmluaXRRckltZylcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2xpY2soKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmluZm8udHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5pbmZvLnN1YnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIC8v6LSi5a+M56eY57GNXHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU0hPV19ORVRfV0FJVElORywgXCJXbmRTcHJlYWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRTcHJlYWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v5aSN5Yi25a6Y572RXHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvcHlVcmwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/kv67lpI1cclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbkJhY2tVcmwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/lhYXlgLxcclxuICAgICAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kUmVjaGFyZ2VcIiwgXCJ2aXBwYXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNlIGlmICh0aGlzLmluZm8udHlwZSA9PSAyKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kU3ByZWFkQ2VudGVyXCIpO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMuaW5mby50eXBlID09IDMpe1xyXG4gICAgICAgICAgICBjYy5zeXMub3BlblVSTChHbG9iYWwuVG9vbGtpdC5EZWFsV2l0aFVybCh0aGlzLmluZm8uc3VidHlwZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBJbml0VmlwQ2hhcmdlKCkge1xyXG4gICAgICAgIGxldCB2aXBOdW0gPSAgR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlJlY2hhZ3JlVGlwTW9kZWxcIikuU2FsZW51bVxyXG4gICAgICAgIGxldCByYXRlTGFiZWwgOiBjYy5MYWJlbCA9dGhpcy5nZXRDb21wb25lbnQoXCJjb250ZW50L3JhdGVMYWJlbFwiLGNjLkxhYmVsKVxyXG4gICAgICAgIGlmKHJhdGVMYWJlbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJhdGVMYWJlbC5zdHJpbmcgPSB2aXBOdW1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb3B5VXJsKCkge1xyXG4gICAgICAgIGxldCB1cmwgPSBHbG9iYWwuU2V0dGluZy5VcmxzLmRvd25Mb2FkVXJsXHJcbiAgICAgICAgR2xvYmFsLk5hdGl2ZUV2ZW50LmNvcHlUZXh0VG9DbGlwYm9hcmQodXJsLCAocmV0U3RyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXRTdHIucmVzdWx0ID09IDApXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuZmFzdFRpcChcIuWkjeWItuaIkOWKn1wiKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLmZhc3RUaXAoXCLlpI3liLblpLHotKVcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZUNoaWxkKGZsYWcpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoY2MuaXNWYWxpZCh0aGlzLmNoaWxkcmVuUm9vdCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuUm9vdC5hY3RpdmUgPSBmbGFnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb3BlbkJhY2tVcmwoKSB7XHJcbiAgICAgICAgbGV0IHVybCA9IEdsb2JhbC5TZXR0aW5nLlVybHMuZ2V0QmFja1VybCgpO1xyXG4gICAgICAgIGNjLnN5cy5vcGVuVVJMKHVybCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuIl19