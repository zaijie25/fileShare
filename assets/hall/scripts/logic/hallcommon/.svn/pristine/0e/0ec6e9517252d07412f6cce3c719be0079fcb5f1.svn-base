import ModelBase from "../../../framework/model/ModelBase";
/**
 * 入口类型
 */
export enum CustomerEntranceType
{

    QuickPayService = 101, //专享闪付
    /**
     * 加载登录按钮
     */
    LoginService = 10000,

    /**
     * 推广客服
     */
    SpreadService = 10001,

    /**
     * 大厅客服
     */
    HallService = 10002

}

/**
 * 配置类型
 */
export enum ServiceType
{
    /**
     * 多页签弹窗
     */
    BigPop = 1,
    /**
     * 艾特弹窗
     */
    AtWnd = 2,
    /**
     * 外部链接
     */
    Link = 3,
    /**
     * 小弹窗
     */
    Pop = 4,
    /**
     * 网页艾特
     */
    AtLink = 5

}

/**
 * 页面显示Item用的类型
 */
export enum PopItemType {

    /**
     * 微信
     */
    WX = 1,
    /**
     * QQ
     */
    QQ = 2,
    /**
     * 公众号
     */
    WXPUBLIC = 3,
    /**
     * 内置艾特
     */
    AtWnd = 4,
    /**
     * web外链
     */
    Link = 5,
    /**
     * 网页艾特
     */
    AtLink = 6
}

export default class ServicerModel extends ModelBase{
    //info_type -> [infoitem]
    private serviceMap = {};
    public customerData=null;


    public get Name()
    {
        return "ServicerModel";
    }

    //客服数据
    public initData( data : any ){
        if(data == null)
        {
            Logger.error("servicerDatas  == null ");
            return;
        }
        this.customerData = data;
        this.serviceMap = {}
        for(let i = 0; i < data.length; i++)
        {
            let type = data[i].key;
            if(type == null)
            {
                Logger.error("info_type == null", i);
                type = 0
            }
            this.serviceMap[type] = data[i];
        }
        
    }

    public getServices(type)
    {
       if(!this.serviceMap || !this.serviceMap[type])
       {
           return null
       }

       return this.serviceMap[type]
    }

    /**
     * 根据类型获取客服数据
     */
    public getServiceInfo(serviceEntranceType) {
        let serviceData = this.getServices(serviceEntranceType);
        if(!serviceData)
        {
            return null;
        }
        let data :any = {}
        switch (serviceEntranceType) {
            case CustomerEntranceType.SpreadService:
                data.arr = []
                data.show_img = serviceData.show_img
                data.status = serviceData.status
                switch (serviceData.type) {
                    case ServiceType.AtLink: // 艾特网页链接
                        let atLikeItem: any = {}
                        atLikeItem.url = Global.Toolkit.AssembyUrl(serviceData.aite_web_url) 
                        atLikeItem.data = Global.Toolkit.AssembyUrl(serviceData.aite_web_url) 
                        atLikeItem.msg = "推广客服"
                        atLikeItem.type = PopItemType.AtLink
                        data.arr.push(atLikeItem)
                        break;
                    case ServiceType.AtWnd:
                        let atWndItem: any = {}
                        atWndItem.url = serviceData.aite_url
                        atWndItem.data = serviceData.aite_url
                        atWndItem.msg = "推广客服"
                        atWndItem.type = PopItemType.AtWnd
                        data.arr.push(atWndItem)
                        break;
                    case ServiceType.Link:
                        let linkItem: any = {}
                        linkItem.url = serviceData.url
                        linkItem.data = serviceData.url
                        linkItem.msg = "推广客服"
                        linkItem.type = PopItemType.Link
                        data.arr.push(linkItem)
                        break;
                    case ServiceType.Pop:
                        let tmpArr: Array<any> = serviceData.windows
                        if (tmpArr.length !== 0) {
                            for (let index = 0; index < tmpArr.length; index++) {
                                let item = tmpArr[index]
                                let popItem: any = {}
                                popItem.type = item.type
                                
                                popItem.msg = item.msg
                                popItem.data = item.data
                                if(item.type === PopItemType.AtLink)
                                {
                                    popItem.data = Global.Toolkit.AssembyUrl(item.data) 
                                }
                                data.arr.push(popItem)
                            }
                        }
                        break;
                    default:
                        break;
                }
                break;
            case CustomerEntranceType.HallService:
            case CustomerEntranceType.LoginService:
                data = serviceData
                break
            default:
                break;
        }
        return data
    }


    public enterCustomerService(serviceEntranceType)
    {
        let type = serviceEntranceType
        let serviceData = this.getServices(serviceEntranceType);
        if(!serviceData)
        {
            Global.UI.fastTip("客服正在加速赶来，请稍后再试");
            return;
        }
        let url = ""
        switch (serviceData.type) {
            case ServiceType.Link:
                url = serviceData.url;
                if (url) {
                    /**
                     * 外部链接需要替换的参数
                     */
                    let paramList = [{ "param": "memberName", "value": Global.PlayerData.nickname }, { "param": "memberId", "value": Global.PlayerData.uid }]
                    url = Global.UrlUtil.replaceUrlParam(url, paramList)
                    //url = Global.Toolkit.AssembyUrl(url)
                    cc.sys.openURL(Global.Toolkit.DealWithUrl(url));
                }
                break;
            case ServiceType.AtLink:
                url = serviceData.aite_web_url;
                if (url) {
                    url = Global.Toolkit.AssembyUrl(url)
                    cc.sys.openURL(Global.Toolkit.DealWithUrl(url));
                }
                break;
            case ServiceType.AtWnd:
                Global.ChatServer.serverType = type
                Global.ChatServer.userSetting(null,serviceData.aite_url);
                break
            case ServiceType.Pop:
                let infosArr = [];
                let data = serviceData.windows
                if(!data || data.length == 0)
                {
                    Global.UI.fastTip("客服正在加速赶来，请稍后再试");
                    return;
                }
                for(let i = 0; i < data.length; i++){
                    if(data[i]["type"] != 0){
                        let singlePopInfo:any = {};
                        let type = data[i]["type"];
                        singlePopInfo.type = type;
                        singlePopInfo.data = data[i]["data"];
                        if(type === PopItemType.AtLink)
                        {
                            singlePopInfo.data = Global.Toolkit.AssembyUrl(data[i]["data"]) 
                        }
                        infosArr.push(singlePopInfo);
                    }
                }
                Global.UI.show("WndServicerUI", infosArr);
                break
            case ServiceType.BigPop:
                let popData = serviceData.page_sign
                if (!popData || popData.length == 0) {
                    Global.UI.fastTip("客服正在加速赶来，请稍后再试");
                    return;
                }
                for (let index = 0; index < popData.length; index++) {
                    let element = popData[index];
                    if (element) {
                        let window = element.windows || []
                        for (let i = 0; i < window.length; i++) {
                            let item = window[i];
                            if (item.type === PopItemType.AtLink) {
                                item.data = Global.Toolkit.AssembyUrl(item.data)
                            }
                        }

                    }

                }
                Global.UI.show("WndFeedback", popData);
                break
            default:
                break;
        }

    }
   

    

}