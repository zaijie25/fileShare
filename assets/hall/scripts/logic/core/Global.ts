import EventDispatcher from "../../framework/event/EventDispatcher";
import { Logger, LogLevel } from "../../framework/debug/Logger";
import FsmManager from "../../framework/fsm/FsmManager";
import HttpProxy from "../../framework/net/http/HttpProxy";
import HallServer from "./net/hall/HallServer";
import ResourceManager from "../../framework/resource/ResourceManager";
import Setting from "./setting/Setting";
import Toolkit from "./tool/Toolkit";
import AudioManager from "../../framework/audio/AudioManager";
import UIManager from "./ui/UIManager";
import ModelManager from "../../framework/model/ModelMananger";
import ConfigManager from "../../framework/config/ConfigManager";
import SectionManager from "../../framework/section/SectionManager";
import SceneManager from "./scene/SceneManager";
import ComponentProvider from "./component/ComponentProvider";
import NativeEvent from "../../framework/native/NatvieEvent";
import HotUpdateManager from "./hotUpdate/HotUpdateManager";
import PlayerData from "../hallcommon/data/PlayerData";
import GameData from "../hallcommon/data/GameData";
import Language from "./tool/Language";
import UIHelper from "./tool/UIHelper";
import PersistHelper from "./tool/PersisitHelpper";
import GongGaoData from "../hallcommon/data/GongGaoData";
import ActivityToggle from "../hall/ui/hall/ActivityToggle";
import ChatServer from "./net/chat/ChatServer";
import { ReportTool } from "./tool/ReportTool";
import DNSControl from "../../framework/net/dns/DNSControl";
import NativeJSBBridge from "../../framework/native/NativeJSBBridge";
import AppDunControl from "../../framework/net/dun/AppDunControl";
import CustomAppInfo from "../hallcommon/app/CustomApp";
import { AESUtil } from "./tool/AESUtil";
import ArrayUtil from "./tool/ArrayUtil";
import { ChannelUtil } from "./tool/ChannelUtil";
import { JSUtil } from "./tool/JSUtil";
import UIUtil from "./tool/UIUtil";
import { UrlUtil } from "./tool/UrlUtil";
import { ModuleManager } from "../../framework/module/ModuleManager";
import WebViewControl from "./component/WebViewControl";
import AppUpdateHelper from "./tool/AppUpdateHelper";
import SearchPathHelper from "./tool/SearchPathHelper";
import WebNative from "../../framework/native/WebNative";
import GameWebView from "../../framework/native/GameWebView";
import DunHotUpdateUrlSetting from "./setting/DunHotUpdateUrlSetting";


export default  class Global 
{
    public static Event:EventDispatcher;
    public static FsmManager:FsmManager;
    
    public static Http:HttpProxy;
    public static HallServer:HallServer;


    public static Toolkit:Toolkit;

    public static UIHelper:UIHelper;

    public static Setting:Setting;

    public static ResourceManager:ResourceManager;

    public static Audio:AudioManager;

    public static ModelManager:ModelManager;
    public static ConfigManager:ConfigManager;
    public static SectionManager:SectionManager;

    public static UI:UIManager;
    public static SceneManager:SceneManager;
    public static NativeEvent:NativeEvent;
    public static WebNative:WebNative;
    public static GameWebView:GameWebView;
    
    public static Component:ComponentProvider;
    public static HotUpdateManager:HotUpdateManager;

    public static Language:Language;

    public static PlayerData:PlayerData;
    public static GameData:GameData;
    public static GongGaoData:GongGaoData;

    public static Persist:PersistHelper;
    public static ActivityToggle:ActivityToggle;
    public static ChatServer:ChatServer;

    public static ReportTool:ReportTool;

    public static DNS:DNSControl;
    public static NativeJSBBridge:NativeJSBBridge;
    public static AppDun:AppDunControl
    public static customApp:CustomAppInfo;
    public static AESUtil:AESUtil;
    public static ArrayUtil:ArrayUtil;
    public static ChannelUtil:ChannelUtil;
    public static JSUtil:JSUtil;
    public static UIUtil:UIUtil;
    public static UrlUtil:UrlUtil;
    public static ModuleManager:ModuleManager;
    public static WebViewControl:WebViewControl;
    public static AppUpdateHelper:AppUpdateHelper;
    public static SearchPathHelper: SearchPathHelper;
    public static DunHotUpdateUrlSetting : DunHotUpdateUrlSetting

    public static setup()
    {
        //全局事件管理器
        this.Event = new EventDispatcher();
        //三方库的使用 + 常用工具函数
        this.Toolkit = new Toolkit();
        this.AESUtil = new AESUtil();
        this.ArrayUtil = new ArrayUtil();
        this.ChannelUtil = new ChannelUtil();
        this.JSUtil = new JSUtil();
        this.UIUtil = new UIUtil();
        this.UrlUtil = new UrlUtil();
        this.ModuleManager = new ModuleManager();
        this.WebViewControl = new WebViewControl()
        this.AppUpdateHelper = new AppUpdateHelper();
        this.SearchPathHelper = new SearchPathHelper();

        
        this.UIHelper = new UIHelper();

        Logger.logLevel = LogLevel.All;
        Logger.logEnable = false;

        //fsm管理器
        this.FsmManager = new FsmManager();
        //http请求  主要负责common协议请求  和 get请求  业务逻辑走netmanager
        this.Http = new HttpProxy();
        //大厅协议通信


        //各类游戏配置  +  本地存储
        this.Setting = new Setting();
        this.Setting.setup();
        //资源管理器  资源加载  释放   依赖管理
        this.ResourceManager = new ResourceManager();

        //数据模块管理器
        this.ModelManager = ModelManager.Instance;
        this.ModelManager.init();
        //配置管理器
        this.ConfigManager = ConfigManager.Instance;
        this.SectionManager = SectionManager.Instance;
        
        this.Audio = new AudioManager();
        this.Audio.setup(this.Setting.settingData, this.ResourceManager);

        this.UI = new UIManager();
        this.UI.setup(this.ResourceManager);

        this.Persist = new PersistHelper();

        this.PlayerData = new PlayerData();
        this.GameData = new GameData();
        this.GongGaoData = new GongGaoData();
        this.ActivityToggle = new ActivityToggle();

        this.DunHotUpdateUrlSetting = new DunHotUpdateUrlSetting()

        this.SceneManager = new SceneManager();
        this.SceneManager.setup();

        this.Component = new ComponentProvider("GlobalDriver");
        this.Component.setup(this.onUpdate.bind(this), this.onLateUpdate.bind(this));
        
        this.NativeEvent = new NativeEvent();
        this.HotUpdateManager = new HotUpdateManager();

        this.HallServer = new HallServer();
        this.HallServer.setup();

        this.Language = new Language();
        this.ChatServer = new ChatServer();

        this.ReportTool = new ReportTool();
        this.ReportTool.init();

        this.DNS = new DNSControl();
        this.NativeJSBBridge = new NativeJSBBridge();
        this.AppDun = new AppDunControl();

        this.customApp = new CustomAppInfo();
        this.customApp.initConfig()

        if(cc.sys.isBrowser){   //浏览器状态下注册webNative类
            this.WebNative = new WebNative();
            this.WebNative.setup();
            this.GameWebView = new GameWebView();
            this.GameWebView.init();
        }
        
    }


    public static onUpdate(dt)
    {
        this.HallServer.onUpdate(dt)
        this.FsmManager.onUpdate();
        this.UI.onUpdate(dt);
        this.Http.onUpdate(dt);
        this.ReportTool.onUpdate(dt);
    }

    public static onLateUpdate()
    {
    }
}