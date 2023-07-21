import AppHelper from "../../core/tool/AppHelper";
import HallStorageKey from "../const/HallStorageKey";

export default class CustomAppInfo
{
    public appConfig = 
    {
        //字段不设置，使用默认值；字段为空string，表示不显示
        //{bgmName:"bgm",loadingBg:"loadingBg", loginBg:"loginBg", logo:"logo", spreedBg:"spreedBg",showLoadingEff:false}
        588:{loginBg:"lgBg.jpg",showLoadingEff:true, "logo":"logo.png"},
        1003:{loadingBg:"loadingBg.png",spreedBg:"spreedBg.png", loginBg:"lgBg.jpg",showLoadingEff:true, "logo":"logo.png"},
    }

    public bgmName = "bgm.mp3";

    //热更界面背景图
    public loadingBg = "loadingBg.jpg";

    //登录/hallLoading背景图
    public loginBg = "loadingBg.jpg";

    //大厅背景图
    public hallBg = "hallBg.jpg";
    //马甲包背景图
    public majiabao_loadingBg = "loadingBgBack.jpg";

    //showloginBg 为true时  使用lgBg,
    public defaultLgBg = "lgBg.jpg";
    public defaultLogo = "logo.png";

    public appCfg = ""
    //logo图标
   // public logo = "";

    //推广背景图
    public spreedBg = "spreedBg.jpg";

    //loading界面是否显示特效
    public showLoadingEff = false;

    //是否显示登录特效 平台定制
    public showLoginEff = false;
    //登录特效名字
    public lgEffectName = "lgEffect";
    //登录特效动画
    public lgEffectAnimName = "idle";

    private filePathMap = {}

    private appId = null;

    private isHallChanged = false

    /**
     * 加载界面需要替换的图
     * tipsBg 温馨提示底图
     * progressBar 进度条
     * progressBarBg 进度条地图
     */
    private loading = {
        "tipsBg" : "tsy_di.png",
        "progressBar" : "jdt_jdu.png",
        "progressBarBg" : "jdt_di.png",
        "checkNode":"tsy_zibj.png",
        "restore":"xin_xiufu.png",
        "loading_04":"jz_05.png",
    }

    /**
     *  登录需要替换的切图
     * registBtn 注册按钮
     * officalBtn 官网按钮
     * serviceBtn 客服按钮
     * vistorLoginBtn 游客登陆按钮
     * wxLoginBtn 微信登录按钮
     * phoneLoginBtn 手机登录按钮
     */
    private login = {
        "registBtn" : "button_sjzc.png",
        "officalBtn": "button_guanwang.png",
        "serviceBtn": "button_kefu.png",
        "vistorLoginBtn" :"button_youke.png",
        "wxLoginBtn" :"button_weixin.png",
        "phoneLoginBtn" :"button_shouji.png"
    }

    public getIsHallChanged()
    {
        return this.isHallChanged
    }

    public initConfig()
    {
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
            && this.getFilePath(this.lgEffectName + ".png", this.getAppID()) != ""
        if(this.showLoginEff )
        {
            this.loginBg = this.defaultLgBg;
        }
    }


