import ModelBase from "../../../framework/model/ModelBase";
import { NetAppface } from "../../core/net/hall/NetEvent";
import { MsgEvent, MsgType } from "../../hall/ui/msg/MsgEvent";
import { HallRedSpotType } from "./HallModel";
import HallPopMsgHelper, { PopWndName } from "../../hall/tool/HallPopMsgHelper";



export default class MsgModel extends ModelBase{
    protected onInit(){
       Global.Event.on(GlobalEvent.ShowRedSpot,this,this.RefreshData)
    }
    RefreshData(data) {
        let needfresh = data[0] || false
        let redSpotType = data[1] 
        if(!needfresh)
        {
            return
        }
        switch (redSpotType) {
            case HallRedSpotType.Gonggao:
                {
                    this.RefreshDataByType(MsgType.Notice)
                    break;
                }
            case HallRedSpotType.Mail:
                {
                    this.RefreshDataByType(MsgType.Mail)
                    break;
                }

        }
    }
    private DataTabel: { [key: number]: any } ={} 
    private MailContenTabel:{[key:number]:any} = {} //存储已读公告
    private NoticeContenTabel:{[key:number]:any} = {}//存储已读邮件

    public GetDataByType(msg_type:number)
    {
        if(this.DataTabel[msg_type] && !Global.Toolkit.isEmptyObject(this.DataTabel[msg_type]))
        {
            this.Sort()
            let data = this.DataTabel[msg_type]
            return data
        }
        return null

    }
   
    public get Name()
    {
        return "MsgModel";
    }

    private _Status:number 

    
    public get Status()
    {
        return this._Status
    }

    /**
     * 公告弹窗字段
     * @param status 
     */
    public SetStatus(status)
    {
        this._Status = (status == null) ? 0:status
        if (status){
            HallPopMsgHelper.Instance.addMsgList(PopWndName.Notice, ()=>{
                Global.Event.event(GlobalEvent.POP_NOTICE);
            })
        }
    }

    public RefreshDataByType(msg_type:number)
    {
        // Global.HallServer.clearCache(NetAppface.mod,NetAppface.GetMsgList,{type:msg_type})
        this.ClearAllNetFaceCache()
        this.GetMsgList(msg_type,false,false,false)
    }

    public ClearAllNetFaceCache(){
        Global.HallServer.clearCache(NetAppface.mod,NetAppface.GetMsgList,{type:MsgType.All})
        Global.HallServer.clearCache(NetAppface.mod,NetAppface.GetMsgList,{type:MsgType.Mail})
        Global.HallServer.clearCache(NetAppface.mod,NetAppface.GetMsgList,{type:MsgType.Notice})
    }

    public GetMsgList(msg_type:number, isFromHall :boolean = false, isFresh :boolean=false,showwaiting :boolean = false)
    {
        Global.HallServer.send(NetAppface.mod, NetAppface.GetMsgList, {type:msg_type},(msg) =>{
            this.DataTabel[msg_type] = msg
           
            if(isFromHall)
            {   
                let MsgFlag = this.CheckIsAnyMailNotRead(isFromHall)
                if(MsgFlag)
                {
                    Global.Event.event(GlobalEvent.ShowRedSpot,[false,HallRedSpotType.Mail]);
                }

                let noticeFlag = this.CheckIsAnyNoticeNotRead(isFromHall)
                if(noticeFlag)
                {
                    Global.Event.event(GlobalEvent.ShowRedSpot,[false,HallRedSpotType.Gonggao]);
                }
                this.AssemblyData(msg)

            }
            else
            {
                this.Sort()
                let data = this.DataTabel[msg_type]
                if(msg_type == MsgType.Notice){
                   this.event(MsgEvent.NoticeListCallback,data) 
                }else{
                    this.event(MsgEvent.MsgListCallback,data)
                }
            }
        },this.SpreadErronFunc.bind(this), false, isFresh?0:180 )
    }

    AssemblyData(msg: any) {
        if(msg == null || Global.Toolkit.isEmptyObject(msg))
        {
            return
        }
        
        if(!this.DataTabel.hasOwnProperty(MsgType.Mail))
        {
            let data = {}
            data["mail_total"] = msg.mail_total || -1
            data["mail"] = msg.mail || null
            this.DataTabel[MsgType.Mail] = data || null
        }

        if(!this.DataTabel.hasOwnProperty(MsgType.Notice))
        {
            let data = {}
            data["notice_tital"] = msg.notice_tital || -1
            data["notice"] = msg.notice || null
            this.DataTabel[MsgType.Notice] = data || null
        }

    }

