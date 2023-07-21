
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/ermj/Ermj/scripts/manager/ErmjOutMjViewManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e57b7F1ZTdNuYoYooL4qPxK', 'ErmjOutMjViewManager');
// ermj/Ermj/scripts/manager/ErmjOutMjViewManager.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ErmjBasePool_1 = require("../tool/ErmjBasePool");
var ErmjMahjongOutView_1 = require("../subView/mahjong/ErmjMahjongOutView");
var ErmjPathHelper_1 = require("../data/ErmjPathHelper");
var ErmjGameConst_1 = require("../data/ErmjGameConst");
var ErmjOutMjViewManager = /** @class */ (function () {
    function ErmjOutMjViewManager(rootNode) {
        this.rootNode = rootNode;
        this.inUsedOutMjList = [];
        this.inUsedFlowerMjList = [];
        this.inUsedBrightMjList = [];
        this.inUsedWinMjList = [];
        this.rootNode.active = false;
        this.poolHelper = new ErmjOutMjViewPool(this.rootNode);
    }
    /** 获取用于亮牌麻将子 */
    ErmjOutMjViewManager.prototype.getOneBrightMj = function () {
        var item = this.poolHelper.getItem();
        this.inUsedBrightMjList.push(item);
        return item;
    };
    /** 获取用于花牌麻将子 */
    ErmjOutMjViewManager.prototype.getOneFlowerMj = function () {
        var item = this.poolHelper.getItem();
        this.inUsedFlowerMjList.push(item);
        return item;
    };
    /** 获取用于打出的麻将子 */
    ErmjOutMjViewManager.prototype.getOneOutMj = function () {
        var item = this.poolHelper.getItem();
        this.inUsedOutMjList.push(item);
        return item;
    };
    /** 获取用于胡牌的麻将子 */
    ErmjOutMjViewManager.prototype.getOneWinMj = function () {
        var item = this.poolHelper.getItem();
        this.inUsedWinMjList.push(item);
        return item;
    };
    /** 获取最后一次出牌麻将子 主要用于吃碰杠 */
    ErmjOutMjViewManager.prototype.getLastOutMj = function () {
        var count = this.inUsedOutMjList.length;
        return this.inUsedOutMjList[count - 1];
    };
    /** 获取最近一次胡牌展览麻将子 */
    ErmjOutMjViewManager.prototype.getLastWinMj = function () {
        var count = this.inUsedWinMjList.length;
        return this.inUsedWinMjList[count - 1];
    };
    /** 回收最后一次麻将子 */
    ErmjOutMjViewManager.prototype.recycleLastOutMj = function () {
        var mjItem = this.inUsedOutMjList.pop();
        this.poolHelper.recycleItem(mjItem);
    };
    ErmjOutMjViewManager.prototype.recycleOneOutMj = function (item) {
        // 作单个回收需要处理下, 从inUsedOutMjList中删除
        // 暂时用不上
    };
    /** 回收所有打出 补花出的麻将 */
    ErmjOutMjViewManager.prototype.clear = function () {
        this.poolHelper.recycleAll(this.inUsedOutMjList);
        this.inUsedOutMjList = [];
        this.poolHelper.recycleAll(this.inUsedFlowerMjList);
        this.inUsedFlowerMjList = [];
        this.poolHelper.recycleAll(this.inUsedBrightMjList);
        this.inUsedBrightMjList = [];
        this.poolHelper.recycleAll(this.inUsedWinMjList);
        this.inUsedWinMjList = [];
    };
    return ErmjOutMjViewManager;
}());
exports.default = ErmjOutMjViewManager;
var ErmjOutMjViewPool = /** @class */ (function (_super) {
    __extends(ErmjOutMjViewPool, _super);
    function ErmjOutMjViewPool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ErmjOutMjViewPool.prototype, "preCount", {
        get: function () {
            return 30;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ErmjOutMjViewPool.prototype, "everyCount", {
        get: function () {
            return 30;
        },
        enumerable: false,
        configurable: true
    });
    ErmjOutMjViewPool.prototype.createItem = function () {
        var prefab = Global.ResourceManager.getBundleRes(ErmjGameConst_1.default.Gid, ErmjPathHelper_1.default.gamePrefabsPath + "panel/mahjong/mahjongOutView", cc.Prefab);
        var node = cc.instantiate(prefab);
        var item = new ErmjMahjongOutView_1.default(node);
        return item;
    };
    ErmjOutMjViewPool.prototype.resetItem = function (item) {
        item.reset();
        item.node.setParent(this.root);
        item.active = false;
    };
    return ErmjOutMjViewPool;
}(ErmjBasePool_1.default));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZXJtalxcRXJtalxcc2NyaXB0c1xcbWFuYWdlclxcRXJtak91dE1qVmlld01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscURBQWdEO0FBQ2hELDRFQUF1RTtBQUN2RSx5REFBb0Q7QUFDcEQsdURBQWtEO0FBRWxEO0lBT0ksOEJBQW9CLFFBQWlCO1FBQWpCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFMN0Isb0JBQWUsR0FBeUIsRUFBRSxDQUFDO1FBQzNDLHVCQUFrQixHQUF5QixFQUFFLENBQUM7UUFDOUMsdUJBQWtCLEdBQXlCLEVBQUUsQ0FBQztRQUM5QyxvQkFBZSxHQUF5QixFQUFFLENBQUM7UUFHL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELGdCQUFnQjtJQUNULDZDQUFjLEdBQXJCO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxnQkFBZ0I7SUFDVCw2Q0FBYyxHQUFyQjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsaUJBQWlCO0lBQ1YsMENBQVcsR0FBbEI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxD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Q0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFDTCx3QkFBQztBQUFELENBckJBLEFBcUJDLENBckIrQixzQkFBWSxHQXFCM0MiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXJtakJhc2VQb29sIGZyb20gXCIuLi90b29sL0VybWpCYXNlUG9vbFwiO1xyXG5pbXBvcnQgRXJtak1haGpvbmdPdXRWaWV3IGZyb20gXCIuLi9zdWJWaWV3L21haGpvbmcvRXJtak1haGpvbmdPdXRWaWV3XCI7XHJcbmltcG9ydCBFcm1qUGF0aEhlbHBlciBmcm9tIFwiLi4vZGF0YS9Fcm1qUGF0aEhlbHBlclwiO1xyXG5pbXBvcnQgRXJtakdhbWVDb25zdCBmcm9tIFwiLi4vZGF0YS9Fcm1qR2FtZUNvbnN0XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFcm1qT3V0TWpWaWV3TWFuYWdlcntcclxuICAgIHByaXZhdGUgcG9vbEhlbHBlcjogRXJtak91dE1qVmlld1Bvb2w7XHJcbiAgICBwcml2YXRlIGluVXNlZE91dE1qTGlzdDogRXJtak1haGpvbmdPdXRWaWV3W10gPSBbXTtcclxuICAgIHByaXZhdGUgaW5Vc2VkRmxvd2VyTWpMaXN0OiBFcm1qTWFoam9uZ091dFZpZXdbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBpblVzZWRCcmlnaHRNakxpc3Q6IEVybWpNYWhqb25nT3V0Vmlld1tdID0gW107XHJcbiAgICBwcml2YXRlIGluVXNlZFdpbk1qTGlzdDogRXJtak1haGpvbmdPdXRWaWV3W10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvb3ROb2RlOiBjYy5Ob2RlKXtcclxuICAgICAgICB0aGlzLnJvb3ROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucG9vbEhlbHBlciA9IG5ldyBFcm1qT3V0TWpWaWV3UG9vbCh0aGlzLnJvb3ROb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6I635Y+W55So5LqO5Lqu54mM6bq75bCG5a2QICovXHJcbiAgICBwdWJsaWMgZ2V0T25lQnJpZ2h0TWooKXtcclxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMucG9vbEhlbHBlci5nZXRJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5pblVzZWRCcmlnaHRNakxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6I635Y+W55So5LqO6Iqx54mM6bq75bCG5a2QICovXHJcbiAgICBwdWJsaWMgZ2V0T25lRmxvd2VyTWooKXtcclxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMucG9vbEhlbHBlci5nZXRJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5pblVzZWRGbG93ZXJNakxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6I635Y+W55So5LqO5omT5Ye655qE6bq75bCG5a2QICovXHJcbiAgICBwdWJsaWMgZ2V0T25lT3V0TWooKXtcclxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMucG9vbEhlbHBlci5nZXRJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5pblVzZWRPdXRNakxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6I635Y+W55So5LqO6IOh54mM55qE6bq75bCG5a2QICovXHJcbiAgICBwdWJsaWMgZ2V0T25lV2luTWooKXtcclxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMucG9vbEhlbHBlci5nZXRJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5pblVzZWRXaW5Nakxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6I635Y+W5pyA5ZCO5LiA5qyh5Ye654mM6bq75bCG5a2QIOS4u+imgeeUqOS6juWQg+eisOadoCAqL1xyXG4gICAgcHVibGljIGdldExhc3RPdXRNaigpe1xyXG4gICAgICAgIGxldCBjb3VudCA9IHRoaXMuaW5Vc2VkT3V0TWpMaXN0Lmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gdGhpcy5pblVzZWRPdXRNakxpc3RbY291bnQgLSAxXTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog6I635Y+W5pyA6L+R5LiA5qyh6IOh54mM5bGV6KeI6bq75bCG5a2QICovXHJcbiAgICBwdWJsaWMgZ2V0TGFzdFdpbk1qKCl7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5pblVzZWRXaW5Nakxpc3QubGVuZ3RoO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmluVXNlZFdpbk1qTGlzdFtjb3VudCAtIDFdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlm57mlLbmnIDlkI7kuIDmrKHpurvlsIblrZAgKi9cclxuICAgIHB1YmxpYyByZWN5Y2xlTGFzdE91dE1qKCl7XHJcbiAgICAgICAgbGV0IG1qSXRlbSA9IHRoaXMuaW5Vc2VkT3V0TWpMaXN0LnBvcCgpO1xyXG4gICAgICAgIHRoaXMucG9vbEhlbHBlci5yZWN5Y2xlSXRlbShtakl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWN5Y2xlT25lT3V0TWooaXRlbTogRXJtak1haGpvbmdPdXRWaWV3KXtcclxuICAgICAgICAvLyDkvZzljZXkuKrlm57mlLbpnIDopoHlpITnkIbkuIssIOS7jmluVXNlZE91dE1qTGlzdOS4reWIoOmZpFxyXG4gICAgICAgIC8vIOaaguaXtueUqOS4jeS4ilxyXG4gICAgfSBcclxuXHJcbiAgICAvKiog5Zue5pS25omA5pyJ5omT5Ye6IOihpeiKseWHuueahOm6u+WwhiAqL1xyXG4gICAgcHVibGljIGNsZWFyKCl7XHJcbiAgICAgICAgdGhpcy5wb29sSGVscGVyLnJlY3ljbGVBbGwodGhpcy5pblVzZWRPdXRNakxpc3QpO1xyXG4gICAgICAgIHRoaXMuaW5Vc2VkT3V0TWpMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5wb29sSGVscGVyLnJlY3ljbGVBbGwodGhpcy5pblVzZWRGbG93ZXJNakxpc3QpO1xyXG4gICAgICAgIHRoaXMuaW5Vc2VkRmxvd2VyTWpMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5wb29sSGVscGVyLnJlY3ljbGVBbGwodGhpcy5pblVzZWRCcmlnaHRNakxpc3QpO1xyXG4gICAgICAgIHRoaXMuaW5Vc2VkQnJpZ2h0TWpMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5wb29sSGVscGVyLnJlY3ljbGVBbGwodGhpcy5pblVzZWRXaW5Nakxpc3QpO1xyXG4gICAgICAgIHRoaXMuaW5Vc2VkV2luTWpMaXN0ID0gW107XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEVybWpPdXRNalZpZXdQb29sIGV4dGVuZHMgRXJtakJhc2VQb29sPEVybWpNYWhqb25nT3V0Vmlldz57XHJcbiAgICBwcm90ZWN0ZWQgZ2V0IHByZUNvdW50KCl7XHJcbiAgICAgICAgcmV0dXJuIDMwO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBnZXQgZXZlcnlDb3VudCgpe1xyXG4gICAgICAgIHJldHVybiAzMDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlSXRlbSgpe1xyXG4gICAgICAgIGxldCBwcmVmYWIgPSBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmdldEJ1bmRsZVJlcyhFcm1qR2FtZUNvbnN0LkdpZCwgRXJtalBhdGhIZWxwZXIuZ2FtZVByZWZhYnNQYXRoICsgXCJwYW5lbC9tYWhqb25nL21haGpvbmdPdXRWaWV3XCIsIGNjLlByZWZhYik7XHJcbiAgICAgICAgbGV0IG5vZGUgPSA8Y2MuTm9kZT5jYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgIGxldCBpdGVtID0gbmV3IEVybWpNYWhqb25nT3V0Vmlldyhub2RlKTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVzZXRJdGVtKGl0ZW06IEVybWpNYWhqb25nT3V0Vmlldyl7XHJcbiAgICAgICAgaXRlbS5yZXNldCgpO1xyXG4gICAgICAgIGl0ZW0ubm9kZS5zZXRQYXJlbnQodGhpcy5yb290KTtcclxuICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59Il19