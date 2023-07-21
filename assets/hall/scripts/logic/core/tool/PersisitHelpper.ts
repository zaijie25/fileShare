//常驻节点工具类
export default class PersistHelper
{
    //持久化根节点
    private persistNode:cc.Node;
    //切场景不销毁的池节点
    private poolNode:cc.Node;
    private persistNodeMap = {}
    private showNode: cc.Node;
    public init()
    {
        if(this.persistNode != null)
            return;
        this.persistNode = new cc.Node("persistNode");
        let winSize= cc.winSize;
        this.persistNode.position = cc.v3(winSize.width*this.persistNode.anchorX, winSize.height*this.persistNode.anchorY,)
        //cc.director.getScene().addChild(this.persistNode);
        //持久化节点必须在根节点  如果没有父节点会自动挂载到scene上
        cc.game.addPersistRootNode(this.persistNode);
        this.persistNode.active = false;
        this.poolNode = new cc.Node("persistPoolNode");
        this.persistNode.addChild(this.poolNode);
        this.poolNode.active = false;

        this.showNode = new cc.Node("alwaysShowNode");
        this.persistNode.addChild(this.showNode);
        this.showNode.active = true;        // 常驻显示 用于展示
    }

    //挂载到常驻节点下，用于跨场景使用
    public saveToPool(key:string, node:cc.Node, alwaysShow: boolean = false)
    {
        if(this.persistNode == null || !this.persistNode.isValid)
        {
            Logger.error("invalid persitNode!!!");
            return;
        }
        if(this.persistNodeMap[key] == null)
            this.persistNodeMap[key] = [];
        let pool = this.persistNodeMap[key];
        pool.push(node);
        // node.removeFromParent(false);        // 会触发ondisable
        if (!alwaysShow)
            node.setParent(this.poolNode);
        else
            node.setParent(this.showNode);
    }

    public getFromPool(key:string)
    {
        if(this.persistNode == null || !this.persistNode.isValid)
        {
            Logger.error("invalid persitNode!!!");
            return;
        }
        let pool = this.persistNodeMap[key];
        if(pool == null)
            return null;
        while(pool.length > 0)
        {
            let node = pool.pop();
            if(node && node.isValid)
            {
                return node;
            }
        }
        return null;
    }

    public getPersistNode()
    {
        return this.persistNode;
    }
    
    /** 控制根节点展示 */
    public setState(tag)
    {
        if(this.persistNode)
        {
            this.persistNode.active = tag
        }
            
        // if(this.poolNode)
        // {
        //     this.poolNode.active = tag
        // }
        
    }
}