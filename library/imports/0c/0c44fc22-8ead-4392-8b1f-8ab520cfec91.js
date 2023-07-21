"use strict";
cc._RF.push(module, '0c44fwijq1DkosfirUgz+yR', 'AdmissionBoxComp');
// hall/scripts/logic/core/component/AdmissionBoxComp.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PoolBase_1 = require("../tool/PoolBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AdmissionBoxComp = /** @class */ (function (_super) {
    __extends(AdmissionBoxComp, _super);
    function AdmissionBoxComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //当前是否播放入场通告
        _this.isPlaying = false;
        //轮询Timer
        _this.checkTimer = null;
        //消息缓存队列
        _this.msgDataCacheList = [];
        //消息队列缓存长度限制
        _this.listLengthLimit = 8;
        //所有优先级的总长度
        _this.totalLenghLimit = 10;
        return _this;
    }
    AdmissionBoxComp.prototype.onLoad = function () {
        this.showNode = cc.find("showNode", this.node);
        this.layout = cc.find("Layout", this.node);
        this.layout.active = false;
        this.node.opacity = 0;
        this.ItemPool = new copyPool(cc.find("pool", this.node), this.layout);
    };
    AdmissionBoxComp.prototype.updateUseInfo = function (str) {
        var lab = "</color><color=#00ff00>" + str + "</color><color=#ffffff>";
        return lab;
    };
    AdmissionBoxComp.prototype.init = function () {
        this.startTimer();
    };
    //界面销毁
    AdmissionBoxComp.prototype.onDestroy = function () {
        this.stopTimer();
    };
    AdmissionBoxComp.prototype.onEnable = function () {
        this.isPlaying = false;
        this.reset();
        this.startTimer();
    };
    AdmissionBoxComp.prototype.onDisable = function () {
        this.stopTimer();
    };
    AdmissionBoxComp.prototype.startTimer = function () {
        if (this.checkTimer == null) {
            this.checkTimer = setInterval(this.checkMsgList.bind(this), 100);
            Global.Event.on(GlobalEvent.VIPADMISSION, this, this.addMsgData);
        }
    };
    AdmissionBoxComp.prototype.stopTimer = function () {
        if (this.checkTimer) {
            Global.Event.off(GlobalEvent.VIPADMISSION, this, this.addMsgData);
            clearInterval(this.checkTimer);
            this.checkTimer = null;
        }
    };
    AdmissionBoxComp.prototype.reset = function () {
        this.node.stopAllActions();
        this.isPlaying = false;
    };
    AdmissionBoxComp.prototype.checkMsgList = function () {
        try {
            if (!this.node || !this.node.isValid)
                return;
            if (this.isPlaying)
                return;
            if (this.msgDataCacheList.length == 0) {
                this.node.opacity = 0;
                return;
            }
            var data = this.msgDataCacheList.shift();
            var msgStr = "";
            var msgVip = 0;
            if (data.nickname != null) {
                var name = data.name; //玩家名字
                var vip = data.vip; //玩家等级
                msgStr = this.updateUseInfo(name);
                msgVip = vip;
            }
            else {
                msgStr = data.name;
                msgVip = data.vip;
            }
            this.playAnim(true, msgVip, msgStr);
        }
        catch (error) {
        }
    };
    AdmissionBoxComp.prototype.playAnim = function (play, vip, name) {
        var _this = this;
        if (play) {
            var node_1 = this.getItem(vip, name);
            Global.Component.scheduleOnce(function () {
                _this.recoveryItem(node_1);
            }, 3);
            this.isPlaying = true;
            this.node.opacity = 255;
        }
    };
    /**
     * 新建一个预制体
     * @param vip
     * @param name
     */
    AdmissionBoxComp.prototype.getItem = function (vip, name) {
        var node = this.ItemPool.getItem();
        var vipSp = cc.find("vipSp", node).getComponent(cc.Sprite);
        var nameLab = cc.find("name", node).getComponent(cc.RichText);
        var vipSk1 = cc.find("vipsmall1", vipSp.node);
        var vipSk2 = cc.find("vipsmall2", vipSp.node);
        if (nameLab) {
            //设置richtext的属性
            nameLab.node.anchorX = 0;
            nameLab.node.anchorY = this.node.anchorY;
            nameLab.horizontalAlign = cc.macro.TextAlignment.LEFT;
            nameLab.fontSize = 26;
            nameLab.useSystemFont = true;
            nameLab.fontFamily = "Microsoft Yahei";
            nameLab.maxWidth = 0;
            nameLab.lineHeight = this.node.height;
            nameLab.handleTouchEvent = true;
            nameLab.string = name;
        }
        if (vipSp) {
            var atlasString = "hall/texture/admissionBox/admissionBox_Atlas";
            Global.ResourceManager.loadAutoAtlas(vipSp, atlasString, "v" + vip.toString(), null, false);
            if (vip >= 7 && vip < 10) {
                vipSk1.active = true;
            }
            else if (vip >= 10) {
                vipSk2.active = true;
            }
            else {
                vipSk1.active = false;
                vipSk2.active = false;
            }
        }
        node.y = 0;
        node.active = true;
        node.setParent(this.showNode);
        return node;
    };
    /**回收 */
    AdmissionBoxComp.prototype.recoveryItem = function (reitem) {
        reitem.active = false;
        this.isPlaying = false;
        this.ItemPool.recycleItem(reitem);
    };
    AdmissionBoxComp.prototype.addMsgData = function (msg) {
        this.addMsgItem(msg);
    };
    /**
     * 添加数据
     * @param data {
            msg,
            type,
     * }
     */
    AdmissionBoxComp.prototype.addMsgItem = function (data) {
        if (this.node == null || !this.node.isValid) {
            this.stopTimer();
            return;
        }
        //缓存数量大于10 任何消息都丢
        if (this.msgDataCacheList.length >= this.totalLenghLimit) {
            return;
        }
        //当数据大于8时，优先插入高优先级数据
        if (this.msgDataCacheList.length >= this.listLengthLimit) {
            if (data.clientPriority != null && data.clientPriority == 0 && data.nickname != null) {
                return;
            }
        }
        this.msgDataCacheList.push(data);
    };
    AdmissionBoxComp = __decorate([
        ccclass
    ], AdmissionBoxComp);
    return AdmissionBoxComp;
}(cc.Component));
exports.default = AdmissionBoxComp;
var copyPool = /** @class */ (function (_super) {
    __extends(copyPool, _super);
    function copyPool(rootNode, copyNode) {
        var _this = _super.call(this) || this;
        _this.rootNode = rootNode;
        _this.copyNode = copyNode;
        return _this;
    }
    Object.defineProperty(copyPool.prototype, "preCount", {
        get: function () {
            return 60;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(copyPool.prototype, "everyCount", {
        get: function () {
            return 30;
        },
        enumerable: false,
        configurable: true
    });
    copyPool.prototype.createItem = function () {
        var node = cc.instantiate(this.copyNode);
        node.active = true;
        return node;
    };
    copyPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    copyPool.prototype.recycleAll = function (arr) {
        _super.prototype.recycleAll.call(this, arr);
    };
    return copyPool;
}(PoolBase_1.default));

cc._RF.pop();