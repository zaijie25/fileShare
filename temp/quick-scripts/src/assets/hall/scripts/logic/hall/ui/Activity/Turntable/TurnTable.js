"use strict";
cc._RF.push(module, 'e55a5tKK/hF6IG63Di+00/Q', 'TurnTable');
// hall/scripts/logic/hall/ui/Activity/Turntable/TurnTable.ts

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
var ZhuanpanModel_1 = require("../../../../hallcommon/model/ZhuanpanModel");
var TurnTable = /** @class */ (function (_super) {
    __extends(TurnTable, _super);
    function TurnTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 每帧时间 (估值)
         */
        _this.frameTime = 16;
        /**
         * 活动图集
         */
        _this.atlasPath = "hall/texture/hall/activity/activity";
        /**
         * 转盘面板图集
         */
        _this.turnTablePathCrow = "hall/texture/hall/turnTableCrow/turnTableCrow";
        /**
         * 中奖区域闪光节点
         */
        _this.shineNode = null;
        /**
         * X秒内连点抽奖按钮无效
         */
        _this.clickTime = 0;
        /**
         * 最大速度
         */
        _this.speedMax = 270;
        /**
         * 最小速度
         */
        _this.speedMin = 10;
        /**
         * 加速度
         */
        _this.speedAdd = 160;
        /**
         * 减速度
         */
        _this.speedReduce = 140;
        /**
         * 当前速度
         */
        _this.currSpeed = 0;
        /**
         * 速度状态 -1：减速 0：匀速 1：加速
         */
        _this.speedState = 0;
        /**
        * 旋转根节点
        */
        _this.turnNode = null;
        /**
         * 转盘转动结果(中第几个奖品，从0开始)
         */
        _this.result = -1;
        /**
        * 转盘上的奖品图标集合
        */
        _this.awardSpriteArr = [];
        /**
         * 转盘上的奖品文本集合
         */
        _this.awardLabelArr = [];
        /**
         * 抽奖按钮特效
         */
        /**
         * 当前面板
         */
        _this.curPanel = "silver";
        /**
        * 当前页签索引
        */
        _this.curPanelIndex = 0;
        /**
         * 转盘合集
         */
        _this.panelNameArr = ["silver", "gold", "masonry"];
        /**
         * 转盘外框集合
         */
        _this.backgroundSprite = null;
        /**
         * 转盘外框图片配置 为空表示三种级别转盘公用一个外框
         */
        _this.backgroundSpriteCfg = ["img_bywh", "img_hjwh", "img_zswh"];
        /**
         * 转盘
         */
        _this.spritePanel = null;
        /**
         * 转盘面板名称配置表
         */
        _this.spritePanelCfg = ["img_byzp", "img_hjzp", "img_zszp"];
        /**
           * 开始按钮动效
           */
        _this.spineStart = null;
        /**
         * 转盘指针
         */
        _this.arrowSprite = null;
        /**
           * 指针图片配置 为空表示三种级别转盘共用一个外框
           */
        _this.arrowSpriteCfg = ["img_bycj", "img_hjcj", "img_zscj"];
        /**
         * 奖品图片配置
         */
        _this.awardSpriteCfg = ["hd_13", "heijin", "jd200", "jd1000", "jintiao", "jd5888", "xs"];
        /**
         * 金币奖品配置
         */
        _this.awardCoinCfg = ["caijin-01", "caijin-02", "caijin-03", "caijin-04", "caijin-05", "caijin-06", "caijin-07"];
        /**
       * 页签按钮集合
       */
        _this.buttonArr = [];
        /**
        * 底座
        */
        _this.img_bydzCfg = ["img_bydz", "img_hjdz", "img_zsdz"];
        _this.img_bydzSprite = null;
        /**
         * 箭头
         */
        _this.img_byzjCfg = ["img_byzj", "img_hjkzj", "img_zskzj"];
        _this.img_byzjSprite = null;
        /**
         * 黄金箭头
         */
        _this.img_zsjbNode = null;
        /**
         * 转盘上的动画合集
         */
        _this.turnTableSpinArr = [];
        /**
         * 各转盘转动一次需要多少积分节点集合
         */
        _this.turnTableLabelArr = [];
        _this.isChoujiang = false; //是否正在抽奖
        _this.num = 8; //转盘中分区数量
        _this.rotateTime = 10; //转盘动画旋转次数
        _this.time = 5; //抽奖动画持续时间
        return _this;
    }
    TurnTable.prototype.StartChoujiang = function (num, call) {
        var _this = this;
        this.isChoujiang = true;
        //随机确定奖品分区
        var index = num;
        //过场动作
        var targetAngle = this.rotateTime * 360 + (-index * (360 / this.num));
        this.turnNode.rotation %= 360;
        //过场动作+缓入缓出
        var action = cc.rotateTo(this.time, -targetAngle).easing(cc.easeCubicActionInOut());
        //添加动作结束回调，显示中奖信息
        this.turnNode.runAction(cc.sequence(action, cc.callFunc(function () {
            _this.isChoujiang = false;
            if (call) {
                call();
            }
        })));
    };
    TurnTable.prototype.initView = function () {
        this.clickTime = 0;
        this.result = -1;
        this.model = Global.ModelManager.getModel("ZhuanpanModel");
        this.model.on(ZhuanpanModel_1.default.StartDrawLucky, this, this.startDrawLucky);
        this.model.on(ZhuanpanModel_1.default.RefreshPanelUI, this, this.refreshPanel);
        this.backgroundSprite = this.getComponent("bgNode/panelBg", cc.Sprite);
        // this.backgroundSprite1 = this.getComponent("bgNode/panelBg1", cc.Sprite)
        this.spritePanel = this.getComponent("TurnNode/panelNode/spritepanel", cc.Sprite);
        // this.spritePanel1 = this.getComponent("TurnNode/panelNode/spritepanel1", cc.Sprite)
        this.arrowSprite = this.getComponent("arrowNode/drawBtn/sprite_label", cc.Sprite);
        this.turnNode = this.getChild("TurnNode");
        this.shineNode = this.getComponent("arrowNode/spine_choose", sp.Skeleton);
        this.img_bydzSprite = this.getComponent("img_bydz", cc.Sprite);
        this.img_byzjSprite = this.getComponent("bgNode/panelBg/img_byzj", cc.Sprite);
        this.img_zsjbNode = this.getChild("bgNode/panelBg/img_zsjb");
        //蓝色皮肤没有此节点动效
        this.spineStart = this.getComponent("arrowNode/spine_qianghongbaoanniu", sp.Skeleton);
        this.addCommonClick("arrowNode/drawBtn", this.onDrawBtnClicked, this);
        for (var i = 0; i < 8; i++) {
            this.awardLabelArr[i] = this.getComponent(cc.js.formatStr("TurnNode/reward/reward_%s/label", (i + 1)), cc.Label);
            this.awardSpriteArr[i] = this.getComponent(cc.js.formatStr("TurnNode/reward/reward_%s/sprite_icon", (i + 1)), cc.Sprite);
        }
        for (var i = 0; i < 3; i++) {
            this.turnTableSpinArr[i] = this.getChild("bgNode/zhuanpan_" + i);
            this.addCommonClick(cc.js.formatStr("TurnBtnGroup/%s", this.panelNameArr[i]), this.onTurnTypeBtnClick, this);
            var yeqianArr = [];
            this.buttonArr[i] = yeqianArr;
            var darkNode = this.getChild(cc.js.formatStr("TurnBtnGroup/%s/button_dark", this.panelNameArr[i]));
            yeqianArr[0] = darkNode;
            var lightNode = this.getChild(cc.js.formatStr("TurnBtnGroup/%s/button_light", this.panelNameArr[i]));
            yeqianArr[1] = lightNode;
            var laNode = this.getChild(cc.js.formatStr("TurnBtnGroup/%s/button_dark/layout/la", this.panelNameArr[i]));
            var laNode11 = this.getChild(cc.js.formatStr("TurnBtnGroup/%s/button_light/layout/la", this.panelNameArr[i]));
            this.turnTableLabelArr[i] = laNode;
            this.turnTableLabelArr[i + 3] = laNode11;
        }
        this.turnNode.rotation = 0;
        if (this.shineNode) {
            this.shineNode.node.active = false;
        }
    };
    TurnTable.prototype.onDrawBtnClicked = function () {
        if (this.result >= 0) {
            return;
        }
        if (this.clickTime > 0) {
            return;
        }
        if (this.spineStart) {
            this.spineStart.setAnimation(0, "idle2", false);
        }
        var haveJifen = 0;
        var needJifen = 1;
        var data = this.model.data;
        if (data) {
            haveJifen = data["coin"];
            var yeqianObj = data[this.curPanel];
            needJifen = yeqianObj["coin"];
        }
        if (haveJifen < needJifen) {
            Global.UI.fastTip("积分不足");
            return;
        }
        this.clickTime = 1;
        this.model.reqChoujiang(this.curPanelIndex + 1);
    };
    TurnTable.prototype.onTurnTypeBtnClick = function (target) {
        if (this.result >= 0) {
            //正在转动
            return;
        }
        if (this.shineNode) {
            this.shineNode.node.active = false;
        }
        if (this.curPanel != target.node.name) {
            this.curPanel = target.node.name;
            this.curPanelIndex = this.panelNameArr.indexOf(this.curPanel);
            this.refreshPanel();
        }
    };
    TurnTable.prototype.startDrawLucky = function (resultIndex) {
        this.turnNode.rotation = this.turnNode.rotation % 360;
        this.currSpeed = 0;
        this.speedState = 1;
        if (this.shineNode) {
            this.shineNode.node.active = false;
        }
        this.result = resultIndex;
        this.starTurn();
    };
    TurnTable.prototype.starTurn = function () {
        var _this = this;
        // let self = this
        // Global.Component.schedule(self.runTurnTable.bind(self),0)
        // this.timer = setInterval(this.runTurnTable.bind(this), this.frameTime)
        this.StartChoujiang(this.result, function () {
            _this.turnEnd();
        });
    };
    TurnTable.prototype.runTurnTable = function () {
        var dt = this.frameTime / 1000;
        if (this.clickTime > 0) {
            this.clickTime -= dt;
        }
        if (this.result >= 0) {
            var endRotation = 360 * 5 - this.result * 45;
            var speedJiasu = this.speedAdd;
            if (this.turnNode.rotation >= endRotation - 270) {
                //减速
                this.speedState = -1;
                speedJiasu = this.speedReduce;
            }
            this.currSpeed += dt * speedJiasu * this.speedState;
            if (this.speedState > 0 && this.currSpeed > this.speedMax) {
                this.currSpeed = this.speedMax;
            }
            else if (this.speedState < 0 && this.currSpeed < this.speedMin) {
                this.currSpeed = this.speedMin;
            }
            this.turnNode.rotation += this.currSpeed * dt;
            if (this.turnNode.rotation >= endRotation) {
                this.turnNode.rotation = endRotation;
                //结束
                this.turnEnd();
            }
        }
    };
    TurnTable.prototype.refreshPanel = function () {
        var data = this.model.data;
        if (!data) {
            //this.model.reqActivityCfg()
            return;
        }
        this.updateAward(data);
        this.updateAwardPanel();
        this.updateBtn();
    };
    TurnTable.prototype.updateAward = function (data) {
        if (!data) {
            return;
        }
        var coinIndex = 0;
        var yeqianObj = data[this.curPanel];
        for (var i = 0; i < this.awardLabelArr.length; i++) {
            var label = this.awardLabelArr[i];
            var sprite = this.awardSpriteArr[i];
            var awardObj = yeqianObj["award"][i];
            if (awardObj) {
                var name = awardObj.name;
                var type = awardObj.type;
                if (type > 1) {
                    label.string = "";
                    sprite.node.y = 250;
                    sprite.node.scale = 1.5;
                    Global.ResourceManager.loadAutoAtlas(sprite, this.atlasPath, this.awardSpriteCfg[type]);
                }
                else {
                    label.string = "" + name;
                    if (type == 1) {
                        sprite.node.y = 186;
                        sprite.node.scale = 2;
                        Global.ResourceManager.loadAutoAtlas(sprite, this.atlasPath, this.awardCoinCfg[coinIndex]);
                        coinIndex += 1;
                    }
                }
            }
            else {
                sprite.node.y = 186;
                sprite.node.scale = 2;
                label.string = "";
                sprite.spriteFrame = null;
            }
        }
    };
    /**
       * 更新抽奖盘子
       */
    TurnTable.prototype.updateAwardPanel = function () {
        var spriteBgName = this.backgroundSpriteCfg ? this.backgroundSpriteCfg[this.curPanelIndex] : "";
        if (spriteBgName) {
            Global.ResourceManager.loadAutoAtlas(this.backgroundSprite, this.turnTablePathCrow, spriteBgName);
            // Global.ResourceManager.loadAutoAtlas(this.backgroundSprite1,this.turnTablePath,spriteBgName) 
        }
        var panelName = this.spritePanelCfg ? this.spritePanelCfg[this.curPanelIndex] : "";
        if (panelName) {
            Global.ResourceManager.loadAutoAtlas(this.spritePanel, this.turnTablePathCrow, panelName);
            // Global.ResourceManager.loadAutoAtlas(this.spritePanel1,this.turnTablePath,panelName) 
        }
        var arrName = this.arrowSpriteCfg ? this.arrowSpriteCfg[this.curPanelIndex] : "";
        if (arrName) {
            Global.ResourceManager.loadAutoAtlas(this.arrowSprite, this.turnTablePathCrow, arrName);
        }
        var img_bydzName = this.img_bydzCfg ? this.img_bydzCfg[this.curPanelIndex] : "";
        if (img_bydzName) {
            Global.ResourceManager.loadAutoAtlas(this.img_bydzSprite, this.turnTablePathCrow, img_bydzName);
        }
        var img_byzjName = this.img_byzjCfg ? this.img_byzjCfg[this.curPanelIndex] : "";
        if (img_byzjName) {
            Global.ResourceManager.loadAutoAtlas(this.img_byzjSprite, this.turnTablePathCrow, img_byzjName);
        }
    };
    TurnTable.prototype.updateBtn = function () {
        var _this = this;
        for (var i = 0; i < this.buttonArr.length; i++) {
            var arr = this.buttonArr[i];
            if (this.curPanelIndex == i) {
                arr[0].active = false;
                arr[1].active = true;
            }
            else {
                arr[0].active = true;
                arr[1].active = false;
            }
        }
        if (this.curPanelIndex == 2) {
            this.img_zsjbNode.active = true;
        }
        else {
            this.img_zsjbNode.active = false;
        }
        this.turnTableSpinArr.forEach(function (element) {
            element.active = false;
        });
        this.turnTableSpinArr[this.curPanelIndex].active = true;
        var data = this.model.data;
        this.turnTableLabelArr.forEach(function (e, index) {
            if (index < 3) {
                e.getComponent(cc.Label).string = data[_this.panelNameArr[index]].coin;
                _this.turnTableLabelArr[index + 3].getComponent(cc.Label).string = data[_this.panelNameArr[index]].coin;
            }
        });
    };
    /**
     * 转动结束
     */
    TurnTable.prototype.turnEnd = function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.currSpeed = 0;
        // let self = this
        // Global.Component.unschedule(self.runTurnTable.bind(self)) 
        if (this.shineNode) {
            this.shineNode.node.active = true;
        }
        this.spineStart.setAnimation(0, "idle", true);
        this.result = -1;
        this.clickTime = 0;
        this.refreshPanel();
        Global.UI.show("WndRebateGet", this.model.awardResult);
    };
    TurnTable.prototype.onSubViewShow = function () {
        this.turnNode.rotation = 0;
        this.clickTime = 0;
        this.currSpeed = 0;
        this.result = -1;
        if (this.shineNode) {
            this.shineNode.node.active = false;
        }
        this.refreshPanel();
    };
    TurnTable.prototype.onSubViewHide = function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };
    TurnTable.prototype.onDispose = function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.model.off(ZhuanpanModel_1.default.StartDrawLucky, this, this.startDrawLucky);
        this.model.off(ZhuanpanModel_1.default.RefreshPanelUI, this, this.refreshPanel);
    };
    return TurnTable;
}(ViewBase_1.default));
exports.default = TurnTable;

cc._RF.pop();