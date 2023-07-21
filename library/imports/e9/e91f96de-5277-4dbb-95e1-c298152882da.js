"use strict";
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