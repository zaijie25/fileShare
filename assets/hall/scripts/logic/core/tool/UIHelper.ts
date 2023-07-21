import YXButton from "../component/YXButton";
import UIAnimComponent from "../component/UIAnimComponent";
import ScrollViewCarmack from "../component/ScrollViewCarmack";
import PaoMaDengComp from "../component/PaoMaDengComp";
import IntoGameAnimComp from "../component/IntoGameAnimComp";
import ScreenShakeAction from "../component/ScreenShakeAction";
import WifiComp from "../component/WifiComp";
import TaskComp from "../component/TaskComp";
import GameLoadingComp from "../component/GameLoadingComp";
import AdmissionBoxComp from "../component/AdmissionBoxComp";
import PrivateMarqueeComp from "../component/PrivateMarqueeComp";
import ButtonPlus from "../component/ButtonPlus";
import PaoMaDengCompNew from "../component/PaoMaDengCompNew";

//UI通用效果
export default class UIHelper {
    public addCommonClick(root: cc.Node, path: string, callback: Function, target?: any, transition = cc.Button.Transition.SCALE, time?: number, playSound = true) {
        let node = this.getChild(root, path);
        if (node == null) {
            Logger.error("addCommonClick 找不到节点", path);
            return;
        }

        let ccButton = node.getComponent(cc.Button);
        if (ccButton && !(ccButton instanceof cc.Toggle || ccButton instanceof YXButton)) {
            node.removeComponent(cc.Button);    // 已经添加的就移除掉, 防止有些节点重复加了Button
        }

        let btn = node.getComponent(YXButton);
        if (btn == null) {
            btn = node.addComponent(YXButton);
            btn.transition = transition;
            if (transition == cc.Button.Transition.SCALE) {
                btn.zoomScale = 0.8;
            }
        }

        node.on("click", (touchTarget) => {
            if (btn) {
                if (!btn.isClickValid)
                    return;
                if (time == null || time == 0)
                    time = btn.CLICK_INTERVAL
                btn.isClickValid = false;
                btn.scheduleOnce(() => {
                    if (btn.isValid)
                        btn.isClickValid = true;
                }, btn.CLICK_INTERVAL);
            }
            //播放声音
            if (playSound)
                Global.Audio.playBtnSound();
            if (callback != null) {
                if (target)
                    callback.call(target, touchTarget);
                else
                    callback(touchTarget);
            }
        })
        return node;
    }

    public getChild(node: cc.Node, path: string) {
        if (node == null) {
            Logger.error("node is null", path);
            return;
        }
        if (path == null || path == "")
            return node;
        return cc.find(path, node);
    }

    public getComponent<T extends cc.Component>(node: cc.Node, path: string, type: { prototype: T }): T;
    public getComponent(node: cc.Node, path: string, type: any): any {
        let target = this.getChild(node, path);
        if (target == null)
            return null;
        return target.getComponent(type);
    }

    public safeGetComponent(node: cc.Node, path: string, type: any): any {
        let target = this.getChild(node, path);
        if (target == null)
            return null;
        if (type == null)
            return null;
        let comp = target.getComponent(type);
        if (comp != null)
            return comp;
        else {
            return target.addComponent(type);
        }
    }

    /**
     * 添加界面弹窗组件
     * 支持接口和回调方式触发动画完成回调
     * @param {cc.Node} node   脚本挂载节点 
     * @param {cc.Node} uiNode  UI主节点
     * @param {cc.Node} bgNode  透明遮罩节点
     * @param {IAnimWnd} [target] 
     * @returns
     * @memberof UIHelper
     */
    public addAnimComp(node: cc.Node, uiNode: cc.Node, bgNode: cc.Node, target?: IAnimWnd) {
        if (node == null || uiNode == null) {
            Logger.error("node == null || uiNode == null");
            return null;
        }
        let animComp: UIAnimComponent = this.safeGetComponent(node, "", UIAnimComponent);
        animComp.ui = uiNode;
        animComp.bg = bgNode;
        animComp.target = target;
        return animComp;
    }

