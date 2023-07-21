"use strict";
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