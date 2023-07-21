import ModelBase from "../../../framework/model/ModelBase";
import { NetAppface } from "../../core/net/hall/NetEvent";
import { CashBackEvent } from "../../hall/ui/CashBack/CashBackEvent";
import { HallRedSpotType } from "./HallModel";

export default class CashBackModel extends ModelBase {
    redFlag = false;

    private CashBackErronFunc(data: any) {
        if (data._errstr != null) {
            Global.UI.fastTip(data._errstr);
            return false;
        }
        return true;
    }

    public get Name() {
        return "CashBackModel";
    }

    public get RedFLag() {
        return this.redFlag
    }

    public set RedFLag(flag) {
        this.redFlag = flag
        if (this.redFlag) {
            Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallRedSpotType.CashBackDay]);
        }
    }

    CheckRedFlag() {
        if (this.redFlag) {
            Global.Event.event(GlobalEvent.ShowRedSpot, [false, HallRedSpotType.CashBackDay]);
        }
    }

    /**
     * 返利说明数据
     */
    public GetActivityCfg() {
        let param: any = {}
        Global.HallServer.send(NetAppface.mod, NetAppface.GetActivityCfg, param, (msg) => {
            this.event(CashBackEvent.GetActivityCfg, msg)
        }, this.CashBackErronFunc.bind(this), false, 1)
    }

    /**
    * 每日返利领取记录
    */
    public GetDayFlowBackRecord(page: number, limit: number) {
        let param = {
            "page": page,
            "limit": limit
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.GetDayFlowBackRecord, param, (msg) => {
            this.event(CashBackEvent.GetDayFlowBackRecord, msg)
        }, this.CashBackErronFunc.bind(this), false, 0)
    }

    /**
     * 领取每日返利
     */
    public GetDayFlowBack(id:string)
    {
        let param = {
            "id": id,
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.GetDayFlowBackAll, param, (msg) => {
            this.event(CashBackEvent.GetDayFlowBackAll, msg);
            Global.HallServer.send(NetAppface.mod, NetAppface.GetUserPoint, {});
        }, this.CashBackErronFunc.bind(this), true, 0)
    }
}
