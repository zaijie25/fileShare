
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/hall/scripts/logic/hall/ui/hall/PaoMaDengBaseView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcaGFsbFxcc2NyaXB0c1xcbG9naWNcXGhhbGxcXHVpXFxoYWxsXFxQYW9NYURlbmdCYXNlVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzREFBaUQ7QUFFakQ7SUFBK0MscUNBQVE7SUFBdkQ7UUFBQSxxRUEyTEM7UUF4TFcsZ0JBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsY0FBUSxHQUF3QixJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzVDLGNBQVEsR0FBd0IsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUM1QyxvQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQixrQkFBWSxHQUFHLENBQUMsQ0FBQztRQTRDekIsU0FBUztRQUNELGdCQUFVLEdBQUcsSUFBSSxDQUFDO1FBRTFCLGFBQWE7UUFDTCxpQkFBVyxHQUFpQixJQUFJLENBQUM7UUFFekMsUUFBUTtRQUNBLHNCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUM5QixZQUFZO1FBQ0oscUJBQWUsR0FBRyxDQUFDLENBQUM7UUFFNUIsV0FBVztRQUNILGVBQVMsR0FBRyxHQUFHLENBQUM7UUFDeEIsYUFBYTtRQUNMLGNBQVEsR0FBRyxDQUFDLENBQUM7UUFDckIsT0FBTztRQUNDLGVBQVMsR0FBRyxDQUFDLENBQUM7O0lBd0gxQixDQUFDO0lBbExXLG1DQUFPLEdBQWY7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUM7WUFDeEIsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUVqQzthQUFJO1lBQ0QsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENB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QUMsSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbkM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyx3Q0FBWSxHQUF0QixVQUF3QixLQUFXLEVBQUcsS0FBVztRQUM3QyxPQUFPLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08sc0NBQVUsR0FBcEIsVUFBc0IsSUFBVTtRQUM1QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtTQUNoQztRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUwsd0JBQUM7QUFBRCxDQTNMQSxBQTJMQyxDQTNMOEMsa0JBQVEsR0EyTHREIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdsb2JhbEV2ZW50IGZyb20gXCIuLi8uLi8uLi9jb3JlL0dsb2JhbEV2ZW50XCI7XHJcbmltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vLi4vY29yZS91aS9WaWV3QmFzZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFvTWFEZW5nQmFzZVZpZXcgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBsaXN0Tm9kZSA6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIGl0ZW1QcmVmYWI6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBpdGVtTGlzdCA6IEFycmF5PGNjLlJpY2hUZXh0PiA9IG5ldyBBcnJheSgpO1xyXG4gICAgcHJpdmF0ZSBpdGVtUG9vbCA6IEFycmF5PGNjLlJpY2hUZXh0PiA9IG5ldyBBcnJheSgpO1xyXG4gICAgcHJpdmF0ZSBzaG93Q291bnRMaW1pdCA9IDQ7XHJcbiAgICBwcml2YXRlIGN1clNob3dDb3VudCA9IDA7XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRJdGVtKCl7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSBudWxsO1xyXG4gICAgICAgIGlmKHRoaXMuaXRlbVBvb2wubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLml0ZW1Qb29sLnBvcCgpO1xyXG4gICAgICAgICAgICBpdGVtLm5vZGUuc2V0U2libGluZ0luZGV4KC0xKTtcclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHZhciBpdGVtT2JqID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtUHJlZmFiKTtcclxuICAgICAgICAgICAgaXRlbSA9IGl0ZW1PYmouZ2V0Q29tcG9uZW50KGNjLlJpY2hUZXh0KTtcclxuICAgICAgICAgICAgaXRlbS5ub2RlLnNldFBhcmVudCh0aGlzLmxpc3ROb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaXRlbS5ub2RlLnggPSAwO1xyXG4gICAgICAgIHRoaXMuaXRlbUxpc3QucHVzaChpdGVtKTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlY292ZXJ5SXRlbSggcmVpdGVtIDogY2MuUmljaFRleHQgKXtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5pdGVtTGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbUxpc3RbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZihpdGVtID09IHJlaXRlbSl7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpdGVtLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbVBvb2wucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbUxpc3Quc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhclJlY29yZCgpe1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLml0ZW1MaXN0Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtTGlzdFtpbmRleF07XHJcbiAgICAgICAgICAgIGl0ZW0uc3RyaW5nID0gXCJcIjtcclxuICAgICAgICAgICAgaXRlbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpdGVtLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtUG9vbC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLml0ZW1MaXN0ID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLy/ova7or6JUaW1lclxyXG4gICAgcHJpdmF0ZSBjaGVja1RpbWVyID0gbnVsbDtcclxuXHJcbiAgICAvL+acgOWQjuaYvuekuueahOa2iOaBr0l0ZW1cclxuICAgIHByaXZhdGUgbGFzdE1zZ0l0ZW0gOiBjYy5SaWNoVGV4dCA9IG51bGw7XHJcblxyXG4gICAgLy/mtojmga/nvJPlrZjpmJ/liJdcclxuICAgIHByaXZhdGUgbXNnRGF0YUNhY2hlTGlzdCA9IFtdO1xyXG4gICAgLy/mtojmga/pmJ/liJfnvJPlrZjplb/luqbpmZDliLZcclxuICAgIHByaXZhdGUgbGlzdExlbmd0aExpbWl0ID0gODtcclxuXHJcbiAgICAvL+i3kemprOeBr+WfuuehgOi3r+eoi+mVv+W6plxyXG4gICAgcHJpdmF0ZSBib3hMZW5ndGggPSA1OTA7XHJcbiAgICAvL+i3kemprOeBr+m7mOiupOi3r+eoi+iKsei0ueaXtumXtFxyXG4gICAgcHJpdmF0ZSBiYXNlVGltZSA9IDM7XHJcbiAgICAvL+i3kemprOeBr+mAn+W6plxyXG4gICAgcHJpdmF0ZSBiYXNlU3BlZWQgPSAxO1xyXG5cclxuICAgIHByb3RlY3RlZCBpbml0VmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5saXN0Tm9kZSA9IHRoaXMuZ2V0Q2hpbGQoXCJNc2dCb3hcIik7XHJcbiAgICAgICAgdGhpcy5pdGVtUHJlZmFiID0gdGhpcy5nZXRDaGlsZChcIk1zZ0JveC9QTURNc2dJdGVtXCIpO1xyXG4gICAgICAgIHRoaXMuYm94TGVuZ3RoID0gdGhpcy5saXN0Tm9kZS53aWR0aDtcclxuICAgICAgICB0aGlzLmJhc2VTcGVlZCA9IHRoaXMuYm94TGVuZ3RoIC8gdGhpcy5iYXNlVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25TdWJWaWV3U2hvdygpe1xyXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblN1YlZpZXdIaWRlKCl7XHJcbiAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcclxuICAgICAgICB0aGlzLmNsZWFyUmVjb3JkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlYzpnaLplIDmr4FcclxuICAgIHByb3RlY3RlZCBvbkRpc3Bvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0YXJ0VGltZXIoKXtcclxuICAgICAgICBpZih0aGlzLmNoZWNrVGltZXIgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tUaW1lciA9IHNldEludGVydmFsKHRoaXMuY2hlY2tNc2dMaXN0LmJpbmQodGhpcyksMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0b3BUaW1lcigpe1xyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tUaW1lcil7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5jaGVja1RpbWVyKTtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1RpbWVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwbGF5QW5pbShpdGVtIDogY2MuUmljaFRleHQgKXtcclxuICAgICAgICB2YXIgbW92ZWRzID0gaXRlbS5ub2RlLnggKyBpdGVtLm5vZGUud2lkdGggKyB0aGlzLmJveExlbmd0aDtcclxuICAgICAgICB2YXIgbW92ZVRpbWUgPSBtb3ZlZHMgLyB0aGlzLmJhc2VTcGVlZDtcclxuICAgICAgICB2YXIgbXYgPSBjYy5tb3ZlVG8obW92ZVRpbWUgLCAtKGl0ZW0ubm9kZS53aWR0aCArIHRoaXMuYm94TGVuZ3RoKSAsIDApO1xyXG4gICAgICAgIHZhciBtdm92ZXIgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLnJlY292ZXJ5SXRlbShpdGVtKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJTaG93Q291bnQtLTtcclxuICAgICAgICB9LHRoaXMpO1xyXG4gICAgICAgIGl0ZW0ubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UobXYsbXZvdmVyKSk7XHJcbiAgICAgICAgdGhpcy5jdXJTaG93Q291bnQrKztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRhdGEgPXsgIGdhbWVfaWQ6IDEwMDdcclxuICAgICAgICAgICAgICAgIGdhbWVfbGV2ZWw6IFwibDBcIlxyXG4gICAgICAgICAgICAgICAgZ2FtZV9ydWxlOiBcImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgaGVhZGltZzogXCI3XCJcclxuICAgICAgICAgICAgICAgIGhpdFBvaW50OiA1NDM0MDAwXHJcbiAgICAgICAgICAgICAgICBuaWNrbmFtZTogXCLpsbzkuIDnm7TkuItcIlxyXG4gICAgICAgIH1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVja01zZ0xpc3QoKXtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZih0aGlzLm5vZGUgPT0gbnVsbCB8fCAhdGhpcy5ub2RlLmlzVmFsaWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGlmKHRoaXMubXNnRGF0YUNhY2hlTGlzdC5sZW5ndGggPT0gMCB8fCB0aGlzLmN1clNob3dDb3VudCA+PSB0aGlzLnNob3dDb3VudExpbWl0KSByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5tc2dEYXRhQ2FjaGVMaXN0LnNoaWZ0KCk7XHJcbiAgICBcclxuICAgICAgICAgICAgdmFyIHN0YXJ0WCA9IDA7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubGFzdE1zZ0l0ZW0gIT0gbnVsbCApeyAvL1xyXG4gICAgICAgICAgICAgICAgc3RhcnRYID0gdGhpcy5sYXN0TXNnSXRlbS5ub2RlLnggKyB0aGlzLmxhc3RNc2dJdGVtLm5vZGUud2lkdGggKyAxMDA7XHJcbiAgICAgICAgICAgICAgICBzdGFydFggPSBNYXRoLm1heCgwLHN0YXJ0WCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v5ou85o6l6LeR6ams54Gv5paH5a2XXHJcbiAgICAgICAgICAgIHZhciBmb3JtYXRTdHIgPSBcIjxjb2xvcj0jZmZmZmZmPum4v+i/kOW9k+WktO+8jOaBreWWnOeOqeWutjwvY29sb3I+XCIrXHJcbiAgICAgICAgICAgIFwiPGNvbG9yPSMwMGZmMDA+JXMsPC9jb2xvcj5cIiArXHJcbiAgICAgICAgICAgIFwiPGNvbG9yPSNmZmZmZmY+5ZyoPC9jb2xvcj48Y29sb3I9IzAwZDJmZj4lczwvY29sb3I+XCIgK1xyXG4gICAgICAgICAgICBcIjxjb2xvcj0jZmZmZmZmPuS4rei1ouW+lzwvY29sb3I+XCIgK1xyXG4gICAgICAgICAgICBcIjxjb2xvcj0jZmZmMTAwPiVzPC9jb2xvcj48Y29sb3I9I2ZmZmZmZj7lhYM8L2NvbG9yPlwiO1xyXG4gICAgICAgICAgICB2YXIgbXNnU3RyID0gXCJcIjtcclxuICAgICAgICAgICAgaWYoZGF0YS5uaWNrbmFtZSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIG1zZ1N0ciA9IGNjLmpzLmZvcm1hdFN0cihmb3JtYXRTdHIsZGF0YS5uaWNrbmFtZSxkYXRhLmdhbWVfaWQsR2xvYmFsLlRvb2xraXQuR2V0TW9uZXlGb3JtYXQoZGF0YS5oaXRQb2ludCkpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIG1zZ1N0ciA9IGRhdGEubXNnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIHRoaXMubGFzdE1zZ0l0ZW0gPSB0aGlzLmdldEl0ZW0oKTtcclxuICAgICAgICAgICAgdGhpcy5sYXN0TXNnSXRlbS5zdHJpbmcgPSBtc2dTdHI7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdE1zZ0l0ZW0ubm9kZS54ID0gc3RhcnRYO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlBbmltKHRoaXMubGFzdE1zZ0l0ZW0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgICAgIExvZ2dlci5lcnJvcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o6S5bqP5pa55rOVLOWtkOexu+WPr+mHjeWGmVxyXG4gICAgICogQHBhcmFtIGRhdGFBIFxyXG4gICAgICogQHBhcmFtIGRhdGFCIFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZGF0YVNvcnRGdW5jKCBkYXRhQSA6IGFueSAsIGRhdGFCIDogYW55ICl7XHJcbiAgICAgICAgcmV0dXJuIGRhdGFBLnR5cGUgLSBkYXRhQi50eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg6LeR6ams54Gv5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gZGF0YSB7XHJcbiAgICAgICAgICAgIG1zZyxcclxuICAgICAgICAgICAgdHlwZSxcclxuICAgICAqIH1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFkZE1zZ0l0ZW0oIGRhdGEgOiBhbnkgKXtcclxuICAgICAgICB0aGlzLm1zZ0RhdGFDYWNoZUxpc3QucHVzaChkYXRhKTtcclxuICAgICAgICB3aGlsZSAodGhpcy5tc2dEYXRhQ2FjaGVMaXN0Lmxlbmd0aCA+IHRoaXMubGlzdExlbmd0aExpbWl0KSB7XHJcbiAgICAgICAgICAgIHRoaXMubXNnRGF0YUNhY2hlTGlzdC5zaGlmdCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubXNnRGF0YUNhY2hlTGlzdC5zb3J0KHRoaXMuZGF0YVNvcnRGdW5jKTtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==