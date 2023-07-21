
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/Activity/Turntable/TurnTable.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxBY3Rpdml0eVxcVHVybnRhYmxlXFxUdXJuVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQW9EO0FBQ3BELDRFQUF1RTtBQUV2RTtJQUF1Qyw2QkFBUTtJQUEvQztRQUFBLHFFQTZlQztRQXhlRzs7V0FFRztRQUNLLGVBQVMsR0FBRyxFQUFFLENBQUE7UUFDdEI7O1dBRUc7UUFDSyxlQUFTLEdBQUcscUNBQXFDLENBQUE7UUFDekQ7O1dBRUc7UUFDSyx1QkFBaUIsR0FBRywrQ0FBK0MsQ0FBQTtRQUUzRTs7V0FFRztRQUNILGVBQVMsR0FBZ0IsSUFBSSxDQUFDO1FBRTlCOztXQUVHO1FBQ0gsZUFBUyxHQUFHLENBQUMsQ0FBQztRQUNkOztXQUVHO1FBQ0gsY0FBUSxHQUFHLEdBQUcsQ0FBQztRQUNmOztXQUVHO1FBQ0gsY0FBUSxHQUFHLEVBQUUsQ0FBQztRQUNkOztXQUVHO1FBQ0gsY0FBUSxHQUFHLEdBQUcsQ0FBQztRQUNmOztXQUVHO1FBQ0gsaUJBQVcsR0FBRyxHQUFHLENBQUM7UUFDbEI7O1dBRUc7UUFDSCxlQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2Q7O1dBRUc7UUFDSCxnQkFBVSxHQUFHLENBQUMsQ0FBQztRQUVmOztVQUVFO1FBQ0YsY0FBUSxHQUFZLElBQUksQ0FBQztRQUN6Qjs7V0FFRztRQUNILFlBQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNaOztVQUVFO1FBQ0Ysb0JBQWMsR0FBZ0IsRUFBRSxDQUFDO1FBQ2pDOztXQUVHO1FBQ0gsbUJBQWEsR0FBZSxFQUFFLENBQUM7UUFDL0I7O1dBRUc7UUFDSDs7V0FFRztRQUNLLGNBQVEsR0FBRyxRQUFRLENBQUE7UUFFM0I7O1VBRUU7UUFDRixtQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQjs7V0FFRztRQUNLLGtCQUFZLEdBQUcsQ0FBQyxR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LyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgWmh1YW5wYW5Nb2RlbCBmcm9tIFwiLi4vLi4vLi4vLi4vaGFsbGNvbW1vbi9tb2RlbC9aaHVhbnBhbk1vZGVsXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUdXJuVGFibGUgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG5cclxuICAgIHByaXZhdGUgdGltZXI6IE5vZGVKUy5UaW1lb3V0XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmr4/luKfml7bpl7QgKOS8sOWAvClcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBmcmFtZVRpbWUgPSAxNlxyXG4gICAgLyoqXHJcbiAgICAgKiDmtLvliqjlm77pm4ZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhdGxhc1BhdGggPSBcImhhbGwvdGV4dHVyZS9oYWxsL2FjdGl2aXR5L2FjdGl2aXR5XCJcclxuICAgIC8qKlxyXG4gICAgICog6L2s55uY6Z2i5p2/5Zu+6ZuGXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHVyblRhYmxlUGF0aENyb3cgPSBcImhhbGwvdGV4dHVyZS9oYWxsL3R1cm5UYWJsZUNyb3cvdHVyblRhYmxlQ3Jvd1wiXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuK3lpZbljLrln5/pl6rlhYnoioLngrlcclxuICAgICAqL1xyXG4gICAgc2hpbmVOb2RlOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBY56eS5YaF6L+e54K55oq95aWW5oyJ6ZKu5peg5pWIXHJcbiAgICAgKi9cclxuICAgIGNsaWNrVGltZSA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOacgOWkp+mAn+W6plxyXG4gICAgICovXHJcbiAgICBzcGVlZE1heCA9IDI3MDtcclxuICAgIC8qKlxyXG4gICAgICog5pyA5bCP6YCf5bqmXHJcbiAgICAgKi9cclxuICAgIHNwZWVkTWluID0gMTA7XHJcbiAgICAvKipcclxuICAgICAqIOWKoOmAn+W6plxyXG4gICAgICovXHJcbiAgICBzcGVlZEFkZCA9IDE2MDtcclxuICAgIC8qKlxyXG4gICAgICog5YeP6YCf5bqmXHJcbiAgICAgKi9cclxuICAgIHNwZWVkUmVkdWNlID0gMTQwO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3pgJ/luqZcclxuICAgICAqL1xyXG4gICAgY3VyclNwZWVkID0gMDtcclxuICAgIC8qKlxyXG4gICAgICog6YCf5bqm54q25oCBIC0x77ya5YeP6YCfIDDvvJrljIDpgJ8gMe+8muWKoOmAn1xyXG4gICAgICovXHJcbiAgICBzcGVlZFN0YXRlID0gMDtcclxuXHJcbiAgICAvKipcclxuICAgICog5peL6L2s5qC56IqC54K5XHJcbiAgICAqL1xyXG4gICAgdHVybk5vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgLyoqXHJcbiAgICAgKiDovaznm5jovazliqjnu5Pmnpwo5Lit56ys5Yeg5Liq5aWW5ZOB77yM5LuOMOW8gOWniylcclxuICAgICAqL1xyXG4gICAgcmVzdWx0ID0gLTE7XHJcbiAgICAvKipcclxuICAgICog6L2s55uY5LiK55qE5aWW5ZOB5Zu+5qCH6ZuG5ZCIXHJcbiAgICAqL1xyXG4gICAgYXdhcmRTcHJpdGVBcnI6IGNjLlNwcml0ZVtdID0gW107XHJcbiAgICAvKipcclxuICAgICAqIOi9rOebmOS4iueahOWlluWTgeaWh+acrOmbhuWQiFxyXG4gICAgICovXHJcbiAgICBhd2FyZExhYmVsQXJyOiBjYy5MYWJlbFtdID0gW107XHJcbiAgICAvKipcclxuICAgICAqIOaKveWlluaMiemSrueJueaViFxyXG4gICAgICovXHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjemdouadv1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGN1clBhbmVsID0gXCJzaWx2ZXJcIlxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDlvZPliY3pobXnrb7ntKLlvJVcclxuICAgICovXHJcbiAgICBjdXJQYW5lbEluZGV4ID0gMDtcclxuICAgIC8qKlxyXG4gICAgICog6L2s55uY5ZCI6ZuGXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgcGFuZWxOYW1lQXJyID0gW1wic2lsdmVyXCIsIFwiZ29sZFwiLCBcIm1hc29ucnlcIl07XHJcblxyXG4gICAgcHJpdmF0ZSBtb2RlbDogWmh1YW5wYW5Nb2RlbFxyXG4gICAgLyoqXHJcbiAgICAgKiDovaznm5jlpJbmoYbpm4blkIhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBiYWNrZ3JvdW5kU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDovaznm5jlpJbmoYblm77niYfphY3nva4g5Li656m66KGo56S65LiJ56eN57qn5Yir6L2s55uY5YWs55So5LiA5Liq5aSW5qGGXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYmFja2dyb3VuZFNwcml0ZUNmZyA9IFtcImltZ19ieXdoXCIsIFwiaW1nX2hqd2hcIiwgXCJpbWdfenN3aFwiXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2s55uYXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3ByaXRlUGFuZWw6IGNjLlNwcml0ZSA9IG51bGxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi9rOebmOmdouadv+WQjeensOmFjee9ruihqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNwcml0ZVBhbmVsQ2ZnID0gW1wiaW1nX2J5enBcIiwgXCJpbWdfaGp6cFwiLCBcImltZ196c3pwXCJdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICAqIOW8gOWni+aMiemSruWKqOaViFxyXG4gICAgICAgKi9cclxuICAgIHNwaW5lU3RhcnQ6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog6L2s55uY5oyH6ZKIXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXJyb3dTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGxcclxuXHJcbiAgICAvKipcclxuICAgICAgICog5oyH6ZKI5Zu+54mH6YWN572uIOS4uuepuuihqOekuuS4ieenjee6p+WIq+i9rOebmOWFseeUqOS4gOS4quWkluahhlxyXG4gICAgICAgKi9cclxuICAgIHByaXZhdGUgYXJyb3dTcHJpdGVDZmcgPSBbXCJpbWdfYnljalwiLCBcImltZ19oamNqXCIsIFwiaW1nX3pzY2pcIl1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWlluWTgeWbvueJh+mFjee9rlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGF3YXJkU3ByaXRlQ2ZnID0gW1wiaGRfMTNcIiwgXCJoZWlqaW5cIiwgXCJqZDIwMFwiLCBcImpkMTAwMFwiLCBcImppbnRpYW9cIiwgXCJqZDU4ODhcIiwgXCJ4c1wiXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeR5biB5aWW5ZOB6YWN572uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXdhcmRDb2luQ2ZnID0gW1wiY2FpamluLTAxXCIsIFwiY2FpamluLTAyXCIsIFwiY2FpamluLTAzXCIsIFwiY2FpamluLTA0XCIsIFwiY2FpamluLTA1XCIsIFwiY2FpamluLTA2XCIsIFwiY2FpamluLTA3XCJdXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAqIOmhteetvuaMiemSrumbhuWQiFxyXG4gICAqL1xyXG4gICAgcHJpdmF0ZSBidXR0b25BcnIgPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICog5bqV5bqnXHJcbiAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbWdfYnlkekNmZyA9IFtcImltZ19ieWR6XCIsIFwiaW1nX2hqZHpcIiwgXCJpbWdfenNkelwiXVxyXG4gICAgcHJpdmF0ZSBpbWdfYnlkelNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog566t5aS0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW1nX2J5empDZmcgPSBbXCJpbWdfYnl6alwiLCBcImltZ19oamt6alwiLCBcImltZ196c2t6alwiXVxyXG4gICAgcHJpdmF0ZSBpbWdfYnl6alNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIC8qKlxyXG4gICAgICog6buE6YeR566t5aS0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW1nX3pzamJOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi9rOebmOS4iueahOWKqOeUu+WQiOmbhlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHR1cm5UYWJsZVNwaW5BcnIgPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICog5ZCE6L2s55uY6L2s5Yqo5LiA5qyh6ZyA6KaB5aSa5bCR56ev5YiG6IqC54K56ZuG5ZCIXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdHVyblRhYmxlTGFiZWxBcnIgPSBbXVxyXG5cclxuICAgIGlzQ2hvdWppYW5nOiBib29sZWFuID0gZmFsc2U7Ly/mmK/lkKbmraPlnKjmir3lpZZcclxuXHJcbiAgICBudW06IG51bWJlciA9IDg7Ly/ovaznm5jkuK3liIbljLrmlbDph49cclxuXHJcblxyXG4gICAgcm90YXRlVGltZTogbnVtYmVyID0gMTA7Ly/ovaznm5jliqjnlLvml4vovazmrKHmlbBcclxuXHJcblxyXG4gICAgdGltZTogbnVtYmVyID0gNTsvL+aKveWlluWKqOeUu+aMgee7reaXtumXtFxyXG4gICAgcHJpdmF0ZSBTdGFydENob3VqaWFuZyhudW0sIGNhbGwpIHtcclxuICAgICAgICB0aGlzLmlzQ2hvdWppYW5nID0gdHJ1ZTtcclxuICAgICAgICAvL+maj+acuuehruWumuWlluWTgeWIhuWMulxyXG4gICAgICAgIGxldCBpbmRleCA9IG51bTtcclxuICAgICAgICAvL+i/h+WcuuWKqOS9nFxyXG4gICAgICAgIGxldCB0YXJnZXRBbmdsZSA9IHRoaXMucm90YXRlVGltZSAqIDM2MCArICgtaW5kZXggKiAoMzYwIC8gdGhpcy5udW0pKTtcclxuICAgICAgICB0aGlzLnR1cm5Ob2RlLnJvdGF0aW9uICU9IDM2MFxyXG4gICAgICAgIC8v6L+H5Zy65Yqo5L2cK+e8k+WFpee8k+WHulxyXG4gICAgICAgIGxldCBhY3Rpb24gPSBjYy5yb3RhdGVUbyh0aGlzLnRpbWUsIC10YXJnZXRBbmdsZSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbkluT3V0KCkpO1xyXG4gICAgICAgIC8v5re75Yqg5Yqo5L2c57uT5p2f5Zue6LCD77yM5pi+56S65Lit5aWW5L+h5oGvXHJcbiAgICAgICAgdGhpcy50dXJuTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYWN0aW9uLCBjYy5jYWxsRnVuYygoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNDaG91amlhbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGNhbGwpIHsgY2FsbCgpIH1cclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuY2xpY2tUaW1lID0gMDtcclxuICAgICAgICB0aGlzLnJlc3VsdCA9IC0xO1xyXG5cclxuICAgICAgICB0aGlzLm1vZGVsID0gR2xvYmFsLk1vZGVsTWFuYWdlci5nZXRNb2RlbChcIlpodWFucGFuTW9kZWxcIik7XHJcbiAgICAgICAgdGhpcy5tb2RlbC5vbihaaHVhbnBhbk1vZGVsLlN0YXJ0RHJhd0x1Y2t5LCB0aGlzLCB0aGlzLnN0YXJ0RHJhd0x1Y2t5KVxyXG4gICAgICAgIHRoaXMubW9kZWwub24oWmh1YW5wYW5Nb2RlbC5SZWZyZXNoUGFuZWxVSSwgdGhpcywgdGhpcy5yZWZyZXNoUGFuZWwpXHJcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kU3ByaXRlID0gdGhpcy5nZXRDb21wb25lbnQoXCJiZ05vZGUvcGFuZWxCZ1wiLCBjYy5TcHJpdGUpXHJcbiAgICAgICAgLy8gdGhpcy5iYWNrZ3JvdW5kU3ByaXRlMSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiYmdOb2RlL3BhbmVsQmcxXCIsIGNjLlNwcml0ZSlcclxuICAgICAgICB0aGlzLnNwcml0ZVBhbmVsID0gdGhpcy5nZXRDb21wb25lbnQoXCJUdXJuTm9kZS9wYW5lbE5vZGUvc3ByaXRlcGFuZWxcIiwgY2MuU3ByaXRlKVxyXG4gICAgICAgIC8vIHRoaXMuc3ByaXRlUGFuZWwxID0gdGhpcy5nZXRDb21wb25lbnQoXCJUdXJuTm9kZS9wYW5lbE5vZGUvc3ByaXRlcGFuZWwxXCIsIGNjLlNwcml0ZSlcclxuICAgICAgICB0aGlzLmFycm93U3ByaXRlID0gdGhpcy5nZXRDb21wb25lbnQoXCJhcnJvd05vZGUvZHJhd0J0bi9zcHJpdGVfbGFiZWxcIiwgY2MuU3ByaXRlKVxyXG4gICAgICAgIHRoaXMudHVybk5vZGUgPSB0aGlzLmdldENoaWxkKFwiVHVybk5vZGVcIilcclxuICAgICAgICB0aGlzLnNoaW5lTm9kZSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiYXJyb3dOb2RlL3NwaW5lX2Nob29zZVwiLCBzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgdGhpcy5pbWdfYnlkelNwcml0ZSA9IHRoaXMuZ2V0Q29tcG9uZW50KFwiaW1nX2J5ZHpcIiwgY2MuU3ByaXRlKVxyXG4gICAgICAgIHRoaXMuaW1nX2J5empTcHJpdGUgPSB0aGlzLmdldENvbXBvbmVudChcImJnTm9kZS9wYW5lbEJnL2ltZ19ieXpqXCIsIGNjLlNwcml0ZSlcclxuICAgICAgICB0aGlzLmltZ196c2piTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJiZ05vZGUvcGFuZWxCZy9pbWdfenNqYlwiKVxyXG4gICAgICAgIC8v6JOd6Imy55qu6IKk5rKh5pyJ5q2k6IqC54K55Yqo5pWIXHJcbiAgICAgICAgdGhpcy5zcGluZVN0YXJ0ID0gdGhpcy5nZXRDb21wb25lbnQoXCJhcnJvd05vZGUvc3BpbmVfcWlhbmdob25nYmFvYW5uaXVcIiwgc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIHRoaXMuYWRkQ29tbW9uQ2xpY2soXCJhcnJvd05vZGUvZHJhd0J0blwiLCB0aGlzLm9uRHJhd0J0bkNsaWNrZWQsIHRoaXMpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hd2FyZExhYmVsQXJyW2ldID0gdGhpcy5nZXRDb21wb25lbnQoY2MuanMuZm9ybWF0U3RyKFwiVHVybk5vZGUvcmV3YXJkL3Jld2FyZF8lcy9sYWJlbFwiLCAoaSArIDEpKSwgY2MuTGFiZWwpXHJcbiAgICAgICAgICAgIHRoaXMuYXdhcmRTcHJpdGVBcnJbaV0gPSB0aGlzLmdldENvbXBvbmVudChjYy5qcy5mb3JtYXRTdHIoXCJUdXJuTm9kZS9yZXdhcmQvcmV3YXJkXyVzL3Nwcml0ZV9pY29uXCIsIChpICsgMSkpLCBjYy5TcHJpdGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnR1cm5UYWJsZVNwaW5BcnJbaV0gPSB0aGlzLmdldENoaWxkKFwiYmdOb2RlL3podWFucGFuX1wiICsgaSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZENvbW1vbkNsaWNrKGNjLmpzLmZvcm1hdFN0cihcIlR1cm5CdG5Hcm91cC8lc1wiLCB0aGlzLnBhbmVsTmFtZUFycltpXSksIHRoaXMub25UdXJuVHlwZUJ0bkNsaWNrLCB0aGlzKVxyXG4gICAgICAgICAgICB2YXIgeWVxaWFuQXJyID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uQXJyW2ldID0geWVxaWFuQXJyO1xyXG4gICAgICAgICAgICB2YXIgZGFya05vZGU6IGNjLk5vZGUgPSB0aGlzLmdldENoaWxkKGNjLmpzLmZvcm1hdFN0cihcIlR1cm5CdG5Hcm91cC8lcy9idXR0b25fZGFya1wiLCB0aGlzLnBhbmVsTmFtZUFycltpXSkpXHJcbiAgICAgICAgICAgIHllcWlhbkFyclswXSA9IGRhcmtOb2RlO1xyXG4gICAgICAgICAgICB2YXIgbGlnaHROb2RlOiBjYy5Ob2RlID0gdGhpcy5nZXRDaGlsZChjYy5qcy5mb3JtYXRTdHIoXCJUdXJuQnRuR3JvdXAvJXMvYnV0dG9uX2xpZ2h0XCIsIHRoaXMucGFuZWxOYW1lQXJyW2ldKSlcclxuICAgICAgICAgICAgeWVxaWFuQXJyWzFdID0gbGlnaHROb2RlO1xyXG5cclxuICAgICAgICAgICAgbGV0IGxhTm9kZSA9IHRoaXMuZ2V0Q2hpbGQoY2MuanMuZm9ybWF0U3RyKFwiVHVybkJ0bkdyb3VwLyVzL2J1dHRvbl9kYXJrL2xheW91dC9sYVwiLCB0aGlzLnBhbmVsTmFtZUFycltpXSkpXHJcbiAgICAgICAgICAgIGxldCBsYU5vZGUxMSA9IHRoaXMuZ2V0Q2hpbGQoY2MuanMuZm9ybWF0U3RyKFwiVHVybkJ0bkdyb3VwLyVzL2J1dHRvbl9saWdodC9sYXlvdXQvbGFcIiwgdGhpcy5wYW5lbE5hbWVBcnJbaV0pKVxyXG5cclxuICAgICAgICAgICAgdGhpcy50dXJuVGFibGVMYWJlbEFycltpXSA9IGxhTm9kZTtcclxuICAgICAgICAgICAgdGhpcy50dXJuVGFibGVMYWJlbEFycltpICsgM10gPSBsYU5vZGUxMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudHVybk5vZGUucm90YXRpb24gPSAwO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5zaGluZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGluZU5vZGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuICAgIG9uRHJhd0J0bkNsaWNrZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0ID49IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jbGlja1RpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3BpbmVTdGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLnNwaW5lU3RhcnQuc2V0QW5pbWF0aW9uKDAsIFwiaWRsZTJcIiwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaGF2ZUppZmVuID0gMDtcclxuICAgICAgICB2YXIgbmVlZEppZmVuID0gMTtcclxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMubW9kZWwuZGF0YTtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBoYXZlSmlmZW4gPSBkYXRhW1wiY29pblwiXTtcclxuXHJcbiAgICAgICAgICAgIHZhciB5ZXFpYW5PYmogPSBkYXRhW3RoaXMuY3VyUGFuZWxdO1xyXG4gICAgICAgICAgICBuZWVkSmlmZW4gPSB5ZXFpYW5PYmpbXCJjb2luXCJdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaGF2ZUppZmVuIDwgbmVlZEppZmVuKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5VSS5mYXN0VGlwKFwi56ev5YiG5LiN6LazXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xpY2tUaW1lID0gMTtcclxuICAgICAgICB0aGlzLm1vZGVsLnJlcUNob3VqaWFuZyh0aGlzLmN1clBhbmVsSW5kZXggKyAxKVxyXG4gICAgfVxyXG5cclxuICAgIG9uVHVyblR5cGVCdG5DbGljayh0YXJnZXQpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0ID49IDApIHtcclxuICAgICAgICAgICAgLy/mraPlnKjovazliqhcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zaGluZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGluZU5vZGUubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY3VyUGFuZWwgIT0gdGFyZ2V0Lm5vZGUubmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1clBhbmVsID0gdGFyZ2V0Lm5vZGUubmFtZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJQYW5lbEluZGV4ID0gdGhpcy5wYW5lbE5hbWVBcnIuaW5kZXhPZih0aGlzLmN1clBhbmVsKTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoUGFuZWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGFydERyYXdMdWNreShyZXN1bHRJbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy50dXJuTm9kZS5yb3RhdGlvbiA9IHRoaXMudHVybk5vZGUucm90YXRpb24gJSAzNjA7XHJcbiAgICAgICAgdGhpcy5jdXJyU3BlZWQgPSAwO1xyXG4gICAgICAgIHRoaXMuc3BlZWRTdGF0ZSA9IDE7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hpbmVOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hpbmVOb2RlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVzdWx0ID0gcmVzdWx0SW5kZXg7XHJcbiAgICAgICAgdGhpcy5zdGFyVHVybigpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhclR1cm4oKSB7XHJcbiAgICAgICAgLy8gbGV0IHNlbGYgPSB0aGlzXHJcbiAgICAgICAgLy8gR2xvYmFsLkNvbXBvbmVudC5zY2hlZHVsZShzZWxmLnJ1blR1cm5UYWJsZS5iaW5kKHNlbGYpLDApXHJcbiAgICAgICAgLy8gdGhpcy50aW1lciA9IHNldEludGVydmFsKHRoaXMucnVuVHVyblRhYmxlLmJpbmQodGhpcyksIHRoaXMuZnJhbWVUaW1lKVxyXG4gICAgICAgIHRoaXMuU3RhcnRDaG91amlhbmcodGhpcy5yZXN1bHQsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50dXJuRW5kKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgcnVuVHVyblRhYmxlKCkge1xyXG4gICAgICAgIGxldCBkdCA9IHRoaXMuZnJhbWVUaW1lIC8gMTAwMFxyXG4gICAgICAgIGlmICh0aGlzLmNsaWNrVGltZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jbGlja1RpbWUgLT0gZHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnJlc3VsdCA+PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBlbmRSb3RhdGlvbiA9IDM2MCAqIDUgLSB0aGlzLnJlc3VsdCAqIDQ1O1xyXG4gICAgICAgICAgICB2YXIgc3BlZWRKaWFzdSA9IHRoaXMuc3BlZWRBZGQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR1cm5Ob2RlLnJvdGF0aW9uID49IGVuZFJvdGF0aW9uIC0gMjcwKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WHj+mAn1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZFN0YXRlID0gLTE7XHJcbiAgICAgICAgICAgICAgICBzcGVlZEppYXN1ID0gdGhpcy5zcGVlZFJlZHVjZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJTcGVlZCArPSBkdCAqIHNwZWVkSmlhc3UgKiB0aGlzLnNwZWVkU3RhdGU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNwZWVkU3RhdGUgPiAwICYmIHRoaXMuY3VyclNwZWVkID4gdGhpcy5zcGVlZE1heCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyU3BlZWQgPSB0aGlzLnNwZWVkTWF4O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3BlZWRTdGF0ZSA8IDAgJiYgdGhpcy5jdXJyU3BlZWQgPCB0aGlzLnNwZWVkTWluKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJTcGVlZCA9IHRoaXMuc3BlZWRNaW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50dXJuTm9kZS5yb3RhdGlvbiArPSB0aGlzLmN1cnJTcGVlZCAqIGR0O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudHVybk5vZGUucm90YXRpb24gPj0gZW5kUm90YXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHVybk5vZGUucm90YXRpb24gPSBlbmRSb3RhdGlvbjtcclxuICAgICAgICAgICAgICAgIC8v57uT5p2fXHJcbiAgICAgICAgICAgICAgICB0aGlzLnR1cm5FbmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZnJlc2hQYW5lbCgpIHtcclxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMubW9kZWwuZGF0YVxyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICAvL3RoaXMubW9kZWwucmVxQWN0aXZpdHlDZmcoKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVBd2FyZChkYXRhKVxyXG4gICAgICAgIHRoaXMudXBkYXRlQXdhcmRQYW5lbCgpXHJcbiAgICAgICAgdGhpcy51cGRhdGVCdG4oKVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUF3YXJkKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmICghZGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb2luSW5kZXggPSAwXHJcbiAgICAgICAgdmFyIHllcWlhbk9iaiA9IGRhdGFbdGhpcy5jdXJQYW5lbF07XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmF3YXJkTGFiZWxBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGxhYmVsOiBjYy5MYWJlbCA9IHRoaXMuYXdhcmRMYWJlbEFycltpXTtcclxuICAgICAgICAgICAgdmFyIHNwcml0ZTogY2MuU3ByaXRlID0gdGhpcy5hd2FyZFNwcml0ZUFycltpXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhd2FyZE9iaiA9IHllcWlhbk9ialtcImF3YXJkXCJdW2ldO1xyXG4gICAgICAgICAgICBpZiAoYXdhcmRPYmopIHtcclxuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gYXdhcmRPYmoubmFtZTtcclxuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gYXdhcmRPYmoudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlLm5vZGUueSA9IDI1MDtcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGUubm9kZS5zY2FsZSA9IDEuNVxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyhzcHJpdGUsIHRoaXMuYXRsYXNQYXRoLCB0aGlzLmF3YXJkU3ByaXRlQ2ZnW3R5cGVdKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwuc3RyaW5nID0gXCJcIiArIG5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGUubm9kZS55ID0gMTg2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGUubm9kZS5zY2FsZSA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyhzcHJpdGUsIHRoaXMuYXRsYXNQYXRoLCB0aGlzLmF3YXJkQ29pbkNmZ1tjb2luSW5kZXhdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2luSW5kZXggKz0gMVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNwcml0ZS5ub2RlLnkgPSAxODY7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGUubm9kZS5zY2FsZSA9IDI7XHJcbiAgICAgICAgICAgICAgICBsYWJlbC5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICAgKiDmm7TmlrDmir3lpZbnm5jlrZBcclxuICAgICAgICovXHJcbiAgICB1cGRhdGVBd2FyZFBhbmVsKCkge1xyXG4gICAgICAgIGxldCBzcHJpdGVCZ05hbWUgPSB0aGlzLmJhY2tncm91bmRTcHJpdGVDZmcgPyB0aGlzLmJhY2tncm91bmRTcHJpdGVDZmdbdGhpcy5jdXJQYW5lbEluZGV4XSA6IFwiXCJcclxuICAgICAgICBpZiAoc3ByaXRlQmdOYW1lKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLmJhY2tncm91bmRTcHJpdGUsIHRoaXMudHVyblRhYmxlUGF0aENyb3csIHNwcml0ZUJnTmFtZSlcclxuXHJcbiAgICAgICAgICAgIC8vIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLmJhY2tncm91bmRTcHJpdGUxLHRoaXMudHVyblRhYmxlUGF0aCxzcHJpdGVCZ05hbWUpIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhbmVsTmFtZSA9IHRoaXMuc3ByaXRlUGFuZWxDZmcgPyB0aGlzLnNwcml0ZVBhbmVsQ2ZnW3RoaXMuY3VyUGFuZWxJbmRleF0gOiBcIlwiXHJcblxyXG4gICAgICAgIGlmIChwYW5lbE5hbWUpIHtcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMuc3ByaXRlUGFuZWwsIHRoaXMudHVyblRhYmxlUGF0aENyb3csIHBhbmVsTmFtZSlcclxuXHJcbiAgICAgICAgICAgIC8vIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLnNwcml0ZVBhbmVsMSx0aGlzLnR1cm5UYWJsZVBhdGgscGFuZWxOYW1lKSBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhcnJOYW1lID0gdGhpcy5hcnJvd1Nwcml0ZUNmZyA/IHRoaXMuYXJyb3dTcHJpdGVDZmdbdGhpcy5jdXJQYW5lbEluZGV4XSA6IFwiXCJcclxuXHJcbiAgICAgICAgaWYgKGFyck5hbWUpIHtcclxuICAgICAgICAgICAgR2xvYmFsLlJlc291cmNlTWFuYWdlci5sb2FkQXV0b0F0bGFzKHRoaXMuYXJyb3dTcHJpdGUsIHRoaXMudHVyblRhYmxlUGF0aENyb3csIGFyck5hbWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbWdfYnlkek5hbWUgPSB0aGlzLmltZ19ieWR6Q2ZnID8gdGhpcy5pbWdfYnlkekNmZ1t0aGlzLmN1clBhbmVsSW5kZXhdIDogXCJcIlxyXG5cclxuICAgICAgICBpZiAoaW1nX2J5ZHpOYW1lKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLmltZ19ieWR6U3ByaXRlLCB0aGlzLnR1cm5UYWJsZVBhdGhDcm93LCBpbWdfYnlkek5hbWUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbWdfYnl6ak5hbWUgPSB0aGlzLmltZ19ieXpqQ2ZnID8gdGhpcy5pbWdfYnl6akNmZ1t0aGlzLmN1clBhbmVsSW5kZXhdIDogXCJcIlxyXG5cclxuICAgICAgICBpZiAoaW1nX2J5empOYW1lKSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEF1dG9BdGxhcyh0aGlzLmltZ19ieXpqU3ByaXRlLCB0aGlzLnR1cm5UYWJsZVBhdGhDcm93LCBpbWdfYnl6ak5hbWUpXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHVwZGF0ZUJ0bigpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYnV0dG9uQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSB0aGlzLmJ1dHRvbkFycltpXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyUGFuZWxJbmRleCA9PSBpKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBhcnJbMV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFyclswXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYXJyWzFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmN1clBhbmVsSW5kZXggPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmltZ196c2piTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW1nX3pzamJOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnR1cm5UYWJsZVNwaW5BcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgZWxlbWVudC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnR1cm5UYWJsZVNwaW5BcnJbdGhpcy5jdXJQYW5lbEluZGV4XS5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLm1vZGVsLmRhdGE7XHJcbiAgICAgICAgdGhpcy50dXJuVGFibGVMYWJlbEFyci5mb3JFYWNoKChlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCAzKSB7XHJcbiAgICAgICAgICAgICAgICBlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gZGF0YVt0aGlzLnBhbmVsTmFtZUFycltpbmRleF1dLmNvaW5cclxuICAgICAgICAgICAgICAgIHRoaXMudHVyblRhYmxlTGFiZWxBcnJbaW5kZXggKyAzXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGRhdGFbdGhpcy5wYW5lbE5hbWVBcnJbaW5kZXhdXS5jb2luXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2s5Yqo57uT5p2fXHJcbiAgICAgKi9cclxuICAgIHR1cm5FbmQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGltZXIpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3VyclNwZWVkID0gMFxyXG4gICAgICAgIC8vIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICAgIC8vIEdsb2JhbC5Db21wb25lbnQudW5zY2hlZHVsZShzZWxmLnJ1blR1cm5UYWJsZS5iaW5kKHNlbGYpKSBcclxuICAgICAgICBpZiAodGhpcy5zaGluZU5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zaGluZU5vZGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNwaW5lU3RhcnQuc2V0QW5pbWF0aW9uKDAsIFwiaWRsZVwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLnJlc3VsdCA9IC0xO1xyXG4gICAgICAgIHRoaXMuY2xpY2tUaW1lID0gMDtcclxuICAgICAgICB0aGlzLnJlZnJlc2hQYW5lbCgpO1xyXG4gICAgICAgIEdsb2JhbC5VSS5zaG93KFwiV25kUmViYXRlR2V0XCIsIHRoaXMubW9kZWwuYXdhcmRSZXN1bHQpXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld1Nob3coKSB7XHJcbiAgICAgICAgdGhpcy50dXJuTm9kZS5yb3RhdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy5jbGlja1RpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuY3VyclNwZWVkID0gMDtcclxuICAgICAgICB0aGlzLnJlc3VsdCA9IC0xO1xyXG4gICAgICAgIGlmICh0aGlzLnNoaW5lTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNoaW5lTm9kZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlZnJlc2hQYW5lbCgpXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU3ViVmlld0hpZGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGltZXIpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzcG9zZSgpIHtcclxuICAgICAgICBpZiAodGhpcy50aW1lcikge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcilcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb2RlbC5vZmYoWmh1YW5wYW5Nb2RlbC5TdGFydERyYXdMdWNreSwgdGhpcywgdGhpcy5zdGFydERyYXdMdWNreSlcclxuICAgICAgICB0aGlzLm1vZGVsLm9mZihaaHVhbnBhbk1vZGVsLlJlZnJlc2hQYW5lbFVJLCB0aGlzLCB0aGlzLnJlZnJlc2hQYW5lbClcclxuXHJcbiAgICB9XHJcblxyXG59Il19