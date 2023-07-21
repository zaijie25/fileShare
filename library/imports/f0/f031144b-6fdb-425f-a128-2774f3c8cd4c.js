"use strict";
cc._RF.push(module, 'f0311RLb9tCX6EoJ3TzyM1M', 'PaoMaDengComp');
// hall/scripts/logic/core/component/PaoMaDengComp.ts

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
exports.PaoMaDengIdiom = exports.PaoMaDengMsgTemp = exports.CommiType = exports.PayType = void 0;
var AppHelper_1 = require("../tool/AppHelper");
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**跑马灯通用组件 */
var PaoMaDengComp = /** @class */ (function (_super) {
    __extends(PaoMaDengComp, _super);
    function PaoMaDengComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //当前播放的跑马灯节点
        _this.playNode = null;
        //当前是否播放跑马灯
        _this.isPlaying = false;
        /**
         * 根节点，无消息时隐藏
         */
        _this.rootNode = null;
        //轮询Timer
        _this.checkTimer = null;
        //消息缓存队列
        _this.msgDataCacheList = [];
        //消息队列缓存长度限制
        _this.listLengthLimit = 8;
        //所有优先级的总长度
        _this.totalLenghLimit = 10;
        //跑马灯遮罩宽度
        _this.boxLength = 600;
        //跑马灯速度
        _this.baseSpeed = 120;
        return _this;
    }
    /**获取一个可用的子节点对象 */
    PaoMaDengComp.prototype.getItem = function () {
        if (this.playNode == null) {
            var itemObj = new cc.Node("richtextNode");
            this.playNode = itemObj.addComponent(cc.RichText);
            this.playNode.node.setParent(this.node);
            //设置richtext的属性
            this.playNode.node.anchorX = 0;
            this.playNode.node.anchorY = this.node.anchorY;
            this.playNode.horizontalAlign = cc.macro.TextAlignment.LEFT;
            this.playNode.fontSize = 24;
            this.playNode.useSystemFont = true;
            this.playNode.fontFamily = "Microsoft Yahei";
            this.playNode.maxWidth = 0;
            this.playNode.lineHeight = this.node.height;
            this.playNode.handleTouchEvent = true;
        }
        this.playNode.node.active = true;
        this.playNode.node.x = 0;
        return this.playNode;
    };
    /**回收 */
    PaoMaDengComp.prototype.recoveryItem = function (reitem) {
        this.isPlaying = false;
        reitem.string = "";
        reitem.node.active = false;
        reitem.node.stopAllActions();
    };
    /**清理 */
    PaoMaDengComp.prototype.clearRecord = function () {
        this.playNode = null;
    };
    //初始化
    PaoMaDengComp.prototype.init = function () {
        this.boxLength = this.node.width;
        this.startTimer();
    };
    //界面销毁
    PaoMaDengComp.prototype.onDestroy = function () {
        this.stopTimer();
    };
    PaoMaDengComp.prototype.onEnable = function () {
        this.isPlaying = false;
        this.reset();
        this.startTimer();
    };
    PaoMaDengComp.prototype.onDisable = function () {
        this.stopTimer();
    };
    PaoMaDengComp.prototype.startTimer = function () {
        if (this.checkTimer == null) {
            this.checkTimer = setInterval(this.checkMsgList.bind(this), 100);
            Global.Event.on(GlobalEvent.MARQUEESCROLL_COMMON, this, this.addMsgData);
            Global.Event.on(GlobalEvent.MARQUEESCROLL_BIGWINNER, this, this.addMsgData);
            Global.Event.on(GlobalEvent.MARQUEESCROLL_VIP, this, this.addPriorityMsgData);
            Global.Event.on(GlobalEvent.MARQUEESCROLL_COMMI, this, this.addPriorityMsgData);
        }
    };
    PaoMaDengComp.prototype.stopTimer = function () {
        if (this.checkTimer) {
            Global.Event.off(GlobalEvent.MARQUEESCROLL_COMMON, this, this.addMsgData);
            Global.Event.off(GlobalEvent.MARQUEESCROLL_BIGWINNER, this, this.addMsgData);
            Global.Event.off(GlobalEvent.MARQUEESCROLL_VIP, this, this.addPriorityMsgData);
            Global.Event.off(GlobalEvent.MARQUEESCROLL_COMMI, this, this.addPriorityMsgData);
            clearInterval(this.checkTimer);
            this.checkTimer = null;
        }
    };
    PaoMaDengComp.prototype.addPriorityMsgData = function (data) {
        if (this.node == null || !this.node.isValid) {
            this.stopTimer();
            return;
        }
        //缓存数量大于10 任何消息都丢
        if (this.msgDataCacheList.length >= this.totalLenghLimit) {
            this.msgDataCacheList.pop();
            this.msgDataCacheList.unshift(data.data);
            return;
        }
        this.msgDataCacheList.unshift(data.data);
    };
    PaoMaDengComp.prototype.playAnim = function (item) {
        if (!item.node.isValid) {
            Logger.error("!item.node.isValid");
        }
        var moveds = item.node.x + item.node.width + this.boxLength;
        var moveTime = moveds / this.baseSpeed;
        // console.log("播放:移动距离",moveds,"移动时间",moveTime,"初始距离",item.node.x)
        var mv = cc.moveTo(moveTime, -(item.node.width + this.boxLength), 0);
        var mvover = cc.callFunc(function () {
            this.recoveryItem(item);
        }, this);
        this.isPlaying = true;
        item.node.runAction(cc.sequence(mv, mvover));
        if (this.rootNode) {
            this.rootNode.opacity = 255;
        }
    };
    /**
     * data ={  game_id: 1007
                game_level: "l0"
                game_rule: "default"
                headimg: "7"
                hitPoint: 5434000
                nickname: "鱼一直下"
        }
     */
    PaoMaDengComp.prototype.checkMsgList = function () {
        try {
            if (!this.node || !this.node.isValid)
                return;
            if (this.isPlaying)
                return;
            if (this.playNode == null) {
                if (this.rootNode) {
                    this.rootNode.opacity = 0;
                }
            }
            if (this.msgDataCacheList.length == 0)
                return;
            var data = this.msgDataCacheList.shift();
            var msgStr = "";
            if (data.nickname != null) {
                if (data.game_id) //有game_id为大赢家消息
                 {
                    var gameInfo = Global.GameData.getGameInfo(data.game_id);
                    // console.log("gameInfo.name",gameInfo.name)
                    if (!gameInfo || gameInfo.name == null) {
                        Logger.error("找不到gameid", data.game_id);
                        return;
                    }
                    if (gameInfo.status != 1) {
                        return;
                    }
                    var gameType = gameInfo.marqueeStrType; //游戏类型
                    var playerName = data.nickname; //玩家名称
                    var gameName = gameInfo.name; //游戏名
                    var point = data.hitPoint; //点数
                    msgStr = this.GetMarQueeStr(gameType, playerName, gameName, point);
                }
                else //优先消息
                 {
                    var type = data.pay_type ? data.pay_type : data.type; //优先级消息类型
                    var name = data.nickname; //玩家名字
                    var point = Global.Toolkit.formatPoint(data.point); //佣金或者返利数
                    msgStr = this.GetPriorityMsg(type, name, point);
                }
            }
            else {
                msgStr = data.msg;
            }
            if (AppHelper_1.default.isBaiduSpecialState())
                msgStr = msgStr.replace(new RegExp("元", 'g'), "");
            this.playNode = this.getItem();
            this.playNode.string = msgStr;
            this.playAnim(this.playNode);
        }
        catch (error) {
            // this.stopTimer();
            // Logger.error(error);
        }
    };
    PaoMaDengComp.prototype.reset = function () {
        var item = this.getItem();
        item.node.x = 0;
        item.node.stopAllActions();
        this.isPlaying = false;
    };
    /**
     * 拼接优先跑马灯的富文本内容
     * @param type 优先级消息类型
     * @param name 玩家名字
     * @param point 返利/佣金数
     * @returns 返回跑马灯富文本内容
     */
    PaoMaDengComp.prototype.GetPriorityMsg = function (type, name, point) {
        var msgStr = '';
        switch (type) {
            case CommiType.Group:
                msgStr = cc.js.formatStr(PaoMaDengMsgTemp.Commission, PaoMaDengIdiom.CommissionGroup, name, point);
                break;
            case CommiType.SelfCommi:
                msgStr = cc.js.formatStr(PaoMaDengMsgTemp.Commission, PaoMaDengIdiom.CommissionSelfCommi, name, point);
                break;
            case CommiType.Unlimited:
                msgStr = cc.js.formatStr(PaoMaDengMsgTemp.Commission, PaoMaDengIdiom.CommissionUnlimited, name, point);
                break;
            case PayType.SysPayTypeVip:
                msgStr = cc.js.formatStr(PaoMaDengMsgTemp.Rebate, PaoMaDengIdiom.RebateSysPayTypeVip, name, point);
                break;
            case PayType.SysPayTypeUnion:
                msgStr = cc.js.formatStr(PaoMaDengMsgTemp.Rebate, PaoMaDengIdiom.RebateSysSysPayTypeUnion, name, point);
                break;
            default:
                break;
        }
        return msgStr;
    };
    /**
     * 排序方法,子类可重写
     * @param dataA
     * @param dataB
     */
    PaoMaDengComp.prototype.dataSortFunc = function (dataA, dataB) {
        return dataA.type - dataB.type;
    };
    /**
     * 添加跑马灯数据
     * @param data {
            msg,
            type,
     * }
     */
    PaoMaDengComp.prototype.addMsgItem = function (data) {
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
    PaoMaDengComp.prototype.addDefautMsg = function () {
        var msgList = [
            { msg: PaoMaDengMsgTemp.Welcome, type: 1 },
            { msg: PaoMaDengMsgTemp.TipBadGame, type: 1 },
            { msg: PaoMaDengMsgTemp.NoWallow, type: 1 },
        ];
        for (var index = 0; index < msgList.length; index++) {
            var data = msgList[index];
            this.addMsgItem(data);
        }
    };
    /**
     * @param msg {
                type : 20001,
                data : {
                    type : 0 ,
                    msg : "<color=#FF0000>TestData!!!!!!!!!!!!!!</color>"
                },
            }
     */
    PaoMaDengComp.prototype.addMsgData = function (msg) {
        this.addMsgItem(msg.data);
    };
    /**
     * 拼接赢钱富文本消息内容
     * @param strType 赢钱游戏类型
     * @param playerName 玩家名字
     * @param gameName 游戏名字
     * @param profit 赢得的码数
     */
    PaoMaDengComp.prototype.GetMarQueeStr = function (strType, playerName, gameName, profit) {
        var msgStr = '';
        var level = Global.Toolkit.formatPoint(profit);
        var point = Global.Toolkit.GetMoneyFormat(profit);
        switch (strType) {
            case 1:
                if (500 <= level && level <= 1000) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin, PaoMaDengIdiom.Type1Level1, playerName, gameName, point);
                    return msgStr;
                }
                else if (1001 <= level && level <= 2000) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin, PaoMaDengIdiom.Type1Level2, playerName, gameName, point);
                    return msgStr;
                }
                else if (2001 <= level && level <= 3000) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin, PaoMaDengIdiom.Type1Level3, playerName, gameName, point);
                    return msgStr;
                }
                else if (level >= 3001) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin, PaoMaDengIdiom.Type1Level4, playerName, gameName, point);
                    return msgStr;
                }
                else {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin, PaoMaDengIdiom.Type1Level0, playerName, gameName, point);
                    return msgStr;
                }
                break;
            case 2:
                if (100 <= level) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin, PaoMaDengIdiom.Type2Level0, playerName, gameName, point);
                    return msgStr;
                }
                break;
            case 3:
                if (10 <= level) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin, PaoMaDengIdiom.Type3Level0, playerName, gameName, point);
                    return msgStr;
                }
                break;
            case 4:
                if (100 <= level && level <= 200) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin, PaoMaDengIdiom.Type4Level0, playerName, gameName, point);
                    return msgStr;
                }
                else if (201 <= level && level <= 500) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin, PaoMaDengIdiom.Type4Level1, playerName, gameName, point);
                    return msgStr;
                }
                else if (501 <= level && level <= 1000) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin, PaoMaDengIdiom.Type4Level2, playerName, gameName, point);
                    return msgStr;
                }
                else if (level > 1000) {
                    msgStr = cc.js.formatStr(PaoMaDengMsgTemp.GamesWin, PaoMaDengIdiom.Type4Level3, playerName, gameName, point);
                    return msgStr;
                }
                break;
            case 5: //捕鱼大战
                msgStr = cc.js.formatStr(PaoMaDengMsgTemp.BuyuType, PaoMaDengIdiom.Type5Level0, playerName, gameName, point);
                return msgStr;
                break;
            case 6: //欢乐捕鱼
                msgStr = cc.js.formatStr(PaoMaDengMsgTemp.BuyuType, PaoMaDengIdiom.Type6Level0, playerName, gameName, point);
                return msgStr;
                break;
            case 7: //大闹天宫
                msgStr = cc.js.formatStr(PaoMaDengMsgTemp.BuyuType, PaoMaDengIdiom.Type7Level0, playerName, gameName, point);
                return msgStr;
                break;
            default:
                return msgStr;
                break;
        }
    };
    PaoMaDengComp = __decorate([
        ccclass
    ], PaoMaDengComp);
    return PaoMaDengComp;
}(cc.Component));
exports.default = PaoMaDengComp;
var PayType;
(function (PayType) {
    PayType[PayType["SysPayTypeVip"] = 1] = "SysPayTypeVip";
    PayType[PayType["SysPayTypeDown"] = 2] = "SysPayTypeDown";
    PayType[PayType["SysPayTypeUnion"] = 3] = "SysPayTypeUnion";
    PayType[PayType["SysPayTypeGive"] = 4] = "SysPayTypeGive";
    PayType[PayType["SysPayTypeSmall"] = 5] = "SysPayTypeSmall";
})(PayType = exports.PayType || (exports.PayType = {}));
var CommiType;
(function (CommiType) {
    CommiType[CommiType["Group"] = 20] = "Group";
    CommiType[CommiType["SelfCommi"] = 25] = "SelfCommi";
    CommiType[CommiType["Unlimited"] = 26] = "Unlimited";
})(CommiType = exports.CommiType || (exports.CommiType = {}));
var PaoMaDengMsgTemp;
(function (PaoMaDengMsgTemp) {
    PaoMaDengMsgTemp["Welcome"] = "<color=#00d2FF>\u5C0A\u656C\u7684\u73A9\u5BB6\uFF0C\u6B22\u8FCE\u8FDB\u5165\u6E38\u620F\u5927\u5385\uFF01</color>";
    PaoMaDengMsgTemp["TipBadGame"] = "<color=#f9a314>\u62B5\u5236\u4E0D\u826F\u6E38\u620F\uFF0C\u62D2\u7EDD\u76D7\u7248\u6E38\u620F\uFF0C\u6CE8\u610F\u81EA\u8EAB\u4FDD\u62A4\uFF0C\u8C28\u9632\u4E0A\u5F53\u53D7\u9A97</color>";
    PaoMaDengMsgTemp["NoWallow"] = "<color=#f9a314>\u9002\u5EA6\u6E38\u620F\u76CA\u8111\uFF0C\u6C89\u8FF7\u6E38\u620F\u4F24\u8EAB\uFF0C\u5408\u7406\u5B89\u6392\u65F6\u95F4\uFF0C\u4EAB\u53D7\u5065\u5EB7\u751F\u6D3B</color>";
    PaoMaDengMsgTemp["GamesWin"] = "<color=#ffffff>%s\uFF01\u606D\u559C\u73A9\u5BB6</color><color=#00ff00>%s</color><color=#ffffff>\u5728</color><color=#00d2ff>%s</color><color=#ffffff>\u4E2D\u8D62\u5F97</color><color=#fff100>%s</color><color=#ffffff>\u5143\uFF01</color><color=#ffffff>\u5FEB\u6765\u56F4\u89C2\u5427\uFF01</color>";
    PaoMaDengMsgTemp["Rebate"] = "<color=#ffffff>%s\uFF01\u73A9\u5BB6</color><color=#00ff00>%s</color><color=#ffffff>\u901A\u8FC7\u516C\u53F8\u5165\u6B3E\u5145\u503C\u83B7\u5F97</color><color=#fff100>%s</color><color=#ffffff>\u5143</color><color=#ffffff>\u8FD4\u5229\uFF01</color>";
    PaoMaDengMsgTemp["Commission"] = "<color=#ffffff>%s\uFF01\u73A9\u5BB6</color><color=#00ff00>%s</color><color=#ffffff>\u9886\u53D6\u4E86</color><color=#fff100>%s</color><color=#ffffff>\u5143</color><color=#ffffff>\u4EE3\u7406\u4F63\u91D1\uFF01</color>";
    PaoMaDengMsgTemp["BuyuType"] = "<color=#ffffff>%s\uFF01\u606D\u559C\u73A9\u5BB6</color><color=#00ff00>%s</color><color=#ffffff>\u5728</color><color=#00d2ff>%s</color><color=#ffffff>\u6E38\u620F\u4E2D\u51FB\u6740BOSS\u8D62\u5F97</color><color=#fff100>%s</color><color=#ffffff>\u5143\uFF01</color>";
})(PaoMaDengMsgTemp = exports.PaoMaDengMsgTemp || (exports.PaoMaDengMsgTemp = {}));
var PaoMaDengIdiom;
(function (PaoMaDengIdiom) {
    PaoMaDengIdiom["CommissionGroup"] = "\u5929\u9053\u916C\u52E4";
    PaoMaDengIdiom["CommissionSelfCommi"] = "\u5929\u9053\u916C\u52E4";
    PaoMaDengIdiom["CommissionUnlimited"] = "\u559C\u4ECE\u5929\u964D";
    PaoMaDengIdiom["RebateSysPayTypeVip"] = "\u5929\u964D\u6A2A\u8D22";
    PaoMaDengIdiom["RebateSysSysPayTypeUnion"] = "\u5B98\u65B9\u9001\u91D1";
    PaoMaDengIdiom["Type1Level0"] = "\u606D\u559C\u53D1\u8D22";
    PaoMaDengIdiom["Type1Level1"] = "\u9E3F\u8FD0\u5F53\u5934";
    PaoMaDengIdiom["Type1Level2"] = "\u5927\u5409\u5927\u5229";
    PaoMaDengIdiom["Type1Level3"] = "\u8D22\u6E90\u5E7F\u8FDB";
    PaoMaDengIdiom["Type1Level4"] = "\u516B\u65B9\u6765\u8D22";
    PaoMaDengIdiom["Type2Level0"] = "\u4E00\u53D1\u5165\u9B42";
    PaoMaDengIdiom["Type3Level0"] = "\u9E3F\u8FD0\u5F53\u5934";
    PaoMaDengIdiom["Type4Level0"] = "\u521D\u5165\u6C5F\u6E56";
    PaoMaDengIdiom["Type4Level1"] = "\u5C0F\u8BD5\u725B\u5200";
    PaoMaDengIdiom["Type4Level2"] = "\u5927\u6740\u56DB\u65B9";
    PaoMaDengIdiom["Type4Level3"] = "\u72EC\u5B64\u6C42\u8D25";
    PaoMaDengIdiom["Type5Level0"] = "\u4E00\u51FB\u5373\u4E2D";
    PaoMaDengIdiom["Type6Level0"] = "\u4E00\u9A6C\u5F53\u5148";
    PaoMaDengIdiom["Type7Level0"] = "\u6D2A\u798F\u9F50\u5929"; //type5(捕鱼类) 大闹天宫
})(PaoMaDengIdiom = exports.PaoMaDengIdiom || (exports.PaoMaDengIdiom = {}));

cc._RF.pop();