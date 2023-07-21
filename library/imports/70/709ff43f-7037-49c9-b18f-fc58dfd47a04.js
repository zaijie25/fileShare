"use strict";
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