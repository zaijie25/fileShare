
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hallcommon/app/CustomApp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '34ae0Cl00RKdItTdVATCbL4', 'CustomApp');
// hall/scripts/logic/hallcommon/app/CustomApp.ts

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BTNINDEX = void 0;
var HallStorageKey_1 = require("../const/HallStorageKey");
var CustomAppInfo = /** @class */ (function () {
    function CustomAppInfo() {
        this.appConfig = {
            //字段不设置，使用默认值；字段为空string，表示不显示
            //{bgmName:"bgm",loadingBg:"loadingBg", loginBg:"loginBg", logo:"logo", spreedBg:"spreedBg",showLoadingEff:false}
            588: { loginBg: "lgBg.jpg", showLoadingEff: true, "logo": "logo.png" },
            1003: { loadingBg: "loadingBg.png", spreedBg: "spreedBg.png", loginBg: "lgBg.jpg", showLoadingEff: true, "logo": "logo.png" },
        };
        this.bgmName = "bgm.mp3";
        //热更界面背景图
        this.loadingBg = "loadingBg.jpg";
        //登录/hallLoading背景图
        this.loginBg = "loadingBg.jpg";
        //大厅背景图
        this.hallBg = "hallBg.jpg";
        //马甲包背景图
        this.majiabao_loadingBg = "loadingBgBack.jpg";
        //showloginBg 为true时  使用lgBg,
        this.defaultLgBg = "lgBg.jpg";
        this.defaultLogo = "logo.png";
        this.appCfg = "";
        //logo图标
        // public logo = "";
        //推广背景图
        this.spreedBg = "spreedBg.jpg";
        //loading界面是否显示特效
        this.showLoadingEff = false;
        //是否显示登录特效 平台定制
        this.showLoginEff = false;
        //登录特效名字
        this.lgEffectName = "lgEffect";
        //登录特效动画
        this.lgEffectAnimName = "idle";
        this.filePathMap = {};
        this.appId = null;
        this.isHallChanged = false;
        /**
         * 加载界面需要替换的图
         * tipsBg 温馨提示底图
         * progressBar 进度条
         * progressBarBg 进度条地图
         */
        this.loading = {
            "tipsBg": "tsy_di.png",
            "progressBar": "jdt_jdu.png",
            "progressBarBg": "jdt_di.png",
            "checkNode": "tsy_zibj.png",
            "restore": "xin_xiufu.png",
            "loading_04": "jz_05.png",
        };
        /**
         *  登录需要替换的切图
         * registBtn 注册按钮
         * officalBtn 官网按钮
         * serviceBtn 客服按钮
         * vistorLoginBtn 游客登陆按钮
         * wxLoginBtn 微信登录按钮
         * phoneLoginBtn 手机登录按钮
         */
        this.login = {
            "registBtn": "button_sjzc.png",
            "officalBtn": "button_guanwang.png",
            "serviceBtn": "button_kefu.png",
            "vistorLoginBtn": "button_youke.png",
            "wxLoginBtn": "button_weixin.png",
            "phoneLoginBtn": "button_shouji.png"
        };
    }
    CustomAppInfo.prototype.getIsHallChanged = function () {
        return this.isHallChanged;
    };
    CustomAppInfo.prototype.initConfig = function () {
        // let appId = this.getAppID();
        // let config = Global.Setting.SkinConfig.appPicConfig ? Global.Setting.SkinConfig.appPicConfig[appId]: null
        // //默认用688配置
        // if(config != null)
        // {
        //     for(let key in config)
        //     {
        //         this[key] = config[key];
        //     }
        //     return
        // }
        this.showLoginEff = this.getFilePath(this.lgEffectName + ".atlas", this.getAppID()) != ""
            && this.getFilePath(this.lgEffectName + ".json", this.getAppID()) != ""
            && this.getFilePath(this.lgEffectName + ".png", this.getAppID()) != "";
        if (this.showLoginEff) {
            this.loginBg = this.defaultLgBg;
        }
    };
    //预加载背景图
    CustomAppInfo.prototype.preload = function (callback) {
        if (!cc.sys.isNative) {
            callback();
            return;
        }
        this.InitOrignalAppconfig();
        var appid = this.getAppID();
        var appCfg = this.getAppConfigFileName(appid);
        var arr = [];
        if (this.loadingBg && this.loadingBg != "")
            arr.push(this.loadingBg);
        if (appCfg && appCfg != "")
            arr.push(appCfg);
        if (this.defaultLgBg && this.defaultLgBg != "")
            arr.push(this.defaultLgBg);
        if (this.hallBg && this.hallBg != "")
            arr.push(this.hallBg);
        // if(this.logo && this.logo != "")
        //     arr.push(this.logo);
        if (this.bgmName && this.bgmName != "")
            arr.push(this.bgmName);
        if (this.showLoginEff && this.lgEffectName && this.lgEffectName != "") {
            arr.push([this.lgEffectName + ".json", "txt"]);
            arr.push(this.lgEffectName + ".png");
            arr.push([this.lgEffectName + ".atlas", "txt"]);
        }
        for (var key in this.login) {
            if (this.login.hasOwnProperty(key)) {
                arr.push(this.login[key]);
            }
        }
        for (var key in this.loading) {
            if (this.loading.hasOwnProperty(key)) {
                arr.push(this.loading[key]);
            }
        }
        var counter = 0;
        var _loop_1 = function (i) {
            var path = "";
            var type = null;
            if (Array.isArray(arr[i])) {
                path = this_1.getFilePath(arr[i][0], appid);
                type = arr[i][1];
            }
            else
                path = this_1.getFilePath(arr[i], appid);
            if (path != "") {
                counter++;
                if (arr[i] == appCfg) {
                    cc.loader.load(path, function (error, jsonAsset) {
                        counter--;
                        if (error != null) {
                            Logger.error("加载skinConfig失败！！！！！" + error.message);
                            Logger.error("path！！！！！" + path);
                        }
                        if (jsonAsset) {
                            Global.Setting.SkinConfig.appPicConfig = jsonAsset;
                        }
                        if (counter <= 0) {
                            if (callback) {
                                callback();
                            }
                        }
                    });
                    return "continue";
                }
                cc.loader.load({ url: path, type: type }, function (error, res) {
                    if (error != null) {
                        Logger.error("加载资源失败", path);
                    }
                    counter--;
                    if (counter <= 0) {
                        if (callback) {
                            callback();
                        }
                    }
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < arr.length; i++) {
            _loop_1(i);
        }
        if (counter == 0) {
            if (callback) {
                callback();
            }
        }
    };
    CustomAppInfo.prototype.getAppConfigFileName = function (appid) {
        var oldFileName = cc.js.formatStr("%s.json", appid);
        var newFileName = "config.json";
        var oldFilePath = this.getFilePath(oldFileName, appid);
        var newFilePath = this.getFilePath(newFileName, appid);
        if (jsb.fileUtils.isFileExist(oldFilePath)) {
            return oldFileName;
        }
        if (jsb.fileUtils.isFileExist(newFilePath)) {
            return newFileName;
        }
        return newFileName;
    };
    CustomAppInfo.prototype.checkIsHotUpdateFileExist = function (appid) {
        //先判断热更目录下是否有文件
        var hotupdatePath = Global.HotUpdateManager.updateHelper.genStoragePath("hall") + "/app/" + appid;
        return jsb.fileUtils.isDirectoryExist(hotupdatePath);
    };
    /**
     * 获取当前appid合服后此ID与随包APPID不一致
     */
    CustomAppInfo.prototype.getCustomAppID = function () {
        var appId = 0;
        var localAppid = Global.Setting.storage.getNumber(HallStorageKey_1.default.AppID, -1);
        if (localAppid != -1) {
            this.appId = localAppid;
            return this.appId;
        }
        if (Global.Setting.AppConfig && Global.Setting.AppConfig.appid) {
            this.appId = Global.Setting.appId;
            return this.appId;
        }
        if (Global.Setting.SystemInfo.appID) {
            this.appId = Global.Setting.SystemInfo.appID;
            return this.appId;
        }
    };
    CustomAppInfo.prototype.InitOrignalAppconfig = function () {
        var appid = Global.Setting.SystemInfo.appID;
        var appCfg = this.getAppConfigFileName(appid);
        var path = this.getFilePath(appCfg, appid);
        if (path != "") {
            cc.loader.load(path, function (error, jsonAsset) {
                if (error != null) {
                    Logger.error("加载skinConfig失败！！！！！" + error.message);
                    Logger.error("path！！！！！" + path);
                }
                if (jsonAsset) {
                    Global.Setting.SkinConfig.orignalAppcfg = jsonAsset;
                    var storgeHall = Global.Setting.storage.get("HALLSTYLE");
                    if (!storgeHall) {
                        Global.Setting.storage.set("HALLSTYLE", jsonAsset["hallStyle"]);
                    }
                }
            });
        }
    };
    CustomAppInfo.prototype.AsyncInitOrignalAppconfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var appid = Global.Setting.SystemInfo.appID;
                        var appCfg = _this.getAppConfigFileName(appid);
                        var path = _this.getFilePath(appCfg, appid);
                        if (path != "") {
                            cc.loader.load(path, function (error, jsonAsset) {
                                if (error) {
                                    Logger.error("加载skinConfig失败！！！！！" + error.message);
                                    Logger.error("path！！！！！" + path);
                                    reject(error);
                                }
                                else {
                                    Global.Setting.SkinConfig.orignalAppcfg = jsonAsset;
                                    var storgeHall = Global.Setting.storage.get("HALLSTYLE");
                                    if (storgeHall && storgeHall != jsonAsset["hallStyle"]) {
                                        Global.Setting.storage.set("HALLSTYLE", jsonAsset["hallStyle"]);
                                        _this.isHallChanged = true;
                                    }
                                    resolve(jsonAsset);
                                }
                            });
                        }
                        else {
                            reject(null);
                        }
                    })];
            });
        });
    };
    /**
     * 获取实际需要预加载资源的appid
     */
    CustomAppInfo.prototype.getAppID = function () {
        var appid = Global.customApp.getCustomAppID();
        if (Global.Toolkit.checkMegeServer() && !Global.customApp.checkIsHotUpdateFileExist(appid)) {
            appid = Global.Setting.SystemInfo.appID;
        }
        return appid;
    };
    CustomAppInfo.prototype.getAppConfig = function () {
        // let appid = this.getAppID()
        // let config = null
        // if(!Global.Setting.isNewAppHotUpdate)
        // {
        //     config = Global.Setting.SkinConfig.appPicConfig ? Global.Setting.SkinConfig.appPicConfig[appid]: null
        //     return config
        // }
        return Global.Setting.SkinConfig.appPicConfig;
    };
    CustomAppInfo.prototype.getAppBaseFolder = function () {
        return Global.HotUpdateManager.updateHelper.genStoragePath("hall") + "/app/";
    };
    // public getBgmPath()
    // {
    //     if(!cc.sys.isNative)
    //         return "";
    //     return this.getFilePath(this.bgmName, this.getAppID());
    // }
    //appid为data中的
    //nativeAppid为包里的appid   避免更换appid时出问题
    CustomAppInfo.prototype.getFilePath = function (fileName, appid, nativeAppid) {
        if (nativeAppid === void 0) { nativeAppid = null; }
        if (!cc.sys.isNative)
            return "";
        if (nativeAppid == null)
            nativeAppid = appid;
        if (this.filePathMap[fileName]) {
            return this.filePathMap[fileName];
        }
        //先判断热更目录下是否有文件
        var hotupdatePath = Global.HotUpdateManager.updateHelper.genStoragePath("hall") + "/app/" + appid + "/";
        var hotupdateFullPath = hotupdatePath + fileName;
        if (jsb.fileUtils.isFileExist(hotupdateFullPath)) {
            this.filePathMap[fileName] = hotupdateFullPath;
            return hotupdateFullPath;
        }
        //关闭合服，直接切AppID的情况，如果下载的资源里面没有则用皮肤自带的
        if (Global.Setting.isCloseMegeServer) {
            return "";
        }
        //走随包AppID里面的资源
        var packageAppid = Global.Setting.SystemInfo.appID;
        //获取原生资源路径文件夹
        var nativeFullPath = "app/" + packageAppid + "/" + fileName;
        if (jsb.fileUtils.isFileExist(nativeFullPath)) {
            nativeFullPath = jsb.fileUtils.fullPathForFilename(nativeFullPath);
            this.filePathMap[fileName] = nativeFullPath;
            Logger.error("use native path", nativeFullPath);
            return nativeFullPath;
        }
        return "";
    };
    //加载loading界面资源
    CustomAppInfo.prototype.loadLoadingBg = function (bgSp) {
        if (!cc.sys.isNative)
            return;
        //获取原生资源路径文件夹
        var nativeFullPath = this.majiabao_loadingBg;
        if (jsb.fileUtils.isFileExist(nativeFullPath)) {
            this.loadMaJiaBaoLoaingBg(bgSp, nativeFullPath);
        }
        else {
            this.loadSprite(bgSp, this.loadingBg);
        }
    };
    CustomAppInfo.prototype.loadingLoginPics = function (btnContainer) {
        if (!cc.sys.isNative) {
            return;
        }
        if (!btnContainer) {
            return;
        }
        var config = this.getAppConfig();
        var needChange = config && !config["showDefaut"]; //默认按钮有特效 新配置的没有 如果需要配置需要隐藏特效
        var regist = cc.find("RegistBtn", btnContainer).getComponent(cc.Sprite);
        var offical = cc.find("gnx_guanwang", btnContainer).getComponent(cc.Sprite);
        var service = cc.find("gnx_kefu", btnContainer).getComponent(cc.Sprite);
        var vistor = cc.find("guestBtn", btnContainer).getComponent(cc.Sprite);
        if (vistor && vistor.node) {
            var defaultNode = cc.find("defaut", vistor.node); // 默认按钮有特效
            if (defaultNode && needChange) {
                defaultNode.active = false;
            }
            this.loadSprite(vistor, this.login.vistorLoginBtn);
        }
        var wechat = cc.find("wxBtn", btnContainer).getComponent(cc.Sprite);
        if (wechat && wechat.node) {
            var defaultNode = cc.find("defaut", wechat.node);
            if (defaultNode && needChange) {
                defaultNode.active = false;
            }
            this.loadSprite(wechat, this.login.wxLoginBtn);
        }
        var phone = cc.find("phoneBtn", btnContainer).getComponent(cc.Sprite);
        if (phone && phone.node) {
            var defaultNode = cc.find("defaut", phone.node);
            if (defaultNode && needChange) {
                defaultNode.active = false;
            }
            this.loadSprite(phone, this.login.phoneLoginBtn);
        }
        this.loadSprite(regist, this.login.registBtn);
        this.loadSprite(offical, this.login.officalBtn);
        this.loadSprite(service, this.login.serviceBtn);
    };
    /**
     *
     *  "appPicConfig": {
        "588": {
            "showLoginEff":false,
            "registBtnPos":[-538,295],
            "serviceBtnPos":[-440,295],
            "officalBtnPos":[-342,295],
            "vistorLoginBtnPos":[375,5],
            "wechatLoginBtnPos":[375,-123],
            "phoneLoginBtnPos":[375,-250],
            "layout":0
                
        }
    }
     *
     */
    CustomAppInfo.prototype.ChangeLoadingTxtColorAndFontSize = function (txt, infolabel, versionLabel) {
        var config = this.getAppConfig();
        if (config) {
            if (txt) {
                if (config.txtColor) {
                    txt.node.color = new cc.Color().fromHEX(config.txtColor);
                }
                if (config.txtFontSize) {
                    txt.fontSize = config.txtFontSize;
                }
            }
            if (infolabel) {
                if (config.infoLabelColor) {
                    infolabel.node.color = new cc.Color().fromHEX(config.infoLabelColor);
                }
                if (config.infoLabelFontSize) {
                    infolabel.fontSize = config.infoLabelFontSize;
                }
            }
            if (versionLabel) {
                if (config.versionLabelColor) {
                    versionLabel.node.color = new cc.Color().fromHEX(config.versionLabelColor);
                }
                if (config.versionLabelFontSize) {
                    versionLabel.fontSize = config.versionLabelFontSize;
                }
            }
        }
    };
    CustomAppInfo.prototype.setOfficalBtnPos = function (officalBtn, kefuBtn) {
        var config = this.getAppConfig();
        if (config && officalBtn && config.loadingOfficalBtnPos) {
            officalBtn.setPosition((cc.v2(config.loadingOfficalBtnPos[0], config.loadingOfficalBtnPos[1])));
        }
        if (config && kefuBtn && config.loadingkefuBtnPos) {
            kefuBtn.setPosition((cc.v2(config.loadingkefuBtnPos[0], config.loadingkefuBtnPos[1])));
        }
    };
    CustomAppInfo.prototype.ChangeLoadingPosCfg = function (tipsBg, loadingBar, checkNode, restoreNode) {
        if (restoreNode === void 0) { restoreNode = null; }
        var config = this.getAppConfig();
        if (config) {
            if (tipsBg && config.tipsBgPos) {
                tipsBg.setPosition((cc.v2(config.tipsBgPos[0], config.tipsBgPos[1])));
            }
            if (loadingBar && config.loadingBarPos) {
                loadingBar.setPosition((cc.v2(config.loadingBarPos[0], config.loadingBarPos[1])));
            }
            if (restoreNode && config.restorePos) {
                restoreNode.setPosition((cc.v2(config.restorePos[0], config.restorePos[1])));
            }
            if (checkNode && config.checkNodePos) {
                var checkSp_1 = checkNode.getComponent(cc.Sprite);
                if (checkSp_1) {
                    this.loadSprite(checkSp_1, this.loading.checkNode, function (height) {
                        checkSp_1.spriteFrame.insetLeft = 150;
                        checkSp_1.spriteFrame.insetRight = 150;
                        checkSp_1.node.height = height;
                        checkSp_1.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                        checkSp_1.type = cc.Sprite.Type.SLICED;
                    });
                }
                checkNode.setPosition((cc.v2(config.checkNodePos[0], config.checkNodePos[1])));
            }
        }
    };
    //加载提示背景 进度条
    CustomAppInfo.prototype.loadLoadingPics = function (tipsBg, bar, bar1, checkNode, loading_04, officalBtn, restore, kefuBtn, maskNode) {
        if (restore === void 0) { restore = null; }
        if (kefuBtn === void 0) { kefuBtn = null; }
        if (maskNode === void 0) { maskNode = null; }
        if (!cc.sys.isNative) {
            return;
        }
        var config = this.getAppConfig();
        if (this.loading) {
            this.loadSprite(tipsBg, this.loading.tipsBg, function (height) {
                tipsBg.spriteFrame.insetLeft = 200;
                tipsBg.spriteFrame.insetRight = 200;
                tipsBg.node.height = height;
                tipsBg.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                tipsBg.type = cc.Sprite.Type.SLICED;
            });
            this.loadSprite(bar, this.loading.progressBarBg, function (height) {
                bar.spriteFrame.insetLeft = 30;
                bar.spriteFrame.insetRight = 30;
                bar.node.height = height;
                bar.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                bar.type = cc.Sprite.Type.SLICED;
            });
            //全屏适配
            if (config && config.fullScreen && bar1 && bar && cc.isValid(bar1.node) && cc.isValid(bar.node)) {
                bar1.node.width = cc.Canvas.instance.node.width;
                bar.node.width = cc.Canvas.instance.node.width;
                bar.node.setPosition(cc.v2(-0.5 * bar.node.width, bar.node.position.y));
                bar1.node.setPosition(cc.v2(-0.5 * bar1.node.width, bar1.node.position.y));
                var progressBar = bar1.node.getComponent(cc.ProgressBar);
                if (progressBar) {
                    progressBar.totalLength = cc.Canvas.instance.node.width;
                }
            }
            this.loadSprite(bar1, this.loading.progressBar, function (height) {
                bar1.spriteFrame.insetLeft = 30;
                bar1.spriteFrame.insetRight = 30;
                bar1.node.height = height;
                bar1.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                bar1.type = cc.Sprite.Type.SLICED;
            });
            if (restore) {
                this.loadSprite(restore, this.loading.restore);
            }
            this.loadSprite(checkNode, this.loading.checkNode, function (height) {
                checkNode.node.height = height;
            });
            this.loadSprite(loading_04, this.loading.loading_04, function (height) {
                loading_04.spriteFrame.insetLeft = 3;
                loading_04.spriteFrame.insetRight = 3;
                loading_04.node.height = height;
                loading_04.node.width = cc.Canvas.instance.node.width;
                loading_04.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                loading_04.type = cc.Sprite.Type.SLICED;
            });
            this.loadSprite(officalBtn, this.login.officalBtn);
            if (kefuBtn) {
                this.loadSprite(kefuBtn, this.login.serviceBtn);
            }
        }
    };
    //加载Banner界面资源
    CustomAppInfo.prototype.loadBannerBg = function (bgSp, name, callback) {
        var path = this.getFilePath(name, this.getAppID());
        if (path) {
            this.loadSprite(bgSp, name, callback);
        }
        else {
            if (callback) {
                callback();
            }
        }
    };
    //登录背景/hallscene背景
    CustomAppInfo.prototype.loadLoginBg = function (bgSp) {
        var config = this.getAppConfig();
        //默认用688配置
        if (config != null) {
            if (config.loginBg) {
                this.loadSprite(bgSp, config.loginBg);
                return;
            }
        }
        this.loadSprite(bgSp, this.loginBg);
    };
    //登录背景/hallscene背景
    CustomAppInfo.prototype.loadHallBg = function (bgSp) {
        this.loadSprite(bgSp, this.hallBg);
    };
    CustomAppInfo.prototype.loadSpreedBg = function (bgSp) {
        this.loadSprite(bgSp, this.spreedBg);
    };
    CustomAppInfo.prototype.loadMaJiaBaoLoaingBg = function (bgSp, nativeFullPath) {
        nativeFullPath = jsb.fileUtils.fullPathForFilename(nativeFullPath);
        this.filePathMap[this.majiabao_loadingBg] = nativeFullPath;
        var texture = cc.loader.getRes(nativeFullPath);
        if (texture != null) {
            if (bgSp && bgSp.node.isValid) {
                bgSp.spriteFrame = new cc.SpriteFrame(texture);
            }
        }
        else {
            cc.loader.load(nativeFullPath, function (error, texture) {
                if (error != null)
                    return;
                if (bgSp && bgSp.node.isValid) {
                    bgSp.spriteFrame = new cc.SpriteFrame(texture);
                }
            });
        }
    };
    CustomAppInfo.prototype.loadLoginEffect = function (effectNode) {
        if (!cc.sys.isNative)
            return;
        if (effectNode == null)
            return;
        if (!this.showLoginEff)
            return;
        var ske = effectNode.getComponent(sp.Skeleton);
        if (ske == null)
            return;
        var atlasPath = this.getFilePath(this.lgEffectName + ".atlas", this.getAppID());
        var pngPath = this.getFilePath(this.lgEffectName + ".png", this.getAppID());
        var skeInfoPath = this.getFilePath(this.lgEffectName + ".json", this.getAppID());
        var atlas = Global.ResourceManager.getRes(atlasPath, "txt");
        var png = cc.loader.getRes(pngPath);
        var skeInfo = Global.ResourceManager.getRes(skeInfoPath, "txt");
        if (atlas == null || png == null || skeInfo == null)
            return;
        var asset = new sp.SkeletonData();
        asset["_uuid"] = skeInfoPath;
        asset.skeletonJson = JSON.parse(skeInfo);
        asset.atlasText = atlas;
        asset.textures = [png];
        asset["textureNames"] = ["lgEffect.png"];
        ske.skeletonData = asset;
        ske.animation = 'idle';
        ske._updateSkeletonData();
    };
    // public loadLogo(loSp)
    // {
    //     this.loadSprite(loSp, this.logo);
    // }
    //获取bgm原生地址
    CustomAppInfo.prototype.getDefaultBgmUrl = function () {
        if (!cc.sys.isNative)
            return "";
        return this.getFilePath(this.bgmName, this.getAppID());
    };
    CustomAppInfo.prototype.loadSprite = function (bgSp, fileName, callback) {
        if (!cc.sys.isNative || !bgSp)
            return;
        var path = this.getFilePath(fileName, this.getAppID());
        if (!path) {
            return;
        }
        var texture = cc.loader.getRes(path);
        if (texture != null) {
            if (bgSp && bgSp.node.isValid) {
                bgSp.spriteFrame = new cc.SpriteFrame(texture);
                if (callback) {
                    callback(texture.height);
                }
            }
        }
        else {
            cc.loader.load(path, function (error, texture) {
                if (error != null)
                    return;
                if (bgSp && bgSp.node.isValid) {
                    bgSp.spriteFrame = new cc.SpriteFrame(texture);
                    if (callback) {
                        callback(texture.height);
                    }
                }
            });
        }
    };
    CustomAppInfo.prototype.loadHallBundle = function (onComplete) {
        var hallstyle = this.getHallBundleName();
        Global.ResourceManager.loadBundle(hallstyle, function (err, bundle) {
            if (err) {
                Logger.error("load failed hallstyle " + hallstyle);
                return;
            }
            if (onComplete) {
                onComplete(err, bundle);
            }
        });
    };
    CustomAppInfo.prototype.getHallBundleName = function () {
        var config = Global.Setting.SkinConfig.orignalAppcfg;
        var hallstyle = "hall_style_0";
        if (config && config.hallStyle) {
            hallstyle = config.hallStyle;
        }
        return hallstyle;
    };
    CustomAppInfo.prototype.getHallBundlePath = function () {
        var bundleName = this.getHallBundleName();
        var bundlePath = bundleName;
        if (cc.sys.isNative) {
            var bundleDir = Global.HotUpdateManager.updateHelper.genStoragePath("hall") + "/" + bundleName;
            if (jsb && jsb.fileUtils.isDirectoryExist(bundleDir)) {
                bundlePath = jsb.fileUtils.fullPathForFilename(bundleDir);
            }
            else if (jsb && jsb.fileUtils.isDirectoryExist(bundleName)) {
                bundlePath = jsb.fileUtils.fullPathForFilename(bundleName);
            }
        }
        Logger.error("getHallBundlePath bundlePath = " + bundlePath);
        return bundlePath;
    };
    CustomAppInfo.prototype.getHallBundleRes = function (path, type) {
        var bundleName = this.getHallBundleName();
        if (bundleName) {
            var res = Global.ResourceManager.getBundleRes(bundleName, path, type);
            if (res) {
                return res;
            }
            else {
                Logger.error("getHallBundleRes getBundleRes null");
            }
        }
        else {
            Logger.error("getHallBundleRes bundleName null");
        }
    };
    return CustomAppInfo;
}());
exports.default = CustomAppInfo;
var BTNINDEX;
(function (BTNINDEX) {
    BTNINDEX[BTNINDEX["RegistBtn"] = 0] = "RegistBtn";
    BTNINDEX[BTNINDEX["OfficalBtn"] = 1] = "OfficalBtn";
    BTNINDEX[BTNINDEX["ServiceBtn"] = 2] = "ServiceBtn";
    BTNINDEX[BTNINDEX["VistorLoginBtn"] = 3] = "VistorLoginBtn";
    BTNINDEX[BTNINDEX["WeChatLoginBtn"] = 4] = "WeChatLoginBtn";
    BTNINDEX[BTNINDEX["PhoneLoginBtn"] = 5] = "PhoneLoginBtn";
})(BTNINDEX = exports.BTNINDEX || (exports.BTNINDEX = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxjb21tb25cXGFwcFxcQ3VzdG9tQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDBEQUFxRDtBQUVyRDtJQUFBO1FBRVcsY0FBUyxHQUNoQjtZQUNJLDhCQUE4QjtZQUM5QixpSEFBaUg7WUFDakgsR0FBRyxFQUFDLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBQyxjQUFjLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxVQUFVLEVBQUM7WUFDL0QsSUFBSSxFQUFDLEVBQUMsU0FBUyxFQUFDLGVBQWUsRUFBQyxRQUFRLEVBQUMsY0FBYyxFQUFFLE9BQU8sRUFBQyxVQUFVLEVBQUMsY0FBYyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsVUFBVSxFQUFDO1NBQ3RILENBQUE7UUFFTSxZQUFPLEdBQUcsU0FBUyxDQUFDO1FBRTNCLFNBQVM7UUFDRixjQUFTLEdBQUcsZUFBZSxDQUFDO1FBRW5DLG1CQUFtQjtRQUNaLFlBQU8sR0FBRyxlQUFlLENBQUM7UUFFakMsT0FBTztRQUNBLFdBQU0sR0FBRyxZQUFZLENBQUM7UUFDN0IsUUFBUTtRQUNELHVCQUFrQixHQUFHLG1CQUFtQixDQUFDO1FBRWhELDZCQUE2QjtRQUN0QixnQkFBVyxHQUFHLFVBQVUsQ0FBQztRQUN6QixnQkFBVyxHQUFHLFVBQVUsQ0FBQztRQUV6QixXQUFNLEdBQUcsRUFBRSxDQUFBO1FBQ2xCLFFBQVE7UUFDVCxvQkFBb0I7UUFFbkIsT0FBTztRQUNBLGFBQVEsR0FBRyxjQUFjLENBQUM7UUFFakMsaUJBQWlCO1FBQ1YsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFFOUIsZUFBZTtRQUNSLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzVCLFFBQVE7UUFDRCxpQkFBWSxHQUFHLFVBQVUsQ0FBQztRQUNqQyxRQUFRO1FBQ0QscUJB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QXBwSGVscGVyIGZyb20gXCIuLi8uLi9jb3JlL3Rvb2wvQXBwSGVscGVyXCI7XHJcbmltcG9ydCBIYWxsU3RvcmFnZUtleSBmcm9tIFwiLi4vY29uc3QvSGFsbFN0b3JhZ2VLZXlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbUFwcEluZm9cclxue1xyXG4gICAgcHVibGljIGFwcENvbmZpZyA9IFxyXG4gICAge1xyXG4gICAgICAgIC8v5a2X5q615LiN6K6+572u77yM5L2/55So6buY6K6k5YC877yb5a2X5q615Li656m6c3RyaW5n77yM6KGo56S65LiN5pi+56S6XHJcbiAgICAgICAgLy97YmdtTmFtZTpcImJnbVwiLGxvYWRpbmdCZzpcImxvYWRpbmdCZ1wiLCBsb2dpbkJnOlwibG9naW5CZ1wiLCBsb2dvOlwibG9nb1wiLCBzcHJlZWRCZzpcInNwcmVlZEJnXCIsc2hvd0xvYWRpbmdFZmY6ZmFsc2V9XHJcbiAgICAgICAgNTg4Ontsb2dpbkJnOlwibGdCZy5qcGdcIixzaG93TG9hZGluZ0VmZjp0cnVlLCBcImxvZ29cIjpcImxvZ28ucG5nXCJ9LFxyXG4gICAgICAgIDEwMDM6e2xvYWRpbmdCZzpcImxvYWRpbmdCZy5wbmdcIixzcHJlZWRCZzpcInNwcmVlZEJnLnBuZ1wiLCBsb2dpbkJnOlwibGdCZy5qcGdcIixzaG93TG9hZGluZ0VmZjp0cnVlLCBcImxvZ29cIjpcImxvZ28ucG5nXCJ9LFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBiZ21OYW1lID0gXCJiZ20ubXAzXCI7XHJcblxyXG4gICAgLy/ng63mm7TnlYzpnaLog4zmma/lm75cclxuICAgIHB1YmxpYyBsb2FkaW5nQmcgPSBcImxvYWRpbmdCZy5qcGdcIjtcclxuXHJcbiAgICAvL+eZu+W9lS9oYWxsTG9hZGluZ+iDjOaZr+WbvlxyXG4gICAgcHVibGljIGxvZ2luQmcgPSBcImxvYWRpbmdCZy5qcGdcIjtcclxuXHJcbiAgICAvL+Wkp+WOheiDjOaZr+WbvlxyXG4gICAgcHVibGljIGhhbGxCZyA9IFwiaGFsbEJnLmpwZ1wiO1xyXG4gICAgLy/pqaznlLLljIXog4zmma/lm75cclxuICAgIHB1YmxpYyBtYWppYWJhb19sb2FkaW5nQmcgPSBcImxvYWRpbmdCZ0JhY2suanBnXCI7XHJcblxyXG4gICAgLy9zaG93bG9naW5CZyDkuLp0cnVl5pe2ICDkvb/nlKhsZ0JnLFxyXG4gICAgcHVibGljIGRlZmF1bHRMZ0JnID0gXCJsZ0JnLmpwZ1wiO1xyXG4gICAgcHVibGljIGRlZmF1bHRMb2dvID0gXCJsb2dvLnBuZ1wiO1xyXG5cclxuICAgIHB1YmxpYyBhcHBDZmcgPSBcIlwiXHJcbiAgICAvL2xvZ2/lm77moIdcclxuICAgLy8gcHVibGljIGxvZ28gPSBcIlwiO1xyXG5cclxuICAgIC8v5o6o5bm/6IOM5pmv5Zu+XHJcbiAgICBwdWJsaWMgc3ByZWVkQmcgPSBcInNwcmVlZEJnLmpwZ1wiO1xyXG5cclxuICAgIC8vbG9hZGluZ+eVjOmdouaYr+WQpuaYvuekuueJueaViFxyXG4gICAgcHVibGljIHNob3dMb2FkaW5nRWZmID0gZmFsc2U7XHJcblxyXG4gICAgLy/mmK/lkKbmmL7npLrnmbvlvZXnibnmlYgg5bmz5Y+w5a6a5Yi2XHJcbiAgICBwdWJsaWMgc2hvd0xvZ2luRWZmID0gZmFsc2U7XHJcbiAgICAvL+eZu+W9leeJueaViOWQjeWtl1xyXG4gICAgcHVibGljIGxnRWZmZWN0TmFtZSA9IFwibGdFZmZlY3RcIjtcclxuICAgIC8v55m75b2V54m55pWI5Yqo55S7XHJcbiAgICBwdWJsaWMgbGdFZmZlY3RBbmltTmFtZSA9IFwiaWRsZVwiO1xyXG5cclxuICAgIHByaXZhdGUgZmlsZVBhdGhNYXAgPSB7fVxyXG5cclxuICAgIHByaXZhdGUgYXBwSWQgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgaXNIYWxsQ2hhbmdlZCA9IGZhbHNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliqDovb3nlYzpnaLpnIDopoHmm7/mjaLnmoTlm75cclxuICAgICAqIHRpcHNCZyDmuKnppqjmj5DnpLrlupXlm75cclxuICAgICAqIHByb2dyZXNzQmFyIOi/m+W6puadoVxyXG4gICAgICogcHJvZ3Jlc3NCYXJCZyDov5vluqbmnaHlnLDlm75cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2FkaW5nID0ge1xyXG4gICAgICAgIFwidGlwc0JnXCIgOiBcInRzeV9kaS5wbmdcIixcclxuICAgICAgICBcInByb2dyZXNzQmFyXCIgOiBcImpkdF9qZHUucG5nXCIsXHJcbiAgICAgICAgXCJwcm9ncmVzc0JhckJnXCIgOiBcImpkdF9kaS5wbmdcIixcclxuICAgICAgICBcImNoZWNrTm9kZVwiOlwidHN5X3ppYmoucG5nXCIsXHJcbiAgICAgICAgXCJyZXN0b3JlXCI6XCJ4aW5feGl1ZnUucG5nXCIsXHJcbiAgICAgICAgXCJsb2FkaW5nXzA0XCI6XCJqel8wNS5wbmdcIixcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICDnmbvlvZXpnIDopoHmm7/mjaLnmoTliIflm75cclxuICAgICAqIHJlZ2lzdEJ0biDms6jlhozmjInpkq5cclxuICAgICAqIG9mZmljYWxCdG4g5a6Y572R5oyJ6ZKuXHJcbiAgICAgKiBzZXJ2aWNlQnRuIOWuouacjeaMiemSrlxyXG4gICAgICogdmlzdG9yTG9naW5CdG4g5ri45a6i55m76ZmG5oyJ6ZKuXHJcbiAgICAgKiB3eExvZ2luQnRuIOW+ruS/oeeZu+W9leaMiemSrlxyXG4gICAgICogcGhvbmVMb2dpbkJ0biDmiYvmnLrnmbvlvZXmjInpkq5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBsb2dpbiA9IHtcclxuICAgICAgICBcInJlZ2lzdEJ0blwiIDogXCJidXR0b25fc2p6Yy5wbmdcIixcclxuICAgICAgICBcIm9mZmljYWxCdG5cIjogXCJidXR0b25fZ3VhbndhbmcucG5nXCIsXHJcbiAgICAgICAgXCJzZXJ2aWNlQnRuXCI6IFwiYnV0dG9uX2tlZnUucG5nXCIsXHJcbiAgICAgICAgXCJ2aXN0b3JMb2dpbkJ0blwiIDpcImJ1dHRvbl95b3VrZS5wbmdcIixcclxuICAgICAgICBcInd4TG9naW5CdG5cIiA6XCJidXR0b25fd2VpeGluLnBuZ1wiLFxyXG4gICAgICAgIFwicGhvbmVMb2dpbkJ0blwiIDpcImJ1dHRvbl9zaG91amkucG5nXCJcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SXNIYWxsQ2hhbmdlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNIYWxsQ2hhbmdlZFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0Q29uZmlnKClcclxuICAgIHtcclxuICAgICAgICAvLyBsZXQgYXBwSWQgPSB0aGlzLmdldEFwcElEKCk7XHJcbiAgICAgICAgLy8gbGV0IGNvbmZpZyA9IEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuYXBwUGljQ29uZmlnID8gR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5hcHBQaWNDb25maWdbYXBwSWRdOiBudWxsXHJcbiAgICAgICAgLy8gLy/pu5jorqTnlKg2ODjphY3nva5cclxuICAgICAgICAvLyBpZihjb25maWcgIT0gbnVsbClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGZvcihsZXQga2V5IGluIGNvbmZpZylcclxuICAgICAgICAvLyAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpc1trZXldID0gY29uZmlnW2tleV07XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgICAgcmV0dXJuXHJcbiAgICAgICAgLy8gfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zaG93TG9naW5FZmYgPSB0aGlzLmdldEZpbGVQYXRoKHRoaXMubGdFZmZlY3ROYW1lICsgXCIuYXRsYXNcIiwgdGhpcy5nZXRBcHBJRCgpKSAhPSBcIlwiIFxyXG4gICAgICAgICAgICAmJiB0aGlzLmdldEZpbGVQYXRoKHRoaXMubGdFZmZlY3ROYW1lICsgXCIuanNvblwiLCB0aGlzLmdldEFwcElEKCkpICE9IFwiXCJcclxuICAgICAgICAgICAgJiYgdGhpcy5nZXRGaWxlUGF0aCh0aGlzLmxnRWZmZWN0TmFtZSArIFwiLnBuZ1wiLCB0aGlzLmdldEFwcElEKCkpICE9IFwiXCJcclxuICAgICAgICBpZih0aGlzLnNob3dMb2dpbkVmZiApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luQmcgPSB0aGlzLmRlZmF1bHRMZ0JnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/pooTliqDovb3og4zmma/lm75cclxuICAgIHB1YmxpYyBwcmVsb2FkKGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFjYy5zeXMuaXNOYXRpdmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuSW5pdE9yaWduYWxBcHBjb25maWcoKVxyXG4gICAgICAgIGxldCBhcHBpZCA9IHRoaXMuZ2V0QXBwSUQoKTtcclxuICAgICAgICBsZXQgYXBwQ2ZnID0gdGhpcy5nZXRBcHBDb25maWdGaWxlTmFtZShhcHBpZClcclxuXHJcbiAgICAgICAgbGV0IGFyciA9IFtdO1xyXG4gICAgICAgIGlmKHRoaXMubG9hZGluZ0JnICYmIHRoaXMubG9hZGluZ0JnICE9IFwiXCIpXHJcbiAgICAgICAgICAgIGFyci5wdXNoKHRoaXMubG9hZGluZ0JnKVxyXG5cclxuICAgICAgICBpZihhcHBDZmcgJiZhcHBDZmcgIT0gXCJcIilcclxuICAgICAgICAgICAgYXJyLnB1c2goYXBwQ2ZnKVxyXG4gICAgICAgIGlmKHRoaXMuZGVmYXVsdExnQmcgJiYgdGhpcy5kZWZhdWx0TGdCZyAhPSBcIlwiKVxyXG4gICAgICAgICAgICBhcnIucHVzaCh0aGlzLmRlZmF1bHRMZ0JnKTtcclxuICAgICAgICBpZih0aGlzLmhhbGxCZyAmJiB0aGlzLmhhbGxCZyAhPSBcIlwiKVxyXG4gICAgICAgICAgICBhcnIucHVzaCh0aGlzLmhhbGxCZyk7XHJcbiAgICAgICAgLy8gaWYodGhpcy5sb2dvICYmIHRoaXMubG9nbyAhPSBcIlwiKVxyXG4gICAgICAgIC8vICAgICBhcnIucHVzaCh0aGlzLmxvZ28pO1xyXG4gICAgICAgIGlmKHRoaXMuYmdtTmFtZSAmJiB0aGlzLmJnbU5hbWUgIT0gXCJcIilcclxuICAgICAgICAgICAgYXJyLnB1c2godGhpcy5iZ21OYW1lKTtcclxuICAgICAgICBpZih0aGlzLnNob3dMb2dpbkVmZiAmJiB0aGlzLmxnRWZmZWN0TmFtZSAmJiB0aGlzLmxnRWZmZWN0TmFtZSAhPSBcIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYXJyLnB1c2goW3RoaXMubGdFZmZlY3ROYW1lICsgXCIuanNvblwiLCBcInR4dFwiXSk7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKHRoaXMubGdFZmZlY3ROYW1lICsgXCIucG5nXCIpO1xyXG4gICAgICAgICAgICBhcnIucHVzaChbdGhpcy5sZ0VmZmVjdE5hbWUgKyBcIi5hdGxhc1wiLCBcInR4dFwiXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5sb2dpbikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5sb2dpbi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh0aGlzLmxvZ2luW2tleV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLmxvYWRpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG9hZGluZy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh0aGlzLmxvYWRpbmdba2V5XSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHBhdGggPSBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFycltpXSkpIHtcclxuICAgICAgICAgICAgICAgIHBhdGggPSB0aGlzLmdldEZpbGVQYXRoKGFycltpXVswXSwgYXBwaWQpO1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IGFycltpXVsxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBwYXRoID0gdGhpcy5nZXRGaWxlUGF0aChhcnJbaV0sIGFwcGlkKTtcclxuICAgICAgICAgICAgaWYgKHBhdGggIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgY291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFycltpXSA9PSBhcHBDZmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZChwYXRoLCAoZXJyb3IsIGpzb25Bc3NldCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRlci0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5Yqg6L29c2tpbkNvbmZpZ+Wksei0pe+8ge+8ge+8ge+8ge+8gVwiKyBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcInBhdGjvvIHvvIHvvIHvvIHvvIFcIisgcGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoanNvbkFzc2V0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHbG9iYWwuU2V0dGluZy5Ta2luQ29uZmlnLmFwcFBpY0NvbmZpZyA9IGpzb25Bc3NldFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb3VudGVyIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKHsgdXJsOiBwYXRoLCB0eXBlOiB0eXBlIH0sIChlcnJvciwgcmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5Yqg6L296LWE5rqQ5aSx6LSlXCIsIHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY291bnRlci0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudGVyIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjb3VudGVyID09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihjYWxsYmFjaylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QXBwQ29uZmlnRmlsZU5hbWUoYXBwaWQpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG9sZEZpbGVOYW1lID0gY2MuanMuZm9ybWF0U3RyKFwiJXMuanNvblwiLCBhcHBpZClcclxuICAgICAgICBsZXQgbmV3RmlsZU5hbWUgPSBcImNvbmZpZy5qc29uXCJcclxuICAgICAgICBsZXQgb2xkRmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKG9sZEZpbGVOYW1lLGFwcGlkKVxyXG5cclxuICAgICAgICBsZXQgbmV3RmlsZVBhdGggPSB0aGlzLmdldEZpbGVQYXRoKG5ld0ZpbGVOYW1lLGFwcGlkKVxyXG4gICAgICAgIGlmKGpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3Qob2xkRmlsZVBhdGgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9sZEZpbGVOYW1lXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoanNiLmZpbGVVdGlscy5pc0ZpbGVFeGlzdChuZXdGaWxlUGF0aCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3RmlsZU5hbWVcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3RmlsZU5hbWVcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBjaGVja0lzSG90VXBkYXRlRmlsZUV4aXN0KGFwcGlkKVxyXG4gICAge1xyXG4gICAgICAgIC8v5YWI5Yik5pat54Ot5pu055uu5b2V5LiL5piv5ZCm5pyJ5paH5Lu2XHJcbiAgICAgICAgbGV0IGhvdHVwZGF0ZVBhdGggPSBHbG9iYWwuSG90VXBkYXRlTWFuYWdlci51cGRhdGVIZWxwZXIuZ2VuU3RvcmFnZVBhdGgoXCJoYWxsXCIpICsgXCIvYXBwL1wiICsgYXBwaWQ7XHJcbiAgICAgICAgcmV0dXJuIGpzYi5maWxlVXRpbHMuaXNEaXJlY3RvcnlFeGlzdChob3R1cGRhdGVQYXRoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b2T5YmNYXBwaWTlkIjmnI3lkI7mraRJROS4jumaj+WMhUFQUElE5LiN5LiA6Ie0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRDdXN0b21BcHBJRCgpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGFwcElkID0gMDtcclxuICAgICAgICBsZXQgbG9jYWxBcHBpZD0gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXROdW1iZXIoSGFsbFN0b3JhZ2VLZXkuQXBwSUQsIC0xKTtcclxuICAgICAgICBpZiAobG9jYWxBcHBpZCAhPSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmFwcElkID0gbG9jYWxBcHBpZDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwSWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChHbG9iYWwuU2V0dGluZy5BcHBDb25maWcgJiYgR2xvYmFsLlNldHRpbmcuQXBwQ29uZmlnLmFwcGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwSWQgPSBHbG9iYWwuU2V0dGluZy5hcHBJZDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwSWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5hcHBJRCkge1xyXG4gICAgICAgICAgICB0aGlzLmFwcElkID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5hcHBJRDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXBwSWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgSW5pdE9yaWduYWxBcHBjb25maWcoKSBcclxuICAgIHtcclxuICAgICAgICBsZXQgYXBwaWQgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcElEXHJcbiAgICAgICAgbGV0IGFwcENmZyA9IHRoaXMuZ2V0QXBwQ29uZmlnRmlsZU5hbWUoYXBwaWQpXHJcbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLmdldEZpbGVQYXRoKGFwcENmZywgYXBwaWQpO1xyXG4gICAgICAgIGlmIChwYXRoICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQocGF0aCwgKGVycm9yLCBqc29uQXNzZXQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5Yqg6L29c2tpbkNvbmZpZ+Wksei0pe+8ge+8ge+8ge+8ge+8gVwiICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwicGF0aO+8ge+8ge+8ge+8ge+8gVwiICsgcGF0aCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbkFzc2V0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcub3JpZ25hbEFwcGNmZyA9IGpzb25Bc3NldFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdG9yZ2VIYWxsID0gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQoXCJIQUxMU1RZTEVcIilcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0b3JnZUhhbGwgKSBcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdsb2JhbC5TZXR0aW5nLnN0b3JhZ2Uuc2V0KFwiSEFMTFNUWUxFXCIsanNvbkFzc2V0W1wiaGFsbFN0eWxlXCJdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBBc3luY0luaXRPcmlnbmFsQXBwY29uZmlnKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xyXG4gICAgICAgICAgICBsZXQgYXBwaWQgPSBHbG9iYWwuU2V0dGluZy5TeXN0ZW1JbmZvLmFwcElEXHJcbiAgICAgICAgICAgIGxldCBhcHBDZmcgPSB0aGlzLmdldEFwcENvbmZpZ0ZpbGVOYW1lKGFwcGlkKVxyXG4gICAgICAgICAgICBsZXQgcGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgoYXBwQ2ZnLCBhcHBpZCk7XHJcbiAgICAgICAgICAgIGlmIChwYXRoICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKHBhdGgsIChlcnJvciwganNvbkFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcIuWKoOi9vXNraW5Db25maWflpLHotKXvvIHvvIHvvIHvvIHvvIFcIiArIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJwYXRo77yB77yB77yB77yB77yBXCIgKyBwYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5vcmlnbmFsQXBwY2ZnID0ganNvbkFzc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdG9yZ2VIYWxsID0gR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5nZXQoXCJIQUxMU1RZTEVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0b3JnZUhhbGwgJiYgc3RvcmdlSGFsbCAhPSBqc29uQXNzZXRbXCJoYWxsU3R5bGVcIl0gKSBcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2xvYmFsLlNldHRpbmcuc3RvcmFnZS5zZXQoXCJIQUxMU1RZTEVcIixqc29uQXNzZXRbXCJoYWxsU3R5bGVcIl0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzSGFsbENoYW5nZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShqc29uQXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZWplY3QobnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5a6e6ZmF6ZyA6KaB6aKE5Yqg6L296LWE5rqQ55qEYXBwaWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEFwcElEKCl7XHJcbiAgICAgICAgbGV0IGFwcGlkID0gR2xvYmFsLmN1c3RvbUFwcC5nZXRDdXN0b21BcHBJRCgpXHJcbiAgICAgICAgaWYoR2xvYmFsLlRvb2xraXQuY2hlY2tNZWdlU2VydmVyKCkgJiYgIUdsb2JhbC5jdXN0b21BcHAuY2hlY2tJc0hvdFVwZGF0ZUZpbGVFeGlzdChhcHBpZCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBhcHBpZCA9IEdsb2JhbC5TZXR0aW5nLlN5c3RlbUluZm8uYXBwSURcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFwcGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBcHBDb25maWcoKXtcclxuICAgICAgICAvLyBsZXQgYXBwaWQgPSB0aGlzLmdldEFwcElEKClcclxuICAgICAgICAvLyBsZXQgY29uZmlnID0gbnVsbFxyXG4gICAgICAgIC8vIGlmKCFHbG9iYWwuU2V0dGluZy5pc05ld0FwcEhvdFVwZGF0ZSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIGNvbmZpZyA9IEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuYXBwUGljQ29uZmlnID8gR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5hcHBQaWNDb25maWdbYXBwaWRdOiBudWxsXHJcbiAgICAgICAgLy8gICAgIHJldHVybiBjb25maWdcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgcmV0dXJuIEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcuYXBwUGljQ29uZmlnIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGdldEFwcEJhc2VGb2xkZXIoKSAgXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnVwZGF0ZUhlbHBlci5nZW5TdG9yYWdlUGF0aChcImhhbGxcIikgKyBcIi9hcHAvXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHVibGljIGdldEJnbVBhdGgoKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGlmKCFjYy5zeXMuaXNOYXRpdmUpXHJcbiAgICAvLyAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLmdldEZpbGVQYXRoKHRoaXMuYmdtTmFtZSwgdGhpcy5nZXRBcHBJRCgpKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvL2FwcGlk5Li6ZGF0YeS4reeahFxyXG4gICAgLy9uYXRpdmVBcHBpZOS4uuWMhemHjOeahGFwcGlkICAg6YG/5YWN5pu05o2iYXBwaWTml7blh7rpl67pophcclxuICAgIHByaXZhdGUgZ2V0RmlsZVBhdGgoZmlsZU5hbWUsIGFwcGlkLCBuYXRpdmVBcHBpZCA9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIWNjLnN5cy5pc05hdGl2ZSlcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgaWYobmF0aXZlQXBwaWQgPT0gbnVsbClcclxuICAgICAgICAgICAgbmF0aXZlQXBwaWQgPSBhcHBpZDtcclxuICAgICAgICBpZih0aGlzLmZpbGVQYXRoTWFwW2ZpbGVOYW1lXSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGVQYXRoTWFwW2ZpbGVOYW1lXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lhYjliKTmlq3ng63mm7Tnm67lvZXkuIvmmK/lkKbmnInmlofku7ZcclxuICAgICAgICBsZXQgaG90dXBkYXRlUGF0aCA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnVwZGF0ZUhlbHBlci5nZW5TdG9yYWdlUGF0aChcImhhbGxcIikgKyBcIi9hcHAvXCIgKyBhcHBpZCArIFwiL1wiO1xyXG4gICAgICAgIGxldCBob3R1cGRhdGVGdWxsUGF0aCA9IGhvdHVwZGF0ZVBhdGggKyBmaWxlTmFtZTtcclxuICAgICAgICBpZihqc2IuZmlsZVV0aWxzLmlzRmlsZUV4aXN0KGhvdHVwZGF0ZUZ1bGxQYXRoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsZVBhdGhNYXBbZmlsZU5hbWVdID0gaG90dXBkYXRlRnVsbFBhdGg7XHJcbiAgICAgICAgICAgIHJldHVybiBob3R1cGRhdGVGdWxsUGF0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lhbPpl63lkIjmnI3vvIznm7TmjqXliIdBcHBJROeahOaDheWGte+8jOWmguaenOS4i+i9veeahOi1hOa6kOmHjOmdouayoeacieWImeeUqOearuiCpOiHquW4pueahFxyXG4gICAgICAgIGlmIChHbG9iYWwuU2V0dGluZy5pc0Nsb3NlTWVnZVNlcnZlcil7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6LWw6ZqP5YyFQXBwSUTph4zpnaLnmoTotYTmupBcclxuICAgICAgICBsZXQgcGFja2FnZUFwcGlkID0gR2xvYmFsLlNldHRpbmcuU3lzdGVtSW5mby5hcHBJRFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v6I635Y+W5Y6f55Sf6LWE5rqQ6Lev5b6E5paH5Lu25aS5XHJcbiAgICAgICAgbGV0IG5hdGl2ZUZ1bGxQYXRoID0gXCJhcHAvXCIgKyBwYWNrYWdlQXBwaWQgKyBcIi9cIiArIGZpbGVOYW1lO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QobmF0aXZlRnVsbFBhdGgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmF0aXZlRnVsbFBhdGggPSBqc2IuZmlsZVV0aWxzLmZ1bGxQYXRoRm9yRmlsZW5hbWUobmF0aXZlRnVsbFBhdGgpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbGVQYXRoTWFwW2ZpbGVOYW1lXSA9ICBuYXRpdmVGdWxsUGF0aDtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwidXNlIG5hdGl2ZSBwYXRoXCIsIG5hdGl2ZUZ1bGxQYXRoKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZUZ1bGxQYXRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICAvL+WKoOi9vWxvYWRpbmfnlYzpnaLotYTmupBcclxuICAgIHB1YmxpYyBsb2FkTG9hZGluZ0JnKGJnU3A6Y2MuU3ByaXRlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFjYy5zeXMuaXNOYXRpdmUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvL+iOt+WPluWOn+eUn+i1hOa6kOi3r+W+hOaWh+S7tuWkuVxyXG4gICAgICAgIGxldCBuYXRpdmVGdWxsUGF0aCA9IHRoaXMubWFqaWFiYW9fbG9hZGluZ0JnO1xyXG4gICAgICAgIGlmKGpzYi5maWxlVXRpbHMuaXNGaWxlRXhpc3QobmF0aXZlRnVsbFBhdGgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkTWFKaWFCYW9Mb2FpbmdCZyhiZ1NwLG5hdGl2ZUZ1bGxQYXRoKVxyXG4gICAgICAgIH1lbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNwcml0ZShiZ1NwLCB0aGlzLmxvYWRpbmdCZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkaW5nTG9naW5QaWNzKGJ0bkNvbnRhaW5lcjpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFjYy5zeXMuaXNOYXRpdmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIWJ0bkNvbnRhaW5lcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgY29uZmlnID0gdGhpcy5nZXRBcHBDb25maWcoKVxyXG4gICAgICAgIGxldCBuZWVkQ2hhbmdlID0gY29uZmlnICYmICFjb25maWdbXCJzaG93RGVmYXV0XCJdIC8v6buY6K6k5oyJ6ZKu5pyJ54m55pWIIOaWsOmFjee9rueahOayoeaciSDlpoLmnpzpnIDopoHphY3nva7pnIDopoHpmpDol4/nibnmlYhcclxuICAgICAgICBsZXQgcmVnaXN0IDpjYy5TcHJpdGUgPSBjYy5maW5kKFwiUmVnaXN0QnRuXCIsYnRuQ29udGFpbmVyKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgIGxldCBvZmZpY2FsOmNjLlNwcml0ZSA9IGNjLmZpbmQoXCJnbnhfZ3VhbndhbmdcIixidG5Db250YWluZXIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpXHJcbiAgICAgICAgbGV0IHNlcnZpY2U6Y2MuU3ByaXRlID0gY2MuZmluZChcImdueF9rZWZ1XCIsYnRuQ29udGFpbmVyKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgIGxldCB2aXN0b3I6Y2MuU3ByaXRlID0gY2MuZmluZChcImd1ZXN0QnRuXCIsYnRuQ29udGFpbmVyKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCB2aXN0b3IgJiYgdmlzdG9yLm5vZGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdE5vZGUgOmNjLk5vZGUgPSBjYy5maW5kKFwiZGVmYXV0XCIsdmlzdG9yLm5vZGUpIC8vIOm7mOiupOaMiemSruacieeJueaViFxyXG4gICAgICAgICAgICBpZihkZWZhdWx0Tm9kZSAmJiBuZWVkQ2hhbmdlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0Tm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNwcml0ZSh2aXN0b3IsIHRoaXMubG9naW4udmlzdG9yTG9naW5CdG4pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHdlY2hhdDpjYy5TcHJpdGUgPSBjYy5maW5kKFwid3hCdG5cIixidG5Db250YWluZXIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpXHJcbiAgICAgICAgaWYoIHdlY2hhdCAmJiB3ZWNoYXQubm9kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0Tm9kZSA6Y2MuTm9kZSA9IGNjLmZpbmQoXCJkZWZhdXRcIix3ZWNoYXQubm9kZSlcclxuICAgICAgICAgICAgaWYoZGVmYXVsdE5vZGUgJiYgbmVlZENoYW5nZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdE5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRTcHJpdGUod2VjaGF0LCB0aGlzLmxvZ2luLnd4TG9naW5CdG4sKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwaG9uZTpjYy5TcHJpdGUgPSBjYy5maW5kKFwicGhvbmVCdG5cIixidG5Db250YWluZXIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpXHJcblxyXG4gICAgICAgIGlmKCBwaG9uZSAmJiBwaG9uZS5ub2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHROb2RlIDpjYy5Ob2RlID0gY2MuZmluZChcImRlZmF1dFwiLHBob25lLm5vZGUpXHJcbiAgICAgICAgICAgIGlmKGRlZmF1bHROb2RlICYmIG5lZWRDaGFuZ2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHROb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sb2FkU3ByaXRlKHBob25lLCB0aGlzLmxvZ2luLnBob25lTG9naW5CdG4sKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9hZFNwcml0ZShyZWdpc3QsIHRoaXMubG9naW4ucmVnaXN0QnRuKTtcclxuICAgICAgICB0aGlzLmxvYWRTcHJpdGUob2ZmaWNhbCwgdGhpcy5sb2dpbi5vZmZpY2FsQnRuKTtcclxuICAgICAgICB0aGlzLmxvYWRTcHJpdGUoc2VydmljZSwgdGhpcy5sb2dpbi5zZXJ2aWNlQnRuKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiAgXCJhcHBQaWNDb25maWdcIjoge1xyXG5cdFx0XCI1ODhcIjoge1xyXG5cdFx0XHRcInNob3dMb2dpbkVmZlwiOmZhbHNlLFxyXG5cdFx0XHRcInJlZ2lzdEJ0blBvc1wiOlstNTM4LDI5NV0sXHJcblx0XHRcdFwic2VydmljZUJ0blBvc1wiOlstNDQwLDI5NV0sXHJcblx0XHRcdFwib2ZmaWNhbEJ0blBvc1wiOlstMzQyLDI5NV0sXHJcblx0XHRcdFwidmlzdG9yTG9naW5CdG5Qb3NcIjpbMzc1LDVdLFxyXG5cdFx0XHRcIndlY2hhdExvZ2luQnRuUG9zXCI6WzM3NSwtMTIzXSxcclxuXHRcdFx0XCJwaG9uZUxvZ2luQnRuUG9zXCI6WzM3NSwtMjUwXSxcclxuXHRcdFx0XCJsYXlvdXRcIjowXHJcblx0XHRcdFx0XHJcblx0XHR9XHJcblx0fVxyXG4gICAgICogIFxyXG4gICAgICovXHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgQ2hhbmdlTG9hZGluZ1R4dENvbG9yQW5kRm9udFNpemUodHh0OmNjLkxhYmVsLGluZm9sYWJlbDpjYy5MYWJlbCx2ZXJzaW9uTGFiZWw6Y2MuTGFiZWwpXHJcbiAgICB7XHJcblxyXG4gICAgICAgIGxldCBjb25maWcgPSB0aGlzLmdldEFwcENvbmZpZygpXHJcbiAgICAgICAgaWYoY29uZmlnIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHR4dClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoIGNvbmZpZy50eHRDb2xvcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigpLmZyb21IRVgoY29uZmlnLnR4dENvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGNvbmZpZy50eHRGb250U2l6ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0eHQuZm9udFNpemUgPSBjb25maWcudHh0Rm9udFNpemVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpbmZvbGFiZWwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKCBjb25maWcuaW5mb0xhYmVsQ29sb3IpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb2xhYmVsLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoKS5mcm9tSEVYKGNvbmZpZy5pbmZvTGFiZWxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihjb25maWcuaW5mb0xhYmVsRm9udFNpemUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb2xhYmVsLmZvbnRTaXplID0gY29uZmlnLmluZm9MYWJlbEZvbnRTaXplXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHZlcnNpb25MYWJlbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoIGNvbmZpZy52ZXJzaW9uTGFiZWxDb2xvcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uTGFiZWwubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigpLmZyb21IRVgoY29uZmlnLnZlcnNpb25MYWJlbENvbG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGNvbmZpZy52ZXJzaW9uTGFiZWxGb250U2l6ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uTGFiZWwuZm9udFNpemUgPSBjb25maWcudmVyc2lvbkxhYmVsRm9udFNpemVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHNldE9mZmljYWxCdG5Qb3Mob2ZmaWNhbEJ0bjpjYy5Ob2RlLGtlZnVCdG46Y2MuTm9kZSlcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgY29uZmlnID0gdGhpcy5nZXRBcHBDb25maWcoKVxyXG5cclxuICAgICAgICBpZihjb25maWcgJiYgb2ZmaWNhbEJ0biAmJiBjb25maWcubG9hZGluZ09mZmljYWxCdG5Qb3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBvZmZpY2FsQnRuLnNldFBvc2l0aW9uKChjYy52Mihjb25maWcubG9hZGluZ09mZmljYWxCdG5Qb3NbMF0sIGNvbmZpZy5sb2FkaW5nT2ZmaWNhbEJ0blBvc1sxXSkpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjb25maWcgJiYga2VmdUJ0biAmJiBjb25maWcubG9hZGluZ2tlZnVCdG5Qb3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBrZWZ1QnRuLnNldFBvc2l0aW9uKChjYy52Mihjb25maWcubG9hZGluZ2tlZnVCdG5Qb3NbMF0sIGNvbmZpZy5sb2FkaW5na2VmdUJ0blBvc1sxXSkpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENoYW5nZUxvYWRpbmdQb3NDZmcodGlwc0JnOmNjLk5vZGUsbG9hZGluZ0JhcjpjYy5Ob2RlLGNoZWNrTm9kZTpjYy5Ob2RlLHJlc3RvcmVOb2RlID0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBsZXQgY29uZmlnID0gdGhpcy5nZXRBcHBDb25maWcoKVxyXG4gICAgICAgIGlmKGNvbmZpZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRpcHNCZyAmJiBjb25maWcudGlwc0JnUG9zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aXBzQmcuc2V0UG9zaXRpb24oKGNjLnYyKGNvbmZpZy50aXBzQmdQb3NbMF0sIGNvbmZpZy50aXBzQmdQb3NbMV0pKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihsb2FkaW5nQmFyICYmIGNvbmZpZy5sb2FkaW5nQmFyUG9zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nQmFyLnNldFBvc2l0aW9uKChjYy52Mihjb25maWcubG9hZGluZ0JhclBvc1swXSwgY29uZmlnLmxvYWRpbmdCYXJQb3NbMV0pKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihyZXN0b3JlTm9kZSAmJiBjb25maWcucmVzdG9yZVBvcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmVzdG9yZU5vZGUuc2V0UG9zaXRpb24oKGNjLnYyKGNvbmZpZy5yZXN0b3JlUG9zWzBdLCBjb25maWcucmVzdG9yZVBvc1sxXSkpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNoZWNrTm9kZSAmJiBjb25maWcuY2hlY2tOb2RlUG9zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tTcCA9IGNoZWNrTm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKVxyXG4gICAgICAgICAgICAgICAgaWYoY2hlY2tTcCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkU3ByaXRlKGNoZWNrU3AsIHRoaXMubG9hZGluZy5jaGVja05vZGUsKGhlaWdodCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrU3Auc3ByaXRlRnJhbWUuaW5zZXRMZWZ0ID0gMTUwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrU3Auc3ByaXRlRnJhbWUuaW5zZXRSaWdodCA9IDE1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1NwLm5vZGUuaGVpZ2h0ID0gaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrU3Auc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrU3AudHlwZSA9IGNjLlNwcml0ZS5UeXBlLlNMSUNFRFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2hlY2tOb2RlLnNldFBvc2l0aW9uKChjYy52Mihjb25maWcuY2hlY2tOb2RlUG9zWzBdLCBjb25maWcuY2hlY2tOb2RlUG9zWzFdKSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICBcclxuXHJcbiAgICAvL+WKoOi9veaPkOekuuiDjOaZryDov5vluqbmnaFcclxuICAgIHB1YmxpYyBsb2FkTG9hZGluZ1BpY3ModGlwc0JnOmNjLlNwcml0ZSxiYXI6Y2MuU3ByaXRlLGJhcjE6Y2MuU3ByaXRlLGNoZWNrTm9kZTpjYy5TcHJpdGUsXHJcbiAgICAgICAgbG9hZGluZ18wNDpjYy5TcHJpdGUsb2ZmaWNhbEJ0bjpjYy5TcHJpdGUscmVzdG9yZTpjYy5TcHJpdGUgPSBudWxsLGtlZnVCdG46Y2MuU3ByaXRlID0gbnVsbCxtYXNrTm9kZTpjYy5TcHJpdGUgPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFjYy5zeXMuaXNOYXRpdmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IHRoaXMuZ2V0QXBwQ29uZmlnKClcclxuICAgICAgICBpZih0aGlzLmxvYWRpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTcHJpdGUodGlwc0JnLCB0aGlzLmxvYWRpbmcudGlwc0JnLChoZWlnaHQpID0+e1xyXG4gICAgICAgICAgICAgICAgdGlwc0JnLnNwcml0ZUZyYW1lLmluc2V0TGVmdCA9IDIwMFxyXG4gICAgICAgICAgICAgICAgdGlwc0JnLnNwcml0ZUZyYW1lLmluc2V0UmlnaHQgPSAyMDBcclxuICAgICAgICAgICAgICAgIHRpcHNCZy5ub2RlLmhlaWdodCA9IGhlaWdodFxyXG4gICAgICAgICAgICAgICAgdGlwc0JnLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTVxyXG4gICAgICAgICAgICAgICAgdGlwc0JnLnR5cGUgPSBjYy5TcHJpdGUuVHlwZS5TTElDRURcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNwcml0ZShiYXIsIHRoaXMubG9hZGluZy5wcm9ncmVzc0JhckJnLChoZWlnaHQpPT57XHJcbiAgICAgICAgICAgICAgICBiYXIuc3ByaXRlRnJhbWUuaW5zZXRMZWZ0ID0gMzBcclxuICAgICAgICAgICAgICAgIGJhci5zcHJpdGVGcmFtZS5pbnNldFJpZ2h0ID0gMzBcclxuICAgICAgICAgICAgICAgIGJhci5ub2RlLmhlaWdodCA9IGhlaWdodFxyXG4gICAgICAgICAgICAgICAgYmFyLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTVxyXG4gICAgICAgICAgICAgICAgYmFyLnR5cGUgPSBjYy5TcHJpdGUuVHlwZS5TTElDRURcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8v5YWo5bGP6YCC6YWNXHJcbiAgICAgICAgICAgIGlmKGNvbmZpZyAmJmNvbmZpZy5mdWxsU2NyZWVuICYmIGJhcjEgJiYgYmFyICYmIGNjLmlzVmFsaWQoYmFyMS5ub2RlKSAmJiBjYy5pc1ZhbGlkKGJhci5ub2RlKSl7XHJcbiAgICAgICAgICAgICAgICBiYXIxLm5vZGUud2lkdGggPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS53aWR0aFxyXG4gICAgICAgICAgICAgICAgYmFyLm5vZGUud2lkdGggPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS53aWR0aFxyXG4gICAgICAgICAgICAgICAgYmFyLm5vZGUuc2V0UG9zaXRpb24oY2MudjIoLTAuNSogYmFyLm5vZGUud2lkdGgsYmFyLm5vZGUucG9zaXRpb24ueSkpXHJcbiAgICAgICAgICAgICAgICBiYXIxLm5vZGUuc2V0UG9zaXRpb24oY2MudjIoLTAuNSogYmFyMS5ub2RlLndpZHRoLGJhcjEubm9kZS5wb3NpdGlvbi55KSlcclxuICAgICAgICAgICAgICAgIGxldCBwcm9ncmVzc0JhciA9IGJhcjEubm9kZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpXHJcbiAgICAgICAgICAgICAgICBpZihwcm9ncmVzc0JhcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0Jhci50b3RhbExlbmd0aCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLndpZHRoXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sb2FkU3ByaXRlKGJhcjEsIHRoaXMubG9hZGluZy5wcm9ncmVzc0JhciwoaGVpZ2h0KT0+e1xyXG4gICAgICAgICAgICAgICAgYmFyMS5zcHJpdGVGcmFtZS5pbnNldExlZnQgPSAzMFxyXG4gICAgICAgICAgICAgICAgYmFyMS5zcHJpdGVGcmFtZS5pbnNldFJpZ2h0ID0gMzBcclxuICAgICAgICAgICAgICAgIGJhcjEubm9kZS5oZWlnaHQgPSBoZWlnaHRcclxuICAgICAgICAgICAgICAgIGJhcjEuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NXHJcbiAgICAgICAgICAgICAgICBiYXIxLnR5cGUgPSBjYy5TcHJpdGUuVHlwZS5TTElDRURcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKHJlc3RvcmUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkU3ByaXRlKHJlc3RvcmUsIHRoaXMubG9hZGluZy5yZXN0b3JlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRTcHJpdGUoY2hlY2tOb2RlLCB0aGlzLmxvYWRpbmcuY2hlY2tOb2RlLChoZWlnaHQpPT57XHJcbiAgICAgICAgICAgICAgICBjaGVja05vZGUubm9kZS5oZWlnaHQgPSBoZWlnaHRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmxvYWRTcHJpdGUobG9hZGluZ18wNCwgdGhpcy5sb2FkaW5nLmxvYWRpbmdfMDQsKGhlaWdodCk9PntcclxuICAgICAgICAgICAgICAgIGxvYWRpbmdfMDQuc3ByaXRlRnJhbWUuaW5zZXRMZWZ0ID0gM1xyXG4gICAgICAgICAgICAgICAgbG9hZGluZ18wNC5zcHJpdGVGcmFtZS5pbnNldFJpZ2h0ID0gM1xyXG4gICAgICAgICAgICAgICAgbG9hZGluZ18wNC5ub2RlLmhlaWdodCA9IGhlaWdodFxyXG4gICAgICAgICAgICAgICAgbG9hZGluZ18wNC5ub2RlLndpZHRoID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGhcclxuICAgICAgICAgICAgICAgIGxvYWRpbmdfMDQuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NXHJcbiAgICAgICAgICAgICAgICBsb2FkaW5nXzA0LnR5cGUgPSBjYy5TcHJpdGUuVHlwZS5TTElDRURcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvYWRTcHJpdGUob2ZmaWNhbEJ0biwgdGhpcy5sb2dpbi5vZmZpY2FsQnRuKTtcclxuICAgICAgICAgICAgaWYoa2VmdUJ0bilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkU3ByaXRlKGtlZnVCdG4sIHRoaXMubG9naW4uc2VydmljZUJ0bik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/liqDovb1CYW5uZXLnlYzpnaLotYTmupBcclxuICAgIHB1YmxpYyBsb2FkQmFubmVyQmcoYmdTcDpjYy5TcHJpdGUsbmFtZTpzdHJpbmcsY2FsbGJhY2s/KVxyXG4gICAge1xyXG4gICAgICAgIGxldCBwYXRoID0gdGhpcy5nZXRGaWxlUGF0aChuYW1lLCB0aGlzLmdldEFwcElEKCkpO1xyXG4gICAgICAgIGlmKHBhdGgpe1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTcHJpdGUoYmdTcCwgbmFtZSxjYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+eZu+W9leiDjOaZry9oYWxsc2NlbmXog4zmma9cclxuICAgIHB1YmxpYyBsb2FkTG9naW5CZyhiZ1NwKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjb25maWcgPSB0aGlzLmdldEFwcENvbmZpZygpXHJcbiAgICAgICAgLy/pu5jorqTnlKg2ODjphY3nva5cclxuICAgICAgICBpZihjb25maWcgIT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGNvbmZpZy5sb2dpbkJnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRTcHJpdGUoYmdTcCwgY29uZmlnLmxvZ2luQmcpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxvYWRTcHJpdGUoYmdTcCwgdGhpcy5sb2dpbkJnKVxyXG4gICAgfVxyXG4gICAgLy/nmbvlvZXog4zmma8vaGFsbHNjZW5l6IOM5pmvXHJcbiAgICBwdWJsaWMgbG9hZEhhbGxCZyhiZ1NwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubG9hZFNwcml0ZShiZ1NwLCB0aGlzLmhhbGxCZylcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZFNwcmVlZEJnKGJnU3ApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5sb2FkU3ByaXRlKGJnU3AsIHRoaXMuc3ByZWVkQmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbG9hZE1hSmlhQmFvTG9haW5nQmcoYmdTcCxuYXRpdmVGdWxsUGF0aCl7XHJcbiAgICAgICAgbmF0aXZlRnVsbFBhdGggPSBqc2IuZmlsZVV0aWxzLmZ1bGxQYXRoRm9yRmlsZW5hbWUobmF0aXZlRnVsbFBhdGgpO1xyXG4gICAgICAgIHRoaXMuZmlsZVBhdGhNYXBbdGhpcy5tYWppYWJhb19sb2FkaW5nQmddID0gIG5hdGl2ZUZ1bGxQYXRoO1xyXG4gICAgICAgIGxldCB0ZXh0dXJlID0gY2MubG9hZGVyLmdldFJlcyhuYXRpdmVGdWxsUGF0aCk7XHJcbiAgICAgICAgaWYodGV4dHVyZSAhPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoYmdTcCAmJiBiZ1NwLm5vZGUuaXNWYWxpZClcclxuICAgICAgICAgICAgeyAgIFxyXG4gICAgICAgICAgICAgICAgYmdTcC5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZChuYXRpdmVGdWxsUGF0aCwgKGVycm9yLCB0ZXh0dXJlKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoZXJyb3IgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZihiZ1NwICYmIGJnU3Aubm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgICAgICAgICAgeyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGJnU3Auc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkTG9naW5FZmZlY3QoZWZmZWN0Tm9kZTpjYy5Ob2RlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFjYy5zeXMuaXNOYXRpdmUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZihlZmZlY3ROb2RlID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZighdGhpcy5zaG93TG9naW5FZmYpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBsZXQgc2tlID0gZWZmZWN0Tm9kZS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pO1xyXG4gICAgICAgIGlmKHNrZSA9PSBudWxsKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IGF0bGFzUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgodGhpcy5sZ0VmZmVjdE5hbWUgKyBcIi5hdGxhc1wiLCB0aGlzLmdldEFwcElEKCkpO1xyXG4gICAgICAgIGxldCBwbmdQYXRoID0gdGhpcy5nZXRGaWxlUGF0aCh0aGlzLmxnRWZmZWN0TmFtZSArIFwiLnBuZ1wiLCB0aGlzLmdldEFwcElEKCkpO1xyXG4gICAgICAgIGxldCBza2VJbmZvUGF0aCA9IHRoaXMuZ2V0RmlsZVBhdGgodGhpcy5sZ0VmZmVjdE5hbWUgKyBcIi5qc29uXCIsIHRoaXMuZ2V0QXBwSUQoKSk7XHJcbiAgICAgICAgbGV0IGF0bGFzID0gR2xvYmFsLlJlc291cmNlTWFuYWdlci5nZXRSZXMoYXRsYXNQYXRoLCBcInR4dFwiKTtcclxuICAgICAgICBsZXQgcG5nID0gY2MubG9hZGVyLmdldFJlcyhwbmdQYXRoKTtcclxuICAgICAgICBsZXQgc2tlSW5mbyA9IEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIuZ2V0UmVzKHNrZUluZm9QYXRoLCBcInR4dFwiKTtcclxuICAgICAgICBpZihhdGxhcyA9PSBudWxsIHx8IHBuZyA9PSBudWxsIHx8IHNrZUluZm8gPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHZhciBhc3NldCA9IG5ldyBzcC5Ta2VsZXRvbkRhdGEoKTtcclxuICAgICAgICBhc3NldFtcIl91dWlkXCJdID0gc2tlSW5mb1BhdGg7XHJcbiAgICAgICAgYXNzZXQuc2tlbGV0b25Kc29uID0gSlNPTi5wYXJzZShza2VJbmZvKTtcclxuICAgICAgICBhc3NldC5hdGxhc1RleHQgPSBhdGxhcztcclxuICAgICAgICBhc3NldC50ZXh0dXJlcyA9IFtwbmddO1xyXG4gICAgICAgIGFzc2V0W1widGV4dHVyZU5hbWVzXCJdID0gW1wibGdFZmZlY3QucG5nXCJdO1xyXG4gICAgICAgIHNrZS5za2VsZXRvbkRhdGEgPSBhc3NldDtcclxuICAgICAgICBza2UuYW5pbWF0aW9uID0gJ2lkbGUnO1xyXG4gICAgICAgIHNrZS5fdXBkYXRlU2tlbGV0b25EYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHVibGljIGxvYWRMb2dvKGxvU3ApXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgdGhpcy5sb2FkU3ByaXRlKGxvU3AsIHRoaXMubG9nbyk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy/ojrflj5ZiZ23ljp/nlJ/lnLDlnYBcclxuICAgIHB1YmxpYyBnZXREZWZhdWx0QmdtVXJsKClcclxuICAgIHtcclxuICAgICAgICBpZighY2Muc3lzLmlzTmF0aXZlKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEZpbGVQYXRoKHRoaXMuYmdtTmFtZSwgdGhpcy5nZXRBcHBJRCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRTcHJpdGUoYmdTcDpjYy5TcHJpdGUsIGZpbGVOYW1lLGNhbGxiYWNrPylcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBpZighY2Muc3lzLmlzTmF0aXZlIHx8ICFiZ1NwIClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgXHJcbiAgICAgICAgbGV0IHBhdGggPSB0aGlzLmdldEZpbGVQYXRoKGZpbGVOYW1lLCB0aGlzLmdldEFwcElEKCkpO1xyXG4gICAgICAgIGlmKCFwYXRoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0ZXh0dXJlIDpjYy5UZXh0dXJlMkQgPSBjYy5sb2FkZXIuZ2V0UmVzKHBhdGgpO1xyXG4gICAgICAgIGlmKHRleHR1cmUgIT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGJnU3AgJiYgYmdTcC5ub2RlLmlzVmFsaWQpXHJcbiAgICAgICAgICAgIHsgICBcclxuICAgICAgICAgICAgICAgIGJnU3Auc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICBpZihjYWxsYmFjaylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh0ZXh0dXJlLmhlaWdodClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZChwYXRoLCAoZXJyb3IsIHRleHR1cmU6Y2MuVGV4dHVyZTJEKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYoZXJyb3IgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAoYmdTcCAmJiBiZ1NwLm5vZGUuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJnU3Auc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRleHR1cmUuaGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBsb2FkSGFsbEJ1bmRsZShvbkNvbXBsZXRlPzogKGVycjogRXJyb3IsIGJ1bmRsZTogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSkgPT4gdm9pZCl7XHJcbiAgICAgICAgbGV0IGhhbGxzdHlsZSA9IHRoaXMuZ2V0SGFsbEJ1bmRsZU5hbWUoKVxyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZEJ1bmRsZShoYWxsc3R5bGUsKGVycixidW5kbGU6Y2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSk9PntcclxuICAgICAgICAgICAgaWYgKGVycil7XHJcbiAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJsb2FkIGZhaWxlZCBoYWxsc3R5bGUgXCIgKyBoYWxsc3R5bGUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9uQ29tcGxldGUpe1xyXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZShlcnIsYnVuZGxlKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEhhbGxCdW5kbGVOYW1lKCl7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IEdsb2JhbC5TZXR0aW5nLlNraW5Db25maWcub3JpZ25hbEFwcGNmZ1xyXG4gICAgICAgIGxldCBoYWxsc3R5bGUgPSBcImhhbGxfc3R5bGVfMFwiXHJcbiAgICAgICAgaWYgKGNvbmZpZyAmJiBjb25maWcuaGFsbFN0eWxlKXtcclxuICAgICAgICAgICAgaGFsbHN0eWxlID0gY29uZmlnLmhhbGxTdHlsZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaGFsbHN0eWxlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEhhbGxCdW5kbGVQYXRoKCl7XHJcbiAgICAgICAgbGV0IGJ1bmRsZU5hbWUgPSB0aGlzLmdldEhhbGxCdW5kbGVOYW1lKClcclxuICAgICAgICBsZXQgYnVuZGxlUGF0aCA9IGJ1bmRsZU5hbWVcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKXtcclxuICAgICAgICAgICAgbGV0IGJ1bmRsZURpciA9IEdsb2JhbC5Ib3RVcGRhdGVNYW5hZ2VyLnVwZGF0ZUhlbHBlci5nZW5TdG9yYWdlUGF0aChcImhhbGxcIikgKyBcIi9cIiArIGJ1bmRsZU5hbWVcclxuICAgICAgICAgICAgaWYgKGpzYiAmJiBqc2IuZmlsZVV0aWxzLmlzRGlyZWN0b3J5RXhpc3QoYnVuZGxlRGlyKSkge1xyXG4gICAgICAgICAgICAgICAgYnVuZGxlUGF0aCA9IGpzYi5maWxlVXRpbHMuZnVsbFBhdGhGb3JGaWxlbmFtZShidW5kbGVEaXIpXHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGpzYiAmJiBqc2IuZmlsZVV0aWxzLmlzRGlyZWN0b3J5RXhpc3QoYnVuZGxlTmFtZSkpe1xyXG4gICAgICAgICAgICAgICAgYnVuZGxlUGF0aCA9IGpzYi5maWxlVXRpbHMuZnVsbFBhdGhGb3JGaWxlbmFtZShidW5kbGVOYW1lKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExvZ2dlci5lcnJvcihcImdldEhhbGxCdW5kbGVQYXRoIGJ1bmRsZVBhdGggPSBcIiArIGJ1bmRsZVBhdGgpXHJcbiAgICAgICAgcmV0dXJuIGJ1bmRsZVBhdGhcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldEhhbGxCdW5kbGVSZXMocGF0aCx0eXBlPzogdHlwZW9mIGNjLkFzc2V0KXtcclxuICAgICAgICBsZXQgYnVuZGxlTmFtZSA9IHRoaXMuZ2V0SGFsbEJ1bmRsZU5hbWUoKVxyXG4gICAgICAgIGlmIChidW5kbGVOYW1lKXtcclxuICAgICAgICAgICAgbGV0IHJlczphbnkgPSBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdldEJ1bmRsZVJlcyhidW5kbGVOYW1lLHBhdGgsdHlwZSlcclxuICAgICAgICAgICAgaWYgKHJlcyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImdldEhhbGxCdW5kbGVSZXMgZ2V0QnVuZGxlUmVzIG51bGxcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImdldEhhbGxCdW5kbGVSZXMgYnVuZGxlTmFtZSBudWxsXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0ICBlbnVtIEJUTklOREVYXHJcbntcclxuICAgIFJlZ2lzdEJ0biA9IDAgLFxyXG4gICAgT2ZmaWNhbEJ0biA9IDEgLFxyXG4gICAgU2VydmljZUJ0biA9IDIsXHJcbiAgICBWaXN0b3JMb2dpbkJ0biA9IDMsXHJcbiAgICBXZUNoYXRMb2dpbkJ0biA9IDQsXHJcbiAgICBQaG9uZUxvZ2luQnRuID0gNVxyXG5cclxuXHJcbn1cclxuXHJcbiJdfQ==