    private SpreadErronFunc( data : any ){
        if(data._errstr != null){
            Global.UI.fastTip(data._errstr+"");
          //  Global.UI.fastTip(data._errstr+"["+data._errno+"]");
            return false;
        }
        return true;
    }

   
    public DelMail(id:number)
    {
        Global.HallServer.send(NetAppface.mod, NetAppface.DelMail, {id:id},(msg) =>{
            let type = MsgType.Mail
            for(let i = 0; i < this.DataTabel[type].mail.length; i ++)
            {
                if(this.DataTabel[type].mail[i] &&this.DataTabel[type].mail[i].id === id)
                {
                    this.DataTabel[type].mail.splice(i,1)
                    break;
                }

            }
            this.ClearAllNetFaceCache()
            this.event(MsgEvent.DeleteMsgCallback,msg)

        },this.SpreadErronFunc.bind(this))
    }

    public ReadMsg(id,msg_type,red_status)
    {
        Global.HallServer.send(NetAppface.mod, NetAppface.ReadMsg, {id:id,msg_type:msg_type,red_status:red_status},(msg) =>{
            let data = null

            if(msg_type == MsgType.Mail)
            {
                data = this.DataTabel[msg_type].mail
            }
            else if(msg_type == MsgType.Notice)
            {
                data = this.DataTabel[msg_type].notice
            }
            for(let i = 0; i < data.length; i ++)
            {
                if(data[i] &&data[i].id === id)
                {
                    data[i].red_status = 1
                    break;
                }

            }
            this.ClearAllNetFaceCache()
            this.SaveContent(msg_type,id,msg)
            this.event(MsgEvent.ReadMsgCallBack,msg)

        // },this.SpreadErronFunc.bind(this), false, 10000)
        },this.SpreadErronFunc.bind(this),false,10000)
    }
    SaveContent(msg_type: number,id:number, msg: any) {
        if(msg_type == MsgType.Mail)
        {
            this.MailContenTabel[id] = msg
        }
        else
        {
            this.NoticeContenTabel[id] = msg
        }
    }

    public GetContentByID(type:MsgType,id:number)
    {
        if(type == MsgType.Mail)
        {
            if(this.MailContenTabel.hasOwnProperty(id))
            {
                return this.MailContenTabel[id]
            }
            return null
        }
        else
        {   
            if(this.NoticeContenTabel.hasOwnProperty(id))
            {
                return this.NoticeContenTabel[id]
            }
            return null

        }
    }

    /**
     * 
     * @param isFromHall 是否登录时请求
     */
    public CheckIsAnyMailNotRead(isFromHall:boolean = false) {
        if (this.DataTabel == null) {
            return
        }
        let flag = false
        let data = isFromHall ? this.DataTabel[MsgType.All]:this.DataTabel[MsgType.Mail]
        if(data)
        {
            for (let i = 0; i < data.mail.length; i++) {
                if (data.mail[i] && data.mail[i].red_status == 0) {
                    flag = true
                    break;
                }
    
            }
        }
        return flag
    }

    public CheckIsAnyNoticeNotRead(isFromHall:boolean = false) {
        if (this.DataTabel == null) {
            return
        }
        let flag = false
        let data = isFromHall ? this.DataTabel[MsgType.All]:this.DataTabel[MsgType.Notice]
        if(data){
            for (let i = 0; i < data.notice.length; i++) {
                if (data.notice[i] && data.notice[i].red_status == 0) {
                    flag = true
                    break;
                }
    
            }
        }
        return flag
    }
    public clear()
    {
        this.DataTabel = [];
        this.MailContenTabel = []
        this.NoticeContenTabel = []
       // Global.Event.off(GlobalEvent.ShowRedSpot,this,this.RefreshData)
    }

    public Sort()
    {
        if(this.DataTabel == null || Global.Toolkit.isEmptyObject(this.DataTabel))
        {
            cc.error("没有数据")
            return
        }
        if(this.DataTabel.hasOwnProperty(MsgType.Mail)){
            let MailData = this.DataTabel[MsgType.Mail].mail || null
       
            if(MailData&&MailData.length != 0 )
            {
                MailData.sort(this.SortByStatus)
            }
            
        }
        if(this.DataTabel.hasOwnProperty(MsgType.Notice))
        {
            let NoticeData = this.DataTabel[MsgType.Notice].notice || null
            if (NoticeData && NoticeData.length != 0) {
                NoticeData.sort(this.SortByStatus)
            }
        }
        
    }
    /**
     * 根据是否已读排序
     * @param a 
     * @param b 
     */
    public SortByStatus(a,b)
    {
        if(a.red_status == 0 && b.red_status == 1)
        {
            return -1
        }
        else if(a.red_status == 1 && b.red_status == 0)
        {
            return 1
        }
        else{
            return  b.id-a.id 
        }
    }
    
}