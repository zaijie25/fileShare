"use strict";
cc._RF.push(module, 'b569b5Ub31LtoJmrQoPlRVg', 'SkinConfig');
// hall/scripts/logic/hallcommon/app/SkinConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkinType = void 0;
var GreenSkinModuleCfg_1 = require("../modulecfg/GreenSkinModuleCfg");
var BlueSkinModuleCfg_1 = require("../modulecfg/BlueSkinModuleCfg");
var AppCfg_1 = require("../../hall/AppCfg");
var PurpleSkinModuleCfg_1 = require("../modulecfg/PurpleSkinModuleCfg");
var DarkSkinModuleCfg_1 = require("../modulecfg/DarkSkinModuleCfg");
var RedSkinModuleCfg_1 = require("../modulecfg/RedSkinModuleCfg");
var FantasySkinModuleCfg_1 = require("../modulecfg/FantasySkinModuleCfg");
var LegendSkinModuleCfg_1 = require("../modulecfg/LegendSkinModuleCfg");
var NewBlueSkinModuleCfg_1 = require("../modulecfg/NewBlueSkinModuleCfg");
var SkinType;
(function (SkinType) {
    SkinType[SkinType["purple"] = 1] = "purple";
    SkinType[SkinType["dark"] = 2] = "dark";
    SkinType[SkinType["red"] = 3] = "red";
    SkinType[SkinType["blue"] = 4] = "blue";
    SkinType[SkinType["fantasy"] = 5] = "fantasy";
    SkinType[SkinType["green"] = 6] = "green";
    SkinType[SkinType["legend"] = 7] = "legend";
    SkinType[SkinType["darkgold"] = 8] = "darkgold";
    SkinType[SkinType["blue2"] = 9] = "blue2";
    SkinType[SkinType["newBlue"] = 10] = "newBlue";
})(SkinType = exports.SkinType || (exports.SkinType = {}));
//皮肤配置信息
var SkinConfig = /** @class */ (function () {
    function SkinConfig() {
        this.configPath = "hall/config/skinConfig";
        //皮肤配置是否加载完成
        this.loadedFinish = false;
        //皮肤类型
        this.skinType = SkinType.fantasy;
        //loading过程中 tips数组
        this.loadingTips = null;
        // 头像形状 0代表方头 1代表圆头
        this.headImgShape = 0;
        // 任务宝箱功能是否关闭 0不关闭 1关闭
        this.isTaskClosed = 0;
        //游戏列表的偏移值。 
        //游戏列表有可能会被公告挡住，需要添加offset保证默认情况 公告不会遮挡游戏图标。
        this.hallGameListOffsetX = 17;
        this.hallGameListVerticalOffsetY = 0;
        //更过游戏按钮y坐标
        this.moreGameBtnPositionY = 0;
        //财神到 item间隙与offset
        this.commisionCfg = [];
        //WndMySpread中 领取记录y坐标 [正常坐标, 隐藏邀请功能坐标]
        this.mySpreadOrgChgPosYs = [];
        //转盘轮播文字颜色  [名字颜色，奖励颜色]
        this.zhuanpanColors = [];
        //个人信息装扮界面 头像 item间隔的宽高
        this.zhuangbanHeadWH = [];
        //个人信息装扮界面 头像框 item间隔的宽高
        this.zhuangbanKuangWH = [];
        //充值记录字体颜色  [充值处理中, 充值成功, 充值失败, 提现成功， 提现失败，处理中]
        this.recordingItemColors = [];
        //充值标签页 返利图标位置
        this.rechargeFanliPos = [];
        //充值标签页 返利图标位置
        this.hallGameListTagOffsetX = [];
        //每日首充返利字体颜色和大小
        this.dailyRechargeFontColorAndSize = [];
        //转账信息 海外充值 复制按钮、提交按钮、提示文字配置
        this.rechangeOverseasBankInfoCfg = {};
        //转账信息 银行卡充值 复制按钮、提交按钮、提示文字配置
        this.rechangeUnionpayBankInfoCfg = {};
        //充值相关icon配置
        //0 1 位左侧标签页文本（选中/未选中）。  紫色为图标 其他为文字  紫色图集在icon 后续图标放到rechargeCash中
        //2 充值loading界面中间图标
        //3 按钮列表上图标
        //！！！资源位置已红色为参考
        this.rechargeIconsCfg = {};
        /**
         * 跑马灯池子长度
         */
        this.hallPmdPoolLen = {};
        //vip客服图标配置 
        //{类型:[图集，图标]}
        //@todo  统一全平台路径 删除该字段
        this.rechargeVipConfig = {};
        //预加载普通资源  UI json 等
        this.requireList = [];
        //特殊图集加载
        this.requireAtlasList = [];
        //游戏图标预加载
        this.requireGameIconList = [];
        //WndGameMaintainUI   [colorstr,size]
        this.maintainGameColorAndSize = [];
        this.infoSinerColors = [];
        this.skinModule = null;
    }
    Object.defineProperty(SkinConfig.prototype, "appPicConfig", {
        get: function () {
            return this._appPicConfig;
        },
        set: function (val) {
            this._appPicConfig = val;
        },
        enumerable: false,
        configurable: true
    });
    SkinConfig.prototype.setup = function () {
        var _this = this;
        cc.loader.loadRes(this.configPath, function (error, jsonAsset) {
            if (error != null) {
                cc.error("加载skinConfig失败！！！！！");
                return;
            }
            _this.parseConfig(jsonAsset.json);
            _this.loadedFinish = true;
            Global.Event.event(GlobalEvent.SkinConfigLoadFinish);
        });
    };
    SkinConfig.prototype.getSpaceOffset = function () {
        var storgeHall = Global.customApp.getHallBundleName();
        if (!this.hallGameListOffsetX) {
            return [17, 70];
        }
        return this.hallGameListOffsetX[storgeHall];
    };
    SkinConfig.prototype.getHallGameListTagOffsetX = function () {
        var storgeHall = Global.customApp.getHallBundleName();
        if (!this.hallGameListTagOffsetX) {
            return [105, 37];
        }
        return this.hallGameListTagOffsetX[storgeHall];
    };
    SkinConfig.prototype.getHallGameListLine = function () {
        var storgeHall = Global.customApp.getHallBundleName();
        if (!this.hallGameListLineCfg) {
            return 3;
        }
        return this.hallGameListLineCfg[storgeHall];
    };
    /**
     *
     * @param type 0 x轴 1 y轴
     * @returns
     */
    SkinConfig.prototype.getHallGameListGap = function (type) {
        var storgeHall = Global.customApp.getHallBundleName();
        if (!this.hallGameListGapCfg) {
            return 3;
        }
        return this.hallGameListGapCfg[storgeHall][type];
    };
    SkinConfig.prototype.getPaomadengPoolLen = function () {
        var storgeHall = Global.customApp.getHallBundleName();
        if (!this.hallPmdPoolLen) {
            return 3;
        }
        return this.hallPmdPoolLen[storgeHall];
    };
    SkinConfig.prototype.getHallWidgetCfg = function () {
        var storgeHall = Global.customApp.getHallBundleName();
        if (!this.hallWidgetCfg) {
            return this.hallWidgetCfg;
        }
        return this.hallWidgetCfg[storgeHall];
    };
    SkinConfig.prototype.parseConfig = function (json) {
        this.skinType = json.skinType;
        this.loadingTips = json.loadingTips;
        this.headImgShape = json.headImgShape;
        this.isTaskClosed = json.taskClosed;
        TaskManager.setTaskEnable(this.isTaskClosed == 0);
        this.hallGameListOffsetX = json.hallGameListOffsetX;
        this.moreGameBtnPositionY = json.moreGameBtnPositionY;
        this.commisionCfg = json.commisionCfg;
        this.playerInfoAtlasPath = json.playerInfoAtlasPath;
        this.mySpreadOrgChgPosYs = json.mySpreadOrgChgPosYs;
        this.zhuanpanColors = json.zhuanpanColors;
        this.zhuangbanHeadWH = json.zhuangbanHeadWH;
        this.zhuangbanKuangWH = json.zhuangbanKuangWH;
        this.recordingItemColors = json.recordingItemColors;
        this.rechargeFanliPos = json.rechargeFanliPos;
        this.rechargeIconsCfg = json.rechargeIconsCfg;
        this.rechargeVipConfig = json.rechargeVipConfig;
        this.requireList = json.requireList;
        this.requireAtlasList = json.requireAtlasList;
        this.requireGameIconList = json.requireGameIconList;
        this.maintainGameColorAndSize = json.maintainGameColorAndSize;
        Global.Setting.needHallChooseRoom = json.needHallChooseRoom;
        this.dailyRechargeFontColorAndSize = json.dailyRechargeFontColorAndSize;
        this.rechangeOverseasBankInfoCfg = json.rechangeOverseasBankInfoCfg;
        //Global.Setting.isNewAppHotUpdate = json.isNewAppHotUpdate
        this.rechangeUnionpayBankInfoCfg = json.rechangeUnionpayBankInfoCfg;
        this.hallPmdPoolLen = json.hallPmdPoolLen;
        this.hallWidgetCfg = json.hallWidgetCfg;
        this.hallGameListTagOffsetX = json.hallGameListTagOffsetX;
        this.hallGameListGapCfg = json.hallGameListGapCfg;
        this.hallGameListLineCfg = json.hallGameListLineCfg;
        // if(json.appPicConfig && json.appPicConfig != "" && !Global.Setting.isNewAppHotUpdate) //兼容两种app热更模式
        // {
        //     this.appPicConfig = json.appPicConfig
        // }
        //this.appPicConfig = json.appPicConfig
        this.infoSinerColors = json.infoSinerColors;
        Global.GameData.setGameIconResCfg(json.subGameResCfg);
    };
    Object.defineProperty(SkinConfig.prototype, "isRed", {
        get: function () {
            return this.skinType == SkinType.red;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SkinConfig.prototype, "isPurple", {
        get: function () {
            return this.skinType == SkinType.purple;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SkinConfig.prototype, "isBlue", {
        get: function () {
            return this.skinType == SkinType.blue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SkinConfig.prototype, "isFantasy", {
        get: function () {
            return this.skinType == SkinType.fantasy;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SkinConfig.prototype, "isDark", {
        get: function () {
            return this.skinType == SkinType.dark;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SkinConfig.prototype, "isGreen", {
        get: function () {
            return this.skinType == SkinType.green;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SkinConfig.prototype, "isLegend", {
        get: function () {
            return this.skinType == SkinType.legend;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SkinConfig.prototype, "isDarkgold", {
        get: function () {
            return this.skinType == SkinType.darkgold;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SkinConfig.prototype, "isBlue2", {
        get: function () {
            return this.skinType == SkinType.blue2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SkinConfig.prototype, "moduleCfg", {
        get: function () {
            var skinModule = this.curSkinMoudle;
            var cfg = null;
            if (skinModule) {
                cfg = skinModule.cfg;
            }
            return cfg;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SkinConfig.prototype, "curSkinMoudle", {
        get: function () {
            if (this.skinModule) {
                return this.skinModule;
            }
            var skinModule = null;
            switch (AppCfg_1.default.SKIN_TYPE) {
                case SkinType.green:
                    skinModule = new GreenSkinModuleCfg_1.default;
                    break;
                case SkinType.blue:
                    skinModule = new BlueSkinModuleCfg_1.default;
                    break;
                case SkinType.purple:
                    skinModule = new PurpleSkinModuleCfg_1.default;
                    break;
                case SkinType.dark:
                    skinModule = new DarkSkinModuleCfg_1.default;
                    break;
                case SkinType.red:
                    skinModule = new RedSkinModuleCfg_1.default;
                    break;
                case SkinType.fantasy:
                    skinModule = new FantasySkinModuleCfg_1.default;
                    break;
                case SkinType.legend:
                    skinModule = new LegendSkinModuleCfg_1.default;
                    break;
                case SkinType.darkgold:
                    skinModule = new DarkSkinModuleCfg_1.default;
                    break;
                case SkinType.blue2:
                    skinModule = new BlueSkinModuleCfg_1.default;
                    break;
                case SkinType.newBlue:
                    skinModule = new NewBlueSkinModuleCfg_1.default;
                    break;
                default:
                    break;
            }
            this.skinModule = skinModule;
            return skinModule;
        },
        enumerable: false,
        configurable: true
    });
    return SkinConfig;
}());
exports.default = SkinConfig;

cc._RF.pop();