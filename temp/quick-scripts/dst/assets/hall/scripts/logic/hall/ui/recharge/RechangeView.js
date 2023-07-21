
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/recharge/RechangeView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '03e60/qecVHZaBxUySWxWWW', 'RechangeView');
// hall/scripts/logic/hall/ui/recharge/RechangeView.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
var RechargeModel_1 = require("../../../hallcommon/model/RechargeModel");
var RechargePayView_1 = require("./RechargePayView");
var WaitingView_1 = require("../waiting/WaitingView");
var RechangeView = /** @class */ (function (_super) {
    __extends(RechangeView, _super);
    function RechangeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curPayType = '';
        _this.toggleList = [];
        return _this;
    }
    RechangeView.prototype.onSubViewShow = function () {
        if (this.waitingNode) {
            this.waitingNode.active = true;
        }
        this.rechargePayView.subViewState = true;
        this.model.reqGetPayConfig();
    };
    RechangeView.prototype.initView = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.model = Global.ModelManager.getModel("RechargeModel");
        this.model.on(RechargeModel_1.default.ReadyForConfig, this, this.show);
        this.rechargePayView = this.addView("RechargePayView", this.getChild("payView"), RechargePayView_1.default);
        this.copyToggle = this.getChild("leftBtns/toggle_1");
        this.btnLayout = this.getComponent("leftBtns/toggleSv/view/btnLayout", cc.Layout);
        this.copyToggle.active = false;
        this.fanliIconNode = this.getChild("leftBtns/fanli");
        this.fanliIconNode.active = false;
        if (this.waitingNode == null || this.waitingNode == undefined) {
            //view 内的loading
            this.waitingNode = WaitingView_1.default.initWaitingView(this.node, cc.v2(138, 0));
        }
    };
    RechangeView.prototype.initToggleList = function () {
        var _this = this;
        var payCfgList = this.model.getPayListData();
        this.recycleToggleList();
        var isForceSelect = true;
        for (var i = 0; i < payCfgList.length; i++) {
            var item = this.toggleList[i];
            if (!item) {
                var node = cc.instantiate(this.copyToggle);
                node.setParent(this.btnLayout.node);
                item = new ToggleItem(node, this.onToggleClick, this);
                this.toggleList.push(item);
            }
            item.active = true;
            item.setItemStyle(payCfgList[i].pay_key);
            if (payCfgList[i].tip_status === 1) {
                item.addFanliIcon(this.fanliIconNode, payCfgList[i].tip);
            }
            if (this.curPayType === payCfgList[i].pay_key) { // 设置当前页签
                isForceSelect = false;
                item.setToggleChecked(true);
                item.moveFanli(true);
            }
        }
        if (!Global.Toolkit.isEmptyObject(payCfgList) && isForceSelect) {
            this.curPayType = payCfgList[0].pay_key;
            var curToggle = this.toggleList.find(function (item) { return item.itemkey == _this.curPayType; });
            if (curToggle) {
                curToggle.moveFanli(true);
            }
        }
    };
    RechangeView.prototype.ShowVip = function () {
        var viewName = "vippay";
        if (viewName == this.curPayType)
            return;
        this.curPayType = viewName;
        this.toggleList.forEach(function (Element) {
            if (Element.itemkey == viewName) {
                Element.setToggleChecked(true);
                Element.moveFanli(true);
            }
        });
        this.rechargePayView.showView(viewName);
    };
    RechangeView.prototype.recycleToggleList = function () {
        this.toggleList.forEach(function (element) {
            if (element) {
                element.active = false;
                var fanliNode = cc.find("Fanli", element.node);
                if (fanliNode) {
                    fanliNode.active = false;
                }
            }
        });
    };
    RechangeView.prototype.onToggleClick = function (name) {
        var viewName = name;
        if (viewName == this.curPayType)
            return;
        this.curPayType = viewName;
        this.rechargePayView.showView(viewName);
        this.toggleList.forEach(function (element) {
            if (element.itemkey == name) {
                element.moveFanli(true);
                element.toggleChecked(false);
            }
            else {
                element.moveFanli(false);
                element.toggleChecked(true);
            }
        });
    };
    RechangeView.prototype.show = function () {
        if (this.waitingNode) {
            this.waitingNode.active = false;
        }
        this.initToggleList();
        this.Tipmodel = Global.ModelManager.getModel("RechagreTipModel");
        if (this.Tipmodel.RechagreTipModel && this.Tipmodel.Salenum && this.Tipmodel.Salenum > 0) {
            if (this.Tipmodel.flag) {
                cc.error(this.Tipmodel.flag);
                return;
            }
            else {
                this.Tipmodel.flag = true;
                Global.UI.show("WndRechangeTip", this.Tipmodel.Salenum);
            }
        }
        this.rechargePayView.showView(this.curPayType);
    };
    RechangeView.prototype.onSubViewHide = function () {
    };
    RechangeView.prototype.onDispose = function () {
        this.curPayType = '';
        this.toggleList = [];
        if (this.model) {
            this.model.clearReqTimeout();
            this.model.off(RechargeModel_1.default.ReadyForConfig, this, this.show);
        }
    };
    return RechangeView;
}(ViewBase_1.default));
exports.default = RechangeView;
var ToggleItem = /** @class */ (function (_super) {
    __extends(ToggleItem, _super);
    //赠送入款专区特殊处理（原vip入款）
    function ToggleItem(node, callback, target) {
        var _this = _super.call(this) || this;
        _this.callback = callback;
        _this.target = target;
        _this.itemkey = '';
        //赠送入款专区特殊处理（原vip入款）
        _this.isVipItem = false; //标识是否为赠送专区入款
        _this.setNode(node);
        return _this;
    }
    ToggleItem.prototype.initView = function () {
        this.typeSprite = this.getComponent("typeSprite", cc.Sprite);
        this.addCommonClick("", this.onItemClick, this);
        this.toggleComp = this.getComponent("", cc.Toggle);
        //赠送入款专区特殊处理（原vip入款）
        this.vipSpine = this.getChild("vipSpine");
        this.vipSprite = this.getComponent("vipSprite", cc.Sprite);
        //  this.vipSprite1 = <cc.Sprite>this.getComponent("vipSprite1",cc.Sprite);
        //  this.goldSpine = <cc.Sprite>this.getComponent("goldSpine",cc.Sprite);
        //  this.goldSpine1 = <cc.Sprite>this.getComponent("goldSpine1",cc.Sprite);
        this.vipFanli = this.getComponent("vipFanli", cc.Sprite);
        this.vipFanliLabel = this.getComponent("vipFanli/label", cc.Label);
        //  this.vipSpine.node.active = false;
        //  this.vipSprite.node.active = false;
        //  this.vipFanli.active = false;
        //赠送入款专区特殊处理（原vip入款）
    };
    ToggleItem.prototype.onItemClick = function () {
        if (this.callback) {
            // console.error("点击",this.target,this.itemkey,this.callback);
            this.callback.call(this.target, this.itemkey);
        }
    };
    //赠送入款专区特殊处理（原vip入款）
    ToggleItem.prototype.setVipItemStyle = function () {
        // let check_close = <cc.Node>this.getChild("check_close");
        // let check_open = <cc.Node>this.getChild("check_open");
        // check_close.active = false;
        this.vipSprite.node.active = true;
        // this.vipSprite1.node.active = true;
        this.vipSpine.active = true;
        // this.goldSpine.node.active = true;
        // this.goldSpine1.node.active = true;
        this.isVipItem = true;
    };
    //赠送入款专区特殊处理（原vip入款）
    //赠送入款专区特殊处理（原vip入款）
    ToggleItem.prototype.setVipItemFanli = function (sale) {
        this.vipFanli.node.active = true;
        this.vipFanliLabel.string = parseFloat(sale).toString();
    };
    //赠送入款专区特殊处理（原vip入款）
    ToggleItem.prototype.setItemStyle = function (key) {
        this.itemkey = key;
        if (key == RechargeModel_1.default.PayType.Vip) {
            this.setVipItemStyle();
            return;
        }
        var bgCfg = Global.Setting.SkinConfig.rechargeIconsCfg[key];
        if (!bgCfg)
            return Logger.error("未配置key", key);
        var normal = bgCfg[0], checked = bgCfg[1];
        if (Global.Setting.SkinConfig.isPurple) {
            //紫色是图片
            var bg = this.getComponent("check_close/btnLayout/bg", cc.Sprite);
            var checkBg = this.getComponent("check_open/btnLayout/bg", cc.Sprite);
            var bg1 = this.getComponent("check_close/btnLayout/bg1", cc.Sprite);
            var checkBg1 = this.getComponent("check_open/btnLayout/bg1", cc.Sprite);
            var layout = this.getComponent("check_close/btnLayout", cc.Layout);
            var layout1 = this.getComponent("check_open/btnLayout", cc.Layout);
            var typeNode = this.getComponent("check_close/typeNode", cc.Sprite);
            var typeNode1 = this.getComponent("check_open/typeNode", cc.Sprite);
            Global.ResourceManager.loadAutoAtlas(bg, "hall/texture/hall/rechargeCash/rechargeCash", normal);
            Global.ResourceManager.loadAutoAtlas(checkBg, "hall/texture/hall/rechargeCash/rechargeCash", checked);
            if (Global.Setting.SkinConfig.rechargeIconsCfg[key][3]) {
                Global.ResourceManager.loadAutoAtlas(typeNode, "hall/texture/hall/rechargeCash/rechargeCash", Global.Setting.SkinConfig.rechargeIconsCfg[key][3]);
                typeNode.node.active = true;
                layout.node.x = 18;
                // layout1.node.x = 18;
            }
            else {
                typeNode.node.active = false;
                layout.node.x = 6;
                // layout1.node.x = 6;
            }
            if (Global.Setting.SkinConfig.rechargeIconsCfg[key][4]) {
                Global.ResourceManager.loadAutoAtlas(typeNode1, "hall/texture/hall/rechargeCash/rechargeCash", Global.Setting.SkinConfig.rechargeIconsCfg[key][4]);
                typeNode1.node.active = true;
                // layout.node.x = 18;
                layout1.node.x = 18;
            }
            else {
                typeNode1.node.active = false;
                // layout.node.x = 6;
                layout1.node.x = 6;
            }
            var _index = key.indexOf("_");
            if (_index > -1) {
                var config_index = "";
                config_index = key.substring(_index + 1);
                Global.ResourceManager.loadAutoAtlas(bg1, "hall/texture/hall/rechargeCash/rechargeCash", "img_" + config_index);
                Global.ResourceManager.loadAutoAtlas(checkBg1, "hall/texture/hall/rechargeCash/rechargeCash", "img_" + config_index);
                // if (Global.Setting.SkinConfig.rechargeIconsCfg[key][3]) {  
                //     bg1.node.x = bg.node.x + bg.node.width / 2 - 4;
                //     checkBg1.node.x = checkBg.node.x + checkBg.node.width / 2 - 4;
                // } else {
                //     bg1.node.x = 48;
                //     checkBg1.node.x = 48;
                // }
                // bg1.node.x = bg.node.x + bg.node.width / 2 - 4;
                // checkBg1.node.x = checkBg.node.x + checkBg.node.width / 2 - 4;
                bg1.node.active = true;
                checkBg1.node.active = true;
            }
            else {
                bg1.node.active = false;
                checkBg1.node.active = false;
            }
        }
        else {
            var bg = this.getComponent("check_close/bg", cc.Label);
            var checkBg = this.getComponent("check_open/bg", cc.Label);
            // let fontSize = 27
            // if(normal.length > 4){ //海外支付字体比较小
            //     bg.fontSize = 21;
            //     checkBg.fontSize = 21;
            // }else{
            //     bg.fontSize = fontSize;
            //     checkBg.fontSize = fontSize;
            // }
            bg.string = normal;
            checkBg.string = checked;
            if (Global.Setting.SkinConfig.rechargeIconsCfg[key][3]) {
                Global.ResourceManager.loadAutoAtlas(this.typeSprite, "hall/texture/hall/rechargeCash/rechargeCash", Global.Setting.SkinConfig.rechargeIconsCfg[key][3]);
                this.typeSprite.node.active = true;
                // layout1.node.x = 18;
            }
        }
    };
    ToggleItem.prototype.addFanliIcon = function (fanliNode, sale) {
        //赠送入款专区特殊处理（原vip入款）
        if (this.isVipItem) {
            this.setVipItemFanli(sale);
            return;
        }
        //赠送入款专区特殊处理（原vip入款）
        var old = cc.find("Fanli", this.node);
        if (old) {
            old.removeFromParent(false);
        }
        var obj = cc.instantiate(fanliNode);
        obj.name = "Fanli";
        var txtObj = cc.find("content", obj).getComponent(cc.Label);
        txtObj.string = sale;
        obj.setParent(this.node);
        obj.active = true;
        obj.setPosition(44, 30);
    };
    //移动返利节点
    ToggleItem.prototype.moveFanli = function (isCheck) {
        var fanliNode = cc.find("Fanli", this.node);
        if (fanliNode) {
            // isCheck ? fanliNode.setPosition(60, 30) : fanliNode.setPosition(Global.Setting.SkinConfig.rechargeFanliPos[0], Global.Setting.SkinConfig.rechargeFanliPos[1]);
            fanliNode.setPosition(44, 30);
        }
    };
    // 切换显示
    ToggleItem.prototype.toggleChecked = function (isCheck) {
        var checkClose = cc.find("check_close", this.node);
        checkClose.active = isCheck;
        var checkOpen = cc.find("check_open", this.node);
        checkOpen.active = !isCheck;
    };
    ToggleItem.prototype.setToggleChecked = function (flag) {
        if (flag)
            this.toggleComp.check();
        else
            this.toggleComp.uncheck();
    };
    return ToggleItem;
}(ViewBase_1.default));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxyZWNoYXJnZVxcUmVjaGFuZ2VWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUFpRDtBQUNqRCx5RUFBb0U7QUFDcEUscURBQWdEO0FBR2hELHNEQUFpRDtBQUVqRDtJQUEwQyxnQ0FBUTtJQUFsRDtRQUFBLHFFQTZJQztRQTFJVyxnQkFBVSxHQUFXLEVBQUUsQ0FBQztRQUt4QixnQkFBVSxHQUFHLEVBQUUsQ0FBQzs7SUFxSTVCLENBQUM7SUFsSWEsb0NBQWEsR0FBdkI7UUFDSSxJQUFHLElBQUksQ0FBQyxXQUFXLEVBQ25CO1lBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBO1FBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUNTLCtCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2xELElBQUksQ0FBQyxLQUFLLEdBQWtCLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLHVCQUFhLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGVBQWUsR0FBb0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFB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LENBQUM7UUFDM0MsSUFBRyxTQUFTLEVBQUM7WUFDVCxpS0FBaUs7WUFDakssU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7U0FDaEM7SUFDTCxDQUFDO0lBRUQsT0FBTztJQUNBLGtDQUFhLEdBQXBCLFVBQXFCLE9BQU87UUFDeEIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELFVBQVUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQzVCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxxQ0FBZ0IsR0FBdkIsVUFBd0IsSUFBYTtRQUNqQyxJQUFJLElBQUk7WUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDOztZQUV4QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTCxpQkFBQztBQUFELENBdE1BLEFBc01DLENBdE13QixrQkFBUSxHQXNNaEMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uLy4uL2NvcmUvdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IFJlY2hhcmdlTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2hhbGxjb21tb24vbW9kZWwvUmVjaGFyZ2VNb2RlbFwiO1xyXG5pbXBvcnQgUmVjaGFyZ2VQYXlWaWV3IGZyb20gXCIuL1JlY2hhcmdlUGF5Vmlld1wiO1xyXG5pbXBvcnQgQXBwSGVscGVyIGZyb20gXCIuLi8uLi8uLi9jb3JlL3Rvb2wvQXBwSGVscGVyXCI7XHJcbmltcG9ydCBSZWNoYWdyZVRpcE1vZGVsIGZyb20gXCIuLi8uLi8uLi9oYWxsY29tbW9uL21vZGVsL1JlY2hhZ3JlVGlwTW9kZWxcIjtcclxuaW1wb3J0IFdhaXRpbmdWaWV3IGZyb20gXCIuLi93YWl0aW5nL1dhaXRpbmdWaWV3XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNoYW5nZVZpZXcgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICBwcml2YXRlIHJlY2hhcmdlUGF5VmlldzogUmVjaGFyZ2VQYXlWaWV3O1xyXG5cclxuICAgIHByaXZhdGUgY3VyUGF5VHlwZTogc3RyaW5nID0gJyc7XHJcbiAgICBwcml2YXRlIG1vZGVsOiBSZWNoYXJnZU1vZGVsO1xyXG4gICAgcHJpdmF0ZSBidG5MYXlvdXQ6IGNjLkxheW91dDtcclxuICAgIHByaXZhdGUgVGlwbW9kZWw6IFJlY2hhZ3JlVGlwTW9kZWw7XHJcbiAgICBwcml2YXRlIGNvcHlUb2dnbGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIHRvZ2dsZUxpc3QgPSBbXTtcclxuICAgIHByaXZhdGUgZmFubGlJY29uTm9kZTogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgd2FpdGluZ05vZGUgOmNjLk5vZGU7XHJcbiAgICBwcm90ZWN0ZWQgb25TdWJWaWV3U2hvdygpIHtcclxuICAgICAgICBpZih0aGlzLndhaXRpbmdOb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy53YWl0aW5nTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlY2hhcmdlUGF5Vmlldy5zdWJWaWV3U3RhdGUgPSB0cnVlXHJcbiAgICAgICAgdGhpcy5tb2RlbC5yZXFHZXRQYXlDb25maWcoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpIHtcclxuICAgICAgICB0aGlzLm5vZGUud2lkdGggPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS53aWR0aDtcclxuICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSA8UmVjaGFyZ2VNb2RlbD5HbG9iYWwuTW9kZWxNYW5hZ2VyLmdldE1vZGVsKFwiUmVjaGFyZ2VNb2RlbFwiKTtcclxuICAgICAgICB0aGlzLm1vZGVsLm9uKFJlY2hhcmdlTW9kZWwuUmVhZHlGb3JDb25maWcsIHRoaXMsIHRoaXMuc2hvdyk7XHJcbiAgICAgICAgdGhpcy5yZWNoYXJnZVBheVZpZXcgPSA8UmVjaGFyZ2VQYXlWaWV3PnRoaXMuYWRkVmlldyhcIlJlY2hhcmdlUGF5Vmlld1wiLCB0aGlzLmdldENoaWxkKFwicGF5Vmlld1wiKSwgUmVjaGFyZ2VQYXlWaWV3KTtcclxuICAgICAgICB0aGlzLmNvcHlUb2dnbGUgPSB0aGlzLmdldENoaWxkKFwibGVmdEJ0bnMvdG9nZ2xlXzFcIik7XHJcbiAgICAgICAgdGhpcy5idG5MYXlvdXQgPSA8Y2MuTGF5b3V0PnRoaXMuZ2V0Q29tcG9uZW50KFwibGVmdEJ0bnMvdG9nZ2xlU3Yvdmlldy9idG5MYXlvdXRcIiwgY2MuTGF5b3V0KTtcclxuICAgICAgICB0aGlzLmNvcHlUb2dnbGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mYW5saUljb25Ob2RlID0gdGhpcy5nZXRDaGlsZChcImxlZnRCdG5zL2ZhbmxpXCIpO1xyXG4gICAgICAgIHRoaXMuZmFubGlJY29uTm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgIGlmKHRoaXMud2FpdGluZ05vZGUgPT0gbnVsbHx8IHRoaXMud2FpdGluZ05vZGUgPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgLy92aWV3IOWGheeahGxvYWRpbmdcclxuICAgICAgICAgICAgdGhpcy53YWl0aW5nTm9kZSA9IFdhaXRpbmdWaWV3LmluaXRXYWl0aW5nVmlldyh0aGlzLm5vZGUsY2MudjIoMTM4LDApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGluaXRUb2dnbGVMaXN0KCkge1xyXG4gICAgICAgIGxldCBwYXlDZmdMaXN0ID0gdGhpcy5tb2RlbC5nZXRQYXlMaXN0RGF0YSgpO1xyXG4gICAgICAgIHRoaXMucmVjeWNsZVRvZ2dsZUxpc3QoKTtcclxuICAgICAgICBsZXQgaXNGb3JjZVNlbGVjdCA9IHRydWU7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXlDZmdMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy50b2dnbGVMaXN0W2ldO1xyXG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5jb3B5VG9nZ2xlKTtcclxuICAgICAgICAgICAgICAgIG5vZGUuc2V0UGFyZW50KHRoaXMuYnRuTGF5b3V0Lm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBUb2dnbGVJdGVtKG5vZGUsIHRoaXMub25Ub2dnbGVDbGljaywgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZUxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGl0ZW0uc2V0SXRlbVN0eWxlKHBheUNmZ0xpc3RbaV0ucGF5X2tleSk7XHJcbiAgICAgICAgICAgIGlmIChwYXlDZmdMaXN0W2ldLnRpcF9zdGF0dXMgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWRkRmFubGlJY29uKHRoaXMuZmFubGlJY29uTm9kZSwgcGF5Q2ZnTGlzdFtpXS50aXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN1clBheVR5cGUgPT09IHBheUNmZ0xpc3RbaV0ucGF5X2tleSkgeyAgICAvLyDorr7nva7lvZPliY3pobXnrb5cclxuICAgICAgICAgICAgICAgIGlzRm9yY2VTZWxlY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2V0VG9nZ2xlQ2hlY2tlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ubW92ZUZhbmxpKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QocGF5Q2ZnTGlzdCkgJiYgaXNGb3JjZVNlbGVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1clBheVR5cGUgPSBwYXlDZmdMaXN0WzBdLnBheV9rZXk7XHJcbiAgICAgICAgICAgIGxldCBjdXJUb2dnbGUgPSB0aGlzLnRvZ2dsZUxpc3QuZmluZCgoaXRlbSk9PiBpdGVtLml0ZW1rZXkgPT0gdGhpcy5jdXJQYXlUeXBlKTtcclxuICAgICAgICAgICAgaWYoY3VyVG9nZ2xlKXtcclxuICAgICAgICAgICAgICAgIGN1clRvZ2dsZS5tb3ZlRmFubGkodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNob3dWaXAoKSB7XHJcbiAgICAgICAgbGV0IHZpZXdOYW1lID0gXCJ2aXBwYXlcIjtcclxuICAgICAgICBpZiAodmlld05hbWUgPT0gdGhpcy5jdXJQYXlUeXBlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJQYXlUeXBlID0gdmlld05hbWU7XHJcbiAgICAgICAgdGhpcy50b2dnbGVMaXN0LmZvckVhY2goKEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKEVsZW1lbnQuaXRlbWtleSA9PSB2aWV3TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgRWxlbWVudC5zZXRUb2dnbGVDaGVja2VkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgRWxlbWVudC5tb3ZlRmFubGkodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMucmVjaGFyZ2VQYXlWaWV3LnNob3dWaWV3KHZpZXdOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlY3ljbGVUb2dnbGVMaXN0KCkge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlTGlzdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBpZihlbGVtZW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZhbmxpTm9kZSA9IGNjLmZpbmQoXCJGYW5saVwiLGVsZW1lbnQubm9kZSlcclxuICAgICAgICAgICAgICAgIGlmKGZhbmxpTm9kZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmYW5saU5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVG9nZ2xlQ2xpY2sobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHZpZXdOYW1lID0gbmFtZTtcclxuICAgICAgICBpZiAodmlld05hbWUgPT0gdGhpcy5jdXJQYXlUeXBlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jdXJQYXlUeXBlID0gdmlld05hbWU7XHJcbiAgICAgICAgdGhpcy5yZWNoYXJnZVBheVZpZXcuc2hvd1ZpZXcodmlld05hbWUpO1xyXG4gICAgICAgIHRoaXMudG9nZ2xlTGlzdC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICBpZihlbGVtZW50Lml0ZW1rZXkgPT0gbmFtZSl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm1vdmVGYW5saSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQudG9nZ2xlQ2hlY2tlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5tb3ZlRmFubGkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC50b2dnbGVDaGVja2VkKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93KCkge1xyXG4gICAgICAgIGlmKHRoaXMud2FpdGluZ05vZGUpe1xyXG4gICAgICAgICAgICB0aGlzLndhaXRpbmdOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXRUb2dnbGVMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5UaXBtb2RlbCA9IDxSZWNoYWdyZVRpcE1vZGVsPkdsb2JhbC5Nb2RlbE1hbmFnZXIuZ2V0TW9kZWwoXCJSZWNoYWdyZVRpcE1vZGVsXCIpO1xyXG4gICAgICAgIGlmICh0aGlzLlRpcG1vZGVsLlJlY2hhZ3JlVGlwTW9kZWwgJiYgdGhpcy5UaXBtb2RlbC5TYWxlbnVtICYmIHRoaXMuVGlwbW9kZWwuU2FsZW51bSA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuVGlwbW9kZWwuZmxhZykge1xyXG4gICAgICAgICAgICAgICAgY2MuZXJyb3IodGhpcy5UaXBtb2RlbC5mbGFnKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlRpcG1vZGVsLmZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlVJLnNob3coXCJXbmRSZWNoYW5nZVRpcFwiLCB0aGlzLlRpcG1vZGVsLlNhbGVudW0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVjaGFyZ2VQYXlWaWV3LnNob3dWaWV3KHRoaXMuY3VyUGF5VHlwZSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25TdWJWaWV3SGlkZSgpIHtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkRpc3Bvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJQYXlUeXBlID0gJyc7XHJcbiAgICAgICAgdGhpcy50b2dnbGVMaXN0ID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWwpe1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLmNsZWFyUmVxVGltZW91dCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsLm9mZihSZWNoYXJnZU1vZGVsLlJlYWR5Rm9yQ29uZmlnLCB0aGlzLCB0aGlzLnNob3cpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVG9nZ2xlSXRlbSBleHRlbmRzIFZpZXdCYXNlIHtcclxuICAgIHB1YmxpYyBpdGVta2V5ID0gJyc7XHJcbiAgICBwcml2YXRlIHRvZ2dsZUNvbXA6IGNjLlRvZ2dsZTtcclxuICAgIHByaXZhdGUgdHlwZVNwcml0ZTogY2MuU3ByaXRlO1xyXG5cclxuICAgICAvL+i1oOmAgeWFpeasvuS4k+WMuueJueauiuWkhOeQhu+8iOWOn3ZpcOWFpeasvu+8iVxyXG4gICAgIHByaXZhdGUgaXNWaXBJdGVtOmJvb2xlYW4gPSBmYWxzZTsgIC8v5qCH6K+G5piv5ZCm5Li66LWg6YCB5LiT5Yy65YWl5qy+XHJcbiAgICAgcHJpdmF0ZSB2aXBTcGluZTpjYy5Ob2RlOyAgICAgICAvL+WKqOaViFxyXG4gICAgIHByaXZhdGUgdmlwU3ByaXRlOmNjLlNwcml0ZTsgICAgICAgIC8v6aG1562+5paH5a2X77yI5YiH5Zu+77yJXHJcbiAgICAvLyAgcHJpdmF0ZSB2aXBTcHJpdGUxOmNjLlNwcml0ZTsgICAgICAgIC8v6aG1562+5paH5a2X77yI5YiH5Zu+77yJXHJcbiAgICAvLyAgcHJpdmF0ZSBnb2xkU3BpbmU6Y2MuU3ByaXRlOyAgICAgICAvLyDpl6rlhYnliqjmlYhcclxuICAgIC8vICBwcml2YXRlIGdvbGRTcGluZTE6Y2MuU3ByaXRlOyAgICAgICAvLyDpl6rlhYnliqjmlYhcclxuICAgICBwcml2YXRlIHZpcEZhbmxpOmNjLlNwcml0ZTsgICAgICAgICAgIC8v6L+U5YipXHJcbiAgICAgcHJpdmF0ZSB2aXBGYW5saUxhYmVsOmNjLkxhYmVsOyAgICAgLy/ov5TliKnnmb7liIbmr5TmloflrZdcclxuICAgICAvL+i1oOmAgeWFpeasvuS4k+WMuueJueauiuWkhOeQhu+8iOWOn3ZpcOWFpeasvu+8iVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5vZGU6IGNjLk5vZGUsIHByaXZhdGUgY2FsbGJhY2s6IEZ1bmN0aW9uLCBwcml2YXRlIHRhcmdldDogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMudHlwZVNwcml0ZSA9IDxjYy5TcHJpdGU+dGhpcy5nZXRDb21wb25lbnQoXCJ0eXBlU3ByaXRlXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgdGhpcy5hZGRDb21tb25DbGljayhcIlwiLCB0aGlzLm9uSXRlbUNsaWNrLCB0aGlzKTtcclxuICAgICAgICB0aGlzLnRvZ2dsZUNvbXAgPSA8Y2MuVG9nZ2xlPnRoaXMuZ2V0Q29tcG9uZW50KFwiXCIsIGNjLlRvZ2dsZSk7XHJcbiAgICAgICAgIC8v6LWg6YCB5YWl5qy+5LiT5Yy654m55q6K5aSE55CG77yI5Y6fdmlw5YWl5qy+77yJXHJcbiAgICAgICAgIHRoaXMudmlwU3BpbmUgPSA8Y2MuTm9kZT50aGlzLmdldENoaWxkKFwidmlwU3BpbmVcIik7XHJcbiAgICAgICAgIHRoaXMudmlwU3ByaXRlID0gPGNjLlNwcml0ZT50aGlzLmdldENvbXBvbmVudChcInZpcFNwcml0ZVwiLGNjLlNwcml0ZSk7XHJcbiAgICAgICAgLy8gIHRoaXMudmlwU3ByaXRlMSA9IDxjYy5TcHJpdGU+dGhpcy5nZXRDb21wb25lbnQoXCJ2aXBTcHJpdGUxXCIsY2MuU3ByaXRlKTtcclxuICAgICAgICAvLyAgdGhpcy5nb2xkU3BpbmUgPSA8Y2MuU3ByaXRlPnRoaXMuZ2V0Q29tcG9uZW50KFwiZ29sZFNwaW5lXCIsY2MuU3ByaXRlKTtcclxuICAgICAgICAvLyAgdGhpcy5nb2xkU3BpbmUxID0gPGNjLlNwcml0ZT50aGlzLmdldENvbXBvbmVudChcImdvbGRTcGluZTFcIixjYy5TcHJpdGUpO1xyXG4gICAgICAgICB0aGlzLnZpcEZhbmxpID0gPGNjLlNwcml0ZT50aGlzLmdldENvbXBvbmVudChcInZpcEZhbmxpXCIsY2MuU3ByaXRlKTtcclxuICAgICAgICAgdGhpcy52aXBGYW5saUxhYmVsID0gPGNjLkxhYmVsPnRoaXMuZ2V0Q29tcG9uZW50KFwidmlwRmFubGkvbGFiZWxcIixjYy5MYWJlbCk7XHJcbiAgICAgICAgLy8gIHRoaXMudmlwU3BpbmUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyAgdGhpcy52aXBTcHJpdGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyAgdGhpcy52aXBGYW5saS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgLy/otaDpgIHlhaXmrL7kuJPljLrnibnmrorlpITnkIbvvIjljp92aXDlhaXmrL7vvIlcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uSXRlbUNsaWNrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCLngrnlh7tcIix0aGlzLnRhcmdldCx0aGlzLml0ZW1rZXksdGhpcy5jYWxsYmFjayk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2suY2FsbCh0aGlzLnRhcmdldCwgdGhpcy5pdGVta2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgIC8v6LWg6YCB5YWl5qy+5LiT5Yy654m55q6K5aSE55CG77yI5Y6fdmlw5YWl5qy+77yJXHJcbiAgICAgcHJpdmF0ZSBzZXRWaXBJdGVtU3R5bGUoKXtcclxuICAgICAgICAvLyBsZXQgY2hlY2tfY2xvc2UgPSA8Y2MuTm9kZT50aGlzLmdldENoaWxkKFwiY2hlY2tfY2xvc2VcIik7XHJcbiAgICAgICAgLy8gbGV0IGNoZWNrX29wZW4gPSA8Y2MuTm9kZT50aGlzLmdldENoaWxkKFwiY2hlY2tfb3BlblwiKTtcclxuICAgICAgICAvLyBjaGVja19jbG9zZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnZpcFNwcml0ZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gdGhpcy52aXBTcHJpdGUxLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnZpcFNwaW5lLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gdGhpcy5nb2xkU3BpbmUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMuZ29sZFNwaW5lMS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc1ZpcEl0ZW0gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy/otaDpgIHlhaXmrL7kuJPljLrnibnmrorlpITnkIbvvIjljp92aXDlhaXmrL7vvIlcclxuXHJcbiAgICAvL+i1oOmAgeWFpeasvuS4k+WMuueJueauiuWkhOeQhu+8iOWOn3ZpcOWFpeasvu+8iVxyXG4gICAgcHJpdmF0ZSBzZXRWaXBJdGVtRmFubGkoc2FsZSl7XHJcbiAgICAgICAgdGhpcy52aXBGYW5saS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy52aXBGYW5saUxhYmVsLnN0cmluZyA9IHBhcnNlRmxvYXQoc2FsZSkudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIC8v6LWg6YCB5YWl5qy+5LiT5Yy654m55q6K5aSE55CG77yI5Y6fdmlw5YWl5qy+77yJXHJcblxyXG4gICAgcHVibGljIHNldEl0ZW1TdHlsZShrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaXRlbWtleSA9IGtleTtcclxuICAgICAgICBpZiAoa2V5ID09IFJlY2hhcmdlTW9kZWwuUGF5VHlwZS5WaXApe1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpcEl0ZW1TdHlsZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBiZ0NmZyA9IEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcucmVjaGFyZ2VJY29uc0NmZ1trZXldO1xyXG4gICAgICAgIGlmICghYmdDZmcpIHJldHVybiBMb2dnZXIuZXJyb3IoXCLmnKrphY3nva5rZXlcIiwga2V5KTtcclxuICAgICAgICBsZXQgW25vcm1hbCwgY2hlY2tlZF0gPSBiZ0NmZztcclxuICAgICAgICBpZiAoR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5pc1B1cnBsZSkge1xyXG4gICAgICAgICAgICAvL+e0q+iJsuaYr+WbvueJh1xyXG4gICAgICAgICAgICBsZXQgYmcgPSA8Y2MuU3ByaXRlPnRoaXMuZ2V0Q29tcG9uZW50KFwiY2hlY2tfY2xvc2UvYnRuTGF5b3V0L2JnXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIGxldCBjaGVja0JnID0gPGNjLlNwcml0ZT50aGlzLmdldENvbXBvbmVudChcImNoZWNrX29wZW4vYnRuTGF5b3V0L2JnXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIGxldCBiZzEgPSA8Y2MuU3ByaXRlPnRoaXMuZ2V0Q29tcG9uZW50KFwiY2hlY2tfY2xvc2UvYnRuTGF5b3V0L2JnMVwiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBsZXQgY2hlY2tCZzEgPSA8Y2MuU3ByaXRlPnRoaXMuZ2V0Q29tcG9uZW50KFwiY2hlY2tfb3Blbi9idG5MYXlvdXQvYmcxXCIsIGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIGxldCBsYXlvdXQgPSA8Y2MuTGF5b3V0PnRoaXMuZ2V0Q29tcG9uZW50KFwiY2hlY2tfY2xvc2UvYnRuTGF5b3V0XCIsIGNjLkxheW91dCk7XHJcbiAgICAgICAgICAgIGxldCBsYXlvdXQxID0gPGNjLkxheW91dD50aGlzLmdldENvbXBvbmVudChcImNoZWNrX29wZW4vYnRuTGF5b3V0XCIsIGNjLkxheW91dCk7XHJcbiAgICAgICAgICAgIGxldCB0eXBlTm9kZSA9IDxjYy5TcHJpdGU+dGhpcy5nZXRDb21wb25lbnQoXCJjaGVja19jbG9zZS90eXBlTm9kZVwiLCBjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBsZXQgdHlwZU5vZGUxID0gPGNjLlNwcml0ZT50aGlzLmdldENvbXBvbmVudChcImNoZWNrX29wZW4vdHlwZU5vZGVcIiwgY2MuU3ByaXRlKTtcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKGJnLCBcImhhbGwvdGV4dHVyZS9oYWxsL3JlY2hhcmdlQ2FzaC9yZWNoYXJnZUNhc2hcIiwgbm9ybWFsKTtcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKGNoZWNrQmcsIFwiaGFsbC90ZXh0dXJlL2hhbGwvcmVjaGFyZ2VDYXNoL3JlY2hhcmdlQ2FzaFwiLCBjaGVja2VkKTtcclxuICAgICAgICAgICAgaWYgKEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcucmVjaGFyZ2VJY29uc0NmZ1trZXldWzNdKSB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXModHlwZU5vZGUsIFwiaGFsbC90ZXh0dXJlL2hhbGwvcmVjaGFyZ2VDYXNoL3JlY2hhcmdlQ2FzaFwiLCBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLnJlY2hhcmdlSWNvbnNDZmdba2V5XVszXSk7XHJcbiAgICAgICAgICAgICAgICB0eXBlTm9kZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsYXlvdXQubm9kZS54ID0gMTg7XHJcbiAgICAgICAgICAgICAgICAvLyBsYXlvdXQxLm5vZGUueCA9IDE4O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHlwZU5vZGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxheW91dC5ub2RlLnggPSA2O1xyXG4gICAgICAgICAgICAgICAgLy8gbGF5b3V0MS5ub2RlLnggPSA2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLnJlY2hhcmdlSWNvbnNDZmdba2V5XVs0XSkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHR5cGVOb2RlMSwgXCJoYWxsL3RleHR1cmUvaGFsbC9yZWNoYXJnZUNhc2gvcmVjaGFyZ2VDYXNoXCIsIEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcucmVjaGFyZ2VJY29uc0NmZ1trZXldWzRdKTtcclxuICAgICAgICAgICAgICAgIHR5cGVOb2RlMS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBsYXlvdXQubm9kZS54ID0gMTg7XHJcbiAgICAgICAgICAgICAgICBsYXlvdXQxLm5vZGUueCA9IDE4O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHlwZU5vZGUxLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyBsYXlvdXQubm9kZS54ID0gNjtcclxuICAgICAgICAgICAgICAgIGxheW91dDEubm9kZS54ID0gNjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgX2luZGV4ID0ga2V5LmluZGV4T2YoXCJfXCIpO1xyXG4gICAgICAgICAgICBpZiAoX2luZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBjb25maWdfaW5kZXggPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY29uZmlnX2luZGV4ID0ga2V5LnN1YnN0cmluZyhfaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyhiZzEsIFwiaGFsbC90ZXh0dXJlL2hhbGwvcmVjaGFyZ2VDYXNoL3JlY2hhcmdlQ2FzaFwiLCBcImltZ19cIiArIGNvbmZpZ19pbmRleCk7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXMoY2hlY2tCZzEsIFwiaGFsbC90ZXh0dXJlL2hhbGwvcmVjaGFyZ2VDYXNoL3JlY2hhcmdlQ2FzaFwiLCBcImltZ19cIiArIGNvbmZpZ19pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiAoR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5yZWNoYXJnZUljb25zQ2ZnW2tleV1bM10pIHsgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgIGJnMS5ub2RlLnggPSBiZy5ub2RlLnggKyBiZy5ub2RlLndpZHRoIC8gMiAtIDQ7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgY2hlY2tCZzEubm9kZS54ID0gY2hlY2tCZy5ub2RlLnggKyBjaGVja0JnLm5vZGUud2lkdGggLyAyIC0gNDtcclxuICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgYmcxLm5vZGUueCA9IDQ4O1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIGNoZWNrQmcxLm5vZGUueCA9IDQ4O1xyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgLy8gYmcxLm5vZGUueCA9IGJnLm5vZGUueCArIGJnLm5vZGUud2lkdGggLyAyIC0gNDtcclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrQmcxLm5vZGUueCA9IGNoZWNrQmcubm9kZS54ICsgY2hlY2tCZy5ub2RlLndpZHRoIC8gMiAtIDQ7XHJcbiAgICAgICAgICAgICAgICBiZzEubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY2hlY2tCZzEubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYmcxLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBjaGVja0JnMS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgYmcgPSA8Y2MuTGFiZWw+dGhpcy5nZXRDb21wb25lbnQoXCJjaGVja19jbG9zZS9iZ1wiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIGxldCBjaGVja0JnID0gPGNjLkxhYmVsPnRoaXMuZ2V0Q29tcG9uZW50KFwiY2hlY2tfb3Blbi9iZ1wiLCBjYy5MYWJlbCk7XHJcbiAgICAgICAgICAgIC8vIGxldCBmb250U2l6ZSA9IDI3XHJcbiAgICAgICAgICAgIC8vIGlmKG5vcm1hbC5sZW5ndGggPiA0KXsgLy/mtbflpJbmlK/ku5jlrZfkvZPmr5TovoPlsI9cclxuICAgICAgICAgICAgLy8gICAgIGJnLmZvbnRTaXplID0gMjE7XHJcbiAgICAgICAgICAgIC8vICAgICBjaGVja0JnLmZvbnRTaXplID0gMjE7XHJcbiAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAvLyAgICAgYmcuZm9udFNpemUgPSBmb250U2l6ZTtcclxuICAgICAgICAgICAgLy8gICAgIGNoZWNrQmcuZm9udFNpemUgPSBmb250U2l6ZTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBiZy5zdHJpbmcgPSBub3JtYWxcclxuICAgICAgICAgICAgY2hlY2tCZy5zdHJpbmcgPSBjaGVja2VkXHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLnJlY2hhcmdlSWNvbnNDZmdba2V5XVszXSkge1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMudHlwZVNwcml0ZSwgXCJoYWxsL3RleHR1cmUvaGFsbC9yZWNoYXJnZUNhc2gvcmVjaGFyZ2VDYXNoXCIsIEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcucmVjaGFyZ2VJY29uc0NmZ1trZXldWzNdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZVNwcml0ZS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAvLyBsYXlvdXQxLm5vZGUueCA9IDE4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkRmFubGlJY29uKGZhbmxpTm9kZTogY2MuTm9kZSwgc2FsZSkge1xyXG4gICAgICAgICAvL+i1oOmAgeWFpeasvuS4k+WMuueJueauiuWkhOeQhu+8iOWOn3ZpcOWFpeasvu+8iVxyXG4gICAgICAgICBpZiAodGhpcy5pc1ZpcEl0ZW0pe1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpcEl0ZW1GYW5saShzYWxlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+i1oOmAgeWFpeasvuS4k+WMuueJueauiuWkhOeQhu+8iOWOn3ZpcOWFpeasvu+8iVxyXG4gICAgICAgIGxldCBvbGQgPSBjYy5maW5kKFwiRmFubGlcIiwgdGhpcy5ub2RlKVxyXG4gICAgICAgIGlmIChvbGQpIHtcclxuICAgICAgICAgICAgb2xkLnJlbW92ZUZyb21QYXJlbnQoZmFsc2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvYmogPSBjYy5pbnN0YW50aWF0ZShmYW5saU5vZGUpXHJcbiAgICAgICAgb2JqLm5hbWUgPSBcIkZhbmxpXCJcclxuICAgICAgICBsZXQgdHh0T2JqID0gY2MuZmluZChcImNvbnRlbnRcIiwgb2JqKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdHh0T2JqLnN0cmluZyA9IHNhbGU7XHJcbiAgICAgICAgb2JqLnNldFBhcmVudCh0aGlzLm5vZGUpXHJcbiAgICAgICAgb2JqLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgb2JqLnNldFBvc2l0aW9uKDQ0LCAzMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/np7vliqjov5TliKnoioLngrlcclxuICAgIHB1YmxpYyBtb3ZlRmFubGkoaXNDaGVjayl7XHJcbiAgICAgICAgbGV0IGZhbmxpTm9kZSA9IGNjLmZpbmQoXCJGYW5saVwiLHRoaXMubm9kZSk7XHJcbiAgICAgICAgaWYoZmFubGlOb2RlKXtcclxuICAgICAgICAgICAgLy8gaXNDaGVjayA/IGZhbmxpTm9kZS5zZXRQb3NpdGlvbig2MCwgMzApIDogZmFubGlOb2RlLnNldFBvc2l0aW9uKEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcucmVjaGFyZ2VGYW5saVBvc1swXSwgR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5yZWNoYXJnZUZhbmxpUG9zWzFdKTtcclxuICAgICAgICAgICAgZmFubGlOb2RlLnNldFBvc2l0aW9uKDQ0LCAzMClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5YiH5o2i5pi+56S6XHJcbiAgICBwdWJsaWMgdG9nZ2xlQ2hlY2tlZChpc0NoZWNrKSB7XHJcbiAgICAgICAgbGV0IGNoZWNrQ2xvc2UgPSBjYy5maW5kKFwiY2hlY2tfY2xvc2VcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICBjaGVja0Nsb3NlLmFjdGl2ZSA9IGlzQ2hlY2s7XHJcbiAgICAgICAgbGV0IGNoZWNrT3BlbiA9IGNjLmZpbmQoXCJjaGVja19vcGVuXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgY2hlY2tPcGVuLmFjdGl2ZSA9ICFpc0NoZWNrO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRUb2dnbGVDaGVja2VkKGZsYWc6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoZmxhZylcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVDb21wLmNoZWNrKCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUNvbXAudW5jaGVjaygpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==