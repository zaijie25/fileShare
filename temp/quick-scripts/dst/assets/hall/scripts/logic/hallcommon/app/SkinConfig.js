
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/app/SkinConfig.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXGFwcFxcU2tpbkNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzRUFBaUU7QUFFakUsb0VBQStEO0FBQy9ELDRDQUF1QztBQUN2Qyx3RUFBbUU7QUFDbkUsb0VBQStEO0FBQy9ELGtFQUE2RDtBQUM3RCwwRUFBcUU7QUFDckUsd0VBQW1FO0FBQ25FLDBFQUFxRTtBQUVyRSxJQUFZLFFBWVg7QUFaRCxXQUFZLFFBQVE7SUFFaEIsMkNBQVUsQ0FBQTtJQUNWLHVDQUFRLENBQUE7SUFDUixxQ0FBTyxDQUFBO0lBQ1AsdUNBQVEsQ0FBQTtJQUNSLDZDQUFXLENBQUE7SUFDWCx5Q0FBUyxDQUFBO0lBQ1QsMkNBQVUsQ0FBQTtJQUNWLCtDQUFZLENBQUE7SUFDWix5Q0FBUyxDQUFBO0lBQ1QsOENBQVksQ0FBQTtBQUNoQixDQUFDLEVBWlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFZbkI7QUFDRCxRQUFRO0FBQ1I7SUFBQTtRQUVvQixlQUFVLEdBQUcsd0JBQXdCLENBQUM7UUFFdEQsWUFBWTtRQUNMLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzVCLE1BQU07UUFDQyxhQUFRLEdBQWMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUM5QyxtQkFBbUI7UUFDWixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUMxQixtQkFBbUI7UUFDWixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUN4QixzQkFBc0I7UUFDZixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUN4QixZQUFZO1FBQ1osNENBQTRDO1FBQ3JDLHdCQUFtQixHQUFHLEVBQUUsQ0FBQztRQUN6QixnQ0FBMkIsR0FBRyxDQUFDLENBQUM7UUFDdkMsV0FBVztRQUNKLHlCQUFvQixHQUFHLENBQUMsQ0FBQztRQUNoQyxtQkFBbUI7UUFDWixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUd6Qix1Q0FBdUM7UUFDaEMsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBQ2hDLHVCQUF1QjtRQUNoQixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUMzQix1QkFBdUI7UUFDaEIsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFDNUIsd0JBQXdCO1FBQ2pCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUM3QiwrQ0FBK0M7UUFDeEMsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBRWhDLGNBQWM7UUFDUCxxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFFN0IsY0FBYztRQUNQLDJCQUFzQixHQUFHLEVBQUUsQ0FBQztRQUNuQyxlQUFlO1FBQ1Isa0NBQTZCLEdBQUcsRUFBRSxDQUFBO1FBRXpDLDRCQUE0QjtRQUNyQixnQ0FBMkIsR0FBRyxFQUFFLENBQUE7UUFDdkMsNkJBQTZCO1FBQ3RCLGdDQUEyQixHQUFHLEVBQUUsQ0FBQTtRQUV2QyxZQUFZO1FBQ1osbUVBQW1FO1FBQ25FLG1CQUFtQjtRQUNuQixXQUFXO1FBQ1gsZUFBZTtRQUNSLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUU3Qjs7V0FFRztRQUNJLG1CQUFjLEdBQUcsRUFBRSxDQUFBO1FBRTFCLFlBQVk7UUFDWixjQUFjO1FBQ2Qsc0JBQXNCO1FBQ2Ysc0JBQWlCLEdBQUcsRUFBRSxDQUFBO1FBRTdCLG9CQUFvQjtRQUNiLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLFFBQVE7UUFDRCxxQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDN0IsU0FBUztRQUNGLHdCQUFtQixHQUFHLEVBQUUsQ0FBQztRQUVoQyxxQ0FBcUM7UUFDOUIsNkJBQXdCLEdBQUcsRUFBRSxDQUFDO1FBRTlCLG9CQUFlLEdBQUcsRUFBRSxDQUFBO1FBZ0NuQixlQUFVLEdBQWlCLElBQUksQ0FBQTtJQTBPM0MsQ0FBQztJQXBQRyxzQkFBVyxvQ0FBWTthQUt2QjtZQUVJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQTtRQUM3QixDQUFDO2FBUkQsVUFBd0IsR0FBRztZQUV2QixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQTtRQUM1QixDQUFDOzs7T0FBQTtJQVNNLDBCQUFLLEdBQVo7UUFBQSxpQkFhQztRQVhHLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBQyxLQUFLLEVBQUUsU0FBUztZQUNoRCxJQUFHLEtBQUssSUFBSSxJQUFJLEVBQ2hCO2dCQUNJLEVBQUUsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDaEMsT0FBTzthQUNWO1lBQ0QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsS0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFFekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sbUNBQWMsR0FBckI7UUFFSSxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUE7UUFFckQsSUFBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFDNUI7WUFDSSxPQUFPLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ2pCO1FBQ0QsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUE7SUFFL0MsQ0FBQztJQUdNLDhDQUF5QixHQUFoQztRQUVJLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtRQUVyRCxJQUFHLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUMvQjtZQUNJLE9BQU8sQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLENBQUE7U0FDbEI7UUFDRCxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUVsRCxDQUFDO0lBRU0sd0NBQW1CLEdBQTFCO1FBRUksSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO1FBRXJELElBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQzVCO1lBQ0ksT0FBTyxDQUFDLENBQUE7U0FDWDtRQUNELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBRS9DLENBQUM7SUFDRDs7OztPQUlHO0lBQ0ksdUNBQWtCLEdBQXpCLFVBQTBCLElBQUk7UUFFMUIsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO1FBRXJELElBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQzNCO1lBQ0ksT0FBTyxDQUFDLENBQUE7U0FDWDtRQUNELE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBRXBELENBQUM7SUFFTSx3Q0FBbUIsR0FBMUI7UUFFSSxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUE7UUFFckQsSUFBRyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQ3ZCO1lBQ0ksT0FBTyxDQUFDLENBQUE7U0FDWDtRQUNELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUMxQyxDQUFDO0lBRU0scUNBQWdCLEdBQXZCO1FBRUksSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO1FBRXJELElBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUN0QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQTtTQUM1QjtRQUNELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBR08sZ0NBQVcsR0FBbkIsVUFBb0IsSUFBSTtRQUVwQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUV0QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDcEMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDcEQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztRQUN0RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDdEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztRQUNwRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ3BELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMxQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDNUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUM5QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ3BELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUM5QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNwQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQzlDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDcEQsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztRQUM5RCxNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUM1RCxJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDO1FBQ3hFLElBQUksQ0FBQywyQkFBMkIsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUM7UUFDcEUsMkRBQTJEO1FBQzNELElBQUksQ0FBQywyQkFBMkIsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUM7UUFDcEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN4QyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFBO1FBQ3pELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUE7UUFDakQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQTtRQUNuRCxzR0FBc0c7UUFDdEcsSUFBSTtRQUNKLDRDQUE0QztRQUM1QyxJQUFJO1FBQ0osdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQTtRQUMzQyxNQUFNLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUd6RCxDQUFDO0lBSUQsc0JBQVcsNkJBQUs7YUFBaEI7WUFFSSxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGdDQUFRO2FBQW5CO1lBRUksT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDNUMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw4QkFBTTthQUFqQjtZQUVJLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsaUNBQVM7YUFBcEI7WUFFSSxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUM3QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDhCQUFNO2FBQWpCO1lBRUksT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFDRCxzQkFBVywrQkFBTzthQUFsQjtZQUVJLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzNDLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsZ0NBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUM1QyxDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGtDQUFVO2FBQXJCO1lBRUksT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywrQkFBTzthQUFsQjtZQUVJLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzNDLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcsaUNBQVM7YUFBcEI7WUFDSSxJQUFJLFVBQVUsR0FBaUIsSUFBSSxDQUFDLGFBQWEsQ0FBQTtZQUNqRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUE7WUFDZCxJQUFJLFVBQVUsRUFBQztnQkFDWCxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQTthQUN2QjtZQUNELE9BQU8sR0FBRyxDQUFBO1FBQ2QsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxxQ0FBYTthQUF4QjtZQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDakIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFBO2FBQ3pCO1lBQ0QsSUFBSSxVQUFVLEdBQWtCLElBQUksQ0FBQztZQUNyQyxRQUFRLGdCQUFNLENBQUMsU0FBUyxFQUFFO2dCQUN0QixLQUFLLFFBQVEsQ0FBQyxLQUFLO29CQUNmLFVBQVUsR0FBRyxJQUFJLDRCQUFrQixDQUFBO29CQUNuQyxNQUFNO2dCQUNWLEtBQUssUUFBUSxDQUFDLElBQUk7b0JBQ2QsVUFBVSxHQUFHLElBQUksMkJBQWlCLENBQUE7b0JBQ2xDLE1BQU07Z0JBQ1YsS0FBSyxRQUFRLENBQUMsTUFBTTtvQkFDaEIsVUFBVSxHQUFHLElBQUksNkJBQW1CLENBQUE7b0JBQ3BDLE1BQU07Z0JBQ1YsS0FBSyxRQUFRLENBQUMsSUFBSTtvQkFDZCxVQUFVLEdBQUcsSUFBSSwyQkFBaUIsQ0FBQTtvQkFDbEMsTUFBTTtnQkFDVixLQUFLLFFBQVEsQ0FBQyxHQUFHO29CQUNiLFVBQVUsR0FBRyxJQUFJLDBCQUFnQixDQUFBO29CQUNqQyxNQUFNO2dCQUNWLEtBQUssUUFBUSxDQUFDLE9BQU87b0JBQ2pCLFVBQVUsR0FBRyxJQUFJLDhCQUFvQixDQUFBO29CQUNyQyxNQUFNO2dCQUNWLEtBQUssUUFBUSxDQUFDLE1BQU07b0JBQ2hCLFVBQVUsR0FBRyxJQUFJLDZCQUFtQixDQUFBO29CQUNwQyxNQUFNO2dCQUNWLEtBQUssUUFBUSxDQUFDLFFBQVE7b0JBQ2xCLFVBQVUsR0FBRyxJQUFJLDJCQUFpQixDQUFBO29CQUNsQyxNQUFNO2dCQUNWLEtBQUssUUFBUSxDQUFDLEtBQUs7b0JBQ2YsVUFBVSxHQUFHLElBQUksMkJBQWlCLENBQUE7b0JBQ2xDLE1BQU07Z0JBQ1YsS0FBSyxRQUFRLENBQUMsT0FBTztvQkFDakIsVUFBVSxHQUFHLElBQUksOEJBQW9CLENBQUE7b0JBQ3JDLE1BQU07Z0JBQ1Y7b0JBQ0ksTUFBTTthQUNiO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsT0FBTyxVQUFVLENBQUE7UUFDckIsQ0FBQzs7O09BQUE7SUFDTCxpQkFBQztBQUFELENBclZBLEFBcVZDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR3JlZW5Ta2luTW9kdWxlQ2ZnIGZyb20gXCIuLi9tb2R1bGVjZmcvR3JlZW5Ta2luTW9kdWxlQ2ZnXCI7XHJcbmltcG9ydCBNb2R1bGVDZmdCYXNlIGZyb20gXCIuLi9tb2R1bGVjZmcvTW9kdWxlQ2ZnQmFzZVwiO1xyXG5pbXBvcnQgQmx1ZVNraW5Nb2R1bGVDZmcgZnJvbSBcIi4uL21vZHVsZWNmZy9CbHVlU2tpbk1vZHVsZUNmZ1wiO1xyXG5pbXBvcnQgQXBwQ2ZnIGZyb20gXCIuLi8uLi9oYWxsL0FwcENmZ1wiO1xyXG5pbXBvcnQgUHVycGxlU2tpbk1vZHVsZUNmZyBmcm9tIFwiLi4vbW9kdWxlY2ZnL1B1cnBsZVNraW5Nb2R1bGVDZmdcIjtcclxuaW1wb3J0IERhcmtTa2luTW9kdWxlQ2ZnIGZyb20gXCIuLi9tb2R1bGVjZmcvRGFya1NraW5Nb2R1bGVDZmdcIjtcclxuaW1wb3J0IFJlZFNraW5Nb2R1bGVDZmcgZnJvbSBcIi4uL21vZHVsZWNmZy9SZWRTa2luTW9kdWxlQ2ZnXCI7XHJcbmltcG9ydCBGYW50YXN5U2tpbk1vZHVsZUNmZyBmcm9tIFwiLi4vbW9kdWxlY2ZnL0ZhbnRhc3lTa2luTW9kdWxlQ2ZnXCI7XHJcbmltcG9ydCBMZWdlbmRTa2luTW9kdWxlQ2ZnIGZyb20gXCIuLi9tb2R1bGVjZmcvTGVnZW5kU2tpbk1vZHVsZUNmZ1wiO1xyXG5pbXBvcnQgTmV3Qmx1ZVNraW5Nb2R1bGVDZmcgZnJvbSBcIi4uL21vZHVsZWNmZy9OZXdCbHVlU2tpbk1vZHVsZUNmZ1wiO1xyXG5cclxuZXhwb3J0IGVudW0gU2tpblR5cGVcclxue1xyXG4gICAgcHVycGxlID0gMSwgICAgIC8v57Sr6Imy55qu6IKkXHJcbiAgICBkYXJrID0gMiwgICAgICAgLy/mmpfph5FcclxuICAgIHJlZCA9IDMsICAgICAgICAvL+S4reWbvee6olxyXG4gICAgYmx1ZSA9IDQsICAgICAgIC8v6JOd6Imy55qu6IKkXHJcbiAgICBmYW50YXN5ID0gNSwgICAgLy/moqblubvok53nmq7ogqRcclxuICAgIGdyZWVuID0gNiAsICAgICAvL+e7v+iJslxyXG4gICAgbGVnZW5kID0gNyAsICAgIC8v5Lyg5aWH55qu6IKkXHJcbiAgICBkYXJrZ29sZCA9IDggLCAgLy/mtbflpJbpu5Hph5FcclxuICAgIGJsdWUyID0gOSAsICAgICAvL+iTneiJsjAy55qu6IKkXHJcbiAgICBuZXdCbHVlID0gMTAgLCAgICAgLy/mlrDlpKfljoVcclxufVxyXG4vL+earuiCpOmFjee9ruS/oeaBr1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTa2luQ29uZmlnIFxyXG57XHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgY29uZmlnUGF0aCA9IFwiaGFsbC9jb25maWcvc2tpbkNvbmZpZ1wiO1xyXG5cclxuICAgIC8v55qu6IKk6YWN572u5piv5ZCm5Yqg6L295a6M5oiQXHJcbiAgICBwdWJsaWMgbG9hZGVkRmluaXNoID0gZmFsc2U7XHJcbiAgICAvL+earuiCpOexu+Wei1xyXG4gICAgcHVibGljIHNraW5UeXBlIDogU2tpblR5cGUgPSBTa2luVHlwZS5mYW50YXN5O1xyXG4gICAgLy9sb2FkaW5n6L+H56iL5LitIHRpcHPmlbDnu4RcclxuICAgIHB1YmxpYyBsb2FkaW5nVGlwcyA9IG51bGw7XHJcbiAgICAvLyDlpLTlg4/lvaLnirYgMOS7o+ihqOaWueWktCAx5Luj6KGo5ZyG5aS0XHJcbiAgICBwdWJsaWMgaGVhZEltZ1NoYXBlID0gMDtcclxuICAgIC8vIOS7u+WKoeWuneeuseWKn+iDveaYr+WQpuWFs+mXrSAw5LiN5YWz6ZetIDHlhbPpl61cclxuICAgIHB1YmxpYyBpc1Rhc2tDbG9zZWQgPSAwO1xyXG4gICAgLy/muLjmiI/liJfooajnmoTlgY/np7vlgLzjgIIgXHJcbiAgICAvL+a4uOaIj+WIl+ihqOacieWPr+iDveS8muiiq+WFrOWRiuaMoeS9j++8jOmcgOimgea3u+WKoG9mZnNldOS/neivgem7mOiupOaDheWGtSDlhazlkYrkuI3kvJrpga7mjKHmuLjmiI/lm77moIfjgIJcclxuICAgIHB1YmxpYyBoYWxsR2FtZUxpc3RPZmZzZXRYID0gMTc7XHJcbiAgICBwdWJsaWMgaGFsbEdhbWVMaXN0VmVydGljYWxPZmZzZXRZID0gMDtcclxuICAgIC8v5pu06L+H5ri45oiP5oyJ6ZKueeWdkOagh1xyXG4gICAgcHVibGljIG1vcmVHYW1lQnRuUG9zaXRpb25ZID0gMDtcclxuICAgIC8v6LSi56We5YiwIGl0ZW3pl7TpmpnkuI5vZmZzZXRcclxuICAgIHB1YmxpYyBjb21taXNpb25DZmcgPSBbXTtcclxuICAgIC8vVmlw5Zu+6ZuG6Lev5b6EICDljIXlkKvlpLTlg4/moYYvdmlw562J57qnXHJcbiAgICBwdWJsaWMgcGxheWVySW5mb0F0bGFzUGF0aDtcclxuICAgIC8vV25kTXlTcHJlYWTkuK0g6aKG5Y+W6K6w5b2VeeWdkOaghyBb5q2j5bi45Z2Q5qCHLCDpmpDol4/pgoDor7flip/og73lnZDmoIddXHJcbiAgICBwdWJsaWMgbXlTcHJlYWRPcmdDaGdQb3NZcyA9IFtdO1xyXG4gICAgLy/ovaznm5jova7mkq3mloflrZfpopzoibIgIFvlkI3lrZfpopzoibLvvIzlpZblirHpopzoibJdXHJcbiAgICBwdWJsaWMgemh1YW5wYW5Db2xvcnMgPSBbXTtcclxuICAgIC8v5Liq5Lq65L+h5oGv6KOF5omu55WM6Z2iIOWktOWDjyBpdGVt6Ze06ZqU55qE5a696auYXHJcbiAgICBwdWJsaWMgemh1YW5nYmFuSGVhZFdIID0gW107XHJcbiAgICAvL+S4quS6uuS/oeaBr+ijheaJrueVjOmdoiDlpLTlg4/moYYgaXRlbemXtOmalOeahOWuvemrmFxyXG4gICAgcHVibGljIHpodWFuZ2Jhbkt1YW5nV0ggPSBbXTtcclxuICAgIC8v5YWF5YC86K6w5b2V5a2X5L2T6aKc6ImyICBb5YWF5YC85aSE55CG5LitLCDlhYXlgLzmiJDlip8sIOWFheWAvOWksei0pSwg5o+Q546w5oiQ5Yqf77yMIOaPkOeOsOWksei0pe+8jOWkhOeQhuS4rV1cclxuICAgIHB1YmxpYyByZWNvcmRpbmdJdGVtQ29sb3JzID0gW107XHJcblxyXG4gICAgLy/lhYXlgLzmoIfnrb7pobUg6L+U5Yip5Zu+5qCH5L2N572uXHJcbiAgICBwdWJsaWMgcmVjaGFyZ2VGYW5saVBvcyA9IFtdO1xyXG5cclxuICAgIC8v5YWF5YC85qCH562+6aG1IOi/lOWIqeWbvuagh+S9jee9rlxyXG4gICAgcHVibGljIGhhbGxHYW1lTGlzdFRhZ09mZnNldFggPSBbXTtcclxuICAgIC8v5q+P5pel6aaW5YWF6L+U5Yip5a2X5L2T6aKc6Imy5ZKM5aSn5bCPXHJcbiAgICBwdWJsaWMgZGFpbHlSZWNoYXJnZUZvbnRDb2xvckFuZFNpemUgPSBbXVxyXG5cclxuICAgIC8v6L2s6LSm5L+h5oGvIOa1t+WkluWFheWAvCDlpI3liLbmjInpkq7jgIHmj5DkuqTmjInpkq7jgIHmj5DnpLrmloflrZfphY3nva5cclxuICAgIHB1YmxpYyByZWNoYW5nZU92ZXJzZWFzQmFua0luZm9DZmcgPSB7fVxyXG4gICAgLy/ovazotKbkv6Hmga8g6ZO26KGM5Y2h5YWF5YC8IOWkjeWItuaMiemSruOAgeaPkOS6pOaMiemSruOAgeaPkOekuuaWh+Wtl+mFjee9rlxyXG4gICAgcHVibGljIHJlY2hhbmdlVW5pb25wYXlCYW5rSW5mb0NmZyA9IHt9XHJcblxyXG4gICAgLy/lhYXlgLznm7jlhbNpY29u6YWN572uXHJcbiAgICAvLzAgMSDkvY3lt6bkvqfmoIfnrb7pobXmlofmnKzvvIjpgInkuK0v5pyq6YCJ5Lit77yJ44CCICDntKvoibLkuLrlm77moIcg5YW25LuW5Li65paH5a2XICDntKvoibLlm77pm4blnKhpY29uIOWQjue7reWbvuagh+aUvuWIsHJlY2hhcmdlQ2FzaOS4rVxyXG4gICAgLy8yIOWFheWAvGxvYWRpbmfnlYzpnaLkuK3pl7Tlm77moIdcclxuICAgIC8vMyDmjInpkq7liJfooajkuIrlm77moIdcclxuICAgIC8v77yB77yB77yB6LWE5rqQ5L2N572u5bey57qi6Imy5Li65Y+C6ICDXHJcbiAgICBwdWJsaWMgcmVjaGFyZ2VJY29uc0NmZyA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6LeR6ams54Gv5rGg5a2Q6ZW/5bqmXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYWxsUG1kUG9vbExlbiA9IHt9XHJcblxyXG4gICAgLy92aXDlrqLmnI3lm77moIfphY3nva4gXHJcbiAgICAvL3vnsbvlnos6W+Wbvumbhu+8jOWbvuagh119XHJcbiAgICAvL0B0b2RvICDnu5/kuIDlhajlubPlj7Dot6/lvoQg5Yig6Zmk6K+l5a2X5q61XHJcbiAgICBwdWJsaWMgcmVjaGFyZ2VWaXBDb25maWcgPSB7fVxyXG5cclxuICAgIC8v6aKE5Yqg6L295pmu6YCa6LWE5rqQICBVSSBqc29uIOetiVxyXG4gICAgcHVibGljIHJlcXVpcmVMaXN0ID0gW107XHJcbiAgICAvL+eJueauiuWbvumbhuWKoOi9vVxyXG4gICAgcHVibGljIHJlcXVpcmVBdGxhc0xpc3QgPSBbXTtcclxuICAgIC8v5ri45oiP5Zu+5qCH6aKE5Yqg6L29XHJcbiAgICBwdWJsaWMgcmVxdWlyZUdhbWVJY29uTGlzdCA9IFtdO1xyXG5cclxuICAgIC8vV25kR2FtZU1haW50YWluVUkgICBbY29sb3JzdHIsc2l6ZV1cclxuICAgIHB1YmxpYyBtYWludGFpbkdhbWVDb2xvckFuZFNpemUgPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgaW5mb1NpbmVyQ29sb3JzID0gW11cclxuXHJcbiAgICBwdWJsaWMgb3JpZ25hbEFwcGNmZzphbnlcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWkp+WOhXdpZGdldOmAgumFjee7hOS7tuaVsOWAvOmFjee9rlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFsbFdpZGdldENmZzphbnlcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWkp+WOheWtkOa4uOaIj+WIl+ihqOihjOaVsOmFjee9rlxyXG4gICAgICovXHJcbiAgICBoYWxsR2FtZUxpc3RMaW5lQ2ZnOmFueVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aSn5Y6F5a2Q5ri45oiP5YiX6KGo6Ze06ZqZ6YWN572uXHJcbiAgICAgKi9cclxuICAgIGhhbGxHYW1lTGlzdEdhcENmZzphbnlcclxuICAgIFxyXG4gICAgLy/moLnmja7phY3nva7nmoTlm77niYfkv6Hmga9cclxuICAgIF9hcHBQaWNDb25maWcgOmFueSBcclxuXHJcbiAgICBwdWJsaWMgc2V0IGFwcFBpY0NvbmZpZyh2YWwpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fYXBwUGljQ29uZmlnID0gdmFsXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBhcHBQaWNDb25maWcoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBQaWNDb25maWdcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNraW5Nb2R1bGU6TW9kdWxlQ2ZnQmFzZSA9IG51bGxcclxuXHJcbiAgICBwdWJsaWMgc2V0dXAoKVxyXG4gICAge1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHRoaXMuY29uZmlnUGF0aCwgKGVycm9yLCBqc29uQXNzZXQpPT57XHJcbiAgICAgICAgICAgIGlmKGVycm9yICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNjLmVycm9yKFwi5Yqg6L29c2tpbkNvbmZpZ+Wksei0pe+8ge+8ge+8ge+8ge+8gVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBhcnNlQ29uZmlnKGpzb25Bc3NldC5qc29uKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZWRGaW5pc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50LmV2ZW50KEdsb2JhbEV2ZW50LlNraW5Db25maWdMb2FkRmluaXNoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTcGFjZU9mZnNldCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHN0b3JnZUhhbGwgPSBHbG9iYWwuY3VzdG9tQXBwLmdldEhhbGxCdW5kbGVOYW1lKClcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuaGFsbEdhbWVMaXN0T2Zmc2V0WClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBbMTcsNzBdXHJcbiAgICAgICAgfSBcclxuICAgICAgICByZXR1cm4gdGhpcy5oYWxsR2FtZUxpc3RPZmZzZXRYW3N0b3JnZUhhbGxdXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0SGFsbEdhbWVMaXN0VGFnT2Zmc2V0WCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHN0b3JnZUhhbGwgPSBHbG9iYWwuY3VzdG9tQXBwLmdldEhhbGxCdW5kbGVOYW1lKClcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuaGFsbEdhbWVMaXN0VGFnT2Zmc2V0WClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBbMTA1LDM3XVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFsbEdhbWVMaXN0VGFnT2Zmc2V0WFtzdG9yZ2VIYWxsXVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SGFsbEdhbWVMaXN0TGluZSgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHN0b3JnZUhhbGwgPSBHbG9iYWwuY3VzdG9tQXBwLmdldEhhbGxCdW5kbGVOYW1lKClcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuaGFsbEdhbWVMaXN0TGluZUNmZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAzXHJcbiAgICAgICAgfSBcclxuICAgICAgICByZXR1cm4gdGhpcy5oYWxsR2FtZUxpc3RMaW5lQ2ZnW3N0b3JnZUhhbGxdXHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB0eXBlIDAgeOi9tCAxIHnovbRcclxuICAgICAqIEByZXR1cm5zIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0SGFsbEdhbWVMaXN0R2FwKHR5cGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHN0b3JnZUhhbGwgPSBHbG9iYWwuY3VzdG9tQXBwLmdldEhhbGxCdW5kbGVOYW1lKClcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuaGFsbEdhbWVMaXN0R2FwQ2ZnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDNcclxuICAgICAgICB9IFxyXG4gICAgICAgIHJldHVybiB0aGlzLmhhbGxHYW1lTGlzdEdhcENmZ1tzdG9yZ2VIYWxsXVt0eXBlXVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0UGFvbWFkZW5nUG9vbExlbigpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHN0b3JnZUhhbGwgPSBHbG9iYWwuY3VzdG9tQXBwLmdldEhhbGxCdW5kbGVOYW1lKClcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuaGFsbFBtZFBvb2xMZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gM1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFsbFBtZFBvb2xMZW5bc3RvcmdlSGFsbF1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SGFsbFdpZGdldENmZygpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHN0b3JnZUhhbGwgPSBHbG9iYWwuY3VzdG9tQXBwLmdldEhhbGxCdW5kbGVOYW1lKClcclxuXHJcbiAgICAgICAgaWYoIXRoaXMuaGFsbFdpZGdldENmZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbGxXaWRnZXRDZmdcclxuICAgICAgICB9IFxyXG4gICAgICAgIHJldHVybiB0aGlzLmhhbGxXaWRnZXRDZmdbc3RvcmdlSGFsbF1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBwYXJzZUNvbmZpZyhqc29uKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc2tpblR5cGUgPSBqc29uLnNraW5UeXBlO1xyXG4gICAgICAgIHRoaXMubG9hZGluZ1RpcHMgPSBqc29uLmxvYWRpbmdUaXBzO1xyXG4gICAgICAgIHRoaXMuaGVhZEltZ1NoYXBlID0ganNvbi5oZWFkSW1nU2hhcGU7XHJcblxyXG4gICAgICAgIHRoaXMuaXNUYXNrQ2xvc2VkID0ganNvbi50YXNrQ2xvc2VkO1xyXG4gICAgICAgIFRhc2tNYW5hZ2VyLnNldFRhc2tFbmFibGUodGhpcy5pc1Rhc2tDbG9zZWQgPT0gMCk7XHJcblxyXG4gICAgICAgIHRoaXMuaGFsbEdhbWVMaXN0T2Zmc2V0WCA9IGpzb24uaGFsbEdhbWVMaXN0T2Zmc2V0WDtcclxuICAgICAgICB0aGlzLm1vcmVHYW1lQnRuUG9zaXRpb25ZID0ganNvbi5tb3JlR2FtZUJ0blBvc2l0aW9uWTtcclxuICAgICAgICB0aGlzLmNvbW1pc2lvbkNmZyA9IGpzb24uY29tbWlzaW9uQ2ZnO1xyXG4gICAgICAgIHRoaXMucGxheWVySW5mb0F0bGFzUGF0aCA9IGpzb24ucGxheWVySW5mb0F0bGFzUGF0aDtcclxuICAgICAgICB0aGlzLm15U3ByZWFkT3JnQ2hnUG9zWXMgPSBqc29uLm15U3ByZWFkT3JnQ2hnUG9zWXM7XHJcbiAgICAgICAgdGhpcy56aHVhbnBhbkNvbG9ycyA9IGpzb24uemh1YW5wYW5Db2xvcnM7XHJcbiAgICAgICAgdGhpcy56aHVhbmdiYW5IZWFkV0ggPSBqc29uLnpodWFuZ2JhbkhlYWRXSDtcclxuICAgICAgICB0aGlzLnpodWFuZ2Jhbkt1YW5nV0ggPSBqc29uLnpodWFuZ2Jhbkt1YW5nV0g7XHJcbiAgICAgICAgdGhpcy5yZWNvcmRpbmdJdGVtQ29sb3JzID0ganNvbi5yZWNvcmRpbmdJdGVtQ29sb3JzO1xyXG4gICAgICAgIHRoaXMucmVjaGFyZ2VGYW5saVBvcyA9IGpzb24ucmVjaGFyZ2VGYW5saVBvcztcclxuICAgICAgICB0aGlzLnJlY2hhcmdlSWNvbnNDZmcgPSBqc29uLnJlY2hhcmdlSWNvbnNDZmc7XHJcbiAgICAgICAgdGhpcy5yZWNoYXJnZVZpcENvbmZpZyA9IGpzb24ucmVjaGFyZ2VWaXBDb25maWc7XHJcbiAgICAgICAgdGhpcy5yZXF1aXJlTGlzdCA9IGpzb24ucmVxdWlyZUxpc3Q7XHJcbiAgICAgICAgdGhpcy5yZXF1aXJlQXRsYXNMaXN0ID0ganNvbi5yZXF1aXJlQXRsYXNMaXN0O1xyXG4gICAgICAgIHRoaXMucmVxdWlyZUdhbWVJY29uTGlzdCA9IGpzb24ucmVxdWlyZUdhbWVJY29uTGlzdDtcclxuICAgICAgICB0aGlzLm1haW50YWluR2FtZUNvbG9yQW5kU2l6ZSA9IGpzb24ubWFpbnRhaW5HYW1lQ29sb3JBbmRTaXplO1xyXG4gICAgICAgIEdsb2JhbC5TZXR0aW5nLm5lZWRIYWxsQ2hvb3NlUm9vbSA9IGpzb24ubmVlZEhhbGxDaG9vc2VSb29tO1xyXG4gICAgICAgIHRoaXMuZGFpbHlSZWNoYXJnZUZvbnRDb2xvckFuZFNpemUgPSBqc29uLmRhaWx5UmVjaGFyZ2VGb250Q29sb3JBbmRTaXplO1xyXG4gICAgICAgIHRoaXMucmVjaGFuZ2VPdmVyc2Vhc0JhbmtJbmZvQ2ZnID0ganNvbi5yZWNoYW5nZU92ZXJzZWFzQmFua0luZm9DZmc7XHJcbiAgICAgICAgLy9HbG9iYWwuU2V0dGluZy5pc05ld0FwcEhvdFVwZGF0ZSA9IGpzb24uaXNOZXdBcHBIb3RVcGRhdGVcclxuICAgICAgICB0aGlzLnJlY2hhbmdlVW5pb25wYXlCYW5rSW5mb0NmZyA9IGpzb24ucmVjaGFuZ2VVbmlvbnBheUJhbmtJbmZvQ2ZnO1xyXG4gICAgICAgIHRoaXMuaGFsbFBtZFBvb2xMZW4gPSBqc29uLmhhbGxQbWRQb29sTGVuO1xyXG4gICAgICAgIHRoaXMuaGFsbFdpZGdldENmZyA9IGpzb24uaGFsbFdpZGdldENmZztcclxuICAgICAgICB0aGlzLmhhbGxHYW1lTGlzdFRhZ09mZnNldFggPSBqc29uLmhhbGxHYW1lTGlzdFRhZ09mZnNldFhcclxuICAgICAgICB0aGlzLmhhbGxHYW1lTGlzdEdhcENmZyA9IGpzb24uaGFsbEdhbWVMaXN0R2FwQ2ZnXHJcbiAgICAgICAgdGhpcy5oYWxsR2FtZUxpc3RMaW5lQ2ZnID0ganNvbi5oYWxsR2FtZUxpc3RMaW5lQ2ZnXHJcbiAgICAgICAgLy8gaWYoanNvbi5hcHBQaWNDb25maWcgJiYganNvbi5hcHBQaWNDb25maWcgIT0gXCJcIiAmJiAhR2xvYmFsLlNldHRpbmcuaXNOZXdBcHBIb3RVcGRhdGUpIC8v5YW85a655Lik56eNYXBw54Ot5pu05qih5byPXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmFwcFBpY0NvbmZpZyA9IGpzb24uYXBwUGljQ29uZmlnXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vdGhpcy5hcHBQaWNDb25maWcgPSBqc29uLmFwcFBpY0NvbmZpZ1xyXG4gICAgICAgIHRoaXMuaW5mb1NpbmVyQ29sb3JzID0ganNvbi5pbmZvU2luZXJDb2xvcnNcclxuICAgICAgICBHbG9iYWwuR2FtZURhdGEuc2V0R2FtZUljb25SZXNDZmcoanNvbi5zdWJHYW1lUmVzQ2ZnKVxyXG4gICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNSZWQoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNraW5UeXBlID09IFNraW5UeXBlLnJlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzUHVycGxlKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5za2luVHlwZSA9PSBTa2luVHlwZS5wdXJwbGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc0JsdWUoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNraW5UeXBlID09IFNraW5UeXBlLmJsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc0ZhbnRhc3koKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNraW5UeXBlID09IFNraW5UeXBlLmZhbnRhc3k7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc0RhcmsoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNraW5UeXBlID09IFNraW5UeXBlLmRhcms7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzR3JlZW4oKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNraW5UeXBlID09IFNraW5UeXBlLmdyZWVuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNMZWdlbmQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5za2luVHlwZSA9PSBTa2luVHlwZS5sZWdlbmQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc0Rhcmtnb2xkKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5za2luVHlwZSA9PSBTa2luVHlwZS5kYXJrZ29sZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzQmx1ZTIoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNraW5UeXBlID09IFNraW5UeXBlLmJsdWUyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBtb2R1bGVDZmcoKXtcclxuICAgICAgICBsZXQgc2tpbk1vZHVsZTpNb2R1bGVDZmdCYXNlID0gdGhpcy5jdXJTa2luTW91ZGxlXHJcbiAgICAgICAgbGV0IGNmZyA9IG51bGxcclxuICAgICAgICBpZiAoc2tpbk1vZHVsZSl7XHJcbiAgICAgICAgICAgIGNmZyA9IHNraW5Nb2R1bGUuY2ZnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjZmdcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGN1clNraW5Nb3VkbGUoKTogTW9kdWxlQ2ZnQmFzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2tpbk1vZHVsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5za2luTW9kdWxlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBza2luTW9kdWxlOiBNb2R1bGVDZmdCYXNlID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2ggKEFwcENmZy5TS0lOX1RZUEUpIHtcclxuICAgICAgICAgICAgY2FzZSBTa2luVHlwZS5ncmVlbjpcclxuICAgICAgICAgICAgICAgIHNraW5Nb2R1bGUgPSBuZXcgR3JlZW5Ta2luTW9kdWxlQ2ZnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2luVHlwZS5ibHVlOlxyXG4gICAgICAgICAgICAgICAgc2tpbk1vZHVsZSA9IG5ldyBCbHVlU2tpbk1vZHVsZUNmZ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpblR5cGUucHVycGxlOlxyXG4gICAgICAgICAgICAgICAgc2tpbk1vZHVsZSA9IG5ldyBQdXJwbGVTa2luTW9kdWxlQ2ZnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2luVHlwZS5kYXJrOlxyXG4gICAgICAgICAgICAgICAgc2tpbk1vZHVsZSA9IG5ldyBEYXJrU2tpbk1vZHVsZUNmZ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpblR5cGUucmVkOlxyXG4gICAgICAgICAgICAgICAgc2tpbk1vZHVsZSA9IG5ldyBSZWRTa2luTW9kdWxlQ2ZnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2luVHlwZS5mYW50YXN5OlxyXG4gICAgICAgICAgICAgICAgc2tpbk1vZHVsZSA9IG5ldyBGYW50YXN5U2tpbk1vZHVsZUNmZ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpblR5cGUubGVnZW5kOlxyXG4gICAgICAgICAgICAgICAgc2tpbk1vZHVsZSA9IG5ldyBMZWdlbmRTa2luTW9kdWxlQ2ZnXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTa2luVHlwZS5kYXJrZ29sZDpcclxuICAgICAgICAgICAgICAgIHNraW5Nb2R1bGUgPSBuZXcgRGFya1NraW5Nb2R1bGVDZmdcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNraW5UeXBlLmJsdWUyOlxyXG4gICAgICAgICAgICAgICAgc2tpbk1vZHVsZSA9IG5ldyBCbHVlU2tpbk1vZHVsZUNmZ1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2tpblR5cGUubmV3Qmx1ZTpcclxuICAgICAgICAgICAgICAgIHNraW5Nb2R1bGUgPSBuZXcgTmV3Qmx1ZVNraW5Nb2R1bGVDZmdcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2tpbk1vZHVsZSA9IHNraW5Nb2R1bGU7XHJcbiAgICAgICAgcmV0dXJuIHNraW5Nb2R1bGVcclxuICAgIH1cclxufSJdfQ==