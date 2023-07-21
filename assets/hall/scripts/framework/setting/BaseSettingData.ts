import Storage from "./Storage";

//游戏设置（设置面板使用数据）
export default class BaseSettingData 
{
    static MusicEnableKey = "MusicEnable";
    static SoundEnableKey = "SoundEnable";
    static MusicVolumeKey = "MusicVolume";
    static SoundVolumeKey = "SoundVolume";

    //是否打开背景音乐
    public musicEnable = true;
    //背景音乐音量
    public musicVolume = 1.0;
    //是否打开音效
    public soundEnable = true;
    //音效音量
    public soundVolume = 1.0;

    private storage:Storage;


    public setup(storage)
    {
        this.storage = storage;
        this.load();
    }


    protected load()
    {
        if(this.storage.hasKey(BaseSettingData.MusicEnableKey))
            this.musicEnable = this.storage.getBool(BaseSettingData.MusicEnableKey);

        if(this.storage.hasKey(BaseSettingData.SoundEnableKey))
            this.soundEnable = this.storage.getBool(BaseSettingData.SoundEnableKey);

        if(this.storage.hasKey(BaseSettingData.MusicVolumeKey))
            this.musicVolume = this.storage.getNumber(BaseSettingData.MusicVolumeKey, 1)
        
        if(this.storage.hasKey(BaseSettingData.SoundVolumeKey))
            this.soundVolume = this.storage.getNumber(BaseSettingData.SoundVolumeKey, 1)
    }

    public setMusicEnable(value:boolean)
    {
        if(value == this.musicEnable)
            return;
        this.musicEnable = value;
        this.storage.setBool(BaseSettingData.MusicEnableKey, value);
    }

    public setSoundEnable(value:boolean)
    {
        if(value == this.soundEnable)
            return;
        this.soundEnable = value;
        this.storage.setBool(BaseSettingData.SoundEnableKey, value);
    }

    public setMusicVolume(value:number)
    {
        if(value == this.musicVolume)
            return;
        this.musicVolume = value;
        this.storage.set(BaseSettingData.MusicVolumeKey, value.toString());
    }

    public setSoundVolume(value:number)
    {
        if(value == this.soundVolume)
            return;
        this.soundVolume = value;
        this.storage.set(BaseSettingData.SoundVolumeKey, value.toString());
    }

}