
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/PaoMaDengCompNew.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '709ffQ/cDdJybGP/Fjf1HoE', 'PaoMaDengCompNew');
// hall/scripts/logic/core/component/PaoMaDengCompNew.ts

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
exports.PaoMaDengMsgTemp = void 0;
var PoolBase_1 = require("../tool/PoolBase");
var PaoMaDengItem_1 = require("./PaoMaDengItem");
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**跑马灯通用组件 */
var PaoMaDengCompNew = /** @class */ (function (_super) {
    __extends(PaoMaDengCompNew, _super);
    function PaoMaDengCompNew() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 根节点，无消息时隐藏
         */
        _this.rootNode = null;
        _this.itemPool = null;
        _this.nodeList = [];
        _this.nodePoolLen = 3;
        _this.startPos = cc.v2(1170, 260);
        _this.currentUsedPaoMaDeng = [];
        //轮询Timer
        _this.checkTimer = null;
        //消息缓存队列
        _this.msgDataCacheList = [];
        //消息队列缓存长度限制
        _this.listLengthLimit = 8;
        //所有优先级的总长度
        _this.totalLenghLimit = 10;
        //跑马灯遮罩宽度
        _this.boxLength = 600;
        //跑马灯速度
        _this.baseSpeed = 120;
        return _this;
    }
    PaoMaDengCompNew.prototype.initNode = function (poolCount) {
        this.nodePoolLen = poolCount;
        this.copyNode = this.node.getChildByName("PaoMaDengBoxItem");
        this.poolNode = this.node.getChildByName("poolNode");
        if (!cc.isValid(this.copyNode)) {
            return;
        }
        this.copyNode.active = false;
        this.itemPool = new PaoMaDengItemPool(this.copyNode);
        for (var index = 0; index < this.nodePoolLen; index++) {
            var item = this.itemPool.getItem();
            if (cc.isValid(item)) {
                item.setPosition(this.startPos);
                this.poolNode.addChild(item);
                this.nodeList.push(item);
            }
        }
        this.itemPool.recycleAll(this.nodeList);
    };
    PaoMaDengCompNew.prototype.onLoad = function () {
        cc.game.on(cc.game.EVENT_HIDE, this.onHide, this);
        cc.game.on(cc.game.EVENT_SHOW, this.onResume, this);
    };
    PaoMaDengCompNew.prototype.onHide = function () {
        this.stopTimer();
        this.pause();
    };
    PaoMaDengCompNew.prototype.onResume = function () {
        this.startTimer();
        this.resume();
    };
    /**
     *
     * @param bAddDefaultMsg 是否添加默认跑马灯
     */
    PaoMaDengCompNew.prototype.run = function (bAddDefaultMsg) {
        if (bAddDefaultMsg) {
            this.addDefautMsg();
        }
        this.startTimer();
    };
    PaoMaDengCompNew.prototype.getPaoMaDengItem = function (msg) {
        var _this = this;
        var item = this.itemPool.getItem();
        if (cc.isValid(item)) {
            var itemComp = item.getComponent(PaoMaDengItem_1.default);
            this.currentUsedPaoMaDeng.push(itemComp);
            var callback_1 = function () {
                var itemNode = _this.currentUsedPaoMaDeng.shift();
                itemNode.recoveryItem(itemNode.playNode);
                _this.itemPool.recycleItem(itemNode.node);
            };
            if (itemComp) {
                var currentRunnig_1 = this.getCurrentRunning();
                this.currentUsedPaoMaDeng.forEach(function (element) {
                    if (element.isPlaying && currentRunnig_1 >= _this.nodePoolLen - 1) {
                        element.moveUp(callback_1);
                    }
                });
                itemComp.node.active = true;
                itemComp.run(msg, currentRunnig_1, this.nodePoolLen - 1);
            }
        }
    };
    /**
     * 获取当前正在使用的跑马灯数量
     */
    PaoMaDengCompNew.prototype.getCurrentRunning = function () {
        var count = 0;
        this.currentUsedPaoMaDeng.forEach(function (element) {
            if (element.isPlaying) {
                count += 1;
            }
        });
        return count;
    };
    //界面销毁
    PaoMaDengCompNew.prototype.onDestroy = function () {
        this.stopTimer();
        if (this.itemPool)
            this.itemPool.resetPool();
        this.nodeList = [];
        this.currentUsedPaoMaDeng = [];
        cc.game.off(cc.game.EVENT_HIDE, this.onHide, this);
        cc.game.off(cc.game.EVENT_SHOW, this.onResume, this);
    };
    PaoMaDengCompNew.prototype.onEnable = function () {
        this.startTimer();
    };
    PaoMaDengCompNew.prototype.onDisable = function () {
        this.reset();
        this.stopTimer();
    };
    PaoMaDengCompNew.prototype.startTimer = function () {
        if (this.checkTimer == null) {
            this.checkTimer = setInterval(this.checkMsgList.bind(this), 1000);
            Global.Event.on(GlobalEvent.MARQUEESCROLL_COMMON, this, this.addMsgData);
            Global.Event.on(GlobalEvent.MARQUEESCROLL_BIGWINNER, this, this.addMsgData);
            Global.Event.on(GlobalEvent.MARQUEESCROLL_VIP, this, this.addPriorityMsgData);
            Global.Event.on(GlobalEvent.MARQUEESCROLL_COMMI, this, this.addPriorityMsgData);
        }
    };
    PaoMaDengCompNew.prototype.stopTimer = function () {
        if (this.checkTimer) {
            Global.Event.off(GlobalEvent.MARQUEESCROLL_COMMON, this, this.addMsgData);
            Global.Event.off(GlobalEvent.MARQUEESCROLL_BIGWINNER, this, this.addMsgData);
            Global.Event.off(GlobalEvent.MARQUEESCROLL_VIP, this, this.addPriorityMsgData);
            Global.Event.off(GlobalEvent.MARQUEESCROLL_COMMI, this, this.addPriorityMsgData);
            clearInterval(this.checkTimer);
            this.checkTimer = null;
        }
    };
    PaoMaDengCompNew.prototype.addPriorityMsgData = function (data) {
        if (this.node == null || !this.node.isValid) {
            this.stopTimer();
            return;
        }
        //缓存数量大于10 任何消息都丢
        if (this.msgDataCacheList.length >= this.totalLenghLimit) {
            this.msgDataCacheList.pop();
            this.msgDataCacheList.unshift(data.data);
            return;
        }
        this.msgDataCacheList.unshift(data.data);
    };
    /**
     * data ={  game_id: 1007
                game_level: "l0"
                game_rule: "default"
                headimg: "7"
                hitPoint: 5434000
                nickname: "鱼一直下"
        }
     */
    PaoMaDengCompNew.prototype.checkMsgList = function () {
        try {
            if (!this.node || !this.node.isValid)
                return;
            if (this.msgDataCacheList.length == 0)
                return;
            var data = this.msgDataCacheList.shift();
            this.getPaoMaDengItem(data);
        }
        catch (error) {
            //this.stopTimer();
            Logger.error(error);
        }
    };
    PaoMaDengCompNew.prototype.pause = function () {
        this.nodeList.forEach(function (item) {
            var paomadengItem = item.getComponent(PaoMaDengItem_1.default);
            if (paomadengItem && cc.isValid(paomadengItem.node)) {
                paomadengItem.node.pauseAllActions();
            }
        });
    };
    PaoMaDengCompNew.prototype.resume = function () {
        this.nodeList.forEach(function (item) {
            var paomadengItem = item.getComponent(PaoMaDengItem_1.default);
            if (paomadengItem && cc.isValid(paomadengItem.node)) {
                paomadengItem.node.resumeAllActions();
            }
        });
    };
    PaoMaDengCompNew.prototype.reset = function () {
        var _this = this;
        this.currentUsedPaoMaDeng = [];
        this.nodeList.forEach(function (item) {
            var paomadengItem = item.getComponent(PaoMaDengItem_1.default);
            if (paomadengItem) {
                paomadengItem.recoveryItem(paomadengItem.playNode);
                _this.itemPool.recycleItem(paomadengItem.node);
            }
        });
    };
    /**
     * 排序方法,子类可重写
     * @param dataA
     * @param dataB
     */
    PaoMaDengCompNew.prototype.dataSortFunc = function (dataA, dataB) {
        return dataA.type - dataB.type;
    };
    /**
     * 添加跑马灯数据
     * @param data {
            msg,
            type,
     * }
     */
    PaoMaDengCompNew.prototype.addMsgItem = function (data) {
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
    PaoMaDengCompNew.prototype.addDefautMsg = function () {
        var msgList = [
            { msg: PaoMaDengMsgTemp.Welcome, type: 1 },
            { msg: PaoMaDengMsgTemp.TipBadGame, type: 1 },
            { msg: PaoMaDengMsgTemp.NoWallow, type: 1 },
        ];
        for (var index = 0; index < msgList.length; index++) {
            var data = msgList[index];
            this.addMsgItem(data);
        }
    };
    /**
     * @param msg {
                type : 20001,
                data : {
                    type : 0 ,
                    msg : "<color=#FF0000>TestData!!!!!!!!!!!!!!</color>"
                },
            }
     */
    PaoMaDengCompNew.prototype.addMsgData = function (msg) {
        if (msg.data.game_id) {
            var gameInfo = Global.GameData.getGameInfo(msg.data.game_id);
            if (gameInfo.status != 1) {
                return;
            }
            if (!gameInfo || gameInfo.name == null) {
                Logger.error("找不到gameid", msg.data.game_id);
                return;
            }
        }
        this.addMsgItem(msg.data);
    };
    PaoMaDengCompNew = __decorate([
        ccclass
    ], PaoMaDengCompNew);
    return PaoMaDengCompNew;
}(cc.Component));
exports.default = PaoMaDengCompNew;
var PaoMaDengItemPool = /** @class */ (function (_super) {
    __extends(PaoMaDengItemPool, _super);
    function PaoMaDengItemPool(copyNode) {
        var _this = _super.call(this) || this;
        _this.copyNode = copyNode;
        return _this;
    }
    PaoMaDengItemPool.prototype.createItem = function () {
        return cc.instantiate(this.copyNode);
    };
    PaoMaDengItemPool.prototype.resetItem = function (node) {
        node.stopAllActions();
        node.active = false;
    };
    PaoMaDengItemPool.prototype.recycleAll = function (arr) {
        var _this = this;
        _super.prototype.recycleAll.call(this, arr);
        arr.forEach(function (ele) {
            _this.resetItem(ele);
        });
    };
    return PaoMaDengItemPool;
}(PoolBase_1.default));
var PaoMaDengMsgTemp;
(function (PaoMaDengMsgTemp) {
    PaoMaDengMsgTemp["Welcome"] = "\u5C0A\u656C\u7684\u73A9\u5BB6\uFF0C\u6B22\u8FCE\u8FDB\u5165\u6E38\u620F\u5927\u5385\uFF01";
    PaoMaDengMsgTemp["TipBadGame"] = "\u62B5\u5236\u4E0D\u826F\u6E38\u620F\uFF0C\u62D2\u7EDD\u76D7\u7248\u6E38\u620F\uFF0C\u6CE8\u610F\u81EA\u8EAB\u4FDD\u62A4\uFF0C\u8C28\u9632\u4E0A\u5F53\u53D7\u9A97";
    PaoMaDengMsgTemp["NoWallow"] = "\u9002\u5EA6\u6E38\u620F\u76CA\u8111\uFF0C\u6C89\u8FF7\u6E38\u620F\u4F24\u8EAB\uFF0C\u5408\u7406\u5B89\u6392\u65F6\u95F4\uFF0C\u4EAB\u53D7\u5065\u5EB7\u751F\u6D3B";
})(PaoMaDengMsgTemp = exports.PaoMaDengMsgTemp || (exports.PaoMaDengMsgTemp = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcUGFvTWFEZW5nQ29tcE5ldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNkNBQXdDO0FBQ3hDLGlEQUE0QztBQUU1QyxvQkFBb0I7QUFDcEIsa0ZBQWtGO0FBQ2xGLHlGQUF5RjtBQUN6RixtQkFBbUI7QUFDbkIsNEZBQTRGO0FBQzVGLG1HQUFtRztBQUNuRyw4QkFBOEI7QUFDOUIsNEZBQTRGO0FBQzVGLG1HQUFtRztBQUU3RixJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QyxhQUFhO0FBRWI7SUFBOEMsb0NBQVk7SUFBMUQ7UUFBQSxxRUEyVkM7UUF4Vkc7O1dBRUc7UUFDSCxjQUFRLEdBQVksSUFBSSxDQUFDO1FBRWpCLGNBQVEsR0FBcUIsSUFBSSxDQUFBO1FBQ2pDLGNBQVEsR0FBRyxFQUFFLENBQUE7UUFFYixpQkFBVyxHQUFVLENBQUMsQ0FBQTtRQUV0QixjQUFRLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUE7UUFFMUIsMEJBQW9CLEdBQUcsRUFBRSxDQUFBO1FBZ0hqQyxTQUFTO1FBQ0QsZ0JBQVUsR0FBRyxJQUFJLENBQUM7UUFFMUIsUUFBUTtRQUNBLHNCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUM5QixZQUFZO1FBQ0oscUJBQWUsR0FBRyxDQUFDLENBQUM7UUFFNUIsV0FBVztRQUNILHFCQUFlLEdBQUcsRUFBRSxDQUFDO1FBRTdCLFNBQVM7UUFDRCxlQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLE9BQU87UUFDQyxlQUFTLEdBQUcsR0FBRyxDQUFDOztJQThNNUIsQ0FBQztJQTFVVSxtQ0FBUSxHQUFmLFVBQWdCLFNBQVM7UUFFckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUE7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBQzVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDcEQsSUFBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUM3QjtZQUNJLE9BQU07U0FDVDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQTtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3BELEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ25ELElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUE7WUFDMUMsSUFBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUNuQjtnQkFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtnQkFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQzNCO1NBQ0o7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFM0MsQ0FBQztJQUVELGlDQUFNLEdBQU47UUFFSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUdPLGlDQUFNLEdBQWQ7UUFFSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ2hCLENBQUM7SUFFTyxtQ0FBUSxHQUFoQjtRQUVJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDakIsQ0FBQztJQUVEOzs7T0FHRztJQUNILDhCQUFHLEdBQUgsVUFBSSxjQUFjO1FBRWQsSUFBRyxjQUFjLEVBQ2pCO1lBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBSXRCLENBQUM7SUFDTywyQ0FBZ0IsR0FBeEIsVUFBeUIsR0FBRztRQUE1QixpQkE2QkM7UUExQkcsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUMxQyxJQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQ25CO1lBRUksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBYSxDQUFDLENBQUE7WUFDL0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUN4QyxJQUFJLFVBQVEsR0FBRztnQkFDWCxJQUFJLFFBQVEsR0FBRyxLQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLENBQUE7Z0JBQ2hELFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUN4QyxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7WUFFNUMsQ0FBQyxDQUFBO1lBQ0QsSUFBRyxRQUFRLEVBQ1g7Z0JBQ0ksSUFBSSxlQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUE7Z0JBQzVDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO29CQUNyQyxJQUFHLE9BQU8sQ0FBQyxTQUFTLElBQUksZUFBYSxJQUFJLEtBQUksQ0FBQyxXQUFXLEdBQUUsQ0FBQyxFQUM1RDt3QkFDSSxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVEsQ0FBQyxDQUFBO3FCQUMzQjtnQkFFTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7Z0JBQzNCLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLGVBQWEsRUFBQyxJQUFJLENBQUMsV0FBVyxHQUFFLENBQUMsQ0FBQyxDQUFBO2FBQ3REO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSyw0Q0FBaUIsR0FBekI7UUFFSSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUE7UUFDYixJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztZQUNyQyxJQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQ3BCO2dCQUNJLEtBQUssSUFBSSxDQUFDLENBQUE7YUFDYjtRQUVMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUE7SUFFaEIsQ0FBQztJQXNCRCxNQUFNO0lBQ0ksb0NBQVMsR0FBbkI7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsUUFBUTtZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQTtRQUM5QixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELG9DQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDWixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUlELHFDQUFVLEdBQVY7UUFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRWxFLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pFLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzVFLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDOUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNuRjtJQUNMLENBQUM7SUFFRCxvQ0FBUyxHQUFUO1FBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdFLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDL0UsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUVqRixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELDZDQUFrQixHQUFsQixVQUFtQixJQUFJO1FBQ25CLElBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDMUM7WUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsT0FBTztTQUNWO1FBQ0QsaUJBQWlCO1FBQ2pCLElBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsZUFBZSxFQUN2RDtZQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN4QyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUU1QyxDQUFDO0lBSUQ7Ozs7Ozs7O09BUUc7SUFDSyx1Q0FBWSxHQUFwQjtRQUNJLElBQUk7WUFDQSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTztnQkFDaEMsT0FBTztZQUVYLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sSUFBSSxDQUFDO2dCQUFFLE9BQU87WUFDOUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUUvQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osbUJBQW1CO1lBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkI7SUFDTCxDQUFDO0lBRU8sZ0NBQUssR0FBYjtRQUVJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtZQUN2QixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUFhLENBQUMsQ0FBQTtZQUNwRCxJQUFHLGFBQWEsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFDbEQ7Z0JBQ0ksYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTthQUN2QztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVPLGlDQUFNLEdBQWQ7UUFFSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7WUFDdkIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBYSxDQUFDLENBQUE7WUFDcEQsSUFBRyxhQUFhLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQ2xEO2dCQUNJLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTthQUN4QztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUdPLGdDQUFLLEdBQWI7UUFBQSxpQkFVQztRQVRHLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLENBQUE7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQ3ZCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQWEsQ0FBQyxDQUFBO1lBQ3BELElBQUcsYUFBYSxFQUNoQjtnQkFDSSxhQUFhLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtnQkFDbEQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQ2hEO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLHVDQUFZLEdBQXRCLFVBQXVCLEtBQVUsRUFBRSxLQUFVO1FBQ3pDLE9BQU8sS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDTyxxQ0FBVSxHQUFwQixVQUFxQixJQUFTO1FBQzFCLElBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDMUM7WUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsT0FBTztTQUNWO1FBR0QsaUJBQWlCO1FBQ2pCLElBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsZUFBZSxFQUN2RDtZQUNJLE9BQU87U0FDVjtRQUVELG9CQUFvQjtRQUNwQixJQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGVBQWUsRUFDdkQ7WUFDSSxJQUFHLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUNuRjtnQkFDSSxPQUFPO2FBQ1Y7U0FDSjtRQUVELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLHVDQUFZLEdBQW5CO1FBQ0ksSUFBSSxPQUFPLEdBQUc7WUFDVixFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtZQUMxQyxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtZQUM3QyxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtTQUM5QyxDQUFBO1FBQ0QsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDakQsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSyxxQ0FBVSxHQUFsQixVQUFtQixHQUFRO1FBQ3ZCLElBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQ25CO1lBQ0ksSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3RCxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUN0QixPQUFNO2FBQ1Q7WUFDRCxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUNwQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QyxPQUFPO2FBQ1Y7U0FDSjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUF2VmdCLGdCQUFnQjtRQURwQyxPQUFPO09BQ2EsZ0JBQWdCLENBMlZwQztJQUFELHVCQUFDO0NBM1ZELEFBMlZDLENBM1Y2QyxFQUFFLENBQUMsU0FBUyxHQTJWekQ7a0JBM1ZvQixnQkFBZ0I7QUE0VnJDO0lBQWdDLHFDQUFRO0lBQ3BDLDJCQUFvQixRQUFpQjtRQUFyQyxZQUNJLGlCQUFPLFNBQ1Y7UUFGbUIsY0FBUSxHQUFSLFFBQVEsQ0FBUzs7SUFFckMsQ0FBQztJQUNTLHNDQUFVLEdBQXBCO1FBQ0ksT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRVMscUNBQVMsR0FBbkIsVUFBb0IsSUFBYTtRQUM3QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUNNLHNDQUFVLEdBQWpCLFVBQWtCLEdBQWU7UUFBakMsaUJBT0M7UUFMRyxpQkFBTSxVQUFVLFlBQUMsR0FBRyxDQUFDLENBQUE7UUFDckIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDWCxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FwQkEsQUFvQkMsQ0FwQitCLGtCQUFRLEdBb0J2QztBQUVELElBQVksZ0JBSVg7QUFKRCxXQUFZLGdCQUFnQjtJQUN4QiwwSEFBMkIsQ0FBQTtJQUMzQixxTUFBMEMsQ0FBQTtJQUMxQyxtTUFBd0MsQ0FBQTtBQUM1QyxDQUFDLEVBSlcsZ0JBQWdCLEdBQWhCLHdCQUFnQixLQUFoQix3QkFBZ0IsUUFJM0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBwSGVscGVyIGZyb20gXCIuLi90b29sL0FwcEhlbHBlclwiO1xyXG5pbXBvcnQgUG9vbEJhc2UgZnJvbSBcIi4uL3Rvb2wvUG9vbEJhc2VcIjtcclxuaW1wb3J0IFBhb01hRGVuZ0l0ZW0gZnJvbSBcIi4vUGFvTWFEZW5nSXRlbVwiO1xyXG5cclxuLy8gTGVhcm4gVHlwZVNjcmlwdDpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIFtDaGluZXNlXSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXHJcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxyXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcclxuLy8gIC0gW0NoaW5lc2VdIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuLyoq6LeR6ams54Gv6YCa55So57uE5Lu2ICovXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhb01hRGVuZ0NvbXBOZXcgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICBcclxuICAgIC8qKlxyXG4gICAgICog5qC56IqC54K577yM5peg5raI5oGv5pe26ZqQ6JePXHJcbiAgICAgKi9cclxuICAgIHJvb3ROb2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGl0ZW1Qb29sOlBhb01hRGVuZ0l0ZW1Qb29sID0gbnVsbFxyXG4gICAgcHJpdmF0ZSBub2RlTGlzdCA9IFtdXHJcbiAgICBwcml2YXRlIGNvcHlOb2RlOmNjLk5vZGVcclxuICAgIHByaXZhdGUgbm9kZVBvb2xMZW46bnVtYmVyID0gM1xyXG4gICAgcHJpdmF0ZSBwb29sTm9kZTpjYy5Ob2RlXHJcbiAgICBwcml2YXRlIHN0YXJ0UG9zID0gY2MudjIoMTE3MCwyNjApXHJcblxyXG4gICAgcHJpdmF0ZSBjdXJyZW50VXNlZFBhb01hRGVuZyA9IFtdXHJcblxyXG4gICAgcHVibGljIGluaXROb2RlKHBvb2xDb3VudClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm5vZGVQb29sTGVuID0gcG9vbENvdW50XHJcbiAgICAgICAgdGhpcy5jb3B5Tm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIlBhb01hRGVuZ0JveEl0ZW1cIilcclxuICAgICAgICB0aGlzLnBvb2xOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicG9vbE5vZGVcIilcclxuICAgICAgICBpZighY2MuaXNWYWxpZCh0aGlzLmNvcHlOb2RlKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvcHlOb2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5pdGVtUG9vbCA9IG5ldyBQYW9NYURlbmdJdGVtUG9vbCh0aGlzLmNvcHlOb2RlKVxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLm5vZGVQb29sTGVuOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtOmNjLk5vZGUgPSB0aGlzLml0ZW1Qb29sLmdldEl0ZW0oKSAgIFxyXG4gICAgICAgICAgICBpZihjYy5pc1ZhbGlkKGl0ZW0pKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNldFBvc2l0aW9uKHRoaXMuc3RhcnRQb3MpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvb2xOb2RlLmFkZENoaWxkKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVMaXN0LnB1c2goaXRlbSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLml0ZW1Qb29sLnJlY3ljbGVBbGwodGhpcy5ub2RlTGlzdClcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKClcclxuICAgIHtcclxuICAgICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfSElERSwgdGhpcy5vbkhpZGUsIHRoaXMpO1xyXG4gICAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9TSE9XLCB0aGlzLm9uUmVzdW1lLCB0aGlzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBvbkhpZGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgdGhpcy5wYXVzZSgpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblJlc3VtZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XHJcbiAgICAgICAgdGhpcy5yZXN1bWUoKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGJBZGREZWZhdWx0TXNnIOaYr+WQpua3u+WKoOm7mOiupOi3kemprOeBr1xyXG4gICAgICovXHJcbiAgICBydW4oYkFkZERlZmF1bHRNc2cpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoYkFkZERlZmF1bHRNc2cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFkZERlZmF1dE1zZygpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lcigpO1xyXG5cclxuICAgICAgXHJcblxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRQYW9NYURlbmdJdGVtKG1zZylcclxuICAgIHtcclxuXHJcbiAgICAgICAgbGV0IGl0ZW06Y2MuTm9kZSA9IHRoaXMuaXRlbVBvb2wuZ2V0SXRlbSgpXHJcbiAgICAgICAgaWYoY2MuaXNWYWxpZChpdGVtKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgaXRlbUNvbXAgPSBpdGVtLmdldENvbXBvbmVudChQYW9NYURlbmdJdGVtKVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VkUGFvTWFEZW5nLnB1c2goaXRlbUNvbXApXHJcbiAgICAgICAgICAgIGxldCBjYWxsYmFjayA9ICgpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbU5vZGUgPSB0aGlzLmN1cnJlbnRVc2VkUGFvTWFEZW5nLnNoaWZ0KClcclxuICAgICAgICAgICAgICAgIGl0ZW1Ob2RlLnJlY292ZXJ5SXRlbShpdGVtTm9kZS5wbGF5Tm9kZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbVBvb2wucmVjeWNsZUl0ZW0oaXRlbU5vZGUubm9kZSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaXRlbUNvbXApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UnVubmlnID0gdGhpcy5nZXRDdXJyZW50UnVubmluZygpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VkUGFvTWFEZW5nLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC5pc1BsYXlpbmcgJiYgY3VycmVudFJ1bm5pZyA+PSB0aGlzLm5vZGVQb29sTGVuIC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5tb3ZlVXAoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpdGVtQ29tcC5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIGl0ZW1Db21wLnJ1bihtc2csY3VycmVudFJ1bm5pZyx0aGlzLm5vZGVQb29sTGVuIC0xKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b2T5YmN5q2j5Zyo5L2/55So55qE6LeR6ams54Gv5pWw6YePXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q3VycmVudFJ1bm5pbmcoKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBjb3VudCA9IDBcclxuICAgICAgICB0aGlzLmN1cnJlbnRVc2VkUGFvTWFEZW5nLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGlmKGVsZW1lbnQuaXNQbGF5aW5nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb3VudFxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuICBcclxuICAgIC8v6L2u6K+iVGltZXJcclxuICAgIHByaXZhdGUgY2hlY2tUaW1lciA9IG51bGw7XHJcblxyXG4gICAgLy/mtojmga/nvJPlrZjpmJ/liJdcclxuICAgIHByaXZhdGUgbXNnRGF0YUNhY2hlTGlzdCA9IFtdO1xyXG4gICAgLy/mtojmga/pmJ/liJfnvJPlrZjplb/luqbpmZDliLZcclxuICAgIHByaXZhdGUgbGlzdExlbmd0aExpbWl0ID0gODtcclxuXHJcbiAgICAvL+aJgOacieS8mOWFiOe6p+eahOaAu+mVv+W6plxyXG4gICAgcHJpdmF0ZSB0b3RhbExlbmdoTGltaXQgPSAxMDtcclxuXHJcbiAgICAvL+i3kemprOeBr+mBrue9qeWuveW6plxyXG4gICAgcHJpdmF0ZSBib3hMZW5ndGggPSA2MDA7XHJcbiAgICAvL+i3kemprOeBr+mAn+W6plxyXG4gICAgcHJpdmF0ZSBiYXNlU3BlZWQgPSAxMjA7XHJcblxyXG5cclxuICAgIC8v55WM6Z2i6ZSA5q+BXHJcbiAgICBwcm90ZWN0ZWQgb25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbVBvb2wpXHJcbiAgICAgICAgICAgIHRoaXMuaXRlbVBvb2wucmVzZXRQb29sKClcclxuICAgICAgICB0aGlzLm5vZGVMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlZFBhb01hRGVuZyA9IFtdXHJcbiAgICAgICAgY2MuZ2FtZS5vZmYoY2MuZ2FtZS5FVkVOVF9ISURFLCB0aGlzLm9uSGlkZSwgdGhpcyk7XHJcbiAgICAgICAgY2MuZ2FtZS5vZmYoY2MuZ2FtZS5FVkVOVF9TSE9XLCB0aGlzLm9uUmVzdW1lLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldCgpXHJcbiAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHN0YXJ0VGltZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tUaW1lciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tUaW1lciA9IHNldEludGVydmFsKHRoaXMuY2hlY2tNc2dMaXN0LmJpbmQodGhpcyksIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgR2xvYmFsLkV2ZW50Lm9uKEdsb2JhbEV2ZW50Lk1BUlFVRUVTQ1JPTExfQ09NTU9OLCB0aGlzLCB0aGlzLmFkZE1zZ0RhdGEpO1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuTUFSUVVFRVNDUk9MTF9CSUdXSU5ORVIsIHRoaXMsIHRoaXMuYWRkTXNnRGF0YSk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5vbihHbG9iYWxFdmVudC5NQVJRVUVFU0NST0xMX1ZJUCwgdGhpcywgdGhpcy5hZGRQcmlvcml0eU1zZ0RhdGEpO1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQub24oR2xvYmFsRXZlbnQuTUFSUVVFRVNDUk9MTF9DT01NSSwgdGhpcywgdGhpcy5hZGRQcmlvcml0eU1zZ0RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdG9wVGltZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tUaW1lcikge1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50Lk1BUlFVRUVTQ1JPTExfQ09NTU9OLCB0aGlzLCB0aGlzLmFkZE1zZ0RhdGEpO1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50Lk1BUlFVRUVTQ1JPTExfQklHV0lOTkVSLCB0aGlzLCB0aGlzLmFkZE1zZ0RhdGEpO1xyXG4gICAgICAgICAgICBHbG9iYWwuRXZlbnQub2ZmKEdsb2JhbEV2ZW50Lk1BUlFVRUVTQ1JPTExfVklQLCB0aGlzLCB0aGlzLmFkZFByaW9yaXR5TXNnRGF0YSk7XHJcbiAgICAgICAgICAgIEdsb2JhbC5FdmVudC5vZmYoR2xvYmFsRXZlbnQuTUFSUVVFRVNDUk9MTF9DT01NSSwgdGhpcywgdGhpcy5hZGRQcmlvcml0eU1zZ0RhdGEpO1xyXG5cclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmNoZWNrVGltZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrVGltZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgYWRkUHJpb3JpdHlNc2dEYXRhKGRhdGEpIHtcclxuICAgICAgICBpZih0aGlzLm5vZGUgPT0gbnVsbCB8fCAhdGhpcy5ub2RlLmlzVmFsaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v57yT5a2Y5pWw6YeP5aSn5LqOMTAg5Lu75L2V5raI5oGv6YO95LiiXHJcbiAgICAgICAgaWYodGhpcy5tc2dEYXRhQ2FjaGVMaXN0Lmxlbmd0aCA+PSB0aGlzLnRvdGFsTGVuZ2hMaW1pdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubXNnRGF0YUNhY2hlTGlzdC5wb3AoKVxyXG4gICAgICAgICAgICB0aGlzLm1zZ0RhdGFDYWNoZUxpc3QudW5zaGlmdChkYXRhLmRhdGEpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tc2dEYXRhQ2FjaGVMaXN0LnVuc2hpZnQoZGF0YS5kYXRhKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIGRhdGEgPXsgIGdhbWVfaWQ6IDEwMDdcclxuICAgICAgICAgICAgICAgIGdhbWVfbGV2ZWw6IFwibDBcIlxyXG4gICAgICAgICAgICAgICAgZ2FtZV9ydWxlOiBcImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgaGVhZGltZzogXCI3XCJcclxuICAgICAgICAgICAgICAgIGhpdFBvaW50OiA1NDM0MDAwXHJcbiAgICAgICAgICAgICAgICBuaWNrbmFtZTogXCLpsbzkuIDnm7TkuItcIlxyXG4gICAgICAgIH1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVja01zZ0xpc3QoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm5vZGUgfHwgIXRoaXMubm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1zZ0RhdGFDYWNoZUxpc3QubGVuZ3RoID09IDApIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLm1zZ0RhdGFDYWNoZUxpc3Quc2hpZnQoKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRQYW9NYURlbmdJdGVtKGRhdGEpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5zdG9wVGltZXIoKTtcclxuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYXVzZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5ub2RlTGlzdC5mb3JFYWNoKChpdGVtKT0+e1xyXG4gICAgICAgICAgICBsZXQgcGFvbWFkZW5nSXRlbSA9IGl0ZW0uZ2V0Q29tcG9uZW50KFBhb01hRGVuZ0l0ZW0pXHJcbiAgICAgICAgICAgIGlmKHBhb21hZGVuZ0l0ZW0gJiYgY2MuaXNWYWxpZChwYW9tYWRlbmdJdGVtLm5vZGUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYW9tYWRlbmdJdGVtLm5vZGUucGF1c2VBbGxBY3Rpb25zKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXN1bWUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubm9kZUxpc3QuZm9yRWFjaCgoaXRlbSk9PntcclxuICAgICAgICAgICAgbGV0IHBhb21hZGVuZ0l0ZW0gPSBpdGVtLmdldENvbXBvbmVudChQYW9NYURlbmdJdGVtKVxyXG4gICAgICAgICAgICBpZihwYW9tYWRlbmdJdGVtICYmIGNjLmlzVmFsaWQocGFvbWFkZW5nSXRlbS5ub2RlKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGFvbWFkZW5nSXRlbS5ub2RlLnJlc3VtZUFsbEFjdGlvbnMoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSByZXNldCgpIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRVc2VkUGFvTWFEZW5nID0gW11cclxuICAgICAgICB0aGlzLm5vZGVMaXN0LmZvckVhY2goKGl0ZW0pPT57XHJcbiAgICAgICAgICAgIGxldCBwYW9tYWRlbmdJdGVtID0gaXRlbS5nZXRDb21wb25lbnQoUGFvTWFEZW5nSXRlbSlcclxuICAgICAgICAgICAgaWYocGFvbWFkZW5nSXRlbSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGFvbWFkZW5nSXRlbS5yZWNvdmVyeUl0ZW0ocGFvbWFkZW5nSXRlbS5wbGF5Tm9kZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbVBvb2wucmVjeWNsZUl0ZW0ocGFvbWFkZW5nSXRlbS5ub2RlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaOkuW6j+aWueazlSzlrZDnsbvlj6/ph43lhplcclxuICAgICAqIEBwYXJhbSBkYXRhQSBcclxuICAgICAqIEBwYXJhbSBkYXRhQiBcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGRhdGFTb3J0RnVuYyhkYXRhQTogYW55LCBkYXRhQjogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGFBLnR5cGUgLSBkYXRhQi50eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg6LeR6ams54Gv5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gZGF0YSB7XHJcbiAgICAgICAgICAgIG1zZyxcclxuICAgICAgICAgICAgdHlwZSxcclxuICAgICAqIH1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFkZE1zZ0l0ZW0oZGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYodGhpcy5ub2RlID09IG51bGwgfHwgIXRoaXMubm9kZS5pc1ZhbGlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8v57yT5a2Y5pWw6YeP5aSn5LqOMTAg5Lu75L2V5raI5oGv6YO95LiiXHJcbiAgICAgICAgaWYodGhpcy5tc2dEYXRhQ2FjaGVMaXN0Lmxlbmd0aCA+PSB0aGlzLnRvdGFsTGVuZ2hMaW1pdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5b2T5pWw5o2u5aSn5LqOOOaXtu+8jOS8mOWFiOaPkuWFpemrmOS8mOWFiOe6p+aVsOaNrlxyXG4gICAgICAgIGlmKHRoaXMubXNnRGF0YUNhY2hlTGlzdC5sZW5ndGggPj0gdGhpcy5saXN0TGVuZ3RoTGltaXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihkYXRhLmNsaWVudFByaW9yaXR5ICE9IG51bGwgJiYgZGF0YS5jbGllbnRQcmlvcml0eSA9PSAwICYmIGRhdGEubmlja25hbWUgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1zZ0RhdGFDYWNoZUxpc3QucHVzaChkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkRGVmYXV0TXNnKCkge1xyXG4gICAgICAgIGxldCBtc2dMaXN0ID0gW1xyXG4gICAgICAgICAgICB7IG1zZzogUGFvTWFEZW5nTXNnVGVtcC5XZWxjb21lLCB0eXBlOiAxIH0sXHJcbiAgICAgICAgICAgIHsgbXNnOiBQYW9NYURlbmdNc2dUZW1wLlRpcEJhZEdhbWUsIHR5cGU6IDEgfSxcclxuICAgICAgICAgICAgeyBtc2c6IFBhb01hRGVuZ01zZ1RlbXAuTm9XYWxsb3csIHR5cGU6IDEgfSxcclxuICAgICAgICBdXHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG1zZ0xpc3QubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBtc2dMaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgdGhpcy5hZGRNc2dJdGVtKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBtc2cge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA6IDIwMDAxLFxyXG4gICAgICAgICAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlIDogMCAsIFxyXG4gICAgICAgICAgICAgICAgICAgIG1zZyA6IFwiPGNvbG9yPSNGRjAwMDA+VGVzdERhdGEhISEhISEhISEhISEhITwvY29sb3I+XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRNc2dEYXRhKG1zZzogYW55KSB7XHJcbiAgICAgICAgaWYobXNnLmRhdGEuZ2FtZV9pZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBnYW1lSW5mbyA9IEdsb2JhbC5HYW1lRGF0YS5nZXRHYW1lSW5mbyhtc2cuZGF0YS5nYW1lX2lkKTtcclxuICAgICAgICAgICAgaWYgKGdhbWVJbmZvLnN0YXR1cyAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWdhbWVJbmZvIHx8IGdhbWVJbmZvLm5hbWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKFwi5om+5LiN5YiwZ2FtZWlkXCIsIG1zZy5kYXRhLmdhbWVfaWQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkTXNnSXRlbShtc2cuZGF0YSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuY2xhc3MgUGFvTWFEZW5nSXRlbVBvb2wgZXh0ZW5kcyBQb29sQmFzZXtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29weU5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlSXRlbSgpe1xyXG4gICAgICAgIHJldHVybiBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvcHlOb2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcmVzZXRJdGVtKG5vZGU6IGNjLk5vZGUpe1xyXG4gICAgICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKVxyXG4gICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVjeWNsZUFsbChhcnI6IEFycmF5PGFueT4pXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIucmVjeWNsZUFsbChhcnIpXHJcbiAgICAgICAgYXJyLmZvckVhY2goZWxlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldEl0ZW0oZWxlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFBhb01hRGVuZ01zZ1RlbXB7XHJcbiAgICBXZWxjb21lID0gXCLlsIrmlaznmoTnjqnlrrbvvIzmrKLov47ov5vlhaXmuLjmiI/lpKfljoXvvIFcIixcclxuICAgIFRpcEJhZEdhbWUgPSBcIuaKteWItuS4jeiJr+a4uOaIj++8jOaLkue7neebl+eJiOa4uOaIj++8jOazqOaEj+iHqui6q+S/neaKpO+8jOiwqOmYsuS4iuW9k+WPl+mql1wiLFxyXG4gICAgTm9XYWxsb3cgPSBcIumAguW6pua4uOaIj+ebiuiEke+8jOayiei/t+a4uOaIj+S8pOi6q++8jOWQiOeQhuWuieaOkuaXtumXtO+8jOS6q+WPl+WBpeW6t+eUn+a0u1wiLFxyXG59XHJcbiJdfQ==