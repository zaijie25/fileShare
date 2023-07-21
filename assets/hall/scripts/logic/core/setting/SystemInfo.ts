import HallStorageKey from "../../hallcommon/const/HallStorageKey";

//存储系统相关信息
export default class SystemInfo {
    private _version = "0.0.1";//版本号
    private _deviceId: string;
    private _isIphoneX: boolean = false;
    private _netWorkType: number = -1; // -1 none 1 wifi 2: 2G 3:3G 4:4G
    private _isNetworkAvailable: boolean = true;
    private _firstInstallStatus: boolean = false;
    private _widthScale: number;
    private _heigthScale: number;
    private _fixHeightScale: number;// 适配高度后的宽度缩放值
    private _ipAddress: string;
    private _isSupportWSS: boolean = false;//是否支持WSS协议
    private _appVersion: string = "0";//appNative游戏版本号，供强更使用
    private _pkgVersion: string;//app包版本
    private _gameUrlJsonCfg: string;//App gameUrl json 配置
    // private _vendorChannel: string;//联运渠道id
    private _nativeLog: boolean = false;//本地打印是否开启
    private _bundleName: string;//原生包名
    private _loginSign: string;//sign
    private _webglData: string;//sign

    public wxKey:string;
    public jpushKey:string;
    public appSign:string; //APP签名信息

    /**
     * 大厅主皮肤
     */
    public hallSkin:string;
    /**
     * 子游戏皮肤
     */
    public gameSkin:string;

    /**
     * 包标志 空表示官方包 
     */
    public packageTag:string

    public nativeScreenWidth = "0";
    public nativeScreenHeight = "0";
    public nativeScreenDensity = "0";
    public nativeScreenDensityDpi = "0";
    public clipboardText;
    public ChannelInfo;
    public hostIp;
    public osBuildModel;
    public osBuildVersionSDK;
    public osBuildVersionRelease;
    public inviteSourceType = 0;
    public deviceBrand = "";
    private onBackground = false;

    public udid = "0"

    /**
     * 入口类型 1 为mdm下载 ，字段为空或值非1则为非mdm下载
     */
    public entry = ""

    /**
     * 签名类型 1 内部企业签 2 内部超级签 3 外部超级签 字段为空或0则为（外部企业签/不支持传参的外部超级签）
     */
    public sign_type = ""

    public nativePlatform: string;

    //app端渠道
    public packChannel: string = null;

    private _appConstUrl: string = "";

    public appConstBackupUrl: string = "";
    public appConstBackupUrl1: string = "";
    public appConstUrlArray = []; // app data 域名数组
    public appID:string = "" // app ID
    public subPlatformID:string = "";//总代id
    public appName:string = "";//app 名称
    public zipModel:boolean = false;//是否zip方式
    public simulator:string = "";//模拟器 0-真机 1-模拟器 空字符串：没检测出来

    public orientationLandscape = true; //横屏
    public server_id =""//服务器下发的server_id

    public cerDirFiles = []

    constructor() {

    }

    set Version(ver) {
        this._version = ver
        // Logger.log("--------------setSystemModel version = " + this._version)
    }

    get Version() {
        // Logger.log("--------------getSystemModel version ===" + this._version)
        return this._version;
    }

    public init() {
    }

    public getDeviceInfo() {
        Global.NativeEvent.getNativeParams();
    }

    public onResume() {
        this.onBackground = false;
    }




    public set deviceId(v: string) {
        if (v == null || v == "")
            return;
        this._deviceId = v;
    }

    public get deviceId(): string {
        if (this._deviceId == null) {
            let deviceid = Global.Setting.storage.get(HallStorageKey.WebDeviceId);
            if (deviceid == null || deviceid == "") {
                deviceid = Global.Toolkit.genDeviceId();
                Global.Setting.storage.set(HallStorageKey.WebDeviceId, deviceid);
            }
            this._deviceId = deviceid;
        }
        return this._deviceId.trim();
    }
    public set ipAddress(v: string) {
        this._ipAddress = v;
    }

    public get ipAddress(): string {
        return this._ipAddress
    }