    /**scrollview节点添加优化组件
     * @param {cc.Node} scrollViewNode      脚本挂载节点 
     * @param {cc.Node} itemNode            滚动内容子节点 
     * @param {number} itemNodePadding      子节点之间的间隔像素值
     * @param {number} itemOffSet          子节点的偏移像素值（子节点的锚点与上边界的距离像素）
     * @param {any} item_setter_caller      子节点的更新函数的this对象
     * @param {Function} item_setter        子节点的更新函数，参数为(item:cc.Node, index:number)
     * 
     * @returns {ScrollViewCarmack}
     */
    public addScrollViewCarmackComp(scrollViewNode: cc.Node, itemNode: cc.Node, itemNodePadding: number, itemOffSet: number, item_setter_caller: any, item_setter: (item: cc.Node, index: number, data: any) => void): ScrollViewCarmack {

        let scrollViewCarmack: ScrollViewCarmack = this.safeGetComponent(scrollViewNode, "", ScrollViewCarmack);
        scrollViewCarmack.itemPrefab = itemNode;
        scrollViewCarmack.item_setter_caller = item_setter_caller;
        scrollViewCarmack.item_setter = item_setter;
        scrollViewCarmack.itemNodePadding = itemNodePadding;
        scrollViewCarmack.itemOffset = itemOffSet;
        scrollViewCarmack.init();
        itemNode.active = false;
        // itemNode.destroy();
        return scrollViewCarmack;
    }

    /**添加跑马灯通用组件,必须挂载再遮罩节点上 
     * @param {cc.Node} maskNode            脚本挂载节点.（锚点X必须是1）
     * @param {boolean} bAddDefaultMsg      是否添加默认消息（抵制不良游戏XXXXXXX）
     * @param {cc.Node} rootNode            跑马灯根节点（无消息时隐藏）
     * @returns {PaoMaDengComp}
    */
    public addPaoMaDengComp(maskNode: cc.Node, bAddDefaultMsg: boolean = false, rootNode: cc.Node = null,ttf?:cc.Font): PaoMaDengComp {

        let paomadengComp: PaoMaDengComp = this.safeGetComponent(maskNode, "", PaoMaDengComp);
        if (rootNode != null) {
            paomadengComp.rootNode = rootNode;
        }
        paomadengComp.ttf=ttf;
        paomadengComp.init();
        if (bAddDefaultMsg) {
            paomadengComp.addDefautMsg();
        }
        return paomadengComp;
    }

