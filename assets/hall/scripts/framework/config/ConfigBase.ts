/**
 * 配置对应的类
 */
export default class ConfigBase
{
    //别名,如果没有特别指定,这个值和fullName的值相同
    public alias:string;
    //全路径
    public fullName:string;
    //内容
    public content:any = {};

    /**
     * 根据key获得对应的值
     * @param key 字段的key
     * @param defaultValue 当没有找到对应值时返回的默认值
     * @param type 返回值的类型,目前只支持：string, number,其他类型无效
     */
    public getValue(key:any, defaultValue?:any, type?:string)
    {
        let value = this.content[key.toString()];
        if(value == null) {
            if(defaultValue != null) {
                return defaultValue;
            }
            return null;
        }

        let valueType = typeof value;
        if(type == null || valueType === type) {
            return value;
        }
        else if(type == "string") {
            return value.toString();
        }
        else if(type == "number") {
            return new Number(value).valueOf();
        }
        else {
            return value;
        }
    }

    /**
     * 获取配置的所有内容
     */
    public getContent() {
        return this.content;
    }

}