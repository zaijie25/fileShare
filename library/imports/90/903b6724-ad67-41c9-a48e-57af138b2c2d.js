"use strict";
cc._RF.push(module, '903b6ckrWdByaSOV68Tiywt', 'PersisitHelpper');
// hall/scripts/logic/core/tool/PersisitHelpper.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//常驻节点工具类
var PersistHelper = /** @class */ (function () {
    function PersistHelper() {
        this.persistNodeMap = {};
    }
    PersistHelper.prototype.init = function () {
        if (this.persistNode != null)
            return;
        this.persistNode = new cc.Node("persistNode");
        var winSize = cc.winSize;
        this.persistNode.position = cc.v3(winSize.width * this.persistNode.anchorX, winSize.height * this.persistNode.anchorY);
        //cc.director.getScene().addChild(this.persistNode);
        //持久化节点必须在根节点  如果没有父节点会自动挂载到scene上
        cc.game.addPersistRootNode(this.persistNode);
        this.persistNode.active = false;
        this.poolNode = new cc.Node("persistPoolNode");
        this.persistNode.addChild(this.poolNode);
        this.poolNode.active = false;
        this.showNode = new cc.Node("alwaysShowNode");
        this.persistNode.addChild(this.showNode);
        this.showNode.active = true; // 常驻显示 用于展示
    };
    //挂载到常驻节点下，用于跨场景使用
    PersistHelper.prototype.saveToPool = function (key, node, alwaysShow) {
        if (alwaysShow === void 0) { alwaysShow = false; }
        if (this.persistNode == null || !this.persistNode.isValid) {
            Logger.error("invalid persitNode!!!");
            return;
        }
        if (this.persistNodeMap[key] == null)
            this.persistNodeMap[key] = [];
        var pool = this.persistNodeMap[key];
        pool.push(node);
        // node.removeFromParent(false);        // 会触发ondisable
        if (!alwaysShow)
            node.setParent(this.poolNode);
        else
            node.setParent(this.showNode);
    };
    PersistHelper.prototype.getFromPool = function (key) {
        if (this.persistNode == null || !this.persistNode.isValid) {
            Logger.error("invalid persitNode!!!");
            return;
        }
        var pool = this.persistNodeMap[key];
        if (pool == null)
            return null;
        while (pool.length > 0) {
            var node = pool.pop();
            if (node && node.isValid) {
                return node;
            }
        }
        return null;
    };
    PersistHelper.prototype.getPersistNode = function () {
        return this.persistNode;
    };
    /** 控制根节点展示 */
    PersistHelper.prototype.setState = function (tag) {
        if (this.persistNode) {
            this.persistNode.active = tag;
        }
        // if(this.poolNode)
        // {
        //     this.poolNode.active = tag
        // }
    };
    return PersistHelper;
}());
exports.default = PersistHelper;

cc._RF.pop();