import ViewBase from "../../../core/ui/ViewBase";
export default class WaitingView extends ViewBase {
    private tipsLabel: cc.Label;
    // private counter = 0;
    // private model:WaitingModel;
    // private maxFrameCount = 0;
    // private UpdateInterval = 0.2;
    public static initWaitingView(node, position = cc.v2(0, 0)) {
        let loadingNode = new cc.Node();
        let node2 = new WaitingView();
        Global.ResourceManager.loadRes("hall/prefabs/ui/viewWaitUI", (error, prefab) => {
            if (prefab) {
                node2.setNode(cc.instantiate(prefab));
                loadingNode.addChild(node2.node);
                loadingNode.setParent(node);
                loadingNode.setPosition(position);
                return loadingNode;
            }
        });
        return loadingNode;
    }
    protected initView() {
        this.tipsLabel = this.getComponent("tips", cc.Label);
        if(cc.isValid(this.tipsLabel)){
            this.tipsLabel.string = "连接中"
        }
    }
    protected onSubViewShow() {
        Logger.error("--loading显示--");
    }
    protected onSubViewHide() {
        Logger.error("--loading消失");
    }
}
