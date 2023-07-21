
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/PaoMaDengItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e91f9beUndNu5XhwpgVKILa', 'PaoMaDengItem');
// hall/scripts/logic/core/component/PaoMaDengItem.ts

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
var PaoMaDengComp_1 = require("./PaoMaDengComp");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PaoMaDengItem = /** @class */ (function (_super) {
    __extends(PaoMaDengItem, _super);
    function PaoMaDengItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //当前播放的跑马灯节点
        _this.playNode = null;
        _this.isPlaying = false;
        _this.vipStr = {
            "content1": "恭喜玩家",
            "content2": "通过公司入款充值获得",
            "content3": "",
            "content4": "元返利！",
        };
        _this.delegeteStr = {
            "content1": "恭喜玩家",
            "content2": "领取了",
            "content3": "",
            "content4": "代理佣金!",
        };
        _this.gameStr = {
            "content1": "哇!玩家",
            "content2": "太棒了,在",
            "content3": "游戏中一把赢了",
            "content4": "元!",
        };
        _this.greenNode = null;
        _this.blueNode = null;
        _this.yellowNode = null;
        _this.nameLabel = null;
        _this.nameLabel1 = null;
        _this.gameLabel = null;
        _this.pointLabel = null;
        _this.pointLabel1 = null;
        _this.content1 = null;
        _this.content2 = null;
        _this.content3 = null;
        _this.content4 = null;
        _this.content5 = null;
        _this.content6 = null;
        _this.content7 = null;
        _this.content8 = null;
        _this.runType = -1;
        //跑马灯遮罩宽度
        _this.boxLength = 669;
        //跑马灯速度
        _this.baseSpeed = 120;
        //轮询Timer
        _this.checkTimer = null;
        _this.defautLabel = null;
        _this.combineNode1 = null;
        _this.combineNode2 = null;
        /**
         * 起始运动位置
         */
        _this.startPos = cc.v2(1170, 340);
        _this.bottmStartPos = cc.v2(1170, 260);
        /**
         * 中心位置
         */
        _this.centerPos = cc.v2(270, 260);
        _this.endPos = cc.v2(270, 360);
        return _this;
        // update (dt) {}
    }
    PaoMaDengItem.prototype.onLoad = function () {
        this.playNode = cc.find("MsgBox/itemLayOut", this.node);
        this.defautLabel = cc.find("defautLabel", this.playNode).getComponent(cc.Label);
        this.combineNode1 = cc.find("combineNode1", this.playNode);
        this.greenNode = cc.find("greenNode", this.playNode);
        this.blueNode = cc.find("blueNode", this.playNode);
        this.yellowNode = cc.find("yellowNode", this.playNode);
        this.content1 = cc.find("content1", this.combineNode1).getComponent(cc.Label);
        this.content2 = cc.find("content2", this.combineNode1).getComponent(cc.Label);
        this.content3 = cc.find("content3", this.combineNode1).getComponent(cc.Label);
        this.content4 = cc.find("content4", this.combineNode1).getComponent(cc.Label);
        this.gameLabel = cc.find("game", this.combineNode1).getComponent(cc.Label);
        this.nameLabel = cc.find("name", this.combineNode1).getComponent(cc.Label);
        this.pointLabel = cc.find("point", this.combineNode1).getComponent(cc.Label);
        this.combineNode2 = cc.find("combineNode2", this.playNode);
        this.content5 = cc.find("content1", this.combineNode2).getComponent(cc.Label);
        this.content6 = cc.find("content2", this.combineNode2).getComponent(cc.Label);
        this.content7 = cc.find("content3", this.combineNode2).getComponent(cc.Label);
        this.content8 = cc.find("content4", this.combineNode2).getComponent(cc.Label);
        this.nameLabel1 = cc.find("name", this.combineNode2).getComponent(cc.Label);
        this.pointLabel1 = cc.find("point", this.combineNode2).getComponent(cc.Label);
    };
    PaoMaDengItem.prototype.initComponent = function () {
        // this.playNode = cc.find("MsgBox/itemLayOut",this.node)
        // this.defautLabel = cc.find("defautLabel",this.playNode).getComponent(cc.Label)
        // this.combineNode1 = cc.find("combineNode1",this.playNode)
        // this.content1 = cc.find("content1",this.combineNode1).getComponent(cc.Label)
        // this.content2 = cc.find("content2",this.combineNode1).getComponent(cc.Label)
        // this.content3 = cc.find("content3",this.combineNode1).getComponent(cc.Label)
        // this.content4 = cc.find("content4",this.combineNode1).getComponent(cc.Label)
        // this.gameLabel = cc.find("game",this.combineNode1).getComponent(cc.Label)
        // this.nameLabel = cc.find("name",this.combineNode1).getComponent(cc.Label)
        // this.pointLabel = cc.find("point",this.combineNode1).getComponent(cc.Label)
        // this.combineNode2 = cc.find("combineNode2",this.playNode)
        // this.content5 = cc.find("content1",this.combineNode2).getComponent(cc.Label)
        // this.content6 = cc.find("content2",this.combineNode2).getComponent(cc.Label)
        // this.content7 = cc.find("content3",this.combineNode2).getComponent(cc.Label)
        // this.content8 = cc.find("content4",this.combineNode2).getComponent(cc.Label)
        // this.nameLabel1 = cc.find("name",this.combineNode2).getComponent(cc.Label)
        // this.pointLabel1 = cc.find("point",this.combineNode2).getComponent(cc.Label)
    };
    /**
     *
     * @param data 填充数据
     */
    PaoMaDengItem.prototype.init = function (data) {
        //this.reset()
        var gameInfo = Global.GameData.getGameInfo(data.game_id);
        // console.log("gameInfo.name",gameInfo.name)
        var gameName = gameInfo.name; //游戏名
        var profit = data.hitPoint; //点数
        var point = Global.Toolkit.GetMoneyFormat(profit);
        if (data.nickname != null) {
            if (data.game_id) //有game_id为大赢家消息
             {
                this.runType = 0; //默认大赢家消息
                if (!gameInfo || gameInfo.name == null) {
                    Logger.error("找不到gameid", data.game_id);
                    return;
                }
                if (gameInfo.status != 1) {
                    return;
                }
                this.defautLabel.node.active = false;
                this.combineNode1.active = true;
                this.combineNode2.active = false;
                if (cc.isValid(this.combineNode1)) {
                    var usedWide = 0;
                    if (cc.isValid(this.content1)) {
                        this.content1.string = this.gameStr["content1"];
                        this.content1._forceUpdateRenderData();
                        this.content1.node.setPosition(cc.v2(0, 0));
                        usedWide += this.content1.node.width;
                    }
                    if (cc.isValid(this.nameLabel)) {
                        this.nameLabel.string = data.nickname;
                        this.nameLabel._forceUpdateRenderData();
                        this.nameLabel.node.setPosition(cc.v2(usedWide, 0));
                        usedWide += this.nameLabel.node.width;
                    }
                    if (cc.isValid(this.content2)) {
                        this.content2.string = this.gameStr["content2"];
                        this.content2._forceUpdateRenderData();
                        this.content2.node.setPosition(cc.v2(usedWide, 0));
                        usedWide += this.content2.node.width;
                    }
                    if (cc.isValid(this.gameLabel)) {
                        this.gameLabel.string = gameName;
                        this.gameLabel._forceUpdateRenderData();
                        this.gameLabel.node.setPosition(cc.v2(usedWide, 0));
                        usedWide += this.gameLabel.node.width;
                    }
                    if (cc.isValid(this.content3)) {
                        this.content3.string = this.gameStr["content3"];
                        this.content3._forceUpdateRenderData();
                        this.content3.node.setPosition(cc.v2(usedWide, 0));
                        usedWide += this.content3.node.width;
                    }
                    if (cc.isValid(this.pointLabel)) {
                        this.pointLabel.string = point;
                        this.pointLabel._forceUpdateRenderData();
                        this.pointLabel.node.setPosition(cc.v2(usedWide, 0));
                        usedWide += this.pointLabel.node.width;
                    }
                    if (cc.isValid(this.content4)) {
                        this.content4.string = this.gameStr["content4"];
                        this.content4._forceUpdateRenderData();
                        this.content4.node.setPosition(cc.v2(usedWide, 0));
                        usedWide += this.content4.node.width;
                    }
                }
            }
            else //优先消息
             {
                this.runType = 1; //返利消息
                point = Global.Toolkit.GetMoneyFormat(data.point);
                this.defautLabel.node.active = false;
                this.combineNode1.active = false;
                this.combineNode2.active = true;
                var type = data.pay_type ? data.pay_type : data.type; //优先级消息类型
                var contentStr = this.getContentStr(type);
                if (cc.isValid(this.combineNode2)) {
                    var usedWide = 0;
                    if (cc.isValid(this.content5)) {
                        this.content5.string = contentStr["content1"];
                        this.content5._forceUpdateRenderData();
                        this.content5.node.setPosition(cc.v2(usedWide, 0));
                        usedWide += this.content5.node.width;
                    }
                    if (cc.isValid(this.nameLabel1)) {
                        this.nameLabel1.string = data.nickname;
                        this.nameLabel1._forceUpdateRenderData();
                        this.nameLabel1.node.setPosition(cc.v2(usedWide, 0));
                        usedWide += this.nameLabel1.node.width;
                    }
                    if (cc.isValid(this.content6)) {
                        this.content6.string = contentStr["content2"];
                        this.content6._forceUpdateRenderData();
                        this.content6.node.setPosition(cc.v2(usedWide, 0));
                        usedWide += this.content6.node.width;
                    }
                    if (cc.isValid(this.content7)) {
                        this.content7.string = contentStr["content3"];
                        this.content7._forceUpdateRenderData();
                        this.content7.node.setPosition(cc.v2(usedWide, 0));
                        usedWide += this.content7.node.width;
                    }
                    if (cc.isValid(this.pointLabel1)) {
                        this.pointLabel1.string = point;
                        this.pointLabel1._forceUpdateRenderData();
                        this.pointLabel1.node.setPosition(cc.v2(usedWide, 0));
                        usedWide += this.pointLabel1.node.width;
                    }
                    if (cc.isValid(this.content8)) {
                        this.content8.string = contentStr["content4"];
                        this.content8._forceUpdateRenderData();
                        this.content8.node.setPosition(cc.v2(usedWide, 0));
                        usedWide += this.content8.node.width;
                    }
                }
            }
        }
        else {
            this.runType = 2; //默认消息
            this.defautLabel.node.active = true;
            this.combineNode1.active = false;
            this.combineNode2.active = false;
            this.defautLabel.string = data.msg;
        }
    };
    PaoMaDengItem.prototype.getContentStr = function (type) {
        var msgStr = this.vipStr;
        switch (type) {
            case PaoMaDengComp_1.CommiType.Group:
                msgStr = this.delegeteStr;
                break;
            case PaoMaDengComp_1.CommiType.SelfCommi:
                msgStr = this.delegeteStr;
                break;
            case PaoMaDengComp_1.CommiType.Unlimited:
                msgStr = this.delegeteStr;
                break;
            case PaoMaDengComp_1.PayType.SysPayTypeVip:
                msgStr = this.vipStr;
                break;
            case PaoMaDengComp_1.PayType.SysPayTypeUnion:
                msgStr = this.vipStr;
                break;
            default:
                break;
        }
        return msgStr;
    };
    PaoMaDengItem.prototype.run = function (msg, currentRunningCount, maxCount) {
        var _this = this;
        if (maxCount === void 0) { maxCount = 2; }
        if (cc.isValid(this.playNode)) {
            this.refreshContent(msg);
        }
        if (currentRunningCount > maxCount - 1) {
            currentRunningCount = maxCount - 1;
        }
        var startPos = cc.v2(this.startPos.x, this.startPos.y - (currentRunningCount * 40));
        this.node.setPosition(startPos);
        this.node.active = true;
        var moveTime = 0.5;
        var centerPos = cc.v2(this.centerPos.x, startPos.y);
        // console.log("播放:移动距离",moveds,"移动时间",moveTime,"初始距离",item.node.x)
        var mv = cc.moveTo(moveTime, centerPos);
        mv.easing(cc.easeIn(moveTime));
        this.playNode.setPosition(cc.v2(-600, 0));
        this.moveText();
        var end = cc.callFunc(function () {
            _this.playAnim(_this.playNode);
        });
        this.isPlaying = true;
        this.node.runAction((cc.sequence(mv, end)));
    };
    /**
     * 移动不同颜色的label
     */
    PaoMaDengItem.prototype.moveText = function () {
        var parentNode = this.getParentNode();
        if (cc.isValid(parentNode)) {
            var nameLabel = parentNode == this.combineNode1 ? this.nameLabel : this.nameLabel1;
            var gameLabel = parentNode == this.combineNode1 ? this.gameLabel : null;
            var pointLabel = parentNode == this.combineNode1 ? this.pointLabel : this.pointLabel1;
            if (cc.isValid(nameLabel.node)) {
                var origPos = nameLabel.node.position;
                var pos = Global.UIUtil.convertSameNodePos(parentNode, this.greenNode, origPos);
                nameLabel.node.setParent(this.greenNode);
                nameLabel.node.setPosition(pos);
            }
            if (gameLabel && cc.isValid(gameLabel.node)) {
                var origPos = gameLabel.node.position;
                var pos = Global.UIUtil.convertSameNodePos(parentNode, this.blueNode, origPos);
                gameLabel.node.setParent(this.blueNode);
                gameLabel.node.setPosition(pos);
            }
            if (cc.isValid(pointLabel.node)) {
                var origPos = pointLabel.node.position;
                var pos = Global.UIUtil.convertSameNodePos(parentNode, this.yellowNode, origPos);
                pointLabel.node.setParent(this.yellowNode);
                pointLabel.node.setPosition(pos);
            }
        }
    };
    PaoMaDengItem.prototype.getParentNode = function () {
        var parentNode = null;
        switch (this.runType) {
            case 0:
                parentNode = this.combineNode1;
                break;
            case 1:
                parentNode = this.combineNode2;
            default:
                break;
        }
        return parentNode;
    };
    PaoMaDengItem.prototype.moveUp = function (callback) {
        var _this = this;
        var moveTime = 0.5;
        var end = cc.callFunc(function () {
            _this.checkPosition(callback);
        });
        var mvUp = cc.moveBy(moveTime, cc.v2(0, 40));
        mvUp.easing = (cc.easeOut(moveTime));
        this.node.runAction(cc.sequence(mvUp, end));
    };
    PaoMaDengItem.prototype.checkPosition = function (callback) {
        if (cc.isValid(this.node)) {
            if (this.node.y > this.endPos.y) {
                this.isPlaying = false;
                if (callback) {
                    callback();
                }
            }
        }
    };
    PaoMaDengItem.prototype.refreshContent = function (data) {
        this.init(data);
    };
    PaoMaDengItem.prototype.playAnim = function (item) {
        var _this = this;
        if (!cc.isValid(item)) {
            Logger.error("!item.node.isValid");
            return;
        }
        item.active = true;
        var moveTime = 12;
        var parentWide = item.parent.width;
        var defautLabel = cc.find("defautLabel", item);
        if (defautLabel.width <= parentWide || this.runType != 2) {
            return;
        }
        var distence = defautLabel.width;
        var moveTime = distence / this.baseSpeed;
        distence = item.x - distence;
        // console.log("播放:移动距离",moveds,"移动时间",moveTime,"初始距离",item.node.x)
        var endPos = cc.v2((distence), item.y);
        var mv = cc.moveTo(moveTime, endPos);
        var callBack = cc.callFunc(function () {
            item.setPosition(cc.v2(0, 0));
            item.stopAllActions();
            var moveTime = (defautLabel.width) / _this.baseSpeed;
            var endPos = cc.v2((-defautLabel.width - _this.boxLength), item.y);
            var mv = cc.moveTo(moveTime, endPos);
            item.runAction(cc.sequence(mv, callBack));
        });
        this.isPlaying = true;
        item.runAction(cc.sequence(mv, callBack));
    };
    /**回收 */
    PaoMaDengItem.prototype.recoveryItem = function (reitem) {
        this.isPlaying = false;
        this.reset();
        this.node.setPosition(this.startPos);
        if (cc.isValid(reitem)) {
            reitem.setPosition(cc.v2(0, 0));
            reitem.stopAllActions();
        }
        //reitem.active = false;
    };
    PaoMaDengItem.prototype.reset = function () {
        if (cc.isValid(this.node)) {
            if (this.content1)
                this.content1.string = "";
            if (this.content2)
                this.content2.string = "";
            if (this.content3)
                this.content3.string = "";
            if (this.content4)
                this.content4.string = "";
            if (this.content5)
                this.content5.string = "";
            if (this.content6)
                this.content6.string = "";
            if (this.content7)
                this.content7.string = "";
            if (this.content8)
                this.content8.string = "";
            if (this.nameLabel1)
                this.nameLabel1.string = "";
            if (this.nameLabel)
                this.nameLabel.string = "";
            if (this.gameLabel)
                this.gameLabel.string = "";
            if (this.pointLabel)
                this.pointLabel.string = "";
            if (this.pointLabel1)
                this.pointLabel1.string = "";
            if (this.defautLabel)
                this.defautLabel.string = "";
            if (this.nameLabel1)
                this.nameLabel1.node.setParent(this.combineNode2);
            if (this.nameLabel)
                this.nameLabel.node.setParent(this.combineNode1);
            if (this.gameLabel)
                this.gameLabel.node.setParent(this.combineNode1);
            if (this.pointLabel1)
                this.pointLabel1.node.setParent(this.combineNode2);
            if (this.pointLabel)
                this.pointLabel.node.setParent(this.combineNode1);
            this.runType = -1;
        }
    };
    PaoMaDengItem = __decorate([
        ccclass
    ], PaoMaDengItem);
    return PaoMaDengItem;
}(cc.Component));
exports.default = PaoMaDengItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcUGFvTWFEZW5nSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBcUQ7QUFFL0MsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVk7SUFBdkQ7UUFBQSxxRUE0Z0JDO1FBMWdCRyxZQUFZO1FBQ0wsY0FBUSxHQUFZLElBQUksQ0FBQztRQUV6QixlQUFTLEdBQUcsS0FBSyxDQUFBO1FBR2pCLFlBQU0sR0FBTztZQUNoQixVQUFVLEVBQUMsTUFBTTtZQUNqQixVQUFVLEVBQUMsWUFBWTtZQUN2QixVQUFVLEVBQUMsRUFBRTtZQUNiLFVBQVUsRUFBQyxNQUFNO1NBQ3BCLENBQUE7UUFFTSxpQkFBVyxHQUFPO1lBQ3JCLFVBQVUsRUFBQyxNQUFNO1lBQ2pCLFVBQVUsRUFBQyxLQUFLO1lBQ2hCLFVBQVUsRUFBQyxFQUFFO1lBQ2IsVUFBVSxFQUFDLE9BQU87U0FDckIsQ0FBQTtRQUdNLGFBQU8sR0FBTztZQUNqQixVQUFVLEVBQUMsTUFBTTtZQUNqQixVQUFVLEVBQUMsT0FBTztZQUNsQixVQUFVLEVBQUMsU0FBUztZQUNwQixVQUFVLEVBQUMsSUFBSTtTQUNsQixDQUFBO1FBR08sZUFBUyxHQUFZLElBQUksQ0FBQTtRQUV6QixjQUFRLEdBQVksSUFBSSxDQUFBO1FBRXhCLGdCQUFVLEdBQVksSUFBSSxDQUFBO1FBRTFCLGVBQVMsR0FBYyxJQUFJLENBQUE7UUFFM0IsZ0JBQVUsR0FBYyxJQUFJLENBQUE7UUFFNUIsZUFBUyxHQUFjLElBQUksQ0FBQTtRQUUzQixnQkFBVSxHQUFjLElBQUksQ0FBQTtRQUM1QixpQkFBVyxHQUFjLElBQUksQ0FBQTtRQUU3QixjQUFRLEdBQWMsSUFBSSxDQUFBO1FBQzFCLGNBQVEsR0FBYyxJQUFJLENBQUE7UUFDMUIsY0FBUSxHQUFjLElBQUksQ0FBQTtRQUMxQixjQUFRLEdBQWMsSUFBSSxDQUFBO1FBRzFCLGNBQVEsR0FBYyxJQUFJLENBQUE7UUFDMUIsY0FBUSxHQUFjLElBQUksQ0FBQTtRQUMxQixjQUFRLEdBQWMsSUFBSSxDQUFBO1FBQzFCLGNBQVEsR0FBYyxJQUFJLENBQUE7UUFHMUIsYUFBTyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBSXBCLFNBQVM7UUFDRCxlQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLE9BQU87UUFDQyxlQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLFNBQVM7UUFDRCxnQkFBVSxHQUFHLElBQUksQ0FBQztRQUVsQixpQkFBVyxHQUFhLElBQUksQ0FBQTtRQUM1QixrQkFBWSxHQUFZLElBQUksQ0FBQTtRQUM1QixrQkFBWSxHQUFZLElBQUksQ0FBQTtRQUVwQzs7V0FFRztRQUNLLGNBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxHQUFHLENBQUMsQ0FBQTtRQUUxQixtQkFBYSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFBO1FBRXZDOztXQUVHO1FBQ0ssZUFBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQzFCLFlBQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQTs7UUF1Yi9CLGlCQUFpQjtJQUNyQixDQUFDO0lBdmJHLDhCQUFNLEdBQU47UUFFSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RELElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDOUUsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDekQsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDbkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM1RSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzVFLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDNUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM1RSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3pFLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDekUsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMzRSxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN6RCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzVFLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDNUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM1RSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzVFLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFD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Z0JBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUN0RCxJQUFHLElBQUksQ0FBQyxVQUFVO2dCQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUVwQjtJQUVMLENBQUM7SUExZ0JnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBNGdCakM7SUFBRCxvQkFBQztDQTVnQkQsQUE0Z0JDLENBNWdCMEMsRUFBRSxDQUFDLFNBQVMsR0E0Z0J0RDtrQkE1Z0JvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWlUeXBlLCBQYXlUeXBlIH0gZnJvbSBcIi4vUGFvTWFEZW5nQ29tcFwiO1xyXG5cclxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYW9NYURlbmdJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvL+W9k+WJjeaSreaUvueahOi3kemprOeBr+iKgueCuVxyXG4gICAgcHVibGljIHBsYXlOb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgaXNQbGF5aW5nID0gZmFsc2VcclxuXHJcblxyXG4gICAgcHVibGljIHZpcFN0cjphbnkgPSB7XHJcbiAgICAgICAgXCJjb250ZW50MVwiOlwi5oGt5Zac546p5a62XCIsXHJcbiAgICAgICAgXCJjb250ZW50MlwiOlwi6YCa6L+H5YWs5Y+45YWl5qy+5YWF5YC86I635b6XXCIsXHJcbiAgICAgICAgXCJjb250ZW50M1wiOlwiXCIsXHJcbiAgICAgICAgXCJjb250ZW50NFwiOlwi5YWD6L+U5Yip77yBXCIsXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlbGVnZXRlU3RyOmFueSA9IHtcclxuICAgICAgICBcImNvbnRlbnQxXCI6XCLmga3llpznjqnlrrZcIixcclxuICAgICAgICBcImNvbnRlbnQyXCI6XCLpooblj5bkuoZcIixcclxuICAgICAgICBcImNvbnRlbnQzXCI6XCJcIixcclxuICAgICAgICBcImNvbnRlbnQ0XCI6XCLku6PnkIbkvaPph5EhXCIsXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnYW1lU3RyOmFueSA9IHtcclxuICAgICAgICBcImNvbnRlbnQxXCI6XCLlk4ch546p5a62XCIsXHJcbiAgICAgICAgXCJjb250ZW50MlwiOlwi5aSq5qOS5LqGLOWcqFwiLFxyXG4gICAgICAgIFwiY29udGVudDNcIjpcIua4uOaIj+S4reS4gOaKiui1ouS6hlwiLFxyXG4gICAgICAgIFwiY29udGVudDRcIjpcIuWFgyFcIixcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBncmVlbk5vZGUgOmNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSBibHVlTm9kZSA6Y2MuTm9kZSA9IG51bGxcclxuXHJcbiAgICBwcml2YXRlIHllbGxvd05vZGUgOmNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgcHJpdmF0ZSBuYW1lTGFiZWwgOiBjYy5MYWJlbCA9IG51bGxcclxuXHJcbiAgICBwcml2YXRlIG5hbWVMYWJlbDEgOiBjYy5MYWJlbCA9IG51bGxcclxuXHJcbiAgICBwcml2YXRlIGdhbWVMYWJlbCA6IGNjLkxhYmVsID0gbnVsbFxyXG5cclxuICAgIHByaXZhdGUgcG9pbnRMYWJlbCA6IGNjLkxhYmVsID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBwb2ludExhYmVsMSA6IGNjLkxhYmVsID0gbnVsbFxyXG5cclxuICAgIHByaXZhdGUgY29udGVudDEgOiBjYy5MYWJlbCA9IG51bGxcclxuICAgIHByaXZhdGUgY29udGVudDIgOiBjYy5MYWJlbCA9IG51bGxcclxuICAgIHByaXZhdGUgY29udGVudDMgOiBjYy5MYWJlbCA9IG51bGxcclxuICAgIHByaXZhdGUgY29udGVudDQgOiBjYy5MYWJlbCA9IG51bGxcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBjb250ZW50NSA6IGNjLkxhYmVsID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBjb250ZW50NiA6IGNjLkxhYmVsID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBjb250ZW50NyA6IGNjLkxhYmVsID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBjb250ZW50OCA6IGNjLkxhYmVsID0gbnVsbFxyXG5cclxuXHJcbiAgICBwcml2YXRlIHJ1blR5cGUgPSAtMVxyXG5cclxuXHJcblxyXG4gICAgLy/ot5Hpqaznga/pga7nvanlrr3luqZcclxuICAgIHByaXZhdGUgYm94TGVuZ3RoID0gNjY5O1xyXG4gICAgLy/ot5Hpqaznga/pgJ/luqZcclxuICAgIHByaXZhdGUgYmFzZVNwZWVkID0gMTIwO1xyXG4gICAgLy/ova7or6JUaW1lclxyXG4gICAgcHJpdmF0ZSBjaGVja1RpbWVyID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGRlZmF1dExhYmVsIDpjYy5MYWJlbCA9IG51bGxcclxuICAgIHByaXZhdGUgY29tYmluZU5vZGUxIDpjYy5Ob2RlID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBjb21iaW5lTm9kZTIgOmNjLk5vZGUgPSBudWxsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDotbflp4vov5DliqjkvY3nva5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzdGFydFBvcyA9IGNjLnYyKDExNzAsMzQwKVxyXG5cclxuICAgIHByaXZhdGUgYm90dG1TdGFydFBvcyA9IGNjLnYyKDExNzAsMjYwKVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Lit5b+D5L2N572uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2VudGVyUG9zID0gY2MudjIoMjcwLDI2MClcclxuICAgIHByaXZhdGUgZW5kUG9zID0gY2MudjIoMjcwLDM2MClcclxuICAgIG9uTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wbGF5Tm9kZSA9IGNjLmZpbmQoXCJNc2dCb3gvaXRlbUxheU91dFwiLHRoaXMubm9kZSlcclxuICAgICAgICB0aGlzLmRlZmF1dExhYmVsID0gY2MuZmluZChcImRlZmF1dExhYmVsXCIsdGhpcy5wbGF5Tm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuY29tYmluZU5vZGUxID0gY2MuZmluZChcImNvbWJpbmVOb2RlMVwiLHRoaXMucGxheU5vZGUpXHJcbiAgICAgICAgdGhpcy5ncmVlbk5vZGUgPSBjYy5maW5kKFwiZ3JlZW5Ob2RlXCIsdGhpcy5wbGF5Tm9kZSlcclxuICAgICAgICB0aGlzLmJsdWVOb2RlID0gY2MuZmluZChcImJsdWVOb2RlXCIsdGhpcy5wbGF5Tm9kZSlcclxuICAgICAgICB0aGlzLnllbGxvd05vZGUgPSBjYy5maW5kKFwieWVsbG93Tm9kZVwiLHRoaXMucGxheU5vZGUpXHJcbiAgICAgICAgdGhpcy5jb250ZW50MSA9IGNjLmZpbmQoXCJjb250ZW50MVwiLHRoaXMuY29tYmluZU5vZGUxKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5jb250ZW50MiA9IGNjLmZpbmQoXCJjb250ZW50MlwiLHRoaXMuY29tYmluZU5vZGUxKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5jb250ZW50MyA9IGNjLmZpbmQoXCJjb250ZW50M1wiLHRoaXMuY29tYmluZU5vZGUxKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5jb250ZW50NCA9IGNjLmZpbmQoXCJjb250ZW50NFwiLHRoaXMuY29tYmluZU5vZGUxKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5nYW1lTGFiZWwgPSBjYy5maW5kKFwiZ2FtZVwiLHRoaXMuY29tYmluZU5vZGUxKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5uYW1lTGFiZWwgPSBjYy5maW5kKFwibmFtZVwiLHRoaXMuY29tYmluZU5vZGUxKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgdGhpcy5wb2ludExhYmVsID0gY2MuZmluZChcInBvaW50XCIsdGhpcy5jb21iaW5lTm9kZTEpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICB0aGlzLmNvbWJpbmVOb2RlMiA9IGNjLmZpbmQoXCJjb21iaW5lTm9kZTJcIix0aGlzLnBsYXlOb2RlKVxyXG4gICAgICAgIHRoaXMuY29udGVudDUgPSBjYy5maW5kKFwiY29udGVudDFcIix0aGlzLmNvbWJpbmVOb2RlMikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuY29udGVudDYgPSBjYy5maW5kKFwiY29udGVudDJcIix0aGlzLmNvbWJpbmVOb2RlMikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuY29udGVudDcgPSBjYy5maW5kKFwiY29udGVudDNcIix0aGlzLmNvbWJpbmVOb2RlMikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMuY29udGVudDggPSBjYy5maW5kKFwiY29udGVudDRcIix0aGlzLmNvbWJpbmVOb2RlMikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIHRoaXMubmFtZUxhYmVsMSA9IGNjLmZpbmQoXCJuYW1lXCIsdGhpcy5jb21iaW5lTm9kZTIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICB0aGlzLnBvaW50TGFiZWwxID0gY2MuZmluZChcInBvaW50XCIsdGhpcy5jb21iaW5lTm9kZTIpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q29tcG9uZW50KClcclxuICAgIHtcclxuICAgICAgICAvLyB0aGlzLnBsYXlOb2RlID0gY2MuZmluZChcIk1zZ0JveC9pdGVtTGF5T3V0XCIsdGhpcy5ub2RlKVxyXG4gICAgICAgIC8vIHRoaXMuZGVmYXV0TGFiZWwgPSBjYy5maW5kKFwiZGVmYXV0TGFiZWxcIix0aGlzLnBsYXlOb2RlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgLy8gdGhpcy5jb21iaW5lTm9kZTEgPSBjYy5maW5kKFwiY29tYmluZU5vZGUxXCIsdGhpcy5wbGF5Tm9kZSlcclxuICAgICAgICAvLyB0aGlzLmNvbnRlbnQxID0gY2MuZmluZChcImNvbnRlbnQxXCIsdGhpcy5jb21iaW5lTm9kZTEpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICAvLyB0aGlzLmNvbnRlbnQyID0gY2MuZmluZChcImNvbnRlbnQyXCIsdGhpcy5jb21iaW5lTm9kZTEpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICAvLyB0aGlzLmNvbnRlbnQzID0gY2MuZmluZChcImNvbnRlbnQzXCIsdGhpcy5jb21iaW5lTm9kZTEpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICAvLyB0aGlzLmNvbnRlbnQ0ID0gY2MuZmluZChcImNvbnRlbnQ0XCIsdGhpcy5jb21iaW5lTm9kZTEpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICAvLyB0aGlzLmdhbWVMYWJlbCA9IGNjLmZpbmQoXCJnYW1lXCIsdGhpcy5jb21iaW5lTm9kZTEpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICAvLyB0aGlzLm5hbWVMYWJlbCA9IGNjLmZpbmQoXCJuYW1lXCIsdGhpcy5jb21iaW5lTm9kZTEpLmdldENvbXBvbmVudChjYy5MYWJlbClcclxuICAgICAgICAvLyB0aGlzLnBvaW50TGFiZWwgPSBjYy5maW5kKFwicG9pbnRcIix0aGlzLmNvbWJpbmVOb2RlMSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIC8vIHRoaXMuY29tYmluZU5vZGUyID0gY2MuZmluZChcImNvbWJpbmVOb2RlMlwiLHRoaXMucGxheU5vZGUpXHJcbiAgICAgICAgLy8gdGhpcy5jb250ZW50NSA9IGNjLmZpbmQoXCJjb250ZW50MVwiLHRoaXMuY29tYmluZU5vZGUyKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgLy8gdGhpcy5jb250ZW50NiA9IGNjLmZpbmQoXCJjb250ZW50MlwiLHRoaXMuY29tYmluZU5vZGUyKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgLy8gdGhpcy5jb250ZW50NyA9IGNjLmZpbmQoXCJjb250ZW50M1wiLHRoaXMuY29tYmluZU5vZGUyKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgLy8gdGhpcy5jb250ZW50OCA9IGNjLmZpbmQoXCJjb250ZW50NFwiLHRoaXMuY29tYmluZU5vZGUyKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpXHJcbiAgICAgICAgLy8gdGhpcy5uYW1lTGFiZWwxID0gY2MuZmluZChcIm5hbWVcIix0aGlzLmNvbWJpbmVOb2RlMikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgICAgIC8vIHRoaXMucG9pbnRMYWJlbDEgPSBjYy5maW5kKFwicG9pbnRcIix0aGlzLmNvbWJpbmVOb2RlMikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGRhdGEg5aGr5YWF5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIGluaXQoZGF0YSlcclxuICAgIHtcclxuICAgICAgICAvL3RoaXMucmVzZXQoKVxyXG4gICAgICAgIGxldCBnYW1lSW5mbyA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lSW5mbyhkYXRhLmdhbWVfaWQpO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJnYW1lSW5mby5uYW1lXCIsZ2FtZUluZm8ubmFtZSlcclxuICAgICAgICBsZXQgZ2FtZU5hbWUgPSBnYW1lSW5mby5uYW1lOy8v5ri45oiP5ZCNXHJcbiAgICAgICAgbGV0IHByb2ZpdCA9IGRhdGEuaGl0UG9pbnQ7Ly/ngrnmlbBcclxuICAgICAgICBsZXQgcG9pbnQgPSBHbG9iYWwuVG9vbGtpdC5HZXRNb25leUZvcm1hdChwcm9maXQpO1xyXG4gICAgICAgIGlmIChkYXRhLm5pY2tuYW1lICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYoZGF0YS5nYW1lX2lkKSAvL+aciWdhbWVfaWTkuLrlpKfotaLlrrbmtojmga9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydW5UeXBlID0gMCAvL+m7mOiupOWkp+i1ouWutua2iOaBr1xyXG4gICAgICAgICAgICAgICAgaWYgKCFnYW1lSW5mbyB8fCBnYW1lSW5mby5uYW1lID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLmib7kuI3liLBnYW1laWRcIiwgZGF0YS5nYW1lX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZUluZm8uc3RhdHVzICE9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXV0TGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21iaW5lTm9kZTEuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21iaW5lTm9kZTIuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgaWYoY2MuaXNWYWxpZCh0aGlzLmNvbWJpbmVOb2RlMSkpXHJcbiAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgIGxldCB1c2VkV2lkZSA9IDBcclxuICAgICAgICAgICAgICAgICAgIGlmKGNjLmlzVmFsaWQodGhpcy5jb250ZW50MSkpXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudDEuc3RyaW5nID0gdGhpcy5nYW1lU3RyW1wiY29udGVudDFcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50MS5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50MS5ub2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZWRXaWRlICs9IHRoaXMuY29udGVudDEubm9kZS53aWR0aFxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgaWYoY2MuaXNWYWxpZCh0aGlzLm5hbWVMYWJlbCkpXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmFtZUxhYmVsLnN0cmluZyA9IGRhdGEubmlja25hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uYW1lTGFiZWwuX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmFtZUxhYmVsLm5vZGUuc2V0UG9zaXRpb24oY2MudjIodXNlZFdpZGUsMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZWRXaWRlICs9IHRoaXMubmFtZUxhYmVsLm5vZGUud2lkdGhcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIGlmKGNjLmlzVmFsaWQodGhpcy5jb250ZW50MikpXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudDIuc3RyaW5nID0gdGhpcy5nYW1lU3RyW1wiY29udGVudDJcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Mi5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Mi5ub2RlLnNldFBvc2l0aW9uKGNjLnYyKHVzZWRXaWRlLDApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VkV2lkZSArPSB0aGlzLmNvbnRlbnQyLm5vZGUud2lkdGhcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIGlmKGNjLmlzVmFsaWQodGhpcy5nYW1lTGFiZWwpKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVMYWJlbC5zdHJpbmcgPSBnYW1lTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWVMYWJlbC5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lTGFiZWwubm9kZS5zZXRQb3NpdGlvbihjYy52Mih1c2VkV2lkZSwwKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlZFdpZGUgKz0gdGhpcy5nYW1lTGFiZWwubm9kZS53aWR0aFxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgaWYoY2MuaXNWYWxpZCh0aGlzLmNvbnRlbnQzKSlcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50My5zdHJpbmcgPSB0aGlzLmdhbWVTdHJbXCJjb250ZW50M1wiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQzLl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQzLm5vZGUuc2V0UG9zaXRpb24oY2MudjIodXNlZFdpZGUsMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZWRXaWRlICs9IHRoaXMuY29udGVudDMubm9kZS53aWR0aFxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgaWYoY2MuaXNWYWxpZCh0aGlzLnBvaW50TGFiZWwpKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaW50TGFiZWwuc3RyaW5nID0gcG9pbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2ludExhYmVsLl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaW50TGFiZWwubm9kZS5zZXRQb3NpdGlvbihjYy52Mih1c2VkV2lkZSwwKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlZFdpZGUgKz0gdGhpcy5wb2ludExhYmVsLm5vZGUud2lkdGhcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgIGlmKGNjLmlzVmFsaWQodGhpcy5jb250ZW50NCkpXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudDQuc3RyaW5nID0gdGhpcy5nYW1lU3RyW1wiY29udGVudDRcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50NC5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50NC5ub2RlLnNldFBvc2l0aW9uKGNjLnYyKHVzZWRXaWRlLDApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VkV2lkZSArPSB0aGlzLmNvbnRlbnQ0Lm5vZGUud2lkdGhcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgLy/kvJjlhYjmtojmga9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydW5UeXBlID0gMSAvL+i/lOWIqea2iOaBr1xyXG4gICAgICAgICAgICAgICAgcG9pbnQgPSBHbG9iYWwuVG9vbGtpdC5HZXRNb25leUZvcm1hdChkYXRhLnBvaW50KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdXRMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbWJpbmVOb2RlMS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21iaW5lTm9kZTIuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSBkYXRhLnBheV90eXBlID8gZGF0YS5wYXlfdHlwZSA6IGRhdGEudHlwZTsvL+S8mOWFiOe6p+a2iOaBr+exu+Wei1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnRTdHIgPSB0aGlzLmdldENvbnRlbnRTdHIodHlwZSlcclxuICAgICAgICAgICAgICAgaWYoY2MuaXNWYWxpZCh0aGlzLmNvbWJpbmVOb2RlMikpXHJcbiAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlZFdpZGUgPSAwXHJcbiAgICAgICAgICAgICAgICAgICBpZihjYy5pc1ZhbGlkKHRoaXMuY29udGVudDUpKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQ1LnN0cmluZyA9IGNvbnRlbnRTdHJbXCJjb250ZW50MVwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQ1Ll9mb3JjZVVwZGF0ZVJlbmRlckRhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQ1Lm5vZGUuc2V0UG9zaXRpb24oY2MudjIodXNlZFdpZGUsMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZWRXaWRlICs9IHRoaXMuY29udGVudDUubm9kZS53aWR0aFxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgaWYoY2MuaXNWYWxpZCh0aGlzLm5hbWVMYWJlbDEpKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hbWVMYWJlbDEuc3RyaW5nID0gZGF0YS5uaWNrbmFtZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hbWVMYWJlbDEuX2ZvcmNlVXBkYXRlUmVuZGVyRGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmFtZUxhYmVsMS5ub2RlLnNldFBvc2l0aW9uKGNjLnYyKHVzZWRXaWRlLDApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VkV2lkZSArPSB0aGlzLm5hbWVMYWJlbDEubm9kZS53aWR0aFxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgaWYoY2MuaXNWYWxpZCh0aGlzLmNvbnRlbnQ2KSlcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Ni5zdHJpbmcgPSBjb250ZW50U3RyW1wiY29udGVudDJcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Ni5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Ni5ub2RlLnNldFBvc2l0aW9uKGNjLnYyKHVzZWRXaWRlLDApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VkV2lkZSArPSB0aGlzLmNvbnRlbnQ2Lm5vZGUud2lkdGhcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBpZihjYy5pc1ZhbGlkKHRoaXMuY29udGVudDcpKVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQ3LnN0cmluZyA9IGNvbnRlbnRTdHJbXCJjb250ZW50M1wiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQ3Ll9mb3JjZVVwZGF0ZVJlbmRlckRhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQ3Lm5vZGUuc2V0UG9zaXRpb24oY2MudjIodXNlZFdpZGUsMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZWRXaWRlICs9IHRoaXMuY29udGVudDcubm9kZS53aWR0aFxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgaWYoY2MuaXNWYWxpZCh0aGlzLnBvaW50TGFiZWwxKSlcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2ludExhYmVsMS5zdHJpbmcgPSBwb2ludFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaW50TGFiZWwxLl9mb3JjZVVwZGF0ZVJlbmRlckRhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaW50TGFiZWwxLm5vZGUuc2V0UG9zaXRpb24oY2MudjIodXNlZFdpZGUsMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZWRXaWRlICs9IHRoaXMucG9pbnRMYWJlbDEubm9kZS53aWR0aFxyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgaWYoY2MuaXNWYWxpZCh0aGlzLmNvbnRlbnQ4KSlcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50OC5zdHJpbmcgPSBjb250ZW50U3RyW1wiY29udGVudDRcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50OC5fZm9yY2VVcGRhdGVSZW5kZXJEYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50OC5ub2RlLnNldFBvc2l0aW9uKGNjLnYyKHVzZWRXaWRlLDApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VkV2lkZSArPSB0aGlzLmNvbnRlbnQ4Lm5vZGUud2lkdGhcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucnVuVHlwZSA9IDIgLy/pu5jorqTmtojmga9cclxuICAgICAgICAgICAgdGhpcy5kZWZhdXRMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5jb21iaW5lTm9kZTEuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5jb21iaW5lTm9kZTIuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgdGhpcy5kZWZhdXRMYWJlbC5zdHJpbmcgPSBkYXRhLm1zZ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDb250ZW50U3RyKHR5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG1zZ1N0ciA9IHRoaXMudmlwU3RyXHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ29tbWlUeXBlLkdyb3VwOlxyXG4gICAgICAgICAgICAgICAgbXNnU3RyID0gdGhpcy5kZWxlZ2V0ZVN0clxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29tbWlUeXBlLlNlbGZDb21taTpcclxuICAgICAgICAgICAgICAgIG1zZ1N0ciA9IHRoaXMuZGVsZWdldGVTdHJcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIENvbW1pVHlwZS5VbmxpbWl0ZWQ6XHJcbiAgICAgICAgICAgICAgICBtc2dTdHIgPSB0aGlzLmRlbGVnZXRlU3RyXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBQYXlUeXBlLlN5c1BheVR5cGVWaXA6XHJcbiAgICAgICAgICAgICAgICBtc2dTdHIgPSB0aGlzLnZpcFN0clxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgUGF5VHlwZS5TeXNQYXlUeXBlVW5pb246XHJcbiAgICAgICAgICAgICAgICBtc2dTdHIgPSB0aGlzLnZpcFN0clxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1zZ1N0clxyXG4gICAgfVxyXG5cclxuICAgIHJ1bihtc2csY3VycmVudFJ1bm5pbmdDb3VudCxtYXhDb3VudCA9IDIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoY2MuaXNWYWxpZCh0aGlzLnBsYXlOb2RlKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQobXNnKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjdXJyZW50UnVubmluZ0NvdW50Pm1heENvdW50IC0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRSdW5uaW5nQ291bnQgPSBtYXhDb3VudCAtIDFcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN0YXJ0UG9zID0gY2MudjIodGhpcy5zdGFydFBvcy54LHRoaXMuc3RhcnRQb3MueSAtKGN1cnJlbnRSdW5uaW5nQ291bnQqNDApKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihzdGFydFBvcylcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIHZhciBtb3ZlVGltZSA9IDAuNVxyXG4gICAgICAgIGxldCBjZW50ZXJQb3MgPSAgY2MudjIodGhpcy5jZW50ZXJQb3MueCxzdGFydFBvcy55KVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwi5pKt5pS+Ouenu+WKqOi3neemu1wiLG1vdmVkcyxcIuenu+WKqOaXtumXtFwiLG1vdmVUaW1lLFwi5Yid5aeL6Led56a7XCIsaXRlbS5ub2RlLngpXHJcbiAgICAgICAgdmFyIG12ID0gY2MubW92ZVRvKG1vdmVUaW1lLGNlbnRlclBvcyk7XHJcbiAgICAgICAgbXYuZWFzaW5nKGNjLmVhc2VJbihtb3ZlVGltZSkpXHJcbiAgICAgICAgdGhpcy5wbGF5Tm9kZS5zZXRQb3NpdGlvbihjYy52MigtNjAwLDApKVxyXG4gICAgICAgIHRoaXMubW92ZVRleHQoKVxyXG5cclxuICAgICAgICBsZXQgZW5kID0gY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5wbGF5QW5pbSh0aGlzLnBsYXlOb2RlKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKChjYy5zZXF1ZW5jZShtdixlbmQpKSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vliqjkuI3lkIzpopzoibLnmoRsYWJlbFxyXG4gICAgICovXHJcbiAgICBtb3ZlVGV4dCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSB0aGlzLmdldFBhcmVudE5vZGUoKVxyXG4gICAgICAgIGlmKGNjLmlzVmFsaWQocGFyZW50Tm9kZSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgbmFtZUxhYmVsID0gcGFyZW50Tm9kZSA9PSB0aGlzLmNvbWJpbmVOb2RlMSA/IHRoaXMubmFtZUxhYmVsIDogdGhpcy5uYW1lTGFiZWwxXHJcbiAgICAgICAgICAgIGxldCBnYW1lTGFiZWwgPSBwYXJlbnROb2RlID09IHRoaXMuY29tYmluZU5vZGUxID8gdGhpcy5nYW1lTGFiZWwgOiBudWxsXHJcbiAgICAgICAgICAgIGxldCBwb2ludExhYmVsID0gcGFyZW50Tm9kZSA9PSB0aGlzLmNvbWJpbmVOb2RlMSA/IHRoaXMucG9pbnRMYWJlbCA6IHRoaXMucG9pbnRMYWJlbDFcclxuXHJcbiAgICAgICAgICAgIGlmKGNjLmlzVmFsaWQobmFtZUxhYmVsLm5vZGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3JpZ1BvcyA9IG5hbWVMYWJlbC5ub2RlLnBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBsZXQgcG9zID0gR2xvYmFsLlVJVXRpbC5jb252ZXJ0U2FtZU5vZGVQb3MocGFyZW50Tm9kZSx0aGlzLmdyZWVuTm9kZSxvcmlnUG9zKVxyXG4gICAgICAgICAgICAgICAgbmFtZUxhYmVsLm5vZGUuc2V0UGFyZW50KHRoaXMuZ3JlZW5Ob2RlKVxyXG4gICAgICAgICAgICAgICAgbmFtZUxhYmVsLm5vZGUuc2V0UG9zaXRpb24ocG9zKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGdhbWVMYWJlbCAmJiBjYy5pc1ZhbGlkKGdhbWVMYWJlbC5ub2RlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9yaWdQb3MgPSBnYW1lTGFiZWwubm9kZS5wb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgbGV0IHBvcyA9IEdsb2JhbC5VSVV0aWwuY29udmVydFNhbWVOb2RlUG9zKHBhcmVudE5vZGUsdGhpcy5ibHVlTm9kZSxvcmlnUG9zKVxyXG4gICAgICAgICAgICAgICAgZ2FtZUxhYmVsLm5vZGUuc2V0UGFyZW50KHRoaXMuYmx1ZU5vZGUpXHJcbiAgICAgICAgICAgICAgICBnYW1lTGFiZWwubm9kZS5zZXRQb3NpdGlvbihwb3MpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY2MuaXNWYWxpZChwb2ludExhYmVsLm5vZGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3JpZ1BvcyA9IHBvaW50TGFiZWwubm9kZS5wb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgbGV0IHBvcyA9IEdsb2JhbC5VSVV0aWwuY29udmVydFNhbWVOb2RlUG9zKHBhcmVudE5vZGUsdGhpcy55ZWxsb3dOb2RlLG9yaWdQb3MpXHJcbiAgICAgICAgICAgICAgICBwb2ludExhYmVsLm5vZGUuc2V0UGFyZW50KHRoaXMueWVsbG93Tm9kZSlcclxuICAgICAgICAgICAgICAgIHBvaW50TGFiZWwubm9kZS5zZXRQb3NpdGlvbihwb3MpXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UGFyZW50Tm9kZSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSBudWxsXHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnJ1blR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZSA9IHRoaXMuY29tYmluZU5vZGUxXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlID0gdGhpcy5jb21iaW5lTm9kZTJcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFyZW50Tm9kZVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVVcChjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICB2YXIgbW92ZVRpbWUgPSAwLjVcclxuICAgICAgICBsZXQgZW5kID0gY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgdGhpcy5jaGVja1Bvc2l0aW9uKGNhbGxiYWNrKVxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICB2YXIgbXZVcCA9IGNjLm1vdmVCeShtb3ZlVGltZSwgY2MudjIoMCwgNDApKTtcclxuICAgICAgICBtdlVwLmVhc2luZyA9IChjYy5lYXNlT3V0KG1vdmVUaW1lKSlcclxuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKG12VXAsZW5kKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tQb3NpdGlvbihjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICBpZihjYy5pc1ZhbGlkKHRoaXMubm9kZSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGUueT50aGlzLmVuZFBvcy55KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaENvbnRlbnQoZGF0YSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLmluaXQoZGF0YSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBwbGF5QW5pbShpdGVtOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIiFpdGVtLm5vZGUuaXNWYWxpZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgIHZhciBtb3ZlVGltZSA9IDEyO1xyXG4gICAgICAgIGxldCBwYXJlbnRXaWRlID0gaXRlbS5wYXJlbnQud2lkdGhcclxuICAgICAgICBsZXQgZGVmYXV0TGFiZWwgPSBjYy5maW5kKFwiZGVmYXV0TGFiZWxcIixpdGVtKVxyXG4gICAgICAgIGlmKGRlZmF1dExhYmVsLndpZHRoPD1wYXJlbnRXaWRlIHx8dGhpcy5ydW5UeXBlICE9IDIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IGRpc3RlbmNlID0gZGVmYXV0TGFiZWwud2lkdGhcclxuICAgICAgICB2YXIgbW92ZVRpbWUgPSBkaXN0ZW5jZSAvIHRoaXMuYmFzZVNwZWVkO1xyXG4gICAgICAgIGRpc3RlbmNlID0gaXRlbS54IC0gZGlzdGVuY2VcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuaSreaUvjrnp7vliqjot53nprtcIixtb3ZlZHMsXCLnp7vliqjml7bpl7RcIixtb3ZlVGltZSxcIuWIneWni+i3neemu1wiLGl0ZW0ubm9kZS54KVxyXG4gICAgICAgIGxldCBlbmRQb3MgPSBjYy52MigoZGlzdGVuY2UpLGl0ZW0ueSlcclxuICAgICAgICB2YXIgbXYgPSBjYy5tb3ZlVG8obW92ZVRpbWUsIGVuZFBvcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNhbGxCYWNrID0gY2MuY2FsbEZ1bmMoKCk9PntcclxuICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbihjYy52MigwLDApKVxyXG4gICAgICAgICAgICBpdGVtLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIGxldCBtb3ZlVGltZSA9IChkZWZhdXRMYWJlbC53aWR0aCkvdGhpcy5iYXNlU3BlZWRcclxuICAgICAgICAgICAgbGV0IGVuZFBvcyA9IGNjLnYyKCgtZGVmYXV0TGFiZWwud2lkdGggLSB0aGlzLmJveExlbmd0aCApLGl0ZW0ueSlcclxuICAgICAgICAgICAgdmFyIG12ID0gY2MubW92ZVRvKG1vdmVUaW1lLCBlbmRQb3MpO1xyXG4gICAgICAgICAgICBpdGVtLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShtdixjYWxsQmFjaykpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgaXRlbS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UobXYsY2FsbEJhY2spKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKuWbnuaUtiAqL1xyXG4gICAgcHVibGljIHJlY292ZXJ5SXRlbShyZWl0ZW06IGNjLk5vZGUpIHtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVzZXQoKVxyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLnN0YXJ0UG9zKVxyXG4gICAgICAgIGlmKGNjLmlzVmFsaWQocmVpdGVtKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJlaXRlbS5zZXRQb3NpdGlvbihjYy52MigwLDApKVxyXG4gICAgICAgICAgICByZWl0ZW0uc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9yZWl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldCgpe1xyXG4gICAgICAgIGlmKGNjLmlzVmFsaWQodGhpcy5ub2RlKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29udGVudDEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQxLnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgaWYodGhpcy5jb250ZW50MilcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudDIuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICBpZih0aGlzLmNvbnRlbnQzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50My5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29udGVudDQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQ0LnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgaWYodGhpcy5jb250ZW50NSlcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudDUuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICBpZih0aGlzLmNvbnRlbnQ2KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Ni5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29udGVudDcpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQ3LnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgaWYodGhpcy5jb250ZW50OClcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudDguc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICBpZih0aGlzLm5hbWVMYWJlbDEpICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWVMYWJlbDEuc3RyaW5nID0gXCJcIlxyXG4gICAgICAgICAgICBpZih0aGlzLm5hbWVMYWJlbClcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZUxhYmVsLnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgaWYodGhpcy5nYW1lTGFiZWwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVMYWJlbC5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIGlmKHRoaXMucG9pbnRMYWJlbClcclxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRMYWJlbC5zdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgICAgIGlmKHRoaXMucG9pbnRMYWJlbDEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50TGFiZWwxLnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgaWYodGhpcy5kZWZhdXRMYWJlbCkgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1dExhYmVsLnN0cmluZyA9IFwiXCJcclxuICAgICAgICAgICAgaWYodGhpcy5uYW1lTGFiZWwxKSBcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZUxhYmVsMS5ub2RlLnNldFBhcmVudCh0aGlzLmNvbWJpbmVOb2RlMilcclxuICAgICAgICAgICAgaWYodGhpcy5uYW1lTGFiZWwpIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lTGFiZWwubm9kZS5zZXRQYXJlbnQodGhpcy5jb21iaW5lTm9kZTEpXHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2FtZUxhYmVsKSBcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZUxhYmVsLm5vZGUuc2V0UGFyZW50KHRoaXMuY29tYmluZU5vZGUxKVxyXG4gICAgICAgICAgICBpZih0aGlzLnBvaW50TGFiZWwxKSBcclxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRMYWJlbDEubm9kZS5zZXRQYXJlbnQodGhpcy5jb21iaW5lTm9kZTIpXHJcbiAgICAgICAgICAgIGlmKHRoaXMucG9pbnRMYWJlbCkgXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50TGFiZWwubm9kZS5zZXRQYXJlbnQodGhpcy5jb21iaW5lTm9kZTEpXHJcbiAgICAgICAgICAgIHRoaXMucnVuVHlwZSA9IC0xXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgXHJcbiAgICB9XHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxyXG59XHJcbiJdfQ==