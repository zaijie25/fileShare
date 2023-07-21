
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/AdmissionBoxComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0c44fwijq1DkosfirUgz+yR', 'AdmissionBoxComp');
// hall/scripts/logic/core/component/AdmissionBoxComp.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PoolBase_1 = require("../tool/PoolBase");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AdmissionBoxComp = /** @class */ (function (_super) {
    __extends(AdmissionBoxComp, _super);
    function AdmissionBoxComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //当前是否播放入场通告
        _this.isPlaying = false;
        //轮询Timer
        _this.checkTimer = null;
        //消息缓存队列
        _this.msgDataCacheList = [];
        //消息队列缓存长度限制
        _this.listLengthLimit = 8;
        //所有优先级的总长度
        _this.totalLenghLimit = 10;
        return _this;
    }
    AdmissionBoxComp.prototype.onLoad = function () {
        this.showNode = cc.find("showNode", this.node);
        this.layout = cc.find("Layout", this.node);
        this.layout.active = false;
        this.node.opacity = 0;
        this.ItemPool = new copyPool(cc.find("pool", this.node), this.layout);
    };
    AdmissionBoxComp.prototype.updateUseInfo = function (str) {
        var lab = "</color><color=#00ff00>" + str + "</color><color=#ffffff>";
        return lab;
    };
    AdmissionBoxComp.prototype.init = function () {
        this.startTimer();
    };
    //界面销毁
    AdmissionBoxComp.prototype.onDestroy = function () {
        this.stopTimer();
    };
    AdmissionBoxComp.prototype.onEnable = function () {
        this.isPlaying = false;
        this.reset();
        this.startTimer();
    };
    AdmissionBoxComp.prototype.onDisable = function () {
        this.stopTimer();
    };
    AdmissionBoxComp.prototype.startTimer = function () {
        if (this.checkTimer == null) {
            this.checkTimer = setInterval(this.checkMsgList.bind(this), 100);
            Global.Event.on(GlobalEvent.VIPADMISSION, this, this.addMsgData);
        }
    };
    AdmissionBoxComp.prototype.stopTimer = function () {
        if (this.checkTimer) {
            Global.Event.off(GlobalEvent.VIPADMISSION, this, this.addMsgData);
            clearInterval(this.checkTimer);
            this.checkTimer = null;
        }
    };
    AdmissionBoxComp.prototype.reset = function () {
        this.node.stopAllActions();
        this.isPlaying = false;
    };
    AdmissionBoxComp.prototype.checkMsgList = function () {
        try {
            if (!this.node || !this.node.isValid)
                return;
            if (this.isPlaying)
                return;
            if (this.msgDataCacheList.length == 0) {
                this.node.opacity = 0;
                return;
            }
            var data = this.msgDataCacheList.shift();
            var msgStr = "";
            var msgVip = 0;
            if (data.nickname != null) {
                var name = data.name; //玩家名字
                var vip = data.vip; //玩家等级
                msgStr = this.updateUseInfo(name);
                msgVip = vip;
            }
            else {
                msgStr = data.name;
                msgVip = data.vip;
            }
            this.playAnim(true, msgVip, msgStr);
        }
        catch (error) {
        }
    };
    AdmissionBoxComp.prototype.playAnim = function (play, vip, name) {
        var _this = this;
        if (play) {
            var node_1 = this.getItem(vip, name);
            Global.Component.scheduleOnce(function () {
                _this.recoveryItem(node_1);
            }, 3);
            this.isPlaying = true;
            this.node.opacity = 255;
        }
    };
    /**
     * 新建一个预制体
     * @param vip
     * @param name
     */
    AdmissionBoxComp.prototype.getItem = function (vip, name) {
        var node = this.ItemPool.getItem();
        var vipSp = cc.find("vipSp", node).getComponent(cc.Sprite);
        var nameLab = cc.find("name", node).getComponent(cc.RichText);
        var vipSk1 = cc.find("vipsmall1", vipSp.node);
        var vipSk2 = cc.find("vipsmall2", vipSp.node);
        if (nameLab) {
            //设置richtext的属性
            nameLab.node.anchorX = 0;
            nameLab.node.anchorY = this.node.anchorY;
            nameLab.horizontalAlign = cc.macro.TextAlignment.LEFT;
            nameLab.fontSize = 26;
            nameLab.useSystemFont = true;
            nameLab.fontFamily = "Microsoft Yahei";
            nameLab.maxWidth = 0;
            nameLab.lineHeight = this.node.height;
            nameLab.handleTouchEvent = true;
            nameLab.string = name;
        }
        if (vipSp) {
            var atlasString = "hall/texture/admissionBox/admissionBox_Atlas";
            Global.ResourceManager.loadAutoAtlas(vipSp, atlasString, "v" + vip.toString(), null, false);
            if (vip >= 7 && vip < 10) {
                vipSk1.active = true;
            }
            else if (vip >= 10) {
                vipSk2.active = true;
            }
            else {
                vipSk1.active = false;
                vipSk2.active = false;
            }
        }
        node.y = 0;
        node.active = true;
        node.setParent(this.showNode);
        return node;
    };
    /**回收 */
    AdmissionBoxComp.prototype.recoveryItem = function (reitem) {
        reitem.active = false;
        this.isPlaying = false;
        this.ItemPool.recycleItem(reitem);
    };
    AdmissionBoxComp.prototype.addMsgData = function (msg) {
        this.addMsgItem(msg);
    };
    /**
     * 添加数据
     * @param data {
            msg,
            type,
     * }
     */
    AdmissionBoxComp.prototype.addMsgItem = function (data) {
        if (this.node == null || !this.node.isValid) {
            this.stopTimer();
            return;
        }
        //缓存数量大于10 任何消息都丢
        if (this.msgDataCacheList.length >= this.totalLenghLimit) {
            return;
        }
        //当数据大于8时，优先插入高优先级数据
        if (this.msgDataCacheList.length >= this.listLengthLimit) {
            if (data.clientPriority != null && data.clientPriority == 0 && data.nickname != null) {
                return;
            }
        }
        this.msgDataCacheList.push(data);
    };
    AdmissionBoxComp = __decorate([
        ccclass
    ], AdmissionBoxComp);
    return AdmissionBoxComp;
}(cc.Component));
exports.default = AdmissionBoxComp;
var copyPool = /** @class */ (function (_super) {
    __extends(copyPool, _super);
    function copyPool(rootNode, copyNode) {
        var _this = _super.call(this) || this;
        _this.rootNode = rootNode;
        _this.copyNode = copyNode;
        return _this;
    }
    Object.defineProperty(copyPool.prototype, "preCount", {
        get: function () {
            return 60;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(copyPool.prototype, "everyCount", {
        get: function () {
            return 30;
        },
        enumerable: false,
        configurable: true
    });
    copyPool.prototype.createItem = function () {
        var node = cc.instantiate(this.copyNode);
        node.active = true;
        return node;
    };
    copyPool.prototype.resetItem = function (node) {
        node.active = false;
        node.setParent(null);
    };
    copyPool.prototype.recycleAll = function (arr) {
        _super.prototype.recycleAll.call(this, arr);
    };
    return copyPool;
}(PoolBase_1.default));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcQWRtaXNzaW9uQm94Q29tcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2Q0FBd0M7QUFFbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBOEMsb0NBQVk7SUFBMUQ7UUFBQSxxRUE2TEM7UUExTEcsWUFBWTtRQUNKLGVBQVMsR0FBWSxLQUFLLENBQUM7UUFFbkMsU0FBUztRQUNELGdCQUFVLEdBQUcsSUFBSSxDQUFDO1FBRTFCLFFBQVE7UUFDQSxzQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDOUIsWUFBWTtRQUNKLHFCQUFlLEdBQUcsQ0FBQyxDQUFDO1FBRTVCLFdBQVc7UUFDSCxxQkFBZSxHQUFHLEVBQUUsQ0FBQzs7SUE4S2pDLENBQUM7SUF4S0csaUNBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3pFLENBQUM7SUFFRCx3Q0FBYSxHQUFiLFVBQWMsR0FBYTtRQUN2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QUMsU0FBUyxHQTZMekQ7a0JBN0xvQixnQkFBZ0I7QUErTHJDO0lBQXVCLDRCQUFRO0lBQzNCLGtCQUFvQixRQUFpQixFQUFVLFFBQWlCO1FBQWhFLFlBQ0ksaUJBQU8sU0FDVjtRQUZtQixjQUFRLEdBQVIsUUFBUSxDQUFTO1FBQVUsY0FBUSxHQUFSLFFBQVEsQ0FBUzs7SUFFaEUsQ0FBQztJQUNELHNCQUFjLDhCQUFRO2FBQXRCO1lBQ0ksT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDOzs7T0FBQTtJQUVELHNCQUFjLGdDQUFVO2FBQXhCO1lBQ0ksT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDOzs7T0FBQTtJQUVTLDZCQUFVLEdBQXBCO1FBQ0ksSUFBSSxJQUFJLEdBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVTLDRCQUFTLEdBQW5CLFVBQW9CLElBQWE7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ00sNkJBQVUsR0FBakIsVUFBa0IsR0FBZTtRQUM3QixpQkFBTSxVQUFVLFlBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNMLGVBQUM7QUFBRCxDQXpCQSxBQXlCQyxDQXpCc0Isa0JBQVEsR0F5QjlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVCYXNlUG9vbCBmcm9tIFwiLi4vdG9vbC9HYW1lQmFzZVBvb2xcIjtcclxuaW1wb3J0IFBvb2xCYXNlIGZyb20gXCIuLi90b29sL1Bvb2xCYXNlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWRtaXNzaW9uQm94Q29tcCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBwcml2YXRlIHNob3dOb2RlOiBjYy5Ob2RlO1xyXG5cclxuICAgIC8v5b2T5YmN5piv5ZCm5pKt5pS+5YWl5Zy66YCa5ZGKXHJcbiAgICBwcml2YXRlIGlzUGxheWluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8v6L2u6K+iVGltZXJcclxuICAgIHByaXZhdGUgY2hlY2tUaW1lciA9IG51bGw7XHJcblxyXG4gICAgLy/mtojmga/nvJPlrZjpmJ/liJdcclxuICAgIHByaXZhdGUgbXNnRGF0YUNhY2hlTGlzdCA9IFtdO1xyXG4gICAgLy/mtojmga/pmJ/liJfnvJPlrZjplb/luqbpmZDliLZcclxuICAgIHByaXZhdGUgbGlzdExlbmd0aExpbWl0ID0gODtcclxuXHJcbiAgICAvL+aJgOacieS8mOWFiOe6p+eahOaAu+mVv+W6plxyXG4gICAgcHJpdmF0ZSB0b3RhbExlbmdoTGltaXQgPSAxMDtcclxuXHJcbiAgICBwcml2YXRlIGxheW91dDogY2MuTm9kZTtcclxuXHJcbiAgICBwcml2YXRlIEl0ZW1Qb29sOiBjb3B5UG9vbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93Tm9kZSA9IGNjLmZpbmQoXCJzaG93Tm9kZVwiLCB0aGlzLm5vZGUpXHJcbiAgICAgICAgdGhpcy5sYXlvdXQgPSBjYy5maW5kKFwiTGF5b3V0XCIsIHRoaXMubm9kZSlcclxuICAgICAgICB0aGlzLmxheW91dC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy5JdGVtUG9vbCA9IG5ldyBjb3B5UG9vbChjYy5maW5kKFwicG9vbFwiLCB0aGlzLm5vZGUpLCB0aGlzLmxheW91dClcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVVc2VJbmZvKHN0cjogY2MuTGFiZWwpIHtcclxuICAgICAgICBsZXQgbGFiID0gXCI8L2NvbG9yPjxjb2xvcj0jMDBmZjAwPlwiICsgc3RyICsgXCI8L2NvbG9yPjxjb2xvcj0jZmZmZmZmPlwiXHJcbiAgICAgICAgcmV0dXJuIGxhYjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eVjOmdoumUgOavgVxyXG4gICAgcHJvdGVjdGVkIG9uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXNldCgpXHJcbiAgICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRUaW1lcigpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja1RpbWVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1RpbWVyID0gc2V0SW50ZXJ2YWwodGhpcy5jaGVja01zZ0xpc3QuYmluZCh0aGlzKSwgMTAwKTtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50LlZJUEFETUlTU0lPTiwgdGhpcywgdGhpcy5hZGRNc2dEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcFRpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrVGltZXIpIHtcclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50Lm9mZihHbG9iYWxFdmVudC5WSVBBRE1JU1NJT04sIHRoaXMsIHRoaXMuYWRkTXNnRGF0YSk7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5jaGVja1RpbWVyKTtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1RpbWVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrTXNnTGlzdCgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubm9kZSB8fCAhdGhpcy5ub2RlLmlzVmFsaWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUGxheWluZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubXNnRGF0YUNhY2hlTGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5tc2dEYXRhQ2FjaGVMaXN0LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIHZhciBtc2dTdHIgPSBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgbXNnVmlwID0gMDtcclxuICAgICAgICAgICAgaWYgKGRhdGEubmlja25hbWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBkYXRhLm5hbWU7Ly/njqnlrrblkI3lrZdcclxuICAgICAgICAgICAgICAgIGxldCB2aXAgPSBkYXRhLnZpcDsvL+eOqeWutuetiee6p1xyXG4gICAgICAgICAgICAgICAgbXNnU3RyID0gdGhpcy51cGRhdGVVc2VJbmZvKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgbXNnVmlwID0gdmlwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbXNnU3RyID0gZGF0YS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgbXNnVmlwID0gZGF0YS52aXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wbGF5QW5pbSh0cnVlLCBtc2dWaXAsIG1zZ1N0cik7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwbGF5QW5pbShwbGF5OiBib29sZWFuLCB2aXA6IG51bWJlciwgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHBsYXkpIHtcclxuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmdldEl0ZW0odmlwLCBuYW1lKVxyXG4gICAgICAgICAgICBHbG9iYWwuQ29tcG9uZW50LnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY292ZXJ5SXRlbShub2RlKVxyXG4gICAgICAgICAgICB9LCAzKVxyXG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaWsOW7uuS4gOS4qumihOWItuS9k1xyXG4gICAgICogQHBhcmFtIHZpcCBcclxuICAgICAqIEBwYXJhbSBuYW1lIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEl0ZW0odmlwOiBudW1iZXIsIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBub2RlID0gdGhpcy5JdGVtUG9vbC5nZXRJdGVtKCk7XHJcbiAgICAgICAgbGV0IHZpcFNwID0gY2MuZmluZChcInZpcFNwXCIsIG5vZGUpLmdldENvbXBvbmVudChjYy5TcHJpdGUpXHJcbiAgICAgICAgbGV0IG5hbWVMYWIgPSBjYy5maW5kKFwibmFtZVwiLCBub2RlKS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpXHJcbiAgICAgICAgbGV0IHZpcFNrMSA9IGNjLmZpbmQoXCJ2aXBzbWFsbDFcIiwgdmlwU3Aubm9kZSlcclxuICAgICAgICBsZXQgdmlwU2syID0gY2MuZmluZChcInZpcHNtYWxsMlwiLCB2aXBTcC5ub2RlKVxyXG4gICAgICAgIGlmIChuYW1lTGFiKSB7XHJcbiAgICAgICAgICAgIC8v6K6+572ucmljaHRleHTnmoTlsZ7mgKdcclxuICAgICAgICAgICAgbmFtZUxhYi5ub2RlLmFuY2hvclggPSAwO1xyXG4gICAgICAgICAgICBuYW1lTGFiLm5vZGUuYW5jaG9yWSA9IHRoaXMubm9kZS5hbmNob3JZO1xyXG4gICAgICAgICAgICBuYW1lTGFiLmhvcml6b250YWxBbGlnbiA9IGNjLm1hY3JvLlRleHRBbGlnbm1lbnQuTEVGVDtcclxuICAgICAgICAgICAgbmFtZUxhYi5mb250U2l6ZSA9IDI2O1xyXG4gICAgICAgICAgICBuYW1lTGFiLnVzZVN5c3RlbUZvbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICBuYW1lTGFiLmZvbnRGYW1pbHkgPSBcIk1pY3Jvc29mdCBZYWhlaVwiO1xyXG4gICAgICAgICAgICBuYW1lTGFiLm1heFdpZHRoID0gMDtcclxuICAgICAgICAgICAgbmFtZUxhYi5saW5lSGVpZ2h0ID0gdGhpcy5ub2RlLmhlaWdodDtcclxuICAgICAgICAgICAgbmFtZUxhYi5oYW5kbGVUb3VjaEV2ZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgbmFtZUxhYi5zdHJpbmcgPSBuYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmlwU3ApIHtcclxuICAgICAgICAgICAgdmFyIGF0bGFzU3RyaW5nID0gXCJoYWxsL3RleHR1cmUvYWRtaXNzaW9uQm94L2FkbWlzc2lvbkJveF9BdGxhc1wiO1xyXG4gICAgICAgICAgICBHbG9iYWwuUmVzb3VyY2VNYW5hZ2VyLmxvYWRBdXRvQXRsYXModmlwU3AsIGF0bGFzU3RyaW5nLCBcInZcIiArIHZpcC50b1N0cmluZygpLCBudWxsLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmICh2aXAgPj0gNyAmJiB2aXAgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgdmlwU2sxLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmlwID49IDEwKSB7XHJcbiAgICAgICAgICAgICAgICB2aXBTazIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZpcFNrMS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHZpcFNrMi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlLnkgPSAwO1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBub2RlLnNldFBhcmVudCh0aGlzLnNob3dOb2RlKVxyXG4gICAgICAgIHJldHVybiBub2RlXHJcbiAgICB9XHJcblxyXG4gICAgLyoq5Zue5pS2ICovXHJcbiAgICBwcml2YXRlIHJlY292ZXJ5SXRlbShyZWl0ZW06IGNjLk5vZGUpIHtcclxuICAgICAgICByZWl0ZW0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkl0ZW1Qb29sLnJlY3ljbGVJdGVtKHJlaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRNc2dEYXRhKG1zZzogYW55KSB7XHJcbiAgICAgICAgdGhpcy5hZGRNc2dJdGVtKG1zZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDmlbDmja5cclxuICAgICAqIEBwYXJhbSBkYXRhIHtcclxuICAgICAgICAgICAgbXNnLFxyXG4gICAgICAgICAgICB0eXBlLFxyXG4gICAgICogfVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYWRkTXNnSXRlbShkYXRhOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlID09IG51bGwgfHwgIXRoaXMubm9kZS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nvJPlrZjmlbDph4/lpKfkuo4xMCDku7vkvZXmtojmga/pg73kuKJcclxuICAgICAgICBpZiAodGhpcy5tc2dEYXRhQ2FjaGVMaXN0Lmxlbmd0aCA+PSB0aGlzLnRvdGFsTGVuZ2hMaW1pdCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5b2T5pWw5o2u5aSn5LqOOOaXtu+8jOS8mOWFiOaPkuWFpemrmOS8mOWFiOe6p+aVsOaNrlxyXG4gICAgICAgIGlmICh0aGlzLm1zZ0RhdGFDYWNoZUxpc3QubGVuZ3RoID49IHRoaXMubGlzdExlbmd0aExpbWl0KSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmNsaWVudFByaW9yaXR5ICE9IG51bGwgJiYgZGF0YS5jbGllbnRQcmlvcml0eSA9PSAwICYmIGRhdGEubmlja25hbWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXNnRGF0YUNhY2hlTGlzdC5wdXNoKGRhdGEpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBjb3B5UG9vbCBleHRlbmRzIFBvb2xCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm9vdE5vZGU6IGNjLk5vZGUsIHByaXZhdGUgY29weU5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldCBwcmVDb3VudCgpIHtcclxuICAgICAgICByZXR1cm4gNjA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGdldCBldmVyeUNvdW50KCkge1xyXG4gICAgICAgIHJldHVybiAzMDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlSXRlbSgpIHtcclxuICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY29weU5vZGUpO1xyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVzZXRJdGVtKG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIG5vZGUuc2V0UGFyZW50KG51bGwpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlY3ljbGVBbGwoYXJyOiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgc3VwZXIucmVjeWNsZUFsbChhcnIpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==