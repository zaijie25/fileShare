export default abstract class GameBasePool<T>{
    protected pool: T[] = [];
    
    /**
     * 通用缓存池基类
     * @param root 缓存用父节点
     */
    constructor(protected root: cc.Node){
        this.preCreate();
    }

    private preCreate(){
        let count = 0;
        let loadByFrame = ()=>{
            for(let i = 0; i < this.everyCount; i++){
                let item = this.createItem();
                this.recycleItem(item);
                count++;
                if (count >= this.preCount){
                    Game.Component.unschedule(loadByFrame);
                    break;
                }
            }
        }
        Game.Component.schedule(loadByFrame, 0.2);
    }
    
    // 预加载总数
    protected get preCount(){
        return 30;
    }

    // 每固定帧加载数量
    protected get everyCount(){
        return 30;
    }

    protected abstract createItem(): T;

    public getItem(): T{
        if (this.size > 0){
            return this.pool.pop();
        }
        return this.createItem();
    }

    public getItemArr(count: number): T[]{
        let arr = [];
        for(let i=0; i< count; i++){
            let item = this.getItem();
            arr.push(item);
        }
        return arr;
    }

    protected abstract resetItem(item: T): void;

    public recycleItem(item: T){
        this.resetItem(item);
        this.pool.push(item);
    }

    public recycleAll(arr: T[]){
        arr.forEach(ele => {
            this.recycleItem(ele);
        });
    }

    public resetPool(){
        this.pool = [];
    }

    public get size(){
        return this.pool.length;
    }
}