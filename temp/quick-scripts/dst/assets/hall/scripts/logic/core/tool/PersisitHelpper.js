
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/tool/PersisitHelpper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXHRvb2xcXFBlcnNpc2l0SGVscHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVM7QUFDVDtJQUFBO1FBTVksbUJBQWMsR0FBRyxFQUFFLENBQUE7SUFpRi9CLENBQUM7SUEvRVUsNEJBQUksR0FBWDtRQUVJLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJO1lBQ3ZCLE9BQU87UUFDWCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5QyxJQUFJLE9BQU8sR0FBRSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFFLENBQUE7UUFDbkgsb0RBQW9EO1FBQ3BELGtDQUFrQztRQUNsQyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRTdCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFRLFlBQVk7SUFDcEQsQ0FBQztJQUVELGtCQUFrQjtJQUNYLGtDQUFVLEdBQWpCLFVBQWtCLEdBQVUsRUFBRSxJQUFZLEVBQUUsVUFBMkI7UUFBM0IsMkJBQUEsRUFBQSxrQkFBMkI7UUFFbkUsSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUN4RDtZQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUN0QyxPQUFPO1NBQ1Y7UUFDRCxJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSTtZQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEIsdURBQXVEO1FBQ3ZELElBQUksQ0FBQyxVQUFVO1lBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O1lBRTlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxtQ0FBVyxHQUFsQixVQUFtQixHQUFVO1FBRXpCLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFDeEQ7WUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDdEMsT0FBTztTQUNWO1FBQ0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFHLElBQUksSUFBSSxJQUFJO1lBQ1gsT0FBTyxJQUFJLENBQUM7UUFDaEIsT0FBTSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDckI7WUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBRyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFDdkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLHNDQUFjLEdBQXJCO1FBRUksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFFRCxjQUFjO0lBQ1AsZ0NBQVEsR0FBZixVQUFnQixHQUFHO1FBRWYsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUNuQjtZQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtTQUNoQztRQUVELG9CQUFvQjtRQUNwQixJQUFJO1FBQ0osaUNBQWlDO1FBQ2pDLElBQUk7SUFFUixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQXZGQSxBQXVGQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy/luLjpqbvoioLngrnlt6XlhbfnsbtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVyc2lzdEhlbHBlclxyXG57XHJcbiAgICAvL+aMgeS5heWMluagueiKgueCuVxyXG4gICAgcHJpdmF0ZSBwZXJzaXN0Tm9kZTpjYy5Ob2RlO1xyXG4gICAgLy/liIflnLrmma/kuI3plIDmr4HnmoTmsaDoioLngrlcclxuICAgIHByaXZhdGUgcG9vbE5vZGU6Y2MuTm9kZTtcclxuICAgIHByaXZhdGUgcGVyc2lzdE5vZGVNYXAgPSB7fVxyXG4gICAgcHJpdmF0ZSBzaG93Tm9kZTogY2MuTm9kZTtcclxuICAgIHB1YmxpYyBpbml0KClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnBlcnNpc3ROb2RlICE9IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLnBlcnNpc3ROb2RlID0gbmV3IGNjLk5vZGUoXCJwZXJzaXN0Tm9kZVwiKTtcclxuICAgICAgICBsZXQgd2luU2l6ZT0gY2Mud2luU2l6ZTtcclxuICAgICAgICB0aGlzLnBlcnNpc3ROb2RlLnBvc2l0aW9uID0gY2MudjMod2luU2l6ZS53aWR0aCp0aGlzLnBlcnNpc3ROb2RlLmFuY2hvclgsIHdpblNpemUuaGVpZ2h0KnRoaXMucGVyc2lzdE5vZGUuYW5jaG9yWSwpXHJcbiAgICAgICAgLy9jYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmFkZENoaWxkKHRoaXMucGVyc2lzdE5vZGUpO1xyXG4gICAgICAgIC8v5oyB5LmF5YyW6IqC54K55b+F6aG75Zyo5qC56IqC54K5ICDlpoLmnpzmsqHmnInniLboioLngrnkvJroh6rliqjmjILovb3liLBzY2VuZeS4ilxyXG4gICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMucGVyc2lzdE5vZGUpO1xyXG4gICAgICAgIHRoaXMucGVyc2lzdE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wb29sTm9kZSA9IG5ldyBjYy5Ob2RlKFwicGVyc2lzdFBvb2xOb2RlXCIpO1xyXG4gICAgICAgIHRoaXMucGVyc2lzdE5vZGUuYWRkQ2hpbGQodGhpcy5wb29sTm9kZSk7XHJcbiAgICAgICAgdGhpcy5wb29sTm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5zaG93Tm9kZSA9IG5ldyBjYy5Ob2RlKFwiYWx3YXlzU2hvd05vZGVcIik7XHJcbiAgICAgICAgdGhpcy5wZXJzaXN0Tm9kZS5hZGRDaGlsZCh0aGlzLnNob3dOb2RlKTtcclxuICAgICAgICB0aGlzLnNob3dOb2RlLmFjdGl2ZSA9IHRydWU7ICAgICAgICAvLyDluLjpqbvmmL7npLog55So5LqO5bGV56S6XHJcbiAgICB9XHJcblxyXG4gICAgLy/mjILovb3liLDluLjpqbvoioLngrnkuIvvvIznlKjkuo7ot6jlnLrmma/kvb/nlKhcclxuICAgIHB1YmxpYyBzYXZlVG9Qb29sKGtleTpzdHJpbmcsIG5vZGU6Y2MuTm9kZSwgYWx3YXlzU2hvdzogYm9vbGVhbiA9IGZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMucGVyc2lzdE5vZGUgPT0gbnVsbCB8fCAhdGhpcy5wZXJzaXN0Tm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwiaW52YWxpZCBwZXJzaXROb2RlISEhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMucGVyc2lzdE5vZGVNYXBba2V5XSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLnBlcnNpc3ROb2RlTWFwW2tleV0gPSBbXTtcclxuICAgICAgICBsZXQgcG9vbCA9IHRoaXMucGVyc2lzdE5vZGVNYXBba2V5XTtcclxuICAgICAgICBwb29sLnB1c2gobm9kZSk7XHJcbiAgICAgICAgLy8gbm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTsgICAgICAgIC8vIOS8muinpuWPkW9uZGlzYWJsZVxyXG4gICAgICAgIGlmICghYWx3YXlzU2hvdylcclxuICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQodGhpcy5wb29sTm9kZSk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLnNob3dOb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RnJvbVBvb2woa2V5OnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnBlcnNpc3ROb2RlID09IG51bGwgfHwgIXRoaXMucGVyc2lzdE5vZGUuaXNWYWxpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihcImludmFsaWQgcGVyc2l0Tm9kZSEhIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcG9vbCA9IHRoaXMucGVyc2lzdE5vZGVNYXBba2V5XTtcclxuICAgICAgICBpZihwb29sID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIHdoaWxlKHBvb2wubGVuZ3RoID4gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBub2RlID0gcG9vbC5wb3AoKTtcclxuICAgICAgICAgICAgaWYobm9kZSAmJiBub2RlLmlzVmFsaWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRQZXJzaXN0Tm9kZSgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGVyc2lzdE5vZGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKiDmjqfliLbmoLnoioLngrnlsZXnpLogKi9cclxuICAgIHB1YmxpYyBzZXRTdGF0ZSh0YWcpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5wZXJzaXN0Tm9kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucGVyc2lzdE5vZGUuYWN0aXZlID0gdGFnXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAvLyBpZih0aGlzLnBvb2xOb2RlKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5wb29sTm9kZS5hY3RpdmUgPSB0YWdcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iXX0=