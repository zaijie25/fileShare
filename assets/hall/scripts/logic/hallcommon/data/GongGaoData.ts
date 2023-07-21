
export class SingleGongGaoModel {
    public app_id: number = 0;
    public lunbo_id: number = 0;//轮播图id
    public desc: string = "";//描述
    public jump_type: number = 0; //是否跳转 0不跳转 1跳转
    public jump_url: string = ""; //跳转url
}

export default class GongGaoData {
    /* private gongGaoIdList = [
        11001,   //幸运女神
        11002,   //财富秘籍
        11003,   //充值返利5%
        11004,   //复制官网
        11005,   //闪退修复
        11006,   //邀请好友（扫码）
    ] */
    
    //要显示的公告数据列表
    private _gongGaoList:SingleGongGaoModel[] = [];

    constructor() {
        this.clear();
    }

    public clear() {
        this._gongGaoList = [];
    }

    public init(gongGaolist: []) {
        if (!gongGaolist) {
            cc.error("----gongGaoList------ null")
            return;
        }
        let tempGongGaoList:SingleGongGaoModel[] = [];
        for (let i = 0; i < gongGaolist.length; i++) {
            let itemData = gongGaolist[i];
            let gongGaoModel = new SingleGongGaoModel();
            for (let key in gongGaoModel) {
                if (itemData[key] != null && itemData[key] != undefined) {
                    gongGaoModel[key] = itemData[key];
                }
            }
            
            if (gongGaoModel.lunbo_id != 0) {
                tempGongGaoList.push(gongGaoModel);
            }
        }

        this._gongGaoList = tempGongGaoList;
    }

    public get gongGaoList():SingleGongGaoModel[] {
        return this._gongGaoList;
    }


}