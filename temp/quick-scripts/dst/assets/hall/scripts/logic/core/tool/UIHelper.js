
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/UIHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXFVJSGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQTZDO0FBQzdDLGdFQUEyRDtBQUMzRCxvRUFBK0Q7QUFDL0QsNERBQXVEO0FBQ3ZELGtFQUE2RDtBQUM3RCxvRUFBK0Q7QUFDL0Qsa0RBQTZDO0FBRTdDLGdFQUEyRDtBQUMzRCxrRUFBNkQ7QUFDN0Qsc0VBQWlFO0FBRWpFLGtFQUE2RDtBQUU3RCxRQUFRO0FBQ1I7SUFBQTtRQTRLWSxtQkFBYyxHQUFHLElBQUksNEJBQWtCLEVBQUUsQ0FBQztJQXFOdEQsQ0FBQztJQWhZVSxpQ0FBYyxHQUFyQixVQUFzQixJQUFhLEVBQUUsSUFBWSxFQUFFLFFBQWtCLEVBQUUsTUFBWSxFQUFFLFVBQXVDLEVBQUUsSUFBYSxFQUFFLFNBQWdCO1FBQXhFLDJCQUFBLEVBQUEsYUFBYSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLO1FBQWlCLDBCQUFBLEVBQUEsZ0JBQWdCO1FBQ3pKLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0MsT0FBTztTQUNWO1FBRUQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsSUFBSSxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsWUFBWSxFQUFFLENBQUMsTUFBTSxJQUFJLFFBQVEsWUFBWSxrQkFBUSxDQUFDLEVBQUU7WUFDOUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBSSw4QkFBOEI7U0FDckU7UUFFRCxJ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OiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFlYQnV0dG9uIGZyb20gXCIuLi9jb21wb25lbnQvWVhCdXR0b25cIjtcclxuaW1wb3J0IFVJQW5pbUNvbXBvbmVudCBmcm9tIFwiLi4vY29tcG9uZW50L1VJQW5pbUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgU2Nyb2xsVmlld0Nhcm1hY2sgZnJvbSBcIi4uL2NvbXBvbmVudC9TY3JvbGxWaWV3Q2FybWFja1wiO1xyXG5pbXBvcnQgUGFvTWFEZW5nQ29tcCBmcm9tIFwiLi4vY29tcG9uZW50L1Bhb01hRGVuZ0NvbXBcIjtcclxuaW1wb3J0IEludG9HYW1lQW5pbUNvbXAgZnJvbSBcIi4uL2NvbXBvbmVudC9JbnRvR2FtZUFuaW1Db21wXCI7XHJcbmltcG9ydCBTY3JlZW5TaGFrZUFjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50L1NjcmVlblNoYWtlQWN0aW9uXCI7XHJcbmltcG9ydCBXaWZpQ29tcCBmcm9tIFwiLi4vY29tcG9uZW50L1dpZmlDb21wXCI7XHJcbmltcG9ydCBUYXNrQ29tcCBmcm9tIFwiLi4vY29tcG9uZW50L1Rhc2tDb21wXCI7XHJcbmltcG9ydCBHYW1lTG9hZGluZ0NvbXAgZnJvbSBcIi4uL2NvbXBvbmVudC9HYW1lTG9hZGluZ0NvbXBcIjtcclxuaW1wb3J0IEFkbWlzc2lvbkJveENvbXAgZnJvbSBcIi4uL2NvbXBvbmVudC9BZG1pc3Npb25Cb3hDb21wXCI7XHJcbmltcG9ydCBQcml2YXRlTWFycXVlZUNvbXAgZnJvbSBcIi4uL2NvbXBvbmVudC9Qcml2YXRlTWFycXVlZUNvbXBcIjtcclxuaW1wb3J0IEJ1dHRvblBsdXMgZnJvbSBcIi4uL2NvbXBvbmVudC9CdXR0b25QbHVzXCI7XHJcbmltcG9ydCBQYW9NYURlbmdDb21wTmV3IGZyb20gXCIuLi9jb21wb25lbnQvUGFvTWFEZW5nQ29tcE5ld1wiO1xyXG5cclxuLy9VSemAmueUqOaViOaenFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSUhlbHBlciB7XHJcbiAgICBwdWJsaWMgYWRkQ29tbW9uQ2xpY2socm9vdDogY2MuTm9kZSwgcGF0aDogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIHRhcmdldD86IGFueSwgdHJhbnNpdGlvbiA9IGNjLkJ1dHRvbi5UcmFuc2l0aW9uLlNDQUxFLCB0aW1lPzogbnVtYmVyLCBwbGF5U291bmQgPSB0cnVlKSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmdldENoaWxkKHJvb3QsIHBhdGgpO1xyXG4gICAgICAgIGlmIChub2RlID09IG51bGwpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiYWRkQ29tbW9uQ2xpY2sg5om+5LiN5Yiw6IqC54K5XCIsIHBhdGgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgY2NCdXR0b24gPSBub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgIGlmIChjY0J1dHRvbiAmJiAhKGNjQnV0dG9uIGluc3RhbmNlb2YgY2MuVG9nZ2xlIHx8IGNjQnV0dG9uIGluc3RhbmNlb2YgWVhCdXR0b24pKSB7XHJcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlQ29tcG9uZW50KGNjLkJ1dHRvbik7ICAgIC8vIOW3sue7j+a3u+WKoOeahOWwseenu+mZpOaOiSwg6Ziy5q2i5pyJ5Lqb6IqC54K56YeN5aSN5Yqg5LqGQnV0dG9uXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYnRuID0gbm9kZS5nZXRDb21wb25lbnQoWVhCdXR0b24pO1xyXG4gICAgICAgIGlmIChidG4gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBidG4gPSBub2RlLmFkZENvbXBvbmVudChZWEJ1dHRvbik7XHJcbiAgICAgICAgICAgIGJ0bi50cmFuc2l0aW9uID0gdHJhbnNpdGlvbjtcclxuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb24gPT0gY2MuQnV0dG9uLlRyYW5zaXRpb24uU0NBTEUpIHtcclxuICAgICAgICAgICAgICAgIGJ0bi56b29tU2NhbGUgPSAwLjg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5vZGUub24oXCJjbGlja1wiLCAodG91Y2hUYXJnZXQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGJ0bikge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFidG4uaXNDbGlja1ZhbGlkKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmICh0aW1lID09IG51bGwgfHwgdGltZSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWUgPSBidG4uQ0xJQ0tfSU5URVJWQUxcclxuICAgICAgICAgICAgICAgIGJ0bi5pc0NsaWNrVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJ0bi5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChidG4uaXNWYWxpZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmlzQ2xpY2tWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9LCBidG4uQ0xJQ0tfSU5URVJWQUwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5pKt5pS+5aOw6Z+zXHJcbiAgICAgICAgICAgIGlmIChwbGF5U291bmQpXHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuQXVkaW8ucGxheUJ0blNvdW5kKCk7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGFyZ2V0LCB0b3VjaFRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodG91Y2hUYXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2hpbGQobm9kZTogY2MuTm9kZSwgcGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKG5vZGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCJub2RlIGlzIG51bGxcIiwgcGF0aCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhdGggPT0gbnVsbCB8fCBwYXRoID09IFwiXCIpXHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIHJldHVybiBjYy5maW5kKHBhdGgsIG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb21wb25lbnQ8VCBleHRlbmRzIGNjLkNvbXBvbmVudD4obm9kZTogY2MuTm9kZSwgcGF0aDogc3RyaW5nLCB0eXBlOiB7IHByb3RvdHlwZTogVCB9KTogVDtcclxuICAgIHB1YmxpYyBnZXRDb21wb25lbnQobm9kZTogY2MuTm9kZSwgcGF0aDogc3RyaW5nLCB0eXBlOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLmdldENoaWxkKG5vZGUsIHBhdGgpO1xyXG4gICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldC5nZXRDb21wb25lbnQodHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNhZmVHZXRDb21wb25lbnQobm9kZTogY2MuTm9kZSwgcGF0aDogc3RyaW5nLCB0eXBlOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLmdldENoaWxkKG5vZGUsIHBhdGgpO1xyXG4gICAgICAgIGlmICh0YXJnZXQgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgbGV0IGNvbXAgPSB0YXJnZXQuZ2V0Q29tcG9uZW50KHR5cGUpO1xyXG4gICAgICAgIGlmIChjb21wICE9IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBjb21wO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0LmFkZENvbXBvbmVudCh0eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDnlYzpnaLlvLnnqpfnu4Tku7ZcclxuICAgICAqIOaUr+aMgeaOpeWPo+WSjOWbnuiwg+aWueW8j+inpuWPkeWKqOeUu+WujOaIkOWbnuiwg1xyXG4gICAgICogQHBhcmFtIHtjYy5Ob2RlfSBub2RlICAg6ISa5pys5oyC6L296IqC54K5IFxyXG4gICAgICogQHBhcmFtIHtjYy5Ob2RlfSB1aU5vZGUgIFVJ5Li76IqC54K5XHJcbiAgICAgKiBAcGFyYW0ge2NjLk5vZGV9IGJnTm9kZSAg6YCP5piO6YGu572p6IqC54K5XHJcbiAgICAgKiBAcGFyYW0ge0lBbmltV25kfSBbdGFyZ2V0XSBcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiBAbWVtYmVyb2YgVUlIZWxwZXJcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEFuaW1Db21wKG5vZGU6IGNjLk5vZGUsIHVpTm9kZTogY2MuTm9kZSwgYmdOb2RlOiBjYy5Ob2RlLCB0YXJnZXQ/OiBJQW5pbVduZCkge1xyXG4gICAgICAgIGlmIChub2RlID09IG51bGwgfHwgdWlOb2RlID09IG51bGwpIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwibm9kZSA9PSBudWxsIHx8IHVpTm9kZSA9PSBudWxsXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFuaW1Db21wOiBVSUFuaW1Db21wb25lbnQgPSB0aGlzLnNhZmVHZXRDb21wb25lbnQobm9kZSwgXCJcIiwgVUlBbmltQ29tcG9uZW50KTtcclxuICAgICAgICBhbmltQ29tcC51aSA9IHVpTm9kZTtcclxuICAgICAgICBhbmltQ29tcC5iZyA9IGJnTm9kZTtcclxuICAgICAgICBhbmltQ29tcC50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgcmV0dXJuIGFuaW1Db21wO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKnNjcm9sbHZpZXfoioLngrnmt7vliqDkvJjljJbnu4Tku7ZcclxuICAgICAqIEBwYXJhbSB7Y2MuTm9kZX0gc2Nyb2xsVmlld05vZGUgICAgICDohJrmnKzmjILovb3oioLngrkgXHJcbiAgICAgKiBAcGFyYW0ge2NjLk5vZGV9IGl0ZW1Ob2RlICAgICAgICAgICAg5rua5Yqo5YaF5a655a2Q6IqC54K5IFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGl0ZW1Ob2RlUGFkZGluZyAgICAgIOWtkOiKgueCueS5i+mXtOeahOmXtOmalOWDj+e0oOWAvFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGl0ZW1PZmZTZXQgICAgICAgICAg5a2Q6IqC54K555qE5YGP56e75YOP57Sg5YC877yI5a2Q6IqC54K555qE6ZSa54K55LiO5LiK6L6555WM55qE6Led56a75YOP57Sg77yJXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gaXRlbV9zZXR0ZXJfY2FsbGVyICAgICAg5a2Q6IqC54K555qE5pu05paw5Ye95pWw55qEdGhpc+WvueixoVxyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlbV9zZXR0ZXIgICAgICAgIOWtkOiKgueCueeahOabtOaWsOWHveaVsO+8jOWPguaVsOS4uihpdGVtOmNjLk5vZGUsIGluZGV4Om51bWJlcilcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMge1Njcm9sbFZpZXdDYXJtYWNrfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkU2Nyb2xsVmlld0Nhcm1hY2tDb21wKHNjcm9sbFZpZXdOb2RlOiBjYy5Ob2RlLCBpdGVtTm9kZTogY2MuTm9kZSwgaXRlbU5vZGVQYWRkaW5nOiBudW1iZXIsIGl0ZW1PZmZTZXQ6IG51bWJlciwgaXRlbV9zZXR0ZXJfY2FsbGVyOiBhbnksIGl0ZW1fc2V0dGVyOiAoaXRlbTogY2MuTm9kZSwgaW5kZXg6IG51bWJlciwgZGF0YTogYW55KSA9PiB2b2lkKTogU2Nyb2xsVmlld0Nhcm1hY2sge1xyXG5cclxuICAgICAgICBsZXQgc2Nyb2xsVmlld0Nhcm1hY2s6IFNjcm9sbFZpZXdDYXJtYWNrID0gdGhpcy5zYWZlR2V0Q29tcG9uZW50KHNjcm9sbFZpZXdOb2RlLCBcIlwiLCBTY3JvbGxWaWV3Q2FybWFjayk7XHJcbiAgICAgICAgc2Nyb2xsVmlld0Nhcm1hY2suaXRlbVByZWZhYiA9IGl0ZW1Ob2RlO1xyXG4gICAgICAgIHNjcm9sbFZpZXdDYXJtYWNrLml0ZW1fc2V0dGVyX2NhbGxlciA9IGl0ZW1fc2V0dGVyX2NhbGxlcjtcclxuICAgICAgICBzY3JvbGxWaWV3Q2FybWFjay5pdGVtX3NldHRlciA9IGl0ZW1fc2V0dGVyO1xyXG4gICAgICAgIHNjcm9sbFZpZXdDYXJtYWNrLml0ZW1Ob2RlUGFkZGluZyA9IGl0ZW1Ob2RlUGFkZGluZztcclxuICAgICAgICBzY3JvbGxWaWV3Q2FybWFjay5pdGVtT2Zmc2V0ID0gaXRlbU9mZlNldDtcclxuICAgICAgICBzY3JvbGxWaWV3Q2FybWFjay5pbml0KCk7XHJcbiAgICAgICAgaXRlbU5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gaXRlbU5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIHJldHVybiBzY3JvbGxWaWV3Q2FybWFjaztcclxuICAgIH1cclxuXHJcbiAgICAvKirmt7vliqDot5Hpqaznga/pgJrnlKjnu4Tku7Ys5b+F6aG75oyC6L295YaN6YGu572p6IqC54K55LiKIFxyXG4gICAgICogQHBhcmFtIHtjYy5Ob2RlfSBtYXNrTm9kZSAgICAgICAgICAgIOiEmuacrOaMgui9veiKgueCuS7vvIjplJrngrlY5b+F6aG75pivMe+8iVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBiQWRkRGVmYXVsdE1zZyAgICAgIOaYr+WQpua3u+WKoOm7mOiupOa2iOaBr++8iOaKteWItuS4jeiJr+a4uOaIj1hYWFhYWFjvvIlcclxuICAgICAqIEBwYXJhbSB7Y2MuTm9kZX0gcm9vdE5vZGUgICAgICAgICAgICDot5Hpqaznga/moLnoioLngrnvvIjml6Dmtojmga/ml7bpmpDol4/vvIlcclxuICAgICAqIEByZXR1cm5zIHtQYW9NYURlbmdDb21wfVxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBhZGRQYW9NYURlbmdDb21wKG1hc2tOb2RlOiBjYy5Ob2RlLCBiQWRkRGVmYXVsdE1zZzogYm9vbGVhbiA9IGZhbHNlLCByb290Tm9kZTogY2MuTm9kZSA9IG51bGwsdHRmPzpjYy5Gb250KTogUGFvTWFEZW5nQ29tcCB7XHJcblxyXG4gICAgICAgIGxldCBwYW9tYWRlbmdDb21wOiBQYW9NYURlbmdDb21wID0gdGhpcy5zYWZlR2V0Q29tcG9uZW50KG1hc2tOb2RlLCBcIlwiLCBQYW9NYURlbmdDb21wKTtcclxuICAgICAgICBpZiAocm9vdE5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBwYW9tYWRlbmdDb21wLnJvb3ROb2RlID0gcm9vdE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhb21hZGVuZ0NvbXAudHRmPXR0ZjtcclxuICAgICAgICBwYW9tYWRlbmdDb21wLmluaXQoKTtcclxuICAgICAgICBpZiAoYkFkZERlZmF1bHRNc2cpIHtcclxuICAgICAgICAgICAgcGFvbWFkZW5nQ29tcC5hZGREZWZhdXRNc2coKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhb21hZGVuZ0NvbXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZE5ld1Bhb01hRGVuZ0NvbXAocm9vdE5vZGU6IGNjLk5vZGUsIGJBZGREZWZhdWx0TXNnOiBib29sZWFuID0gZmFsc2UpOiBQYW9NYURlbmdDb21wTmV3IHtcclxuXHJcbiAgICAgICAgbGV0IHJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS9QYW9NYURlbmdSb290Tm9kZVwiO1xyXG4gICAgICAgIGxldCBwYW9NYURlbmdDb21wOiBQYW9NYURlbmdDb21wTmV3ID0gbnVsbFxyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZFJlcyhyZXNQYXRoLCAoZXJyb3IsIHByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5Yqg6L296LWE5rqQ6ZSZ6K+vXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJlZmFiID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdWkgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpXHJcbiAgICAgICAgICAgIGlmIChyb290Tm9kZSAmJiByb290Tm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICByb290Tm9kZS5hZGRDaGlsZCh1aSlcclxuICAgICAgICAgICAgICAgIHVpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYW9NYURlbmdDb21wID0gdGhpcy5zYWZlR2V0Q29tcG9uZW50KHVpLCBcIlwiLCBQYW9NYURlbmdDb21wTmV3KTtcclxuICAgICAgICAgICAgaWYgKHBhb01hRGVuZ0NvbXApIHtcclxuICAgICAgICAgICAgICAgIGxldCBwb29sTGVuID0gR2xvYmFsLlNldHRpbmcuU2tpbkNvbmZpZy5nZXRQYW9tYWRlbmdQb29sTGVuKClcclxuICAgICAgICAgICAgICAgIHBhb01hRGVuZ0NvbXAuaW5pdE5vZGUocG9vbExlbilcclxuICAgICAgICAgICAgICAgIHBhb01hRGVuZ0NvbXAucnVuKGJBZGREZWZhdWx0TXNnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHBhb01hRGVuZ0NvbXA7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHByaXZhdGVNYXJxdWVlID0gbmV3IFByaXZhdGVNYXJxdWVlQ29tcCgpO1xyXG4gICAgcHVibGljIG1hcnF1ZWVTaG93Tm9kZShkYXRhLHJvb3ROb2RlKSB7XHJcbiAgICAgICAgaWYodGhpcy5wcml2YXRlTWFycXVlZSAmJiB0aGlzLnByaXZhdGVNYXJxdWVlLm5vZGUpe1xyXG4gICAgICAgICAgICB0aGlzLnByaXZhdGVNYXJxdWVlLm5vZGUuYWN0aXZlID10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnByaXZhdGVNYXJxdWVlLnNob3dOb2RlKGRhdGEpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZiAocm9vdE5vZGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCByZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvUHJpdmF0ZU1hcnF1ZWVOb2RlXCI7XHJcbiAgICAgICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZFJlcyhyZXNQYXRoLCAoZXJyb3IsIHByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZXJyb3IoXCLliqDovb3otYTmupDplJnor69cIilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwcmVmYWIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCBjb3B5Tm9kZSA9IDxjYy5Ob2RlPmNjLmluc3RhbnRpYXRlKHByZWZhYik7XHJcbiAgICAgICAgICAgICAgICBjb3B5Tm9kZS5zZXRQYXJlbnQocm9vdE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgY29weU5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJpdmF0ZU1hcnF1ZWUgPSB0aGlzLnNhZmVHZXRDb21wb25lbnQoY29weU5vZGUsIFwiXCIsIFByaXZhdGVNYXJxdWVlQ29tcCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByaXZhdGVNYXJxdWVlLm5vZGUuYWN0aXZlID10cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcml2YXRlTWFycXVlZS5zaG93Tm9kZShkYXRhKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkUHJpdmF0ZU1hcnF1ZWVDb21wKHJvb3ROb2RlOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgaWYgKHJvb3ROb2RlID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzUGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL1ByaXZhdGVNYXJxdWVlTm9kZVwiO1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZFJlcyhyZXNQYXRoLCAoZXJyb3IsIHByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5Yqg6L296LWE5rqQ6ZSZ6K+vXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJlZmFiID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgY29weU5vZGUgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICBjb3B5Tm9kZS5zZXRQYXJlbnQocm9vdE5vZGUpO1xyXG4gICAgICAgICAgICBjb3B5Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnByaXZhdGVNYXJxdWVlID0gdGhpcy5zYWZlR2V0Q29tcG9uZW50KGNvcHlOb2RlLCBcIlwiLCBQcml2YXRlTWFycXVlZUNvbXApO1xyXG4gICAgICAgICAgICB0aGlzLnByaXZhdGVNYXJxdWVlLm5vZGUuYWN0aXZlID1mYWxzZTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDkv6Hlj7fpgJrnlKjnu4Tku7ZcclxuICAgICAqIEBwYXJhbSByb290Tm9kZSDohJrmnKzmjILovb3oioLngrlcclxuICAgICAqIEBwYXJhbSB0eXBlIOexu+WeiyDvvIgx77ya5aSn5Y6FIDLvvJrlrZDmuLjmiI/vvIlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZFdpZmlDb21wKHJvb3ROb2RlOiBjYy5Ob2RlLCB0eXBlOiBudW1iZXIgPSAyKSB7XHJcbiAgICAgICAgbGV0IHJlc1BhdGggPSBcImhhbGwvcHJlZmFicy91aS93aWZpTm9kZVwiO1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZFJlcyhyZXNQYXRoLCAoZXJyb3IsIHByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5Yqg6L296LWE5rqQ6ZSZ6K+vXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJlZmFiID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdWkgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpXHJcbiAgICAgICAgICAgIGlmIChyb290Tm9kZSAmJiByb290Tm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICByb290Tm9kZS5hZGRDaGlsZCh1aSlcclxuICAgICAgICAgICAgICAgIHVpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgd2lmaUNvbXA6IFdpZmlDb21wID0gdGhpcy5zYWZlR2V0Q29tcG9uZW50KHVpLCBcIlwiLCBXaWZpQ29tcCk7XHJcbiAgICAgICAgICAgIGlmICh3aWZpQ29tcCkge1xyXG4gICAgICAgICAgICAgICAgd2lmaUNvbXAuaW5pdCh0eXBlKVxyXG4gICAgICAgICAgICAgICAgd2lmaUNvbXAuc3RhcnRMaXN0ZW4oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkQWRtaXNzaW9uQ29tcChyb290Tm9kZTogY2MuTm9kZSkge1xyXG4gICAgICAgIGxldCByZXNQYXRoID0gXCJoYWxsL3ByZWZhYnMvdWkvQWRtaXNzaW9uQm94Tm9kZVwiO1xyXG4gICAgICAgIEdsb2JhbC5SZXNvdXJjZU1hbmFnZXIubG9hZFJlcyhyZXNQYXRoLCAoZXJyb3IsIHByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5Yqg6L296LWE5rqQ6ZSZ6K+vXCIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJlZmFiID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgdWkgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpXHJcbiAgICAgICAgICAgIGlmIChyb290Tm9kZSAmJiByb290Tm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICByb290Tm9kZS5hZGRDaGlsZCh1aSlcclxuICAgICAgICAgICAgICAgIHVpLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgYWRtaXNzaW9uQ29tcDogQWRtaXNzaW9uQm94Q29tcCA9IHRoaXMuc2FmZUdldENvbXBvbmVudCh1aSwgXCJcIiwgQWRtaXNzaW9uQm94Q29tcCk7XHJcbiAgICAgICAgICAgIGlmIChhZG1pc3Npb25Db21wKSB7XHJcbiAgICAgICAgICAgICAgICBhZG1pc3Npb25Db21wLmluaXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5re75Yqg5a2Q5ri45oiP5YWl5Zy65Yqo55S76YCa55So57uE5Lu2XHJcbiAgICAgKiBAcGFyYW0ge2NjLk5vZGV9IHJvb3ROb2RlICAgICAgICAgICAg6ISa5pys5oyC6L296IqC54K5Lu+8iOW/hemhu+aYr1VJ5qC56IqC54K577yM5LiU5LiN6IO95pivbG9hZGluZ+mhtemdouiKgueCueeahOeItue6p++8iVxyXG4gICAgICogQHBhcmFtIHtjYy5Ob2RlfSBsb2FkaW5nTm9kZSAgICAgICAgIOWKoOi9vemhtemdouiKgueCuVxyXG4gICAgICogQHBhcmFtIHtjYy5Ob2RlfSBib3R0b21Ob2RlQXJyICAgICAgIOW6lemDqOWKqOeUu+iKgueCueaVsOe7hO+8iOetueeggeiDjOaZry0+6Ieq5bex55qE5aS05YOPLT7nrbnnoIHmjInpkq7vvInvvIzmjInliqjnlLvlhYjlkI7pobrluo/mjpLliJfvvIzmr4/kuKrlrZDmuLjmiI/kuI3kuIDmoLfvvIzlj6/oh6rooYzmjpLliJfnnIvmlYjmnpzvvIzlj6/kuLrnqbpcclxuICAgICAqIEBwYXJhbSB7Y2MuTm9kZX0gdG9wTm9kZUFyciAgICAgICAgICDpobbpg6jliqjnlLvoioLngrnmlbDnu4TvvIjotbDlir/lm74tPuS4i+aLieiPnOWNleaMiemSri0+6LWw5Yq/5oyJ6ZKu77yJ77yM5oyJ5Yqo55S75YWI5ZCO6aG65bqP5o6S5YiX77yM5q+P5Liq5a2Q5ri45oiP5LiN5LiA5qC377yM5Y+v6Ieq6KGM5o6S5YiX55yL5pWI5p6c77yM5Y+v5Li656m6XHJcbiAgICAgKiBAcGFyYW0ge2NjLk5vZGV9IGxlZnROb2RlQXJyICAgICAgICAg5bem6L655Yqo55S76IqC54K55pWw57uE77yI5aSn5a+M6LGq5Zyo5YaF55qEM+S4quWktOWDj++8ie+8jOaMieWKqOeUu+WFiOWQjumhuuW6j+aOkuWIl++8jOavj+S4quWtkOa4uOaIj+S4jeS4gOagt++8jOWPr+iHquihjOaOkuWIl+eci+aViOaenO+8jOWPr+S4uuepulxyXG4gICAgICogQHBhcmFtIHtjYy5Ob2RlfSByaWdodE5vZGVBcnIgICAgICAgIOWPs+i+ueWKqOeUu+iKgueCueaVsOe7hO+8iOaZuuWkmuaYn+WcqOWGheeahDPkuKrlpLTlg4/vvInvvIzmjInliqjnlLvlhYjlkI7pobrluo/mjpLliJfvvIzmr4/kuKrlrZDmuLjmiI/kuI3kuIDmoLfvvIzlj6/oh6rooYzmjpLliJfnnIvmlYjmnpzvvIzlj6/kuLrnqbpcclxuICAgICAqIEBwYXJhbSBhdXRvSW5pdCAgICAgICAgICAgICAgICAgICAgICDmmK/lkKboh6rliqjliJ3lp4vljJbjgIIgIOmAieWcuua4uOaIj+eUqFxyXG4gICAgICogQHJldHVybnMge0ludG9HYW1lQW5pbUNvbXB9XHJcbiAgICAqL1xyXG4gICAgcHVibGljIGFkZEludG9HYW1lQW5pbUNvbXAocm9vdE5vZGU6IGNjLk5vZGUsIGxvYWRpbmdOb2RlOiBjYy5Ob2RlLCBib3R0b21Ob2RlQXJyOiBjYy5Ob2RlW10sIHRvcE5vZGVBcnI6IGNjLk5vZGVbXSwgbGVmdE5vZGVBcnI6IGNjLk5vZGVbXSwgcmlnaHROb2RlQXJyOiBjYy5Ob2RlW10sIG1pZGRsZU5vZGVBcnI6IGNjLk5vZGVbXSA9IFtdLCBhdXRvSW5pdCA9IHRydWUpOiBJbnRvR2FtZUFuaW1Db21wIHtcclxuICAgICAgICBsZXQgaW50b0dhbWVBbmltQ29tcDogSW50b0dhbWVBbmltQ29tcCA9IHRoaXMuZ2V0QnJpZWZJbnRvR2FtZUFuaW0ocm9vdE5vZGUpO1xyXG4gICAgICAgIGludG9HYW1lQW5pbUNvbXAubG9hZGluZ05vZGUgPSBsb2FkaW5nTm9kZTtcclxuICAgICAgICBpbnRvR2FtZUFuaW1Db21wLmJvdHRvbU5vZGVBcnIgPSBib3R0b21Ob2RlQXJyIHx8IFtdO1xyXG4gICAgICAgIGludG9HYW1lQW5pbUNvbXAudG9wTm9kZUFyciA9IHRvcE5vZGVBcnIgfHwgW107XHJcbiAgICAgICAgaW50b0dhbWVBbmltQ29tcC5sZWZ0Tm9kZUFyciA9IGxlZnROb2RlQXJyIHx8IFtdO1xyXG4gICAgICAgIGludG9HYW1lQW5pbUNvbXAucmlnaHROb2RlQXJyID0gcmlnaHROb2RlQXJyIHx8IFtdO1xyXG4gICAgICAgIGludG9HYW1lQW5pbUNvbXAubWlkZGxlTm9kZUFyciA9IG1pZGRsZU5vZGVBcnIgfHwgW107XHJcbiAgICAgICAgaWYgKGF1dG9Jbml0KVxyXG4gICAgICAgICAgICBpbnRvR2FtZUFuaW1Db21wLmluaXQoKTtcclxuICAgICAgICByZXR1cm4gaW50b0dhbWVBbmltQ29tcDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruWtkOa4uOaIj+WFpeWcuuWKqOeUu+mAmueUqOe7hOS7tlxyXG4gICAgICogQHBhcmFtIHJvb3ROb2RlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0QnJpZWZJbnRvR2FtZUFuaW0ocm9vdE5vZGU6IGNjLk5vZGUpOiBJbnRvR2FtZUFuaW1Db21wIHtcclxuICAgICAgICBpZiAoIXJvb3ROb2RlIHx8ICFyb290Tm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBMb2dnZXIuZXJyb3IoXCLmjILovb3oioLngrnlvILluLhcIilcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2FmZUdldENvbXBvbmVudChyb290Tm9kZSwgXCJcIiwgSW50b0dhbWVBbmltQ29tcCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u6IqC54K55Y+Y5pqX5oiW5Y+W5raIXHJcbiAgICAgKiBAcGFyYW0ge2NjLk5vZGV9IG5vZGUgICAgICAgICAgICDopoHnva7ngbDmiJblj5bmtojnva7ngbDnmoToioLngrlcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYkdyYXkgICAgICAgICAgIOaYr+WQpue9rueBsCBmYWxzZS3lj5bmtojnva7ngbBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjb2xvciAgICAgICAgICAgIOe9rueBsOeahOaal+W6pu+8jOatpOWAvOi2iuWwj+i2ium7kSzmnIDlpKfkuLoyNTVcclxuICAgICovXHJcbiAgICBwdWJsaWMgc2V0Tm9kZUdyYXkobm9kZTogY2MuTm9kZSwgYkdyYXk6IGJvb2xlYW4sIGNvbG9yOiBudW1iZXIgPSAxNTAsIGluY2x1ZGVBbGxOb2RlID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2hpbGRTcHJpdGVzOiBjYy5TcHJpdGVbXSA9IG5vZGUuZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4oY2MuU3ByaXRlKTtcclxuICAgICAgICBjaGlsZFNwcml0ZXMuZm9yRWFjaChzcHJpdGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3ByaXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYkdyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGUubm9kZS5jb2xvciA9IGNjLmNvbG9yKGNvbG9yLCBjb2xvciwgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNwcml0ZS5zZXRTdGF0ZShjYy5TcHJpdGUuU3RhdGUuR1JBWSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZS5ub2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3ByaXRlLnNldFN0YXRlKGNjLlNwcml0ZS5TdGF0ZS5OT1JNQUwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGNoaWxkU3ByaXRlcyA9PSBudWxsIHx8IGNoaWxkU3ByaXRlcy5sZW5ndGggPT0gMCB8fCBpbmNsdWRlQWxsTm9kZSkge1xyXG4gICAgICAgICAgICBpZiAoYkdyYXkpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuY29sb3IgPSBjYy5jb2xvcihjb2xvciwgY29sb3IsIGNvbG9yKTtcclxuICAgICAgICAgICAgICAgIC8vIHNwcml0ZS5zZXRTdGF0ZShjYy5TcHJpdGUuU3RhdGUuR1JBWSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSk7XHJcbiAgICAgICAgICAgICAgICAvLyBzcHJpdGUuc2V0U3RhdGUoY2MuU3ByaXRlLlN0YXRlLk5PUk1BTCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW5baV0uY29sb3IgPSBub2RlLmNvbG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5LiA5Liq5oqW5YqoYWN0aW9uXHJcbiAgICAgKiBAcGFyYW0gZHVyYXRpb24g5oqW5Yqo5oyB57ut5pe26Ze0XHJcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WCB45pa55ZCR5oqW5Yqo5YGP56e777yI5bmF5bqm77yJXHJcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WSB55pa55ZCRXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTY3JlZW5TaGFrZUFjdGlvbihkdXJhdGlvbjogbnVtYmVyID0gMC41LCBvZmZzZXRYOiBudW1iZXIgPSAxMCwgb2Zmc2V0WTogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgU2NyZWVuU2hha2VBY3Rpb24oZHVyYXRpb24sIG9mZnNldFgsIG9mZnNldFkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uZ5LiN6KeE5YiZ6IqC54K55re75Yqg6Kem5pG455uR5ZCsLCDpnIDopoHlhYjmjILovb1jYy5Qb2x5Z29uQ29sbGlkZXLnu4Tku7ZcclxuICAgICAqIEBwYXJhbSBwb2x5Z29uIGNjLlBvbHlnb25Db2xsaWRlcue7hOS7tlxyXG4gICAgICog6K6+572u57uE5Lu2OiBHbG9iYWwuVUlIZWxwZXIuYWRkUG9seWdvbkJ1dHRvbihub2RlLmdldENvbXBvbmVudChjYy5Qb2x5Z29uQ29sbGlkZXIpKTtcclxuICAgICAqIOiKgueCueebkeWQrDogbm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Cb3hDbGljaywgdGhpcyk7XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRQb2x5Z29uQnV0dG9uKHBvbHlnb246IGNjLlBvbHlnb25Db2xsaWRlcikge1xyXG4gICAgICAgIGlmICghcG9seWdvbilcclxuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKFwicG9seWdvbiBpcyBudWxsIG9yIHVuZGVmaW5lZFwiKTtcclxuXHJcbiAgICAgICAgaWYgKCEocG9seWdvbiBpbnN0YW5jZW9mIGNjLlBvbHlnb25Db2xsaWRlcikpXHJcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcihcInBvbHlnb24gc2hvdWxkIGJlIGNjLlBvbHlnb25Db2xsaWRlclwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5zYWZlR2V0Q29tcG9uZW50KHBvbHlnb24ubm9kZSwgXCJcIiwgXCJQb2x5Z29uQnV0dG9uSGl0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRHYW1lTG9hZGluZ0NvbXAoKXtcclxuICAgICAgICBsZXQgcGF0aCA9IFwiaGFsbC9wcmVmYWJzL3VpL0dhbWVMb2FkaW5nL0dhbWVMb2FkaW5nQ29tcFwiO1xyXG4gICAgICAgIGxldCBwcmVmYWIgPSBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdldEJ1bmRsZVJlcyhcInJlc291cmNlc1wiLCBwYXRoLCBjYy5QcmVmYWIpO1xyXG4gICAgICAgIGlmICghcHJlZmFiKSB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImVycm9yIOacqumihOWKoOi9vUdhbWVMb2FkaW5nQ29tcCBwcmVmYWJcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRCdW5kbGVSZXMoXCJyZXNvdXJjZXNcIiwgcGF0aCwgKGVyciwgcmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub2RlID0gPGNjLk5vZGU+Y2MuaW5zdGFudGlhdGUocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbXAgPSB0aGlzLnNhZmVHZXRDb21wb25lbnQobm9kZSwgXCJcIiwgR2FtZUxvYWRpbmdDb21wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjb21wKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29weU5vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNhZmVHZXRDb21wb25lbnQoY29weU5vZGUsIFwiXCIsIEdhbWVMb2FkaW5nQ29tcCk7XHJcbiAgICB9XHJcbn0iXX0=