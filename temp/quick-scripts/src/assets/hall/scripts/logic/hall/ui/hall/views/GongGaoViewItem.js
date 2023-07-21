"use strict";
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