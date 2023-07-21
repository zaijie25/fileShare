export default class PoolBase{
    private itemPool: Array<any> =  [];

    protected createItem(){
        
    }

    protected resetItem(item: any){

    }

    public getItem(){
        if (this.itemPool.length > 0){
            return this.itemPool.pop();
        }
        return this.createItem();
    }

    public recycleItem(item: any){
        this.resetItem(item);
        this.itemPool.push(item);
    }

    public recycleAll(arr: Array<any>){
        arr.forEach(ele => {
            this.recycleItem(ele);
        });
    }

    public resetPool(){
        this.itemPool = [];
    }
}