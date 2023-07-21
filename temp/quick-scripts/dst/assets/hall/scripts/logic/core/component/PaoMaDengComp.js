
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/PaoMaDengComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcUGFvTWFEZW5nQ29tcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQTBDO0FBRTFDLG9CQUFvQjtBQUNwQixrRkFBa0Y7QUFDbEYseUZBQXlGO0FBQ3pGLG1CQUFtQjtBQUNuQiw0RkFBNEY7QUFDNUYsbUdBQW1HO0FBQ25HLDhCQUE4QjtBQUM5Qiw0RkFBNEY7QUFDNUYsbUdBQW1HO0FBRTdGLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRTVDLGFBQWE7QUFFYjtJQUEyQyxpQ0FBWTtJQUF2RDtRQUFBLHFFQTBZQztRQXhZRyxZQUFZO1FBQ0osY0FBUSxHQUFlLElBQUksQ0FBQztRQUNwQyxXQUFXO1FBQ0gsZUFBUyxHQUFXLEtBQUssQ0FBQztRQUNsQzs7V0FFRztRQUNILGNBQVEsR0FBWSxJQUFJLENBQUM7UUFxQ3pCLFNBQVM7UUFDRCxnQkFBVSxHQUFHLElBQUksQ0FBQztRQUUxQixRQUFRO1FBQ0Esc0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzlCLFlBQVk7UUFDSixxQkFBZSxHQUFHLENBQUMsQ0FBQztRQUU1QixXQUFXO1FBQ0gscUJBQWUsR0FBRyxFQUFFLENBQUM7UUFFN0IsU0FBUztRQUNELGVBQVMsR0FBRyxHQUFHLENBQUM7UUFDeEIsT0FBTztRQUNDLGVBQVMsR0FBRyxHQUFHLENBQUM7O0lBOFU1QixDQUFDO0lBL1hHLGtCQUFrQjtJQUNWLCtCQUFPLEdBQWY7UUFDSSxJQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFDO1lBQ3JCLElBQUksT0FBTyxHQUFZLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8s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LENBQUE7SUFDcEIsMERBQW9CLENBQUE7SUFDcEIsMERBQW9CLENBQUE7SUFDcEIsMERBQW9CLENBQUE7SUFDcEIsMERBQW9CLENBQUE7SUFDcEIsMERBQW9CLENBQUE7SUFDcEIsMERBQW9CLENBQUE7SUFDcEIsMERBQW9CLENBQUE7SUFDcEIsMERBQW9CLENBQUEsQ0FBSSxpQkFBaUI7QUFFN0MsQ0FBQyxFQXJCVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQXFCekIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBwSGVscGVyIGZyb20gXCIuLi90b29sL0FwcEhlbHBlclwiO1xyXG5cclxuLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoq6LeR6ams54Gv6YCa55So57uE5Lu2ICovXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhb01hRGVuZ0NvbXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIC8v5b2T5YmN5pKt5pS+55qE6LeR6ams54Gv6IqC54K5XHJcbiAgICBwcml2YXRlIHBsYXlOb2RlOmNjLlJpY2hUZXh0ID0gbnVsbDtcclxuICAgIC8v5b2T5YmN5piv5ZCm5pKt5pS+6LeR6ams54GvXHJcbiAgICBwcml2YXRlIGlzUGxheWluZzpib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqIOagueiKgueCue+8jOaXoOa2iOaBr+aXtumakOiXj1xyXG4gICAgICovXHJcbiAgICByb290Tm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgLyoq6I635Y+W5LiA5Liq5Y+v55So55qE5a2Q6IqC54K55a+56LGhICovXHJcbiAgICBwcml2YXRlIGdldEl0ZW0oKSB7XHJcbiAgICAgICAgaWYodGhpcy5wbGF5Tm9kZSA9PSBudWxsKXtcclxuICAgICAgICAgICAgbGV0IGl0ZW1PYmo6IGNjLk5vZGUgPSBuZXcgY2MuTm9kZShcInJpY2h0ZXh0Tm9kZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5Tm9kZSA9IGl0ZW1PYmouYWRkQ29tcG9uZW50KGNjLlJpY2hUZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5Tm9kZS5ub2RlLnNldFBhcmVudCh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICAvL+iuvue9rnJpY2h0ZXh055qE5bGe5oCnXHJcbiAgICAgICAgICAgIHRoaXMucGxheU5vZGUubm9kZS5hbmNob3JYID0gMDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5Tm9kZS5ub2RlLmFuY2hvclkgPSB0aGlzLm5vZGUuYW5jaG9yWTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5Tm9kZS5ob3Jpem9udGFsQWxpZ24gPSBjYy5tYWNyby5UZXh0QWxpZ25tZW50LkxFRlQ7XHJcbiAgICAgICAgICAgIHRoaXMucGxheU5vZGUuZm9udFNpemUgPSAyNDtcclxuICAgICAgICAgICAgdGhpcy5wbGF5Tm9kZS51c2VTeXN0ZW1Gb250ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5Tm9kZS5mb250RmFtaWx5ID0gXCJNaWNyb3NvZnQgWWFoZWlcIjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5Tm9kZS5tYXhXaWR0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMucGxheU5vZGUubGluZUhlaWdodCA9IHRoaXMubm9kZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMucGxheU5vZGUuaGFuZGxlVG91Y2hFdmVudCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGxheU5vZGUubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGxheU5vZGUubm9kZS54ID0gMDtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbGF5Tm9kZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirlm57mlLYgKi9cclxuICAgIHByaXZhdGUgcmVjb3ZlcnlJdGVtKHJlaXRlbTogY2MuUmljaFRleHQpIHtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHJlaXRlbS5zdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIHJlaXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHJlaXRlbS5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5riF55CGICovXHJcbiAgICBwcml2YXRlIGNsZWFyUmVjb3JkKCkge1xyXG4gICAgICAgIHRoaXMucGxheU5vZGUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6L2u6K+iVGltZXJcclxuICAgIHByaXZhdGUgY2hlY2tUaW1lciA9IG51bGw7XHJcblxyXG4gICAgLy/mtojmga/nvJPlrZjpmJ/liJdcclxuICAgIHByaXZhdGUgbXNnRGF0YUNhY2hlTGlzdCA9IFtdO1xyXG4gICAgLy/mtojmga/pmJ/liJfnvJPlrZjplb/luqbpmZDliLZcclxuICAgIHByaXZhdGUgbGlzdExlbmd0aExpbWl0ID0gODtcclxuXHJcbiAgICAvL+aJgOacieS8mOWFiOe6p+eahOaAu+mVv+W6plxyXG4gICAgcHJpdmF0ZSB0b3RhbExlbmdoTGltaXQgPSAxMDtcclxuXHJcbiAgICAvL+i3kemprOeBr+mBrue9qeWuveW6plxyXG4gICAgcHJpdmF0ZSBib3hMZW5ndGggPSA2MDA7XHJcbiAgICAvL+i3kemprOeBr+mAn+W6plxyXG4gICAgcHJpdmF0ZSBiYXNlU3BlZWQgPSAxMjA7XHJcblxyXG4gICAgLy/liJ3lp4vljJZcclxuICAgIHB1YmxpYyBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuYm94TGVuZ3RoID0gdGhpcy5ub2RlLndpZHRoO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eVjOmdoumUgOavgVxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXNldCgpXHJcbiAgICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRUaW1lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja1RpbWVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1RpbWVyID0gc2V0SW50ZXJ2YWwodGhpcy5jaGVja01zZ0xpc3QuYmluZCh0aGlzKSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5NQVJRVUVFU0NST0xMX0NPTU1PTiwgdGhpcywgdGhpcy5hZGRNc2dEYXRhKTtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50Lk1BUlFVRUVTQ1JPTExfQklHV0lOTkVSLCB0aGlzLCB0aGlzLmFkZE1zZ0RhdGEpO1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuTUFSUVVFRVNDUk9MTF9WSVAsIHRoaXMsIHRoaXMuYWRkUHJpb3JpdHlNc2dEYXRhKTtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50Lk1BUlFVRUVTQ1JPTExfQ09NTUksIHRoaXMsIHRoaXMuYWRkUHJpb3JpdHlNc2dEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcFRpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrVGltZXIpIHtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5NQVJRVUVFU0NST0xMX0NPTU1PTiwgdGhpcywgdGhpcy5hZGRNc2dEYXRhKTtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5NQVJRVUVFU0NST0xMX0JJR1dJTk5FUiwgdGhpcywgdGhpcy5hZGRNc2dEYXRhKTtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5NQVJRVUVFU0NST0xMX1ZJUCwgdGhpcywgdGhpcy5hZGRQcmlvcml0eU1zZ0RhdGEpO1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50Lk1BUlFVRUVTQ1JPTExfQ09NTUksIHRoaXMsIHRoaXMuYWRkUHJpb3JpdHlNc2dEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5jaGVja1RpbWVyKTtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1RpbWVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFkZFByaW9yaXR5TXNnRGF0YShkYXRhKSB7XHJcbiAgICAgICAgaWYodGhpcy5ub2RlID09IG51bGwgfHwgIXRoaXMubm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+e8k+WtmOaVsOmHj+Wkp+S6jjEwIOS7u+S9lea2iOaBr+mDveS4olxyXG4gICAgICAgIGlmKHRoaXMubXNnRGF0YUNhY2hlTGlzdC5sZW5ndGggPj0gdGhpcy50b3RhbExlbmdoTGltaXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1zZ0RhdGFDYWNoZUxpc3QucG9wKClcclxuICAgICAgICAgICAgdGhpcy5tc2dEYXRhQ2FjaGVMaXN0LnVuc2hpZnQoZGF0YS5kYXRhKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXNnRGF0YUNhY2hlTGlzdC51bnNoaWZ0KGRhdGEuZGF0YSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwbGF5QW5pbShpdGVtOiBjYy5SaWNoVGV4dCkge1xyXG4gICAgICAgIGlmICghaXRlbS5ub2RlLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiIWl0ZW0ubm9kZS5pc1ZhbGlkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbW92ZWRzID0gaXRlbS5ub2RlLnggKyBpdGVtLm5vZGUud2lkdGggKyB0aGlzLmJveExlbmd0aDtcclxuICAgICAgICB2YXIgbW92ZVRpbWUgPSBtb3ZlZHMgLyB0aGlzLmJhc2VTcGVlZDtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuaSreaUvjrnp7vliqjot53nprtcIixtb3ZlZHMsXCLnp7vliqjml7bpl7RcIixtb3ZlVGltZSxcIuWIneWni+i3neemu1wiLGl0ZW0ubm9kZS54KVxyXG4gICAgICAgIHZhciBtdiA9IGNjLm1vdmVUbyhtb3ZlVGltZSwgLShpdGVtLm5vZGUud2lkdGggKyB0aGlzLmJveExlbmd0aCksIDApO1xyXG4gICAgICAgIHZhciBtdm92ZXIgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3ZlcnlJdGVtKGl0ZW0pO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICBpdGVtLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKG12LCBtdm92ZXIpKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucm9vdE5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5yb290Tm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRhdGEgPXsgIGdhbWVfaWQ6IDEwMDdcclxuICAgICAgICAgICAgICAgIGdhbWVfbGV2ZWw6IFwibDBcIlxyXG4gICAgICAgICAgICAgICAgZ2FtZV9ydWxlOiBcImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgaGVhZGltZzogXCI3XCJcclxuICAgICAgICAgICAgICAgIGhpdFBvaW50OiA1NDM0MDAwXHJcbiAgICAgICAgICAgICAgICBuaWNrbmFtZTogXCLpsbzkuIDnm7TkuItcIlxyXG4gICAgICAgIH1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVja01zZ0xpc3QoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm5vZGUgfHwgIXRoaXMubm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzUGxheWluZykgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZih0aGlzLnBsYXlOb2RlID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yb290Tm9kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290Tm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5tc2dEYXRhQ2FjaGVMaXN0Lmxlbmd0aCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5tc2dEYXRhQ2FjaGVMaXN0LnNoaWZ0KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgbXNnU3RyID0gXCJcIjtcclxuICAgICAgICAgICAgaWYgKGRhdGEubmlja25hbWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5nYW1lX2lkKSAvL+aciWdhbWVfaWTkuLrlpKfotaLlrrbmtojmga9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ2FtZUluZm8gPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZUluZm8oZGF0YS5nYW1lX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImdhbWVJbmZvLm5hbWVcIixnYW1lSW5mby5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZ2FtZUluZm8gfHwgZ2FtZUluZm8ubmFtZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuaJvuS4jeWIsGdhbWVpZFwiLCBkYXRhLmdhbWVfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lSW5mby5zdGF0dXMgIT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdhbWVUeXBlID0gZ2FtZUluZm8ubWFycXVlZVN0clR5cGU7Ly/muLjmiI/nsbvlnotcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWVyTmFtZSA9IGRhdGEubmlja25hbWU7Ly/njqnlrrblkI3np7BcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ2FtZU5hbWUgPSBnYW1lSW5mby5uYW1lOy8v5ri45oiP5ZCNXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvaW50ID0gZGF0YS5oaXRQb2ludDsvL+eCueaVsFxyXG4gICAgICAgICAgICAgICAgICAgIG1zZ1N0ciA9IHRoaXMuR2V0TWFyUXVlZVN0cihnYW1lVHlwZSxwbGF5ZXJOYW1lLGdhbWVOYW1lLHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgLy/kvJjlhYjmtojmga9cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHlwZSA9IGRhdGEucGF5X3R5cGUgPyBkYXRhLnBheV90eXBlIDogZGF0YS50eXBlOy8v5LyY5YWI57qn5raI5oGv57G75Z6LXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBkYXRhLm5pY2tuYW1lOy8v546p5a625ZCN5a2XXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBvaW50ID0gR2xvYmFsLlRvb2xraXQuZm9ybWF0UG9pbnQoZGF0YS5wb2ludCk7Ly/kvaPph5HmiJbogIXov5TliKnmlbBcclxuICAgICAgICAgICAgICAgICAgICBtc2dTdHIgPSB0aGlzLkdldFByaW9yaXR5TXNnKHR5cGUsbmFtZSxwb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtc2dTdHIgPSBkYXRhLm1zZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihBcHBIZWxwZXIuaXNCYWlkdVNwZWNpYWxTdGF0ZSgpKVxyXG4gICAgICAgICAgICAgICAgbXNnU3RyID0gbXNnU3RyLnJlcGxhY2UobmV3IFJlZ0V4cChcIuWFg1wiLCAnZycpLCBcIlwiKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5Tm9kZSA9IHRoaXMuZ2V0SXRlbSgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlOb2RlLnN0cmluZyA9IG1zZ1N0cjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QW5pbSh0aGlzLnBsYXlOb2RlKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAvLyB0aGlzLnN0b3BUaW1lcigpO1xyXG4gICAgICAgICAgICAvLyBMb2dnZXIuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgcmVzZXQoKXtcclxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZ2V0SXRlbSgpXHJcbiAgICAgICAgaXRlbS5ub2RlLnggPSAwXHJcbiAgICAgICAgaXRlbS5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTsgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmi7zmjqXkvJjlhYjot5Hpqaznga/nmoTlr4zmlofmnKzlhoXlrrlcclxuICAgICAqIEBwYXJhbSB0eXBlIOS8mOWFiOe6p+a2iOaBr+exu+WeiyBcclxuICAgICAqIEBwYXJhbSBuYW1lIOeOqeWutuWQjeWtl1xyXG4gICAgICogQHBhcmFtIHBvaW50IOi/lOWIqS/kvaPph5HmlbBcclxuICAgICAqIEByZXR1cm5zIOi/lOWbnui3kemprOeBr+WvjOaWh+acrOWGheWuuVxyXG4gICAgICovXHJcbiAgICBHZXRQcmlvcml0eU1zZyh0eXBlOm51bWJlcixuYW1lOnN0cmluZyxwb2ludDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG1zZ1N0ciA9ICcnXHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ29tbWlUeXBlLkdyb3VwOlxyXG4gICAgICAgICAgICAgICAgbXNnU3RyID0gY2MuanMuZm9ybWF0U3RyKFBhb01hRGVuZ01zZ1RlbXAuQ29tbWlzc2lvbixQYW9NYURlbmdJZGlvbS5Db21taXNzaW9uR3JvdXAsbmFtZSxwb2ludCk7IFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQ29tbWlUeXBlLlNlbGZDb21taTpcclxuICAgICAgICAgICAgICAgIG1zZ1N0ciA9IGNjLmpzLmZvcm1hdFN0cihQYW9NYURlbmdNc2dUZW1wLkNvbW1pc3Npb24sUGFvTWFEZW5nSWRpb20uQ29tbWlzc2lvblNlbGZDb21taSxuYW1lLHBvaW50KTsgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBDb21taVR5cGUuVW5saW1pdGVkOlxyXG4gICAgICAgICAgICAgICAgbXNnU3RyID0gY2MuanMuZm9ybWF0U3RyKFBhb01hRGVuZ01zZ1RlbXAuQ29tbWlzc2lvbixQYW9NYURlbmdJZGlvbS5Db21taXNzaW9uVW5saW1pdGVkLG5hbWUscG9pbnQpOyBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBheVR5cGUuU3lzUGF5VHlwZVZpcDpcclxuICAgICAgICAgICAgICAgIG1zZ1N0ciA9IGNjLmpzLmZvcm1hdFN0cihQYW9NYURlbmdNc2dUZW1wLlJlYmF0ZSxQYW9NYURlbmdJZGlvbS5SZWJhdGVTeXNQYXlUeXBlVmlwLG5hbWUscG9pbnQpOyBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFBheVR5cGUuU3lzUGF5VHlwZVVuaW9uOlxyXG4gICAgICAgICAgICAgICAgbXNnU3RyID0gY2MuanMuZm9ybWF0U3RyKFBhb01hRGVuZ01zZ1RlbXAuUmViYXRlLFBhb01hRGVuZ0lkaW9tLlJlYmF0ZVN5c1N5c1BheVR5cGVVbmlvbixuYW1lLHBvaW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtc2dTdHJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaOkuW6j+aWueazlSzlrZDnsbvlj6/ph43lhplcclxuICAgICAqIEBwYXJhbSBkYXRhQSBcclxuICAgICAqIEBwYXJhbSBkYXRhQiBcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGRhdGFTb3J0RnVuYyhkYXRhQTogYW55LCBkYXRhQjogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGFBLnR5cGUgLSBkYXRhQi50eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg6LeR6ams54Gv5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gZGF0YSB7XHJcbiAgICAgICAgICAgIG1zZyxcclxuICAgICAgICAgICAgdHlwZSxcclxuICAgICAqIH1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFkZE1zZ0l0ZW0oZGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYodGhpcy5ub2RlID09IG51bGwgfHwgIXRoaXMubm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8v57yT5a2Y5pWw6YeP5aSn5LqOMTAg5Lu75L2V5raI5oGv6YO95LiiXHJcbiAgICAgICAgaWYodGhpcy5tc2dEYXRhQ2FjaGVMaXN0Lmxlbmd0aCA+PSB0aGlzLnRvdGFsTGVuZ2hMaW1pdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5b2T5pWw5o2u5aSn5LqOOOaXtu+8jOS8mOWFiOaPkuWFpemrmOS8mOWFiOe6p+aVsOaNrlxyXG4gICAgICAgIGlmKHRoaXMubXNnRGF0YUNhY2hlTGlzdC5sZW5ndGggPj0gdGhpcy5saXN0TGVuZ3RoTGltaXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihkYXRhLmNsaWVudFByaW9yaXR5ICE9IG51bGwgJiYgZGF0YS5jbGllbnRQcmlvcml0eSA9PSAwICYmIGRhdGEubmlja25hbWUgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1zZ0RhdGFDYWNoZUxpc3QucHVzaChkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkRGVmYXV0TXNnKCkge1xyXG4gICAgICAgIGxldCBtc2dMaXN0ID0gW1xyXG4gICAgICAgICAgICB7IG1zZzogUGFvTWFEZW5nTXNnVGVtcC5XZWxjb21lLCB0eXBlOiAxIH0sXHJcbiAgICAgICAgICAgIHsgbXNnOiBQYW9NYURlbmdNc2dUZW1wLlRpcEJhZEdhbWUsIHR5cGU6IDEgfSxcclxuICAgICAgICAgICAgeyBtc2c6IFBhb01hRGVuZ01zZ1RlbXAuTm9XYWxsb3csIHR5cGU6IDEgfSxcclxuICAgICAgICBdXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG1zZ0xpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBtc2dMaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgdGhpcy5hZGRNc2dJdGVtKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBtc2cge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA6IDIwMDAxLFxyXG4gICAgICAgICAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlIDogMCAsIFxyXG4gICAgICAgICAgICAgICAgICAgIG1zZyA6IFwiPGNvbG9yPSNGRjAwMDA+VGVzdERhdGEhISEhISEhISEhISEhITwvY29sb3I+XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRNc2dEYXRhKG1zZzogYW55KSB7XHJcbiAgICAgICAgdGhpcy5hZGRNc2dJdGVtKG1zZy5kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaLvOaOpei1oumSseWvjOaWh+acrOa2iOaBr+WGheWuuVxyXG4gICAgICogQHBhcmFtIHN0clR5cGUg6LWi6ZKx5ri45oiP57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gcGxheWVyTmFtZSDnjqnlrrblkI3lrZdcclxuICAgICAqIEBwYXJhbSBnYW1lTmFtZSDmuLjmiI/lkI3lrZdcclxuICAgICAqIEBwYXJhbSBwcm9maXQg6LWi5b6X55qE56CB5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRNYXJRdWVlU3RyKHN0clR5cGU6IG51bWJlcixwbGF5ZXJOYW1lOnN0cmluZyxnYW1lTmFtZTpzdHJpbmcscHJvZml0OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbXNnU3RyID0gJydcclxuICAgICAgICBsZXQgbGV2ZWwgPSBHbG9iYWwuVG9vbGtpdC5mb3JtYXRQb2ludChwcm9maXQpO1xyXG4gICAgICAgIGxldCBwb2ludCA9IEdsb2JhbC5Ub29sa2l0LkdldE1vbmV5Rm9ybWF0KHByb2ZpdCk7XHJcbiAgICAgICAgc3dpdGNoIChzdHJUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGlmICg1MDAgPD0gbGV2ZWwgJiYgbGV2ZWwgPD0gMTAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1zZ1N0ciA9IGNjLmpzLmZvcm1hdFN0cihQYW9NYURlbmdNc2dUZW1wLkdhbWVzV2luLFBhb01hRGVuZ0lkaW9tLlR5cGUxTGV2ZWwxLHBsYXllck5hbWUsZ2FtZU5hbWUscG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtc2dTdHJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKDEwMDEgPD0gbGV2ZWwgJiYgbGV2ZWwgPD0gMjAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtc2dTdHIgPSBjYy5qcy5mb3JtYXRTdHIoUGFvTWFEZW5nTXNnVGVtcC5HYW1lc1dpbixQYW9NYURlbmdJZGlvbS5UeXBlMUxldmVsMixwbGF5ZXJOYW1lLGdhbWVOYW1lLHBvaW50KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbXNnU3RyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICgyMDAxIDw9IGxldmVsICYmIGxldmVsIDw9IDMwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBtc2dTdHIgPSBjYy5qcy5mb3JtYXRTdHIoUGFvTWFEZW5nTXNnVGVtcC5HYW1lc1dpbixQYW9NYURlbmdJZGlvbS5UeXBlMUxldmVsMyxwbGF5ZXJOYW1lLGdhbWVOYW1lLHBvaW50KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbXNnU3RyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsZXZlbCA+PSAzMDAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNnU3RyID0gY2MuanMuZm9ybWF0U3RyKFBhb01hRGVuZ01zZ1RlbXAuR2FtZXNXaW4sUGFvTWFEZW5nSWRpb20uVHlwZTFMZXZlbDQscGxheWVyTmFtZSxnYW1lTmFtZSxwb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1zZ1N0clxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNnU3RyID0gY2MuanMuZm9ybWF0U3RyKFBhb01hRGVuZ01zZ1RlbXAuR2FtZXNXaW4sUGFvTWFEZW5nSWRpb20uVHlwZTFMZXZlbDAscGxheWVyTmFtZSxnYW1lTmFtZSxwb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1zZ1N0clxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGlmICgxMDAgPD0gbGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBtc2dTdHIgPSBjYy5qcy5mb3JtYXRTdHIoUGFvTWFEZW5nTXNnVGVtcC5HYW1lc1dpbixQYW9NYURlbmdJZGlvbS5UeXBlMkxldmVsMCxwbGF5ZXJOYW1lLGdhbWVOYW1lLHBvaW50KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbXNnU3RyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgaWYgKDEwIDw9IGxldmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNnU3RyID0gY2MuanMuZm9ybWF0U3RyKFBhb01hRGVuZ01zZ1RlbXAuR2FtZXNXaW4sUGFvTWFEZW5nSWRpb20uVHlwZTNMZXZlbDAscGxheWVyTmFtZSxnYW1lTmFtZSxwb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1zZ1N0clxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIGlmICgxMDAgPD0gbGV2ZWwgJiYgbGV2ZWwgPD0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNnU3RyID0gY2MuanMuZm9ybWF0U3RyKFBhb01hRGVuZ01zZ1RlbXAuR2FtZXNXaW4sUGFvTWFEZW5nSWRpb20uVHlwZTRMZXZlbDAscGxheWVyTmFtZSxnYW1lTmFtZSxwb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1zZ1N0clxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoMjAxIDw9IGxldmVsICYmIGxldmVsIDw9IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1zZ1N0ciA9IGNjLmpzLmZvcm1hdFN0cihQYW9NYURlbmdNc2dUZW1wLkdhbWVzV2luLFBhb01hRGVuZ0lkaW9tLlR5cGU0TGV2ZWwxLHBsYXllck5hbWUsZ2FtZU5hbWUscG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtc2dTdHJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKDUwMSA8PSBsZXZlbCAmJiBsZXZlbCA8PSAxMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNnU3RyID0gY2MuanMuZm9ybWF0U3RyKFBhb01hRGVuZ01zZ1RlbXAuR2FtZXNXaW4sUGFvTWFEZW5nSWRpb20uVHlwZTRMZXZlbDIscGxheWVyTmFtZSxnYW1lTmFtZSxwb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1zZ1N0clxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobGV2ZWwgPiAxMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbXNnU3RyID0gY2MuanMuZm9ybWF0U3RyKFBhb01hRGVuZ01zZ1RlbXAuR2FtZXNXaW4sUGFvTWFEZW5nSWRpb20uVHlwZTRMZXZlbDMscGxheWVyTmFtZSxnYW1lTmFtZSxwb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1zZ1N0clxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTovL+aNlemxvOWkp+aImFxyXG4gICAgICAgICAgICAgICAgbXNnU3RyID0gY2MuanMuZm9ybWF0U3RyKFBhb01hRGVuZ01zZ1RlbXAuQnV5dVR5cGUsUGFvTWFEZW5nSWRpb20uVHlwZTVMZXZlbDAscGxheWVyTmFtZSxnYW1lTmFtZSxwb2ludCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbXNnU3RyXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2Oi8v5qyi5LmQ5o2V6bG8XHJcbiAgICAgICAgICAgICAgICBtc2dTdHIgPSBjYy5qcy5mb3JtYXRTdHIoUGFvTWFEZW5nTXNnVGVtcC5CdXl1VHlwZSxQYW9NYURlbmdJZGlvbS5UeXBlNkxldmVsMCxwbGF5ZXJOYW1lLGdhbWVOYW1lLHBvaW50KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtc2dTdHJcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDc6Ly/lpKfpl7nlpKnlrqtcclxuICAgICAgICAgICAgICAgIG1zZ1N0ciA9IGNjLmpzLmZvcm1hdFN0cihQYW9NYURlbmdNc2dUZW1wLkJ1eXVUeXBlLFBhb01hRGVuZ0lkaW9tLlR5cGU3TGV2ZWwwLHBsYXllck5hbWUsZ2FtZU5hbWUscG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1zZ1N0clxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbXNnU3RyXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcbmV4cG9ydCBlbnVtIFBheVR5cGVcclxue1xyXG4gICAgU3lzUGF5VHlwZVZpcCA9IDEsIC8vdmlw5YWF5YC8XHJcbiAgICBTeXNQYXlUeXBlRG93biA9IDIsIC8v57q/5LiK5YWF5YC8XHJcbiAgICBTeXNQYXlUeXBlVW5pb24gPSAzLCAvL+mTtuihjOWNoeWFheWAvFxyXG4gICAgU3lzUGF5VHlwZUdpdmUgPSA0LCAvL+i1oOmAgVxyXG4gICAgU3lzUGF5VHlwZVNtYWxsID0gNSwgLy/lsI/pop3mlK/ku5hcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENvbW1pVHlwZVxyXG57XHJcbiAgICBHcm91cCA9IDIwLCAvL+WboumYn+eojuaUtui/lOS9o1xyXG4gICAgU2VsZkNvbW1pID0gMjUsIC8v6Ieq6JCl56iO5pS26L+U5L2jXHJcbiAgICBVbmxpbWl0ZWQgPSAyNiwgLy/ml6DpmZDku6PkvaPph5FcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFBhb01hRGVuZ01zZ1RlbXB7XHJcbiAgICBXZWxjb21lID0gXCI8Y29sb3I9IzAwZDJGRj7lsIrmlaznmoTnjqnlrrbvvIzmrKLov47ov5vlhaXmuLjmiI/lpKfljoXvvIE8L2NvbG9yPlwiLFxyXG4gICAgVGlwQmFkR2FtZSA9IFwiPGNvbG9yPSNmOWEzMTQ+5oq15Yi25LiN6Imv5ri45oiP77yM5ouS57ud55uX54mI5ri45oiP77yM5rOo5oSP6Ieq6Lqr5L+d5oqk77yM6LCo6Ziy5LiK5b2T5Y+X6aqXPC9jb2xvcj5cIixcclxuICAgIE5vV2FsbG93ID0gXCI8Y29sb3I9I2Y5YTMxND7pgILluqbmuLjmiI/nm4rohJHvvIzmsonov7fmuLjmiI/kvKTouqvvvIzlkIjnkIblronmjpLml7bpl7TvvIzkuqvlj5flgaXlurfnlJ/mtLs8L2NvbG9yPlwiLFxyXG4gICAgR2FtZXNXaW4gPSBcIjxjb2xvcj0jZmZmZmZmPiVz77yB5oGt5Zac546p5a62PC9jb2xvcj48Y29sb3I9IzAwZmYwMD4lczwvY29sb3I+PGNvbG9yPSNmZmZmZmY+5ZyoPC9jb2xvcj48Y29sb3I9IzAwZDJmZj4lczwvY29sb3I+PGNvbG9yPSNmZmZmZmY+5Lit6LWi5b6XPC9jb2xvcj48Y29sb3I9I2ZmZjEwMD4lczwvY29sb3I+PGNvbG9yPSNmZmZmZmY+5YWD77yBPC9jb2xvcj48Y29sb3I9I2ZmZmZmZj7lv6vmnaXlm7Top4LlkKfvvIE8L2NvbG9yPlwiLFxyXG4gICAgUmViYXRlID0gXCI8Y29sb3I9I2ZmZmZmZj4lc++8geeOqeWutjwvY29sb3I+PGNvbG9yPSMwMGZmMDA+JXM8L2NvbG9yPjxjb2xvcj0jZmZmZmZmPumAmui/h+WFrOWPuOWFpeasvuWFheWAvOiOt+W+lzwvY29sb3I+PGNvbG9yPSNmZmYxMDA+JXM8L2NvbG9yPjxjb2xvcj0jZmZmZmZmPuWFgzwvY29sb3I+PGNvbG9yPSNmZmZmZmY+6L+U5Yip77yBPC9jb2xvcj5cIixcclxuICAgIENvbW1pc3Npb24gPSBcIjxjb2xvcj0jZmZmZmZmPiVz77yB546p5a62PC9jb2xvcj48Y29sb3I9IzAwZmYwMD4lczwvY29sb3I+PGNvbG9yPSNmZmZmZmY+6aKG5Y+W5LqGPC9jb2xvcj48Y29sb3I9I2ZmZjEwMD4lczwvY29sb3I+PGNvbG9yPSNmZmZmZmY+5YWDPC9jb2xvcj48Y29sb3I9I2ZmZmZmZj7ku6PnkIbkvaPph5HvvIE8L2NvbG9yPlwiLFxyXG4gICAgQnV5dVR5cGUgPSBcIjxjb2xvcj0jZmZmZmZmPiVz77yB5oGt5Zac546p5a62PC9jb2xvcj48Y29sb3I9IzAwZmYwMD4lczwvY29sb3I+PGNvbG9yPSNmZmZmZmY+5ZyoPC9jb2xvcj48Y29sb3I9IzAwZDJmZj4lczwvY29sb3I+PGNvbG9yPSNmZmZmZmY+5ri45oiP5Lit5Ye75p2AQk9TU+i1ouW+lzwvY29sb3I+PGNvbG9yPSNmZmYxMDA+JXM8L2NvbG9yPjxjb2xvcj0jZmZmZmZmPuWFg++8gTwvY29sb3I+XCJcclxufVxyXG5cclxuZXhwb3J0IGVudW0gUGFvTWFEZW5nSWRpb217XHJcbiAgICBDb21taXNzaW9uR3JvdXAgPSBcIuWkqemBk+mFrOWLpFwiLCAgICAgICAgICAgLy/lm6LpmJ/nqI7mlLbkvaPph5FcclxuICAgIENvbW1pc3Npb25TZWxmQ29tbWkgPSBcIuWkqemBk+mFrOWLpFwiLCAgICAgICAvL+iHquiQpeeojuaUtuS9o+mHkVxyXG4gICAgQ29tbWlzc2lvblVubGltaXRlZCA9IFwi5Zac5LuO5aSp6ZmNXCIsICAgICAgIC8v5peg6ZmQ5Luj5L2j6YeRXHJcbiAgICBSZWJhdGVTeXNQYXlUeXBlVmlwID0gXCLlpKnpmY3mqKrotKJcIiwgICAgICAgLy92aXDlhYXlgLzov5TliKlcclxuICAgIFJlYmF0ZVN5c1N5c1BheVR5cGVVbmlvbiA9IFwi5a6Y5pa56YCB6YeRXCIsICAvL+mTtuihjOWNoeWFheWAvOi/lOWIqVxyXG4gICAgVHlwZTFMZXZlbDAgPSBcIuaBreWWnOWPkei0olwiLCAgIC8vdHlwZTEgPDUwMFxyXG4gICAgVHlwZTFMZXZlbDEgPSBcIum4v+i/kOW9k+WktFwiLCAgIC8vdHlwZTEgNTAwPD0geCA8PTEwMDBcclxuICAgIFR5cGUxTGV2ZWwyID0gXCLlpKflkInlpKfliKlcIiwgICAvL3R5cGUxIDEwMDE8PSB4IDw9IDIwMDBcclxuICAgIFR5cGUxTGV2ZWwzID0gXCLotKLmupDlub/ov5tcIiwgICAvL3R5cGUxIDIwMDE8PSB4IDw9IDMwMDBcclxuICAgIFR5cGUxTGV2ZWw0ID0gXCLlhavmlrnmnaXotKJcIiwgICAvL3R5cGUxID4zMDAxXHJcbiAgICBUeXBlMkxldmVsMCA9IFwi5LiA5Y+R5YWl6a2CXCIsICAgLy90eXBlMiA+PTEwMFxyXG4gICAgVHlwZTNMZXZlbDAgPSBcIum4v+i/kOW9k+WktFwiLCAgIC8vdHlwZTMgPj0xMFxyXG4gICAgVHlwZTRMZXZlbDAgPSBcIuWIneWFpeaxn+a5llwiLCAgIC8vdHlwZTQgMTAwPD0geCA8PTIwMFxyXG4gICAgVHlwZTRMZXZlbDEgPSBcIuWwj+ivleeJm+WIgFwiLCAgIC8vdHlwZTQgMjAxPD0geCA8PTUwMFxyXG4gICAgVHlwZTRMZXZlbDIgPSBcIuWkp+adgOWbm+aWuVwiLCAgIC8vdHlwZTQgNTAxPD0geCA8PTEwMDBcclxuICAgIFR5cGU0TGV2ZWwzID0gXCLni6zlraTmsYLotKVcIiwgICAvL3R5cGU0IHg+MTAwMFxyXG4gICAgVHlwZTVMZXZlbDAgPSBcIuS4gOWHu+WNs+S4rVwiLCAgIC8vdHlwZTUo5o2V6bG857G7KSDmjZXpsbzlpKfmiJggXHJcbiAgICBUeXBlNkxldmVsMCA9IFwi5LiA6ams5b2T5YWIXCIsICAgLy90eXBlNSjmjZXpsbznsbspIOasouS5kOaNlemxvFxyXG4gICAgVHlwZTdMZXZlbDAgPSBcIua0quemj+m9kOWkqVwiICAgIC8vdHlwZTUo5o2V6bG857G7KSDlpKfpl7nlpKnlrqtcclxuXHJcbn1cclxuIl19