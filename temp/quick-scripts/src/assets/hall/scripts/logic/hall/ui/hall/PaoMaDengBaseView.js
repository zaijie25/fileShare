"use strict";
cc._RF.push(module, 'bb88e7CmrtDYY4/tZ4skde7', 'PaoMaDengBaseView');
// hall/scripts/logic/hall/ui/hall/PaoMaDengBaseView.ts

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
var ViewBase_1 = require("../../../core/ui/ViewBase");
var PaoMaDengBaseView = /** @class */ (function (_super) {
    __extends(PaoMaDengBaseView, _super);
    function PaoMaDengBaseView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemPrefab = null;
        _this.itemList = new Array();
        _this.itemPool = new Array();
        _this.showCountLimit = 4;
        _this.curShowCount = 0;
        //轮询Timer
        _this.checkTimer = null;
        //最后显示的消息Item
        _this.lastMsgItem = null;
        //消息缓存队列
        _this.msgDataCacheList = [];
        //消息队列缓存长度限制
        _this.listLengthLimit = 8;
        //跑马灯基础路程长度
        _this.boxLength = 590;
        //跑马灯默认路程花费时间
        _this.baseTime = 3;
        //跑马灯速度
        _this.baseSpeed = 1;
        return _this;
    }
    PaoMaDengBaseView.prototype.getItem = function () {
        var item = null;
        if (this.itemPool.length > 0) {
            item = this.itemPool.pop();
            item.node.setSiblingIndex(-1);
        }
        else {
            var itemObj = cc.instantiate(this.itemPrefab);
            item = itemObj.getComponent(cc.RichText);
            item.node.setParent(this.listNode);
        }
        item.node.active = true;
        item.node.x = 0;
        this.itemList.push(item);
        return item;
    };
    PaoMaDengBaseView.prototype.recoveryItem = function (reitem) {
        for (var index = 0; index < this.itemList.length; index++) {
            var item = this.itemList[index];
            if (item == reitem) {
                item.string = "";
                item.node.active = false;
                item.node.stopAllActions();
                this.itemPool.push(item);
                this.itemList.splice(index, 1);
                break;
            }
        }
    };
    PaoMaDengBaseView.prototype.clearRecord = function () {
        for (var index = 0; index < this.itemList.length; index++) {
            var item = this.itemList[index];
            item.string = "";
            item.node.active = false;
            item.node.stopAllActions();
            this.itemPool.push(item);
        }
        this.itemList = [];
    };
    PaoMaDengBaseView.prototype.initView = function () {
        this.listNode = this.getChild("MsgBox");
        this.itemPrefab = this.getChild("MsgBox/PMDMsgItem");
        this.boxLength = this.listNode.width;
        this.baseSpeed = this.boxLength / this.baseTime;
    };
    PaoMaDengBaseView.prototype.onSubViewShow = function () {
        this.startTimer();
    };
    PaoMaDengBaseView.prototype.onSubViewHide = function () {
        this.stopTimer();
        this.clearRecord();
    };
    //界面销毁
    PaoMaDengBaseView.prototype.onDispose = function () {
        this.stopTimer();
    };
    PaoMaDengBaseView.prototype.startTimer = function () {
        if (this.checkTimer == null) {
            this.checkTimer = setInterval(this.checkMsgList.bind(this), 100);
        }
    };
    PaoMaDengBaseView.prototype.stopTimer = function () {
        if (this.checkTimer) {
            clearInterval(this.checkTimer);
            this.checkTimer = null;
        }
    };
    PaoMaDengBaseView.prototype.playAnim = function (item) {
        var moveds = item.node.x + item.node.width + this.boxLength;
        var moveTime = moveds / this.baseSpeed;
        var mv = cc.moveTo(moveTime, -(item.node.width + this.boxLength), 0);
        var mvover = cc.callFunc(function () {
            this.recoveryItem(item);
            this.curShowCount--;
        }, this);
        item.node.runAction(cc.sequence(mv, mvover));
        this.curShowCount++;
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
    PaoMaDengBaseView.prototype.checkMsgList = function () {
        try {
            if (this.node == null || !this.node.isValid)
                return;
            if (this.msgDataCacheList.length == 0 || this.curShowCount >= this.showCountLimit)
                return;
            var data = this.msgDataCacheList.shift();
            var startX = 0;
            if (this.lastMsgItem != null) { //
                startX = this.lastMsgItem.node.x + this.lastMsgItem.node.width + 100;
                startX = Math.max(0, startX);
            }
            //拼接跑马灯文字
            var formatStr = "<color=#ffffff>鸿运当头，恭喜玩家</color>" +
                "<color=#00ff00>%s,</color>" +
                "<color=#ffffff>在</color><color=#00d2ff>%s</color>" +
                "<color=#ffffff>中赢得</color>" +
                "<color=#fff100>%s</color><color=#ffffff>元</color>";
            var msgStr = "";
            if (data.nickname != null) {
                msgStr = cc.js.formatStr(formatStr, data.nickname, data.game_id, Global.Toolkit.GetMoneyFormat(data.hitPoint));
            }
            else {
                msgStr = data.msg;
            }
            //
            this.lastMsgItem = this.getItem();
            this.lastMsgItem.string = msgStr;
            this.lastMsgItem.node.x = startX;
            this.playAnim(this.lastMsgItem);
        }
        catch (error) {
            this.stopTimer();
            Logger.error(error);
        }
    };
    /**
     * 排序方法,子类可重写
     * @param dataA
     * @param dataB
     */
    PaoMaDengBaseView.prototype.dataSortFunc = function (dataA, dataB) {
        return dataA.type - dataB.type;
    };
    /**
     * 添加跑马灯数据
     * @param data {
            msg,
            type,
     * }
     */
    PaoMaDengBaseView.prototype.addMsgItem = function (data) {
        this.msgDataCacheList.push(data);
        while (this.msgDataCacheList.length > this.listLengthLimit) {
            this.msgDataCacheList.shift();
        }
        this.msgDataCacheList.sort(this.dataSortFunc);
        this.startTimer();
    };
    return PaoMaDengBaseView;
}(ViewBase_1.default));
exports.default = PaoMaDengBaseView;

cc._RF.pop();