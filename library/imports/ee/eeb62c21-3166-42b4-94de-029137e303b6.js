"use strict";
cc._RF.push(module, 'eeb62whMWZCtJTeApE34wO2', 'ErmjSyncHandler');
// ermj/Ermj/scripts/handlers/ErmjSyncHandler.ts

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
exports.ErmjSyncRefreshHandler = exports.ErmjSyncEndHandler = exports.ErmjSyncBeginHandler = void 0;
var ErmjBaseHandler_1 = require("./ErmjBaseHandler");
var ErmjDriver_1 = require("../ErmjDriver");
var ErmjSyncBeginHandler = /** @class */ (function (_super) {
    __extends(ErmjSyncBeginHandler, _super);
    function ErmjSyncBeginHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjSyncBeginHandler.prototype.refreshData = function (msg) {
        this.context.syncMode = true;
    };
    ErmjSyncBeginHandler.prototype.execute = function (msg) {
        ErmjDriver_1.default.instance.beginSync();
    };
    return ErmjSyncBeginHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjSyncBeginHandler = ErmjSyncBeginHandler;
var ErmjSyncEndHandler = /** @class */ (function (_super) {
    __extends(ErmjSyncEndHandler, _super);
    function ErmjSyncEndHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjSyncEndHandler.prototype.refreshData = function (msg) {
        this.context.syncMode = false;
    };
    return ErmjSyncEndHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjSyncEndHandler = ErmjSyncEndHandler;
var ErmjSyncRefreshHandler = /** @class */ (function (_super) {
    __extends(ErmjSyncRefreshHandler, _super);
    function ErmjSyncRefreshHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErmjSyncRefreshHandler.prototype.execute = function (msg) {
        this.mainUI.leftTipsView.updateLeftLbl(msg._para.left_count);
        // 复盘
        this.mainUI.mjHillView.doDeal(msg._para.head_count || 0);
        this.mainUI.mjHillView.doPatchwork(msg._para.tail_count || 0);
        var flowerCards = msg._para.flower_cards || {};
        for (var chair in flowerCards) {
            var localSeat = this.SitHelper.serverSToLocalN(Number(chair));
            this.mainUI.callMjPlayer(localSeat, "flowerCardAdd", flowerCards[chair]);
        }
        var lastOutLocalSeat = this.SitHelper.serverSToLocalN(msg._para.last_out_chair);
        var outCards = msg._para.out_cards || {};
        for (var chair in outCards) {
            var localSeat = this.SitHelper.serverSToLocalN(Number(chair));
            if (localSeat != lastOutLocalSeat) { // debug 先还原其他人, 最后还原最近一次出牌者, 服务器牌数组按出牌顺序, 保证可以拿到最后一张出牌引用
                this.mainUI.callMjPlayer(localSeat, "showOutCardDirectly", outCards[chair]);
            }
        }
        if (outCards[msg._para.last_out_chair]) { // 出过牌才显示
            this.mainUI.callMjPlayer(lastOutLocalSeat, "showOutCardDirectly", outCards[msg._para.last_out_chair]);
            this.mainUI.showLastOutSign(true);
        }
        var setCards = msg._para.set_cards || {};
        for (var chair in setCards) {
            var localSeat = this.SitHelper.serverSToLocalN(Number(chair));
            this.mainUI.callMjPlayer(localSeat, "syncAllOperView", setCards[chair]);
        }
    };
    return ErmjSyncRefreshHandler;
}(ErmjBaseHandler_1.default));
exports.ErmjSyncRefreshHandler = ErmjSyncRefreshHandler;

cc._RF.pop();