    //预加载背景图
    public preload(callback)
    {
        if(!cc.sys.isNative)
        {
            callback();
            return;
        }
        this.InitOrignalAppconfig()
        let appid = this.getAppID();
        let appCfg = this.getAppConfigFileName(appid)

        let arr = [];
        if(this.loadingBg && this.loadingBg != "")
            arr.push(this.loadingBg)

        if(appCfg &&appCfg != "")
            arr.push(appCfg)
        if(this.defaultLgBg && this.defaultLgBg != "")
            arr.push(this.defaultLgBg);
        if(this.hallBg && this.hallBg != "")
            arr.push(this.hallBg);
        // if(this.logo && this.logo != "")
        //     arr.push(this.logo);
        if(this.bgmName && this.bgmName != "")
            arr.push(this.bgmName);
        if(this.showLoginEff && this.lgEffectName && this.lgEffectName != "")
        {
            arr.push([this.lgEffectName + ".json", "txt"]);
            arr.push(this.lgEffectName + ".png");
            arr.push([this.lgEffectName + ".atlas", "txt"]);
        }

        for (let key in this.login) {
            if (this.login.hasOwnProperty(key)) {
                arr.push(this.login[key])
            }
        }

        for (let key in this.loading) {
            if (this.loading.hasOwnProperty(key)) {
                arr.push(this.loading[key])
            }
        }

        let counter = 0
        for (let i = 0; i < arr.length; i++) {
            let path = "";
            let type = null;
            if (Array.isArray(arr[i])) {
                path = this.getFilePath(arr[i][0], appid);
                type = arr[i][1];
            }
            else
                path = this.getFilePath(arr[i], appid);
            if (path != "") {
                counter++;
                if (arr[i] == appCfg) {
                    cc.loader.load(path, (error, jsonAsset) => {

                        counter--;
                        if (error != null) {
                            Logger.error("加载skinConfig失败！！！！！"+ error.message);
                            Logger.error("path！！！！！"+ path);
                        }
                        if(jsonAsset)
                        {
                            Global.Setting.SkinConfig.appPicConfig = jsonAsset
                        }
                        if (counter <= 0) {
                            if (callback) 
                            {
                                callback();
                            }
                        }
                    })
                    continue
                }
                cc.loader.load({ url: path, type: type }, (error, res) => {
                    if (error != null) {
                        Logger.error("加载资源失败", path);
                    }

                    counter--;
                    if (counter <= 0) {
                        if (callback) {
                            callback();
                        }
                    }
                })
            }
        }
        if(counter == 0)
        {
            if(callback)
            {
                callback();
            }
        }
    }

    public getAppConfigFileName(appid)
    {
        let oldFileName = cc.js.formatStr("%s.json", appid)
        let newFileName = "config.json"
        let oldFilePath = this.getFilePath(oldFileName,appid)

        let newFilePath = this.getFilePath(newFileName,appid)
        if(jsb.fileUtils.isFileExist(oldFilePath))
        {
            return oldFileName

        }

        if(jsb.fileUtils.isFileExist(newFilePath))
        {
            return newFileName

        }

        return newFileName
    }



    public checkIsHotUpdateFileExist(appid)
    {
        //先判断热更目录下是否有文件
        let hotupdatePath = Global.HotUpdateManager.updateHelper.genStoragePath("hall") + "/app/" + appid;
        return jsb.fileUtils.isDirectoryExist(hotupdatePath)
    }

    /**
     * 获取当前appid合服后此ID与随包APPID不一致
     */
    public getCustomAppID()
    {
        let appId = 0;
        let localAppid= Global.Setting.storage.getNumber(HallStorageKey.AppID, -1);
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
        
    }
    InitOrignalAppconfig() 
    {
        let appid = Global.Setting.SystemInfo.appID
        let appCfg = this.getAppConfigFileName(appid)
        let path = this.getFilePath(appCfg, appid);
        if (path != "") {
            cc.loader.load(path, (error, jsonAsset) => {
                if (error != null) {
                    Logger.error("加载skinConfig失败！！！！！" + error.message);
                    Logger.error("path！！！！！" + path);
                }
                if (jsonAsset) {

                    Global.Setting.SkinConfig.orignalAppcfg = jsonAsset
                    let storgeHall = Global.Setting.storage.get("HALLSTYLE")
                    if (!storgeHall ) 
                    {
                        Global.Setting.storage.set("HALLSTYLE",jsonAsset["hallStyle"])
                    }
                }
            })
        }
       
    }



    public async AsyncInitOrignalAppconfig() {
        return new Promise((resolve, reject)=>{
            let appid = Global.Setting.SystemInfo.appID
            let appCfg = this.getAppConfigFileName(appid)
            let path = this.getFilePath(appCfg, appid);
            if (path != "") {
                cc.loader.load(path, (error, jsonAsset) => {
                    if (error) {
                        Logger.error("加载skinConfig失败！！！！！" + error.message);
                        Logger.error("path！！！！！" + path);
                        reject(error);
                    }
                    else
                    {
                        Global.Setting.SkinConfig.orignalAppcfg = jsonAsset
                        let storgeHall = Global.Setting.storage.get("HALLSTYLE")
                        if (storgeHall && storgeHall != jsonAsset["hallStyle"] ) 
                        {
                            Global.Setting.storage.set("HALLSTYLE",jsonAsset["hallStyle"])
                            this.isHallChanged = true
                        }
                        resolve(jsonAsset);
                    }
                })
            }
            else
            {
                reject(null);
            }
        })
    }

