import { CustomerEntranceType } from "../../../hallcommon/model/ServicerModel";
import AbsServicer from "./AbsServicer";


/**
   应用内部打开的客服。如：艾特客服等
 */
export default abstract class InnerServicer extends AbsServicer {

    public acceptService(index:number){
        this.openServicer(this.serviceDatas[index]);
    }
    //打开客服
    abstract openServicer(data);
}

export class AtServicer extends InnerServicer {

    openServicer(data: any) {
        Global.ChatServer.serverType = CustomerEntranceType.HallService;
        Global.ChatServer.userSetting(null,data.info);
    }
    
}