    public set version(v: string) {
        this._version = v;
    }

    public get version(): string {
        return this._version
    }


    public get isIphoneX(): boolean {
        return this._isIphoneX;
    }

    //微信iPhoneX适配
    public get isWXIphoneX(): boolean {
        // if (cc.sys.isNative) {
        //     return false;
        // } else {
        //     let isX = /iphone/gi.test(navigator.userAgent) && ((Laya.Browser.clientHeight == 724) && Laya.Browser.clientWidth == 375)
        //     if (isX) {
        //         return true;
        //     } else {
        //         return false;
        //     }

        // }
        return false;
    }


    public set isIphoneX(v: boolean) {
        this._isIphoneX = v;
    }


    public set netWorkType(v: number) {
        this._netWorkType = v;
    }


    public get netWorkType(): number {
        return this._netWorkType;
    }


    public set isNetworkAvailable(v: boolean) {
        this._isNetworkAvailable = v;
    }


    public get isNetworkAvailable(): boolean {
        return this._isNetworkAvailable;
    }


    public set firstInstallStatus(v: boolean) {
        this._firstInstallStatus = v;
    }

    public get firstInstallStatus(): boolean {
        return this._firstInstallStatus;
    }


    public get fixHeightScale(): number {
        // return laya.utils.Browser.clientWidth / laya.utils.Browser.clientHeight
        return 0;
    }

    public get widthScale(): number {
        // return laya.utils.Browser.clientWidth / laya.utils.Browser.clientHeight * Laya.stage.designHeight / Laya.stage.designWidth;
        return 0;
    }

    public get isSupportWSS(): boolean {
        if (cc.sys.isNative) {
            return this._isSupportWSS;
        } else {
            return true;
        }
        // return false;
    }

    public set isSupportWSS(flag: boolean) {
        this._isSupportWSS = flag;
    }

    public get appVersion(): string {
        if (cc.sys.isNative) {
            return this._appVersion;
        } else {
            return "40000";
        }

    }

    public set appVersion(flag: string) {
        this._appVersion = flag;
    }

    public checkVersion(supportVersion) {
        if (!cc.sys.isNative)
            return true
        let version = this.appVersion;
        let numVer = Number(version)

        if (isNaN(numVer) || numVer >= supportVersion)
            return true;
        return false;
    }

    public get pkgVersion(): string {
        if (cc.sys.isNative) {
            return this._pkgVersion;
        } else {
            return "";
        }

    }

    public set pkgVersion(flag: string) {
        this._pkgVersion = flag;
    }

    public set gameUrlJsonCfg(cfg: string) {
        this._gameUrlJsonCfg = cfg;
    }

    public get gameUrlJsonCfg(): string {
        return this._gameUrlJsonCfg
    }

    // public get vendorChannel(): string {
    //     if (cc.sys.isNative) {
    //         return this._vendorChannel;
    //     } else {
    //         return "";
    //     }

    // }

    // public set vendorChannel(flag: string) {
    //     this._vendorChannel = flag;
    // }

    public get nativeLog(): boolean {
        if (cc.sys.isNative) {
            return this._nativeLog;
        } else {
            return false;
        }
    }

    public set nativeLog(flag: boolean) {
        this._nativeLog = flag;
    }

    public get bundleName(): string {
        if (cc.sys.isNative) {
            return this._bundleName;
        } else {
            return "";
        }
    }

    public set bundleName(flag: string) {
        this._bundleName = flag;
    }

    public get webglData(): string {
        if (cc.sys.isNative) {
            return this._webglData;
        } else {
            return "";
        }
    }

    public set webglData(flag: string) {
        this._webglData = flag;
    }
    public get loginSign(): string {
        // if (cc.sys.isNative) {
        //     return this._loginSign;
        // } else {
        //     return "";
        // }
        return this._loginSign;
    }

    public set loginSign(flag: string) {
        this._loginSign = flag;
    }

    public set appConstUrl(url: string) {
        this._appConstUrl = url;
    }

    public get appConstUrl() {
        return this._appConstUrl;
    }




}