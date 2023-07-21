"use strict";
cc._RF.push(module, 'e23daR7kCFPZaNcWdbxccLT', 'HallStorageKey');
// hall/scripts/logic/hallcommon/const/HallStorageKey.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HallStorageKey = /** @class */ (function () {
    function HallStorageKey() {
    }
    //账号信息相关
    //手机号码
    HallStorageKey.Phone = "Phone";
    //密码（md5）
    HallStorageKey.Pwd = "Pwd";
    //地区码
    HallStorageKey.AreaCode = "AreaCode";
    //Token
    HallStorageKey.Token = "Token";
    //uid
    HallStorageKey.Uid = "Uid";
    HallStorageKey.Channel = "Channel";
    HallStorageKey.InviteCode = "InviteCode";
    HallStorageKey.WebDeviceId = "WebDeviceId";
    //server配置内容
    HallStorageKey.AppConfigContent = "AppConfigContent";
    //缓存上次appid
    HallStorageKey.AppID = "AppID";
    HallStorageKey.BaiduIntervelTimes = "BaiduIntervelTime";
    HallStorageKey.Sale = "Sale";
    HallStorageKey.ServerDeviceId = "ServerDeviceId";
    HallStorageKey.ReportUrl = "ReportUrl";
    //Vip Level
    HallStorageKey.VIPLevel = "VIPLevel";
    //盾配置
    HallStorageKey.DunConfig = "DunConfig";
    //初始化记录
    HallStorageKey.DunInitRecord = "DunInitRecord";
    //登录返回的login线路
    HallStorageKey.LoginRoutes = "LoginRoutes";
    //请求成功，失败状况
    HallStorageKey.RequestRecord = "RequestSuccessRecord";
    //上报OpenInstall统计
    HallStorageKey.PostOpenInstallFlag = "PostOpenInstallFlag";
    //上报Sharetrace统计
    HallStorageKey.PostSharetraceFlag = "PostSharetraceFlag";
    //上报logCache缓存
    HallStorageKey.PostLogCache = "PostLogCache";
    //first
    HallStorageKey.FirstOpen = "FirstOpen";
    //热更线路地址
    HallStorageKey.HotUpdateHosts = "HotUpdateHosts";
    //app热更线路地址
    HallStorageKey.AppHotUpdateHosts = "AppHotUpdateHosts";
    //DATAURLS
    HallStorageKey.DATAURLS = "DATAURLS";
    return HallStorageKey;
}());
exports.default = HallStorageKey;

cc._RF.pop();