    /**
     * 获取实际需要预加载资源的appid
     */
    public getAppID(){
        let appid = Global.customApp.getCustomAppID()
        if(Global.Toolkit.checkMegeServer() && !Global.customApp.checkIsHotUpdateFileExist(appid))
        {
            appid = Global.Setting.SystemInfo.appID
        }
        return appid;
    }

    public getAppConfig(){
        // let appid = this.getAppID()
        // let config = null
        // if(!Global.Setting.isNewAppHotUpdate)
        // {
        //     config = Global.Setting.SkinConfig.appPicConfig ? Global.Setting.SkinConfig.appPicConfig[appid]: null
        //     return config
        // }
        return Global.Setting.SkinConfig.appPicConfig 
    }


    private getAppBaseFolder()  
    {
        return Global.HotUpdateManager.updateHelper.genStoragePath("hall") + "/app/";
    }

    // public getBgmPath()
    // {
    //     if(!cc.sys.isNative)
    //         return "";
    //     return this.getFilePath(this.bgmName, this.getAppID());
    // }

    //appid为data中的
    //nativeAppid为包里的appid   避免更换appid时出问题
    private getFilePath(fileName, appid, nativeAppid = null)
    {
        if(!cc.sys.isNative)
            return "";
        if(nativeAppid == null)
            nativeAppid = appid;
        if(this.filePathMap[fileName])
        {
            return this.filePathMap[fileName];
        }
        //先判断热更目录下是否有文件
        let hotupdatePath = Global.HotUpdateManager.updateHelper.genStoragePath("hall") + "/app/" + appid + "/";
        let hotupdateFullPath = hotupdatePath + fileName;
        if(jsb.fileUtils.isFileExist(hotupdateFullPath))
        {
            this.filePathMap[fileName] = hotupdateFullPath;
            return hotupdateFullPath;
        }
        
        //关闭合服，直接切AppID的情况，如果下载的资源里面没有则用皮肤自带的
        if (Global.Setting.isCloseMegeServer){
            return ""
        }
        //走随包AppID里面的资源
        let packageAppid = Global.Setting.SystemInfo.appID
        
        //获取原生资源路径文件夹
        let nativeFullPath = "app/" + packageAppid + "/" + fileName;
        
        if(jsb.fileUtils.isFileExist(nativeFullPath))
        {
            nativeFullPath = jsb.fileUtils.fullPathForFilename(nativeFullPath);
            this.filePathMap[fileName] =  nativeFullPath;
            Logger.error("use native path", nativeFullPath);
            return nativeFullPath;
        }
        return "";
    }

    //加载loading界面资源
    public loadLoadingBg(bgSp:cc.Sprite)
    {
        if(!cc.sys.isNative)
            return;
        //获取原生资源路径文件夹
        let nativeFullPath = this.majiabao_loadingBg;
        if(jsb.fileUtils.isFileExist(nativeFullPath))
        {
            this.loadMaJiaBaoLoaingBg(bgSp,nativeFullPath)
        }else {

            this.loadSprite(bgSp, this.loadingBg);
        }
    }

    public loadingLoginPics(btnContainer:cc.Node)
    {
        if(!cc.sys.isNative)
        {
            return
        }
        if(!btnContainer)
        {
            return
        }
        
        let config = this.getAppConfig()
        let needChange = config && !config["showDefaut"] //默认按钮有特效 新配置的没有 如果需要配置需要隐藏特效
        let regist :cc.Sprite = cc.find("RegistBtn",btnContainer).getComponent(cc.Sprite)
        let offical:cc.Sprite = cc.find("gnx_guanwang",btnContainer).getComponent(cc.Sprite)
        let service:cc.Sprite = cc.find("gnx_kefu",btnContainer).getComponent(cc.Sprite)
        let vistor:cc.Sprite = cc.find("guestBtn",btnContainer).getComponent(cc.Sprite)
        
        if( vistor && vistor.node)
        {
            let defaultNode :cc.Node = cc.find("defaut",vistor.node) // 默认按钮有特效
            if(defaultNode && needChange)
            {
                defaultNode.active = false
            }
            this.loadSprite(vistor, this.login.vistorLoginBtn);

        }
        let wechat:cc.Sprite = cc.find("wxBtn",btnContainer).getComponent(cc.Sprite)
        if( wechat && wechat.node)
        {
            let defaultNode :cc.Node = cc.find("defaut",wechat.node)
            if(defaultNode && needChange)
            {
                defaultNode.active = false
            }
            this.loadSprite(wechat, this.login.wxLoginBtn,);

        }
        let phone:cc.Sprite = cc.find("phoneBtn",btnContainer).getComponent(cc.Sprite)

        if( phone && phone.node)
        {
            let defaultNode :cc.Node = cc.find("defaut",phone.node)
            if(defaultNode && needChange)
            {
                defaultNode.active = false
            }
            this.loadSprite(phone, this.login.phoneLoginBtn,);

        }
        this.loadSprite(regist, this.login.registBtn);
        this.loadSprite(offical, this.login.officalBtn);
        this.loadSprite(service, this.login.serviceBtn);
    }
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
    

