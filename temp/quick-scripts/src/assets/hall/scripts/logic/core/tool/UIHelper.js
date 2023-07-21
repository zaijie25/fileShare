"use strict";
cc._RF.push(module, '95bf7q3W45BnqsJJQCDVHQr', 'UIHelper');
// hall/scripts/logic/core/tool/UIHelper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var YXButton_1 = require("../component/YXButton");
var UIAnimComponent_1 = require("../component/UIAnimComponent");
var ScrollViewCarmack_1 = require("../component/ScrollViewCarmack");
var PaoMaDengComp_1 = require("../component/PaoMaDengComp");
var IntoGameAnimComp_1 = require("../component/IntoGameAnimComp");
var ScreenShakeAction_1 = require("../component/ScreenShakeAction");
var WifiComp_1 = require("../component/WifiComp");
var GameLoadingComp_1 = require("../component/GameLoadingComp");
var AdmissionBoxComp_1 = require("../component/AdmissionBoxComp");
var PrivateMarqueeComp_1 = require("../component/PrivateMarqueeComp");
var PaoMaDengCompNew_1 = require("../component/PaoMaDengCompNew");
//UI通用效果
var UIHelper = /** @class */ (function () {
    function UIHelper() {
        this.privateMarquee = new PrivateMarqueeComp_1.default();
    }
    UIHelper.prototype.addCommonClick = function (root, path, callback, target, transition, time, playSound) {
        if (transition === void 0) { transition = cc.Button.Transition.SCALE; }
        if (playSound === void 0) { playSound = true; }
        var node = this.getChild(root, path);
        if (node == null) {
            Logger.error("addCommonClick 找不到节点", path);
            return;
        }
        var ccButton = node.getComponent(cc.Button);
        if (ccButton && !(ccButton instanceof cc.Toggle || ccButton instanceof YXButton_1.default)) {
            node.removeComponent(cc.Button); // 已经添加的就移除掉, 防止有些节点重复加了Button
        }
        var btn = node.getComponent(YXButton_1.default);
        if (btn == null) {
            btn = node.addComponent(YXButton_1.default);
            btn.transition = transition;
            if (transition == cc.Button.Transition.SCALE) {
                btn.zoomScale = 0.8;
            }
        }
        node.on("click", function (touchTarget) {
            if (btn) {
                if (!btn.isClickValid)
                    return;
                if (time == null || time == 0)
                    time = btn.CLICK_INTERVAL;
                btn.isClickValid = false;
                btn.scheduleOnce(function () {
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
        });
        return node;
    };
    UIHelper.prototype.getChild = function (node, path) {
        if (node == null) {
            Logger.error("node is null", path);
            return;
        }
        if (path == null || path == "")
            return node;
        return cc.find(path, node);
    };
    UIHelper.prototype.getComponent = function (node, path, type) {
        var target = this.getChild(node, path);
        if (target == null)
            return null;
        return target.getComponent(type);
    };
    UIHelper.prototype.safeGetComponent = function (node, path, type) {
        var target = this.getChild(node, path);
        if (target == null)
            return null;
        if (type == null)
            return null;
        var comp = target.getComponent(type);
        if (comp != null)
            return comp;
        else {
            return target.addComponent(type);
        }
    };
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
    UIHelper.prototype.addAnimComp = function (node, uiNode, bgNode, target) {
        if (node == null || uiNode == null) {
            Logger.error("node == null || uiNode == null");
            return null;
        }
        var animComp = this.safeGetComponent(node, "", UIAnimComponent_1.default);
        animComp.ui = uiNode;
        animComp.bg = bgNode;
        animComp.target = target;
        return animComp;
    };
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
    UIHelper.prototype.addScrollViewCarmackComp = function (scrollViewNode, itemNode, itemNodePadding, itemOffSet, item_setter_caller, item_setter) {
        var scrollViewCarmack = this.safeGetComponent(scrollViewNode, "", ScrollViewCarmack_1.default);
        scrollViewCarmack.itemPrefab = itemNode;
        scrollViewCarmack.item_setter_caller = item_setter_caller;
        scrollViewCarmack.item_setter = item_setter;
        scrollViewCarmack.itemNodePadding = itemNodePadding;
        scrollViewCarmack.itemOffset = itemOffSet;
        scrollViewCarmack.init();
        itemNode.active = false;
        // itemNode.destroy();
        return scrollViewCarmack;
    };
    /**添加跑马灯通用组件,必须挂载再遮罩节点上
     * @param {cc.Node} maskNode            脚本挂载节点.（锚点X必须是1）
     * @param {boolean} bAddDefaultMsg      是否添加默认消息（抵制不良游戏XXXXXXX）
     * @param {cc.Node} rootNode            跑马灯根节点（无消息时隐藏）
     * @returns {PaoMaDengComp}
    */
    UIHelper.prototype.addPaoMaDengComp = function (maskNode, bAddDefaultMsg, rootNode, ttf) {
        if (bAddDefaultMsg === void 0) { bAddDefaultMsg = false; }
        if (rootNode === void 0) { rootNode = null; }
        var paomadengComp = this.safeGetComponent(maskNode, "", PaoMaDengComp_1.default);
        if (rootNode != null) {
            paomadengComp.rootNode = rootNode;
        }
        paomadengComp.ttf = ttf;
        paomadengComp.init();
        if (bAddDefaultMsg) {
            paomadengComp.addDefautMsg();
        }
        return paomadengComp;
    };
    UIHelper.prototype.addNewPaoMaDengComp = function (rootNode, bAddDefaultMsg) {
        var _this = this;
        if (bAddDefaultMsg === void 0) { bAddDefaultMsg = false; }
        var resPath = "hall/prefabs/ui/PaoMaDengRootNode";
        var paoMaDengComp = null;
        Global.ResourceManager.loadRes(resPath, function (error, prefab) {
            if (error != null) {
                Logger.error("加载资源错误");
                return;
            }
            if (prefab == null) {
                return;
            }
            var ui = cc.instantiate(prefab);
            if (rootNode && rootNode.isValid) {
                rootNode.addChild(ui);
                ui.active = true;
            }
            paoMaDengComp = _this.safeGetComponent(ui, "", PaoMaDengCompNew_1.default);
            if (paoMaDengComp) {
                var poolLen = Global.Setting.SkinConfig.getPaomadengPoolLen();
                paoMaDengComp.initNode(poolLen);
                paoMaDengComp.run(bAddDefaultMsg);
            }
        });
        return paoMaDengComp;
    };
    UIHelper.prototype.marqueeShowNode = function (data, rootNode) {
        var _this = this;
        if (this.privateMarquee && this.privateMarquee.node) {
            this.privateMarquee.node.active = true;
            this.privateMarquee.showNode(data);
        }
        else {
            if (rootNode == null) {
                return;
            }
            var resPath = "hall/prefabs/ui/PrivateMarqueeNode";
            Global.ResourceManager.loadRes(resPath, function (error, prefab) {
                if (error != null) {
                    Logger.error("加载资源错误");
                    return;
                }
                if (prefab == null) {
                    return;
                }
                var copyNode = cc.instantiate(prefab);
                copyNode.setParent(rootNode);
                copyNode.active = true;
                _this.privateMarquee = _this.safeGetComponent(copyNode, "", PrivateMarqueeComp_1.default);
                _this.privateMarquee.node.active = true;
                _this.privateMarquee.showNode(data);
            });
        }
    };
    UIHelper.prototype.addPrivateMarqueeComp = function (rootNode) {
        var _this = this;
        if (rootNode == null) {
            return;
        }
        var resPath = "hall/prefabs/ui/PrivateMarqueeNode";
        Global.ResourceManager.loadRes(resPath, function (error, prefab) {
            if (error != null) {
                Logger.error("加载资源错误");
                return;
            }
            if (prefab == null) {
                return;
            }
            var copyNode = cc.instantiate(prefab);
            copyNode.setParent(rootNode);
            copyNode.active = true;
            _this.privateMarquee = _this.safeGetComponent(copyNode, "", PrivateMarqueeComp_1.default);
            _this.privateMarquee.node.active = false;
        });
    };
    /**
     * 添加信号通用组件
     * @param rootNode 脚本挂载节点
     * @param type 类型 （1：大厅 2：子游戏）
     */
    UIHelper.prototype.addWifiComp = function (rootNode, type) {
        var _this = this;
        if (type === void 0) { type = 2; }
        var resPath = "hall/prefabs/ui/wifiNode";
        Global.ResourceManager.loadRes(resPath, function (error, prefab) {
            if (error != null) {
                Logger.error("加载资源错误");
                return;
            }
            if (prefab == null) {
                return;
            }
            var ui = cc.instantiate(prefab);
            if (rootNode && rootNode.isValid) {
                rootNode.addChild(ui);
                ui.active = true;
            }
            var wifiComp = _this.safeGetComponent(ui, "", WifiComp_1.default);
            if (wifiComp) {
                wifiComp.init(type);
                wifiComp.startListen();
            }
        });
    };
    UIHelper.prototype.addAdmissionComp = function (rootNode) {
        var _this = this;
        var resPath = "hall/prefabs/ui/AdmissionBoxNode";
        Global.ResourceManager.loadRes(resPath, function (error, prefab) {
            if (error != null) {
                Logger.error("加载资源错误");
                return;
            }
            if (prefab == null) {
                return;
            }
            var ui = cc.instantiate(prefab);
            if (rootNode && rootNode.isValid) {
                rootNode.addChild(ui);
                ui.active = true;
            }
            var admissionComp = _this.safeGetComponent(ui, "", AdmissionBoxComp_1.default);
            if (admissionComp) {
                admissionComp.init();
            }
        });
    };
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
    UIHelper.prototype.addIntoGameAnimComp = function (rootNode, loadingNode, bottomNodeArr, topNodeArr, leftNodeArr, rightNodeArr, middleNodeArr, autoInit) {
        if (middleNodeArr === void 0) { middleNodeArr = []; }
        if (autoInit === void 0) { autoInit = true; }
        var intoGameAnimComp = this.getBriefIntoGameAnim(rootNode);
        intoGameAnimComp.loadingNode = loadingNode;
        intoGameAnimComp.bottomNodeArr = bottomNodeArr || [];
        intoGameAnimComp.topNodeArr = topNodeArr || [];
        intoGameAnimComp.leftNodeArr = leftNodeArr || [];
        intoGameAnimComp.rightNodeArr = rightNodeArr || [];
        intoGameAnimComp.middleNodeArr = middleNodeArr || [];
        if (autoInit)
            intoGameAnimComp.init();
        return intoGameAnimComp;
    };
    /**
     * 设置子游戏入场动画通用组件
     * @param rootNode
     */
    UIHelper.prototype.getBriefIntoGameAnim = function (rootNode) {
        if (!rootNode || !rootNode.isValid) {
            return Logger.error("挂载节点异常");
        }
        return this.safeGetComponent(rootNode, "", IntoGameAnimComp_1.default);
    };
    /**
     * 设置节点变暗或取消
     * @param {cc.Node} node            要置灰或取消置灰的节点
     * @param {boolean} bGray           是否置灰 false-取消置灰
     * @param {number} color            置灰的暗度，此值越小越黑,最大为255
    */
    UIHelper.prototype.setNodeGray = function (node, bGray, color, includeAllNode) {
        if (color === void 0) { color = 150; }
        if (includeAllNode === void 0) { includeAllNode = false; }
        var childSprites = node.getComponentsInChildren(cc.Sprite);
        childSprites.forEach(function (sprite) {
            if (sprite) {
                if (bGray) {
                    sprite.node.color = cc.color(color, color, color);
                    // sprite.setState(cc.Sprite.State.GRAY);
                }
                else {
                    sprite.node.color = cc.color(255, 255, 255);
                    // sprite.setState(cc.Sprite.State.NORMAL);
                }
            }
        });
        if (childSprites == null || childSprites.length == 0 || includeAllNode) {
            if (bGray) {
                node.color = cc.color(color, color, color);
                // sprite.setState(cc.Sprite.State.GRAY);
            }
            else {
                node.color = cc.color(255, 255, 255);
                // sprite.setState(cc.Sprite.State.NORMAL);
            }
            for (var i = 0; i < node.childrenCount; i++) {
                node.children[i].color = node.color;
            }
        }
    };
    /**
     * 获取一个抖动action
     * @param duration 抖动持续时间
     * @param offsetX x方向抖动偏移（幅度）
     * @param offsetY y方向
     */
    UIHelper.prototype.getScreenShakeAction = function (duration, offsetX, offsetY) {
        if (duration === void 0) { duration = 0.5; }
        if (offsetX === void 0) { offsetX = 10; }
        if (offsetY === void 0) { offsetY = 0; }
        return new ScreenShakeAction_1.default(duration, offsetX, offsetY);
    };
    /**
     * 给不规则节点添加触摸监听, 需要先挂载cc.PolygonCollider组件
     * @param polygon cc.PolygonCollider组件
     * 设置组件: Global.UIHelper.addPolygonButton(node.getComponent(cc.PolygonCollider));
     * 节点监听: node.on(cc.Node.EventType.TOUCH_END, this.onBoxClick, this);
     */
    UIHelper.prototype.addPolygonButton = function (polygon) {
        if (!polygon)
            throw TypeError("polygon is null or undefined");
        if (!(polygon instanceof cc.PolygonCollider))
            throw TypeError("polygon should be cc.PolygonCollider");
        this.safeGetComponent(polygon.node, "", "PolygonButtonHit");
    };
    UIHelper.prototype.getGameLoadingComp = function () {
        var _this = this;
        var path = "hall/prefabs/ui/GameLoading/GameLoadingComp";
        var prefab = Global.ResourceManager.getBundleRes("resources", path, cc.Prefab);
        if (!prefab) {
            Logger.error("error 未预加载GameLoadingComp prefab");
            return new Promise(function (resolve, reject) {
                Global.ResourceManager.loadBundleRes("resources", path, function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        var node = cc.instantiate(res);
                        var comp = _this.safeGetComponent(node, "", GameLoadingComp_1.default);
                        resolve(comp);
                    }
                });
            });
        }
        var copyNode = cc.instantiate(prefab);
        return this.safeGetComponent(copyNode, "", GameLoadingComp_1.default);
    };
    return UIHelper;
}());
exports.default = UIHelper;

cc._RF.pop();