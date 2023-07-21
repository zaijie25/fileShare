
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/HallModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2349f8mkR5IHb90m7sg+Sln', 'HallModel');
// hall/scripts/logic/hallcommon/model/HallModel.ts

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
exports.GamePos = exports.webGamePointType = exports.HallRedSpotType = void 0;
var ModelBase_1 = require("../../../framework/model/ModelBase");
var NetEvent_1 = require("../../core/net/hall/NetEvent");
var GlobalEvent_1 = require("../../core/GlobalEvent");
var WndActivityCenter_1 = require("../../hall/ui/Activity/WndActivityCenter");
var Base64Cls_1 = require("../../../framework/libs/Base64Cls");
var WebNative_1 = require("../../../framework/native/WebNative");
var GameData_1 = require("../data/GameData");
var HallRedSpotType;
(function (HallRedSpotType) {
    HallRedSpotType[HallRedSpotType["Rank"] = 0] = "Rank";
    HallRedSpotType[HallRedSpotType["Tixian"] = 1] = "Tixian";
    HallRedSpotType[HallRedSpotType["Bank"] = 2] = "Bank";
    HallRedSpotType[HallRedSpotType["Mail"] = 3] = "Mail";
    HallRedSpotType[HallRedSpotType["Activity"] = 4] = "Activity";
    HallRedSpotType[HallRedSpotType["Kefu"] = 5] = "Kefu";
    HallRedSpotType[HallRedSpotType["Gonggao"] = 6] = "Gonggao";
    // Rebate,
    HallRedSpotType[HallRedSpotType["Spread"] = 7] = "Spread";
    // rechargeGift,
    HallRedSpotType[HallRedSpotType["CashBackDay"] = 8] = "CashBackDay";
    HallRedSpotType[HallRedSpotType["LoginKefu"] = 9] = "LoginKefu";
    HallRedSpotType[HallRedSpotType["WealthKefu"] = 10] = "WealthKefu";
    HallRedSpotType[HallRedSpotType["YunPalyKefu"] = 11] = "YunPalyKefu";
    HallRedSpotType[HallRedSpotType["BonusKefu"] = 12] = "BonusKefu";
    HallRedSpotType[HallRedSpotType["SignActivity"] = 13] = "SignActivity";
    HallRedSpotType[HallRedSpotType["Commision"] = 14] = "Commision";
    HallRedSpotType[HallRedSpotType["DailyGift"] = 15] = "DailyGift";
})(HallRedSpotType = exports.HallRedSpotType || (exports.HallRedSpotType = {}));
var webGamePointType;
(function (webGamePointType) {
    webGamePointType[webGamePointType["TransferSave"] = 0] = "TransferSave";
    webGamePointType[webGamePointType["TransferTake"] = 1] = "TransferTake"; //下分
})(webGamePointType = exports.webGamePointType || (exports.webGamePointType = {}));
var HallModel = /** @class */ (function (_super) {
    __extends(HallModel, _super);
    function HallModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rankRedSpotSwitch = false;
        _this.tixianRedSpotSwitch = false;
        _this.bankRedSpotSwitch = false;
        _this.mailRedSpotSwitch = false;
        _this.activityRedSpotSwitch = false;
        _this.kefuSpotSwitch = false;
        _this.NoticeRedSpot = false;
        // public RebateRedSpot = false;
        _this.SpreadRedSpot = false;
        _this.BonusKefuRedSpot = false;
        _this.WealthKefuRedSpot = false;
        // public RechargeGiftRedSpotActive = false
        _this.signActivitySwitch = false;
        _this.CommisionRedSpotActive = false;
        _this.DailyGiftRedSpotActive = false;
        _this.firstOpenHall = true;
        _this.isShowActivityCenter = false;
        _this.isShowRedEnvelope = false;
        _this.moreGameStatus = false; //大厅显示原始列表还是更多游戏列表状态
        _this.enterGameOffsetX = 0; //大厅进子游戏记录偏移
        _this.gameListKey = -1; //当前大厅游戏列表页签  默认为非有效的-1 避免初始return
        _this.recharge_red = null;
        _this.popupWindowHasUpPoint = false; //外部链接子游戏是否上分状态
        _this.popupWindowGameId = 0; //外部链接子游戏的gameid 
        _this._webGameId = 0; //外接webview游戏id
        _this._webHasUpPoint = false; //外接webview游戏是否上分
        // private _webWindow:Window = null;      //外接子游戏外部窗口
        _this.csNodePos = null; // 财神Node
        //是否需要quaryState
        _this.needQuaryState = true;
        return _this;
    }
    Object.defineProperty(HallModel.prototype, "Name", {
        get: function () {
            return "HallModel";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HallModel.prototype, "webGameId", {
        get: function () {
            return this._webGameId;
        },
        set: function (val) {
            this._webGameId = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HallModel.prototype, "webHasUpPoint", {
        get: function () {
            return this._webHasUpPoint;
        },
        set: function (val) {
            this._webHasUpPoint = val;
        },
        enumerable: false,
        configurable: true
    });
    HallModel.prototype.onInit = function () {
        var _this = this;
        //红点事件监听
        Global.Event.on(GlobalEvent_1.default.ShowRedSpot, this, this.showRedSpot);
        Global.Event.on(GlobalEvent_1.default.CloseRedSpot, this, this.closeRedSpot);
        //web版子游戏(webview形式)上下分
        Global.Event.on(GlobalEvent_1.default.WebUpPoint, this, this.WebUpPoint);
        Global.Event.on(GlobalEvent_1.default.WebDownPoint, this, this.WebDownPoint);
        if (cc.sys.isBrowser) { //监听浏览器是否在当前页面
            document.addEventListener("visibilitychange", function () {
                if (!document.hidden) { //在当前页面
                    if (_this.popupWindowHasUpPoint && _this.popupWindowGameId != 0) { //外部链接子游戏有上分才需要下分
                        _this.popUpGameDownPoint(_this.popupWindowGameId);
                        if (cc.sys.os == cc.sys.OS_IOS && cc.sys.isBrowser) { //下分后将原先的弹窗对象清掉
                            // this._webWindow = null;
                            Global.WebNative.clearWindowMap();
                        }
                    }
                }
            });
        }
    };
    HallModel.prototype.WebUpPoint = function () {
        if (!this.webHasUpPoint) {
            this.requestApplyTopPoint(Game.Control.curGid);
            this.webHasUpPoint = true;
            this.webGameId = Game.Control.curGid;
        }
    };
    HallModel.prototype.WebDownPoint = function () {
        if (this.webHasUpPoint) {
            this.requestApplyDownPoint(Game.Control.curGid);
            this.webHasUpPoint = false;
            this.webGameId = 0;
        }
    };
    /**
     *
     * @param data [1 = 是否需要刷新数据，2 = 按钮枚举]
     */
    HallModel.prototype.showRedSpot = function (data) {
        var redSpotType = data[1];
        switch (redSpotType) {
            case HallRedSpotType.Rank:
                {
                    this.rankRedSpotSwitch = true;
                    break;
                }
            case HallRedSpotType.Tixian:
                {
                    this.tixianRedSpotSwitch = true;
                    break;
                }
            // case HallRedSpotType.Bank:
            //     {
            //         this.bankRedSpotSwitch = true;
            //         break;
            //     }
            case HallRedSpotType.Mail:
                {
                    this.mailRedSpotSwitch = true;
                    break;
                }
            case HallRedSpotType.Gonggao:
                {
                    this.mailRedSpotSwitch = true;
                    break;
                }
            case HallRedSpotType.Activity:
                {
                    this.NoticeRedSpot = true;
                    break;
                }
            case HallRedSpotType.Kefu:
                {
                    this.kefuSpotSwitch = true;
                    break;
                }
            // case HallRedSpotType.Gonggao:
            // {
            //     this.NoticeRedSpot = true;
            //     break;
            // }
            // case HallRedSpotType.Rebate:
            // {
            //     this.RebateRedSpot = true;   
            //     break;
            // }
            case HallRedSpotType.Spread:
                {
                    this.SpreadRedSpot = true;
                    break;
                }
            case HallRedSpotType.WealthKefu:
                {
                    this.WealthKefuRedSpot = true;
                    break;
                }
            case HallRedSpotType.BonusKefu:
                {
                    this.BonusKefuRedSpot = true;
                    break;
                }
            case HallRedSpotType.Commision:
                {
                    this.CommisionRedSpotActive = true;
                    break;
                }
            case HallRedSpotType.SignActivity:
                {
                    this.signActivitySwitch = true;
                    break;
                }
            case HallRedSpotType.DailyGift:
                {
                    this.DailyGiftRedSpotActive = true;
                    break;
                }
        }
        this.event("UpdateResSpot", redSpotType);
    };
    HallModel.prototype.closeRedSpot = function (redSpotType) {
        switch (redSpotType) {
            case HallRedSpotType.Rank:
                {
                    this.rankRedSpotSwitch = false;
                    break;
                }
            case HallRedSpotType.Tixian:
                {
                    this.tixianRedSpotSwitch = false;
                    break;
                }
            // case HallRedSpotType.Bank:
            //     {
            //         this.bankRedSpotSwitch = false;
            //         break;
            //     }
            case HallRedSpotType.Gonggao:
            case HallRedSpotType.Mail:
                {
                    this.mailRedSpotSwitch = false;
                    break;
                }
            case HallRedSpotType.Activity:
                {
                    this.NoticeRedSpot = false;
                    break;
                }
            case HallRedSpotType.Kefu:
                {
                    this.kefuSpotSwitch = false;
                    break;
                }
            // case HallRedSpotType.Gonggao:
            // {
            //     this.NoticeRedSpot = false;
            //     break;
            // }
            // case HallRedSpotType.Rebate:
            // {
            //     this.RebateRedSpot = false;   
            //     break;
            // }
            case HallRedSpotType.Spread:
                {
                    this.SpreadRedSpot = false;
                    break;
                }
            case HallRedSpotType.WealthKefu:
                {
                    this.WealthKefuRedSpot = false;
                    break;
                }
            case HallRedSpotType.BonusKefu:
                {
                    this.BonusKefuRedSpot = false;
                    break;
                }
            case HallRedSpotType.Commision:
                {
                    this.CommisionRedSpotActive = false;
                    break;
                }
            case HallRedSpotType.SignActivity:
                {
                    this.signActivitySwitch = false;
                    break;
                }
            case HallRedSpotType.DailyGift:
                {
                    this.DailyGiftRedSpotActive = false;
                    break;
                }
        }
        this.event("UpdateResSpot", redSpotType);
    };
    HallModel.prototype.reqQueryState = function () {
        var _this = this;
        this.needQuaryState = false;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.QuaryState, {}, function (msg) {
            if (msg.locks == null || msg.locks.length == 0)
                return;
            //在游戏场景中不处理quaryState
            if (Global.SceneManager.inGame())
                return;
            //重新请求进入游戏
            var locker = msg.locks[0];
            _this.rebackGame(locker);
        });
    };
    /**
     * 重返游戏
     *
    */
    HallModel.prototype.rebackGame = function (locker) {
        var _this = this;
        if (!locker) {
            Logger.error("locker = null");
            return;
        }
        if (locker.ret == 1 && locker._gid) {
            var defalutStr = "当前正在游戏中，是否回到游戏?";
            var gid_1 = locker._gid;
            var gameData = Global.GameData.getGameInfo(gid_1);
            if (gameData && gameData.gtype == 8) {
                if (gameData.name) {
                    defalutStr = "您正在【" + gameData.name + "】游戏中，金币暂扣，是否需要重新进入游戏？";
                }
                Global.UI.showYesNoBox(defalutStr, function () {
                    _this.requestApplyEnterGame(gid_1);
                });
            }
            else {
                var str = Global.GameData.getReturnGameStr(locker._gid, locker._glv, true);
                Global.UI.showYesNoBox(str || defalutStr, function () {
                    Game.Control.goToGameByLocker(locker);
                });
            }
        }
    };
    HallModel.prototype.requestGetRewardPackCount = function () {
        var _this = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetRewardPackCount, {}, function (retObj) {
            if (retObj && retObj.list && retObj.list.length > 0 && !_this.isShowRedEnvelope) {
                var data_1 = retObj.list[0];
                _this.isShowRedEnvelope = true;
                Global.UI.show("WndRedEnvelope", data_1, function () {
                    Global.UI.show("WndRebateGet", data_1.point, null, function () {
                        _this.isShowRedEnvelope = false;
                        _this.requestGetRewardPackCount();
                    });
                });
            }
        }, function (error) {
            // Global.UI.fastTip(error._errstr);
        }, false);
    };
    HallModel.prototype.requestMyActivityList = function (callback) {
        if (callback === void 0) { callback = null; }
        Global.HallServer.send(NetEvent_1.NetAppface.mod, "GetMyActivityList", {}, function (data) {
            //成功
            var serverInfo = data.activity_list;
            if (serverInfo.length > 0) {
                var actMap = new Map();
                var activity_red = false; //小红点状态
                for (var i = 0; i < serverInfo.length; i++) {
                    var ptype = serverInfo[i].ptype;
                    //屏蔽每日充值红包-16 3日签到-11 每日返利-7 首充 返利-8 每日礼金-18
                    if (!ptype) { //活动中心只显示线下活动
                        continue;
                    }
                    var infoData = serverInfo[i];
                    var entity = new WndActivityCenter_1.ActivityEntity();
                    for (var key in entity) {
                        if (infoData[key] != null && infoData[key] != undefined) {
                            entity[key] = infoData[key];
                        }
                        entity.red_status = infoData['satus'] == 1 ? 0 : -1; //红点状态
                    }
                    if (!activity_red) { //右上角活动红点
                        activity_red = activity_red || (infoData.satus === 1);
                    }
                    actMap.set(entity.atype, entity);
                }
                if (activity_red) {
                    Global.Event.event(GlobalEvent_1.default.ShowRedSpot, [false, HallRedSpotType.Activity]);
                }
                if (callback) {
                    callback(actMap);
                }
            }
        }.bind(this), function (data) {
            //失败
            Logger.error("HallModel GetMyActivityList failed");
        }.bind(this), false);
    };
    HallModel.prototype.requestApplyEnterGame = function (gid) {
        var _this = this;
        Game.Control.curGid = gid;
        var gameInfo = Global.GameData.getGameInfo(gid);
        var gameType = gameInfo ? gameInfo.gameType : -1;
        var params = { "gid": gid };
        if (cc.sys.isBrowser && cc.sys.os == cc.sys.OS_IOS) { //ios新页面无法在异步回调中open(ios会视为骚扰弹窗默认进行屏蔽),因此需要在此先打开空白页面之后请求成功后重定向
            if (this.needPopUpWindow(gid)) {
                // this._webWindow = window.open("","_blank");
                Global.WebNative.initWindow(WebNative_1.WindowKeyType.GameWin);
            }
        }
        if (gameType === GameData_1.GameType.WEBGAME) {
            Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.ApplyEnterGame, params, function (data) {
                //正常拿到url
                if (data && data.url) {
                    var url = data.url;
                    //actionViewHidden  是否隐藏原生功能按钮 0是不隐藏，1是隐藏
                    var actionViewHidden = "1";
                    var scheme = "";
                    if (actionViewHidden == "1") {
                        url = Global.UrlUtil.replaceUrlParmVal(data.url, "return_url", Base64Cls_1.default.encode("gohall://gohall.com"));
                        scheme = "gohall";
                    }
                    else {
                        url = Global.UrlUtil.replaceUrlParmVal(data.url, "return_type", 1);
                    }
                    if (url) {
                        if (Global.Setting.resServerUrl) {
                            var logoUrl = Global.Setting.resServerUrl + "/logo/" + gid + ".png?" + (new Date()).valueOf();
                            Logger.error("logo url = " + logoUrl);
                            url += "&is_app=1&logo_type=1&logo_url=" + Base64Cls_1.default.encode(logoUrl);
                        }
                        else {
                            url += "&is_app=1";
                        }
                        Logger.error("HallModel requestApplyEnterGame base64 url " + url);
                        Global.Event.event(GlobalEvent_1.default.OpenWebViewGame, url, scheme, actionViewHidden);
                    }
                }
                else {
                    //重新请求进入游戏
                    if (data.locks && data.locks.length > 0) {
                        var locker = data.locks[0];
                        _this.rebackGame(locker);
                    }
                }
            }, null, true);
        }
        else if (gameType === GameData_1.GameType.AGBG) {
            Global.HallServer.send(NetEvent_1.NetAppface.gameAgent, NetEvent_1.NetAppface.EnterGame, params, function (data) {
                //正常拿到url
                if (data && data.url) {
                    var url = encodeURI(data.url);
                    //actionViewHidden  是否隐藏原生功能按钮 0是不隐藏，1是隐藏
                    var actionViewHidden = "0";
                    var scheme = "";
                    if (actionViewHidden == "1") {
                        url = Global.UrlUtil.replaceUrlParmVal(data.url, "return_url", Base64Cls_1.default.encode("gohall://gohall.com"));
                        scheme = "gohall";
                    }
                    else {
                        url = Global.UrlUtil.replaceUrlParmVal(data.url, "return_type", 1);
                    }
                    Logger.log("跳转url", url, gid);
                    if (_this.needPopUpWindow(gid)) { //判断是否需要弹出新页面
                        _this.popUpGameWindow(gid, url);
                    }
                    else {
                        Global.Event.event(GlobalEvent_1.default.OpenWebViewGame, url, scheme, actionViewHidden, gid);
                    }
                }
                else {
                    Logger.log("跳转url", "获取失败", gid);
                    //重新请求进入游戏
                    if (data.locks && data.locks.length > 0) {
                        var locker = data.locks[0];
                        _this.rebackGame(locker);
                    }
                }
            }, null, true);
        }
    };
    /**
     * 判断是否需要用popup形式打开
     * @param gid 游戏id
     * ios下大部分外接游戏都需要以新页签的形式打开，无法用webview
     */
    HallModel.prototype.needPopUpWindow = function (gid) {
        if (!cc.sys.isBrowser) {
            return false;
        }
        // if(gid == 9061 || gid == 9062 || gid == 9063 || gid == 9064){   //AG所有视讯
        //     return true;
        // }
        if (CC_DEV) {
            return false;
        }
        if (gid == 9031 || gid == 9001) { //CMD体育与SHABA一定调外部链接
            return true;
        }
        if (cc.sys.os == cc.sys.OS_ANDROID) {
            return false;
        }
        if (cc.sys.os == cc.sys.OS_IOS) { //ios情况下以下游戏也跳转外部链接
            if (gid == 9065 || gid == 9066 || gid == 9067 || gid == 9068 || gid == 9069 || gid == 9070) { //AG所有老虎机
                return true;
            }
            if (gid == 9061 || gid == 9062 || gid == 9063 || gid == 9064) { //AG所有视讯
                return true;
            }
        }
        return false;
    };
    /**
     * 某些外部子游戏需要跳外部链接访问(先上分再跳外部链接)
     * @param gid 游戏id
     * @param url 外部游戏链接
     */
    HallModel.prototype.popUpGameWindow = function (gid, url) {
        var _this = this;
        if (this.popupWindowHasUpPoint)
            return;
        var params = {
            "gid": gid,
            "action": 1
        };
        Global.HallServer.send(NetEvent_1.NetAppface.gameAgent, NetEvent_1.NetAppface.TransferSave, params, function (data) {
            Logger.error("popUpGame requestApplyTopPoint success");
            _this.popupWindowHasUpPoint = true;
            _this.popupWindowGameId = gid;
            if (cc.sys.os == cc.sys.OS_IOS) {
                Global.WebNative.openWindowByKey(WebNative_1.WindowKeyType.GameWin, url);
                // this._webWindow.location.href = url;
                // console.log("点击:新页面形式",url)
                // let linkA:HTMLAnchorElement = document.createElement("a");
                // linkA.href = url;
                // linkA.target = "_blank";
                // linkA.click();
            }
            else {
                window.open(url);
            }
        }, function () {
            Logger.error("popUpGame requestApplyTopPoint failed");
        }, true);
    };
    /**
     * 跳外部链接子游戏下分
     * @param gameid 游戏id
     */
    HallModel.prototype.popUpGameDownPoint = function (gameid) {
        var _this = this;
        var params = {
            "gid": gameid,
            "action": 0
        };
        Global.HallServer.send(NetEvent_1.NetAppface.gameAgent, NetEvent_1.NetAppface.TransferTake, params, function (data) {
            _this.popupWindowHasUpPoint = false;
            _this.popupWindowGameId = 0;
            Logger.error("popUpGame requestApplyDownPoint success");
        }, function () {
            Logger.error("popUpGame requestApplyDownPoint failed");
        }, true);
    };
    HallModel.prototype.requestApplyTopPoint = function (gameid) {
        var gameInfo = Global.GameData.getGameInfo(gameid);
        var gameType = gameInfo ? gameInfo.gameType : -1;
        if (gameType === GameData_1.GameType.WEBGAME) {
            var params = {};
            Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.ApplyTopPoint, params, function (data) {
                Logger.error("HallModel requestApplyTopPoint success");
            }, function () {
                Logger.error("HallModel requestApplyTopPoint failed");
            }, true);
        }
        else {
            var params = {
                "gid": gameid,
                "action": 1
            };
            Global.HallServer.send(NetEvent_1.NetAppface.gameAgent, NetEvent_1.NetAppface.TransferSave, params, function (data) {
                Logger.error("HallModel requestApplyTopPoint success");
            }, function () {
                Logger.error("HallModel requestApplyTopPoint failed");
            }, true);
        }
    };
    HallModel.prototype.requestApplyDownPoint = function (gameid) {
        var gameInfo = Global.GameData.getGameInfo(gameid);
        var gameType = gameInfo ? gameInfo.gameType : -1;
        if (gameType === GameData_1.GameType.WEBGAME) {
            var params = {};
            Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.ApplyDownPoint, params, function (data) {
                Logger.error("HallModel requestApplyDownPoint success");
            }, function () {
                Logger.error("HallModel requestApplyDownPoint failed");
            }, true);
        }
        else {
            var params = {
                "gid": gameid,
                "action": 0
            };
            Global.HallServer.send(NetEvent_1.NetAppface.gameAgent, NetEvent_1.NetAppface.TransferTake, params, function (data) {
                Logger.error("HallModel requestApplyDownPoint success");
            }, function () {
                Logger.error("HallModel requestApplyDownPoint failed");
            }, true);
        }
    };
    //大厅游戏列表显示状态
    HallModel.prototype.setMoreGameStatus = function (val) {
        this.moreGameStatus = val;
    };
    //记录大厅进子游戏记录偏移
    HallModel.prototype.setEnterGameOffsetX = function (val) {
        this.enterGameOffsetX = val;
    };
    HallModel.prototype.setGameListKey = function (key) {
        this.gameListKey = key;
    };
    HallModel.prototype.clear = function () {
        this.needQuaryState = true;
        this.firstOpenHall = true;
        this.DailyGiftRedSpotActive = false;
        Global.GameData.dataInitFinish = false;
    };
    return HallModel;
}(ModelBase_1.default));
exports.default = HallModel;
var GamePos;
(function (GamePos) {
    GamePos[GamePos["Popular"] = 0] = "Popular";
    GamePos[GamePos["Poker"] = 1] = "Poker";
    GamePos[GamePos["Games"] = 2] = "Games";
    GamePos[GamePos["Video"] = 3] = "Video";
    GamePos[GamePos["Fishing"] = 4] = "Fishing";
    GamePos[GamePos["Sports"] = 5] = "Sports";
    GamePos[GamePos["Lottery"] = 6] = "Lottery";
})(GamePos = exports.GamePos || (exports.GamePos = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxIYWxsTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUEyRDtBQUMzRCx5REFBMEQ7QUFDMUQsc0RBQWlEO0FBQ2pELDhFQUEwRTtBQUMxRSwrREFBMEQ7QUFDMUQsaUVBQW9FO0FBQ3BFLDZDQUE0QztBQUc1QyxJQUFZLGVBbUJYO0FBbkJELFdBQVksZUFBZTtJQUN2QixxREFBSSxDQUFBO0lBQ0oseURBQU0sQ0FBQTtJQUNOLHFEQUFJLENBQUE7SUFDSixxREFBSSxDQUFBO0lBQ0osNkRBQVEsQ0FBQTtJQUNSLHFEQUFJLENBQUE7SUFDSiwyREFBTyxDQUFBO0lBQ1AsVUFBVTtJQUNWLHlEQUFNLENBQUE7SUFDTixnQkFBZ0I7SUFDaEIsbUVBQVcsQ0FBQTtJQUNYLCtEQUFTLENBQUE7SUFDVCxrRUFBVSxDQUFBO0lBQ1Ysb0VBQVcsQ0FBQTtJQUNYLGdFQUFTLENBQUE7SUFDVCxzRUFBWSxDQUFBO0lBQ1osZ0VBQVMsQ0FBQTtJQUNULGdFQUFTLENBQUE7QUFDYixDQUFDLEVBbkJXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBbUIxQjtBQUVELElBQVksZ0JBR1g7QUFIRCxXQUFZLGdCQUFnQjtJQUN4Qix1RUFBZ0IsQ0FBQTtJQUNoQix1RUFBZ0IsQ0FBQSxDQUFJLElBQUk7QUFDNUIsQ0FBQyxFQUhXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBRzNCO0FBRUQ7SUFBdUMsNkJBQVM7SUFBaEQ7UUFBQSxxRUE0bUJDO1FBdm1CVSx1QkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIseUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQzVCLHVCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQix1QkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsMkJBQXFCLEdBQUcsS0FB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QUFDO0lBQ0QsWUFBWTtJQUNMLHFDQUFpQixHQUF4QixVQUF5QixHQUFZO1FBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO0lBQzlCLENBQUM7SUFFRCxjQUFjO0lBQ1AsdUNBQW1CLEdBQTFCLFVBQTJCLEdBQVc7UUFDbEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztJQUNoQyxDQUFDO0lBQ00sa0NBQWMsR0FBckIsVUFBc0IsR0FBVztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUMzQixDQUFDO0lBRU0seUJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFDcEMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFBO0lBQzFDLENBQUM7SUFDTCxnQkFBQztBQUFELENBNW1CQSxBQTRtQkMsQ0E1bUJzQyxtQkFBUyxHQTRtQi9DOztBQUNELElBQVksT0FRWDtBQVJELFdBQVksT0FBTztJQUNmLDJDQUFXLENBQUE7SUFDWCx1Q0FBUyxDQUFBO0lBQ1QsdUNBQVMsQ0FBQTtJQUNULHVDQUFTLENBQUE7SUFDVCwyQ0FBVyxDQUFBO0lBQ1gseUNBQVUsQ0FBQTtJQUNWLDJDQUFXLENBQUE7QUFDZixDQUFDLEVBUlcsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBUWxCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsQmFzZSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL21vZGVsL01vZGVsQmFzZVwiO1xyXG5pbXBvcnQgeyBOZXRBcHBmYWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvbmV0L2hhbGwvTmV0RXZlbnRcIjtcclxuaW1wb3J0IEdsb2JhbEV2ZW50IGZyb20gXCIuLi8uLi9jb3JlL0dsb2JhbEV2ZW50XCI7XHJcbmltcG9ydCB7IEFjdGl2aXR5RW50aXR5IH0gZnJvbSBcIi4uLy4uL2hhbGwvdWkvQWN0aXZpdHkvV25kQWN0aXZpdHlDZW50ZXJcIjtcclxuaW1wb3J0IEJhc2U2NENscyBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL2xpYnMvQmFzZTY0Q2xzXCI7XHJcbmltcG9ydCB7IFdpbmRvd0tleVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vZnJhbWV3b3JrL25hdGl2ZS9XZWJOYXRpdmVcIjtcclxuaW1wb3J0IHsgR2FtZVR5cGUgfSBmcm9tIFwiLi4vZGF0YS9HYW1lRGF0YVwiO1xyXG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiYXN5bmNcIjtcclxuXHJcbmV4cG9ydCBlbnVtIEhhbGxSZWRTcG90VHlwZSB7XHJcbiAgICBSYW5rLFxyXG4gICAgVGl4aWFuLFxyXG4gICAgQmFuayxcclxuICAgIE1haWwsXHJcbiAgICBBY3Rpdml0eSxcclxuICAgIEtlZnUsXHJcbiAgICBHb25nZ2FvLFxyXG4gICAgLy8gUmViYXRlLFxyXG4gICAgU3ByZWFkLFxyXG4gICAgLy8gcmVjaGFyZ2VHaWZ0LFxyXG4gICAgQ2FzaEJhY2tEYXksXHJcbiAgICBMb2dpbktlZnUsIC8v55m76ZmG5a6i5pyNXHJcbiAgICBXZWFsdGhLZWZ1LCAvL+i0ouWvjOWSqOivolxyXG4gICAgWXVuUGFseUtlZnUsIC8v5LqR6Zeq5LuYXHJcbiAgICBCb251c0tlZnUsIC8v5b2p6YeR5a6i5pyNXHJcbiAgICBTaWduQWN0aXZpdHksLy/nrb7liLDpgIHph5FcclxuICAgIENvbW1pc2lvbiwvL+S7u+WKoeezu+e7n1xyXG4gICAgRGFpbHlHaWZ0LC8v5q+P5pel56S86YeRXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIHdlYkdhbWVQb2ludFR5cGUge1xyXG4gICAgVHJhbnNmZXJTYXZlID0gMCwgICAvL+S4iuWIhlxyXG4gICAgVHJhbnNmZXJUYWtlID0gMSAgICAvL+S4i+WIhlxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYWxsTW9kZWwgZXh0ZW5kcyBNb2RlbEJhc2Uge1xyXG4gICAgcHVibGljIGdldCBOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiBcIkhhbGxNb2RlbFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByYW5rUmVkU3BvdFN3aXRjaCA9IGZhbHNlO1xyXG4gICAgcHVibGljIHRpeGlhblJlZFNwb3RTd2l0Y2ggPSBmYWxzZTtcclxuICAgIHB1YmxpYyBiYW5rUmVkU3BvdFN3aXRjaCA9IGZhbHNlO1xyXG4gICAgcHVibGljIG1haWxSZWRTcG90U3dpdGNoID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgYWN0aXZpdHlSZWRTcG90U3dpdGNoID0gZmFsc2U7XHJcbiAgICBwdWJsaWMga2VmdVNwb3RTd2l0Y2ggPSBmYWxzZTtcclxuICAgIHB1YmxpYyBOb3RpY2VSZWRTcG90ID0gZmFsc2U7XHJcbiAgICAvLyBwdWJsaWMgUmViYXRlUmVkU3BvdCA9IGZhbHNlO1xyXG4gICAgcHVibGljIFNwcmVhZFJlZFNwb3QgPSBmYWxzZVxyXG4gICAgcHVibGljIEJvbnVzS2VmdVJlZFNwb3QgPSBmYWxzZVxyXG4gICAgcHVibGljIFdlYWx0aEtlZnVSZWRTcG90ID0gZmFsc2VcclxuICAgIC8vIHB1YmxpYyBSZWNoYXJnZUdpZnRSZWRTcG90QWN0aXZlID0gZmFsc2VcclxuICAgIHB1YmxpYyBzaWduQWN0aXZpdHlTd2l0Y2ggPSBmYWxzZVxyXG4gICAgcHVibGljIENvbW1pc2lvblJlZFNwb3RBY3RpdmUgPSBmYWxzZVxyXG4gICAgcHVibGljIERhaWx5R2lmdFJlZFNwb3RBY3RpdmUgPSBmYWxzZVxyXG5cclxuICAgIHB1YmxpYyBmaXJzdE9wZW5IYWxsID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBpc1Nob3dBY3Rpdml0eUNlbnRlciA9IGZhbHNlO1xyXG4gICAgcHVibGljIGlzU2hvd1JlZEVudmVsb3BlID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgbW9yZUdhbWVTdGF0dXM6IGJvb2xlYW4gPSBmYWxzZTsgLy/lpKfljoXmmL7npLrljp/lp4vliJfooajov5jmmK/mm7TlpJrmuLjmiI/liJfooajnirbmgIFcclxuICAgIHB1YmxpYyBlbnRlckdhbWVPZmZzZXRYOiBudW1iZXIgPSAwOy8v5aSn5Y6F6L+b5a2Q5ri45oiP6K6w5b2V5YGP56e7XHJcbiAgICBwdWJsaWMgZ2FtZUxpc3RLZXk6IG51bWJlciA9IC0xOyAgICAvL+W9k+WJjeWkp+WOhea4uOaIj+WIl+ihqOmhteetviAg6buY6K6k5Li66Z2e5pyJ5pWI55qELTEg6YG/5YWN5Yid5aeLcmV0dXJuXHJcbiAgICBwdWJsaWMgcmVjaGFyZ2VfcmVkID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHBvcHVwV2luZG93SGFzVXBQb2ludCA9IGZhbHNlOy8v5aSW6YOo6ZO+5o6l5a2Q5ri45oiP5piv5ZCm5LiK5YiG54q25oCBXHJcbiAgICBwcml2YXRlIHBvcHVwV2luZG93R2FtZUlkOiBudW1iZXIgPSAwOyAvL+WklumDqOmTvuaOpeWtkOa4uOaIj+eahGdhbWVpZCBcclxuXHJcbiAgICBwcml2YXRlIF93ZWJHYW1lSWQ6IG51bWJlciA9IDA7ICAgICAgLy/lpJbmjqV3ZWJ2aWV35ri45oiPaWRcclxuICAgIHByaXZhdGUgX3dlYkhhc1VwUG9pbnQ6IGJvb2xlYW4gPSBmYWxzZTsgICAgIC8v5aSW5o6ld2Vidmlld+a4uOaIj+aYr+WQpuS4iuWIhlxyXG4gICAgLy8gcHJpdmF0ZSBfd2ViV2luZG93OldpbmRvdyA9IG51bGw7ICAgICAgLy/lpJbmjqXlrZDmuLjmiI/lpJbpg6jnqpflj6NcclxuICAgIHB1YmxpYyBjc05vZGVQb3M6Y2MuTm9kZSA9IG51bGw7ICAgIC8vIOi0ouelnk5vZGVcclxuXHJcbiAgICBwdWJsaWMgc2V0IHdlYkdhbWVJZCh2YWwpIHtcclxuICAgICAgICB0aGlzLl93ZWJHYW1lSWQgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB3ZWJHYW1lSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlYkdhbWVJZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHdlYkhhc1VwUG9pbnQodmFsKSB7XHJcbiAgICAgICAgdGhpcy5fd2ViSGFzVXBQb2ludCA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHdlYkhhc1VwUG9pbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlYkhhc1VwUG9pbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uSW5pdCgpIHtcclxuICAgICAgICAvL+e6oueCueS6i+S7tuebkeWQrFxyXG4gICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5TaG93UmVkU3BvdCwgdGhpcywgdGhpcy5zaG93UmVkU3BvdCk7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LkNsb3NlUmVkU3BvdCwgdGhpcywgdGhpcy5jbG9zZVJlZFNwb3QpO1xyXG4gICAgICAgIC8vd2Vi54mI5a2Q5ri45oiPKHdlYnZpZXflvaLlvI8p5LiK5LiL5YiGXHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LldlYlVwUG9pbnQsIHRoaXMsIHRoaXMuV2ViVXBQb2ludCk7XHJcbiAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LldlYkRvd25Qb2ludCwgdGhpcywgdGhpcy5XZWJEb3duUG9pbnQpXHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc0Jyb3dzZXIpIHsgICAgICAgICAgIC8v55uR5ZCs5rWP6KeI5Zmo5piv5ZCm5Zyo5b2T5YmN6aG16Z2iXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZG9jdW1lbnQuaGlkZGVuKSB7ICAgLy/lnKjlvZPliY3pobXpnaJcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wb3B1cFdpbmRvd0hhc1VwUG9pbnQgJiYgdGhpcy5wb3B1cFdpbmRvd0dhbWVJZCAhPSAwKSB7ICAgICAvL+WklumDqOmTvuaOpeWtkOa4uOaIj+acieS4iuWIhuaJjemcgOimgeS4i+WIhlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcFVwR2FtZURvd25Qb2ludCh0aGlzLnBvcHVwV2luZG93R2FtZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TICYmIGNjLnN5cy5pc0Jyb3dzZXIpIHsgLy/kuIvliIblkI7lsIbljp/lhYjnmoTlvLnnqpflr7nosaHmuIXmjolcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX3dlYldpbmRvdyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuV2ViTmF0aXZlLmNsZWFyV2luZG93TWFwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFdlYlVwUG9pbnQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLndlYkhhc1VwUG9pbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0QXBwbHlUb3BQb2ludChHYW1lLkNvbnRyb2wuY3VyR2lkKTtcclxuICAgICAgICAgICAgdGhpcy53ZWJIYXNVcFBvaW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy53ZWJHYW1lSWQgPSBHYW1lLkNvbnRyb2wuY3VyR2lkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgV2ViRG93blBvaW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLndlYkhhc1VwUG9pbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0QXBwbHlEb3duUG9pbnQoR2FtZS5Db250cm9sLmN1ckdpZCk7XHJcbiAgICAgICAgICAgIHRoaXMud2ViSGFzVXBQb2ludCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLndlYkdhbWVJZCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBkYXRhIFsxID0g5piv5ZCm6ZyA6KaB5Yi35paw5pWw5o2u77yMMiA9IOaMiemSruaemuS4vl1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzaG93UmVkU3BvdChkYXRhKSB7XHJcbiAgICAgICAgbGV0IHJlZFNwb3RUeXBlID0gZGF0YVsxXVxyXG4gICAgICAgIHN3aXRjaCAocmVkU3BvdFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBIYWxsUmVkU3BvdFR5cGUuUmFuazpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJhbmtSZWRTcG90U3dpdGNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBIYWxsUmVkU3BvdFR5cGUuVGl4aWFuOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGl4aWFuUmVkU3BvdFN3aXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNhc2UgSGFsbFJlZFNwb3RUeXBlLkJhbms6XHJcbiAgICAgICAgICAgIC8vICAgICB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhpcy5iYW5rUmVkU3BvdFN3aXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgSGFsbFJlZFNwb3RUeXBlLk1haWw6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWlsUmVkU3BvdFN3aXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgSGFsbFJlZFNwb3RUeXBlLkdvbmdnYW86XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWlsUmVkU3BvdFN3aXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgSGFsbFJlZFNwb3RUeXBlLkFjdGl2aXR5OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTm90aWNlUmVkU3BvdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgSGFsbFJlZFNwb3RUeXBlLktlZnU6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZWZ1U3BvdFN3aXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNhc2UgSGFsbFJlZFNwb3RUeXBlLkdvbmdnYW86XHJcbiAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuTm90aWNlUmVkU3BvdCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBjYXNlIEhhbGxSZWRTcG90VHlwZS5SZWJhdGU6XHJcbiAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuUmViYXRlUmVkU3BvdCA9IHRydWU7ICAgXHJcbiAgICAgICAgICAgIC8vICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBjYXNlIEhhbGxSZWRTcG90VHlwZS5TcHJlYWQ6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5TcHJlYWRSZWRTcG90ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBIYWxsUmVkU3BvdFR5cGUuV2VhbHRoS2VmdTpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLldlYWx0aEtlZnVSZWRTcG90ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBIYWxsUmVkU3BvdFR5cGUuQm9udXNLZWZ1OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQm9udXNLZWZ1UmVkU3BvdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgSGFsbFJlZFNwb3RUeXBlLkNvbW1pc2lvbjpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbW1pc2lvblJlZFNwb3RBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEhhbGxSZWRTcG90VHlwZS5TaWduQWN0aXZpdHk6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaWduQWN0aXZpdHlTd2l0Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEhhbGxSZWRTcG90VHlwZS5EYWlseUdpZnQ6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5EYWlseUdpZnRSZWRTcG90QWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXZlbnQoXCJVcGRhdGVSZXNTcG90XCIsIHJlZFNwb3RUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VSZWRTcG90KHJlZFNwb3RUeXBlKSB7XHJcbiAgICAgICAgc3dpdGNoIChyZWRTcG90VHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIEhhbGxSZWRTcG90VHlwZS5SYW5rOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmFua1JlZFNwb3RTd2l0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBIYWxsUmVkU3BvdFR5cGUuVGl4aWFuOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGl4aWFuUmVkU3BvdFN3aXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjYXNlIEhhbGxSZWRTcG90VHlwZS5CYW5rOlxyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoaXMuYmFua1JlZFNwb3RTd2l0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgY2FzZSBIYWxsUmVkU3BvdFR5cGUuR29uZ2dhbzpcclxuICAgICAgICAgICAgY2FzZSBIYWxsUmVkU3BvdFR5cGUuTWFpbDpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1haWxSZWRTcG90U3dpdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgSGFsbFJlZFNwb3RUeXBlLkFjdGl2aXR5OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTm90aWNlUmVkU3BvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEhhbGxSZWRTcG90VHlwZS5LZWZ1OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2VmdVNwb3RTd2l0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY2FzZSBIYWxsUmVkU3BvdFR5cGUuR29uZ2dhbzpcclxuICAgICAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5Ob3RpY2VSZWRTcG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAvLyBjYXNlIEhhbGxSZWRTcG90VHlwZS5SZWJhdGU6XHJcbiAgICAgICAgICAgIC8vIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuUmViYXRlUmVkU3BvdCA9IGZhbHNlOyAgIFxyXG4gICAgICAgICAgICAvLyAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgY2FzZSBIYWxsUmVkU3BvdFR5cGUuU3ByZWFkOlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuU3ByZWFkUmVkU3BvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEhhbGxSZWRTcG90VHlwZS5XZWFsdGhLZWZ1OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuV2VhbHRoS2VmdVJlZFNwb3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBIYWxsUmVkU3BvdFR5cGUuQm9udXNLZWZ1OlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQm9udXNLZWZ1UmVkU3BvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEhhbGxSZWRTcG90VHlwZS5Db21taXNpb246XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Db21taXNpb25SZWRTcG90QWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgSGFsbFJlZFNwb3RUeXBlLlNpZ25BY3Rpdml0eTpcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpZ25BY3Rpdml0eVN3aXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEhhbGxSZWRTcG90VHlwZS5EYWlseUdpZnQ6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5EYWlseUdpZnRSZWRTcG90QWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXZlbnQoXCJVcGRhdGVSZXNTcG90XCIsIHJlZFNwb3RUeXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aYr+WQpumcgOimgXF1YXJ5U3RhdGVcclxuICAgIHB1YmxpYyBuZWVkUXVhcnlTdGF0ZSA9IHRydWU7XHJcblxyXG4gICAgcHVibGljIHJlcVF1ZXJ5U3RhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5uZWVkUXVhcnlTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuUXVhcnlTdGF0ZSwge30sIChtc2cpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5sb2NrcyA9PSBudWxsIHx8IG1zZy5sb2Nrcy5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy/lnKjmuLjmiI/lnLrmma/kuK3kuI3lpITnkIZxdWFyeVN0YXRlXHJcbiAgICAgICAgICAgIGlmIChHbG9iYWwuU2NlbmVNYW5hZ2VyLmluR2FtZSgpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvL+mHjeaWsOivt+axgui/m+WFpea4uOaIj1xyXG4gICAgICAgICAgICBsZXQgbG9ja2VyID0gbXNnLmxvY2tzWzBdO1xyXG4gICAgICAgICAgICB0aGlzLnJlYmFja0dhbWUobG9ja2VyKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN6L+U5ri45oiPXHJcbiAgICAgKiBcclxuICAgICovXHJcbiAgICBwcml2YXRlIHJlYmFja0dhbWUobG9ja2VyKSB7XHJcbiAgICAgICAgaWYgKCFsb2NrZXIpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwibG9ja2VyID0gbnVsbFwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsb2NrZXIucmV0ID09IDEgJiYgbG9ja2VyLl9naWQpIHtcclxuICAgICAgICAgICAgbGV0IGRlZmFsdXRTdHIgPSBcIuW9k+WJjeato+WcqOa4uOaIj+S4re+8jOaYr+WQpuWbnuWIsOa4uOaIjz9cIlxyXG4gICAgICAgICAgICBsZXQgZ2lkID0gbG9ja2VyLl9naWRcclxuICAgICAgICAgICAgbGV0IGdhbWVEYXRhID0gR2xvYmFsLkdhbWVEYXRhLmdldEdhbWVJbmZvKGdpZCk7XHJcbiAgICAgICAgICAgIGlmIChnYW1lRGF0YSAmJiBnYW1lRGF0YS5ndHlwZSA9PSA4KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZURhdGEubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmFsdXRTdHIgPSBcIuaCqOato+WcqOOAkFwiICsgZ2FtZURhdGEubmFtZSArIFwi44CR5ri45oiP5Lit77yM6YeR5biB5pqC5omj77yM5piv5ZCm6ZyA6KaB6YeN5paw6L+b5YWl5ri45oiP77yfXCJcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1llc05vQm94KGRlZmFsdXRTdHIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RBcHBseUVudGVyR2FtZShnaWQpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0ciA9IEdsb2JhbC5HYW1lRGF0YS5nZXRSZXR1cm5HYW1lU3RyKGxvY2tlci5fZ2lkLCBsb2NrZXIuX2dsdiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvd1llc05vQm94KHN0ciB8fCBkZWZhbHV0U3RyLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5Db250cm9sLmdvVG9HYW1lQnlMb2NrZXIobG9ja2VyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXF1ZXN0R2V0UmV3YXJkUGFja0NvdW50KCkge1xyXG4gICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5tb2QsIE5ldEFwcGZhY2UuR2V0UmV3YXJkUGFja0NvdW50LCB7fSwgKHJldE9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmV0T2JqICYmIHJldE9iai5saXN0ICYmIHJldE9iai5saXN0Lmxlbmd0aCA+IDAgJiYgIXRoaXMuaXNTaG93UmVkRW52ZWxvcGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmV0T2JqLmxpc3RbMF1cclxuICAgICAgICAgICAgICAgIHRoaXMuaXNTaG93UmVkRW52ZWxvcGUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFJlZEVudmVsb3BlXCIsIGRhdGEsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuVUkuc2hvdyhcIlduZFJlYmF0ZUdldFwiLCBkYXRhLnBvaW50LCBudWxsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTaG93UmVkRW52ZWxvcGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0R2V0UmV3YXJkUGFja0NvdW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgLy8gR2xvYmFsLlVJLmZhc3RUaXAoZXJyb3IuX2VycnN0cik7XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyByZXF1ZXN0TXlBY3Rpdml0eUxpc3QoY2FsbGJhY2sgPSBudWxsKSB7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgXCJHZXRNeUFjdGl2aXR5TGlzdFwiLCB7fSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgLy/miJDlip9cclxuICAgICAgICAgICAgICAgIGxldCBzZXJ2ZXJJbmZvID0gZGF0YS5hY3Rpdml0eV9saXN0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlcnZlckluZm8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhY3RNYXAgPSBuZXcgTWFwPG51bWJlciwgQWN0aXZpdHlFbnRpdHk+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGl2aXR5X3JlZCA9IGZhbHNlOyAgIC8v5bCP57qi54K554q25oCBXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXJ2ZXJJbmZvLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwdHlwZSA9IHNlcnZlckluZm9baV0ucHR5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5bGP6JS95q+P5pel5YWF5YC857qi5YyFLTE2IDPml6Xnrb7liLAtMTEg5q+P5pel6L+U5YipLTcg6aaW5YWFIOi/lOWIqS04IOavj+aXpeekvOmHkS0xOFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXB0eXBlKSB7IC8v5rS75Yqo5Lit5b+D5Y+q5pi+56S657q/5LiL5rS75YqoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5mb0RhdGEgPSBzZXJ2ZXJJbmZvW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0gbmV3IEFjdGl2aXR5RW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBlbnRpdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmZvRGF0YVtrZXldICE9IG51bGwgJiYgaW5mb0RhdGFba2V5XSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlba2V5XSA9IGluZm9EYXRhW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkucmVkX3N0YXR1cyA9IGluZm9EYXRhWydzYXR1cyddID09IDEgPyAwIDogLTE7ICAgIC8v57qi54K554q25oCBXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhY3Rpdml0eV9yZWQpIHsvL+WPs+S4iuinkua0u+WKqOe6oueCuVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlfcmVkID0gYWN0aXZpdHlfcmVkIHx8IChpbmZvRGF0YS5zYXR1cyA9PT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RNYXAuc2V0KGVudGl0eS5hdHlwZSwgZW50aXR5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFjdGl2aXR5X3JlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuRXZlbnQuZXZlbnQoR2xvYmFsRXZlbnQuU2hvd1JlZFNwb3QsIFtmYWxzZSwgSGFsbFJlZFNwb3RUeXBlLkFjdGl2aXR5XSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGFjdE1hcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gKGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgLy/lpLHotKVcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIkhhbGxNb2RlbCBHZXRNeUFjdGl2aXR5TGlzdCBmYWlsZWRcIik7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZXF1ZXN0QXBwbHlFbnRlckdhbWUoZ2lkKSB7XHJcbiAgICAgICAgR2FtZS5Db250cm9sLmN1ckdpZCA9IGdpZFxyXG4gICAgICAgIGxldCBnYW1lSW5mbyA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lSW5mbyhnaWQpXHJcbiAgICAgICAgbGV0IGdhbWVUeXBlID0gZ2FtZUluZm8gPyBnYW1lSW5mby5nYW1lVHlwZSA6IC0xXHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHsgXCJnaWRcIjogZ2lkIH1cclxuICAgICAgICBpZiAoY2Muc3lzLmlzQnJvd3NlciAmJiBjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykgeyAvL2lvc+aWsOmhtemdouaXoOazleWcqOW8guatpeWbnuiwg+S4rW9wZW4oaW9z5Lya6KeG5Li66aqa5omw5by556qX6buY6K6k6L+b6KGM5bGP6JS9KSzlm6DmraTpnIDopoHlnKjmraTlhYjmiZPlvIDnqbrnmb3pobXpnaLkuYvlkI7or7fmsYLmiJDlip/lkI7ph43lrprlkJFcclxuICAgICAgICAgICAgaWYgKHRoaXMubmVlZFBvcFVwV2luZG93KGdpZCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMuX3dlYldpbmRvdyA9IHdpbmRvdy5vcGVuKFwiXCIsXCJfYmxhbmtcIik7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuV2ViTmF0aXZlLmluaXRXaW5kb3coV2luZG93S2V5VHlwZS5HYW1lV2luKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZ2FtZVR5cGUgPT09IEdhbWVUeXBlLldFQkdBTUUpIHtcclxuICAgICAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5BcHBseUVudGVyR2FtZSwgcGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL+ato+W4uOaLv+WIsHVybFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEudXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSBkYXRhLnVybFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FjdGlvblZpZXdIaWRkZW4gIOaYr+WQpumakOiXj+WOn+eUn+WKn+iDveaMiemSriAw5piv5LiN6ZqQ6JeP77yMMeaYr+makOiXj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0aW9uVmlld0hpZGRlbiA9IFwiMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY2hlbWUgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb25WaWV3SGlkZGVuID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBHbG9iYWwuVXJsVXRpbC5yZXBsYWNlVXJsUGFybVZhbChkYXRhLnVybCwgXCJyZXR1cm5fdXJsXCIsIEJhc2U2NENscy5lbmNvZGUoXCJnb2hhbGw6Ly9nb2hhbGwuY29tXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1lID0gXCJnb2hhbGxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gR2xvYmFsLlVybFV0aWwucmVwbGFjZVVybFBhcm1WYWwoZGF0YS51cmwsIFwicmV0dXJuX3R5cGVcIiwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEdsb2JhbC5TZXR0aW5nLnJlc1NlcnZlclVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2dvVXJsID0gR2xvYmFsLlNldHRpbmcucmVzU2VydmVyVXJsICsgXCIvbG9nby9cIiArIGdpZCArIFwiLnBuZz9cIiArIChuZXcgRGF0ZSgpKS52YWx1ZU9mKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJsb2dvIHVybCA9IFwiICsgbG9nb1VybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgKz0gXCImaXNfYXBwPTEmbG9nb190eXBlPTEmbG9nb191cmw9XCIgKyBCYXNlNjRDbHMuZW5jb2RlKGxvZ29VcmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybCArPSBcIiZpc19hcHA9MVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJIYWxsTW9kZWwgcmVxdWVzdEFwcGx5RW50ZXJHYW1lIGJhc2U2NCB1cmwgXCIgKyB1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50Lk9wZW5XZWJWaWV3R2FtZSwgdXJsLCBzY2hlbWUsIGFjdGlvblZpZXdIaWRkZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mHjeaWsOivt+axgui/m+WFpea4uOaIj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sb2NrcyAmJiBkYXRhLmxvY2tzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2NrZXIgPSBkYXRhLmxvY2tzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWJhY2tHYW1lKGxvY2tlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBudWxsLFxyXG4gICAgICAgICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZ2FtZVR5cGUgPT09IEdhbWVUeXBlLkFHQkcpIHtcclxuICAgICAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLmdhbWVBZ2VudCwgTmV0QXBwZmFjZS5FbnRlckdhbWUsIHBhcmFtcyxcclxuICAgICAgICAgICAgICAgIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/mraPluLjmi7/liLB1cmxcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gZW5jb2RlVVJJKGRhdGEudXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2FjdGlvblZpZXdIaWRkZW4gIOaYr+WQpumakOiXj+WOn+eUn+WKn+iDveaMiemSriAw5piv5LiN6ZqQ6JeP77yMMeaYr+makOiXj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0aW9uVmlld0hpZGRlbiA9IFwiMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY2hlbWUgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3Rpb25WaWV3SGlkZGVuID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmwgPSBHbG9iYWwuVXJsVXRpbC5yZXBsYWNlVXJsUGFybVZhbChkYXRhLnVybCwgXCJyZXR1cm5fdXJsXCIsIEJhc2U2NENscy5lbmNvZGUoXCJnb2hhbGw6Ly9nb2hhbGwuY29tXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NoZW1lID0gXCJnb2hhbGxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gR2xvYmFsLlVybFV0aWwucmVwbGFjZVVybFBhcm1WYWwoZGF0YS51cmwsIFwicmV0dXJuX3R5cGVcIiwgMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKFwi6Lez6L2sdXJsXCIsIHVybCwgZ2lkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uZWVkUG9wVXBXaW5kb3coZ2lkKSkgeyAgICAvL+WIpOaWreaYr+WQpumcgOimgeW8ueWHuuaWsOmhtemdolxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3BVcEdhbWVXaW5kb3coZ2lkLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50Lk9wZW5XZWJWaWV3R2FtZSwgdXJsLCBzY2hlbWUsIGFjdGlvblZpZXdIaWRkZW4sIGdpZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coXCLot7Povax1cmxcIiwgXCLojrflj5blpLHotKVcIiwgZ2lkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mHjeaWsOivt+axgui/m+WFpea4uOaIj1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sb2NrcyAmJiBkYXRhLmxvY2tzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2NrZXIgPSBkYXRhLmxvY2tzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWJhY2tHYW1lKGxvY2tlcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBudWxsLFxyXG4gICAgICAgICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm6ZyA6KaB55SocG9wdXDlvaLlvI/miZPlvIBcclxuICAgICAqIEBwYXJhbSBnaWQg5ri45oiPaWRcclxuICAgICAqIGlvc+S4i+Wkp+mDqOWIhuWkluaOpea4uOaIj+mDvemcgOimgeS7peaWsOmhteetvueahOW9ouW8j+aJk+W8gO+8jOaXoOazleeUqHdlYnZpZXdcclxuICAgICAqL1xyXG4gICAgcHVibGljIG5lZWRQb3BVcFdpbmRvdyhnaWQpIHtcclxuICAgICAgICBpZiAoIWNjLnN5cy5pc0Jyb3dzZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZihnaWQgPT0gOTA2MSB8fCBnaWQgPT0gOTA2MiB8fCBnaWQgPT0gOTA2MyB8fCBnaWQgPT0gOTA2NCl7ICAgLy9BR+aJgOacieinhuiur1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYgKENDX0RFVikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChnaWQgPT0gOTAzMSB8fCBnaWQgPT0gOTAwMSkgeyAgICAgLy9DTUTkvZPogrLkuI5TSEFCQeS4gOWumuiwg+WklumDqOmTvuaOpVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfQU5EUk9JRCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYy5zeXMub3MgPT0gY2Muc3lzLk9TX0lPUykgeyAgICAgLy9pb3Pmg4XlhrXkuIvku6XkuIvmuLjmiI/kuZ/ot7PovazlpJbpg6jpk77mjqVcclxuICAgICAgICAgICAgaWYgKGdpZCA9PSA5MDY1IHx8IGdpZCA9PSA5MDY2IHx8IGdpZCA9PSA5MDY3IHx8IGdpZCA9PSA5MDY4IHx8IGdpZCA9PSA5MDY5IHx8IGdpZCA9PSA5MDcwKSB7IC8vQUfmiYDmnInogIHomY7mnLpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChnaWQgPT0gOTA2MSB8fCBnaWQgPT0gOTA2MiB8fCBnaWQgPT0gOTA2MyB8fCBnaWQgPT0gOTA2NCkgeyAgIC8vQUfmiYDmnInop4borq9cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5p+Q5Lqb5aSW6YOo5a2Q5ri45oiP6ZyA6KaB6Lez5aSW6YOo6ZO+5o6l6K6/6ZeuKOWFiOS4iuWIhuWGjei3s+WklumDqOmTvuaOpSlcclxuICAgICAqIEBwYXJhbSBnaWQg5ri45oiPaWRcclxuICAgICAqIEBwYXJhbSB1cmwg5aSW6YOo5ri45oiP6ZO+5o6lXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwb3BVcEdhbWVXaW5kb3coZ2lkLCB1cmw6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLnBvcHVwV2luZG93SGFzVXBQb2ludCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIFwiZ2lkXCI6IGdpZCxcclxuICAgICAgICAgICAgXCJhY3Rpb25cIjogMVxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UuZ2FtZUFnZW50LCBOZXRBcHBmYWNlLlRyYW5zZmVyU2F2ZSwgcGFyYW1zLFxyXG4gICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwicG9wVXBHYW1lIHJlcXVlc3RBcHBseVRvcFBvaW50IHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVwV2luZG93SGFzVXBQb2ludCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVwV2luZG93R2FtZUlkID0gZ2lkO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsLldlYk5hdGl2ZS5vcGVuV2luZG93QnlLZXkoV2luZG93S2V5VHlwZS5HYW1lV2luLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuX3dlYldpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi54K55Ye7OuaWsOmhtemdouW9ouW8j1wiLHVybClcclxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgbGlua0E6SFRNTEFuY2hvckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBsaW5rQS5ocmVmID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGxpbmtBLnRhcmdldCA9IFwiX2JsYW5rXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGlua0EuY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lm9wZW4odXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwicG9wVXBHYW1lIHJlcXVlc3RBcHBseVRvcFBvaW50IGZhaWxlZFwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDot7PlpJbpg6jpk77mjqXlrZDmuLjmiI/kuIvliIZcclxuICAgICAqIEBwYXJhbSBnYW1laWQg5ri45oiPaWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBvcFVwR2FtZURvd25Qb2ludChnYW1laWQpIHtcclxuICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBcImdpZFwiOiBnYW1laWQsXHJcbiAgICAgICAgICAgIFwiYWN0aW9uXCI6IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLmdhbWVBZ2VudCwgTmV0QXBwZmFjZS5UcmFuc2ZlclRha2UsIHBhcmFtcyxcclxuICAgICAgICAgICAgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9wdXBXaW5kb3dIYXNVcFBvaW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVwV2luZG93R2FtZUlkID0gMDtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInBvcFVwR2FtZSByZXF1ZXN0QXBwbHlEb3duUG9pbnQgc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwicG9wVXBHYW1lIHJlcXVlc3RBcHBseURvd25Qb2ludCBmYWlsZWRcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRydWVcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXF1ZXN0QXBwbHlUb3BQb2ludChnYW1laWQpIHtcclxuICAgICAgICBsZXQgZ2FtZUluZm8gPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZUluZm8oZ2FtZWlkKVxyXG4gICAgICAgIGxldCBnYW1lVHlwZSA9IGdhbWVJbmZvID8gZ2FtZUluZm8uZ2FtZVR5cGUgOiAtMVxyXG4gICAgICAgIGlmIChnYW1lVHlwZSA9PT0gR2FtZVR5cGUuV0VCR0FNRSkge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0ge31cclxuICAgICAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5BcHBseVRvcFBvaW50LCBwYXJhbXMsXHJcbiAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIkhhbGxNb2RlbCByZXF1ZXN0QXBwbHlUb3BQb2ludCBzdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJIYWxsTW9kZWwgcmVxdWVzdEFwcGx5VG9wUG9pbnQgZmFpbGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRydWVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgXCJnaWRcIjogZ2FtZWlkLFxyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25cIjogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5nYW1lQWdlbnQsIE5ldEFwcGZhY2UuVHJhbnNmZXJTYXZlLCBwYXJhbXMsXHJcbiAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIkhhbGxNb2RlbCByZXF1ZXN0QXBwbHlUb3BQb2ludCBzdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJIYWxsTW9kZWwgcmVxdWVzdEFwcGx5VG9wUG9pbnQgZmFpbGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRydWVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlcXVlc3RBcHBseURvd25Qb2ludChnYW1laWQpIHtcclxuICAgICAgICBsZXQgZ2FtZUluZm8gPSBHbG9iYWwuR2FtZURhdGEuZ2V0R2FtZUluZm8oZ2FtZWlkKVxyXG4gICAgICAgIGxldCBnYW1lVHlwZSA9IGdhbWVJbmZvID8gZ2FtZUluZm8uZ2FtZVR5cGUgOiAtMVxyXG4gICAgICAgIGlmIChnYW1lVHlwZSA9PT0gR2FtZVR5cGUuV0VCR0FNRSkge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0ge31cclxuICAgICAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5BcHBseURvd25Qb2ludCwgcGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJIYWxsTW9kZWwgcmVxdWVzdEFwcGx5RG93blBvaW50IHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIkhhbGxNb2RlbCByZXF1ZXN0QXBwbHlEb3duUG9pbnQgZmFpbGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRydWVcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgXCJnaWRcIjogZ2FtZWlkLFxyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25cIjogMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEdsb2JhbC5IYWxsU2VydmVyLnNlbmQoTmV0QXBwZmFjZS5nYW1lQWdlbnQsIE5ldEFwcGZhY2UuVHJhbnNmZXJUYWtlLCBwYXJhbXMsXHJcbiAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIkhhbGxNb2RlbCByZXF1ZXN0QXBwbHlEb3duUG9pbnQgc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiSGFsbE1vZGVsIHJlcXVlc3RBcHBseURvd25Qb2ludCBmYWlsZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdHJ1ZVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5aSn5Y6F5ri45oiP5YiX6KGo5pi+56S654q25oCBXHJcbiAgICBwdWJsaWMgc2V0TW9yZUdhbWVTdGF0dXModmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5tb3JlR2FtZVN0YXR1cyA9IHZhbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+iusOW9leWkp+WOhei/m+WtkOa4uOaIj+iusOW9leWBj+enu1xyXG4gICAgcHVibGljIHNldEVudGVyR2FtZU9mZnNldFgodmFsOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmVudGVyR2FtZU9mZnNldFggPSB2YWw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0R2FtZUxpc3RLZXkoa2V5OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmdhbWVMaXN0S2V5ID0ga2V5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLm5lZWRRdWFyeVN0YXRlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZpcnN0T3BlbkhhbGwgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuRGFpbHlHaWZ0UmVkU3BvdEFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIEdsb2JhbC5HYW1lRGF0YS5kYXRhSW5pdEZpbmlzaCA9IGZhbHNlXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGVudW0gR2FtZVBvcyB7XHJcbiAgICBQb3B1bGFyID0gMCwgICAgLy/ng63pl6hcclxuICAgIFBva2VyID0gMSwgICAgICAvL+aji+eJjFxyXG4gICAgR2FtZXMgPSAyLCAgICAgIC8v55S15a2QXHJcbiAgICBWaWRlbyA9IDMsICAgICAgLy/op4borq9cclxuICAgIEZpc2hpbmcgPSA0LCAgICAvL+aNlemxvFxyXG4gICAgU3BvcnRzID0gNSwgICAgIC8v5L2T6IKyXHJcbiAgICBMb3R0ZXJ5ID0gNiwgICAgLy/lvannpahcclxufSJdfQ==