    public addNewPaoMaDengComp(rootNode: cc.Node, bAddDefaultMsg: boolean = false): PaoMaDengCompNew {

        let resPath = "hall/prefabs/ui/PaoMaDengRootNode";
        let paoMaDengComp: PaoMaDengCompNew = null
        Global.ResourceManager.loadRes(resPath, (error, prefab) => {
            if (error != null) {
                Logger.error("加载资源错误")
                return
            }
            if (prefab == null) {
                return;
            }
            let ui = cc.instantiate(prefab)
            if (rootNode && rootNode.isValid) {
                rootNode.addChild(ui)
                ui.active = true
            }
            paoMaDengComp = this.safeGetComponent(ui, "", PaoMaDengCompNew);
            if (paoMaDengComp) {
                let poolLen = Global.Setting.SkinConfig.getPaomadengPoolLen()
                paoMaDengComp.initNode(poolLen)
                paoMaDengComp.run(bAddDefaultMsg)
            }
            
        })
        return paoMaDengComp;
    }
    private privateMarquee = new PrivateMarqueeComp();
    public marqueeShowNode(data,rootNode) {
        if(this.privateMarquee && this.privateMarquee.node){
            this.privateMarquee.node.active =true;
            this.privateMarquee.showNode(data);
        }else{
            if (rootNode == null) {
                return;
            }
            let resPath = "hall/prefabs/ui/PrivateMarqueeNode";
            Global.ResourceManager.loadRes(resPath, (error, prefab) => {
                if (error != null) {
                    Logger.error("加载资源错误")
                    return
                }
                if (prefab == null) {
                    return;
                }
                let copyNode = <cc.Node>cc.instantiate(prefab);
                copyNode.setParent(rootNode);
                copyNode.active = true;
                this.privateMarquee = this.safeGetComponent(copyNode, "", PrivateMarqueeComp);
                this.privateMarquee.node.active =true;
                this.privateMarquee.showNode(data);
            })
        }
    }
    public addPrivateMarqueeComp(rootNode: cc.Node) {
        if (rootNode == null) {
            return;
        }
        let resPath = "hall/prefabs/ui/PrivateMarqueeNode";
        Global.ResourceManager.loadRes(resPath, (error, prefab) => {
            if (error != null) {
                Logger.error("加载资源错误")
                return
            }
            if (prefab == null) {
                return;
            }
            let copyNode = <cc.Node>cc.instantiate(prefab);
            copyNode.setParent(rootNode);
            copyNode.active = true;
            this.privateMarquee = this.safeGetComponent(copyNode, "", PrivateMarqueeComp);
            this.privateMarquee.node.active =false;
        })
    }
    /**
     * 添加信号通用组件
     * @param rootNode 脚本挂载节点
     * @param type 类型 （1：大厅 2：子游戏）
     */
    public addWifiComp(rootNode: cc.Node, type: number = 2) {
        let resPath = "hall/prefabs/ui/wifiNode";
        Global.ResourceManager.loadRes(resPath, (error, prefab) => {
            if (error != null) {
                Logger.error("加载资源错误")
                return
            }
            if (prefab == null) {
                return;
            }
            let ui = cc.instantiate(prefab)
            if (rootNode && rootNode.isValid) {
                rootNode.addChild(ui)
                ui.active = true
            }
            let wifiComp: WifiComp = this.safeGetComponent(ui, "", WifiComp);
            if (wifiComp) {
                wifiComp.init(type)
                wifiComp.startListen()
            }
        })
    }

    public addAdmissionComp(rootNode: cc.Node) {
        let resPath = "hall/prefabs/ui/AdmissionBoxNode";
        Global.ResourceManager.loadRes(resPath, (error, prefab) => {
            if (error != null) {
                Logger.error("加载资源错误")
                return
            }
            if (prefab == null) {
                return;
            }
            let ui = cc.instantiate(prefab)
            if (rootNode && rootNode.isValid) {
                rootNode.addChild(ui)
                ui.active = true
            }
            let admissionComp: AdmissionBoxComp = this.safeGetComponent(ui, "", AdmissionBoxComp);
            if (admissionComp) {
                admissionComp.init();
            }
        })
    }

    /**添加子游戏入场动画通用组件
     * @param {cc.Node} rootNode            脚本挂载节点.（必须是UI根节点，且不能是loading页面节点的父级）
     * @param {cc.Node} loadingNode         加载页面节点
     * @param {cc.Node} bottomNodeArr       底部动画节点数组（筹码背景->自己的头像->筹码按钮），按动画先后顺序排列，每个子游戏不一样，可自行排列看效果，可为空
     * @param {cc.Node} topNodeArr          顶部动画节点数组（走势图->下拉菜单按钮->走势按钮），按动画先后顺序排列，每个子游戏不一样，可自行排列看效果，可为空
     * @param {cc.Node} leftNodeArr         左边动画节点数组（大富豪在内的3个头像），按动画先后顺序排列，每个子游戏不一样，可自行排列看效果，可为空
     * @param {cc.Node} rightNodeArr        右边动画节点数组（智多星在内的3个头像），按动画先后顺序排列，每个子游戏不一样，可自行排列看效果，可为空
     * @param autoInit                      是否自动初始化。  选场游戏用
     * @returns {IntoGameAnimComp}
    */
    public addIntoGameAnimComp(rootNode: cc.Node, loadingNode: cc.Node, bottomNodeArr: cc.Node[], topNodeArr: cc.Node[], leftNodeArr: cc.Node[], rightNodeArr: cc.Node[], middleNodeArr: cc.Node[] = [], autoInit = true): IntoGameAnimComp {
        let intoGameAnimComp: IntoGameAnimComp = this.getBriefIntoGameAnim(rootNode);
        intoGameAnimComp.loadingNode = loadingNode;
        intoGameAnimComp.bottomNodeArr = bottomNodeArr || [];
        intoGameAnimComp.topNodeArr = topNodeArr || [];
        intoGameAnimComp.leftNodeArr = leftNodeArr || [];
        intoGameAnimComp.rightNodeArr = rightNodeArr || [];
        intoGameAnimComp.middleNodeArr = middleNodeArr || [];
        if (autoInit)
            intoGameAnimComp.init();
        return intoGameAnimComp;
    }

