export class MsgEvent {
    public static readonly ReadMsgCallBack: string = "ReadMsgCallBack";   
    public static readonly DeleteMsgCallback : string = "DeleteMsgCallback";          
    public static readonly MsgListCallback : string = "MsgListCallback";

    public static readonly NoticeListCallback :string = "NoticeListCallback"
    public static readonly ReadNoticeCallback :string = "ReadNoticeCallback"



}

export enum MsgType
{
    All = 0,
    Notice = 1,
    Mail = 2,
   
}