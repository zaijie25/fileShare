"use strict";
cc._RF.push(module, '9a7a6Qo4fpBZpLXZmD7Nx0j', 'InteractPlayComp');
// hall/scripts/logic/core/component/InteractPlayComp.ts

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
var ViewBase_1 = require("../ui/ViewBase");
var GameBasePool_1 = require("../tool/GameBasePool");
var InteractCfg = {
    '0': { prefab: '1', soundDelay: 1, secondSoundDelay: 0, time: 2, soundNameStart: 'hall/sound/interact/hd_meigui01', soundNameEnd: null },
    '1': { prefab: '2', soundDelay: 1, secondSoundDelay: 0, time: 2, soundNameStart: 'hall/sound/interact/hd_jidan01', soundNameEnd: null },
    '2': { prefab: '3', soundDelay: 1, secondSoundDelay: 0, time: 2, soundNameStart: 'hall/sound/interact/hd_ganbei01', soundNameEnd: null },
    '3': { prefab: '4', soundDelay: 1, secondSoundDelay: 0, time: 2, soundNameStart: 'hall/sound/interact/hd_woshou01', soundNameEnd: null },
    '4': { prefab: '5', soundDelay: 1, secondSoundDelay: 0, time: 2, soundNameStart: 'hall/sound/interact/hd_daocha01', soundNameEnd: null },
    '5': { prefab: '6', soundDelay: 1, secondSoundDelay: 0, time: 2, soundNameStart: 'hall/sound/interact/hd_maobi01', soundNameEnd: null },
    '6': { prefab: '7', soundDelay: 1, secondSoundDelay: 0, time: 2, soundNameStart: 'hall/sound/interact/hd_bingtong01', soundNameEnd: null },
    '7': { prefab: '8', soundDelay: 0, secondSoundDelay: 2, time: 2, soundNameStart: 'hall/sound/interact/hd_dapao01', soundNameEnd: 'hall/sound/interact/hd_dapao01_end' },
};
var InteractPlayComp = /** @class */ (function (_super) {
    __extends(InteractPlayComp, _super);
    function InteractPlayComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.poolMap = {};
        _this.playingMap = {};
        return _this;
    }
    InteractPlayComp.prototype.onLoad = function () {
        var poolNode = cc.find("pool", this.node);
        poolNode.active = false;
        for (var key in InteractCfg) {
            var copyNode = cc.find("pool/" + InteractCfg[key]['prefab'], this.node);
            this.poolMap[key] = new InteractPool(poolNode, copyNode, key);
        }
        this.animView = cc.find("animView", this.node);
    };
    InteractPlayComp.prototype.playAct = function (key, fWPos, tWPos, localSeat) {
        var _this = this;
        var owner = String(localSeat);
        var actionItem = this.poolMap[key].getItem();
        actionItem.active = true;
        actionItem.node.setParent(this.animView);
        if (!this.playingMap[owner])
            this.playingMap[owner] = [];
        this.playingMap[owner].push(actionItem);
        var soundDelay = InteractCfg[key]['soundDelay'];
        var secondSoundDelay = InteractCfg[key]['secondSoundDelay'];
        var time = InteractCfg[key]['time'];
        actionItem.showMoveAnim(fWPos, tWPos);
        var tween = new cc.Tween(actionItem.node);
        tween.delay(soundDelay)
            .call(function () {
            if (InteractCfg[key]['soundNameStart'])
                Global.Audio.playSound(InteractCfg[key]['soundNameStart']);
        })
            .delay(secondSoundDelay)
            .call(function () {
            actionItem.showSkAnim(tWPos);
            if (InteractCfg[key]['soundNameEnd']) {
                Global.Audio.playSound(InteractCfg[key]['soundNameEnd']);
            }
        })
            .delay(time)
            .call(function () {
            _this.poolMap[key].recycleItem(actionItem);
            var index = _this.playingMap[owner].indexOf(actionItem);
            if (index > -1)
                _this.playingMap[owner].splice(index, 1);
        })
            .start();
    };
    InteractPlayComp.prototype.clearOneOwner = function (owner) {
        var _this = this;
        var itemArr = this.playingMap[owner];
        if (itemArr && !Global.Toolkit.isEmptyObject(itemArr)) {
            itemArr.forEach(function (item) {
                var pool = _this.poolMap[item.key];
                pool.recycleItem(item);
            });
            this.playingMap[owner] = [];
        }
    };
    InteractPlayComp.prototype.clearAllOwner = function () {
        for (var owner in this.playingMap) {
            this.clearOneOwner(owner);
        }
    };
    return InteractPlayComp;
}(cc.Component));
exports.default = InteractPlayComp;
var InteractPool = /** @class */ (function (_super) {
    __extends(InteractPool, _super);
    function InteractPool(root, copyNode, key) {
        var _this = _super.call(this, root) || this;
        _this.root = root;
        _this.copyNode = copyNode;
        _this.key = key;
        return _this;
    }
    Object.defineProperty(InteractPool.prototype, "preCount", {
        get: function () {
            return 5;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(InteractPool.prototype, "everyCount", {
        get: function () {
            return 5;
        },
        enumerable: false,
        configurable: true
    });
    InteractPool.prototype.createItem = function () {
        var node = cc.instantiate(this.copyNode);
        return new ActionItem(node, this.key);
    };
    InteractPool.prototype.resetItem = function (item) {
        item.node.setParent(this.root);
        item.active = false;
        item.reset();
    };
    return InteractPool;
}(GameBasePool_1.default));
var ActionItem = /** @class */ (function (_super) {
    __extends(ActionItem, _super);
    function ActionItem(node, key) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.setNode(node);
        return _this;
    }
    ActionItem.prototype.initView = function () {
        var _this = this;
        this.spNode = this.getChild('sp');
        this.sk = this.getComponent('sk', sp.Skeleton);
        this.sk.setCompleteListener(function () {
            _this.sk.node.active = false;
        });
        this.skstart = this.getComponent('skstart', sp.Skeleton);
        this.skstart.setCompleteListener(function () {
            _this.skstart.node.active = false;
        });
    };
    ActionItem.prototype.showMoveAnim = function (fromWolrdPos, toWorldPos, time) {
        var _this = this;
        if (time === void 0) { time = 1; }
        var fPos = this.spNode.parent.convertToNodeSpaceAR(fromWolrdPos);
        var tPos = this.spNode.parent.convertToNodeSpaceAR(toWorldPos);
        this.spNode.active = true;
        this.spNode.setPosition(fPos);
        this.skstart.node.setPosition(fPos);
        this.skstart.node.active = true;
        this.skstart.setAnimation(0, 'idle', false);
        var tween = new cc.Tween(this.spNode);
        tween.to(time, { position: tPos }, cc.easeCubicActionOut())
            .call(function () {
            _this.spNode.active = false;
        })
            .start();
    };
    ActionItem.prototype.showSkAnim = function (toWorldPos) {
        var tPos = this.sk.node.parent.convertToNodeSpaceAR(toWorldPos);
        this.sk.node.setPosition(tPos);
        this.sk.node.active = true;
        this.sk.setAnimation(0, 'idle', false);
    };
    ActionItem.prototype.reset = function () {
        this.spNode.stopAllActions(); // debug 回收强制停止节点所有动作
        this.node.stopAllActions();
        this.spNode.active = false;
        this.sk.node.active = false;
        this.skstart.node.active = false;
        this.active = false;
    };
    return ActionItem;
}(ViewBase_1.default));

cc._RF.pop();