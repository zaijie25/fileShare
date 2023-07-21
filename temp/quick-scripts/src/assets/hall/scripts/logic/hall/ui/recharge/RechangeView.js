"use strict";
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