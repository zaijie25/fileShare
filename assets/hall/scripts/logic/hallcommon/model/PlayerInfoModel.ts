import ModelBase from "../../../framework/model/ModelBase";
import { NetAppface } from "../../core/net/hall/NetEvent";

export default class PlayerInfoModel extends ModelBase {
    /**
     * 全局对象
     */
    static instance: PlayerInfoModel = null;

    public vipSubsidy = {}
    public vipSubsidyStatus = 0
    public vipSubsidyCount = 0

    /**
     *  vip是否发送奖励
     */
    public vip_reward = 0;
    /**
     * vip信息
     */
    public vip_cfg = [];
    /**
     * 是否有vip奖励可以领取
     */
    public is_vip_reward = 0;

    public is_week_reward = 0
    public is_month_reward = 0
    public musicData: Map<string, BgmEntity> = null

    public static UpdateScrollView = "UpdateScrollView"

    /**
     * 电台歌曲名称和下载地址
     * url：下载地址 surl：存储地址
     */
    diantaiMusicArr = [
        { name: "默认背景音乐", singer: "", file: "", url: "", surl: "", download: true },
    ];
    

    /**
     * 当前正在播放的音乐数据对象
     */
    static playingObj = null;


    onClear()
    {
        this.is_vip_reward = 0
        this.is_week_reward = 0
        this.is_month_reward = 0
    }
    /**
     * 初始化背景音乐
     */
    InitBgm() {
        // this.initRequestInfo();
        if (this.diantaiMusicArr[0].url == "") {
            this.diantaiMusicArr[0].url = Global.Setting.hallBGM;
            this.diantaiMusicArr[0].surl = Global.Setting.hallBGM;
            this.diantaiMusicArr[0].file = Global.Setting.hallBGM;

        }

        var bMusic = false;//是否找到了背景音乐
        var bgm = Global.Setting.storage.get("bgm");
        if (!bgm) {
            this.requestBgmList()
            this.playBgm(bMusic, this.getLocalFileName(Global.Setting.hallBGM))
            return
        }

        if (!this.musicData) {
            this.requestBgmList((data: Map<string, BgmEntity>) => {
                let arrName = data.keys();
                for (let i = 0; i < data.size; i++) {
                    let key = arrName.next().value as string;
                    let entity = data.get(key);
                    let surl = this.getLocalFileName(entity.file)
                    if (surl == bgm) {
                        bMusic = true
                        this.playBgm(bMusic, bgm)
                        return
                    }

                }
                if (0 == data.size) {
                    this.playBgm(bMusic, this.getLocalFileName(Global.Setting.hallBGM))
                    return
                }
                if (!bMusic) {
                    this.playBgm(bMusic, this.getLocalFileName(Global.Setting.hallBGM))
                }
            })
            return
        }

        let arrName = this.musicData.keys();
        for (let i = 0; i < this.musicData.size; i++) {
            let key = arrName.next().value as string;
            let entity = this.musicData.get(key);
            let surl = this.getLocalFileName(entity.file)
            if (surl == bgm) {
                bMusic = true
                this.playBgm(bMusic, bgm)
                return
            }

        }
        if (0 == this.musicData.size) {
            this.playBgm(bMusic, this.getLocalFileName(Global.Setting.hallBGM))
            return
        }
        if (!bMusic) {
            this.playBgm(bMusic, this.getLocalFileName(Global.Setting.hallBGM))
        }


    }




    public playBgm(exist: boolean, bgm) {
        if (!exist) {
            Global.Setting.storage.set("bgm", bgm)
            Global.Audio.playHallBGM();
            return
        }
        Global.Audio.playMusic(bgm);

    }

