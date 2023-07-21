
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/Global.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXEdsb2JhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlFQUFvRTtBQUNwRSx1REFBZ0U7QUFDaEUsNkRBQXdEO0FBQ3hELGdFQUEyRDtBQUMzRCxvREFBK0M7QUFDL0MsNEVBQXVFO0FBQ3ZFLDZDQUF3QztBQUN4QywwQ0FBcUM7QUFDckMsbUVBQThEO0FBQzlELDRDQUF1QztBQUN2QyxxRUFBK0Q7QUFDL0Qsc0VBQWlFO0FBQ2pFLHlFQUFvRTtBQUNwRSxxREFBZ0Q7QUFDaEQsbUVBQThEO0FBQzlELGtFQUE2RDtBQUM3RCxpRUFBNEQ7QUFDNUQsNERBQXVEO0FBQ3ZELHdEQUFtRDtBQUNuRCw0Q0FBdUM7QUFDdkMsNENBQXVDO0FBQ3ZDLDBEQUFtRDtBQUNuRCw4REFBeUQ7QUFDekQsaUVBQTREO0FBQzVELG9EQUErQztBQUMvQyxnREFBK0M7QUFDL0MsaUVBQTREO0FBQzVELDBFQUFxRTtBQUNyRSx1RUFBa0U7QUFDbEUseURBQXdEO0FBQ3hELDBDQUF5QztBQUN6Qyw4Q0FBeUM7QUFDekMsa0RBQWlEO0FBQ2pELHdDQUF1QztBQUN2Qyx3Q0FBbUM7QUFDbkMsMENBQXlDO0FBQ3pDLHNFQUFxRTtBQUNyRSw2REFBd0Q7QUFDeEQsMERBQXFEO0FBQ3JELDREQUF1RDtBQUN2RCw4REFBeUQ7QUFDekQsa0VBQTZEO0FBQzdELDJFQUFzRTtBQUd0RTtJQUFBO0lBcUtBLENBQUM7SUF6R2lCLFlBQUssR0FBbkI7UUFFSSxTQUFTO1FBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLHlCQUFlLEVBQUUsQ0FBQztRQUNuQyxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcs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LElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVhLG1CQUFZLEdBQTFCO0lBRUEsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQXJLQSxBQXFLQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL2V2ZW50L0V2ZW50RGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQgeyBMb2dnZXIsIExvZ0xldmVsIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9kZWJ1Zy9Mb2dnZXJcIjtcclxuaW1wb3J0IEZzbU1hbmFnZXIgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9mc20vRnNtTWFuYWdlclwiO1xyXG5pbXBvcnQgSHR0cFByb3h5IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvbmV0L2h0dHAvSHR0cFByb3h5XCI7XHJcbmltcG9ydCBIYWxsU2VydmVyIGZyb20gXCIuL25ldC9oYWxsL0hhbGxTZXJ2ZXJcIjtcclxuaW1wb3J0IFJlc291cmNlTWFuYWdlciBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL3Jlc291cmNlL1Jlc291cmNlTWFuYWdlclwiO1xyXG5pbXBvcnQgU2V0dGluZyBmcm9tIFwiLi9zZXR0aW5nL1NldHRpbmdcIjtcclxuaW1wb3J0IFRvb2xraXQgZnJvbSBcIi4vdG9vbC9Ub29sa2l0XCI7XHJcbmltcG9ydCBBdWRpb01hbmFnZXIgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9hdWRpby9BdWRpb01hbmFnZXJcIjtcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi91aS9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IE1vZGVsTWFuYWdlciBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL21vZGVsL01vZGVsTWFuYW5nZXJcIjtcclxuaW1wb3J0IENvbmZpZ01hbmFnZXIgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9jb25maWcvQ29uZmlnTWFuYWdlclwiO1xyXG5pbXBvcnQgU2VjdGlvbk1hbmFnZXIgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9zZWN0aW9uL1NlY3Rpb25NYW5hZ2VyXCI7XHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vc2NlbmUvU2NlbmVNYW5hZ2VyXCI7XHJcbmltcG9ydCBDb21wb25lbnRQcm92aWRlciBmcm9tIFwiLi9jb21wb25lbnQvQ29tcG9uZW50UHJvdmlkZXJcIjtcclxuaW1wb3J0IE5hdGl2ZUV2ZW50IGZyb20gXCIuLi8uLi9mcmFtZXdvcmsvbmF0aXZlL05hdHZpZUV2ZW50XCI7XHJcbmltcG9ydCBIb3RVcGRhdGVNYW5hZ2VyIGZyb20gXCIuL2hvdFVwZGF0ZS9Ib3RVcGRhdGVNYW5hZ2VyXCI7XHJcbmltcG9ydCBQbGF5ZXJEYXRhIGZyb20gXCIuLi9oYWxsY29tbW9uL2RhdGEvUGxheWVyRGF0YVwiO1xyXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4uL2hhbGxjb21tb24vZGF0YS9HYW1lRGF0YVwiO1xyXG5pbXBvcnQgTGFuZ3VhZ2UgZnJvbSBcIi4vdG9vbC9MYW5ndWFnZVwiO1xyXG5pbXBvcnQgVUlIZWxwZXIgZnJvbSBcIi4vdG9vbC9VSUhlbHBlclwiO1xyXG5pbXBvcnQgUGVyc2lzdEhlbHBlciBmcm9tIFwiLi90b29sL1BlcnNpc2l0SGVscHBlclwiO1xyXG5pbXBvcnQgR29uZ0dhb0RhdGEgZnJvbSBcIi4uL2hhbGxjb21tb24vZGF0YS9Hb25nR2FvRGF0YVwiO1xyXG5pbXBvcnQgQWN0aXZpdHlUb2dnbGUgZnJvbSBcIi4uL2hhbGwvdWkvaGFsbC9BY3Rpdml0eVRvZ2dsZVwiO1xyXG5pbXBvcnQgQ2hhdFNlcnZlciBmcm9tIFwiLi9uZXQvY2hhdC9DaGF0U2VydmVyXCI7XHJcbmltcG9ydCB7IFJlcG9ydFRvb2wgfSBmcm9tIFwiLi90b29sL1JlcG9ydFRvb2xcIjtcclxuaW1wb3J0IEROU0NvbnRyb2wgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9uZXQvZG5zL0ROU0NvbnRyb2xcIjtcclxuaW1wb3J0IE5hdGl2ZUpTQkJyaWRnZSBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL25hdGl2ZS9OYXRpdmVKU0JCcmlkZ2VcIjtcclxuaW1wb3J0IEFwcER1bkNvbnRyb2wgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9uZXQvZHVuL0FwcER1bkNvbnRyb2xcIjtcclxuaW1wb3J0IEN1c3RvbUFwcEluZm8gZnJvbSBcIi4uL2hhbGxjb21tb24vYXBwL0N1c3RvbUFwcFwiO1xyXG5pbXBvcnQgeyBBRVNVdGlsIH0gZnJvbSBcIi4vdG9vbC9BRVNVdGlsXCI7XHJcbmltcG9ydCBBcnJheVV0aWwgZnJvbSBcIi4vdG9vbC9BcnJheVV0aWxcIjtcclxuaW1wb3J0IHsgQ2hhbm5lbFV0aWwgfSBmcm9tIFwiLi90b29sL0NoYW5uZWxVdGlsXCI7XHJcbmltcG9ydCB7IEpTVXRpbCB9IGZyb20gXCIuL3Rvb2wvSlNVdGlsXCI7XHJcbmltcG9ydCBVSVV0aWwgZnJvbSBcIi4vdG9vbC9VSVV0aWxcIjtcclxuaW1wb3J0IHsgVXJsVXRpbCB9IGZyb20gXCIuL3Rvb2wvVXJsVXRpbFwiO1xyXG5pbXBvcnQgeyBNb2R1bGVNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9tb2R1bGUvTW9kdWxlTWFuYWdlclwiO1xyXG5pbXBvcnQgV2ViVmlld0NvbnRyb2wgZnJvbSBcIi4vY29tcG9uZW50L1dlYlZpZXdDb250cm9sXCI7XHJcbmltcG9ydCBBcHBVcGRhdGVIZWxwZXIgZnJvbSBcIi4vdG9vbC9BcHBVcGRhdGVIZWxwZXJcIjtcclxuaW1wb3J0IFNlYXJjaFBhdGhIZWxwZXIgZnJvbSBcIi4vdG9vbC9TZWFyY2hQYXRoSGVscGVyXCI7XHJcbmltcG9ydCBXZWJOYXRpdmUgZnJvbSBcIi4uLy4uL2ZyYW1ld29yay9uYXRpdmUvV2ViTmF0aXZlXCI7XHJcbmltcG9ydCBHYW1lV2ViVmlldyBmcm9tIFwiLi4vLi4vZnJhbWV3b3JrL25hdGl2ZS9HYW1lV2ViVmlld1wiO1xyXG5pbXBvcnQgRHVuSG90VXBkYXRlVXJsU2V0dGluZyBmcm9tIFwiLi9zZXR0aW5nL0R1bkhvdFVwZGF0ZVVybFNldHRpbmdcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCAgY2xhc3MgR2xvYmFsIFxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIEV2ZW50OkV2ZW50RGlzcGF0Y2hlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgRnNtTWFuYWdlcjpGc21NYW5hZ2VyO1xyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIEh0dHA6SHR0cFByb3h5O1xyXG4gICAgcHVibGljIHN0YXRpYyBIYWxsU2VydmVyOkhhbGxTZXJ2ZXI7XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgVG9vbGtpdDpUb29sa2l0O1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgVUlIZWxwZXI6VUlIZWxwZXI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBTZXR0aW5nOlNldHRpbmc7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBSZXNvdXJjZU1hbmFnZXI6UmVzb3VyY2VNYW5hZ2VyO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgQXVkaW86QXVkaW9NYW5hZ2VyO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTW9kZWxNYW5hZ2VyOk1vZGVsTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgQ29uZmlnTWFuYWdlcjpDb25maWdNYW5hZ2VyO1xyXG4gICAgcHVibGljIHN0YXRpYyBTZWN0aW9uTWFuYWdlcjpTZWN0aW9uTWFuYWdlcjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFVJOlVJTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgU2NlbmVNYW5hZ2VyOlNjZW5lTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgTmF0aXZlRXZlbnQ6TmF0aXZlRXZlbnQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIFdlYk5hdGl2ZTpXZWJOYXRpdmU7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdhbWVXZWJWaWV3OkdhbWVXZWJWaWV3O1xyXG4gICAgXHJcbiAgICBwdWJsaWMgc3RhdGljIENvbXBvbmVudDpDb21wb25lbnRQcm92aWRlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgSG90VXBkYXRlTWFuYWdlcjpIb3RVcGRhdGVNYW5hZ2VyO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTGFuZ3VhZ2U6TGFuZ3VhZ2U7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBQbGF5ZXJEYXRhOlBsYXllckRhdGE7XHJcbiAgICBwdWJsaWMgc3RhdGljIEdhbWVEYXRhOkdhbWVEYXRhO1xyXG4gICAgcHVibGljIHN0YXRpYyBHb25nR2FvRGF0YTpHb25nR2FvRGF0YTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFBlcnNpc3Q6UGVyc2lzdEhlbHBlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgQWN0aXZpdHlUb2dnbGU6QWN0aXZpdHlUb2dnbGU7XHJcbiAgICBwdWJsaWMgc3RhdGljIENoYXRTZXJ2ZXI6Q2hhdFNlcnZlcjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFJlcG9ydFRvb2w6UmVwb3J0VG9vbDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEROUzpETlNDb250cm9sO1xyXG4gICAgcHVibGljIHN0YXRpYyBOYXRpdmVKU0JCcmlkZ2U6TmF0aXZlSlNCQnJpZGdlO1xyXG4gICAgcHVibGljIHN0YXRpYyBBcHBEdW46QXBwRHVuQ29udHJvbFxyXG4gICAgcHVibGljIHN0YXRpYyBjdXN0b21BcHA6Q3VzdG9tQXBwSW5mbztcclxuICAgIHB1YmxpYyBzdGF0aWMgQUVTVXRpbDpBRVNVdGlsO1xyXG4gICAgcHVibGljIHN0YXRpYyBBcnJheVV0aWw6QXJyYXlVdGlsO1xyXG4gICAgcHVibGljIHN0YXRpYyBDaGFubmVsVXRpbDpDaGFubmVsVXRpbDtcclxuICAgIHB1YmxpYyBzdGF0aWMgSlNVdGlsOkpTVXRpbDtcclxuICAgIHB1YmxpYyBzdGF0aWMgVUlVdGlsOlVJVXRpbDtcclxuICAgIHB1YmxpYyBzdGF0aWMgVXJsVXRpbDpVcmxVdGlsO1xyXG4gICAgcHVibGljIHN0YXRpYyBNb2R1bGVNYW5hZ2VyOk1vZHVsZU1hbmFnZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFdlYlZpZXdDb250cm9sOldlYlZpZXdDb250cm9sO1xyXG4gICAgcHVibGljIHN0YXRpYyBBcHBVcGRhdGVIZWxwZXI6QXBwVXBkYXRlSGVscGVyO1xyXG4gICAgcHVibGljIHN0YXRpYyBTZWFyY2hQYXRoSGVscGVyOiBTZWFyY2hQYXRoSGVscGVyO1xyXG4gICAgcHVibGljIHN0YXRpYyBEdW5Ib3RVcGRhdGVVcmxTZXR0aW5nIDogRHVuSG90VXBkYXRlVXJsU2V0dGluZ1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0dXAoKVxyXG4gICAge1xyXG4gICAgICAgIC8v5YWo5bGA5LqL5Lu2566h55CG5ZmoXHJcbiAgICAgICAgdGhpcy5FdmVudCA9IG5ldyBFdmVudERpc3BhdGNoZXIoKTtcclxuICAgICAgICAvL+S4ieaWueW6k+eahOS9v+eUqCArIOW4uOeUqOW3peWFt+WHveaVsFxyXG4gICAgICAgIHRoaXMuVG9vbGtpdCA9IG5ldyBUb29sa2l0KCk7XHJcbiAgICAgICAgdGhpcy5BRVNVdGlsID0gbmV3IEFFU1V0aWwoKTtcclxuICAgICAgICB0aGlzLkFycmF5VXRpbCA9IG5ldyBBcnJheVV0aWwoKTtcclxuICAgICAgICB0aGlzLkNoYW5uZWxVdGlsID0gbmV3IENoYW5uZWxVdGlsKCk7XHJcbiAgICAgICAgdGhpcy5KU1V0aWwgPSBuZXcgSlNVdGlsKCk7XHJcbiAgICAgICAgdGhpcy5VSVV0aWwgPSBuZXcgVUlVdGlsKCk7XHJcbiAgICAgICAgdGhpcy5VcmxVdGlsID0gbmV3IFVybFV0aWwoKTtcclxuICAgICAgICB0aGlzLk1vZHVsZU1hbmFnZXIgPSBuZXcgTW9kdWxlTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMuV2ViVmlld0NvbnRyb2wgPSBuZXcgV2ViVmlld0NvbnRyb2woKVxyXG4gICAgICAgIHRoaXMuQXBwVXBkYXRlSGVscGVyID0gbmV3IEFwcFVwZGF0ZUhlbHBlcigpO1xyXG4gICAgICAgIHRoaXMuU2VhcmNoUGF0aEhlbHBlciA9IG5ldyBTZWFyY2hQYXRoSGVscGVyKCk7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuVUlIZWxwZXIgPSBuZXcgVUlIZWxwZXIoKTtcclxuXHJcbiAgICAgICAgTG9nZ2VyLmxvZ0xldmVsID0gTG9nTGV2ZWwuQWxsO1xyXG4gICAgICAgIExvZ2dlci5sb2dFbmFibGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy9mc23nrqHnkIblmahcclxuICAgICAgICB0aGlzLkZzbU1hbmFnZXIgPSBuZXcgRnNtTWFuYWdlcigpO1xyXG4gICAgICAgIC8vaHR0cOivt+axgiAg5Li76KaB6LSf6LSjY29tbW9u5Y2P6K6u6K+35rGCICDlkowgZ2V06K+35rGCICDkuJrliqHpgLvovpHotbBuZXRtYW5hZ2VyXHJcbiAgICAgICAgdGhpcy5IdHRwID0gbmV3IEh0dHBQcm94eSgpO1xyXG4gICAgICAgIC8v5aSn5Y6F5Y2P6K6u6YCa5L+hXHJcblxyXG5cclxuICAgICAgICAvL+WQhOexu+a4uOaIj+mFjee9riAgKyAg5pys5Zyw5a2Y5YKoXHJcbiAgICAgICAgdGhpcy5TZXR0aW5nID0gbmV3IFNldHRpbmcoKTtcclxuICAgICAgICB0aGlzLlNldHRpbmcuc2V0dXAoKTtcclxuICAgICAgICAvL+i1hOa6kOeuoeeQhuWZqCAg6LWE5rqQ5Yqg6L29ICDph4rmlL4gICDkvp3otZbnrqHnkIZcclxuICAgICAgICB0aGlzLlJlc291cmNlTWFuYWdlciA9IG5ldyBSZXNvdXJjZU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgLy/mlbDmja7mqKHlnZfnrqHnkIblmahcclxuICAgICAgICB0aGlzLk1vZGVsTWFuYWdlciA9IE1vZGVsTWFuYWdlci5JbnN0YW5jZTtcclxuICAgICAgICB0aGlzLk1vZGVsTWFuYWdlci5pbml0KCk7XHJcbiAgICAgICAgLy/phY3nva7nrqHnkIblmahcclxuICAgICAgICB0aGlzLkNvbmZpZ01hbmFnZXIgPSBDb25maWdNYW5hZ2VyLkluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuU2VjdGlvbk1hbmFnZXIgPSBTZWN0aW9uTWFuYWdlci5JbnN0YW5jZTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLkF1ZGlvID0gbmV3IEF1ZGlvTWFuYWdlcigpO1xyXG4gICAgICAgIHRoaXMuQXVkaW8uc2V0dXAodGhpcy5TZXR0aW5nLnNldHRpbmdEYXRhLCB0aGlzLlJlc291cmNlTWFuYWdlcik7XHJcblxyXG4gICAgICAgIHRoaXMuVUkgPSBuZXcgVUlNYW5hZ2VyKCk7XHJcbiAgICAgICAgdGhpcy5VSS5zZXR1cCh0aGlzLlJlc291cmNlTWFuYWdlcik7XHJcblxyXG4gICAgICAgIHRoaXMuUGVyc2lzdCA9IG5ldyBQZXJzaXN0SGVscGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyRGF0YSA9IG5ldyBQbGF5ZXJEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5HYW1lRGF0YSA9IG5ldyBHYW1lRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuR29uZ0dhb0RhdGEgPSBuZXcgR29uZ0dhb0RhdGEoKTtcclxuICAgICAgICB0aGlzLkFjdGl2aXR5VG9nZ2xlID0gbmV3IEFjdGl2aXR5VG9nZ2xlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuRHVuSG90VXBkYXRlVXJsU2V0dGluZyA9IG5ldyBEdW5Ib3RVcGRhdGVVcmxTZXR0aW5nKClcclxuXHJcbiAgICAgICAgdGhpcy5TY2VuZU1hbmFnZXIgPSBuZXcgU2NlbmVNYW5hZ2VyKCk7XHJcbiAgICAgICAgdGhpcy5TY2VuZU1hbmFnZXIuc2V0dXAoKTtcclxuXHJcbiAgICAgICAgdGhpcy5Db21wb25lbnQgPSBuZXcgQ29tcG9uZW50UHJvdmlkZXIoXCJHbG9iYWxEcml2ZXJcIik7XHJcbiAgICAgICAgdGhpcy5Db21wb25lbnQuc2V0dXAodGhpcy5vblVwZGF0ZS5iaW5kKHRoaXMpLCB0aGlzLm9uTGF0ZVVwZGF0ZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLk5hdGl2ZUV2ZW50ID0gbmV3IE5hdGl2ZUV2ZW50KCk7XHJcbiAgICAgICAgdGhpcy5Ib3RVcGRhdGVNYW5hZ2VyID0gbmV3IEhvdFVwZGF0ZU1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5IYWxsU2VydmVyID0gbmV3IEhhbGxTZXJ2ZXIoKTtcclxuICAgICAgICB0aGlzLkhhbGxTZXJ2ZXIuc2V0dXAoKTtcclxuXHJcbiAgICAgICAgdGhpcy5MYW5ndWFnZSA9IG5ldyBMYW5ndWFnZSgpO1xyXG4gICAgICAgIHRoaXMuQ2hhdFNlcnZlciA9IG5ldyBDaGF0U2VydmVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuUmVwb3J0VG9vbCA9IG5ldyBSZXBvcnRUb29sKCk7XHJcbiAgICAgICAgdGhpcy5SZXBvcnRUb29sLmluaXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5ETlMgPSBuZXcgRE5TQ29udHJvbCgpO1xyXG4gICAgICAgIHRoaXMuTmF0aXZlSlNCQnJpZGdlID0gbmV3IE5hdGl2ZUpTQkJyaWRnZSgpO1xyXG4gICAgICAgIHRoaXMuQXBwRHVuID0gbmV3IEFwcER1bkNvbnRyb2woKTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXN0b21BcHAgPSBuZXcgQ3VzdG9tQXBwSW5mbygpO1xyXG4gICAgICAgIHRoaXMuY3VzdG9tQXBwLmluaXRDb25maWcoKVxyXG5cclxuICAgICAgICBpZihjYy5zeXMuaXNCcm93c2VyKXsgICAvL+a1j+iniOWZqOeKtuaAgeS4i+azqOWGjHdlYk5hdGl2Zeexu1xyXG4gICAgICAgICAgICB0aGlzLldlYk5hdGl2ZSA9IG5ldyBXZWJOYXRpdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5XZWJOYXRpdmUuc2V0dXAoKTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lV2ViVmlldyA9IG5ldyBHYW1lV2ViVmlldygpO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVXZWJWaWV3LmluaXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgb25VcGRhdGUoZHQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5IYWxsU2VydmVyLm9uVXBkYXRlKGR0KVxyXG4gICAgICAgIHRoaXMuRnNtTWFuYWdlci5vblVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuVUkub25VcGRhdGUoZHQpO1xyXG4gICAgICAgIHRoaXMuSHR0cC5vblVwZGF0ZShkdCk7XHJcbiAgICAgICAgdGhpcy5SZXBvcnRUb29sLm9uVXBkYXRlKGR0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG9uTGF0ZVVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICB9XHJcbn0iXX0=