    public ChangeLoadingTxtColorAndFontSize(txt:cc.Label,infolabel:cc.Label,versionLabel:cc.Label)
    {

        let config = this.getAppConfig()
        if(config )
        {
            if(txt)
            {
                if( config.txtColor)
                {
                    txt.node.color = new cc.Color().fromHEX(config.txtColor);
                }
                if(config.txtFontSize)
                {
                    txt.fontSize = config.txtFontSize
                }
            }
            if(infolabel)
            {
                if( config.infoLabelColor)
                {
                    infolabel.node.color = new cc.Color().fromHEX(config.infoLabelColor);
                }
                if(config.infoLabelFontSize)
                {
                    infolabel.fontSize = config.infoLabelFontSize
                }
            }

            if(versionLabel)
            {
                if( config.versionLabelColor)
                {
                    versionLabel.node.color = new cc.Color().fromHEX(config.versionLabelColor);
                }
                if(config.versionLabelFontSize)
                {
                    versionLabel.fontSize = config.versionLabelFontSize
                }
                
            }
            
        }
    }


    public setOfficalBtnPos(officalBtn:cc.Node,kefuBtn:cc.Node)
    {
        
        let config = this.getAppConfig()

        if(config && officalBtn && config.loadingOfficalBtnPos)
        {
            officalBtn.setPosition((cc.v2(config.loadingOfficalBtnPos[0], config.loadingOfficalBtnPos[1])))
        }
        if(config && kefuBtn && config.loadingkefuBtnPos)
        {
            kefuBtn.setPosition((cc.v2(config.loadingkefuBtnPos[0], config.loadingkefuBtnPos[1])))
        }

    }

    public ChangeLoadingPosCfg(tipsBg:cc.Node,loadingBar:cc.Node,checkNode:cc.Node,restoreNode = null)
    {
        let config = this.getAppConfig()
        if(config)
        {
            if(tipsBg && config.tipsBgPos)
            {
                tipsBg.setPosition((cc.v2(config.tipsBgPos[0], config.tipsBgPos[1])))
            }
            if(loadingBar && config.loadingBarPos)
            {
                loadingBar.setPosition((cc.v2(config.loadingBarPos[0], config.loadingBarPos[1])))
            }
            if(restoreNode && config.restorePos)
            {
                restoreNode.setPosition((cc.v2(config.restorePos[0], config.restorePos[1])))
            }
            if(checkNode && config.checkNodePos)
            {
                let checkSp = checkNode.getComponent(cc.Sprite)
                if(checkSp){
                    this.loadSprite(checkSp, this.loading.checkNode,(height) =>{
                        checkSp.spriteFrame.insetLeft = 150
                        checkSp.spriteFrame.insetRight = 150
                        checkSp.node.height = height
                        checkSp.sizeMode = cc.Sprite.SizeMode.CUSTOM
                        checkSp.type = cc.Sprite.Type.SLICED
                    });
                }
                checkNode.setPosition((cc.v2(config.checkNodePos[0], config.checkNodePos[1])))
            }
        }

    }
   