    /**
     * 设置子游戏入场动画通用组件
     * @param rootNode 
     */
    public getBriefIntoGameAnim(rootNode: cc.Node): IntoGameAnimComp {
        if (!rootNode || !rootNode.isValid) {
            return Logger.error("挂载节点异常")
        }
        return this.safeGetComponent(rootNode, "", IntoGameAnimComp);
    }


    /**
     * 设置节点变暗或取消
     * @param {cc.Node} node            要置灰或取消置灰的节点
     * @param {boolean} bGray           是否置灰 false-取消置灰
     * @param {number} color            置灰的暗度，此值越小越黑,最大为255
    */
    public setNodeGray(node: cc.Node, bGray: boolean, color: number = 150, includeAllNode = false): void {
        let childSprites: cc.Sprite[] = node.getComponentsInChildren(cc.Sprite);
        childSprites.forEach(sprite => {
            if (sprite) {
                if (bGray) {
                    sprite.node.color = cc.color(color, color, color);
                    // sprite.setState(cc.Sprite.State.GRAY);
                } else {
                    sprite.node.color = cc.color(255, 255, 255);
                    // sprite.setState(cc.Sprite.State.NORMAL);
                }
            }
        });
        if (childSprites == null || childSprites.length == 0 || includeAllNode) {
            if (bGray) {
                node.color = cc.color(color, color, color);
                // sprite.setState(cc.Sprite.State.GRAY);
            } else {
                node.color = cc.color(255, 255, 255);
                // sprite.setState(cc.Sprite.State.NORMAL);
            }

            for (let i = 0; i < node.childrenCount; i++) {
                node.children[i].color = node.color;
            }
        }
    }

    /**
     * 获取一个抖动action
     * @param duration 抖动持续时间
     * @param offsetX x方向抖动偏移（幅度）
     * @param offsetY y方向
     */
    public getScreenShakeAction(duration: number = 0.5, offsetX: number = 10, offsetY: number = 0) {
        return new ScreenShakeAction(duration, offsetX, offsetY);
    }

    /**
     * 给不规则节点添加触摸监听, 需要先挂载cc.PolygonCollider组件
     * @param polygon cc.PolygonCollider组件
     * 设置组件: Global.UIHelper.addPolygonButton(node.getComponent(cc.PolygonCollider));
     * 节点监听: node.on(cc.Node.EventType.TOUCH_END, this.onBoxClick, this);
     */
    public addPolygonButton(polygon: cc.PolygonCollider) {
        if (!polygon)
            throw TypeError("polygon is null or undefined");

        if (!(polygon instanceof cc.PolygonCollider))
            throw TypeError("polygon should be cc.PolygonCollider");

        this.safeGetComponent(polygon.node, "", "PolygonButtonHit");
    }

    public getGameLoadingComp(){
        let path = "hall/prefabs/ui/GameLoading/GameLoadingComp";
        let prefab = Global.ResourceManager.getBundleRes("resources", path, cc.Prefab);
        if (!prefab) {
            Logger.error("error 未预加载GameLoadingComp prefab");
            return new Promise((resolve, reject) => {
                Global.ResourceManager.loadBundleRes("resources", path, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        let node = <cc.Node>cc.instantiate(res);
                        let comp = this.safeGetComponent(node, "", GameLoadingComp);
                        resolve(comp);
                    }
                })
            })
        }
        let copyNode = cc.instantiate(prefab);
        return this.safeGetComponent(copyNode, "", GameLoadingComp);
    }
}