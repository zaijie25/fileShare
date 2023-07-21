import InteractHeadTipComp from "../component/InteractHeadTipComp";
import InteractPlayComp from "../component/InteractPlayComp";

const baseBundle = "resources";
const headTipPath = "hall/prefabs/ui/interact/headTip";
const interactPlayPath = "hall/prefabs/ui/interact/interactPlayView";
export default class HeadTipsManager {
    private headTipsComp: InteractHeadTipComp;
    private interactPlayComp: InteractPlayComp;

    // 版本迭代暂用, 后续删除
    public async preloadRes(){
        return new Promise((resolve, reject)=>{
            Global.ResourceManager.loadBundleRes(baseBundle, [headTipPath, interactPlayPath], (err, res)=>{
                if (err){
                    reject(err);
                }
                else{
                    resolve(res);
                }
            });
        })
    }

    public static async preloadRes(){
        return new Promise((resolve, reject)=>{
            Global.ResourceManager.loadBundleRes(baseBundle, [headTipPath, interactPlayPath], (err, res)=>{
                if (err){
                    reject(err);
                }
                else{
                    resolve(res);
                }
            });
        })
    }

    public init(headTipsRoot: cc.Node, playRoot: cc.Node, isNeedHeadInfo: boolean){
        let node0 = <cc.Node>cc.instantiate(Global.ResourceManager.getBundleRes(baseBundle, headTipPath));
        let node1 = <cc.Node>cc.instantiate(Global.ResourceManager.getBundleRes(baseBundle, interactPlayPath));
        // 挂到场景上初始化后再挂到游戏UI下
        node0.setParent(cc.Canvas.instance.node);
        node1.setParent(cc.Canvas.instance.node);
        this.headTipsComp = Global.UIHelper.safeGetComponent(node0, "", InteractHeadTipComp);
        this.interactPlayComp = Global.UIHelper.safeGetComponent(node1, "", InteractPlayComp);

        this.headTipsComp.node.setParent(headTipsRoot);
        this.interactPlayComp.node.setParent(playRoot);

        this.headTipsComp.node.active = false;      // 默认隐藏
        this.interactPlayComp.node.active = true;   // 不隐藏
        
        this.headTipsComp.needHeadTip = isNeedHeadInfo;
    }

    public setConfig(sChair: number){
        this.headTipsComp.interactChooseView.setSelfSrc(sChair);
    }

    /**
     * 显示头像信息
     * @param isShow 是否显示
     * @param localSeat 显示者本地座位
     * @param data 
     */
    public showHeadView(isShow: boolean, localSeat: number, worldPos: cc.Vec3, data: any){
        let wPos = worldPos || cc.Vec3.ZERO;
        this.headTipsComp.showHeadView(isShow, localSeat, wPos, data);
    }

    /** 打开时更新玩家信息的金币变换 */
    public updatePoint(localSeat: number, point: any) {
        this.headTipsComp.updatePoint(localSeat, point);
    }

    /**
     * 播放表情
     * @param key 表情key
     * @param fWPos 世界起点
     * @param tWPos 世界终点
     * @param localSeat 表情归属的本地座位
     */
    public playAct(key: string, fWPos: cc.Vec3, tWPos: cc.Vec3, localSeat: number){
        this.interactPlayComp.node.active = true;
        this.interactPlayComp.playAct(key, fWPos, tWPos, localSeat);
    }

    /** 玩家leave时调用清理正在飞的表情 */
    public clearOneOwner(owner: string){
        this.interactPlayComp.clearOneOwner(owner);
    }

    /** 退出时调用 */
    public clearByGame(){
        if (this.headTipsComp && cc.isValid(this.headTipsComp)){
            this.headTipsComp.node.active = false;
        }
        if(this.interactPlayComp && cc.isValid(this.interactPlayComp)){
            this.interactPlayComp.node.active = false;
            this.interactPlayComp.clearAllOwner();
        }
    }
}