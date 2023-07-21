
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/core/component/InteractPlayComp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGNvcmVcXGNvbXBvbmVudFxcSW50ZXJhY3RQbGF5Q29tcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBc0M7QUFDdEMscURBQWdEO0FBRWhELElBQU0sV0FBVyxHQUFHO0lBQ2hCLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxjQUFjLEVBQUUsaUNBQWlDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRTtJQUN4SSxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsY0FBYyxFQUFFLGdDQUFnQyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUU7SUFDdkksR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLGNBQWMsRUFBRSxpQ0FBaUMsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFO0lBQ3hJLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxjQUFjLEVBQUUsaUNBQWlDLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRTtJQUN4SSxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsY0FBYyxFQUFFLGlDQUFpQyxFQUFFLFlB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LENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSwwQkFBSyxHQUFaO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFHLHFCQUFxQjtRQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0F0REEsQUFzREMsQ0F0RHdCLGtCQUFRLEdBc0RoQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vdWkvVmlld0Jhc2VcIjtcclxuaW1wb3J0IEdhbWVCYXNlUG9vbCBmcm9tIFwiLi4vdG9vbC9HYW1lQmFzZVBvb2xcIjtcclxuXHJcbmNvbnN0IEludGVyYWN0Q2ZnID0ge1xyXG4gICAgJzAnOiB7IHByZWZhYjogJzEnLCBzb3VuZERlbGF5OiAxLCBzZWNvbmRTb3VuZERlbGF5OiAwLCB0aW1lOiAyLCBzb3VuZE5hbWVTdGFydDogJ2hhbGwvc291bmQvaW50ZXJhY3QvaGRfbWVpZ3VpMDEnLCBzb3VuZE5hbWVFbmQ6IG51bGwgfSxcclxuICAgICcxJzogeyBwcmVmYWI6ICcyJywgc291bmREZWxheTogMSwgc2Vjb25kU291bmREZWxheTogMCwgdGltZTogMiwgc291bmROYW1lU3RhcnQ6ICdoYWxsL3NvdW5kL2ludGVyYWN0L2hkX2ppZGFuMDEnLCBzb3VuZE5hbWVFbmQ6IG51bGwgfSxcclxuICAgICcyJzogeyBwcmVmYWI6ICczJywgc291bmREZWxheTogMSwgc2Vjb25kU291bmREZWxheTogMCwgdGltZTogMiwgc291bmROYW1lU3RhcnQ6ICdoYWxsL3NvdW5kL2ludGVyYWN0L2hkX2dhbmJlaTAxJywgc291bmROYW1lRW5kOiBudWxsIH0sXHJcbiAgICAnMyc6IHsgcHJlZmFiOiAnNCcsIHNvdW5kRGVsYXk6IDEsIHNlY29uZFNvdW5kRGVsYXk6IDAsIHRpbWU6IDIsIHNvdW5kTmFtZVN0YXJ0OiAnaGFsbC9zb3VuZC9pbnRlcmFjdC9oZF93b3Nob3UwMScsIHNvdW5kTmFtZUVuZDogbnVsbCB9LFxyXG4gICAgJzQnOiB7IHByZWZhYjogJzUnLCBzb3VuZERlbGF5OiAxLCBzZWNvbmRTb3VuZERlbGF5OiAwLCB0aW1lOiAyLCBzb3VuZE5hbWVTdGFydDogJ2hhbGwvc291bmQvaW50ZXJhY3QvaGRfZGFvY2hhMDEnLCBzb3VuZE5hbWVFbmQ6IG51bGwgfSxcclxuICAgICc1JzogeyBwcmVmYWI6ICc2Jywgc291bmREZWxheTogMSwgc2Vjb25kU291bmREZWxheTogMCwgdGltZTogMiwgc291bmROYW1lU3RhcnQ6ICdoYWxsL3NvdW5kL2ludGVyYWN0L2hkX21hb2JpMDEnLCBzb3VuZE5hbWVFbmQ6IG51bGwgfSxcclxuICAgICc2JzogeyBwcmVmYWI6ICc3Jywgc291bmREZWxheTogMSwgc2Vjb25kU291bmREZWxheTogMCwgdGltZTogMiwgc291bmROYW1lU3RhcnQ6ICdoYWxsL3NvdW5kL2ludGVyYWN0L2hkX2Jpbmd0b25nMDEnLCBzb3VuZE5hbWVFbmQ6IG51bGwgfSxcclxuICAgICc3JzogeyBwcmVmYWI6ICc4Jywgc291bmREZWxheTogMCwgc2Vjb25kU291bmREZWxheTogMiwgdGltZTogMiwgc291bmROYW1lU3RhcnQ6ICdoYWxsL3NvdW5kL2ludGVyYWN0L2hkX2RhcGFvMDEnLCBzb3VuZE5hbWVFbmQ6ICdoYWxsL3NvdW5kL2ludGVyYWN0L2hkX2RhcGFvMDFfZW5kJyB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZXJhY3RQbGF5Q29tcCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBwcml2YXRlIHBvb2xNYXA6IHsgW2tleTogc3RyaW5nXTogSW50ZXJhY3RQb29sIH0gPSB7fTtcclxuICAgIHByaXZhdGUgcGxheWluZ01hcDogeyBbb3duZXI6IHN0cmluZ106IGFueVtdIH0gPSB7fTtcclxuICAgIHByaXZhdGUgYW5pbVZpZXc6IGNjLk5vZGU7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGxldCBwb29sTm9kZSA9IGNjLmZpbmQoXCJwb29sXCIsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgcG9vbE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIEludGVyYWN0Q2ZnKSB7XHJcbiAgICAgICAgICAgIGxldCBjb3B5Tm9kZSA9IGNjLmZpbmQoYHBvb2wvJHtJbnRlcmFjdENmZ1trZXldWydwcmVmYWInXX1gLCB0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLnBvb2xNYXBba2V5XSA9IG5ldyBJbnRlcmFjdFBvb2wocG9vbE5vZGUsIGNvcHlOb2RlLCBrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFuaW1WaWV3ID0gY2MuZmluZChcImFuaW1WaWV3XCIsIHRoaXMubm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBsYXlBY3Qoa2V5OiBzdHJpbmcsIGZXUG9zOiBjYy5WZWMzLCB0V1BvczogY2MuVmVjMywgbG9jYWxTZWF0OiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgb3duZXIgPSBTdHJpbmcobG9jYWxTZWF0KTtcclxuICAgICAgICBsZXQgYWN0aW9uSXRlbSA9IHRoaXMucG9vbE1hcFtrZXldLmdldEl0ZW0oKTtcclxuICAgICAgICBhY3Rpb25JdGVtLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYWN0aW9uSXRlbS5ub2RlLnNldFBhcmVudCh0aGlzLmFuaW1WaWV3KTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLnBsYXlpbmdNYXBbb3duZXJdKVxyXG4gICAgICAgICAgICB0aGlzLnBsYXlpbmdNYXBbb3duZXJdID0gW107XHJcbiAgICAgICAgdGhpcy5wbGF5aW5nTWFwW293bmVyXS5wdXNoKGFjdGlvbkl0ZW0pO1xyXG5cclxuICAgICAgICBsZXQgc291bmREZWxheSA9IEludGVyYWN0Q2ZnW2tleV1bJ3NvdW5kRGVsYXknXTtcclxuICAgICAgICBsZXQgc2Vjb25kU291bmREZWxheSA9IEludGVyYWN0Q2ZnW2tleV1bJ3NlY29uZFNvdW5kRGVsYXknXTtcclxuICAgICAgICBsZXQgdGltZSA9IEludGVyYWN0Q2ZnW2tleV1bJ3RpbWUnXTtcclxuICAgICAgICBhY3Rpb25JdGVtLnNob3dNb3ZlQW5pbShmV1BvcywgdFdQb3MpO1xyXG5cclxuICAgICAgICBsZXQgdHdlZW4gPSBuZXcgY2MuVHdlZW4oYWN0aW9uSXRlbS5ub2RlKTtcclxuICAgICAgICB0d2Vlbi5kZWxheShzb3VuZERlbGF5KVxyXG4gICAgICAgICAgICAuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoSW50ZXJhY3RDZmdba2V5XVsnc291bmROYW1lU3RhcnQnXSlcclxuICAgICAgICAgICAgICAgICAgICBHbG9iYWwuQXVkaW8ucGxheVNvdW5kKEludGVyYWN0Q2ZnW2tleV1bJ3NvdW5kTmFtZVN0YXJ0J10pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZGVsYXkoc2Vjb25kU291bmREZWxheSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uSXRlbS5zaG93U2tBbmltKHRXUG9zKTtcclxuICAgICAgICAgICAgICAgIGlmIChJbnRlcmFjdENmZ1trZXldWydzb3VuZE5hbWVFbmQnXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIEdsb2JhbC5BdWRpby5wbGF5U291bmQoSW50ZXJhY3RDZmdba2V5XVsnc291bmROYW1lRW5kJ10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZGVsYXkodGltZSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb29sTWFwW2tleV0ucmVjeWNsZUl0ZW0oYWN0aW9uSXRlbSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnBsYXlpbmdNYXBbb3duZXJdLmluZGV4T2YoYWN0aW9uSXRlbSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlpbmdNYXBbb3duZXJdLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhck9uZU93bmVyKG93bmVyOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgaXRlbUFyciA9IHRoaXMucGxheWluZ01hcFtvd25lcl07XHJcbiAgICAgICAgaWYgKGl0ZW1BcnIgJiYgIUdsb2JhbC5Ub29sa2l0LmlzRW1wdHlPYmplY3QoaXRlbUFycikpIHtcclxuICAgICAgICAgICAgaXRlbUFyci5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvb2wgPSB0aGlzLnBvb2xNYXBbaXRlbS5rZXldO1xyXG4gICAgICAgICAgICAgICAgcG9vbC5yZWN5Y2xlSXRlbShpdGVtKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWluZ01hcFtvd25lcl0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyQWxsT3duZXIoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgb3duZXIgaW4gdGhpcy5wbGF5aW5nTWFwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJPbmVPd25lcihvd25lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBJbnRlcmFjdFBvb2wgZXh0ZW5kcyBHYW1lQmFzZVBvb2w8QWN0aW9uSXRlbT57XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgcm9vdDogY2MuTm9kZSwgcHJpdmF0ZSBjb3B5Tm9kZTogY2MuTm9kZSwgcHJpdmF0ZSBrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKHJvb3QpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldCBwcmVDb3VudCgpIHtcclxuICAgICAgICByZXR1cm4gNTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGV2ZXJ5Q291bnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIDU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUl0ZW0oKSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNvcHlOb2RlKTtcclxuICAgICAgICByZXR1cm4gbmV3IEFjdGlvbkl0ZW0obm9kZSwgdGhpcy5rZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCByZXNldEl0ZW0oaXRlbTogQWN0aW9uSXRlbSkge1xyXG4gICAgICAgIGl0ZW0ubm9kZS5zZXRQYXJlbnQodGhpcy5yb290KTtcclxuICAgICAgICBpdGVtLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGl0ZW0ucmVzZXQoKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQWN0aW9uSXRlbSBleHRlbmRzIFZpZXdCYXNlIHtcclxuICAgIHByaXZhdGUgc3BOb2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBzazogc3AuU2tlbGV0b247XHJcbiAgICBwcml2YXRlIHNrc3RhcnQ6IHNwLlNrZWxldG9uO1xyXG4gICAgY29uc3RydWN0b3Iobm9kZTogY2MuTm9kZSwgcHVibGljIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNldE5vZGUobm9kZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGluaXRWaWV3KCkge1xyXG4gICAgICAgIHRoaXMuc3BOb2RlID0gdGhpcy5nZXRDaGlsZCgnc3AnKTtcclxuICAgICAgICB0aGlzLnNrID0gPHNwLlNrZWxldG9uPnRoaXMuZ2V0Q29tcG9uZW50KCdzaycsIHNwLlNrZWxldG9uKTtcclxuICAgICAgICB0aGlzLnNrLnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNrLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNrc3RhcnQgPSA8c3AuU2tlbGV0b24+dGhpcy5nZXRDb21wb25lbnQoJ3Nrc3RhcnQnLCBzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgdGhpcy5za3N0YXJ0LnNldENvbXBsZXRlTGlzdGVuZXIoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNrc3RhcnQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93TW92ZUFuaW0oZnJvbVdvbHJkUG9zOiBjYy5WZWMzLCB0b1dvcmxkUG9zOiBjYy5WZWMzLCB0aW1lOiBudW1iZXIgPSAxKSB7XHJcbiAgICAgICAgbGV0IGZQb3MgPSB0aGlzLnNwTm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIoZnJvbVdvbHJkUG9zKTtcclxuICAgICAgICBsZXQgdFBvcyA9IHRoaXMuc3BOb2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0b1dvcmxkUG9zKTtcclxuICAgICAgICB0aGlzLnNwTm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3BOb2RlLnNldFBvc2l0aW9uKGZQb3MpO1xyXG5cclxuICAgICAgICB0aGlzLnNrc3RhcnQubm9kZS5zZXRQb3NpdGlvbihmUG9zKTtcclxuICAgICAgICB0aGlzLnNrc3RhcnQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2tzdGFydC5zZXRBbmltYXRpb24oMCwgJ2lkbGUnLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIGxldCB0d2VlbiA9IG5ldyBjYy5Ud2Vlbih0aGlzLnNwTm9kZSk7XHJcbiAgICAgICAgdHdlZW4udG8odGltZSwgeyBwb3NpdGlvbjogdFBvcyB9LCBjYy5lYXNlQ3ViaWNBY3Rpb25PdXQoKSlcclxuICAgICAgICAgICAgLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zcE5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93U2tBbmltKHRvV29ybGRQb3M6IGNjLlZlYzMpIHtcclxuICAgICAgICBsZXQgdFBvcyA9IHRoaXMuc2subm9kZS5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodG9Xb3JsZFBvcyk7XHJcbiAgICAgICAgdGhpcy5zay5ub2RlLnNldFBvc2l0aW9uKHRQb3MpO1xyXG4gICAgICAgIHRoaXMuc2subm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2suc2V0QW5pbWF0aW9uKDAsICdpZGxlJywgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpIHtcclxuICAgICAgICB0aGlzLnNwTm9kZS5zdG9wQWxsQWN0aW9ucygpOyAgIC8vIGRlYnVnIOWbnuaUtuW8uuWItuWBnOatouiKgueCueaJgOacieWKqOS9nFxyXG4gICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMuc3BOb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2subm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNrc3RhcnQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59Il19