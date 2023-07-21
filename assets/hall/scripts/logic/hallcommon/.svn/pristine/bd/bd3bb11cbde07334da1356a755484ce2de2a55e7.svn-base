import ModelBase from "../../../framework/model/ModelBase";
import { NetAppface } from "../../core/net/hall/NetEvent";

export default class RankModel extends ModelBase {
    public static UpdateRankData = "UpdateRankData";
    public static RefreshScrollview = "RefreshScrollview";
    private dataMap: { [key: number]: RankData } = {}
    protected onInit() {

    }
    public msg: any;
    /**
     * rank_type 1 今日盈亏榜 2财富榜 3周排行榜 4 流水日佣金榜 5 税收周佣金榜 6佣金排行榜总榜
     */
    public reqRankInfo(rank_type: number, next: boolean) {
        if(!next && this.dataMap.hasOwnProperty(rank_type))
        {
            this.event(RankModel.RefreshScrollview, this.dataMap[rank_type].data);
            return
        }
        if(!this.dataMap.hasOwnProperty(rank_type))
        {
            this.dataMap[rank_type] = new RankData()
        }
        if (next) {
            let data = this.dataMap[rank_type].data || {};
            if (data.pointRankList && data.pointRankList.length >= this.dataMap[rank_type].total) {
                Global.UI.fastTip("无更多信息")
                return;
            }

            this.dataMap[rank_type].page++;
        } else {
            this.dataMap[rank_type].page = 0;
        }
        let param = {
            "page": this.dataMap[rank_type].page,
            "type": rank_type
        }
        Global.HallServer.send(NetAppface.mod, NetAppface.GetPointRank, param, (res) => {
            this.dataMap[rank_type].total = res.total || 100;
            let page = res.page;
            let list = res.pointRankList || [];
            if (!list) {
                return;
            }
            if (page == 0) {
                this.dataMap[rank_type].data = res;
                this.event(RankModel.RefreshScrollview, res);
            }
            else {
                if (this.dataMap[rank_type].page > page)
                    return;
                this.dataMap[rank_type].data.pointRankList = this.dataMap[rank_type].data.pointRankList.concat(list);
                this.event(RankModel.UpdateRankData, this.dataMap[rank_type].data.pointRankList);
            }

        }, null, false, 60);
    }

    public get Name() {
        return "RankModel";
    }

    public clear()
    {
        this.dataMap = {}
    }

}

class RankData {
    public page = 0
    public total = 0
    public data :any = null
}