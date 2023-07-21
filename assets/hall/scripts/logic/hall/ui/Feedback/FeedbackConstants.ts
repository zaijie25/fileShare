export class FeedbackConstants {
    public static readonly FeedbackListCallback :string = "FeedbackListCallback"
    public static readonly DealFeedbackCommit: string = "DealFeedbackCommit";   
    public static readonly DealFeedbackDelete : string = "DealFeedbackDelete";          
}

//页签类型 1反馈 2 在线 3微信 4qq客服  5公众号 6阿里  7阿特
export enum TagType{
    FEEDBACK = 1,
    ONLINE = 2,
    WX = 3,
    QQ = 4,
    GZH = 5,
    ALI = 6,
    AT = 7,
}

export enum RightViewType{
    feedback=0,
    onlineService=1,
    wxService=2,
    qqService=3,
    gzhService=4,
    aliService=5,
    atService=6,
    FQA=7,
    feedbackShowAndWrite=8,
    noMsgTips=9,
    feedback2=10
}

export enum ServEntityType{
    onlineService="onlineService",
    wxService="wxService",
    qqService="qqService",
    atService="atService",
   
}

