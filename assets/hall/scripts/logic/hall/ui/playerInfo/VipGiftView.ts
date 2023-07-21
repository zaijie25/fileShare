import VipGiftViewItem from "./VipGiftViewItem"

const { ccclass, property } = cc._decorator;

/**
 * vip特权下的单个pageview视图
 */
@ccclass
export default class VipGiftView extends cc.Component {

    itemList:Array<cc.Node> = []

    initView()
    {
        for (let index = 0; index < 3; index++) {
            let item = cc.find(`item_${index}`,this.node)
            if(item)
            {
                this.itemList.push(item)
            }
        }
        
    }

    refreshUI(data,pageIndex)
    {
        for (let index = 0; index < 3; index++) {
            if(this.itemList.length>= index)
            {
                if(this.itemList[index])
                {
                    let viewItem : VipGiftViewItem =  this.itemList[index].getComponent(VipGiftViewItem)
                    if(viewItem)
                    {
                        viewItem.refreshUI(data,index,pageIndex)
                    }

                }
                
            }
        }
    }
    
   
}