    //加载提示背景 进度条
    public loadLoadingPics(tipsBg:cc.Sprite,bar:cc.Sprite,bar1:cc.Sprite,checkNode:cc.Sprite,
        loading_04:cc.Sprite,officalBtn:cc.Sprite,restore:cc.Sprite = null,kefuBtn:cc.Sprite = null,maskNode:cc.Sprite = null)
    {
        if(!cc.sys.isNative)
        {
            return
        }
        let config = this.getAppConfig()
        if(this.loading)
        {
            this.loadSprite(tipsBg, this.loading.tipsBg,(height) =>{
                tipsBg.spriteFrame.insetLeft = 200
                tipsBg.spriteFrame.insetRight = 200
                tipsBg.node.height = height
                tipsBg.sizeMode = cc.Sprite.SizeMode.CUSTOM
                tipsBg.type = cc.Sprite.Type.SLICED
            });
            this.loadSprite(bar, this.loading.progressBarBg,(height)=>{
                bar.spriteFrame.insetLeft = 30
                bar.spriteFrame.insetRight = 30
                bar.node.height = height
                bar.sizeMode = cc.Sprite.SizeMode.CUSTOM
                bar.type = cc.Sprite.Type.SLICED
            });
            //全屏适配
            if(config &&config.fullScreen && bar1 && bar && cc.isValid(bar1.node) && cc.isValid(bar.node)){
                bar1.node.width = cc.Canvas.instance.node.width
                bar.node.width = cc.Canvas.instance.node.width
                bar.node.setPosition(cc.v2(-0.5* bar.node.width,bar.node.position.y))
                bar1.node.setPosition(cc.v2(-0.5* bar1.node.width,bar1.node.position.y))
                let progressBar = bar1.node.getComponent(cc.ProgressBar)
                if(progressBar)
                {
                    progressBar.totalLength = cc.Canvas.instance.node.width
                }
            }
            this.loadSprite(bar1, this.loading.progressBar,(height)=>{
                bar1.spriteFrame.insetLeft = 30
                bar1.spriteFrame.insetRight = 30
                bar1.node.height = height
                bar1.sizeMode = cc.Sprite.SizeMode.CUSTOM
                bar1.type = cc.Sprite.Type.SLICED
            });
            if(restore){
                this.loadSprite(restore, this.loading.restore);
            }
            this.loadSprite(checkNode, this.loading.checkNode,(height)=>{
                checkNode.node.height = height
            });
            
            this.loadSprite(loading_04, this.loading.loading_04,(height)=>{
                loading_04.spriteFrame.insetLeft = 3
                loading_04.spriteFrame.insetRight = 3
                loading_04.node.height = height
                loading_04.node.width = cc.Canvas.instance.node.width
                loading_04.sizeMode = cc.Sprite.SizeMode.CUSTOM
                loading_04.type = cc.Sprite.Type.SLICED
            });

            this.loadSprite(officalBtn, this.login.officalBtn);
            if(kefuBtn)
            {
                this.loadSprite(kefuBtn, this.login.serviceBtn);
            }
        }
    }

    //加载Banner界面资源
    public loadBannerBg(bgSp:cc.Sprite,name:string,callback?)
    {
        let path = this.getFilePath(name, this.getAppID());
        if(path){
            this.loadSprite(bgSp, name,callback);
        }
        else
        {
            if(callback)
            {
                callback()
            }
        }
    }
    //登录背景/hallscene背景
    public loadLoginBg(bgSp)
    {
        let config = this.getAppConfig()
        //默认用688配置
        if(config != null)
        {
            if(config.loginBg)
            {
                this.loadSprite(bgSp, config.loginBg)
                return
            }
        }
        this.loadSprite(bgSp, this.loginBg)
    }
    //登录背景/hallscene背景
    public loadHallBg(bgSp)
    {
        this.loadSprite(bgSp, this.hallBg)
    }

    public loadSpreedBg(bgSp)
    {
        this.loadSprite(bgSp, this.spreedBg);
    }

    private loadMaJiaBaoLoaingBg(bgSp,nativeFullPath){
        nativeFullPath = jsb.fileUtils.fullPathForFilename(nativeFullPath);
        this.filePathMap[this.majiabao_loadingBg] =  nativeFullPath;
        let texture = cc.loader.getRes(nativeFullPath);
        if(texture != null)
        {
            if(bgSp && bgSp.node.isValid)
            {   
                bgSp.spriteFrame = new cc.SpriteFrame(texture);
            }
        }
        else
        {
            cc.loader.load(nativeFullPath, (error, texture)=>{
                if(error != null)
                    return;
                if(bgSp && bgSp.node.isValid)
                {   
                    bgSp.spriteFrame = new cc.SpriteFrame(texture);
                }
            })
        }
    }

