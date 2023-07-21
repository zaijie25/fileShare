import Storage from "./Storage";
import BaseSettingData from "./BaseSettingData";

//开关  + 本地存储 + app配置
export default class BaseSetting
{
    public storage:Storage = new Storage;
    public settingData:BaseSettingData;

    public setup()
    {
        this.settingData = new BaseSettingData();
        this.settingData.setup(this.storage);
    }
}