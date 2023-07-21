
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/model/PlayerInfoModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXG1vZGVsXFxQbGF5ZXJJbmZvTW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUEyRDtBQUMzRCx5REFBMEQ7QUFFMUQ7SUFBNkMsbUNBQVM7SUFBdEQ7UUFBQSxxRUEwUkM7UUFwUlUsZ0JBQVUsR0FBRyxFQUFFLENBQUE7UUFDZixzQkFBZ0IsR0FBRyxDQUFDLENBQUE7UUFDcEIscUJBQWUsR0FBRyxDQUFDLENBQUE7UUFFMUI7O1dBRUc7UUFDSSxnQkFBVSxHQUFHLENBQUMsQ0FBQztRQUN0Qjs7V0FFRztRQUNJLGFBQU8sR0FBRyxFQUFFLENBQUM7UUFDcEI7O1dBRUc7UUFDSSxtQkFBYSxHQUFHLENBQUMsQ0FBQztRQUVsQixvQkFBYyxHQUFHLENBQUMsQ0FBQTtRQUNsQixxQkFBZSxHQUFHLENBQUMsQ0FBQTtRQUNuQixlQUFTLEdBQTJCLElBQUksQ0FBQTtRQUkvQzs7O1dBR0c7UUFDSCxxQkFBZSxHQUFHO1lBQ2QsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtTQUM5RSxDQUFDO1FBd0pGOztXQUVHO1FBQ0gsZUFBUyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzs7SUE0RmxHLENBQUM7SUE5T0csaUNBQU8sR0FBUDtRQUVJLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FB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RUFBRSxDQUFDO1FBQ25CLFVBQUssR0FBVyxFQUFFLENBQUMsQ0FBQSxNQUFNO1FBQ3pCLFlBQU8sR0FBVyxFQUFFLENBQUM7SUEyQmpDLENBQUM7SUF6Qkcsc0JBQVcsMkJBQUk7UUFEZiw0QkFBNEI7YUFDNUI7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzthQUVELFVBQWdCLElBQVk7WUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQzs7O09BSkE7SUFNRCxzQkFBVywyQkFBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFnQixJQUFZO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUM7OztPQUpBO0lBTUQsc0JBQVcsNkJBQU07YUFBakI7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzthQUVELFVBQWtCLE1BQWM7WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDMUIsQ0FBQzs7O09BSkE7SUFPTCxnQkFBQztBQUFELENBOUJBLEFBOEJDLElBQUE7QUE5QlksOEJBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kZWxCYXNlIGZyb20gXCIuLi8uLi8uLi9mcmFtZXdvcmsvbW9kZWwvTW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7IE5ldEFwcGZhY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9uZXQvaGFsbC9OZXRFdmVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVySW5mb01vZGVsIGV4dGVuZHMgTW9kZWxCYXNlIHtcclxuICAgIC8qKlxyXG4gICAgICog5YWo5bGA5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpbnN0YW5jZTogUGxheWVySW5mb01vZGVsID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgdmlwU3Vic2lkeSA9IHt9XHJcbiAgICBwdWJsaWMgdmlwU3Vic2lkeVN0YXR1cyA9IDBcclxuICAgIHB1YmxpYyB2aXBTdWJzaWR5Q291bnQgPSAwXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAgdmlw5piv5ZCm5Y+R6YCB5aWW5YqxXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB2aXBfcmV3YXJkID0gMDtcclxuICAgIC8qKlxyXG4gICAgICogdmlw5L+h5oGvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB2aXBfY2ZnID0gW107XHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuaciXZpcOWlluWKseWPr+S7pemihuWPllxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNfdmlwX3Jld2FyZCA9IDA7XHJcblxyXG4gICAgcHVibGljIGlzX3dlZWtfcmV3YXJkID0gMFxyXG4gICAgcHVibGljIGlzX21vbnRoX3Jld2FyZCA9IDBcclxuICAgIHB1YmxpYyBtdXNpY0RhdGE6IE1hcDxzdHJpbmcsIEJnbUVudGl0eT4gPSBudWxsXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBVcGRhdGVTY3JvbGxWaWV3ID0gXCJVcGRhdGVTY3JvbGxWaWV3XCJcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeUteWPsOatjOabsuWQjeensOWSjOS4i+i9veWcsOWdgFxyXG4gICAgICogdXJs77ya5LiL6L295Zyw5Z2AIHN1cmzvvJrlrZjlgqjlnLDlnYBcclxuICAgICAqL1xyXG4gICAgZGlhbnRhaU11c2ljQXJyID0gW1xyXG4gICAgICAgIHsgbmFtZTogXCLpu5jorqTog4zmma/pn7PkuZBcIiwgc2luZ2VyOiBcIlwiLCBmaWxlOiBcIlwiLCB1cmw6IFwiXCIsIHN1cmw6IFwiXCIsIGRvd25sb2FkOiB0cnVlIH0sXHJcbiAgICBdO1xyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3mraPlnKjmkq3mlL7nmoTpn7PkuZDmlbDmja7lr7nosaFcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHBsYXlpbmdPYmogPSBudWxsO1xyXG5cclxuXHJcbiAgICBvbkNsZWFyKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmlzX3ZpcF9yZXdhcmQgPSAwXHJcbiAgICAgICAgdGhpcy5pc193ZWVrX3Jld2FyZCA9IDBcclxuICAgICAgICB0aGlzLmlzX21vbnRoX3Jld2FyZCA9IDBcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW6IOM5pmv6Z+z5LmQXHJcbiAgICAgKi9cclxuICAgIEluaXRCZ20oKSB7XHJcbiAgICAgICAgLy8gdGhpcy5pbml0UmVxdWVzdEluZm8oKTtcclxuICAgICAgICBpZiAodGhpcy5kaWFudGFpTXVzaWNBcnJbMF0udXJsID09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5kaWFudGFpTXVzaWNBcnJbMF0udXJsID0gR2xvYmFsLlNldHRpbmcuaGFsbEJHTTtcclxuICAgICAgICAgICAgdGhpcy5kaWFudGFpTXVzaWNBcnJbMF0uc3VybCA9IEdsb2JhbC5TZXR0aW5nLmhhbGxCR007XHJcbiAgICAgICAgICAgIHRoaXMuZGlhbnRhaU11c2ljQXJyWzBdLmZpbGUgPSBHbG9iYWwuU2V0dGluZy5oYWxsQkdNO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBiTXVzaWMgPSBmYWxzZTsvL+aYr+WQpuaJvuWIsOS6huiDjOaZr+mfs+S5kFxyXG4gICAgICAgIHZhciBiZ20gPSBHbG9iYWwuU2V0dGluZy5zdG9yYWdlLmdldChcImJnbVwiKTtcclxuICAgICAgICBpZiAoIWJnbSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RCZ21MaXN0KClcclxuICAgICAgICAgICAgdGhpcy5wbGF5QmdtKGJNdXNpYywgdGhpcy5nZXRMb2NhbEZpbGVOYW1lKEdsb2JhbC5TZXR0aW5nLmhhbGxCR00pKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5tdXNpY0RhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0QmdtTGlzdCgoZGF0YTogTWFwPHN0cmluZywgQmdtRW50aXR5PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyck5hbWUgPSBkYXRhLmtleXMoKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5zaXplOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gYXJyTmFtZS5uZXh0KCkudmFsdWUgYXMgc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlbnRpdHkgPSBkYXRhLmdldChrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdXJsID0gdGhpcy5nZXRMb2NhbEZpbGVOYW1lKGVudGl0eS5maWxlKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdXJsID09IGJnbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiTXVzaWMgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUJnbShiTXVzaWMsIGJnbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICgwID09IGRhdGEuc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUJnbShiTXVzaWMsIHRoaXMuZ2V0TG9jYWxGaWxlTmFtZShHbG9iYWwuU2V0dGluZy5oYWxsQkdNKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghYk11c2ljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5QmdtKGJNdXNpYywgdGhpcy5nZXRMb2NhbEZpbGVOYW1lKEdsb2JhbC5TZXR0aW5nLmhhbGxCR00pKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBhcnJOYW1lID0gdGhpcy5tdXNpY0RhdGEua2V5cygpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tdXNpY0RhdGEuc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBrZXkgPSBhcnJOYW1lLm5leHQoKS52YWx1ZSBhcyBzdHJpbmc7XHJcbiAgICAgICAgICAgIGxldCBlbnRpdHkgPSB0aGlzLm11c2ljRGF0YS5nZXQoa2V5KTtcclxuICAgICAgICAgICAgbGV0IHN1cmwgPSB0aGlzLmdldExvY2FsRmlsZU5hbWUoZW50aXR5LmZpbGUpXHJcbiAgICAgICAgICAgIGlmIChzdXJsID09IGJnbSkge1xyXG4gICAgICAgICAgICAgICAgYk11c2ljID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5QmdtKGJNdXNpYywgYmdtKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgwID09IHRoaXMubXVzaWNEYXRhLnNpemUpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QmdtKGJNdXNpYywgdGhpcy5nZXRMb2NhbEZpbGVOYW1lKEdsb2JhbC5TZXR0aW5nLmhhbGxCR00pKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFiTXVzaWMpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QmdtKGJNdXNpYywgdGhpcy5nZXRMb2NhbEZpbGVOYW1lKEdsb2JhbC5TZXR0aW5nLmhhbGxCR00pKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBwbGF5QmdtKGV4aXN0OiBib29sZWFuLCBiZ20pIHtcclxuICAgICAgICBpZiAoIWV4aXN0KSB7XHJcbiAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0KFwiYmdtXCIsIGJnbSlcclxuICAgICAgICAgICAgR2xvYmFsLkF1ZGlvLnBsYXlIYWxsQkdNKCk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBHbG9iYWwuQXVkaW8ucGxheU11c2ljKGJnbSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXF1ZXN0QmdtTGlzdChjYWxsYmFjayA9IG51bGwpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXNcclxuICAgICAgICBHbG9iYWwuSGFsbFNlcnZlci5zZW5kKE5ldEFwcGZhY2UubW9kLCBcIkdldEJnbUxpc3RcIiwge30sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkYXRhOiBhbnkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL+aIkOWKn1xyXG4gICAgICAgICAgICAgICAgbGV0IGJnbU1hcCA9IG5ldyBNYXA8c3RyaW5nLCBCZ21FbnRpdHk+KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtdXNpYyA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbnRpdHkgPSBuZXcgQmdtRW50aXR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eS5uYW1lID0gbXVzaWMubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5LmZpbGUgPSBtdXNpYy5maWxlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkuc2luZ2VyID0gbXVzaWMuc2luZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZ21NYXAuc2V0KGVudGl0eS5uYW1lLCBlbnRpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUdsb2JhbC5TZXR0aW5nLnJlc1NlcnZlclVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVybEFycmF5ID0gbXVzaWMuZmlsZS5zcGxpdChcIi8vXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVybEFycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2NoZW1lID0gdXJsQXJyYXlbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaG9zdFVybCA9IHVybEFycmF5WzFdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhvc3RBcnJheSA9IGhvc3RVcmwuc3BsaXQoXCIvXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhvc3QgPSBob3N0QXJyYXlbMF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5yZXNTZXJ2ZXJVcmwgPSBzY2hlbWUgKyBcIi8vXCIgKyBob3N0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiR2xvYmFsLlNldHRpbmcucmVzU2VydmVyVXJsID0gXCIgKyBHbG9iYWwuU2V0dGluZy5yZXNTZXJ2ZXJVcmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubXVzaWNEYXRhID0gYmdtTWFwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soYmdtTWFwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgIC8v5aSx6LSlXHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJQbGF5ZXJJbmZvTW9kZWwgcmVxdWVzdEJnbUxpc3QgZmFpbGVkXCIpO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcyksXHJcbiAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICAzMFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogdXJs6L2sTUQ177yM5bm25ou85o6l5ZCO57yAXHJcbiAgICAqIEBwYXJhbSB1cmwgXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGdldExvY2FsRmlsZU5hbWUodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBuYW1lID0gdXJsO1xyXG4gICAgICAgIGxldCBlbmQgPSBuYW1lLmxhc3RJbmRleE9mKCcuJyk7XHJcbiAgICAgICAgbGV0IG5hbWVQcmUgPSBuYW1lLnNsaWNlKDAsIGVuZCk7XHJcbiAgICAgICAgbGV0IGZpbGVTdWZmaXggPSBuYW1lLnN1YnN0cmluZyhlbmQpO1xyXG4gICAgICAgIHJldHVybiBqc2IuZmlsZVV0aWxzLmdldFdyaXRhYmxlUGF0aCgpICsgR2xvYmFsLlRvb2xraXQubWQ1KG5hbWVQcmUpICsgZmlsZVN1ZmZpeDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Y2H57qn5Yiw5q+P5Liqdmlw562J57qn6ZyA6KaB55qE5oC757uP6aqM5YC877yM5LuO5Y2H5YiwIDEg57qndmlw5byA5aeLXHJcbiAgICAgKi9cclxuICAgIHZpcEV4cEFyciA9IFsxMDAsIDIwMCwgMzAwLCA0MDAsIDUwMCwgNjAwLCA3MDAsIDgwMCwgOTAwLCAxMDAwLCAxMTAwLCAxMjAwLCAxMzAwLCAxNDAwLCAxNTAwXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMllxyXG4gICAgICovXHJcbiAgICBvbkluaXQoKSB7XHJcbiAgICAgICAgUGxheWVySW5mb01vZGVsLmluc3RhbmNlID0gdGhpcztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6ZSA5q+BXHJcbiAgICAgKi9cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICBQbGF5ZXJJbmZvTW9kZWwuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBOYW1lKCkge1xyXG4gICAgICAgIHJldHVybiBcIlBsYXllckluZm9Nb2RlbFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW55u45YWz6YWN572u5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gY2ZnIFxyXG4gICAgICovXHJcbiAgICBJbml0RGF0YShjZmcpIHtcclxuICAgICAgICBpZiAoIWNmZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmlwX2NmZyA9IGNmZztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNmZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0gY2ZnW2ldO1xyXG4gICAgICAgICAgICB0aGlzLnZpcEV4cEFycltvYmoudmlwIC0gMV0gPSBvYmoudmlwX2NvaW47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbooaXliqnph5Hnm7jlhbPphY3nva5cclxuICAgICAqIEBwYXJhbSBjZmcgXHJcbiAgICAgKi9cclxuICAgIC8vIFwic3Vic2lkeV9wb2ludFwiOntcclxuICAgIC8vICAgICBcInVzZXJfdmlwXCI6e1xyXG4gICAgLy8gICAgICAgICBcIjBcIjp7XCJwb2ludFwiOjEwMDAwLFwidGltZXNcIjoxfSwgICAvLyB2aXAwIOihpeWKqemHkemHkeminSAx5YWDIOasoeaVsCAx5qyhXHJcbiAgICAvLyAgICAgICAgIFwiMVwiOntcInBvaW50XCI6MjAwMDAsXCJ0aW1lc1wiOjJ9LCAgIC8vIHZpcDEg6KGl5Yqp6YeR6YeR6aKdIDLlhYMg5qyh5pWwIDLmrKFcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIFwic3RhdHVzXCI6MSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g54q25oCBICAxIOW8gOWQr+ihpeWKqemHkVxyXG4gICAgLy8gICAgIFwic2VsZl90aW1lc1wiOjEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOeUqOaIt+W9k+aXpeWJqeS9measoeaVsFxyXG4gICAgLy8gfVxyXG4gICAgSW5pdFN1YnNpZHkoY2ZnKSB7XHJcbiAgICAgICAgaWYgKCFjZmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZpcFN1YnNpZHkgPSBjZmcudXNlcl92aXA7XHJcbiAgICAgICAgdGhpcy52aXBTdWJzaWR5U3RhdHVzID0gY2ZnLnN0YXR1cztcclxuICAgICAgICB0aGlzLnZpcFN1YnNpZHlDb3VudCA9IGNmZy5zZWxmX3RpbWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+35rGC546p5a625L+h5oGvXHJcbiAgICAgKi9cclxuICAgIHJlcUdldFVzZXJJbmZvKGNhbGxiYWNrLCBlcnJvcmJhY2spIHtcclxuICAgICAgICBsZXQgcGFyYW06IGFueSA9IHt9XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5HZXRVc2VySW5mbywgcGFyYW0sIGNhbGxiYWNrLCBlcnJvcmJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+35rGC5L+u5pS55pi156ewL+WktOWDj1xyXG4gICAgICogQHBhcmFtIHBhcmFtIFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIFxyXG4gICAgICovXHJcbiAgICByZXFFZGl0VXNlckluZm8ocGFyYW0sIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5FZGl0VXNlckluZm8sIHBhcmFtLCBjYWxsYmFjaywgbnVsbCwgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K+35rGC5L+u5pS55aS05YOP5qGGXHJcbiAgICAgKiBAcGFyYW0gcGFyYW0gXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgXHJcbiAgICAgKi9cclxuICAgIHJlcVNldFNlbGZDZmcocGFyYW0sIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgR2xvYmFsLkhhbGxTZXJ2ZXIuc2VuZChOZXRBcHBmYWNlLm1vZCwgTmV0QXBwZmFjZS5TZXRTZWxmQ2ZnLCBwYXJhbSwgY2FsbGJhY2ssIG51bGwsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW+l3ZpcOWNh+e6p+mcgOimgeeahCBcclxuICAgICAqIEBwYXJhbSB0b1ZpcCBcclxuICAgICAqL1xyXG4gICAgR2V0VmlwVXBncmFkZUV4cCh0b1ZpcCkge1xyXG4gICAgICAgIHZhciBleHAgPSAwO1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRvVmlwIC0gMTtcclxuICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMudmlwRXhwQXJyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBleHAgPSB0aGlzLnZpcEV4cEFycltpbmRleF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBleHA7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vYmdt5a6e5L2T57G7XHJcbmV4cG9ydCBjbGFzcyBCZ21FbnRpdHkge1xyXG4gICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgX2ZpbGU6IHN0cmluZyA9IFwiXCI7Ly/pn7PkuZDot6/lvoRcclxuICAgIHByaXZhdGUgX3Npbmdlcjogc3RyaW5nID0gXCJcIjtcclxuICAgIC8vIHByaXZhdGUgZmxhZzogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgbmFtZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGZpbGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZmlsZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGZpbGUoZmlsZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZmlsZSA9IGZpbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBzaW5nZXIoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2luZ2VyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgc2luZ2VyKHNpbmdlcjogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fc2luZ2VyID0gc2luZ2VyO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iXX0=