    public loadLoginEffect(effectNode:cc.Node)
    {
        if(!cc.sys.isNative)
            return;
        if(effectNode == null)
            return;
        if(!this.showLoginEff)
            return;
        let ske = effectNode.getComponent(sp.Skeleton);
        if(ske == null)
            return;
        let atlasPath = this.getFilePath(this.lgEffectName + ".atlas", this.getAppID());
        let pngPath = this.getFilePath(this.lgEffectName + ".png", this.getAppID());
        let skeInfoPath = this.getFilePath(this.lgEffectName + ".json", this.getAppID());
        let atlas = Global.ResourceManager.getRes(atlasPath, "txt");
        let png = cc.loader.getRes(pngPath);
        let skeInfo = Global.ResourceManager.getRes(skeInfoPath, "txt");
        if(atlas == null || png == null || skeInfo == null)
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
    }

    // public loadLogo(loSp)
    // {
    //     this.loadSprite(loSp, this.logo);
    // }

    //获取bgm原生地址
    public getDefaultBgmUrl()
    {
        if(!cc.sys.isNative)
            return ""
        return this.getFilePath(this.bgmName, this.getAppID());
    }

    private loadSprite(bgSp:cc.Sprite, fileName,callback?)
    {
        
        if(!cc.sys.isNative || !bgSp )
            return;
        
       
        let path = this.getFilePath(fileName, this.getAppID());
        if(!path)
        {
            return
        }
        let texture :cc.Texture2D = cc.loader.getRes(path);
        if(texture != null)
        {
            if(bgSp && bgSp.node.isValid)
            {   
                bgSp.spriteFrame = new cc.SpriteFrame(texture);
                if(callback)
                {
                    callback(texture.height)
                }
            }
        }
        else
        {
            cc.loader.load(path, (error, texture:cc.Texture2D)=>{
                if(error != null)
                    return;
                if (bgSp && bgSp.node.isValid) {
                    bgSp.spriteFrame = new cc.SpriteFrame(texture);
                    if (callback) {
                        callback(texture.height)
                    }
                }
            })
        }
    }


    public loadHallBundle(onComplete?: (err: Error, bundle: cc.AssetManager.Bundle) => void){
        let hallstyle = this.getHallBundleName()
        Global.ResourceManager.loadBundle(hallstyle,(err,bundle:cc.AssetManager.Bundle)=>{
            if (err){
                Logger.error("load failed hallstyle " + hallstyle)
                return;
            }
            if (onComplete){
                onComplete(err,bundle)
            }

        })
    }

    public getHallBundleName(){
        let config = Global.Setting.SkinConfig.orignalAppcfg
        let hallstyle = "hall_style_0"
        if (config && config.hallStyle){
            hallstyle = config.hallStyle
        }
        return hallstyle
    }

    public getHallBundlePath(){
        let bundleName = this.getHallBundleName()
        let bundlePath = bundleName
        if (cc.sys.isNative){
            let bundleDir = Global.HotUpdateManager.updateHelper.genStoragePath("hall") + "/" + bundleName
            if (jsb && jsb.fileUtils.isDirectoryExist(bundleDir)) {
                bundlePath = jsb.fileUtils.fullPathForFilename(bundleDir)
            }else if(jsb && jsb.fileUtils.isDirectoryExist(bundleName)){
                bundlePath = jsb.fileUtils.fullPathForFilename(bundleName)
            }
        }
        Logger.error("getHallBundlePath bundlePath = " + bundlePath)
        return bundlePath
    }


    public getHallBundleRes(path,type?: typeof cc.Asset){
        let bundleName = this.getHallBundleName()
        if (bundleName){
            let res:any = Global.ResourceManager.getBundleRes(bundleName,path,type)
            if (res){
                return res
            }else {
                Logger.error("getHallBundleRes getBundleRes null")
            }
            
        }else {
            Logger.error("getHallBundleRes bundleName null")
        }
    }

}

export  enum BTNINDEX
{
    RegistBtn = 0 ,
    OfficalBtn = 1 ,
    ServiceBtn = 2,
    VistorLoginBtn = 3,
    WeChatLoginBtn = 4,
    PhoneLoginBtn = 5


}

