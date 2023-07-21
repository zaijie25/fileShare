"use strict";
cc._RF.push(module, 'ea0e2dMVGRPSpW7wHmYrXQr', 'Global');
// hall/scripts/logic/core/Global.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher_1 = require("../../framework/event/EventDispatcher");
var Logger_1 = require("../../framework/debug/Logger");
var FsmManager_1 = require("../../framework/fsm/FsmManager");
var HttpProxy_1 = require("../../framework/net/http/HttpProxy");
var HallServer_1 = require("./net/hall/HallServer");
var ResourceManager_1 = require("../../framework/resource/ResourceManager");
var Setting_1 = require("./setting/Setting");
var Toolkit_1 = require("./tool/Toolkit");
var AudioManager_1 = require("../../framework/audio/AudioManager");
var UIManager_1 = require("./ui/UIManager");
var ModelMananger_1 = require("../../framework/model/ModelMananger");
var ConfigManager_1 = require("../../framework/config/ConfigManager");
var SectionManager_1 = require("../../framework/section/SectionManager");
var SceneManager_1 = require("./scene/SceneManager");
var ComponentProvider_1 = require("./component/ComponentProvider");
var NatvieEvent_1 = require("../../framework/native/NatvieEvent");
var HotUpdateManager_1 = require("./hotUpdate/HotUpdateManager");
var PlayerData_1 = require("../hallcommon/data/PlayerData");
var GameData_1 = require("../hallcommon/data/GameData");
var Language_1 = require("./tool/Language");
var UIHelper_1 = require("./tool/UIHelper");
var PersisitHelpper_1 = require("./tool/PersisitHelpper");
var GongGaoData_1 = require("../hallcommon/data/GongGaoData");
var ActivityToggle_1 = require("../hall/ui/hall/ActivityToggle");
var ChatServer_1 = require("./net/chat/ChatServer");
var ReportTool_1 = require("./tool/ReportTool");
var DNSControl_1 = require("../../framework/net/dns/DNSControl");
var NativeJSBBridge_1 = require("../../framework/native/NativeJSBBridge");
var AppDunControl_1 = require("../../framework/net/dun/AppDunControl");
var CustomApp_1 = require("../hallcommon/app/CustomApp");
var AESUtil_1 = require("./tool/AESUtil");
var ArrayUtil_1 = require("./tool/ArrayUtil");
var ChannelUtil_1 = require("./tool/ChannelUtil");
var JSUtil_1 = require("./tool/JSUtil");
var UIUtil_1 = require("./tool/UIUtil");
var UrlUtil_1 = require("./tool/UrlUtil");
var ModuleManager_1 = require("../../framework/module/ModuleManager");
var WebViewControl_1 = require("./component/WebViewControl");
var AppUpdateHelper_1 = require("./tool/AppUpdateHelper");
var SearchPathHelper_1 = require("./tool/SearchPathHelper");
var WebNative_1 = require("../../framework/native/WebNative");
var GameWebView_1 = require("../../framework/native/GameWebView");
var DunHotUpdateUrlSetting_1 = require("./setting/DunHotUpdateUrlSetting");
var Global = /** @class */ (function () {
    function Global() {
    }
    Global.setup = function () {
        //全局事件管理器
        this.Event = new EventDispatcher_1.default();
        //三方库的使用 + 常用工具函数
        this.Toolkit = new Toolkit_1.default();
        this.AESUtil = new AESUtil_1.AESUtil();
        this.ArrayUtil = new ArrayUtil_1.default();
        this.ChannelUtil = new ChannelUtil_1.ChannelUtil();
        this.JSUtil = new JSUtil_1.JSUtil();
        this.UIUtil = new UIUtil_1.default();
        this.UrlUtil = new UrlUtil_1.UrlUtil();
        this.ModuleManager = new ModuleManager_1.ModuleManager();
        this.WebViewControl = new WebViewControl_1.default();
        this.AppUpdateHelper = new AppUpdateHelper_1.default();
        this.SearchPathHelper = new SearchPathHelper_1.default();
        this.UIHelper = new UIHelper_1.default();
        Logger_1.Logger.logLevel = Logger_1.LogLevel.All;
        Logger_1.Logger.logEnable = false;
        //fsm管理器
        this.FsmManager = new FsmManager_1.default();
        //http请求  主要负责common协议请求  和 get请求  业务逻辑走netmanager
        this.Http = new HttpProxy_1.default();
        //大厅协议通信
        //各类游戏配置  +  本地存储
        this.Setting = new Setting_1.default();
        this.Setting.setup();
        //资源管理器  资源加载  释放   依赖管理
        this.ResourceManager = new ResourceManager_1.default();
        //数据模块管理器
        this.ModelManager = ModelMananger_1.default.Instance;
        this.ModelManager.init();
        //配置管理器
        this.ConfigManager = ConfigManager_1.default.Instance;
        this.SectionManager = SectionManager_1.default.Instance;
        this.Audio = new AudioManager_1.default();
        this.Audio.setup(this.Setting.settingData, this.ResourceManager);
        this.UI = new UIManager_1.default();
        this.UI.setup(this.ResourceManager);
        this.Persist = new PersisitHelpper_1.default();
        this.PlayerData = new PlayerData_1.default();
        this.GameData = new GameData_1.default();
        this.GongGaoData = new GongGaoData_1.default();
        this.ActivityToggle = new ActivityToggle_1.default();
        this.DunHotUpdateUrlSetting = new DunHotUpdateUrlSetting_1.default();
        this.SceneManager = new SceneManager_1.default();
        this.SceneManager.setup();
        this.Component = new ComponentProvider_1.default("GlobalDriver");
        this.Component.setup(this.onUpdate.bind(this), this.onLateUpdate.bind(this));
        this.NativeEvent = new NatvieEvent_1.default();
        this.HotUpdateManager = new HotUpdateManager_1.default();
        this.HallServer = new HallServer_1.default();
        this.HallServer.setup();
        this.Language = new Language_1.default();
        this.ChatServer = new ChatServer_1.default();
        this.ReportTool = new ReportTool_1.ReportTool();
        this.ReportTool.init();
        this.DNS = new DNSControl_1.default();
        this.NativeJSBBridge = new NativeJSBBridge_1.default();
        this.AppDun = new AppDunControl_1.default();
        this.customApp = new CustomApp_1.default();
        this.customApp.initConfig();
        if (cc.sys.isBrowser) { //浏览器状态下注册webNative类
            this.WebNative = new WebNative_1.default();
            this.WebNative.setup();
            this.GameWebView = new GameWebView_1.default();
            this.GameWebView.init();
        }
    };
    Global.onUpdate = function (dt) {
        this.HallServer.onUpdate(dt);
        this.FsmManager.onUpdate();
        this.UI.onUpdate(dt);
        this.Http.onUpdate(dt);
        this.ReportTool.onUpdate(dt);
    };
    Global.onLateUpdate = function () {
    };
    return Global;
}());
exports.default = Global;

cc._RF.pop();