    public requestBgmList(callback = null) {
        let self = this
        Global.HallServer.send(NetAppface.mod, "GetBgmList", {},
            function (data: any) {

                //成功
                let bgmMap = new Map<string, BgmEntity>();
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        let music = data[i];
                        let entity = new BgmEntity();
                        entity.name = music.name;
                        entity.file = music.file;
                        entity.singer = music.singer;
                        bgmMap.set(entity.name, entity);
                        if (!Global.Setting.resServerUrl) {
                            let urlArray = music.file.split("//");
                            if (urlArray.length > 0) {
                                let scheme = urlArray[0]
                                let hostUrl = urlArray[1]
                                let hostArray = hostUrl.split("/")
                                let host = hostArray[0]
                                Global.Setting.resServerUrl = scheme + "//" + host
                                Logger.error("Global.Setting.resServerUrl = " + Global.Setting.resServerUrl)
                            }

                        }
                    }
                    self.musicData = bgmMap
                }
                if (callback) {

                    callback(bgmMap);
                }

            }.bind(this),

            function (data: any) {
                //失败
                Logger.error("PlayerInfoModel requestBgmList failed");
            }.bind(this),
            false,
            30
        );
    }
    /**
    * url转MD5，并拼接后缀
    * @param url 
    */
    public getLocalFileName(url: string): string {
        let name = url;
        let end = name.lastIndexOf('.');
        let namePre = name.slice(0, end);
        let fileSuffix = name.substring(end);
        return jsb.fileUtils.getWritablePath() + Global.Toolkit.md5(namePre) + fileSuffix;
    }
    /**
     * 升级到每个vip等级需要的总经验值，从升到 1 级vip开始
     */
    vipExpArr = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500];

    /**
     * 初始化
     */
    onInit() {
        PlayerInfoModel.instance = this;
    }
    /**
     * 销毁
     */
    onDestroy() {
        PlayerInfoModel.instance = null;
    }

    get Name() {
        return "PlayerInfoModel";
    }

    /**
     * 初始化相关配置数据
     * @param cfg 
     */
    InitData(cfg) {
        if (!cfg) {
            return;
        }
        this.vip_cfg = cfg;
        for (var i = 0; i < cfg.length; i++) {
            var obj = cfg[i];
            this.vipExpArr[obj.vip - 1] = obj.vip_coin;
        }
    }
    /**
     * 初始化补助金相关配置
     * @param cfg 
     */
    // "subsidy_point":{
    //     "user_vip":{
    //         "0":{"point":10000,"times":1},   // vip0 补助金金额 1元 次数 1次
    //         "1":{"point":20000,"times":2},   // vip1 补助金金额 2元 次数 2次
    //     },
    //     "status":1,                                              // 状态  1 开启补助金
    //     "self_times":1                                         // 用户当日剩余次数
    // }
    InitSubsidy(cfg) {
        if (!cfg) {
            return;
        }
        this.vipSubsidy = cfg.user_vip;
        this.vipSubsidyStatus = cfg.status;
        this.vipSubsidyCount = cfg.self_times;
    }

    /**
     * 请求玩家信息
     */
    reqGetUserInfo(callback, errorback) {
        let param: any = {}
        Global.HallServer.send(NetAppface.mod, NetAppface.GetUserInfo, param, callback, errorback);
    }

    /**
     * 请求修改昵称/头像
     * @param param 
     * @param callback 
     */
    reqEditUserInfo(param, callback) {
        Global.HallServer.send(NetAppface.mod, NetAppface.EditUserInfo, param, callback, null, false);
    }

    /**
     * 请求修改头像框
     * @param param 
     * @param callback 
     */
    reqSetSelfCfg(param, callback) {
        Global.HallServer.send(NetAppface.mod, NetAppface.SetSelfCfg, param, callback, null, false);
    }

    /**
     * 得vip升级需要的 
     * @param toVip 
     */
    GetVipUpgradeExp(toVip) {
        var exp = 0;
        var index = toVip - 1;
        if (index >= 0 && index < this.vipExpArr.length) {
            exp = this.vipExpArr[index];
        }
        return exp;
    }
}

//bgm实体类
export class BgmEntity {
    private _name: string = "";
    private _file: string = "";//音乐路径
    private _singer: string = "";
    // private flag: number = 0;
    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get file(): string {
        return this._file;
    }

    public set file(file: string) {
        this._file = file;
    }

    public get singer(): string {
        return this._singer;
    }

    public set singer(singer: string) {
        this._singer = singer;
    }


}