"use strict";
cc._RF.push(module, 'bf7e6+NcpBKA4L56xfzSPm1', 'PlayerInfoModel');
// hall/scripts/logic/hallcommon/model/PlayerInfoModel.ts

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
exports.BgmEntity = void 0;
var ModelBase_1 = require("../../../framework/model/ModelBase");
var NetEvent_1 = require("../../core/net/hall/NetEvent");
var PlayerInfoModel = /** @class */ (function (_super) {
    __extends(PlayerInfoModel, _super);
    function PlayerInfoModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vipSubsidy = {};
        _this.vipSubsidyStatus = 0;
        _this.vipSubsidyCount = 0;
        /**
         *  vip是否发送奖励
         */
        _this.vip_reward = 0;
        /**
         * vip信息
         */
        _this.vip_cfg = [];
        /**
         * 是否有vip奖励可以领取
         */
        _this.is_vip_reward = 0;
        _this.is_week_reward = 0;
        _this.is_month_reward = 0;
        _this.musicData = null;
        /**
         * 电台歌曲名称和下载地址
         * url：下载地址 surl：存储地址
         */
        _this.diantaiMusicArr = [
            { name: "默认背景音乐", singer: "", file: "", url: "", surl: "", download: true },
        ];
        /**
         * 升级到每个vip等级需要的总经验值，从升到 1 级vip开始
         */
        _this.vipExpArr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500];
        return _this;
    }
    PlayerInfoModel.prototype.onClear = function () {
        this.is_vip_reward = 0;
        this.is_week_reward = 0;
        this.is_month_reward = 0;
    };
    /**
     * 初始化背景音乐
     */
    PlayerInfoModel.prototype.InitBgm = function () {
        var _this = this;
        // this.initRequestInfo();
        if (this.diantaiMusicArr[0].url == "") {
            this.diantaiMusicArr[0].url = Global.Setting.hallBGM;
            this.diantaiMusicArr[0].surl = Global.Setting.hallBGM;
            this.diantaiMusicArr[0].file = Global.Setting.hallBGM;
        }
        var bMusic = false; //是否找到了背景音乐
        var bgm = Global.Setting.storage.get("bgm");
        if (!bgm) {
            this.requestBgmList();
            this.playBgm(bMusic, this.getLocalFileName(Global.Setting.hallBGM));
            return;
        }
        if (!this.musicData) {
            this.requestBgmList(function (data) {
                var arrName = data.keys();
                for (var i = 0; i < data.size; i++) {
                    var key = arrName.next().value;
                    var entity = data.get(key);
                    var surl = _this.getLocalFileName(entity.file);
                    if (surl == bgm) {
                        bMusic = true;
                        _this.playBgm(bMusic, bgm);
                        return;
                    }
                }
                if (0 == data.size) {
                    _this.playBgm(bMusic, _this.getLocalFileName(Global.Setting.hallBGM));
                    return;
                }
                if (!bMusic) {
                    _this.playBgm(bMusic, _this.getLocalFileName(Global.Setting.hallBGM));
                }
            });
            return;
        }
        var arrName = this.musicData.keys();
        for (var i = 0; i < this.musicData.size; i++) {
            var key = arrName.next().value;
            var entity = this.musicData.get(key);
            var surl = this.getLocalFileName(entity.file);
            if (surl == bgm) {
                bMusic = true;
                this.playBgm(bMusic, bgm);
                return;
            }
        }
        if (0 == this.musicData.size) {
            this.playBgm(bMusic, this.getLocalFileName(Global.Setting.hallBGM));
            return;
        }
        if (!bMusic) {
            this.playBgm(bMusic, this.getLocalFileName(Global.Setting.hallBGM));
        }
    };
    PlayerInfoModel.prototype.playBgm = function (exist, bgm) {
        if (!exist) {
            Global.Setting.storage.set("bgm", bgm);
            Global.Audio.playHallBGM();
            return;
        }
        Global.Audio.playMusic(bgm);
    };
    PlayerInfoModel.prototype.requestBgmList = function (callback) {
        if (callback === void 0) { callback = null; }
        var self = this;
        Global.HallServer.send(NetEvent_1.NetAppface.mod, "GetBgmList", {}, function (data) {
            //成功
            var bgmMap = new Map();
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var music = data[i];
                    var entity = new BgmEntity();
                    entity.name = music.name;
                    entity.file = music.file;
                    entity.singer = music.singer;
                    bgmMap.set(entity.name, entity);
                    if (!Global.Setting.resServerUrl) {
                        var urlArray = music.file.split("//");
                        if (urlArray.length > 0) {
                            var scheme = urlArray[0];
                            var hostUrl = urlArray[1];
                            var hostArray = hostUrl.split("/");
                            var host = hostArray[0];
                            Global.Setting.resServerUrl = scheme + "//" + host;
                            Logger.error("Global.Setting.resServerUrl = " + Global.Setting.resServerUrl);
                        }
                    }
                }
                self.musicData = bgmMap;
            }
            if (callback) {
                callback(bgmMap);
            }
        }.bind(this), function (data) {
            //失败
            Logger.error("PlayerInfoModel requestBgmList failed");
        }.bind(this), false, 30);
    };
    /**
    * url转MD5，并拼接后缀
    * @param url
    */
    PlayerInfoModel.prototype.getLocalFileName = function (url) {
        var name = url;
        var end = name.lastIndexOf('.');
        var namePre = name.slice(0, end);
        var fileSuffix = name.substring(end);
        return jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(namePre) + fileSuffix;
    };
    /**
     * 初始化
     */
    PlayerInfoModel.prototype.onInit = function () {
        PlayerInfoModel.instance = this;
    };
    /**
     * 销毁
     */
    PlayerInfoModel.prototype.onDestroy = function () {
        PlayerInfoModel.instance = null;
    };
    Object.defineProperty(PlayerInfoModel.prototype, "Name", {
        get: function () {
            return "PlayerInfoModel";
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 初始化相关配置数据
     * @param cfg
     */
    PlayerInfoModel.prototype.InitData = function (cfg) {
        if (!cfg) {
            return;
        }
        this.vip_cfg = cfg;
        for (var i = 0; i < cfg.length; i++) {
            var obj = cfg[i];
            this.vipExpArr[obj.vip - 1] = obj.vip_coin;
        }
    };
    /**
     * 初始化补助金相关配置
     * @param cfg
     */
    // "subsidy_point":{
    //     "user_vip":{
    //         "0":{"point":10000,"times":1},   // vip0 补助金金额 1元 次数 1次
    //         "1":{"point":20000,"times":2},   // vip1 补助金金额 2元 次数 2次
    //     },
    //     "status":1,                                              // 状态  1 开启补助金
    //     "self_times":1                                         // 用户当日剩余次数
    // }
    PlayerInfoModel.prototype.InitSubsidy = function (cfg) {
        if (!cfg) {
            return;
        }
        this.vipSubsidy = cfg.user_vip;
        this.vipSubsidyStatus = cfg.status;
        this.vipSubsidyCount = cfg.self_times;
    };
    /**
     * 请求玩家信息
     */
    PlayerInfoModel.prototype.reqGetUserInfo = function (callback, errorback) {
        var param = {};
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.GetUserInfo, param, callback, errorback);
    };
    /**
     * 请求修改昵称/头像
     * @param param
     * @param callback
     */
    PlayerInfoModel.prototype.reqEditUserInfo = function (param, callback) {
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.EditUserInfo, param, callback, null, false);
    };
    /**
     * 请求修改头像框
     * @param param
     * @param callback
     */
    PlayerInfoModel.prototype.reqSetSelfCfg = function (param, callback) {
        Global.HallServer.send(NetEvent_1.NetAppface.mod, NetEvent_1.NetAppface.SetSelfCfg, param, callback, null, false);
    };
    /**
     * 得vip升级需要的
     * @param toVip
     */
    PlayerInfoModel.prototype.GetVipUpgradeExp = function (toVip) {
        var exp = 0;
        var index = toVip - 1;
        if (index >= 0 && index < this.vipExpArr.length) {
            exp = this.vipExpArr[index];
        }
        return exp;
    };
    /**
     * 全局对象
     */
    PlayerInfoModel.instance = null;
    PlayerInfoModel.UpdateScrollView = "UpdateScrollView";
    /**
     * 当前正在播放的音乐数据对象
     */
    PlayerInfoModel.playingObj = null;
    return PlayerInfoModel;
}(ModelBase_1.default));
exports.default = PlayerInfoModel;
//bgm实体类
var BgmEntity = /** @class */ (function () {
    function BgmEntity() {
        this._name = "";
        this._file = ""; //音乐路径
        this._singer = "";
    }
    Object.defineProperty(BgmEntity.prototype, "name", {
        // private flag: number = 0;
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BgmEntity.prototype, "file", {
        get: function () {
            return this._file;
        },
        set: function (file) {
            this._file = file;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BgmEntity.prototype, "singer", {
        get: function () {
            return this._singer;
        },
        set: function (singer) {
            this._singer = singer;
        },
        enumerable: false,
        configurable: true
    });
    return BgmEntity;
}());
exports.BgmEntity = BgmEntity;

cc._RF.pop();