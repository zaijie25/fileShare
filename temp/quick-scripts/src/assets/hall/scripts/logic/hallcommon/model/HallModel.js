"use strict";
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