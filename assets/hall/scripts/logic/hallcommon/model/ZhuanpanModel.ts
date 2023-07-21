import ModelBase from "../../../framework/model/ModelBase";
import HallPopMsgHelper, { PopWndName } from "../../hall/tool/HallPopMsgHelper";
import HallBtnHelper from "../../hall/ui/hall/views/HallBtnHelper";

import { ActivityConstants, ActivityType } from "../../hall/ui/Activity/ActivityConstants";


/**
 * 活动：转盘抽奖 数据类
 */
export default class ZhuanpanModel extends ModelBase{
    /**
     * 全局单例
     */
    static instance:ZhuanpanModel = null;
    protected onInit(){
        ZhuanpanModel.instance = this;
    }

    /**
     * 刷新转盘 积分数据
     */
    static RefreshPanelUI = "RefreshPanelUI"

    /**
     * 刷新轮播数据
     */
    static RefreshRecordUI = "RefreshRecordUI"


    /**
     * 刷新积分
     */

     static RefreshScore = "RefreshScore"

    /**
     * 开始抽奖
     */
    static StartDrawLucky = "StartDrawLucky"

    awardResult = -1
    /**
     * 数据对象
     */
    data: any = null;
    /**
     * 轮播数据集合
     */
    lunboDataArr = [];

    /**
     * 是否开启此活动
     */
    bOpen:boolean = false;

    /**
     * 登录是否自动打开界面
     */
    private _Status:boolean = false;
    get Status()
    {
        return this._Status;
    }

    SetStatus(status)
    {
        this._Status = status;
        // if (status){
        //     //每次登录自动弹窗
        //     HallPopMsgHelper.Instance.addMsgList(PopWndName.Zhuanpan, ()=>{
        //         HallPopMsgHelper.Instance.addLock(PopWndName.Zhuanpan);
        //         HallBtnHelper.WndZhuanpanOpen();
        //     });
        // }
    }

    get Name()
    {
        return "ZhuanpanModel";
    }
    
    clear()
    {
        this.SetStatus(false);
    }

    /**
     * 请求活动配置
     */
    reqActivityCfg(){
        let _param = {
        }

        var self = this;
        Global.HallServer.send(NetAppface.mod, "GetActivityCfg", _param,
            function (data : any){
                //成功
                Global.Event.event(ActivityConstants.SHOW_ACT_WAITTING, false)
                var dataArr = data["data"];
                for(var i = 0; i < dataArr.length; i++){
                    var obj = dataArr[i];
                    if(obj.atype == ActivityType.zhuanpan){
                        self.data = obj.cfg;
                        self.event(ZhuanpanModel.RefreshPanelUI,self.data)
                        self.event(ZhuanpanModel.RefreshScore)
                    }
                }
            }.bind(this),

            function (data : any) {
                //失败
                // self.bOpen = false;
                Global.Event.event(ActivityConstants.SHOW_ACT_WAITTING, false)
                Logger.error("zhuanpanModel reqActivityCfg failed");
            }.bind(this),
            false
        );
    }

    /**
     * 请求抽奖
     */
    reqChoujiang(type){
        let _param = {
            "atype": ActivityType.zhuanpan,
            "type": type,
        }

        var self = this;
        Global.HallServer.sendWithNoRetry(NetAppface.mod, "ReceiveActivityAward", _param,
            function (data : any){
                //成功
                var award = data["award"];
                if(award==0){
                    Global.UI.fastTip("转盘活动已结束！");
                    return;
                }
                var num = data["num"];
                var coin = data["coin"];
                self.data.coin = coin;
                if(coin < 50){
                    Global.Event.event(ActivityConstants.HIDE_RED_PORT,ActivityType.zhuanpan)
                }
                self.awardResult = award;  
                self.event(ZhuanpanModel.StartDrawLucky,num) 
                self.event(ZhuanpanModel.RefreshScore)             
                //ZhuanpanJifen.instance.UpdateUI();

                //ZhuanpanChoujiang.instance.StartChoujiangAnimation(num);

                
            }.bind(this),

            function (data : any) {
                //失败
                Logger.error("zhuanpanModel reqChoujiang failed");
            }.bind(this),
            false
        );
    }

    /**
     * 请求轮播数据
     */
    reqLunbo(startIndex:number = -1){
        let _param = {
            "id": 0,
        }

        var self = this;
        Global.HallServer.send(NetAppface.mod, "GetActivityAwardRecord", _param,
            function (data : any){
                //成功
                self.lunboDataArr = data["data"];
                self.event(ZhuanpanModel.RefreshRecordUI,startIndex)
            }.bind(this),

            function (data : any) {
                //失败
                Logger.error("zhuanpanModel reqLunbo failed:" + JSON.stringify(data));
                
            }.bind(this),
            false
        );
    }
}